import type { Platform } from "./site";

export type Service = {
  slug: string;
  name: string;
  platform: Platform;
  /** Short blurb for homepage cards (requirements doc, Home §3). */
  cardBlurb: string;
  /** Fuller description for the Services overview grid (requirements doc, Services §2). */
  overview: string;
  detail: {
    intro: string;
    included: string[];
    whoFor: string[];
    /** Compliance note rendered verbatim where present. */
    note?: string;
  };
};

export const services: Service[] = [
  {
    slug: "amazon-fba-wholesale",
    name: "Amazon FBA Wholesale",
    platform: "Amazon",
    cardBlurb:
      "Source established branded products and build a scalable Amazon FBA wholesale operation.",
    overview:
      "Build a scalable Amazon wholesale operation around established branded products, product sourcing, inventory, and FBA fulfillment.",
    detail: {
      intro:
        "Amazon FBA Wholesale is built around established branded products with existing demand. We source from vetted suppliers, manage inventory into Amazon's fulfillment network, and run the marketplace operations that keep the business moving.",
      included: [
        "Product research and evaluation",
        "Wholesale supplier sourcing",
        "Inventory planning and coordination",
        "FBA shipment preparation and coordination",
        "Listing management and optimization",
        "Marketplace account operations",
        "Performance monitoring",
      ],
      whoFor: [
        "Entrepreneurs entering the U.S. e-commerce market with a proven model",
        "Investors who want an operated Amazon business without daily involvement",
        "Existing sellers looking to add wholesale sourcing and scale",
      ],
    },
  },
  {
    slug: "amazon-fbm-wholesale",
    name: "Amazon FBM Wholesale",
    platform: "Amazon",
    cardBlurb:
      "Build and manage a flexible Amazon wholesale business using seller-fulfilled operations.",
    overview:
      "Operate a flexible wholesale business through Amazon's seller-fulfilled model with inventory and fulfillment operations managed outside Amazon FBA.",
    detail: {
      intro:
        "Amazon FBM Wholesale keeps fulfillment outside Amazon's warehouses, giving the business more control over inventory, margins, and logistics. We handle sourcing, listings, and the seller-fulfilled operations behind each order.",
      included: [
        "Product research and supplier sourcing",
        "Inventory and warehouse coordination",
        "Order processing and fulfillment coordination",
        "Listing creation and optimization",
        "Customer support operations",
        "Marketplace account management",
      ],
      whoFor: [
        "Sellers who want more control over fulfillment and margins",
        "Businesses with existing logistics capability",
        "Wholesale operators diversifying beyond FBA",
      ],
    },
  },
  {
    slug: "amazon-private-label",
    name: "Amazon Private Label",
    platform: "Amazon",
    cardBlurb:
      "Develop, launch, and grow your own branded products on Amazon.",
    overview:
      "Build your own brand on Amazon through product research, sourcing, branding, listing development, launch strategy, and ongoing management.",
    detail: {
      intro:
        "Private label means building an asset — your own brand — rather than reselling someone else's. We take the model from product research through sourcing, branding, launch, and ongoing growth on Amazon.",
      included: [
        "Product research and category analysis",
        "Supplier sourcing and product development",
        "Brand development support",
        "Listing development and creative direction",
        "Launch strategy",
        "Advertising support",
        "Ongoing marketplace management",
      ],
      whoFor: [
        "Founders who want to own a brand, not just a store",
        "Businesses extending an existing product line onto Amazon",
        "Investors building a long-term e-commerce asset",
      ],
    },
  },
  {
    slug: "amazon-account-reinstatement",
    name: "Amazon Account Reinstatement",
    platform: "Amazon",
    cardBlurb:
      "Professional support for sellers dealing with Amazon account deactivation and policy-related issues.",
    overview:
      "Get professional assistance with Amazon account deactivation cases, documentation, policy analysis, and appeal preparation.",
    detail: {
      intro:
        "An account deactivation puts the whole business on hold. We analyze the deactivation, review the relevant Amazon policies, and prepare the documentation and appeal so your case is presented professionally.",
      included: [
        "Deactivation case analysis",
        "Amazon policy review",
        "Documentation preparation",
        "Plan of Action drafting",
        "Appeal preparation and submission support",
        "Follow-up guidance during the review process",
      ],
      whoFor: [
        "Sellers whose accounts have been deactivated",
        "Sellers facing policy warnings or at-risk account health",
        "Businesses that need experienced help navigating Amazon's appeal process",
      ],
      note: "Amazon makes the final decision on account reinstatement. ECOM BAND provides professional analysis, documentation support, and appeal preparation but does not guarantee Amazon's decision.",
    },
  },
  {
    slug: "shopify-private-label",
    name: "Shopify Private Label",
    platform: "Shopify",
    cardBlurb:
      "Build a branded Shopify business around your own products and customer experience.",
    overview:
      "Build a branded Shopify store around proprietary or private-label products with a focus on brand presentation, customer experience, and growth.",
    detail: {
      intro:
        "On Shopify, the brand owns the customer relationship. We build private-label Shopify businesses with the presentation, operations, and customer experience of a serious brand — not a template store.",
      included: [
        "Product and niche research",
        "Supplier sourcing and product development",
        "Store design and setup",
        "Brand presentation and content",
        "Order and fulfillment coordination",
        "Ongoing store and business management",
      ],
      whoFor: [
        "Founders building a direct-to-consumer brand",
        "Businesses that want full control of pricing and customer data",
        "Amazon sellers expanding to their own channel",
      ],
    },
  },
  {
    slug: "shopify-dropshipping",
    name: "Shopify Dropshipping",
    platform: "Shopify",
    cardBlurb:
      "Build and manage Shopify dropshipping operations with product sourcing, store management, and fulfillment coordination.",
    overview:
      "Launch and operate a Shopify dropshipping business with product research, store setup, sourcing, order processing, and ongoing management.",
    detail: {
      intro:
        "Dropshipping done professionally is an operations business: reliable suppliers, accurate listings, fast order processing, and responsive support. We run it that way.",
      included: [
        "Product research and validation",
        "Supplier sourcing and vetting",
        "Store setup and management",
        "Order processing",
        "Fulfillment coordination",
        "Customer support operations",
      ],
      whoFor: [
        "Entrepreneurs starting with a lower-inventory model",
        "Operators testing product categories before committing to stock",
        "Businesses that want a managed storefront operation",
      ],
    },
  },
  {
    slug: "walmart-wholesale",
    name: "Walmart Wholesale",
    platform: "Walmart",
    cardBlurb: "Expand your wholesale business to Walmart Marketplace.",
    overview:
      "Expand your wholesale operation to Walmart Marketplace with product sourcing, listing management, inventory, and marketplace operations.",
    detail: {
      intro:
        "Walmart Marketplace is one of the fastest-growing U.S. channels, with less competition than Amazon in many categories. We bring wholesale sourcing and marketplace operations to it.",
      included: [
        "Marketplace setup support",
        "Product sourcing and evaluation",
        "Listing creation and management",
        "Inventory planning",
        "Order and fulfillment coordination",
        "Marketplace performance operations",
      ],
      whoFor: [
        "Amazon wholesale sellers expanding to a second marketplace",
        "Businesses targeting Walmart's growing online customer base",
        "Wholesale operators diversifying channel risk",
      ],
    },
  },
  {
    slug: "ebay-wholesale",
    name: "eBay Wholesale",
    platform: "eBay",
    cardBlurb: "Build and manage a wholesale operation on eBay.",
    overview:
      "Build and manage a wholesale operation on eBay using established products and marketplace-focused operations.",
    detail: {
      intro:
        "eBay remains a serious U.S. marketplace with loyal buyers across many categories. We build wholesale operations on it with the same sourcing and operational discipline as any other channel.",
      included: [
        "Product research and sourcing",
        "Listing creation and optimization",
        "Inventory management",
        "Order processing",
        "Customer support operations",
        "Account health monitoring",
      ],
      whoFor: [
        "Sellers adding an established secondary marketplace",
        "Businesses with inventory suited to eBay's buyer base",
        "Operators building multi-channel wholesale businesses",
      ],
    },
  },
  {
    slug: "tiktok-shop",
    name: "TikTok Shop",
    platform: "TikTok Shop",
    cardBlurb:
      "Establish and grow a product-based business on TikTok Shop.",
    overview:
      "Build a product-focused TikTok Shop operation using product strategy, store management, content-driven commerce, and marketplace operations.",
    detail: {
      intro:
        "TikTok Shop merges content and commerce — products sell where attention already is. We handle the product strategy, store operations, and marketplace side of content-driven selling.",
      included: [
        "Product strategy and selection",
        "Shop setup and management",
        "Listing and catalog operations",
        "Content-driven commerce coordination",
        "Order and fulfillment coordination",
        "Performance monitoring",
      ],
      whoFor: [
        "Brands reaching younger U.S. buyers",
        "Sellers with products suited to demonstration and discovery",
        "Businesses adding a content-led sales channel",
      ],
    },
  },
];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);
