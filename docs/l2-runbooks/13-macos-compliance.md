---
last_verified: 2026-04-14
review_by: 2026-07-13
applies_to: ADE
audience: L2
platform: macOS
---

> **Platform gate:** This guide covers macOS ADE troubleshooting via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md).

# macOS Compliance Evaluation Investigation

## Triage

**From L1 escalation?** L1 collected: device serial number, macOS version, Intune compliance policy screenshot, user report (access blocked or non-compliant status shown). Skip to Step 2.

**Starting fresh?** Begin at Step 1.

## Context

macOS compliance evaluation in Intune works as follows: the device checks in on a schedule (default every 8 hours), Intune evaluates device state against the assigned compliance policy, and sets the device's compliant or non-compliant status. Conditional Access policies in Entra ID use this status for resource access decisions.

Unlike Windows, macOS has no Intune security baselines — compliance policies are the primary enforcement mechanism for security posture on macOS. If a compliance policy reports a setting as non-compliant, there is no automatic remediation; the issue must be resolved on the device or the policy adjusted.

This runbook covers **L2 investigation** of why a device is non-compliant or why compliance status is not updating. The L1 runbook (`14-macos-compliance-access-blocked.md`) handles portal-observable scenarios. This L2 runbook investigates the underlying technical causes using Terminal diagnostics.

Before starting: collect a diagnostic package per [macOS Log Collection Guide](10-macos-log-collection.md).

---

## Investigation

### Step 1: Collect diagnostic package

Collect a diagnostic package per [macOS Log Collection Guide](10-macos-log-collection.md). The IntuneMacODC zip includes Company Portal logs and profiles output needed for Steps 3, 7.

### Step 2: Verify enrollment and MDM status

```bash
profiles status -type enrollment
```

Expected output:
```
Enrolled via DEP: Yes
MDM enrollment: Yes (User Approved)
MDM server: https://*.manage.microsoft.com/...
```

Compliance evaluation cannot proceed if MDM enrollment is incomplete. If MDM enrollment shows `No`, the device has lost its management relationship — compliance cannot be evaluated or reported.

See [macOS Terminal Commands Reference](../reference/macos-commands.md) for full output interpretation.

### Step 3: List installed compliance-relevant profiles

```bash
sudo profiles show
```

Cross-reference the installed profile list against the compliance policy in Intune admin center (Devices > macOS > [device] > Compliance). Identify which specific compliance setting is failing by comparing what is installed on the device against what the policy requires.

### Step 4: Check compliance evaluation status in Intune

In Intune admin center:

1. Navigate to **Devices** > **macOS** > **[device name]** > **Compliance**
2. Review:

| Field | What to check |
|-------|--------------|
| Per-policy status | Is the compliance policy showing as Compliant, Not compliant, or Not evaluated? |
| Per-setting status | Which specific setting is non-compliant? |
| Last evaluation timestamp | When did Intune last evaluate this device? |

If status shows **Not evaluated**: the device has not checked in since the compliance policy was assigned. Trigger a Sync (Devices > macOS > [device] > Sync) and wait for the next check-in cycle (up to 8 hours, or sooner if Sync is triggered).

### Step 5: Investigate specific compliance failures

Use the following Terminal commands to verify the device state for each compliance setting type. Identify the specific failing setting from the Intune per-setting view in Step 4, then run the corresponding check.

**SIP (System Integrity Protection) disabled:**

```bash
csrutil status
```

Expected: `System Integrity Protection status: enabled.`

If disabled: no MDM remediation exists for SIP. The user must boot to Recovery Mode (hold Power button at startup on Apple Silicon, or Cmd+R on Intel) and run `csrutil enable` from Terminal Utilities. This is a user action — it cannot be performed remotely.

**FileVault not enabled:**

```bash
fdesetup status
```

Expected: `FileVault is On.`

If `FileVault is Off`: check whether a FileVault configuration profile is deployed to this device (Step 3). If a profile is deployed but FileVault is off, the profile may have failed to apply — investigate with the profile delivery runbook ([macOS Profile Delivery Investigation](11-macos-profile-delivery.md)). If no profile is deployed, the admin must create and assign a FileVault enforcement profile.

**Firewall not enabled:**

```bash
/usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate
```

Expected: `Firewall is enabled.`

If disabled: verify whether a firewall configuration profile is deployed and applied. Use `sudo profiles show` to check for a firewall profile in the installed list.

**OS version non-compliant:**

```bash
sw_vers -productVersion
```

Compare the output against the minimum OS version specified in the compliance policy. If the device is running an older version, the user must update via System Settings > Software Update. If the required version is not available from Apple for this hardware, the compliance policy minimum version may need to be adjusted.

**Password complexity requirements:**

Passcode compliance is evaluated by the MDM framework based on the passcode policy profile deployed to the device. Check `sudo profiles show` for a passcode policy profile. If the profile is present but password compliance still fails, the user may need to change their password to meet the new requirements — compliance status updates on the next check-in after the password is changed.

### Step 6: Check Conditional Access interaction

If the device shows **Compliant** in Intune but the user still cannot access resources (email, Teams, SharePoint):

1. Navigate to **Entra ID** > **Devices** > search for the device by serial number
2. Check the Entra device registration status: is the device object present? Does it show the compliance status from Intune?
3. Navigate to **Entra ID** > **Security** > **Conditional Access** > review active policies for scope and conditions that apply to this user or device
4. Verify that Company Portal registration completed: an Entra device object must exist with compliant status synced from Intune before Conditional Access will grant access

If the Entra device object exists but compliance status has not synced from Intune, check whether Company Portal is installed and signed in on the device (Stage 6 of the ADE lifecycle).

### Step 7: Check Company Portal logs for registration issues

Log path: `/Library/Logs/Microsoft/Intune/CompanyPortal*.log` (see [macOS Log Paths Reference](../reference/macos-log-paths.md))

Search for registration and compliance-related events:

```bash
grep -i "registration\|compliance\|entra\|aad" /Library/Logs/Microsoft/Intune/CompanyPortal*.log | tail -50
```

**Common patterns:**

| Log pattern | Meaning |
|-------------|---------|
| `Device registration failed` | Entra ID device registration issue |
| `Compliance check returned: non-compliant` | Policy evaluation returned non-compliant status |
| `AAD join failed` | Entra (Azure AD) join or registration failure |
| `Token acquisition failed` | Authentication error during registration |

---

## Resolution Scenarios

**Scenario 1: Compliance not evaluated**

Trigger Sync from Intune portal (Devices > macOS > [device] > Sync). Wait for next check-in cycle (up to 8 hours). If still not evaluated after 24 hours and multiple Sync attempts, investigate enrollment status (Step 2).

**Scenario 2: SIP disabled**

Guide the user through Recovery Mode to re-enable SIP. This is a user action that cannot be performed remotely. Steps: hold Power button at startup (Apple Silicon) or Cmd+R (Intel) → enter Recovery Mode → open Terminal from Utilities menu → run `csrutil enable` → restart normally.

**Scenario 3: OS version non-compliant but no update available**

Two options: (a) Adjust the compliance policy minimum version to match the latest version available for this hardware, or (b) Add a grace period to the compliance policy to allow time for update rollout. Changing the policy applies to all devices in scope — evaluate fleet impact before adjusting.

**Scenario 4: Password timing gap**

After a passcode policy profile is deployed or strengthened, users must change their password to meet the new requirements. Compliance status updates on the next check-in after the password change. Communicate to the user that they must change their password and then wait up to 8 hours for the compliance status to update.

**Scenario 5: Gatekeeper compliance without enforcement profile**

If the compliance policy includes a Gatekeeper requirement but no Gatekeeper enforcement configuration profile is deployed, the compliance check may fail even on properly configured devices. Deploy a Gatekeeper configuration profile alongside the compliance policy.

**Scenario 6: Compliant in Intune but Entra device not synced**

Trigger a device sync in Entra ID (Entra admin center > Devices > [device] > Sync). Verify that the user has completed Company Portal sign-in on the device (required to register the device with Entra and sync compliance status). If Company Portal is not installed, deploy it via Intune.

---

## Escalation Ceiling

Open a Microsoft support case if:

- Compliance evaluation is stuck for more than 24 hours after multiple Sync attempts and confirmed MDM enrollment
- Entra device object does not appear or does not update despite confirmed Company Portal sign-in
- Compliance policy shows **Error** state with no detail in Intune
- Device shows compliant in Intune but Conditional Access policy continues to block despite Entra sync

**Data to include in support case:**
- IntuneMacODC zip from the affected device
- `profiles status -type enrollment` output
- Compliance policy screenshot from Intune (per-setting detail view)
- Entra device record screenshot (showing device ID, registration status, compliance status)
- Company Portal log excerpt
- macOS version (`sw_vers -productVersion`)

---

## Related Resources

- [macOS Log Collection Guide](10-macos-log-collection.md) — Prerequisite diagnostic package collection
- [macOS Terminal Commands Reference](../reference/macos-commands.md) — Full command reference
- [macOS Log Paths Reference](../reference/macos-log-paths.md) — Log file locations
- [macOS Compliance and Security Policies](../admin-setup-macos/05-compliance-policy.md) — Admin-side compliance configuration
- [Configuration Failures Reference](../admin-setup-macos/06-config-failures.md) — Compliance failure reverse-lookup table
- [macOS Profile Delivery Investigation](11-macos-profile-delivery.md) — If a compliance-enforcing profile is not being delivered

---

## Version History

| Date | Change |
|------|--------|
| 2026-04-14 | Initial version — SIP, FileVault, firewall, OS version compliance checks; Conditional Access interaction; Company Portal log investigation; 6 resolution scenarios |
