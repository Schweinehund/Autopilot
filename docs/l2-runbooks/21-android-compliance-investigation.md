---
last_verified: 2026-04-23
review_by: 2026-07-22
applies_to: all
audience: L2
platform: Android
---

> **Platform gate:** This guide covers Android Enterprise L2 investigation via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L2 Runbooks](00-index.md#ios-l2-runbooks).

# Android Compliance Investigation

## Triage

**From L1 escalation?** L1 runbook 25 classified the failure as Cause A / B / C / D. Skip to the matching "Per-Cause Deep-Dive" section:
- Cause A → [Play Integrity Verdict Failure](#cause-a-play-integrity-verdict-failure)
- Cause B → [OS Version Policy Mismatch](#cause-b-os-version-policy-mismatch)
- Cause C → [CA Timing Gap (First Compliance Evaluation Pending)](#cause-c-ca-timing-gap)
- Cause D → [Passcode / Encryption / Work Profile Security Policy Mismatch](#cause-d-passcode-encryption-policy-mismatch)

**Starting fresh?** Begin at Investigation by Axis below to narrow the compliance-failure axis before locating the Cause deep-dive.

## Context

This runbook covers Android Enterprise compliance failures and Conditional Access timing issues across all GMS-based enrollment modes (BYOD Work Profile, Fully Managed COBO, Dedicated COSU, Zero-Touch Enrollment).

Before starting: collect a diagnostic package per the [Android Log Collection Guide](18-android-log-collection.md) using the method appropriate for the enrollment mode. The Microsoft Intune app logs (Section 2) capture compliance-policy evaluation trace; adb logcat (Section 3) `DevicePolicyManager:*` filter captures DPC evaluation events.

**Structure:** This runbook uses a Phase 31 D-14 hybrid axis structure. `## Investigation by Axis` is the starting point for fresh investigations where the cause is not yet known. `## Per-Cause Deep-Dive` is the direct handoff target for L1-routed tickets — skip to the matching cause sub-section using the Triage block above.

**Pareto emphasis (D-20):** Cause A (Play Integrity) and Cause C (CA Timing / Not evaluated terminal state) together account for the majority of Android compliance escalations and receive expanded coverage. Cause B (OS version) and Cause D (passcode/encryption) are compact — these are almost always ⚙️ Config fixes resolved at L1.

## Investigation by Axis

Android compliance failures map to three axes. Rule out ⚙️ Config first (fixable in Intune admin center), then ⏱️ Timing (wait for propagation / next check-in), then declare 🐛 Defect (escalate Microsoft Support).

### Configuration Errors

Axis ⚙️ — misalignment between compliance policy settings and device state that can be fixed in Intune admin center or on the device.

**Maps to:**
- **Cause B** (OS Version Policy Mismatch — ⚙️ config axis): device OS version below `minAndroidVersion` policy value; update OS OR relax policy. Cross-references the canonical [Android version matrix](../android-lifecycle/03-android-version-matrix.md).
- **Cause D** (Passcode / Encryption / Work Profile Security Policy Mismatch — ⚙️ config axis): passcode/PIN complexity rules, device encryption requirement, work profile security policy mismatch.

### Timing Issues

Axis ⏱️ — propagation or evaluation delays where no admin change is required.

**Maps to:**
- **Cause C** (CA Timing Gap / First Compliance Evaluation Pending — ⏱️ timing axis): post-enrollment first-evaluation window typically 15-30 minutes `[MEDIUM, last_verified 2026-04-23]`. Device reports "Not evaluated" compliance state; Conditional Access blocks access pending first evaluation.

### Genuine Defects

Axis 🐛 — cross-cutting axis for non-configurable failures.

**Maps to:**
- **Cause A** (Play Integrity Verdict Failure — ⚙️ policy + 🐛 verdict anomaly): hardware-backed attestation; policy-tier mismatch is ⚙️, but verdict anomaly on an otherwise-compliant device is 🐛.
- **Cause C "Not evaluated" terminal state** (cross-cutting 🐛 — stuck-state defect where first-evaluation never completes): see dedicated sub-section below.
