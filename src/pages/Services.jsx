import React from "react";
import { Link } from "react-router-dom";
import portfolioData from "../data/portfolioData";

export default function Services() {
  return (
    <div className="min-h-screen bg-[#0A1837] text-white pt-24 pb-20 px-6">

      <h1 className="text-4xl font-bold text-[#00FFA3] text-center mb-12">
        What We Offer
      </h1>

      {/* Services Grid */}
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

            {/* Recommended Tools */}
            {item.tools && (
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tools.map((tool, index) => (
                  <span
                    key={index}
                    className="text-xs px-3 py-1 rounded-full bg-[#0A1837] border border-white/10 text-gray-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            )}

            <Link
              to={`/portfolio/${item.id}`}
              className="block mt-6 text-center bg-[#00FFA3] text-[#002b36] py-2 font-semibold rounded-lg hover:bg-[#00cc84] transition"
            >
              See Work
            </Link>
          </div>
        ))}
      </div>

      {/* Affiliate Resources Section */}
      <section className="mt-24 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">
          Tools & Learning Resources
        </h2>

        <p className="text-gray-300 mb-8">
          Beyond our services, we’ve curated trusted tools, platforms, and
          tutorials to help you grow digitally.
        </p>

        <a
          href="https://sites.google.com/view/coxdiack-digital-group"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-[#00FFA3] text-[#071226] rounded-lg font-semibold hover:bg-[#00cc84] transition-all"
        >
          Visit Resource Hub
        </a>

        {/* Affiliate Disclosure */}
        <p className="mt-6 text-sm text-gray-400 italic">
          Some links on this page may be affiliate links. This means we may earn a small
          commission at no extra cost to you. We only recommend tools and platforms we
          trust and actively use.
        </p>
      </section>

    </div>
  );
}
