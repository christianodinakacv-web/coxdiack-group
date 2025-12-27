// src/pages/Home.jsx
import React from "react";
import Navbar from "../components/Navbar";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import AffiliateHighlights from "../components/AffiliateHighlights"; // ← ADD

export default function Home() {
  return (
    <div className="bg-[#0A1837] text-white min-h-screen relative">

      {/* Navbar only for Home */}
      <Navbar />

      {/* PAGE HEADER OR HERO */}
      <section
        id="home-hero"
        className="h-screen flex flex-col items-center justify-center text-center px-6"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Coxdiack <span className="text-[#00FFA3]">Group</span>
        </h1>

        <p className="text-gray-300 max-w-2xl text-lg">
          Transforming brands through modern web design, strategy, and digital storytelling.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex gap-4 flex-wrap justify-center">
          <a
            href="/services"
            className="px-6 py-3 bg-[#00FFA3] text-[#071226] rounded-lg font-semibold hover:bg-[#00cc84] transition-all"
          >
            Explore Services
          </a>

          <a
            href="/portfolio"
            className="px-6 py-3 border border-[#00FFA3] rounded-lg hover:bg-[#11224E] transition-all"
          >
            View Portfolio
          </a>
        </div>
      </section>

      {/* Affiliate Highlights Section */}
      <AffiliateHighlights />

      {/* WhatsApp Floating Button */}
      <FloatingWhatsApp />
    </div>
  );
}
