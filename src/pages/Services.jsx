import React from "react";
import { Link } from "react-router-dom";
import portfolioData from "../data/portfolioData";

export default function Services() {
  return (
    <div className="min-h-screen bg-[#0A1837] text-white pt-24 pb-20 px-6">

      {/* Page Title */}
      <h1 className="text-4xl font-bold text-[#00FFA3] text-center mb-6">
         Client Services & Digital Solutions
      </h1>

      <p className="text-gray-300 text-center max-w-2xl mx-auto mb-16">
         Professional digital services for brands, creators, and businesses
         that want results without trial and error.
      </p>

      {/* Tools / Learning Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {portfolioData.map((item) => (
          <div
            key={item.id}
            className="bg-[#10214F] p-6 rounded-xl border border-[#00FFA3]/30 shadow-md hover:scale-[1.03] transition-transform duration-300"
          >
            <h2 className="text-2xl font-semibold text-[#00FFA3] mb-3">
              {item.title}
            </h2>

            <p className="text-gray-300 mb-5">
              {item.desc}
            </p>

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
              Learn More
            </Link>
          </div>
        ))}
      </div>

      {/* Funnel CTA Section */}
      <section className="mt-24 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">
          Choose Your Learning Path
        </h2>

        <p className="text-gray-300 mb-8">
          Not sure where to start? We’ve organized beginner-friendly learning paths
          covering AI tools, YouTube growth systems, and smart online income models —
          all designed to help you move from learning to earning.
        </p>

        <a
          href="https://sites.google.com/view/coxdiack-digital-group"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-[#00FFA3] text-[#071226] rounded-lg font-semibold hover:bg-[#00cc84] transition-all"
        >
          Go to Learning Hub
        </a>

        {/* Affiliate Disclosure */}
        <p className="mt-6 text-sm text-gray-400 italic">
          Some resources may include affiliate links. This means we may earn a small
          commission at no extra cost to you. We only recommend tools and systems we
          actively use and trust.
        </p>
      </section>

    </div>
  );
}
