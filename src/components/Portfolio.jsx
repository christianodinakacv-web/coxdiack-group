import React from "react";
import webLogo from "../assets/portfolio/web-logo.png";
import uiux from "../assets/portfolio/uiux.jpg";
import branding from "../assets/portfolio/branding.jpg";


const Portfolio = () => {
  const portfolioItems = [
    {
      title: "Web Design",
      image: webLogo,
      description:
        "Creating stunning, responsive websites that deliver seamless user experiences.",
    },
    {
      title: "Brand Media",
      image: uiux,
      description:
        "Building strong brand presence through creative visuals, videos, and content.",
    },
    {
      title: "Digital Strategy",
      image: branding,
      description:
        "Helping brands grow online through data-driven digital marketing strategies.",
    },
  ];

  return (
    <div className="text-white bg-[#0A1837] min-h-screen flex flex-col items-center py-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#00FFA3]">
        Our Portfolio
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12">
        {portfolioItems.map((item, index) => (
          <div
            key={index}
            className="bg-[#11224E] p-6 rounded-2xl shadow-lg hover:shadow-[0_0_20px_#00FFA3] transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-lg mb-4 border border-[#00FFA3]/30"
            />
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-300 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
