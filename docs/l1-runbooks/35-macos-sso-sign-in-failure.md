---
last_verified: 2026-06-21
review_by: 2026-09-21
applies_to: ADE
audience: L1
platform: macOS
---

> **Platform gate:** This guide covers macOS ADE troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks).

# macOS Platform SSO Sign-In Failure

Use this runbook when a user's Mac does not display the "Registration Required" notification despite Intune reporting a "Succeeded" status for the Platform SSO policy, or when the user cannot sign in via Platform SSO after a registration attempt.

## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com)
- Access to Microsoft Entra admin center (https://entra.microsoft.com) — read-only is sufficient
- Device serial number
- User's UPN (email address)

## Steps

1. > **Say to the user:** "We're going to check the status of your device's Single Sign-On configuration. I'll need you to open the Terminal app on your Mac and run one command for me. Please open Terminal — you can find it in Applications > Utilities, or search for 'Terminal' in Spotlight (Cmd+Space)."

   Once Terminal is open, have the user run the following command exactly as shown:

   ```bash
   app-sso platform -s
   ```

   Ask the user to copy and paste the **complete output** back to you (the full JSON block, not just part of it). The expected healthy output includes both `Device Registration: REGISTERED` and `User Registration: REGISTERED`, along with SSO tokens listed at the bottom. For the confirmed healthy output format, see [Platform SSO Setup Guide — Verification section](../admin-setup-macos/07-platform-sso-setup.md).

   If the output shows anything other than both fields in a REGISTERED state, note the full output — do **not** attempt to interpret individual field values; collect the complete output and continue triage below. Proceed to the next steps to identify the root cause.

2. In the Intune admin center, navigate to **Devices** > **macOS** > select the device by serial number > **Configuration**. Locate the Platform SSO Settings Catalog policy. Check the status column.

   - If the policy shows an **error code (such as Error 10002)** — proceed to **Root Cause 2** below.
   - If the policy shows **"Succeeded"** but the user never received a "Registration Required" notification — proceed to **Root Cause 3 or 4** below.
   - If the policy shows **"Succeeded"** and the user did receive a notification — proceed to **Root Cause 4** below.

3. **Root Cause 1 — Old Company Portal version (version older than 5.2404.0):**

   In Intune admin center, navigate to **Apps** > **macOS** > Company Portal > **Device install status**. Find this device and check the installed version. Alternatively, ask the user to open Company Portal and check the version via the **Help** menu.

   If the installed Company Portal version is older than **5.2404.0**, this is the root cause. Company Portal must be at version 5.2404.0 or later for the Platform SSO Enterprise SSO plug-in to function. Trigger an app update: navigate to **Devices** > **macOS** > [device] > **Sync**, wait 15–20 minutes, and ask the user to check Company Portal again. If the update does not install, escalate — see [Escalation Criteria](#escalation-criteria).

4. **Root Cause 2 — Error 10002 — Legacy SSO extension conflict:**

   Error 10002 ("multiple SSOe payloads configured") occurs when both a legacy Device Features SSO app extension profile and the newer Platform SSO Settings Catalog policy are assigned to the same device simultaneously. Neither profile can take effect while both are assigned.

   For the staged-migration context and the correct removal sequence, see [Enterprise SSO Plugin Migration Guide](../admin-setup-macos/09-enterprise-sso-plugin-migration.md).

   In the Intune admin center, navigate to **Devices** > **macOS** > [device] > **Configuration** and look for both a Device Features profile (containing an SSO extension payload) and a Settings Catalog Platform SSO profile both showing as applied. If both are present, the legacy profile must be unassigned before PSSO can register. This is an admin-level action — escalate if you do not have policy assignment permissions. See [Escalation Criteria](#escalation-criteria).

5. **Root Cause 3 — Mistyped `{{DEVICEREGISTRATION}}` registration token:**

   When the Intune Platform SSO Settings Catalog policy is configured with an incorrectly typed registration token, the profile deploys successfully (Intune shows "Succeeded") but the "Registration Required" notification never appears and registration never starts. The token must be typed exactly as `{{DEVICEREGISTRATION}}` — including both sets of braces — in the Registration Token field of the policy.

   For the Configuration-Caused Failures table covering this and related token issues, see [Platform SSO Setup Guide — Configuration-Caused Failures](../admin-setup-macos/07-platform-sso-setup.md).

   Navigate to **Devices** > **Configuration** > [Platform SSO policy] > **Edit** > review the Registration Token field. If the token does not match `{{DEVICEREGISTRATION}}` exactly, this is an admin-level fix requiring policy editing. Escalate if you do not have Policy and Profile Manager permissions. See [Escalation Criteria](#escalation-criteria).

6. **Root Cause 4 — Dismissed "Registration Required" notification:**

   If Intune shows the Platform SSO policy as "Succeeded" and the device has a compatible Company Portal version, the most likely remaining cause is that the user received the "Registration Required" notification but dismissed it without completing registration. This notification does not re-appear automatically.

   > **Say to the user:** "Did you see a notification on your Mac recently asking you to register your device or complete a sign-in? If you dismissed it without completing it, we'll need to trigger the registration again."

   Guide the user through the re-registration path based on their macOS version:

   - **macOS 14 and later:** System Settings > **Users & Groups** > **Network Account Server** > select the account > **Edit** > **Repair**. The user will be prompted to complete MFA and re-register.
   - **macOS 13:** Open Company Portal, sign in with corporate credentials, and follow any registration or set-up prompts. The registration notification may not reappear via System Settings on macOS 13; the Company Portal re-registration path is the supported option.

   After repair or re-registration completes, ask the user to run `app-sso platform -s` again in Terminal and confirm the output shows both `Device Registration: REGISTERED` and `User Registration: REGISTERED`.

## Escalation Criteria

Escalate to L2 if:

- Error 10002 is present and requires unassigning the legacy SSO extension profile (admin-level policy change)
- The registration token in the Platform SSO policy is incorrect and requires policy editing (admin-level action)
- `app-sso platform -s` still shows User Registration or Device Registration not in REGISTERED state after the user completes the macOS 14 Repair path or macOS 13 Company Portal re-registration
- Company Portal version is below 5.2404.0 and the app update does not install after a sync
- The symptom does not match any of the four root causes above
- Any other admin-only remediation is required

**Before escalating, collect:**

- Full output of `app-sso platform -s` (the complete JSON block — not a single field)
- Device serial number
- User UPN (email address)
- macOS version (Apple menu > About This Mac)
- Company Portal version (Company Portal app > Help menu, or Intune admin center app install status)
- Screenshot of the Intune device configuration status for the Platform SSO policy (Devices > [device] > Configuration)
- Which root cause was suspected and what steps were already attempted

See [macOS Platform SSO Investigation (L2 #27)](../l2-runbooks/27-macos-sso-investigation.md) for PSSO registration and Password-sync failure investigation.

---

[Back to macOS ADE Triage](../decision-trees/06-macos-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-21 | Initial version | -- |
