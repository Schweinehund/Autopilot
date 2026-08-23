---
last_verified: 2026-08-23
review_by: 2026-10-22
applies_to: all
audience: admin
platform: Windows
---

> **Platform applicability:** This guide is Windows-specific and covers Windows application update
> governance as its own surface — mechanism choice, the Microsoft 365 Apps update channel model, the
> Enterprise App Management catalog, the Microsoft Store app (new) type, and the Windows Package
> Manager control surface. For the cross-platform overview, see
> [Patch Management Overview](00-overview.md). For the Windows Autopatch service, see
> [Windows Autopatch](07-windows-autopatch.md).

# Windows Application Updates

This guide documents Windows application update governance — which mechanism keeps an installed
application current, on what cadence, and what each mechanism cannot do. It lives in
`patch-management/` rather than `app-lifecycle/` deliberately: this is the update-governance view of
applications, the sibling of the Windows OS, driver and firmware, and Autopatch guides already in this
directory, not the deployment view of how an application gets built, packaged and assigned in the
first place. Without this sentence, a reader who already knows
[App Lifecycle Overview](../app-lifecycle/00-overview.md) exists could reasonably conclude one of the
two directories is stale; neither is. The ownership split is explicit:
[App Lifecycle Overview](../app-lifecycle/00-overview.md) and its per-platform guides own the
**object model** — application types, packaging, supersedence graphs, dependency chains, and the
content-preparation tooling that gets an application onto a device — and this guide owns **update
governance** — which mechanism applies, what cadence it runs on, and what it cannot do, once that
application is already there.

<a id="choosing-an-app-update-mechanism"></a>
## Choosing a Windows App Update Mechanism

Choose the update mechanism by asking which surface already holds the application, in this order:

1. **The application is in the Enterprise App Catalog.** Use Enterprise App Management — a licensed
   Intune add-on that keeps Required-assigned catalog applications current automatically, subject to
   the reachability gates and limitations in [Enterprise App Management](#enterprise-app-management).
2. **The application is in the Microsoft Store.** Use the Microsoft Store app (new) type — included
   with Intune at no additional license, with an update model that splits by package type; see
   [Microsoft Store Apps](#microsoft-store-apps).
3. **Neither.** Fall back to a Win32 application with supersedence — the mechanism documented in
   [Windows Win32 / MSIX at Scale](../app-lifecycle/01-windows-win32-msix-scale.md#supersedence),
   covering the supersedence behavior matrix and the Required-assignment exception this guide does not
   restate. The enterprise catalog's own auto-update is not supersedence: Microsoft states it uses no
   new app object and no supersedence relationship, so a reader choosing between the two is not sent to
   a mechanism the vendor's own catalog explicitly rules out for itself.
4. **Considering the Windows Package Manager (WinGet)?** It is not a supported unattended patching path
   through Intune for any of the three surfaces above; see
   [Controlling WinGet on Managed Devices](#controlling-winget) for what Intune can and cannot do to it.

<a id="m365-apps-update-channels"></a>
## Microsoft 365 Apps Update Channels

Microsoft 365 Apps for enterprise ships six subscription update channels:

| Channel | Default | Feature update cadence | Rollback support |
|---|---|---|---|
| **Current Channel** | Yes — the default for Microsoft 365 Apps and for the subscription Project and Visio desktop apps | As features are ready, roughly monthly | Not applicable |
| **Current Channel (Preview)**, also called **Current (Preview)** | No | At least a week or more before the same version reaches Current Channel | — |
| **Monthly Enterprise Channel** | No | Once a month, on the second Tuesday | Three months |
| **Semi-Annual Enterprise Channel** | No | Twice a year, in January and July, on the second Tuesday — see the cadence conflict below | Two months |
| **Semi-Annual Enterprise Channel (Preview)** | No | About four months ahead of the corresponding Semi-Annual Enterprise Channel release | — |
| **Beta Channel** | No — **not supported**; test environments and a small group of select users only | Continuous, ahead of Current Channel (Preview) | — |

Three structural constraints apply across all six channels. Channels are device-specific, not
user-specific: "Update channels are device-specific and apply only to installations of Microsoft 365
Apps on devices running Windows. The choice of an update channel for a device isn't a setting that
follows the user from device to device." Only one channel can be configured for a device at a time, and
that constraint spans every subscription product installed on it, not just Microsoft 365 Apps itself:
"you can only configure one update channel for a device. For example, if you're installing Microsoft
365 Apps, Project, and Visio on the same device, they all must use the same update channel. You can't
have a mix of update channels on the same device." And two collaboration clients sit outside this model
entirely: "OneDrive and Microsoft Teams have their own update cadences that are separate from these
update channels."

**Source:** [Overview of update channels for Microsoft 365 Apps](https://learn.microsoft.com/en-us/microsoft-365-apps/updates/overview-update-channels) (updated 2026-05-27)

This enumeration covers the subscription versions of Microsoft 365 Apps and the subscription Project
and Visio desktop apps. Volume-licensed Office, such as Office Long Term Servicing Channel (LTSC)
Professional Plus 2021, uses a separate, differently named update channel this guide does not cover.

An Autopatch-enrolled device is steered toward the Monthly Enterprise Channel; see
[Windows Autopatch](07-windows-autopatch.md#update-workloads-objectives) for the service objective this
steering is measured against, which this guide does not restate here.

**The post-July-2026 cadence conflict.** Under *Semi-Annual Enterprise Channel overview*, the channels
overview page states: "Beginning July 2026, Semi-Annual Enterprise Channel will begin receiving monthly
feature and security updates." A companion article on channel unification, covered by message-center
notice **MC1274325**, makes the same announcement: "Beginning with the Version 2606 update release in
July 2026, Microsoft will unify Semi-Annual Enterprise Channel and Monthly Enterprise Channel into a
single enterprise-focused channel for Microsoft 365 Apps."

**Source:** [Overview of update channels for Microsoft 365 Apps](https://learn.microsoft.com/en-us/microsoft-365-apps/updates/overview-update-channels) (updated 2026-05-27)
**Source:** [Microsoft 365 Apps: SAEC and MEC unification](https://learn.microsoft.com/en-us/microsoft-365-apps/updates/unified-update-channels) (updated 2026-07-15)

The same overview page's own comparison table and its *Feature updates for Semi-Annual Enterprise
Channel* section still describe the older behavior: the table's Semi-Annual Enterprise Channel column
lists Feature updates as "Twice a year (in January and July), on the second Tuesday of the month," and
the Feature-updates section states "New, or updated, features are released in Semi-Annual Enterprise
Channel twice a year, on the second Tuesday in January and July."

**Source:** [Overview of update channels for Microsoft 365 Apps](https://learn.microsoft.com/en-us/microsoft-365-apps/updates/overview-update-channels) (updated 2026-05-27)

Neither reading is supportable from Microsoft's own pages as of this guide's last-verified date: this
guide is describing the state of Microsoft's documentation, not a confirmed state of the service. The
one checkable discriminator Microsoft did publish is a build number: "Devices with build numbers higher
than 20131.20000 have successfully installed Version 2606." An administrator can check this against
their own fleet even though the documentation does not resolve itself. Organizations that need more
time have a dated option: Semi-Annual Enterprise Channel "Version 2508 is supported through
September 8, 2026," after which devices must be configured to prevent receiving Version 2606 to
remain on Version 2508.

<a id="setting-the-channel-from-intune"></a>
## Setting the Channel from Intune

The current, Microsoft-recommended surface for setting the Microsoft 365 Apps update channel from
Intune is the **settings catalog**. To configure the settings catalog policy, at minimum, sign in to
the Intune admin center with the **Policy and Profile Manager** role. In a settings catalog policy,
search for and enable the **Update Channel** setting and select the channel name; a separate
**Target Version** setting can be used to force the installed version to update to a specific build.

**Source:** [Set the Microsoft 365 apps update channel using the settings catalog in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/update-office) (updated 2026-04-30)

The older **Administrative Templates** route also remains documented and current: it uses
administrative templates for Windows 10 and newer to enable a distinctly named setting,
**Update Channel (2.0)**, under `Computer Configuration\Microsoft Office 2016 (Machine)\Updates`. Do
not collapse the two settings names into one; they are the same underlying capability exposed by two
different Intune configuration profile types under two different names, and a companion article states
plainly that the settings catalog profile type has more settings available than the Administrative
Templates profile type.

**Source:** [Change the update channel with Microsoft Intune Administrative Templates](https://learn.microsoft.com/en-us/microsoft-365-apps/updates/change-update-channels) (updated 2026-07-18)

Two operationally sharp facts follow from how the setting actually takes effect on a device. First, the
scheduled task **Office Automatic Updates 2.0** must be enabled on client devices — it is the task that
applies the assigned channel, regardless of which management tool assigned it. Second, the
verification registry key, at `Computer\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Office\ClickToRun\Configuration`
value `UpdateChannel`, updates only when that scheduled task runs or when a user signs in to the
device, and depending on those triggers it can take at least a day and more before the registry key
updates. Re-applying a channel setting is therefore not an immediate or self-confirming operation; an
administrator checking compliance immediately after a policy push will not yet see the change
reflected.

**Source:** [Set the Microsoft 365 apps update channel using the settings catalog in Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/update-office) (updated 2026-04-30)

The settings catalog article's own verification steps use two different administrative-template
namespace strings across its two verification paths — the article does not explain the difference, and
this guide quotes only the one namespace it names for the Update Channel step, `office16v2~Policy~`,
rather than presenting the difference as meaningful.

<a id="enterprise-app-management"></a>
## Enterprise App Management

Enterprise App Management is a licensed Intune add-on that keeps a curated catalog of Microsoft-hosted
Win32 applications current on managed devices, gated as hard as its own entitlement. Five reachability
gates apply together:

- **Licensing.** "This feature requires a subscription in addition to Microsoft Intune Plan 1 or Plan
  2." The add-on can be purchased "as a standalone SKU or as part of the Microsoft Intune Suite."
- **Application types.** "The apps currently provided in the Enterprise application catalog are
  Windows Win32 applications (exe and msi)."
- **Hosting and installation.** Microsoft hosts the applications "in Microsoft storage accessible
  through `*.manage.microsoft.com`," and they are installed by the Intune management extension.
- **Cloud environments.** "Public cloud" and the sovereign clouds "U.S. Government Community Cloud
  (GCC) High" and "U.S. Department of Defense (DoD)" — no other cloud environment is named.
- **Assignment intent.** "Auto-update applies to apps with a Required assignment." Applications
  assigned as Available for enrolled devices "continue to use the existing update workflow" rather than
  the auto-update path.

**Source:** [Enterprise App Management](https://learn.microsoft.com/en-us/intune/app-management/deployment/enterprise-app-management) (updated 2026-06-24)

The unentitled case is a procurement fact, not a product-enforced one: Microsoft's own FAQ states
"Intune doesn't perform a license check on Enterprise App Catalog apps." An organization without the
add-on subscription is not blocked by Intune at the point of use; it is blocked by not having purchased
the entitlement in the first place.

**Source:** [Enterprise App Management](https://learn.microsoft.com/en-us/intune/app-management/deployment/enterprise-app-management) (updated 2026-06-24)

Microsoft publishes Service Level Objectives for how quickly an application update reaches the catalog,
and frames them deliberately as not a guarantee: "Unlike Service Level Agreements (SLAs), SLOs are
guidelines, not guarantees." The measurement window "starts at ingestion, the point when the app
update is first received from the data source and logged in the EAM system." The published targets:
80–90% of app updates are processed and available in the Intune portal within 24 hours of ingestion;
updates requiring manual testing and approval are completed within seven days; and high-usage or
critical apps that fail automated validation are prioritized for expedited processing with a goal
of 48 hours. Adding a new application to the catalog in the first place carries an even harder
disclaimer:
Microsoft "doesn't offer or assume any Service Level Agreement (SLA) or timeline regarding adding an
app to the Enterprise App Catalog."

**Source:** [Enterprise App Management](https://learn.microsoft.com/en-us/intune/app-management/deployment/enterprise-app-management) (updated 2026-06-24)

This is a trade-off, not a prohibition: catalog applications **can** be selected as blocking
applications in the Enrollment Status Page (ESP) and Autopilot device preparation profiles — see
[Win32 App Packaging Reference](../../reference/win32-app-packaging.md) and
[ESP Policy Configuration](../../admin-setup-apv1/03-esp-policy.md) for how blocking applications are
configured in each. Only an **auto-update** catalog application cannot be a blocking application; an
application assigned Available, outside the auto-update path, is not excluded by this rule.

**Source:** [Enterprise App Management](https://learn.microsoft.com/en-us/intune/app-management/deployment/enterprise-app-management) (updated 2026-06-24)

Enterprise App Management's auto-update is explicitly **not** supersedence: Microsoft's own catalog
article describes it as detecting a newer catalog version and updating targeted devices with no new app
object and no supersedence relationship. This guide does not link the Win32 supersedence anchor from
this section for that reason; supersedence is a Win32 application-object mechanism this capability does
not use.

<a id="microsoft-store-apps"></a>
## Microsoft Store Apps

The Microsoft Store app (new) type keeps installed applications current, but the update model splits by
package type. UWP apps are kept current by the Microsoft Store: "UWP apps are kept up to date by the
Store. The UWP app will stay up to date with or without Intune assignment once it is installed, unless
the Store policy is set to block auto-update." Win32 Store apps are kept current by Intune instead:
"Microsoft Store Win32 apps are kept up to date by Intune, therefore in order for the app to be updated
it must be assigned in Intune. App updates are not affected by the Store's update policies."

**Source:** [Add Microsoft Store apps to Microsoft Intune](https://learn.microsoft.com/en-us/intune/app-management/deployment/add-microsoft-store) (updated 2026-06-25)

Win32 Store apps are still in preview, stated twice on the page: an Important callout states "Win32
store apps are supported (in preview)," and the Win32-specific section restates it: "Win32 apps that
are in the Microsoft Store are currently in preview. Not all Win32 apps will be available or
searchable." The unsupported-functionality section has exactly one entry: "Any app that has an ARM64
installer isn't supported." A paid app is also excluded — a paid app is one of the reasons an app does
not appear when searching within Intune — and client devices must support at least two core processors
to successfully install and run Microsoft Store apps.

**Source:** [Add Microsoft Store apps to Microsoft Intune](https://learn.microsoft.com/en-us/intune/app-management/deployment/add-microsoft-store) (updated 2026-06-25)

The suppression behavior also differs by package type. Blocking the Store's own auto-update stops UWP
apps from updating: "Doesn't affect the Microsoft Store's ability to automatically update UWP apps. As
long as the Turn off Automatic Download and Install of updates (`AllowAppStoreAutoUpdate` CSP) policy
isn't enabled, the Microsoft Store automatically updates UWP apps." The same block does not stop Win32
Store apps: "For Win32 Store apps, if Turn off Automatic Download and Install of updates is set, then
the Win32 apps with an active Intune assignment are still automatically updated." Removing the Intune
assignment is the only documented lever for a Win32 Store app.

**Source:** [Add Microsoft Store apps to Microsoft Intune](https://learn.microsoft.com/en-us/intune/app-management/deployment/add-microsoft-store) (updated 2026-06-25)

The Microsoft Store app type's own update cadence is a documented absence rather than a documented
figure. The page states that apps are kept up to date and never states when — no published cadence, no
check interval, no schedule, and no version pinning, re-measured this plan as a zero-hit search across
the whole page. This absence contrasts directly against Enterprise App Management's own
published-but-non-binding objectives in [Enterprise App Management](#enterprise-app-management): EAM at
least publishes numbers it calls guidelines, not guarantees, where the Store app type publishes none at
all. No number is invented here, and none is borrowed from Enterprise App Management or from the
Intune management extension.

<a id="eam-store-winget-routing"></a>
## Enterprise App Management, Store Apps and WinGet — Routing

**"Does Enterprise App Management use Winget?"** — **"No. Enterprise App Catalog apps are
directly installed by the Intune management extension (IME)."**

**Source:** [Enterprise App Management](https://learn.microsoft.com/en-us/intune/app-management/deployment/enterprise-app-management) (updated 2026-06-24)

The name "WinGet" attaches to three genuinely different things, and none of the three is the others.
The **Intune Microsoft Store app (new)** application type is a patching surface — it is what
[Microsoft Store Apps](#microsoft-store-apps) documents. The operating-system **App Installer**
component and its command-line tool, `winget.exe`, is not a patching surface; Intune offers only the
policy-shaped on-off surface documented in
[Controlling WinGet on Managed Devices](#controlling-winget). And the developer-environment
**configuration feature** (`winget configure`, also called WinGet Configuration) is out of scope for
this guide: its own page states it is for setting up "the desired state of the development environment
on your Windows machine," never mentions Intune or device management, and documents partial success as
designed behavior rather than a compliance guarantee — a configuration file "will continue to run,
accomplishing as many tasks as possible, even if some of the assertions or resource dependencies fail."

**Source:** [WinGet Configuration](https://learn.microsoft.com/en-us/windows/package-manager/configuration/) (updated 2025-06-11)

Where the Autopilot device-preparation documentation states that only Microsoft Store apps that support
the Windows Package Manager are supported, that is a device-preparation eligibility filter on the
Intune Microsoft Store app (new) application type — not a statement that the command-line tool is
itself an Intune-managed patching surface. This same wording appears unchanged in this corpus's own
device-preparation and device-group pages, and a reference matrix elsewhere in the corpus states the
same conflation using the package manager's full name; this guide does not edit any of those pages, so
the correction here is reachable only by a reader who already found this guide.

Two carve-outs on the Store-apps page show why the conflation exists in the first place, and both point
the opposite direction from a delivery claim: "The Windows Package Manager command-line tool winget.exe
is not affected by" the **Turn off the Store application** policy, and the **Only display the private
store within the Microsoft Store app** policy "Allows the Windows Package Manager winget command line
interface (CLI) access to the Microsoft Store" while blocking end-user Store access — which is why it
is not the preferred lockdown choice.

**Source:** [Add Microsoft Store apps to Microsoft Intune](https://learn.microsoft.com/en-us/intune/app-management/deployment/add-microsoft-store) (updated 2026-06-25)

<a id="controlling-winget"></a>
## Controlling WinGet on Managed Devices

This section is about hardening — controlling whether the Windows Package Manager is available on a
device and where it can source packages from — not about patching. Nothing here makes WinGet an
update-governance surface; see
[Choosing a Windows App Update Mechanism](#choosing-an-app-update-mechanism) for what does.

| Policy | CSP | What it controls |
|---|---|---|
| Enable App Installer policy | `DesktopAppInstaller/EnableAppInstaller` | Whether users can use the Windows Package Manager at all. Disabled leaves `winget` and `winget -?` runnable but blocks any other command. |
| Enable command-line interfaces policy | `DesktopAppInstaller/EnableWindowsPackageManagerCommandLineInterfaces` | Whether a user can act through the WinGet CLI or WinGet PowerShell module, independent of the App Installer policy above. |
| Enable Windows Package Manager configuration policy | `DesktopAppInstaller/EnableWindowsPackageManagerConfiguration` | The `winget configure` kill switch — whether the configuration feature discussed above can run at all. |
| Enable Microsoft Store source policy | `DesktopAppInstaller/EnableMicrosoftStoreSource` | Whether the Microsoft Store source is available to the package manager and can be removed. |
| Enable default source policy | `DesktopAppInstaller/EnableDefaultSource` | Whether the default (community) source is available and can be removed. |
| `SourceAutoUpdateInterval` | `DesktopAppInstaller/SourceAutoUpdateInterval` | The auto-update interval, in minutes, for the package index of package-based sources — expanded below. |

**Source:** [Policy CSP - DesktopAppInstaller](https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-desktopappinstaller) (updated 2025-03-12)

These six rows are a subset. The full policy reference names fifteen settings; this guide links to it
rather than transcribing all of them:
[Policy CSP - DesktopAppInstaller (Microsoft Learn)](https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-desktopappinstaller).

**`SourceAutoUpdateInterval` — the clean disqualifier.** "The default source for Windows Package
Manager is configured such that an index of the packages is cached on the local machine. The index
is downloaded when a user invokes a command, and the interval has passed (the index is not updated
in the background). This setting has no impact on REST-based sources." A mechanism whose package
index is not updated in the background, and only refreshes on interactive user action, is
structurally the wrong shape for unattended fleet-wide patch enforcement.

**Source:** [Policy CSP - DesktopAppInstaller](https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-desktopappinstaller) (updated 2025-03-12)

Private WinGet REST sources are out of scope for this guide: the `EnableAdditionalSources` and
`EnableAllowedSources` policies can point the package manager at a source Intune has no visibility
into. Detection or compliance scripting against these policies reads the registry key
`Software\Policies\Microsoft\Windows\AppInstaller`.

Two of the policies Microsoft's own Store-app deployment article recommends enabling — **Enable App
Installer Microsoft Store Source policy** and **Enable App Installer policy** — are not in the settings
catalog: both carry the Intune-column value "Not built in; use a custom configuration profile." An
administrator hardening Windows through the settings catalog, without also reaching for a custom
OMA-URI configuration profile, can silently degrade a supported Intune app type using a lever Intune
does not surface in its normal policy UI. This is the trap this section exists to document.

**Source:** [Add Microsoft Store apps to Microsoft Intune](https://learn.microsoft.com/en-us/intune/app-management/deployment/add-microsoft-store) (updated 2026-06-25)

<a id="unsupported-callouts"></a>
## Unsupported and Anti-Feature Callouts

**No rollback or automatic uninstall remediation.** Auto-update apps don't provide rollback or
automatic uninstall remediation; if an update introduces a problem, an administrator resolves it
manually rather than through a supported rollback path.

**Malicious version revocation.** "If Microsoft detects a malicious app version in the Enterprise App
Catalog, Microsoft removes the app from the catalog and posts a notification in the Microsoft Intune
admin center. You're still responsible for identifying impacted devices and taking remediation
action."

**Catalog cache lag.** "Enterprise App Catalog data is cached for up to one hour, so the catalog might
show an outdated version during that window. If a version is revoked because of a security issue,
devices can remain exposed for up to one hour before the updated catalog state is reflected."

**No rollout rings or phased deployment.** Auto-update doesn't support rollout rings or deployment
plans for staged update deployment; an update reaches all Required-assigned devices without a phased
rollout mechanism.

**Reporting reflects latest state only.** The Managed Apps report reflects only the current, latest
state per device rather than a version history an administrator can review over time.

**Version changes during device processing.** A catalog app's version can change while a device is
still processing an earlier assignment, and the catalog does not hold a version steady for the
duration of that processing.

**Not supported as a blocking app in ESP or Autopilot device preparation.** An auto-update Enterprise
App Catalog app specifically cannot be added as a blocking app in the Enrollment Status Page (ESP) or
an Autopilot device preparation profile — see [Enterprise App Management](#enterprise-app-management)
for the trade-off this limitation sits alongside.

**Conflicts with other app types.** A catalog app can conflict with another app type also targeting the
same application; Microsoft names this as one of its eight documented limitations without prescribing a
resolution path.

**Source:** [Enterprise App Management](https://learn.microsoft.com/en-us/intune/app-management/deployment/enterprise-app-management) (updated 2026-06-24)

**The Microsoft Store app type publishes no update cadence.** No cadence, check interval, schedule, or
version pinning is published for Microsoft Store apps kept current by Intune — see
[Microsoft Store Apps](#microsoft-store-apps) for the absence stated in full and contrasted against
Enterprise App Management's own published objectives.

**The package manager may not be registered in a system context.** The Windows Package Manager is a
per-user-registered component: "WinGet will not be available until you have logged into Windows as a
user for the first time, triggering Microsoft Store to register the Windows Package Manager as part of
an asynchronous process." Every context in which Intune runs code with no signed-in user — Autopilot
device preparation, a Win32 app or platform script running in System context, a device-context
remediation script — is a context in which the package manager may not yet be registered and
resolvable. Microsoft's own administrator-considerations section for the package manager covers only
elevation and User Account Control; it says nothing about system context, service context, or
unattended execution, which this guide records as a documented silence rather than filling the gap.

**Source:** [Windows Package Manager (winget)](https://learn.microsoft.com/en-us/windows/package-manager/winget/) (updated 2026-07-19)

**The settings-catalog gap.** See [Controlling WinGet on Managed Devices](#controlling-winget): two
policies Microsoft itself recommends enabling for Microsoft Store apps are not exposed in the Intune
settings catalog and require a custom configuration profile instead.

**Community automation and third-party patch-management products are out of scope for this guide.**
Community scripts that wrap the package manager for unattended use, and third-party enterprise
patch-management products that also wrap it, both sit outside this guide's Intune-native scope; this
guide names neither category by product name.

## Related Resources

- [Patch Management Overview](00-overview.md) — Cross-platform comparison and Ring Terminology hub
- [Windows Autopatch](07-windows-autopatch.md) — Autopatch enrollment, the Test/Last group model, and
  the Microsoft 365 Apps channel this guide's channels section conditions against
- [App Lifecycle Overview](../app-lifecycle/00-overview.md) — Cross-platform app lifecycle terminology
  and the object-model view of applications
- [Windows Win32 / MSIX at Scale](../app-lifecycle/01-windows-win32-msix-scale.md) — Win32 supersedence
  chains, dependency graphs, and ContentPrepTool packaging
- [Win32 App Packaging Reference](../../reference/win32-app-packaging.md) — Detection rules and ESP
  blocking-app configuration for Win32 apps
- [ESP Policy Configuration](../../admin-setup-apv1/03-esp-policy.md) — Enrollment Status Page settings
  and the blocking app list

## External References

- [Overview of update channels for Microsoft 365 Apps (Microsoft Learn)](https://learn.microsoft.com/en-us/microsoft-365-apps/updates/overview-update-channels)
- [Microsoft 365 Apps: SAEC and MEC unification (Microsoft Learn)](https://learn.microsoft.com/en-us/microsoft-365-apps/updates/unified-update-channels)
- [Set the Microsoft 365 apps update channel using the settings catalog in Microsoft Intune (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/update-office)
- [Change the update channel with Microsoft Intune Administrative Templates (Microsoft Learn)](https://learn.microsoft.com/en-us/microsoft-365-apps/updates/change-update-channels)
- [Enterprise App Management (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/app-management/deployment/enterprise-app-management)
- [Add Microsoft Store apps to Microsoft Intune (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/app-management/deployment/add-microsoft-store)
- [Policy CSP - DesktopAppInstaller (Microsoft Learn)](https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-desktopappinstaller)
- [Windows Package Manager (winget) (Microsoft Learn)](https://learn.microsoft.com/en-us/windows/package-manager/winget/)
- [WinGet Configuration (Microsoft Learn)](https://learn.microsoft.com/en-us/windows/package-manager/configuration/)
