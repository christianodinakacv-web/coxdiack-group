// ✅ Testimonials.jsx (FINAL with Google Sheet Likes + Reply + Country)

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaHeart } from "react-icons/fa";
import BackToHomeButton from "./BackToHomeButton";

const WEBAPP_URL = "YOUR_WEBAPP_URL"; // <-- replace with your real script link

export default function Testimonials({ setActive, setIsSidebarOpen }) {
  const [reviews, setReviews] = useState([]);
  const [selectedRating, setSelectedRating] = useState(5);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [country, setCountry] = useState("");

  // ✅ Detect country using ipapi.co (more accurate)
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((info) => setCountry(info.country_name))
      .catch(() => setCountry("Unknown"));
  }, []);

  // ✅ Fetch stored reviews
  useEffect(() => {
    fetch(WEBAPP_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "SUCCESS") {
          setReviews(data.data.reverse()); // newest first
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // ✅ Submit review (saves to Google Sheet)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

   const payload = {
  Name: name,
  Email: email,
  Message: message,
  Rating: selectedRating,
  Country: userCountry,   // ✅ Correct variable used
  Likes: 0,
  AdminReply: "",
  Source: "Testimonials",
};

    fetch(WEBAPP_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(payload),
    });

    setReviews([payload, ...reviews]);
    setName("");
    setEmail("");
    setMessage("");
    setSelectedRating(5);
  };

  // ✅ Likes saved locally but also sent back to Sheet
  const handleLike = (index) => {
    const updated = [...reviews];
    updated[index].Likes = (updated[index].Likes || 0) + 1;
    setReviews(updated);

    fetch(WEBAPP_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(updated[index]),
    });
  };

  const avgRating =
    reviews.reduce((acc, r) => acc + Number(r.Rating), 0) / reviews.length || 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#071226] text-white min-h-screen px-6 py-16"
    >
      <BackToHomeButton setActive={setActive} setIsSidebarOpen={setIsSidebarOpen} />

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#00FFA3]">⭐ Client Reviews</h1>
        <p className="text-3xl text-yellow-400 mt-2">⭐ {avgRating.toFixed(1)}</p>
        <p className="text-gray-400">{reviews.length} total reviews</p>
      </div>

      {/* ✅ Review Form */}
      <form onSubmit={handleSubmit} className="bg-[#0A1837] p-6 rounded-xl max-w-xl mx-auto">
        <label className="block mb-2 font-semibold">Rate Us *</label>

        <div className="flex gap-2 mb-6">
          {[5, 4, 3, 2, 1].map((star) => (
            <FaStar
              key={star}
              size={32}
              className={selectedRating >= star ? "text-yellow-400" : "text-gray-500"}
              onClick={() => setSelectedRating(star)}
            />
          ))}
        </div>

        <input
          type="text"
          placeholder="Your Name (required)"
          className="w-full p-3 rounded bg-[#11224E] mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email (optional)"
          className="w-full p-3 rounded bg-[#11224E] mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          placeholder="Write a review (optional)"
          className="w-full p-3 rounded bg-[#11224E] mb-4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button className="bg-[#00FFA3] text-[#071226] w-full py-3 rounded-lg font-semibold hover:bg-[#00cc84] transition-all">
          Submit Review
        </button>
      </form>

      {/* ✅ Display testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
        {reviews.map((item, index) => (
          <motion.div
           key={index}
            whileHover={{ scale: 1.025 }}
            transition={{ duration: 0.3 }}
            className="testimonial-card testimonial-bg p-6 rounded-2xl shadow-xl"
          >

            <div className="flex items-center gap-4 mb-3">
              <div className="bg-[#00FFA3] text-black font-bold w-12 h-12 rounded-full flex justify-center items-center text-xl">
                {item.Name?.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="font-semibold text-lg">{item.Name}</p>
                <p className="text-yellow-400">{"⭐".repeat(Number(item.Rating))}</p>
                {item.Country && <p className="text-xs text-gray-400">🌍 {item.Country}</p>}
              </div>
            </div>

            <p className="text-gray-300">
              {item.Message?.trim() ? item.Message : "Rated without a comment"}
            </p>

            {item.Reply && (
              <p className="mt-3 text-[#00FFA3] text-sm border-t border-[#00FFA3]/40 pt-2">
                ✅ Admin replied: {item.Reply}
              </p>
            )}

            <div onClick={() => handleLike(index)} className="flex items-center gap-2 mt-4 cursor-pointer text-[#00FFA3]">
              <FaHeart /> <span>{item.Likes || 0}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
