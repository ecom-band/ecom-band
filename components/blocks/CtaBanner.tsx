import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { OpsBand } from "@/components/band/OpsBand";

/**
 * The reusable final-CTA section — every page ends with one
 * (requirements doc: each page closes with a conversion push).
 */
export function CtaBanner({
  title,
  lead,
  primary = { label: "Get Started", href: "/contact" },
  secondary,
  showBand = true,
}: {
  title: string;
  lead?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  showBand?: boolean;
}) {
  return (
    <Section
      tone="ink"
      className="relative overflow-hidden bg-[radial-gradient(ellipse_55%_65%_at_50%_0%,rgba(224,141,38,0.12),transparent_70%)]"
    >
      <Reveal className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="type-display text-[clamp(1.75rem,8vw,1.875rem)] sm:text-4xl md:text-5xl">
          {title}
        </h2>
        {lead && (
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-light sm:text-lg">
            {lead}
          </p>
        )}
        <div className="mt-9 flex flex-col items-stretch gap-3 min-[400px]:flex-row min-[400px]:flex-wrap min-[400px]:items-center min-[400px]:justify-center min-[400px]:gap-4">
          <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
          {secondary && (
            <ButtonLink href={secondary.href} variant="outline-dark">
              {secondary.label}
            </ButtonLink>
          )}
        </div>
      </Reveal>
      {showBand && <OpsBand className="mt-16 opacity-60" />}
    </Section>
  );
}
