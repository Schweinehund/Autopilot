---
last_verified: 2026-08-20
review_by: 2026-10-19
applies_to: all
audience: admin
platform: Windows
---

> **Platform applicability:** This guide is Windows-specific and covers the Intune driver and
> firmware update policy as its own surface — approval modes, the approval workflow, deferral and
> deadline behavior, OEM catalog and firmware delivery, reporting, Configuration Manager
> co-existence, and the documented absences. For the cross-platform overview, see
> [Patch Management Overview](00-overview.md). For WUfB deployment ring topology and Autopatch ring
> disambiguation, see [Windows WUfB Rings](01-windows-wufb-rings.md).

# Windows Driver and Firmware Updates

This guide covers the Windows driver and firmware update policy in Microsoft Intune as a policy
surface in its own right — what it does, how updates are approved, which WUfB deployment ring
settings reach it and which do not, how firmware arrives, what the reports show, how it co-exists
with an on-premises update source, and what it does not do at all.

For the cross-platform comparison and the Ring Terminology hub, see
[Patch Management Overview](00-overview.md). For WUfB deployment ring topology, Autopatch ring
disambiguation and the Hotpatch servicing model, see
[Windows WUfB Rings](01-windows-wufb-rings.md).

**Autopilot warning:** driver update policies do not apply during Windows Autopilot, and Windows
still applies critical updates during Autopilot which may include critical driver updates an admin
has not approved. Both halves are documented in
[Unsupported and Anti-Feature Callouts](#unsupported-callouts).

**Windows-version applicability:** the policy surface is not Windows-11-only — it covers Windows 10
and later, scoped by edition rather than by OS version, with Windows Enterprise LTSC excluded. Only
the Configuration Manager co-existence procedure below carries a Windows 11 restriction.

<a id="what-this-policy-does"></a>
## What This Policy Does

Windows driver updates in Intune are not a sub-setting of a quality or feature update policy. They
are a policy type of their own, with their own targeting, their own approval workflow and their own
reports:

> In Microsoft Intune, Windows driver updates are managed through **driver update policies**, which
> provide a dedicated policy surface for reviewing, approving, and deploying driver updates to
> managed devices.

**Source:** [Manage Windows driver updates](https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-driver-updates) (updated 2026-04-09)

Four components carry an approved driver update to a device, and knowing which component owns which
decision is what makes the rest of this guide readable:

> 1. **Microsoft Intune** provides device identity, assignment, and driver update approval
>    information. Intune sends policy settings, approved drivers, and pause commands to Windows
>    Autopatch.
> 2. **Windows Autopatch** uses this information to configure Windows Update behavior for managed
>    devices and to coordinate driver update deployment.
> 3. **Windows Update** evaluates device and hardware information to determine which driver updates
>    are applicable, and installs only approved updates during regular update scans.
> 4. **Reporting data** collected during update operations is sent through Windows Autopatch and
>    surfaced in Intune reporting.

**Source:** [Manage Windows driver updates](https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-driver-updates) (updated 2026-04-09)

The driver policy decides **which** driver updates a device is allowed to install. It does not decide
**how** the install is experienced:

> Client-side install behavior—such as restarts and user notifications—continues to be governed by
> standard Windows Update policy settings.

**Source:** [Manage Windows driver updates](https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-driver-updates) (updated 2026-04-09)

The configuration surface is **Intune > Devices > Windows > Driver and firmware updates** (or
**Intune > Devices > Update policies for Windows 10 and later > Driver and firmware updates**,
depending on the Intune blade version at the time of access).

**Scope of the driver list.** The policy can only offer what the OEM has already published to the
public update service:

> Any driver updates that are currently published to Windows Update and applicable to one or more
> devices in the policy are available through driver update policies.

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09)

**The driver list is an availability list, not an inventory.** This is the single most common
misreading of the policy blade:

> The driver list isn't a record of the driver versions currently installed on devices assigned to
> the policy. ... **Intune doesn't collect an inventory of installed drivers.**

**Source:** [Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy) (updated 2026-04-24)

**Prerequisites and scope limits.** Confirm all of the following before creating a policy. The
sources state the requirements themselves, not what a device does when one is unmet, so treat an
unmet prerequisite as a probable silent no-op and verify against the reports rather than assuming
policy creation will block:

- **Editions** — "This feature supports the following Windows editions: Pro / Pro Education /
  Enterprise / Education". "Windows Enterprise LTSC (Long Term Service Channel) isn't supported. Use
  update ring policies instead."
- **Licensing** — "To use this feature, the following licenses are required: Microsoft Intune Plan 1
  / A Windows license that includes the [Autopatch entitlement]."
- **Cloud environment** — "This feature is supported in the following cloud environments: Public
  cloud / Government Community Cloud (GCC)". GCC High and DoD are absent from that list.
- **Device requirements** — devices must be "Managed by Intune / Microsoft Entra joined / Microsoft
  Entra hybrid joined"; "Telemetry must be turned on, with a minimum setting of **Required**"; and
  "The *Microsoft Account Sign-In Assistant* service (`wlidsvc`) must be enabled and running."
- **Role to manage** — "To manage this feature, use an account with at least one of the following
  roles: [Policy and Profile manager] / [Custom role] that includes: The **Device configurations**
  permissions **Assign**,**Create**,**Delete**,**View Reports**,**Update**, and **Read**".
- **Role to view reports** — "To view the reports for this feature, use an account with at least one
  of the following roles: [Endpoint Security Manager] / [Read Only Operator] / [Help Desk Operator]
  / [Custom role] with the **Managed devices**/**View Reports** permission."

**Source:** [Manage Windows driver updates](https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-driver-updates) (updated 2026-04-09)

Two further settings are prerequisites in the sense that they must not be blocking. In the WUfB deployment
ring policy, "Ensure the *Windows driver* setting is set to *Allow*." In a settings catalog policy,
"In the *Windows Update client policies* category, ensure that *Exclude WU Drivers in Quality
Update* is set to *Allow Windows Update drivers*."

**Source:** [Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy) (updated 2026-04-24)

Finally, expect latency before a new policy shows a useful list: "it can take up to 24 hours for all
healthy devices to check in. After this, Intune needs to process the results of the scan to provide
the inventory of available driver updates."

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09)

<a id="approval-modes"></a>
## Approval Modes

A driver update policy is created in one of two approval modes. The mode determines what happens to
a driver update the moment it appears in the policy.

**Automatic approval.** Microsoft's recommended default:

> Automatic mode (default) is recommended for organizations with standard Original Equipment
> Manufacturer (OEM) devices where no recent driver or hardware issues occurred due to Windows
> Updates.

**Source:** [Manage driver and firmware updates with Windows Autopatch](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/manage/windows-autopatch-manage-driver-and-firmware-updates) (updated 2025-06-04)

What the mode actually does is narrower than its name suggests — it reaches **recommended** driver
updates only:

> Automatically approve all recommended driver updates: With this option, all new recommended driver
> updates that are added to the policy are added with a status of *Approved* and begin to install on
> applicable devices without having to be reviewed or approved by an admin.

**Source:** [Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy) (updated 2026-04-24)

**Manual approval.** Nothing reaches a device unless an admin says so:

> When you use Manual mode, no drivers are installed in your environment without your explicit
> approval.

**Source:** [Manage driver and firmware updates with Windows Autopatch](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/manage/windows-autopatch-manage-driver-and-firmware-updates) (updated 2025-06-04)

> Manually approve and deploy driver updates: With this option, each new driver update that is added
> to the policy has its status set to *Needs review*. An admin must edit the policy to change the
> status of each individual update to *Approved* before that update can deploy to applicable
> devices.

**Source:** [Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy) (updated 2026-04-24)

**The approval type is immutable after policy creation.** Decide the mode before creating the
policy — on an Intune driver update policy the approval type cannot be edited at all afterwards, so
changing your mind later means creating a different policy. On the Windows Autopatch side, where a
mode switch between automatic and manual *is* possible, it is destructive rather than merely
awkward; see [Unsupported and Anti-Feature Callouts](#unsupported-callouts).

> After a policy is created, you won't be able to edit the policy to change the approval type. If
> the approval type is automatic, you can edit the value for *Make updates available after (days)*.

**Source:** [Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy) (updated 2026-04-24)

**Recommended drivers versus other drivers.** Either mode only makes sense alongside the two lists it
acts on. A recommended driver is not "the newest driver" — it is a status the OEM confers:

> **Recommended drivers**: Recommended drivers are the best match for the 'required' driver updates
> that Windows Update can identify for a device. To be a recommended update, the OEM or driver
> publisher must mark the update as required and the update must be the most recent update version
> marked as required.

> **Other drivers**: Other driver updates are updates that are available from the original equipment
> manufacturer (OEM) aside from the current recommended driver update.

> These updates can include: ... Firmware updates ... Optional driver updates, or updates that the
> OEM doesn't intend to be installed on all devices by default

**Source:** [Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy) (updated 2026-04-24)

**Other-list updates always require manual approval, in both modes.** This holds even under an
automatic policy, because automatic approval reaches recommended drivers only:

> New updates that aren't a recommended driver update are added to the *other drivers* list of the
> policy and have their status set *Needs review*. These updates must be manually approved before
> they can be deployed to a device.

**Source:** [Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy) (updated 2026-04-24)

Because firmware updates arrive on the *other drivers* list, that rule is what governs firmware. See
[OEM Catalog and Firmware Delivery](#oem-catalog-firmware).

<a id="approval-workflow"></a>
## The Approval Workflow

Every driver update in a policy holds one of four statuses — *Needs review*, *Approved*, *Declined*
or *Paused* — and the legal transitions between them are a closed set:

> - Only new driver updates can be assigned the status *Needs review*. However, a new recommended
>   update that is added to a policy set for Automatic approval is added as *Approved*.
> - A driver update that *Needs review* can be *Approved* or *Declined*.
> - An *Approved* update can be *Paused*.
> - A *Paused* update can be *Approved*.
> - After an update is *Approved*, it can never be *Declined*, but you can *Pause* it indefinitely.

**Source:** [Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy) (updated 2026-04-24)

**Approval is one way.** The last line of that set is the constraint most likely to surprise an
admin mid-incident: once an update is Approved it can never be Declined. Pause is the only reverse
gear, and it is indefinite rather than undoing anything. Treat approval as a commitment, not as a
toggle.

**Approval sets an availability date.** Approving an update manually does not mean "install now":

> Any time a driver update's status is manually changed to *Approved*, the availability of that
> update (which is when Windows Update begins to deploy it to devices) is defined by the date you
> assign for *Make available in Windows Update*.

**Source:** [Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy) (updated 2026-04-24)

**A policy cannot downgrade a device.** Approving a version older than the one a device already has
is a no-op rather than a regression:

> Windows Update will only install a driver update on a device if the updates version is newer than
> the version of the driver that's currently on the device. So, there's no risk of a policy
> installing an older version of a driver and downgrading a device's driver version.

**Source:** [Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy) (updated 2026-04-24)

**Bulk actions have two hard limits.** "You can only select up to 100 drivers at a time." And: "You
can't mix actions. For example, you can't Pause and Approve a set in one action. You must go through
each action separately."

**Source:** [Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy) (updated 2026-04-24)

**Approved always wins across policies.** If a device sits in more than one driver policy, the most
permissive status decides:

> Because the status of *approved* always wins, the driver installs on the device despite any other
> status for that update that is set in any other policy.

That is why Microsoft recommends a single policy per device:

> While the use of multiple policies per device is supported, we don't recommend doing so. Instead,
> we recommend adding devices to a single policy to avoid confusion about whether a driver for a
> device is or isn't approved.

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09)

**Pause is a best effort, not a stop button.** This is the operational limit that makes the absence
of driver rollback consequential rather than academic:

> Pause is a best effort, and when an update is paused, Windows Autopatch removes the approval.
> However, devices won't know that an update is paused until it's next scan for updates.

> If a device scans for updates and discovers an update is paused and that the device is in the
> process of downloading, installing, or waiting to restart, then Windows Update on the device
> attempts a "best effort" to remove that driver update from being installed.
> **If it can't halt the installation, the update completes its installation.**

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09)

The policy page states the same boundary from the other side:

> Pausing an update doesn't roll back a completed installation of the update but can stop an active
> install of an update that is currently underway.

**Source:** [Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy) (updated 2026-04-24)

Microsoft's own cross-policy guidance follows from those two facts — watch the fastest policy and
pause the same update elsewhere before it lands:

> If you use policies with automatic approval, plan to monitor the policy for early signs of
> problems. If a driver update problem is identified in an early deployment ring, you can then pause
> that same update in your other policies.

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09)

<a id="deferral-deadline-behavior"></a>
## Deferral and Deadline Behavior

The single most common planning error with driver updates is assuming that whatever a WUfB
deployment ring does to quality updates, it also does to drivers. Some of it does and some of it
does not, and the split is not intuitive. Stated as a triad: **the quality-update deferral does not
reach drivers; the quality-update deadline and grace period do; and the user-experience settings
do.**

**The WUfB deployment ring quality-update deferral does not reach drivers.** The driver policy has
its own deferral instead:

> The deferral period set for Quality Updates within the update ring policy does not apply to drivers that are approved using the Driver Update Policy.
> Instead, use the deferral setting in the Driver policy to set a deferral.  In fact, using multiple
> driver policies with different deferral settings to create driver deployment rings is highly
> recommended. Remember to only assign a device to one driver policy.

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09)

**The driver deferral is scoped to automatic approvals only.** A manual approval carries its own
explicit start date instead of inheriting the deferral:

> The deferral period only applies to automatically approved driver and firmware updates.
> An admin must specify the date to start offering a driver with any manual approval.

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09)

**The deadline and grace period do reach drivers.** This is the other half of the asymmetry, and it
is what stops the first half from being read as "the WUfB deployment ring settings are irrelevant to
drivers":

> The Quality Update deadline and grace period settings apply to drivers.

> The deadline calculation for both quality and feature updates is based off the time the client's
> update scan initially discovered the update.

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09)

**The driver policy's own deferral is 0 to 30 days, counted from the day the update entered the
policy** — not from the day the OEM published it, which is the value admins usually assume:

> **Make updates available after (days)**: This setting is a deferral period that delays when
> Windows Update begins to deploy and install the new recommended update that was automatically
> added to the policy with a status of *Approved*. The delay supports from zero to 30 days and
> starts from the day the update is added to the policy, not from the date the update was made
> available or published by the OEM.

**Source:** [Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy) (updated 2026-04-24)

**User-experience settings do reach drivers.** Active hours, notification behavior and automatic
update behavior are not driver-exempt:

> Yes, user experience settings such as automatic update behavior, active hours, notifications, and
> so on, are applied for driver updates as well.

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09)

**Blocking driver delivery is a WUfB deployment ring setting, not a driver-policy setting.** There
is no "block" control on the driver update policy itself. The lever with that effect is the WUfB
deployment ring's *Windows drivers* setting (CSP `ExcludeWUDriversInQualityUpdate`):

> **Allow** - To include Windows Update drivers during updates. **Block** - To prevent scanning for
> drivers.

Because it is a WUfB deployment ring setting, its blast radius is the whole WUfB deployment ring:
*Block* suppresses driver scanning for every device assigned to that WUfB deployment ring, not only
for the devices a driver update policy targets. The prerequisite stated earlier — leave the *Windows
driver* setting at *Allow* — is this same setting seen from the other side.

**Source:** [Update rings policy settings](https://learn.microsoft.com/en-us/intune/device-updates/windows/ref-update-ring-settings) (updated 2026-04-09)

**The ranges, first-party.** These are the boundaries a schedule has to fit inside. They are
deliberately generic: choose values from the branch criteria your own change-management process
defines, not from a worked example.

| Setting | Where it is set | First-party range |
|---------|-----------------|-------------------|
| Quality update deferral | WUfB deployment ring policy | "Specify the number of days from 0 to 30 for which quality updates are deferred." |
| Feature update deferral | WUfB deployment ring policy | "Specify the number of days from 0 to 365 for which feature updates are deferred." |
| Deadline for quality updates | WUfB deployment ring policy | "Specifies the number of days a user has before quality updates are installed on their devices automatically (2-30)." |
| Deadline for feature updates | WUfB deployment ring policy | "Specifies the number of days a user has before feature updates are installed on their devices automatically (2-30)." |
| Grace period | WUfB deployment ring policy | "Specifies a minimum number of days after deadline until restarts occur automatically (0-7)." |
| Driver deferral | Driver update policy | Zero to 30 days, from the day the update is added to the policy |

**Source:** [Update rings policy settings](https://learn.microsoft.com/en-us/intune/device-updates/windows/ref-update-ring-settings) (updated 2026-04-09)
**Source:** [Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy) (updated 2026-04-24)

<a id="oem-catalog-firmware"></a>
## OEM Catalog and Firmware Delivery

There is no OEM-catalog integration surface in Intune. The OEM catalog reaches your fleet through
Windows Update, and the driver update policy is a filter on what Windows Update is allowed to
install. Four consequences follow, and the last one is the one nobody expects.

**Recommended status is conferred by the OEM, not by Intune.**

> **Recommended drivers**: Recommended drivers are the best match for the 'required' driver updates
> that Windows Update can identify for a device. To be a recommended update, the OEM or driver
> publisher must mark the update as required and the update must be the most recent update version
> marked as required.

**Source:** [Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy) (updated 2026-04-24)

**Firmware arrives on the *other drivers* list.** The other-drivers list is explicitly defined to
include firmware:

> These updates can include: ... Firmware updates ... Optional driver updates, or updates that the
> OEM doesn't intend to be installed on all devices by default

**Source:** [Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy) (updated 2026-04-24)

And other-list updates are the ones that always need a human:

> New updates that aren't a recommended driver update are added to the *other drivers* list of the
> policy and have their status set *Needs review*. These updates must be manually approved before
> they can be deployed to a device.

**Source:** [Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy) (updated 2026-04-24)

Those are the two sourced facts. Read them together before planning any firmware rollout, and note
in particular that an automatic-approval policy does not change either of them, because automatic
approval reaches recommended driver updates only.

**Only what the OEM publishes to Windows Update is in scope.**

> Any driver updates that are currently published to Windows Update and applicable to one or more
> devices in the policy are available through driver update policies.

This includes plug-in devices: "Do driver update policies update drivers for plug-in devices? — Yes,
if the driver updates are published to Windows Update by the OEM vendor."

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09)

**Publishing to Windows Update carries a security requirement.** This is why some OEM firmware never
appears in the policy at all:

> Updates that are published to Windows Update have a requirement to use a Windows mechanism that
> enables securely updating the firmware or driver without requiring the BIOS/UEFI to be unlocked.

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09)

**Windows Update can be ahead of the vendor's own tool.** Do not assume the vendor utility is the
leading edge:

> The possibility of a delay depends on the vendor or OEM who determines the availability of their
> updates. Because driver updates are digitally signed by the same portal before they're published
> to Windows Updates, driver updates might become available through Windows Update before they
> become available via the vendors tools.

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09)

**The policy does not honour the OEM's Computer Hardware ID targeting.** This is the highest-impact
item in this section and it has no workaround inside the policy:

> Windows driver update policies don't enforce Computer Hardware ID (CHID) targeting defined by
> OEMs, even when those drivers are listed as recommended. As a result, managed devices can receive
> newer recommended driver versions instead of CHID-targeted drivers.

**Source:** [Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy) (updated 2026-04-24)

If a model depends on a CHID-pinned driver, the driver update policy is not the control that keeps
it pinned. See [Unsupported and Anti-Feature Callouts](#unsupported-callouts).

<a id="driver-update-reporting"></a>
## Reporting

Driver update reporting is self-contained. It has a dedicated first-party page and its data does not
surface anywhere else:

> The data in the Intune reports for Windows Driver update policies is used only for these reports
> and doesn't appear in other Intune reports. The following reports are available: Windows Driver
> updates summary / Windows Driver updates report / Windows Driver update failures

**Source:** [Reports for Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/monitor-driver-updates) (updated 2026-04-29)

**Where they live.** The summary and driver reports are at **Reports > Windows Updates**. The
failures report is at **Devices > Monitor > Driver update policies with alerts**.

**Source:** [Reports for Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/monitor-driver-updates) (updated 2026-04-29)

**Worst status wins, and this is counter-intuitive.** A device with nine successful driver updates
and one that needs review is counted once, in the NeedsReview column:

> However, each device is only represented once in a single status column, based on the worst status
> across all of the updates that apply to that device.

The ordering that decides "worst" is explicit:

> Intune ranks the following statuses in order of priority, from best (Success) to worst
> (NeedsReview): **Success** ... **In progress** ... **Paused** ... **Error** ... **Cancelled** ...
> **NeedsReview**

**Source:** [Reports for Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/monitor-driver-updates) (updated 2026-04-29)

Read together, those two rules mean the summary report's device counts are a floor on health, not a
per-update tally, and a single unreviewed other-driver update can move a healthy device into the
worst column.

**The summary report cannot be drilled into.** "This report doesn't support drilling in for more
details about devices, driver updates, or policy details." Use the driver updates report or the
failures report when you need per-device or per-update detail.

**Source:** [Reports for Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/monitor-driver-updates) (updated 2026-04-29)

**The failures report carries these fields:** Device Name / Driver Name / Driver Class / Alert
Message / Deployment Error Code / UPN / Intune Device ID.

**Last Scan Time is the diagnostic column.** When approved updates are not landing, check it first:

> **Last Scan Time**: This column provides insight into when a device last checked for updates. This
> can help explain why approved updates haven't installed.

**Source:** [Reports for Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/monitor-driver-updates) (updated 2026-04-29)

**Retention is six months, measured from last activity — not from approval.** Plan any longer-term
evidence retention outside Intune:

> Reporting data for driver updates remains available until the end of a data retention period is
> reached. This period is six months since the last time an event for the update is received.

**Source:** [Reports for Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/monitor-driver-updates) (updated 2026-04-29)

<a id="configmgr-coexistence"></a>
## Configuration Manager Co-management and Co-existence

You do not have to move the Windows Update workload to Intune before you can use driver and firmware
management. There is a supported co-existence path that leaves the workload where it is — and it
carries a warning severe enough that it must be read before the procedure, not after.

**The step 3 warning — do not configure the same setting from two places.** Step 3 below says
*domain-based group policy* deliberately. Configuring the same update-source setting from Intune or a CSP instead
is not an alternative route to the same result:

> Because Configuration Manager uses a local group policy to configure the update source policy,
> using Intune or a CSP to attempt to configure these same settings result in an undefined and unpredictable device state.

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09)

> You can continue to use Configuration Manager for updates other than Drivers, or start to move
> other update types to cloud management in Intune one at a time. To do this, first, enable [cloud
> attach] or co-management in your Configuration Manager hierarchy to enroll your managed devices in
> Intune.

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09)

**Moving the workload is still the preferred path.** The procedure below is the fallback, not the
recommendation:

> The recommended and preferred path to embrace cloud based updates is to move the [Windows Update]
> workload to Intune. If your organization isn't ready for this, you can use the Driver and Firmware
> management capability in Intune without moving the workload by completing the following steps:

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09)

*Note:*

> The following procedure is supported for Windows 11 devices. For Windows 10 devices, we recommend
> moving the Windows Update workload in the Configuration Manager co-management settings to Intune.
> Alternatively, configure the Windows Update workload to the Pilot setting and specify a collection
> containing the in-scope Windows 10 managed devices.

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09)

The procedure is **six steps — four required, two optional**:

1. **Leave the workload where it is** — "Leave the [Windows Update] workload set to Configuration
   Manager."
2. **Configure the driver policies in Intune** — "Configure your driver policies in Intune to enroll
   devices and get them ready for management **as detailed at [Manage policy for Windows Driver
   updates with Microsoft Intune]**."
3. **Point Driver Updates at Windows Update using domain group policy** — "Configure a domain-based
   group policy to configure **Windows Update** as the source for **Driver Updates** using the
   [Specify source for specific classes of Windows Updates policy]." The link target is
   [Use Windows Update client policies and WSUS together](https://learn.microsoft.com/en-us/windows/deployment/update/wufb-wsus).
4. **Enable data collection in Intune** — "Enable [data collection] in Intune for devices that you
   wish to deploy drivers and firmware to."
5. **[Optional] Enforce allowing diagnostic data submission** — "[Optional] Enforce allowing
   diagnostic data submission using a policy. Diagnostic data submission to Microsoft enables the
   use of [Windows Update reports for Microsoft Intune]."
6. **[Optional] Enable device name collection** — "[Optional] Enable device name collection in
   diagnostic data."

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09)

**Steps 4 and 5 are additive, not duplicative.** Step 4's *data collection* is the driver-policy
prerequisite at the Intune tenant layer. Step 5's *Allow Diagnostic data* is a device-layer setting.
They are different settings at different layers, and step 5's note explains why it is worth doing:

> By default, diagnostic data submission to Microsoft is allowed on Windows devices. Disabling
> diagnostic data collection prevents the use of Windows Update reports for Microsoft Intune from
> reporting any update information for your managed devices.

> Configure the **Allow Diagnostic data** setting to **Optional** or **Required** using a
> domain-based group policy or Intune.

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09)

**The optional steps carry a co-management workload prerequisite of their own.** This is the trap in
the procedure: the fleet this path exists for is precisely the one that has kept its workloads on
Configuration Manager, and doing the optional steps *from Intune* requires moving one of them.

> Using Intune to configure any of the diagnostic data settings mentioned earlier requires that you
> move the [Device Configuration] co-management workload to Intune.

The domain-based group policy route named in the previous quote avoids that dependency.

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09)

**The co-existence path covers drivers by default, and feature updates by extension.** What it does
*not* cover is running WUfB deployment ring policies in Intune for quality or feature updates —
those still require the workload move:

> Using Update Ring policies in Intune for Quality or Feature Updates requires you to move the
> **Windows Update** workload to Intune.

A **Feature update** policy is a different policy type, and it can ride the same scan source group
policy that step 3 already configures:

> You can move Feature update management to the cloud in Intune by configuring a [Feature update]
> policy in Intune and setting the **Feature Updates** setting to **Windows Update** using the
> [Specify source for specific classes of Windows Updates policy] group policy.

The FAQ names no equivalent extension for quality updates: managing those from an Intune WUfB
deployment ring policy still requires the workload move.

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09)

**The scan source policy, from its own page.** Step 3's policy is what makes per-class routing
possible:

> The Windows update scan source policy enables you to choose what types of updates to get from
> either WSUS or Windows Update client policies.

> The specify scan source policy enables you to specify whether your device gets the following
> Windows update types form WSUS or from Windows Update: Feature updates / Windows quality updates /
> **Driver and firmware updates** / Updates for other Microsoft products

**Name divergence — you need both spellings.** The FAQ's link text in step 3 is *"Specify source for
specific classes of Windows Updates policy"*, and that is the phrasing to search the documentation
for. In the Group Policy editor the setting is named differently: **Specify source service for
specific classes of Windows Updates**, under
`Computer Configuration\Administrative Templates\Windows Components\Windows Update\Manage updates offered from Windows Server Update Service\`.
Searching the editor for the FAQ's phrasing will not find it.

The equivalent CSP nodes are `Update/SetPolicyDrivenUpdateSourceForDriverUpdates`,
`Update/SetPolicyDrivenUpdateSourceForFeatureUpdates`,
`Update/SetPolicyDrivenUpdateSourceForOtherUpdates` and
`Update/SetPolicyDrivenUpdateSourceForQualityUpdates` — but read the step 3 warning above before
configuring them from a CSP on a Configuration Manager-managed device.

**This policy supersedes Dual Scan, and the two must not be combined:**

> The policy Do not allow update deferral policies to cause scans against Windows Update, also known
> as Dual Scan, is no longer supported on Windows 11 and on Windows 10 it's replaced by the new
> Windows scan source policy and isn't recommended for use. If you configure both on Windows 10, you
> won't get updates from Windows Update.

The scan source policy itself is not a Windows 10 legacy control — it applies to Windows 10 version
2004 and above and to Windows 11. Microsoft frames it as the incremental transition lever:

> We recommend using this policy on your transition from fully on-premises managed environment to a
> cloud supported one. Whether you move only drivers to the cloud today or drivers and quality
> updates and then later move your other workloads, taking a step-by-step approach might ease the
> transition.

**Source:** [Use Windows Update client policies and WSUS together](https://learn.microsoft.com/en-us/windows/deployment/update/wufb-wsus) (updated 2025-10-02)

For the workload slider sequence itself, see
[Workload Slider Migration](../co-management/02-windows-workload-sliders.md) and
[Migration Paths and Autopatch](../co-management/03-cocmgmt-migration-paths.md).

<a id="unsupported-callouts"></a>
## Unsupported and Anti-Feature Callouts

**Driver update policies do not apply during Windows Autopilot, and critical drivers install anyway.**
Both halves matter, and neither is safe to read on its own:

> Can I apply driver update policies during Windows Autopilot? — No. Driver updates aren't supported during Windows Autopilot at this time.

> Windows applies critical updates during Windows Autopilot. These updates may include critical driver updates that have not yet been approved by an admin.

The first half alone reads as "nothing happens to drivers during Autopilot", which is false. A device
can finish provisioning with a driver version the driver policy never approved, and the policy only
begins to govern it afterwards.

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09)

**There is no driver rollback.** This is the absence that shapes every other operational choice in
this guide:

> No. Windows Update client policies don't currently support driver rollback. While rollback could
> be scripted, there are too many potential variables to provide a useful sample script for doing
> so. If you must remove a driver, consider manual methods like PowerShell.
> To help avoid issues that require rolling back a driver from large numbers of devices, use
> *deployment rings* to limit driver installation to small initial groups of devices. This approach
> allows time to evaluate the success or compatibility of a driver before broadly deploying it
> across your organization.

Microsoft names exactly two mitigations there, and both are preventive rather than corrective:
staged exposure to limit blast radius, and manual removal via PowerShell after the fact. The policy
page states the same absence independently:

> Keep in mind that policies for Windows driver updates don't support options to remove or roll-back
> driver updates.

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09)
**Source:** [Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy) (updated 2026-04-24)

**Switching between Automatic and Manual mode is destructive.** It is not a mode toggle — it
replaces the policies and discards their approval history:

> If you switch between Automatic and Manual modes, new policies are generated to **replace old
> policies**. **You'll lose any approvals, paused drivers, and declined drivers previously made for
> those groups and/or deployment rings**.

This is documented on the Windows Autopatch side and is scoped to Autopatch-managed driver profiles
and their groups and Autopatch deployment rings. On the Intune side the equivalent constraint is
that the approval type cannot be changed at all after a policy is created, so the practical rule is
the same in both places: choose the mode when you create the policy.

**Source:** [Manage driver and firmware updates with Windows Autopatch](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/manage/windows-autopatch-manage-driver-and-firmware-updates) (updated 2025-06-04)

**The approval type is fixed for the life of the policy.**

> After a policy is created, you won't be able to edit the policy to change the approval type. If
> the approval type is automatic, you can edit the value for *Make updates available after (days)*.

**Source:** [Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy) (updated 2026-04-24)

**Extension drivers are visible but not manageable.**

> These are likely *extension* drivers, which are "sub drivers" that a main driver can reference to
> be installed when the main driver is installed or updated. Extension drivers show up in the
> installed drivers or update history on the device, but aren't directly manageable. Because
> extension drivers don't function without base drivers, it's safe to allow them to install.

The Autopatch side says the same and adds how to spot them: "Windows Autopatch doesn't manage
extension drivers. They're easily identified by the term 'extension' in the name."

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09)
**Source:** [Manage driver and firmware updates with Windows Autopatch](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/manage/windows-autopatch-manage-driver-and-firmware-updates) (updated 2025-06-04)

**Plug and Play installs the first driver without asking; only later updates are governed.**

> Plug and Play can also install drivers automatically. When Windows detects new hardware or
> software (such as a mouse, keyboard, or webcam) without an existing driver, it installs the latest
> driver to ensure the component functions immediately. After the initial installation, any future
> updates to these drivers will require approval.

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09)

**Computer Hardware ID targeting is not enforced.** An OEM can pin a driver to a specific hardware
identifier and the policy will not honour it, so a managed device can end up on a newer recommended
version than the OEM intended for that model. See
[OEM Catalog and Firmware Delivery](#oem-catalog-firmware) for the quoted statement.

**There is no inventory of installed drivers**, which is why you cannot audit your way out of any of
the items above:

> The driver list isn't a record of the driver versions currently installed on devices assigned to
> the policy. ... **Intune doesn't collect an inventory of installed drivers.**

**Source:** [Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy) (updated 2026-04-24)

The remaining items are binary — the feature is either supported or it is not:

| Feature | Why it's unsupported / what breaks | Do this instead |
|---------|-------------------------------------|------------------|
| Assignment filters on a driver update policy | "No. Driver Updates aren't currently supported with assignment filters." Scoping must come from group assignment instead | Scope with the assigned groups, and keep one policy per device so approval status stays unambiguous |
| Windows Enterprise LTSC | "Windows Enterprise LTSC (Long Term Service Channel) isn't supported." The policy covers none of those devices | "Use update ring policies instead" — see [Windows WUfB Rings](01-windows-wufb-rings.md) |
| GCC High and DoD tenants | The supported cloud environments are "Public cloud / Government Community Cloud (GCC)". GCC High and DoD are absent from that list | N/A -- no alternative exists within this policy type; manage drivers through your existing on-premises update source |
| Manual driver packaging, `.inf` sideloading and driver injection into images | These are out of band for the policy entirely. Only "driver updates that are currently published to Windows Update" appear in a driver update policy, so a sideloaded or image-injected driver is invisible to it and to its reports | Keep image-time and out-of-band driver work in its own process, and use the policy only for what the OEM publishes to Windows Update |

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09)
**Source:** [Manage Windows driver updates](https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-driver-updates) (updated 2026-04-09)

OEM utilities such as vendor repository managers, image assistants and update retrievers are a
parallel, non-Intune channel. They are not an integration point for this policy, and running both
without deciding which one owns a given driver class reproduces the same conflict the scan source
policy exists to prevent.

## Related Resources

- [Patch Management Overview](00-overview.md) — Cross-platform comparison + Ring Terminology hub
- [Windows WUfB Rings](01-windows-wufb-rings.md) — WUfB deployment ring topology, Autopatch ring
  disambiguation, Hotpatch, and the driver/firmware policy stub
- [Workload Slider Migration](../co-management/02-windows-workload-sliders.md) — Co-management
  workload migration sequence, including the Windows Update workload slider
- [Migration Paths and Autopatch](../co-management/03-cocmgmt-migration-paths.md) — Windows
  Autopatch prerequisites and co-management workload sequencing

## External References

- [Configure Windows driver update policies (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy)
- [Windows Driver Update Policies FAQs (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq)
- [Manage Windows driver updates (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-updates/windows/manage-driver-updates)
- [Reports for Windows driver update policies (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-updates/windows/monitor-driver-updates)
- [Update rings policy settings (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-updates/windows/ref-update-ring-settings)
- [Use Windows Update client policies and WSUS together (Microsoft Learn)](https://learn.microsoft.com/en-us/windows/deployment/update/wufb-wsus)
- [Manage driver and firmware updates with Windows Autopatch (Microsoft Learn)](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/manage/windows-autopatch-manage-driver-and-firmware-updates)
- [Windows Autopatch FAQ (Microsoft Learn)](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/overview/windows-autopatch-faq)
