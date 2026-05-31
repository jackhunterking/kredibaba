import { Link } from "react-router-dom";
import { C, FB, R, S, wrap } from "../theme.jsx";
import { BROKERAGE, LICENSE } from "../theme.jsx";

const LAST_MODIFIED = "May 31, 2025";

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <h2 style={{
        fontFamily: FB, fontSize: 17, fontWeight: 700,
        color: C.navy, marginBottom: 12,
        textTransform: "uppercase", letterSpacing: 0.5,
        borderBottom: `2px solid ${C.blue}`, paddingBottom: 8,
      }}>
        {title}
      </h2>
      <div style={{ fontSize: 14.5, color: C.dark, lineHeight: 1.8 }}>
        {children}
      </div>
    </div>
  );
}

function P({ children, mt }) {
  return <p style={{ marginTop: mt || 0 }}>{children}</p>;
}

function Ul({ items }) {
  return (
    <ul style={{ paddingLeft: 20, marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

export default function TermsOfUse() {
  return (
    <div style={{ background: "#fff", minHeight: "60vh" }}>
      <div style={{ background: C.navy, color: "#fff", padding: "48px 0 40px" }}>
        <div style={{ ...wrap }}>
          <p style={{ fontSize: 12, color: C.blueLight, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10, fontFamily: FB }}>
            Legal
          </p>
          <h1 style={{ fontFamily: FB, fontSize: "clamp(28px,5vw,42px)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: 12 }}>
            Terms of Use
          </h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: FB }}>
            Last Modified: {LAST_MODIFIED}
          </p>
        </div>
      </div>

      <div style={{ ...wrap, paddingTop: 48, paddingBottom: 80, maxWidth: 860 }}>
        <Section title="Acceptance of Terms">
          <P>
            By accessing or using the Kredibaba website (<strong>kredibaba.ca</strong>) or any of our mortgage
            advisory services, you agree to be bound by these Terms of Use. If you do not agree, please do not
            use our services.
          </P>
          <P mt={12}>
            These Terms apply to you whether you access our site on a desktop or mobile device. By using our
            services, you also agree to our{" "}
            <Link to="/gizlilik" style={{ color: C.blue, textDecoration: "underline" }}>Privacy Policy</Link>,
            which is incorporated herein by reference.
          </P>
        </Section>

        <Section title="About Kredibaba">
          <P>
            Kredibaba is a service brand offered through <strong>{BROKERAGE}</strong>, a licensed mortgage brokerage
            operating in Ontario under the authority of the Financial Services Regulatory Authority of Ontario (FSRA).
            Licence No: <strong>{LICENSE}</strong>.
          </P>
          <P mt={12}>
            Kredibaba provides a bilingual (Turkish and English) mortgage advisory experience to help Canadians —
            particularly members of the Turkish community — understand their mortgage options, prepare their files,
            and connect with suitable lenders. We are not a lender, a bank, or an insurer.
          </P>
        </Section>

        <Section title="Eligibility">
          <P>
            You must be at least 18 years of age and a resident of Ontario to use our mortgage services. By using
            our site or submitting a form, you represent that you meet these requirements.
          </P>
        </Section>

        <Section title="Informational Nature of This Site">
          <P>
            The content on this website — including rates, calculators, articles, and guides — is provided for
            general informational and educational purposes only. It does not constitute:
          </P>
          <Ul items={[
            "A credit approval or pre-approval guarantee.",
            "A rate lock or lender commitment.",
            "Financial, legal, or tax advice.",
          ]} />
          <P mt={12}>
            Nothing on this site should be relied upon as a substitute for obtaining personalized professional advice.
            Final rates, product eligibility, and approval are determined by lenders based on your complete file.
          </P>
        </Section>

        <Section title="Mortgage Rates">
          <P>
            Rates displayed on this site are indicative examples only. They are subject to change at any time
            without notice until a lender issues a written commitment. Displayed rates may assume specific
            borrower and property criteria that may not apply to your situation.
          </P>
          <P mt={12}>
            We do not guarantee that any rate shown is available to you. Your actual rate will depend on income,
            credit score, property details, down payment, lender conditions, and applicable mortgage insurance
            requirements.
          </P>
        </Section>

        <Section title="Accuracy of Information You Provide">
          <P>
            When you submit a starting form or provide any information through our services, you represent
            and warrant that all information is accurate, truthful, current, and complete to the best of your
            knowledge. Providing false or misleading information in connection with a mortgage application
            may constitute fraud and may be reported to the relevant authorities and lenders.
          </P>
        </Section>

        <Section title="Compensation Disclosure">
          <P>
            {BROKERAGE} is compensated through commissions paid by lenders when mortgages are funded. This
            compensation does not increase the rate or cost you pay — lenders set their rates independently
            of broker compensation.
          </P>
          <P mt={12}>
            In circumstances where a fee to the borrower may apply, it will be disclosed to you in writing,
            in plain language, before you sign any commitment or agreement.
          </P>
        </Section>

        <Section title="Third-Party Lenders and Services">
          <P>
            Presenting a lender offer or product on this site does not constitute a recommendation or
            endorsement of that lender. All mortgage applications are submitted to lenders as an offer by you;
            the lender — not Kredibaba or {BROKERAGE} — makes the final credit decision.
          </P>
          <P mt={12}>
            Links to third-party websites are provided for convenience only. We are not responsible for the
            content, accuracy, or privacy practices of any third-party site.
          </P>
        </Section>

        <Section title="Permitted Use">
          <P>
            You agree not to:
          </P>
          <Ul items={[
            "Use automated bots, scrapers, or scripts to access our website or services.",
            "Misrepresent your identity or impersonate another person.",
            "Reproduce, distribute, or commercially exploit our content without written permission.",
            "Use our services for any unlawful purpose or in violation of applicable law.",
            "Attempt to gain unauthorized access to our systems or data.",
          ]} />
        </Section>

        <Section title="Intellectual Property">
          <P>
            All content on this website — including text, graphics, logos, and tools — is the property of
            Kredibaba or {BROKERAGE} and is protected by applicable intellectual property laws. Nothing on
            this site grants you a licence to use our intellectual property without prior written consent.
          </P>
        </Section>

        <Section title="Limitation of Liability">
          <P>
            To the maximum extent permitted by applicable law, Kredibaba and {BROKERAGE} shall not be liable
            for any indirect, incidental, special, or consequential damages arising from your use of (or
            inability to use) this website or our services — including reliance on any rates, tools, or
            information provided here.
          </P>
          <P mt={12}>
            Our services are provided "as is" and "as available." We make no warranties, express or implied,
            as to the accuracy, completeness, or fitness for purpose of any content on this site.
          </P>
        </Section>

        <Section title="Account Inactivity">
          <P>
            If you have created a user account and it remains inactive for 12 or more consecutive months,
            we may deactivate or delete it without further notice.
          </P>
        </Section>

        <Section title="Governing Law & Jurisdiction">
          <P>
            These Terms of Use are governed by the laws of the Province of Ontario and the applicable federal
            laws of Canada. Any dispute arising from these Terms shall be subject to the exclusive jurisdiction
            of the courts of Ontario.
          </P>
        </Section>

        <Section title="Changes to These Terms">
          <P>
            We may update these Terms of Use at any time by posting a revised version on this page. Your
            continued use of our services following any update constitutes your acceptance of the revised Terms.
            The "Last Modified" date at the top of this page indicates when the Terms were last updated.
          </P>
        </Section>

        <Section title="Contact Us">
          <P>
            If you have questions about these Terms, please contact us at:
          </P>
          <div style={{ marginTop: 14, padding: "16px 20px", background: C.surface, borderRadius: R.card, border: `1px solid ${C.border}`, fontSize: 14 }}>
            <strong style={{ color: C.navy, display: "block", marginBottom: 6 }}>Kredibaba / {BROKERAGE}</strong>
            <div>Email: <a href="mailto:legal@kredibaba.ca" style={{ color: C.blue }}>legal@kredibaba.ca</a></div>
          </div>
        </Section>

        <div style={{
          background: C.surface, border: `1px solid ${C.border}`,
          borderRadius: R.card, padding: "20px 24px", fontSize: 13,
          color: C.muted, lineHeight: 1.7, marginTop: 12,
        }}>
          See also:{" "}
          <Link to="/reklam-aciklamasi" style={{ color: C.blue }}>Advertising Disclosure</Link>
          {" · "}
          <Link to="/gizlilik" style={{ color: C.blue }}>Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
}
