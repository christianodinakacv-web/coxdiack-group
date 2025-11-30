// src/pages/admin/Login.jsx
import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If already signed in, try to go to admin dashboard
        navigate("/admin");
      }
    });
    return () => unsub();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      // Router will navigate via onAuthStateChanged
    } catch (err) {
      console.error(err);
      alert("Failed to sign in. Check credentials.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1837] text-white pt-28 px-4">
      <div className="max-w-md mx-auto bg-[#10214F] p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-[#00FFA3] mb-4">
          Admin Sign In
        </h2>

        <form onSubmit={handleLogin}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md mb-3 bg-[#0A1837] border border-gray-700"
            required
            type="email"
          />
          <input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md mb-4 bg-[#0A1837] border border-gray-700"
            required
            type="password"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={busy}
              className="flex-1 bg-[#00FFA3] text-[#002B36] py-2 rounded-md font-semibold"
            >
              {busy ? "Signing in…" : "Sign in"}
            </button>

            <button
              type="button"
              onClick={async () => {
                await signOut(auth);
                setEmail("");
                setPassword("");
              }}
              className="px-4 py-2 rounded-md border border-[#00FFA3]"
            >
              Sign out
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
