import { useOutletContext } from "react-router-dom";
import { ArrowRight, Eye, Heart, MessageCircle, ShieldCheck, Users } from "lucide-react";
import {
  C, FD, FB, R, S, WA, wrap, primaryBtn, Avatar, PageHero, SectionLabel, BROKERAGE, LICENSE,
} from "../theme.jsx";

function Values() {
  const vals=[
    {icon:<Eye size={20}/>, t:'Açık', d:'Oran ve ücret netliği'},
    {icon:<Heart size={20}/>, t:'Türkçe', d:'Topluluk odaklı destek'},
    {icon:<Users size={20}/>, t:'Karşılaştırmalı', d:'Tek seçenekle sınırlı değil'},
  ];
  return (
    <section style={{...wrap,paddingTop:S[56],paddingBottom:S[32]}}>
      <div className="kb-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18}}>
        {vals.map((v,i)=>(
          <div key={i} style={{background:'#fff',border:`1px solid ${C.border}`,borderRadius:R.card,padding:'24px 22px'}}>
            <div style={{width:46,height:46,borderRadius:R.icon,background:C.blueFaint,color:C.blue,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:18}}>{v.icon}</div>
            <h3 style={{fontFamily:FD,fontSize:23,color:C.navy,fontWeight:600,marginBottom:5}}>{v.t}</h3>
            <p style={{fontSize:13.5,color:C.muted,fontWeight:800}}>{v.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Team() {
  const leaders=[
    {initials:'JH', name:'Jack Hunter', role:'Kurucu'},
    {initials:'TH', name:'Tara Hunter', role:'Operasyon'},
    {initials:'AK', name:'Asif Karimov', role:'Danışma Kurulu'},
  ];
  return (
    <section style={{...wrap,paddingTop:S[40],paddingBottom:S[32]}}>
      <div style={{textAlign:'center',maxWidth:560,margin:'0 auto 28px'}}>
        <SectionLabel>Ekibimiz</SectionLabel>
        <h2 style={{fontFamily:FD,fontSize:'clamp(27px,4vw,36px)',color:C.navy,fontWeight:500,lineHeight:1.16}}>
          Güven veren insanlar.
        </h2>
      </div>
      <div className="kb-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18}}>
        {leaders.map((p,i)=>(
          <div key={i} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:R.card,padding:'24px 22px',display:'flex',alignItems:'center',gap:16}}>
            <Avatar initials={p.initials} size={58}/>
            <div>
              <h3 style={{fontFamily:FD,fontSize:21,color:C.navy,fontWeight:600,marginBottom:3}}>{p.name}</h3>
              <p style={{fontSize:13,color:C.blue,fontWeight:900,fontFamily:FB}}>{p.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Brokerage() {
  return (
    <section style={{...wrap,paddingTop:S[40],paddingBottom:S[64]}}>
      <div style={{background:C.navy,color:'#fff',borderRadius:R.panel,padding:'30px 28px'}}>
        <div className="kb-2col" style={{display:'grid',gridTemplateColumns:'auto 1fr',gap:20,alignItems:'center'}}>
          <div style={{width:58,height:58,borderRadius:R.icon,background:'rgba(255,255,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <ShieldCheck size={26} color={C.blueLight}/>
          </div>
          <div>
            <h3 style={{fontFamily:FD,fontSize:28,fontWeight:600,marginBottom:8}}>Yasal yapı</h3>
            <p style={{fontSize:14.5,color:'rgba(255,255,255,0.76)',lineHeight:1.55,maxWidth:760}}>
              Kredibaba, {BROKERAGE} bünyesinde sunulur. FSRA lisans bilgisi: {LICENSE}. Yayın öncesi Principal Broker uyum onayı gereklidir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA({ onCTA }) {
  return (
    <section style={{background:C.surface,borderTop:`1px solid ${C.border}`}}>
      <div style={{...wrap,paddingTop:S[56],paddingBottom:S[56],textAlign:'center'}}>
        <h2 style={{fontFamily:FD,fontSize:'clamp(28px,4vw,38px)',color:C.navy,fontWeight:500,lineHeight:1.16,marginBottom:18}}>
          Türkçe başlayalım.
        </h2>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <button onClick={onCTA} style={primaryBtn({padding:'15px 28px',fontSize:16,display:'inline-flex',alignItems:'center',gap:8})}>
            Ücretsiz Hesap Aç <ArrowRight size={18}/>
          </button>
          <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
            <button style={{padding:'15px 26px',fontSize:16,background:'#fff',color:C.navy,cursor:'pointer',
                            border:`1px solid ${C.border}`,borderRadius:R.control,fontFamily:FB,fontWeight:800,
                            display:'inline-flex',alignItems:'center',gap:8}}>
              <MessageCircle size={18}/> WhatsApp
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  const { openForm } = useOutletContext();
  return (
    <>
      <PageHero
        label="Hakkımızda"
        title="Türk topluluğu için sade mortgage deneyimi."
        sub="Kurumsal güven. Türkçe anlatım. Net sonraki adım."
      />
      <Values/>
      <Team/>
      <Brokerage/>
      <CTA onCTA={openForm}/>
    </>
  );
}
