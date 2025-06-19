import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import OpinionBar from '@/components/UI/OpinionBar';

export default function FranchisePage() {
  const franchiseAvantajlari = [
    {
      icon: "🏪",
      title: "Güçlü Marka",
      description: "Türkiye'nin sevilen pide markası olarak güçlü bir marka imajı"
    },
    {
      icon: "📈",
      title: "Kanıtlanmış İş Modeli",
      description: "Yıllardır test edilmiş ve başarısı kanıtlanmış iş modeli"
    },
    {
      icon: "🎯",
      title: "Kapsamlı Eğitim",
      description: "İşletme yönetimi, ürün hazırlama ve müşteri hizmetleri eğitimleri"
    },
    {
      icon: "🛠️",
      title: "Teknik Destek",
      description: "7/24 teknik destek ve sürekli operasyonel yardım"
    },
    {
      icon: "📊",
      title: "Pazarlama Desteği",
      description: "Ulusal ve yerel pazarlama kampanyaları desteği"
    },
    {
      icon: "🚚",
      title: "Tedarik Zinciri",
      description: "Güvenilir tedarikçi ağı ve kaliteli hammadde temini"
    }
  ];

  const franchiseKosullari = [
    {
      title: "Minimum Yatırım",
      value: "150.000 ₺",
      description: "Franchise ücreti ve başlangıç yatırımı dahil"
    },
    {
      title: "Mekan Büyüklüğü",
      value: "80-120 m²",
      description: "Minimum mekan büyüklüğü gereksinimi"
    },
    {
      title: "Lokasyon",
      value: "Ana Cadde/AVM",
      description: "Yoğun trafiğe sahip ticari alanlar tercih edilir"
    },
    {
      title: "Deneyim",
      value: "Zorunlu Değil",
      description: "Restoran deneyimi şart değil, eğitim verilir"
    }
  ];

  return (
    <div className="layout--franchise bg-white min-h-screen">
      <OpinionBar />
      <Header />
      
      <main className="min-h-screen py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-6 text-gray-800">
                Franchise Fırsatı
              </h1>              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Türkiye&apos;nin sevilen pide markası ile iş ortağı olun. Kanıtlanmış iş modelimiz ve 
                güçlü marka değerimizle kendi işinizi kurmanın keyfini çıkarın.
              </p>
            </div>

            {/* Franchise Avantajları */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
                Franchise Avantajları
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {franchiseAvantajlari.map((avantaj, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                    <div className="text-4xl mb-4">{avantaj.icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">{avantaj.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{avantaj.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Franchise Koşulları */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
                Franchise Koşulları
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {franchiseKosullari.map((kosul, index) => (
                  <div key={index} className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 text-center">
                    <h3 className="text-lg font-bold mb-2 text-orange-700">{kosul.title}</h3>
                    <div className="text-2xl font-bold text-orange-600 mb-2">{kosul.value}</div>
                    <p className="text-sm text-gray-600">{kosul.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Süreç Adımları */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
                Franchise Süreci
              </h2>
              
              <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      1
                    </div>
                    <h3 className="font-bold mb-2 text-gray-800">Başvuru</h3>
                    <p className="text-sm text-gray-600">Online başvuru formunu doldurun ve bizimle iletişime geçin</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      2
                    </div>
                    <h3 className="font-bold mb-2 text-gray-800">Değerlendirme</h3>
                    <p className="text-sm text-gray-600">Başvurunuz değerlendirilir ve lokasyon analizi yapılır</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      3
                    </div>
                    <h3 className="font-bold mb-2 text-gray-800">Sözleşme</h3>
                    <p className="text-sm text-gray-600">Franchise sözleşmesi imzalanır ve ödeme planı belirlenir</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      4
                    </div>
                    <h3 className="font-bold mb-2 text-gray-800">Açılış</h3>
                    <p className="text-sm text-gray-600">Eğitim, kurulum ve grand opening ile işiniz başlar</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Destek Hizmetleri */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
                Sürekli Destek Hizmetlerimiz
              </h2>
              
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800">Operasyonel Destek</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Günlük operasyon yönetimi rehberliği</li>
                      <li>• Kalite kontrol ve standart takibi</li>
                      <li>• Müşteri hizmetleri eğitimleri</li>
                      <li>• Performans analizi ve raporlama</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800">Pazarlama Desteği</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Ulusal reklam kampanyaları</li>
                      <li>• Yerel pazarlama materyalleri</li>
                      <li>• Sosyal medya yönetimi desteği</li>
                      <li>• Promosyon ve etkinlik planlaması</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* İletişim Formu */}
            <section className="mb-16">
              <div className="bg-orange-500 text-white rounded-lg p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Hemen Başvurun!</h2>
                <p className="text-lg mb-6 opacity-90">
                  Franchise fırsatı hakkında detaylı bilgi almak için bizimle iletişime geçin.
                </p>
                <div className="space-y-4 max-w-md mx-auto">
                  <div className="text-left">
                    <p className="font-bold">Franchise Koordinatörü:</p>
                    <p>Mehmet Yılmaz</p>
                    <p>📞 0532 123 45 67</p>
                    <p>✉️ franchise@pidebypide.com</p>
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
                  <h3 className="font-bold text-gray-800 mb-2">Franchise ücreti ne kadar?</h3>
                  <p className="text-gray-600">Franchise ücreti 50.000 ₺ olup, toplam yatırım tutarı lokasyon ve büyüklüğe göre 150.000-200.000 ₺ arasında değişmektedir.</p>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="font-bold text-gray-800 mb-2">Eğitim süreci nasıl işliyor?</h3>
                  <p className="text-gray-600">2 haftalık teorik eğitim merkezimizde, 1 haftalık praktik eğitim mevcut şubelerimizde verilmektedir. Eğitim ücretsizdir.</p>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="font-bold text-gray-800 mb-2">Geri ödeme süresi ne kadar?</h3>
                  <p className="text-gray-600">Ortalama geri ödeme süresi 18-24 ay arasında değişmektedir. Bu süre lokasyon ve işletme verimliliğine bağlıdır.</p>
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
