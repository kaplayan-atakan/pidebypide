// server.js - IIS için Next.js sunucusu
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// IIS ortam ayarları
const dev = false; // IIS'de her zaman production mode
const port = process.env.PORT || 3000;

console.log('🚀 Next.js IIS sunucusu başlatılıyor...');
console.log('Environment:', process.env.NODE_ENV || 'production');
console.log('Port:', port);
console.log('Working Directory:', process.cwd());

// Next.js uygulamasını başlat
const app = next({ 
  dev: dev,
  dir: process.cwd(),
  quiet: false 
});

const handle = app.getRequestHandler();

console.log('Next.js uygulaması hazırlanıyor...');

app.prepare().then(() => {
  console.log('✅ Next.js uygulaması başarıyla hazırlandı');
  
  const server = createServer((req, res) => {
    try {
      // URL'yi parse et
      const parsedUrl = parse(req.url, true);
      
      // Temel logging
      console.log(`📥 ${req.method} ${req.url}`);
      
      // İsteği Next.js handler'ına yönlendir
      handle(req, res, parsedUrl);
      
    } catch (error) {
      console.error('❌ İstek işleme hatası:', error);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  });
  
  server.listen(port, (err) => {
    if (err) {
      console.error('❌ Sunucu başlatma hatası:', err);
      throw err;
    }
    console.log(`✅ Next.js sunucusu ${port} portunda başlatıldı`);
    console.log(`🌐 Server hazır ve istekleri bekliyor`);
  });
  
}).catch((error) => {
  console.error('❌ Next.js hazırlama hatası:', error);
  console.error('Hata detayı:', error.message);
  process.exit(1);
});
