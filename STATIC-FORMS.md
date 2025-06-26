# Statik Form Entegrasyonu

GitHub Pages gibi statik dağıtımlar için API rotaları çalışmaz. Formları çalıştırmak için aşağıdaki seçenekleri kullanabilirsiniz:

## 1. Formspree Kullanımı (Önerilen)

1. [Formspree](https://formspree.io)'de ücretsiz bir hesap oluşturun
2. Yeni bir form oluşturun ve form ID'sini alın
3. `src/components/FormspreeForm.tsx` bileşenini formlarınızda kullanın

Örnek:

```tsx
import FormspreeForm from '@/components/FormspreeForm';

export default function IletisimSayfasi() {
  return (
    <FormspreeForm formId="xxxxxxxxxxxx"> {/* Formspree'den aldığınız ID */}
      <input name="name" placeholder="Adınız" />
      <input name="email" type="email" placeholder="E-posta" required />
      <textarea name="message" placeholder="Mesajınız"></textarea>
      <button type="submit">Gönder</button>
    </FormspreeForm>
  );
}
```

## 2. Netlify Forms

Eğer Netlify kullanıyorsanız, Netlify Forms'u kullanabilirsiniz. 

## 3. API Rotalarını Kullanmak İçin Vercel veya Node.js Tabanlı Hosting

API rotalarını kullanmak istiyorsanız:

1. GitHub Pages yerine Vercel'e geçiş yapabilirsiniz
2. `next.config.ts` dosyasında `output: 'export'` seçeneğini kaldırmanız gerekir

```typescript
const nextConfig: NextConfig = {
  // output: 'export' seçeneğini kaldırın (yoruma alın)
  basePath: process.env.NODE_ENV === 'production' ? '/pidebypide' : '',
  // ...diğer ayarlar
};
```
