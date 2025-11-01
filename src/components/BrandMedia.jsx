import React from "react";
import { motion } from "framer-motion";
import branding from "../assets/portfolio/branding.jpg";

export default function BrandMedia({ setActive }) {
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
        Brand Media & Storytelling
      </h1>
      <img
        src={branding}
        alt="Brand Media"
        data-aos="zoom-in"
        className="w-full max-w-4xl rounded-2xl mb-8 shadow-lg border border-[#00FFA3]/30"
      />
      <p
        data-aos="fade-up"
        className="text-gray-300 max-w-3xl text-center mb-8 leading-relaxed"
      >
        Your brand deserves more than visibility — it deserves a *voice*.  
        At <span className="text-[#00FFA3] font-semibold">Coxdiack Group</span>,
        we craft emotional and visually powerful brand stories through creative
        media, video production, and social campaigns that connect and convert.
        <br /><br />
        From logo animations to branded reels and motion graphics, we bring
        stories to life — stories that build trust, strengthen identity, and
        drive engagement across every platform.
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
