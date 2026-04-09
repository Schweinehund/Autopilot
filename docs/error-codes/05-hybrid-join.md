---
last_verified: 2026-03-14
review_by: 2026-06-12
applies_to: APv1
audience: both
---

> **Version gate:** This guide primarily covers Windows Autopilot (classic). APv2 differences are noted inline. For a full comparison, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

# Hybrid Join and Device Registration Errors

Hybrid [Entra](../_glossary.md#entra) join errors combine hex codes visible on the [OOBE](../_glossary.md#oobe)/[ESP](../_glossary.md#esp) screen with Event IDs from the Windows event log. This file covers both identifier types. See [Stage 1 (Registration)](../lifecycle/01-hardware-hash.md) and [Stage 4 (ESP)](../lifecycle/04-esp.md) for lifecycle context.

**Phase:** Reg=Registration · OOBE=Out-of-Box Experience · ESP=Enrollment Status Page · Post=Post-enrollment
**Mode:** UD=User-Driven · PP=Pre-Provisioning · SD=Self-Deploying · All=All modes
**Event log:** Event IDs from Applications and Services Logs > Microsoft > Windows > ModernDeployment-Diagnostics-Provider > Autopilot

## Event ID Mapping

Event IDs appear in the event log when a hex error code is not available or when a registration-layer failure occurs before OOBE displays a code. Use Ctrl+F on the Event ID to locate the relevant row.

| Code | # | Name | Phase | Mode | Cause | L1 Action | L2 Fix |
|------|---|------|-------|------|-------|-----------|--------|
| <a id="event-807"></a>Event 807 | 1 | ZtdDeviceIsNotRegistered | [Reg](../lifecycle/01-hardware-hash.md) | All | Hardware hash not uploaded to Intune, or upload completed but device not yet synced to tenant | Verify device in [Intune](../_glossary.md#intune) admin center > Devices > Windows > Enrollment > Windows Autopilot devices; retry after 15 min (max 2 attempts), then **Escalate** — collect: serial, error code, mode, timestamp | Re-import hardware hash; [`Remove-AutopilotDevice`](../reference/powershell-ref.md#remove-autopilotdevice) then re-register if duplicate record exists |
| <a id="event-809"></a>Event 809 | 1 | ZtdDeviceHasNoAssignedProfile (deleted) | [Reg](../lifecycle/01-hardware-hash.md) | All | Autopilot profile that was assigned to this device was subsequently deleted without cleaning up the device record | **Escalate** — collect: serial, error code, mode, timestamp. Profile must be reassigned by an admin; this cannot be resolved without portal access | Reassign Autopilot profile in Intune admin center; if device record is stuck, [`Reset-AutopilotRegistration`](../reference/powershell-ref.md#reset-autopilotregistration) then reassign |
| <a id="event-815"></a>Event 815 | 1 | ZtdDeviceHasNoAssignedProfile (none) | [Reg](../lifecycle/01-hardware-hash.md) | All | No Autopilot profile is assigned to this device and no default profile is configured in the tenant | **Escalate** — collect: serial, error code, mode, timestamp. Admin must assign a profile or configure a default profile before this device can proceed | Assign profile to device or group; or configure a default Autopilot profile in Intune admin center > Devices > Windows > Enrollment > Windows Autopilot > Deployment profiles |
| <a id="event-908"></a>Event 908 | 1 | SerialNumberMismatch | [Reg](../lifecycle/01-hardware-hash.md) | All | Hardware mismatch: the Autopilot record in Intune does not match the physical device (motherboard replacement, re-image with different hardware, or incorrect hash import) | **Escalate** — collect: serial, error code, mode, timestamp, device model. The hardware hash in Intune does not correspond to the physical device | [`Remove-AutopilotDevice`](../reference/powershell-ref.md#remove-autopilotdevice) to delete the stale record; re-collect hardware hash with [`Get-AutopilotHardwareHash`](../reference/powershell-ref.md#get-autopilothardwarehash); re-import |
| <a id="event-171"></a>Event 171 | 1 | TPMIdentityFailed | [OOBE](../lifecycle/03-oobe.md) | PP, SD | [TPM](../_glossary.md#tpm) attestation failure — the HRESULT code in the event detail varies per specific hardware issue. See [TPM Attestation Errors](02-tpm-attestation.md) for HRESULT-specific causes | **Escalate** — collect: serial, HRESULT shown in event detail (if visible), mode, timestamp, BIOS version, TPM manufacturer | See [TPM Attestation Errors](02-tpm-attestation.md) for HRESULT-specific L2 actions; verify TPM firmware version against OEM known issues |
| <a id="event-172"></a>Event 172 | 1 | AutopilotProfileUnavailable | [OOBE](../lifecycle/03-oobe.md) | PP, SD | Typically follows Event 171; the Autopilot profile cannot be set as available because the prior TPM attestation step failed | Check for Event 171 first — this event is a downstream consequence of a TPM failure, not an independent root cause; **Escalate** with Event 171 data | Resolve the Event 171 root cause first; this event clears automatically when TPM attestation succeeds |

## Hybrid Join Hex Errors

These hex error codes appear on the OOBE or ESP screen during hybrid Entra join. Use Ctrl+F on the hex code to locate the relevant row.

| Code | # | Name | Phase | Mode | Cause | L1 Action | L2 Fix |
|------|---|------|-------|------|-------|-----------|--------|
| 0x80004005 | 1 | HybridJoinTimeout (ESP) | [ESP](../lifecycle/04-esp.md) | UD | OS-level timeout bug in hybrid Entra join; resolved by KB5065426 (Windows 24H2), KB5065789 (25H2), KB5070312 (23H2). Cross-reference: also documented in [ESP Errors](03-esp-enrollment.md) | **Escalate** — collect: serial, error code, mode, timestamp, Windows build number | Apply latest Windows cumulative update for the device's build; [`Reset-AutopilotRegistration`](../reference/powershell-ref.md#reset-autopilotregistration) if update alone does not resolve |
| <a id="0x80070774"></a>0x80070774 | 1 | DomainControllerNotFound (Hybrid) | [ESP](../lifecycle/04-esp.md) | UD | "Assign user" feature is active in the hybrid Autopilot profile; this feature is intended only for cloud-native join and causes domain lookup failure in hybrid scenarios | Verify Autopilot profile: "Assign user" field must be empty for hybrid join deployments; **Escalate** — collect: serial, error code, mode, timestamp, domain name | In Intune admin center, open the Autopilot deployment profile and remove any user assignment; hybrid join does not support the "Assign user" feature |
| 0x80070774 | 2 | DomainControllerNotFound (Hybrid) | [ESP](../lifecycle/04-esp.md) | UD | Domain mismatch: the ODJ Connector is installed in a different domain than the target OU specified in the Intune domain join profile | **Escalate** — collect: serial, error code, mode, timestamp, domain name, ODJ Connector server name | Verify the ODJ Connector is installed on a server in the same domain as the target OU; check connector logs at `Applications and Services Logs > Microsoft > Intune > ODJConnectorService` |
| 0x80070774 | 3 | DomainControllerNotFound (Hybrid) | [ESP](../lifecycle/04-esp.md) | UD | ODJ Connector service account has insufficient permissions on the target OU; cannot create the computer object required for domain join | **Escalate** — collect: serial, error code, mode, timestamp, domain name, target OU distinguished name | Grant the ODJ Connector computer account Create Computer Objects and Delete Computer Objects permissions on the target OU; see connector logs at `Applications and Services Logs > Microsoft > Intune > ODJConnectorService` |

## ODJ Connector Notes

The Intune Connector for Active Directory (ODJ Connector) log location changed with version 6.2501.2000.5 (January 2025).

**Current log path:** `Applications and Services Logs > Microsoft > Intune > ODJConnectorService`

**Legacy log path (stale):** `Applications and Services Logs > ODJ Connector Service` — this path no longer receives entries in current connector versions. Do not reference this location for investigation.

**Minimum version:** 6.2501.2000.5 or later. Earlier connector versions cause enrollment failures independent of configuration. Verify connector version before investigating hybrid join failures.

For detailed ODJ Connector investigation steps, see [L2 Hybrid Join runbook](../l2-runbooks/04-hybrid-join.md).

---

Prev: [Pre-Provisioning and Self-Deploying Errors](04-pre-provisioning.md) | Next: none (last category)

---

> **APv2 Note:** Windows Autopilot Device Preparation (APv2) does not support hybrid Entra join. The errors in this category are specific to APv1 (classic) deployments. For framework differences, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

## Version History

| Date | Change |
|------|--------|
| 2026-03-14 | Initial version — event IDs 807, 809, 815, 908, 171, 172 mapped; 3 cause rows for 0x80070774; ODJ Connector log path and version documented |
