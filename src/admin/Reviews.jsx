// src/admin/Reviews.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from "firebase/firestore";
import ProtectedRoute from "../components/ProtectedRoute";
import { FaThumbsUp, FaTrash, FaCheck, FaStar } from "react-icons/fa";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const rows = [];
      snap.forEach((d) => rows.push({ id: d.id, ...d.data() }));
      setReviews(rows);
    }, (err) => {
      console.error("Snapshot error:", err);
    });

    return () => unsub();
  }, []);

  const approve = async (id) => {
    setBusyId(id);
    try {
      await updateDoc(doc(db, "testimonials", id), {
        approved: true,
        moderatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error(err);
      alert("Failed to approve");
    }
    setBusyId(null);
  };

  const unapprove = async (id) => {
    setBusyId(id);
    try {
      await updateDoc(doc(db, "testimonials", id), { approved: false });
    } catch (err) {
      console.error(err);
      alert("Failed to update");
    }
    setBusyId(null);
  };

  const toggleFeatured = async (id, current) => {
    setBusyId(id);
    try {
      await updateDoc(doc(db, "testimonials", id), { featured: !current });
    } catch (err) {
      console.error(err);
      alert("Error toggling featured");
    }
    setBusyId(null);
  };

  const remove = async (id) => {
    if (!confirm("Delete this review? This cannot be undone.")) return;
    setBusyId(id);
    try {
      await deleteDoc(doc(db, "testimonials", id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
    setBusyId(null);
  };

  return (
    <ProtectedRoute>
      <div className="bg-[#071226] p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-[#00FFA3] mb-4">Reviews</h2>

        <div className="grid gap-4">
          {reviews.length === 0 ? (
            <div className="text-gray-400">No reviews yet.</div>
          ) : (
            reviews.map((r) => (
              <div key={r.id} className="bg-[#0F274F] p-4 rounded-lg border border-[#0f2a56]">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="font-semibold">{r.name || "Anonymous"}</p>
                      <div className="text-xs text-gray-300">
                        {r.email || ""}
                      </div>
                      <div className="ml-4 text-sm text-gray-400">{r.rating ? `${r.rating}/5` : ""}</div>
                      {r.featured && <span className="ml-2 px-2 py-1 bg-yellow-500 text-black rounded text-xs">Featured</span>}
                    </div>

                    {r.reaction && <div className="text-[#00FFA3] mt-2">“{r.reaction}”</div>}

                    <p className="text-gray-200 mt-3">{r.message}</p>

                    <div className="text-xs text-gray-400 mt-2">
                      {r.createdAt?.toDate ? r.createdAt.toDate().toLocaleString() : (r.createdAt || "")}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {r.approved ? (
                      <button
                        onClick={() => unapprove(r.id)}
                        disabled={busyId === r.id}
                        className="px-3 py-2 rounded bg-[#11224E] hover:bg-[#0f2a56]"
                        title="Unapprove"
                      >
                        <FaCheck /> Unapprove
                      </button>
                    ) : (
                      <button
                        onClick={() => approve(r.id)}
                        disabled={busyId === r.id}
                        className="px-3 py-2 rounded bg-[#00FFA3] text-[#071226] font-semibold hover:opacity-90"
                        title="Approve"
                      >
                        <FaCheck /> Approve
                      </button>
                    )}

                    <button
                      onClick={() => toggleFeatured(r.id, !!r.featured)}
                      disabled={busyId === r.id}
                      className="px-3 py-2 rounded bg-[#11224E] hover:bg-[#0f2a56]"
                      title="Toggle featured"
                    >
                      <FaStar /> {r.featured ? "Unfeature" : "Feature"}
                    </button>

                    <button
                      onClick={() => remove(r.id)}
                      disabled={busyId === r.id}
                      className="px-3 py-2 rounded bg-[#FF4D4F] hover:opacity-90 text-white"
                      title="Delete"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
