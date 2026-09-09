# EEE-WIN-Kiosk-Baseline - provisioning-time cleanup (Win32, ESP-blocking)

## Why
OneDrive seeding and OEM/consumer bloat are FIRST-LOGON effects. Cleaning during ESP device setup
(before the kiosk account exists) prevents the noisy first boot instead of converging after it.
Daily remediations (OemDebloat, RunTaskCleanup) stay assigned as the drift janitor.
Autopilot Reset wipes IME tracking -> this package re-runs during the reset's ESP automatically.

## Assemble (same repo commit as the remediation packages - ONE source for pattern lists)
1. Fresh PSADT v4 template; paste KioskBaseline-Invoke-AppDeployToolkit-functions.ps1 over the
   session block + three deployment functions.
2. Files\ <- Remove-KioskOemBloat.ps1, Remove-KioskRunTasks.ps1 (current copies included here).
3. Sign scripts; IntuneWinAppUtil -c . -s Invoke-AppDeployToolkit.exe -o .\out

## Intune Win32 app
Install:   Invoke-AppDeployToolkit.exe -DeploymentType Install -DeployMode Silent
Uninstall: Invoke-AppDeployToolkit.exe -DeploymentType Uninstall -DeployMode Silent
System | no restart action | x64 | Win11 22H2+
Detection: registry HKLM\SOFTWARE\EEE\KioskBaseline\Version equals <AppVersion-Rev>
Returns: defaults + 70001/70002 Failed
Assign: Required -> kiosk device group. ESP: ADD to blocking apps list (this package is the
exception to the "nothing extra in ESP" rule: local-only, fast, and its whole point is pre-first-logon).

## Versioning
Pattern change anywhere = update the shared Remove-* scripts once, re-upload to BOTH the remediation
packages and this package's Files\, bump AppVersion + detection. Never let the copies diverge.

## Validation (pilot)
Lab: run install as SYSTEM, confirm marker + both script exit codes 0 in the PSADT log.
Device: Autopilot Reset the pilot kiosk -> expect QUIET first boot (no dialog), sensor v6 clean of
launcher lines, OneDrive absent from the new kioskUserN profile, RunTasks detection = OK on first run.
