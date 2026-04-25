---
last_verified: 2026-04-25
review_by: 2026-06-24
applies_to: AOSP
audience: L2
platform: Android
---

> **Platform gate:** This guide covers Android Enterprise L2 investigation via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L2 Runbooks](00-index.md#ios-l2-runbooks).

# Android AOSP Enrollment Investigation

## Context

This runbook covers AOSP enrollment failure investigation across the 5 specialty-hardware OEMs supported on AOSP in Intune (RealWear / Zebra / Pico / HTC VIVE Focus / Meta Quest). KME / Knox-managed Samsung enrollment is out of scope (see [22-android-knox-investigation.md](22-android-knox-investigation.md)). DigiLens / Lenovo / Vuzix per-OEM coverage is deferred to v1.5.

Before starting: collect a diagnostic package per the [Android Log Collection Guide](18-android-log-collection.md). Per-OEM admin actions reference [09-aosp-realwear.md](../admin-setup-android/09-aosp-realwear.md), [10-aosp-zebra.md](../admin-setup-android/10-aosp-zebra.md), [11-aosp-pico.md](../admin-setup-android/11-aosp-pico.md), [12-aosp-htc-vive-focus.md](../admin-setup-android/12-aosp-htc-vive-focus.md), [13-aosp-meta-quest.md](../admin-setup-android/13-aosp-meta-quest.md).

**AOSP scope framing.** AOSP enrollment is supported under AOSP because the 5 in-scope OEM platforms ship without Google Mobile Services (GMS) preinstalled. If a target device is GMS-bearing, use Android Enterprise fully managed (COBO) instead — AOSP is the right path only when no GMS is present.

**From L1 escalation?** [L1 runbook 29 (AOSP enrollment failed)](../l1-runbooks/29-android-aosp-enrollment-failed.md) has escalated. L1 collected: serial number, OEM (RealWear / Zebra / Pico / HTC / Meta), observed Cause. Skip to the Pattern matching L1's Cause:

- L1 29 Cause A (RealWear) → [Pattern A](#pattern-a-realwear)
- L1 29 Cause B (Zebra) → [Pattern B](#pattern-b-zebra)
- L1 29 Cause C (Pico) → [Pattern C](#pattern-c-pico)
- L1 29 Cause D (HTC) → [Pattern D](#pattern-d-htc)
- L1 29 Cause E (Meta Quest) → [Pattern E](#pattern-e-meta-quest)
- No L1 escalation: begin at Investigation Data Collection Step 1

> **Graph API scope:** Where this runbook references the Microsoft Graph API, usage is strictly READ-ONLY (GET requests). No modifications. No token regeneration. No DPC extras JSON mutation. For deep Android Enterprise Graph operations, see ADDTS-ANDROID-02 (future milestone — Android Graph API deep-dive).

## Investigation — Data Collection (mode-agnostic)

### Step 1: Device registration state (Intune admin center > Devices > All devices)

**Breadcrumb:** Intune admin center > **Devices** > **All devices** > search by serial number or filter by user UPN.

**Observables to collect:**

- Is the device visible at all? An AOSP-targeted specialty device that never appears in Intune did not complete the AOSP QR-handoff — the AOSP enrollment chain broke before the device reached Intune.
- **Manufacturer** field: must show one of `RealWear` / `Zebra` / `Pico` (or `PICO`) / `HTC` / `Meta`. A non-matching manufacturer indicates the device was incorrectly routed to L1 29 / this runbook (AOSP scope is limited to these 5 OEMs).
- **Managed by** field: should show `Microsoft Intune` for a successfully enrolled AOSP device.
- **Enrollment type** field: AOSP devices enroll into one of two AOSP modes. Expected values: `Android (AOSP) - Corporate-owned, userless` for shared-shift / kiosk-style fleets (RealWear, Zebra wearable scanners, dedicated AR/VR training pods); `Android (AOSP) - Corporate-owned, user-associated` for single-user-bound headsets (per-user RealWear, per-user PICO, per-user HTC, per-user Meta Quest). There is no AOSP-via-WPCO or AOSP-via-BYOD path.
- **Compliance state** and **Last check-in** timestamp: same expectations as the GMS-mode runbook 19. `Not evaluated` immediately post-enrollment is normal within the first 15-30 minute window.

**What a missing or wrong-mode device tells you:**

- Device not registered → AOSP QR handoff broke before reaching Intune. Proceed to Step 2 (vendor portal device state) for OEMs with vendor portals (RealWear / Pico / Meta) and to Step 3 for all OEMs.
- Device registered but in unexpected AOSP mode (userless when user-associated was intended, or vice versa) → AOSP enrollment profile template selected the wrong mode at profile creation; correlate with Step 3 — likely Pattern A / B / C / D / E depending on OEM.
- Device registered but stuck at `Not enrolled` or "Connecting to Intune..." → AOSP DPC provisioning started but did not complete; collect per Step 4.

### Step 2: Vendor portal device state (per-OEM variation)

Vendor portals are admin-only (the L2 worker typically does not have direct vendor-portal access). Coordinate with the tenant admin to capture the observables; vendor portals expose the upstream-of-Intune state of the AOSP handoff for the OEMs that have one.

**Per-OEM vendor portal mapping:**

- **RealWear (Pattern A):** RealWear Cloud admin portal — **OPTIONAL** coexistence per [09-aosp-realwear.md](../admin-setup-android/09-aosp-realwear.md). If hybrid coexistence with RealWear Cloud is configured, verify the device in the RealWear Cloud Devices view (Workspace Basic or Pro tier). If pure Intune-direct (no RealWear Cloud), capture "N/A — Intune-direct mode" for the support packet.
- **Zebra (Pattern B):** No vendor portal required. Record the StageNow / OEMConfig profile assignment state from Intune admin center > Devices > Configuration > Profile assignment status (Succeeded / Failed / Pending). Capture the OEMConfig app version installed (Powered by MX vs Legacy) for the support packet.
- **Pico (Pattern C):** PICO Business Suite admin console — **OPTIONAL** coexistence per [11-aosp-pico.md](../admin-setup-android/11-aosp-pico.md). If PICO Business Suite coexistence is configured, verify the device in the Business Suite admin console; otherwise capture "N/A — Intune-direct mode".
- **HTC VIVE Focus (Pattern D):** No vendor portal for Intune-direct enrollment. HTC's Vive Business Management System (VBMS) is an alternative MDM — not Intune-coexistent. If both VBMS and Intune are configured simultaneously, this is a dual-MDM misconfiguration covered in Pattern D Resolution.
- **Meta Quest (Pattern E):** Meta for Work portal — **REQUIRED** for HMS-managed deployments per [13-aosp-meta-quest.md](../admin-setup-android/13-aosp-meta-quest.md). Verify the device in the Meta for Work Quest fleet view. ALSO verify HMS subscription status (FREE-tier post-2026-02-20 OR paid-existing-subscriber pre-2026-02-20 transition) per [13-aosp-meta-quest.md#meta-horizon-subscription-status](../admin-setup-android/13-aosp-meta-quest.md#meta-horizon-subscription-status).

**What vendor-portal state tells you:**

- Device absent from vendor portal (where applicable) → vendor-side handoff broke (RealWear Cloud uplink failed; Meta for Work account approval not complete; Pico Business Suite coexistence misconfigured) — likely Pattern A / C / E scope.
- Device present in vendor portal but Intune Step 1 shows nothing → Step 3 (profile + token sync state) — likely a token-sync or AOSP profile assignment issue.
- Meta for Work account not yet approved (>2 business days pending) → Pattern E (Meta for Work approval gate timing).

### Step 3: AOSP enrollment profile + token sync state

**Breadcrumb:** Intune admin center > **Devices** > **Android** > **Android enrollment** > **Corporate-owned, dedicated devices** OR **Corporate-owned, user-associated devices** > select the linked AOSP enrollment profile.

The AOSP enrollment-profile token has two configuration surfaces that must agree: the issued QR-embedded token and the Intune-side enrollment-profile staging token.

**Observables to collect:**

- **Token mode + age:** AOSP userless tokens cap at **90 days max**; AOSP user-associated tokens cap at up to 65 years (effectively non-expiring within fleet refresh cycles). Capture token issue date and current age. A userless token age >90 days is expired — re-issue the QR.
- **Token state:** Intune-side enrollment profile **Token** state must show `Active` (not `Expired` / `Revoked`). Capture last-rotation timestamp.
- **QR Wi-Fi credentials embedding (Pattern A scope):** For RealWear specifically — verify the QR embeds Wi-Fi credentials AND the staging Wi-Fi auth type is WPA-PSK / WPA2-PSK / WPA3 (NOT EAP-PEAP / EAP-TLS). RealWear has no on-device text-input UI for Wi-Fi credentials — the QR embed is REQUIRED.
- **Profile assignment scope:** Verify the AOSP enrollment profile is assigned to a group that includes the affected device's intended user / dynamic-device group; mis-scoped assignment produces a silent enrollment-failure pattern.
- **Cross-check:** Does the QR-embedded token match the active token displayed on the Intune enrollment-profile page? A token-rotation event on the Intune side that was not propagated to the issued QR (i.e., admin re-issued QR but devices were already shipped with the prior QR) produces a token-mismatch silent failure.

**What sync-state observations tell you:**

- Userless token age >90 days → re-issue QR, factory-reset the device, retry.
- Token Expired / Revoked → re-issue token, propagate substituted token to the QR distribution channel, factory-reset the device, retry first boot.
- Wi-Fi auth type EAP-PEAP / EAP-TLS on a RealWear staging network → Pattern A (RealWear Wi-Fi PSK contract violation). Resolution: re-issue QR with WPA/WPA2-PSK or WPA3 staging network.
- Profile assignment scope mismatch → re-scope assignment to the correct group, factory-reset, retry.

### Step 4: Device-side enrollment state (collect per runbook 18 based on OEM)

Collect device-side state using the [Android Log Collection Guide](18-android-log-collection.md) Section 4 (AOSP-specific log surfaces — vary per OEM; adb logcat last-resort tier may not be available pre-AOSP-handoff on devices that disable USB debugging by default).

**Observables to collect:**

- Microsoft Intune app log incident ID — captured via the Intune app's self-service log collection menu (where the Intune app is installed post-AOSP-handoff).
- Per-OEM device-side error dialogs surfaced during the AOSP handoff:
  - RealWear: voice-prompt walkthrough into Setup Wizard instead of automatic enrollment (Pattern A — Wi-Fi failed to embed).
  - Zebra: OEMConfig profile push Failed surfaces in the Intune-managed-app-deployment status (Pattern B).
  - Pico: device falls into PICO OS first-time setup (Pattern C — Enterprise SKU mismatch OR PUI firmware below floor).
  - HTC: in-device path `Settings > Advanced > MDM setup > QR code` missing (Pattern D — firmware below floor).
  - Meta Quest: device falls into Meta Quest OS first-time setup with Meta-account onboarding (Pattern E — Meta for Work account not approved OR HMS subscription state confusion OR commercial-SKU procurement post-cutoff).
- adb logcat excerpt (where USB debugging is available pre-AOSP-handoff): filter for `DevicePolicyManager:* CloudDPC:* IntuneManagedAgent:*` events covering the boot-to-failure window.

**Key signals to look for:**

- `CloudDPC` provisioning intent received but `EXTRA_ENROLLMENT_TOKEN` parsing fails → token expired or mismatched (Step 3).
- `DevicePolicyManager setDeviceOwner` call never present in logcat → AOSP QR handoff to CloudDPC did not occur; correlate with Step 3 (token sync state) and Step 2 (vendor portal state for the OEM).
- Wi-Fi join failure events early in boot → Pattern A (RealWear) Wi-Fi PSK / EAP misconfiguration.

After completing Steps 1-4, proceed to Analysis — Match Against Known Patterns below.

## Analysis — Match Against Known Patterns

Match observed indicators to one of five per-OEM Patterns below. Patterns are independently diagnosable by OEM (1:1 routing from L1 runbook 29 Causes A-E). Each Pattern includes Resolution Steps and a Microsoft Support escalation packet.

### Pattern A: RealWear enrollment failure {#pattern-a-realwear}

**Typical class:** ⚙️ Config Error (staging Wi-Fi PSK auth-type misconfig) — occasionally 🔐 Auth (token expiry) or ⏱️ Timing (Wi-Fi credential rotation)

**Symptom:** RealWear hands-free headset (HMT-1, HMT-1Z1, or Navigator 500) hangs at "Connecting to Intune" after QR scan, OR voice-prompt walkthrough returns the device to consumer Setup Wizard without ever reaching Intune. Device does not appear in Intune admin center after expected enrollment window. RealWear is supported under AOSP because no GMS is present on these hands-free headsets; if GMS were present, COBO would be the right path instead.

**Known Indicators:**

- Wi-Fi credentials missing from the QR (RealWear has no on-device text-input UI for Wi-Fi credentials — embed is REQUIRED).
- Staging Wi-Fi auth type is EAP-PEAP / EAP-TLS (RealWear authoritative source: "the staging network MUST BE a WPA/WPA2 PSK/WPA3 network type, meaning there is an SSID and Password only").
- AOSP userless enrollment token age >90 days (token is expired; QR carries an unusable token).
- RealWear Cloud Workspace tier mismatch (Basic vs Pro) preventing hybrid coexistence (when hybrid coexistence is configured).
- Firmware below floor (HMT-1 < 11.2; Navigator 500 < 1.1) preventing AOSP enrollment from initiating cleanly.

**Resolution Steps:**

1. Verify the AOSP enrollment profile QR includes Wi-Fi credentials AND the staging Wi-Fi auth type is WPA/WPA2-PSK or WPA3 only (NOT EAP-PEAP / EAP-TLS) per [09-aosp-realwear.md#wi-fi-qr-embedding](../admin-setup-android/09-aosp-realwear.md#wi-fi-qr-embedding). RealWear is supported under AOSP because no GMS is present on the hands-free headset; if GMS is present, switch to fully managed (COBO) instead.
2. Verify the AOSP userless enrollment token is within its 90-day expiry window per [09-aosp-realwear.md#provisioning-steps](../admin-setup-android/09-aosp-realwear.md#provisioning-steps). If expired, re-issue the QR with a fresh token.
3. Cross-check the [09-aosp-realwear.md#common-failures](../admin-setup-android/09-aosp-realwear.md#common-failures) checklist for the specific failure observed (QR-scan error / Wi-Fi join failure / device-absent-after-reset).
4. If hybrid with RealWear Cloud: verify the device is provisioned in the RealWear Cloud Devices view (Workspace Basic or Pro tier).
5. Factory-reset the device after the corrected QR is issued — RealWear AOSP enrollment does not retro-trigger on profile re-assignment alone.

**Microsoft Support escalation packet (D-09 / D-18):**

- **Token sync status:** Intune-side enrollment-profile staging-token Active state + last token-rotation timestamp + token age in days (must be < 90 for userless) — Intune admin center screenshot.
- **Profile assignment state:** RealWear Cloud Devices view screenshot (admin-provided) when hybrid coexistence is configured; otherwise "N/A — Intune-direct mode (RealWear Cloud not configured)".
- **Enrollment profile GUID:** Intune admin center URL fragment for the AOSP enrollment profile (Graph API READ-ONLY GET if URL not directly visible: `GET https://graph.microsoft.com/beta/deviceManagement/androidEnrollmentProfiles/{id}`).

---

### Pattern B: Zebra enrollment failure {#pattern-b-zebra}

**Typical class:** ⚙️ Config Error (wrong OEMConfig app for Android version OR Android 12 deployment attempt)

**Symptom:** Zebra WS50 wearable scanner is not visible in Intune after first power-on, OR the OEMConfig profile assignment shows Failed in Intune admin center > Devices > Configuration > Profile assignment status, OR the device is on Android 12 (which Zebra explicitly does not support). Zebra WS50 is supported under AOSP because no GMS is present on the wearable scanner; if a future Zebra-WS50 firmware ships with GMS, switch to fully managed (COBO) instead.

**Known Indicators:**

- Wrong OEMConfig app installed for the device's Android version (Powered by MX is correct for Android 13+ AND Android 11 single-profile deployments; Legacy Zebra OEMConfig is correct for Android 11 and earlier multi-profile deployments).
- Profile assignment status shows Failed in Intune `Devices > Configuration > Profile assignment status`.
- StageNow XML rejected due to MX schema mismatch beyond the supported MX 13.5 / 14.2 range.
- Device is on Android 12 (Zebra WS50 explicitly does not support Android 12 per MS Learn `oemconfig-zebra-android-devices`).
- OEMConfig app delivered via Managed Google Play instead of as an APK via Intune (AOSP has no GMS — MGP is N/A; OEMConfig must be APK-pushed).
- Device firmware below floor (< 11-49-15.00) preventing OEMConfig profile delivery.

**Resolution Steps:**

1. Verify the correct OEMConfig app is selected per Android version per [10-aosp-zebra.md#oemconfig-apk-push](../admin-setup-android/10-aosp-zebra.md#oemconfig-apk-push) — "Zebra OEMConfig Powered by MX" for Android 13+ AND Android 11 single-profile deployments; "Legacy Zebra OEMConfig" for Android 11 and earlier multi-profile deployments. Zebra WS50 is supported under AOSP because no GMS is present; if GMS is later present, switch to fully managed (COBO) instead.
2. Verify the device Android OS version is NOT Android 12. Zebra WS50 explicitly does not support Android 12 — admin must downgrade to Android 11 OR upgrade past Android 12 before retry.
3. Verify the OEMConfig app is delivered as an **APK via Intune** (NOT via Managed Google Play — AOSP has no GMS, so MGP is N/A for Zebra WS50).
4. Cross-check the [10-aosp-zebra.md#common-failures](../admin-setup-android/10-aosp-zebra.md#common-failures) checklist for the specific failure observed (profile-assignment Failed / wrong OEMConfig app / Android 12 / StageNow XML rejected).
5. If using StageNow desktop tool: verify the exported XML matches the MX schema version supported by the installed OEMConfig app (MX 13.5 or 14.2).
6. Factory-reset the device (or admin remote-wipe) after the OEMConfig profile is re-assigned correctly — AOSP enrollment does not retro-trigger.

**Microsoft Support escalation packet (D-09 / D-18):**

- **Token sync status:** Intune-side enrollment-profile staging-token Active state + last token-rotation timestamp (Intune admin center screenshot).
- **Profile assignment state:** N/A — Zebra WS50 has no vendor portal; capture the Intune admin center > Devices > Configuration > Profile assignment status screenshot showing the OEMConfig profile assignment state (Succeeded / Failed / Pending) AND the OEMConfig app version installed (Powered by MX vs Legacy).
- **Enrollment profile GUID:** Intune admin center URL fragment for the AOSP enrollment profile (Graph API READ-ONLY GET if URL not directly visible: `GET https://graph.microsoft.com/beta/deviceManagement/androidEnrollmentProfiles/{id}`).

---

### Pattern C: Pico enrollment failure {#pattern-c-pico}

**Typical class:** ⚙️ Config Error (consumer SKU procured by mistake) — occasionally 🔌 Hardware (PUI firmware below floor)

**Symptom:** PICO headset is not visible in Intune after first power-on; user reports the headset went through normal PICO OS first-time setup instead of automatic enrollment. Device is not visible in Intune admin center after expected enrollment window. PICO 4 Enterprise / PICO Neo3 Pro/Eye is supported under AOSP because no GMS is present on these enterprise-tier headsets; if a consumer Pico variant accidentally entered the fleet, AOSP enrollment cannot work — consumer-tier headsets do not expose the AOSP enrollment surface.

**Known Indicators:**

- Device is one of the consumer Pico SKUs (e.g., consumer Pico 4 / consumer Neo3) instead of an Enterprise variant (PICO 4 Enterprise / PICO Neo3 Pro/Eye / PICO 4 Ultra Enterprise).
- PUI firmware below floor (PICO 4 Enterprise < PUI 5.6.0; PICO Neo3 Pro/Eye < PUI 4.8.19).
- PICO Business Suite coexistence misconfigured (Business Suite license / enrollment conflicts with the Intune AOSP profile assignment).
- AOSP enrollment QR was scanned but device did not initiate enrollment — typically a SKU-mismatch indicator at the device side.

**Resolution Steps:**

1. Verify the device is an **Enterprise SKU** per [11-aosp-pico.md#common-failures](../admin-setup-android/11-aosp-pico.md#common-failures) — PICO 4 Enterprise / PICO Neo3 Pro/Eye / PICO 4 Ultra Enterprise. Consumer Pico 4 and consumer Neo3 are NOT supported under AOSP; admin must replace the device or use a different management path. SKU is verifiable on the device label, on the box, or in `Settings > About`. PICO Enterprise is supported under AOSP because no GMS is present on the Enterprise PUI firmware; consumer Pico variants are out of AOSP scope.
2. Verify PUI firmware meets floor: PICO 4 Enterprise ≥ PUI 5.6.0; PICO Neo3 Pro/Eye ≥ PUI 4.8.19. If below floor, update PUI before retry.
3. If using PICO Business Suite coexistence: verify the Business Suite enrollment is compatible with the Intune AOSP enrollment per [11-aosp-pico.md#pico-business-suite-coexistence](../admin-setup-android/11-aosp-pico.md#pico-business-suite-coexistence). PICO Business Suite is OPTIONAL for Intune-direct AOSP enrollment.
4. Re-issue the AOSP enrollment QR from Intune (verify token is Active, mode is correct — userless typical for shared training pods, user-associated for per-user assignment).
5. Factory-reset the device after PUI floor is met / SKU is confirmed Enterprise / Business Suite coexistence is reconciled. Retry AOSP enrollment.

**Microsoft Support escalation packet (D-09 / D-18):**

- **Token sync status:** Intune-side enrollment-profile staging-token Active state + last token-rotation timestamp + AOSP mode (userless / user-associated) — Intune admin center screenshot.
- **Profile assignment state:** PICO Business Suite admin console screenshot if coexistence is configured; otherwise "N/A — Intune-direct mode (PICO Business Suite not configured)". Always include device SKU verification (Enterprise vs consumer — verbatim model name from device label) and PUI firmware version.
- **Enrollment profile GUID:** Intune admin center URL fragment for the AOSP enrollment profile (Graph API READ-ONLY GET if URL not directly visible: `GET https://graph.microsoft.com/beta/deviceManagement/androidEnrollmentProfiles/{id}`).

---

### Pattern D: HTC enrollment failure {#pattern-d-htc}

**Typical class:** ⚙️ Config Error (in-device path missing on older firmware) — occasionally 🔌 Hardware (firmware floor)

**Symptom:** HTC VIVE Focus headset is not visible in Intune after first power-on; the in-device path `Settings > Advanced > MDM setup > QR code` is missing (typically because firmware is below floor); OR admin attempted Vive Business Management System (VBMS) AND Intune simultaneously, which is not supported. HTC VIVE Focus 3 / XR Elite / Focus Vision is supported under AOSP because no GMS is present on these enterprise headsets; if GMS is later present, switch to fully managed (COBO) instead.

**Known Indicators:**

- In-device path `Settings > Advanced > MDM setup > QR code` is missing or returns an error — firmware below floor (Vive Focus 3 < 5.2 - 5.0.999.624; XR Elite < 4.0 - 1.0.999.350; Focus Vision < 7.0.999.159).
- VBMS (Vive Business Management System) is configured on the same device alongside Intune — VBMS is an alternative MDM, not Intune-coexistent.
- AOSP enrollment QR scanned successfully via in-device path but enrollment never completes — typically a token expiry or firmware-floor edge case.
- Consumer Vive variant procured by mistake (out of scope per Phase 45 — enterprise SKUs only: Vive Focus 3 / XR Elite / Focus Vision).

**Resolution Steps:**

1. Verify firmware meets floor per the Hardware Scope table referenced in [12-aosp-htc-vive-focus.md#provisioning-steps](../admin-setup-android/12-aosp-htc-vive-focus.md#provisioning-steps). HTC VIVE Focus is supported under AOSP because no GMS is present on the enterprise headset; if GMS is later present, switch to fully managed (COBO) instead. If below floor, update firmware via HTC's Vive Business support workflow before retry.
2. Choose ONE MDM strategy — Intune-direct AOSP enrollment OR Vive Business Management System (VBMS). VBMS is an alternative vendor MDM and does not coexist with Intune. If VBMS is present alongside Intune, admin must remove VBMS enrollment first per [12-aosp-htc-vive-focus.md#common-failures](../admin-setup-android/12-aosp-htc-vive-focus.md#common-failures).
3. Verify the in-device path `Settings > Advanced > MDM setup > QR code` is navigable on the device. If the path is missing, firmware is below floor (Step 1).
4. Re-issue a fresh AOSP enrollment QR from Intune; confirm the QR includes a current (non-expired) token.
5. Factory-reset the device after firmware floor is met / VBMS is removed / fresh QR is issued. Retry AOSP enrollment via the in-device path.

**Microsoft Support escalation packet (D-09 / D-18):**

- **Token sync status:** Intune-side enrollment-profile staging-token Active state + last token-rotation timestamp + AOSP mode — Intune admin center screenshot.
- **Profile assignment state:** N/A — HTC VIVE Focus has no vendor portal for Intune-direct enrollment. Capture device firmware version (Vive Focus 3 / XR Elite / Focus Vision-specific floor) AND whether VBMS is co-enrolled (admin-provided check: "VBMS not present" OR VBMS removal correspondence with HTC Vive Business support).
- **Enrollment profile GUID:** Intune admin center URL fragment for the AOSP enrollment profile (Graph API READ-ONLY GET if URL not directly visible: `GET https://graph.microsoft.com/beta/deviceManagement/androidEnrollmentProfiles/{id}`).

---

### Pattern E: Meta Quest enrollment failure {#pattern-e-meta-quest}

**Typical class:** 🔐 Auth (Meta for Work account approval gate) — occasionally ⚙️ Config Error (HMS subscription state confusion) or ⏱️ Timing (B2B approval lag)

**Symptom:** Meta Quest headset is enrolled in Intune but not in Meta for Work fleet, OR vice versa, OR the admin is confused about HMS subscription status post-2026-02-20 transition. Meta Quest 2 / 3 / 3s / Pro is supported under AOSP because no GMS is present on the Meta Quest OS; if a future Quest firmware ships with GMS, switch to fully managed (COBO) instead.

> **Important framing on HMS (D-23 PITFALL-7 carry-forward + D-17 explicit cross-link):** As of 2026-02-20, Meta no longer **sells** commercial Quest SKUs and HMS is **free** (not shut down). HMS infrastructure remains operational in maintenance mode through 2030-01-04. Existing HMS subscribers continue uninterrupted; net-new fleets may use Intune-direct AOSP enrollment instead of HMS. If the admin says "HMS is shut down" or "wound down," correct the framing — HMS is alive in transformed (free-tier) form. See [13-aosp-meta-quest.md#meta-horizon-subscription-status](../admin-setup-android/13-aosp-meta-quest.md#meta-horizon-subscription-status) for the full subscription-status reference.

**Known Indicators:**

- Meta for Work account not approved before Step 3 device enrollment (B2B approval can take 1-2 business days, mirroring the Knox B2B pattern).
- HMS subscription state misunderstood — admin assumes HMS shut down rather than transformed-to-FREE post-2026-02-20.
- Commercial Quest SKU procurement attempted post-2026-02-20 (no longer for sale).
- Consumer Meta Quest model deployed in region without availability (Quest 2 / 3 / Pro have regional restrictions; Quest 3s has no regional restriction).
- Device enrolled in Intune but absent from Meta for Work Quest fleet view (one-portal-of-two failure in the canonical 4-portal pattern).
- Device firmware below floor (Quest 2 < v49; Quest 3 < v59; Quest 3s < v71; Quest Pro < v49).

**Resolution Steps:**

1. Verify the **Meta for Work account is approved** before proceeding per [13-aosp-meta-quest.md#meta-for-work-portal-setup](../admin-setup-android/13-aosp-meta-quest.md#meta-for-work-portal-setup). B2B approval can take 1-2 business days; if submitted but >2 business days pending, contact Meta for Work support.
2. Verify the **HMS subscription status** for the deployment scenario per [13-aosp-meta-quest.md#meta-horizon-subscription-status](../admin-setup-android/13-aosp-meta-quest.md#meta-horizon-subscription-status). Meta Quest is supported under AOSP because no GMS is present on the Meta Quest OS; if GMS is later present on Quest firmware, switch to fully managed (COBO) instead. Three deployment-scenario branches:
   - Existing pre-2026-02-20 HMS subscribers → continue uninterrupted; verify subscription state in Meta for Work portal.
   - Net-new fleets post-2026-02-20 → HMS is **free** (HMS-FREE tier); enroll via meta.com/meta-for-work/.
   - Net-new fleets choosing Intune-direct AOSP → no HMS dependency; use the AOSP enrollment QR directly.
3. Cross-check the [13-aosp-meta-quest.md#common-failures](../admin-setup-android/13-aosp-meta-quest.md#common-failures) checklist for the specific failure observed (account-not-approved / device-absent-in-MFW / region-restriction / commercial-SKU-after-cutoff).
4. Verify regional availability for the model: Quest 2 / 3 / Pro require deployment in regions where Meta for Work supports them; Quest 3s has no regional restriction. If the deployment region is unsupported for the model, swap to Quest 3s.
5. Verify firmware meets floor (Quest 2 ≥ v49; Quest 3 ≥ v59; Quest 3s ≥ v71; Quest Pro ≥ v49). If below floor, update via the Meta for Work portal or device-side Settings > Software Update.
6. Factory-reset the device after Meta for Work account approval is confirmed AND HMS subscription state is reconciled AND device-fleet mapping is verified. Retry AOSP enrollment.

**Microsoft Support escalation packet (D-09 / D-18):**

- **Token sync status:** Intune-side enrollment-profile staging-token Active state + last token-rotation timestamp + AOSP mode (userless / user-associated) — Intune admin center screenshot.
- **Profile assignment state:** Meta for Work portal Quest fleet view screenshot showing device-to-fleet mapping (admin-provided). Always include HMS subscription state (FREE-tier post-2026-02-20 / paid-existing-subscriber pre-2026-02-20 transition / Intune-direct N/A) and per-model regional availability check.
- **Enrollment profile GUID:** Intune admin center URL fragment for the AOSP enrollment profile (Graph API READ-ONLY GET if URL not directly visible: `GET https://graph.microsoft.com/beta/deviceManagement/androidEnrollmentProfiles/{id}`).

---

## Play Integrity Verdict Reference (AOSP-relevant)

AOSP L2 investigation references Play Integrity 3-tier verdicts ONLY:

- **Basic integrity** — device hardware/OS not detected as compromised.
- **Basic + Device integrity** — adds basic device-recognition signal.
- **Strong integrity** — requires hardware-backed boot attestation from device TEE.

Use the 3-tier verdict as the canonical attribution surface — do not reference legacy attestation token formats. **Do NOT reference SafetyNet** (deprecated and turned off January 2025).

For AOSP specialty hardware, Strong integrity is generally not achievable on devices that lack a Google-attested TEE chain (which is the typical AOSP-without-GMS case). Basic and Basic+Device tiers are the realistic verdict bands for AOSP enrollment correctness; orgs requiring Strong integrity should evaluate whether AOSP is the right path for the workload (AOSP and hardware-backed Google attestation are largely orthogonal — the Strong tier is a Google-mediated signal that AOSP devices typically cannot satisfy).

## Resolution

Each Pattern sub-section above includes Resolution Steps and a Microsoft Support escalation packet (token sync status, profile assignment state, enrollment profile GUID). This section aggregates the common Microsoft Support case framing.

### Microsoft Support escalation criteria

Escalate to Microsoft Support when:

- All ⚙️ Config Error paths ruled out across the identified Pattern.
- ⏱️ Timing windows have elapsed (24-48 hours for first-sync patterns; 1-2 business days for B2B approval per Pattern E; >5 business days for Meta for Work approval edge cases).
- Pattern indicators match but Resolution Steps do not move the device to the Active state.
- Data collection per [runbook 18](18-android-log-collection.md) is complete.
- Device has been factory-reset at least once after the in-Pattern remediation was applied (AOSP enrollment does not retro-trigger on profile re-assignment alone).

### Case data to attach (all patterns)

1. Device serial number + IMEI 1 (or MEID) + manufacturer (one of: RealWear / Zebra / Pico / HTC / Meta) + model + firmware version.
2. User UPN + tenant domain (when user-associated mode).
3. Pattern (A=RealWear / B=Zebra / C=Pico / D=HTC / E=Meta Quest).
4. Intune admin center screenshots per Investigation Data Collection Steps 1-3.
5. Vendor portal screenshot where applicable (RealWear Cloud Devices view; Meta for Work Quest fleet view; PICO Business Suite admin console) OR explicit "N/A — Intune-direct mode (vendor portal not configured)" callout.
6. AOSP enrollment-token age in days (must be < 90 for userless) + token mode (userless / user-associated).
7. Pattern-specific escalation packet (token sync status, profile assignment state, enrollment profile GUID — per D-09 / D-18).
8. Runbook 18 log artifact IDs (Microsoft Intune app log incident OR adb logcat excerpt where USB debugging was available).
9. Per-OEM addenda:
   - Pattern A (RealWear): staging Wi-Fi auth type (WPA-PSK / WPA2-PSK / WPA3 — must NOT be EAP); whether Wi-Fi credentials embedded in QR.
   - Pattern B (Zebra): OEMConfig app version (Powered by MX vs Legacy); device Android version (must NOT be Android 12); StageNow XML MX schema version (13.5 / 14.2 if applicable).
   - Pattern C (Pico): device SKU verification (Enterprise vs consumer — verbatim model name from device label); PUI firmware version; PICO Business Suite coexistence configured (yes/no).
   - Pattern D (HTC): in-device path used (`Settings > Advanced > MDM setup > QR code` or variant); whether VBMS is also enrolled.
   - Pattern E (Meta Quest): Meta for Work account approval state; HMS subscription state (FREE-tier post-2026-02-20 / paid-existing-subscriber / Intune-direct N/A); per-model regional availability check; commercial-vs-consumer SKU procurement timing relative to 2026-02-20 cutoff.

## Related Resources

- [Android Log Collection Guide (runbook 18)](18-android-log-collection.md) — prerequisite for this runbook
- [L2 Runbook Index](00-index.md#android-l2-runbooks)
- [L1 Runbook 29: Android AOSP Enrollment Failed](../l1-runbooks/29-android-aosp-enrollment-failed.md) — sibling
- [L2 Runbook 22: Android Knox Investigation](22-android-knox-investigation.md) — Samsung KME-scope sibling
- [L2 Runbook 19: Android Enrollment Investigation](19-android-enrollment-investigation.md) — GMS-mode-scope sibling (BYOD / COBO / Dedicated / ZTE)
- [AOSP Stub](../admin-setup-android/06-aosp-stub.md) — AOSP scope context
- [AOSP OEM Matrix](../reference/aosp-oem-matrix.md) — cross-OEM AOSP capability mapping
- [RealWear Admin Setup (09)](../admin-setup-android/09-aosp-realwear.md)
- [Zebra Admin Setup (10)](../admin-setup-android/10-aosp-zebra.md)
- [Pico Admin Setup (11)](../admin-setup-android/11-aosp-pico.md)
- [HTC VIVE Focus Admin Setup (12)](../admin-setup-android/12-aosp-htc-vive-focus.md)
- [Meta Quest Admin Setup (13)](../admin-setup-android/13-aosp-meta-quest.md)
- [Glossary — AOSP](../_glossary-android.md#aosp)
- [Glossary — OEMConfig](../_glossary-android.md#oemconfig)
- [Glossary — Play Integrity](../_glossary-android.md#play-integrity)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-25 | Initial version (Phase 45 AEAOSPFULL-08) — 5 per-OEM Patterns A-E (1:1 routing from L1 runbook 29 Causes A-E) per D-18: Pattern A=RealWear / B=Zebra / C=Pico / D=HTC / E=Meta Quest. Per-Pattern Microsoft Support escalation packet 3-bullet shape (Token sync status / Profile assignment state / Enrollment profile GUID) per D-18 mirroring 22-android-knox-investigation.md:135-139 verbatim. Play Integrity 3-tier verdict reference (ZERO legacy-attestation-token references — Do-NOT-reference warning preserved per D-18 enforcement). Mode-agnostic Investigation Data Collection 4-step structure (Step 1 Intune registration state / Step 2 vendor portal device state with per-OEM variation / Step 3 AOSP enrollment profile + token sync state / Step 4 device-side enrollment state) mirroring 22:30-107. Graph API READ-ONLY scope blockquote per 22:28. L1→L2 Pattern routing block (1:1 OEM-scoped Cause→Pattern) per D-18. Per-Pattern cross-links to per-OEM admin guide `## Common Failures` H2 anchor + per-OEM add-on anchors per D-21 (Pattern A → `09-aosp-realwear.md#wi-fi-qr-embedding` + `#common-failures` + `#provisioning-steps`; Pattern B → `10-aosp-zebra.md#oemconfig-apk-push` + `#common-failures`; Pattern C → `11-aosp-pico.md#pico-business-suite-coexistence` + `#common-failures`; Pattern D → `12-aosp-htc-vive-focus.md#provisioning-steps` + `#common-failures`; Pattern E → `13-aosp-meta-quest.md#meta-for-work-portal-setup` + `#meta-horizon-subscription-status` + `#common-failures`). Pattern E explicitly cross-references `13-aosp-meta-quest.md#meta-horizon-subscription-status` for HMS-related failures per D-17 explicit. PITFALL-7 carry-forward per D-23 (each "supported under AOSP" assertion paired with "no GMS / use AE fully managed if GMS present" framing at point-of-claim across all 5 Pattern Resolution Steps and Pattern Symptom prose). | -- |
