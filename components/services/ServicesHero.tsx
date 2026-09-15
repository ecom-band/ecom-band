import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { PlatformLogo } from "@/components/brand/PlatformLogo";
import { serviceIcon } from "@/components/blocks/ServiceCard";
import { platformAccent } from "@/lib/platform";
import { platforms, type Platform } from "@/content/site";
import { services, type Service } from "@/content/services";
import { cn } from "@/lib/cn";

/**
 * Hero for the Services page — dark ink like every page opener, with the
 * "service roster" beside the title: all nine services grouped by
 * marketplace, each chip linking straight to its detail page. Gives the
 * whole offering at a glance before the visitor reaches the grid.
 * Labels come from content/services.ts — nothing invented.
 */

/** "Amazon FBA Wholesale" → "FBA Wholesale"; falls back to the full name. */
function shortName(service: Service) {
  const stripped = service.name.replace(service.platform, "").trim();
  return stripped.length > 0 ? stripped : service.name;
}

export function ServicesHero() {
  const roster = platforms
    .map((platform) => ({
      platform,
      items: services.filter((s) => s.platform === platform),
    }))
    .filter((row) => row.items.length > 0);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      {/* soft grid + amber wash, mirroring the other dark heroes */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(90,100,120,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(90,100,120,0.14) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 75% 80% at 30% 20%, black, transparent)",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-40 right-[-10%] size-[42rem] rounded-full bg-amber/10 blur-3xl"
      />

      <div className="hero-pad relative mx-auto grid w-full max-w-6xl gap-14 px-4 pt-28 pb-16 min-[400px]:px-5 sm:px-8 sm:pt-32 md:pt-40 md:pb-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-12 2xl:max-w-7xl 2xl:gap-16">
        <Reveal>
          <Eyebrow dark>Services</Eyebrow>
          <h1 className="type-display max-w-2xl text-[clamp(2rem,9vw,2.25rem)] sm:text-5xl md:text-6xl 2xl:text-[4.25rem]">
            E-Commerce Services Built for Growth
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-light sm:text-lg">
            From Amazon wholesale and private label to Shopify, Walmart, eBay,
            and TikTok Shop, ECOM BAND provides specialized solutions for
            building and scaling e-commerce businesses.
          </p>

          {/* the marketplaces, as a hairline index */}
          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-7">
            {roster.map(({ platform, items }) => (
              <li
                key={platform}
                className="flex items-center gap-2.5 font-mono text-[0.65rem] tracking-[0.16em] text-slate-light uppercase"
              >
                <PlatformLogo
                  platform={platform}
                  className={cn(
                    "size-3.5 shrink-0",
                    platformAccent[platform].logoDark,
                  )}
                />
                <span className="whitespace-nowrap">
                  {platform}
                  <span className="ml-1.5 text-paper/50 tabular-nums">
                    {pad(items.length)}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col items-stretch gap-3 min-[400px]:flex-row min-[400px]:items-center">
            <ButtonLink href="#overview" arrow={false}>
              Browse All Services
              <ArrowDown
                aria-hidden
                className="size-4 transition-transform duration-200 group-hover:translate-y-0.5"
              />
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline-dark">
              Talk to Our Team
            </ButtonLink>
          </div>
        </Reveal>

        {/* the roster — every service, grouped by marketplace */}
        <Reveal delay={0.12} className="relative">
          <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:ml-auto">
            {/* stacked ghost panels — the roster sits on top of the operation */}
            <div
              aria-hidden
              className="absolute inset-x-6 -bottom-3 top-6 rotate-2 rounded-2xl bg-white/[0.04]"
            />
            <div
              aria-hidden
              className="absolute inset-x-3 -bottom-1.5 top-3 -rotate-1 rounded-2xl bg-white/[0.06]"
            />

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-soft/70 p-5 shadow-2xl shadow-black/40 backdrop-blur-sm min-[400px]:p-6 sm:p-7">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_100%_0%,rgba(224,141,38,0.14),transparent_62%)]" />

              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                  <p className="font-mono text-[0.65rem] font-semibold tracking-[0.2em] text-slate-light uppercase">
                    Service Roster
                  </p>
                  <p className="flex items-center gap-x-3 font-mono text-[0.6rem] tracking-[0.14em] text-slate-light/80 uppercase">
                    <span className="whitespace-nowrap">
                      <span className="text-paper tabular-nums">
                        {pad(services.length)}
                      </span>{" "}
                      Services
                    </span>
                    <span aria-hidden className="h-3 w-px bg-white/15" />
                    <span className="whitespace-nowrap">
                      <span className="text-paper tabular-nums">
                        {pad(roster.length)}
                      </span>{" "}
                      Marketplaces
                    </span>
                  </p>
                </div>

                <ul className="mt-6 divide-y divide-white/8">
                  {roster.map(({ platform, items }) => (
                    <RosterRow key={platform} platform={platform} items={items} />
                  ))}
                </ul>

                <p className="mt-6 flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.2em] text-slate-light/80 uppercase">
                  <span className="size-1.5 animate-pulse rounded-full bg-mint" />
                  Nine services · one operational standard
                </p>
              </div>

              {/* amber band edge */}
              <span
                aria-hidden
                className="absolute -left-px top-8 h-16 w-0.5 rounded-full bg-amber"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function RosterRow({
  platform,
  items,
}: {
  platform: Platform;
  items: Service[];
}) {
  const accent = platformAccent[platform];

  return (
    <li className="flex gap-3.5 py-3.5 first:pt-0 last:pb-0 sm:gap-4">
      <span
        className={cn(
          "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/8",
          accent.tile,
        )}
      >
        <PlatformLogo platform={platform} className={cn("size-4", accent.logoDark)} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.16em] text-slate-light uppercase">
          <span className="whitespace-nowrap">{platform}</span>
          <span aria-hidden className={cn("h-px w-4 rounded-full", accent.bar)} />
        </p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {items.map((service) => {
            const Icon = serviceIcon[service.slug];
            return (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs font-medium whitespace-nowrap text-paper/85 transition-colors duration-200 hover:border-amber/60 hover:bg-amber/10 hover:text-paper"
                >
                  {Icon && (
                    <Icon
                      aria-hidden
                      className="size-3.5 shrink-0 text-amber-soft"
                    />
                  )}
                  {shortName(service)}
                  <ArrowUpRight
                    aria-hidden
                    className="size-3 shrink-0 text-paper/40 transition-all duration-200 group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-amber"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}
