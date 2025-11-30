// src/components/Notifications.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function Notifications({ small = false }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // count reviews that are not approved yet
    const q = query(collection(db, "testimonials"), where("approved", "==", false));
    const unsub = onSnapshot(q, (snap) => {
      setCount(snap.size);
    }, (err) => console.error(err));

    return () => unsub();
  }, []);

  if (small) {
    return count ? <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded">{count}</span> : null;
  }

  return (
    <div className="relative">
      <button className="px-3 py-2 rounded bg-[#10214F] hover:bg-[#0f2a56]">
        Notifications
      </button>
      {count > 0 && (
        <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
          {count}
        </div>
      )}
    </div>
  );
}
