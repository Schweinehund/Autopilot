---
last_verified: 2026-04-14
review_by: 2026-07-13
applies_to: ADE
audience: L1
platform: macOS
---

> **Platform gate:** This guide covers macOS ADE troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks).

# macOS Setup Assistant Stuck or Failed

Use this runbook when a Mac is visible in Intune admin center (Devices > macOS) but Setup Assistant did not complete. The device is stuck on the Apple logo, spinning globe, Remote Management screen ("Your Mac is being configured"), or an authentication sign-in screen.

## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com)
- Device serial number
- Knowledge of which screen the device is currently showing — ask the user to describe or share a photo

## How to Use This Runbook

Go directly to the section that matches the current device screen:

- [Authentication Failure](#authentication-failure) -- Setup Assistant shows a sign-in screen that fails or loops
- [Await Configuration Stuck](#await-configuration-stuck) -- Device shows "Your Mac is being configured" and does not advance
- [Network / Connectivity Issue](#network-connectivity) -- Device shows a spinning globe, cannot reach the next Setup Assistant screen, or shows an error about connecting to Apple

---

## Authentication Failure {#authentication-failure}

**Entry condition:** Setup Assistant displays a sign-in screen (Microsoft or Apple ID) that returns an error or loops back to the same screen.

1. > **Say to the user:** "Your Mac is at the sign-in step during setup. Some authentication issues can be resolved without a restart — let's check a few things first."

2. Confirm the user is entering their corporate Microsoft account credentials (UPN format: user@domain.com), not a personal Microsoft or Apple ID. ADE with user affinity requires the corporate account.

3. In Intune admin center, navigate to **Devices** > **Enrollment** > **Apple** > **Enrollment program tokens** > select the active token > **Profiles**. Open the profile assigned to this device's group.

4. Review the **User affinity** setting on the enrollment profile:
   - **Enroll with user affinity** should be selected if the device requires user sign-in.
   - **Enroll without user affinity** means no user authentication should appear — if Setup Assistant is asking for one, the profile may be misconfigured.

5. Check the **Authentication method** field on the enrollment profile. If set to **Setup Assistant (legacy)**, this method may be blocked by Conditional Access policies requiring modern authentication. Note this as a possible cause for L2.

6. > **Say to the user:** "I've checked the enrollment settings. Let's try signing in once more with your full company email address and password. If this doesn't work, I'll escalate to get the configuration corrected."

7. Ask the user to attempt the sign-in once more. If it fails again, proceed to [Escalation Criteria](#escalation-criteria).

---

## Await Configuration Stuck {#await-configuration-stuck}

**Entry condition:** Setup Assistant shows "Your Mac is being configured" (the Remote Management screen) and has not advanced after more than 30 minutes.

1. > **Say to the user:** "Your Mac is receiving its configuration from our management system. This normally takes 5 to 20 minutes. Since it has been over 30 minutes, let's check what is happening."

2. In Intune admin center, navigate to **Devices** > **macOS** and find this device by serial number. Check the **Last check-in** time. If the device has not checked in at all, network connectivity is the likely root cause — go to [Network / Connectivity Issue](#network-connectivity).

3. Check the **Enrollment profile** assigned to the device in Intune: navigate to **Devices** > **Enrollment** > **Apple** > **Enrollment program tokens** > profile > verify **Await device configuration** is set to **Yes** only if required. If enabled, the device will remain on the "Your Mac is being configured" screen until all required configuration profiles and apps have deployed.

4. Navigate to **Devices** > **macOS** > select the device > **Configuration profiles**. Review the delivery status of all assigned profiles. If any profile shows a "Pending" or "Error" status, note the profile name.

5. If a profile shows "Error" status: this is likely preventing Await Configuration from completing. Proceed to [Escalation Criteria](#escalation-criteria) with the profile name and error.

6. If all profiles show "Succeeded": the device may be waiting for an app to deploy. Navigate to **Devices** > **macOS** > [device] > **Managed apps** and check for any app showing "Pending install" or "Failed".

7. If the device still has not advanced after 45 minutes from first observation: proceed to [Escalation Criteria](#escalation-criteria).

---

## Network / Connectivity Issue {#network-connectivity}

**Entry condition:** Device shows a spinning globe icon, cannot advance past the Wi-Fi selection screen, or displays an error about contacting Apple or Microsoft.

1. > **Say to the user:** "Your Mac needs network access to complete setup. Let's check a few things to make sure it can connect to the right servers."

2. Ask the user to confirm the device is connected to Wi-Fi: the Wi-Fi icon should appear in the Setup Assistant menu bar. If not connected, have the user select the correct network on the Setup Assistant Wi-Fi screen and enter credentials.

3. Ask the user: "Is this device on a corporate network that may require a proxy or has strict firewall rules?" Corporate networks with proxy servers may block apple.com and manage.microsoft.com domains required for ADE.

4. If on a corporate network with a proxy: have the user try connecting to a mobile hotspot or home network to test if network policy is blocking the enrollment. If enrollment proceeds on a different network, the corporate network proxy is blocking required endpoints.

5. Required endpoints that must be reachable during Setup Assistant:
   - albert.apple.com (ADE enrollment)
   - gdmf.apple.com (software updates during setup)
   - manage.microsoft.com (Intune enrollment)
   - login.microsoftonline.com (Azure AD authentication)

6. If the user cannot test on an alternative network: proceed to [Escalation Criteria](#escalation-criteria). The network/proxy investigation requires Infrastructure team involvement.

7. > **Say to the user:** "If you're able to connect to a different network like a mobile hotspot, this would help us confirm whether the issue is with the network or with the device itself. Would you be able to try that?"

---

## Escalation Criteria

Escalate to L2 if:

- Authentication failure persists after verifying enrollment profile user affinity and authentication method
- Enrollment profile uses Setup Assistant (legacy) authentication — suspected CA blocking
- Await Configuration has been running more than 45 minutes with no last check-in from the device
- Any assigned profile shows "Error" status in the device configuration profiles view
- Device cannot complete enrollment on any network (rules out proxy/firewall)
- Network proxy is confirmed as blocking required enrollment endpoints (escalate to Infrastructure/Network team)

**Before escalating, collect:**

- Device serial number
- Screenshot of the current Setup Assistant screen on the device
- Enrollment profile name (from Intune Enrollment program tokens)
- Authentication method shown in the enrollment profile
- Device Last check-in time from Intune (or "never checked in")
- Configuration profile delivery status screenshot (if applicable)
- Network type in use (corporate Wi-Fi, home, hotspot)
- Whether enrollment succeeded on an alternative network (yes / no / not tested)

See [macOS L2 Runbooks](../l2-runbooks/00-index.md) for enrollment log investigation. For enrollment profile reference, see [Enrollment Profile Guide](../admin-setup-macos/02-enrollment-profile.md).

---

[Back to macOS ADE Triage](../decision-trees/06-macos-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-14 | Initial version | -- |
