---
last_verified: 2026-04-11
review_by: 2026-07-10
applies_to: both
audience: both
---

> **Version gate:** This guide primarily covers Windows Autopilot (classic). APv2 differences are noted inline. For a full comparison, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

# Error Code Index

This is the master lookup table for all Windows [Autopilot](../_glossary.md#autopilot) error codes. Find your error code below and follow the link to the detailed category page for causes, L1 actions, and L2 fixes. Use Ctrl+F to search by hex code or Event ID.

## Categories

- [MDM Enrollment Errors (0x8018xxxx)](01-mdm-enrollment.md) — MDM enrollment failures during OOBE
- [TPM Attestation Errors](02-tpm-attestation.md) — TPM hardware and firmware attestation failures
- [ESP and Enrollment Errors](03-esp-enrollment.md) — Enrollment Status Page failures and policy conflicts
- [Pre-Provisioning and Self-Deploying Errors](04-pre-provisioning.md) — Technician flow and kiosk deployment failures
- [Hybrid Join and Device Registration Errors](05-hybrid-join.md) — Hybrid Entra join failures and event ID mapping
- [APv2 Device Preparation Failures](06-apv2-device-preparation.md) -- Symptom-based failure catalog for APv2 deployments

## Quick Lookup (APv1)

**Framework:** APv1 (classic)

**Mode:** UD=User-Driven · PP=Pre-Provisioning · SD=Self-Deploying · All=All modes

| Code | Name | Mode | Category |
|------|------|------|----------|
| 0x80004005 | HybridJoinTimeout (ESP) | UD | [ESP and Enrollment Errors](03-esp-enrollment.md#0x80004005) |
| 0x8007064c | AlreadyEnrolled (Legacy) | All | [MDM Enrollment Errors](01-mdm-enrollment.md#0x8007064c) |
| 0x80070490 | TPMAttestation (AMD) | PP, SD | [TPM Attestation Errors](02-tpm-attestation.md#0x80070490) |
| 0x800705b4 | Timeout (TPM) | PP, SD | [TPM Attestation Errors](02-tpm-attestation.md#0x800705b4) |
| 0x80070774 | DomainControllerNotFound (Hybrid) | UD | [Hybrid Join and Device Registration Errors](05-hybrid-join.md#0x80070774) |
| 0x80180005 | DeviceNotSupported (MDM) | UD, PP | [MDM Enrollment Errors](01-mdm-enrollment.md#0x80180005) |
| 0x8018000a | AlreadyEnrolled (MDM) | All | [MDM Enrollment Errors](01-mdm-enrollment.md#0x8018000a) |
| 0x80180014 | DeviceNotSupported (Intune) | All | [MDM Enrollment Errors](01-mdm-enrollment.md#0x80180014) |
| 0x80180018 | LicenseError (MDM) | All | [MDM Enrollment Errors](01-mdm-enrollment.md#0x80180018) |
| 0x80180019 | TenantMismatch (MDM) | All | [MDM Enrollment Errors](01-mdm-enrollment.md#0x80180019) |
| 0x80180020 | MDMDisabled (Tenant) | All | [MDM Enrollment Errors](01-mdm-enrollment.md#0x80180020) |
| 0x80180022 | UnsupportedEdition (MDM) | All | [MDM Enrollment Errors](01-mdm-enrollment.md#0x80180022) |
| 0x80180026 | ConflictClient (MDM) | UD | [MDM Enrollment Errors](01-mdm-enrollment.md#0x80180026) |
| 0x8018002b | UPNNonRoutable (MDM) | All | [MDM Enrollment Errors](01-mdm-enrollment.md#0x8018002b) |
| 0x80190190 | TPMAttestation (Generic) | PP, SD | [TPM Attestation Errors](02-tpm-attestation.md#0x80190190) |
| 0x801c03ea | TPMVersion (MDM) | PP, SD | [TPM Attestation Errors](02-tpm-attestation.md#0x801c03ea) |
| 0x801C03F3 | AzureADObjectMissing (PP) | PP | [TPM Attestation Errors](02-tpm-attestation.md#0x801C03F3) |
| 0x81036501 | MDMInfoNotFound (ESP) | All | [ESP and Enrollment Errors](03-esp-enrollment.md#0x81036501) |
| 0x81036502 | AppInstallFailure (ESP) | All | [ESP and Enrollment Errors](03-esp-enrollment.md#0x81036502) |
| 0x81039001 | MaxRetry (Autopilot) | PP, SD | [TPM Attestation Errors](02-tpm-attestation.md#0x81039001) |
| 0x81039023 | TPMAttestation (Win11) | PP, SD | [TPM Attestation Errors](02-tpm-attestation.md#0x81039023) |
| 0x81039024 | KnownVulnerability (TPM) | PP, SD | [TPM Attestation Errors](02-tpm-attestation.md#0x81039024) |
| 0xc1036501 | MultiMDM (SD) | SD | [Pre-Provisioning and Self-Deploying Errors](04-pre-provisioning.md#0xc1036501) |
| Event 171 | TPMIdentityFailed | PP, SD | [Hybrid Join and Device Registration Errors](05-hybrid-join.md#event-171) |
| Event 172 | AutopilotProfileUnavailable | PP, SD | [Hybrid Join and Device Registration Errors](05-hybrid-join.md#event-172) |
| Event 807 | ZtdDeviceIsNotRegistered | All | [Hybrid Join and Device Registration Errors](05-hybrid-join.md#event-807) |
| Event 809 | ZtdDeviceHasNoAssignedProfile (deleted) | All | [Hybrid Join and Device Registration Errors](05-hybrid-join.md#event-809) |
| Event 815 | ZtdDeviceHasNoAssignedProfile (none) | All | [Hybrid Join and Device Registration Errors](05-hybrid-join.md#event-815) |
| Event 908 | SerialNumberMismatch | All | [Hybrid Join and Device Registration Errors](05-hybrid-join.md#event-908) |

## No-Code ESP Failures

Some ESP failures show "Something went wrong" without a specific error code. See [ESP and Enrollment Errors — Policy Conflicts](03-esp-enrollment.md#policy-conflicts-no-discrete-error-code) for these scenarios.

## APv2 Failure Scenarios

**Framework:** APv2 (Device Preparation)

Failures in APv2 are identified by symptom and deployment phase -- not hex error codes.
Full catalog: [APv2 Device Preparation Failures](06-apv2-device-preparation.md)

| Scenario | Symptom | Phase | Category |
|----------|---------|-------|----------|
| Deployment experience never launched | APv2 progress screen never appeared; standard OOBE or ESP showed instead | Steps 1-2 | [APv2 Device Preparation Failures](06-apv2-device-preparation.md#deployment-experience-never-launched) |
| APv1 profile took precedence | ESP screen appeared during OOBE; no APv2 progress screen | Step 3 | [APv2 Device Preparation Failures](06-apv2-device-preparation.md#apv1-profile-took-precedence) |
| Entra join failed | Deployment failed during Entra join; portal shows failed status | Step 3 | [APv2 Device Preparation Failures](06-apv2-device-preparation.md#entra-join-failed) |
| Intune enrollment failed | Device joined Entra but not visible in Intune | Step 3 | [APv2 Device Preparation Failures](06-apv2-device-preparation.md#intune-enrollment-failed) |
| IME install failed | Deployment fails before any apps install | Step 4 | [APv2 Device Preparation Failures](06-apv2-device-preparation.md#ime-install-failed) |
| LOB or M365 app install failed | App shows Failed in deployment report Apps tab | Step 7 | [APv2 Device Preparation Failures](06-apv2-device-preparation.md#lob-or-m365-app-install-failed) |
| PowerShell script execution failed | Script shows Failed in deployment report Scripts tab | Step 8 | [APv2 Device Preparation Failures](06-apv2-device-preparation.md#powershell-script-execution-failed) |
| Win32, Store, or EAC app install failed | App shows Failed or Skipped in deployment report | Step 9 | [APv2 Device Preparation Failures](06-apv2-device-preparation.md#win32-store-or-eac-app-install-failed) |
| Deployment timed out | Deployment fails with timeout; portal shows Failed status | Steps 7-9 | [APv2 Device Preparation Failures](06-apv2-device-preparation.md#deployment-timed-out) |
| Wrong apps or policies applied | User reaches desktop but expected apps missing or wrong policies | Step 10+ | [APv2 Device Preparation Failures](06-apv2-device-preparation.md#wrong-apps-or-policies-applied) |

---

Select a category above, browse the APv2 scenario table, or use Ctrl+F to find your error code in the Quick Lookup table.

## Version History

| Date | Change |
|------|--------|
| 2026-04-11 | Added APv2 Failure Scenarios section, 06-apv2-device-preparation.md category, relabeled Quick Lookup as APv1 |
| 2026-03-14 | Initial creation — 23 hex codes and 6 event IDs indexed across 5 category files |
