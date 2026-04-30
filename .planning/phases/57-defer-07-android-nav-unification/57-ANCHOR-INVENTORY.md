# Phase 57 Pre-Edit Anchor Inventory

**Captured:** 2026-04-30T14:21:15Z
**Pre-edit baseline HEAD:** 8ddf6824953227296f52d1a5f391b2f3e3603988
**Purpose:** PITFALL-6 + D-32 step 5 baseline for append-only contract verification across 4 hub files.
**Owner:** Plan 57-01 (per D-34 plan ordering — pre-edit MANDATORY before any docs/index.md edit).

This artifact captures the pre-edit anchor reference map for the 4 hub files Phase 57 modifies. After all Phase 57 plans land, a post-edit re-grep should produce zero NEW broken-anchor references vs this baseline (existing references still resolve; new references added by Phase 57 edits resolve by virtue of same-plan-series H2/H3 anchors being created in the sibling plans 57-02..57-06).

## index.md# references

```
docs/admin-setup-android/03-fully-managed-cobo.md:21:**Not covered:** MGP binding mechanics (see [01-managed-google-play.md#bind-mgp](01-managed-google-play.md#bind-mgp)); Zero-Touch portal mechanics (see [02-zero-touch-portal.md](02-zero-touch-portal.md)); corporate-scale ZTE including dual-SIM IMEI 1 (Phase 39); the canonical provisioning-method × mode matrix (see [02-provisioning-methods.md](../android-lifecycle/02-provisioning-methods.md)); full COPE admin path (deferred v1.4.1); Knox Mobile Enrollment (deferred v1.4.1); COBO-applicable Android L1 Runbooks — see [Android L1 Runbooks](../l1-runbooks/00-index.md#android-l1-runbooks): [22: Enrollment Blocked](../l1-runbooks/22-android-enrollment-blocked.md), [24: Device Not Enrolled](../l1-runbooks/24-android-device-not-enrolled.md), [25: Compliance Blocked](../l1-runbooks/25-android-compliance-blocked.md), [26: MGP App Not Installed](../l1-runbooks/26-android-mgp-app-not-installed.md); COBO L2 investigation (Phase 41).
docs/admin-setup-android/03-fully-managed-cobo.md:23:**How to use:** Intune administrators read linearly. L1 Service Desk uses the [Android L1 Runbooks](../l1-runbooks/00-index.md#android-l1-runbooks) (Phase 40, now shipped). L2 Desktop Engineering uses the [Android L2 investigation runbooks](../l2-runbooks/00-index.md#android-l2-runbooks).
docs/admin-setup-android/04-byod-work-profile.md:20:**How to use:** Intune administrators read linearly. End users enrolling personal devices should read [docs/end-user-guides/android-work-profile-setup.md](../end-user-guides/android-work-profile-setup.md). L1 Service Desk uses the [Android L1 Runbooks](../l1-runbooks/00-index.md#android-l1-runbooks) (Phase 40, now shipped): [22: Enrollment Blocked](../l1-runbooks/22-android-enrollment-blocked.md), [23: Work Profile Not Created](../l1-runbooks/23-android-work-profile-not-created.md), [24: Device Not Enrolled](../l1-runbooks/24-android-device-not-enrolled.md), [25: Compliance Blocked](../l1-runbooks/25-android-compliance-blocked.md), [26: MGP App Not Installed](../l1-runbooks/26-android-mgp-app-not-installed.md). L2 Desktop Engineering uses the [Android L2 investigation runbooks](../l2-runbooks/00-index.md#android-l2-runbooks).
docs/admin-setup-android/05-dedicated-devices.md:20:**How to use:** Intune administrators read linearly. L1 Service Desk uses the [Android L1 Runbooks](../l1-runbooks/00-index.md#android-l1-runbooks) (Phase 40, now shipped): [22: Enrollment Blocked](../l1-runbooks/22-android-enrollment-blocked.md), [24: Device Not Enrolled](../l1-runbooks/24-android-device-not-enrolled.md), [25: Compliance Blocked](../l1-runbooks/25-android-compliance-blocked.md), [26: MGP App Not Installed](../l1-runbooks/26-android-mgp-app-not-installed.md). Note: Runbook 23 (Work Profile Not Created) is BYOD-exclusive and does not apply to Dedicated devices. L2 Desktop Engineering uses the [Android L2 investigation runbooks](../l2-runbooks/00-index.md#android-l2-runbooks). LOB Operations Owners read [Audience and stakeholders](#audience-and-stakeholders) for the persona-specific responsibilities.
docs/admin-setup-android/08-cope-full-admin.md:22:**How to use:** Intune administrators read linearly. L1 Service Desk uses the [Android L1 Runbooks](../l1-runbooks/00-index.md#android-l1-runbooks). L2 Desktop Engineering uses the [Android L2 investigation runbooks](../l2-runbooks/00-index.md#android-l2-runbooks).
docs/admin-setup-ios/07-device-enrollment.md:243:Full triage trees for each symptom live in the [iOS Triage Decision Tree](../decision-trees/07-ios-triage.md) and are executed via the [iOS L1 Runbooks 16-21](../l1-runbooks/00-index.md#ios-l1-runbooks).
docs/admin-setup-macos/06-config-failures.md:81:- [macOS L1 Runbooks](../l1-runbooks/00-index.md#macos-ade-runbooks)
docs/common-issues.md:63:- **L1:** [L1 Runbook Index](l1-runbooks/00-index.md#tpm-attestation-note) — no L1 runbook; escalate to L2
docs/decision-trees/07-ios-triage.md:94:- [iOS L2 Runbooks](../l2-runbooks/00-index.md#ios-l2-runbooks) -- L2 investigation (log collection + 3 investigation runbooks)
docs/decision-trees/08-android-triage.md:125:- [Android L1 Runbooks Index](../l1-runbooks/00-index.md#android-l1-runbooks) — All 6 Android L1 runbooks (22-27)
docs/decision-trees/09-linux-triage.md:86:- [Linux L1 Runbooks Index](../l1-runbooks/00-index.md#linux-l1-runbooks) — All 4 Linux L1 runbooks (30-33)
docs/index.md:106:| [macOS L1 Runbooks](l1-runbooks/00-index.md#macos-ade-runbooks) | Scripted procedures for top macOS ADE enrollment failures (6 runbooks: device, Setup Assistant, profiles, apps, compliance, Company Portal) |
docs/index.md:118:| [macOS L2 Runbooks](l2-runbooks/00-index.md#macos-ade-runbooks) | Investigation guides for profile delivery, app install, and compliance evaluation failures |
docs/index.md:141:| [iOS L1 Runbooks](l1-runbooks/00-index.md#ios-l1-runbooks) | Scripted procedures for the top iOS failure scenarios (6 runbooks: APNs expired, ADE not starting, enrollment restriction, license invalid, device cap, compliance blocked) |
docs/index.md:151:| [iOS L2 Runbooks](l2-runbooks/00-index.md#ios-l2-runbooks) | Investigation guides for ADE token/profile delivery, app install failures, and compliance/CA timing |
docs/index.md:187:| [Migration Guides](reference/00-index.md#migration-guides) | APv1-to-APv2, Imaging-to-Autopilot, GPO-to-Intune migration playbooks |
docs/index.md:188:| [Monitoring and Operations](reference/00-index.md#monitoring-and-operations) | Deployment reporting, drift detection, new-batch device onboarding workflow |
docs/l1-runbooks/06-apv2-deployment-not-launched.md:70:**L2 escalation path:** [APv2 L2 Runbooks](../l2-runbooks/00-index.md#apv2-autopilot-device-preparation-runbooks)
docs/l1-runbooks/07-apv2-apps-not-installed.md:69:**L2 escalation path:** [APv2 L2 Runbooks](../l2-runbooks/00-index.md#apv2-autopilot-device-preparation-runbooks)
docs/l1-runbooks/08-apv2-apv1-conflict.md:52:**L2 escalation path:** [APv2 L2 Runbooks](../l2-runbooks/00-index.md#apv2-autopilot-device-preparation-runbooks)
docs/l1-runbooks/09-apv2-deployment-timeout.md:61:**L2 escalation path:** [APv2 L2 Runbooks](../l2-runbooks/00-index.md#apv2-autopilot-device-preparation-runbooks)
docs/l1-runbooks/10-macos-device-not-appearing.md:9:> **Platform gate:** This guide covers macOS ADE troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks).
docs/l1-runbooks/11-macos-setup-assistant-failed.md:9:> **Platform gate:** This guide covers macOS ADE troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks).
docs/l1-runbooks/12-macos-profile-not-applied.md:9:> **Platform gate:** This guide covers macOS ADE troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks).
docs/l1-runbooks/13-macos-app-not-installed.md:9:> **Platform gate:** This guide covers macOS ADE troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks).
docs/l1-runbooks/14-macos-compliance-access-blocked.md:9:> **Platform gate:** This guide covers macOS ADE troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks).
docs/l1-runbooks/15-macos-company-portal-sign-in.md:9:> **Platform gate:** This guide covers macOS ADE troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks).
docs/l1-runbooks/16-ios-apns-expired.md:9:> **Platform gate:** This guide covers iOS/iPadOS troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).
docs/l1-runbooks/17-ios-ade-not-starting.md:9:> **Platform gate:** This guide covers iOS/iPadOS troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).
docs/l1-runbooks/18-ios-enrollment-restriction-blocking.md:10:> **Platform gate:** This guide covers iOS/iPadOS troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).
docs/l1-runbooks/19-ios-license-invalid.md:9:> **Platform gate:** This guide covers iOS/iPadOS troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).
docs/l1-runbooks/20-ios-device-cap-reached.md:10:> **Platform gate:** This guide covers iOS/iPadOS troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).
docs/l1-runbooks/21-ios-compliance-blocked.md:9:> **Platform gate:** This guide covers iOS/iPadOS troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).
docs/l1-runbooks/22-android-enrollment-blocked.md:9:> **Platform gate:** This guide covers Android enrollment/compliance troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks).
docs/l1-runbooks/23-android-work-profile-not-created.md:9:> **Platform gate:** This guide covers Android enrollment/compliance troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks).
docs/l1-runbooks/24-android-device-not-enrolled.md:9:> **Platform gate:** This guide covers Android enrollment/compliance troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks).
docs/l1-runbooks/25-android-compliance-blocked.md:9:> **Platform gate:** This guide covers Android enrollment/compliance troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks).
docs/l1-runbooks/25-android-compliance-blocked.md:240:Escalate to L2 (or to the Intune admin directly if not already done). See [Android Compliance Investigation](../l2-runbooks/21-android-compliance-investigation.md) — L1 Cause A maps to RB21 Cause A, Cause B→B, Cause C→C, Cause D→D. Use the [L2 Runbook Index](../l2-runbooks/00-index.md#android-l2-runbooks) for routing.
docs/l1-runbooks/26-android-mgp-app-not-installed.md:9:> **Platform gate:** This guide covers Android enrollment/compliance troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks).
docs/l1-runbooks/27-android-zte-enrollment-failed.md:9:> **Platform gate:** This guide covers Android enrollment/compliance troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks).
docs/l1-runbooks/28-android-knox-enrollment-failed.md:9:> **Platform gate:** This guide covers Android enrollment/compliance troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks).
docs/l1-runbooks/29-android-aosp-enrollment-failed.md:9:> **Platform gate:** This guide covers Android enrollment/compliance troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks).
docs/l1-runbooks/30-linux-enrollment-failed.md:9:> **Platform gate:** This guide covers Linux Intune client troubleshooting (Ubuntu 22.04/24.04 LTS). For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks). For Android, see [Android L1 Runbooks](00-index.md#android-l1-runbooks).
docs/l1-runbooks/31-linux-compliance-non-compliant.md:9:> **Platform gate:** This guide covers Linux Intune client troubleshooting (Ubuntu 22.04/24.04 LTS). For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks). For Android, see [Android L1 Runbooks](00-index.md#android-l1-runbooks).
docs/l1-runbooks/32-linux-ca-blocking-web-access.md:9:> **Platform gate:** This guide covers Linux Intune client troubleshooting (Ubuntu 22.04/24.04 LTS). For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks). For Android, see [Android L1 Runbooks](00-index.md#android-l1-runbooks).
docs/l1-runbooks/33-linux-agent-service-failure.md:9:> **Platform gate:** This guide covers Linux Intune client troubleshooting (Ubuntu 22.04/24.04 LTS). For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks). For Android, see [Android L1 Runbooks](00-index.md#android-l1-runbooks).
docs/l2-runbooks/14-ios-log-collection.md:9:> **Platform gate:** This guide covers iOS/iPadOS L2 investigation via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).
docs/l2-runbooks/14-ios-log-collection.md:168:| MAM App Protection diagnostics zip | Tier 1b | MAM advisory (see [00-index.md#mam-we-investigation-advisory](00-index.md#mam-we-investigation-advisory)) — out of Phase 31 scope |
docs/l2-runbooks/14-ios-log-collection.md:177:- [iOS L2 Runbooks index](00-index.md#ios-l2-runbooks) — hub with L1 escalation mapping and MAM advisory.
docs/l2-runbooks/15-ios-ade-token-profile.md:9:> **Platform gate:** This guide covers iOS/iPadOS L2 investigation via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).
docs/l2-runbooks/16-ios-app-install.md:9:> **Platform gate:** This guide covers iOS/iPadOS L2 investigation via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).
docs/l2-runbooks/16-ios-app-install.md:31:> **MAM-WE scope:** MAM-WE app protection policy failures (selective wipe failures, PIN loop, app protection not applying) are **out of Phase 31 scope** — see [MAM-WE Investigation Advisory](00-index.md#mam-we-investigation-advisory) for deferred ADDTS-01 milestone routing.
docs/l2-runbooks/16-ios-app-install.md:168:- [MAM-WE Investigation Advisory](00-index.md#mam-we-investigation-advisory) — deferred ADDTS-01 scope for MAM-WE app protection failures
docs/l2-runbooks/17-ios-compliance-ca-timing.md:9:> **Platform gate:** This guide covers iOS/iPadOS L2 investigation via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).
docs/l2-runbooks/18-android-log-collection.md:9:> **Platform gate:** This guide covers Android Enterprise L2 investigation via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L2 Runbooks](00-index.md#ios-l2-runbooks).
docs/l2-runbooks/18-android-log-collection.md:194:- [L2 Runbook Index](00-index.md#android-l2-runbooks) — Android L2 runbook set
docs/l2-runbooks/18-android-log-collection.md:198:- [Android L1 Runbook Index](../l1-runbooks/00-index.md#android-l1-runbooks) — L1 escalation sources
docs/l2-runbooks/19-android-enrollment-investigation.md:9:> **Platform gate:** This guide covers Android Enterprise L2 investigation via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L2 Runbooks](00-index.md#ios-l2-runbooks).
docs/l2-runbooks/19-android-enrollment-investigation.md:293:- [L2 Runbook Index](00-index.md#android-l2-runbooks)
docs/l2-runbooks/20-android-app-install-investigation.md:9:> **Platform gate:** This guide covers Android Enterprise L2 investigation via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L2 Runbooks](00-index.md#ios-l2-runbooks).
docs/l2-runbooks/20-android-app-install-investigation.md:29:> **MAM-WE scope:** MAM-WE app protection policy failures (selective wipe not applying, PIN loop, conditional launch blocks) are out of Phase 41 scope — see [Android MAM-WE Investigation Advisory](00-index.md#android-mam-we-investigation-advisory) for deferred ADDTS-ANDROID-01 milestone routing.
docs/l2-runbooks/20-android-app-install-investigation.md:152:> **Note:** True MAM-WE (MAM without enrollment) app protection failures — selective wipe, PIN loop, protection not applying at all — are out of Phase 41 scope. See [Android MAM-WE Investigation Advisory](00-index.md#android-mam-we-investigation-advisory).
docs/l2-runbooks/20-android-app-install-investigation.md:179:- [L2 Runbook Index](00-index.md#android-l2-runbooks) — all Android L2 runbooks and L1 escalation mapping
docs/l2-runbooks/21-android-compliance-investigation.md:208:- [L2 Runbook Index](00-index.md#android-l2-runbooks) — routing table for all Android L2 runbooks
docs/l2-runbooks/22-android-knox-investigation.md:9:> **Platform gate:** This guide covers Android Enterprise L2 investigation via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L2 Runbooks](00-index.md#ios-l2-runbooks).
docs/l2-runbooks/22-android-knox-investigation.md:293:- [L2 Runbook Index](00-index.md#android-l2-runbooks)
docs/l2-runbooks/23-android-aosp-investigation.md:9:> **Platform gate:** This guide covers Android Enterprise L2 investigation via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L2 Runbooks](00-index.md#ios-l2-runbooks).
docs/l2-runbooks/23-android-aosp-investigation.md:321:- [L2 Runbook Index](00-index.md#android-l2-runbooks)
docs/l2-runbooks/24-linux-log-collection.md:9:> **Platform gate:** This guide covers Linux Intune client (`intune-portal`) L2 investigation via Microsoft Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L2 Runbooks](00-index.md#ios-l2-runbooks). For Android Enterprise, see [Android L2 Runbooks](00-index.md#android-l2-runbooks).
docs/l2-runbooks/24-linux-log-collection.md:196:- [L2 Runbook Index — Linux L2 Runbooks](00-index.md#linux-l2-runbooks) — Linux L2 runbook set
docs/l2-runbooks/25-linux-agent-investigation.md:9:> **Platform gate:** This guide covers Linux Intune client (`intune-portal`) L2 investigation via Microsoft Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L2 Runbooks](00-index.md#ios-l2-runbooks). For Android Enterprise, see [Android L2 Runbooks](00-index.md#android-l2-runbooks).
docs/l2-runbooks/25-linux-agent-investigation.md:330:- [L2 Runbook Index — Linux L2 Runbooks](00-index.md#linux-l2-runbooks) — Linux L2 runbook set
```

Note: most `index.md#` matches above resolve to `l1-runbooks/00-index.md`, `l2-runbooks/00-index.md`, or `reference/00-index.md` — NOT `docs/index.md` itself. Pattern intentionally broad per CONTEXT D-32 step 5 to capture all `index.md#` anchor refs in `docs/`. The two `docs/index.md`-fragment-target rows (lines 187-188 to `reference/00-index.md`) and the four cross-table H3 anchors (#macos-ade-runbooks / #ios-l1-runbooks / #ios-l2-runbooks / #migration-guides / #monitoring-and-operations) all resolve to existing anchors — no breakage expected from Phase 57 edits since none of those line ranges are in Edit Zone A/B/C.

## common-issues.md# references

```
(empty — no `common-issues.md#` cross-references found in `docs/`. Confirmed via `grep -rn "common-issues.md#" docs/`.)
```

Implication: Phase 57 H3 anchors authored in plan 57-02 (`#android-enterprise-failure-scenarios` + 8 `#android-*` H3 anchors) are NEW additions; no existing references will be impacted by their introduction.

## quick-ref-l1.md# references

```
docs/index.md:107:| [L1 Quick-Reference Card](quick-ref-l1.md#macos-ade-quick-reference) | One-page cheat sheet -- macOS top checks, escalation triggers, and runbook links |
docs/index.md:142:| [L1 Quick-Reference Card](quick-ref-l1.md#iosipados-quick-reference) | One-page cheat sheet -- iOS top checks, escalation triggers, decision tree, and runbook links |
```

Implication: Both existing `quick-ref-l1.md` anchor references (`#macos-ade-quick-reference` and `#iosipados-quick-reference`) are at lines 107 and 142, OUTSIDE Phase 57 Edit Zone A (lines 167-171). These existing anchors must remain unchanged in plan 57-03; V-57-25 enforces. Phase 57 plan 57-01 adds NEW reference `quick-ref-l1.md#android-enterprise-quick-reference` which resolves to the H2 plan 57-03 will create in the same Phase 57 plan series.

## quick-ref-l2.md# references

```
docs/index.md:119:| [L2 Quick-Reference Card](quick-ref-l2.md#macos-ade-quick-reference) | One-page cheat sheet -- macOS Terminal commands, log paths, and key diagnostic checks |
docs/index.md:152:| [L2 Quick-Reference Card](quick-ref-l2.md#iosipados-quick-reference) | One-page cheat sheet -- iOS diagnostic data collection methods, Intune portal paths, and sysdiagnose triggers |
```

Implication: Both existing `quick-ref-l2.md` anchor references (`#macos-ade-quick-reference` and `#iosipados-quick-reference`) are at lines 119 and 152, OUTSIDE Phase 57 Edit Zone A (lines 167-171). Phase 57 plan 57-01 adds NEW reference `quick-ref-l2.md#android-enterprise-quick-reference` which resolves to the H2 plan 57-04 will create in the same Phase 57 plan series.

## iOS H2 Anchor Stability Baseline (V-57-25 NEGATIVE regression-guard)

Per RESEARCH §3, the 4 iOS H2 literals locked at Phase 32 close (2026-04-17). Verified at pre-edit baseline HEAD `8ddf6824953227296f52d1a5f391b2f3e3603988`:

| File | Line | Literal H2 | GFM-derived Anchor |
|------|------|-----------|---------------------|
| docs/index.md | 131 | `## iOS/iPadOS Provisioning` | `#iosipados-provisioning` |
| docs/common-issues.md | 212 | `## iOS/iPadOS Failure Scenarios` | `#iosipados-failure-scenarios` |
| docs/quick-ref-l1.md | 117 | `## iOS/iPadOS Quick Reference` | `#iosipados-quick-reference` |
| docs/quick-ref-l2.md | 182 | `## iOS/iPadOS Quick Reference` | `#iosipados-quick-reference` |

Post-Phase-57 expectation: all 4 literals UNCHANGED; V-57-25 enforces.

Verification command (re-run post-edit, expect identical output):
```
grep -n "^## iOS/iPadOS" docs/index.md docs/common-issues.md docs/quick-ref-l1.md docs/quick-ref-l2.md
```

## Summary Counts

| Pattern | Match Count | Notes |
|---------|-------------|-------|
| `index.md#` in `docs/` | 60+ matches | Most resolve to L1/L2/reference index files (sibling), not docs/index.md root |
| `common-issues.md#` in `docs/` | 0 matches | No existing refs; Phase 57 plan 57-02 adds NEW H3 anchors |
| `quick-ref-l1.md#` in `docs/` | 2 matches | Both at docs/index.md (macOS + iOS); Android ref to be ADDED in plan 57-01 |
| `quick-ref-l2.md#` in `docs/` | 2 matches | Both at docs/index.md (macOS + iOS); Android ref to be ADDED in plan 57-01 |

This baseline is auditable and persists for VERIFICATION.md cross-check at Phase 57 close (per 57-07).
