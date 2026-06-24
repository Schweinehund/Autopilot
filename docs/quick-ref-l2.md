---
last_verified: 2026-05-01
review_by: 2026-06-30
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

### Platform SSO Log Paths

| Path | Purpose |
|------|---------|
| `/Library/Logs/Microsoft/CompanyPortal/CompanyPortal*.log` | Company Portal PSSO registration events |
| `/var/log/DiagnosticMessages` | System-level SSO framework messages (search for `ssoextension`) |

#### Platform SSO Attestation Command

Verify PSSO registration state -- run on the affected Mac:

```bash
app-sso platform -s
```

Expected healthy output includes both `Device Registration: REGISTERED` and `User Registration: REGISTERED` with SSO tokens listed. See [07-platform-sso-setup.md — Verification](admin-setup-macos/07-platform-sso-setup.md) for the full expected output format.

#### Kerberos SSO Diagnostics

Verify Kerberos ticket cache -- run on the affected Mac:

```bash
klist
```

Healthy output shows a TGT with a future expiry for the configured realm. An empty cache or "No credentials cache found" indicates TGT acquisition failure. For PSSO-TGT integration context (`tgt_ad` on-prem vs `tgt_cloud` Entra), see the [Platform SSO Attestation Command](#platform-sso-attestation-command) block above.

### macOS Investigation Runbooks

- [macOS Log Collection Guide](l2-runbooks/10-macos-log-collection.md) -- prerequisite for all macOS investigations
- [Profile Delivery Investigation](l2-runbooks/11-macos-profile-delivery.md)
- [App Install Failure Diagnosis](l2-runbooks/12-macos-app-install.md)
- [Compliance Evaluation Investigation](l2-runbooks/13-macos-compliance.md)
- [Platform SSO Investigation](l2-runbooks/27-macos-sso-investigation.md) -- PSSO registration failure and Password-sync failure investigation
- [Kerberos SSO Investigation](l2-runbooks/28-macos-kerberos-sso-investigation.md) -- Kerberos TGT not acquired, realm/KDC reachability, and PSSO-TGT integration investigation

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
| Devices > Device onboarding > Enrollment > Apple (tab) > Enrollment program tokens > [token] > Profiles | ABM token sync status, enrollment profile assignment, device assignment to profile |
| Devices > Device onboarding > Enrollment > Apple (tab) > Apple MDM Push Certificate | APNs certificate status, expiry date, renewal Apple ID |
| Devices > Device onboarding > Enrollment > Enrollment restrictions (Device platform restriction) | Platform / ownership / count restrictions applied to enrollment |
| Apps > iOS/iPadOS apps | Managed app status, VPP licensing state (device-licensed vs user-licensed), per-device install state |
| Devices > [device] > Device compliance | Per-device compliance policy evaluation state, timestamps, and non-compliant settings |

*(Verified 2026-04-18 against Microsoft Learn: paths updated to reflect the "Device onboarding" section reorg under Devices. Intune admin center reorganizes without deprecation notice — re-verify before content lock-in.)*

### Sysdiagnose Trigger Reference (iOS/iPadOS)

Per Apple's canonical platform support guide, sysdiagnose is triggered via **AssistiveTouch > Analytics** — a uniform procedure that works across all iPhone/iPad models and iOS/iPadOS versions. The legacy physical-button combos (volume + Side/Top) are no longer the Apple-recommended method.

**5-step AssistiveTouch sysdiagnose procedure (all current iPhones and iPads):**

1. **Enable AssistiveTouch:** Settings > Accessibility > Touch > AssistiveTouch > toggle ON.
2. **Add Analytics to the AssistiveTouch top-level menu:** Settings > Accessibility > Touch > AssistiveTouch > Customize Top Level Menu > tap **Custom** > select **Analytics**.
3. **Trigger sysdiagnose:** tap the on-screen AssistiveTouch button > **Analytics**. Device begins background sysdiagnose generation (~10 minutes; no haptic feedback on iPad).
4. **Locate output file:** Settings > Privacy & Security > Analytics & Improvements > Analytics Data. Scroll to the `sysdiagnose_` prefixed entry matching today's date/time.
5. **Export from device:** tap the sysdiagnose file > tap the share button (top-right) > send via AirDrop, Email, iCloud, Files.app, or any installed share extension. (For bundles >25 MB, prefer AirDrop or iCloud over Mail.)

> **Supervised-device compatibility:** AssistiveTouch-based trigger works on supervised devices. Unlike the legacy volume + Side-button combo, it does NOT conflict with the Side Button restriction profile (Allow Side Button = false). This is the recommended trigger for managed-fleet troubleshooting.

*(Full procedure with Mac+cable alternative: [iOS Log Collection §Section 3](l2-runbooks/14-ios-log-collection.md#section-3-sysdiagnose-trigger-and-file-export). Authoritative source: Apple Support — [Use Diagnostics to research device issues](https://support.apple.com/guide/platform-support/use-diagnostics-to-research-device-issues-supd3f43814e/web). Verified 2026-04-18 per UAT Test 15 resolution; replaces prior Phase 31 D-30 physical-button research-flag marker.)*

### iOS Investigation Runbooks

- [iOS Log Collection Guide](l2-runbooks/14-ios-log-collection.md) -- prerequisite for all iOS L2 investigations
- [ADE Token & Profile Delivery Investigation](l2-runbooks/15-ios-ade-token-profile.md) -- Pattern A-D failure analysis
- [App Install Failure Diagnosis](l2-runbooks/16-ios-app-install.md) -- three-class [CONFIG]/[TIMING]/[DEFECT] disambiguation
- [Compliance & CA Timing Investigation](l2-runbooks/17-ios-compliance-ca-timing.md) -- compliance axis + CA timing + Not-evaluated terminal state

## Android Enterprise Quick Reference

**Platform:** Android Enterprise through Microsoft Intune

> **Important:** Android L2 diagnostic data collection is mode-dependent. AMAPI April 2025 changed the primary log mechanism for managed-Android modes — see the table below for the per-mode primary tool. Play Integrity verdict interpretation lives at the Phase 54 SSoT — this H2 carries pointer-only references (PITFALL-7 firewall).

### Android Diagnostic Data Collection (3 methods)

| Method | Primary Tool by Mode | Who Triggers | L2 Access Path | When to Use |
|--------|----------------------|--------------|----------------|-------------|
| Company Portal Logs | BYOD pre-AMAPI: primary | User (on device) | Company Portal app > Help > Send logs (uploaded to Microsoft Support; L2 retrieves via support case) | Tier 1 -- BYOD pre-AMAPI April 2025 default; legacy log path for personal-profile work-app diagnostics |
| Microsoft Intune App Logs | BYOD post-AMAPI + COBO + Dedicated + ZTE: primary | User (on device) | Intune app > Help > Send logs (uploaded to Microsoft Support; L2 retrieves via support case) | Tier 1 -- AMAPI April 2025 default for managed-Android modes; primary log mechanism post-AMAPI |
| adb logcat | All modes: last-resort | L2 + user (physical USB) | Direct on-device retrieval via Android Debug Bridge (`adb logcat -d > logs.txt`) — requires Developer Options + USB Debugging enabled | Tier 3 -- when Tier 1 is insufficient; on-device verbosity for DPC / ZTE / Knox-provisioning investigation |

*(Full method details and AMAPI-cutover semantics: [Android Log Collection Guide](l2-runbooks/18-android-log-collection.md) is the authoritative source. Per-method scope, evidence-collection prerequisites, and the BYOD-mode AMAPI cutover are documented in §Section 1, §Section 2, §Section 3 of that file.)*

### Key Intune Portal Paths (Android L2)

| Path | Purpose |
|------|---------|
| Devices > Android (all enrollment modes overview) | Per-mode device inventory + enrollment state across BYOD WP / Corporate-owned fully-managed / Corporate-owned dedicated / Corporate-owned WP / AOSP corporate-owned |
| Devices > Device onboarding > Enrollment > Android (per-mode tabs: Personally-owned WP / Corporate-owned fully-managed / Corporate-owned dedicated / Corporate-owned WP / AOSP corporate-owned) | Per-mode enrollment configuration: token / profile / DPC settings |
| Apps > Android | Managed Google Play app status, per-app deployment configuration, MGP-binding state |
| Devices > [device] > Device compliance | Per-device compliance policy evaluation state, timestamps, non-compliant settings (incl. Play Integrity verdict) |
| Reports > Endpoint analytics (Android subset) | Per-mode device telemetry rollup; supplemental for compliance-trend correlation |

*(Verified 2026-04-30 against Microsoft Learn. Intune admin center reorganizes without deprecation notice — re-verify before content lock-in. Note: Knox Mobile Enrollment portal and Android Zero-Touch portal are EXTERNAL admin portals, not Intune admin center paths — surfaced in L1 quick-ref escalation triggers, not in this Intune-portal table.)*

### Play Integrity Verdict Reference

| Verdict | One-line Meaning | SSoT |
|---------|------------------|------|
| MEETS_BASIC_INTEGRITY | Device passed basic integrity check (running on a real Android device, not heavily-modified) | [Phase 54 SSoT](../operations/patch-management/04-android-patch-delivery.md#play-integrity-attestation) |
| MEETS_DEVICE_INTEGRITY | Device passed integrity + has Google Play Services (a recognized app-distribution surface) | [Phase 54 SSoT](../operations/patch-management/04-android-patch-delivery.md#play-integrity-attestation) |
| MEETS_STRONG_INTEGRITY | Device passed integrity + has Google Play Services + has hardware-backed key attestation + meets the Android security patch age requirement | [Phase 54 SSoT](../operations/patch-management/04-android-patch-delivery.md#play-integrity-attestation) |

> ⚠️ **Cascade deadlines and the full enforcement-cascade migration playbook are owned by [Phase 54 SSoT — Android Patch Delivery — Deadlines](../operations/patch-management/04-android-patch-delivery.md#deadlines-cutover-dates).**

Full cascade timeline and remediation playbook: see [Android Patch Delivery — Deadlines](../operations/patch-management/04-android-patch-delivery.md#deadlines-cutover-dates).

### Android Investigation Runbooks

- [Android Log Collection Guide](l2-runbooks/18-android-log-collection.md) -- prerequisite for all Android L2 investigations (3-method: Company Portal / Microsoft Intune App / adb logcat with AMAPI April 2025 mode-switching)
- [Android Enrollment Investigation](l2-runbooks/19-android-enrollment-investigation.md) -- GMS modes (BYOD / COBO / Dedicated / ZTE); Pattern A-E failure analysis; AOSP excluded -- see #23
- [Android App Install Investigation](l2-runbooks/20-android-app-install-investigation.md) -- MGP / LOB three-class disambiguation across all GMS modes
- [Android Compliance Investigation](l2-runbooks/21-android-compliance-investigation.md) -- Cause A (Play Integrity) / B (OS version) / C (CA timing) / D (passcode / encryption); cross-link to Phase 54 Play Integrity SSoT
- [Android Knox Investigation](l2-runbooks/22-android-knox-investigation.md) -- mode-specific (Samsung KME provisioning into COBO / Dedicated / WPCO via Knox portal); reciprocal with #19 when Knox-provisioned device fails GMS-side enrollment
- [Android AOSP Investigation](l2-runbooks/23-android-aosp-investigation.md) -- mode-specific (5 OEMs: RealWear / Zebra / Pico / HTC VIVE Focus / Meta Quest); GMS-bearing devices route to #19 instead

---

## Linux Quick Reference

**Platform:** Linux (Ubuntu 22.04 / 24.04 LTS) through Microsoft Intune

> **Important:** Linux L2 diagnostic data collection follows a 3-tier methodology (journalctl primary / file-based paths secondary / package-state queries supplemental) per the Phase 52 Decision Matrix. Compliance category configuration content lives at the Phase 50 SSoT — this H2 carries pointer-only references (PITFALL-7 firewall).

### Linux Diagnostic Data Collection (3 methods)

| Method | Primary Tool | Who Triggers | Data Scope | L2 Access Path | Confidence |
|--------|--------------|--------------|------------|----------------|------------|
| journalctl (systemd journal) | `journalctl -u intune-agent` / `journalctl --user -u intune-agent` | L2 (on device via SSH) | systemd journal entries for `intune-agent` service + user-scope timer activations | Direct on-device retrieval | Tier 1 -- primary log mechanism for all Linux Intune agent activity |
| File-based paths | `cat /var/log/intune-update.log` + `cat /var/log/dpkg.log` | L2 (on device via SSH) | Package install/upgrade history (`dpkg.log`) + Intune update transitions (`intune-update.log`) | Direct on-device retrieval | Tier 2 -- supplemental for package-install troubleshooting + post-update re-enrollment |
| Package-state queries | `dpkg -l intune-portal` + `apt-cache policy intune-portal` | L2 (on device via SSH) | Current package version + install state (`ii` flag) + apt source policy | Direct on-device retrieval | Tier 3 -- diagnostic for Identity Broker `intune-portal` 2.0.2+ breaking change re-enrollment loops (Phase 50 LIN-05 known pitfall) |

*(Full method details: [Linux Log Collection Guide](l2-runbooks/24-linux-log-collection.md) is the authoritative source. Per-method scope, evidence-collection prerequisites, and the 3-tier escalation order are documented in the Decision Matrix at lines 30-36 of that file.)*

### Key Intune Portal Paths (Linux L2)

| Path | Purpose |
|------|---------|
| Devices > Linux | Per-device inventory + enrollment state (Linux-scoped) |
| Devices > [device] > Device compliance | Per-device compliance policy evaluation state, timestamps, non-compliant categories (4-category surface: Allowed Distributions / Custom Compliance / Device Encryption / Password Policy) |
| Devices > Device onboarding > Enrollment > Linux (limited surface) | Linux enrollment configuration (no zero-touch -- user-initiated only); compliance policy assignment surface |
| Reports > Endpoint analytics (Linux subset) | Per-device telemetry rollup; supplemental for compliance-trend correlation across Linux fleet |

*(Verified 2026-05-01 against Microsoft Learn. Intune admin center reorganizes without deprecation notice -- re-verify before content lock-in. Note: Linux has no zero-touch / token portal equivalent; user-initiated enrollment is the only path.)*

### Linux Compliance Category Reference

| Category | One-line role | SSoT |
|----------|---------------|------|
| Allowed Distributions | Restricts compliance to Ubuntu 22.04 / 24.04 LTS; Ubuntu 20.04 dropped from Intune 2508 (August 2025) | [Phase 50 SSoT](../admin-setup-linux/03-compliance-policy.md#step-2-configure-allowed-distributions) |
| Custom Compliance | Bash discovery scripts evaluate device state at scheduled intervals; per-device exit codes drive compliance verdict | [Phase 50 SSoT](../admin-setup-linux/03-compliance-policy.md#step-3-configure-custom-compliance-bash-discovery-scripts) |
| Device Encryption | dm-crypt + LUKS full-disk encryption signal as compliance prerequisite (encryption-compliance triple analog: BitLocker / FileVault / dm-crypt) | [Phase 50 SSoT](../admin-setup-linux/03-compliance-policy.md#step-4-configure-device-encryption-dm-crypt-luks) |
| Password Policy | Minimum length / complexity rules; enforced via PAM `pwquality` configuration on enrolled devices | [Phase 50 SSoT](../admin-setup-linux/03-compliance-policy.md#step-5-configure-password-policy) |

> ⚠️ **Bash discovery script authoring, compliance-evaluation cadence, and per-category remediation playbooks are owned by [Phase 50 SSoT — Linux Compliance Policy](../admin-setup-linux/03-compliance-policy.md).**

Full configuration details and per-category remediation: see the [Linux Compliance Policy admin guide](../admin-setup-linux/03-compliance-policy.md).

### Linux Investigation Runbooks

- [Linux Log Collection Guide](l2-runbooks/24-linux-log-collection.md) -- prerequisite for all Linux L2 investigations (3-method matrix: journalctl primary / file-based paths secondary / package-state queries supplemental)
- [Linux Agent Investigation](l2-runbooks/25-linux-agent-investigation.md) -- service-state diagnosis + Identity Broker `intune-portal` 2.0.2+ re-enrollment loop investigation + systemd timer activation analysis

## Apple Business Quick Reference

**Platform:** Apple Business (Shared iPad + sub-org admin delegated governance)

### Apple Business Portal Navigation

- **Permission catalog:** Apple Business > Settings > Roles (sub-org admin view)
- **OU device list:** Apple Business > Locations > [OU name] > Devices
- **Activity log:** Apple Business > Activity (audit log for permission events; no public retention SLA per DELEG-07)

### Apple Business Permission Investigation

1. Confirm user role in Apple Business portal — Settings > People > [user] > Role
2. Check OU scope of the role assignment — compare against the failing action's OU
3. Check Edit-without-View table in [01-role-permission-model.md](cross-platform/apple-business/01-role-permission-model.md) for OP-3 companion-view dependencies
4. Federation state check: Settings > Accounts (SCIM/OIDC sync status) — see [16-managed-apple-account-runbook.md](cross-platform/apple-business/16-managed-apple-account-runbook.md)

### Investigation Runbooks

- [26: Apple Business Permission Denied Investigation](l2-runbooks/26-apple-business-permission-denied.md) — 7-leaf Mermaid tree; role / OU / scope / federation / quota / lockout
- [12: Shared iPad Passcode Reset](cross-platform/apple-business/12-shared-ipad-passcode-reset.md) — 3-path matrix (Path A UI / Path B MDM ClearPasscode / Path C MDM EraseDevice + OP-11)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-24 | Phase 87 (REF-03): added Kerberos SSO Diagnostics block (klist) + Kerberos SSO Investigation runbook bullet to macOS section | -- |
| 2026-06-22 | Phase 81 (SSOREF-04): appended Platform SSO Log Paths section + app-sso platform -s attestation command + L2 #27 investigation runbook bullet to macOS section | -- |
| 2026-05-22 | Phase 65 plan 65-03: appended Apple Business Quick Reference H2 (ABNAV-05; L2 command/log-collection voice) | -- |
| 2026-05-01 | Phase 59 (CLEAN-08): added Linux Quick Reference H2 (4-part substructure: Linux Diagnostic Data Collection 3 methods / Key Intune Portal Paths Linux L2 / Linux Compliance Category Reference 4-row pointer table / Linux Investigation Runbooks 2-link list); link-not-copy contract for Phase 50 Compliance Policy SSoT per PITFALL-7 + Phase 57 D-22..D-25 + D-23 ENDORSEMENT inheritance | -- |
| 2026-04-30 | Phase 57: added Android Enterprise Quick Reference H2 (4-part substructure: 3-method log collection with AMAPI mode-switching / Key Intune Portal Paths Android L2 4-5 rows / Play Integrity Verdict Reference 3-row pointer table cross-linking Phase 54 SSoT / 6-runbook investigation list with iOS-style ` -- ` disambiguation per row); link-not-copy contract for Play Integrity SSoT per PITFALL-7 + Phase 56 D-08 inheritance (CLEAN-04; DEFER-07 close) | -- |
| 2026-04-18 | Phase 32 HUMAN-UAT item 2 closure: updated Key Intune Portal Paths table to reflect current admin center "Device onboarding" section under Devices per Microsoft Learn 2026-04-16 docs (affects Enrollment Program Tokens, Apple MDM Push Certificate, Enrollment restrictions paths) | -- |
| 2026-04-18 | Phase 32 gap closure (UAT Test 15): replaced iOS Sysdiagnose Trigger Reference physical-button table with AssistiveTouch-based procedure per Apple Support canonical URL; updated cross-link anchor to match renamed Section 3 in 14-ios-log-collection.md | -- |
| 2026-04-17 | Phase 32: added iOS/iPadOS Quick Reference section with 3-method diagnostic data collection table, Intune portal paths table, sysdiagnose trigger reference table (modern unified + legacy per-device), and 4-runbook investigation list; research-flag footnotes per D-32; platform coverage blockquote updated per D-41 | -- |
| 2026-04-15 | Added macOS ADE Quick Reference section with log collection, Terminal commands, log paths, and investigation runbook links | -- |
| 2026-04-13 | Added APv2 quick-reference section with log collection and event IDs | -- |
| 2026-03-23 | Initial version | — |
