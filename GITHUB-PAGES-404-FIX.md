# GitHub Pages Dağıtım ve 404 Hata Çözümü

Bu dokümantasyon, Next.js projesinin GitHub Pages'te dağıtım sürecinde karşılaşılan 404 hataları ve statik varlık sorunlarının çözümünü içerir.

## Tespit Edilen Sorunlar ve Çözümleri

### 1. Statik Varlık Yolu Sorunları

Statik varlıklar (görseller, fontlar, favicon dosyaları) için 404 hataları alınıyordu. Bu sorunlar şu değişikliklerle çözüldü:

#### Düzenlenen Dosyalar:

- **next.config.ts**: webpack yapılandırması eklendi
- **src/app/globals.css**: Font yolları `/pidebypide/assets/fonts/...` şeklinde düzeltildi
- **src/app/layout.tsx**: Favicon referansları GitHub Pages ile uyumlu hale getirildi
- **public/assets/images/favicon/site.webmanifest**: İkon yolları düzeltildi

#### Eklenen Dosyalar:

- **src/components/Image.tsx**: GitHub Pages ile uyumlu görsel bileşeni
- **scripts/fix-asset-paths.mjs**: HTML dosyalarındaki statik varlık yollarını düzelten script

### 2. Deployment Stratejisi

Next.js statik dağıtımı için gerekli yapılandırmalar uygulandı:

- **package.json**: Build komutuna post-processing script eklendi
- **Layout.tsx**: `dynamic = 'force-static'` ayarı eklendi

## Dağıtım Süreci

1. **Derleme ve Optimize Etme**

```bash
npm run build
```

Bu komut şunları yapar:
- Next.js projesini derler
- `scripts/fix-asset-paths.mjs` çalışır ve HTML dosyalarındaki tüm varlık yollarını GitHub Pages için düzeltir

2. **GitHub Pages'e Dağıtım**

```bash
npm run deploy
```

Bu komut şunları yapar:
- `gh-pages` paketi ile `out/` klasörünü GitHub'ın gh-pages dalına yükler

## Dikkat Edilecek Hususlar

1. **Görsel Kullanımı**:
   - Her görsel için `next/image` yerine `@/components/Image` bileşenini kullanın
   - Örnek: `<Image src="/assets/images/logo.png" alt="Logo" width={200} height={100} />`

2. **Fontlar ve CSS**:
   - Font yollarını düzenlerken `/pidebypide/assets/fonts/...` şeklinde tam yolu kullanın

3. **Statik HTML İçeriği**:
   - HTML içinde görsellere doğrudan referans veriyorsanız `/pidebypide/` ön ekini ekleyin
   - Örnek: `<img src="/pidebypide/assets/images/logo.png" alt="Logo" />`

4. **API Rotaları**:
   - GitHub Pages statik bir hosting olduğu için API rotaları çalışmaz
   - Form gönderimi için Formspree gibi üçüncü parti servisler kullanın

## Bilinen Sınırlamalar

1. GitHub Pages sadece statik dosyaları destekler, API rotaları çalışmaz
2. Next.js'in bazı dinamik özellikleri (SSR, ISR) kullanılamaz
3. RSC Prefetch hatalarını tamamen ortadan kaldırmak mümkün olmayabilir

## Otomatik Düzeltmeler

`scripts/fix-asset-paths.mjs` scripti, derlenen HTML dosyalarında aşağıdaki yolları otomatik olarak düzeltir:

- `/assets/` -> `/pidebypide/assets/`
- `/favicons/` -> `/pidebypide/favicons/`
- `/fonts/` -> `/pidebypide/fonts/`
- `/_next/` -> `/pidebypide/_next/`
- `/upload/` -> `/pidebypide/upload/`
