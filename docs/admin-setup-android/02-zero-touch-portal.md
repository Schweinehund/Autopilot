---
last_verified: 2026-04-21
review_by: 2026-06-20
audience: admin
platform: Android
applies_to: ZTE
---

# Configure Zero-Touch Portal

> **Platform gate:** ZT portal account setup, DPC extras JSON, and ZT↔Intune linking for Android Enterprise Zero-Touch Enrollment (ZTE).
> For iOS, see [iOS Admin Guides](../admin-setup-ios/00-overview.md); for macOS, [macOS Admin Setup](../admin-setup-macos/00-overview.md); for terminology, [Android glossary](../_glossary-android.md).

> **Reseller prerequisite:** Devices must be purchased from an authorized Zero-Touch reseller. Self-registration of existing stock is not supported. Devices deregistered from Zero-Touch cannot be re-registered without reseller involvement. See [Step 0](#step-0-reseller) below.

> ⚠️ **KME/ZT mutual exclusion (Samsung):** For Samsung fleets, choose either Knox Mobile Enrollment (KME) or Zero-Touch Enrollment — never both. Configuring both causes out-of-sync enrollment state. Full KME coverage is tracked for v1.4.1. See [KME/ZT Mutual Exclusion](#kme-zt-mutual-exclusion) below.

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

**Phase 35 scope is ZT portal setup only.** The full KME/ZT device-claim callout, device-claim workflow, profile-assignment at scale, dual-SIM IMEI 1 registration, and reseller-upload handoff are Phase 39 scope and will be appended here. Full KME admin coverage is deferred to v1.4.1.

## Verification

After ZT↔Intune linking:

- [ ] ZT portal shows the new configuration with EMM DPC app set to Microsoft Intune.
- [ ] Intune admin center > Devices > By platform > Android > Device onboarding > Enrollment > Zero-touch enrollment shows the linked ZT account.
- [ ] DPC extras JSON has the token substituted (no literal `YourEnrollmentToken` remains).
- [ ] A test device from reseller-uploaded stock boots into the Intune DPC — Phase 39 covers device-claim testing at scale.

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
