---
last_verified: 2026-08-23
review_by: 2026-10-22
applies_to: all
audience: admin
platform: Windows
---

> **Platform applicability:** This guide is Windows-specific and covers the Windows Autopatch
> service as its own surface — enrollment and service prerequisites, the Autopatch group model and
> the Test / Last deployment rings, the containment position, the update workloads and their service
> objectives, the entitlement comparison between Autopatch and Hotpatch, and the Autopatch-specific
> reporting surfaces. For the cross-platform overview, see
> [Patch Management Overview](00-overview.md). For WUfB deployment ring topology and the Autopatch
> ring disambiguation, see [Windows WUfB Rings](01-windows-wufb-rings.md#autopatch-disambiguation).
> For the in-memory Hotpatch servicing model, see
> [Windows WUfB Rings](01-windows-wufb-rings.md#hotpatch).

# Windows Autopatch

This guide covers the Windows Autopatch service as a policy and management surface in its own
right — what the service is, how a device becomes eligible for it, how the Autopatch group model
works, how it relates to the Windows Update client policies it manages, which application-update
workloads it covers and to what service objective, how an Autopatch entitlement compares against a
Hotpatch entitlement, and what the service reports.

Ring topology and the Autopatch-versus-standalone-rings disambiguation are authored in
[Windows WUfB Rings](01-windows-wufb-rings.md#autopatch-disambiguation) and are not re-authored
here. The co-management workload-slider prerequisites that Autopatch enablement depends on are
authored in
[Migration Paths and Autopatch](../co-management/03-cocmgmt-migration-paths.md#autopatch-prerequisites);
this guide owns only the Autopatch **service** prerequisites that file has never carried. Driver and
firmware update policy, including how it behaves once a device is Autopatch-managed, is authored in
[Windows Driver and Firmware Updates](06-windows-driver-firmware-updates.md).

<a id="what-autopatch-is-and-is-not"></a>
## What Windows Autopatch Is and Is Not

Windows Autopatch is a cloud service, not a policy object an administrator configures once and
leaves alone. It automates the deployment of Windows quality and feature updates, Microsoft 365
Apps for enterprise updates, Microsoft Edge updates, and Microsoft Teams updates to enrolled devices
using its own service-managed rollout sequencing.

An Autopatch group is the unit that carries out that automation:

> "An Autopatch group is a logical container or unit that groups several Microsoft Entra groups,
> and software update policies, such as Update rings policy for Windows 10 and later, feature
> updates for Windows 10 and later policies, driver update policies, Microsoft 365 App update
> policies, and Microsoft Edge update policies."

**Source:** [Windows Autopatch groups overview](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/deploy/windows-autopatch-groups-overview) (updated 2025-06-17)

Stated positively: an Autopatch group **contains** a standalone Update rings policy for Windows 10
and later rather than existing as a separate, unrelated surface beside it. Enabling Windows
Autopatch does not replace WUfB deployment ring topology — the resulting Autopatch group takes over
authorship of the update-rings policy objects it contains. What a WUfB deployment ring is, how it
differs from an Autopatch ring, and what changes about a WUfB deployment ring once an Autopatch
group contains it, is authored in
[Windows WUfB Rings](01-windows-wufb-rings.md#autopatch-disambiguation). This guide does not
re-author that topology; it documents the Autopatch service that sits on top of it.

Prerequisites for Autopatch enablement span two files, and the precedence between them is firm.
[Migration Paths and Autopatch](../co-management/03-cocmgmt-migration-paths.md#autopatch-prerequisites)
owns the co-management **workload-slider** chain — which workloads must be at Pilot Intune or Intune
before Autopatch can be enabled. This guide owns the Autopatch **service** prerequisites that file
has never carried: the Entra ID licensing floor, the corporate-owned-device requirement, the device
check-in window, diagnostic-data levels, the Long-Term Servicing Channel restriction, app-only
authentication, and the Entra-group-type restriction. See
[Enrollment and Prerequisites](#enrollment-prerequisites) for the full list.

<a id="enrollment-prerequisites"></a>
## Enrollment and Prerequisites

Windows Autopatch enrollment depends on a set of Autopatch **service** prerequisites that sit
alongside, and are separate from, the co-management workload-slider chain
[Migration Paths and Autopatch](../co-management/03-cocmgmt-migration-paths.md#autopatch-prerequisites)
already documents.

**Entra ID and Intune.**

> "Microsoft Entra ID P1 or P2 and Microsoft Intune are required."

**Source:** [Windows Autopatch prerequisites](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/prepare/windows-autopatch-prerequisites) (updated 2026-02-27)

**Device management and corporate ownership.** Devices must already be enrolled with Intune, and
management by Configuration Manager alone is explicitly excluded:

> "Devices must be managed by either Intune or Configuration Manager co-management. Devices only
> managed by Configuration Manager aren't supported."

Corporate ownership is a registration gate, not a recommendation:

> "Devices must be corporate-owned. Windows bring-your-own-devices (BYOD) are blocked during device
> registration prerequisite checks."

**Source:** [Windows Autopatch prerequisites](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/prepare/windows-autopatch-prerequisites) (updated 2026-02-27)

**The 28-day check-in requirement.**

> "Devices must be in communication with Microsoft Intune in the last 28 days. Otherwise, the
> devices aren't registered with Autopatch."

**Source:** [Windows Autopatch prerequisites](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/prepare/windows-autopatch-prerequisites) (updated 2026-02-27)

**Diagnostic data.** Deployment protection features carry their own floor, distinct from the general
Entra ID and Intune requirement above:

> "For these features, at minimum, the deployment service requires devices to send diagnostic data
> at the Required level (previously called Basic) for these features."

The page names a higher recommended level per Windows version to unlock the full deployment
protections — Optional (previously Full) diagnostic data for Windows 11 devices, and Enhanced
diagnostic data for Windows 10 devices — rather than one fixed level across the whole fleet.

**Source:** [Windows Autopatch prerequisites](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/prepare/windows-autopatch-prerequisites) (updated 2026-02-27)

**The Long-Term Servicing Channel restriction.** Registration is supported for LTSC devices, but
what the service manages afterward is narrower than for a General Availability Channel device:

> "Windows Autopatch supports registering Windows 10 and Windows 11 Long-Term Servicing Channel
> (LTSC) devices that are being currently serviced by the Windows 10 LTSC or Windows 11 LTSC. The
> service only supports managing the Windows quality updates workload for devices currently serviced
> by the LTSC. Windows Update client policies and Windows Autopatch don't offer Windows feature
> updates for devices that are part of the LTSC."

**Source:** [Windows Autopatch prerequisites](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/prepare/windows-autopatch-prerequisites) (updated 2026-02-27)

**Configuration Manager co-management.** Where Configuration Manager is present at all, it must be
cloud-attached:

> "Configuration Manager must be cloud-attached with Intune (co-management)"

**Source:** [Windows Autopatch prerequisites](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/prepare/windows-autopatch-prerequisites) (updated 2026-02-27)

**App-only authentication and the Entra group-type restriction.** Both requirements are named on
Autopatch's own group-management page rather than the prerequisites page, and both are easy to miss
because neither is phrased in the same blocking-prerequisite voice as the items above:

> "Make sure you have app-only auth turned on in your Windows Autopatch tenant. Otherwise, the
> Autopatch groups functionality doesn't work properly."

> "Autopatch groups doesn't support user-based Microsoft Entra groups."

**Source:** [Windows Autopatch groups overview](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/deploy/windows-autopatch-groups-overview) (updated 2025-06-17)

**Licensing and entitlement tiers.** Windows Autopatch is available to four license families, and
the same core update-management feature set is available across all four:

| Feature | Business Premium | A3+ | E3+ | F3 |
|---|---|---|---|---|
| Releases | ✔️ | ✔️ | ✔️ | ✔️ |
| Update rings | ✔️ | ✔️ | ✔️ | ✔️ |
| Quality updates | ✔️ | ✔️ | ✔️ | ✔️ |
| Feature updates | ✔️ | ✔️ | ✔️ | ✔️ |
| Support requests | ❌ | ❌ | ✔️ | ✔️ |

Support requests to the Autopatch Service Engineering Team are the one feature restricted to the
higher tiers; every other row in the feature-entitlement matrix is available across all four
licenses.

**Source:** [Windows Autopatch prerequisites](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/prepare/windows-autopatch-prerequisites) (updated 2026-02-27)

Windows Autopatch also removed a separate feature-activation step for these tiers:

> "In April 2025, Windows Autopatch removed feature activation and made Windows Autopatch features
> available to Business Premium and A3+ licenses. These changes are rolling out over the next
> several weeks."

**Source:** [What is Windows Autopatch?](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/overview/windows-autopatch-overview) (updated 2026-07-13)

### The documented conflict

The prerequisites page names exactly two co-management workloads in its general Device management
row:

> "At a minimum, the Windows Update and Device configuration workloads must be set to Pilot Intune
> or Intune."

Its own Configuration Manager co-management requirements section, further down the same page,
refers to a third workload without ever naming it:

> "Must have the following co-management workloads enabled and set to either Intune or Pilot Intune:
> Windows Update policies workload / Device configuration workload" ... "If you're using Pilot
> Intune, in the Staging tab, the device must be in the collections that correspond to the three
> workloads that Windows Autopatch requires."

**Source:** [Windows Autopatch prerequisites](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/prepare/windows-autopatch-prerequisites) (updated 2026-02-27)

The page does not settle its own count: it names two workloads by name in both places it lists
them, and separately references "the three workloads" without ever naming a third. This guide
asserts nothing about the identity of the unnamed third workload — Office and Click-to-Run each
occur zero times on this page, and filling the gap from general co-management documentation would
be an invention this guide does not make.

[Migration Paths and Autopatch](../co-management/03-cocmgmt-migration-paths.md#autopatch-prerequisites)
states the workload-slider chain in its own voice; this guide's role is to name the source page's
inconsistency, not to resolve it or to restate that file's wording.

<a id="autopatch-groups-test-last"></a>
## Autopatch Groups and the Test / Last Model

Every Autopatch group carries two default deployment rings automatically, and they are structural
rather than configurable:

> "Both the Test and Last deployment rings are default deployment rings that are automatically
> present in an Autopatch group. These default deployment rings provide the recommended minimum
> number of deployment rings that an Autopatch group should have."

> "Both the Test and Last deployment rings can't be removed or renamed from Autopatch groups.
> Autopatch groups don't support the use of one single deployment ring as part of its deployment
> ring composition because you need at least two deployment rings for their gradual rollout."

**Source:** [Windows Autopatch groups overview](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/deploy/windows-autopatch-groups-overview) (updated 2025-06-17)

If no further rings are added, Test functions as the pilot cohort and Last as the production
cohort. A tenant may add more — up to **15 deployment rings per Autopatch group** — and may run up
to **300 Autopatch groups** in total:

> "You can set up to 15 deployment rings per Autopatch group."

> "Windows Autopatch supports up to 300 Autopatch groups in your tenant. Each Autopatch group
> supports up to 15 deployment rings."

**Source:** [Windows Autopatch groups overview](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/deploy/windows-autopatch-groups-overview) (updated 2025-06-17)

Device distribution into deployment rings uses one of two models:

> "Dynamic: You can use one or more device-based Microsoft Entra groups, either dynamic query-based
> or assigned to use in your deployment ring composition." / "Assigned: You can use one single
> device-based Microsoft Entra group, either dynamic query-based, or assigned to use in your
> deployment ring composition."

The Test and Last deployment rings specifically cannot combine the two: "The combination of Dynamic
and Assigned device distribution is not supported for the Test and Last deployment ring in Autopatch
groups."

**Source:** [Windows Autopatch groups overview](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/deploy/windows-autopatch-groups-overview) (updated 2025-06-17)

**The containment position, in full.** An Autopatch group is a container that includes a standalone
Update rings policy for Windows 10 and later — alongside feature-update policies, driver update
policies, Microsoft 365 App update policies, and Microsoft Edge update policies — among the software
update policies it creates and assigns. The Test / Last ring model above is the ring model for
everything the Autopatch group contains; it is not a separate ring system layered on top of WUfB
deployment ring topology. See [Windows WUfB Rings](01-windows-wufb-rings.md#autopatch-disambiguation)
for how a WUfB deployment ring's authorship changes once an Autopatch group contains it; this guide
does not restate that topology.

<a id="autopatch-and-update-client-policies"></a>
## Autopatch and Windows Update Client Policies

Once a WUfB deployment ring policy for Windows 10 and later is contained inside an Autopatch group,
the Autopatch group owns its ongoing authorship. An administrator who continues to edit that Update
rings policy object directly, rather than through the Autopatch group, is editing a policy the
Autopatch group already owns — the direct edit can be overwritten the next time the Autopatch group
manages that policy. The operational rule going forward is to make configuration changes for a
contained WUfB deployment ring through the Autopatch group, not by editing the underlying policy
object.

This relationship, including its operational failure mode, is documented in full in
[Windows WUfB Rings](01-windows-wufb-rings.md#autopatch-disambiguation). This guide states the rule
from the Autopatch-group side and does not duplicate the WUfB deployment ring topology or the
failure-mode detail already authored there.

<a id="update-workloads-objectives"></a>
## Update Workloads and Service Objectives

Windows Autopatch publishes a service objective for each update workload it manages, rather than a
single blanket target across all of them.

**Windows quality updates.**

> "Aims to keep at least 95% of Up to Date devices on the latest quality update."

**Source:** [What is Windows Autopatch?](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/overview/windows-autopatch-overview) (updated 2026-07-13)

**Microsoft 365 Apps for enterprise.** Autopatch does not merely track a device's assigned channel —
it steers eligible devices toward one specific channel:

> "Windows Autopatch aims to keep at least 90% of eligible devices on a supported version of the
> Monthly Enterprise Channel (MEC)."

**Source:** [What is Windows Autopatch?](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/overview/windows-autopatch-overview) (updated 2026-07-13)

This is a real constraint on channel choice, not a preference: because an Autopatch-enrolled device
is steered toward the Monthly Enterprise Channel, and a device can run only one Microsoft 365 Apps
update channel at a time, enabling Autopatch effectively pins the channel decision for that device.
Any channel choice made elsewhere for an Autopatch-managed device works against, rather than
alongside, this 90% MEC objective.

**Microsoft Edge.**

> "Windows Autopatch configures eligible devices to benefit from Microsoft Edge's progressive
> rollouts on the Stable channel."

**Source:** [What is Windows Autopatch?](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/overview/windows-autopatch-overview) (updated 2026-07-13)

**Microsoft Teams.**

> "Windows Autopatch allows eligible devices to benefit from the standard automatic update channel."

**Source:** [What is Windows Autopatch?](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/overview/windows-autopatch-overview) (updated 2026-07-13)

Microsoft Edge and Microsoft Teams update coverage for an Autopatch-enrolled fleet is owned by this
section; no other guide in this corpus documents either workload's Autopatch-specific update
behavior.

<a id="autopatch-hotpatch-licensing"></a>
## Autopatch and Hotpatch

Windows Autopatch is available to one set of licenses. Hotpatch, a separate update-delivery
capability, is available to an overlapping but not identical set. Both lists are shown here in full,
each from its own page.

**Autopatch entitlement.**

> "Windows Autopatch is available to the following licenses:"
>
> - Microsoft 365 Business Premium (for more information on available licenses, see Microsoft 365 licensing)
> - Windows 10/11 Education A3 or A5 (included in Microsoft 365 A3 or A5)
> - Windows 10/11 Enterprise E3 or E5 (included in Microsoft 365 F3, E3, or E5)
> - **Windows 10/11 Enterprise E3 or E5 VDA**

**Source:** [Windows Autopatch prerequisites](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/prepare/windows-autopatch-prerequisites) (updated 2026-02-27)

**Hotpatch entitlement.**

> "One of the eligible licenses: Windows 11 Enterprise E3 or E5, Microsoft 365 F3, Windows 11
> Education A3 or A5, Microsoft 365 Business Premium, or **Windows 365 Enterprise**"

**Source:** [Hotpatch updates](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/manage/windows-autopatch-hotpatch-updates) (updated 2026-06-02)

The two lists genuinely differ, in three ways. Autopatch's list carries **Windows 10/11 Enterprise
E3 or E5 VDA**, which the Hotpatch list omits. The Hotpatch list carries **Windows 365 Enterprise**,
which the Autopatch list omits. And the Hotpatch list is Windows 11-only, where the Autopatch list
spans Windows 10 and 11.

An Autopatch entitlement is **necessary but not sufficient** for Hotpatch: holding one of the four
Autopatch-eligible licenses does not by itself put a device on the Hotpatch eligible-license list,
because the two lists diverge on exactly the VDA and Windows 365 Enterprise rows above. Confirming
Hotpatch eligibility requires checking the Hotpatch license list directly rather than assuming
Autopatch enrollment settles the question.

**Windows 11 Pro.** Whether a Windows 11 Pro device with an otherwise-eligible license receives
Hotpatch stays unconfirmed: the Hotpatch page states its prerequisite as the license list quoted
above, never as an edition list, and "Windows 11 Pro" does not occur on that page at all. This guide
mirrors the same unconfirmed treatment already given in
[Windows WUfB Rings](01-windows-wufb-rings.md#hotpatch) rather than settling the question in either
direction.

<a id="autopatch-reporting"></a>
## Reporting and Communications

Windows Autopatch reporting is scoped to the workloads the service itself manages. Driver and
firmware update reporting is a separate, disjoint surface — see
[Windows Driver and Firmware Updates](06-windows-driver-firmware-updates.md#driver-update-reporting).

**Hotpatch quality update report.**

> "Hotpatch quality update report provides a per policy level view of the current update statuses
> for all devices that receive Hotpatch updates."

**Source:** [What is Windows Autopatch?](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/overview/windows-autopatch-overview) (updated 2026-07-13)

**Enhanced Windows quality and feature update reports and device alerts.**

> "Using Windows quality and feature update reports, you can monitor and remediate managed devices
> that are Not up to Date and resolve any device alerts to bring managed devices back into
> compliance."

**Source:** [What is Windows Autopatch?](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/overview/windows-autopatch-overview) (updated 2026-07-13)

**Autopatch groups membership report.** Device registration state and readiness for an Autopatch
group are surfaced through this report:

> "Autopatch groups register devices on your behalf, and device readiness states are determined
> based on the registration state and if any applicable alerts are targeting the device. For more
> information, see the Autopatch groups membership report."

**Source:** [Windows Autopatch groups overview](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/deploy/windows-autopatch-groups-overview) (updated 2025-06-17)

**Communications.** Service announcements, release schedules and status communications are
delivered through Microsoft's tenant-wide messaging surface rather than a dedicated Autopatch
channel:

> "To stay informed of upcoming changes, including new and changed features, planned maintenance,
> release and status communications, or other important announcements, navigate to Microsoft 365
> admin center > Message center."

**Source:** [What is Windows Autopatch?](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/overview/windows-autopatch-overview) (updated 2026-07-13)

<a id="unsupported-callouts"></a>
## Unsupported and Anti-Feature Callouts

**No Windows feature updates for LTSC devices.** A registered LTSC device receives only the Windows
quality updates workload from Windows Autopatch; Windows Update client policies and Windows
Autopatch do not offer Windows feature updates for LTSC devices at all. See
[Enrollment and Prerequisites](#enrollment-prerequisites).

**Entra groups used with Autopatch groups cannot be user-based.** Only device-based Microsoft Entra
groups are supported for Autopatch group and deployment-ring composition. See
[Enrollment and Prerequisites](#enrollment-prerequisites).

**Windows 11 Pro hotpatch eligibility is unconfirmed.** The sole first-party Hotpatch prerequisites
page states its license requirement as a license list, not an edition list, and "Windows 11 Pro"
does not occur on that page. This guide does not assert Pro eligibility or ineligibility. See
[Autopatch and Hotpatch](#autopatch-hotpatch-licensing).

**The Autopatch prerequisites page does not settle its own workload count.** It names two
co-management workloads by name and separately references "the three workloads that Windows
Autopatch requires" without ever naming a third. This is an unresolved documentation state on
Microsoft's own page, not a corpus gap this guide fills. See
[Enrollment and Prerequisites](#enrollment-prerequisites).

**Autopatch availability in sovereign clouds is not stated by any first-party page this guide
cites.** No statement of Windows Autopatch availability or exclusion in Government Community Cloud
(GCC) High or Department of Defense (DoD) environments was found on those pages. This guide asserts
neither availability nor exclusion for those environments.

## Related Resources

- [Patch Management Overview](00-overview.md) — Cross-platform comparison and Ring Terminology hub
- [Windows WUfB Rings](01-windows-wufb-rings.md) — WUfB deployment ring topology, the Autopatch ring
  disambiguation, and the Hotpatch servicing model
- [Windows Driver and Firmware Updates](06-windows-driver-firmware-updates.md) — Driver and firmware
  update policy and its reporting surfaces
- [Migration Paths and Autopatch](../co-management/03-cocmgmt-migration-paths.md) — Co-management
  workload-slider prerequisites for Autopatch enablement

## External References

- [Windows Autopatch groups overview (Microsoft Learn)](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/deploy/windows-autopatch-groups-overview)
- [What is Windows Autopatch? (Microsoft Learn)](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/overview/windows-autopatch-overview)
- [Windows Autopatch prerequisites (Microsoft Learn)](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/prepare/windows-autopatch-prerequisites)
- [Hotpatch updates (Microsoft Learn)](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/manage/windows-autopatch-hotpatch-updates)
