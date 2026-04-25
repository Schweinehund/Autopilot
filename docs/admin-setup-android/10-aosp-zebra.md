---
last_verified: 2026-04-25
review_by: 2026-06-24
audience: admin
platform: Android
applies_to: AOSP
---

> **Platform gate:** Zebra AOSP device management — WS50 wearable scanner in Microsoft Intune. For Windows Autopilot, see [Windows Admin](../admin-setup/00-overview.md). For macOS ADE, see [macOS Admin](../admin-setup-macos/00-overview.md). For iOS/iPadOS, see [iOS Admin](../admin-setup-ios/00-overview.md).
> **Platform note:** AOSP management is a distinct surface from Android Enterprise (COBO/BYOD/Dedicated/ZTE) — no GMS, no FCM push, no Managed Google Play. See [Android enrollment overview](../android-lifecycle/00-enrollment-overview.md#aosp).

<!-- The #### In Managed Google Play subsection is intentionally omitted.
     AOSP does not use Managed Google Play (no Google Mobile Services). -->

<!-- The #### In Zero-Touch portal subsection is intentionally omitted.
     AOSP does not use the Zero-Touch portal; AOSP enrollment is QR-only, one device at a time. -->

# Configure Zebra AOSP Devices in Intune

## Scope and Status

Zebra WS50 is supported under AOSP in Intune because it has no GMS. If GMS is present on a target device, use Android Enterprise fully managed (COBO) instead — Zebra WS50 is not supported under AOSP when GMS is available. `[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-25]`

The WS50 is a wearable scanner positioned for warehouse, retail, and logistics frontline workflows — wrist-worn or clip-mounted, combining a Zebra barcode scanner head with an Android compute module so floor workers can scan-and-pick without holding a separate handheld terminal.

> ⚠️ **Android 12 NOT supported.** Zebra devices don't support Android 12 per MS Learn explicit statement. The WS50 ships on Android 11 (firmware 11-49-15.00 minimum). Plan deployments accordingly. `[HIGH: MS Learn oemconfig-zebra-android-devices, last_verified 2026-04-25]`

<a id="hardware-scope"></a>
## Hardware Scope

The Zebra WS50 is supported under AOSP because no GMS; if GMS is present, use Android Enterprise fully managed instead.

| Device | Minimum Firmware | Type | Notes |
|---|---|---|---|
| Zebra WS50 | 11-49-15.00 | Wearable Scanner | Wrist-worn or clip-mount; integrated scanner head + Android compute combo for warehouse / retail / logistics frontline workflows |

`[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-25]`

The WS50 ships on Android 11; Zebra devices skip Android 12 entirely and the next-generation Zebra Android version is Android 13+. Plan upgrades and OEMConfig-app selection (see [OEMConfig APK Push (Intune)](#oemconfig-apk-push)) accordingly. `[HIGH: MS Learn oemconfig-zebra-android-devices, last_verified 2026-04-25]`

<a id="prerequisites"></a>
## Prerequisites and Licensing

- **Microsoft Intune Plan 1 baseline.** The WS50 is a wearable scanner; MS Learn's specialty-devices page lists "AR/VR headsets, large smart-screen devices, and select conference room meeting devices" as the Plan 2 / Suite specialty-device scope. Wearable scanners are NOT explicitly named in that list, so Plan 1 is the baseline working assumption — verify per-tenant entitlement before bulk-provisioning a WS50 fleet. `[MEDIUM: MS Learn specialty-devices-with-intune scope ambiguity, last_verified 2026-04-25]`
- **License-tier escalation pathway.** If reviewer flags Zebra WS50 license tier as deployment-blocking ambiguity, escalate to user via STATE.md flag for tenant-specific Plan 1 vs Plan 2 confirmation per RESEARCH.md Open Question §3 recommendation. The MEDIUM marker above documents the ambiguity; this bullet captures the escalation trigger for execute-time disposition.
- **Microsoft Entra ID tenant** with Intune Administrator role available to the admin authoring the AOSP enrollment profile and uploading the OEMConfig APK as a line-of-business app.
- **Optional — Zebra StageNow desktop tool** for OEMConfig profile generation. StageNow's *Export to MDM* workflow emits an XML profile that Intune can ingest as an OEMConfig profile body. StageNow is OPTIONAL; simple OEMConfig configurations can be authored directly in the Intune OEMConfig profile UI without StageNow involvement. `[HIGH: techdocs.zebra.com/oemconfig, last_verified 2026-04-25]`
- **Staging Wi-Fi network on-site** (PSK or EAP per the Zebra device profile). The WS50 has interactive Wi-Fi UI per MS Learn's user-associated profile note: "Wi-Fi details are required if the device doesn't have a button or option that lets it automatically connect" — the WS50 does have such a UI, so embedding Wi-Fi credentials in the AOSP QR is OPTIONAL for WS50 (it helps zero-touch staging but is not strictly required). `[MEDIUM: MS Learn user-associated profile note, last_verified 2026-04-25]`

## Enrollment Method

QR-only AOSP enrollment, one device at a time. Wi-Fi embedding in the QR is OPTIONAL for WS50 — interactive Wi-Fi UI is available on the device, so embedding helps zero-touch staging but is not strictly required. `[HIGH: AEAOSPFULL-02 + MS Learn]`

The WS50 is supported under AOSP because no GMS; if GMS is present, use Android Enterprise fully managed instead. BOTH user-associated AND userless enrollment modes are supported. Userless is typical for shared-shift wearable scanners (a pool of WS50 units handed out at shift start); user-associated is appropriate when each scanner is assigned to a single named worker (compliance and Conditional Access then bind to that worker). `[MEDIUM: inferred from Zebra wearable-scanner use case + MS Learn AOSP modes, last_verified 2026-04-25]`

OEMConfig profile delivery is via Intune APK push (NOT Managed Google Play — AOSP has no GMS, and therefore no MGP delivery channel). See the [OEMConfig APK Push (Intune)](#oemconfig-apk-push) add-on H2 below for the full mechanics, including the two-OEMConfig-app disambiguation that is critical for picking the right Zebra OEMConfig app for the device's Android version. The OEMConfig-via-Intune-APK path (NOT Managed Google Play) is the locked AOSP delivery method for Zebra. `[HIGH: MS Learn oemconfig-zebra-android-devices, last_verified 2026-04-25]`

<a id="provisioning-steps"></a>
## Provisioning Steps

### Step 1 — Create AOSP enrollment profile in Intune

1. Sign in to the [Intune admin center](https://endpoint.microsoft.com). <!-- verify UI at execute time -->
2. Navigate to **Devices** > **Android** > **Enrollment**. <!-- verify UI at execute time -->
3. Choose the AOSP enrollment surface: **Corporate-owned dedicated devices (AOSP)** for userless shared-shift wearable-scanner fleets, or **Corporate-owned, user-associated (AOSP)** for single-worker assignment. <!-- verify UI at execute time -->
4. Select **Token**. Configure profile name (e.g., `AOSP-Zebra-WS50-Warehouse`), token expiry (userless = 90 days max; user-associated = up to 65 years), and target device-set scope.
5. Save the profile; do NOT generate the QR yet — Step 2 decides whether to embed Wi-Fi in the QR (OPTIONAL for WS50).

    > **What breaks if misconfigured:** Choosing the wrong AOSP enrollment surface (e.g., user-associated when the WS50 fleet is shared-shift kiosk-style) produces compliance and Conditional Access bindings to the wrong (or a phantom) user, and the staging-token expiry is asymmetric — userless caps at 90 days while user-associated allows up to 65 years. Recovery: delete the profile, re-create on the correct surface; previously enrolled devices are unaffected. Symptom appears in: Intune admin center > Devices > Android (devices show wrong enrollment mode in the Owner column).

### Step 2 — Generate the AOSP QR code (Wi-Fi embedding OPTIONAL for WS50)

1. From the saved AOSP enrollment profile, choose **Generate QR code**. <!-- verify UI at execute time -->
2. Decide whether to embed Wi-Fi credentials. For zero-touch staging (operator scans QR and walks away), embed the staging Wi-Fi block. For lighter-touch staging where the operator can use the WS50's interactive Wi-Fi UI, omit the Wi-Fi block.
3. If embedding Wi-Fi: enter SSID + auth type (typically WPA2-PSK or WPA3-Personal) + PSK. Verify against the staging access point configuration before saving.
4. Download the QR image as PNG. Distribute via a secure channel — the QR contains the staging enrollment token (and Wi-Fi PSK if embedded); treat it as a credential.

    > **What breaks if misconfigured:** Wi-Fi embedded with wrong SSID or PSK and no fallback to interactive Wi-Fi UI advertised to the operator → device joins no network and stalls. Recovery: regenerate QR with correct credentials OR omit the Wi-Fi block and instruct operators to use the WS50's interactive Wi-Fi UI at staging. Symptom appears in: device-side stall on QR-scan splash with no progression to enrollment handshake.

### Step 3 — Provision the device by scanning the QR (one device per QR)

1. Power on the WS50 out-of-box (factory-reset state). The device boots to the AOSP enrollment splash; orient the integrated scanner head at the QR image (the WS50 scanner doubles as the QR-capture surface).
2. If Wi-Fi was NOT embedded in the QR, use the WS50's interactive Wi-Fi UI to join the staging network when prompted.
3. Wait for the AOSP enrollment handshake with Intune. Typical enrollment window is **~15 minutes** from scan to "Enrolled" status in Intune admin center.
4. The WS50 boots into the configured AOSP mode (user-associated or userless). For user-associated mode, the assigned worker signs in at first use.
5. Repeat per device — AOSP enrollment is one-device-per-QR-scan; bulk enrollment is not supported under AOSP.

    > **What breaks if misconfigured:** Device shows "Connecting to Intune" past the ~15-minute window with no progression → typically token (Step 1 expiry / wrong-mode) or Wi-Fi (Step 2) misconfiguration; less commonly an Intune service-side outage. Recovery: factory-reset the WS50, verify token validity in Intune admin center, regenerate the QR if needed, re-scan. Symptom appears in: device-side "Connecting to Intune" stall (no progression past handshake screen).

### Step 4 — Author OEMConfig profile (StageNow OPTIONAL or direct Intune OEMConfig profile)

1. Decide the authoring path:
   - **Option A — Direct Intune OEMConfig profile.** Use this for simple configurations (key remap, scanner trigger, basic lifecycle policy). In Intune admin center > **Devices** > **Configuration** > **Create profile** > **Platform: Android Enterprise** > **Profile type: OEMConfig** — select the appropriate Zebra OEMConfig app (see [OEMConfig APK Push (Intune)](#oemconfig-apk-push) for two-app disambiguation) and configure settings via the profile UI. <!-- verify UI at execute time -->
   - **Option B — StageNow Export to MDM.** Use this for complex MX-schema configurations (multi-feature compositions, advanced scanner profiles, enterprise reset bundles). Author the profile in Zebra's StageNow desktop tool (`techdocs.zebra.com`), then use **Export to MDM** to emit an XML body that Intune ingests as an OEMConfig profile.
2. Cross-reference the [OEMConfig APK Push (Intune)](#oemconfig-apk-push) add-on H2 below for delivery mechanics — authoring the profile is separate from delivering the OEMConfig app APK to the device.
3. Save the OEMConfig profile and note its assignment scope; assignment lands in Step 5.

    > **What breaks if misconfigured:** Authoring against the wrong MX schema version (hand-rolling XML against an outdated schema) → profile ingestion fails or settings silently no-op on the device. Recovery: re-author via StageNow Export to MDM (which versions the schema for you) or use the direct Intune OEMConfig profile UI which surfaces the supported settings explicitly. Symptom appears in: Intune profile assignment status `Failed` for the OEMConfig profile, or device-side scanner / key-remap settings not taking effect.

### Step 5 — Push OEMConfig APK + profile via Intune

1. Upload the chosen Zebra OEMConfig APK as an Intune **line-of-business app**: Intune admin center > **Apps** > **Android** > **Add** > **Line-of-business app** > select the APK file (Zebra OEMConfig Powered by MX or Legacy Zebra OEMConfig per the [OEMConfig APK Push (Intune)](#oemconfig-apk-push) two-app disambiguation table). <!-- verify UI at execute time -->
2. Assign the line-of-business app to the device-set scope that matches the WS50 fleet (typically the same scope as the AOSP enrollment profile from Step 1).
3. Assign the OEMConfig profile (authored in Step 4) to the same device-set scope.
4. Observe the OEMConfig profile application: typical 5-15 minute delivery window from assignment to device-side application. Confirm in Intune admin center > **Devices** > select WS50 > **Device configuration** > the OEMConfig profile shows status `Succeeded`.

    > **What breaks if misconfigured:** OEMConfig APK uploaded but assignment scope mismatched with the WS50 device-set → app never lands on the device, OEMConfig profile fails to apply (the profile needs the OEMConfig app present to interpret the configuration). Recovery: align assignment scopes for the LOB app and the OEMConfig profile; both should target the same WS50 device set. Symptom appears in: Intune admin center > Devices > WS50 > Apps shows OEMConfig app `Not installed`, and the OEMConfig profile shows `Failed` or `Pending`.

<a id="oemconfig-apk-push"></a>
## OEMConfig APK Push (Intune)

AOSP devices have no Google Mobile Services and therefore no Managed Google Play — the GMS-mode OEMConfig delivery channel does not exist. Intune supports OEMConfig delivery on AOSP via APK push: the OEM publishes their OEMConfig app as a downloadable APK, the admin uploads it as an Intune line-of-business app, the device receives the app via the AOSP enrollment + APK install flow, and the OEMConfig profile is applied via standard Intune profile assignment.

Zebra publishes **two** OEMConfig apps; pick the right one for the device's Android version:

| OEMConfig App | Android Versions | Profile Model | Notes |
|---|---|---|---|
| Zebra OEMConfig Powered by MX | Android 13+ AND Android 11 | Single-profile recommended | New app; preferred for net-new deployments where compatible |
| Legacy Zebra OEMConfig | Android 11 and earlier | Multi-profile supported | Use for legacy fleets needing multi-profile composition |

`[HIGH: MS Learn oemconfig-zebra-android-devices, last_verified 2026-04-25]`

Both OEMConfig apps are deployed as APK files via Intune line-of-business app upload. Neither app is published in Managed Google Play (AOSP has no MGP — this is the contrast point with GMS-mode Android Enterprise OEMConfig delivery, which uses MGP).

**StageNow workflow (OPTIONAL).** Zebra's StageNow desktop tool provides an *Export to MDM* workflow that generates XML consumable as an Intune OEMConfig profile body. Use StageNow when: (a) the configuration spans multiple MX-schema features, (b) the configuration mixes scanner / wireless / lifecycle policies in one bundle, or (c) the admin already maintains StageNow profiles for non-Intune Zebra deployments and wants schema-version parity. For simple cases (single key remap, trigger configuration, basic lifecycle), author the OEMConfig profile directly in Intune without StageNow involvement.

**MX schema versioning note.** Zebra OEMConfig supports MX schema versions 13.5 (current) and 14.2 (latest); MX schema development is ongoing. Hand-authored XML drifts as MX evolves — prefer StageNow's Export to MDM workflow (which versions the schema for you) OR direct Intune OEMConfig profile authoring (which surfaces the supported settings the Intune UI knows about). `[HIGH: techdocs.zebra.com/oemconfig, last_verified 2026-04-25]`

> **What breaks if misconfigured:** Wrong OEMConfig app for the device's Android version (e.g., Powered by MX on Android 10) → app fails to install or the OEMConfig profile fails to apply. Recovery: verify device Android version (Intune admin center > Devices > select WS50 > Hardware > OS version), uninstall the wrong OEMConfig app, install the matching OEMConfig app per the table above, re-assign the OEMConfig profile. Symptom appears in: Intune device profile assignment status `Failed` for the OEMConfig profile, OR LOB app status `Install failed` for the OEMConfig app.

<a id="verification"></a>
## Verification

1. Sign in to the [Intune admin center](https://endpoint.microsoft.com). <!-- verify UI at execute time -->
2. Navigate to **Devices** > **All devices**, filter by **Platform = Android**, and search by serial number (the WS50 serial is on the chassis label and in Settings > About). <!-- verify UI at execute time -->
3. Confirm the WS50 row shows **Enrolled** status with the expected AOSP mode in the Owner column (user-associated or dedicated/userless).
4. Confirm the OEMConfig profile assignment status = **Succeeded** in **Devices** > select WS50 > **Device configuration**. <!-- verify UI at execute time -->
5. On the WS50 itself, confirm the OEMConfig settings are reflected: scanner trigger configuration, key remap, lifecycle policy, or whatever your OEMConfig profile sets.
6. Wait up to ~15 minutes from first boot for the initial compliance state to populate; confirm the **Compliance** column reports the expected verdict per your tenant's compliance policy.

<a id="common-failures"></a>
## Common Failures

The WS50 is supported under AOSP because no GMS; if GMS is present, use Android Enterprise fully managed instead. The failure modes below are scoped to the AOSP enrollment + OEMConfig delivery surface for Zebra WS50.

| Symptom | Likely Cause | Recovery | Severity |
|---|---|---|---|
| Wrong OEMConfig app installed for Android version (e.g., Powered by MX on Android 10) | OEMConfig two-app disambiguation missed at LOB app upload (Step 5); admin picked the wrong APK | Verify device Android version; uninstall wrong OEMConfig app; install matching OEMConfig app per the [OEMConfig APK Push (Intune)](#oemconfig-apk-push) table; re-assign OEMConfig profile. `[HIGH: MS Learn oemconfig-zebra-android-devices, last_verified 2026-04-25]` | CRITICAL |
| Deployment attempted on Android 12 | Android 12 is NOT supported on Zebra devices per MS Learn explicit statement | Re-target the deployment to Android 11 (current WS50 firmware floor) or Android 13+ devices; do NOT attempt Android 12 deployment. `[HIGH: MS Learn oemconfig-zebra-android-devices, last_verified 2026-04-25]` | CRITICAL |
| OEMConfig profile assignment status = `Failed` | OEMConfig app not installed on the device, OR OEMConfig profile authored against unsupported MX-schema feature, OR app/profile assignment scope mismatch | Verify LOB app install status on the device; align LOB app and profile assignment scopes; re-author profile via StageNow Export to MDM if MX-schema mismatch suspected. `[HIGH: techdocs.zebra.com/oemconfig, last_verified 2026-04-25]` | HIGH |
| StageNow XML rejected by Intune | MX schema version mismatch between StageNow output and the Zebra OEMConfig app's expected schema | Re-export from StageNow against the schema version supported by the installed OEMConfig app; alternatively author the profile directly in Intune OEMConfig profile UI which constrains to known-supported settings. `[HIGH: techdocs.zebra.com/oemconfig, last_verified 2026-04-25]` | HIGH |
| Userless token expired at 90 days | Userless AOSP tokens have a 90-day MS Learn-imposed ceiling (asymmetric vs user-associated 65-year max) | Regenerate the userless token in Intune admin center > Devices > Android > Enrollment > Corporate-owned dedicated devices > Token; redistribute QR. Previously enrolled WS50 devices are unaffected — only new enrollments fail. `[HIGH: MS Learn setup-aosp-corporate-userless, last_verified 2026-04-25]` | HIGH |
| Device hangs at "Connecting to Intune" (rare for WS50) | Wi-Fi block embedded in QR with wrong credentials AND operator did not fall back to interactive Wi-Fi UI; OR token expired before scan | Factory-reset the WS50; either omit the Wi-Fi block from the QR (and use the device's interactive Wi-Fi UI at staging) or correct the embedded Wi-Fi credentials; verify token validity. `[MEDIUM: inferred — WS50 has interactive Wi-Fi UI fallback, last_verified 2026-04-25]` | MEDIUM |
| LOB OEMConfig APK install failed | APK upload corrupted or assignment scope does not include the WS50 device set | Re-upload the APK via Intune Apps > Android > Add > Line-of-business app; align assignment scope with the WS50 device set. `[HIGH: MS Learn LOB app upload, last_verified 2026-04-25]` | MEDIUM |

<a id="renewal-maintenance"></a>
## Renewal / Maintenance

| Component | Renewal Period | Consequence of Lapse | Renewal Steps |
|---|---|---|---|
| Userless AOSP enrollment token | 90 days max (MS Learn-imposed ceiling for userless mode) | New userless WS50 enrollments fail; previously enrolled devices unaffected | Regenerate token via Intune admin center > Devices > Android > Enrollment > Corporate-owned dedicated devices > Token; redistribute QR to staging operators |
| User-associated AOSP enrollment token | Up to 65 years (configured at profile creation) | New user-associated WS50 enrollments fail | Regenerate via the same UI path; redistribute QR |
| Intune Plan 1 (or higher) licensing | Per Microsoft Customer Agreement renewal cycle | New device enrollments blocked; existing enrolled devices retain compliance until license fully lapses | Renew via Microsoft 365 admin center > Billing |
| OEMConfig profile (re-evaluate when MX schema updates) | Event-driven (MX schema version bump per `techdocs.zebra.com/oemconfig`) | Stale profile may no-op for newer MX features; existing settings continue to apply | Re-author via StageNow Export to MDM against the current MX schema, or refresh the direct Intune OEMConfig profile to surface newly-supported settings |
| Doc freshness | 60 days (Phase 34 D-14 / D-26) | Stale guidance risk | Re-fetch sources cited in this doc; update `last_verified` and `review_by` frontmatter |

<a id="what-breaks-summary"></a>
## What Breaks Summary

Inline what-breaks callouts at each decision point. Severity descending within each source section.

| Misconfiguration | Section | Severity |
|------------------|---------|----------|
| Wrong OEMConfig app for the device's Android version | [OEMConfig APK Push (Intune)](#oemconfig-apk-push) | CRITICAL |
| Deployment attempted on Android 12 (NOT supported on Zebra) | [Scope and Status](#) | CRITICAL |
| OEMConfig profile authored against unsupported MX schema | [Step 4](#provisioning-steps) | HIGH |
| LOB app and OEMConfig profile assignment scopes mismatched | [Step 5](#provisioning-steps) | HIGH |
| Userless token allowed to lapse beyond 90 days | [Renewal / Maintenance](#renewal-maintenance) | HIGH |
| Plan 1 vs Plan 2 license tier ambiguity not resolved per-tenant | [Prerequisites and Licensing](#prerequisites) | MEDIUM |

## See Also

- [AOSP Stub](06-aosp-stub.md) — AOSP scope context
- [AOSP OEM Matrix](../reference/aosp-oem-matrix.md) — cross-OEM AOSP capability mapping
- [Android Capability Matrix](../reference/android-capability-matrix.md) — overall Android mode capability landscape
- [Android Glossary](../_glossary-android.md) — OEMConfig terminology (added Phase 45 Plan 10 retrofit)
- [Android Enrollment Overview](../android-lifecycle/00-enrollment-overview.md#aosp) — placement of AOSP within the Android enrollment lifecycle

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-04-25 | Initial version (Phase 45 AEAOSPFULL-02) — Zebra WS50 AOSP admin guide. PITFALL-7 framing inline per-claim per D-04 + D-23. REQUIRED `## OEMConfig APK Push (Intune)` add-on H2 per D-02 with two-OEMConfig-app disambiguation (Powered by MX vs Legacy) + StageNow XML-export-to-MDM OPTIONAL workflow + MX schema versioning note. Android-12-NOT-supported callout in Scope and Status + Hardware Scope + Common Failures (CRITICAL row). 11-H2 sibling parity per D-01. Anchor scaffolding per D-05 including `#oemconfig-apk-push` add-on anchor. License-tier escalation pathway bullet at Prerequisites per RESEARCH.md Open Question §3 W-1. Frontmatter contract per D-26 + D-27 (last_verified 2026-04-25 + review_by 2026-06-24 + audience admin + platform Android + applies_to AOSP). | -- |

---

*Wave 3 runbook 29 (Cause B) and L2 runbook 23 (Pattern B) cross-link landing targets: [`#common-failures`](#common-failures) and [`#oemconfig-apk-push`](#oemconfig-apk-push) anchors above are stable per D-05 anchor-scaffolding contract.*
