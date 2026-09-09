<#
.SYNOPSIS
    Remediation: removes/disables per-logon launchers, fixes OneDrive at the root (Default seed, machine setup, per-user tasks, current-profile payload), and deletes orphaned kioskUser* profiles. v2.
.DESCRIPTION
    Lists MUST stay in lockstep with the detection script. Kiosk device class ONLY - never assign to
    general fleet groups (deleting SecurityHealth/audio-service Run values fleet-wide would be wrong).
    Run values are deleted, RunOnce entries deleted, tasks disabled (not deleted - reversible, and a
    feature update recreating them just gets re-disabled on the next daily cycle).
    Run as SYSTEM, 64-bit, unattended (Intune Remediations calls it with no interactive session; every
    ShouldProcess gate below evaluates true by default, so the unattended behavior this pilot validated
    is unchanged). Validated on the pilot fleet, 2026-08-27 to 2026-09-01 (see NOTICE).
#>
[CmdletBinding(SupportsShouldProcess)]
param()

$ErrorActionPreference = 'SilentlyContinue'
$runValues   = 'SecurityHealth','HPNotifications'   # RtkAudUService dropped: Realtek service rewrites it every boot; blocked silently, accepted noise
$runOnceLike = 'msedge_cleanup*'
$taskNames   = '\ModifyLinkUpdate', '\HP\Consent Manager Launcher'
$actionLike  = 'ActionsServer\.exe$', 'InstallManagerApp\.exe$', 'sdxhelper\.exe$'   # NEVER add MicrosoftEdgeUpdate here - it services WebView2 (Windows App sign-in)
$o = New-Object System.Collections.Generic.List[string]

foreach ($rk in 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run','HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Run') {
    $item = Get-Item $rk; if (-not $item) { continue }
    foreach ($v in @($runValues) + @($item.GetValueNames() | Where-Object { $_ -like $runOnceLike })) {
        if ($item.GetValueNames() -contains $v) {
            if ($PSCmdlet.ShouldProcess("$rk\$v", 'Remove registry value')) { Remove-ItemProperty -Path $rk -Name $v; $o.Add("Deleted Run '$v'") }
        }
    }
}
foreach ($rk in 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce','HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\RunOnce') {
    $item = Get-Item $rk; if (-not $item) { continue }
    foreach ($v in $item.GetValueNames() | Where-Object { $_ -like $runOnceLike }) {
        if ($PSCmdlet.ShouldProcess("$rk\$v", 'Remove registry value')) { Remove-ItemProperty -Path $rk -Name $v; $o.Add("Deleted RunOnce '$v'") }
    }
}
foreach ($t in Get-ScheduledTask | Where-Object State -ne 'Disabled') {
    $full = "$($t.TaskPath.TrimEnd('\'))\$($t.TaskName)" -replace '\\\\','\'
    $act  = ($t.Actions | Where-Object Execute | Select-Object -First 1).Execute
    if (($taskNames -contains $full) -or ($act -and ($actionLike | Where-Object { $act -match $_ }))) {
        # Disable, not delete: reversible, and a feature update that recreates the task just gets
        # re-disabled on the next daily cycle. Not gated - ShouldProcess is reserved for the verbs
        # this script's own header calls out as destructive (delete/remove/deprovision/unregister).
        $t | Disable-ScheduledTask | Out-Null
        $o.Add("Disabled task $full")
    }
}


# --- OneDrive root causes (v2) ---------------------------------------------------------------------
if ($PSCmdlet.ShouldProcess('Default profile OneDrive Run seed (HKU\KioskSeedFix)', 'Clear registry value')) {
    if ((reg load HKU\KioskSeedFix "$env:SystemDrive\Users\Default\NTUSER.DAT" 2>&1) -notmatch 'ERROR') {
        reg delete "HKU\KioskSeedFix\SOFTWARE\Microsoft\Windows\CurrentVersion\Run" /v OneDriveSetup /f 2>&1 | Out-Null
        [gc]::Collect(); reg unload HKU\KioskSeedFix 2>&1 | Out-Null
        $o.Add('Cleared Default-profile OneDrive seed (or already absent)')
    } else { $o.Add('WARN: Default hive busy - seed not cleared this run') }
}
foreach ($p in "$env:SystemRoot\System32\OneDriveSetup.exe","$env:SystemRoot\SysWOW64\OneDriveSetup.exe") {
    if ((Test-Path $p) -and $PSCmdlet.ShouldProcess($p, 'Uninstall OneDrive machine setup')) { Start-Process $p -ArgumentList '/uninstall' -Wait -ErrorAction SilentlyContinue; $o.Add("Ran uninstall: $p") }
}
Get-ScheduledTask -ErrorAction SilentlyContinue | Where-Object { $_.TaskName -like 'OneDrive Startup Task-*' } | ForEach-Object {
    $act = ($_.Actions | Where-Object Execute | Select-Object -First 1).Execute
    if ($act -match '\\Users\\kioskUser\d+\\' -and $PSCmdlet.ShouldProcess($_.TaskName, 'Unregister scheduled task')) { $_ | Unregister-ScheduledTask -Confirm:$false; $o.Add("Removed task $($_.TaskName)") }
}
$currentKiosk = (Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon' -ErrorAction SilentlyContinue).DefaultUserName
if ($currentKiosk -match '^kioskUser\d+$') {
    foreach ($prof in (Get-CimInstance Win32_UserProfile -ErrorAction SilentlyContinue |
        Where-Object { $_.LocalPath -match '\\kioskUser\d+$' -and -not $_.Loaded -and (Split-Path $_.LocalPath -Leaf) -ne $currentKiosk })) {
        $lp = $prof.LocalPath
        if ($PSCmdlet.ShouldProcess($lp, 'Remove orphaned user profile')) { Remove-CimInstance -InputObject $prof -ErrorAction SilentlyContinue; $o.Add("Removed orphan profile $lp") }
    }
} else {
    $o.Add('WARN: could not resolve current kiosk account (DefaultUserName unreadable) - orphan-profile cleanup skipped this run')
}
# Current kiosk profile: strip any already-installed OneDrive payload (policy keeps it from running meanwhile)
if ($currentKiosk -match '^kioskUser\d+$') {
    $oneDrivePayload = "$env:SystemDrive\Users\$currentKiosk\AppData\Local\Microsoft\OneDrive"
    if ($PSCmdlet.ShouldProcess($oneDrivePayload, 'Remove directory')) { Remove-Item $oneDrivePayload -Recurse -Force -ErrorAction SilentlyContinue }
}

if ($o.Count -eq 0) { Write-Output 'Nothing matched' } else { Write-Output (($o | Select-Object -First 25) -join ' | ') }
exit 0
