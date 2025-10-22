/* CoxdiackGroupApp.jsx */
import React, { useState } from "react";
import Contact from "./components/Contact";
import { motion, AnimatePresence } from "framer-motion";

import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Feedback from "./components/Feedback";
import Ratings from "./components/Ratings";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

import "./App.css";

const pageVariants = {
  enter: { opacity: 0, x: 50 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export default function CoxdiackGroupApp() {
  const [active, setActive] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // ✅ Page rendering logic
  const renderPage = () => {
    switch (active) {
      case "home":
        return <Home setActive={setActive} />;
      case "about":
        return <About />;
      case "services":
        return <Services />;
      case "portfolio":
        return <Portfolio />;
      case "feedback":
        return <Feedback />;
      case "ratings":
        return <Ratings />;
      case "contact":
        return <Contact />;
      default:
        return <Home setActive={setActive} />;
    }
  };

  return (
  <div className="flex bg-[#0A1837] text-white min-h-screen relative">
    
    {/* ✅ Step 5: Add Hamburger Button (for mobile view toggle) */}
    <button
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      className="absolute top-4 left-4 text-white md:hidden z-50"
    >
      ☰
    </button>

    {/* ✅ Sidebar */}
    <Sidebar
      active={active}
      setActive={setActive}
      isOpen={isSidebarOpen}
      setIsOpen={setIsSidebarOpen}
    />

    {/* ✅ Main Content Area */}
    <main className="flex-1 overflow-y-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial="enter"
          animate="center"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.4 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </main>

    {/* ✅ Floating WhatsApp */}
    <FloatingWhatsApp />
  </div>
);
}
