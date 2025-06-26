# GitHub Pages ve Next.js Rehberi

Bu rehber, Next.js projesini GitHub Pages üzerinde yayınlama sürecini anlatır.

## GitHub Pages ve Next.js Uyum Sorunları

GitHub Pages ile Next.js'i birlikte kullanırken bazı sorunlarla karşılaşabilirsiniz:

1. **404 Hataları**: GitHub Pages, SPA (Single Page Application) yönlendirmelerini doğal olarak desteklemez.
2. **API Rotaları Çalışmaz**: GitHub Pages sadece statik dosyaları barındırır, API rotaları çalışmaz.
3. **basePath ve assetPrefix**: GitHub repo ismi ile uyumlu olması gerekir.

## Çözüm Adımları

### 1. next.config.ts Ayarları

```typescript
const nextConfig: NextConfig = {
  output: 'export', // Statik dışa aktarım için
  basePath: process.env.NODE_ENV === 'production' ? '/repo-ismi' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/repo-ismi/' : '',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true
  }
};
```

### 2. 404 Yönlendirme Çözümü

`public/404.html` ve `public/index.html` dosyaları eklenmiştir:

- `404.html`: GitHub Pages'in 404 sayfasını ana sayfaya yönlendirir.
- `index.html`: Parametreleri işleyerek doğru sayfaya yönlendirme yapar.
- `src/app/not-found.tsx`: Next.js'in kendi 404 sayfası için yönlendirme eklenmiştir.

### 3. Deployment Süreci

Package.json'da eklenen komutlar:

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d out -t true"
}
```

Deployment için:

```bash
npm run deploy
```

### 4. API Rotaları İçin Alternatif Çözümler

API rotaları statik dağıtımlarda çalışmaz. Bunun için:

1. **Formspree**: Form gönderimi için Formspree gibi 3. parti servisler kullanın.
2. **Netlify Forms**: Eğer Netlify kullanıyorsanız, Netlify Forms'u entegre edin.
3. **Serverless Functions**: GitHub Pages yerine Vercel veya Netlify gibi serverless fonksiyon destekleyen platformlara geçiş yapın.

## Yararlı Kaynaklar

1. [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
2. [GitHub Pages Custom Domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
3. [Formspree](https://formspree.io) - Statik formlar için API servisi
