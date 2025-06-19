'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MainHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4 px-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="logo">
              <Image 
                src="/upload/files/logo.png" 
                alt="Pide By Pide - logo" 
                width={200} 
                height={100}
                className="max-w-[150px] lg:max-w-[200px] h-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigasyon Menüsü */}
          <nav className="hidden lg:flex">
            <ul className="flex items-center space-x-8 font-bold text-gray-800">
              <li className="relative group">
                <a href="#" className="hover:text-orange-500 transition-colors">KURUMSAL</a>
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-md p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 min-w-[200px]">
                  <Link href="/hakkimizda" className="block py-2 hover:text-orange-500">• Hakkımızda</Link>
                  <Link href="/sertifika" className="block py-2 hover:text-orange-500">• Sertifikalarımız</Link>
                </div>
              </li>
              <li>
                <Link href="/kariyer" className="hover:text-orange-500 transition-colors">KARİYER</Link>
              </li>
              <li>
                <Link href="/urunler" className="hover:text-orange-500 transition-colors">ÜRÜNLER</Link>
              </li>
              <li>
                <Link href="/franchise" className="hover:text-orange-500 transition-colors">FRANCHISE</Link>
              </li>
              <li>
                <Link href="/subeler" className="hover:text-orange-500 transition-colors">ŞUBELER</Link>
              </li>
              <li>
                <Link href="/iletisim" className="hover:text-orange-500 transition-colors">İLETİŞİM</Link>
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
              className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            ></span>
          </button>
        </div>

        {/* Mobil Navigasyon Menüsü */}
        <div
          className={`lg:hidden bg-white border-t border-gray-200 transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="px-4 py-4">
            <ul className="space-y-4 font-bold text-gray-800">
              <li>
                <details className="group">
                  <summary className="cursor-pointer hover:text-orange-500 transition-colors list-none flex items-center justify-between">
                    KURUMSAL
                    <span className="text-sm ml-2 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="mt-2 ml-4 space-y-2">
                    <Link href="/hakkimizda" className="block py-2 text-gray-600 hover:text-orange-500">• Hakkımızda</Link>
                    <Link href="/sertifika" className="block py-2 text-gray-600 hover:text-orange-500">• Sertifikalarımız</Link>
                  </div>
                </details>
              </li>
              <li>
                <Link href="/kariyer" className="block hover:text-orange-500 transition-colors">KARİYER</Link>
              </li>
              <li>
                <Link href="/urunler" className="block hover:text-orange-500 transition-colors">ÜRÜNLER</Link>
              </li>
              <li>
                <Link href="/franchise" className="block hover:text-orange-500 transition-colors">FRANCHISE</Link>
              </li>
              <li>
                <Link href="/subeler" className="block hover:text-orange-500 transition-colors">ŞUBELER</Link>
              </li>
              <li>
                <Link href="/iletisim" className="block hover:text-orange-500 transition-colors">İLETİŞİM</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
