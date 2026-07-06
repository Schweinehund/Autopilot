---
doc_id: RE-165
status: Approved
owner: Intune Admin Lead
doc_type: Reference
platform: Windows
last_verified: 2026-03-11
review_by: 2026-06-09
applies_to: APv1
audience: L2
---

**Platform:** Windows · **Doc Type:** Reference · **Doc ID:** RE-165 · **Status:** Approved

# Autopilot Registry Paths Reference

## Summary

[FILL-IN: >=30 words, reference-template Summary lead]

> **Version gate:** This reference applies to Windows Autopilot v1 (user-driven and pre-provisioning). Verify paths against current documentation before applying to Autopilot v2 (Device Preparation) deployments.

Canonical reference for all Autopilot-relevant Windows registry locations. Runbooks and investigation guides link here rather than defining paths inline.

| Registry Path | Purpose | Referenced By | Notes |
|---------------|---------|---------------|-------|
| `HKLM:\SOFTWARE\Microsoft\Provisioning\Diagnostics\Autopilot` | Registration state — stores TenantId, TenantDomain, ProfileName after successful Autopilot profile download | `Get-AutopilotRegistrationState`, `Reset-AutopilotRegistration` | HIGH confidence — extracted from .psm1 source |
| `HKLM:\SOFTWARE\Microsoft\Provisioning\AutopilotSettings` | Assigned Autopilot profile details — populated after profile assignment syncs to device | `Get-AutopilotProfileAssignment`, `Reset-AutopilotRegistration` | HIGH confidence — extracted from .psm1 source |
| `HKLM:\SOFTWARE\Microsoft\Enrollments` | MDM enrollment state root; subkeys per enrollment GUID | `Restart-EnrollmentStatusPage`, `Remove-AutopilotDevice` | HIGH confidence — extracted from .psm1 source |
| `HKLM:\SOFTWARE\Microsoft\Enrollments\{GUID}\FirstSync` | ESP device phase completion tracking; `IsServerProvisioningDone` value indicates device phase status | `Restart-EnrollmentStatusPage` | HIGH confidence — extracted from .psm1 source |
| `HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\MDM` | MDM sync scheduling; presence indicates EnterpriseMgmt scheduled tasks are available | `Restart-EnrollmentStatusPage` | HIGH confidence — extracted from .psm1 source |
| `HKLM:\SOFTWARE\Microsoft\Windows\Autopilot\EnrollmentStatusTracking` | ESP tracking info root — parent key for all ESP diagnostic data | L2 ESP investigation | MEDIUM confidence — from Microsoft Learn troubleshooting doc |
| `HKLM:\SOFTWARE\Microsoft\Windows\Autopilot\EnrollmentStatusTracking\ESPTrackingInfo\Diagnostics\ExpectedPolicies` | Policies expected during ESP device phase — list of policy OMA-URIs the device is waiting for | L2 ESP investigation | MEDIUM confidence — from Microsoft Learn troubleshooting doc |
| `HKLM:\SOFTWARE\Microsoft\Windows\Autopilot\EnrollmentStatusTracking\ESPTrackingInfo\Diagnostics\Sidecar` | Win32 app installation status during ESP — per-app subkeys with install state | L2 ESP investigation | MEDIUM confidence — from Microsoft Learn troubleshooting doc |

## Version History

| Date | Change | Author |
|------|--------|--------|
| YYYY-MM-DD | v1.15 EEE reformat — content not re-reviewed | — |