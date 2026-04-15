---
last_verified: 2026-04-14
review_by: 2026-07-13
applies_to: ADE
audience: L2
platform: macOS
---

> **Platform gate:** This guide covers macOS ADE log collection via Intune. For Windows Autopilot, see [Windows Log Collection Guide](01-log-collection.md).

# macOS L2 Log Collection Guide

## Context

This guide is the prerequisite for all macOS L2 investigation runbooks. Before starting any profile delivery, app install, or compliance evaluation investigation, collect a complete diagnostic package using the steps below.

The principle is **gather everything first, then investigate**. Collecting all artifacts upfront prevents having to return to the device mid-investigation when a log file is needed. The IntuneMacODC zip is also the artifact Microsoft Support requests for assisted troubleshooting.

All other macOS L2 runbooks open with: "Before starting: collect a diagnostic package per [macOS Log Collection Guide](10-macos-log-collection.md)."

---

## Section 1: IntuneMacODC Comprehensive Collection

IntuneMacODC is a Microsoft-provided bash script — not a Windows tool adapted for Mac — that collects all Intune agent logs, system profiler output, installed profiles, process lists, and network configuration in a single zip archive. It is the macOS equivalent of `mdmdiagnosticstool.exe` for Windows Autopilot investigations.

Run this first. It produces a single `IntuneMacODC.zip` archive that covers the vast majority of investigation scenarios.

**Steps:**

1. Open Terminal on the macOS device (Applications > Utilities > Terminal, or Spotlight search "Terminal").

2. Download the diagnostic script:
   ```bash
   curl -L https://aka.ms/IntuneMacODC -o IntuneMacODC.sh
   ```

3. Make the script executable:
   ```bash
   chmod u+x ./IntuneMacODC.sh
   ```

4. Run with elevated privileges:
   ```bash
   sudo ./IntuneMacODC.sh
   ```

5. When prompted, enter the local administrator password.

6. Wait for collection to complete. Output: `IntuneMacODC.zip` in an `ODC/` subfolder, opened automatically in Finder.

7. Transfer the zip file to your investigation workstation.

**What IntuneMacODC collects:**

- Intune agent logs (`IntuneMDMDaemon*.log`, `IntuneMDMAgent*.log`)
- Company Portal logs
- System Profiler configuration profile dump
- `profiles show` output
- Network configuration
- Process list
- System log excerpts

> **Note:** For full command reference including parameters and expected output, see [macOS Terminal Commands Reference](../reference/macos-commands.md#intunemacODC).

---

## Section 2: Terminal-Based Targeted Collection

Use this section when IntuneMacODC cannot be downloaded (network restrictions, firewall blocking `aka.ms` — common on devices under investigation) or when you need to collect specific artifacts not included in IntuneMacODC.

### 2a. Enrollment status verification

```bash
profiles status -type enrollment
```

Expected output interpretation: `Enrolled via DEP: Yes` confirms ADE enrollment. `MDM enrollment: Yes (User Approved)` confirms MDM authority and user-approved management scope. If MDM enrollment shows `No` or is missing, the device lost its management relationship.

See [macOS Terminal Commands Reference — profiles status](../reference/macos-commands.md) for full parameter reference.

### 2b. Installed profiles dump

```bash
sudo profiles show
```

Lists all installed configuration profiles with full payload detail. Use this to verify whether expected profiles are present on the device.

```bash
system_profiler SPConfigurationProfileDataType
```

Outputs all installed profiles in plist format. Useful for programmatic parsing or when `profiles show` output is insufficient.

See [macOS Terminal Commands Reference — profiles show](../reference/macos-commands.md) and [macOS Terminal Commands Reference — system_profiler](../reference/macos-commands.md).

### 2c. MDM and profile event log query

Query the unified log for MDM profile delivery events in the last hour:

```bash
log show --predicate 'subsystem == "com.apple.ManagedClient"' --info --last 1h
```

For ADE and Setup Assistant enrollment events:

```bash
log show --predicate 'subsystem contains "cloudconfigurationd"' --info --last 30m
```

The unified log is the authoritative source for profile installation events, MDM command processing, and ADE enrollment stages on macOS 10.12 and later. It does not produce persistent log files — query it live or use IntuneMacODC which captures an excerpt automatically.

See [macOS Terminal Commands Reference — log show](../reference/macos-commands.md) for filter syntax and additional parameters.

### 2d. Intune agent process check

```bash
pgrep -il "^IntuneMdm"
```

Expected output: `IntuneMdmDaemon` and `IntuneMdmAgent` processes listed. If `IntuneMdmDaemon` is absent, the Intune management extension is not active — the device may have lost its MDM relationship or the management extension was removed.

See [macOS Terminal Commands Reference — pgrep](../reference/macos-commands.md) for expected process names and roles.

---

## Section 3: Log Paths by macOS Version

Use this table to locate the correct log paths for the device's operating system version. All paths are valid unless a version-specific note indicates otherwise.

| Log Path | macOS 13 (Ventura) | macOS 14 (Sonoma) | macOS 15 (Sequoia) | Notes |
|----------|--------------------|--------------------|--------------------|-------|
| `/Library/Logs/Microsoft/Intune/IntuneMDMDaemon*.log` | Yes | Yes | Yes | Primary Intune agent log; PKG/DMG installs, root-context shell scripts |
| `~/Library/Logs/Microsoft/Intune/IntuneMDMAgent*.log` | Yes | Yes | See note | May be absent on macOS 15 (known issue as of 2026-04); check system log instead |
| `/Library/Logs/Microsoft/Intune/CompanyPortal*.log` | Yes | Yes | Yes | Company Portal app enrollment and compliance events |
| `/Library/Managed Preferences/` | Yes | Yes | Yes | Configuration profile plist store written by mdmclient |
| Unified log: `com.apple.ManagedClient` | Yes | Yes | Yes | MDM command processing and profile installation events |
| Unified log: `cloudconfigurationd` | Yes | Yes | Yes | ADE and Setup Assistant enrollment events |

> **Important:** On macOS 15 (Sequoia), the `IntuneMDMAgent*.log` file may be absent. Use `log show --predicate 'subsystem == "com.apple.ManagedClient"'` as the primary investigation source for agent-level events on macOS 15 devices.

For the complete log path reference with configuration profile filesystem locations and log format notes, see [macOS Log Paths Reference](../reference/macos-log-paths.md).

---

## Related Resources

- [macOS Terminal Commands Reference](../reference/macos-commands.md) — Full command reference for all diagnostic commands
- [macOS Log Paths Reference](../reference/macos-log-paths.md) — Complete log path reference with macOS version annotations
- [macOS ADE Lifecycle](../macos-lifecycle/00-ade-lifecycle.md) — 7-stage ADE pipeline context
- [Windows Log Collection Guide](01-log-collection.md) — Windows Autopilot equivalent

---

## Version History

| Date | Change |
|------|--------|
| 2026-04-14 | Initial version — IntuneMacODC-first log collection with Terminal fallback, macOS version table, macOS 15 IntuneMDMAgent caveat |
