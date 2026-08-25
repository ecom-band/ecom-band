import type { ImageSpec } from "@/components/blocks/ImagePlaceholder";

/**
 * Image briefs for every placeholder slot on the site.
 *
 * Each entry describes the photo/graphic that belongs in a slot so it can be
 * sourced or shot, then dropped in. IDs (IMG-xx) appear on the placeholders
 * in the browser so a slot can be referenced unambiguously.
 *
 * When a real asset lands: add it to /public/images, then replace the
 * <ImagePlaceholder> for that ID with <Image> using the same aspect ratio.
 */

/* ------------------------------------------------------------------ Home */

export const homeImages = {
  heroBackdrop: {
    title: "Hero backdrop — fulfillment floor",
    description:
      "Very wide, dark, low-contrast shot of the operation (racking, conveyors, parcels) shot from a distance. It sits BEHIND the headline and conveyor at low opacity — atmosphere, not a subject. Avoid faces and text.",
    aspect: "21/9",
    minSize: "2400 × 1030",
    format: "JPG/WebP · dark, moody",
  },
  whatWeDo: {
    title: "Team on the operations floor",
    description:
      "Two or three team members mid-task — one at a laptop, one with a scanner or carton. Warm light. The ops console card overlaps its bottom-right, so keep the subject upper-left.",
    aspect: "4/5",
    minSize: "1200 × 1500",
    format: "JPG/WebP",
  },
  operations: {
    title: "Fulfillment floor in motion",
    description:
      "Wide shot of a prep / fulfillment area: shelving, labelled cartons, a team member scanning or packing. Candid, warm light, amber/orange accent visible somewhere (tape, label, vest).",
    aspect: "4/5",
    minSize: "1200 × 1500",
    format: "JPG/WebP · no text",
  },
  faqSupport: {
    title: "Support team on a call",
    description:
      "Close, friendly shot of a team member on a headset or video call with a laptop — the human behind the 'dedicated support' promise.",
    aspect: "16/10",
    minSize: "1200 × 750",
    format: "JPG/WebP",
  },
} satisfies Record<string, ImageSpec>;

/* ----------------------------------------------------------------- About */

export const aboutImages = {
  story: {
    title: "The ECOM BAND team",
    description:
      "Group or environmental portrait of the operations team at work — desks, monitors showing seller dashboards (blurred), natural expressions. This is the primary 'who we are' photo.",
    aspect: "4/5",
    minSize: "1200 × 1500",
    format: "JPG/WebP",
  },
  storyDetail: {
    title: "Hands-on detail",
    description:
      "Tight detail shot: labelling a carton, checking a packing list, or a hand on a barcode scanner. Pairs with the team photo as an inset.",
    aspect: "1/1",
    minSize: "800 × 800",
    format: "JPG/WebP",
  },
  galleryWarehouse: {
    title: "Warehouse & prep center",
    description:
      "Racking aisles with inbound inventory and FBA-prepped pallets. Shows the physical infrastructure behind the sourcing and fulfillment claims.",
    aspect: "4/3",
    minSize: "1600 × 1200",
    format: "JPG/WebP",
  },
  gallerySourcing: {
    title: "Sourcing & supplier review",
    description:
      "Team reviewing product samples or a supplier catalogue at a table — boxes, samples, a laptop with a spreadsheet.",
    aspect: "4/3",
    minSize: "1600 × 1200",
    format: "JPG/WebP",
  },
  galleryOps: {
    title: "Marketplace operations desk",
    description:
      "Over-the-shoulder view of a seller-central / Shopify admin on screen with a team member working (screen content blurred or redacted).",
    aspect: "4/3",
    minSize: "1600 × 1200",
    format: "JPG/WebP",
  },
} satisfies Record<string, ImageSpec>;

/* ---------------------------------------------------------- How it works */

/** One image per station, in `processSteps` order. */
export const stationImages: ImageSpec[] = [
  {
    title: "Consultation call",
    description:
      "Two people on a video call or across a table with a notebook — discovery conversation, relaxed and professional.",
    aspect: "16/10",
    minSize: "1200 × 750",
    format: "JPG/WebP",
  },
  {
    title: "Strategy whiteboard",
    description:
      "Whiteboard or tablet sketch comparing marketplace models (Amazon / Shopify / Walmart logos allowed as small marks), a hand pointing.",
    aspect: "16/10",
    minSize: "1200 × 750",
    format: "JPG/WebP",
  },
  {
    title: "Launch: listings & first inventory",
    description:
      "Split scene — a listing being built on screen next to the first cartons of inventory being labelled for shipment.",
    aspect: "16/10",
    minSize: "1200 × 750",
    format: "JPG/WebP",
  },
  {
    title: "Daily operations",
    description:
      "Orders being processed: packing station, printed shipping labels, team member scanning outbound parcels.",
    aspect: "16/10",
    minSize: "1200 × 750",
    format: "JPG/WebP",
  },
  {
    title: "Scaling up",
    description:
      "Fuller racking or a larger outbound stack than the launch shot, or a screen with a growth chart (no real figures) — visually 'more' than station 03.",
    aspect: "16/10",
    minSize: "1200 × 750",
    format: "JPG/WebP",
  },
];

/* --------------------------------------------------------- Why ECOM BAND */

export const whyImages = {
  behindTheScenes: {
    title: "Behind the marketplace account",
    description:
      "Wide operations shot that mixes screens and boxes — the point is that a storefront sits on top of a physical, staffed operation.",
    aspect: "4/3",
    minSize: "1600 × 1200",
    format: "JPG/WebP",
  },
} satisfies Record<string, ImageSpec>;

/* -------------------------------------------------------------- Services */

export const servicesImages = {
  guidance: {
    title: "Choosing a model together",
    description:
      "Advisor walking a client through options on a laptop or printed comparison — collaborative, not salesy.",
    aspect: "4/3",
    minSize: "1600 × 1200",
    format: "JPG/WebP",
  },
} satisfies Record<string, ImageSpec>;

/**
 * Per-service imagery: `card` is the thumbnail on the Services grid,
 * `hero` sits beside the title on the service detail page, `band` is the
 * wide in-page shot between Scope/Fit and Related.
 */
export const serviceImages: Record<
  string,
  { card: ImageSpec; hero: ImageSpec; band: ImageSpec }
> = {
  "amazon-fba-wholesale": {
    card: {
      title: "FBA inbound shipment",
      description: "Labelled cartons on a pallet, FBA box labels visible.",
      aspect: "16/10",
      minSize: "800 × 500",
    },
    hero: {
      title: "Branded wholesale inventory",
      description:
        "Shelves of recognisable branded products (logos incidental, not featured) ready for FBA prep — the wholesale model in one frame.",
      aspect: "5/4",
      minSize: "1400 × 1120",
      format: "JPG/WebP",
    },
    band: {
      title: "FBA prep line",
      description:
        "Wide shot of poly-bagging / labelling / boxing for an Amazon inbound shipment. Panoramic crop.",
      aspect: "21/9",
      minSize: "2100 × 900",
      format: "JPG/WebP",
    },
  },
  "amazon-fbm-wholesale": {
    card: {
      title: "Seller-fulfilled packing",
      description: "Packing station with printed Amazon shipping labels.",
      aspect: "16/10",
      minSize: "800 × 500",
    },
    hero: {
      title: "In-house fulfillment",
      description:
        "Team member packing an order at a bench, carrier labels and parcels in frame — control over fulfillment made visible.",
      aspect: "5/4",
      minSize: "1400 × 1120",
      format: "JPG/WebP",
    },
    band: {
      title: "Outbound parcels",
      description:
        "Stack of ready-to-ship parcels awaiting carrier pickup. Panoramic crop.",
      aspect: "21/9",
      minSize: "2100 × 900",
      format: "JPG/WebP",
    },
  },
  "amazon-private-label": {
    card: {
      title: "Private label product",
      description: "Clean product with custom branded packaging on a neutral background.",
      aspect: "16/10",
      minSize: "800 × 500",
    },
    hero: {
      title: "Brand development",
      description:
        "Packaging mock-ups, colour swatches and a product sample on a desk — the brand-building side of private label.",
      aspect: "5/4",
      minSize: "1400 × 1120",
      format: "JPG/WebP",
    },
    band: {
      title: "From sample to shelf",
      description:
        "Sequence or wide shot: sample → packaged product → boxed for shipment. Panoramic crop.",
      aspect: "21/9",
      minSize: "2100 × 900",
      format: "JPG/WebP",
    },
  },
  "amazon-account-reinstatement": {
    card: {
      title: "Account health review",
      description: "Seller dashboard with account health section on screen (redacted).",
      aspect: "16/10",
      minSize: "800 × 500",
    },
    hero: {
      title: "Compliance & appeal work",
      description:
        "Specialist reviewing a plan of action / policy documents on screen and paper — calm, methodical, trustworthy tone.",
      aspect: "5/4",
      minSize: "1400 × 1120",
      format: "JPG/WebP",
    },
    band: {
      title: "Back in good standing",
      description:
        "Wide desk scene with a 'healthy' account status on screen (mock, no real data). Panoramic crop.",
      aspect: "21/9",
      minSize: "2100 × 900",
      format: "JPG/WebP",
    },
  },
  "shopify-private-label": {
    card: {
      title: "Shopify storefront",
      description: "Laptop showing a branded Shopify store home page (mock).",
      aspect: "16/10",
      minSize: "800 × 500",
    },
    hero: {
      title: "Own-brand storefront",
      description:
        "Branded product beside a laptop displaying its Shopify store — the DTC brand as a complete thing.",
      aspect: "5/4",
      minSize: "1400 × 1120",
      format: "JPG/WebP",
    },
    band: {
      title: "DTC order flow",
      description:
        "Branded unboxing / packing scene with tissue, inserts and mailer boxes. Panoramic crop.",
      aspect: "21/9",
      minSize: "2100 × 900",
      format: "JPG/WebP",
    },
  },
  "shopify-dropshipping": {
    card: {
      title: "Dropship store on screen",
      description: "Shopify admin orders view with supplier-fulfilled orders (mock).",
      aspect: "16/10",
      minSize: "800 × 500",
    },
    hero: {
      title: "Supplier-fulfilled model",
      description:
        "Screen showing an order routed to a supplier alongside a map / shipping graphic — logistics without the warehouse.",
      aspect: "5/4",
      minSize: "1400 × 1120",
      format: "JPG/WebP",
    },
    band: {
      title: "Store, orders, suppliers",
      description:
        "Wide desk scene: storefront, order list and supplier chat across screens (all mock). Panoramic crop.",
      aspect: "21/9",
      minSize: "2100 × 900",
      format: "JPG/WebP",
    },
  },
  "walmart-wholesale": {
    card: {
      title: "Walmart Marketplace",
      description: "Walmart Seller Center dashboard on screen (redacted).",
      aspect: "16/10",
      minSize: "800 × 500",
    },
    hero: {
      title: "Second-marketplace expansion",
      description:
        "Inventory being prepared with Walmart seller labels, or Seller Center on screen — the 'add a channel' story.",
      aspect: "5/4",
      minSize: "1400 × 1120",
      format: "JPG/WebP",
    },
    band: {
      title: "Multi-channel inventory",
      description:
        "Same product stock split into marketplace-labelled lanes. Panoramic crop.",
      aspect: "21/9",
      minSize: "2100 × 900",
      format: "JPG/WebP",
    },
  },
  "ebay-wholesale": {
    card: {
      title: "eBay listings",
      description: "eBay Seller Hub listings view on screen (redacted).",
      aspect: "16/10",
      minSize: "800 × 500",
    },
    hero: {
      title: "eBay wholesale operations",
      description:
        "Products being photographed or listed for eBay, with parcels queued for shipping.",
      aspect: "5/4",
      minSize: "1400 × 1120",
      format: "JPG/WebP",
    },
    band: {
      title: "Listing to shipment",
      description:
        "Wide bench with items, a camera/lightbox, and packed parcels. Panoramic crop.",
      aspect: "21/9",
      minSize: "2100 × 900",
      format: "JPG/WebP",
    },
  },
  "tiktok-shop": {
    card: {
      title: "TikTok Shop content",
      description: "Phone on a tripod filming a product; TikTok Shop UI on screen (mock).",
      aspect: "16/10",
      minSize: "800 × 500",
    },
    hero: {
      title: "Content-led commerce",
      description:
        "Ring light, phone on tripod, product being filmed — the creator/commerce crossover that defines TikTok Shop.",
      aspect: "5/4",
      minSize: "1400 × 1120",
      format: "JPG/WebP",
    },
    band: {
      title: "Studio to shipment",
      description:
        "Small content studio corner next to a packing area. Panoramic crop.",
      aspect: "21/9",
      minSize: "2100 × 900",
      format: "JPG/WebP",
    },
  },
};

/* --------------------------------------------------------------- Contact */

export const contactImages = {
  office: {
    title: "Office / team at work",
    description:
      "Welcoming shot of the workspace or a couple of team members — sets the tone for 'you'll be talking to real people'. If a U.S. location is confirmed, a simple map or city exterior also works.",
    aspect: "4/3",
    minSize: "1200 × 900",
    format: "JPG/WebP",
  },
} satisfies Record<string, ImageSpec>;
