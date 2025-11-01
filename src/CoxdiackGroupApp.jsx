// src/CoxdiackGroupApp.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials"; // <- ensure import
import Feedback from "./components/Feedback";
import Ratings from "./components/Ratings";
import Contact from "./components/Contact";
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

  // keep sidebar open when active === "home"
  useEffect(() => {
    if (active === "home") setIsSidebarOpen(true);
  }, [active]);

  const renderPage = () => {
    switch (active) {
      case "home":
        return <Home setActive={setActive} setIsSidebarOpen={setIsSidebarOpen} />;
      case "about":
        return <About setActive={setActive} setIsSidebarOpen={setIsSidebarOpen} />;
      case "services":
        return <Services setActive={setActive} setIsSidebarOpen={setIsSidebarOpen} />;
      case "portfolio":
        return <Portfolio setActive={setActive} setIsSidebarOpen={setIsSidebarOpen} />;
      case "testimonials":
        return <Testimonials setActive={setActive} setIsSidebarOpen={setIsSidebarOpen} />;
      case "feedback":
        return <Feedback setActive={setActive} setIsSidebarOpen={setIsSidebarOpen} />;
      case "ratings":
        return <Ratings setActive={setActive} setIsSidebarOpen={setIsSidebarOpen} />;
      case "contact":
        return <Contact setActive={setActive} setIsSidebarOpen={setIsSidebarOpen} />;
      default:
        return <Home setActive={setActive} setIsSidebarOpen={setIsSidebarOpen} />;
    }
  };

  return (
    <div className="flex bg-[#0A1837] text-white min-h-screen relative">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute top-4 left-4 text-white md:hidden z-50 text-2xl"
      >
        ☰
      </button>

      <Sidebar
        active={active}
        setActive={setActive}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial="enter"
            animate="center"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.35 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <FloatingWhatsApp />
    </div>
  );
}
