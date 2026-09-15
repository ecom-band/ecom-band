import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validation";
import { site } from "@/content/site";

/**
 * Contact / consultation endpoint (used by the contact page and the popup).
 * Validates with the shared zod schema, drops spam (honeypot + time trap),
 * emails the inquiry to inquiry@ecomband.com via Resend and — when the lead
 * ticked the marketing checkbox — adds them to the Resend mailing list.
 *
 * The payload is a flat JSON object — wire a CRM here later (webhook or
 * SDK call) without touching the form UI.
 *
 * Env:
 *   RESEND_API_KEY      — required in production
 *   CONTACT_TO          — defaults to inquiry@ecomband.com
 *   CONTACT_FROM        — a sender on a Resend-verified domain
 *   RESEND_SEGMENT_ID   — Resend segment that opted-in leads are added to
 *   RESEND_AUDIENCE_ID  — legacy alternative to RESEND_SEGMENT_ID
 */

const sourceLabel = {
  contact: "Contact page form",
  popup: "Consultation popup",
} as const;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the highlighted fields and try again." },
      { status: 422 },
    );
  }

  const data = parsed.data;
  const source = data.source ?? "contact";
  const optedIn = data.marketingOptIn === true;

  // Spam checks — respond as success so bots learn nothing.
  // 2s not 3s: autofill users can legitimately submit fast, and a silently
  // dropped lead costs more than the occasional slow bot getting through.
  const tooFast =
    typeof data.startedAt === "number" && Date.now() - data.startedAt < 2000;
  if (data.website || tooFast) {
    return NextResponse.json({ ok: true });
  }

  const to = process.env.CONTACT_TO || site.email;
  const from =
    process.env.CONTACT_FROM || "ECOM BAND Website <onboarding@resend.dev>";
  const apiKey = process.env.RESEND_API_KEY;
  const segmentId = process.env.RESEND_SEGMENT_ID;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const listConfigured = Boolean(segmentId || audienceId);

  const lines = [
    `Name: ${data.name}`,
    `Company: ${data.company || "—"}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Service Interested In: ${data.service}`,
    `Marketing opt-in: ${optedIn ? "YES — consented to marketing email" : "No"}`,
    `Source: ${sourceLabel[source]}`,
    "",
    "Message / Business Goals:",
    data.message,
    "",
    "—",
    `Submitted via ecomband.com (${sourceLabel[source].toLowerCase()})`,
  ];
  if (optedIn && !listConfigured) {
    lines.push(
      "Note: mailing list not configured (RESEND_SEGMENT_ID) — add this contact manually.",
    );
  }

  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      console.error("RESEND_API_KEY is not configured — inquiry not sent.");
      return NextResponse.json(
        { error: "We couldn't send your inquiry right now." },
        { status: 500 },
      );
    }
    // Development without an API key: log instead of sending.
    console.log("[contact] (dev, email not configured)\n" + lines.join("\n"));
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `New inquiry — ${data.service} — ${data.name}${
        source === "popup" ? " [popup]" : ""
      }`,
      text: lines.join("\n"),
    });
    if (error) throw error;
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json(
      { error: "We couldn't send your inquiry right now." },
      { status: 500 },
    );
  }

  // Mailing list — only for explicit opt-ins. Never fail the inquiry over it;
  // the notification email above already records the consent.
  if (optedIn && listConfigured) {
    try {
      const [firstName, ...rest] = data.name.split(/\s+/);
      const contact = {
        email: data.email,
        firstName,
        lastName: rest.join(" ") || undefined,
        unsubscribed: false,
      };
      const { error } = segmentId
        ? await resend.contacts.create({
            ...contact,
            segments: [{ id: segmentId }],
          })
        : await resend.contacts.create({
            ...contact,
            audienceId: audienceId as string,
          });
      if (error) throw error;
    } catch (err) {
      console.error("[contact] mailing-list add failed:", err);
    }
  } else if (optedIn) {
    console.warn(
      "[contact] lead opted in but RESEND_SEGMENT_ID is not set — not added to mailing list.",
    );
  }

  return NextResponse.json({ ok: true });
}
