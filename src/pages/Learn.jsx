// src/pages/Learn.jsx
import React from "react";

export default function Learn() {
  return (
    <div className="min-h-screen bg-[#0A1837] text-white pt-28 pb-20 px-6">

      {/* Page Header */}
      <section className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Learn & Build With <span className="text-[#00FFA3]">Coxdiack</span>
        </h1>

        <p className="text-gray-300 text-lg">
          Choose a learning path based on what you want to build.  
          Beginner-friendly. Practical. No coding required.
        </p>
      </section>

      {/* Funnel Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* AI Tools */}
        <div className="bg-[#10214F] p-8 rounded-xl border border-[#00FFA3]/30 hover:scale-[1.03] transition">
          <h2 className="text-2xl font-semibold text-[#00FFA3] mb-3">
            Learn AI Tools
          </h2>
          <p className="text-gray-300 mb-6">
            Discover beginner-friendly AI tools for content creation,
            productivity, automation, and online growth.
          </p>
          <a
            href="https://sites.google.com/view/coxdiack-digital-group/ai-profit-sniper"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-[#00FFA3] text-[#071226] py-3 rounded-lg font-semibold hover:bg-[#00cc84]"
          >
            Explore AI Tools
          </a>
        </div>

        {/* YouTube */}
        <div className="bg-[#10214F] p-8 rounded-xl border border-[#00FFA3]/30 hover:scale-[1.03] transition">
          <h2 className="text-2xl font-semibold text-[#00FFA3] mb-3">
            YouTube Mastery
          </h2>
          <p className="text-gray-300 mb-6">
            Learn how to start, grow, and monetize a YouTube channel —
            even without showing your face.
          </p>
          <a
            href="https://sites.google.com/view/coxdiack-digital-group/youtube-mastery"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-[#00FFA3] text-[#071226] py-3 rounded-lg font-semibold hover:bg-[#00cc84]"
          >
            Learn YouTube Growth
          </a>
        </div>

        {/* Online Income */}
        <div className="bg-[#10214F] p-8 rounded-xl border border-[#00FFA3]/30 hover:scale-[1.03] transition">
          <h2 className="text-2xl font-semibold text-[#00FFA3] mb-3">
            Smart Online Income
          </h2>
          <p className="text-gray-300 mb-6">
            Learn ethical affiliate marketing, digital products,
            and systems that generate income online.
          </p>
          <a
            href="https://www.digistore24.com/redir/361682/Coxdiack/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-[#00FFA3] text-[#071226] py-3 rounded-lg font-semibold hover:bg-[#00cc84]"
          >
            Start Building Income
          </a>
        </div>

      </div>
    </div>
  );
}
