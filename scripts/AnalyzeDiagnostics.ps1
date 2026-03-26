# AnalyzeDiagnostics.ps1
# Comprehensive PowerShell diagnostic script for Windows Autopilot troubleshooting
# Automatically checks certificate status, Azure AD join state, PRT status, and provides root cause analysis

Write-Host "`n=== AUTOPILOT DIAGNOSTIC ANALYZER ===" -ForegroundColor Cyan
Write-Host "Analyzing device state...`n" -ForegroundColor Yellow

# Initialize findings
$findings = @{
    CertificatePresent = $false
    CertificateValid = $false
    AzureAdJoined = $false
    HasPRT = $false
    RecentErrors = @()
    RootCause = "Unknown"
    Severity = "Unknown"
}

# 1. Check Certificate
Write-Host "[1/5] Checking Client Certificate..." -ForegroundColor Cyan
$targetThumbprint = "1F508A9B9A1E0AB557FE7D45BFBB65D960A7BCA0"
$cert = Get-ChildItem -Path Cert:\LocalMachine\My |
    Where-Object {$_.Thumbprint -eq $targetThumbprint}

if ($cert) {
    $findings.CertificatePresent = $true
    Write-Host "  ✅ Certificate found: $($cert.Subject)" -ForegroundColor Green

    if ($cert.HasPrivateKey -and $cert.NotAfter -gt (Get-Date)) {
        $findings.CertificateValid = $true
        Write-Host "  ✅ Certificate is valid with private key" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Certificate is INVALID (no private key or expired)" -ForegroundColor Red
    }
} else {
    Write-Host "  ❌ Certificate NOT FOUND (Thumbprint: $targetThumbprint)" -ForegroundColor Red
    Write-Host "     This is likely the root cause!" -ForegroundColor Yellow
}

# 2. Check Azure AD Join
Write-Host "`n[2/5] Checking Azure AD Join Status..." -ForegroundColor Cyan
$dsreg = dsregcmd /status | Out-String

if ($dsreg -match "AzureAdJoined\s*:\s*YES") {
    $findings.AzureAdJoined = $true
    Write-Host "  ✅ Device is Azure AD Joined" -ForegroundColor Green
} else {
    Write-Host "  ❌ Device is NOT Azure AD Joined" -ForegroundColor Red
}

# 3. Check Primary Refresh Token (PRT)
Write-Host "`n[3/5] Checking Primary Refresh Token..." -ForegroundColor Cyan
if ($dsreg -match "AzureAdPrt\s*:\s*YES") {
    $findings.HasPRT = $true
    Write-Host "  ✅ Valid PRT exists" -ForegroundColor Green
} else {
    Write-Host "  ❌ No valid PRT (Error 0xcaa10001 likely)" -ForegroundColor Red
}

# 4. Check Recent Errors
Write-Host "`n[4/5] Checking Recent Errors..." -ForegroundColor Cyan
$recentErrors = Get-WinEvent -LogName "Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin" -MaxEvents 50 -ErrorAction SilentlyContinue |
    Where-Object {$_.LevelDisplayName -eq "Error" -and $_.TimeCreated -gt (Get-Date).AddHours(-24)}

if ($recentErrors) {
    $findings.RecentErrors = $recentErrors
    Write-Host "  ⚠️ Found $($recentErrors.Count) errors in last 24 hours" -ForegroundColor Yellow

    # Show top 3 errors
    $recentErrors | Select-Object -First 3 | ForEach-Object {
        Write-Host "     Event $($_.Id): $($_.Message.Substring(0, [Math]::Min(100, $_.Message.Length)))..." -ForegroundColor Gray
    }
} else {
    Write-Host "  ✅ No recent errors" -ForegroundColor Green
}

# 5. Check Certificate Enrollment Events
Write-Host "`n[5/5] Checking Certificate Enrollment Events..." -ForegroundColor Cyan
$certErrors = Get-WinEvent -LogName "Microsoft-Windows-CertificateServicesClient-Lifecycle-System/Operational" -MaxEvents 50 -ErrorAction SilentlyContinue |
    Where-Object {$_.LevelDisplayName -eq "Error" -and $_.TimeCreated -gt (Get-Date).AddHours(-24)}

if ($certErrors) {
    Write-Host "  ❌ Found $($certErrors.Count) certificate errors" -ForegroundColor Red
    $certErrors | Select-Object -First 3 | ForEach-Object {
        Write-Host "     Event $($_.Id): $($_.Message.Substring(0, [Math]::Min(100, $_.Message.Length)))..." -ForegroundColor Gray
    }
} else {
    Write-Host "  ✅ No certificate enrollment errors" -ForegroundColor Green
}

# === ROOT CAUSE ANALYSIS ===
Write-Host "`n`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║          ROOT CAUSE ANALYSIS & RECOMMENDATIONS             ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

if (-not $findings.CertificatePresent) {
    $findings.RootCause = "Certificate Deployment Failed"
    $findings.Severity = "CRITICAL"

    Write-Host "`n🔴 ROOT CAUSE: Certificate Deployment Failed" -ForegroundColor Red
    Write-Host "`nEXPLANATION:" -ForegroundColor Yellow
    Write-Host "  The client authentication certificate (Thumbprint: $targetThumbprint)" -ForegroundColor White
    Write-Host "  failed to deploy. This certificate is likely required for:" -ForegroundColor White
    Write-Host "  - Network authentication (802.1X WiFi: 'corporate')" -ForegroundColor White
    Write-Host "  - VPN connectivity (CorpDeviceTunnel)" -ForegroundColor White
    Write-Host "  - User token acquisition" -ForegroundColor White

    Write-Host "`n📋 RECOMMENDED ACTIONS:" -ForegroundColor Yellow
    Write-Host "  1. Check Intune Certificate Profile configuration" -ForegroundColor Cyan
    Write-Host "  2. Verify Certificate Authority is accessible" -ForegroundColor Cyan
    Write-Host "  3. Check certificate template permissions" -ForegroundColor Cyan
    Write-Host "  4. Review certificate connector (NDES) if using SCEP" -ForegroundColor Cyan
    Write-Host "`n  📄 Run this to export detailed logs:" -ForegroundColor Magenta
    Write-Host "     mdmdiagnosticstool.exe -out C:\Temp\MDMDiag -area Autopilot" -ForegroundColor Gray

} elseif (-not $findings.CertificateValid) {
    $findings.RootCause = "Certificate Invalid or Expired"
    $findings.Severity = "CRITICAL"

    Write-Host "`n🔴 ROOT CAUSE: Certificate Present but INVALID" -ForegroundColor Red
    Write-Host "`nEXPLANATION:" -ForegroundColor Yellow
    Write-Host "  Certificate exists but is either expired or missing private key" -ForegroundColor White

    Write-Host "`n📋 RECOMMENDED ACTIONS:" -ForegroundColor Yellow
    Write-Host "  1. Delete and re-deploy certificate from Intune" -ForegroundColor Cyan
    Write-Host "  2. Check certificate renewal policy" -ForegroundColor Cyan

} elseif (-not $findings.HasPRT) {
    $findings.RootCause = "Azure AD Token Acquisition Failed (0xcaa10001)"
    $findings.Severity = "CRITICAL"

    Write-Host "`n🔴 ROOT CAUSE: Azure AD Token Failure (Error 0xcaa10001)" -ForegroundColor Red
    Write-Host "`nEXPLANATION:" -ForegroundColor Yellow
    Write-Host "  Certificate is present, but device cannot obtain user token." -ForegroundColor White
    Write-Host "  This may be due to:" -ForegroundColor White
    Write-Host "  - Conditional Access policy blocking" -ForegroundColor White
    Write-Host "  - Device stuck in OOBE/defaultuser0 context" -ForegroundColor White
    Write-Host "  - Network connectivity issues" -ForegroundColor White

    Write-Host "`n📋 RECOMMENDED ACTIONS:" -ForegroundColor Yellow
    Write-Host "  1. Check Conditional Access policies in Azure AD" -ForegroundColor Cyan
    Write-Host "  2. Verify device can reach login.microsoftonline.com" -ForegroundColor Cyan
    Write-Host "  3. Try manual sign-in: Win+L, then sign out and sign in" -ForegroundColor Cyan
    Write-Host "  4. Check if user is licensed and enabled in Azure AD" -ForegroundColor Cyan

} else {
    $findings.RootCause = "Secondary Issues Detected"
    $findings.Severity = "WARNING"

    Write-Host "`n🟡 STATUS: Core Components OK, but issues detected" -ForegroundColor Yellow
    Write-Host "`nEXPLANATION:" -ForegroundColor Yellow
    Write-Host "  Certificate and Azure AD authentication are working." -ForegroundColor White
    Write-Host "  Errors found may be transient or unrelated." -ForegroundColor White

    Write-Host "`n📋 RECOMMENDED ACTIONS:" -ForegroundColor Yellow
    Write-Host "  1. Force MDM sync and monitor" -ForegroundColor Cyan
    Write-Host "  2. Review specific error events above" -ForegroundColor Cyan
    Write-Host "  3. If still stuck, restart device" -ForegroundColor Cyan
}

# === QUICK FIX COMMANDS ===
Write-Host "`n`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                    QUICK FIX COMMANDS                       ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

if (-not $findings.CertificatePresent -or -not $findings.CertificateValid) {
    Write-Host "`n1️⃣  Force MDM Sync (retry certificate deployment):" -ForegroundColor Yellow
    Write-Host '   Get-ScheduledTask | Where-Object {$_.TaskName -like "*EnterpriseMgmt*"} | Start-ScheduledTask' -ForegroundColor Gray

    Write-Host "`n2️⃣  Check sync result in 5 minutes:" -ForegroundColor Yellow
    Write-Host "   Get-WinEvent -LogName Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin -MaxEvents 10" -ForegroundColor Gray
}

if (-not $findings.HasPRT) {
    Write-Host "`n3️⃣  Attempt token refresh:" -ForegroundColor Yellow
    Write-Host "   dsregcmd /refreshprt" -ForegroundColor Gray
}

Write-Host "`n4️⃣  If still stuck after 15 minutes, export full diagnostics:" -ForegroundColor Yellow
Write-Host "   mdmdiagnosticstool.exe -out C:\Temp\FullDiag" -ForegroundColor Gray

# === SUMMARY ===
Write-Host "`n`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                       SUMMARY                               ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

Write-Host "`nCertificate Present:  $(if($findings.CertificatePresent){'✅ YES'}else{'❌ NO'})" -ForegroundColor $(if($findings.CertificatePresent){'Green'}else{'Red'})
Write-Host "Certificate Valid:    $(if($findings.CertificateValid){'✅ YES'}else{'❌ NO'})" -ForegroundColor $(if($findings.CertificateValid){'Green'}else{'Red'})
Write-Host "Azure AD Joined:      $(if($findings.AzureAdJoined){'✅ YES'}else{'❌ NO'})" -ForegroundColor $(if($findings.AzureAdJoined){'Green'}else{'Red'})
Write-Host "Has Valid PRT:        $(if($findings.HasPRT){'✅ YES'}else{'❌ NO'})" -ForegroundColor $(if($findings.HasPRT){'Green'}else{'Red'})
Write-Host "Recent Errors:        $(if($findings.RecentErrors.Count -eq 0){'✅ NONE'}else{"⚠️ $($findings.RecentErrors.Count)"})" -ForegroundColor $(if($findings.RecentErrors.Count -eq 0){'Green'}else{'Yellow'})

Write-Host "`nSEVERITY:    $($findings.Severity)" -ForegroundColor $(if($findings.Severity -eq 'CRITICAL'){'Red'}else{'Yellow'})
Write-Host "ROOT CAUSE:  $($findings.RootCause)" -ForegroundColor White

Write-Host "`n════════════════════════════════════════════════════════════`n" -ForegroundColor Cyan
