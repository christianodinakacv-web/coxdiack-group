import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import AppLayout from "./layouts/AppLayout";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import PortfolioDetail from "./pages/PortfolioDetail";
import Contact from "./pages/Contact";
import Testimonials from "./pages/Testimonials";
import Feedback from "./pages/Feedback";
import Gallery from "./pages/Gallery";
import Admin from "./pages/Admin";

// Service Pages
import WebDesign from "./pages/services/WebDesign";
import BrandIdentity from "./pages/services/BrandIdentity";
import DigitalStrategy from "./pages/services/DigitalStrategy";

// Portfolio Case Study Page (dynamic)
import CaseStudy from "./pages/portfolio/CaseStudy";

export default function App() {
return ( <Router> <Routes>

    {/* Public Home (no sidebar, no layout wrapper) */}
    <Route path="/" element={<Home />} />

    {/* Everything else shares the main layout */}
    <Route element={<AppLayout />}>

      {/* Primary Pages */}
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/gallery" element={<Gallery />} />
       // inside the layout routes:
      <Route path="/admin" element={<Admin />} />


      {/* Service Sub-pages */}
      <Route path="/services/web-design" element={<WebDesign />} />
      <Route path="/services/brand-identity" element={<BrandIdentity />} />
      <Route path="/services/digital-strategy" element={<DigitalStrategy />} />

      {/* Portfolio dynamic route */}
      <Route path="/portfolio/:id" element={<PortfolioDetail />} />

    </Route>
  </Routes>
</Router>

);
}
