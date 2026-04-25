---
last_verified: 2026-04-25
review_by: 2026-06-24
audience: admin
platform: Android
applies_to: AOSP
---

> **Platform gate:** RealWear AOSP device management — HMT-1 / HMT-1Z1 / Navigator 500 frontline AR headsets in Microsoft Intune. For Windows Autopilot, see [Windows Admin](../admin-setup/00-overview.md). For macOS ADE, see [macOS Admin](../admin-setup-macos/00-overview.md). For iOS/iPadOS, see [iOS Admin](../admin-setup-ios/00-overview.md).
> **Platform note:** AOSP management is a distinct surface from Android Enterprise (COBO/BYOD/Dedicated/ZTE) — no GMS, no FCM push, no Managed Google Play. See [Android enrollment overview](../android-lifecycle/00-enrollment-overview.md#aosp).

<!-- The #### In Managed Google Play subsection is intentionally omitted.
     AOSP does not use Managed Google Play (no Google Mobile Services). -->

<!-- The #### In Zero-Touch portal subsection is intentionally omitted.
     AOSP does not use the Zero-Touch portal; AOSP enrollment is QR-only, one device at a time. -->

# Configure RealWear AOSP Devices in Intune

## Scope and Status

RealWear HMT-1, HMT-1Z1, and Navigator 500 are supported under AOSP in Intune because they have no GMS. If GMS is present on a target device, use Android Enterprise fully managed (COBO) instead — these devices are not supported under AOSP when GMS is available. `[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-25]`

RealWear devices are AR/VR headsets purpose-built for hands-free frontline work — field service, equipment maintenance, remote expert assistance, and inspection workflows where the operator's hands must stay on the task. Voice-driven UI, head-mounted display, and ruggedized form factors distinguish them from general-purpose Android tablets and phones.

<a id="hardware-scope"></a>
## Hardware Scope

RealWear's three Intune-supported headsets are supported under AOSP because no GMS; if GMS is present, use Android Enterprise fully managed instead.

| Device | Minimum Firmware | Notes |
|---|---|---|
| RealWear HMT-1 | 11.2+ | Primary frontline AR headset; hands-free voice control |
| RealWear HMT-1Z1 | 11.2+ | ATEX/IECEx-certified hazardous-environment variant of HMT-1 |
| RealWear Navigator 500 | 1.1+ | Next-gen head-mounted tablet; high-res camera for remote expert |

All three carry the same AOSP QR enrollment constraints — one device per QR, Wi-Fi credentials MUST be embedded.

`[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-25]`

<a id="prerequisites"></a>
## Prerequisites and Licensing

- **Microsoft Intune Plan 2 OR Intune Suite** — RealWear AR/VR headsets fall under Microsoft's specialty-device licensing tier; Intune Plan 1 alone does not entitle the tenant to manage RealWear hardware. `[HIGH: MS Learn specialty-devices-with-intune, last_verified 2026-04-25]`
- **Microsoft Entra ID tenant** with Intune Administrator role available to the admin authoring the AOSP enrollment profile.
- **Optional — RealWear Cloud account** that coexists with Intune. Microsoft Teams for HMT (the headset-optimized Teams build) is distributed exclusively through RealWear Cloud, so any tenant intending to ship Teams to RealWear devices must provision a RealWear Cloud account in addition to Intune. Intune-direct enrollment alone does not require RealWear Cloud. `[HIGH: support.realwear.com/knowledge/faq-intune-aosp, last_verified 2026-04-25]`
- **Staging Wi-Fi network on-site** that the headset can join from the embedded QR payload. The staging Wi-Fi MUST be **WPA-PSK / WPA2-PSK / WPA3 (PSK-only)**. EAP-PEAP and EAP-TLS are NOT supported for the staging Wi-Fi network. Corporate EAP networks must be configured via a post-enrollment device-restrictions Wi-Fi profile, not the AOSP staging QR. `[HIGH: support.realwear.com/knowledge/enrolling-in-microsoft-intune, last_verified 2026-04-25]`

## Enrollment Method

QR-only AOSP enrollment, one device at a time. Wi-Fi credentials MUST be embedded in the QR enrollment payload because RealWear devices cannot join Wi-Fi interactively during enrollment — the headset has no text-input UI in the enrollment flow, so the device must come up already network-connected to reach the Intune enrollment server on first boot. `[HIGH: AEAOSPFULL-01 verbatim + RealWear authoritative]`

Both **user-associated** and **userless** AOSP enrollment modes are supported under AOSP because no GMS; if GMS is present, use Android Enterprise fully managed instead. RealWear publishes guidance for both modes — choose user-associated when each headset will be checked out by a named worker (compliance and Conditional Access bind to that user), choose userless for shared kiosk-style fleets (e.g., a pool of headsets at a job site). `[HIGH: support.realwear.com/knowledge/faq-intune-aosp, last_verified 2026-04-25]`

<a id="provisioning-steps"></a>
## Provisioning Steps

### Step 1 — Create AOSP enrollment profile in Intune

1. Sign in to the [Intune admin center](https://endpoint.microsoft.com). <!-- verify UI at execute time -->
2. Navigate to **Devices** > **Android** > **Enrollment**. <!-- verify UI at execute time -->
3. Choose the AOSP enrollment surface: **Corporate-owned dedicated devices (AOSP)** for userless shared-headset fleets, or **Corporate-owned, user-associated (AOSP)** for named-worker assignment. <!-- verify UI at execute time -->
4. Select **Token** (the AOSP enrollment surface uses a staging token; AOSP does not use the Managed Google Play or Zero-Touch enrollment flows).
5. Configure profile name (e.g., `AOSP-RealWear-Field-Service`), token expiry (userless = 90 days max; user-associated = up to 65 years), and target device-set scope.
6. Save the profile; do NOT generate the QR yet — Step 2 configures the embedded Wi-Fi block before QR generation.

    > **What breaks if misconfigured:** Choosing the wrong AOSP enrollment surface (e.g., user-associated when the headsets are pooled kiosks) produces compliance and Conditional Access bindings to a phantom user, and the staging-token expiry is asymmetric — userless caps at 90 days while user-associated allows up to 65 years. Recovery: delete the profile, re-create on the correct surface; previously enrolled devices are unaffected. Symptom appears in: Intune admin center > Devices > Android (devices show wrong enrollment mode in the Owner column) and Conditional Access policy hits referencing a non-existent user.

### Step 2 — Configure Wi-Fi credentials embedded in the QR payload

The AOSP staging Wi-Fi MUST use WPA-PSK / WPA2-PSK / WPA3 — NOT EAP-PEAP, NOT EAP-TLS. See the [Wi-Fi QR Embedding Walkthrough](#wi-fi-qr-embedding) below for the full step-by-step UI mechanics; this Step 2 captures the Intune-side decision points.

1. From the AOSP enrollment profile created in Step 1, open the Wi-Fi configuration sub-pane (the Wi-Fi block is part of the AOSP QR generator UI; it is NOT a separate Wi-Fi profile under **Devices > Configuration**).
2. Enter the staging Wi-Fi **SSID** (case-sensitive; must match the broadcast SSID on the staging access point exactly).
3. Choose authentication type: **WPA2-PSK** (most common) or **WPA3-Personal**. Open networks are technically supported but not recommended for staging.
4. Enter the **PSK / passphrase** for the staging network. Verify the passphrase against the access point configuration before proceeding — there is no retry UI on the headset for wrong credentials.
5. Save the Wi-Fi block. Confirm the profile preview shows the SSID and that the auth-type field is one of WPA-PSK / WPA2-PSK / WPA3.

    > **What breaks if misconfigured:** Wi-Fi missing or wrong credentials → device hangs at "Connecting to Intune" with no error surface. Staging Wi-Fi configured with EAP-PEAP or EAP-TLS → silent enrollment failure (RealWear devices reject EAP staging auth and never join the network). Recovery: factory-reset the device, regenerate the QR with correct PSK Wi-Fi, re-scan. Symptom appears in: device-side stall (no Intune-side telemetry — the device never reached the enrollment server).

### Step 3 — Generate the AOSP QR code

1. From the saved AOSP enrollment profile, choose **Generate QR code** (or equivalent — the Intune AOSP QR generator UI emits a single QR image embedding the staging token, the Wi-Fi block from Step 2, and the AOSP enrollment endpoint URL). <!-- verify UI at execute time -->
2. Download the QR image as PNG. Distribute the QR via a secure channel to staging operators — the QR contains the Wi-Fi PSK and the staging enrollment token; treat it as a credential.
3. (Optional) If a portal session needs to display the QR on screen, ensure it is shown only on a trusted display in a controlled staging area, not in a public corridor.

    > **What breaks if misconfigured:** QR shared via insecure channel (e.g., mass email, public Slack channel) leaks the staging Wi-Fi PSK and the enrollment token. Recovery: regenerate the staging token in Intune (invalidates the leaked QR), rotate the staging Wi-Fi PSK, redistribute the new QR via a secure channel. Symptom appears in: unexpected enrollments from out-of-policy devices, staging Wi-Fi unauthorized client list.

### Step 4 — Provision the device by scanning the QR (one device per QR)

1. Power on the RealWear headset out-of-box (factory-reset state). Skip the first-time setup wizard until the QR-scan prompt appears (the precise voice-command sequence varies by HMT-1 vs Navigator 500; consult RealWear's per-model setup card).
2. Position the QR image so the headset's front camera can capture it. The headset confirms the scan with an on-display acknowledgment.
3. Wait for the headset to join the embedded staging Wi-Fi (within 10-30 seconds), then for the AOSP enrollment handshake with Intune. Typical enrollment window is **~15 minutes** from scan to "Enrolled" status in Intune.
4. The headset boots into the configured AOSP mode (user-associated or userless). For user-associated mode, the assigned user must complete sign-in via the headset's voice-driven UI.
5. Repeat per device — AOSP enrollment is one-device-per-QR-scan; bulk enrollment is not supported under AOSP.

    > **What breaks if misconfigured:** Device shows "Connecting to Intune" past the ~15-minute window with no progression → typically Wi-Fi (Step 2) or token (Step 1 expiry / wrong-mode) misconfiguration; less commonly an Intune service-side outage. Recovery: factory-reset the headset, verify token validity in Intune admin center, regenerate the QR if needed, re-scan. Symptom appears in: device-side "Connecting to Intune" stall (no progression past handshake screen).

<a id="wi-fi-qr-embedding"></a>
## Wi-Fi QR Embedding Walkthrough

RealWear devices have no text-input UI during the AOSP enrollment flow, so the staging Wi-Fi credentials MUST be embedded in the QR payload — there is no opportunity for the operator or end user to type an SSID and password on the headset.

1. **Why Wi-Fi must be embedded (not interactive).** The RealWear enrollment flow runs before any voice-driven UI is available for arbitrary text input. The headset boots, scans the QR, and immediately attempts to join the network specified in the QR's Wi-Fi block. There is no "skip Wi-Fi" or "type credentials" branch — if the QR contains no Wi-Fi block (or a wrong one), the device cannot reach `intunecdnpeasd.manage.microsoft.com` and stalls.

2. **Where in the Intune admin center to configure the QR with Wi-Fi.** Navigate: **Intune admin center** > **Devices** > **Android** > **Enrollment** > **Corporate-owned dedicated devices** (or **Corporate-owned, user-associated** depending on the AOSP mode chosen at Step 1) > **Token** > select the AOSP profile > **Wi-Fi configuration** sub-pane within the AOSP QR generator UI. <!-- verify UI at execute time --> The Wi-Fi block lives inside the AOSP QR generator pane itself — it is NOT a separate Wi-Fi profile under **Devices** > **Configuration** > **Wi-Fi**, and it is NOT pushed via a device-restrictions profile (those mechanisms apply *post-enrollment*, after the device is already on the network).

3. **Supported Wi-Fi auth types for staging (RealWear-specific constraint).** **WPA-PSK, WPA2-PSK, WPA3 ONLY — NOT EAP-PEAP, NOT EAP-TLS.** Per RealWear's authoritative support guidance: "the staging network MUST BE a WPA/WPA2 PSK/WPA3 network type, meaning there is an SSID and Password only." `[HIGH: support.realwear.com/knowledge/enrolling-in-microsoft-intune, last_verified 2026-04-25]` Corporate EAP networks (PEAP-MSCHAPv2, EAP-TLS with certificates, etc.) cannot be embedded in the AOSP staging QR for RealWear; deploy those networks via a post-enrollment Intune **Devices** > **Configuration** > **Wi-Fi** profile that lands once the device is enrolled and reachable on the staging network.

4. **Failure mode: Wi-Fi absent from QR.** Device hangs at "Connecting to Intune" — no error surface, no retry prompt, no fallback to interactive Wi-Fi picker. Recovery: factory-reset the headset, regenerate the QR with the Wi-Fi block populated, re-scan.

    > **What breaks if misconfigured:** QR generated without the Wi-Fi block populated → device cannot join the network and stalls indefinitely at "Connecting to Intune". Recovery: factory-reset the device, regenerate the QR with embedded staging Wi-Fi (SSID + PSK), re-scan. Symptom appears in: device-side stall with no Intune-side telemetry (the device never reached the enrollment server).

5. **Failure mode: wrong Wi-Fi credentials in QR (or non-PSK auth attempted).** Silent timeout — the headset does not surface "wrong password" or "auth failed" to the operator. Recovery: factory-reset, verify the SSID and PSK at the staging access point, regenerate the QR with corrected credentials (and confirm auth type is WPA-PSK / WPA2-PSK / WPA3, not EAP), re-scan.

    > **What breaks if misconfigured:** SSID typo, wrong PSK, or EAP-PEAP / EAP-TLS configured against RealWear's PSK-only staging requirement → silent timeout with no retry UI on the headset. Recovery: same as Wi-Fi-absent failure above, plus verify SSID/PSK match the staging access point and confirm auth type is one of WPA-PSK / WPA2-PSK / WPA3. Symptom appears in: device-side silent timeout (no auth-failure dialog) and access-point client log (zero successful associations from the headset MAC).

<a id="verification"></a>
## Verification

1. Sign in to the [Intune admin center](https://endpoint.microsoft.com). <!-- verify UI at execute time -->
2. Navigate to **Devices** > **All devices**, filter by **Platform = Android**, and search by serial number (the RealWear serial is on the chassis label). <!-- verify UI at execute time -->
3. Confirm the device row shows **Enrolled** status with the expected AOSP mode in the Owner column (user-associated or dedicated/userless).
4. Wait up to ~15 minutes from first boot for the initial compliance state to populate; confirm the **Compliance** column reports the expected verdict per your tenant's compliance policy.
5. (If hybrid with RealWear Cloud) Sign in to the [RealWear Cloud admin portal](https://portal.realwear.com) and confirm the device also appears there with the same serial number — RealWear Cloud and Intune coexist; the device is visible in both surfaces.
6. (If Microsoft Teams for HMT was deployed) Confirm the Teams app is present on the headset's home screen via voice-driven UI (Teams is delivered via RealWear Cloud, not via Intune app deployment).

<a id="common-failures"></a>
## Common Failures

RealWear devices are supported under AOSP because no GMS; if GMS is present, use Android Enterprise fully managed instead. The failure modes below are scoped to the AOSP enrollment surface.

| Symptom | Likely Cause | Recovery | Severity |
|---|---|---|---|
| Device hangs at "Connecting to Intune" with no error surface | Wi-Fi absent from QR, wrong PSK, or non-PSK auth attempted (EAP-PEAP / EAP-TLS) | Factory-reset; regenerate QR with valid PSK Wi-Fi (WPA-PSK / WPA2-PSK / WPA3); re-scan. See [Wi-Fi QR Embedding Walkthrough](#wi-fi-qr-embedding). | CRITICAL |
| Device joins network but never appears in Intune admin center | Staging token expired (userless = 90-day ceiling), wrong AOSP enrollment profile selected at Step 1, or token assigned to wrong device-set scope | Regenerate token in Intune; redistribute QR; verify profile scope covers the device. | HIGH |
| Userless token expired at 90 days | Userless AOSP tokens have a 90-day MS Learn-imposed ceiling (asymmetric vs user-associated 65-year max) | Regenerate the userless token in Intune admin center; previously enrolled devices are unaffected — only new enrollments fail. | HIGH |
| Device appears in Intune but not in RealWear Cloud | RealWear Cloud account missing or hybrid coexistence not configured | Provision a RealWear Cloud account at support.realwear.com; re-pair the device via RealWear Cloud admin portal. `[MEDIUM: RealWear support / community, last_verified 2026-04-25]` | MEDIUM |
| Microsoft Teams app missing on HMT after enrollment | Teams for HMT is distributed exclusively through RealWear Cloud (not via Intune Managed Apps) | Provision RealWear Cloud account, deploy Teams for HMT via RealWear Cloud, OR use a vendor-side app delivery mechanism. `[HIGH: support.realwear.com/knowledge/faq-intune-aosp, last_verified 2026-04-25]` | MEDIUM |
| QR scan succeeds but device shows wrong AOSP mode (user-associated vs userless) | Wrong AOSP enrollment surface chosen at Step 1 | Delete the AOSP profile, re-create on the correct surface (Corporate-owned dedicated for userless, Corporate-owned user-associated for named-user), regenerate QR. | HIGH |

<a id="renewal-maintenance"></a>
## Renewal / Maintenance

| Component | Renewal Period | Consequence of Lapse | Renewal Steps |
|---|---|---|---|
| Userless AOSP enrollment token | 90 days max (MS Learn-imposed ceiling for userless mode) | New userless enrollments fail; previously enrolled devices unaffected | Regenerate token via Intune admin center > Devices > Android > Enrollment > Corporate-owned dedicated devices > Token; redistribute QR to staging operators |
| User-associated AOSP enrollment token | Up to 65 years (configured at profile creation) | New user-associated enrollments fail | Regenerate via the same UI path; redistribute QR |
| Intune Plan 2 / Suite licensing | Per Microsoft Customer Agreement renewal cycle | New device enrollments blocked; existing enrolled devices retain compliance until license fully lapses | Renew via Microsoft 365 admin center > Billing |
| RealWear Cloud account (OPTIONAL coexistence) | RealWear-portal-perpetual once provisioned | Microsoft Teams app delivery via RealWear Cloud blocked; Intune-direct enrollment unaffected | Re-provision via support.realwear.com |
| Doc freshness | 60 days (Phase 34 D-14 / D-26) | Stale guidance risk | Re-fetch sources cited in this doc; update `last_verified` and `review_by` frontmatter |

<a id="what-breaks-summary"></a>
## What Breaks Summary

Inline what-breaks callouts at each decision point. Severity descending within each source section.

| Misconfiguration | Section | Severity |
|------------------|---------|----------|
| Wi-Fi credentials NOT embedded in AOSP QR | [Step 2](#provisioning-steps) | CRITICAL |
| Staging Wi-Fi configured with EAP-PEAP / EAP-TLS instead of PSK | [Wi-Fi QR Embedding Walkthrough](#wi-fi-qr-embedding) | CRITICAL |
| Userless token allowed to lapse beyond 90 days | [Renewal / Maintenance](#renewal-maintenance) | HIGH |
| AOSP enrollment profile assigned wrong device set | [Step 1](#provisioning-steps) | HIGH |
| Intune Plan 1 only (no AR/VR specialty entitlement) | [Prerequisites and Licensing](#prerequisites) | MEDIUM |
| RealWear Cloud account missing for Teams delivery | [Common Failures](#common-failures) | MEDIUM |

## See Also

- [AOSP Stub](06-aosp-stub.md) — AOSP scope context
- [AOSP OEM Matrix](../reference/aosp-oem-matrix.md) — cross-OEM AOSP capability mapping
- [Android Capability Matrix](../reference/android-capability-matrix.md) — overall Android mode capability landscape
- [Android Glossary](../_glossary-android.md) — AOSP / OEMConfig / GMS terminology
- [Android Enrollment Overview](../android-lifecycle/00-enrollment-overview.md#aosp) — placement of AOSP within the Android enrollment lifecycle

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-04-25 | Initial version (Phase 45 AEAOSPFULL-01) — RealWear AOSP admin guide for HMT-1 / HMT-1Z1 / Navigator 500. PITFALL-7 framing inline per D-04 + D-23. REQUIRED `## Wi-Fi QR Embedding Walkthrough` add-on H2 per D-02 with PSK-only NOT-EAP staging-Wi-Fi discipline (RealWear authoritative). 11-H2 sibling parity per D-01. Anchor scaffolding per D-05. Frontmatter contract per D-27. Sourced from PHASE-45-AOSP-SOURCE.md (Phase 43 → Phase 45 lifecycle; deleted in Plan 10 final commit per Phase 43 D-20). | -- |

---

*Wave 3 runbook 29 (Cause A) and L2 runbook 23 (Pattern A) cross-link landing targets: [`#common-failures`](#common-failures) and [`#wi-fi-qr-embedding`](#wi-fi-qr-embedding) anchors above are stable per D-05 anchor-scaffolding contract.*
