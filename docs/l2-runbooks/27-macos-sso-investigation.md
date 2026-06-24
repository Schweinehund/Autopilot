---
last_verified: 2026-06-21
review_by: 2026-09-21
applies_to: ADE
audience: L2
platform: macOS
---

> **Platform gate:** This guide covers macOS Platform SSO L2 investigation via Intune and Entra. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For other macOS ADE investigation runbooks, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).

# macOS Platform SSO Investigation

## Context

This runbook covers macOS Platform SSO (PSSO) failure investigation across two failure classes: registration failures (device or user not reaching REGISTERED state) and Password-sync failures (sign-in loop, per-user MFA blocker, AD-bound account limitation).

Before starting: collect a diagnostic package per the [macOS Log Collection Guide](10-macos-log-collection.md). For PSSO investigations, also enable AppSSO debug logging before reproducing the issue — see Track A Step 3 for the debug-enable procedure.

**From L1 escalation?** L1 runbook 35 (SSO sign-in failure / registration not appearing) or L1 runbook 36 (Secure Enclave key loss after password reset) has escalated. L1 collected: device serial number, macOS version, user UPN, `app-sso platform -s` output, and Intune device configuration status screenshot. Route to the matching track:

- L1 35 → Track A: Registration Failure Investigation
- L1 36 → Track A: Registration Failure Investigation (SE key re-registration path)
- Password-sync failures (registration shows REGISTERED but sign-in / token acquisition fails; per-user MFA or AD-bound account suspected) → Track B: Password-Sync Failure Investigation
- No L1 escalation: begin at Track A Step 1 to confirm registration state, then proceed to Track B if registration state shows REGISTERED but sign-in still fails

---

## Track A: Registration Failure Investigation

### Step 1: Confirm registration state via `app-sso platform -s`

Run the following command on the affected macOS device:

```bash
app-sso platform -s
```

The command returns JSON output describing the current Platform SSO state. A healthy PSSO device shows both of the following in the output:

- `Device Registration: REGISTERED`
- `User Registration: REGISTERED`

Additionally, the bottom of the output should show that SSO tokens are being retrieved.

**Interpreting the output:**

If the output shows either `Device Registration` or `User Registration` is not in the `REGISTERED` state, the device or user has not completed PSSO registration. Proceed through the steps below to identify the root cause.

If both show `REGISTERED` but the user cannot sign in to managed apps, the registration succeeded but a post-registration failure is occurring — check Track B (Password-sync) and also review the Intune device configuration status in Step 2.

> **Important:** Do not interpret the absence or unexpected value of any particular JSON field as a specific root cause without correlating with Intune portal state (Step 2) and the sysdiagnose capture (Step 3). The full JSON schema for failure states is not published in any authoritative source — collect and forward the complete output rather than matching against specific field values. See [Platform SSO Setup Guide](../admin-setup-macos/07-platform-sso-setup.md) for the confirmed healthy-state reference.

### Step 2: Intune portal — device configuration status

**Breadcrumb:** Intune admin center > **Devices** > **All devices** > [device serial or name] > **Configuration**

Locate the Platform SSO Settings Catalog policy assigned to the device and review its status.

**Key observations:**

- **"Succeeded" status does not mean registration is complete.** "Succeeded" means the Settings Catalog payload was delivered and installed on the device. It does NOT mean the user responded to the "Registration Required" notification and completed the PSSO registration flow. Always correlate with `app-sso platform -s` output.
- **Error code present** (e.g., "Error 10002" — "multiple SSOe payloads configured"): a legacy Device Features SSO extension profile and a Platform SSO Settings Catalog policy are both assigned to the device simultaneously. This is a configuration conflict that blocks registration. The admin must unassign the legacy profile. For Error 10002 context and staged-migration guidance, see [Enterprise SSO Plugin Migration Guide](../admin-setup-macos/09-enterprise-sso-plugin-migration.md).
- **Status shows "Succeeded" but registration token was mistyped**: the literal value `{{DEVICEREGISTRATION}}` must be copied exactly into the Registration Token field in the Settings Catalog policy. Any deviation causes silent failure — Intune reports "Succeeded" but the "Registration Required" notification never appears. Verify the token value in the policy under Intune admin center > Devices > Configuration > [Platform SSO policy] > Properties > Configuration settings.
- **Company Portal version**: minimum version 5.2404.0 is required for PSSO registration. If the device is running an older version, registration cannot succeed regardless of policy state. Check via Intune admin center > Apps > macOS > Company Portal > Device install status for the affected device.

For the full Configuration-Caused Failures table covering Error 10002, mistyped registration token, and minimum Company Portal version, see [Platform SSO Setup Guide §Configuration-Caused Failures](../admin-setup-macos/07-platform-sso-setup.md).

### Step 3: AppSSO debug logging + sysdiagnose capture

For cases where Step 1 and Step 2 do not identify the root cause, capture a sysdiagnose archive with AppSSO debug logging enabled. This is the Microsoft-documented deep-dive procedure and is required for any Microsoft Support escalation.

**Procedure:**

```bash
# Step 1: Enable persistent AppSSO debug logging
sudo log config --mode "level:debug,persist:debug" --subsystem "com.apple.AppSSO"

# Step 2: Reproduce the issue (sign-in failure, registration failure, or re-registration prompt)
# Note the exact timestamp of the failure for log correlation

# Step 3: Capture a sysdiagnose archive
sudo sysdiagnose

# Step 4: Reset AppSSO logging to defaults
sudo log config --reset --subsystem "com.apple.AppSSO"
```

The sysdiagnose archive is saved to `/private/var/tmp/` (sometimes `/var/tmp/`) as `sysdiagnose_YYYY.MM.DD_*.tar.gz`. Transfer the archive to your investigation workstation.

**Optional — live log stream during reproduction:**

To stream PSSO events in real time while reproducing the issue, open a second Terminal session and run:

```bash
log stream --predicate 'subsystem == "com.apple.AppSSO"' --info
```

This lets you observe events as they occur. However, the sysdiagnose archive (with debug logging enabled) is the required artifact for any Microsoft Support case — the live stream is an L2 investigation aid only.

**What to look for in the sysdiagnose output:**

- AppSSO registration events (token negotiation, profile delivery acknowledgment, registration completion)
- Authentication failures and error domains
- The macOS 15.0–15.2 re-registration loop error signature (see Step 5)

> **Note:** The `app-sso` binary does not have a `diagnose` subcommand in any verified Apple or Microsoft source — do not reference it in escalation packets or instruct users to run it. The sysdiagnose procedure above is the verified Microsoft-documented investigation path.

### Step 4: TLS-inspection exclusion verification

TLS break-and-inspect (SSL interception) on a corporate proxy will silently block PSSO registration and token acquisition flows. The device side cannot detect TLS interception — verification requires the network team to inspect proxy and firewall configuration.

**Action:** Contact the network team and confirm that the following endpoint categories are excluded from TLS inspection on all corporate proxies and firewalls used by the affected devices:

- Apple app-site-association domains (`app-site-association.cdn-apple.com`, `app-site-association.networking.apple`) — required for SSO extension functioning
- Microsoft identity and graph endpoints (`login.microsoftonline.com`, `login.microsoft.com`, `sts.windows.net`) — required for token acquisition and refresh

The Microsoft identity endpoints above are the documented TLS-inspection exclusions from the Platform SSO Setup Guide (DF-10 Known Silent Blocker); see [Platform SSO Setup Guide §Known Silent Blockers](../admin-setup-macos/07-platform-sso-setup.md). The Apple `app-site-association` domains are an additional Apple-platform requirement for the SSO extension (not enumerated in DF-10). The network team should confirm proxy bypass rules are in place for **both** endpoint categories — device-side tests cannot validate this.

### Step 5: macOS 15.0–15.2 re-registration loop check

> **Version gate — macOS 15.0–15.2:** If the device is running macOS 15.0, 15.1, or 15.2, repeated "Registration Required" prompts are caused by a known Apple OS bug. The root cause is a concurrency issue: simultaneous updates from AppSSOAgent and AppSSODaemon processes corrupt the device configuration plist, triggering OS re-registration remediation. The error signature in the sysdiagnose archive is:
>
> ```
> Error Domain=com.apple.PlatformSSO Code=-1001 "Error deserializing device config."
> UserInfo={NSLocalizedDescription=Error deserializing device config.,
>   NSUnderlyingError=... {Error Domain=NSCocoaErrorDomain Code=3840
>   "Garbage at end around line 27, column 1."}}
> ```
>
> **Fixed in macOS 15.3.** Action: upgrade the device to macOS 15.3 or later. If the re-registration loop persists on macOS 15.3+, file an Apple Care case — this is no longer a Microsoft-resolvable issue and Apple must be engaged directly.

To determine the device's macOS version: Intune admin center > Devices > [device] > Overview, or ask the user to navigate to System Settings > General > About.

---

## Track B: Password-Sync Failure Investigation

Use Track B when the device and user registration state shows REGISTERED (confirmed via `app-sso platform -s` output from Track A Step 1) but the user cannot complete the Password-sync PSSO sign-in flow — for example, the webview authentication challenge does not complete, the sign-in loop repeats, or no SSO tokens appear in the `app-sso platform -s` output despite registration succeeding.

### Step 1: Per-user MFA check (Entra admin center)

Legacy per-user MFA (the Azure AD per-user MFA settings blade, distinct from Conditional Access MFA policy) silently blocks Password-sync PSSO registration. The authentication challenge in the PSSO webview cannot complete when per-user MFA is enabled, and no error is displayed to the user.

**Breadcrumb:** Entra admin center (https://entra.microsoft.com) > **Users** > **All users** > [affected user] > **Authentication methods** > **Per-user MFA** (or navigate directly to the legacy per-user MFA blade: https://account.activedirectory.windowsazure.com/usermanagement/mfasettings.aspx)

**What to check:** If the affected user's per-user MFA state shows **Enabled** or **Enforced**, this is the blocker for Password-sync PSSO failures.

**Resolution:** Disable per-user MFA for PSSO target users. Enforce MFA via Conditional Access policy instead — Conditional Access MFA is compatible with Password-sync PSSO; per-user MFA is not.

For the full DF-3 per-user MFA blocker documentation, including the interaction between legacy per-user MFA and the PSSO webview authentication challenge, see [macOS Auth Methods Deep-Dive §DF-3](../admin-setup-macos/08-auth-methods-deep-dive.md).

### Step 2: AD-bound (mobile) account check

macOS user accounts created by Active Directory binding (AD mobile accounts) silently fail Password-sync PSSO registration. The PSSO password synchronization API expects a standard macOS local account; AD mobile accounts do not satisfy this requirement, and no error is surfaced.

**Device-side check:** On the affected macOS device, run:

```bash
dscl . -read /Users/<username> OriginalNodeName
```

Replace `<username>` with the macOS login username. If the output shows an `OriginalNodeName` value pointing to an Active Directory domain (e.g., `Active Directory/CORP`), the account is an AD mobile account.

Alternatively, navigate to System Settings > Users & Groups and inspect the account type. An AD mobile account will typically show the domain association in its account details.

**Resolution:** For organizations transitioning away from AD binding:

- Use the Secure Enclave authentication method instead of Password-sync — SE key authentication is compatible with AD mobile accounts. See [macOS Auth Methods Deep-Dive](../admin-setup-macos/08-auth-methods-deep-dive.md) for a comparison of SE key vs. Password-sync requirements.
- If Password-sync is required, the device must be unbound from AD and the user account migrated to a standard local macOS account before Password-sync PSSO registration can succeed.

For the full DF-7 AD-bound account limitation documentation and transition guidance, see [macOS Auth Methods Deep-Dive §DF-7](../admin-setup-macos/08-auth-methods-deep-dive.md).

---

## Microsoft Support Escalation Packet

When Track A or Track B investigation does not resolve the issue, engage Microsoft Support. Assemble the following before opening a case:

- **`app-sso platform -s` full JSON output** — captured on the affected device at the time of failure; include the complete output, not excerpts
- **sysdiagnose archive** — captured with AppSSO debug logging enabled before reproducing the issue (Track A Step 3 procedure); required for Microsoft Support to analyze PSSO subsystem events
- **Company Portal log incident ID** — generated via Company Portal app > Help > Send diagnostic report > Email logs; note the incident ID before closing — Microsoft Support uses this to retrieve the associated logs
- **Intune device configuration status screenshot** — Intune admin center > Devices > [device] > Configuration, showing the Platform SSO Settings Catalog policy status (Succeeded / error code)
- **macOS version** and **Company Portal version** — from the Intune device record or device About screen
- **Entra sign-in log screenshot** — Entra admin center > Monitoring > Sign-in logs, filtered to the affected user, showing any MFA failures, Conditional Access policy blocks, or sign-in error codes

---

## Related Resources

- [macOS Log Collection Guide (runbook 10)](10-macos-log-collection.md) — prerequisite for this runbook
- [L1 Runbook 35: macOS Platform SSO Sign-In Failure](../l1-runbooks/35-macos-sso-sign-in-failure.md) — escalation source (registration not appearing / sign-in failure)
- [L1 Runbook 36: macOS Platform SSO — Secure Enclave Key Loss](../l1-runbooks/36-macos-secure-enclave-key.md) — escalation source (key loss after password reset)
- [macOS Platform SSO Setup Guide](../admin-setup-macos/07-platform-sso-setup.md) — Configuration-Caused Failures table, `app-sso platform -s` healthy output reference, TLS exclusion endpoints DF-10 (link-not-copy)
- [macOS Auth Methods Deep-Dive](../admin-setup-macos/08-auth-methods-deep-dive.md) — SE key behavior, DF-3 per-user MFA, DF-7 AD-bound account (link-not-copy)
- [Enterprise SSO Plugin Migration Guide](../admin-setup-macos/09-enterprise-sso-plugin-migration.md) — Error 10002 / legacy plug-in conflict context (link-not-copy)
- [macOS ADE L2 Runbook Index](00-index.md#macos-ade-runbooks)
- [macOS MDM Migration Failure (runbook 30)](30-macos-mdm-migration-failure.md) — for PSSO re-registration stuck post-migration from Kandji/Iru; Track C of runbook 30 routes to this runbook

---

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-24 | Phase 90 (RUN-01): appended reciprocal Related Resources entry -> L2 #30 macOS MDM Migration Failure | -- |
| 2026-06-21 | Initial version — macOS Platform SSO L2 investigation (SSORUN-03): Registration Failure track + Password-Sync Failure track; macOS 15.0–15.2 version-gate callout | -- |
