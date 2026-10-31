---
doc_id: RE-243
status: Draft
owner: Intune Admin Lead
doc_type: Guide
platform: Windows
last_verified: 2026-10-30
review_by: 2027-01-28
applies_to: Windows devices that Intune manages, brought to a specific security update ahead of the update ring schedule through an expedite policy
audience: admin
---

**Platform:** Windows · **Doc Type:** Guide · **Doc ID:** RE-243 · **Status:** Draft

# Emergency Security Update: Expedite One Update to the Fleet

## Summary

Following this recipe brings every targeted Windows device to a named security update within days
instead of waiting for the update ring schedule. You use it when Microsoft releases a fix for a
vulnerability that can't wait, such as one that attackers already exploit. It requires the
**Policy and Profile manager** role in Intune and devices that you prepared in advance.

> **Scope:** Intune configuration only. For policy behavior, see
> [Windows Expedited Quality Updates](../operations/patch-management/10-windows-expedited-updates.md).

## Prerequisites

- The **Policy and Profile manager** role, or a custom role with the **Device configurations**
  permissions **Assign**, **Create**, **Delete**, **View Reports**, **Update**, and **Read**.
- Microsoft Intune Plan 1, and a Windows license that includes the Windows Autopatch entitlement.
- Devices that run Windows Pro, Pro Education, Enterprise, or Education, are Microsoft Entra joined
  or Microsoft Entra hybrid joined, send diagnostic data at **Required** or higher, and run the
  `wlidsvc` service.
- Devices prepared before the emergency, as described in
  [Prepare Devices Before You Need to Expedite](../operations/patch-management/10-windows-expedited-updates.md#prepare-devices):
  update ring values, no conflicting Group Policy, and the right state of the Update Health Tools.
- A small test group of devices, and the groups that hold the rest of the fleet.

## Unsupported and Anti-Feature Callouts

| Feature | Why it's unsupported / what breaks | Do this instead |
|---|---|---|
| Expedite a feature update | Expedite policies take quality updates only. | Use a feature update policy. See [Windows Version Upgrade Wave](09-windows-version-upgrade-wave.md). |
| Expedite a driver | Expedite policies don't take drivers. | Use a driver update policy. |
| Several updates in one policy | A policy takes exactly one update. | Create one policy per update. |
| D release on Windows 10 | Windows 10 devices aren't expedited for a D release, and show an alert. | Expedite the B or OOB security update. |
| Preview builds or LTSC | Neither is supported. | Use update rings for LTSC devices. |
| Uninstall by deleting the policy | Deleting the policy doesn't uninstall an update that already installed. | Uninstall the update on the device. |

## Steps

### Step 1: Confirm that the update needs expediting

An expedite policy forces restarts on its own schedule, so use it only when the normal ring
schedule is too slow.

> **Ask the admin:** Does the ring schedule leave devices exposed longer than you accept for this vulnerability?

| Option | When to choose | Branch |
|---|---|---|
| Yes | The fix can't wait for the ring deferral and deadline | Go to [Step 2](#step-2-check-device-readiness) |
| No | The ring deadline arrives soon enough | Stop. Let the update rings deliver the update. |

### Step 2: Check device readiness

1. Run the Update Health Tools check script from
   [Check the Update Health Tools](../operations/patch-management/10-windows-expedited-updates.md#update-health-tools)
   as an Intune script, and read the exit code against the device's Windows version.
2. On devices earlier than Windows 11, version 24H2, install the tools if they're missing.
3. On Windows 11, version 24H2 and later, uninstall the tools if they're present.

   > **What breaks if misconfigured:** Devices with the wrong Update Health Tools state don't get
   > the expedited update.

### Step 3: Expedite to the test group

1. Go to **Intune admin center** > **Devices** > **Windows** > **Windows updates**, and select the
   **Quality updates** tab.
2. Select **Create** > **Expedite policy**.
3. Enter a **Name** that names the update, such as `Expedite - 2026.10 B - Test`.
4. In **Select the quality update you would like to Expedite**, select the security update.

   > **What breaks if misconfigured:** The list selects the newest entry by default, which can be a
   > D release. A D release isn't a security update.

5. In **If a reboot is required, select the number of days before it's enforced**, select `0`.
   The test devices restart right after the install, so you see the result quickly.
6. Select **Next**, add scope tags if you use them, and select **Next** again.
7. On **Assignments**, add the test group, and then select **Next**.
8. On **Review + create**, select **Create**.

### Step 4: Confirm the test result

1. Go to **Reports** > **Windows updates** > **Reports** > **Windows Expedited Update Report**.
2. Select the test policy, and then select **Generate report**.
3. Wait until the test devices reach **Installed** / **UpdateInstalled**.
4. Confirm that your key apps work on the test devices.
5. Go to **Devices** > **Monitor** > **Expedited quality update policies with alerts**, and check
   that the test policy has no alerts.

### Step 5: Choose the restart deadline for the fleet

The restart deadline is how long users can put off the restart after the update installs.

> **Ask the admin:** How long can users put off the restart after the update installs?

| Option | When to choose | Recorded as |
|---|---|---|
| `0` days | The devices must restart as soon as the update installs | `Reboot deadline: 0 days` |
| `1` day | Users can finish their day before the restart | `Reboot deadline: 1 day` |
| `2` days | An unplanned restart costs more than two more days of exposure | `Reboot deadline: 2 days` |

The forced restart happens at the deadline, even during working hours.

### Step 6: Expedite to the fleet

1. On the **Quality updates** tab, select **Create** > **Expedite policy** again.
2. Enter a **Name**, such as `Expedite - 2026.10 B - Fleet`.
3. Select the same update as the test policy.
4. Select the restart deadline from [Step 5](#step-5-choose-the-restart-deadline-for-the-fleet).
5. Assign the policy to the fleet groups, and create it.
6. Tell users that a restart is coming, and when Windows forces it.

   > **What breaks if misconfigured:** If you leave out a group, its devices wait for the normal
   > ring schedule.

### Step 7: Track the fleet

1. Generate the **Windows Expedited Update Report** for the fleet policy each day.
2. Look for devices that stay at **Pending** or **OfferReady**. A device at **OfferReady** hasn't
   scanned against Windows Update yet, usually because it's offline.
3. Check **Expedited quality update policies with alerts** for devices with errors.
4. When the fleet reaches the level you need, record the date.

## Verification

- [ ] The test policy shows every test device at **Installed** / **UpdateInstalled** in the
  **Windows Expedited Update Report**.
- [ ] The fleet policy names the same update as the test policy.
- [ ] The fleet policy shows no unresolved devices in **Expedited quality update policies with
  alerts**.
- [ ] On a sample device, **Settings** > **Windows Update** > **Update history** lists the update,
  or a later one.

A device can install a later update than the one you chose, if the later update includes it and
no deferral blocks it. That counts as success.

## Rollback/Recovery

Deleting this recipe's policies doesn't return devices to their earlier state. The policy and the
installed update are two separate things.

**Expedite policy:**

- Deleting the policy removes it from Intune. Windows Update tries to cancel installs that are in
  progress, but it can't guarantee that they stop.
- Deleting the policy doesn't uninstall an update that already installed.
- The policy doesn't change the schedule for later updates, so there's nothing to restore on the
  update rings.

**Installed update:**

- Microsoft Learn documents no uninstall from the expedite policy. To remove a bad update, you
  uninstall it on each device, outside this recipe.

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|---|---|---|
| Update Health Tools in the wrong state for the Windows version | Devices aren't expedited | [Check the Update Health Tools](../operations/patch-management/10-windows-expedited-updates.md#update-health-tools) |
| **Automatic update behavior** set to block scans or require approval | Devices stay at **OfferReady**, or the install is slow | [Set the Update Ring Values](../operations/patch-management/10-windows-expedited-updates.md#ring-settings) |
| **Enable pre-release builds** configured | Preview-build devices aren't expedited | [Set the Update Ring Values](../operations/patch-management/10-windows-expedited-updates.md#ring-settings) |
| Group Policy still sets `CorpWuURL`, `AutoUpdateCfg`, `DeferFeatureUpdates`, or **Disable Dual Scan** | The expedite policy is blocked | [Remove Conflicting Group Policy Settings](../operations/patch-management/10-windows-expedited-updates.md#group-policy-conflicts) |
| D release selected for Windows 10 devices | Those devices aren't expedited and show an alert | [Know Which Updates You Can Expedite](../operations/patch-management/10-windows-expedited-updates.md#choose-an-update) |

## See Also

- [Admin Decision-Point Block Format (STD-05)](../_standards/EEE-SOP-standard.md)—the spec this recipe's decision blocks follow
- [Windows Expedited Quality Updates](../operations/patch-management/10-windows-expedited-updates.md)—how expedite policies behave, the update list, and the report states
- [Windows WUfB Rings](../operations/patch-management/01-windows-wufb-rings.md)—the update ring schedule that this recipe goes around
- [Enterprise Update Plan](05-enterprise-update-plan.md)—where expedited updates fit in the fleet-wide update plan
- [Windows Version Upgrade Wave](09-windows-version-upgrade-wave.md)—how to move the fleet to a new Windows version
