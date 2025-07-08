# IIS Sorun Giderme Script'i
# Bu script'i Administrator olarak PowerShell'de çalıştırın

param(
    [Parameter(Mandatory=$false)]
    [string]$SitePath = "C:\inetpub\wwwroot\pidebypide"
)

Write-Host "🔧 IIS pidebypide Sorun Giderme Script'i" -ForegroundColor Green
Write-Host "Site Path: $SitePath" -ForegroundColor Yellow
Write-Host ""

# 1. Dosya izinleri düzelt
Write-Host "1. 🔐 Dosya izinleri düzeltiliyor..." -ForegroundColor Cyan

try {
    # Ana klasör izinleri
    $acl = Get-Acl $SitePath
    
    # IIS_IUSRS Full Control
    $accessRule1 = New-Object System.Security.AccessControl.FileSystemAccessRule("IIS_IUSRS", "FullControl", "ContainerInherit,ObjectInherit", "None", "Allow")
    $acl.SetAccessRule($accessRule1)
    
    # IUSR Read & Execute
    $accessRule2 = New-Object System.Security.AccessControl.FileSystemAccessRule("IUSR", "ReadAndExecute", "ContainerInherit,ObjectInherit", "None", "Allow")
    $acl.SetAccessRule($accessRule2)
    
    # Network Service Full Control
    $accessRule3 = New-Object System.Security.AccessControl.FileSystemAccessRule("NETWORK SERVICE", "FullControl", "ContainerInherit,ObjectInherit", "None", "Allow")
    $acl.SetAccessRule($accessRule3)
    
    Set-Acl -Path $SitePath -AclObject $acl
    Write-Host "✅ Ana klasör izinleri ayarlandı" -ForegroundColor Green
    
    # iisnode klasörü oluştur ve izinleri ayarla
    $iisNodePath = Join-Path $SitePath "iisnode"
    if (-not (Test-Path $iisNodePath)) {
        New-Item -ItemType Directory -Path $iisNodePath -Force
        Write-Host "✅ iisnode klasörü oluşturuldu" -ForegroundColor Green
    }
    
    $acl2 = Get-Acl $iisNodePath
    $acl2.SetAccessRule($accessRule1)
    $acl2.SetAccessRule($accessRule2)
    $acl2.SetAccessRule($accessRule3)
    Set-Acl -Path $iisNodePath -AclObject $acl2
    Write-Host "✅ iisnode klasör izinleri ayarlandı" -ForegroundColor Green
    
} catch {
    Write-Host "❌ İzin hatası: $($_.Exception.Message)" -ForegroundColor Red
}

# 2. Application Pool kimlik kontrolü
Write-Host "2. 🏊 Application Pool kontrolü..." -ForegroundColor Cyan

Import-Module WebAdministration

try {
    # cosscafe.com için application bul
    $apps = Get-WebApplication | Where-Object { $_.PhysicalPath -like "*pidebypide*" }
    
    if ($apps) {
        foreach ($app in $apps) {
            $poolName = $app.ApplicationPool
            Write-Host "   Application: $($app.Path)" -ForegroundColor White
            Write-Host "   Pool: $poolName" -ForegroundColor White
            
            # Pool ayarlarını kontrol et
            $pool = Get-WebAppPool -Name $poolName
            if ($pool.managedRuntimeVersion -ne "") {
                Set-ItemProperty -Path "IIS:\AppPools\$poolName" -Name managedRuntimeVersion -Value ""
                Write-Host "   ✅ .NET CLR Version 'No Managed Code' olarak ayarlandı" -ForegroundColor Green
            }
            
            # Pool'u yeniden başlat
            Restart-WebAppPool -Name $poolName
            Write-Host "   ✅ Application Pool yeniden başlatıldı" -ForegroundColor Green
        }
    } else {
        Write-Host "❌ pidebypide application bulunamadı" -ForegroundColor Red
    }
    
} catch {
    Write-Host "❌ Application Pool hatası: $($_.Exception.Message)" -ForegroundColor Red
}

# 3. Node.js yolu kontrolü
Write-Host "3. 📦 Node.js yolu kontrolü..." -ForegroundColor Cyan

try {
    $nodePath = Get-Command node -ErrorAction Stop
    Write-Host "✅ Node.js yolu: $($nodePath.Source)" -ForegroundColor Green
    
    # Versiyon kontrolü
    $nodeVersion = & node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
    
    # Program Files'da mı kontrol et
    if ($nodePath.Source -like "*Program Files*") {
        Write-Host "✅ Node.js Program Files'da yüklü" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Node.js farklı konumda: $($nodePath.Source)" -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "❌ Node.js bulunamadı" -ForegroundColor Red
    Write-Host "   Node.js'i şu adresten indirin: https://nodejs.org" -ForegroundColor Yellow
}

# 4. Next.js build kontrolü
Write-Host "4. 📦 Next.js build kontrolü..." -ForegroundColor Cyan

$nextPath = Join-Path $SitePath ".next"
if (Test-Path $nextPath) {
    Write-Host "✅ .next klasörü mevcut" -ForegroundColor Green
    
    # package.json kontrolü
    $packagePath = Join-Path $SitePath "package.json"
    if (Test-Path $packagePath) {
        Push-Location $SitePath
        try {
            # NPM paketleri kontrolü
            Write-Host "   NPM paketleri kontrol ediliyor..." -ForegroundColor Cyan
            $npmList = & npm list next --depth=0 2>&1
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ Next.js paketi yüklü" -ForegroundColor Green
            } else {
                Write-Host "⚠️ Next.js paketi eksik, npm install çalıştırılıyor..." -ForegroundColor Yellow
                & npm install
            }
        } catch {
            Write-Host "❌ NPM kontrol hatası" -ForegroundColor Red
        }
        Pop-Location
    }
} else {
    Write-Host "❌ .next klasörü bulunamadı" -ForegroundColor Red
    Write-Host "   npm run build komutunu çalıştırın" -ForegroundColor Yellow
}

# 5. Log dosyalarını kontrol et
Write-Host "5. 📄 Log dosyaları kontrol ediliyor..." -ForegroundColor Cyan

$iisNodeLogPath = Join-Path $SitePath "iisnode"
if (Test-Path $iisNodeLogPath) {
    $logFiles = Get-ChildItem $iisNodeLogPath -Filter "*.txt" | Sort-Object LastWriteTime -Descending | Select-Object -First 3
    
    if ($logFiles) {
        Write-Host "✅ IISNode log dosyaları bulundu:" -ForegroundColor Green
        foreach ($log in $logFiles) {
            Write-Host "   - $($log.Name) ($(Get-Date $log.LastWriteTime -Format 'HH:mm:ss'))" -ForegroundColor White
        }
        
        # Son log dosyasının içeriğini göster
        Write-Host "📋 Son log dosyası içeriği:" -ForegroundColor Yellow
        $latestLog = $logFiles[0]
        $logContent = Get-Content $latestLog.FullName -Tail 10
        foreach ($line in $logContent) {
            Write-Host "   $line" -ForegroundColor Gray
        }
    } else {
        Write-Host "⚠️ IISNode log dosyası bulunamadı" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠️ iisnode log klasörü bulunamadı" -ForegroundColor Yellow
}

# 6. Test server.js
Write-Host "6. 🧪 server.js syntax kontrolü..." -ForegroundColor Cyan

$serverPath = Join-Path $SitePath "server.js"
try {
    Push-Location $SitePath
    $syntaxCheck = & node -c $serverPath 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ server.js syntax geçerli" -ForegroundColor Green
    } else {
        Write-Host "❌ server.js syntax hatası: $syntaxCheck" -ForegroundColor Red
    }
    Pop-Location
} catch {
    Write-Host "❌ server.js kontrol hatası" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎯 Öneriler:" -ForegroundColor Yellow
Write-Host "1. IIS Manager'da Application Pool'u yeniden başlatın" -ForegroundColor White
Write-Host "2. http://cosscafe.com adresini test edin" -ForegroundColor White
Write-Host "3. Hata devam ederse Event Viewer > Windows Logs > Application kontrol edin" -ForegroundColor White
Write-Host "4. iisnode log dosyalarını kontrol edin" -ForegroundColor White

# Kullanım:
# .\scripts\fix-permissions.ps1
