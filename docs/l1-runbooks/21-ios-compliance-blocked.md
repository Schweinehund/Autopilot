---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: all
audience: L1
platform: iOS
---

> **Platform gate:** This guide covers iOS/iPadOS troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).

# iOS Compliance Blocked / Access Denied

Use this runbook when an iOS/iPadOS user is enrolled in Intune but Conditional Access is blocking access to Microsoft 365 resources (Outlook, SharePoint, Teams, OneDrive, etc.), OR when the device is showing as "Non-compliant" or "Not evaluated" in Intune without a clear reason. This is the ONLY iOS L1 runbook that includes user-actionable remediation (device restart, iOS update, passcode change) — the other 5 runbooks are tenant-config failures that require admin action.

## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com)
- Device serial number
- User's UPN (email address)
- Portal shorthand used in this runbook: **P-09** = `Devices > All devices > [device] > Device compliance`; **P-08** = `Endpoint security > Device compliance > Compliance policy settings`

## How to Use This Runbook

Go directly to the section matching the observation:

- [Cause A: CA Gap (First Compliance Evaluation Pending)](#cause-a-ca-gap) — User just enrolled within the last 30 minutes; Intune shows compliance state "Not evaluated" or "In grace period"
- [Cause B: Actual Policy Mismatch](#cause-b-policy-mismatch) — Intune shows "Non-compliant" with a specific failing setting (OS version, passcode, jailbreak detection, restricted-apps list)
- [Cause C: Default Posture "Not Compliant" Configuration](#cause-c-default-posture) — Device is enrolled but has no compliance policy assigned, AND the tenant default-posture toggle is set to "Not compliant", AND CA requires compliant device

If none of the above matches the observation, proceed directly to the [overall Escalation Criteria](#escalation-criteria) at the bottom.

---

## Cause A: CA Gap (First Compliance Evaluation Pending) {#cause-a-ca-gap}

**Entry condition:** User completed enrollment within the last 30 minutes AND is being denied access to Microsoft 365 resources. Intune P-09 shows compliance state "Not evaluated" or "In grace period".

### Symptom

- User enrolled recently (within 30 min) and cannot reach Outlook / SharePoint / Teams.
- Intune admin center P-09 (`Devices > All devices > [device] > Device compliance`) shows state: "Not evaluated"

### L1 Triage Steps

1. > **Say to the user:** "Your device just enrolled and Intune is still evaluating compliance. This usually takes 15-30 minutes after enrollment completes. During this window, access to corporate resources may be blocked. Please wait ~30 minutes from enrollment, then retry."
2. Navigate to P-09. Confirm state = "Not evaluated" AND enrollment completion timestamp within last 30 minutes.
3. Deep-link for admin/user reference: the CA timing behavior is documented at [iOS Compliance Policy Guide § Compliance Evaluation Timing and Conditional Access](../admin-setup-ios/06-compliance-policy.md#compliance-evaluation-timing-and-conditional-access).

### User Action Required

- Wait 30 minutes from enrollment completion.
- Retry accessing the blocked resource (sign out / sign in to Outlook / Teams / Company Portal may help).
- Power-cycle the device IF 30 minutes have elapsed and state is still "Not evaluated" (forces fresh Intune check-in).

### Admin Action Required

- None if the 30-minute window has not elapsed. This is expected CA gap behavior.
- If > 30 minutes elapsed and state is STILL "Not evaluated": see [Cause C](#cause-c-default-posture) (default-posture toggle may be the cause) OR escalate (APNs / check-in problem).

### Escalation (within Cause A)

- State remains "Not evaluated" > 30 minutes after enrollment — escalate (likely runbook 16 APNs or check-in problem overlap).

---

## Cause B: Actual Policy Mismatch {#cause-b-policy-mismatch}

**Entry condition:** Intune P-09 shows compliance state "Non-compliant" with at least one specific failing setting listed.

### Symptom

- User can reach Company Portal but is blocked from Outlook / SharePoint / Teams.
- P-09 shows: compliance state "Non-compliant" + one or more failing settings (OS version, passcode, jailbreak, restricted-apps list).
- Failing setting is clickable in Intune portal — provides remediation guidance per Microsoft Learn **[CITED: learn.microsoft.com/intune/intune-service/protect/compliance-policy-monitor]**.

### L1 Triage Steps

1. > **Say to the user:** "Your device is currently showing as non-compliant with our security policy. We'll work through what needs to change — most issues are resolved by a simple device update or settings change."
2. Navigate to P-09 > device compliance tab. Click the "Non-compliant" state to view failing settings.
3. Record which settings are failing and what Intune's remediation guidance says.
4. Common failing settings:
   - **OS version below minimum** → user action (update iOS)
   - **Passcode complexity mismatch** → user action (change passcode)
   - **Jailbreak detected** → IMMEDIATE Security team escalation (NOT L2; see Escalation Criteria)
   - **Restricted app installed** → user action (remove app) OR admin adjusts list

### User Action Required

- **OS version below minimum:** > **Say to the user:** "Please update to iOS [version X] or later. Open Settings > General > Software Update. This may take 20-30 minutes. After the update, please wait 15 minutes for Intune to re-evaluate compliance."
- **Passcode complexity mismatch:** > **Say to the user:** "Please change your passcode to meet the policy: [N+ characters, complexity rules]. Go to Settings > Face ID & Passcode > Change Passcode."
- **Restricted app installed:** > **Say to the user:** "Please uninstall [App name] to meet compliance. Touch-and-hold the app icon, tap Remove App."
- **Device restart (any persistent issue):** > **Say to the user:** "Please restart your device by holding the side button and volume up until the power-off slider appears, then power back on. Wait 15 minutes before retesting."

> **Optional per D-08 extension (research open question Q4):** After the user completes a required action, L1 MAY trigger a per-device Intune sync via `Devices > All devices > [device] > Sync` to accelerate re-evaluation. This is a per-device sync (not tenant-scope) matching macOS runbook 12 step 6 precedent. If strict D-08 literal (ADE token sync only) is preferred, defer the sync to the admin.

### Admin Action Required

- **Only if** the compliance policy setting itself is too strict for the user's device (e.g., minimum OS version set ahead of Apple's current release per `../admin-setup-ios/06-compliance-policy.md` failure-pattern line 216):
  - **Ask the admin to:** review compliance policy minimum-OS vs Apple's current release; adjust policy if set too aggressively.
  - **Verify:** P-09 compliance state returns to Compliant after user action AND policy review.

### Escalation (within Cause B)

- User performs required action (OS update, passcode change) but compliance remains Non-compliant after 60 minutes
- Jailbreak detection — **escalate to Security team immediately (NOT L2 alone)**; this is a security-incident track per the device's `06-compliance-policy.md` line 217 ("Known jailbroken devices treated as compliant; data exfiltration risk open") escalation posture

---

## Cause C: Default Posture "Not Compliant" Configuration {#cause-c-default-posture}

**Entry condition:** User has NO compliance policy assigned AND tenant-wide default-posture setting is "Not compliant" AND CA "Require compliant device" is active → user is blocked without any failing-setting signal.

### Symptom

- User is blocked from Microsoft 365 resources.
- P-09 shows: compliance state "Non-compliant" (NOT "Not evaluated") but lists NO failing settings because NO compliance policy is assigned.
- At P-08 (`Endpoint security > Device compliance > Compliance policy settings`), the "Mark devices with no compliance policy assigned as" toggle is set to "Not compliant".

### L1 Triage Steps

1. > **Say to the user:** "We're checking your device's compliance configuration. This type of issue is resolved by your Intune administrator — your admin is being notified."
2. Navigate to P-09. Confirm compliance state = "Non-compliant" AND "No compliance policy assigned".
3. Navigate to P-08: `Endpoint security > Device compliance > Compliance policy settings`. Document the current "Mark devices with no compliance policy assigned as" toggle value ("Compliant" / "Not compliant").
4. Also document whether the user exists in any Entra group that SHOULD have a compliance policy assigned (via Intune > Compliance policies > [policy] > Assignments).

### Admin Action Required

- **Ask the admin to (choose one):**
  1. Assign an appropriate iOS compliance policy to the user's Entra group (preferred — aligned to Microsoft Learn recommendation at `compliance-policy-monitor § Important concepts`). See [iOS Compliance Policy Guide](../admin-setup-ios/06-compliance-policy.md) for configuration reference.
  2. If the user is genuinely exempt (executive override, special-case BYOD), add the user to an exempt group OR adjust the CA policy's scope.
- **Verify:** P-09 compliance state transitions from "Non-compliant" to "Compliant" once policy is assigned and evaluated.

### Escalation (within Cause C)

- Admin assigns policy but P-09 compliance state does not update after 30 minutes — likely check-in problem; escalate.

---

## User Action Required

User-actionable remediation is documented per sub-cause above. Cross-reference summary:

- **Cause A** (CA gap): Wait 30 minutes from enrollment; retry. Power-cycle device if > 30 minutes.
- **Cause B** (policy mismatch): Update iOS if OS-version failure; change passcode if passcode complexity failure; uninstall restricted app if applicable; restart device.
- **Cause C** (default posture): NOT user-fixable — admin action required.

See the per-cause sections above for the exact "Say to the user" scripts and remediation guidance.

---

## Escalation Criteria

(Overall — applies across all three causes.)

Escalate to L2 if:

- Cause A: state remains "Not evaluated" > 30 minutes after enrollment (overlap with runbook 16 — APNs check-in issue)
- Cause B: user performs required action (OS update, passcode change) but compliance remains non-compliant after 60 minutes
- Cause C: admin assigns policy but compliance state does not update (check-in issue)

**Escalate to Security team IMMEDIATELY (not L2) if:**

- Cause B jailbreak detection triggered on a device user is actively using — this is a security-incident track per the device's `06-compliance-policy.md` line 217 ("Known jailbroken devices treated as compliant; data exfiltration risk open") escalation posture

**Before escalating, collect:**

- Device serial number + iOS version
- User UPN
- Screenshot of P-09 compliance state view with failing settings (if any) visible
- Timestamp of enrollment completion (for Cause A)
- P-08 default-posture toggle value (for Cause C)
- User-actions attempted (if any) and outcome
- Which Cause (A/B/C) closest matches observation

---

[Back to iOS Triage](../decision-trees/07-ios-triage.md)

See [iOS L2 Runbooks (Phase 31)](../l2-runbooks/00-index.md) for advanced compliance / CA investigation (Phase 31 placeholder).

For admin configuration references:
- [iOS Compliance Policy Guide](../admin-setup-ios/06-compliance-policy.md)
- [iOS Compliance Policy § Compliance Evaluation Timing and Conditional Access](../admin-setup-ios/06-compliance-policy.md#compliance-evaluation-timing-and-conditional-access) — Cause A deep-link
- [iOS Enrollment Overview](../ios-lifecycle/00-enrollment-overview.md)
- [Runbook 16: APNs Expired](16-ios-apns-expired.md) — If Cause A state remains "Not evaluated" > 30 minutes, APNs check-in issue may overlap

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-17 | Initial version | -- |
