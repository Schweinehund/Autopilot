---
last_verified: 2026-04-23
review_by: 2026-06-22
applies_to: BYOD
audience: L1
platform: Android
---

> **Platform gate:** This guide covers Android enrollment/compliance troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks).

# Android Work Profile Not Created

L1 runbook for BYOD Android devices where enrollment succeeded (device visible in Intune) but the work profile container was never created. Applies to BYOD Work Profile enrollment only — this symptom does not apply to COBO, Dedicated, or ZTE modes (they do not use a work profile container).

> **Mode scope reminder:** This runbook applies to BYOD Work Profile enrollments only. If the device's mode is unclear, return to the [Android Triage](../decision-trees/08-android-triage.md) mode-gate.

## Symptom

Three failure signatures are documented for work profile container-creation failure. Identify which signature most closely matches the observed state before proceeding to triage steps.

- **(a) Device is visible in Intune (enrollment succeeded) but no work profile badge appears on apps.** The user reports no briefcase badge on Outlook / Teams / other work apps, no separate "Work" section in the app launcher, and no work apps have arrived. The device shows in the Intune Devices list with "Enrolled" status but the on-device work profile container was never created.

- **(b) User reports the Microsoft Intune app (or Company Portal) hit an error during the "Set up your Work Profile" step, but the device still shows up in Intune Devices list afterward.** Partial enrollment: the device is recorded in Intune but work profile container creation failed mid-flow. The user may describe a "something went wrong" or similar on-screen error during setup.

- **(c) User completed enrollment and the device is visible in Intune with "Enrolled" status, but Required apps assigned to the user's group never installed.** The work profile may or may not be present on device — L1 must check both the Intune device detail pane and ask the user about on-device state.

Common ticket phrasings: "my work email app disappeared," "I enrolled but nothing installed," "no work profile showing," "no briefcase on my apps," "I set up my phone but work stuff never appeared." [MEDIUM: MS Learn troubleshoot-android-enrollment + community practitioner sources, last_verified 2026-04-23]

Routed here from the [Android Triage Decision Tree](../decision-trees/08-android-triage.md) ANDR23 branch.

> **Disambiguation — Runbook 23 vs 24:** If the device never appeared in Intune at all (not just "missing work profile" — actually invisible to admins in the Devices list), see [Runbook 24: Android Device Not Enrolled](24-android-device-not-enrolled.md) instead. The visibility distinction: Runbook 23 = device visible in Intune but work profile missing or container-creation failed; Runbook 24 = device not visible in Intune at all.

> **End-user flow reference:** For the user-facing BYOD enrollment steps (what the user should have seen during setup), see [Android Work Profile Setup (end-user guide)](../end-user-guides/android-work-profile-setup.md). L1 does NOT walk the user through these steps directly; if re-enrollment is needed after admin action, refer the user back to that guide.

## L1 Triage Steps

L1 Triage Steps are read-only checks in the Intune admin center. L1 does NOT execute work profile creation (a device-side flow) or modify policy — those are admin actions (see [Admin Action Required](#admin-action-required) below).

1. > **Say to the user:** "I'll check how your enrollment completed on our end. If your work profile didn't set up correctly, I'll need to coordinate with an administrator — you may need to re-enroll after they make a fix."

2. Open the Intune admin center at `https://intune.microsoft.com`. Navigate to **Devices > All devices** and filter Platform = Android. <!-- verify UI at execute time -->

3. Confirm the device is visible in the list. If absent, STOP and route to [Runbook 24: Android Device Not Enrolled](24-android-device-not-enrolled.md) — the device-not-visible state is a different failure class, not a work-profile-creation failure.

4. Click into the device detail pane. Observe and record the following fields:
   - **Ownership** — should show "Personal" for a BYOD work profile device
   - **Management name** — typically shows a BYOD naming pattern (e.g., user email prefix + device type)
   - **Enrollment type** — should show "Android Enterprise personally-owned work profile" (or similar label for AMAPI-enrolled BYOD) <!-- verify UI at execute time -->
   - **Compliance state** — note whether "Compliant" / "Not compliant" / "Not evaluated"
   - **Last check-in** — confirm the device is checking in recently (not stale or missing)

5. On the device detail pane, select the **Apps** tab. Observe install status for any Required app assignments:
   - Possible states: Installed, Not Installed, Failed, Install Pending, Not Applicable
   - Note which apps are "Not Installed" or "Failed" — this informs Signature (c) diagnosis.

6. Ask the user to confirm on-device state:
   - Is the **Microsoft Intune app** installed on the device? (Post-April 2025 AMAPI migration: Microsoft Intune app is the primary management app for BYOD Work Profile enrollment; Company Portal may also be present but the Intune app handles work profile creation for new enrollments.) [MEDIUM: MS Learn AMAPI migration context, last_verified 2026-04-23]
   - Does the user see a briefcase badge on any installed apps? Is there a separate "Work" section or "Work profile" area visible in the app launcher or device Settings?
   - If the user taps the notification bell (or settings) in Company Portal or the Microsoft Intune app, is the enrollment checklist fully completed?

7. Document the signature (a/b/c) that most closely matches and the enrollment-type label observed in Intune. Proceed to [Admin Action Required](#admin-action-required).

## Admin Action Required

L1 documents and hands this packet to the Intune administrator. L1 does not execute.

**Ask the admin to (select based on L1 triage finding):**

*Signature (a) — device enrolled but no work profile container visible on device:*
- Verify the user is not enrolled as **Android device administrator (legacy DA mode)** in Intune. The Enrollment type field in the device detail pane should show "Android Enterprise personally-owned work profile" — if it shows "Android device administrator," the device enrolled in legacy DA mode (which is deprecated; DA mode does not create a work profile container).
- Check the enrollment profile assignment at **Devices > Android > Android enrollment > Personally-owned devices with work profile** — confirm the user's group has an active BYOD work profile enrollment profile assigned. A missing or unscoped enrollment profile allows the device to enroll in DA mode by default. <!-- verify UI at execute time -->
- Review the BYOD Work Profile policy configuration at [BYOD Work Profile Admin Guide](../admin-setup-android/04-byod-work-profile.md) — verify policy assignments are targeting the user's group correctly.

*Signature (b) — enrollment error mid-flow during work profile setup:*
- Review Intune **Devices > Device onboarding > Enrollment** for enrollment failure records for this user; collect the specific error message or error code if visible. <!-- verify UI at execute time -->
- Verify AMAPI migration status in the tenant — custom OMA-URI profiles for BYOD Work Profile were removed from Intune in April 2025. Any legacy OMA-URI assignments targeting BYOD Work Profile must be removed, as they are incompatible with the post-AMAPI enrollment flow.
- Confirm Wi-Fi configuration requirements per the [BYOD Work Profile Admin Guide](../admin-setup-android/04-byod-work-profile.md) — post-AMAPI, Wi-Fi profiles for the work profile require certificate-based authentication; username/password Wi-Fi config no longer functions within the work profile.

*Signature (c) — device visible and work profile present, but Required apps not installed:*
- This symptom may indicate a Managed Google Play app-delivery failure rather than a work-profile-creation failure. If the work profile container is confirmed present (briefcase badge exists on other apps), consider routing to [Runbook 26: Android MGP App Not Installed](26-android-mgp-app-not-installed.md).
- If the work profile is absent AND apps are missing: follow Signature (a) admin actions first to resolve the container-creation issue, then re-verify app delivery.
- Verify the Managed Google Play binding is healthy: **Tenant admin > Connectors and tokens > Managed Google Play**. <!-- verify UI at execute time -->
- Verify app assignment scope includes the user's group in the app's assignment configuration in Intune.

**Verify:**

- After admin action and user re-enrollment: device appears in Intune with Ownership: Personal, Enrollment type showing "Android Enterprise personally-owned work profile," and the user reports a briefcase badge on work apps.
- If Signature (a) required removing a legacy DA enrollment and re-enrolling: the user must first remove the work profile (or factory-reset if DA mode doesn't have a work profile to remove), then re-enroll via the **Microsoft Intune app** (post-AMAPI primary enrollment app). Refer the user to [Android Work Profile Setup (end-user guide)](../end-user-guides/android-work-profile-setup.md) for the user-facing re-enrollment flow.

**If the admin confirms none of the above applies:**

- Proceed to [Escalation Criteria](#escalation-criteria).

## Escalation Criteria

Escalate to L2 (or to the Intune admin directly if not already done). See [Android Enrollment Investigation](../l2-runbooks/19-android-enrollment-investigation.md#pattern-a-work-profile-not-created-byod) (Pattern A — Work Profile Not Created) and [Android Log Collection Guide](../l2-runbooks/18-android-log-collection.md).

Escalate to L2 if:

- Admin has verified policy assignments and enrollment profile scope, user has re-enrolled, and the Signature (a/b/c) pattern persists
- On-device error during enrollment attempt (Signature b) is a specific error code not matching known AMAPI migration patterns (legacy OMA-URI, Wi-Fi cert)
- Multiple BYOD users in the same group exhibit the same signature simultaneously — indicates a tenant-wide policy or connector issue, not a per-user failure
- Device is running a non-standard Android build (modified OEM ROM, non-Google-certified device) that may not support work profile container creation
- Enrollment type in Intune shows an unexpected value that does not correspond to BYOD Work Profile enrollment

**Before escalating, collect:**

- Device serial number
- Device make, model, manufacturer, Android version, and security patch level
- User UPN
- Which signature (a/b/c) most closely matches the observation
- Screenshot of **Intune Devices > [device] detail pane** showing Ownership, Enrollment type, Compliance state, and Last check-in
- Screenshot of **Apps** tab of device detail pane showing Required app install status
- On-device error text or screenshot during enrollment attempt (if Signature b)
- Whether the enrollment attempt occurred before or after April 2025 (pre-AMAPI vs post-AMAPI enrollment flows differ in management app behavior)
- Whether the device was previously enrolled (and what the prior enrollment state was)

---

[Back to Android Triage](../decision-trees/08-android-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-23 | Resolved Phase 41 L2 cross-references | -- |
| 2026-04-23 | Initial version | -- |
