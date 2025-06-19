import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import OpinionBar from "@/components/UI/OpinionBar";

export default function Kariyer() {
  return (
    <div className="layout--kariyer bg-white min-h-screen">
      <OpinionBar />
      <Header />
      
      <main className="min-h-screen py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Kariyer</h1>
            
            <div className="text-center mb-12">
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Pide By Pide ailesine katılmak istiyorsunuz? Bizimle birlikte büyüyen, 
                gelişen ve başarıya ulaşan bir kariyere başlayın!
              </p>
            </div>

            {/* Neden Biz? */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-orange-600">Neden Pide By Pide?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="text-orange-500 text-xl">🚀</div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Hızlı Büyüyen Şirket</h3>
                    <p className="text-gray-600 text-sm">Sürekli büyüyen organizasyonumuzda kariyer fırsatları</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-orange-500 text-xl">📚</div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Eğitim ve Gelişim</h3>
                    <p className="text-gray-600 text-sm">Sürekli eğitim ve kişisel gelişim programları</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-orange-500 text-xl">👥</div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Takım Ruhu</h3>
                    <p className="text-gray-600 text-sm">Pozitif çalışma ortamı ve güçlü takım kültürü</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-orange-500 text-xl">💰</div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Rekabetçi Maaş</h3>
                    <p className="text-gray-600 text-sm">Adil ve rekabetçi ücret politikası</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Açık Pozisyonlar */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-orange-600">Açık Pozisyonlar</h2>
              
              <div className="space-y-6">
                {/* Şef Pozisyonu */}
                <div className="border-l-4 border-orange-500 pl-6 py-4 bg-gray-50 rounded-r-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Pide Şefi</h3>
                  <p className="text-gray-600 mb-2">📍 Ankara, İstanbul, İzmir</p>
                  <p className="text-gray-600 mb-4">
                    Geleneksel pide yapımında deneyimli, kalite odaklı şef arayışımız devam ediyor.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Tam Zamanlı</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Deneyimli</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Minimum 3 yıl pide yapım deneyimi</li>
                    <li>• Hijyen kurallarına uyum</li>
                    <li>• Takım çalışmasına yatkınlık</li>
                  </ul>
                </div>

                {/* Garson Pozisyonu */}
                <div className="border-l-4 border-orange-500 pl-6 py-4 bg-gray-50 rounded-r-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Garson</h3>
                  <p className="text-gray-600 mb-2">📍 Tüm Şubeler</p>
                  <p className="text-gray-600 mb-4">
                    Müşteri odaklı, enerjik ve güler yüzlü garson arkadaşlar arıyoruz.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Tam/Yarı Zamanlı</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Giriş Seviyesi</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• İyi iletişim becerileri</li>
                    <li>• Müşteri odaklı yaklaşım</li>
                    <li>• Vardiyalı çalışmaya uyum</li>
                  </ul>
                </div>

                {/* Kasiyer Pozisyonu */}
                <div className="border-l-4 border-orange-500 pl-6 py-4 bg-gray-50 rounded-r-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Kasiyer</h3>
                  <p className="text-gray-600 mb-2">📍 Tüm Şubeler</p>
                  <p className="text-gray-600 mb-4">
                    Dikkatli, güvenilir ve sayısal beceriler güçlü kasiyer arayışımız.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Tam Zamanlı</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">1-2 Yıl Deneyim</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• POS sistemleri deneyimi</li>
                    <li>• Matematik becerisi</li>
                    <li>• Dikkat ve hassasiyet</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Başvuru Formu */}
            <div className="bg-orange-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">Başvuru Yapın</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                      placeholder="e-posta@ornek.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                      placeholder="0xxx xxx xx xx"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      İlgilendiğiniz Pozisyon *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">Pozisyon seçin</option>
                      <option value="pide-sefi">Pide Şefi</option>
                      <option value="garson">Garson</option>
                      <option value="kasiyer">Kasiyer</option>
                      <option value="diger">Diğer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Şehir Tercihi
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Çalışmak istediğiniz şehir"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deneyimleriniz ve Mesajınız
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Deneyimlerinizden bahsedin ve neden bizimle çalışmak istediğinizi yazın..."
                  ></textarea>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-bold"
                  >
                    Başvuruyu Gönder
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
