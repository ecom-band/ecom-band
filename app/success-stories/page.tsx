import type { Metadata } from "next";
import { ShieldCheck, EyeOff, Scale } from "lucide-react";
import { StoriesHero } from "@/components/success/StoriesHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { StoriesTour } from "@/components/success/StoriesTour";

export const metadata: Metadata = {
  title: "Success Stories",
  description:
    "Real seller dashboards from client accounts managed by ECOM BAND across Amazon, Shopify, Walmart, eBay, and TikTok Shop.",
};

const readingNotes = [
  {
    icon: ShieldCheck,
    title: "Shared with permission",
    body: "Every screenshot comes from a client account we operate, and every client agreed to its use here.",
  },
  {
    icon: EyeOff,
    title: "Redacted, not retouched",
    body: "We hide names, ASINs, and account identifiers. We never edit the figures themselves.",
  },
  {
    icon: Scale,
    title: "Context matters",
    body: "Each business had a different starting point, budget, and timeline. Results vary and are never guaranteed.",
  },
];

export default function SuccessStoriesPage() {
  return (
    <>
      <StoriesHero />

      <StoriesTour />

      <Section tone="paper-soft">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="How to Read These"
              title="Proof, With the Fine Print Attached."
              lead="A screenshot is a moment, not a promise. Here is exactly what these images are — and what they aren't."
              className="mb-0"
            />
            <div className="mt-8 flex flex-col gap-3 min-[400px]:flex-row min-[400px]:flex-wrap">
              <ButtonLink href="/how-it-works" variant="outline">
                See How It Works
              </ButtonLink>
              <ButtonLink href="/services" variant="ghost">
                Explore Services
              </ButtonLink>
            </div>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {readingNotes.map((n, i) => {
              const Icon = n.icon;
              return (
                <li key={n.title}>
                  <Reveal delay={i * 0.07} className="h-full">
                    <div className="flex h-full gap-4 rounded-xl border border-ink/8 bg-white p-5 shadow-[0_1px_2px_rgba(13,19,33,0.05)]">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber/12 text-amber-deep">
                        <Icon aria-hidden className="size-5" />
                      </span>
                      <div>
                        <h3 className="type-display-sub text-base">{n.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate">
                          {n.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      <CtaBanner
        title="Your Dashboard Could Be Next."
        lead="Tell us where your business stands today and which marketplace you want to grow on. We'll map the operation that gets you there."
        primary={{ label: "Start a Conversation", href: "/contact" }}
        secondary={{ label: "Why ECOM BAND", href: "/why-ecom-band" }}
      />
    </>
  );
}
