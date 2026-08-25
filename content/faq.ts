export type FaqItem = {
  question: string;
  answer: string;
  /** Shown in the homepage FAQ preview (requirements doc, Home §8). */
  featured?: boolean;
};

export type FaqGroup = {
  title: string;
  items: FaqItem[];
};

export const faqGroups: FaqGroup[] = [
  {
    title: "General Questions",
    items: [
      {
        question: "What platforms does ECOM BAND work with?",
        answer:
          "We provide services across Amazon, Shopify, Walmart, eBay, and TikTok Shop.",
        featured: true,
      },
      {
        question: "Do you work with new e-commerce businesses?",
        answer:
          "Yes. Depending on the selected service, we can help with the setup and launch of new e-commerce businesses.",
        featured: true,
      },
      {
        question: "Do you work with existing sellers?",
        answer:
          "Yes. We also work with existing businesses looking to improve, manage, or expand their e-commerce operations.",
      },
      {
        question: "Do you work only with U.S. businesses?",
        answer:
          "Our primary market is the United States, although our services can be structured for qualified international clients interested in the U.S. market.",
      },
      {
        question: "Do you charge an upfront fee?",
        answer:
          "Engagement structure depends on the service and scope. Talk to our team about your goals and we'll walk you through how the engagement works before anything is committed.",
        featured: true,
      },
    ],
  },
  {
    title: "Amazon Questions",
    items: [
      {
        question: "What Amazon services do you offer?",
        answer:
          "We offer Amazon FBA Wholesale, Amazon FBM Wholesale, Amazon Private Label, and Amazon Account Reinstatement.",
      },
      {
        question: "Do you offer Amazon wholesale?",
        answer:
          "Yes. We offer both FBA and FBM wholesale models, including product research, supplier sourcing, product evaluation, inventory planning, and marketplace operations depending on the engagement.",
        featured: true,
      },
      {
        question: "Can you guarantee Amazon account reinstatement?",
        answer:
          "No. Amazon makes the final decision on account reinstatement. ECOM BAND provides professional analysis, documentation support, and appeal preparation but does not guarantee Amazon's decision.",
      },
      {
        question: "Can you help with a suspended Amazon account?",
        answer:
          "Yes. Our Amazon Account Reinstatement service covers deactivation case analysis, policy review, documentation, and appeal preparation.",
        featured: true,
      },
      {
        question: "Do you provide Amazon wholesale sourcing?",
        answer:
          "Yes. Wholesale services can include product research, supplier sourcing, product evaluation, inventory planning, and marketplace operations depending on the engagement.",
      },
    ],
  },
  {
    title: "Shopify Questions",
    items: [
      {
        question: "Do you offer private label services?",
        answer:
          "Yes. We offer private label services on both Amazon and Shopify — from product research and sourcing to brand development and ongoing management.",
        featured: true,
      },
      {
        question: "Do you offer Shopify dropshipping?",
        answer:
          "Yes. We build and manage Shopify dropshipping operations including product research, store setup, sourcing, order processing, and ongoing management.",
      },
      {
        question: "Can you manage the Shopify store after launch?",
        answer:
          "Yes. Service scope can include ongoing store and business management depending on the engagement.",
      },
    ],
  },
  {
    title: "Other Marketplaces",
    items: [
      {
        question: "Do you offer Walmart wholesale?",
        answer:
          "Yes. We help businesses expand wholesale operations to Walmart Marketplace, including sourcing, listings, inventory, and marketplace operations.",
      },
      {
        question: "Do you offer eBay wholesale?",
        answer:
          "Yes. We build and manage wholesale operations on eBay using established products and marketplace-focused operations.",
      },
      {
        question: "Do you offer TikTok Shop?",
        answer:
          "Yes. We help establish and grow product-based businesses on TikTok Shop, combining product strategy with content-driven commerce.",
      },
    ],
  },
];

export const featuredFaqs = faqGroups
  .flatMap((g) => g.items)
  .filter((i) => i.featured);
