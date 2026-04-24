---
last_verified: 2026-04-23
review_by: 2026-06-22
applies_to: all
audience: L1
platform: Android
---

> **Platform gate:** This guide covers Android enrollment/compliance troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks).

# Android Compliance Blocked

L1 runbook for Android devices where compliance evaluation is blocking access to Microsoft 365 resources (Conditional Access). Four distinct causes are diagnosed independently:

- **Cause A:** Play Integrity verdict failure (attestation)
- **Cause B:** OS version policy mismatch
- **Cause C:** CA timing gap — first compliance evaluation pending after enrollment
- **Cause D:** Passcode / encryption / work-profile security policy mismatch

Applies to all GMS modes (BYOD, Fully managed, Dedicated, ZTE post-enrollment). AOSP devices do NOT use Play Integrity; AOSP compliance failures route to L2.

Routed here from the [Android Triage Decision Tree](../decision-trees/08-android-triage.md) ANDR25 branch (any mode).

## Prerequisites

- Access to Intune admin center (`https://intune.microsoft.com`) with Help Desk Operator or Read Only Operator role (read-only for compliance data)
- Device serial number or User UPN
- Portal shorthand used in this runbook:
   - **P-09** = `Devices > All devices > [device] > Device compliance` (compliance state view)
   - **P-08** = `Endpoint security > Device compliance > Compliance policy settings` (tenant-wide default posture toggle)
   - **P-COMP** = the Android Enterprise compliance policy assigned to the user's group (found via `Endpoint security > Device compliance > [policy name]`)

## How to Use This Runbook

Check the cause that matches your observation. Causes are independently diagnosable — you do not need to rule out prior causes.

- [Cause A: Play Integrity Verdict Failure](#cause-a-play-integrity-verdict-failure) — Intune compliance shows "Not compliant" with failing setting "Play Integrity Verdict" or "Check strong integrity using hardware-backed security features"
- [Cause B: OS Version Policy Mismatch](#cause-b-os-version-policy-mismatch) — Device below minimum Android version per compliance policy
- [Cause C: CA Timing Gap (First Compliance Evaluation Pending)](#cause-c-ca-timing-gap) — User just enrolled within the last 30 minutes; Intune shows "Not evaluated" or "In grace period"
- [Cause D: Passcode / Encryption / Work Profile Security Policy Mismatch](#cause-d-passcode-encryption-policy-mismatch) — Compliance blocked by device-side security settings (missing passcode, encryption not enabled, work-profile-password complexity)

If none matches, proceed directly to [Escalation Criteria](#escalation-criteria).

Common ticket phrasings: "my device isn't compliant," "access to Outlook is blocked," "I got a message my phone needs updating," "work apps are blocked."

---

## Cause A: Play Integrity Verdict Failure {#cause-a-play-integrity-verdict-failure}

> See [Play Integrity](../_glossary-android.md#play-integrity) for the attestation mechanism Android uses for compliance attestation (the legacy API was deprecated by Google in January 2025; Play Integrity is the current replacement).

**Entry condition:** Intune compliance state shows "Not compliant" AND the failing setting listed is "Play Integrity Verdict" set to "Check basic integrity & device integrity" (Basic + Device integrity) or "Check strong integrity using hardware-backed security features" (Strong integrity, hardware-backed).

### Symptom

- P-09 shows compliance state "Not compliant"
- Failing setting listed: "Play Integrity Verdict" or "Check strong integrity using hardware-backed security features"
- Company Portal or Microsoft Intune app on device may show "Your device does not meet compliance policy" with a Play Integrity-specific reason
- [VERIFIED: learn.microsoft.com/en-us/intune/intune-service/protect/compliance-policy-create-android-for-work, 2025-09-04]

### L1 Triage Steps

1. > **Say to the user:** "Your device is being checked against a security attestation (Play Integrity). I'll look at the details in Intune."
2. Open P-09 for the device. Note the exact failing setting label — match it to one of: "Check basic integrity", "Check basic integrity & device integrity", or "Check strong integrity using hardware-backed security features".
3. Check the device's Android version and security patch level (ask the user: `Settings > About phone > Android version` and `Security patch level`).
4. Note whether the failure started after September 30, 2025. Google changed strong integrity requirements for Android 13+ in May 2025, enforced by Intune from September 30, 2025: devices without a security patch from the last 12 months no longer meet "strong integrity" on Android 13+. Some previously-compliant devices may now fail "Check strong integrity using hardware-backed security features" if their security patch is more than 12 months old.

### Admin Action Required

**Ask the admin to:**

- Review the Android compliance policy assigned to the user's group (P-COMP). Examine the Play Integrity Verdict setting and the "Check strong integrity using hardware-backed security features" setting — determine whether the policy requirement matches the user's device capability.
- If the user's device cannot meet strong integrity (hardware limitations, or security patch > 12 months old on Android 13+): either update the compliance policy to a tier the device can pass, OR assist the user in updating their Android OS and security patch to meet the strong integrity requirement.
- Verify the Play Integrity attestation setting is correctly configured for Android Enterprise devices in the tenant. [VERIFIED: learn.microsoft.com/en-us/intune/intune-service/protect/compliance-policy-create-android-for-work]

**Verify:**

- After admin update (or user OS/patch update): P-09 shows state transition from "Not compliant" to "Compliant" within approximately 15–30 minutes (next compliance evaluation cycle).

**If the admin confirms none of the above applies:**

- Proceed to [Escalation Criteria](#escalation-criteria).

### User Action Required

- If the failure is related to security patch age: ask the user to check for system updates (`Settings > System > System update > Check for update`). Not all OEMs ship monthly patches on schedule; some devices may be permanently unable to meet the required patch age if OEM support has ended.

### Escalation (within Cause A)

- Device cannot achieve strong integrity despite being current-patched AND compliance policy cannot be loosened per org policy
- Multiple users on the same device model show Play Integrity failure in a pattern (likely an OEM firmware issue — L2 investigation required)

---

## Cause B: OS Version Policy Mismatch {#cause-b-os-version-policy-mismatch}

**Entry condition:** P-09 shows "Not compliant" with a failing setting referencing the Android OS version (e.g., "Minimum OS version").

### Symptom

- P-09 shows "Not compliant" with failing setting referencing Android OS version (e.g., "Minimum OS version: 12; Device OS version: 10")
- User's device is below the minimum Android version configured in the assigned compliance policy

Cross-reference: [Android Version Matrix](../android-lifecycle/03-android-version-matrix.md) — per-mode minimum versions and notable breakpoints (Android 11 COPE NFC removal, Android 12 IMEI/serial removal from corporate identifiers, Android 15 FRP hardening).

### L1 Triage Steps

1. Open P-09 for the device; note the exact minimum OS version required and the device's actual OS version as shown in Intune.
2. Ask the user to confirm their device version: `Settings > About phone > Android version`.
3. Check whether the device's security patch level is also listed as a failing setting (security patch level may be evaluated alongside OS version in some compliance policies).

### Admin Action Required

**Ask the admin to:**

- Review the Android compliance policy's Minimum OS Version setting (P-COMP). If the policy minimum is reasonable for the fleet, the user must update their device OS.
- If the user's device cannot update further (OEM software support has ended, or carrier firmware is locked), consider device replacement OR scoping the user out of this compliance policy into a policy with a lower minimum.

**Verify:**

- After the user updates their Android OS version: P-09 compliance state transitions to "Compliant" on the next evaluation cycle (approximately 15–30 minutes after device check-in).

**If the admin confirms none of the above applies:**

- Proceed to [Escalation Criteria](#escalation-criteria).

### User Action Required

- Update the device OS: `Settings > System > System update > Check for update`. If no update is available and the device is below the required minimum, the device may be at OEM end-of-software-support.

### Escalation (within Cause B)

- User cannot update device OS (no OEM update available, OEM support ended) AND the compliance policy cannot be adjusted to accommodate the device

---

## Cause C: CA Timing Gap (First Compliance Evaluation Pending) {#cause-c-ca-timing-gap}

**Entry condition:** User completed enrollment within the last 30 minutes AND is being denied access to Microsoft 365 resources. P-09 shows compliance state "Not evaluated" or "In grace period"; OR the state is "Not compliant" but the failing-settings list is EMPTY (default posture "Not compliant" toggle is active in P-08 and no policy is assigned to the user's group).

### Symptom

- User enrolled recently (within 30 minutes) and cannot access Outlook, SharePoint, or Teams
- P-09 shows state "Not evaluated" (most common post-enrollment state) OR "In grace period"
- Alternate variant: P-09 shows "Not compliant" but the failing-settings list is EMPTY — this is the default-posture variant (no compliance policy assigned; P-08 default = "Not compliant")
- [VERIFIED: learn.microsoft.com/en-us/intune/device-security/compliance/overview, 2026-04-16]

### L1 Triage Steps

1. > **Say to the user:** "Your device just enrolled and Intune is still completing its initial compliance evaluation. This typically resolves within 30 minutes. I'll check the current status now."
2. Open P-09. Note the enrollment timestamp and current compliance state.
3. If state = "Not evaluated" AND enrollment occurred less than 30 minutes ago: this is the expected post-enrollment state. Advise the user to wait; no admin action is required yet.
4. If state = "Not compliant" BUT the failing settings list is EMPTY: check P-08 (`Endpoint security > Device compliance > Compliance policy settings`). Review the "Mark devices with no compliance policy assigned as" toggle. If set to "Not compliant" AND no Android compliance policy is assigned to the user's group, this is the default-posture variant — admin action is required.

### Admin Action Required

**Ask the admin to:**

- Verify that an Android Enterprise compliance policy is assigned to the user's Entra group (for the default-posture variant where the failing-settings list is empty).
- If no policy is assigned: assign an appropriate Android compliance policy to the user's group, OR (less preferred from a security standpoint) set the P-08 default posture toggle to "Compliant".
- After a policy is assigned, wait for the next compliance evaluation cycle (approximately 15–30 minutes).

**Verify:**

- P-09 transitions to "Compliant" (expected outcome) OR transitions to "Not compliant" with actual failing settings listed — which would route back to Causes A, B, or D for resolution.

**If the admin confirms none of the above applies:**

- Proceed to [Escalation Criteria](#escalation-criteria).

### User Action Required

- Wait 30 minutes from enrollment completion, then retry accessing the blocked resource.
- If 30 minutes have elapsed and state is still "Not evaluated": restart the device (forces a fresh Intune check-in).

### Escalation (within Cause C)

- State remains "Not evaluated" more than 30 minutes after enrollment completion
- Admin assigns a compliance policy but compliance state does not update after 60 minutes

---

## Cause D: Passcode / Encryption / Work Profile Security Policy Mismatch {#cause-d-passcode-encryption-policy-mismatch}

**Entry condition:** P-09 shows "Not compliant" with a failing setting referencing passcode or PIN complexity, device encryption, or work-profile password requirements.

### Symptom

- P-09 failing settings include one or more of: "Require a password to unlock mobile devices", "Minimum password length", "Required password type", "Encryption of data storage on device", "Work profile password" (BYOD only)
- On the device: the user is prompted to set up (or has failed to maintain) a passcode or work-profile password meeting the compliance policy complexity requirements

### L1 Triage Steps

1. Open P-09 and record the specific failing settings listed.
2. Ask the user about their current device lock method: no lock / swipe / pattern / PIN / alphanumeric password. Note that BYOD (work-profile) devices may additionally require a separate work-profile password distinct from the device screen lock.
3. Confirm whether device storage encryption is enabled. On modern Android devices (Android 6+), full-disk or file-based encryption is enabled by default; older devices may require manual enablement.

### Admin Action Required

**Ask the admin to:**

- Review the Android compliance policy's Password and System Security settings (P-COMP). Verify complexity requirements are achievable for the user's device and Android version.
- For BYOD: verify the work-profile password requirements in the compliance policy are aligned with the work-profile configuration policy. A mismatch between the compliance policy minimum and the work-profile configuration policy can cause a circular non-compliant state where the device cannot satisfy both policies simultaneously.

**Verify:**

- After the user sets a compliant passcode or work-profile password: P-09 transitions to "Compliant" on the next evaluation cycle (approximately 15–30 minutes after device check-in).

**If the admin confirms none of the above applies:**

- Proceed to [Escalation Criteria](#escalation-criteria).

### User Action Required

- Set or update the device screen lock to meet complexity requirements: `Settings > Security > Screen lock`. Select a method that satisfies the failing setting (PIN, password, or pattern with required length/complexity).
- For BYOD work-profile password specifically: set at the prompt from the Microsoft Intune app, or navigate to `Settings > Security > Work profile security > Screen lock` (exact menu path varies by OEM and Android version).

### Escalation (within Cause D)

- User sets a passcode meeting the stated complexity requirement but compliance state does not update after 30 minutes
- Device does not support the required encryption tier (older device hardware limitation)

---

## User Action Required

User-actionable remediation per sub-cause above. Cross-cause summary:

- **Cause A** (Play Integrity): user may update OS / security patch if the failure is related to the September 30, 2025 strong integrity requirement (patch must be ≤ 12 months old on Android 13+)
- **Cause B** (OS version): user updates Android OS via `Settings > System > System update`; device may be at OEM end-of-software-support if no update is available
- **Cause C** (CA timing gap): user waits 30 minutes from enrollment then retries; the default-posture variant is NOT user-fixable (admin must assign a compliance policy)
- **Cause D** (passcode/encryption): user sets the required passcode or work-profile password; verifies device encryption is enabled

---

## Escalation Criteria

(Overall — applies across all four causes.)

Escalate to L2 (or to the Intune admin directly if not already done). See [Android Compliance Investigation](../l2-runbooks/21-android-compliance-investigation.md) — L1 Cause A maps to RB21 Cause A, Cause B→B, Cause C→C, Cause D→D. Use the [L2 Runbook Index](../l2-runbooks/00-index.md#android-l2-runbooks) for routing.

Escalate to L2 if:

- Cause A: device cannot achieve strong integrity despite having a current security patch AND the compliance policy cannot be adjusted per org policy
- Cause B: user cannot update device OS (OEM support ended) AND the compliance policy cannot be adjusted for this user
- Cause C: compliance state remains "Not evaluated" more than 30 minutes after enrollment, OR admin assigns a policy but state does not update after 60 minutes
- Cause D: user sets a compliant passcode but compliance state does not update after 30 minutes, AND the device supports the required encryption tier
- Observation does not cleanly match any single cause (multiple failing settings, ambiguous compliance state, or multiple users on the same device model affected in a pattern)

**Before escalating, collect:**

- Device serial number
- Device make, model, Android OS version, and security patch level
- User UPN
- Screenshot of P-09 compliance state view with failing settings (if any) visible
- Timestamp of enrollment completion (for Cause C)
- P-08 default-posture toggle value (for Cause C default-posture variant)
- User actions attempted (if any) and the outcome
- Which Cause (A/B/C/D) most closely matches the observation
- Compliance policy name and ID (P-COMP) assigned to the user's group

---

[Back to Android Triage](../decision-trees/08-android-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-23 | Resolved Phase 41 L2 cross-references | -- |
| 2026-04-23 | Initial version (4-cause runbook: Play Integrity / OS Version / CA Timing Gap / Passcode-Encryption) | -- |
