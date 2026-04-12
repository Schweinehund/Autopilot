---
last_verified: 2026-04-12
review_by: 2026-07-11
applies_to: APv2
audience: L2
---

> **Version gate:** This guide covers Autopilot Device Preparation (APv2). For Windows Autopilot (classic), see [APv1 Log Collection Guide](01-log-collection.md).

# APv2 Log Collection Guide

## Triage

**From L1 escalation ([APE1](../decision-trees/04-apv2-triage.md), [APE2](../decision-trees/04-apv2-triage.md), or [APE3](../decision-trees/04-apv2-triage.md))?**
L1 collected: deployment report screenshot/export, device serial number, signing-in user UPN, and scenario-specific data (see [Escalation Data table](../decision-trees/04-apv2-triage.md#escalation-data)). Skip to Step 2.

**Starting fresh?** Begin at Step 1.

Step 1 is always initial portal state verification. Step 2 and beyond begin log collection.

## Context

This guide is the prerequisite for all APv2 L2 investigation runbooks. Before starting any [BootstrapperAgent event ID](07-apv2-event-ids.md) or [deployment report](08-apv2-deployment-report.md) investigation, collect a complete APv2 diagnostic package using the steps below.

The principle is **gather everything first, then investigate**. Collecting all artifacts upfront prevents having to return to the device mid-investigation when a log file is needed.

> **CRITICAL: MDM Diagnostic Tool does not apply to APv2.**
> `mdmdiagnosticstool.exe -area Autopilot -cab` is designed for APv1 (classic Autopilot) and the ESP flow. It does not capture BootstrapperAgent data. Do not use it for APv2 investigations. APv2 diagnostics are collected from: (1) the BootstrapperAgent event log, (2) the IME log folder, and (3) the Intune deployment report in the admin center.

---

## Investigation

### Step 1: Verify deployment state in Intune portal

Navigate to the Intune admin center deployment report to establish baseline state before collecting device-side logs.

```
Intune admin center (https://intune.microsoft.com)
  > Devices
  > Monitor
  > Windows Autopilot device preparation deployments
  > Select the device under Device name
```

Record the following from the deployment report:

| Field | What to Record |
|-------|----------------|
| Deployment status | In progress / Success / Failed |
| Phase | Policy installation / Script installation / App installation |
| Serial number | Hardware serial (verify matches physical device) |
| UPN | Signing-in user who initiated OOBE |
| Deployment time | Total elapsed time or "In progress" |
| Error details | Any error message or code shown in the deployment record |

If the deployment status is **Failed**, note the Phase value -- this determines which logs are most relevant for investigation. See [APv2 Deployment Report Guide](08-apv2-deployment-report.md) for full status value interpretation.

### Step 2: Export BootstrapperAgent event log

The BootstrapperAgent event log is the primary APv2 investigation source. It captures provisioning state transitions, app installation requests, script execution attempts, timeout events, and enrollment failures.

First, build a standard filename prefix using the device serial number and date:

```powershell
$serial = (Get-CimInstance -ClassName Win32_BIOS).SerialNumber
$date = Get-Date -Format "yyyy-MM-dd"
$prefix = "$date`_$serial"
```

**Step 2a: Discover the exact registered log name on this device.** This discovery step makes the guide self-correcting in case the log name differs from the expected value:

```powershell
# Discover the exact registered log name on this device
wevtutil el | Where-Object { $_ -match "Bootstrapper|IntuneManagement" }
```

**Step 2b: Export the BootstrapperAgent event log** (replace log name if discovery returned a different name):

```powershell
# Export BootstrapperAgent event log
wevtutil epl "Microsoft-Windows-IntuneManagementExtension/BootstrapperAgent" "$prefix`_bootstrapper.evtx"
```

> **Note:** If the log name is not found, the IME may not be installed yet on this device. This is expected for failures that occur before Step 4 (IME installation) of the [APv2 deployment flow](../lifecycle-apv2/02-deployment-flow.md). Proceed to Step 3 for IME log collection.

### Step 3: Copy IME log folder

Path: `C:\ProgramData\Microsoft\IntuneManagementExtension\Logs` (Official, HIGH confidence).

Copy the three primary APv2 investigation logs:

```powershell
$src = "C:\ProgramData\Microsoft\IntuneManagementExtension\Logs"
$dest = "C:\Temp\APv2Diag"
New-Item -ItemType Directory -Path $dest -Force | Out-Null
Copy-Item "$src\IntuneManagementExtension.log" "$dest\$prefix`_ime-main.log"
Copy-Item "$src\AppWorkload.log" "$dest\$prefix`_appworkload.log"
Copy-Item "$src\AgentExecutor.log" "$dest\$prefix`_agentexecutor.log"
```

**What each log contains:**

| Log File | Primary Content |
|----------|----------------|
| IntuneManagementExtension.log | Main IME log: check-ins, policy requests, policy processing, reporting |
| AppWorkload.log | Win32 app deployment activities -- primary source for app failure investigation |
| AgentExecutor.log | PowerShell script execution tracking -- primary source for script failure investigation |

> **Note:** If the IME log folder does not exist, the IME has not installed on this device. This is expected for failures at Step 3 (Entra join / enrollment) or Step 4 (IME installation) of the deployment flow. In this case, the BootstrapperAgent event log (Step 2) and the Intune deployment report (Step 1) are the only available diagnostic sources.

### Step 4: Collect Intune auto-diagnostics (if available)

Intune auto-collects diagnostics on APv2 deployment failure. Access via:

```
Intune admin center (https://intune.microsoft.com)
  > Devices
  > All devices
  > Select the device
  > Device diagnostics
```

Download the auto-collected diagnostics if available. These contain additional telemetry that may not be present in the on-device logs.

> **On-device export option:** The "Export logs" button displayed during a failed APv2 deployment saves logs to the first connected USB drive. Known issue: no success/failure feedback is displayed after pressing the button. Verify the USB drive contains exported files after pressing the button.

### Step 5: Artifact naming convention

Use a consistent naming pattern so that artifacts from multiple devices can be identified at a glance and shared with Microsoft support without renaming.

| Artifact | Filename Pattern |
|----------|-----------------|
| BootstrapperAgent event log | `YYYY-MM-DD_SerialNumber_bootstrapper.evtx` |
| IME main log | `YYYY-MM-DD_SerialNumber_ime-main.log` |
| AppWorkload log | `YYYY-MM-DD_SerialNumber_appworkload.log` |
| AgentExecutor log | `YYYY-MM-DD_SerialNumber_agentexecutor.log` |
| Deployment report export | `YYYY-MM-DD_SerialNumber_deployment-report.png` |

The `$prefix` variable defined in Step 2 generates the `YYYY-MM-DD_SerialNumber` portion automatically. For the deployment report screenshot, manually rename using the same prefix.

---

## Escalation Ceiling

No further L2 resolution available from log collection alone. Use the collected artifacts for investigation with the [APv2 Event ID Reference](07-apv2-event-ids.md) or [APv2 Deployment Report Guide](08-apv2-deployment-report.md). If investigation in those guides exhausts resolution options, escalate to Microsoft Premier Support with:

- BootstrapperAgent `.evtx` export
- IME logs (ime-main, appworkload, agentexecutor)
- Deployment report screenshot
- Device serial number
- Entra device ID
- Signing-in user UPN

---

## See Also

- [APv1 Log Collection Guide](01-log-collection.md) -- classic Autopilot log collection (MDMDiagnosticsTool, event log exports, registry snapshots)
- [APv2 Event ID Reference](07-apv2-event-ids.md) -- BootstrapperAgent event ID lookup for APv2 provisioning events
- [APv2 Deployment Report Guide](08-apv2-deployment-report.md) -- Intune deployment report interpretation with status tables and investigation paths
- [APv1 vs APv2](../apv1-vs-apv2.md) -- framework comparison and selection guidance

---

## Version History

| Date | Change |
|------|--------|
| 2026-04-12 | Initial version -- APv2 log collection with BootstrapperAgent export, IME log folder, Intune auto-diagnostics, MDMDiagnosticsTool exclusion statement |
