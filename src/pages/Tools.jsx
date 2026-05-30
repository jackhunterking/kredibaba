import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  ArrowRight, Calculator, CreditCard, FileCheck, Home as HomeIcon,
  Landmark, Percent, PiggyBank, RefreshCw, Wallet,
} from "lucide-react";
import { C, FD, FB, R, S, SHADOW, wrap, primaryBtn, PageHero, SectionLabel, LOWEST_RATE } from "../theme.jsx";

const fmt = (n) => '$' + Math.round(n).toLocaleString('en-CA');

function monthlyPayment(principal, annualRate, years) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return principal * r * Math.pow(1+r, n) / (Math.pow(1+r, n) - 1);
}

function Field({ label, value, onChange, min, max, step, suffix }) {
  return (
    <div style={{marginBottom:20}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:8,gap:14}}>
        <label style={{fontSize:13.5,color:C.body,fontWeight:800,fontFamily:FB}}>{label}</label>
        <span style={{fontFamily:FD,fontSize:18,color:C.navy,fontWeight:700,whiteSpace:'nowrap'}}>
          {suffix==='%' ? `${value}%` : suffix==='yıl' ? `${value} yıl` : fmt(value)}
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
  const [down, setDown] = useState(150000);
  const [rate, setRate] = useState(Number(LOWEST_RATE.rate.replace('%','')));
  const [years, setYears] = useState(25);

  const principal = Math.max(price - down, 0);
  const monthly = monthlyPayment(principal, rate, years);
  const downPct = price > 0 ? Math.round((down/price)*100) : 0;

  return (
    <div className="kb-2col" style={{display:'grid',gridTemplateColumns:'1fr 0.78fr',gap:24,alignItems:'stretch'}}>
      <div style={{background:'#fff',border:`1px solid ${C.border}`,borderRadius:R.panel,padding:'28px 26px',
                   boxShadow:SHADOW.card}}>
        <h3 style={{fontFamily:FD,fontSize:25,color:C.navy,fontWeight:600,marginBottom:20}}>Ödeme hesaplayıcı</h3>
        <Field label="Ev fiyatı" value={price} onChange={setPrice} min={200000} max={2000000} step={10000}/>
        <Field label={`Peşinat (${downPct}%)`} value={down} onChange={setDown} min={0} max={price} step={5000}/>
        <Field label="Faiz oranı" value={rate} onChange={setRate} min={1} max={9} step={0.05} suffix="%"/>
        <Field label="Amortisman" value={years} onChange={setYears} min={5} max={30} step={1} suffix="yıl"/>
      </div>

      <div style={{background:`linear-gradient(135deg,${C.navy} 0%,${C.navyM} 100%)`,borderRadius:R.panel,
                   padding:'30px 28px',color:'#fff',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        <div>
          <span style={{fontSize:13,color:'rgba(255,255,255,0.7)',fontFamily:FB,fontWeight:700}}>Tahmini aylık ödeme</span>
          <div style={{fontFamily:FD,fontSize:'clamp(40px,6vw,56px)',fontWeight:700,margin:'8px 0 20px'}}>
            {fmt(monthly)}<span style={{fontSize:16,color:'rgba(255,255,255,0.6)',fontWeight:400}}> / ay</span>
          </div>
        </div>
        <div style={{display:'grid',gap:10}}>
          {[
            {l:'Mortgage tutarı', v:fmt(principal)},
            {l:'Peşinat', v:fmt(down)},
            {l:'Oran', v:`%${rate.toFixed(2)}`},
          ].map((r,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',gap:12,padding:'10px 0',borderTop:'1px solid rgba(255,255,255,0.12)'}}>
              <span style={{fontSize:13.5,color:'rgba(255,255,255,0.72)',fontFamily:FB}}>{r.l}</span>
              <span style={{fontSize:14.5,fontWeight:800,fontFamily:FB}}>{r.v}</span>
            </div>
          ))}
        </div>
        <p style={{fontSize:11.5,color:'rgba(255,255,255,0.52)',lineHeight:1.45,marginTop:16,fontFamily:FB}}>
          Tahmindir; onay veya oran garantisi değildir.
        </p>
      </div>
    </div>
  );
}

export default function Tools() {
  const { openForm } = useOutletContext();
  const tools=[
    {id:'mortgage-yol-bulucu', icon:<Wallet size={20}/>, t:'Mortgage yol bulucu', d:'Kişisel başlangıç önerisi'},
    {id:'on-onay', icon:<FileCheck size={20}/>, t:'Ön onay', d:'Yaklaşık alım gücünü görün'},
    {id:'ilk-ev-alici-hesaplayici', icon:<HomeIcon size={20}/>, t:'İlk ev alıcı hesaplayıcı', d:'Program uygunluğunu görün'},
    {icon:<Calculator size={20}/>, t:'Mortgage hesaplayıcı', d:'Aylık ödeme tahmini'},
    {id:'mortgage-yenileme-hesaplayici', icon:<RefreshCw size={20}/>, t:'Mortgage yenileme hesaplayıcı', d:'Yenileme bütçesi'},
    {id:'uygunluk-hesaplayici', icon:<Percent size={20}/>, t:'Uygunluk hesaplayıcı', d:'Maksimum alım gücü'},
    {id:'tapu-devir-vergisi', icon:<Landmark size={20}/>, t:'Tapu devir vergisi', d:'Vergi maliyeti'},
    {id:'kapanis-masrafi', icon:<Landmark size={20}/>, t:'Kapanış masrafı', d:'Toplam kapanış gideri'},
    {id:'odeme-karsilastirmasi', icon:<CreditCard size={20}/>, t:'Ödeme karşılaştırması', d:'Mevcut ve yeni ödeme farkı'},
    {id:'kiralamak-mi-almak-mi', icon:<PiggyBank size={20}/>, t:'Kiralamak mı almak mı?', d:'Seçenekleri karşılaştırın'},
    {id:'tadilat-hesaplayici', icon:<HomeIcon size={20}/>, t:'Tadilat hesaplayıcı', d:'Ev sermayesi limiti'},
    {id:'mortgage-ceza-hesaplayici', icon:<Calculator size={20}/>, t:'Mortgage ceza hesaplayıcı', d:'Bozma maliyeti'},
  ];
  return (
    <>
      <PageHero
        label="Araçlar"
        title="Önce rakamları görün."
        sub="Ön onay, ödeme tahmini ve kapanış masrafını görün; sonra danışmanla netleştirin."
      />

      <section id="mortgage-hesaplayici" style={{...wrap,paddingTop:S[48],paddingBottom:S[32]}}>
        <PaymentCalculator/>
      </section>

      <section style={{...wrap,paddingTop:S[32],paddingBottom:S[64]}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',gap:20,marginBottom:24,flexWrap:'wrap'}}>
          <div>
            <SectionLabel>Yol haritası</SectionLabel>
            <h2 style={{fontFamily:FD,fontSize:'clamp(26px,4vw,34px)',color:C.navy,fontWeight:500,lineHeight:1.16}}>Sıradaki araçlar</h2>
          </div>
          <button onClick={openForm} style={primaryBtn({padding:'13px 22px',display:'inline-flex',alignItems:'center',gap:8})}>
            Sonuçları gönder <ArrowRight size={16}/>
          </button>
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
              <h3 style={{fontFamily:FD,fontSize:21,color:C.navy,fontWeight:600,margin:'16px 0 4px'}}>{tool.t}</h3>
              <p style={{fontSize:13.5,color:C.muted,fontWeight:800}}>{tool.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
