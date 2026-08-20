---
last_verified: 2026-08-20
review_by: 2026-10-19
applies_to: all
audience: admin
platform: Windows
---

> **Platform applicability:** This guide is Windows-specific (WUfB Update rings + Autopatch
> disambiguation + Hotpatch + driver/firmware). For the cross-platform overview, see
> [Patch Management Overview](00-overview.md).
> **macOS:** See [macOS DDM Update Enforcement](02-macos-update-enforcement.md).
> **iOS/iPadOS:** See [iOS Update Lifecycle](03-ios-update-lifecycle.md).
> **Android:** See [Android Patch Delivery](04-android-patch-delivery.md).

# Windows WUfB Rings + Hotpatch + Driver/Firmware

This guide is the Windows-specific patch management reference. It covers WUfB deployment ring
topology (the Windows Update client policy object in Intune) with deferral periods + deadline
enforcement, Windows Autopatch ring service-managed cohorts and their containment relationship with
the WUfB deployment ring model (see PITFALL-9), the Hotpatch servicing model enabled by default for
eligible devices from May 2026, and the disambiguation stub for the separate driver and firmware
update policy, whose full treatment is in
[Windows Driver and Firmware Updates](06-windows-driver-firmware-updates.md).

For the cross-platform comparison and Ring Terminology hub, see
[Patch Management Overview](00-overview.md).

<a id="wufb-deployment-rings"></a>
## WUfB Deployment Rings

A **WUfB deployment ring** is a Windows Update client policy in Intune (Intune > Devices >
Update rings) that configures deferral periods, deadlines, and restart behavior for Windows quality
and feature updates. Tenants assign devices to a WUfB deployment ring via Azure AD group targeting,
and devices on that WUfB deployment ring receive Microsoft updates per the configured deferral
cadence and deadline policy attached to the WUfB deployment ring. The product previously named
"Windows Update for Business" is now Windows Update client policies; `WUfB` survives only in the
reporting surface, Windows Update for Business reports.

**Source:** [Manage Windows Update for client policies](https://learn.microsoft.com/en-us/windows/deployment/update/waas-manage-updates-wufb) (updated 2025-10-02)

Configure WUfB deployment rings via **Intune > Devices > Windows > Update rings for Windows 10 and
later** (the Intune blade name retains "Update rings" as the policy-object label; treat each policy
object as one WUfB deployment ring). Each WUfB deployment ring carries its own deferral period for
quality updates, deferral period for feature updates, deadline (days), grace period, and
restart-behavior configuration.

| WUfB Deployment Ring | Deferral Period | Deadline (days) | Pilot Cohort | Validate Before Promotion |
|----------------------|-----------------|-----------------|--------------|---------------------------|
| Pilot WUfB deployment ring | 0 days quality / 0 days feature | 2 days | 50 representative devices | Reporting healthy in Intune > Devices > Update rings |
| Broad WUfB deployment ring | 7 days quality / 14 days feature | 7 days | Production fleet | All Pilot devices reporting Compliant; no driver regressions |

After the deadline elapses, the WUfB deployment ring policy can force-install pending updates and
trigger a reboot. Configure the restart-behavior options (auto-restart, snooze, deferral) on each
WUfB deployment ring to balance user experience against compliance posture. The aggressive 0-day
deferral on the Pilot WUfB deployment ring above is intentional, so regressions surface in the
50-device cohort before the Broad WUfB deployment ring picks up the same content seven days later.

**Promotion gate (Pilot WUfB deployment ring → Broad WUfB deployment ring):** Do not advance an
update from the Pilot WUfB deployment ring to the Broad WUfB deployment ring until all Pilot
devices report Compliant in Intune > Reports > Windows Updates and no driver-regression incidents
are open. The Broad WUfB deployment ring inherits the validated content; the WUfB deployment ring
policy object itself is not promoted (each WUfB deployment ring is a fixed policy object), only
the content advances by virtue of the longer deferral on the Broad WUfB deployment ring.

<a id="autopatch-disambiguation"></a>
## Windows Autopatch Rings (Disambiguation)

A **Windows Autopatch ring** is a service-managed device cohort — currently the Test Autopatch ring
and the Last Autopatch ring — that Windows Autopatch automatically rotates and gates on Microsoft's
behalf. Microsoft owns the Autopatch ring rotation cadence; admins do not configure deferral periods
or deadlines per Autopatch ring (those are service-managed). The Autopatch service places devices
into the Test Autopatch ring first, validates telemetry, then promotes them to the Last Autopatch
ring.

**Source:** [Windows Autopatch groups overview](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/deploy/windows-autopatch-groups-overview) (updated 2026-06-19)

The Autopatch ring topology is intentionally distinct from WUfB deployment ring topology:

- A **WUfB deployment ring** is an admin-owned Intune policy object with admin-configured deferral
  and deadline.
- An **Autopatch ring** is a service-managed cohort with Microsoft-controlled rotation cadence.

> **PITFALL-9 containment:** An Autopatch group is a container that *includes* an Update rings
> policy for Windows 10 and later among the policies it creates and assigns. When a tenant enables
> Windows Autopatch, the resulting Autopatch group takes over authorship of that Update rings
> policy: the WUfB deployment ring policy object still exists and still governs the device, but
> admins lose direct authorship of it once the Autopatch group owns it. A WUfB deployment ring left
> outside any Autopatch group stays admin-authored; a WUfB deployment ring pulled inside one becomes
> Autopatch-owned from that point forward, and its cadence now follows the Autopatch ring rotation
> instead of the admin-configured deferral.

This containment relationship is the load-bearing PITFALL-9 disambiguation. Losing direct
authorship of a WUfB deployment ring inside an Autopatch group causes update flapping, deadline
conflicts, and compliance-report drift if an admin edits the containing Update rings policy
directly after Autopatch has taken it over: the Windows Update Agent receives conflicting policy
verdicts from the admin-edited state and the Autopatch-managed state. Treat every WUfB deployment
ring inside an Autopatch group as Autopatch-owned going forward: make configuration changes through
the Autopatch group, not by editing the underlying WUfB deployment ring policy object directly.

**Source:** [Windows Autopatch groups overview](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/deploy/windows-autopatch-groups-overview) (updated 2026-06-19)

When migrating from WUfB deployment rings to Autopatch:

1. Validate the Windows Update workload is at Pilot Intune or Intune in co-management (per
   [Workload Slider Migration](../co-management/02-windows-workload-sliders.md)). Autopatch
   requires the WU workload to be Intune-authoritative.
2. Enable Windows Autopatch in Intune > Tenant administration > Windows Autopatch.
3. Confirm Autopatch ring assignments via Intune > Devices > Windows Autopatch > Devices. Each
   enrolled device should appear in exactly one Autopatch ring (Test or Last).
4. Decommission obsolete WUfB deployment ring policies once all devices have moved onto a Test or
   Last Autopatch ring inside an Autopatch group. A WUfB deployment ring policy left outside any
   Autopatch group after migration forms the PITFALL-9 gap: Autopatch takes over authorship only for
   WUfB deployment rings contained inside its group, so an un-contained WUfB deployment ring policy
   remains admin-authored and can drift out of sync with the Autopatch-managed devices it was
   written for. Retiring the stale WUfB deployment ring policy object once its devices are fully
   contained in an Autopatch group closes that gap.

<a id="hotpatch"></a>
## Hotpatch

Hotpatch is **enabled by default for eligible devices** — Microsoft's current documentation
describes default-on eligibility rather than the single admin-toggle model this guide previously
asserted. Hotpatch eliminates reboot-on-most-updates by patching kernel and OS-mode binaries
in-memory, reducing reboots from monthly to quarterly (a baseline reboot is still required for the
quarterly cumulative update that consolidates the in-memory hotpatches with the on-disk image).

**Configuration levels.** Hotpatch is configured at two levels, and the more specific one wins:

1. A **tenant-wide default** that applies to any device not targeted by a quality-update policy of
   its own.
2. A **per-policy setting**, attached to the Windows quality update policy, that overrides the
   tenant default for any device it targets.

This guide previously described a single **opt-out toggle** added to the Intune admin center in
**April 2026**, ahead of a **May 2026** default-on cutover for Windows 11 Enterprise 24H2+ devices —
that single-toggle, single-cutover framing is this guide's own prior position, not the current
first-party description of the two-level model above. Treat the specific April 2026 / May 2026
dates as this guide's own earlier framing rather than a confirmed Microsoft cutover schedule.

**Prerequisites:**

- An eligible license: Windows 11 Enterprise E3 or E5, Microsoft 365 F3, Windows 11 Education A3 or
  A5, Microsoft 365 Business Premium, or Windows 365 Enterprise — this guide's earlier
  **Windows 11 Pro** exclusion is not restated by the current article; treat it as unconfirmed
  rather than as a settled yes or no.
- **VBS** (Virtualization-Based Security) enabled at firmware + OS level — VBS must be turned on for
  a device to be offered hotpatch updates; without VBS the device falls back to the classic
  cumulative-update + reboot path.
- **Arm64 devices are supported.** Arm64 requires CHPE (Compiled Hybrid Portable Executable) binary
  servicing disabled first, via the `DisableCHPE` system policy CSP or by setting the registry DWORD
  `HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Memory Management` `HotPatchRestrictions=1`.
- Device targeted by the tenant-wide default or by a per-policy setting that enables Hotpatch.

**Rollback:** Automatic rollback of a hotpatch update is not supported; an admin can uninstall an
applied hotpatch, but doing so requires a device restart.

**Compliance reporting impact:** Hotpatch reduces reboot frequency from monthly to quarterly,
which changes the "reboot pending" compliance signal cadence. Existing reboot-based alerting that
fires on a monthly cadence will need re-baselining — the signal is expected quarterly post-Hotpatch
rather than monthly. Update health and pending-update compliance signals continue to fire monthly,
so admins should distinguish "reboot pending" (quarterly post-Hotpatch) from "update pending"
(still monthly) in dashboards and runbooks. Failing to re-baseline reboot-based alerting after this
guide's May 2026 cutover framing takes effect causes false-quiet alarms (no monthly reboot signal
does not mean devices are unpatched — it means Hotpatch is working).

**Source:** [Hotpatch updates](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/manage/windows-autopatch-hotpatch-updates) (updated 2026-06-02)
**Source:** [Configure hotpatch](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-hotpatch) (updated 2026-04-29)

<a id="driver-firmware-policy"></a>
## Driver and Firmware Update Policy

Driver and firmware updates are configured **separately** from quality and feature update policy —
a discrete update policy surface with its own targeting, approval workflow, and reporting. See
[Windows Driver and Firmware Updates](06-windows-driver-firmware-updates.md) for approval modes,
the approval workflow, deferral and deadline behavior, and Configuration Manager co-existence.

**This is NOT a ring** — neither a WUfB deployment ring nor an Autopatch ring. Treating
driver/firmware policy as if it were a WUfB deployment ring (and expecting it to inherit any WUfB
deployment ring deferral) or as if it were an Autopatch ring (and expecting service-managed
rotation) leads to misconfiguration. A driver/firmware policy will not honor any WUfB deployment
ring deferral, and Autopatch will not auto-rotate driver/firmware approvals on any Autopatch ring.

**Dual-scan source conflict pitfall:** When SCCM co-management still controls the Windows Update
workload (workload slider not yet at Pilot Intune or Intune; see
[Workload Slider Migration](../co-management/02-windows-workload-sliders.md)), the `dual-scan`
source conflict can cause WUfB driver/firmware updates to flap. Specifically:

- The Windows Update Agent receives both the SCCM-WSUS scan source (because the WU workload is
  still ConfigMgr-authoritative) AND the WUfB-cloud scan source (because the driver/firmware
  policy targets the device through Intune)
- For drivers and firmware specifically, the agent oscillates between the two source verdicts on
  successive scan cycles
- Symptom: drivers reported as "Available" then "Not applicable" then "Available" in successive
  scan cycles; user-visible flicker in Windows Update history; driver/firmware policy reports
  show alternating Pending/Installed states for the same device

**Mitigation options:**

1. Move the Windows Update workload to Pilot Intune or Intune via the workload slider (so SCCM no
   longer controls scan source). This is the strategic fix and aligns with Autopatch readiness.
2. Set the WUfB driver/firmware policy to "Block automatic driver delivery" until the WU workload
   migration completes — this disables WUfB-side driver delivery so the SCCM-WSUS source is the
   sole verdict.
   **Correction:** a driver and firmware policy has no such setting. The control with this effect
   lives on the WUfB deployment ring — see
   [Deferral and Deadline Behavior](06-windows-driver-firmware-updates.md#deferral-deadline-behavior).
3. **(Deprecated)** Use Group Policy to disable dual-scan during the transition
   (`HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\DisableDualScan = 1`) — note this
   disables ALL WUfB cloud scan, not just driver/firmware, so it should be a transitional measure
   only.
   **Source:** [Windows Autopatch FAQ](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/overview/windows-autopatch-faq) (updated 2026-05-28)
4. Keep the Windows Update workload on Configuration Manager while approving drivers and firmware
   from Intune — see [Configuration Manager co-existence](06-windows-driver-firmware-updates.md#configmgr-coexistence).

Validate the chosen mitigation by re-running a scan cycle and confirming driver/firmware policy
report state stabilizes across at least three consecutive scan cycles.

## Related Resources

- [Patch Management Overview](00-overview.md) — Cross-platform comparison + Ring Terminology hub
- [macOS DDM Update Enforcement](02-macos-update-enforcement.md) — macOS forward path
- [iOS Update Lifecycle](03-ios-update-lifecycle.md) — iOS DDM
- [Android Patch Delivery](04-android-patch-delivery.md) — Android attestation gate
- [Windows Driver and Firmware Updates](06-windows-driver-firmware-updates.md) — Approval modes,
  approval workflow, deferral and deadline behavior, Configuration Manager co-existence, and the
  documented absences
- [Workload Slider Migration](../co-management/02-windows-workload-sliders.md) — Co-management
  workload migration sequence (PATCH-03 dual-scan dependency)
- [Migration Paths and Autopatch](../co-management/03-cocmgmt-migration-paths.md) — Windows
  Autopatch prerequisites

## External References

- [WUfB Documentation (Microsoft Learn)](https://learn.microsoft.com/en-us/windows/deployment/update/waas-configure-wufb)
- [Windows Autopatch (Microsoft Learn)](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch)
- [Hotpatch Overview (Microsoft Learn)](https://learn.microsoft.com/en-us/windows/deployment/update/hotpatch-overview)
- [WUfB Driver Updates (Microsoft Learn)](https://learn.microsoft.com/en-us/windows/deployment/update/waas-driver-wufb)
