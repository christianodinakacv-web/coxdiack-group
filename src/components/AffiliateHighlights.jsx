// src/components/AffiliateHighlights.jsx
import React from "react";
import { trackEvent } from "../utils/analytics"; // ✅ EXACT import path

export default function AffiliateHighlights() {
  return (
    <section className="py-24 px-6 text-center bg-[#08142E] border-t border-[#00FFA3]/20">
      
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Learn Skills That Actually <span className="text-[#00FFA3]">Pay</span>
      </h2>

      <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg">
        I’ve curated beginner-friendly tools, systems, and step-by-step learning paths
        to help you grow with AI, YouTube, and smart online income — without coding.
      </p>

      {/* Value bullets */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
        <div className="bg-[#10214F] p-5 rounded-lg">
          <p className="font-semibold text-[#00FFA3] mb-2">🤖 AI Tools</p>
          <p className="text-gray-300 text-sm">
            Content creation, automation, productivity & growth tools for beginners.
          </p>
        </div>

        <div className="bg-[#10214F] p-5 rounded-lg">
          <p className="font-semibold text-[#00FFA3] mb-2">🎥 YouTube Growth</p>
          <p className="text-gray-300 text-sm">
            Learn how to grow and monetize YouTube — even without showing your face.
          </p>
        </div>

        <div className="bg-[#10214F] p-5 rounded-lg">
          <p className="font-semibold text-[#00FFA3] mb-2">💰 Online Income</p>
          <p className="text-gray-300 text-sm">
            Ethical affiliate systems and digital skills that scale over time.
          </p>
        </div>
      </div>

      {/* CTA — TRACKED */}
      <a
        href="/learn"
        onClick={() =>
          trackEvent("Learn_CTA_Click", {
            source: "AffiliateHighlights",
          })
        }
        className="inline-block px-10 py-4 bg-[#00FFA3] text-[#071226] rounded-xl font-bold text-lg hover:bg-[#00cc84] transition-all"
      >
        Choose a Learning Path →
      </a>

      <p className="mt-6 text-xs text-gray-400 italic">
        Some resources may include affiliate links. No extra cost to you.
      </p>
    </section>
  );
}
