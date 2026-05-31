import { ArrowUpRight } from "lucide-react";
import { C, FB, R } from "../../theme.jsx";
import { RATE_ACCENT } from "./rateUtils.js";
import RateTabSwitch from "./RateTabSwitch.jsx";

export default function RateCardShell({
  title,
  variant = "full",
  tabs,
  activeTab,
  onTabChange,
  ctaLabel,
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
        <button
          type="button"
          onClick={onCta}
          className={`kb-rate-cta kb-rate-cta--${variant}`}
          style={{
            border: "none",
            borderRadius: R.control + 1,
            background: C.blue,
            color: "#fff",
            fontFamily: FB,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {ctaLabel}
        </button>
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
