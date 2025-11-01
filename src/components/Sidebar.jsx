// src/components/Sidebar.jsx
import React from "react";
import { motion } from "framer-motion";

export default function Sidebar({ active, setActive, isOpen, setIsOpen }) {
  const menuItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Portfolio" },
    { id: "testimonials", label: "Testimonials" }, // <- ensure this exact id
    { id: "feedback", label: "Feedback" },
    { id: "ratings", label: "Ratings" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: isOpen ? 0 : -250 }}
      transition={{ duration: 0.35 }}
      className={`fixed left-0 top-0 h-full w-56 bg-[#071226] text-white flex flex-col shadow-2xl z-40 md:translate-x-0`}
    >
      <div className="p-6 text-lg font-bold border-b border-[#1E2B4D] flex justify-between items-center">
        Coxdiack<span className="text-[#00FFA3]">Group</span>

        <button
          className="md:hidden text-gray-400 hover:text-[#00FFA3]"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="p-3 space-y-2">
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                setActive(item.id);
                // keep sidebar open for desktop home and force-close for others on mobile
                if (item.id === "home") {
                  setIsOpen(true);
                } else {
                  setIsOpen(false);
                }
              }}
              className={`py-3 px-3 rounded-lg cursor-pointer transition-all duration-200
                ${
                  active === item.id
                    ? "bg-[#00FFA3] text-[#071226] font-semibold shadow"
                    : "hover:bg-[#11224E] hover:text-[#00FFA3]"
                }`}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 text-sm text-gray-400 border-t border-[#11224E]">
        © {new Date().getFullYear()} Coxdiack Group
      </div>
    </motion.aside>
  );
}
