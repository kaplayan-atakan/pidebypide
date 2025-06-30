// Bu script, build işleminden sonra out/ klasöründeki tüm HTML dosyalarında
// statik varlık yollarını GitHub Pages için düzeltirAdd commentMore actions
// Örnek: /assets/ -> /pidebypide/assets/

import fs from 'fs';
import path from 'path';

// out klasörünün yolu
const outDir = path.join(__dirname, '../out');

// ENV veya config'den basePath al (örn. process.env.BASE_PATH veya .env dosyası)
const basePath = process.env.BASE_PATH || '/pidebypide';

// Gelişmiş asset attribute listesi
const ATTRS = [
  'src', 'href', 'data', 'poster', 'srcset'
];

function fixAssetPaths(content) {
  // Tüm attribute'lar için düzeltme
  ATTRS.forEach(attr => {
    // src="/assets/...", href="/assets/..." gibi
    const regex = new RegExp(`${attr}="\\/([^"]+)`, 'g');
    content = content.replace(regex, `${attr}="${basePath}/$1`);
  });
  // url(/assets/...), url('/assets/...), url("/assets/...)
  content = content.replace(/url\((['"]?)\/([^'")]+)\1\)/g, `url($1${basePath}/$2$1)`);
  return content;
}

// HTML dosyalarını işleyecek fonksiyon
function processHtmlFiles(directory) {
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      // Alt klasörleri de işle
      processHtmlFiles(filePath);
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(filePath, 'utf-8');
      
      content = fixAssetPaths(content);
      
      fs.writeFileSync(filePath, content, 'utf-8');
    }
  });
}

// İşlemi başlat
console.log('HTML dosyalarındaki varlık yolları gelişmiş şekilde düzeltiliyor...');
processHtmlFiles(outDir);
console.log('Varlık yolları başarıyla düzeltildi!');