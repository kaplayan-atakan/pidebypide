import Link from "next/link";
import Image from "next/image";
import { getAssetPath } from "@/utils/assetPath";

export default function Footer() {
  return (    <div className="section-footer section-footer-new section-footer-home bg-white border-t border-[#7b7934] spacing-md">
      <div className="container mx-auto container-responsive">
        <div className="footer-wrapper">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-responsive">
            <div className="col-span-12 lg:col-span-5 margin-responsive text-center lg:text-left">
              <div className="margin-responsive">
                <Link href="/" title="Pide By Pide">
                  <Image 
                    src={getAssetPath("upload/files/logo.png")} 
                    alt="Pide By Pide" 
                    width={240} 
                    height={120}
                    sizes="(max-width: 640px) 180px, 240px"
                    className="w-[180px] sm:w-[240px] h-auto mx-auto lg:mx-0"
                  />
                </Link>
              </div>
              <div className="text-responsive-sm text-[#7b7934]">
                © 2025 Pide By Pide - Tüm hakları saklıdır.
              </div>
            </div>
            
            <div className="col-span-12 lg:col-span-7 text-center lg:text-right">
              <div className="margin-responsive hidden lg:block footer-menu">
                <Link href="/" className="mr-4 text-[#14543c] hover:text-[#f29b24] transition-colors font-bold text-responsive-sm btn-touch">Anasayfa</Link>
                <Link href="/hakkimizda" className="mr-4 text-[#14543c] hover:text-[#f29b24] transition-colors font-bold text-responsive-sm btn-touch">Hakkımızda</Link>
                <Link href="/urunler" className="mr-4 text-[#14543c] hover:text-[#f29b24] transition-colors font-bold text-responsive-sm btn-touch">Ürünler</Link>
                <Link href="/franchise" className="mr-4 text-[#14543c] hover:text-[#f29b24] transition-colors font-bold text-responsive-sm btn-touch">Franchise</Link>
                <Link href="/subeler" className="mr-4 text-[#14543c] hover:text-[#f29b24] transition-colors font-bold">Şubeler</Link>
                <Link href="/kariyer" className="mr-4 text-[#14543c] hover:text-[#f29b24] transition-colors font-bold">Kariyer</Link>
                <Link href="/iletisim" className="text-[#14543c] hover:text-[#f29b24] transition-colors font-bold">İletişim</Link>
              </div>              <div className="mb-2 footer-menu text-sm">
                <Link href="/kvkk-kapsaminda-cerez-politikasi" className="mr-4 text-[#7b7934] hover:text-[#f29b24] transition-colors">Çerez Politikası</Link>
                <Link href="/kisisel-verilerin-korunmasi-kanunu-aydinlatma-metni" className="mr-4 text-[#7b7934] hover:text-[#f29b24] transition-colors">Kişisel Verilerin Korunması</Link>
                <a href="https://www.apazgroup.com" target="_blank" rel="noopener noreferrer" title="Apaz Group" className="text-[#7b7934] hover:text-[#f29b24] transition-colors">apazgroup.com</a>
              </div>
              <div className="inline-block">
                <div className="box-footer">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
