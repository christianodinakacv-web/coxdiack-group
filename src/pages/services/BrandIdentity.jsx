import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const WEBAPP_URL =
"[https://script.google.com/macros/s/AKfycbyduzhEQ4bj2p6w9ikDZNLc6CPbycwEx7R9hnBWfePbwwzigyhinnXYf-aesgoZs76DiA/exec](https://script.google.com/macros/s/AKfycbyduzhEQ4bj2p6w9ikDZNLc6CPbycwEx7R9hnBWfePbwwzigyhinnXYf-aesgoZs76DiA/exec)";

export default function BrandIdentity() {
const navigate = useNavigate();
const [openForm, setOpenForm] = useState(false);
const [form, setForm] = useState({ name: "", email: "", details: "" });

const submit = async (e) => {
e.preventDefault();
if (!form.name.trim()) return alert("Please enter your name.");

try {
  await fetch(WEBAPP_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Name: form.name,
      Email: form.email,
      Message: form.details,
      Service: "Brand Media & Storytelling",
      Source: "Service Inquiry",
    }),
  });

  alert("Thanks — inquiry sent!");
  setForm({ name: "", email: "", details: "" });
  setOpenForm(false);
} catch (err) {
  alert("Sending failed.");
  console.error(err);
}

};

return (
<motion.div
initial={{ opacity: 0, y: 25 }}
animate={{ opacity: 1, y: 0 }}
className="min-h-screen bg-[#0A1837] text-white p-8"
>
<button
onClick={() => navigate("/services")}
className="mb-6 px-4 py-2 bg-[#11224E] rounded hover:bg-[#162d66]"
>
← Back to Services </button>

  <h1 className="text-4xl font-bold text-[#00FFA3] mb-3">
    Brand Media & Storytelling
  </h1>

  <p className="text-gray-300 max-w-3xl mb-6">
    We craft visual voice systems, guidelines, and communication frameworks
    that create memorable brands across platforms.
  </p>

  <div className="flex gap-3 mb-8">
    <button
      onClick={() => setOpenForm(true)}
      className="px-5 py-3 bg-[#00FFA3] rounded-md text-[#071226] font-semibold"
    >
      Start Your Project
    </button>

    <button
      onClick={() => navigate("/portfolio/branding")}
      className="px-5 py-3 border border-[#00FFA3] rounded-md"
    >
      See Work
    </button>
  </div>

  {openForm && (
    <motion.form
      onSubmit={submit}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      className="bg-[#11224E] p-6 rounded-xl max-w-2xl"
    >
      <input
        placeholder="Your name"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full p-3 rounded bg-[#071226] mb-3"
      />

      <input
        placeholder="Email (optional)"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full p-3 rounded bg-[#071226] mb-3"
      />

      <textarea
        placeholder="Describe your brand brief..."
        value={form.details}
        onChange={(e) => setForm({ ...form, details: e.target.value })}
        className="w-full p-3 rounded bg-[#071226] mb-3 min-h-[120px]"
      />

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-[#00FFA3] text-[#071226] px-5 py-3 rounded-md font-semibold"
        >
          Send Inquiry
        </button>

        <button
          type="button"
          onClick={() => setOpenForm(false)}
          className="px-4 py-3 rounded-md border"
        >
          Cancel
        </button>
      </div>
    </motion.form>
  )}
</motion.div>

);
}
