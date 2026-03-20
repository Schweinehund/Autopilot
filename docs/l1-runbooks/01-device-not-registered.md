---
last_verified: 2026-03-20
review_by: 2026-06-18
applies_to: APv1
audience: L1
---

> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

# Device Not Registered in Autopilot

Use this runbook when a device is not found in the [Autopilot](../_glossary.md#autopilot) portal. It covers confirming the device is genuinely unregistered, communicating with the user, and collecting the correct data before escalation.

## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com) with at least read permissions to Windows Autopilot devices
- Device serial number from the physical device label, BIOS screen, or user report
- Verified: the device is physically powered on and connected to a network (navigate to any website from the device browser to confirm)

## Steps

1. Open the Intune admin center (https://intune.microsoft.com).

2. Navigate to **Devices** > **Windows** > **Enrollment** > **Windows Autopilot devices**.

3. In the search box, enter the full device serial number exactly as it appears on the device label. Do not use partial serial numbers.

4. If the device appears in the search results: it IS registered — this runbook does not apply. Return to the [initial triage decision tree](../decision-trees/00-initial-triage.md) to identify the correct failure scenario.

5. If no results appear: confirm the serial number. Ask the user to read the serial number from **Settings** > **System** > **About** on the device (if accessible) or from the device label. Re-search with the confirmed serial number.

6. > **Say to the user:** "I'm checking your device registration in our management system. This may take a few minutes while I verify the details."

7. Check whether a [hardware hash](../_glossary.md#hardware-hash) import was previously initiated: Navigate to **Devices** > **Windows** > **Enrollment** > **Windows Autopilot devices** > **Import** and check the import history for the device serial number.

8. If the device was expected to be OEM-registered (purchased from an authorized OEM with Autopilot registration): confirm with the procurement team or the device order record whether Autopilot registration was included in the purchase.

9. > **Say to the user:** "Your device is not yet registered in our Autopilot system. I'm going to escalate this to our technical team who can complete the registration. They will need [time estimate based on your organization's SLA]. I'll update your ticket when registration is complete."

## Escalation Criteria

Escalate to L2 if:

- Device serial number is confirmed correct but does not appear in the Autopilot devices portal
- Hardware hash was never imported (or import status is unknown)
- Device was OEM-registered but does not appear (possible tenant mismatch)

**Before escalating, collect:**

- Device serial number
- Device make and model
- Deployment mode (user-driven, pre-provisioning, or self-deploying)
- Whether hardware hash was previously imported (yes / no / unknown)
- Timestamp of the search
- Screenshot of the Autopilot devices search page showing no results

See [L2 Runbooks](../l2-runbooks/) (available after Phase 6) for hardware hash re-import procedures.

For related error codes, see [MDM Enrollment Errors](../error-codes/01-mdm-enrollment.md).

---

[Back to Initial Triage](../decision-trees/00-initial-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-03-20 | Initial version | — |
