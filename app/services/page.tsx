import type { Metadata } from "next";
import Image from "next/image";
import { ServicesHero } from "@/components/services/ServicesHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/blocks/ServiceCard";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { BandDivider } from "@/components/band/BandDivider";
import { services } from "@/content/services";
import { serviceImages, servicesImages } from "@/content/images";
import { ImagePlaceholder } from "@/components/blocks/ImagePlaceholder";

export const metadata: Metadata = {
  title: "E-Commerce Services",
  description:
    "From Amazon wholesale and private label to Shopify, Walmart, eBay, and TikTok Shop — ECOM BAND provides specialized solutions for building and scaling e-commerce businesses.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />

      <Section tone="paper" id="overview" className="scroll-mt-20">
        <Reveal>
          <SectionHeading
            eyebrow="Service Overview"
            title="Nine Services. One Operational Standard."
            lead="Every service runs on the same discipline: real sourcing, accurate listings, managed inventory, coordinated fulfillment, and continuous marketplace operations."
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 0.07} className="h-full">
              {/* IMG-14…22 — one thumbnail per service card */}
              <ServiceCard
                service={service}
                blurb="overview"
                image={serviceImages[service.slug]?.card}
                imageId={`IMG-${14 + i}`}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <BandDivider />

      <Section tone="paper-soft">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* IMG-23 — the advisory conversation */}
          <Reveal>
            {servicesImages.guidance.src ? (
              <Image
                src={servicesImages.guidance.src}
                alt={servicesImages.guidance.title}
                width={servicesImages.guidance.width}
                height={servicesImages.guidance.height}
                className="aspect-[4/3] w-full rounded-xl object-cover"
              />
            ) : (
              <ImagePlaceholder spec={servicesImages.guidance} id="IMG-23" />
            )}
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading
              eyebrow="Guidance"
              title="Not Sure Which E-Commerce Model Is Right for You?"
              lead="Every business is different. The right model depends on your goals, budget, experience, product category, timeline, and preferred level of involvement. Talk to our team and we'll help you understand which model may fit your business."
              className="mb-8"
            />
            <ButtonLink href="/contact">Discuss Your Business</ButtonLink>
          </Reveal>
        </div>
      </Section>

      <CtaBanner title="Let's Build Your Next E-Commerce Business." />
    </>
  );
}
