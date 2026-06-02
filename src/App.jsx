import { Navigate, Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import Solutions from "./pages/Solutions.jsx";
import SolutionDetail from "./pages/SolutionDetail.jsx";
import Rates from "./pages/Rates.jsx";
import Learn from "./pages/Learn.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import AdvertisingDisclosure from "./pages/AdvertisingDisclosure.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsOfUse from "./pages/TermsOfUse.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/auth/*" element={<Navigate to="/iletisim" replace/>}/>
      <Route path="/app/*" element={<Navigate to="/iletisim" replace/>}/>

      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="cozumler" element={<Solutions/>}/>
        <Route path="cozumler/ilk-ev" element={<SolutionDetail slug="ilk-ev"/>}/>
        <Route path="cozumler/ev-sahipleri" element={<SolutionDetail slug="ev-sahipleri"/>}/>
        <Route path="cozumler/yatirimcilar" element={<SolutionDetail slug="yatirimcilar"/>}/>
        <Route path="cozumler/serbest-meslek" element={<SolutionDetail slug="serbest-meslek"/>}/>
        <Route path="cozumler/yeni-gelenler" element={<SolutionDetail slug="yeni-gelenler"/>}/>
        <Route path="oranlar" element={<Rates/>}/>
        <Route path="ogren" element={<Learn/>}/>
        <Route path="hakkimizda" element={<About/>}/>
        <Route path="iletisim" element={<Contact/>}/>
        <Route path="reklam-aciklamasi" element={<AdvertisingDisclosure/>}/>
        <Route path="gizlilik" element={<PrivacyPolicy/>}/>
        <Route path="kullanim-sartlari" element={<TermsOfUse/>}/>
      </Route>
    </Routes>
  );
}
