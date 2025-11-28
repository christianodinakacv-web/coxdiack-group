// src/pages/Admin.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WEBAPP_URL =
  // put your Apps Script webapp URL here if you want to hardcode it:
  // "https://script.google.com/macros/s/AKfycbyduzhEQ4bj2p6w9ikDZNLc6CPbycwEx7R9hnBWfePbwwzigyhinnXYf-aesgoZs76DiA/exec";
  (process.env.REACT_APP_WEBAPP_URL || import.meta.env.VITE_WEBAPP_URL) || "";

const ADMIN_PASSWORD =
  (import.meta.env?.VITE_ADMIN_PASS || process.env.REACT_APP_ADMIN_PASS || "").trim() ||
  "CoxdiackAdmin2025"; // fallback only for local/dev — don't commit a secret.

export default function Admin() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [pwdInput, setPwdInput] = useState("");
  const [loading, setLoading] = useState(false);

  // testimonial form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // don't fetch reviews until authorized
    if (!authorized) return;
    loadReviews();
  }, [authorized]);

  const checkPassword = (e) => {
    e.preventDefault();
    if (pwdInput === ADMIN_PASSWORD) {
      setAuthorized(true);
      setPwdInput("");
    } else {
      alert("Incorrect password");
    }
  };

  const loadReviews = async () => {
    if (!WEBAPP_URL) return;
    try {
      const res = await fetch(WEBAPP_URL);
      const data = await res.json();
      if (Array.isArray(data)) setReviews(data.reverse());
    } catch (err) {
      console.error("Failed fetching reviews", err);
    }
  };

  const submitTestimonial = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Name is required");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("Name", name);
      formData.append("Email", email);
      formData.append("Message", message);
      formData.append("Rating", rating);
      formData.append("Country", "Admin");
      formData.append("Likes", 0);
      formData.append("Reply", "");

      await fetch(WEBAPP_URL, {
        method: "POST",
        body: formData,
      });

      // optimistic update
      setReviews((p) => [
        {
          Name: name,
          Email: email,
          Message: message,
          Rating,
          Country: "Admin",
          Likes: 0,
          Reply: "",
        },
        ...p,
      ]);

      setName("");
      setEmail("");
      setMessage("");
      setRating(5);
      alert("Testimonial submitted.");
    } catch (err) {
      console.error(err);
      alert("Failed to submit testimonial.");
    } finally {
      setLoading(false);
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#0A1837] text-white pt-24 px-6 flex items-center justify-center">
        <div className="bg-[#11224E] p-8 rounded-xl max-w-md w-full">
          <h2 className="text-xl font-semibold text-[#00FFA3] mb-4">Admin Login</h2>
          <form onSubmit={checkPassword}>
            <input
              value={pwdInput}
              onChange={(e) => setPwdInput(e.target.value)}
              type="password"
              placeholder="Enter admin password"
              className="w-full p-3 rounded bg-[#071226] mb-3"
              required
            />
            <div className="flex gap-2">
              <button className="bg-[#00FFA3] px-4 py-2 rounded text-[#071226]">Unlock</button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-4 py-2 rounded border"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Admin UI
  return (
    <div className="min-h-screen bg-[#0A1837] text-white pt-24 px-6 pb-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-[#00FFA3] mb-6">Admin — Testimonials</h1>

        <form onSubmit={submitTestimonial} className="bg-[#11224E] p-6 rounded-xl mb-6">
          <h3 className="font-semibold mb-3">Create Testimonial</h3>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full p-3 mb-3 rounded bg-[#071226]"
            required
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email (optional)"
            className="w-full p-3 mb-3 rounded bg-[#071226]"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            className="w-full p-3 mb-3 rounded bg-[#071226]"
            rows={4}
          />
          <div className="flex items-center gap-3 mb-3">
            <label className="text-sm">Rating</label>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="p-2 rounded bg-[#071226]">
              {[5,4,3,2,1].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="bg-[#00FFA3] px-4 py-2 rounded text-[#071226]">
              {loading ? "Sending..." : "Submit"}
            </button>
            <button type="button" onClick={() => { setName(""); setEmail(""); setMessage(""); setRating(5); }} className="px-4 py-2 rounded border">
              Reset
            </button>
          </div>
        </form>

        <h3 className="text-xl font-semibold mb-3">Recent Reviews (preview)</h3>
        <div className="space-y-3">
          {reviews.length === 0 && <p className="text-gray-400">No reviews yet.</p>}
          {reviews.map((r, i) => (
            <div key={i} className="bg-[#0B1736] p-3 rounded">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-white">{r.Name || r.name}</div>
                  <div className="text-sm text-gray-400">{r.Country}</div>
                </div>
                <div className="text-yellow-400">{'⭐'.repeat(Number(r.Rating || 0))}</div>
              </div>
              <p className="mt-2 text-gray-300">{r.Message || r.message}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-sm text-gray-300">
          <p>Note: This admin endpoint posts directly to your Google Apps Script WebApp. This is a lightweight solution; for production, consider protecting with a server-side token.</p>
        </div>
      </div>
    </div>
  );
}
