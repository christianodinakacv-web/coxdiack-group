/* src/pages/Testimonials.jsx */

import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { auth, db } from "../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

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

  // ==========================
  // GET REVIEWS FROM FIRESTORE
  // ==========================
  const fetchReviews = async () => {
    setFetching(true);

    try {
      const q = query(
        collection(db, "testimonials"),
        orderBy("createdAt", "desc") // newest first
      );

      const snap = await getDocs(q);

      const list = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReviews(list);
    } catch (err) {
      console.error("Fetch Firestore Error:", err);
    }

    setFetching(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // ==========================
  // SUBMIT REVIEW TO FIRESTORE
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !message.trim() || rating === 0) {
      alert("Please complete all required fields.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "testimonials"), {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        reaction: reaction.trim(),
        rating,
        approved: false, // admin will approve in dashboard later
        featured: false, // optional
        createdAt: serverTimestamp(),
      });

      // Reset form
      setName("");
      setEmail("");
      setMessage("");
      setRating(0);
      setReaction("");

      await fetchReviews();

      alert("Thank you! Your review has been submitted.");
    } catch (err) {
      console.error("Submit Firestore Error:", err);
      alert("Failed to submit review.");
    }

    setLoading(false);
  };

  // ==========================
  // RENDER UI
  // ==========================
  return (
    <div className="min-h-screen bg-[#0A1837] text-white pt-28 pb-20 px-6">
      <h1 className="text-4xl font-bold text-[#00FFA3] text-center mb-8">
        What People Are Saying
      </h1>

      {/* FORM */}
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

        {/* RATING */}
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

      {/* REVIEWS DISPLAY */}
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
                          (r.rating || 0) >= s
                            ? "text-yellow-400"
                            : "text-gray-500"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="text-xs text-gray-400">
                    {r.createdAt?.seconds
                      ? new Date(r.createdAt.seconds * 1000).toLocaleString()
                      : ""}
                  </div>
                </div>

                <p className="font-semibold">{r.name || "Anonymous"}</p>
                {r.email && (
                  <p className="text-sm text-gray-400">{r.email}</p>
                )}

                {r.reaction && (
                  <p className="text-sm text-[#00FFA3] mt-2">“{r.reaction}”</p>
                )}

                <p className="text-gray-300 mt-3">{r.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
