import { C, FB } from "../../theme.jsx";
import { RATE_MAX_COLUMNS } from "./rateUtils.js";

export default function VariableRatesBody({ items }) {
  const visibleItems = items.slice(0, RATE_MAX_COLUMNS);
  const count = visibleItems.length;

  return (
    <div className={`kb-rate-grid kb-rate-grid--full kb-rate-grid--variable kb-rate-grid--count-${count}`}>
      {visibleItems.map((item, index) => (
        <div
          key={item.key}
          className="kb-rate-item kb-rate-item--variable"
          style={{borderLeft: index === 0 ? "none" : `1px solid ${C.border}`}}
        >
          <div className="kb-rate-item-term" style={{fontFamily: FB, color: C.muted}}>
            {item.termLabel}
          </div>
          <div className="kb-rate-item-value" style={{fontFamily: FB, color: C.navy}}>
            {item.rate}
          </div>
          {item.detail ? (
            <div className="kb-rate-item-detail" style={{fontFamily: FB, color: C.muted}}>
              {item.detail}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
