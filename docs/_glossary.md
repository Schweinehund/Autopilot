---
last_verified: 2026-03-11
review_by: 2026-06-09
applies_to: both
audience: both
---

> **Version gate:** This guide applies to Windows Autopilot (classic). For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](apv1-vs-apv2.md).

# Autopilot Glossary

## Alphabetical Index

[APv1](#apv1) | [APv2](#apv2) | [Autopilot Reset](#autopilot-reset) | [Device phase](#device-phase) | [ESP](#esp) | [Firmware TPM (fTPM)](#firmware-tpm-ftpm) | [FirstSync](#firstsync) | [Hardware hash](#hardware-hash) | [Hybrid join](#hybrid-join) | [MDM](#mdm) | [MDM enrollment](#mdm-enrollment) | [NCSI](#ncsi) | [ODJ](#odj) | [OOBE](#oobe) | [Pre-provisioning](#pre-provisioning) | [SCP](#scp) | [Secure Boot](#secure-boot) | [Self-deploying mode](#self-deploying-mode) | [TPM](#tpm) | [TPM attestation](#tpm-attestation) | [User phase](#user-phase) | [User-driven mode](#user-driven-mode) | [White glove](#white-glove) | [WinHTTP proxy](#winhttp-proxy) | [ZTDID](#ztdid) | [ZTD](#ztd)

---

## Enrollment

### OOBE

Out-of-Box Experience — the first-run setup screens a device presents after power-on, before a user profile exists.

### ESP

Enrollment Status Page — the progress screen during Autopilot provisioning that blocks desktop access until required apps and policies are applied (APv1 only).

<!-- See also: lifecycle/overview.md (Phase 2 — path will resolve in Phase 2) -->

### MDM

Mobile Device Management — the protocol and service (Intune) used to push policies, apps, and configuration to enrolled devices.

### MDM enrollment

The process by which a device registers itself with the MDM service and begins receiving policies.

### FirstSync

The ESP device-phase checkpoint tracked at `HKLM:\SOFTWARE\Microsoft\Enrollments\{GUID}\FirstSync` that signals server provisioning is complete.

<!-- See also: lifecycle/esp-phases.md (Phase 2 — path will resolve in Phase 2) -->

### Autopilot Reset

An APv1 feature that re-runs the OOBE provisioning flow on an already-deployed device without re-imaging.

---

## Hardware

### Hardware hash

A 4K-byte device fingerprint derived from hardware identifiers, used by APv1 to match a physical device to its Autopilot profile before OOBE.

### ZTD

Zero Touch Deployment — Microsoft's internal codename for Windows Autopilot; also the prefix for the deployment service endpoint (`ztd.dds.microsoft.com`) and device identifier (ZTDID).

### ZTDID

Zero Touch Device ID — the unique identifier assigned to a device when it is registered in the Autopilot service.

### TPM

Trusted Platform Module — the hardware security chip that stores cryptographic keys and performs attestation; required for self-deploying and pre-provisioning modes.

<!-- See also: lifecycle/tpm-attestation.md (Phase 2 — path will resolve in Phase 2) -->

### TPM attestation

The process by which a device proves its TPM identity to Microsoft's attestation service during pre-provisioning.

### Firmware TPM (fTPM)

A TPM implemented in processor firmware (Intel, AMD, Qualcomm) rather than a discrete chip; requires manufacturer certificate retrieval on first use.

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

### User-driven mode

An Autopilot deployment mode where the end user signs in with their Azure AD credentials during OOBE to trigger provisioning.

<!-- See also: lifecycle/user-driven.md (Phase 2 — path will resolve in Phase 2) -->

### Self-deploying mode

An APv1 deployment mode for userless devices (kiosks, shared devices) that provisions using TPM attestation with no user interaction.

<!-- See also: lifecycle/self-deploying.md (Phase 2 — path will resolve in Phase 2) -->

### Pre-provisioning

An APv1 deployment mode (formerly "white glove") where a technician or OEM pre-stages device-side provisioning before shipping to the end user.

<!-- See also: lifecycle/pre-provisioning.md (Phase 2 — path will resolve in Phase 2) -->

### White glove

The deprecated name for pre-provisioning; renamed in 2021. See [Pre-provisioning](#pre-provisioning).

### Hybrid join

An Azure AD join type where the device is simultaneously joined to on-premises Active Directory and registered in Azure AD.

<!-- See also: lifecycle/hybrid-join.md (Phase 2 — path will resolve in Phase 2) -->

### ODJ

Offline Domain Join — the mechanism used during hybrid Autopilot to join a device to on-premises AD without requiring direct DC connectivity during OOBE.

### Device phase

The first half of ESP that applies device-targeted apps and policies before any user logs in.

<!-- See also: lifecycle/esp-phases.md (Phase 2 — path will resolve in Phase 2) -->

### User phase

The second half of ESP (after user login) that applies user-targeted apps and policies.

<!-- See also: lifecycle/esp-phases.md (Phase 2 — path will resolve in Phase 2) -->

---

> **Note:** This glossary covers structural and process terms. Error-code-specific terms will be added in Phase 3.
