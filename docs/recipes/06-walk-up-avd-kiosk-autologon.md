---
doc_id: RE-237
status: Draft
owner: Intune Admin Lead
doc_type: Guide
platform: Windows
last_verified: 2026-08-31
review_by: 2026-11-29
applies_to: Walk-up AVD kiosk — Windows 11 Enterprise, Autopilot self-deploying, Entra-joined only, internet-only network, Assigned Access multi-app with a local autologon account and Windows App auto-launched
audience: admin
---

**Platform:** Windows · **Doc Type:** Guide · **Doc ID:** RE-237 · **Status:** Draft

# Walk-Up AVD Kiosk: Autologon Multi-App Assigned Access with Windows App Auto-Launch

## Summary

Following this recipe yields a self-deploying, Entra-joined-only Windows 11 kiosk that boots into a local autologon account, auto-launches Windows App as the only visible application, lets a walk-up user sign into Windows App with their own Entra credentials to reach an Azure Virtual Desktop host pool, and wipes the app's state when they close it or walk away. It covers Windows 11 Enterprise on physical hardware with TPM 2.0, on a network with no line of sight to the corporate LAN, and requires the Intune Administrator role. Every step below was field-validated on one pilot device in 2026-08; where a behaviour was observed in one tenant rather than documented by Microsoft, the text says so.

> **Scope:** Provisions the physical kiosk only. Assumes AVD host pools, session hosts and FSLogix already exist, and that walk-up users hold the AVD entitlement.

> **Relationship to other recipes:** RE-222 works this device class with the Intune Kiosk template; RE-224 works multi-app Assigned Access for an Entra group.

> This recipe is the autologon multi-app arm that neither of them works.

## Prerequisites

- **This recipe is NOT:** the Entra-group restricted user experience (see [RE-224](03-windows-11-multi-app-kiosk.md)), the Shared PC branch of [RE-222](01-shared-windows-avd-client.md), or a Shell Launcher build — Shell Launcher is the preferred shell for this device class and is worked as a branch in [Step 4](#step-4-choose-the-delivery-mechanism), but it is gated on licensing that the pilot did not hold.
- **RBAC:** Intune Administrator role, plus rights to create Entra dynamic device groups.
- **Windows edition and activation:** Windows 11 Enterprise, IoT Enterprise, or Education, 22H2 or later. Edition alone is not enough for the Shell Launcher branch: the AssignedAccess CSP `ShellLauncher` node checks **activation** and fails on an installed-but-unactivated Enterprise image with `Class is not licensed for use`. A self-deploying kiosk never has a licensed user sign in, so per-user Windows E3/E5 subscription activation never fires; see [Step 4](#step-4-choose-the-delivery-mechanism).
- **Physical hardware with TPM 2.0 attestation** — see [Self-Deploying Mode Configuration](../admin-setup-apv1/08-self-deploying.md). No virtual machines.
- **Autopilot-registered device** with a group tag, and a dynamic device group keyed on that tag — see [Hardware Hash Upload](../admin-setup-apv1/01-hardware-hash-upload.md) and [Dynamic Device Groups](../admin-setup-apv1/04-dynamic-groups.md).
- **Internet egress from the kiosk network** to the Autopilot, Intune, Entra, TPM-attestation and Windows App endpoints — see [Network Endpoints Reference](../reference/endpoints.md). No captive portal on the Wi-Fi used at OOBE.
- **Windows LAPS** assigned to the kiosk device group before first boot. Ctrl+Alt+Del > Switch user > LAPS local administrator is the only supported console entrance to a running kiosk.
- **A device-only compliance policy** reaching the kiosk group. A userless device with no compliance policy is marked by the tenant default, and a "require compliant device" Conditional Access grant on the AVD apps then blocks every walk-up sign-in.

## Unsupported and Anti-Feature Callouts

| Feature | Why it's unsupported / what breaks | Do this instead |
|---------|-------------------------------------|------------------|
| Shell Launcher on an unactivated Enterprise image | `./Device/Vendor/MSFT/AssignedAccess/ShellLauncher` fails with `Class is not licensed for use` (Intune shows `-2016281112`). Edition ID says Enterprise; the licensing service says no | Activate with a per-device volume key (MAK via an Edition upgrade profile), buy IoT Enterprise hardware, or take the multi-app branch worked here |
| Pre-escaping the Assigned Access XML before pasting it into the custom OMA-URI value | **Observed in one tenant, not first-party-documented:** Intune escaped the SyncML itself; pre-escaped input arrived double-encoded and the CSP failed with `0xc00ce556` (XML invalid at root) | Paste raw XML. If a *raw* paste fails with `0xc00ce556`, and only then, escape it |
| Intune **Templates** > **Kiosk** > **Multi app kiosk** with a single Windows App entry | Windows App is not one process. Its sign-in and connection children (`windows365.exe`, `msedgewebview2.exe`, `msrdc.exe`) are blocked and the kiosk shows "This app has been blocked by your system administrator" | Author the custom OMA-URI configuration in [Step 5](#step-5-author-the-assignedaccessconfiguration-xml) with the full allow-list |
| Two Assigned Access writers on one device (Kiosk template + custom profile, or `ShellLauncher` + `Configuration`) | Each writer fights the other; the device holds one Assigned Access configuration | Exactly one assigned profile per device. Unassign and sync before switching mechanisms |
| Hiding Fast User Switching (`Hide entry points for Fast User Switching`) in the kiosk lockdown | Removes the only console entrance (Ctrl+Alt+Del > Switch user > LAPS admin). The kiosk user gains nothing; the technician loses everything | Leave it unconfigured. Remove Task Manager / Lock / Change Password remain safe |
| User-context Win32 apps assigned to the kiosk group | Self-deploying enrollment has no user phase and the autologon account is not an Intune user, so user-context apps never execute | Everything device-context, Required, device group |
| Configuration Manager Remote Control over a Cloud Management Gateway | Remote Control is one of the features that never shipped for internet clients over CMG; the client installs and inventories but cannot be viewed | See [Step 9](#step-9-optional-configuration-manager-client-over-cmg) for what the client *does* buy, and use Intune Remote Help, Quick Assist or AVD session shadowing for viewing |
| Judging a kiosk by its first logon after an XML change or an Autopilot Reset | Assigned Access mints a new autologon account (`kioskUser0` → `kioskUser1` …) and the fresh profile re-runs every first-logon seed: OneDrive setup, Store registration attempts, first-run experiences | Evaluate the second boot. Treat the first as expected noise |
| Chasing every `AL8025` AppLocker event on a factory image to zero | Store servicing attempts per-user registration of a rotating set of inbox packages at every logon; each attempt logs a suppressed 8025 and produces no dialog | Extend removal lists only for a dialog-thrower or a clearly consumer-facing removable app |

## Steps

### Step 1: Enroll the device with self-deploying Autopilot

1. Create the dynamic device group keyed on the kiosk group tag — see [Dynamic Device Groups](../admin-setup-apv1/04-dynamic-groups.md).
2. Create a self-deploying deployment profile, Entra join, assigned to that group — see [Self-Deploying Mode Configuration](../admin-setup-apv1/08-self-deploying.md).
3. Navigate to **Intune admin center** > **Devices** > **Windows** > **Enrollment** > **Enrollment Status Page** > **Create** and build a device-phase ESP assigned to the group: block device use until all apps and profiles install, 60-minute timeout, reset allowed on error, and **Block device use until these required apps are installed** set to **Selected** — Windows App, the endpoint security agent, and the Kiosk Baseline package from [Step 8](#step-8-provisioning-time-baseline-and-drift-remediations).

> **What breaks if misconfigured:** An ESP that tracks "all" apps instead of the selected three lets any later Required app become a first-boot failure mode.

> The Configuration Manager client in [Step 9](#step-9-optional-configuration-manager-client-over-cmg) is deliberately not in the blocking list.

4. If the device was ever enrolled before, delete its Intune device object and any stale hybrid Entra or on-premises AD objects, but leave the Autopilot registration and its Entra device object in place — a self-deploying device cannot re-enroll onto a stale record. Confirm the Autopilot profile status shows **Assigned** before powering on.

### Step 2: Choose the kiosk account model

> **Ask the admin:** Do walk-up users share a local autologon account, or does each user sign in to Windows with their own Entra identity?

| Option | When to choose | Consequence if wrong | Branch |
|--------|-----------------|----------------------|--------|
| Local autologon account | Public-facing device; users may not hold their own Entra account; the only app is Windows App, which does its own Entra sign-in | Windows-level identity, Conditional Access at the console and FIDO2 at the sign-in screen are unavailable | Worked here — continue to [Step 3](#step-3-deploy-windows-app-with-auto-logoff) |
| Per-user Entra sign-in to Windows | Identified staff, FIDO2 keys at the console, Entra SSO carried into the session | Slower per sign-in; profile creation cost per user; not a walk-up experience | Not worked here — see the Shared PC branch of [RE-222](01-shared-windows-avd-client.md#step-5b-shared-pc-configuration) |

The autologon arm is the one Microsoft's own reference implementation (`Azure/WindowsAppKiosk`) ships for this device class, and it is the arm this recipe works. It contradicts nothing in [RE-224](03-windows-11-multi-app-kiosk.md): that recipe declines the autologon arm because its allow-listed apps need an authenticated Windows user, while here the only app carries its own sign-in.

> **What breaks if misconfigured:** Picking autologon and later needing per-user attribution at the Windows layer is a re-provision, not a policy edit.

### Step 3: Deploy Windows App with auto-logoff

1. Assemble a Win32 package from `Azure/WindowsAppKiosk` (`source/WindowsApp/Apps/WindowsApp`): `Deploy-WindowsApp.ps1`, `Detect-WindowsApp.ps1`, the `Dependencies` folder, and the Windows App MSIX downloaded once and pinned into the package so ESP never depends on the CDN.
2. Pin the detection script's `$TargetVersion` to the MSIX version you packaged; detection is greater-or-equal, so Windows App's self-updates keep detection green.
3. Navigate to **Intune admin center** > **Apps** > **Windows** > **Add** > **Windows app (Win32)** and create the app: install behavior **System**, no restart action, x64 and Windows 11 22H2+, custom script detection.
4. Assign it **Required** to the kiosk device group, and add it to the ESP blocking list from [Step 1](#step-1-enroll-the-device-with-self-deploying-autopilot).

> **Ask the admin:** When should Windows App sign the user out and reset its cached state?

| Option | When to choose | Recorded as |
|--------|-----------------|-------------|
| On close only | Users are trained to close Windows App when done | `-AutoLogoffConfig ResetAppOnCloseOnly` |
| After each connection ends | Users have exactly one resource and the app should reset the moment they disconnect | `-AutoLogoffConfig ResetAppAfterConnection` |
| On close or after an idle interval | Walk-up device that may be abandoned mid-session (this recipe's worked value, 15 minutes) | `-AutoLogoffConfig ResetAppOnCloseOrIdle -AutoLogoffTimeInterval 15` |

The selected option is the install command's parameter set; `-SkipFirstRunExperience` is appended in every case. The script writes `HKLM\SOFTWARE\Microsoft\WindowsApp` with `AutoLogoffEnable`, `AutoLogoffTimeInterval` and `AutoLogoffOnSuccessfulConnect` — the registry names that [RE-222 Step 4](01-shared-windows-avd-client.md#step-4-deploy-windows-app-device-context) marked `[ASSUMED]`. They are field-confirmed here, delivered by script rather than by a Settings Catalog field.

> **What breaks if misconfigured:** Idle is measured from local keyboard and mouse input. A user working inside an AVD session never idles out; only an abandoned kiosk does.

> Fifteen minutes is the interval during which the previous person's session is still reachable by the next person at the keyboard.

### Step 4: Choose the delivery mechanism

> **Ask the admin:** Is the kiosk image activated Enterprise, IoT Enterprise or Education right now, or is it Pro or unactivated Enterprise?

| Option | When to choose | Consequence if wrong | Branch |
|--------|-----------------|----------------------|--------|
| Shell Launcher | Activation confirmed on the device (`slmgr /xpr` reports permanently activated) and instant full-screen launch is wanted | Profile fails `Class is not licensed for use`; device sits at the sign-in screen | Not worked here — the XML is the `WindowsApp_AutoLogon.xml` file in `Azure/WindowsAppKiosk` with `V2:AllAppsFullScreen="true"` |
| Multi-app Assigned Access | Any edition on the Assigned Access list, activation not required for the `Configuration` node | Windows App opens as a maximizable window over a restricted Start rather than full-screen from first paint | Worked here — continue to [Step 5](#step-5-author-the-assignedaccessconfiguration-xml) |

Per-user Windows Enterprise E3/E5 cannot license a device nobody signs into. Volume licensing offers three activation methods: KMS needs a routed path to the KMS host and expires in 180 days without it; Active Directory-Based Activation needs a domain-joined device; **MAK** activates once over the internet and is the only one that fits an Entra-only, internet-only kiosk. MAK keys are issued under the same volume agreement as the KMS host key.

> **What breaks if misconfigured:** A Shell Launcher profile assigned to an unactivated device retries at every sync and never applies; the multi-app branch never checks activation.

### Step 5: Author the AssignedAccessConfiguration XML

Author the file locally before touching Intune. The payload below is complete and field-validated; the only value to verify is the Windows App AUMID suffix, read from a device that has the package installed with `Get-StartApps`.

```xml
<?xml version="1.0" encoding="utf-8"?>
<AssignedAccessConfiguration xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://schemas.microsoft.com/AssignedAccess/2017/config" xmlns:default="http://schemas.microsoft.com/AssignedAccess/2017/config" xmlns:rs5="http://schemas.microsoft.com/AssignedAccess/201810/config" xmlns:v3="http://schemas.microsoft.com/AssignedAccess/2020/config" xmlns:v4="http://schemas.microsoft.com/AssignedAccess/2021/config" xmlns:v5="http://schemas.microsoft.com/AssignedAccess/2022/config">
  <Profiles>
    <Profile Id="{9A2A490F-10F6-4764-974A-43B19E722C23}">
      <AllAppsList>
        <AllowedApps>
          <App AppUserModelId="MicrosoftCorporationII.Windows365_8wekyb3d8bbwe!Windows365" rs5:AutoLaunch="true" />
          <App DesktopAppPath="windows365.exe" />
          <App DesktopAppPath="msedgewebview2.exe" />
          <App DesktopAppPath="msrdc.exe" />
          <App DesktopAppPath="crossdeviceresume.exe" />
          <App AppUserModelId="Microsoft.Teams.SlimCoreVdiHost.win-x64_8wekyb3d8bbwe!MsTeamsVdi" />
        </AllowedApps>
      </AllAppsList>
      <v5:StartPins>
        <![CDATA[{
          "pinnedList":[
            {"packagedAppId":"MicrosoftCorporationII.Windows365_8wekyb3d8bbwe!Windows365"}
          ]
        }]]>
      </v5:StartPins>
      <Taskbar ShowTaskbar="false"/>
    </Profile>
  </Profiles>
  <Configs>
    <Config>
      <AutoLogonAccount rs5:DisplayName="Kiosk User"/>
      <DefaultProfile Id="{9A2A490F-10F6-4764-974A-43B19E722C23}"/>
    </Config>
  </Configs>
</AssignedAccessConfiguration>
```

What each line decides, beyond the field reference in [RE-224 Step 5](03-windows-11-multi-app-kiosk.md#step-5-author-the-assignedaccessconfiguration-xml):

- `rs5:AutoLaunch="true"` on the Windows App entry opens the app at logon without a tile tap; it requires the `rs5` namespace declared on the root.
- The four `DesktopAppPath` entries are Windows App's child processes, lifted from the reference implementation's advanced-customization notes. Bare filenames are accepted. Remove any of them and the sign-in page renders blank (`msedgewebview2.exe`) or connections fail (`msrdc.exe`).
- The Teams entry keeps AVD Teams optimization alive inside sessions; it is harmless when unused.
- `<AutoLogonAccount>` makes Assigned Access create and manage the local standard account itself. Do not create one.
- Keep a second, **debug** copy of this file that adds `<App DesktopAppPath="%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" />` and a `desktopAppLink` pin to the all-users PowerShell shortcut. Swap assignments to it for in-session testing; never merge it into the production file.

> **What breaks if misconfigured:** A wrong AUMID suffix produces a Windows App that opens and immediately closes in a loop.

> Nothing in Intune reports it; `Microsoft-Windows-AssignedAccess/Admin` on the device does.

### Step 6: Deliver the configuration through a custom OMA-URI profile

1. Navigate to **Intune admin center** > **Devices** > **Windows** > **Configuration** > **Create** > **New policy** > **Platform: Windows 10 and later** > **Profile type: Templates** > **Custom**.
2. Add one OMA-URI row: OMA-URI `./Device/Vendor/MSFT/AssignedAccess/Configuration`, data type **String**, value the raw contents of the file from [Step 5](#step-5-author-the-assignedaccessconfiguration-xml).
3. Assign to the kiosk device group and create.
4. Sync the device and read `Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin` for the Configuration node's result before rebooting.

The device reboots into the autologon account the first time the policy applies; if it lands on a sign-in screen instead, reboot once more — the account is created on apply and used on the following boot.

> **What breaks if misconfigured:** `0xc00ce556` in the DeviceManagement log means the value arrived double-encoded — paste raw, not escaped.

> `Class is not licensed for use` means you are on the `ShellLauncher` node without activation, not the `Configuration` node.

### Step 7: Lockdown and device policies

Create two Settings Catalog profiles assigned to the kiosk device group — navigate to **Intune admin center** > **Devices** > **Windows** > **Configuration** > **Create** > **New policy** > **Settings catalog**:

1. **User lockdown:** Ctrl+Alt+Del Options — Remove Task Manager, Remove Change Password, Remove Lock Computer (Enabled); Start Menu and Taskbar — Remove Logoff (Enabled); Personalization — Password protect the screen saver (Disabled); File Explorer — Prevent access to drives from My Computer (Enabled, all drives); Experience — Allow Windows Spotlight (Block). Multi-app Assigned Access already sets the three Ctrl+Alt+Del items; the profile keeps them explicit and covers the rest.
2. **Device:** Privacy — Disable Privacy Experience (Enabled); Windows Logon — Enable First Logon Animation (Disabled); Windows Security — Hide Windows Security Notification Area Control (Enabled); Power — Turn Off The Display, System Sleep Timeout and Hibernate Timeout (Plugged In) all `0`, Require A Password When A Computer Wakes (Disabled); System — Disable One Drive File Sync (enabled); Experience — Allow Widgets (Not allowed).
3. Confirm the existing Windows LAPS, BitLocker (TPM-only, silent), update ring, Wi-Fi (device-scoped, production SSID) and endpoint security agent assignments reach the group.

> **What breaks if misconfigured:** Do not configure **Hide entry points for Fast User Switching**. It bricks the Ctrl+Alt+Del console entrance the LAPS administrator depends on.

> The OneDrive and Widgets settings are the policy half of a two-layer fix; [Step 8](#step-8-provisioning-time-baseline-and-drift-remediations) is the removal half.

### Step 8: Provisioning-time baseline and drift remediations

A factory (OEM) image ships consumer and vendor packages that attempt to start in the kiosk session at every logon. Each attempt is blocked by the generated AppLocker rules, and some of them throw "This app has been blocked by your system administrator" once per boot. The fix has a prevention layer and a drift layer.

1. **Kiosk Baseline (prevention):** a PSADT device-context Win32 package, **ESP-blocking**, that runs the shared removal scripts before the autologon account exists — OEM and consumer package deprovisioning (`Remove-KioskOemBloat.ps1`), per-logon launcher cleanup and the OneDrive root fixes (`Remove-KioskRunTasks.ps1`: Run and RunOnce values, logon-triggered tasks, the Default-profile `OneDriveSetup` seed, per-user OneDrive tasks, orphaned `kioskUser*` profiles). Detection is a registry marker. An Autopilot Reset re-runs it inside the reset's ESP.
2. **Drift remediations (daily, run as system, 64-bit):** navigate to **Intune admin center** > **Devices** > **Scripts and remediations** > **Remediations** > **Create** and publish the same two scripts as detect/remediate pairs, plus a detection-only triage sensor that reports enforced AppLocker blocks, Assigned Access errors, RestrictRun contents, launch points, and a companion-process census for the endpoint agents. Its output appears in **Pre-remediation detection output**.
3. Pattern lists live in the shared scripts and are changed once, then re-uploaded to both the remediation packages and the Baseline's `Files` folder with a version bump. Never let the copies diverge.

> **Ask the admin:** Should a vendored community de-bloat script (Andrew Taylor De-Bloat) run first, ahead of the EEE removal scripts?

| Option | When to choose | Recorded as |
|--------|-----------------|-------------|
| Vendored De-Bloat first, EEE overlay second | Fleet already standardizes on a pinned, reviewed, re-signed De-Bloat release | `RemoveBloat.ps1` in the Baseline `Files` folder, invoked first with `-customwhitelist` |
| EEE scripts only | Small pilot; ESP time budget not yet measured against De-Bloat's runtime | Baseline as shipped |

> **What breaks if misconfigured:** Local-only fixes (a deleted Run value, a hive edit) roll back on Autopilot Reset; only policy- and remediation-delivered fixes re-converge.

> The Edge Update scheduled task must never be disabled: it services WebView2, which renders the Windows App sign-in page.

### Step 9: Optional Configuration Manager client over CMG

Install the ConfigMgr client only for inventory, reporting and collection membership. Package `ccmsetup.exe` in a wrapper that waits for `ccmsetup.log` to record `CcmSetup is exiting with return code 0` (code 7 also succeeds), because the launched process returns before installation finishes and Intune would run detection too early. The install command carries the CMG mutual-auth path in both the `/mp:` and `CCMHOSTNAME=` positions, the site code, and the three Entra values (`AADTENANTID`, `AADCLIENTAPPID`, `AADRESOURCEURI`) from **Administration** > **Cloud Services** > **Azure Services** > **Cloud Management** > **Applications** in the ConfigMgr console. Assign Required to the kiosk group only; do not make it ESP-blocking.

> **What breaks if misconfigured:** Co-management moves workload authority. If Device Configuration lands on ConfigMgr for this group, the Assigned Access profile stops applying.

> Confirm the kiosk collection's workloads stay on Intune before the first client installs.

## Verification

**Before the first kiosk logon, from Intune:**

- [ ] Windows App, the endpoint agent and the Kiosk Baseline show **Installed** on the device; the custom OMA-URI profile shows **Succeeded**.
- [ ] `Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin` shows no `Command failure status` line for `./Device/Vendor/MSFT/AssignedAccess/Configuration`.

**At the console — evaluate the second boot, not the first:**

- [ ] The device auto-logs on to `Kiosk User` with no sign-in screen and no desktop; Windows App opens on its own.
- [ ] Windows App's sign-in page renders (WebView2 allowed); a test user signs in, sees the pool, connects, disconnects, closes the app, and the sign-in page returns with no remembered account.
- [ ] After the configured idle interval with no input, the app resets on its own.
- [ ] Ctrl+Alt+Del offers **Switch user**; the LAPS local administrator can sign in to a normal desktop and back out.
- [ ] No "blocked by your system administrator" dialog appears at logon on two consecutive reboots.

**From the triage sensor (remote):**

- [ ] No fresh-timestamp enforced-block (`AL8004`/`AL8025`) line names a Windows App child process; residual 8025 lines name only inbox packages that rotate boot to boot.
- [ ] No `AA` error lines; no `ONEDRIVE` or `ORPHAN` lines after the Baseline has run.

Autologon takes effect on the boot *after* the account is created. If the first boot after profile delivery lands on a sign-in screen, reboot once before treating it as a failure.

## Rollback/Recovery

Removing this recipe's configuration is not the same as returning the device to its prior state, and on this device class the two diverge in one more way than usual: local repairs do not survive the recovery actions the device is built to tolerate.

**The Assigned Access configuration:**

- Unassign or delete the custom OMA-URI profile; the device must sync to receive the change. Every change to the assigned Assigned Access configuration — including unassigning it — retires the current autologon account and, on reapply, mints the next (`kioskUser0` → `kioskUser1`). The retired profile folder stays on disk until the drift remediation removes it as an orphan.
- Deleting the configuration removes the policy settings but does not revert the Start menu and lockdown state it applied; Microsoft documents this for the multi-app case, and the pilot observed it.

**Autopilot Reset:**

- Supported and the intended recovery action for a misbehaving kiosk. It keeps Entra join and Intune enrollment, wipes profiles and local state, re-runs the device ESP with its blocking apps (the Baseline re-executes), and re-applies the Assigned Access profile. Expect one noisy first logon and full convergence within one remediation cycle. Local-only fixes are lost by design.
- A device cannot re-run self-deploying Autopilot from scratch on its existing record. For a full re-provision, delete the Intune device object first and keep the Autopilot registration.

**Windows App and the auto-logoff registry values:**

- Uninstall via the Win32 app's uninstall command; the registry values it wrote are removed with it. Removing the app while the Assigned Access profile still auto-launches it leaves the kiosk looping on a missing app — remove the profile first.

**Baseline package and remediations:**

- The removal work they perform is not reversible: deprovisioned packages and deleted launchers return only with a reimage. Unassigning the remediations stops future convergence; unassigning the Baseline removes only its marker.

**Licensing:**

- A MAK activation is permanent for that installation and consumes one activation from the agreement's count; there is nothing to roll back. Switching the device from the multi-app branch to Shell Launcher after activation is a profile swap, subject to the one-writer rule above.

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| Assigned Access XML pasted pre-escaped | Profile error `-2016281112`; DeviceManagement log shows `Unknown Win32 Error code: 0xc00ce556` | [Step 6](#step-6-deliver-the-configuration-through-a-custom-oma-uri-profile) |
| Shell Launcher node assigned to an unactivated Enterprise device | Profile error `-2016281112`; DeviceManagement log shows `Class is not licensed for use`; device sits at the sign-in screen | [Step 4](#step-4-choose-the-delivery-mechanism) |
| Windows App child processes missing from `AllowedApps` | App opens; sign-in page blank, or "blocked by your system administrator" on connect | [Step 5](#step-5-author-the-assignedaccessconfiguration-xml) |
| Wrong Windows App AUMID suffix | App opens and closes in a loop; `AssignedAccess/Admin` reports the launch failure | [Step 5](#step-5-author-the-assignedaccessconfiguration-xml) |
| Kiosk Baseline not assigned or not ESP-blocking | Recurring "blocked by your system administrator" at every logon on factory-imaged hardware | [Step 8](#step-8-provisioning-time-baseline-and-drift-remediations) |
| Fast User Switching hidden in the lockdown profile | No way to reach the LAPS administrator from a running kiosk; recovery is a portal edit, sync and restart | [Step 7](#step-7-lockdown-and-device-policies) |
| No compliance policy reaching the userless device | Every walk-up sign-in blocked by a "require compliant device" Conditional Access grant | Prerequisites |
| First boot after an XML change judged as final | New `kioskUserN` profile shows OneDrive, a dialog, and a thin Start; all gone on the second boot | [Rollback/Recovery](#rollbackrecovery) |
| User-context app assigned to the kiosk group | App never installs; Intune shows it as not applicable or pending forever | [Unsupported and Anti-Feature Callouts](#unsupported-and-anti-feature-callouts) |

## See Also

- [Admin Decision-Point Block Format (STD-05)](../_standards/EEE-SOP-standard.md) — the spec this recipe's decision blocks instantiate
- [Shared Windows AVD-Client Device: Self-Deploying Provisioning](01-shared-windows-avd-client.md) — the Kiosk-template and Shared PC arms of the same device class
- [Windows 11 Multi-App Kiosk: Assigned Access Provisioning](03-windows-11-multi-app-kiosk.md) — the Entra-group arm and the full XML field reference
- [Self-Deploying Mode Configuration](../admin-setup-apv1/08-self-deploying.md) — TPM 2.0, network and re-enrollment constraints
- [ESP Policy](../admin-setup-apv1/03-esp-policy.md) — device-phase Enrollment Status Page configuration
- [Windows Drift Detection](../operations/drift-migration/01-windows-drift-detection.md) — the detect/remediate pair pattern the Step 8 remediations follow
- [Autopilot Licensing Requirements](../reference/licensing-matrix.md) — per-user versus per-device Windows Enterprise licensing
- [Co-Management Overview](../operations/co-management/00-overview.md) — workload authority, relevant to Step 9

## Version History

| Date | Change |
|------|--------|
| 2026-08-31 | Initial Draft — authored from the 2026-08-27 to 2026-08-30 pilot build of one walk-up AVD kiosk on HP hardware; all mechanism claims field-validated on that device, tenant-specific observations labelled as such |
