'use client';

import { getAssetPath } from "@/utils/assetPath";
// import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { faXTwitter, faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Açık bir şekilde component function'u tanımlıyoruz
function PreHeader() {
  return (
    <div id="pre-header" className="bg-white h-auto py-0.5">
      <div className="container mx-auto container-responsive">
        <div className="flex flex-col sm:flex-row sm:justify-end items-center">
          <ul className="flex items-center gap-2 sm:gap-4">
            <li className="hidden md:block font-bold">
              <a href={getAssetPath('/gorus-ve-onerileriniz')} className="text-[#14543c] hover:text-[#f29b24] flex items-center h-6 font-header text-responsive-sm text-sm">
                <span className="mr-1">✏️</span> Görüş ve Önerileriniz
              </a>
            </li>
            {/* Sosyal Medya İkonları (react-icons ile) */}
            <li>
              <a href="https://www.facebook.com/pidebypide/" target="_blank" rel="noopener noreferrer" className="btn-touch">
                <FontAwesomeIcon icon={faFacebook} color="#4267B2" className="hover:opacity-80 transition-opacity sm:w-6 sm:h-6" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/pidebypide/" target="_blank" rel="noopener noreferrer" className="btn-touch">
                <FontAwesomeIcon icon={faInstagram} color="#C13584" className="hover:opacity-80 transition-opacity sm:w-6 sm:h-6" />
              </a>
            </li>
            <li>
              <a href="https://x.com/pidebypide" target="_blank" rel="noopener noreferrer" className="btn-touch">
                <FontAwesomeIcon icon={faXTwitter} color="#000" className="hover:opacity-80 transition-opacity sm:w-6 sm:h-6" />
              </a>
            </li>
            <li>
              <a href="https://tr.linkedin.com/company/pidebypide" target="_blank" rel="noopener noreferrer" className="btn-touch">
                <FontAwesomeIcon icon={faLinkedin} color="#0077B5" className="hover:opacity-80 transition-opacity sm:w-6 sm:h-6" />
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
