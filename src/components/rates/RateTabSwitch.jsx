import { C, FB, R } from "../../theme.jsx";
import { RATE_ACCENT } from "./rateUtils.js";

export default function RateTabSwitch({ entries, activeKey, onChange }) {
  return (
    <div className="kb-rate-tabs" role="tablist" aria-label="Rate type">
      {entries.map((entry) => {
        const active = entry.key === activeKey;
        return (
          <button
            key={entry.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(entry.key)}
            className={`kb-rate-tab${active ? " is-active" : ""}`}
            style={{
              border: "none",
              borderRadius: R.control - 1,
              background: active ? RATE_ACCENT : "transparent",
              color: active ? "#fff" : C.navy,
              fontFamily: FB,
              cursor: "pointer",
            }}
          >
            {entry.label}
          </button>
        );
      })}
    </div>
  );
}
