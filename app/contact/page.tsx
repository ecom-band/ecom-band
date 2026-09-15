import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/blocks/ContactForm";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { site } from "@/content/site";
import { contactImages } from "@/content/images";
import { ImagePlaceholder } from "@/components/blocks/ImagePlaceholder";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Whether you're starting a new e-commerce business, scaling an existing operation, or need help with a specific marketplace, tell us what you're looking to achieve.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Talk About Your E-Commerce Business."
        lead="Whether you're starting a new e-commerce business, scaling an existing operation, or need help with a specific marketplace, tell us what you're looking to achieve."
      />

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <Reveal>
            <Eyebrow>Get Started</Eyebrow>
            <h2 className="type-display-sub mb-8 text-2xl sm:text-3xl">
              Tell Us About Your Goals
            </h2>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1} className="space-y-5">
            {/* IMG-42 — the people you'll be talking to */}
            {contactImages.office.src ? (
              <Image
                src={contactImages.office.src}
                alt={contactImages.office.title}
                width={contactImages.office.width}
                height={contactImages.office.height}
                className="aspect-[4/3] w-full rounded-xl object-cover"
              />
            ) : (
              <ImagePlaceholder spec={contactImages.office} id="IMG-42" />
            )}
            <div className="rounded-xl border border-ink/10 bg-white/60 p-5 min-[400px]:p-7 sm:p-8">
              <Eyebrow>Contact Information</Eyebrow>
              <ul className="mt-2 space-y-5">
                <li className="flex items-start gap-3.5">
                  <Mail aria-hidden className="mt-0.5 size-4.5 text-amber-deep" />
                  <div>
                    <p className="text-sm font-semibold text-ink">Email</p>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-sm text-slate underline-offset-2 hover:underline"
                    >
                      {site.email}
                    </a>
                  </div>
                </li>
                {site.phone.display && site.phone.value && (
                  <li className="flex items-start gap-3.5">
                    <Phone aria-hidden className="mt-0.5 size-4.5 text-amber-deep" />
                    <div>
                      <p className="text-sm font-semibold text-ink">
                        Phone
                      </p>
                      <p className="text-sm text-slate">{site.phone.value}</p>
                    </div>
                  </li>
                )}
                {site.address.display && site.address.value && (
                  <li className="flex items-start gap-3.5">
                    <MapPin aria-hidden className="mt-0.5 size-4.5 text-amber-deep" />
                    <div>
                      <p className="text-sm font-semibold text-ink">Location</p>
                      <p className="text-sm text-slate">{site.address.value}</p>
                    </div>
                  </li>
                )}
                <li className="flex items-start gap-3.5">
                  <Clock aria-hidden className="mt-0.5 size-4.5 text-amber-deep" />
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      Business Hours
                    </p>
                    <p className="text-sm text-slate">
                      {site.businessHours} — consultations by appointment
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 border-t border-ink/10 pt-6">
                <p className="text-xs leading-relaxed text-slate">
                  Serving businesses across the {site.markets}. We typically
                  respond within one business day.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBanner
        title="Your Next E-Commerce Opportunity Starts With a Conversation."
        showBand={false}
      />
    </>
  );
}
