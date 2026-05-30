import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Calculator, ArrowRight, Wallet, PiggyBank, Percent } from "lucide-react";
import { C, FD, FB, wrap, primaryBtn, SectionLabel, PageHero } from "../theme.jsx";

const fmt = (n) => '$' + Math.round(n).toLocaleString('en-CA');

function monthlyPayment(principal, annualRate, years) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return principal * r * Math.pow(1+r, n) / (Math.pow(1+r, n) - 1);
}

function Field({ label, value, onChange, min, max, step, suffix }) {
  return (
    <div style={{marginBottom:22}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:8}}>
        <label style={{fontSize:13.5,color:C.body,fontWeight:600,fontFamily:FB}}>{label}</label>
        <span style={{fontFamily:FD,fontSize:18,color:C.navy,fontWeight:600}}>
          {suffix==='%' ? `${value}%` : fmt(value)}
        </span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e=>onChange(Number(e.target.value))}
        style={{width:'100%',accentColor:C.blue,cursor:'pointer'}}/>
    </div>
  );
}

function PaymentCalculator() {
  const [price, setPrice] = useState(750000);
  const [down,  setDown]  = useState(150000);
  const [rate,  setRate]  = useState(4.45);
  const [years, setYears] = useState(25);

  const principal = Math.max(price - down, 0);
  const monthly = monthlyPayment(principal, rate, years);
  const downPct = price > 0 ? Math.round((down/price)*100) : 0;
  const totalPaid = monthly * years * 12;
  const totalInterest = totalPaid - principal;

  return (
    <div className="kb-2col" style={{display:'grid',gridTemplateColumns:'1fr 0.85fr',gap:24,alignItems:'start'}}>
      {/* Inputs */}
      <div style={{background:'#fff',border:`1px solid ${C.border}`,borderRadius:16,padding:'30px 28px',
                   boxShadow:'0 4px 20px rgba(10,37,64,0.05)'}}>
        <h3 style={{fontFamily:FD,fontSize:21,color:C.navy,fontWeight:600,marginBottom:24}}>Mortgage ödeme hesaplama</h3>
        <Field label="Ev fiyatı" value={price} onChange={setPrice} min={200000} max={2000000} step={10000}/>
        <Field label={`Peşinat (${downPct}%)`} value={down} onChange={setDown} min={0} max={price} step={5000}/>
        <Field label="Faiz oranı" value={rate} onChange={setRate} min={1} max={9} step={0.05} suffix="%"/>
        <Field label="Vade (amortisman)" value={years} onChange={setYears} min={5} max={30} step={1} suffix="yr"/>
        <p style={{fontSize:12.5,color:C.muted,lineHeight:1.6,fontFamily:FB,marginTop:4}}>
          Vade: {years} yıl · Mortgage tutarı: {fmt(principal)}
        </p>
      </div>

      {/* Result */}
      <div style={{background:`linear-gradient(135deg,${C.navy} 0%,#0F3357 100%)`,borderRadius:16,
                   padding:'30px 28px',color:'#fff',position:'sticky',top:86}}>
        <span style={{fontSize:13,color:'rgba(255,255,255,0.7)',fontFamily:FB,fontWeight:500}}>Tahmini aylık ödeme</span>
        <div style={{fontFamily:FD,fontSize:42,fontWeight:600,margin:'6px 0 24px'}}>
          {fmt(monthly)}<span style={{fontSize:16,color:'rgba(255,255,255,0.6)',fontWeight:400}}> / ay</span>
        </div>
        {[
          {l:'Mortgage tutarı',  v:fmt(principal)},
          {l:'Toplam faiz',      v:fmt(totalInterest)},
          {l:'Toplam geri ödeme',v:fmt(totalPaid)},
        ].map((r,i)=>(
          <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'12px 0',
                               borderTop:'1px solid rgba(255,255,255,0.12)'}}>
            <span style={{fontSize:14,color:'rgba(255,255,255,0.72)',fontFamily:FB}}>{r.l}</span>
            <span style={{fontSize:14.5,fontWeight:600,fontFamily:FB}}>{r.v}</span>
          </div>
        ))}
        <p style={{fontSize:11.5,color:'rgba(255,255,255,0.5)',lineHeight:1.6,marginTop:16,fontFamily:FB}}>
          Tahmini değerdir; vergi, sigorta (CMHC) ve aidatlar dahil değildir.
        </p>
      </div>
    </div>
  );
}

export default function Tools() {
  const { openForm } = useOutletContext();
  const otherTools=[
    {icon:<Wallet size={20}/>,    t:'Uygunluk hesaplama',    d:'Gelirinize göre alabileceğiniz maksimum ev fiyatını hesaplayın.'},
    {icon:<PiggyBank size={20}/>, t:'Peşinat & sigorta',     d:'Farklı peşinat senaryolarında CMHC sigorta maliyetini görün.'},
    {icon:<Percent size={20}/>,   t:'Yenileme karşılaştırma',d:'Mevcut oranınızla piyasa oranlarını karşılaştırın.'},
  ];
  return (
    <>
      <PageHero
        label="Araçlar"
        title="Rakamları kendiniz görün"
        sub="Ücretsiz hesaplama araçlarımızla aylık ödemenizi, toplam faizi ve farklı senaryoları saniyeler içinde keşfedin."
      />

      <section style={{...wrap,paddingTop:48,paddingBottom:24}}>
        <PaymentCalculator/>
      </section>

      <section style={{...wrap,paddingTop:32,paddingBottom:24}}>
        <h2 style={{fontFamily:FD,fontSize:24,color:C.navy,fontWeight:500,marginBottom:24,textAlign:'center'}}>
          Yakında daha fazla araç
        </h2>
        <div className="kb-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
          {otherTools.map((t,i)=>(
            <div key={i} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:'24px',opacity:.92}}>
              <div style={{width:44,height:44,borderRadius:10,background:'#fff',border:`1px solid ${C.border}`,color:C.blue,
                           display:'flex',alignItems:'center',justifyContent:'center',marginBottom:14}}>{t.icon}</div>
              <h3 style={{fontFamily:FB,fontSize:16.5,color:C.navy,fontWeight:600,marginBottom:7}}>{t.t}</h3>
              <p style={{fontSize:13.5,color:C.body,lineHeight:1.6}}>{t.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{...wrap,paddingTop:40,paddingBottom:72,textAlign:'center'}}>
        <button onClick={openForm} style={primaryBtn({padding:'15px 30px',fontSize:16,display:'inline-flex',alignItems:'center',gap:8})}>
          Gerçek oranımı öğren <ArrowRight size={18}/>
        </button>
      </section>
    </>
  );
}
