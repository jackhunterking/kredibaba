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

export default function PrivacyPolicy() {
  return (
    <div style={{ background: "#fff", minHeight: "60vh" }}>
      <div style={{ background: C.navy, color: "#fff", padding: "48px 0 40px" }}>
        <div style={{ ...wrap }}>
          <p style={{ fontSize: 12, color: C.blueLight, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10, fontFamily: FB }}>
            Legal
          </p>
          <h1 style={{ fontFamily: FB, fontSize: "clamp(28px,5vw,42px)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: 12 }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: FB }}>
            Last Modified: {LAST_MODIFIED}
          </p>
        </div>
      </div>

      <div style={{ ...wrap, paddingTop: 48, paddingBottom: 80, maxWidth: 860 }}>
        <Section title="Introduction">
          <P>
            Kredibaba is a service brand offered through <strong>{BROKERAGE}</strong> (collectively, "we", "us", or "our"),
            a licensed mortgage brokerage in Ontario. This Privacy Policy describes how we collect, use, disclose, and
            protect personal information when you visit <strong>kredibaba.ca</strong> or use our mortgage advisory services.
          </P>
          <P mt={12}>
            By accessing our website or submitting a form, you consent to the collection and use of your information as
            described in this Policy. This Policy works alongside our{" "}
            <Link to="/kullanim-sartlari" style={{ color: C.blue, textDecoration: "underline" }}>Terms of Use</Link>.
          </P>
          <P mt={12}>
            We comply with the <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA) and
            applicable Ontario privacy requirements. FSRA Licence No: <strong>{LICENSE}</strong>.
          </P>
        </Section>

        <Section title="Personal Information We Collect">
          <P>We may collect the following categories of personal information:</P>
          <Ul items={[
            "Identity information: full name, preferred language, and communication preferences.",
            "Contact information: email address, phone number (WhatsApp preferred), and mailing address.",
            "Financial information: annual household income range, down payment amount, employment type, and approximate credit profile.",
            "Property information: approximate property value, location (city/region), and intended property use.",
            "Application information: responses to the starting-form questions used to route your file and identify the right mortgage path.",
          ]} />
          <P mt={12}>
            We collect this information directly from you when you submit a starting form, contact us via WhatsApp,
            email, or phone, or otherwise interact with our services.
          </P>
        </Section>

        <Section title="How We Use Your Information">
          <P>We use your personal information to:</P>
          <Ul items={[
            "Assess your mortgage situation and identify suitable next steps, products, or lenders.",
            "Prepare and submit a mortgage application on your behalf (with your explicit consent).",
            "Communicate with you about your file, next steps, and any required documents.",
            "Comply with legal, regulatory, and lender requirements under Ontario and federal law.",
            "Improve our service and understand how clients interact with our tools and content.",
          ]} />
          <P mt={12}>
            We will not use your personal information for unrelated marketing purposes without your explicit consent.
            Any marketing communications require opt-in consent and can be withdrawn at any time.
          </P>
        </Section>

        <Section title="Disclosure to Third Parties">
          <P>
            We may share your personal information with third parties only as necessary to fulfil the services
            you requested:
          </P>
          <Ul items={[
            "Lenders and financial institutions: when submitting or discussing a mortgage application on your behalf.",
            "Mortgage insurers (e.g., CMHC, Sagen, Canada Guaranty): when applicable to your file.",
            "Service providers who support our operations (e.g., CRM, analytics): subject to confidentiality obligations and only for the stated purposes.",
            "Regulatory authorities: where required by law or as part of our FSRA compliance obligations.",
          ]} />
          <P mt={12}>
            We do not sell your personal information to third parties. We do not share your data with lenders or
            insurers without your knowledge and consent.
          </P>
        </Section>

        <Section title="Cookies & Website Analytics">
          <P>
            Our website may use cookies and similar tracking technologies to understand how visitors interact
            with our pages and tools. This may include:
          </P>
          <Ul items={[
            "Session cookies that help the site function correctly.",
            "Analytics tools (e.g., Google Analytics) that track aggregate usage data such as page views and session duration.",
            "No personal financial data is transmitted through cookies.",
          ]} />
          <P mt={12}>
            You may disable cookies in your browser settings, though some site features may not function as intended.
          </P>
        </Section>

        <Section title="Data Retention">
          <P>
            We retain your personal information only as long as necessary to:
          </P>
          <Ul items={[
            "Fulfil the purpose for which it was collected.",
            "Comply with legal, regulatory, or lender record-keeping requirements.",
            "Resolve disputes or prevent fraud.",
          ]} />
          <P mt={12}>
            When your information is no longer required, it is securely deleted or anonymized.
          </P>
        </Section>

        <Section title="Security Safeguards">
          <P>
            We take the security of your personal information seriously. Our safeguards include access controls,
            encryption for data in transit, and restricted access to personal data on a need-to-know basis.
          </P>
          <P mt={12}>
            However, no internet transmission or electronic storage system can be guaranteed to be completely secure.
            If you believe your information has been compromised, please contact us immediately.
          </P>
        </Section>

        <Section title="Your Rights">
          <P>Under PIPEDA, you have the right to:</P>
          <Ul items={[
            "Access the personal information we hold about you.",
            "Request a correction if the information is inaccurate or incomplete.",
            "Withdraw consent to the collection or use of your information (subject to legal or contractual limits).",
            "Ask how your information is being used and with whom it has been shared.",
          ]} />
          <P mt={12}>
            To exercise any of these rights, please contact our Privacy Officer (see below). We will respond within
            30 days. If you are unsatisfied with our response, you may contact the Office of the Privacy Commissioner
            of Canada at <strong>1-800-282-1376</strong> or{" "}
            <a href="https://www.priv.gc.ca" target="_blank" rel="noopener noreferrer" style={{ color: C.blue }}>www.priv.gc.ca</a>.
          </P>
        </Section>

        <Section title="Contact — Privacy Officer">
          <P>
            If you have questions, concerns, or requests related to your privacy, please contact:
          </P>
          <div style={{ marginTop: 14, padding: "16px 20px", background: C.surface, borderRadius: R.card, border: `1px solid ${C.border}`, fontSize: 14 }}>
            <strong style={{ color: C.navy, display: "block", marginBottom: 6 }}>Privacy Officer — Kredibaba / {BROKERAGE}</strong>
            <div>Email: <a href="mailto:privacy@kredibaba.ca" style={{ color: C.blue }}>privacy@kredibaba.ca</a></div>
            <div style={{ marginTop: 4 }}>Mortgage complaints: <a href="mailto:complaints@kredibaba.ca" style={{ color: C.blue }}>complaints@kredibaba.ca</a></div>
          </div>
        </Section>

        <Section title="Changes to This Policy">
          <P>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated
            "Last Modified" date. Continued use of our services after a change is posted constitutes your acceptance
            of the revised Policy.
          </P>
        </Section>

        <div style={{
          background: C.surface, border: `1px solid ${C.border}`,
          borderRadius: R.card, padding: "20px 24px", fontSize: 13,
          color: C.muted, lineHeight: 1.7, marginTop: 12,
        }}>
          See also:{" "}
          <Link to="/reklam-aciklamasi" style={{ color: C.blue }}>Advertising Disclosure</Link>
          {" · "}
          <Link to="/kullanim-sartlari" style={{ color: C.blue }}>Terms of Use</Link>
        </div>
      </div>
    </div>
  );
}
