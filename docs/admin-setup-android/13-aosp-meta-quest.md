---
last_verified: 2026-04-25
review_by: 2026-06-24
audience: admin
platform: Android
applies_to: AOSP
---

> **Platform gate:** Meta Quest AOSP device management — Quest 2 / Quest 3 / Quest 3s / Quest Pro enterprise XR headsets in Microsoft Intune via 4-portal pattern (Intune + Meta for Work). For Windows Autopilot, see [Windows Admin](../admin-setup/00-overview.md). For macOS ADE, see [macOS Admin](../admin-setup-macos/00-overview.md). For iOS/iPadOS, see [iOS Admin](../admin-setup-ios/00-overview.md).
> **Platform note:** AOSP management is a distinct surface from Android Enterprise (COBO/BYOD/Dedicated/ZTE) — no GMS, no FCM push, no Managed Google Play. See [Android enrollment overview](../android-lifecycle/00-enrollment-overview.md#aosp).

<!-- The #### In Managed Google Play subsection is intentionally omitted.
     AOSP does not use Managed Google Play (no Google Mobile Services). The 4-portal
     Meta Quest pattern uses Meta for Work as the 4th portal alongside Intune; MGP
     remains N/A for AOSP devices including Meta Quest. -->

<!-- The #### In Zero-Touch portal subsection is intentionally omitted.
     AOSP does not use the Zero-Touch portal; AOSP enrollment is QR-only, one device at
     a time. The 4-portal Meta Quest pattern uses Meta for Work as the 4th portal
     alongside Intune; ZT remains N/A for AOSP devices including Meta Quest. -->

# Configure Meta Quest AOSP Devices in Intune

## Scope and Status

Meta Quest 2, Quest 3, Quest 3s, and Quest Pro are supported under AOSP in Intune because they have no GMS. If GMS is present on a target device, use Android Enterprise fully managed (COBO) instead — these devices are not supported under AOSP when GMS is available. `[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-25]`

Meta's enterprise AR/VR headsets are positioned for enterprise XR — training, collaboration (Horizon Workrooms), and frontline. The Meta Quest pattern uses 4 portals: Microsoft Intune + Meta for Work (Managed Google Play and Zero-Touch portal are N/A for AOSP devices). Among the five AR/VR-class AOSP OEMs (RealWear / Zebra / Pico / HTC / Meta Quest), Meta Quest carries the heaviest portal-coexistence story because the Meta for Work portal is the vendor-side organization, fleet-mapping, app/policy delivery, and Meta Horizon Managed Services (HMS) license-administration surface — REQUIRED for the canonical 4-portal pattern. `[HIGH: AEAOSPFULL-05 + meta.com/blog/an-update-on-meta-for-work, last_verified 2026-04-25]`

> ⚠️ **Meta Horizon Managed Services wind-down — Feb 20, 2026 transition.** As of February 20, 2026, Meta no longer sells commercial Quest SKUs and HMS subscriptions are FREE through January 4, 2030 (maintenance mode). The 4-portal pattern (Intune + Meta for Work) remains operational; net-new fleets may use Intune-direct AOSP enrollment as a vendor-independent fallback. Re-verify the wind-down assertion every 30 days (next: 2026-05-25). See [Meta Horizon Subscription Status](#meta-horizon-subscription-status) below. `[HIGH: meta.com/blog/an-update-on-meta-for-work + managexr.com Help Center, last_verified 2026-04-25]`

<a id="hardware-scope"></a>
## Hardware Scope

Meta's Intune-supported Quest headsets are supported under AOSP because no GMS; if GMS is present, use Android Enterprise fully managed instead. The four supported SKUs differ in regional availability — Quest 2, Quest 3, and Quest Pro carry the explicit "Available in select regions only" restriction per Microsoft's AOSP supported-devices list, while Quest 3s carries no region restriction.

| Device | Minimum Firmware | Type | Regional Restriction |
|---|---|---|---|
| <a id="quest-2-regional"></a>Meta Quest 2 | v49 | AR/VR Headset | Available in select regions only `[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-25]` |
| <a id="quest-3-regional"></a>Meta Quest 3 | v59 | AR/VR Headset | Available in select regions only `[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-25]` |
| <a id="quest-3s-regional"></a>Meta Quest 3s | v71 | AR/VR Headset | No region restriction `[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-25]` |
| <a id="quest-pro-regional"></a>Meta Quest Pro | v49 | AR/VR Headset | Available in select regions only `[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-25]` |

`[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-25]`

For Quest 2, Quest 3, and Quest Pro, confirm regional availability before procurement and rollout — Meta's region list is published at [`work.meta.com/help/307276701907179`](https://work.meta.com/help/307276701907179). The MS Learn AOSP supported-devices list is the authoritative gate for what Intune will accept; even where Meta supports a region operationally, Intune AOSP enrollment requires the SKU + region combination to be on Microsoft's list. Quest 3s is the only Meta Quest SKU with no MS-Learn-imposed region restriction.

**Hardware availability.** Commercial Quest SKUs (work-tier) discontinued for sale starting 2026-02-20; consumer Quest 3 / 3s remain purchasable AND can be enrolled via HMS+ManageXR or via Intune-direct AOSP. Existing commercial Quest fleets continue to operate; the wind-down only affects net-new commercial-SKU procurement, not existing inventory. See [Meta Horizon Subscription Status](#meta-horizon-subscription-status) for the full transformation context. `[HIGH: meta.com/blog/an-update-on-meta-for-work, last_verified 2026-04-25]`

<a id="prerequisites"></a>
## Prerequisites and Licensing

- **Microsoft Intune Plan 2 OR Intune Suite** — Meta Quest AR/VR headsets fall under Microsoft's specialty-device licensing tier; AR/VR headsets are explicitly named in MS Learn's specialty-devices-with-intune scope, and Intune Plan 1 alone does not entitle the tenant to manage Meta Quest hardware. `[HIGH: MS Learn specialty-devices-with-intune, last_verified 2026-04-25]`
- **Microsoft Entra ID tenant** with Intune Administrator role available to the admin authoring the AOSP enrollment profile.
- **Meta for Work account** — REQUIRED for the canonical 4-portal pattern (Intune + Meta for Work); FREE post-2026-02-20 per the HMS transformation. The Meta for Work portal is the vendor-side organization, Quest fleet mapping, Meta-specific app/policy delivery, and HMS license-administration surface. See [Meta Horizon Subscription Status](#meta-horizon-subscription-status) add-on H2 below for the full subscription-status context. `[HIGH: meta.com/blog/an-update-on-meta-for-work, last_verified 2026-04-25]`
- **Optional fallback — Intune-direct AOSP enrollment WITHOUT HMS.** A vendor-independent path for net-new fleets that prefer not to use HMS at all. The fallback path uses Intune AOSP enrollment + Microsoft 365 app delivery + standard MDM controls without any Meta for Work portal coexistence; Meta-specific app delivery (e.g., Horizon Workrooms vendor-side configuration) is unavailable in this mode. See [Meta for Work Portal Setup](#meta-for-work-portal-setup) for the parallel-path discussion.
- **Staging Wi-Fi network on-site** that the headset can join during enrollment. Meta Quest headsets have an interactive Wi-Fi setup UI in their first-boot enrollment flow, so embedding Wi-Fi credentials in the AOSP QR is OPTIONAL for Meta Quest (it helps zero-touch staging but is not strictly required — operators can complete Wi-Fi join interactively if the QR omits the Wi-Fi block). `[MEDIUM: AR/VR pattern + Meta for Work setup docs imply both, last_verified 2026-04-25]`

## Enrollment Method

QR-only AOSP enrollment, one device at a time. Wi-Fi embedding in the QR is OPTIONAL for Meta Quest (interactive Wi-Fi setup UI is available); embedding helps zero-touch staging but is not strictly required. `[MEDIUM, last_verified 2026-04-25]`

The Meta Quest headsets are supported under AOSP because no GMS; if GMS is present, use Android Enterprise fully managed instead. BOTH **user-associated** and **userless** AOSP enrollment modes are supported (the typical AR/VR pattern). Choose user-associated when each headset is checked out to a named operator (compliance and Conditional Access then bind to that user); choose userless for shared-pool fleets used in training rooms or simulation labs where multiple operators rotate through the same hardware. `[MEDIUM: AR/VR pattern, last_verified 2026-04-25]`

**4-portal pattern (REQUIRED context).** Meta Quest fleets coordinate across 4 portals: Microsoft Intune (enrollment + MDM); Meta for Work (Quest fleet management); Managed Google Play (N/A — AOSP has no MGP); Zero-Touch portal (N/A — AOSP is QR-only). The 4-portal pattern parallels the Phase 44 Knox-as-4th-portal overlay (Knox Admin Portal + Intune + MGP + ZT for Samsung KME); the Meta variant substitutes Meta for Work for Knox Admin Portal and reflects MGP/ZT N/A for AOSP. The 4-portal model is preserved post-2026-02-20 because Meta for Work HMS becomes FREE rather than discontinued — the portal remains operational. `[HIGH: AEAOSPFULL-05 + meta.com/blog/an-update-on-meta-for-work, last_verified 2026-04-25]`

<a id="provisioning-steps"></a>
## Provisioning Steps

### Step 0 — Meta for Work account approval (variable latency; verify at vendor onboarding time)

Submit your Meta for Work account application at the start of the enrollment cycle. Meta for Work approval has variable latency depending on region, applicant type, and the post-2026-02-20 free-tier onboarding flow; verify current latency expectations at vendor onboarding time before scheduling deployment.

**Submit your Meta for Work application:**

1. Navigate to the [Meta for Work portal](https://www.meta.com/meta-for-work/) and select **Get started** to open the corporate-email-bound application form. <!-- verify UI at execute time -->
2. Submit the application with corporate-email-bound credentials; record the application reference for follow-up.
3. While waiting, productively use the wait window:
   - Read the rest of this guide (Steps 1-4 + the Meta for Work Portal Setup and Meta Horizon Subscription Status add-on H2s) to align on 4-portal mechanics, HMS license posture, and Intune-direct fallback decision.
   - Identify the Meta Quest devices in scope: serial numbers, models (Quest 2 / 3 / 3s / Pro), and target regions (Quest 2 / 3 / Pro require regional availability per [Hardware Scope](#hardware-scope)).
   - Coordinate with your Meta integration partner (e.g., ManageXR) if your fleet uses HMS+partner deployment.
   - Decide between (a) HMS-FREE + Meta for Work coexistence and (b) Intune-direct AOSP enrollment as the parallel-path option.

    > **What breaks if misconfigured:** Submitting Meta for Work application late delays the entire enrollment cycle. Recovery: submit on Day 0; if Meta approval is delayed, verify per-region onboarding processes via Meta for Work support. Symptom appears in: Meta for Work portal sign-in returns "Account pending approval".

### Step 1 — Create AOSP enrollment profile in Intune

1. Sign in to the [Intune admin center](https://endpoint.microsoft.com). <!-- verify UI at execute time -->
2. Navigate to **Devices** > **Android** > **Enrollment**. <!-- verify UI at execute time -->
3. Choose the AOSP enrollment surface: **Corporate-owned dedicated devices (AOSP)** for shared-pool training-room headsets (userless), or **Corporate-owned, user-associated (AOSP)** for named-operator assignment. <!-- verify UI at execute time -->
4. Select **Token**. Configure profile name (e.g., `AOSP-Meta-Quest-3-Training`), token expiry (userless = 90 days max; user-associated = up to 65 years), and target device-set scope.
5. Save the profile; do NOT generate the QR yet — Step 2 decides whether to embed Wi-Fi in the QR (OPTIONAL for Meta Quest).

    > **What breaks if misconfigured:** Choosing the wrong AOSP enrollment surface (e.g., user-associated when the headsets are training-room shared pool) produces compliance and Conditional Access bindings to a phantom user, and the staging-token expiry is asymmetric — userless caps at 90 days while user-associated allows up to 65 years. Recovery: delete the profile, re-create on the correct surface; previously enrolled devices are unaffected. Symptom appears in: Intune admin center > Devices > Android (devices show wrong enrollment mode in the Owner column).

### Step 2 — Generate the AOSP QR code (Wi-Fi embedding OPTIONAL for Meta Quest)

1. From the saved AOSP enrollment profile, choose **Generate QR code**. <!-- verify UI at execute time -->
2. Decide whether to embed Wi-Fi credentials. For zero-touch staging (operator scans QR and walks away while the headset enrolls), embed the staging Wi-Fi block. For lighter-touch staging where the operator can use the headset's interactive Wi-Fi UI at first-boot, omit the Wi-Fi block — Meta Quest devices have an interactive Wi-Fi setup UI that handles join during enrollment.
3. If embedding Wi-Fi: enter SSID + auth type (typically WPA2-PSK or WPA3-Personal) + PSK. Verify against the staging access point configuration before saving.
4. Download the QR image as PNG. Distribute via a secure channel — the QR contains the staging enrollment token (and Wi-Fi PSK if embedded); treat it as a credential.

    > **What breaks if misconfigured:** QR shared via insecure channel (mass email, public chat) leaks the staging token (and Wi-Fi PSK if embedded). Recovery: regenerate the staging token in Intune (invalidates the leaked QR), rotate the staging Wi-Fi PSK if embedded, redistribute the new QR via a secure channel. Symptom appears in: unexpected enrollments from out-of-policy devices, staging-Wi-Fi unauthorized client list.

### Step 3 — Configure Meta for Work device enrollment

1. Sign in to the [Meta for Work portal](https://www.meta.com/meta-for-work/) using the Step 0 corporate-email-bound credentials. <!-- verify UI at execute time -->
2. Navigate to the device-enrollment view and locate your Quest organization (created during Meta for Work Portal Setup — see [Meta for Work Portal Setup](#meta-for-work-portal-setup) below).
3. Map the in-scope Quest device serials to your Quest organization fleet so that Meta-specific app delivery and HMS-managed policy can target the device set. Cross-reference [Meta for Work Portal Setup](#meta-for-work-portal-setup) for the organization + fleet creation walkthrough that this step depends on.
4. Confirm the HMS license posture for the fleet (FREE post-2026-02-20 — see [Meta Horizon Subscription Status](#meta-horizon-subscription-status)) and verify Meta-specific app delivery scope (e.g., Horizon Workrooms) is authored against the correct fleet.
5. Save the Meta-for-Work fleet mapping; the device is now reciprocally registered in both Intune (after Step 4 enrollment) and Meta for Work.

    > **What breaks if misconfigured:** Meta for Work organization not mapped to Quest fleet → Meta-specific app delivery fails. Recovery: complete portal setup before Step 4 device enrollment. Symptom appears in: Quest fleet view in Meta for Work portal shows zero devices after Step 4 completes.

### Step 4 — Provision the device by scanning the QR (one device per QR)

1. Power on the Meta Quest headset out-of-box (factory-reset state if previously enrolled). The headset boots into its first-time setup flow.
2. Navigate to the headset's QR-scan / device-management entry point per the model's setup guide (Quest 2 / 3 / 3s / Pro expose the AOSP enrollment QR scanner during initial provisioning). <!-- verify UI at execute time -->
3. Position the QR image so the headset's onboard cameras can capture it. The headset confirms the scan with an on-display acknowledgment.
4. If Wi-Fi was NOT embedded in the QR, complete Wi-Fi join via the headset's interactive Wi-Fi UI when prompted.
5. Wait for the AOSP enrollment handshake with Intune. Typical enrollment window is **~15 minutes** from scan to "Enrolled" status in Intune admin center.
6. The headset boots into the configured AOSP mode (user-associated or userless). For user-associated mode, the assigned operator signs in at first use. Repeat per device — AOSP enrollment is one-device-per-QR-scan; bulk enrollment is not supported under AOSP.

    > **What breaks if misconfigured:** Device shows "Connecting to Intune" past the ~15-minute window with no progression → typically token (Step 1 expiry / wrong-mode), Wi-Fi (Step 2) misconfiguration, region-availability mismatch (Quest 2 / 3 / Pro deployed in non-supported region per [Hardware Scope](#hardware-scope)), or Meta for Work organization not mapped (Step 3). Recovery: factory-reset the headset, verify token validity, re-confirm regional availability, verify Meta for Work mapping, regenerate the QR if needed, re-scan. Symptom appears in: device-side "Connecting to Intune" stall (no progression past handshake screen).

<a id="meta-for-work-portal-setup"></a>
## Meta for Work Portal Setup

Meta for Work is the vendor-side portal where Quest organization, fleet device-mapping, app/policy delivery configuration, and HMS license management are administered. As of Feb 20, 2026, Meta for Work HMS subscriptions are FREE — the portal remains operational; only the paid commercial-SKU + paid HMS subscription model has wound down. `[HIGH: meta.com/blog/an-update-on-meta-for-work + managexr.com Help Center, last_verified 2026-04-25]`

**Setup walkthrough:**

1. Navigate to the [Meta for Work portal](https://www.meta.com/meta-for-work/) (after Step 0 account approval). <!-- verify UI at execute time -->
2. Register or sign in to your Quest organization using the corporate-email-bound credentials approved at Step 0.
3. Create or import the Quest device fleet — map serial-number ranges, model classes (Quest 2 / 3 / 3s / Pro), and per-fleet target regions (Quest 2 / 3 / Pro need regional availability per [Hardware Scope](#hardware-scope)).
4. Assign HMS license to the fleet — FREE post-2026-02-20 per the HMS transformation; existing paid HMS subscriptions stop being billed at the transition date and convert to FREE access through 2030-01-04. See [Meta Horizon Subscription Status](#meta-horizon-subscription-status) for the full context.
5. Configure Meta-specific app delivery (e.g., Horizon Workrooms, Workplace integrations) and Meta-side policy through Meta for Work in coordination with the Intune-side AOSP enrollment configured at Step 1.

**Meta for Work + Intune coexistence.** Intune handles AOSP enrollment + Microsoft 365 app delivery + standard MDM controls (passcode, network, compliance, Conditional Access) + tenant-side reporting; Meta for Work handles Meta-specific app delivery (Horizon Workrooms, Workplace integrations, vendor-side Quest fleet management). Both portals are required for full enterprise Quest fleet management under the canonical 4-portal pattern. `[HIGH: meta.com/blog/an-update-on-meta-for-work, last_verified 2026-04-25]`

**Intune-direct fallback (parallel-path option).** For net-new fleets that prefer vendor-independent management, Intune-direct AOSP enrollment WITHOUT HMS is a parallel-path option. Existing HMS subscribers continue uninterrupted (HMS subscription becomes FREE at Feb 20, 2026 transition; existing fleets retain access through Jan 4, 2030 maintenance mode). The Intune-direct path drops Meta-for-Work coexistence; it is appropriate when the fleet does not need Meta-specific app delivery or Quest fleet management at the vendor side and prefers a single-vendor MDM surface.

> **What breaks if misconfigured:** Meta for Work organization not mapped to Quest fleet → Meta-specific app delivery fails. Recovery: complete portal setup before Step 3 device enrollment. Symptom appears in: Quest fleet view in Meta for Work portal shows zero devices.

<a id="meta-horizon-subscription-status"></a>
## Meta Horizon Subscription Status

As of Feb 20, 2026, Meta no longer sells commercial Quest SKUs. HMS becomes free for managing consumer Quest 3 / Quest 3s through ManageXR or direct deployment. HMS infrastructure enters maintenance mode through Jan 4, 2030. Net-new fleets MAY use Intune-direct AOSP enrollment instead of HMS for vendor-independent management. `[HIGH: meta.com/blog/an-update-on-meta-for-work + managexr.com Help Center, last_verified 2026-04-25]`

**Verbatim Meta-source quotes:**

- "Horizon managed services and commercial SKUs of Meta Quest will no longer be available for sale" starting February 20, 2026. `[HIGH: meta.com/blog/an-update-on-meta-for-work, last_verified 2026-04-25]`
- "HMS licenses will be available for free" beginning February 20, 2026 via [`meta.com/meta-for-work/`](https://www.meta.com/meta-for-work/). `[HIGH: meta.com/blog/an-update-on-meta-for-work, last_verified 2026-04-25]`
- Existing customers retain access "through January 4, 2030, with ongoing support during this period." `[HIGH: meta.com/blog/an-update-on-meta-for-work, last_verified 2026-04-25]`
- "Maintenance mode through January 4, 2030"; "bug fixes + support, but no new platform capabilities". `[HIGH: managexr.com Help Center, last_verified 2026-04-25]`

**Net-new fleet decision tree:**

- **Existing HMS subscribers:** continue uninterrupted; HMS subscription becomes FREE at Feb 20, 2026 (existing paid HMS billing stops at the transition date); access retained through 2030-01-04 in maintenance mode (bug fixes + support; no new platform capabilities).
- **Net-new fleets, consumer Quest 3 / 3s preferred:** HMS-FREE + ManageXR-or-direct path remains available. Consumer Quest 3 / 3s remain purchasable post-2026-02-20 and can be enrolled via HMS+ManageXR or via Intune-direct AOSP. This is the recommended path for fleets that want both Microsoft tenant management and Meta-specific app delivery without procurement friction.
- **Net-new fleets, vendor-independent:** Intune-direct AOSP enrollment (no HMS dependency). Appropriate when the fleet does not need Meta-specific app delivery or Quest fleet management at the vendor side and prefers a single-vendor MDM surface.

**Re-verify trigger note.** This assertion is re-verified every 30 days per D-10 special case (next forward re-verify: 2026-05-25). See [Renewal / Maintenance](#renewal-maintenance) below for the explicit 30-day cadence row in addition to the standard 60-day doc-freshness cycle.

<a id="verification"></a>
## Verification

1. Sign in to the [Intune admin center](https://endpoint.microsoft.com). <!-- verify UI at execute time -->
2. Navigate to **Devices** > **All devices**, filter by **Platform = Android**, and search by serial number (the Meta Quest serial is on the chassis label and in **Settings > About** on the headset). <!-- verify UI at execute time -->
3. Confirm the headset row shows **Enrolled** status with the expected AOSP mode in the Owner column (user-associated or dedicated/userless).
4. Confirm the AOSP enrollment profile from Step 1 is applied — Intune admin center > Devices > select Meta Quest headset > Device configuration shows the profile assignment status. <!-- verify UI at execute time -->
5. Sign in to the [Meta for Work portal](https://www.meta.com/meta-for-work/) and confirm the device also appears in the Quest fleet view with the same serial number (4-portal coexistence: Intune AND Meta for Work both report the device). <!-- verify UI at execute time -->
6. Wait up to ~15 minutes from first boot for the initial compliance state to populate; confirm the **Compliance** column reports the expected verdict per your tenant's compliance policy.

<a id="common-failures"></a>
## Common Failures

Meta Quest enterprise headsets are supported under AOSP because no GMS; if GMS is present, use Android Enterprise fully managed instead. The failure modes below are scoped to the 4-portal AOSP enrollment + Meta for Work coexistence surface for the four Meta Quest SKUs; the Intune-direct fallback failure modes are noted where they differ.

| Symptom | Likely Cause | Recovery | Severity |
|---|---|---|---|
| Meta for Work account not approved before Step 3 portal configuration or Step 4 device enrollment | Step 0 application not submitted at Day 0; approval latency exceeds the deployment schedule | Submit Meta for Work application at Day 0; if approval is delayed, verify per-region onboarding processes via Meta for Work support; consider Intune-direct fallback (no HMS dependency) for the affected fleet to unblock deployment. `[HIGH: meta.com/blog/an-update-on-meta-for-work, last_verified 2026-04-25]` | CRITICAL |
| Quest 2, Quest 3, or Quest Pro deployed in a region without availability per [Hardware Scope](#hardware-scope) | Regional restriction not verified at procurement; Quest 2 / 3 / Pro carry the "Available in select regions only" MS-Learn restriction; only Quest 3s has no region restriction | Re-procure into a supported region OR substitute Quest 3s (no region restriction) for the affected sub-fleet. Quest hardware purchased in unsupported regions cannot be retroactively enrolled into Intune AOSP. `[HIGH: MS Learn AOSP supported devices + work.meta.com/help/307276701907179, last_verified 2026-04-25]` | HIGH |
| Commercial Quest SKU procurement attempted post-2026-02-20 | Commercial Quest SKUs (work-tier) discontinued for sale starting 2026-02-20; the wind-down only affects net-new commercial-SKU procurement, not existing inventory | For net-new procurement, switch to consumer Quest 3 / 3s (remain purchasable; can be enrolled via HMS+ManageXR or via Intune-direct AOSP — see [Meta Horizon Subscription Status](#meta-horizon-subscription-status)). Existing commercial Quest fleets continue to operate. `[HIGH: meta.com/blog/an-update-on-meta-for-work, last_verified 2026-04-25]` | HIGH |
| Userless token expired at 90 days | Userless AOSP tokens have a 90-day MS Learn-imposed ceiling (asymmetric vs user-associated 65-year max) | Regenerate the userless token in Intune admin center > Devices > Android > Enrollment > Corporate-owned dedicated devices > Token; redistribute QR. Previously enrolled headsets are unaffected — only new enrollments fail. `[HIGH: MS Learn setup-aosp-corporate-userless, last_verified 2026-04-25]` | HIGH |
| Userless enrollment used in a region without availability | Region-restricted Quest SKU (Quest 2 / 3 / Pro) deployed in unsupported region under userless mode; combination compounds region-availability and token-management risk | Re-confirm regional availability per [Hardware Scope](#hardware-scope) before generating the userless token; substitute Quest 3s for affected sub-fleets where regional availability is uncertain. `[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-25]` | HIGH |
| Device enrolled in Intune but not in Meta for Work fleet view | Step 3 Meta for Work organization-to-fleet mapping not completed; device reaches Intune but the vendor-side Meta-for-Work fleet view shows zero devices | Complete [Meta for Work Portal Setup](#meta-for-work-portal-setup) walkthrough, then redo Step 3 to map serials to the Quest organization fleet; the device will appear in both Intune AND Meta for Work after mapping is saved. `[HIGH: meta.com/blog/an-update-on-meta-for-work, last_verified 2026-04-25]` | MEDIUM |
| HMS subscription status confused (admin assumes HMS shut down rather than transformed-to-FREE) | Pre-2026-02-20 messaging conflated wind-down of commercial-SKU sales with discontinuation of HMS infrastructure; HMS infrastructure remains operational through 2030-01-04 in FREE maintenance mode | Re-read [Meta Horizon Subscription Status](#meta-horizon-subscription-status); confirm HMS is FREE post-2026-02-20 (NOT shut down); existing HMS subscribers continue uninterrupted with billing stopping at the transition date. `[HIGH: meta.com/blog/an-update-on-meta-for-work + managexr.com Help Center, last_verified 2026-04-25]` | MEDIUM |

<a id="renewal-maintenance"></a>
## Renewal / Maintenance

| Component | Renewal Period | Consequence of Lapse | Renewal Steps |
|---|---|---|---|
| Userless AOSP enrollment token | 90 days max (MS Learn-imposed ceiling for userless mode) | New userless Meta Quest enrollments fail; previously enrolled headsets unaffected | Regenerate token via Intune admin center > Devices > Android > Enrollment > Corporate-owned dedicated devices > Token; redistribute QR to staging operators |
| User-associated AOSP enrollment token | Up to 65 years (configured at profile creation) | New user-associated Meta Quest enrollments fail | Regenerate via the same UI path; redistribute QR |
| Intune Plan 2 / Suite licensing | Per Microsoft Customer Agreement renewal cycle | New device enrollments blocked; existing enrolled devices retain compliance until license fully lapses | Renew via Microsoft 365 admin center > Billing |
| Meta for Work HMS license | FREE post-2026-02-20; maintenance mode through 2030-01-04; renewal N/A under FREE tier (no billing surface) | None during maintenance window; assertion re-verify cadence below ensures any post-2030-01-04 lifecycle change is caught at the 30-day boundary | No renewal action required during 2026-02-20 → 2030-01-04 window; re-verify via the 30-day cadence row below |
| Doc freshness | 60 days (Phase 34 D-14 / D-26) | Stale guidance risk on firmware floors / regional restrictions / 4-portal mechanics / MS Learn AOSP supported-devices list shifts | Re-fetch sources cited in this doc (MS Learn AOSP supported devices, meta.com/meta-for-work, work.meta.com/help/307276701907179); update `last_verified` and `review_by` frontmatter |
| Meta Horizon Managed Services wind-down assertion | 30-day re-verify (special case per D-10; standard 60-day applies elsewhere in this doc) | Outdated guidance on commercial-SKU sales / HMS free-tier transition / 2030-01-04 maintenance-mode end | Re-fetch [meta.com/blog/an-update-on-meta-for-work](https://www.meta.com/blog/an-update-on-meta-for-work); verify dates have not shifted; update `## Scope and Status` callout accordingly |

<a id="what-breaks-summary"></a>
## What Breaks Summary

Inline what-breaks callouts at each decision point. Severity descending within each source section.

| Misconfiguration | Section | Severity |
|------------------|---------|----------|
| Meta for Work account not approved before Step 3 / Step 4 (Step 0 not submitted Day 0) | [Step 0](#provisioning-steps) | CRITICAL |
| Quest 2 / 3 / Pro deployed in a region without availability | [Hardware Scope](#hardware-scope) | HIGH |
| Commercial Quest SKU procurement attempted post-2026-02-20 | [Meta Horizon Subscription Status](#meta-horizon-subscription-status) | HIGH |
| Userless token allowed to lapse beyond 90 days | [Renewal / Maintenance](#renewal-maintenance) | HIGH |
| Userless enrollment used in a region without availability | [Common Failures](#common-failures) | HIGH |
| AOSP enrollment profile assigned wrong device-set scope | [Step 1](#provisioning-steps) | HIGH |
| Device enrolled in Intune but not mapped in Meta for Work fleet view | [Step 3](#provisioning-steps) | MEDIUM |
| HMS subscription status confused (assumed shut down rather than transformed-to-FREE) | [Meta Horizon Subscription Status](#meta-horizon-subscription-status) | MEDIUM |
| Intune Plan 1 only (no AR/VR specialty entitlement) | [Prerequisites and Licensing](#prerequisites) | MEDIUM |

## See Also

- [AOSP Stub](06-aosp-stub.md) — AOSP scope context
- [AOSP OEM Matrix](../reference/aosp-oem-matrix.md) — cross-OEM AOSP capability mapping (Meta-row carries `[^meta-volatility]` footnote per D-14)
- [Android Capability Matrix](../reference/android-capability-matrix.md) — overall Android mode capability landscape
- [Android Glossary](../_glossary-android.md) — AOSP / OEMConfig / GMS terminology
- [Android Enrollment Overview](../android-lifecycle/00-enrollment-overview.md#aosp) — placement of AOSP within the Android enrollment lifecycle
- [Meta for Work — Update blog post](https://www.meta.com/blog/an-update-on-meta-for-work) — authoritative Meta Horizon Managed Services wind-down source

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-04-25 | Initial version (Phase 45 AEAOSPFULL-05) — Meta Quest AOSP admin guide for Quest 2 / Quest 3 / Quest 3s / Quest Pro. PITFALL-7 framing per-claim discipline per D-04 + D-23. BOTH REQUIRED add-on H2s per D-02 LOCKED regardless of HMS alive-status (D-08): `## Meta for Work Portal Setup` AND `## Meta Horizon Subscription Status`. Meta Horizon framed per RESEARCH.md §2 HIGH-confidence "ALIVE in transformed form" outcome per D-07 Branch 2 (HMS becomes FREE; maintenance mode through 2030-01-04; commercial-SKU sales end 2026-02-20). Mandatory ⚠️ Feb 20, 2026 wind-down callout in `## Scope and Status` per ROADMAP SC#3 verbatim. Per-model regional restrictions documented per D-08 (Quest 2 / 3 / Pro "Available in select regions only"; Quest 3s no region restriction) with per-model H3 sub-anchors. Step 0 — Meta for Work account approval H3 inside `## Provisioning Steps` per D-09 (B2B onboarding-latency analog to Phase 44 KME B2B Step 0 pattern). 30-day Meta Horizon re-verify trigger in `## Renewal / Maintenance` per D-10 (frontmatter review_by stays at +60d for audit harness uniformity per D-26). 4-portal pattern (Intune + Meta for Work; MGP/ZT N/A) preserved per D-08 LOCKED. Intune-direct fallback documented as parallel-path option in `## Meta for Work Portal Setup` add-on H2. Verbatim Meta-source quotes reproduced in `## Meta Horizon Subscription Status` add-on H2 (4 quotes spanning meta.com/blog/an-update-on-meta-for-work + managexr.com Help Center). 11-H2 sibling parity per D-01 + 2 REQUIRED add-on H2s per D-02 = 13 H2s total. Anchor scaffolding per D-05 including `#meta-for-work-portal-setup` AND `#meta-horizon-subscription-status` add-on anchors. Source-confidence markers per D-28 (HIGH dominates; HMS framing carries `[HIGH: meta.com/blog/an-update-on-meta-for-work + managexr.com Help Center, last_verified 2026-04-25]` per D-06 plan-time gate RESOLVED HIGH-confidence). Frontmatter contract per D-26 + D-27 (last_verified 2026-04-25 + review_by 2026-06-24 + audience admin + platform Android + applies_to AOSP). HTML-comment subtractive deletions per D-29 explain MGP and ZT N/A even with Meta for Work as 4th portal. | -- |

---

*Wave 3 runbook 29 (Cause E) and L2 runbook 23 (Pattern E) cross-link landing targets: [`#common-failures`](#common-failures) and [`#meta-horizon-subscription-status`](#meta-horizon-subscription-status) anchors above are stable per D-05 anchor-scaffolding contract. Cause E + Pattern E cover Meta Quest enrollment failures including 4-portal coexistence faults, regional-availability mismatches, HMS subscription-status confusion, and Meta for Work organization-to-fleet mapping omissions.*

*Wave 2 `aosp-oem-matrix.md` consumes the Meta column data shipped here: Quest 2 / Quest 3 / Quest 3s / Quest Pro + per-model firmware floors (v49 / v59 / v71 / v49) (Hardware Scope row); QR-only AOSP + Wi-Fi OPTIONAL (Enrollment Method and Wi-Fi Embedding row); Meta for Work REQUIRED for 4-portal pattern + Plan 2 OR Suite (Vendor Portals and Licensing row); BOTH user-associated AND userless supported (Intune AOSP Mode row). The Meta-row carries the `[^meta-volatility]` footnote per D-14 referencing the Feb 20, 2026 wind-down + Intune-direct fallback + plan-time re-verification cadence (30-day per D-10).*

*"ALIVE in transformed form" framing rationale (per RESEARCH.md §2 D-06 plan-time gate RESOLVED + D-07 Branch 2 selected): The Feb 20, 2026 wind-down date IS verified, but the wind-down framing must be precise. This is NOT a discontinuation of HMS; it is a commercial-SKU + paid-tier discontinuation transitioning HMS into a free-tier maintenance mode with continued infrastructure support through 2030-01-04. The doc preserves the 4-portal pattern (Intune + Meta for Work) per D-08 LOCKED deliverables, frames HMS as FREE / maintenance-mode (NOT discontinued / shut down / wound down applied to HMS itself), and carries the explicit Feb 20, 2026 wind-down callout per ROADMAP SC#3 verbatim. The 30-day re-verify trigger in `## Renewal / Maintenance` per D-10 catches any post-authoring drift on the wind-down assertion (next forward re-verify: 2026-05-25).*

*Two REQUIRED add-on H2s framing rationale (per D-02 LOCKED): D-02 explicitly mandates BOTH `## Meta for Work Portal Setup` AND `## Meta Horizon Subscription Status` for Meta Quest REGARDLESS of HMS alive-status. The override of F-1B-CRIT-01 (which had proposed dropping the HMS H2 if HMS were discontinued) preserves admin-doc parity for fleets that span the wind-down boundary — existing HMS subscribers need both H2s for the FREE-tier-transition story, and net-new fleets need both H2s for the decision-tree on HMS-FREE vs Intune-direct fallback. This makes Plan 45-05 Meta Quest the heaviest of the 5 Wave 1 per-OEM admin docs (13 H2s total vs 11 baseline + 0-1 add-on for siblings).*
