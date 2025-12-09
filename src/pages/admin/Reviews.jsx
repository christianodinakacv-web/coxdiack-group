// src/admin/Reviews.jsx
import React, { useEffect, useState, useRef, useMemo } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { db } from "../../firebase/config";
import {
  collection,
  query,
  orderBy,
  getDocs,
  startAfter,
  limit,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  where
} from "firebase/firestore";
import { FaTrash, FaCheck, FaStar } from "react-icons/fa";

/**
 * Hybrid reviews admin:
 * - Firestore cursor pagination (page size)
 * - Client-side search + filters
 * - Realtime prepend for newly added docs (listens to newest docs)
 */

const PAGE_SIZE = 10;

export default function Reviews() {
  const [reviews, setReviews] = useState([]); // loaded pages
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [lastDocSnapshot, setLastDocSnapshot] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // UI state
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | approved | unapproved | featured

  // keep a ref of all loaded ids to avoid duplicates when realtime prepends
  const loadedIdsRef = useRef(new Set());

  // initial load
  useEffect(() => {
    let mounted = true;
    const loadFirstPage = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "testimonials"),
          orderBy("createdAt", "desc"),
          limit(PAGE_SIZE)
        );
        const snap = await getDocs(q);
        if (!mounted) return;
        const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        snap.docs.forEach((d) => loadedIdsRef.current.add(d.id));
        setReviews(docs);
        setLastDocSnapshot(snap.docs[snap.docs.length - 1] || null);
        setHasMore(snap.docs.length === PAGE_SIZE);
      } catch (err) {
        console.error("Failed to load reviews:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadFirstPage();

    return () => {
      mounted = false;
    };
  }, []);

  // realtime listener for NEW reviews (most-recent)
  useEffect(() => {
    // listen to the very latest items (limit small) and prepend unseen ones
    const qNew = query(collection(db, "testimonials"), orderBy("createdAt", "desc"), limit(5));
    const unsub = onSnapshot(qNew, (snap) => {
      const added = [];
      snap.docChanges().forEach((change) => {
        if (change.type === "added") {
          const id = change.doc.id;
          if (!loadedIdsRef.current.has(id)) {
            added.push({ id, ...change.doc.data() });
            loadedIdsRef.current.add(id);
          }
        }
      });
      if (added.length > 0) {
        // Prepend newest items, but keep page size behavior client-side
        setReviews((prev) => [...added, ...prev]);
      }
    }, (err) => {
      console.error("Realtime listen error:", err);
    });

    return () => unsub();
  }, []);

  const loadMore = async () => {
    if (!hasMore || !lastDocSnapshot) return;
    setLoadingMore(true);
    try {
      const q = query(
        collection(db, "testimonials"),
        orderBy("createdAt", "desc"),
        startAfter(lastDocSnapshot),
        limit(PAGE_SIZE)
      );
      const snap = await getDocs(q);
      const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      snap.docs.forEach((d) => loadedIdsRef.current.add(d.id));
      setReviews((prev) => [...prev, ...docs]);
      setLastDocSnapshot(snap.docs[snap.docs.length - 1] || lastDocSnapshot);
      setHasMore(snap.docs.length === PAGE_SIZE);
    } catch (err) {
      console.error("Failed to load more:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  // Actions
  const approve = async (id) => {
    setBusyId(id);
    try {
      await updateDoc(doc(db, "testimonials", id), {
        approved: true,
        moderatedAt: serverTimestamp(),
      });
      setReviews((r) => r.map((x) => (x.id === id ? { ...x, approved: true } : x)));
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
      setReviews((r) => r.map((x) => (x.id === id ? { ...x, approved: false } : x)));
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
      setReviews((r) => r.map((x) => (x.id === id ? { ...x, featured: !current } : x)));
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
      setReviews((r) => r.filter((x) => x.id !== id));
      loadedIdsRef.current.delete(id);
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
    setBusyId(null);
  };

  // Filters + Search (client-side over loaded pages)
const filtered = useMemo(() => {
  const s = search.trim().toLowerCase();

  return reviews.filter((r) => {
    if (filter === "approved" && !r.approved) return false;
    if (filter === "unapproved" && r.approved) return false;
    if (filter === "featured" && !r.featured) return false;

    if (!s) return true;

    // search name, email, message
    const haystack = (
      `${r.name || ""} ${r.email || ""} ${r.message || r.reaction || ""}`
    ).toLowerCase();

    return haystack.includes(s);
  });
}, [reviews, search, filter]);

  return (
    <ProtectedRoute>
      <div className="bg-[#071226] p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-[#00FFA3] mb-4">Reviews</h2>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email or message"
              className="p-2 rounded bg-[#0B1736] text-white w-full md:w-80"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 rounded bg-[#0B1736] ml-2"
            >
              <option value="all">All</option>
              <option value="approved">Approved</option>
              <option value="unapproved">Unapproved</option>
              <option value="featured">Featured</option>
            </select>
          </div>

          <div className="text-sm text-gray-300">
            Showing <span className="text-white font-semibold">{filtered.length}</span> of <span className="text-white font-semibold">{reviews.length}</span> loaded
          </div>
        </div>

        {/* List */}
        <div className="grid gap-3">
          {loading ? (
            <div className="text-gray-400">Loading reviews…</div>
          ) : filtered.length === 0 ? (
            <div className="text-gray-400">No reviews found.</div>
          ) : (
            filtered.map((r) => (
              <div key={r.id} className="bg-[#0F274F] p-4 rounded-lg border border-[#0f2a56]">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="font-semibold">{r.name || "Anonymous"}</div>
                      <div className="text-xs text-gray-300">{r.email || ""}</div>
                      <div className="ml-4 text-sm text-gray-400">{r.rating ? `${r.rating}/5` : ""}</div>
                      {r.featured && <span className="ml-2 px-2 py-1 bg-yellow-500 text-black rounded text-xs">Featured</span>}
                      <div className="ml-4 text-xs text-gray-400">
                        {r.createdAt?.toDate ? r.createdAt.toDate().toLocaleString() : (r.createdAt || "")}
                      </div>
                    </div>

                    {r.reaction && <div className="text-[#00FFA3] mt-2">“{r.reaction}”</div>}

                    <p className="text-gray-200 mt-2">{r.message}</p>
                  </div>

                  <div className="flex flex-col gap-2 md:items-end">
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

        {/* Load more */}
        <div className="mt-4 flex justify-center">
          {hasMore ? (
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="px-4 py-2 rounded bg-[#00FFA3] text-[#071226] font-semibold"
            >
              {loadingMore ? "Loading…" : "Load more"}
            </button>
          ) : (
            <div className="text-gray-400">No more reviews</div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}