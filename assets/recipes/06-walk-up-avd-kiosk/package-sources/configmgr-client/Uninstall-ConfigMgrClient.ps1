<# Uninstall wrapper - waits for completion so IME gets a truthful result. SYSTEM, 64-bit. #>
$ErrorActionPreference = 'SilentlyContinue'
$ccmsetup = "$env:windir\ccmsetup\ccmsetup.exe"
if (-not (Test-Path $ccmsetup)) { $ccmsetup = Join-Path $PSScriptRoot 'ccmsetup.exe' }
Start-Process -FilePath $ccmsetup -ArgumentList '/uninstall' -NoNewWindow
Start-Sleep -Seconds 15
while (Get-Process -Name ccmsetup -ErrorAction SilentlyContinue) { Start-Sleep -Seconds 10 }
if (Get-Service -Name CcmExec -ErrorAction SilentlyContinue) { exit 1 } else { exit 0 }
