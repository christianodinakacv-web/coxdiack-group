// src/auth/AuthProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged, getIdTokenResult } from "firebase/auth";

const AuthContext = createContext({
  user: null,
  loading: true,
  isAdmin: false,
  refreshClaims: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let mounted = true;

    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!mounted) return;

      if (!u) {
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setUser(u);

      try {
        const token = await getIdTokenResult(u, true);
        setIsAdmin(!!token.claims?.admin);
      } catch (err) {
        console.error("Failed to read admin claim:", err);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      unsub();
    };
  }, []);

  const refreshClaims = async () => {
    if (!auth.currentUser) return;

    try {
      await auth.currentUser.getIdToken(true);
      const token = await getIdTokenResult(auth.currentUser, true);
      setIsAdmin(!!token.claims?.admin);
    } catch (err) {
      console.error("Failed to refresh claims:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, refreshClaims }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
