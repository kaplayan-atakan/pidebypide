'use client';

import { useEffect, useState } from 'react';

/**
 * Responsive breakpoint hook
 * Tailwind CSS breakpoints'lere uygun
 */
export function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const [breakpoint, setBreakpoint] = useState({
    isMobile: false,      // < 640px
    isTablet: false,      // 640px - 767px
    isDesktop: false,     // >= 768px
    isLarge: false,       // >= 1024px
    isXLarge: false,      // >= 1280px
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        setWindowSize({ width, height });
        
        setBreakpoint({
          isMobile: width < 640,
          isTablet: width >= 640 && width < 768,
          isDesktop: width >= 768,
          isLarge: width >= 1024,
          isXLarge: width >= 1280,
        });
      };

      // İlk yüklenmede boyutu ayarla
      handleResize();
      
      // Resize event listener ekle
      window.addEventListener('resize', handleResize);
      
      // Cleanup function
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return {
    windowSize,
    ...breakpoint,
    // Utility functions
    isMobileOrTablet: breakpoint.isMobile || breakpoint.isTablet,
    isTabletOrDesktop: breakpoint.isTablet || breakpoint.isDesktop,
    isDesktopOrLarge: breakpoint.isDesktop || breakpoint.isLarge,
  };
}

/**
 * Medya query hook - CSS medya queries ile eşleşen fonksiyonalite
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query);
      
      // İlk durumu ayarla
      setMatches(media.matches);
      
      // Change event listener
      const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
      
      // Modern browsers
      if (media.addEventListener) {
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
      } else {
        // Legacy browsers
        media.addListener(listener);
        return () => media.removeListener(listener);
      }
    }
  }, [query]);

  return matches;
}

/**
 * Touch device detection hook
 */
export function useTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkTouchDevice = () => {        return (
          'ontouchstart' in window ||
          navigator.maxTouchPoints > 0 ||
          // @ts-expect-error - Legacy IE property
          navigator.msMaxTouchPoints > 0
        );
      };

      setIsTouchDevice(checkTouchDevice());
    }
  }, []);

  return isTouchDevice;
}

/**
 * Viewport dimensions hook
 */
export function useViewport() {
  const [viewport, setViewport] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setViewport({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return viewport;
}
