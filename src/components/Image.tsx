'use client';

import NextImage, { ImageProps as NextImageProps } from 'next/image';

interface ImageProps extends Omit<NextImageProps, 'src'> {
  src: string;
}

/**
 * GitHub Pages ve yerel geliştirme ortamı için optimize edilmiş görsel bileşeni
 * Bu bileşen, basePath (/pidebypide) kontrolünü otomatik olarak yapar
 */
export default function Image({ src, ...props }: ImageProps) {
  const isProd = process.env.NODE_ENV === 'production';
  
  // Eğer src zaten http, data: veya /pidebypide ile başlıyorsa değiştirme
  if (src.startsWith('http') || src.startsWith('data:') || src.startsWith('/pidebypide')) {
    return <NextImage src={src} {...props} />;
  }
  
  // Üretim ortamında göreli yollara basePath ekle
  const basePath = isProd ? '/pidebypide' : '';
  const correctedSrc = `${basePath}${src.startsWith('/') ? '' : '/'}${src}`;
  
  return <NextImage src={correctedSrc} {...props} />;
}
