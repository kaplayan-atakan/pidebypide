import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import OpinionBar from "@/components/UI/OpinionBar";

export default function GorusVeOnerileriniz() {
  const musteriYorumlari = [
    {
      id: 1,
      name: "Ayşe Kaya",
      date: "15 Mart 2024",
      rating: 5,
      comment: "Pideleriniz gerçekten çok lezzetli! Özellikle kaşarlı pide favorim. Personel çok ilgili ve güleryüzlü. Teşekkür ederiz.",
      location: "İstanbul Kadıköy Şubesi"
    },
    {
      id: 2,
      name: "Mehmet Demir",
      date: "12 Mart 2024", 
      rating: 5,
      comment: "Ailemle birlikte geldiğimiz her seferinde memnun ayrılıyoruz. Hem kaliteli hem de uygun fiyatlı. Kesinlikle tavsiye ederim.",
      location: "Ankara Kızılay Şubesi"
    },
    {
      id: 3,
      name: "Fatma Özdemir",
      date: "10 Mart 2024",
      rating: 5,
      comment: "Paket servis çok hızlı ve sıcak geldi. Karışık pidemiz enfesti! Çocuklarım da çok sevdi.",
      location: "İzmir Alsancak Şubesi"
    },
    {
      id: 4,
      name: "Ali Yılmaz",
      date: "8 Mart 2024",
      rating: 4,
      comment: "Lezzet harika, ortam güzel. Sadece servis biraz yavaştı ama sonuçta memnun kaldık.",
      location: "Bursa Şubesi"
    }
  ];

  const istatistikler = [
    {
      title: "Müşteri Memnuniyeti",
      value: "%97",
      icon: "😊"
    },
    {
      title: "Ortalama Puan",
      value: "4.8/5",
      icon: "⭐"
    },
    {
      title: "Toplam Yorum",
      value: "2,847",
      icon: "💬"
    },
    {
      title: "Tekrar Tercih Oranı",
      value: "%94",
      icon: "🔄"
    }
  ];

  const kategoriler = [
    {
      kategori: "Lezzet ve Kalite",
      puan: 4.9,
      yuzde: 98
    },
    {
      kategori: "Hizmet Kalitesi",
      puan: 4.7,
      yuzde: 94
    },
    {
      kategori: "Temizlik ve Hijyen",
      puan: 4.8,
      yuzde: 96
    },
    {
      kategori: "Fiyat/Performans",
      puan: 4.6,
      yuzde: 92
    },
    {
      kategori: "Ortam ve Atmosfer",
      puan: 4.5,
      yuzde: 90
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
        ⭐
      </span>
    ));
  };

  return (
    <div className="layout--gorus-ve-onerileriniz bg-white min-h-screen">
      <OpinionBar />
      <Header />
      
      <main className="min-h-screen py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-6 text-gray-800">
                Görüş ve Önerileriniz
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Değerli müşterilerimizin görüş ve önerilerini çok önemsiyoruz. 
                Sizlerden gelen geri bildirimler, hizmet kalitemizi artırmamızda büyük rol oynuyor.
              </p>
            </div>

            {/* Müşteri Memnuniyeti İstatistikleri */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
                Müşteri Memnuniyeti
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {istatistikler.map((stat, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                    <div className="text-4xl mb-4">{stat.icon}</div>
                    <h3 className="text-2xl font-bold text-orange-600 mb-2">{stat.value}</h3>
                    <p className="text-gray-600 font-medium">{stat.title}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Kategori Bazında Puanlar */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
                Hizmet Kalitesi Puanlarımız
              </h2>
              
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="space-y-6">
                  {kategoriler.map((kategori, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-bold text-gray-800">{kategori.kategori}</h3>
                          <span className="font-bold text-orange-600">{kategori.puan}/5.0</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-orange-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${kategori.yuzde}%` }}
                          ></div>
                        </div>
                        <div className="text-right mt-1">
                          <span className="text-sm text-gray-600">{kategori.yuzde}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Son Müşteri Yorumları */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
                Son Müşteri Yorumları
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {musteriYorumlari.map((yorum) => (
                  <div key={yorum.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-gray-800">{yorum.name}</h3>
                        <p className="text-sm text-gray-500">{yorum.date}</p>
                        <p className="text-xs text-orange-600">{yorum.location}</p>
                      </div>
                      <div className="flex">
                        {renderStars(yorum.rating)}
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">&quot;{yorum.comment}&quot;</p>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors">
                  Tüm Yorumları Görüntüle
                </button>
              </div>
            </section>

            {/* Yorum Yapma Formu */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
                Yorumunuzu Paylaşın
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
                          Ziyaret Ettiğiniz Şube *
                        </label>
                        <select
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                          <option value="">Şube seçin</option>
                          <option value="kadikoy">İstanbul Kadıköy</option>
                          <option value="besiktas">İstanbul Beşiktaş</option>
                          <option value="kizilay">Ankara Kızılay</option>
                          <option value="alsancak">İzmir Alsancak</option>
                          <option value="bursa">Bursa</option>
                          <option value="antalya">Antalya</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Genel Puanınız *
                        </label>
                        <div className="flex items-center space-x-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              className="text-2xl text-gray-300 hover:text-yellow-400 transition-colors"
                            >
                              ⭐
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        En Çok Beğendiğiniz Ürün
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Örn: Kaşarlı Pide, Karışık Pide..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Yorumunuz *
                      </label>
                      <textarea
                        required
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Deneyiminizi, beğendiğiniz noktaları ve önerilerinizi paylaşın..."
                      ></textarea>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Lezzet</label>
                        <select className="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                          <option>5 - Mükemmel</option>
                          <option>4 - Çok İyi</option>
                          <option>3 - İyi</option>
                          <option>2 - Orta</option>
                          <option>1 - Kötü</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Hizmet</label>
                        <select className="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                          <option>5 - Mükemmel</option>
                          <option>4 - Çok İyi</option>
                          <option>3 - İyi</option>
                          <option>2 - Orta</option>
                          <option>1 - Kötü</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Temizlik</label>
                        <select className="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                          <option>5 - Mükemmel</option>
                          <option>4 - Çok İyi</option>
                          <option>3 - İyi</option>
                          <option>2 - Orta</option>
                          <option>1 - Kötü</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Fiyat</label>
                        <select className="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                          <option>5 - Mükemmel</option>
                          <option>4 - Çok İyi</option>
                          <option>3 - İyi</option>
                          <option>2 - Orta</option>
                          <option>1 - Kötü</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ortam</label>
                        <select className="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                          <option>5 - Mükemmel</option>
                          <option>4 - Çok İyi</option>
                          <option>3 - İyi</option>
                          <option>2 - Orta</option>
                          <option>1 - Kötü</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="yayin"
                        className="mr-2"
                      />
                      <label htmlFor="yayin" className="text-sm text-gray-600">
                        Yorumumun web sitesinde yayınlanmasına izin veriyorum.
                      </label>
                    </div>
                    
                    <div className="text-center">
                      <button
                        type="submit"
                        className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-bold"
                      >
                        Yorumu Gönder
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>

            {/* Öneriler Bölümü */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
                Bizden Beklentileriniz
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <div className="text-4xl mb-4">🍽️</div>
                  <h3 className="font-bold text-gray-800 mb-2">Yeni Lezzetler</h3>
                  <p className="text-gray-600 text-sm">
                    Menümüze eklemek istediğiniz yeni pide çeşitleri ve lezzetler hakkında önerilerinizi bekliyoruz.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <div className="text-4xl mb-4">🏪</div>
                  <h3 className="font-bold text-gray-800 mb-2">Yeni Şubeler</h3>
                  <p className="text-gray-600 text-sm">
                    Hangi şehirlerde şube açmamızı istiyorsanız, taleplerini bizimle paylaşın.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="font-bold text-gray-800 mb-2">Hizmet İyileştirme</h3>
                  <p className="text-gray-600 text-sm">
                    Hizmet kalitemizi artırmak için önerilerinizi ve eleştirilerinizi önemsiyoruz.
                  </p>
                </div>
              </div>
            </section>

            {/* Teşekkür Mesajı */}
            <section className="mb-16">
              <div className="bg-orange-500 text-white rounded-lg p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Teşekkür Ederiz!</h2>
                <p className="text-lg opacity-90 max-w-2xl mx-auto">
                  Görüş ve önerilerinizi bizimle paylaştığınız için teşekkür ederiz. 
                  Her bir geri bildiriminiz, daha iyi hizmet verebilmemiz için değerlidir.
                </p>
              </div>
            </section>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
