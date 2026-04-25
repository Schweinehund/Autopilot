---
last_verified: 2026-04-25
review_by: 2026-06-24
applies_to: KME
audience: L2
platform: Android
---

> **Platform gate:** This guide covers Android Enterprise L2 investigation via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L2 Runbooks](00-index.md#ios-l2-runbooks).

# Android Knox Mobile Enrollment Investigation

## Context

This runbook covers Knox Mobile Enrollment failure investigation across Samsung KME-provisioned devices (provisions into COBO / Dedicated / WPCO modes — KME does NOT enroll devices into a separate KME mode; it provisions Samsung devices into one of the three existing Android Enterprise device-owner modes via the Knox portal handoff). AOSP enrollment is out of scope. Samsung Galaxy XR / wearable / tablet KME variants are routed to Phase 45 (per-OEM AOSP).

Before starting: collect a diagnostic package per the [Android Log Collection Guide](18-android-log-collection.md) using the method appropriate for the enrollment mode (Microsoft Intune app logs preferred for KME-provisioned COBO / Dedicated / WPCO; adb logcat as last-resort tier where USB debugging is available). KME-specific admin actions reference [Knox Mobile Enrollment Admin Setup](../admin-setup-android/07-knox-mobile-enrollment.md).

**From L1 escalation?** [L1 runbook 28 (Knox enrollment failed)](../l1-runbooks/28-android-knox-enrollment-failed.md) has escalated. L1 collected: serial number, KME profile name, device manufacturer = Samsung, observed Cause. Skip to the Pattern matching L1's observation:

- L1 28 Cause A (B2B account pending) → [Pattern A](#pattern-a-kme-profile-misconfiguration) (KME profile misconfiguration / B2B account state)
- L1 28 Cause B (device not in KAP) → [Pattern B](#pattern-b-knox-tripped) (Knox tripped status investigation) OR reseller-upload audit
- L1 28 Cause C (KME profile not assigned) → [Pattern A](#pattern-a-kme-profile-misconfiguration) (KME profile misconfiguration)
- L1 28 Cause D (KME/ZT collision) → [Pattern C](#pattern-c-kme-zt-collision) (KME→ZT collision)
- L1 28 Cause E (DPC JSON malformed / Knox license / Knox tripped) → [Pattern D](#pattern-d-knox-license-edge) (Knox license edge cases) OR [Pattern E](#pattern-e-dpc-json-malformation) (DPC custom JSON malformation)
- No L1 escalation: begin at Investigation Data Collection Step 1

> **Graph API scope:** Where this runbook references the Microsoft Graph API, usage is strictly READ-ONLY (GET requests). No modifications. No token regeneration. No DPC extras JSON mutation. For deep Android Enterprise Graph operations, see ADDTS-ANDROID-02 (future milestone — Android Graph API deep-dive).

## Investigation — Data Collection (mode-agnostic)

### Step 1: Device registration state (Intune admin center > Devices > All devices)

**Breadcrumb:** Intune admin center > **Devices** > **All devices** > search by serial number or filter by user UPN.

**Observables to collect:**

- Is the device visible at all? A KME-targeted Samsung device that never appears in Intune was not handed off — the KME → Intune token-sync chain broke before the device reached Intune.
- **Manufacturer** field: must show `Samsung` for any KME-eligible device. A non-Samsung manufacturer indicates the device was incorrectly routed to L1 28 / this runbook (KME is Samsung-only by design).
- **Managed by** field: should show `Microsoft Intune` for a successfully enrolled KME device.
- **Enrollment type** field: KME provisions Samsung devices into one of the three existing Android Enterprise modes. Expected values: `Android Enterprise (Fully managed)` for KME→COBO; `Android Enterprise (Dedicated)` for KME→Dedicated; `Android Enterprise (Corporate-owned work profile)` for KME→WPCO. There is no "KME enrollment type" — KME is the provisioning method, not the mode.
- **Compliance state** and **Last check-in** timestamp: same expectations as the general enrollment-investigation runbook. `Not evaluated` immediately post-enrollment is normal within the first 15-30 minute window.

**What a missing or wrong-mode device tells you:**

- Device not registered → KME handoff broke before reaching Intune. Proceed to Step 2 (Knox Admin Portal state) to determine whether the Knox portal acknowledged the device.
- Device registered but in wrong mode (e.g., Fully Managed when Dedicated was intended) → KME EMM profile template selected the wrong mode at profile creation; correlate with Step 3 (Knox profile + token sync state) — likely Pattern A.
- Device registered but stuck at `Not enrolled` or "Applying configuration..." → DPC provisioning started but did not complete; collect per Step 4 — likely Pattern E (DPC JSON malformation).

### Step 2: Knox Admin Portal device state

**Breadcrumb:** Knox Admin Portal (https://admin.samsungknox.com) > **Devices** view > search by serial number or IMEI.

This step is admin-only (the L2 worker typically does not have direct Knox Admin Portal access). Coordinate with the tenant admin to capture the observables; KAP exposes the upstream-of-Intune state of the KME handoff.

**Observables to collect:**

- Is the device's serial in the KAP **Devices** view at all? A device absent from KAP was never registered with the Knox portal — either reseller upload did not include this device's serial, or the Knox Deployment App registration failed. Likely Pattern A or reseller-upload audit.
- **Profile** column for the device row: should be populated with the assigned KME profile name. An empty Profile column despite admin assignment attempt indicates KAP cache lag OR admin assignment never completed; correlate with Step 3.
- **Knox eFuse status** column (if KAP exposes the field — researcher OQ-4): if the column is present and shows `Tripped`, this is a Pattern B (Knox tripped) finding. KAP-exposed eFuse status is the primary admin-side signal for Pattern B.
- **Last sync** timestamp on the Knox profile assignment: a stale timestamp (>24 hours) with the device still failing enrollment indicates assignment did not propagate — re-trigger profile push or factory-reset and retry per [admin doc Step 4](../admin-setup-android/07-knox-mobile-enrollment.md#step-4-assign-profile).

**What KAP state tells you:**

- Device absent from KAP Devices view → reseller-upload gap (B2B account state) or KDA registration failed → Pattern A scope (KME profile misconfiguration / B2B state).
- Device present in KAP but Profile column empty → Pattern A (KME profile assignment).
- Knox eFuse status `Tripped` (or admin-confirmed-tripped via Samsung support) → Pattern B (Knox tripped).
- Device present in KAP with profile assigned but Intune Step 1 shows nothing → Step 3 (Knox profile + Intune token sync state) — likely Pattern A or Pattern E.

### Step 3: Knox profile + Intune enrollment token sync state

**Breadcrumb:** Knox Admin Portal > **Profiles** > select the assigned KME profile; AND Intune admin center > **Devices** > **Android** > **Android enrollment** > **Corporate-owned device enrollment** > select the linked enrollment profile.

The KME → Intune handoff has two configuration surfaces that must agree: the Knox profile EMM target (Knox-side) and the Intune-side enrollment-profile staging-token (Intune-side).

**Observables to collect:**

- KME profile **EMM** field: must be set to `Microsoft Intune`. Common drift: stale demo profile EMM = `Knox Manage` left from POC testing; KME profile re-points must be done explicitly.
- KME profile **Custom JSON Data** field: must contain a parsable JSON object with the FLAT key `com.google.android.apps.work.clouddpc.EXTRA_ENROLLMENT_TOKEN` and the actual Intune enrollment token substituted for the placeholder. Common drift: literal string `enter Intune enrollment token string` left in place; OR ZT-style nested wrapper pasted in by mistake (see Pattern E for the structural-contrast diagnosis).
- Intune-side enrollment profile **Token** state: must show `Active` (not `Expired` / `Revoked`). Capture last-rotation timestamp.
- Cross-check: does the token string substituted into KME Custom JSON Data match the active token displayed on the Intune enrollment-profile page? A token-rotation event on the Intune side that was not propagated to KAP produces a token-mismatch silent failure.

**What sync-state observations tell you:**

- KME profile EMM ≠ Microsoft Intune → Pattern A (KME profile misconfiguration). Resolution: re-target the EMM in KAP per [admin doc Step 2](../admin-setup-android/07-knox-mobile-enrollment.md#step-2-emm-profile).
- Custom JSON Data unparsable / wrapper-key bearing → Pattern E (DPC JSON malformation). Resolution: replace with FLAT KME JSON per [admin doc Step 5](../admin-setup-android/07-knox-mobile-enrollment.md#dpc-custom-json).
- Intune token Expired / Revoked → re-issue token, propagate substituted token to KAP Custom JSON Data, factory-reset the device, retry first boot.
- Token mismatch (KAP-substituted token ≠ Intune-active token) → re-substitute the current Intune-active token into KAP, save profile, factory-reset, retry.

### Step 4: Device-side enrollment state (collect per runbook 18 based on mode)

Collect device-side state using [Android Log Collection Guide](18-android-log-collection.md) Section 2 (Microsoft Intune app logs — preferred for KME-provisioned COBO / Dedicated / WPCO) or Section 3 (adb logcat last-resort tier — subject to device-owner USB-debug constraint on KME-provisioned devices).

**Observables to collect:**

- Microsoft Intune app log incident ID — captured via the Intune app's self-service log collection menu, OR ticket-based retrieval per runbook 18 Section 2.
- adb logcat excerpt (if USB debugging is available pre-KME-handoff): filter for `DevicePolicyManager:* CloudDPC:* IntuneManagedAgent:*` events covering the boot-to-failure window.
- Device-side error dialogs surfaced during the KME handoff: a "Stuck Applying configuration..." screen is the canonical Pattern E indicator; cryptic-error-then-Setup-Wizard-fallback is the canonical Pattern B indicator.

**Key signals to look for:**

- `CloudDPC` provisioning intent received but `EXTRA_ENROLLMENT_TOKEN` parsing fails → Pattern E (DPC JSON malformation).
- `DevicePolicyManager setDeviceOwner` call never present in logcat → KME handoff to CloudDPC did not occur; correlate with Step 3 (token sync state) — likely Pattern A or Pattern E.
- Knox attestation failure / hardware-backed boot attestation rejection in early-boot logs → Pattern B (Knox tripped) indicator at the device side; corroborate with Step 2 KAP eFuse status.
- IntuneManagedAgent enrollment events present but advanced KPE policy (kiosk lockdown / advanced restrictions) absent post-enrollment → Pattern D (Knox license edge — KPE Premium activation drift).

After completing Steps 1-4, proceed to Analysis — Match Against Known Patterns below.
