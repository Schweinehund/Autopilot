<#
.SYNOPSIS
    Kiosk app-block triage sensor (v6) - detection-only Intune remediation script.

.DESCRIPTION
    One pass over every layer that can produce "This app has been blocked by your system administrator"
    on an Assigned Access kiosk, reporting ONLY anomalies so the output fits the portal's
    pre-remediation detection field (~2KB). Healthy device output: "OK: no blocks or anomalous policy found".

    Layers checked, with output prefixes:
      AL<id>   AppLocker ENFORCED blocks only (8004/8007/8022/8025/8027). Audit events (8003/8006) and
               CI-audit (8028) are excluded - they are noise on these kiosks and were crowding out the
               launch-point sections under the 2KB output cap (the v5 truncation bug).
      CI<id>   WDAC / Code Integrity enforcement blocks (3033/3077)
      ASR<id>  Defender Attack Surface Reduction blocks (1121/1122)
      SRP*     Software Restriction Policies - events 865-868 AND config (reported only if NON-STOCK:
               DefaultLevel != 262144/Unrestricted, rule subkeys present, or per-user Safer under kiosk SID)
      AA       Assigned Access Operational/Admin errors & warnings
      RR       RestrictRun allowlist for the kiosk user (context: RestrictRun blocks do not log)
      RUN      Startup Run entries (HKLM x2 + kiosk HKU) - block-candidates that AppLocker/RestrictRun may eat
      RUN1     RunOnce entries (HKLM x2 + kiosk HKU)
      STARTUP  Startup-folder items (common + kiosk user profile)
      TASK     Non-Microsoft scheduled tasks with logon/session triggers -> action executable
      SVCUI    Interactive-session companion processes CURRENTLY running in the kiosk session for known
               agents (SentinelOne, GlobalProtect, Teams VDI, OneDrive) - present = allowed; a required
               companion that is ABSENT here while its parent service runs is the likely blocked app
      CH!      Channel-health warnings ONLY when a channel is disabled or its oldest record post-dates boot
               (i.e. evidence may have rolled; consider raising channel MaxSize)

    Settings: detection-only (no remediation script), Run as logged-on credentials = No (SYSTEM),
    64-bit = Yes. Always exits 0 - this is a sensor, not a compliance gate.

.NOTES
    Validated on the pilot fleet, 2026-08-27 to 2026-09-01 (see NOTICE). Validate output length on a lab device; if a storm of blocks
    overflows the field, the newest entries win (list is emitted newest-first per section, capped).
    v5 adds: RunOnce, Startup folders, logon/session-triggered tasks, and the SVCUI companion census.
    SVCUI 'suspect' logic requires the kiosk user to be signed in when the sensor runs (it is, on a
    healthy autologon kiosk). Get-Process -IncludeUserName needs the SYSTEM context this runs in.
    The agent list in $agentMap is the part to extend as the fleet's agent stack changes.
#>
$ErrorActionPreference = 'SilentlyContinue'
$o = New-Object System.Collections.Generic.List[string]   # low-priority: events, SRP, channel health
$hi = New-Object System.Collections.Generic.List[string]  # high-priority: launch points, SVCUI, RR, AA - emitted FIRST
$boot = (Get-CimInstance Win32_OperatingSystem).LastBootUpTime
$kioskSid = (Get-CimInstance Win32_UserProfile | Where-Object LocalPath -match '\\kiosk' | Select-Object -First 1).SID

function Add-Events {
    param([string]$Log, [int[]]$Ids, [string]$Prefix, [int]$Max = 8, [switch]$NonInfoRange)
    $ev = Get-WinEvent -LogName $Log -MaxEvents 40 -ErrorAction SilentlyContinue
    if ($NonInfoRange) { $ev = $ev | Where-Object { $_.Id -in 8004,8007,8022,8025,8027 } }
    else               { $ev = $ev | Where-Object Id -in $Ids }
    $ev | Select-Object -First $Max | ForEach-Object {
        $o.Add(('{0}{1} {2:MMdd-HHmm} {3}' -f $Prefix, $_.Id, $_.TimeCreated, (($_.Message -split "`n")[0].Trim())))
    }
}

# --- AppLocker (all four channels) + channel health -------------------------------------------------
foreach ($ch in 'EXE and DLL','MSI and Script','Packaged app-Deployment','Packaged app-Execution') {
    $log = "Microsoft-Windows-AppLocker/$ch"
    Add-Events -Log $log -Prefix 'AL' -NonInfoRange
    $cfg = Get-WinEvent -ListLog $log -ErrorAction SilentlyContinue
    if ($cfg) {
        if (-not $cfg.IsEnabled) { $o.Add("CH! $ch disabled") }
        elseif ($cfg.RecordCount -gt 0) {
            $oldest = Get-WinEvent -LogName $log -Oldest -MaxEvents 1
            if ($oldest.TimeCreated -gt $boot) { $o.Add(('CH! {0} rolled (oldest {1:MMdd-HHmm} > boot)' -f $ch, $oldest.TimeCreated)) }
        }
    }
}

# --- WDAC / ASR -------------------------------------------------------------------------------------
Add-Events -Log 'Microsoft-Windows-CodeIntegrity/Operational' -Ids 3033,3077 -Prefix 'CI'
Add-Events -Log 'Microsoft-Windows-Windows Defender/Operational' -Ids 1121,1122 -Prefix 'ASR' -Max 4

# --- SRP: events always; config only if non-stock ---------------------------------------------------
Add-Events -Log 'Application' -Ids 865,866,867,868 -Prefix 'SRP' -Max 6
$saferBase = 'HKLM:\SOFTWARE\Policies\Microsoft\Windows\Safer\CodeIdentifiers'
$safer = Get-ItemProperty $saferBase -ErrorAction SilentlyContinue
if ($safer) {
    $ruleKeys = Get-ChildItem $saferBase -Recurse -ErrorAction SilentlyContinue |
                Where-Object { $_.Property -contains 'ItemData' -or $_.Property -contains 'SaferFlags' }
    $nonStock = ($safer.DefaultLevel -ne 262144) -or $ruleKeys
    if ($nonStock) {
        $o.Add(('SRP-CONFIG DefaultLevel={0} Transparent={1}' -f $safer.DefaultLevel, $safer.TransparentEnabled))
        $ruleKeys | Select-Object -First 6 | ForEach-Object {
            $ip = Get-ItemProperty $_.PSPath
            $o.Add(('SRP-RULE {0} : {1}' -f ($_.Name -replace '.*CodeIdentifiers\\',''), $ip.ItemData))
        }
    }
}
if ($kioskSid -and (Test-Path "Registry::HKEY_USERS\$kioskSid\Software\Policies\Microsoft\Windows\Safer")) { $o.Add('SRP-PERUSER present') }

# --- Assigned Access health -------------------------------------------------------------------------
foreach ($log in 'Microsoft-Windows-AssignedAccess/Operational','Microsoft-Windows-AssignedAccess/Admin') {
    Get-WinEvent -LogName $log -MaxEvents 20 -ErrorAction SilentlyContinue |
      Where-Object LevelDisplayName -in 'Error','Warning' | Select-Object -First 5 |
      ForEach-Object { $hi.Add(('AA {0:MMdd-HHmm} {1}' -f $_.TimeCreated, (($_.Message -split "`n")[0].Trim())) ) }
}

# --- RestrictRun + startup candidates ---------------------------------------------------------------
if ($kioskSid) {
    $rr = "Registry::HKEY_USERS\$kioskSid\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer\RestrictRun"
    if (Test-Path $rr) {
        $vals = (Get-Item $rr).GetValueNames() | ForEach-Object { (Get-ItemProperty $rr).$_ }
        $hi.Add('RR allowlist: ' + (($vals | Select-Object -First 12) -join ','))
    }
}
foreach ($rk in "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run",
                "HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Run",
                "Registry::HKEY_USERS\$kioskSid\Software\Microsoft\Windows\CurrentVersion\Run") {
    if ($rk -match 'HKEY_USERS\\$' ) { continue }
    $item = Get-Item $rk -ErrorAction SilentlyContinue
    if ($item -and $item.GetValueNames()) { $hi.Add(('RUN {0}: {1}' -f $rk.Split('\')[1], ($item.GetValueNames() -join ','))) }
}


# --- Per-logon launch points beyond Run keys --------------------------------------------------------
$kioskLocalPath = (Get-CimInstance Win32_UserProfile | Where-Object SID -eq $kioskSid).LocalPath
foreach ($rk in "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce",
                "HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\RunOnce",
                "Registry::HKEY_USERS\$kioskSid\Software\Microsoft\Windows\CurrentVersion\RunOnce") {
    $item = Get-Item $rk -ErrorAction SilentlyContinue
    if ($item -and $item.GetValueNames()) { $hi.Add(('RUN1 {0}: {1}' -f $rk.Split('\')[1], ($item.GetValueNames() -join ','))) }
}
$startupDirs = @("$env:ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp")
if ($kioskLocalPath) { $startupDirs += "$kioskLocalPath\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup" }
foreach ($sf in $startupDirs) {
    Get-ChildItem $sf -ErrorAction SilentlyContinue | Where-Object Name -ne 'desktop.ini' |
      ForEach-Object { $hi.Add("STARTUP $($_.Name)") }
}
# Logon/session-triggered scheduled tasks outside \Microsoft\ (state != Disabled), with their action
Get-ScheduledTask -ErrorAction SilentlyContinue | Where-Object {
    $_.TaskPath -notmatch '^\\Microsoft\\' -and $_.State -ne 'Disabled' -and
    ($_.Triggers | Where-Object { $_.CimClass.CimClassName -in 'MSFT_TaskLogonTrigger','MSFT_TaskSessionStateChangeTrigger' })
} | Select-Object -First 8 | ForEach-Object {
    $act = ($_.Actions | Where-Object Execute | Select-Object -First 1).Execute
    $hi.Add(('TASK {0}{1} -> {2}' -f $_.TaskPath, $_.TaskName, $act))
}

# --- Session-companion census: known agent UI processes in the kiosk interactive session -----------
# A service itself is exempt from the kiosk allowlist, but the per-session UI it spawns is not.
# Present in the kiosk session => allowed. Parent service running + companion absent => prime suspect
# for the recurring block (name it in AllowedApps or suppress the UI in the agent's own console).
$kioskSession = $null
if ($kioskLocalPath) {
    $kioskUser = Split-Path $kioskLocalPath -Leaf
    $kioskSession = (Get-Process -IncludeUserName -ErrorAction SilentlyContinue |
        Where-Object { $_.UserName -match [regex]::Escape($kioskUser) } | Select-Object -First 1).SessionId
}
$agentMap = @(
    @{ Tag='S1-UI';   Proc='SentinelUI','SentinelAgentUI';      Svc='SentinelAgent' },
    @{ Tag='GP-UI';   Proc='PanGPA';                            Svc='PanGPS' },
    @{ Tag='TeamsVdi';Proc='MsTeamsVdi';                        Svc=$null },
    @{ Tag='OneDrive';Proc='OneDrive';                          Svc=$null }
)
foreach ($a in $agentMap) {
    $running = Get-Process -Name $a.Proc -ErrorAction SilentlyContinue |
               Where-Object { $null -eq $kioskSession -or $_.SessionId -eq $kioskSession }
    $svcState = if ($a.Svc) { (Get-Service -Name $a.Svc -ErrorAction SilentlyContinue).Status } else { $null }
    if ($running) { $hi.Add(('SVCUI {0} running (session {1})' -f $a.Tag, ($running | Select-Object -First 1).SessionId)) }
    elseif ($svcState -eq 'Running') { $hi.Add(('SVCUI {0} ABSENT in session but service {1} running - suspect' -f $a.Tag, $a.Svc)) }
}

# --- Emit -------------------------------------------------------------------------------------------
$all = @($hi | Select-Object -First 20) + @($o | Select-Object -First 16)
if ($all.Count -eq 0) { Write-Output 'OK: no blocks or anomalous policy found' }
else {
    $txt = $all -join ' | '
    Write-Output $txt.Substring(0, [Math]::Min($txt.Length, 2000))
}
exit 0
