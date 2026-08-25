import type { Platform } from "@/content/site";

/**
 * Marketplace accent classes — full literal class names so Tailwind picks
 * them up. These colors appear only at small scale (dots, icon tiles,
 * underline bars, logo marks); the site palette stays ink/paper/amber.
 *
 * `logo` / `logoDark` color the official mark on light / dark surfaces.
 * TikTok's mark is officially black-on-light / white-on-dark, so it uses
 * neutral tones rather than the pink accent.
 */
export const platformAccent: Record<
  Platform,
  {
    dot: string;
    tile: string;
    bar: string;
    logo: string;
    logoDark: string;
    logoHover: string;
  }
> = {
  Amazon: {
    dot: "bg-p-amazon",
    tile: "bg-p-amazon/12",
    bar: "bg-p-amazon",
    logo: "text-p-amazon",
    logoDark: "text-p-amazon",
    logoHover: "group-hover:text-p-amazon",
  },
  Shopify: {
    dot: "bg-p-shopify",
    tile: "bg-p-shopify/12",
    bar: "bg-p-shopify",
    logo: "text-p-shopify",
    logoDark: "text-p-shopify",
    logoHover: "group-hover:text-p-shopify",
  },
  Walmart: {
    dot: "bg-p-walmart",
    tile: "bg-p-walmart/12",
    bar: "bg-p-walmart",
    logo: "text-p-walmart",
    logoDark: "text-p-walmart",
    logoHover: "group-hover:text-p-walmart",
  },
  eBay: {
    dot: "bg-p-ebay",
    tile: "bg-p-ebay/12",
    bar: "bg-p-ebay",
    logo: "text-p-ebay",
    logoDark: "text-p-ebay",
    logoHover: "group-hover:text-p-ebay",
  },
  "TikTok Shop": {
    dot: "bg-p-tiktok",
    tile: "bg-p-tiktok/12",
    bar: "bg-p-tiktok",
    logo: "text-ink",
    logoDark: "text-paper",
    logoHover: "group-hover:text-ink",
  },
};
