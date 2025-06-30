import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/pidebypide' : '';

const nextConfig: NextConfig = {
  output: 'export', // GitHub Pages için statik dışa aktarım
  basePath: basePath,
  assetPrefix: isProd ? '/pidebypide/' : '',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true
  },
  // Statik varlıkları düzgün işlemek için
  webpack: (config) => {
    return config;
  },
  // Çevresel değişkenler
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  }
};

export default nextConfig;
