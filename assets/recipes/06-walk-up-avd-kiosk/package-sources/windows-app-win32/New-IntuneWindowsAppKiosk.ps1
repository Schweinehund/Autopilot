<#
.SYNOPSIS
    Creates the "Windows App - Kiosk" Win32 app in Intune and assigns it Required to the kiosk device group.

.DESCRIPTION
    Uses the community IntuneWin32App module (Install-Module IntuneWin32App) over Microsoft Graph.
    Reads .\out\package-info.json produced by Build-WindowsAppPackage.ps1.

    Creates:
      - Win32 app, System install, no reboot, x64 / Windows 11 22H2+ requirement
      - Custom script detection (Detect-WindowsApp.ps1), signature check enforced if the build was signed
      - Required assignment to -KioskGroupId

    Does NOT touch the ESP profile: after this runs, add the app to the ESP "block device use until these
    required apps are installed" list by hand (Graph support for that list is awkward and easy to get wrong).

.PARAMETER TenantId
    Entra tenant ID or primary domain.
.PARAMETER KioskGroupId
    Object ID of the kiosk device group (the Autopilot group-tag dynamic group).
.PARAMETER PackageInfo
    Path to package-info.json from the build.
.PARAMETER DisplayName
    Intune display name. Defaults to "Windows App - Kiosk (AVD)".

.NOTES
    Untested as written - built off-box. Cmdlet and parameter names follow IntuneWin32App 1.4.x; verify against
    Get-Command -Module IntuneWin32App on your workstation before running. Requires the DeviceManagementApps.ReadWrite.All
    and Group.Read.All delegated permissions on first Connect-MSIntuneGraph consent.
#>
[CmdletBinding(SupportsShouldProcess)]
param(
    [Parameter(Mandatory)][string]$TenantId,
    [Parameter(Mandatory)][string]$KioskGroupId,
    [string]$PackageInfo = '.\out\package-info.json',
    [string]$DisplayName = 'Windows App - Kiosk (AVD)',
    [string]$Publisher   = 'Microsoft / <ORGANIZATION> EEE'
)
$ErrorActionPreference = 'Stop'

if (-not (Get-Module -ListAvailable IntuneWin32App)) {
    throw 'IntuneWin32App module not installed. Run: Install-Module IntuneWin32App -Scope CurrentUser'
}
Import-Module IntuneWin32App

$info = Get-Content $PackageInfo -Raw | ConvertFrom-Json
if (-not (Test-Path $info.IntuneWinFile)) { throw "IntuneWin file not found: $($info.IntuneWinFile)" }
$packageRoot = Split-Path $PackageInfo -Parent | Split-Path -Parent
$detectScript = Join-Path $packageRoot 'Detect-WindowsApp.ps1'
if (-not (Test-Path $detectScript)) { throw "Detect-WindowsApp.ps1 not found next to the build output: $detectScript" }

Connect-MSIntuneGraph -TenantID $TenantId | Out-Null

# Guard against duplicates: same display name + same version already present.
$existing = Get-IntuneWin32App -DisplayName $DisplayName -ErrorAction SilentlyContinue |
            Where-Object { $_.displayVersion -eq $info.Version }
if ($existing) { throw "An app named '$DisplayName' at version $($info.Version) already exists (id $($existing.id)). Bump or supersede instead." }

$detection = New-IntuneWin32AppDetectionRuleScript -ScriptFile $detectScript `
                -EnforceSignatureCheck $info.Signed -RunAs32Bit $false

$requirement = New-IntuneWin32AppRequirementRule -Architecture x64 -MinimumSupportedWindowsRelease W11_22H2

$description = @"
Provisions Windows App (MicrosoftCorporationII.Windows365 $($info.Version)) machine-wide and sets kiosk auto-logoff:
ResetAppOnCloseOrIdle, 15 min idle, first-run experience skipped. Shell for the walk-up AVD kiosk (Shell Launcher
profile EEE-WIN-Kiosk-ShellLauncher-WindowsApp). Source: Azure/WindowsAppKiosk, Apps/WindowsApp.
Device-context only. Do not assign outside the kiosk device group.
"@

$appParams = @{
    FilePath             = $info.IntuneWinFile
    DisplayName          = $DisplayName
    Description          = $description
    Publisher            = $Publisher
    AppVersion           = $info.Version
    InstallExperience    = 'system'
    RestartBehavior      = 'suppress'
    DetectionRule        = $detection
    RequirementRule      = $requirement
    InstallCommandLine   = $info.InstallCommandLine
    UninstallCommandLine = $info.UninstallCommandLine
    Notes                = "Built $($info.BuiltUtc) by Build-WindowsAppPackage.ps1"
}

if ($PSCmdlet.ShouldProcess($DisplayName, 'Create Win32 app in Intune')) {
    $app = Add-IntuneWin32App @appParams
    Write-Host "Created '$($app.displayName)' id $($app.id)"

    Add-IntuneWin32AppAssignmentGroup -Include -ID $app.id -GroupID $KioskGroupId -Intent required -Notification hideAll | Out-Null
    Write-Host "Assigned Required to group $KioskGroupId"

    Write-Host "`nNext (manual): add '$DisplayName' to the kiosk ESP profile's blocking-apps list, and remove KioskLauncher from it if present."
}
