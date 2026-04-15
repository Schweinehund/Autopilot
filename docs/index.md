---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: all
platform: all
---

> **Platform coverage:** This index covers Windows Autopilot (classic/APv1 and Device Preparation/APv2) and macOS ADE provisioning.
> Not sure which framework applies? See [APv1 vs APv2](apv1-vs-apv2.md) for Windows or [Windows vs macOS](windows-vs-macos.md) for cross-platform.

# Device Provisioning Documentation

Troubleshooting, investigation, and setup guides for Windows Autopilot and macOS ADE deployments. Choose your platform below, then follow the path for your role.

## Choose Your Platform

- [Windows Autopilot](#windows-autopilot) -- Windows device provisioning via Autopilot (classic/APv1) and Device Preparation (APv2)
- [macOS Provisioning](#macos-provisioning) -- macOS device provisioning via Automated Device Enrollment (ADE) through Apple Business Manager
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

### Desktop Engineering (L2)

| Resource | When to Use |
|----------|-------------|
| [macOS ADE Lifecycle](macos-lifecycle/00-ade-lifecycle.md) | End-to-end enrollment stages with behind-the-scenes technical detail |
| [macOS Terminal Commands Reference](reference/macos-commands.md) | Look up diagnostic commands (profiles, log show, system_profiler, IntuneMacODC) |
| [macOS Log Paths Reference](reference/macos-log-paths.md) | Find log file locations, unified log subsystems, and configuration profile paths |
| [Network Endpoints Reference](reference/endpoints.md#macos-ade-endpoints) | Required Apple and Microsoft URLs for ADE enrollment with test commands |
| [macOS Log Collection Guide](l2-runbooks/10-macos-log-collection.md) | Collect macOS diagnostic logs using IntuneMacODC and Terminal commands |
| [macOS L2 Runbooks](l2-runbooks/00-index.md#macos-ade-runbooks) | Investigation guides for profile delivery, app install, and compliance evaluation failures |

### Admin Setup

| Resource | When to Use |
|----------|-------------|
| [macOS ADE Lifecycle](macos-lifecycle/00-ade-lifecycle.md) | Review the enrollment pipeline before configuring ABM and Intune |
| [Network Endpoints Reference](reference/endpoints.md#macos-ade-endpoints) | Verify firewall rules for all required ADE endpoints |
| [macOS Admin Setup Guides](admin-setup-macos/00-overview.md) | ABM configuration, enrollment profiles, configuration profiles, app deployment, compliance policies |

---

## Cross-Platform References

| Resource | Description |
|----------|-------------|
| [Windows Autopilot Glossary](_glossary.md) | Windows Autopilot terminology ([OOBE](_glossary.md#oobe), [ESP](_glossary.md#esp), TPM, ZTD, APv1, APv2) |
| [macOS Provisioning Glossary](_glossary-macos.md) | macOS ADE terminology ([ADE](_glossary-macos.md#ade), [ABM](_glossary-macos.md#abm), Setup Assistant, Await Configuration) |
| [Windows vs macOS Concept Comparison](windows-vs-macos.md) | Platform terminology and enrollment mechanism mapping |
| [Error Code Index](error-codes/00-index.md) | Master error code lookup with deployment-mode tagging (Windows) |
| [Lifecycle Overview](lifecycle/00-overview.md) | End-to-end Windows Autopilot deployment sequence with flow diagrams |
| [APv1 vs APv2](apv1-vs-apv2.md) | Windows framework selection -- which docs apply to which mode |
| [APv2 Lifecycle Overview](lifecycle-apv2/00-overview.md) | APv2 deployment model, Enrollment Time Grouping mechanism, and automatic mode |
| [Common Issues Index](common-issues.md) | Symptom-based router to L1 and L2 runbooks |
| [Reference Index](reference/00-index.md) | Infrastructure, security, migration, and monitoring references organized by sub-domain |
| [Migration Guides](reference/00-index.md#migration-guides) | APv1-to-APv2, Imaging-to-Autopilot, GPO-to-Intune migration playbooks |
| [Monitoring and Operations](reference/00-index.md#monitoring-and-operations) | Deployment reporting, drift detection, new-batch device onboarding workflow |
| [macOS Capability Matrix](reference/macos-capability-matrix.md) | Intune feature parity comparison between Windows and macOS across enrollment, configuration, apps, compliance, and updates |

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-14 | Resolved Phase 24 macOS troubleshooting TBD placeholders | -- |
| 2026-04-14 | Added macOS Admin Setup links and macOS Capability Matrix to Cross-Platform References | -- |
| 2026-04-13 | Restructured for cross-platform support: added platform selector, Windows and macOS headings, macOS placeholder sections, Cross-Platform References | -- |
| 2026-04-13 | Added APv2 sections for L1 and L2, added Admin Setup section | -- |
| 2026-03-23 | Initial version | -- |
