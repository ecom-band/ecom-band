import { PageHero } from "@/components/blocks/PageHero";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title="This Page Isn't Part of the Operation."
        lead="The page you're looking for doesn't exist or has moved. Let's get you back on track."
      />
      <Section tone="paper" className="py-16 md:py-20 lg:py-20">
        <div className="flex flex-wrap gap-4">
          <ButtonLink href="/">Back to Home</ButtonLink>
          <ButtonLink href="/services" variant="outline">
            Explore Services
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
