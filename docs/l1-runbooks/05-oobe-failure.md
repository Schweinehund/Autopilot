---
last_verified: 2026-03-20
review_by: 2026-06-18
applies_to: APv1
audience: L1
---

> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

# OOBE Fails Immediately

Use this runbook when the device fails during the initial [Out-of-Box Experience](../_glossary.md#oobe) ([OOBE](../_glossary.md#oobe)) before reaching the Enrollment Status Page. This covers crashes, freezes, blue screens, reboots to recovery, and [OOBE](../_glossary.md#oobe) completing standard Windows setup without [Autopilot](../_glossary.md#autopilot) customization.

## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com)
- Device serial number from the device label or user report
- A description of what the user saw on screen — exact error messages, which screens appeared, and the sequence of events

## Steps

1. > **Say to the user:** "I understand your device ran into a problem during the initial setup. I'm going to check a few things and then try one restart. If that doesn't resolve it, I'll escalate to our technical team with all the details."

2. **Confirm the device is registered in the Autopilot portal.** Open the Intune admin center (https://intune.microsoft.com). Navigate to **Devices** > **Windows** > **Enrollment** > **Windows Autopilot devices**. Search for the device serial number. If the device is NOT found in the list, this is a different issue — follow the [Device Not Registered runbook](01-device-not-registered.md) instead.

3. **Confirm network connectivity.** Ask the user whether the device was connected to a network when the failure occurred. If network connectivity was not confirmed or if the user reports the device could not connect, follow the [Network Connectivity Failure runbook](04-network-connectivity.md) first.

4. **Confirm the expected deployment mode.** Ask the user or check the Autopilot device record in the portal: was this device intended to use user-driven, pre-provisioning, or self-deploying mode? Note the expected mode — you will need it for escalation data.

5. **Document exactly what appeared on screen.** Ask the user to describe the sequence of events in order:
   - What was the last screen they saw before the failure?
   - Did they see company branding or the standard Windows setup screens?
   - Was there an error code or message? (Ask them to write it down exactly, including any numbers.)
   - Did the device reboot, freeze, or display a blue screen?
   - Did this happen once, or has it happened multiple times?

6. **Perform a single power cycle.** Ask the user to: hold the power button for 10 seconds until the device powers off, wait 30 seconds, then press the power button to turn it on. Let the device boot back to OOBE.

7. **If OOBE proceeds normally after the power cycle:** Monitor until the user reaches the desktop or the [ESP](../_glossary.md#enrollment-status-page). The failure may have been transient.
   > **Say to the user:** "The restart appears to have resolved the issue. Your device is continuing setup. Please let me know if you encounter any further problems."

8. **If OOBE fails again in the same way:** Proceed to [Escalation Criteria](#escalation-criteria).

9. **If OOBE now presents standard Windows setup (no company branding, no Azure AD sign-in prompt):** This means the [deployment profile](../_glossary.md#user-driven-mode) did not load during OOBE. Confirm whether a profile is assigned to this device in the Autopilot portal. If a profile is assigned but did not apply, follow the [Profile Not Assigned runbook](03-profile-not-assigned.md). This is likely a misroute — the root cause is profile assignment or delivery, not an OOBE crash.

## Escalation Criteria

Escalate to L2 if:

- OOBE fails a second time after power cycle with the same symptoms
- Device displays a blue screen or enters Windows recovery mode
- OOBE completes standard Windows setup despite a confirmed Autopilot profile being assigned (profile not applied despite being registered)
- Any failure pattern not covered by the [ESP](../_glossary.md#esp), profile, or network runbooks

**Before escalating, collect:**

- Device serial number
- Deployment mode (user-driven, pre-provisioning, or self-deploying)
- Timestamp of the failure
- Detailed description of what appeared on screen (in order, step by step)
- Sequence of events leading to the failure
- Whether the failure repeated after one power cycle (yes or no)
- Screenshot of the failure screen (if available)
- Whether company branding was displayed at any point during OOBE (yes or no)

**See also:** For initial triage context, see [Initial Triage Decision Tree](../decision-trees/00-initial-triage.md).

> **L2 forward-link:** L2 must run the [Log Collection Guide](../l2-runbooks/01-log-collection.md) first to gather a diagnostic package, then investigate via the [L2 Runbook Index](../l2-runbooks/00-index.md) based on collected evidence.

**Quick Reference:** [L1 Quick-Reference Card](../quick-ref-l1.md)

---

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-03-20 | Initial version | — |
