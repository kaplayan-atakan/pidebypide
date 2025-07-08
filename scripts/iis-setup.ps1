# IIS pidebypide Application Kurulum ve Kontrol Script'i
# Bu script'i Administrator olarak PowerShell'de çalıştırın

param(
    [Parameter(Mandatory=$false)]
    [string]$SitePath = "C:\inetpub\wwwroot\pidebypide",
    
    [Parameter(Mandatory=$false)]
    [string]$AppName = "pidebypide"
)

Write-Host "🔧 IIS pidebypide Application Kurulum Script'i" -ForegroundColor Green
Write-Host "Site Path: $SitePath" -ForegroundColor Yellow
Write-Host "App Name: $AppName" -ForegroundColor Yellow
Write-Host ""

# IIS modülünü import et
Import-Module WebAdministration

try {
    # 1. Klasör kontrolü
    Write-Host "📁 Klasör kontrolü..." -ForegroundColor Cyan
    if (-not (Test-Path $SitePath)) {
        Write-Host "❌ Klasör bulunamadı: $SitePath" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Klasör mevcut" -ForegroundColor Green

    # 2. Gerekli dosya kontrolü
    Write-Host "📄 Gerekli dosya kontrolü..." -ForegroundColor Cyan
    $requiredFiles = @("web.config", "server.js", "package.json")
    foreach ($file in $requiredFiles) {
        $filePath = Join-Path $SitePath $file
        if (Test-Path $filePath) {
            Write-Host "✅ $file mevcut" -ForegroundColor Green
        } else {
            Write-Host "❌ $file bulunamadı" -ForegroundColor Red
        }
    }

    # 3. IISNode modül kontrolü
    Write-Host "🔌 IISNode modül kontrolü..." -ForegroundColor Cyan
    $iisNodeModule = Get-WebGlobalModule | Where-Object {$_.Name -eq "iisnode"}
    if ($iisNodeModule) {
        Write-Host "✅ IISNode modülü yüklü" -ForegroundColor Green
    } else {
        Write-Host "❌ IISNode modülü bulunamadı" -ForegroundColor Red
        Write-Host "   IISNode'u şu adresten indirin: https://github.com/Azure/iisnode/releases" -ForegroundColor Yellow
    }

    # 4. URL Rewrite modül kontrolü
    Write-Host "🔄 URL Rewrite modül kontrolü..." -ForegroundColor Cyan
    $rewriteModule = Get-WebGlobalModule | Where-Object {$_.Name -eq "RewriteModule"}
    if ($rewriteModule) {
        Write-Host "✅ URL Rewrite modülü yüklü" -ForegroundColor Green
    } else {
        Write-Host "❌ URL Rewrite modülü bulunamadı" -ForegroundColor Red
        Write-Host "   URL Rewrite'ı şu adresten indirin: https://www.iis.net/downloads/microsoft/url-rewrite" -ForegroundColor Yellow
    }

    # 5. Application Pool oluştur/ayarla
    Write-Host "🏊 Application Pool ayarları..." -ForegroundColor Cyan
    $poolName = "${AppName}Pool"
    
    # Pool varsa sil ve yeniden oluştur
    if (Get-WebAppPool -Name $poolName -ErrorAction SilentlyContinue) {
        Remove-WebAppPool -Name $poolName
        Write-Host "   Eski pool silindi" -ForegroundColor Yellow
    }
    
    # Yeni pool oluştur
    New-WebAppPool -Name $poolName
    Set-ItemProperty -Path "IIS:\AppPools\$poolName" -Name managedRuntimeVersion -Value ""
    Set-ItemProperty -Path "IIS:\AppPools\$poolName" -Name processModel.identityType -Value ApplicationPoolIdentity
    Set-ItemProperty -Path "IIS:\AppPools\$poolName" -Name processModel.idleTimeout -Value "00:20:00"
    Write-Host "✅ Application Pool ($poolName) oluşturuldu" -ForegroundColor Green

    # 6. Application oluştur
    Write-Host "🌐 Web Application oluşturuluyor..." -ForegroundColor Cyan
    
    # Varsa kaldır
    $existingApp = Get-WebApplication -Site "Default Web Site" -Name $AppName -ErrorAction SilentlyContinue
    if ($existingApp) {
        Remove-WebApplication -Site "Default Web Site" -Name $AppName
        Write-Host "   Eski application kaldırıldı" -ForegroundColor Yellow
    }
    
    # Yeni application oluştur
    New-WebApplication -Site "Default Web Site" -Name $AppName -PhysicalPath $SitePath -ApplicationPool $poolName
    Write-Host "✅ Web Application oluşturuldu" -ForegroundColor Green

    # 7. Dosya izinleri ayarla
    Write-Host "🔐 Dosya izinleri ayarlanıyor..." -ForegroundColor Cyan
    
    # IIS_IUSRS izni ver
    $acl = Get-Acl $SitePath
    $accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule("IIS_IUSRS", "FullControl", "ContainerInherit,ObjectInherit", "None", "Allow")
    $acl.SetAccessRule($accessRule)
    
    # Application Pool Identity izni ver
    $poolIdentity = "IIS AppPool\$poolName"
    $accessRule2 = New-Object System.Security.AccessControl.FileSystemAccessRule($poolIdentity, "FullControl", "ContainerInherit,ObjectInherit", "None", "Allow")
    $acl.SetAccessRule($accessRule2)
    
    Set-Acl -Path $SitePath -AclObject $acl
    Write-Host "✅ Dosya izinleri ayarlandı" -ForegroundColor Green

    # 8. Node.js kontrolü
    Write-Host "📦 Node.js kontrolü..." -ForegroundColor Cyan
    try {
        $nodeVersion = & node --version
        Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
        
        # NPM paketleri kontrolü
        $packageJsonPath = Join-Path $SitePath "package.json"
        if (Test-Path $packageJsonPath) {
            Push-Location $SitePath
            Write-Host "   NPM paketleri kontrol ediliyor..." -ForegroundColor Cyan
            $npmResult = & npm list --depth=0 2>&1
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ NPM paketleri yüklü" -ForegroundColor Green
            } else {
                Write-Host "⚠️ NPM paketleri eksik - npm install çalıştırın" -ForegroundColor Yellow
            }
            Pop-Location
        }
    } catch {
        Write-Host "❌ Node.js bulunamadı - PATH'e ekleyin" -ForegroundColor Red
    }

    # 9. Web.config syntax kontrolü
    Write-Host "⚙️ web.config syntax kontrolü..." -ForegroundColor Cyan
    $webConfigPath = Join-Path $SitePath "web.config"
    try {
        [xml]$webConfig = Get-Content $webConfigPath
        Write-Host "✅ web.config syntax'ı geçerli" -ForegroundColor Green
    } catch {
        Write-Host "❌ web.config syntax hatası: $($_.Exception.Message)" -ForegroundColor Red
    }

    # 10. Application Pool'u başlat
    Write-Host "🚀 Application Pool başlatılıyor..." -ForegroundColor Cyan
    Start-WebAppPool -Name $poolName
    Write-Host "✅ Application Pool başlatıldı" -ForegroundColor Green

    Write-Host ""
    Write-Host "🎉 Kurulum tamamlandı!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Test için:" -ForegroundColor Yellow
    Write-Host "http://localhost/$AppName/" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Log kontrolü için:" -ForegroundColor Yellow
    Write-Host "IIS Logs: C:\inetpub\logs\LogFiles\" -ForegroundColor White
    Write-Host "Event Logs: Event Viewer > Windows Logs > Application" -ForegroundColor White

} catch {
    Write-Host "❌ Hata oluştu: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Lütfen Administrator olarak çalıştırdığınızdan emin olun" -ForegroundColor Yellow
}

# Kullanım:
# .\iis-setup.ps1
