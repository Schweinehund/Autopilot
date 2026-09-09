##================================================
## EEE-WIN-Kiosk-Baseline - provisioning-time cleanup for the walk-up kiosk device class
## Paste into the PSADT v4 native Invoke-AppDeployToolkit.ps1 template (session block + 3 functions),
## leave bootstrap/invocation untouched.
##
## PURPOSE: run DURING ESP device setup, BEFORE the kiosk account exists, so the first kiosk profile
## is born clean: no OEM/consumer bloat to block, no OneDrive seed to install, no launcher popups.
## ESP-BLOCKING by design: local-only work, seconds to run, no network dependencies.
##
## Files\ must contain (copied from the SAME repo commit as the remediation packages - one source):
##   Remove-KioskOemBloat.ps1     (pattern list vN - lockstep with Detect-KioskOemBloat.ps1)
##   Remove-KioskRunTasks.ps1     (v2+ - launchers, OneDrive root fixes, orphan profiles)
##
## The daily remediations remain assigned: baseline = clean handover at provisioning;
## remediations = drift janitor. Autopilot Reset re-runs this package during the reset's ESP.
##================================================

$adtSession = @{
    AppVendor                   = '<ORGANIZATION> EEE'
    AppName                     = 'Kiosk-Baseline'
    AppVersion                  = '1.0.0'          # bump whenever either bundled script's lists change
    AppArch                     = 'x64'
    AppLang                     = 'EN'
    AppRevision                 = '01'
    AppSuccessExitCodes         = @(0)
    AppRebootExitCodes          = @(1641, 3010)
    AppProcessesToClose         = @()
    AppScriptVersion            = '1.0.0'
    AppScriptDate               = '2026-08-29'
    AppScriptAuthor             = 'Josh'
    InstallName                 = ''
    InstallTitle                = ''
    DeployAppScriptFriendlyName = $MyInvocation.MyCommand.Name
    DeployAppScriptVersion      = '4.1.0'
    DeployAppScriptParameters   = $PSBoundParameters
    RequireAdmin                = $true
}

$script:RegKey = 'HKLM:\SOFTWARE\EEE\KioskBaseline'

function Install-ADTDeployment
{
    ##================================================
    ## MARK: Pre-Install
    ##================================================
    $adtSession.InstallPhase = "Pre-$($adtSession.DeploymentType)"
    foreach ($f in 'Remove-KioskOemBloat.ps1','Remove-KioskRunTasks.ps1') {
        if (-not (Test-Path (Join-Path $adtSession.DirFiles $f))) {
            Write-ADTLogEntry -Message "Bundled script missing: $f" -Severity 3
            Close-ADTSession -ExitCode 70001
        }
    }

    ##================================================
    ## MARK: Install
    ##================================================
    $adtSession.InstallPhase = $adtSession.DeploymentType
    ## Invoke the SAME scripts the drift remediations use. Each is defensive (SilentlyContinue) and
    ## exits 0; a non-zero here means the script itself is broken, which should fail provisioning
    ## loudly rather than ship a device that only looks clean.
    foreach ($f in 'Remove-KioskOemBloat.ps1','Remove-KioskRunTasks.ps1') {
        Write-ADTLogEntry -Message "Running $f"
        $r = Start-ADTProcess -FilePath "$env:SystemRoot\System32\WindowsPowerShell\v1.0\powershell.exe" `
              -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$(Join-Path $adtSession.DirFiles $f)`"" `
              -WindowStyle Hidden -PassThru
        Write-ADTLogEntry -Message "$f exit code $($r.ExitCode)"
        if ($r.ExitCode -ne 0) { Close-ADTSession -ExitCode 70002 }
    }

    ##================================================
    ## MARK: Post-Install
    ##================================================
    $adtSession.InstallPhase = "Post-$($adtSession.DeploymentType)"
    Set-ADTRegistryKey -Key $script:RegKey -Name 'Version'      -Value "$($adtSession.AppVersion)-$($adtSession.AppRevision)" -Type String
    Set-ADTRegistryKey -Key $script:RegKey -Name 'InstalledUtc' -Value (Get-Date).ToUniversalTime().ToString('o') -Type String
}

function Uninstall-ADTDeployment
{
    $adtSession.InstallPhase = $adtSession.DeploymentType
    ## Cleanup work is not reversible by design; uninstall only removes the marker so the app can be
    ## reinstalled/superseded cleanly.
    Remove-ADTRegistryKey -Key $script:RegKey -Recurse -ErrorAction SilentlyContinue
}

function Repair-ADTDeployment
{
    $adtSession.InstallPhase = $adtSession.DeploymentType
    Install-ADTDeployment
}
