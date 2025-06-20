# Pide By Pide - Website

Kurumsal web sitesi - Next.js 15 ile geliştirilmiştir.

## 🚀 Özellikler

- **Next.js 15** - App Router mimarisi
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Modern CSS framework
- **Dinamik Favicon** - Aktif/pasif sekme durumuna göre değişir
- **Interaktif Türkiye Haritası** - Şube konumları ile
- **Responsive Design** - Tüm cihazlarda uyumlu
- **Kurumsal Renk Paleti** - Tutarlı brand identity
- **Custom Typography** - NEXA HEAVY (başlıklar) + RED HAT DISPLAY (body text)

## 🎨 Kurumsal Renk Paleti

- **Ana renk:** `#14543c` (kurumsal yeşil) - Butonlar, başlıklar, anahtar eylemler
- **Vurgu rengi:** `#f29b24` (turuncu) - Hover efektleri, CTA'lar, ikonlar  
- **İkincil renk:** `#7b7934` (zeytin yeşili) - Arka planlar, kenarlıklar, ikincil öğeler

## 🔤 Typography

- **Başlıklar:** NEXA HEAVY (font-weight: 900) - `font-header` utility class
- **Body Text:** RED HAT DISPLAY (Google Fonts) - `font-body` utility class
- **Navigation:** RED HAT DISPLAY (font-weight: 600)
- **Butonlar:** RED HAT DISPLAY (font-weight: 600)

### Font Dosyaları

- RED HAT DISPLAY: Google Fonts üzerinden otomatik yüklenir
- NEXA HEAVY: `/public/assets/fonts/` klasöründe bulunur (lisanslı font)

**Not:** NEXA HEAVY font dosyaları şu anda placeholder'dır. Gerçek lisanslı font dosyalarını temin ettikten sonra aşağıdaki dosyaları değiştirin:
- `public/assets/fonts/NexaHeavy.woff2`
- `public/assets/fonts/NexaHeavy.woff`
- `public/assets/fonts/NexaHeavy.ttf`

## 🚦 Geliştirme

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Kurulum ve Çalıştırma

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build

# Linting
npm run lint
```

### GitHub Pages Deployment

Proje GitHub Pages üzerinde çalışacak şekilde yapılandırılmıştır:

```bash
# Static export oluştur
npm run build

# Build dosyaları ./out klasöründe oluşur
```

GitHub Actions ile otomatik deployment yapılır. Manuel deployment için:
1. `npm run build` çalıştırın
2. `./out` klasörünü GitHub Pages'e yükleyin

### URL Yapısı
- **Local:** `http://localhost:3000`
- **GitHub Pages:** `https://username.github.io/pidebypide`

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router sayfaları
├── components/            # React bileşenleri
│   ├── Header/           # Header bileşenleri
│   ├── Footer/           # Footer bileşenleri
│   └── UI/               # UI bileşenleri (TurkeyMap, Slider, etc.)
├── data/                 # Static data (cityPaths.ts)
└── utils/                # Utility fonksiyonları (assetPath.ts)

public/
├── assets/
│   ├── fonts/           # Custom font files
│   ├── images/          # Site görselleri
│   └── favicons/        # Favicon dosyaları
└── upload/              # Upload edilen dosyalar
```

## 🎯 Önemli Notlar

- Tüm görseller `getAssetPath()` utility fonksiyonu ile yüklenir
- Favicon dinamik olarak değişir (aktif/pasif sekme)
- Türkiye haritası tamamen SVG path'ler ile çizilir (overlay yok)
- Responsive tasarım tüm ekran boyutlarında test edilmiştir
- Türkçe karakter desteği mevcuttur

## 🐛 Bilinen Sorunlar

- NEXA HEAVY font dosyaları placeholder durumundadır
- Build sırasında metadataBase uyarısı (minor - functionality etkilemez)

## 📞 Destek

Proje hakkında sorularınız için geliştirici ekibi ile iletişime geçin.
