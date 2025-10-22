import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import heroVideo from "../assets/hero-bg.mp4";
import gallery1 from "../assets/gallery1.jpg";
import gallery2 from "../assets/gallery2.jpg";
import gallery3 from "../assets/gallery3.jpg";
import gallery4 from "../assets/gallery4.jpg";
import logo from "../assets/coxdiack-logo.png";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const projects = [
    { id: 1, img: gallery1, title: "Creative Project 1" },
    { id: 2, img: gallery2, title: "Creative Project 2" },
    { id: 3, img: gallery3, title: "Creative Project 3" },
    { id: 4, img: gallery4, title: "Creative Project 4" },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#071426] text-white">
      {/* Sidebar */}
      <aside
        data-aos="fade-right"
        className="fixed md:relative z-20 md:z-10 bg-[#081a33] w-60 md:w-64 h-screen flex flex-col items-start px-6 py-8 shadow-lg"
      >
        <div className="mb-10 flex flex-col">
          <h2 className="text-xl font-semibold tracking-wide text-white">Coxdiack</h2>
          <span className="text-green-400 font-semibold text-lg">Group</span>
        </div>
        <nav className="flex flex-col space-y-4 w-full">
          {["Home", "About", "Services", "Portfolio", "Feedback", "Ratings", "Contact"].map((item) => (
            <button
              key={item}
              className="text-left w-full py-2 px-3 rounded-lg hover:bg-green-500 hover:text-black transition-all duration-300"
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col mt-20 md:mt-0">
        {/* Hero Section */}
        <section
          data-aos="fade-up"
          className="relative flex flex-col justify-center items-center text-center overflow-hidden h-[70vh] w-full"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>

          <div className="relative z-10 px-6 md:px-12 max-w-3xl">
            <img
              src={logo}
              alt="Coxdiack Group Logo"
              className="mx-auto mb-6 w-36 md:w-44 drop-shadow-lg"
              data-aos="zoom-in"
            />
            <h1 className="text-3xl md:text-5xl font-bold text-green-400 mb-3 drop-shadow-lg leading-tight">
              Coxdiack Group
            </h1>
            <p className="text-base md:text-lg text-gray-200 font-light drop-shadow-md">
              Building a creative digital world where innovation meets lifestyle.
            </p>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 px-6 md:px-12 bg-[#081a33]" data-aos="fade-up">
          <h2 className="text-2xl md:text-3xl font-semibold text-green-400 text-center mb-10">
            Explore Our Creative Spaces
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl overflow-hidden bg-[#0c223d] hover:bg-[#0f2b4d] shadow-md hover:shadow-lg transition-all duration-300"
                data-aos="fade-up"
              >
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-44 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-green-400 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-300">
                    Explore innovation, design, and lifestyle content crafted by the Coxdiack Group team.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-400 text-sm py-6 bg-[#071426]">
          © 2025 Coxdiack Group — All Rights Reserved.
        </footer>
      </main>
    </div>
  );
};

export default Home;
