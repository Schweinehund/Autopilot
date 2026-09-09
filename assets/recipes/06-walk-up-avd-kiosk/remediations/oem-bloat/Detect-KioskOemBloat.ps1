<#
.SYNOPSIS
    Detection: reports HP OEM / Widgets packages on the kiosk; exit 1 when removable bloat is present.
.DESCRIPTION
    Paired with Remove-KioskOemBloat.ps1 in an Intune remediation. v2: adds new Outlook, BingSearch, StickyNotes, Office ActionsServer. Output shows:
      REMOVE-provisioned / REMOVE-installed : exactly what the remediation script will remove
      INFO : wider HP/OEM roster for awareness (NOT removed - review and extend $removePatterns deliberately)
    Exit 1 => remediation runs. Exit 0 => clean (this is the post-removal confirmation state).
    Run as SYSTEM, 64-bit. Validated on the pilot fleet, 2026-08-27 to 2026-09-01 (see NOTICE).
#>
$ErrorActionPreference = 'SilentlyContinue'
# Strict removal set - only patterns we have positively identified as kiosk-irrelevant bloat:
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

$prov = Get-AppxProvisionedPackage -Online
$inst = Get-AppxPackage -AllUsers
$hit = $false
foreach ($p in $prov) { if ($removePatterns | Where-Object { $p.DisplayName -match $_ }) { $o.Add("REMOVE-provisioned $($p.DisplayName) $($p.Version)"); $hit = $true } }
foreach ($p in $inst) { if ($removePatterns | Where-Object { $p.Name -match $_ })        { $o.Add("REMOVE-installed $($p.Name) [$(($p.PackageUserInformation | Measure-Object).Count) user(s)]"); $hit = $true } }

# Awareness roster: everything OEM-ish that is NOT yet in the removal set
foreach ($p in $prov) {
    $inRemove = $removePatterns | Where-Object { $p.DisplayName -match $_ }
    if (-not $inRemove -and $p.DisplayName -match 'AD2F1837|^HP|Hewlett|aimgr|MyASUS|Lenovo|Dell') { $o.Add("INFO provisioned $($p.DisplayName)") }
}

if (-not $hit) { Write-Output 'OK: no targeted OEM bloat present'; exit 0 }
$txt = ($o | Select-Object -First 25) -join ' | '
Write-Output $txt.Substring(0,[Math]::Min($txt.Length,2000))
exit 1
