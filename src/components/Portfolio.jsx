import React from "react";
import BackToHomeButton from "./BackToHomeButton";
import webLogo from "../assets/portfolio/web-logo.png";
import uiux from "../assets/portfolio/uiux.jpg";
import branding from "../assets/portfolio/branding.jpg";

export default function Portfolio({ setActive, setIsSidebarOpen }) {
  const portfolioItems = [
    { title: "Web Design", image: webLogo, key: "webdesign" },
    { title: "Brand Media", image: uiux, key: "brandmedia" },
    { title: "Digital Strategy", image: branding, key: "digitalstrategy" },
  ];

  return (
    <section className="bg-[#0A1837] text-white min-h-screen py-16 px-6 md:px-20 flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-8 text-[#00FFA3]">Our Portfolio</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {portfolioItems.map((item, index) => (
          <div
            key={index}
            className="bg-[#11224E] p-6 rounded-2xl shadow-lg hover:shadow-[0_0_25px_#00FFA3] transition-all duration-300 border border-[#00FFA3]/20 cursor-pointer"
            onClick={() => setActive(item.key)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-52 object-cover rounded-xl mb-4 border border-[#00FFA3]/30"
            />
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-300 text-sm">
              Explore our {item.title.toLowerCase()} projects and see how we bring brands to life.
            </p>
          </div>
        ))}
      </div>

      {/* ✅ Back to Home */}
      <BackToHomeButton setActive={setActive} setIsSidebarOpen={setIsSidebarOpen} />
    </section>
  );
}
