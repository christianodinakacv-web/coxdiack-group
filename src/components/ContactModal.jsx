// src/components/ContactModal.jsx
import React from "react";
import { FaEnvelope, FaWhatsapp, FaFacebook } from "react-icons/fa";

const ContactModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-[#11224E] rounded-2xl p-8 w-[90%] md:w-[500px] text-center relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-[#00FFA3] text-2xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-[#00FFA3] mb-4">
          Contact Coxdiack Group
        </h2>
        <p className="text-gray-300 mb-6">
          Reach us instantly through any of these platforms:
        </p>

        <div className="flex justify-center gap-6 text-3xl mb-6">
          <a
            href="mailto:contactcoxdiack@gmail.com"
            className="hover:text-[#00FFA3] transition-all"
            title="Send Email"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://wa.me/639166975338"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00FFA3] transition-all"
            title="Chat on WhatsApp"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://www.facebook.com/Coxdiacklifestyle"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00FFA3] transition-all"
            title="Facebook Page"
          >
            <FaFacebook />
          </a>
        </div>

        <p className="text-gray-400 text-sm">
          Or email us directly at{" "}
          <a
            href="mailto:contactcoxdiack@gmail.com"
            className="text-[#00FFA3] hover:underline"
          >
            contactcoxdiack@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactModal;
