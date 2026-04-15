---
last_verified: 2026-04-14
review_by: 2026-07-13
applies_to: ADE
audience: L1
platform: macOS
---

> **Platform gate:** This guide covers macOS ADE troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks).

# macOS Configuration Profile Not Applied

Use this runbook when Setup Assistant completed and the user is at the macOS desktop, but an expected configuration is missing — for example, the device is not connected to the corporate Wi-Fi automatically, a VPN profile is not present, FileVault is not enabled, or restrictions are not in effect.

## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com)
- Device serial number
- Name of the configuration profile or setting that is expected but missing (ask the user what should be working)

## How to Use This Runbook

Go directly to the section that matches the observation:

- [Profile Not Showing](#profile-not-showing) -- The profile does not appear at all in the device's Intune record
- [Profile Showing but Not Working](#profile-showing-not-working) -- Intune shows the profile as applied, but the setting is not active on the device

---

## Profile Not Showing {#profile-not-showing}

**Entry condition:** A profile that should be assigned to this device is absent from the Intune device profile list.

1. > **Say to the user:** "We're checking your device's configuration settings. Some settings require a device restart to take effect — please don't restart until we've finished checking."

2. In Intune admin center, navigate to **Devices** > **macOS** > select the device by serial number > **Configuration profiles**. Review the list of profiles shown for this device.

3. Note which profile is expected but not listed. Ask the user: "What specifically is missing — is it Wi-Fi, VPN, restrictions, FileVault, or something else?"

4. Navigate to the expected profile: **Devices** > **macOS configuration profiles** > search for the profile name. Open the profile and select **Properties** > **Assignments**.

5. Check that the device's Entra group is listed in the Included groups. Common issues:
   - The device's Entra group is not in the assignment.
   - The assignment targets a user group but the profile is a device-targeted profile — dynamic device groups may not have updated yet.

6. If the assignment looks correct, check the group membership: navigate to **Groups** in Intune admin center (or Entra ID > Groups), open the assigned group, and confirm this device appears as a member.

7. If the device is not in the group: this is the root cause. Group membership changes can take up to 15 minutes to propagate. Wait 15 minutes and trigger a manual sync: navigate to **Devices** > **macOS** > [device] > **Sync**. Then refresh the Configuration profiles view.

8. If the device is in the group but the profile still does not appear after a sync: proceed to [Escalation Criteria](#escalation-criteria).

---

## Profile Showing but Not Working {#profile-showing-not-working}

**Entry condition:** The profile is listed in the device's Configuration profiles view in Intune with a "Succeeded" or "Applied" status, but the setting is not active on the device.

1. In Intune admin center, navigate to **Devices** > **macOS** > [device] > **Configuration profiles**. Confirm the profile status is "Succeeded". If the status is "Error" or "Conflict", proceed to [Escalation Criteria](#escalation-criteria) immediately.

2. **For Wi-Fi profiles specifically:** Confirm the SSID in the profile matches the network name exactly, including uppercase and lowercase letters. Wi-Fi SSID matching is case-sensitive. Navigate to **Devices** > **macOS configuration profiles** > [Wi-Fi profile] > **Configuration settings** and compare the SSID value to the actual network name.

3. **For FileVault profiles:** FileVault encryption requires the user to log out and log back in after the profile is applied before it takes effect. Ask the user: "Have you fully logged out and back in since enrolling?" If not, have them do so.

4. **For VPN profiles:** VPN profile application requires a network change event (Wi-Fi reconnect) or a manual Intune sync before the VPN configuration appears in System Preferences > Network. Ask the user to turn Wi-Fi off and back on, then check System Preferences > Network.

5. **For restriction profiles (disabling AirDrop, camera, etc.):** Confirm the restriction profile uses the correct payload type for macOS. Some restriction payloads behave differently on macOS 14+ (Sonoma) compared to earlier versions. Note the macOS version (Apple menu > About This Mac) for escalation if needed.

6. If the specific setting type is not covered above, try a manual sync: navigate to **Devices** > **macOS** > [device] > **Sync**. Wait 5 minutes and ask the user to check whether the setting is now active.

7. If the setting remains inactive after a sync: proceed to [Escalation Criteria](#escalation-criteria).

---

## Escalation Criteria

Escalate to L2 if:

- Profile status in Intune shows "Error" or "Conflict"
- Device is in the correct group but profile still does not appear after 15 minutes and a manual sync
- Wi-Fi profile SSID is correct but auto-connect is not working
- FileVault profile applied but encryption not enabled after user log out/log in cycle
- VPN profile applied but VPN configuration not appearing in System Preferences
- Restriction profile applied but restricted functions are still accessible (possible macOS version compatibility issue)

**Before escalating, collect:**

- Device serial number
- macOS version (Apple menu > About This Mac)
- Profile name showing the issue
- Profile status in Intune (screenshot from Devices > macOS > [device] > Configuration profiles)
- Assignment group name and confirmation the device is a member (screenshot)
- Description of expected vs. actual behavior
- Steps already attempted (sync, log out/in, Wi-Fi toggle)

See [macOS L2 Runbooks](../l2-runbooks/00-index.md) for profile delivery log investigation. For configuration profile reference, see [Configuration Profiles Guide](../admin-setup-macos/03-configuration-profiles.md).

---

[Back to macOS ADE Triage](../decision-trees/06-macos-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-14 | Initial version | -- |
