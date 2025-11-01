import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // 👈 Twitter/X icon
import BackToHomeButton from "./BackToHomeButton";

export default function Contact({ setActive = () => {}, setIsSidebarOpen = () => {} }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit data to Google Sheets
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbzWXfPc8UoQzdnhS4GRSJUNaTQZfVsABemXExfe3aYsuICKQrMVvHQmHjNsIb5CUl5s/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            source: "Contact",
          }),
        }
      );

      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("❌ Error sending message.");
      console.error("CONTACT ERROR:", err);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="bg-[#0A1837] min-h-screen flex flex-col items-center py-16 px-6 text-white"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-[#00FFA3] mb-10 text-center">
        Contact Us ✉️
      </h1>

      {/* ✅ FORM SECTION */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#11224E] w-full max-w-lg px-8 py-8 rounded-2xl shadow-lg"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-lg bg-[#0A1837] text-white border border-[#00FFA3]/40"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-lg bg-[#0A1837] text-white border border-[#00FFA3]/40"
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-lg bg-[#0A1837] text-white border border-[#00FFA3]/40"
          required
        ></textarea>

        <button
          type="submit"
          className="w-full py-3 bg-[#00FFA3] text-[#071226] font-semibold rounded-lg hover:bg-[#00cc84] transition-all"
        >
          Send Message
        </button>

        {status && <p className="mt-4 text-center">{status}</p>}
      </form>

      {/* ✅ MODERN CONTACT CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14">
        {/* EMAIL */}
        <Card
          href="mailto:contactcoxdiack@gmail.com"
          label="Email"
          icon={<FaEnvelope size={32} />}
        />

        {/* WHATSAPP */}
        <Card
          href="https://wa.me/639166975338"
          label="WhatsApp"
          icon={<FaWhatsapp size={32} />}
        />

        {/* FACEBOOK */}
        <Card
          href="https://www.facebook.com/Coxdiacklifestyle"
          label="Facebook"
          icon={<FaFacebook size={32} />}
        />

        {/* X / TWITTER */}
        <Card
          href="https://x.com/CoxdiackGroup"
          label="Twitter / X"
          icon={<FaXTwitter size={32} />}
        />
      </div>

      <BackToHomeButton setActive={setActive} setIsSidebarOpen={setIsSidebarOpen} />
    </motion.section>
  );
}

/* ---- Card Component ---- */
function Card({ href, icon, label }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.09 }}
      className="bg-[#11224E]/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg flex flex-col items-center gap-3 hover:bg-[#00FFA3] hover:text-[#071226] transition-all"
    >
      {icon}
      <span className="font-semibold">{label}</span>
    </motion.a>
  );
}
