---
last_verified: 2026-04-12
review_by: 2026-07-11
applies_to: APv2
audience: L1
---

> **Version gate:** This guide covers an APv2 Device Preparation conflict scenario. For Windows Autopilot (classic) troubleshooting, see [Initial Triage Decision Tree](../decision-trees/00-initial-triage.md).

# APv1 Registration Conflict -- ESP Appeared During APv2 Deployment

Use this runbook when a device expected to go through APv2 Device Preparation instead showed the Enrollment Status Page (ESP). This indicates the device has an active APv1 Autopilot registration that took precedence over the APv2 Device Preparation policy.

## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com) with at least read permissions to Windows Autopilot devices
- Device serial number from the physical device label, BIOS, or user report
- Confirmed: user expected APv2 Device Preparation deployment, but saw ESP instead

## Steps

1. Open the Intune admin center (https://intune.microsoft.com).

2. Navigate to **Devices** > **Windows** > **Enrollment** > **Windows Autopilot devices**.

3. In the search box, enter the full device serial number exactly as it appears.

4. If the device appears in the list: note the assigned profile name. This confirms an APv1 registration is active and explains why ESP appeared.

5. > **Say to the user:** "Your device has an existing Autopilot registration that is overriding the newer Device Preparation setup. This is expected behavior -- the older registration takes priority. I'm going to escalate this to our admin team to resolve the registration conflict."

6. Navigate to **Devices** > **Windows** > **Enrollment** > **Windows Autopilot deployment profiles**. Verify whether any profile targets a group containing this device. Note the profile name.

7. If the device was NOT found in step 4: this is an unexpected state -- ESP appeared but no APv1 registration exists. Skip to Escalation Criteria.

8. > **Say to the user:** "The resolution requires an admin to deregister the device from the classic Autopilot service before the newer setup will work. Expected timeline: [your org's SLA]. I'll update your ticket when the change is complete."

## Escalation Criteria

Escalate to L2 if:

- APv1 registration confirmed (step 4): escalate to admin team for device deregistration (L1 does not perform deregistration -- this requires admin permissions and the [APv2 prerequisites](../lifecycle-apv2/01-prerequisites.md) process)
- No APv1 registration found but ESP appeared (step 7): escalate to L2 -- this is an edge case L1 cannot resolve

**Before escalating, collect:**

- Device serial number
- APv1 registration status (found / not found)
- Assigned APv1 deployment profile name (if found)
- Screenshot of the screen the user saw (ESP vs Device Preparation)

**L2 escalation path:** L2 runbooks index (Phase 14 -- to be created)

---

[Back to APv2 Triage Tree](../decision-trees/04-apv2-triage.md)

## See Also

- [APv2 Prerequisites](../lifecycle-apv2/01-prerequisites.md) -- Includes APv1 deregistration as prerequisite 0
- [APv1 vs APv2](../apv1-vs-apv2.md) -- Framework comparison and selection guidance
- [Initial Triage Decision Tree](../decision-trees/00-initial-triage.md) -- APv1 triage if the device should remain on classic Autopilot

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-12 | Initial version | -- |
