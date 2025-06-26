// next.config.gh-pages.ts - GitHub Pages için özel yapılandırma
// GitHub Pages'te API rotaları çalışmadığı için bu dosyayı kullanın
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // GitHub Pages için statik dışa aktarım
  basePath: process.env.NODE_ENV === 'production' ? '/pidebypide' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/pidebypide/' : '',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true
  }
};

export default nextConfig;

/*
  GitHub Pages için Dağıtım Adımları:
  
  1. API rotalarını devre dışı bırakın (GitHub Pages sadece statik dosyaları destekler)
  2. Bu dosyayı kullanmak için:
  
  # Bu özel yapılandırmayı geçici olarak etkinleştirin
  copy next.config.gh-pages.ts next.config.ts
  
  # Build ve deploy yapın
  npm run build
  npm run deploy
  
  # Orijinal yapılandırmayı geri yükleyin (API rotaları için)
  git checkout -- next.config.ts
*/
