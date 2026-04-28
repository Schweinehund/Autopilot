---
last_verified: 2026-04-27
review_by: 2026-06-26
applies_to: all
audience: admin
platform: Windows
---

> **Platform applicability:** This guide is Windows-specific (ConfigMgr + Intune co-management).
> **macOS:** No co-management equivalent — Microsoft Intune does not federate with Jamf at the
> workload-slider level. Migration path: Jamf → Intune via ABM MDM transfer (release device
> assignment in Jamf-bound MDM server in ABM, then re-assign to Intune-bound MDM server; in-use
> devices require user-initiated re-enrollment). See [macOS Enrollment Profile](../../admin-setup-macos/02-enrollment-profile.md).
> **iOS/iPadOS:** No co-management equivalent — Apple MDM is single-server-per-device. Migration
> path: MAM → MDM transition (MAM-WE app protection policies coexist with new MDM enrollment).
> See [iOS/iPadOS Admin Setup](../../admin-setup-ios/00-overview.md) and
> [iOS MAM App Protection](../../admin-setup-ios/09-mam-app-protection.md).
> **Android:** No co-management equivalent. Migration paths: legacy Device Administrator →
> Android Enterprise (DA deprecated August 2022; wipe + re-enrollment required); MAM → MDM for
> BYOD. See [Android Admin Setup](../../admin-setup-android/00-overview.md).

# Workload Slider Migration: ConfigMgr to Intune

This guide covers the recommended low-risk-first migration sequence for moving the seven
co-management workloads from ConfigMgr to Intune. For the slider model and three-state semantics,
see [Co-Management Overview](00-overview.md). For tenant attach (no workload sliders), see
[Windows Tenant Attach](01-windows-tenant-attach.md). For Windows Autopatch prerequisites (which
require three workloads moved), see [Migration Paths and Autopatch](03-cocmgmt-migration-paths.md).

The migration sequence below is risk-ordered: lowest-risk workloads move first to validate the
co-management plumbing (compliance evaluator, Intune licensing, device sync) before moving
higher-risk workloads (Endpoint Protection, Device Configuration) where pre-move validation
failure has fleet-wide impact.

## Slider State Reference

Each workload has an independent slider with three possible states. Verify the current state
before initiating any migration:

| State | Scope | ConfigMgr Manages | Intune Manages |
|-------|-------|-------------------|----------------|
| Configuration Manager | All devices | All workloads (this slider) | None |
| Pilot Intune | Pilot collection only | Devices outside collection | Devices in collection |
| Intune | All devices | None | All workloads (this slider) |

The Pilot Intune state is collection-scoped — devices inside the pilot collection are managed by
Intune for this workload; devices outside remain on ConfigMgr. This is NOT a binary toggle.

> **Pilot Intune behavioral caveat:** When Pilot Intune is selected for **Endpoint Protection**
> and **Device Configuration**, Intune deploys policies but does NOT perform policy removal upon
> unassignment. For full policy lifecycle (deploy + remove on unassignment), the workload must be
> at Intune (full migration), not Pilot Intune.

## Workload Migration Sequence

The recommended migration order is low-risk-first. Each workload's row lists the migration order
position, the validation surface (Validate Before Moving Slider), and per-workload pilot
collection guidance.

| Workload | Migration Order | Risk | Validate Before Moving Slider | Pilot Collection Guidance |
|----------|-----------------|------|-------------------------------|---------------------------|
| Compliance Policies | 1 | LOW | Compliance evaluator agreement; non-compliant device cohort baseline measured before move | Scope to single AAD security group of test devices |
| Resource Access | 2 (DEPRECATED) | N/A — DEPRECATED | This workload is deprecated since CB 2203 and mandated to Intune in CB 2403; slider moves automatically on CB 2403 upgrade. No manual migration required. | N/A |
| Windows Update Policies | 3 | MEDIUM | WUfB ring assignment validated; deferral conformance baseline established. NOTE: Windows Autopatch requires this workload at Pilot Intune or Intune — see [03-cocmgmt-migration-paths.md](03-cocmgmt-migration-paths.md#autopatch-prerequisites) | Start with 10-device pilot ring; validate WUfB deferral rings reporting correctly |
| Endpoint Protection | 4 | **HIGH-RISK** — see callout | Intune Defender for Endpoint policy published, targeted, AND confirmed reporting healthy via Intune > Endpoint security > Microsoft Defender for Endpoint > Onboarding status | Validate in smallest possible pilot collection; confirm Defender policy delivery before expanding |
| Device Configuration | 5 | MEDIUM-HIGH | Configuration profile assignment validated; CSP equivalence verified for in-scope settings; Resource Access + Endpoint Protection implicit-switching impact reviewed | Pilot with representative device configurations; validate each CSP setting maps correctly |
| Office Click-to-Run Apps | 6 | MEDIUM | C2R deployment via Intune validated for pilot collection; channel and version stability confirmed | Pilot with Office channel mix; validate update channel and version targeting |
| Client Apps | 7 | MEDIUM | Win32, MSI, and Microsoft Store deployments validated; supersedence and dependency graphs reviewed | Review app dependency chains before moving slider |

> ⚠️ **Endpoint Protection HIGH-RISK:** do not move this slider until Intune Defender for Endpoint policy is published, targeted, and confirmed reporting healthy. Moving the slider
> before Defender policy lands and reports healthy creates a fleet-wide Defender coverage gap
> window. Verify policy reporting via Intune > Endpoint security > Microsoft Defender for
> Endpoint > Onboarding status before initiating slider move.

## Per-Workload Migration Notes

### 1. Compliance Policies (LOW risk)

The Compliance Policies workload is the recommended first move because compliance evaluation
failure is non-disruptive (devices are flagged non-compliant; service continues). The validation
surface is the compliance-evaluator-agreement check: confirm that ConfigMgr and Intune compliance
policies report the same compliance state for the same device before moving the slider.

**What breaks if you move the slider before validation:** devices may flip to non-compliant
state if Intune compliance rules differ from ConfigMgr compliance rules. Conditional Access (when
later activated) may then deny access. Validate via Intune > Devices > Compliance > Device
compliance dashboard.

### 2. Resource Access (DEPRECATED — CB 2203 / CB 2403)

The Resource Access workload is **deprecated since CB 2203** and was mandated to Intune in **CB
2403**. Starting in CB 2403, the Resource Access node is removed from the ConfigMgr console and
the slider is moved automatically. Tenants on CB 2403 or later have this workload migrated
automatically with no manual intervention.

For tenants on CB 2203 — CB 2403 (deprecated but still configurable), Resource Access policies
should be moved to Intune Configuration Profiles (Settings Catalog) in advance of the CB 2403
upgrade.

### 3. Windows Update Policies (MEDIUM risk)

Windows Update Policies workload migration enables Windows Update for Business (WUfB) deferral
ring management from Intune. This workload is also a **Windows Autopatch prerequisite** — see
[Migration Paths and Autopatch](03-cocmgmt-migration-paths.md#autopatch-prerequisites) for the
full Autopatch prerequisite checklist.

**What breaks if you move the slider before validation:** WUfB ring assignment may regress if
Intune Update rings target a different device cohort than ConfigMgr's existing software updates
configuration. After moving this workload, ConfigMgr software updates must be disabled (or
reconfigured) to avoid dual-scan source conflicts. WUfB-vs-Autopatch ring disambiguation
(PITFALL-9) is covered in Phase 54 patch-management content.

### 4. Endpoint Protection [HIGH-RISK — see callout above]

The Endpoint Protection workload [HIGH-RISK — see callout above] is the highest-risk single
slider move because the validation surface is fleet-wide Defender coverage. Microsoft Defender
for Endpoint policy must be published, targeted at the in-scope device cohort, and confirmed
reporting healthy via Intune > Endpoint security > Microsoft Defender for Endpoint > Onboarding
status BEFORE initiating the slider move. Skipping this validation creates a Defender coverage
gap window — devices may temporarily lose Defender policy enforcement if Intune EP policy is
missing or unhealthy when the slider moves.

**Pilot validation:** move EP slider for a single pilot collection of 10 representative devices
first; confirm Defender Onboarding status reports `Onboarded` for all 10 before expanding scope.

**What breaks if you move the slider before validation:** fleet-wide Defender coverage gap; CA
policies relying on Defender attestation may fail.

### 5. Device Configuration (MEDIUM-HIGH risk)

The Device Configuration workload is MEDIUM-HIGH risk because **switching it implicitly switches
the Resource Access AND Endpoint Protection workloads** if those have not been individually
moved. Before moving Device Configuration, verify EP policy status (see Endpoint Protection
[HIGH-RISK — see callout above] above) and confirm CSP equivalence for in-scope Configuration
Profiles.

**What breaks if you move the slider before validation:** configuration profile drift if Intune
CSPs differ from ConfigMgr settings; potential Defender coverage gap if EP implicit-switch
happens before Intune EP policy is healthy.

### 6. Office Click-to-Run Apps (MEDIUM risk)

The Office Click-to-Run Apps workload migrates Microsoft 365 Apps (Office C2R) deployment,
channel selection, and update policies from ConfigMgr software-deployment to Intune apps. This
workload is also a **Windows Autopatch prerequisite** (see
[03-cocmgmt-migration-paths.md](03-cocmgmt-migration-paths.md#autopatch-prerequisites)).

**What breaks if you move the slider before validation:** Office channel mismatches (e.g., Monthly
Enterprise vs Semi-Annual Enterprise) may flip if Intune deployment targets a different channel
than ConfigMgr. Pilot with representative channel mix and confirm version stability.

### 7. Client Apps (MEDIUM risk)

The Client Apps workload migrates Win32 LOB apps, MSI deployments, and Microsoft Store apps from
ConfigMgr software-deployment to Intune apps. This workload has the largest pre-migration
validation surface because of supersedence chains, dependency graphs, and detection rules. Phase
55 app-lifecycle content covers Win32 supersedence + dependency graph patterns in depth.

**What breaks if you move the slider before validation:** supersedence chains may regress if
Intune Win32 packaging differs from ConfigMgr; app deployment failures if detection rules don't
fire correctly post-migration.

## Related v1.2 Windows Migration Content

The workload slider migration sits within a broader Windows-side modernization arc. The following
v1.2 references cover adjacent migration paths:

- [Imaging-to-Autopilot Migration](../../reference/imaging-to-autopilot.md) — v1.2 Windows
  on-premises imaging (MDT/SCCM OSD) to Autopilot migration guide. Relevant when migrating
  device-imaging path alongside workload sliders.
- [Tenant-to-Tenant Device Migration](../../device-operations/04-tenant-migration.md) — v1.2
  tenant migration runbook covering device-record moves between Microsoft 365 tenants. Relevant
  when consolidating tenants alongside co-management migration.
- [GPO-to-Intune Migration](../../reference/gpo-to-intune.md) — Group Policy Object to Intune
  Settings Catalog migration mapping. Relevant when migrating Configuration Profile settings
  alongside the Device Configuration workload (slider position 5).

## Related Resources

- [Co-Management Overview](00-overview.md) — workload model + three slider states + Pilot Intune
  collection-scoping
- [Windows Tenant Attach](01-windows-tenant-attach.md) — tenant attach vs full co-management
  disambiguation
- [Migration Paths and Autopatch](03-cocmgmt-migration-paths.md) — Windows Autopatch
  co-management prerequisites

## External References

- [Co-Management Workloads (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/configmgr/comanage/workloads)
- [How to Switch Workloads (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/configmgr/comanage/how-to-switch-workloads)
- [Windows Autopatch Prerequisites (Microsoft Learn)](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/prepare/windows-autopatch-prerequisites)
