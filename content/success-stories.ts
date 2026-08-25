import type { Platform } from "./site";

/**
 * Success stories — dashboard screenshots from client accounts.
 *
 * HOW TO ADD A REAL STORY
 * 1. Drop the screenshot into `public/success-stories/` (PNG/JPG/WebP).
 * 2. Add an entry below with its pixel `width`/`height` (needed for layout
 *    stability) and set `placeholder: false`.
 * 3. Redact anything sensitive in the image before adding it — the site
 *    overlays an ECOM BAND watermark, but it does not hide account details.
 *
 * Entries with `placeholder: true` are generated sample dashboards (SVG,
 * watermarked "SAMPLE DATA"). They exist only so the layout can be reviewed;
 * delete them as real screenshots arrive. `featured` stories lead the
 * dedicated page and appear first on the homepage.
 */

export type BusinessModel =
  | "Wholesale"
  | "Private Label"
  | "Dropshipping"
  | "Account Recovery";

export type SuccessStory = {
  id: string;
  platform: Platform;
  model: BusinessModel;
  /** Short caption shown under the screenshot, e.g. "Monthly product sales". */
  title: string;
  /** What the viewer is looking at — the dashboard/report name. */
  view: string;
  /** Reporting window visible in the screenshot. */
  period: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  featured?: boolean;
  placeholder?: boolean;
};

export const successStories: SuccessStory[] = [
  // ---- Amazon -------------------------------------------------------------
  {
    id: "amz-monthly-173k",
    platform: "Amazon",
    model: "Wholesale",
    title: "Monthly product sales",
    view: "Amazon Seller app · Product sales",
    period: "December, this month vs. last",
    src: "/success-stories/amazon-01.svg",
    width: 390,
    height: 780,
    alt: "Amazon Seller app showing this month's product sales with month-over-month and year-over-year growth.",
    featured: true,
    placeholder: true,
  },
  {
    id: "amz-monthly-60k",
    platform: "Amazon",
    model: "Wholesale",
    title: "Launch-month growth",
    view: "Amazon Seller app · Product sales",
    period: "December, this month",
    src: "/success-stories/amazon-02.svg",
    width: 390,
    height: 780,
    alt: "Amazon Seller app showing a sharp month-over-month increase in product sales during a launch month.",
    placeholder: true,
  },
  {
    id: "amz-30day-30k",
    platform: "Amazon",
    model: "Private Label",
    title: "Trailing 30-day sales",
    view: "Amazon Seller app · Product sales",
    period: "Last 30 days",
    src: "/success-stories/amazon-03.svg",
    width: 390,
    height: 780,
    alt: "Amazon Seller app showing trailing 30-day product sales compared with the previous 30 days.",
    placeholder: true,
  },
  {
    id: "amz-monthly-41k",
    platform: "Amazon",
    model: "Wholesale",
    title: "Steady monthly volume",
    view: "Amazon Seller app · Product sales",
    period: "December, this month",
    src: "/success-stories/amazon-04.svg",
    width: 390,
    height: 780,
    alt: "Amazon Seller app showing steady monthly product sales and open order counts.",
    placeholder: true,
  },

  // ---- Shopify ------------------------------------------------------------
  {
    id: "shp-april-516k",
    platform: "Shopify",
    model: "Private Label",
    title: "Store-wide monthly sales",
    view: "Shopify Analytics · Total sales",
    period: "April 1–30",
    src: "/success-stories/shopify-01.svg",
    width: 800,
    height: 600,
    alt: "Shopify analytics showing total sales and order count across all channels for April.",
    featured: true,
    placeholder: true,
  },
  {
    id: "shp-holiday-8k",
    platform: "Shopify",
    model: "Dropshipping",
    title: "Holiday-season ramp",
    view: "Shopify Analytics · Total sales",
    period: "Nov 1 – Jan 5",
    src: "/success-stories/shopify-02.svg",
    width: 800,
    height: 600,
    alt: "Shopify analytics showing total sales ramping through the holiday season.",
    placeholder: true,
  },
  {
    id: "shp-day-6k",
    platform: "Shopify",
    model: "Private Label",
    title: "Single-day sales",
    view: "Shopify Analytics · Sales over time",
    period: "Aug 17",
    src: "/success-stories/shopify-03.svg",
    width: 800,
    height: 600,
    alt: "Shopify analytics showing a single day's total sales broken down by hour.",
    placeholder: true,
  },

  // ---- Walmart ------------------------------------------------------------
  {
    id: "wmt-gmv-jan-32k",
    platform: "Walmart",
    model: "Wholesale",
    title: "GMV by department",
    view: "Walmart Seller Center · GMV report",
    period: "January 2024 vs. January 2023",
    src: "/success-stories/walmart-01.svg",
    width: 800,
    height: 640,
    alt: "Walmart gross merchandise volume report with department breakdown for January.",
    featured: true,
    placeholder: true,
  },
  {
    id: "wmt-gmv-dec-42k",
    platform: "Walmart",
    model: "Wholesale",
    title: "Peak-season GMV",
    view: "Walmart Seller Center · GMV report",
    period: "December 2023 vs. December 2022",
    src: "/success-stories/walmart-02.svg",
    width: 800,
    height: 640,
    alt: "Walmart gross merchandise volume report for December with year-over-year comparison.",
    placeholder: true,
  },
  {
    id: "wmt-gmv-dec-18k",
    platform: "Walmart",
    model: "Wholesale",
    title: "First-year December",
    view: "Walmart Seller Center · GMV report",
    period: "December 2021 vs. December 2020",
    src: "/success-stories/walmart-03.svg",
    width: 800,
    height: 640,
    alt: "Walmart gross merchandise volume report for a first-year December.",
    placeholder: true,
  },

  // ---- eBay ---------------------------------------------------------------
  {
    id: "eby-60d-48k",
    platform: "eBay",
    model: "Wholesale",
    title: "60-day sales performance",
    view: "eBay Seller Hub · Performance",
    period: "Last 60 days",
    src: "/success-stories/ebay-01.svg",
    width: 800,
    height: 560,
    alt: "eBay Seller Hub performance view showing total sales, items sold, impressions and click-through over 60 days.",
    placeholder: true,
  },
  {
    id: "eby-31d-12k",
    platform: "eBay",
    model: "Wholesale",
    title: "Monthly sales trend",
    view: "eBay Seller Hub · Performance",
    period: "Last 31 days",
    src: "/success-stories/ebay-02.svg",
    width: 800,
    height: 560,
    alt: "eBay Seller Hub performance view showing a month of sales.",
    placeholder: true,
  },

  // ---- TikTok Shop ----------------------------------------------------------
  {
    id: "ttk-30d-27k",
    platform: "TikTok Shop",
    model: "Private Label",
    title: "Shop GMV with video-driven sales",
    view: "TikTok Shop Seller Center · Analytics",
    period: "Last 30 days",
    src: "/success-stories/tiktok-01.svg",
    width: 800,
    height: 620,
    alt: "TikTok Shop Seller Center analytics showing GMV, orders, buyers and video-attributed GMV over 30 days.",
    featured: true,
    placeholder: true,
  },
  {
    id: "ttk-30d-9k",
    platform: "TikTok Shop",
    model: "Dropshipping",
    title: "Early-stage shop growth",
    view: "TikTok Shop Seller Center · Analytics",
    period: "Last 30 days",
    src: "/success-stories/tiktok-02.svg",
    width: 800,
    height: 620,
    alt: "TikTok Shop Seller Center analytics for an early-stage shop.",
    placeholder: true,
  },
];

export const businessModels: BusinessModel[] = [
  "Wholesale",
  "Private Label",
  "Dropshipping",
  "Account Recovery",
];

/** Platforms that currently have at least one story, in site order. */
export const storiesByPlatform = (platform: Platform) =>
  successStories.filter((s) => s.platform === platform);

/** Featured first, then the rest in authored order. */
export const sortStories = (list: SuccessStory[]) =>
  [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

/** Small print shown wherever screenshots appear. */
export const storiesDisclosure =
  "Screenshots are from client accounts managed by ECOM BAND and shared with permission. Identifying details are redacted. Past results do not guarantee future performance.";

/** Chapter copy for the dedicated page — one intro per marketplace. */
export const platformChapters: Record<
  Platform,
  { headline: string; blurb: string }
> = {
  Amazon: {
    headline: "Wholesale and private-label accounts, run day to day.",
    blurb:
      "Seller-app snapshots from accounts we source for, ship into FBA, and manage: listings, inventory, returns, and account health.",
  },
  Shopify: {
    headline: "Owned storefronts with real order volume.",
    blurb:
      "Analytics views from Shopify stores we build and operate — private-label brands and dropshipping stores alike — across their busiest months and single peak days.",
  },
  Walmart: {
    headline: "GMV built department by department.",
    blurb:
      "Walmart Seller Center reports comparing each period against the year before, from first-year Decembers to established multi-department catalogs.",
  },
  eBay: {
    headline: "Consistent wholesale sell-through.",
    blurb:
      "Seller Hub performance views showing sales, items sold, and impressions across trailing 30- and 60-day windows.",
  },
  "TikTok Shop": {
    headline: "Video-driven demand, converted in-app.",
    blurb:
      "Seller Center analytics for shops where short-form content drives GMV — from early-stage launches to established catalogs.",
  },
};
