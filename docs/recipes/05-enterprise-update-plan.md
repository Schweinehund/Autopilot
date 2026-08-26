---
doc_id: RE-227
status: Approved
owner: Intune Admin Lead
doc_type: Guide
platform: all
last_verified: 2026-08-26
review_by: 2026-10-25
applies_to: Every Intune-managed device in the tenant — Windows, macOS, iOS, Android and Linux — across all update surfaces
audience: admin
---

**Platform:** All Platforms · **Doc Type:** Guide · **Doc ID:** RE-227 · **Status:** Approved

# Enterprise Update Plan: A Governed Update Posture for the Whole Fleet

## Summary

Following this plan yields a fleet in which every managed device is covered by exactly one update
authority per surface — Windows quality and feature updates, drivers and firmware, BIOS settings,
Microsoft 365 Apps, packaged applications, and the macOS, iOS, Android and Linux estates — with each
surface's cadence, deadline and exception path recorded as a deliberate choice rather than inherited
from a tenant default, governed end-to-end from Intune. It covers every platform Intune manages and
requires the Intune Administrator role, or an equivalent custom role covering update ring policies,
device configuration profiles, application assignment and compliance policy. Ten Steps take the plan
from Windows update topology through to deferrals and deadlines; nine of them are decisions this
document asks you to make rather than making for you.

> **Scope:** A tenant-wide configuration plan, not a per-platform procedure guide. Each Step decides one thing and links the operations guide that owns the mechanism in full.

## Prerequisites

These are entitlement gates. They decide which decisions below are even open to you — a gate you
cannot meet closes a branch outright rather than making it a worse choice.

- **This plan is NOT:** a per-platform procedure guide, an approval-workflow tool, or a source of tenant-specific ring sizes, deferral days, deadlines or percentages. Every number in this plan is yours to choose.
- **RBAC:** Intune Administrator, or an equivalent custom role covering update ring policies, device configuration profiles, application assignment and compliance policy.
- **Licensing gate on the service-managed branch of [Step 1](#decision-windows-update-topology):** Microsoft Entra ID P1 or P2 and Microsoft Intune are required before Windows Autopatch can be enabled.

  **Source:** [Windows Autopatch prerequisites](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/prepare/windows-autopatch-prerequisites) (updated 2026-02-27), as carried by [Windows Autopatch](../operations/patch-management/07-windows-autopatch.md#enrollment-prerequisites).
- **Ownership and check-in gate on the same branch:** devices must be corporate-owned — Windows bring-your-own devices are blocked during device registration prerequisite checks — and must have been in communication with Intune in the last 28 days, or they are not registered with the service at all. Deployment protection features additionally require devices to send diagnostic data at the Required level as a floor.

  **Source:** [Windows Autopatch prerequisites](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/prepare/windows-autopatch-prerequisites) (updated 2026-02-27), as carried by [Windows Autopatch](../operations/patch-management/07-windows-autopatch.md#enrollment-prerequisites).
- **Workload gate on the same branch:** the Windows Update workload must already be Intune-authoritative — at Pilot Intune or Intune in co-management — before Autopatch can be enabled. Where Configuration Manager is present at all, it must be cloud-attached with Intune. See [Windows WUfB Rings](../operations/patch-management/01-windows-wufb-rings.md#autopatch-disambiguation).
- **BIOS password gate on the Dell branch of Step 4:** the Dell BIOS configuration policy requires that devices do **not** already have a BIOS password set, because Intune must hold the password itself. On an existing fleet whose devices were imaged with a BIOS password in place, that branch is closed outright — this is the likeliest reason a reader's chosen branch turns out to be unavailable. See [Dell BIOS Configuration](../operations/firmware-bios/02-dell-bios-configuration.md#prerequisites).
- **Platform reach gate:** a decision below applies only to the platforms its marker line names. A Windows-only decision has no macOS, iOS, Android or Linux equivalent to make, and leaving it unmade does not leave those platforms ungoverned — their own Steps cover them.

## Unsupported and Anti-Feature Callouts

| Feature | Why it's unsupported / what breaks | Do this instead |
|---------|-------------------------------------|------------------|
| Tenant-specific ring sizes, deferral days, deadlines or percentages written into this plan | This plan is a decision framework, not a tenant configuration. A number fixed here would be wrong for every fleet other than the one it was measured on, and would be copied anyway | Choose each value at the Step that names it and record it in your own change record; Step 10 collects the deferral and deadline values the plan asks for |
| Change-approval, ticketing or sign-off workflow | Intune carries no approval-workflow surface for the decisions in this plan, so a plan implying one would describe tooling that does not exist | Record who decided and when in whatever change system you already run. This plan records what was decided and what it costs to undo |
| Per-platform procedure detail | Re-authoring a mechanism here would create a second copy that drifts from the operations guide that owns it, and a reader would have no way to tell which copy is current | Each Step restates the decision and its consequence, then links the operations guide for the mechanism's full treatment |

## Steps

Every decision Step below carries a marker line naming the platforms the decision applies to and the
reversibility of the branch this plan recommends. The reversibility vocabulary is closed — these
four values and no others:

- **Reversible** — the choice can be undone from Intune and the fleet returns to its prior state.
- **Reversible — disruptive** — the choice can be undone, but undoing it re-imposes on users the exact cost the choice was made to avoid.
- **Destructive** — the choice can be changed, but changing it destroys state that cannot be recreated from Intune.
- **Effectively irreversible** — the choice can be changed only by physical or vendor-side intervention, and on some fleets not at all.

A rating is assigned at the branch this plan **recommends**, not at the worst-case branch. Where a
non-recommended branch is worse, the consequence is stated in that decision's own text and again in
the Rollback/Recovery section below.

<a id="decision-windows-update-topology"></a>
### Step 1: Windows update topology

> **Ask the admin:** Should Windows quality and feature updates be sequenced by the Windows Autopatch service, or authored and rotated by your own administrators?

**Applies to:** Windows-only · **Reversibility:** Reversible — disruptive

| Option | When to choose | Consequence if wrong | Branch |
|--------|-----------------|----------------------|--------|
| Autopatch groups | You want Microsoft to own rollout sequencing, and you can meet every service prerequisite named in the Prerequisites section above | You lose direct authorship. An Autopatch group is a container that includes an Update rings policy for Windows 10 and later among the policies it creates and assigns, so hand-edits to a contained policy object can be overwritten, and a pre-existing ring assignment is superseded by the Autopatch-created one | [Step 1a](#step-1a-autopatch-group-configuration) |
| Standalone update rings | You need to own deferral periods, deadlines and restart behavior per cohort yourself, or you cannot meet one of the Autopatch service prerequisites | You own every rotation decision and every regression window by hand. Nothing promotes validated content between cohorts for you, and a policy left assigned outside the topology you chose drifts out of sync with the devices it was written for | [Step 1b](#step-1b-standalone-update-ring-configuration) |

The framing to avoid here is the one this corpus already corrected: an Autopatch group **contains**
update ring policies rather than excluding them. Enabling the service does not detach devices from
your existing ring topology — it takes over authorship of the ring policy objects it contains. A
policy left outside any Autopatch group stays admin-authored; a policy pulled inside one becomes
service-owned from that point forward, and its cadence then follows the service's own rotation
instead of your configured deferral.

**Source:** [Windows Autopatch groups overview](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/deploy/windows-autopatch-groups-overview) (updated 2026-06-19), as carried by [Windows WUfB Rings](../operations/patch-management/01-windows-wufb-rings.md#autopatch-disambiguation).

### Step 1a: Autopatch group configuration

1. Confirm the Windows Update workload is at Pilot Intune or Intune in co-management before you begin. The service requires that workload to be Intune-authoritative, and enabling the service beforehand is not possible.
2. Navigate to **Intune admin center** > **Tenant administration** > **Windows Autopatch** and enable Windows Autopatch for the tenant.
3. Under **Windows Autopatch**, create the Autopatch group that will carry this fleet. Every group carries a Test and a Last deployment ring automatically; neither can be removed or renamed, and a group cannot run on a single deployment ring, because gradual rollout needs at least two.
4. Choose the device-distribution model for each deployment ring — one or more device-based Microsoft Entra groups under the Dynamic model, or a single device-based group under the Assigned model. The Test and Last deployment rings specifically cannot combine the two models.
5. Navigate to **Intune admin center** > **Devices** > **Windows Autopatch** > **Devices** and confirm every in-scope device appears in exactly one deployment ring.
6. Stop editing directly any Update rings policy the group now contains. From this point forward, make configuration changes for a contained deployment ring through the Autopatch group, not by editing the underlying policy object.

**Source:** [Windows Autopatch groups overview](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/deploy/windows-autopatch-groups-overview) (updated 2025-06-17), as carried by [Windows Autopatch](../operations/patch-management/07-windows-autopatch.md#autopatch-groups-test-last).

Continue to Step 2, which decides the hotpatch posture that applies to the deployment rings this group now owns.

### Step 1b: Standalone update ring configuration

1. Navigate to **Intune admin center** > **Devices** > **Windows** > **Update rings for Windows 10 and later**. Treat each policy object on this blade as one deployment ring.
2. Create the pilot deployment ring and set its quality-update deferral, feature-update deferral, deadline, grace period and restart behavior. Choose the values at Step 10; this plan does not fix them for you.
3. Create the broad deployment ring with a longer deferral than the pilot, so a regression surfaces in the pilot cohort before the broad cohort receives the same content.
4. Assign each deployment ring to exactly one device group, and confirm no device is targeted by two of them.
5. Set your own promotion gate: do not let content advance to the broad deployment ring until every pilot device reports Compliant at **Intune admin center** > **Reports** > **Windows Updates** and no driver-regression incident is open. The policy objects are fixed; only the content advances, by virtue of the longer deferral on the broad deployment ring.
6. If you later enable Windows Autopatch, retire any policy left outside the resulting Autopatch group rather than leaving it assigned — an un-contained policy stays admin-authored and drifts against the service-managed devices it was written for.

**Source:** [Manage Windows Update for client policies](https://learn.microsoft.com/en-us/windows/deployment/update/waas-manage-updates-wufb) (updated 2025-10-02), as carried by [Windows WUfB Rings](../operations/patch-management/01-windows-wufb-rings.md#wufb-deployment-rings).

Continue to Step 2, which decides the hotpatch posture that applies to the deployment rings you now own.

> **What breaks if misconfigured:** Admins see conflicting deadlines and drifting compliance reports; users see repeated restart prompts on devices that were already current.

> See: [Windows WUfB Rings](../operations/patch-management/01-windows-wufb-rings.md#autopatch-disambiguation) for the containment relationship and its failure mode in full.

<a id="decision-hotpatch-posture"></a>
### Step 2: Hotpatch posture

> **Ask the admin:** Should eligible devices keep taking hotpatch security updates, should hotpatch be blocked across the tenant, or should the posture be decided per cohort?

**Applies to:** Windows-only · **Reversibility:** Reversible

| Option | When to choose | Recorded as |
|---|---|---|
| Leave the tenant default in place | You want eligible devices to take security updates without a monthly restart, and you accept the quarterly baseline restart for the cumulative update that consolidates them | The tenant-wide hotpatch default, unchanged, governing every device that no Windows quality update policy targets |
| Block hotpatch at the tenant level | Your change process requires every security update to land on disk at a restart you scheduled, or your reboot-based alerting cannot be re-baselined from a monthly to a quarterly cadence | The tenant-wide hotpatch default set to block, governing that same set of devices |
| Override per cohort in a Windows quality update policy | Only part of the fleet should hotpatch — a pilot cohort, or the devices whose reboot-based alerting is already re-baselined | A hotpatch setting on the Windows quality update policy that targets the cohort, overriding the tenant default for the devices that policy targets |

Hotpatch security updates are **enabled by default** for all eligible devices, so what this Step
decides is whether to leave hotpatch on — not whether to switch it on. Read the table's first row as
the posture you already have rather than as a change you would make.

**Source:** [Hotpatch updates](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/manage/windows-autopatch-hotpatch-updates) (updated 2026-06-02), as carried by [Windows WUfB Rings](../operations/patch-management/01-windows-wufb-rings.md#hotpatch).

Eligibility is what makes that default consequential. A device is offered hotpatch only when it holds
an eligible license, runs Windows 11 **Enterprise** — Windows 365 Enterprise qualifies — and has
**VBS** (Virtualization-Based Security) enabled at both firmware and OS level. **Arm64 devices are
supported**: the feature is not restricted to x64 processors, though Arm64 requires CHPE (Compiled
Hybrid Portable Executable) binary servicing to be disabled first, through the `DisableCHPE` system
policy CSP or the `HotPatchRestrictions=1` registry value — a one-time change that requires a
restart. A device that misses any one of these silently receives the latest cumulative update (LCU)
instead, which does require a restart. That silent fallback is why an admin who believes the whole
fleet is hotpatching can be wrong about part of it.

**Source:** [Configure hotpatch](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-hotpatch) (updated 2026-04-29), as carried by [Windows WUfB Rings](../operations/patch-management/01-windows-wufb-rings.md#hotpatch).

The posture is set at two levels, and the two do not both reach the same device. The tenant-wide
default governs only devices that **no** Windows quality update policy targets; where such a policy
does target a device, that policy's own hotpatch setting decides and the tenant default is not
consulted for it. This is why the third option is a genuinely different choice rather than a
restatement of the second: blocking at the tenant level leaves every policy-targeted cohort exactly
as it was.

**Source:** [Configure hotpatch](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-hotpatch) (updated 2026-04-29), as carried by [Windows WUfB Rings](../operations/patch-management/01-windows-wufb-rings.md#hotpatch).

A Windows Autopatch entitlement is **necessary but not sufficient** here. The Autopatch license list
and the hotpatch license list genuinely differ, so holding an Autopatch-eligible license does not by
itself place a device on the hotpatch eligible list. Check the hotpatch list directly rather than
treating Autopatch enrollment as settling the question; both lists are set out in full in
[Windows Autopatch](../operations/patch-management/07-windows-autopatch.md#autopatch-hotpatch-licensing).

**Source:** [Windows Autopatch prerequisites](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/prepare/windows-autopatch-prerequisites) (updated 2026-02-27), as carried by [Windows Autopatch](../operations/patch-management/07-windows-autopatch.md#autopatch-hotpatch-licensing).

To put the posture in force:

1. Confirm eligibility against the list above before you change anything. A posture set on devices that cannot take hotpatch changes nothing an admin will see.
2. Set the tenant-wide default from **Intune admin center** > **Tenant administration**. It governs every device that no Windows quality update policy targets, and only those. Confirm the control's current blade in the admin center before you change it — this plan fixes the decision and the two-level model, not the admin center's blade layout.
3. Override per cohort at **Intune admin center** > **Devices** > **Windows**, on the Windows quality update policy that targets that cohort. The per-policy setting decides for every device that policy targets, whatever the tenant default says.
4. Confirm the outcome at **Intune admin center** > **Reports** > **Windows Updates**. An eligible device still taking a monthly restart is a device on the cumulative-update path, not a device that failed.

Changing the posture later is a policy change, which is what this Step's **Reversible** rating
describes. Undoing a hotpatch that has already installed is a different matter: automatic rollback of
a hotpatch update is not supported, and while an admin can uninstall one, doing so requires a device
restart — the exact disruption hotpatch was adopted to avoid.

**Source:** [Hotpatch updates](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/manage/windows-autopatch-hotpatch-updates) (updated 2026-06-02), as carried by [Windows WUfB Rings](../operations/patch-management/01-windows-wufb-rings.md#hotpatch).

> **What breaks if misconfigured:** Admins believe the fleet is hotpatching while ineligible devices quietly take the LCU instead; users on those devices still see the monthly restart.

> See: [Windows WUfB Rings](../operations/patch-management/01-windows-wufb-rings.md#hotpatch) for hotpatch eligibility and the absent automatic rollback in full.

<a id="decision-driver-approval-mode"></a>
### Step 3: Driver approval mode

> **Ask the admin:** Should recommended driver updates be approved automatically and released on a deferral, or should every driver wait for an administrator's explicit approval?

**Applies to:** Windows-only · **Reversibility:** Destructive

| Option | When to choose | Consequence if wrong | Branch |
|---|---|---|---|
| Automatic approval with a per-policy deferral | Standard OEM hardware with no recent driver or hardware regression, and you would rather stage exposure by deferral than hold a review queue | Recommended drivers install on the deferral you set with no human gate. There is no driver rollback, and pause is best effort — a device already installing keeps installing. Changing your mind is not a toggle: on an Intune policy the approval type cannot be edited after creation, and on the Autopatch side a mode switch destroys all existing approvals, paused drivers and declined drivers | [Step 3a](#step-3a-automatic-approval-configuration) |
| Manual approval with explicit availability dates | Hardware with a regression history, or a change process that requires a named approver for each driver | Nothing installs until someone approves it, so a security-relevant driver can sit in *Needs review* for as long as the queue is unattended. Approval is also one-way: once an update is *Approved* it can never be *Declined*, and the same destructive mode switch applies in reverse | [Step 3b](#step-3b-manual-approval-configuration) |

This is the one decision in this plan rated **Destructive**, and the reason belongs here rather than
behind a link. Switching between automatic and manual mode on the Autopatch side does not flip a
setting: new policies are generated to replace the old ones, and you lose all approvals, paused
drivers and declined drivers previously made for those groups and deployment rings. There is no
recovery, because that state cannot be recreated from Intune. On an Intune driver update policy the
same rule appears in a stricter form — the approval type cannot be edited after the policy is
created at all, so a change of mind means creating a different policy. Decide the mode before you
create anything.

**Source:** [Manage driver and firmware updates with Windows Autopatch](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/manage/windows-autopatch-manage-driver-and-firmware-updates) (updated 2025-06-04), as carried by [Windows Driver and Firmware Updates](../operations/patch-management/06-windows-driver-firmware-updates.md#unsupported-callouts).

Whichever mode you choose, the driver update policy carries its own deferral. The quality-update
deferral set on a WUfB deployment ring does **not** reach drivers approved by a driver update policy;
the deadline and grace period do reach them, and so do the user-experience settings. Read that
asymmetry in full in
[Windows Driver and Firmware Updates](../operations/patch-management/06-windows-driver-firmware-updates.md#deferral-deadline-behavior)
before you assume a ring setting covers drivers.

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09), as carried by [Windows Driver and Firmware Updates](../operations/patch-management/06-windows-driver-firmware-updates.md#deferral-deadline-behavior).

The driver policy's own deferral setting, **Make updates available after (days)**, supports 0–30
days, and it counts from the day the update was added to the policy rather than from the day the OEM
published it — which is the reading admins usually assume and the one that makes a schedule slip.

**Source:** [Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy) (updated 2026-04-24), as carried by [Windows Driver and Firmware Updates](../operations/patch-management/06-windows-driver-firmware-updates.md#deferral-deadline-behavior).

### Step 3a: Automatic approval configuration

1. Fix the mode now. The approval type is set for the life of an Intune driver update policy, so this is a creation-time choice and not a setting you adjust later.
2. Navigate to **Intune admin center** > **Devices** > **Windows** > **Driver and firmware updates** — or **Intune admin center** > **Devices** > **Update policies for Windows 10 and later** > **Driver and firmware updates**, depending on the blade version at the time of access — and create the policy.
3. Choose **Automatically approve all recommended driver updates**. Each new recommended update then enters the policy already *Approved* and begins to install on applicable devices without review.
4. Set **Make updates available after (days)** to the deferral this cohort should carry. Choose the value at Step 10; this plan does not fix it for you.
5. Assign the policy to exactly one device group. A device sitting in two driver policies takes the most permissive status, because *Approved* always wins across policies.
6. Expect a manual queue even here. An update that is not a recommended driver — firmware included — lands on the *other drivers* list as *Needs review* and must be approved by hand.
7. Monitor the fastest policy for early regressions and pause the same update in your other policies before it reaches them. Pause is the only lever you have; there is no rollback, and a device already installing may finish anyway.

**Source:** [Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy) (updated 2026-04-24), as carried by [Windows Driver and Firmware Updates](../operations/patch-management/06-windows-driver-firmware-updates.md#approval-modes).

Continue to Step 4, which decides the BIOS and firmware surface these driver updates arrive alongside.

### Step 3b: Manual approval configuration

1. Fix the mode now, for the same reason as the automatic branch — the approval type cannot be changed after the policy exists.
2. Navigate to **Intune admin center** > **Devices** > **Windows** > **Driver and firmware updates** — or **Intune admin center** > **Devices** > **Update policies for Windows 10 and later** > **Driver and firmware updates**, depending on the blade version at the time of access — and create the policy.
3. Choose **Manually approve and deploy driver updates**. Every new update then enters the policy with the status *Needs review*, and nothing installs until an admin changes it.
4. Review each update and set it to *Approved* or *Declined*. Treat approval as a commitment: once an update is *Approved* it can never be *Declined*, and *Pause* — the only reverse gear — is indefinite rather than corrective.
5. Set **Make available in Windows Update** on each approval. The policy's deferral applies to automatically approved updates only, so a manual approval carries the start date you assign instead.
6. Work inside the bulk limits: up to 100 drivers in one action, and actions cannot be mixed, so pausing and approving are separate passes.
7. Assign the policy to exactly one device group, for the same cross-policy reason as the automatic branch.

**Source:** [Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy) (updated 2026-04-24), as carried by [Windows Driver and Firmware Updates](../operations/patch-management/06-windows-driver-firmware-updates.md#approval-workflow).

Continue to Step 4, which decides the BIOS and firmware surface these driver updates arrive alongside.

> **What breaks if misconfigured:** Admins find a regressed driver they can pause but never roll back; users keep that driver on every device that already finished installing it.

> See: [Windows Driver and Firmware Updates](../operations/patch-management/06-windows-driver-firmware-updates.md#approval-workflow) for the status transitions and the limits of pause.

<a id="decision-bios-firmware-surface"></a>
### Step 4: BIOS and firmware surface

> **Ask the admin:** Which surface will govern BIOS settings on your Windows fleet — a native Intune surface, a vendor path, or none at all?

**Applies to:** Windows-only · **Reversibility:** Effectively irreversible

| Option | When to choose | Consequence if wrong | Branch |
|---|---|---|---|
| DFCI | Your hardware appears on the DFCI manufacturer list, and every device was registered with Autopilot by the OEM or by a Microsoft CSP partner | A DFCI setting is written below the operating system and is not fixed by re-imaging. Deleting the profile removes nothing and takes away the only instrument that can still unlock the firmware. Delete the Autopilot record before unlocking the UEFI menus and the menus stay locked at their last applied values, reachable only from the UEFI menu on the device itself | [Step 4a](#step-4a-dfci) |
| Dell BIOS configuration policy | A Dell commercial client fleet whose devices carry no BIOS password today, and you accept that Intune holds the password from that point on | Intune generates and holds a unique per-device password. When the Intune subscription ends there is no path to read or retrieve it and the only route left is Dell Support with proof of ownership — losing the management plane loses the secret | [Step 4b](#step-4b-dell-bios-configuration-policy) |
| Vendor connector or Win32 tool | An HP or Lenovo fleet. Neither vendor has a native Intune BIOS policy surface, so the vendor's own tooling is the whole path | HP holds the secret in its own cloud vault outside your tenant, so offboarding runs on HP's terms rather than yours; Lenovo's secret is yours to hold and yours to lose. Neither vendor documents a recovery path for a lost Endorsement Key or a lost certificate private key — a documented silence rather than a stated impossibility, and either way there is nothing to follow | [Step 4c](#step-4c-vendor-connector-or-win32-tool) |
| None | You accept the firmware settings the devices shipped with, and no control in your own framework requires a BIOS setting to be enforced or a UEFI menu to be locked | Nothing is enforced and nothing is locked, so boot order, ports and virtualization settings stay wherever the last person to open the firmware menu left them. This is the one branch whose wrong choice costs a technician visit rather than the device | [Step 4d](#step-4d-no-bios-management) |

Read every consequence above against **retirement**, not against day-to-day operation. The custody
you choose here is what decides whether a device can be de-provisioned at all: the secret that
authorizes a BIOS change is held by Intune, by the vendor, or by you, and in all three cases losing
the management plane loses the secret. A DFCI device released in the wrong order keeps its locked
UEFI menus after the wipe, the reinstall and the handover to its next owner; a Dell device whose
tenant subscription has ended has no Intune-side password retrieval left; an HP or Lenovo device
whose key material is gone has no vendor-documented way back. That is why this Step is rated
**Effectively irreversible** while every other decision in this plan is a policy change. Decide it
before the fleet is imaged, not after.

**Source:** [Use DFCI profiles on Windows devices in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-dfci-windows) (updated 2026-07-01), as carried by [Device Firmware Configuration Interface (DFCI)](../operations/firmware-bios/01-windows-dfci.md#retiring-a-device).

The routing question is custody, not tooling. Work out who is willing to hold your BIOS secret
before you compare consoles, because the console, the connector, the recovery path and what happens
when the relationship ends all follow from that one answer. The full routing narrative is in
[Firmware and BIOS Governance](../operations/firmware-bios/00-overview.md#choosing-a-path), and the
custody statement each vendor makes for itself is in
[Firmware and BIOS Governance](../operations/firmware-bios/00-overview.md#who-holds-the-secret).

**Source:** [Use BIOS configuration profiles for Windows devices in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-bios-windows) (updated 2026-07-01), as carried by [Firmware and BIOS Governance](../operations/firmware-bios/00-overview.md#who-holds-the-secret).

### Step 4a: DFCI

1. Check the manufacturer list first. DFCI reaches a short, named list of manufacturers, and Dell, HP and Lenovo are on none of the three lists Microsoft publishes. If your hardware is not named there, stop here and go to Step 4c or Step 4d instead.
2. Check how each device was registered. Of the four Autopilot registration channels this corpus tracks, exactly two confer the external attestation DFCI requires — an OEM registration and a Microsoft CSP partner registration. A CSV upload or a PowerShell registration performed by your own administrators does not qualify, including the online variant that writes the hash straight to the tenant, and no Intune-side change makes it qualify afterwards. Read both gates in full at [Device Firmware Configuration Interface (DFCI)](../operations/firmware-bios/01-windows-dfci.md#dfci-prerequisites) before you plan on this branch.
3. Name the custody in your own change record: no BIOS password is involved at all on this branch. DFCI's trust chain rests on public key cryptography rather than on local UEFI password security, and it is anchored at Autopilot registration and terminated at the Intune tenant that owns the profile. There is no secret to escrow and no vendor to call.
4. Navigate to **Intune admin center** > **Devices** and create the DFCI configuration profile. Confirm the current blade for Templates configuration profiles in the admin center before you create it — this plan fixes the decision and the profile object, not the admin center's blade layout.
5. Pilot on a group you can physically reach. Configuring and assigning a DFCI profile can lock a device beyond repair, the settings change the device hardware and cannot be fixed by re-imaging the operating system, and deleting the profile or removing the device from its assigned group removes no setting and re-enables no menu. Read that treatment where it is owned, at [Device Firmware Configuration Interface (DFCI)](../operations/firmware-bios/01-windows-dfci.md#bricking-irreversible); it is not re-authored here.
6. Write the retirement order into your own runbook now, while the profile still exists. Unlock the UEFI menus through the profile first, wipe or retire the device second, and delete the Autopilot record last. Reversing the first and last steps is the mistake that produces a permanently locked device.

**Source:** [Manage DFCI for Windows Autopilot devices](https://learn.microsoft.com/en-us/autopilot/dfci-management) (updated 2026-04-14), as carried by [Device Firmware Configuration Interface (DFCI)](../operations/firmware-bios/01-windows-dfci.md#dfci-oem-support).

Continue to Step 5, which decides the update channel for the Microsoft 365 Apps installed on these same devices.

### Step 4b: Dell BIOS configuration policy

1. Survey existing BIOS passwords across the fleet before anything else. The native BIOS configuration template requires that devices do **not** already have a BIOS password configured, because the feature requires that Intune hold the password itself. Dell refuses outright where one already exists. This is the entitlement gate recorded in the [Prerequisites](#prerequisites) section above, and it is the likeliest reason this branch turns out to be closed to you — the gate is stated there once and is not restated here.
2. Name the custody: Intune holds the secret, inside your own tenant. Intune generates a unique per-device BIOS password the first time the policy applies, and retrieval runs through Microsoft Graph beta. Decide now which of the two retrieval roles you will grant, because they are not equivalent in blast radius — read both at [Dell BIOS Configuration Through Intune](../operations/firmware-bios/02-dell-bios-configuration.md#authentication).
3. Navigate to **Intune admin center** > **Devices** > **Manage devices** > **Partner portals** > **Dell Management Portal** > **Connect now** to publish the Dell applications into your tenant. Evaluate that consent grant on what it actually carries rather than on its label: it requires a Global Administrator, and it includes reading BitLocker recovery keys and read-write access to Intune device configuration and policies.
4. Deploy the Dell Command Endpoint Configure agent as a required Win32 application, and let it land on the device **before** the BIOS configuration policy is assigned. Assigning the policy first leaves the device with nothing to apply it. The remaining device-side requirements — the .NET desktop runtime, the SYSTEM account permission that fails silently when it is missing, and the Enrollment Status Page selection for Autopilot devices — are enumerated at [Dell BIOS Configuration Through Intune](../operations/firmware-bios/02-dell-bios-configuration.md#prerequisites).
5. From **Intune admin center** > **Devices**, create the **BIOS configuration and other settings** Templates policy and upload the Dell configuration file the authoring tool produced. Confirm the current blade for Templates policies in the admin center before you create it. This plan does not carry BIOS token names, vendor command syntax or a per-model matrix; that content is owned by the vendor guide linked above.
6. Record the exit path while you still have one. Removing the password later is a documented, non-destructive operation performed from the same policy, and unenrolling a device from Intune does **not** remove the BIOS password. What ends retrieval is the end of the Intune subscription, so back the passwords up outside Intune before that day arrives.
7. Note one unadjudicated conflict before you finish: Dell Command Update is an update client rather than a configuration tool, and running it alongside an Intune or Autopatch driver policy is a genuine conflict that no first-party page adjudicates, so this plan does not pick a side — see [Dell BIOS Configuration Through Intune](../operations/firmware-bios/02-dell-bios-configuration.md) for what the corpus does record about it.

**Source:** [Use BIOS configuration profiles for Windows devices in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/templates/configure-bios-windows) (updated 2026-07-01), as carried by [Dell BIOS Configuration Through Intune](../operations/firmware-bios/02-dell-bios-configuration.md#authentication).

**Source:** [Dell Command Endpoint Configure for Microsoft Intune](https://www.dell.com/support/kbdoc/en-us/000214308/dell-command-endpoint-configure-for-microsoft-intune) (Last Modified 2026-05-18), as carried by [Dell BIOS Configuration Through Intune](../operations/firmware-bios/02-dell-bios-configuration.md#prerequisites).

Continue to Step 5, which decides the update channel for the Microsoft 365 Apps installed on these same devices.

### Step 4c: Vendor connector or Win32 tool

1. Establish which vendor you are governing, because HP and Lenovo answer the custody question differently and neither has a native Intune BIOS policy surface to fall back on.
2. **On HP, the secret leaves your tenant.** HP Connect for Microsoft Endpoint Manager is a vendor connector, not a Win32 agent — it installs nothing on the device it manages — and the BIOS password is held in HP's own cloud vault rather than by Intune. Consent is granted once by a Global Administrator signing in at the HP administration console, after which an Intune Administrator operates it day to day. Read the delivery model at [HP BIOS Configuration Through Intune](../operations/firmware-bios/03-hp-bios-configuration.md#delivery).
3. **On HP, find the policies HP created in your own tenant** at **Intune admin center** > **Reports** > **Endpoint Analytics** > **Proactive Remediation**. The script packages HP Connect publishes are named for the device group they target, and status reporting can take hours or days to appear, so treat an empty list on the day of assignment as unreported rather than as failed.
4. **On Lenovo, the secret is yours.** Think BIOS Config Tool V2 and Lenovo BIOS Certificate Tool V2 produce the Intune artifacts, and the secret is either an encrypted configuration file you store and protect or a signing certificate whose private key you keep in your own key vault. Decide which of the two you are adopting before any device is provisioned; that choice is the one with lasting consequences. Read the delivery model at [Lenovo BIOS Configuration Through Intune](../operations/firmware-bios/04-lenovo-bios-configuration.md#delivery).
5. **On Lenovo, deploy through the Intune objects the tool emits** — a Win32 application package or a Remediations script — from **Intune admin center** > **Apps**, confirming the current blade before you upload. A supervisor-password change specifically is documented as the Win32 application path rather than the Remediations path, because the change requires a restart.
6. Whichever vendor you are on, record the custody answer in the same place you record the decision. A secret held in a vendor cloud ends on the vendor's terms; a secret you hold outlives both your tenant and the vendor, and is yours to lose.

**Source:** [HP Connect for Microsoft Endpoint Manager — User Guide](https://connect.admin.hp.com/static/HPConnectUserGuide.pdf) (Version 1.2.0, published 2022-09-27), as carried by [HP BIOS Configuration Through Intune](../operations/firmware-bios/03-hp-bios-configuration.md#delivery).

**Source:** [Think BIOS Config Tool V2](https://docs.lenovocdrt.com/guides/tbct_v2/) (Lenovo CDRT, no publication date; interface v2.0.3 current as of 2026-04-06), as carried by [Lenovo BIOS Configuration Through Intune](../operations/firmware-bios/04-lenovo-bios-configuration.md#delivery).

Continue to Step 5, which decides the update channel for the Microsoft 365 Apps installed on these same devices.

### Step 4d: No BIOS management

1. Understand what this branch actually is before you record it. On a Dell, HP or Lenovo fleet, no BIOS management is the honest default rather than a failure to decide — and the reason is availability, not preference.
2. **DFCI is unavailable on Dell, HP and Lenovo, not declined.** None of the three appears on any of the three manufacturer lists Microsoft publishes, so there is no DFCI profile to assign to them and no licensing change, firmware update or configuration setting that makes one apply. It is not an option an administrator turned down and not a setting left switched off. That absence is exactly why the vendor branches above exist at all. Read the three lists and the divergence between them at [Device Firmware Configuration Interface (DFCI)](../operations/firmware-bios/01-windows-dfci.md#dfci-oem-support).
3. Know what you give up. Nothing enforces boot order, port state, camera and microphone availability or the UEFI menu lock, so those settings stay wherever the last person to open the firmware menu left them, and a device returned from a user is trusted rather than verified. There is also no per-setting compliance attestation to lose here, because none of the three vendors offers one on any branch.
4. Know what you keep. No secret is created, so no secret can be lost, and no branch of this Step can strand a device at retirement. Devices remain fully governed for every other surface in this plan — Windows quality and feature updates, drivers and firmware, applications — because BIOS configuration is a separate domain from firmware update delivery, and declining the first leaves the second untouched.
5. Record the branch explicitly rather than leaving the Step blank. A recorded "none" tells the next administrator that the question was asked and answered; a blank tells them nothing, and the same fleet gets surveyed again next year. Re-check the manufacturer list at your next hardware refresh, because it is published as open rather than closed.
6. If you want the three-vendor comparison behind this branch on one page, including the capability absences that no vendor covers and the separate list of things a vendor has simply not documented, read [Firmware OEM Capability Matrix](../reference/firmware-oem-matrix.md#key-gaps).

**Source:** [Manage DFCI for Windows Autopilot devices](https://learn.microsoft.com/en-us/autopilot/dfci-management) (updated 2026-04-14), as carried by [Device Firmware Configuration Interface (DFCI)](../operations/firmware-bios/01-windows-dfci.md#dfci-oem-support).

Continue to Step 5, which decides the update channel for the Microsoft 365 Apps installed on these same devices.

> **What breaks if misconfigured:** Admins find a retired device whose UEFI menus stay locked after the wipe; users get hardware nobody can re-provision without the vendor.

> See: [Firmware and BIOS Governance](../operations/firmware-bios/00-overview.md#choosing-a-path) for the custody routing and the two native BIOS surfaces in full.

<a id="decision-m365-apps-channel"></a>
### Step 5: Microsoft 365 Apps update channel

> **Ask the admin:** How often should Microsoft 365 Apps take feature updates, and how long a rollback window does the fleet need behind them?

**Applies to:** Windows-only · **Reversibility:** Reversible — disruptive

| Option | When to choose | Recorded as |
|---|---|---|
| Current Channel | You want features as soon as they ship and you have no requirement to roll a build back. This is the channel the fleet is already on unless someone changed it | The tenant's installations left on the default channel, with the rollback support row of the first-party comparison table reading *Not applicable* |
| Monthly Enterprise Channel | You want a predictable monthly feature release on the second Tuesday and a rollback window behind it. This is the channel this plan recommends, and the branch its reversibility rating is assigned at | An Update Channel setting assigned to the devices in scope, carrying a three-month rollback window |
| Semi-Annual Enterprise Channel | Your change process cannot absorb monthly feature change, or a line-of-business dependency needs a build to hold still for longer than a month | An Update Channel setting assigned to the devices in scope, carrying a two-month rollback window |

The rating on this Step is assigned at the branch this plan **recommends** — Monthly Enterprise
Channel, whose rollback window is three months — and not at the worst branch on the table. Read
`Reversible — disruptive` as a statement about that branch: a channel change can be undone, but
undoing it moves every subscription product on the device again and can take back features users
have started to depend on. It is not a claim that every branch is reversible, and the branch that is
not is the default one.

The first-party comparison table's *Rollback support* row reads **Not applicable** for Current
Channel, **Three months** for Monthly Enterprise Channel and **Two months** for Semi-Annual
Enterprise Channel. Current Channel is the default for Microsoft 365 Apps for enterprise and for the
subscription Project and Visio desktop apps, so the out-of-the-box posture for a fleet nobody has
configured is an application estate with no rollback window behind it. This corpus reads that
**Not applicable** cell as meaning the default channel has no application rollback at all; that
reading is drawn from those two words and is recorded as this corpus's inference, not as a
first-party statement that rollback is impossible. The same treatment is carried in the
[Rollback/Recovery](#rollbackrecovery) section below, and the full six-channel enumeration behind
these three fleet postures is at
[Windows App Updates](../operations/patch-management/08-windows-app-updates.md#m365-apps-update-channels).

**Source:** [Overview of update channels for Microsoft 365 Apps](https://learn.microsoft.com/en-us/microsoft-365-apps/updates/overview-update-channels) (updated 2026-05-27), as carried by [Windows App Updates](../operations/patch-management/08-windows-app-updates.md#m365-apps-update-channels).

Only one channel can be configured for a device at a time, and that constraint spans every
subscription product installed on it — Microsoft 365 Apps, Project and Visio must all sit on the
same channel. A channel decision is therefore a whole-device decision rather than a per-application
one, and getting it wrong is not a cosmetic cadence change: moving a device to a slower channel can
take back features the people using it have already built work around.

**Source:** [Overview of update channels for Microsoft 365 Apps](https://learn.microsoft.com/en-us/microsoft-365-apps/updates/overview-update-channels) (updated 2026-05-27), as carried by [Windows App Updates](../operations/patch-management/08-windows-app-updates.md#m365-apps-update-channels).

This decision is Windows-only on first-party ground rather than by assertion. The channels overview
states that update channels are device-specific and apply only to installations of Microsoft 365
Apps on devices running Windows, and that the channel chosen for a device is not a setting that
follows the user from device to device. A macOS or iOS device in the same tenant has no channel to
assign, so leaving this Step unmade on those platforms leaves nothing ungoverned.

**Source:** [Overview of update channels for Microsoft 365 Apps](https://learn.microsoft.com/en-us/microsoft-365-apps/updates/overview-update-channels) (updated 2026-05-27), as carried by [Windows App Updates](../operations/patch-management/08-windows-app-updates.md#m365-apps-update-channels).

One caveat belongs in the record before Semi-Annual Enterprise Channel is chosen. Microsoft's own
pages currently describe that channel two different ways from July 2026 onward, and the corpus
records the divergence rather than resolving it, because neither reading is supportable from
Microsoft's published pages. Read the conflict, the build number that discriminates between them and
the dated support option at
[Windows App Updates](../operations/patch-management/08-windows-app-updates.md#m365-apps-update-channels)
before you commit a fleet to it.

To put the channel in force:

1. Confirm which channel the devices are on today rather than assuming the default. A fleet that was built over several years can carry more than one channel across it, and the constraint above means each device already has exactly one.
2. Sign in to the **Intune admin center** with the **Policy and Profile Manager** role at minimum. This is the floor for authoring the settings catalog policy that carries the setting.
3. From **Intune admin center** > **Devices**, create a settings catalog policy, confirming the current blade for the settings catalog in the admin center before you create it. This plan fixes the decision and the setting, not the admin center's blade layout.
4. In that policy, search for and enable the **Update Channel** setting and select the channel this Step decided. A separate **Target Version** setting exists if you also need to hold the installed build at a specific version; leave it alone unless you have that requirement.
5. Assign the policy to the device group in scope, and expect confirmation to lag. The setting is applied by the **Office Automatic Updates 2.0** scheduled task on the device, and the registry value an administrator would check to verify it updates only when that task runs or when a user signs in — which can take at least a day. An unchanged value on the afternoon of the push is not a failure.
6. Record the channel you chose and the rollback window it carries in the same place you record the rest of this plan. That window is the whole reason the decision has a rating.

**Source:** [Set the Microsoft 365 apps update channel using the settings catalog in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/update-office) (updated 2026-04-30), as carried by [Windows App Updates](../operations/patch-management/08-windows-app-updates.md#setting-the-channel-from-intune).

> **What breaks if misconfigured:** Admins find a regressed Office build with no rollback window behind it; users lose features on a device moved to a slower channel.

> See: [Windows App Updates](../operations/patch-management/08-windows-app-updates.md#m365-apps-update-channels) for the six channels, their cadences and their rollback windows in full.

<a id="decision-app-patch-mechanism"></a>
### Step 6: Application patch mechanism

> **Ask the admin:** Which mechanism keeps packaged Windows applications current, and does each application have exactly one?

**Applies to:** Windows-only · **Reversibility:** Reversible

| Option | When to choose | Recorded as |
|---|---|---|
| Enterprise App Catalog auto-update | The application is in the Enterprise App Catalog, you hold the add-on subscription, and you would rather Microsoft keep the version current than package every release yourself. This is the least work per application of the three | A catalog application with a Required assignment and auto-update enabled, updated with no new app object and no supersedence relationship |
| Enterprise App Catalog guided supersedence | The application is in the catalog and you want Microsoft's packaging without surrendering the gate — you decide when each version goes, and to which cohort | A catalog application deployed as an app object, with an explicit supersedence relationship to the version it replaces |
| Hand-packaged Win32 supersedence | The application is in neither the catalog nor the Microsoft Store, or its install needs handling only your own packaging can carry | A Win32 application you package and host, with an explicit supersedence relationship to the version it replaces |

Enterprise App Catalog auto-update is the branch with the sharpest trade. It requires a subscription
in addition to Intune Plan 1 or Plan 2, and it applies only to applications assigned as **Required** —
an application assigned as Available keeps the existing update workflow instead. It has **no rings
and no rollback**: an update reaches every assigned device without a phased cohort behind it, and
there is no automatic uninstall remediation when a version turns out to be bad, so the recovery is a
manual uninstall intent or a remediation script you write. Accept those two absences deliberately or
choose one of the other two branches, which keep the gate in your hands.

**Source:** [Enterprise App Management](https://learn.microsoft.com/en-us/intune/app-management/deployment/enterprise-app-management) (updated 2026-06-24), as carried by [Windows App Updates](../operations/patch-management/08-windows-app-updates.md#enterprise-app-management).

Give one application exactly one mechanism. Two mechanisms pointed at the same application produce a
version race — the catalog's auto-update and a supersedence relationship each decide independently
what the current version is, and the device takes whichever arrives last, so the installed version
becomes a function of timing rather than of anything you configured. That is the consequence of
getting this decision wrong, and it is far more likely on a fleet that adopted the catalog for an
application it was already packaging by hand than on one that started from scratch.

Enterprise App Management's reachability gates are as hard as its licence. Five gates apply together
— the add-on subscription, the Win32 application types the catalog carries, Microsoft-hosted storage
the device has to be able to reach, the three cloud environments the capability is offered in, and
the Required assignment intent — and a tenant that cannot meet one of them cannot use the capability
whatever it has paid for. One of those is a trap worth naming here: Intune performs no licence check
on catalog applications, so an unentitled tenant is not blocked at the point of use, it is simply
unentitled. All five, together with the service-level objectives that are framed as guidelines rather
than guarantees, are set out at
[Windows App Updates](../operations/patch-management/08-windows-app-updates.md#enterprise-app-management)
and are not re-authored here.

**Source:** [Enterprise App Management](https://learn.microsoft.com/en-us/intune/app-management/deployment/enterprise-app-management) (updated 2026-06-24), as carried by [Windows App Updates](../operations/patch-management/08-windows-app-updates.md#enterprise-app-management).

Two boundaries keep this Step honest. An application that lives in the Microsoft Store has a fourth
path this Step does not decide — the Microsoft Store app type, included with Intune at no additional
licence — so route by asking which surface already holds the application before you apply this table.
And the Windows Package Manager command-line tool is not a supported unattended patching path through
Intune for any of these surfaces, whatever its name suggests. Both routings are owned by
[Windows App Updates](../operations/patch-management/08-windows-app-updates.md#choosing-an-app-update-mechanism).

**Source:** [Enterprise App Management](https://learn.microsoft.com/en-us/intune/app-management/deployment/enterprise-app-management) (updated 2026-06-24), as carried by [Windows App Updates](../operations/patch-management/08-windows-app-updates.md#choosing-an-app-update-mechanism).

To put the mechanism in force:

1. List the applications in scope and mark, for each one, which surface already holds it — the Enterprise App Catalog, the Microsoft Store, or neither. That answer picks the branch; preference does not.
2. For either catalog branch, navigate to **Intune admin center** > **Apps** and add the application from the Enterprise App Catalog. Confirm the current blade for adding an application in the admin center before you start — this plan fixes the decision and the application type, not the admin center's blade layout.
3. On the auto-update branch, assign the application as **Required** and enable auto-update. An Available assignment does not take the auto-update path, so an application assigned that way stays on the workflow it was already on and will look, in a report, as though the decision never applied.
4. On the guided supersedence branch, add the catalog application as an app object and create the supersedence relationship to the version it replaces, then assign it to one cohort at a time. This is the branch that lets a ring exist, because you own the assignment schedule.
5. On the hand-packaged branch, do the same with your own package from **Intune admin center** > **Apps**, and keep the supersedence chain intact — a version added outside the chain is the second mechanism this Step exists to prevent.
6. Whichever branch you took, record it per application, not per fleet. The version race above is caused by one application carrying two mechanisms, so the record that prevents it has to be at the application level.
7. Check one interaction before you finish: an auto-update catalog application cannot be selected as a blocking application in an Enrollment Status Page or device preparation profile. A catalog application assigned Available, outside the auto-update path, is not covered by that rule.

**Source:** [Enterprise App Management](https://learn.microsoft.com/en-us/intune/app-management/deployment/enterprise-app-management) (updated 2026-06-24), as carried by [Windows App Updates](../operations/patch-management/08-windows-app-updates.md#enterprise-app-management).

> **What breaks if misconfigured:** Admins see one application's version flip between two mechanisms with no ring behind either; users get an update they cannot be rolled back from.

> See: [Windows App Updates](../operations/patch-management/08-windows-app-updates.md#choosing-an-app-update-mechanism) for the routing order across all four application surfaces.

<a id="decision-non-windows-enforcement"></a>
### Step 7: Enforcement primitive per non-Windows platform

> **Ask the admin:** Which control primitive governs updates on macOS, iOS and Android — a deferral, a declarative enforcement assertion, or an attestation gate?

**Applies to:** macOS, iOS and Android · **Reversibility:** Reversible

| Option | When to choose | Recorded as |
|---|---|---|
| Deferral | You want a soft delay a user can shorten by installing early, and the platform still offers a primitive that provides one. On Apple this is a transitional posture only, for the reason stated below the table | A legacy MDM restriction or configuration profile payload that holds the update back until the window expires, with the user free to install sooner |
| Declarative device management enforcement | You need the operating system itself to guarantee a target version by a date rather than asking it to wait. This is the forward-compatible path on macOS, iOS and iPadOS | A Settings Catalog declarative assertion — Software Update Enforce Latest on macOS, or the Target OS Version and Target Date Time keys on iOS and iPadOS — with the operating system performing the install, the restart and the user notification |
| Attestation gate | The platform gives you no install primitive worth recording, and what you need instead is proof that a device is already patched before it reaches your data. This is the Android posture | A compliance policy reading the Play Integrity verdict, paired with a Conditional Access policy that denies access to devices failing it. It verifies patch state and installs nothing |

These three names are not three products. They are the three control primitives the cross-platform
overview separates, and every managed platform maps onto one or more of them: a **deferral** is a
soft tenant-side delay that expires by itself and that the user can shorten; **enforcement** is a
hard requirement that the operating system install by a deadline; **attestation** verifies that a
device is already patched and gates access on the answer rather than installing anything. Decide
which primitive you want per platform first and the mechanism second — the distinction is set out in
full at
[Patch Management Overview](../operations/patch-management/00-overview.md#deferral-vs-enforcement).

The consequence of getting this wrong on Apple is not a matter of taste, and it belongs here rather
than behind a link: **choosing deferral on Apple's forward path picks a primitive Apple is
deprecating in favor of declarative device management (DDM).** The legacy commands and payloads that
implement deferral — `forceDelayedSoftwareUpdates`, the `com.apple.SoftwareUpdate` configuration
profile payload and the `ScheduleOSUpdate` command — are deprecated with the Apple OS 26 releases
and become non-functional in all Apple OS 27.0 operating systems. That is a two-stage cutover with a
published end, not a live equal of the other two options, and a fleet recording deferral as its
macOS posture today is recording something that stops working. The DDM assertion in the Settings
Catalog is the only forward-compatible enforcement path; read the enforcement model at
[macOS Update Enforcement](../operations/patch-management/02-macos-update-enforcement.md#ddm-enforcement).

**Source:** [Apple: device management updates](https://support.apple.com/guide/deployment/device-management-updates-depd638aa061/web) (published 2026-06-08), as carried by [macOS Update Enforcement](../operations/patch-management/02-macos-update-enforcement.md#deadlines-cutover-dates).

On iOS and iPadOS the same primitive is expressed as declarative update keys rather than as an
enforce-latest assertion. The enforcement target is declared by **Target OS Version** and **Target
Date Time**, with **Target Build Version** as an optional qualifier where a specific build is
required — those first two are the minimum pair, and the operating system enforces the version by
the configured device-local time. One key sitting in the same Settings Catalog category is not an
enforcement key at all: the beta-programme key governs beta enrolment and decides nothing about
updates. Read the full key set at
[iOS Update Lifecycle](../operations/patch-management/03-ios-update-lifecycle.md#ddm-update-keys).

**Source:** [Intune: ref-apple-settings](https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/ref-apple-settings) (updated 2026-07-01), as carried by [iOS Update Lifecycle](../operations/patch-management/03-ios-update-lifecycle.md#ddm-update-keys).

Android is the platform where the third primitive is the honest answer. Intune reads the Play
Integrity verdict through a compliance policy, and the strongest tier additionally requires
hardware-backed key attestation, Android 13 or higher, and a security patch no more than twelve
months old across **all** partitions — the operating system partition and the vendor partition both.
That patch-age condition belongs to the strongest verdict rather than to Android 13 and later
generally, so a device can hold the middle verdict indefinitely without a recent patch. None of this
installs an update; it decides whether a device that has not been patched still reaches your
resources. Read the verdict tiers at
[Android Patch Delivery](../operations/patch-management/04-android-patch-delivery.md#play-integrity-attestation).

**Source:** [Google Play Integrity: verdicts](https://developer.android.com/google/play/integrity/verdicts) (last updated 2026-05-01), as carried by [Android Patch Delivery](../operations/patch-management/04-android-patch-delivery.md#play-integrity-attestation).

To put the chosen primitive in force:

1. **macOS declarative enforcement.** Navigate to **Intune admin center** > **Devices** > **macOS** > **Configuration profiles** > **Create profile**, choose the **Settings catalog** profile type, add settings from the **Declarative Device Management** category, select **Software Update** > **Enforce Latest**, set the target version with its grace period and deadline behavior, and assign the profile to a macOS device group.
2. **iOS and iPadOS declarative enforcement.** Navigate to **Intune admin center** > **Devices** > **Apple updates** > **iOS/iPadOS update policies** > **Create**, and set **Target OS Version** and **Target Date Time** as the enforcement pair. Add **Target Build Version** only where a specific build is required.
3. **Android attestation gate.** Navigate to **Intune admin center** > **Devices** > **Compliance** > **Android Enterprise** > **Create**, set the minimum security patch level and the Play Integrity verdict requirement, then pair the policy with a Conditional Access policy that reads the resulting compliance signal. The compliance policy on its own denies nothing.
4. **If you are keeping a deferral on Apple through a migration window, give it a finish line.** Navigate to **Intune admin center** > **Devices** > **Configuration profiles** and inventory every profile carrying a legacy update-restriction payload, so the set you have to retire before Apple OS 27.0 is a list rather than a discovery.

**Source:** [Apple: Software Update Settings declarative configuration](https://support.apple.com/guide/deployment/software-update-settings-declarative-dep0578d8b8a/web) (published 2024-09-25), as carried by [macOS Update Enforcement](../operations/patch-management/02-macos-update-enforcement.md#ddm-enforcement).

> **What breaks if misconfigured:** Admins record an Apple deferral that stops enforcing at the next major release; users on those devices then update whenever they choose.

> See: [macOS Update Enforcement](../operations/patch-management/02-macos-update-enforcement.md#deadlines-cutover-dates) for the two-stage Apple cutover in full.

<a id="decision-linux-posture"></a>
### Step 8: Linux posture

> **Ask the admin:** How is the Linux estate governed — by a delivered shell script, by a compliance policy behind a Conditional Access gate, or explicitly not by this plan at all?

**Applies to:** Linux-only · **Reversibility:** Reversible

| Option | When to choose | Recorded as |
|---|---|---|
| Shell-script `unattended-upgrades` posture | You want the devices to keep themselves current, and you accept that the tenant cannot require it, cannot deadline it and cannot report on what actually installed | A Bash platform script delivered by Intune that puts an `unattended-upgrades` configuration in place, after which the device updates itself under the distribution's rules whether or not Intune is reachable |
| Compliance policy plus a Conditional Access gate | You need a tenant-side lever with a real consequence behind it, and access denial is a consequence you are willing to impose | A compliance policy evaluating a discovery script's output, with a Conditional Access policy gating web access to Entra-protected applications on the resulting signal. This is attestation, not update enforcement |
| Explicitly out of the update plan | The Linux estate is governed by a configuration-management system you already run, or it is small enough that this plan would describe governance you do not intend to operate | A recorded exclusion naming who does govern those devices, so the next administrator finds an answer rather than a silence |

Start from the fact that decides this Step: **there is no native Intune Linux update policy.** Not a
partial one and not a preview one — there is no update ring for Linux, no deferral setting, no
deadline, no grace period and no enforcement primitive of any kind in the Intune admin center. What
Intune has instead is a Bash platform script that it delivers, schedules and reports an exit code
for. Everything the script then does is done by the distribution's own tooling, under the
distribution's rules rather than the tenant's, which is why the shell-script posture is
**unenforceable** from the Intune side: if the script fails, or the device is powered off, or the
package manager cannot take a lock, the update simply does not happen and there is no deadline to
notice.

**Source:** [Add custom settings to Linux devices](https://learn.microsoft.com/en-us/intune/intune-service/configuration/custom-settings-linux) (updated 2026-07-01), as carried by [Linux Update Delivery](../operations/patch-management/05-linux-update-delivery.md#what-intune-can-and-cannot-do).

The second branch is enforceable, but only **by access denial**, and that distinction is the whole
point of this Step. A compliance policy reads a discovery script's answer and marks the device
compliant or not; a Conditional Access policy then acts on that signal. Nothing in that chain
installs an update. Linux maps onto exactly one of the three primitives Step 7 names, and it is
attestation. The lever is also narrower on Linux than anywhere else: it gates web access to
Entra-protected applications through Microsoft Edge for Linux at sign-in, and the device-level
Conditional Access grant that the other platforms use is not available for Linux at all. Recording
this branch as update enforcement is the named failure mode here — it is **claiming enforcement you
do not have**. Read the three-primitive mapping at
[Linux Update Delivery](../operations/patch-management/05-linux-update-delivery.md#deferral-enforcement-attestation)
and the gate's ceiling at
[Linux Update Delivery](../operations/patch-management/05-linux-update-delivery.md#compliance-conditional-access).

One limit is worth stating before you write a rule against it. A Linux discovery script runs in the
user's context and cannot read a state whose inspection requires elevation, so a rule built on one
does not return a wrong answer — it fails to evaluate. Read the reboot-required marker rather than
an installed package version, because a version check returns a confident answer that is wrong every
time an update has installed and the machine has not yet restarted.

**Source:** [Create discovery scripts for custom compliance policy](https://learn.microsoft.com/en-us/intune/device-security/compliance/create-custom-script) (updated 2026-07-15), as carried by [Linux Update Delivery](../operations/patch-management/05-linux-update-delivery.md#compliance-conditional-access).

To put the chosen posture in force:

1. Decide the branch before you author anything, because the two live branches produce different artifacts and neither substitutes for the other. A script updates devices and proves nothing; a compliance policy proves something and updates nothing. A fleet that wants both authors both.
2. **Deliver the platform script.** Navigate to **Intune admin center** > **Devices** > **Linux** > **Scripts** and add the Bash script that puts the `unattended-upgrades` configuration in place, then assign it to a Linux device group.
3. **Set the execution context and the execution frequency in the same edit.** The context default is User, and a User-context script does not run at all on a device with no signed-in user and no user affinity — which is exactly the unattended machine an update script is written for. Choose Root, then set an explicit, justified execution frequency in the same edit rather than inheriting the default. The retry default is no retries, so a script that genuinely fails is reported once and never retried.
4. **Author the compliance policy.** Navigate to **Intune admin center** > **Devices** > **Linux** > **Compliance policies** > **Scripts** > **Add** to upload the discovery script, then to **Intune admin center** > **Devices** > **Compliance** > **Policies** > **Create Policy** to create the policy that evaluates it. Confirm the current blade layout before you start; this plan fixes the decision and the two artifacts, not the admin center's navigation.
5. **Attach the access gate.** In the **Entra portal**, navigate to **Protection** > **Conditional Access** > **Policies** > **New policy**, include **Linux** in the device-platform scope, and grant on controls Linux actually supports. Do not apply *Require device to be marked as compliant* to a policy scoped to Linux — that grant is not available there and applying it blocks every Linux user.
6. Record the branch you took, and if it is the third one, record who governs those devices instead. An unrecorded Linux estate reads as an oversight to the next administrator and gets surveyed again from scratch.

**Source:** [Add custom settings to Linux devices](https://learn.microsoft.com/en-us/intune/intune-service/configuration/custom-settings-linux) (updated 2026-07-01), as carried by [Linux Update Delivery](../operations/patch-management/05-linux-update-delivery.md#bash-platform-script-delivery).

**Source:** [Automatic updates](https://ubuntu.com/server/docs/how-to/software/automatic-updates/) (Canonical, updated 2026-07-15), as carried by [Linux Update Delivery](../operations/patch-management/05-linux-update-delivery.md#configuring-unattended-upgrades).

> **What breaks if misconfigured:** Admins report a patched Linux estate from a script that never ran; users keep working until a Conditional Access gate denies them a web application.

> See: [Linux Update Delivery](../operations/patch-management/05-linux-update-delivery.md#deferral-enforcement-attestation) for the one primitive Linux actually has.

<a id="decision-exception-placement"></a>
### Step 9: Where exceptions live

> **Ask the admin:** When a device or a group must be exempted from this plan, is the exception recorded at the compliance layer or at the update-policy layer?

**Applies to:** All platforms · **Reversibility:** Reversible

| Option | When to choose | Recorded as |
|---|---|---|
| Compliance-policy exclusion | You want one place to look when someone asks who is exempt and why, and you accept that an excluded device keeps receiving updates while it stops being measured | An excluded group on the compliance policy's assignment, leaving every update policy untouched and the exception legible in a single object per platform |
| Update-policy exclusion | The exception is about what a device installs rather than about how it is assessed — a validation cohort that must not take a driver, or a machine that cannot restart on your schedule | An excluded group on each update policy the exemption has to reach, re-recorded once per platform surface, with the device still measured for compliance |

Both placements work and they answer different questions, so the deciding factor is not preference —
it is what an exception costs to keep true a year later. An exclusion at the compliance layer lives
on one object per platform and reads as a list. An exclusion at the update layer has to be repeated
on every object that could deliver the thing being excluded, and on this fleet that is not one place
but several: the Windows deployment ring policy, the Windows driver update policy which carries its
own separate assignment, the Microsoft 365 Apps channel policy, the application deployments, and the
Apple update policy. **Update-layer exclusions fragment per platform** — that is the consequence of
choosing this branch without planning for it, and the failure it produces is not a broken policy but
a partial one, where four of five surfaces honor the exception and the fifth quietly does not.

Two facts already established in this plan sharpen the same point. A device must be assigned to only
one driver update policy, and where two policies do reach it the most permissive approval status
wins — so an update-layer exception implemented by adding a second, more restrictive policy does not
work. And Linux has no update policy to exclude anything from at all, so an update-layer exception
has no home there. Whichever branch you choose, apply it consistently: an exception recorded in two
different layers for two different devices is the arrangement nobody can audit.

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09), as carried by [Windows Driver and Firmware Updates](../operations/patch-management/06-windows-driver-firmware-updates.md#deferral-deadline-behavior).

To record an exception:

1. **At the compliance layer.** Navigate to **Intune admin center** > **Devices** > **Compliance** > **Policies**, open the policy for the platform in question, and add the exception group as an excluded group on its assignment. Confirm the current control name on the assignment surface before you save — this plan fixes the placement decision, not the admin center's blade layout.
2. **At the update layer.** Navigate to **Intune admin center** > **Devices** > **Windows** > **Update rings for Windows 10 and later** and exclude the group on the deployment ring policy's assignment; then repeat the same edit on **Driver and firmware updates**, on the Microsoft 365 Apps channel policy from [Step 5](#decision-m365-apps-channel), on the application deployments from [Step 6](#decision-app-patch-mechanism), and on the Apple update policy from [Step 7](#decision-non-windows-enforcement). Count those surfaces before you start; the count is the cost of this branch.
3. **Record the Linux answer explicitly**, whichever branch you took. There is no Linux update policy to exclude from, so a Linux exception can only be a compliance-policy exclusion or a note in your own change record.
4. **Write down which layer you chose and why, once, for the whole fleet.** The value of a placement rule is that it is uniform; a per-exception judgement call reproduces the fragmentation this Step exists to avoid.

> **What breaks if misconfigured:** Admins believe a device is exempt because one policy excludes it; users still take the update from the surface nobody edited.

> See: [Windows WUfB Rings](../operations/patch-management/01-windows-wufb-rings.md#wufb-deployment-rings) for deployment ring assignment and its one-policy-per-device rule.

<a id="deferrals-and-deadlines"></a>
### Step 10: Deferrals and deadlines

> **Ask the admin:** What deferral, deadline and grace values will each cohort carry, and is every one of them inside the range its policy surface actually accepts?

This Step is not a decision between named options, which is why it carries no branch table and no
reversibility rating. It is the point where the plan asks you for numbers. What it fixes is the
range each number has to sit inside and the policy object each one belongs to; the values themselves
are yours, and this plan deliberately carries none of them.

**Windows quality and feature updates.** Two deferral periods are set on the deployment ring policy:
quality updates defer 0–30 days and feature updates defer 0–365 days. The deadline is a separate
setting from the deferral rather than a consequence of it, and its first-party range is 2–30 days
for quality and feature updates alike; the grace period that follows the deadline runs 0–7 days
before a restart occurs automatically. Read a deferral as deciding when the update is offered and a
deadline as deciding when the device stops asking. One detail decides whether your schedule means
what you think: the deadline calculation is based off the time the client's update scan initially
discovered the update, not the time it was published. The ring topology these values sit on is at
[Patch Management Overview](../operations/patch-management/00-overview.md#ring-terminology).

**Source:** [Update rings policy settings](https://learn.microsoft.com/en-us/intune/device-updates/windows/ref-update-ring-settings) (updated 2026-04-09), as carried by [Windows Driver and Firmware Updates](../operations/patch-management/06-windows-driver-firmware-updates.md#deferral-deadline-behavior).

**Drivers are the asymmetry, and it is not intuitive.** The quality-update deferral set on a
deployment ring does **not** reach drivers approved by a driver update policy. The driver policy
carries its own deferral instead — **Make updates available after (days)**, supporting 0–30 days and
counted from the day the update was added to the policy rather than from the day the OEM published
it. That deferral applies to automatically approved updates only; a manual approval carries the
explicit start date you assign. The quality-update **deadline and grace period do** reach drivers,
and so do the user-experience settings, including active hours, notification behavior and automatic
update behavior. Stated as one rule for the record: the deferral does not cross, the deadline does.

**Source:** [Windows Driver Update Policies FAQs](https://learn.microsoft.com/en-us/intune/device-updates/windows/driver-updates-faq) (updated 2026-04-09), as carried by [Windows Driver and Firmware Updates](../operations/patch-management/06-windows-driver-firmware-updates.md#deferral-deadline-behavior).

**Source:** [Configure Windows driver update policies](https://learn.microsoft.com/en-us/intune/device-updates/windows/configure-driver-update-policy) (updated 2026-04-24), as carried by [Windows Driver and Firmware Updates](../operations/patch-management/06-windows-driver-firmware-updates.md#deferral-deadline-behavior).

**On Apple and Android the deadline is a date, not a day count.** On iOS and iPadOS the enforcement
deadline is declared as **Target Date Time**, an explicit device-local timestamp rather than a
number of days after discovery. On macOS the dates that matter are set by Apple rather than by you:
the legacy update primitives are deprecated with the Apple OS 26 releases and become non-functional
in all Apple OS 27.0 operating systems, so the macOS entry in your record is a migration date, not a
per-cohort deadline. Android's equivalent is the fleet-compliance date behind the strongest Play
Integrity verdict, announced for 31 October 2026 — announced on Intune's own in-development page
rather than stated as shipped, so record it as an announced date whose page says dates might change.
Record all three alongside the Windows day counts, because a record that holds only numbers silently
omits the platforms whose deadlines are calendar events.

**Source:** [Apple: device management updates](https://support.apple.com/guide/deployment/device-management-updates-depd638aa061/web) (published 2026-06-08), as carried by [macOS Update Enforcement](../operations/patch-management/02-macos-update-enforcement.md#deadlines-cutover-dates).

**Source:** [In development - Microsoft Intune](https://learn.microsoft.com/en-us/intune/whats-new/in-development) (ms.date 2026-07-27, updated 2026-07-31), as carried by [Android Patch Delivery](../operations/patch-management/04-android-patch-delivery.md#deadlines-cutover-dates).

**Linux carries no value on this Step, and that is the correct entry rather than a missing one.**
There is no deferral setting, no deadline and no grace period to choose, which is
[Step 8](#decision-linux-posture)'s finding restated as arithmetic: a five-platform deferral record
has one platform with nothing in it. Write the absence down rather than leaving a blank, so the next
administrator reads a finding instead of an omission.

To set the values you chose:

1. **Windows quality and feature values.** Navigate to **Intune admin center** > **Devices** > **Windows** > **Update rings for Windows 10 and later**, open each deployment ring policy and set its quality deferral, feature deferral, deadline and grace period. Give the broad cohort a longer deferral than the pilot — that difference is the only thing staging exposure between them.
2. **Windows driver values.** Navigate to **Intune admin center** > **Devices** > **Windows** > **Driver and firmware updates**, open the driver policy and set **Make updates available after (days)**. Do not expect the deployment ring's value to appear here; the two settings are independent, which is the asymmetry above seen from the console.
3. **Apple values.** Navigate to **Intune admin center** > **Devices** > **Apple updates** > **iOS/iPadOS update policies** and set **Target Date Time** on the policy. On macOS the enforcement deadline lives on the declarative assertion created at [Step 7](#decision-non-windows-enforcement) rather than on a per-cohort number.
4. **Android values.** Navigate to **Intune admin center** > **Devices** > **Compliance** > **Android Enterprise** and set the minimum security patch level the compliance policy requires. That patch-age floor is the closest thing Android has to a deadline, and it is enforced by access denial rather than by installation.
5. **Confirm what actually landed** at **Intune admin center** > **Reports** > **Windows Updates** for the Windows surfaces, and expect the confirmation to lag the push rather than follow it.
6. **Write every value down against the cohort it applies to and the date you chose it.** This plan fixes the ranges and the objects; it does not fix your numbers, and nothing in Intune records why a number was chosen.

> **What breaks if misconfigured:** Admins set a deployment ring deferral and assume drivers inherit it; users take a driver ahead of the schedule anyone wrote down.

> See: [Windows Driver and Firmware Updates](../operations/patch-management/06-windows-driver-firmware-updates.md#deferral-deadline-behavior) for the asymmetry in full.

## Verification

- [ ] The Windows update topology chosen at [Step 1](#decision-windows-update-topology) is the only one in force. On the service-managed branch, every in-scope device appears in exactly one deployment ring at **Intune admin center** > **Devices** > **Windows Autopatch** > **Devices**, and no Update rings policy is left assigned outside the group. On the self-authored branch, every in-scope device is targeted by exactly one policy at **Intune admin center** > **Devices** > **Windows** > **Update rings for Windows 10 and later**.
- [ ] The hotpatch posture chosen at [Step 2](#decision-hotpatch-posture) is in force at both levels it can be set. The tenant-wide default at **Intune admin center** > **Tenant administration** matches the posture you recorded, and every Windows quality update policy at **Intune admin center** > **Devices** > **Windows** that targets a cohort carries the setting that cohort was decided for. Confirm the per-policy value rather than reading the tenant default as fleet-wide, and confirm eligibility too: at **Intune admin center** > **Reports** > **Windows Updates**, an eligible device still taking a monthly restart is on the cumulative-update path rather than failing.
- [ ] The driver approval mode chosen at [Step 3](#decision-driver-approval-mode) is the mode every driver policy actually carries. At **Intune admin center** > **Devices** > **Windows** > **Driver and firmware updates**, each policy shows the approval type this plan decided and each in-scope device is targeted by exactly one of them. A policy on the wrong mode is evidence the decision was not in force when the policy was created, not a setting to correct — the approval type cannot be edited afterwards.
- [ ] The BIOS and firmware surface chosen at [Step 4](#decision-bios-firmware-surface) is the only one in force, and the custody answer is written down where a successor will find it. On the DFCI branch, a DFCI configuration profile exists at **Intune admin center** > **Devices** and the unlock-wipe-delete retirement order is in your own runbook. On the Dell branch, the BIOS configuration policy exists and the per-device passwords are backed up outside Intune. On the vendor branch, the HP or Lenovo artifact is deployed and the holder of the secret is named. On the none branch, the recorded exclusion exists and names the next hardware refresh as the re-check.
- [ ] The Microsoft 365 Apps channel chosen at [Step 5](#decision-m365-apps-channel) is assigned and the rollback window it carries is recorded beside it. At **Intune admin center** > **Devices**, a settings catalog policy carries the **Update Channel** setting with the chosen channel and is assigned to the devices in scope. Expect the device-side confirmation to lag by at least a day, because the value updates only when the **Office Automatic Updates 2.0** scheduled task runs or a user signs in.
- [ ] Every application in scope carries exactly one of the mechanisms decided at [Step 6](#decision-app-patch-mechanism), recorded per application rather than per fleet. At **Intune admin center** > **Apps**, confirm that no application carries both an auto-update assignment and a supersedence relationship, and that every application on the auto-update branch is assigned **Required** — an Available assignment silently stays on the workflow it was already on.
- [ ] The primitive chosen at [Step 7](#decision-non-windows-enforcement) is in force on each of the three platforms that Step names. On macOS, a **Settings catalog** profile carrying **Software Update** > **Enforce Latest** exists at **Intune admin center** > **Devices** > **macOS** > **Configuration profiles**. On iOS and iPadOS, a policy carrying both **Target OS Version** and **Target Date Time** exists at **Intune admin center** > **Devices** > **Apple updates** > **iOS/iPadOS update policies**. On Android, a compliance policy reading the Play Integrity verdict exists at **Intune admin center** > **Devices** > **Compliance** > **Android Enterprise** and is paired with a Conditional Access policy that acts on the signal — an unpaired compliance policy denies nothing. Confirm also that no legacy Apple update-restriction payload is left assigned as an unretired remnant of a deferral posture.
- [ ] The Linux branch chosen at [Step 8](#decision-linux-posture) produced the artifact that branch actually requires. On the script branch, the Bash platform script exists at **Intune admin center** > **Devices** > **Linux** > **Scripts** with its execution context set to Root and an explicit execution frequency, not the User-context default that never runs on an unattended machine. On the compliance branch, the discovery script and its policy exist and the paired Conditional Access policy in the **Entra portal** does not carry *Require device to be marked as compliant*, which is unavailable for Linux. On the third branch, the recorded exclusion names who governs those devices instead. Read a green script exit code as delivery evidence, never as update evidence.
- [ ] Every exception in force sits at the layer chosen at [Step 9](#decision-exception-placement), and none sits at the other one. At the compliance layer, each platform's compliance policy carries the exception group as an excluded group. At the update layer, count the surfaces before you believe the exception: the deployment ring policy, the driver update policy with its own separate assignment, the Microsoft 365 Apps channel policy, the application deployments and the Apple update policy each need the same edit, and Linux has no update policy to exclude from at all.
- [ ] Every value [Step 10](#deferrals-and-deadlines) asks for is written down against the cohort it applies to and sits inside the range its policy surface accepts — quality-update deferral 0–30 days, feature-update deferral 0–365 days, deadline 2–30 days, grace period 0–7 days, and the driver policy's own **Make updates available after (days)** at 0–30 days. The macOS, iOS and Android entries in that record are dates rather than day counts, and the Linux entry records the absence rather than sitting blank.

## Rollback/Recovery

Four of the nine mechanisms below have no rollback path at all. Read that as this section's finding
rather than as a caveat inside it: removing a policy and undoing what the policy did are different
operations throughout this plan, and for four of these mechanisms only the first one is available.

The count reconciles against RCP-04 by arithmetic rather than by assertion, so it can be audited.
RCP-04 enumerates six absences; the research behind this plan lists nine mechanisms. The three extras
are DFCI, the Dell BIOS password and Linux `unattended-upgrades` — the three RCP-04 does not name,
because each carries a recovery path rather than an absence: DFCI and the Dell BIOS password each
have a documented procedure, recorded below, and the Linux entry is an open gap rather than a sourced
absence. Of the remaining six, two hold a documented but partial path: an expedited update's
in-progress installation can be cancelled on a best-effort basis, and a hotpatch can be uninstalled at
the cost of a restart. Six less those two leaves four with nothing behind them — the driver update,
the Autopatch driver mode switch, Enterprise App Catalog auto-update, and Current Channel.

The nine are ordered worst first. A mechanism holding a documented uninstall path is ordered after one
holding none, which is why hotpatch sits behind Current Channel despite being the second of RCP-04's
two flagship absences. The Linux entry is last because an open gap cannot be ranked against a measured
one.

**Microsoft 365 Apps update channel:**

- Current Channel is the default for Microsoft 365 Apps for enterprise, and for the subscription Project and Visio desktop apps.
- The first-party comparison table's *Rollback support* row reads **Not applicable** for Current Channel, **Three months** for Monthly Enterprise Channel and **Two months** for Semi-Annual Enterprise Channel.
- `[INFERENCE]` This corpus reads the Current Channel cell as meaning that a fleet left on the default has no application rollback window at all. That reading is drawn here from the words **Not applicable**; it is not a first-party statement that rollback is impossible, and it is recorded as this corpus's inference rather than quoted as a source claim.
- Only one update channel can be configured per device at a time, and that constraint spans every subscription product installed on it. A channel change is therefore a whole-device change, not a per-application one, which is what makes the absent rollback window on the default channel consequential rather than academic.

**Source:** [Overview of update channels for Microsoft 365 Apps](https://learn.microsoft.com/en-us/microsoft-365-apps/updates/overview-update-channels) (updated 2026-05-27), as carried by [Windows App Updates](../operations/patch-management/08-windows-app-updates.md#m365-apps-update-channels).

**Windows driver updates:**

- There is no rollback for a driver update delivered by a driver update policy. The only lever is pause, applied in the policies that have not yet delivered the update, and pause is best effort — a device already installing may finish anyway.
- Removing a bad driver from a device that already took it is a manual operation performed outside the policy, on the device. Nothing in the policy reverses the install.
- The approval queue offers no reverse gear either: once an update is *Approved* it can never be *Declined*, and *Pause* is indefinite rather than corrective. The status transitions and the limits of pause are set out at [Windows Driver and Firmware Updates](../operations/patch-management/06-windows-driver-firmware-updates.md#approval-workflow).

**The Autopatch driver mode switch:**

- Switching between automatic and manual driver approval on the service side is not a setting change. New policies are generated to replace the old ones, and every approval, paused driver and declined driver previously made for those groups and deployment rings is lost with the policies that held them.
- There is no recovery, because that state cannot be recreated from Intune. This is the mechanism behind the **Destructive** rating on [Step 3](#decision-driver-approval-mode), and the rating names exactly this.
- On an Intune driver update policy the same rule appears in a stricter form: the approval type cannot be edited after the policy is created, so there is no switch to recover from — only a different policy to create. Both surfaces are treated at [Windows Driver and Firmware Updates](../operations/patch-management/06-windows-driver-firmware-updates.md#approval-workflow).

**Enterprise App Catalog auto-update:**

- An auto-update catalog application has no rings and no rollback. An update reaches every assigned device with no phased cohort behind it, so there is no cohort in which a bad version surfaces first.
- There is no automatic uninstall remediation when a version turns out to be bad. What is left is a manual uninstall intent or a remediation script you write — work performed after the fact rather than a control set beforehand.
- The other two branches of [Step 6](#decision-app-patch-mechanism) keep the release gate in your hands, which is the only way this mechanism has one.

**Expedited update policies:**

- Deleting an expedite policy removes it from Intune but does not uninstall an update that has already completed installation. Windows Update attempts to cancel an installation still in progress, and successful cancellation cannot be guaranteed.
- This is one of the six absences RCP-04 enumerates, and it is the one with no guide behind it. No operations guide in this corpus covers expedited updates, so RCP-04 is cited here directly rather than a link being invented to stand in for one.

**Hotpatch security updates:**

- Automatic rollback of a hotpatch update is not supported. Unlike the four mechanisms above it, a hotpatch can be uninstalled: remove the hotpatch, then install the latest cumulative update.
- That path costs the thing hotpatch was adopted for. Uninstalling a hotpatch update is quick, but it requires a device restart — the exact disruption the posture at [Step 2](#decision-hotpatch-posture) exists to avoid.
- This is the second of RCP-04's two flagship absences, and it is ordered here rather than higher because it holds a documented uninstall path where the four above it hold none. Eligibility and the absent automatic rollback are set out at [Windows WUfB Rings](../operations/patch-management/01-windows-wufb-rings.md#hotpatch).

**DFCI firmware configuration:**

- The recovery here is an ordering rule rather than an undo. Unlock the UEFI menus through the profile first, wipe or retire the device second, and delete the Autopilot record last — the order set out at [Device Firmware Configuration Interface (DFCI)](../operations/firmware-bios/01-windows-dfci.md#retiring-a-device). Deleting the profile removes no setting and re-enables no menu, so it is not a step in this sequence.
- Where a device is already locked, the documented route runs through the UEFI menu on the device itself and its option to refresh management from the network, treated at [Device Firmware Configuration Interface (DFCI)](../operations/firmware-bios/01-windows-dfci.md#recovering-locked-device). That is a physical visit, which is why [Step 4](#decision-bios-firmware-surface) is rated **Effectively irreversible** rather than reversible.

**The Dell BIOS password:**

- The documented exit is to disable per-device BIOS password protection from the same policy that set it, and to let that change reach the device **before** you unenroll it. Unenrolling a device from Intune does not remove the BIOS password. The order is set out at [Dell BIOS Configuration Through Intune](../operations/firmware-bios/02-dell-bios-configuration.md#offboarding).
- What ends the path is the end of the Intune subscription. There is then no route to read or retrieve the per-device password from Intune, and what remains is the vendor with proof of ownership. Back the passwords up outside Intune while retrieval still works.

**Linux `unattended-upgrades`:**

- This entry is an open gap rather than a recorded absence, and the distinction is deliberate. The research behind this plan carries no confidence rating for it at all — uniquely among the nine — and what it does carry is a premise about distribution-native tooling, not a sourced finding.
- What can be said without a source is what [Step 8](#decision-linux-posture) already establishes: Intune delivers a script and reports an exit code, so there is no Intune-side surface for a Linux package update to be rolled back from. Whatever recovery exists belongs to the distribution, and this corpus has not established it.
- Do not read that silence as a finding that no recovery exists. It is unwritten here because it is unknown here, and this entry says so rather than filling the gap with a plausible sentence. Establishing it is research a later phase owes, not a cell to complete.

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| An Update rings policy left assigned outside the Autopatch group after the service-managed branch of Step 1 is chosen | The Windows Update Agent receives conflicting policy verdicts from the admin-edited state and the service-managed state; updates flap, deadlines conflict, and compliance reporting drifts | [Step 1](#decision-windows-update-topology) |
| The tenant-wide hotpatch default set to block while Windows quality update policies still target the same cohorts | The block reaches only devices no quality update policy targets; the targeted cohorts keep whatever their own policy carries, and an admin reading one control believes the whole fleet changed | [Step 2](#decision-hotpatch-posture) |
| A driver update policy created on the approval mode the plan did not choose | The approval type cannot be edited after creation, so the wrong mode stays in force until a different policy replaces it — and on the service side, switching modes destroys every approval, pause and decline it held | [Step 3](#decision-driver-approval-mode) |
| The Autopilot record deleted before the UEFI menus are unlocked through the DFCI profile | The menus stay locked at their last applied values on a device that has already been wiped and handed on, and nothing in Intune reaches it any more | [Step 4](#decision-bios-firmware-surface) |
| Microsoft 365 Apps left on the default channel while a rollback window is assumed to exist | A regressed build has no window behind it; the admin looking for the rollback finds the comparison table's *Not applicable* cell instead | [Step 5](#decision-m365-apps-channel) |
| One application carrying two update mechanisms — catalog auto-update and a supersedence relationship | The installed version becomes a function of which mechanism arrives last; admins see the version flip between builds and no configuration explains it | [Step 6](#decision-app-patch-mechanism) |
| A legacy Apple update-restriction payload left in place as the recorded macOS or iOS posture | Enforcement stops at the Apple OS 27.0 releases with no error and no admin-side signal; users on those devices then update whenever they choose | [Step 7](#decision-non-windows-enforcement) |
| A Linux platform script left at the default User execution context | The script never runs on an unattended device with no signed-in user and no user affinity, and the estate reports as governed because the policy exists | [Step 8](#decision-linux-posture) |
| An exception excluded on the deployment ring policy alone, while the driver policy, the Microsoft 365 Apps channel policy and the application deployments carry their own separate assignments | The device is exempt on one surface and governed on the others; the exception reads as honored and is partial | [Step 9](#decision-exception-placement) |
| A deployment ring deferral set and drivers assumed to inherit it | Drivers arrive on the driver policy's own **Make updates available after (days)** value instead, ahead of the schedule anyone wrote down | [Step 10](#deferrals-and-deadlines) |

## See Also

- [Admin Decision-Point Block Format (STD-05)](../_standards/EEE-SOP-standard.md) — the full spec this plan's decision blocks instantiate, including the D-08 amendment that admits a fleet configuration plan to the Device Recipe class
- [Patch Management Overview](../operations/patch-management/00-overview.md) — the domain hub: ring terminology, the deferral-versus-enforcement-versus-attestation taxonomy behind Step 7, and the routing to the four non-Windows guides this plan decides against — [macOS Update Enforcement](../operations/patch-management/02-macos-update-enforcement.md), [iOS Update Lifecycle](../operations/patch-management/03-ios-update-lifecycle.md), [Android Patch Delivery](../operations/patch-management/04-android-patch-delivery.md) and [Linux Update Delivery](../operations/patch-management/05-linux-update-delivery.md)
- [Windows WUfB Rings](../operations/patch-management/01-windows-wufb-rings.md) — deployment ring topology, the containment relationship, hotpatch, and the driver and firmware update policy
- [Windows Autopatch](../operations/patch-management/07-windows-autopatch.md) — what the service is and is not, its enrollment prerequisites, and the Test and Last deployment ring model
- [Windows App Updates](../operations/patch-management/08-windows-app-updates.md) — the six Microsoft 365 Apps channels with their rollback windows, and Enterprise App Management's five reachability gates
- [Firmware and BIOS Governance](../operations/firmware-bios/00-overview.md) — the custody routing behind Step 4, the two native BIOS surfaces, and who holds the secret on each vendor path
