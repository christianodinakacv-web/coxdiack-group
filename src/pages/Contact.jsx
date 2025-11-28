import React from "react";
import { FaEnvelope, FaWhatsapp, FaFacebook } from "react-icons/fa";

export default function Contact() {
return ( <div className="min-h-screen bg-[#0A1837] text-white pt-24 pb-20 px-6"> <div className="max-w-5xl mx-auto text-center"> <h1 className="text-4xl font-bold text-[#00FFA3] mb-6">Contact Us</h1>

    <p className="text-gray-300 leading-relaxed text-lg max-w-3xl mx-auto mb-10">
      Have a project, idea, partnership, or business inquiry?
      Reach out — we’d love to connect with you.
    </p>

    <div className="flex items-center justify-center gap-10 text-4xl">
      {/* Email */}
      <a
        href="mailto:contactcoxdiack@gmail.com"
        className="text-[#00FFA3] hover:scale-110 transition"
        title="Email Us"
      >
        <FaEnvelope />
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/639166975338?text=Hello%20Coxdiack%21"
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-500 hover:scale-110 transition"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>

      {/* Facebook */}
      <a href="https://www.facebook.com/Coxdiacklifestyle" 
       target="_blank" rel="noopener 
       noreferrer">
        Visit our Facebook Page
       </a>
    </div>
  </div>
</div>

);
}
