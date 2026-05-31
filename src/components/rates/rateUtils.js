export const RATE_ACCENT = "#1B5FCC";
export const RATE_ACCENT_SOFT = "#EAF1FC";
export const RATE_MAX_COLUMNS = 5;

export function getTabEntries(tabs) {
  return [
    { key: "fixed", ...tabs.fixed },
    { key: "variable", ...tabs.variable },
  ];
}

export function getHeroSummaryItem(tab) {
  if (!tab?.items?.length) return null;
  return tab.items.find((item) => item.key === tab.heroSummaryKey) || tab.items[0];
}
