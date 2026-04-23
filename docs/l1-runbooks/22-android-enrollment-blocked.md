---
last_verified: 2026-04-23
review_by: 2026-06-22
applies_to: all
audience: L1
platform: Android
---

> **Platform gate:** This guide covers Android enrollment/compliance troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks).

# Android Enrollment Blocked

L1 runbook for Android devices that cannot enroll in Intune because the Enrollment Restrictions blade is blocking the device's platform or ownership type. Applies to all GMS modes (BYOD, COBO, Dedicated, ZTE — AOSP is out of scope in v1.4).

## Symptom

One or more of the following:

- User reports their Android device cannot enroll; Company Portal or Microsoft Intune app shows a generic "Can't enroll," "Your organization's IT policy requires...," or "This device cannot enroll" message without a specific actionable reason shown to the user.
- Admin-visible in Intune: the enrollment failure reason indicates that the device's platform or ownership type is blocked under Enrollment Restrictions. [MEDIUM: learn.microsoft.com/en-us/intune/intune-service/enrollment/device-enrollment, last_verified 2026-04-23]
- Common ticket phrasings: "my phone won't connect to work," "Company Portal says I can't enroll," "enrollment failed" without a specific error code. [MEDIUM: community ticket phrasing survey, last_verified 2026-04-23]

Routed here from the [Android Triage Decision Tree](../decision-trees/08-android-triage.md) ANDR22 branch.

> **Disambiguation:** If the user (or enrollment flow) did NOT see any "enrollment blocked" or restriction-specific message and the device simply never appeared in Intune, see [Runbook 24: Android Device Not Enrolled](24-android-device-not-enrolled.md) instead. If the device enrolled successfully (visible in Intune) but no work profile was created (BYOD only), see [Runbook 23: Android Work Profile Not Created](23-android-work-profile-not-created.md).

## L1 Triage Steps

L1 Triage Steps are read-only checks. L1 does NOT modify any enrollment restriction setting — that is an admin action (see [Admin Action Required](#admin-action-required) below).

1. > **Say to the user:** "Let me check the enrollment policy for your device. I may need to escalate this to an administrator if a policy is blocking the enrollment."

2. Open the Intune admin center at `https://intune.microsoft.com`. Sign in with your Help Desk Operator or Read Only Operator role. <!-- verify UI at execute time -->

3. Navigate to **Devices > Device onboarding > Enrollment > Device platform restriction**. Select the **Android restrictions** tab along the top of the page. [VERIFIED: learn.microsoft.com/en-us/mem/intune/enrollment/create-device-limit-restrictions, updated 2026-04-16] <!-- verify UI at execute time -->

4. Review the active Android device platform restriction policies listed. For the policy assigned to the user's group, note whether:
   - The **Personally-owned** column shows "Block" for the relevant Android Enterprise type (blocks BYOD work-profile enrollment)
   - The **Corporate-owned** column shows "Block" (blocks COBO, Dedicated, and ZTE enrollment)
   - The user's group is in scope of a policy whose Android Enterprise type is set to "Block"

5. Also check **Devices > Device onboarding > Enrollment > Device limit restriction** for the user's group. A device-cap hit presents similarly to a platform restriction block to the user. Document which blade — platform restriction or device limit — appears to be the blocking condition.

6. Collect the following observed state for the escalation packet:
   - Name of the restriction policy assigned to the user's group
   - Which column shows "Block" (Personally-owned vs Corporate-owned; and which Android Enterprise sub-type if visible)
   - User's UPN
   - Device serial number (if collected at enrollment attempt)
   - Device make and model, and Android OS version (if known)

## Admin Action Required

L1 documents and hands this packet to the Intune administrator. L1 does not execute any of the following actions.

**Ask the admin to:**

- Review the Enrollment Restrictions policy assigned to the user's group at **Devices > Device onboarding > Enrollment > Device platform restriction > Android restrictions**. Identify the policy in scope for the user.
- If the user's Android ownership type should be allowed: set the blocked column (Personally-owned or Corporate-owned) to **Allow** in the applicable policy, OR assign the user to a policy that already allows their device type.
- If the user is hitting the **device limit restriction** instead: review **Devices > Device onboarding > Enrollment > Device limit restriction** for the user's group, then either raise the device cap or remove an unused device from the user's Intune device inventory.
- For BYOD enrollment restriction configuration, see [BYOD Work Profile Admin Guide](../admin-setup-android/04-byod-work-profile.md). For Fully Managed (COBO), see [Fully Managed COBO Admin Guide](../admin-setup-android/03-fully-managed-cobo.md).

**Verify:**

- After the admin saves the policy change, ask the user to retry enrollment from their device. On success, the Android device appears in **Intune admin center > Devices > All devices** (filter: platform = Android) within approximately 10 minutes. The device shows "Enrolled" status.
- Optional: have the admin confirm on the enrollment restrictions blade that the policy scope and assignments now reflect the change.

**If the admin confirms none of the above applies:**

- Proceed to [Escalation Criteria](#escalation-criteria).

## Escalation Criteria

Escalate to L2 (or to the Intune admin directly if not already done). Android L2 investigation runbooks (Phase 41) will live in `docs/l2-runbooks/` — use the L2 runbook index once Phase 41 ships.

Escalate to L2 if:

- The enrollment restrictions blade shows no "Block" for the user's device type AND the user is not at device cap, yet enrollment still fails
- The admin has updated the policy AND the user has retried enrollment, but the device still fails to enroll after 30 minutes
- The on-device error is a specific error code (not a generic restriction message) — this indicates a different failure class; route via L2
- The device appears in Intune after the admin policy change but then disappears or immediately shows a compliance failure — this is a separate symptom class (see [Runbook 25: Android Compliance Blocked](25-android-compliance-blocked.md))

**Before escalating, collect:**

- Device serial number
- Device make and model (manufacturer and product name)
- Android OS version
- User UPN
- Screenshot of **Devices > Device onboarding > Enrollment > Device platform restriction > Android restrictions** showing the policy assigned to the user's group and the Block/Allow column state
- Screenshot of **Devices > Device onboarding > Enrollment > Device limit restriction** for the user's group (to rule out the device-cap path)
- Timestamp of the failed enrollment attempt
- Exact on-device message text, if the user can reproduce the error

---

[Back to Android Triage](../decision-trees/08-android-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-23 | Initial version | -- |
