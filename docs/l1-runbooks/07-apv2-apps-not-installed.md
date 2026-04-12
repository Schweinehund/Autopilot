---
last_verified: 2026-04-12
review_by: 2026-07-11
applies_to: APv2
audience: L1
---

> **Version gate:** This guide covers Autopilot Device Preparation (APv2).
> For Windows Autopilot (classic), see [ESP Stuck or Failed runbook](02-esp-stuck-or-failed.md).

# APv2 Apps and Scripts Not Installed

Use this runbook when a device went through Device Preparation but expected apps or scripts are missing, failed to install, or were skipped. This covers LOB apps, Microsoft 365 apps, Win32 apps, Microsoft Store apps, and platform scripts assigned through the Device Preparation policy.

## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com) with at least read permissions to device deployments and app assignments
- Device serial number or device name from the user
- Confirmed: Device Preparation screen appeared and completed (or timed out), but expected apps are missing from the device

## Steps

1. Open the Intune admin center (https://intune.microsoft.com).

2. Navigate to **Devices** > **Monitor** > **Windows Autopilot device preparation deployments**.

3. Locate the device's deployment record by searching for the device name or serial number. Select the record.

4. Select the **Apps** tab. Review the status of each app:
   - **Installed** -- app deployed successfully (no action needed)
   - **In progress** -- app still installing (may resolve on its own)
   - **Failed** -- app attempted to install but encountered an error
   - **Skipped** -- app was expected but was bypassed

5. > **Important:** A **Skipped** status does not mean the app is optional. It means the app was selected in the Device Preparation policy but was bypassed due to a configuration gap. Treat Skipped with the same urgency as Failed.

6. Select the **Scripts** tab. Review the status of each script. If any script shows **Failed**: note the script name and skip to step 12 (script failures require L2 investigation).

7. For each app with **Failed** status: navigate to **Apps** > **All apps** > search for the app name > **Properties** > **Assignments**. Check the **Install context**: it must be **System** (not **User**). If set to User: this is the likely cause -- inform the admin team that the app assignment context must be changed to System for Device Preparation deployments.

8. > **Say to the user:** "I'm checking the configuration of the apps that didn't install on your device. This may take a few minutes while I review each app."

9. For each app with **Skipped** status: navigate to **Apps** > **All apps** > search for the app name > **Properties** > **Assignments**. Verify that the Enrollment Time Grouping (ETG) device group is listed in the assignment targets. If the ETG group is NOT in the assignment list: this is the likely cause.

10. For Skipped Win32, Microsoft Store, or EAC apps where the ETG group IS correctly assigned: navigate to **Endpoint security** > **App control for business**. Check whether a **Managed Installer** policy is active. An active Managed Installer policy is a known issue that can cause apps to be skipped (resolved in April 2026 update). Note this finding.

11. > **Say to the user:** "I've found [number] app(s) with installation issues. [Describe findings: wrong context / missing group assignment / known issue]. I'm going to [report to admin team / escalate for further investigation]. Expected timeline: [your org's SLA]."

12. **Script failure fork:** If any script shows Failed status with correct assignment (ETG group is assigned, context is System): script failures require log analysis that is beyond L1 scope. Proceed directly to escalation.

## Escalation Criteria

Escalate to L2 if:

- App shows Failed status with correct install context (System) and correct ETG group assignment
- Script shows Failed status (all script failures require L2 log analysis)
- Multiple apps show Skipped despite correct ETG assignment and no Managed Installer policy
- Deployment report is not available or shows unexpected states

**Before escalating, collect:**

- Device serial number and device name
- Full list of app names with their status (Installed / Failed / Skipped)
- Full list of script names with their status
- For each Failed/Skipped app: assignment context (System/User) and ETG group membership status
- Managed Installer policy status (active / not active / not applicable)
- Screenshot of the deployment report Apps and Scripts tabs

**L2 escalation path:** [APv2 L2 Runbooks](../l2-runbooks/00-index.md#apv2-autopilot-device-preparation-runbooks)

---

[Back to APv2 Triage Tree](../decision-trees/04-apv2-triage.md)

## See Also

- [APv2 Deployment Flow](../lifecycle-apv2/02-deployment-flow.md)
- [APv2 Failure Catalog](../error-codes/06-apv2-device-preparation.md)
- [APv1 vs APv2](../apv1-vs-apv2.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-12 | Initial version | -- |
