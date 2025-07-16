'use client';


import { useState, useMemo } from 'react';
import TurkeyMap from './TurkeyMap';
import { branches, Branch } from '@/data/branches';
import { cityPaths } from '@/data/cityPaths';

export default function BranchFinder() {
  const [hoveredCity, setHoveredCity] = useState('');
  const [selectedCity, setSelectedCity] = useState(''); // selectedCity state'ini geri ekle
  

  // Şehir adı ile SVG id eşleştirmesini cityPaths üzerinden otomatik oluştur
  const cityToSvgId: Record<string, string> = useMemo(() => {
    const map: Record<string, string> = {};
    cityPaths.forEach(city => {
      map[city.name.trim().toLowerCase()] = city.id;
    });
    return map;
  }, []);

  // "Tüm Şubelerimiz" section ile tam senkronize şehir listesi
  const cities = useMemo(() => {
    // Şubeleri şehir bazında grupla ("Tüm Şubelerimiz" section ile aynı mantık)
    const cityGroups: { [city: string]: Branch[] } = {};
    branches.forEach(branch => {
      const city = branch.city || 'Diğer';
      if (!cityGroups[city]) cityGroups[city] = [];
      cityGroups[city].push(branch);
    });
    // Şehir sırası ve isimleri "Tüm Şubelerimiz" section ile aynı olsun
    return Object.entries(cityGroups).map(([city, branchList]) => ({
      value: city.trim().toLowerCase(),
      name: city,
      svgId: cityToSvgId[city.trim().toLowerCase()] || '',
      hasBranch: true,
      branchCount: branchList.length
    }));
  }, [cityToSvgId]);

  // Yardımcı fonksiyonlar
  const getCityById = (id: string) => cities.find(city => city.value === id);
  const getCityBySvgId = (svgId: string) => cities.find(city => city.svgId === svgId);
  const getCityHasBranch = (svgId: string) => {
    const city = getCityBySvgId(svgId);
    return city?.hasBranch || false;
  };
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

  // Şehir seçildiğinde veya haritada tıklandığında doğrudan şubeler sayfasındaki ilgili anchor'a yönlendir
  // Anchor'ı şubeler section'daki id ile birebir aynı oluştur (örn. Adana → Adana)
  function normalizeAnchor(cityName: string) {
    // Türkçe karakterleri ve boşlukları koru, baştaki/sondaki boşlukları sil
    return cityName.trim();
  }
  const goToBranchSection = (city: typeof cities[number]) => {
    const anchor = normalizeAnchor(city.name);
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    window.location.href = `${basePath}/subeler/#${anchor}`;
  };

  // Event handlers
  // Harita şehir tıklama fonksiyonu
  const handleSvgCityClick = (svgId: string) => {
    const city = getCityBySvgId(svgId);
    if (city) {
      goToBranchSection(city);
    }
  };

  // Arama veya şehir seçimi fonksiyonu (örnek: bir select veya arama inputu varsa)
  const handleCitySelect = (cityValue: string) => {
    setSelectedCity(cityValue);
    const city = getCityById(cityValue);
    if (city) {
      goToBranchSection(city);
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
      const city = getCityById(selectedCity);
      if (city) {
        goToBranchSection(city);
      }
    }
  };

  return (
    <>      <div className="section section-two-columns bg-gray-50 py-8 sm:py-12">
        <div className="container mx-auto container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-responsive">
            {/* Sol Taraf - Şehir Seçici */}
            <div className="lg:col-span-4 home-dealer">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-header text-[#14543c] margin-responsive">EN YAKIN</h2>
              <p className="text-responsive-md text-[#7b7934] margin-responsive leading-relaxed">
                Şehrini seç, en yakın Pide By Pide&apos;ye ulaş lezzetin tadını çıkar.
              </p>
              
              <div className="space-y-4">
                <div className="form-group">
                  <div className="select-wrapper">                    <select
                      name="il"
                      id="il"
                      value={selectedCity}
                      onChange={(e) => handleCitySelect(e.target.value)}
                      className="w-full px-4 py-3 border border-[#7b7934] rounded-lg focus:ring-2 focus:ring-[#f29b24] focus:border-transparent bg-white text-[#14543c] text-responsive-sm btn-touch"
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
                  className="w-full bg-[#14543c] text-white py-3 px-6 rounded-lg font-bold hover:bg-[#0f3d2a] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed btn-touch text-responsive-md"
                >
                  Ara
                </button>
              </div>
            </div>            {/* Sağ Taraf - İnteraktif Türkiye Haritası */}
            <div className="lg:col-span-8 home-map">              <div className="svg-turkiye-haritasi bg-white rounded-lg shadow-lg spacing-sm">
                <h3 className="text-lg sm:text-xl font-bold font-header text-[#14543c] margin-responsive text-center">
                  Türkiye Genelinde Hizmet Veriyoruz
                </h3>
                {/* Harita üzerinde şehir hover edildiğinde şehir ismini göster */}
                <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                  <TurkeyMap 
                    getPathStyle={getPathStyle}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                    handleSvgCityClick={handleSvgCityClick}
                  />
                  {hoveredCity && cities.find(c => c.svgId === hoveredCity) && (
                    <div
                      className="absolute left-1/2 top-2 z-20 -translate-x-1/2 bg-white bg-opacity-90 px-4 py-2 rounded shadow text-[#14543c] font-bold text-lg border border-[#f29b24] pointer-events-none select-none animate-fade-in"
                    >
                      {cities.find(c => c.svgId === hoveredCity)?.name}
                    </div>
                  )}
                </div>
              </div>
              
              {/* İstatistikler */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4 sm:mt-6">
                <div className="text-center bg-white rounded-lg spacing-sm shadow">
                  <div className="text-lg sm:text-2xl font-bold font-header stat-number text-[#f29b24]">20</div>
                  <div className="text-xs sm:text-sm text-[#7b7934]">Şehir</div>
                </div>
                <div className="text-center bg-white rounded-lg spacing-sm shadow">
                  <div className="text-lg sm:text-2xl font-bold font-header stat-number text-[#f29b24]">25+</div>
                  <div className="text-xs sm:text-sm text-[#7b7934]">Şube</div>
                </div>
                <div className="text-center bg-white rounded-lg spacing-sm shadow">
                  <div className="text-lg sm:text-2xl font-bold font-header stat-number text-[#f29b24]">7</div>
                  <div className="text-xs sm:text-sm text-[#7b7934]">Bölge</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>    </>
  );
}
