---
last_verified: 2026-03-21
review_by: 2026-06-19
applies_to: APv1
audience: L2
---

> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

# L2 Log Collection Guide

## Context

This guide is the prerequisite for all L2 investigation runbooks. Before starting any [ESP](../_glossary.md#esp), [TPM attestation](../_glossary.md#tpm-attestation), hybrid join, or policy conflict investigation, collect a complete diagnostic package using the steps below.

The principle is **gather everything first, then investigate**. Collecting all artifacts upfront prevents having to return to the device mid-investigation when a log file is needed. The `.cab` file from `mdmdiagnosticstool.exe` is also the artifact Microsoft Premier Support requests for assisted troubleshooting.

All other L2 runbooks open with: "Before starting: collect a diagnostic package per [Log Collection Guide](01-log-collection.md)."

---

## Section 1: Diagnostic Package (mdmdiagnosticstool.exe)

Run this command first. It produces a `.cab` archive containing [MDM](../_glossary.md#mdm) logs, policy snapshots, and device state — the single most useful artifact for Autopilot investigations.

```powershell
mdmdiagnosticstool.exe -area Autopilot -cab -out C:\Temp\AutopilotDiag
```

The `-cab` flag produces a compressed archive file in addition to the folder output. The `.cab` file is the critical artifact for Microsoft Premier Support sharing — retain it even if you do not share the folder contents.

> **Note:** Run this command in an elevated PowerShell session. The output folder `C:\Temp\AutopilotDiag` will be created if it does not exist.

---

## Section 2: One-Command Alternative (Get-AutopilotLogs)

If the `AutopilotDiagnostics.psm1` module is available on the device, `Get-AutopilotLogs` collects all four event logs and the MDM diagnostics HTML report in a single command.

```powershell
$logPath = Get-AutopilotLogs -OutputPath "C:\Temp\AutopilotDiag\$env:COMPUTERNAME"
```

See [Get-AutopilotLogs](../reference/powershell-ref.md#get-autopilotlogs) for full parameter reference. When using this function, still run `mdmdiagnosticstool.exe -area Autopilot -cab` separately — the function produces an HTML diagnostic report and `.evtx` exports but does not produce the `.cab` file.

---

## Section 3: Event Viewer Exports

Export all four event logs manually when the PowerShell module is not available, or as a supplement to the cab file. These logs are the primary investigation sources for [OOBE](../_glossary.md#oobe) and [MDM enrollment](../_glossary.md#mdm-enrollment) failures.

First, build a standard filename prefix using the device serial number and date:

```powershell
$serial = (Get-WmiObject -Class Win32_BIOS).SerialNumber
$date = Get-Date -Format "yyyy-MM-dd"
$prefix = "$date`_$serial"
```

Then export each log:

```powershell
wevtutil epl "Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin" "$prefix`_mdm-admin.evtx"
wevtutil epl "Microsoft-Windows-Provisioning-Diagnostics-Provider/Admin" "$prefix`_provisioning.evtx"
wevtutil epl "Microsoft-Windows-AAD/Operational" "$prefix`_aad.evtx"
wevtutil epl "Microsoft-Windows-User Device Registration/Admin" "$prefix`_user-device-reg.evtx"
```

**What each log contains:**

| Event Log | Primary Content |
|-----------|----------------|
| `DeviceManagement-Enterprise-Diagnostics-Provider/Admin` | MDM enrollment events, policy application results, sync status |
| `Provisioning-Diagnostics-Provider/Admin` | OOBE and provisioning events, Autopilot profile application |
| `AAD/Operational` | Azure AD join events, token acquisition, device registration |
| `User Device Registration/Admin` | Device registration operations, workplace join, hybrid join events |

---

## Section 4: Registry Snapshot Export

Export the [ESP](../_glossary.md#esp) tracking registry key when the device is still in-flight during provisioning. This snapshot captures the real-time ESP state at the moment of failure.

```powershell
reg export "HKLM\SOFTWARE\Microsoft\Windows\Autopilot\EnrollmentStatusTracking" "$prefix`_esp-registry.reg" /y
```

> **When to use:** Take this snapshot on devices that are currently stuck on ESP, before any remediation or restart. For post-failure analysis on devices that have already rebooted, the `.cab` file from Section 1 contains registry state captured at diagnostic collection time.

See [registry-paths.md](../reference/registry-paths.md) for descriptions of the ESP tracking keys including `ExpectedPolicies` and `Sidecar` subkeys.

---

## Section 5: Artifact Naming Convention

Use a consistent naming pattern so that artifacts from multiple devices can be identified at a glance and shared with Microsoft support without renaming.

| Artifact | Filename Pattern |
|----------|-----------------|
| Diagnostic cab | `YYYY-MM-DD_SerialNumber_autopilot-diag.cab` |
| MDM Admin log | `YYYY-MM-DD_SerialNumber_mdm-admin.evtx` |
| Provisioning log | `YYYY-MM-DD_SerialNumber_provisioning.evtx` |
| AAD log | `YYYY-MM-DD_SerialNumber_aad.evtx` |
| User Device Registration | `YYYY-MM-DD_SerialNumber_user-device-reg.evtx` |
| ESP registry snapshot | `YYYY-MM-DD_SerialNumber_esp-registry.reg` |

The `$prefix` variable defined in Section 3 generates the `YYYY-MM-DD_SerialNumber` portion automatically. Apply it to the cab file by renaming after collection:

```powershell
# Rename the cab to follow naming convention
$cabSource = Get-ChildItem "C:\Temp\AutopilotDiag" -Filter "*.cab" | Select-Object -First 1
if ($cabSource) {
    Rename-Item $cabSource.FullName "$prefix`_autopilot-diag.cab"
}
```

---

## Tool References

- [Get-AutopilotLogs](../reference/powershell-ref.md#get-autopilotlogs) — one-command collection of MDM diagnostic report and four event log exports
- [Registry Paths](../reference/registry-paths.md) — ESP tracking keys (`EnrollmentStatusTracking`, `ExpectedPolicies`, `Sidecar`) and enrollment state paths
- [Network Endpoints](../reference/endpoints.md) — for connectivity verification if endpoints are unreachable during diagnostic collection
