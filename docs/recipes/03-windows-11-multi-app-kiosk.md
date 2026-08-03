---
doc_id: RE-224
status: Approved
owner: Intune Admin Lead
doc_type: Guide
platform: Windows
last_verified: 2026-07-30
review_by: 2026-10-28
applies_to: Windows 11 multi-app kiosk (restricted user experience via the AssignedAccess CSP Configuration node, delivered by an Intune custom OMA-URI profile)
audience: admin
---

**Platform:** Windows · **Doc Type:** Guide · **Doc ID:** RE-224 · **Status:** Approved

# Windows 11 Multi-App Kiosk: Assigned Access Provisioning

## Summary

Following this recipe yields a Windows 11 device locked to a restricted user experience — a bounded, multi-app allow-list and Start layout — delivered through the AssignedAccess CSP `Configuration` node via an Intune custom OMA-URI profile, with no Templates GUI path available. It covers Windows 11 22H2 or later on Pro, Enterprise, Education, or IoT Enterprise editions and requires the Intune Administrator role to author the configuration profile and assign it to a device group.

> **Scope:** Covers the Windows 11 **restricted user experience** — a defined list of apps behind a tailored Start menu and Taskbar.

> The single-app case, which Microsoft names a **kiosk experience**, is a different profile type and is not worked here.

> Assumes the device is already Autopilot-registered, that every allow-listed app already exists as an Intune app, and that the Entra group naming the kiosk users already exists.

## Prerequisites

- **This recipe is NOT:** the single-app kiosk experience (one UWP app or Microsoft Edge running full-screen — see the anti-feature table below), Shell Launcher (a shell replacement, and not supported on Pro), Shared PC mode, or Entra "Shared device mode" (SDM/Global Sign-Out is iOS/Android-only).
- **RBAC:** Intune Administrator role, or an equivalent custom role covering device configuration profiles, app assignment, and enrollment configuration.
- **Windows edition:** Pro, Enterprise / Enterprise LTSC, Education, or IoT Enterprise / IoT Enterprise LTSC. Microsoft publishes one undifferentiated edition list for Assigned Access, so the floors are identical for both single-app and multi-app Assigned Access. Pro Education is assumed same as Pro, unconfirmed by name.
- **Windows 11 22H2 or later** — this recipe's worked Start layout uses `v5:StartPins`, which requires 22H2 or later. Whether a 21H2 device can obtain an equivalent multi-app Start layout through the 2017 or `v4` namespace is not documented, so do not assume that dropping `v5:StartPins` buys 21H2 support.
- **TPM 2.0 with device attestation support** — the sole self-deploying authentication mechanism; see [Self-Deploying Mode Configuration](../admin-setup-apv1/08-self-deploying.md).
- **Physical hardware, not a virtual machine.** A self-deploying deployment attempted on a device without TPM 2.0 support, or on a virtual machine, fails while verifying the device with an `0x800705B4` timeout error, and that limitation includes Hyper-V virtual TPMs. Separately, the touch keyboard is not triggered on virtual machines, so pilot a kiosk on a physical device.
- **Wired Ethernet at the deployment location** is the zero-touch precondition: with Ethernet no user interaction is required at OOBE, while Wi-Fi still works with the user selecting the language, locale, and keyboard and making a network connection — see [Self-Deploying Mode Configuration](../admin-setup-apv1/08-self-deploying.md).
- **Device-phase-only Enrollment Status Page (ESP)** policy configured — see [ESP Policy](../admin-setup-apv1/03-esp-policy.md).
- **A dynamic device group** covering the kiosk fleet — see [Dynamic Device Groups](../admin-setup-apv1/04-dynamic-groups.md).
- **An Entra group containing standard users only**, whose object ID names the kiosk population inside the configuration file.
- **Every allow-listed app already installed on the device** — device-context, Required, deployed to the device group before any kiosk account signs in. An app named in the configuration that is not deployed to the machine reports `AppNotFound` on the AssignedAccess CSP `Status` node. That is a prerequisite symptom, not a check this recipe performs: `Status` is not readable through Intune (see the anti-feature table below).

## Unsupported and Anti-Feature Callouts

| Feature | Why it's unsupported / what breaks | Do this instead |
|---------|-------------------------------------|------------------|
| Interactive Conditional Access — MFA or Terms of Use (**Entra account/group only**) | Assigned Access sign-in hard-breaks **by design** when the signing-in users are targeted by a Conditional Access policy that requires user interaction. `Microsoft-Windows-AAD/Operational` Event ID 1098 records `AADSTS50076` for MFA and `AADSTS50158` (external security challenge not satisfied) for Terms of Use | Exclude the kiosk users from interaction-requiring Conditional Access policies. With a group `Config` that exclusion is a per-member identity-security change for **every** member of the kiosk group, not a per-device setting — scope the group to kiosk use only |
| The Intune **Templates** > **Kiosk** > **Multi app kiosk** option on a Windows 11 target | Microsoft documents Intune's multi-app kiosk template for Windows 10 devices. The path **Devices** > **Manage devices** > **Configuration** > **Create** > **New policy** > **Platform: Windows 10 and later** > **Templates** > **Kiosk** > **Select a kiosk mode** > **Multi app kiosk** stays clickable against a Windows 11 device, which is what makes it a trap | Use the custom OMA-URI profile this recipe builds |
| A group `Config` that points at a kiosk profile | Configs that specify group accounts cannot use a kiosk profile, only a restricted user experience profile | Keep the restricted-user-experience profile — the `AllAppsList` profile this recipe authors |
| Nested groups named in `UserGroup` | Nested groups are not supported: if user A is a member of group A, group A is a member of group B, and group B is named in the `Config`, user A does not get the experience | Name the group that directly contains the kiosk users |
| Hardcoded AUMIDs assumed stable | A UWP app update can change the app's Application User Model ID, and Assigned Access uses the AUMID to determine which app to launch, so the allow-list entry silently stops matching. Microsoft states this in its kiosk-experience app-selection guidance; the mechanism itself is not specific to the single-app case | Read the current AUMID off a reference device with `Get-StartApps` rather than guessing a value, and re-check after app updates |
| The legacy `KioskModeApp` node left configured alongside `Configuration` | From Windows 10 version 1803 onward `KioskModeApp` becomes a no-op once `Configuration` is set — and Add, Replace and Delete on `KioskModeApp` **still return SUCCESS** to the MDM server while having no effect on the device. Get returns the configured JSON even though it is not in effect | Configure `Configuration` only, and delete any `KioskModeApp` OMA-URI row instead of trusting its SUCCESS |
| Layering Shared PC mode over the restricted user experience | Microsoft documents no interaction between the two in either direction, so nothing states what the combination produces. Treat them as mutually exclusive rather than as a documented failure mode | Pick one model per device |
| `AssignedAccess/Status` as a health-monitoring row | Not deliverable as a custom OMA-URI row: `Status` supports the **Get** operation only, and Intune requires a setting to support Add, Replace and Get | Verify on the device — the observable behaviour and event-log lines in [Verification](#verification) |
| A local autologon account instead of the Entra group (not worked here) | The tradeoff runs both ways. A least-privileged local account contains the blast radius on a public-facing device, because using an Active Directory or Microsoft Entra user might allow an attacker to gain access to domain resources reachable by any domain account. The Entra group is what makes authenticated apps work at all, which is why this recipe works that arm. Autologon also stops working under Exchange ActiveSync password restrictions, and `PreferredAadTenantDomainName` prevents automatic sign-in | If the device needs autologon into one fixed app, that is the **single-app** case, not this one — see [Step 5a: Kiosk configuration](../recipes/01-shared-windows-avd-client.md#step-5a-kiosk-configuration) |
| Expecting a Start pin for an app the signing-in user does not have | If an app is not installed for the user but is included in the Start layout, the app is not shown on the Start screen; pins for apps that are not installed on the target device do not appear until the apps are installed. **No error is surfaced either way** | Deploy every allow-listed app device-context and Required to the device group before the first kiosk sign-in, and include dependencies: if an app depends on another app, both must be in the allowed-apps list |
| Managing the generated AppLocker rules in an MMC snap-in | AppLocker rules generated by the restricted user experience cannot be managed in MMC snap-ins, and hand-authored rules can conflict with them | Change the allow-list in the configuration file rather than in AppLocker |
| Expecting a newly installed UWP app to be blocked immediately | Assigned Access does not prevent the organization or users from installing UWP apps. An app installed during an Assigned Access session is not in the deny list; it is included only after the user signs out and signs in again | Treat the deny list as sign-in-scoped and re-verify after a sign-out and sign-in cycle |

## Steps

### Step 1: Enroll the device with self-deploying Autopilot

1. Create the dynamic device group that the deployment profile, the ESP policy, the app assignments, and the kiosk configuration profile all target — see [Dynamic Device Groups](../admin-setup-apv1/04-dynamic-groups.md).
2. Create a self-deploying deployment profile assigned to that group — see [Self-Deploying Mode Configuration](../admin-setup-apv1/08-self-deploying.md).
3. Create a device-phase-only Enrollment Status Page policy assigned to the same group — see [ESP Policy](../admin-setup-apv1/03-esp-policy.md).

Self-deploying mode has no user affinity, so only the device phase of ESP runs and there is no user phase to configure.

Self-deploying enrollment and an interactive Entra sign-in are compatible, and the combination already ships in this corpus. Microsoft's first documented self-deploying outcome is that the device remains at the sign-on screen, where any member of the organization can sign in by specifying their Microsoft Entra credentials — which is the account model [Step 2](#step-2-choose-the-kiosk-account-model) works.

> **What breaks if misconfigured:** If the dynamic device group rule does not match the device, nothing in this recipe reaches it — no deployment profile, no ESP, no apps, no configuration.

### Step 2: Choose the kiosk account model

> **Ask the admin:** Which identities sign in to this kiosk — an Entra group of named users, or a local account that signs in automatically?

| Option | When to choose | Consequence if wrong | Branch |
|--------|-----------------|----------------------|--------|
| Entra group named inside the configuration file | Any allow-listed app requires user authentication, or sign-ins must be attributable to a person | Authenticated apps cannot sign anyone in, so the kiosk cannot do the job it was built for | Worked here — continue to [Step 3](#step-3-pre-install-the-allow-listed-apps) |
| Local account with automatic sign-in | The device is public-facing, needs no authenticated app, and needs no per-person attribution | Domain resources reachable by any domain account become reachable from an unattended public device | Not worked here — see the autologon row under [Unsupported and Anti-Feature Callouts](#unsupported-and-anti-feature-callouts) |

Microsoft's recommendation for planning either a kiosk or a restricted user experience is explicit: if applications require user authentication, do not use a local or generic user account, and instead target the group of users within the Assigned Access configuration file. The competing guidance to use a local, nonadministrator account is scoped to the kiosk profile — the single-app case — and not to this profile type.

> **What breaks if misconfigured:** Choosing the local autologon arm and then finding that an allow-listed app needs an authenticated user is expensive to undo.

> The account model determines the anti-feature callouts, the verification lines and the recovery path — all three have to be re-authored.

### Step 3: Pre-install the allow-listed apps

1. Add each allow-listed app to Intune.
2. Assign each one to the dynamic device group from [Step 1](#step-1-enroll-the-device-with-self-deploying-autopilot) as **Required**, in **device** context.
3. Confirm every app is installed on the device before any kiosk account signs in.

If an app has a dependency on another app, both must be included in the allowed apps list.

The first sign-in is the hazard. On a self-deploying device the kiosk identity has never signed in, so provisioned packages register for that identity only at that first sign-in. The first sign-in can therefore legitimately show an empty or partial pin set with no error surfaced anywhere: an app that is not installed for the user is not shown on the Start screen, and pins for apps that are not installed on the target device do not appear until the apps are installed. Re-check after a sign-out and sign-in before treating a thin Start menu as a failure.

The Enrollment Status Page tracks apps, not the custom OMA-URI profile, so nothing this recipe controls guarantees whether the configuration or the apps land first.

> **What breaks if misconfigured:** An app assigned Available instead of Required, or to a user group instead of the device group, is absent at the first kiosk sign-in.

> Its Start pin then never appears, and nothing reports an error.

### Step 4: Separate policy-delivery scope from effective-configuration scope

Two different scopes decide whether a kiosk works, and they are set in two different places:

- **Policy-delivery scope** is the Intune assignment — the device group that receives the custom profile in [Step 6](#step-6-deliver-the-configuration-through-a-custom-oma-uri-profile).
- **Effective-configuration scope** is the account or group named inside the XML, in `Configs` > `Config` > `UserGroup`, authored in [Step 5](#step-5-author-the-assignedaccessconfiguration-xml).

A device can receive the policy successfully and still show no restricted experience at all, because the identity signing in is not named inside the configuration.

Fill `UserGroup/@Name` with the group's **object ID**, not its display name. Find it on the group's overview page: sign in to the Microsoft Entra admin center and browse to **Identity** > **Groups** > **All groups**.

Apply the restricted user experience to **standard users only** — it is not supported to associate an admin user with an Assigned Access profile. This hazard turns on who is named inside the `Config`, not on how the device enrolled, so a group holding Global Administrators or Entra Joined Device Local Administrator role holders re-creates it on a self-deploying device just the same.

The account-availability requirement Microsoft documents for individual `Account` entries is scoped by its own following sentence to local accounts. It is the local-arm contrast, not a precondition of the group path worked here.

> **What breaks if misconfigured:** The kiosk device must have internet connectivity when users that belong to the group sign in.

### Step 5: Author the AssignedAccessConfiguration XML

Author the configuration file locally, in an editor, before touching Intune. The payload below is complete and working except for exactly three values you must replace: the LOB app's AUMID (in both the allow-list entry and its Start pin — the same value in both places), the Entra group's object ID, and the profile GUID (one value, in both `Profile Id` and `DefaultProfile Id`).

Two encoded facts are easy to get wrong. The schema orders a profile's children, so `Taskbar` must follow `v5:StartPins`. And the enclosing braces on the GUID are part of the schema-required pattern, so an unbraced GUID is silently schema-invalid.

1. Generate the profile GUID once with `New-Guid`.
2. Read each UWP app's AUMID off a reference device with `Get-StartApps`.
3. Copy the Entra group's object ID from **Identity** > **Groups** > **All groups** in the Microsoft Entra admin center.
4. Paste this payload into a file, substitute those three values, and save it as `kiosk.xml`:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<AssignedAccessConfiguration
    xmlns="http://schemas.microsoft.com/AssignedAccess/2017/config"
    xmlns:v5="http://schemas.microsoft.com/AssignedAccess/2022/config">
  <Profiles>
    <Profile Id="{9A2A490F-10F6-4764-974A-43B19E722C23}" Name="Frontline kiosk">
      <AllAppsList>
        <AllowedApps>
          <App AppUserModelId="Microsoft.WindowsCalculator_8wekyb3d8bbwe!App" />
          <App DesktopAppPath="%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" />
          <App AppUserModelId="[YOUR-LOB-APP-AUMID]" />
        </AllowedApps>
      </AllAppsList>
      <v5:StartPins><![CDATA[{
        "pinnedList":[
          {"packagedAppId":"Microsoft.WindowsCalculator_8wekyb3d8bbwe!App"},
          {"desktopAppLink":"%ALLUSERSPROFILE%\\Microsoft\\Windows\\Start Menu\\Programs\\Microsoft Edge.lnk"},
          {"packagedAppId":"[YOUR-LOB-APP-AUMID]"}
        ]
      }]]></v5:StartPins>
      <Taskbar ShowTaskbar="true" />
    </Profile>
  </Profiles>
  <Configs>
    <Config>
      <UserGroup Type="AzureActiveDirectoryGroup" Name="[YOUR-ENTRA-GROUP-OBJECT-ID]" />
      <DefaultProfile Id="{9A2A490F-10F6-4764-974A-43B19E722C23}" />
    </Config>
  </Configs>
</AssignedAccessConfiguration>
```

**Critical values to verify before pasting into Intune:**

- **Backslashes.** They are doubled **only** inside the `v5:StartPins` JSON string, because JSON escapes a backslash; they are **single** in every XML attribute, including `App/@DesktopAppPath`. Both forms appear in the payload above, twelve lines apart. Doubling a backslash inside an XML attribute is the inversion that genuinely breaks.
- **Element spelling.** Microsoft's prose names the profile *type* `AllAppList`; the XSD element is `<AllAppsList>`, one letter longer. Both are correct in their own register, but the profile-type spelling written inside angle brackets produces a document the device cannot parse.
- **JSON key casing.** Every worked Microsoft sample uses `packagedAppId`; Microsoft's key table spells it `packagedAppID`. JSON keys are case-sensitive, so the payload uses the sample casing.
- **Desktop pins.** No published sample confirms the casing of the pin-a-desktop-app-by-AUMID key, so prefer the `.lnk`-path key `desktopAppLink` — and confirm the shortcut already exists on the device at that path.
- **`applyOnce` is omitted.** It is supported starting with Windows 11 version 24H2 with KB5062660 and is ignored on earlier versions, so at this recipe's own 22H2 floor it is a documented no-op. No statement covers whether `v5:StartPins` honours it at all, and its absence produces the reapply-at-every-login behaviour a kiosk wants. An `Export-StartLayout` JSON taken from a 24H2 device may contain the key — drop it when you lift a pinned list from an export.
- **The two declared namespaces are the only two this payload needs.** Microsoft's own samples additionally declare an XML Schema namespace and an aliased duplicate of the 2017 namespace; both are unused in the instance document, so this payload omits them rather than implying they are required.

Validating the payload against the published XSD is possible but awkward: the schemas are published as page text in five separate documents that import one another without resolvable locations, and the add-ons require an XSD 1.1 processor, so an author must assemble the schema set by hand. Two checks are genuinely executable instead. Before pasting, cast the file in PowerShell — `$x = [xml](Get-Content .\kiosk.xml -Raw)` throws on an unescaped `&`, an unclosed tag, a broken CDATA boundary, or a truncated copy-paste. After delivery, a malformed or schema-invalid payload surfaces device-side as a profile parse or apply error in the event log channel [Verification](#verification) uses.

#### Field decomposition

The table below decomposes the payload field by field. It is **not** a schema statement — the schema fixes the order, and in the fence `Taskbar` must follow `v5:StartPins`.

| # | Field | What it is | Decision-relevant semantics |
|---|---|---|---|
| 1 | `AssignedAccessConfiguration` | Document root | The whole document is the single value of the `Configuration` CSP node — one document, one profile set |
| 2 | `xmlns` (2017) | Unprefixed default namespace | Mandatory on every payload including Windows 11. Children are written bare. The alias Microsoft's table calls `default` is an XSD-internal prefix, never writable here |
| 3 | `xmlns:v5` (2022) | Add-on namespace alias | Required whenever `v5:StartPins` is present. Omitting it makes the payload unparseable |
| 4 | `Profiles` | Container | One or more `Profile`; a file may hold multiple restricted-user-experience profiles but only one kiosk profile |
| 5 | `Profile/@Id` | Braced GUID, **required** | The schema pattern requires the enclosing braces. Must match `DefaultProfile/@Id` exactly. Generate it with `New-Guid` |
| 6 | `AllAppsList` | Profile-type element | Selects the **restricted user experience**. Its presence excludes a kiosk profile in the same profile — and therefore excludes the breakout-sequence element, which lives only in that other branch |
| 7 | `AllowedApps` | Allow-list container | At least one `App`. The AppLocker rules are generated from this list, and duplicate entries are a schema violation |
| 8 | `App/@AppUserModelId` | UWP app AUMID | Use for Store, UWP and inbox apps. A UWP update can change the AUMID and silently break the entry |
| 9 | `App/@DesktopAppPath` | Full path to a desktop executable | Supports `%variableName%` environment variables. **Single** backslashes — this is XML, not JSON |
| 10 | File Explorer namespace restrictions | **Not in the worked payload** | Folder browsing is locked down by default in a restricted user experience; that node is the only way to open Downloads or removable drives back up, and it requires declaring the `rs5` namespace (and `v3` for removable drives) |
| 11 | `v5:StartPins` | Start layout for Windows 11 | Windows 11 22H2 or later. Its content is **JSON inside CDATA**, not XML. Windows 10 uses the 2017-namespace start-layout element with XML instead |
| 12 | `pinnedList` (JSON) | Array of pin objects | The set of tiles the kiosk Start menu shows. A pin whose app is not installed for the signing-in user simply does not appear — no error |
| 13 | `packagedAppId` (JSON) | UWP pin, by AUMID | **Casing:** every worked sample uses `packagedAppId` while the published key table says `packagedAppID`. JSON keys are case-sensitive — use the sample casing |
| 14 | `desktopAppLink` (JSON) | Desktop pin, by `.lnk` path | **Doubled** backslashes — this is a JSON string. The `.lnk` must already exist on the device at that path |
| 15 | `desktopAppID` (JSON) | Desktop pin, by AUMID | Alternative to `desktopAppLink` when the desktop app has an AUMID. Its casing is unconfirmed by any published sample — prefer `desktopAppLink` |
| 16 | `secondaryTile` (JSON) | Microsoft Edge pinned site | Requires adding `msedge.exe`, `msedge_proxy.exe` **and** the Edge AUMID to `AllowedApps`. Out of this recipe's field set |
| 17 | `applyOnce` (JSON) | Apply-pins-once switch | Windows 11 24H2 with KB5062660 only; ignored on earlier Windows 11. Omitted here, and absence gives the reapply-every-login behaviour a kiosk wants |
| 18 | `Taskbar` | **Mandatory** element | Minimum occurrence is one — a payload without it is schema-invalid. It must come **after** `v5:StartPins` |
| 19 | `Taskbar/@ShowTaskbar` | **Required** boolean | `false` hides the taskbar permanently, which is not the tablet-mode auto-hide behaviour. Pinning apps to the taskbar needs the v5 taskbar-layout element, out of this recipe's field set |
| 20 | `Configs` / `Config` | Profile-to-identity binding | **This is the effective-configuration scope** — separate from Intune's assignment scope |
| 21 | `UserGroup/@Type` | `LocalGroup`, `ActiveDirectoryGroup` or `AzureActiveDirectoryGroup` | A `UserGroup` `Config` can only reference a restricted-user-experience profile, never a kiosk profile. Nested groups are not supported |
| 22 | `UserGroup/@Name` | Group identifier | For `AzureActiveDirectoryGroup` this is the **object ID**, not the display name. The device needs internet connectivity when a member of the group signs in |

In short: `AllAppsList` decides what may run, `v5:StartPins` decides what the user sees, `Taskbar` is mandatory and must come last, and `Configs` decides who gets the experience — a separate question from which devices receive the policy.

#### Namespaces and version floors

| Namespace (year) | Alias / prefix | Version floor | What it adds |
|---|---|---|---|
| 2017 (root) | none — the unprefixed default `xmlns` | Windows 10 1709+ and Windows 11 baseline | Profile skeleton, the `AllAppList` profile type, `AllowedApps`, `Taskbar`, `StartLayout` |
| 2021 | `v4:` | Windows 11 21H2+ | `ClassicAppPath`, `ClassicAppArguments` |
| 2022 | `v5:` | Windows 11 22H2+ | `StartPins`, `TaskbarLayout` |

Four things about that table:

- The first column is labelled by namespace **year**, not by Windows build. Microsoft's published version table labels its rows by Windows version, which invites a Windows 11 admin to read the 2017 row as a droppable "Windows 10" row. It is not droppable: the 2017 namespace is the unprefixed root, written bare on every child element, and it is mandatory on every payload including Windows 11. The alias cell Microsoft fills with the word `default` on that row is an XSD-internal XPath prefix, and an instance document never writes it.
- Microsoft's published table binds the alias `v5` to two different namespaces — the 2022 one and a Windows 10 one. That is a defect in the published table; the 2022 namespace is the one Windows 11 22H2 needs.
- The Windows-10 start-layout element lives in the 2017 root namespace, not in `v4:`.
- What happens when a `v5:` element reaches a device below its floor is not documented on any Microsoft page. Do not infer a specific failure from that silence, and do not assume that removing `v5:StartPins` earns 21H2 support.

> **What breaks if misconfigured:** An unbraced `Profile Id`, a missing `Taskbar`, or a `Taskbar` placed before `v5:StartPins` each make the payload schema-invalid.

> The device rejects an invalid payload rather than partially applying it, so no restricted experience ever appears.

### Step 6: Deliver the configuration through a custom OMA-URI profile

There is no Templates path for this on Windows 11. Microsoft documents Intune's multi-app kiosk template for Windows 10 devices and routes Windows 11 readers to the AssignedAccess CSP article family; the mechanism gate is already discharged for this work and is re-confirmed here, not re-argued. The option is unavailable through Settings on the device as well.

1. Sign in to the Microsoft Intune admin center.
2. Select **Devices** > **Manage devices** > **Configuration** (the Configuration blade under Devices) > **Create** > **New policy**.
3. Set **Platform** to **Windows 10 and later** and **Profile type** to **Custom** — or select **Templates** > **Custom**.
4. Select **Create**.
5. In **Basics**, enter a **Name** and a **Description**.
6. Select **Next**.
7. In **Configuration settings**, add one OMA-URI row using the field values in the table below.
8. Select **Next**.
9. In **Scope tags**, add scope tags if you use them, then select **Next**.
10. In **Assignments**, select the **device** group from [Step 1](#step-1-enroll-the-device-with-self-deploying-autopilot), then select **Next**.
11. In **Review + create**, review the settings and select **Create** — the profile is saved and assigned.

| Field | Value |
|---|---|
| Name | A unique name for the OMA-URI setting, for example `Assigned Access restricted user experience` |
| OMA-URI | `./Vendor/MSFT/AssignedAccess/Configuration` — the OMA-URI field is case-sensitive |
| Data type | `String`, with the payload pasted as text. **MEDIUM confidence:** no first-party sentence states which Intune data type this node takes. The CSP node's format is `chr` (string), and Microsoft documents `String` for another CSP node whose value is likewise the content of an XML file. `String (XML file)` is the upload-a-file variant and the plausible wrong pick, though nothing states it is unsupported |
| Value | The complete contents of `kiosk.xml` from [Step 5](#step-5-author-the-assignedaccessconfiguration-xml) |

Assign the profile to a **device** group. `Configuration` is a device-scope node, and Microsoft's AssignedAccess instruction is to assign the policy to a group whose members are the devices you want to configure — which governs over the generic custom-profile page's "users or groups" wording. That tension is [Step 4](#step-4-separate-policy-delivery-scope-from-effective-configuration-scope)'s two-scope distinction in its most concrete form.

> **What breaks if misconfigured:** For settings created with a string, base64 or XML data type, the stored value is obscured once saved.

> An admin without the **Device configurations** Create, Read and Update permissions, or the Intune Administrator role, cannot read the XML back out of the portal.

> Keep the authored file in source control — the portal is not a reliable copy of it.

## Verification

**Admin at the console, before the first kiosk sign-in:**

- [ ] The `AssignedAccess > Operational` channel is enabled — in Event Viewer open **Applications and Services Logs** > **Microsoft** > **Windows** > **AssignedAccess** > **Operational**, right-click **Operational**, and select **Enable Log**. It is disabled by default, so do this before the first kiosk sign-in: for some failures events are captured only once, and logging enabled after an issue occurs may not capture them.
- [ ] The profile arrived on the device: the key `HKLM\Software\Microsoft\Windows\AssignedAccessCsp` is present. This is device-scope and readable without the kiosk account signing in, which is what separates *the policy never arrived* from *the policy arrived but the signing-in identity is not in the configuration's scope*.

**During and after the kiosk account's first sign-in:**

- [ ] The kiosk account signs in and lands in the restricted Start menu, showing only allow-listed apps. An empty or partial pin set on the very first sign-in is the [Step 3](#step-3-pre-install-the-allow-listed-apps) timing hazard, not necessarily a failure — sign out, sign back in, and re-check before treating it as one.
- [ ] A non-allow-listed app fails to launch, which confirms the generated AppLocker rules are in force.
- [ ] A representative allow-listed app's **secondary** flow completes without an app-blocked error — a file picker, a print dialog, or an OAuth redirect.
- [ ] Blocked keyboard shortcuts are blocked: `Ctrl + Shift + Esc` (Task Manager), `WIN + R` (Run), `WIN + E` (File Explorer) and `WIN + I` (Settings) all do nothing.
- [ ] The `AssignedAccess > Operational` event log is clean — meaning no profile parse error and no profile apply error for the kiosk identity, which is what the channel records when the payload is malformed or schema-invalid.
- [ ] Check `Microsoft-Windows-AssignedAccess/Admin` for **Event ID 31000** ("Unspecified error applying assigned access for current user, signing out") and confirm it is absent.
- [ ] **Entra account/group only:** check `Microsoft-Windows-AAD/Operational` for **Event ID 1098** carrying `AADSTS50076` (MFA) or `AADSTS50158` (Terms of Use) and confirm both are absent. Interactive Conditional Access — MFA *or* Terms of Use — hard-breaks this sign-in by design. This check has no referent on the local autologon arm.

The Assigned Access configuration takes effect the next time the targeted user signs in. If that account is already signed in when the configuration applies, sign out and sign back in before validating.

## Rollback/Recovery

Removing the Assigned Access configuration is not the same as returning the device to its prior state.

**Exiting a running session (temporary):**

- Alt+F4, Alt+Tab, Alt+Shift+Tab and Ctrl+Alt+Del are not blocked for a restricted-user-experience account. Ctrl+Alt+Del is the documented way to exit the kiosk experience, and deploying the profile automatically applies the `Ctrl+Alt+Del Options` policies `Remove Logoff`, `Remove Task Manager` and `Remove Change Password`, which strip those affordances. Those three are consequences of the profile, not steps an admin performs.
- Ctrl+Alt+Del exits the **running session only**. The kiosk relaunches when the Assigned Access account signs in again, or after the sign-in-screen time-out elapses.
- On the multi-app kiosk page Microsoft documents a 30-second sign-in-screen time-out after which the kiosk relaunches, adjustable by adding `IdleTimeOut` (DWORD, milliseconds in hexadecimal) under `HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Authentication\LogonUI`. `IdleTimeOut` does not apply to the Microsoft Edge kiosk mode.

**Removing the configuration (permanent):**

- Unassign or delete the Intune policy that carries the configuration. The device needs network connectivity to receive that change, so an offline kiosk stays locked down until it checks in.
- Removal is channel-scoped: unassign the policy where Intune delivered it; uninstall the provisioning package where a package delivered it.
- **Removal is not rollback.** Deleting the Assigned Access configuration removes the policy settings associated with the users, but it cannot revert all the changes — in a multi-app kiosk scenario the Start menu configuration is maintained.
- Self-service removal through **Settings** is not available once a restricted user experience is configured.

**Reimaging and re-enrollment:**

- Autopilot Reset retains provisioning packages and MDM enrollment and re-applies the lockdown, so unassign the policy before resetting rather than after.
- A device cannot automatically re-enroll through Windows Autopilot after an initial deployment with self-deploying mode. Delete the device record instead, in the Microsoft Intune admin center under **Devices** > **All devices** > select the device > **Delete**.

**Two separate account-model facts, not a recovery ranking:**

- The autologon account is a local standard user that Assigned Access creates and manages.
- An Entra-group `Config` requires the device to have internet connectivity when a member of the group signs in.
- Nothing first-party states which arm recovers more easily. Treat the two facts above as separate; the comparison between them is `[ASSUMED]`.

**One device-scope side effect worth knowing before you deploy:**

- Deploying this profile applies device-level policy settings to every user of the device, administrator accounts included — not only to the kiosk identity.

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| Backslashes doubled inside an XML attribute such as `App/@DesktopAppPath` | The path never resolves, so the app is effectively not allow-listed even though the payload looks right | [Step 5](#step-5-author-the-assignedaccessconfiguration-xml) |
| The `AssignedAccess > Operational` channel left disabled, then read as clean | An empty channel reads as a pass and hides the real parse or apply error — a guaranteed false pass | [Verification](#verification) |
| `UserGroup/@Name` filled with the group's display name instead of its object ID | Intune reports the policy applied and no restricted experience ever appears on the device | [Step 4](#step-4-separate-policy-delivery-scope-from-effective-configuration-scope) |
| Apps assigned Available, or to a user group, or simply not installed before the first kiosk sign-in | The Start menu is partial or empty at first sign-in and nothing surfaces an error | [Step 3](#step-3-pre-install-the-allow-listed-apps) |
| `Profile Id` or `DefaultProfile Id` written without the enclosing braces, or the two values differing | Silently schema-invalid; the device rejects the payload rather than partially applying it | [Step 5](#step-5-author-the-assignedaccessconfiguration-xml) |
| Reading "policy applied" in Intune as "the kiosk is configured" | Delivery succeeded while the signing-in identity sits outside the configuration's own scope | [Step 4](#step-4-separate-policy-delivery-scope-from-effective-configuration-scope) |
| The named Entra group contains administrative principals | Associating an admin user with an Assigned Access profile is not supported, and self-deploying enrollment does not prevent it | [Step 4](#step-4-separate-policy-delivery-scope-from-effective-configuration-scope) |
| Start layout not as expected | Check whether the apps in the Start layout are installed for the assigned-access user, and whether the `.lnk` that a desktop pin points at exists on the device | [Step 3](#step-3-pre-install-the-allow-listed-apps) |
| The **Templates** > **Kiosk** > **Multi app kiosk** profile used against a Windows 11 device | Documented for Windows 10 devices; the option is reachable but there is no supported Windows 11 multi-app path there | [Step 6](#step-6-deliver-the-configuration-through-a-custom-oma-uri-profile) |

## See Also

- [Admin Decision-Point Block Format (STD-05)](../_standards/EEE-SOP-standard.md) — the full spec this recipe's decision block instantiates
- [Self-Deploying Mode Configuration](../admin-setup-apv1/08-self-deploying.md) — full self-deploying field reference, TPM 2.0, and network prerequisites
- [ESP Policy](../admin-setup-apv1/03-esp-policy.md) — device-phase-only Enrollment Status Page configuration
- [Dynamic Device Groups](../admin-setup-apv1/04-dynamic-groups.md) — the membership-rule syntax for the kiosk device group
- [APv1 vs APv2](../apv1-vs-apv2.md) — framework selection reference
- [Step 5a: Kiosk configuration](../recipes/01-shared-windows-avd-client.md#step-5a-kiosk-configuration) — the single-app case, which this recipe does not work
