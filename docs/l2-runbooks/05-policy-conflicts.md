---
last_verified: 2026-03-21
review_by: 2026-06-19
applies_to: APv1
audience: L2
---

> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

# Policy Conflict Analysis

## Context

Policy conflicts are a common cause of [ESP](../_glossary.md#esp) failures, [OOBE](../_glossary.md#oobe) reboot loops, and autologon failures during Autopilot provisioning. Unlike app install failures that produce a specific error code, policy conflicts typically cause "Something went wrong" messages without a hex error code — or they cause the device to stall silently mid-provisioning. This guide covers systematic identification and resolution of conflicting policies across the five most common conflict categories: AutoAdminLogon, AppLocker CSP, DeviceLock password policies, Security Baseline conflicts, and PreferredAadTenantDomainName mismatches.

Policy conflicts surface most frequently when existing security baseline or compliance policies target all devices (including Autopilot devices still in provisioning) rather than only enrolled, compliant devices.

## Triage

**From L1 escalation ([ESE1](../decision-trees/01-esp-failure.md), [ESE2](../decision-trees/01-esp-failure.md), [ESE4](../decision-trees/01-esp-failure.md), or [ESE5](../decision-trees/01-esp-failure.md))?**
L1 collected: serial, deployment mode, timestamp, ESP phase (device or user), time on ESP before/after reboot, symptom description (reboot loop, autologon failure, stuck without error).
Skip to Step 2.

**Starting fresh?** Begin at Step 1.

## Investigation

### Step 1: Collect diagnostic package

Before starting: collect a diagnostic package per the [Log Collection Guide](01-log-collection.md). Policy conflicts often leave traces in the MDM diagnostic HTML and the `Microsoft-Windows-Provisioning-Diagnostics-Provider/Admin` event log.

### Step 2: Check AutoAdminLogon setting

AutoAdminLogon is the most common policy conflict causing Autopilot provisioning failures. Autopilot relies on automatic logon as the `DefaultUser0` account during the device phase. If a GPO or Intune policy sets `AutoAdminLogon = 0`, autologon breaks and the device stops at the sign-in screen instead of progressing through [ESP](../_glossary.md#esp).

```powershell
$winlogon = "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon"
Get-ItemProperty -Path $winlogon -Name AutoAdminLogon -ErrorAction SilentlyContinue
```

**Interpreting the result:**

| Value | Meaning |
|-------|---------|
| `AutoAdminLogon = 1` or property absent | Autologon is enabled or not overridden — not the cause |
| `AutoAdminLogon = 0` | Autologon is explicitly disabled — provisioning will stall at sign-in screen |

If `AutoAdminLogon = 0` is found, identify the policy setting it:
1. Check Group Policy Objects for the setting `Interactive logon: Do not require CTRL+ALT+DEL` or legacy `AutoAdminLogon` under Winlogon.
2. Check Intune configuration profiles for settings under Device Restrictions or Custom OMA-URI targeting `./Device/Vendor/MSFT/Policy/Config/WindowsLogon/`.
3. Check if a Microsoft 365 Security Baseline or CIS Benchmark policy is deployed to the Autopilot device group.

See [registry-paths.md](../reference/registry-paths.md) for the `Winlogon` key reference.

### Step 3: Check for AppLocker CSP conflicts

AppLocker CSP configured via Intune causes reboot loops during [OOBE](../_glossary.md#oobe) and [ESP](../_glossary.md#esp). The symptom is a device that repeatedly restarts without completing provisioning — typically 2 to 5 reboots before stalling.

Investigation steps:
1. In Intune admin center, navigate to **Devices > Configuration profiles**.
2. Search for any AppLocker or Endpoint Security policies.
3. Identify whether any AppLocker CSP profile is targeted at a group that includes Autopilot provisioning devices.
4. Check the device's configuration profile assignment status — if an AppLocker CSP policy is listed as "succeeded" or "pending" during early provisioning, it is a candidate conflict.

AppLocker CSP policies should only be applied to fully enrolled and compliant devices, not to devices during initial provisioning.

### Step 4: Check for DeviceLock policy conflicts

DeviceLock and password complexity policies break the `DefaultUser0` autologon during [device phase](../_glossary.md#device-phase) ESP, especially in kiosk and self-deploying deployments where autologon is required throughout provisioning.

Investigation steps:
1. In Intune admin center, navigate to **Devices > Configuration profiles** and check for Device Restrictions profiles with password settings enabled.
2. Check Security Baseline assignments for password complexity policies.
3. Check if any DeviceLock policies are targeted at groups containing the Autopilot device:

```powershell
# Check for DeviceLock registry indicators
$deviceLock = "HKLM:\SOFTWARE\Policies\Microsoft\Windows\System"
Get-ItemProperty -Path $deviceLock -ErrorAction SilentlyContinue

# Check for MDM-delivered DeviceLock policies
$mdmPolicy = "HKLM:\SOFTWARE\Microsoft\PolicyManager\current\device\DeviceLock"
Get-ItemProperty -Path $mdmPolicy -ErrorAction SilentlyContinue
```

DeviceLock policies that require password complexity or set a minimum password length conflict with the blank-password `DefaultUser0` account used during device phase.

### Step 5: Check PreferredAadTenantDomainName conflicts

`PreferredAadTenantDomainName` appends the tenant's primary domain to the `DefaultUser0` username, transforming it into `DefaultUser0@tenant.onmicrosoft.com`. This breaks the autologon lookup because the local account `DefaultUser0` does not exist in that form.

```powershell
Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Provisioning\Diagnostics\Autopilot" -ErrorAction SilentlyContinue |
    Select-Object TenantId, TenantDomain, ProfileName, CloudAssignedTenantDomain
```

Also check for the setting in Intune and on-premises GPO:

```powershell
# Check for the PreferredAadTenantDomainName setting delivered via MDM
$aadPolicy = "HKLM:\SOFTWARE\Microsoft\PolicyManager\current\device\Authentication"
Get-ItemProperty -Path $aadPolicy -Name "PreferredAadTenantDomainName" -ErrorAction SilentlyContinue
```

If `PreferredAadTenantDomainName` is set, verify that it matches the Azure AD tenant configured in the Autopilot profile. A mismatch or an incorrect domain suffix causes autologon to fail silently.

### Step 6: Review Security Baseline policy assignments

Microsoft 365 Security Baselines are a common source of policy conflicts because they contain settings that affect UAC, VBS, autologon, and password policies — all of which can interfere with Autopilot provisioning.

> **Note:** Specific policy setting names should be validated against the current Microsoft 365 Security Baseline version in use. Policy names change between baseline versions. The conflict categories below are stable; individual setting names require verification at the current baseline version.

Investigation steps:
1. In Intune admin center, navigate to **Endpoint security > Security baselines**.
2. Identify any Security Baseline profiles assigned to groups that include the Autopilot provisioning device.
3. Review the baseline profile for these conflict-prone categories:
   - **VBS settings** — Virtualization-Based Security settings that may cause consent dialogs if triggered during ESP
   - **UAC settings** — UAC elevation behavior settings that may cause unexpected prompts during device phase
   - **DeviceLock settings** — password complexity settings that conflict with `DefaultUser0` autologon
   - **Winlogon settings** — any settings touching `AutoAdminLogon` or the interactive logon behavior

4. Check the device's security baseline assignment report for "failed" or "conflict" states during the provisioning window.

Also check for Interactive Logon Message (legal notice) GPOs:

```powershell
# Check for logon banner settings that block pre-provisioning technician flow
$legalNotice = "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System"
Get-ItemProperty -Path $legalNotice -Name LegalNoticeCaption, LegalNoticeText -ErrorAction SilentlyContinue
```

If `LegalNoticeCaption` or `LegalNoticeText` is populated, an interactive logon banner requires manual dismissal — blocking the pre-provisioning technician flow.

## Resolution

### Scenario A: AutoAdminLogon set to 0

**Root cause:** A GPO or Intune policy is setting `AutoAdminLogon = 0`, disabling the automatic logon required during Autopilot provisioning.

**Resolution:**
1. Identify the policy source (GPO or Intune configuration profile) setting AutoAdminLogon to 0.
2. Exclude the Autopilot device group from that policy, or create a policy exception scoped to Autopilot provisioning groups.
3. For GPO: use Security Filtering or WMI filtering to exclude devices in the Autopilot provisioning OU.
4. For Intune: modify the assignment to exclude the Autopilot device dynamic group.

Verify the fix after policy sync:

```powershell
# Verify AutoAdminLogon is restored after policy exclusion
Get-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon" -Name AutoAdminLogon -ErrorAction SilentlyContinue
# Expected: AutoAdminLogon = 1 (or property absent, which also allows autologon)
```

If the property is absent after exclusion and autologon still does not work, verify no other policy is setting it:
```powershell
Get-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows NT\CurrentVersion\Winlogon" -Name AutoAdminLogon -ErrorAction SilentlyContinue
```

### Scenario B: AppLocker CSP causing reboot loop

**Root cause:** An AppLocker CSP policy applied via Intune is triggering reboot loops during [OOBE](../_glossary.md#oobe) or [ESP](../_glossary.md#esp).

**Resolution:**
1. In Intune admin center, navigate to the AppLocker CSP configuration profile.
2. Modify the assignment to exclude the Autopilot provisioning group for the duration of provisioning.
3. After provisioning is complete and the device has enrolled fully, re-apply the AppLocker CSP policy.
4. Alternatively, scope the AppLocker CSP policy to target only enrolled, compliant devices using a dynamic device group with a compliance filter.

### Scenario C: DeviceLock or password policy during OOBE

**Root cause:** A DeviceLock policy requiring password complexity or setting minimum password length is preventing the blank-password `DefaultUser0` account from logging in during [device phase](../_glossary.md#device-phase).

**Resolution:**
1. Identify the DeviceLock or password policy (Intune Device Restrictions profile, Security Baseline, or GPO).
2. Exclude Autopilot provisioning devices from the policy assignment.
3. Defer the DeviceLock policy to apply only after provisioning is complete and the user has signed in for the first time.
4. If using Security Baseline, create an Autopilot-specific exemption profile that disables password complexity settings and assigns it with higher priority than the baseline.

### Scenario D: Security Baseline conflicts

**Root cause:** A Microsoft 365 Security Baseline profile is applying VBS, UAC, or autologon settings that interfere with Autopilot provisioning.

**Resolution:**
1. In Intune admin center, navigate to the Security Baseline profile.
2. Create an Autopilot-specific exclusion or a lower-setting override profile.
3. Assign the override profile to the Autopilot device group with a higher priority than the baseline profile.
4. Settings to override during provisioning: VBS settings that require enrollment-blocking consent, UAC elevation settings that generate unexpected prompts, and any Winlogon settings touching autologon.
5. After provisioning completes and the device is in its deployed state, the standard Security Baseline can re-apply.

### Scenario E: PreferredAadTenantDomainName mismatch

**Root cause:** `PreferredAadTenantDomainName` is configured and is appending an incorrect or unexpected domain to the `DefaultUser0` autologon username.

**Resolution:**
1. Verify the tenant domain name configured in `PreferredAadTenantDomainName` matches the Azure AD tenant in the Autopilot profile.
2. If the setting is unnecessary for the deployment scenario, remove it from all policies targeting Autopilot provisioning devices.
3. If the setting is required for user experience post-provisioning, scope it to apply only after the device phase is complete and `DefaultUser0` is no longer the active autologon account.

## Escalation Ceiling

Escalate when the root cause is a Microsoft-side service issue or an Intune backend bug. Indicators:

- All policy assignments appear correctly scoped in Intune admin center — no policies target the Autopilot provisioning device group with conflicting settings
- No AutoAdminLogon, AppLocker CSP, DeviceLock, Security Baseline, or PreferredAadTenantDomainName conflicts are found
- Provisioning still fails with "Something went wrong" and no discrete error code
- Intune service health dashboard (admin.microsoft.com > Health > Service health) shows degradation in Intune, Azure AD, or Autopilot service

At this point, collect the full diagnostic package from Step 1, document all registry values and policy assignments examined, and open a Microsoft Premier Support case.

## Tool References

- [Get-AutopilotDeviceStatus](../reference/powershell-ref.md#get-autopilotdevicestatus) — comprehensive device state snapshot; use to verify registration state and profile assignment
- [Registry Paths](../reference/registry-paths.md) — Autopilot provisioning registry paths: `Provisioning\Diagnostics\Autopilot`, `AutopilotSettings`, enrollment keys
- [ESP Error Codes](../error-codes/03-esp-enrollment.md) — policy conflicts table with six no-code failure patterns and their L1/L2 actions
- [ESP Deep-Dive](02-esp-deep-dive.md) — for ESP-specific registry investigation (FirstSync, ExpectedPolicies, Sidecar) when a policy conflict is confirmed and you need to correlate with app install status

**Quick Reference:** [L2 Quick-Reference Card](../quick-ref-l2.md)

---

## Version History

| Date | Change |
|------|--------|
| 2026-03-21 | Initial version — five policy conflict patterns (AutoAdminLogon, AppLocker CSP, DeviceLock, Security Baseline, PreferredAadTenantDomainName), five resolution scenarios, escalation ceiling |
