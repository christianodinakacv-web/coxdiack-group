import React from "react";

export default function Services() {
  const services = [
    {
      title: "Creative Media",
      description:
        "We bring stories to life through digital art, photography, and engaging content creation. From cinematic visuals to social media storytelling, our creative media service transforms ideas into experiences that capture attention and emotion. We don’t just create content — we craft connections.",
      color: "from-[#00FFA3]/20 to-transparent",
    },
    {
      title: "Branding",
      description:
        "Your brand is more than a logo — it’s your voice, your vision, your digital identity. We help you design an authentic presence that stands out and speaks clearly to your audience. From strategy to style, every element we create reflects your unique story and mission.",
      color: "from-[#00FFA3]/20 to-transparent",
    },
    {
      title: "Digital Solutions",
      description:
        "We build the tools that power modern brands — from sleek, responsive websites to intelligent digital systems tailored to your needs. Our goal is to bridge creativity and functionality, giving your brand the technology edge it deserves. Whether it’s a business portfolio, an automated workflow, or a digital experience — we turn your vision into results.",
      color: "from-[#00FFA3]/20 to-transparent",
    },
  ];

  return (
    <section className="p-10 text-white bg-gradient-to-b from-[#0A1837] to-[#071226] min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10">
        Our <span className="text-[#00FFA3]">Services</span>
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-gradient-to-b from-[#132A5A]/40 to-[#0A1837]/60 border border-[#1E2A4A] shadow-lg hover:shadow-[#00FFA3]/20 transition-all"
          >
            <h2 className="text-2xl font-semibold text-[#00FFA3] mb-4">
              {service.title}
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>

      <p className="text-center text-gray-400 mt-12 italic">
        “At Coxdiack Group, we don’t just follow digital trends — we set them.”
      </p>
    </section>
  );
}
