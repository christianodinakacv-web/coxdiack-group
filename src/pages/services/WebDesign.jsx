import React, { useState } from "react";
import { Link } from "react-router-dom";

const WEBAPP_URL =
"[https://script.google.com/macros/s/AKfycbyduzhEQ4bj2p6w9ikDZNLc6CPbycwEx7R9hnBWfePbwwzigyhinnXYf-aesgoZs76DiA/exec](https://script.google.com/macros/s/AKfycbyduzhEQ4bj2p6w9ikDZNLc6CPbycwEx7R9hnBWfePbwwzigyhinnXYf-aesgoZs76DiA/exec)";

export default function WebDesign() {
const [openForm, setOpenForm] = useState(false);
const [sending, setSending] = useState(false);
const [form, setForm] = useState({
name: "",
email: "",
details: "",
});

const submit = async (e) => {
e.preventDefault();
if (!form.name.trim()) return alert("Name is required.");
setSending(true);

try {
  await fetch(WEBAPP_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Name: form.name,
      Email: form.email,
      Message: form.details,
      Service: "Web Design & Development",
      Source: "Service Inquiry",
    }),
  });

  alert("Inquiry sent successfully!");
  setOpenForm(false);
  setForm({ name: "", email: "", details: "" });
} catch (err) {
  console.error(err);
  alert("Sending failed. Please try again.");
} finally {
  setSending(false);
}

};

return ( <div className="min-h-screen bg-[#0A1837] text-white p-8">

  {/* HEADER */}
  <h1 className="text-4xl font-bold text-[#00FFA3] mb-3">
    Web Design & Development
  </h1>

  <p className="text-gray-300 max-w-3xl mb-8 leading-relaxed">
    We build modern websites optimized for speed, conversions, responsiveness and SEO.
    From UI/UX strategy to development, deployment, and business performance tracking —
    your website becomes a tool for real growth.
  </p>

  {/* ACTION BUTTONS */}
  <div className="flex gap-4 mb-8">
    <button
      onClick={() => setOpenForm((s) => !s)}
      className="bg-[#00FFA3] text-[#071226] px-6 py-3 rounded-lg font-semibold hover:bg-[#00cc84] transition-all"
    >
      {openForm ? "Close Form" : "Start Your Project"}
    </button>

    <Link
      to="/portfolio"
      className="border border-[#00FFA3] px-6 py-3 rounded-lg hover:bg-[#11224E] transition-all"
    >
      View Portfolio
    </Link>
  </div>

  {/* FORM SECTION */}
  {openForm && (
    <form
      onSubmit={submit}
      className="bg-[#11224E] p-6 rounded-xl max-w-2xl"
    >
      <input
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Your Name"
        className="w-full p-3 rounded bg-[#071226] mb-3"
      />

      <input
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="Email (optional)"
        className="w-full p-3 rounded bg-[#071226] mb-3"
      />

      <textarea
        value={form.details}
        onChange={(e) => setForm({ ...form, details: e.target.value })}
        placeholder="Project details..."
        className="w-full p-3 rounded bg-[#071226] mb-3 min-h-[120px]"
      />

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={sending}
          className="bg-[#00FFA3] text-[#071226] px-6 py-3 rounded-lg font-semibold"
        >
          {sending ? "Sending…" : "Send Inquiry"}
        </button>

        <button
          type="button"
          onClick={() => setOpenForm(false)}
          className="px-6 py-3 rounded-lg border"
        >
          Cancel
        </button>
      </div>
    </form>
  )}

  {/* BACK TO SERVICES */}
  <div className="mt-16">
    <Link
      to="/services"
      className="text-sm px-3 py-2 bg-[#11224E] rounded hover:bg-[#0F2A56]"
    >
      ← Back to Services
    </Link>
  </div>
</div>

);
}
