---
last_verified: 2026-04-25
review_by: 2026-06-24
audience: admin
platform: Android
applies_to: AOSP
---

> **Platform gate:** Pico AOSP device management — PICO 4 Enterprise / PICO Neo3 Pro/Eye AR/VR headsets in Microsoft Intune. For Windows Autopilot, see [Windows Admin](../admin-setup/00-overview.md). For macOS ADE, see [macOS Admin](../admin-setup-macos/00-overview.md). For iOS/iPadOS, see [iOS Admin](../admin-setup-ios/00-overview.md).
> **Platform note:** AOSP management is a distinct surface from Android Enterprise (COBO/BYOD/Dedicated/ZTE) — no GMS, no FCM push, no Managed Google Play. See [Android enrollment overview](../android-lifecycle/00-enrollment-overview.md#aosp).

<!-- The #### In Managed Google Play subsection is intentionally omitted.
     AOSP does not use Managed Google Play (no Google Mobile Services). -->

<!-- The #### In Zero-Touch portal subsection is intentionally omitted.
     AOSP does not use the Zero-Touch portal; AOSP enrollment is QR-only, one device at a time. -->

# Configure Pico AOSP Devices in Intune

## Scope and Status

PICO 4 Enterprise and PICO Neo3 Pro/Eye are supported under AOSP in Intune because they have no GMS. If GMS is present on a target device, use Android Enterprise fully managed (COBO) instead — these devices are not supported under AOSP when GMS is available. `[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-25]`

Pico devices are AR/VR headsets positioned for training, simulation, and enterprise XR collaboration — standalone six-degree-of-freedom headsets used for skills training, remote-expert simulation, design review, and immersive frontline workflows. The Enterprise SKU lineup (PICO 4 Enterprise, PICO Neo3 Pro/Eye, and PICO 4 Ultra Enterprise) is distinct from the consumer Pico product line and is the only tier eligible for Intune AOSP enrollment.

> ⚠️ **Enterprise SKU required.** Consumer Pico 4 and consumer Neo3 are NOT supported by Intune AOSP enrollment. Confirm hardware is the Enterprise SKU (PICO 4 Enterprise / PICO Neo3 Pro/Eye) before procurement and rollout. Procuring the wrong SKU is the most expensive failure mode in this workflow because it is only detectable after the device fails enrollment, by which point the consumer-SKU devices are already in operator hands. `[HIGH: business.picoxr.com + MACE Virtual Labs comparison, last_verified 2026-04-25]`

<a id="hardware-scope"></a>
## Hardware Scope

Pico's Intune-supported Enterprise headsets are supported under AOSP because no GMS; if GMS is present, use Android Enterprise fully managed instead.

| Device | Minimum Firmware | Type | Notes |
|---|---|---|---|
| PICO 4 Enterprise | PUI 5.6.0 | AR/VR Headset | Standalone enterprise XR; current-generation Pico Enterprise headset; hands-free immersive training / simulation |
| PICO Neo3 Pro/Eye | PUI 4.8.19 | AR/VR Headset | Eye-tracking variant of Neo3 Pro for enterprise simulation / training; gaze-based interaction and analytics |

`[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-25]`

PICO 4 Ultra Enterprise is also enterprise-tier per `business.picoxr.com`; verify the Intune AOSP supported-devices list at deployment time for net-new hardware additions. The MS Learn AOSP supported-devices page is the authoritative gate for what Intune will accept — Pico hardware that is enterprise-positioned by Pico but not yet listed on MS Learn cannot be enrolled under AOSP. `[HIGH: MS Learn AOSP supported devices + business.picoxr.com, last_verified 2026-04-25]`

<a id="prerequisites"></a>
## Prerequisites and Licensing

- **Microsoft Intune Plan 2 OR Intune Suite** — Pico AR/VR headsets fall under Microsoft's specialty-device licensing tier; Intune Plan 1 alone does not entitle the tenant to manage Pico hardware. `[HIGH: MS Learn specialty-devices-with-intune, last_verified 2026-04-25]`
- **Microsoft Entra ID tenant** with Intune Administrator role available to the admin authoring the AOSP enrollment profile.
- **Optional — PICO Business Suite license.** PICO Business Suite is a Pico-vendor SDK / app / kiosk-mode delivery offering that coexists in parallel with Intune AOSP enrollment. PICO Business Suite licensing changed mid-2025; community-source pricing reports SDK access at $50-$150/year/device. Verify current pricing at `business.picoxr.com`. See the [Pico Business Suite Coexistence](#pico-business-suite-coexistence) add-on H2 below for the OPTIONAL coexistence mechanics. `[MEDIUM: aliexpress.com / community sources, last_verified 2026-04-25]`
- **Staging Wi-Fi network on-site** that the headset can join during enrollment. Pico devices have an interactive Wi-Fi setup UI in their first-boot enrollment flow, so embedding Wi-Fi credentials in the AOSP QR is OPTIONAL for Pico (it helps zero-touch staging but is not strictly required — operators can complete Wi-Fi join interactively if the QR omits the Wi-Fi block). `[MEDIUM: PICO Business + general AR/VR pattern, last_verified 2026-04-25]`

## Enrollment Method

QR-only AOSP enrollment, one device at a time. Wi-Fi embedding in the QR is OPTIONAL for Pico devices (interactive Wi-Fi setup UI is available); embedding helps zero-touch staging but is not strictly required. `[HIGH: AEAOSPFULL-03 + MS Learn]`

The Pico Enterprise headsets are supported under AOSP because no GMS; if GMS is present, use Android Enterprise fully managed instead. BOTH **user-associated** and **userless** AOSP enrollment modes are supported (the typical AR/VR pattern). Choose user-associated when each headset is checked out to a named operator (compliance and Conditional Access then bind to that user), choose userless for shared-pool fleets used in training rooms or simulation labs where multiple operators rotate through the same hardware. `[MEDIUM: AR/VR pattern inference + MS Learn dual-mode AOSP, last_verified 2026-04-25]`

<a id="provisioning-steps"></a>
## Provisioning Steps

### Step 1 — Confirm device is Enterprise SKU (PICO 4 Enterprise / PICO Neo3 Pro/Eye)

1. Inspect the physical device labeling on the chassis or original packaging. Enterprise SKUs carry "Enterprise", "Pro", or "Pro/Eye" branding distinct from the consumer Pico 4 / consumer Neo3 line.
2. Confirm the model identifier matches the MS Learn AOSP supported-devices list (PICO 4 Enterprise OR PICO Neo3 Pro/Eye). Consumer Pico 4 and consumer Neo3 are NOT on the supported list and will fail Intune AOSP enrollment.
3. Verify the firmware version meets the minimum floor: PUI 5.6.0 for PICO 4 Enterprise, PUI 4.8.19 for PICO Neo3 Pro/Eye. Settings > About on the headset surfaces the PUI version.
4. (For net-new procurement) Cross-reference `business.picoxr.com` to confirm the SKU is enterprise-tier; if procuring through a third-party reseller, get explicit confirmation in writing that the SKU is the Enterprise variant.

    > **What breaks if misconfigured:** Consumer Pico 4 / Neo3 procured by mistake → device fails Intune AOSP enrollment with no clear error surface (the device joins network and reaches Intune but the AOSP enrollment endpoint rejects the unsupported SKU). Recovery: re-procure Enterprise SKU; consumer SKU devices cannot be retroactively converted. Symptom appears in: device-side enrollment timeout (no progression past handshake) and absence of any device row in the Intune admin center.

### Step 2 — Create AOSP enrollment profile in Intune

1. Sign in to the [Intune admin center](https://endpoint.microsoft.com). <!-- verify UI at execute time -->
2. Navigate to **Devices** > **Android** > **Enrollment**. <!-- verify UI at execute time -->
3. Choose the AOSP enrollment surface: **Corporate-owned dedicated devices (AOSP)** for shared-pool training-room headsets (userless), or **Corporate-owned, user-associated (AOSP)** for named-operator assignment. <!-- verify UI at execute time -->
4. Select **Token**. Configure profile name (e.g., `AOSP-Pico-4-Enterprise-Training`), token expiry (userless = 90 days max; user-associated = up to 65 years), and target device-set scope.
5. Save the profile; do NOT generate the QR yet — Step 3 decides whether to embed Wi-Fi in the QR (OPTIONAL for Pico).
6. (Optional) If using PICO Business Suite in coexistence (see [Pico Business Suite Coexistence](#pico-business-suite-coexistence) below), no Intune-side configuration changes are required at this step — the two surfaces operate in parallel.

    > **What breaks if misconfigured:** Choosing the wrong AOSP enrollment surface (e.g., user-associated when the headsets are training-room shared pool) produces compliance and Conditional Access bindings to a phantom user, and the staging-token expiry is asymmetric — userless caps at 90 days while user-associated allows up to 65 years. Recovery: delete the profile, re-create on the correct surface; previously enrolled devices are unaffected. Symptom appears in: Intune admin center > Devices > Android (devices show wrong enrollment mode in the Owner column).

### Step 3 — Generate the AOSP QR code (Wi-Fi embedding OPTIONAL for Pico)

1. From the saved AOSP enrollment profile, choose **Generate QR code**. <!-- verify UI at execute time -->
2. Decide whether to embed Wi-Fi credentials. For zero-touch staging (operator scans QR and walks away while the headset enrolls), embed the staging Wi-Fi block. For lighter-touch staging where the operator can use the Pico's interactive Wi-Fi UI at first-boot, omit the Wi-Fi block.
3. If embedding Wi-Fi: enter SSID + auth type (typically WPA2-PSK or WPA3-Personal) + PSK. Verify against the staging access point configuration before saving.
4. Download the QR image as PNG. Distribute via a secure channel — the QR contains the staging enrollment token (and Wi-Fi PSK if embedded); treat it as a credential.

    > **What breaks if misconfigured:** QR shared via insecure channel (mass email, public chat) leaks the staging token (and Wi-Fi PSK if embedded). Recovery: regenerate the staging token in Intune (invalidates the leaked QR), rotate the staging Wi-Fi PSK if embedded, redistribute the new QR via a secure channel. Symptom appears in: unexpected enrollments from out-of-policy devices, staging-Wi-Fi unauthorized client list.

### Step 4 — Provision the device by scanning the QR (one device per QR)

1. Power on the Pico headset out-of-box (factory-reset state). The headset boots to its first-time setup flow; navigate to the QR-scan / device-management entry point per the model's setup guide (PICO 4 Enterprise and Neo3 Pro/Eye expose the AOSP enrollment QR scanner during initial provisioning).
2. Position the QR image so the headset's front camera can capture it. The headset confirms the scan with an on-display acknowledgment.
3. If Wi-Fi was NOT embedded in the QR, complete Wi-Fi join via the headset's interactive Wi-Fi UI when prompted.
4. Wait for the AOSP enrollment handshake with Intune. Typical enrollment window is **~15 minutes** from scan to "Enrolled" status in Intune admin center.
5. The headset boots into the configured AOSP mode (user-associated or userless). For user-associated mode, the assigned operator signs in at first use.
6. Repeat per device — AOSP enrollment is one-device-per-QR-scan; bulk enrollment is not supported under AOSP.

    > **What breaks if misconfigured:** Device shows "Connecting to Intune" past the ~15-minute window with no progression → typically token (Step 2 expiry / wrong-mode), Wi-Fi (Step 3) misconfiguration, or consumer-SKU mistake (Step 1); less commonly an Intune service-side outage. Recovery: factory-reset the headset, verify token validity in Intune admin center, re-confirm Enterprise SKU per Step 1, regenerate the QR if needed, re-scan. Symptom appears in: device-side "Connecting to Intune" stall (no progression past handshake screen).

<a id="pico-business-suite-coexistence"></a>
## Pico Business Suite Coexistence

PICO Business Suite is an OPTIONAL Pico-vendor offering for fleets that need PICO-specific SDK / app / kiosk-mode features beyond what Intune AOSP profile delivery alone provides. PICO Business Suite coexistence with Intune AOSP enrollment is supported as a parallel-vendor pattern; neither tool is required for the other to function.

PICO Business Suite is for vendor-side SDK + app delivery + Pico-specific configuration (kiosk mode, controller binding, Pico SDK feature gates, headset-specific firmware/policy controls). Intune AOSP profile delivery handles Microsoft 365 apps, standard MDM controls (passcode, network, compliance, Conditional Access), and tenant-side reporting. An organization may use either surface alone OR both in coexistence per fleet need:

- **Intune-only (Pico Business Suite NOT licensed):** sufficient for fleets that only need standard MDM controls + Microsoft 365 app delivery + compliance reporting on Pico hardware.
- **PICO Business Suite-only (no Intune AOSP enrollment):** sufficient for fleets that only need Pico-specific SDK / app delivery without Microsoft tenant integration.
- **Both in coexistence:** appropriate when the fleet needs Microsoft 365 + Conditional Access + tenant compliance AND PICO-vendor SDK features (kiosk mode, controller binding, Pico-specific app delivery).

**License terms note.** PICO Business Suite licensing changed mid-2025. SDK access reportedly $50-$150/year/device per community sources; verify current pricing at [`business.picoxr.com`](https://business.picoxr.com) for authoritative Enterprise SKU + PICO Business Suite licensing details. The MEDIUM source-confidence marker on the price-band reflects that the figure is community-derived rather than vendor-authoritative; always re-confirm with Pico sales before budgeting. `[MEDIUM: aliexpress.com / community, last_verified 2026-04-25]`

> **What breaks if misconfigured:** Attempting to deploy PICO-vendor SDK features through Intune-only path (no PICO Business Suite license) → SDK features unavailable on the device because the Intune profile cannot reach Pico-vendor-internal capabilities. Recovery: license PICO Business Suite if the SDK / kiosk-mode / controller-binding features are required for the fleet; alternatively scope the deployment to Intune-only standard MDM controls if the SDK features are out-of-scope. Symptom appears in: PICO-specific app failures on the headset, kiosk-mode configuration not applying, vendor SDK calls returning "feature not licensed" errors.

<a id="verification"></a>
## Verification

1. Sign in to the [Intune admin center](https://endpoint.microsoft.com). <!-- verify UI at execute time -->
2. Navigate to **Devices** > **All devices**, filter by **Platform = Android**, and search by serial number (the Pico serial is on the chassis label and in Settings > About on the headset). <!-- verify UI at execute time -->
3. Confirm the headset row shows **Enrolled** status with the expected AOSP mode in the Owner column (user-associated or dedicated/userless).
4. Confirm the AOSP enrollment profile from Step 2 is applied — Intune admin center > Devices > select Pico headset > Device configuration shows the profile assignment status.
5. Wait up to ~15 minutes from first boot for the initial compliance state to populate; confirm the **Compliance** column reports the expected verdict per your tenant's compliance policy.
6. (If PICO Business Suite is in coexistence) Sign in to the PICO Business Suite admin console and confirm the device also appears there with the same serial number — Intune and PICO Business Suite coexist; the device is visible in both surfaces. <!-- verify UI at execute time -->

<a id="common-failures"></a>
## Common Failures

Pico Enterprise headsets are supported under AOSP because no GMS; if GMS is present, use Android Enterprise fully managed instead. The failure modes below are scoped to the AOSP enrollment + optional PICO Business Suite coexistence surface for Pico Enterprise hardware.

| Symptom | Likely Cause | Recovery | Severity |
|---|---|---|---|
| Consumer Pico 4 / Neo3 procured by mistake; enrollment fails with no clear error | Wrong SKU procured (consumer instead of Enterprise) — the most expensive failure mode because it is only detectable after operator hands the device over | Re-procure Enterprise SKU (PICO 4 Enterprise or PICO Neo3 Pro/Eye); consumer SKUs cannot be retroactively converted. Update procurement contracts to require explicit Enterprise-SKU confirmation in writing. `[HIGH: business.picoxr.com + MACE Virtual Labs comparison, last_verified 2026-04-25]` | CRITICAL |
| Enrollment fails because PUI firmware below floor | PICO 4 Enterprise on PUI < 5.6.0 OR PICO Neo3 Pro/Eye on PUI < 4.8.19 | Update the headset PUI firmware to the supported floor before retrying enrollment; firmware update is via Pico's standard headset OTA flow. `[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-25]` | HIGH |
| Device joins network but never appears in Intune admin center | Staging token expired (userless = 90-day ceiling), wrong AOSP enrollment profile selected at Step 2, or token assigned to wrong device-set scope | Regenerate token in Intune; redistribute QR; verify profile scope covers the device. `[HIGH: MS Learn setup-aosp-corporate-userless, last_verified 2026-04-25]` | HIGH |
| Userless token expired at 90 days | Userless AOSP tokens have a 90-day MS Learn-imposed ceiling (asymmetric vs user-associated 65-year max) | Regenerate the userless token in Intune admin center > Devices > Android > Enrollment > Corporate-owned dedicated devices > Token; redistribute QR. Previously enrolled headsets are unaffected — only new enrollments fail. `[HIGH: MS Learn setup-aosp-corporate-userless, last_verified 2026-04-25]` | HIGH |
| PICO Business Suite coexistence misconfigured / SDK features unavailable | Fleet expects Pico-vendor SDK features (kiosk mode, controller binding, Pico SDK gates) but PICO Business Suite is not licensed; OR PICO Business Suite is licensed but the device is not enrolled in the PICO Business Suite admin console | License PICO Business Suite per [Pico Business Suite Coexistence](#pico-business-suite-coexistence); enroll the device in the PICO Business Suite admin console alongside Intune; OR scope the deployment to Intune-only standard MDM controls if SDK features are out-of-scope. `[MEDIUM: aliexpress.com / community + business.picoxr.com, last_verified 2026-04-25]` | MEDIUM |
| Device hangs at "Connecting to Intune" with no error surface | Wi-Fi credentials wrong (if embedded in QR) and operator did not fall back to interactive Wi-Fi UI; OR token expired before scan | Factory-reset the headset; either correct the embedded Wi-Fi credentials in the QR or omit the Wi-Fi block and use the headset's interactive Wi-Fi UI; verify token validity. `[MEDIUM: inferred — Pico has interactive Wi-Fi UI fallback, last_verified 2026-04-25]` | MEDIUM |

<a id="renewal-maintenance"></a>
## Renewal / Maintenance

| Component | Renewal Period | Consequence of Lapse | Renewal Steps |
|---|---|---|---|
| Userless AOSP enrollment token | 90 days max (MS Learn-imposed ceiling for userless mode) | New userless Pico enrollments fail; previously enrolled headsets unaffected | Regenerate token via Intune admin center > Devices > Android > Enrollment > Corporate-owned dedicated devices > Token; redistribute QR to staging operators |
| User-associated AOSP enrollment token | Up to 65 years (configured at profile creation) | New user-associated Pico enrollments fail | Regenerate via the same UI path; redistribute QR |
| Intune Plan 2 / Suite licensing | Per Microsoft Customer Agreement renewal cycle | New device enrollments blocked; existing enrolled devices retain compliance until license fully lapses | Renew via Microsoft 365 admin center > Billing |
| PICO Business Suite license (OPTIONAL) | Per Pico vendor cycle (mid-2025 license-term changes; verify at `business.picoxr.com`) | PICO-vendor SDK features become unavailable; Intune-direct AOSP enrollment unaffected | Re-license via Pico vendor channel; verify pricing and term length per current `business.picoxr.com` listing |
| Doc freshness | 60 days (Phase 34 D-14 / D-26) | Stale guidance risk | Re-fetch sources cited in this doc; update `last_verified` and `review_by` frontmatter |

<a id="what-breaks-summary"></a>
## What Breaks Summary

Inline what-breaks callouts at each decision point. Severity descending within each source section.

| Misconfiguration | Section | Severity |
|------------------|---------|----------|
| Consumer Pico 4 / Neo3 procured instead of Enterprise SKU | [Step 1](#provisioning-steps) | CRITICAL |
| PUI firmware below the supported floor (PUI 5.6.0 / PUI 4.8.19) | [Hardware Scope](#hardware-scope) | HIGH |
| Userless token allowed to lapse beyond 90 days | [Renewal / Maintenance](#renewal-maintenance) | HIGH |
| AOSP enrollment profile assigned wrong device-set scope | [Step 2](#provisioning-steps) | HIGH |
| PICO Business Suite coexistence not configured when SDK features required | [Pico Business Suite Coexistence](#pico-business-suite-coexistence) | MEDIUM |
| Intune Plan 1 only (no AR/VR specialty entitlement) | [Prerequisites and Licensing](#prerequisites) | MEDIUM |

## See Also

- [AOSP Stub](06-aosp-stub.md) — AOSP scope context
- [AOSP OEM Matrix](../reference/aosp-oem-matrix.md) — cross-OEM AOSP capability mapping
- [Android Capability Matrix](../reference/android-capability-matrix.md) — overall Android mode capability landscape
- [Android Glossary](../_glossary-android.md) — AOSP / OEMConfig / GMS terminology
- [Android Enrollment Overview](../android-lifecycle/00-enrollment-overview.md#aosp) — placement of AOSP within the Android enrollment lifecycle

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-04-25 | Initial version (Phase 45 AEAOSPFULL-03) — Pico AOSP admin guide for PICO 4 Enterprise / PICO Neo3 Pro/Eye. PITFALL-7 framing inline per-claim per D-04 + D-23. OPTIONAL `## Pico Business Suite Coexistence` add-on H2 per D-02 with verbatim "OPTIONAL" wording per AEAOSPFULL-03 "optional coexistence" contract. Enterprise SKU disambiguation callout (PICO 4 Enterprise NOT consumer Pico 4; PICO Neo3 Pro/Eye NOT consumer Neo3) at Scope and Status + Step 1 + Common Failures CRITICAL row. 11-H2 sibling parity per D-01. Anchor scaffolding per D-05 including `#pico-business-suite-coexistence` add-on anchor. PICO Business Suite mid-2025 license-term changes captured with MEDIUM source-confidence marker per D-28. Frontmatter contract per D-26 + D-27 (last_verified 2026-04-25 + review_by 2026-06-24 + audience admin + platform Android + applies_to AOSP). | -- |

---

*Wave 3 runbook 29 (Cause C) and L2 runbook 23 (Pattern C) cross-link landing targets: [`#common-failures`](#common-failures) and [`#pico-business-suite-coexistence`](#pico-business-suite-coexistence) anchors above are stable per D-05 anchor-scaffolding contract.*

*Wave 2 `aosp-oem-matrix.md` consumes the Pico column data shipped here: PICO 4 Enterprise / PICO Neo3 Pro/Eye + PUI 5.6.0 / PUI 4.8.19 firmware floors (Hardware Scope row); QR-only AOSP + Wi-Fi OPTIONAL (Enrollment Method and Wi-Fi Embedding row); PICO Business Suite OPTIONAL coexistence + Plan 2 OR Suite (Vendor Portals and Licensing row); BOTH user-associated AND userless supported (Intune AOSP Mode row).*
