# ECOM BAND — ecomband.com

Marketing website for ECOM BAND PRIVATE LIMITED, built per
[`website-creation-plan-v1.md`](../website-creation-plan-v1.md) from the client
requirements in [`business-info-and-requirements/`](../business-info-and-requirements/).

## Stack

- **Next.js 15** (App Router, TypeScript, all pages statically rendered)
- **Tailwind CSS v4** — design tokens in [`app/globals.css`](app/globals.css)
- **Motion** (Framer Motion) — hero sequence, scroll reveals; respects reduced motion
- **React Hook Form + Zod** — contact form validation (shared client/server)
- **Resend** — contact form email delivery to inquiry@ecomband.com

## Develop

```bash
npm install
cp .env.example .env.local   # fill in keys (see below)
npm run dev
```

## Environment (`.env.local` / Vercel project settings)

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Required in production for the contact form |
| `CONTACT_TO` | Inquiry recipient (default `inquiry@ecomband.com`) |
| `CONTACT_FROM` | Sender on a Resend-verified domain, e.g. `ECOM BAND <website@ecomband.com>` |
| `RESEND_SEGMENT_ID` | Resend segment that leads who tick the marketing opt-in are added to (optional; opt-in is always recorded in the email) |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID — loads on every page when set (no cookie banner) |

## Content editing

All copy and data live in [`content/`](content/):

- `site.ts` — brand info, email, **pending items** (phone, WhatsApp, address) behind `display` flags
- `services.ts` — the nine services (cards + detail pages are generated from this)
- `faq.ts` — grouped FAQs; `featured: true` items appear on the homepage
- `process.ts` — the 5-step process
- `nav.ts` — header/footer navigation
- `popup.ts` — consultation popup: on/off switch, scroll delay, cooldowns, excluded routes, copy
- `success-stories.ts` — dashboard screenshots for the homepage strip and `/success-stories`; images live in `public/success-stories/`. Current entries are generated **sample** SVGs (`placeholder: true`) — replace them with real, redacted client screenshots (see the how-to comment at the top of the file)

## Consultation popup

`components/layout/ConsultationPopup.tsx` shows the inquiry form in a modal to
new visitors once they have scrolled and ~5.5 s have passed. It reuses
`ContactForm` (`source="popup"`), so both forms share validation, the API route,
the Resend email, and the GA4 `generate_lead` event (now tagged with `source`
and `marketing_opt_in`).

- Closed without submitting → hidden for 7 days; submitted → hidden for 180 days
  (stored in `localStorage` under `ecomband-consultation-popup`).
- Never opens on `/contact`, `/privacy-policy`, `/terms`.
- All timings, cooldowns and copy live in `content/popup.ts`; set `enabled: false`
  to switch it off.
- To test locally, clear the `ecomband-consultation-popup` key in DevTools →
  Application → Local Storage, reload, and scroll.

Both forms include an **unchecked-by-default marketing opt-in** checkbox. The
choice is written into the notification email; when `RESEND_SEGMENT_ID` is set,
opted-in leads are also created as contacts in that Resend segment so they can
be emailed via Resend Broadcasts.

To activate the WhatsApp widget or phone display: set the value and flip
`display: true` in `content/site.ts`.

To swap in the official logo: replace [`components/layout/Logo.tsx`](components/layout/Logo.tsx)
(or drop SVGs into `public/brand/` and reference them there).

## Deploy (Vercel)

1. Push this repo to GitHub and import into Vercel.
2. Set the environment variables above.
3. Add domain `ecomband.com` in Vercel → follow DNS instructions at GoDaddy
   (A record / CNAME as Vercel specifies).
4. Verify `ecomband.com` in Resend to enable `CONTACT_FROM` on the brand domain.
5. Add the site to Google Search Console and submit `/sitemap.xml`.

## Pre-launch checklist (from requirements doc §10)

- [ ] Official logo files received and swapped in
- [ ] Real success-story screenshots received (redacted), sample SVGs removed from `content/success-stories.ts` + `public/success-stories/`
- [ ] Phone / WhatsApp numbers confirmed → flip flags in `content/site.ts`
- [ ] Office address confirmed
- [ ] Social profiles confirmed (LinkedIn already live)
- [ ] Brand colors confirmed against official logo (tokens in `app/globals.css`)
- [ ] Legal pages reviewed by counsel (`/privacy-policy`, `/terms`)
- [ ] `RESEND_API_KEY` set and test inquiry delivered to inquiry@ecomband.com
- [ ] GA4 property created, `NEXT_PUBLIC_GA_ID` set, `generate_lead` event verified
