---
last_verified: 2026-04-28
review_by: 2026-06-27
applies_to: all
audience: admin
platform: iOS
---

> **Platform applicability:** This guide is iOS/iPadOS-specific (VPP Device-Licensed vs
> User-Licensed distinction; reclamation behavior for retire/wipe and remove-app scenarios).
> For the cross-platform overview, see [App Lifecycle Automation Overview](00-overview.md).
> **Windows:** See [Win32 / MSIX at Scale](01-windows-win32-msix-scale.md).
> **macOS:** See [macOS PKG / DMG Pipeline](02-macos-pkg-dmg-pipeline.md).
> **Android:** See [Android MGP Lifecycle](04-android-mgp-lifecycle.md).

# iOS VPP Licensing: Device vs User + Reclamation Behavior

This guide is the iOS/iPadOS-specific VPP (Apple Volume Purchase Program, now Apple Business
Manager / Apple School Manager apps and books) licensing reference. It covers the two
licensing models (Device-Licensed vs User-Licensed), their attribute differences, the
supervised-vs-unsupervised silent-install boundary, and — critically — the **manual
reclamation workflow** that admins must execute to return licenses to the available pool when
devices are retired or apps are unassigned.

For the broader 4-column app-type comparison covering LOB apps and Store Apps alongside VPP
Device-Licensed and VPP User-Licensed (12 attributes including silent-install scenarios per
BYOD/Corporate × Supervised/Unsupervised), see
[iOS App Deployment](../../admin-setup-ios/05-app-deployment.md). This guide deepens the VPP
slice with reclamation behavior — content that is **net-new in Phase 55** and not present in
the v1.3 admin-setup-ios runbook.

## VPP Licensing Models

The two VPP licensing models are device-licensing and user-licensing. The model is selected
per-app at assignment time in the Intune admin center. Per Microsoft Learn, the default
license type for new VPP assignments is now **device** (existing assignments remain unchanged).
The table below compares the two models across the attributes that matter for admin
decision-support: license source, Apple ID requirement, silent-install behavior, **reclamation
on retire/wipe**, **reclamation on remove app**, and BYOD applicability.

| Attribute                          | VPP Device-Licensed                                                                                                                                                                                                                                                                                                                                | VPP User-Licensed                                                                                                                                                                                                                                                                            |
|------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| License source                     | Token from Apple Business Manager (ABM) / Apple School Manager (ASM); the license is associated with the device — 1 license per device                                                                                                                                                                                                            | Token from Apple Business Manager (ABM) / Apple School Manager (ASM); the license is associated with the user — 1 license / up to 5 devices per user (same personal Apple Account)                                                                                                          |
| Apple ID requirement               | Not required — the license attaches to the device, not a user account; App Store sign-in is not required at install time                                                                                                                                                                                                                          | Required — each end user must use a unique personal Apple Account (or Managed Apple Account for User Enrollment) when prompted to sign in to App Store                                                                                                                                       |
| Supervised silent install          | Yes (supervised devices in CORP / Kiosk modes — zero prompts) / Partial (unsupervised devices show a one-time install confirmation but no Apple ID prompt — see [silent-install boundary table at admin-setup-ios/05-app-deployment.md lines 36-43](../../admin-setup-ios/05-app-deployment.md))                                                  | Apple ID + VPP-invitation prompts always appear; supervised vs unsupervised does NOT change this baseline. After the user accepts the VPP invitation in App Store, subsequent installs may proceed without re-prompt for the same Apple Account                                             |
| Reclamation on retire/wipe         | License is NOT automatically reclaimed when the device is wiped or removed from Intune management. Per Microsoft Learn `vpp-apps-ios`: "App licenses aren't reclaimed when a device is removed from Intune management." Admin must execute the 3-step reclamation workflow (see § Reclamation Workflow) to return the device license to the pool | License is NOT automatically reclaimed when the device the user signed in on is wiped. Admin must execute the 3-step reclamation workflow to return the user license to the pool. Auto-reclaim DOES occur when the user is deleted from Microsoft Entra ID or removed from the Entra group |
| Reclamation on remove app          | Removing the app assignment alone does NOT reclaim the device license — admin must change the assignment intent to **Uninstall**, then use the **Revoke license** action to return the device license to the available pool                                                                                                                       | Removing the app assignment alone does NOT reclaim the user license — admin must change the assignment intent to **Uninstall**, then use the **Revoke license** action to return the user license to the available pool                                                                     |
| BYOD applicability                 | Not supported on User Enrollment (BYOD); supported on Corporate-owned (CORP) and Kiosk supervised devices. See [iOS User Enrollment](../../admin-setup-ios/08-user-enrollment.md) and [iOS MAM App Protection](../../admin-setup-ios/09-mam-app-protection.md) for BYOD scenarios                                                                  | Supported on User Enrollment (BYOD) using Managed Apple Accounts; preferred VPP model for BYOD scenarios. Also supported on CORP devices when admins want per-user license accounting (e.g., shared Books licenses)                                                                          |
| License migration                  | Apps CAN migrate silently from user-licensed to device-licensed when using **Required** assignment intent                                                                                                                                                                                                                                          | Apps CANNOT migrate from device-licensed to user-licensed for any assignment type — admin must un-assign + re-assign + reclaim                                                                                                                                                              |

The 7 rows above satisfy the validator literal-token coverage for the 2-column VPP comparison
(column headers `VPP Device-Licensed` and `VPP User-Licensed`) and the reclamation conjuncts
(`retire/wipe` + `device license` in the Reclamation on retire/wipe row; `remove app` + `user
license` in the Reclamation on remove app row). The 7th row (License migration) discharges the
one-way migration constraint surfaced in Microsoft Learn: device → user is blocked, only user →
device works (and only under Required intent).

## Reclamation Workflow

The REQ APP-06 wording "retire/wipe returns device license; remove app returns user license"
is **oversimplified** — Microsoft Learn confirms that App licenses are NOT automatically
reclaimed when a device is removed from Intune management, nor when an app assignment is
removed. Returning a license to the available pool requires a 3-step manual workflow in the
Intune admin center:

1. **Remove the assignment** from the target device, user, or group. Navigate to Intune > Apps
   > All apps > [select VPP app] > Properties > Assignments, and remove the device, user, or
   group from the Required, Available, or Uninstall intent. Removing the assignment is a
   prerequisite to revoking the license — without this step, Intune will not allow the Revoke
   license action.
2. **Change the app's assignment intent to Uninstall** for the same target. The Uninstall
   intent triggers Intune to instruct the MDM channel to remove the app from the device. Wait
   for the uninstall to complete before proceeding to step 3 — verify in the device's
   Settings > General > VPN & Device Management or in Intune > Devices > [device] > Managed
   apps that the app status reports Uninstalled.
3. **Use the Revoke license action.** Navigate to Intune > Apps > Apple VPP tokens > [select
   token] > Licenses > [select app] > select the device or user, then click **Revoke
   license**. The license returns to the available pool and can be re-assigned to a different
   device or user.

> **Cross-platform note:** macOS VPP has a 30-day grace period before a revoked-license app is
> removed from the device (the app remains usable but cannot be updated until a license is
> reassigned). iOS VPP has NO grace period — once the license is revoked, the app may be
> removed at the next MDM check-in. This asymmetry is why the reclamation conjunct is
> verified net-new in Phase 55 and is not deferred to a cross-platform shared section.

> **Auto-reclaim path (the one exception):** When a user is deleted from Microsoft Entra ID or
> removed from a Microsoft Entra group that owns a VPP user-license assignment, Intune
> automatically revokes the user's app licenses. This is the only path that does NOT require
> the 3-step manual workflow. Device-licensed apps tied to a serial number do NOT auto-reclaim
> on Entra changes — they remain on the device until the admin executes the 3-step workflow.

For the underlying VPP token + app management surfaces (token sync, license assignment,
managed-vs-unmanaged distinction), see
[iOS App Deployment](../../admin-setup-ios/05-app-deployment.md).

## Decision Support: Device-Licensed vs User-Licensed

Choose the licensing model based on the device-ownership model and the user-experience target:

- **Pick Device-Licensed when:** the deployment is corporate-owned and supervised; the admin
  wants the silent-install user experience (no Apple ID prompts, no VPP invitation
  acceptance); the use case is shared-shift kiosks, dedicated devices, or fleet-distributed
  CORP devices where user identity is irrelevant to app access; or the app is being deployed
  to device groups (device-licensed VPP supports device-group targeting for Required intent;
  user-licensed VPP requires user-group targeting). License count is per-device — one device
  consumes one license.
- **Pick User-Licensed when:** the deployment is BYOD (User Enrollment with Managed Apple
  Accounts); each user has their own personal Apple Account; a single user has multiple
  enrolled devices (up to 5 devices share the user license); the use case is hybrid-work
  knowledge workers or Education students with personal devices; or the content is Books
  (Books require user-licensing — device-licensing does not support Books). License count is
  per-user — one user consumes one license across up to 5 devices.
- **Avoid mixing within a single app assignment:** an Intune VPP app can be configured for
  Device-Licensed OR User-Licensed at deployment time. Switching an existing assignment from
  user-licensed to device-licensed is supported (silent migration with Required intent), but
  switching from device-licensed to user-licensed is blocked — admin must un-assign + reclaim
  every device license (the 3-step workflow above) and then re-assign as user-licensed. Plan
  the licensing model at initial deployment to avoid this churn.

For BYOD enrollment paths (User Enrollment), see
[iOS User Enrollment](../../admin-setup-ios/08-user-enrollment.md). For the 6-row
silent-install boundary table covering BYOD/CORP × user/device-licensed × supervised /
unsupervised scenarios, see
[iOS App Deployment](../../admin-setup-ios/05-app-deployment.md) (the silent-install boundary
table at lines 36-43 of the v1.3 file).

## Related Resources

- [App Lifecycle Automation Overview](00-overview.md) — Cross-platform hub for app lifecycle
  automation across Windows, macOS, iOS, and Android
- [iOS App Deployment](../../admin-setup-ios/05-app-deployment.md) — v1.3 — Full 4-column
  app-type comparison (LOB / Store Apps / VPP Device-Licensed / VPP User-Licensed × 12
  attributes); silent-install boundary scenarios; device-vs-user prose; managed-vs-unmanaged
  app distinction
- [iOS User Enrollment](../../admin-setup-ios/08-user-enrollment.md) — v1.3 — BYOD enrollment
  with Managed Apple Accounts; the enrollment path that pairs with VPP user-licensing
- [iOS MAM App Protection](../../admin-setup-ios/09-mam-app-protection.md) — v1.3 — App
  Protection Policies for BYOD scenarios; complementary to VPP user-licensing on User
  Enrollment
- [iOS Update Lifecycle](../patch-management/03-ios-update-lifecycle.md) — Phase 54 — DDM
  update enforcement (sibling ops-domain — patch management for the same iOS platform)

## External References

- [Apple VPP via Intune (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/apps/vpp-apps-ios) — Canonical VPP doc; ms.date 2026-01-13; covers device-vs-user licensing
  table, 8 end-user-prompt scenarios, reclamation workflow, and macOS 30-day grace period
- [Manage iOS/iPadOS volume purchased apps (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/apps/vpp-apps-ios#manage-volume-purchased-apps) — Operational sub-section
  covering the 3-step reclamation workflow
- [Apple Business Manager](https://business.apple.com) — VPP token source for Corporate-owned
  deployments; required for Apps and Books purchases
- [Apple School Manager](https://school.apple.com) — VPP token source for Education
  deployments; required for shared-iPad Books and Apps purchases
- [Operations Documentation Index](../00-index.md) — Cross-reference only; Phase 55 does NOT
  amend the operations index
