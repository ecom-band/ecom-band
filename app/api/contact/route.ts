import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validation";
import { site } from "@/content/site";

/**
 * Contact form endpoint.
 * Validates with the shared zod schema, drops spam (honeypot + time trap),
 * and emails the inquiry to info@ecomband.com via Resend.
 *
 * The payload is a flat JSON object — wire a CRM here later (webhook or
 * SDK call) without touching the form UI.
 *
 * Env:
 *   RESEND_API_KEY  — required in production
 *   CONTACT_TO      — defaults to info@ecomband.com
 *   CONTACT_FROM    — a sender on a Resend-verified domain
 */
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

  const lines = [
    `Name: ${data.name}`,
    `Company: ${data.company || "—"}`,
    `Email: ${data.email}`,
    `Phone / WhatsApp: ${data.phone || "—"}`,
    `Service Interested In: ${data.service}`,
    "",
    "Message / Business Goals:",
    data.message,
    "",
    "—",
    "Submitted via ecomband.com contact form",
  ];

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

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `New inquiry — ${data.service} — ${data.name}`,
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

  return NextResponse.json({ ok: true });
}
