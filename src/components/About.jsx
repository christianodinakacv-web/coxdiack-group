// src/components/About.jsx
import React from "react";
import { motion } from "framer-motion";
import BackToHomeButton from "./BackToHomeButton";

export default function About({ setActive, setIsSidebarOpen }) {
  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={fadeIn}
      transition={{ duration: 0.6 }}
      className="bg-[#0A1837] text-white min-h-screen py-16 px-6 md:px-20"
    >
      {/* HEADER */}
      <h1 className="text-4xl font-bold text-center mb-10">
        About <span className="text-[#00FFA3]">Coxdiack Group</span>
      </h1>

      {/* INTRO PARAGRAPH */}
      <motion.p
        variants={fadeIn}
        className="text-gray-300 max-w-4xl mx-auto text-lg leading-relaxed text-center"
      >
        Coxdiack Group is a digital creative studio focused on transforming brands
        into compelling digital experiences. We blend aesthetics, strategy, and
        innovation to help individuals, startups, and companies grow online with
        modern and result-oriented solutions.
      </motion.p>

      {/* SERVICES SECTION */}
      <div className="mt-14 space-y-12 max-w-5xl mx-auto">

        {/* WEB DESIGN */}
        <motion.div variants={fadeIn} className="bg-[#11224E] p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold text-[#00FFA3] mb-4">
            ✅ Website Design & Development
          </h2>
          <p className="text-gray-300 leading-relaxed">
            We design websites that don’t just “look good,” but *work smart*.
            Every website we create blends responsive layout, clean UI, and
            optimized user experience to convert visitors into customers.
            Whether you're building a portfolio, business site, or online store,
            we turn your digital presence into a powerful asset.
          </p>
        </motion.div>

        {/* BRAND MEDIA + STORY TELLING */}
        <motion.div variants={fadeIn} className="bg-[#11224E] p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold text-[#00FFA3] mb-4">
            ✅ Brand Media & Digital Storytelling
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Your story matters. People don’t remember logos — they remember
            emotions. We design visuals and create storytelling strategies that
            make your audience *feel connected* to your brand.
            <br />
            From brand identity design to social content creation, our goal is to
            make your brand unforgettable.
          </p>
        </motion.div>

        {/* DIGITAL STRATEGY + GROWTH */}
        <motion.div variants={fadeIn} className="bg-[#11224E] p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold text-[#00FFA3] mb-4">
            ✅ Digital Strategy & Growth
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Strategy drives results. We don’t just design your brand — we build
            a roadmap for growth. From social media planning to content marketing
            to analytics, we help you grow your audience and convert engagement
            into revenue.
          </p>
        </motion.div>

      </div>

      {/* CTA SECTION */}
      <motion.div variants={fadeIn} className="text-center mt-16">
        <h2 className="text-2xl font-bold text-[#00FFA3] mb-3">
          Let’s Build Something Exceptional.
        </h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">
          Ready to start your project? Let’s talk about your business goals and
          make your brand stand out in the digital space.
        </p>

        <button
          onClick={() => {
            setActive("contact");
            setIsSidebarOpen(false);
          }}
          className="bg-[#00FFA3] text-[#071226] px-6 py-3 rounded-lg font-semibold hover:bg-[#00cc84] transition-all"
        >
          Contact Us
        </button>
      </motion.div>

      {/* Return Home Button */}
      <div className="mt-10">
        <BackToHomeButton setActive={setActive} setIsSidebarOpen={setIsSidebarOpen} />
      </div>
    </motion.section>
  );
}
