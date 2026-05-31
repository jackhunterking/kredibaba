import { useOutletContext, Link } from "react-router-dom";
import { ArrowRight, Calculator, Check, Info, TrendingDown } from "lucide-react";
import { C, FB, R, S, SHADOW, wrap, primaryBtn, ghostBtn, PageHero } from "../theme.jsx";
import { useLang } from "../i18n/LanguageContext.jsx";

export default function Rates() {
  const { openForm } = useOutletContext();
  const { t } = useLang();
  const r = t.rates;
  const heroRates = r.heroRates;
  return (
    <>
      <PageHero
        label={r.label}
        title={r.title}
        sub={r.sub}
      />

      <section style={{...wrap,paddingTop:S[48],paddingBottom:S[32]}}>
        <div className="kb-2col" style={{display:'grid',gridTemplateColumns:'1fr 0.72fr',gap:22,alignItems:'stretch'}}>
          <div style={{background:'#fff',border:`1px solid ${C.border}`,borderRadius:R.panel,padding:'34px 32px',
                       boxShadow:SHADOW.card}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:16,marginBottom:30,flexWrap:'wrap'}}>
              <span style={{display:'inline-flex',alignItems:'center',gap:7,fontSize:12.5,color:C.green,fontWeight:600,
                            background:C.greenFaint,padding:'7px 12px',borderRadius:R.chip,fontFamily:FB}}>
                <TrendingDown size={14}/> {r.chip}
              </span>
              <span style={{fontSize:13,color:C.muted,fontWeight:600,fontFamily:FB}}>{heroRates[0].updated}</span>
            </div>
            <div className="kb-2col" style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:16,marginBottom:28}}>
              {heroRates.map((rate) => {
                const pending = rate.pending;
                return (
                  <div key={rate.label} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:R.card,padding:'22px 20px'}}>
                    <p style={{fontSize:13,color:C.muted,fontWeight:600,fontFamily:FB,marginBottom:6}}>{rate.product}</p>
                    <h2 style={{fontFamily:FB,fontSize:26,color:C.navy,fontWeight:600,lineHeight:1.18,marginBottom:16}}>
                      {rate.term}
                    </h2>
                    <div style={{
                      fontFamily:FB,
                      fontSize:pending ? 'clamp(28px,4vw,38px)' : 'clamp(48px,7vw,66px)',
                      fontWeight:700,
                      color:pending ? C.muted : C.navy,
                      lineHeight:1.05,
                      marginBottom:12,
                    }}>
                      {rate.rate}
                    </div>
                    <p style={{fontSize:12.5,color:C.muted,lineHeight:1.45,margin:0,fontFamily:FB}}>
                      {rate.qualification}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="kb-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
              {r.chips3.map((item,i)=>(
                <div key={i} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:R.control,padding:'14px 12px',fontSize:13,color:C.navy,fontWeight:600,fontFamily:FB}}>
                  <Check size={14} color={C.green} style={{verticalAlign:'-2px',marginRight:6}}/>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:R.panel,padding:'28px 26px',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
            <div>
              <Info size={24} color={C.blue}/>
              <h3 style={{fontFamily:FB,fontSize:27,color:C.navy,fontWeight:600,margin:'16px 0 12px'}}>
                {r.whoTitle}
              </h3>
              <div style={{display:'grid',gap:10}}>
                {r.whoItems.map((item,i)=>(
                  <span key={i} style={{fontSize:14.5,color:C.navy,fontWeight:600,fontFamily:FB,borderBottom:i<2?`1px solid ${C.border}`:'none',paddingBottom:i<2?10:0}}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <p style={{fontSize:12.2,color:C.muted,lineHeight:1.45,marginTop:20,fontFamily:FB}}>
              {r.whoNote}
            </p>
          </div>
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
              <button onClick={openForm} style={primaryBtn({padding:'14px 24px',fontSize:15.5,display:'inline-flex',alignItems:'center',gap:8})}>
                {r.cta.btnAccount} <ArrowRight size={17}/>
              </button>
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
