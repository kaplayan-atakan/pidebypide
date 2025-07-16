// Tüm şubeler merkezi veri dosyası
// Türkçe açıklama: Şube listesi burada tutulur, hem şubeler sayfası hem harita için kullanılabilir

export interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  district: string;
  phone?: string;
  lat?: number;
  lng?: number;
}

export const branches: Branch[] = [
  { id: 'adana-optimum', name: 'Adana Optimum', address: 'Sinanpaşa Mah. Hacı Ömer Sab. Bul.N:28 K:2 Optimum Avm Yüreğir/Adana', city: 'Adana', district: 'Yüreğir' },
  { id: 'afyonkarahisar-parkafyon', name: 'Park Afyon', address: 'Güvenevler Mah.Maraşal Fevzi Çakmak Bulv.No:2Kat:2 Afyonkarahisar', city: 'Afyonkarahisar', district: '' },
  { id: 'corum-ahlpark', name: 'Çorum Ahl Park', address: 'Çepni Mah. Kerebi Gazi 1.Cad. Cad. Ahlpark Avm Blok No: 7 İç Kapı No: 206 Merkez / Çorum', city: 'Çorum', district: 'Merkez' },
  { id: 'kahramanmaras-piazza', name: 'Kahramanmaraş Piazza', address: 'Şazi Bey Mah. Haydar Aliyev Bul. Piazza Alışveriş Ve Yaşam Merkezı Blok No: 3 İç Kapı No: 218 Onikişubat / Kahramanmaraş', city: 'Kahramanmaraş', district: 'Onikişubat' },
  { id: 'konya-kulesite', name: 'Konya Kule Site', address: 'Musalla Bağları Mah. Kule Cad. Kule Site No: 8 İç Kapı No: 117 Selçuklu / Konya', city: 'Konya', district: 'Selçuklu' },
  { id: 'konya-m1real', name: 'Konya M1 Real', address: 'Doc.Dr.Halil Ürün Cad.M1 Avm No 22Selçuklu', city: 'Konya', district: 'Selçuklu' },
  { id: 'mersin-tarsu', name: 'Tarsu Avm', address: 'Fevzi Cakmak Mh Adana Bulvarı Tarsu Avm 1 Kat No:1087', city: 'Mersin', district: '' },
  { id: 'adiyaman-park', name: 'Adıyaman Park', address: 'Yeni Sanayi, 2819. Sk. 44-50, 02040 Adıyaman Merkez/Adıyaman', city: 'Adıyaman', district: 'Merkez' },
  { id: 'antalya-alanyum', name: 'Alanya Alanyum', address: 'Cumhuriyet Mh. Keykubat Bulv. No:219 Alanyum Avm Kat:2 Kapı No:323', city: 'Antalya', district: 'Alanya' },
  { id: 'antalya-manavgat-novada', name: 'Manavgat Novada', address: 'Sorgun Mahallesi8096 Sokak No:5/SF Blok No:08 07600 Manavgat/Antalya', city: 'Antalya', district: 'Manavgat' },
  { id: 'malatya-park', name: 'Malatya Park', address: 'Merkez İnönü, İnönü Cd. No:192, 44100 Yeşilyurt/Malatya', city: 'Malatya', district: 'Yeşilyurt' },
  { id: 'sanliurfa-piazza', name: 'Urfa Piazza', address: 'Karakoyunlu Mah. 11 Nisan Fuar Cad. Urfa Piazza Avm Blok No: 42 İç Kapı No: 63 Eyyübiye / Şanlıurfa', city: 'Şanlıurfa', district: 'Eyyübiye' },
  { id: 'sivas-ivapark', name: 'Sivas İva Park', address: 'Gültepe, Farabi Cd. No:22, 58080 Okullar Bölgesi/Sivas Merkez/Sivas', city: 'Sivas', district: 'Merkez' },
  { id: 'antalya-mallofantalya', name: 'Mall of Antalya', address: 'Altınova Sinan Mahallesi Serik Caddesi No:309 07170 Kepez/Antalya', city: 'Antalya', district: 'Kepez' },
  { id: 'aydin-forum', name: 'Forum Aydın', address: 'Orta Mah. Müze Bul. No: 1 İç Kapı No: 22 Efeler / Aydın', city: 'Aydın', district: 'Efeler' },
  { id: 'balikesir-edremitkipa', name: 'Edremit Kipa', address: 'Yolören Mah. Yolören/19 Sk. Kipa/Micros Sitesi Kıpa Avm Blok No: 4 Edremit / Balıkesir', city: 'Balıkesir', district: 'Edremit' },
  { id: 'istanbul-212', name: 'İstanbul 212', address: 'Mahmutbey Mah. Taşocağı Yolu Cad. A Blok Sitesi 212 Avm Blok No: 5 İç Kapı No: 233 Bağcılar / İstanbul', city: 'İstanbul', district: 'Bağcılar' },
  { id: 'izmir-pointbornova', name: 'Point Bornova', address: 'Yeşilova Mah. 4174 Sk. A Blok No: 84 İç Kapı No: 206 Bornova / İzmir', city: 'İzmir', district: 'Bornova' },
  { id: 'izmir-westpark', name: 'Westpark', address: 'R.Şevket İnce Mah. 2148/9 Sk. No: 1 İç Kapı No: 206 Bayraklı / İzmir', city: 'İzmir', district: 'Bayraklı' },
  { id: 'izmir-izmirpark', name: 'İzmir Park', address: 'Güneşli Mah. Eşrefpaşa Cad. No: 408 İç Kapı No: 301 Konak / İzmir', city: 'İzmir', district: 'Konak' },
  { id: 'izmir-optimum', name: 'İzmir Optimum', address: 'Beyazevler Mah. Akçay Cad. Optimum Alışveriş Merkezi Blok No: 101 Gaziemir / İzmir', city: 'İzmir', district: 'Gaziemir' },
  { id: 'kocaeli-gebzecenter', name: 'Gebze Center', address: 'Tatlıkuyu Mah. Güney Yanyol Cad. No: 310 İç Kapı No: 424 Gebze / Kocaeli', city: 'Kocaeli', district: 'Gebze' },
  { id: 'aydin-didimcadde', name: 'Didim Cadde', address: 'Altınkum Mahallesi Atatürk Bulvarı No:55/BB Didim / Aydın', city: 'Aydın', district: 'Didim' },
  { id: 'denizli-aquamall', name: 'Denizli Aquamall', address: 'Kayalar, 6028. Sk. No:1, 20030 Denizli Merkez/Denizli', city: 'Denizli', district: 'Merkez' },
  { id: 'isparta-iyaspark', name: 'Isparta İyaş Park', address: 'Süleyman Demirel Bulvarı Bahçelievler Sok. 156. Cad. K:1 No:164/B İyaş Park Avm', city: 'Isparta', district: '' },
  { id: 'afyonkarahisar-dinar', name: 'Afyon Dinar', address: '', city: 'Afyonkarahisar', district: '' },
];
