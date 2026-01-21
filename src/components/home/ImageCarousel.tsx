import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function ImageCarousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ["/image1.webp", "/image2.webp", "/image4.webp", "/image8.webp", "/image5.webp", "/image.webp"]; // 暂时使用相同图片

  // Preload all images on component mount
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);



  return (
    <div className="hidden lg:w-[55%] xl:w-1/2 items-center justify-center fl-px-4/16 lg:flex">
      <div className="flex flex-col items-center w-full">
        {/* Image Container */}
        <div
          className="relative w-full shadow-2xl"
          aria-hidden="true"
        >
          {/* Indicators */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`transition-all duration-200 h-1 w-10 rounded-full ${index === currentImageIndex
                  ? "bg-white"
                  : "bg-white/30 hover:bg-white/50"
                  }`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>

          {/* Image Animation Container */}
          <div className="relative w-full h-auto">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt={`Hero image ${currentImageIndex + 1}`}
                className="w-full object-contain rounded-lg transition-all duration-300  "
                style={{ maxHeight: '85vh' }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    duration: 0.5,
                    ease: "easeInOut",
                  },
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeInOut",
                  },
                }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}