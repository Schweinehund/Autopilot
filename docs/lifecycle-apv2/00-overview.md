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

This overview explains the Windows Autopilot Device Preparation (APv2) deployment model for Intune administrators evaluating or deploying APv2. It covers what APv2 is, how Enrollment Time Grouping (ETG) works as the core mechanism, and the key differences from APv1 (classic Autopilot). For a readiness check before deploying, see [APv2 Prerequisites Checklist](01-prerequisites.md). For the step-by-step deployment process, see [APv2 Deployment Flow](02-deployment-flow.md). For Cloud PC automatic provisioning, see [APv2 Automatic Mode](03-automatic-mode.md).

## What Is APv2 (Device Preparation)?

Windows Autopilot Device Preparation (APv2) is generally available as of **June 3, 2024** (user-driven mode). It replaces the hardware-hash pre-staging model used by APv1 with a streamlined approach built around **Enrollment Time Grouping (ETG)**.

Key characteristics of APv2:

- **No hardware hash registration required.** Devices do not need to be pre-registered with Autopilot before deployment. There is no OEM or partner pre-staging workflow.
- **No Enrollment Status Page (ESP).** APv2 does not use a separate ESP configuration. App and policy delivery is integrated directly into the Device Preparation policy.
- **Device group membership assigned at enrollment time.** When a user authenticates during OOBE, the device is added to a pre-defined security group immediately — not pre-staged by an admin or matched via hardware hash.
- **The Intune Provisioning Client** (service principal AppID: `f1346770-5b25-470b-88bd-d5744ab7952c`) must be the **owner** of the ETG device security group. This service principal performs the group membership assignment at enrollment time.

## Enrollment Time Grouping (ETG) -- The Core Mechanism

ETG is the architectural foundation that distinguishes APv2 from APv1. In APv1, devices are pre-registered with hardware hashes, assigned to dynamic groups, and the Enrollment Status Page (ESP) tracks policy and app installation. In APv2, ETG replaces all of this with a two-phase approach:

**Phase 1 -- Admin preparation (before any device enrolls):**
- Admin creates a device security group and adds the Intune Provisioning Client (AppID: `f1346770-5b25-470b-88bd-d5744ab7952c`) as the group owner.
- Admin assigns apps, scripts, and policies to this device security group.
- Admin creates a Device Preparation policy that references this device group.

**Phase 2 -- Enrollment time (when a device enrolls):**
- User authenticates during OOBE. The device joins Entra ID and enrolls in Intune.
- The Intune Provisioning Client adds the device to the ETG security group at enrollment time.
- Apps and scripts selected in the Device Preparation policy install during OOBE. Remaining apps/scripts assigned to the group (but not selected in the policy) install after the user reaches the desktop.

**Why this matters:** ETG bypasses dynamic group evaluation delays entirely. In APv1, newly enrolled devices must wait for dynamic group membership to evaluate before targeted policies apply — this can take minutes to hours. With ETG, the device is a member of the target group the moment it enrolls, so policies and apps apply immediately.

## APv2 vs APv1: Key Differences

| Feature | APv2 (Device Preparation) | APv1 (Classic Autopilot) |
|---------|---------------------------|--------------------------|
| Hardware hash pre-registration | No | Yes |
| Enrollment Status Page (ESP) | No (integrated into policy) | Yes (configured separately) |
| Pre-provisioning (white glove) | No | Yes |
| Enrollment Time Grouping (ETG) | Yes | No |
| Windows 10 support | No (Windows 11 only) | Yes |
| GCCH / DoD environments | Yes | No |

For the complete feature comparison (18+ factors), see [APv1 vs APv2 Comparison](../apv1-vs-apv2.md).

## Deployment Modes

### User-Driven (GA)

The user-driven mode is generally available and is the primary APv2 deployment method for physical devices. The user authenticates with their Entra ID credentials during OOBE, which triggers the ETG enrollment flow. The full process is a 10-step sequence from device boot to desktop access, covered in detail in [APv2 Deployment Flow (10-Step Process)](02-deployment-flow.md).

### Automatic (Preview -- Windows 365 Only)

Automatic mode is in **public preview** and applies exclusively to Windows 365 Cloud PCs. In this mode, the Cloud PC agent triggers enrollment — no user authentication occurs during OOBE. Apps and scripts install before any user signs in. This mode is not available for physical devices.

Supported Windows 365 SKUs (as of November 2025):
- Windows 365 Frontline in shared mode (preview from April 2, 2025)
- Windows 365 Enterprise (preview from November 21, 2025)
- Windows 365 Frontline in dedicated mode (preview from November 21, 2025)
- Windows 365 Cloud Apps (preview from November 21, 2025)

For full details, see [APv2 Automatic Mode (Windows 365)](03-automatic-mode.md).

## Current Limits

| Limit | Value | Notes |
|-------|-------|-------|
| Max apps selectable in Device Preparation policy | **25** | Raised from 10 on January 30, 2026 |
| Max PowerShell scripts selectable in policy | **10** | |
| Supported OS | Windows 11 22H2+ (with KB5035942), 23H2+, 24H2+ | April 2024 or later media includes the required KB |
| Windows 10 | **NOT supported** | APv2 requires Windows 11 minimum |

<details>
<summary>L2 detail: Event log location for APv2 enrollment</summary>

Event log: `Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin`

The BootstrapperAgent process manages the APv2 deployment flow on-device. Event IDs are documented in the [L2 APv2 Log Collection Guide](../l2-runbooks/apv2-log-collection.md) (Phase 14).

</details>

## See Also

- [APv2 Prerequisites Checklist](01-prerequisites.md)
- [APv2 Deployment Flow (10-Step Process)](02-deployment-flow.md)
- [APv2 Automatic Mode (Windows 365)](03-automatic-mode.md)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md)
- [APv1 Lifecycle Overview](../lifecycle/00-overview.md)

---

*Content sourced from [Microsoft Learn -- Autopilot Device Preparation Overview](https://learn.microsoft.com/en-us/autopilot/device-preparation/overview), verified April 2026.*
