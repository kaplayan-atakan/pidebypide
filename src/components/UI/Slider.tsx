'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

interface SliderItem {
  image: string;
  url: string;
}

interface SliderProps {
  images: string[] | SliderItem[];
  autoSlideInterval?: number;
}

export default function Slider({ 
  images, 
  autoSlideInterval = 5000 // 5 saniyeye çıkarıldı daha iyi bir deneyim için
}: SliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Sonraki slide'a geç
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
    // Yönlendirme dışındaki console.log kaldırıldı
  }, [images.length]);

  // Önceki slide'a geç
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    // Yönlendirme dışındaki console.log kaldırıldı
  }, [images.length]);

  // Otomatik slider - hover durumunda durur
  useEffect(() => {
    if (isHovering) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, autoSlideInterval);
    
    return () => clearInterval(timer);
  }, [nextSlide, autoSlideInterval, isHovering]);
  
  // Slider içeriğine tıklamak yerine gezinme oklarına tıklandığında
  // kaydırma yapmak için e.stopPropagation() kullanılacak

  // Görüntü ve URL bilgisini alıp normalleştirir
  const normalizeSliderItems = useCallback(() => {
    return images.map(item => {
      // Eğer string ise (eski format), sadece görüntü url'si olarak kabul et
      if (typeof item === 'string') {
        return { image: item, url: '' };
      }
      // SliderItem objesi olarak döndür
      return item;
    });
  }, [images]);

  // Normalleştirilmiş slider öğeleri
  const sliderItems = normalizeSliderItems();
  
  return (
    <div 
      className="section-slider relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative h-[250px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden mx-auto max-w-[1400px]">
        {sliderItems.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <Link 
              href={index === 0 ? "/subeler" : "/urunler"}
              className="block w-full h-full cursor-pointer"
              onClick={(e) => {
                // Yönlendirme mantığı test için: 
                // Sadece mevcut gösterilen slide için yönlendirmeye izin ver
                if (index !== currentSlide) {
                  e.preventDefault();
                  // console.log(`YÖNLENDİRME TESTİ: Görünmez slide ${index} tıklandı -> önce görünür hale getiriliyor`);
                  setCurrentSlide(index);
                  return;
                }
                // console.log(`YÖNLENDİRME TESTİ: Slide ${index} tıklandı -> ${index === 0 ? "/subeler" : "/urunler"} sayfasına yönlendiriliyor`);
              }}
              aria-label={`Slider ${index + 1} - Detayları görüntüle`}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={`Slider ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 85vw"
                  className="object-contain px-4 py-2"
                  priority={index === 0}
                />
              </div>
            </Link>
          </div>
        ))}
        
        {/* Navigasyon Okları */}
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Bağlantı tıklamasını engelle
            prevSlide();
          }}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-colors z-20 shadow-lg"
          aria-label="Önceki Görsel"
        >
          <span className="text-2xl md:text-4xl">&lsaquo;</span>
        </button>
        
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Bağlantı tıklamasını engelle
            nextSlide();
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-colors z-20 shadow-lg"
          aria-label="Sonraki Görsel"
        >
          <span className="text-2xl md:text-4xl">&rsaquo;</span>
        </button>
      </div>
      
      {/* Slider Kontrolleri - İyileştirilmiş */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {sliderItems.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              // Yönlendirme dışındaki console.log'lar kaldırıldı
            }}
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all shadow-md btn-touch ${
              index === currentSlide 
                ? 'bg-white scale-110' 
                : 'bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Görsel ${index + 1}'e git`}
          />
        ))}
      </div>

      {/* Aşağı Kaydırma Butonu */}
      <div className="slider-down absolute bottom-20 sm:bottom-20 left-1/2 transform -translate-x-1/2 text-white cursor-pointer z-10">
        <div className="mouse w-5 h-8 sm:w-7 sm:h-12 border-2 border-white rounded-full mx-auto mb-2 relative shadow-lg">
          <div className="w-1 h-2 sm:w-1.5 sm:h-3 bg-white rounded-full mx-auto mt-1.5 sm:mt-2.5 animate-bounce"></div>
        </div>
        <div className="text-xl sm:text-2xl text-center animate-pulse">▼</div>
      </div>
    </div>
  );
}
