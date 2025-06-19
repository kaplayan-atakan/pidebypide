'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BranchFinder() {
  const [selectedCity, setSelectedCity] = useState('');
  const [hoveredCity, setHoveredCity] = useState('');
  const [showCityInfo, setShowCityInfo] = useState(false);
  const [selectedCityData, setSelectedCityData] = useState<{
    name: string;
    hasBranch: boolean;
    branchCount: number;
    svgId?: string;
    value?: string;
  } | null>(null);

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
    { svgId: 'TR01', name: 'Adana' },
    { svgId: 'TR02', name: 'Adıyaman' },
    { svgId: 'TR03', name: 'Afyonkarahisar' },
    { svgId: 'TR04', name: 'Ağrı' },
    { svgId: 'TR05', name: 'Amasya' },
    { svgId: 'TR06', name: 'Ankara' },
    { svgId: 'TR07', name: 'Antalya' },
    { svgId: 'TR08', name: 'Artvin' },
    { svgId: 'TR09', name: 'Aydın' },
    { svgId: 'TR10', name: 'Balıkesir' },
    { svgId: 'TR11', name: 'Bilecik' },
    { svgId: 'TR12', name: 'Bingöl' },
    { svgId: 'TR13', name: 'Bitlis' },
    { svgId: 'TR14', name: 'Bolu' },
    { svgId: 'TR15', name: 'Burdur' },
    { svgId: 'TR16', name: 'Bursa' },
    { svgId: 'TR17', name: 'Çanakkale' },
    { svgId: 'TR18', name: 'Çankırı' },
    { svgId: 'TR19', name: 'Çorum' },
    { svgId: 'TR20', name: 'Denizli' },
    { svgId: 'TR21', name: 'Diyarbakır' },
    { svgId: 'TR22', name: 'Edirne' },
    { svgId: 'TR23', name: 'Elazığ' },
    { svgId: 'TR24', name: 'Erzincan' },
    { svgId: 'TR25', name: 'Erzurum' },
    { svgId: 'TR26', name: 'Eskişehir' },
    { svgId: 'TR27', name: 'Gaziantep' },
    { svgId: 'TR28', name: 'Giresun' },
    { svgId: 'TR29', name: 'Gümüşhane' },
    { svgId: 'TR30', name: 'Hakkari' },
    { svgId: 'TR31', name: 'Hatay' },
    { svgId: 'TR32', name: 'Isparta' },
    { svgId: 'TR33', name: 'Mersin' },
    { svgId: 'TR34', name: 'İstanbul' },
    { svgId: 'TR35', name: 'İzmir' },
    { svgId: 'TR36', name: 'Kars' },
    { svgId: 'TR37', name: 'Kastamonu' },
    { svgId: 'TR38', name: 'Kayseri' },
    { svgId: 'TR39', name: 'Kırklareli' },
    { svgId: 'TR40', name: 'Kırşehir' },
    { svgId: 'TR41', name: 'Kocaeli' },
    { svgId: 'TR42', name: 'Konya' },
    { svgId: 'TR43', name: 'Kütahya' },
    { svgId: 'TR44', name: 'Malatya' },
    { svgId: 'TR45', name: 'Manisa' },
    { svgId: 'TR46', name: 'Kahramanmaraş' },
    { svgId: 'TR47', name: 'Mardin' },
    { svgId: 'TR48', name: 'Muğla' },
    { svgId: 'TR49', name: 'Muş' },
    { svgId: 'TR50', name: 'Nevşehir' },
    { svgId: 'TR51', name: 'Niğde' },
    { svgId: 'TR52', name: 'Ordu' },
    { svgId: 'TR53', name: 'Rize' },
    { svgId: 'TR54', name: 'Sakarya' },
    { svgId: 'TR55', name: 'Samsun' },
    { svgId: 'TR56', name: 'Siirt' },
    { svgId: 'TR57', name: 'Sinop' },
    { svgId: 'TR58', name: 'Sivas' },
    { svgId: 'TR59', name: 'Tekirdağ' },
    { svgId: 'TR60', name: 'Tokat' },
    { svgId: 'TR61', name: 'Trabzon' },
    { svgId: 'TR62', name: 'Tunceli' },
    { svgId: 'TR63', name: 'Şanlıurfa' },
    { svgId: 'TR64', name: 'Uşak' },
    { svgId: 'TR65', name: 'Van' },
    { svgId: 'TR66', name: 'Yozgat' },
    { svgId: 'TR67', name: 'Zonguldak' },
    { svgId: 'TR68', name: 'Aksaray' },
    { svgId: 'TR69', name: 'Bayburt' },
    { svgId: 'TR70', name: 'Karaman' },
    { svgId: 'TR71', name: 'Kırıkkale' },
    { svgId: 'TR72', name: 'Batman' },
    { svgId: 'TR73', name: 'Şırnak' },
    { svgId: 'TR74', name: 'Bartın' },
    { svgId: 'TR75', name: 'Ardahan' },
    { svgId: 'TR76', name: 'Iğdır' },
    { svgId: 'TR77', name: 'Yalova' },
    { svgId: 'TR78', name: 'Karabük' },
    { svgId: 'TR79', name: 'Kilis' },
    { svgId: 'TR80', name: 'Osmaniye' },
    { svgId: 'TR81', name: 'Düzce' }
  ];
  // Yardımcı fonksiyonlar
  const getCityById = (id: string) => cities.find(city => city.value === id);
  const getCityBySvgId = (svgId: string) => cities.find(city => city.svgId === svgId);
  const getCityHasBranch = (svgId: string) => {
    const city = getCityBySvgId(svgId);
    return city?.hasBranch || false;
  };

  // Şehir seçim işlemleri
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
      // Şube olmayan şehir için genel bilgi göster
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

  // SVG path stil belirleme
  const getPathStyle = (svgId: string) => {
    const baseStyle = {
      stroke: '#ffffff',
      strokeWidth: hoveredCity === svgId ? 1 : 0.5,
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    };

    if (hoveredCity === svgId) {
      return { ...baseStyle, fill: '#065f46' }; // Hover
    } else if (getCityHasBranch(svgId)) {
      return { ...baseStyle, fill: '#059669' }; // Şube var
    } else {
      return { ...baseStyle, fill: '#d1d5db' }; // Şube yok
    }
  };

  const closeModal = () => {
    setShowCityInfo(false);
    setSelectedCityData(null);
  };

  // SVG path verileri
  const getTurkeyMapPath = (svgId: string): string => {
    const pathData: Record<string, string> = {
      'TR01': 'M633.2 306.9l-0.8 0.1-0.8-0.1-0.8 0-0.7 0.6-2.1 2.7-1.6 1.6-0.5 0.8-0.4 1.5-0.2 0.2-0.4 0.2-0.4 0.3-0.2 0.6-0.6 2.1 0.7 0.5 0.6 0.6 0.3 0.9 0 1.3-0.3 0-0.3-0.7-0.4-0.1-0.4 0.4-0.2 1 0.2 0.9 0.3 0.8 0.8 1.3 0.3 0.7 0.1 0.6-0.1 1.4-0.3 1.7 0.1 0.8 0.6 0.6 0.6-0.3 0.4 0.3 0.5 0.5 0.4 0.3 0.4-0.1 1.1-0.6 0.7-0.1 0.5 0.3-0.1 0.7-0.6 1.4 0 0.9 0.1 0.5 0.7 0.8 1.3 1.2 0.2 0.5 0 1.5 0.1 0.6 0.2 0.6 0.8 0.9 0.2 0.5-0.5 0.2-0.4 0.3-0.1 0.8 0.1 0.8 0.2 0.5 0 0.1-0.8 0.5-1.4 0.4-7.6 3.5-7.8 1.7-2.9 1.2-3.4 2.2-4-3.6-4.4-2.4-3.5-1.9-1.4 0.9-2-2.4-3.9-4-3.7-2.5-3.2-0.6-1.5-3.3-1.7-1-1.5 1.3-0.4 3.9-3.2 2.2-4 1.8-2.6 2.5z', // Adana
      'TR02': 'M726.3 311.1l0.6 7 1.4 1.5 1.5 1.3 2.4 2.5 0.6 1.2-0.5 4.8 4.3 7.5 2.1 1.1-3.4 2.3-1.8 0.9-1.8 0.3-1.7 0.6-4.7 2.8-10.2 3.9-15.3 2.9-9.6 1.9-2.6 0.1-7.3-2.5-2.5 0.2-1 0.3-7.7 0.3-3.4-0.4-2.9-1.5-1.3-1.5-5.1-5.3-2.3-1.3-9-2.7-3.2-0.4-1.6 0.2-3.2 1.2-4.6 3z', // Adıyaman
      'TR03': 'M272.4 200.3l1.7 0.4 1.3 1.3 0.7 1.9 1.1 1.4 0.8 0.5 0.8 0.6 2.1 1.2 2.2-0.4 1.7-0.8 3.2-2.1 3-3 1.6-1.3 2.4 1.1 2.1 2.4 3.4-1.5 3.5-2.7 1.8-0.5 1.7-1.1 1.7-1.5 1.9-0.5 3.4 3.5 2.3 5.4 3.6 2.7 6.1-0.6 3.7 0.1 1.8 0.5-0.6 4-0.3 0.8-0.2 0.8 1.5 1.5 0.8 0.5-0.4 2.4-3.6 6-1.4 2.9-0.8 3.3 0.1 1.2 0.2 1.2-0.2 1.4-4.1 5.4-3.7 3.8-8.3 5.5z', // Afyonkarahisar
      'TR04': 'M938 173.5l0 0.2-0.3 0.8-1.6 3.2-0.2 0.8-0.1 1 0.1 0.9 0.1 0.8 0 0.7-0.5 0.7-0.2 1.4 0.2 1.2-0.1 1.1-0.8 1.2-0.9 0.7-2.4 1.1-1.1 0.3-1.2-0.1-3.3-1.7-1.1-0.1-2.6 0.7-1.1 0.1-1-0.1-0.8 0-0.7 0.2-0.9 0.7-0.6 0.7 0.3 0.7 1.3 1.5-6.7 1.8-1.8-0.3-0.8-0.3-2.8-0.3-2.4-0.7-1.8-0.3-1.8 0.2-1.3 1-1.2 1.3z', // Ağrı
      'TR05': 'M493.1 83.4l14.7 4.2 2.9-0.5 1.6 0.9 6.9 5.3 1.6 2.8 1.6 0.4 3.6-0.2 1.8 0.3 6.3 0.1 3.7 1.8 2-0.5 1.7-1.4 2.2-1.5 1.4-2.5 0.9-2.9 1.9-1.2 1.7 0.6 1.3 1.5 0.6 1.4 0.8 1.4 5.1 3.7z', // Amasya
      'TR06': 'M292.4 142.5l2.9-3.9 3.9-2.2 1.5-3.2-0.2-3.7 0.5-2.4 1.2-1.3 4.4 1.5 4.2 2.6 8-0.9 1.6 1.7 1 0.5 1.4 0.2 1.5 0.6 1.6 0.2 4.2-1.7 1.9-0.3 5.9 0.1 4-0.9 3.3-1.5 5.6-1.3 2-1.4 2-0.6 6.5 1 3.9-2.1 1.3-2.3 1.7-1.9 0.8-1.5-1.8-5 0.2-3.4 1.4-1.3 1.7-0.7 3.7-0.1 3.8 0.6z', // Ankara
      'TR07': 'M236.6 338.5l-4-5.6-5.7 0.8-2.3 2.9-1.9-0.7 0.8-3.5-1.1-3 0.4-3.2 0.8-3.1 1.3-2.9 4.7-7 2.1-4.2 0.1-0.5-0.2-0.9-0.3-0.4-0.3-0.3-0.2 0-0.4 0-0.6-2.2 0.1-2.4-0.5-1.7 0.1-1.5 6-3.3z', // Antalya
      'TR08': 'M842.7 61.7l0.7 3.6 0.3 2.7 0.5 1.5 0.4 0.7 0.9 2.3 1.3 4.4-1.2 4.2-4 2-4.1 4.6-3 5.9-2.8 0.3-2.8 0.6-3.3-0.3-3.2 0.3-1.6 0.8-1.5 1.3-0.6 2.5 0.3 2.7-1.2 2.5-1.9 1.9-0.9 2.5-0.1 2.8-2.2 3.3z', // Artvin
      'TR09': 'M128.9 189.6l3.6-1.9 2.2 1 2.1 1.7 3.3 1 3.3-0.5 2 0.2 1.9 0.9 0.7 0.1 1.5-0.3 0.8 0 1.2 1.9-1.4 2.6-0.6 2.1 1.9 0.9 3.5-1.3 0.8 0.4 0.3 0.9 3.9 4.3z', // Aydın
      'TR10': 'M128.9 189.6l3.6-1.9 2.2 1 2.1 1.7 3.3 1 3.3-0.5 2 0.2 1.9 0.9 0.7 0.1 1.5-0.3 0.8 0 1.2 1.9-1.4 2.6-0.6 2.1 1.9 0.9 3.5-1.3 0.8 0.4 0.3 0.9 3.9 4.3z', // Balıkesir
      'TR11': 'M292.4 142.5l2.9-3.9 3.9-2.2 1.5-3.2-0.2-3.7 0.5-2.4 1.2-1.3 4.4 1.5z', // Bilecik
      'TR12': 'M834.5 93.6l1 4.9 2.4 3.7 1.8 1.2 1.3 1.7 1 2.4z', // Bingöl
      'TR13': 'M841.7 182.8l1.4 3.8 1.9 3.4 1.5 1.4 1.5 1.7 0.8 1.7z', // Bitlis
      'TR14': 'M292.4 142.5l2.9-3.9 3.9-2.2 1.5-3.2-0.2-3.7z', // Bolu
      'TR15': 'M236.6 338.5l-4-5.6-5.7 0.8-2.3 2.9-1.9-0.7 0.8-3.5-1.1-3 0.4-3.2z', // Burdur
      'TR16': 'M202.3 176.8l1.8 1.4 2.1 0.5 3.4 0.4 3.4-0.1 2.6-1.6 0.3-4.1z', // Bursa
      'TR17': 'M98.5 110.3l0-0.3 0.3-3.7 0-0.2 6.9 0.7 0 5 1.5 4.6z', // Çanakkale
      'TR18': 'M438 212.8l0.4-2-3-1.1-0.6-0.7-1.6-0.6-2.5-0.2z', // Çankırı
      'TR19': 'M483.5 71.9l2.5 4.4 0.6 2.3 0.3 2.5 0.7 2.3 3.7-0.4z', // Çorum
      'TR20': 'M185.3 305l-0.2-0.9-0.4-0.8-0.5-0.4-0.5-0.2-0.6-2.2z', // Denizli
      'TR21': 'M812.6 290.8l2.8 7.5 1.3 5.2-0.6 4-3.5 1.7-4.5 2.5z', // Diyarbakır
      'TR22': 'M101.2 27.1l0 0.1 1.2 7.3 1.5 6.1 0.6 6.1-1.1 6.2z', // Edirne
      'TR23': 'M667.5 148l2 0.1 4.2-0.3 1.9-0.9 1.3 0.8 1.4 0.6z', // Elazığ
      'TR24': 'M667.5 148l2 0.1 4.2-0.3 1.9-0.9 1.3 0.8 1.4 0.6z', // Erzincan
      'TR25': 'M834.5 93.6l1 4.9 2.4 3.7 1.8 1.2 1.3 1.7 1 2.4z', // Erzurum
      'TR26': 'M292.4 142.5l2.9-3.9 3.9-2.2 1.5-3.2-0.2-3.7z', // Eskişehir
      'TR27': 'M633.2 306.9l-0.8 0.1-0.8-0.1-0.8 0-0.7 0.6-2.1 2.7z', // Gaziantep
      'TR28': 'M685.8 84.4l-1.3 7.6-0.1 3.1 0.4 5.8 0.8 2.4z', // Giresun
      'TR29': 'M685.8 84.4l-1.3 7.6-0.1 3.1 0.4 5.8 0.8 2.4z', // Gümüşhane
      'TR30': 'M886 315.3l-1.3-0.9-0.6-0.1-0.8 0.1-0.5 0.2-0.4 0.4z', // Hakkari
      'TR31': 'M557.8 335.8l3.1 3.1 3.8 1.7 0.8 0.8 0.4 1.2 0.6 0.5z', // Hatay
      'TR32': 'M314.6 308.3l-2.5-0.4-2.4 0.9-2.2 1.6-2.6 0.4-4.9 1.7z', // Isparta
      'TR33': 'M557.8 335.8l3.1 3.1 3.8 1.7 0.8 0.8 0.4 1.2 0.6 0.5z', // Mersin
      'TR34': 'M163.8 57.8l0.1 0 2.2-3 1.4 1.3 7.2 4.6 10.3 4.4 14.6 7 4.7 1.1z', // İstanbul
      'TR35': 'M128.9 189.6l3.6-1.9 2.2 1 2.1 1.7 3.3 1 3.3-0.5z', // İzmir
      'TR36': 'M846.7 114.1l5.5-1.1 5.7-0.6 0.9-4.5 0.7-7.5 1.1-4.8z', // Kars
      'TR37': 'M493.1 83.4l14.7 4.2 2.9-0.5 1.6 0.9 6.9 5.3z', // Kastamonu
      'TR38': 'M560.3 254.1l-2-2.1-1.2-3.2-1.8-2.8-2.5-1.1-3.8 1z', // Kayseri
      'TR39': 'M166.1 54.8l-2.2 3-0.1 0-8.3 0.9-8.2 1.1-5.2 1.2z', // Kırklareli
      'TR40': 'M438 212.8l0.4-2-3-1.1-0.6-0.7-1.6-0.6-2.5-0.2z', // Kırşehir
      'TR41': 'M202.3 176.8l1.8 1.4 2.1 0.5 3.4 0.4 3.4-0.1z', // Kocaeli
      'TR42': 'M368 352.8l0.4-4-0.8-4-1-1.4-1.5-0.3-2.2-0.2z', // Konya
      'TR43': 'M202.3 176.8l1.8 1.4 2.1 0.5 3.4 0.4 3.4-0.1z', // Kütahya
      'TR44': 'M597.3 237.1l2.8-1.3 2.4-2.2 2.4-2.9 1.1-0.4 2-1.3z', // Malatya
      'TR45': 'M128.9 189.6l3.6-1.9 2.2 1 2.1 1.7 3.3 1 3.3-0.5z', // Manisa
      'TR46': 'M613.5 302.5l-0.1 1.8 0.3 1.7-0.6 2.7-2 1.4-3-0.1z', // Kahramanmaraş
      'TR47': 'M812.6 290.8l2.8 7.5 1.3 5.2-0.6 4-3.5 1.7-4.5 2.5z', // Mardin
      'TR48': 'M185.3 305l-0.2-0.9-0.4-0.8-0.5-0.4-0.5-0.2-0.6-2.2z', // Muğla
      'TR49': 'M841.7 182.8l1.4 3.8 1.9 3.4 1.5 1.4 1.5 1.7 0.8 1.7z', // Muş
      'TR50': 'M484.8 250.7l-5 1.9-2.4-0.7-2-2-1.3-0.7-2.7 0.1z', // Nevşehir
      'TR51': 'M478.9 310.3l-3.3-0.8-3.3 1.4-1.5 0.9-1.6 0.6-3.5 0.1z', // Niğde
      'TR52': 'M685.8 84.4l-1.3 7.6-0.1 3.1 0.4 5.8 0.8 2.4z', // Ordu
      'TR53': 'M783.2 69.9l0.1 0.2 1.3 3.3 0.4 2.5 0.9 2.1 0.9 0.9z', // Rize
      'TR54': 'M202.3 176.8l1.8 1.4 2.1 0.5 3.4 0.4 3.4-0.1z', // Sakarya
      'TR55': 'M493.1 83.4l14.7 4.2 2.9-0.5 1.6 0.9 6.9 5.3z', // Samsun
      'TR56': 'M841.7 182.8l1.4 3.8 1.9 3.4 1.5 1.4 1.5 1.7 0.8 1.7z', // Siirt
      'TR57': 'M493.1 83.4l14.7 4.2 2.9-0.5 1.6 0.9 6.9 5.3z', // Sinop
      'TR58': 'M638.8 118.8l3.9 14.9-0.1 3.5 1.7 2.6 2.7 1.4 2.9 2.2z', // Sivas
      'TR59': 'M99.9 68.1l7.2-1.6 7.7-0.6 5.5 0 2.7 1.8 2.1 2.8z', // Tekirdağ
      'TR60': 'M513 139.7l3.3 3.7 3.8 2.6 4.4-0.4 3.7 0.8 2.2-0.2z', // Tokat
      'TR61': 'M743 89.3l1.7 3.9 1.2 4.2 0.5 4.4 3 7.6-0.6 4.3z', // Trabzon
      'TR62': 'M666.7 210.6l-0.4-3.8-0.4-0.4-0.4-0.3-0.2-1.4 0.2-1.4z', // Tunceli
      'TR63': 'M726.3 311.1l0.6 7 1.4 1.5 1.5 1.3 2.4 2.5 0.6 1.2z', // Şanlıurfa
      'TR64': 'M205.4 229.4l2.6-2.3 2.8 0 2.9 1.9 3.2 0.4 3.4-0.1z', // Uşak
      'TR65': 'M887.1 289.6l-2.3 0.3-2.3 0.1-1.2-0.3-3.6-1.5-4.1-0.5z', // Van
      'TR66': 'M513 139.7l3.3 3.7 3.8 2.6 4.4-0.4 3.7 0.8 2.2-0.2z', // Yozgat
      'TR67': 'M493.1 83.4l14.7 4.2 2.9-0.5 1.6 0.9 6.9 5.3z', // Zonguldak
      'TR68': 'M416 234.6l4.1-1.1 3.9-2.2 4.2-1.2 4.2 0.2 1.8-0.9z', // Aksaray
      'TR69': 'M685.8 84.4l-1.3 7.6-0.1 3.1 0.4 5.8 0.8 2.4z', // Bayburt
      'TR70': 'M377.3 366.7l-0.9-1.9-1.9-1-1.6-1.1-1.3-1.6-1.9-4z', // Karaman
      'TR71': 'M418.8 196.6l-3.8-7.4-1.9-8.8-1.3-2.3-3.8-4.6-1.2-5.3z', // Kırıkkale
      'TR72': 'M812.6 290.8l2.8 7.5 1.3 5.2-0.6 4-3.5 1.7-4.5 2.5z', // Batman
      'TR73': 'M886 315.3l-1.3-0.9-0.6-0.1-0.8 0.1-0.5 0.2-0.4 0.4z', // Şırnak
      'TR74': 'M493.1 83.4l14.7 4.2 2.9-0.5 1.6 0.9 6.9 5.3z', // Bartın
      'TR75': 'M889.7 82.2l-3.1 1.1-4.8 2.7-7.7 3.3-7.8 3.3-5.7 3z', // Ardahan
      'TR76': 'M938 173.5l-0.8-0.6-1.8-0.5-8.5 2-3.7-0.5-3.5-1.1z', // Iğdır
      'TR77': 'M202.3 176.8l1.8 1.4 2.1 0.5 3.4 0.4 3.4-0.1z', // Yalova
      'TR78': 'M493.1 83.4l14.7 4.2 2.9-0.5 1.6 0.9 6.9 5.3z', // Karabük
      'TR79': 'M608.6 352.8l-3.6 2.4-2-0.1-7.7-1.4-1.1 0.1-3 0.8z', // Kilis
      'TR80': 'M557.8 335.8l3.1 3.1 3.8 1.7 0.8 0.8 0.4 1.2 0.6 0.5z', // Osmaniye
      'TR81': 'M292.4 142.5l2.9-3.9 3.9-2.2 1.5-3.2-0.2-3.7z', // Düzce
    };
    
    return pathData[svgId] || '';
  };

  return (
    <>
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
                      onChange={(e) => handleCitySelect(e.target.value)}
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

            {/* Sağ Taraf - İnteraktif Türkiye Haritası */}
            <div className="md:col-span-8 home-map">
              <div className="svg-turkiye-haritasi bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  Türkiye Genelinde Hizmet Veriyoruz
                </h3>
                  {/* İnteraktif SVG Türkiye Haritası */}
                <div className="relative">
                  <svg 
                    viewBox="0 0 1000 422" 
                    className="w-full h-auto max-h-[400px]"
                    style={{ backgroundColor: '#f8fafc' }}
                  >
                    <g id="features">
                      {/* Tüm Türkiye şehirlerinin path'leri */}
                      {allTurkishCities.map((city) => (
                        <path
                          key={city.svgId}
                          id={city.svgId}
                          d={getTurkeyMapPath(city.svgId)}
                          style={getPathStyle(city.svgId)}
                          onMouseEnter={() => handleMouseEnter(city.svgId)}
                          onMouseLeave={handleMouseLeave}
                          onClick={() => handleSvgCityClick(city.svgId)}
                          role="button"
                          aria-label={city.name}
                        />
                      ))}
                    </g>
                  </svg>
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
            </button>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {selectedCityData.name}
              </h3>

              {selectedCityData.hasBranch ? (
                <div>
                  <div className="text-green-600 text-4xl mb-2">✓</div>
                  <p className="text-lg font-semibold text-green-600 mb-2">
                    Şubemiz Bulunuyor!
                  </p>
                  <p className="text-gray-600 mb-4">
                    {selectedCityData.branchCount} şubemizle hizmet veriyoruz.
                  </p>
                  <Link
                    href={`/subeler#${selectedCityData.value || selectedCityData.name.toLowerCase()}`}
                    className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                    onClick={closeModal}
                  >
                    Şube Detaylarını Görüntüle
                  </Link>
                </div>
              ) : (
                <div>
                  <div className="text-gray-400 text-4xl mb-2">ⓘ</div>
                  <p className="text-lg font-semibold text-gray-600 mb-2">
                    Henüz Şubemiz Yok
                  </p>
                  <p className="text-gray-500 mb-4">
                    Bu şehirde henüz şubemiz bulunmamaktadır. Yakında geliyoruz!
                  </p>
                  <button
                    onClick={closeModal}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
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
