import type { Metadata } from "next";
import { LegalPage } from "@/components/blocks/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms governing the use of the ${site.name} website.`,
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" updated="August 24, 2026">
      <section>
        <h2>1. Agreement to Terms</h2>
        <p>
          These Terms &amp; Conditions (&quot;Terms&quot;) govern your use of{" "}
          {site.domain} (the &quot;Site&quot;), operated by {site.legalName}{" "}
          (&quot;{site.name}&quot;, &quot;we&quot;, &quot;us&quot;, or
          &quot;our&quot;). By accessing or using the Site, you agree to be
          bound by these Terms. If you do not agree, please do not use the
          Site.
        </p>
      </section>

      <section>
        <h2>2. About the Site</h2>
        <p>
          The Site provides information about {site.name}&apos;s e-commerce
          services, including marketplace management, wholesale sourcing,
          private label development, and related operational support. The Site
          content is for general information only and does not constitute
          business, financial, investment, or legal advice.
        </p>
      </section>

      <section>
        <h2>3. No Guarantees of Results</h2>
        <p>
          E-commerce involves commercial risk. Information on the Site about
          our services does not constitute a promise or guarantee of revenue,
          profit, business performance, or any specific outcome. Any
          engagement with {site.name} is governed by a separate written
          service agreement, which defines the scope, fees, and terms of the
          services provided.
        </p>
        <p>
          For Amazon Account Reinstatement services specifically: Amazon makes
          the final decision on account reinstatement. {site.name} provides
          professional analysis, documentation support, and appeal preparation
          but does not guarantee Amazon&apos;s decision.
        </p>
      </section>

      <section>
        <h2>4. Use of the Site</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Site in any way that violates applicable law</li>
          <li>Attempt to gain unauthorized access to the Site or its systems</li>
          <li>Interfere with the Site&apos;s operation or security</li>
          <li>Submit false or misleading information through our forms</li>
          <li>Scrape, copy, or reproduce Site content for commercial use without permission</li>
        </ul>
      </section>

      <section>
        <h2>5. Intellectual Property</h2>
        <p>
          The Site and its content — including text, design, graphics, and
          branding — are owned by {site.legalName} or its licensors and are
          protected by applicable intellectual property laws. Third-party
          platform names (such as Amazon, Shopify, Walmart, eBay, and TikTok
          Shop) are trademarks of their respective owners; their use on the
          Site is for identification only and does not imply endorsement or
          affiliation.
        </p>
      </section>

      <section>
        <h2>6. Third-Party Links &amp; Platforms</h2>
        <p>
          The Site may link to third-party websites or reference third-party
          marketplaces. We are not responsible for the content, policies, or
          practices of any third party, and working with any marketplace is
          subject to that marketplace&apos;s own terms and policies.
        </p>
      </section>

      <section>
        <h2>7. Disclaimer of Warranties</h2>
        <p>
          The Site is provided on an &quot;as is&quot; and &quot;as
          available&quot; basis, without warranties of any kind, express or
          implied, including warranties of merchantability, fitness for a
          particular purpose, and non-infringement. We do not warrant that the
          Site will be uninterrupted, error-free, or free of harmful
          components.
        </p>
      </section>

      <section>
        <h2>8. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, {site.legalName} shall not
          be liable for any indirect, incidental, special, consequential, or
          punitive damages arising from your use of the Site. Nothing in these
          Terms limits liability that cannot be limited under applicable law.
        </p>
      </section>

      <section>
        <h2>9. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. Changes take effect
          when posted on this page. Your continued use of the Site after
          changes are posted constitutes acceptance of the updated Terms.
        </p>
      </section>

      <section>
        <h2>10. Contact</h2>
        <p>
          Questions about these Terms can be sent to{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </section>
    </LegalPage>
  );
}
