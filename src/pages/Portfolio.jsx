import React from "react";
import { Link } from "react-router-dom";
import portfolioData from "../data/portfolioData";

export default function Portfolio() {
return ( <div className="min-h-screen bg-[#0A1837] text-white pt-24 pb-20 px-6"> <h1 className="text-4xl font-bold text-[#00FFA3] text-center mb-12">
Case Studies & Work </h1>

  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    {portfolioData.map((item, i) => (
      <div
        key={item.id}
        className="bg-[#10214F] p-5 rounded-xl border border-[#00FFA3]/30 shadow-md hover:scale-[1.03] transition-transform"
      >
        {item.images?.[0] && (
          <img
            src={item.images[0]}
            alt={item.title}
            className="rounded-md w-full h-48 object-cover mb-4"
          />
        )}

        <h2 className="text-xl font-semibold text-[#00FFA3] mb-2">
          {item.title}
        </h2>
        <p className="text-gray-300 text-sm mb-4">{item.desc}</p>

        <Link
          to={`/portfolio/${item.id}`}
          className="block text-center bg-[#00FFA3] text-[#002b36] py-2 rounded-lg font-semibold hover:bg-[#00cc84] transition"
        >
          View Project
        </Link>
      </div>
    ))}
  </div>
</div>

);
}
