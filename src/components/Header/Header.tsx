'use client';

import { useState, useEffect } from 'react';
// Doğru şekilde komşu bileşenleri import ediyoruz - göreceli yollar kullanarak
import PreHeader from './PreHeader';
import MainHeader from './MainHeader';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Sayfada 40px'den fazla scroll edilirse preHeader'ı gizle
      setIsScrolled(window.scrollY > 40);
    };

    // İlk yükleme kontrolü
    handleScroll();

    // Scroll event listener ekle
    window.addEventListener('scroll', handleScroll);
    
    // Component temizlendiğinde event listener'ı kaldır
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* PreHeader bölümü: normal akışta, sabit değil */}
      <div className={`w-full transition-all duration-300 ${isScrolled ? 'header-hide' : 'header-show'}`}>
        <PreHeader />
      </div>
      
      {/* MainHeader bölümü: fixed pozisyonda, her zaman görünür */}
      <header id="main-header" className="fixed-header">
        <MainHeader />
      </header>
        {/* MainHeader'ın altındaki içeriğin düzgün görünmesi için gerekli boşluk */}
      <div className="h-14 sm:h-16 md:h-18 lg:h-20"></div>
    </>
  );
}
