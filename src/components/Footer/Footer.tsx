import Link from "next/link";
import Image from "next/image";
import { getAssetPath } from "@/utils/assetPath";

export default function Footer() {
  return (
    <div className="section-footer section-footer-new section-footer-home bg-white border-t border-[#7b7934] py-8">
      <div className="container mx-auto px-4">
        <div className="footer-wrapper">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-4 mb-5 text-center sm:text-left">              <div className="mb-2">
                <Link href="/" title="Pide By Pide">
                  <Image 
                    src={getAssetPath("upload/files/logo.png")} 
                    alt="Pide By Pide" 
                    width={240} 
                    height={120}
                    className="max-w-[240px] h-auto mx-auto sm:mx-0"
                  />
                </Link>
              </div><div className="text-sm text-[#7b7934]">
                © 2025 Pide By Pide - Tüm hakları saklıdır.
              </div>
            </div>
            
            <div className="col-span-12 sm:col-span-6 text-center sm:text-right">              <div className="mb-2 hidden sm:block footer-menu">
                <Link href="/" className="mr-4 text-[#14543c] hover:text-[#f29b24] transition-colors font-bold">Anasayfa</Link>
                <Link href="/hakkimizda" className="mr-4 text-[#14543c] hover:text-[#f29b24] transition-colors font-bold">Hakkımızda</Link>
                <Link href="/urunler" className="mr-4 text-[#14543c] hover:text-[#f29b24] transition-colors font-bold">Ürünler</Link>
                <Link href="/franchise" className="mr-4 text-[#14543c] hover:text-[#f29b24] transition-colors font-bold">Franchise</Link>
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
