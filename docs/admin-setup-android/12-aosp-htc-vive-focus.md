---
last_verified: 2026-04-25
review_by: 2026-06-24
audience: admin
platform: Android
applies_to: AOSP
---

> **Platform gate:** HTC VIVE Focus AOSP device management — Vive Focus 3 / Vive XR Elite / Vive Focus Vision enterprise AR/VR headsets in Microsoft Intune. For Windows Autopilot, see [Windows Admin](../admin-setup/00-overview.md). For macOS ADE, see [macOS Admin](../admin-setup-macos/00-overview.md). For iOS/iPadOS, see [iOS Admin](../admin-setup-ios/00-overview.md).
> **Platform note:** AOSP management is a distinct surface from Android Enterprise (COBO/BYOD/Dedicated/ZTE) — no GMS, no FCM push, no Managed Google Play. See [Android enrollment overview](../android-lifecycle/00-enrollment-overview.md#aosp).

<!-- The #### In Managed Google Play subsection is intentionally omitted.
     AOSP does not use Managed Google Play (no Google Mobile Services). -->

<!-- The #### In Zero-Touch portal subsection is intentionally omitted.
     AOSP does not use the Zero-Touch portal; AOSP enrollment is QR-only, one device at a time. -->

# Configure HTC VIVE Focus AOSP Devices in Intune

## Scope and Status

HTC Vive Focus 3, Vive XR Elite, and Vive Focus Vision are supported under AOSP in Intune because they have no GMS. If GMS is present on a target device, use Android Enterprise fully managed (COBO) instead — these devices are not supported under AOSP when GMS is available. `[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-25]`

HTC's enterprise AR/VR headsets are positioned for training, simulation, and XR collaboration — standalone six-degree-of-freedom headsets used for skills training, design review, remote-expert assistance, and immersive frontline workflows. Among the five AR/VR-class AOSP OEMs (RealWear / Zebra / Pico / HTC / Meta Quest), HTC carries the simplest direct-QR Intune enrollment flow: no vendor-portal coexistence is required (HTC has no Intune-side equivalent of RealWear Cloud, Pico Business Suite, or Meta for Work) and no per-device add-on profile delivery channel is mandated for the Intune-direct path. `[HIGH: AEAOSPFULL-04 + vive.com support, last_verified 2026-04-25]`

> **Vive Business Management System is an alternative MDM, NOT Intune coexistence.** HTC offers the Vive Business Management System (a vendor-side MDM) as an alternative deployment surface for fleets that do not use Intune. Choose Intune AOSP enrollment OR Vive Business Management System per fleet need — the two surfaces are alternatives, not coexistence partners (unlike Pico Business Suite, which CAN coexist with Intune AOSP per the Pico admin guide). `[HIGH: vive.com support + ManageXR alternative, last_verified 2026-04-25]`

<a id="hardware-scope"></a>
## Hardware Scope

HTC's three Intune-supported enterprise headsets are supported under AOSP because no GMS; if GMS is present, use Android Enterprise fully managed instead.

| Device | Minimum Firmware | Type | Notes |
|---|---|---|---|
| HTC Vive Focus 3 | 5.2 - 5.0.999.624 | AR/VR Headset | Enterprise standalone XR; first-generation Vive Business AR/VR headset; current MS Learn AOSP minimum floor |
| HTC Vive XR Elite | 4.0 - 1.0.999.350 | AR/VR Headset | Mixed-reality enterprise headset; passthrough-capable XR for training and design review |
| HTC Vive Focus Vision | 7.0.999.159 | AR/VR Headset | Successor to Focus 3; current-generation enterprise headset; in-device QR scan UI verbatim path documented under [Enrollment Method](#enrollment-method) |

`[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-25]`

These three SKUs are HTC's enterprise-positioned AR/VR line. Consumer Vive variants exist but are out of scope for Intune AOSP enrollment per the v1.4.1 milestone scope. Confirm hardware is one of the three enterprise SKUs above before procurement and rollout — the MS Learn AOSP supported-devices list is the authoritative gate for what Intune will accept. `[HIGH: vive.com/business + MS Learn AOSP supported devices, last_verified 2026-04-25]`

<a id="prerequisites"></a>
## Prerequisites and Licensing

- **Microsoft Intune Plan 2 OR Intune Suite** — HTC VIVE Focus AR/VR headsets fall under Microsoft's specialty-device licensing tier; AR/VR headsets are explicitly named in MS Learn's specialty-devices-with-intune scope, and Intune Plan 1 alone does not entitle the tenant to manage HTC VIVE Focus hardware. `[HIGH: MS Learn specialty-devices-with-intune, last_verified 2026-04-25]`
- **Microsoft Entra ID tenant** with Intune Administrator role available to the admin authoring the AOSP enrollment profile.
- **Staging Wi-Fi network on-site** that the headset can join during enrollment. HTC VIVE Focus headsets have an interactive Wi-Fi setup UI in their first-boot enrollment flow, so embedding Wi-Fi credentials in the AOSP QR is OPTIONAL for HTC (it helps zero-touch staging but is not strictly required — operators can complete Wi-Fi join interactively if the QR omits the Wi-Fi block). `[HIGH: vive.com support, last_verified 2026-04-25]`
- **No vendor portal required** for Intune-direct enrollment. HTC does not operate an Intune-coexistence vendor portal analogous to RealWear Cloud, Pico Business Suite, or Meta for Work. The Vive Business Management System exists as an alternative MDM (NOT for Intune coexistence) — choose Intune AOSP OR Vive Business Management System, not both. `[HIGH: vive.com support, last_verified 2026-04-25]`

## Enrollment Method

QR-only AOSP enrollment, one device at a time. Direct-QR Intune flow — the simplest of the 5 AR/VR AOSP OEMs (no vendor-portal coexistence required, no add-on configuration H2s). Wi-Fi embedding in the QR is OPTIONAL (HTC devices have interactive Wi-Fi UI). `[HIGH: AEAOSPFULL-04 + vive.com support, last_verified 2026-04-25]`

The HTC VIVE Focus enterprise headsets are supported under AOSP because no GMS; if GMS is present, use Android Enterprise fully managed instead. BOTH **user-associated** and **userless** AOSP enrollment modes are supported (the typical AR/VR pattern). Choose user-associated when each headset is checked out to a named operator (compliance and Conditional Access then bind to that user); choose userless for shared-pool fleets used in training rooms or simulation labs where multiple operators rotate through the same hardware. `[MEDIUM: AR/VR pattern + vive.com support docs imply both, last_verified 2026-04-25]`

On-device QR scan path: **Settings > Advanced > MDM setup > QR code** (Vive Focus Vision specifically; Focus 3 and XR Elite paths are similar). Confirm the firmware on the headset meets the minimum floor in [Hardware Scope](#hardware-scope) before navigating — older firmware variants may not surface the **MDM setup** menu option. `[HIGH: vive.com/us/support, last_verified 2026-04-25]`

<a id="provisioning-steps"></a>
## Provisioning Steps

### Step 1 — Create AOSP enrollment profile in Intune

1. Sign in to the [Intune admin center](https://endpoint.microsoft.com). <!-- verify UI at execute time -->
2. Navigate to **Devices** > **Android** > **Enrollment**. <!-- verify UI at execute time -->
3. Choose the AOSP enrollment surface: **Corporate-owned dedicated devices (AOSP)** for shared-pool training-room headsets (userless), or **Corporate-owned, user-associated (AOSP)** for named-operator assignment. <!-- verify UI at execute time -->
4. Select **Token**. Configure profile name (e.g., `AOSP-HTC-Vive-Focus-Training`), token expiry (userless = 90 days max; user-associated = up to 65 years), and target device-set scope.
5. Save the profile; do NOT generate the QR yet — Step 2 decides whether to embed Wi-Fi in the QR (OPTIONAL for HTC).

    > **What breaks if misconfigured:** Choosing the wrong AOSP enrollment surface (e.g., user-associated when the headsets are training-room shared pool) produces compliance and Conditional Access bindings to a phantom user, and the staging-token expiry is asymmetric — userless caps at 90 days while user-associated allows up to 65 years. Recovery: delete the profile, re-create on the correct surface; previously enrolled devices are unaffected. Symptom appears in: Intune admin center > Devices > Android (devices show wrong enrollment mode in the Owner column).

### Step 2 — Generate the AOSP QR code (Wi-Fi embedding OPTIONAL for HTC)

1. From the saved AOSP enrollment profile, choose **Generate QR code**. <!-- verify UI at execute time -->
2. Decide whether to embed Wi-Fi credentials. For zero-touch staging (operator scans QR and walks away while the headset enrolls), embed the staging Wi-Fi block. For lighter-touch staging where the operator can use the headset's interactive Wi-Fi UI at first-boot, omit the Wi-Fi block — HTC VIVE Focus devices have an interactive Wi-Fi setup UI that handles join during enrollment.
3. If embedding Wi-Fi: enter SSID + auth type (typically WPA2-PSK or WPA3-Personal) + PSK. Verify against the staging access point configuration before saving.
4. Download the QR image as PNG. Distribute via a secure channel — the QR contains the staging enrollment token (and Wi-Fi PSK if embedded); treat it as a credential.

    > **What breaks if misconfigured:** QR shared via insecure channel (mass email, public chat) leaks the staging token (and Wi-Fi PSK if embedded). Recovery: regenerate the staging token in Intune (invalidates the leaked QR), rotate the staging Wi-Fi PSK if embedded, redistribute the new QR via a secure channel. Symptom appears in: unexpected enrollments from out-of-policy devices, staging-Wi-Fi unauthorized client list.

### Step 3 — Provision the device by scanning the QR via in-device path Settings > Advanced > MDM setup > QR code

1. Power on the HTC VIVE Focus headset out-of-box (factory-reset state if previously enrolled). The headset boots into its first-time setup flow.
2. On the headset, navigate verbatim to **Settings > Advanced > MDM setup > QR code** (Vive Focus Vision; Focus 3 and XR Elite paths are similar). This is the in-device QR scan UI path published by HTC support. <!-- verify UI at execute time -->
3. Position the QR image so the headset's onboard camera can capture it. The headset confirms the scan with an on-display acknowledgment.
4. If Wi-Fi was NOT embedded in the QR, complete Wi-Fi join via the headset's interactive Wi-Fi UI when prompted.
5. Wait for the AOSP enrollment handshake with Intune. Typical enrollment window is **~15 minutes** from scan to "Enrolled" status in Intune admin center.
6. The headset boots into the configured AOSP mode (user-associated or userless). For user-associated mode, the assigned operator signs in at first use. Repeat per device — AOSP enrollment is one-device-per-QR-scan; bulk enrollment is not supported under AOSP.

    > **What breaks if misconfigured:** Wrong in-device path used (older firmware variant where the **MDM setup** option is not visible) → operator cannot reach the QR scanner from Settings. Recovery: confirm firmware meets the minimum floor in the [Hardware Scope](#hardware-scope) table; consult [vive.com support](https://www.vive.com/us/support/) for the variant-specific path on the exact firmware build. Symptom appears in: device-side missing menu option (no **MDM setup** entry under **Settings > Advanced**).

<a id="verification"></a>
## Verification

1. Sign in to the [Intune admin center](https://endpoint.microsoft.com). <!-- verify UI at execute time -->
2. Navigate to **Devices** > **All devices**, filter by **Platform = Android**, and search by serial number (the HTC VIVE Focus serial is on the chassis label and in **Settings > About** on the headset). <!-- verify UI at execute time -->
3. Confirm the headset row shows **Enrolled** status with the expected AOSP mode in the Owner column (user-associated or dedicated/userless).
4. Confirm the AOSP enrollment profile from Step 1 is applied — Intune admin center > Devices > select HTC headset > Device configuration shows the profile assignment status. <!-- verify UI at execute time -->
5. Wait up to ~15 minutes from first boot for the initial compliance state to populate; confirm the **Compliance** column reports the expected verdict per your tenant's compliance policy.

<a id="common-failures"></a>
## Common Failures

HTC VIVE Focus enterprise headsets are supported under AOSP because no GMS; if GMS is present, use Android Enterprise fully managed instead. The failure modes below are scoped to the Intune-direct AOSP enrollment surface for the three HTC enterprise SKUs.

| Symptom | Likely Cause | Recovery | Severity |
|---|---|---|---|
| In-device path **Settings > Advanced > MDM setup > QR code** missing on older firmware | Headset firmware below the floor in [Hardware Scope](#hardware-scope); the **MDM setup** menu entry was added at the documented minimum firmware build | Update the headset firmware to the supported floor (Vive Focus 3: 5.2 - 5.0.999.624; XR Elite: 4.0 - 1.0.999.350; Focus Vision: 7.0.999.159) before retrying enrollment; firmware update is via HTC's standard headset OTA flow. `[HIGH: vive.com/us/support + MS Learn AOSP supported devices, last_verified 2026-04-25]` | HIGH |
| Enrollment fails because firmware below the supported floor | Firmware below the per-model minimum (Vive Focus 3 5.2 - 5.0.999.624 / XR Elite 4.0 - 1.0.999.350 / Focus Vision 7.0.999.159) | Update firmware to the supported floor per the [Hardware Scope](#hardware-scope) table; retry QR scan via **Settings > Advanced > MDM setup > QR code**. `[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-25]` | HIGH |
| Device joins network but never appears in Intune admin center | Staging token expired (userless = 90-day ceiling), wrong AOSP enrollment profile selected at Step 1, or token assigned to wrong device-set scope | Regenerate token in Intune; redistribute QR; verify profile scope covers the device. `[HIGH: MS Learn setup-aosp-corporate-userless, last_verified 2026-04-25]` | HIGH |
| Userless token expired at 90 days | Userless AOSP tokens have a 90-day MS Learn-imposed ceiling (asymmetric vs user-associated 65-year max) | Regenerate the userless token in Intune admin center > Devices > Android > Enrollment > Corporate-owned dedicated devices > Token; redistribute QR. Previously enrolled headsets are unaffected — only new enrollments fail. `[HIGH: MS Learn setup-aosp-corporate-userless, last_verified 2026-04-25]` | HIGH |
| Attempting to run Vive Business Management System AND Intune AOSP simultaneously on the same fleet | The Vive Business Management System is HTC's vendor-side alternative MDM, NOT an Intune-coexistence portal — running both on the same device produces conflicting MDM ownership and unpredictable policy resolution | Choose ONE MDM per device: Intune AOSP enrollment for tenants standardizing on Microsoft management; OR Vive Business Management System for vendor-tooled fleets without Intune. To switch from Vive Business Management System to Intune AOSP, factory-reset the headset and re-enroll via the QR scan path. `[MEDIUM: vive.com support + general MDM-mutex pattern, last_verified 2026-04-25]` | MEDIUM |
| Device hangs at "Connecting to Intune" with no error surface | Wi-Fi credentials wrong (if embedded in QR) and operator did not fall back to interactive Wi-Fi UI; OR token expired before scan | Factory-reset the headset; either correct the embedded Wi-Fi credentials in the QR or omit the Wi-Fi block and use the headset's interactive Wi-Fi UI; verify token validity. `[MEDIUM: inferred — HTC has interactive Wi-Fi UI fallback, last_verified 2026-04-25]` | MEDIUM |

<a id="renewal-maintenance"></a>
## Renewal / Maintenance

| Component | Renewal Period | Consequence of Lapse | Renewal Steps |
|---|---|---|---|
| Userless AOSP enrollment token | 90 days max (MS Learn-imposed ceiling for userless mode) | New userless HTC enrollments fail; previously enrolled headsets unaffected | Regenerate token via Intune admin center > Devices > Android > Enrollment > Corporate-owned dedicated devices > Token; redistribute QR to staging operators |
| User-associated AOSP enrollment token | Up to 65 years (configured at profile creation) | New user-associated HTC enrollments fail | Regenerate via the same UI path; redistribute QR |
| Intune Plan 2 / Suite licensing | Per Microsoft Customer Agreement renewal cycle | New device enrollments blocked; existing enrolled devices retain compliance until license fully lapses | Renew via Microsoft 365 admin center > Billing |
| Doc freshness | 60 days (Phase 34 D-14 / D-26) | Stale guidance risk on firmware floors / in-device path / MS Learn AOSP supported-devices list shifts | Re-fetch sources cited in this doc (MS Learn AOSP supported devices, vive.com/us/support); update `last_verified` and `review_by` frontmatter |

<a id="what-breaks-summary"></a>
## What Breaks Summary

Inline what-breaks callouts at each decision point. Severity descending within each source section.

| Misconfiguration | Section | Severity |
|------------------|---------|----------|
| Headset firmware below the supported floor (Vive Focus 3 5.2 - 5.0.999.624 / XR Elite 4.0 - 1.0.999.350 / Focus Vision 7.0.999.159) | [Hardware Scope](#hardware-scope) | HIGH |
| In-device path **Settings > Advanced > MDM setup > QR code** not used (operator improvises) | [Step 3](#provisioning-steps) | HIGH |
| Userless token allowed to lapse beyond 90 days | [Renewal / Maintenance](#renewal-maintenance) | HIGH |
| AOSP enrollment profile assigned wrong device-set scope | [Step 1](#provisioning-steps) | HIGH |
| Vive Business Management System AND Intune AOSP running on the same device | [Common Failures](#common-failures) | MEDIUM |
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
| 2026-04-25 | Initial version (Phase 45 AEAOSPFULL-04) — HTC VIVE Focus AOSP admin guide for Vive Focus 3 / Vive XR Elite / Vive Focus Vision. PITFALL-7 framing per-claim discipline per D-04 + D-23. NO add-on H2s per D-02 (preserves AEAOSPFULL-04 "simplest of AR/VR OEMs" framing — direct-QR Intune flow without vendor-portal coexistence). 3-model firmware minimum matrix (Vive Focus 3 5.2 - 5.0.999.624 / XR Elite 4.0 - 1.0.999.350 / Focus Vision 7.0.999.159). Verbatim in-device QR scan UI path **Settings > Advanced > MDM setup > QR code** at Enrollment Method + Step 3 + Common Failures. 11-H2 sibling parity per D-01. Anchor scaffolding per D-05 (no add-on anchor). Source-confidence markers per D-28. Frontmatter contract per D-26 + D-27 (last_verified 2026-04-25 + review_by 2026-06-24 + audience admin + platform Android + applies_to AOSP). Vive Business Management System framed as alternative MDM (NOT Intune coexistence) at Scope and Status + Prerequisites + Common Failures MEDIUM row. | -- |

---

*Wave 3 runbook 29 (Cause D) and L2 runbook 23 (Pattern D) cross-link landing target: [`#common-failures`](#common-failures) anchor above is stable per D-05 anchor-scaffolding contract.*

*Wave 2 `aosp-oem-matrix.md` consumes the HTC column data shipped here: Vive Focus 3 / XR Elite / Focus Vision + per-model firmware floors (Hardware Scope row); QR-only AOSP + Wi-Fi OPTIONAL (Enrollment Method and Wi-Fi Embedding row); vendor portal None (Intune-direct; Vive Business Management System is alternative MDM not coexistence) + Plan 2 OR Suite (Vendor Portals and Licensing row); BOTH user-associated AND userless supported (Intune AOSP Mode row).*

*"Simplest of AR/VR OEMs" framing rationale (per AEAOSPFULL-04): HTC's Intune-direct AOSP flow has no vendor-portal coexistence step (contrast with RealWear Cloud REQUIRED Wi-Fi-QR-embedding, Pico Business Suite OPTIONAL coexistence, and Meta for Work + Meta Horizon Subscription Status REQUIRED add-on H2s). The 11-H2 baseline ships verbatim with NO add-on H2s per D-02 — Provisioning Steps flows directly into Verification without intermediate vendor-side configuration H2s. Per-model firmware floor variance (3 distinct firmware strings across Focus 3 / XR Elite / Focus Vision) is the only HTC-distinctive content surfaced as an inline table, NOT as an add-on H2.*

*Verbatim in-device QR scan UI path **Settings > Advanced > MDM setup > QR code** (per RESEARCH.md §1 HTC sourced from `vive.com/us/support`) is reproduced at three points in this guide — Enrollment Method (definitional placement), Step 3 H3 heading (procedural placement), and Common Failures HIGH row (recovery placement) — so an admin reading any of the three primary sections can locate the on-device path without cross-section navigation.*
