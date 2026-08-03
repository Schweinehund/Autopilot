---
doc_id: RE-225
status: Draft
owner: Intune Admin Lead
doc_type: Guide
platform: Android
last_verified: 2026-08-03
review_by: 2026-11-01
applies_to: Android Enterprise Dedicated multi-app kiosk (Managed Home Screen curated app allow-list, delivered by an Intune App Configuration policy assigned to com.microsoft.launcher.enterprise)
audience: admin
---

**Platform:** Android · **Doc Type:** Guide · **Doc ID:** RE-225 · **Status:** Draft

# Android Dedicated Multi-App Kiosk: Managed Home Screen Provisioning

## Summary

Following this recipe yields an Android Enterprise Dedicated device locked to a curated Managed Home Screen (MHS) multi-app kiosk — a bounded allow-list of apps on a fixed home-screen grid, delivered by an Intune App Configuration policy assigned to the Managed Home Screen app (`com.microsoft.launcher.enterprise`). It covers Android 8.0 and later on devices already enrolled with a Standard Corporate-owned dedicated device token, and requires the Intune Administrator role to assign the Managed Home Screen app as Required and to author and assign the MHS App Configuration policy carrying the worked JSON payload.

> **Scope:** Covers the Android Enterprise **Dedicated** multi-app kiosk scenario — a curated Managed Home Screen (MHS) app grid on a device with no per-user identity by default.

> See [Android dedicated device disambiguation](../_glossary-android.md#dedicated).

> This is distinct from single-app Lock Task Mode, digital signage, and Entra shared device mode — all four scenarios share one enrollment surface but diverge in locking style and identity model.

> Assumes the device is already enrolled as Dedicated with a Standard token, and that every allow-listed app already exists as an Intune app.

> Also assumes the static Entra device group naming the fleet already exists.

## Prerequisites

- **This recipe is NOT:** Entra shared device mode ([per-user Entra sign-in and sign-out on a shared device](../_glossary-android.md#entra-shared-device-mode) — a different enrollment token type), single-app kiosk / Lock Task Mode (one app pinned via Android's OS-level lock rather than a curated MHS grid — see [Scenarios](../admin-setup-android/05-dedicated-devices.md#scenarios)), digital signage / screensaver mode (unattended-display use, deferred — see [Scenarios](../admin-setup-android/05-dedicated-devices.md#scenarios)), or Windows multi-app kiosk (a different platform's restricted-user-experience recipe).
- **Managed Google Play binding complete** — see [Managed Google Play binding](../admin-setup-android/01-managed-google-play.md#bind-mgp). This recipe does not re-bind it.
- **A static Entra device group** already exists and is the single target for both the Managed Home Screen app assignment ([Step 2](#step-2-deploy-managed-home-screen-as-a-required-app)) and the App Configuration policy assignment ([Step 5](#step-5-author-and-assign-the-app-configuration-policy)) — see [Enrollment profile — Delta 2](../admin-setup-android/05-dedicated-devices.md#enrollment-profile).
- **A device already enrolled as Dedicated with a Standard token.** This recipe starts post-enrollment; enrollment profile creation and token-type semantics are the anchor's own content — see [Enrollment profile](../admin-setup-android/05-dedicated-devices.md#enrollment-profile) and [Enrollment token](../admin-setup-android/05-dedicated-devices.md#enrollment-token).
- **Intune Administrator role**, or a custom RBAC role covering app assignment and app-configuration-policy authoring.

## Unsupported and Anti-Feature Callouts

| Feature | Why it's unsupported / what breaks | Do this instead |
|---|---|---|
| Setting `enable_mhs_signin = TRUE` and leaving `signin_type` at its default | `signin_type` defaults to Microsoft Entra ID, so an admin who turns sign-in on and changes nothing else lands on the Entra-ID path. The real first-party negative is scoped to account type, not to enrollment mode: users who sign in with a non-Microsoft Entra ID account don't get single sign-on to apps integrated with Microsoft Entra shared device mode, but they still sign in to Managed Home Screen | Ship `enable_mhs_signin: false` as the worked value — the documented default, matching the no-per-user-identity Standard token — and route true per-worker single sign-on to Entra shared device mode |
| Exposing system navigation (the Home and Overview buttons, or the status bar) for a friendlier feel | If Device Restrictions' Enabled System Navigation Features includes Home and Overview, or System notifications and information is shown, end users can skip the Managed Home Screen sign-in screen and the session-PIN screen entirely — bypassing the sign-in gate this recipe configures | Keep system navigation fully restricted, the default Dedicated posture, whenever sign-in or session-PIN protection is meant to be enforced |
| Setting Device Restrictions' Notification windows to Disable as a blanket hardening move | Notification windows breaks screensaver, virtual home button, or automatic sign-out if you later enable any of them — none of which is set by this recipe, so zero dependents exist among the settings this recipe sets today, but the dependency is silent and worth naming before it surfaces later | Leave Notification windows enabled once screensaver, virtual home button, or automatic sign-out is configured; document the dependency rather than discovering it after the fact |
| Expecting per-signed-in-identity personalization (different app sets per user) on this Standard-token, sign-in-disabled device | There is no distinguishing identity at the device layer when `enable_mhs_signin` is FALSE — every user of the device sees the identical shared configuration | If per-role differentiation is required, route to Entra shared device mode — a routing signal, not a worked path in this recipe |
| Assuming end users can toggle Wi-Fi on and off from the MHS settings menu | Users can switch between already-visible networks but cannot enable or disable the Wi-Fi radio itself | Manage Wi-Fi radio state via device policy, not end-user MHS interaction |
| Assuming end users can initiate a first-time connection to an Intune-preconfigured Enterprise Wi-Fi network from inside MHS | The device can use a preconfigured Enterprise network automatically, but end users cannot manually initiate that connection from within MHS itself | Preconfigure the Enterprise network and let the device connect automatically; do not rely on end-user-initiated connection from MHS |
| Expecting end users to reorder, rename, or move folders or apps on the Managed Home Screen | `lock_home_screen` defaults to TRUE, and end users can't move folders, rename the folders, or move the apps within the folders | If reordering is required, set it at the admin/policy layer via `managed_folders`, not through end-user drag-and-drop |
| Configuring Zero-Touch and [Knox Mobile Enrollment (KME)](../admin-setup-android/05-dedicated-devices.md#provisioning-method-choice) simultaneously on Samsung hardware | A CRITICAL-severity mutual exclusion documented in the anchor — configuring both causes out-of-sync enrollment state on Samsung hardware | Pick one provisioning method per Samsung device — see [Provisioning method choice](../admin-setup-android/05-dedicated-devices.md#provisioning-method-choice) |
| Treating digital signage or single-app kiosk guidance as applicable to this recipe | Out of this recipe's scope by design — multi-app only. Digital signage and single-app kiosk use different locking mechanisms (screensaver mode; Lock Task Mode without MHS, respectively) | See [Scenarios](../admin-setup-android/05-dedicated-devices.md#scenarios) — cross-link, don't re-author |
