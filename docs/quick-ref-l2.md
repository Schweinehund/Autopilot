---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: L2
---

> **Framework coverage:** This card covers both Windows [Autopilot](_glossary.md#autopilot) (classic/APv1) and Autopilot Device Preparation (APv2).
> APv1 and APv2 sections are labeled. See [APv1 vs APv2](apv1-vs-apv2.md) for framework selection.

# L2 Quick-Reference Card

## Log Collection

**Framework:** APv1 (classic)

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

---

## APv2 Quick Reference

**Framework:** APv2 (Device Preparation)

> **Important:** APv2 does NOT use `mdmdiagnosticstool.exe` for log collection. Use the BootstrapperAgent event log and IME log folder below.

### APv2 Log Collection

Export BootstrapperAgent events:
```
wevtutil epl "Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin" "%COMPUTERNAME%_BootstrapperAgent.evtx"
```

IME log folder (copy entire folder):
```
C:\ProgramData\Microsoft\IntuneManagementExtension\Logs
```

Intune deployment report:
```
Intune admin center > Devices > Monitor > Device preparation deployments
```

### APv2 Event Viewer Log Path

```
Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin
```

> **Note:** This is the same log path as APv1, but APv2 events use different event ID ranges (see below).

### APv2 Key Event ID Ranges

| Range | Category | Examples |
|-------|----------|----------|
| 1xxx | Deployment lifecycle | 1000 deployment started, 1001 completed |
| 2xxx | Entra join | 2000 join initiated |
| 3xxx | Enrollment | 3000 enrollment started |
| 4xxx | IME operations | 4000 IME ready |
| 5xxx | App installation | 5000 app install started, 5001 completed, 5002 failed |
| 6xxx | Script execution | 6000 script started, 6001 completed, 6002 failed |
| 9xxx | Errors | 9000+ error events |

> **Confidence:** MEDIUM -- event ID ranges sourced from community research (oofhours.com, Call4Cloud), not official Microsoft documentation. See [APv2 Event ID Reference](l2-runbooks/07-apv2-event-ids.md) for full details.

### APv2 Investigation Runbooks

- [APv2 Log Collection Guide](l2-runbooks/06-apv2-log-collection.md) -- prerequisite for all APv2 investigations
- [APv2 Event ID Reference](l2-runbooks/07-apv2-event-ids.md)
- [APv2 Deployment Report Guide](l2-runbooks/08-apv2-deployment-report.md)
- [APv2 Failure Catalog](error-codes/06-apv2-device-preparation.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-13 | Added APv2 quick-reference section with log collection and event IDs | -- |
| 2026-03-23 | Initial version | — |
