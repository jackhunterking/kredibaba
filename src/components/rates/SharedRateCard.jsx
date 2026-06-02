import { useState } from "react";
import FixedRatesBody from "./FixedRatesBody.jsx";
import RateCardShell from "./RateCardShell.jsx";
import RateDisclosureModal from "./RateDisclosureModal.jsx";
import VariableRatesBody from "./VariableRatesBody.jsx";
import { getTabEntries } from "./rateUtils.js";

export default function SharedRateCard({ title, tabs, ctaLabel, ctaHref, onCta, disclosure }) {
  const tabEntries = getTabEntries(tabs);
  const [activeTab, setActiveTab] = useState(tabEntries[0]?.key || "fixed");
  const [showDisclosure, setShowDisclosure] = useState(false);

  const activeConfig = tabEntries.find((entry) => entry.key === activeTab) || tabEntries[0];
  const body = activeTab === "variable"
    ? <VariableRatesBody items={activeConfig.items}/>
    : <FixedRatesBody items={activeConfig.items}/>;

  return (
    <>
      <RateCardShell
        title={title}
        variant="full"
        tabs={tabEntries}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        ctaLabel={ctaLabel}
        ctaHref={ctaHref}
        onCta={onCta}
        disclosureLabel={disclosure.label}
        onDisclosure={() => setShowDisclosure(true)}
      >
        {body}
      </RateCardShell>
      {showDisclosure ? (
        <RateDisclosureModal disclosure={disclosure} onClose={() => setShowDisclosure(false)}/>
      ) : null}
    </>
  );
}
