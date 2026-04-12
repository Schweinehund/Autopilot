---
last_verified: 2026-04-11
review_by: 2026-07-10
applies_to: APv2
audience: both
---

> **Version gate:** This guide covers Windows Autopilot Device Preparation (APv2) failure scenarios.
> These failures are identified by symptom and deployment phase -- not hex error codes.
> For APv1 (classic Autopilot) error codes, see [Error Code Index](00-index.md).
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# APv2 Device Preparation Failures

This is a symptom-based failure catalog for Windows Autopilot Device Preparation (APv2) deployments. Failures are organized by the deployment phase in which they occur, following the [10-step deployment flow](../lifecycle-apv2/02-deployment-flow.md). Each entry uses the Symptom-Cause-Action format: **Symptom** (what the admin observes), **Probable Cause** (why it happens), **Quick Check** (portal-only verification steps), and **Runbook** (forward reference to the L1 or L2 guide that covers resolution). This file does not contain inline resolution steps -- those are in the L1/L2 runbooks referenced in each entry.

For the complete deployment flow and step numbers referenced here, see [APv2 Deployment Flow (10-Step Process)](../lifecycle-apv2/02-deployment-flow.md).

---

## Enrollment Failures (Steps 2-3)

These scenarios occur when the APv2 Device Preparation experience fails to launch or fails to complete Entra join and Intune enrollment.

### Deployment experience never launched

**Symptom:** The Windows Autopilot Device Preparation progress screen never appeared during OOBE. The device either completed standard OOBE without any managed deployment experience, or displayed the Enrollment Status Page (ESP) instead of the Device Preparation progress screen.

**Probable Cause:** One or more of the following conditions prevented the Device Preparation policy from activating, in order of commonality:

1. OS version below minimum requirement -- Windows 11 22H2 without KB5035942, or Windows 10. The device enrolls in Intune without APv2 configuration; no error is shown.
2. Windows automatic Intune enrollment (MDM scope) not configured in Microsoft Entra ID.
3. The user signing in during OOBE is not a member of the user group specified in the Device Preparation policy.
4. No device group is selected in the Device Preparation policy (policy saved without a device group).
5. Corporate identifiers required but not added for this device.
6. Users are not permitted to join devices to Microsoft Entra ID.

**Quick Check:** Intune admin center > Devices > Windows > Enrollment > Device preparation policies -- verify the policy exists, has a user group assigned, and has a device group selected. Confirm the signing-in user is a member of the assigned user group. Verify OS version meets minimum requirements (Windows 11 22H2 + KB5035942).

**Runbook:** [APv2 Deployment Not Launched](../l1-runbooks/06-apv2-deployment-not-launched.md)

---

### APv1 profile took precedence

**Symptom:** The Enrollment Status Page (ESP) appeared during OOBE. The device ran the classic Autopilot ESP flow instead of the APv2 Device Preparation progress screen.

> **Silent failure:** This is not an error. The device silently ran APv1 instead of APv2. No error message is displayed. The admin may assume APv2 is broken, but the device simply matched an APv1 profile instead.

**Probable Cause:** The device is registered as a Windows Autopilot device (APv1) -- it appears in the Intune admin center Windows Autopilot devices list -- or a Windows Autopilot deployment profile is assigned to the device. APv1 profiles always take precedence over APv2 Device Preparation policies. This is expected behavior; APv1 deregistration is a prerequisite for APv2 deployment.

**Quick Check:** Intune admin center > Devices > Windows > Windows enrollment > Devices -- search by device serial number. If the device appears in this list, it is registered as an APv1 Autopilot device. Also check Autopilot Deployment Profiles for any profile assigned to this device or a group containing this device.

**Runbook:** [APv1 Registration Conflict](../l1-runbooks/08-apv2-apv1-conflict.md)

---

### Entra join failed

**Symptom:** The deployment failed during the Entra join step. The Intune admin center deployment monitor shows a failed status at the Policy installation phase with a join-related error.

**Probable Cause:** One or more of the following conditions prevented the device from joining Microsoft Entra ID:

1. The user lacks Microsoft Entra join permissions (Entra admin center > Devices > Device settings > "Users may join devices to Microsoft Entra" is set to a specific group that does not include this user, or is set to None).
2. MDM auto-enrollment scope is set to None, or the user is not in the MDM auto-enrollment included group, causing the join to fail at enrollment handoff.
3. The Enrollment Type Group (ETG) security group is not configured correctly -- specifically, the Intune Provisioning Client service principal is not set as Owner of the ETG group.

**Quick Check:** Intune admin center > Devices > Monitor > Windows Autopilot device preparation deployments -- select the deployment record and check the Phase column and error details. Entra admin center > Devices > Device settings -- verify "Users may join devices to Microsoft Entra" includes the signing-in user. Verify ETG group ownership includes Intune Provisioning Client.

**Runbook:** L2 investigation required -- Entra join failures require infrastructure-level diagnosis. See L2 runbooks (Phase 14).

---

### Intune enrollment failed

**Symptom:** The device successfully joined Microsoft Entra ID but is not visible in Intune, or the deployment report shows an enrollment error. The device appears in Entra admin center Devices but not in Intune admin center Devices.

**Probable Cause:** One or both of the following conditions prevented MDM enrollment from completing after Entra join:

1. MDM auto-enrollment scope is None in Microsoft Entra ID -- devices can join Entra without MDM enrollment, but APv2 requires automatic MDM enrollment to proceed.
2. The enrolling user account is missing a required Intune license (Intune standalone, EMS, or M365 plan that includes Intune).

**Quick Check:** Entra admin center > Mobility (MDM and WIP) > Microsoft Intune -- check MDM user scope. If set to None, automatic MDM enrollment is disabled for all users. Microsoft 365 admin center > Active users > select the signing-in user > Licenses -- verify an Intune-capable license is assigned.

**Runbook:** L2 investigation required -- Enrollment failures require license and MDM scope verification beyond L1 scope. See L2 runbooks (Phase 14).

---

## IME Failures (Step 4)

The Intune Management Extension (IME) must install before any Win32 apps or PowerShell scripts can be delivered. IME installation occurs at Step 4 of the deployment flow.

### IME install failed

**Symptom:** The deployment fails before any apps begin installing. The deployment report shows failure at the Policy installation phase with no app or script installation attempts recorded.

**Probable Cause:** A network connectivity issue prevented the IME agent from downloading from the Intune service, or a transient Intune service availability issue interrupted the installation. Because IME is a prerequisite for all Win32 app and PowerShell script delivery, an IME failure blocks the entire subsequent installation phase and causes the overall APv2 deployment to fail.

**Quick Check:** Intune admin center > Devices > Monitor > Windows Autopilot device preparation deployments > select the device record > deployment details. Check the Phase column -- if the failure is recorded at "Policy installation" with no entries in the Apps or Scripts tabs, IME failed before app delivery could begin. Verify network access to Intune service endpoints from the deployment network.

**Runbook:** L2 runbook: APv2 IME installation failure investigation (Phase 14)

---

## App Installation Failures (Steps 7-9)

These scenarios occur during the app installation phases of the deployment. LOB and M365 apps install at Step 7, PowerShell scripts run at Step 8, and Win32/Store/Enterprise App Catalog apps install at Step 9.

### LOB or M365 app install failed

**Symptom:** A line-of-business (LOB) or Microsoft 365 app shows a Failed or Skipped status in the deployment report Apps tab, or the overall deployment fails with an app installation error.

**Probable Cause:** One of the following conditions caused the LOB or M365 app failure:

1. App packaging error or content delivery issue -- the app package is corrupted, the detection rule is incorrect, or the content failed to download.
2. App is configured to install in User context instead of System context. During OOBE, no user is signed in; apps must run in SYSTEM context to install successfully.
3. App shows "Skipped" -- the app was selected in the Device Preparation policy but is NOT assigned to the Enrollment Type Group (ETG) device group. APv2 requires apps to be assigned to the ETG group for delivery during OOBE.

**Quick Check:** Intune admin center > Devices > Monitor > Windows Autopilot device preparation deployments > select device > Apps tab. Review individual app status: Installed / In progress / Skipped / Failed. For Failed apps: check app installation context (System vs User) in the app assignment. For Skipped apps: Intune admin center > Apps > select the app > Assignments -- verify the app is assigned to the ETG device group.

**Runbook:** [APv2 Apps Not Installed](../l1-runbooks/07-apv2-apps-not-installed.md)

---

### Win32, Store, or EAC app install failed

**Symptom:** A Win32 app, Microsoft Store app, or Enterprise App Catalog (EAC) app shows a Failed or Skipped status in the deployment report Apps tab at Step 9.

**Probable Cause:** One of the following conditions caused the Win32, Store, or EAC app failure:

1. App packaging error, detection rule error, or Microsoft Store connectivity issue.
2. App is configured to install in User context instead of System context (must be SYSTEM during OOBE).
3. App shows "Skipped" because it is not assigned to the ETG device group (same as LOB/M365 scenario above).
4. App shows "Skipped" because a Managed Installer policy was active for the tenant -- this was a known issue resolved in April 2026. Before the fix, Win32/Store/EAC apps were skipped during OOBE and installed post-desktop instead. A technician seeing "Skipped" must check both root causes: app-not-in-ETG-group AND Managed Installer policy status.

**Quick Check:** Intune admin center > Devices > Monitor > Windows Autopilot device preparation deployments > select device > Apps tab -- review app status. For Skipped apps: first verify app is assigned to the ETG device group (Intune admin center > Apps > select app > Assignments). If ETG assignment is correct and status is still Skipped: Intune admin center > Endpoint security > App control for business -- check whether a Managed Installer policy is active for the tenant.

**Runbook:** [APv2 Apps Not Installed](../l1-runbooks/07-apv2-apps-not-installed.md)

---

### Deployment timed out

**Symptom:** The overall deployment fails with a timeout. The deployment report shows a Failed status and the deployment time column reflects when the timeout occurred. No specific app or script failure is shown as the cause.

**Probable Cause:** One of the following conditions caused the deployment to exceed the allowed time:

1. The overall timeout value configured in the Device Preparation policy is too low for the number of apps and scripts assigned. With up to 25 apps per policy (limit increased January 30, 2026), complex deployments need a longer timeout.
2. Known issue (resolved February 2026): Windows 365 devices ignored the configured timeout value and used a hardcoded 60-minute limit. Tenants that experienced this before February 2026 may still be diagnosing residual records.
3. A large number of apps or scripts, or a slow network, caused installation to exceed the configured timeout even when the timeout was set appropriately.

**Quick Check:** Intune admin center > Devices > Windows > Enrollment > Device preparation policies > select the policy -- check the "Minutes allowed before device preparation fails" setting. Review the total number of apps and scripts assigned and estimate expected install times. For Windows 365 deployments, verify the current service version post-February 2026 fix.

**Runbook:** [APv2 Deployment Timeout](../l1-runbooks/09-apv2-deployment-timeout.md)

---

## Script Failures (Step 8)

PowerShell scripts run at Step 8 of the deployment flow, between LOB/M365 app installation (Step 7) and Win32/Store/EAC app installation (Step 9).

### PowerShell script execution failed

**Symptom:** A PowerShell script shows a Failed or Skipped status in the deployment report Scripts tab. Script failures cause the entire APv2 deployment to fail -- the deployment does not continue to subsequent steps after a script failure.

**Probable Cause:** One of the following conditions caused the PowerShell script failure:

1. Script exits with a non-zero exit code -- any exit code other than 0 is treated as a failure by Intune.
2. Script throws an unhandled exception during execution.
3. Script exceeds the configured script timeout.
4. Script is configured to run in User context instead of System context. During OOBE, no user is signed in; scripts must run in SYSTEM context.
5. Script shows "Skipped" -- the script was selected in the Device Preparation policy but is NOT assigned to the ETG device group.

**Quick Check:** Intune admin center > Devices > Monitor > Windows Autopilot device preparation deployments > select device > Scripts tab -- review individual script status: Installed / In progress / Skipped / Failed. For Failed scripts: check the script's run-as-account setting (System vs User context). For Skipped scripts: verify the script is assigned to the ETG device group. Script output and exit codes require L2 log analysis.

**Runbook:** L2 runbook: APv2 PowerShell script failure investigation (Phase 14)

---

## Post-Deployment Issues (Step 10+)

These scenarios occur after the user reaches the desktop -- the APv2 deployment completed without error, but the resulting device configuration does not match expectations.

### Wrong apps or policies applied

**Symptom:** The user reaches the Windows desktop, but expected applications are missing, unexpected applications are present, or policies are applying incorrectly. The deployment report shows success but the resulting device state does not match the intended configuration.

**Probable Cause:** One or more of the following conditions produced unexpected post-deployment configuration:

1. Local administrator setting conflict -- a known active issue (as of April 2026) between the Device Preparation policy "User account type" setting and the Entra ID "Local administrator settings" configuration. Not all combinations are supported; refer to the known-issues page for valid combinations.
2. Apps assigned to the ETG device group but NOT selected in the Device Preparation policy install after the user reaches the desktop (background sync), not during OOBE. This is expected APv2 behavior, not a failure -- apps in the ETG group sync via normal Intune policy, not the OOBE deployment flow.
3. MDM policy conflicts from policies assigned to the ETG device group causing unexpected settings to apply, or policies taking longer than expected to reach the device.
4. Multiple Device Preparation policies targeting the same user group -- the wrong priority policy won during enrollment.

**Quick Check:** Intune admin center > Devices > Windows > Enrollment > Device preparation policies -- verify policy priority order and confirm only one policy matches the user. Entra admin center > Devices > Device settings > Local administrator settings -- verify the configuration against known valid combinations. Intune admin center > deployment details for the specific device -- check which policy version was applied and review the Apps and Scripts tabs for OOBE vs post-desktop distinction.

**Runbook:** L2 runbook: APv2 post-deployment configuration analysis (Phase 14)

---

## See Also

- [Error Code Index](00-index.md)
- [APv2 Deployment Flow (10-Step Process)](../lifecycle-apv2/02-deployment-flow.md)
- [APv2 Prerequisites Checklist](../lifecycle-apv2/01-prerequisites.md)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md)

## Version History

| Date | Change |
|------|--------|
| 2026-04-12 | Updated forward references to real runbook links |
| 2026-04-11 | Initial creation -- 10 failure scenarios across 5 deployment phase sections |
