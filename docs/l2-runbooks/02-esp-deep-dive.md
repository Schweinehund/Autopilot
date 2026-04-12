---
last_verified: 2026-03-21
review_by: 2026-06-19
applies_to: APv1
audience: L2
---

> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

# ESP Deep-Dive Investigation

## Context

[ESP](../_glossary.md#esp) failures are the most common Autopilot escalation. When the [Enrollment Status Page](../_glossary.md#esp) stalls or fails, the cause is typically one of three things: a stale [FirstSync](../_glossary.md#firstsync) key preventing the device from completing the [device phase](../_glossary.md#device-phase), a Win32 app install failure blocking the Sidecar queue, or a policy conflict preventing autologon or policy application. This guide walks through registry-level investigation for both [device phase](../_glossary.md#device-phase) and [user phase](../_glossary.md#user-phase) failures, including [LOB](../_glossary.md#mdm) and Win32 app conflict identification using the Sidecar registry keys.

## Triage

**From L1 escalation ([ESE1](../decision-trees/01-esp-failure.md), [ESE2](../decision-trees/01-esp-failure.md), [ESE4](../decision-trees/01-esp-failure.md), or [ESE5](../decision-trees/01-esp-failure.md))?**
L1 collected: serial, deployment mode, timestamp, ESP phase, time spent on ESP before/after reboot, app name shown on ESP screen.
Skip to Step 2.

**Starting fresh?** Begin at Step 1.

## Investigation

### Step 1: Collect diagnostic package

Before starting: collect a diagnostic package per the [Log Collection Guide](01-log-collection.md). This provides the baseline artifact set (MDM diagnostic HTML, event log exports) needed for all subsequent investigation steps.

### Step 2: Identify ESP phase (device vs user)

Read the `FirstSync` registry key under each enrollment GUID to determine which phase is incomplete.

```powershell
$enrollments = Get-ChildItem "HKLM:\SOFTWARE\Microsoft\Enrollments" -ErrorAction SilentlyContinue
foreach ($enrollment in $enrollments) {
    $firstSync = Get-ItemProperty -Path "$($enrollment.PSPath)\FirstSync" -ErrorAction SilentlyContinue
    if ($firstSync) {
        [PSCustomObject]@{
            EnrollmentGUID = $enrollment.PSChildName
            IsServerProvisioningDone = $firstSync.IsServerProvisioningDone
        }
    }
}
```

**Interpreting the result:**

| Value | Meaning |
|-------|---------|
| `IsServerProvisioningDone = 0` | Device phase is incomplete — server provisioning has not finished; investigation starts with ExpectedPolicies and Sidecar keys |
| `IsServerProvisioningDone = 1` | Device phase completed; issue is in user phase — check user-targeted app assignments and policy targeting |
| Key absent | Device has not yet reached the FirstSync checkpoint — enrollment may have stalled earlier |

See [registry-paths.md](../reference/registry-paths.md) for full path documentation on all enrollment tracking keys.

### Step 3: Check expected policies (device phase stuck)

When `IsServerProvisioningDone = 0`, check which policies the device is waiting for:

```powershell
$espPolicies = "HKLM:\SOFTWARE\Microsoft\Windows\Autopilot\EnrollmentStatusTracking\ESPTrackingInfo\Diagnostics\ExpectedPolicies"
Get-Item -Path $espPolicies -ErrorAction SilentlyContinue
Get-ItemProperty -Path $espPolicies -ErrorAction SilentlyContinue
```

The `ExpectedPolicies` key contains the OMA-URI list of policies the device phase is waiting to receive from Intune. If a policy in this list is never delivered (targeting error, sync delay, or policy not yet applied server-side), the device phase stalls indefinitely.

**What to look for:**
- OMA-URI values present in `ExpectedPolicies` that have not been applied — cross-reference against Intune policy assignment status for the device
- Policies assigned to user groups (not device groups) showing up in device phase expected list — user-targeted policies should not block device phase
- Policies in a pending or failed state in Intune admin center under the device's policy assignment page

See [registry-paths.md](../reference/registry-paths.md) for the `EnrollmentStatusTracking` key documentation.

### Step 4: Check Win32 app install status (Sidecar)

The Sidecar registry path contains per-app subkeys showing the install state for each Win32 app assigned during ESP:

```powershell
$sidecar = "HKLM:\SOFTWARE\Microsoft\Windows\Autopilot\EnrollmentStatusTracking\ESPTrackingInfo\Diagnostics\Sidecar"
Get-ChildItem -Path $sidecar -ErrorAction SilentlyContinue | Select-Object Name, PSChildName
```

To examine individual app status:
```powershell
Get-ChildItem -Path $sidecar -Recurse -ErrorAction SilentlyContinue |
    ForEach-Object {
        $props = Get-ItemProperty -Path $_.PSPath -ErrorAction SilentlyContinue
        if ($props) {
            [PSCustomObject]@{
                AppKey = $_.PSChildName
                Properties = ($props | Select-Object -ExcludeProperty PSPath, PSParentPath, PSChildName, PSDrive, PSProvider)
            }
        }
    }
```

**LOB vs Win32 app behavior:**

| App type | Sidecar key presence | Install tracking |
|----------|---------------------|-----------------|
| Win32 (Intune Management Extension) | Creates per-app subkey under Sidecar | Install state tracked per-app; failures surface here |
| LOB (line-of-business, .msi/.intunewin via legacy path) | May create subkey; tracking varies by version | Less granular than Win32; check AppWorkload.log |

An app with a Sidecar key showing an error state or install failure is the blocking app. Note the app's display name or GUID for Step 5.

### Step 5: Check app install log

> **CRITICAL:** Use `AppWorkload.log` as the primary app install log. The log path changed in August 2024 — `IntuneManagementExtension.log` is no longer the primary source (it still exists but captures a different scope of events).

```powershell
$appLog = "C:\ProgramData\Microsoft\IntuneManagementExtension\Logs\AppWorkload.log"
Get-Content $appLog -Tail 100 | Select-String -Pattern "error|fail|0x8" -CaseSensitive:$false
```

To search for a specific app by name (use the display name from the Sidecar key or ESP screen):
```powershell
$appName = "AppNameHere"   # replace with the app name shown on ESP or from Sidecar key
Get-Content $appLog | Select-String -Pattern $appName -CaseSensitive:$false | Select-Object -Last 30
```

**Key patterns to look for in AppWorkload.log:**
- `Installation of [app] failed with exit code [code]` — specific failure with exit code for lookup
- `0x80070005` — access denied during install; check if another process holds a lock
- `0x80004005` — generic failure; may indicate TrustedInstaller conflict between LOB and Win32 apps
- `RetryCount exceeded` — app has been retried the maximum number of times and is giving up

### Step 6: Check for policy conflicts

If investigation in Steps 3–5 reveals no app install failure and expected policies appear correct, but ESP is still stuck — especially if you see autologon failures or reboot loops — cross-reference to [Policy Conflict Analysis](05-policy-conflicts.md).

Policy conflicts that cause ESP failures often manifest without a discrete error code and may look like an indefinite stall during the device phase or a broken autologon transition into the user phase.

## Resolution

### Scenario A: ESP stuck due to stale FirstSync keys

**Indicators:** Device phase has been running for over 30 minutes; `IsServerProvisioningDone = 0`; no specific app or policy failure is visible; restarting the device did not help.

```powershell
# Dry run first — confirm what will be restarted
Restart-EnrollmentStatusPage -WhatIf

# Execute after reviewing dry run output
Restart-EnrollmentStatusPage
```

`Restart-EnrollmentStatusPage` stops the EnrollmentUX process, removes stale `FirstSync` subkeys, and triggers EnterpriseMgmt scheduled tasks to re-run provisioning. See [powershell-ref.md](../reference/powershell-ref.md#restart-enrollmentstatuspage) for the full operation list.

After running: monitor the device to confirm ESP re-enters the device phase and progresses past the previous stall point.

### Scenario B: Win32 app install failure blocking ESP

**Indicators:** Sidecar key shows an app in error state; AppWorkload.log shows install failure with a specific exit code or error.

1. Identify the blocking app from the Sidecar subkey or AppWorkload.log.
2. Check the app's content and detection rule in Intune admin center (Apps > Windows > select app).
3. Resolution options (in order of preference):
   - **Retry install:** In Intune admin center, navigate to the device's managed apps view and select Retry for the failing app.
   - **Remove from ESP-required list:** If the app is blocking but not critical for device phase, remove it from the list of apps required to block ESP (Enrollment Status Page configuration > block device use until these apps are installed).
   - **Fix app packaging:** If the app consistently fails with an access denied or exit code error, re-package the app and redeploy.

For mixed LOB and Win32 app assignments causing a TrustedInstaller conflict, separate the app types across assignment groups — assign LOB apps to one group and Win32 apps to another.

### Scenario C: ESP timeout (no specific error)

**Indicators:** ESP has not generated a specific error code; `AppWorkload.log` shows no failures; `ExpectedPolicies` appears populated but device phase never completes.

1. Check the ESP timeout configured in the Autopilot profile: Intune admin center > Devices > Windows > Windows Enrollment > Enrollment Status Page. The default is 60 minutes.
2. Check whether the ESP "Block device use until all apps and profiles are installed" setting is enabled and whether the app or policy list is feasible within the timeout window.
3. Check if a Conditional Access policy is blocking Store app license acquisition during ESP (device is not yet compliant when CA policy runs).
4. If the policy list in `ExpectedPolicies` contains policies that are never delivered, investigate the policy targeting in Intune — policies assigned to user groups will not be delivered during device phase.

## Escalation Ceiling

Escalate when the root cause is a Microsoft-side service issue or an Intune backend bug. Indicators:

- All policies appear correctly targeted and applied in Intune admin center
- No app install failures found in AppWorkload.log
- Sidecar keys show no error states
- `IsServerProvisioningDone` remains `0` indefinitely despite no apparent failure
- Intune service health dashboard (admin.microsoft.com > Health > Service health) shows degradation in the Intune or Autopilot service

At this point, collect the full diagnostic package from Step 1, document all registry values examined, and open a Microsoft Premier Support case.

## Tool References

- [Restart-EnrollmentStatusPage](../reference/powershell-ref.md#restart-enrollmentstatuspage) — restarts ESP process and clears stale FirstSync keys; supports `-WhatIf` for dry run
- [Get-AutopilotDeviceStatus](../reference/powershell-ref.md#get-autopilotdevicestatus) — comprehensive device state snapshot combining registration, TPM, and network status
- [Registry Paths](../reference/registry-paths.md) — ESP tracking keys: `EnrollmentStatusTracking`, `ExpectedPolicies`, `Sidecar`, `FirstSync`
- [ESP Error Codes](../error-codes/03-esp-enrollment.md) — coded ESP error lookup table and policy conflicts table with multi-cause handling
- [Policy Conflict Analysis](05-policy-conflicts.md) — for policy-related ESP failures including AutoAdminLogon, AppLocker CSP, and Security Baseline conflicts

---

## Version History

| Date | Change |
|------|--------|
| 2026-03-21 | Initial version — device/user phase registry investigation, Sidecar Win32 tracking, AppWorkload.log reference, triage block, three resolution scenarios |
