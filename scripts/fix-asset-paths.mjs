// Bu script, build işleminden sonra out/ klasöründeki tüm HTML dosyalarında
// statik varlık yollarını GitHub Pages için düzeltir
// Örnek: /assets/ -> /pidebypide/assets/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname'in ESM karşılığı
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// out klasörünün yolu
const outDir = path.join(__dirname, '../out');

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
      
      // Bu ifadeler yerel geliştirme ortamında çalışıyor
      // ancak GitHub Pages'te düzeltme gerekiyor
      content = content.replace(/src="\/assets\//g, 'src="/pidebypide/assets/');
      content = content.replace(/href="\/assets\//g, 'href="/pidebypide/assets/');
      content = content.replace(/url\(\/assets\//g, 'url(/pidebypide/assets/');
      
      // Favicon yollarını düzelt
      content = content.replace(/src="\/favicons\//g, 'src="/pidebypide/favicons/');
      content = content.replace(/href="\/favicons\//g, 'href="/pidebypide/favicons/');
      
      // Font yollarını düzelt
      content = content.replace(/src="\/fonts\//g, 'src="/pidebypide/fonts/');
      content = content.replace(/href="\/fonts\//g, 'href="/pidebypide/fonts/');
      
      // Diğer statik dosya türleri için de benzer şekilde düzelt
      content = content.replace(/src="\/_next\//g, 'src="/pidebypide/_next/');
      content = content.replace(/href="\/_next\//g, 'href="/pidebypide/_next/');
      
      // Upload klasörü için
      content = content.replace(/src="\/upload\//g, 'src="/pidebypide/upload/');
      content = content.replace(/href="\/upload\//g, 'href="/pidebypide/upload/');
      
      fs.writeFileSync(filePath, content, 'utf-8');
    }
  });
}

// İşlemi başlat
console.log('HTML dosyalarındaki varlık yolları düzeltiliyor...');
processHtmlFiles(outDir);
console.log('Varlık yolları başarıyla düzeltildi!');
