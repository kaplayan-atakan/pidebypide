# IIS Basit Kontrol Script'i
# Bu script'i Administrator olarak PowerShell'de çalıştırın

Write-Host "🔍 IIS pidebypide Basit Kontrol Script'i" -ForegroundColor Green
Write-Host ""

# 1. IIS Modül kontrolü
Write-Host "1. IIS WebAdministration modülü yükleniyor..." -ForegroundColor Cyan
try {
    Import-Module WebAdministration -ErrorAction Stop
    Write-Host "✅ IIS modülü yüklendi" -ForegroundColor Green
} catch {
    Write-Host "❌ IIS modülü yüklenemedi: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# 2. Klasör kontrolü
Write-Host "2. Klasör kontrolü..." -ForegroundColor Cyan
$sitePath = "C:\inetpub\wwwroot\pidebypide"
if (Test-Path $sitePath) {
    Write-Host "✅ Site klasörü mevcut: $sitePath" -ForegroundColor Green
} else {
    Write-Host "❌ Site klasörü bulunamadı: $sitePath" -ForegroundColor Red
    exit 1
}

# 3. Gerekli dosya kontrolü
Write-Host "3. Gerekli dosyalar kontrol ediliyor..." -ForegroundColor Cyan
$files = @("web.config", "server.js", "package.json")
foreach ($file in $files) {
    $filePath = Join-Path $sitePath $file
    if (Test-Path $filePath) {
        Write-Host "   ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $file eksik" -ForegroundColor Red
    }
}

# 4. IISNode modül kontrolü
Write-Host "4. IISNode modülü kontrol ediliyor..." -ForegroundColor Cyan
try {
    $iisnode = Get-WebGlobalModule | Where-Object {$_.Name -eq "iisnode"}
    if ($iisnode) {
        Write-Host "✅ IISNode modülü yüklü" -ForegroundColor Green
    } else {
        Write-Host "❌ IISNode modülü yüklü değil" -ForegroundColor Red
        Write-Host "   İndirme linki: https://github.com/Azure/iisnode/releases" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ IISNode kontrol hatası: $($_.Exception.Message)" -ForegroundColor Red
}

# 5. URL Rewrite modül kontrolü
Write-Host "5. URL Rewrite modülü kontrol ediliyor..." -ForegroundColor Cyan
try {
    $rewrite = Get-WebGlobalModule | Where-Object {$_.Name -eq "RewriteModule"}
    if ($rewrite) {
        Write-Host "✅ URL Rewrite modülü yüklü" -ForegroundColor Green
    } else {
        Write-Host "❌ URL Rewrite modülü yüklü değil" -ForegroundColor Red
        Write-Host "   İndirme linki: https://www.iis.net/downloads/microsoft/url-rewrite" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ URL Rewrite kontrol hatası: $($_.Exception.Message)" -ForegroundColor Red
}

# 6. Node.js kontrolü
Write-Host "6. Node.js kontrol ediliyor..." -ForegroundColor Cyan
try {
    $nodeVersion = & node --version 2>$null
    if ($nodeVersion) {
        Write-Host "✅ Node.js yüklü: $nodeVersion" -ForegroundColor Green
    } else {
        Write-Host "❌ Node.js bulunamadı" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Node.js kontrol hatası" -ForegroundColor Red
}

# 7. Web.config syntax kontrolü
Write-Host "7. web.config syntax kontrol ediliyor..." -ForegroundColor Cyan
try {
    $webConfigPath = Join-Path $sitePath "web.config"
    [xml]$webConfig = Get-Content $webConfigPath -ErrorAction Stop
    Write-Host "✅ web.config syntax geçerli" -ForegroundColor Green
} catch {
    Write-Host "❌ web.config syntax hatası: $($_.Exception.Message)" -ForegroundColor Red
}

# 8. Application kontrolü
Write-Host "8. IIS Application kontrol ediliyor..." -ForegroundColor Cyan
try {
    $app = Get-WebApplication -Site "Default Web Site" -Name "pidebypide" -ErrorAction SilentlyContinue
    if ($app) {
        Write-Host "✅ pidebypide application mevcut" -ForegroundColor Green
        Write-Host "   Application Pool: $($app.ApplicationPool)" -ForegroundColor White
        Write-Host "   Physical Path: $($app.PhysicalPath)" -ForegroundColor White
    } else {
        Write-Host "⚠️ pidebypide application bulunamadı" -ForegroundColor Yellow
        Write-Host "   Manuel olarak oluşturmanız gerekiyor" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Application kontrol hatası: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎯 Sonuç:" -ForegroundColor Yellow
Write-Host "Eğer tüm kontroller ✅ ise http://localhost/pidebypide/ test edebilirsiniz" -ForegroundColor White
Write-Host "❌ olan kontroller için yukarıdaki önerileri takip edin" -ForegroundColor White

# Kullanım:
# .\scripts\check-iis.ps1
