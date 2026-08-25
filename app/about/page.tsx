import type { Metadata } from "next";
import { Anchor, BadgeCheck, Clock, RefreshCw } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { FeatureCard } from "@/components/blocks/FeatureCard";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { BandDivider } from "@/components/band/BandDivider";
import { ImagePlaceholder } from "@/components/blocks/ImagePlaceholder";
import { aboutImages } from "@/content/images";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "ECOM BAND was created with a simple goal: help businesses build professional, scalable e-commerce operations across the platforms that matter.",
};

const beliefs = [
  {
    icon: Anchor,
    title: "Build on Strong Foundations",
    body: "The right products, suppliers, processes, and systems matter.",
  },
  {
    icon: BadgeCheck,
    title: "Operate Professionally",
    body: "E-commerce is a real business that requires consistent operations and attention to detail.",
  },
  {
    icon: Clock,
    title: "Think Long Term",
    body: "We focus on building businesses that can continue to grow rather than chasing temporary trends.",
  },
  {
    icon: RefreshCw,
    title: "Keep Improving",
    body: "E-commerce changes constantly. Successful businesses need to adapt.",
  },
];

const gallery = [
  {
    id: "IMG-05",
    spec: aboutImages.galleryWarehouse,
    caption: "Inventory in, prepped inventory out.",
  },
  {
    id: "IMG-06",
    spec: aboutImages.gallerySourcing,
    caption: "Products and suppliers, vetted before anything is listed.",
  },
  {
    id: "IMG-07",
    spec: aboutImages.galleryOps,
    caption: "Marketplace accounts, run every day.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="We Build E-Commerce Businesses, Not Just Online Stores."
        lead="ECOM BAND was created with a simple goal: help businesses build professional, scalable e-commerce operations across the platforms that matter."
      />

      <Section tone="paper">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Our Story"
              title="Built Around Real E-Commerce Operations"
              className="mb-0"
            />
            <div className="mt-5 space-y-4 leading-relaxed text-slate">
              <p>
                Our experience spans marketplace management, wholesale
                sourcing, private label, fulfillment, inventory operations,
                customer support, and e-commerce growth.
              </p>
              <p>
                We work across multiple platforms because today&apos;s
                e-commerce businesses need more than one channel to create
                long-term opportunities.
              </p>
              <p>
                Our approach combines an experienced operations team with
                U.S.-based sourcing and fulfillment capabilities to help
                clients build and manage their businesses more effectively.
              </p>
            </div>
          </Reveal>

          {/* IMG-03 + IMG-04 — team portrait with an offset detail inset */}
          <Reveal delay={0.12} className="relative">
            <div className="relative mx-auto max-w-md pr-8 pb-10 sm:pr-12 sm:pb-12 lg:mx-0 lg:ml-auto">
              <ImagePlaceholder spec={aboutImages.story} id="IMG-03" />
              <div className="absolute right-0 bottom-0 w-[46%] rounded-xl bg-paper p-1.5 shadow-xl shadow-ink/15">
                <ImagePlaceholder
                  spec={aboutImages.storyDetail}
                  id="IMG-04"
                  compact
                />
              </div>
              <span
                aria-hidden
                className="absolute top-8 -left-3 h-16 w-0.5 rounded-full bg-amber"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <BandDivider />

      {/* Inside the operation — three environmental shots with captions */}
      <Section tone="paper-soft">
        <Reveal>
          <SectionHeading
            eyebrow="Inside the Operation"
            title="Where the Work Actually Happens"
            lead="A storefront is the visible part. Behind it sit the shelves, the suppliers, and the daily marketplace operations that keep it running."
          />
        </Reveal>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((g, i) => (
            <li key={g.id} className={i === 2 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <Reveal delay={i * 0.07}>
                <figure>
                  <ImagePlaceholder spec={g.spec} id={g.id} />
                  <figcaption className="mt-3 flex items-center gap-2.5 text-sm text-slate">
                    <span className="font-mono text-[0.6rem] font-semibold tracking-[0.18em] text-amber-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {g.caption}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper">
        <Reveal>
          <SectionHeading eyebrow="Our Approach" title="What We Believe" />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {beliefs.map((belief, i) => (
            <Reveal key={belief.title} delay={(i % 2) * 0.08} className="h-full">
              <FeatureCard {...belief} />
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBanner title="Have an E-Commerce Goal? Let's Talk." />
    </>
  );
}
