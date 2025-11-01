import React from "react";
import { motion } from "framer-motion";
import strategy from "../assets/portfolio/uiux.jpg";

export default function DigitalStrategy({ setActive, setIsSidebarOpen }) {
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
        Digital Strategy & Growth
      </h1>
      <img
        src={strategy}
        alt="Digital Strategy"
        data-aos="zoom-in"
        className="w-full max-w-4xl rounded-2xl mb-8 shadow-lg border border-[#00FFA3]/30"
      />
      <p
        data-aos="fade-up"
        className="text-gray-300 max-w-3xl text-center mb-8 leading-relaxed"
      >
        We help brands navigate the digital landscape with tailored strategies
        that drive measurable growth.  
        <span className="text-[#00FFA3] font-semibold">Coxdiack Group</span>
        focuses on data-driven decision-making, audience insights, and
        performance optimization to ensure every campaign delivers.
        <br /><br />
        From SEO and content marketing to social media campaigns and automation
        tools, we create strategies that align creativity with technology for
        maximum results.
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
