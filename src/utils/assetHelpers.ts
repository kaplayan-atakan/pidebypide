/**
 * Ortama göre (geliştirme veya üretim) doğru yolları döndüren yardımcı fonksiyon
 * GitHub Pages deployment için basePath ekler
 */

/**
 * Ortama göre doğru varlık (asset) yolunu döndürür
 * @param path Dosya yolu (örn. "/assets/images/foto.jpg")
 */
export function getAssetPath(path: string): string {
  // Next.js env değişkeninden basePath'i oku
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  
  // Zaten başında / var mı kontrol et
  if (path.startsWith('/')) {
    return `${basePath}${path}`;
  }
  
  return `${basePath}/${path}`;
}
