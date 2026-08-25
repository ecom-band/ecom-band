/**
 * Global site configuration.
 * Items marked `display: false` are pending client confirmation
 * (see requirements doc §2 and §10) — flip the flag once confirmed.
 */

type PendingField = { value: string; display: boolean };

export const site: {
  name: string;
  legalName: string;
  domain: string;
  url: string;
  tagline: string;
  description: string;
  footerTagline: string;
  email: string;
  linkedin: string;
  businessHours: string;
  phone: PendingField;
  whatsapp: PendingField;
  address: PendingField;
  markets: string;
} = {
  name: "ECOM BAND",
  legalName: "ECOM BAND PRIVATE LIMITED",
  domain: "ecomband.com",
  url: "https://ecomband.com",
  tagline: "Building & Growing E-Commerce Businesses",
  description:
    "ECOM BAND is an e-commerce growth and management company helping entrepreneurs and businesses build, operate, and grow profitable online businesses across Amazon, Shopify, Walmart, eBay, and TikTok Shop.",
  footerTagline:
    "ECOM BAND helps businesses build, manage, and scale e-commerce operations across Amazon, Shopify, Walmart, eBay, and TikTok Shop.",
  email: "info@ecomband.com",
  linkedin: "https://www.linkedin.com/company/ecomband/",
  businessHours: "Monday – Saturday",

  /** Pending confirmation from client — do not display until value is set and display is true. */
  phone: { value: "", display: false },
  whatsapp: { value: "", display: false },
  address: { value: "", display: false },

  markets: "United States",
};

export const platforms = [
  "Amazon",
  "Shopify",
  "Walmart",
  "eBay",
  "TikTok Shop",
] as const;

export type Platform = (typeof platforms)[number];
