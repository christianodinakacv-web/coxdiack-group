import React, { useState } from "react";

export default function Feedback() {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your feedback: "${feedback}"`);
    setFeedback("");
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Share Your Thoughts</h1>
      <p className="text-gray-300 mb-4">
        We value your opinion! Tell us how we can improve your experience.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full p-3 rounded bg-[#0b1730] border border-gray-700 text-gray-100"
          placeholder="Write your feedback here..."
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded font-semibold"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
