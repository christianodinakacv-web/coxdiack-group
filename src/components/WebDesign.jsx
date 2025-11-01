import React from "react";
import { motion } from "framer-motion";
import uiux from "../assets/portfolio/web-logo.png";

export default function WebDesign({ setActive, setIsSidebarOpen }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="bg-[#0A1837] text-white min-h-screen py-16 px-6 md:px-20 flex flex-col items-center"
    >
      <h1
        data-aos="fade-up"
        className="text-4xl font-bold text-[#00FFA3] mb-4 text-center"
      >
        Web Design & Development
      </h1>

      <img
        src={uiux}
        alt="Web Design"
        data-aos="zoom-in"
        className="w-full max-w-4xl rounded-2xl mb-8 shadow-lg border border-[#00FFA3]/30"
      />

      <p
        data-aos="fade-up"
        className="text-gray-300 max-w-3xl text-center mb-8 leading-relaxed"
      >
        At <span className="text-[#00FFA3] font-semibold">Coxdiack Group</span>,
        we design and build dynamic, responsive websites that help your brand
        shine online. From corporate portfolios to e-commerce and product pages,
        our designs are tailored for engagement, speed, and beauty. We combine
        user experience (UX) and user interface (UI) design principles to
        deliver seamless, mobile-first digital experiences that convert visitors
        into loyal customers.
        <br /><br />
        Whether you need a landing page, a business website, or a complete
        platform, we build it with passion, purpose, and precision.
      </p>

      <button
        onClick={() => setActive("portfolio")}
        className="bg-[#00FFA3] text-[#0A1837] px-8 py-3 rounded-full font-semibold hover:bg-[#00cc84] transition-all"
      >
        ← Back to Portfolio
      </button>
    </motion.section>
  );
}
