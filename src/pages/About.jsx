import { useOutletContext } from "react-router-dom";
import { MessageCircle, ArrowRight, ShieldCheck, Heart, Eye, Users } from "lucide-react";
import {
  C, FD, FB, WA, wrap, primaryBtn, ghostBtn, SectionLabel, Avatar, PageHero,
} from "../theme.jsx";

function Values() {
  const vals=[
    {icon:<Eye size={20}/>,    t:'Şeffaflık',  d:'Oranlar, ücretler ve süreç hakkında baştan sona açık ve net iletişim.'},
    {icon:<Heart size={20}/>,  t:'Topluluk',   d:'Kanada\'daki Türk ailelerine kendi dillerinde, güvenle hizmet.'},
    {icon:<Users size={20}/>,  t:'Tarafsızlık',d:'Bağımsız brokerage — tek bir bankaya değil, sizin çıkarınıza bağlıyız.'},
  ];
  return (
    <section style={{...wrap,paddingTop:64,paddingBottom:24}}>
      <div className="kb-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:22}}>
        {vals.map((v,i)=>(
          <div key={i} style={{background:'#fff',border:`1px solid ${C.border}`,borderRadius:14,padding:'26px'}}>
            <div style={{width:46,height:46,borderRadius:10,background:C.blueFaint,color:C.blue,
                         display:'flex',alignItems:'center',justifyContent:'center',marginBottom:16}}>{v.icon}</div>
            <h3 style={{fontFamily:FB,fontSize:17.5,color:C.navy,fontWeight:600,marginBottom:8}}>{v.t}</h3>
            <p style={{fontSize:14.5,color:C.body,lineHeight:1.65}}>{v.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Leadership() {
  const leaders=[
    {initials:'JH', name:'Jack Hunter',  role:'Kurucu',            tag:'FSRA Lisanslı Mortgage Agent',
     bio:"Kredibaba'nın kurucusu. Kanada'daki Türk topluluğuna şeffaf ve çok dilli mortgage danışmanlığı sunmak vizyonuyla şirketi kurdu."},
    {initials:'TH', name:'Tara Hunter',  role:'Operasyon Müdürü',  tag:'Müşteri Deneyimi & Operasyon',
     bio:"Başvuru sürecinin her adımını koordine eder; müşterilerin baştan sona sorunsuz ve anlaşılır bir deneyim yaşamasını sağlar."},
  ];
  return (
    <section style={{...wrap,paddingTop:48,paddingBottom:24}}>
      <div style={{textAlign:'center',maxWidth:620,margin:'0 auto 36px'}}>
        <SectionLabel>Liderlik ekibi</SectionLabel>
        <h2 style={{fontFamily:FD,fontSize:'clamp(26px,4vw,34px)',color:C.navy,fontWeight:500,lineHeight:1.2}}>
          Kredibaba'yı yönetenler
        </h2>
      </div>
      <div className="kb-2col" style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:18}}>
        {leaders.map((p,i)=>(
          <div key={i} style={{background:'#fff',border:`1px solid ${C.border}`,borderRadius:16,padding:'28px 26px',
                               display:'flex',gap:18,alignItems:'flex-start',boxShadow:'0 4px 20px rgba(10,37,64,0.05)'}}>
            <Avatar initials={p.initials} size={68}/>
            <div>
              <h3 style={{fontFamily:FD,fontSize:21,color:C.navy,fontWeight:600,marginBottom:2}}>{p.name}</h3>
              <p style={{fontSize:13.5,color:C.blue,fontWeight:600,fontFamily:FB,marginBottom:3}}>{p.role}</p>
              <p style={{fontSize:12.5,color:C.muted,fontFamily:FB,marginBottom:12}}>{p.tag}</p>
              <p style={{fontSize:14,color:C.body,lineHeight:1.65}}>{p.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Advisory() {
  return (
    <section style={{...wrap,paddingTop:36,paddingBottom:24}}>
      <div style={{background:`linear-gradient(135deg,${C.navy} 0%,#0F3357 100%)`,borderRadius:18,
                   padding:'40px 36px',color:'#fff',boxShadow:'0 12px 40px rgba(10,37,64,0.18)'}}>
        <div className="kb-2col" style={{display:'grid',gridTemplateColumns:'auto 1fr',gap:30,alignItems:'center'}}>
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:12}}>
            <Avatar initials="AK" size={100} ring="#7FB2F5"/>
            <span style={{fontSize:11.5,color:'#7FB2F5',fontWeight:600,letterSpacing:'1px',textTransform:'uppercase',fontFamily:FB,textAlign:'center'}}>
              Danışma Kurulu
            </span>
          </div>
          <div>
            <h3 style={{fontFamily:FD,fontSize:27,fontWeight:600,marginBottom:3}}>Asif Karimov</h3>
            <p style={{fontSize:14,color:'#9FC4F0',fontWeight:600,fontFamily:FB,marginBottom:16}}>
              Baş Danışman · Mortgage Broker
            </p>
            <p style={{fontSize:15,color:'rgba(255,255,255,0.82)',lineHeight:1.7,marginBottom:22}}>
              Sektörün en deneyimli isimlerinden Asif Karimov, Kredibaba'nın danışma kurulunda yer alır ve genel
              operasyonel stratejiyi gözetir. Onun rehberliği, her dosyanın sektörün en yüksek standartlarında
              değerlendirilmesini ve her müşterinin en doğru yapıyla yönlendirilmesini güvence altına alır.
            </p>
            <div style={{display:'flex',gap:'12px 40px',flexWrap:'wrap'}}>
              {[
                {n:'30.000+', l:'Tamamlanan mortgage'},
                {n:'$40B+',   l:'Düzenlenen mortgage hacmi'},
              ].map((s,i)=>(
                <div key={i}>
                  <div style={{fontFamily:FD,fontSize:30,fontWeight:600,color:'#fff'}}>{s.n}</div>
                  <div style={{fontSize:12.5,color:'rgba(255,255,255,0.65)',fontFamily:FB}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Brokerage() {
  return (
    <section style={{...wrap,paddingTop:36,paddingBottom:64}}>
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:'26px 28px',
                   display:'flex',gap:16,alignItems:'flex-start'}}>
        <div style={{width:44,height:44,borderRadius:10,background:'#fff',border:`1px solid ${C.border}`,color:C.blue,
                     flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <ShieldCheck size={22}/>
        </div>
        <div>
          <h3 style={{fontFamily:FB,fontSize:16,color:C.navy,fontWeight:600,marginBottom:6}}>Yasal yapı</h3>
          <p style={{fontSize:14,color:C.body,lineHeight:1.7}}>
            Kredibaba, Ontario, Kanada'da faaliyet gösteren <strong style={{color:C.navy}}>RMA Mortgage</strong> lisanslı
            mortgage brokerage'ı bünyesinde sunulan bir hizmet markasıdır. Tüm mortgage işlemleri, FSRA
            düzenlemelerine ve tüketici koruma standartlarına uygun olarak yürütülür.
          </p>
        </div>
      </div>
    </section>
  );
}

function CTA({ onCTA }) {
  return (
    <section style={{background:C.navy}}>
      <div style={{...wrap,paddingTop:56,paddingBottom:56,textAlign:'center'}}>
        <h2 style={{fontFamily:FD,fontSize:'clamp(26px,4vw,36px)',color:'#fff',fontWeight:500,lineHeight:1.2,marginBottom:14}}>
          Ekibimizle tanışmak ister misiniz?
        </h2>
        <p style={{fontSize:16.5,color:'rgba(255,255,255,0.75)',lineHeight:1.6,maxWidth:500,margin:'0 auto 30px'}}>
          Ücretsiz, baskısız bir görüşmeyle başlayalım — durumunuzu birlikte değerlendirelim.
        </p>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <button onClick={onCTA} style={primaryBtn({padding:'15px 28px',fontSize:16,display:'inline-flex',alignItems:'center',gap:8})}>
            Ücretsiz Danışma <ArrowRight size={18}/>
          </button>
          <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
            <button style={{padding:'15px 26px',fontSize:16,background:'rgba(255,255,255,0.1)',color:'#fff',cursor:'pointer',
                            border:'1px solid rgba(255,255,255,0.25)',borderRadius:8,fontFamily:FB,fontWeight:600,
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
        title="Kurumsal güç, kişisel ilgi"
        sub="Kredibaba, Kanada'daki Türk topluluğunu mortgage süreçlerinde temsil eden bir danışmanlık markasıdır. Deneyimli bir liderlik ekibi ve sektörün önde gelen isimlerinden oluşan bir danışma kurulu tarafından desteklenir."
      />
      <Values/>
      <Leadership/>
      <Advisory/>
      <Brokerage/>
      <CTA onCTA={openForm}/>
    </>
  );
}
