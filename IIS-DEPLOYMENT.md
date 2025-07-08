# IIS Deployment Rehberi - Pide By Pide

Bu rehber, Windows Server IIS üzerinde Next.js uygulamanızı çalıştırmak için gerekli adımları içerir.

## Ön Koşullar

### 1. IIS Modülleri
Aşağıdaki IIS modüllerinin yüklü olması gerekir:
- **IIS** (Internet Information Services)
- **IISNode** modülü
- **URL Rewrite** modülü
- **Node.js** (v18+ önerilir)

### 2. Node.js ve NPM
```bash
# Node.js versiyonu kontrol et
node --version

# NPM versiyonu kontrol et
npm --version
```

## Deployment Adımları

### 1. Bağımlılıkları Yükle
```bash
cd C:\inetpub\wwwroot\pidebypide
npm install
```

### 2. Üretim Build'i Oluştur
```bash
npm run iis:build
```

### 3. IIS Site Konfigürasyonu
1. **IIS Manager**'ı açın
2. **Sites** > **Default Web Site** > **pidebypide** klasörüne sağ tıklayın
3. **Convert to Application** seçin
4. **Application Pool** ayarlarını yapın:
   - **.NET CLR Version**: No Managed Code
   - **Managed Pipeline Mode**: Integrated

### 4. Application Pool Ayarları
```xml
<applicationPool>
  <processModel 
    identityType="ApplicationPoolIdentity" 
    idleTimeout="00:00:00"
    maxProcesses="1" />
</applicationPool>
```

### 5. Dosya İzinleri
Aşağıdaki klasörlere **IIS_IUSRS** için **Full Control** verin:
- `C:\inetpub\wwwroot\pidebypide\`
- `C:\inetpub\wwwroot\pidebypide\.next\`
- `C:\inetpub\wwwroot\pidebypide\public\`

## Dosya Yapısı

### Gerekli Dosyalar
- ✅ `web.config` - IIS konfigürasyonu
- ✅ `server.js` - Node.js sunucu dosyası
- ✅ `package.json` - NPM bağımlılıkları
- ✅ `.next/` - Next.js build çıktısı

### Konfigürasyon Dosyaları
```
pidebypide/
├── web.config          # IIS konfigürasyonu
├── server.js           # Node.js entry point
├── package.json        # NPM ayarları
├── .next/              # Build çıktısı
├── public/             # Statik dosyalar
└── src/                # Kaynak kodlar
```

## Test ve Doğrulama

### 1. Local Test
```bash
# IIS server'ı test et
npm run iis:start
```

### 2. Tarayıcıda Test
- Ana sayfa: `http://localhost/pidebypide/`
- API endpoint'leri: `http://localhost/pidebypide/api/`

### 3. Log Kontrolü
IIS logları kontrol edin:
- **IIS Logs**: `C:\inetpub\logs\LogFiles\`
- **IISNode Logs**: `C:\inetpub\wwwroot\pidebypide\iisnode\`

## Sorun Giderme

### Yaygın Hatalar

**1. "Cannot find module 'next'"**
```bash
cd C:\inetpub\wwwroot\pidebypide
npm install
```

**2. "500 Internal Server Error"**
- IISNode modülünün yüklü olduğunu kontrol edin
- `web.config` dosyasının doğru olduğunu kontrol edin
- Node.js'in PATH'de olduğunu kontrol edin

**3. Statik dosyalar yüklenmiyor**
- `public/` klasörü izinlerini kontrol edin
- URL Rewrite modülünün yüklü olduğunu kontrol edin

### Debug Modunda Çalıştırma
```xml
<!-- web.config içinde -->
<iisnode debuggingEnabled="true" loggingEnabled="true" />
```

## Güvenlik Önerileri

1. **Hassas dosyaları gizle**:
   - `.env` dosyalarını web root dışına taşıyın
   - `node_modules/` klasörüne erişimi engelleyin

2. **HTTPS kullanın**:
   - SSL sertifikası yapılandırın
   - HTTP'den HTTPS'e yönlendirme ekleyin

3. **Güvenlik başlıkları**:
   - Content Security Policy (CSP)
   - X-Frame-Options
   - X-Content-Type-Options

## İletişim ve Destek

Herhangi bir sorun yaşarsanız:
1. IIS loglarını kontrol edin
2. Node.js console çıktısını inceleyin
3. Browser developer tools'u kullanın

---
**Not**: Bu konfigürasyon Windows Server 2019+ ve IIS 10+ için optimize edilmiştir.

---

# Domain Binding ve Production Konfigürasyonu

## Domain Binding Adımları

### 1. IIS Manager'da Site Binding Ayarları

**IIS Manager'ı açın ve şu adımları takip edin:**

1. **Sites** > **Default Web Site** > **pidebypide** seçin
2. Sağ panelden **Bindings...** tıklayın
3. **Add...** butonuna tıklayın
4. Aşağıdaki ayarları yapın:

```
Type: http
IP Address: All Unassigned (*)
Port: 80
Host name: yourdomain.com (domain adresinizi yazın)
```

**HTTPS için (önerilen):**
```
Type: https
IP Address: All Unassigned (*)
Port: 443
Host name: yourdomain.com
SSL Certificate: [Sertifikanızı seçin]
```

### 2. Firewall Ayarları Kontrolü

**Windows Server Firewall'da şu portları açın:**
- **Port 80** (HTTP)
- **Port 443** (HTTPS)

```powershell
# PowerShell'de çalıştırın (Administrator olarak)
New-NetFirewallRule -DisplayName "HTTP" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow
New-NetFirewallRule -DisplayName "HTTPS" -Direction Inbound -Protocol TCP -LocalPort 443 -Action Allow
```

### 3. DNS Kontrolü

**Domain'inizin doğru yönlendirildiğini kontrol edin:**

```bash
# Command Prompt'ta çalıştırın
nslookup yourdomain.com
ping yourdomain.com
```

Sonuç sunucunuzun IP adresini göstermeli.

### 4. Application Pool Konfigürasyonu

**Production için Application Pool ayarlarını optimize edin:**

1. **Application Pools** > **pidebypide** (veya site adınız)
2. **Advanced Settings** > aşağıdaki ayarları yapın:

```xml
Identity: ApplicationPoolIdentity
.NET CLR Version: No Managed Code
Managed Pipeline Mode: Integrated
Start Mode: AlwaysRunning
Idle Timeout: 00:00:00 (0 dakika - hiç kapanmasın)
Maximum Worker Processes: 1
Load User Profile: True
```

### 5. web.config Production Optimizasyonu

**Mevcut web.config dosyanızı production için optimize edin:**

- `node_env="production"` ayarlandığından emin olun
- Logging'i production için ayarlayın
- Security başlıkları ekleyin

### 6. SSL Sertifikası (Önerilen)

**Let's Encrypt veya satın aldığınız SSL sertifikasını kurun:**

1. **Server Certificates** > **Import...**
2. Sertifika dosyalarını yükleyin
3. Site binding'inde HTTPS için sertifikayı seçin

### 7. URL Rewrite Kuralları

**www ve non-www yönlendirmesi için:**

```xml
<!-- web.config'e eklenecek kurallar -->
<rule name="Redirect to www" stopProcessing="true">
  <match url=".*" />
  <conditions>
    <add input="{HTTP_HOST}" pattern="^yourdomain\.com$" />
  </conditions>
  <action type="Redirect" url="https://www.yourdomain.com{REQUEST_URI}" 
          redirectType="Permanent" />
</rule>
```

## Kontrol Listesi

### ✅ Teknik Kontroller

- [ ] **IIS Binding**: Domain adresiniz için HTTP/HTTPS binding eklenmiş
- [ ] **Firewall**: Port 80 ve 443 açık
- [ ] **DNS**: Domain ping'i sunucu IP'sini gösteriyor
- [ ] **SSL**: HTTPS sertifikası kurulmuş ve çalışıyor
- [ ] **Application Pool**: Production ayarları yapılmış
- [ ] **Permissions**: IIS_IUSRS izinleri verilmiş

### ✅ Uygulama Kontrolleri

- [ ] **Build**: `npm run iis:build` başarılı
- [ ] **Server.js**: Port 80'de çalışacak şekilde ayarlanmış
- [ ] **Environment**: NODE_ENV=production
- [ ] **Assets**: Statik dosyalar doğru yükleniyor
- [ ] **API**: API endpoint'leri çalışıyor

### ✅ Güvenlik Kontrolleri

- [ ] **HTTPS**: Zorunlu HTTPS yönlendirmesi
- [ ] **Headers**: Güvenlik başlıkları eklendi
- [ ] **Files**: Hassas dosyalar gizlenmiş (.env, node_modules)
- [ ] **Logs**: Error logging aktif

## Test Komutları

### Local Test (Sunucuda)
```bash
# Sunucu üzerinde test edin
curl http://localhost/pidebypide/
curl https://localhost/pidebypide/
```

### Domain Test (Harici)
```bash
# Başka bir bilgisayardan test edin
curl http://yourdomain.com/
curl https://yourdomain.com/
```

### API Test
```bash
# API endpoint'lerini test edin
curl http://yourdomain.com/api/health
```

## Yaygın Sorunlar ve Çözümler

### Problem: "Site can't be reached"
**Çözüm:**
1. DNS propagation'ı bekleyin (24-48 saat)
2. Firewall ayarlarını kontrol edin
3. IIS binding'lerini kontrol edin

### Problem: "HTTP Error 502.3 - Bad Gateway"
**Çözüm:**
1. Application Pool'un çalıştığını kontrol edin
2. Node.js'in PATH'de olduğunu kontrol edin
3. IISNode loglarını kontrol edin

### Problem: SSL/HTTPS çalışmıyor
**Çözüm:**
1. Sertifika binding'ini kontrol edin
2. Intermediate certificate'ları yükleyin
3. SSL Labs test yapın: https://www.ssllabs.com/ssltest/

## Log Dosyaları

### Kontrol Edilecek Loglar
```
# IIS Logs
C:\inetpub\logs\LogFiles\W3SVC1\

# IISNode Logs  
C:\inetpub\wwwroot\pidebypide\iisnode\

# Windows Event Logs
Event Viewer > Windows Logs > Application
```

---

# IIS web.config Hatası Çözümü

## ❌ Yaşanan Hata
```
iisnode was unable to read the configuration file. Make sure the web.config file syntax is correct.
```

## ✅ Çözüm Adımları

### 1. IIS Application Kurulumu (Kritik!)

**IIS Manager'da şu adımları takip edin:**

1. **IIS Manager**'ı Administrator olarak açın
2. **Sites** > **Default Web Site** genişletin
3. **pidebypide** klasörünü bulun
4. **pidebypide** klasörüne **SAĞ TIKLAYIP** > **Convert to Application** seçin
5. **Add Application** penceresinde:
   ```
   Alias: pidebypide
   Physical path: C:\inetpub\wwwroot\pidebypide
   Application pool: DefaultAppPool (veya yeni bir pool oluşturun)
   ```
6. **OK** tıklayın

### 2. Application Pool Ayarları

**Application Pool'u Node.js için yapılandırın:**

1. **Application Pools** bölümüne gidin
2. **DefaultAppPool** (veya pidebypide pool) seçin
3. **Advanced Settings** > şu ayarları yapın:
   ```
   .NET CLR Version: No Managed Code
   Managed Pipeline Mode: Integrated
   Enable 32-Bit Applications: False
   Identity: ApplicationPoolIdentity
   Start Mode: OnDemand
   Idle Timeout (minutes): 20
   ```

### 3. IISNode Modül Kontrollü

**IISNode'un doğru kurulu olduğunu kontrol edin:**

PowerShell'de (Administrator olarak):
```powershell
# IISNode varlığını kontrol et
Get-WebGlobalModule | Where-Object {$_.Name -like "*iisnode*"}

# Eğer görünmüyorsa, IISNode'u yeniden yükleyin
# https://github.com/Azure/iisnode/releases
```

### 4. Dosya İzinleri

**Gerekli izinleri verin:**

1. **C:\inetpub\wwwroot\pidebypide** klasörüne sağ tıklayın
2. **Properties** > **Security** sekmesi
3. **Edit** > **Add** > şu kullanıcıları ekleyin:
   ```
   IIS_IUSRS: Full Control
   IUSR: Read & Execute
   Application Pool Identity (IIS AppPool\DefaultAppPool): Full Control
   ```

### 5. Test Adımları

**Sırayla test edin:**

1. **web.config syntax test:**
   ```bash
   # Command prompt'ta
   cd C:\inetpub\wwwroot\pidebypide
   type web.config
   ```

2. **server.js syntax test:**
   ```bash
   node -c server.js
   ```

3. **Application Pool test:**
   - IIS Manager'da Application Pool'un **Started** durumda olduğunu kontrol edin

4. **Site test:**
   ```
   http://localhost/pidebypide/
   ```

### 6. Log Kontrolleri

**Hata devam ederse logları kontrol edin:**

```
# IIS Logs
C:\inetpub\logs\LogFiles\W3SVC1\

# Windows Event Logs
Event Viewer > Windows Logs > Application

# IISNode Logs (oluşturulmuşsa)
C:\inetpub\wwwroot\pidebypide\iisnode\
```

### 7. Minimal web.config Test

**Eğer hala hata alıyorsanız, minimal bir web.config ile test edin:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="iisnode" path="server.js" verb="*" modules="iisnode" />
    </handlers>
    <rewrite>
      <rules>
        <rule name="DynamicContent">
          <match url=".*" />
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
          </conditions>
          <action type="Rewrite" url="server.js" />
        </rule>
      </rules>
    </rewrite>
    <iisnode watchedFiles="web.config;*.js" />
  </system.webServer>
</configuration>
```

## 🚨 Yaygın Hatalar ve Çözümleri

### Hata: "HTTP Error 500.19"
**Çözüm:** Application Pool'u No Managed Code olarak ayarlayın

### Hata: "HTTP Error 502.3"
**Çözüm:** Node.js path'ini kontrol edin, server.js'in çalıştığından emin olun

### Hata: "Module not found"
**Çözüm:** npm install çalıştırın, node_modules klasörü olduğundan emin olun

### Hata: "Access denied"
**Çözüm:** IIS_IUSRS izinlerini kontrol edin
