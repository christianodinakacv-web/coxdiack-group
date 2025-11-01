import React from "react";
import { motion } from "framer-motion";

export default function Breadcrumb({ path, onNavigate }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full text-sm text-gray-400 mb-6 md:mb-8"
    >
      <span
        className="cursor-pointer hover:text-[#00FFA3] transition-colors"
        onClick={() => onNavigate("home")}
      >
        Home
      </span>
      {"  ›  "}
      <span
        className="cursor-pointer hover:text-[#00FFA3] transition-colors"
        onClick={() => onNavigate("portfolio")}
      >
        Portfolio
      </span>
      {"  ›  "}
      <span className="text-[#00FFA3] font-medium">{path}</span>
    </motion.nav>
  );
}
