// src/pages/admin/AdminRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";

export default function AdminRoute() {
  const { loading, isAdmin } = useAuth();

  if (loading) return <div className="p-8 text-white">Checking admin access…</div>;
  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  return <Outlet />;
}
