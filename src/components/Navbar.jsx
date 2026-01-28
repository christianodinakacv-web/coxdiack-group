import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logoTransparent from "../assets/coxdiack-logo-transparent.png";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  // 🔐 In the future this will be validated via backend
  const ADMIN_PASSWORD =
    (import.meta.env?.VITE_ADMIN_PASS ||
      process.env.REACT_APP_ADMIN_PASS ||
      "").trim() ||
    "CoxdiackAdmin2025";

  const adminLogin = () => {
    const pwd = prompt("Enter Admin Password:");
    if (!pwd) return;

    if (pwd === ADMIN_PASSWORD) {
      window.localStorage.setItem("isAdmin", "true");
      alert("Admin mode activated");
    } else {
      alert("Incorrect password");
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
        adminLogin();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Learn", path: "/learn" }, // 🔥 PRIMARY
    { label: "Services", path: "/services" },
    { label: "Portfolio", path: "/portfolio" },
    { label: "Gallery", path: "/gallery" },
    { label: "Testimonials", path: "/testimonials" },
    { label: "Contact", path: "/contact" },
  ];


  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full bg-[#071226]/90 backdrop-blur-md text-white shadow-lg fixed top-0 left-0 z-50 border-b border-[#0f1a35]">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 cursor-pointer"
          onDoubleClick={adminLogin}
          title="Double-click for admin login"
        >
          <img
            src={logoTransparent}
            alt="Coxdiack Digital Hub Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="font-bold text-lg">
            Coxdiack<span className="text-[#00FFA3]">Digital Hub</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 font-medium">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`transition-all ${
                  isActive(item.path)
                    ? "text-[#00FFA3] font-semibold"
                    : "hover:text-[#00FFA3]"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-xl text-gray-300"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMobileOpen && (
        <div className="md:hidden bg-[#071226] px-6 py-4 border-t border-[#11224E] animate-slideDown">
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`text-lg ${
                    isActive(item.path)
                      ? "text-[#00FFA3] font-semibold"
                      : "text-gray-300 hover:text-[#00FFA3]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <p
            className="text-[10px] text-gray-500 text-center mt-6 opacity-20"
            onClick={adminLogin}
          >
            Admin
          </p>
        </div>
      )}
    </nav>
  );
}
