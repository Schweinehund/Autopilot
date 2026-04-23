---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: all
audience: L1
platform: all
---

> **Version gate:** This index covers L1 runbooks for both Windows Autopilot (classic/APv1) and Autopilot Device Preparation (APv2).

# L1 Runbooks

Scripted procedures for the five highest-volume [Autopilot](../_glossary.md#autopilot) failure scenarios. Each runbook provides step-by-step instructions for Service Desk agents with no registry access, no PowerShell execution, and no log file analysis required. Start with the [Initial Triage Decision Tree](../decision-trees/00-initial-triage.md) to identify which runbook applies, or select directly from the list below.

## APv1 Runbooks

| # | Runbook | When to Use |
|---|---------|-------------|
| 1 | [Device Not Registered](01-device-not-registered.md) | Device serial number not found in the Autopilot portal |
| 2 | [ESP Stuck or Failed](02-esp-stuck-or-failed.md) | Enrollment Status Page is stuck, timed out, or showed an error code |
| 3 | [Profile Not Assigned](03-profile-not-assigned.md) | Device is registered but has no deployment profile or the wrong profile |
| 4 | [Network Connectivity Failure](04-network-connectivity.md) | Device cannot reach required Autopilot endpoints |
| 5 | [OOBE Fails Immediately](05-oobe-failure.md) | Device crashes, freezes, or fails before reaching ESP |

## APv2 Runbooks

Scripted procedures for APv2 Device Preparation failure scenarios. Each runbook provides portal-only instructions. Start with the [APv2 Triage Decision Tree](../decision-trees/04-apv2-triage.md) to identify which runbook applies.

| # | Runbook | When to Use |
|---|---------|-------------|
| 6 | [Deployment Not Launched](06-apv2-deployment-not-launched.md) | Device completed OOBE but Device Preparation screen never appeared |
| 7 | [Apps Not Installed](07-apv2-apps-not-installed.md) | Device Preparation completed but apps or scripts are missing or failed |
| 8 | [APv1 Registration Conflict](08-apv2-apv1-conflict.md) | ESP appeared instead of Device Preparation screen |
| 9 | [Deployment Timeout](09-apv2-deployment-timeout.md) | Device Preparation deployment timed out before completing |

## macOS ADE Runbooks

Scripted procedures for macOS ADE enrollment failure scenarios. Each runbook provides portal-only instructions using ABM and Intune admin center actions. Start with the [macOS ADE Triage Decision Tree](../decision-trees/06-macos-triage.md) to identify which runbook applies.

| # | Runbook | When to Use |
|---|---------|-------------|
| 10 | [Device Not Appearing in Intune](10-macos-device-not-appearing.md) | macOS device serial number not found in Intune after ADE enrollment |
| 11 | [Setup Assistant Stuck or Failed](11-macos-setup-assistant-failed.md) | Setup Assistant authentication failure, Await Configuration stuck, or network connectivity issue |
| 12 | [Configuration Profile Not Applied](12-macos-profile-not-applied.md) | Expected configuration (Wi-Fi, VPN, FileVault, restrictions) missing after enrollment |
| 13 | [App Not Installed](13-macos-app-not-installed.md) | DMG, PKG, or VPP app not installed or showing failed status |
| 14 | [Compliance Failure / Access Blocked](14-macos-compliance-access-blocked.md) | Device non-compliant or user cannot access Microsoft 365 resources |
| 15 | [Company Portal Sign-In Failure](15-macos-company-portal-sign-in.md) | Company Portal not available, sign-in failing, or Entra registration incomplete |

## iOS L1 Runbooks

L1 runbooks for the six most common iOS/iPadOS enrollment and compliance failure scenarios. Start with the [iOS Triage Decision Tree](../decision-trees/07-ios-triage.md) to identify the failure, then follow the matching runbook below. All runbooks include L1-executable steps and explicit escalation triggers to L2.

| Runbook | Scenario | Primary Cause |
|---------|----------|---------------|
| [16: iOS APNs Certificate Expired](16-ios-apns-expired.md) | Device Not Appearing (cross-platform blast radius) | APNs certificate lapsed — impacts ALL iOS/iPadOS MDM communication |
| [17: iOS ADE Not Starting](17-ios-ade-not-starting.md) | ADE Setup Assistant not completing enrollment | ABM token sync failure, profile assignment, or device not in ABM |
| [18: iOS Enrollment Restriction Blocking](18-ios-enrollment-restriction-blocking.md) | Device blocked at enrollment restriction | Platform/ownership/count restriction in Intune |
| [19: iOS License Invalid](19-ios-license-invalid.md) | "User license invalid" at enrollment | User lacks Intune license OR ABM license sync issue |
| [20: iOS Device Cap Reached](20-ios-device-cap-reached.md) | Device enrollment blocked at cap | User hit per-user or per-group device cap in Intune |
| [21: iOS Compliance Blocked](21-ios-compliance-blocked.md) | Compliance / Conditional Access blocking user | Multi-cause A/B/C — OS version, jailbreak, passcode, CA timing |

> **MAM-WE Note:** iOS MAM without Enrollment (app protection policy failures, selective wipe failures, PIN loop, app protection not applying) is deferred to the **ADDTS-01** future milestone. No L1 runbook exists. For the MAM-WE configuration guide, see [MAM-WE App Protection Policies](../admin-setup-ios/09-mam-app-protection.md).

## Android L1 Runbooks

L1 runbooks for the six most common Android Enterprise enrollment and compliance failure scenarios. Start with the [Android Triage Decision Tree](../decision-trees/08-android-triage.md) to identify the failure mode, then follow the matching runbook below. All runbooks include L1-executable portal-only steps and explicit escalation triggers to L2.

| Runbook | Scenario | Applies To |
|---------|----------|------------|
| [22: Android Enrollment Blocked](22-android-enrollment-blocked.md) | Enrollment restriction / "device cannot enroll" error | All GMS modes |
| [23: Android Work Profile Not Created](23-android-work-profile-not-created.md) | Work profile container never created after BYOD enrollment | BYOD only |
| [24: Android Device Not Enrolled](24-android-device-not-enrolled.md) | Device never appeared in Intune (no restriction error) | All GMS modes |
| [25: Android Compliance Blocked](25-android-compliance-blocked.md) | Non-compliant / Conditional Access blocking M365 access | All GMS modes |
| [26: Android MGP App Not Installed](26-android-mgp-app-not-installed.md) | Managed Google Play app not delivered to device | All GMS modes |
| [27: Android ZTE Enrollment Failed](27-android-zte-enrollment-failed.md) | Zero-Touch Enrollment did not initiate or stalled | ZTE only |

> **AOSP Note:** No L1 runbook exists for AOSP (specialty hardware) failures — escalate to L2. AOSP L1 coverage is planned for v1.4.1. See [Android Triage](../decision-trees/08-android-triage.md) node ANDE1 for the escalation data checklist.

## Scope

This index covers L1 runbooks for APv1 (classic Autopilot), APv2 (Device Preparation), macOS ADE, and iOS/iPadOS deployments. For scenarios not covered here, or when a runbook's escalation criteria are met, escalate to L2 with the data collection checklist provided in each runbook.

## TPM Attestation Note

> **Note:** There is no L1 runbook for TPM attestation failures. TPM issues that are not resolved by enabling TPM in BIOS require L2 investigation. See [L2 Runbooks](../l2-runbooks/00-index.md).

## Related Resources

- [Initial Triage Decision Tree](../decision-trees/00-initial-triage.md) — Start here to identify the failure scenario
- [APv2 Triage Decision Tree](../decision-trees/04-apv2-triage.md) -- APv2 failure routing
- [macOS ADE Triage Decision Tree](../decision-trees/06-macos-triage.md) -- macOS failure routing
- [iOS Triage Decision Tree](../decision-trees/07-ios-triage.md) -- iOS/iPadOS failure routing
- [ESP Failure Decision Tree](../decision-trees/01-esp-failure.md) — Detailed ESP triage flowchart
- [Profile Assignment Decision Tree](../decision-trees/02-profile-assignment.md) — Profile assignment triage flowchart
- [Master Error Code Index](../error-codes/00-index.md) — Look up any error code
- [Autopilot Glossary](../_glossary.md) — Term definitions

---

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-23 | Added Android L1 Runbooks section (runbooks 22-27) | -- |
| 2026-04-17 | Added iOS L1 runbook section (runbooks 16-21) | -- |
| 2026-04-14 | Added macOS ADE runbook section | -- |
| 2026-04-13 | Added APv2 runbook section (restored after accidental revert) | -- |
| 2026-03-20 | Initial version | — |
