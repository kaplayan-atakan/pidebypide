import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const basePath = ''; // IIS için base path boş bırakıyoruz

const nextConfig: NextConfig = {
  // IIS için export modunu kapatıyoruz - dynamic server kullanacağız
  // output: 'export', // Bu satırı kapatıyoruz
  basePath: basePath,
  assetPrefix: '', // IIS için prefix boş
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: '.next', // Standard Next.js build directory
  images: {
    unoptimized: true // IIS için gerekli
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
