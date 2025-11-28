import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHome,
  FaInfoCircle,
  FaServicestack,
  FaFolderOpen,
  FaComments,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAdmin, setShowAdmin] = useState(false);

  const menu = [
    { label: "Home", path: "/", icon: <FaHome /> },
    { label: "About", path: "/about", icon: <FaInfoCircle /> },
    { label: "Services", path: "/services", icon: <FaServicestack /> },
    { label: "Portfolio", path: "/portfolio", icon: <FaFolderOpen /> },
    { label: "Testimonials", path: "/testimonials", icon: <FaComments /> },
    { label: "Contact", path: "/contact", icon: <FaEnvelope /> },
  ];

  const handleAdminLogin = () => {
    const pwd = prompt("Enter admin password:");
    if (pwd === "CoxdiackAdmin2025") {
      localStorage.setItem("isAdmin", "true");
      alert("Admin mode activated");
      navigate("/feedback");
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <motion.aside
      initial={{ x: -260 }}
      animate={{ x: isOpen ? 0 : -260 }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
      className="fixed left-0 top-0 h-screen w-60 bg-[#0A1837] border-r border-[#11224E] text-white shadow-xl z-40 hidden md:flex flex-col"
    >
      {/* Brand */}
      <div className="p-5 border-b border-[#11224E]">
        <h1 className="font-bold text-xl">
          Coxdiack<span className="text-[#00FFA3]">Group</span>
        </h1>
      </div>

      {/* Menu */}
      <ul className="flex-1 p-4 space-y-2">
        {menu.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all
              ${
                active
                  ? "bg-[#00FFA3] text-[#071226] font-semibold"
                  : "text-gray-300 hover:bg-[#11224E]"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}

        {/* Hidden Admin Trigger */}
        <button
          onClick={() => handleAdminLogin()}
          className="opacity-30 hover:opacity-100 text-xs mt-6 mx-auto flex items-center gap-2"
        >
          <FaLock size={12} />
          Admin Login
        </button>
      </ul>
    </motion.aside>
  );
}
