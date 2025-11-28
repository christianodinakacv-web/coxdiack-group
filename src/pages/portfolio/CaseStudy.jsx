import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import portfolioData from "../../data/portfolioData";
import { motion } from "framer-motion";
import { FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";

export default function CaseStudy() {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = portfolioData.find((item) => item.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-2xl">
        ❌ Case Study Not Found
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0A1837] text-white p-6 md:p-12 pt-24"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#00FFA3] mb-6 hover:text-[#00cc84] transition"
      >
        <FaArrowLeft /> Back to Portfolio
      </button>

      {/* Header */}
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl font-bold mb-4 text-[#00FFA3]"
      >
        {project.title}
      </motion.h1>

      <p className="text-gray-300 text-lg max-w-3xl mb-8">
        {project.desc}
      </p>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {project.images.map((img, index) => (
          <motion.img
            key={index}
            src={img}
            alt={project.title}
            className="rounded-xl shadow-lg object-cover w-full"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          />
        ))}
      </div>

      {/* Sample Content Sections */}
      <div className="mt-14 space-y-8 max-w-4xl leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-[#00FFA3]">Project Overview</h2>
          <p className="mt-2 text-gray-300">
            This project focused on building a high-performance design with a
            premium user experience, brand consistency, and business conversion
            optimizations.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#00FFA3]">Deliverables</h3>
          <ul className="list-disc ml-6 text-gray-300">
            <li>Responsive Web Development</li>
            <li>Brand Design System</li>
            <li>Content & Creative Direction</li>
            <li>Business Optimization & Funnel Setup</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#00FFA3]">Results</h3>
          <p className="mt-2 text-gray-300">
            🚀 Higher engagement, better conversions, improved branding, and a
            cleaner digital presence.
          </p>
        </section>
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-12 bg-[#00FFA3] px-6 py-3 rounded-lg text-[#071226] text-center font-bold hover:bg-[#00c986] transition"
        >
          Visit Project <FaExternalLinkAlt className="inline-block ml-2" />
        </a>
      )}
    </motion.div>
  );
}
