##================================================
## EEE-WIN-Kiosk-Baseline - provisioning-time cleanup for the walk-up kiosk device class
## Paste into the PSADT v4 native Invoke-AppDeployToolkit.ps1 template (session block + 3 functions),
## leave bootstrap/invocation untouched.
##
## PURPOSE: run DURING ESP device setup, BEFORE the kiosk account exists, so the first kiosk profile
## is born clean: no OEM/consumer bloat to block, no OneDrive seed to install, no launcher popups.
## ESP-BLOCKING by design. The EEE scripts are local-only; the vendored De-Bloat script has five
## runtime fetch paths, four conditional and one - the Office Deployment Tool - unconditional during
## ESP. All five are listed in README.
##
## Files\ must contain - the two EEE scripts copied from the SAME repo commit as the remediation
## packages (one source for their pattern lists), plus the vendored De-Bloat script and its license
## text at the commit NOTICE pins:
##   RemoveBloat.ps1              (vendored, GPL-3.0, see NOTICE)
##   LICENSE.GPL-3.0.txt          (vendored license text, see NOTICE)
##   Remove-KioskOemBloat.ps1     (pattern list vN - lockstep with Detect-KioskOemBloat.ps1)
##   Remove-KioskRunTasks.ps1     (v2+ - launchers, OneDrive root fixes, orphan profiles)
##
## The daily remediations remain assigned: baseline = clean handover at provisioning;
## remediations = drift janitor. Autopilot Reset re-runs this package during the reset's ESP.
##================================================

$adtSession = @{
    AppVendor                   = '<ORGANIZATION> EEE'
    AppName                     = 'Kiosk-Baseline'
    AppVersion                  = '1.1.0'          # bump whenever either bundled script's lists change
    AppArch                     = 'x64'
    AppLang                     = 'EN'
    AppRevision                 = '01'
    AppSuccessExitCodes         = @(0)
    AppRebootExitCodes          = @(1641, 3010)
    AppProcessesToClose         = @()
    AppScriptVersion            = '1.1.0'
    AppScriptDate               = '2026-09-16'
    AppScriptAuthor             = 'Josh'
    InstallName                 = ''
    InstallTitle                = ''
    DeployAppScriptFriendlyName = $MyInvocation.MyCommand.Name
    DeployAppScriptVersion      = '4.1.0'
    DeployAppScriptParameters   = $PSBoundParameters
    RequireAdmin                = $true
}

$script:RegKey = 'HKLM:\SOFTWARE\EEE\KioskBaseline'

$script:BundledScripts = @(
    @{ File = 'RemoveBloat.ps1';           Args = '-AllowStartMenuReset false' }   # vendored, GPL-3.0, see NOTICE.
                                                                                   # No -customwhitelist (owner ruling 2026-09-15); adding one
                                                                                   # re-runs the README PROTECTED review first.
                                                                                   # NEVER pass -custombloatlist: it strips entries from the
                                                                                   # upstream protection list (RemoveBloat.ps1:519).
    @{ File = 'Remove-KioskOemBloat.ps1';  Args = '' }
    @{ File = 'Remove-KioskRunTasks.ps1';  Args = '' }
)

function Install-ADTDeployment
{
    ##================================================
    ## MARK: Pre-Install
    ##================================================
    $adtSession.InstallPhase = "Pre-$($adtSession.DeploymentType)"
    foreach ($s in $script:BundledScripts) {
        if (-not (Test-Path (Join-Path $adtSession.DirFiles $s.File))) {
            Write-ADTLogEntry -Message "Bundled script missing: $($s.File)" -Severity 3
            Close-ADTSession -ExitCode 70001
        }
    }

    ##================================================
    ## MARK: Install
    ##================================================
    $adtSession.InstallPhase = $adtSession.DeploymentType
    ## Invoke the bundled scripts in $script:BundledScripts order: the vendored De-Bloat pass first,
    ## then the two EEE scripts the drift remediations also use. The EEE pair is defensive
    ## (SilentlyContinue) and exits 0; the vendored script's exit behaviour is upstream's and is not
    ## assumed here. A non-zero from any of them should fail provisioning loudly rather than ship a
    ## device that only looks clean.
    foreach ($s in $script:BundledScripts) {
        Write-ADTLogEntry -Message "Running $($s.File) $($s.Args)"
        # -ErrorAction SilentlyContinue is load-bearing, not defensive noise: without it PSADT 4.1.7
        # throws on a non-zero exit and $r is never assigned, so the 70002 gate below is unreachable
        # and the session exits 60001 instead - a code this package's Intune return-code map does not carry.
        $r = Start-ADTProcess -FilePath "$env:SystemRoot\System32\WindowsPowerShell\v1.0\powershell.exe" `
              -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$(Join-Path $adtSession.DirFiles $s.File)`" $($s.Args)" `
              -WindowStyle Hidden -PassThru -ErrorAction SilentlyContinue
        Write-ADTLogEntry -Message "$($s.File) exit code $($r.ExitCode)"
        if ($r.ExitCode -ne 0) { Close-ADTSession -ExitCode 70002 }
        if ($s.File -eq 'RemoveBloat.ps1') {
            # De-Bloat mounts C:\Users\Default\NTUSER.DAT as HKU\temphive three times (:1250/:1417/:1529)
            # and never checks its own unloads. A leaked mount blocks Remove-KioskRunTasks.ps1:52.
            reg unload HKU\temphive 2>&1 | Out-Null
        }
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
