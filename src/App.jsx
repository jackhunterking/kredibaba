import { Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import Solutions from "./pages/Solutions.jsx";
import SolutionDetail from "./pages/SolutionDetail.jsx";
import Rates from "./pages/Rates.jsx";
import Tools from "./pages/Tools.jsx";
import Learn from "./pages/Learn.jsx";
import About from "./pages/About.jsx";
import AdvertisingDisclosure from "./pages/AdvertisingDisclosure.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsOfUse from "./pages/TermsOfUse.jsx";
import Auth from "./pages/Auth.jsx";

// Authenticated app (/app) — Supabase-backed dashboard
import ProtectedRoute from "./app/ProtectedRoute.jsx";
import AppLayout from "./app/AppLayout.jsx";
import Dashboard from "./app/pages/Dashboard.jsx";
import PlanDetail from "./app/pages/PlanDetail.jsx";
import Properties from "./app/pages/Properties.jsx";
import Profile from "./app/pages/Profile.jsx";
import Documents from "./app/pages/Documents.jsx";
import Toolkit from "./app/pages/Toolkit.jsx";
import Help from "./app/pages/Help.jsx";
import Referrals from "./app/pages/Referrals.jsx";
import Realtors from "./app/pages/Realtors.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/auth/sign-up" element={<Auth mode="sign-up"/>}/>
      <Route path="/auth/sign-in" element={<Auth mode="sign-in"/>}/>

      {/* Authenticated dashboard — gated by Supabase session */}
      <Route element={<ProtectedRoute/>}>
        <Route path="/app" element={<AppLayout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="plans/:planId" element={<PlanDetail/>}/>
          <Route path="properties" element={<Properties/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="documents" element={<Documents/>}/>
          <Route path="toolkit" element={<Toolkit/>}/>
          <Route path="help" element={<Help/>}/>
          <Route path="referrals" element={<Referrals/>}/>
          <Route path="realtors" element={<Realtors/>}/>
        </Route>
      </Route>

      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="cozumler" element={<Solutions/>}/>
        <Route path="cozumler/ilk-ev" element={<SolutionDetail slug="ilk-ev"/>}/>
        <Route path="cozumler/ev-sahipleri" element={<SolutionDetail slug="ev-sahipleri"/>}/>
        <Route path="cozumler/yatirimcilar" element={<SolutionDetail slug="yatirimcilar"/>}/>
        <Route path="cozumler/serbest-meslek" element={<SolutionDetail slug="serbest-meslek"/>}/>
        <Route path="cozumler/yeni-gelenler" element={<SolutionDetail slug="yeni-gelenler"/>}/>
        <Route path="oranlar" element={<Rates/>}/>
        <Route path="araclar" element={<Tools/>}/>
        <Route path="ogren" element={<Learn/>}/>
        <Route path="hakkimizda" element={<About/>}/>
        <Route path="reklam-aciklamasi" element={<AdvertisingDisclosure/>}/>
        <Route path="gizlilik" element={<PrivacyPolicy/>}/>
        <Route path="kullanim-sartlari" element={<TermsOfUse/>}/>
      </Route>
    </Routes>
  );
}
