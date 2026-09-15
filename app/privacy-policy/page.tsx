import type { Metadata } from "next";
import { LegalPage } from "@/components/blocks/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects your information.`,
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="September 16, 2026">
      <section>
        <h2>1. Introduction</h2>
        <p>
          Welcome to {site.name} (&quot;we&quot;, &quot;our&quot;, or
          &quot;us&quot;). We are committed to protecting your privacy and
          ensuring that your personal information is handled securely. This
          Privacy Policy explains how we collect, use, and protect information
          when you visit our website at {site.domain} (the &quot;Site&quot;)
          or engage with us regarding potential investment and partnership
          opportunities.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <p>
          Because our platform is designed for investor onboarding and
          business partnerships, we may collect the following types of
          information:
        </p>
        <h3>Information You Provide to Us</h3>
        <p>
          When you fill out contact forms, request a pitch deck, or
          communicate with our team, we collect personal and professional
          information. This may include your name, email address, phone
          number, company or firm name, and any details regarding your
          investment interests.
        </p>
        <h3>Automatically Collected Information</h3>
        <p>
          When you visit our Site, we automatically collect certain technical
          data. This includes your IP address, browser type, operating
          system, pages viewed, and the dates/times of your visits. This helps
          us understand how visitors interact with our platform.
        </p>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <p>We use the information we collect for the following business purposes:</p>
        <ul>
          <li>To respond to your inquiries and facilitate discussions regarding investment opportunities</li>
          <li>To provide you with requested materials, such as operational dashboards, financial projections, or company presentations</li>
          <li>To maintain and improve the security, functionality, and performance of our website</li>
          <li>To comply with applicable legal obligations and resolve any disputes</li>
        </ul>
      </section>

      <section>
        <h2>4. How We Share Your Information</h2>
        <p>
          We understand that investor confidentiality is paramount. We do not
          sell, rent, or trade your personal or professional information to
          third parties. We only share your data in the following limited
          circumstances:
        </p>
        <ul>
          <li>
            <strong>Service Providers:</strong> We may share information with
            trusted third-party vendors who assist us in operating our
            website, managing communications (such as our secure email and
            phone systems), or analyzing site traffic. These providers are
            bound by strict confidentiality agreements.
          </li>
          <li>
            <strong>Legal Requirements:</strong> We may disclose your
            information if required to do so by law or in response to valid
            requests by public authorities.
          </li>
        </ul>
      </section>

      <section>
        <h2>5. Data Security</h2>
        <p>
          We implement appropriate technical and organizational security
          measures to protect your information against unauthorized access,
          alteration, disclosure, or destruction. However, please note that no
          method of transmission over the internet or electronic storage is
          100% secure.
        </p>
      </section>

      <section>
        <h2>6. Cookies and Tracking Technologies</h2>
        <p>
          Our Site uses cookies and similar tracking technologies to enhance
          user experience and analyze site traffic. You can instruct your
          browser to refuse all cookies or to indicate when a cookie is being
          sent. However, if you do not accept cookies, some portions of our
          Site may not function properly.
        </p>
      </section>

      <section>
        <h2>7. Your Data Rights</h2>
        <p>
          Depending on your location, you may have certain rights regarding
          your personal information, including the right to:
        </p>
        <ul>
          <li>Request access to the personal data we hold about you</li>
          <li>Request that we correct or update inaccuracies in your information</li>
          <li>Request the deletion of your personal data from our systems</li>
        </ul>
        <p>To exercise these rights, please contact us using the information provided below.</p>
      </section>

      <section>
        <h2>8. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect
          changes in our practices or for other operational, legal, or
          regulatory reasons. We will post the updated policy on this page
          and revise the &quot;Effective Date&quot; at the top.
        </p>
      </section>

      <section>
        <h2>9. Contact Us</h2>
        <p>
          If you have any questions, concerns, or requests regarding this
          Privacy Policy or our data practices, please contact us at:
        </p>
        <p>
          Email: <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </section>
    </LegalPage>
  );
}
