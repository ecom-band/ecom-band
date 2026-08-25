import type { Metadata } from "next";
import { PageHero } from "@/components/blocks/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { BuildLine } from "@/components/band/BuildLine";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "We combine strategy, sourcing, technology, marketplace expertise, and daily operations to build e-commerce businesses designed for sustainable growth.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How It Works"
        title="From Strategy to Scale"
        lead="We combine strategy, sourcing, technology, marketplace expertise, and daily operations to build e-commerce businesses designed for sustainable growth."
        band
      />

      {/* The five stations, run as a vertical pass down the Band */}
      <Section tone="paper">
        <Reveal>
          <div className="mb-12 flex items-center gap-4 md:mb-16">
            <p className="font-mono text-[0.65rem] font-semibold tracking-[0.22em] text-amber-deep uppercase">
              The Band — 5 stations
            </p>
            <span aria-hidden className="h-px flex-1 bg-ink/10" />
            <p className="hidden font-mono text-[0.65rem] font-medium tracking-[0.22em] text-slate uppercase sm:block">
              Consultation → Growth
            </p>
          </div>
        </Reveal>
        <BuildLine />
      </Section>

      <CtaBanner
        title="Let's Build the Right Strategy for Your Business."
        primary={{ label: "Book a Consultation", href: "/contact" }}
      />
    </>
  );
}
