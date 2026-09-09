<#
.SYNOPSIS
    Installs the ConfigMgr client over CMG (Entra auth) on internet-only Entra-joined kiosks.
.DESCRIPTION
    Wrapper exists because ccmsetup.exe hands off to its service and the initial process can return
    before installation finishes - IME would then run detection too early and mark the install failed.
    This script starts ccmsetup, waits for every ccmsetup process to exit, then reads the final exit
    code from ccmsetup.log and returns it to IME (0 and 7 = success; 7 = reboot-pending suppressed).

    FILL IN the four values below from your environment before packaging (sources in README).
.NOTES
    Run as SYSTEM (Intune Win32, system context). 64-bit host. Untested as written - built off-box.
#>
$ErrorActionPreference = 'Stop'

# ---- Environment values (FILL IN) -------------------------------------------------------------
$CmgPath      = '<CMG-FQDN>/CCM_Proxy_MutualAuth/<CONFIRMED-ID>'  # ConfigMgr console > Administration > Cloud Services > Azure Services > Cloud Management > Applications - confirmed CCM_Proxy_MutualAuth string (ClientLocation.log / young-client method)
$SiteCode     = '<SITE-CODE>'                                                       # confirm in console: Administration > Site Configuration > Sites
$AadTenantId  = '<tenant GUID>'
$AadClientApp = '<Native Client app Application ID GUID>'
$AadResource  = '<Server/Web app Application ID URI, e.g. https://ConfigMgrService>'
# -----------------------------------------------------------------------------------------------

$ccmsetup = Join-Path $PSScriptRoot 'ccmsetup.exe'
if (-not (Test-Path $ccmsetup)) { Write-Output "ccmsetup.exe missing from package"; exit 70001 }

$args = "/nocrlcheck /mp:https://$CmgPath CCMHOSTNAME=$CmgPath SMSSITECODE=$SiteCode " +
        "AADTENANTID=$AadTenantId AADCLIENTAPPID=$AadClientApp AADRESOURCEURI=$AadResource"
Write-Output "Launching: ccmsetup.exe $args"
Start-Process -FilePath $ccmsetup -ArgumentList $args -NoNewWindow

# ccmsetup spawns %windir%\ccmsetup\ccmsetup.exe as a service process; wait for ALL instances to finish.
Start-Sleep -Seconds 20
while (Get-Process -Name ccmsetup -ErrorAction SilentlyContinue) { Start-Sleep -Seconds 15 }

# Read the authoritative result from the log.
$log = "$env:windir\ccmsetup\Logs\ccmsetup.log"
$exit = $null
if (Test-Path $log) {
    $line = Select-String -Path $log -Pattern 'CcmSetup is exiting with return code (\d+)' |
            Select-Object -Last 1
    if ($line) { $exit = [int]$line.Matches[0].Groups[1].Value }
}
if ($null -eq $exit) { Write-Output 'Could not determine ccmsetup result from log'; exit 70002 }
Write-Output "ccmsetup exit code: $exit"
if ($exit -in 0,7) { exit 0 } else { exit $exit }
