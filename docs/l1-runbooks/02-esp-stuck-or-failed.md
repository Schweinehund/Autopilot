---
last_verified: 2026-03-20
review_by: 2026-06-18
applies_to: APv1
audience: L1
---

> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

# ESP Stuck or Failed

The [Enrollment Status Page](../_glossary.md#enrollment-status-page) ([ESP](../_glossary.md#esp)) is the progress screen that appears during [Autopilot](../_glossary.md#autopilot) provisioning after the user signs in or after [OOBE](../_glossary.md#oobe) completes. It tracks the installation of required apps and policies before releasing the desktop. This runbook covers two scenarios where ESP appears stuck with no error code, and one scenario where ESP displays an error code.

## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com) with permissions to view device enrollment status
- Device serial number from the device label or user report
- Verified: device IS registered in the Autopilot portal (if not, use the [Device Not Registered runbook](01-device-not-registered.md))
- Verified: network connectivity is working — the device reached the sign-in screen, which confirms basic network access
- Know which ESP phase the device is in: the screen heading tells you which phase:
  - **"Setting up your device..."** = device phase (runs before any user logs in)
  - **"Setting up for [username]..."** = user phase (runs after the user signs in)

## How to Use This Runbook

This runbook has three sections based on the ESP symptom. Go directly to the section that matches your situation:

- [Device Phase Steps](#device-phase-steps) — ESP shows "Setting up your device..." and appears stuck
- [User Phase Steps](#user-phase-steps) — ESP shows "Setting up for [username]..." and appears stuck
- [Error Code Steps](#error-code-steps) — ESP displayed an error code

---

## Device Phase Steps {#device-phase-steps}

**Entry condition:** ESP shows "Setting up your device..." and the device has been on this screen for more than 30 minutes.

The device phase installs security settings, policies, and apps required for the device account. It normally takes 15 to 45 minutes. The threshold for concern is 30 minutes without visible progress.

1. > **Say to the user:** "Your device is in the initial setup phase. This process installs required security settings and applications. It normally takes 15 to 45 minutes. Since it has been over 30 minutes, I'm going to try a restart to see if that helps it continue."

2. Note the current time and record what the ESP screen shows — specifically, which app or step name is currently displayed (if any). You will need this information if you need to escalate.

3. Restart the device: press and hold the power button for 10 seconds until the device powers off. Wait 30 seconds, then press the power button to turn it on.

4. Wait for the device to boot back to the ESP screen. This typically takes 3 to 5 minutes.

5. Check whether ESP has progressed past the point where it was previously stuck. Compare the app name or step name shown now against what you noted in step 2.

6. **If ESP has progressed past the previous stopping point:**
   > **Say to the user:** "The restart helped. Your device is continuing the setup process. I'll check in with you in 10 minutes to make sure everything completes. Please don't turn off or restart the device during this time."

   Set a 10-minute callback. If ESP completes and the user reaches the desktop, the issue is resolved.

7. **If ESP is stuck at the same point after the restart:** Do NOT restart again. Proceed to [Escalation Criteria](#escalation-criteria).

8. **Optional check — app assignment type:** If the ESP screen shows an app name, you can verify whether it is assigned as Required or Available. Only "Required" apps block the ESP; "Available" apps do not. In the Intune admin center, navigate to **Apps** > **Windows** > select the app > **Assignments**. If the blocking app is assigned as Available (not Required), note this as a possible misconfiguration for L2.

---

## User Phase Steps {#user-phase-steps}

**Entry condition:** ESP shows "Setting up for [username]..." and the device has been on this screen for more than 60 minutes.

The user phase installs apps and settings assigned to the user's account. It typically takes 5 to 15 minutes but can be longer if many user-targeted apps are assigned. The threshold for concern is 60 minutes without visible progress.

1. > **Say to the user:** "Your device finished the initial setup and is now installing applications specific to your user account. This phase can take 5 to 15 minutes for most users, but can be longer if you have many applications assigned. Since it has been over 60 minutes, I'm going to try a restart."

2. Note the current time, the username shown on the ESP screen, and which app or step name is currently displayed (if any).

3. Restart the device: press and hold the power button for 10 seconds until the device powers off. Wait 30 seconds, then press the power button to turn it on.

4. Wait for the device to boot back and the user to sign in again. This typically takes 3 to 5 minutes plus the time for the user to re-enter their credentials.

5. Check whether the user phase has progressed past the point where it was previously stuck.

6. **If ESP has progressed:**
   > **Say to the user:** "The restart helped. Your setup is continuing. I'll check in with you in 15 minutes. Please don't restart the device during this time."

   Set a 15-minute callback. If ESP completes and the user reaches the desktop, the issue is resolved.

7. **If ESP is stuck at the same point after the restart:** Do NOT restart again. Proceed to [Escalation Criteria](#escalation-criteria).

---

## Error Code Steps {#error-code-steps}

**Entry condition:** ESP displayed an error code — typically a hex code starting with `0x` (for example, `0x81036502`) or a descriptive failure message.

1. Note the exact error code and any message text shown on the ESP screen. Write down the full hex value.

2. > **Say to the user:** "Your device encountered an error during setup. I've noted the error code and I'm checking our reference now."

3. Look up the error code in the [ESP Error Code Table](../error-codes/03-esp-enrollment.md). Search the table for the hex code you noted.

4. If the error code is found: follow the **L1 Action** column for that row. That column provides the specific instruction for L1 agents on this error.

5. If the error code is not found in the table: note the exact code and proceed to [Escalation Criteria](#escalation-criteria).

6. If you followed the L1 Action and the issue is not resolved: proceed to [Escalation Criteria](#escalation-criteria).

7. If escalating due to an error code:
   > **Say to the user:** "Your device encountered an error during setup that requires our technical team to investigate. I'm collecting the information they need right now."

---

## Escalation Criteria

Escalate to L2 if:

- Device phase ESP is stuck at the same point after one restart and the device has been on ESP for more than 30 minutes total
- User phase ESP is stuck at the same point after one restart and the device has been on ESP for more than 60 minutes total
- Error code is not found in the [ESP Error Code Table](../error-codes/03-esp-enrollment.md)
- Error code L1 action did not resolve the issue
- A "Required" app appears to be blocking ESP but the app assignment may be misconfigured (app is assigned as Available, not Required)

**Before escalating, collect:**

- Device serial number
- Deployment mode (user-driven or pre-provisioning)
- Timestamp when ESP was first observed stuck
- ESP phase (device phase or user phase)
- Time spent on ESP before the restart
- Time spent on ESP after the restart
- Username shown on ESP screen at time of failure (user phase only)
- App name or step name shown on ESP screen when stuck (if visible)
- Error code (if displayed) — write down the full hex value
- Screenshot of the ESP screen

**See also:** For ESP phase details and app type tracking, see [Enrollment Status Page Lifecycle Guide](../lifecycle/04-esp.md).

> **L2 forward-link:** See [L2 ESP Deep-Dive](../l2-runbooks/02-esp-deep-dive.md) for ESP registry analysis and app conflict investigation.

---

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-03-20 | Initial version | — |
