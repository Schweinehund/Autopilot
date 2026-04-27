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
