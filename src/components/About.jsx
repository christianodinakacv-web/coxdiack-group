import React from "react";

export default function About() {
  return (
    <section className="min-h-screen bg-[#071226] text-white flex flex-col items-center justify-center px-8">
      <h1 className="text-4xl font-bold mb-4 text-center">About Coxdiack Group</h1>
      <p className="text-lg text-gray-300 max-w-3xl text-center leading-relaxed">
        Coxdiack Group is a dynamic creative brand built to connect digital innovation 
        with lifestyle inspiration. We combine design, content, and strategy to create 
        impactful digital experiences.  
      </p>

      <div className="mt-8 text-gray-400 text-center max-w-2xl">
        <p>
          Our goal is to inspire creators, brands, and audiences to collaborate, 
          share ideas, and grow together in the fast-changing digital world.
        </p>
      </div>

      <div className="mt-10">
        <a
          href="https://wa.me/639166975338"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-green-500 rounded-full text-white font-semibold hover:bg-green-600 transition duration-300"
        >
          Chat on WhatsApp 💬
        </a>
      </div>
    </section>
  );
}
