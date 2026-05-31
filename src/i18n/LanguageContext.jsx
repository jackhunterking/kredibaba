import { createContext, useContext, useEffect, useState } from "react";
import tr from "./tr.js";
import en from "./en.js";

const DICTS = { tr, en };
const STORAGE_KEY = "kb-lang";

const LanguageContext = createContext(null);

// Replaces {TOKEN} placeholders in a string with values from `vars`.
export function interp(str, vars = {}) {
  return String(str).replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : `{${k}}`));
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === "undefined") return "tr";
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "en" ? "en" : "tr"; // Turkish is the default
  });

  const setLang = (next) => setLangState(next === "en" ? "en" : "tr");

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore storage failures (private mode, etc.) */
    }
    document.documentElement.lang = lang;
  }, [lang]);

  const value = { lang, setLang, t: DICTS[lang] || tr };
  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within a LanguageProvider");
  return ctx;
}
