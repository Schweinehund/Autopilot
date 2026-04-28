---
last_verified: 2026-04-27
review_by: 2026-06-26
applies_to: all
audience: admin
platform: Windows
---

# Migration Paths and Autopatch Prerequisites

This guide covers Windows-internal migration paths from co-management — specifically, the
Windows Autopatch prerequisite chain. The filename's plural "paths" reflects Windows-side
migration paths (co-management → Autopatch); cross-platform analog migration paths (Jamf → Intune,
MAM → MDM, Android Enterprise modes) are covered inline in
[Co-Management Overview](00-overview.md), [Windows Tenant Attach](01-windows-tenant-attach.md),
and [Workload Slider Migration](02-windows-workload-sliders.md).

For the workload model and slider semantics, see [Co-Management Overview](00-overview.md). For
the workload migration sequence, see [Workload Slider Migration](02-windows-workload-sliders.md).

## Windows Autopatch Overview

Windows Autopatch is a co-management successor managed-update service that automates Windows
quality update (WUfB) ring management for enrolled devices. Autopatch eliminates manual WUfB
ring authoring by managing rings (Test, First, Fast, Broad) automatically based on Microsoft's
quality-signal feedback loops.

Autopatch is a co-management migration path: tenants moving from ConfigMgr-managed Windows Update
to fully cloud-managed updates typically migrate the Windows Update Policies workload to Intune
first, then enable Autopatch to take over ring management. Co-management's Pilot Intune state is
acceptable for Autopatch enablement (devices in pilot collection are eligible).

## Autopatch Prerequisites {#autopatch-prerequisites}

Windows Autopatch requires co-management with the following **three workloads** set to
**Pilot Intune** or **Intune** before Autopatch can be enabled:

1. **Windows Update Policies** workload — Slider must be at Pilot Intune or Intune. This
   workload's policies (deferral, ring assignment, deadline enforcement) become Autopatch's
   surface for ring management.
2. **Device Configuration** workload — Slider must be at Pilot Intune or Intune. Configuration
   profile assignments must be deliverable from Intune before Autopatch ring management can apply
   matching configuration.
3. **Office Click-to-Run Apps** workload — Slider must be at Pilot Intune or Intune. Microsoft 365
   Apps update channel and version policies become Intune-managed; Autopatch coordinates Office
   updates alongside Windows quality updates.

If any workload is set to **Pilot Intune** (rather than full Intune), devices must be members of
the corresponding pilot collection — Autopatch only manages devices for which all three
workloads are Intune-managed (either via full Intune state or via Pilot Intune state with the
device in the pilot collection).

> **Critical correction note:** Early documentation referenced only Device Configuration and
> Office Click-to-Run as Autopatch prerequisites (REQUIREMENTS.md COMG-05 wording is incomplete).
> The current Microsoft Learn Autopatch prerequisites page (updated 2026-02-26) specifies all
> three workloads including **Windows Update Policies**. Document all three when planning a
> migration; verifying only Device Configuration and Office Click-to-Run is insufficient.

### Pre-Enablement Checklist

Before enabling Windows Autopatch in your tenant, verify the following:

- [ ] **Co-management enabled** — Devices are co-managed (ConfigMgr client + Intune enrollment).
      Verify via ConfigMgr console > Administration > Cloud Services > Co-management; confirm
      enrollment count matches expected device cohort.
- [ ] **Windows Update Policies workload** — Slider set to Pilot Intune or Intune. Verify in
      ConfigMgr Co-management Properties > Workloads tab.
- [ ] **Device Configuration workload** — Slider set to Pilot Intune or Intune. Note that moving
      this workload also implicitly switches Resource Access and Endpoint Protection workloads;
      see [Workload Slider Migration > Endpoint Protection](02-windows-workload-sliders.md) for
      the EP HIGH-RISK callout that applies before this implicit switch.
- [ ] **Office Click-to-Run Apps workload** — Slider set to Pilot Intune or Intune.
- [ ] **Pilot collections configured** — If any of the three workloads is at Pilot Intune,
      target devices must be in the corresponding pilot collection.
- [ ] **Autopatch licensing** — Verify Windows Autopatch licensing prerequisites (Windows 10/11
      Enterprise E3+ with Microsoft 365 E3+ or equivalent); see Microsoft Learn Autopatch
      prerequisites for current license requirements.
- [ ] **Entra ID requirements** — Devices are Entra ID joined or Hybrid Entra ID joined per
      Autopatch device-eligibility rules.

> **Before enabling Autopatch:**
>
> - **All three workloads must be confirmed** — Windows Update Policies AND Device Configuration
>   AND Office Click-to-Run Apps must be at Pilot Intune or Intune BEFORE Autopatch enablement.
> - **Pilot collections must be correctly scoped** — If using Pilot Intune for any workload,
>   devices not in the collection are still managed by ConfigMgr and are NOT Autopatch-eligible.
> - **Endpoint Protection coverage** — If Device Configuration migration is the trigger for
>   Endpoint Protection implicit-switching, verify Intune Defender for Endpoint policy is healthy
>   first (see [02-windows-workload-sliders.md](02-windows-workload-sliders.md) HIGH-RISK callout).

## Pilot Intune State Acceptable for Autopatch

Microsoft Autopatch documentation explicitly accepts either **Intune** or **Pilot Intune** for
all three workloads. Tenants do not need to move all sliders to Intune for the entire fleet before
enabling Autopatch — phased rollouts using Pilot Intune are supported.

If using Pilot Intune for one or more of the three workloads, ensure that:

- The pilot collection membership is the same set of devices that will be enrolled in Autopatch
- The pilot collection is regularly reviewed for membership accuracy (devices entering the
  collection become Autopatch-eligible; devices leaving the collection lose Autopatch eligibility)
- The three workloads use coherent pilot collection scoping — split scoping (different pilot
  collections per workload) creates Autopatch-eligibility ambiguity

For full migration (all devices Autopatch-eligible), move all three sliders to **Intune**.

## Related Patch Management Content (Phase 54 Forward-Promise)

> **Note:** Windows Update Policies workload migration — including WUfB ring topology and
> WUfB-vs-Autopatch ring naming-collision disambiguation (PITFALL-9) — is covered in Phase 54
> patch-management content. When Phase 54 ships, this section will be retrofitted with a direct
> cross-link to `docs/operations/patch-management/01-windows-wufb-rings.md`. In the interim,
> refer to Microsoft Learn Windows Autopatch documentation for ring topology guidance.

## Related Resources

- [Co-Management Overview](00-overview.md) — workload model + three slider states + Pilot Intune
  collection-scoping
- [Windows Tenant Attach](01-windows-tenant-attach.md) — tenant attach vs full co-management
  disambiguation (Windows Autopatch eligibility row)
- [Workload Slider Migration](02-windows-workload-sliders.md) — low-risk-first migration sequence
  with EP HIGH-RISK callout (relevant for Device Configuration implicit-switching scenario)

## External References

- [Windows Autopatch Prerequisites (Microsoft Learn)](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/prepare/windows-autopatch-prerequisites)
- [Co-Management Workloads (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/configmgr/comanage/workloads)
- [Windows Autopatch Overview (Microsoft Learn)](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/overview/windows-autopatch-overview)
