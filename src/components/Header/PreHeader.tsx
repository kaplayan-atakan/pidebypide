'use client';

import Image from "next/image";
import { getAssetPath } from "@/utils/assetPath";

export default function PreHeader() {
  return (
    <div className="bg-white h-10">
      <div className="container mx-auto">
        <div className="flex justify-end items-center py-2 px-4">
          <ul className="flex items-center">            <li className="hidden md:block font-bold mr-4">
              <a href="/gorus-ve-onerileriniz" className="text-[#14543c] hover:text-[#f29b24] flex items-center h-10">
                <span className="mr-1">✏️</span> Görüş ve Önerileriniz
              </a>
            </li>
            {/* Sosyal Medya İkonları */}            <li>
              <a href="https://www.facebook.com/pidebypide/" target="_blank" rel="noopener noreferrer">
                <Image 
                  src={getAssetPath("assets/images/social/facebook.png")} 
                  alt="Facebook" 
                  width={40} 
                  height={40} 
                  className="hover:opacity-80 transition-opacity"
                />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/pidebypide/" target="_blank" rel="noopener noreferrer">
                <Image 
                  src={getAssetPath("assets/images/social/instagram.png")} 
                  alt="Instagram" 
                  width={40} 
                  height={40} 
                  className="hover:opacity-80 transition-opacity"
                />
              </a>
            </li>
            <li>
              <a href="https://x.com/pidebypide" target="_blank" rel="noopener noreferrer">
                <Image 
                  src={getAssetPath("assets/images/social/x.png")} 
                  alt="X (Twitter)" 
                  width={40} 
                  height={40} 
                  className="object-contain hover:opacity-80 transition-opacity"
                />
              </a>
            </li>
            <li>
              <a href="https://tr.linkedin.com/company/pidebypide" target="_blank" rel="noopener noreferrer">
                <Image 
                  src={getAssetPath("assets/images/social/linkedin.png")} 
                  alt="LinkedIn" 
                  width={40} 
                  height={40} 
                  className="object-contain hover:opacity-80 transition-opacity"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
