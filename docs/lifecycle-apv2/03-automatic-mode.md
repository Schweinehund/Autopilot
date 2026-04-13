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

Automatic mode is a distinct deployment mode within Windows Autopilot Device Preparation (APv2) — it is not a variant of user-driven mode. Automatic mode is scoped exclusively to Windows 365 Cloud PC provisioning.

In automatic mode, the Windows 365 Cloud PC agent triggers enrollment — no user authentication occurs during OOBE. Apps and scripts install before any user signs in, ensuring the Cloud PC is fully configured at first user login.

> **Preview:** This section describes preview functionality. Behavior may change before general availability.

## Supported Windows 365 SKUs

| SKU | Preview Since |
|-----|---------------|
| Windows 365 Frontline in shared mode | April 2, 2025 |
| Windows 365 Enterprise | November 21, 2025 |
| Windows 365 Frontline in dedicated mode | November 21, 2025 |
| Windows 365 Cloud Apps | November 21, 2025 |

**GCCH/DoD exception:** Windows 365 Frontline in shared mode is NOT supported in GCCH and DoD environments. All other SKUs listed above are supported in GCCH and DoD.

> **Preview:** SKU availability and support matrix may change. Check [What's New in Windows Autopilot Device Preparation](https://learn.microsoft.com/en-us/autopilot/device-preparation/whats-new) for updates.

## How Automatic Mode Differs from User-Driven

- **No user authentication during OOBE** — the Cloud PC agent triggers enrollment automatically.
- **Policy is included in the Windows 365 Cloud PC provisioning policy** — it is not a standalone Device Preparation policy assignment.
- **Apps and scripts install before any user signs in** — the Cloud PC is fully configured at first user login.
- **Console status progression:** Provisioning -> Preparing (during APv2) -> Provisioned.

## The 9-Step Automatic Deployment Process

1. **Windows 365 Cloud PC agent creates the Cloud PC.**
2. **Cloud PC agent joins Microsoft Entra.**
3. **Cloud PC agent triggers Intune enrollment.**
4. **Cloud PC agent calls the Device Preparation policy;** configuration is applied.
5. **IME installs** — the Intune Management Extension is deployed to the Cloud PC.
6. **MDM sync** — LOB/M365 apps are checked; MDM policies sync (but are not individually tracked). If this step fails, the deployment status shows **"Failed"** at phase **"Policy installation"**.
7. **LOB/M365 apps install.** If this step fails, the deployment status shows **"Failed"** at phase **"Apps installation"**.
8. **PowerShell scripts run.** If this step fails, the deployment status shows **"Failed"** at phase **"Scripts installation"**.
9. **Win32, Microsoft Store, Enterprise App Catalog apps install.** If this step fails, the deployment status shows **"Failed"** at phase **"Apps installation"**.

> **Preview:** The automatic deployment process and failure status labels are preview functionality and may change before GA.

## Current Limits

| Resource | Limit |
|----------|-------|
| Essential apps (LOB, M365, Win32, Store, EAC) | Up to 25 |
| Essential PowerShell scripts | Up to 10 |

> **Preview:** Limits may change before GA. The app limit was raised from 10 to 25 in January 2026.

## Admin Setup Workflow (6 Steps)

The following is a high-level orientation of the admin setup process. For detailed configuration steps, see the [APv2 Admin Setup Guide](../admin-setup-apv2/00-overview.md).

1. **Set up Windows automatic Intune enrollment** — configure MDM scope in Microsoft Entra.
2. **Create an assigned device group** — this group receives apps, scripts, and policies.
3. **Assign applications and PowerShell scripts to device group** — target the apps and scripts that must install during provisioning.
4. **Create Windows Autopilot Device Preparation policy** — select "Automatic" as the deployment mode.
5. **Create a Cloud PC provisioning policy** — link the Device Preparation policy to the Windows 365 provisioning policy.
6. **Monitor the deployment** — track provisioning status in the Intune admin center (Provisioning -> Preparing -> Provisioned).

> For detailed configuration steps, see the [APv2 Admin Setup Guide](../admin-setup-apv2/00-overview.md).

## See Also

- [APv2 Overview](00-overview.md)
- [APv2 User-Driven Deployment Flow](02-deployment-flow.md)
- [APv2 Prerequisites](01-prerequisites.md)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md)
- [APv1 Lifecycle Overview](../lifecycle/00-overview.md)

---

*Content sourced from [Microsoft Learn — APv2 Automatic Mode Workflow](https://learn.microsoft.com/en-us/autopilot/device-preparation/tutorial/automatic/automatic-workflow), verified April 2026.*
