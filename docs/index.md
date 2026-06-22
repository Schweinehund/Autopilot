---
last_verified: 2026-05-01
review_by: 2026-06-30
applies_to: both
audience: all
platform: all
---

> **Platform coverage:** This index covers Windows Autopilot (classic/APv1 and Device Preparation/APv2), macOS ADE, iOS/iPadOS, Android Enterprise, and Linux (Ubuntu LTS) provisioning, plus cross-platform operational depth (co-management, patch & update management, app lifecycle automation, drift detection + tenant migration), and Apple Business delegated governance (Apple Business-managed device pools, shared iPad passcode reset, sub-org admin onboarding).
> Not sure which framework applies? See [APv1 vs APv2](apv1-vs-apv2.md) for Windows or [Windows vs macOS](windows-vs-macos.md) for cross-platform.

# Device Provisioning Documentation

Troubleshooting, investigation, and setup guides for Windows Autopilot, macOS ADE, and iOS/iPadOS Intune provisioning deployments. Choose your platform below, then follow the path for your role.

## Choose Your Platform

- [Windows Autopilot](#windows-autopilot) -- Windows device provisioning via Autopilot (classic/APv1) and Device Preparation (APv2)
- [macOS Provisioning](#macos-provisioning) -- macOS device provisioning via Automated Device Enrollment (ADE) through Apple Business Manager
- [iOS/iPadOS Provisioning](#iosipados-provisioning) -- iOS/iPadOS device provisioning via Microsoft Intune (ADE, Device Enrollment, Account-Driven User Enrollment, MAM-WE)
- [Android Enterprise Provisioning](#android-enterprise-provisioning) -- Android device provisioning via Intune (Zero-Touch, Fully Managed, Work Profile, Dedicated, AOSP stub)
- [Linux Provisioning](#linux-provisioning) -- Linux device provisioning via Microsoft Intune Linux client (Ubuntu 22.04 / 24.04 LTS, intune-portal package, web-app conditional access)
- [Operations](#operations) -- Cross-platform operational depth (co-management, patch & update management, app lifecycle automation, drift detection + tenant migration)
- [Cross-Platform References](#cross-platform-references) -- Glossaries, concept comparison, and shared resources

---

## Windows Autopilot

### Service Desk (L1) -- APv1

**Framework:** APv1 (classic)

| Resource | When to Use |
|----------|-------------|
| [Initial Triage Decision Tree](decision-trees/00-initial-triage.md) | Start here -- identifies the failure scenario and routes to the correct runbook |
| [ESP Failure Decision Tree](decision-trees/01-esp-failure.md) | Enrollment Status Page stuck, timed out, or showing an error code |
| [Profile Assignment Decision Tree](decision-trees/02-profile-assignment.md) | Device registered but no profile assigned or wrong profile |
| [TPM Attestation Decision Tree](decision-trees/03-tpm-attestation.md) | Pre-provisioning [TPM](_glossary.md#tpm) attestation failure |
| [L1 Runbooks](l1-runbooks/00-index.md) | Scripted procedures for the five highest-volume failure scenarios |
| [L1 Quick-Reference Card](quick-ref-l1.md) | One-page cheat sheet -- top checks and escalation triggers |

### Service Desk (L1) -- APv2

**Framework:** APv2 (Device Preparation)

| Resource | When to Use |
|----------|-------------|
| [APv2 Triage Decision Tree](decision-trees/04-apv2-triage.md) | Start here -- identifies the APv2 failure scenario and routes to the correct runbook |
| [Deployment Not Launched](l1-runbooks/06-apv2-deployment-not-launched.md) | Device completed OOBE but Device Preparation screen never appeared |
| [Apps Not Installed](l1-runbooks/07-apv2-apps-not-installed.md) | Device Preparation completed but apps or scripts are missing or failed |
| [APv1 Registration Conflict](l1-runbooks/08-apv2-apv1-conflict.md) | ESP appeared instead of Device Preparation screen |
| [Deployment Timeout](l1-runbooks/09-apv2-deployment-timeout.md) | Device Preparation deployment timed out before completing |
| [L1 Quick-Reference Card](quick-ref-l1.md) | One-page cheat sheet -- top checks and escalation triggers |

### Desktop Engineering (L2) -- APv1

**Framework:** APv1 (classic)

| Resource | When to Use |
|----------|-------------|
| [L2 Investigation Runbooks](l2-runbooks/00-index.md) | Technical investigation guides with registry, PowerShell, and event log analysis |
| [Log Collection Guide](l2-runbooks/01-log-collection.md) | Prerequisite for all L2 investigations -- collect diagnostic package first |
| [PowerShell Reference](reference/powershell-ref.md) | All 12 diagnostic and remediation functions with syntax and examples |
| [Registry Paths](reference/registry-paths.md) | Autopilot-relevant registry locations with confidence ratings |
| [Network Endpoints](reference/endpoints.md) | Required endpoints with test commands |
| [L2 Quick-Reference Card](quick-ref-l2.md) | One-page cheat sheet -- commands, log paths, event IDs |

### Desktop Engineering (L2) -- APv2

**Framework:** APv2 (Device Preparation)

| Resource | When to Use |
|----------|-------------|
| [APv2 Log Collection Guide](l2-runbooks/06-apv2-log-collection.md) | Prerequisite for all APv2 investigations -- collect BootstrapperAgent log and IME logs |
| [APv2 Event ID Reference](l2-runbooks/07-apv2-event-ids.md) | Look up BootstrapperAgent event IDs to identify failure type |
| [APv2 Deployment Report Guide](l2-runbooks/08-apv2-deployment-report.md) | Interpret the Intune APv2 deployment report -- status values and failure identification |
| [L2 Quick-Reference Card](quick-ref-l2.md) | One-page cheat sheet -- commands, log paths, event IDs |

### Admin Setup

| Guide Set | Framework | Description |
|-----------|-----------|-------------|
| [APv1 Admin Setup Guides](admin-setup-apv1/00-overview.md) | APv1 (classic) | Hardware hash upload, deployment profiles, ESP, dynamic groups, deployment modes, Intune Connector |
| [APv2 Admin Setup Guides](admin-setup-apv2/00-overview.md) | APv2 (Device Preparation) | Prerequisites, RBAC, Enrollment Time Grouping, Device Preparation policy, corporate identifiers |

### Device Operations

Post-enrollment device management: reset, retire, wipe, re-provisioning, and tenant migration.

| Resource | Description |
|----------|-------------|
| [Device Operations Overview](device-operations/00-overview.md) | All post-enrollment device actions — reset, retire, wipe, re-provision, tenant migration |
| [Device Lifecycle Decision Tree](decision-trees/05-device-lifecycle.md) | "What do you want to preserve?" — routes to the correct device action in three steps or fewer |

---

## macOS Provisioning

Troubleshooting, investigation, and setup guides for macOS Automated Device Enrollment (ADE) through Apple Business Manager. For terminology, see the [macOS Provisioning Glossary](_glossary-macos.md). For the complete enrollment pipeline, see the [macOS ADE Lifecycle](macos-lifecycle/00-ade-lifecycle.md).

### Service Desk (L1)

| Resource | When to Use |
|----------|-------------|
| [macOS ADE Lifecycle](macos-lifecycle/00-ade-lifecycle.md) | Understand the 7-stage macOS enrollment pipeline from ABM registration through desktop |
| [macOS ADE Triage Decision Tree](decision-trees/06-macos-triage.md) | Start here -- identifies the macOS ADE failure scenario and routes to the correct runbook |
| [macOS L1 Runbooks](l1-runbooks/00-index.md#macos-ade-runbooks) | Scripted procedures for top macOS ADE enrollment failures (6 runbooks: device, Setup Assistant, profiles, apps, compliance, Company Portal) |
| [L1 Quick-Reference Card](quick-ref-l1.md#macos-ade-quick-reference) | One-page cheat sheet -- macOS top checks, escalation triggers, and runbook links |
| [macOS Platform SSO Runbooks](l1-runbooks/00-index.md#macos-ade-runbooks) | Platform SSO sign-in failure (runbook #35: "Registration Required" not appearing) or Secure Enclave key loss after password reset (runbook #36) |

### Desktop Engineering (L2)

| Resource | When to Use |
|----------|-------------|
| [macOS ADE Lifecycle](macos-lifecycle/00-ade-lifecycle.md) | End-to-end enrollment stages with behind-the-scenes technical detail |
| [macOS Terminal Commands Reference](reference/macos-commands.md) | Look up diagnostic commands (profiles, log show, system_profiler, IntuneMacODC) |
| [macOS Log Paths Reference](reference/macos-log-paths.md) | Find log file locations, unified log subsystems, and configuration profile paths |
| [Network Endpoints Reference](reference/endpoints.md#macos-ade-endpoints) | Required Apple and Microsoft URLs for ADE enrollment with test commands |
| [macOS Log Collection Guide](l2-runbooks/10-macos-log-collection.md) | Collect macOS diagnostic logs using IntuneMacODC and Terminal commands |
| [macOS L2 Runbooks](l2-runbooks/00-index.md#macos-ade-runbooks) | Investigation guides for profile delivery, app install, and compliance evaluation failures |
| [L2 Quick-Reference Card](quick-ref-l2.md#macos-ade-quick-reference) | One-page cheat sheet -- macOS Terminal commands, log paths, and key diagnostic checks |
| [macOS Platform SSO Investigation](l2-runbooks/00-index.md#macos-ade-runbooks) | PSSO registration failure or Password-sync failure investigation (runbook #27) |

### Admin Setup

| Resource | When to Use |
|----------|-------------|
| [macOS ADE Lifecycle](macos-lifecycle/00-ade-lifecycle.md) | Review the enrollment pipeline before configuring ABM and Intune |
| [Network Endpoints Reference](reference/endpoints.md#macos-ade-endpoints) | Verify firewall rules for all required ADE endpoints |
| [macOS Admin Setup Guides](admin-setup-macos/00-overview.md) | ABM configuration, enrollment profiles, configuration profiles, app deployment, compliance policies |
| [macOS Platform SSO Admin Setup Guides](admin-setup-macos/00-overview.md) | Platform SSO deployment (guide 07: setup), authentication method selection and deep-dive (guide 08: Secure Enclave key, Password sync, Smart card), and legacy SSO plug-in migration (guide 09) |

---

## iOS/iPadOS Provisioning

Troubleshooting, investigation, and setup guides for iOS/iPadOS enrollment and management through Microsoft Intune. For terminology, see the [Apple Provisioning Glossary](_glossary-macos.md). For enrollment paths, see the [iOS Enrollment Path Overview](ios-lifecycle/00-enrollment-overview.md).

### Service Desk (L1)

| Resource | When to Use |
|----------|-------------|
| [iOS Enrollment Path Overview](ios-lifecycle/00-enrollment-overview.md) | Start here -- understand the 4 iOS enrollment paths (ADE, Device Enrollment, Account-Driven User Enrollment, MAM-WE) and supervision axis |
| [iOS Triage Decision Tree](decision-trees/07-ios-triage.md) | Identifies the iOS failure scenario from symptoms and routes to the correct runbook |
| [iOS L1 Runbooks](l1-runbooks/00-index.md#ios-l1-runbooks) | Scripted procedures for the top iOS failure scenarios (6 runbooks: APNs expired, ADE not starting, enrollment restriction, license invalid, device cap, compliance blocked) |
| [L1 Quick-Reference Card](quick-ref-l1.md#iosipados-quick-reference) | One-page cheat sheet -- iOS top checks, escalation triggers, decision tree, and runbook links |

### Desktop Engineering (L2)

| Resource | When to Use |
|----------|-------------|
| [iOS Enrollment Path Overview](ios-lifecycle/00-enrollment-overview.md) | Review the 4 enrollment paths before diagnosing |
| [iOS ADE Lifecycle](ios-lifecycle/01-ade-lifecycle.md) | End-to-end supervised ADE enrollment stages with behind-the-scenes technical detail |
| [iOS Log Collection Guide](l2-runbooks/14-ios-log-collection.md) | Obtain iOS diagnostic data via 3 methods: MDM diagnostic report, Company Portal log upload, or Mac+cable sysdiagnose (iOS has no CLI diagnostic tool) |
| [iOS L2 Runbooks](l2-runbooks/00-index.md#ios-l2-runbooks) | Investigation guides for ADE token/profile delivery, app install failures, and compliance/CA timing |
| [L2 Quick-Reference Card](quick-ref-l2.md#iosipados-quick-reference) | One-page cheat sheet -- iOS diagnostic data collection methods, Intune portal paths, and sysdiagnose triggers |

### Admin Setup

| Resource | When to Use |
|----------|-------------|
| [iOS Admin Setup Overview](admin-setup-ios/00-overview.md) | Entry point for all iOS admin setup guides -- shared prereqs and path selection |
| [iOS ADE Lifecycle](ios-lifecycle/01-ade-lifecycle.md) | Review the supervised corporate enrollment pipeline before configuring ABM + Intune |
| [APNs Certificate](admin-setup-ios/01-apns-certificate.md) + [ABM/ADE Token](admin-setup-ios/02-abm-token.md) + [ADE Enrollment Profile](admin-setup-ios/03-ade-enrollment-profile.md) | Three corporate ADE prerequisites |
| [Configuration Profiles](admin-setup-ios/04-configuration-profiles.md) + [App Deployment](admin-setup-ios/05-app-deployment.md) + [Compliance Policy](admin-setup-ios/06-compliance-policy.md) | Configuration, app, and compliance admin guides with per-setting supervised-only callouts |
| [Device Enrollment](admin-setup-ios/07-device-enrollment.md) + [User Enrollment](admin-setup-ios/08-user-enrollment.md) + [MAM-WE App Protection](admin-setup-ios/09-mam-app-protection.md) | BYOD and MAM paths (Company Portal / web-based / account-driven / app-layer) |
| [iOS Capability Matrix](reference/ios-capability-matrix.md) | Compare iOS feature parity vs Windows and macOS -- scannable 5-domain table |

---

## Android Enterprise Provisioning

Troubleshooting, investigation, and setup guides for Android Enterprise provisioning through Microsoft Intune. For terminology, see the [Android Enterprise Provisioning Glossary](_glossary-android.md). For enrollment paths, see the [Android Provisioning Lifecycle](android-lifecycle/00-enrollment-overview.md).

### Service Desk (L1)

| Resource | When to Use |
|----------|-------------|
| [Android Provisioning Lifecycle](android-lifecycle/00-enrollment-overview.md) | Start here -- understand the Android enrollment paths (BYOD / COBO / Dedicated / ZTE / AOSP) and DPC modes |
| [Android Triage Decision Tree](decision-trees/08-android-triage.md) | Identifies the Android failure scenario from symptoms and routes to the correct runbook (mode-first per Phase 40 D-01) |
| [Android L1 Runbooks](l1-runbooks/00-index.md#android-l1-runbooks) | Scripted procedures for the 8 Android Enterprise enrollment + compliance failure scenarios (runbooks 22-29) |
| [L1 Quick-Reference Card](quick-ref-l1.md#android-enterprise-quick-reference) | One-page cheat sheet -- top checks with mode tags, escalation triggers, decision tree, and runbook list |

### Desktop Engineering (L2)

| Resource | When to Use |
|----------|-------------|
| [Android Provisioning Lifecycle](android-lifecycle/00-enrollment-overview.md) | Review the Android enrollment paths before diagnosing |
| [Android Log Collection Guide](l2-runbooks/18-android-log-collection.md) | Prerequisite for all Android L2 investigations (3-method: Company Portal / Microsoft Intune App / adb logcat) |
| [Android L2 Runbooks](l2-runbooks/00-index.md#android-l2-runbooks) | Investigation guides for enrollment, app install, compliance, Knox, and AOSP failures (runbooks 18-23) |
| [L2 Quick-Reference Card](quick-ref-l2.md#android-enterprise-quick-reference) | One-page cheat sheet -- 3-method log collection, Intune portal paths, Play Integrity verdict reference, investigation runbook list |

### Admin Setup

| Resource | When to Use |
|----------|-------------|
| [Android Admin Setup Overview](admin-setup-android/00-overview.md) | Entry point for all Android admin setup guides; tri-portal Mermaid diagram + per-mode setup-sequence enumeration lives at this overview, not at hub level |
| [Android Provisioning Lifecycle](android-lifecycle/00-enrollment-overview.md) | Review the enrollment pipeline before configuring Intune + MGP (admin-context entry) |
| [Android Capability Matrix](reference/android-capability-matrix.md) | Compare Android feature parity vs Windows, macOS, iOS -- scannable 5-domain table |

---

## Linux Provisioning

Troubleshooting, investigation, and setup guides for Linux (Ubuntu 22.04 / 24.04 LTS) device management through Microsoft Intune. For terminology, see the [Linux Provisioning Glossary](_glossary-linux.md). For enrollment paths, see the [Linux Provisioning Lifecycle](linux-lifecycle/00-enrollment-overview.md).

### Service Desk (L1)

| Resource | When to Use |
|----------|-------------|
| [Linux Provisioning Lifecycle](linux-lifecycle/00-enrollment-overview.md) | Start here -- understand the Linux enrollment paths (Ubuntu 22.04 / 24.04 LTS, intune-portal package install, microsoft-identity-broker) |
| [Linux Triage Decision Tree](decision-trees/09-linux-triage.md) | Identifies the Linux failure scenario from symptoms (enrollment failed / non-compliant / web-app-CA-blocking-Edge / agent service not running) and routes to the correct runbook |
| [Linux L1 Runbooks](l1-runbooks/00-index.md#linux-l1-runbooks) | Scripted procedures for the 4 Linux failure scenarios (runbooks 30-33) |
| [L1 Quick-Reference Card](quick-ref-l1.md#linux-quick-reference) | One-page cheat sheet -- top checks, escalation triggers, decision tree, and runbook list |

### Desktop Engineering (L2)

| Resource | When to Use |
|----------|-------------|
| [Linux Provisioning Lifecycle](linux-lifecycle/00-enrollment-overview.md) | Review the Linux enrollment pipeline before diagnosing |
| [Linux Log Collection Guide](l2-runbooks/24-linux-log-collection.md) | Prerequisite for all Linux L2 investigations (3-method matrix: journalctl / file-based paths / package-state queries) |
| [Linux L2 Runbooks](l2-runbooks/00-index.md#linux-l2-runbooks) | Investigation guides for log collection + agent investigation (runbooks 24-25) |
| [L2 Quick-Reference Card](quick-ref-l2.md#linux-quick-reference) | One-page cheat sheet -- 3-method log collection, Intune portal paths, Linux compliance category reference, investigation runbook list |

### Admin Setup

| Resource | When to Use |
|----------|-------------|
| [Linux Admin Setup Overview](admin-setup-linux/00-overview.md) | Entry point for all Linux admin setup guides; per-file setup sequence (00-05) lives at this overview, not at hub level |
| [Linux Provisioning Lifecycle](linux-lifecycle/00-enrollment-overview.md) | Review the enrollment pipeline before configuring Intune + intune-portal package (admin-context entry) |
| [Linux Capability Matrix](reference/linux-capability-matrix.md) | Compare Linux feature parity vs Windows, macOS, iOS, Android -- scannable 6-domain table |

---

## Operations

Cross-platform operational guidance for Intune-managed fleets -- co-management, patch and update management, app lifecycle automation, and compliance drift detection plus tenant migration. For the full operations index, see [Operations Index](operations/00-index.md).

### Co-Management

Windows ConfigMgr-to-Intune workload management -- slider model, migration sequence, tenant attach disambiguation, and Windows Autopatch prerequisites.

| Resource | Description |
|----------|-------------|
| [Co-Management Overview](operations/co-management/00-overview.md) | 7 ConfigMgr-current-branch (CB 2503) workloads, 3 slider states, Pilot Intune disambiguation |
| [Windows Tenant Attach](operations/co-management/01-windows-tenant-attach.md) | Tenant attach (Intune-portal device sync, no workload switching) vs full co-management disambiguation |
| [Workload Slider Migration](operations/co-management/02-windows-workload-sliders.md) | Low-risk-first migration sequence; Endpoint Protection HIGH-RISK callout |

### Patch & Update Management

Cross-platform OS update enforcement -- Windows Update for Business rings, macOS managed update commands (DDM), iOS supervised vs unsupervised update lifecycle, and Android per-OEM patch delivery (Play Integrity tier impact).

| Resource | Description |
|----------|-------------|
| [Patch & Update Management Overview](operations/patch-management/00-overview.md) | 4-platform update-enforcement comparison hub (Windows + macOS + iOS + Android) |
| [Windows WUfB Rings](operations/patch-management/01-windows-wufb-rings.md) | Windows Update for Business ring topology; Hotpatch; dual-scan source conflict |
| [Android Patch Delivery](operations/patch-management/04-android-patch-delivery.md) | Per-OEM patch delivery; Play Integrity MEETS_STRONG_INTEGRITY enforcement cascade |

### App Lifecycle Automation

Cross-platform app deployment at scale -- Win32/MSIX packaging + supersedence, macOS .pkg/.dmg pipelines, iOS VPP device-vs-user licensing, Android Managed Google Play app lifecycle.

| Resource | Description |
|----------|-------------|
| [App Lifecycle Overview](operations/app-lifecycle/00-overview.md) | 4-platform app-deployment comparison hub (Windows + macOS + iOS + Android) |
| [Windows Win32 / MSIX at Scale](operations/app-lifecycle/01-windows-win32-msix-scale.md) | Win32ContentPrepTool, supersedence chains, dependency graphs, MSIX delivery |
| [Android Managed Google Play Lifecycle](operations/app-lifecycle/04-android-mgp-lifecycle.md) | MGP private track, web app publishing, AMAPI custom-apps API, OEMConfig (Zebra) |

### Compliance Drift Detection + Tenant Migration

Cross-platform configuration drift workflows + tenant-to-tenant migration runbooks -- BitLocker re-key, ABM token re-issue, Managed Google Play re-binding, cross-platform encryption-drift surface.

| Resource | Description |
|----------|-------------|
| [Drift Detection + Tenant Migration Overview](operations/drift-migration/00-overview.md) | 4-platform drift-detection + tenant-migration comparison hub |
| [Tenant Migration Runbook](operations/drift-migration/04-tenant-migration-runbook.md) | Windows BitLocker re-key + ABM token re-issue + MGP re-binding; cross-platform encryption drift section |
| [Windows Drift Detection](operations/drift-migration/01-windows-drift-detection.md) | Intune Remediations (Proactive Remediations) detect+remediate PowerShell pairs |

### Apple Business Governance

Apple Business delegated governance for sub-org admins — Shared iPad passcode reset, permission denied investigation, MDM server assignment, VPP catalog, Managed Apple Account provisioning, and cross-org boundary operations.

| Resource | Description |
|----------|-------------|
| [Apple Business Operations Overview](cross-platform/apple-business/00-overview.md) | Governance tree root; links to all 18 admin-context docs |
| [L1 #34: Shared iPad Passcode Reset](l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md) | Path A (Apple Business UI, L1-delegatable) |
| [L2 #26: Permission Denied Investigation](l2-runbooks/26-apple-business-permission-denied.md) | 7-leaf Mermaid triage tree |

---

## Cross-Platform References

| Resource | Description |
|----------|-------------|
| [Windows Autopilot Glossary](_glossary.md) | Windows Autopilot terminology ([OOBE](_glossary.md#oobe), [ESP](_glossary.md#esp), TPM, ZTD, APv1, APv2) |
| [macOS Provisioning Glossary](_glossary-macos.md) | macOS ADE terminology ([ADE](_glossary-macos.md#ade), [ABM](_glossary-macos.md#abm), Setup Assistant, Await Configuration) |
| [Android Enterprise Provisioning Glossary](_glossary-android.md) | Android Enterprise terminology (Work Profile, COBO, COPE, Zero-Touch, DPC, Managed Google Play) |
| [Windows vs macOS Concept Comparison](windows-vs-macos.md) | Platform terminology and enrollment mechanism mapping |
| [Error Code Index](error-codes/00-index.md) | Master error code lookup with deployment-mode tagging (Windows) |
| [Lifecycle Overview](lifecycle/00-overview.md) | End-to-end Windows Autopilot deployment sequence with flow diagrams |
| [APv1 vs APv2](apv1-vs-apv2.md) | Windows framework selection -- which docs apply to which mode |
| [APv2 Lifecycle Overview](lifecycle-apv2/00-overview.md) | APv2 deployment model, Enrollment Time Grouping mechanism, and automatic mode |
| [Common Provisioning Issues](common-issues.md) | Cross-platform symptom-based router to Windows and macOS L1 and L2 runbooks |
| [Reference Index](reference/00-index.md) | Infrastructure, security, migration, and monitoring references organized by sub-domain |
| [Migration Guides](reference/00-index.md#migration-guides) | APv1-to-APv2, Imaging-to-Autopilot, GPO-to-Intune migration playbooks |
| [Monitoring and Operations](reference/00-index.md#monitoring-and-operations) | Deployment reporting, drift detection, new-batch device onboarding workflow |
| [macOS Capability Matrix](reference/macos-capability-matrix.md) | Intune feature parity comparison between Windows and macOS across enrollment, configuration, apps, compliance, and updates |
| [iOS Enrollment Path Overview](ios-lifecycle/00-enrollment-overview.md) | 4-path comparison with supervision axis (ADE, Device Enrollment, Account-Driven User Enrollment, MAM-WE) |
| [iOS Capability Matrix](reference/ios-capability-matrix.md) | Intune feature parity comparison across Windows, macOS, and iOS (NAV-03) |
| [Android Provisioning Lifecycle](android-lifecycle/00-enrollment-overview.md) | Mode comparison with DPC ownership axis (BYOD / COBO / Dedicated / ZTE / AOSP) and Managed Google Play binding |
| [Android Capability Matrix](reference/android-capability-matrix.md) | Intune feature parity comparison across Windows, macOS, iOS, and Android |
| [Linux Provisioning Lifecycle](linux-lifecycle/00-enrollment-overview.md) | Ubuntu 22.04 / 24.04 LTS enrollment pipeline summary |
| [Linux Capability Matrix](reference/linux-capability-matrix.md) | Intune feature parity comparison across all 5 platforms |
| [Apple Business Governance Glossary](_glossary-apple-business.md) | Apple Business terminology; Organizational Units; Managed Apple Accounts; rebrand mapping (ABM → Apple Business 2026-04-14) |
| [Cross-Org Boundary Cheat Sheet](cross-platform/apple-business/18-cross-org-boundary-cheat-sheet.md) | Apple-Business-vs-Intune responsibility table; scope-boundary disambiguation |

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-22 | Phase 65 plan 65-03: 3 surgical edits — line-9 banner clause appendix + ### Apple Business Governance Operations sub-H3 + 2 Cross-Platform References entries (ABNAV-07) | -- |
| 2026-06-22 | Phase 81 (SSOREF-04): appended Platform SSO rows to macOS Admin Setup / L1 / L2 nav tables | -- |
| 2026-05-01 | Phase 59: appended `## Operations` H2 with 4 sub-H3 sections (Co-Management / Patch & Update Management / App Lifecycle Automation / Compliance Drift Detection + Tenant Migration) routing to operations/ sub-directories (CLEAN-08 SC#1) | -- |
| 2026-05-01 | Phase 59: appended `## Linux Provisioning` H2 with 3 sub-tables (L1=4 rows / L2=4 rows / Admin=3 rows) matching Phase 57 Android H2 structural depth (CLEAN-08 SC#1); appended Linux Provisioning Lifecycle + Linux Capability Matrix Cross-Platform References entries (D-05) | -- |
| 2026-04-30 | Phase 57: expanded Android Enterprise H2 to 3 sub-tables (L1=4 rows / L2=4 rows / Admin=3 rows) matching iOS Phase 32 structural depth (CLEAN-01); added Android Provisioning Lifecycle + Android Capability Matrix Cross-Platform References entries (DEFER-07 close) | -- |
| 2026-04-24 | Phase 42: added Android Provisioning stub H2, Choose-Your-Platform bullet, Android Glossary cross-reference entry (AEAUDIT-02) | -- |
| 2026-04-17 | Phase 32: added iOS/iPadOS Provisioning section (L1/L2/Admin Setup subsections) + Choose Your Platform third entry + trilateral H1 narrative | -- |
| 2026-04-17 | Phase 32: added iOS Capability Matrix + iOS Enrollment Path Overview Cross-Platform References entries; platform coverage updated for trilateral framing | -- |
| 2026-04-15 | Added macOS quick-reference card links to L1 and L2 tables; updated Common Issues description for cross-platform | -- |
| 2026-04-14 | Resolved Phase 24 macOS troubleshooting TBD placeholders | -- |
| 2026-04-14 | Added macOS Admin Setup links and macOS Capability Matrix to Cross-Platform References | -- |
| 2026-04-13 | Restructured for cross-platform support: added platform selector, Windows and macOS headings, macOS placeholder sections, Cross-Platform References | -- |
| 2026-04-13 | Added APv2 sections for L1 and L2, added Admin Setup section | -- |
| 2026-03-23 | Initial version | -- |
