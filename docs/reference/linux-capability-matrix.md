---
last_verified: 2026-04-27
review_by: 2026-06-26
applies_to: both
audience: admin
platform: Linux
---

# Intune: Linux vs Windows Capability Matrix

This document compares Intune management capabilities between Windows (Autopilot v1, Autopilot v2, manual enrollment) and Linux (Ubuntu 22.04 LTS, Ubuntu 24.04 LTS — `intune-portal` deb client). Linux Intune management is structurally narrower than Windows; this matrix quantifies the gaps and provides a Cross-Platform Equivalences section attributing the closest Apple/Android analogs for each Linux capability.

For Linux admin setup guides, see [Linux Admin Setup Overview](../admin-setup-linux/00-overview.md). For the locked Linux management surface (whitelist) and out-of-scope callouts, see [Linux Enrollment Overview](../linux-lifecycle/00-enrollment-overview.md#supported-management-surface) — this matrix EXTENDS the whitelist with bilateral comparison; it does not duplicate the whitelist.

## Enrollment

| Feature | Windows | Linux |
|---------|---------|-------|
| Zero-touch / autopilot enrollment | Windows Autopilot v1/v2 (Pre-Provisioning, USB profiles, OOBE flows) | Not supported |
| Hybrid Entra Join | Supported (AD + Entra Connect; AAD-joined dual-state) | Not supported |
| User-initiated MDM enrollment | Supported (Settings > Accounts > Access work or school) | Supported (intune-portal app sign-in; user-initiated only) |
| BYOD enrollment | Supported (per ABM/Entra-bound flows) | Partial — see [BYOD vs Corporate-Owned Caveat](../linux-lifecycle/00-enrollment-overview.md#enrollment-constraints) |

## Configuration

| Feature | Windows | Linux |
|---------|---------|-------|
| MDM configuration profiles (Settings Catalog) | Supported (extensive — thousands of CSP-mapped settings) | Not supported — Linux has no MDM configuration profile concept in Intune |
| Custom configuration via scripts | Supported (Win32 / PowerShell / Intune Remediations) | Partial — Bash scripts run via app-delivery surface; settings-catalog Custom Compliance for compliance-detect only |
| OEMConfig | n/a (Windows uses ADMX) | Not supported |
| Hardware/firmware policies | Supported (driver/firmware updates via WUfB) | Not supported |

## App Deployment

| Feature | Windows | Linux |
|---------|---------|-------|
| Binary package delivery | Supported (Win32 .intunewin, MSIX, MSI, Microsoft Store) | Not supported — script-based only (no Win32/MSIX/.pkg analog; no .deb direct delivery) |
| Script-based delivery | Supported (PowerShell scripts, Intune Remediations) | Supported (Bash scripts; org-authored install logic; Intune handles delivery + exit-code reporting) |
| Microsoft Store apps | Supported (Microsoft Store for Business retired; current Microsoft Store integration) | Not supported |
| App supersedence + dependency graphs | Supported (Win32 supersedence, max 10 superseding; max 100 dependencies) | Not supported |

## Compliance

| Feature | Windows | Linux |
|---------|---------|-------|
| Built-in compliance settings | Supported (extensive — TPM, BitLocker, OS version, AV, Firewall, etc.) | Partial — 4 settings-catalog categories (Allowed Distributions / Custom Compliance / Device Encryption / Password Policy) |
| Custom compliance scripts | Supported (PowerShell discovery scripts) | Supported (Bash discovery scripts) |
| Compliance enforcement (CA grant) | Supported via `Require device to be marked as compliant` | Not supported — see [Conditional Access](#conditional-access) |
| Compliance reporting | Supported | Supported (detect-only on Linux) |

## Software Updates

| Feature | Windows | Linux |
|---------|---------|-------|
| Update enforcement | Supported (Windows Update for Business rings; Autopatch; Hotpatch) | Not supported — Intune does not orchestrate apt updates |
| Driver/firmware updates | Supported (separately from quality/feature) | Not supported |
| Update scheduling | Supported (deferral periods, deadlines) | Not supported — apt update timing is unmanaged |

## Conditional Access

| Feature | Windows | Linux |
|---------|---------|-------|
| Device-based CA (`Require device to be marked as compliant`) | Supported | Not supported — web-app CA only |
| Web-app CA via Edge | Supported | Supported (Microsoft Edge for Linux 102.x+) |
| MAM (Managed App without enrollment) | n/a (Windows uses Intune client) | Not supported (no Intune SDK for Linux apps; closest analog is web-app CA via Edge — see [Cross-Platform Equivalences](#cross-platform-equivalences)) |
| Risk-based CA | Supported (Entra ID Protection signals) | Partial — risk evaluation works for the user/session but does not factor Linux device state |

## Cross-Platform Equivalences

This section maps three Linux↔Apple capability pairs called out in ROADMAP SC#4. It is NOT a 4-platform comparison — see Phase 58's [4-Platform Capability Comparison](4-platform-capability-comparison.md) (when shipped) for that. Each paired row attributes the platform explicitly on both sides; mappings are STRUCTURAL, not behavioral (per Phase 49 PITFALL-1 partial-mapping discipline at `_glossary-linux.md` line 84 and 112).

| Linux | macOS / iOS |
|-------|-------------|
| **Linux `intune-portal` deb + `microsoft-identity-broker` systemd unit** | **macOS Microsoft Intune Company Portal app + IntuneMDMDaemon LaunchAgent** |
| Linux ships the [`intune-portal` package](../_glossary-linux.md#intune-portal-package) (org-installed via apt from packages.microsoft.com) plus the [`microsoft-identity-broker`](../_glossary-linux.md#microsoft-identity-broker) systemd unit (system-scope) for Entra ID broker tokens; user-scope check-in runs via [`intune-agent.timer`](../_glossary-linux.md#intune-agenttimer). Pairing is structural — both deliver client-side enrollment + token broker. Note: the Linux side has DISTINCT system-scope (broker) and user-scope (timer) components; the macOS side combines roles into the user-scope LaunchAgent. | macOS uses the Microsoft Intune Company Portal app (user-installed) plus the IntuneMDMDaemon LaunchAgent (user-scope) for the equivalent role. See also [`mam-we`](../_glossary-macos.md#mam-we) for the related per-app pattern. |

| Linux | iOS |
|-------|-----|
| **Linux `intune-agent.timer` user-scope check-in** | **iOS APNs-triggered MDM check-in cycle** |
| The [`intune-agent.timer`](../_glossary-linux.md#intune-agenttimer) is a user-scope systemd timer that wakes the agent on a schedule to re-evaluate compliance and pull new policies. Pairing is structural — both are "device-side schedule on which compliance is re-evaluated". The transport mechanism diverges: Linux is timer-poll; iOS is [APNs-push](../_glossary-macos.md#apns) (Apple Push Notification service). | iOS receives APNs push notifications that trigger an MDM check-in to fetch new commands and report state. |

| Linux | iOS |
|-------|-----|
| **Linux web-app CA (Microsoft Edge for Linux 102.x+)** | **iOS MAM-WE (Managed App Without Enrollment)** |
| Linux's only CA enforcement vehicle is the [web-app CA pattern](../_glossary-linux.md#web-app-ca) — Edge presents the CA challenge for org web-app sign-ins. Both Linux web-app CA and iOS [MAM-WE](../_glossary-macos.md#mam-we) deliver org-data protection without device-level CA enforceability — that is the LIN-13-named "compliance-lite" pattern. The mapping is STRUCTURAL, not behavioral. Architectural divergence: Linux web-app CA is BROWSER-CHALLENGE (per-session token at sign-in); iOS MAM-WE is APP-LAYER selective-wipe (per-app data containerization without device-level MDM). | iOS MAM-WE delivers managed-app data protection (selective wipe, copy/paste restrictions) on devices NOT enrolled in Intune MDM. |

## Key Gaps Summary

The most significant capability gaps for Linux compared to Windows are:

1. **App delivery is script-based only** — the largest operational gap. Linux has no Win32, MSIX, MSI, or .pkg analog. There is no binary package delivery pipeline, no app supersedence, and no dependency graph support. Organizations must author Bash scripts that invoke system package managers (`apt`) or vendor-provided installers. Script exit-code reporting is the only delivery feedback mechanism; Intune does not parse package manager output.

2. **No device-level Conditional Access** — Linux compliance state is visible in the Intune admin center but the `Require device to be marked as compliant` CA grant control is not available on Linux. The only enforcement path is web-app CA via Microsoft Edge for Linux 102.x+, which challenges the user at org web-app sign-in time. Device-level CA (enforcing on all client apps, including native/thick clients) cannot be achieved on Linux.

3. **No MDM configuration profile concept** — The Intune Settings Catalog for Linux exposes only 4 compliance-category settings (Allowed Distributions, Custom Compliance, Device Encryption, Password Policy). There is no equivalent to the thousands of CSP-mapped Windows Settings Catalog entries. OEMConfig, ADMX ingestion, and hardware/firmware policy are absent. Configuration management on Linux is out-of-band from Intune (org-managed scripts, configuration management tools, standard OS package management).

4. **Software updates are unmanaged by Intune** — Intune does not orchestrate `apt` updates on Linux. Windows Update for Business rings, Autopatch, and Hotpatch have no Linux equivalent. Update scheduling, enforcement, and deferral are outside Intune's management surface. Organizations must use OS-native update mechanisms (unattended-upgrades, cron-apt, Landscape, Ansible, etc.).

5. **No zero-touch enrollment** — Windows Autopilot v1 and v2 (hardware hash registration, Pre-Provisioning, OOBE flows) have no Linux equivalent. Linux enrollment is user-initiated only: the end user installs the `intune-portal` deb package and signs in interactively. Hybrid Entra Join (AD + Entra Connect dual-state) is not supported on Linux.

6. **BYOD vs corporate-owned ambiguity** — Unlike Windows (which has distinct Autopilot, hybrid join, and BYOD MDM-enrollment flows) and iOS/Android (which have well-defined supervised/COBO vs personal-device flows), Linux has a single user-initiated enrollment model. The distinction between "corporate-owned Linux" and "BYOD Linux" is partially ambiguous; see the [BYOD vs Corporate-Owned Caveat](../linux-lifecycle/00-enrollment-overview.md#enrollment-constraints) in Phase 49's enrollment overview for the full scope boundary.

## See Also

- [Linux Admin Setup Overview](../admin-setup-linux/00-overview.md)
- [Linux Enrollment Overview](../linux-lifecycle/00-enrollment-overview.md) — Phase 49 management-surface whitelist + out-of-scope callouts
- [Linux Prerequisites](../linux-lifecycle/01-linux-prerequisites.md) — Ubuntu version matrix
- [Linux Provisioning Glossary](../_glossary-linux.md)
- [macOS Capability Matrix](macos-capability-matrix.md) — Win|macOS bilateral comparison
- [iOS Capability Matrix](ios-capability-matrix.md)
- [Android Capability Matrix](android-capability-matrix.md)
- [4-Platform Capability Comparison](4-platform-capability-comparison.md) — when Phase 58 ships

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-27 | Initial version — Linux capability matrix Win\|Linux bilateral; 6 domain H2s with CA elevated; 3-pair Cross-Platform Equivalences (Phase 50) | -- |
