import React from "react";
import { motion } from "framer-motion";

export default function Sidebar({ active, setActive, isOpen, setIsOpen }) {
  const menuItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Portfolio" },
    { id: "feedback", label: "Feedback" },
    { id: "ratings", label: "Ratings" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: isOpen ? 0 : -250 }}
      transition={{ duration: 0.4 }}
      className="fixed left-0 top-0 h-full w-64 bg-[#0A1837] text-white flex flex-col shadow-2xl z-40 md:translate-x-0"
    >
      {/* Sidebar Header */}
      <div className="p-6 text-2xl font-bold border-b border-gray-600 flex justify-between items-center">
        Coxdiack<span className="text-[#00FFA3]">Group</span>
        {/* Close button (mobile) */}
        <button
          className="md:hidden text-gray-400 text-xl"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-4 space-y-4">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer p-2 rounded-md transition ${
                active === item.id
                  ? "bg-[#00FFA3] text-[#0A1837] font-semibold"
                  : "hover:bg-[#1E2B4D]"
              }`}
              onClick={() => {
                setActive(item.id);
                setIsOpen(false);
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
    </motion.aside>
  );
}
