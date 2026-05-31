import { useLang } from "../i18n/LanguageContext.jsx";
import flagTr from "../assets/flag-tr.svg";
import flagGb from "../assets/flag-gb.svg";

const FLAGS = [
  { code: "tr", src: flagTr, label: "Türkçe" },
  { code: "en", src: flagGb, label: "English" },
];

export default function LanguageToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="kb-lang-toggle" role="group" aria-label="Language / Dil">
      {FLAGS.map((f) => (
        <button
          key={f.code}
          type="button"
          className={`kb-lang-flag ${lang === f.code ? "is-active" : ""}`}
          onClick={() => setLang(f.code)}
          aria-pressed={lang === f.code}
          aria-label={f.label}
          title={f.label}
        >
          <img src={f.src} alt="" aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
