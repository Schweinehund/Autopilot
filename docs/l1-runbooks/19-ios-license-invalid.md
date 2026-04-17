---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: all
audience: L1
platform: iOS
---

> **Platform gate:** This guide covers iOS/iPadOS troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).

# iOS License Invalid

Use this runbook when an iOS/iPadOS user sees "User Name Not Recognized" during enrollment, OR when enrollment appears to complete successfully for the user but the device never appears in Intune admin center and no MDM profile installs on the device. Both are symptoms of missing or inappropriate Intune licensing on the user's account.

> **L1 prerequisite access:** This runbook requires either Microsoft 365 admin center OR Microsoft Entra admin center access with permission to view user license assignments. If you do not have this access, jump directly to [Escalation Criteria](#escalation-criteria) with the user's UPN documented — the Intune-only L1 agent cannot complete license verification alone.

## Symptom

- **Stage-1 device-visible error:** `"User Name Not Recognized. This user account isn't authorized to use Microsoft Intune. Contact your system administrator if you think you have received this message in error."`
- **Stage-1 alternate error surface:** `"Your IT admin hasn't given you access to use this app. Get help from your IT admin or try again later."`
- **Error code (if screenshotted):** `UserLicenseTypeInvalid`
- **Stage-2 silent manifestation:** The user reports the enrollment sign-in flow appeared to succeed — they completed the password and MFA steps — but the device is NOT visible in Intune admin center under Devices > iOS/iPadOS, and NO MDM profile was installed on the device. This manifests as "nothing happened" and is easily confused with a network issue. See the [Configuration-Caused Failures table in the Device Enrollment guide](../admin-setup-ios/07-device-enrollment.md) for the in-repo documentation of this pattern.

Routed here from the [iOS Triage Decision Tree](../decision-trees/07-ios-triage.md) IOSR4 "'User Name Not Recognized' or 'License not assigned'" branch.

## L1 Triage Steps

1. > **Say to the user:** "Thank you for reaching out. I'm checking your account and device registration — this should only take a few minutes."

2. Collect the user's UPN (`user@domain.com` format). Confirm the exact format with the user — typos in the UPN are a common source of confusion. Record the UPN in your ticket.

3. Navigate to **P-04**: `Devices > All devices > iOS/iPadOS`. Search by the user's UPN OR by device serial number if the user has it. Record the following:
   - Device present: Y / N
   - If present: enrollment type, ownership type, last check-in timestamp
   - If present but last check-in is stale (>24 hours) or MDM profile state is unhealthy — treat this as a Stage-2 silent candidate and continue triage.

4. If the device is NOT present in Intune and the user reports "nothing happened": this is the Stage-2 silent-failure pattern. Continue to step 5 to verify license status.

5. Navigate to **P-10** — second portal (requires the prerequisite access noted above):
   `Microsoft 365 admin center (https://admin.microsoft.com) > Users > Active Users > [user]`

   Verify the user has an Intune-eligible license listed under **Product licenses**. Look for any of the following:
   - Intune Plan 1
   - Intune Plan 2
   - EMS E3 / E5 (includes Intune Plan 1 or 2)
   - Microsoft 365 E3 / E5 (includes Intune)

   Record: the license SKUs currently assigned to the user.

6. If **NO Intune-eligible license** is assigned: proceed to [Admin Action Required](#admin-action-required).

7. If an **Intune-eligible license IS assigned** and enrollment still fails: the failure is not a license assignment issue. Proceed to [Escalation Criteria](#escalation-criteria) — common alternate causes include MDM authority misconfiguration, Entra sync delay, or Conditional Access blocking the enrollment endpoint.

8. If the **user's UPN is NOT found** in Active Users: the user account does not exist in the tenant or there is an Entra sync issue. Proceed to [Escalation Criteria](#escalation-criteria) with a note that account existence could not be confirmed.

## Admin Action Required

L1 documents and hands this packet to the Intune admin. L1 does not execute these steps.

**Ask the admin to:**
- In Microsoft 365 admin center, navigate to `Users > Active Users > [affected user] > Product licenses > Edit`.
- Assign an Intune-eligible license:
  - Intune Plan 1 (standard Intune)
  - Intune Plan 2 (advanced management features)
  - EMS E3 / E5 (includes Intune Plan 1/2)
  - Microsoft 365 E3 / E5 (includes Intune)
- Reference documentation: [Microsoft Learn — Intune license assignment](https://learn.microsoft.com/intune/fundamentals/licenses-assign).

**Verify:**
- License appears assigned on the user's Product licenses pane.
- User restarts the Company Portal app (or power-cycles the device) and retries enrollment within 15–30 minutes after license assignment.
- Device appears in **P-04** (`Devices > All devices > iOS/iPadOS`) and shows a recent "Last check-in" timestamp.

**If the admin confirms the user already has an Intune-eligible license:**
- The failure is not license assignment. Proceed to [Escalation Criteria](#escalation-criteria). Common other causes: MDM authority mis-set, Entra sync delay, Conditional Access pre-enrollment block.

## Escalation Criteria

Escalate to L2 / Intune Admin if:

- L1 does not have Microsoft 365 admin center or Microsoft Entra admin center access — cannot verify license status (the prerequisite gap above applies)
- An Intune-eligible license IS assigned and enrollment error persists after 30 minutes
- The user's UPN is not found in Active Users (Entra sync or account provisioning issue)
- Admin assigns license, user retries, error persists after 60 minutes

**Before escalating, collect:**

- User UPN (`user@domain.com`)
- Device serial number (if available — Settings > General > About > Serial Number)
- Screenshot of Stage-1 error message if the user captured it
- Error code from screenshot if visible (e.g., `UserLicenseTypeInvalid`)
- Product licenses output: either "license assigned — SKUs listed: [list]", or "no Intune license — current SKUs listed: [list]", or "access denied — L1 could not verify"
- Whether this is Stage-1 (device showed an error) or Stage-2 (silent — nothing happened) per L1's observation
- Intune P-04 screenshot showing device absent, OR device present but with stale check-in / unhealthy MDM profile state

See [iOS Log Collection Guide](../l2-runbooks/14-ios-log-collection.md) — the MDM diagnostic report surfaces license assignment state. For ADE-path license failures, also see [ADE Token & Profile Delivery Investigation](../l2-runbooks/15-ios-ade-token-profile.md).

For admin configuration references:
- [iOS Device Enrollment Guide](../admin-setup-ios/07-device-enrollment.md) — Stage-2 silent-failure pattern documented in the Configuration-Caused Failures table
- [Microsoft Learn — Intune license assignment](https://learn.microsoft.com/intune/fundamentals/licenses-assign) (external)

---

[Back to iOS Triage](../decision-trees/07-ios-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-17 | Resolved Phase 31 L2 cross-references | -- |
| 2026-04-17 | Initial version | -- |
