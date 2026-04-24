---
last_verified: 2026-04-23
review_by: 2026-06-22
applies_to: all
audience: L1
platform: Android
---

> **Platform gate:** This guide covers Android enrollment/compliance troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks).

# Android Device Not Enrolled

L1 catch-all runbook for Android devices that never appeared in Intune after an enrollment attempt — no visible restriction error, no work-profile-creation failure signature. Applies to all GMS modes (BYOD, COBO, Dedicated, ZTE). Sibling runbooks cover adjacent symptoms; use the cross-links in the Symptom section to route correctly.

## Symptom

Device was attempted to be enrolled (corporate IT-provisioned, user self-enrolled via Company Portal / Microsoft Intune app, or device was shipped via Zero-Touch) but the device never appeared in Intune admin center > Devices > All devices (filter: Android). No specific "enrollment blocked" error was shown to the user; no work profile container appeared on the device (BYOD).

Common ticket phrasings: "my device isn't showing up in the system," "IT can't find my phone," "enrollment never finished," "my new corporate phone didn't enroll." [MEDIUM: MS Learn troubleshoot-android-enrollment + community sources, last_verified 2026-04-23]

Routed here from the [Android Triage Decision Tree](../decision-trees/08-android-triage.md) ANDR24 branch ("device never appeared in Intune — no restriction error visible").

> **Disambiguation (critical — follow the correct sibling runbook):**
> - If the user reported a visible "enrollment blocked" or restriction-specific error (e.g., "Your organization's IT policy requires..."), see [Runbook 22: Android Enrollment Blocked](22-android-enrollment-blocked.md).
> - If the device IS visible in Intune (enrollment succeeded) but no work profile / no briefcase badge / work apps never appeared (BYOD only), see [Runbook 23: Android Work Profile Not Created](23-android-work-profile-not-created.md).
> - If the failure is specifically a Zero-Touch enrollment that never initiated (device booted into consumer setup despite ZTE provisioning), see [Runbook 27: Android ZTE Enrollment Failed](27-android-zte-enrollment-failed.md) for ZTE-specific Cause A-D investigation.

## L1 Triage Steps

L1 Triage Steps are read-only checks. L1 does NOT modify enrollment configuration — that is an admin action.

1. > **Say to the user:** "I'm checking whether your device reached Intune successfully. If it didn't, I may need to coordinate with an administrator to verify the enrollment setup for your device type."

2. Open Intune admin center at `https://intune.microsoft.com`. Navigate to **Devices > All devices**; filter platform = Android. <!-- verify UI at execute time -->

3. Search for the device by serial number, IMEI, or user UPN. Confirm the device is NOT in the list (if found, this is NOT runbook 24 — check the other disambiguation paths in the Symptom section above).

4. Verify the user has an active Intune license:
   - Navigate to **Users > All users > [user] > Licenses**. Confirm the user is assigned a license that includes Intune (e.g., Intune Plan 1, Microsoft 365 E3/E5, EMS E3/E5).
   - If no Intune license is found — this is the blocker; admin must assign one.

5. As a pre-emptive check, review **Devices > Device onboarding > Enrollment > Device platform restriction > Android restrictions** for the user's group. If a Block is present for the user's device type, stop — this is actually [Runbook 22: Android Enrollment Blocked](22-android-enrollment-blocked.md). <!-- verify UI at execute time -->

6. Check the enrollment profile assignment for the user's mode:
   - **BYOD Work Profile:** `Devices > Android > Android enrollment > Personally-owned devices with work profile`
   - **COBO (Fully Managed):** `Devices > Android > Android enrollment > Corporate-owned, fully managed user devices`
   - **Dedicated (COSU):** `Devices > Android > Android enrollment > Corporate-owned dedicated devices`
   - **ZTE:** Confirm the ZT portal has the device uploaded AND a configuration assigned — admin escalation required; see [Runbook 27: Android ZTE Enrollment Failed](27-android-zte-enrollment-failed.md) for ZTE-specific investigation.
   - Each enrollment mode has its own profile structure; confirm the user's group has an applicable profile assigned for their mode.

7. Document observed state: device mode (if known), whether the user has an Intune license, whether the enrollment profile for the mode is assigned to the user's group, time since enrollment attempt.

## Admin Action Required

L1 documents and hands this packet to the Intune administrator. L1 does not execute.

**Ask the admin to:**

- Confirm the user has an active Intune license (**Users > [user] > Licenses**). Assign one if missing.
- Verify the enrollment profile for the user's Android mode is assigned to a group that includes the user:
   - BYOD: see [BYOD Work Profile Admin Guide](../admin-setup-android/04-byod-work-profile.md) for enrollment profile assignment steps.
   - COBO: see [Fully Managed COBO Admin Guide](../admin-setup-android/03-fully-managed-cobo.md).
   - Dedicated: see [Dedicated Devices Admin Guide](../admin-setup-android/05-dedicated-devices.md).
   - ZTE: see [Zero-Touch Portal Admin Guide](../admin-setup-android/02-zero-touch-portal.md) — for ZTE-specific failures route to [Runbook 27: Android ZTE Enrollment Failed](27-android-zte-enrollment-failed.md).
- Verify the Managed Google Play binding is healthy (**Tenant admin > Connectors and tokens > Managed Google Play**) — required for BYOD, COBO, and Dedicated modes.
- If COBO or Dedicated: verify the enrollment token is valid and not expired.
- If BYOD: verify no custom OMA-URI profiles from pre-AMAPI (April 2025) migration are still assigned — they were removed from Intune and can cause enrollment to fail silently.

**Verify:**

- After admin action and user retries enrollment: device appears in **Intune > Devices > All devices** (filter: Android) within approximately 10–15 minutes.
- User completes the enrollment flow appropriate for their mode without looping back to consumer setup.

**If the admin confirms none of the above applies:**

- Proceed to [Escalation Criteria](#escalation-criteria).

## Escalation Criteria

Escalate to L2 (or to the Intune admin directly if not already done). See [Android Enrollment Investigation](../l2-runbooks/19-android-enrollment-investigation.md) (begin at Data Collection Step 1-4) and [Android Log Collection Guide](../l2-runbooks/18-android-log-collection.md).

Escalate to L2 if:

- User has an Intune license, enrollment profile is assigned, and device mode is confirmed AND the device still does not appear in Intune after 30 minutes of retry
- Multiple users exhibit the same symptom simultaneously — this is likely a tenant-configuration or connector issue requiring infrastructure investigation
- Device make/model is a niche OEM that may be misidentified as GMS — verify via [Android Triage](../decision-trees/08-android-triage.md) mode-gate before escalating
- User reports the enrollment flow looped back to consumer setup multiple times without completing
- Enrollment token (COBO/Dedicated) or Zero-Touch portal claim (ZTE) both appear valid but the device did not arrive in Intune — infrastructure or connector investigation required

**Before escalating, collect:**

- Device serial number (and IMEI if mobile)
- Device make, model, and manufacturer
- Android OS version and security patch level
- User UPN
- Device mode (BYOD / COBO / Dedicated / ZTE) — if unknown, escalate via ANDE2 route
- Whether the user has an Intune license (yes/no)
- Whether the enrollment profile for the user's mode is assigned to a group that includes the user (yes/no/unknown)
- Screenshot of **Intune > Devices > All devices** filtered search showing no match for this device
- Screenshot of the user's license assignments
- Timestamp of the enrollment attempt
- Which enrollment method was used (Company Portal / Microsoft Intune app / QR / NFC / afw#setup / Zero-Touch)

---

[Back to Android Triage](../decision-trees/08-android-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-23 | Resolved Phase 41 L2 cross-references | -- |
| 2026-04-23 | Initial version | -- |
