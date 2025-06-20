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
    // Mevcut favicon elementlerini kaldır (çakışmaları önlemek için)
    const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
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
    // Mevcut favicon'ları kaldır
    const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
    existingFavicons.forEach(favicon => {
      if (favicon.getAttribute('rel') === 'icon' || favicon.getAttribute('rel') === 'shortcut icon') {
        favicon.remove();
      }
    });

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
      // Favicon elementlerini initialize et
      faviconElementsRef.current = initializeFaviconElements();
      
      // Favicon dosyalarını preload et
      preloadFavicons(config.active, config.inactive);
      
      // İlk favicon'u aktif olarak ayarla
      changeFavicon(config.active);
      
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
  }, [config.active, config.inactive]);

  return {
    changeFavicon,
    isInitialized: isInitializedRef.current
  };
}

/**
 * Default favicon konfigürasyonu
 */
export const DEFAULT_FAVICON_CONFIG: FaviconConfig = {
  active: '/favicons/favicon-active.ico',
  inactive: '/favicons/favicon-inactive.ico'
};
