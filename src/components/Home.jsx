// src/components/Home.jsx
import React, { useState } from "react";
import { FaFacebook, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import heroVideo from "../assets/hero-bg.mp4";
import logo from "../assets/coxdiack-logo.png";
import gallery1 from "../assets/gallery1.jpg";
import gallery2 from "../assets/gallery2.jpg";
import gallery3 from "../assets/gallery3.jpg";
import gallery4 from "../assets/gallery4.jpg";
import ContactModal from "./ContactModal"; // 👈 import the new modal component

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="bg-[#0A1837] text-white min-h-screen">

      {/* ==== HERO SECTION ==== */}
<section className="relative h-[300px] md:h-[350px] flex flex-col justify-center items-center bg-[#071226] text-white overflow-hidden rounded-xl mx-4 md:mx-10 mt-6">

  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover"
  >
    <source src={heroVideo} type="video/mp4" />
  </video>

  <div className="relative z-10 text-center px-6">
    <img
      src={logo}
      alt="Coxdiack Group Logo"
      className="w-[180px] md:w-[240px] mx-auto mb-6 drop-shadow-xl"
    />
    <h1 className="text-4xl md:text-5xl font-bold">
      Welcome to <span className="text-[#00FFA3]">Coxdiack Group</span>
    </h1>
  </div>
</section>

      {/* ==== GALLERY PREVIEW ==== */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 px-6">
        {[gallery1, gallery2, gallery3, gallery4].map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Gallery ${i + 1}`}
            className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        ))}
      </div>

      {/* ==== ABOUT SECTION ==== */}
      <section className="py-16 px-6 md:px-16 bg-[#11224E] text-center rounded-t-3xl mt-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#00FFA3] mb-6">
          About Coxdiack Group
        </h2>
        <p className="max-w-3xl mx-auto text-gray-300 text-lg leading-relaxed">
          At <span className="text-[#00FFA3] font-semibold">Coxdiack Group</span>,
          we bridge creativity and technology to elevate brands in the digital era.
          From stunning web design to social media storytelling and strategic
          growth, our mission is to help you build a brand that stands out and performs.
        </p>

        <div className="mt-8">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#00FFA3] text-[#0A1837] px-6 py-3 rounded-full font-semibold hover:bg-[#00cc84] transition-all cursor-pointer"
          >
            Reach Us
          </button>
        </div>
      </section>

      {/* ==== CONTACT FOOTER ==== */}
      <footer className="py-8 bg-[#0A1837] text-center">
        <div className="flex justify-center gap-8 text-3xl mb-4">
          <a
            href="mailto:contactcoxdiack@gmail.com"
            className="hover:text-[#00FFA3] transition-all"
            title="Email Us"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://wa.me/639166975338"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00FFA3] transition-all"
            title="WhatsApp Us"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://www.facebook.com/Coxdiacklifestyle"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00FFA3] transition-all"
            title="Visit our Facebook Page"
          >
            <FaFacebook />
          </a>
        </div>

        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Coxdiack Group. All Rights Reserved.
        </p>
      </footer>

      {/* Contact Modal */}
      {isModalOpen && <ContactModal onClose={() => setModalOpen(false)} />}

    </div>
  );
};

export default Home;
