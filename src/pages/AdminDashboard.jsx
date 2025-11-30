// src/pages/AdminDashboard.jsx
import React, { useEffect, useState, useRef } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  addDoc
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminDashboard() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const seenIdsRef = useRef(new Set());

  useEffect(() => {
    const q = query(
      collection(db, "testimonials"),
      orderBy("timestamp", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const docs = [];
      snap.forEach((d) => {
        docs.push({ id: d.id, ...d.data() });
      });
      setReviews(docs);
      setLoading(false);

      // notifications for newly added documents (docChanges)
      snap.docChanges().forEach((change) => {
        if (change.type === "added") {
          const id = change.doc.id;
          // avoid notifying for initial load
          if (!seenIdsRef.current.has(id)) {
            // notify
            const data = change.doc.data();
            toast.info(`New review: ${data.name || "Anonymous"} — ${data.rating || "?"}/5`);
            seenIdsRef.current.add(id);
          }
        }
      });
    });

    return () => unsub();
  }, []);

  // Approve / Unapprove
  const toggleApprove = async (id, current) => {
    try {
      await updateDoc(doc(db, "testimonials", id), { approved: !current });
      toast.success(!current ? "Approved" : "Unapproved");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update");
    }
  };

  const toggleSpam = async (id, current) => {
    try {
      await updateDoc(doc(db, "testimonials", id), { spam: !current });
      toast.info(!current ? "Marked as spam" : "Unmarked spam");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update");
    }
  };

  const removeReview = async (id) => {
    if (!confirm("Delete this review? This action cannot be undone.")) return;
    try {
      await deleteDoc(doc(db, "testimonials", id));
      toast.success("Deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    // redirect handled by ProtectedRoute -> AdminLogin
  };

  return (
    <div className="min-h-screen bg-[#0A1837] text-white p-6 pt-24">
      <ToastContainer position="top-right" />
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#00FFA3]">Admin Dashboard</h1>
          <div className="flex gap-3">
            <button onClick={handleSignOut} className="px-4 py-2 bg-[#11224E] rounded">Sign out</button>
          </div>
        </div>

        <div className="bg-[#10214F] p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Reviews</h2>

          {loading ? (
            <p className="text-gray-400">Loading…</p>
          ) : reviews.length === 0 ? (
            <p className="text-gray-400">No reviews yet.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((r) => (
                <div key={r.id} className="p-4 bg-[#0A1837] rounded-lg border border-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="font-semibold">{r.name || "Anonymous"}</div>
                      <div className="text-sm text-gray-400">{r.email}</div>
                      <div className="text-sm text-gray-300 ml-2"> {r.rating ? `${r.rating}/5` : ""}</div>
                      {r.approved ? <span className="ml-2 text-xs bg-green-700 px-2 py-1 rounded">Approved</span> : <span className="ml-2 text-xs bg-yellow-700 px-2 py-1 rounded">Pending</span>}
                      {r.spam ? <span className="ml-2 text-xs bg-red-700 px-2 py-1 rounded">Spam</span> : null}
                    </div>
                    <div className="text-gray-300 mt-2">{r.message}</div>
                    {r.reaction ? <div className="text-[#00FFA3] mt-2">“{r.reaction}”</div> : null}
                    <div className="text-xs text-gray-500 mt-2">{r.timestamp ? (typeof r.timestamp.toDate === "function" ? r.timestamp.toDate().toLocaleString() : new Date(r.timestamp).toLocaleString()) : ""}</div>
                  </div>

                  <div className="flex gap-2 md:flex-col">
                    <button onClick={() => toggleApprove(r.id, !!r.approved)} className="px-3 py-2 rounded bg-[#00FFA3] text-[#002B36]"> {r.approved ? "Unapprove" : "Approve"} </button>
                    <button onClick={() => toggleSpam(r.id, !!r.spam)} className="px-3 py-2 rounded bg-[#11224E]"> {r.spam ? "Unspam" : "Mark Spam"} </button>
                    <button onClick={() => removeReview(r.id)} className="px-3 py-2 rounded bg-red-600">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
