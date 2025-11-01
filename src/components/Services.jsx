import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import BackToHomeButton from "./BackToHomeButton";

import webLogo from "../assets/portfolio/web-logo.png";
import branding from "../assets/portfolio/branding.jpg";
import uiux from "../assets/portfolio/uiux.jpg";

export default function Services({ setActive, setIsSidebarOpen }) {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const services = [
    {
      title: "Web Design & Development",
      image: webLogo,
      description:
        "We craft responsive, visually stunning, and user-friendly websites designed to attract and convert your audience.",
    },
    {
      title: "Brand Media & Storytelling",
      image: branding,
      description:
        "From captivating brand visuals to creative storytelling, we help brands connect emotionally with their audience.",
    },
    {
      title: "Digital Strategy & Growth",
      image: uiux,
      description:
        "We blend creativity with data-driven marketing strategies to boost visibility, engagement, and business growth.",
    },
  ];

  return (
    <section className="bg-[#0A1837] text-white min-h-screen py-16 px-6 md:px-20 flex flex-col items-center">
      <h1
        data-aos="fade-up"
        className="text-4xl font-bold text-[#00FFA3] mb-8 text-center"
      >
        Our Core Services
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl">
        {services.map((service, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 150}
            className="bg-[#11224E] p-6 rounded-2xl shadow-lg hover:shadow-[0_0_25px_#00FFA3] transition-all duration-300 border border-[#00FFA3]/20"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-48 object-cover rounded-lg mb-5"
            />
            <h3 className="text-xl font-semibold mb-3 text-[#00FFA3]">
              {service.title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 max-w-3xl text-center text-gray-300">
        <p data-aos="fade-up" className="mb-6">
          Ready to bring your project to life? Whether you need a website, a
          branding refresh, or a marketing strategy — our team is ready to help
          you grow. Let’s collaborate today!
        </p>
        <button
          onClick={() => setActive("contact")}
          className="bg-[#00FFA3] text-[#0A1837] px-8 py-3 rounded-full font-semibold hover:bg-[#00cc84] transition-all"
        >
          Contact Us
        </button>
      </div>

      <BackToHomeButton setActive={setActive} setIsSidebarOpen={setIsSidebarOpen} />
    </section>
  );
}
