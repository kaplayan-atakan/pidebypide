# GitHub Pages ve API Rotaları Çözümü

GitHub Pages bir statik web sitesi barındırma servisidir ve Next.js API rotalarını çalıştıramaz. Statik dışa aktarım yaparken (`output: 'export'`) API rotalarıyla ilgili hatalar alacaksınız.

## GitHub Pages 404 Hatası ve API Rotaları Sorunu İçin Çözüm

### Çözüm 1: API Rotalarını Devre Dışı Bırakma (GitHub Pages için)

1. GitHub Pages'te dağıtım yapmadan önce API klasörünü geçici olarak yeniden adlandırın:

```bash
# Windows PowerShell
Move-Item -Path "src\app\api" -Destination "src\app\api-disabled-temp"

# veya elle yapın:
# src/app/api klasörünü src/app/api-disabled olarak yeniden adlandırın
```

2. API dosyalarındaki `dynamic = 'force-dynamic'` ifadelerini yorum satırına alın:

```typescript
// export const dynamic = 'force-dynamic'; // statik dışa aktarım için devre dışı bırakıldı
```

2. Build yapın ve dağıtım gerçekleştirin:

```bash
npm run build
npm run deploy
```

3. Dağıtımdan sonra API klasörünü geri getirin:

```bash
# Windows PowerShell
Move-Item -Path "src\app\api-disabled-temp" -Destination "src\app\api"
```

### Form Sayfalarını Statik Dışa Aktarım İçin Hazırlama

Statik dışa aktarım ile API rotalarını kullanan FormspreeForm bileşeni çalışmayacaktır. Bu nedenle, Next.js form sayfalarınızı Formspree ile çalışacak şekilde güncellemeniz gerekecek. Form bileşenlerinizi şu şekilde değiştirmeniz gerekmektedir:

1. Mevcut `ContactForm.tsx`:
```tsx
// API rotasını kullanan eski versiyon
fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(formData)
});
```

2. Formspree ile güncellenmiş versiyon:
```tsx
// Formspree ile statik dışa aktarım için güncellenmiş versiyon
fetch('https://formspree.io/f/FORMSPREE_ID_BURAYA', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify(formData)
});
```

`src/components/examples/FormspreeContactForm.tsx` ve `src/components/examples/FormspreeFormspreeForm.tsx` dosyalarında hazır örnekler mevcuttur. Bunları kendi formlarınıza uyarlayabilirsiniz.

### Formspree Entegrasyonu (Önerilen)

GitHub Pages gibi statik sunucularda form işlemleri için Formspree kullanabilirsiniz:

1. [Formspree.io](https://formspree.io) adresine gidin ve ücretsiz hesap oluşturun
2. "New Form" butonuna tıklayarak yeni form oluşturun
3. Form URL'sinden Form ID'nizi alın (https://formspree.io/f/xxxxxxxxxxxx)
4. Bu ID'yi form bileşeninize ekleyin:

```tsx
// Örnek statik form yapısı
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('https://formspree.io/f/xxxxxxxxxxxx', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      // Başarılı işlem
    }
  } catch (error) {
    // Hata yönetimi
  }
};
```

### Çözüm 3: Next.js API ve GitHub Pages Alternatifi

API'lerin çalışması gerekiyorsa, şu seçenekleri değerlendirebilirsiniz:

1. **Vercel**: Next.js'in yapımcılarının platformu, API rotalarını tam destekler.
2. **Netlify**: Serverless fonksiyonlar ve form işleme özelliği vardır.
3. **Railway/Render**: Tam Node.js uygulaması olarak deploy edebilirsiniz.

## API-Form İkilemi Nasıl Çözülür?

1. **Hibrit Yaklaşım**: Statik sayfalar için GitHub Pages + Formlar için ayrı bir sunucu/servis.
2. **Vercel'e Geçiş**: Hem statik sayfalar hem API'ler için tek platformda çözüm.
3. **REST API Mikro Servis**: Sadece formlar için küçük bir Express uygulaması deploy edin.

## Next.js Yapılandırması

```typescript
// next.config.ts

const nextConfig: NextConfig = {
  // Seçim yapın:
  
  // 1. GitHub Pages için (API yok):
  output: 'export',
  
  // 2. Vercel/Node.js hosting için (API desteklenir):
  // output: 'export' satırını kaldırın veya yoruma alın
  
  // GitHub Pages ortak ayarlar:
  basePath: process.env.NODE_ENV === 'production' ? '/pidebypide' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/pidebypide/' : '',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};
```

## GitHub Pages Dağıtım Adımları

1. **API Dosyalarını Geçici Olarak Devre Dışı Bırakın**

```bash
# Windows PowerShell
Move-Item -Path "src\app\api" -Destination "src\app\api-disabled-temp"

# Eğer klasörü elle taşıdıysanız, API dosyalarındaki dynamic değişkenlerini yorum satırına alın:
// export const dynamic = 'force-dynamic'; 
```

2. **API Kullanmayan Formları Hazırlayın**

Form bileşenlerinde API rotaları yerine Formspree kullanacak şekilde güncelleyin (örnekler `src/components/examples/` klasöründe bulunur).

3. **Build ve Deploy İşlemi**

```bash
# Projeyi derleyin
npm run build

# Deploy işlemi için gh-pages kullanın
npm run deploy
```

4. **API Klasörünü Geri Getirin**

```bash
# Windows PowerShell
Move-Item -Path "src\app\api-disabled-temp" -Destination "src\app\api"
```

5. **Gerçek Formspree ID'lerini Ekleyin**

Formlarınızda kullandığınız placeholder Formspree ID'lerini (`FORMSPREE_ID_BURAYA`, `FRANCHISE_FORM_ID` vb.) gerçek Formspree form ID'lerinizle değiştirin.
```
