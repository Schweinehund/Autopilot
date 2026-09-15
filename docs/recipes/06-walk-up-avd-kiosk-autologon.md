---
doc_id: RE-237
status: Approved
owner: Intune Admin Lead
doc_type: Guide
platform: Windows
last_verified: 2026-09-03
review_by: 2026-12-02
applies_to: Walk-up AVD kiosk — Windows 11 Enterprise, Autopilot self-deploying, Entra-joined only, internet-only network, Assigned Access multi-app with a local autologon account and Windows App auto-launched
audience: admin
---

**Platform:** Windows · **Doc Type:** Guide · **Doc ID:** RE-237 · **Status:** Approved

# Walk-Up AVD Kiosk: Autologon Multi-App Assigned Access with Windows App Auto-Launch

## Summary

Following this recipe yields a self-deploying, Entra-joined-only Windows 11 kiosk that boots into a local autologon account, auto-launches Windows App as the only visible application, lets a walk-up user sign in to Windows App with their own Entra credentials to reach an Azure Virtual Desktop host pool, and wipes the app's state when they close it or walk away. It covers Windows 11 Enterprise on physical hardware with TPM 2.0, on a network with no line of sight to the corporate LAN, and requires the Intune Administrator role. Every step below was field-validated on one pilot device in 2026-08; where a behaviour was observed in one tenant rather than documented by Microsoft, the text carries the bolded inline **[PILOT]** marker—a single-tenant, single-device observation the harness cannot validate, and a promotion review does not treat as first-party documentation.

> **Scope:** Provisions the physical kiosk only. Assumes AVD host pools, session hosts and FSLogix already exist, and that walk-up users hold the AVD entitlement.

> **Relationship to other recipes:** RE-222 works this device class with the Intune Kiosk template; RE-224 works multi-app Assigned Access for an Entra group.

> This recipe is the autologon multi-app arm that neither of them works.

## Prerequisites

- **This recipe is NOT:** the Entra-group restricted user experience (see [RE-224](03-windows-11-multi-app-kiosk.md)), the Shared PC branch of [RE-222](01-shared-windows-avd-client.md), or a Shell Launcher build—Shell Launcher is the preferred shell for this device class and is worked as a branch in [Step 4](#step-4-choose-the-delivery-mechanism), but it is gated on licensing that the pilot did not hold.
- **RBAC:** Intune Administrator role, plus rights to create Entra dynamic device groups.
- **Windows edition and activation:** Windows 11 Enterprise, IoT Enterprise, or Education, 22H2 or later. Microsoft's own AssignedAccess CSP reference states the Shell Launcher branch's gate in edition-only terms—not supported on Windows 10 Pro—and no first-party page names activation status as a separate factor. **[PILOT]** the `ShellLauncher` node also failed with `Class is not licensed for use` on an installed Enterprise image that was reported as unactivated; that observation is not first-party-documented and is recorded here as what happened, not as why. A self-deploying kiosk never has a licensed user sign in, so per-user Windows E3/E5 subscription activation never fires; see [Step 4](#step-4-choose-the-delivery-mechanism).
- **Physical hardware with TPM 2.0 attestation** — see [Self-Deploying Mode Configuration](../admin-setup-apv1/08-self-deploying.md). No virtual machines.
- **Autopilot-registered device** with a group tag, and a dynamic device group keyed on that tag—see [Hardware Hash Upload](../admin-setup-apv1/01-hardware-hash-upload.md) and [Dynamic Device Groups](../admin-setup-apv1/04-dynamic-groups.md).
- **Internet egress from the kiosk network** to the Autopilot, Intune, Entra, TPM-attestation and Windows App endpoints—see [Network Endpoints Reference](../reference/endpoints.md). No captive portal on the Wi-Fi used at OOBE.
- **Windows LAPS** assigned to the kiosk device group before first boot. Ctrl+Alt+Del > Switch user > LAPS local administrator is the only supported console entrance to a running kiosk.
- **A device-only compliance policy** reaching the kiosk group. **[PILOT]** a userless device with no compliance policy was marked non-compliant by the tenant default, and the tenant's "require compliant device" Conditional Access grant on the AVD apps then blocked every walk-up sign-in.

## Unsupported and Anti-Feature Callouts

| Feature | Why it's unsupported / what breaks | Do this instead |
|---------|-------------------------------------|------------------|
| Shell Launcher on an unactivated Enterprise image | `./Device/Vendor/MSFT/AssignedAccess/ShellLauncher` requires Windows Enterprise or Education by Microsoft's own edition table — not supported on Pro. **[PILOT]** the node also failed with `Class is not licensed for use` (Intune shows `-2016281112`) on an installed Enterprise image reported as unactivated; no first-party page names activation as a separate gating factor | Activate with a per-device volume key (a MAK, delivered through an Intune Edition upgrade profile, targeting volume-licensed Windows Enterprise; reaching IoT Enterprise needs OEM-licensed hardware or a confirmed qualifying-OS upgrade path), procure OEM-licensed IoT Enterprise hardware, or take the multi-app branch worked here—see the licensing standard in [Step 4](#step-4-choose-the-delivery-mechanism) |
| Pre-escaping the Assigned Access XML before pasting it into the custom OMA-URI value | **[PILOT]** Intune escaped the SyncML itself; pre-escaped input arrived double-encoded and the CSP failed with `0xc00ce556` (XML invalid at root) | Paste raw XML. If a *raw* paste fails with `0xc00ce556`, and only then, escape it |
| Intune **Templates** > **Kiosk** > **Multi app kiosk** with a single Windows App entry | Windows App is not one process. Its sign-in and connection children (`windows365.exe`, `msedgewebview2.exe`, `msrdc.exe`) are blocked and, **[PILOT]**, the kiosk showed "This app has been blocked by your system administrator" | Author the custom OMA-URI configuration in [Step 5](#step-5-author-the-assignedaccessconfiguration-xml) with the full allow-list |
| Two Assigned Access writers on one device (Kiosk template + custom profile, or `ShellLauncher` + `Configuration`) | Each writer fights the other; the device holds one Assigned Access configuration | Exactly one assigned profile per device. Unassign and sync before switching mechanisms |
| Hiding Fast User Switching (`Hide entry points for Fast User Switching`) in the kiosk lockdown | Hiding Fast User Switching removes the Switch-user entry point Microsoft documents the policy as controlling. **[PILOT]** on this recipe's build, Ctrl+Alt+Del > Switch user > LAPS admin is the only console entrance, so hiding it removes the technician's only way in while the kiosk user gains nothing | Leave it unconfigured. Remove Task Manager / Lock / Change Password remain safe |
| User-context Win32 apps assigned to the kiosk group | Self-deploying enrollment has no user phase and the autologon account is not an Intune user. **[PILOT]** user-context apps assigned to this recipe's kiosk group never executed on the pilot device | Everything device-context, Required, device group |
| Configuration Manager Remote Control over a Cloud Management Gateway | Remote Control is one of the features that never shipped for internet clients over CMG; the client installs and inventories but cannot be viewed | See [Step 9](#step-9-optional-configuration-manager-client-over-cmg) for what the client *does* buy, and use Intune Remote Help, Quick Assist or AVD session shadowing for viewing |
| Judging a kiosk by its first logon after an XML change or an Autopilot Reset | Assigned Access mints a new autologon account (`kioskUser0` → `kioskUser1` …) and, **[PILOT]**, the fresh profile re-ran every first-logon seed observed: OneDrive setup, Store registration attempts, first-run experiences | Evaluate the second boot. Treat the first as expected noise |
| Chasing every `AL8025` AppLocker event on a factory image to zero | **[PILOT]** Store servicing attempted per-user registration of a rotating set of inbox packages at every logon; each attempt logged a suppressed 8025 and produced no dialog | Extend removal lists only for a dialog-thrower or a clearly consumer-facing removable app |

## Steps

### Step 1: Enroll the device with self-deploying Autopilot

1. Create the dynamic device group keyed on the kiosk group tag—see [Dynamic Device Groups](../admin-setup-apv1/04-dynamic-groups.md).
2. Create a self-deploying deployment profile, Entra join, assigned to that group—see [Self-Deploying Mode Configuration](../admin-setup-apv1/08-self-deploying.md).
3. Navigate to **Intune admin center** > **Devices** > **Windows** > **Enrollment** > **Enrollment Status Page** > **Create** and build a device-phase ESP assigned to the group: block device use until all apps and profiles install, 60-minute timeout, reset allowed on error, and **Block device use until these required apps are installed** set to **Selected** — Windows App, the endpoint security agent, and the Kiosk Baseline package from [Step 8](#step-8-provisioning-time-baseline-and-drift-remediations).

> **What breaks if misconfigured:** An ESP that tracks "all" apps instead of the selected three lets any later Required app become a first-boot failure mode.

> The Configuration Manager client in [Step 9](#step-9-optional-configuration-manager-client-over-cmg) is deliberately not in the blocking list.

4. If the device was ever enrolled before, delete its Intune device object and any stale hybrid Entra or on-premises AD objects, but leave the Autopilot registration and its Entra device object in place—a self-deploying device cannot re-enroll onto a stale record. Confirm the Autopilot profile status shows **Assigned** before powering on.

### Step 2: Choose the kiosk account model

> **Ask the admin:** Do walk-up users share a local autologon account, or does each user sign in to Windows with their own Entra identity?

| Option | When to choose | Consequence if wrong | Branch |
|--------|-----------------|----------------------|--------|
| Local autologon account | Public-facing device; users may not hold their own Entra account; the only app is Windows App, which does its own Entra sign-in | Windows-level identity, Conditional Access at the console and FIDO2 at the sign-in screen are unavailable | Worked here — continue to [Step 3](#step-3-deploy-windows-app-with-auto-logoff) |
| Per-user Entra sign-in to Windows | Identified staff, FIDO2 keys at the console, Entra SSO carried into the session | Slower per sign-in; profile creation cost per user; not a walk-up experience | Not worked here — see the Shared PC branch of [RE-222](01-shared-windows-avd-client.md#step-5b-shared-pc-configuration) |

The autologon arm is the one Microsoft's own reference implementation (`Azure/WindowsAppKiosk`) ships for this device class—its solution-specific documentation names exactly two deployment modes, and this is one of them—and it is the arm this recipe works. It contradicts nothing in [RE-224](03-windows-11-multi-app-kiosk.md): that recipe declines the autologon arm because its allow-listed apps need an authenticated Windows user, while here the only app carries its own sign-in.

> **What breaks if misconfigured:** Picking autologon and later needing per-user attribution at the Windows layer is a re-provision, not a policy edit.

### Step 3: Deploy Windows App with auto-logoff

1. Assemble a Win32 package from `Azure/WindowsAppKiosk` (`source/WindowsApp/Apps/WindowsApp`): [Deploy-WindowsApp.ps1](../../assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/Deploy-WindowsApp.ps1), [Detect-WindowsApp.ps1](../../assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/Detect-WindowsApp.ps1), the `Dependencies` folder—pinned by filename, version, upstream URL and SHA256 in [DEPENDENCIES.md](../../assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/Dependencies/DEPENDENCIES.md) rather than committed—and the Windows App MSIX downloaded once and pinned into the package so ESP never depends on the CDN, itself pinned by Store product ID and version in [WINDOWS-APP-MSIX.md](../../assets/recipes/06-walk-up-avd-kiosk/windows-app/WINDOWS-APP-MSIX.md) rather than committed. The upstream repo's own [README-upstream.md](../../assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/README-upstream.md), vendored alongside the scripts, documents the original deployment-method options this recipe's wrapper narrows to one. The assembly itself is scripted: [Build-WindowsAppPackage.ps1](../../assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/Build-WindowsAppPackage.ps1), run from this folder on a Windows administrator workstation, fetches the MSIX if not already present, writes the pinned `$TargetVersion` into `Detect-WindowsApp.ps1`, optionally Authenticode-signs both scripts, and wraps the result to `.intunewin`; the package's own [README.md](../../assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/README.md) walks the full assemble-then-create sequence, including the lab-test-as-SYSTEM step to run before publishing.
2. Pin the detection script's `$TargetVersion` to the MSIX version you packaged; detection is greater-or-equal, so Windows App's self-updates keep detection green.
3. Navigate to **Intune admin center** > **Apps** > **Windows** > **Add** > **Windows app (Win32)** and create the app: install behavior **System**, no restart action, x64 and Windows 11 22H2+, custom script detection. To script the same creation over Graph instead of the portal, run [New-IntuneWindowsAppKiosk.ps1](../../assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/New-IntuneWindowsAppKiosk.ps1) (through the community `IntuneWin32App` module), which reads the build's `package-info.json` and assigns the app Required to the kiosk device group—it does not touch the ESP profile, so step 4 below is still manual either way.
4. Assign it **Required** to the kiosk device group, and add it to the ESP blocking list from [Step 1](#step-1-enroll-the-device-with-self-deploying-autopilot).

> **Ask the admin:** When should Windows App sign the user out and reset its cached state?

| Option | When to choose | Recorded as |
|--------|-----------------|-------------|
| On close only | Users are trained to close Windows App when done | `-AutoLogoffConfig ResetAppOnCloseOnly` |
| After each connection ends | Users have exactly one resource and the app should reset the moment they disconnect | `-AutoLogoffConfig ResetAppAfterConnection` |
| On close or after an idle interval | Walk-up device that may be abandoned mid-session (this recipe's worked value, 15 minutes) | `-AutoLogoffConfig ResetAppOnCloseOrIdle -AutoLogoffTimeInterval 15` |

The selected option is the install command's parameter set; `-SkipFirstRunExperience` is appended in every case. The script writes `HKLM\SOFTWARE\Microsoft\WindowsApp` with `AutoLogoffEnable`, `AutoLogoffTimeInterval` and `AutoLogoffOnSuccessfulConnect` — the registry names [RE-222 Step 4](01-shared-windows-avd-client.md#step-4-deploy-windows-app-device-context) previously carried as [ASSUMED]. **[PILOT]** this recipe's build resolved them: they are install parameters of `Deploy-WindowsApp.ps1`, delivered by script rather than by a Settings Catalog field.

> **What breaks if misconfigured:** Idle is measured from local keyboard and mouse input. A user working inside an AVD session never idles out; only an abandoned kiosk does.

> **[PILOT]** fifteen minutes is the interval during which the previous person's session is still reachable by the next person at the keyboard.

### Step 4: Choose the delivery mechanism

The licensing standard for this device class decides which rows of the delivery-mechanism table in this step are open to a device today.

> **Ask the admin:** Does the kiosk fleet standardize on MAK-activated Windows Enterprise on the current HP hardware, or on OEM-licensed Windows IoT Enterprise hardware?

| Option | When to choose | Consequence if wrong | Branch |
|--------|-----------------|----------------------|--------|
| MAK-activated Windows Enterprise on the current HP hardware | Existing fleet; the volume agreement carries a confirmed MAK entitlement; Shell Launcher wanted only after `slmgr /xpr` reports `The machine is permanently activated.` | A MAK is planned to activate volume-licensed Windows Enterprise, per the licensing structure below, until confirmed otherwise. Volume Licensing reaches IoT Enterprise only by upgrading a device that already runs a qualifying operating system, and nobody has confirmed whether this class's image qualifies; an OEM licenses a device into IoT Enterprise at manufacture. As with any MAK, the activation is permanent and consumes one count from the volume agreement (see this recipe's own Reversibility notes); **[PILOT]** an image showing as unactivated failed the ShellLauncher node | Standard, ruled 2026-09-10—continue with the multi-app branch at [Step 5](#step-5-author-the-assignedaccessconfiguration-xml) |
| OEM-licensed Windows IoT Enterprise hardware | Purpose-built procurement of further hardware; long-term servicing wanted (IoT Enterprise LTSC) | Procurement spend; regardless of arm, the factory image can still ship OEM utilities, so [Step 8](#step-8-provisioning-time-baseline-and-drift-remediations) is expected to still apply; a device reaches IoT Enterprise through an OEM license at manufacture, and through Volume Licensing only as an upgrade to a qualifying operating system | Alternative—not worked here; after procurement the Shell Launcher row opens with [WindowsApp_AutoLogon.xml](../../assets/recipes/06-walk-up-avd-kiosk/windows-app/WindowsApp_AutoLogon.xml) |

The Intune Admin Lead ruled on 2026-09-10 that the walk-up AVD kiosk class standardizes on MAK-activated, volume-licensed Windows Enterprise on the current HP hardware, with OEM-licensed Windows IoT Enterprise hardware as the alternative for purpose-built procurement. The ruling carries one prerequisite: confirm a MAK entitlement under the volume agreement before the first activation, because the **[PILOT]** image recorded in Prerequisites showed as unactivated, never confirmed as activated. Microsoft's [Windows IoT Enterprise licensing](https://learn.microsoft.com/en-us/windows/iot/iot-enterprise/commercialization/licensing) page sets the split out as a requirement matrix: an OEM licenses a device into IoT Enterprise at manufacture, Volume Licensing cannot license a device into IoT Enterprise at first licensing, and Volume Licensing (KMS or MAK) reaches IoT Enterprise only by upgrading a device that already runs a qualifying operating system. Whether this class's Windows 11 Enterprise image counts as qualifying stays UNVERIFIED, so plan the MAK arm as producing volume-licensed Windows Enterprise until someone confirms otherwise.

Microsoft's [AssignedAccess CSP reference](https://learn.microsoft.com/en-us/windows/client-management/mdm/assignedaccess-csp) states that Shell Launcher and the ShellLauncher node both require Windows Enterprise or Windows Education to function, and that the ShellLauncher node is not supported in Windows 10 Pro. That page names no further edition, so the IoT Enterprise arm rests on this recipe's own Prerequisites list, not on the cited page; a MAK-activated image should clear the same gate—not pilot-tested, stated as reasoning from the licensing structure, not as an observation. No first-party page names activation state as a second gate, and the **[PILOT]** failure on an image showing as unactivated stands as recorded in Prerequisites. Under either arm, the OEM-cleanup work in [Step 8](#step-8-provisioning-time-baseline-and-drift-remediations) is expected to stay in scope, because it addresses the factory image rather than the license; an IoT Enterprise device is expected to narrow that work once its specific SKU is confirmed at procurement to ship a clean image.

> **What breaks if misconfigured:** a MAK bought to reach the IoT arm activates volume-licensed Windows Enterprise; OEMs license IoT Enterprise at manufacture, Volume Licensing only as an upgrade.

> **Ask the admin:** Is the kiosk image activated Enterprise, IoT Enterprise or Education right now, or is it Pro or unactivated Enterprise?

| Option | When to choose | Consequence if wrong | Branch |
|--------|-----------------|----------------------|--------|
| Shell Launcher | Edition confirmed Enterprise, IoT Enterprise or Education (`slmgr /xpr` also reports permanently activated) and instant full-screen launch is wanted | **[PILOT]** profile failed `Class is not licensed for use` on an image reported as unactivated; device sat at the sign-in screen | Not worked here — the XML is [WindowsApp_AutoLogon.xml](../../assets/recipes/06-walk-up-avd-kiosk/windows-app/WindowsApp_AutoLogon.xml), vendored from `Azure/WindowsAppKiosk`, with `V2:AllAppsFullScreen="true"` |
| Multi-app Assigned Access | Any edition on the Assigned Access list, activation not required for the `Configuration` node | Windows App opens as a maximizable window over a restricted Start rather than full-screen from first paint | Worked here — continue to [Step 5](#step-5-author-the-assignedaccessconfiguration-xml) |

Per-user Windows Enterprise E3/E5 cannot license a device nobody signs into. Volume licensing offers three activation methods: KMS needs a routed path to the KMS host and expires in 180 days without it; Active Directory-Based Activation needs a domain-joined device; **MAK** activates once over the internet and is the only one that fits an Entra-only, internet-only kiosk. MAK keys are issued under the same volume agreement as the KMS host key.

> **What breaks if misconfigured:** a Shell Launcher profile assigned to a device that fails the edition/licensing gate retries at every sync and never applies.

> **[PILOT]** that failure showed as `Class is not licensed for use` on an image reported as unactivated; the multi-app branch never checks activation.

### Step 5: Author the AssignedAccessConfiguration XML

Author the file locally before touching Intune. The following payload is complete and field-validated; the only value to verify is the Windows App AUMID suffix, read from a device that has the package installed with `Get-StartApps`. It is also committed at [production.xml](../../assets/recipes/06-walk-up-avd-kiosk/assigned-access/production.xml) for direct download.

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
- Keep a second, **debug** copy of this file that adds `<App DesktopAppPath="%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" />` and a `desktopAppLink` pin to the all-users PowerShell shortcut. Swap assignments to it for in-session testing; never merge it into the production file. It is committed at [debug.xml](../../assets/recipes/06-walk-up-avd-kiosk/assigned-access/debug.xml) — derived from production.xml plus these two elements, not the original pilot debug artifact; see [Asset Provenance](#asset-provenance).

> **What breaks if misconfigured:** A wrong AUMID suffix produces a Windows App that opens and immediately closes in a loop.

> Nothing in Intune reports it; `Microsoft-Windows-AssignedAccess/Admin` on the device does.

### Step 6: Deliver the configuration through a custom OMA-URI profile

1. Navigate to **Intune admin center** > **Devices** > **Windows** > **Configuration** > **Create** > **New policy** > **Platform: Windows 10 and later** > **Profile type: Templates** > **Custom**.
2. Add one OMA-URI row: OMA-URI `./Device/Vendor/MSFT/AssignedAccess/Configuration`, data type **String**, value the raw contents of the file from [Step 5](#step-5-author-the-assignedaccessconfiguration-xml).
3. Assign to the kiosk device group and create.
4. Sync the device and read `Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin` for the Configuration node's result before rebooting.

The device reboots into the autologon account the first time the policy applies; if it lands on a sign-in screen instead, reboot once more—the account is created on apply and used on the following boot.

> **[PILOT]** `0xc00ce556` in the DeviceManagement log meant the value arrived double-encoded—paste raw, not escaped.

> Microsoft states the `ShellLauncher` node's gate in edition-only terms. **[PILOT]** `Class is not licensed for use` firing there is how this recipe tells `ShellLauncher` apart from `Configuration`.

> **[PILOT]** it also fired on an image reported as unactivated.

### Step 7: Lockdown and device policies

Create two Settings Catalog profiles assigned to the kiosk device group—navigate to **Intune admin center** > **Devices** > **Windows** > **Configuration** > **Create** > **New policy** > **Settings catalog**:

1. **User lockdown:** Ctrl+Alt+Del Options—Remove Task Manager, Remove Change Password, Remove Lock Computer (Enabled); Start Menu and Taskbar—Remove Logoff (Enabled); Personalization—Password protect the screen saver (Disabled); File Explorer—Prevent access to drives from My Computer (Enabled, all drives); Experience—Allow Windows Spotlight (Block). Multi-app Assigned Access already sets the three Ctrl+Alt+Del items; the profile keeps them explicit and covers the rest.
2. **Device:** Privacy—Disable Privacy Experience (Enabled); Windows Logon—Enable First Logon Animation (Disabled); Windows Security—Hide Windows Security Notification Area Control (Enabled); Power—Turn Off The Display, System Sleep Timeout and Hibernate Timeout (Plugged In) all `0`, Require A Password When A Computer Wakes (Disabled); System—Disable One Drive File Sync (enabled); Experience—Allow Widgets (Not allowed).
3. Confirm the existing Windows LAPS, BitLocker (TPM-only, silent), update ring, Wi-Fi (device-scoped, production SSID) and endpoint security agent assignments reach the group.

> **What breaks if misconfigured:** Do not configure **Hide entry points for Fast User Switching**. It bricks the Ctrl+Alt+Del console entrance the LAPS administrator depends on.

> The OneDrive and Widgets settings are the policy half of a two-layer fix; [Step 8](#step-8-provisioning-time-baseline-and-drift-remediations) is the removal half.

### Step 8: Provisioning-time baseline and drift remediations

A factory (OEM) image ships consumer and vendor packages that attempt to start in the kiosk session at every logon. Each attempt is blocked by the AppLocker rules Assigned Access generates. **[PILOT]** some of them threw "This app has been blocked by your system administrator" once per boot. The fix has a prevention layer and a drift layer.

1. **Kiosk Baseline (prevention):** a PSADT device-context Win32 package, **ESP-blocking**, built around [KioskBaseline-Invoke-AppDeployToolkit-functions.ps1](../../assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/KioskBaseline-Invoke-AppDeployToolkit-functions.ps1) — the package's own toolkit entry point, one member of its source tree—that runs the shared removal scripts before the autologon account exists—OEM and consumer package deprovisioning ([Remove-KioskOemBloat.ps1](../../assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/Files/Remove-KioskOemBloat.ps1)), per-logon launcher cleanup and the OneDrive root fixes ([Remove-KioskRunTasks.ps1](../../assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/Files/Remove-KioskRunTasks.ps1): Run and RunOnce values, logon-triggered tasks, the Default-profile `OneDriveSetup` seed, per-user OneDrive tasks, orphaned `kioskUser*` profiles). Detection is a registry marker. An Autopilot Reset re-runs it inside the reset's ESP. The package's own [README.md](../../assets/recipes/06-walk-up-avd-kiosk/package-sources/kiosk-baseline/README.md) documents the PSADT assembly (paste the functions file over a fresh v4 template's session block, stage `Files\` with the two removal scripts, sign, wrap to `.intunewin`) and the pilot validation checklist—install as SYSTEM, then an Autopilot Reset expecting a quiet first boot.
2. **Drift remediations (daily, run as system, 64-bit):** navigate to **Intune admin center** > **Devices** > **Scripts and remediations** > **Remediations** > **Create** and publish the same two scripts as detect/remediate pairs—[Detect-KioskOemBloat.ps1](../../assets/recipes/06-walk-up-avd-kiosk/remediations/oem-bloat/Detect-KioskOemBloat.ps1) / [Remove-KioskOemBloat.ps1](../../assets/recipes/06-walk-up-avd-kiosk/remediations/oem-bloat/Remove-KioskOemBloat.ps1) and [Detect-KioskRunTasks.ps1](../../assets/recipes/06-walk-up-avd-kiosk/remediations/run-task-cleanup/Detect-KioskRunTasks.ps1) / [Remove-KioskRunTasks.ps1](../../assets/recipes/06-walk-up-avd-kiosk/remediations/run-task-cleanup/Remove-KioskRunTasks.ps1) — plus a detection-only triage sensor, [Detect-KioskAppBlocks-v6.ps1](../../assets/recipes/06-walk-up-avd-kiosk/remediations/triage-sensor/Detect-KioskAppBlocks-v6.ps1), that reports enforced AppLocker blocks, Assigned Access errors, RestrictRun contents, launch points, and a companion-process census for the endpoint agents. Its output appears in **Pre-remediation detection output**.
3. Pattern lists live in the shared scripts and are changed once, then re-uploaded to both the remediation packages and the Baseline's `Files` folder with a version bump. Never let the copies diverge.

> **Ask the admin:** Should a vendored community de-bloat script (Andrew Taylor De-Bloat) run first, ahead of the EEE removal scripts?

| Option | When to choose | Recorded as |
|--------|-----------------|-------------|
| Vendored De-Bloat first, EEE overlay second | Fleet already standardizes on a pinned, reviewed, re-signed De-Bloat release | `RemoveBloat.ps1` in the Baseline `Files` folder, invoked first with `-customwhitelist` |
| EEE scripts only | Small pilot; ESP time budget not yet measured against De-Bloat's runtime | Baseline as shipped |

> **What breaks if misconfigured:** **[PILOT]** local-only fixes (a deleted Run value, a hive edit) rolled back on Autopilot Reset; only policy- and remediation-delivered fixes re-converge.

> **[PILOT]** the Edge Update scheduled task must never be disabled: it services WebView2, which renders the Windows App sign-in page.

### Step 9: Optional Configuration Manager client over CMG

Install the ConfigMgr client only for inventory, reporting and collection membership. Package `ccmsetup.exe` — Microsoft's own installer, not this recipe's to redistribute; supply it from your own ConfigMgr site media—in a wrapper. This recipe's own wrapper is [Install-ConfigMgrClient.ps1](../../assets/recipes/06-walk-up-avd-kiosk/package-sources/configmgr-client/Install-ConfigMgrClient.ps1), one member of its own package-source tree, committed with its Cloud Management Gateway hostname and site code scrubbed to placeholders—supply your own before use. It waits for `ccmsetup.log` to record `CcmSetup is exiting with return code 0` (code 7 also succeeds), because the launched process returns before installation finishes and Intune would run detection too early. The install command carries the CMG mutual-auth path in both the `/mp:` and `CCMHOSTNAME=` positions, the site code, and the three Entra values (`AADTENANTID`, `AADCLIENTAPPID`, `AADRESOURCEURI`) from **Administration** > **Cloud Services** > **Azure Services** > **Cloud Management** > **Applications** in the ConfigMgr console. Assign Required to the kiosk group only; do not make it ESP-blocking. Detection is [Detect-ConfigMgrClient.ps1](../../assets/recipes/06-walk-up-avd-kiosk/package-sources/configmgr-client/Detect-ConfigMgrClient.ps1) — running service plus a version registry value; removal uses [Uninstall-ConfigMgrClient.ps1](../../assets/recipes/06-walk-up-avd-kiosk/package-sources/configmgr-client/Uninstall-ConfigMgrClient.ps1), which waits out the uninstall the same way the installer waits out the install. This package's own [README.md](../../assets/recipes/06-walk-up-avd-kiosk/package-sources/configmgr-client/README.md) carries the full pre-assignment gating checklist.

> **What breaks if misconfigured:** Co-management moves workload authority. If Device Configuration lands on ConfigMgr for this group, the Assigned Access profile stops applying.

> Confirm the kiosk collection's workloads stay on Intune before the first client installs.

## Asset Provenance

Every committed asset this recipe links lives under `assets/recipes/06-walk-up-avd-kiosk/` in this repository. That path is reachable only from the repository itself—the published `.docx` bundle is built from `docs/_registry/RE-index.md` registry rows and never walks a filesystem directory, so it does not carry the asset tree even though it states it contains the entire Approved documentation corpus.

The Windows App scripts and the Shell Launcher variant of `WindowsApp_AutoLogon.xml` are vendored verbatim from `Azure/WindowsAppKiosk` at pinned commit `17e1c09b4883ea2062bef801ae24bbc9722861d7`. The Windows App MSIX itself is not committed—this repository's largest tracked file is 1.6 MB, and the MSIX exceeds that—and is instead pinned by Microsoft Store product ID, version and download command in [WINDOWS-APP-MSIX.md](../../assets/recipes/06-walk-up-avd-kiosk/windows-app/WINDOWS-APP-MSIX.md); its SHA256 could not be computed in this environment because the Store download path requires Microsoft Entra ID Global, User, or License Administrator authentication, and that document records the exact command to compute it once a packager has that access.

Three artifacts are named in this recipe but not committed. The two VCLibs `.appx` dependency binaries that `Deploy-WindowsApp.ps1` installs alongside Windows App are pinned by filename, version, upstream URL and SHA256 in [DEPENDENCIES.md](../../assets/recipes/06-walk-up-avd-kiosk/package-sources/windows-app-win32/Dependencies/DEPENDENCIES.md) rather than committed—both exceed this repository's size precedent by more than 4x. `ccmsetup.exe` (Step 9) is Microsoft's own ConfigMgr client installer, not this recipe's to redistribute; supply it from your own ConfigMgr site media. `RemoveBloat.ps1` (Andrew Taylor's public De-Bloat, named in Step 8's still-open "Ask the admin" decision) is not vendored—that decision is deferred, not settled; if a fleet later adopts it, vendor it at a GitHub-API-confirmed pinned commit SHA the same way the Windows App files above are vendored.

To request any artifact recorded here as a gap, open an issue against this repository naming the artifact and this recipe's doc ID, RE-237.

## Verification

**Before the first kiosk logon, from Intune:**

- [ ] Windows App, the endpoint agent and the Kiosk Baseline show **Installed** on the device; the custom OMA-URI profile shows **Succeeded**.
- [ ] `Microsoft-Windows-DeviceManagement-Enterprise-Diagnostics-Provider/Admin` shows no `Command failure status` line for `./Device/Vendor/MSFT/AssignedAccess/Configuration`.

**At the console—evaluate the second boot, not the first:**

- [ ] The device auto-logs on to `Kiosk User` with no sign-in screen and no desktop; Windows App opens on its own.
- [ ] Windows App's sign-in page renders (WebView2 allowed); a test user signs in, sees the pool, connects, disconnects, closes the app, and the sign-in page returns with no remembered account.
- [ ] After the configured idle interval with no input, the app resets on its own.
- [ ] Ctrl+Alt+Del offers **Switch user**; the LAPS local administrator can sign in to a normal desktop and back out.
- [ ] No "blocked by your system administrator" dialog appears at logon on two consecutive reboots.

**From the triage sensor (remote):**

- [ ] No fresh-timestamp enforced-block (`AL8004`/`AL8025`) line names a Windows App child process; residual 8025 lines name only inbox packages that rotate boot to boot.
- [ ] No `AA` error lines; no `ONEDRIVE` or `ORPHAN` lines after the Baseline has run.

Two committed diagnostics go deeper when triage output does not explain a failure: [Get-RdpCredDiag.ps1](../../assets/recipes/06-walk-up-avd-kiosk/diagnostics/Get-RdpCredDiag.ps1) — **[PILOT]** run on the pilot device on 2026-08-28—and [Trace-StorisEula.ps1](../../assets/recipes/06-walk-up-avd-kiosk/diagnostics/Trace-StorisEula.ps1), explicitly untested. Both write only to the operator's own working directory.

Autologon takes effect on the boot *after* the account is created. If the first boot after profile delivery lands on a sign-in screen, reboot once before treating it as a failure.

## Rollback/Recovery

Removing this recipe's configuration is not the same as returning the device to its prior state, and on this device class the two diverge in one more way than usual: local repairs do not survive the recovery actions the device is built to tolerate.

**The Assigned Access configuration:**

- Unassign or delete the custom OMA-URI profile; the device must sync to receive the change. Every change to the assigned Assigned Access configuration—including unassigning it—retires the current autologon account and, on reapply, mints the next (`kioskUser0` → `kioskUser1`). The retired profile folder stays on disk until the drift remediation removes it as an orphan.
- Deleting the configuration removes the policy settings but does not revert the Start menu and lockdown state it applied; Microsoft documents this for the multi-app case, and **[PILOT]** this recipe's build confirmed it.

**Autopilot Reset:**

- Supported and the intended recovery action for a misbehaving kiosk. It keeps Entra join and Intune enrollment, wipes profiles and local state, re-runs the device ESP with its blocking apps (the Baseline re-executes), and re-applies the Assigned Access profile. Expect one noisy first logon and full convergence within one remediation cycle. Local-only fixes are lost by design.
- A device cannot re-run self-deploying Autopilot from scratch on its existing record. For a full re-provision, delete the Intune device object first and keep the Autopilot registration.

**Windows App and the auto-logoff registry values:**

- Uninstall through the Win32 app's uninstall command; the registry values it wrote are removed with it. Removing the app while the Assigned Access profile still auto-launches it leaves the kiosk looping on a missing app—remove the profile first.

**Baseline package and remediations:**

- The removal work they perform is not reversible: deprovisioned packages and deleted launchers return only with a reimage. Unassigning the remediations stops future convergence; unassigning the Baseline removes only its marker.

**Licensing:**

- A MAK activation is permanent for that installation and consumes one activation from the agreement's count; there is nothing to roll back. Switching the device from the multi-app branch to Shell Launcher after activation is a profile swap, subject to the one-writer rule above.

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| Assigned Access XML pasted pre-escaped | **[PILOT]** profile error `-2016281112`; DeviceManagement log showed `Unknown Win32 Error code: 0xc00ce556` | [Step 6](#step-6-deliver-the-configuration-through-a-custom-oma-uri-profile) |
| Shell Launcher node assigned to an image without confirmed edition support | **[PILOT]** profile error `-2016281112`; DeviceManagement log showed `Class is not licensed for use` on an image reported as unactivated; device sat at the sign-in screen | [Step 4](#step-4-choose-the-delivery-mechanism) |
| Windows App child processes missing from `AllowedApps` | App opens; sign-in page blank, or "blocked by your system administrator" on connect | [Step 5](#step-5-author-the-assignedaccessconfiguration-xml) |
| Wrong Windows App AUMID suffix | App opens and closes in a loop; `AssignedAccess/Admin` reports the launch failure | [Step 5](#step-5-author-the-assignedaccessconfiguration-xml) |
| Kiosk Baseline not assigned or not ESP-blocking | **[PILOT]** recurring "blocked by your system administrator" at every logon on factory-imaged hardware | [Step 8](#step-8-provisioning-time-baseline-and-drift-remediations) |
| Fast User Switching hidden in the lockdown profile | **[PILOT]** no way to reach the LAPS administrator from a running kiosk; recovery is a portal edit, sync and restart | [Step 7](#step-7-lockdown-and-device-policies) |
| No compliance policy reaching the userless device | **[PILOT]** every walk-up sign-in blocked by a "require compliant device" Conditional Access grant | Prerequisites |
| First boot after an XML change judged as final | **[PILOT]** new `kioskUserN` profile showed OneDrive, a dialog, and a thin Start; all gone on the second boot | [Rollback/Recovery](#rollbackrecovery) |
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
