import { ArrowUpRight } from "lucide-react";
import { C, FB, R, WhatsAppIconBadge } from "../../theme.jsx";
import { RATE_ACCENT } from "./rateUtils.js";
import RateTabSwitch from "./RateTabSwitch.jsx";

export default function RateCardShell({
  title,
  variant = "full",
  tabs,
  activeTab,
  onTabChange,
  ctaLabel,
  ctaHref,
  onCta,
  disclosureLabel,
  onDisclosure,
  children,
}) {
  return (
    <div className={`kb-rate-shell kb-rate-shell--${variant}`}>
      <div style={{textAlign: "center"}}>
        <h2 className={`kb-rate-title kb-rate-title--${variant}`} style={{fontFamily: FB, color: C.navy}}>
          {title}
        </h2>
      </div>

      {tabs?.length ? (
        <div className="kb-rate-tabs-wrap">
          <RateTabSwitch entries={tabs} activeKey={activeTab} onChange={onTabChange}/>
        </div>
      ) : null}

      <div className={`kb-rate-shell-body kb-rate-shell-body--${variant}`}>
        {children}
      </div>

      <div className={`kb-rate-shell-actions kb-rate-shell-actions--${variant}`}>
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onCta}
          className={`kb-rate-cta kb-rate-cta--${variant} kb-whatsapp-button`}
          style={{
            border: `1px solid ${C.waDark}55`,
            borderRadius: R.control + 1,
            background: C.wa,
            color: C.waText,
            fontFamily: FB,
            fontWeight: 700,
            cursor: "pointer",
            textDecoration: "none",
            gap: 9,
          }}
        >
          <WhatsAppIconBadge size={24} logoSize={17}/> {ctaLabel}
        </a>
        <button
          type="button"
          onClick={onDisclosure}
          className="kb-rate-disclosure"
          style={{
            border: "none",
            background: "transparent",
            color: C.blue,
            fontFamily: FB,
            fontWeight: 600,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: 0,
          }}
        >
          {disclosureLabel} <ArrowUpRight size={18}/>
        </button>
      </div>
    </div>
  );
}
