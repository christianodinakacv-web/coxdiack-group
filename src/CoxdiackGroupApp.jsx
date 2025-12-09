// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

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
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Reviews from "./pages/admin/Reviews";
import NotificationsPage from "./pages/admin/NotificationsPage";

// Admin Route Guard
import AdminRoute from "./pages/admin/AdminRoute";

// Service Pages
import WebDesign from "./pages/services/WebDesign";
import BrandIdentity from "./pages/services/BrandIdentity";
import DigitalStrategy from "./pages/services/DigitalStrategy";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* ---------- Public Admin Login ---------- */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ---------- Protected Admin Routes ---------- */}
        <Route element={<AdminRoute />}>

          {/* Redirect /admin → /admin/dashboard */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/reviews" element={<Reviews />} />
          <Route path="/admin/notifications" element={<NotificationsPage />} />
        </Route>

        {/* ---------- Public Website (with layout) ---------- */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />

          {/* Service Sub-Pages */}
          <Route path="/services/web-design" element={<WebDesign />} />
          <Route path="/services/brand-identity" element={<BrandIdentity />} />
          <Route path="/services/digital-strategy" element={<DigitalStrategy />} />

          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<PortfolioDetail />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/gallery" element={<Gallery />} />

          {/* 404 for all public routes */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
