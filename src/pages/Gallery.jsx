import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
ChevronLeft,
ChevronRight,
Maximize2,
X
} from "lucide-react";

import pic1 from "../assets/gallery/picture1.png";
import pic2 from "../assets/gallery/picture2.png";
import pic3 from "../assets/gallery/picture3.png";
import pic4 from "../assets/gallery/picture4.png";
import pic5 from "../assets/gallery/picture5.png";

export default function Gallery() {
const images = [pic1, pic2, pic3, pic4, pic5];

const [index, setIndex] = useState(0);
const [lightboxOpen, setLightboxOpen] = useState(false);

// NEXT / PREVIOUS
const next = useCallback(
() => setIndex((prev) => (prev + 1) % images.length),
[images.length]
);
const prev = useCallback(
() => setIndex((prev) => (prev - 1 + images.length) % images.length),
[images.length]
);

// AUTO PLAY EVERY 5 SECONDS
useEffect(() => {
const timer = setInterval(() => next(), 5000);
return () => clearInterval(timer);
}, [next]);

// SIMPLE SWIPE HANDLER
let startX = 0;
const onTouchStart = (e) => (startX = e.touches[0].clientX);
const onTouchEnd = (e) => {
const endX = e.changedTouches[0].clientX;
if (startX - endX > 50) next();
if (endX - startX > 50) prev();
};

return ( <div className="min-h-screen bg-[#0A1837] text-white pt-24 pb-16 px-4 select-none"> <h1 className="text-center text-4xl font-bold text-[#00FFA3] mb-10">
Gallery </h1>

  {/* MAIN SLIDER */}
  <div
    className="relative max-w-4xl mx-auto overflow-hidden rounded-lg border border-[#00FFA3]/20"
    onTouchStart={onTouchStart}
    onTouchEnd={onTouchEnd}
  >
    <AnimatePresence mode="wait">
      <motion.img
        key={index}
        src={images[index]}
        alt="Gallery"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -60 }}
        transition={{ duration: 0.35 }}
        className="w-full h-[360px] md:h-[520px] object-cover cursor-pointer"
        onClick={() => setLightboxOpen(true)}
      />
    </AnimatePresence>

    {/* Buttons */}
    <button
      onClick={prev}
      className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#0A1837]/70 text-white p-2 rounded-full hover:bg-[#00FFA3]/40"
    >
      <ChevronLeft />
    </button>
    <button
      onClick={next}
      className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#0A1837]/70 text-white p-2 rounded-full hover:bg-[#00FFA3]/40"
    >
      <ChevronRight />
    </button>

    {/* Fullscreen Icon */}
    <button
      onClick={() => setLightboxOpen(true)}
      className="absolute top-3 right-3 bg-[#0A1837]/70 p-2 rounded-full"
    >
      <Maximize2 size={18} />
    </button>
  </div>

  {/* THUMBNAILS */}
  <div className="max-w-4xl mx-auto mt-6 grid grid-cols-5 gap-3">
    {images.map((img, i) => (
      <div
        key={i}
        onClick={() => setIndex(i)}
        className={`cursor-pointer rounded-md overflow-hidden border ${
          index === i
            ? "border-[#00FFA3]"
            : "border-transparent opacity-60 hover:opacity-100"
        }`}
      >
        <img
          src={img}
          className="w-full h-16 object-cover"
          alt="Thumbnail"
        />
      </div>
    ))}
  </div>

  {/* LIGHTBOX */}
  {lightboxOpen && (
    <AnimatePresence>
      <motion.div
        onClick={() => setLightboxOpen(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
      >
        <img
          src={images[index]}
          alt="Fullscreen"
          className="max-h-[90vh] max-w-[95vw] rounded-lg"
        />

        <button
          className="absolute top-5 right-5 text-white bg-black/60 p-2 rounded-full"
          onClick={() => setLightboxOpen(false)}
        >
          <X size={20} />
        </button>
      </motion.div>
    </AnimatePresence>
  )}
</div>


);
}
