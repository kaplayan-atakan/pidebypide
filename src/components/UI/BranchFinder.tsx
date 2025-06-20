'use client';

import { useState } from 'react';
import Link from 'next/link';
import TurkeyMap from './TurkeyMap';

export default function BranchFinder() {  const [selectedCity, setSelectedCity] = useState('');
  const [hoveredCity, setHoveredCity] = useState('');
  const [showCityInfo, setShowCityInfo] = useState(false);
  const [selectedCityData, setSelectedCityData] = useState<{
    name: string;
    hasBranch: boolean;
    branchCount: number;
    svgId?: string;
    value?: string;  } | null>(null);

  // Şehir verileri - SVG ID'leri ile eşleştirilmiş
  const cities = [
    { value: 'istanbul', name: 'İstanbul', svgId: 'TR34', hasBranch: true, branchCount: 8 },
    { value: 'ankara', name: 'Ankara', svgId: 'TR06', hasBranch: true, branchCount: 3 },
    { value: 'izmir', name: 'İzmir', svgId: 'TR35', hasBranch: true, branchCount: 2 },
    { value: 'bursa', name: 'Bursa', svgId: 'TR16', hasBranch: true, branchCount: 2 },
    { value: 'antalya', name: 'Antalya', svgId: 'TR07', hasBranch: true, branchCount: 1 },
    { value: 'adana', name: 'Adana', svgId: 'TR01', hasBranch: true, branchCount: 1 },
    { value: 'adiyaman', name: 'Adıyaman', svgId: 'TR02', hasBranch: true, branchCount: 1 },
    { value: 'afyonkarahisar', name: 'Afyonkarahisar', svgId: 'TR03', hasBranch: true, branchCount: 1 },
    { value: 'aydin', name: 'Aydın', svgId: 'TR09', hasBranch: true, branchCount: 1 },
    { value: 'balikesir', name: 'Balıkesir', svgId: 'TR10', hasBranch: true, branchCount: 1 },
    { value: 'corum', name: 'Çorum', svgId: 'TR19', hasBranch: true, branchCount: 1 },
    { value: 'denizli', name: 'Denizli', svgId: 'TR20', hasBranch: true, branchCount: 1 },
    { value: 'isparta', name: 'Isparta', svgId: 'TR32', hasBranch: true, branchCount: 1 },
    { value: 'kahramanmaras', name: 'Kahramanmaraş', svgId: 'TR46', hasBranch: true, branchCount: 1 },
    { value: 'kocaeli', name: 'Kocaeli', svgId: 'TR41', hasBranch: true, branchCount: 1 },
    { value: 'konya', name: 'Konya', svgId: 'TR42', hasBranch: true, branchCount: 1 },
    { value: 'malatya', name: 'Malatya', svgId: 'TR44', hasBranch: true, branchCount: 1 },
    { value: 'mersin', name: 'Mersin', svgId: 'TR33', hasBranch: true, branchCount: 1 },
    { value: 'sanliurfa', name: 'Şanlıurfa', svgId: 'TR63', hasBranch: true, branchCount: 1 },
    { value: 'sivas', name: 'Sivas', svgId: 'TR58', hasBranch: true, branchCount: 1 }
  ];

  // Tüm Türkiye şehirleri (SVG'de olan tüm şehirler)
  const allTurkishCities = [
    { svgId: 'TR01', name: 'Adana' }, { svgId: 'TR02', name: 'Adıyaman' }, { svgId: 'TR03', name: 'Afyonkarahisar' },
    { svgId: 'TR04', name: 'Ağrı' }, { svgId: 'TR05', name: 'Amasya' }, { svgId: 'TR06', name: 'Ankara' },
    { svgId: 'TR07', name: 'Antalya' }, { svgId: 'TR08', name: 'Artvin' }, { svgId: 'TR09', name: 'Aydın' },
    { svgId: 'TR10', name: 'Balıkesir' }, { svgId: 'TR11', name: 'Bilecik' }, { svgId: 'TR12', name: 'Bingöl' },
    { svgId: 'TR13', name: 'Bitlis' }, { svgId: 'TR14', name: 'Bolu' }, { svgId: 'TR15', name: 'Burdur' },
    { svgId: 'TR16', name: 'Bursa' }, { svgId: 'TR17', name: 'Çanakkale' }, { svgId: 'TR18', name: 'Çankırı' },
    { svgId: 'TR19', name: 'Çorum' }, { svgId: 'TR20', name: 'Denizli' }, { svgId: 'TR21', name: 'Diyarbakır' },
    { svgId: 'TR22', name: 'Edirne' }, { svgId: 'TR23', name: 'Elazığ' }, { svgId: 'TR24', name: 'Erzincan' },
    { svgId: 'TR25', name: 'Erzurum' }, { svgId: 'TR26', name: 'Eskişehir' }, { svgId: 'TR27', name: 'Gaziantep' },
    { svgId: 'TR28', name: 'Giresun' }, { svgId: 'TR29', name: 'Gümüşhane' }, { svgId: 'TR30', name: 'Hakkari' },
    { svgId: 'TR31', name: 'Hatay' }, { svgId: 'TR32', name: 'Isparta' }, { svgId: 'TR33', name: 'Mersin' },
    { svgId: 'TR34', name: 'İstanbul' }, { svgId: 'TR35', name: 'İzmir' }, { svgId: 'TR36', name: 'Kars' },
    { svgId: 'TR37', name: 'Kastamonu' }, { svgId: 'TR38', name: 'Kayseri' }, { svgId: 'TR39', name: 'Kırklareli' },
    { svgId: 'TR40', name: 'Kırşehir' }, { svgId: 'TR41', name: 'Kocaeli' }, { svgId: 'TR42', name: 'Konya' },
    { svgId: 'TR43', name: 'Kütahya' }, { svgId: 'TR44', name: 'Malatya' }, { svgId: 'TR45', name: 'Manisa' },
    { svgId: 'TR46', name: 'Kahramanmaraş' }, { svgId: 'TR47', name: 'Mardin' }, { svgId: 'TR48', name: 'Muğla' },
    { svgId: 'TR49', name: 'Muş' }, { svgId: 'TR50', name: 'Nevşehir' }, { svgId: 'TR51', name: 'Niğde' },
    { svgId: 'TR52', name: 'Ordu' }, { svgId: 'TR53', name: 'Rize' }, { svgId: 'TR54', name: 'Sakarya' },
    { svgId: 'TR55', name: 'Samsun' }, { svgId: 'TR56', name: 'Siirt' }, { svgId: 'TR57', name: 'Sinop' },
    { svgId: 'TR58', name: 'Sivas' }, { svgId: 'TR59', name: 'Tekirdağ' }, { svgId: 'TR60', name: 'Tokat' },
    { svgId: 'TR61', name: 'Trabzon' }, { svgId: 'TR62', name: 'Tunceli' }, { svgId: 'TR63', name: 'Şanlıurfa' },
    { svgId: 'TR64', name: 'Uşak' }, { svgId: 'TR65', name: 'Van' }, { svgId: 'TR66', name: 'Yozgat' },
    { svgId: 'TR67', name: 'Zonguldak' }, { svgId: 'TR68', name: 'Aksaray' }, { svgId: 'TR69', name: 'Bayburt' },
    { svgId: 'TR70', name: 'Karaman' }, { svgId: 'TR71', name: 'Kırıkkale' }, { svgId: 'TR72', name: 'Batman' },
    { svgId: 'TR73', name: 'Şırnak' }, { svgId: 'TR74', name: 'Bartın' }, { svgId: 'TR75', name: 'Ardahan' },
    { svgId: 'TR76', name: 'Iğdır' }, { svgId: 'TR77', name: 'Yalova' }, { svgId: 'TR78', name: 'Karabük' },
    { svgId: 'TR79', name: 'Kilis' }, { svgId: 'TR80', name: 'Osmaniye' }, { svgId: 'TR81', name: 'Düzce' }
  ];

  // Yardımcı fonksiyonlar
  const getCityById = (id: string) => cities.find(city => city.value === id);
  const getCityBySvgId = (svgId: string) => cities.find(city => city.svgId === svgId);
  const getCityHasBranch = (svgId: string) => {
    const city = getCityBySvgId(svgId);
    return city?.hasBranch || false;
  };  // Kurumsal renk paleti ile hover stil fonksiyonu
  const getPathStyle = (svgId: string): React.CSSProperties => {
    const hasBranch = getCityHasBranch(svgId);
    const isHovered = hoveredCity === svgId;
    
    const baseStyle: React.CSSProperties = {
      fill: isHovered 
        ? (hasBranch ? '#f29b24' : '#7b7934')  // Hover: turuncu (şubeli) / zeytin yeşili (şubesiz)
        : (hasBranch ? '#14543c' : '#d1d5db'), // Normal: kurumsal yeşil (şubeli) / gri (şubesiz)
      stroke: '#ffffff',
      strokeWidth: 1,
      cursor: 'pointer',
      transition: 'fill 0.3s ease, filter 0.3s ease'
    };

    // Hover durumunda glow ve shadow efektleri
    if (isHovered) {
      const filters = [];
      
      // Shadow efekti
      filters.push('drop-shadow(0 6px 12px rgba(0,0,0,0.4))');
      
      // Kurumsal renklere uygun glow efekti
      const glowColor = hasBranch 
        ? 'rgba(242, 155, 36, 0.6)'   // Turuncu glow (şubeli)
        : 'rgba(123, 121, 52, 0.4)';  // Zeytin yeşili glow (şubesiz)
      filters.push(`drop-shadow(0 0 8px ${glowColor})`);
      
      baseStyle.filter = filters.join(' ');
    }

    return baseStyle;
  };

  // Event handlers
  const handleCitySelect = (cityValue: string) => {
    setSelectedCity(cityValue);
    const cityData = getCityById(cityValue);
    if (cityData) {
      setSelectedCityData(cityData);
      setShowCityInfo(true);
    }
  };

  const handleSvgCityClick = (svgId: string) => {
    const cityData = getCityBySvgId(svgId);
    if (cityData) {
      handleCitySelect(cityData.value);
    } else {
      const allCityData = allTurkishCities.find(city => city.svgId === svgId);
      if (allCityData) {
        setSelectedCityData({
          name: allCityData.name,
          hasBranch: false,
          branchCount: 0,
          svgId: svgId
        });
        setShowCityInfo(true);
      }
    }
  };

  const handleMouseEnter = (svgId: string) => {
    setHoveredCity(svgId);
  };

  const handleMouseLeave = () => {
    setHoveredCity('');
  };

  const handleSearch = () => {
    if (selectedCity) {
      window.location.href = `/subeler#${selectedCity}`;
    }
  };

  const closeModal = () => {
    setShowCityInfo(false);
    setSelectedCityData(null);
  };

  return (
    <>
      <div className="section section-two-columns bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Sol Taraf - Şehir Seçici */}
            <div className="md:col-span-4 home-dealer">              <h2 className="text-3xl font-bold text-[#14543c] mb-4">EN YAKIN</h2>
              <p className="text-[#7b7934] mb-6 leading-relaxed">
                Şehrini seç, en yakın Pide By Pide&apos;ye ulaş lezzetin tadını çıkar.
              </p>
              
              <div className="space-y-4">
                <div className="form-group">
                  <div className="select-wrapper">                    <select
                      name="il"
                      id="il"
                      value={selectedCity}
                      onChange={(e) => handleCitySelect(e.target.value)}
                      className="w-full px-4 py-3 border border-[#7b7934] rounded-lg focus:ring-2 focus:ring-[#f29b24] focus:border-transparent bg-white text-[#14543c]"
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
                  className="w-full bg-[#14543c] text-white py-3 px-6 rounded-lg font-bold hover:bg-[#0f3d2a] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Ara
                </button>
              </div>
            </div>

            {/* Sağ Taraf - İnteraktif Türkiye Haritası (Point/Circle Kaldırıldı) */}
            <div className="md:col-span-8 home-map">
              <div className="svg-turkiye-haritasi bg-white rounded-lg shadow-lg p-6">                <h3 className="text-xl font-bold text-[#14543c] mb-4 text-center">
                  Türkiye Genelinde Hizmet Veriyoruz
                </h3>
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden">                  <TurkeyMap 
                    getPathStyle={getPathStyle}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                    handleSvgCityClick={handleSvgCityClick}
                  /></div>
              </div>
              
              {/* İstatistikler */}              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center bg-white rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-[#f29b24]">20</div>
                  <div className="text-sm text-[#7b7934]">Şehir</div>
                </div>
                <div className="text-center bg-white rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-[#f29b24]">25+</div>
                  <div className="text-sm text-[#7b7934]">Şube</div>
                </div>
                <div className="text-center bg-white rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-[#f29b24]">7</div>
                  <div className="text-sm text-[#7b7934]">Bölge</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Şehir Bilgi Modal */}
      {showCityInfo && selectedCityData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Kapat"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#14543c] mb-4">
                {selectedCityData.name}
              </h3>

              {selectedCityData.hasBranch ? (
                <div>
                  <div className="text-[#14543c] text-4xl mb-2">✓</div>
                  <p className="text-lg font-semibold text-[#14543c] mb-2">
                    Şubemiz Bulunuyor!
                  </p>
                  <p className="text-[#7b7934] mb-4">
                    {selectedCityData.branchCount} şubemizle hizmet veriyoruz.
                  </p>
                  <Link
                    href={`/subeler#${selectedCityData.value || selectedCityData.name.toLowerCase()}`}
                    className="inline-block bg-[#f29b24] text-white px-6 py-2 rounded-lg hover:bg-[#d4821a] transition-colors"
                    onClick={closeModal}
                  >
                    Şube Detaylarını Görüntüle
                  </Link>
                </div>
              ) : (
                <div>
                  <div className="text-[#7b7934] text-4xl mb-2">ⓘ</div>
                  <p className="text-lg font-semibold text-[#7b7934] mb-2">
                    Henüz Şubemiz Yok
                  </p>
                  <p className="text-[#7b7934] mb-4 opacity-75">
                    Bu şehirde henüz şubemiz bulunmamaktadır. Yakında geliyoruz!
                  </p>
                  <button
                    onClick={closeModal}
                    className="bg-[#7b7934] text-white px-6 py-2 rounded-lg hover:bg-[#5d5c26] transition-colors"
                  >
                    Tamam
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
