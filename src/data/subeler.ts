export interface Sube {
  id: string;
  title: string;
  address: string;
  phone: string;
  mapUrl: string;
  cityValue: string;
}

export const subeler: Sube[] = [
  {
    id: 'istanbul-avrupa',
    title: 'İSTANBUL - AVRUPA YAKASI',
    address: 'Avrupa Yakası',
    phone: '0850 441 7433',
    mapUrl: 'https://maps.google.com/?q=pidebypide+istanbul+avrupa+yakasi',
    cityValue: 'istanbul'
  },
  {
    id: 'istanbul-anadolu',
    title: 'İSTANBUL - ANADOLU YAKASI',
    address: 'Anadolu Yakası',
    phone: '0850 441 7433',
    mapUrl: 'https://maps.google.com/?q=pidebypide+istanbul+anadolu+yakasi',
    cityValue: 'istanbul'
  },
  {
    id: 'izmir-bayrakli',
    title: 'İZMİR - BAYRAKLI',
    address: 'Bayraklı Cadde',
    phone: '0850 441 7433',
    mapUrl: 'https://maps.google.com/?q=pidebypide+izmir+bayrakli',
    cityValue: 'izmir'
  },
  {
    id: 'izmir-edremit',
    title: 'İZMİR - EDREMİT',
    address: 'Edremit Çarşı',
    phone: '0850 441 7433',
    mapUrl: 'https://maps.google.com/?q=pidebypide+izmir+edremit',
    cityValue: 'izmir'
  },
  {
    id: 'ankara-merkez',
    title: 'ANKARA - MERKEZ',
    address: 'Merkez',
    phone: '0850 441 7433',
    mapUrl: 'https://maps.google.com/?q=pidebypide+ankara+merkez',
    cityValue: 'ankara'
  },
  {
    id: 'ankara-cepa',
    title: 'ANKARA - CEPA AVM',
    address: 'Cepa AVM',
    phone: '0850 441 7433',
    mapUrl: 'https://maps.google.com/?q=pidebypide+ankara+cepa',
    cityValue: 'ankara'
  },
  {
    id: 'bursa-merkez',
    title: 'BURSA - MERKEZ',
    address: 'Merkez',
    phone: '0850 441 7433',
    mapUrl: 'https://maps.google.com/?q=pidebypide+bursa+merkez',
    cityValue: 'bursa'
  },
  {
    id: 'antalya-merkez',
    title: 'ANTALYA - MERKEZ',
    address: 'Merkez',
    phone: '0850 441 7433',
    mapUrl: 'https://maps.google.com/?q=pidebypide+antalya+merkez',
    cityValue: 'antalya'
  },
  {
    id: 'adana-merkez',
    title: 'ADANA - MERKEZ',
    address: 'Merkez',
    phone: '0850 441 7433',
    mapUrl: 'https://maps.google.com/?q=pidebypide+adana+merkez',
    cityValue: 'adana'
  },
  {
    id: 'adiyaman-merkez',
    title: 'ADIYAMAN - MERKEZ',
    address: 'Merkez',
    phone: '0850 441 7433',
    mapUrl: 'https://maps.google.com/?q=pidebypide+adiyaman+merkez',
    cityValue: 'adiyaman'
  },
  {
    id: 'afyonkarahisar-merkez',
    title: 'AFYONKARAHİSAR - MERKEZ',
    address: 'Merkez',
    phone: '0850 441 7433',
    mapUrl: 'https://maps.google.com/?q=pidebypide+afyonkarahisar+merkez',
    cityValue: 'afyonkarahisar'
  },
  {
    id: 'aydin-merkez',
    title: 'AYDIN - MERKEZ',
    address: 'Merkez',
    phone: '0850 441 7433',
    mapUrl: 'https://maps.google.com/?q=pidebypide+aydin+merkez',
    cityValue: 'aydin'
  },
  {
    id: 'balikesir-merkez',
    title: 'BALIKESİR - MERKEZ',
    address: 'Merkez',
    phone: '0850 441 7433',
    mapUrl: 'https://maps.google.com/?q=pidebypide+balikesir+merkez',
    cityValue: 'balikesir'
  },
  {
    id: 'corum-merkez',
    title: 'ÇORUM - MERKEZ',
    address: 'Merkez',
    phone: '0850 441 7433',
    mapUrl: 'https://maps.google.com/?q=pidebypide+corum+merkez',
    cityValue: 'corum'
  },
  {
    id: 'denizli-merkez',
    title: 'DENİZLİ - MERKEZ',
    address: 'Merkez',
    phone: '0850 441 7433',
    mapUrl: 'https://maps.google.com/?q=pidebypide+denizli+merkez',
    cityValue: 'denizli'
  }
];

// Şubeleri şehirlere göre grupla
export const groupBranchesByCity = () => {
  const cityGroups: { [key: string]: typeof subeler } = {};
  
  subeler.forEach(sube => {
    if (!cityGroups[sube.cityValue]) {
      cityGroups[sube.cityValue] = [];
    }
    cityGroups[sube.cityValue].push(sube);
  });
  
  return cityGroups;
};
