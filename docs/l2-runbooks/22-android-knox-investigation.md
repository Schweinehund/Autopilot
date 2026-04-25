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

## Analysis — Match Against Known Patterns

Match observed indicators to one of five Patterns below. Patterns are independently diagnosable. Each Pattern includes Resolution Steps and a Microsoft Support escalation packet.

### Pattern A: KME Profile Misconfiguration {#pattern-a-kme-profile-misconfiguration}

**Typical class:** ⚙️ Config Error (KME profile EMM choice / Custom JSON Data field-name) — occasionally ⏱️ Timing (B2B approval lag)

**Symptom:** Samsung device boots to Setup Wizard or wrong-mode Intune enrollment; Knox Admin Portal shows device with profile assigned, but device never reaches the Intune DPC OR enrolls into Fully Managed when Dedicated was intended.

**Known Indicators:**

- Knox Admin Portal Devices view shows Samsung device with empty Profile column despite admin assignment attempt (KAP cache lag).
- Knox Admin Portal Profile shows EMM = something other than "Microsoft Intune" (most-common: stale demo profile EMM = `Knox Manage` left from POC testing).
- Custom JSON Data field is empty OR contains placeholder `enter Intune enrollment token string` not yet substituted.
- Intune admin center > Devices > Android shows device enrolled in unexpected mode (Fully Managed when Dedicated intended → KME profile EMM template chose wrong mode at profile creation).
- B2B account approval >2 business days pending despite re-submission (B2B-state subset of Pattern A; admin-side wait gate on Samsung Knox B2B approval queue).

**Resolution Steps:**

1. Verify the Knox profile EMM is set to "Microsoft Intune". Cross-link to admin doc: [Step 2 — Create KME EMM profile](../admin-setup-android/07-knox-mobile-enrollment.md#step-2-emm-profile).
2. Verify Custom JSON Data has the Intune enrollment token substituted (no literal `enter Intune enrollment token string` remains) per [admin doc Step 5](../admin-setup-android/07-knox-mobile-enrollment.md#dpc-custom-json).
3. Verify the Intune-side enrollment profile token is Active (not expired/revoked) via Intune admin center > **Devices** > **Android** > **Android Enterprise enrollment** > **Corporate-owned device enrollment**.
4. If profile assigned AFTER first boot: factory-reset device and retry (KME does not retro-trigger).
5. For B2B approval lag: contact Samsung Knox B2B support per [admin doc Step 0](../admin-setup-android/07-knox-mobile-enrollment.md#step-0-b2b-approval).

**Microsoft Support escalation packet (D-09):**

- **Token sync status:** Intune-side enrollment-profile staging-token Active state + last token-rotation timestamp (Intune admin center screenshot).
- **Profile assignment state:** Knox Admin Portal Profile-to-Devices assignment view (admin-provided screenshot of KAP Devices view with Profile column populated).
- **Enrollment profile GUID:** Intune admin center URL fragment for the enrollment profile (Graph API READ-ONLY GET if URL not directly visible: `GET https://graph.microsoft.com/beta/deviceManagement/androidEnrollmentProfiles/{id}`).

---

### Pattern B: Knox Tripped {#pattern-b-knox-tripped}

**Typical class:** ⚙️ Config Error (firmware-state non-recoverable)

**Symptom:** Samsung device fails KME enrollment with cryptic error and falls back to consumer Setup Wizard; bootloader was previously unlocked OR custom recovery / non-Samsung firmware was flashed at some point in the device's history; the Knox eFuse flag at firmware level is set ("tripped"). Pattern B is non-recoverable for KME — once tripped, the eFuse cannot be reset, the device cannot pass Strong integrity verdict, and KME cannot enroll the device.

**Known Indicators:**

- Play Integrity verdict fails Strong integrity check (Knox attestation contributes to Strong integrity on Samsung devices; tripped efuse prevents hardware-backed attestation regardless of OS state).
- Knox Admin Portal Devices view "Knox eFuse status" column shows `Tripped` (if KAP exposes the field — see Open Question 4).
- Microsoft Q&A reports show admins discovering tripped status after enrollment failures (citation: learn.microsoft.com/answers/questions/2282160).
- Device history includes prior bootloader unlock, custom recovery flash, or non-stock firmware install — even if the device has since been re-flashed with stock Samsung firmware, the eFuse remains tripped.
- Device-side early-boot logs (Step 4) show hardware-backed boot attestation rejection consistent with TEE attestation refusal.

**Resolution Steps:**

1. Confirm Knox-tripped status via Knox Admin Portal Devices view eFuse column (if exposed) OR by escalating to Samsung Knox B2B support with the device serial. Knox-tripped is non-recoverable for KME.
2. Direct admin to alternate enrollment path: Company Portal BYOD (Work Profile — does not require Strong integrity) OR non-KME COBO via `afw#setup` / QR code (note: COBO via QR/`afw#setup` may also fail on tripped devices if Play Integrity Strong gating is enforced by org-level policy; researcher OQ-4).
3. Document the device serial in the tenant's Knox-tripped exclusion list to prevent re-routing through KME workflows.
4. Do NOT attempt firmware-level eFuse-clearing procedures — this is not a supported recovery path for enterprise enrollment, and references claiming such procedures are out of scope for this runbook.

**Microsoft Support escalation packet (D-09):**

- **Token sync status:** Not applicable for Pattern B in the recovery sense (Knox-tripped is firmware-state, not a token issue). Capture Intune-side staging-token Active state for completeness; the token is healthy but the device cannot consume it.
- **Profile assignment state:** Knox Admin Portal Devices view screenshot showing the device row with Knox eFuse status (admin-provided). If KAP does not expose the field, attach Samsung Knox B2B support correspondence confirming tripped status.
- **Enrollment profile GUID:** Intune admin center URL fragment for the enrollment profile that was attempted (the profile is healthy; the device is the failure surface).

---

### Pattern C: KME→ZT Collision {#pattern-c-kme-zt-collision}

**Typical class:** ⚙️ Config Error (dual-portal misconfiguration)

**Symptom:** Samsung device dual-configured in BOTH Knox Mobile Enrollment AND Zero-Touch portal; KME takes precedence at firmware level; ZT enrollment never initiates. Admin observes device enrolling via the KME pathway when ZT was the intended path (or vice versa with KME prevailing — by design, KME wins on Samsung devices when both are configured).

**Known Indicators:**

- Device serial appears in BOTH KAP Devices view AND ZT portal Devices tab.
- Intune shows enrollment via KME pathway (KME profile applied) when ZT was the desired path.
- Admin recently configured ZT for a Samsung fleet that already had KME enrollment in production — ZT was layered on top without removing the KME registration.
- Reseller upload pushed device to BOTH portals (uncommon — most resellers respect the per-account upload destination, but mis-configured reseller workflows can dual-upload).

**Resolution Steps:**

1. Choose ONE portal as the canonical enrollment path for the affected Samsung fleet. KME and ZT are mutually exclusive for Samsung devices — there is no supported dual-portal configuration.
2. Remove the device from the non-canonical portal: if KME is canonical, remove from ZT portal Devices tab; if ZT is canonical, remove from KAP Devices view.
3. Cross-link the resolution to the admin guidance: [admin doc KME/ZT Mutual Exclusion](../admin-setup-android/07-knox-mobile-enrollment.md#kme-zt-mutual-exclusion) and [02-zero-touch-portal.md#kme-zt-mutual-exclusion](../admin-setup-android/02-zero-touch-portal.md#kme-zt-mutual-exclusion).
4. Factory-reset the device after removing it from the non-canonical portal (the device may still hold a cached precedence reference from the prior dual-configuration; factory reset clears this).
5. Retry first-boot enrollment. If KME is canonical, the device should now reach the Knox profile handoff cleanly; if ZT is canonical, the device should enter the ZT DPC flow at first boot.

**Microsoft Support escalation packet (D-09):**

- **Token sync status:** Intune-side staging-token Active state for the canonical portal's enrollment profile (KME profile token if KME is canonical; ZT-linked enrollment profile token if ZT is canonical).
- **Profile assignment state:** Screenshots of BOTH portals showing the device serial — KAP Devices view AND ZT portal Devices tab. After resolution, capture the post-removal screenshot of the non-canonical portal showing the device absent.
- **Enrollment profile GUID:** Intune admin center URL fragment for the canonical portal's enrollment profile.

---

### Pattern D: Knox License Edge {#pattern-d-knox-license-edge}

**Typical class:** ⚙️ Config Error (license activation drift)

**Symptom:** KME profile applies and device enrolls into the expected mode; basic Intune policy applies; BUT advanced KPE Premium features (kiosk customization, advanced restriction policies, OEMConfig payload binding) do not activate. OR Knox Admin Portal device row shows licensing column anomaly (KPE Premium activation column empty despite Plan 1+ tenant entitlement).

**Known Indicators:**

- KPE Premium activation column in KAP Devices view empty despite Plan 1+ tenant.
- Admin attempted to license Knox Suite or Knox Manage thinking it was required for KME (D-01 5-SKU disambiguation reinforced — Knox Suite / Knox Manage are NOT required for KME).
- Advanced KPE policies (kiosk lockdown, advanced restrictions) post-enrollment do not take effect even though they are assigned and the device is enrolled.
- Tenant SKU is below Intune Plan 1 — KPE Premium transparent supply requires Plan 1+ tenant entitlement.

**Resolution Steps:**

1. Verify the tenant has Intune Plan 1 (or higher) — Plan 1+ supplies KPE Premium transparently per [admin doc 5-SKU disambiguation](../admin-setup-android/07-knox-mobile-enrollment.md#sku-disambiguation).
2. Confirm KPE Premium has been free since the Samsung 2024-03-21 update — admins do NOT need to purchase Knox Suite, Knox Manage, or Knox Configure for KME or for KPE Premium activation.
3. If the tenant has Plan 1+ but KPE Premium does not activate on KAP-listed devices: open a Microsoft Support case AND a Samsung Knox B2B support case in parallel (the activation chain crosses both vendors' boundaries).
4. As a temporary workaround while the activation chain is investigated, fall back to non-KPE-Premium-dependent Intune policies (basic device-restriction / configuration profiles) so the device is at least under management.

**Microsoft Support escalation packet (D-09):**

- **Token sync status:** Intune-side staging-token Active state + KPE Premium activation status from KAP Devices view (capture both).
- **Profile assignment state:** Knox Admin Portal Devices view with the KPE Premium activation column visible; Intune admin center configuration-profile assignment status for the affected KPE-dependent policies.
- **Enrollment profile GUID:** Intune admin center URL fragment for the enrollment profile.

---

### Pattern E: DPC JSON Malformation {#pattern-e-dpc-json-malformation}

**Typical class:** ⚙️ Config Error (D-03 anti-paste violation)

**Symptom:** Samsung device hits "Applying configuration..." screen and never advances past it; Knox Admin Portal shows enrollment as "Started" but Intune admin center never sees the device. Enrollment is structurally interrupted at the DPC-handoff step because CloudDPC cannot parse the Custom JSON Data payload.

**Known Indicators:**

- Custom JSON Data contains the ZT-style nested `PROVISIONING_ADMIN_EXTRAS_BUNDLE` wrapper (admin pasted ZT JSON into KME profile by mistake — D-03 anti-paste warning was missed).
- Custom JSON Data is structurally invalid (extra wrapper keys, missing curly brace, escaped-quote drift, line-break characters in the middle of a key).
- Device-side logcat shows `CloudDPC` provisioning intent received but `EXTRA_ENROLLMENT_TOKEN` parsing fails immediately afterward.
- Admin recently maintained both KME and ZT portals and the JSON-paste step was performed in the wrong portal first.

**Resolution Steps:**

1. Replace Custom JSON Data with the FLAT KME JSON: `{"com.google.android.apps.work.clouddpc.EXTRA_ENROLLMENT_TOKEN": "<token>"}` per [admin doc Step 5](../admin-setup-android/07-knox-mobile-enrollment.md#dpc-custom-json).
2. Save the profile in KAP. Re-verify the JSON parses (KAP performs a basic JSON-parse validation on save; reject indicates malformation).
3. Factory-reset the affected device(s). KME does not retro-trigger — devices that were already past first-boot must be reset to re-attempt the enrollment with the corrected JSON.
4. Re-attempt first-boot enrollment. The "Applying configuration..." screen should now advance to the Intune DPC handoff cleanly.
5. To prevent recurrence, confirm both admin docs' anti-paste blockquotes (HTML-comment marker `AEKNOX-03-shared-anti-paste-block`) are present and have not drifted; the structural-contrast rule (FLAT for KME, nested-wrapper for ZT) prevents the silent-failure pattern.

**Microsoft Support escalation packet (D-09):**

- **Token sync status:** Intune-side staging-token Active state (the token itself is healthy; the failure is in the JSON envelope used to deliver the token to CloudDPC).
- **Profile assignment state:** KAP profile screenshot showing the (corrected) Custom JSON Data field; pre-correction screenshot of the malformed JSON if the support case is being filed for root-cause analysis of how the malformation occurred.
- **Enrollment profile GUID:** Intune admin center URL fragment for the enrollment profile.

## Play Integrity Verdict Reference (Knox-relevant)

Knox L2 investigation references Play Integrity 3-tier verdicts ONLY:

- **Basic integrity** — device hardware/OS not detected as compromised.
- **Basic + Device integrity** — adds basic device-recognition signal (recognized device with consistent signal across the integrity check).
- **Strong integrity** — requires hardware-backed boot attestation from device TEE; on Samsung devices, Knox attestation contributes to Strong integrity. **Pattern B (Knox tripped) fails Strong integrity** because the Knox eFuse flag at firmware level prevents hardware-backed attestation regardless of OS state.

Use the 3-tier verdict as the canonical Knox-attribution surface — do not reference legacy attestation token formats. Strong integrity is the relevant tier for Pattern B diagnosis; Basic and Basic+Device tiers are sufficient for Patterns A / C / D / E.

## Resolution

Each Pattern sub-section above includes Resolution Steps and a Microsoft Support escalation packet (token sync status, profile assignment state, enrollment profile GUID). This section aggregates the common Microsoft Support case framing.

### Microsoft Support escalation criteria

Escalate to Microsoft Support when:

- All ⚙️ Config Error paths ruled out across the identified Pattern.
- ⏱️ Timing windows have elapsed (24-48 hours for first-sync patterns; 1-2 business days for B2B approval per Pattern A).
- Pattern indicators match but Resolution Steps do not move the device to the Active state.
- Data collection per [runbook 18](18-android-log-collection.md) is complete.

### Case data to attach (all patterns)

1. Device serial number + Android OS version + Samsung manufacturer (must be Samsung).
2. User UPN + tenant domain.
3. Pattern (A/B/C/D/E).
4. Intune admin center screenshots per Investigation Data Collection Step 1-3.
5. Knox Admin Portal screenshot of device row showing assignment state + Knox eFuse status (if KAP exposes it).
6. Knox B2B account email + KME profile name.
7. Pattern-specific escalation packet (token sync status, profile assignment state, enrollment profile GUID — per D-09).
8. Runbook 18 log artifact IDs (Microsoft Intune app log incident OR adb logcat excerpt).

## Related Resources

- [Android Log Collection Guide (runbook 18)](18-android-log-collection.md) — prerequisite for this runbook
- [L2 Runbook Index](00-index.md#android-l2-runbooks)
- [L1 Runbook 28: Android Knox Enrollment Failed](../l1-runbooks/28-android-knox-enrollment-failed.md) — sibling
- [Knox Mobile Enrollment Admin Guide](../admin-setup-android/07-knox-mobile-enrollment.md)
- [Glossary — Knox](../_glossary-android.md#knox)
- [Glossary — KME](../_glossary-android.md#kme)
- [Glossary — KPE](../_glossary-android.md#kpe)
- [Glossary — Play Integrity](../_glossary-android.md#play-integrity)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-25 | Initial version — KME L2 investigation runbook (5-pattern A-E structure with D-09 Microsoft Support escalation packets; Play Integrity 3-tier verdict reference; Pattern B Strong-integrity attribution). | -- |
