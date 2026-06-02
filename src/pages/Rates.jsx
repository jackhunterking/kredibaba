import { useOutletContext, Link } from "react-router-dom";
import { ArrowRight, Calculator } from "lucide-react";
import { C, FB, R, S, wrap, ghostBtn, whatsAppBtn, WhatsAppIconBadge, PageHero } from "../theme.jsx";
import { useLang } from "../i18n/LanguageContext.jsx";
import SharedRateCard from "../components/rates/SharedRateCard.jsx";

export default function Rates() {
  const { getWhatsAppHref } = useOutletContext();
  const { t } = useLang();
  const r = t.rates;
  const ratesCtaHref = getWhatsAppHref("oranlar");
  return (
    <>
      <PageHero
        label={r.label}
        title={r.title}
        sub={r.sub}
      />

      <section style={{background:`linear-gradient(180deg,#fff 0%,#fff 18%,${C.blueFaint} 18%,${C.blueFaint} 100%)`}}>
        <div style={{...wrap,paddingTop:S[40],paddingBottom:S[40]}}>
          <SharedRateCard
            title={r.cardTitle}
            tabs={r.tabs}
            ctaLabel={r.cardCtaLabel}
            ctaHref={ratesCtaHref}
            disclosure={r.disclosure}
          />
        </div>
      </section>

      <section style={{...wrap,paddingTop:S[32],paddingBottom:S[64]}}>
        <div style={{background:C.navy,borderRadius:R.panel,padding:'34px 30px',color:'#fff'}}>
          <div className="kb-2col" style={{display:'grid',gridTemplateColumns:'1fr auto',gap:24,alignItems:'center'}}>
            <div>
              <h2 style={{fontFamily:FB,fontSize:'clamp(26px,4vw,34px)',fontWeight:700,lineHeight:1.16,marginBottom:8}}>
                {r.cta.title}
              </h2>
              <p style={{fontSize:15,color:'rgba(255,255,255,0.72)',lineHeight:1.5}}>{r.cta.sub}</p>
            </div>
            <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
              <a href={ratesCtaHref} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
                <span className="kb-whatsapp-button" style={whatsAppBtn({padding:'13px 22px',fontSize:15.5,display:'inline-flex',alignItems:'center',gap:9})}>
                  <WhatsAppIconBadge size={24} logoSize={17}/> {r.cta.btnAccount} <ArrowRight size={17}/>
                </span>
              </a>
              <Link to="/araclar" style={{textDecoration:'none'}}>
                <button style={{...ghostBtn({padding:'14px 22px',fontSize:15.5}),background:'rgba(255,255,255,0.1)',color:'#fff',border:'1px solid rgba(255,255,255,0.25)',display:'inline-flex',alignItems:'center',gap:8}}>
                  <Calculator size={17}/> {r.cta.btnCalc}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
