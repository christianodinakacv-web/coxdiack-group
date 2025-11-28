import React, { useEffect } from "react";
import { FaEnvelope, FaWhatsapp, FaFacebook } from "react-icons/fa";

export default function ContactModal({
  email = "contactcoxdiack@gmail.com",
  whatsapp = "639166975338",
  facebook = "https://www.facebook.com/Coxdiacklifestyle",
  onClose,
}) {
  // Close on ESC key
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#11224E] rounded-2xl p-8 w-[90%] md:w-[500px] text-center relative shadow-xl animate-zoomIn">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-[#00FFA3] text-2xl"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-[#00FFA3] mb-4">
          Contact Coxdiack Group
        </h2>

        <p className="text-gray-300 mb-6">
          Reach us instantly through any of these platforms:
        </p>

        {/* Contact options */}
        <div className="flex justify-center gap-6 text-3xl mb-6">

          {/* Email */}
          <a
            href={`mailto:${email}`}
            className="hover:text-[#00FFA3] transition-all"
            title="Send Email"
          >
            <FaEnvelope />
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00FFA3] transition-all"
            title="Chat on WhatsApp"
          >
            <FaWhatsapp />
          </a>

          {/* Facebook */}
          <a
            href={facebook}
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
            href={`mailto:${email}`}
            className="text-[#00FFA3] hover:underline"
          >
            {email}
          </a>
        </p>
      </div>
    </div>
  );
}
