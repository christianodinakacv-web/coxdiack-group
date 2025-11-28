import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import portfolioData from "../data/portfolioData";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function PortfolioItem() {
const { id } = useParams();
const navigate = useNavigate();
const item = portfolioData.find((p) => p.id === id);

const [currentIndex, setCurrentIndex] = useState(0);

if (!item)
return ( <div className="text-white text-center pt-32"> <h2 className="text-xl mb-4">Project Not Found</h2>
<button
onClick={() => navigate("/portfolio")}
className="text-[#00FFA3] underline"
>
Return to Portfolio </button> </div>
);

const nextImage = () =>
setCurrentIndex((i) => (i + 1) % item.images.length);

const prevImage = () =>
setCurrentIndex((i) => (i - 1 + item.images.length) % item.images.length);

return ( <div className="min-h-screen bg-[#0A1837] text-white pt-24 pb-10 px-6 flex flex-col items-center">
{/* Back Button */}
<button
onClick={() => navigate("/portfolio")}
className="flex items-center gap-2 bg-[#00FFA3] text-[#0A1837] px-4 py-2 rounded-lg mb-6 hover:bg-[#00cc84]"
> <ArrowLeft size={18} /> Back </button>

```
  <h1 className="text-4xl font-bold text-[#00FFA3] mb-6">{item.title}</h1>

  {/* Image Display */}
  <div className="relative max-w-4xl w-full mb-6">
    <motion.img
      key={currentIndex}
      src={item.images[currentIndex]}
      className="w-full rounded-xl shadow border border-[#00FFA3]/30"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
    />

    {item.images.length > 1 && (
      <>
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#00FFA3]/10 text-[#00FFA3] p-2 rounded-full"
        >
          ‹
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#00FFA3]/10 text-[#00FFA3] p-2 rounded-full"
        >
          ›
        </button>
      </>
    )}
  </div>

  <p className="max-w-3xl text-gray-300 text-center">{item.desc}</p>
</div>
```

);
}
