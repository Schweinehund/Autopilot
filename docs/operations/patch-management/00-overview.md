---
last_verified: 2026-08-21
review_by: 2026-10-20
applies_to: all
audience: admin
platform: cross-platform
---

> **Platform applicability:** This guide is the cross-platform patch & update overview hub for
> Windows, macOS, iOS/iPadOS, Android, and Linux — covering concept terminology, the deferral-vs-enforcement
> distinction, and per-platform routing.
> **Windows:** See [Windows WUfB Rings](01-windows-wufb-rings.md) for ring topology and Autopatch
> disambiguation.
> **macOS:** See [macOS Update Enforcement](02-macos-update-enforcement.md) for the DDM forward
> path (legacy MDM commands deprecated and removed with Apple OS 26).
> **iOS/iPadOS:** See [iOS Update Lifecycle](03-ios-update-lifecycle.md) for DDM update keys on
> unsupervised iOS 17+ devices (effective August 2025).
> **Android:** See [Android Patch Delivery](04-android-patch-delivery.md) for Play Integrity
> enforcement (October 31 2026 fleet compliance deadline) plus Zebra and Samsung OEM mechanisms.
> **Linux:** See [Linux Update Delivery](05-linux-update-delivery.md) for the absence of any native
> Intune Linux update policy, Bash platform-script delivery and its root-context hazard, and
> distro-native `unattended-upgrades` configuration.

# Patch & Update Management Overview: Cross-Platform Hub

This guide is the cross-platform overview for patch and update management across Windows, macOS,
iOS/iPadOS, Android, and Linux. It covers concept terminology (deferral vs enforcement, ring vs Autopatch
ring, attestation), the cross-platform comparison table, and routing to per-platform guides.

For Windows WUfB deployment ring topology plus per-platform Windows servicing topics, see [Windows WUfB Rings](01-windows-wufb-rings.md).
For macOS DDM enforcement, see [macOS Update Enforcement](02-macos-update-enforcement.md). For iOS
update lifecycle, see [iOS Update Lifecycle](03-ios-update-lifecycle.md). For Android patch
delivery, see [Android Patch Delivery](04-android-patch-delivery.md).

This overview is intentionally a concept hub — it does not contain platform-specific configuration
steps, screenshots, or detailed runbooks. Each per-platform guide owns its own configuration
surface, prerequisites, and admin-tone narrative. Read this hub first to choose the correct
per-platform guide; then follow the per-platform guide's runbook for day-2 operations.

## Cross-Platform Comparison

The following table compares the patch and update enforcement model across all five platforms. Use
this as a planning reference; per-platform details live in the five sibling guides. Platform-specific
identifiers and substantive treatment of each row's mechanisms (configuration steps, prerequisites,
deadline callouts) belong exclusively in the per-platform guides linked below — this overview
intentionally keeps the comparison high-level so admins can route to the correct guide quickly.

The columns are ordered Windows, macOS, iOS/iPadOS, Android, Linux to match the navigation order used by
the five sibling per-platform files (file numbers 01 through 05). Rows are concept-keyed, so a
single row can be read horizontally to compare how each platform implements the same concept.

| Concept | Windows | macOS | iOS/iPadOS | Android | Linux |
|---------|---------|-------|------------|---------|-------|
| Cadence model | WUfB deployment rings (deferral periods) | macOS Software Update + DDM | iOS update policies (DDM iOS 17+) | Google Play monthly + OEM (LifeGuard / KSP) | distro-native `apt` + `unattended-upgrades`, no Intune orchestration |
| Deferral mechanism | WUfB deployment rings (quality/feature) | MDM `forceDelayedSoftwareUpdates` (deprecated; pre-OS 26) | iOS device-restrictions "Defer software updates" (supervised-only; deprecated) | (No tenant-side deferral; Google Play handles) | (No Intune-side deferral; distro-native only) |
| Enforcement primitive | Deadline + grace period in Update ring | DDM "Software Update Enforce Latest" (Settings Catalog) | DDM update keys — Target OS Version, Target Build Version, Target Date Time (`OfferPrograms` recategorised: `Beta`-dict beta-enrolment key, not enforcement) | Play Integrity MEETS_STRONG_INTEGRITY (compliance gate) | (None — compliance policy + web-app CA is attestation only) |
| Hotpatch / EOL surface | Hotpatch (Win 11 Ent 24H2+ default May 2026) + VBS prereq | Apple OS 26 removes legacy MDM | Aug 2025 unsupervised DDM retraction | Android 13+ ≤12-month patch age; Zebra LifeGuard Jan 2026 GA; Samsung KSP | Livepatch via Ubuntu Pro (Canonical-side entitlement) |
| Hard deadline | (soft cutovers; no hard deadline) | **[HARD-DEADLINE]** Apple OS 26 release | (soft cutover; Aug 2025 retraction) | **[HARD-DEADLINE]** Oct 31 2026 fleet compliance | (no hard deadline) |

The table reads platforms as columns and concepts as rows. The two `**[HARD-DEADLINE]**` cells —
macOS Apple OS 26 and Android October 31 2026 — flag the only two hard cutovers in scope across
all five platforms; both are detailed (with the three-layer callout pattern) in their respective
per-platform guides at [macOS Update Enforcement](02-macos-update-enforcement.md) and
[Android Patch Delivery](04-android-patch-delivery.md).

<a id="ring-terminology"></a>
## Ring Terminology

The word "ring" is overloaded in Microsoft Windows update tooling. **WUfB deployment ring** and
**Autopatch ring** are related but distinct concepts: an Autopatch group is a container that
*includes* an `Update rings policy for Windows 10 and later` among the policies it creates and
assigns. This section disambiguates them and the separate driver/firmware update policy:

- **WUfB deployment ring** — A Windows Update client policy in Intune configures deferral periods,
  deadlines, and restart behavior for quality and feature updates. Tenants assign devices to WUfB
  deployment rings via Intune > Devices > Update rings, and devices receive Microsoft updates
  directly per the ring's configured deferral cadence. WUfB deployment rings are the manual,
  tenant-owned ring topology.
- **Autopatch ring** — A Windows Autopatch ring is a service-managed device cohort. Windows
  Autopatch automatically provisions the two current default rings, `Test` and `Last`, on every
  Autopatch group; both are always present, cannot be removed or renamed, and each carries its own
  Entra group (a group supports up to 15 rings, and a tenant up to 300 groups). Because an Autopatch
  group contains an `Update rings policy for Windows 10 and later` among the policies it creates and
  assigns, enabling Autopatch does not detach devices from their WUfB deployment ring — it takes
  over direct authorship of that ring policy instead. The Autopatch ring topology is
  service-managed — Microsoft rotates updates through the cohorts on a fixed cadence.
- **Driver/firmware update policy** — Separately configured under Intune > Devices > Windows >
  Driver and firmware updates; this is NOT a "ring" in either WUfB or Autopatch sense. Driver and
  firmware updates are an independent policy surface that admins approve per-update. Approval mode is
  fixed when the driver policy is created and cannot be changed afterwards. The quality-update
  deferral set in the WUfB deployment ring policy does not reach drivers approved by the driver
  update policy; the driver policy has its own 0–30 day deferral instead, configured by its
  **Make updates available after (days)** setting and counted from the day the update was added to
  the policy rather than from the day the OEM published it. The quality-update deadline and grace
  period do apply to drivers. See
  [Windows Driver and Firmware Updates](06-windows-driver-firmware-updates.md)
  for the full approval-mode, workflow, and deferral treatment.

**Source:** [Manage Windows Update for client policies](https://learn.microsoft.com/en-us/windows/deployment/update/waas-manage-updates-wufb) (updated 2025-10-02)

**Source:** [Windows Autopatch groups overview](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/deploy/windows-autopatch-groups-overview) (updated 2026-06-19)

**Source:** [Manage driver updates](https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-driver-updates) and [Driver updates FAQ](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (both updated 2026-04-09)

**Source:** [Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy) (updated 2026-04-24)

For Windows-specific WUfB deployment ring and Autopatch ring configuration, including practical
PITFALL-9 ring-containment guidance, see [Windows WUfB Rings](01-windows-wufb-rings.md). The
other platforms (macOS, iOS, Android, Linux) do not use ring terminology — they use cadence/deferral
mechanisms specific to their respective OS update pipelines (see comparison table above).

## Deferral vs Enforcement

Patch management uses three different control primitives across platforms. Understanding the
distinction between deferral and enforcement (and when attestation is the relevant control) is
the prerequisite for choosing the right per-platform mechanism:

- **Deferral** — A tenant-side delay applied before an update is installed. The user or device is
  told "this update exists; you may install later." The deferral expires automatically and the
  user can usually install earlier. Examples: Windows Update client policy deferral periods (0–30
  days quality; 0–365 days feature); macOS legacy MDM `forceDelayedSoftwareUpdates`; iOS legacy
  device-restrictions "Defer software updates" (supervised-only). Deferral is a soft control: the
  user retains the ability to install earlier; the deferral simply expires after the configured
  window. In modern Apple platforms, deferral is being deprecated in favor of declarative
  enforcement (see below).
- **Enforcement** — A tenant-side hard requirement that the OS install an update by a specific
  deadline. The user does not retain "install later" optionality past the deadline. Examples:
  Windows Update client policy deadline + grace period (after the deadline elapses, force-install
  plus reboot occurs); macOS DDM "Software Update Enforce Latest" (declarative — the OS itself
  enforces the target version); iOS DDM update keys — Target OS Version, Target Build Version,
  Target Date Time (`TargetOSVersion` / `TargetBuildVersion` / `TargetLocalDateTime`) — the OS
  enforces target version+build by the configured local date/time (`OfferPrograms` is a separate
  Beta-dictionary key that governs beta-programme enrolment, not update enforcement); Android Play
  Integrity compliance gate (devices not patched within 12 months fail compliance). Enforcement is
  a hard control: the OS itself ensures compliance regardless of user action.
- **Attestation** — A check that the device is currently patched to a recent baseline. Used for
  Conditional Access and compliance gating rather than as an install primitive. Examples:
  Android Play Integrity verdicts (basic device-integrity and strong-integrity tiers, with
  specific verdict identifiers detailed in the Android per-platform guide); iOS device-level
  encryption and OS version checks; Linux compliance-policy state gating web access to
  Entra-protected applications through Microsoft Edge for Linux (device-level Conditional Access
  grants are not available for Linux at all). Attestation does not install updates — it verifies that
  updates have already been installed and gates access (network, app, data) accordingly.

**Source:** [Apple: Software Update Settings declarative configuration](https://support.apple.com/guide/deployment/software-update-settings-declarative-dep0578d8b8a/web) and [Intune: ref-apple-settings](https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/ref-apple-settings) (Apple published 2024-09-25; Intune updated 2026-07-01)

The deferral / enforcement / attestation distinction explains why each platform's update model
looks superficially different but maps to the same conceptual control surface. Modern Apple
platforms (Apple OS 26 forward) are deprecating deferral primitives entirely in favor of DDM
enforcement; Android leans heavily on attestation for compliance signals; Windows offers all three
(Windows Update client policy deferral periods + deadlines for enforcement + Microsoft Defender +
compliance signals for attestation-equivalent gating). See per-platform guides for migration
timelines and concrete configuration steps.

When planning a fleet patch posture, decide first which control primitive you want — deferral
(soft control with user choice), enforcement (hard control with deadline), or attestation
(compliance-gate signal). Then choose the per-platform mechanism that implements that primitive.
Mixing primitives across platforms is normal: it is common to use deferral on Windows feature
updates, enforcement on macOS major OS updates, and attestation on Android security patches —
each platform's idiomatic surface exposes different combinations.

## Routing to Per-Platform Guides

Use the following routing matrix to choose the correct per-platform guide for your task:

- For Windows tenants planning WUfB deployment ring topology or Autopatch enablement, start with
  [Windows WUfB Rings](01-windows-wufb-rings.md).
- For Windows tenants planning driver and firmware approval workflows, start with
  [Windows Driver and Firmware Updates](06-windows-driver-firmware-updates.md).
- For macOS tenants planning the migration from legacy MDM software-update commands to DDM
  declarative enforcement, start with [macOS Update Enforcement](02-macos-update-enforcement.md).
- For iOS and iPadOS tenants planning DDM update key rollouts (especially on previously
  unsupervised devices that became eligible in August 2025), start with
  [iOS Update Lifecycle](03-ios-update-lifecycle.md).
- For Android tenants planning fleet compliance with Play Integrity verdict requirements, plus
  Zebra and Samsung OEM patch mechanisms, start with [Android Patch Delivery](04-android-patch-delivery.md).
- For Linux tenants planning apt-family update delivery on Intune-managed Ubuntu — where Intune has
  no update policy and the mechanism is a Bash platform script plus a compliance policy — start with
  [Linux Update Delivery](05-linux-update-delivery.md).

Each per-platform guide contains the configuration steps, prerequisites, deadlines callout (where
applicable), and Related Resources / External References footer for that platform. Each of the five
guides routes back to this overview via its own Platform applicability blockquote.

## Cross-Platform Planning Considerations

When planning patch and update posture across a heterogeneous fleet, several considerations cut
across all five platforms and benefit from being addressed once at the program level rather than
re-discovered in each per-platform rollout:

- **Cadence alignment** — Each platform has its own native update cadence (Windows monthly Patch
  Tuesday plus quarterly feature updates; macOS major-version annual with security responses;
  iOS rapid security responses plus point releases; Android monthly Google Play and OEM cycles;
  Linux distro-native `apt` updates on the distribution's own release and security-pocket cadence).
  Aligning fleet maintenance windows across platforms typically requires accepting that the
  cadences are independent — there is no single "patch day" across the fleet, and attempting to
  force one usually creates unnecessary deferral on the platform with the fastest native cadence.
- **Compliance signal harmonization** — The five platforms expose different compliance signals
  (Windows: Update Compliance + Endpoint Manager device-compliance state; macOS: device-compliance
  state from MDM checkin; iOS: device-compliance state plus DDM acknowledgment; Android: Play
  Integrity verdicts plus device-compliance state; Linux: custom compliance script output only).
  A unified Conditional Access posture must
  account for the fact that each platform's "compliant" verdict has different latency and
  different remediation paths.
- **Communications cadence** — End-user communications about update windows must be platform-aware.
  Users on Windows expect Windows Update client policy notifications and a deadline experience;
  users on macOS expect either MDM-driven prompts (legacy) or DDM-enforced silent installs
  (forward); users on iOS expect DDM update keys to deliver invisible enforcement; users on Android
  expect Google Play to handle most of the experience invisibly; users on Linux see whatever the
  distro's own update tooling shows, because Intune sends no Linux update notification at all.
  Unified user-facing messaging that
  does not match the actual platform UX creates support load.
- **Reporting parity** — Reporting on patch posture across platforms requires accepting that the
  data models are not parity-aligned. Windows exposes ring-bound deferral state; macOS exposes
  enforcement target version; iOS exposes DDM update key state; Android exposes patch level age
  plus Play Integrity verdict; Linux exposes only what a custom compliance script reports. Building
  a single dashboard that compares apples to apples requires
  either choosing a lowest-common-denominator metric (typically "is the device at or above the
  target patch level?") or accepting per-platform tabs with their own metrics.
- **Exception handling** — Each platform has its own exception path for devices that cannot meet
  the standard patch posture (kiosks, lab devices, edge cases). Exception management is most
  uniform when handled at the compliance-policy layer rather than at the per-platform update
  policy layer — exclude exception devices from compliance enforcement, and document the
  exception in a shared register, regardless of platform.

These considerations are program-level concerns; the per-platform guides handle the platform-specific
mechanics. If the program-level decisions in this section are not yet made for your tenant, make
them before deep-diving into any one per-platform guide — the per-platform configuration choices
flow downstream from the program-level posture.

## Related Resources

- [Windows WUfB Rings](01-windows-wufb-rings.md) — WUfB deployment ring topology, Autopatch
  disambiguation, in-memory kernel patching servicing model, and the driver/firmware
  disambiguation plus dual-scan pitfall retained alongside the ring topology
- [Windows Driver and Firmware Updates](06-windows-driver-firmware-updates.md) — approval modes,
  the approval workflow, deferral and deadline behavior, OEM catalog and firmware delivery,
  reporting, and the Configuration Manager co-existence procedure
- [macOS Update Enforcement](02-macos-update-enforcement.md) — DDM forward path; Apple OS 26
  legacy-command removal
- [iOS Update Lifecycle](03-ios-update-lifecycle.md) — DDM-on-unsupervised-iOS-17+ retraction
  (Aug 2025)
- [Android Patch Delivery](04-android-patch-delivery.md) — Play Integrity strong-integrity
  enforcement cascade; Zebra LifeGuard; Samsung KSP
- [Linux Update Delivery](05-linux-update-delivery.md) — no native Intune update policy; Bash
  platform-script delivery and the root-context hazard; `unattended-upgrades` origins and reboot
  handling; Ubuntu Pro / Livepatch; compliance plus web-app Conditional Access as attestation

## External References

- [Windows Update Client Policies Documentation (Microsoft Learn)](https://learn.microsoft.com/en-us/windows/deployment/update/waas-overview)
- [Windows Autopatch Documentation (Microsoft Learn)](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/)
- [DDM Software Update (Apple Developer)](https://developer.apple.com/documentation/devicemanagement)
- [Apple Platform Deployment — Software Updates](https://support.apple.com/guide/deployment/welcome/web)
- [Play Integrity API (Google)](https://developer.android.com/google/play/integrity)
- [Android Enterprise Management (Google)](https://developers.google.com/android/management)
- [Operations Documentation Index](../00-index.md) — Cross-reference only; Phase 54 does not amend the operations index per the Phase 59 ROADMAP entry
