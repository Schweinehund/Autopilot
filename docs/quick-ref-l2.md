---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: both
audience: L2
platform: all
---

> **Platform coverage:** This card covers Windows [Autopilot](_glossary.md#autopilot) (classic/APv1), Autopilot Device Preparation (APv2), macOS ADE, and iOS/iPadOS.
> Sections are labeled by platform/framework. See [APv1 vs APv2](apv1-vs-apv2.md) for Windows framework selection or [Windows vs macOS](windows-vs-macos.md) for cross-platform.

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
- [Full PowerShell Reference](reference/powershell-ref.md)
- [Full Registry Paths Reference](reference/registry-paths.md)
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

---

## macOS ADE Quick Reference

**Platform:** macOS ADE (Automated Device Enrollment)

### macOS Log Collection

Download and run IntuneMacODC:

```bash
curl -L https://aka.ms/IntuneMacODC -o IntuneMacODC.sh
chmod u+x ./IntuneMacODC.sh
sudo ./IntuneMacODC.sh
```

### Key Terminal Commands

```bash
# Check MDM enrollment status
profiles status -type enrollment
# List installed configuration profiles
sudo profiles show
# Query MDM events from last hour
log show --predicate 'subsystem == "com.apple.ManagedClient"' --info --last 1h
# Output all profile data
system_profiler SPConfigurationProfileDataType
# Verify Intune agent running
pgrep -il "^IntuneMdm"
```

### Critical Log Paths

| Path | Purpose |
|------|---------|
| `/Library/Logs/Microsoft/Intune/IntuneMDMDaemon*.log` | Intune daemon -- PKG/DMG installs, scripts, policy |
| `~/Library/Logs/Microsoft/Intune/IntuneMDMAgent*.log` | Intune agent -- user-context scripts, user policy |
| `/Library/Logs/Microsoft/Intune/CompanyPortal*.log` | Company Portal enrollment, registration, compliance |

Unified log subsystems: `com.apple.ManagedClient` (profile events), `com.apple.ManagedClient.cloudconfigurationd` (ADE enrollment)

Full reference: [macOS Terminal Commands](reference/macos-commands.md) | [macOS Log Paths](reference/macos-log-paths.md)

### macOS Investigation Runbooks

- [macOS Log Collection Guide](l2-runbooks/10-macos-log-collection.md) -- prerequisite for all macOS investigations
- [Profile Delivery Investigation](l2-runbooks/11-macos-profile-delivery.md)
- [App Install Failure Diagnosis](l2-runbooks/12-macos-app-install.md)
- [Compliance Evaluation Investigation](l2-runbooks/13-macos-compliance.md)

---

## iOS/iPadOS Quick Reference

**Platform:** iOS/iPadOS through Microsoft Intune

> **Important:** iOS has NO CLI diagnostic tool. No equivalent to `mdmdiagnosticstool.exe` (Windows) or `profiles` / `log show` / `system_profiler` (macOS). Diagnostic data is fragmented across three tiered methods — see below.

### iOS Diagnostic Data Collection (3 methods)

| Method | Who Triggers | L2 Access Path | When to Use |
|--------|--------------|----------------|-------------|
| MDM diagnostic report | User (on-device) OR L2 (MAM-scoped Intune remote action) | On-device path (general MDM profile state): Settings > General > VPN & Device Management > Management Profile > More Details (user-coordinated screenshots; authoritative per-payload MDM profile state). MAM-scoped Intune remote action (App Protection only): Intune > Troubleshooting + support > Troubleshoot > [user] > App Protection > Checked-in > [app] > "..." > Collect diagnostics (M365 app MAM logs ONLY — this remote action does NOT produce a general MDM enrollment/config bundle per [`14-ios-log-collection.md:29,58`](l2-runbooks/14-ios-log-collection.md)) | Tier 1 -- always start here; on-device path for general MDM profile state, MAM-scoped action for App Protection diagnostics |
| Company Portal log upload | User (on device) | Microsoft Support ticket (indirect — support uploads logs to case on L2's behalf) | Tier 2 -- when Tier 1 is insufficient and no Mac+cable is available |
| Mac+cable sysdiagnose | L2 + user (physical) | Direct `.tar.gz` extraction via macOS Console.app | Tier 3 -- when profile-delivery verbosity is required (ADE token / MDM channel investigation) |

*(Full method details and scope distinctions: [iOS Log Collection Guide](l2-runbooks/14-ios-log-collection.md) is the authoritative source — MAM scope of the Intune "Collect diagnostics" remote action is documented at `14-ios-log-collection.md:29` and §1b:58. Verify portal paths per Phase 30 D-32 / Phase 31 D-31 research flags at execution time — Intune admin center UI can shift since last plan-time verification 2026-04-17.)*

### Key Intune Portal Paths (iOS L2)

| Path | Purpose |
|------|---------|
| Devices > Enrollment > Apple > Enrollment program tokens > [token] > Profiles | ABM token sync status, enrollment profile assignment, device assignment to profile |
| Devices > Enrollment > Apple > MDM Push Certificate | APNs certificate status, expiry date, renewal Apple ID |
| Devices > Enrollment > Enrollment restrictions | Platform / ownership / count restrictions applied to enrollment |
| Apps > iOS/iPadOS apps | Managed app status, VPP licensing state (device-licensed vs user-licensed), per-device install state |
| Devices > [device] > Device compliance | Per-device compliance policy evaluation state, timestamps, and non-compliant settings |

*(Verify paths per Phase 30 D-32 research flag — Microsoft Learn (verified 2026-04-17) confirms current; re-verify before content lock-in as Intune admin center reorganizes without deprecation notice.)*

### Sysdiagnose Trigger Reference (iOS/iPadOS)

| Device / OS | Trigger Combination |
|-------------|---------------------|
| **Modern iOS 15+** / iPadOS 15+ (unified trigger, all current devices) | Press and release both volume buttons + Side/Top button simultaneously (hold for ~250ms) |
| iPhone 8 / SE (1st+2nd gen) / iPad with Touch ID (Legacy / pre-iOS 15) | Both volume buttons + Sleep/Wake (Side) button |
| iPhone X and later iPhones (Legacy / pre-iOS 15) | Both volume buttons + Side button |
| iPad with Face ID (Legacy / pre-iOS 15) | Top button + either volume button |

*(Full procedure with Console.app extraction: [iOS Log Collection §Section 3](l2-runbooks/14-ios-log-collection.md#section-3-maccable-sysdiagnose). Modern unified trigger verified against Apple Developer forums 2026-04-17; legacy per-device-type triggers apply to pre-iOS-15 devices (increasingly rare in managed fleets). Verify triggers per Phase 31 D-30 research flag at execution time.)*

### iOS Investigation Runbooks

- [iOS Log Collection Guide](l2-runbooks/14-ios-log-collection.md) -- prerequisite for all iOS L2 investigations
- [ADE Token & Profile Delivery Investigation](l2-runbooks/15-ios-ade-token-profile.md) -- Pattern A-D failure analysis
- [App Install Failure Diagnosis](l2-runbooks/16-ios-app-install.md) -- three-class [CONFIG]/[TIMING]/[DEFECT] disambiguation
- [Compliance & CA Timing Investigation](l2-runbooks/17-ios-compliance-ca-timing.md) -- compliance axis + CA timing + Not-evaluated terminal state

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-17 | Phase 32: added iOS/iPadOS Quick Reference section with 3-method diagnostic data collection table, Intune portal paths table, sysdiagnose trigger reference table (modern unified + legacy per-device), and 4-runbook investigation list; research-flag footnotes per D-32; platform coverage blockquote updated per D-41 | -- |
| 2026-04-15 | Added macOS ADE Quick Reference section with log collection, Terminal commands, log paths, and investigation runbook links | -- |
| 2026-04-13 | Added APv2 quick-reference section with log collection and event IDs | -- |
| 2026-03-23 | Initial version | — |
