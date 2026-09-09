<#
.SYNOPSIS
    Builds the Windows App kiosk Win32 package: fetch MSIX, pin detection version, sign, wrap to .intunewin.

.DESCRIPTION
    Run on a Windows admin workstation from inside this folder. Produces .\out\Deploy-WindowsApp.intunewin
    and .\out\package-info.json (version + install command) for New-IntuneWindowsAppKiosk.ps1.

    Steps:
      1. Ensure a Windows App MSIX is present (download from Microsoft's fwlink if not supplied).
      2. Read the package version from the MSIX AppxManifest and write it into Detect-WindowsApp.ps1
         ($TargetVersion) so detection is pinned to what this package installs.
      3. Optionally Authenticode-sign Deploy-WindowsApp.ps1 and Detect-WindowsApp.ps1.
      4. Run IntuneWinAppUtil.exe.

.PARAMETER MsixPath
    Path to an already-downloaded Windows App .msix. If omitted, downloads https://go.microsoft.com/fwlink/?linkid=2262633
    to .\WindowsApp.msix.
.PARAMETER IntuneWinAppUtil
    Path to IntuneWinAppUtil.exe (https://github.com/microsoft/Microsoft-Win32-Content-Prep-Tool).
.PARAMETER CodeSigningCertThumbprint
    Thumbprint of a code-signing cert in Cert:\CurrentUser\My or Cert:\LocalMachine\My. Omit to skip signing,
    or replace the Sign-Script function body with your Azure Key Vault signing step.
.PARAMETER TimestampServer
    RFC 3161 timestamp URL used when signing.
.PARAMETER OutputFolder
    Where the .intunewin and package-info.json are written.

.NOTES
    Untested as written - built off-box. The Deploy/Detect scripts are unmodified from Azure/WindowsAppKiosk
    (source/WindowsApp/Apps/WindowsApp) except for the $TargetVersion pin applied here.
#>
[CmdletBinding()]
param(
    [string]$MsixPath,
    [string]$IntuneWinAppUtil = '.\IntuneWinAppUtil.exe',
    [string]$CodeSigningCertThumbprint,
    [string]$TimestampServer = 'http://timestamp.digicert.com',
    [string]$OutputFolder = '.\out'
)
$ErrorActionPreference = 'Stop'
$here = $PSScriptRoot
if (-not $here) { $here = (Get-Location).Path }

# 1. MSIX
if (-not $MsixPath) {
    $MsixPath = Join-Path $here 'WindowsApp.msix'
    if (-not (Test-Path $MsixPath)) {
        Write-Host "Downloading Windows App MSIX to $MsixPath"
        Invoke-WebRequest -Uri 'https://go.microsoft.com/fwlink/?linkid=2262633' -OutFile $MsixPath -UseBasicParsing
    }
} elseif ((Split-Path $MsixPath -Parent) -ne $here) {
    Copy-Item $MsixPath (Join-Path $here (Split-Path $MsixPath -Leaf)) -Force
    $MsixPath = Join-Path $here (Split-Path $MsixPath -Leaf)
}
if ([IO.Path]::GetExtension($MsixPath) -ne '.msix') {
    throw "Deploy-WindowsApp.ps1 looks for *.msix in its folder; '$MsixPath' has extension '$([IO.Path]::GetExtension($MsixPath))'."
}
$stray = Get-ChildItem $here -Filter *.msix | Where-Object FullName -ne (Resolve-Path $MsixPath).Path
if ($stray) { throw "More than one .msix in the package root - Deploy-WindowsApp.ps1 will pick the first it finds. Remove: $($stray.Name -join ', ')" }

# 2. Version from AppxManifest.xml
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [IO.Compression.ZipFile]::OpenRead((Resolve-Path $MsixPath).Path)
try {
    $entry = $zip.GetEntry('AppxManifest.xml')
    if (-not $entry) { throw 'AppxManifest.xml not found in MSIX' }
    $reader = New-Object IO.StreamReader($entry.Open())
    [xml]$manifest = $reader.ReadToEnd(); $reader.Dispose()
} finally { $zip.Dispose() }
$identity = $manifest.Package.Identity
$version  = $identity.Version
if ($identity.Name -ne 'MicrosoftCorporationII.Windows365') {
    throw "Unexpected package identity '$($identity.Name)'; expected MicrosoftCorporationII.Windows365"
}
Write-Host "Windows App package: $($identity.Name) $version ($($identity.ProcessorArchitecture))"

$detect = Join-Path $here 'Detect-WindowsApp.ps1'
$content = Get-Content $detect -Raw
$patched = [regex]::Replace($content, "^\`$TargetVersion\s*=\s*'[^']*'", "`$TargetVersion = '$version'", 'Multiline')
if ($patched -eq $content -and $content -notmatch [regex]::Escape("'$version'")) { throw 'Could not patch $TargetVersion in Detect-WindowsApp.ps1' }
Set-Content -Path $detect -Value $patched -Encoding UTF8
Write-Host "Detect-WindowsApp.ps1 pinned to $version"

# 3. Sign (optional)
function Sign-Script([string]$Path) {
    $cert = Get-ChildItem Cert:\CurrentUser\My, Cert:\LocalMachine\My -ErrorAction SilentlyContinue |
            Where-Object Thumbprint -eq $CodeSigningCertThumbprint | Select-Object -First 1
    if (-not $cert) { throw "Code-signing cert $CodeSigningCertThumbprint not found in CurrentUser\My or LocalMachine\My" }
    $r = Set-AuthenticodeSignature -FilePath $Path -Certificate $cert -TimestampServer $TimestampServer -HashAlgorithm SHA256
    if ($r.Status -ne 'Valid') { throw "Signing failed for $Path : $($r.StatusMessage)" }
    Write-Host "Signed $(Split-Path $Path -Leaf)"
}
if ($CodeSigningCertThumbprint) {
    Sign-Script (Join-Path $here 'Deploy-WindowsApp.ps1')
    Sign-Script $detect
} else {
    Write-Warning 'Scripts not signed (no -CodeSigningCertThumbprint). Leave "Enforce script signature check" off in the Intune detection rule.'
}

# 4. Wrap
if (-not (Test-Path $IntuneWinAppUtil)) { throw "IntuneWinAppUtil.exe not found at $IntuneWinAppUtil" }
New-Item -Path $OutputFolder -ItemType Directory -Force | Out-Null
& $IntuneWinAppUtil -c $here -s 'Deploy-WindowsApp.ps1' -o $OutputFolder -q
$intunewin = Join-Path $OutputFolder 'Deploy-WindowsApp.intunewin'
if (-not (Test-Path $intunewin)) { throw 'IntuneWinAppUtil did not produce Deploy-WindowsApp.intunewin' }

[pscustomobject]@{
    PackageName        = 'MicrosoftCorporationII.Windows365'
    Version            = $version
    IntuneWinFile      = (Resolve-Path $intunewin).Path
    Signed             = [bool]$CodeSigningCertThumbprint
    InstallCommandLine = 'powershell.exe -ExecutionPolicy Bypass -File Deploy-WindowsApp.ps1 -AutoLogoffConfig ResetAppOnCloseOrIdle -AutoLogoffTimeInterval 15 -SkipFirstRunExperience'
    UninstallCommandLine = 'powershell.exe -ExecutionPolicy Bypass -File Deploy-WindowsApp.ps1 -DeploymentType Uninstall'
    BuiltUtc           = (Get-Date).ToUniversalTime().ToString('o')
} | ConvertTo-Json | Set-Content (Join-Path $OutputFolder 'package-info.json') -Encoding UTF8

Write-Host "`nBuilt $intunewin (Windows App $version)"
