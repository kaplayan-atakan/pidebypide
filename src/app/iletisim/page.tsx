import { Metadata } from 'next';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ContactForm from "@/components/ContactForm";
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from "@/components/Icons/ContactIcons";
import Link from "next/link";
import Image from "next/image";
import { getAssetPath } from '@/utils/assetHelpers';

export const metadata: Metadata = {
  title: 'İletişim - Pide By Pide',
  description: 'Pide By Pide ile iletişime geçin. Genel merkez, müşteri hizmetleri, franchise ve iş başvuruları için bizimle iletişim kurun.',
  keywords: 'iletişim, pide by pide, müşteri hizmetleri, franchise, genel merkez, telefon, email',
  openGraph: {
    title: 'İletişim - Pide By Pide',
    description: 'Pide By Pide ile iletişime geçin. Genel merkez, müşteri hizmetleri, franchise ve iş başvuruları için bizimle iletişim kurun.',
    type: 'website',
  },
  alternates: {
    canonical: '/iletisim'
  }
};

export default function IletisimPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      <main className="min-h-screen">
        {/* Ana İçerik */}
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="container mx-auto container-responsive">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              
              {/* Sol Kolon - İletişim Bilgileri */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-header text-[#14543c] mb-6">
                    İletişim Bilgilerimiz
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Genel Merkez */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-bold text-xl text-[#14543c] mb-4 font-header">
                        Genel Merkez
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <MapPinIcon className="w-6 h-6 text-[#f29b24] mt-1 flex-shrink-0" />
                          <p className="text-gray-700">
                            Pide By Pide Genel Merkez<br />
                            Adalet, Anadolu Cd. No:41 Kat:20, 35530 Bayraklı/İzmir
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <PhoneIcon className="w-6 h-6 text-[#f29b24] flex-shrink-0" />
                          <a href="tel:+902324644235" className="text-gray-700 hover:text-[#14543c] transition-colors">
                            (0232) 464 42 35
                          </a>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <EnvelopeIcon className="w-6 h-6 text-[#f29b24] flex-shrink-0" />
                          <a href="mailto:musterihizmetleri@pidebypide.com" className="text-gray-700 hover:text-[#14543c] transition-colors">
                            musterihizmetleri@pidebypide.com
                          </a>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <ClockIcon className="w-6 h-6 text-[#f29b24] flex-shrink-0" />
                          <span className="text-gray-700">
                            Hafta içi: 09:00 - 18:00
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Departmanlar */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-xl text-[#14543c] font-header">
                        Departmanlarımız
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="border-l-4 border-[#f29b24] pl-4">
                          <h4 className="font-semibold text-gray-800">Müşteri Hizmetleri</h4>
                          <div className="flex items-center space-x-3 mt-1">
                            <EnvelopeIcon className="w-4 h-4 text-[#f29b24]" />
                            <a href="mailto:musterihizmetleri@pidebypide.com" className="text-gray-600 hover:text-[#14543c] transition-colors text-sm">
                              musterihizmetleri@pidebypide.com
                            </a>
                          </div>
                        </div>
                        
                        <div className="border-l-4 border-[#f29b24] pl-4">
                          <h4 className="font-semibold text-gray-800">Franchise</h4>
                          <div className="flex items-center space-x-3 mt-1">
                            <EnvelopeIcon className="w-4 h-4 text-[#f29b24]" />
                            <a href="mailto:franchise@pidebypide.com" className="text-gray-600 hover:text-[#14543c] transition-colors text-sm">
                              franchise@pidebypide.com
                            </a>
                          </div>
                        </div>
                        
                        <div className="border-l-4 border-[#f29b24] pl-4">
                          <h4 className="font-semibold text-gray-800">İnsan Kaynakları</h4>
                          <div className="flex items-center space-x-3 mt-1">
                            <EnvelopeIcon className="w-4 h-4 text-[#f29b24]" />
                            <a href="mailto:ik@pidebypide.com" className="text-gray-600 hover:text-[#14543c] transition-colors text-sm">
                              ik@pidebypide.com
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sosyal Medya */}
                    <div>
                      <h3 className="font-bold text-xl text-[#14543c] mb-4 font-header">
                        Bizi Takip Edin
                      </h3>
                      <div className="flex space-x-4">
                        <Link href="https://www.facebook.com/pidebypide/" target="_blank" rel="noopener noreferrer" 
                              className="hover:scale-110 transition-transform" aria-label="Facebook">
                          <Image 
                            src={getAssetPath('/assets/images/social/facebook.png')} 
                            alt="Facebook" 
                            width={40} 
                            height={40} 
                            className="hover:opacity-80 transition-opacity"
                          />
                        </Link>
                        <Link href="https://www.instagram.com/pidebypide/" target="_blank" rel="noopener noreferrer" 
                              className="hover:scale-110 transition-transform" aria-label="Instagram">
                          <Image 
                            src={getAssetPath('/assets/images/social/instagram.png')} 
                            alt="Instagram" 
                            width={40} 
                            height={40} 
                            className="hover:opacity-80 transition-opacity"
                          />
                        </Link>
                        <Link href="https://x.com/pidebypide" target="_blank" rel="noopener noreferrer" 
                              className="hover:scale-110 transition-transform" aria-label="X">
                          <Image 
                            src={getAssetPath('/assets/images/social/x.png')} 
                            alt="X" 
                            width={40} 
                            height={40} 
                            className="hover:opacity-80 transition-opacity"
                          />
                        </Link>
                        <Link href="https://tr.linkedin.com/company/pidebypide" target="_blank" rel="noopener noreferrer" 
                              className="hover:scale-110 transition-transform" aria-label="LinkedIn">
                          <Image 
                            src={getAssetPath('/assets/images/social/linkedin.png')} 
                            alt="LinkedIn" 
                            width={40} 
                            height={40} 
                            className="hover:opacity-80 transition-opacity"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sağ Kolon - İletişim Formu */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-header text-[#14543c] mb-6">
                  Bize Ulaşın
                </h2>
                <div className="bg-gray-50 rounded-lg p-6 lg:p-8">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SSS Bölümü */}
        <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
          <div className="container mx-auto container-responsive">
            <h2 className="text-2xl sm:text-3xl font-bold font-header text-[#14543c] text-center mb-8">
              Sıkça Sorulan Sorular
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-[#14543c] mb-3 font-header">
                  Paket servis yapıyor musunuz?
                </h3>
                <p className="text-gray-700 text-sm">
                  Evet, tüm şubelerimizde paket servis hizmeti mevcuttur. Minimum sipariş tutarı ve teslimat ücreti için şubemizi arayabilirsiniz.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-[#14543c] mb-3 font-header">
                  Rezervasyon yaptırmak gerekiyor mu?
                </h3>
                <p className="text-gray-700 text-sm">
                  Normal günlerde rezervasyon şart değildir. Ancak büyük grup yemekleri ve özel günlerde rezervasyon yaptırmanızı öneriyoruz.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-[#14543c] mb-3 font-header">
                  Hangi ödeme yöntemlerini kabul ediyorsunuz?
                </h3>
                <p className="text-gray-700 text-sm">
                  Nakit, kredi kartı, banka kartı ve online ödeme yöntemlerini kabul ediyoruz. Bazı şubelerimizde mobil ödeme de mevcuttur.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-[#14543c] mb-3 font-header">
                  Franchise başvurusu nasıl yapabilirim?
                </h3>
                <p className="text-gray-700 text-sm">
                  Franchise başvurusu için franchise@pidebypide.com adresine mail gönderebilir veya iletişim formunu kullanabilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
