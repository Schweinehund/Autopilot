---
doc_id: RE-222
status: Approved
owner: Intune Admin Lead
doc_type: Guide
platform: Windows
last_verified: 2026-08-26
review_by: 2026-10-25
applies_to: Shared Windows AVD-client device (self-deploying, kiosk or Shared PC)
audience: admin
---

**Platform:** Windows · **Doc Type:** Guide · **Doc ID:** RE-222 · **Status:** Approved

# Shared Windows AVD-Client Device: Self-Deploying Provisioning

## Summary

Following this recipe yields a self-deploying, Entra-joined shared Windows device that runs the
Windows App as its Azure Virtual Desktop client, provisioned end-to-end from zero through Intune.
It covers Windows 10/11 devices and requires the Intune Administrator role plus Entra ID Groups
permissions to create the deployment profile, Enrollment Status Page, dynamic device group, and
app assignment this recipe walks through.

> **Scope:** Provisions the physical shared Windows device that runs the AVD client, not the Azure session hosts. Assumes host pools, session hosts, and FSLogix already exist.

## Prerequisites

- **This recipe is NOT:** Entra "Shared device mode" (SDM/Global Sign-Out is iOS/Android-only), a RemoteApp-on-host-pool publishing guide, or a guide to Autopilot registration itself — see the linked references below for those.
- **RBAC:** Intune Administrator role (or an equivalent custom role covering device configuration profiles, app assignment, and enrollment configuration).
- **Licensing:** target users already hold the Azure Virtual Desktop / Windows 365 entitlement that grants access to the AVD host pool this device will connect to.
- **Autopilot-registered device** — hardware hash uploaded and matched to a deployment profile; see [Hardware Hash Upload](../admin-setup-apv1/01-hardware-hash-upload.md).
- **TPM 2.0** with attestation capability — the sole self-deploying authentication mechanism; see [Self-Deploying Mode Configuration](../admin-setup-apv1/08-self-deploying.md).
- **Wired Ethernet** at the deployment location for a fully unattended, zero-touch enrollment; built-in Wi-Fi at OOBE is an alternative but requires manually selecting language, locale, and keyboard, then joining the network — see [Self-Deploying Mode Configuration](../admin-setup-apv1/08-self-deploying.md) for the full prerequisite detail. Post-enrollment wired-vs-Wi-Fi network access is a separate, later stage — see [Step 7](#step-7-wired-vs-wi-fi-network-access-post-enrollment).
- **Device-phase-only Enrollment Status Page (ESP)** policy configured — see [ESP Policy](../admin-setup-apv1/03-esp-policy.md).
- **AVD infrastructure already exists** (host pool, session hosts, FSLogix) — this recipe configures the client endpoint only.
- **Users assigned to the AVD application group(s)** that grant feed access on sign-in.

## Unsupported and Anti-Feature Callouts

| Feature | Why it's unsupported / what breaks | Do this instead |
|---------|-------------------------------------|------------------|
| Hybrid Microsoft Entra join | Self-deploying mode has no user affinity, and hybrid join cannot complete without one | Use Microsoft Entra joined only — see [Self-Deploying Mode Configuration](../admin-setup-apv1/08-self-deploying.md) |
| Autopilot Device Preparation (APv2) | APv2 uses a Device Preparation Policy, a different enrollment framework that cannot deliver this recipe's self-deploying flow | See [APv1 vs APv2](../apv1-vs-apv2.md) to confirm framework selection before starting |
| MSRDC (legacy Remote Desktop client, MSI) | MSRDC (MSI) reaches end of support 2026-03-27; the Store "Remote Desktop" app already ended support 2025-05-27 | Deploy the Windows App as described in [Step 4](#step-4-deploy-windows-app-device-context) |
| Wi-Fi at OOBE (supported — anti-pattern for zero-touch) | Wi-Fi at OOBE works but forces the user to manually pick language, locale, and keyboard, and join the network, breaking the zero-touch goal | Use wired Ethernet at OOBE — see [Self-Deploying Mode Configuration](../admin-setup-apv1/08-self-deploying.md); post-enrollment network access is covered separately in [Step 7](#step-7-wired-vs-wi-fi-network-access-post-enrollment) |

## Steps

### Step 1: Create the dynamic device group

1. Navigate to **Azure portal** > **Microsoft Entra ID** > **Groups** > **New group**.
2. Set **Membership type**: **Dynamic Device**.
3. Add the ZTDId-based membership rule.

Create this group first — the deployment profile, ESP, and Windows App assignments in the following steps all target it.

See [Dynamic Device Groups](../admin-setup-apv1/04-dynamic-groups.md) for the exact membership-rule syntax — do not recreate the rule here.

### Step 2: Create the self-deploying deployment profile

1. Navigate to **Intune admin center** > **Devices** > **Windows** > **Enrollment** > **Windows Autopilot** > **Deployment Profiles** > **Create profile** > **Windows PC**.
2. Set **Deployment mode**: **Self-Deploying**.
3. Set **Join type**: **Microsoft Entra joined** (hybrid join is not available for self-deploying mode).
4. Assign the profile to the dynamic device group created in [Step 1](#step-1-create-the-dynamic-device-group).

See [Self-Deploying Mode Configuration](../admin-setup-apv1/08-self-deploying.md) for the full field reference, the TPM 2.0 requirement, and network prerequisites — this recipe links rather than repeats that detail.

### Step 3: Configure the device-phase-only Enrollment Status Page

1. Navigate to **Intune admin center** > **Devices** > **Enrollment** (Windows enrollment) > **Enrollment Status Page** > **Create**.
2. Assign the policy to the same dynamic device group.

> Self-deploying mode has no user affinity, so only the device phase of ESP runs — there is no user phase to configure.

See [ESP Policy](../admin-setup-apv1/03-esp-policy.md) for the full field reference.

### Step 4: Deploy Windows App (device-context)

1. Navigate to **Intune admin center** > **Apps** > **All apps** > **Add**.
2. **App type**: **Microsoft Store app (new)** > **Select**.
3. Search for **Windows App** and select it.
4. On **Assignments**, add the dynamic device group from [Step 1](#step-1-create-the-dynamic-device-group) under **Required**.

> **What breaks if misconfigured:** Assigning Windows App as Available instead of Required, or to a user group instead of a device group, means it is not present before anyone signs in.

> Targeting a device group installs the app before the user signs in; targeting a user group instead delays install until after that user's first sign-in.

The AVD feed subscribes automatically for each signed-in Entra user once Windows App is present on the device — no separate feed-URL configuration is required for a standard commercial-cloud AVD deployment.

> The legacy `RemoteDesktop/AutoSubscription` CSP is User-scope only and targets the retired MSRDC client, not Windows App — it plays no role in this device-context deployment.

> **Ask the admin:** When should Windows App reset cached session state between users on this shared device?

| Option | When to choose | Recorded as |
|--------|-----------------|-------------|
| Reset on app close only | Users are trained to close Windows App between sessions | `ResetAppOnCloseOnly` |
| Reset after each connection ends | Users may leave Windows App open; reset on remote-session disconnect | `ResetAppAfterConnection` |
| Reset after an idle period | Device sits unattended between users; reset after a timeout | `ResetAppOnIdle` |

> **[ASSUMED]:** These three field names are carried from the requirements list, not a fetched Learn page.

> Verify the exact Settings Catalog field names against your own tenant (search "Windows App" or "reset") before finalizing this policy.

### Step 5: Choose kiosk or Shared PC

> **Ask the admin:** Kiosk (Assigned Access, single Windows App) or Shared PC (full shared desktop)?

| Option | When to choose | Consequence if wrong | Branch |
|--------|-----------------|----------------------|--------|
| Kiosk | Single-purpose fixed-app device | Users get full shell instead | [Step 5a](#step-5a-kiosk-configuration) |
| Shared PC | Multi-app shared desktop | Locked to one app unexpectedly | [Step 5b](#step-5b-shared-pc-configuration) |

### Step 5a: Kiosk configuration

1. Navigate to **Intune admin center** > **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy**.
2. Set **Platform**: **Windows 10 and later**; **Profile type**: **Templates** > **Kiosk**.
3. Under configuration settings, set **Select a kiosk mode**: **Single app, full-screen kiosk**.
4. Set **User logon type**: **Auto logon (Windows 10 version 1803 and newer)**.
5. Set **Application type**: **Add Store app**, then select the Windows App entry deployed in [Step 4](#step-4-deploy-windows-app-device-context).
6. Configure **Scope tags** (optional) and **Assignments** (target the same dynamic device group), then **Review + create**.

> **Shell-Launcher / Assigned-Access mutual exclusion:** a device cannot set both `KioskModeApp` and `ShellLauncher` at the same time.

> **MSIX machine-wide provisioning:** the autologon account is local, with no Entra credentials, so Windows App must already be provisioned machine-wide.

> The Required + device-group deployment from [Step 4](#step-4-deploy-windows-app-device-context) already satisfies this — without it, the kiosk launches to a missing app.

> **[ASSUMED] Offline Store license:** the autologon account may need an offline license for Windows App, by analogy with Kiosk Browser's documented autologon requirement.

> Treat this as a plan-time verification item before deploying — no first-party page confirms it for Windows App specifically.

> **[ASSUMED] Configure from console, not RDP:** perform kiosk configuration and AUMID discovery at the physical console, not over an active Remote Desktop session.

> Kiosk lockdown engaging mid-session over RDP can lock out the very session used to configure it.

**AUMID discovery.** Run `Get-StartApps` in PowerShell on a reference device with Windows App installed, and use the returned AUMID verbatim in the **Add Store app** step above. Do not hardcode a guessed AUMID string — Store package identifiers can shift across releases.

> **Optional advanced pointer:** `Azure/WindowsAppKiosk` provides a turnkey lockdown script for this exact scenario.

> Never point to the retired MSRDC-era turnkey kiosk script — it is superseded and collides with the anti-feature table's retired-client row above.

Raw AssignedAccess CSP XML is an optional advanced pointer only — the GUI path above is the primary, first-party-documented mechanism and covers this recipe's single-app kiosk fully.

### Step 5b: Shared PC configuration

1. Navigate to **Intune admin center** > **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Windows 10 and later** > **Templates** > **Shared multi-user device**.

> Microsoft's current documentation increasingly leads with the Settings Catalog surface for these nodes.

> This recipe uses Templates for symmetry with the kiosk branch's own Templates posture — Settings Catalog remains a valid advanced alternative.

| GUI Setting | GUI Value (asserted) | CSP Node | Recorded As |
|---|---|---|---|
| Shared PC mode | Enable | `EnableSharedPCMode` | `true` (branch premise) |
| Guest account | Domain | `AccountModel` | `1` (domain-joined only) |
| Account management | Enabled | `EnableAccountManager` | `true` |
| Local Storage | Disabled | `RestrictLocalStorage` | `true` (restricts local storage) |

> **Guest account = Domain:** the GUI default is "Guest" (`AccountModel = 0`), which creates local guest accounts with no Entra token — the AVD feed stays empty.

> Never leave "Guest account" defaulted for this recipe.

> **Local Storage = Disabled:** GUI "Disabled" maps to CSP `RestrictLocalStorage` true — the restrictive choice, using GUI wording "storage space," not "disk."

> Do not record this setting the other way around — the GUI is allow-framed, the CSP is restrict-framed. Session data lives in the remote session, not on this device.

> **Ask the admin:** Should Intune automatically manage and delete guest/domain accounts on this device?

| Option | When to choose | Recorded as |
|--------|-----------------|-------------|
| Enabled | Standard shared-device hygiene (this recipe's happy path) | `EnableAccountManager: true` |
| Disabled | Accounts should stay on the device indefinitely | `EnableAccountManager: false` |

> **Ask the admin:** With Account management Enabled, when should an account be deleted?

| Option | When to choose | Recorded as |
|--------|-----------------|-------------|
| Immediately after log-out | Maximum privacy; every sign-in is a fresh Entra auth | `DeletionPolicy: 0` |
| At storage space threshold | Default; clean up only when disk space runs low | `DeletionPolicy: 1` |
| At storage space threshold and inactive threshold | Also clean up accounts idle past a set number of days | `DeletionPolicy: 2` |

> With **Immediately after log-out**, every sign-in re-authenticates against Entra (possibly re-prompting MFA).

> This is the same re-auth behavior the Shared PC branch feed-repopulation check relies on in Verification below.

> When **Account Deletion** is "At storage space threshold and inactive threshold," an **Inactive account threshold** field appears.

> Enter the number of consecutive signed-out days, from 0–60, before Intune deletes that account. This field is not shown for the other two Account Deletion options.

### Step 6: Maintenance window and update ring

Both branches use a maintenance-window concept, but the underlying CSP differs per branch:

- **Shared PC:** GUI **Maintenance start time (in minutes from midnight)** — `MaintenanceStartTime`, range 0–1440 (for example, `120` for 2 AM).
- **Kiosk:** the Kiosk template's own **Specify Maintenance Window for App Restarts** setting — `ApplicationManagement/ScheduleForceRestartForUpdateFailures`, a separate CSP node with its own start time and recurrence.

> These are two distinct CSP nodes sharing one admin-facing concept — do not assume a single shared value applies to both branches.

### Step 7: Wired vs Wi-Fi network access (post-enrollment)

If devices stay on wired Ethernet after enrollment, no additional network profile is required — the connection used for zero-touch deployment continues to work.

If devices need Wi-Fi after enrollment, rather than only at OOBE, configure 802.1X — see [Windows 802.1X Admin Setup](../admin-setup-8021x/03-windows.md) for the profile configuration and [802.1X Admin Setup Guides](../admin-setup-8021x/00-overview.md) for the overview. This recipe never configures 802.1X directly; this is a separate, later stage from the Wi-Fi-at-OOBE anti-pattern covered above.

## Verification

Both branches — confirm first:

- [ ] Device completed OOBE unattended (no manual credential entry during device deployment)
- [ ] Device is Entra joined (not hybrid) and enrolled in Intune
- [ ] Device is a member of the dynamic device group (expected latency: minutes to hours)
- [ ] Windows App is present on the device BEFORE any user has signed in

**Kiosk branch:**

- [ ] Device boots directly into Windows App in full-screen kiosk mode via the autologon local account
- [ ] After a session reset, Windows App relaunches automatically and the next end user authenticates the feed interactively inside the app

**Shared PC branch:**

- [ ] A second, distinct, app-group-assigned Entra user signs in and the AVD feed auto-repopulates for that user
- [ ] Local Storage is confirmed restricted (File Explorer save/view to local disk is blocked)

## Rollback/Recovery

Removing this recipe's configuration is not the same as returning a device to the state it was in
before provisioning. Four of the five mechanisms below are unassigned or deleted from Intune and stop
governing the device; the first one cannot be undone that way at all.

**The self-deploying deployment profile:**

- Unassign the profile from the dynamic device group, or delete the profile, to stop it applying to devices that have not yet been provisioned. A device already provisioned is unaffected — the profile governs the deployment, not the device afterwards.
- **This is the mechanism with no clean rollback.** A device cannot automatically re-enroll through Windows Autopilot after an initial deployment in self-deploying mode. Moving an already-provisioned device to a different posture means deleting its device record — **Intune admin center** > **Devices** > **All devices** > select the device > **Delete** — and provisioning it again, not editing a policy.
- Deleting the device record and removing the Autopilot registration are separate actions. The second is the one that decides whether the hardware can be registered and provisioned again later, so decide it deliberately rather than as a cleanup step.

**The Enrollment Status Page policy:**

- Unassign or delete the ESP policy. Self-deploying mode runs the device phase only, so removing the policy changes what the next deployment shows and nothing about a device already past that phase.

**Dynamic device group membership:**

- Editing the membership rule is the single change with the widest reach in this recipe: the deployment profile, the ESP policy and the Windows App assignment all target that one group, so a device that leaves it stops receiving all three.
- Expect the same latency on the way out that the Verification section warns about on the way in. Membership evaluation takes minutes to hours, so a device does not leave the group at the moment the rule is saved.

**The Windows App assignment:**

- Set the assignment intent to Uninstall for the device group to remove the app from devices that already carry it. Simply removing the Required assignment stops new installs and leaves the existing ones in place.
- On the kiosk branch, remove the kiosk configuration first and the app second. An app uninstalled while the kiosk still points at it leaves the device launching to a missing app, which is the failure the table below names from the other direction.

**The kiosk or Shared PC configuration:**

- Unassign or delete the configuration profile carrying the branch you deployed. The device has to check in to receive that change, so a device that is offline or powered off keeps its current configuration until it does.
- On the Shared PC branch, accounts that the account manager has already deleted are gone. Unassigning the profile stops future deletions and recreates nothing.

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| (Both) Windows App assigned Available instead of Required, or to a user group instead of a device group | App absent at first sign-in; feed never appears | [Step 4](#step-4-deploy-windows-app-device-context) |
| (Kiosk) Autologon account has no offline Store license | Windows App fails to launch after autologon; blank or error screen | [Step 5a](#step-5a-kiosk-configuration) |
| (Kiosk) `KioskModeApp` and `ShellLauncher` both configured | Device fails to apply the Assigned Access profile | [Step 5a](#step-5a-kiosk-configuration) |
| (Shared PC) Guest account left at default (Guest, not Domain) | AVD feed is empty for every signed-in user — no Entra token | [Step 5b](#step-5b-shared-pc-configuration) |
| (Shared PC) Inactive account threshold field not visible in Intune | Account Deletion not set to "storage space and inactive threshold," or Account management left Disabled | [Step 5b](#step-5b-shared-pc-configuration) |
| (Both) Dynamic device group rule does not match the device | Device never receives the deployment profile, ESP policy, or Windows App assignment | [Dynamic Device Groups](../admin-setup-apv1/04-dynamic-groups.md) |

## See Also

- [Admin Decision-Point Block Format (STD-05)](../_standards/EEE-SOP-standard.md) — the full spec this recipe's decision blocks instantiate
- [Self-Deploying Mode Configuration](../admin-setup-apv1/08-self-deploying.md) — full self-deploying field reference, TPM 2.0, and network prerequisites
- [APv1 vs APv2](../apv1-vs-apv2.md) — framework selection reference
- [Windows 802.1X Admin Setup](../admin-setup-8021x/03-windows.md) — post-enrollment Wi-Fi/wired profile configuration
- [802.1X Admin Setup Guides](../admin-setup-8021x/00-overview.md) — 802.1X overview and setup sequence
