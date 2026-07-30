---
doc_id: RE-224
status: Draft
owner: Intune Admin Lead
doc_type: Guide
platform: Windows
last_verified: 2026-07-30
review_by: 2026-10-28
applies_to: Windows 11 multi-app kiosk (restricted user experience via the AssignedAccess CSP Configuration node, delivered by an Intune custom OMA-URI profile)
audience: admin
---

**Platform:** Windows · **Doc Type:** Guide · **Doc ID:** RE-224 · **Status:** Draft

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
