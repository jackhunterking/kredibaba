import { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import {
  ArrowRight, BookOpen, Calculator, Check, CreditCard, FileCheck,
  Hammer, Home as HomeIcon, Info, Landmark, Percent, RefreshCw,
  ShieldCheck, TrendingDown, Unlock, Wallet, X,
} from "lucide-react";
import {
  BROKERAGE, C, FB, FD, HERO_RATES, R, S, SectionLabel, SHADOW,
  TrustRow, ghostBtn, primaryBtn, wrap,
} from "../theme.jsx";

function HeroRateCard({ item }) {
  const pending = item.rate === 'Güncelleniyor';
  return (
    <div style={{
      background:'#fff',
      border:`1px solid ${pending ? C.border : `${C.blue}35`}`,
      borderRadius:R.card,
      padding:'24px 22px',
      boxShadow:SHADOW.card,
      minHeight:218,
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-between',
    }}>
      <div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,marginBottom:18}}>
          <span style={{
            display:'inline-flex',
            alignItems:'center',
            gap:7,
            fontSize:12,
            color:pending ? C.amber : C.green,
            background:pending ? C.amberFaint : C.greenFaint,
            border:`1px solid ${pending ? `${C.amber}25` : `${C.green}25`}`,
            borderRadius:R.chip,
            padding:'7px 10px',
            fontWeight:900,
            fontFamily:FB,
          }}>
            <TrendingDown size={14}/> {item.label}
          </span>
          <span style={{fontSize:12,color:C.muted,fontWeight:800,fontFamily:FB}}>{item.updated}</span>
        </div>
        <p style={{fontSize:13.5,color:C.muted,fontWeight:800,fontFamily:FB,marginBottom:7}}>{item.product}</p>
        <h3 style={{fontFamily:FD,fontSize:28,color:C.navy,fontWeight:600,lineHeight:1.08,marginBottom:14}}>
          {item.term}
        </h3>
      </div>
      <div>
        <div style={{
          fontFamily:FD,
          fontSize:pending ? 'clamp(32px,4vw,44px)' : 'clamp(52px,7vw,72px)',
          color:pending ? C.muted : C.navy,
          fontWeight:700,
          lineHeight:.95,
          letterSpacing:'-.7px',
          marginBottom:14,
        }}>
          {pending ? item.rate : item.rate}
        </div>
        <p style={{fontSize:12.5,color:C.muted,lineHeight:1.45,fontFamily:FB,margin:0}}>
          {item.qualification}
        </p>
      </div>
    </div>
  );
}

function DisclosureModal({ onClose }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Oran açıklaması"
      onClick={onClose}
      style={{
        position:'fixed',
        inset:0,
        zIndex:120,
        background:'rgba(6,25,44,0.52)',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        padding:S[24],
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          width:'min(620px,100%)',
          background:'#fff',
          border:`1px solid ${C.border}`,
          borderRadius:R.panel,
          boxShadow:SHADOW.elevated,
          padding:'28px 28px 26px',
        }}
      >
        <div style={{display:'flex',alignItems:'start',justifyContent:'space-between',gap:20,marginBottom:18}}>
          <div>
            <SectionLabel>Açıklama</SectionLabel>
            <h2 style={{fontFamily:FD,fontSize:30,color:C.navy,fontWeight:600,lineHeight:1.12}}>
              Oranlar nasıl okunmalı?
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Açıklamayı kapat"
            style={{
              width:40,
              height:40,
              border:`1px solid ${C.border}`,
              borderRadius:R.control,
              background:C.surface,
              color:C.navy,
              cursor:'pointer',
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              flexShrink:0,
            }}
          >
            <X size={18}/>
          </button>
        </div>
        <div style={{display:'grid',gap:12}}>
          {[
            'Gösterilen oranlar yalnızca örnektir; kişisel oran garantisi değildir.',
            'Onay; gelir, kredi geçmişi, mülk, peşinat, lender koşulları ve yazılı commitment ile netleşir.',
            `Kredibaba, ${BROKERAGE} bünyesinde mortgage (konut kredisi) aracılığı deneyimi sunar.`,
            'Borçluya yansıyabilecek ücretler varsa, commitment öncesinde yazılı ve sade şekilde açıklanır.',
          ].map((item) => (
            <p key={item} style={{
              display:'flex',
              alignItems:'flex-start',
              gap:10,
              background:C.surface,
              border:`1px solid ${C.border}`,
              borderRadius:R.control,
              padding:'13px 14px',
              color:C.body,
              fontSize:14,
              lineHeight:1.5,
              margin:0,
              fontFamily:FB,
            }}>
              <Check size={16} color={C.blue} style={{flexShrink:0,marginTop:2}}/>
              <span>{item}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function Hero({ onCTA }) {
  const [showDisclosure, setShowDisclosure] = useState(false);

  return (
    <section style={{
      background:`linear-gradient(180deg,#fff 0%,${C.surface} 100%)`,
      borderBottom:`1px solid ${C.border}`,
    }}>
      <div style={{...wrap,paddingTop:S[64],paddingBottom:S[56]}}>
        <div style={{textAlign:'center',maxWidth:860,margin:'0 auto 34px'}}>
          <SectionLabel>Türkçe mortgage karşılaştırması</SectionLabel>
          <h1 style={{
            fontFamily:FD,
            fontSize:'clamp(38px,6vw,62px)',
            fontWeight:500,
            color:C.navy,
            lineHeight:1.04,
            letterSpacing:'-1px',
            marginBottom:18,
          }}>
            Kanada’da mortgage oranlarını Türkçe karşılaştırın.
          </h1>
          <p style={{
            fontSize:'clamp(16px,2.3vw,19px)',
            color:C.body,
            lineHeight:1.6,
            maxWidth:690,
            margin:'0 auto',
            fontFamily:FB,
          }}>
            Ev almak, yenilemek veya ödemelerinizi düzenlemek için seçenekleri sade şekilde görün.
          </p>
        </div>

        <div style={{
          background:'#fff',
          border:`1px solid ${C.border}`,
          borderRadius:R.panel,
          boxShadow:SHADOW.elevated,
          padding:'28px',
        }}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:18,marginBottom:18,flexWrap:'wrap'}}>
            <div>
              <h2 style={{fontFamily:FD,fontSize:'clamp(24px,4vw,34px)',color:C.navy,fontWeight:600,lineHeight:1.12}}>
                Bugünün öne çıkan oranları
              </h2>
              <p style={{fontSize:13.5,color:C.muted,fontWeight:700,lineHeight:1.45,marginTop:7}}>
                Oranlar dosya koşullarına göre değişir; garanti veya onay anlamına gelmez.
              </p>
            </div>
            <button
              onClick={() => setShowDisclosure(true)}
              style={{
                ...ghostBtn({padding:'12px 16px',display:'inline-flex',alignItems:'center',gap:8}),
                color:C.blue,
              }}
            >
              <Info size={16}/> Açıklama
            </button>
          </div>

          <div className="kb-2col" style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:18}}>
            {HERO_RATES.map((item) => (
              <HeroRateCard key={item.label} item={item}/>
            ))}
          </div>

          <div style={{
            display:'flex',
            alignItems:'center',
            justifyContent:'space-between',
            gap:18,
            marginTop:24,
            paddingTop:22,
            borderTop:`1px solid ${C.border}`,
            flexWrap:'wrap',
          }}>
            <p style={{fontSize:13,color:C.muted,lineHeight:1.5,maxWidth:610,margin:0,fontFamily:FB}}>
              Sizin dosyanız için uygun oran; gelir, kredi geçmişi, peşinat, mülk ve lender koşulları birlikte incelenince belli olur.
            </p>
            <button
              onClick={onCTA}
              style={primaryBtn({padding:'15px 26px',fontSize:16,display:'inline-flex',alignItems:'center',gap:8})}
            >
              Ücretsiz Hesap Aç <ArrowRight size={17}/>
            </button>
          </div>
        </div>
      </div>
      {showDisclosure && <DisclosureModal onClose={() => setShowDisclosure(false)}/>}
    </section>
  );
}

function JourneyCard({ icon, title, sub, to }) {
  return (
    <Link to={to} style={{textDecoration:'none'}}>
      <div style={{
        background:'#fff',
        border:`1px solid ${C.border}`,
        borderRadius:R.card,
        padding:'24px 22px',
        boxShadow:SHADOW.card,
        height:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        gap:20,
      }}>
        <div>
          <span style={{
            width:48,
            height:48,
            borderRadius:R.icon,
            background:C.blueFaint,
            color:C.blue,
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            marginBottom:18,
          }}>
            {icon}
          </span>
          <h3 style={{fontFamily:FD,fontSize:24,color:C.navy,fontWeight:600,lineHeight:1.15,marginBottom:8}}>
            {title}
          </h3>
          <p style={{fontSize:14,color:C.body,lineHeight:1.5,margin:0,fontFamily:FB}}>
            {sub}
          </p>
        </div>
        <span style={{display:'inline-flex',alignItems:'center',gap:7,color:C.blue,fontSize:13.5,fontWeight:900,fontFamily:FB}}>
          Yolculuğu gör <ArrowRight size={15}/>
        </span>
      </div>
    </Link>
  );
}

function JourneySection() {
  const journeys = [
    {
      icon:<HomeIcon size={22}/>,
      title:'Ev almak istiyorum',
      sub:'Bütçe, ön onay ve uygun mortgage seçenekleri',
      to:'/cozumler#ev-almak',
    },
    {
      icon:<RefreshCw size={22}/>,
      title:'Ev kredimi yenilemek',
      sub:'Mevcut teklifinizi karşılaştırın veya daha uygun ödeme arayın',
      to:'/cozumler#ev-kredimi-yenilemek',
    },
    {
      icon:<Hammer size={22}/>,
      title:'Tadilat için finansman arıyorum',
      sub:'Ev değerinden yararlanarak tadilat bütçesi planlayın',
      to:'/cozumler#tadilat-finansmani',
    },
    {
      icon:<CreditCard size={22}/>,
      title:'Borç ödemelerimi rahatlatmak istiyorum',
      sub:'Yüksek faizli ödemeleri daha yönetilebilir hale getirme',
      to:'/cozumler#borc-odemelerini-rahatlatmak',
    },
  ];

  return (
    <section style={{...wrap,paddingTop:S[56],paddingBottom:S[56]}}>
      <div style={{textAlign:'center',maxWidth:720,margin:'0 auto 32px'}}>
        <SectionLabel>Yolculuklar</SectionLabel>
        <h2 style={{fontFamily:FD,fontSize:'clamp(30px,4.5vw,42px)',color:C.navy,fontWeight:500,lineHeight:1.16}}>
          Neden finansman arıyorsunuz?
        </h2>
        <p style={{fontSize:15.5,color:C.body,lineHeight:1.55,marginTop:12}}>
          Burada amaç kişiyi etiketlemek değil; hangi finansman ihtiyacıyla başladığını netleştirmek.
        </p>
      </div>
      <div className="kb-4col" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16}}>
        {journeys.map((journey) => (
          <JourneyCard key={journey.title} {...journey}/>
        ))}
      </div>
    </section>
  );
}

function WhoWeHelp({ onCTA }) {
  const items = [
    {icon:<HomeIcon size={21}/>, title:'İlk ev alıcıları', text:'İlk kez alım yaparken bütçe, masraf ve adımları sade görürsünüz.'},
    {icon:<RefreshCw size={21}/>, title:'Ev sahipleri', text:'Yenileme, ödeme düzenleme veya ev değerinden yararlanma seçenekleri.'},
    {icon:<Landmark size={21}/>, title:'Ev sahipleri / yatırımcılar', text:'Kira geliri, ek mülk ve portföy planlamasında doğru belge akışı.'},
    {icon:<Wallet size={21}/>, title:'Şirket sahibi / serbest meslek', text:'Maaş bordrosu dışındaki gelirleri anlaşılır şekilde hazırlama.'},
    {icon:<ShieldCheck size={21}/>, title:'Kanada’ya yeni gelenler', text:'Kredi geçmişi, peşinat ve lender beklentilerini Türkçe öğrenme.'},
  ];

  return (
    <section style={{background:C.surface,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`}}>
      <div style={{...wrap,paddingTop:S[56],paddingBottom:S[56]}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',gap:24,marginBottom:28,flexWrap:'wrap'}}>
          <div style={{maxWidth:620}}>
            <SectionLabel>Kime yardım ediyoruz?</SectionLabel>
            <h2 style={{fontFamily:FD,fontSize:'clamp(28px,4vw,38px)',color:C.navy,fontWeight:500,lineHeight:1.16}}>
              Durumunuz farklı olabilir; yol yine sade olmalı.
            </h2>
          </div>
          <button onClick={onCTA} style={ghostBtn({padding:'13px 18px',display:'inline-flex',alignItems:'center',gap:8})}>
            Bana uygun yolu göster <ArrowRight size={16}/>
          </button>
        </div>
        <div className="kb-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
          {items.map((item) => (
            <button key={item.title} onClick={onCTA} style={{
              background:'#fff',
              border:`1px solid ${C.border}`,
              borderRadius:R.card,
              padding:'22px 20px',
              cursor:'pointer',
              textAlign:'left',
              fontFamily:FB,
              boxShadow:SHADOW.card,
            }}>
              <span style={{
                width:44,
                height:44,
                borderRadius:R.icon,
                background:C.blueFaint,
                color:C.blue,
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                marginBottom:16,
              }}>
                {item.icon}
              </span>
              <span style={{display:'block',fontFamily:FD,fontSize:21,color:C.navy,fontWeight:600,marginBottom:7,lineHeight:1.16}}>
                {item.title}
              </span>
              <span style={{display:'block',fontSize:13.5,color:C.body,lineHeight:1.45}}>
                {item.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickTools() {
  const tools = [
    {icon:<FileCheck size={21}/>, title:'Ön onay', sub:'Yaklaşık alım gücünü görün', to:'/araclar#on-onay'},
    {icon:<Calculator size={21}/>, title:'Mortgage hesaplayıcı', sub:'Aylık ödeme tahmini', to:'/araclar#mortgage-hesaplayici'},
    {icon:<Percent size={21}/>, title:'Uygunluk hesaplayıcı', sub:'Maksimum alım gücü', to:'/araclar#uygunluk-hesaplayici'},
    {icon:<Landmark size={21}/>, title:'Kapanış masrafı', sub:'Toplam kapanış gideri', to:'/araclar#kapanis-masrafi'},
  ];

  return (
    <section style={{...wrap,paddingTop:S[56],paddingBottom:S[56]}}>
      <div className="kb-2col" style={{display:'grid',gridTemplateColumns:'0.78fr 1.22fr',gap:28,alignItems:'center'}}>
        <div>
          <SectionLabel>Araçlar</SectionLabel>
          <h2 style={{fontFamily:FD,fontSize:'clamp(28px,4vw,38px)',color:C.navy,fontWeight:500,lineHeight:1.16,marginBottom:12}}>
            Karar vermeden önce rakamları görün.
          </h2>
          <p style={{fontSize:15.5,color:C.body,lineHeight:1.55,marginBottom:20}}>
            Ön onay tek başına çözüm değil; ev alma, yenileme veya ödeme düzenleme yolculuğunun destek adımıdır.
          </p>
          <Link to="/araclar" style={{textDecoration:'none'}}>
            <button style={primaryBtn({padding:'13px 22px',display:'inline-flex',alignItems:'center',gap:8})}>
              Araçları aç <ArrowRight size={16}/>
            </button>
          </Link>
        </div>
        <div className="kb-4col" style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:16}}>
          {tools.map((tool) => (
            <Link key={tool.title} to={tool.to} style={{textDecoration:'none'}}>
              <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:R.card,padding:'20px',height:'100%'}}>
                <span style={{
                  width:44,
                  height:44,
                  borderRadius:R.icon,
                  background:'#fff',
                  border:`1px solid ${C.border}`,
                  color:C.blue,
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  marginBottom:16,
                }}>
                  {tool.icon}
                </span>
                <h3 style={{fontFamily:FD,fontSize:21,color:C.navy,fontWeight:600,marginBottom:5}}>
                  {tool.title}
                </h3>
                <p style={{fontSize:13.5,color:C.muted,fontWeight:800,lineHeight:1.35}}>
                  {tool.sub}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function LearnPreview() {
  const learn = [
    {icon:<BookOpen size={20}/>, title:'Ön onay nedir?', text:'Sürece başlamadan yaklaşık alım gücünü görmek.', to:'/ogren'},
    {icon:<RefreshCw size={20}/>, title:'Yenileme mi refinansman mı?', text:'Süresi biten mortgage ile yeniden düzenleme arasındaki fark.', to:'/ogren'},
    {icon:<Unlock size={20}/>, title:'Borç ödemelerini rahatlatmak', text:'Farklı ödemeleri daha yönetilebilir hale getirme seçenekleri.', to:'/ogren'},
  ];

  return (
    <section style={{background:C.surface}}>
      <div style={{...wrap,paddingTop:S[56],paddingBottom:S[56]}}>
        <div style={{textAlign:'center',maxWidth:650,margin:'0 auto 30px'}}>
          <SectionLabel>Öğren</SectionLabel>
          <h2 style={{fontFamily:FD,fontSize:'clamp(28px,4vw,38px)',color:C.navy,fontWeight:500,lineHeight:1.16}}>
            Finans dili sadeleşsin.
          </h2>
        </div>
        <div className="kb-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
          {learn.map((item) => (
            <Link key={item.title} to={item.to} style={{textDecoration:'none'}}>
              <div style={{background:'#fff',border:`1px solid ${C.border}`,borderRadius:R.card,padding:'22px 20px',height:'100%'}}>
                <span style={{
                  width:44,
                  height:44,
                  borderRadius:R.icon,
                  background:C.blueFaint,
                  color:C.blue,
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  marginBottom:16,
                }}>
                  {item.icon}
                </span>
                <h3 style={{fontFamily:FD,fontSize:22,color:C.navy,fontWeight:600,marginBottom:7}}>
                  {item.title}
                </h3>
                <p style={{fontSize:13.5,color:C.body,lineHeight:1.45,margin:0}}>
                  {item.text}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ onCTA }) {
  return (
    <section style={{background:C.navy}}>
      <div style={{...wrap,paddingTop:S[56],paddingBottom:S[56],textAlign:'center'}}>
        <h2 style={{fontFamily:FD,fontSize:'clamp(30px,4vw,42px)',color:'#fff',fontWeight:500,lineHeight:1.12,marginBottom:14}}>
          Dosyanız için uygun seçenekleri beraber netleştirelim.
        </h2>
        <p style={{fontSize:14.5,color:'rgba(255,255,255,0.72)',lineHeight:1.55,maxWidth:720,margin:'0 auto 24px'}}>
          Ücretsiz başlangıç formu onay veya oran garantisi değildir; sadece doğru yolculuğu ve gerekli belgeleri belirlemek için kullanılır.
        </p>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <button onClick={onCTA} style={primaryBtn({padding:'15px 28px',fontSize:16,display:'inline-flex',alignItems:'center',gap:8})}>
            Ücretsiz Hesap Aç <ArrowRight size={18}/>
          </button>
          <Link to="/oranlar" style={{textDecoration:'none'}}>
            <button style={{
              ...ghostBtn({padding:'15px 24px',fontSize:16}),
              background:'rgba(255,255,255,0.1)',
              color:'#fff',
              border:'1px solid rgba(255,255,255,0.25)',
              display:'inline-flex',
              alignItems:'center',
              gap:8,
            }}>
              Oranları incele <TrendingDown size={17}/>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { openForm } = useOutletContext();
  return (
    <>
      <Hero onCTA={openForm}/>
      <div style={{...wrap,paddingTop:S[24],paddingBottom:S[24]}}>
        <TrustRow compact/>
      </div>
      <JourneySection/>
      <WhoWeHelp onCTA={openForm}/>
      <QuickTools/>
      <LearnPreview/>
      <FinalCTA onCTA={openForm}/>
    </>
  );
}
