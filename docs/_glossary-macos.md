---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: all
platform: all
---

> **Platform coverage:** This glossary covers macOS-specific provisioning and management terminology.
> For Windows Autopilot terminology, see the [Windows Autopilot Glossary](_glossary.md).

# macOS Provisioning Glossary

## Alphabetical Index

[ABM](#abm) | [ABM Token](#abm-token) | [ADE](#ade) | [Await Configuration](#await-configuration) | [Setup Assistant](#setup-assistant) | [VPP](#vpp)

---

## Enrollment

### ADE

Automated Device Enrollment -- Apple's zero-touch enrollment mechanism for organization-owned macOS (and iOS/iPadOS) devices through Apple Business Manager. Devices assigned to an MDM server in ABM enroll automatically during Setup Assistant. Formerly known as DEP (Device Enrollment Program).

> **Windows equivalent:** [Windows Autopilot](_glossary.md#apv1) -- APv1 uses hardware hash registration and profile assignment; APv2 uses [Enrollment Time Grouping](_glossary.md#enrollment-time-grouping-etg). Both achieve zero-touch enrollment but use different identity mechanisms (serial number via ABM vs hardware hash upload to Intune).

### Await Configuration

A setting in the macOS ADE enrollment profile (officially "Await final configuration") that locks the device at the end of Setup Assistant until Intune confirms critical configuration policies are installed. The user sees an "Awaiting final configuration" screen. Default for new enrollment profiles since late 2024.

> **Windows equivalent:** [ESP](_glossary.md#esp) (Enrollment Status Page) -- both block the user from accessing the desktop until policies and apps are applied. Key difference: ESP has explicit device-phase and user-phase stages, while Await Configuration is a single hold point at the end of Setup Assistant.

### Setup Assistant

The macOS first-run configuration experience presented after power-on or device wipe. Screens are customizable (show or hide) via the ADE enrollment profile in Intune. Includes Apple-specific screens such as Apple ID, FileVault, Siri, and Privacy.

> **Windows equivalent:** [OOBE](_glossary.md#oobe) (Out-of-Box Experience) -- both are the first-run setup flow on their respective platforms. OOBE has Autopilot-specific branding and Entra credential entry; Setup Assistant has Apple-specific screens and supports both modern (Entra) and legacy authentication.

---

## Device Management

### ABM

Apple Business Manager -- Apple's web portal for managing device enrollment, app distribution (Apps and Books), and Managed Apple IDs for organizations. ABM is the single Apple-side portal for all device management administration. Accessed at [business.apple.com](https://business.apple.com).

> **Windows equivalent:** No direct single equivalent. Device enrollment is managed in the [Intune admin center](https://intune.microsoft.com) under Devices > Windows > Enrollment. ABM is Apple-side while Intune is Microsoft-side; macOS admins work across both portals.

### ABM Token

The server token (.p7m file) downloaded from Apple Business Manager that enables communication between Intune and ABM for device sync and enrollment profile deployment. Also called "enrollment program token" or "ADE token" in Microsoft documentation. Must be renewed annually -- a lapsed token silently stops new device syncing.

> **Windows equivalent:** No equivalent. Windows Autopilot uses Graph API and direct Intune integration without a separate token file. The annual renewal lifecycle of the ABM token is a macOS-unique operational concern.

---

## App Distribution

### VPP

Volume Purchase Program -- Apple's bulk app licensing mechanism, now branded as "Apps and Books" within Apple Business Manager. Licenses are purchased in ABM and synced to Intune via a location token. Enables silent app installation on supervised devices without Apple ID sign-in on the device.

> **Windows equivalent:** Microsoft Store for Business (deprecated) and Intune app deployment. Windows uses Win32 app packaging (.intunewin), MSI, MSIX, and Microsoft Store apps. The VPP/Apps and Books licensing model has no direct Windows equivalent.

---

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-13 | Initial version -- 6 macOS terms with Windows cross-references | -- |
