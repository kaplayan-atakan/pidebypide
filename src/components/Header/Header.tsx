'use client';


import { useState, useEffect, useRef } from 'react';
import PreHeader from './PreHeader';
import MainHeader from './MainHeader';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [preHeaderHeight, setPreHeaderHeight] = useState(40); // px cinsinden, varsayılan 40px
  const preHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePreHeaderHeight = () => {
      if (preHeaderRef.current) {
        setPreHeaderHeight(preHeaderRef.current.offsetHeight);
      }
    };
    updatePreHeaderHeight();
    window.addEventListener('resize', updatePreHeaderHeight);
    return () => {
      window.removeEventListener('resize', updatePreHeaderHeight);
    };
  }, []);

  useEffect(() => {
    // Histerezis için buffer değeri (px)
    const BUFFER = 12;
    let lastIsScrolled = isScrolled;

    const handleScroll = () => {
      const currentY = window.scrollY;
      if (!lastIsScrolled && currentY > preHeaderHeight + BUFFER) {
        setIsScrolled(true);
        lastIsScrolled = true;
      } else if (lastIsScrolled && currentY < preHeaderHeight - BUFFER) {
        setIsScrolled(false);
        lastIsScrolled = false;
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preHeaderHeight]);

  return (
    <>
      {/* PreHeader bölümü: normal akışta, sabit değil */}
      <div ref={preHeaderRef} className={`w-full transition-all duration-300 ${isScrolled ? 'header-hide' : 'header-show'}`}>
        <PreHeader />
      </div>

      {/* MainHeader bölümü: fixed pozisyonda, sticky top ile */}
      <header
        id="main-header"
        className="fixed-header"
        style={{ top: isScrolled ? 0 : preHeaderHeight, transition: 'all 0.2s ease' }}
      >
        <MainHeader />
      </header>
      {/* MainHeader'ın altındaki içeriğin düzgün görünmesi için dinamik boşluk */}
      <div style={{ height: preHeaderHeight + 64 }}></div>
    </>
  );
}
