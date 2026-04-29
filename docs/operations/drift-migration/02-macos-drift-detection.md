---
last_verified: 2026-04-29
review_by: 2026-06-28
applies_to: all
audience: admin
platform: macOS
---

> **Platform applicability:** This guide is macOS-specific (profile revocation + DDM declaration
> verdicts + Intune Settings Catalog drift signals). For the cross-platform overview, see
> [Drift Detection Overview](00-overview.md).
> **Windows:** See [Windows Drift Detection](01-windows-drift-detection.md) for Intune
> Remediations + canonical script-authoring pattern.
> **iOS/Android:** See [iOS + Android Drift Detection](03-ios-android-drift-detection.md) for
> jailbreak / OS downgrade / Play Integrity verdict signals.
> **Tenant migration:** See [Tenant Migration Runbook](04-tenant-migration-runbook.md) for
> cross-platform tenant-to-tenant migration including macOS ABM token re-issue.

# macOS Drift Detection: Profile Revocation + DDM Compliance Signals

This guide is the macOS-specific drift detection routing summary. **macOS does not have a native
Intune Remediations equivalent** — Intune Remediations (Proactive Remediations) is currently
Windows-only at the Intune Management Extension layer. macOS-side compliance drift surfaces
through three primary signal classes covered below: profile revocation (when MDM trust breaks or
a configuration profile is removed by the user), DDM declaration verdicts (when DDM declarations
are deployed and the device evaluates them), and Intune Settings Catalog drift signals (per-policy
compliance state).

For the cross-platform compliance drift overview and signal comparison table, see
[Drift Detection Overview](00-overview.md). For substantive macOS investigation procedures —
log collection, agent diagnostics, profile re-push — follow the v1.2 macOS L1 and L2 runbooks
linked in the Investigating macOS Drift section below. Those runbooks own the operational depth
surface for macOS. This guide provides only the cross-platform routing summary.

## macOS Compliance Drift Signals

Three macOS-side compliance drift signal classes that admins should monitor:

- **Profile revocation** — When the MDM-pushed configuration profile is removed by the user
  (rare in supervised/ADE contexts; more common in BYOD where the enrollment profile is
  user-removable) or when MDM trust expires (push certificate rotation lapsed, APNs token
  expired). Surface: Intune compliance reports show the device as non-compliant for policies
  that depended on the revoked profile. Remediation: re-push the affected configuration profiles,
  or retire-and-re-enroll the device for severe MDM trust failures.

- **DDM (Declarative Device Management) declaration verdicts** — DDM declarations carry
  per-declaration status that the device reports back to Intune. When a declaration transitions
  from `Active` to `Failed`, that is a drift signal indicating the device cannot satisfy the
  declaration's predicates. Surface: Intune Settings Catalog per-device declaration state. Most
  common in macOS 13 Ventura+ deployments using the DDM activation layer.

- **Intune Settings Catalog drift signals** — Per-policy compliance state across the Settings
  Catalog macOS scope. Surface: Intune compliance reports and the `DeviceNonCompliance`
  Microsoft Graph export-job report. Use the `ConfigurationPolicyAggregate` report for
  aggregate per-policy compliance rates across the macOS device fleet.

**No native Intune Remediations equivalent on macOS.** Despite the cross-platform
"Bash/PowerShell" framing in some narratives, Intune Remediations runs only on Windows-managed
devices at the Intune Management Extension (IME) layer. macOS shell-script monitoring — available
via the Intune Settings Catalog macOS shell scripts surface — uses a different signal class that
does not include the detect+remediate-pair semantics of Intune Remediations. See the
[Microsoft Learn macOS shell scripts reference](https://learn.microsoft.com/en-us/intune/intune-service/apps/macos-shell-scripts)
for that surface.

## Investigating macOS Drift

For substantive macOS drift investigation procedures, follow the v1.2 macOS runbooks:

- **L1 macOS runbooks** (`docs/l1-runbooks/`) — Initial triage runbooks for macOS enrollment
  failures, compliance drift symptoms, and profile-removal diagnosis. Start here for front-line
  admin response to macOS compliance alerts.

- **L2 macOS runbooks** (`docs/l2-runbooks/`) — Deep-dive macOS investigation including log
  collection (`/var/log/`, MDM client logs via `log stream --predicate`), agent diagnostics
  (`mdmclient`), and profile re-push procedures. Escalate to L2 guides when L1 triage cannot
  resolve the compliance state.

For adjacent macOS surfaces:

- **macOS app-delivery drift** — When compliance drift originates from the app delivery
  pipeline (LOB PKG, unmanaged PKG, DMG, VPP), see
  [macOS PKG / DMG Pipeline](../app-lifecycle/02-macos-pkg-dmg-pipeline.md) (Phase 55). That
  guide covers all Microsoft-supported macOS app types plus community-OSS adjacency callouts for
  Installomator and Intuneomator.

- **macOS update enforcement drift** — When compliance drift correlates with software update
  enforcement deadlines (DDM update declarations, managed software updates), see
  [macOS Update Enforcement](../patch-management/02-macos-update-enforcement.md) (Phase 54).

- **macOS tenant migration** — For migrating macOS devices between Intune tenants (ABM token
  re-issue, ADE Await-Configuration behavior, wipe-and-re-enroll path for in-use devices), see
  the macOS / iOS section of the [Tenant Migration Runbook](04-tenant-migration-runbook.md).

## Related Resources

- [Drift Detection Overview](00-overview.md) — Cross-platform compliance drift hub with
  4-platform comparison table and drift terminology definitions
- [Windows Drift Detection](01-windows-drift-detection.md) — Windows sibling: Intune
  Remediations detect+remediate pairs + canonical script-authoring pattern
- [iOS + Android Drift Detection](03-ios-android-drift-detection.md) — iOS/Android sibling:
  jailbreak detection / OS downgrade / Play Integrity verdict signals
- [Tenant Migration Runbook](04-tenant-migration-runbook.md) — Cross-platform tenant migration
  including macOS / iOS ABM token re-issue and ADE Await-Configuration behavior
- [macOS PKG / DMG Pipeline](../app-lifecycle/02-macos-pkg-dmg-pipeline.md) — Phase 55 macOS
  app delivery (adjacent surface for app-state drift originating in delivery pipeline)
- [macOS Update Enforcement](../patch-management/02-macos-update-enforcement.md) — Phase 54
  macOS DDM update enforcement (adjacent surface for OS-state compliance drift)

## External References

- [Manage macOS devices with Microsoft Intune (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/configuration/device-features-configure)
- [Declarative Device Management (DDM) for Apple devices (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/protect/apple-declarative-device-management)
- [Use shell scripts on macOS devices in Intune (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/apps/macos-shell-scripts)
- [macOS compliance policy settings in Intune (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/protect/compliance-policy-create-mac-os)
- [Operations Documentation Index](../00-index.md) — Cross-reference only; Phase 56 does not
  amend the operations index (Phase 59 Hub Navigation Integration will add the Drift Detection
  entry per ROADMAP)
