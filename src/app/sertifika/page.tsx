import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import OpinionBar from "@/components/UI/OpinionBar";

export default function Sertifika() {
  return (
    <div className="layout--sertifika bg-white min-h-screen">
      <OpinionBar />
      <Header />
      
      <main className="min-h-screen py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Sertifikalarımız</h1>
            
            <div className="text-center mb-12">
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Kalite ve güven standartlarımızı belgeleyen sertifikalarımızla 
                müşterilerimize en yüksek kalitede hizmet sunmaya devam ediyoruz.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Gıda Güvenliği Sertifikası */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-64 bg-gray-100 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">📜</div>
                    <p>Gıda Güvenliği<br/>Sertifikası</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Gıda Güvenliği Sertifikası</h3>
                  <p className="text-gray-600 text-sm">
                    HACCP ve ISO 22000 standartlarına uygun gıda güvenliği 
                    yönetim sistemi sertifikamız.
                  </p>
                </div>
              </div>

              {/* Kalite Yönetim Sistemi */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-64 bg-gray-100 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">🏆</div>
                    <p>ISO 9001<br/>Kalite Yönetimi</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">ISO 9001 Kalite Yönetimi</h3>
                  <p className="text-gray-600 text-sm">
                    Kalite yönetim sistemi standardımızı belgeleyen 
                    uluslararası geçerliliğe sahip sertifikamız.
                  </p>
                </div>
              </div>

              {/* Hijyen Sertifikası */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-64 bg-gray-100 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">🧼</div>
                    <p>Hijyen<br/>Sertifikası</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Hijyen Sertifikası</h3>
                  <p className="text-gray-600 text-sm">
                    Restoran hijyen standartlarına uygunluğumuzu 
                    belgeleyen sağlık bakanlığı onaylı sertifikamız.
                  </p>
                </div>
              </div>

              {/* Çevre Yönetimi */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-64 bg-gray-100 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">🌱</div>
                    <p>Çevre Yönetimi<br/>ISO 14001</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Çevre Yönetimi ISO 14001</h3>
                  <p className="text-gray-600 text-sm">
                    Çevreye duyarlı işletmecilik anlayışımızı belgeleyen 
                    çevre yönetim sistemi sertifikamız.
                  </p>
                </div>
              </div>

              {/* Helal Gıda Sertifikası */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-64 bg-gray-100 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">✅</div>
                    <p>Helal Gıda<br/>Sertifikası</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Helal Gıda Sertifikası</h3>
                  <p className="text-gray-600 text-sm">
                    Ürünlerimizin helal standartlara uygunluğunu 
                    belgeleyen dini kurumlar onaylı sertifikamız.
                  </p>
                </div>
              </div>

              {/* İş Güvenliği Sertifikası */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-64 bg-gray-100 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">🛡️</div>
                    <p>İş Güvenliği<br/>OHSAS 18001</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">İş Güvenliği OHSAS 18001</h3>
                  <p className="text-gray-600 text-sm">
                    Çalışan sağlığı ve güvenliği yönetim sistemi 
                    standartlarımızı belgeleyen sertifikamız.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-8 mt-12 text-center">
              <h2 className="text-2xl font-bold mb-4 text-orange-600">Kalite Politikamız</h2>
              <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Pide By Pide olarak, tüm süreçlerimizde en yüksek kalite standartlarını 
                korumayı ve sürekli gelişim ilkesini benimser. Müşteri memnuniyeti, 
                gıda güvenliği ve çevre duyarlılığı önceliklerimizin başında gelir.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
