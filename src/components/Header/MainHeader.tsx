'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAssetPath } from "@/utils/assetHelpers";

// Açık bir şekilde component function'u tanımlıyoruz
function MainHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [kurumsalOpen, setKurumsalOpen] = useState(false);
  
  // Sayfa değiştiğinde menüleri kapat
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setKurumsalOpen(false);
  }, [pathname]);

  // Kurumsal dropdown'unu toggle et
  const toggleKurumsal = (e: React.MouseEvent) => {
    e.preventDefault();
    setKurumsalOpen(!kurumsalOpen);
  };

  return (
    <div className="bg-white w-full shadow-sm">
      <div className="container mx-auto container-responsive">
        <div className="flex items-center justify-between py-2 spacing-xs">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="logo">
              <Image 
                src={getAssetPath("upload/files/logo.png")} 
                alt="Pide By Pide - logo" 
                width={160} 
                height={80}
                sizes="(max-width: 640px) 100px, (max-width: 1024px) 130px, 160px"
                className="w-[100px] sm:w-[130px] lg:w-[160px] h-auto"
                priority
              />
            </Link>
          </div>
          
          {/* Desktop Navigasyon Menüsü */}
          <nav className="hidden lg:flex">
            <ul className="flex items-center space-x-4 xl:space-x-6 font-bold navigation-item text-[#14543c] font-header text-sm">
              <li className="relative group">
                <button 
                  onClick={toggleKurumsal}
                  className="hover:text-[#f29b24] transition-colors btn-touch bg-transparent border-none font-bold font-header text-sm text-[#14543c] cursor-pointer"
                >
                  KURUMSAL
                </button>
                <div className={`absolute top-full left-0 bg-white shadow-lg rounded-md p-2 transition-all duration-300 z-50 min-w-[180px] ${kurumsalOpen ? 'opacity-100 visible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'}`}>
                  <Link href="/hakkimizda" className="block py-1.5 hover:text-[#f29b24] font-header text-sm btn-touch">• Hakkımızda</Link>
                  <Link href="/sertifika" className="block py-1.5 hover:text-[#f29b24] font-header text-sm btn-touch">• Sertifikalarımız</Link>
                </div>
              </li>
              
              <li>
                <Link href="/kariyer" className="hover:text-[#f29b24] transition-colors btn-touch">KARİYER</Link>
              </li>
              <li>
                <Link href="/urunler" className="hover:text-[#f29b24] transition-colors btn-touch">ÜRÜNLER</Link>
              </li>
              <li>
                <Link href="/franchise" className="hover:text-[#f29b24] transition-colors btn-touch">FRANCHISE</Link>
              </li>
              <li>
                <Link href="/subeler" className="hover:text-[#f29b24] transition-colors btn-touch">ŞUBELER</Link>
              </li>
              <li>
                <Link href="/iletisim" className="hover:text-[#f29b24] transition-colors btn-touch">İLETİŞİM</Link>
              </li>
            </ul>
          </nav>

          {/* Hamburger Menü Butonu */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menüyü aç/kapat"
          >
            <span
              className={`block w-6 h-0.5 bg-[#14543c] transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-[#14543c] transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-[#14543c] transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            ></span>
          </button>
        </div>

        {/* Mobil Navigasyon Menüsü */}
        <div
          className={`lg:hidden bg-white border-t border-[#7b7934] transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="px-3 py-2">
            <ul className="space-y-3 font-bold navigation-item text-[#14543c] font-header text-sm">
              <li>
                <div className="relative">
                  <button 
                    onClick={toggleKurumsal} 
                    className="w-full text-left cursor-pointer hover:text-[#f29b24] transition-colors list-none flex items-center justify-between font-bold py-2 bg-transparent border-none text-[#14543c]"
                  >
                    KURUMSAL
                    <span className={`text-sm ml-2 transition-transform ${kurumsalOpen ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  
                  <div className={`mt-2 ml-4 space-y-2 transition-all duration-300 ${kurumsalOpen ? 'block' : 'hidden'}`}>
                    <Link href="/hakkimizda" className="block py-2 text-[#7b7934] hover:text-[#f29b24] font-header">• Hakkımızda</Link>
                    <Link href="/sertifika" className="block py-2 text-[#7b7934] hover:text-[#f29b24] font-header">• Sertifikalarımız</Link>
                  </div>
                </div>
              </li>
              <li>
                <Link href="/kariyer" className="block hover:text-[#f29b24] transition-colors">KARİYER</Link>
              </li>
              <li>
                <Link href="/urunler" className="block hover:text-[#f29b24] transition-colors">ÜRÜNLER</Link>
              </li>
              <li>
                <Link href="/franchise" className="block hover:text-[#f29b24] transition-colors">FRANCHISE</Link>
              </li>
              <li>
                <Link href="/subeler" className="block hover:text-[#f29b24] transition-colors">ŞUBELER</Link>
              </li>
              <li>
                <Link href="/iletisim" className="block hover:text-[#f29b24] transition-colors">İLETİŞİM</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

// Bileşeni export ediyoruz
export default MainHeader;
