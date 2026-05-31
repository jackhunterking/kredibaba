import { useEffect, useState } from "react";
import { Outlet, NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutGrid, Building2, UserCircle, FileText, Briefcase, HelpCircle,
  Gift, Users, LogOut, Moon, Sun, Menu, X,
} from "lucide-react";
import { FB, R } from "../theme.jsx";
import { A, APP_THEME_CSS } from "./appTheme.js";
import { useLang } from "../i18n/LanguageContext.jsx";
import { useAuth } from "./AuthContext.jsx";
import { useAppTheme } from "./ThemeContext.jsx";
import LanguageToggle from "../components/LanguageToggle.jsx";
import kredibabaMark from "../assets/kredibaba-mark.svg";

function BrandLogo() {
  return (
    <Link to="/app" className="kb-app-brand" aria-label="Kredibaba">
      <img src={kredibabaMark} alt="" aria-hidden="true" />
      <span>
        <span className="kb-app-brand-k">Kredi</span><span className="kb-app-brand-b">baba</span>
      </span>
    </Link>
  );
}

function NavItem({ to, end, icon, label, onClick }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className="kb-app-nav-link"
      style={({ isActive }) => ({
        background: isActive ? A.accentFaint : "transparent",
        color: isActive ? A.accent : A.body,
        fontWeight: isActive ? 700 : 600,
      })}
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}

function SidebarContent({ onNavigate }) {
  const { t } = useLang();
  const s = t.app.sidebar;
  const { signOut } = useAuth();
  const { isDark, toggleTheme } = useAppTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/auth/sign-in");
  };

  const primary = [
    { to: "/app", end: true, icon: <LayoutGrid size={19} />, label: s.dashboard },
    { to: "/app/properties", icon: <Building2 size={19} />, label: s.properties },
    { to: "/app/profile", icon: <UserCircle size={19} />, label: s.profile },
    { to: "/app/documents", icon: <FileText size={19} />, label: s.documents },
    { to: "/app/toolkit", icon: <Briefcase size={19} />, label: s.toolkit },
    { to: "/app/help", icon: <HelpCircle size={19} />, label: s.help },
  ];
  const secondary = [
    { to: "/app/referrals", icon: <Gift size={18} />, label: s.referrals },
    { to: "/app/realtors", icon: <Users size={18} />, label: s.realtors },
  ];

  return (
    <>
      <div className="kb-app-sidebar-top">
        <BrandLogo />
      </div>

      <nav className="kb-app-nav">
        {primary.map((n) => <NavItem key={n.to} {...n} onClick={onNavigate} />)}
      </nav>

      <div className="kb-app-sidebar-bottom">
        {secondary.map((n) => <NavItem key={n.to} {...n} onClick={onNavigate} />)}

        <button className="kb-app-nav-link kb-app-nav-btn" onClick={handleLogout} style={{ color: A.body }}>
          <LogOut size={18} /> <span>{s.logout}</span>
        </button>

        <button className="kb-app-nav-link kb-app-nav-btn" onClick={toggleTheme} style={{ color: A.body }}>
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
          <span>{isDark ? s.lightMode : s.darkMode}</span>
        </button>

        <div className="kb-app-sidebar-foot">
          <LanguageToggle />
          <span className="kb-app-version">v0.1</span>
        </div>
      </div>
    </>
  );
}

export default function AppLayout() {
  const { theme } = useAppTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the drawer + scroll to top on navigation.
  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <div className="kb-app" data-theme={theme}>
      <style>{APP_THEME_CSS}{`
        .kb-app{min-height:100vh;background:${A.bg};color:${A.text};font-family:${FB};-webkit-font-smoothing:antialiased;}
        .kb-app *,.kb-app *::before,.kb-app *::after{box-sizing:border-box;}
        .kb-app-shell{display:flex;min-height:100vh;}

        .kb-app-sidebar{width:264px;flex-shrink:0;background:${A.sidebar};border-right:1px solid ${A.border};
          display:flex;flex-direction:column;position:sticky;top:0;height:100vh;overflow-y:auto;z-index:60;}
        .kb-app-sidebar-top{padding:22px 20px 14px;border-bottom:1px solid ${A.borderL};}
        .kb-app-brand{display:flex;align-items:center;gap:8px;text-decoration:none;}
        .kb-app-brand img{width:30px;height:30px;object-fit:contain;display:block;}
        .kb-app-brand-k{font-family:${FB};font-size:22px;font-weight:700;color:${A.text};}
        .kb-app-brand-b{font-family:${FB};font-size:22px;font-weight:700;color:${A.accent};}

        .kb-app-nav{display:flex;flex-direction:column;gap:3px;padding:16px 14px;flex:1;}
        .kb-app-sidebar-bottom{display:flex;flex-direction:column;gap:3px;padding:14px;border-top:1px solid ${A.borderL};}
        .kb-app-nav-link{display:flex;align-items:center;gap:12px;padding:11px 13px;border-radius:${R.control}px;
          font-family:${FB};font-size:14.5px;font-weight:600;text-decoration:none;cursor:pointer;
          border:none;background:transparent;width:100%;text-align:left;transition:background .14s,color .14s;}
        .kb-app-nav-link:hover{background:${A.hover};color:${A.accent}!important;}
        .kb-app-nav-btn{font-size:14.5px;}
        .kb-app-sidebar-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:14px 13px 4px;}
        .kb-app-version{font-family:${FB};font-size:11.5px;color:${A.muted};font-weight:500;}

        .kb-app-main{flex:1;min-width:0;display:flex;flex-direction:column;}
        .kb-app-content{width:100%;max-width:1180px;margin:0 auto;padding:32px 32px 64px;}

        .kb-app-topbar{display:none;align-items:center;justify-content:space-between;gap:12px;
          padding:12px 16px;background:${A.sidebar};border-bottom:1px solid ${A.border};position:sticky;top:0;z-index:50;}
        .kb-app-hamburger{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;
          border:1px solid ${A.border};background:${A.card};color:${A.text};border-radius:${R.control}px;cursor:pointer;}
        .kb-app-backdrop{display:none;}

        .kb-lang-toggle{display:inline-flex;align-items:center;gap:4px;padding:3px;background:${A.card2};
          border:1px solid ${A.border};border-radius:${R.control}px;}
        .kb-lang-flag{display:inline-flex;align-items:center;justify-content:center;width:30px;height:22px;padding:0;
          border:none;border-radius:5px;background:transparent;cursor:pointer;opacity:.45;filter:grayscale(55%);
          transition:opacity .15s,filter .15s,box-shadow .15s;}
        .kb-lang-flag img{width:24px;height:16px;object-fit:cover;border-radius:3px;display:block;box-shadow:0 0 0 1px rgba(10,37,64,.10);}
        .kb-lang-flag:hover{opacity:.85;filter:grayscale(0);}
        .kb-lang-flag.is-active{opacity:1;filter:grayscale(0);box-shadow:0 0 0 2px ${A.accent};}

        @media(max-width:900px){
          .kb-app-sidebar{position:fixed;left:0;top:0;transform:translateX(-100%);transition:transform .25s ease;box-shadow:0 20px 50px rgba(0,0,0,.3);}
          .kb-app-sidebar.is-open{transform:translateX(0);}
          .kb-app-topbar{display:flex;}
          .kb-app-content{padding:20px 16px 56px;}
          .kb-app-backdrop.is-open{display:block;position:fixed;inset:0;background:rgba(6,25,44,.5);z-index:55;}
        }
        @media(max-width:560px){
          .kb-app-content{padding:18px 14px 48px;}
        }
      `}</style>

      <div className="kb-app-shell">
        <aside className={`kb-app-sidebar ${mobileOpen ? "is-open" : ""}`}>
          <SidebarContent onNavigate={() => setMobileOpen(false)} />
        </aside>
        <div className={`kb-app-backdrop ${mobileOpen ? "is-open" : ""}`} onClick={() => setMobileOpen(false)} />

        <div className="kb-app-main">
          <div className="kb-app-topbar">
            <button className="kb-app-hamburger" aria-label="Menu" onClick={() => setMobileOpen(true)}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <BrandLogo />
            <span style={{ width: 40 }} />
          </div>
          <main className="kb-app-content">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
