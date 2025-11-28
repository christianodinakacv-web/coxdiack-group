import React from "react";
import { Link } from "react-router-dom";

export default function About() {
return ( <div className="bg-[#0A1837] text-white min-h-screen py-16 px-6 md:px-20">

  {/* PAGE TITLE */}
  <h1 className="text-4xl font-bold text-center mb-10">
    About <span className="text-[#00FFA3]">Coxdiack Group</span>
  </h1>

  {/* INTRO TEXT */}
  <p className="text-gray-300 max-w-4xl mx-auto text-lg leading-relaxed text-center">
    Coxdiack Group is a digital creative studio focused on transforming 
    brands into compelling digital experiences. We blend aesthetics, 
    strategy, and innovation to help individuals, startups, and companies 
    grow online with modern, results-oriented solutions.
  </p>

  {/* SERVICES SECTIONS */}
  <div className="mt-14 space-y-12 max-w-5xl mx-auto">

    {/* Web Development */}
    <div className="bg-[#11224E] p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-semibold text-[#00FFA3] mb-4">
        ✅ Website Design & Development
      </h2>
      <p className="text-gray-300 leading-relaxed">
        We design high-conversion websites with modern UX principles, 
        responsive layouts, and optimized user flows that turn visitors 
        into customers.
      </p>
    </div>

    {/* Branding */}
    <div className="bg-[#11224E] p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-semibold text-[#00FFA3] mb-4">
        ✅ Brand Media & Digital Storytelling
      </h2>
      <p className="text-gray-300 leading-relaxed">
        People remember stories — not just logos. We build brand emotion 
        and connection through creative visuals, messaging, and digital 
        media that resonate and strengthen brand identity.
      </p>
    </div>

    {/* Digital Strategy */}
    <div className="bg-[#11224E] p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-semibold text-[#00FFA3] mb-4">
        ✅ Digital Strategy & Growth
      </h2>
      <p className="text-gray-300 leading-relaxed">
        We build growth roadmaps with content planning, digital marketing, 
        analytics, and conversion strategies that move brands forward.
      </p>
    </div>

  </div>

  {/* CTA SECTION */}
  <div className="text-center mt-16">
    <h2 className="text-2xl font-bold text-[#00FFA3] mb-3">
      Let’s Build Something Exceptional.
    </h2>

    <p className="text-gray-300 mb-6 max-w-xl mx-auto">
      Ready to start your project? Let’s talk about your business goals 
      and build something outstanding.
    </p>

    <Link
      to="/contact"
      className="bg-[#00FFA3] text-[#071226] px-6 py-3 rounded-lg font-semibold hover:bg-[#00cc84] transition-all"
    >
      Contact Us
    </Link>

    {/* Back home */}
    <div className="mt-10">
      <Link
        to="/"
        className="inline-block px-6 py-2 bg-[#11224E] rounded-lg hover:bg-[#0F2A56] transition-all"
      >
        ← Return to Home
      </Link>
    </div>
  </div>
</div>

);
}
