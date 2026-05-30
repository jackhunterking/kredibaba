import { Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import Solutions from "./pages/Solutions.jsx";
import Rates from "./pages/Rates.jsx";
import Tools from "./pages/Tools.jsx";
import Learn from "./pages/Learn.jsx";
import About from "./pages/About.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="cozumler" element={<Solutions/>}/>
        <Route path="oranlar" element={<Rates/>}/>
        <Route path="araclar" element={<Tools/>}/>
        <Route path="ogren" element={<Learn/>}/>
        <Route path="hakkimizda" element={<About/>}/>
      </Route>
    </Routes>
  );
}
