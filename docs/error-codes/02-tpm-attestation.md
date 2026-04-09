---
last_verified: 2026-03-14
review_by: 2026-06-12
applies_to: APv1
audience: both
---

> **Version gate:** This guide primarily covers Windows Autopilot (classic). APv2 differences are noted inline. For a full comparison, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

# TPM Attestation Errors

These errors occur during [OOBE](../_glossary.md#oobe) when the device attempts [TPM](../_glossary.md#tpm) attestation, primarily in [pre-provisioning](../_glossary.md#pre-provisioning) and [self-deploying](../_glossary.md#self-deploying) modes. They correspond to Stage 3 of the [Autopilot lifecycle](../lifecycle/03-oobe.md).

**Phase:** Reg=Registration · OOBE=Out-of-Box Experience · ESP=Enrollment Status Page · Post=Post-enrollment
**Mode:** UD=User-Driven · PP=Pre-Provisioning · SD=Self-Deploying · All=All modes

| Code | # | Name | Phase | Mode | Cause | L1 Action | L2 Fix |
|------|---|------|-------|------|-------|-----------|--------|
| <a id="0x80070490"></a>0x80070490 | 1 | TPMAttestation (AMD) | [OOBE](../lifecycle/03-oobe.md) | PP, SD | AMD fTPM firmware — check OEM for updated version; ASP firmware TPM fails attestation on affected AMD platforms | **Escalate** — collect: serial, error code, mode, timestamp, BIOS version, TPM manufacturer (AMD fTPM) | Check OEM support site for AMD firmware update; see [L2 TPM runbook](../l2-runbooks/03-tpm-attestation.md) |
| <a id="0x800705b4"></a>0x800705b4 | 1 | Timeout (TPM) | [OOBE](../lifecycle/03-oobe.md) | PP, SD | General TPM attestation timeout; also fires on VM (no physical TPM) or TPM 1.2 device — incompatible with SD/PP mode by design | Confirm device has physical TPM 2.0 in BIOS; **Escalate** — collect: serial, error code, mode, timestamp, TPM manufacturer; if VM or TPM 1.2: no fix, device incompatible | If physical TPM 2.0 confirmed: see [L2 TPM runbook](../l2-runbooks/03-tpm-attestation.md); if VM or TPM 1.2: device cannot be used with SD/PP mode |
| <a id="0x80190190"></a>0x80190190 | 1 | TPMAttestation (Generic) | [OOBE](../lifecycle/03-oobe.md) | PP, SD | General TPM attestation failure; check hardware-specific known issues section below before escalating | **Escalate** — collect: serial, error code, mode, timestamp, BIOS version, TPM manufacturer | Check hardware-specific known issues below; see [L2 TPM runbook](../l2-runbooks/03-tpm-attestation.md) |
| <a id="0x801C03F3"></a>0x801C03F3 | 1 | AzureADObjectMissing (PP) | [OOBE](../lifecycle/03-oobe.md) | PP | Azure AD device object deleted after Autopilot registration; pre-provisioning cannot proceed without a device object | **Escalate** — collect: serial, error code, mode, timestamp; re-registration required | [`Remove-AutopilotDevice`](../reference/powershell-ref.md#remove-autopilotdevice) then re-register device; full Autopilot re-registration required |
| <a id="0x801c03ea"></a>0x801c03ea | 1 | TPMVersion (MDM) | [OOBE](../lifecycle/03-oobe.md) | PP, SD | TPM supports 2.0 but has not yet been upgraded from TPM 1.2 firmware mode; BIOS/firmware update needed | **Escalate** — collect: serial, error code, mode, timestamp, BIOS version, TPM manufacturer; L1 cannot verify TPM version from portal | Check OEM BIOS update for TPM 1.2-to-2.0 firmware upgrade; see [L2 TPM runbook](../l2-runbooks/03-tpm-attestation.md) |
| 0x801c03ea | 2 | TPMVersion (MDM) | [OOBE](../lifecycle/03-oobe.md) | PP, SD | Device assigned to two conflicting Autopilot profile groups; dual profile assignment conflict | In Intune admin center, check device group membership under the device object; verify device is in only one Autopilot profile group; **Escalate** if group membership unclear | Review dynamic group queries and device Entra ID group memberships; remove device from conflicting group |
| <a id="0x81039001"></a>0x81039001 | 1 | MaxRetry (Autopilot) | [OOBE](../lifecycle/03-oobe.md) | PP, SD | Intermittent TPM attestation retry limit exceeded (E_AUTOPILOT_CLIENT_TPM_MAX_ATTESTATION_RETRY_EXCEEDED); subsequent attempt typically resolves | Retry provisioning (max 2 attempts, 15 min between); then **Escalate** — collect: serial, error code, mode, timestamp, TPM manufacturer | see [L2 TPM runbook](../l2-runbooks/03-tpm-attestation.md) |
| <a id="0x81039023"></a>0x81039023 | 1 | TPMAttestation (Win11) | [OOBE](../lifecycle/03-oobe.md) | PP, SD | Windows 11 pre-provisioning or self-deploying mode; resolved by KB5013943 (May 2022) or later cumulative update | Confirm Windows version and patch level; **Escalate** — collect: serial, error code, mode, timestamp, Windows build number | Apply KB5013943 or latest cumulative update; redeploy after patching |
| <a id="0x81039024"></a>0x81039024 | 1 | KnownVulnerability (TPM) | [OOBE](../lifecycle/03-oobe.md) | PP, SD | TPM firmware has known security vulnerability — attestation blocked by Windows; OEM firmware update required | **Escalate** — collect: serial, error code, mode, timestamp, BIOS version, TPM manufacturer | Visit OEM support site for TPM firmware update; see [L2 TPM runbook](../l2-runbooks/03-tpm-attestation.md); TPM firmware with known vulnerability cannot be unblocked without update |

## Hardware-Specific Known Issues

The following hardware-specific TPM issues are known to cause attestation failures. When the Cause column references a hardware vendor, use this section for detail. These are not investigation procedures — see the [L2 TPM runbook](../l2-runbooks/03-tpm-attestation.md) for full investigation steps.

### Infineon SLB9672 — EK Certificate Issue (firmware 15.22)

Infineon SLB9672 TPM modules running firmware version 15.22 contain an EK (Endorsement Key) certificate issue that causes TPM attestation to fail with a timeout message. This issue was documented June 2023 and updated August 2025. Contact your OEM for a firmware update; the fix is available from affected OEMs.

### ST Micro and Nuvoton RSA-3072

The latest ST Micro and Nuvoton TPM models supporting RSA-3072bit keys fail TPM attestation in pre-provisioning and self-deploying mode. This issue was documented May 2025 and updated August 2025. For Lenovo devices, the issue is resolved — contact Lenovo support for the firmware update. Other OEM customers should contact their device manufacturer.

### AMD fTPM (ASP Firmware TPM)

AMD platforms using ASP firmware-based TPM (fTPM) fail attestation with 0x80070490. The failure is resolved in later AMD firmware versions; consult your OEM's release notes for the specific version. This affects pre-provisioning and self-deploying mode only.

### Intel Tiger Lake fTPM

Intel Tiger Lake platforms require KB5007253 (November 2021) or a later cumulative update for TPM attestation to succeed on Windows 10 21H2. Earlier Windows versions are not supported for TPM attestation on Tiger Lake. Apply the required update before attempting pre-provisioning or self-deploying mode.

### General Clock Skew

If the device real-time clock is off by several minutes, TPM attestation and [ESP](../_glossary.md#esp) timeout failures can occur. During OOBE, synchronize the clock with `w32tm /resync /force` before retrying provisioning. This is particularly common after extended device storage or CMOS battery replacement.

---

Prev: [MDM Enrollment Errors](01-mdm-enrollment.md) | Next: [ESP and Enrollment Errors](03-esp-enrollment.md)

> **APv2 Note:** Windows Autopilot Device Preparation (APv2) does not use pre-provisioning (technician flow) or self-deploying mode. TPM attestation as described in this file is not required in APv2 Device Preparation flows. The majority of codes in this file do not apply to APv2. For framework differences, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

## Version History

| Date | Change |
|------|--------|
| 2026-03-14 | Initial creation |
