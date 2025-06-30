/**
 * Favicon ve diğer ikon URL'lerini ortama göre (dev/prod) doğru şekilde oluşturur
 */
import { getAssetPath } from './assetHelpers';

export function getFaviconPath(path: string): string {
  return getAssetPath(path);
}

/**
 * Metadata için favicon ve ikon yollarını oluşturur
 */
export function getIconsMetadata() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  
  return {
    icon: [
      {
        url: `${basePath}/assets/images/favicon/favicon.ico`,
        sizes: "48x48",
        type: "image/x-icon",
      }
    ],
    shortcut: [
      {
        url: `${basePath}/assets/images/favicon/favicon.ico`,
        sizes: "48x48",
        type: "image/x-icon",
      }
    ],
    apple: [
      {
        url: `${basePath}/assets/images/favicon/apple-touch-icon.png`,
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: `${basePath}/assets/images/favicon/safari-pinned-tab.svg`,
        color: "#14543c",
      },
    ],
  };
}
