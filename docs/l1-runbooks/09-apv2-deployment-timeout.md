---
last_verified: 2026-04-12
review_by: 2026-07-11
applies_to: APv2
audience: L1
---

> **Version gate:** This guide covers Autopilot Device Preparation (APv2).
> For Windows Autopilot (classic), see [ESP Stuck or Failed runbook](02-esp-stuck-or-failed.md).

# APv2 Deployment Timed Out

Use this runbook when a device's Device Preparation deployment exceeded the configured timeout and was marked as failed. The Device Preparation screen may have shown a timeout error or the deployment report shows a timeout status.

## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com) with at least read permissions to Device preparation policies and deployment reports
- Device serial number or device name from the user
- Confirmed: Device Preparation screen appeared but deployment timed out before completing

## Steps

1. Open the Intune admin center (https://intune.microsoft.com).

2. Navigate to **Devices** > **Windows** > **Enrollment** > **Device preparation policies**.

3. Select the Device Preparation policy that applies to this device.

4. Check the **"Minutes allowed before device preparation fails"** setting. Note the current timeout value (default is 60 minutes).

5. Navigate to **Devices** > **Monitor** > **Windows Autopilot device preparation deployments**.

6. Locate the device's deployment record. Select it and review the **Apps** tab and **Scripts** tab.

7. Count the total number of apps and scripts assigned. Compare this count against the configured timeout value. A large number of apps (especially large Win32 apps or Microsoft 365 Apps) may require more time than the configured timeout allows.

8. > **Say to the user:** "The deployment on your device timed out before all configuration steps could complete. I'm checking whether the timeout setting needs to be adjusted. This happens occasionally with devices that have many apps to install."

9. Check whether this is a **Windows 365** (Cloud PC) deployment: navigate to the device record in **Devices** > **All devices** > search for the device > **Properties**. If the device is a Windows 365 Cloud PC, note this -- Windows 365 deployments had a known timeout issue that was resolved in the February 2026 update. If the deployment predates this fix, this may be the root cause.

10. > **Say to the user:** "I've identified the likely cause of the timeout. [If timeout too low: 'The deployment has more apps than the current timeout setting allows for. I'm reporting this to the admin team to adjust the timeout value.'] [If Windows 365 known issue: 'This appears to be related to a known issue with Cloud PC deployments that has since been fixed. A retry should resolve it.'] [If unclear: 'I'm going to escalate this to our technical team for further investigation.']"

## Escalation Criteria

Escalate to L2 if:

- Timeout value appears adequate for the number of apps/scripts assigned (timeout is not the root cause)
- Device is not a Windows 365 Cloud PC and app count does not explain the timeout
- Retry after timeout adjustment still results in timeout
- Multiple devices timing out with the same policy (possible systemic issue)

**Before escalating, collect:**

- Device serial number and device name
- Configured timeout value (minutes)
- Number of apps and scripts assigned
- List of app statuses at time of timeout (Installed / In progress / Failed / Skipped)
- Whether device is Windows 365 Cloud PC (yes / no)
- Date of deployment attempt (for Windows 365 known issue timeline)

**L2 escalation path:** L2 runbooks index (Phase 14 -- to be created)

---

[Back to APv2 Triage Tree](../decision-trees/04-apv2-triage.md)

## See Also

- [APv2 Apps Not Installed](07-apv2-apps-not-installed.md)
- [APv2 Deployment Flow](../lifecycle-apv2/02-deployment-flow.md)
- [APv2 Failure Catalog](../error-codes/06-apv2-device-preparation.md)
- [APv1 vs APv2](../apv1-vs-apv2.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-12 | Initial version | -- |
