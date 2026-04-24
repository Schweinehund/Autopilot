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

## Per-Cause Deep-Dive

### Cause A: Play Integrity Verdict Failure {#cause-a-play-integrity-verdict-failure}

> See [Play Integrity](../_glossary-android.md#play-integrity) for the attestation mechanism Android compliance uses. The legacy attestation API was deprecated by Google in January 2025; Play Integrity is the current replacement. All Phase 34 and later Android documentation uses Play Integrity terminology exclusively.

**Typical class:** ⚙️ Config Error (policy-tier minimum mismatch) + 🐛 Defect (verdict anomaly on otherwise-compliant device)

**Play Integrity 3-tier ladder** (Intune compliance policy UI labels verified 2026-04-23 `[MEDIUM, last_verified 2026-04-23]`):

1. **Basic integrity** — UI label: "Check basic integrity". Device passes basic-integrity checks (not rooted or tampered at software level).
2. **Basic + Device integrity** — UI label: "Check basic integrity & device integrity". Device also passes device-integrity checks (system image integrity).
3. **Strong integrity (hardware-backed)** — UI label: "Check strong integrity using hardware-backed security features". This is a SEPARATE Intune setting (distinct toggle), NOT a third value in the "Play Integrity Verdict" dropdown. Devices lacking hardware-backed security cannot pass this tier regardless of software state.

**Investigation Steps:**

1. Intune admin center > Devices > [device] > Device compliance > review the compliance policy evaluated against the device. Identify the Play Integrity verdict value reported.
2. Verify the compliance policy's "Play Integrity Verdict" dropdown value (Basic / Basic + Device) and the "Check strong integrity using hardware-backed security features" toggle independently. These are two separate policy controls.
3. Device-side: `adb shell pm list packages | grep com.google.android.gms` to confirm Google Play services presence; `adb logcat -s DevicePolicyManager:*` for DPC evaluation trace `[MEDIUM, last_verified 2026-04-23]`.
4. Cross-reference the [Android version matrix](../android-lifecycle/03-android-version-matrix.md) for Play Integrity support across Android versions; Strong integrity requires Android 8+ and hardware-backed keystore. Note: Google changed strong integrity requirements for Android 13+ in May 2025, enforced by Intune from September 30, 2025 — devices without a security patch from the last 12 months no longer meet strong integrity on Android 13+.
5. Check whether the failure started after September 30, 2025 for a pattern-based OEM firmware issue: multiple users on the same device model failing Play Integrity in a pattern indicates an L2/Microsoft Support investigation.

**Known Patterns:**

- ⚙️ Policy-tier mismatch (device cannot meet hardware-backed tier due to device hardware limitations) — relax the "Check strong integrity using hardware-backed security features" toggle OR exclude affected devices from the policy scope using a separate compliance policy group.
- ⚙️ Security patch age failure on Android 13+ (patch > 12 months old) — device meets hardware requirements but fails the September 2025 enforcement change; user must update security patch OR policy must be adjusted for that device class.
- 🐛 Verdict anomaly on hardware-capable, current-patched device — Play services returning unexpected verdict; collect logs + escalate to Microsoft Support.

**Microsoft Support escalation:**

- Device serial + Android version + OEM + model + security patch level
- Intune compliance policy export showing Play Integrity tier + "Check strong integrity" toggle values
- Device compliance state screenshot (P-09) + Play Integrity verdict value observed
- Runbook 18 Section 2 Microsoft Intune app log incident ID + runbook 18 Section 3 `adb logcat -s DevicePolicyManager:*` excerpt `[MEDIUM, last_verified 2026-04-23]`
- Whether the failure affects multiple users on the same device model (pattern indicator)

### Cause B: OS Version Policy Mismatch {#cause-b-os-version-policy-mismatch}

**Typical class:** ⚙️ Config Error

Compliance policy sets a `minAndroidVersion` (or max) that the device fails. Verify policy version vs device version; cross-reference the [Android version matrix](../android-lifecycle/03-android-version-matrix.md) for mode-specific minimum versions (Android 8 minimum for BYOD Work Profile; Android 11 COPE NFC removal; Android 12 IMEI removal; Android 15 FRP hardening).

**Investigation:**

1. Intune admin center > compliance policy (P-COMP) > OS version rule; record the minimum value.
2. Device-side: Settings > About phone > Android version; OR `adb shell getprop ro.build.version.release` (Android 10+) `[HIGH, last_verified 2026-04-23]`.
3. If device version < policy minimum, the admin has two paths: (a) update the device OS (if feasible), (b) relax the policy minimum OR scope the user into a lower-minimum compliance policy group (if the device class cannot upgrade).

**Escalation:** Rare — this cause is almost always ⚙️ Config; escalate only if device reports correct OS version but compliance evaluation still fails. Attach: compliance policy export + Settings > About phone screenshot + device enrolled-state details from P-09.

### Cause C: CA Timing Gap (First Compliance Evaluation Pending) {#cause-c-ca-timing-gap}

**Typical class:** ⏱️ Timing (first-evaluation window) + 🐛 Defect (stuck-state terminal)

Post-enrollment, Android devices go through a first compliance evaluation before Conditional Access treats them as Compliant. The typical window is **15-30 minutes** `[MEDIUM, last_verified 2026-04-23]`. During this window the compliance state reports "Not evaluated" and CA policies may block access.

**Compliance state strings** (verified from L1 runbook 25 Cause C):

- `"Not evaluated"` — post-enrollment before first check; transitional state
- `"In grace period"` — non-compliant within configured grace period
- `"Not compliant"` — failing; failing settings listed in the device compliance pane
- `"Compliant"` — passing

**Investigation Steps:**

1. Intune admin center > Devices > [device] > Device compliance (P-09). Record current compliance state + enrollment completion timestamp.
2. If state = "Not evaluated" and enrollment < 30 minutes ago, wait for first-evaluation completion and re-check.
3. If state = "Not evaluated" and enrollment > 30 minutes ago, proceed to "Not evaluated" terminal-state sub-section below.
4. If state = "Not compliant" but the failing-settings list is EMPTY: check P-08 (`Endpoint security > Device compliance > Compliance policy settings` > "Mark devices with no compliance policy assigned as"). If set to "Not compliant" AND no Android compliance policy is assigned to the user's group, this is the default-posture variant — admin must assign a compliance policy.
5. Device-side: trigger a sync (Microsoft Intune app > Settings > Sync OR Company Portal > Devices > Sync) to accelerate check-in.
6. Runbook 18 Section 2 Microsoft Intune app log: search for compliance-evaluation events.

#### "Not evaluated" Terminal State

If compliance state remains "Not evaluated" beyond 30 minutes after enrollment completion, evaluate these Android-specific causes (D-21):

1. **Play services network gap** — device cannot reach Google Play services endpoints. Verify via Settings > About phone > Google Play services version (recent); Settings > Network > connectivity; `adb shell ping -c 3 play.googleapis.com` if adb available `[MEDIUM, last_verified 2026-04-23]`.
2. **MDM check-in failure** — device-to-Intune connectivity blocked (firewall, proxy, captive portal). Runbook 18 Section 2 Microsoft Intune app logs will show failed check-in attempts. Device sync from Microsoft Intune app or Company Portal fails to complete.
3. **Compliance policy assignment missing** — device is enrolled but no compliance policy is assigned to its user/device group. Verify at Intune admin center > Endpoint security > Device compliance > Policies > [policy] > Assignments.
4. **GMS service disruption at Google** — transient; rare. Check the Google Workspace Status Dashboard (`workspace.google.com/intl/en/resources/google-workspace-status`) before investing further investigation time.

**Microsoft Support escalation (Not evaluated terminal state):**

- User UPN + device serial + enrollment completion timestamp
- Device compliance state screenshots over time (showing persistence of "Not evaluated" beyond 30 minutes)
- Compliance policy assignment state (Intune admin center screenshot showing assignments)
- P-08 default-posture toggle value (screenshot)
- Google Play services version (device Settings > About phone)
- Network connectivity evidence (ping results, corporate network proxy configuration)
- Runbook 18 Section 2 Microsoft Intune app log incident ID
- Runbook 18 Section 3 `adb logcat` excerpt if USB debugging is available `[MEDIUM, last_verified 2026-04-23]`

**Do not escalate to Microsoft Support without:** (a) confirmed P-08 default-posture value, (b) confirmed compliance policy assignment state, (c) enrollment completion timestamp, and (d) at least one sync attempt. Missing any of these four elements will cause the support case to be returned for additional data.

### Cause D: Passcode / Encryption / Work Profile Security Policy Mismatch {#cause-d-passcode-encryption-policy-mismatch}

**Typical class:** ⚙️ Config Error

Compliance policy enforces passcode/PIN complexity rules (length, alphanumeric, character-set), device encryption requirement, or Work Profile security policy (BYOD-specific). Device fails one of these settings.

**Investigation:**

1. Intune admin center > compliance policy (P-COMP) > System security rules; record required passcode complexity / encryption state.
2. Device-side (user): Settings > Security > Screen lock — verify passcode type meets policy requirements (length, alphanumeric complexity, PIN complexity).
3. BYOD-specific: Settings > Accounts > Work > Work profile security (passcode/biometric on Work Profile container). BYOD devices may require a separate work-profile password distinct from the device screen lock.
4. Encryption: Android 10+ enforces file-based encryption by default; if a compliance policy requires "full-disk encryption" on Android 10+, the policy is misaligned — file-based encryption IS the modern Android equivalent. Admin should update the policy to reflect current Android encryption behavior.

**Escalation:** Generally User Action Required (set compliant passcode or work-profile password); escalate only if device reports compliant passcode/encryption but policy evaluation still fails. Attach: compliance policy export + Settings > Security screenshot + runbook 18 Section 2 Microsoft Intune app log incident.
