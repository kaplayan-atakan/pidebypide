import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export' // API rotalarını kullanabilmek için kaldırıldı
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
