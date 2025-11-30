// src/admin/Dashboard.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Notifications from "../components/Notifications";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#071226] text-white flex">
        {/* Sidebar */}
        <aside className="w-72 bg-[#071930] border-r border-[#0f1a35] p-6 hidden md:block">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#00FFA3]">Coxdiack Admin</h2>
            <p className="text-gray-400 text-sm mt-1">Dashboard</p>
          </div>

          <nav className="flex flex-col gap-3">
            <Link to="/admin/dashboard" className="px-3 py-2 rounded hover:bg-[#0f2a56]">Overview</Link>
            <Link to="/admin/reviews" className="px-3 py-2 rounded hover:bg-[#0f2a56]">Reviews</Link>
            <Link to="/admin/notifications" className="px-3 py-2 rounded hover:bg-[#0f2a56]">Notifications <span className="ml-2 inline-block"><Notifications small /></span></Link>
            {/* expand with other admin sections */}
          </nav>
        </aside>

        {/* Main column */}
        <div className="flex-1 p-6">
          {/* Header */}
          <header className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#00FFA3]">Admin Dashboard</h1>
              <p className="text-gray-300 mt-1">Manage reviews, approve feedback and moderate site content.</p>
            </div>

            <div className="flex items-center gap-4">
              <Notifications />
              <button
                onClick={() => {
                  localStorage.removeItem("adminLogin");
                  window.location.href = "/admin/login";
                }}
                className="bg-[#00FFA3] text-[#071226] px-4 py-2 rounded font-semibold"
              >
                Logout
              </button>
            </div>
          </header>

          {/* Outlet for nested admin pages */}
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
