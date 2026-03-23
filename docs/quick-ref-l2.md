---
last_verified: 2026-03-23
review_by: 2026-06-21
applies_to: APv1
audience: L2
---

> **Version gate:** This guide applies to Windows [Autopilot](_glossary.md#autopilot) (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](apv1-vs-apv2.md).

# L2 Quick-Reference Card

## Log Collection

```
mdmdiagnosticstool.exe -area Autopilot -cab -out C:\Temp\AutopilotDiag
```

Registry snapshot:
```
reg export "HKLM\SOFTWARE\Microsoft\Windows\Autopilot\EnrollmentStatusTracking" "%COMPUTERNAME%_%DATE:~-4%-%DATE:~4,2%-%DATE:~7,2%_esp-registry.reg" /y
```

## PowerShell Diagnostic Commands

```powershell
Get-AutopilotDeviceStatus                    # Comprehensive device snapshot
Get-AutopilotRegistrationState               # Tenant ID and profile confirmation
Get-TPMStatus                                # [TPM](_glossary.md#tpm) readiness check
Test-AutopilotConnectivity                   # Endpoint reachability test
Get-AutopilotLogs -OutputPath "C:\Temp\AutopilotDiag\$env:COMPUTERNAME"  # One-command log collection
Get-AutopilotHardwareHash                    # Hardware hash retrieval
```

## Event Viewer Log Paths

```
Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin
Microsoft-Windows-Provisioning-Diagnostics-Provider/Admin
Microsoft-Windows-AAD/Operational
Microsoft-Windows-User Device Registration/Admin
```

## Registry Paths

| Path | When to Use |
|------|------------|
| `HKLM:\SOFTWARE\Microsoft\Provisioning\Diagnostics\Autopilot` | Registration state: TenantId, TenantDomain, ProfileName |
| `HKLM:\SOFTWARE\Microsoft\Provisioning\AutopilotSettings` | Profile assignment details |
| `HKLM:\SOFTWARE\Microsoft\Enrollments\{GUID}\FirstSync` | [ESP](_glossary.md#esp) device phase tracking (IsServerProvisioningDone: 0=device, 1=done) |
| `HKLM:\SOFTWARE\Microsoft\Windows\Autopilot\EnrollmentStatusTracking` | ESP root — parent of all ESP diagnostic data |

## Key Event IDs

| Scenario | Event IDs |
|---------|----------|
| Device registration | 807 (ZtdDeviceIsNotRegistered), 908 (SerialNumberMismatch) |
| Profile assignment | 809 (profile deleted), 815 (profile not assigned) |
| TPM attestation | 171 (TPMIdentityFailed), 172 (AutopilotProfileUnavailable) |
| ESP/enrollment | 0x81036501 (MDMInfoNotFound), 0x81036502 (AppInstallFailure) |

## Investigation Runbooks

- [Log Collection Guide](l2-runbooks/01-log-collection.md) — prerequisite for all investigations
- [ESP Deep-Dive](l2-runbooks/02-esp-deep-dive.md)
- [TPM Attestation Investigation](l2-runbooks/03-tpm-attestation.md)
- [Hybrid Join Investigation](l2-runbooks/04-hybrid-join.md)
- [Policy Conflict Analysis](l2-runbooks/05-policy-conflicts.md)
- [PowerShell Reference (full)](reference/powershell-ref.md)
- [Registry Paths (full)](reference/registry-paths.md)
- [Network Endpoints](reference/endpoints.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-03-23 | Initial version | — |
