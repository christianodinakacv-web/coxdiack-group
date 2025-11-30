import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import AppLayout from "./layouts/AppLayout";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import PortfolioDetail from "./pages/PortfolioDetail";
import Contact from "./pages/Contact";
import Testimonials from "./pages/Testimonials";
import Feedback from "./pages/Feedback";
import Gallery from "./pages/Gallery";

// Admin Pages
import AdminLogin from "./pages/admin/Login";          // UPDATED PATH
import AdminDashboard from "./pages/admin/Dashboard";  // UPDATED PATH
import AdminRoute from "./pages/admin/AdminRoute";     // NEW FILE

// Service Pages
import WebDesign from "./pages/services/WebDesign";
import BrandIdentity from "./pages/services/BrandIdentity";
import DigitalStrategy from "./pages/services/DigitalStrategy";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* Public Home (no layout wrapper) */}
        <Route path="/" element={<Home />} />

        {/* Admin Login (no layout wrapper) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* Everything below uses the App Layout */}
        <Route element={<AppLayout />}>

          {/* Main Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/gallery" element={<Gallery />} />

          {/* Service Sub-pages */}
          <Route path="/services/web-design" element={<WebDesign />} />
          <Route path="/services/brand-identity" element={<BrandIdentity />} />
          <Route path="/services/digital-strategy" element={<DigitalStrategy />} />

          {/* Dynamic Portfolio Case Study */}
          <Route path="/portfolio/:id" element={<PortfolioDetail />} />

        </Route>

      </Routes>
    </Router>
  );
}
