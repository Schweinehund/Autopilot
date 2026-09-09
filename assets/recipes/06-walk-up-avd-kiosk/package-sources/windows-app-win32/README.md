# Windows App - Kiosk (AVD) — Intune Win32 package

Source files from Azure/WindowsAppKiosk (source/WindowsApp/Apps/WindowsApp), unmodified.
Build and Intune-creation scripts added by EEE.

## Build (Windows admin workstation, run from this folder)
1. Place IntuneWinAppUtil.exe here (or pass -IntuneWinAppUtil).
2. .\Build-WindowsAppPackage.ps1 [-CodeSigningCertThumbprint <thumb>]
   - downloads WindowsApp.msix from Microsoft if not present
   - pins Detect-WindowsApp.ps1 $TargetVersion to the MSIX version
   - signs the two scripts (optional)
   - writes .\out\Deploy-WindowsApp.intunewin and .\out\package-info.json
3. Lab test as SYSTEM before publishing:
   psexec -s -i powershell -ExecutionPolicy Bypass -File .\Deploy-WindowsApp.ps1 -AutoLogoffConfig ResetAppOnCloseOrIdle -AutoLogoffTimeInterval 15 -SkipFirstRunExperience
   then: .\Detect-WindowsApp.ps1 ; $LASTEXITCODE (expect 0)
         Get-ItemProperty HKLM:\SOFTWARE\Microsoft\WindowsApp

## Create in Intune
Option A (portal): Apps > Windows > Add > Win32. Values are in .\out\package-info.json plus:
  Install behavior System | Restart: no specific action | Req: x64, Win11 22H2 |
  Detection: custom script Detect-WindowsApp.ps1, 32-bit No, signature check = Signed value from package-info.json
Option B (Graph): .\New-IntuneWindowsAppKiosk.ps1 -TenantId <tenant> -KioskGroupId <group object id>

Either way, finish by adding the app to the kiosk ESP blocking-apps list.

## Versioning
Windows App self-updates on the device; detection is >= pinned version, so drift upward keeps detection green.
Rebuild (new MSIX, re-run build) only when you want a newer floor or to change the auto-logoff parameters,
then supersede in Intune.
