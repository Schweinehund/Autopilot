---
doc_id: RE-240
status: Draft
owner: Intune Admin Lead
doc_type: Guide
platform: Windows
last_verified: 2026-10-30
review_by: 2027-01-28
applies_to: Windows Pro, Pro Education, Enterprise, and Education devices that Intune manages and that are Microsoft Entra joined or Microsoft Entra hybrid joined
audience: admin
---

**Platform:** Windows · **Doc Type:** Guide · **Doc ID:** RE-240 · **Status:** Draft

> **Platform applicability:** Windows only. See also [Patch Management Overview](00-overview.md)
> and [Windows WUfB Rings](01-windows-wufb-rings.md).

# Windows Feature Updates

## Summary

A feature update moves a device to a new Windows version, such as Windows 11, version 24H2 to
version 25H2. This guide covers the Intune **feature update policy**: what it controls, how to
create one, how to roll it out in stages, how to upgrade Windows 10 devices to Windows 11, and how
to read its reports.

A feature update policy does two jobs. It upgrades devices to the version you choose, and it keeps
them on that version until you change the policy. An update ring can only defer a feature update
for a number of days. It can't name a target version.

<a id="prerequisites"></a>
## Prerequisites

Before you create a feature update policy, confirm the following:

- **Licensing:** Microsoft Intune Plan 1, and a Windows license that includes the Windows Autopatch
  entitlement. For the entitlement list, see
  [Windows Autopatch](07-windows-autopatch.md#enrollment-prerequisites).
- **Windows edition:** Pro, Pro Education, Enterprise, or Education. Windows Enterprise LTSC isn't
  supported. For LTSC devices, use update ring policies instead.
- **Join type:** The device is managed by Intune and is Microsoft Entra joined or Microsoft Entra
  hybrid joined.
- **Telemetry:** Diagnostic data is set to at least **Required**, and your tenant allows Intune to
  use Windows diagnostic data. Without it, the reports stay empty.
- **Services:** The Microsoft Account Sign-In Assistant service (`wlidsvc`) is enabled and running.
  If it's disabled, the device can't get a Global Device ID and the report shows
  `DeviceRegistrationInvalidGlobalDeviceId`.
- **Network:** The device can reach the Intune, Windows Update, and Windows Autopatch endpoints.
- **Role:** You have the **Policy and Profile manager** role, or a custom role with the **Device
  configurations** permissions **Assign**, **Create**, **Delete**, **View Reports**, **Update**,
  and **Read**.

<a id="how-the-policy-behaves"></a>
## How the Policy Behaves

Read these rules before you assign a policy.

- **No downgrades.** If a device already runs a newer version than the policy targets, the policy
  doesn't apply. The device stays on its current version.
- **The policy holds until you change it.** A pause in an update ring expires after 35 days. A
  feature update policy stays in effect until you edit or delete it.
- **The latest quality update comes with it.** When a feature update installs, Windows includes
  the latest applicable monthly quality update.
- **Not during Autopilot.** The policy doesn't apply during the Windows Autopilot out-of-box
  experience (OOBE). It takes effect at the first Windows Update scan after provisioning finishes.
- **The highest version wins.** Each policy targets one version. If several policies target a
  device, Windows Update offers only the latest applicable version. Windows 11 always counts as
  later than Windows 10.
- **Required beats optional.** If two policies target the same version and one is **Required**,
  the update is offered as **Required**.
- **Safeguard holds block the offer.** Microsoft places a *safeguard hold* on devices with a known
  compatibility issue for the target version. The device doesn't install the update until
  Microsoft lifts the hold. You can't override a safeguard hold from the feature update policy.

<a id="interaction-with-update-rings"></a>
## Set Up Update Rings to Work with the Policy

The feature update policy chooses the version. The update ring still controls the client
experience: deadlines, grace periods, restarts, and active hours. If a device gets both, set the
update ring as follows:

- Set **Feature update deferral period (days)** to `0`. A deferral on the ring can delay or block
  the version that the feature update policy offers.
- Don't pause feature updates on the ring.

If your rings already use feature update deferrals, follow
[Move from Ring Deferrals to a Feature Update Policy](#move-from-ring-deferrals) instead of
setting the deferral to `0` first. The order matters.

<a id="create-a-policy"></a>
## Create a Feature Update Policy

To create a policy, do the following:

1. In the Microsoft Intune admin center, go to **Devices** > **Windows** > **Windows updates**.
2. Select the **Feature updates** tab.
3. Select **Create** > **Create feature update policy**.
4. On **Deployment settings**, enter a **Name** and an optional **Description**.
5. In **Feature update to deploy**, select the target version. The list shows only versions that
   are still in support.
6. Select how users get the update:
   - **Make available to users as a required update:** The device installs the update on its own,
     according to its update ring settings.
   - **Make available to users as an optional update:** The user must open **Windows Update** in
     **Settings** and select **Download**. If the user does nothing, the update doesn't install.
     This option requires a Windows Autopatch license.
7. In **Rollout options**, choose when the update becomes available. For the choices, see
   [Roll Out in Stages](#rollout-options).
8. Select **Next**.
9. On **Scope tags**, add scope tags if your tenant uses them, and then select **Next**.
10. On **Assignments**, assign the policy to one or more device groups, and then select **Next**.
11. On **Review + create**, check the settings, and then select **Create**.

If you choose **optional**, tell users through your usual channels. Windows doesn't prompt them.

<a id="switch-availability"></a>
### Change an Update from Optional to Required

You can change the availability of an existing policy. The change affects only devices that
haven't installed the update yet:

| Change | Devices that finished installing | Devices pending restart | Devices that haven't started |
|---|---|---|---|
| Optional to required | Not affected | Not applicable | Install at the next scan |
| Required to optional | Not affected | Usually finish as required | Switch to optional |

<a id="rollout-options"></a>
## Roll Out in Stages

Rollout options control when the update becomes available. After it's available, the device's
update ring still controls when it installs and restarts. Choose one option:

- **Make update available as soon as possible:** The update is offered right away.
- **Make update available on a specific date:** Devices get no offer until the date you set.
- **Make update available gradually:** Windows Update splits the targeted devices into *offer
  groups* and offers the update to one group at a time.

For a gradual rollout, set three values:

- **First group availability:** The date of the first offer. It must be at least two days in the
  future, so that Windows Update can build the offer groups.
- **Final group availability:** The date of the last offer. Devices that you add to the policy
  after this date get the offer right away.
- **Days between groups:** The interval between offers. It also sets the number of groups.

For example, a first date of January 1, a final date of January 10, and an interval of three days
create four groups, offered on January 1, 4, 7, and 10.

Windows Update assigns devices to offer groups at random, with at least 100 devices in each group.
If you change the dates, Windows Update can move devices that haven't received an offer yet. If
you remove a device from the policy, Windows Update tries to withdraw the offer, unless the device
has already started the update.

<a id="intelligent-rollouts"></a>
### Turn On Intelligent Rollouts and Likely-Issue Holds

With *intelligent rollouts*, Windows Autopatch fills the first offer group with devices that cover
a wide range of hardware, drivers, and configurations, instead of picking at random. The first
group then acts as your pilot. The same setting also lets Autopatch place a *likely-issue
safeguard hold* on a device that it predicts is likely to have a problem with the update.

To turn on both, do the following:

1. Create a settings catalog profile for the Windows platform.
2. Add the setting **System** > **Allow WUfB Cloud Processing**, and set it to **Enabled**.
3. Assign the profile to the same groups that your feature update policies target.

You deploy this profile once per device. It then applies to every later gradual rollout on that
device.

<a id="upgrade-to-windows-11"></a>
## Upgrade Windows 10 Devices to Windows 11

To upgrade Windows 10 devices, create a feature update policy as described in
[Create a Feature Update Policy](#create-a-policy), and select a Windows 11 version in **Feature
update to deploy**. Devices that meet the Windows 11 hardware requirements upgrade. Devices that
don't meet them stay on their current Windows 10 version.

Before you assign the policy, check which devices are ready. Go to **Reports** > **Windows
updates** > **Reports**, and generate the **Windows Feature Update Device Readiness Report** for the
target version. The **Windows Feature Update Compatibility Risks Report** lists the apps and
drivers that put the upgrade at risk. Endpoint analytics shows the same readiness on the **Windows**
tab of the **Work from anywhere** report.

<a id="win10-fallback-checkbox"></a>
### Handle Devices That Can't Run Windows 11

A Windows 10 device that can't run Windows 11 and is targeted by a Windows 11 policy gets no more
Windows 10 feature updates on its own. You have two ways to avoid that:

- **Use the fallback checkbox.** When you create the policy, select **When a device isn't capable
  of running Windows 11, install the latest Windows 10 feature update**. One policy then upgrades
  capable devices to Windows 11 and moves the rest to the latest Windows 10 version. The checkbox
  appears only when you select a Windows 11 version, and it requires the Autopatch licensing in
  [Prerequisites](#prerequisites).
- **Move the device.** Remove the ineligible device from the Windows 11 policy, and assign it to a
  Windows 10 feature update policy.

You can't turn on the checkbox for an existing policy. Changing it ends the deployment and starts
two new ones. To add the checkbox, delete the policy and create a new one.

> **Note:** Windows 10 reached end of support on October 14, 2025. Plan the Windows 10 path only
> for devices that you keep on Extended Security Updates.

<a id="license-agreement"></a>
### Accept the Windows 11 License Terms

When you save a policy that deploys a Windows 11 version, the admin center reminds you that you
accept the Windows 11 license terms on behalf of the devices and their users. Users then don't see
the license agreement during the upgrade. The reminder appears every time you select a Windows 11
version, even if all your devices already run Windows 11.

<a id="tenant-observation"></a>
### What the Console Showed on 2026-10-30

In a production tenant on 2026-10-30, **Feature update to deploy** offered only **Windows 11,
version 26H2** and **Windows 11, version 25H2**. No Windows 10 version was listed, and the Windows
10 fallback checkbox didn't appear. The license notice asked you to agree that the Windows license
was bought through volume licensing, or that you accept the Microsoft Software License Terms for
your organization. If your tenant still lists Windows 10 versions, the rules in
[Handle Devices That Can't Run Windows 11](#win10-fallback-checkbox) apply.

<a id="move-from-ring-deferrals"></a>
## Move from Ring Deferrals to a Feature Update Policy

Microsoft recommends that you stop using feature update deferrals on update rings once you use
feature update policies. If both apply, the deferral can delay or block the update you intended.

The order of the steps matters. After you create or edit a policy, Windows Update needs time to
process it, usually about 10 minutes. If you remove the deferral first, and a device scans before
the policy is processed, the device can get a version that you didn't intend.

To switch safely, do the following:

1. Create a feature update policy that targets the version you want, and assign it.
2. Wait several minutes, and then generate the **Windows Feature Update Report** for the policy.
3. Confirm that every targeted device shows **OfferReady**.
4. Edit each update ring that targets those devices, and set **Feature update deferral period
   (days)** to `0`.

<a id="co-management"></a>
## Switch the Co-Management Workload Safely

On devices that you co-manage with Configuration Manager, a feature update policy might not take
effect right away after you move the **Windows Update policies** workload to Intune. During that
gap, a device can upgrade past the version that you set.

To protect the devices before you move the workload, do the following:

1. Create a feature update policy that targets the version you want devices to stay on, and assign
   it to the co-managed devices.
2. Go to **Reports** > **Windows updates** > **Reports** > **Windows Feature Update Report**,
   select the policy, and generate the report.
3. Wait until the devices show **OfferReady** or a later state. Those devices are held at the
   version that you chose.
4. Move the **Windows Update policies** workload from Configuration Manager to Intune.

For the workload sliders, see
[Windows Workload Sliders](../co-management/02-windows-workload-sliders.md).

<a id="manage-and-retire-a-policy"></a>
## Check Support Dates and Remove a Policy

The **Feature updates** tab lists each policy with its **Feature update version**, **Deployment
Status**, and **Support End Date**. Microsoft Learn describes the support states as follows:

- **Supported:** The version is in support and deploys to devices.
- **Support Ending:** The version is within two months of its end-of-support date.
- **Not supported:** Support has ended, and the version no longer deploys.

The **Support End Date** is the date for the Enterprise and Education editions. For other editions,
check the Microsoft Product Lifecycle site.

When a version is within two months of its end date, create a policy for the next version and move
your groups to it.

To delete a policy, open it and select **Delete**. If Windows Autopatch manages the device, plan
the replacement before you delete. A device that loses its feature update policy stays enrolled in
Autopatch, and Windows Update offers it no feature update at all until one of the following
happens:

- You assign the device to another feature update policy.
- You unenroll the device from Intune.
- You remove the device from feature update management through the Windows Autopatch Graph API.

<a id="reports"></a>
## Read the Feature Update Reports

Intune has two places to read a feature update policy:

- **Windows Feature Update Report:** The state of each device for one policy. Go to **Reports** >
  **Windows updates** > **Reports**. Microsoft Learn calls it the **Windows feature updates
  (Organizational)** report.
- **Feature update policies with alerts:** The alerts for each device, with a recommended action.
  Go to **Devices** > **Monitor**. Microsoft Learn calls it the **Feature update failures
  (Operational)** report.

Data arrives at two speeds. Data from the Windows Update service arrives in under an hour. Data
from the device arrives in batches every eight hours, and only after you allow Intune to use
Windows diagnostic data. The **Last Scanned Time** shows **Not scanned yet** until a user signs in
and a scan runs.

<a id="update-states"></a>
### Update States

The **Update State** and **Update Substate** columns show where each device is. These states need
action most often:

| State | Substate | What it means | What to do |
|---|---|---|---|
| Pending | Validation | Windows Update can't offer the update because the device failed validation. | Check the alert in **Feature update policies with alerts**. |
| Pending | Scheduled | The update is scheduled for a later offer, such as a rollout date. | Nothing. Wait for the offer date. |
| On hold | Deferred | An update ring deferral on the device is holding the update back. | Set the ring's feature update deferral to `0`. |
| Canceled | Service Cancelled | The version reached end of service, or another policy targets a newer version. | Check the version's support status and the device's other policies. |
| Canceled | Not Supported | Windows Update can't find the device in Microsoft Entra ID. | Confirm the device's join state and Device ID. |
| Offering | OfferReady | Windows Update is offering the update to the device. | Nothing. The device installs at its next scan. |
| Installed | Update Installed | The update installed. | Nothing. |

<a id="common-alerts"></a>
### Common Alerts

The alerts report lists one alert per device. These are the alerts you see most often:

| Alert | Cause | Fix |
|---|---|---|
| `SafeguardHold` | A known compatibility issue blocks the update. | Find the hold ID in **Deployment Error Code**, and check the Windows release health dashboard. Wait for Microsoft to lift the hold. |
| `PolicyConflictDeferral` | A deferral policy on the device blocks the update. | Remove the feature update deferral from the update ring or Group Policy. |
| `PolicyConflictPause` | Updates are paused on the device. | Resume feature updates on the ring. |
| `DeploymentConflict` | The device is in more than one deployment of the same type. Only the first one assigned takes effect. | Remove the device from the deployments that shouldn't apply. |
| `DeviceRegistrationInvalidGlobalDeviceId` | The device has no Global Device ID. | Make sure the `wlidsvc` service can run. |
| `DeviceRegistrationInvalidAzureADDeviceId` | The device's Microsoft Entra Device ID isn't valid. | Confirm that the device is joined to your tenant. |
| `Incompatible` | The device doesn't meet the minimum requirements. | Review `ScanResult.xml` for `Block Type=Hard`. |
| `DiskFull` | The Windows partition is full. | Free disk space and retry. |
| `RollbackInitiated` | Setup ran into a serious problem and rolled back. | Run SetupDiag on the device. Don't retry until you know the cause. |
| `EndOfService` | The device runs a Windows version past its end of service. | Target a supported version. |

<a id="unsupported-callouts"></a>
## What the Policy Doesn't Do

- It doesn't downgrade a device to an earlier version.
- It doesn't apply during Windows Autopilot OOBE.
- It doesn't support Windows Enterprise LTSC.
- It doesn't override a safeguard hold.
- It doesn't control restarts, deadlines, or active hours. The update ring does.
- You can't add the Windows 10 fallback checkbox to an existing policy.

<a id="related-resources"></a>
## Related Resources

- [Patch Management Overview](00-overview.md): Cross-platform comparison and ring terminology
- [Windows WUfB Rings](01-windows-wufb-rings.md): Update ring deferrals, deadlines, and Hotpatch
- [Windows Expedited Quality Updates](10-windows-expedited-updates.md): Install one security
  update fast, outside the ring schedule
- [Windows Autopatch](07-windows-autopatch.md): Service-managed feature update rollouts
- [Enterprise Update Plan](../../recipes/05-enterprise-update-plan.md): The fleet-wide update plan

<a id="external-references"></a>
## External References

- [Manage Windows feature updates (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-feature-updates)
- [Configure Windows feature update policies (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-feature-update-policy)
- [Configure rollout options for feature update policies (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-rollout-options)
- [Upgrade devices to Windows 11 using feature updates (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-updates/windows/upgrade-to-windows-11)
- [Reports for Windows feature update policies (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-updates/windows/monitor-feature-updates)
