import { services } from "./services";

export const mainNav = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({
      label: s.name,
      href: `/services/${s.slug}`,
    })),
  },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
  { label: "Why ECOM BAND", href: "/why-ecom-band" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Why ECOM BAND", href: "/why-ecom-band" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Contact", href: "/contact" },
  ],
  services: services.map((s) => ({
    label: s.name,
    href: `/services/${s.slug}`,
  })),
  resources: [
    { label: "Success Stories", href: "/success-stories" },
    { label: "FAQ", href: "/faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};
