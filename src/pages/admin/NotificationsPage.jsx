// src/admin/NotificationsPage.jsx
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // get all unapproved testimonials
    const q = query(
      collection(db, "testimonials"),
      where("approved", "==", false)
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        const list = [];
        snap.forEach((doc) =>
          list.push({ id: doc.id, ...doc.data() })
        );
        setNotifications(list);
      },
      (err) => console.error(err)
    );

    return () => unsub();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>

      {notifications.length === 0 ? (
        <p className="text-gray-600">No new notifications.</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((item) => (
            <li
              key={item.id}
              className="p-4 bg-white rounded shadow border"
            >
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm">{item.message}</p>
              <p className="text-xs text-gray-500">
                Status: Not Approved
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}