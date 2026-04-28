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

# Co-Management Overview: ConfigMgr Workload Model

This guide covers the Windows ConfigMgr-to-Intune co-management workload model for Intune
administrators. Seven workloads can each be migrated independently from ConfigMgr to Intune
management using per-workload slider controls. This overview explains the slider model, the seven
workloads, and how to plan a migration.

Co-management requires a Configuration Manager site (current branch CB 2503 GA April 23 2025 or
later) and Intune licensing. For tenant attach (no workload sliders, portal-sync only), see
[Windows Tenant Attach](01-windows-tenant-attach.md). For the workload migration sequence, see
[Workload Slider Migration](02-windows-workload-sliders.md). For Windows Autopatch prerequisites,
see [Migration Paths and Autopatch](03-cocmgmt-migration-paths.md#autopatch-prerequisites).

## The Seven Co-Management Workloads

ConfigMgr CB 2503 (current branch, GA April 23 2025) defines seven co-management workloads. Each
workload's slider state determines whether ConfigMgr or Intune manages that workload's policies.

1. **Compliance Policies** — Device compliance policy enforcement (e.g., minimum OS version,
   BitLocker encryption, antivirus signature freshness). Lowest migration risk; typically the
   first workload moved to Intune.
2. **Windows Update Policies** — Windows Update for Business deferral and ring assignment
   policies. Required for Windows Autopatch enablement (see
   [Migration Paths and Autopatch](03-cocmgmt-migration-paths.md#autopatch-prerequisites)).
3. **Resource Access** — VPN, Wi-Fi, certificate, and email profile policies. **Deprecated since
   CB 2203** and mandated to Intune in CB 2403; the slider is moved automatically when tenants
   upgrade to CB 2403 or later. See [Resource Access Deprecation](#resource-access-deprecation)
   below for migration details.
4. **Endpoint Protection** — Microsoft Defender for Endpoint policy, Windows Defender Firewall,
   Windows Defender Antivirus configuration. **HIGH-RISK** workload — requires Intune Defender
   for Endpoint policy published, targeted, and confirmed reporting healthy before slider move.
   See [Workload Slider Migration > Endpoint Protection HIGH-RISK](02-windows-workload-sliders.md)
   for the full callout.
5. **Device Configuration** — Configuration profiles (settings catalog, ADMX templates, custom
   OMA-URI). **Switching this workload also implicitly switches the Resource Access and Endpoint
   Protection workloads** if those workloads have not already been individually moved (see
   [Implicit Workload Switching](#implicit-workload-switching) below).
6. **Office Click-to-Run Apps** — Microsoft 365 Apps (Office C2R) deployment, channel selection,
   and update policies. Required for Windows Autopatch enablement.
7. **Client Apps** — Win32 LOB apps, MSI deployments, and Microsoft Store app deployments. Has
   the largest pre-migration validation surface (supersedence chains, dependency graphs, app
   detection rules).

## Three Workload Slider States

Each of the seven workloads has an independent slider with three possible states. The slider state
is set per-workload in the ConfigMgr console (Administration > Cloud Services > Co-management).

| State | Scope | Behavior |
|-------|-------|----------|
| Configuration Manager | All co-managed devices | ConfigMgr manages this workload for all devices |
| Pilot Intune | Devices in specified pilot collection only | Intune manages this workload for collection members; remainder of fleet stays on ConfigMgr |
| Intune | All co-managed devices | Intune manages this workload for all enrolled devices |

> **Note:** The Pilot Intune state is **not a binary toggle** — it is collection-scoped Intune
> management. The slider state is per-collection: devices in the pilot collection are managed by
> Intune; devices outside the collection remain on ConfigMgr. A device can be in the Pilot
> Intune collection for some workloads and not others. This per-collection scoping is intentional
> — it allows phased rollouts and per-workload pilot programs.

**Pilot Intune behavioral note for Endpoint Protection and Device Configuration:** When Pilot
Intune is selected for these two workloads, Intune deploys the policies but does NOT perform
policy removal upon unassignment. For policy removal from devices when policies are unassigned,
the workload must be switched to Intune (full migration).

## Implicit Workload Switching

Two workloads are implicitly switched when the Device Configuration workload's slider is moved:

- **Resource Access** — Resource Access policy is part of Device Configuration in modern
  ConfigMgr; switching Device Configuration moves Resource Access automatically (if not already
  individually switched).
- **Endpoint Protection** — Endpoint Protection policy is also part of Device Configuration;
  switching Device Configuration moves Endpoint Protection automatically.

> **Implicit workload switching warning:** Before moving the Device Configuration workload,
> verify that Intune Endpoint Protection policy is published and confirmed healthy — moving
> Device Configuration without an Intune EP policy in place creates a Defender coverage gap. See
> [Workload Slider Migration > Endpoint Protection HIGH-RISK](02-windows-workload-sliders.md) for
> the full HIGH-RISK callout.

## Resource Access Deprecation {#resource-access-deprecation}

The Resource Access workload is **deprecated since CB 2203** and was mandated to Intune in
**CB 2403**. Starting in CB 2403:

- The Resource Access node is removed from the ConfigMgr console
- The slider is automatically set to Intune
- Tenants upgrading to CB 2403 have this workload moved automatically
- New ConfigMgr deployments cannot configure Resource Access policies in ConfigMgr

For tenants on CB 2403 or later, the Resource Access workload requires no manual migration. For
tenants on CB 2203 — CB 2403 (deprecated but still configurable), Resource Access policies should
be moved to Intune Configuration Profiles (Settings Catalog) in advance of the CB 2403 upgrade.

## Windows Autopatch and Co-Management

Windows Autopatch is a co-management successor — it requires three workloads to be set to Pilot
Intune or Intune before Autopatch can be enabled:

- Windows Update Policies workload
- Device Configuration workload
- Office Click-to-Run Apps workload

> **Windows Autopatch:** Co-management is a prerequisite for Windows Autopatch. Before enabling
> Autopatch, three workloads (Windows Update Policies, Device Configuration, and Office
> Click-to-Run Apps) must be set to Pilot Intune or Intune. See
> [Migration Paths and Autopatch Prerequisites](03-cocmgmt-migration-paths.md#autopatch-prerequisites)
> for the full prerequisite checklist and configuration steps.

## Related Resources

- [Windows Tenant Attach](01-windows-tenant-attach.md) — Tenant attach vs full co-management
  disambiguation
- [Workload Slider Migration](02-windows-workload-sliders.md) — Low-risk-first migration sequence
  with EP HIGH-RISK callout
- [Migration Paths and Autopatch](03-cocmgmt-migration-paths.md) — Windows Autopatch co-management
  prerequisites

## External References

- [ConfigMgr Co-Management Workloads (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/configmgr/comanage/workloads)
- [Co-Management Overview (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/configmgr/comanage/overview)
- [Windows Autopatch Prerequisites (Microsoft Learn)](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/prepare/windows-autopatch-prerequisites)
