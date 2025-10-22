import React, { useState } from "react";

export default function Ratings() {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a star rating before submitting!");
      return;
    }
    setSubmitted(true);
  };

  return (
    <section className="p-10 text-center min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#0A1837] to-[#071226] text-white">
      <h1 className="text-3xl font-bold mb-4">Rate Our Services</h1>

      {!submitted ? (
        <>
          <div className="flex space-x-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-3xl cursor-pointer transition ${
                  star <= rating ? "text-yellow-400" : "text-gray-400"
                }`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
          <p className="mb-6 text-gray-300">
            {rating > 0
              ? `You selected ${rating} star${rating > 1 ? "s" : ""}.`
              : "Click a star to rate."}
          </p>

          <button
            onClick={handleSubmit}
            className="bg-[#00FFA3] text-[#071226] px-6 py-3 rounded-lg font-semibold hover:bg-[#00cc82] transition-all"
          >
            Submit Rating
          </button>
        </>
      ) : (
        <p className="text-xl text-[#00FFA3] mt-4">
          Thank you for rating us {rating} ⭐ — Your feedback means a lot!
        </p>
      )}
    </section>
  );
}
