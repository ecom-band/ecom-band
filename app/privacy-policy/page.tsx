import type { Metadata } from "next";
import { LegalPage } from "@/components/blocks/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects your information.`,
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="August 24, 2026">
      <section>
        <h2>1. Introduction</h2>
        <p>
          This Privacy Policy describes how {site.legalName} (&quot;
          {site.name}&quot;, &quot;we&quot;, &quot;us&quot;, or
          &quot;our&quot;) collects, uses, and protects information when you
          visit {site.domain} (the &quot;Site&quot;) or contact us about our
          services. By using the Site, you agree to the practices described in
          this policy.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <h3>Information you provide</h3>
        <p>
          When you submit our contact form or email us, we collect the
          information you choose to share, such as your name, company name,
          email address, phone or WhatsApp number, the service you are
          interested in, and your message.
        </p>
        <h3>Information collected automatically</h3>
        <p>
          With your consent, we use analytics tools (such as Google Analytics)
          that collect information about how visitors use the Site, including
          pages visited, approximate location, device and browser type, and
          referring pages. This information is aggregated and does not
          directly identify you.
        </p>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To respond to your inquiries and provide requested information about our services</li>
          <li>To communicate with you about consultations and engagements</li>
          <li>To understand how the Site is used and improve its content and performance</li>
          <li>To comply with legal obligations</li>
        </ul>
        <p>
          We do not sell your personal information, and we do not share it
          with third parties for their own marketing purposes.
        </p>
      </section>

      <section>
        <h2>4. Cookies &amp; Analytics</h2>
        <p>
          The Site uses cookies for analytics only after you accept them
          through our cookie banner. You can decline analytics cookies without
          affecting your ability to use the Site, and you can clear cookies at
          any time through your browser settings.
        </p>
      </section>

      <section>
        <h2>5. How We Share Information</h2>
        <p>
          We share information only with service providers who help us operate
          the Site and respond to inquiries (such as website hosting and email
          delivery providers), and only to the extent necessary for those
          purposes. These providers are obligated to protect your information.
          We may also disclose information if required by law.
        </p>
      </section>

      <section>
        <h2>6. Data Retention</h2>
        <p>
          We retain inquiry information for as long as needed to respond to
          and manage your inquiry, maintain our business records, and comply
          with legal obligations. You may request deletion of your information
          at any time (see Section 8).
        </p>
      </section>

      <section>
        <h2>7. Data Security</h2>
        <p>
          We use reasonable technical and organizational measures to protect
          your information, including encrypted connections (HTTPS) across the
          Site. No method of transmission or storage is completely secure, and
          we cannot guarantee absolute security.
        </p>
      </section>

      <section>
        <h2>8. Your Rights</h2>
        <p>
          Depending on where you live, you may have rights to access, correct,
          or delete personal information we hold about you, or to object to or
          restrict certain processing. To exercise any of these rights,
          contact us at <a href={`mailto:${site.email}`}>{site.email}</a>. We
          will respond within the timeframe required by applicable law.
        </p>
      </section>

      <section>
        <h2>9. Children&apos;s Privacy</h2>
        <p>
          The Site is intended for business audiences and is not directed at
          children under 16. We do not knowingly collect personal information
          from children.
        </p>
      </section>

      <section>
        <h2>10. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes take
          effect when posted on this page, and the &quot;Last updated&quot;
          date will be revised accordingly.
        </p>
      </section>

      <section>
        <h2>11. Contact</h2>
        <p>
          Questions about this policy or your information can be sent to{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </section>
    </LegalPage>
  );
}
