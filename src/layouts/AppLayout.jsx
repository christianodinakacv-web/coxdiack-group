import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";     // <-- ADD THIS
import FloatingWhatsApp from "../components/FloatingWhatsApp";

export default function AppLayout() {
const location = useLocation();

// Sidebar hidden only on Home page (/)
const hideSidebar = location.pathname === "/";

return ( <div className="min-h-screen bg-[#0A1837] text-white flex">

  {/* Sidebar (hidden only on home) */}
  {!hideSidebar && (
    <Sidebar />
  )}

  {/* Main content column */}
  <div className="flex-1 flex flex-col">
    
    {/* Navbar always visible on every page */}
    <Navbar />

    {/* Routed page output */}
    <main className="pt-16 px-4 md:px-8">
      <Outlet />
    </main>
    
    <Footer />                 {/* <-- ADD THIS */}

    <FloatingWhatsApp />
  </div>
</div>

);
}
