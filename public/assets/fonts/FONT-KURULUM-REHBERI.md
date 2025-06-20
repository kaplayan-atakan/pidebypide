# NEXA HEAVY Font Installation Guide

Bu dosya NEXA HEAVY font kurulumu için rehberdir.

## Font Dosyaları

NEXA HEAVY font aşağıdaki formatlarda olmalıdır:
- `NexaHeavy.woff2` (en optimize format)
- `NexaHeavy.woff` (geniş tarayıcı desteği için)
- `NexaHeavy.ttf` (fallback olarak)

## Kurulum Adımları

1. Lisanslı NEXA HEAVY font dosyalarını temin edin
2. Font dosyalarını aşağıdaki klasöre yerleştirin:
   ```
   public/assets/fonts/
   ├── NexaHeavy.woff2
   ├── NexaHeavy.woff
   └── NexaHeavy.ttf
   ```

3. Dosya adlarının tam olarak eşleştiğinden emin olun
4. Font dosyalarının çalıştığını kontrol edin:
   ```bash
   npm run dev
   ```

## Font Lisansı

NEXA HEAVY FontFabric tarafından lisanslı bir fonttır:
- Resmi site: https://www.fontfabric.com/fonts/nexa/
- Font satın alım bağlantısı: https://www.fontfabric.com/fonts/nexa/

## Kullanım

Font CSS'de otomatik olarak tanımlanmıştır:
- Başlıklar için: `font-header` utility class kullanın
- Body text için: `font-body` utility class kullanın

```tsx
// Başlık örnegi
<h1 className="font-header text-2xl">Başlık</h1>

// Body text örneği  
<p className="font-body">Normal metin</p>
```

## Türkçe Karakter Desteği

Font dosyaları Türkçe karakterleri (ç, ğ, ı, ö, ş, ü, Ç, Ğ, I, İ, Ö, Ş, Ü) desteklemelidir.

## Fallback Fonts

NEXA HEAVY yüklenemezse şu fallback fontlar kullanılır:
1. Arial Black
2. Impact
3. Sans-serif

## Sorun Giderme

Font yüklenmiyor ise:
1. Font dosyalarının doğru klasörde olduğunu kontrol edin
2. Dosya adlarının büyük/küçük harf eşleştiğini kontrol edin
3. Browser cache'ini temizleyin (Ctrl+F5)
4. Developer Tools'da Console'u kontrol edin

## Test

Font kurulumunu test etmek için:
1. Browser'da developer tools açın
2. Elements sekmesinde bir başlık elementini inceleyin  
3. Computed styles'da font-family değerini kontrol edin
4. "NEXA HEAVY" görünmelidir
