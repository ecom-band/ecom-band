import type { Metadata } from "next";
import { LegalPage } from "@/components/blocks/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms governing the use of the ${site.name} website.`,
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" updated="September 16, 2026">
      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          Welcome to {site.name} (&quot;Company&quot;, &quot;we&quot;,
          &quot;our&quot;, or &quot;us&quot;). These Terms and Conditions
          (&quot;Terms&quot;) govern your access to and use of our website
          located at {site.domain} (the &quot;Site&quot;). By accessing or
          using the Site, you agree to be bound by these Terms and our
          Privacy Policy. If you do not agree to these Terms, please do not
          use our Site.
        </p>
      </section>

      <section>
        <h2>2. Purpose of the Website</h2>
        <p>
          The Site is intended for informational and business-to-business
          purposes, specifically to provide prospective investors, partners,
          and corporate clients with information regarding our branded
          wholesale operations on Amazon and Walmart.
        </p>
      </section>

      <section>
        <h2>3. No Financial Advice or Offer of Securities</h2>
        <p>
          <strong>3.1 Informational Purposes Only:</strong> All content,
          materials, dashboards, financial projections, and data provided on
          this Site are for informational purposes only. Nothing on this Site
          constitutes financial, legal, tax, or investment advice.
        </p>
        <p>
          <strong>3.2 No Offer to Sell:</strong> The information provided on
          the Site does not constitute an offer to sell, a solicitation of an
          offer to buy, or a recommendation for any security or investment
          opportunity. Any formal investment opportunity will only be offered
          through definitive confidential offering documents and agreements.
        </p>
        <p>
          <strong>3.3 Forward-Looking Statements:</strong> The Site may
          contain forward-looking statements regarding our business
          projections, anticipated growth, or financial goals. These
          statements involve risks and uncertainties, and actual results may
          differ materially. You should not place undue reliance on any
          forward-looking statements.
        </p>
      </section>

      <section>
        <h2>4. Intellectual Property Rights</h2>
        <p>
          All content on the Site—including but not limited to text,
          graphics, logos, wordmarks, dashboard mockups, images, software, and
          the compilation thereof—is the property of {site.name} or its
          licensors and is protected by copyright, trademark, and other
          intellectual property laws. You may not reproduce, distribute,
          modify, or create derivative works of any material from the Site
          without our express written consent.
        </p>
      </section>

      <section>
        <h2>5. User Conduct</h2>
        <p>By using the Site, you agree not to:</p>
        <ul>
          <li>Use the Site for any unlawful purpose or in violation of any local, state, national, or international law</li>
          <li>Attempt to gain unauthorized access to any secure portions of the Site, our servers, or any associated databases</li>
          <li>Use any robot, spider, scraper, or other automated means to access the Site and extract data</li>
          <li>Misrepresent your identity, affiliation, or professional credentials when contacting us or requesting investment materials</li>
        </ul>
      </section>

      <section>
        <h2>6. Confidentiality</h2>
        <p>
          Certain areas of the Site may require access credentials to view
          proprietary business information, pitch decks, or detailed
          financial dashboards. If you are granted access to these secure
          areas, you agree to maintain the confidentiality of all non-public
          information provided to you and not to share this information with
          unauthorized third parties without our prior written consent.
        </p>
      </section>

      <section>
        <h2>7. Third-Party Links</h2>
        <p>
          The Site may contain links to third-party websites or services that
          are not owned or controlled by {site.name}. We have no control
          over, and assume no responsibility for, the content, privacy
          policies, or practices of any third-party websites. Accessing these
          links is at your own risk.
        </p>
      </section>

      <section>
        <h2>8. Disclaimer of Warranties</h2>
        <p>
          The Site and all information contained herein are provided on an
          &quot;as-is&quot; and &quot;as-available&quot; basis. {site.name}{" "}
          makes no representations or warranties of any kind, express or
          implied, as to the operation of the Site or the accuracy,
          completeness, or reliability of the information, content, or
          materials included.
        </p>
      </section>

      <section>
        <h2>9. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by applicable law, in no event
          shall {site.name}, its directors, employees, or agents be liable
          for any direct, indirect, incidental, consequential, or punitive
          damages arising out of or related to your use of, or inability to
          use, the Site or any information provided therein.
        </p>
      </section>

      <section>
        <h2>10. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with
          the laws of the United States, without regard to its conflict of
          law provisions. Any legal action or proceeding related to the Site
          shall be brought exclusively in the courts located in the United
          States.
        </p>
      </section>

      <section>
        <h2>11. Changes to These Terms</h2>
        <p>
          We reserve the right to modify or replace these Terms at any time
          at our sole discretion. Any changes will be effective immediately
          upon posting to the Site. Your continued use of the Site following
          the posting of revised Terms constitutes your acceptance of such
          changes.
        </p>
      </section>

      <section>
        <h2>12. Contact Information</h2>
        <p>For any questions regarding these Terms, please contact us at:</p>
        <p>
          Email: <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </section>
    </LegalPage>
  );
}
