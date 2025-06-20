'use client';

import { useFavicon, DEFAULT_FAVICON_CONFIG } from '@/hooks/useFavicon';

/**
 * Favicon Provider Component
 * Dinamik favicon işlevselliğini sağlar
 */
export default function FaviconProvider() {
  // Favicon hook'unu kullan
  useFavicon(DEFAULT_FAVICON_CONFIG);

  // Bu component görsel bir çıktı üretmez
  return null;
}
