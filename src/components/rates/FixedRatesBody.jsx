import { C, FB } from "../../theme.jsx";
import { RATE_MAX_COLUMNS } from "./rateUtils.js";

export default function FixedRatesBody({ items }) {
  const visibleItems = items.slice(0, RATE_MAX_COLUMNS);
  const count = visibleItems.length;

  return (
    <div className={`kb-rate-grid kb-rate-grid--full kb-rate-grid--fixed kb-rate-grid--count-${count}`}>
      {visibleItems.map((item, index) => (
        <div
          key={item.key}
          className="kb-rate-item"
          style={{borderLeft: index === 0 ? "none" : `1px solid ${C.border}`}}
        >
          <div className="kb-rate-item-term" style={{fontFamily: FB, color: C.muted}}>
            {item.termLabel}
          </div>
          <div className="kb-rate-item-value" style={{fontFamily: FB, color: C.navy}}>
            {item.rate}
          </div>
        </div>
      ))}
    </div>
  );
}
