---
last_verified: 2026-04-25
review_by: 2026-06-24
audience: admin
platform: Android
applies_to: ZTE
---

# Configure Zero-Touch Portal

> **Platform gate:** ZT portal account setup, DPC extras JSON, and ZT↔Intune linking for Android Enterprise Zero-Touch Enrollment (ZTE).
> For iOS, see [iOS Admin Guides](../admin-setup-ios/00-overview.md); for macOS, [macOS Admin Setup](../admin-setup-macos/00-overview.md); for terminology, [Android glossary](../_glossary-android.md).

> **Reseller prerequisite:** Devices must be purchased from an authorized Zero-Touch reseller. Self-registration of existing stock is not supported. Devices deregistered from Zero-Touch cannot be re-registered without reseller involvement. See [Step 0](#step-0-reseller) below.

> ⚠️ **KME/ZT mutual exclusion (Samsung):** For Samsung fleets, choose either Knox Mobile Enrollment (KME) or Zero-Touch Enrollment — never both. Configuring both causes out-of-sync enrollment state. See [Knox Mobile Enrollment](07-knox-mobile-enrollment.md) for full KME admin coverage and [KME/ZT Mutual Exclusion](#kme-zt-mutual-exclusion) below for the within-this-doc record.

Phase 35 scope: ZT portal setup, ZT↔Intune linking, DPC extras JSON. Corporate-scale content (device-claim workflow, profile-assignment at scale, dual-SIM IMEI 1, reseller-upload handoff) is Phase 39 and will extend this guide.

<!-- The #### In Managed Google Play subsection is intentionally omitted. MGP is a prerequisite
     for ZTE via Intune but is not used directly in ZT portal setup; see 01-managed-google-play.md. -->

<a id="prerequisites"></a>
## Prerequisites

- [ ] **MGP binding complete** — See [01-managed-google-play.md](01-managed-google-play.md); ZTE via Intune is a GMS path.
- [ ] **Authorized ZT reseller relationship** — See [Step 0](#step-0-reseller).
- [ ] **ZT portal Google account** — Corporate email (NOT Gmail); see [Create ZT Portal Account](#create-zt-account).
- [ ] **Intune enrollment profile** with exported token.
- [ ] **Microsoft Intune Plan 1+** and Intune Administrator role.

<a id="step-0-reseller"></a>
## Step 0 — Verify Reseller Relationship

Before creating a ZT portal account, confirm the reseller relationship:

- [ ] Devices purchased from an [authorized Zero-Touch reseller](https://androidenterprisepartners.withgoogle.com/resellers/).
- [ ] Reseller confirmed devices are registered in the Zero-Touch system.
- [ ] Contact the vendor/reseller to verify ZT registration status.

**If the reseller relationship is not in place:** Do not proceed. Options: enroll via COBO QR code, NFC, or afw#setup (see [Provisioning Methods](../android-lifecycle/02-provisioning-methods.md)); or defer to corporate procurement. Devices deregistered from Zero-Touch cannot be re-registered without reseller involvement.

<a id="create-zt-account"></a>
## Create Zero-Touch Portal Account

#### In Zero-Touch portal

1. Navigate to [Zero-Touch portal](https://enterprise.google.com/android/zero-touch/customers). The portal requires Google account login. <!-- verify UI at execute time -->
2. Create a Google account at [accounts.google.com/signupwithoutgmail](https://accounts.google.com/signupwithoutgmail) using corporate email (NOT Gmail); sign in.
3. In the sidebar, locate: **Configurations**, **Devices**, **Users**, **Resellers**, **Customer details**. <!-- verify UI at execute time; source Google AE Help answer/7514005 (2026-04-21) -->

   > **What breaks if misconfigured:** Using Gmail rather than corporate email ties the account to a personal identity; account loss if the user leaves. Symptom appears in: ZT portal (recovery blocked) and Intune admin center (linking fails). Recovery: re-create at `accounts.google.com/signupwithoutgmail` with corporate email; re-link. **Single-org-to-account-link** (MEDIUM, last_verified 2026-04-21): one ZT account per org; unlinking makes it unrecoverable.

**Network dependency:** Devices need internet at first boot (Ethernet, Wi-Fi, or cellular). Captive portals or networks without Google service access cause fall-through to consumer setup.

<a id="link-zt-to-intune"></a>
## Link Zero-Touch to Intune

Choose a method based on your target enrollment mode.

| Method | When to Use | Limitation |
|---|---|---|
| A: Via iframe in Intune admin center | COBO (Fully Managed) only | Creates Fully Managed default; do NOT use for Dedicated or COPE |
| B: Direct Zero-Touch portal | Any mode (COBO, Dedicated, COPE) | More steps; full config control |

> **Samsung admins:** Confirm KME is NOT also configured for the same devices before linking. See [KME/ZT Mutual Exclusion](#kme-zt-mutual-exclusion).

### Method A: Via iframe in Intune admin center

#### In Intune admin center

1. Sign in to [Intune admin center](https://endpoint.microsoft.com). <!-- verify URL at execute time -->
2. Go to **Devices** > **By platform** > **Android** > **Device onboarding** > **Enrollment** > **Bulk enrollment methods** > **Zero-touch enrollment**. <!-- verify UI; MS Learn ref-corporate-methods (2026-04-16) -->
3. Grant `update app sync` first (**Tenant administration** > **Roles**).
4. Sign in with the Google account given to your reseller; select the ZT account; select **Link**.

   > **What breaks if misconfigured:** Method A creates a Fully Managed default that overrides the portal default. Using it for Dedicated or COPE enrolls devices as Fully Managed. Symptom: Intune admin center shows Fully Managed; device is in wrong mode. Recovery: use Method B for non-COBO; delete and recreate the config.

### Method B: Direct Zero-Touch portal

#### In Zero-Touch portal

1. Sign in at [enterprise.google.com/android/zero-touch/customers](https://enterprise.google.com/android/zero-touch/customers).
2. In **Configurations**, select **Add new configuration**.
3. Select **Microsoft Intune** as the EMM DPC app.
4. Paste the [DPC Extras JSON](#dpc-extras-json) with your enrollment token substituted.

<a id="dpc-extras-json"></a>
## DPC Extras JSON Configuration

Paste the JSON below into the ZT portal configuration. Replace `YourEnrollmentToken` with the token exported from your Intune enrollment profile.

<!-- AEKNOX-03-shared-anti-paste-block -->
> ⚠️ **DO NOT paste this JSON into the other portal**
> The KME and ZT DPC-extras JSON look similar but use different field names.
> Pasting ZT JSON into KME (or vice versa) silently produces a "stuck applying configuration" failure.
> If you maintain both portals: confirm the portal name in your browser tab before pasting.
<!-- /AEKNOX-03-shared-anti-paste-block -->

```json
{
  "android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME":
    "com.google.android.apps.work.clouddpc/.receivers.CloudDeviceAdminReceiver",
  "android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM":
    "I5YvS0O5hXY46mb01BlRjq4oJJGs2kuUcHvVkAPEXlg",
  "android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION":
    "https://play.google.com/managed/downloadManagingApp?identifier=setup",
  "android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE": {
    "com.google.android.apps.work.clouddpc.EXTRA_ENROLLMENT_TOKEN": "YourEnrollmentToken"
  }
}
```

**Fields reference:**

| Field | Required | Source | Purpose |
|---|---|---|---|
| `...PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME` | Required | Google ZT spec | DPC receiver class — fixed for Intune (CloudDPC) |
| `...PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM` | Required | Google ZT spec | DPC signature — fixed for CloudDPC; verify against MS Learn `ref-corporate-methods` at execute time (changes if CloudDPC is re-signed) |
| `...PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION` | Required | Google ZT spec | DPC download URL |
| `...PROVISIONING_ADMIN_EXTRAS_BUNDLE` | Required | Google AMAPI schema | Wrapper for Intune extras |
| `com.google.android.apps.work.clouddpc.EXTRA_ENROLLMENT_TOKEN` | Required | MS Learn (Intune) | Replace `YourEnrollmentToken` with the exported token; preserve double quotes |

> **Authors:** Do NOT add in-JSON `//` or `/* */` comments. Admins copy-paste verbatim; comments break parsing. The Fields reference carries that documentation externally.

<a id="kme-zt-mutual-exclusion"></a>
## KME/ZT Mutual Exclusion (Samsung)

For Samsung fleets, Knox Mobile Enrollment (KME) and Zero-Touch Enrollment are mutually exclusive.

**Behavior when both are configured** (verified HIGH — Samsung Knox docs and Google Developers known issues): a device registered in both enrolls via KME. To apply Zero-Touch on a Samsung device, remove KME configuration for that device set.

**Phase 35 scope is ZT portal setup only.** The full KME/ZT device-claim callout, device-claim workflow, profile-assignment at scale, dual-SIM IMEI 1 registration, and reseller-upload handoff are Phase 39 scope and will be appended here. Full KME admin coverage lives in [Knox Mobile Enrollment](07-knox-mobile-enrollment.md).

<a id="corporate-scale-operations"></a>
## Corporate-Scale Operations

Phase 35 covered single-tenant ZT portal setup. This section covers per-device-scale operations for fleets: reseller-upload handoff at purchase, device-claim workflow once devices appear in the portal, profile assignment at fleet scale (including the Method A/B scale implication), dual-SIM registration discipline, KME/ZT mutual exclusion at device-claim time, and the configuration-must-be-assigned requirement that prevents consumer-setup fallthrough.

<a id="reseller-upload-handoff"></a>
### Reseller-Upload Handoff Workflow

Before the reseller uploads devices to the ZT system, confirm three items with them: (a) the corporate Google account (NOT Gmail) associated with your ZT customer portal, so uploaded devices appear under your tenancy; (b) the device-identifier type they will upload (IMEI / serial / MEID), noting that dual-SIM devices must register under IMEI 1 per [Dual-SIM IMEI 1 Registration](#dual-sim-imei-1) below; and (c) the expected device count, so you can reconcile against what appears in the portal.

After upload, confirm back from the reseller: upload completion, device visibility in the ZT portal **Devices** view, and any rejected or invalid identifiers so you can correct the source list before re-upload.

Google is the canonical reference for reseller-side mechanics. Do not document the reseller-side steps here; surface only what the Intune admin hands off and confirms.

See [Google Zero-touch enrollment for IT admins](https://support.google.com/work/android/answer/7514005) for the reseller-facing workflow and the [authorized-reseller directory](https://androidenterprisepartners.withgoogle.com/resellers/). <!-- verify UI at execute time -->

<a id="device-claim-workflow"></a>
### Device Claim Workflow

Once the reseller uploads devices, they appear in the ZT portal under **Devices**. Three decision points frame the claim workflow:

1. **Which devices to claim now vs later** — claim only devices you are ready to enroll. Claimed devices surface in ZT configuration assignment; unclaimed devices remain in the reseller-uploaded pool without assignable configurations.
2. **Which configuration to assign** — configurations are created under **Configurations** (Phase 35 scope — see [Link Zero-Touch to Intune](#link-zt-to-intune) for Method A vs Method B authoring). For non-COBO fleets (COPE or Dedicated), see [Profile Assignment at Scale](#profile-assignment) below regarding the Method A default-overrule caveat.
3. **Per-device vs bulk assignment** — use bulk assignment via device selection lists for fleet operations; reserve per-device override for pilots or exceptions.

Canonical UI walkthrough: [Google ZT customer-portal help](https://support.google.com/work/android/topic/9158960). <!-- verify UI at execute time -->

> **What breaks if misconfigured:** Claiming devices into a Fully Managed configuration when the target mode was Dedicated or COPE causes devices to enroll as Fully Managed instead. Symptom: Intune admin center shows Fully Managed on devices intended for other modes. Recovery: unassign devices from the erroneous configuration and reassign under a correctly-authored Method B configuration.

<a id="profile-assignment"></a>
### Profile Assignment at Scale

Fleet profile assignment must respect the Method A vs Method B choice documented in [Link Zero-Touch to Intune](#link-zt-to-intune):

- **COBO (Fully Managed) fleets** — Method A (iframe in Intune admin center) is acceptable; the Fully Managed default is what you want.
- **COPE, Dedicated, or mixed fleets at scale** — Method A is incorrect. Verbatim from Microsoft Learn: "Once you link your account, the default zero-touch configuration created in Intune overrules the default configuration profile set in the zero-touch enrollment portal." Use Method B (direct ZT portal configuration) so per-device configurations are not silently overridden by the Intune-created Fully Managed default.

For fleets with mixed ownership modes, create separate configurations via Method B and assign each configuration to the appropriate device set under ZT portal **Devices**.

> **What breaks if misconfigured:** A non-COBO fleet linked via Method A causes all devices to enroll as Fully Managed regardless of intended mode. Symptom: Dedicated-kiosk or COPE-intended devices boot as Fully Managed in the Intune admin center. Recovery: delete the Method-A-created configuration, re-author via Method B, and re-assign the device set.

<a id="dual-sim-imei-1"></a>
### Dual-SIM IMEI 1 Registration

Dual-SIM devices expose two IMEI numbers — one per discrete modem. Google's guidance, verified against both canonical sources on 2026-04-23, is to register dual-SIM devices using the numerically lowest IMEI number. From [Google Zero-touch enrollment for IT admins](https://support.google.com/work/android/answer/7514005): "It's recommended for the resellers to register dual-SIM devices with the numerically lowest IMEI number." From [Google Developers Zero-touch known issues](https://developers.google.com/zero-touch/resources/known-issues): "prefer the numerically lowest IMEI number as zero-touch enrollment works more reliably with the lowest IMEI."

For admin handoff (see [Reseller-Upload Handoff Workflow](#reseller-upload-handoff) above), flag dual-SIM devices to the reseller and confirm registration under IMEI 1 (numerically lowest).

[MEDIUM: Google Developers and Google AE Help, last_verified 2026-04-23]

<a id="kme-zt-device-claim"></a>
### KME/ZT Mutual Exclusion — At Device Claim

When claiming Samsung devices in the ZT portal, verify that the same device set is not also configured in Knox Mobile Enrollment (KME). Google's canonical failure mode, from [Google Zero-touch enrollment for IT admins](https://support.google.com/work/android/answer/7514005): "If a device is registered and configured in both Knox Mobile Enrollment and zero-touch, the device will enroll using Knox Mobile Enrollment."

Concrete check at device-claim: before selecting Samsung devices under ZT portal **Devices**, query your KME portal for the same IMEI/serial list. If devices appear in both, either remove the KME configuration before ZT claim, or skip the ZT claim and manage via KME (see [Knox Mobile Enrollment](07-knox-mobile-enrollment.md) for the full KME admin path).

For broader Samsung guidance including top-of-doc framing, see [KME/ZT Mutual Exclusion (Samsung)](#kme-zt-mutual-exclusion) above.

> **What breaks if misconfigured:** Samsung devices claimed in both KME and ZT silently enroll via KME, ignoring the ZT configuration. Symptom: Intune admin center shows the devices but not enrolled via Zero-Touch; ZT portal shows the claim but no first-boot activity. Recovery: remove the KME configuration for the device set, then factory-reset affected devices.

<a id="configuration-must-be-assigned"></a>
### Configuration Must Be Assigned

When you paste the DPC extras JSON (see [DPC Extras JSON Configuration](#dpc-extras-json) above, in Phase 35 scope), the configuration must also be **assigned** to the target device set in the ZT portal before first boot — otherwise devices fall through to the consumer Setup Wizard instead of the Intune DPC enrollment flow.

Concrete admin action in the ZT portal: after creating a configuration under **Configurations** and pasting the DPC extras JSON, navigate to **Devices**, select the target device set, and explicitly assign the configuration. A configuration that exists but is not assigned to any device is inert.

> **What breaks if misconfigured:** Configuration created but not assigned causes devices to boot into the consumer Setup Wizard instead of the Intune DPC (CloudDPC) enrollment flow. Symptom: devices arrive at user hands in consumer setup state; the Intune admin center shows no enrollment attempts. Recovery: assign the configuration to the correct device set in the ZT portal, then factory-reset and re-boot affected devices.

## Verification

After ZT↔Intune linking:

- [ ] ZT portal shows the new configuration with EMM DPC app set to Microsoft Intune.
- [ ] Intune admin center > Devices > By platform > Android > Device onboarding > Enrollment > Zero-touch enrollment shows the linked ZT account.
- [ ] DPC extras JSON has the token substituted (no literal `YourEnrollmentToken` remains).
- [ ] A test device from reseller-uploaded stock boots into the Intune DPC — see [Device Claim Workflow](#device-claim-workflow) for device-claim testing at scale.

<a id="renewal-maintenance"></a>
## Renewal / Maintenance

| Component | Renewal Period | Consequence of Lapse | Renewal Steps |
|---|---|---|---|
| ZT reseller contract | Reseller-specific; typically annual | New IMEI/serial uploads stop appearing; previously uploaded devices remain claimable | Contact reseller; re-verify in ZT portal **Customer details** |
| Enrollment profile tokens | Configurable 1–65,535 days | New ZTE enrollments fail; enrolled devices unaffected | Regenerate in Intune admin center; update DPC extras JSON in ZT configurations |

## See Also

- [Managed Google Play Binding](01-managed-google-play.md) — prerequisite for ZTE
- [Android Enterprise Admin Setup Overview](00-overview.md)
- [Android Enterprise Prerequisites](../android-lifecycle/01-android-prerequisites.md)
- [Android Enterprise Enrollment Overview](../android-lifecycle/00-enrollment-overview.md)
- [Android Provisioning Methods](../android-lifecycle/02-provisioning-methods.md)
- [Android Enterprise Provisioning Glossary](../_glossary-android.md#zero-touch-enrollment)

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-04-21 | Initial version (Phase 35 scope) — Step 0 reseller gate, ZT account creation, DPC extras JSON, ZT↔Intune linking (Methods A/B), KME/ZT Samsung mutual-exclusion. Phase 39 will append the device-claim workflow, profile-assignment at scale, dual-SIM IMEI 1 note, reseller-upload handoff, and full KME/ZT device-claim callout. | -- |
| 2026-04-23 | Phase 39 append — `## Corporate-Scale Operations` H2 block (6 H3s): reseller-upload handoff, device-claim workflow, profile-assignment at scale (Method A default-overrule scale implication per RESEARCH.md Pitfall 5), dual-SIM IMEI 1 registration (MEDIUM marker per D-05 / D-20 citing Google AE Help and Google Developers known-issues), KME/ZT at device-claim (D-06 distinct from top-of-doc + link-step Phase 35 callouts), configuration-must-be-assigned (D-03 cross-link to `#dpc-extras-json`). Verification placeholder on line 135 resolved to `#device-claim-workflow` per D-01. 6 D-17 anchors published. D-22 append-only contract honored. | -- |
