---
doc_id: RE-081
status: Approved
owner: Intune Admin Lead
doc_type: Guide
platform: Windows
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: APv1
audience: admin
---

**Platform:** Windows · **Doc Type:** Guide · **Doc ID:** RE-081 · **Status:** Approved

# APv1 Deployment Modes Overview

## Summary

This guide covers the three Windows Autopilot (APv1) deployment modes -- User-Driven, Pre-Provisioning, and Self-Deploying -- and applies to Windows devices configured by an admin holding the Intune Administrator role. It compares hardware requirements, network dependencies, and user-experience differences across the three modes so an admin can select the mode that matches their provisioning workflow before following the mode-specific configuration guide.

> **Version gate:** This guide covers Windows Autopilot (classic).

> For Autopilot Device Preparation (APv2), see [APv2 Admin Setup Guides](../admin-setup-apv2/00-overview.md).
> For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

Windows Autopilot (classic) supports three deployment modes. Choose the mode that matches your provisioning workflow, then follow the mode-specific guide for detailed configuration.

## Mode Comparison

| Feature | User-Driven | Pre-Provisioning | Self-Deploying |
|---------|-------------|------------------|----------------|
| **TPM 2.0 required** | No | **Yes** | **Yes** |
| **Wired ethernet required** | No | **Yes (technician flow)** | **Yes** |
| **User credentials at OOBE** | Required | First by technician, then user | None |
| **Hybrid Entra join support** | Yes (Intune Connector) | Yes (Intune Connector) | **No** |
| **User phase of ESP** | Yes | Yes (after reseal) | **No** |
| **User affinity** | Yes | Yes | **No** |
| **Trigger key** | N/A | **Win+F12** at first OOBE screen | N/A (automatic) |
| **Technician reseals device** | No | Yes | No |
| **Best for** | Standard office deployments | Factory/staging facility | Kiosks, shared devices, signage |

## Mode Selection Guidance

- **Start with User-Driven** if: standard office deployment, no staging facility available, hybrid join needed without complexity. This is the most common mode.
- **Use Pre-Provisioning** if: IT staging facility available, you want devices ready before shipping to users, TPM 2.0 and wired ethernet are available in staging.
- **Use Self-Deploying** if: shared device or kiosk scenario, no user affinity needed, device has TPM 2.0 and wired ethernet at the deployment location.

## Common OOBE Profile Settings

These settings apply to all deployment modes and are configured in the deployment profile (see [Deployment Profile](02-deployment-profile.md)):

- Microsoft Software License Terms (EULA): Show or Hide
- Privacy settings: Show or Hide
- Language/Region selection: Pre-configure or let user select
- Automatically configure keyboard: Yes or No (requires ethernet)
- Apply device name template: Yes or No (Entra join only, 15 character limit)

## Mode-Specific Configuration Guides

Follow the guide for your selected deployment mode:

- **[User-Driven Mode](06-user-driven.md)** -- Standard deployment where the end user authenticates during OOBE
- **[Pre-Provisioning Mode](07-pre-provisioning.md)** -- Technician prepares the device before the user receives it
- **[Self-Deploying Mode](08-self-deploying.md)** -- Fully automated deployment requiring zero user interaction

## See Also

- [OOBE Lifecycle Stage](../lifecycle/03-oobe.md)
- [Deployment Profile Configuration](02-deployment-profile.md)
- [APv1 vs APv2 Comparison](../apv1-vs-apv2.md)

---
*Next step: [User-Driven Mode](06-user-driven.md)*

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-07-05 | v1.15 EEE reformat — content not re-reviewed | — |