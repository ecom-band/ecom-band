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
    id: "amz-dec-182k",
    platform: "Amazon",
    model: "Wholesale",
    title: "Monthly product sales",
    view: "Amazon Seller app · Product sales",
    period: "December",
    src: "/success-stories/amazon-01.jpg",
    width: 704,
    height: 1520,
    alt: "Amazon Seller app showing $182K in monthly product sales for December.",
    featured: true,
  },
  {
    id: "amz-dec-245k",
    platform: "Amazon",
    model: "Wholesale",
    title: "Peak monthly sales",
    view: "Amazon Seller app · Product sales",
    period: "December",
    src: "/success-stories/amazon-02.jpg",
    width: 704,
    height: 1520,
    alt: "Amazon Seller app showing $245K in monthly product sales for December.",
  },
  {
    id: "amz-oct-98k",
    platform: "Amazon",
    model: "Wholesale",
    title: "Fall sales performance",
    view: "Amazon Seller app · Product sales",
    period: "October",
    src: "/success-stories/amazon-03.jpg",
    width: 704,
    height: 1520,
    alt: "Amazon Seller app showing $98K in monthly product sales for October.",
  },
  {
    id: "amz-aug-142k",
    platform: "Amazon",
    model: "Wholesale",
    title: "Summer sales momentum",
    view: "Amazon Seller app · Product sales",
    period: "August",
    src: "/success-stories/amazon-04.jpg",
    width: 704,
    height: 1520,
    alt: "Amazon Seller app showing $142K in monthly product sales for August.",
  },
  {
    id: "amz-may-185k",
    platform: "Amazon",
    model: "Wholesale",
    title: "Spring sales growth",
    view: "Amazon Seller app · Product sales",
    period: "May",
    src: "/success-stories/amazon-05.jpg",
    width: 704,
    height: 1520,
    alt: "Amazon Seller app showing $185K in monthly product sales for May.",
  },
  {
    id: "amz-jul-205k",
    platform: "Amazon",
    model: "Wholesale",
    title: "Mid-year sales performance",
    view: "Amazon Seller app · Product sales",
    period: "July",
    src: "/success-stories/amazon-06.jpg",
    width: 704,
    height: 1520,
    alt: "Amazon Seller app showing $205K in monthly product sales for July.",
  },

  // ---- Shopify ------------------------------------------------------------
  {
    id: "shp-dec-201k",
    platform: "Shopify",
    model: "Private Label",
    title: "Store-wide monthly sales",
    view: "Shopify Analytics · Total sales",
    period: "December",
    src: "/success-stories/shopify-01.jpg",
    width: 928,
    height: 1136,
    alt: "Shopify analytics showing $201K in total sales across 2,850 orders for December.",
    featured: true,
  },
  {
    id: "shp-jul-102k",
    platform: "Shopify",
    model: "Private Label",
    title: "Mid-summer sales",
    view: "Shopify Analytics · Total sales",
    period: "July",
    src: "/success-stories/shopify-02.jpg",
    width: 837,
    height: 1024,
    alt: "Shopify analytics showing $102K in total sales across 1,480 orders for July.",
  },
  {
    id: "shp-jan-120k",
    platform: "Shopify",
    model: "Private Label",
    title: "New-year sales momentum",
    view: "Shopify Analytics · Total sales",
    period: "January",
    src: "/success-stories/shopify-03.jpg",
    width: 928,
    height: 1136,
    alt: "Shopify analytics showing $120K in total sales across 1,750 orders for January.",
  },
  {
    id: "shp-aug-70k",
    platform: "Shopify",
    model: "Private Label",
    title: "Late-summer sales",
    view: "Shopify Analytics · Total sales",
    period: "August",
    src: "/success-stories/shopify-04.jpg",
    width: 928,
    height: 1136,
    alt: "Shopify analytics showing $70K in total sales across 980 orders for August.",
  },

  // Walmart, eBay, and TikTok Shop stories are hidden until we have real
  // client dashboards to show.
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
