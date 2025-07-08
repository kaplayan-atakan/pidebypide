# IIS Domain Binding PowerShell Script
# Bu script'i Administrator olarak PowerShell'de çalıştırın

param(
    [Parameter(Mandatory=$true)]
    [string]$DomainName,
    
    [Parameter(Mandatory=$false)]
    [string]$SiteName = "pidebypide",
    
    [Parameter(Mandatory=$false)]
    [string]$SslCertificateThumbprint = ""
)

Write-Host "🚀 IIS Domain Binding Script Başlatılıyor..." -ForegroundColor Green
Write-Host "Domain: $DomainName" -ForegroundColor Yellow
Write-Host "Site: $SiteName" -ForegroundColor Yellow

# IIS modülünü import et
Import-Module WebAdministration

try {
    # 1. HTTP Binding ekle
    Write-Host "📡 HTTP Binding ekleniyor..." -ForegroundColor Cyan
    New-WebBinding -Name $SiteName -Protocol http -Port 80 -HostHeader $DomainName
    Write-Host "✅ HTTP Binding başarıyla eklendi" -ForegroundColor Green
    
    # 2. HTTPS Binding ekle (SSL sertifikası varsa)
    if ($SslCertificateThumbprint -ne "") {
        Write-Host "🔒 HTTPS Binding ekleniyor..." -ForegroundColor Cyan
        New-WebBinding -Name $SiteName -Protocol https -Port 443 -HostHeader $DomainName
        
        # SSL sertifikasını bind et
        $binding = Get-WebBinding -Name $SiteName -Protocol https -Port 443 -HostHeader $DomainName
        $binding.AddSslCertificate($SslCertificateThumbprint, "my")
        Write-Host "✅ HTTPS Binding başarıyla eklendi" -ForegroundColor Green
    }
    
    # 3. Application Pool ayarları
    Write-Host "⚙️ Application Pool ayarları yapılıyor..." -ForegroundColor Cyan
    Set-ItemProperty -Path "IIS:\AppPools\$SiteName" -Name processModel.identityType -Value ApplicationPoolIdentity
    Set-ItemProperty -Path "IIS:\AppPools\$SiteName" -Name processModel.idleTimeout -Value "00:00:00"
    Set-ItemProperty -Path "IIS:\AppPools\$SiteName" -Name managedRuntimeVersion -Value ""
    Set-ItemProperty -Path "IIS:\AppPools\$SiteName" -Name startMode -Value AlwaysRunning
    Write-Host "✅ Application Pool ayarları tamamlandı" -ForegroundColor Green
    
    # 4. Firewall kuralları
    Write-Host "🔥 Firewall kuralları kontrol ediliyor..." -ForegroundColor Cyan
    
    # HTTP port 80
    $httpRule = Get-NetFirewallRule -DisplayName "HTTP" -ErrorAction SilentlyContinue
    if (-not $httpRule) {
        New-NetFirewallRule -DisplayName "HTTP" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow
        Write-Host "✅ HTTP Firewall kuralı eklendi" -ForegroundColor Green
    } else {
        Write-Host "ℹ️ HTTP Firewall kuralı zaten mevcut" -ForegroundColor Yellow
    }
    
    # HTTPS port 443
    $httpsRule = Get-NetFirewallRule -DisplayName "HTTPS" -ErrorAction SilentlyContinue
    if (-not $httpsRule) {
        New-NetFirewallRule -DisplayName "HTTPS" -Direction Inbound -Protocol TCP -LocalPort 443 -Action Allow
        Write-Host "✅ HTTPS Firewall kuralı eklendi" -ForegroundColor Green
    } else {
        Write-Host "ℹ️ HTTPS Firewall kuralı zaten mevcut" -ForegroundColor Yellow
    }
    
    # 5. Site'i restart et
    Write-Host "🔄 Site yeniden başlatılıyor..." -ForegroundColor Cyan
    Stop-Website -Name $SiteName
    Start-Website -Name $SiteName
    Write-Host "✅ Site başarıyla yeniden başlatıldı" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "🎉 Domain Binding işlemi tamamlandı!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Test için şu URL'leri deneyin:" -ForegroundColor Yellow
    Write-Host "HTTP:  http://$DomainName" -ForegroundColor Cyan
    if ($SslCertificateThumbprint -ne "") {
        Write-Host "HTTPS: https://$DomainName" -ForegroundColor Cyan
    }
    Write-Host ""
    Write-Host "Kontrol listesi:" -ForegroundColor Yellow
    Write-Host "- DNS propagation tamamlandı mı? (nslookup $DomainName)" -ForegroundColor White
    Write-Host "- SSL sertifikası geçerli mi?" -ForegroundColor White
    Write-Host "- Application Pool çalışıyor mu?" -ForegroundColor White
    
} catch {
    Write-Host "❌ Hata oluştu: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Lütfen Administrator olarak çalıştırdığınızdan emin olun" -ForegroundColor Yellow
}

# Kullanım örnekleri:
# .\domain-binding.ps1 -DomainName "example.com"
# .\domain-binding.ps1 -DomainName "example.com" -SslCertificateThumbprint "ABC123..."
