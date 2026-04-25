---
last_verified: 2026-04-25
review_by: 2026-06-24
applies_to: AOSP
audience: L1
platform: Android
---

> **Platform gate:** This guide covers Android enrollment/compliance troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks).

# Android AOSP Enrollment Failed

L1 runbook for AOSP enrollment failures across the 5 supported OEMs (RealWear / Zebra / Pico / HTC VIVE Focus / Meta Quest): device was expected to enroll automatically via AOSP QR-based provisioning but did not — device booted to consumer setup, looped back to first-time setup, or never arrived in Intune. Five OEM-scoped L1-diagnosable causes (Causes A-E).

**Applies to AOSP only.** AOSP enrollment is supported under AOSP because no GMS (Google Mobile Services) is present on these specialty devices; if a target device is GMS-bearing, use Android Enterprise fully managed (COBO) instead. For Knox Mobile Enrollment failures (Samsung) see runbook [28 KME](28-android-knox-enrollment-failed.md). For non-Samsung corporate Zero-Touch enrollment failures see runbook [27 ZTE](27-android-zte-enrollment-failed.md). For non-corporate enrollment failures see ([22](22-android-enrollment-blocked.md) / [23](23-android-work-profile-not-created.md) / [24](24-android-device-not-enrolled.md) / [25](25-android-compliance-blocked.md) / [26](26-android-mgp-app-not-installed.md)).

Routed here from the [Android Triage Decision Tree](../decision-trees/08-android-triage.md) ANDR29 branch.

## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com) — L1 read-only
- Device serial number, IMEI, or manufacturer identifier
- Confirmation that device is one of the 5 AOSP-supported OEMs (RealWear / Zebra / Pico / HTC / Meta)
- Portal shorthand used in this runbook:
   - **P-INTUNE** = Intune admin center Devices / Tenant admin blades
   - **P-RWCLOUD** = RealWear Cloud admin portal — **admin-only**; OPTIONAL coexistence per [09-aosp-realwear.md](../admin-setup-android/09-aosp-realwear.md)
   - **P-MFW** = Meta for Work portal (`meta.com/meta-for-work`) — **admin-only**; REQUIRED for Meta Quest fleets per [13-aosp-meta-quest.md](../admin-setup-android/13-aosp-meta-quest.md)

> **L1 scope note:** Vendor portals (RealWear Cloud, Meta for Work, PICO Business Suite) are admin-only. L1 observes Intune-side symptoms (device absence / enrollment state) and hands the packet to the admin for vendor-portal actions. All vendor-portal click paths in this runbook are within `## Admin Action Required` sections.

## How to Use This Runbook

**First, identify the device OEM** (RealWear / Zebra / Pico / HTC VIVE Focus / Meta Quest) — typically visible on device chassis label, on the box, or in `Settings > About` — then jump to the matching Cause. Causes are OEM-scoped (one Cause per OEM); each Cause is independently diagnosable and you do not need to rule out other-OEM causes.

- [Cause A: RealWear enrollment failed](#cause-a-realwear)
- [Cause B: Zebra WS50 enrollment failed](#cause-b-zebra)
- [Cause C: Pico enrollment failed](#cause-c-pico)
- [Cause D: HTC VIVE Focus enrollment failed](#cause-d-htc)
- [Cause E: Meta Quest enrollment failed](#cause-e-meta-quest)

If the OEM is not in this list (DigiLens, Lenovo ThinkReality VRX, Vuzix), or if all OEM-Cause checks pass, see [Escalation Criteria](#escalation-criteria) below.

---

## Cause A: RealWear enrollment failed {#cause-a-realwear}

**Entry condition:** Admin reports the RealWear device serial is NOT visible in Intune after first power-on, OR the QR scan returned an error at first boot, OR the device cannot join the staging Wi-Fi network embedded in the QR. RealWear is supported under AOSP because no GMS is present on HMT-1 / HMT-1Z1 / Navigator 500.

### Symptom

- User reports the RealWear hands-free headset (HMT-1, HMT-1Z1, or Navigator 500) went through "normal" first-time-setup voice prompts instead of automatic enrollment.
- Device does NOT appear in Intune after expected enrollment window (typically within 15 minutes of first power-on with internet).
- Admin reports the QR generated from Intune did not result in a successful Wi-Fi join (RealWear has no on-device text-input UI for Wi-Fi credentials, so Wi-Fi MUST be embedded in the QR).
- If hybrid with RealWear Cloud: device fails to appear in RealWear Cloud Devices view after factory reset.

### L1 Triage Steps

1. > **Say to the user:** "I'll verify whether your RealWear device was prepared correctly for automatic enrollment. RealWear devices need the staging Wi-Fi credentials embedded in the QR code because there's no on-device way to type a Wi-Fi password. I'll coordinate with your IT administrator."
2. In Intune admin center, navigate to `Devices > All devices`, filter platform = Android, search by serial. Confirm device is NOT present. <!-- verify UI at execute time -->
3. Collect device identifiers for admin escalation: serial number, IMEI 1, model (HMT-1 / HMT-1Z1 / Navigator 500), firmware version if known (HMT-1 ≥ 11.2; Navigator 500 ≥ 1.1).

### Admin Action Required

**Ask the admin to:**

- Verify the AOSP enrollment profile QR includes Wi-Fi credentials AND the staging Wi-Fi auth type is **WPA-PSK / WPA2-PSK / WPA3 only** (RealWear staging Wi-Fi MUST NOT be EAP-PEAP / EAP-TLS — RealWear support is explicit: "the staging network MUST BE a WPA/WPA2 PSK/WPA3 network type, meaning there is an SSID and Password only"). See [09-aosp-realwear.md#wi-fi-qr-embedding](../admin-setup-android/09-aosp-realwear.md#wi-fi-qr-embedding).
- Verify the AOSP userless enrollment token is within its 90-day expiry window (userless tokens cap at 90 days per MS Learn `setup-aosp-corporate-userless`). User-associated tokens cap at 65 years and are unlikely to be the issue.
- Cross-check the [09-aosp-realwear.md#common-failures](../admin-setup-android/09-aosp-realwear.md#common-failures) checklist for the specific failure observed (QR-scan error / Wi-Fi join failure / device-absent-after-reset).
- If hybrid with RealWear Cloud: verify the device is provisioned in RealWear Cloud (Workspace Basic or Pro tier) per [09-aosp-realwear.md#provisioning-steps](../admin-setup-android/09-aosp-realwear.md#provisioning-steps).

### Verify

- After admin re-issues a fresh QR with valid PSK Wi-Fi credentials AND a non-expired token: device scans the QR, joins staging Wi-Fi, and initiates AOSP enrollment.
- After user factory-resets the device: device initiates AOSP enrollment within ~15 minutes and arrives in Intune `Devices > All devices` (filter Android).
- If hybrid: device appears in RealWear Cloud Devices view within 24 hours.

**If admin confirms admin actions complete AND enrollment still fails:** Route to [Escalation Criteria](#escalation-criteria).

### Escalation (within Cause A)

- Staging Wi-Fi confirmed WPA/WPA2-PSK/WPA3 AND token within 90-day window AND device still does not enroll
- Device firmware below floor (HMT-1 < 11.2; Navigator 500 < 1.1) — admin must update firmware before AOSP enrollment can succeed
- RealWear Cloud Workspace tier mismatch (Basic vs Pro) preventing hybrid coexistence

---

## Cause B: Zebra WS50 enrollment failed {#cause-b-zebra}

**Entry condition:** Admin reports the Zebra WS50 wearable scanner serial is NOT visible in Intune after first power-on, OR the OEMConfig profile assignment shows Failed in Intune, OR the device is on Android 12 (NOT supported per MS Learn). Zebra WS50 is supported under AOSP because no GMS is present on the wearable scanner; if GMS is later added by Zebra, use Android Enterprise fully managed (COBO) instead.

### Symptom

- User (or shift supervisor) reports the WS50 wearable scanner went through normal Setup Wizard instead of corporate enrollment.
- Device does NOT appear in Intune after expected enrollment window (typically within 15 minutes of first power-on with internet).
- Admin reports the OEMConfig profile assignment shows **Failed** in Intune `Devices > Configuration > Profile assignment status`.
- OR: device is running Android 12 (Zebra WS50 explicitly does not support Android 12 per MS Learn `oemconfig-zebra-android-devices`).

### L1 Triage Steps

1. > **Say to the user:** "I'll verify whether your Zebra wearable scanner was prepared correctly for corporate enrollment. WS50 devices need an OEMConfig app pushed via Intune as an APK to lock down management settings. I'll coordinate with your IT administrator."
2. In Intune admin center, navigate to `Devices > All devices`, filter platform = Android, search by serial. Confirm device is NOT present. <!-- verify UI at execute time -->
3. Collect device identifiers for admin escalation: serial number, IMEI 1 (or MEID), model (WS50), firmware version (must be ≥ 11-49-15.00 per MS Learn), Android OS version (MUST NOT be Android 12).

### Admin Action Required

**Ask the admin to:**

- Verify the correct OEMConfig app is selected per Android version: **"Zebra OEMConfig Powered by MX"** for Android 13+ AND Android 11; **"Legacy Zebra OEMConfig"** for Android 11 and earlier. WS50 on Android 12 is **NOT supported** — admin must downgrade to Android 11 or upgrade past Android 12 before retry. See [10-aosp-zebra.md#oemconfig-apk-push](../admin-setup-android/10-aosp-zebra.md#oemconfig-apk-push).
- Verify the OEMConfig app is delivered as an **APK via Intune** (NOT via Managed Google Play — AOSP has no GMS, so MGP is N/A for Zebra WS50).
- Cross-check the [10-aosp-zebra.md#common-failures](../admin-setup-android/10-aosp-zebra.md#common-failures) checklist for the specific failure observed (profile-assignment Failed / wrong OEMConfig app / Android 12 / StageNow XML rejected).
- If using StageNow desktop tool: verify exported XML matches the MX schema version supported by the installed OEMConfig app (currently MX 13.5 or 14.2).

### Verify

- After admin reassigns the correct OEMConfig profile and pushes the APK: profile-assignment status shows **Succeeded** in Intune `Devices > Configuration > Profile assignment status`.
- After user factory-resets the device (or admin remote-wipes): device initiates AOSP enrollment within ~15 minutes and arrives in Intune `Devices > All devices`.

**If admin confirms admin actions complete AND enrollment still fails:** Route to [Escalation Criteria](#escalation-criteria).

### Escalation (within Cause B)

- Correct OEMConfig app installed AND profile assignment Succeeded AND device still does not enroll
- StageNow XML rejected by Intune due to MX schema mismatch beyond the supported MX 13.5 / 14.2 range
- Device firmware below floor (< 11-49-15.00) — admin must update WS50 firmware before retry

---

## Cause C: Pico enrollment failed {#cause-c-pico}

**Entry condition:** Admin reports the PICO device serial is NOT visible in Intune after first power-on, OR the device is a consumer Pico SKU (not Enterprise / Pro/Eye), OR PUI firmware is below floor. Pico is supported under AOSP because no GMS is present on the PICO 4 Enterprise / PICO Neo3 Pro/Eye; if a consumer Pico variant accidentally entered the fleet, AOSP enrollment will not work.

### Symptom

- User reports the PICO headset went through normal Pico OS first-time setup instead of automatic enrollment.
- Device does NOT appear in Intune after expected enrollment window (typically within 15 minutes of first power-on with internet).
- Admin reports the device is one of the consumer Pico SKUs (e.g., consumer Pico 4 / consumer Neo3) instead of the Enterprise variants (PICO 4 Enterprise / PICO Neo3 Pro/Eye / PICO 4 Ultra Enterprise).
- OR: PUI firmware is below floor (PICO 4 Enterprise < PUI 5.6.0; Neo3 Pro/Eye < PUI 4.8.19).

### L1 Triage Steps

1. > **Say to the user:** "I'll verify whether your PICO headset is the Enterprise model that's eligible for corporate enrollment. Consumer Pico 4 and consumer Neo3 cannot enroll via AOSP — only the Enterprise / Pro/Eye SKUs can. I'll coordinate with your IT administrator."
2. In Intune admin center, navigate to `Devices > All devices`, filter platform = Android, search by serial. Confirm device is NOT present. <!-- verify UI at execute time -->
3. Collect device identifiers for admin escalation: serial number, IMEI 1 (if applicable), model (verify "Enterprise" or "Pro/Eye" suffix on device label / box), PUI firmware version (Settings > About).

### Admin Action Required

**Ask the admin to:**

- Verify the device is an **Enterprise SKU** (PICO 4 Enterprise / PICO Neo3 Pro/Eye / PICO 4 Ultra Enterprise). Consumer Pico 4 and consumer Neo3 are NOT supported under AOSP — admin must replace the device or use a different management path. SKU is verifiable on the device label, on the box, or in `Settings > About`. See [11-aosp-pico.md#common-failures](../admin-setup-android/11-aosp-pico.md#common-failures).
- Verify PUI firmware meets floor: PICO 4 Enterprise ≥ PUI 5.6.0; PICO Neo3 Pro/Eye ≥ PUI 4.8.19. If below floor: update PUI before retry.
- If using PICO Business Suite coexistence: verify the Business Suite enrollment is compatible with the Intune AOSP enrollment per [11-aosp-pico.md#pico-business-suite-coexistence](../admin-setup-android/11-aosp-pico.md#pico-business-suite-coexistence). PICO Business Suite is OPTIONAL for Intune-direct AOSP enrollment.

### Verify

- After admin confirms Enterprise SKU + PUI firmware ≥ floor: device scans QR and initiates AOSP enrollment.
- After user factory-resets the device: device initiates AOSP enrollment within ~15 minutes and arrives in Intune `Devices > All devices`.

**If admin confirms admin actions complete AND enrollment still fails:** Route to [Escalation Criteria](#escalation-criteria).

### Escalation (within Cause C)

- Enterprise SKU confirmed AND PUI firmware meets floor AND device still does not enroll
- PICO Business Suite coexistence misconfiguration where the Business Suite license / enrollment conflicts with Intune AOSP profile assignment
- Consumer Pico SKU procured by mistake — admin must escalate to procurement to swap for Enterprise SKU (no L2 path can recover this)

---

## Cause D: HTC VIVE Focus enrollment failed {#cause-d-htc}

**Entry condition:** Admin reports the HTC VIVE Focus device serial is NOT visible in Intune after first power-on, OR the in-device path `Settings > Advanced > MDM setup > QR code` is missing on older firmware, OR the admin attempted Vive Business Management System (VBMS) AND Intune simultaneously. HTC VIVE Focus 3 / XR Elite / Focus Vision is supported under AOSP because no GMS is present on these enterprise headsets.

### Symptom

- User reports the HTC headset went through normal Vive OS first-time setup instead of automatic enrollment.
- Device does NOT appear in Intune after expected enrollment window (typically within 15 minutes of first power-on with internet).
- Admin reports the in-device path `Settings > Advanced > MDM setup > QR code` is missing or returns an error (typically because firmware is below floor).
- OR: admin reports both VBMS (Vive Business Management System) AND Intune are configured simultaneously, which is not supported (VBMS is an alternative MDM, not Intune-coexistent).

### L1 Triage Steps

1. > **Say to the user:** "I'll verify whether your HTC VIVE Focus headset has the right firmware and configuration to start corporate enrollment. The QR scanner is at Settings > Advanced > MDM setup > QR code. I'll coordinate with your IT administrator."
2. In Intune admin center, navigate to `Devices > All devices`, filter platform = Android, search by serial. Confirm device is NOT present. <!-- verify UI at execute time -->
3. Collect device identifiers for admin escalation: serial number, IMEI 1 (if applicable), model (Vive Focus 3 / XR Elite / Focus Vision), firmware version (Vive Focus 3 ≥ 5.2 - 5.0.999.624; XR Elite ≥ 4.0 - 1.0.999.350; Focus Vision ≥ 7.0.999.159).

### Admin Action Required

**Ask the admin to:**

- Verify firmware meets floor per `## Hardware Scope` of [12-aosp-htc-vive-focus.md#provisioning-steps](../admin-setup-android/12-aosp-htc-vive-focus.md#provisioning-steps). If below floor: update firmware via HTC's Vive Business support workflow before retry.
- Verify the device is using **Intune-direct AOSP enrollment only** — NOT simultaneously enrolled in Vive Business Management System (VBMS). VBMS is an alternative vendor MDM and does not coexist with Intune. If VBMS is present, admin must remove VBMS enrollment first. See [12-aosp-htc-vive-focus.md#common-failures](../admin-setup-android/12-aosp-htc-vive-focus.md#common-failures).
- Verify the in-device path `Settings > Advanced > MDM setup > QR code` is navigable (on supported firmware). If the path is missing, firmware is below floor.
- Reissue a fresh QR from the AOSP enrollment profile in Intune; confirm the QR includes a current (non-expired) token.

### Verify

- After admin confirms firmware ≥ floor + VBMS removed (if applicable) + fresh QR issued: device scans QR via in-device path and initiates AOSP enrollment.
- After user factory-resets the device: device initiates AOSP enrollment within ~15 minutes and arrives in Intune `Devices > All devices`.

**If admin confirms admin actions complete AND enrollment still fails:** Route to [Escalation Criteria](#escalation-criteria).

### Escalation (within Cause D)

- Firmware meets floor AND in-device MDM setup path navigable AND device still does not enroll
- VBMS removal is not feasible (org standardization on VBMS for other devices) — admin must choose one MDM strategy
- Consumer Vive variant procured by mistake (out of scope per Phase 45 — enterprise SKUs only: Vive Focus 3 / XR Elite / Focus Vision)

---

## Cause E: Meta Quest enrollment failed {#cause-e-meta-quest}

**Entry condition:** Admin reports the Meta Quest device serial is NOT visible in Intune after first power-on, OR NOT visible in the Meta for Work fleet view, OR Meta for Work account approval is incomplete, OR the admin is confused about Meta Horizon Managed Services (HMS) subscription status post-2026-02-20 transition. Meta Quest 2 / 3 / 3s / Pro is supported under AOSP because no GMS is present on the Meta Quest OS.

> **Important framing on HMS (D-23 PITFALL-7 carry-forward + Phase 45 D-06/D-07 RESEARCH outcome):** As of 2026-02-20, Meta no longer **sells** commercial Quest SKUs and HMS is **free** (not shut down). HMS infrastructure remains operational in maintenance mode through 2030-01-04. Existing HMS subscribers continue uninterrupted; net-new fleets may use Intune-direct AOSP enrollment instead of HMS. If the admin says "HMS is shut down" or "wound down," correct the framing: HMS is alive in transformed (free-tier) form. See [13-aosp-meta-quest.md#meta-horizon-subscription-status](../admin-setup-android/13-aosp-meta-quest.md#meta-horizon-subscription-status).

### Symptom

- User reports the Meta Quest headset went through normal Meta Quest OS setup (Meta account / Meta Horizon onboarding) instead of corporate enrollment.
- Device does NOT appear in Intune after expected enrollment window (typically within 15 minutes of first power-on with internet).
- Admin reports the Meta for Work account is **not yet approved** (B2B account approval can take 1-2 business days, mirroring the Knox B2B pattern).
- OR: admin reports device is NOT visible in the Meta for Work fleet device view.
- OR: admin attempted to procure a commercial Quest SKU after 2026-02-20 (no longer for sale).
- OR: device is a consumer Meta Quest model in a region without availability (Quest 2 / 3 / Pro have regional restrictions; Quest 3s has no regional restriction).

### L1 Triage Steps

1. > **Say to the user:** "I'll verify whether your Meta Quest headset is set up correctly for corporate enrollment. Meta Quest needs both Intune and the Meta for Work portal — I'll coordinate with your IT administrator and check whether your Meta for Work account is approved."
2. In Intune admin center, navigate to `Devices > All devices`, filter platform = Android, search by serial. Confirm device is NOT present. <!-- verify UI at execute time -->
3. Collect device identifiers for admin escalation: serial number, IMEI 1 (if applicable), model (Quest 2 / Quest 3 / Quest 3s / Quest Pro), firmware version (Quest 2 ≥ v49; Quest 3 ≥ v59; Quest 3s ≥ v71; Quest Pro ≥ v49), region of deployment, whether the device is a commercial Quest SKU (pre-2026-02-20 procurement) or a consumer Quest 3 / 3s.

### Admin Action Required

**Ask the admin to:**

- Verify the **Meta for Work account is approved** before proceeding. B2B approval can take 1-2 business days. If submitted but >2 business days pending: contact Meta for Work support. See [13-aosp-meta-quest.md#meta-for-work-portal-setup](../admin-setup-android/13-aosp-meta-quest.md#meta-for-work-portal-setup).
- Verify the **HMS subscription status** for the deployment scenario per [13-aosp-meta-quest.md#meta-horizon-subscription-status](../admin-setup-android/13-aosp-meta-quest.md#meta-horizon-subscription-status):
   - Existing pre-2026-02-20 HMS subscribers: continue uninterrupted; verify subscription state in Meta for Work portal.
   - Net-new fleets post-2026-02-20: HMS is **free** (HMS-FREE tier); enroll via meta.com/meta-for-work/.
   - Net-new fleets choosing Intune-direct AOSP: no HMS dependency; use the AOSP enrollment QR directly.
- Cross-check the [13-aosp-meta-quest.md#common-failures](../admin-setup-android/13-aosp-meta-quest.md#common-failures) checklist for the specific failure observed (account-not-approved / device-absent-in-MFW / region-restriction / commercial-SKU-after-cutoff).
- Verify regional availability for the model: Quest 2 / 3 / Pro require deployment in regions where Meta for Work supports them; Quest 3s has no regional restriction. If the deployment region is unsupported for the model, swap to Quest 3s.

### Verify

- After Meta for Work account approval: admin can sign in to the Meta for Work portal and see the fleet device view.
- After admin assigns the device to the Intune AOSP enrollment profile (and, if HMS-managed, also assigns to a Meta for Work fleet): device appears in Meta for Work fleet view within 24 hours.
- After user factory-resets the device: device initiates AOSP enrollment within ~15 minutes and arrives in Intune `Devices > All devices`.

**If admin confirms admin actions complete AND enrollment still fails:** Route to [Escalation Criteria](#escalation-criteria).

### Escalation (within Cause E)

- Meta for Work account approval >5 business days pending despite vendor support ticket
- HMS subscription state ambiguous (existing pre-2026-02-20 subscriber but billing transition not reflected in portal) — admin must contact Meta for Work support to confirm state
- Commercial Quest SKU procurement attempted post-2026-02-20 — admin must replan with Quest 3 / 3s consumer SKU + HMS-free or Intune-direct AOSP
- Consumer Quest model deployed in region without availability — admin must swap to Quest 3s (no regional restriction) or relocate deployment region

---

## Escalation Criteria

(Overall — applies across all five OEM-scoped L1-diagnosable causes A-E.)

Escalate to L2. See [Android AOSP Investigation](../l2-runbooks/23-android-aosp-investigation.md) for per-OEM Pattern A-E investigation and [Android Log Collection Guide](../l2-runbooks/18-android-log-collection.md).

Escalate to L2 if:

- **Cause A (RealWear):** admin actions complete AND staging Wi-Fi PSK confirmed valid (WPA/WPA2-PSK/WPA3) AND token within 90-day window AND device still does not enroll
- **Cause B (Zebra):** correct OEMConfig app installed (Powered by MX for Android 13+/11 OR Legacy for ≤ Android 11) AND OEMConfig profile assignment Succeeded AND device firmware ≥ 11-49-15.00 AND device still does not enroll
- **Cause C (Pico):** Enterprise SKU confirmed (PICO 4 Enterprise / Neo3 Pro/Eye / PICO 4 Ultra Enterprise) AND PUI firmware meets floor AND device still does not enroll
- **Cause D (HTC):** firmware meets floor (Vive Focus 3 ≥ 5.2 - 5.0.999.624; XR Elite ≥ 4.0 - 1.0.999.350; Focus Vision ≥ 7.0.999.159) AND in-device MDM setup path navigable AND VBMS not co-enrolled AND device still does not enroll
- **Cause E (Meta Quest):** Meta for Work account approved AND fleet device-mapped AND HMS subscription state confirmed (HMS-FREE-tier post-2026-02-20 OR HMS-paid-existing-subscriber pre-2026-02-20 transition) AND device still does not enroll

**Before escalating, collect:**

- Device serial number + IMEI 1 (or MEID for CDMA)
- Device manufacturer (one of: RealWear / Zebra / Pico / HTC / Meta), model, firmware / Android version
- Which OEM-scoped Cause (A/B/C/D/E) closest matches observation
- For Cause A: staging Wi-Fi auth type used (PSK / WPA2 / WPA3 — NOT EAP); whether Wi-Fi credentials embedded in QR; AOSP enrollment-token age in days (must be < 90 for userless)
- For Cause B: which OEMConfig app version installed (Powered by MX vs Legacy); OEMConfig profile assignment status from Intune (Succeeded / Failed / Pending); device Android version (must NOT be Android 12)
- For Cause C: device SKU verification (Enterprise vs consumer — verbatim model name from device label); PUI firmware version
- For Cause D: in-device path verbatim used (`Settings > Advanced > MDM setup > QR code` or variant); whether VBMS is also enrolled
- For Cause E: Meta for Work account approval state; HMS subscription state (FREE-tier post-2026-02-20 / paid-existing-subscriber / N/A for Intune-direct); per-model regional availability check; commercial-vs-consumer SKU
- Number of devices affected (single device vs fleet — shape-of-problem signal)
- Timestamp of most recent failed enrollment attempt

---

[Back to Android Triage](../decision-trees/08-android-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-25 | Initial version (Phase 45 AEAOSPFULL-07) — 5 OEM-scoped Causes A-E (RealWear / Zebra / Pico / HTC / Meta Quest) + aggregate `## Escalation Criteria` H2 per D-17. Closes Phase 40 ANDE1 escalation stub via D-19 triage tree edit (Wave 4 Plan 10). In-runbook OEM-identification step `## How to Use This Runbook` per D-20 (deliberate departure from sibling no-pre-Cause-routing precedent). Per-Cause cross-links to per-OEM admin guide `## Common Failures` and add-on anchors per D-21. Cause E (Meta Quest) cross-links explicitly to `13-aosp-meta-quest.md#meta-horizon-subscription-status` for HMS-related failures per D-17 explicit. PITFALL-7 carry-forward per D-23 (each "supported under AOSP" assertion paired with "no GMS / use AE fully managed if GMS present" framing at point-of-claim). **Sibling-departure rationale (D-22):** (1) 5-OEM Cause partitioning vs sibling 4-failure-class precedent is a scope-cardinality difference, not a methodology change — AOSP scope spans 5 OEMs whereas ZTE/KME scope spans one provisioning-method-per-runbook; the OEM-scope axis defuses F-4A-CRIT-01 (downgraded MED). (2) In-runbook OEM-identification step `## How to Use This Runbook` is necessary because L1 must first identify the device OEM before jumping to the matching Cause; this is sibling no-pre-Cause-routing precedent departure that defuses F-4A-CRIT-03 (downgraded MED). | -- |
