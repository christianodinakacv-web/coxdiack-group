import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Save login flag to check custom claims later
      localStorage.setItem("adminLogin", "true");
      window.location.href = "/admin/dashboard";
    } catch (err) {
      alert("Invalid admin login");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A1837]">
      <form
        onSubmit={handleLogin}
        className="bg-[#10214F] p-8 rounded-xl w-full max-w-sm text-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#00FFA3]">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Admin Email"
          className="w-full p-3 bg-[#0A1837] rounded mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-[#0A1837] rounded mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded bg-[#00FFA3] text-black font-semibold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
