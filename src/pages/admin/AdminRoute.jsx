// src/pages/admin/AdminRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      try {
        const tokenResult = await user.getIdTokenResult(true);
        setIsAdmin(!!(tokenResult?.claims?.admin));
      } catch (err) {
        console.error("Error reading token:", err);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  if (loading) return <div className="p-8 text-white">Checking access…</div>;
  if (!isAdmin) {
    // Not admin: sign out to clear any non-admin session and redirect to login
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
