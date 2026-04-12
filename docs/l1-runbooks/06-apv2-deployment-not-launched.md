---
last_verified: 2026-04-12
review_by: 2026-07-11
applies_to: APv2
audience: L1
---

> **Version gate:** This guide covers Autopilot Device Preparation (APv2).
> For Windows Autopilot (classic), see [Initial Triage Decision Tree](../decision-trees/00-initial-triage.md).

# APv2 Deployment Experience Never Launched

Use this runbook when a device completed OOBE sign-in but the Device Preparation screen never appeared. The user went directly to the Windows desktop without any deployment progress indicator.

## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com) with at least read permissions to Device preparation policies and device enrollment
- Access to Entra admin center (https://entra.microsoft.com) with at least read permissions to device settings and mobility settings
- Device serial number from the physical device label, BIOS, or user report
- Confirmed: user signed in during OOBE but no deployment screen appeared (not "deployment started but failed")

## Steps

1. Open the Intune admin center (https://intune.microsoft.com).

2. Navigate to **Devices** > **Windows** > **Enrollment** > **Device preparation policies**.

3. Verify that at least one Device Preparation policy exists. If no policy exists: this is the cause. Inform the admin team that no Device Preparation policy is configured.

4. Select the Device Preparation policy. Verify that a **user group** is assigned in the policy's Assignments section. Note the group name.

5. Verify that a **device group** (Enrollment Time Grouping) is selected in the policy. Note the group name.

6. > **Say to the user:** "I'm checking your account and device configuration in our management system. This may take a few minutes."

7. Check whether the signing-in user is a member of the assigned user group: navigate to **Intune admin center** > **Groups** > search for the group name noted in step 4 > **Members**. Search for the user's name or UPN.

8. If the user is NOT a member of the assigned group: this is the likely cause. Inform the admin team that the user needs to be added to the Device Preparation policy's assigned group.

9. Verify the device OS version meets minimum requirements: Ask the user to check **Settings** > **System** > **About** and read the Windows version. APv2 requires Windows 11 22H2 or later with update KB5035942 or later installed.

10. Open the Entra admin center (https://entra.microsoft.com).

11. Navigate to **Identity** > **Devices** > **Device settings**. Verify that "Users may join devices to Microsoft Entra" is set to **All** or includes the user/group.

12. Navigate to **Identity** > **Mobility (MDM and WIP)** > **Microsoft Intune**. Verify that **MDM user scope** is set to **All** or includes the user/group. If set to **None**: this is the cause.

13. If applicable, check corporate identifiers: return to Intune admin center > **Devices** > **Windows** > **Enrollment** > **Corporate device identifiers**. If the organization uses enrollment restrictions that require corporate identifiers, verify the device's serial number or manufacturer/model is listed.

14. > **Say to the user:** "I've identified [finding from checks above]. I'm going to [action based on finding]. [Provide expected timeline based on your org's SLA.]"

## Escalation Criteria

Escalate to L2 if:

- All portal checks above are clear (policy exists, user in group, OS version correct, MDM scope set, Entra join allowed) but deployment still did not launch
- OS version appears correct but user is unsure about installed updates
- Multiple devices from the same user or location are affected (possible tenancy-level configuration issue)

**Before escalating, collect:**

- Device serial number
- OS version and build number (from Settings > System > About)
- Device Preparation policy name and assigned groups
- User group membership status (member / not member)
- MDM user scope setting (All / Some / None)
- Entra join permission setting
- Corporate identifier status (if applicable)

**L2 escalation path:** [APv2 L2 Runbooks](../l2-runbooks/00-index.md#apv2-autopilot-device-preparation-runbooks)

---

[Back to APv2 Triage Tree](../decision-trees/04-apv2-triage.md)

## See Also

- [APv2 Prerequisites](../lifecycle-apv2/01-prerequisites.md)
- [APv2 Deployment Flow](../lifecycle-apv2/02-deployment-flow.md)
- [APv1 vs APv2](../apv1-vs-apv2.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-12 | Initial version | -- |
