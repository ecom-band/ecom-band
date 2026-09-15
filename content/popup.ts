/**
 * Consultation popup — shown once to a new visitor after they have engaged
 * with the page (scrolled) for `delayMs`. Tweak behaviour and copy here;
 * the component lives in components/layout/ConsultationPopup.tsx.
 */
export const consultationPopup = {
  /** Master switch — set false to hide the popup site-wide without a code change. */
  enabled: true,

  /** Milliseconds after the visitor's first scroll before the popup appears. */
  delayMs: 5500,

  /** How far (px) the visitor must scroll before the timer starts. */
  scrollThresholdPx: 80,

  /** Days to wait before showing again after the visitor closes it without submitting. */
  dismissCooldownDays: 7,

  /** Days to wait before showing again after a successful submission. */
  submittedCooldownDays: 180,

  /** Routes where the popup never opens (the contact page already has the form). */
  excludedPaths: ["/contact", "/privacy-policy", "/terms"],

  eyebrow: "Free Consultation",
  title: "Let's Talk About Growing Your E-Commerce Business.",
  lead:
    "Tell us where you are today and where you want to go. A member of our team will get back to you within one business day.",
  points: [
    "Amazon, Shopify, Walmart, eBay & TikTok Shop",
    "Store setup, operations, and growth under one roof",
    "No obligation — just a straight conversation",
  ],
};
