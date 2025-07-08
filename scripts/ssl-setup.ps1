# Let's Encrypt SSL Sertifikası Kurulum Script'i
# Win-ACME ile otomatik SSL sertifikası kurulumu

param(
    [Parameter(Mandatory=$true)]
    [string]$DomainName,
    
    [Parameter(Mandatory=$true)]
    [string]$Email,
    
    [Parameter(Mandatory=$false)]
    [string]$SiteName = "pidebypide"
)

Write-Host "🔒 Let's Encrypt SSL Kurulum Script'i" -ForegroundColor Green
Write-Host "Domain: $DomainName" -ForegroundColor Yellow
Write-Host "Email: $Email" -ForegroundColor Yellow

# Win-ACME indirme linki
$winAcmeUrl = "https://github.com/win-acme/win-acme/releases/latest/download/win-acme.v2.2.9.1701.x64.pluggable.zip"
$downloadPath = "$env:TEMP\win-acme.zip"
$extractPath = "C:\Tools\win-acme"

try {
    # 1. Win-ACME indir
    if (-not (Test-Path $extractPath)) {
        Write-Host "📥 Win-ACME indiriliyor..." -ForegroundColor Cyan
        Invoke-WebRequest -Uri $winAcmeUrl -OutFile $downloadPath
        
        # Klasör oluştur ve çıkart
        New-Item -ItemType Directory -Path $extractPath -Force
        Expand-Archive -Path $downloadPath -DestinationPath $extractPath -Force
        Remove-Item $downloadPath
        Write-Host "✅ Win-ACME başarıyla indirildi" -ForegroundColor Green
    }
    
    # 2. SSL sertifikası al
    Write-Host "🔐 SSL sertifikası alınıyor..." -ForegroundColor Cyan
    $wacs = "$extractPath\wacs.exe"
    
    # Win-ACME komutunu çalıştır
    & $wacs --target iis --siteid (Get-Website -Name $SiteName).Id --commonname $DomainName --emailaddress $Email --accepttos --unattended
    
    Write-Host "✅ SSL sertifikası başarıyla kuruldu" -ForegroundColor Green
    
    # 3. Otomatik yenileme görevi oluştur
    Write-Host "⏰ Otomatik yenileme görevi oluşturuluyor..." -ForegroundColor Cyan
    $taskName = "Win-ACME Certificate Renewal"
    $taskExists = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
    
    if (-not $taskExists) {
        $action = New-ScheduledTaskAction -Execute $wacs -Argument "--renew --unattended"
        $trigger = New-ScheduledTaskTrigger -Daily -At "02:00"
        $settings = New-ScheduledTaskSettingsSet -StartWhenAvailable
        $principal = New-ScheduledTaskPrincipal -UserId "SYSTEM" -LogonType ServiceAccount -RunLevel Highest
        
        Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Principal $principal
        Write-Host "✅ Otomatik yenileme görevi oluşturuldu" -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "🎉 SSL Kurulumu Tamamlandı!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Test edin: https://$DomainName" -ForegroundColor Cyan
    Write-Host "SSL Test: https://www.ssllabs.com/ssltest/analyze.html?d=$DomainName" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ Hata oluştu: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Manuel SSL kurulumu için:" -ForegroundColor Yellow
    Write-Host "1. SSL sertifikası satın alın veya Let's Encrypt kullanın" -ForegroundColor White
    Write-Host "2. IIS Manager > Server Certificates > Import" -ForegroundColor White
    Write-Host "3. Site Bindings > Add > HTTPS > Sertifika seçin" -ForegroundColor White
}

# Kullanım:
# .\ssl-setup.ps1 -DomainName "example.com" -Email "admin@example.com"
