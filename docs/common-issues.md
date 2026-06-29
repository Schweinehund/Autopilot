---
last_verified: 2026-06-29
review_by: 2026-09-29
applies_to: both
audience: all
platform: all
---

> **Platform coverage:** This guide covers Windows Autopilot (classic/APv1 and Device Preparation/APv2), macOS ADE, iOS/iPadOS, and Android Enterprise provisioning issues.
> Not sure which platform or framework? See [APv1 vs APv2](apv1-vs-apv2.md) for Windows or [Windows vs macOS](windows-vs-macos.md) for cross-platform.

# Common Provisioning Issues

## Choose Your Platform

- [Windows Autopilot Issues](#windows-autopilot-issues) -- Windows device provisioning failures (APv1 and APv2)
- [macOS ADE Failure Scenarios](#macos-ade-failure-scenarios) -- macOS enrollment and management failures
- [iOS/iPadOS Failure Scenarios](#iosipados-failure-scenarios) -- iOS/iPadOS enrollment and management failures via Intune
- [Android Enterprise Failure Scenarios](#android-enterprise-failure-scenarios) -- Android enrollment and management failures via Intune

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

### Platform SSO Sign-In Failure

Platform SSO "Registration Required" notification never appeared despite Intune reporting Succeeded, or Platform SSO sign-in is failing after registration.

- **L1:** [Platform SSO Sign-In Failure](l1-runbooks/35-macos-sso-sign-in-failure.md) — four root causes: old Company Portal, Error 10002 legacy conflict, mistyped registration token, dismissed notification
- **L2:** [Platform SSO Investigation](l2-runbooks/27-macos-sso-investigation.md)

### Kerberos SSO Extension Failure

Kerberos TGT not acquired, realm or KDC unreachable, or `usePlatformSSOTGT` PSSO-TGT integration failing.

- **L1:** No L1 runbook — escalate to L2
- **L2:** [Kerberos SSO Investigation](l2-runbooks/28-macos-kerberos-sso-investigation.md)

### MDM Migration Failure (Kandji/Iru → Intune)

Device stuck on a non-dismissible full-screen migration prompt at or after the ABM deadline, or migration completed but Intune shows the device as not enrolled, or configuration profiles are not delivered.

- **L1:** No L1 runbook — escalate to L2
- **L2:** [macOS MDM Migration Failure](l2-runbooks/30-macos-mdm-migration-failure.md)

### Platform SSO Re-Registration Failure (Post-Migration)

Platform SSO "Registration Required" notification has not appeared after MDM migration, or registration was initiated but is not completing. PSSO re-registration is always required after MDM migration — MDM unenrollment = IdP unregistration; the Secure Enclave key is re-created on re-enrollment.

- **L1:** No L1 runbook — escalate to L2
- **L2:** [macOS Platform SSO Investigation](l2-runbooks/27-macos-sso-investigation.md)
- **L2:** [macOS MDM Migration Failure](l2-runbooks/30-macos-mdm-migration-failure.md) — Track C: PSSO re-registration stuck

### macOS Local Password: User Locked Out

User cannot log in to their Mac — local password is unknown or forgotten. Recover access using the escrowed FileVault recovery key, the macOS LAPS managed admin account, or Apple ID (where org policy allows). Note: SSPR resets the Entra password only and does not reset the independent local password on Secure Enclave Platform SSO devices. For technical background, see [Platform SSO Setup Guide — Local password lifecycle and rotation](admin-setup-macos/07-platform-sso-setup.md#local-password-lifecycle-and-rotation).

- **L1:** [macOS Local Password Recovery](l1-runbooks/37-macos-local-password-reset.md)
- **L2:** [macOS Platform SSO Investigation](l2-runbooks/27-macos-sso-investigation.md) — if PSSO re-registration fails after recovering access

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

## Android Enterprise Failure Scenarios

> **Windows:** For Windows Autopilot issues, see [Windows Autopilot Issues](#windows-autopilot-issues).
> **macOS:** For macOS ADE troubleshooting, see [macOS ADE Failure Scenarios](#macos-ade-failure-scenarios).
> **iOS:** For iOS/iPadOS issues, see [iOS/iPadOS Failure Scenarios](#iosipados-failure-scenarios).

**Platform:** Android Enterprise through Microsoft Intune

> **Not sure which Android scenario?** Start with the [Android Triage Decision Tree](decision-trees/08-android-triage.md) — it disambiguates by enrollment mode (BYOD / COBO / Dedicated / ZTE / Knox / AOSP) and symptom in 2-3 steps.

### Android: Enrollment Blocked

Enrollment restriction or "device cannot enroll" error blocks Android Enterprise enrollment across all GMS modes (BYOD, COBO, Dedicated, ZTE). Could be caused by enrollment restriction (platform / ownership / count), Managed Google Play binding issue, or device cap. Start with the triage decision tree to disambiguate.

- **L1:** [Android Enrollment Blocked](l1-runbooks/22-android-enrollment-blocked.md)
- **L2:** [Android Log Collection Guide](l2-runbooks/18-android-log-collection.md) + [Android Enrollment Investigation](l2-runbooks/19-android-enrollment-investigation.md)

### Android: Work Profile Not Created

BYOD enrollment completed but the work profile container (briefcase badge) was never created on the device. Specific to BYOD mode (work profile is the BYOD-mode container model).

- **L1:** [Android Work Profile Not Created](l1-runbooks/23-android-work-profile-not-created.md)
- **L2:** [Android Log Collection Guide](l2-runbooks/18-android-log-collection.md) + [Android Enrollment Investigation](l2-runbooks/19-android-enrollment-investigation.md)

### Android: Device Not Enrolled

Device never appeared in Intune after enrollment attempt and there is no enrollment-restriction error visible to the user. Could overlap with Enrollment Blocked (silent restriction) or ZTE Enrollment Failed (Zero-Touch portal serial assignment problem).

- **L1:** [Device Not Enrolled](l1-runbooks/24-android-device-not-enrolled.md) | [Enrollment Blocked](l1-runbooks/22-android-enrollment-blocked.md) | [ZTE Enrollment Failed](l1-runbooks/27-android-zte-enrollment-failed.md) (reciprocal disambiguation — see all if no enrollment-restriction error visible)
- **L2:** [Android Log Collection Guide](l2-runbooks/18-android-log-collection.md) + [Android Enrollment Investigation](l2-runbooks/19-android-enrollment-investigation.md)

### Android: Compliance Blocked

> **iOS:** For iOS compliance and CA timing issues, see [iOS: Compliance / Access Blocked](#ios-compliance--access-blocked).
> **macOS:** For macOS compliance issues, see [macOS: Compliance / Access Blocked](#compliance-access-blocked) (where applicable).

Device shows non-compliant in Intune OR Conditional Access blocks Microsoft 365 access. Causes: Play Integrity verdict change (Android 13+ MEETS_STRONG_INTEGRITY enforcement; cross-platform jailbreak/integrity equivalence with iOS), OS version drift, passcode/encryption settings, or CA timing window.

- **L1:** [Android Compliance Blocked](l1-runbooks/25-android-compliance-blocked.md)
- **L2:** [Android Compliance Investigation](l2-runbooks/21-android-compliance-investigation.md)

### Android: MGP App Not Installed

Managed Google Play app assigned to user/device but never delivered. Applies to all GMS modes. Could be caused by MGP binding issue, app approval gap, app-config conflict, or per-mode delivery constraint.

- **L1:** [MGP App Not Installed](l1-runbooks/26-android-mgp-app-not-installed.md)
- **L2:** [Android App Install Investigation](l2-runbooks/20-android-app-install-investigation.md)

### Android: ZTE Enrollment Failed

Zero-Touch Enrollment did not initiate or stalled. Samsung KME (Knox Mobile Enrollment) provisioning often co-exists with ZTE — check both portals when triaging.

- **L1:** [ZTE Enrollment Failed](l1-runbooks/27-android-zte-enrollment-failed.md) | [Knox Enrollment Failed](l1-runbooks/28-android-knox-enrollment-failed.md) (reciprocal disambiguation — Samsung KME provisioning often co-exists with ZTE; check both portals)
- **L2:** [Android Enrollment Investigation](l2-runbooks/19-android-enrollment-investigation.md) + [Android Knox Investigation](l2-runbooks/22-android-knox-investigation.md)

### Android: Knox Enrollment Failed

Samsung KME provisioning failed: device booted to consumer setup, looped, or never arrived in Intune. Knox-only scope (Samsung-specific).

- **L1:** [Knox Enrollment Failed](l1-runbooks/28-android-knox-enrollment-failed.md)
- **L2:** [Android Knox Investigation](l2-runbooks/22-android-knox-investigation.md)

### Android: AOSP Enrollment Failed

AOSP enrollment did not initiate or stalled across the 5 supported OEMs (RealWear, Zebra, Pico, HTC VIVE Focus, Meta Quest). AOSP-only scope (no GMS / no MGP).

- **L1:** [AOSP Enrollment Failed](l1-runbooks/29-android-aosp-enrollment-failed.md)
- **L2:** [Android AOSP Investigation](l2-runbooks/23-android-aosp-investigation.md)

## Apple Business Governance Failure Scenarios

> **Apple Business:** For Apple Business permission errors and Shared iPad issues, use the runbooks below. For L1 quick reference, see [Apple Business Quick Reference](quick-ref-l1.md#apple-business-quick-reference).

### Shared iPad Passcode Reset

Shared iPad passcode locked or inaccessible.

- **L1:** [34: Apple Business Shared iPad Passcode Reset](l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md) — Path A (Apple Business UI); L1-delegatable
- **L2:** [26: Apple Business Permission Denied Investigation](l2-runbooks/26-apple-business-permission-denied.md) — Paths B/C or permission failures

### Apple Business Permission Denied

Apple Business portal returns permission error.

- **L1:** Route to L2 directly (no L1 self-service resolution for permission errors)
- **L2:** [26: Apple Business Permission Denied Investigation](l2-runbooks/26-apple-business-permission-denied.md) — 7-leaf Mermaid triage tree

### Managed Apple Account Provisioning Failure

Managed Apple Account not created, sync delayed, or federation state error.

- **L1:** Route to L2 directly (federation/SCIM state changes require L2 access)
- **L2:** [26: Apple Business Permission Denied Investigation](l2-runbooks/26-apple-business-permission-denied.md) — federation-state leaf routes to Managed Apple Account Runbook

### Cross-OU Boundary Violation

Sub-org admin action fails with permission error due to OU scope mismatch.

- **L1:** Route to L2 directly (OU-boundary investigation requires admin portal access)
- **L2:** [26: Apple Business Permission Denied Investigation](l2-runbooks/26-apple-business-permission-denied.md) — OU-boundary leaf routes to OUs Architecture + pool owner lookup

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-29 | Phase 99 (RUN-01): added macOS Local Password: User Locked Out H3 under macOS ADE Failure Scenarios, escalating to L1 #37 and L2 #27 | -- |
| 2026-06-24 | Phase 87 (REF-03): added Kerberos SSO Extension Failure entry under macOS ADE Failure Scenarios | -- |
| 2026-06-22 | Phase 81 (SSOREF-04): appended Platform SSO Sign-In Failure entry routing to L1 #35 / L2 #27 | -- |
| 2026-05-22 | Phase 65 plan 65-03: appended Apple Business Governance Failure Scenarios H2 (ABNAV-03; C16 edge common_issues → quick_ref_l1 live) | -- |
| 2026-04-30 | Phase 57: added Android Enterprise Failure Scenarios H2 (8 H3 symptom-routing sub-sections 1:1 to L1 runbooks 22-29 + section-top decision-tree banner + 2 reciprocal disambiguation callouts on Device Not Enrolled and ZTE Enrollment Failed + 1 cross-platform iOS+macOS reciprocal banner on Compliance Blocked); added Android entry to Choose Your Platform TOC; updated platform coverage blockquote (CLEAN-02; DEFER-07 close) | -- |
| 2026-04-17 | Phase 32: added iOS/iPadOS Failure Scenarios section (6 symptom categories with ios- anchor prefix + MAM-WE advisory), platform selector entry, bidirectional iOS cross-reference banners; updated platform coverage blockquote | -- |
| 2026-04-15 | Added macOS ADE Failure Scenarios section, platform selector, cross-reference banners; updated title and frontmatter for cross-platform coverage | -- |
| 2026-04-13 | Added Device Reset, Migration, and Security routing sections for Phase 21 content | — |
| 2026-04-13 | Added APv2 Failure Scenarios section with framework labels | — |
| 2026-03-23 | Transformed from inline troubleshooting guide to navigation index | — |
