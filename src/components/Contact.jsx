import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaFacebookF, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_csy4s3l",
        "template_j5og35h",
        form.current,
        "JMNTC4sTngC2YmMBd"
      )
      .then(
        (result) => {
          console.log(result.text);
          setToast({ type: "success", text: "✅ Message sent successfully!" });
          setLoading(false);
          e.target.reset();

          // Hide toast after 3 seconds
          setTimeout(() => setToast(null), 3000);
        },
        (error) => {
          console.error(error.text);
          setToast({
            type: "error",
            text: "❌ Failed to send message. Please try again.",
          });
          setLoading(false);
          setTimeout(() => setToast(null), 3000);
        }
      );
  };

  return (
    <div className="bg-[#0A1837] text-white min-h-screen flex flex-col items-center py-12 px-4 relative">
      <h2 className="text-3xl md:text-4xl font-bold text-[#00FFA3] mb-10">
        Get in Touch with Coxdiack Group
      </h2>

      {/* Floating Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`fixed top-6 right-6 px-5 py-3 rounded-lg shadow-lg text-sm z-50 ${
              toast.type === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-12">
        <a
          href="https://wa.me/639166975338"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center bg-[#11224E] p-8 rounded-2xl shadow-lg hover:shadow-[0_0_25px_#00FFA3] transition-all duration-300 border border-[#00FFA3]/30 hover:scale-105"
        >
          <FaWhatsapp className="text-4xl text-[#00FFA3] mb-4" />
          <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
          <p className="text-gray-300 text-center">+63 916 697 5338</p>
        </a>

        <a
          href="https://www.facebook.com/Coxdiacklifestyle"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center bg-[#11224E] p-8 rounded-2xl shadow-lg hover:shadow-[0_0_25px_#00FFA3] transition-all duration-300 border border-[#00FFA3]/30 hover:scale-105"
        >
          <FaFacebookF className="text-4xl text-[#00FFA3] mb-4" />
          <h3 className="text-xl font-semibold mb-2">Facebook</h3>
          <p className="text-gray-300 text-center">@Coxdiacklifestyle</p>
        </a>

        <a
          href="mailto:contactcoxdiack@gmail.com"
          className="flex flex-col items-center justify-center bg-[#11224E] p-8 rounded-2xl shadow-lg hover:shadow-[0_0_25px_#00FFA3] transition-all duration-300 border border-[#00FFA3]/30 hover:scale-105"
        >
          <FaEnvelope className="text-4xl text-[#00FFA3] mb-4" />
          <h3 className="text-xl font-semibold mb-2">Email</h3>
          <p className="text-gray-300 text-center">
            contactcoxdiack@gmail.com
          </p>
        </a>
      </div>

      {/* Email Form */}
      <form
        ref={form}
        onSubmit={sendEmail}
        className="bg-[#11224E] p-8 rounded-2xl shadow-lg border border-[#00FFA3]/30 w-full max-w-3xl"
      >
        <h3 className="text-2xl font-semibold text-[#00FFA3] mb-6 text-center">
          Send Us a Message
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="p-3 rounded-lg bg-transparent border border-[#00FFA3]/40 text-white focus:outline-none focus:border-[#00FFA3] transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="p-3 rounded-lg bg-transparent border border-[#00FFA3]/40 text-white focus:outline-none focus:border-[#00FFA3] transition"
          />
        </div>

        <input
          type="text"
          name="title"
          placeholder="Subject"
          required
          className="mt-6 w-full p-3 rounded-lg bg-transparent border border-[#00FFA3]/40 text-white focus:outline-none focus:border-[#00FFA3] transition"
        />

        <textarea
          name="message"
          rows="5"
          placeholder="Your Message"
          required
          className="mt-6 w-full p-3 rounded-lg bg-transparent border border-[#00FFA3]/40 text-white focus:outline-none focus:border-[#00FFA3] transition"
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full py-3 bg-[#00FFA3] text-[#0A1837] font-semibold rounded-lg hover:bg-[#00cc80] transition-all duration-300"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      <p className="mt-10 text-gray-400 text-center max-w-2xl">
        We’d love to collaborate with you! Whether it’s for{" "}
        <span className="text-[#00FFA3] font-semibold">Web Design</span>,{" "}
        <span className="text-[#00FFA3] font-semibold">Brand Media</span>, or{" "}
        <span className="text-[#00FFA3] font-semibold">Digital Strategy</span>{" "}
        — our team is ready to bring your ideas to life. Reach out via Email,
        WhatsApp, or Facebook to get started today!
      </p>
    </div>
  );
};

export default Contact;
