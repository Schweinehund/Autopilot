---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: both
---

> **Framework coverage:** This index primarily covers Windows Autopilot (classic/APv1) error codes. APv2 (Device Preparation) failures are symptom-based rather than code-based -- see the APv2 Note at the bottom of this page.
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# Error Code Index

This is the master lookup table for all Windows [Autopilot](../_glossary.md#autopilot) error codes. Find your error code below and follow the link to the detailed category page for causes, L1 actions, and L2 fixes. Use Ctrl+F to search by hex code or Event ID.

## Categories

- [MDM Enrollment Errors (0x8018xxxx)](01-mdm-enrollment.md) — MDM enrollment failures during OOBE
- [TPM Attestation Errors](02-tpm-attestation.md) — TPM hardware and firmware attestation failures
- [ESP and Enrollment Errors](03-esp-enrollment.md) — Enrollment Status Page failures and policy conflicts
- [Pre-Provisioning and Self-Deploying Errors](04-pre-provisioning.md) — Technician flow and kiosk deployment failures
- [Hybrid Join and Device Registration Errors](05-hybrid-join.md) — Hybrid Entra join failures and event ID mapping

## Quick Lookup

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

---

> **APv2 Note:** For APv2 (Device Preparation) error coverage, see the [APv2 Device Preparation Failure Catalog](06-apv2-device-preparation.md). APv2 failures are symptom-based rather than hex-code-based. For framework differences, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

---

Select a category above or use Ctrl+F to find your error code in the Quick Lookup table.

## Version History

| Date | Change |
|------|--------|
| 2026-04-13 | Updated frontmatter and version gate for dual-framework coverage |
| 2026-03-14 | Initial creation — 23 hex codes and 6 event IDs indexed across 5 category files |
