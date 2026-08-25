import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { OpsBand } from "@/components/band/OpsBand";
import { PlatformLogo } from "@/components/brand/PlatformLogo";
import { platformAccent } from "@/lib/platform";
import type { Platform } from "@/content/site";
import { cn } from "@/lib/cn";

/** Shared dark hero for inner pages. */
export function PageHero({
  eyebrow,
  title,
  lead,
  cta,
  band = false,
  platform,
  visual,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  cta?: { label: string; href: string };
  band?: boolean;
  /** Shows a marketplace chip with the official mark (service pages). */
  platform?: Platform;
  /** Optional right-hand visual (image / placeholder). Switches to a two-column hero on lg+. */
  visual?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(90,100,120,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(90,100,120,0.14) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 20%, black, transparent)",
        }}
      />
      <div
        className={cn(
          "hero-pad relative mx-auto w-full max-w-6xl px-4 pt-28 pb-14 min-[400px]:px-5 sm:px-8 sm:pt-32 sm:pb-16 md:pt-40 md:pb-20 2xl:max-w-7xl",
          !!visual &&
            "grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16",
        )}
      >
        <Reveal>
          <Eyebrow dark>{eyebrow}</Eyebrow>
          {platform && (
            <span className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-ink-soft/70 px-3.5 py-1.5">
              <PlatformLogo
                platform={platform}
                className={`size-4 shrink-0 ${platformAccent[platform].logoDark}`}
              />
              <span className="text-xs font-semibold text-paper/85">
                {platform}
              </span>
            </span>
          )}
          <h1 className="type-display max-w-3xl text-[clamp(2rem,9vw,2.25rem)] sm:text-5xl md:text-6xl 2xl:max-w-4xl 2xl:text-[4.25rem]">
            {title}
          </h1>
          {lead && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-light sm:text-lg">
              {lead}
            </p>
          )}
          {cta && (
            <div className="mt-9">
              <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
            </div>
          )}
        </Reveal>
        {visual && (
          <Reveal delay={0.12} className="relative">
            {/* amber band edge — ties the visual to the operation motif */}
            <span
              aria-hidden
              className="absolute -left-3 top-8 hidden h-16 w-0.5 rounded-full bg-amber lg:block"
            />
            {visual}
          </Reveal>
        )}
      </div>
      {band && <OpsBand className="relative pb-10" />}
    </section>
  );
}
