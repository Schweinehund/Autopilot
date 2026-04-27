---
last_verified: 2026-04-26
review_by: 2026-06-25
applies_to: both
audience: all
platform: Linux
---

# Linux Device Management Enrollment Overview

> **Platform gate:** This guide covers Microsoft Intune device management for Ubuntu LTS Linux endpoints (22.04 / 24.04). For Windows Autopilot, see [Autopilot Lifecycle Overview](../lifecycle/00-overview.md). For macOS ADE, see [macOS ADE Lifecycle](../macos-lifecycle/00-ade-lifecycle.md). For iOS/iPadOS, see [iOS/iPadOS Enrollment Overview](../ios-lifecycle/00-enrollment-overview.md). For Android Enterprise, see [Android Enrollment Overview](../android-lifecycle/00-enrollment-overview.md). For Linux terminology, see the [Linux Provisioning Glossary](../_glossary-linux.md). For prerequisites and version matrix, see [Linux Intune Client Prerequisites](01-linux-prerequisites.md).

## How to Use This Guide

This document is the canonical capability gate for Linux device management in Microsoft Intune. Read it as follows based on your role:

- **Admins (planning Linux rollout):** Start at [Supported Management Surface](#supported-management-surface) to confirm what Linux can and cannot do via Intune; then read [Out of Scope for Linux via Intune](#out-of-scope-for-linux-via-intune) for explicit exclusions; then proceed to [Linux Intune Client Prerequisites](01-linux-prerequisites.md) for distro / kernel / hardware gates.
- **L2 engineers (investigating Linux failures):** Read [Enrollment Constraints](#enrollment-constraints) for the BYOD vs corporate-owned framing caveat; cross-reference the [Linux Provisioning Glossary](../_glossary-linux.md) for terminology used in L2 runbooks.
- **L1 responders (triaging Linux tickets):** Skim [Supported Management Surface](#supported-management-surface) for the high-level capability table; defer detailed troubleshooting to L1 runbooks shipped in Phase 51.
- **Admins coming from Windows / macOS / Android:** Read [For Admins Familiar with Windows / macOS / Android](#for-admins-familiar-with-windows--macos--android) for cross-platform mental-model bridges, but treat each bridge as a partial mapping only — Linux's capability surface is genuinely narrower than the other four platforms.

## Supported Management Surface

The following table is the canonical Linux capability whitelist. Status cells use a closed 3-string set: **Supported**, **Partial**, or **Not supported**. Cells that warrant additional locked phrasing carry the qualifier inline (e.g., the Conditional Access row reads `Not supported — web-app CA only` per the PITFALL-2 architectural callout requirement).

| Capability | Linux Status |
|---|---|
| Device enrollment (user-initiated via `intune-portal`) | Supported |
| Compliance policies (4 settings-catalog categories) | Partial |
| Conditional Access — device-level | Not supported — web-app CA only |
| App delivery — Bash custom scripts | Supported |
| App delivery — binary packages (deb / snap / Win32 analog) | Not supported |
| Configuration profiles (settings catalog beyond compliance) | Not supported |
| Declarative Device Management (DDM) | Not supported |
| Zero-touch enrollment (Autopilot / ADE / ZTE analog) | Not supported |
| Hybrid Entra Join | Not supported |
| Certificate profiles (SCEP / PKCS) | Not supported |
| Per-app VPN | Not supported |
| OS update enforcement (DDM / WUfB analog) | Not supported |
| Hardware attestation (TPM / DeviceCheck analog) | Not supported |

**Status string contract:** This 3-status set (`Supported` / `Partial` / `Not supported`) is the canonical contract inherited by `docs/reference/linux-capability-matrix.md` (Phase 50 LIN-13). No additional status strings may be introduced downstream — `check-phase-49.mjs` enforces the closed set per CDI-01.

## Out of Scope for Linux via Intune

The following capabilities are explicitly NOT in scope for Linux device management in Microsoft Intune. This list is the inverse of [Supported Management Surface](#supported-management-surface) — these items are documented as exclusions so admins do not search for them in downstream Phase 50-52 content.

- **Non-Ubuntu distributions (RHEL / Rocky / Alma / Debian / SUSE / Fedora):** Ubuntu LTS only per project scope; RHEL 9/10 deferred to v1.6+.
- **Ubuntu Server / IoT / headless devices:** The Microsoft Intune Linux client requires GNOME graphical desktop + interactive sign-in; headless workloads are unsupported.
- **App delivery via deb / snap packages:** Intune does not deliver `.deb` packages; app delivery is Bash-script-based only. There is no Win32 / MSI / MSIX / `.pkg` analog for Linux.
- **Configuration profiles beyond compliance:** Linux has no MDM configuration profile concept in Intune. Compliance policies + Bash custom scripts are the only configuration mechanisms.
- **Snap-based Intune agent delivery:** The agent is delivered as `intune-portal` deb from `packages.microsoft.com`. There is no snap distribution.
- **Device-level Conditional Access:** The "Require device to be marked as compliant" CA grant is not available for Linux. Only web-app CA via Microsoft Edge for Linux is supported (see the Supported Management Surface CA row).
- **Zero-touch enrollment / Autopilot / ADE / Android ZTE analog:** No reseller-driven pre-provisioning surface exists for Linux. Enrollment is exclusively user-initiated.
- **Hybrid Entra Join:** Linux does not participate in Hybrid Entra Join. Devices are Entra-joined directly via the `intune-portal` enrollment flow.
- **Hardware attestation (TPM / DeviceCheck analog):** No hardware-backed attestation surface for Linux device compliance.
- **Certificate profiles (SCEP / PKCS):** Linux compliance does not consume certificate-deployment profiles.
- **OS update enforcement:** No DDM / WUfB / managed-update analog. OS patching is host-managed (`apt`).
- **Localization / non-English content:** Consistent with project-wide English-only policy.

## Enrollment Constraints

Linux enrollment in Intune is exclusively user-initiated via the `intune-portal` GUI on Ubuntu LTS desktops. There is no zero-touch / pre-provisioning / corporate-owned automation pathway. The capability table above (Supported Management Surface) is capability-pure; the conceptual constraint about ownership-model framing lives here in its own H2 because it is a documentation-and-policy concern rather than a capability gap.

### BYOD vs Corporate-Owned Caveat

> ⚠️ **Known caveat:** Microsoft Learn documentation for Linux device management uses the BYOD vs corporate-owned framing inconsistently across pages. Some Microsoft Learn pages describe Linux Intune enrollment as a BYOD path; other pages describe it as appropriate for corporate-owned Linux workstations. **In practice, both ownership models share the same enrollment mechanism** (user-initiated `intune-portal` install + sign-in). There is no API, MDM payload, or compliance setting that distinguishes a BYOD Linux device from a corporate-owned Linux device in Intune. Admins designing CA / compliance / asset-tracking flows should treat all Linux enrollments as a single ownership category and rely on Entra group membership, device tagging, or upstream procurement records for ownership classification — not on Intune's enrollment-time framing.

This caveat is a documentation-framing artifact, not a product behavior gap. The capability whitelist in [Supported Management Surface](#supported-management-surface) is the authoritative scope; this H3 records the framing inconsistency so admins do not architect compliance policies that assume Intune knows the difference.

## For Admins Familiar with Windows / macOS / Android

Cross-platform mental-model bridges below help admins onboarding from a different platform locate where Linux resembles their existing experience. Each bridge is a **partial mapping only** — Linux's capability surface is narrower than the other four platforms in concrete, structural ways. Treat the analogies as orientation cues, not feature-parity claims.

**For Windows admins:** Enrollment on Linux behaves like Windows BYOD MDM enrollment in the narrow respect that the user signs in to a portal app to bind the device, but the mapping is partial — there is no Autopilot / hardware-hash zero-touch path, no Group Policy / settings-catalog configuration profiles beyond compliance, and Conditional Access for Linux is web-app-only (no device-level CA equivalent to the "Require device to be marked as compliant" grant). See [Supported Management Surface](#supported-management-surface) for the canonical Linux scope.

**For macOS admins:** The `intune-portal` agent on Linux behaves like the macOS Intune management extension in the narrow respect that both run as a user-space service brokering device-state signals to Intune, but the mapping is partial — there is no ADE / Bootstrap Token / SCEP analog on Linux, no Setup Assistant / Awaiting Configuration flow, and Linux compliance covers only 4 settings-catalog categories versus macOS's broader settings catalog. See [Supported Management Surface](#supported-management-surface) for the canonical Linux scope.

**For Android admins:** Linux compliance reporting behaves like Android Enterprise compliance reporting in the narrow respect that both produce a compliant / non-compliant device-state signal Intune can consume, but the mapping is partial — there is no DPC concept on Linux, no Managed Google Play app distribution surface, no work-profile container, no dedicated (COSU / kiosk) mode, and no Play Integrity attestation analog. See [Supported Management Surface](#supported-management-surface) for the canonical Linux scope.

## See Also

- [Linux Intune Client Prerequisites](01-linux-prerequisites.md) — Ubuntu version matrix (20.04 / 22.04 / 24.04), GA vs HWE kernel breakpoints, hardware/software prerequisites, Identity Broker non-version breakpoint
- [Linux Provisioning Glossary](../_glossary-linux.md) — ~20 Linux-native terms (`intune-portal`, `microsoft-identity-broker`, `journalctl`, `dm-crypt`, `LUKS`, `HWE kernel`, `GA kernel`, etc.) plus 9 absent-concept callout entries (Supervision, DPC, Work Profile, MGP, ZTE, VPP, Hardware Hash, ABM, COBO/COPE/WPCO)
- [Autopilot Lifecycle Overview](../lifecycle/00-overview.md) — Windows analog
- [macOS ADE Lifecycle](../macos-lifecycle/00-ade-lifecycle.md) — macOS analog
- [iOS/iPadOS Enrollment Overview](../ios-lifecycle/00-enrollment-overview.md) — iOS analog
- [Android Enrollment Overview](../android-lifecycle/00-enrollment-overview.md) — Android analog

> **Note for Phase 50 plan authors (DPO-03):** Do not duplicate the cross-platform bridge subsection above in `docs/admin-setup-linux/00-overview.md`. Phase 50 overview back-links to the Phase 49 anchor [#for-admins-familiar-with-windows--macos--android](#for-admins-familiar-with-windows--macos--android) instead. Anti-Pattern 1 (single-canonical-doc) discipline per Phase 34 D-26.
