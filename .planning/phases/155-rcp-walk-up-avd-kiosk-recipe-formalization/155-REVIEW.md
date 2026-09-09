---
phase: 155-rcp-walk-up-avd-kiosk-recipe-formalization
reviewed: 2026-09-04T03:41:23Z
depth: standard
files_reviewed: 21
files_reviewed_list:
  - assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/Files/Remove-KioskOemBloat.ps1
  - assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/Files/Remove-KioskRunTasks.ps1
  - assets/recipes/06-walk-up-avd-kiosk/remediations/oem-bloat/Remove-KioskOemBloat.ps1
  - assets/recipes/06-walk-up-avd-kiosk/remediations/run-task-cleanup/Remove-KioskRunTasks.ps1
  - assets/recipes/06-walk-up-avd-kiosk/remediations/oem-bloat/Detect-KioskOemBloat.ps1
  - assets/recipes/06-walk-up-avd-kiosk/remediations/run-task-cleanup/Detect-KioskRunTasks.ps1
  - assets/recipes/06-walk-up-avd-kiosk/remediations/triage-sensor/Detect-KioskAppBlocks-v6.ps1
  - assets/recipes/06-walk-up-avd-kiosk/package-sources/configmgr-client/Install-ConfigMgrClient.ps1
  - assets/recipes/06-walk-up-avd-kiosk/package-sources/configmgr-client/Uninstall-ConfigMgrClient.ps1
  - assets/recipes/06-walk-up-avd-kiosk/package-sources/configmgr-client/Detect-ConfigMgrClient.ps1
  - assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/KioskBaseline-Invoke-AppDeployToolkit-functions.ps1
  - assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/Build-WindowsAppPackage.ps1
  - assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/New-IntuneWindowsAppKiosk.ps1
  - assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/Deploy-WindowsApp.ps1
  - assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/Detect-WindowsApp.ps1
  - assets/recipes/06-walk-up-avd-kiosk/diagnostics/Get-RdpCredDiag.ps1
  - assets/recipes/06-walk-up-avd-kiosk/diagnostics/Trace-StorisEula.ps1
  - scripts/pipeline/build-filename-map.mjs
  - scripts/pipeline/build-publish-bundle.mjs
  - scripts/validation/check-phase-135.mjs
findings:
  critical: 1
  warning: 5
  info: 3
  total: 9
status: issues_found
---

# Phase 155: Code Review Report

**Reviewed:** 2026-09-04T03:41:23Z
**Depth:** standard
**Files Reviewed:** 21 (20 PowerShell scripts across four tiers + 3 pipeline/validation files touched this phase; two of the twenty PowerShell files exist as byte-identical triplicates, confirmed below)
**Status:** issues_found

## Summary

Triplicate-copy integrity holds: `sha256sum` across all four committed copies of `Remove-KioskOemBloat.ps1` and `Remove-KioskRunTasks.ps1` (package-sources/kiosk-baseline/Files/ and the two remediations/ trees) confirms they are byte-identical, matching NOTICE's claim and the recipe's own "never let the copies diverge" invariant. The `SupportsShouldProcess` retrofit added this phase is scoped correctly (script-level `[CmdletBinding(SupportsShouldProcess)]` before any executable statement, every delete/remove/deprovision/unregister call individually gated) and, given `ConfirmImpact` defaults to `Medium` against PowerShell's default `$ConfirmPreference` of `High`, every gate evaluates `$true` unattended — the retrofit provably does not change the pilot-validated unattended behavior. Tier 4's canary bumps to 237 are real (independently confirmed against the live `docs/_registry/RE-index.md` row count and by running both files' own `--self-test`, 8/0 and 15/0 respectively) and `check-phase-135.mjs`'s line-count-pin retirement is a genuine strengthening, not a weakening — both replacement content needles exist verbatim in the target file at the exact lines asserted.

One Critical finding survives: `Remove-KioskRunTasks.ps1`'s orphaned-profile deletion loop — the single highest-blast-radius operation in this asset tree — has no guard against its exclusion key resolving to null/empty, while an OneDrive-cleanup block six lines later, keyed on the exact same variable, does have that guard. This is a pre-existing property of the owner-authored script (the ShouldProcess retrofit wraps it but does not touch the targeting logic), not introduced this phase, but it was not caught or flagged when the retrofit's behavior-preservation review was done. The remaining findings are Warnings/Info: an error-handling design gap that undercuts the Kiosk Baseline's own "fail loudly" claim, an unbounded wait loop in the ConfigMgr wrapper, a vendored (Microsoft-authored) string-based version-compare bug in `Detect-WindowsApp.ps1`, and a few minor quality items.

## Critical Issues

### CR-01: Orphaned kiosk-profile deletion has no guard against its exclusion key being null/empty — can delete the active (but momentarily unloaded) kiosk profile

**File:** `assets/recipes/06-walk-up-avd-kiosk/remediations/run-task-cleanup/Remove-KioskRunTasks.ps1:65-69` (byte-identical in `package-sources/kiosk-baseline/Files/Remove-KioskRunTasks.ps1:65-69`)
**Status:** Pre-existing owner-authored logic. Not introduced by this phase's `ShouldProcess` retrofit (the retrofit wraps the call, it does not touch the targeting/exclusion logic below) — but the retrofit's own behavior-preservation review did not surface it, and it is exactly the kind of defect that review was meant to catch before a second pilot cycle.

**What breaks:** This script runs daily as SYSTEM via Intune Remediations. Its orphan-cleanup loop is supposed to delete only *retired* `kioskUser*` profiles left behind when Assigned Access mints a new autologon account (`kioskUser0` → `kioskUser1` → …), while preserving the *current* one:

```powershell
$currentKiosk = (Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon' -ErrorAction SilentlyContinue).DefaultUserName
foreach ($prof in (Get-CimInstance Win32_UserProfile -ErrorAction SilentlyContinue |
    Where-Object { $_.LocalPath -match '\\kioskUser\d+$' -and -not $_.Loaded -and (Split-Path $_.LocalPath -Leaf) -ne $currentKiosk })) {
    $lp = $prof.LocalPath
    if ($PSCmdlet.ShouldProcess($lp, 'Remove orphaned user profile')) { Remove-CimInstance -InputObject $prof -ErrorAction SilentlyContinue; $o.Add("Removed orphan profile $lp") }
}
```

`$currentKiosk` is read with `-ErrorAction SilentlyContinue` and no null/empty check before it is used as the exclusion key. If that registry read ever returns `$null` or an empty string — the `DefaultUserName` value is absent, renamed, or unreadable for any reason — the filter `(Split-Path $_.LocalPath -Leaf) -ne $currentKiosk` becomes true for *every* `kioskUser*` profile that is not currently `Loaded`, including the legitimately-provisioned current kiosk profile if it happens to be unloaded at the moment this script runs (e.g., the account was signed out rather than left running, or the script races a boot before autologon has re-established the session). `Remove-CimInstance` on a `Win32_UserProfile` instance deletes the on-disk profile folder along with the registry entry — this is Microsoft's documented behavior for that class's delete path, not a soft/reversible operation. The result is unannounced, unattended, fleet-wide deletion of the active kiosk account's local profile.

**Concrete failure scenario:** `DefaultUserName` under `HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon` is absent or unreadable at the moment the daily remediation runs (e.g., after a future Windows/Assigned-Access change to how autologon is stored, a permissions anomaly, or simply the property not existing on a given build) → `$currentKiosk` is `$null` → every non-loaded `kioskUser*` profile, including the one currently assigned by Assigned Access, is treated as an orphan and permanently deleted → next autologon attempt has no profile to load, or loads into a freshly re-minted profile losing anything the pipeline depended on being present.

**Proof this is an oversight, not a deliberate design choice:** the very next block in the same script, seven lines later, handles the same variable defensively:

```powershell
if ($currentKiosk -match '^kioskUser\d+$') {
    $oneDrivePayload = "$env:SystemDrive\Users\$currentKiosk\AppData\Local\Microsoft\OneDrive"
    if ($PSCmdlet.ShouldProcess($oneDrivePayload, 'Remove directory')) { Remove-Item $oneDrivePayload -Recurse -Force -ErrorAction SilentlyContinue }
}
```

Here the author explicitly guards against `$currentKiosk` being invalid before using it to build a path. The higher-blast-radius profile-deletion loop above it has no equivalent guard.

**Fix:**
```powershell
$currentKiosk = (Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon' -ErrorAction SilentlyContinue).DefaultUserName
if ($currentKiosk -match '^kioskUser\d+$') {
    foreach ($prof in (Get-CimInstance Win32_UserProfile -ErrorAction SilentlyContinue |
        Where-Object { $_.LocalPath -match '\\kioskUser\d+$' -and -not $_.Loaded -and (Split-Path $_.LocalPath -Leaf) -ne $currentKiosk })) {
        $lp = $prof.LocalPath
        if ($PSCmdlet.ShouldProcess($lp, 'Remove orphaned user profile')) { Remove-CimInstance -InputObject $prof -ErrorAction SilentlyContinue; $o.Add("Removed orphan profile $lp") }
    }
} else {
    $o.Add("WARN: could not resolve current kiosk account (DefaultUserName unreadable) - orphan-profile cleanup skipped this run")
}
```
This is the same `-match '^kioskUser\d+$'` guard already used for the OneDrive block, applied to the profile-deletion loop; when the guard fails, the loop is skipped for that run rather than defaulting to "delete everything." The companion detection script (`Detect-KioskRunTasks.ps1:59-62`) has the identical unguarded pattern and should receive the same fix — it does not delete anything itself, but under the same null condition it reports the currently-assigned kiosk profile as `ORPHAN` in the triage/detection output, a false positive that would mislead an operator into believing manual cleanup is needed.

## Warnings

### WR-01: Both `Remove-Kiosk*.ps1` scripts unconditionally `exit 0`, undermining the Kiosk Baseline's own "fail loudly" design intent

**File:** `assets/recipes/06-walk-up-avd-kiosk/remediations/oem-bloat/Remove-KioskOemBloat.ps1:49` and `assets/recipes/06-walk-up-avd-kiosk/remediations/run-task-cleanup/Remove-KioskRunTasks.ps1:78` (both files, all three deployment copies). Cross-referenced against `assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/KioskBaseline-Invoke-AppDeployToolkit-functions.ps1:58-68`.
**Status:** Pre-existing (owner-authored `$ErrorActionPreference = 'SilentlyContinue'` plus unconditional `exit 0`), not introduced this phase; the cross-file consequence below is newly load-bearing because this phase committed the PSADT wrapper that relies on the exit code.

**What breaks:** Both removal scripts set `$ErrorActionPreference = 'SilentlyContinue'` and always `exit 0` at the end regardless of whether any individual `Remove-AppxPackage`, `Remove-ItemProperty`, `Unregister-ScheduledTask`, or `Remove-Item` call actually succeeded — there is no error check between a destructive call and the `$o.Add(...)` success-message line that follows it, so a silently-swallowed failure is logged as a success and the script still exits 0.

The Kiosk Baseline package's own wrapper, committed this phase, explicitly documents the opposite assumption:
```powershell
## Invoke the SAME scripts the drift remediations use. Each is defensive (SilentlyContinue) and
## exits 0; a non-zero here means the script itself is broken, which should fail provisioning
## loudly rather than ship a device that only looks clean.
...
if ($r.ExitCode -ne 0) { Close-ADTSession -ExitCode 70002 }
```
Because the invoked scripts always return 0 by construction — not only when they are "not broken" but also when individual removal operations inside them silently fail — this ESP-blocking gate can never actually fire on a partial-failure case, only on a catastrophic parse/launch failure. A device where, say, `Remove-AppxPackage` fails for a locked package (access denied, servicing in progress) is reported by the Baseline as clean provisioning, and by the daily remediation as a successful run, with no signal reaching Intune that anything went wrong.

**Fix:** Track failures explicitly and reflect them in the exit code, e.g. wrap each destructive call and append to a `$errors` list on catch/non-zero, then `if ($errors.Count) { Write-Output (...); exit 1 } else { exit 0 }`. At minimum, stop relying on `$ErrorActionPreference = 'SilentlyContinue'` to mean "safe to ignore" when a downstream consumer (`KioskBaseline-Invoke-AppDeployToolkit-functions.ps1`) explicitly treats a non-zero exit as the sole signal of failure.

### WR-02: `Install-ConfigMgrClient.ps1` / `Uninstall-ConfigMgrClient.ps1` wait loops have no timeout

**File:** `assets/recipes/06-walk-up-avd-kiosk/package-sources/configmgr-client/Install-ConfigMgrClient.ps1:34` and `Uninstall-ConfigMgrClient.ps1:7`
**Status:** Pre-existing (owner-authored), not modified this phase beyond the Ruling-1 scrub of unrelated lines.

**What breaks:** Both scripts poll with `while (Get-Process -Name ccmsetup -ErrorAction SilentlyContinue) { Start-Sleep -Seconds ... }` with no iteration cap or elapsed-time check. If `ccmsetup.exe` (or its respawned service-mode process) hangs — a real, field-observed ConfigMgr failure mode when CMG connectivity or Entra token acquisition stalls — the wrapper blocks indefinitely. Since this is an Intune Win32 app (not ESP-blocking per the recipe's own Step 9, so device provisioning itself isn't stuck), the practical effect is a Win32 app install/uninstall session that never completes and never reports a result to Intune until the install times out at Intune's own outer limit (default 60 minutes, but the local wait loop itself will hold the device's install queue slot and the interactive/SYSTEM process the entire time).

**Fix:**
```powershell
$deadline = (Get-Date).AddMinutes(30)
while ((Get-Process -Name ccmsetup -ErrorAction SilentlyContinue) -and (Get-Date) -lt $deadline) { Start-Sleep -Seconds 15 }
if (Get-Process -Name ccmsetup -ErrorAction SilentlyContinue) { Write-Output 'ccmsetup did not exit within 30 minutes'; exit 70003 }
```

### WR-03: `Detect-WindowsApp.ps1` compares MSIX versions as strings, not semantic versions (vendored, Microsoft-authored)

**File:** `assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/Detect-WindowsApp.ps1:6`
**Status:** Vendored verbatim from `Azure/WindowsAppKiosk` at pinned commit `17e1c09b4883ea2062bef801ae24bbc9722861d7`, unmodified this phase except for the `$TargetVersion` literal itself (patched by `Build-WindowsAppPackage.ps1`'s regex substitution). Not introduced by this phase; reported per the review instruction to distinguish vendored defects, since it is committed to this repository and reachable by the recipe's own install command line.

**What breaks:** `$InstalledVersion -ge $TargetVersion` compares two plain strings. PowerShell's default `-ge` on strings is ordinal/lexicographic, not dotted-numeric. Whenever a version-component's digit count changes between the pinned target and the self-updated installed version (Windows App self-updates independently of this Win32 app, per the script's own header), the comparison can invert. Example: target pinned at `2.0.90.0`, installed self-updates to `2.0.704.0` (numerically newer) — lexicographic comparison of `"2.0.704.0" -ge "2.0.90.0"` compares character-by-character and finds `'7' < '9'` at the fourth segment's first digit, so it evaluates `$false`, and detection reports the newer-installed version as *older* than target, exiting 1 (not detected/needs reinstall) when the device is in fact already current.

**Fix (if this repository's copy is ever patched independently of upstream):**
```powershell
if ([version]$InstalledVersion -ge [version]$TargetVersion) { ... }
```
Cast both sides to `[version]` before comparing. Flagged here rather than fixed in place — this file is a byte-for-byte vendored copy from a pinned upstream commit; patching it locally would break the "vendored verbatim" provenance guarantee NOTICE records for it (same reasoning NOTICE itself gives for not touching `WindowsApp_AutoLogon.xml`'s embedded sample GUID). Report upstream or accept the risk knowingly.

### WR-04: `New-KioskOemBloat` removal pattern `^AD2F1837\.` is prefix-only (no trailing anchor) — matches every current and future package under that publisher ID, not an enumerated allow-list

**File:** `assets/recipes/06-walk-up-avd-kiosk/remediations/oem-bloat/Remove-KioskOemBloat.ps1:16` (identical in the other two committed copies and in `Detect-KioskOemBloat.ps1:13`)
**Status:** Pre-existing (owner-authored), not modified this phase.

**What breaks:** All 14 of the other patterns in `$removePatterns` are anchored at both ends (`^...$`), matching one exact package name each. The first pattern, `'^AD2F1837\.'`, is anchored only at the start — it matches any `DisplayName`/`Name` beginning with `AD2F1837.`, regardless of what follows. This is a deliberate design choice (the comment names it as "HP Inc. Store publisher") to catch an entire family of apps under one publisher hash without enumerating each one, but it means the removal (and deprovisioning, which prevents the package from ever appearing for future users) is not actually scoped to a reviewed list of app names the way the other 14 patterns are: any *future* Store app shipped under that same publisher ID — including one the fleet later needs — is silently deprovisioned and removed on first daily cycle with no code change and no review trigger, because the matching key is a publisher-ID prefix rather than a package name.

**Fix:** If the intent is genuinely "every app under this publisher, present or future," document that explicitly as the accepted risk (rather than the current comment's app-list framing, which reads as if this is an enumerated allow-list like the other 14). If the intent was closer to the other patterns, anchor it the same way per known package: `'^AD2F1837\.(myHP|HPSystemInformation|HPPrinterControl|...)$'`.

### WR-05: Registry hive load/delete/unload has no `try/finally` — an unexpected exception between `reg load` and `reg unload` leaves `HKU\KioskSeedFix` mounted

**File:** `assets/recipes/06-walk-up-avd-kiosk/remediations/run-task-cleanup/Remove-KioskRunTasks.ps1:51-57`
**Status:** Pre-existing (owner-authored), not modified this phase.

**What breaks:** The Default-profile OneDrive-seed cleanup block loads the Default user's hive under a fixed mount name, runs `reg delete`, then `[gc]::Collect(); reg unload`. All three `reg` invocations are external processes wrapped with `2>&1 | Out-Null`, so they cannot themselves throw a terminating PowerShell exception, but nothing prevents an unrelated terminating error elsewhere in the pipeline (e.g., a `Stop`-preference cmdlet added later, a pipeline-stop from an upstream caller) from skipping the `reg unload` line if it were ever added between load and unload. There is currently no `try { } finally { reg unload ... }` structure to guarantee the unload always runs. If the hive is ever left mounted, every subsequent daily run's `reg load` fails (`ERROR` string match), the script logs `WARN: Default hive busy` indefinitely, and the actual seed-clearing intent silently stops functioning until a reboot or manual `reg unload`.

**Fix:**
```powershell
if ($PSCmdlet.ShouldProcess('Default profile OneDrive Run seed (HKU\KioskSeedFix)', 'Clear registry value')) {
    if ((reg load HKU\KioskSeedFix "$env:SystemDrive\Users\Default\NTUSER.DAT" 2>&1) -notmatch 'ERROR') {
        try {
            reg delete "HKU\KioskSeedFix\SOFTWARE\Microsoft\Windows\CurrentVersion\Run" /v OneDriveSetup /f 2>&1 | Out-Null
            $o.Add('Cleared Default-profile OneDrive seed (or already absent)')
        } finally {
            [gc]::Collect(); reg unload HKU\KioskSeedFix 2>&1 | Out-Null
        }
    } else { $o.Add('WARN: Default hive busy - seed not cleared this run') }
}
```

## Info

### IN-01: `Install-ConfigMgrClient.ps1` reassigns the automatic `$args` variable

**File:** `assets/recipes/06-walk-up-avd-kiosk/package-sources/configmgr-client/Install-ConfigMgrClient.ps1:27`
**Issue:** `$args = "/nocrlcheck /mp:https://$CmgPath ..."` shadows PowerShell's automatic `$args` variable (the array of unbound arguments at script scope). Harmless today because this script declares no `param()` block and Intune's Win32 install command line passes no extra positional arguments, but it is a latent footgun if the script is ever extended to accept parameters or invoked with extras.
**Fix:** Rename to `$ccmArgs` or similar.

### IN-02: `Detect-KioskAppBlocks-v6.ps1` has a dead per-hive guard that can never fire

**File:** `assets/recipes/06-walk-up-avd-kiosk/remediations/triage-sensor/Detect-KioskAppBlocks-v6.ps1:111`
**Issue:** `if ($rk -match 'HKEY_USERS\\$' ) { continue }` is intended to skip the kiosk-SID registry path when `$kioskSid` is empty, but the loop's third path is always `"Registry::HKEY_USERS\$kioskSid\Software\...\Run"`, which — even with `$kioskSid` empty — has `\Software\...` appended after `HKEY_USERS\`, so it never literally ends in `HKEY_USERS\` and the regex never matches. The guard is inert; it happens not to matter because `Get-Item -ErrorAction SilentlyContinue` on the resulting bogus path returns null anyway and the following `if ($item -and ...)` check absorbs it, but the guard reads as intentional protection it does not provide.
**Fix:** `if (-not $kioskSid -and $rk -match 'HKEY_USERS') { continue }`, or drop the guard since the downstream null-check already handles it.

### IN-03: `[gc]::Collect()` before `reg unload` is defensive residue with no PowerShell-side handle to release

**File:** `assets/recipes/06-walk-up-avd-kiosk/remediations/run-task-cleanup/Remove-KioskRunTasks.ps1:54` (and the read-only mirror in `Detect-KioskRunTasks.ps1:48`)
**Issue:** Both hive-load blocks call `[gc]::Collect()` immediately before `reg unload`, but the hive is only ever touched via the external `reg.exe` process (`reg delete` / `Get-Item 'Registry::HKU\...'` — the Detect script does use a PowerShell registry provider read, which could plausibly hold a handle, but the Remove script's block has no PowerShell-side registry access between load and unload at all). In the Remove script this call does nothing; it is copy-pasted pattern residue, not a functional safeguard.
**Fix:** Non-blocking — harmless, but remove from the Remove script's copy (line 54) if this file is touched again; keep it in Detect where a PowerShell registry handle is actually opened.

---

_Reviewed: 2026-09-04T03:41:23Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
