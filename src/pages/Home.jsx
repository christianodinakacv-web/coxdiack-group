// src/pages/Home.jsx
import React from "react";
import Navbar from "../components/Navbar";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import AffiliateHighlights from "../components/AffiliateHighlights";

export default function Home() {
  return (
    <div className="bg-[#0A1837] text-white min-h-screen relative">

      {/* Navbar only for Home */}
      <Navbar />

      {/* HERO SECTION */}
      <section
        id="home-hero"
        className="h-screen flex flex-col items-center justify-center text-center px-6"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Coxdiack <span className="text-[#00FFA3]">Digital Hub</span>
        </h1>

        <p className="text-gray-300 max-w-2xl text-lg">
          Beginner-friendly AI tools, digital skills, and smart online growth
          strategies — no coding required.
        </p>

        {/* Top CTA Buttons */}
        <div className="mt-8 flex gap-4 flex-wrap justify-center">
          <a
            href="/services"
            className="px-6 py-3 bg-[#00FFA3] text-[#071226] rounded-lg font-semibold hover:bg-[#00cc84] transition-all"
          >
            Explore AI Tools
          </a>

          <a
            href="/portfolio"
            className="px-6 py-3 border border-[#00FFA3] rounded-lg hover:bg-[#11224E] transition-all"
          >
            Learn Digital Skills
          </a>
        </div>
      </section>

      {/* Affiliate Highlights */}
      <AffiliateHighlights />

      {/* BOTTOM CONVERSION CTA */}
      <section className="py-24 px-6 bg-[#071226] text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Choose Your <span className="text-[#00FFA3]">Learning Path</span>
        </h2>

        <p className="text-gray-300 max-w-3xl mx-auto mb-10 text-lg">
          Whether you want to master AI tools, build a YouTube system, or
          create smart online income streams — start with a beginner-friendly
          path designed for real growth.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="https://sites.google.com/view/coxdiack-digital-group/ai-profit-sniper"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#00FFA3] text-[#071226] font-semibold rounded-lg hover:bg-[#00cc84] transition"
          >
            Learn AI Tools
          </a>

          <a
            href="https://mattpar.com/tube-mastery-ds#aff=Coxdiack"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border border-[#00FFA3] rounded-lg hover:bg-[#11224E] transition"
          >
            YouTube Mastery
          </a>

          <a
            href="https://www.digistore24.com/redir/361682/Coxdiack/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border border-[#00FFA3] rounded-lg hover:bg-[#11224E] transition"
          >
            Smart Online Income
          </a>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <FloatingWhatsApp />
    </div>
  );
}
