import { useState, useEffect } from "react";
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";
import { MessageCircle, ShieldCheck, Phone } from "lucide-react";
import { C, FD, FB, WA, TEL, LICENSE, wrap, primaryBtn } from "./theme.jsx";
import FormModal from "./FormModal.jsx";

const NAV = [
  { to:'/cozumler',   label:'Çözümler' },
  { to:'/oranlar',    label:'Oranlar' },
  { to:'/araclar',    label:'Araçlar' },
  { to:'/hakkimizda', label:'Hakkımızda' },
];

function TopBar() {
  return (
    <div style={{background:C.navy,color:'#fff'}}>
      <div style={{...wrap,display:'flex',alignItems:'center',justifyContent:'space-between',
                   height:38,fontSize:12.5,fontFamily:FB}}>
        <span style={{display:'flex',alignItems:'center',gap:7,opacity:.85}}>
          <ShieldCheck size={13}/> FSRA Lisanslı Mortgage Brokerage · {LICENSE}
        </span>
        <a href={`tel:${TEL}`} style={{display:'flex',alignItems:'center',gap:7,color:'#fff',textDecoration:'none',opacity:.9}}>
          <Phone size={13}/> {TEL}
        </a>
      </div>
    </div>
  );
}

function Navbar({onCTA}) {
  return (
    <nav style={{position:'sticky',top:0,zIndex:50,background:'rgba(255,255,255,0.92)',
                 backdropFilter:'blur(10px)',borderBottom:`1px solid ${C.border}`}}>
      <div style={{...wrap,display:'flex',alignItems:'center',justifyContent:'space-between',height:66}}>
        <div style={{display:'flex',alignItems:'center',gap:36}}>
          <Link to="/" style={{display:'flex',alignItems:'baseline',gap:1,textDecoration:'none'}}>
            <span style={{fontFamily:FD,fontSize:23,fontWeight:600,color:C.navy}}>Kredi</span>
            <span style={{fontFamily:FD,fontSize:23,fontWeight:600,color:C.blue}}>baba</span>
          </Link>
          <div className="kb-navlinks" style={{display:'flex',gap:26}}>
            {NAV.map(n=>(
              <NavLink key={n.to} to={n.to}
                style={({isActive})=>({fontSize:14.5,color:isActive?C.blue:C.body,cursor:'pointer',
                  fontFamily:FB,fontWeight:isActive?600:500,textDecoration:'none'})}>
                {n.label}
              </NavLink>
            ))}
          </div>
        </div>
        <div style={{display:'flex',gap:10,alignItems:'center'}}>
          <a href={`https://wa.me/${WA}`} className="kb-nav-wa"
             style={{display:'flex',alignItems:'center',gap:6,padding:'8px 12px',textDecoration:'none',
                     color:C.body,fontSize:14,fontWeight:500,fontFamily:FB}}>
            <MessageCircle size={15} color={C.wa}/> WhatsApp
          </a>
          <button onClick={onCTA} style={primaryBtn({padding:'10px 18px',fontSize:14.5})}>
            Ön Onay Al
          </button>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  const cols=[
    {h:'Çözümler', links:[
      {t:'Ev satın alma',     to:'/cozumler'},
      {t:'Mortgage yenileme', to:'/cozumler'},
      {t:'Refinansman',       to:'/cozumler'},
      {t:'HELOC',             to:'/cozumler'},
    ]},
    {h:'Araçlar', links:[
      {t:'Oran karşılaştırma', to:'/oranlar'},
      {t:'Ödeme hesaplama',    to:'/araclar'},
      {t:'Uygunluk hesaplama', to:'/araclar'},
      {t:'Ön onay',            to:'/araclar'},
    ]},
    {h:'Kurumsal', links:[
      {t:'Hakkımızda',       to:'/hakkimizda'},
      {t:'Ekibimiz',         to:'/hakkimizda'},
      {t:'Danışma Kurulu',   to:'/hakkimizda'},
      {t:'İletişim',         to:'/hakkimizda'},
    ]},
  ];
  return (
    <footer style={{background:C.navyD,color:'rgba(255,255,255,0.7)'}}>
      <div style={{...wrap,paddingTop:56,paddingBottom:36}}>
        <div className="kb-foot" style={{display:'grid',gridTemplateColumns:'1.4fr repeat(3,1fr)',gap:32,marginBottom:44}}>
          <div>
            <Link to="/" style={{display:'flex',alignItems:'baseline',gap:1,marginBottom:14,textDecoration:'none'}}>
              <span style={{fontFamily:FD,fontSize:22,fontWeight:600,color:'#fff'}}>Kredi</span>
              <span style={{fontFamily:FD,fontSize:22,fontWeight:600,color:'#6FA8F0'}}>baba</span>
            </Link>
            <p style={{fontSize:13.5,lineHeight:1.7,maxWidth:280,fontFamily:FB}}>
              Kanada'daki Türk topluluğunun bağımsız mortgage uzmanı. Şeffaf, çok dilli ve sizin çıkarınıza.
            </p>
            <div style={{marginTop:18,display:'flex',alignItems:'center',gap:8,fontSize:13,color:'rgba(255,255,255,0.6)'}}>
              <Phone size={14}/> {TEL}
            </div>
          </div>
          {cols.map((c,i)=>(
            <div key={i}>
              <h4 style={{fontSize:13,color:'#fff',fontWeight:600,marginBottom:14,fontFamily:FB,letterSpacing:.3}}>{c.h}</h4>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {c.links.map((l,j)=>(
                  <Link key={j} to={l.to} style={{fontSize:13.5,cursor:'pointer',fontFamily:FB,textDecoration:'none',color:'inherit'}}>{l.t}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{borderTop:'1px solid rgba(255,255,255,0.12)',paddingTop:24,
                     display:'flex',flexDirection:'column',gap:14}}>
          {/* FSRA açıklaması */}
          <div style={{display:'flex',gap:10,alignItems:'flex-start'}}>
            <ShieldCheck size={16} color="#6FA8F0" style={{flexShrink:0,marginTop:2}}/>
            <p style={{fontSize:12,lineHeight:1.7,color:'rgba(255,255,255,0.62)',margin:0,fontFamily:FB}}>
              <strong style={{color:'rgba(255,255,255,0.85)'}}>FSRA nedir?</strong>{' '}
              FSRA (Financial Services Regulatory Authority of Ontario / Ontario Finansal Hizmetler Düzenleme Kurumu),
              Ontario'daki mortgage brokerage'larını ve agentlarını denetleyen resmi devlet kurumudur. FSRA lisansı,
              hizmetin yasal düzenlemelere ve tüketici koruma standartlarına uygun şekilde sunulduğunu gösterir. Lisans No: {LICENSE}.
            </p>
          </div>
          {/* Yasal uyarı */}
          <p style={{fontSize:11.5,lineHeight:1.8,color:'rgba(255,255,255,0.5)',margin:0,fontFamily:FB}}>
            Bu site yalnızca bilgilendirme amaçlıdır ve kredi taahhüdü oluşturmaz. Mortgage koşulları lender ve
            başvuruya göre değişir; oranlar commitment aşamasında kesinleşir, garanti edilmez.
          </p>
          {/* RMA Mortgage künyesi — düşük öncelik */}
          <p style={{fontSize:11,lineHeight:1.7,color:'rgba(255,255,255,0.38)',margin:0,fontFamily:FB,
                     borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:14}}>
            Kredibaba, Ontario, Kanada'da faaliyet gösteren lisanslı mortgage brokerage RMA Mortgage bünyesinde
            sunulan bir hizmet markasıdır. © {new Date().getFullYear()} Kredibaba. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  const [showForm, setShowForm] = useState(false);
  const open  = () => setShowForm(true);
  const close = () => setShowForm(false);
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.style.overflow = showForm ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showForm]);

  // Scroll to top on route change
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <div style={{background:C.bg,color:C.text,fontFamily:FB,minHeight:'100vh'}}>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{background:${C.bg};-webkit-font-smoothing:antialiased;}
        ::selection{background:${C.blueFaint};color:${C.navy};}
        a{color:inherit;}
        @media(max-width:860px){
          .kb-hero-grid{grid-template-columns:1fr!important;gap:40px!important}
          .kb-2col{grid-template-columns:1fr!important}
          .kb-foot{grid-template-columns:1fr 1fr!important}
          .kb-navlinks{display:none!important}
        }
        @media(max-width:680px){
          .kb-3col{grid-template-columns:1fr!important}
          .kb-stats{grid-template-columns:1fr 1fr!important;gap:28px 16px!important}
          .kb-nav-wa{display:none!important}
        }
      `}</style>

      <TopBar/>
      <Navbar onCTA={open}/>
      <Outlet context={{ openForm: open }}/>
      <Footer/>

      {showForm && <FormModal onClose={close}/>}
    </div>
  );
}
