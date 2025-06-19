'use client';

import { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import OpinionBar from "@/components/UI/OpinionBar";

export default function Subeler() {
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    // URL hash'inden şehir bilgisini al
    const hash = window.location.hash.substring(1);
    if (hash) {
      setSelectedCity(hash);
    }
  }, []);

  const subeler = [
    {
      id: 1,
      name: "Kadıköy Şubesi",
      city: "istanbul",
      cityName: "İstanbul",
      address: "Bahariye Caddesi No:45, Kadıköy/İstanbul",
      phone: "0216 414 25 36",
      hours: "09:00 - 23:00",
      features: ["Wifi", "Klima", "Otopark", "Paket Servis"],
      manager: "Ahmet Yılmaz"
    },
    {
      id: 2,
      name: "Beşiktaş Şubesi", 
      city: "istanbul",
      cityName: "İstanbul",
      address: "Barbaros Bulvarı No:78, Beşiktaş/İstanbul",
      phone: "0212 259 63 74",
      hours: "08:30 - 24:00",
      features: ["Wifi", "Klima", "Terras", "Paket Servis"],
      manager: "Mehmet Demir"
    },
    {
      id: 3,
      name: "Ankara Kızılay Şubesi",
      city: "ankara",
      cityName: "Ankara",
      address: "Kızılay Meydanı No:12, Çankaya/Ankara",
      phone: "0312 418 52 69",
      hours: "09:00 - 23:30",
      features: ["Wifi", "Klima", "Aile Odası", "Paket Servis"],
      manager: "Fatma Öztürk"
    },
    {
      id: 4,
      name: "İzmir Alsancak Şubesi",
      city: "izmir",
      cityName: "İzmir",
      address: "Kordon Caddesi No:89, Konak/İzmir",
      phone: "0232 463 85 27",
      hours: "09:00 - 23:00",
      features: ["Wifi", "Klima", "Deniz Manzarası", "Paket Servis"],
      manager: "Can Arslan"
    },
    {
      id: 5,
      name: "Bursa Şubesi",
      city: "bursa",
      cityName: "Bursa",
      address: "Atatürk Caddesi No:156, Osmangazi/Bursa",
      phone: "0224 552 74 18",
      hours: "08:00 - 23:00",
      features: ["Wifi", "Klima", "Bahçe", "Paket Servis"],
      manager: "Zeynep Kaya"
    },
    {
      id: 6,
      name: "Antalya Şubesi",
      city: "antalya",
      cityName: "Antalya",
      address: "Cumhuriyet Caddesi No:34, Muratpaşa/Antalya",
      phone: "0242 315 96 42",
      hours: "09:00 - 24:00",
      features: ["Wifi", "Klima", "Otopark", "Paket Servis"],      manager: "Murat Şen"
    }
  ];

  // Filtrelenmiş şubeler
  const filteredSubeler = selectedCity 
    ? subeler.filter(sube => sube.city === selectedCity)
    : subeler;

  const bolgeKordinatorleri = [
    {
      bolge: "İstanbul Bölgesi",
      koordinator: "Serkan Aydın",
      phone: "0532 147 85 96",
      email: "istanbul@pidebypide.com"
    },
    {
      bolge: "Ankara Bölgesi", 
      koordinator: "Elif Çelik",
      phone: "0533 258 74 63",
      email: "ankara@pidebypide.com"
    },
    {
      bolge: "İzmir Bölgesi",
      koordinator: "Oğuz Kılıç",
      phone: "0534 369 82 51",
      email: "izmir@pidebypide.com"
    },
    {
      bolge: "Diğer Şehirler",
      koordinator: "Ayşe Polat",
      phone: "0535 741 96 38",
      email: "bolge@pidebypide.com"
    }
  ];

  return (
    <div className="layout--subeler bg-white min-h-screen">
      <OpinionBar />
      <Header />
      
      <main className="min-h-screen py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-6 text-gray-800">
                Şubelerimiz
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Türkiye&apos;nin farklı şehirlerinde hizmet veren şubelerimizle, 
                lezzetli pidelerimizi daha geniş bir kitleye ulaştırıyoruz.
              </p>
            </div>            {/* Aktif Şubelerimiz */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
                {selectedCity ? `${filteredSubeler[0]?.cityName || 'Seçilen Şehir'} Şubelerimiz` : 'Aktif Şubelerimiz'}
              </h2>
              
              {selectedCity && (
                <div className="text-center mb-8">
                  <button
                    onClick={() => setSelectedCity('')}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Tüm Şubeleri Göster
                  </button>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSubeler.map((sube) => (
                  <div key={sube.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{sube.name}</h3>
                      <div className="w-16 h-1 bg-orange-500 rounded"></div>
                    </div>
                    
                    <div className="space-y-3 text-gray-600">
                      <div className="flex items-start">
                        <span className="text-orange-500 mr-2">📍</span>
                        <span className="text-sm">{sube.address}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="text-orange-500 mr-2">📞</span>
                        <span className="text-sm font-medium">{sube.phone}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="text-orange-500 mr-2">🕐</span>
                        <span className="text-sm">{sube.hours}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="text-orange-500 mr-2">👨‍💼</span>
                        <span className="text-sm">Şube Müdürü: {sube.manager}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Özellikler:</h4>
                      <div className="flex flex-wrap gap-2">
                        {sube.features.map((feature, index) => (
                          <span key={index} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Harita ve Genel Bilgiler */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
                Şube Haritası
              </h2>
              
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Konumlarımızı Keşfedin</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Size en yakın şubemizi bulmak için haritamızı kullanabilir, 
                  detaylı konum bilgileri ve yol tarifi alabilirsiniz.
                </p>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">                    <div className="bg-white p-4 rounded-lg shadow">
                      <h4 className="font-bold text-orange-600 mb-2">Toplam Şube</h4>
                      <p className="text-2xl font-bold text-gray-800">{filteredSubeler.length}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h4 className="font-bold text-orange-600 mb-2">Hizmet Verdiğimiz Şehir</h4>
                      <p className="text-2xl font-bold text-gray-800">5</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h4 className="font-bold text-orange-600 mb-2">Toplam Kapasite</h4>
                      <p className="text-2xl font-bold text-gray-800">480 Kişi</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Bölge Koordinatörleri */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
                Bölge Koordinatörleri
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {bolgeKordinatorleri.map((koordinator, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{koordinator.bolge}</h3>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center">
                        <span className="text-orange-500 mr-2">👨‍💼</span>
                        <span>{koordinator.koordinator}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-orange-500 mr-2">📞</span>
                        <span>{koordinator.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-orange-500 mr-2">✉️</span>
                        <span>{koordinator.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Yakında Açılacak Şubeler */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
                Yakında Açılacak Şubeler
              </h2>
              
              <div className="bg-orange-50 rounded-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🏗️</div>
                    <h3 className="font-bold text-gray-800 mb-2">Trabzon Şubesi</h3>
                    <p className="text-sm text-gray-600">2024 Yaz</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-4">🏗️</div>
                    <h3 className="font-bold text-gray-800 mb-2">Eskişehir Şubesi</h3>
                    <p className="text-sm text-gray-600">2024 Sonbahar</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-4">🏗️</div>
                    <h3 className="font-bold text-gray-800 mb-2">Adana Şubesi</h3>
                    <p className="text-sm text-gray-600">2024 Kış</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Şube Açma Talebi */}
            <section className="mb-16">
              <div className="bg-orange-500 text-white rounded-lg p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Şehrinizde Şube Açılsın mı?</h2>
                <p className="text-lg mb-6 opacity-90">
                  Yaşadığınız şehirde PidebyPide şubesi açılmasını istiyorsanız, 
                  talebinizi bize bildirin!
                </p>
                <div className="max-w-md mx-auto">
                  <div className="text-left space-y-2">
                    <p className="font-bold">Talep ve Öneri Hattı:</p>
                    <p>📞 0850 555 77 99</p>
                    <p>✉️ yenisube@pidebypide.com</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Çalışma Saatleri ve Genel Bilgiler */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
                Genel Bilgiler
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <div className="text-3xl mb-3">🕐</div>
                  <h3 className="font-bold text-gray-800 mb-2">Çalışma Saatleri</h3>
                  <p className="text-sm text-gray-600">Hafta içi: 08:00-23:30</p>
                  <p className="text-sm text-gray-600">Hafta sonu: 09:00-24:00</p>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <div className="text-3xl mb-3">🚚</div>
                  <h3 className="font-bold text-gray-800 mb-2">Paket Servis</h3>
                  <p className="text-sm text-gray-600">Tüm şubelerimizde</p>
                  <p className="text-sm text-gray-600">mevcuttur</p>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <div className="text-3xl mb-3">💳</div>
                  <h3 className="font-bold text-gray-800 mb-2">Ödeme</h3>
                  <p className="text-sm text-gray-600">Nakit, Kredi Kartı,</p>
                  <p className="text-sm text-gray-600">Online Ödeme</p>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <div className="text-3xl mb-3">🎉</div>
                  <h3 className="font-bold text-gray-800 mb-2">Rezervasyon</h3>
                  <p className="text-sm text-gray-600">Grup rezervasyonu</p>
                  <p className="text-sm text-gray-600">için arayın</p>
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
