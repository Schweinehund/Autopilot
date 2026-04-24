---
last_verified: 2026-04-23
review_by: 2026-06-22
applies_to: all
audience: L2
platform: Android
---

> **Platform gate:** This guide covers Android Enterprise L2 investigation via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L2 Runbooks](00-index.md#ios-l2-runbooks).

# Android Log Collection Guide

## Context

This guide is the prerequisite for all Android L2 investigation runbooks (19 Enrollment Investigation, 20 App Install Investigation, 21 Compliance Investigation). Before starting any investigation, select a log collection method by enrollment mode using the Decision Matrix and Method Selection block below, then collect the diagnostic package. Follow the routing links in "Related Resources" to the specific investigation runbook.

Android L2 diagnostic data is split across three methods. Unlike macOS (where `IntuneMacODC.sh` produces a single comprehensive zip) or Windows (where `mdmdiagnosticstool.exe` produces a single comprehensive archive), Android has no single-archive equivalent — each method yields different data types on different trust boundaries. The enrollment mode determines which tool is the primary collection method.

**From L1 escalation?** Proceed to the Decision Matrix and Method Selection block to pick a method; your L1 runbook (22 / 23 / 24 / 25 / 26 / 27) will have directed you here as a prerequisite for the linked L2 investigation runbook.

## Tool Landscape

> **Tool landscape:** There is **no single Intune admin center per-device Download Diagnostics bundle for Android** (contrast with Phase 31 iOS MDM diagnostic report and Phase 24 macOS IntuneMacODC). Android diagnostic data is fragmented across three methods — Company Portal logs, Microsoft Intune app logs, and adb logcat — each yielding different data scope on different trust boundaries. The decision matrix below selects the method by enrollment mode first, data-scope need second.

## Decision Matrix

Pick a method by enrollment mode first, then by data scope need. The **Primary Tool (by mode)** column reflects post-AMAPI April 2025 reality: Microsoft Intune app is primary for BYOD post-AMAPI tenants and for all device-owner-mode devices; Company Portal remains primary for BYOD pre-AMAPI legacy tenants.

| Method | Primary Tool (by mode) | Who Triggers | Data Scope | L2 Access Path | Physical Requirements | Confidence | Typical Latency |
|--------|------------------------|--------------|------------|----------------|----------------------|------------|-----------------|
| **Company Portal Logs** | BYOD pre-AMAPI: primary; BYOD post-AMAPI: secondary; COBO/Dedicated/ZTE: often not installed | End user via Settings > Help > Send logs (device-side) | MDM enrollment state, policy application, enrollment errors | Microsoft Support ticket with user-provided incident ID | Intune-enrolled device + Company Portal app installed | [HIGH, last_verified 2026-04-23] | Hours to days (ticket roundtrip) |
| **Microsoft Intune App Logs** | BYOD post-AMAPI: primary (AMAPI April 2025); COBO/Dedicated/ZTE: primary for device-owner-mode policy state | End user via Microsoft Intune app > Help > Send logs | Post-AMAPI enrollment, work profile container state, app protection enforcement | Microsoft Support ticket OR (on some builds) self-service retrieval | Microsoft Intune app installed (post-April 2025 BYOD primary app) | [HIGH, last_verified 2026-04-23] | Minutes (self-service) to hours (ticket) |
| **adb logcat** | All modes — last-resort USB-privileged tier | L2 investigator with physical device | Full Android system log + DPC interaction trace | Direct (developer machine) | USB cable + Android Debug Bridge installed + USB debugging enabled on device | [MEDIUM, last_verified 2026-04-23] (device-owner-mode policy may disable USB debugging; see Section 3 D-04 callout) | Seconds (live stream) |

## Method Selection by Enrollment Mode

Android's tool landscape is mode-heterogeneous (deviation from iOS Phase 31 D-01 friction-ordered flow). Use this lookup to pick the primary method for the L1-reported mode before reading Section 1/2/3:

- **BYOD Work Profile (pre-AMAPI tenants, still on custom OMA-URI policies)** — primary: Company Portal logs (Section 1); fallback: adb logcat (Section 3) if Company Portal itself is failing to initialize. Note: Microsoft Intune for Android custom OMA-URI profile support was removed in April 2025 (AMAPI migration). Tenants still on pre-AMAPI policy configurations are converging to post-AMAPI.
- **BYOD Work Profile (post-AMAPI — April 2025 onward)** — primary: Microsoft Intune app logs (Section 2); the Microsoft Intune app replaces Company Portal as the BYOD management app per AMAPI migration. Company Portal may remain installed as a secondary app.
- **Fully Managed (COBO)** — primary: Microsoft Intune app logs (Section 2). Company Portal may not be installed at all on device-owner-mode devices. Fallback: adb logcat (Section 3) subject to the device-owner USB-debug constraint (see D-04 callout).
- **Dedicated (COSU)** — primary: Microsoft Intune app logs (Section 2) where present; single/multi-app kiosk devices often lock down to Managed Home Screen only. Fallback: adb logcat (Section 3) subject to device-owner USB-debug constraint.
- **Zero-Touch Enrollment (ZTE)** — primary: Microsoft Intune app logs (Section 2); ZTE deploys as COBO device-owner-mode, so tool availability mirrors COBO. Fallback: adb logcat (Section 3).
- **AOSP** — out of Phase 41 scope (AEAOSP-01 v1.4.1 deferral). AOSP L2 investigation not available in v1.4.

After selecting a method, proceed to the matching Section below.

## Section 1: Company Portal Logs

Company Portal logs are the primary collection method for BYOD Work Profile devices on pre-AMAPI tenants. For post-AMAPI BYOD tenants (April 2025 onward), see Section 2 — Microsoft Intune app is now the primary management app and primary log source.

### Who Triggers

The end user triggers log collection from the device. There is no admin-side per-device log download for Android Company Portal logs in the Intune admin center.

### Collection Steps (Device-Side)

1. Open **Company Portal** on the Android device.
2. Tap **Settings** (gear icon or menu) > **Help** > **Send Logs** (exact label may vary slightly by Company Portal version; verify UI at `review_by` cadence).
3. An upload begins. When complete, Company Portal displays an **incident ID**.
4. **Save the incident ID.** This is the unique reference L2 and Microsoft Support use to locate the uploaded bundle. Without it, the upload cannot be matched to this device.
5. Optionally tap **Email logs** to compose a support message containing the incident ID in the body.

> **Verbose logging preflight:** Before reproducing a failure, enable verbose logging if the option is available: **Company Portal > Settings > Logging level > Verbose**. Reproducing the failure with verbose logging active captures more diagnostic context.

### L2 Retrieval (Ticket-Based)

> **Data egress:** Android Company Portal log uploads are routed to Microsoft support infrastructure and are NOT directly downloadable from the Intune admin center. An L2 engineer with the incident ID MUST open a Microsoft Intune Support ticket and provide the incident ID — Microsoft Support retrieves and returns the logs (or analysis) on the L2's behalf. Typical roundtrip: hours to 1-2 business days. This is the signal to use Section 2 (self-service path) or Section 3 (direct USB path) when time is critical.

### What the Logs Contain

- MDM enrollment state and error events during work profile creation
- Policy application errors and configuration push state (pre-AMAPI policy format)
- Work profile provisioning trace — container creation, user interaction events
- Company Portal application events (sign-in, compliance check results)

### Post-AMAPI Tenant Note

Per Phase 37 AMAPI migration, Microsoft Intune for Android replaced Company Portal as the BYOD management app for post-April 2025 tenants. Custom OMA-URI policies were removed at the same time. Post-AMAPI tenants should treat **Microsoft Intune app logs (Section 2)** as the BYOD primary collection method. Company Portal may remain installed on the device in a secondary capacity.

Cross-reference: [BYOD Work Profile Admin Setup](../admin-setup-android/04-byod-work-profile.md) for enrollment mode configuration context. Do NOT duplicate admin-setup content here — reference it.

## Section 2: Microsoft Intune App Logs

Microsoft Intune app logs are the primary collection method for BYOD post-AMAPI tenants (April 2025 onward) and the primary method for all device-owner-mode devices (COBO, Dedicated COSU, ZTE) where Company Portal may not be installed.

### Who Triggers

The end user triggers log collection from the device via the Microsoft Intune app. Some builds support a self-service retrieval path from the device UI; most require a Microsoft Support ticket with the user-provided incident ID.

### Collection Steps (Device-Side)

1. Open the **Microsoft Intune** app on the Android device.
2. Tap **Help** (or the menu icon) > **Send logs** (exact label may vary by app version; verify UI at `review_by` cadence).
3. An upload begins. When complete, the app displays an **incident ID**.
4. **Save the incident ID** — required for Microsoft Support ticket retrieval.
5. If self-service retrieval is available on this build, the app presents a download or share option for the bundle directly.

> **AMAPI April 2025 callout:** Per Phase 37 AMAPI migration, Microsoft Intune for Android replaced Company Portal as the BYOD management app. Custom OMA-URI policies were removed. Post-AMAPI tenants should treat Microsoft Intune app logs as the BYOD primary collection method. For device-owner-mode devices (COBO/Dedicated/ZTE), the Microsoft Intune app is the primary DPC agent and the primary log source whether or not Company Portal is installed.

### L2 Retrieval Variance

Retrieval path varies by Intune app version and tenant configuration:

- **Self-service (some builds):** App presents an incident ID plus a download or share option — L2 can receive the bundle directly from the user without opening a Microsoft Support ticket.
- **Ticket-based (most builds):** L2 opens a Microsoft Intune Support ticket with the user-provided incident ID. Microsoft Support retrieves the logs. Typical roundtrip: hours to 1-2 business days.

If time is critical and the device supports adb access (USB debugging not disabled by policy), fall back to Section 3 for immediate log retrieval.

### What the Logs Contain

- Post-AMAPI enrollment state and DPC provisioning events
- Work profile container creation and user interaction trace (BYOD post-AMAPI)
- Device-owner policy application state (COBO/Dedicated/ZTE)
- App protection enforcement events and Conditional Access evaluation state
- Microsoft Intune app agent events and check-in logs

Cross-reference: [Fully Managed COBO Admin Setup](../admin-setup-android/03-fully-managed-cobo.md), [Dedicated Devices Admin Setup](../admin-setup-android/05-dedicated-devices.md) for device-owner-mode configuration context.

## Section 3: adb logcat

Use adb logcat when Company Portal logs (Section 1) and Microsoft Intune app logs (Section 2) are insufficient or when immediate on-device log access is needed without a Microsoft Support ticket roundtrip. This is the USB-privileged last-resort tier.

> **Device-owner-mode constraint:** On fully-managed (COBO), dedicated (COSU), and ZTE-enrolled devices, Android Enterprise device owner policy may disable USB debugging per [Phase 38 AEDED Android Enterprise device restrictions](../admin-setup-android/05-dedicated-devices.md) and equivalent Phase 36 COBO policy. If USB debugging is unavailable, adb logcat tier is unreachable — escalate to Microsoft Support for remote log retrieval via Company Portal or Microsoft Intune app upload path. [MEDIUM, last_verified 2026-04-23]

> **Source confidence:** Commands in this section are sourced from Android Developer documentation and community troubleshooting guides; Microsoft Learn does not comprehensively document adb for Intune-managed Android. Section-level default confidence is **MEDIUM** unless overridden per-command. Verify command availability against current Android Developer docs at `review_by` cadence.

L2 engineers should validate adb command output against current Android Developer documentation for the target device's Android version before relying on any output for Microsoft Support escalation packets.

### Prerequisites

- Android device to investigate with USB debugging enabled (Settings > Developer options > USB debugging).
- Android Debug Bridge (adb) installed on the L2 investigator's workstation (`platform-tools` from Android developer site).
- USB cable connecting device to workstation.
- Device prompts "Allow USB debugging?" — tap **Always allow from this computer** and confirm.

### 3.1 adb logcat `[HIGH, last_verified 2026-04-23]`

Primary command — captures the live Android system log with filter tags relevant to Intune-managed Android:

```bash
adb logcat -s DevicePolicyManager:* WorkProfileManager:* IntuneManagedAgent:*
```

Per-tag filter examples (`[MEDIUM, last_verified 2026-04-23]` — tags verified against AOSP documentation but tag visibility on OEM-customized ROMs varies):

- `DevicePolicyManager:*` — device owner / profile owner policy events
- `WorkProfileManager:*` — work profile lifecycle events
- `IntuneManagedAgent:*` — Intune management agent events (tag name verified post-AMAPI; may vary on older builds — use broader filter if no output)

To capture a time-bounded window around failure reproduction:

```bash
adb logcat -s DevicePolicyManager:* WorkProfileManager:* IntuneManagedAgent:* > intune-logcat.txt
```

Press Ctrl+C after reproducing the failure. Share `intune-logcat.txt` as the escalation artifact.

### 3.2 adb shell dumpsys device_policy `[MEDIUM, last_verified 2026-04-23]`

Dumps current device policy state. Output format shifts across Android 12/13/14/15 — re-verify field names at `review_by` cadence or when encountering unfamiliar field layouts:

```bash
adb shell dumpsys device_policy | head -100
```

Key fields to examine: `mDeviceOwner`, `mProfileOwner`, `passwordQuality`, `lockTaskPackages`, `policyData` block. Field names and nesting depth vary across Android OS versions — treat output as MEDIUM confidence guidance only.

### 3.3 adb shell pm list packages `[HIGH, last_verified 2026-04-23]`

Universal Android command. Verify Intune/MGP app presence:

```bash
adb shell pm list packages -f | grep -E "com\.microsoft\.(intune|windowsintune|companyportal)"
adb shell pm list packages | grep com.google.android.apps.work
```

Use `-f` to include APK paths (useful for confirming work-profile container boundary — personal profile apps vs work profile apps appear at different `/data/user/0/` vs `/data/user/10/` paths on GMS devices).

> **Not in Phase 41 scope:** `adb bugreport` (PII-laden; requires Microsoft Support coordination outside L2 scope), `adb shell am broadcast` / `adb shell pm grant-permissions` (state-mutating; violates diagnostic/remediation boundary per Phase 24 macOS D-10 precedent), `adb shell getprop ro.build.*` (wildcard glob portability; deferred).

## Common Artifacts Cross-Reference

Use this table to see which investigation runbook consumes each artifact — it is both a collection map and a routing hint.

| Artifact | Collection Method | Used by |
|----------|-------------------|---------|
| Company Portal logs (pre-AMAPI BYOD) + Intune app logs (post-AMAPI / device-owner-mode) | Section 1 / Section 2 | [19-android-enrollment-investigation.md](19-android-enrollment-investigation.md) Pattern A/B/C/D/E, [20-android-app-install-investigation.md](20-android-app-install-investigation.md), [21-android-compliance-investigation.md](21-android-compliance-investigation.md) |
| Microsoft Intune app self-service log upload (post-AMAPI) | Section 2 | Microsoft Support escalation packets (runbooks 19/20/21 Resolution sections) |
| adb logcat trace (DPC state) | Section 3 | [19-android-enrollment-investigation.md](19-android-enrollment-investigation.md) Pattern A/B/D, [21-android-compliance-investigation.md](21-android-compliance-investigation.md) Cause C |

## Related Resources

- [L2 Runbook Index](00-index.md#android-l2-runbooks) — Android L2 runbook set
- [Android Enrollment Investigation (runbook 19)](19-android-enrollment-investigation.md)
- [Android App Install Investigation (runbook 20)](20-android-app-install-investigation.md)
- [Android Compliance Investigation (runbook 21)](21-android-compliance-investigation.md)
- [Android L1 Runbook Index](../l1-runbooks/00-index.md#android-l1-runbooks) — L1 escalation sources

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-23 | Initial version — Android L2 log collection guide (mode-first tiering, 3 method sections, per-assertion adb confidence markers, USB-debug device-owner-mode callout) | -- |
