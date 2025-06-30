import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { getAssetPath } from '@/utils/assetHelpers';

export const metadata: Metadata = {
  title: 'Pide By Pide',
  description: 'Kuşbaşılı pide, kıymalı pide, peynirli pide, patatesli pide, tavuklu pide, Kilis pide ve daha bir çok pide çeşidi Pide By Pide\'de. 365 gün, 1 pide alana 1 pide bedava.',
  keywords: 'Kuşbaşılı pide, kıymalı pide, peynirli pide, patatesli pide, tavuklu pide, Kilis pide ve daha bir çok pide çeşidi Pide By Pide\'de. 365 gün, 1 pide alana 1 pide bedava.',
  robots: 'index, follow',
  openGraph: {
    title: 'Ana Sayfa - Pide By Pide',
    description: 'Kuşbaşılı pide, kıymalı pide, peynirli pide, patatesli pide, tavuklu pide, Kilis pide ve daha bir çok pide çeşidi Pide By Pide\'de. 365 gün, 1 pide alana 1 pide bedava.',
    url: 'http://www.pidebypide.com/',
    siteName: 'Pide By Pide',
    images: [
      {
        url: getAssetPath('/upload/files/files_2019-05-15_13-09-07.png'),
      },
    ],
    locale: 'tr',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Ana Sayfa - Pide By Pide',
    description: 'Kuşbaşılı pide, kıymalı pide, peynirli pide, patatesli pide, tavuklu pide, Kilis pide ve daha bir çok pide çeşidi Pide By Pide\'de. 365 gün, 1 pide alana 1 pide bedava.',
    images: [getAssetPath('/upload/files/files_2019-05-15_13-09-07.png')],
    creator: '@ajansup',
    site: '@ajansup',
  },
  other: {
    'google-site-verification': 'CfrSFORuLxishdrr71MGa43cSpux9_zN8d8yDmtnwK8',
  },
};

export default function Home() {
  return (
    <>
      {/* Görüş ve Öneri Bar */}
      <Link 
        href={getAssetPath('/gorus-ve-onerileriniz')}
        className="fixed top-0 right-0 bg-orange-500 text-white px-4 py-2 text-sm font-bold z-[9999] hover:bg-orange-600 transition-colors"
        style={{ zIndex: 9999 }}
      >
        <i className="icon-edit mr-2"></i>
        <span>Görüş ve Öneri</span>
      </Link>

      <div className="layout--home">
        {/* Header */}
        <div id="header" className="section-header">
          {/* Pre Header */}
          <div className="section-pre-header bg-gray-100 py-2">
            <div className="container mx-auto px-4">
              <div className="flex justify-end items-center">
                <div className="text-right">
                  <ul className="flex items-center space-x-4 text-sm">
                    <li className="font-bold hidden lg:block px-5">
                      <Link href={getAssetPath('/gorus-ve-onerileriniz')} className="flex items-center hover:text-orange-500">
                        <i className="fa fa-edit mr-2"></i> Görüş ve Önerileriniz
                      </Link>
                    </li>
                    <li>
                      <Link href="https://www.facebook.com/pidebypide/" target="_blank">
                        <Image 
                          src={getAssetPath('/assets/images/social/facebook.png')} 
                          alt="icon-facebook" 
                          width={40} 
                          height={40}
                          className="hover:opacity-80 transition-opacity"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link href="https://www.instagram.com/pidebypide/" target="_blank">
                        <Image 
                          src={getAssetPath('/assets/images/social/instagram.png')} 
                          alt="icon-instagram" 
                          width={40} 
                          height={40}
                          className="hover:opacity-80 transition-opacity"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link href="https://x.com/pidebypide" target="_blank">
                        <Image 
                          src={getAssetPath('/assets/images/social/x.png')} 
                          alt="icon-x" 
                          width={40} 
                          height={40}
                          className="hover:opacity-80 transition-opacity object-contain"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link href="https://tr.linkedin.com/company/pidebypide" target="_blank">
                        <Image 
                          src={getAssetPath('/assets/images/social/linkedin.png')} 
                          alt="icon-linkedin" 
                          width={40} 
                          height={40}
                          className="hover:opacity-80 transition-opacity object-contain"
                        />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Main Header */}
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              {/* Logo */}
              <div className="text-center lg:text-left mb-4 lg:mb-0">
                <Link href="/anasayfa" className="logo">
                  <Image 
                    src="/upload/files/logo.png" 
                    alt="Pide By Pide - logo" 
                    width={200} 
                    height={80}
                    className="max-w-[200px] h-auto"
                  />
                </Link>
              </div>

              {/* Navigation Menu */}
              <nav className="w-full lg:w-auto">
                <ul className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-8 font-bold text-lg">
                  <li className="group relative">
                    <Link href="#" className="hover:text-orange-500 transition-colors">
                      KURUMSAL
                    </Link>
                    <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 min-w-[200px]">
                      <div className="space-y-2">
                        <Link href="/hakkimizda" className="block text-left hover:text-orange-500">
                          • Hakkımızda
                        </Link>
                        <Link href="/sertifika" className="block text-left hover:text-orange-500">
                          • Sertifikalarımız
                        </Link>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link href="/basvuru-formu" className="hover:text-orange-500 transition-colors">
                      KARİYER
                    </Link>
                  </li>
                  <li>
                    <Link href="/urunler" className="hover:text-orange-500 transition-colors">
                      ÜRÜNLER
                    </Link>
                  </li>
                  <li>
                    <Link href="/franchise" className="hover:text-orange-500 transition-colors">
                      FRANCHISE
                    </Link>
                  </li>
                  <li>
                    <Link href="/subeler" className="hover:text-orange-500 transition-colors">
                      ŞUBELER
                    </Link>
                  </li>
                  <li>
                    <Link href="/iletisim" className="hover:text-orange-500 transition-colors">
                      İLETİŞİM
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Slider Section */}
        <div className="section-slider relative">
          <div className="home-slider">
            <div className="slide-container">
              {/* Ana slider görselleri - Bu kısım JavaScript ile dinamik hale getirilecek */}
              <div className="slide">
                <Image 
                  src="/assets/images/pide1.jpg" 
                  alt="Tüm Şubelerimiz Açıldı" 
                  width={1920} 
                  height={800}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Slider Down Button */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center cursor-pointer">
            <div className="mouse w-6 h-10 border-2 border-white rounded-full mb-2 relative">
              <div className="w-1 h-2 bg-white rounded-full absolute left-1/2 top-2 transform -translate-x-1/2 animate-bounce"></div>
            </div>
            <i className="fa fa-angle-down text-white text-2xl"></i>
          </div>
        </div>

        <div className="mb-px"></div>

        {/* Footer */}
        <div className="section-footer section-footer-new section-footer-home bg-gray-800 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="footer-wrapper">
              <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-8 lg:space-y-0">
                {/* Logo ve Copyright */}
                <div className="text-center lg:text-left lg:w-1/3">
                  <div className="mb-4">
                    <Link href="/index.html" title="Pide By Pide">
                      <Image 
                        src="/upload/files/logo.png" 
                        alt="Pide By Pide" 
                        width={240} 
                        height={96}
                        className="max-w-[240px] h-auto mx-auto lg:mx-0"
                      />
                    </Link>
                  </div>
                  <p className="text-sm">© 2025 Pide By Pide - Tüm hakları saklıdır.</p>
                </div>

                {/* Menüler */}
                <div className="text-center lg:text-right lg:w-2/3">
                  {/* Ana Menü - Sadece büyük ekranlarda görünür */}
                  <div className="hidden lg:block mb-4">
                    <div className="footer-menu space-x-6">
                      <Link href="/index.html" className="hover:text-orange-500 transition-colors">Anasayfa</Link>
                      <Link href="/hakkimizda.html" className="hover:text-orange-500 transition-colors">Hakkımızda</Link>
                      <Link href="/lezzetler.html" className="hover:text-orange-500 transition-colors">Lezzetler</Link>
                      <Link href="/franchise.html" className="hover:text-orange-500 transition-colors">Franchise</Link>
                      <Link href="/subeler.html" className="hover:text-orange-500 transition-colors">Şubeler</Link>
                      <Link href="/kariyer.html" className="hover:text-orange-500 transition-colors">Kariyer</Link>
                      <Link href="/iletisim.html" className="hover:text-orange-500 transition-colors">İletişim</Link>
                    </div>
                  </div>
                  
                  {/* Alt Menü */}
                  <div className="mb-4">
                    <div className="footer-menu space-x-6">
                      <Link href="/kvkk-kapsaminda-cerez-politikasi.html" className="hover:text-orange-500 transition-colors text-sm">
                        Çerez Politikası
                      </Link>
                      <Link href="/kisisel-verilerin-korunmasi-kanunu-aydinlatma-metni.html" className="hover:text-orange-500 transition-colors text-sm">
                        Kişisel Verilerin Korunması
                      </Link>
                      <Link href="https://www.ilgazi.com" target="_blank" title="iot rfid teknolojileri" className="hover:text-orange-500 transition-colors text-sm">
                        ilgazi.com
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
