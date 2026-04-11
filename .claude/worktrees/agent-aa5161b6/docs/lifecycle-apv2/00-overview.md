---
last_verified: 2026-04-11
review_by: 2026-07-10
applies_to: APv2
audience: admin
---

> **Version gate:** This guide covers Windows Autopilot Device Preparation (APv2).
> For Windows Autopilot (classic), see [Autopilot Lifecycle Overview](../lifecycle/00-overview.md).
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# APv2: Windows Autopilot Device Preparation Overview

## How to Use This Guide

This overview explains the Windows Autopilot Device Preparation (APv2) deployment model for Intune administrators evaluating or implementing APv2. It covers what APv2 is, how Enrollment Time Grouping (ETG) works, and how APv2 differs from APv1 at a high level. For a readiness check before deploying, see [APv2 Prerequisites Checklist](01-prerequisites.md). For the step-by-step deployment process, see [APv2 Deployment Flow (10-Step Process)](02-deployment-flow.md). For Cloud PC provisioning with no user interaction, see [APv2 Automatic Mode (Windows 365)](03-automatic-mode.md).

## What Is APv2 (Device Preparation)?

Windows Autopilot Device Preparation (APv2) is generally available as of June 3, 2024 (user-driven mode). It replaces the hardware-hash pre-staging model used in Windows Autopilot (classic/APv1) with a fundamentally different approach called Enrollment Time Grouping (ETG).

Key characteristics of APv2:

- **No hardware hash registration required.** Devices do not need to be pre-registered in the Autopilot service. There is no OEM or partner pre-staging step.
- **No Enrollment Status Page (ESP).** APv2 does not use a separate ESP configuration. App and policy delivery is integrated directly into the Device Preparation policy.
- **Enrollment Time Grouping (ETG).** At enrollment time, the device is added to a pre-defined security group. Apps, scripts, and policies assigned to that group are delivered during OOBE. This replaces the APv1 model of pre-staging devices into groups before enrollment.
- **Intune Provisioning Client ownership.** The Intune Provisioning Client (service principal AppID: `f1346770-5b25-470b-88bd-d5744ab7952c`) must be the owner of the ETG device security group. This service principal performs the group membership assignment at enrollment time.

## Enrollment Time Grouping (ETG) -- The Core Mechanism

ETG is the architectural difference that separates APv2 from APv1. In APv1, devices are pre-registered with hardware hashes and assigned to groups before enrollment -- dynamic group membership evaluation can introduce delays. In APv2, group membership is assigned at the moment of enrollment, eliminating those delays entirely.

**How ETG works:**

- **Phase 1 (Admin setup):** The administrator creates a device security group, assigns apps, scripts, and policies to that group, and creates a Device Preparation policy that references the group. The Intune Provisioning Client (AppID: `f1346770-5b25-470b-88bd-d5744ab7952c`) must be added as an owner of this device security group.

- **Phase 2 (Enrollment):** When a user authenticates during OOBE, the device joins Microsoft Entra ID and enrolls in Intune. At enrollment, the Intune Provisioning Client adds the device to the ETG security group. Apps and scripts selected in the Device Preparation policy (up to 25 apps and 10 scripts) install during OOBE. Remaining apps and scripts assigned to the group but not selected in the policy deploy after the user reaches the desktop.

**Why this matters:** ETG bypasses dynamic group evaluation delays entirely. The device receives its apps and policies during OOBE without waiting for group membership to propagate through Entra ID dynamic group rules.

## APv2 vs APv1: Key Differences

| Feature | APv2 (Device Preparation) | APv1 (Classic) |
|---------|--------------------------|----------------|
| Hardware hash pre-registration | No | Yes |
| Enrollment Status Page (ESP) | No (integrated into policy) | Yes (configured separately) |
| Pre-provisioning (white glove) | No | Yes |
| Enrollment Time Grouping (ETG) | Yes | No |
| Windows 10 support | No | Yes |
| GCCH / DoD support | Yes | No |

For the complete feature comparison, see [APv1 vs APv2 Comparison](../apv1-vs-apv2.md).

## Deployment Modes

### User-Driven (GA)

The user-driven mode is generally available. The user powers on the device, connects to a network, and authenticates with Microsoft Entra credentials during OOBE. The device joins Entra ID, enrolls in Intune, and the ETG mechanism delivers apps and policies. The full 10-step process is covered in [APv2 Deployment Flow (10-Step Process)](02-deployment-flow.md).

### Automatic (Preview -- Windows 365 Only)

Automatic mode is in public preview and applies exclusively to Windows 365 Cloud PCs. The Cloud PC agent triggers enrollment without user interaction during OOBE. Apps and scripts install before any user signs in. This mode is covered in [APv2 Automatic Mode (Windows 365)](03-automatic-mode.md).

## Current Limits

| Limit | Value | Notes |
|-------|-------|-------|
| Max apps selectable in Device Preparation policy | 25 | Raised from 10 on January 30, 2026 |
| Max PowerShell scripts selectable in policy | 10 | |
| Supported OS | Windows 11 22H2+ (with KB5035942), Windows 11 23H2+, Windows 11 24H2+ | |
| Windows 10 | NOT supported | Hard OS gate -- APv2 policy is ignored on Windows 10 |

<details>
<summary>L2 detail: Event log location for APv2 enrollment</summary>

Event log: `Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin`

The BootstrapperAgent process manages the APv2 deployment flow on-device. Event IDs are documented in the [L2 APv2 Log Collection Guide](../runbooks-l2/apv2-log-collection.md) (Phase 14).

</details>

## See Also

- [APv2 Prerequisites Checklist](01-prerequisites.md)
- [APv2 Deployment Flow (10-Step Process)](02-deployment-flow.md)
- [APv2 Automatic Mode (Windows 365)](03-automatic-mode.md)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md)
- [APv1 Lifecycle Overview](../lifecycle/00-overview.md)

---

*Content sourced from [Microsoft Learn -- Autopilot Device Preparation Overview](https://learn.microsoft.com/en-us/autopilot/device-preparation/overview), verified April 2026.*
