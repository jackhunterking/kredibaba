import { useOutletContext, Link } from "react-router-dom";
import { TrendingDown, ArrowRight, Calculator, Info } from "lucide-react";
import { C, FD, FB, wrap, primaryBtn, ghostBtn, SectionLabel, PageHero } from "../theme.jsx";

const RATES = [
  {term:'5 Yıl Sabit',    rate:'3.89%', type:'Sabit',    best:true},
  {term:'3 Yıl Sabit',    rate:'4.24%', type:'Sabit'},
  {term:'2 Yıl Sabit',    rate:'4.59%', type:'Sabit'},
  {term:'1 Yıl Sabit',    rate:'4.89%', type:'Sabit'},
  {term:'5 Yıl Değişken', rate:'4.45%', type:'Değişken'},
  {term:'3 Yıl Değişken', rate:'4.70%', type:'Değişken'},
];

export default function Rates() {
  const { openForm } = useOutletContext();
  return (
    <>
      <PageHero
        label="Oranlar"
        title="Bu haftanın en iyi mortgage oranları"
        sub="Aşağıdaki oranlar 50+ lender ortağımızdan derlenen gösterge oranlardır. Size özel oran; gelir, kredi notu, peşinat ve mülk türüne göre belirlenir."
      />

      <section style={{...wrap,paddingTop:48,paddingBottom:24}}>
        <div style={{background:'#fff',border:`1px solid ${C.border}`,borderRadius:16,overflow:'hidden',
                     boxShadow:'0 8px 30px rgba(10,37,64,0.06)'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'20px 24px',
                       borderBottom:`1px solid ${C.borderL}`,background:C.surface}}>
            <span style={{fontFamily:FB,fontSize:15,color:C.navy,fontWeight:600}}>Gösterge oranlar · Ontario</span>
            <span style={{display:'flex',alignItems:'center',gap:6,fontSize:12.5,color:C.green,fontWeight:600,
                          background:C.greenFaint,padding:'5px 11px',borderRadius:999}}>
              <TrendingDown size={14}/> Bu hafta düşüşte
            </span>
          </div>
          {RATES.map((r,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'18px 24px',
                                 borderBottom:i<RATES.length-1?`1px solid ${C.borderL}`:'none',
                                 background:r.best?C.blueFaint:'#fff'}}>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <span style={{fontSize:15.5,color:C.navy,fontWeight:600,fontFamily:FB}}>{r.term}</span>
                <span style={{fontSize:11,color:C.muted,border:`1px solid ${C.border}`,padding:'2px 9px',borderRadius:999,fontFamily:FB}}>{r.type}</span>
                {r.best&&<span style={{fontSize:10.5,color:C.green,fontWeight:700,background:C.greenFaint,padding:'3px 9px',borderRadius:4,letterSpacing:.3}}>EN İYİ</span>}
              </div>
              <span style={{fontFamily:FD,fontSize:24,fontWeight:600,color:C.navy}}>{r.rate}</span>
            </div>
          ))}
        </div>

        <div style={{display:'flex',gap:10,alignItems:'flex-start',marginTop:16,padding:'14px 16px',
                     background:C.surface,borderRadius:10,border:`1px solid ${C.border}`}}>
          <Info size={16} color={C.muted} style={{flexShrink:0,marginTop:2}}/>
          <p style={{fontSize:12.5,color:C.muted,lineHeight:1.6,margin:0,fontFamily:FB}}>
            Oranlar yalnızca bilgilendirme amaçlıdır ve önceden haber verilmeksizin değişebilir. Nihai oran ve onay,
            lender değerlendirmesi ve commitment aşamasında kesinleşir; garanti edilmez.
          </p>
        </div>
      </section>

      <section style={{...wrap,paddingTop:32,paddingBottom:72}}>
        <div style={{background:`linear-gradient(135deg,${C.navy} 0%,#0F3357 100%)`,borderRadius:18,
                     padding:'40px 36px',color:'#fff',textAlign:'center'}}>
          <h2 style={{fontFamily:FD,fontSize:'clamp(24px,4vw,32px)',fontWeight:500,marginBottom:12}}>
            Size özel oranı öğrenin
          </h2>
          <p style={{fontSize:16,color:'rgba(255,255,255,0.78)',lineHeight:1.6,maxWidth:480,margin:'0 auto 28px'}}>
            Gösterge oranlar herkes için aynıdır — ama gerçek oranınız profilinize bağlıdır. 2 dakikada öğrenin.
          </p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <button onClick={openForm} style={primaryBtn({padding:'15px 28px',fontSize:16,display:'inline-flex',alignItems:'center',gap:8})}>
              Kişisel oranımı öğren <ArrowRight size={18}/>
            </button>
            <Link to="/araclar" style={{textDecoration:'none'}}>
              <button style={{padding:'15px 26px',fontSize:16,background:'rgba(255,255,255,0.1)',color:'#fff',cursor:'pointer',
                              border:'1px solid rgba(255,255,255,0.25)',borderRadius:8,fontFamily:FB,fontWeight:600,
                              display:'inline-flex',alignItems:'center',gap:8}}>
                <Calculator size={18}/> Ödeme hesapla
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
