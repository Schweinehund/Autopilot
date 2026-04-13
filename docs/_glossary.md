---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: all
platform: all
---

> **Framework coverage:** This glossary covers terminology for both Windows Autopilot (classic/APv1) and Autopilot Device Preparation (APv2).
> Terms specific to one framework are labeled. See [APv1 vs APv2](apv1-vs-apv2.md) for framework selection.
> For macOS provisioning terminology (ADE, ABM, Setup Assistant), see the [macOS Provisioning Glossary](_glossary-macos.md).

# Autopilot Glossary

## Alphabetical Index

[APv1](#apv1) | [APv2](#apv2) | [Autopilot Reset](#autopilot-reset) | [BootstrapperAgent](#bootstrapperagent) | [Corporate identifiers](#corporate-identifiers) | [Device phase](#device-phase) | [Device Preparation policy](#device-preparation-policy) | [Enrollment Time Grouping (ETG)](#enrollment-time-grouping-etg) | [ESP](#esp) | [Firmware TPM (fTPM)](#firmware-tpm-ftpm) | [FirstSync](#firstsync) | [Hardware hash](#hardware-hash) | [Hybrid join](#hybrid-join) | [Intune Management Extension (IME)](#intune-management-extension-ime) | [Intune Provisioning Client](#intune-provisioning-client) | [MDM](#mdm) | [MDM enrollment](#mdm-enrollment) | [NCSI](#ncsi) | [ODJ](#odj) | [OOBE](#oobe) | [Pre-provisioning](#pre-provisioning) | [SCP](#scp) | [Secure Boot](#secure-boot) | [Self-deploying mode](#self-deploying-mode) | [TPM](#tpm) | [TPM attestation](#tpm-attestation) | [User phase](#user-phase) | [User-driven mode](#user-driven-mode) | [White glove](#white-glove) | [WinHTTP proxy](#winhttp-proxy) | [ZTDID](#ztdid) | [ZTD](#ztd)

---

## Enrollment

### OOBE

Out-of-Box Experience — the first-run setup screens a device presents after power-on, before a user profile exists.

### ESP

Enrollment Status Page — the progress screen during Autopilot provisioning that blocks desktop access until required apps and policies are applied (APv1 only).

> **APv2 note:** APv2 does not use ESP. See [Enrollment Time Grouping (ETG)](#enrollment-time-grouping-etg) for the APv2 equivalent mechanism.

### MDM

Mobile Device Management — the protocol and service (Intune) used to push policies, apps, and configuration to enrolled devices.

### MDM enrollment

The process by which a device registers itself with the MDM service and begins receiving policies.

### FirstSync

The ESP device-phase checkpoint tracked at `HKLM:\SOFTWARE\Microsoft\Enrollments\{GUID}\FirstSync` that signals server provisioning is complete.

### Autopilot Reset

An APv1 feature that re-runs the OOBE provisioning flow on an already-deployed device without re-imaging.

### BootstrapperAgent

A component of the Intune Management Extension (IME) that orchestrates APv2 Device Preparation provisioning on-device. Writes events to the `Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin` event log with structured event ID ranges (1xxx deployment, 2xxx Entra, 3xxx enrollment, 4xxx IME, 5xxx apps, 6xxx scripts, 9xxx errors).

> **APv2 only.** No direct APv1 equivalent. See [APv2](#apv2), [Intune Management Extension (IME)](#intune-management-extension-ime).

### Enrollment Time Grouping (ETG)

The core APv2 mechanism that replaces APv1 hardware hash pre-staging and ESP. A two-phase model: the admin creates a security group owned by the [Intune Provisioning Client](#intune-provisioning-client); at enrollment time, the device is added to the group automatically, enabling policy and app delivery during the deployment experience.

> **APv2 only.** Replaces the role of both [hardware hash](#hardware-hash) registration (device pre-staging) and [ESP](#esp) (policy/app delivery tracking) in APv1. See also: [Device Preparation policy](#device-preparation-policy).

### Intune Management Extension (IME)

The Intune agent component responsible for executing PowerShell scripts, Win32 apps, and custom compliance scripts on Windows devices. In APv2, the IME hosts the [BootstrapperAgent](#bootstrapperagent) that orchestrates the Device Preparation deployment experience. Log folder: `C:\ProgramData\Microsoft\IntuneManagementExtension\Logs`.

> **Both frameworks.** Used by both APv1 and APv2. In APv2, the IME is the primary agent for the deployment experience.

### Intune Provisioning Client

The Entra service principal (AppID: `f1346770-5b25-470b-88bd-d5744ab7952c`) that must be added as an owner of the [ETG](#enrollment-time-grouping-etg) security group. Also known as "Intune Autopilot ConfidentialClient." This service principal adds devices to the ETG group during enrollment.

> **APv2 only.** See [Enrollment Time Grouping (ETG)](#enrollment-time-grouping-etg).

---

## Hardware

### Hardware hash

A 4K-byte device fingerprint derived from hardware identifiers, used by APv1 to match a physical device to its Autopilot profile before OOBE.

> **APv2 note:** APv2 does not require hardware hash registration. See [Enrollment Time Grouping (ETG)](#enrollment-time-grouping-etg) and [corporate identifiers](#corporate-identifiers) for APv2 alternatives.

### ZTD

Zero Touch Deployment — Microsoft's internal codename for Windows Autopilot; also the prefix for the deployment service endpoint (`ztd.dds.microsoft.com`) and device identifier (ZTDID).

### ZTDID

Zero Touch Device ID — the unique identifier assigned to a device when it is registered in the Autopilot service.

### TPM

Trusted Platform Module — the hardware security chip that stores cryptographic keys and performs attestation; required for self-deploying and pre-provisioning modes.

### TPM attestation

The process by which a device proves its TPM identity to Microsoft's attestation service during pre-provisioning.

### Firmware TPM (fTPM)

A TPM implemented in processor firmware (Intel, AMD, Qualcomm) rather than a discrete chip; requires manufacturer certificate retrieval on first use.

### Corporate identifiers

Device identifiers (serial number, manufacturer, model) uploaded to Intune to mark devices as corporate-owned at enrollment time. Used in APv2 as an alternative to hardware hash registration for enrollment restriction scenarios.

> **APv2 primarily.** APv1 equivalent: [hardware hash](#hardware-hash) (both identify devices as corporate-owned, but hardware hash is required for APv1 profile assignment while corporate identifiers are optional for APv2 enrollment restrictions).

---

## Network

### WinHTTP proxy

The system-level HTTP proxy configuration used by Windows services during OOBE (before user-level proxy settings apply).

### NCSI

Network Connection Status Indicator — the Windows component that tests internet reachability via `*.msftconnecttest.com`.

---

## Security

### Secure Boot

A UEFI firmware feature that verifies the bootloader's digital signature, required for TPM attestation.

### SCP

Service Connection Point — an Active Directory object that tells Azure AD Connect which tenant to use for hybrid join.

---

## Deployment Modes

### APv1

Windows Autopilot (classic) — the original deployment framework requiring hardware hash pre-staging and supporting all deployment modes.

See also: [APv1 vs APv2 disambiguation](apv1-vs-apv2.md).

### APv2

Windows Autopilot Device Preparation — the newer framework (Windows 11 22H2+) that removes hardware hash requirements and simplifies provisioning.

See also: [APv1 vs APv2 disambiguation](apv1-vs-apv2.md).

### Device Preparation policy

The central APv2 configuration object in Intune that defines deployment settings, OOBE customization, apps and scripts to install during enrollment, and the [ETG](#enrollment-time-grouping-etg) device group reference. Created in the Intune admin center under Devices > Windows > Enrollment > Device Preparation policies.

> **APv2 only.** APv1 equivalent: Autopilot deployment profile (different scope -- the deployment profile controls OOBE settings while the Device Preparation policy also controls app/script installation). See [APv1](#apv1).

### User-driven mode

An Autopilot deployment mode where the end user signs in with their Azure AD credentials during OOBE to trigger provisioning.

### Self-deploying mode

An APv1 deployment mode for userless devices (kiosks, shared devices) that provisions using TPM attestation with no user interaction.

### Pre-provisioning

An APv1 deployment mode (formerly "white glove") where a technician or OEM pre-stages device-side provisioning before shipping to the end user.

### White glove

The deprecated name for pre-provisioning; renamed in 2021. See [Pre-provisioning](#pre-provisioning).

### Hybrid join

An Azure AD join type where the device is simultaneously joined to on-premises Active Directory and registered in Azure AD.

### ODJ

Offline Domain Join — the mechanism used during hybrid Autopilot to join a device to on-premises AD without requiring direct DC connectivity during OOBE.

### Device phase

The first half of ESP that applies device-targeted apps and policies before any user logs in.

### User phase

The second half of ESP (after user login) that applies user-targeted apps and policies.
