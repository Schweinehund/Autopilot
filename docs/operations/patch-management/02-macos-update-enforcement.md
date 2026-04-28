---
last_verified: 2026-04-28
review_by: 2026-06-27
applies_to: all
audience: admin
platform: macOS
---

> **Platform applicability:** This guide is macOS-specific (DDM "Software Update Enforce Latest"
> in Intune Settings Catalog; legacy MDM command deprecation + Apple OS 26 removal). For the
> cross-platform overview, see [Patch Management Overview](00-overview.md).
> **Windows:** See [Windows WUfB Rings](01-windows-wufb-rings.md).
> **iOS/iPadOS:** See [iOS Update Lifecycle](03-ios-update-lifecycle.md).
> **Android:** See [Android Patch Delivery](04-android-patch-delivery.md).

# macOS Update Enforcement: DDM Software Update Enforce Latest

This guide is the macOS-specific patch and update enforcement reference. It covers the
**Declarative Device Management (DDM)** "Software Update Enforce Latest" enforcement primitive
configured via Intune Settings Catalog — the only forward-compatible enforcement path for macOS
update enforcement post-Apple-OS-26 release. Legacy MDM commands and configuration profile
payloads (`forceDelayedSoftwareUpdates`, `com.apple.SoftwareUpdate`, `ScheduleOSUpdate`) are
deprecated and removed with Apple OS 26.

For the cross-platform comparison, see [Patch Management Overview](00-overview.md).

## DDM Software Update Enforcement {#ddm-enforcement}

DDM "**Software Update Enforce Latest**" (configured in **Intune Settings Catalog** under macOS
configuration profiles) is the **DDM** declarative-management primitive for macOS update
enforcement. This is the only **forward-compatible** enforcement path post-Apple-OS-26 — Apple
deprecates and removes the legacy MDM-command-based enforcement primitives with Apple OS 26 (see
[Deadlines & Cutover Dates](#deadlines-cutover-dates) below).

**Configuration path (Intune Settings Catalog):**

1. Intune > Devices > macOS > Configuration profiles > Create profile
2. Profile type: **Settings catalog**
3. Add settings > Categories > **Declarative Device Management**
4. Select **Software Update** > **Enforce Latest** assertion
5. Configure target version + grace period + deadline behavior
6. Assign to macOS device group

**DDM enforcement model:** The OS itself enforces the target version declaratively. The MDM server
(Intune) declares "device must be on macOS X.Y by date Z" and the OS handles installation,
restart, and user notification per the declared assertion. This differs from legacy MDM command
sending where the server pushed an explicit command to install.

**Eligibility:** macOS 14.0+ supports the DDM software update assertion. macOS 13 and earlier
must use legacy MDM commands [HARD-DEADLINE — see Deadlines H2] until upgrading to macOS 14+ —
this is a forced-migration window: any macOS 13 fleet not yet on macOS 14+ at Apple OS 26 release
loses MDM-driven update enforcement entirely.

## Deferral vs Enforcement (macOS)

macOS update tooling has historically conflated two distinct primitives:

- **Deferral** — Tenant-side delay before user can install an update. Configured via the legacy
  MDM restriction `forceDelayedSoftwareUpdates` [HARD-DEADLINE — see Deadlines H2] (set in
  configuration profile payload). Pre-Apple-OS-26 this restriction still functions: tenants can
  defer minor updates 1-90 days. With Apple OS 26 release this restriction is removed.
- **Enforcement** — Tenant-side hard requirement that OS install update by deadline.
  Pre-Apple-OS-26 enforcement was via the `ScheduleOSUpdate` MDM command. Post-Apple-OS-26
  enforcement is via DDM "Software Update Enforce Latest" only.

The DDM model collapses both primitives: the declarative "enforce latest by date Z" assertion
implies both deferral (until date Z) and enforcement (by date Z). Tenants migrating from legacy
MDM commands to DDM should plan to retire the deferral-as-restriction pattern and adopt the
DDM-as-declarative-deadline pattern.

**Practical implication:** Pre-Apple-OS-26 a tenant could combine `forceDelayedSoftwareUpdates`
(defer-as-restriction) with `ScheduleOSUpdate` (enforce-as-command) for a two-step "delay then
force" pattern. Post-Apple-OS-26, neither primitive functions. The DDM Settings Catalog assertion
is the singular replacement and must encode both delay and enforcement deadline as a single
declarative target.

## Deadlines & Cutover Dates {#deadlines-cutover-dates}

The Apple OS 26 release deprecates and removes legacy MDM update primitives. Tenants must migrate
to DDM "Software Update Enforce Latest" before Apple OS 26 ships.

| Legacy Command / Payload | Status | Forward Path |
|--------------------------|--------|--------------|
| `forceDelayedSoftwareUpdates` (MDM restriction; configuration profile payload) | **[HARD-DEADLINE]** — see callout | DDM "Software Update Enforce Latest" (Settings Catalog) |
| `com.apple.SoftwareUpdate` (configuration profile payload) | **[HARD-DEADLINE]** — see callout | DDM enforcement key (Settings Catalog) |
| `ScheduleOSUpdate` (MDM command) | **[HARD-DEADLINE]** — see callout | DDM update enforcement (Apple OS 26 forward) |

> ⚠️ **Hard deadline (Apple OS 26):** forceDelayedSoftwareUpdates, com.apple.SoftwareUpdate
> payload, and ScheduleOSUpdate MDM command are deprecated AND removed with Apple OS 26. DDM
> "Software Update Enforce Latest" in Intune Settings Catalog is the only forward-compatible
> enforcement path. Migration MUST land before Apple OS 26 release.

**Cutover summary:**

- **Pre-Apple-OS-26:** Legacy MDM commands continue to function on macOS 13 and earlier. DDM
  "Software Update Enforce Latest" available on macOS 14.0+. Tenants run dual-path during the
  transition.
- **Apple OS 26 GA (target window):** Legacy commands no-op silently on Apple OS 26 devices. Any
  remaining `forceDelayedSoftwareUpdates` / `com.apple.SoftwareUpdate` / `ScheduleOSUpdate`
  configuration profile attachment on Apple OS 26 devices loses enforcement effect. DDM Settings
  Catalog assertions become the only enforcement path.
- **Post-Apple-OS-26:** Single forward-compatible path is DDM "Software Update Enforce Latest"
  in Intune Settings Catalog.

## Deprecation Migration: Legacy MDM → DDM

Tenants currently using legacy MDM update primitives must migrate to DDM before Apple OS 26.
Migration plan:

**Step 1 — Inventory legacy command usage.** The legacy `forceDelayedSoftwareUpdates`
[HARD-DEADLINE — see Deadlines H2] MDM restriction configured in current macOS configuration
profiles needs to be identified and inventoried. Use Intune > Devices > Configuration profiles >
filter by macOS to find all profiles using the deferral restriction.

**Step 2 — Inventory `com.apple.SoftwareUpdate` payload usage.** Configuration profiles deploying
the `com.apple.SoftwareUpdate` payload [HARD-DEADLINE — see Deadlines H2] must be migrated to DDM
Settings Catalog assertions. Profiles using this payload typically configure update server URLs
or update catalog sources.

**Step 3 — Inventory `ScheduleOSUpdate` MDM command usage.** The `ScheduleOSUpdate` MDM command
[HARD-DEADLINE — see Deadlines H2] previously used by Intune to push install commands no longer
functions on Apple OS 26. Replace with DDM "Software Update Enforce Latest" assertion.

**Step 4 — Author DDM assertions.** Create new Intune Settings Catalog profiles with DDM Software
Update assertions targeting the desired macOS version + deadline. Pilot on a test ring before
rolling out to production. The DDM assertion encodes target version, grace period, and deadline
behavior in a single declarative payload — the OS enforces the target without server-side command
delivery.

**Step 5 — Decommission legacy profiles.** After DDM profiles are deployed and reporting healthy,
decommission the legacy `forceDelayedSoftwareUpdates` / `com.apple.SoftwareUpdate` /
`ScheduleOSUpdate` profiles. Apple OS 26 release is the hard deadline for completion.

**Critical scheduling note:** Migration MUST complete before Apple OS 26 release. Devices
upgrading to Apple OS 26 with legacy command profiles still attached will silently lose update
enforcement (the legacy commands no-op post-OS-26). The failure mode is silent — Intune will
continue showing the policy as "deployed" because Intune cannot detect that the MDM command was
ignored by the OS.

## Validation & Reporting

After deploying DDM Settings Catalog profiles, validate enforcement via:

- **Intune > Devices > Monitor > Configuration profiles** — confirm assignment + applicability
  status for each macOS device. The DDM assertion shows as a configuration profile in the
  monitor view.
- **macOS device** — `softwareupdate --list-full-installers` and `system_profiler
  SPConfigurationProfileDataType` confirm the DDM assertion is delivered and active locally.
- **Apple Business Manager / Apple School Manager** — confirm device is enrolled in DDM-eligible
  state (macOS 14.0+, MDM-enrolled, network reachable).

**What breaks if migration is incomplete by Apple OS 26 release:** Devices on Apple OS 26 with
legacy `forceDelayedSoftwareUpdates` / `com.apple.SoftwareUpdate` / `ScheduleOSUpdate` profiles
attached lose update-enforcement behavior. Intune compliance dashboards continue to show the
profiles as deployed (because the assignment still succeeds), but the OS no longer honors the
underlying primitives. Tenants discover the gap only when devices fall behind on updates without
admin intervention.

## Related Resources

- [Patch Management Overview](00-overview.md) — Cross-platform comparison + Ring Terminology hub
- [Windows WUfB Rings](01-windows-wufb-rings.md) — Windows forward path
- [iOS Update Lifecycle](03-ios-update-lifecycle.md) — iOS DDM (related Apple platform)
- [Android Patch Delivery](04-android-patch-delivery.md) — Android attestation gate

## External References

- [Software Updates Guide for macOS (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/protect/software-updates-guide-macos)
- [Deprecated MDM Policies for macOS (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/protect/deprecated-mdm-policies-macos)
- [DDM Software Update (Apple Developer)](https://developer.apple.com/documentation/devicemanagement/softwareupdateenforcement)
- [Apple Platform Deployment — Software Update](https://support.apple.com/guide/deployment/software-update-management-depc4c80847a/web)
