import {
  Focus,
  Layers,
  Settings2,
  MapPin,
  Workflow,
  TrendingUp,
  PackageSearch,
  Headset,
  ShieldCheck,
  Store,
  Truck,
  BadgeCheck,
} from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { OperationsPanel } from "@/components/home/OperationsPanel";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/blocks/ServiceCard";
import { OperationStack } from "@/components/home/OperationStack";
import { FaqAccordion } from "@/components/blocks/FaqAccordion";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { BandDivider } from "@/components/band/BandDivider";
import { SuccessStoriesSection } from "@/components/success/SuccessStoriesSection";
import { ProcessRail } from "@/components/band/ProcessRail";
import { services } from "@/content/services";
import { featuredFaqs } from "@/content/faq";
import { platforms } from "@/content/site";
import { platformAccent } from "@/lib/platform";
import { PlatformLogo } from "@/components/brand/PlatformLogo";
import { ImagePlaceholder } from "@/components/blocks/ImagePlaceholder";
import { homeImages } from "@/content/images";

const whyPoints = [
  {
    icon: Focus,
    tag: "Focus",
    title: "E-Commerce Focused",
    body: "Our business is built around e-commerce operations and marketplace growth.",
  },
  {
    icon: Layers,
    tag: "Channels",
    title: "Multi-Platform Expertise",
    body: "Experience across Amazon, Shopify, Walmart, eBay, and TikTok Shop.",
  },
  {
    icon: Settings2,
    tag: "Systems",
    title: "Operational Approach",
    body: "We focus on the systems and processes behind sustainable e-commerce growth.",
  },
  {
    icon: MapPin,
    tag: "Market",
    title: "U.S. Market Focus",
    body: "Our services are primarily designed around the U.S. e-commerce market.",
  },
  {
    icon: Workflow,
    tag: "Scope",
    title: "End-to-End Support",
    body: "From product research and sourcing to marketplace management and fulfillment coordination.",
  },
  {
    icon: TrendingUp,
    tag: "Horizon",
    title: "Long-Term Perspective",
    body: "We focus on building sustainable businesses rather than chasing short-term trends.",
  },
];

const trustPoints = [
  { icon: BadgeCheck, label: "E-commerce expertise" },
  { icon: Layers, label: "Multi-platform experience" },
  { icon: MapPin, label: "U.S. market focus" },
  { icon: PackageSearch, label: "Wholesale sourcing" },
  { icon: Store, label: "Marketplace operations" },
  { icon: Truck, label: "Fulfillment coordination" },
  { icon: Headset, label: "Dedicated support" },
  { icon: ShieldCheck, label: "Account health & compliance" },
];

export default function HomePage() {
  return (
    <>
      {/* 1 — Hero */}
      <Hero />

      {/* 2 — Intro / What We Do */}
      <Section tone="paper">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="What We Do"
              title="E-Commerce Expertise. Real Operations. Built to Scale."
              className="mb-0"
            />
            <p className="mt-5 leading-relaxed text-slate">
              ECOM BAND is an e-commerce growth and management company helping
              businesses establish and scale their presence across the
              world&apos;s leading online marketplaces.
            </p>
            <p className="mt-4 leading-relaxed text-slate">
              We combine product sourcing, marketplace expertise, operational
              management, fulfillment coordination, and e-commerce strategy to
              build businesses designed for long-term growth.
            </p>
            <div className="mt-8">
              <ButtonLink href="/about" variant="outline">
                Learn More About Us
              </ButtonLink>
            </div>
          </Reveal>
          {/* IMG-0A — photo as the back card; the ops console floats over its lower-right */}
          <Reveal delay={0.12} className="relative">
            <div className="relative mx-auto max-w-lg pt-0 pb-0 lg:mx-0 lg:ml-auto">
              <div className="w-[80%] sm:w-[74%]">
                <ImagePlaceholder spec={homeImages.whatWeDo} id="IMG-0A" align="top" />
              </div>
              <div className="relative -mt-[16%] ml-auto w-[88%] sm:-mt-[34%] sm:w-[78%]">
                <OperationsPanel />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 3 — Our Services */}
      <Section tone="paper-soft" id="services">
        <Reveal>
          <SectionHeading
            eyebrow="Our Services"
            title="E-Commerce Solutions Built Around Your Business"
            lead="Whether you're entering e-commerce for the first time or looking to scale an existing operation, ECOM BAND provides platform-specific solutions designed around your goals."
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 0.07} className="h-full">
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 4 — Why ECOM BAND */}
      <Section
        tone="ink"
        className="bg-[radial-gradient(ellipse_60%_55%_at_85%_0%,rgba(224,141,38,0.08),transparent_65%)]"
      >
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <Reveal>
              <SectionHeading
                dark
                eyebrow="Why ECOM BAND"
                title="More Than a Store. We Build the Operation Behind It."
                lead="Successful e-commerce businesses require more than a marketplace account. They require the right products, reliable sourcing, efficient operations, accurate listings, inventory management, fulfillment, customer support, and continuous optimization. ECOM BAND brings these pieces together under one e-commerce-focused team."
              />
            </Reveal>
            <OperationStack />
          </div>

          {/* the manifest — six reasons, six axes */}
          <ul className="divide-y divide-white/8 border-y border-white/8 lg:self-center">
            {whyPoints.map((point, i) => {
              const Icon = point.icon;
              return (
                <li key={point.title} className="group">
                  <Reveal delay={i * 0.05} className="flex gap-5 py-6 sm:gap-6">
                    <span
                      aria-hidden
                      className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/6 text-amber-soft transition-colors duration-300 group-hover:border-amber/40 group-hover:bg-amber/10"
                    >
                      <Icon className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="type-display-sub text-lg text-paper">
                          {point.title}
                        </h3>
                        <span className="font-mono text-[0.6rem] font-medium tracking-[0.22em] text-amber-soft/60 uppercase">
                          {point.tag}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-slate-light">
                        {point.body}
                      </p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      {/* 5 — How It Works */}
      <Section tone="paper">
        <Reveal>
          <SectionHeading
            eyebrow="How It Works"
            title="A Simple Process. A Serious Business."
          />
        </Reveal>
        <ProcessRail />
        <Reveal className="mt-14">
          <ButtonLink href="/how-it-works" variant="outline">
            Start Your Journey
          </ButtonLink>
        </Reveal>
      </Section>

      {/* 6 — Platforms We Work With */}
      <Section tone="paper-soft" className="py-16 md:py-20 lg:py-20">
        <Reveal>
          <SectionHeading
            center
            eyebrow="Platforms"
            title="One Team. Multiple E-Commerce Channels."
            lead="Build your business on one platform or expand across multiple channels as your operation grows."
            className="mb-12"
          />
          <ul className="flex flex-wrap items-end justify-center gap-x-8 gap-y-8 sm:gap-x-14 sm:gap-y-10">
            {platforms.map((p) => (
              <li key={p} className="group">
                <span className="flex items-center gap-3">
                  <PlatformLogo
                    platform={p}
                    className={`size-7 shrink-0 text-ink/35 transition-colors duration-300 sm:size-8 ${platformAccent[p].logoHover}`}
                  />
                  <span className="type-display-sub block text-2xl text-ink transition-colors sm:text-3xl">
                    {p}
                  </span>
                </span>
                <span
                  aria-hidden
                  className={`mt-2.5 block h-[3px] origin-left scale-x-40 rounded-full transition-transform duration-300 group-hover:scale-x-100 ${platformAccent[p].bar}`}
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <BandDivider />

      {/* 7 — Success stories: client dashboards, tabbed by platform */}
      <SuccessStoriesSection />

      {/* 8 — Trust: the capabilities behind those dashboards */}
      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* IMG-01 — the physical operation, tall, with the tickets docked to it */}
          <Reveal className="relative lg:order-2">
            <ImagePlaceholder spec={homeImages.operations} id="IMG-01" />
            <span
              aria-hidden
              className="absolute -right-3 top-10 hidden h-20 w-0.5 rounded-full bg-amber lg:block"
            />
          </Reveal>
          <div className="lg:order-1">
            <Reveal>
              <SectionHeading
                eyebrow="Built on Operations"
                title="Built for Businesses That Want to Grow"
                lead="Client dashboards show the outcome. This is what produces it: the operational capabilities that serious e-commerce businesses actually run on."
                className="mb-8 md:mb-10"
              />
            </Reveal>
          <Reveal delay={0.1}>
            {/* capability tickets — the band's grammar, holding still */}
            <div className="relative overflow-hidden rounded-2xl bg-ink p-5 shadow-2xl shadow-ink/20 min-[400px]:p-6 sm:p-7">
              <span
                aria-hidden
                className="absolute -left-px top-8 h-16 w-0.5 rounded-full bg-amber"
              />
              <p className="font-mono text-[0.65rem] font-semibold tracking-[0.2em] text-slate-light uppercase">
                Operational Coverage
              </p>
              <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {trustPoints.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-3 rounded-lg border border-ink-border bg-ink-soft/70 px-4 py-3.5"
                  >
                    <Icon
                      aria-hidden
                      className="size-4.5 shrink-0 text-amber-soft"
                    />
                    <span className="text-sm font-medium text-paper/90">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          </div>
        </div>
      </Section>

      {/* 9 — FAQ preview */}
      <Section tone="paper-soft">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
          />
        </Reveal>
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <Reveal>
            <FaqAccordion items={featuredFaqs} />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-xl border border-ink/8 bg-white shadow-[0_1px_2px_rgba(13,19,33,0.05)]">
              {/* IMG-02 — a face for the support promise */}
              <ImagePlaceholder
                spec={homeImages.faqSupport}
                id="IMG-02"
                compact
                className="rounded-none border-0 border-b-2"
              />
              <div className="p-6 sm:p-7">
              <h3 className="type-display-sub text-lg">
                Looking for something specific?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                Browse the full list of questions about our services,
                platforms, and how engagements work.
              </p>
              <div className="mt-6">
                <ButtonLink href="/faq" variant="outline">
                  View All FAQs
                </ButtonLink>
              </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 10 — Final CTA */}
      <CtaBanner
        title="Ready to Build Your E-Commerce Business?"
        lead="Tell us about your business, your goals, and the platform you're interested in. Our team will help you identify the right path forward."
        secondary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
