// src/pages/admin/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  where,
  getDocs,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";

export default function AdminDashboard() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCount, setNewCount] = useState(0);

  useEffect(() => {
    // real-time listener: newest first
    const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setReviews(list);

        // unread count: reviews that are !approved
        const unread = list.filter((r) => !r.approved).length;
        setNewCount(unread);

        setLoading(false);
      },
      (err) => {
        console.error("Snapshot error:", err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  const toggleApprove = async (id, current) => {
    try {
      await updateDoc(doc(db, "testimonials", id), { approved: !current });
    } catch (err) {
      console.error(err);
      alert("Failed to change approval.");
    }
  };

  const toggleFeature = async (id, current) => {
    try {
      await updateDoc(doc(db, "testimonials", id), { featured: !current });
    } catch (err) {
      console.error(err);
      alert("Failed to toggle featured.");
    }
  };

  const removeReview = async (id) => {
    if (!confirm("Delete this review permanently?")) return;
    try {
      await deleteDoc(doc(db, "testimonials", id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete.");
    }
  };

  return (
    <div className="min-h-screen bg-[#071229] text-white p-6 pt-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-[#00FFA3]">Admin Dashboard</h1>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-300">New reviews: <span className="text-[#00FFA3] font-semibold">{newCount}</span></div>
            <button
              onClick={() => signOut(auth)}
              className="px-3 py-2 bg-[#FF6B6B] rounded-md text-black font-semibold"
            >
              Sign out
            </button>
          </div>
        </div>

        {loading ? (
          <div>Loading reviews…</div>
        ) : reviews.length === 0 ? (
          <div className="text-gray-400">No reviews yet.</div>
        ) : (
          <div className="space-y-4">
            {reviews.map((r) => (
              <div key={r.id} className="bg-[#10214F] p-4 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="text-xl font-semibold">{r.name || "Anonymous"}</div>
                    <div className="text-sm text-gray-400">{r.email}</div>
                    <div className="ml-4 text-sm text-gray-300">{r.rating}/5</div>
                    <div className="text-xs text-gray-400 ml-4">{r.createdAt?.seconds ? new Date(r.createdAt.seconds * 1000).toLocaleString() : ""}</div>
                  </div>
                  {r.reaction && <div className="text-[#00FFA3] mt-1">“{r.reaction}”</div>}
                  <p className="mt-2 text-gray-300">{r.message}</p>
                </div>

                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => toggleApprove(r.id, !!r.approved)}
                    className={`px-3 py-2 rounded-md font-semibold ${r.approved ? "bg-[#00cc84] text-black" : "bg-[#FFD166] text-black"}`}
                    title={r.approved ? "Unapprove" : "Approve"}
                  >
                    {r.approved ? "Approved" : "Approve"}
                  </button>

                  <button
                    onClick={() => toggleFeature(r.id, !!r.featured)}
                    className={`px-3 py-2 rounded-md font-semibold ${r.featured ? "bg-[#00FFA3] text-black" : "bg-[#7f8c8d] text-white"}`}
                    title={r.featured ? "Unfeature" : "Feature"}
                  >
                    {r.featured ? "Featured" : "Feature"}
                  </button>

                  <button
                    onClick={() => removeReview(r.id)}
                    className="px-3 py-2 rounded-md bg-[#FF6B6B] text-black font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
