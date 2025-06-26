import ContactForm from "@/components/ContactForm";
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@/components/Icons/ContactIcons";
import Link from "next/link";
import Image from "next/image";

export default function IletisimPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Sayfa Başlığı ve Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-header font-bold text-[#14543c] mb-2">İLETİŞİM</h1>
          <nav className="text-sm text-gray-500">
            <ol className="flex flex-wrap">
              <li className="flex items-center">
                <Link href="/" className="text-[#14543c] hover:text-[#f29b24]">Anasayfa</Link>
                <span className="mx-2">/</span>
              </li>
              <li>İletişim</li>
            </ol>
          </nav>
        </div>
      </div>
      
      {/* İletişim İçeriği */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {/* İletişim Bilgileri Bölümü */}
              <div>
                <h2 className="text-2xl font-bold text-[#14543c] mb-6 font-header">İletişim Bilgilerimiz</h2>
                
                <div className="space-y-6">
                  {/* Genel Merkez */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl text-gray-800">Genel Merkez:</h3>
                    <div className="flex items-start space-x-3">
                      <MapPinIcon className="w-6 h-6 text-[#14543c] mt-1 flex-shrink-0" />
                      <p className="text-gray-700">Pide By Pide Genel Merkez</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <PhoneIcon className="w-6 h-6 text-[#14543c] flex-shrink-0" />
                      <a href="tel:08504417433" className="text-gray-700 hover:text-[#14543c]">0850 441 7433</a>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <EnvelopeIcon className="w-6 h-6 text-[#14543c] flex-shrink-0" />
                      <a href="mailto:info@pidebypide.com" className="text-gray-700 hover:text-[#14543c]">info@pidebypide.com</a>
                    </div>
                  </div>
                  
                  <hr className="border-gray-200" />
                  
                  {/* Müşteri Hizmetleri */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-gray-800">Müşteri Hizmetleri:</h3>
                    <div className="flex items-center space-x-3">
                      <EnvelopeIcon className="w-6 h-6 text-[#14543c] flex-shrink-0" />
                      <a href="mailto:musterihizmetleri@pidebypide.com" className="text-gray-700 hover:text-[#14543c]">musterihizmetleri@pidebypide.com</a>
                    </div>
                  </div>
                  
                  {/* Franchise */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-gray-800">Franchise:</h3>
                    <div className="flex items-center space-x-3">
                      <EnvelopeIcon className="w-6 h-6 text-[#14543c] flex-shrink-0" />
                      <a href="mailto:franchise@pidebypide.com" className="text-gray-700 hover:text-[#14543c]">franchise@pidebypide.com</a>
                    </div>
                  </div>
                  
                  {/* İnsan Kaynakları */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-gray-800">İnsan Kaynakları:</h3>
                    <div className="flex items-center space-x-3">
                      <EnvelopeIcon className="w-6 h-6 text-[#14543c] flex-shrink-0" />
                      <a href="mailto:ik@pidebypide.com" className="text-gray-700 hover:text-[#14543c]">ik@pidebypide.com</a>
                    </div>
                  </div>
                </div>
                
                {/* Sosyal Medya Bağlantıları */}                <div className="mt-10">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">Bizi Takip Edin:</h3>
                  <div className="flex space-x-4">
                    <Link href="https://www.facebook.com/pidebypide/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <Image 
                        src="/assets/images/social/facebook.png" 
                        alt="Facebook" 
                        width={40} 
                        height={40} 
                        className="hover:opacity-80 transition-opacity"
                      />
                    </Link>
                    <Link href="https://www.instagram.com/pidebypide/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <Image 
                        src="/assets/images/social/instagram.png" 
                        alt="Instagram" 
                        width={40} 
                        height={40} 
                        className="hover:opacity-80 transition-opacity"
                      />
                    </Link>
                    <Link href="https://x.com/pidebypide" target="_blank" rel="noopener noreferrer" aria-label="X">
                      <Image 
                        src="/assets/images/social/x.png" 
                        alt="X" 
                        width={40} 
                        height={40} 
                        className="hover:opacity-80 transition-opacity"
                      />
                    </Link>
                    <Link href="https://tr.linkedin.com/company/pidebypide" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Image 
                        src="/assets/images/social/linkedin.png" 
                        alt="LinkedIn" 
                        width={40} 
                        height={40} 
                        className="hover:opacity-80 transition-opacity"
                      />
                    </Link>
                  </div>
              </p>
            </div>

            {/* Ana İletişim Bilgileri */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
                İletişim Bilgileri
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {iletisimBilgileri.map((bilgi, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{bilgi.baslik}</h3>
                    <div className="space-y-3 text-gray-600">
                      <div className="flex items-center justify-center">
                        <span className="text-orange-500 mr-2">📍</span>
                        <span className="text-sm">{bilgi.adres}</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="text-orange-500 mr-2">📞</span>
                        <span className="text-sm font-medium">{bilgi.telefon}</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="text-orange-500 mr-2">✉️</span>
                        <span className="text-sm">{bilgi.email}</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="text-orange-500 mr-2">🕐</span>
                        <span className="text-sm">{bilgi.saat}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* İletişim Formu */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
                Bize Ulaşın
              </h2>
              
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ad Soyad *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Adınızı ve soyadınızı girin"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          E-posta *
                        </label>
                        <input
                          type="email"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="E-posta adresinizi girin"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Telefon
                        </label>
                        <input
                          type="tel"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Telefon numaranızı girin"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Konu *
                        </label>
                        <select
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                          <option value="">Konu seçin</option>
                          <option value="genel">Genel Bilgi</option>
                          <option value="sikayet">Şikayet</option>
                          <option value="oneri">Öneri</option>
                          <option value="franchise">Franchise</option>
                          <option value="kariyer">Kariyer</option>
                          <option value="medya">Basın/Medya</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mesajınız *
                      </label>
                      <textarea
                        required
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Mesajınızı detaylı olarak yazın..."
                      ></textarea>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="kvkk"
                        required
                        className="mr-2"
                      />
                      <label htmlFor="kvkk" className="text-sm text-gray-600">
                        <a href="#" className="text-orange-600 hover:text-orange-700">KVKK Aydınlatma Metni</a>&apos;ni 
                        okudum ve kabul ediyorum. *
                      </label>
                    </div>
                    
                    <div className="text-center">
                      <button
                        type="submit"
                        className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-bold"
                      >
                        Mesajı Gönder
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>

            {/* Departmanlar */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
                Departmanlarımız
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {departmanlar.map((dept, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{dept.departman}</h3>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center">
                        <span className="text-orange-500 mr-2">👨‍💼</span>
                        <span>{dept.sorumlu}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-orange-500 mr-2">📞</span>
                        <span>{dept.telefon}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-orange-500 mr-2">✉️</span>
                        <span>{dept.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Sosyal Medya */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
                Sosyal Medyada Takip Edin
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {sosyalMedya.map((sosyal, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                    <div className="text-4xl mb-4">{sosyal.icon}</div>
                    <h3 className="font-bold text-gray-800 mb-2">{sosyal.platform}</h3>
                    <p className="text-gray-600 text-sm mb-4">{sosyal.hesap}</p>
                    <a
                      href={sosyal.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm"
                    >
                      Takip Et
                    </a>
                  </div>
                ))}
              </div>
            </section>

            {/* Harita ve Konum */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
                Genel Merkez Konumu
              </h2>
              
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">📍</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">PidebyPide Genel Merkez</h3>
                  <p className="text-gray-600">Atatürk Bulvarı No:123, Çankaya/Ankara</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-white rounded-lg p-4 text-center shadow">
                    <div className="text-2xl mb-2">🚌</div>
                    <h4 className="font-bold text-gray-800 mb-1">Toplu Taşıma</h4>
                    <p className="text-sm text-gray-600">Metro: Kızılay İstasyonu (5 dk yürüyüş)</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 text-center shadow">
                    <div className="text-2xl mb-2">🚗</div>
                    <h4 className="font-bold text-gray-800 mb-1">Otopark</h4>
                    <p className="text-sm text-gray-600">Ücretsiz otopark mevcuttur</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 text-center shadow">
                    <div className="text-2xl mb-2">♿</div>
                    <h4 className="font-bold text-gray-800 mb-1">Erişilebilirlik</h4>
                    <p className="text-sm text-gray-600">Engelli erişimi mevcuttur</p>
                  </div>
                </div>
              </div>
            </section>

            {/* SSS */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
                Sıkça Sorulan Sorular
              </h2>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="font-bold text-gray-800 mb-2">Paket servis yapıyor musunuz?</h3>
                  <p className="text-gray-600">Evet, tüm şubelerimizde paket servis hizmeti mevcuttur. Minimum sipariş tutarı ve teslimat ücreti için şubemizi arayabilirsiniz.</p>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="font-bold text-gray-800 mb-2">Rezervasyon yaptırmak gerekiyor mu?</h3>
                  <p className="text-gray-600">Normal günlerde rezervasyon şart değildir. Ancak büyük grup yemekleri ve özel günlerde rezervasyon yaptırmanızı öneriyoruz.</p>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="font-bold text-gray-800 mb-2">Hangi ödeme yöntemlerini kabul ediyorsunuz?</h3>
                  <p className="text-gray-600">Nakit, kredi kartı, banka kartı ve online ödeme yöntemlerini kabul ediyoruz. Bazı şubelerimizde mobil ödeme de mevcuttur.</p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
