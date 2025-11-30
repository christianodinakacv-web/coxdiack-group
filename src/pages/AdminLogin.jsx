// src/pages/AdminLogin.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user) {
        // already logged in -> go to dashboard
        navigate("/admin/dashboard", { replace: true });
      }
    });
    return () => unsub();
  }, [navigate]);

  const handleLogin = async (e) => {
    e?.preventDefault?.();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      // onAuthStateChanged will redirect
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed: " + (err.message || err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1837] text-white flex items-center justify-center p-6 pt-28">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-[#10214F] p-6 rounded-xl shadow"
      >
        <h2 className="text-2xl font-bold text-[#00FFA3] mb-4">Admin Login</h2>

        <label className="block mb-2 text-sm text-gray-300">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 rounded-md bg-[#0A1837] text-white border border-gray-700 mb-4"
        />

        <label className="block mb-2 text-sm text-gray-300">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 rounded-md bg-[#0A1837] text-white border border-gray-700 mb-6"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#00FFA3] text-[#002B36] py-3 font-semibold rounded-md hover:opacity-95 transition"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
