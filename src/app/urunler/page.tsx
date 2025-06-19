import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import OpinionBar from "@/components/UI/OpinionBar";
import Image from "next/image";

export default function Urunler() {
  const pideTurleri = [
    {
      id: 1,
      name: "Klasik Kaşarlı Pide",
      description: "Taze kaşar peyniri ile hazırlanan geleneksel pidemizdeki lezzet.",
      price: "45₺",
      image: "/assets/images/pide1.jpg"
    },
    {
      id: 2,
      name: "Kıymalı Pide",
      description: "Özel baharatlarla marine edilmiş taze kıyma ile hazırlanan pide.",
      price: "55₺",
      image: "/assets/images/pide2.jpg"
    },
    {
      id: 3,
      name: "Karışık Pide",
      description: "Kaşar, kıyma, sucuk ve yumurta ile zengin karışım.",
      price: "65₺",
      image: "/assets/images/pide3.jpg"
    },
    {
      id: 4,
      name: "Sucuklu Pide",
      description: "Özel dana sucuğu ve kaşar peyniri ile lezzet şöleni.",
      price: "50₺",
      image: "/assets/images/web_pide-05.jpg"
    },
    {
      id: 5,
      name: "Sebzeli Pide",
      description: "Taze sebzeler, domates, biber ve kaşar peyniri ile sağlıklı lezzet.",
      price: "40₺",
      image: "/assets/images/pide1.jpg"
    },
    {
      id: 6,
      name: "Mantarlı Pide",
      description: "Taze mantar, kaşar peyniri ile doğal tatlar.",
      price: "45₺",
      image: "/assets/images/pide2.jpg"
    }
  ];

  const icecekler = [
    { name: "Ayran", price: "8₺" },
    { name: "Kola", price: "10₺" },
    { name: "Fanta", price: "10₺" },
    { name: "Su", price: "5₺" },
    { name: "Çay", price: "6₺" },
    { name: "Türk Kahvesi", price: "15₺" }
  ];
  return (
    <div className="layout--urunler bg-white min-h-screen">
      <OpinionBar />
      <Header />
      
      <main className="min-h-screen py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Ürünlerimiz</h1>
            
            <div className="text-center mb-12">
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Geleneksel tariflerle hazırlanan taze pidelerimiz ve lezzetli içeceklerimizle 
                size unutulmaz bir tat deneyimi sunuyoruz.
              </p>
            </div>

            {/* Pide Çeşitleri */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">Pide Çeşitlerimiz</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pideTurleri.map((pide) => (
                  <div key={pide.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={pide.image}
                        alt={pide.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-gray-800">{pide.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {pide.description}
                      </p>                      <div className="text-center">
                        <span className="text-2xl font-bold text-orange-600">{pide.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* İçecekler */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">İçeceklerimiz</h2>
              
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {icecekler.map((icecek, index) => (
                    <div key={index} className="text-center p-4 rounded-lg bg-gray-50 hover:bg-orange-50 transition-colors">
                      <div className="text-2xl mb-2">🥤</div>
                      <h3 className="font-bold text-gray-800 mb-1">{icecek.name}</h3>
                      <p className="text-orange-600 font-bold">{icecek.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Özel Menüler */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">Özel Menülerimiz</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Aile Menüsü */}
                <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg p-8 shadow-lg">
                  <h3 className="text-2xl font-bold mb-4 text-orange-700">👨‍👩‍👧‍👦 Aile Menüsü</h3>
                  <ul className="space-y-2 text-gray-700 mb-6">
                    <li>• 2 Büyük Karışık Pide</li>
                    <li>• 4 Ayran</li>
                    <li>• Turşu ve Salata</li>
                    <li>• Çay İkramı</li>
                  </ul>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 line-through">Normal Fiyat: 160₺</span>
                    <span className="text-2xl font-bold text-orange-600">120₺</span>
                  </div>
                </div>

                {/* İkili Menü */}
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg p-8 shadow-lg">
                  <h3 className="text-2xl font-bold mb-4 text-blue-700">❤️ İkili Menü</h3>
                  <ul className="space-y-2 text-gray-700 mb-6">
                    <li>• 2 Orta Boy Pide (Seçiminize Göre)</li>
                    <li>• 2 İçecek</li>
                    <li>• Salata</li>
                    <li>• Tatlı İkramı</li>
                  </ul>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 line-through">Normal Fiyat: 90₺</span>
                    <span className="text-2xl font-bold text-blue-600">75₺</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Özel Bilgiler */}
            <div className="bg-orange-50 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4 text-orange-600">Özel Notlar</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
                <div>
                  <div className="text-2xl mb-2">🥖</div>
                  <p><strong>Taze Hamur:</strong> Pidelerimiz günlük taze hamurla hazırlanır</p>
                </div>
                <div>
                  <div className="text-2xl mb-2">🧀</div>
                  <p><strong>Kaliteli Malzemeler:</strong> Sadece premium kalite malzemeler kullanırız</p>
                </div>
                <div>
                  <div className="text-2xl mb-2">🚚</div>
                  <p><strong>Paket Servis:</strong> Tüm ürünlerimiz paket servis olarak da mevcuttur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
