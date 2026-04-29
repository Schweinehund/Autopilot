---
last_verified: 2026-04-29
review_by: 2026-06-28
applies_to: all
audience: admin
platform: iOS,Android
---

> **Platform applicability:** This guide covers iOS/iPadOS + Android compliance drift signals
> (jailbreak detection + OS downgrade for iOS; Play Integrity verdict-change for Android). For
> the cross-platform overview, see [Drift Detection Overview](00-overview.md).
> **Windows:** See [Windows Drift Detection](01-windows-drift-detection.md) for Intune
> Remediations + canonical script-authoring pattern.
> **macOS:** See [macOS Drift Detection](02-macos-drift-detection.md) for profile revocation
> + DDM declaration verdicts + Intune Settings Catalog drift signals.
> **Tenant migration:** See [Tenant Migration Runbook](04-tenant-migration-runbook.md) for
> cross-platform tenant-to-tenant migration including iOS/Android re-enrollment paths.

# iOS + Android Drift Detection: Jailbreak, OS Downgrade, and Play Integrity Verdicts

This guide is the combined iOS/iPadOS + Android drift detection routing summary. Neither
platform has a native Intune Remediations equivalent — Intune Remediations (Proactive
Remediations) is currently Windows-only at the Intune Management Extension layer. Both
platforms surface compliance drift through the Intune compliance policy framework and
platform-specific attestation mechanisms covered below.

For the cross-platform compliance drift overview and signal comparison table, see
[Drift Detection Overview](00-overview.md). For substantive iOS investigation procedures
(jailbreak triage, OS downgrade restore, profile re-push), follow the v1.3 iOS L1 and L2
runbooks linked in the Investigating iOS / Android Drift section. For substantive Android
Play Integrity content — MEETS_STRONG_INTEGRITY enforcement timeline, Android 13+ verdict-change
behavior, security-patch-staleness mapping — see the Phase 54
[Android Patch Delivery](../patch-management/04-android-patch-delivery.md) Play Integrity
SSoT. This guide cross-links rather than duplicating that substance.

## iOS Drift Signals

Two iOS-side compliance drift signal classes that admins should monitor:

- **Jailbreak detection** — The Intune iOS/iPadOS compliance policy includes a "Jailbroken
  devices" setting that, when set to **Block**, marks any device the platform reports as
  jailbroken as non-compliant. Surface: Intune compliance reports + per-device compliance state.
  Remediation: jailbroken iOS devices cannot be remediated to a healthy MDM-managed state —
  the user must restore the device via iTunes / Finder and re-enroll, or the device must
  be removed from Conditional Access scope pending re-enrollment.

- **OS downgrade signal** — The Intune iOS/iPadOS minimum-OS-version compliance policy
  setting flags devices that report an OS version below the configured minimum. Surface:
  Intune compliance reports. Note: iOS/iPadOS does not permit user-driven OS downgrades
  through standard channels; a downgrade typically requires a full device restore from a
  backup made on an older iOS version, after which re-enrollment is required.

For substantive iOS investigation depth — jailbreak triage, configuration profile recovery,
OS version mismatch procedures — follow the v1.3 iOS L1 and L2 runbooks linked in the
Investigating iOS / Android Drift section below.

## Android Drift Signals

The primary Android compliance drift signal is **Play Integrity verdict change**:

- A device that previously satisfied `MEETS_STRONG_INTEGRITY` may transition to a lower
  verdict (`MEETS_DEVICE_INTEGRITY` or `MEETS_BASIC_INTEGRITY`) due to security patch
  staleness, a system modification, or root detection. This drift is reported through the
  Intune compliance policy with Play Integrity attestation enabled.
- Surface: Intune compliance reports + per-device Play Integrity attestation state.
- Remediation: apply pending security patches. For persistent verdict drops, the device may
  need to be re-imaged or removed from Conditional Access scope.

> **Substance lives in the Phase 54 SSoT.** For the full Play Integrity verdict-change drift
> story — MEETS_STRONG_INTEGRITY enforcement timeline, Android 13+ verdict-change behavior,
> and security-patch-staleness mapping — see
> [Android Patch Delivery](../patch-management/04-android-patch-delivery.md). This guide
> cross-links rather than duplicating that substance per the link-not-copy contract.

## Investigating iOS / Android Drift

For substantive investigation procedures:

- **iOS L1 runbooks** (`docs/l1-runbooks/`) — Initial triage runbooks for iOS/iPadOS
  enrollment failures, jailbreak detection alerts, and compliance-state diagnosis. Start here
  for front-line admin response to iOS compliance drift.

- **iOS L2 runbooks** (`docs/l2-runbooks/`) — Deep-dive iOS investigation including profile
  re-push procedures, OS restore guidance, and device configuration recovery. Escalate to L2
  guides when L1 triage cannot resolve the compliance state.

- **Android Play Integrity** — Phase 54
  [Android Patch Delivery](../patch-management/04-android-patch-delivery.md) — SSoT for
  Play Integrity verdict mechanics, MEETS_STRONG_INTEGRITY enforcement, and security-patch
  compliance monitoring.

For adjacent surfaces:

- **iOS app-state drift** — When compliance drift originates from the VPP licensing surface,
  see [iOS VPP Licensing](../app-lifecycle/03-ios-vpp-licensing.md) (Phase 55). That guide
  covers VPP token management, license revocation, and app assignment recovery for iOS/iPadOS.

- **Android app-state drift** — When compliance drift originates from the Managed Google Play
  surface, see [Android MGP Lifecycle](../app-lifecycle/04-android-mgp-lifecycle.md) (Phase 55).
  That guide covers MGP account binding, app approval workflows, and assignment recovery.

- **iOS / Android tenant migration** — For migrating iOS or Android devices between Intune
  tenants (ABM token re-issue for iOS/macOS, work profile re-creation for Android BYOD, factory
  reset for corporate-owned Android), see the macOS / iOS and Android sections of the
  [Tenant Migration Runbook](04-tenant-migration-runbook.md).

## Related Resources

- [Drift Detection Overview](00-overview.md) — Cross-platform compliance drift hub with
  4-platform comparison table and drift terminology definitions
- [Windows Drift Detection](01-windows-drift-detection.md) — Windows sibling: Intune
  Remediations detect+remediate pairs + canonical script-authoring pattern
- [macOS Drift Detection](02-macos-drift-detection.md) — macOS sibling: profile revocation
  + DDM declaration verdicts + Intune Settings Catalog drift signals
- [Tenant Migration Runbook](04-tenant-migration-runbook.md) — Cross-platform tenant migration
  including macOS / iOS ABM token re-issue and Android MGP re-binding sequence
- [Android Patch Delivery](../patch-management/04-android-patch-delivery.md) — Phase 54 Play
  Integrity SSoT (link-not-copy per cross-platform anti-duplication contract)
- [iOS VPP Licensing](../app-lifecycle/03-ios-vpp-licensing.md) — Phase 55 iOS app-delivery
  adjacent surface (VPP license management + assignment recovery)
- [Android MGP Lifecycle](../app-lifecycle/04-android-mgp-lifecycle.md) — Phase 55 Android
  app-delivery adjacent surface (MGP account binding + app approval workflows)

## External References

- [iOS/iPadOS device compliance settings in Intune (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/protect/compliance-policy-create-ios) — iOS jailbreak detection + minimum OS version compliance surface
- [Android Enterprise compliance settings in Intune (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/protect/compliance-policy-create-android-for-work) — Play Integrity verdict configuration
- [Play Integrity API overview (Google)](https://developer.android.com/google/play/integrity) — Verdict semantics + MEETS_STRONG_INTEGRITY definitions
- [Operations Documentation Index](../00-index.md) — Cross-reference only; Phase 56 does not
  amend the operations index (Phase 59 Hub Navigation Integration will add the Drift Detection
  entry per ROADMAP)
