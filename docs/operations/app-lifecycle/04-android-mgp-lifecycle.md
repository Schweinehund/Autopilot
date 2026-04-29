---
last_verified: 2026-04-28
review_by: 2026-06-27
applies_to: all
audience: admin
platform: Android
---

> **Platform applicability:** This guide is Android-specific (Managed Google Play private-app
> publishing + Zebra OEMConfig APK side-load exception). For the cross-platform overview, see
> [App Lifecycle Automation Overview](00-overview.md).
> **Windows:** See [Win32 / MSIX at Scale](01-windows-win32-msix-scale.md).
> **macOS:** See [macOS PKG / DMG Pipeline](02-macos-pkg-dmg-pipeline.md).
> **iOS/iPadOS:** See [iOS VPP Licensing](03-ios-vpp-licensing.md).

# Android App Lifecycle: Managed Google Play + Zebra OEMConfig

This guide is the Android-specific app-lifecycle reference. It covers two distinct delivery
paths for Android apps in Intune: (1) **Managed Google Play (MGP) private-app publishing** for
LOB Android apps and web-clip shortcuts — the standard channel for non-Zebra Android Enterprise
fleets; and (2) **Zebra OEMConfig APK side-load** for AOSP wearable scanners (WS50, etc.) where
GMS is absent and MGP is therefore unavailable as a delivery channel.

The two delivery paths are mutually exclusive at the device level — the same device cannot
simultaneously consume an app from both channels. Filename retains the `04-android-mgp-lifecycle`
naming convention because MGP is the dominant channel for non-Zebra fleets; the OEMConfig peer
section is the load-bearing exception that admins discover via TOC scan.

For the cross-platform comparison, see
[App Lifecycle Automation Overview](00-overview.md). For the substantive Zebra OEMConfig
admin-setup content (Hardware Scope, Prerequisites, Provisioning, two-OEMConfig-app
disambiguation), see
[AOSP Zebra Wearable Scanner Enrollment](../../admin-setup-android/10-aosp-zebra.md) — Phase 45
v1.4.1 SSoT preserved at 24,518 bytes.

## Managed Google Play Private App Publishing

Managed Google Play (MGP) is the canonical app delivery channel for Android Enterprise devices
managed by Intune. For LOB (line-of-business) Android apps that should NOT be published to the
public Google Play Store, MGP supports two private-publishing paths:

### Direct APK upload to MGP private track

Intune admin center > Apps > All apps > Add > Managed Google Play app: opens an embedded MGP
iframe where admins can publish a private app by uploading an APK directly to the tenant's
private MGP track. Once published in MGP, the app appears in Intune > Apps > All apps and can
be assigned to Android Enterprise device groups (Required / Available / Uninstall intents
supported).

The direct-APK private-track path is the standard publishing surface for Android LOB apps. The
APK must be signed with a developer key, must target a recent Android API level (per Google
Play's annual minimum-target requirement), and must declare the permissions the LOB app needs.

For tenant-side MGP binding (Intune ↔ Managed Google Play account linking) see the Phase 45
admin-setup guide
[Managed Google Play (admin setup)](../../admin-setup-android/01-managed-google-play.md) —
this Phase 55 guide covers private-app *publishing* lifecycle on top of an already-bound tenant.

### MGP web app for web-clip shortcuts

A MGP "web app" is a Managed Google Play web link with a custom icon that creates a launcher
shortcut on the managed device pointing to a hosted web URL. This is the Android analog of an
iOS web clip shortcut and is used for hybrid LOB scenarios where the "app" is actually a hosted
web application accessed via the managed browser.

Web apps are published the same way as direct-APK apps (via the embedded MGP iframe) but the
publishing form prompts for a URL and an icon rather than an APK file. After publication, web
apps appear in Intune > Apps > All apps alongside APK-published apps and accept the same
Required / Available assignment intents as APK-published private apps.

### AMAPI custom-apps API change (applicable since 2024-2025)

The Android Management API (AMAPI) custom-apps surface evolved during 2024-2025: the broader
AMAPI custom-apps direction was set in **April 2024**, and the corresponding custom-apps SDK
feature appears in Google's AMAPI release notes around **August 2025**. As of 2026, Intune
integrates with AMAPI for custom-app publishing on the back-end; admins typically interact only
with the embedded MGP iframe in Intune admin center and do not need to invoke AMAPI directly.

This is a **soft historical context note** rather than a hard cutover deadline — existing
private-app publications continue to work; the AMAPI integration is a back-end implementation
detail surfaced through the same Intune admin-center UI that already existed before the AMAPI
work landed. Phrasing is intentionally softened to "applicable since 2024-2025" because the
Google AMAPI release notes show the custom-apps SDK feature first appearing in August 2025
even though the broader direction was set in April 2024.

For Microsoft Learn's current MGP / private-app publishing surface, see [Add Managed Google
Play apps to Microsoft Intune](https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-add-android-for-work).

## Zebra OEMConfig APK Side-Load (NOT via MGP) {#zebra-oemconfig}

Zebra wearable scanners (WS50, etc.) and other Zebra AOSP devices have NO GMS (Google Mobile
Services) and therefore NO Managed Google Play delivery channel. The OEMConfig profile delivery
mechanism on Zebra AOSP is **Intune APK push (APK side-load) — explicitly NOT via Managed Google
Play**. This is a load-bearing exception per the v1.4.1 Phase 45 Zebra precedent and is
preserved in v1.5: `docs/admin-setup-android/10-aosp-zebra.md` line 56 verbatim states
"OEMConfig profile delivery is via Intune APK push (NOT Managed Google Play — AOSP has no GMS,
and therefore no MGP delivery channel)."

This guide does NOT duplicate the substantive Zebra OEMConfig content — Hardware Scope,
Prerequisites, Provisioning Steps, OEMConfig APK Push, and the two-OEMConfig-app disambiguation
all live in the Phase 45 admin guide. This section provides the operational summary and the
**operate-the-lifecycle** discharge for APP-08:

- **Update** — Zebra periodically releases new OEMConfig APK versions (separate from device
  firmware via Zebra LifeGuard OTA). Re-upload the new APK in Intune > Apps > All apps > Add >
  Line-of-business app, target the same Zebra device groups, and let the Intune Management
  Extension push the updated APK side-load to managed devices. Verify post-push by checking
  the OEMConfig app version in the Intune device-app inventory.
- **Revoke** — To remove the OEMConfig app, change the assignment intent to **Uninstall** in
  Intune admin center for the target device group. The Intune Management Extension uninstalls
  the OEMConfig APK on the next check-in. Verify by checking the Intune device-app inventory
  (the OEMConfig app should no longer be listed) and by confirming on-device that the
  OEMConfig settings revert to defaults.
- **Troubleshoot** — Common failure modes: wrong-OEMConfig-app deployment (Zebra has two
  OEMConfig apps; pick the right one for the device's Android version per the disambiguation
  table at Phase 45 lines 116-119); APK push failure due to AOSP enrollment-mode mismatch (the
  device must be enrolled in AOSP corporate-owned dedicated mode); on-device settings not
  applying (verify the OEMConfig profile is assigned in Intune > Devices > Configuration
  profiles and that the device has checked in since assignment).

For substantive Zebra OEMConfig admin-setup content (Hardware Scope, Prerequisites,
Provisioning Steps, OEMConfig APK Push mechanics, two-OEMConfig-app disambiguation), see
[AOSP Zebra Wearable Scanner Enrollment](../../admin-setup-android/10-aosp-zebra.md) (Phase 45
v1.4.1 SSoT — 24,518 bytes preserved).

## Related Resources

- [App Lifecycle Automation Overview](00-overview.md) — Cross-platform hub
- [AOSP Zebra Wearable Scanner Enrollment](../../admin-setup-android/10-aosp-zebra.md) — Phase
  45 v1.4.1 — Substantive Zebra OEMConfig admin guide (Hardware Scope, Prerequisites,
  Provisioning, OEMConfig APK Push, two-OEMConfig-app disambiguation)
- [Managed Google Play (admin setup)](../../admin-setup-android/01-managed-google-play.md) —
  v1.4 — MGP tenant binding (this Phase 55 guide covers private-app *publishing* lifecycle, NOT
  MGP tenant binding; see admin-setup for binding)
- [Android Patch Delivery](../patch-management/04-android-patch-delivery.md) — Phase 54 —
  Zebra LifeGuard OTA firmware management (sibling ops-domain; OEMConfig app is delivered via
  Intune APK push but device firmware is delivered via Zebra LifeGuard)

## External References

- [Add Managed Google Play apps to Microsoft Intune (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/intune-service/apps/apps-add-android-for-work) — Canonical MGP / private-app publishing doc; ms.date November 2025
- [Managed Google Play documentation (Google)](https://developers.google.com/android/work/play) — Google's MGP / Android Management API (AMAPI) reference
- [Android Management API custom apps (Google)](https://developers.google.com/android/management/apps) — AMAPI custom-apps API surface
- [Zebra OEMConfig (Zebra)](https://techdocs.zebra.com/oemconfig/latest/about/) — Zebra's
  OEMConfig product documentation
- [Operations Documentation Index](../00-index.md) — Cross-reference only; Phase 55 does NOT amend the operations index
