import React, { useState } from "react";
import { motion } from "framer-motion";
import BackToHomeButton from "./BackToHomeButton";

export default function Ratings({ setActive, setIsSidebarOpen }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
  await fetch(
   "https://script.google.com/macros/s/AKfycbxol_wXja3zm6WjhHu58NUbwIGq59jXKPRbFxcOKbZ2Y3gfrVjxJ9TL3OFVn1LesVsjEg/exec",
    {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        rating,
        source: "Ratings",
      }),
    }
  );

  setStatus("✅ Rating submitted successfully!");
  setName("");
  setRating(0);
} catch (error) {
  console.error(error);
  setStatus("❌ Error sending rating.");
}

  }; // ✅ <-- this closing brace was missing!

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="bg-[#0A1837] text-white min-h-screen flex flex-col items-center justify-center px-6"
    >
      <h1 className="text-4xl text-[#00FFA3] font-bold mb-6">
        Rate Your Experience ⭐
      </h1>

      <form onSubmit={handleSubmit} className="bg-[#11224E] p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full mb-4 p-3 rounded-lg bg-[#0A1837] text-white border border-[#00FFA3]/40"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="flex justify-center gap-2 mb-4 text-3xl">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer ${rating >= star ? "text-yellow-400" : "text-gray-500"}`}
            >
              ★
            </span>
          ))}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#00FFA3] text-[#071226] font-semibold rounded-lg hover:bg-[#00cc84] transition-all"
        >
          Submit Rating
        </button>

        {status && <p className="text-center mt-4">{status}</p>}
      </form>

      <BackToHomeButton setActive={setActive} setIsSidebarOpen={setIsSidebarOpen} />
    </motion.section>
  );
}
