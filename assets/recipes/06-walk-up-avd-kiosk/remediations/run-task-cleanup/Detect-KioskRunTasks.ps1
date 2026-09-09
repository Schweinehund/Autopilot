<#
.SYNOPSIS
    Detection: flags kiosk-irrelevant per-logon launchers, OneDrive root causes (Default-profile seed, machine setup, per-user tasks), and orphaned kioskUser* profiles. v2.
.DESCRIPTION
    Paired with Remove-KioskRunTasks.ps1 - lists stay in LOCKSTEP between the two scripts.
    Exit 1 = something to clean (remediation runs). Exit 0 = clean.
    Targets (from the v6 sensor inventory on the HP factory image):
      Run values  : SecurityHealth (launches blocked SecHealthUI = dialog suspect), RtkAudUService, HPNotifications
      RunOnce     : msedge_cleanup_* (blocked forever = re-fires forever)
      Tasks by NAME: \ModifyLinkUpdate (AMD), \HP\Consent Manager Launcher
      Tasks by ACTION: any enabled task whose action exe matches ActionsServer.exe or InstallManagerApp.exe
    Deliberately NOT touched:
      'Sentinel Agent' Run value - suppress the S1 tray via the S1 console policy for the kiosk group instead;
        the agent's tamper protection may restore local deletions, and console policy is the supported control.
      OneDrive Startup Task-S-1-5-...-500 - scoped to the Administrator profile, never fires in the kiosk session.
    Run as SYSTEM, 64-bit. Validated on the pilot fleet, 2026-08-27 to 2026-09-01 (see NOTICE).
#>
$ErrorActionPreference = 'SilentlyContinue'
$runValues   = 'SecurityHealth','HPNotifications'   # RtkAudUService dropped: Realtek service rewrites it every boot; blocked silently, accepted noise
$runOnceLike = 'msedge_cleanup*'
$taskNames   = '\ModifyLinkUpdate', '\HP\Consent Manager Launcher'
$actionLike  = 'ActionsServer\.exe$', 'InstallManagerApp\.exe$', 'sdxhelper\.exe$'   # NEVER add MicrosoftEdgeUpdate here - it services WebView2 (Windows App sign-in)
$o = New-Object System.Collections.Generic.List[string]

foreach ($rk in 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run','HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Run') {
    $item = Get-Item $rk; if (-not $item) { continue }
    foreach ($v in $runValues)  { if ($item.GetValueNames() -contains $v) { $o.Add("RUNVAL $v") } }
    foreach ($v in $item.GetValueNames() | Where-Object { $_ -like $runOnceLike }) { $o.Add("RUNVAL $v") }
}
foreach ($rk in 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce','HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\RunOnce') {
    $item = Get-Item $rk; if (-not $item) { continue }
    foreach ($v in $item.GetValueNames() | Where-Object { $_ -like $runOnceLike }) { $o.Add("RUNONCE $v") }
}
foreach ($t in Get-ScheduledTask | Where-Object State -ne 'Disabled') {
    $full = "$($t.TaskPath.TrimEnd('\'))\$($t.TaskName)" -replace '\\\\','\'
    $act  = ($t.Actions | Where-Object Execute | Select-Object -First 1).Execute
    if ($taskNames -contains $full) { $o.Add("TASK $full") ; continue }
    if ($act -and ($actionLike | Where-Object { $act -match $_ })) { $o.Add("TASK-ACTION $full -> $act") }
}


# --- OneDrive root causes (v2) ---------------------------------------------------------------------
# Default-profile seed: every new kiosk profile inherits OneDrive unless this is absent.
$seed = $false
if ((reg load HKU\KioskSeedChk "$env:SystemDrive\Users\Default\NTUSER.DAT" 2>&1) -notmatch 'ERROR') {
    $rk = Get-Item 'Registry::HKU\KioskSeedChk\SOFTWARE\Microsoft\Windows\CurrentVersion\Run' -ErrorAction SilentlyContinue
    if ($rk -and ($rk.GetValueNames() -contains 'OneDriveSetup')) { $seed = $true }
    [gc]::Collect(); reg unload HKU\KioskSeedChk 2>&1 | Out-Null
}
if ($seed) { $o.Add('ONEDRIVE default-profile seed present') }
foreach ($p in "$env:SystemRoot\System32\OneDriveSetup.exe","$env:SystemRoot\SysWOW64\OneDriveSetup.exe") {
    if (Test-Path $p) { $o.Add("ONEDRIVE machine setup present: $p") }
}
Get-ScheduledTask -ErrorAction SilentlyContinue | Where-Object { $_.TaskName -like 'OneDrive Startup Task-*' -and $_.State -ne 'Disabled' } | ForEach-Object {
    $act = ($_.Actions | Where-Object Execute | Select-Object -First 1).Execute
    if ($act -match '\\Users\\kioskUser\d+\\') { $o.Add("ONEDRIVE per-user task $($_.TaskName)") }
}
# Orphaned kiosk profiles from Assigned Access account rotation (stale OneDrive payloads live here)
$currentKiosk = (Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon' -ErrorAction SilentlyContinue).DefaultUserName
if ($currentKiosk -match '^kioskUser\d+$') {
    Get-CimInstance Win32_UserProfile -ErrorAction SilentlyContinue |
      Where-Object { $_.LocalPath -match '\\kioskUser\d+$' -and -not $_.Loaded -and (Split-Path $_.LocalPath -Leaf) -ne $currentKiosk } |
      ForEach-Object { $o.Add("ORPHAN profile $($_.LocalPath)") }
} else {
    $o.Add('WARN: could not resolve current kiosk account (DefaultUserName unreadable) - orphan-profile check skipped this run')
}

if ($o.Count -eq 0) { Write-Output 'OK: no targeted launchers present'; exit 0 }
Write-Output (($o | Select-Object -First 25) -join ' | ')
exit 1
