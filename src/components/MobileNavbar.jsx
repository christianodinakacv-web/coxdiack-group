import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export default function MobileNavbar({ setIsSidebarOpen }) {
const location = useLocation();
const navigate = useNavigate();
const [solid, setSolid] = useState(false);

useEffect(() => {
const onScroll = () => setSolid(window.scrollY > 20);
window.addEventListener("scroll", onScroll);
return () => window.removeEventListener("scroll", onScroll);
}, []);

const items = [
{ label: "Home", path: "/" },
{ label: "About", path: "/about" },
{ label: "Services", path: "/services" },
{ label: "Portfolio", path: "/portfolio" },
{ label: "Testimonials", path: "/testimonials" },
{ label: "Contact", path: "/contact" },
];

return (
<div
className={`fixed left-0 right-0 top-0 z-40 backdrop-blur-sm transition-all duration-300 px-4 py-3 flex items-center justify-between md:hidden ${
        solid ? "bg-[#0A1837] bg-opacity-95 shadow-md" : "bg-transparent"
      }`}
>
{/* Brand / Logo */}
<div
className="text-white font-bold text-lg cursor-pointer"
onClick={() => navigate("/")}
>
Coxdiack<span className="text-[#00FFA3]">Group</span> </div>

```
  {/* Navigation Buttons */}
  <nav className="flex gap-2 overflow-x-auto hide-scrollbar">
    {items.map((item) => {
      const active = location.pathname === item.path;
      return (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition ${
            active
              ? "bg-[#00FFA3] text-[#071226]"
              : "text-white hover:text-[#00FFA3]"
          }`}
        >
          {item.label}
        </button>
      );
    })}
  </nav>

  {/* Sidebar toggle (Optional) */}
  {setIsSidebarOpen && (
    <button
      className="text-white ml-3 text-xl"
      onClick={() => setIsSidebarOpen(true)}
    >
      <FaBars />
    </button>
  )}
</div>
```

);
}
