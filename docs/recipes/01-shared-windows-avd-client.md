---
doc_id: RE-222
status: Draft
owner: Intune Admin Lead
doc_type: Guide
platform: Windows
last_verified: 2026-07-17
review_by: 2026-10-15
applies_to: Shared Windows AVD-client device (self-deploying, kiosk or Shared PC)
audience: admin
---

**Platform:** Windows · **Doc Type:** Guide · **Doc ID:** RE-222 · **Status:** Draft

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
- **Dynamic device group** ready to receive the self-deploying devices — see [Dynamic Device Groups](../admin-setup-apv1/04-dynamic-groups.md) for the ZTDId membership rule.
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

### Step 1: Create the self-deploying deployment profile

1. Navigate to **Intune admin center** > **Devices** > **Windows** > **Enrollment** > **Windows Autopilot** > **Deployment Profiles** > **Create profile** > **Windows PC**.
2. Set **Deployment mode**: **Self-Deploying**.
3. Set **Join type**: **Microsoft Entra joined** (hybrid join is not available for self-deploying mode).
4. Assign the profile to the dynamic device group created in [Step 3](#step-3-create-the-dynamic-device-group).

See [Self-Deploying Mode Configuration](../admin-setup-apv1/08-self-deploying.md) for the full field reference, the TPM 2.0 requirement, and network prerequisites — this recipe links rather than repeats that detail.

### Step 2: Configure the device-phase-only Enrollment Status Page

1. Navigate to **Intune admin center** > **Devices** > **Enrollment** (Windows enrollment) > **Enrollment Status Page** > **Create**.
2. Assign the policy to the same dynamic device group.

> Self-deploying mode has no user affinity, so only the device phase of ESP runs — there is no user phase to configure.

See [ESP Policy](../admin-setup-apv1/03-esp-policy.md) for the full field reference.

### Step 3: Create the dynamic device group

1. Navigate to **Azure portal** > **Microsoft Entra ID** > **Groups** > **New group**.
2. Set **Membership type**: **Dynamic Device**.
3. Add the ZTDId-based membership rule.

See [Dynamic Device Groups](../admin-setup-apv1/04-dynamic-groups.md) for the exact membership-rule syntax — do not recreate the rule here.

### Step 4: Deploy Windows App (device-context)

1. Navigate to **Intune admin center** > **Apps** > **All apps** > **Add**.
2. **App type**: **Microsoft Store app (new)** > **Select**.
3. Search for **Windows App** and select it.
4. On **Assignments**, add the dynamic device group from [Step 3](#step-3-create-the-dynamic-device-group) under **Required**.

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
