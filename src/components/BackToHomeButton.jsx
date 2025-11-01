// BackToHomeButton.jsx
import React from "react";

export default function BackToHomeButton({ setActive, setIsSidebarOpen }) {
  return (
    <button
      onClick={() => {
        setActive("home");
        if (setIsSidebarOpen) setIsSidebarOpen(true); // ✅ force sidebar to remain open
      }}
      className="mt-12 px-6 py-3 bg-[#00FFA3] text-[#071226] font-semibold rounded-full hover:bg-[#00cc82] transition-all duration-300"
    >
      ← Return to Home
    </button>
  );
}
