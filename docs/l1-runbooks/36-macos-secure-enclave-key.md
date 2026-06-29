---
last_verified: 2026-06-29
review_by: 2026-09-29
applies_to: ADE
audience: L1
platform: macOS
---

> **Platform gate:** This guide covers macOS ADE troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks).

# macOS Platform SSO — Secure Enclave Key Loss

Use this runbook when a user's Platform SSO stops working after a password reset, after using a FileVault recovery key to unlock the device, or when `app-sso platform -s` shows User Registration not in REGISTERED state despite the device previously being enrolled in Platform SSO.

> **If the user cannot log in:** If the user does not yet have access to their Mac (local password unknown or lost), use [macOS Local Password Recovery (L1 #37)](37-macos-local-password-reset.md) first to regain access, then return here for the mandatory PSSO re-registration.

## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com)
- Access to Microsoft Entra admin center (https://entra.microsoft.com) — read-only is sufficient
- Device serial number
- User's UPN (email address)

## Steps

1. > **Say to the user:** "We're going to check the status of your device's Single Sign-On key. I'll need you to open the Terminal app on your Mac and run one command for me. Please open Terminal — you can find it in Applications > Utilities, or search for 'Terminal' in Spotlight (Cmd+Space)."

   Once Terminal is open, have the user run the following command exactly as shown:

   ```bash
   app-sso platform -s
   ```

   Ask the user to copy and paste the **complete output** back to you (the full JSON block, not just part of it).

   After a Secure Enclave key loss event, the output will typically show User Registration not in a REGISTERED state, while Device Registration may still show REGISTERED — the device-level registration survives a password reset, but the user-level Secure Enclave key binding is destroyed. For the confirmed healthy output format (both `Device Registration: REGISTERED` and `User Registration: REGISTERED`), see [Platform SSO Setup Guide — Verification section](../admin-setup-macos/07-platform-sso-setup.md).

   Note the full output and continue with the steps below.

2. Confirm what event triggered the Platform SSO failure by asking the user:

   > **Say to the user:** "Did anything happen recently that might have changed your Mac password? For example: did your IT team reset your password remotely, or did you unlock your Mac at startup using a recovery key instead of your regular password?"

   - If the user's password was reset remotely by IT (via an Intune device action), this is a known cause of Secure Enclave key loss.
   - If the user unlocked the Mac at cold boot using a FileVault recovery key (instead of their regular password), this is also a known cause of Secure Enclave key loss.

   Both events destroy the Secure Enclave key binding that Platform SSO uses for Entra authentication. This is expected macOS behavior, not a bug. For the technical explanation of why this occurs, see [macOS Auth Methods Deep-Dive — SE Key Destruction Warning](../admin-setup-macos/08-auth-methods-deep-dive.md).

   **Important note for the user:** FileVault disk encryption is not affected — the device boots and unlocks normally using the local password. Only the Platform SSO function (Entra SSO via the Secure Enclave key) is broken. Local apps and files are still accessible.

3. Guide the user through the re-registration path to provision a new Secure Enclave key. The path differs by macOS version:

   - **macOS 14 and later (Sonoma):** System Settings > **Users & Groups** > **Network Account Server** > select the corporate account > **Edit** > **Repair**. The user will be prompted to complete MFA with their Entra credentials. After completing MFA, a new Secure Enclave key is provisioned and Platform SSO is restored.

   - **macOS 13 (Ventura):** The System Settings Repair path is not available. Instead, have the user open **Company Portal**, sign in with their corporate credentials, and follow any deregister and re-register prompts. After re-registration, the user completes MFA and a new Secure Enclave key is provisioned.

4. After the repair or re-registration is complete, verify the result:

   > **Say to the user:** "Please go back to Terminal and run the same command again: `app-sso platform -s`"

   ```bash
   app-sso platform -s
   ```

   Confirm the output now shows both `Device Registration: REGISTERED` and `User Registration: REGISTERED`. If both fields are in REGISTERED state and the user can now access Microsoft 365 resources, the issue is resolved.

   If the output still does not show User Registration in REGISTERED state after completing the repair or re-registration, proceed to [Escalation Criteria](#escalation-criteria).

## Escalation Criteria

Escalate to L2 if:

- `app-sso platform -s` still shows User Registration not in REGISTERED state after the user completes the macOS 14 Repair path or macOS 13 Company Portal deregister and re-registration
- The user cannot complete MFA during the Repair or re-registration flow (MFA failure, blocked, or looping)
- The Repair option is not available in System Settings > Users & Groups > Network Account Server (may indicate device-level registration is also lost)
- The Platform SSO failure did not follow a password reset or FileVault recovery key use and the root cause is unclear
- Any admin-level intervention is required

**Before escalating, collect:**

- Full output of `app-sso platform -s` (the complete JSON block — not a single field)
- Device serial number
- User UPN (email address)
- macOS version (Apple menu > About This Mac)
- What triggered the issue (MDM-driven password reset / FileVault recovery key use / unknown)
- Whether the macOS 14 Repair path or macOS 13 Company Portal re-registration was attempted, and what happened

See [macOS Platform SSO Investigation (L2 #27)](../l2-runbooks/27-macos-sso-investigation.md) for PSSO registration failure investigation when re-registration does not resolve the issue.

---

[Back to macOS ADE Triage](../decision-trees/06-macos-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-21 | Initial version | -- |
