/* src/pages/Testimonials.jsx */

import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

/**
 * Testimonials Page
 * Works with Google Apps Script WebApp using URL-encoded POST
 *
 * Sheet Headers:
 * Timestamp | Name | Email | Message | Rating | Reaction
 */

// YOUR FINAL VERIFIED WORKING WEBAPP URL:
const WEBAPP_URL =
  import.meta.env?.VITE_WEBAPP_URL ||
  process.env.REACT_APP_WEBAPP_URL ||
  "https://script.google.com/macros/s/AKfycbztIXS2RSDTShX-ZGpW1x4cXEvp_LjAgkYX17hX-dtCGnerrl9Oxlvkk4kxjoV-ZbX_2g/exec";

export default function Testimonials() {
  useEffect(() => {
    document.title = "Testimonials | Coxdiack Group";
  }, []);

  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [reaction, setReaction] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const isAdmin =
    typeof window !== "undefined" &&
    window.localStorage.getItem("isAdmin") === "true";

  // ======================================
  // GET REVIEWS
  // ======================================
  const fetchReviews = async () => {
    setFetching(true);

    try {
      const resp = await fetch(WEBAPP_URL + "?mode=read", {
        cache: "no-cache",
      });

      const text = await resp.text();
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = null;
      }

      let data = [];
      if (parsed) {
        if (Array.isArray(parsed)) data = parsed;
        else if (parsed.data) data = parsed.data;
      }

      // Normalize row objects
      const normalized = data
        .map((row) => {
          if (typeof row !== "object" || Array.isArray(row)) return null;

          return {
            Timestamp: row.Timestamp || "",
            Name: row.Name || "",
            Email: row.Email || "",
            Message: row.Message || "",
            Rating: Number(row.Rating || 0),
            Reaction: row.Reaction || "",
          };
        })
        .filter(Boolean);

      // Newest first
      normalized.sort((a, b) => {
        const ta = new Date(a.Timestamp).getTime() || 0;
        const tb = new Date(b.Timestamp).getTime() || 0;
        return tb - ta;
      });

      setReviews(normalized);
    } catch (err) {
      console.error("Fetch error:", err);
    }

    setFetching(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // ======================================
  // SUBMIT REVIEW (WORKING VERSION)
  // ======================================
 const handleSubmit = async (e) => {
  e?.preventDefault?.();

  if (!name.trim() || !message.trim() || rating === 0) {
    alert("Please enter your name, message, and rating.");
    return;
  }

  setLoading(true);

  try {
    const formData = new URLSearchParams({
      name: name.trim(),
      email: (email || "").trim(),
      message: message.trim(),
      rating: String(rating),
      reaction: (reaction || "").trim(),
    });

    const resp = await fetch(WEBAPP_URL, {
      method: "POST",
      body: formData,   // ❗ NO HEADERS HERE
    });

    console.log("Submit response:", await resp.text());

      // Reset fields
      setName("");
      setEmail("");
      setMessage("");
      setRating(0);
      setReaction("");

      await fetchReviews();
      alert("Thanks — your review has been submitted!");
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to submit review.");
    }

    setLoading(false);
  };

  // ======================================
  // JSX RENDER
  // ======================================
  return (
    <div className="min-h-screen bg-[#0A1837] text-white pt-28 pb-20 px-6">
      <h1 className="text-4xl font-bold text-[#00FFA3] text-center mb-8">
        What People Are Saying
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-[#10214F] p-6 rounded-xl shadow-lg mb-12"
      >
        <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-md bg-[#0A1837] text-white border border-gray-700 mb-3"
          required
        />

        <input
          type="email"
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-md bg-[#0A1837] text-white border border-gray-700 mb-3"
        />

        {/* Rating */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={28}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(null)}
                onClick={() => setRating(star)}
                className={`cursor-pointer transition ${
                  (hover || rating) >= star
                    ? "text-yellow-400"
                    : "text-gray-500"
                }`}
              />
            ))}
          </div>
          <span className="text-gray-300">
            {rating > 0 ? `${rating}/5` : "Choose rating"}
          </span>
        </div>

        <textarea
          rows="4"
          placeholder="Write your review..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 rounded-md bg-[#0A1837] text-white border border-gray-700 mb-3"
          required
        />

        <input
          type="text"
          placeholder="Reaction (optional)"
          value={reaction}
          onChange={(e) => setReaction(e.target.value)}
          className="w-full p-3 rounded-md bg-[#0A1837] text-white border border-gray-700 mb-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#00FFA3] text-[#002B36] py-3 font-semibold rounded-md hover:opacity-95 transition"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      {/* Reviews */}
      <div className="max-w-5xl mx-auto">
        {fetching ? (
          <p className="text-center text-gray-400">Loading reviews…</p>
        ) : reviews.length === 0 ? (
          <p className="text-center text-gray-400">No reviews yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="bg-[#10214F] p-5 rounded-xl border border-gray-700 shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <FaStar
                        key={s}
                        size={16}
                        className={`${
                          (r.Rating || 0) >= s
                            ? "text-yellow-400"
                            : "text-gray-500"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="text-xs text-gray-400">
                    {r.Timestamp
                      ? new Date(r.Timestamp).toLocaleString()
                      : ""}
                  </div>
                </div>

                <p className="font-semibold">{r.Name || "Anonymous"}</p>
                {r.Email && (
                  <p className="text-sm text-gray-400">{r.Email}</p>
                )}

                {r.Reaction && (
                  <p className="text-sm text-[#00FFA3] mt-2">“{r.Reaction}”</p>
                )}

                <p className="text-gray-300 mt-3">{r.Message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
