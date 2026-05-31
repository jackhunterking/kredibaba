import { useState, useEffect } from "react";
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp, Menu, Phone, Search, ShieldCheck, X } from "lucide-react";
import { C, FB, R, S, SHADOW, TEL, LICENSE, BROKERAGE, wrap } from "./theme.jsx";
import { useLang, interp } from "./i18n/LanguageContext.jsx";
import LanguageToggle from "./components/LanguageToggle.jsx";
import FormModal from "./FormModal.jsx";
import kredibabaMark from "./assets/kredibaba-mark.svg";

function Logo() {
  const { t } = useLang();
  return (
    <Link to="/" className="kb-logo" aria-label={t.nav.logoAria}>
      <img className="kb-logo-mark" src={kredibabaMark} alt="" aria-hidden="true" />
      <span className="kb-logo-word">
        <span>Kredi</span>
        <span>baba</span>
      </span>
    </Link>
  );
}

function TopBar({ onCTA }) {
  const { t } = useLang();
  return (
    <div className="kb-top-promo">
      <div style={{...wrap}} className="kb-top-promo-inner">
        <span className="kb-top-promo-text">
          <Search size={15}/> {t.topPromo.text}
        </span>
        <button onClick={onCTA} className="kb-top-promo-cta">{t.topPromo.cta}</button>
      </div>
    </div>
  );
}

function MegaPanel({ menuKey, onClose }) {
  const { t } = useLang();
  const menu = menuKey ? t.mega[menuKey] : null;
  if (!menu) return null;

  return (
    <div className="kb-mega-panel" onMouseEnter={() => {}} onMouseLeave={onClose}>
      <div style={{maxWidth:wrap.maxWidth,margin:wrap.margin}} className="kb-mega-inner">
        {menu.groups.map((group) => (
          <div key={group.title} className={`kb-mega-group ${group.className}`}>
            {menuKey === 'cozumler' && (
              <h2 className="kb-mega-title">{group.title}</h2>
            )}
            <div className="kb-mega-items">
              {group.items.map((item) => (
                <Link key={item.href} to={item.href} className="kb-mega-item" onClick={onClose}>
                  <span className="kb-mega-item-title">{item.label}</span>
                  {item.desc && <span className="kb-mega-item-desc">{item.desc}</span>}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileGroup({ title, items, open, onToggle, onClose }) {
  return (
    <div className="kb-mobile-group">
      <button className="kb-mobile-group-trigger" onClick={onToggle} aria-expanded={open}>
        <span>{title}</span>
        {open ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
      </button>
      {open && (
        <div className="kb-mobile-group-list">
          {items.map((item) => (
            <Link key={item.href} to={item.href} className="kb-mobile-menu-item" onClick={onClose}>
              <span>{item.label}</span>
              {item.desc && <small>{item.desc}</small>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileDrawer({ open, currentGroup, setCurrentGroup, onClose }) {
  const { t } = useLang();
  if (!open) return null;
  const solutionItems = t.mega.cozumler.groups.flatMap((group) => group.items);
  const toolItems = t.mega.araclar.groups[0].items;

  return (
    <div className="kb-mobile-drawer">
      <div className="kb-mobile-drawer-inner">
        <MobileGroup
          title={t.nav.solutions}
          items={solutionItems}
          open={currentGroup === 'cozumler'}
          onToggle={() => setCurrentGroup(currentGroup === 'cozumler' ? '' : 'cozumler')}
          onClose={onClose}
        />
        <MobileGroup
          title={t.nav.tools}
          items={toolItems}
          open={currentGroup === 'araclar'}
          onToggle={() => setCurrentGroup(currentGroup === 'araclar' ? '' : 'araclar')}
          onClose={onClose}
        />
        <NavLink to="/ogren" className="kb-mobile-simple-link" onClick={onClose}>{t.nav.learn}</NavLink>
        <NavLink to="/hakkimizda" className="kb-mobile-simple-link" onClick={onClose}>{t.nav.about}</NavLink>
      </div>
    </div>
  );
}

function Navbar({onCTA}) {
  const { t } = useLang();
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState('cozumler');
  const { pathname } = useLocation();
  const closeMenus = () => {
    setActiveMenu(null);
    setMobileOpen(false);
  };

  const NAV = [
    { key:'cozumler', to:'/cozumler', label:t.nav.solutions, mega:true },
    { key:'araclar',  to:'/araclar',  label:t.nav.tools, mega:true },
    { key:'ogren',    to:'/ogren',    label:t.nav.learn },
    { key:'hakkimizda', to:'/hakkimizda', label:t.nav.about },
  ];

  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav className="kb-navbar" onMouseLeave={() => setActiveMenu(null)}>
      <div style={{...wrap}} className="kb-nav-inner">
        <div className="kb-nav-left">
          <Logo />
          <div className="kb-desktop-nav" onMouseEnter={() => {}}>
            {NAV.map((n) => (
              n.mega ? (
                <button
                  key={n.key}
                  className={`kb-nav-item kb-nav-button ${activeMenu === n.key ? 'is-active' : ''}`}
                  onMouseEnter={() => setActiveMenu(n.key)}
                  onFocus={() => setActiveMenu(n.key)}
                  onClick={() => setActiveMenu(activeMenu === n.key ? null : n.key)}
                  aria-expanded={activeMenu === n.key}
                  aria-haspopup="true"
                >
                  {n.label} <ChevronDown size={15}/>
                </button>
              ) : (
                <NavLink
                  key={n.key}
                  to={n.to}
                  className={({isActive}) => `kb-nav-item ${isActive ? 'is-active' : ''}`}
                  onMouseEnter={() => setActiveMenu(null)}
                >
                  {n.label}
                </NavLink>
              )
            ))}
          </div>
        </div>
        <div className="kb-desktop-actions">
          <LanguageToggle />
          <button onClick={onCTA} className="kb-primary-nav-cta">
            {t.nav.cta}
          </button>
        </div>
        <div className="kb-mobile-actions">
          <LanguageToggle />
          <button onClick={onCTA} className="kb-primary-nav-cta">{t.nav.cta}</button>
          <button
            className="kb-mobile-menu-button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t.nav.menuClose : t.nav.menuOpen}
          >
            {t.nav.menu} {mobileOpen ? <X size={17}/> : <Menu size={17}/>}
          </button>
        </div>
      </div>
      <MegaPanel menuKey={activeMenu} onClose={() => setActiveMenu(null)} />
      <MobileDrawer
        open={mobileOpen}
        currentGroup={mobileGroup}
        setCurrentGroup={setMobileGroup}
        onClose={closeMenus}
      />
    </nav>
  );
}

function Footer() {
  const { t } = useLang();
  const cols = t.footer.cols;
  const vars = { BROKERAGE, LICENSE, YEAR: new Date().getFullYear() };
  return (
    <footer style={{background:C.navyD,color:'rgba(255,255,255,0.7)'}}>
      <div style={{...wrap,paddingTop:56,paddingBottom:36}}>
        <div className="kb-foot" style={{display:'grid',gridTemplateColumns:'1.4fr repeat(3,1fr)',gap:32,marginBottom:44}}>
          <div>
            <Link to="/" className="kb-footer-logo">
              <img className="kb-footer-logo-mark" src={kredibabaMark} alt="" aria-hidden="true" />
              <span style={{display:'inline-flex',alignItems:'baseline',gap:1}}>
                <span style={{fontFamily:FB,fontSize:22,fontWeight:600,color:'#fff'}}>Kredi</span>
                <span style={{fontFamily:FB,fontSize:22,fontWeight:600,color:C.blueLight}}>baba</span>
              </span>
            </Link>
            <p style={{fontSize:13.5,lineHeight:1.7,maxWidth:310,fontFamily:FB}}>
              {interp(t.footer.brand, vars)}
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
          <div style={{display:'flex',gap:10,alignItems:'flex-start'}}>
            <ShieldCheck size={16} color={C.blueLight} style={{flexShrink:0,marginTop:2}}/>
            <p style={{fontSize:12,lineHeight:1.7,color:'rgba(255,255,255,0.62)',margin:0,fontFamily:FB}}>
              <strong style={{color:'rgba(255,255,255,0.85)'}}>{t.footer.disclaimerLabel}</strong>{' '}
              {interp(t.footer.disclaimer, vars)}
            </p>
          </div>
          <p style={{fontSize:11.5,lineHeight:1.8,color:'rgba(255,255,255,0.5)',margin:0,fontFamily:FB}}>
            {interp(t.footer.legal1, vars)}
          </p>
          <p style={{fontSize:11,lineHeight:1.7,color:'rgba(255,255,255,0.38)',margin:0,fontFamily:FB,
                     borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:14}}>
            {interp(t.footer.legal2, vars)}
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
  const { pathname, hash } = useLocation();

  useEffect(() => {
    document.body.style.overflow = showForm ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showForm]);

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    requestAnimationFrame(() => {
      try {
        const target = document.querySelector(decodeURIComponent(hash));
        if (target) target.scrollIntoView({ block: 'start' });
      } catch {
        window.scrollTo(0, 0);
      }
    });
  }, [pathname, hash]);

  return (
    <div style={{background:C.bg,color:C.text,fontFamily:FB,minHeight:'100vh'}}>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{background:${C.bg};font-family:${FB};-webkit-font-smoothing:antialiased;}
        ::selection{background:${C.blueFaint};color:${C.navy};}
        a{color:inherit;}
        button:hover{filter:brightness(.98)}
        [id]{scroll-margin-top:128px;}
        .kb-top-promo{background:${C.navy};color:#fff;}
        .kb-top-promo-inner{min-height:42px;display:flex;align-items:center;justify-content:center;gap:${S[16]}px;font-family:${FB};}
        .kb-top-promo-text{display:inline-flex;align-items:center;gap:7px;font-size:14.5px;font-weight:600;letter-spacing:0;}
        .kb-top-promo-cta{border:none;border-radius:${R.control}px;background:${C.blue};color:#fff;font-family:${FB};font-size:13.5px;font-weight:600;padding:8px 18px;cursor:pointer;box-shadow:${SHADOW.card};}
        .kb-navbar{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.96);backdrop-filter:blur(10px);border-bottom:1px solid ${C.border};}
        .kb-nav-inner{display:flex;align-items:center;justify-content:space-between;min-height:72px;gap:18px;}
        .kb-nav-left{display:flex;align-items:center;gap:34px;min-width:0;}
        .kb-logo{display:flex;align-items:center;gap:8px;text-decoration:none;flex-shrink:0;}
        .kb-logo-mark{width:34px;height:34px;object-fit:contain;display:block;}
        .kb-logo-word{display:inline-flex;align-items:baseline;gap:1px;}
        .kb-logo-word span{font-family:${FB};font-size:24px;font-weight:700;line-height:1;}
        .kb-logo-word span:first-child{color:${C.navy};}
        .kb-logo-word span:last-child{color:${C.blue};}
        .kb-footer-logo{display:flex;align-items:center;gap:8px;margin-bottom:14px;text-decoration:none;}
        .kb-footer-logo-mark{width:32px;height:32px;object-fit:contain;display:block;filter:brightness(0) saturate(100%) invert(77%) sepia(31%) saturate(693%) hue-rotate(180deg) brightness(97%) contrast(92%);}
        .kb-desktop-nav{display:flex;align-items:center;gap:8px;}
        .kb-nav-item{display:inline-flex;align-items:center;gap:5px;border:none;background:transparent;color:${C.body};cursor:pointer;font-family:${FB};font-size:15px;font-weight:600;text-decoration:none;white-space:nowrap;padding:11px 12px;border-radius:${R.control}px;transition:background .15s,color .15s;}
        .kb-nav-item:hover,.kb-nav-item.is-active{background:${C.blueFaint};color:${C.blue};}
        .kb-nav-button svg{transition:transform .15s;}
        .kb-nav-button.is-active svg{transform:rotate(180deg);}
        .kb-desktop-actions{display:flex;align-items:center;gap:10px;flex-shrink:0;}
        .kb-primary-nav-cta{border:none;border-radius:${R.control}px;background:${C.blue};color:#fff;font-family:${FB};font-size:14.5px;font-weight:600;padding:11px 18px;cursor:pointer;box-shadow:${SHADOW.card};}
        .kb-lang-toggle{display:inline-flex;align-items:center;gap:4px;padding:3px;background:${C.surface};border:1px solid ${C.border};border-radius:${R.control}px;flex-shrink:0;}
        .kb-lang-flag{display:inline-flex;align-items:center;justify-content:center;width:30px;height:22px;padding:0;border:none;border-radius:5px;background:transparent;cursor:pointer;opacity:.45;filter:grayscale(55%);transition:opacity .15s,filter .15s,box-shadow .15s;}
        .kb-lang-flag img{width:24px;height:16px;object-fit:cover;border-radius:3px;display:block;box-shadow:0 0 0 1px rgba(10,37,64,.10);}
        .kb-lang-flag:hover{opacity:.85;filter:grayscale(0);}
        .kb-lang-flag.is-active{opacity:1;filter:grayscale(0);box-shadow:0 0 0 2px ${C.blue};}
        .kb-mega-panel{position:absolute;left:0;right:0;top:100%;z-index:45;background:${C.bg};border-bottom:1px solid ${C.border};box-shadow:${SHADOW.elevated};}
        .kb-mega-inner{display:grid;grid-template-columns:.82fr 1.7fr;gap:${S[56]}px;padding:${S[48]}px ${S[24]}px ${S[64]}px;}
        .kb-mega-title{display:inline-block;font-family:${FB};font-size:28px;line-height:1.1;color:${C.navy};font-weight:700;margin-bottom:30px;background:none;}
        .kb-mega-items{display:grid;gap:${S[12]}px;}
        .kb-mega-what .kb-mega-items{grid-template-columns:repeat(2,minmax(230px,1fr));gap:${S[12]}px ${S[32]}px;}
        .kb-mega-tools{grid-column:1 / -1;}
        .kb-mega-tools .kb-mega-items{grid-template-columns:repeat(3,minmax(230px,1fr));gap:${S[12]}px ${S[32]}px;}
        .kb-mega-tools .kb-mega-item:nth-child(10){grid-column:auto;}
        .kb-mega-item{position:relative;display:block;text-decoration:none;min-height:56px;padding:${S[12]}px ${S[16]}px ${S[12]}px ${S[16]}px;border:1px solid transparent;border-left:3px solid ${C.blue};border-radius:${R.control}px;transition:background .15s,border-color .15s;}
        .kb-mega-item:hover{background:${C.blueFaint};border-color:${C.border};border-left-color:${C.blue};}
        .kb-mega-item-title{display:block;color:${C.navy};font-family:${FB};font-size:18px;font-weight:600;line-height:1.2;letter-spacing:0;}
        .kb-mega-item-desc{display:block;color:${C.muted};font-family:${FB};font-size:13.5px;font-weight:500;line-height:1.35;margin-top:6px;}
        .kb-mega-item:hover .kb-mega-item-title{color:${C.blue};}
        .kb-mobile-actions{display:none;align-items:center;gap:9px;flex-shrink:0;}
        .kb-mobile-menu-button{display:inline-flex;align-items:center;gap:6px;border:none;border-radius:${R.control}px;background:${C.navy};color:#fff;font-family:${FB};font-size:14px;font-weight:600;padding:11px 15px;cursor:pointer;}
        .kb-mobile-drawer{display:none;background:${C.bg};border-top:1px solid ${C.border};box-shadow:${SHADOW.elevated};}
        .kb-mobile-drawer-inner{max-width:${wrap.maxWidth}px;margin:0 auto;padding:${S[24]}px ${S[24]}px ${S[40]}px;display:grid;gap:${S[12]}px;}
        .kb-mobile-group-trigger,.kb-mobile-simple-link{width:100%;min-height:52px;border:1px solid ${C.border};border-radius:${R.control}px;background:${C.blueFaint};color:${C.navy};font-family:${FB};font-size:16px;font-weight:600;text-decoration:none;display:flex;align-items:center;justify-content:space-between;padding:0 ${S[20]}px;cursor:pointer;}
        .kb-mobile-group-list{padding:${S[16]}px 0 ${S[24]}px;display:grid;gap:${S[12]}px;}
        .kb-mobile-menu-item{position:relative;display:block;text-decoration:none;padding:${S[12]}px ${S[16]}px;border:1px solid ${C.borderL};border-left:3px solid ${C.blue};border-radius:${R.control}px;background:#fff;}
        .kb-mobile-menu-item span{display:block;font-size:16px;font-weight:600;color:${C.navy};line-height:1.2;}
        .kb-mobile-menu-item small{display:block;font-size:12.5px;font-weight:500;color:${C.muted};margin-top:5px;line-height:1.3;}
        .kb-hero-title{margin:0;font-size:clamp(32px,4vw,52px);font-weight:700;line-height:1.1;letter-spacing:-.025em;}
        .kb-hero-card-title{font-size:clamp(22px,2.3vw,30px);font-weight:600;line-height:1.18;text-align:center;margin-bottom:${S[24]}px;}
        .kb-hero-rate-term{font-size:12.5px;font-weight:700;line-height:1.2;text-transform:uppercase;letter-spacing:.18px;margin-bottom:10px;}
        .kb-hero-rate-value{font-size:clamp(42px,4.3vw,56px);font-weight:800;line-height:1.08;letter-spacing:-.035em;max-width:100%;overflow-wrap:normal;white-space:nowrap;}
        .kb-hero-rate-value.is-pending{font-size:clamp(22px,2.2vw,30px);line-height:1.1;letter-spacing:-.015em;overflow-wrap:anywhere;white-space:normal;}
        .kb-hero-rate-cell + .kb-hero-rate-cell{border-left:1px solid ${C.border};}
        @media(max-width:1180px){
          .kb-hero-title{font-size:clamp(32px,4.2vw,46px);max-width:680px;margin-left:auto;margin-right:auto;}
          .kb-hero-rate-value{font-size:clamp(38px,4vw,52px);}
          .kb-hero-rate-value.is-pending{font-size:clamp(20px,2vw,26px);}
        }
        @media(max-width:920px){
          .kb-hero-title{font-size:clamp(32px,6vw,44px);}
          .kb-hero-grid{grid-template-columns:1fr!important;gap:40px!important}
          .kb-hero-rate-card{min-height:auto!important;padding:30px 28px!important}
          .kb-hero-image,.kb-hero-image img{min-height:320px!important}
          .kb-2col{grid-template-columns:1fr!important}
          .kb-4col{grid-template-columns:1fr 1fr!important}
          .kb-foot{grid-template-columns:1fr 1fr!important}
          .kb-desktop-nav,.kb-desktop-actions,.kb-mega-panel{display:none!important}
          .kb-mobile-actions{display:flex!important}
          .kb-mobile-drawer{display:block!important}
          .kb-nav-inner{min-height:72px}
          .kb-nav-left{gap:18px}
        }
        @media(max-width:680px){
          .kb-hero-title{font-size:clamp(29px,8.4vw,38px);line-height:1.12;letter-spacing:-.02em;}
          .kb-hero-card-title{font-size:24px;margin-bottom:${S[20]}px;}
          .kb-hero-rate-card{padding:26px 20px!important}
          .kb-hero-rate-term{font-size:12px;margin-bottom:8px;}
          .kb-hero-rate-value{font-size:clamp(42px,13vw,54px);}
          .kb-hero-rate-value.is-pending{font-size:clamp(24px,7vw,32px);}
          .kb-3col{grid-template-columns:1fr!important}
          .kb-4col{grid-template-columns:1fr!important}
          .kb-mini-3col{grid-template-columns:1fr!important}
          .kb-stats{grid-template-columns:1fr 1fr!important;gap:14px!important}
          .kb-top-promo-inner{flex-direction:column;gap:9px;padding-top:9px;padding-bottom:10px}
          .kb-top-promo-text{font-size:13.5px;text-align:center}
          .kb-top-promo-cta{padding:7px 16px}
          .kb-logo-mark{width:31px;height:31px}
          .kb-logo-word span{font-size:22px}
          .kb-primary-nav-cta{padding:10px 13px;font-size:13.5px}
          .kb-mobile-menu-button{padding:10px 12px;font-size:13.5px}
          .kb-hero-rate-grid{grid-template-columns:1fr!important}
          .kb-hero-rate-cell + .kb-hero-rate-cell{border-left:none!important;border-top:1px solid ${C.border};}
          .kb-hero-image,.kb-hero-image img{min-height:280px!important}
        }
        @media(max-width:430px){
          .kb-hero-title{font-size:clamp(27px,8.7vw,34px);}
          .kb-hero-rate-card{padding:24px 18px!important}
          .kb-hero-rate-value{font-size:clamp(40px,12vw,50px);}
          .kb-nav-inner{padding-left:16px!important;padding-right:16px!important;gap:10px}
          .kb-mobile-actions{gap:7px}
          .kb-mobile-actions .kb-primary-nav-cta{display:none!important}
          .kb-mobile-menu-button{padding:9px 10px}
        }
      `}</style>

      <TopBar onCTA={open}/>
      <Navbar onCTA={open}/>
      <Outlet context={{ openForm: open }}/>
      <Footer/>

      {showForm && <FormModal onClose={close}/>}
    </div>
  );
}
