import React, { useState } from "react";
import { motion } from "framer-motion";
import BackToHomeButton from "./BackToHomeButton";

export default function Feedback({ setActive = () => {}, setIsSidebarOpen = () => {} }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await fetch(
   "https://script.google.com/macros/s/AKfycbxol_wXja3zm6WjhHu58NUbwIGq59jXKPRbFxcOKbZ2Y3gfrVjxJ9TL3OFVn1LesVsjEg/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            source: "Feedback",
          }),
        }
      );

      setStatus("✅ Feedback successfully submitted!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("❌ Error sending feedback.");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="bg-[#0A1837] text-white min-h-screen py-16 px-6 md:px-20 flex flex-col items-center"
    >
      <h1 className="text-4xl font-bold text-[#00FFA3] mb-8 text-center">
        We Value Your Feedback 💬
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#11224E] p-8 rounded-2xl shadow-lg w-full max-w-lg"
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
          className="w-full py-3 bg-[#00FFA3] text-[#0A1837] font-semibold rounded-lg hover:bg-[#00cc84] transition-all"
        >
          Send Feedback
        </button>

        {status && <p className="mt-4 text-center text-gray-300">{status}</p>}
      </form>

      <BackToHomeButton setActive={setActive} setIsSidebarOpen={setIsSidebarOpen} />
    </motion.section>
  );
}
