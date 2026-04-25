---
last_verified: 2026-04-25
review_by: 2026-06-24
audience: admin
platform: Android
applies_to: COPE
---

> **Platform gate:** This guide covers Android Enterprise Corporate-owned devices with work profile (COPE / WPCO) enrollment through Microsoft Intune, including enrollment profile creation, enrollment token lifecycle, all five provisioning methods (QR code, NFC, `afw#setup`, Token entry, Zero-Touch) with COPE-specific Android 11+ removal callouts, the inverse-direction COPE Migration Note back-link to the COBO sibling, Android 15 Factory Reset Protection + Enterprise FRP (EFRP) configuration with the COPE-specific FRP behavior table and the Settings-app-reset Google-account re-enrollment requirement, the Android 15 Private Space ⚠️ unmanaged callout, and the COPE-vs-COBO decision matrix.
> For iOS/iPadOS admin setup, see [iOS Admin Guides](../admin-setup-ios/00-overview.md).
> For macOS admin setup, see [macOS Admin Guides](../admin-setup-macos/00-overview.md).
> For Android provisioning terminology, see the [Android Enterprise Provisioning Glossary](../_glossary-android.md).

# Android Enterprise Corporate-Owned Work Profile (COPE / WPCO) Admin Setup

This guide walks an Intune administrator through creating and operating an Android Enterprise Corporate-owned devices with work profile (COPE / WPCO) enrollment profile: profile and token lifecycle, all five provisioning methods with COPE-specific callouts, the inverse-direction COPE Migration Note back-link to COBO, Android 15 FRP + EFRP configuration with COPE-specific FRP behavior, the Android 15 Private Space unmanaged callout, the Samsung-admins KME-or-Zero-Touch callout under Zero-Touch, and a COPE-vs-COBO decision matrix for net-new corporate Android deployments.

**Covered:** Entra join + tenant-conditional Chrome-tab CA exclusion; inverse-direction COPE Migration Note back-link to the COBO sibling and COPE-side migration framing for existing COPE fleets; enrollment profile creation using the verbatim Intune admin center label `Corporate-owned devices with work profile`; enrollment token management (default no expiry; staging up to 65 years); five provisioning methods (QR, NFC, `afw#setup`, Token entry, Zero-Touch) with the Android 11+ removal callouts for NFC, `afw#setup`, and Token entry; the COPE-vs-COBO decision matrix sub-H3 inside Provisioning method choice; Android 15 FRP + EFRP configuration with the COPE-specific FRP behavior table and Settings-app-reset Google-account re-enrollment requirement.

**Not covered:** MGP binding mechanics (see [01-managed-google-play.md#bind-mgp](01-managed-google-play.md#bind-mgp)); Zero-Touch portal mechanics (see [02-zero-touch-portal.md](02-zero-touch-portal.md)); Knox Mobile Enrollment (see [07-knox-mobile-enrollment.md](07-knox-mobile-enrollment.md)); the canonical provisioning-method × mode matrix (see [02-provisioning-methods.md](../android-lifecycle/02-provisioning-methods.md)); COPE-specific L1 / L2 runbooks (deferred to v1.5).

**How to use:** Intune administrators read linearly. L1 Service Desk uses the [Android L1 Runbooks](../l1-runbooks/00-index.md#android-l1-runbooks). L2 Desktop Engineering uses the [Android L2 investigation runbooks](../l2-runbooks/00-index.md#android-l2-runbooks).

<a id="key-concepts"></a>
## Key Concepts

### Work profile is the personal-side partition

On COPE / WPCO (Corporate-owned devices with work profile), the device is corporate-owned end-to-end, but the OS exposes two partitions: a managed device-owner side (the "personal" partition where the user installs personal apps) and a managed work-profile container that holds corporate apps, data, and policies. This is the inverse of [COBO Fully Managed](../_glossary-android.md#fully-managed) — on COBO the entire device is the corporate scope and there is no personal app surface; on COPE the device is corporate-owned but a personal-side partition is exposed and the work-profile container is isolated from it. Admins manage the device-owner-side OS restrictions (kiosk-style policies, OS update timing, EFRP) AND the work-profile container (managed app distribution, managed configurations, certificates, Wi-Fi, VPN). Personal-side app installs by the user are out of MDM scope by design — that is the user-privacy contract that distinguishes COPE / WPCO from COBO. See [Work Profile](../_glossary-android.md#work-profile) and [WPCO](../_glossary-android.md#wpco) for the authoritative definitions; per the WPCO glossary entry, "WPCO, formerly COPE."

### Entra join behavior

COPE devices are Entra-joined during enrollment. The Android setup process uses a Chrome Custom Tab — an OS-launched Chrome tab — to complete Entra sign-in. This makes the Conditional Access prerequisite below load-bearing: a CA policy scoped to browsers plus the Microsoft Intune cloud app can intercept the Chrome-tab sign-in and block enrollment.

### Cross-platform note

COPE / WPCO has no first-class equivalent on Windows, macOS, or iOS — the "corporate device with user-separated personal partition" model is Android-specific. See [_glossary-android.md#wpco](../_glossary-android.md#wpco) for the cross-platform framing. The closest cross-platform analog for "corporate ownership with personal-side affordances" is iOS Account-Driven User Enrollment, but the structural mapping is partial (User Enrollment uses a managed APFS volume on a personally-owned device rather than a work-profile container on a corporate-owned device); do not conflate.

> ⚠️ **Android 15 — Private Space (unmanaged):** Android 15+ devices include a user-controlled hidden profile partition that **Intune** cannot manage on COPE, COBO, BYOD, or any other Android Enterprise mode. See [_glossary-android.md#private-space](../_glossary-android.md#private-space) and [version matrix breakpoint](../android-lifecycle/03-android-version-matrix.md#android-15-private-space-breakpoint).

<a id="prerequisites"></a>
## Prerequisites

**Hard prerequisites:**

- [ ] **Microsoft Intune Plan 1+** with the Intune Administrator role (or a custom RBAC role granting enrollment-management permissions).
- [ ] **Managed Google Play (MGP) binding complete** — see [01-managed-google-play.md#bind-mgp](01-managed-google-play.md#bind-mgp); the [Account Types](01-managed-google-play.md#account-types) table covers the Entra-vs-Gmail binding decision. This guide references, never duplicates.
- [ ] <a id="entra-join-prerequisite"></a>**Entra join enabled** on the tenant — without this, COPE enrollment fails at token generation. The Chrome Custom Tab sign-in during device setup is the surface that depends on it.
- [ ] **Factory-reset or new device** — COPE requires out-of-box state. A device already past Setup Wizard without the correct provisioning path must be reset before COPE enrollment.
- [ ] **Android 8.0+** — hard minimum (LOWER than COBO's Android 10.0 floor; per MS Learn `setup-corporate-work-profile.md`). See [03-android-version-matrix.md#cope](../android-lifecycle/03-android-version-matrix.md#cope) for the version-support detail; this guide does not restate the matrix.
- [ ] **Google Mobile Services (GMS) connectivity** on the device and on the out-of-box network — Play Services must reach `play.google.com` and the Android Enterprise endpoints for DPC download during provisioning.

**Tenant-conditional prerequisite:**

<a id="ca-exclusion-intune-app"></a>

- [ ] **Conditional Access exclusion for the Microsoft Intune cloud app — IF your tenant uses Conditional Access.** Per Microsoft Learn (verified 2026-04-25): *"If you have a Microsoft Entra Conditional Access policy defined that uses the require a device to be marked as compliant Grant control or a Block policy and applies to All Cloud apps, Android, and Browsers, you must exclude the Microsoft Intune cloud app from this policy. This is because the Android setup process uses a Chrome tab to authenticate your users during enrollment."* If your tenant has a qualifying CA policy, exclude the **Microsoft Intune** cloud app from that policy. Tenants without such a CA policy are unaffected — this is not a universal hard prereq. <!-- HIGH confidence: MS Learn ref-corporate-methods.md verified 2026-04-25 [HIGH: MS Learn ref-corporate-methods, last_verified 2026-04-25] -->

> **What breaks if misconfigured:** Missing Entra join → COPE token generation fails with an opaque error surfaced in Intune admin center; admins see no enrollment activity for the affected enrollment profile. Missing CA exclusion (when your tenant has a qualifying CA policy) → Chrome-tab sign-in fails during COPE device setup; admin sees an opaque "sign-in blocked" error on the device and correlating failures in Entra ID sign-in logs. Recovery: enable Entra join on the tenant; exclude the Microsoft Intune cloud app from the CA policy; retry the device setup from scratch.

<a id="cope-migration"></a>
## COPE Migration Note

If you are evaluating COPE versus COBO (Fully Managed) for net-new corporate Android deployments, see [03-fully-managed-cobo.md#cope-migration](03-fully-managed-cobo.md#cope-migration) for the COBO-side framing of this same decision. The COBO sibling carries the inverse perspective (when to choose COBO over COPE); this section frames the COPE side and routes existing-fleet operators to the structured comparison further down.

**For existing COPE fleets:** current COPE deployments continue to operate on Android 8+ and remain functionally supported. Google's modern terminology for this same Android Enterprise mode is **WPCO** (Work Profile on Corporate-Owned devices); per [_glossary-android.md#wpco](../_glossary-android.md#wpco), "WPCO, formerly COPE" — the corpus-canonical equivalence is that WPCO and COPE describe the same deployment shape under different names. Google has not issued a formal deprecation notice for COPE; recommend WPCO as the *provisioning name* per current Google guidance for net-new deployments, and continue running existing COPE fleets without re-platform pressure.

For a structured COPE-vs-COBO comparison covering personal-app posture, profile boundary model, Android version floor, Samsung KME compatibility, and 2026 net-new recommendation, see the [COPE-vs-COBO decision matrix](#cope-vs-cobo-decision) below in the Provisioning method choice section.

<!-- HIGH confidence: WPCO equivalence per _glossary-android.md:75-77 (canonical "WPCO, formerly COPE"); positive-framing rule per CONTEXT D-17; corpus-canonical "Google has not issued a formal end-of-support notice" posture per _glossary-android.md:179. last_verified: 2026-04-25. -->

<a id="enrollment-profile"></a>
## Enrollment profile creation

The COPE enrollment profile is created entirely in the Microsoft Intune admin center — no MGP or ZT portal step is involved at this stage. **Before you begin:** see [Prerequisites](#prerequisites) above.

#### In Intune admin center

1. Sign in to the [Microsoft Intune admin center](https://endpoint.microsoft.com).
2. Go to **Devices** → **Enrollment**.
3. Select the **Android** tab.
4. Under **Android Enterprise** → **Enrollment Profiles**, choose **Corporate-owned devices with work profile**.
5. Select **Create profile**.

Then configure the profile fields:

6. **Name** — enter a descriptive name. Record the exact string for later; dynamic Entra device-group rules match against `enrollmentProfileName` and the name is the identifier.

7. **Description** (optional) — document the device fleet, provisioning method, and EFRP linkage.

8. **Token type** — Choose the type of token you want to use to enroll devices.
   - **Corporate-owned with work profile (default)**
   - **Corporate-owned with work profile, via staging**

   > **Tip:** Enrollment time grouping isn't supported with the staging token. If you're configuring a profile for use with enrollment time grouping, use the corporate-owned with work profile (default) token.

9. **Token expiration date** — Only available with the staging token. Enter the date you want the token to expire, up to 65 years in the future. Acceptable date format: `MM/DD/YYYY` or `YYYY-MM-DD`. The token expires on the selected date at 12:59:59 PM in the time zone it was created.

10. **Naming template** (optional) — You can use the following strings to create your naming template. Intune replaces the strings with device-specific values.

    - `{{SERIAL}}` for the device's serial number.
    - `{{SERIALLAST4DIGITS}}` for the last 4 digits of the device's serial number.
    - `{{DEVICETYPE}}` for the device type. Example: *AndroidForWork*
    - `{{ENROLLMENTDATETIME}}` for the date and time of enrollment.
    - `{{UPNPREFIX}}` for the user's first name. Example: *Eric*, when device is user affiliated.
    - `{{USERNAME}}` for the user's username when the device is user affiliated. Example: *EricSolomon*
    - `{{RAND:x}}` for a random string of numbers, where *x* is between 1 and 9 and indicates the number of digits to add. Intune adds the random digits to the end of the name.

    Edits you make to the naming template only apply to new enrollments.

    > **What breaks if misconfigured:** Naming template applied retroactively assumption — admins expect existing devices to rename when the template changes; only new enrollments use the updated template. Recovery: re-enroll affected devices to apply the new template. Symptom appears in: Intune admin center (existing devices retain old names; only post-edit enrollments reflect the new template).

11. **Device group** (optional, default token only) — select a static Entra device group. Staging tokens do not support enrollment-time grouping; use a dynamic Entra device group with an `enrollmentProfileName Equals [name]` rule for staging-token fleets instead.

    > **What breaks if misconfigured:** Device group assigned to a group that excludes the intended devices → token-check fails during enrollment with an opaque error. Recovery: reassign the profile to an inclusive group (or a parent group); re-run device enrollment. Symptom appears in: device setup flow.

12. **Scope tags** (optional) — restrict profile visibility per RBAC scope.

13. Review and **Create**.

<!-- HIGH confidence: MS Learn setup-corporate-work-profile.md "Create an enrollment profile" section, last_verified 2026-04-25; updated_at 2026-04-16 per RESEARCH §Sources [HIGH: MS Learn setup-corporate-work-profile, last_verified 2026-04-25] -->

<a id="enrollment-token"></a>
## Enrollment token management

After the enrollment profile is created, Intune generates the enrollment token associated with the profile. The token is the secret artifact admins distribute through the chosen provisioning method (embedded in the QR payload, baked into the NFC tag, or substituted into the Zero-Touch DPC extras JSON).

**Token types and semantics:**

| Token type | Expiry | Enrollment-time grouping | Use case |
|------------|--------|--------------------------|----------|
| Corporate-owned with work profile (default) | **Does not expire** | Supported | Standard COPE enrollments; use in most cases |
| Corporate-owned with work profile, via staging | Configurable up to **65 years** (default 65 years) | NOT supported | Third-party pre-provisioning workflows including partner device-staging |

### Default token

The default token does not expire. Use the default token for ongoing COPE enrollments where enrollment-time grouping into a static Entra device group is desired. Revoke the default token only if it has been accidentally exposed; revocation does NOT affect already-enrolled devices, only new enrollments using the revoked token are blocked.

### Staging token

The staging token supports a configurable expiration date up to 65 years in the future per the verbatim Microsoft Learn note above. The staging token does NOT support enrollment-time grouping; use a dynamic Entra device group with an `enrollmentProfileName Equals [name]` rule for staging-token fleets. Staging tokens are intended for third-party pre-provisioning workflows (including partner device-staging flows).

**Rotation cadence:** Even though the staging-token ceiling is 65 years, rotate the staging token every 1-2 years regardless to align with tenant security review and to limit the blast radius of an accidental token disclosure.

**Token lifecycle operations:**

- **Replace token** — generate a new token nearing staging-token expiration. Applies to staging tokens only; default tokens do not expire.
- **Revoke token** — immediately expire the token. Use this after accidental sharing with an unauthorized party, or after all planned enrollments for a token are complete. Revocation does NOT affect devices that are already enrolled; only new enrollments using the revoked token are blocked.
- **Export token** — export the token's JSON content. Needed when embedding the token in the Zero-Touch portal DPC extras JSON (see [02-zero-touch-portal.md#dpc-extras-json](02-zero-touch-portal.md#dpc-extras-json)) or feeding it to partner device-staging flows.

> **What breaks if misconfigured:** Staging token revoked prematurely → devices mid-enrollment flow fail at the token-check step with an opaque error on the device. Recovery: regenerate the staging token via **Replace token** and redistribute through the provisioning channel (QR image regeneration, NFC tag rewrite, or DPC extras JSON update). Severity: CRITICAL.

> **What breaks if misconfigured:** Exported token shared insecurely — email, public SharePoint, group chat — grants unauthorized COPE enrollment capability to anyone who receives it. Recovery: **Revoke token** immediately; revocation does NOT affect already-enrolled devices, so in-flight enrollments are preserved. Severity: CRITICAL. Rotate staging tokens on a 1-2-year cadence regardless of the 65-year ceiling to align with tenant security review.

> **What breaks if misconfigured:** Token assigned to a group that excludes the target devices → devices fail the token-check during enrollment. Recovery: reassign the profile/token broadly or to a parent group that covers the intended device fleet. Severity: HIGH.

<a id="provisioning-method-choice"></a>
## Provisioning method choice

COPE supports the Android Enterprise enrollment methods documented in MS Learn `ref-corporate-methods.md`: QR code, NFC, `afw#setup` (DPC identifier), Token entry, and Zero-Touch. The full method-availability and cross-mode support matrix lives in [02-provisioning-methods.md](../android-lifecycle/02-provisioning-methods.md); this section carries COPE-specific constraint callouts that the matrix does not cover. **Three methods were removed for COPE on Android 11+:** NFC, `afw#setup`, and Token entry. Only QR code and Zero-Touch remain available for new COPE enrollments on Android 11+ devices; NFC, `afw#setup`, and Token entry continue to function for COPE on Android 8-10 devices. The COPE matrix row is the filtered-row target: see [02-provisioning-methods.md](../android-lifecycle/02-provisioning-methods.md).

> **Conditional Access reminder:** If your tenant has a Conditional Access policy affecting the Microsoft Intune cloud app, confirm the cloud app is excluded before proceeding. The provisioning flow triggers the Chrome Custom Tab at the Entra sign-in step, and a CA policy on the Intune cloud app will block it. See [Prerequisites](#prerequisites) above.

### QR code

The Intune admin center generates a QR image at the COPE enrollment profile. An admin presents the QR to the factory-reset device; the device camera decodes the payload, downloads the DPC, and begins COPE provisioning. Internet connectivity is required BEFORE scanning on earlier Android versions; the built-in QR reader arrived in Android 9 — see the matrix for the breakpoint. QR codes embed enrollment tokens and Wi-Fi credentials in plaintext: never commit tenant-specific QR images to git, never email them, never post them to a public SharePoint. Treat the QR image as a secret artifact, regenerated per deployment batch.

> **What breaks if misconfigured:** The QR image captured from the Intune portal expires when the token is regenerated or revoked. A stale QR from an old deployment batch succeeds at the scan step but fails at the subsequent token-exchange step with an opaque error. Recovery: regenerate the QR from the current enrollment profile; redistribute to the admin-led provisioning site.

For version-availability and cross-mode support, see [02-provisioning-methods.md](../android-lifecycle/02-provisioning-methods.md).

### NFC

For corporate-owned work profile (COPE) devices, the Near Field Communication (NFC) enrollment method is only supported on devices running Android 8-10. It is not available on Android 11. NFC uses NFC Forum Type 2 Tags with an 888-byte payload limit — Wi-Fi credentials plus DPC extras can exceed the limit, so shorten SSID values and drop optional extras. NFC Beam (device-to-device tap) was removed in Android 10; NFC provisioning today uses a tag written from a provisioning app, not a peer-to-peer bump.

> **What breaks if misconfigured:** Attempting NFC provisioning on a COPE-target Android 11+ device → silent failure with no DPC handoff; the device falls through to consumer Setup Wizard. Recovery: switch the COPE Android 11+ provisioning channel to QR code or Zero-Touch. Severity: HIGH.

For version-availability and cross-mode support, see [02-provisioning-methods.md](../android-lifecycle/02-provisioning-methods.md).

### afw#setup

For corporate-owned work profile (COPE) devices, the `afw#setup` enrollment method is only supported on devices running Android 8-10. It is not available on Android 11. On the initial Google sign-in prompt during factory-reset setup, type `afw#setup` instead of a Gmail address; on Android 8-10 COPE devices this triggers DPC download and provisions the device into the COPE work-profile-on-corporate-owned mode. See [afw#setup glossary](../_glossary-android.md#afw-setup) for the broader term definition.

> **What breaks if misconfigured:** Attempting `afw#setup` provisioning on a COPE-target Android 11+ device → typing the identifier returns "no account found" or silently falls through; the device boots to consumer setup. Recovery: switch the COPE Android 11+ provisioning channel to QR code or Zero-Touch. Severity: HIGH.

For version-availability and cross-mode support, see [02-provisioning-methods.md](../android-lifecycle/02-provisioning-methods.md).

### Token entry

Token-entry enrollment is documented in MS Learn `ref-corporate-methods.md` as an Android Enterprise corporate enrollment method. Per the MS Learn "Enroll by using a token" section: *"Note: Not supported on Android Enterprise corporate-owned devices with a work profile (COPE) running Android version 11.0."* This makes Token entry the third method (alongside NFC and `afw#setup`) that COPE loses on Android 11+. On COPE Android 8-10 devices, token-entry enrollment continues to work for the original COPE deployment shape.

> **What breaks if misconfigured:** Attempting token-entry enrollment on a COPE-target Android 11+ device → token-exchange fails; the device does not provision into COPE. Recovery: switch the COPE Android 11+ provisioning channel to QR code or Zero-Touch. Severity: HIGH.

For version-availability and cross-mode support, see [02-provisioning-methods.md](../android-lifecycle/02-provisioning-methods.md).

### Zero-Touch

COPE provisioning via Zero-Touch requires the Phase 35 Zero-Touch portal binding. See [02-zero-touch-portal.md#link-zt-to-intune](02-zero-touch-portal.md#link-zt-to-intune) for ZT↔Intune linking and [02-zero-touch-portal.md#dpc-extras-json](02-zero-touch-portal.md#dpc-extras-json) for the DPC extras JSON. The COPE doc deliberately does NOT re-state the ZT iframe DPC extras JSON — that JSON is canonical at the ZT portal admin guide and would drift if duplicated here. Note per the ZT portal admin guide that COPE / Dedicated / mixed fleets at scale must use Method B (direct ZT portal configuration) rather than Method A (iframe in Intune admin center) — Method A creates a Fully Managed default that overrides the portal default and would silently land COPE-target devices in COBO instead.

> ⚠️ **Samsung admins:** Choose Knox Mobile Enrollment (KME) or Zero-Touch — never both. Configuring both on the same Samsung devices causes out-of-sync enrollment state; KME takes precedence at the device firmware level. KME provisions Samsung corporate-owned-with-work-profile devices into the **WPCO** mode in the Knox EMM profile dropdown — WPCO is Google's modern terminology for the same deployment shape this guide calls COPE (corporate-owned device with a user-separated work profile). See [Knox Mobile Enrollment](07-knox-mobile-enrollment.md) for full KME admin coverage; [02-zero-touch-portal.md#kme-zt-mutual-exclusion](02-zero-touch-portal.md#kme-zt-mutual-exclusion) for the mutual-exclusion record; [_glossary-android.md#wpco](../_glossary-android.md#wpco) for the WPCO↔COPE terminology equivalence; and [_glossary-android.md#zero-touch-enrollment](../_glossary-android.md#zero-touch-enrollment) for the Zero-Touch definition and the iOS ADE cross-platform analog.

> **What breaks if misconfigured:** A non-COBO COPE fleet linked via Method A causes all devices to enroll as Fully Managed (COBO) regardless of intended COPE mode. Symptom: COPE-intended devices boot as Fully Managed in the Intune admin center. Recovery: delete the Method-A-created configuration, re-author via Method B, and re-assign the device set. Severity: HIGH.

For version-availability and cross-mode support, see [02-provisioning-methods.md](../android-lifecycle/02-provisioning-methods.md).

<a id="cope-vs-cobo-decision"></a>
### COPE-vs-COBO decision matrix

This matrix helps Intune admins choose between COBO and COPE for net-new corporate Android deployments. The migration story for existing COPE fleets is covered in [COPE Migration Note](#cope-migration) above; this matrix routes the net-new decision.

| Decision factor | COBO (Fully Managed) | COPE (WPCO / Corp-Owned Work Profile) |
|---|---|---|
| **Personal apps on the device** | None — corporate-only device | Yes — separated work profile container; user installs personal apps in the personal partition |
| **Profile boundary model** | No profile boundary — entire device is managed scope | Work-profile container isolated from personal-side apps and data |
| **Android version floor for new provisioning** | See [03-android-version-matrix.md#cobo](../android-lifecycle/03-android-version-matrix.md#cobo) | See [03-android-version-matrix.md#cope](../android-lifecycle/03-android-version-matrix.md#cope) |
| **Samsung KME compatibility** | KME provisions COBO directly — see [KME](../_glossary-android.md#kme) and [07-knox-mobile-enrollment.md](07-knox-mobile-enrollment.md) | KME provisions WPCO (the modern COPE shape) — see [KME](../_glossary-android.md#kme), [WPCO glossary](../_glossary-android.md#wpco), and [07-knox-mobile-enrollment.md](07-knox-mobile-enrollment.md) |
| **Recommended for net-new in 2026** | Yes — when no personal-app allowance is needed | Yes — provision as WPCO per current Google guidance |

<!-- HIGH confidence: cell content per CONTEXT D-13/D-15/D-16/D-17 + glossary canonical anchors verified 2026-04-25 -->

<a id="android-15-frp"></a>
## Android 15 FRP and EFRP

> ⚠️ **Configure EFRP before any factory reset on Android 15 COPE devices; FRP hardening can block re-enrollment, and COPE devices on Android 15 require the pre-reset Google account at re-provisioning after a Settings-app reset.**

**What changed on Android 15.** Enabling OEM unlock no longer deactivates Factory Reset Protection (FRP). Bypassing the setup wizard no longer deactivates FRP. Accounts, passwords, and apps are blocked while FRP is active. Enterprise FRP (EFRP) is enforced after a hard factory reset regardless of OEM unlock state. (Applies to Android 15.0+.) Result: re-enrollment flows that worked on Android 13 / 14 can block on Android 15 unless EFRP is configured BEFORE devices are reset. For the authoritative narrative, see [03-android-version-matrix.md#android-15-breakpoint](../android-lifecycle/03-android-version-matrix.md#android-15-breakpoint).

**COPE-specific FRP behavior table** (verbatim from MS Learn `ref-corporate-methods.md`; differs from COBO and Dedicated per the Settings → Factory data reset column):

| Enrollment method | Settings > Factory data reset | Settings > Recovery/bootloader | Intune wipe |
|---|---|---|---|
| **Corporate-owned devices with work profile** (COPE) | ✅ factory reset protection | ✅ factory reset protection | ❌ no factory reset protection |
| **Fully managed** (COBO) | ❌ no factory reset protection | ✅ factory reset protection | ❌ no factory reset protection |
| **Dedicated** (COSU) | ❌ no factory reset protection | ✅ factory reset protection | ❌ no factory reset protection |

<!-- HIGH confidence: MS Learn ref-corporate-methods.md Factory reset protection table verified 2026-04-25 [HIGH: MS Learn ref-corporate-methods, last_verified 2026-04-25] -->

**Android 15 COPE-specific re-enrollment requirement** (verbatim from MS Learn; this requirement applies to COPE specifically and does NOT appear in COBO's Android 15 FRP H2):

> For corporate owned devices with a work profile running Android 15, you will need to re-enter the Google account associated with the configuration after any reset done via the Settings app. It's important to plan your reprovisioning workflow (such as applying an Intune wipe or resetting via the Settings app) accordingly so that you can provide the required credentials if needed. For background and guidance, see [Factory reset protection (FRP) enforcement behavior for Android Enterprise](https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-configuration/factory-reset-protection-emails-not-enforced).

**Admin action required.** Configure Enterprise Factory Reset Protection (EFRP) via Intune policy **before** any device reset on Android 15 COPE devices. EFRP is an allowlist of Google account email addresses authorized to unlock a post-reset device; see [Google AE Help](https://support.google.com/work/android/answer/14549362) for the feature description. Capture the pre-reset Google account associated with the COPE configuration BEFORE issuing a Settings-app reset on Android 15 — without it, re-provisioning will block at the Google-account credential prompt per the COPE-specific re-enrollment note above.

<a id="configure-efrp"></a>
### Configure EFRP in Intune

#### In Intune admin center

1. In the [Intune admin center](https://endpoint.microsoft.com), navigate to **Devices** → **Configuration** → **Create profile**.
2. **Platform:** **Android Enterprise**.
3. **Profile type:** **Fully managed, dedicated, and corporate-owned work profile — Device restrictions**.
4. Under **General**, configure **Factory reset protection emails** — add the Google account email address(es) authorized to unlock a post-reset device.
5. **Assignments:** assign to all COPE devices (or a targeted device group that covers your Android 15 COPE fleet).
6. **Review + create**.

> **What breaks if misconfigured:** EFRP not assigned to COPE devices before a factory reset → FRP locks the device post-reset → re-enrollment requires Google-account credential intervention with the pre-reset device-owner account (HIGH recovery cost). On COPE Android 15 specifically, a Settings-app reset additionally requires the pre-reset Google account associated with the configuration per the verbatim MS Learn note above; without it, re-provisioning blocks at the credential prompt. Recovery: unlock requires a device-owner account associated with the pre-reset state; otherwise contact the device vendor. Prevention: audit EFRP assignment every 60-day review cycle; capture the pre-reset Google account for each Android 15 COPE device set.

<!-- HIGH confidence: Intune admin center EFRP navigation path verified against Microsoft Learn 2026-04-25 [HIGH: MS Learn factory-reset-protection-emails-not-enforced + Google AE Help answer/14549362, last_verified 2026-04-25] -->

**References:** [Google AE Help — Enable EFRP](https://support.google.com/work/android/answer/14549362); [MS Learn — Factory Reset Protection Emails Not Enforced](https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-configuration/factory-reset-protection-emails-not-enforced); [MS Learn — Corporate enrollment methods reference](https://learn.microsoft.com/en-us/intune/device-enrollment/android/ref-corporate-methods).

<a id="what-breaks"></a>
## What Breaks Summary

Inline what-breaks callouts at each decision point. Severity descending within each source section.

| Misconfiguration | Section | Severity |
|------------------|---------|----------|
| Entra join not enabled | [Prerequisites](#prerequisites) | CRITICAL |
| Staging token revoked prematurely | [Enrollment token management](#enrollment-token) | CRITICAL |
| Exported token shared insecurely | [Enrollment token management](#enrollment-token) | CRITICAL |
| KME + ZT dual-configured on Samsung | [Provisioning method choice — Zero-Touch](#provisioning-method-choice) | CRITICAL |
| EFRP not assigned before Android 15 COPE reset | [Android 15 FRP and EFRP](#android-15-frp) | CRITICAL |
| CA exclusion missing (tenant-conditional) | [Prerequisites](#prerequisites) | HIGH (if CA policy applies) |
| Android 15 COPE Settings-app reset without re-supplying pre-reset Google account | [Android 15 FRP and EFRP](#android-15-frp) | HIGH (COPE-specific per verbatim MS Learn note) |
| NFC attempted on COPE Android 11+ | [Provisioning method choice — NFC](#provisioning-method-choice) | HIGH (COPE-specific Android 11+ removal) |
| `afw#setup` attempted on COPE Android 11+ | [Provisioning method choice — afw#setup](#provisioning-method-choice) | HIGH (COPE-specific Android 11+ removal) |
| Token entry attempted on COPE Android 11+ | [Provisioning method choice — Token entry](#provisioning-method-choice) | HIGH (COPE-specific Android 11+ removal) |
| Zero-Touch linked via Method A for COPE fleet | [Provisioning method choice — Zero-Touch](#provisioning-method-choice) | HIGH (COPE devices land in COBO mode) |
| Token assigned to wrong group | [Enrollment token management](#enrollment-token) | HIGH |
| Naming template assumed retroactive | [Enrollment profile creation](#enrollment-profile) | MEDIUM |

<a id="renewal-maintenance"></a>
## Renewal / Maintenance

| Component | Renewal Period | Consequence of Lapse | Renewal Steps |
|-----------|----------------|----------------------|---------------|
| MGP binding | No expiry while the bound Entra account remains active | New app approvals and app distribution stop for enrolled COPE devices | Re-bind via Intune admin center — see [01-managed-google-play.md#disconnect-consequences](01-managed-google-play.md#disconnect-consequences) for the required pre-disconnect sequence before rotating |
| Default enrollment token | Does not expire | Token-check failures only if the token is explicitly revoked | No scheduled rotation required; rotate only if the token is accidentally shared → **Revoke token** and regenerate |
| Staging enrollment token | Configurable up to 65 years (default 65 years); rotate every 1-2 years regardless of the 65-year ceiling | New COPE enrollments using the token fail; already-enrolled devices unaffected | Regenerate via Intune admin center → **Devices** → **Enrollment** → **[profile]** → **Replace token** |
| ZT reseller contract (if using Zero-Touch) | Reseller-specific, typically annual | New device IMEI/serial uploads from the reseller stop appearing in the ZT portal | Contact the reseller; see [02-zero-touch-portal.md#step-0-reseller](02-zero-touch-portal.md#step-0-reseller) for the reseller relationship record |
| EFRP policy assignment (COPE fleet) | Review every 60 days (matches this guide's own `review_by` cadence) | EFRP drift → reset COPE devices may lock despite the policy existing, because the assignment no longer covers them | Audit the Device Restrictions profile assignment; confirm the target group includes all COPE devices; verify the allowlist still covers your fleet's Google accounts; for Android 15 COPE devices, also document the pre-reset Google account associated with each device set so Settings-app re-enrollment is unblocked |

**Rotation cadence:** Default token — no rotation; revoke only after accidental exposure. Staging token — rotate every 1-2 years regardless of the 65-year ceiling. MGP binding — verify the bound Entra account each 60-day cycle. EFRP — audit assignment and allowlist coverage each 60-day cycle.

## See Also

- [Android Enterprise Admin Setup Overview](00-overview.md)
- [Managed Google Play Binding](01-managed-google-play.md) — MGP binding prerequisite
- [Zero-Touch Portal Configuration](02-zero-touch-portal.md) — Zero-Touch portal prerequisite
- [Fully Managed (COBO) Admin Setup](03-fully-managed-cobo.md) — sibling mode (COBO/COPE decision matrix above)
- [BYOD Work Profile Admin Setup](04-byod-work-profile.md) — sibling personally-owned work-profile path
- [Knox Mobile Enrollment](07-knox-mobile-enrollment.md) — Samsung COPE/WPCO provisioning channel
- [Android Enterprise Prerequisites](../android-lifecycle/01-android-prerequisites.md)
- [Android Provisioning Methods](../android-lifecycle/02-provisioning-methods.md)
- [Android Version Matrix](../android-lifecycle/03-android-version-matrix.md)
- [Android Enterprise Provisioning Glossary — COPE](../_glossary-android.md#cope)
- [Android Enterprise Provisioning Glossary — WPCO](../_glossary-android.md#wpco)
- [Android Enterprise Provisioning Glossary — Work Profile](../_glossary-android.md#work-profile)
- [Android Enterprise Provisioning Glossary — KME](../_glossary-android.md#kme)
- [Android Enterprise Provisioning Glossary — Play Integrity](../_glossary-android.md#play-integrity)

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-04-25 | Initial version — COPE/WPCO enrollment profile, default + staging-up-to-65-year tokens, all 7 naming templates, 5 provisioning methods (QR / NFC / afw#setup / Token entry / Zero-Touch) with Android 11+ removal callouts for NFC + afw#setup + Token entry (D-01..D-07 mirror; RESEARCH NEW FINDING #1), Android 15 FRP H2 with COPE-specific FRP behavior table + Settings-app re-enrollment requirement (RESEARCH NEW FINDING #2), Android 15 Private Space ⚠️ callout in Key Concepts (D-08 + D-33 Pitfall 8 Option A scope-tightened wording), COPE-vs-COBO decision matrix sub-H3 inside Provisioning method choice (D-13 / D-05 / RESEARCH Open Question #1), Samsung-admins callout in Zero-Touch H3 (D-19), inverse-direction COPE Migration Note back-link to COBO (D-03). Closes AECOPE-01 / Phase 46 Wave 1. | -- |
