'use client';

import { useEffect, useRef } from 'react';

/**
 * Favicon durumları için interface
 */
interface FaviconConfig {
  active: string;
  inactive: string;
}

/**
 * Favicon elementlerini yönetmek için interface
 */
interface FaviconElements {
  iconLink: HTMLLinkElement | null;
  shortcutLink: HTMLLinkElement | null;
}

/**
 * Dinamik favicon hook'u
 * Sekme aktif/pasif durumuna göre favicon'u değiştirir
 */
export function useFavicon(config: FaviconConfig) {
  const faviconElementsRef = useRef<FaviconElements>({
    iconLink: null,
    shortcutLink: null
  });
  const isInitializedRef = useRef(false);

  /**
   * Favicon dosyalarını preload eder
   */
  const preloadFavicons = (activePath: string, inactivePath: string) => {
    // Aktif favicon preload
    const activeLink = document.createElement('link');
    activeLink.rel = 'preload';
    activeLink.href = activePath;
    activeLink.as = 'image';
    document.head.appendChild(activeLink);

    // Pasif favicon preload
    const inactiveLink = document.createElement('link');
    inactiveLink.rel = 'preload';
    inactiveLink.href = inactivePath;
    inactiveLink.as = 'image';
    document.head.appendChild(inactiveLink);
  };

  /**
   * Favicon elementlerini bulur veya oluşturur
   */
  const initializeFaviconElements = (): FaviconElements => {
    // console.log('Favicon elementleri başlatılıyor...'); // Debug log ekledim
    
    // Mevcut favicon elementlerini kaldır (çakışmaları önlemek için)
    const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
    // console.log(`Mevcut favicon elementleri: ${existingFavicons.length}`); // Debug log
    existingFavicons.forEach(favicon => {
      if (favicon.getAttribute('rel') === 'icon' || favicon.getAttribute('rel') === 'shortcut icon') {
        favicon.remove();
      }
    });

    // Yeni favicon elementleri oluştur
    const iconLink = document.createElement('link');
    iconLink.rel = 'icon';
    iconLink.type = 'image/x-icon';
    document.head.appendChild(iconLink);

    const shortcutLink = document.createElement('link');
    shortcutLink.rel = 'shortcut icon';
    shortcutLink.type = 'image/x-icon';
    document.head.appendChild(shortcutLink);

    return { iconLink, shortcutLink };
  };

  /**
   * Favicon'u değiştirir
   */
  const changeFavicon = (iconPath: string) => {
    // console.log(`Favicon değiştiriliyor: ${iconPath}`); // Debug log ekledim
    
    try {
      // Mevcut favicon'ları kaldır
      const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
      // console.log(`Mevcut favicon elementleri (değiştirme öncesi): ${existingFavicons.length}`); 
      
      existingFavicons.forEach(favicon => {
        const rel = favicon.getAttribute('rel');
        // const href = favicon.getAttribute('href');
        
        if (rel === 'icon' || rel === 'shortcut icon') {
          // console.log(`Favicon kaldırılıyor: ${rel} - ${href}`);
          favicon.remove();
        }
      });
    } catch (error) {
      console.error('Favicon değiştirme hatası:', error);
    }

    // Yeni favicon'ları ekle
    const iconLink = document.createElement('link');
    iconLink.rel = 'icon';
    iconLink.type = 'image/x-icon';
    iconLink.href = `${iconPath}?t=${Date.now()}`;
    document.head.appendChild(iconLink);
    
    const shortcutLink = document.createElement('link');
    shortcutLink.rel = 'shortcut icon';
    shortcutLink.type = 'image/x-icon';
    shortcutLink.href = `${iconPath}?t=${Date.now()}`;
    document.head.appendChild(shortcutLink);
    
    // Ref'leri güncelle
    faviconElementsRef.current = {
      iconLink,
      shortcutLink
    };
  };

  useEffect(() => {
    /**
     * Visibility change event handler
     */
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Sekme pasif hale geldi
        changeFavicon(config.inactive);
      } else {
        // Sekme aktif hale geldi
        changeFavicon(config.active);
      }
    };

    // Sadece bir kere initialize et
    if (!isInitializedRef.current) {
      // console.log('useFavicon hook ilk kez çalıştırılıyor'); // Debug log
      // console.log('Favicon konfigürasyonu:', config); // Debug log
      
      // Favicon elementlerini initialize et
      faviconElementsRef.current = initializeFaviconElements();
      
      // Favicon dosyalarını preload et
      preloadFavicons(config.active, config.inactive);
      
      // İlk favicon'u aktif olarak ayarla
      changeFavicon(config.active);
      
      // Her şeyi bir kez daha kontrol et
      // setTimeout(() => {
      //   // console.log('5 saniye sonra favicon durumu kontrol ediliyor');
      //   const currentFavicons = document.querySelectorAll('link[rel*="icon"]');
      //   // console.log(`Mevcut favicon elementleri: ${currentFavicons.length}`);
      //   currentFavicons.forEach(favicon => {
      //     // console.log(`- ${favicon.getAttribute('rel')}: ${favicon.getAttribute('href')}`);
      //   });
      // }, 5000);
      
      isInitializedRef.current = true;
    }

    // Visibility change event listener'ı ekle
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Alternatif eventler - daha iyi uyumluluk için
    window.addEventListener('focus', () => {
      changeFavicon(config.active);
    });
    
    window.addEventListener('blur', () => {
      changeFavicon(config.inactive);
    });

    // Cleanup function
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', () => changeFavicon(config.active));
      window.removeEventListener('blur', () => changeFavicon(config.inactive));
    };
  }, [config]);

  return {
    changeFavicon,
    isInitialized: isInitializedRef.current
  };
}

/**
 * Default favicon konfigürasyonu
 */
// basePath'i ekleyerek doğru favicon yollarını oluşturuyoruz
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Konsol çıktılarından yol sorununu belirleme
console.log('Favicon için basePath değeri:', basePath);

export const DEFAULT_FAVICON_CONFIG: FaviconConfig = {
  active: `${basePath}/assets/images/favicon/favicon.ico`,
  inactive: `${basePath}/assets/images/favicon/favicon-inactive.ico`
};
