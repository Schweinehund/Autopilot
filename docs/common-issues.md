---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: both
audience: all
platform: all
---

> **Platform coverage:** This guide covers Windows Autopilot (classic/APv1 and Device Preparation/APv2), macOS ADE, and iOS/iPadOS provisioning issues.
> Not sure which platform or framework? See [APv1 vs APv2](apv1-vs-apv2.md) for Windows or [Windows vs macOS](windows-vs-macos.md) for cross-platform.

# Common Provisioning Issues

## Choose Your Platform

- [Windows Autopilot Issues](#windows-autopilot-issues) -- Windows device provisioning failures (APv1 and APv2)
- [macOS ADE Failure Scenarios](#macos-ade-failure-scenarios) -- macOS enrollment and management failures
- [iOS/iPadOS Failure Scenarios](#iosipados-failure-scenarios) -- iOS/iPadOS enrollment and management failures via Intune

---

## Windows Autopilot Issues

> **macOS:** For macOS ADE troubleshooting, see [macOS ADE Failure Scenarios](#macos-ade-failure-scenarios).

> **Not sure which framework?** If you don't know whether the device is using APv1 (classic) or APv2 (Device Preparation), see [APv1 vs APv2](apv1-vs-apv2.md) to identify the framework before selecting a runbook.

Symptom-based index routing to the appropriate L1 and L2 runbooks.

**Framework:** APv1 (classic)

### Device Registration Issues

> **macOS:** For macOS device not appearing in Intune, see [macOS: Device Not Appearing](#device-not-appearing-in-intune).
> **iOS:** For iOS enrollment failures, see [iOS: Device Not Appearing in Intune](#ios-device-not-appearing-in-intune).

Device serial number not appearing in the [Autopilot](_glossary.md#autopilot) portal after [OOBE](_glossary.md#oobe).

- **L1:** [Device Not Registered](l1-runbooks/01-device-not-registered.md)
- **L2:** [L2 Runbook Index](l2-runbooks/00-index.md) — select runbook based on escalation checklist

### Enrollment Status Page (ESP) Failures

[ESP](_glossary.md#esp) stuck, timed out, or displaying "Something went wrong" error.

- **L1:** [ESP Stuck or Failed](l1-runbooks/02-esp-stuck-or-failed.md)
- **L2:** [ESP Deep-Dive](l2-runbooks/02-esp-deep-dive.md)

### Profile Assignment Issues

> **macOS:** For macOS configuration profile issues, see [macOS: Profile Not Applied](#configuration-profile-not-applied).
> **iOS:** For iOS configuration and restriction issues, see [iOS: Enrollment Blocked by Configuration](#ios-enrollment-blocked-by-configuration).

Device goes through manual setup instead of Autopilot, or wrong profile assigned.

- **L1:** [Profile Not Assigned](l1-runbooks/03-profile-not-assigned.md)
- **L2:** [L2 Runbook Index](l2-runbooks/00-index.md) — L2 selects runbook based on symptom

### TPM Attestation Failures

TPM attestation fails during pre-provisioning or self-deploying mode.

- **L1:** [L1 Runbook Index](l1-runbooks/00-index.md#tpm-attestation-note) — no L1 runbook; escalate to L2
- **L2:** [TPM Attestation Investigation](l2-runbooks/03-tpm-attestation.md)

### Network Connectivity Issues

> **macOS:** macOS ADE has different endpoint requirements. See [macOS ADE Failure Scenarios](#macos-ade-failure-scenarios) for macOS-specific network issues.

Device cannot reach required Autopilot endpoints; timeouts during enrollment.

- **L1:** [Network Connectivity Failure](l1-runbooks/04-network-connectivity.md)
- **Escalation:** Infrastructure/Network team (not L2 Desktop Engineering)

### Policy Conflicts

Reboot loops, autologon failures, or ESP hangs caused by conflicting policies.

- **L1:** [ESP Stuck or Failed](l1-runbooks/02-esp-stuck-or-failed.md) — policy conflicts manifest as ESP failures at L1
- **L2:** [Policy Conflict Analysis](l2-runbooks/05-policy-conflicts.md)

### Hybrid Join Failures

Device not appearing in both on-premises AD and Azure AD after Autopilot provisioning.

- **L1:** [L1 Runbook Index](l1-runbooks/00-index.md) — escalate to L2 with domain details
- **L2:** [Hybrid Join Investigation](l2-runbooks/04-hybrid-join.md)

### Device Renamed but Old Name Persists

Old device name shows in Intune or Azure AD after Autopilot rename.

> **Tip:** This is typically a sync delay — allow up to 24 hours for the name to propagate through Azure AD Connect and Intune. If the naming template in the Autopilot profile is correct and 24 hours have passed, force a device sync from the Intune portal.

---

### APv2 Failure Scenarios

**Framework:** APv2 (Device Preparation)

#### Deployment Experience Never Launched

Device completed OOBE and reached the desktop, but the APv2 Device Preparation deployment experience never appeared.

- **L1:** [Deployment Not Launched](l1-runbooks/06-apv2-deployment-not-launched.md)
- **L2:** [APv2 Log Collection](l2-runbooks/06-apv2-log-collection.md) + [APv2 Deployment Report](l2-runbooks/08-apv2-deployment-report.md)

#### Apps or Scripts Not Installed

Device Preparation deployment completed but required apps or scripts are missing, failed to install, or were skipped.

- **L1:** [Apps Not Installed](l1-runbooks/07-apv2-apps-not-installed.md)
- **L2:** [APv2 Log Collection](l2-runbooks/06-apv2-log-collection.md) + [APv2 Event ID Reference](l2-runbooks/07-apv2-event-ids.md)

#### ESP Appeared Instead of Device Preparation

The Enrollment Status Page (ESP) appeared during OOBE instead of the APv2 Device Preparation experience, indicating an APv1 registration conflict.

- **L1:** [APv1 Registration Conflict](l1-runbooks/08-apv2-apv1-conflict.md)
- **L2:** [APv2 Log Collection](l2-runbooks/06-apv2-log-collection.md) + [APv2 Deployment Report](l2-runbooks/08-apv2-deployment-report.md)

#### Deployment Timed Out

Device Preparation deployment started but timed out before all apps and scripts completed installation.

- **L1:** [Deployment Timeout](l1-runbooks/09-apv2-deployment-timeout.md)
- **L2:** [APv2 Log Collection](l2-runbooks/06-apv2-log-collection.md) + [APv2 Event ID Reference](l2-runbooks/07-apv2-event-ids.md)

### Device Reset and Lifecycle Issues

Device won't reset, retire action failed, or re-provisioning not working as expected.

- **L1:** [Device Operations Overview](device-operations/00-overview.md) — find the correct procedure
- **Decision Tree:** [Device Lifecycle Decision Tree](decision-trees/05-device-lifecycle.md) — "What do you want to preserve?"
- **L2:** [Autopilot Reset Guide](device-operations/01-autopilot-reset.md) — local vs remote reset procedures

### Migration Issues

Problems during APv1-to-APv2 migration, imaging-to-Autopilot transition, or GPO-to-Intune policy migration.

- **Admin:** [APv1-to-APv2 Migration](reference/apv1-apv2-migration.md) — coexistence playbook
- **Admin:** [Imaging to Autopilot](reference/imaging-to-autopilot.md) — MDT/SCCM replacement
- **Admin:** [GPO to Intune](reference/gpo-to-intune.md) — Group Policy Analytics workflow

### Security and Enrollment Issues

> **macOS:** Conditional Access enrollment timing applies cross-platform. See [macOS: Compliance / Access Blocked](#compliance-failure-or-access-blocked) for macOS-specific guidance.
> **iOS:** For iOS Conditional Access and compliance timing issues, see [iOS: Compliance / Access Blocked](#ios-compliance--access-blocked).

Conditional Access blocking enrollment, compliance not evaluating, or security baseline conflicts.

- **Admin:** [CA Enrollment Timing](reference/ca-enrollment-timing.md) — the compliance chicken-and-egg problem
- **Admin:** [Compliance Policy Timing](reference/compliance-timing.md) — "Not evaluated" vs "Non-compliant"
- **Admin:** [Security Baseline Conflicts](reference/security-baseline-conflicts.md) — BitLocker, WDAC, reboot conflicts

## macOS ADE Failure Scenarios

> **Windows:** For Windows Autopilot issues, see [Windows Autopilot Issues](#windows-autopilot-issues).

**Platform:** macOS ADE (Automated Device Enrollment)

Symptom-based index routing to the appropriate macOS L1 and L2 runbooks. Start with the [macOS ADE Triage Decision Tree](decision-trees/06-macos-triage.md) to identify the failure scenario.

> **iOS:** For iOS/iPadOS device not appearing, see [iOS: Device Not Appearing in Intune](#ios-device-not-appearing-in-intune).

### Device Not Appearing in Intune

Mac serial number not found in Intune admin center after ADE enrollment attempt.

- **L1:** [Device Not Appearing](l1-runbooks/10-macos-device-not-appearing.md)
- **L2:** [macOS Log Collection](l2-runbooks/10-macos-log-collection.md) + case-by-case investigation

### Setup Assistant Stuck or Failed

Setup Assistant authentication failure, Await Configuration stuck, or network connectivity issue during enrollment.

- **L1:** [Setup Assistant Failed](l1-runbooks/11-macos-setup-assistant-failed.md)
- **L2:** [macOS Log Collection](l2-runbooks/10-macos-log-collection.md) + [Profile Delivery Investigation](l2-runbooks/11-macos-profile-delivery.md)

> **iOS:** For iOS configuration / restriction application issues, see [iOS: Enrollment Blocked by Configuration](#ios-enrollment-blocked-by-configuration).

### Configuration Profile Not Applied

Expected configuration (Wi-Fi, VPN, FileVault, restrictions) missing after enrollment.

- **L1:** [Profile Not Applied](l1-runbooks/12-macos-profile-not-applied.md)
- **L2:** [Profile Delivery Investigation](l2-runbooks/11-macos-profile-delivery.md)

### App Not Installed

DMG, PKG, or VPP app not installed or showing failed status after enrollment.

- **L1:** [App Not Installed](l1-runbooks/13-macos-app-not-installed.md)
- **L2:** [App Install Failure Diagnosis](l2-runbooks/12-macos-app-install.md)

> **iOS:** For iOS compliance / Conditional Access blocking, see [iOS: Compliance / Access Blocked](#ios-compliance--access-blocked).

### Compliance Failure or Access Blocked

Device non-compliant in Intune or user cannot access Microsoft 365 resources despite enrollment.

- **L1:** [Compliance / Access Blocked](l1-runbooks/14-macos-compliance-access-blocked.md)
- **L2:** [Compliance Evaluation Investigation](l2-runbooks/13-macos-compliance.md)

### Company Portal Sign-In Failure

Company Portal not available, sign-in failing, or Entra registration incomplete.

- **L1:** [Company Portal Sign-In](l1-runbooks/15-macos-company-portal-sign-in.md)
- **L2:** [Compliance Evaluation Investigation](l2-runbooks/13-macos-compliance.md) (for Entra registration issues)

## iOS/iPadOS Failure Scenarios

> **Windows:** For Windows Autopilot issues, see [Windows Autopilot Issues](#windows-autopilot-issues).
> **macOS:** For macOS ADE troubleshooting, see [macOS ADE Failure Scenarios](#macos-ade-failure-scenarios).

**Platform:** iOS/iPadOS through Microsoft Intune

Symptom-based index routing to the appropriate iOS L1 and L2 runbooks. Start with the [iOS Triage Decision Tree](decision-trees/07-ios-triage.md) to identify the failure scenario.

### iOS: Device Not Appearing in Intune

iOS/iPadOS device not visible in Intune admin center after enrollment attempt. Could be caused by: APNs certificate expired (cross-platform blast radius), ADE enrollment not starting, user license invalid, or device enrollment cap reached. Start with the triage decision tree to disambiguate.

- **L1:** [APNs Certificate Expired](l1-runbooks/16-ios-apns-expired.md) | [ADE Not Starting](l1-runbooks/17-ios-ade-not-starting.md) | [License Invalid](l1-runbooks/19-ios-license-invalid.md)
- **L2:** [iOS Log Collection](l2-runbooks/14-ios-log-collection.md) + [ADE Token & Profile Investigation](l2-runbooks/15-ios-ade-token-profile.md)

### iOS: ADE Setup Assistant Not Completing

ADE-enrolled device stuck in Setup Assistant, authentication failure, or Await Configuration / DDM status hang during enrollment.

- **L1:** [ADE Not Starting](l1-runbooks/17-ios-ade-not-starting.md)
- **L2:** [iOS Log Collection](l2-runbooks/14-ios-log-collection.md) + [ADE Token & Profile Investigation](l2-runbooks/15-ios-ade-token-profile.md)

### iOS: Enrollment Blocked by Configuration

Device enrollment halted by an Intune enrollment restriction (platform, ownership, count) or configuration profile conflict before the device appears as enrolled.

- **L1:** [Enrollment Restriction Blocking](l1-runbooks/18-ios-enrollment-restriction-blocking.md) | [Device Cap Reached](l1-runbooks/20-ios-device-cap-reached.md) (reciprocal disambiguation — see both if cause unclear)
- **L2:** [iOS Log Collection](l2-runbooks/14-ios-log-collection.md)

### iOS: User License Not Present

Enrollment fails or blocks with "user license invalid" — user lacks an Intune license OR an ABM license sync discrepancy.

- **L1:** [License Invalid](l1-runbooks/19-ios-license-invalid.md)
- **L2:** [iOS Log Collection](l2-runbooks/14-ios-log-collection.md)

### iOS: Device Enrollment Cap Reached

User's per-user or per-group device cap in Intune blocks enrollment of an additional iOS/iPadOS device.

- **L1:** [Device Cap Reached](l1-runbooks/20-ios-device-cap-reached.md)
- **L2:** (none — cap adjustments are admin-center actions)

### iOS: Compliance / Access Blocked

Device shows compliant in Intune but Conditional Access still blocks Microsoft 365 resources, OR device is non-compliant for reasons unclear to the user (OS version, jailbreak, passcode, or CA timing window).

- **L1:** [Compliance Blocked](l1-runbooks/21-ios-compliance-blocked.md)
- **L2:** [Compliance & CA Timing Investigation](l2-runbooks/17-ios-compliance-ca-timing.md)

### iOS: App Protection Policies Not Applying (MAM-WE)

> **Advisory:** MAM-WE-specific L1/L2 runbooks are deferred to the **ADDTS-01** future milestone. No L1 runbook exists. For the MAM-WE configuration guide, see [MAM-WE App Protection Policies](admin-setup-ios/09-mam-app-protection.md). For the MAM-WE glossary entry, see [MAM-WE in Apple Provisioning Glossary](_glossary-macos.md#mam-we).

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-17 | Phase 32: added iOS/iPadOS Failure Scenarios section (6 symptom categories with ios- anchor prefix + MAM-WE advisory), platform selector entry, bidirectional iOS cross-reference banners; updated platform coverage blockquote | -- |
| 2026-04-15 | Added macOS ADE Failure Scenarios section, platform selector, cross-reference banners; updated title and frontmatter for cross-platform coverage | -- |
| 2026-04-13 | Added Device Reset, Migration, and Security routing sections for Phase 21 content | — |
| 2026-04-13 | Added APv2 Failure Scenarios section with framework labels | — |
| 2026-03-23 | Transformed from inline troubleshooting guide to navigation index | — |
