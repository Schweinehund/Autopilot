---
last_verified: 2026-03-14
review_by: 2026-06-12
applies_to: APv1
audience: both
---

> **Version gate:** This guide primarily covers Windows Autopilot (classic). APv2 differences are noted inline. For a full comparison, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

# Pre-Provisioning and Self-Deploying Mode Errors

These errors affect [pre-provisioning](../_glossary.md#pre-provisioning) (formerly white glove) and [self-deploying](../_glossary.md#self-deploying) mode deployments. Both modes require physical [TPM](../_glossary.md#tpm) 2.0 attestation, so they share most error codes. See Stage 3 of the [Autopilot lifecycle](../lifecycle/03-oobe.md) for deployment mode context.

**Phase:** Reg=Registration · OOBE=Out-of-Box Experience · ESP=Enrollment Status Page · Post=Post-enrollment
**Mode:** UD=User-Driven · PP=Pre-Provisioning · SD=Self-Deploying · All=All modes

## Error Table

Errors whose primary entry is in another category file are listed as cross-reference rows. The canonical entry (full cause, L1, and L2 details) lives in the linked file.

| Code | # | Name | Phase | Mode | Cause | L1 Action | L2 Fix |
|------|---|------|-------|------|-------|-----------|--------|
| 0x80180014 | — | → See [MDM Enrollment Errors](01-mdm-enrollment.md#0x80180014) | — | PP, SD | Cross-category: prior Intune device record not deleted, or [MDM](../_glossary.md#mdm) enrollment blocked. Primary entry in 01-mdm-enrollment.md | — | — |
| 0x800705b4 | — | → See [TPM Attestation Errors](02-tpm-attestation.md#0x800705b4) | — | PP, SD | Cross-category: TPM timeout or device lacks physical TPM 2.0. Primary entry in 02-tpm-attestation.md | — | — |
| 0x801c03ea | — | → See [TPM Attestation Errors](02-tpm-attestation.md#0x801c03ea) | — | PP, SD | Cross-category: TPM version upgrade needed, or dual profile assignment conflict. Primary entry in 02-tpm-attestation.md | — | — |
| 0x801C03F3 | — | → See [TPM Attestation Errors](02-tpm-attestation.md#0x801C03F3) | — | PP | Cross-category: Azure AD device object deleted during pre-provisioning. Primary entry in 02-tpm-attestation.md | — | — |
| 0x81039001 | — | → See [TPM Attestation Errors](02-tpm-attestation.md#0x81039001) | — | PP, SD | Cross-category: intermittent TPM attestation retry limit exceeded. Primary entry in 02-tpm-attestation.md | — | — |
| 0x81039023 | — | → See [TPM Attestation Errors](02-tpm-attestation.md#0x81039023) | — | PP, SD | Cross-category: Windows 11 PP/SD TPM attestation failure. Primary entry in 02-tpm-attestation.md | — | — |
| 0x81039024 | — | → See [TPM Attestation Errors](02-tpm-attestation.md#0x81039024) | — | PP, SD | Cross-category: known TPM firmware vulnerability. Primary entry in 02-tpm-attestation.md | — | — |
| 0xc1036501 | 1 | MultiMDM (SD) | [OOBE](../lifecycle/03-oobe.md) | SD | Multiple MDM configurations active in Azure AD; self-deploying mode requires exactly one MDM configuration | Verify single MDM configuration in Azure AD admin center (Mobility > MDM and MAM); **Escalate** — collect: serial, error code, mode, timestamp | [Intune](../_glossary.md#intune) admin center: remove duplicate MDM application registrations; see [L2 ESP deep-dive](../l2-runbooks/esp-deep-dive.md) (available after Phase 6) |

## Pre-Provisioning Specific Notes

**Reset button causes retry failures.** When pre-provisioning fails and the technician clicks the Reset button on the ESP failure screen, TPM attestation may fail on the retry attempt. This is a known behavior, not a separate bug. L1 action: do not use the reset button when pre-provisioning fails. Instead, power off the device completely and restart provisioning from a clean state. If the retry also fails, **Escalate** — collect: serial, error code, mode, timestamp, number of attempts.

## Self-Deploying Mode Requirements

**Physical TPM 2.0 is mandatory.** Self-deploying mode requires a physical TPM 2.0 chip. Virtual machines and devices with TPM 1.2 will always fail with 0x800705b4. This is by design, not a configuration error. If a device fails with 0x800705b4 in self-deploying mode, confirm it has physical TPM 2.0 hardware before any further troubleshooting. A VM or a device with only TPM 1.2 cannot be used with self-deploying mode regardless of other configuration changes.

---

Prev: [ESP and Enrollment Errors](03-esp-enrollment.md) | Next: [Hybrid Join and Device Registration Errors](05-hybrid-join.md)

---

> **APv2 Note:** Windows Autopilot Device Preparation (APv2) does not support pre-provisioning or self-deploying mode. The errors in this category are specific to APv1 (classic) deployments. For framework differences, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

## Version History

| Date | Change |
|------|--------|
| 2026-03-14 | Initial version — 1 primary entry (0xc1036501), 7 cross-reference rows to 01-mdm-enrollment.md and 02-tpm-attestation.md |
