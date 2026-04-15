---
last_verified: 2026-04-14
review_by: 2026-07-13
applies_to: ADE
audience: L1
platform: macOS
---

> **Platform gate:** This guide covers macOS ADE troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks).

# macOS Company Portal Sign-In Failure

Use this runbook when a user cannot sign into the Company Portal app on their Mac, when Company Portal is not installed on the device, or when Company Portal is installed but the user's device does not appear as registered in Entra ID. Company Portal is required to complete user affinity registration, register the device in Entra ID, and access VPP "Available" apps.

## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com)
- Access to Microsoft Entra admin center (https://entra.microsoft.com) — read-only is sufficient
- Device serial number
- User's UPN (email address)

## Steps

1. > **Say to the user:** "The Company Portal app is required to complete your device setup and access company resources like email and Teams. Let's check if it's installed correctly."

2. Ask the user: "Is the Company Portal app present in your Applications folder or Launchpad?" Have them search "Company Portal" in Spotlight (Cmd+Space).

3. **If Company Portal is not installed:** Navigate to Intune admin center > **Apps** > **macOS**. Search for "Company Portal". Open the app record and select **Device install status**. Find this device by serial number.

4. If Company Portal does not have a Required assignment for this device's group: this is the root cause. Navigate to **Apps** > **macOS** > Company Portal > **Properties** > **Assignments** and confirm Company Portal is assigned as **Required** to the device group. If not, proceed to [Escalation Criteria](#escalation-criteria) — adding or correcting app assignments may require admin action.

5. If Company Portal is assigned as Required but shows "Pending" install status: trigger a sync. Navigate to **Devices** > **macOS** > [device] > **Sync**. Wait 10 minutes. Company Portal must be installed before the user can sign in.

6. **If Company Portal is installed but the user cannot sign in:** Ask the user to describe the error. Common scenarios:
   - "Incorrect credentials" — confirm the user is entering their corporate UPN (user@domain.com), not a personal account
   - Sign-in page loops or times out — Conditional Access may be blocking sign-in before registration is complete (enrollment chicken-and-egg scenario)
   - No error but device does not appear registered — user may have dismissed the registration prompt

7. Ask the user: "After opening Company Portal and signing in, did you see a prompt that said 'Register this device' or 'Get started'?" If the user dismissed this prompt, registration did not complete.

8. Have the user open Company Portal, sign in with their corporate credentials, and follow any "Register" or "Set up" prompts through to completion. This step registers the device in Entra ID.

9. After the user completes Company Portal sign-in and registration, verify in Entra admin center (https://entra.microsoft.com) > **Devices** > **All devices**. Search for the device or user. The device should appear with Join type "Registered" and Compliance state updating within 15 minutes.

10. > **Say to the user:** "Company Portal registration is now complete. Your device should now be able to access company resources. Please try opening your email or Teams again. It may take up to 15 minutes for access to be fully restored."

## Escalation Criteria

Escalate to L2 if:

- Company Portal app is missing from Intune app assignments (requires admin to add assignment)
- Company Portal shows persistent "Failed" install status after a sync
- User completes Company Portal sign-in and registration but Entra device record does not appear after 15 minutes
- Conditional Access is blocking the Company Portal sign-in before registration can complete (access-before-registration chicken-and-egg loop)
- User receives a specific error code during Company Portal sign-in

**Before escalating, collect:**

- Device serial number
- User UPN (email address)
- Company Portal version (visible in Company Portal > Menu > Help, if accessible)
- Screenshot of Company Portal installation status in Intune (Devices > macOS > [device] > Managed apps, or Apps > macOS > Company Portal > Device install status)
- Whether Entra device record exists (yes / no)
- Error message or code displayed during sign-in (exact text)
- Whether the user was prompted to "Register" during Company Portal and whether they completed that step

See [macOS L2 Runbooks](../l2-runbooks/00-index.md) for Company Portal and Entra registration investigation. For ADE lifecycle Stage 6 context, see [macOS ADE Lifecycle](../macos-lifecycle/00-ade-lifecycle.md#stage-6-company-portal).

---

[Back to macOS ADE Triage](../decision-trees/06-macos-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-14 | Initial version | -- |
