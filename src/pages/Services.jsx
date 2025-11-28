import React from "react";
import { Link } from "react-router-dom";
import portfolioData from "../data/portfolioData";

export default function Services() {
return ( <div className="min-h-screen bg-[#0A1837] text-white pt-24 pb-20 px-6"> <h1 className="text-4xl font-bold text-[#00FFA3] text-center mb-12">
What We Offer </h1>

  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    {portfolioData.map((item) => (
      <div
        key={item.id}
        className="bg-[#10214F] p-6 rounded-xl border border-[#00FFA3]/30 shadow-md hover:scale-[1.03] transition-transform duration-300"
      >
        <h2 className="text-2xl font-semibold text-[#00FFA3] mb-3">
          {item.title}
        </h2>
        <p className="text-gray-300 mb-5">{item.desc}</p>

        <Link
          to={`/portfolio/${item.id}`}
          className="block text-center bg-[#00FFA3] text-[#002b36] py-2 font-semibold rounded-lg hover:bg-[#00cc84] transition"
        >
          See Work
        </Link>
      </div>
    ))}
  </div>
</div>

);
}
