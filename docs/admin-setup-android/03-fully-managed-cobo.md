---
last_verified: 2026-04-25
review_by: 2026-06-24
audience: admin
platform: Android
applies_to: COBO
---

> **Platform gate:** This guide covers Android Enterprise Fully Managed (COBO) enrollment through Microsoft Intune, including enrollment profile creation, enrollment token lifecycle, all four provisioning methods (QR code, NFC, `afw#setup`, Zero-Touch), the COPE migration note, Android 15 Factory Reset Protection + Enterprise FRP (EFRP) configuration, and Entra join behavior.
> For iOS/iPadOS admin setup, see [iOS Admin Guides](../admin-setup-ios/00-overview.md).
> For macOS admin setup, see [macOS Admin Guides](../admin-setup-macos/00-overview.md).
> For Android provisioning terminology, see the [Android Enterprise Provisioning Glossary](../_glossary-android.md).

# Android Enterprise Fully Managed (COBO) Admin Setup

This guide walks an Intune administrator through creating and operating a Fully Managed (COBO) enrollment profile for corporate-owned Android devices: profile and token lifecycle, all four provisioning methods with COBO-specific callouts, the COPE migration context, Android 15 FRP + EFRP configuration, and Entra-join behavior.

**Covered:** Entra join + tenant-conditional Chrome-tab CA exclusion; COPE Migration Note reflecting Google's current WPCO direction; enrollment profile creation; enrollment token management (default no expiry; staging up to 65 years); all four provisioning methods (QR, NFC, `afw#setup`, Zero-Touch) with COBO-specific callouts; Android 15 FRP + EFRP configuration.

**Not covered:** MGP binding mechanics (see [01-managed-google-play.md#bind-mgp](01-managed-google-play.md#bind-mgp)); Zero-Touch portal mechanics (see [02-zero-touch-portal.md](02-zero-touch-portal.md)); corporate-scale ZTE including dual-SIM IMEI 1 (Phase 39); the canonical provisioning-method × mode matrix (see [02-provisioning-methods.md](../android-lifecycle/02-provisioning-methods.md)); full COPE admin path (deferred v1.4.1); Knox Mobile Enrollment (deferred v1.4.1); COBO-applicable Android L1 Runbooks — see [Android L1 Runbooks](../l1-runbooks/00-index.md#android-l1-runbooks): [22: Enrollment Blocked](../l1-runbooks/22-android-enrollment-blocked.md), [24: Device Not Enrolled](../l1-runbooks/24-android-device-not-enrolled.md), [25: Compliance Blocked](../l1-runbooks/25-android-compliance-blocked.md), [26: MGP App Not Installed](../l1-runbooks/26-android-mgp-app-not-installed.md); COBO L2 investigation (Phase 41).

**How to use:** Intune administrators read linearly. L1 Service Desk uses the [Android L1 Runbooks](../l1-runbooks/00-index.md#android-l1-runbooks) (Phase 40, now shipped). L2 Desktop Engineering uses the [Android L2 investigation runbooks](../l2-runbooks/00-index.md#android-l2-runbooks).

<a id="key-concepts"></a>
## Key Concepts

### Work profile is the entire device

On COBO (Fully Managed), the managed "work profile" is not a partition — it is the complete device scope. There is no personal app surface, no personal data, no user-controlled partition. Every app, setting, certificate, Wi-Fi profile, VPN, and restriction configured through Intune applies to the whole device. (Applies to Android 10.0+ per [03-android-version-matrix.md#cobo](../android-lifecycle/03-android-version-matrix.md#cobo).) See [Fully Managed](../_glossary-android.md#fully-managed) for the authoritative definition.

### Entra join behavior

COBO devices are Entra-joined during enrollment. The Android setup process uses a Chrome Custom Tab — an OS-launched Chrome tab — to complete Entra sign-in. This makes the Conditional Access prerequisite below load-bearing: a CA policy scoped to browsers plus the Microsoft Intune cloud app can intercept the Chrome-tab sign-in and block enrollment.

> **Cross-platform note:** Android's Fully Managed is the closest analog to iOS Supervision on ADE-enrolled devices, but the mapping is partial — iOS supervision is a permanent per-device state that gates approximately 60 restriction settings on top of a normal MDM enrollment, whereas Android Fully Managed is an ownership-mode designation set at provisioning time. See [_glossary-android.md#fully-managed](../_glossary-android.md#fully-managed) for the full cross-platform framing.

<a id="prerequisites"></a>
## Prerequisites

**Hard prerequisites:**

- [ ] **Microsoft Intune Plan 1+** with the Intune Administrator role (or a custom RBAC role granting enrollment-management permissions).
- [ ] **Managed Google Play (MGP) binding complete** — see [01-managed-google-play.md#bind-mgp](01-managed-google-play.md#bind-mgp); the [Account Types](01-managed-google-play.md#account-types) table covers the Entra-vs-Gmail binding decision. This guide references, never duplicates.
- [ ] <a id="entra-join-prerequisite"></a>**Entra join enabled** on the tenant — without this, COBO enrollment fails at token generation. The Chrome Custom Tab sign-in during device setup is the surface that depends on it.
- [ ] **Factory-reset or new device** — COBO requires out-of-box state. A device already past Setup Wizard without the correct provisioning path must be reset before COBO enrollment.
- [ ] **Android 10.0+** — hard minimum. See [03-android-version-matrix.md#cobo](../android-lifecycle/03-android-version-matrix.md#cobo) for the version-support detail; this guide does not restate the matrix.
- [ ] **Google Mobile Services (GMS) connectivity** on the device and on the out-of-box network — Play Services must reach `play.google.com` and the Android Enterprise endpoints for DPC download during provisioning.

**Tenant-conditional prerequisite:**

<a id="ca-exclusion-intune-app"></a>

- [ ] **Conditional Access exclusion for the Microsoft Intune cloud app — IF your tenant uses Conditional Access.** Per Microsoft Learn (verified 2026-04-21): *"The Android setup process uses a Chrome tab to authenticate your users during enrollment."* If your tenant has a Conditional Access policy using the *require a device to be marked as compliant* Grant control OR a Block policy applying to **All Cloud apps**, **Android**, and **Browsers**, you must exclude the **Microsoft Intune** cloud app from that policy. Tenants without such a CA policy are unaffected — this is not a universal hard prereq. <!-- MEDIUM confidence: Entra CA UI navigation verified 2026-04-21; re-verify at execute time per CONTEXT D-16. -->

> **What breaks if misconfigured:** Missing Entra join → COBO enrollment fails at token generation with an opaque error surfaced in Intune admin center. Missing CA exclusion (when your tenant has a qualifying CA policy) → Chrome-tab sign-in fails during COBO device setup; admin sees an opaque "sign-in blocked" error on the device and correlating failures in Entra ID sign-in logs. Recovery: exclude the Microsoft Intune cloud app from the CA policy; retry the device setup from scratch.

<a id="cope-migration"></a>
## COPE Migration Note

If you have existing COPE (Corporate-Owned, Personally-Enabled) deployments, read this before creating a new COBO profile.

**Google recommends WPCO (Work Profile on Corporate-Owned).** WPCO is the forward-looking Google terminology for the work-profile-on-company-owned-device pattern that replaced the original COPE experience beginning on Android 11. COPE remains functionally supported on Android 10+ fleets, and Google has not issued a formal deprecation notice. However, NFC and `afw#setup` lost their COPE path on Android 11+. COBO (Fully Managed) is a distinct enrollment mode and is not affected by the COPE method removals. For method-by-method version support, see [02-provisioning-methods.md](../android-lifecycle/02-provisioning-methods.md).

The full COPE admin path (separate from COBO) is deferred to v1.4.1; see `.planning/PROJECT.md` deferred items. For net-new corporate-with-work-profile deployments, provision WPCO; for existing COPE fleets, continue running them until your v1.4.1 migration is in place.

<!-- MEDIUM confidence: locked phrasing above paraphrases Google's technical direction (Android 11 removal of work-profile-on-fully-managed in favor of work-profile-on-company-owned) per _glossary-android.md and Bayton's Android 11 COPE changes article. No current Google AE Help source uses the verbatim phrase; none contradict. last_verified: 2026-04-21. See [_glossary-android.md#cope](../_glossary-android.md#cope), [_glossary-android.md#wpco](../_glossary-android.md#wpco). -->

<a id="enrollment-profile"></a>
## Enrollment profile creation

The COBO enrollment profile is created entirely in the Microsoft Intune admin center — no MGP or ZT portal step is involved at this stage. **Before you begin:** see [Prerequisites](#prerequisites) above.

#### In Intune admin center

1. Sign in to the [Intune admin center](https://endpoint.microsoft.com). Use `endpoint.microsoft.com` as the entry point; `intune.microsoft.com` can trigger browser security-zone mismatches on the Google redirect flow.
2. Navigate to **Devices** → **Enrollment** → **Android** tab → **Android Enterprise** → **Enrollment profiles** → **Corporate-owned, fully managed user devices** → **Create policy**.
3. **Name** — enter a descriptive name. Record the exact string for later; dynamic Entra device-group rules match against `enrollmentProfileName` and the name is the identifier.

   > **What breaks if misconfigured:** Renaming the profile after assignment breaks future enrollments — the rename is not propagated and dynamic device-group rules matching the old name drift out of scope. Recovery: create a new profile, reassign, revoke the old token, delete the old profile. Symptom appears in: Intune admin center (devices stuck at enrollment; dynamic group membership empty).

4. **Description** (optional) — document the device fleet, provisioning method, and EFRP linkage.
5. **Token type** — this is the critical decision of the profile. Choose one:
   - **Default (corporate-owned, fully managed)** — does not expire, supports enrollment-time grouping, and is the standard choice for ongoing COBO enrollments.
   - **Staging (corporate-owned, fully managed, via staging)** — configurable expiration date up to 65 years in the future, does NOT support enrollment-time grouping, and is intended for third-party pre-provisioning workflows (including Knox Mobile Enrollment and partner device-staging flows).
6. **Token expiration date** — only applicable when Token type is Staging. Per Microsoft Learn (verified 2026-04-21): *"Enter the date you want the token to expire, up to 65 years in the future. Acceptable date format: MM/DD/YYYY or YYYY-MM-DD. The token expires on the selected date at 12:59:59 PM in the time zone it was created."*
7. **Naming template** (optional) — use template strings such as `{{SERIAL}}`, `{{SERIALLAST4DIGITS}}`, `{{DEVICETYPE}}`, `{{ENROLLMENTDATETIME}}`, `{{UPNPREFIX}}`, `{{USERNAME}}`, `{{RAND:x}}` to generate predictable device display names.
8. **Device group** (optional, default token only) — select a static Entra device group. Staging tokens do not support enrollment-time grouping; use a dynamic Entra device group with an `enrollmentProfileName Equals [name]` rule for staging-token fleets instead.

   > **What breaks if misconfigured:** Device group assigned to a group that excludes the intended devices → token-check fails during enrollment with an opaque error. Recovery: reassign the profile to an inclusive group (or a parent group); re-run device enrollment. Symptom appears in: device setup flow.

9. **Scope tags** (optional) — restrict profile visibility per RBAC scope.

   > **What breaks if misconfigured:** Scope tag applied incorrectly → the admin who needs to manage the profile cannot see it in the profile list. Recovery: adjust the scope-tag assignment in **Tenant administration** → **Roles** → **Scope (tags)**. Symptom appears in: Intune admin center (profile list empty for the affected admin account).

10. Review and **Create**.

Version tag: applies to Intune Android Enterprise enrollment as of Microsoft Learn `setup-fully-managed` updated 2026-04-16 and `android-corporate-owned-work-profile-enroll` updated 2026-04-16. Re-verify the admin center navigation at the next 60-day review cycle; unified admin center rollouts occasionally reshape breadcrumbs.

<a id="enrollment-token"></a>
## Enrollment token management

After the enrollment profile is created, Intune generates the enrollment token associated with the profile. The token is the secret artifact admins distribute through the chosen provisioning method (embedded in the QR payload, baked into the NFC tag, or substituted into the Zero-Touch DPC extras JSON).

**Token types and semantics:**

| Token type | Expiry | Enrollment-time grouping | Use case |
|------------|--------|--------------------------|----------|
| Default (corporate-owned, fully managed) | **Does not expire** | Supported | Standard COBO enrollments; use in most cases |
| Staging (corporate-owned, fully managed, via staging) | Configurable up to **65 years** (default 65 years) | NOT supported | Third-party pre-provisioning workflows including partner device-staging |

**Token lifecycle operations:**

- **Replace token** — generate a new token nearing staging-token expiration. Applies to staging tokens only; default tokens do not expire.
- **Revoke token** — immediately expire the token. Use this after accidental sharing with an unauthorized party, or after all planned enrollments for a token are complete. Revocation does NOT affect devices that are already enrolled; only new enrollments using the revoked token are blocked.
- **Export token** — export the token's JSON content. Needed when embedding the token in the Zero-Touch portal DPC extras JSON (see [02-zero-touch-portal.md#dpc-extras-json](02-zero-touch-portal.md#dpc-extras-json)) or feeding it to partner device-staging flows.

**Legacy "90-day" language does NOT apply to COBO.** The "up to 90-day max" enrollment-token expiry language from older documentation applies ONLY to AOSP (non-GMS) corporate user-associated tokens. It does NOT apply to COBO/Fully Managed tokens, which use the Default (no expiry) or Staging (up to 65 years) semantics above. Do not copy 90-day values from older runbooks or templates into COBO enrollment workflows.

> **What breaks if misconfigured:** Staging token revoked prematurely → devices mid-enrollment flow fail at the token-check step with an opaque error on the device. Recovery: regenerate the staging token via **Replace token** and redistribute through the provisioning channel (QR image regeneration, NFC tag rewrite, or DPC extras JSON update). Symptom appears in: device setup flow (token rejected).

> **What breaks if misconfigured:** Token assigned to a group that excludes the target devices → devices fail the token-check during enrollment. Recovery: reassign the profile/token broadly or to a parent group that covers the intended device fleet.

> **What breaks if misconfigured:** Exported token shared insecurely — email, public SharePoint, group chat — grants unauthorized enrollment capability to anyone who receives it. Recovery: **Revoke token** immediately; revocation does NOT affect already-enrolled devices, so in-flight enrollments are preserved. Rotate staging tokens on a 1-2-year cadence regardless of the 65-year ceiling to align with tenant security review.

Version tag: applies to Intune Android Enterprise enrollment per Microsoft Learn `setup-fully-managed` (ms.date 2025-05-08; updated 2026-04-16). See [Renewal / Maintenance](#renewal-maintenance) below for rotation cadence guidance.

<a id="provisioning-method-choice"></a>
## Provisioning method choice

COBO supports all four Android Enterprise provisioning methods: QR code, NFC, `afw#setup` (DPC identifier), and Zero-Touch. The full method-availability and cross-mode support matrix lives in [02-provisioning-methods.md](../android-lifecycle/02-provisioning-methods.md); this section carries COBO-specific constraint callouts that the matrix does not cover. The COBO matrix row is the filtered-row target: see [02-provisioning-methods.md#cobo](../android-lifecycle/02-provisioning-methods.md#cobo).

> **Conditional Access reminder:** If your tenant has a Conditional Access policy affecting the Microsoft Intune cloud app, confirm the cloud app is excluded before proceeding. The provisioning flow triggers the Chrome Custom Tab at the Entra sign-in step, and a CA policy on the Intune cloud app will block it. See [Prerequisites](#prerequisites) above.

### QR code

The Intune admin center generates a QR image at the enrollment profile. An admin presents the QR to the factory-reset device; the device camera decodes the payload, downloads the DPC, and begins COBO provisioning. Internet connectivity is required BEFORE scanning on earlier Android versions; the built-in QR reader arrived in a later release — see the matrix for the breakpoint. QR codes embed enrollment tokens and Wi-Fi credentials in plaintext: never commit tenant-specific QR images to git, never email them, never post them to a public SharePoint. Treat the QR image as a secret artifact, regenerated per deployment batch.

> **What breaks if misconfigured:** The QR image captured from the Intune portal expires when the token is regenerated or revoked. A stale QR from an old deployment batch succeeds at the scan step but fails at the subsequent token-exchange step with an opaque error. Recovery: regenerate the QR from the current enrollment profile; redistribute to the admin-led provisioning site.

For version-availability and cross-mode support, see [02-provisioning-methods.md#qr](../android-lifecycle/02-provisioning-methods.md#qr).

### NFC

COBO retains NFC provisioning support on Android 10+; the Android-11 COPE NFC removal does NOT affect COBO. NFC uses NFC Forum Type 2 Tags with an 888-byte payload limit — Wi-Fi credentials plus DPC extras can exceed the limit, so shorten SSID values and drop optional extras. NFC Beam (device-to-device tap) was removed in Android 10; NFC provisioning today uses a tag written from a provisioning app, not a peer-to-peer bump.

> **What breaks if misconfigured:** NFC tag payload exceeds 888 bytes → NFC provisioning fails at the tap step with no clear error. Recovery: shorten the SSID, drop optional DPC extras, and rewrite the tag. Do not attempt to truncate the enrollment token or DPC signature values — those fields are fixed.

For version-availability and cross-mode support, see [02-provisioning-methods.md#nfc](../android-lifecycle/02-provisioning-methods.md#nfc).

### afw#setup (DPC identifier)

On the initial Google sign-in prompt during factory-reset setup, type `afw#setup` instead of a Gmail address. This triggers DPC download and provisions the device into COBO. `afw#setup` is still supported for COBO on Android 11+ (contrast: the COPE path was removed on Android 11+ — see [_glossary-android.md#afw-setup](../_glossary-android.md#afw-setup)). System apps are disabled by default on devices provisioned through `afw#setup` — the Intune device configuration profile must explicitly re-enable required system apps (Calendar, Contacts, Messaging, OEM utilities) through the system-app allow list.

> **What breaks if misconfigured:** The Intune device configuration profile does not re-enable required system apps → users report broken device state post-provisioning (Calendar and Contacts missing from the launcher despite apparently being installed). Recovery: add the required system-app package names to the system-app allow list in the device configuration profile and redeploy.

For version-availability and cross-mode support, see [02-provisioning-methods.md#afw-setup](../android-lifecycle/02-provisioning-methods.md#afw-setup).

### Zero-Touch

COBO provisioning via Zero-Touch requires the Phase 35 Zero-Touch portal binding. See [02-zero-touch-portal.md#link-zt-to-intune](02-zero-touch-portal.md#link-zt-to-intune) for ZT↔Intune linking and [02-zero-touch-portal.md#dpc-extras-json](02-zero-touch-portal.md#dpc-extras-json) for the DPC extras JSON. Dual-SIM IMEI 1 registration and the corporate-scale reseller-upload workflow are Phase 39 scope.

> ⚠️ **Samsung admins:** Choose Knox Mobile Enrollment (KME) or Zero-Touch — never both. Configuring both on the same devices causes out-of-sync enrollment state on Samsung hardware. See [Knox Mobile Enrollment](07-knox-mobile-enrollment.md) for full KME admin coverage; [02-zero-touch-portal.md#kme-zt-mutual-exclusion](02-zero-touch-portal.md#kme-zt-mutual-exclusion) for the mutual-exclusion record; and [_glossary-android.md#zero-touch-enrollment](../_glossary-android.md#zero-touch-enrollment) for the Zero-Touch definition and the iOS ADE cross-platform analog.

> **What breaks if misconfigured:** The device connects to a captive-portal Wi-Fi at first boot → the Zero-Touch configuration download fails → the device falls through to consumer Android OOBE and must be factory-reset to retry. Recovery: ship devices with a SIM for cellular fallback, or provide an accessible open Wi-Fi network at the provisioning site without captive-portal interception.

For version-availability and cross-mode support, see [02-provisioning-methods.md#zero-touch](../android-lifecycle/02-provisioning-methods.md#zero-touch).

<a id="android-15-frp"></a>
## Android 15 FRP and EFRP

> ⚠️ **Configure EFRP before any factory reset on Android 15 devices; FRP hardening can block re-enrollment.**

**What changed on Android 15.** Enabling OEM unlock no longer deactivates Factory Reset Protection (FRP). Bypassing the setup wizard no longer deactivates FRP. Accounts, passwords, and apps are blocked while FRP is active. Enterprise FRP (EFRP) is enforced after a hard factory reset regardless of OEM unlock state. (Applies to Android 15.0+.) Result: re-enrollment flows that worked on Android 13 / 14 can block on Android 15 unless EFRP is configured BEFORE devices are reset. For the authoritative narrative, see [03-android-version-matrix.md#android-15-breakpoint](../android-lifecycle/03-android-version-matrix.md#android-15-breakpoint).

**Admin action required.** Configure Enterprise Factory Reset Protection (EFRP) via Intune policy **before** any device reset on Android 15 COBO devices. EFRP is an allowlist of Google account email addresses authorized to unlock a post-reset device; see [Google AE Help](https://support.google.com/work/android/answer/14549362) for the feature description.

<a id="configure-efrp"></a>
### Configure EFRP in Intune

#### In Intune admin center

1. In the [Intune admin center](https://endpoint.microsoft.com), navigate to **Devices** → **Configuration** → **Create profile**.
2. **Platform:** **Android Enterprise**.
3. **Profile type:** **Fully managed, dedicated, and corporate-owned work profile — Device restrictions**.
4. Under **General**, configure **Factory reset protection emails** — add the Google account email address(es) authorized to unlock a post-reset device.
5. **Assignments:** assign to all COBO devices (or a targeted device group that covers your Android 15 COBO fleet).
6. **Review + create**.

> **What breaks if misconfigured:** EFRP not assigned to COBO devices before a factory reset → FRP locks the device post-reset → re-enrollment requires Google-account credential intervention with the pre-reset device-owner account (HIGH recovery cost). Recovery: unlock requires a device-owner account associated with the pre-reset state; otherwise contact the device vendor. Prevention: audit EFRP assignment every 60-day review cycle.

<!-- MEDIUM confidence: Intune admin center EFRP navigation path verified against Microsoft Learn 2026-04-21. Unified admin center rollouts may reshape breadcrumbs; re-verify at execute time per CONTEXT D-16. -->

**References:** [Google AE Help — Enable EFRP](https://support.google.com/work/android/answer/14549362); [MS Learn — Factory Reset Protection Emails Not Enforced](https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-configuration/factory-reset-protection-emails-not-enforced); [Phase 34 version matrix — Android 15 breakpoint](../android-lifecycle/03-android-version-matrix.md#android-15-breakpoint).

Dedicated-mode FRP re-provisioning is parallel-but-distinct and is tracked for Phase 38; this section owns EFRP for COBO only.

<a id="what-breaks"></a>
## What Breaks Summary

Inline what-breaks callouts at each decision point. Severity descending within each source section.

| Misconfiguration | Section | Severity |
|------------------|---------|----------|
| Entra join not enabled | [Prerequisites](#prerequisites) | CRITICAL |
| CA exclusion missing (tenant-conditional) | [Prerequisites](#prerequisites) | HIGH (if CA policy applies) |
| Staging token revoked prematurely | [Enrollment token management](#enrollment-token) | CRITICAL |
| Exported token shared insecurely | [Enrollment token management](#enrollment-token) | CRITICAL |
| KME + ZT dual-configured on Samsung | [Provisioning method choice — Zero-Touch](#provisioning-method-choice) | CRITICAL |
| EFRP not assigned before Android 15 reset | [Android 15 FRP and EFRP](#android-15-frp) | CRITICAL |
| Enrollment profile renamed after assignment | [Enrollment profile creation](#enrollment-profile) | HIGH |
| Token assigned to wrong group | [Enrollment token management](#enrollment-token) | HIGH |
| QR code image stale or expired | [Provisioning method choice — QR code](#provisioning-method-choice) | HIGH |
| ZT device connects to captive-portal Wi-Fi | [Provisioning method choice — Zero-Touch](#provisioning-method-choice) | HIGH |
| Enrollment profile scope tag misapplied | [Enrollment profile creation](#enrollment-profile) | MEDIUM |
| NFC tag payload exceeds 888 bytes | [Provisioning method choice — NFC](#provisioning-method-choice) | MEDIUM |
| `afw#setup` system apps disabled by EMM policy | [Provisioning method choice — afw#setup](#provisioning-method-choice) | MEDIUM |

<a id="renewal-maintenance"></a>
## Renewal / Maintenance

| Component | Renewal Period | Consequence of Lapse | Renewal Steps |
|-----------|----------------|----------------------|---------------|
| MGP binding | No expiry while the bound Entra account remains active | New app approvals and app distribution stop for enrolled devices | Re-bind via Intune admin center — see [01-managed-google-play.md#disconnect-consequences](01-managed-google-play.md#disconnect-consequences) for the required pre-disconnect sequence before rotating |
| Default enrollment token | Does not expire | Token-check failures only if the token is explicitly revoked | No scheduled rotation required; rotate only if the token is accidentally shared → **Revoke token** and regenerate |
| Staging enrollment token | Configurable up to 65 years (default 65 years) | New enrollments using the token fail; already-enrolled devices unaffected | Regenerate via Intune admin center → **Devices** → **Enrollment** → **[profile]** → **Replace token** |
| ZT reseller contract (if using Zero-Touch) | Reseller-specific, typically annual | New device IMEI/serial uploads from the reseller stop appearing in the ZT portal | Contact the reseller; see [02-zero-touch-portal.md#step-0-reseller](02-zero-touch-portal.md#step-0-reseller) for the reseller relationship record |
| EFRP policy assignment | Review every 60 days (matches this guide's own `review_by` cadence) | EFRP drift → reset devices may lock despite the policy existing, because the assignment no longer covers them | Audit the Device Restrictions profile assignment; confirm the target group includes all COBO devices; verify the allowlist still covers your fleet's Google accounts |

**Rotation cadence:** Default token — no rotation; revoke only after accidental exposure. Staging token — rotate every 1-2 years regardless of the 65-year ceiling. MGP binding — verify the bound Entra account each 60-day cycle. EFRP — audit assignment and allowlist coverage each 60-day cycle.

## See Also

- [Android Enterprise Admin Setup Overview](00-overview.md)
- [Managed Google Play Binding](01-managed-google-play.md) — MGP binding prerequisite
- [Zero-Touch Portal Configuration](02-zero-touch-portal.md) — Zero-Touch portal prerequisite for the ZT provisioning method
- [Android Enterprise Prerequisites](../android-lifecycle/01-android-prerequisites.md)
- [Android Enterprise Enrollment Overview](../android-lifecycle/00-enrollment-overview.md)
- [Android Provisioning Methods](../android-lifecycle/02-provisioning-methods.md)
- [Android Version Matrix](../android-lifecycle/03-android-version-matrix.md)
- [Android Enterprise Provisioning Glossary — Fully Managed](../_glossary-android.md#fully-managed)
- [Android Enterprise Provisioning Glossary — DPC](../_glossary-android.md#dpc)
- [Android Enterprise Provisioning Glossary — Managed Google Play](../_glossary-android.md#managed-google-play)
- [Android Enterprise Provisioning Glossary — Play Integrity](../_glossary-android.md#play-integrity)

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-04-23 | Resolved Android L1 runbook cross-references | -- |
| 2026-04-21 | Initial version — COBO enrollment profile, token management, 4 provisioning methods (hybrid routing per D-01), COPE Migration Note (D-03), Android 15 FRP + EFRP configuration (D-05), Entra join + Chrome-tab CA exclusion (D-07), Key Concepts (D-08) | -- |
