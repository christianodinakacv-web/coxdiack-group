// src/pages/admin/Login.jsx
import React, { useState } from "react";
import { auth } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const { user, loading, refreshClaims } = useAuth();

  if (!loading && user) {
    navigate("/admin/dashboard");
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setBusy(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      await refreshClaims();
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      alert(err.message || "Login failed");
    }

    setBusy(false);
  };

  return (
    <div className="min-h-screen bg-[#0A1837] text-white pt-28 px-4">
      <div className="max-w-md mx-auto bg-[#10214F] p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-[#00FFA3] mb-4">Admin Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            required
            className="w-full p-3 rounded-md mb-3 bg-[#0A1837] border border-gray-700"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            required
            className="w-full p-3 rounded-md mb-4 bg-[#0A1837] border border-gray-700"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-[#00FFA3] text-[#002B36] py-2 rounded-md font-semibold"
          >
            {busy ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
