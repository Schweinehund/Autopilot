---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: admin
platform: Windows
---

> **Version gate:** This guide covers Win32 app packaging for both APv1 and APv2 deployments. For ESP configuration settings and the blocking app list, see [ESP Policy Configuration](../admin-setup-apv1/03-esp-policy.md).

# Win32 App Packaging Best Practices for ESP Reliability

The most common cause of ESP timeouts and hung provisioning is poorly packaged Win32 apps — wrong detection rules, missing dependency declarations, or mixed app types. This guide documents the detection rule priority order, ESP tracking requirements, dependency chain configuration, and anti-patterns that cause ESP failures.

## Prerequisites

- Intune Administrator role
- Win32 Content Prep Tool (`IntuneWinAppUtil.exe`) for creating `.intunewin` packages
- App installer (MSI, EXE, or script) and supporting files

## Detection Rule Priority Order

Choose the most deterministic detection method available. Work down this list until one applies.

### 1. MSI Product Code (Most Reliable)

**Use when:** App is distributed as an MSI installer.

Intune auto-detects the MSI product code during `.intunewin` upload — look for it in the install command field after upload. If the product code is pre-populated, use it as-is.

**How to configure:** Detection rules > Rule type = MSI. Product code is auto-filled.

> **What breaks if misconfigured:** Wrong MSI product code = app detected as "not installed" even after successful install. ESP waits indefinitely for a detection that never succeeds, then times out. The app install succeeded but Intune cannot confirm it.

### 2. File Version Check

**Use when:** App is a non-MSI installer that writes a versioned executable.

Specify: exact file path (e.g., `C:\Program Files\MyApp\myapp.exe`), version number, and comparison operator. Always use `>=` (greater than or equal to) rather than `=` (equals) so future updates don't break detection.

**How to configure:** Detection rules > Rule type = File. Enter path, file or folder, detection method = Version, operator = Greater than or equal to, version string.

> **What breaks if misconfigured:** Using "file exists" instead of "version >=" means any old version of the app passes detection. When the app is updated in-place, ESP considers the old version as "installed" and skips the update. Use version checks for apps that update in-place.

### 3. Registry Key or Value

**Use when:** No reliable file path exists. Use the uninstall registry key written by the installer.

**Where to look:** `HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\` (64-bit apps) or `HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\` (32-bit apps on 64-bit Windows).

**How to configure:** Detection rules > Rule type = Registry. Enter key path, value name, detection method = Key exists or Value exists.

> **What breaks if misconfigured:** 32-bit apps installed on 64-bit Windows write registry entries to the `WOW6432Node` path, not the standard `Uninstall` path. Specifying `HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\` for a 32-bit app = detection fails on 64-bit Windows. The app installs but Intune never detects it as installed.

### 4. PowerShell Custom Script (Last Resort)

**Use when:** No MSI product code, no reliable file path, no registry key. Rare.

Script must exit with code `0` to indicate detection (app is installed) and exit code `1` to indicate not detected.

**Performance note:** Each PowerShell detection script adds 5-15 seconds to the detection cycle. Multiply by number of tracked apps — large app catalogs with PowerShell detection add significant time to ESP.

> **What breaks if misconfigured:** Script exits with non-zero code unexpectedly (e.g., a command not found on a specific Windows version). Intune treats non-zero exit as "not installed." App re-installs on every sync check, causing repeated ESP invocations and potential conflicts with running processes.

## ESP Tracking Requirements

ESP only tracks apps with specific assignment types. Assignment type determines whether the app blocks desktop access.

| Assignment Type | Group Type | ESP Phase | Blocks Desktop |
|-----------------|------------|-----------|----------------|
| Required | Device group | Device phase | Yes |
| Required | User group | User phase | Yes |
| Available | Any | Not tracked | No — never blocks ESP |

**"Selected" mode:** Up to 100 apps can be added to the ESP blocking list. Recommended for large app catalogs.

**"All" mode:** Every Required app assignment blocks desktop access. Use with caution — any new Required assignment immediately becomes a blocker.

> **What breaks if misconfigured:** App assigned as "Available" instead of "Required" = app is never tracked by ESP, never blocks desktop. Users reach desktop before the app installs. If the app is a dependency for user workflows, users see missing apps immediately after login.

## Install Order and Dependencies

Win32 apps support dependency declarations in Intune. Use them to enforce install order.

### Declaring Dependencies

1. Navigate to **Intune admin center** > **Apps** > **Windows** > select the dependent app (App B).
2. Select **Dependencies** > **Add**.
3. Add App A. Set **Auto install** to **Yes** (installs App A automatically before App B).

### Dependency Chain Behavior

- App A declared as dependency of App B → Intune Management Extension (IME) installs App A before App B, automatically.
- Dependencies are processed before the main app, regardless of assignment order in Intune.
- Maximum dependency depth: 10 levels.

### Circular Dependency Detection

Intune does not detect circular dependencies at configuration time. A circular dependency (App A requires App B, App B requires App A) fails silently — neither app installs.

**How to diagnose:** Check IME logs for conflict errors:
```
C:\ProgramData\Microsoft\IntuneManagementExtension\Logs\IntuneManagementExtension.log
```

Search for: `Circular dependency detected` or `dependency failed`.

> **What breaks if sequenced incorrectly:** App B depends on App A's runtime (e.g., .NET Framework). If App A is not declared as a dependency, install order is non-deterministic. Intune may install App B first — App B fails at launch because its runtime is missing. ESP retries App B, which fails again. ESP eventually times out waiting for App B to succeed.

## Anti-Pattern Warning

> [!WARNING]
> **Do NOT mix Win32 (.intunewin) and LOB (MSI) as Required in the same ESP deployment.** The TrustedInstaller service cannot handle both installer types simultaneously — ESP hangs at app installation with IME logs showing "Another installation is in progress." Convert all apps to Win32 format, or use APv2 which supports mixed app types. See [ESP Policy Configuration](../admin-setup-apv1/03-esp-policy.md) for details.

> [!WARNING]
> **Microsoft 365 Apps as MSI + Win32 apps simultaneously** causes the same TrustedInstaller hang. Deploy Microsoft 365 Apps as Win32 type, not MSI. See [ESP Policy Configuration](../admin-setup-apv1/03-esp-policy.md).

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|-----------------|---------|---------|
| Wrong MSI product code in detection rule | App installs successfully but ESP waits indefinitely; timeout | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |
| "File exists" detection instead of version check | Old app version passes detection; updates silently skip | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |
| 32-bit app using 64-bit registry path | Detection fails; app re-installs every sync | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |
| PowerShell script exits non-zero unexpectedly | App re-installs on every sync; repeated ESP failures | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |
| App assigned as Available instead of Required | App not tracked by ESP; users reach desktop before app installs | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |
| Missing dependency declaration | Non-deterministic install order; dependent app fails | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |
| LOB (MSI) + Win32 apps mixed as Required | ESP hangs at app installation; TrustedInstaller conflict | [ESP Stuck or Failed](../l1-runbooks/02-esp-stuck-or-failed.md) |

## See Also

- [ESP Policy Configuration](../admin-setup-apv1/03-esp-policy.md) — ESP settings, blocking app list, app type compatibility
- [ESP Timeout Tuning](esp-timeout-tuning.md) — Scenario-based timeout recommendations
- [ESP Lifecycle Stage](../lifecycle/04-esp.md)
