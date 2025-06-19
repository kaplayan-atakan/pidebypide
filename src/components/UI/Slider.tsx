'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

interface SliderProps {
  images: string[];
  autoSlideInterval?: number;
}

export default function Slider({ 
  images, 
  autoSlideInterval = 4000
}: SliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Otomatik slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, autoSlideInterval);
    return () => clearInterval(timer);
  }, [images.length, autoSlideInterval]);
  return (
    <div className="section-slider relative">
      <div className="relative h-[400px] md:h-[600px] overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`Slider ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
      
      {/* Slider Kontrolleri */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Aşağı Kaydırma Butonu */}
      <div className="slider-down absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white cursor-pointer">
        <div className="mouse w-6 h-10 border-2 border-white rounded-full mx-auto mb-2 relative">
          <div className="w-1 h-2 bg-white rounded-full mx-auto mt-2 animate-bounce"></div>
        </div>
        <div className="text-2xl text-center">▼</div>
      </div>
    </div>
  );
}
