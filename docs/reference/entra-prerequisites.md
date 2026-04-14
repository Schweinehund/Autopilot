---
last_verified: 2026-04-13
review_by: 2026-07-12
applies_to: both
audience: admin
platform: Windows
---

> **Version gate:** This guide covers Entra ID prerequisite configuration for both APv1 and APv2. For APv1 deployment profile setup, see [APv1 Admin Setup Overview](../admin-setup-apv1/00-overview.md). For framework selection, see [APv1 vs APv2](../apv1-vs-apv2.md).

# Entra ID Prerequisite Configuration for Autopilot

Autopilot depends on Entra ID (formerly Azure AD) settings that must be configured correctly before the first device enrollment. Several settings are silently misconfigured by default in new tenants — the device joins Entra but MDM policies never apply, and no error is shown during provisioning.

## Prerequisites

- Global Administrator or Intune Administrator role
- Microsoft Intune license assigned to test user (before verifying MDM enrollment)

## Required Settings

Configure all 6 settings in the table below. Each setting includes the portal path, required value, and the specific failure that occurs if the setting is wrong.

| Setting | Portal Path | Required Value | Consequence if Missing or Wrong |
|---------|-------------|----------------|--------------------------------|
| MDM user scope | Entra ID > Mobility (MDM and MAM) > Microsoft Intune | All, or Some (with correct groups) | None = devices Entra-join but are NOT automatically enrolled in MDM. Appears as "Entra joined" in device list but no Intune policies apply. |
| Auto-enrollment | Entra ID > Mobility (MDM and MAM) > Microsoft Intune | Enabled (MDM user scope must not be None) | Without auto-enrollment, devices join Entra but don't enroll in Intune. Admin sees the device in Entra ID but not in Intune device list. |
| Device limit per user | Entra ID > Devices > Device settings > Maximum number of devices | 20 (default) or higher | If user reaches device limit, enrollment fails silently. No error shown during OOBE. Error appears in Intune enrollment logs: "Maximum number of devices per user reached." |
| Users may join devices to Entra ID | Entra ID > Devices > Device settings > Users may join devices to Azure AD | All, or Selected (include provisioning user group) | If set to None, user-driven mode fails at Entra join step. Pre-provisioning and self-deploying bypass this setting (they use device credentials, not user credentials). |
| MDM authority | Intune admin center > Tenant administration > Tenant status | Intune | Must be set to Intune before any enrollment. If set to Basic Mobility and Security (Office 365), limited management only — Autopilot profiles cannot be assigned. |
| WIP user scope | Entra ID > Mobility (MDM and MAM) > Microsoft Intune | None, or Some (must NOT overlap with MDM user scope groups) | If WIP scope groups overlap with MDM user scope groups, enrollment may apply Windows Information Protection policies instead of full MDM policies. MDM enrollment appears to succeed but device behaves unexpectedly. |

## Steps

### Step 1: Configure MDM User Scope and Auto-Enrollment

1. Navigate to **Entra ID** (portal.azure.com or entra.microsoft.com) > **Mobility (MDM and MAM)** > **Microsoft Intune**.
2. Set **MDM user scope** to **All** (recommended for Autopilot deployments) or **Some** with the group containing all Autopilot device users.

   > **What breaks if misconfigured:** MDM user scope = None means no user triggers automatic MDM enrollment after Entra join. Device joins Entra ID but receives no Intune policies. Admin sees device in Entra ID portal with no Intune management status. See: [APv1 Admin Setup Overview](../admin-setup-apv1/00-overview.md)

3. Verify **MDM terms of use URL**, **MDM discovery URL**, and **MDM compliance URL** are populated automatically (they are when Microsoft Intune is selected — do not change these values).
4. Set **WIP user scope** to **None** unless you have a specific WIP deployment. If you use WIP, ensure the WIP groups do NOT overlap with MDM user scope groups.

   > **What breaks if misconfigured:** Overlapping WIP + MDM groups cause enrollment to apply WIP policies instead of full MDM management. Device may appear enrolled but behaves as a WIP-managed (not MDM-managed) device.

5. Click **Save**.

### Step 2: Configure Device Settings

1. Navigate to **Entra ID** > **Devices** > **Device settings**.
2. Set **Users may join devices to Azure AD** to **All** or **Selected** (include the group that contains Autopilot provisioning users).

   > **What breaks if misconfigured:** None = user-driven Autopilot mode fails at Entra join. The device reaches the sign-in page but cannot complete the join. Error: "Your organization does not allow you to join this device." Pre-provisioning and self-deploying modes are NOT affected — they use device token authentication, not user join permission.

3. Set **Maximum number of devices per user** to **20** (default) or a higher value appropriate for your environment.

   > **What breaks if misconfigured:** If a user account has reached the device limit, enrollment fails silently during OOBE. The OOBE screen appears to hang or shows a generic error. Intune enrollment logs show: "The maximum number of devices has been reached for this user."

4. Click **Save**.

### Step 3: Verify MDM Authority

1. Navigate to **Intune admin center** (intune.microsoft.com) > **Tenant administration** > **Tenant status**.
2. Verify **MDM authority** shows **Microsoft Intune**.

   > **What breaks if misconfigured:** MDM authority set to Basic Mobility and Security (Office 365) means Autopilot profiles cannot be assigned and full Intune management is unavailable. Changing MDM authority on a live tenant with enrolled devices requires careful migration planning — do not change this on a production tenant without planning.

## Verification

After completing all steps, verify each setting:

- [ ] Navigate to **Entra ID > Mobility (MDM and MAM) > Microsoft Intune** — MDM user scope shows **All** or **Some** (not **None**)
- [ ] Same page — MDM discovery URL is populated (auto-set by Microsoft Intune selection)
- [ ] Navigate to **Entra ID > Devices > Device settings** — "Users may join devices to Azure AD" is **All** or **Selected**
- [ ] Same page — Maximum number of devices is sufficient (≥ 20 for most environments)
- [ ] Navigate to **Intune admin center > Tenant administration > Tenant status** — MDM authority is **Microsoft Intune**
- [ ] WIP user scope does not overlap with MDM user scope groups

## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|-----------------|---------|---------|
| MDM user scope = None | Device joins Entra but has no Intune enrollment; policies never apply | [APv1 Admin Setup Overview](../admin-setup-apv1/00-overview.md) |
| Users may join devices = None | User-driven mode fails at Entra join; error shown at sign-in | [APv1 Admin Setup Overview](../admin-setup-apv1/00-overview.md) |
| Device limit reached | Silent enrollment failure during OOBE; logs show device limit error | [APv1 Admin Setup Overview](../admin-setup-apv1/00-overview.md) |
| WIP scope overlaps MDM scope | Device appears enrolled but receives WIP policies instead of MDM policies | [APv1 Admin Setup Overview](../admin-setup-apv1/00-overview.md) |
| MDM authority = Basic Mobility | Autopilot profiles cannot be assigned; limited management only | [APv1 Admin Setup Overview](../admin-setup-apv1/00-overview.md) |

## See Also

- [APv1 Admin Setup Overview](../admin-setup-apv1/00-overview.md)
- [Licensing Requirements](licensing-matrix.md)
- [Hardware Hash Collection](../lifecycle/01-hardware-hash.md)
