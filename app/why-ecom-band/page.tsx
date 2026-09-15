import type { Metadata } from "next";
import Image from "next/image";
import {
  Focus,
  Layers,
  Package,
  MapPin,
  Warehouse,
  Handshake,
  Check,
} from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { ImagePlaceholder } from "@/components/blocks/ImagePlaceholder";
import { whyImages } from "@/content/images";

export const metadata: Metadata = {
  title: "Why ECOM BAND",
  description:
    "Choosing an e-commerce partner means choosing the team responsible for important decisions behind your business. ECOM BAND takes that responsibility seriously.",
};

const reasons = [
  {
    icon: Focus,
    title: "E-Commerce Is Our Core Business",
    body: "We are focused specifically on e-commerce and marketplace operations.",
  },
  {
    icon: Layers,
    title: "Multi-Platform Experience",
    body: "Our expertise spans Amazon, Shopify, Walmart, eBay, and TikTok Shop.",
  },
  {
    icon: Package,
    title: "Wholesale & Private Label",
    body: "We understand both established-brand wholesale models and private-label brand development.",
  },
  {
    icon: MapPin,
    title: "U.S. Market Focus",
    body: "Our services are designed primarily around the U.S. e-commerce market.",
  },
  {
    icon: Warehouse,
    title: "Operational Infrastructure",
    body: "Our operations include sourcing, inventory, fulfillment, warehouse coordination, customer support, and marketplace management.",
  },
  {
    icon: Handshake,
    title: "One Long-Term Partner",
    body: "As businesses grow, their needs change. We can support expansion across multiple e-commerce channels.",
  },
];

const behindTheScenes = [
  "Finding the right products",
  "Building supplier relationships",
  "Managing inventory",
  "Maintaining accurate listings",
  "Processing orders",
  "Coordinating fulfillment",
  "Supporting customers",
  "Monitoring performance",
  "Expanding strategically",
];

export default function WhyEcomBandPage() {
  return (
    <>
      <PageHero
        eyebrow="Why ECOM BAND"
        title="Experience, Operations, and a Focus on Growth."
        lead="Choosing an e-commerce partner means choosing the team responsible for important decisions behind your business. ECOM BAND takes that responsibility seriously."
      />

      <Section tone="paper">
        <Reveal>
          <SectionHeading
            eyebrow="Why Clients Choose Us"
            title="A Partner Built Around the Work Itself"
          />
        </Reveal>
        {/* editorial ledger — numbered reasons, amber rule lights on hover */}
        <div className="grid gap-x-8 gap-y-11 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <Reveal key={reason.title} delay={(i % 3) * 0.07} className="h-full">
                <div className="group h-full border-t-2 border-ink/10 pt-5 transition-colors duration-300 hover:border-amber">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold tracking-[0.18em] text-amber-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon
                      aria-hidden
                      className="size-5 text-ink/35 transition-colors duration-300 group-hover:text-amber-deep"
                    />
                  </div>
                  <h3 className="type-display-sub mt-4 text-lg">
                    {reason.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate">
                    {reason.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section tone="paper-soft">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Our Difference"
                title="We Focus on the Business Behind the Marketplace Account."
                lead="Opening an account is only the beginning. The real work happens behind the scenes — and that's where ECOM BAND focuses."
                className="mb-0"
              />
            </Reveal>
            {/* IMG-13 — the physical operation under the storefront */}
            <Reveal delay={0.1} className="mt-10">
              {whyImages.behindTheScenes.src ? (
                <Image
                  src={whyImages.behindTheScenes.src}
                  alt={whyImages.behindTheScenes.title}
                  width={whyImages.behindTheScenes.width}
                  height={whyImages.behindTheScenes.height}
                  className="aspect-[4/3] w-full rounded-xl object-cover"
                />
              ) : (
                <ImagePlaceholder spec={whyImages.behindTheScenes} id="IMG-13" />
              )}
            </Reveal>
          </div>
          <div className="relative">
            {/* the Band, threading through the work behind the account */}
            <span
              aria-hidden
              className="absolute top-3 bottom-10 left-4 w-px bg-gradient-to-b from-amber via-amber/40 to-transparent"
            />
            <div className="space-y-2.5">
              {behindTheScenes.map((item, i) => (
                <Reveal key={item} delay={0.08 + i * 0.06}>
                  <div className="relative ml-9 flex items-center gap-3 rounded-xl border border-ink/8 bg-white px-3.5 py-3 shadow-[0_1px_2px_rgba(13,19,33,0.05)] sm:px-4">
                    <span
                      aria-hidden
                      className="absolute top-1/2 -left-[23px] size-[5px] -translate-y-1/2 rounded-full bg-amber"
                    />
                    <span
                      aria-hidden
                      className="absolute top-1/2 -left-5 h-px w-5 bg-gradient-to-r from-amber/50 to-ink/10"
                    />
                    <span className="font-mono text-[0.65rem] font-semibold text-amber-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium text-ink">{item}</span>
                    <Check
                      aria-hidden
                      className="ml-auto size-4 shrink-0 text-mint"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.08 + behindTheScenes.length * 0.06}>
              <p className="mt-5 ml-9 flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.2em] text-slate uppercase">
                <span className="size-1.5 animate-pulse rounded-full bg-mint" />
                One operation, end to end
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <CtaBanner
        title="Build With a Team That Understands the Operation."
        lead="Tell us about your business and where you want to take it — we'll walk you through how ECOM BAND runs the operation behind it."
        primary={{ label: "Talk to ECOM BAND", href: "/contact" }}
        secondary={{ label: "Explore Services", href: "/services" }}
      />
    </>
  );
}
