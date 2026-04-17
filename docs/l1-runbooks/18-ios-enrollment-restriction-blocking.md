---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: all
audience: L1
platform: iOS
---
<!-- applies_to: all — enrollment restrictions span all iOS paths (ADE, Company Portal, User Enrollment) per D-25 Claude's discretion / research A3 recommendation -->

> **Platform gate:** This guide covers iOS/iPadOS troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).

# iOS Enrollment Restriction Blocking

Use this runbook when an iOS/iPadOS user reports that their device cannot be managed, enrollment fails with an "Invalid Profile" or "Can't be managed" error, or the device appears briefly in Intune then is removed. This runbook covers **tenant-level configuration blocks** — for **per-user device limit exhaustion** (`DeviceCapReached` / "Too many devices"), use [runbook 20](20-ios-device-cap-reached.md) instead.

Routed here from the [iOS Triage Decision Tree](../decision-trees/07-ios-triage.md) IOSR3 "'Invalid Profile' or 'Can't be managed'" branch.

## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com) with read permissions to **Enrollment restrictions** and **Devices**.
- Access to Microsoft Entra admin center (https://entra.microsoft.com) with read permissions to **Groups** and **Users**.
- Device serial number — ask the user to go to **Settings** > **General** > **About** > **Serial Number**.
- Knowledge of whether the device is personal (BYOD) or corporate-issued.

## Symptom

- **User-visible error (Company Portal flow):** `"The configuration for your iPhone/iPad couldn't be downloaded from [Company Name]: Invalid Profile"` — verbatim from Microsoft Learn troubleshoot-ios-enrollment-errors. This string specifically corresponds to device-type-restriction or platform-restriction blocking.
- **User-visible error (general):** `"This device cannot be managed"` or similar enrollment-blocked language.
- **Intune portal surface:** Device appears briefly in Intune then is retired/removed, OR never appears at all.
- **Disambiguation from runbook 20:** If the user specifically saw `"Device limit reached"` or `"Too many devices"` — use [runbook 20](20-ios-device-cap-reached.md) instead.

## L1 Triage Steps

1. > **Say to the user:** "We're checking your device registration — your admin is being notified. Please keep your device powered on and connected to Wi-Fi."

2. Navigate to **Devices** > **Device onboarding** > **Enrollment** > **Device platform restriction** (primary path P-05). If that section is not visible in your tenant, use the fallback path: **Devices** > **Enrollment restrictions** > **Device type restrictions** > **All Users** > **Properties** > **Edit** > **Platform settings** — both paths reach the same blade.

   > Portal navigation may vary by Intune admin center version. See [iOS Admin Setup Overview](../admin-setup-ios/00-overview.md) for details.

3. Review the policy applied to the user's assigned group. Record the following:
   - Platform allow/block for iOS/iPadOS (expected: Allow)
   - Personally-owned allow/block (if the device is personal and Personal is Blocked, that is the cause)
   - OS version minimum / maximum (if the device is below minimum or above maximum)
   - Device-type allow/block

4. Cross-check the user's group membership in Entra: **Groups** > **[user's assigned group]** > **Members** — confirm the user is a member of a group the policy applies to.

5. Cross-reference: the shared enrollment-restrictions concept is documented at [iOS Admin Setup Overview § Intune Enrollment Restrictions](../admin-setup-ios/00-overview.md#intune-enrollment-restrictions) — include this link in the escalation packet.

6. Note which specific restriction setting would block this user's enrollment attempt based on user context (personal-owned device blocked, platform blocked, OS version gate too high, enrollment type not permitted, etc.).

## Admin Action Required

L1 documents and hands this packet to the Intune admin. L1 does not execute.

**Ask the admin to:**
- Review the device platform restriction policy assigned to the user's group at **Devices** > **Device onboarding** > **Enrollment** > **Device platform restriction** (P-05).
- Adjust the specific blocking setting based on L1's finding:
  - If Personal-owned is blocked and the device is personal → flip to Allow (or assign the user to a corporate-allow group).
  - If platform iOS/iPadOS is blocked → flip to Allow.
  - If OS version gate is too high → relax the gate or confirm the device meets the minimum version.
- Reference: [iOS Admin Setup Overview § Intune Enrollment Restrictions](../admin-setup-ios/00-overview.md#intune-enrollment-restrictions).

**Verify:**
- User retries enrollment; the device enrolls successfully and appears in **Devices** > **All devices** > **iOS/iPadOS** (P-04).

**If the admin confirms the restriction is intentional:**
- Proceed to [Escalation Criteria](#escalation-criteria) — a policy exception or user group change is needed (out of L1 and typical admin scope).

## Escalation Criteria

Escalate to Intune Admin / L2 if:

- Restriction is intentional and cannot be changed — requires a policy exception with security or IT-leadership approval.
- User's group membership is incorrect — requires Entra admin action to re-assign the user to the correct group.
- Admin adjusts the restriction but enrollment still fails — the restriction was not the root cause; further investigation required.
- L1 cannot access the enrollment restriction blade (insufficient portal permissions).

**Before escalating, collect:**

- Device serial number (Settings > General > About > Serial Number)
- User UPN
- User's Entra group membership list
- Screenshot of the device platform restriction policy showing the blocking setting
- User-visible error string (screenshot or verbatim)
- Description of steps already attempted

See [iOS Log Collection Guide](../l2-runbooks/14-ios-log-collection.md) and [ADE Token & Profile Delivery Investigation](../l2-runbooks/15-ios-ade-token-profile.md) for advanced enrollment investigation (restriction-specific diagnosis uses token/profile investigation; there is no dedicated L2 restriction runbook). For enrollment restriction configuration reference, see [iOS Admin Setup Overview](../admin-setup-ios/00-overview.md).

---

[Back to iOS Triage](../decision-trees/07-ios-triage.md)

## Related Resources

- [Runbook 20: Device Cap Reached](20-ios-device-cap-reached.md) — For enrollment failures where the user specifically saw "device limit reached" or "too many devices" (`DeviceCapReached`). This runbook (18) covers CONFIG BLOCKS; runbook 20 covers QUOTA EXHAUSTION.
- [iOS Admin Setup Overview § Intune Enrollment Restrictions](../admin-setup-ios/00-overview.md#intune-enrollment-restrictions) — Enrollment restriction configuration reference.
- [iOS Triage Decision Tree](../decision-trees/07-ios-triage.md) — iOS/iPadOS failure routing.

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-17 | Resolved Phase 31 L2 cross-references | -- |
| 2026-04-17 | Initial version | -- |
