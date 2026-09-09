<#
.SYNOPSIS
    Remediation: removes the packages the paired detection script flagged as REMOVE-*.
.DESCRIPTION
    Patterns MUST stay in lockstep with Detect-KioskOemBloat.ps1. Deprovisions (so future kiosk-account
    rebuilds never see them) and removes for all existing users. Kiosk device class only - never assign
    this package to general fleet groups. Run as SYSTEM, 64-bit, unattended (Intune Remediations calls
    it with no interactive session; every ShouldProcess gate below evaluates true by default, so the
    unattended behavior this pilot validated is unchanged). Validated on the pilot fleet, 2026-08-27 to
    2026-09-01 (see NOTICE).
#>
[CmdletBinding(SupportsShouldProcess)]
param()

$ErrorActionPreference = 'SilentlyContinue'
$removePatterns = '^AD2F1837\.',                          # HP Inc. Store publisher (myHP, HPSystemInformation, ...)
                  '^MicrosoftWindows\.Client\.WebExperience$',  # Widgets
                  '^aimgr$',                               # HP AI mgr
                  '^Microsoft\.OutlookForWindows$',        # new Outlook - registers per-logon startup task
                  '^Microsoft\.BingSearch$',               # Bing Search companion
                  '^Microsoft\.MicrosoftStickyNotes$',     # Sticky Notes
                  '^Microsoft\.Office\.ActionsServer$',     # Office Actions background component
                  '^Microsoft\.PowerAutomateDesktop$',     # Power Automate Desktop - inbox, logon behavior
                  '^Clipchamp\.Clipchamp$',               # consumer video editor
                  '^Microsoft\.BingNews$',                # consumer news
                  '^Microsoft\.BingWeather$',             # consumer weather
                  '^Microsoft\.GamingApp$',               # Xbox app
                  '^AdvancedMicroDevicesInc-2\.AMDRadeonSoftware$',  # AMD Radeon consumer UI (driver itself unaffected)
                  '^Microsoft\.GetHelp$',                 # consumer support app
                  '^Microsoft\.MicrosoftSolitaireCollection$'  # Solitaire
$o = New-Object System.Collections.Generic.List[string]

Get-AppxProvisionedPackage -Online | Where-Object { $n = $_.DisplayName; $removePatterns | Where-Object { $n -match $_ } } |
  ForEach-Object {
    if ($PSCmdlet.ShouldProcess($_.DisplayName, 'Deprovision AppX package')) {
      Remove-AppxProvisionedPackage -Online -PackageName $_.PackageName | Out-Null
      $o.Add("Deprovisioned $($_.DisplayName)")
    }
  }
Get-AppxPackage -AllUsers | Where-Object { $n = $_.Name; $removePatterns | Where-Object { $n -match $_ } } |
  ForEach-Object {
    if ($PSCmdlet.ShouldProcess($_.Name, 'Remove AppX package for all users')) {
      Remove-AppxPackage -Package $_.PackageFullName -AllUsers
      $o.Add("Removed $($_.Name)")
    }
  }

if ($o.Count -eq 0) { Write-Output 'Nothing matched removal patterns' } else { Write-Output (($o | Select-Object -First 20) -join ' | ') }
exit 0
