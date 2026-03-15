---
last_verified: 2026-03-14
review_by: 2026-06-12
applies_to: APv1
audience: both
---

> **Version gate:** This guide primarily covers Windows Autopilot (classic). APv2 differences are noted inline. For a full comparison, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

# ESP and Enrollment Errors

These errors occur during the [Enrollment Status Page](../_glossary.md#esp) (ESP) phase when apps install, policies apply, and certificates provision. They correspond to Stage 4 of the [Autopilot lifecycle](../lifecycle/04-esp.md). Some failures produce no error code and appear only as a generic "Something went wrong" message; those patterns are documented in the Policy Conflicts section below.

**Phase:** Reg=Registration · OOBE=Out-of-Box Experience · ESP=Enrollment Status Page · Post=Post-enrollment
**Mode:** UD=User-Driven · PP=Pre-Provisioning · SD=Self-Deploying · All=All modes

## Error Table

| Code | # | Name | Phase | Mode | Cause | L1 Action | L2 Fix |
|------|---|------|-------|------|-------|-----------|--------|
| 0x80004005 | 1 | HybridJoinTimeout (ESP) | [ESP](../lifecycle/04-esp.md) | UD | Hybrid [Entra](../_glossary.md#entra) join times out during ESP; OS-level timeout bug resolved by KB5065426 (24H2), KB5065789 (25H2), KB5070312 (23H2) | **Escalate** — collect: serial, error code, mode, timestamp, Windows build number. Also check [Hybrid Join Errors](05-hybrid-join.md) for domain-related causes | Apply latest Windows cumulative update for the device's build; [`Reset-AutopilotRegistration`](../reference/powershell-ref.md#reset-autopilotregistration) if update alone does not resolve |
| 0x81036501 | 1 | MDMInfoNotFound (ESP) | [ESP](../lifecycle/04-esp.md) | All | Multiple [MDM](../_glossary.md#mdm) configurations present in Azure AD; or device has no MDM enrollment URL configured | Verify single MDM configuration in Azure AD; **Escalate** — collect: serial, error code, mode, timestamp | [Intune](../_glossary.md#intune) admin center: check MDM applications under Mobility (MDM and MAM); remove duplicate MDM configurations. [`Reset-AutopilotRegistration`](../reference/powershell-ref.md#reset-autopilotregistration) then retry |
| 0x81036502 | 1 | AppInstallFailure (ESP) | [ESP](../lifecycle/04-esp.md) | All | A required app failed to install during device ESP; check `AppWorkload.log` (not the legacy `IntuneManagementExtension.log`, which changed August 2024) | Note which app is failing — the app name is visible on the ESP screen; retry once; **Escalate** — collect: serial, error code, mode, timestamp, failing app name | Check `AppWorkload.log` in `C:\ProgramData\Microsoft\IntuneManagementExtension\Logs\`; see [L2 ESP deep-dive](../l2-runbooks/esp-deep-dive.md) (available after Phase 6) |

## Policy Conflicts (No Discrete Error Code)

The following policy configurations cause ESP failures that display as "Something went wrong" without a specific error code. These are among the most common ESP failure causes encountered during deployment.

| Policy | Failure Pattern | L1 Action | L2 Fix |
|--------|----------------|-----------|--------|
| AppLocker CSP | Triggers reboot loop during [OOBE](../_glossary.md#oobe)/ESP; device restarts repeatedly without completing provisioning | **Escalate** — collect: serial, mode, timestamp, note "reboot loop during ESP" | Remove AppLocker CSP from Autopilot device group during provisioning; see [L2 ESP deep-dive](../l2-runbooks/esp-deep-dive.md) (available after Phase 6) |
| DeviceLock password policies | Breaks autologon during device ESP; especially affects kiosk deployments where DefaultUser0 cannot auto-logon | **Escalate** — collect: serial, mode, timestamp, deployment scenario (kiosk or standard) | Exclude Autopilot devices from DeviceLock password policy during ESP; check [`HKLM:\SOFTWARE\Microsoft\Provisioning`](../reference/registry-paths.md#provisioning-diagnostics) |
| Security Baseline UAC/VBS policies | Causes unexpected UAC prompts or VBS consent dialogs if device reboots during ESP | **Escalate** — collect: serial, mode, timestamp, note "unexpected prompts during ESP" | Exclude Autopilot devices from Security Baseline VBS and UAC settings during ESP phase |
| AutoAdminLogon registry = 0 | Breaks Autopilot autologon entirely; device stops at sign-in screen instead of progressing through ESP | **Escalate** — collect: serial, mode, timestamp, note "autologon fails" | Check GPO setting AutoAdminLogon = 0; exclude Autopilot devices from that GPO; [`HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon`](../reference/registry-paths.md#winlogon) |
| PreferredAadTenantDomainName | Appends the tenant domain to the DefaultUser0 username, which breaks autologon because the account lookup fails | **Escalate** — collect: serial, mode, timestamp | Remove PreferredAadTenantDomainName setting from policies targeting Autopilot devices during provisioning |
| Interactive logon message GPOs | Blocks pre-provisioning technician flow by displaying a logon banner that requires manual dismissal | **Escalate** — collect: serial, mode, timestamp, note "logon message blocking provisioning" | Exclude Autopilot devices from interactive logon message (legal notice) GPOs |

## ESP Timeout Patterns

The following scenarios cause ESP to time out without generating a discrete error code. The ESP screen shows the timeout or "Something went wrong" message.

**App count exceeds ESP timeout value.** When the number of required apps assigned to the device exceeds what can install within the configured ESP timeout window, the ESP fails. L1 action: note the number and names of required apps visible on ESP; **Escalate** — collect serial, mode, timestamp, list of apps shown. L2 fix: increase ESP timeout in the Autopilot profile (Devices > Windows > Enrollment > Enrollment Status Page), or reduce required app assignments.

**LOB and Win32 TrustedInstaller conflict.** Mixing line-of-business (LOB) and Win32 app types in the same required app set can produce a TrustedInstaller lock conflict that stalls the install queue. L1 action: note if both LOB and Win32 app types are assigned; **Escalate** — collect serial, mode, timestamp, app types visible. L2 fix: check app type assignments and separate LOB and Win32 apps across assignment groups where possible.

**Conditional Access blocking Store app license.** If a Conditional Access policy requires device compliance before granting access, Store app license acquisition fails during ESP before the device has established compliance. L1 action: note if any Conditional Access policies target the tenant; **Escalate** — collect serial, mode, timestamp. L2 fix: create a Conditional Access exclusion for the enrollment period, or target the CA policy only at compliant devices once enrollment is complete.

---

Prev: [TPM Attestation Errors](02-tpm-attestation.md) | Next: [Pre-Provisioning and Self-Deploying Errors](04-pre-provisioning.md)

---

> **APv2 Note:** Windows Autopilot Device Preparation (APv2) does not use the Enrollment Status Page. The errors and policy conflicts in this category are specific to APv1 (classic) deployments. For framework differences, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

## Version History

| Date | Change |
|------|--------|
| 2026-03-14 | Initial version — 3 coded ESP errors, 6 policy conflict patterns, 3 timeout scenarios |
