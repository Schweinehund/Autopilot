---
doc_id: RE-241
status: Draft
owner: Intune Admin Lead
doc_type: Guide
platform: Windows
last_verified: 2026-10-30
review_by: 2027-01-28
applies_to: Windows Pro, Pro Education, Enterprise, and Education devices that Intune manages and that are Microsoft Entra joined or Microsoft Entra hybrid joined
audience: admin
---

**Platform:** Windows · **Doc Type:** Guide · **Doc ID:** RE-241 · **Status:** Draft

> **Platform applicability:** Windows only. See also [Patch Management Overview](00-overview.md)
> and [Windows WUfB Rings](01-windows-wufb-rings.md).

# Windows Expedited Quality Updates

## Summary

An *expedite policy* installs one Windows quality update on the devices you choose as soon as
possible. It skips the deferral and deadline schedule of your update rings, and you don't need to
pause or edit those rings. Use it when a security fix can't wait for the normal monthly cycle, for
example, to close an actively exploited vulnerability.

An expedite policy is a one-time action. It doesn't change how later quality updates deploy. Your
update rings or Windows quality update policies keep handling the monthly cycle.

<a id="prerequisites"></a>
## Prerequisites

Expedite policies share the prerequisites of all Windows quality update policies:

- **Licensing:** Microsoft Intune Plan 1, and a Windows license that includes the Windows Autopatch
  entitlement. For the entitlement list, see
  [Windows Autopatch](07-windows-autopatch.md#enrollment-prerequisites).
- **Windows edition:** Pro, Pro Education, Enterprise, or Education. Windows Enterprise LTSC isn't
  supported.
- **Join type:** The device is managed by Intune and is Microsoft Entra joined or Microsoft Entra
  hybrid joined.
- **Telemetry:** Diagnostic data is set to at least **Required**, and your tenant allows Intune to
  use Windows diagnostic data.
- **Services:** The Microsoft Account Sign-In Assistant service (`wlidsvc`) is enabled and running.
- **Network:** The device can reach the Intune, Windows Update, and Windows Autopatch endpoints.
- **Role:** You have the **Policy and Profile manager** role, or a custom role with the **Device
  configurations** permissions **Assign**, **Create**, **Delete**, **View Reports**, **Update**,
  and **Read**.

You don't need a Windows quality update policy to use an expedite policy.

<a id="prepare-devices"></a>
## Prepare Devices Before You Need to Expedite

Expedite policies work best on devices that you set up in advance. Do this preparation now, so that
nothing blocks the policy on the day you need it.

<a id="ring-settings"></a>
### Set the Update Ring Values

Microsoft recommends the following values on the update rings that target the devices:

| Update ring setting | Value | Why |
|---|---|---|
| **Enable pre-release builds** | **Not configured** | Expedite policies don't support preview builds, including the Beta and Dev channels. |
| **Automatic update behavior** | **Reset to default** | Settings that prevent scans block the expedited scan, and settings that require user approval for download slow it. |
| **Change notification update level** | Any value except **Turn off all notifications, including restart warnings** | Users need the restart notifications. |

<a id="group-policy-conflicts"></a>
### Remove Conflicting Group Policy Settings

If Group Policy manages these settings on the devices, set them back to **Not configured**:

- `CorpWuURL`: Specify intranet Microsoft update service location
- `AutoUpdateCfg`: Configure Automatic Updates
- `DeferFeatureUpdates`: Select when Preview Builds and Feature Updates are received
- **Disable Dual Scan**: Do not allow update deferral policies to cause scans against Windows
  Update

For help moving Group Policy settings to Intune, see
[GPO to Intune](../../reference/gpo-to-intune.md).

<a id="update-health-tools"></a>
### Check the Update Health Tools

What the device needs depends on its Windows version:

- **Earlier than Windows 11, version 24H2:** The device needs the Microsoft Update Health Tools.
  Install them through KB4023057, or from the Microsoft Download Center.
- **Windows 11, version 24H2 and later:** The device must not have the Update Health Tools. If it
  has them, uninstall the MSI.

To check whether a device has the tools, look for the folder
`C:\Program Files\Microsoft Update Health Tools`, or for **Microsoft Update Health Tools** in
**Services** or in **Add or remove programs**. You can also run the following script from Intune:

```PowerShell
### Check for the Microsoft Update Health Service; if found, no remediation is needed.
if (Get-Service -Name "Microsoft Update Health Service" -ErrorAction SilentlyContinue) {
    Write-Host "Microsoft Update Health Service is present."
    Exit 0
} else {
    Write-Host "Microsoft Update Health Service is missing."
    Exit 1
}
```

Exit code `0` means the service is present, and `1` means it's missing. Read the exit code against
the device's version: on Windows 11, version 24H2 and later, `0` means that you have to remove the
tools.

> **Warning:** The Microsoft Learn page says the reverse: that `1` means the device has the tools.
> The script's own output contradicts the page. Trust the script.

<a id="how-it-works"></a>
## How Expedited Updates Work

When you create an expedite policy, you choose one update. Intune names updates by release date,
not by KB number, so one policy covers every supported Windows version. Windows Update delivers the
right package for each device's version and architecture.

- **Only devices that need the update get it.** A device that already has the update, or a later
  one, gets nothing.
- **The device can get a later update than the one you chose.** If a later update includes your
  update and is available when the device scans, Windows Update installs the later one instead.
  This saves a second install and restart.
- **The install starts after the next scan.** How fast it starts depends on when the device is
  online, when it scans, and how fast the service processes it.
- **Only the chosen update skips deferrals.** The policy overrides a deferral for the update you
  chose. It doesn't override deferrals on any other update.

<a id="later-update-example"></a>
### Example: Which Update Installs

Suppose you expedite the February security update. In March, you set a seven-day deferral on the
March update while you test it. Two devices were offline and come back at different times:

- **Device A comes back during the March deferral.** The March update is still deferred, so the
  device installs the February update, as the policy says.
- **Device B comes back after the March deferral ends.** The March update includes the February
  fixes and is no longer deferred, so the device installs the March update instead.

<a id="choose-an-update"></a>
### Know Which Updates You Can Expedite

The list in the policy shows only updates that you can expedite:

- **B releases:** The monthly security update, released on the second Tuesday of the month. Its
  name contains `B`.
- **OOB releases:** Out-of-band security updates, released outside the monthly schedule. Their
  names contain `OOB`.
- **D releases:** Non-security fixes released after the last security update. Their names
  contain `D` and don't contain `SecurityUpdate`. You can expedite a D release only on Windows 11.

The list shows the two most recent security updates, including OOB security updates. Non-security
updates appear only while no later security update exists. After a new security update ships, the
D and OOB non-security updates leave the list.

On 2026-10-30, the list in a production tenant showed these three entries, in this order:

- `10/28/2026 - 2026.10 D Update for Windows 10 and later`
- `10/13/2026 - 2026.10 B SecurityUpdate for Windows 10 and later`
- `09/14/2026 - 2026.09 OOB SecurityUpdate for Windows 10 and later`

The wizard selected the newest entry by default, which was the D release. Check the selection
before you continue. A D release isn't a security update.

<a id="create-a-policy"></a>
## Create an Expedite Policy

To create a policy, do the following:

1. In the Microsoft Intune admin center, go to **Devices** > **Windows** > **Windows updates**.
2. Select the **Quality updates** tab.
3. Select **Create** > **Expedite policy**.
4. On **Settings**, enter a **Name** and a **Description**.
5. In **Select the quality update you would like to Expedite**, select the update.
6. In **If a reboot is required, select the number of days before it's enforced**, select `0`, `1`,
   or `2` days. For the choice, see [Choose the Restart Deadline](#restart-deadline).
7. Select **Next**. On **Scope tags**, add scope tags if your tenant uses them, and then select
   **Next**.
8. On **Assignments**, select **Add groups**, and then select the device or user groups.
9. On **Review + create**, select **Create**.

The policy deploys to the assigned groups as soon as you create it.

<a id="restart-deadline"></a>
### Choose the Restart Deadline

The restart deadline sets how long users can put off the restart after the update installs. Users
can restart right away, schedule a restart, or let Windows pick a time outside their active hours.
If the device restarts on its own before the deadline, the forced restart is canceled. If the
update doesn't need a restart, the deadline doesn't apply.

| Deadline | What users get |
|---|---|
| `0` days | A restart notice as soon as the update installs, with little time to save their work. Use it only for devices or updates that must finish and restart right away. |
| `1` day | A forced restart 24 hours after the install, whatever the active hours. |
| `2` days | A forced restart 48 hours after the install, whatever the active hours. |

The forced restart happens at the deadline even during working hours.

<a id="manage-a-policy"></a>
## Edit or Delete an Expedite Policy

To find a policy, go to **Devices** > **Windows** > **Windows updates** > **Quality updates**, and
select the policy. From its **Overview** pane, you can do the following:

- Select **Properties** > **Edit** to change the settings, scope tags, or assignments.
- Select **Delete** to remove the policy from Intune.

Deleting a policy doesn't uninstall an update that has already installed. Windows Update tries to
cancel installs that are in progress, but it can't guarantee that they stop. To remove a bad
update, uninstall it from the devices separately.

<a id="reports"></a>
## Monitor an Expedite Policy

Use these reports to follow an expedite policy:

- **Summary report:** Go to **Reports** > **Windows updates**. The **Summary** tab shows the
  **Windows Expedited Quality updates** table. For details, select the **Reports** tab >
  **Windows Expedited Update Report**, select a profile, and then select **Generate report**.
- **Device report:** Go to **Devices** > **Monitor** > **Expedited quality update policies with
  alerts**, and then select a profile. Use it to find the devices with errors.

<a id="update-states"></a>
### Update States

Each device moves through these states:

| State | Substate | What it means |
|---|---|---|
| Pending | Validating | The service is checking whether it can expedite the device. |
| Pending | Scheduled | The device passed validation and is scheduled to be expedited. |
| Offering | OfferReady | The service sent the expedite instructions to the device. |
| Installing | OfferReceived | The device scanned and found the update, but hasn't started the download. |
| Installing | DownloadStart | The download started. |
| Installing | DownloadComplete | The download finished. |
| Installing | InstallStart | The install started. |
| Installing | InstallComplete | The install finished. The device moves to RestartRequired or UpdateInstalled. |
| Installing | RestartRequired | The device needs a restart to finish. |
| Installing | RestartInitiated | The device is restarting. |
| Installing | RestartComplete | The device finished the restart. |
| Installed | UpdateInstalled | The update installed. |

A device that stays at **OfferReady** hasn't scanned against Windows Update yet. Check that it's
online, and that the settings in
[Prepare Devices Before You Need to Expedite](#prepare-devices) are in place.

<a id="unsupported-callouts"></a>
## What the Policy Doesn't Do

- It doesn't expedite feature updates or driver updates. For feature updates, see
  [Windows Feature Updates](09-windows-feature-updates.md).
- It doesn't support preview builds or Windows Enterprise LTSC.
- It doesn't expedite a D release on Windows 10. Those devices aren't expedited and show an alert.
- It can't take more than one update per policy.
- It doesn't uninstall an update when you delete the policy.
- It doesn't change the schedule for later updates.

<a id="related-resources"></a>
## Related Resources

- [Patch Management Overview](00-overview.md): Cross-platform comparison and ring terminology
- [Windows WUfB Rings](01-windows-wufb-rings.md): Update ring deferrals, deadlines, and Hotpatch
- [Windows Feature Updates](09-windows-feature-updates.md): Target and hold a Windows version
- [Windows Autopatch](07-windows-autopatch.md): Service-managed quality update rollouts
- [Enterprise Update Plan](../../recipes/05-enterprise-update-plan.md): The fleet-wide update plan

<a id="external-references"></a>
## External References

- [Manage Windows quality updates (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-quality-updates)
- [Expedite policies for Windows quality updates (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-expedite-policy)
- [Monitor Windows quality updates (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-updates/windows/monitor-quality-updates)
- [Policy CSP - Update (Microsoft Learn)](https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-update)
