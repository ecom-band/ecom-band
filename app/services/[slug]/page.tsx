import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Users, Info } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/blocks/ServiceCard";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { services, getService } from "@/content/services";
import { serviceImages } from "@/content/images";
import { ImagePlaceholder } from "@/components/blocks/ImagePlaceholder";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.overview,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const images = serviceImages[service.slug];
  const imgBase = 24 + services.findIndex((s) => s.slug === service.slug) * 2;

  return (
    <>
      <PageHero
        eyebrow="Services"
        platform={service.platform}
        title={service.name}
        lead={service.detail.intro}
        cta={{ label: "Get Started", href: "/contact" }}
        visual={
          images && (
            /* IMG-24… — service-specific hero visual, dark frame */
            <ImagePlaceholder
              spec={images.hero}
              id={`IMG-${imgBase}`}
              dark
              className="shadow-2xl shadow-black/40"
            />
          )
        }
      />

      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="rounded-xl border border-ink/10 bg-white/60 p-5 min-[400px]:p-7 sm:p-8">
              <SectionHeading
                eyebrow="Scope"
                title="What This Service Covers"
                className="mb-7"
              />
              <ul className="space-y-3.5">
                {service.detail.included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-amber/15">
                      <Check aria-hidden className="size-3 text-amber-deep" />
                    </span>
                    <span className="text-sm leading-relaxed text-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-7 border-t border-ink/10 pt-5 text-xs leading-relaxed text-slate">
                Exact scope depends on the engagement — we structure each
                service around your business model and goals.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-xl border border-ink/10 bg-white/60 p-5 min-[400px]:p-7 sm:p-8">
              <SectionHeading
                eyebrow="Fit"
                title="Who This Is For"
                className="mb-7"
              />
              <ul className="space-y-3.5">
                {service.detail.whoFor.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-mint/15">
                      <Users aria-hidden className="size-3 text-mint" />
                    </span>
                    <span className="text-sm leading-relaxed text-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {service.detail.note && (
                <div className="mt-7 flex items-start gap-3 rounded-lg border border-amber/40 bg-amber/8 p-4">
                  <Info
                    aria-hidden
                    className="mt-0.5 size-4 shrink-0 text-amber-deep"
                  />
                  <p className="text-xs leading-relaxed text-ink">
                    {service.detail.note}
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </Section>

      {images && (
        /* IMG-25… — wide "in operation" shot with a caption strip */
        <Section tone="paper" className="pt-0! md:pt-0! lg:pt-0!">
          <Reveal>
            <figure className="relative">
              <ImagePlaceholder spec={images.band} id={`IMG-${imgBase + 1}`} />
              <figcaption className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-ink/10 pt-4 text-sm text-slate">
                <span className="font-mono text-[0.6rem] font-semibold tracking-[0.2em] text-amber-deep uppercase">
                  {service.name} — in operation
                </span>
                <span aria-hidden className="hidden h-px flex-1 bg-ink/10 sm:block" />
                <span>{images.band.title}</span>
              </figcaption>
            </figure>
          </Reveal>
        </Section>
      )}

      <Section tone="paper-soft">
        <Reveal>
          <SectionHeading
            eyebrow="Related"
            title="Other Ways We Can Help"
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.07} className="h-full">
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBanner
        title={`Ready to Talk About ${service.name}?`}
        lead="Tell us about your business and goals — our team will walk you through how the engagement works."
        secondary={{ label: "View All Services", href: "/services" }}
      />
    </>
  );
}
