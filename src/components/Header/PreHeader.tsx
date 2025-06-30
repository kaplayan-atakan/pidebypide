'use client';

import Image from "next/image";
import { getAssetPath } from "@/utils/assetHelpers";

// Açık bir şekilde component function'u tanımlıyoruz
function PreHeader() {
  return (
    <div id="pre-header" className="bg-white h-auto py-0.5">
      <div className="container mx-auto container-responsive">
        <div className="flex flex-col sm:flex-row sm:justify-end items-center">
          <ul className="flex items-center gap-2 sm:gap-4">
            <li className="hidden md:block font-bold">
              <a href="/gorus-ve-onerileriniz" className="text-[#14543c] hover:text-[#f29b24] flex items-center h-6 font-header text-responsive-sm text-sm">
                <span className="mr-1">✏️</span> Görüş ve Önerileriniz
              </a>
            </li>
            {/* Sosyal Medya İkonları */}
            <li>
              <a href="https://www.facebook.com/pidebypide/" target="_blank" rel="noopener noreferrer" className="btn-touch">
                <Image 
                  src={getAssetPath("assets/images/social/facebook.png")} 
                  alt="Facebook" 
                  width={40} 
                  height={40}
                  sizes="40px"
                  className="hover:opacity-80 transition-opacity sm:w-6 sm:h-6"
                />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/pidebypide/" target="_blank" rel="noopener noreferrer" className="btn-touch">
                <Image 
                  src={getAssetPath("assets/images/social/instagram.png")} 
                  alt="Instagram" 
                  width={40} 
                  height={40}
                  sizes="40px"
                  className="hover:opacity-80 transition-opacity sm:w-6 sm:h-6"
                />
              </a>
            </li>
            <li>
              <a href="https://x.com/pidebypide" target="_blank" rel="noopener noreferrer" className="btn-touch">
                <Image 
                  src={getAssetPath("assets/images/social/x.png")} 
                  alt="X (Twitter)" 
                  width={40} 
                  height={40}
                  sizes="40px"
                  className="object-contain hover:opacity-80 transition-opacity sm:w-6 sm:h-6"
                />
              </a>
            </li>
            <li>
              <a href="https://tr.linkedin.com/company/pidebypide" target="_blank" rel="noopener noreferrer" className="btn-touch">
                <Image 
                  src={getAssetPath("assets/images/social/linkedin.png")} 
                  alt="LinkedIn" 
                  width={40} 
                  height={40}
                  sizes="40px"
                  className="object-contain hover:opacity-80 transition-opacity sm:w-6 sm:h-6"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Bileşeni export ediyoruz
export default PreHeader;
