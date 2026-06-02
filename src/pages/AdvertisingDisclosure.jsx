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

export default function AdvertisingDisclosure() {
  return (
    <div style={{ background: "#fff", minHeight: "60vh" }}>
      <div style={{ background: C.navy, color: "#fff", padding: "48px 0 40px" }}>
        <div style={{ ...wrap }}>
          <p style={{ fontSize: 12, color: C.blueLight, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10, fontFamily: FB }}>
            Legal
          </p>
          <h1 style={{ fontFamily: FB, fontSize: "clamp(28px,5vw,42px)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: 12 }}>
            Advertising Disclosure
          </h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: FB }}>
            Last Modified: {LAST_MODIFIED}
          </p>
        </div>
      </div>

      <div style={{ ...wrap, paddingTop: 48, paddingBottom: 80, maxWidth: 860 }}>
        <Section title="Kredibaba Service Brand">
          <p>
            Kredibaba is a service brand offered through <strong>{BROKERAGE}</strong>, a licensed mortgage brokerage
            operating in Ontario. Mortgage brokerage services are regulated by the Financial Services Regulatory
            Authority of Ontario (FSRA). Licence No: <strong>{LICENSE}</strong>.
          </p>
          <p style={{ marginTop: 12 }}>
            {BROKERAGE} may receive commissions from lenders when mortgages are funded. These commissions are paid
            by the lender, not by you. Where any fee applies to the borrower, it is disclosed in writing and in plain
            language before you sign any commitment.
          </p>
        </Section>

        <Section title="Mortgage Rate Disclaimer">
          <p>
            Rates shown on this site are based on a limited set of criteria and are provided for informational and
            illustrative purposes only. They do not constitute a rate guarantee, credit approval, or lender commitment.
          </p>
          <ul style={{ paddingLeft: 20, marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            <li>Actual rates may differ depending on additional information collected during the application stage or as lenders update their offers.</li>
            <li>Default rates shown may assume an applicant with strong credit purchasing a residential property in Ontario that meets lender qualification criteria.</li>
            <li>Rates and estimated payment amounts are examples only and do not include homeowners insurance, property taxes, or other costs.</li>
            <li>Not every lender product or offer available in the market is displayed.</li>
            <li>All mortgage products have specific qualification criteria, including income, debt servicing ratios, credit score, property value, and property type.</li>
          </ul>
          <p style={{ marginTop: 12 }}>
            Final rates and approval are confirmed based on your income, credit history, property details, down payment,
            and lender conditions — and are documented in a written commitment.
          </p>
          <p style={{ marginTop: 12 }}>
            For full details, please refer to our{" "}
            <Link to="/kullanim-sartlari" style={{ color: C.blue, textDecoration: "underline" }}>Terms of Use</Link>.
          </p>
        </Section>

        <Section title="Privacy Disclaimer">
          <p>
            When you interact with Kredibaba through WhatsApp, phone, email, or another channel, we (through {BROKERAGE}) may collect your name,
            contact information, financial information, and property details in order to provide mortgage guidance and
            connect your file with suitable lenders.
          </p>
          <p style={{ marginTop: 12 }}>
            Your personal data is handled in accordance with the <em>Personal Information Protection and Electronic
            Documents Act</em> (PIPEDA) and applicable Ontario privacy requirements. We limit use of your information
            to the purposes stated at collection, retain it only as long as necessary, and protect it with appropriate
            safeguards.
          </p>
          <p style={{ marginTop: 12 }}>
            You have the right to access, correct, or withdraw your consent (subject to legal or contractual limits).
            For the full details on how your data is collected, used, and protected, please see our{" "}
            <Link to="/gizlilik" style={{ color: C.blue, textDecoration: "underline" }}>Privacy Policy</Link>.
          </p>
        </Section>

        <div style={{
          background: C.surface, border: `1px solid ${C.border}`,
          borderRadius: R.card, padding: "20px 24px", fontSize: 13,
          color: C.muted, lineHeight: 1.7,
        }}>
          <strong style={{ color: C.navy }}>Questions?</strong> If you have questions about this disclosure, contact
          us at{" "}
          <a href="mailto:privacy@kredibaba.ca" style={{ color: C.blue }}>privacy@kredibaba.ca</a>.
          You can also review our{" "}
          <Link to="/gizlilik" style={{ color: C.blue }}>Privacy Policy</Link> and{" "}
          <Link to="/kullanim-sartlari" style={{ color: C.blue }}>Terms of Use</Link>.
        </div>
      </div>
    </div>
  );
}
