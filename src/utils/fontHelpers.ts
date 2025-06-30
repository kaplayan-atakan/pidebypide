/* Font yüklemelerini ortama uygun şekilde yönetmek için modül */
import { getAssetPath } from './assetHelpers';

/**
 * Font dosyalarının URL'lerini oluşturur ve basePath'i doğru şekilde ekler
 * @param fontPath Font dosyası yolu (örn. "/assets/fonts/NexaHeavy")
 * @returns URL string to the font file with appropriate basePath
 */
export function getFontUrl(fontPath: string): string {
  return getAssetPath(fontPath);
}

/**
 * Font stil tanımlamasını CSS içine eklemek için kullanılır
 */
export function getFontStylesForHTML(): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  
  return `
    @font-face {
      font-family: 'NEXA HEAVY';
      src: url('${basePath}/assets/fonts/NexaHeavy.woff2') format('woff2'),
           url('${basePath}/assets/fonts/NexaHeavy.woff') format('woff'),
           url('${basePath}/assets/fonts/NexaHeavy.ttf') format('truetype');
      font-weight: 900;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'NEXA BOLD';
      src: url('${basePath}/assets/fonts/NexaBold.woff2') format('woff2'),
           url('${basePath}/assets/fonts/NexaBold.woff') format('woff'),
           url('${basePath}/assets/fonts/NexaBold.ttf') format('truetype');
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }
  `;
}
