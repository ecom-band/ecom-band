export type ProcessStep = {
  number: string;
  name: string;
  /** Short version used on the homepage rail (requirements doc, Home §5). */
  summary: string;
  /** Expanded content for the How It Works page. */
  heading: string;
  body: string;
  points: string[];
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    name: "Understand",
    summary:
      "We learn about your business, goals, budget, experience, and preferred e-commerce model.",
    heading: "Consultation",
    body: "Every engagement starts with understanding where you are and where you want the business to go.",
    points: [
      "Your business goals",
      "Investment level",
      "E-commerce experience",
      "Preferred platform",
      "Product interests",
      "Growth expectations",
      "Level of involvement",
    ],
  },
  {
    number: "02",
    name: "Build the Strategy",
    summary:
      "We identify the right platform, business model, products, and operational approach for your goals.",
    heading: "Business Model",
    body: "We determine the most appropriate e-commerce model based on your objectives.",
    points: [
      "Amazon FBA Wholesale",
      "Amazon FBM Wholesale",
      "Amazon Private Label",
      "Shopify Private Label",
      "Shopify Dropshipping",
      "Walmart Wholesale",
      "eBay Wholesale",
      "TikTok Shop",
    ],
  },
  {
    number: "03",
    name: "Launch",
    summary:
      "Our team handles the required setup, sourcing, listings, store operations, and marketplace processes.",
    heading: "Setup & Strategy",
    body: "Depending on the selected service, launch work may include:",
    points: [
      "Product research",
      "Product sourcing",
      "Supplier research",
      "Store / account setup",
      "Listing creation",
      "Brand development",
      "Inventory planning",
      "Fulfillment planning",
      "Marketplace strategy",
    ],
  },
  {
    number: "04",
    name: "Operate",
    summary:
      "We manage the day-to-day activities required to keep your e-commerce business running efficiently.",
    heading: "Operations",
    body: "Once the business is launched, our team supports the operational side of the business. This may include:",
    points: [
      "Marketplace management",
      "Inventory management",
      "Order management",
      "Customer support",
      "Listing optimization",
      "Advertising support",
      "Fulfillment coordination",
      "Performance monitoring",
    ],
  },
  {
    number: "05",
    name: "Scale",
    summary:
      "Once the foundation is working, we identify opportunities to expand products, sales channels, and overall business performance.",
    heading: "Growth",
    body: "We continuously look for opportunities to improve the operation and expand. Potential growth areas include:",
    points: [
      "New products",
      "New brands",
      "Additional marketplaces",
      "Listing optimization",
      "Advertising",
      "Inventory expansion",
      "New sales channels",
    ],
  },
];
