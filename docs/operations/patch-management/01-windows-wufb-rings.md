---
last_verified: 2026-04-28
review_by: 2026-06-27
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
topology (the Windows Update for Business policy object in Intune) with deferral periods +
deadline enforcement, Windows Autopatch ring service-managed cohorts and disambiguation from the
WUfB deployment ring model (PITFALL-9 mutual-exclusion is explicit), the Hotpatch servicing model
defaulting on for Windows 11 Enterprise 24H2+ from May 2026, and the separate driver and firmware
update policy surface.

For the cross-platform comparison and Ring Terminology hub, see
[Patch Management Overview](00-overview.md).

## WUfB Deployment Rings {#wufb-deployment-rings}

A **WUfB deployment ring** is a Windows Update for Business policy in Intune (Intune > Devices >
Update rings) that configures deferral periods, deadlines, and restart behavior for Windows quality
and feature updates. Tenants assign devices to a WUfB deployment ring via Azure AD group targeting,
and devices on that WUfB deployment ring receive Microsoft updates per the configured deferral
cadence and deadline policy attached to the WUfB deployment ring.

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

## Windows Autopatch Rings (Disambiguation) {#autopatch-disambiguation}

A **Windows Autopatch ring** is a service-managed device cohort (Test, First, Fast, and Broad
Autopatch rings) that Windows Autopatch automatically rotates and gates on Microsoft's behalf.
Microsoft owns the Autopatch ring rotation cadence; admins do not configure deferral periods or
deadlines per Autopatch ring (those are service-managed). The Autopatch service places devices
into the Test Autopatch ring first, validates telemetry, then progressively moves cohorts through
the First Autopatch ring, the Fast Autopatch ring, and finally the Broad Autopatch ring.

The Autopatch ring topology is intentionally distinct from WUfB deployment ring topology:

- A **WUfB deployment ring** is an admin-owned Intune policy object with admin-configured deferral
  and deadline.
- An **Autopatch ring** is a service-managed cohort with Microsoft-controlled rotation cadence.

> **PITFALL-9 mutual exclusion:** WUfB deployment rings and Autopatch rings are **mutually exclusive**
> — they cannot coexist on the same device. When a tenant enables Windows Autopatch, Autopatch
> detaches enrolled devices from any pre-existing WUfB deployment ring assignment and takes
> ownership of the Windows Update workload for those devices. A single device is on EITHER a WUfB
> deployment ring OR an Autopatch ring — never both simultaneously. Adopting Autopatch delegates
> WUfB deployment ring management to Microsoft and replaces any custom WUfB deployment ring
> assignment with a service-managed Autopatch ring assignment.

This mutual-exclusion is the load-bearing PITFALL-9 disambiguation. Mixing the two systems on the
same device causes update flapping, deadline conflicts, and compliance-report drift because the
Windows Update Agent receives conflicting policy verdicts: the WUfB deployment ring policy still
attached to the device says "defer N days" while the Autopatch ring service says "install now per
service-managed cadence." Plan one system per device fleet — never overlap WUfB deployment ring
assignment with Autopatch ring assignment on a single device.

When migrating from WUfB deployment rings to Autopatch:

1. Validate the Windows Update workload is at Pilot Intune or Intune in co-management (per
   [Workload Slider Migration](../co-management/02-windows-workload-sliders.md)). Autopatch
   requires the WU workload to be Intune-authoritative.
2. Enable Windows Autopatch in Intune > Tenant administration > Windows Autopatch.
3. Confirm Autopatch ring assignments via Intune > Devices > Windows Autopatch > Devices. Each
   enrolled device should appear in exactly one Autopatch ring (Test, First, Fast, or Broad).
4. Decommission obsolete WUfB deployment ring policies once all devices have moved onto a
   service-managed Autopatch ring. Stale WUfB deployment ring policies left attached to
   Autopatch-managed devices form the PITFALL-9 violation surface. Even though Autopatch detaches
   each WUfB deployment ring assignment at the device level, retaining a stale policy object on
   any WUfB deployment ring in Intune invites future re-assignment errors.

## Hotpatch {#hotpatch}

Windows 11 Enterprise 24H2+ ships with **Hotpatch as the default servicing model from May 2026**
onwards. Hotpatch eliminates reboot-on-most-updates by patching kernel and OS-mode binaries
in-memory, reducing reboots from monthly to quarterly (a baseline reboot is still required for the
quarterly cumulative update that consolidates the in-memory hotpatches with the on-disk image).

**Prerequisites:**

- Windows 11 Enterprise edition (24H2 or later) — Hotpatch is not available on Windows 11 Pro or
  on prior Windows 11 feature updates
- VBS (Virtualization-Based Security) enabled at firmware + OS level — Hotpatch requires VBS to
  validate kernel-binary patches in memory before applying them; without VBS the device falls back
  to the classic monthly cumulative-update + reboot path
- Eligible processor (verify via Intune compliance report or `msinfo32` System Summary > "Hotpatch
  available" field on supported builds)
- Device assigned to a WUfB deployment ring with Hotpatch enabled, OR to an Autopatch ring on a
  Hotpatch-eligible servicing tier

**Default-on behavior (May 2026 onwards):** From May 2026, eligible Windows 11 Enterprise 24H2+
devices receive Hotpatch by default without admin intervention — the prior opt-in model is
inverted. Devices that meet all prerequisites enter the Hotpatch servicing path automatically on
the May 2026 cumulative update train.

**Opt-out toggle (April 2026 Intune admin center addition):** Tenants can opt out of default-on
Hotpatch via **Intune > Devices > Update rings > [select WUfB deployment ring] > Hotpatch toggle**.
Setting the toggle to off restores classic monthly cumulative-update + reboot behavior for devices
on that WUfB deployment ring. The opt-out toggle landed in the Intune admin center in April 2026,
one month ahead of the May 2026 default-on cutover, to give tenants a configuration surface before
the behavior flips. Autopatch-managed devices follow the Autopatch ring servicing tier rather than
the WUfB deployment ring opt-out toggle; opting an Autopatch-managed device out of Hotpatch
requires moving its Autopatch ring assignment to a non-Hotpatch tier (or removing it from
Autopatch). The Hotpatch toggle attached to a WUfB deployment ring policy only governs devices
targeted by that WUfB deployment ring policy (and not by any Autopatch ring assignment).

**Compliance reporting impact:** Hotpatch reduces reboot frequency from monthly to quarterly,
which changes the "reboot pending" compliance signal cadence. Existing reboot-based alerting that
fires on a monthly cadence will need re-baselining — the signal is expected quarterly post-Hotpatch
rather than monthly. Update health and pending-update compliance signals continue to fire monthly
per Microsoft's Hotpatch + LCU servicing model, so admins should distinguish "reboot pending"
(quarterly post-Hotpatch) from "update pending" (still monthly) in dashboards and runbooks. Failing
to re-baseline reboot-based alerting after the May 2026 cutover causes false-quiet alarms (no
monthly reboot signal does not mean devices are unpatched — it means Hotpatch is working).

## Driver and Firmware Update Policy {#driver-firmware-policy}

Driver and firmware updates are configured **separately** from quality and feature update policy.
A driver/firmware policy is not part of any WUfB deployment ring or any Autopatch ring; it is a
discrete update policy surface with its own targeting, approval workflow, and reporting. The
configuration surface is **Intune > Devices > Windows > Driver and firmware updates** (or Intune >
Devices > Update policies for Windows 10 and later > Driver and firmware updates, depending on
Intune blade version at the time of access). Driver and firmware policies have their own approval
cadence (manual driver approval; automatic firmware delivery for OEM-published catalogs) that is
decoupled from any quality/feature update deferral on a WUfB deployment ring.

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

**Mitigation options (pick one):**

1. Move the Windows Update workload to Pilot Intune or Intune via the workload slider (so SCCM no
   longer controls scan source). This is the strategic fix and aligns with Autopatch readiness.
2. Set the WUfB driver/firmware policy to "Block automatic driver delivery" until the WU workload
   migration completes — this disables WUfB-side driver delivery so the SCCM-WSUS source is the
   sole verdict.
3. Use Group Policy to disable dual-scan during the transition
   (`HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\DisableDualScan = 1`) — note this
   disables ALL WUfB cloud scan, not just driver/firmware, so it should be a transitional measure
   only.

Validate the chosen mitigation by re-running a scan cycle and confirming driver/firmware policy
report state stabilizes across at least three consecutive scan cycles.

## Related Resources

- [Patch Management Overview](00-overview.md) — Cross-platform comparison + Ring Terminology hub
- [macOS DDM Update Enforcement](02-macos-update-enforcement.md) — macOS forward path
- [iOS Update Lifecycle](03-ios-update-lifecycle.md) — iOS DDM
- [Android Patch Delivery](04-android-patch-delivery.md) — Android attestation gate
- [Workload Slider Migration](../co-management/02-windows-workload-sliders.md) — Co-management
  workload migration sequence (PATCH-03 dual-scan dependency)
- [Migration Paths and Autopatch](../co-management/03-cocmgmt-migration-paths.md) — Windows
  Autopatch prerequisites

## External References

- [WUfB Documentation (Microsoft Learn)](https://learn.microsoft.com/en-us/windows/deployment/update/waas-configure-wufb)
- [Windows Autopatch (Microsoft Learn)](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch)
- [Hotpatch Overview (Microsoft Learn)](https://learn.microsoft.com/en-us/windows/deployment/update/hotpatch-overview)
- [WUfB Driver Updates (Microsoft Learn)](https://learn.microsoft.com/en-us/windows/deployment/update/waas-driver-wufb)
