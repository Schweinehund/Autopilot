---
last_verified: 2026-04-14
review_by: 2026-07-13
applies_to: ADE
audience: L1
platform: macOS
---

> **Platform gate:** This guide covers macOS ADE troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks).

# macOS App Not Installed

Use this runbook when Setup Assistant completed and the user is at the macOS desktop, but an expected application is not installed. This includes apps deployed as managed packages (DMG or PKG), apps from the App Store via VPP (Volume Purchase Program / Apps and Books), and apps that show a "Failed" status in Intune.

## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com)
- Device serial number
- App name that is expected but missing

## How to Use This Runbook

Go directly to the section that matches the situation:

- [DMG or PKG App Missing](#dmg-pkg-missing) -- A managed app deployed via DMG or PKG package is not present on the device
- [VPP App Missing](#vpp-missing) -- An App Store app (distributed via Apps and Books / VPP) is not visible in Company Portal or not installed
- [App Install Failed](#app-install-failed) -- The app appears in Intune with a "Failed" installation status

---

## DMG or PKG App Missing {#dmg-pkg-missing}

**Entry condition:** A managed app (uploaded to Intune as a macOS app DMG or LOB PKG) is not installed on the device.

1. > **Say to the user:** "We're checking the application deployment status. Some apps take up to 30 minutes to install after enrollment. I'll check the current status now."

2. In Intune admin center, navigate to **Apps** > **macOS** and search for the app name. Open the app record.

3. Select **Device install status** and find this device by serial number. Note the installation status shown.

4. If the status is **Installed**: the app is already on the device. Ask the user to check the Applications folder in Finder. Some apps install to subdirectories (e.g., `/Applications/Microsoft Office/`) rather than the top level.

5. If the status is **Pending**: the app deployment has not yet reached the device. Select **Devices** > **macOS** > [device] > **Sync** to force an immediate check-in. Wait 5 minutes and refresh the device install status page.

6. If the status is **Not applicable**: check the app assignment. Navigate to **Apps** > **macOS** > [app] > **Properties** > **Assignments**. Confirm the device or its group is listed in the **Required** assignment (not just **Available**). Only "Required" assignments install automatically.

7. If the assignment is "Available" instead of "Required": the app will only appear in Company Portal for the user to install manually, not install automatically. Inform the user how to install it from Company Portal.

8. If status is **Failed**: go to [App Install Failed](#app-install-failed).

---

## VPP App Missing {#vpp-missing}

**Entry condition:** An App Store app distributed via Apps and Books (VPP) is not visible in Company Portal or is not installed.

1. In Intune admin center, navigate to **Tenant administration** > **Connectors and tokens** > **Apple VPP tokens**. Check the token **Status** column.

2. If the token shows **Expired**: the VPP license connection is broken. All VPP app deployments from this token will fail until renewed. Proceed to [Escalation Criteria](#escalation-criteria) — token renewal requires admin action.

3. If the token is active, navigate to **Apps** > **macOS** > search for the app. Open the record and select **Device install status**. Find this device and note the status.

4. If the app is assigned as **Available** (not **Required**): VPP "Available" apps assigned to device groups do not appear in Company Portal. Available VPP apps are visible in Company Portal only when assigned to user groups. Check the assignment type and inform the user if the app requires a user-group assignment to appear in their portal.

5. If the app is assigned as **Required**: check that this device's group is in the assignment. Trigger a device sync: **Devices** > **macOS** > [device] > **Sync**.

6. If the VPP license count is exhausted: the app cannot install. Navigate to **Apps** > **macOS** > [app] > **Licenses** to check available license count. If licenses are exhausted, proceed to [Escalation Criteria](#escalation-criteria).

7. > **Say to the user:** "I'm checking the license and deployment status for this app. If it's assigned to your account, it should appear in Company Portal. We may need to make an adjustment on the back end if it's not showing up."

---

## App Install Failed {#app-install-failed}

**Entry condition:** The app appears in Intune device install status with a "Failed" status.

1. In Intune admin center, navigate to **Apps** > **macOS** > [app] > **Device install status**. Locate this device and note the exact error text or code shown (if any) in the status details column.

2. Navigate to **Devices** > **macOS** > [device] > **Sync** to trigger a fresh installation attempt. Wait 10 minutes and refresh the device install status.

3. If the status changes from "Failed" to "Installed" after the sync: the issue has resolved. Confirm with the user that the app is now available.

4. If the status remains "Failed" after the sync: note the error details and proceed to [Escalation Criteria](#escalation-criteria). Persistent failures require L2 log investigation.

5. > **Say to the user:** "The system shows an error installing this application. I'm going to escalate this to our technical team who can investigate the installation logs. I'll update your ticket when we have more information."

---

## Escalation Criteria

Escalate to L2 if:

- App shows persistent "Failed" status after a manual sync
- VPP token is expired (requires admin renewal)
- VPP license count is exhausted
- App assignment is correct (Required) but the app does not appear after sync
- User reports app installs and then uninstalls itself repeatedly (possible detection rule loop with a PKG)

**Before escalating, collect:**

- Device serial number
- macOS version (Apple menu > About This Mac)
- App name and app type (DMG, PKG, or VPP)
- Screenshot of device install status for the app in Intune
- Assignment type shown in the app Assignments page (Required / Available)
- Error code or text from the install status details column (if visible)
- Whether app status changes after a sync (yes / no)

See [macOS L2 Runbooks](../l2-runbooks/00-index.md) for app installation log investigation. For app deployment reference, see [App Deployment Guide](../admin-setup-macos/04-app-deployment.md).

---

[Back to macOS ADE Triage](../decision-trees/06-macos-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-14 | Initial version | -- |
