import React from "react";
import { FaWhatsapp } from "react-icons/fa"; // ✅ WhatsApp icon from react-icons

export default function FloatingWhatsApp() {
  const whatsappLink = "https://wa.me/639166975338";

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition duration-300 flex items-center justify-center"
      title="Chat with us on WhatsApp"
    >
      <FaWhatsapp size={28} /> {/* ✅ WhatsApp logo icon */}
    </a>
  );
}
