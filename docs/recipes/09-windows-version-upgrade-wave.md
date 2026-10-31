---
doc_id: RE-242
status: Draft
owner: Intune Admin Lead
doc_type: Guide
platform: Windows
last_verified: 2026-10-30
review_by: 2027-01-28
applies_to: A Windows 11 fleet that Intune manages, moved to a new Windows version through a pilot feature update policy and a gradual-rollout feature update policy
audience: admin
---

**Platform:** Windows · **Doc Type:** Guide · **Doc ID:** RE-242 · **Status:** Draft

# Windows Version Upgrade Wave: Pilot, Gradual Rollout, and Hold

## Summary

Following this recipe moves a Windows fleet to a new Windows version, such as Windows 11, version
25H2 to version 26H2, in a controlled wave. A pilot group upgrades first, the rest of the fleet
gets the update in offer groups over a set number of days, and every device stays on the target
version until you choose the next one. You need the **Policy and Profile manager** role in Intune.

> **Scope:** Intune configuration only. For policy behavior, see
> [Windows Feature Updates](../operations/patch-management/09-windows-feature-updates.md).

## Prerequisites

- The **Policy and Profile manager** role, or a custom role with the **Device configurations**
  permissions **Assign**, **Create**, **Delete**, **View Reports**, **Update**, and **Read**.
- Microsoft Intune Plan 1, and a Windows license that includes the Windows Autopatch entitlement.
- Devices that run Windows Pro, Pro Education, Enterprise, or Education, are Microsoft Entra joined
  or Microsoft Entra hybrid joined, send diagnostic data at **Required** or higher, and run the
  `wlidsvc` service. For the full list, see
  [Windows Feature Updates](../operations/patch-management/09-windows-feature-updates.md#prerequisites).
- Two device groups: a pilot group, and a group for the rest of the fleet. Make sure no device is in
  both.
- Update rings that already target the devices. They keep controlling deadlines and restarts.

## Unsupported and Anti-Feature Callouts

| Feature | Why it's unsupported / what breaks | Do this instead |
|---|---|---|
| Downgrade to an earlier version | A feature update policy never downgrades a device. A device on a later version keeps it. | Reimage the device, or wait for the next version. |
| Windows Enterprise LTSC | Feature update policies don't support LTSC. | Use update rings for LTSC devices. |
| Overriding a safeguard hold | Microsoft holds devices with a known issue. The policy can't release them. | Wait for Microsoft to lift the hold, then retry. |
| Upgrade during Autopilot | The policy doesn't apply during OOBE. | Let the device upgrade at its first scan after provisioning. |
| Ring deferral alongside the policy | A feature update deferral on the ring can delay or block the update. | Set the ring deferral to `0` in [Step 6](#step-6-remove-the-ring-deferral). |

## Steps

### Step 1: Choose the target version

The target version is the version every device in the wave ends on and stays on.

> **Ask the admin:** Which Windows version should the fleet end on?

| Option | When to choose | Recorded as |
|---|---|---|
| The newest version in the list | You want the longest support runway and your apps are tested on it | `Target: Windows 11, version 26H2` |
| The previous version | Your apps aren't validated on the newest version yet | `Target: Windows 11, version 25H2` |

The **Feature update to deploy** list shows only versions that are still in support. On
2026-10-30, it showed **Windows 11, version 26H2** and **Windows 11, version 25H2**.

### Step 2: Check readiness

1. Go to **Intune admin center** > **Reports** > **Windows updates** > **Reports**.
2. Generate the **Windows Feature Update Device Readiness Report** for the target version.
3. Generate the **Windows Feature Update Compatibility Risks Report** for the same version.
4. For each app or driver at risk, test it on one device, or move the device out of the wave.

   > **What breaks if misconfigured:** Untested apps or drivers fail after the upgrade, in every
   > offer group at once.

### Step 3: Turn on intelligent rollouts

This step is optional. It lets Windows Autopatch build a varied first offer group, and lets it
hold a device that it predicts is likely to have a problem.

> **Ask the admin:** Should Windows Autopatch choose the first offer group and apply likely-issue holds?

| Option | When to choose | Branch |
|---|---|---|
| Yes | You want the first offer group to act as a second pilot | Do this step |
| No | You want offer groups assigned at random | Go to [Step 4](#step-4-create-the-pilot-policy) |

1. Go to **Intune admin center** > **Devices** > **Windows** > **Configuration**, and create a
   settings catalog profile for the Windows platform.
2. Add **System** > **Allow WUfB Cloud Processing**, and set it to **Enabled**.
3. Assign the profile to both groups, the pilot and the fleet.

This setting wasn't checked in a tenant when this recipe was written.

### Step 4: Create the pilot policy

1. Go to **Intune admin center** > **Devices** > **Windows** > **Windows updates**, and select the
   **Feature updates** tab.
2. Select **Create** > **Create feature update policy**.
3. Enter a **Name**, such as `FU - 26H2 - Pilot`.
4. In **Feature update to deploy**, select the version from [Step 1](#step-1-choose-the-target-version).
5. Select **Make available to users as a required update**.
6. In **Rollout options**, select **Make update available as soon as possible**.
7. Select **Next**, add scope tags if you use them, and select **Next** again.
8. On **Assignments**, add the pilot group, and then select **Next**.
9. On **Review + create**, select **Create**.

   > **What breaks if misconfigured:** If you assign the fleet group here, the whole fleet upgrades
   > at once with no pilot.

### Step 5: Create the fleet policy

Create the fleet policy now, with its first offer date after the end of your pilot. Windows
Update processes it in the meantime, which [Step 6](#step-6-remove-the-ring-deferral) depends on.

> **Ask the admin:** How many days should the pilot run, and over how many days should the fleet get the update?

The answer sets the three rollout dates in this step.

1. Go to **Feature updates** > **Create** > **Create feature update policy**.
2. Enter a **Name**, such as `FU - 26H2 - Fleet`, and select the same version as the pilot.
3. Select **Make available to users as a required update**.
4. In **Rollout options**, select **Make update available gradually**.
5. Set **First group availability** to the day after the pilot ends. It must be at least two days
   from today.
6. Set **Final group availability** to the last offer date. Devices that you add after this date
   get the offer right away.
7. Set **Days between groups**. The interval also sets the number of groups, and each group has
   at least 100 devices.

   > **What breaks if misconfigured:** A short interval leaves no time to spot a problem in one
   > offer group before the next one starts.

8. Assign the policy to the fleet group, and create it.

### Step 6: Remove the ring deferral

Do this step only if your update rings set **Feature update deferral period (days)** above `0`.
The order matters: Windows Update must process both policies before you remove the deferral.

1. Wait several minutes, and then generate the **Windows Feature Update Report** for each policy.
2. Confirm that the pilot devices show **OfferReady**, and that the fleet devices show
   **OfferReady** or **Scheduled**. Microsoft Learn names only **OfferReady** as proof of
   processing. Reading **Scheduled** the same way is this recipe's inference, because a gradual
   rollout holds devices at **Scheduled** until their offer date.
3. Edit each update ring that targets the two groups, and set **Feature update deferral period
   (days)** to `0`.

   > **What breaks if misconfigured:** Removing the deferral first lets a device scan before the
   > policy is processed and take a version you didn't intend.

### Step 7: Validate the pilot

1. Wait until the pilot devices show **Update Installed** in the **Windows Feature Update Report**.
2. Confirm that your key apps work on the pilot devices.
3. If the pilot fails, edit the fleet policy and move **First group availability** later, before
   the first offer date.

### Step 8: Watch each offer group

1. Before each offer date, generate the **Windows Feature Update Report** for the fleet policy.
2. Go to **Devices** > **Monitor** > **Feature update policies with alerts**, and check the alerts.
3. If an offer group shows failures that the pilot didn't show, move the remaining dates later, or
   remove the affected devices from the fleet group.

## Verification

- [ ] The pilot and fleet policies both show the target version in **Feature update version** on
  the **Feature updates** tab.
- [ ] Every pilot device shows **Update Installed** in the **Windows Feature Update Report**.
- [ ] Every update ring that targets these devices has **Feature update deferral period (days)**
  set to `0`.
- [ ] After the final offer date, every fleet device shows **Update Installed**, or an alert that
  you've recorded.
- [ ] **Settings** > **System** > **About** on a sample device shows the target version.

## Rollback/Recovery

Removing this recipe's policies is not the same as returning a device to its earlier version.
Deleting a policy only stops further offers. It does nothing to devices that already upgraded.

**Feature update policy:**

- To stop the wave, move the **First group availability** date later, or remove devices from the
  fleet group. Windows Update tries to withdraw the offer, unless the device has already started.
- Deleting the policy doesn't downgrade a device. Microsoft Learn documents no way to roll a
  device back from Intune.
- If Windows Autopatch manages the device, deleting the policy leaves the device with no feature
  update offer at all until you assign another policy.

**Device that upgraded:**

- Windows keeps the earlier version for a limited time after a feature update, and the user or an
  administrator can go back from **Settings** > **System** > **Recovery**. That window and that
  action are Windows features, not Intune ones, and this recipe hasn't tested them.

**Intelligent rollouts profile:**

- Unassign or delete the settings catalog profile. Later gradual rollouts then use random offer
  groups again.

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|---|---|---|
| Ring deferral left above `0` | Devices stay at **On hold** / **Deferred**, or show `PolicyConflictDeferral` | [Windows Feature Updates](../operations/patch-management/09-windows-feature-updates.md#common-alerts) |
| Feature updates paused on the ring | `PolicyConflictPause` | [Windows Feature Updates](../operations/patch-management/09-windows-feature-updates.md#common-alerts) |
| Device in both the pilot and fleet groups | `DeploymentConflict`; only the first policy assigned takes effect | [Windows Feature Updates](../operations/patch-management/09-windows-feature-updates.md#common-alerts) |
| `wlidsvc` disabled | `DeviceRegistrationInvalidGlobalDeviceId` | [Windows Feature Updates](../operations/patch-management/09-windows-feature-updates.md#prerequisites) |
| Diagnostic data below **Required** | The reports stay empty | [Windows Feature Updates](../operations/patch-management/09-windows-feature-updates.md#reports) |

## See Also

- [Admin Decision-Point Block Format (STD-05)](../_standards/EEE-SOP-standard.md)—the spec this recipe's decision blocks follow
- [Windows Feature Updates](../operations/patch-management/09-windows-feature-updates.md)—how feature update policies behave, their reports, and their alerts
- [Windows WUfB Rings](../operations/patch-management/01-windows-wufb-rings.md)—the update ring settings that keep controlling deadlines and restarts
- [Enterprise Update Plan](05-enterprise-update-plan.md)—where this wave fits in the fleet-wide update plan
- [Emergency Security Update](10-windows-emergency-expedite.md)—how to push one security update fast, outside a wave
