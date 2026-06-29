---
last_verified: 2026-06-29
review_by: 2026-09-29
applies_to: ADE
audience: L1
platform: macOS
---

> **Platform gate:** This guide covers macOS ADE troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks).

# macOS Local Password Recovery: Secure Enclave PSSO Devices

Use this runbook when a user cannot log in to their Mac because their local password is unknown or forgotten. This runbook covers three recovery paths: the escrowed FileVault recovery key (primary), the macOS LAPS managed admin account (secondary), and Apple ID reset (where org policy allows).

**If the user can log in but Platform SSO is broken** after a recent password reset or FileVault recovery key use, go directly to [L1 #36 — macOS Platform SSO: Secure Enclave Key Loss](36-macos-secure-enclave-key.md) instead.

## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com)
- Access to Microsoft Entra admin center (https://entra.microsoft.com) — read-only is sufficient
- Device serial number
- User's UPN (email address)

## Steps

Before attempting recovery: if the user has already tried Self-Service Password Reset (SSPR), advise them that SSPR resets the Entra ID (cloud) password only and does NOT reset the independent local macOS password on Secure Enclave Platform SSO devices. The local password is managed separately under the Secure Enclave and is unaffected by any cloud password change. For the technical background, see [Platform SSO Setup Guide — Local password lifecycle and rotation](../admin-setup-macos/07-platform-sso-setup.md#local-password-lifecycle-and-rotation) and [Configuration Profiles — Local Password Policy](../admin-setup-macos/03-configuration-profiles.md#local-password-policy-passcode).

Work through the paths below in order. Try Path A first. If it is not available, proceed to Path B, then Path C.

---

### Recovery Path A — Escrowed FileVault Recovery Key (Primary)

This path uses the personal FileVault recovery key that Intune automatically escrows when the device is encrypted by a corporate policy. No additional setup is required — the key is available by default on all Intune-managed, corporate-encrypted Macs.

**Step A1 — Retrieve the recovery key**

*Option 1 — Admin retrieves the key from Intune (Corporate devices only):*

1. In the Intune admin center, navigate to **Devices** > **All devices** > search for the device by serial number > select the device.
2. Go to **Monitor** > **Recovery keys**.
3. Click **Show Recovery Key**.
   - This option is available for Corporate-owned devices only (not Personal/BYOD).
   - Requires an RBAC role with **Remote tasks > Rotate FileVault key = Yes** (built-in roles: Help Desk Operator or Endpoint Security Administrator).
4. Record the recovery key exactly as displayed — it is a 24-character alphanumeric string and is case-sensitive.

*Option 2 — User retrieves the key via Company Portal (self-service):*

1. On a different device or mobile phone, open a browser and navigate to the Company Portal website: `https://portal.manage.microsoft.com`.
2. Sign in with the user's corporate credentials.
3. Select **Devices** and find the affected Mac.
4. Select **Get recovery key**.
5. Record the recovery key exactly as displayed.

**Step A2 — Enter the recovery key at the macOS login window**

1. > **Say to the user:** "At the login window on your Mac, click your account name if it is visible. Below the password field you should see a small question mark icon '?'. Click that '?' icon now."

2. > **Say to the user:** "A prompt will appear. Look for an option to use a recovery key — it may say 'Reset it using your recovery key' or show a key symbol. Select that option."

3. > **Say to the user:** "Type in the recovery key exactly as I give it to you — it is case-sensitive. Type it carefully, then press Return or click the arrow."

4. macOS will prompt the user to set a new local password. Guide the user to choose a password they will remember and confirm it when prompted.

5. Once the new password is accepted, the user can log in to their Mac with the new password.

> **After completing Path A:** Using the FileVault recovery key destroys the Secure Enclave key binding that Platform SSO uses for Entra authentication — this is expected macOS behavior, not a bug. Platform SSO will not function until a new Secure Enclave key is provisioned. Proceed immediately to [L1 #36 — macOS Platform SSO: Secure Enclave Key Loss](36-macos-secure-enclave-key.md) for the mandatory PSSO re-registration before closing this ticket.

---

### Recovery Path B — macOS LAPS Managed Admin Account (Secondary)

This path uses the Intune-managed local admin account (LAPS) that Intune provisions on corporate Macs as a break-glass recovery mechanism. The LAPS account password is auto-generated and auto-rotated by Intune (default rotation: 6 months).

**Step B1 — Retrieve the LAPS password from Intune**

1. In the Intune admin center, navigate to **Devices** > **All devices** > search for the device by serial number > select the device.
2. Select **Local admin password** from the device menu (under **Monitor**).
3. Click **Show local administrator password**.
4. Note the **Account** name displayed (this is the login name for the LAPS admin account on this specific device) and the **Password**.
   - Retrieve this password just before the recovery session begins, as it may rotate.

**Step B2 — Log in as the LAPS admin at the macOS login window**

1. > **Say to the user:** "At the macOS login window, look for a way to switch users or log in as a different user. You may see an 'Other...' option or a list of accounts. Click 'Other...' if it appears, or look for a way to type a different username."

2. > **Say to the user:** "In the username field, type exactly: [provide the LAPS Account name from Intune]. Then in the password field, type the password I will give you. Press Return to log in."

3. The Mac will log in to the LAPS managed admin session.

**Step B3 — Reset the end-user's local password**

1. In the LAPS admin session, open **System Settings** (macOS 13 Ventura and later) or **System Preferences** (macOS 12 Monterey and earlier).
2. Navigate to **Users & Groups**.
3. Find the end-user's account in the list and select it.
4. Click **Reset Password** (or click the password field for the account) and set a temporary password. Note this temporary password to give to the user.
5. Confirm the change and close System Settings.

**Step B4 — Log out and have the user log in**

1. Log out of the LAPS admin session: Apple menu > **Log Out**.
2. > **Say to the user:** "Please log in with your own account name and the temporary password: [provide the temporary password]."
3. macOS will prompt the user to change their password at first login. Guide them to set a new password they will remember.

> **After completing Path B:** Resetting the local password via the LAPS admin account destroys the Secure Enclave key binding that Platform SSO uses for Entra authentication — this is expected macOS behavior, not a bug. Platform SSO will not function until a new Secure Enclave key is provisioned. Proceed immediately to [L1 #36 — macOS Platform SSO: Secure Enclave Key Loss](36-macos-secure-enclave-key.md) for the mandatory PSSO re-registration before closing this ticket.

---

### Recovery Path C — Apple ID Reset (Where Org Policy Allows)

This path uses the macOS login-window Apple ID password reset feature. It is only available where org policy permits Apple IDs on corporate ADE accounts, and only if the user's local macOS account has an Apple ID associated with it.

**Pre-check — confirm eligibility before proceeding:**

> **Say to the user:** "Before we try this option, I need to ask: do you have a personal Apple ID that you have linked to this Mac — for example, an iCloud account you used when setting up the computer? This would be separate from your work email."

- If the user has **no Apple ID associated** with their Mac account — use Path A or Path B instead. Corporate ADE accounts provisioned by Intune MDM may not have an Apple ID linked, and this path will not be available.
- If **org policy does not permit Apple ID use** on corporate devices — use Path A or Path B instead.

Proceed with Path C only if the user confirms they have an Apple ID linked to this Mac and org policy permits it.

**Step C1 — Trigger the Apple ID reset at the macOS login window**

1. > **Say to the user:** "At the login window, click your account name. Below the password field, click the question mark '?' icon."

2. > **Say to the user:** "Look for an option that mentions your Apple ID — it may say 'Reset using Apple ID' or show an Apple ID option. Select that option."

3. > **Say to the user:** "Sign in with your Apple ID and Apple ID password when prompted. If you are asked for two-factor authentication, approve it on your trusted iPhone or enter the code sent to your trusted phone number."

4. macOS will guide the user through creating a new local password. Guide them to set a password they will remember and confirm it.

5. Once the new password is accepted, the user can log in to their Mac.

> **After completing Path C:** Resetting the local password via Apple ID destroys the Secure Enclave key binding that Platform SSO uses for Entra authentication — this is expected macOS behavior, not a bug. Platform SSO will not function until a new Secure Enclave key is provisioned. Proceed immediately to [L1 #36 — macOS Platform SSO: Secure Enclave Key Loss](36-macos-secure-enclave-key.md) for the mandatory PSSO re-registration before closing this ticket.

## Escalation Criteria

Escalate to L2 if:

- The FileVault recovery key (Path A) is not available in Intune — this may indicate the device was encrypted outside of Intune policy or the escrow step failed; admin-level investigation is needed
- The LAPS managed admin account (Path B) is not listed in Intune for this device, or the retrieved password does not work at the login window
- The user has no Apple ID associated with their account and neither Path A nor Path B is available
- The user successfully logs in after recovery but the mandatory PSSO re-registration in [L1 #36](36-macos-secure-enclave-key.md) fails — escalate per L1 #36's Escalation Criteria
- Any other admin-level intervention is required

**Before escalating, collect:**

- Device serial number
- User UPN (email address)
- macOS version (visible at the login window, or via Apple menu > About This Mac after logging in)
- Which recovery path was attempted and what occurred at each step
- Whether a FileVault recovery key is present in Intune for this device
- Whether a LAPS managed admin account is visible in Intune for this device

See [macOS Platform SSO Investigation (L2 #27)](../l2-runbooks/27-macos-sso-investigation.md) for PSSO registration failure investigation when re-registration does not resolve the issue after recovering local account access.

---

[Back to macOS ADE Triage](../decision-trees/06-macos-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-29 | Initial version | -- |
