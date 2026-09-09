<#
.SYNOPSIS
    Collects the policy state behind RDP saved-credential refusals and Credential Guard CredSSP blocks.

.DESCRIPTION
    Run elevated.
      -Role Client : on the machine running mstsc/RDCMan/Windows App
      -Role Server : on the RDP target / AVD session host
    Writes a transcript to .\RdpCredDiag-<host>-<role>.txt and prints a findings summary.
    Read-only; changes nothing.

.NOTES
    Untested as written - built off-box. PowerShell 5.1+, elevated.
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory)][ValidateSet('Client','Server')][string]$Role
)
$ErrorActionPreference = 'Continue'
$out = ".\RdpCredDiag-$env:COMPUTERNAME-$Role.txt"
Start-Transcript -Path $out -Force | Out-Null
$findings = New-Object System.Collections.Generic.List[string]

function Show-Reg {
    param([string]$Path, [string[]]$Names)
    Write-Host "`n### $Path"
    if (-not (Test-Path $Path)) { Write-Host '  (key absent)'; return $null }
    $p = Get-ItemProperty -Path $Path
    foreach ($n in $Names) {
        $v = $p.PSObject.Properties[$n]
        Write-Host ('  {0,-45} = {1}' -f $n, ($(if ($v) { $v.Value } else { '(not set)' })))
    }
    return $p
}

Write-Host "=== RDP credential diagnostics | $env:COMPUTERNAME | Role: $Role | $(Get-Date -Format o) ==="
Write-Host ("OS: " + (Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion').ProductName + ' ' +
            (Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion').DisplayVersion + ' | Edition: ' +
            (Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion').EditionID)

# ---------------- Credential Guard state (both roles; decisive for the Windows App message on clients) ----------------
Write-Host "`n### Credential Guard / VBS (Win32_DeviceGuard)"
$dg = Get-CimInstance -Namespace root\Microsoft\Windows\DeviceGuard -ClassName Win32_DeviceGuard -ErrorAction SilentlyContinue
if ($dg) {
    Write-Host ('  SecurityServicesConfigured = {0}' -f ($dg.SecurityServicesConfigured -join ','))
    Write-Host ('  SecurityServicesRunning    = {0}   (1 = Credential Guard, 2 = HVCI)' -f ($dg.SecurityServicesRunning -join ','))
    Write-Host ('  VirtualizationBasedSecurityStatus = {0} (2 = running)' -f $dg.VirtualizationBasedSecurityStatus)
    if ($dg.SecurityServicesRunning -contains 1) { $findings.Add('Credential Guard is RUNNING on this machine - CredSSP delegation of logon/saved credentials is blocked here (explains the Windows App message when this is the client).') }
    else { $findings.Add('Credential Guard is NOT running on this machine.') }
} else { Write-Host '  (Win32_DeviceGuard unavailable)' }
Show-Reg 'HKLM:\SYSTEM\CurrentControlSet\Control\LSA' @('LsaCfgFlags','LsaCfgFlagsDefault','RunAsPPL') | Out-Null
Show-Reg 'HKLM:\SOFTWARE\Policies\Microsoft\Windows\DeviceGuard' @('EnableVirtualizationBasedSecurity','LsaCfgFlags','RequirePlatformSecurityFeatures','LsaCfgFlagsDefault') | Out-Null
# LsaCfgFlags: 1=CG on with UEFI lock, 2=CG on without lock, 0=off. Policy key present => explicitly managed; absent + running => OS default-enablement.

# ---------------- Credential delegation & password saving (decisive on the CLIENT) ----------------
Show-Reg 'HKLM:\SOFTWARE\Policies\Microsoft\Windows\CredentialsDelegation' @(
    'AllowDefaultCredentials','AllowSavedCredentials','AllowSavedCredentialsWhenNTLMOnly',
    'DenyDefaultCredentials','DenySavedCredentials','DenySavedCredentialsWhenNTLMOnly',
    'AllowDefCredentialsWhenNTLMOnly','RestrictedRemoteAdministration','RestrictedRemoteAdministrationType') | Out-Null
if (Test-Path 'HKLM:\SOFTWARE\Policies\Microsoft\Windows\CredentialsDelegation') {
    Get-ChildItem 'HKLM:\SOFTWARE\Policies\Microsoft\Windows\CredentialsDelegation' -ErrorAction SilentlyContinue | ForEach-Object {
        Write-Host "  [$($_.PSChildName)]"
        (Get-ItemProperty $_.PSPath).PSObject.Properties | Where-Object Name -notmatch '^PS' | ForEach-Object { Write-Host ('    {0} = {1}' -f $_.Name, $_.Value) }
    }
}
$ts = Show-Reg 'HKLM:\SOFTWARE\Policies\Microsoft\Windows NT\Terminal Services' @('DisablePasswordSaving','fPromptForPassword','SecurityLayer','UserAuthentication','fEncryptRPCTraffic')
if ($Role -eq 'Client' -and $ts -and $ts.PSObject.Properties['DisablePasswordSaving'] -and $ts.DisablePasswordSaving -eq 1) {
    $findings.Add('CLIENT policy "Do not allow passwords to be saved" (DisablePasswordSaving=1) is set - mstsc cannot store new credentials here.')
}

# ---------------- Server-side prompt policy (decisive on the SERVER) ----------------
if ($Role -eq 'Server') {
    if ($ts -and $ts.PSObject.Properties['fPromptForPassword'] -and $ts.fPromptForPassword -eq 1) {
        $findings.Add('SERVER policy "Always prompt for password upon connection" (fPromptForPassword=1, policy hive) is SET - this produces exactly: "The server''s authentication policy does not allow connection requests using saved credentials."')
    }
    Show-Reg 'HKLM:\SYSTEM\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp' @('fPromptForPassword','SecurityLayer','UserAuthentication','fInheritAutoLogon') | Out-Null
    Write-Host "`n### AVD agent presence (session host?)"
    Write-Host ('  RDInfraAgent installed: {0}' -f (Test-Path 'HKLM:\SOFTWARE\Microsoft\RDInfraAgent'))
}

# ---------------- Who set it: GPO vs MDM attribution ----------------
Write-Host "`n### MDM PolicyManager (Intune-delivered values, if any)"
foreach ($area in 'CredentialsDelegation','RemoteDesktopServices','DeviceGuard') {
    Show-Reg "HKLM:\SOFTWARE\Microsoft\PolicyManager\current\device\$area" @('*') | Out-Null
    if (Test-Path "HKLM:\SOFTWARE\Microsoft\PolicyManager\current\device\$area") {
        (Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\PolicyManager\current\device\$area").PSObject.Properties |
            Where-Object Name -notmatch '^PS|_ProviderSet$|_WinningProvider$' |
            ForEach-Object { Write-Host ('  {0} = {1}' -f $_.Name, $_.Value) }
    }
}
Write-Host "`n### Resultant GPO report"
$gp = ".\gpresult-$env:COMPUTERNAME.html"
gpresult /scope computer /h $gp /f 2>$null
if (Test-Path $gp) {
    Write-Host "  Written: $gp  -> search it for 'Always prompt for password', 'Credential', 'Device Guard' to get the winning GPO name."
} else { Write-Host '  gpresult unavailable (Entra-only device with no GPO history is normal here).' }

# ---------------- Summary ----------------
Write-Host "`n=== FINDINGS ==="
if ($findings.Count) { $findings | ForEach-Object { Write-Host " - $_" } } else { Write-Host ' - No decisive policy hits; review transcript detail.' }
Write-Host "Transcript: $out"
Stop-Transcript | Out-Null
