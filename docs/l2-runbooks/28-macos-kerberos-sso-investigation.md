---
last_verified: 2026-06-23
review_by: 2026-09-23
applies_to: ADE
audience: L2
platform: macOS
---

> **Platform gate:** This guide covers macOS Kerberos SSO Extension L2 investigation. For macOS Platform SSO investigation, see [macOS Platform SSO Investigation](27-macos-sso-investigation.md). For other macOS ADE investigation runbooks, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).

# macOS Kerberos SSO Extension Investigation

## Context

This runbook covers macOS Kerberos SSO Extension failure investigation across two failure classes: ticket-acquisition failures (TGT not issued, realm/KDC unreachable, no entries in the Kerberos credential cache) and PSSO-TGT integration failures (`usePlatformSSOTGT` path — Kerberos extension unable to consume TGTs issued by Platform SSO).

Before starting: collect a diagnostic package per the [macOS Log Collection Guide](10-macos-log-collection.md). For Kerberos investigations, enable AppSSO debug logging before reproducing the issue (see Track A Step 3 for the procedure).

No L1 escalation exists for this failure class — begin at Track A Step 1. For shared-symptom tickets involving Platform SSO, see [macOS Platform SSO Investigation](27-macos-sso-investigation.md).

---

## Track A: Ticket Acquisition Failure (TGT Not Issued)

Use Track A when the Kerberos SSO extension is not issuing Kerberos TGTs: users are prompted for Kerberos credentials repeatedly, `klist` shows no tickets, or `app-sso platform -s` shows no `tgt_ad` or `tgt_cloud` keys.

### Step 1: Confirm PSSO registration and TGT state via `app-sso platform -s`

Run the following command on the affected macOS device:

```bash
app-sso platform -s
```

The command returns JSON output describing the current Platform SSO state, including any Kerberos TGT paths issued through the PSSO-TGT integration. Examine the output for the following keys:

**Interpreting the output:**

| Key in output | What it signals |
|---------------|----------------|
| `ticketKeyPath: tgt_ad` | On-prem Active Directory TGT is functioning — the Kerberos extension is sharing a PSSO-issued on-prem AD TGT |
| `ticketKeyPath: tgt_cloud` | Cloud Kerberos TGT is active — Azure Files / Entra Cloud Kerberos TGT is available |
| Neither `tgt_ad` nor `tgt_cloud` | TGT sharing is not active — `usePlatformSSOTGT` may not be set, PSSO may not be registered, or the Kerberos profile has not yet been received |

> **Important — cosmetic "Not signed in" in the menu bar:** A correctly configured and fully functioning PSSO + Kerberos TGT deployment may display **"Not signed in"** in the macOS Kerberos menu-bar extra (the key icon in the menu bar). This is a cosmetic display artifact of the `usePlatformSSOTGT` integration — the Kerberos extension is consuming a TGT from Platform SSO rather than managing its own credentials, so the menu-bar extra has no user account to display. If `app-sso platform -s` shows `tgt_ad` in the output, Kerberos SSO is functioning correctly. **Do not treat "Not signed in" in the menu bar as a failure indicator** in PSSO-integrated deployments. Trust `app-sso platform -s` over the menu-bar display.

> **Important:** Do not interpret the absence or unexpected value of any particular JSON field in isolation as a specific root cause. Collect the complete output and correlate with Intune portal state (Step 2) and the sysdiagnose capture (Step 3). See [Kerberos SSO Extension Guide](../admin-setup-macos/10-kerberos-sso-extension.md) for the confirmed healthy-state reference.

Also check the two basic registration states in the output:

- `Device Registration: REGISTERED`
- `User Registration: REGISTERED`

If either is not `REGISTERED`, PSSO itself is not fully registered. Complete the PSSO investigation first using [macOS Platform SSO Investigation](27-macos-sso-investigation.md) — PSSO registration must be confirmed before the Kerberos extension's `usePlatformSSOTGT` path can function.

### Step 2: Inspect Kerberos ticket cache via `klist`

Run the following command to inspect the Kerberos credential cache:

```bash
klist
```

**What to look for:**

```
Credentials cache: API:...
        Principal: user@CONTOSO.COM

  Issued                Expires               Service principal
  [timestamp]           [timestamp]           krbtgt/CONTOSO.COM@CONTOSO.COM
  [timestamp]           [timestamp]           krbtgt/KERBEROS.MICROSOFTONLINE.COM@KERBEROS.MICROSOFTONLINE.COM
```

| Service principal in output | What it signals |
|-----------------------------|----------------|
| `krbtgt/CONTOSO.COM@CONTOSO.COM` | On-prem Active Directory TGT is present and valid |
| `krbtgt/KERBEROS.MICROSOFTONLINE.COM@KERBEROS.MICROSOFTONLINE.COM` | Cloud Kerberos TGT is present (Azure Files profile deployed) |
| No entries / "No credentials cache found" | PSSO registration not complete, profiles not yet received, or TGTs have expired |

**Realm and KDC reachability:** If `klist` shows no tickets and `app-sso platform -s` shows neither `tgt_ad` nor `tgt_cloud`, check the following:

- **Profile assignment:** Confirm the Kerberos `.mobileconfig` profile is assigned to the correct user group in Intune (Intune admin center > Devices > Configuration) and shows as installed on the device.
- **Realm case:** The `Realm` key in the `.mobileconfig` must be in ALL CAPS (e.g., `CONTOSO.COM`). Lowercase realm values silently fail to match the on-prem AD Kerberos realm.
- **Network path to KDC:** AD Kerberos realm reachability (DNS SRV records, TCP/UDP port 88, KDC connectivity) is an AD-admin responsibility. If profile assignment and PSSO registration are confirmed but tickets still do not appear, escalate KDC reachability to your AD team. The [Kerberos SSO Extension Guide §Realm and KDC Reachability](../admin-setup-macos/10-kerberos-sso-extension.md) documents the admin-level checks at the Intune boundary.
- **Company Portal version:** Confirm Company Portal 5.2408.0 or later is installed on the device (Settings > Company Portal > About). Earlier versions do not support PSSO TGT sharing with the Kerberos extension.

### Step 3: AppSSO debug logging + sysdiagnose capture

For cases where Steps 1 and 2 do not identify the root cause, capture a sysdiagnose archive with AppSSO debug logging enabled. This is the required deep-dive procedure for any Microsoft Support escalation.

**Procedure (link-not-copy from [macOS Platform SSO Investigation](27-macos-sso-investigation.md) Track A Step 3):**

```bash
# Step 1: Enable persistent AppSSO debug logging
sudo log config --mode "level:debug,persist:debug" --subsystem "com.apple.AppSSO"

# Step 2: Reproduce the issue (TGT acquisition failure, repeated Kerberos credential prompts)
# Note the exact timestamp of the failure for log correlation

# Step 3: Capture a sysdiagnose archive
sudo sysdiagnose

# Step 4: Reset AppSSO logging to defaults
sudo log config --reset --subsystem "com.apple.AppSSO"
```

The sysdiagnose archive is saved to `/private/var/tmp/` (sometimes `/var/tmp/`) as `sysdiagnose_YYYY.MM.DD_*.tar.gz`. Transfer the archive to your investigation workstation.

**Optional — live log stream during reproduction:**

```bash
log stream --predicate 'subsystem == "com.apple.AppSSO"' --info
```

> **Note:** The `app-sso` binary does not have a `diagnose` subcommand in any verified Apple or Microsoft source — do not reference it in escalation packets or instruct users to run it. The sysdiagnose procedure above is the verified Microsoft-documented investigation path.

---

## Track B: PSSO-TGT Integration Failure (`usePlatformSSOTGT`)

Use Track B when the Kerberos extension is deployed with `usePlatformSSOTGT: true` but the extension is not sharing TGTs issued by Platform SSO — specifically when `app-sso platform -s` confirms PSSO Device and User Registration are both `REGISTERED` but neither `tgt_ad` nor `tgt_cloud` appears in the output, suggesting the PSSO-TGT integration path itself is not functioning.

### Step 1: Verify macOS 14.6+ version floor

The `usePlatformSSOTGT` key requires macOS 14.6 Sonoma or later. On earlier macOS versions, the key is silently ignored and the Kerberos extension acquires its own TGT independently (without PSSO sharing).

**Check the device's macOS version:** Intune admin center > Devices > [device] > Overview, or ask the user to navigate to System Settings > General > About.

If the device is running macOS earlier than 14.6, the PSSO-TGT integration cannot function. Upgrade to macOS 14.6+ to enable TGT sharing.

Additionally, confirm Company Portal 5.2408.0 or later is installed — this version is required for PSSO TGT sharing with the Kerberos extension.

### Step 2: Verify `usePlatformSSOTGT: true` in the Kerberos profile

Confirm that the deployed Kerberos `.mobileconfig` includes `usePlatformSSOTGT: true` in the `ExtensionData` dictionary.

**Check in Intune:** Navigate to Intune admin center > Devices > Configuration > [Kerberos .mobileconfig profile] > Properties > Configuration profile. Download the profile and inspect the plist for:

```xml
<key>usePlatformSSOTGT</key>
<true/>
```

If this key is absent or set to `<false/>`, the Kerberos extension will not attempt to consume PSSO TGTs. Update the `.mobileconfig` to add or correct this key and reassign the updated profile.

Also verify the extension identifier in the profile is `com.apple.AppSSOKerberos.KerberosExtension` and the payload `Type` is `Credential` (not `Redirect`). A wrong extension identifier or wrong type causes the extension to silently fail to load. See [Kerberos SSO Extension Guide §Configuration-Caused Failures](../admin-setup-macos/10-kerberos-sso-extension.md) for the K-1 and K-5 callout table.

### Step 3: Confirm PSSO registration precedes Kerberos profile delivery

The `usePlatformSSOTGT` integration requires PSSO to be fully registered on the device **before** the Kerberos extension attempts to consume TGTs. Deploying the Kerberos profile before PSSO registration is complete has no effect — the extension has no PSSO TGT to reuse.

**Verify ordering:**

1. Run `app-sso platform -s` and confirm both `Device Registration: REGISTERED` and `User Registration: REGISTERED` are present.
2. Confirm the Kerberos profile deployment was assigned to user groups (not device groups) — same assignment rule as Platform SSO. Assigning to device groups can cause the extension to load before user context is available.
3. If PSSO registration is not confirmed, complete the PSSO investigation first: [macOS Platform SSO Investigation](27-macos-sso-investigation.md) Track A.
4. After PSSO registration is confirmed and the Kerberos profile is assigned, trigger a device sync (Intune admin center > Devices > [device] > Sync) and wait 10–15 minutes before re-running `app-sso platform -s` and `klist`.

---

## Microsoft Support Escalation Packet

When Track A or Track B investigation does not resolve the issue, engage Microsoft Support. Assemble the following before opening a case:

- **`app-sso platform -s` full JSON output** — captured on the affected device at the time of failure; include the complete output, not excerpts
- **sysdiagnose archive** — captured with AppSSO debug logging enabled before reproducing the issue (Track A Step 3 procedure); required for Microsoft Support to analyze PSSO and Kerberos subsystem events
- **`klist` output** — full output showing credential cache state or "No credentials cache found"
- **Company Portal log incident ID** — generated via Company Portal app > Help > Send diagnostic report > Email logs; note the incident ID before closing
- **Intune device configuration status screenshot** — Intune admin center > Devices > [device] > Configuration, showing both the Platform SSO Settings Catalog policy status and the Kerberos `.mobileconfig` profile status
- **macOS version** and **Company Portal version** — from the Intune device record or device About screen

---

## Related Resources

- [macOS Log Collection Guide (runbook 10)](10-macos-log-collection.md) — prerequisite for this runbook
- [Kerberos SSO Extension Guide](../admin-setup-macos/10-kerberos-sso-extension.md) — configuration reference: identifier, payload type, `usePlatformSSOTGT`, macOS 14.6+ floor, realm/KDC, verification commands (link-not-copy)
- [macOS Platform SSO Investigation (runbook 27)](27-macos-sso-investigation.md) — for shared-symptom tickets: PSSO registration failures, "Registration Required" loop
- [L1 Runbook 35: macOS Platform SSO Sign-In Failure](../l1-runbooks/35-macos-sso-sign-in-failure.md) — adjacent L1 runbook for SSO sign-in symptoms that may surface Kerberos extension issues
- [L1 Runbook 36: macOS Platform SSO — Secure Enclave Key Loss](../l1-runbooks/36-macos-secure-enclave-key.md) — adjacent L1 runbook for SE key loss symptoms
- [macOS ADE L2 Runbook Index](00-index.md#macos-ade-runbooks)

---

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-23 | Initial version — macOS Kerberos SSO Extension L2 investigation (RUN-01): Track A (ticket acquisition / TGT not issued) + Track B (PSSO-TGT integration via `usePlatformSSOTGT`) | -- |
