import type { Metadata } from "next";
import { PageHero } from "@/components/blocks/PageHero";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { FaqAccordion } from "@/components/blocks/FaqAccordion";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { faqGroups } from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Find answers to some of the most common questions about ECOM BAND's services and e-commerce models.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqGroups.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  ),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHero
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        lead="Find answers to some of the most common questions about our services and e-commerce models."
      />

      <Section tone="paper">
        <div className="mx-auto max-w-3xl space-y-12">
          {faqGroups.map((group) => (
            <Reveal key={group.title}>
              <Eyebrow>{group.title}</Eyebrow>
              <FaqAccordion items={group.items} />
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBanner
        title="Still Have Questions?"
        lead="Tell us about your business and our team will help you understand the right next step."
        primary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
