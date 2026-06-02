import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  ArrowRight, Calculator, CreditCard, FileCheck, Home as HomeIcon,
  Landmark, Percent, PiggyBank, RefreshCw, Wallet,
} from "lucide-react";
import { C, FB, R, S, SHADOW, wrap, whatsAppBtn, WhatsAppIconBadge, PageHero, SectionLabel, AdvisorStrip } from "../theme.jsx";
import { useLang } from "../i18n/LanguageContext.jsx";

const fmt = (n) => '$' + Math.round(n).toLocaleString('en-CA');

const LIST_ICONS = [
  <Wallet size={20}/>, <FileCheck size={20}/>, <HomeIcon size={20}/>, <Calculator size={20}/>,
  <RefreshCw size={20}/>, <Percent size={20}/>, <Landmark size={20}/>, <Landmark size={20}/>,
  <CreditCard size={20}/>, <PiggyBank size={20}/>, <HomeIcon size={20}/>, <Calculator size={20}/>,
];

function monthlyPayment(principal, annualRate, years) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return principal * r * Math.pow(1+r, n) / (Math.pow(1+r, n) - 1);
}

function Field({ label, value, onChange, min, max, step, suffix }) {
  const display = suffix === '%' ? `${value}%` : suffix ? `${value} ${suffix}` : fmt(value);
  return (
    <div style={{marginBottom:20}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:8,gap:14}}>
        <label style={{fontSize:13.5,color:C.body,fontWeight:600,fontFamily:FB}}>{label}</label>
        <span style={{fontFamily:FB,fontSize:18,color:C.navy,fontWeight:700,whiteSpace:'nowrap'}}>
          {display}
        </span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e=>onChange(Number(e.target.value))}
        style={{width:'100%',accentColor:C.blue,cursor:'pointer'}}/>
    </div>
  );
}

function PaymentCalculator() {
  const { t } = useLang();
  const calc = t.tools.calc;
  const [price, setPrice] = useState(750000);
  const [down, setDown] = useState(150000);
  const [rate, setRate] = useState(Number(t.rates.lowestRate.rate.replace('%','')));
  const [years, setYears] = useState(25);

  const principal = Math.max(price - down, 0);
  const monthly = monthlyPayment(principal, rate, years);
  const downPct = price > 0 ? Math.round((down/price)*100) : 0;

  return (
    <div className="kb-2col" style={{display:'grid',gridTemplateColumns:'1fr 0.78fr',gap:24,alignItems:'stretch'}}>
      <div style={{background:'#fff',border:`1px solid ${C.border}`,borderRadius:R.panel,padding:'28px 26px',
                   boxShadow:SHADOW.card}}>
        <h3 style={{fontFamily:FB,fontSize:25,color:C.navy,fontWeight:600,marginBottom:20}}>{calc.title}</h3>
        <Field label={calc.homePrice} value={price} onChange={setPrice} min={200000} max={2000000} step={10000}/>
        <Field label={calc.fmtDownLabel(calc.downPayment, downPct)} value={down} onChange={setDown} min={0} max={price} step={5000}/>
        <Field label={calc.interestRate} value={rate} onChange={setRate} min={1} max={9} step={0.05} suffix="%"/>
        <Field label={calc.amortization} value={years} onChange={setYears} min={5} max={30} step={1} suffix={calc.amortSuffix}/>
      </div>

      <div style={{background:`linear-gradient(135deg,${C.navy} 0%,${C.navyM} 100%)`,borderRadius:R.panel,
                   padding:'30px 28px',color:'#fff',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        <div>
          <span style={{fontSize:13,color:'rgba(255,255,255,0.7)',fontFamily:FB,fontWeight:600}}>{calc.estMonthly}</span>
          <div style={{fontFamily:FB,fontSize:'clamp(40px,6vw,56px)',fontWeight:700,margin:'8px 0 20px'}}>
            {fmt(monthly)}<span style={{fontSize:16,color:'rgba(255,255,255,0.6)',fontWeight:400}}>{calc.perMonth}</span>
          </div>
        </div>
        <div style={{display:'grid',gap:10}}>
          {[
            {l:calc.sumPrincipal, v:fmt(principal)},
            {l:calc.sumDown, v:fmt(down)},
            {l:calc.sumRate, v:calc.fmtRate2(rate)},
          ].map((row,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',gap:12,padding:'10px 0',borderTop:'1px solid rgba(255,255,255,0.12)'}}>
              <span style={{fontSize:13.5,color:'rgba(255,255,255,0.72)',fontFamily:FB}}>{row.l}</span>
              <span style={{fontSize:14.5,fontWeight:600,fontFamily:FB}}>{row.v}</span>
            </div>
          ))}
        </div>
        <p style={{fontSize:11.5,color:'rgba(255,255,255,0.52)',lineHeight:1.45,marginTop:16,fontFamily:FB}}>
          {calc.note}
        </p>
      </div>
    </div>
  );
}

export default function Tools() {
  const { getWhatsAppHref } = useOutletContext();
  const { t } = useLang();
  const tools = t.tools.list.map((item, i) => ({ ...item, icon: LIST_ICONS[i] }));
  const toolsCtaHref = getWhatsAppHref("araclar");
  return (
    <>
      <PageHero
        label={t.tools.label}
        title={t.tools.title}
        sub={t.tools.sub}
      />

      <section id="mortgage-hesaplayici" style={{...wrap,paddingTop:S[48],paddingBottom:S[32]}}>
        <PaymentCalculator/>
      </section>

      <section style={{...wrap,paddingTop:S[32],paddingBottom:S[64]}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',gap:20,marginBottom:24,flexWrap:'wrap'}}>
          <div>
            <SectionLabel>{t.tools.roadmapLabel}</SectionLabel>
            <h2 style={{fontFamily:FB,fontSize:'clamp(26px,4vw,34px)',color:C.navy,fontWeight:700,lineHeight:1.16}}>{t.tools.roadmapTitle}</h2>
          </div>
          <a href={toolsCtaHref} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
            <span className="kb-whatsapp-button" style={whatsAppBtn({padding:'12px 18px',display:'inline-flex',alignItems:'center',gap:9})}>
              <WhatsAppIconBadge size={24} logoSize={17}/> {t.tools.sendButton} <ArrowRight size={16}/>
            </span>
          </a>
        </div>
        <div className="kb-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
          {tools.map((tool,i)=>(
            <div id={tool.id} key={i} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:R.card,padding:'20px'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:14}}>
                <span style={{width:42,height:42,borderRadius:R.icon,background:'#fff',border:`1px solid ${C.border}`,color:C.blue,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  {tool.icon}
                </span>
                <ArrowRight size={16} color={C.blue}/>
              </div>
              <h3 style={{fontFamily:FB,fontSize:21,color:C.navy,fontWeight:600,margin:'16px 0 4px'}}>{tool.t}</h3>
              <p style={{fontSize:13.5,color:C.muted,fontWeight:600}}>{tool.d}</p>
            </div>
          ))}
        </div>
      </section>

      <AdvisorStrip ctaHref={getWhatsAppHref("araclar-advisor")}/>
    </>
  );
}
