import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Share } from "lucide-react";
import portfolioData from "../data/portfolioData";

export default function PortfolioDetail() {
const { id } = useParams();
const navigate = useNavigate();
const [currentIndex, setCurrentIndex] = useState(0);
const [unlocked, setUnlocked] = useState(false);
const [passInput, setPassInput] = useState("");

const project = portfolioData.find((p) => p.id === id);

// Redirect if not found
if (!project) {
return ( <div className="min-h-screen bg-[#0A1837] text-white flex items-center justify-center"> <p className="text-xl text-red-400">❌ Case Study Not Found</p> </div>
);
}

// ===============================
// PRIVATE / GATED PORTFOLIO
// ===============================
const PASS = "Cox2025";

const handleUnlock = () => {
if (passInput.trim() === PASS) {
setUnlocked(true);
} else {
alert("Incorrect password");
}
};

if (project.private && !unlocked) {
return ( <div className="min-h-screen bg-[#0A1837] text-white flex flex-col items-center justify-center p-6"> <h2 className="text-2xl font-bold mb-4 text-[#00FFA3]">
🔐 Private Case Study </h2> <p className="text-gray-300 mb-4 text-center">
This portfolio entry is private and requires a passcode. </p>

    <input
      type="password"
      placeholder="Enter passcode"
      value={passInput}
      onChange={(e) => setPassInput(e.target.value)}
      className="p-3 rounded bg-[#11224E] border border-[#00FFA3]/40 text-white w-64 mb-3 text-center"
    />

    <button
      onClick={handleUnlock}
      className="px-6 py-2 bg-[#00FFA3] text-[#002b36] font-semibold rounded hover:bg-[#00cc84]"
    >
      Unlock Case Study
    </button>
  </div>
);

}

// Navigation gestures
const nextImage = () =>
setCurrentIndex((prev) => (prev + 1) % project.images.length);

const prevImage = () =>
setCurrentIndex((prev) => (prev - 1 + project.images.length) % project.images.length);

// ===============================
// SHARE BUTTON HANDLERS
// ===============================
const pageUrl = window.location.href;

const shareLinks = {
facebook: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}`,
linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(pageUrl)}`,
};

const copyLink = () => {
navigator.clipboard.writeText(pageUrl);
alert("Link copied to clipboard");
};

return (
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
className="min-h-screen bg-[#0A1837] text-white p-6 pt-24"
>
{/* Back Button */}
<button
onClick={() => navigate("/portfolio")}
className="mb-6 flex items-center gap-2 bg-[#00FFA3] text-[#002b36] px-4 py-2 rounded-full hover:bg-[#00cc84] transition-all duration-300 shadow-md"
> <ArrowLeft className="w-5 h-5" />
Back to Portfolio </button>

  {/* Wrapper */}
  <div className="max-w-5xl mx-auto space-y-10">

    {/* ========================= IMAGE GALLERY ========================= */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#11224E] rounded-xl border border-[#00FFA3]/30 p-6"
    >
      <div className="relative flex items-center justify-center min-h-[250px] md:min-h-[450px]">
        <motion.img
          key={currentIndex}
          src={project.images[currentIndex]}
          alt={project.title}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="rounded-lg max-h-[450px] w-full object-contain border border-[#00FFA3]/20"
        />

        {project.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#00FFA3]/10 hover:bg-[#00FFA3]/30 text-[#00FFA3] p-2 rounded-full"
            >
              ‹
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#00FFA3]/10 hover:bg-[#00FFA3]/30 text-[#00FFA3] p-2 rounded-full"
            >
              ›
            </button>
          </>
        )}
      </div>
    </motion.div>

    {/* ========================= TITLE ========================= */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <h1 className="text-4xl font-bold text-[#00FFA3] mb-2">
        {project.title}
      </h1>
      <p className="text-gray-300 text-lg font-medium">
        {project.category}
      </p>
    </motion.div>

    {/* ========================= CHALLENGE ========================= */}
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <h3 className="text-xl font-semibold text-[#00FFA3] mb-2">
        The Challenge
      </h3>
      <p className="text-gray-300 leading-relaxed">{project.challenge}</p>
    </motion.div>

    {/* ========================= SOLUTION ========================= */}
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <h3 className="text-xl font-semibold text-[#00FFA3] mb-2">
        Our Approach & Solution
      </h3>
      <p className="text-gray-300 leading-relaxed">{project.solution}</p>
    </motion.div>

    {/* ========================= RESULTS ========================= */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h3 className="text-xl font-semibold text-[#00FFA3] mb-2">
        Results & Outcomes
      </h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-300">
        {project.results.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </motion.div>

    {/* ========================= SHARE BOX ========================= */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex flex-wrap items-center gap-4 justify-center border-t border-[#11224E] pt-6"
    >
      <span className="text-gray-400 flex items-center gap-2">
        <Share size={18} /> Share this project:
      </span>

      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noreferrer"
        className="text-[#00FFA3] hover:underline"
      >
        Facebook
      </a>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noreferrer"
        className="text-[#00FFA3] hover:underline"
      >
        X / Twitter
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noreferrer"
        className="text-[#00FFA3] hover:underline"
      >
        LinkedIn
      </a>
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="text-[#00FFA3] hover:underline"
      >
        WhatsApp
      </a>

      <button onClick={copyLink} className="text-[#00FFA3] hover:underline">
        Copy Link
      </button>
    </motion.div>

    {/* CTA */}
    <div className="text-center">
      <button
        onClick={() => navigate("/contact")}
        className="bg-[#00FFA3] text-[#002b36] px-6 py-3 rounded-full font-semibold hover:bg-[#00cc84] shadow-md transition-all"
      >
        Start a Project With Us
      </button>
    </div>
  </div>
</motion.div>

);
}
