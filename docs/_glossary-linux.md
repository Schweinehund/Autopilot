---
last_verified: 2026-04-26
review_by: 2026-06-25
applies_to: both
audience: all
platform: Linux
---

> **Platform coverage:** This glossary covers Linux-specific terminology for Intune-managed Ubuntu LTS devices.
> For Windows Autopilot terminology, see the [Windows Autopilot Glossary](_glossary.md). For Apple-platform terminology, see the [Apple Provisioning Glossary](_glossary-macos.md). For Android Enterprise terminology, see the [Android Enterprise Provisioning Glossary](_glossary-android.md).

# Linux Provisioning Glossary

## Alphabetical Index

[ABM (Apple Business Manager)](#abm-apple-business-manager) | [APT repository](#apt-repository) | [COBO / COPE / WPCO](#cobo--cope--wpco) | [deb (package format)](#deb-package-format) | [dm-crypt](#dm-crypt) | [dpkg](#dpkg) | [DPC (Device Policy Controller)](#dpc-device-policy-controller) | [GA kernel](#ga-kernel) | [GNOME desktop](#gnome-desktop) | [Hardware Hash](#hardware-hash) | [HWE kernel](#hwe-kernel) | [Identity Broker](#identity-broker) | [intune-agent.timer](#intune-agenttimer) | [intune-portal (package)](#intune-portal-package) | [journalctl](#journalctl) | [Linux compliance settings](#linux-compliance-settings) | [LUKS](#luks) | [Managed Google Play (MGP)](#managed-google-play-mgp) | [microsoft-identity-broker](#microsoft-identity-broker) | [MS Edge for Linux](#ms-edge-for-linux) | [packages.microsoft.com](#packagesmicrosoftcom) | [Supervision](#supervision) | [systemd](#systemd) | [Ubuntu LTS](#ubuntu-lts) | [/var/log/dpkg.log](#varlogdpkglog) | [/var/log/intune-update.log](#varlogintune-updatelog) | [VPP (Volume Purchase Program)](#vpp-volume-purchase-program) | [Web-app CA](#web-app-ca) | [Work Profile](#work-profile) | [Zero-Touch Enrollment (ZTE)](#zero-touch-enrollment-zte)

---

## Distro & Lifecycle

### APT repository

A package repository served via the Advanced Package Tool (APT) protocol that Ubuntu's `apt` client reads. The Microsoft `intune-portal` package is delivered from `packages.microsoft.com` configured as a third-party APT repository on the host. Configured by adding the Microsoft signing key + a sources.list.d entry pointing to the Microsoft repo URL.

### deb (package format)

The Debian package format used by Ubuntu and other Debian-derivative distributions. The Microsoft Intune Linux client ships exclusively as a `.deb` package (`intune-portal`); there is no snap, RPM, or AppImage distribution. Installation via `apt install intune-portal` after the Microsoft APT repository is configured.

### dm-crypt

The Linux kernel's subsystem for transparent disk encryption, providing block-device encryption via the device mapper (dm) layer. Intune compliance on Linux uses `dm-crypt` presence to evaluate Device Encryption compliance, with `/boot` and `/boot/efi` excluded from the encryption requirement.

> **Cross-platform note:** On Windows, the analog is BitLocker (drive-level encryption surfaced as a compliance signal). On macOS, the analog is FileVault (full-disk XTS-AES encryption). Android uses dm-crypt internally on some hardware but Intune does not expose Android dm-crypt as a compliance signal — see the [Android Enterprise Provisioning Glossary](_glossary-android.md). Do not conflate the platform-specific encryption surfaces.

### GA kernel

The General Availability kernel that ships with a given Ubuntu LTS release at GA time and remains the default for the entire LTS lifetime if HWE is not installed. Ubuntu 22.04 GA kernel is 5.15; Ubuntu 24.04 GA kernel is 6.8. The GA kernel is the conservative default; HWE is the rolling-update option (see [HWE kernel](#hwe-kernel)).

> **Cross-platform note:** No direct cross-platform analog. Windows / macOS / Android / iOS bundle a single OS-vendor kernel without the GA-vs-rolling distinction. The GA-vs-HWE choice is an Ubuntu-specific lifecycle concept relevant to Intune compliance because compliance evaluation may surface differently across kernel tracks (re-validate per [01-linux-prerequisites.md](linux-lifecycle/01-linux-prerequisites.md)).

### GNOME desktop

The GNOME (GNU Network Object Model Environment) graphical desktop environment, which is Ubuntu's default desktop session. The Microsoft Intune Linux client requires an interactive GNOME session for sign-in — `intune-portal` is a GUI application and headless installations cannot enroll.

### HWE kernel

The Hardware Enablement kernel — Ubuntu's rolling backported kernel track for an LTS release that pulls newer kernel versions from subsequent Ubuntu releases. Ubuntu 22.04 HWE kernel is 6.8 (backported from 24.04); Ubuntu 24.04 HWE kernel is 6.11+ (backported from 24.10/25.04). HWE provides newer hardware support; GA provides longer stability windows. See [GA kernel](#ga-kernel) for the disambiguation pair.

### LUKS

Linux Unified Key Setup — a standardized header / metadata format for `dm-crypt`-encrypted volumes. LUKS provides the on-disk format that holds passphrase / key metadata for encrypted block devices. Intune compliance treats LUKS-formatted dm-crypt volumes as the canonical Linux disk-encryption signal.

> **Cross-platform note:** On Windows, BitLocker manages key storage in TPM / recovery-key escrow. On macOS, FileVault manages key storage with iCloud / institutional escrow. LUKS has no built-in escrow surface — recovery passphrases are user-managed unless an enterprise key-management service is overlaid (out of Intune scope). See the [Apple Provisioning Glossary](_glossary-macos.md) for FileVault key-management.

### MS Edge for Linux

Microsoft Edge browser, version 102.x or later, packaged as a deb from `packages.microsoft.com`. Required for web-app Conditional Access flows on Linux because device-level CA is not available (see [Web-app CA](#web-app-ca)). The browser surfaces the Conditional Access challenge at sign-in time when the user accesses an Entra-protected web application.

### packages.microsoft.com

The Microsoft-operated APT repository host that distributes `intune-portal`, `microsoft-identity-broker`, and `microsoft-edge-stable` (and other Microsoft Linux packages). Configured as a third-party APT source on the host via the Microsoft signing key + `/etc/apt/sources.list.d/microsoft-prod.list`. The exclusive distribution channel for Intune Linux client components — these packages are NOT available via the default Ubuntu archive nor via snap.

### Ubuntu LTS

Ubuntu Long Term Support — Canonical's biennial LTS release cadence (every two years in even-year April: 20.04 / 22.04 / 24.04). Each LTS receives 5 years of standard support + optional 5 years extended via Ubuntu Pro. Microsoft Intune supports Ubuntu LTS releases per the version matrix in [01-linux-prerequisites.md](linux-lifecycle/01-linux-prerequisites.md); non-LTS interim releases (23.04, 23.10, etc.) are not supported.

## Agent & Service

### dpkg

The Debian package manager binary that performs low-level package installation, removal, and inspection on Debian-derivative distributions including Ubuntu. APT is the high-level package operations layer; dpkg is the underlying tool that APT invokes. L2 engineers query `dpkg -l intune-portal` to verify installed package version on a Linux endpoint.

### Identity Broker

The Microsoft Entra (formerly Azure Active Directory) identity broker concept on Linux — a daemon that handles Microsoft Entra token acquisition, refresh, and device-state binding for enrolled Linux endpoints. Distinct from the systemd unit name `microsoft-identity-broker` which is the OS-level service implementation; this entry covers the conceptual identity-broker layer. The v2.0.2+ rollout introduced an automatic re-enrollment behavior detailed at [linux-lifecycle/01-linux-prerequisites.md#non-version-breakpoints](linux-lifecycle/01-linux-prerequisites.md#non-version-breakpoints).

> **Cross-platform note:** The identity-broker concept exists on multiple platforms but the implementation surface differs. On macOS, the Entra broker is shipped via the Microsoft Intune Company Portal app + `IntuneMDMDaemon`. On Windows, the broker is built into the OS as the Web Account Manager (WAM). On Android, the broker is shipped via the Microsoft Authenticator app or the Microsoft Intune app. Linux is the only platform with a discrete `microsoft-identity-broker` systemd unit name.

### intune-agent.timer

The systemd `.timer` unit that schedules the periodic Intune compliance check-in cycle on a Linux endpoint. User-scoped timer (runs in the user's systemd instance, not the system instance) — verify with `systemctl --user status intune-agent.timer`. Activated post-enrollment by the `intune-portal` package; manual enable via `systemctl enable --user --now intune-agent.timer`.

> **Cross-platform note:** The check-in cycle exists on all platforms but the implementation differs. Windows uses the OMA-DM enrollment session-based check-in. macOS uses the MDM check-in cycle scheduled by `mdmclient`. iOS uses APNs-triggered MDM check-ins. Android uses the AMAPI poll cycle for AMAPI-managed devices. Linux's `intune-agent.timer` is the user-scope analog — see the platform-specific glossaries for non-Linux equivalents.

### intune-portal (package)

The Microsoft-published deb package containing the Intune Linux client GUI application and supporting components. Installed via `apt install intune-portal` after the `packages.microsoft.com` APT repository is configured. The package brings in `microsoft-identity-broker` as a dependency. Provides the GUI sign-in surface that the user interacts with at enrollment time.

> **Cross-platform note:** The "Company Portal" / "Intune Portal" naming convention applies to all platforms. On Windows, "Company Portal" is a UWP app from the Microsoft Store. On macOS / iOS, "Company Portal" is a Microsoft-published app from the Mac App Store / Apple App Store. On Android, "Company Portal" was the legacy DPC; the "Microsoft Intune" app is the current AMAPI-aligned management surface. Linux uses the `intune-portal` deb package name — slightly different naming convention; functionally analogous in role.

### microsoft-identity-broker

The systemd service unit name on Linux for the Microsoft Entra identity broker daemon. Verify via `systemctl status microsoft-identity-broker`. Installed as a dependency of `intune-portal`. See [Identity Broker](#identity-broker) for the concept-level entry.

### systemd

The Linux init system and service manager used by Ubuntu and most modern Linux distributions. Runs at PID 1; manages services (units), timers, sockets, and other system resources. Intune Linux endpoints rely on systemd for `microsoft-identity-broker` (system-scope service) and `intune-agent.timer` (user-scope timer). L2 diagnostic surface for Intune-related services is `systemctl status` and `journalctl` (see [journalctl](#journalctl)).

## Compliance & Encryption

### Linux compliance settings

The 4 categories of compliance settings exposed for Linux device-management compliance policies in the Intune settings catalog: **Allowed Distributions** (distro+version allow-list), **Custom Compliance** (Bash discovery scripts producing a compliance verdict), **Device Encryption** (dm-crypt/LUKS presence check), **Password Policy** (length / complexity / lockout). This entry is a pointer to Phase 50 LIN-04 detailed coverage at `docs/admin-setup-linux/03-compliance-policy.md`; the canonical 4-category enumeration is defined here.

> **Cross-platform note:** "Compliance" is a cross-platform Intune concept but the available settings vary substantially by platform. Windows compliance has dozens of settings-catalog categories. macOS compliance has its own broad settings catalog. iOS compliance includes jailbreak detection / OS version / encryption. Android compliance includes Play Integrity verdict + work-profile checks. Linux compliance is narrower — only the 4 categories named here. See the [Apple Provisioning Glossary](_glossary-macos.md) and [Android Enterprise Provisioning Glossary](_glossary-android.md) for non-Linux compliance term coverage.

### Web-app CA

The only Conditional Access pattern available for Linux endpoints — Microsoft Edge for Linux (102.x+) presents the Entra Conditional Access challenge at sign-in time when the user accesses an Entra-protected web application. Device-level CA grants ("Require device to be marked as compliant" applied to a CA policy targeting all client apps) are NOT available for Linux. This is the [PITFALL-2](../.planning/research/PITFALLS.md) anchor — admins designing CA flows for Linux must understand that compliance reporting exists but is not consumable by device-level CA grants.

> **Cross-platform note:** Device-level CA is available on Windows, macOS, iOS, and Android via "Require device to be marked as compliant" — none of these platforms are restricted to web-app CA. Linux is the outlier: the compliance signal exists but the CA grant surface does not consume it for non-web access. See the [Apple Provisioning Glossary — MAM-WE](_glossary-macos.md#mam-we) for the closest cross-platform pattern (iOS MAM-without-enrollment as a "compliance-lite" pattern), but the mapping is structural, not behavioral.

## Operations & Diagnostics

## Cross-Platform Collisions

## Version History
