import { useState } from "react";
import { C, FB } from "../../theme.jsx";
import RateCardShell from "./RateCardShell.jsx";
import RateDisclosureModal from "./RateDisclosureModal.jsx";
import { getHeroSummaryItem } from "./rateUtils.js";

function SummaryTile({ label, item }) {
  return (
    <div className="kb-hero-rate-summary-item">
      <div className="kb-hero-rate-summary-meta" style={{fontFamily: FB}}>
        <span className="kb-hero-rate-summary-term" style={{color: C.muted}}>
          {item.termLabel}
        </span>
        <span className="kb-hero-rate-summary-label" style={{color: C.blue}}>
          {label}
        </span>
      </div>
      <div className="kb-hero-rate-summary-value" style={{fontFamily: FB, color: C.navy}}>
        {item.rate}
      </div>
      {item.detail ? (
        <div className="kb-hero-rate-summary-detail" style={{fontFamily: FB, color: C.body}}>
          {item.detail}
        </div>
      ) : null}
    </div>
  );
}

export default function HeroRateSummary({ title, tabs, ctaLabel, onCta, disclosure }) {
  const [showDisclosure, setShowDisclosure] = useState(false);
  const fixedItem = getHeroSummaryItem(tabs.fixed);
  const variableItem = getHeroSummaryItem(tabs.variable);

  return (
    <>
      <RateCardShell
        title={title}
        variant="hero-summary"
        ctaLabel={ctaLabel}
        onCta={onCta}
        disclosureLabel={disclosure.label}
        onDisclosure={() => setShowDisclosure(true)}
      >
        <div className="kb-hero-rate-summary-grid">
          {fixedItem ? <SummaryTile label={tabs.fixed.label} item={fixedItem}/> : null}
          {variableItem ? <SummaryTile label={tabs.variable.label} item={variableItem}/> : null}
        </div>
      </RateCardShell>
      {showDisclosure ? (
        <RateDisclosureModal disclosure={disclosure} onClose={() => setShowDisclosure(false)}/>
      ) : null}
    </>
  );
}
