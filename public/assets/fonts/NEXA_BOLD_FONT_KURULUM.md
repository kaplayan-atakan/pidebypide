# NEXA BOLD Font Kurulum Gerekliliği

Bu dosya NEXA BOLD font dosyalarının kurulmasıyla ilgili önemli bilgileri içerir.

## Gerekli Dosyalar

NEXA BOLD fontu için aşağıdaki dosyaların bu dizine yerleştirilmesi gerekiyor:
- `NexaBold.woff2` (en optimize format)
- `NexaBold.woff` (geniş tarayıcı desteği için)
- `NexaBold.ttf` (fallback olarak)

## Kurulum Adımları

1. Lisanslı NEXA BOLD font dosyalarını temin edin
2. Font dosyalarını bu klasöre yerleştirin:
   ```
   public/assets/fonts/
   ├── NexaBold.woff2
   ├── NexaBold.woff
   └── NexaBold.ttf
   ```

3. Dosya adlarının tam olarak eşleştiğinden emin olun

## Font Lisansı

NEXA BOLD FontFabric tarafından lisanslı bir fonttır:
- Resmi site: https://www.fontfabric.com/fonts/nexa/
- Font satın alım bağlantısı: https://www.fontfabric.com/fonts/nexa/

## Kullanım

Font CSS'de otomatik olarak tanımlanmıştır:
- Kategori başlıkları için: `font-['NEXA_BOLD']` class kullanın

```tsx
<h3 className="font-bold font-['NEXA_BOLD']">Kategori Başlığı</h3>
```
