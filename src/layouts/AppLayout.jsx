// src/layouts/AppLayout.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

export default function AppLayout() {
  const location = useLocation();

  // Sidebar hidden only on Home page
  const hideSidebar = location.pathname === "/";

  return (
    <div className="min-h-screen bg-[#0A1837] text-white flex">

      {/* Sidebar (not on home) */}
      {!hideSidebar && <Sidebar />}

      {/* Main Column */}
      <div className="flex-1 flex flex-col">

        {/* Navbar always visible */}
        <Navbar />

        {/* Routed Page Content */}
        <main className="pt-16 px-4 md:px-8">
          <Outlet />
        </main>

        {/* Footer always visible */}
        <Footer />

        {/* WhatsApp Button */}
        <FloatingWhatsApp />
      </div>
    </div>
  );
}