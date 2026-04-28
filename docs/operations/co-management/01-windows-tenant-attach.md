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

# Windows Tenant Attach vs Full Co-Management

Cloud attach is an umbrella term for three ConfigMgr cloud-integration features: tenant attach,
endpoint analytics, and co-management. This guide focuses on the most commonly conflated pair —
**tenant attach** (cloud-portal device sync, no workload switching) vs **full co-management**
(workload sliders active, per-workload Intune ownership).

For the underlying co-management workload model and slider semantics, see
[Co-Management Overview](00-overview.md). For the workload migration sequence, see
[Workload Slider Migration](02-windows-workload-sliders.md).

## What Tenant Attach Is

Tenant attach is the lightest-weight ConfigMgr cloud-integration feature. ConfigMgr uploads device
records to the Intune admin center; admins can take cloud-side actions (run scripts, install
applications, view CMPivot results, retrieve BitLocker recovery keys) on those devices from the
Intune portal. **Tenant attach does NOT involve workload switching** — every workload's policy
enforcement remains in ConfigMgr. There are no workload sliders to move; there is no per-workload
Intune ownership.

## What Full Co-Management Is

Full co-management adds workload slider control on top of tenant attach capabilities. Each of the
seven co-management workloads has an independent slider (Configuration Manager / Pilot Intune /
Intune); admins can move individual workloads to Intune management while leaving others on
ConfigMgr. Full co-management is a per-workload migration tool — not a switch-everything-at-once
flag.

## The Distinguishing Characteristic: No Workload Switching in Tenant Attach

The single distinguishing characteristic between tenant attach and full co-management is workload
slider control. Tenant attach has **no workload switching** — workloads stay in ConfigMgr. Full
co-management activates **workload sliders** that allow per-workload migration from ConfigMgr to
Intune.

This is the SC#3 anchor for L2 escalation routing: if an admin is investigating a "device shows
in Intune but Intune policies aren't applying" symptom, the disambiguation question is whether
the tenant has tenant-attach-only or full co-management. With tenant attach, Intune policies
DO NOT apply (no workload switching, no Intune policy enforcement). With full co-management,
Intune policies apply ONLY for workloads whose sliders have been moved.

## Capability Comparison

| Capability | Tenant Attach | Full Co-Management |
|------------|---------------|---------------------|
| Intune admin center device sync | Yes | Yes |
| Remote actions (from Intune portal) | Yes | Yes |
| CMPivot queries from Intune | Yes | Yes |
| Endpoint security reports (Defender) | Yes | Yes |
| BitLocker recovery key retrieval | Yes | Yes |
| Run PowerShell scripts on demand | Yes | Yes |
| Workload slider control | **No — workloads stay in ConfigMgr** | Yes — per-workload slider |
| Intune policy enforcement | **No — ConfigMgr manages all workloads** | Yes — for switched workloads |
| Conditional Access with Intune compliance | No (compliance workload not moved) | Yes — when Compliance workload moved |
| Windows Autopatch eligibility | No | Yes — requires 3 workloads moved (see [03-cocmgmt-migration-paths.md](03-cocmgmt-migration-paths.md)) |
| Requires Hybrid Entra ID join | No | Typically yes (ConfigMgr enrollment path) |
| Intune license per device | No | Yes |
| Endpoint Manager admin center surface | Yes (read-only for non-switched workloads) | Yes (read-write for switched workloads) |
| Co-management slider page in ConfigMgr console | Disabled | Active — per-workload sliders |

## When to Use Tenant Attach Only

- Quick win: cloud admin visibility for ConfigMgr-managed devices without an Intune workload
  migration commitment
- Service desk efficiency: enable Intune-portal remote actions (run scripts, retrieve recovery
  keys) for L1/L2 staff already trained on Intune
- Pilot evaluation: prove cloud-portal viability before committing to workload migration

## When to Move to Full Co-Management

- Specific workload requires Intune-only feature (e.g., Conditional Access with Intune compliance,
  Windows Autopatch enablement, Microsoft Defender for Endpoint advanced features)
- Migration sequencing: phased ConfigMgr → Intune migration with per-workload validation before
  full Intune commitment
- Modern device management alignment: cloud-first device management across Windows + macOS + iOS +
  Android — co-management is the Windows-side path

## Migration from Tenant Attach to Full Co-Management

Tenant attach to full co-management is not a "switch on" — it requires:

1. Co-management enrollment in ConfigMgr (Administration > Cloud Services > Co-management)
2. Intune licensing for in-scope devices
3. Workload-slider planning (see [Workload Slider Migration](02-windows-workload-sliders.md) for
   the recommended low-risk-first sequence)
4. Pre-move validation per workload (Compliance evaluator agreement, WUfB ring assignment,
   Defender policy reporting healthy, Configuration Profile parity, etc.)

Tenant attach + full co-management can coexist in a single tenant. Full co-management implicitly
includes tenant attach capabilities (device sync, remote actions, etc.).

## Related Resources

- [Co-Management Overview](00-overview.md) — workload model, three slider states, Pilot Intune
  collection-scoping
- [Workload Slider Migration](02-windows-workload-sliders.md) — low-risk-first migration sequence
  with EP HIGH-RISK callout
- [Migration Paths and Autopatch](03-cocmgmt-migration-paths.md) — Windows Autopatch
  co-management prerequisites

## External References

- [Cloud Attach Overview (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/configmgr/cloud-attach/overview)
- [Tenant Attach Overview (Microsoft Learn)](https://learn.microsoft.com/en-us/mem/configmgr/tenant-attach/device-sync-actions)
