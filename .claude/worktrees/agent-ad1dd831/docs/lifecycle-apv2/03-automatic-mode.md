---
last_verified: 2026-04-11
review_by: 2026-07-10
applies_to: APv2
audience: admin
---

> **Preview:** APv2 Automatic mode is in **public preview**. It applies ONLY to Windows 365 Cloud PCs.
> It does NOT apply to physical devices or standard APv2 user-driven deployments.
> Preview features may change before general availability.

> **Version gate:** This guide covers Windows Autopilot Device Preparation (APv2) — Automatic mode.
> For APv2 user-driven mode, see [APv2 Deployment Flow](02-deployment-flow.md).
> For Windows Autopilot (classic), see [Autopilot Lifecycle Overview](../lifecycle/00-overview.md).
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# APv2 Automatic Mode (Windows 365)

## Overview

Automatic mode is a distinct deployment mode within APv2 — it is not a variant of user-driven deployment. It is scoped exclusively to Windows 365 Cloud PC provisioning. In automatic mode, the Cloud PC agent triggers enrollment rather than a user authenticating during OOBE. Apps and scripts install before any user signs in, making the Cloud PC ready for use on first user connection.

> **Preview:** This section describes preview functionality. Behavior may change before general availability.

## Supported Windows 365 SKUs

| SKU | Preview Since |
|-----|---------------|
| Windows 365 Frontline in shared mode | April 2, 2025 |
| Windows 365 Enterprise | November 21, 2025 |
| Windows 365 Frontline in dedicated mode | November 21, 2025 |
| Windows 365 Cloud Apps | November 21, 2025 |

**GCCH/DoD exception:** Windows 365 Frontline in shared mode is NOT supported in GCCH and DoD environments. All other SKUs listed above are supported in GCCH and DoD.

> **Preview:** SKU availability and support matrix may change. Check [What's New in Autopilot Device Preparation](https://learn.microsoft.com/en-us/autopilot/device-preparation/whats-new) for updates.

## How Automatic Mode Differs from User-Driven

| Aspect | User-Driven | Automatic |
|--------|-------------|-----------|
| Enrollment trigger | User authenticates during OOBE | Cloud PC agent triggers enrollment |
| Policy location | Standalone Device Preparation policy | Included in Windows 365 Cloud PC provisioning policy |
| App install timing | After user authentication | Before any user signs in |
| Console status progression | N/A | Provisioning -> Preparing (during APv2) -> Provisioned |
| Applicable devices | Physical devices + Cloud PCs | Windows 365 Cloud PCs only |

## The 9-Step Automatic Deployment Process

1. **Windows 365 Cloud PC agent creates the Cloud PC.**
2. **Cloud PC agent joins Microsoft Entra.**
3. **Cloud PC agent triggers Intune enrollment.**
4. **Cloud PC agent calls the Device Preparation policy; configuration is applied.**
5. **IME installs.**
6. **MDM sync:** LOB/M365 apps checked; policy synced (not tracked). Failure = **"Failed"** at phase **"Policy installation"**.
7. **LOB/M365 apps install.** Failure = **"Failed"** at phase **"Apps installation"**.
8. **PowerShell scripts run.** Failure = **"Failed"** at phase **"Scripts installation"**.
9. **Win32, Microsoft Store, Enterprise App Catalog apps install.** Failure = **"Failed"** at phase **"Apps installation"**.

For steps 6-9, the failure status label shown in bold is what appears in the Windows 365 management console when that step fails. Use these labels to identify which phase of the automatic deployment encountered an error.

> **Preview:** The automatic deployment process and failure status labels may change before general availability.

## Current Limits

| Resource | Limit |
|----------|-------|
| Essential apps selectable in policy | 25 (raised from 10 on January 30, 2026) |
| Essential PowerShell scripts selectable in policy | 10 |

> **Preview:** Limits may change before GA. The app limit was raised from 10 to 25 in January 2026.

## Admin Setup Workflow (6 Steps)

This is a high-level orientation of the admin setup process for automatic mode. For detailed configuration steps, see the APv2 Admin Setup Guide (Phase 15).

1. **Set up Windows automatic Intune enrollment** — Configure MDM scope in Microsoft Entra ID.
2. **Create an assigned device group** — This is the ETG security group with the Intune Provisioning Client as owner.
3. **Assign applications and PowerShell scripts to device group** — Target the apps and scripts to the ETG group.
4. **Create Windows Autopilot Device Preparation policy** — Select "Automatic" as the deployment mode.
5. **Create a Cloud PC provisioning policy** — Include the Device Preparation policy in the Windows 365 provisioning policy.
6. **Monitor the deployment** — Track provisioning status in the Windows 365 management console.

For detailed configuration steps, see the APv2 Admin Setup Guide (Phase 15).

## See Also

- [APv2 Overview](00-overview.md)
- [APv2 User-Driven Deployment Flow](02-deployment-flow.md)
- [APv2 Prerequisites](01-prerequisites.md)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md)
- [APv1 Lifecycle Overview](../lifecycle/00-overview.md)

---

*Content sourced from [Microsoft Learn — APv2 Automatic Mode Workflow](https://learn.microsoft.com/en-us/autopilot/device-preparation/tutorial/automatic/automatic-workflow), verified April 2026.*
