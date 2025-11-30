import React, { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged, getIdTokenResult } from "firebase/auth";

export default function ProtectedRoute({ children }) {
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) return (window.location.href = "/admin/login");

      const token = await getIdTokenResult(user);

      if (token.claims.admin === true) {
        setAllowed(true);
      } else {
        alert("You are not authorized");
        auth.signOut();
        window.location.href = "/admin/login";
      }
    });
  }, []);

  if (allowed === null)
    return (
      <div className="text-center text-white mt-40 text-xl">Checking access…</div>
    );

  return <>{children}</>;
}
