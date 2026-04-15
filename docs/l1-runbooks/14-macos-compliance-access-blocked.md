---
last_verified: 2026-04-14
review_by: 2026-07-13
applies_to: ADE
audience: L1
platform: macOS
---

> **Platform gate:** This guide covers macOS ADE troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks).

# macOS Compliance Failure / Access Blocked

Use this runbook when a Mac shows as non-compliant in Intune, OR when a user cannot access Microsoft 365 resources (email, Teams, SharePoint) despite the device appearing enrolled and compliant.

**Important:** These are two distinct scenarios. A device can be compliant but still have access blocked due to Conditional Access policy. Use the navigation below to go to the correct section.

## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com)
- Access to Microsoft Entra admin center (https://entra.microsoft.com) — read-only is sufficient for investigation
- Device serial number
- User's UPN (email address)

## How to Use This Runbook

Go directly to the section that matches the observation:

- [Device Non-Compliant](#device-non-compliant) -- Intune shows this device as "Not compliant"
- [Compliant but Access Blocked](#compliant-access-blocked) -- Intune shows "Compliant" but user cannot access Microsoft 365 resources

---

## Device Non-Compliant {#device-non-compliant}

**Entry condition:** Intune admin center shows this macOS device with a "Not compliant" status.

1. In Intune admin center, navigate to **Devices** > **macOS** > [device] > **Compliance**. Review the compliance policy results for each assigned policy. Note which specific rules are showing "Not compliant" — the list shows the exact setting that failed.

2. **For System Integrity Protection (SIP) disabled:**

   > **Say to the user:** "Your device's System Integrity Protection is disabled. This is a security feature that needs to be re-enabled. This requires a special restart that I'll walk you through. Please save any open work before we continue."

   Inform the user: SIP re-enabling requires booting into macOS Recovery Mode. This is a user-guided procedure. For the re-enable steps, escalate to L2 — this is a hardware-mode operation that L1 cannot perform remotely via portal.

3. **For OS version non-compliance:** Check the compliance policy minimum OS version. Navigate to **Devices** > **macOS compliance policies** > [policy] > **Properties** > **System Security**. Compare the required minimum version to the device's current version.
   - If the device is on a supported but not-yet-updated macOS version: prompt the user to install macOS updates via **Apple menu** > **System Preferences** (or System Settings on macOS 13+) > **Software Update**.
   - If the required version is ahead of what Apple currently offers: the compliance policy minimum version may be misconfigured. Proceed to [Escalation Criteria](#escalation-criteria).

4. **For password compliance:** Compliance policies require the device to have a password set. Ask the user: "Do you have a login password set on your Mac?" If not, guide them to **System Settings** > **Lock Screen** > **Require password** to set one. Allow up to 15 minutes for the compliance state to update after the password is set, then trigger a sync: **Devices** > **macOS** > [device] > **Sync**.

5. **For Gatekeeper non-compliance:** Gatekeeper is controlled by a configuration profile (restrict app downloads). If the Gatekeeper compliance check fails, a Gatekeeper enforcement profile may be missing from the device. Check **Devices** > **macOS** > [device] > **Configuration profiles** for a Gatekeeper or endpoint restriction profile.

6. After addressing any fixable compliance issue, trigger a sync: **Devices** > **macOS** > [device] > **Sync**. Wait 10 minutes and refresh the Compliance view. Compliance state updates require the device to check in.

7. > **Say to the user:** "We've made a change to address the compliance issue. The device will check in with our management system in the next few minutes. I'll confirm once the status updates."

---

## Compliant but Access Blocked {#compliant-access-blocked}

**Entry condition:** Intune shows the device status as "Compliant" but the user receives an "Access blocked" or "This device is not recognized" error when accessing Microsoft 365 resources.

1. Confirm the Intune device status is genuinely "Compliant": navigate to **Devices** > **macOS** > [device] > **Overview**. The Compliance field must say "Compliant". If it says anything else, switch to [Device Non-Compliant](#device-non-compliant).

2. In Microsoft Entra admin center (https://entra.microsoft.com), navigate to **Devices** > **All devices**. Search for the device by name or serial number. Confirm a device record exists in Entra.

3. If no Entra device record exists: the device is enrolled in Intune but not registered in Entra ID. This is a Company Portal sign-in gap — the user may not have completed the Company Portal registration step. Refer the user to [Company Portal Sign-In Runbook](15-macos-company-portal-sign-in.md).

4. If the Entra device record exists: check the **Join type** and **Compliance** fields on the Entra device record. Compliance should show "Compliant". If it shows "Not evaluated" or "Not compliant", wait 15 minutes for Intune-to-Entra sync to complete, then recheck.

5. Check whether a Conditional Access grace period applies. Some CA policies include a "Sign-in frequency" or "Use app enforced restrictions" setting that allows access for a limited time before blocking. Ask the user: "When did you first try to access this resource? Has it ever worked from this device?"

6. Navigate to **Entra ID** > **Security** > **Conditional Access** > **Sign-in logs**. Search for the user's sign-in attempts and look for events with "Failure reason: Device is not compliant" or "Device not registered". Note the policy name listed in the failure reason.

7. > **Say to the user:** "Your device shows as compliant in our system, but there may be a brief delay before access is fully restored. Please try signing out of the application and back in. If that doesn't work, I'll escalate this."

8. Ask the user to sign out of the affected Microsoft 365 app and sign in again. If access is still blocked after re-signing in, proceed to [Escalation Criteria](#escalation-criteria).

---

## Escalation Criteria

Escalate to L2 if:

- SIP is disabled and requires re-enabling (user needs guided Recovery Mode procedure)
- OS version compliance policy minimum version exceeds currently-available macOS version (possible policy misconfiguration)
- Device is compliant in Intune but Entra shows "Not compliant" after 15+ minutes
- No Entra device record found and Company Portal runbook steps do not resolve it
- Conditional Access sign-in logs show a specific policy blocking access that may need scope adjustment
- Compliance issue persists after fixing the non-compliant setting and performing a sync

**Before escalating, collect:**

- Device serial number
- macOS version (Apple menu > About This Mac)
- User UPN (email address)
- Compliance status screenshot from Intune (Devices > macOS > [device] > Compliance)
- Which specific compliance rule is failing (from the Compliance detail list)
- Whether Entra device record exists (yes / no)
- Entra compliance status (if record exists)
- Conditional Access sign-in log screenshot showing the blocking policy name (if accessible)
- Description of which Microsoft 365 resource is blocked and the exact error message

See [macOS L2 Runbooks](../l2-runbooks/00-index.md) for compliance log investigation. For compliance policy reference, see [Compliance Policy Guide](../admin-setup-macos/05-compliance-policy.md).

---

[Back to macOS ADE Triage](../decision-trees/06-macos-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-14 | Initial version | -- |
