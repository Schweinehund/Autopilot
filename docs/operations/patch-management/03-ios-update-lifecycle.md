---
last_verified: 2026-04-28
review_by: 2026-06-27
applies_to: all
audience: admin
platform: iOS
---

> **Platform applicability:** This guide is iOS/iPadOS-specific (DDM update policies;
> unsupervised iOS 17+ retraction effective Aug 2025). For the cross-platform overview, see
> [Patch Management Overview](00-overview.md).
> **Windows:** See [Windows WUfB Rings](01-windows-wufb-rings.md).
> **macOS:** See [macOS DDM Update Enforcement](02-macos-update-enforcement.md).
> **Android:** See [Android Patch Delivery](04-android-patch-delivery.md).

# iOS Update Lifecycle: DDM-Based Enforcement

This guide is the iOS/iPadOS-specific patch and update lifecycle reference. It covers the
**Declarative Device Management (DDM)** update keys configured via Intune Apple update policies
(Intune > Devices > Apple updates > iOS/iPadOS update policies) and the August 2025 retraction
of the prior supervised-only-DDM constraint — DDM update enforcement now works on **unsupervised**
iOS 17+ devices.

For the cross-platform comparison, see [Patch Management Overview](00-overview.md). For macOS
DDM (the related Apple platform), see [macOS DDM Update Enforcement](02-macos-update-enforcement.md).

## iOS Update Enforcement Model

iOS update enforcement uses **DDM (Declarative Device Management)** as the canonical mechanism for
iOS 17 and later. The DDM update model differs from legacy MDM update commands:

- **Declarative:** The MDM server (Intune) declares the target version + enforcement deadline; the
  OS itself enforces installation. The server does NOT push an explicit install command per device.
- **Per-device assertion:** Each enrolled device receives a DDM update assertion describing the
  required iOS version and deadline.
- **OS-managed user notification:** The OS displays update prompts to the user per the DDM
  assertion's grace-period configuration. The user cannot defer past the declared deadline.

Configuration path: **Intune > Devices > Apple updates > iOS/iPadOS update policies > Create**.
Profile uses the DDM update keys enumerated in [DDM Update Keys](#ddm-update-keys) below.

**Eligibility:** iOS 17.0 and later. Earlier iOS versions cannot receive DDM update enforcement;
they continue to use legacy MDM device-restriction "Defer software updates" (supervised-only) and
the legacy `ScheduleOSUpdate` MDM command. Both legacy mechanisms are being deprecated by Apple.

## DDM Update Keys {#ddm-update-keys}

The DDM iOS update assertion uses four basic keys to declare the enforcement target:

| Key | Type | Description |
|-----|------|-------------|
| `TargetOSVersion` | string | Required iOS version (e.g. `18.2`). The device must reach this version by `TargetLocalDateTime`. |
| `TargetBuildVersion` | string | Required build version (e.g. `22C152`). Used when a specific build is required (rare; typically used for security-fix tracking). Optional if `TargetOSVersion` is present. |
| `TargetLocalDateTime` | string (ISO 8601 local) | Hard deadline for the device to be on `TargetOSVersion`. Format: `YYYY-MM-DDTHH:MM:SS` (device-local time). |
| `OfferPrograms` | array | Optional. Lists update programs offered to the user (developer beta, public beta, etc.). Default empty (production updates only). |

The Intune Apple update policy blade exposes these as form fields. The underlying DDM assertion
JSON shows the four keys directly when inspected via Intune Configuration Audit logs.

**Minimum required keys:** `TargetOSVersion` + `TargetLocalDateTime`. The other two are optional
qualifiers.

## Supervised-Only Retraction (Effective August 2025)

The DDM iOS update enforcement model originally constrained DDM update keys to **supervised**
devices only (Apple Configurator, Apple Business Manager / Apple School Manager auto-enrolled
devices). That constraint has been retracted as of August 2025.

> ⚠️ **August 2025 retraction:** As of August 2025, the basic DDM update keys (TargetOSVersion,
> TargetBuildVersion, TargetLocalDateTime, OfferPrograms) work on **unsupervised** iOS 17+
> devices — the prior supervised-only constraint has been retracted. Both ADE-supervised and
> Device-Enrollment-unsupervised iOS 17+ devices can now receive DDM update enforcement.

**Implications for BYOD fleets:** Tenants enrolling iOS devices via User Enrollment (BYOD) or
Device Enrollment (corporate-owned non-supervised) can now apply DDM update enforcement —
previously they would have been gated on the supervised-only constraint and forced to use legacy
MDM `ScheduleOSUpdate` (now deprecated).

**Implications for documentation:** This guide formally retracts the v1.3 supervised-only-DDM
callout that previously appeared in `docs/admin-setup-ios/07-device-enrollment.md:35` (now
corrected to reflect DDM-on-unsupervised). Cross-references from iOS admin-setup content forward
here as the canonical iOS update enforcement reference.

## Supervision Matrix: DDM Update Enforcement

| Enrollment Type | Supervision | Pre-Aug-2025 | Post-Aug-2025 |
|-----------------|-------------|--------------|---------------|
| ADE / Apple Business Manager | Supervised | ✅ DDM update enforcement | ✅ DDM update enforcement |
| ADE / Apple School Manager | Supervised | ✅ DDM update enforcement | ✅ DDM update enforcement |
| Device Enrollment (corporate, non-supervised) | Unsupervised | ❌ DDM blocked | ✅ DDM update enforcement |
| User Enrollment (BYOD) | Unsupervised | ❌ DDM blocked | ✅ DDM update enforcement |
| Account-driven Device Enrollment | Unsupervised | ❌ DDM blocked | ✅ DDM update enforcement |

**Forward-compatibility note:** The supervised-only constraint retraction is part of Apple's
broader move toward DDM as the canonical update enforcement primitive. Tenants planning long-term
update enforcement should standardize on DDM regardless of supervision state. Legacy MDM
`ScheduleOSUpdate` (the pre-DDM enforcement primitive) is being deprecated and may be removed in
future iOS releases.

## Rollout Patterns

Admins typically deploy iOS DDM update policies via Intune in three rollout stages:

1. **Pilot ring (devices in pilot Azure AD group):** TargetLocalDateTime = +14 days from policy
   assignment. Validate update success rate before promotion.
2. **Broad ring (production fleet):** TargetLocalDateTime = +30 days from major iOS release.
   Standard cadence for non-security-critical updates.
3. **Critical ring (security-driven):** TargetLocalDateTime = +7 days. Used when Apple ships an
   urgent security update (RSR — Rapid Security Response — for example).

Pre-Aug-2025 these rings could only contain supervised devices. Post-Aug-2025 the same rings can
include unsupervised BYOD and corporate-non-supervised devices. The DDM assertion does not
distinguish supervision state in the assertion payload itself.

## Related Resources

- [Patch Management Overview](00-overview.md) — Cross-platform comparison + Ring Terminology hub
- [Windows WUfB Rings](01-windows-wufb-rings.md) — Windows forward path
- [macOS DDM Update Enforcement](02-macos-update-enforcement.md) — Related Apple-platform DDM guide
- [Android Patch Delivery](04-android-patch-delivery.md) — Android attestation gate

## External References

- [Software Updates Guide for iOS/iPadOS (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/protect/software-updates-guide-ios-ipados)
- [iOS Device Restrictions (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/protect/device-restrictions-ios)
- [DDM Software Update (Apple Developer)](https://developer.apple.com/documentation/devicemanagement/softwareupdateenforcement)
- [Apple Platform Deployment — Software Update](https://support.apple.com/guide/deployment/software-update-management-depc4c80847a/web)
