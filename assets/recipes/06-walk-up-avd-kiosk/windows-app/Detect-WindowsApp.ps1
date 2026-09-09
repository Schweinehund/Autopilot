# --- Provenance (v1.22 Phase 155, RCP-09) ---
# Source repository: https://github.com/Azure/WindowsAppKiosk
# Source path:        source/WindowsApp/Apps/WindowsApp/Detect-WindowsApp.ps1
# Pinned commit SHA:  17e1c09b4883ea2062bef801ae24bbc9722861d7
# Retrieved:          2026-09-03
# Vendored verbatim below this block. No upstream header existed to preserve.
# --- End provenance ---
$TargetVersion = '2.0.704.0'

$InstalledVersion = (Get-AppxProvisionedPackage -Online | Where-Object { $_.DisplayName -eq "MicrosoftCorporationII.Windows365" }).Version

If ($InstalledVersion) {
    if ($InstalledVersion -ge $TargetVersion) {
        Write-Output "Windows App version [$InstalledVersion] is installed."
        Exit 0
    }
    Else {
        Write-Output "Windows App version [$InstalledVersion] is installed, but older than target version [$TargetVersion]."
        Exit 1
    }
}
Else {
    Write-Output "Windows App is not installed."
    Exit 1
}