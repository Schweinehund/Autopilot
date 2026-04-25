---
last_verified: 2026-04-25
review_by: 2026-06-24
audience: admin
platform: Android
applies_to: KME
---

# Configure Knox Mobile Enrollment

> **Platform gate:** Samsung Knox Mobile Enrollment (KME) — Knox Admin Portal account setup, EMM profile, Custom JSON Data, and Knox→Intune handoff for Samsung Android Enterprise enrollment. Samsung-only.
> For iOS, see [iOS Admin Guides](../admin-setup-ios/00-overview.md); for macOS, [macOS Admin Setup](../admin-setup-macos/00-overview.md); for terminology, [Android glossary](../_glossary-android.md).

> ⚠️ **KME/ZT mutual exclusion (Samsung):** For Samsung fleets, choose either Knox Mobile Enrollment (KME) or Zero-Touch Enrollment — never both. Configuring both causes out-of-sync enrollment state; KME takes precedence at the device firmware level. See [02-zero-touch-portal.md#kme-zt-mutual-exclusion](02-zero-touch-portal.md#kme-zt-mutual-exclusion) for the within-ZT-doc record and [KME/ZT Mutual Exclusion](#kme-zt-mutual-exclusion) below for the within-this-doc record.

Phase 44 scope: Samsung Knox Admin Portal B2B account, EMM profile, Knox Custom JSON Data, and Knox→Intune handoff. KME provisions Samsung devices into existing Android Enterprise modes (COBO / Dedicated / WPCO); KME is NOT a separate enrollment mode.

<a id="prerequisites"></a>
## Prerequisites

- [ ] **MGP binding complete** — See [01-managed-google-play.md](01-managed-google-play.md); KME via Intune is a GMS path that requires Managed Google Play before Knox profile assignment.
- [ ] **Samsung Knox B2B account submitted** — Corporate-email-bound Samsung Knox B2B account; approval takes 1-2 business days. See [Step 0](#step-0-b2b-approval) below.
- [ ] **Samsung devices (Knox-eligible hardware)** — Knox Mobile Enrollment requires Samsung hardware; non-Samsung Android devices must enroll via Zero-Touch (see [02-zero-touch-portal.md](02-zero-touch-portal.md)) or QR / NFC / `afw#setup`.
- [ ] **Reseller channel OR Knox Deployment App pathway** — New procurement: Samsung devices uploaded by an authorized Samsung reseller. Existing stock: Knox Deployment App (KDA) on a separate Android device used to enroll Samsung devices via Bluetooth or NFC. See [Step 3](#step-3-add-devices) for both paths.
- [ ] **Microsoft Intune Plan 1+** with the Intune Administrator role and an exported Intune enrollment token for use in Knox Custom JSON Data (see [Step 5](#dpc-custom-json)).

<a id="step-0-b2b-approval"></a>
## Step 0 — Samsung Knox Portal B2B account approval (1-2 business days)

Submit your Samsung Knox B2B account application TODAY (Day 0). Samsung approval typically takes 1-2 business days, and Knox Admin Portal access is gated behind approval.

**Submit your B2B account:**

1. Navigate to the [Samsung Knox Portal](https://www.samsungknox.com/en/solutions/it-solutions/knox-mobile-enrollment) and select **Get started** → **Apply for a B2B account**. <!-- verify UI at execute time -->
2. Submit the corporate-email-bound application; expect 1-2 business days for approval.
3. While waiting, productively use the wait window:
   - Read the rest of this guide (Steps 1-N) to align on Knox profile, EMM choice, and DPC JSON.
   - Identify the Samsung devices in scope: serial numbers, IMEI 1, manufacturer (Samsung), model.
   - Coordinate with your authorized Samsung reseller (existing-stock route) OR plan Knox Deployment App (existing-stock retroactive route).
   - Export the Intune enrollment token for use in Step N (DPC Custom JSON Data).

> **What breaks if misconfigured:** Submitting B2B late delays the entire enrollment cycle by 1-2 business days at the moment devices are needed. Recovery: submit on Day 0; if Samsung approval is delayed beyond 2 business days, contact Samsung Knox B2B support with the application ID. Symptom appears in: Knox Admin Portal sign-in returns "Account pending approval".

<a id="step-1-knox-portal"></a>
## Step 1 — Sign in to Knox Admin Portal

Once Samsung has approved your B2B account (Step 0), sign in to the Knox Admin Portal to access KME profile authoring, device management, and reseller-upload visibility.

#### In Knox Admin Portal

1. Navigate to [Knox Admin Portal](https://knox.samsung.com). <!-- verify UI at execute time -->
2. Sign in using the corporate-email-bound credentials submitted during the Step 0 B2B application.
3. In the sidebar, locate: **Mobile Enrollment**, **Devices**, **Profiles**, **Resellers**, **Settings**. The Mobile Enrollment area is the entry point for KME profile authoring and device assignment.
4. Confirm your tenant and admin role; the Knox Admin Portal supports per-admin scope but Knox Mobile Enrollment requires at least Knox admin role (not Knox viewer).

   > **What breaks if misconfigured:** Signing in with a personal Samsung account (not the corporate-bound B2B account) lands the admin in the consumer Samsung account view with no Knox Mobile Enrollment access. Recovery: sign out, sign back in with the corporate-email account approved at Step 0. Symptom appears in: Knox Admin Portal sidebar (Mobile Enrollment / Devices / Profiles entries missing).

<a id="step-2-emm-profile"></a>
## Step 2 — Create KME EMM profile (target Microsoft Intune)

The KME EMM profile defines (a) the EMM the device will hand off to (Microsoft Intune), (b) the Android Enterprise mode the device will land in (Fully Managed / Dedicated / WPCO), and (c) the Custom JSON Data carrying the Intune enrollment token. KME does NOT enroll devices into a separate "KME mode"; it provisions Samsung devices into one of the existing Android Enterprise device-owner modes via the Knox portal handoff.

#### In Knox Admin Portal

1. Navigate to **Mobile Enrollment** → **Profiles** → **Add profile**. <!-- verify UI at execute time -->
2. Select **Android Enterprise** as the profile type.
3. **Profile name** — enter a descriptive name. Record the exact string for later; the profile name is the user-facing identifier when assigning device sets.
4. **EMM** — select **Microsoft Intune** from the EMM dropdown. This sets the DPC handoff target to the Intune CloudDPC.

   > **What breaks if misconfigured:** Selecting an EMM other than Microsoft Intune (for example Knox Manage or a partner EMM) at this step routes the device to the wrong management surface; Intune admin center never sees the device. Recovery: edit the KME profile to set EMM to Microsoft Intune; reassign and factory-reset the device. Symptom appears in: Intune admin center > Devices > Android (device absent) and Knox Admin Portal > Devices (device shows wrong EMM column value).

5. **Mode (device-owner mode)** — choose Fully Managed (COBO) for corporate user devices, Dedicated for shared single-purpose devices, or WPCO for Work-Profile-on-Company-Owned. KME does NOT support BYOD Work Profile (Knox is for company-owned hardware).
6. **Custom JSON Data** — paste the FLAT KME JSON (see [Step 5 — DPC Custom JSON Data](#dpc-custom-json) below). This is the Intune enrollment token surface.

   > **What breaks if misconfigured:** Selecting the wrong device-owner mode at Step 2 lands the device in the wrong Android Enterprise mode. Recovery: edit the KME profile mode and factory-reset affected devices (mode is set at provisioning time and is not retroactively changeable). Symptom appears in: Intune admin center showing devices in Fully Managed when Dedicated was intended (or vice versa).

<a id="step-3-add-devices"></a>
## Step 3 — Add devices: reseller bulk upload OR Knox Deployment App

KME supports two device-onboarding pathways. Choose based on whether devices are new procurement (reseller route) or existing stock (Knox Deployment App route).

### Reseller bulk upload (new procurement)

For new corporate procurement of Samsung devices, the authorized Samsung reseller uploads the device IMEI / serial list directly to the Knox Admin Portal at purchase time. This is the canonical path: devices appear in the Knox Admin Portal Devices view without admin intervention.

#### In Knox Admin Portal

1. Confirm with your authorized Samsung reseller: (a) the corporate Knox Admin Portal account, so uploaded devices appear under your tenancy; (b) the device-identifier type they will upload (IMEI 1 / serial); (c) the expected device count for reconciliation.
2. After upload, devices appear in **Mobile Enrollment** → **Devices** within 24 hours of reseller submission. Reconcile against the expected device count.
3. Resolve any rejected or invalid identifiers with the reseller and re-upload as needed.

   > **What breaks if misconfigured:** Reseller upload latency exceeds 24 hours; devices not visible in Knox Admin Portal Devices view at first-boot time. Recovery: contact reseller with submission timestamp and identifier list; re-submit if Samsung Knox upload was rejected. Devices that ship before the reseller upload completes will boot to consumer setup and require factory-reset retry once the upload lands. Symptom appears in: Knox Admin Portal > Devices view (expected serials missing).

### Knox Deployment App (existing stock)

For existing Samsung stock that was not procured through a Knox-aware reseller, use the Knox Deployment App (KDA) to enroll devices retroactively. KDA runs on a separate Android device and pushes KME registration to target devices via Bluetooth or NFC.

#### In Knox Deployment App

1. Install the Knox Deployment App on a separate Android device (not the target device). Sign in with the same corporate-bound Knox Admin Portal credentials.
2. Select the KME profile created at Step 2 as the target profile.
3. Bring the target Samsung device(s) within Bluetooth or NFC range; KDA pushes the KME registration. The target device must be factory-reset (out-of-box) to receive the registration.
4. After KDA completes, target devices appear in **Mobile Enrollment** → **Devices** in the Knox Admin Portal.

   > **What breaks if misconfigured:** Knox Deployment App run against a target device that is NOT factory-reset (for example, a device already past Setup Wizard) silently fails to register; the target device shows no KDA acknowledgment. Recovery: factory-reset the target device, retry the KDA push from a fully-charged source device with Bluetooth/NFC enabled. Symptom appears in: KDA app (no success confirmation) and Knox Admin Portal > Devices (target device missing).

<a id="step-4-assign-profile"></a>
## Step 4 — Assign KME profile to device set

Once devices are visible in the Knox Admin Portal Devices view (via reseller upload or KDA), assign the KME profile authored at Step 2 to the target device set. Profile assignment must occur BEFORE first boot — assignment after first boot will not retro-trigger KME.

#### In Knox Admin Portal

1. Navigate to **Mobile Enrollment** → **Devices**. <!-- verify UI at execute time -->
2. Select the target device set (filter by serial / IMEI / model as needed).
3. Choose **Assign profile** and select the KME profile from Step 2.
4. Confirm assignment; the Devices view shows the assigned profile name in the profile column.

   > **What breaks if misconfigured:** If the KME profile is assigned AFTER first boot, KME does not retro-trigger; the device must be factory-reset to re-trigger first-boot KME registration. Recovery: factory-reset the device; KME profile assignment must already be in place at the time of factory reset. Symptom appears in: Intune admin center (device absent) and Knox Admin Portal (device shows assigned profile but no enrollment activity post-first-boot).

<a id="dpc-custom-json"></a>
## Step 5 — DPC Custom JSON Data

The Custom JSON Data field in the KME EMM profile carries the Intune enrollment token. Knox uses ONLY a flat key for KME — there is no nested provisioning-extras-bundle wrapper. This is the structural difference from the Zero-Touch DPC extras JSON that makes the anti-paste callout below operationally critical.

<!-- AEKNOX-03-shared-anti-paste-block -->
> ⚠️ **DO NOT paste this JSON into the other portal**
> The KME and ZT DPC-extras JSON look similar but use different field names.
> Pasting ZT JSON into KME (or vice versa) silently produces a "stuck applying configuration" failure.
> If you maintain both portals: confirm the portal name in your browser tab before pasting.
<!-- /AEKNOX-03-shared-anti-paste-block -->

```json
{"com.google.android.apps.work.clouddpc.EXTRA_ENROLLMENT_TOKEN": "enter Intune enrollment token string"}
```

**Fields reference:**

| Field | Required | Source | Purpose |
|---|---|---|---|
| `com.google.android.apps.work.clouddpc.EXTRA_ENROLLMENT_TOKEN` | Required | Microsoft Learn `setup-samsung-knox-mobile` | Replace `enter Intune enrollment token string` with the token exported from your Intune enrollment profile; preserve double quotes. |

**Structural contrast with Zero-Touch (do NOT copy):** The Zero-Touch DPC extras JSON uses a nested provisioning-admin-extras-bundle wrapper plus three fixed provisioning-device-admin fields (component name, signature checksum, package download location). Knox's Custom JSON Data is FLAT — a single key/value pair with NO nested wrapper. Pasting the ZT-shaped JSON (with the nested wrapper) into Knox silently produces a "stuck applying configuration" failure: Knox does not recognize the wrapper structure and the device hangs at the DPC handoff step. See the anti-paste blockquote above for the per-paste warning.

> **What breaks if misconfigured:** Pasting Zero-Touch DPC extras JSON (with the nested wrapper structure) into Knox Custom JSON Data silently produces a "stuck applying configuration" failure at first boot. Recovery: replace the Custom JSON Data field with the FLAT Knox JSON shown above; factory-reset affected devices. Symptom appears in: device setup flow (stuck at DPC handoff) and Intune admin center (no enrollment activity for affected serials).

<a id="step-6-first-boot"></a>
## Step 6 — Verify first-boot enrollment

After profile assignment (Step 4) and Custom JSON Data paste (Step 5), the next factory-reset of an assigned Samsung device triggers the KME flow at first boot. The device contacts Samsung Knox firmware, receives the EMM=Intune handoff, downloads the CloudDPC, and enrolls into the chosen Android Enterprise mode.

#### In Intune admin center

1. Sign in to [Intune admin center](https://endpoint.microsoft.com). <!-- verify URL at execute time -->
2. Navigate to **Devices** > **By platform** > **Android** to confirm the test device appears within ~15 minutes of first-boot completion.
3. Confirm the device shows the expected Android Enterprise mode (Fully Managed / Dedicated / WPCO) matching the KME profile mode set at Step 2.

   > **What breaks if misconfigured:** If the device shows the wrong Android Enterprise mode in Intune admin center (for example, Fully Managed when Dedicated was intended), the KME profile EMM template chose the wrong mode at Step 2. Recovery: edit the KME profile mode in Knox Admin Portal; reassign and factory-reset affected devices. Symptom appears in: Intune admin center > Devices > Android (device row shows incorrect ownership / mode value).

<a id="sku-disambiguation"></a>
## Knox SKU disambiguation (5 SKUs)

The Samsung Knox SKU family is frequently confused. KME (the deliverable of this guide) is FREE and does NOT require a paid Knox license. KPE Premium has been free since Samsung's 2024-03-21 licensing update. Microsoft Intune Plan 1+ supplies KPE Premium transparently to enrolled Samsung devices. Knox Suite is a per-device bundle that gates advanced features beyond KPE Premium.

| SKU | KPE Standard | KPE Premium | Cost | Required for KME | Intune relationship |
|---|---|---|---|---|---|
| KME | — | — | Free | YES (the deliverable itself) | Knox portal → Intune handoff |
| KPE | Free baseline | Per-device upgrade (now free per Samsung 2024-03-21) | Free / Premium tier | NOT required for KME | Plan 1+ supplies Premium transparently |
| Knox Manage | — | — | Per-device | N/A — alternative MDM | Mutually exclusive with Intune |
| Knox Suite | — | — | Per-device bundle | NOT required for KME | Bundle that includes KPE Premium |
| Knox Configure | — | — | Per-device | NOT required for KME | Independent |

<a id="kme-zt-mutual-exclusion"></a>
## KME/ZT Mutual Exclusion (Samsung)

For Samsung fleets, Knox Mobile Enrollment (KME) and Zero-Touch Enrollment are mutually exclusive.

**From the KME side:** when both KME and ZT are configured on the same Samsung device, KME takes precedence at the device firmware level. Devices registered in both portals will enroll via KME and ignore the ZT configuration entirely. To apply Zero-Touch on a Samsung device, remove the KME configuration for that device set in Knox Admin Portal.

**From the ZT side:** Google's canonical statement (`support.google.com/work/android/answer/7514005`): *"If a device is registered and configured in both Knox Mobile Enrollment and zero-touch, the device will enroll using Knox Mobile Enrollment."*

For the Zero-Touch-side record of this mutex, see [02-zero-touch-portal.md#kme-zt-mutual-exclusion](02-zero-touch-portal.md#kme-zt-mutual-exclusion). For the at-device-claim concrete check from the ZT side, see [02-zero-touch-portal.md#kme-zt-device-claim](02-zero-touch-portal.md#kme-zt-device-claim).

## Verification

After Knox profile assignment + first-boot enrollment:

- [ ] Knox Admin Portal Devices view shows the Samsung device (after reseller upload OR Knox Deployment App enrollment) within 24 hours of upload.
- [ ] KME profile assigned to device set BEFORE first boot (assignment after first boot will not retro-trigger KME — device must be factory-reset).
- [ ] Custom JSON Data contains ONLY `{"com.google.android.apps.work.clouddpc.EXTRA_ENROLLMENT_TOKEN": "..."}` — no nested provisioning-extras-bundle wrapper.
- [ ] Test Samsung device boots into the Intune DPC via KME flow; appears in Intune admin center > Devices > Android within ~15 minutes of first-boot completion.

<a id="renewal-maintenance"></a>
## Renewal / Maintenance

| Component | Renewal Period | Consequence of Lapse | Renewal Steps |
|---|---|---|---|
| Samsung Knox B2B account | Account-perpetual once approved; access tied to corporate email | Knox Admin Portal sign-in fails | Re-apply via Samsung Knox B2B portal; 1-2 business day approval |
| KME profile staging-token | Configurable per Intune enrollment profile | New KME enrollments fail; previously enrolled devices unaffected | Regenerate enrollment token in Intune admin center; update Custom JSON Data field in Knox Admin Portal profile |
| KPE Premium licensing | Free since Samsung 2024-03-21; Intune Plan 1+ supplies transparently | None expected at this time | Verify Plan 1+ activation via Knox Admin Portal device row license column |

<a id="what-breaks"></a>
## What Breaks Summary

Inline what-breaks callouts at each decision point. Severity descending within each source section.

| Misconfiguration | Section | Severity |
|------------------|---------|----------|
| B2B account not submitted on Day 0 | [Step 0](#step-0-b2b-approval) | CRITICAL |
| KME profile EMM not set to Microsoft Intune | [Step 2](#step-2-emm-profile) | HIGH |
| DPC Custom JSON Data copy-pasted from Zero-Touch (with wrapper) | [Step 5](#dpc-custom-json) | HIGH (silent failure) |
| KME profile assigned AFTER first boot (no retro-trigger) | [Step 4](#step-4-assign-profile) | CRITICAL (factory-reset required) |
| KME and Zero-Touch dual-configured on same Samsung device set | [KME/ZT Mutual Exclusion](#kme-zt-mutual-exclusion) | HIGH |

## See Also

- [Managed Google Play Binding](01-managed-google-play.md) — prerequisite for Knox Mobile Enrollment via Intune
- [Android Enterprise Admin Setup Overview](00-overview.md)
- [Zero-Touch Portal Configuration](02-zero-touch-portal.md) — for the KME/ZT mutual-exclusion record (Samsung devices choose ONE)
- [Android Enterprise Prerequisites](../android-lifecycle/01-android-prerequisites.md)
- [Android Provisioning Methods](../android-lifecycle/02-provisioning-methods.md#knox-mobile-enrollment)
- [Android Enterprise Provisioning Glossary](../_glossary-android.md#knox)
- [L1 Runbook 28: Android Knox Enrollment Failed](../l1-runbooks/28-android-knox-enrollment-failed.md)
- [L2 Runbook 22: Android Knox Investigation](../l2-runbooks/22-android-knox-investigation.md)

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-04-25 | Initial version (Phase 44 scope) — Samsung Knox B2B account approval (Step 0 1-2 business day gate per D-02), reseller bulk upload + Knox Deployment App provisioning paths, KME EMM profile + Intune DPC Custom JSON Data (flat `EXTRA_ENROLLMENT_TOKEN` key per Microsoft Learn `setup-samsung-knox-mobile`), 5-SKU disambiguation table (D-01 5-SKU H2 lock), KME/ZT mutex (reciprocal of `02-zero-touch-portal.md#kme-zt-mutual-exclusion`), D-03 anti-paste blockquote (`AEKNOX-03-shared-anti-paste-block`). | -- |
