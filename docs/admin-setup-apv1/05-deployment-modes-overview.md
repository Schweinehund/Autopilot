---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: APv1
audience: admin
---

> **Version gate:** This guide covers Windows Autopilot (classic).
> For Autopilot Device Preparation (APv2), see [APv2 Admin Setup Guides](../admin-setup-apv2/00-overview.md).
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# APv1 Deployment Modes Overview

Windows Autopilot (classic) supports three deployment modes. Each mode determines who authenticates during OOBE, whether a technician preparation step is required, and which hardware prerequisites apply. Select the mode that matches your provisioning workflow, then follow the mode-specific guide for detailed configuration steps.

## Mode Comparison

| Feature | User-Driven | Pre-Provisioning | Self-Deploying |
|---------|-------------|------------------|----------------|
| **TPM 2.0 required** | No | **Yes** | **Yes** |
| **Wired ethernet required** | No | **Yes** (technician flow) | **Yes** |
| **User credentials at OOBE** | Required | First by technician, then by user | None |
| **Hybrid join support** | Yes (Intune Connector) | Yes (Intune Connector) | **No** (no user affinity) |
| **User phase of ESP** | Yes | Yes (after reseal) | **No** |
| **Trigger key** | N/A | **Win+F12** at first OOBE screen | N/A (automatic) |
| **Technician reseals device** | No | **Yes** | No |
| **Best for** | Standard office deployments | Factory or staging facility with app pre-load | Kiosks, shared devices, digital signage |

## Mode Selection Guidance

**Start with User-Driven if:**
- Standard office deployment where end users will receive new devices
- No staging facility available — devices ship directly to users
- Hybrid Entra join required (works with Intune Connector for AD)
- Simplest setup: deploy, hand off to user, done

**Use Pre-Provisioning if:**
- IT staging facility is available with wired ethernet and TPM 2.0 devices
- You want device apps and policies fully applied before the device ships to the user
- Acceptable to have a technician phase (Entra join + device ESP) followed by a user phase (user ESP) after reseal
- All devices meet TPM 2.0 and physical ethernet requirements

**Use Self-Deploying if:**
- Shared device, kiosk, or digital signage scenario — no user sign-in required
- Device has no primary user (device joins as a device object only)
- TPM 2.0 and wired ethernet available at the deployment location
- Note: hybrid Entra join is **not supported** in self-deploying mode

## Common OOBE Profile Settings (All Modes)

The following settings apply across all three deployment modes. They are configured in the deployment profile (see [Deployment Profile](02-deployment-profile.md)) and take effect during OOBE regardless of mode:

| Setting | What it controls |
|---------|-----------------|
| **Microsoft Software License Terms** | Show or hide the EULA screen |
| **Privacy settings** | Show or hide privacy consent screen |
| **Language (Region)** | Pre-select or let user choose |
| **Automatically configure keyboard** | Skip or show keyboard layout selection |
| **Apply device name template** | Apply naming convention (Entra join only; max 15 chars; supports `%SERIAL%` and `%RAND:x%`) |

## Mode-Specific Configuration Guides

Each mode has a dedicated admin guide covering prerequisites, step-by-step configuration, and the "what breaks" callouts specific to that mode:

- [User-Driven Mode](06-user-driven.md) — Standard deployment where the end user authenticates during OOBE
- [Pre-Provisioning Mode](07-pre-provisioning.md) — Technician prepares the device in a staging facility before it ships to the user
- [Self-Deploying Mode](08-self-deploying.md) — Fully automated, no user interaction required; for shared devices and kiosks

## See Also

- [OOBE lifecycle stage](../lifecycle/03-oobe.md) — how the OOBE and ESP phases work end-to-end
- [Deployment Profile](02-deployment-profile.md) — configure the deployment profile that selects the mode
- [ESP Policy](03-esp-policy.md) — configure the Enrollment Status Page policy
- [Dynamic Groups](04-dynamic-groups.md) — assign the correct profile to the correct devices
- [APv1 vs APv2](../apv1-vs-apv2.md) — framework comparison and selection guide

---

*Next step: [User-Driven Mode](06-user-driven.md)*
