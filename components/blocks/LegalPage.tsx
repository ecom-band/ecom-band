import { PageHero } from "@/components/blocks/PageHero";
import { Section } from "@/components/ui/Section";

/**
 * Shared shell for legal documents. Content is standard boilerplate
 * generated for ECOM BAND PRIVATE LIMITED — flagged for review by the
 * client's legal counsel before publication (requirements doc §10).
 */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} lead={`Last updated: ${updated}`} />
      <Section tone="paper">
        <div className="prose-legal mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-slate [&_h2]:font-semibold [&_h2]:text-lg [&_h2]:text-ink [&_h3]:font-semibold [&_h3]:text-ink [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_a]:text-amber-deep [&_a]:underline [&_a]:underline-offset-2">
          {children}
        </div>
      </Section>
    </>
  );
}
