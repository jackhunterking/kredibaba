import { useOutletContext, Link } from "react-router-dom";
import {
  MessageCircle, TrendingDown, Calculator, ArrowRight, Check,
  Clock, Activity, Sparkles, Home as HomeIcon, RefreshCw, Building2,
} from "lucide-react";
import {
  C, FD, FB, WA, IMG, wrap, primaryBtn, ghostBtn, SectionLabel, TrustRow,
} from "../theme.jsx";

// ── HERO ────────────────────────────────────────────────────────────
function Hero({ onCTA }) {
  return (
    <section style={{background:`linear-gradient(180deg,#fff 0%,${C.surface} 100%)`}}>
      <div style={{...wrap,paddingTop:64,paddingBottom:72}}>
        <div className="kb-hero-grid" style={{display:'grid',gridTemplateColumns:'1.15fr 0.85fr',gap:56,alignItems:'center'}}>
          <div>
            <SectionLabel>Ontario'nun Türk mortgage uzmanı</SectionLabel>
            <h1 style={{fontFamily:FD,fontSize:'clamp(36px,5vw,54px)',fontWeight:500,color:C.navy,
                        lineHeight:1.08,letterSpacing:'-0.5px',marginBottom:20}}>
              Mortgage yolculuğunuzun<br/>kontrolü sizde.
            </h1>
            <p style={{fontSize:18,color:C.body,lineHeight:1.65,marginBottom:32,maxWidth:480,fontFamily:FB}}>
              Maaşlı, serbest meslek ya da Kanada'ya yeni gelmiş olun — 50'den fazla lender arasından
              size en uygun mortgage'ı bulur, tüm süreci şeffaf ve Türkçe yönetiriz.
            </p>
            <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:32}}>
              <button onClick={onCTA} style={primaryBtn({padding:'15px 26px',fontSize:16,display:'flex',alignItems:'center',gap:8})}>
                Ücretsiz Ön Onay Al <ArrowRight size={18}/>
              </button>
              <a href={`https://wa.me/${WA}?text=Merhaba%20Kredibaba`} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
                <button style={{...ghostBtn({padding:'15px 24px',fontSize:16}),display:'flex',alignItems:'center',gap:8,color:C.wa,borderColor:`${C.wa}50`}}>
                  <MessageCircle size={18}/> WhatsApp ile yazın
                </button>
              </a>
            </div>
            <TrustRow compact/>
          </div>

          <div style={{position:'relative'}}>
            <div style={{borderRadius:18,overflow:'hidden',height:200,marginBottom:-70,
                         boxShadow:'0 12px 40px rgba(10,37,64,0.12)'}}>
              <img src={IMG.hero} alt="Kanada'da modern bir ev" loading="lazy"
                   style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
            </div>
            <div style={{position:'relative',background:'#fff',border:`1px solid ${C.border}`,borderRadius:16,
                         padding:'26px',boxShadow:'0 12px 40px rgba(10,37,64,0.10)',margin:'0 12px'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
                <span style={{fontSize:13.5,color:C.muted,fontWeight:600,fontFamily:FB}}>Bu haftanın oranları</span>
                <span style={{display:'flex',alignItems:'center',gap:5,fontSize:12.5,color:C.green,fontWeight:600,
                              background:C.greenFaint,padding:'4px 9px',borderRadius:999}}>
                  <TrendingDown size={13}/> Düşüyor
                </span>
              </div>
              {[
                {term:'5 Yıl Sabit', rate:'3.89%', best:true},
                {term:'3 Yıl Sabit', rate:'4.24%'},
                {term:'5 Yıl Değişken', rate:'4.45%'},
              ].map((r,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',
                                     padding:'14px 0',borderTop:i?`1px solid ${C.borderL}`:'none'}}>
                  <div style={{display:'flex',alignItems:'center',gap:9}}>
                    <span style={{fontSize:14.5,color:C.navy,fontWeight:500,fontFamily:FB}}>{r.term}</span>
                    {r.best&&<span style={{fontSize:10.5,color:C.green,fontWeight:700,background:C.greenFaint,padding:'2px 7px',borderRadius:4,letterSpacing:.3}}>EN İYİ</span>}
                  </div>
                  <span style={{fontFamily:FD,fontSize:22,fontWeight:600,color:C.navy}}>{r.rate}</span>
                </div>
              ))}
              <Link to="/oranlar" style={{textDecoration:'none'}}>
                <button style={{...ghostBtn({width:'100%',padding:'13px',fontSize:14.5,marginTop:16}),
                         color:C.blue,borderColor:`${C.blue}40`,background:C.blueFaint,display:'flex',alignItems:'center',justifyContent:'center',gap:7}}>
                  <Calculator size={16}/> Tüm oranları gör
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── STATS ───────────────────────────────────────────────────────────
function Stats() {
  const stats=[
    {n:'$500M+', l:'Yönetilen mortgage hacmi'},
    {n:'50+',    l:'Lender ortağı'},
    {n:'1,200+', l:'Mutlu aile'},
    {n:'4.9/5',  l:'Müşteri memnuniyeti'},
  ];
  return (
    <section style={{background:C.navy,color:'#fff'}}>
      <div style={{...wrap,paddingTop:40,paddingBottom:40}}>
        <div className="kb-stats" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:24}}>
          {stats.map((s,i)=>(
            <div key={i} style={{textAlign:'center'}}>
              <div style={{fontFamily:FD,fontSize:34,fontWeight:600,marginBottom:5}}>{s.n}</div>
              <div style={{fontSize:13.5,color:'rgba(255,255,255,0.7)',fontFamily:FB}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FEATURES (3-col) ────────────────────────────────────────────────
function Features() {
  const items=[
    {icon:<Clock size={22}/>,    t:'Aynı gün ön onay',   d:'Eksiksiz başvuruda çoğu dosyada 24 saat içinde ön onay alın, hızlıca teklif verin.'},
    {icon:<Activity size={22}/>, t:'Canlı oran takibi',  d:'50+ lender arasından güncel oranları karşılaştırır, en uygun fırsatı yakalarız.'},
    {icon:<Sparkles size={22}/>, t:'Kişiye özel öneri',  d:'Profilinize göre A/B lender stratejisi ve tasarruf önerileri — tamamen Türkçe.'},
  ];
  return (
    <section style={{...wrap,paddingTop:72,paddingBottom:24}}>
      <div style={{textAlign:'center',maxWidth:620,margin:'0 auto 44px'}}>
        <SectionLabel>Neden Kredibaba</SectionLabel>
        <h2 style={{fontFamily:FD,fontSize:'clamp(28px,4vw,38px)',color:C.navy,fontWeight:500,lineHeight:1.2,marginBottom:14}}>
          Bankanın karmaşasını biz çözeriz
        </h2>
        <p style={{fontSize:16.5,color:C.body,lineHeight:1.65}}>
          Bağımsız bir mortgage brokerage olarak tek bir bankaya bağlı değiliz. Sizin tarafınızdayız.
        </p>
      </div>
      <div className="kb-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:22}}>
        {items.map((it,i)=>(
          <div key={i} style={{background:'#fff',border:`1px solid ${C.border}`,borderRadius:14,padding:'28px 26px'}}>
            <div style={{width:48,height:48,borderRadius:11,background:C.blueFaint,color:C.blue,
                         display:'flex',alignItems:'center',justifyContent:'center',marginBottom:18}}>
              {it.icon}
            </div>
            <h3 style={{fontFamily:FB,fontSize:18.5,color:C.navy,fontWeight:600,marginBottom:9}}>{it.t}</h3>
            <p style={{fontSize:14.5,color:C.body,lineHeight:1.65}}>{it.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── PRODUCT CARDS (Buy / Renew / Invest) ────────────────────────────
function ProductCards() {
  const cards=[
    {icon:<HomeIcon size={22}/>,  t:'Ev satın alın',        d:'İlk eviniz ya da bir sonraki eviniz — ön onaydan kapanışa kadar yanınızdayız.'},
    {icon:<RefreshCw size={22}/>, t:'Yenileyin / refinansman',d:"Mevcut mortgage'ınızı optimize edip aylık ödemenizi düşürün."},
    {icon:<Building2 size={22}/>, t:'Yatırım amaçlı',       d:'Çoklu mülk, kira geliri ve yatırımcılar için özel mortgage stratejileri.'},
  ];
  return (
    <section style={{...wrap,paddingTop:64,paddingBottom:72}}>
      <div className="kb-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:22}}>
        {cards.map((c,i)=>(
          <Link key={i} to="/cozumler" style={{textDecoration:'none'}}>
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:'30px 26px',
                         height:'100%',transition:'all .15s'}}
                 onMouseEnter={e=>{e.currentTarget.style.background='#fff';e.currentTarget.style.boxShadow='0 8px 30px rgba(10,37,64,0.08)';}}
                 onMouseLeave={e=>{e.currentTarget.style.background=C.surface;e.currentTarget.style.boxShadow='none';}}>
              <div style={{width:48,height:48,borderRadius:11,background:'#fff',border:`1px solid ${C.border}`,color:C.blue,
                           display:'flex',alignItems:'center',justifyContent:'center',marginBottom:18}}>{c.icon}</div>
              <h3 style={{fontFamily:FD,fontSize:21,color:C.navy,fontWeight:600,marginBottom:9}}>{c.t}</h3>
              <p style={{fontSize:14.5,color:C.body,lineHeight:1.65,marginBottom:16}}>{c.d}</p>
              <span style={{display:'inline-flex',alignItems:'center',gap:6,fontSize:14,color:C.blue,fontWeight:600}}>
                Detaylar <ArrowRight size={15}/>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ── HOW IT WORKS ────────────────────────────────────────────────────
function HowItWorks() {
  const steps=[
    {n:'01',t:'Profilinizi paylaşın',d:'2 dakikalık kısa bir değerlendirme ile durumunuzu anlayalım.'},
    {n:'02',t:'Seçenekleri karşılaştıralım',d:'50+ lender arasından size en uygun oran ve programı sunalım.'},
    {n:'03',t:'Onay alın, taşının',d:'Tüm süreci Türkçe yönetiriz — siz sadece imzalayın.'},
  ];
  return (
    <section style={{background:C.surface}}>
      <div style={{...wrap,paddingTop:72,paddingBottom:72}}>
        <div style={{textAlign:'center',maxWidth:620,margin:'0 auto 44px'}}>
          <SectionLabel>Süreç</SectionLabel>
          <h2 style={{fontFamily:FD,fontSize:'clamp(28px,4vw,38px)',color:C.navy,fontWeight:500,lineHeight:1.2}}>
            3 adımda ev sahibi olun
          </h2>
        </div>
        <div className="kb-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:22}}>
          {steps.map((s,i)=>(
            <div key={i} style={{padding:'8px 4px'}}>
              <div style={{fontFamily:FD,fontSize:18,fontWeight:600,color:C.blue,marginBottom:14,
                           display:'flex',alignItems:'center',gap:12}}>
                <span style={{width:40,height:40,borderRadius:'50%',border:`1.5px solid ${C.blue}`,
                              display:'flex',alignItems:'center',justifyContent:'center',fontSize:15}}>{s.n}</span>
              </div>
              <h3 style={{fontFamily:FB,fontSize:18.5,color:C.navy,fontWeight:600,marginBottom:9}}>{s.t}</h3>
              <p style={{fontSize:14.5,color:C.body,lineHeight:1.65}}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TOOLS TEASER ────────────────────────────────────────────────────
function ToolsTeaser() {
  return (
    <section style={{...wrap,paddingTop:72,paddingBottom:72}}>
      <div className="kb-2col" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:48,alignItems:'center'}}>
        <div>
          <SectionLabel>Araçlar</SectionLabel>
          <h2 style={{fontFamily:FD,fontSize:'clamp(26px,3.5vw,34px)',color:C.navy,fontWeight:500,lineHeight:1.22,marginBottom:16}}>
            Rakamları kendiniz görün
          </h2>
          <p style={{fontSize:16,color:C.body,lineHeight:1.7,marginBottom:24}}>
            Ücretsiz hesaplama araçlarımızla aylık ödemenizi, alabileceğiniz maksimum tutarı ve
            peşinat senaryolarını saniyeler içinde keşfedin.
          </p>
          <div style={{display:'flex',flexDirection:'column',gap:12,marginBottom:28}}>
            {['Mortgage ödeme hesaplama','Uygunluk / maksimum tutar','Peşinat & sigorta senaryoları'].map((t,i)=>(
              <span key={i} style={{display:'flex',alignItems:'center',gap:9,fontSize:15,color:C.navy,fontFamily:FB}}>
                <Check size={16} color={C.blue}/> {t}
              </span>
            ))}
          </div>
          <Link to="/araclar" style={{textDecoration:'none'}}>
            <button style={primaryBtn({padding:'14px 26px',fontSize:15.5,display:'inline-flex',alignItems:'center',gap:8})}>
              Araçları kullan <ArrowRight size={17}/>
            </button>
          </Link>
        </div>
        <div style={{borderRadius:18,overflow:'hidden',boxShadow:'0 12px 40px rgba(10,37,64,0.10)'}}>
          <img src={IMG.interior} alt="Modern ev içi" loading="lazy"
               style={{width:'100%',height:340,objectFit:'cover',display:'block'}}/>
        </div>
      </div>
    </section>
  );
}

// ── SHOWCASE BAND ───────────────────────────────────────────────────
function Showcase() {
  return (
    <section style={{position:'relative'}}>
      <div style={{position:'relative',minHeight:340,display:'flex',alignItems:'center',
                   backgroundImage:`linear-gradient(90deg,rgba(6,25,44,0.92) 0%,rgba(6,25,44,0.62) 60%,rgba(6,25,44,0.35) 100%),url(${IMG.toronto})`,
                   backgroundSize:'cover',backgroundPosition:'center'}}>
        <div style={{...wrap,paddingTop:64,paddingBottom:64}}>
          <div style={{maxWidth:560}}>
            <SectionLabel><span style={{color:'#7FB2F5'}}>Tüm Ontario'da</span></SectionLabel>
            <h2 style={{fontFamily:FD,fontSize:'clamp(26px,4vw,38px)',color:'#fff',fontWeight:500,lineHeight:1.18,marginBottom:16}}>
              Toronto'dan Ottawa'ya, yanınızdayız
            </h2>
            <p style={{fontSize:16.5,color:'rgba(255,255,255,0.82)',lineHeight:1.65,marginBottom:28}}>
              Toronto / GTA, Hamilton, Burlington, Ottawa ve Ontario'nun her köşesinde mortgage
              başvurularını yönetiyoruz. Nereye taşınırsanız taşının, süreç aynı: şeffaf, hızlı ve Türkçe.
            </p>
            <div style={{display:'flex',gap:'10px 26px',flexWrap:'wrap'}}>
              {['Toronto / GTA','Hamilton','Burlington','Ottawa','Tüm Ontario'].map((c,i)=>(
                <span key={i} style={{display:'flex',alignItems:'center',gap:7,color:'#fff',fontSize:14.5,fontWeight:500,fontFamily:FB}}>
                  <Check size={15} color="#7FB2F5"/> {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── TESTIMONIALS ────────────────────────────────────────────────────
function Testimonials() {
  const reviews=[
    {name:'Mehmet A.',city:'Scarborough',stars:5,text:'Banka olmaz demişti, ekip bir haftada çözdü. Süreç boyunca her şeyi net şekilde anlattılar.',type:'Serbest meslek'},
    {name:'Ayşe & Kemal T.',city:'Mississauga',stars:5,text:'İlk evimizi alırken her adımı Türkçe anlattılar. Kapanış masraflarına kadar şeffaftı.',type:'İlk ev'},
    {name:'Serdar B.',city:'Brampton',stars:5,text:'Nakit gelirim vardı, hiçbir banka bakmadı. Kredibaba uygun bir program buldu.',type:'Nakit gelir'},
  ];
  return (
    <section style={{...wrap,paddingTop:72,paddingBottom:72}}>
      <div style={{textAlign:'center',maxWidth:620,margin:'0 auto 44px'}}>
        <SectionLabel>Müşteri görüşleri</SectionLabel>
        <h2 style={{fontFamily:FD,fontSize:'clamp(28px,4vw,38px)',color:C.navy,fontWeight:500,lineHeight:1.2}}>
          1.200+ ailenin güveni
        </h2>
      </div>
      <div className="kb-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:22}}>
        {reviews.map((r,i)=>(
          <div key={i} style={{background:'#fff',border:`1px solid ${C.border}`,borderRadius:14,padding:'26px 24px',
                               display:'flex',flexDirection:'column'}}>
            <div style={{color:C.star,fontSize:15,marginBottom:14,letterSpacing:2}}>{'★'.repeat(r.stars)}</div>
            <p style={{fontSize:15,color:C.body,lineHeight:1.7,marginBottom:20,flex:1}}>"{r.text}"</p>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',
                         paddingTop:16,borderTop:`1px solid ${C.borderL}`}}>
              <div>
                <div style={{fontSize:14.5,color:C.navy,fontWeight:600,fontFamily:FB}}>{r.name}</div>
                <div style={{fontSize:12.5,color:C.muted,fontFamily:FB}}>{r.city}</div>
              </div>
              <span style={{fontSize:11,color:C.blue,background:C.blueFaint,padding:'4px 10px',borderRadius:999,fontWeight:600,fontFamily:FB}}>
                {r.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── FINAL CTA ───────────────────────────────────────────────────────
function CTABand({ onCTA }) {
  return (
    <section style={{background:C.navy}}>
      <div style={{...wrap,paddingTop:64,paddingBottom:64,textAlign:'center'}}>
        <h2 style={{fontFamily:FD,fontSize:'clamp(28px,4vw,40px)',color:'#fff',fontWeight:500,lineHeight:1.2,marginBottom:14}}>
          Oranınızı öğrenmeye hazır mısınız?
        </h2>
        <p style={{fontSize:17,color:'rgba(255,255,255,0.75)',lineHeight:1.6,maxWidth:520,margin:'0 auto 32px'}}>
          2 dakikalık ücretsiz değerlendirme. Yükümlülük yok, baskı yok — sadece şeffaf bilgi.
        </p>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <button onClick={onCTA} style={primaryBtn({padding:'16px 30px',fontSize:16,display:'inline-flex',alignItems:'center',gap:8})}>
            Ücretsiz Ön Onay Al <ArrowRight size={18}/>
          </button>
          <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
            <button style={{padding:'16px 28px',fontSize:16,background:'rgba(255,255,255,0.1)',color:'#fff',cursor:'pointer',
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

export default function Home() {
  const { openForm } = useOutletContext();
  return (
    <>
      <Hero onCTA={openForm}/>
      <Stats/>
      <Features/>
      <ProductCards/>
      <HowItWorks/>
      <ToolsTeaser/>
      <Showcase/>
      <Testimonials/>
      <CTABand onCTA={openForm}/>
    </>
  );
}
