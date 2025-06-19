import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import OpinionBar from "@/components/UI/OpinionBar";

export default function Iletisim() {
  const iletisimBilgileri = [
    {
      baslik: "Genel Merkez",
      adres: "Atatürk Bulvarı No:123, Çankaya/Ankara",
      telefon: "0312 555 77 88",
      email: "info@pidebypide.com",
      saat: "Pazartesi-Cuma: 09:00-18:00"
    },
    {
      baslik: "Müşteri Hizmetleri",
      adres: "7/24 Çağrı Merkezi",
      telefon: "0850 555 77 99",
      email: "musteri@pidebypide.com",
      saat: "7 gün 24 saat"
    },
    {
      baslik: "Franchise Bilgi",
      adres: "İş Geliştirme Departmanı",
      telefon: "0532 123 45 67",
      email: "franchise@pidebypide.com",
      saat: "Pazartesi-Cuma: 09:00-17:00"
    }
  ];

  const sosyalMedya = [
    {
      platform: "Facebook",
      hesap: "@pidebypide",
      link: "https://facebook.com/pidebypide",
      icon: "📘"
    },
    {
      platform: "Instagram", 
      hesap: "@pidebypide",
      link: "https://instagram.com/pidebypide",
      icon: "📷"
    },
    {
      platform: "Twitter",
      hesap: "@pidebypide",
      link: "https://twitter.com/pidebypide", 
      icon: "🐦"
    },
    {
      platform: "YouTube",
      hesap: "PidebyPide Official",
      link: "https://youtube.com/pidebypide",
      icon: "📺"
    }
  ];

  const departmanlar = [
    {
      departman: "İnsan Kaynakları",
      sorumlu: "Ayşe Demir",
      telefon: "0312 555 77 90",
      email: "ik@pidebypide.com"
    },
    {
      departman: "Pazarlama",
      sorumlu: "Mehmet Kaya",
      telefon: "0312 555 77 91", 
      email: "pazarlama@pidebypide.com"
    },
    {
      departman: "Operasyon",
      sorumlu: "Fatma Öztürk",
      telefon: "0312 555 77 92",
      email: "operasyon@pidebypide.com"
    },
    {
      departman: "Satın Alma",
      sorumlu: "Ali Yılmaz",
      telefon: "0312 555 77 93",
      email: "satinalma@pidebypide.com"
    }
  ];

  return (
    <div className="layout--iletisim bg-white min-h-screen">
      <OpinionBar />
      <Header />
      
      <main className="min-h-screen py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-6 text-gray-800">
                İletişim
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Bizimle iletişime geçmek için aşağıdaki iletişim bilgilerini kullanabilir, 
                soru, öneri ve şikayetlerinizi bizimle paylaşabilirsiniz.
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
