import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';   // ← Add

import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductTanks from './pages/ProductTanks';
import ProductPiping from './pages/ProductPiping';
import ProductSkids from './pages/ProductSkids';
import ProductStructural from './pages/ProductStructural';
import ProductMechanical from './pages/ProductMechanical';
import Industries from './pages/Industries';
import QualitySafety from './pages/QualitySafety';
import Clientele from './pages/Clientele';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <CustomCursor />           {/* ← Add — must be inside BrowserRouter */}
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/tanks-process-equipment" element={<ProductTanks />} />
        <Route path="/products/piping" element={<ProductPiping />} />
        <Route path="/products/skids-assemblies" element={<ProductSkids />} />
        <Route path="/products/structural-fabrication" element={<ProductStructural />} />
        <Route path="/products/mechanical-execution" element={<ProductMechanical />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/quality-safety-infrastructure" element={<QualitySafety />} />
        <Route path="/clientele" element={<Clientele />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;