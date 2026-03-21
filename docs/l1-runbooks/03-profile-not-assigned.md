---
last_verified: 2026-03-20
review_by: 2026-06-18
applies_to: APv1
audience: L1
---

> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

# Autopilot Profile Not Assigned

Use this runbook when a device is registered in the [Autopilot](../_glossary.md#autopilot) portal but no [deployment profile](../_glossary.md#apv1) is assigned to it. It covers checking group membership, adding the device to the correct group, and collecting data before escalation.

## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com) with permissions to view Autopilot devices and [Azure AD](../_glossary.md#hybrid-join) groups
- Device serial number confirmed
- Verified: device IS registered in the Autopilot portal (search returned a result in **Devices** > **Windows** > **Enrollment** > **Windows Autopilot devices**)
- Verified: network connectivity is working (device can reach https://login.microsoftonline.com)

## Steps

1. Open the Intune admin center (https://intune.microsoft.com).

2. Navigate to **Devices** > **Windows** > **Enrollment** > **Windows Autopilot devices**.

3. Search for the device serial number. Click on the device entry.

4. Check the **Profile** column. Note the current profile assignment status:
   - **"Assigned"** — a profile is assigned. Skip to step 10.
   - **"Not assigned"** — profile is NOT assigned. Continue to step 5.
   - **"Pending"** — profile assignment is in progress. Skip to step 10.

5. Determine which [Azure AD](../_glossary.md#hybrid-join) group the deployment profile targets. Navigate to **Devices** > **Enrollment** > **Windows Autopilot** > **Deployment Profiles** > select the expected profile > **Assignments**. Note the target group name.

6. Check if the device is a member of the target group. Navigate to **Groups** > search for the group name > **Members**. Search for the device by name or serial number.

7. If the device is NOT in the group: add it. For static groups, click **Members** > **Add members** and search by device name or serial number.

   > **Say to the user:** "I've added your device to the correct group. The profile should apply within a few minutes. I'll monitor this and let you know when it's ready."

8. If the device IS in the group but the profile still shows "Not assigned": this is beyond L1 scope — proceed to Escalation Criteria.

9. After adding the device to the group, wait for the profile to assign. Refresh the Autopilot devices page every 5 minutes.
   - Static group assignment: profile available within 1–5 minutes after the admin adds the device.
   - Dynamic group evaluation: 5–15 minutes for simple rules; up to 24 hours for complex rules in large tenants (see [Profile Assignment lifecycle guide](../lifecycle/02-profile-assignment.md) for details).
   - If status has not changed after 30 minutes, proceed to Escalation Criteria.

10. If the profile status is "Assigned" or has just become assigned: trigger a sync on the device. Navigate to **Devices** > **Windows** > find the device > **Sync**.

    > **Say to the user:** "Your device has a profile assigned. I'm triggering a sync now. Please restart the device and try the setup process again. This typically takes 5–10 minutes."

11. After sync and reboot, ask the user to retry [OOBE](../_glossary.md#oobe). If provisioning proceeds normally, the issue is resolved.

12. If provisioning still fails after sync and reboot, proceed to Escalation Criteria.

## Escalation Criteria

Escalate to L2 if:

- Device is in the correct group but the profile still shows "Not assigned" after 30 minutes
- The wrong profile is assigned (requires admin correction — not L1 scope)
- Profile shows "Assigned" but the device fails to apply it after sync and reboot
- You cannot determine which group the deployment profile targets

**Before escalating, collect:**

- Device serial number
- Group name the device was added to (or the group it was already in)
- Timestamp when group change was made (if applicable)
- Deployment mode (user-driven, pre-provisioning, or self-deploying)
- Current profile status shown in the Autopilot device record (screenshot if possible)
- Any error messages visible in the portal

See [L2 Runbooks](../l2-runbooks/00-index.md) for assignment filter and Graph API investigation.

---

[Back to Profile Assignment Tree](../decision-trees/02-profile-assignment.md) | [Back to Initial Triage](../decision-trees/00-initial-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-03-20 | Initial version | — |
