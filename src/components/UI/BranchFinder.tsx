'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BranchFinder() {
  const [selectedCity, setSelectedCity] = useState('');
  const cities = [
    { value: 'istanbul', name: 'İstanbul' },
    { value: 'ankara', name: 'Ankara' },
    { value: 'izmir', name: 'İzmir' },
    { value: 'bursa', name: 'Bursa' },
    { value: 'antalya', name: 'Antalya' },
    { value: 'adana', name: 'Adana' },
    { value: 'adiyaman', name: 'Adıyaman' },
    { value: 'afyonkarahisar', name: 'Afyonkarahisar' },
    { value: 'aydin', name: 'Aydın' },
    { value: 'balikesir', name: 'Balıkesir' },
    { value: 'corum', name: 'Çorum' },
    { value: 'denizli', name: 'Denizli' },
    { value: 'isparta', name: 'Isparta' },
    { value: 'kahramanmaras', name: 'Kahramanmaraş' },
    { value: 'kocaeli', name: 'Kocaeli' },
    { value: 'konya', name: 'Konya' },
    { value: 'malatya', name: 'Malatya' },
    { value: 'mersin', name: 'Mersin' },
    { value: 'sanliurfa', name: 'Şanlıurfa' },
    { value: 'sivas', name: 'Sivas' }
  ];

  const handleSearch = () => {
    if (selectedCity) {
      // Şubeler sayfasına yönlendir
      window.location.href = `/subeler#${selectedCity}`;
    }
  };

  return (
    <div className="section section-two-columns bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sol Taraf - Şehir Seçici */}
          <div className="md:col-span-4 home-dealer">
            <h2 className="text-3xl font-bold text-orange-600 mb-4">
              EN YAKIN
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Şehrini seç, en yakın Pide By Pide&apos;ye ulaş lezzetin tadını çıkar.
            </p>
            
            <div className="space-y-4">
              <div className="form-group">
                <div className="select-wrapper">
                  <select
                    name="il"
                    id="il"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-800"
                  >
                    <option value="">Şehir Seçiniz</option>
                    {cities.map((city) => (
                      <option key={city.value} value={city.value}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <button
                type="button"
                onClick={handleSearch}
                disabled={!selectedCity}
                className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Ara
              </button>
            </div>
          </div>

          {/* Sağ Taraf - Türkiye Haritası */}
          <div className="md:col-span-8 home-map">
            <div className="svg-turkiye-haritasi bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                Türkiye Genelinde Hizmet Veriyoruz
              </h3>
              
              {/* Basit Türkiye Haritası Temsili */}
              <div className="relative bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg p-8 min-h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🇹🇷</div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">
                    Türkiye Haritası
                  </h4>
                  <p className="text-gray-600 mb-4">
                    17 şehirde toplam 25+ şubemizle hizmet veriyoruz
                  </p>
                  
                  {/* Aktif Şehirler */}
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="bg-white bg-opacity-80 rounded px-2 py-1">İstanbul</div>
                    <div className="bg-white bg-opacity-80 rounded px-2 py-1">Ankara</div>
                    <div className="bg-white bg-opacity-80 rounded px-2 py-1">İzmir</div>
                    <div className="bg-white bg-opacity-80 rounded px-2 py-1">Bursa</div>
                    <div className="bg-white bg-opacity-80 rounded px-2 py-1">Antalya</div>
                    <div className="bg-white bg-opacity-80 rounded px-2 py-1">Adana</div>
                  </div>
                  
                  <div className="mt-6">
                    <Link 
                      href="/subeler" 
                      className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Tüm Şubeleri Görüntüle
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* İstatistikler */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center bg-white rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-orange-600">17</div>
                  <div className="text-sm text-gray-600">Şehir</div>
                </div>
                <div className="text-center bg-white rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-orange-600">25+</div>
                  <div className="text-sm text-gray-600">Şube</div>
                </div>
                <div className="text-center bg-white rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-orange-600">7</div>
                  <div className="text-sm text-gray-600">Bölge</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
