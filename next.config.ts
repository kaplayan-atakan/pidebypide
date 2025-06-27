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
  },
  // Statik varlıkları düzgün işlemek için
  webpack: (config) => {
    return config;
  }
};

export default nextConfig;
