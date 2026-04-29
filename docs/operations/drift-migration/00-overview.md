---
last_verified: 2026-04-29
review_by: 2026-06-28
applies_to: all
audience: admin
platform: cross-platform
---

> **Platform applicability:** This guide is the cross-platform compliance drift detection
> overview hub for Windows, macOS, iOS/iPadOS, and Android — covering drift terminology
> (configuration drift vs registration drift; signal vs symptom; compliance state vs attestation
> verdict), the cross-platform comparison table, and per-platform routing.
> **Windows:** See [Windows Drift Detection](01-windows-drift-detection.md) for Intune
> Remediations + canonical script-authoring pattern.
> **macOS:** See [macOS Drift Detection](02-macos-drift-detection.md) for profile-revocation
> + DDM compliance signals.
> **iOS/Android:** See [iOS + Android Drift Detection](03-ios-android-drift-detection.md) for
> jailbreak / OS downgrade / Play Integrity verdict signals.
> **Tenant migration:** See [Tenant Migration Runbook](04-tenant-migration-runbook.md) for
> cross-platform tenant-to-tenant migration with MEDIUM-confidence framing.

# Compliance Drift Detection Overview: Cross-Platform Hub

This guide is the cross-platform overview for compliance drift detection across Windows, macOS,
iOS/iPadOS, and Android. It covers drift terminology (configuration drift vs registration drift;
signal vs symptom; compliance state vs attestation verdict), the cross-platform comparison
table, and routing to per-platform guides plus the tenant-to-tenant migration runbook.

For Windows-specific drift detection (Intune Remediations + canonical script-authoring pattern),
see [Windows Drift Detection](01-windows-drift-detection.md). For macOS drift signals, see
[macOS Drift Detection](02-macos-drift-detection.md). For iOS jailbreak / OS downgrade and
Android Play Integrity verdict-change drift signals, see
[iOS + Android Drift Detection](03-ios-android-drift-detection.md). For cross-platform
tenant-to-tenant migration with cross-platform encryption-drift coverage, see
[Tenant Migration Runbook](04-tenant-migration-runbook.md).

This overview is intentionally a concept hub — it does not contain platform-specific
configuration steps, screenshots, or detailed runbooks. Each per-platform guide owns its own
configuration surface, and the tenant-migration runbook owns the migration procedure detail.
Read this hub first to interpret cross-platform drift signals; then follow the per-platform
guide for day-2 operations or the tenant-migration runbook for cross-tenant migration.

## Cross-Platform Comparison

The following table compares compliance drift signals and detection surfaces across all four
platforms. Use this as a routing reference; per-platform detection mechanics live in the four
sibling guides. Substantive treatment of each row's drift remediation steps belongs exclusively
in the per-platform guides linked below — this overview keeps the comparison high-level so
admins can route to the correct guide quickly.

The columns are ordered Windows, macOS, iOS/iPadOS, Android to match the navigation order used
by the per-platform sibling files. Rows are signal-keyed: each row names a drift signal class
and shows where it surfaces on each platform (with `—` indicating that signal is not applicable
on that platform).

| Drift signal class            | Windows                                                                                | macOS                                                                            | iOS/iPadOS                                                              | Android                                                                                 |
|-------------------------------|----------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|-------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| Configuration drift           | policy conflict (two policies target same setting with different values)               | profile revocation (DDM declaration expired or user-removed configuration profile) | profile revocation (configuration profile removed by user or MDM trust break) | per-policy compliance state mismatch                                                    |
| App-state drift               | app install regression (app uninstalled or reverted on managed device)                 | app delivery regression (managed app removed or downgraded)                      | app delivery regression (VPP app removed or license revoked)            | app delivery regression (Managed Google Play app removed or install failure)            |
| Integrity / attestation drift | Endpoint Analytics integrity signals + device compliance state                         | DDM declaration verdicts + Intune compliance policy                              | jailbreak detection (compliance policy reports jailbroken device state) | Play Integrity verdict change (MEETS_STRONG_INTEGRITY drops to lower verdict tier)      |
| OS-state drift                | feature-update rollback signal (WUfB ring compliance)                                  | OS downgrade signal (macOS version below minimum OS version policy)              | OS downgrade (rare; restore-driven; compliance minimum OS version check) | OS downgrade signal (patch level age or Play Integrity verdict regression)              |
| Encryption drift              | BitLocker key escrow drift (recovery key not present in target Entra ID)               | FileVault escrow drift (escrow key not updated post-re-enrollment)               | device-level encryption (compliance check only; no MDM key management)  | dm-crypt per-OEM variance (AOSP; no tenant-managed escrow)                              |
| Detection surface             | Intune Remediations + Endpoint Analytics + Graph compliance reports                    | Intune compliance reports + DDM declaration status + Settings Catalog drift      | Intune compliance policy + Software Update policy + VPP license state   | Intune compliance policy + Play Integrity attestation + Managed Google Play status      |

Read the table horizontally to compare how each platform surfaces the same signal class; read
it vertically to assemble the per-platform drift signal picture. The four sibling guides provide
detection mechanics, remediation steps, and configuration prerequisites for each platform. The
encryption drift row cross-links to the Tenant Migration Runbook
([04-tenant-migration-runbook.md](04-tenant-migration-runbook.md)) for the cross-platform
encryption-drift fold section covering post-migration escrow validation.

## Drift terminology

Compliance drift terminology spans three orthogonal axes that apply across all four platforms.
Conflating these axes is a common source of mis-diagnosis. This section disambiguates the three
axes and the cross-platform vocabulary used in the per-platform guides:

- **Configuration drift vs registration drift** — Configuration drift is the runtime state where
  a managed device has diverged from its assigned policy or profile (for example: a user removed a
  configuration profile, a setting was overridden locally, or two policies target the same
  setting with different values causing a policy conflict). Registration drift is the
  enrollment-side state where a device has diverged from its expected enrollment posture (for
  example: an Autopilot profile assignment is `Not assigned` when expected `Assigned`). Phase 56
  covers configuration drift; for Autopilot registration drift, see the v1.2 SSoT
  [Registration Drift Detection](../../reference/drift-detection.md).
- **Signal vs symptom** — A drift signal is a measurable platform-level indicator (an
  attestation verdict, a compliance state, a remediation regression); a symptom is the
  user-visible consequence (an app missing, a device blocked from Conditional Access, a
  passcode prompt). Per-platform guides describe how to read signals; the cross-platform
  comparison table above maps each signal class to its native-platform detection surface.
- **Compliance state vs attestation verdict** — Compliance state is the Intune-evaluated boolean
  per device per policy (`Compliant` / `Non-compliant`); attestation verdict is a deeper
  cryptographic or platform-level signal from the device's attestation surface. Examples:
  Android Play Integrity verdict (`MEETS_STRONG_INTEGRITY`, `MEETS_DEVICE_INTEGRITY`,
  `MEETS_BASIC_INTEGRITY`); iOS jailbreak detection compliance signal; Windows Endpoint
  Analytics integrity signal. Compliance state may aggregate multiple attestation verdicts plus
  policy-level checks. The per-platform guides describe verdict thresholds and signal-to-state
  mapping for each platform.

Understanding which axis a drift signal belongs to determines which guide applies:
configuration drift (policy or profile regression) → per-platform detection guide;
registration drift (enrollment posture regression) → v1.2 registration-drift SSoT;
attestation verdict change → per-platform detection guide with attestation coverage.

For Windows-specific drift detection mechanics (Intune Remediations detect+remediate script
pairs), see [Windows Drift Detection](01-windows-drift-detection.md). For macOS, see
[macOS Drift Detection](02-macos-drift-detection.md). For iOS jailbreak / OS downgrade and
Android Play Integrity verdict-change, see
[iOS + Android Drift Detection](03-ios-android-drift-detection.md). For cross-platform tenant
migration including a cross-platform encryption-drift fold section, see
[Tenant Migration Runbook](04-tenant-migration-runbook.md).

## Routing to Per-Platform Guides

Choose the per-platform guide based on the platform whose drift signals you are investigating:

- **Windows** — Intune Remediations (Proactive Remediations) detect+remediate script pairs +
  canonical script-authoring pattern + Graph compliance reports for fleet-wide output: see
  [Windows Drift Detection](01-windows-drift-detection.md).
- **macOS** — Profile revocation when MDM trust breaks; DDM declaration verdicts; Intune
  Settings Catalog drift detection: see
  [macOS Drift Detection](02-macos-drift-detection.md).
- **iOS/iPadOS + Android** — iOS jailbreak detection compliance signals + iOS OS downgrade
  signal; Android Play Integrity verdict-change drift signals (cross-link to Phase 54 Play
  Integrity content for attestation substance): see
  [iOS + Android Drift Detection](03-ios-android-drift-detection.md).
- **Tenant migration (cross-platform)** — Cross-platform tenant-to-tenant migration with
  cross-platform encryption-drift coverage (BitLocker, FileVault, iOS device-level, Android
  dm-crypt variance): see [Tenant Migration Runbook](04-tenant-migration-runbook.md).
  MEDIUM confidence surface — tenant migration is not a formally supported Intune scenario.

## Cross-Platform Drift Considerations

When investigating or managing compliance drift across a heterogeneous fleet, several
considerations cut across all four platforms and benefit from being addressed at the program
level before diving into per-platform detection mechanics:

- **Signal latency** — Each platform has a different compliance check-in cadence. Windows
  Intune management extension runs Remediations on a configurable schedule (default 15 minutes
  for detect scripts); macOS MDM check-in cadence is typically 8 hours; iOS and Android
  check-in cadence varies by device state. A unified fleet dashboard should account for
  per-platform check-in latency when interpreting drift signal freshness.
- **Remediation scope** — Configuration drift remediation authority differs by platform. Windows
  Intune Remediations can push a remediate script to the device to self-correct the drift
  condition. macOS and iOS remediation typically requires MDM command re-push (profile or
  Settings Catalog reapplication) or admin-initiated retire+re-enroll. Android remediation
  follows compliance policy action sequences (mark non-compliant → block CA → prompt user →
  wipe or retire). Per-platform guides describe the specific remediation authority boundary.
- **Drift recurrence** — A drift signal that reappears after remediation indicates a conflict
  source rather than a one-time event. On Windows, recurring policy conflict signals indicate
  two active policies targeting the same setting with different values; resolution requires
  consolidating policy scope or using Settings Catalog precedence rules. On macOS and iOS,
  recurring profile revocation signals may indicate a trust-break in the MDM enrollment that
  needs re-enrollment rather than profile re-push.
- **Cross-platform encryption drift** — Post-migration encryption state (BitLocker key escrow,
  FileVault key escrow, iOS device-level encryption compliance, Android dm-crypt variance)
  is a distinct drift surface from configuration drift and is covered in the tenant-migration
  runbook. See [Tenant Migration Runbook](04-tenant-migration-runbook.md) for the
  cross-platform encryption-drift fold section.

## When to Use This Overview

Use this overview document when:

- **Choosing the right per-platform guide** — Read the Routing section and the Cross-Platform
  Comparison table together to identify which of the four sibling guides matches the drift
  signal you are investigating.
- **Disambiguating cross-platform vocabulary** — When a runbook or colleague uses a drift term
  (`policy conflict`, `app install regression`, `profile revocation`, `jailbreak detection`,
  `OS downgrade`, `Play Integrity verdict`) and you need to confirm what it means across
  platforms, the Drift terminology section is the canonical cross-platform reference.
- **Planning a cross-platform drift posture** — The Cross-Platform Drift Considerations section
  highlights signal latency, remediation scope, and drift recurrence patterns that should be
  understood at the program level before per-platform runbooks are consulted.

Do not use this overview as a configuration reference — it deliberately omits per-platform
configuration steps, screenshots, and prerequisites. Every per-platform guide owns the
configuration surface for its platform; this hub owns only the cross-platform vocabulary and
routing surface.

## Related Resources

- [Windows Drift Detection](01-windows-drift-detection.md) — Intune Remediations + canonical
  script-authoring pattern (DRIFT-01 + DRIFT-02 fold)
- [macOS Drift Detection](02-macos-drift-detection.md) — Profile-revocation + DDM compliance
  signals
- [iOS + Android Drift Detection](03-ios-android-drift-detection.md) — iOS jailbreak / OS
  downgrade + Android Play Integrity verdict-change
- [Tenant Migration Runbook](04-tenant-migration-runbook.md) — Cross-platform tenant-to-tenant
  migration (DRIFT-04 + DRIFT-05 + DRIFT-06 + DRIFT-07 fold; MEDIUM confidence)
- [Registration Drift Detection](../../reference/drift-detection.md) — v1.2 SSoT — Autopilot
  registration drift (scope-distinct: registration vs configuration)
- [Patch & Update Management Overview](../patch-management/00-overview.md) — Sibling ops-domain
  (Phase 54)
- [App Lifecycle Automation Overview](../app-lifecycle/00-overview.md) — Sibling ops-domain
  (Phase 55)
- [Co-Management Overview](../co-management/00-overview.md) — Sibling ops-domain (Phase 53)

## External References

- [Use Remediations to detect and fix support issues (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-management/tools/deploy-remediations) — DRIFT-01 portal path source
- [Microsoft Graph deviceManagement reports (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/reports-export-graph-available-reports) — Graph drift report names
- [iOS/iPadOS device compliance settings (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/protect/compliance-policy-create-ios) — iOS jailbreak detection compliance surface
- [Operations Documentation Index](../00-index.md) — Cross-reference only; Phase 56 does NOT amend the operations index per the Phase 59 ROADMAP entry
