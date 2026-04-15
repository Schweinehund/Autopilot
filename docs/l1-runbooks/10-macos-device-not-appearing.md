---
last_verified: 2026-04-14
review_by: 2026-07-13
applies_to: ADE
audience: L1
platform: macOS
---

> **Platform gate:** This guide covers macOS ADE troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks).

# macOS Device Not Appearing in Intune

Use this runbook when a Mac is not found in Intune admin center after the user attempted ADE enrollment, or when a Mac is expected to enroll via [ADE](../_glossary-macos.md#ade) but the device serial number does not appear in Intune Devices > macOS.

## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com) with read permissions to macOS devices
- Access to Apple Business Manager (https://business.apple.com) with read permissions to Devices
- Device serial number — ask the user to read it from the physical label, or from **Apple menu** > **About This Mac** > **System Report** (under Hardware Overview: Serial Number)

## Steps

1. Open Intune admin center and navigate to **Devices** > **macOS**. In the search bar, enter the device serial number exactly as shown on the device.

2. If the device appears: it is enrolled in Intune. This runbook does not apply. Return to the [macOS ADE triage tree](../decision-trees/06-macos-triage.md) to identify the correct scenario.

3. If the device does not appear: confirm the serial number is correct. Ask the user to read it directly from **Apple menu** > **About This Mac** > **System Report** rather than from a label, then search again.

4. > **Say to the user:** "We're checking your device registration. This may take a few minutes. Please keep the device powered on and connected to Wi-Fi."

5. Open Apple Business Manager (https://business.apple.com) and navigate to **Devices**. Search for the serial number.

6. **If the device is not found in ABM:** The device was not purchased through the Apple Automated Device Enrollment program or was not added to ABM. This requires procurement verification — proceed to [Escalation Criteria](#escalation-criteria).

7. **If the device is found in ABM:** Check the **MDM Server** field for the device record.
   - If the MDM Server field shows a different organization or "None": the device is assigned to the wrong MDM server. Proceed to [Escalation Criteria](#escalation-criteria).
   - If the MDM Server is correct: continue to the next step.

8. In Intune admin center, navigate to **Devices** > **Enrollment** > **Apple** > **Enrollment program tokens**. Check the token **Status** column. If any token shows "Expired" or "Expires soon", the ADE connection is broken — proceed to [Escalation Criteria](#escalation-criteria).

9. On the active token, select it and review **Profiles**. Confirm an enrollment profile is assigned as the default or is specifically assigned to this device's group. If no profile is assigned, proceed to [Escalation Criteria](#escalation-criteria).

10. If all checks above pass but the device still does not appear, attempt a manual sync: in Intune admin center > **Devices** > **Enrollment** > **Apple** > **Enrollment program tokens** > select the token > **Sync**. Wait 5 minutes and re-search for the device serial number.

## Escalation Criteria

Escalate to L2 if:

- Device serial number is not found in Apple Business Manager
- Device is in ABM but assigned to a different MDM server
- Device is in ABM but shows "Assigned to: [other organization]" — this requires inter-organization device release
- ADE token is expired (requires admin renewal at L2 or admin level)
- No enrollment profile is assigned and adding one is outside L1 permission scope
- Device does not appear in Intune after a manual sync

**Before escalating, collect:**

- Device serial number
- Device make and model (e.g., MacBook Pro 14-inch, 2023)
- macOS version if accessible (Apple menu > About This Mac)
- Screenshot of Intune Devices > macOS search showing no results
- Screenshot of ABM device record (or note "not found in ABM")
- ADE token status screenshot from Intune Enrollment program tokens page
- Description of steps already attempted

See [macOS L2 Runbooks](../l2-runbooks/00-index.md) for advanced ADE enrollment investigation. For ABM configuration reference, see [ABM Configuration Guide](../admin-setup-macos/01-abm-configuration.md).

---

[Back to macOS ADE Triage](../decision-trees/06-macos-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-14 | Initial version | -- |
