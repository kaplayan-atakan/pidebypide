'use client';

import { useFavicon, DEFAULT_FAVICON_CONFIG } from '@/hooks/useFavicon';
import { useEffect } from 'react';

/**
 * Favicon Provider Component
 * Dinamik favicon işlevselliğini sağlar
 */
export default function FaviconProvider() {
  // Favicon hook'unu kullan
  const { isInitialized } = useFavicon(DEFAULT_FAVICON_CONFIG);

  // Debug amaçlı, komponent mount olduğunda log oluştur
  useEffect(() => {
    // console.log('FaviconProvider mount edildi');
    
    // Mevcut favicon durumunu kontrol et
    setTimeout(() => {
      // console.log('FaviconProvider setTimeout çalıştı');
      // console.log('Favicon başlatıldı mı?', isInitialized);
      
      try {
        const icons = document.querySelectorAll('link[rel*="icon"]');
        // console.log('Mevcut favicon sayısı:', icons.length);
        icons.forEach(icon => {
          console.log(`- ${icon.getAttribute('rel')}: ${icon.getAttribute('href')}`);
        });
      } catch (err) {
        console.error('Favicon kontrol hatası:', err);
      }
    }, 2000);
    
    return () => {
      console.log('FaviconProvider unmount edildi');
    };
  }, [isInitialized]);

  // Bu component görsel bir çıktı üretmez
  return null;
}
