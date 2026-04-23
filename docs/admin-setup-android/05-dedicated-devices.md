---
last_verified: 2026-04-22
review_by: 2026-06-21
audience: admin
platform: Android
applies_to: Dedicated
---

> **Platform gate:** This guide covers Android Enterprise Dedicated (kiosk/COSU) enrollment through Microsoft Intune — including the four Dedicated scenarios (single-app kiosk, multi-app kiosk with Managed Home Screen, digital signage, and Entra shared device mode), enrollment profile creation, enrollment token lifecycle, all four provisioning methods with Dedicated-specific constraint callouts, MHS exit-PIN synchronization (the top repeated-escalation pattern for Dedicated devices), and Android 15 FRP re-provisioning behavior for kiosk fleets. Applies to Android 8.0+.
> For Android Enterprise Fully Managed (COBO) enrollment, see [03-fully-managed-cobo.md](03-fully-managed-cobo.md#key-concepts).
> For BYOD Work Profile, see [04-byod-work-profile.md](04-byod-work-profile.md#key-concepts).
> For iOS/iPadOS admin setup, see [iOS Admin Guides](../admin-setup-ios/00-overview.md).
> For macOS admin setup, see [macOS Admin Guides](../admin-setup-macos/00-overview.md).
> For Android provisioning terminology, see the [Android Enterprise Provisioning Glossary](../_glossary-android.md).

# Android Enterprise Dedicated (kiosk/COSU) Admin Setup

This guide covers Dedicated (kiosk/COSU) device enrollment through Microsoft Intune: the four Dedicated scenarios, enrollment profile creation with Dedicated-specific deltas, token lifecycle and QR rotation discipline, all four provisioning methods with constraint callouts, MHS exit-kiosk PIN synchronization, and Android 15 FRP re-provisioning behavior for kiosk fleets.

**How to use:** Intune administrators read linearly. L1 Service Desk and L2 Desktop Engineering use the Phase 40 and Phase 41 runbooks (not this guide). LOB Operations Owners read [Audience and stakeholders](#audience-and-stakeholders) for the persona-specific responsibilities.

> **Platform note:** "Dedicated device" in Android Enterprise (COSU — Corporate-Owned, Single-Use) is single-purpose kiosk hardware with no per-user identity. This is structurally distinct from iOS Shared iPad (multi-user shared identity) and Windows Shared PC (multi-user fast-switch). For cross-platform comparison, see [Android dedicated device disambiguation](../_glossary-android.md#dedicated).

<a id="key-concepts"></a>
## Key Concepts

<a id="audience-and-stakeholders"></a>
### Audience and stakeholders

Audience: Intune Admin + Line-of-Business Operations Owner. The operations owner defines the locked app(s); the Intune admin configures the enrollment and kiosk policy.

In practice, these two roles split decisions across the Dedicated configuration workflow. The **LOB Operations Owner** is the business stakeholder who determines which scenario the deployment falls into and which apps will run on the device. Examples: a warehouse floor manager who identifies that barcode scanning is the sole task and picks the inventory-scanner app; a retail operations lead who selects the set of customer self-service apps and decides whether shift workers need individual sign-in (Entra shared device mode) or can share a single device account (multi-app kiosk); a signage operations lead who picks the digital-signage app and decides screen-saver timeout behavior.

The **Intune Admin** then translates those decisions into Intune configuration: creating the enrollment profile with the correct token type, assigning the MHS app (`com.microsoft.launcher.enterprise`) as Required if the scenario requires it, configuring the device restrictions profile with the kiosk lock settings, and ensuring the exit-kiosk PIN is set identically in both the device restrictions profile and the MHS app configuration policy.

The LOB Operations Owner is a business stakeholder, not an Intune RBAC role; they do not need Intune admin permissions.

### Terminology

Android Enterprise uses several terms that overlap with, but are distinct from, iOS and Windows concepts. First-use cross-links to the glossary:

- **[Dedicated](../_glossary-android.md#dedicated)** (also referred to as COSU — Corporate-Owned, Single-Use) — the Android Enterprise management mode for single-purpose kiosk devices with no per-user identity at the device level. This guide uses "Dedicated" after first use.
- **[Managed Home Screen (MHS)](../_glossary-android.md#managed-home-screen)** — the Microsoft launcher app (`com.microsoft.launcher.enterprise`) that replaces the default Android launcher on multi-app kiosk and digital signage Dedicated devices, providing the curated app surface and the exit-kiosk PIN mechanism.
- **[Entra Shared Device Mode](../_glossary-android.md#entra-shared-device-mode)** — a Dedicated sub-scenario in which multiple workers sign in and out with their own Entra credentials on a single device; requires the "Corporate-owned dedicated device with Microsoft Entra ID shared mode" token type.
- **[Play Integrity](../_glossary-android.md#play-integrity)** — the current Google platform integrity attestation API (deprecated predecessor retired in 2024; this guide uses Play Integrity only).
- **[DPC (Device Policy Controller)](../_glossary-android.md#dpc)** — the agent app (Microsoft Intune app) downloaded and executed during provisioning to apply MDM policy to the device.
- **[afw#setup](../_glossary-android.md#afw-setup)** — the DPC identifier typed at the Google sign-in prompt during factory-reset setup to trigger DPC download and Dedicated provisioning.
- **Lock Task Mode** — the Android OS-level mechanism that pins one app to the foreground and prevents user navigation away; Dedicated single-app kiosks use this directly without MHS.

<a id="scenarios"></a>
## Scenarios

Android Enterprise Dedicated supports four deployment scenarios, each with different locking behavior, token type, and user identity model. Choose the right scenario before creating an enrollment profile — the token type decision at profile creation determines which scenarios are structurally available.

| Scenario | Locking style | Token type | User identity model | Example deployment |
|---|---|---|---|---|
| Single-app kiosk | Android Lock Task Mode (one app pinned) | Standard | No user identity | Warehouse barcode scanner |
| Multi-app kiosk (MHS) | Managed Home Screen launcher (`com.microsoft.launcher.enterprise`) | Standard | No user identity | Retail employee device with curated app set |
| Digital signage (userless) | MHS or Lock Task Mode; screen-saver mode | Standard | No user identity | Lobby display or menu board |
| Entra shared device mode | MHS with sign-in enabled | Corporate-owned dedicated device with Microsoft Entra ID shared mode | Per-user Entra sign-in/sign-out | Multi-shift frontline worker device |

### How to choose

The most common decision point is whether shift workers need to sign in as themselves or share a single device account.

Multi-app kiosk = curated app set on a device with no per-user identity. Entra shared device mode = curated app set on a device where multiple workers sign in/out with their own Entra credentials.

Single-app kiosks suit one-task workflows like barcode scanning or queue management; digital signage typically uses MHS in screensaver mode for unattended displays. If the device needs no per-user identity and no interaction beyond a defined task, use Standard token with the appropriate kiosk mode setting. If individual workers need their own Entra identity on the device, use the Entra shared device mode token.

Only multi-app kiosk and digital signage scenarios use Managed Home Screen (MHS); single-app kiosk uses Lock Task Mode directly. The MHS exit-PIN synchronization requirement (see [Exit-kiosk PIN synchronization](#exit-kiosk-pin-synchronization)) applies to MHS scenarios only.

<a id="prerequisites"></a>
## Prerequisites

**Hard prerequisites:**

- [ ] **Microsoft Intune Plan 1+** with the Intune Administrator role (or a custom RBAC role granting enrollment-management permissions).
- [ ] **Managed Google Play (MGP) binding complete** — see [01-managed-google-play.md#bind-mgp](01-managed-google-play.md#bind-mgp). This guide references, never duplicates.
- [ ] **Factory-reset or new device** — Dedicated requires out-of-box state. A device already past Setup Wizard without the correct provisioning path must be reset before Dedicated enrollment.
- [ ] **Android 8.0+** — the Dedicated mode minimum. See [03-android-version-matrix.md#dedicated](../android-lifecycle/03-android-version-matrix.md#dedicated) for the version-support detail; this guide does not restate the matrix.
- [ ] **Google Mobile Services (GMS) connectivity** on the device and on the out-of-box network — Play Services must reach Android Enterprise endpoints for DPC download during provisioning.
- [ ] **Static Entra device group available** for enrollment-time grouping — Dedicated standard tokens require static groups. Dynamic groups lag during burst provisioning when device group membership is computed after enrollment fires.

**Tenant-conditional prerequisites:**

- [ ] **Zero-Touch portal binding** — only required if using Zero-Touch (ZTE) as the provisioning method. See [02-zero-touch-portal.md#link-zt-to-intune](02-zero-touch-portal.md#link-zt-to-intune).
- [ ] **Entra licenses for users + MSAL-integrated apps** — only required for the Entra shared device mode scenario. Workers who sign in/out must have Entra licenses; the apps they use must be MSAL-integrated to participate in the shared sign-in/sign-out flow per [_glossary-android.md#entra-shared-device-mode](../_glossary-android.md#entra-shared-device-mode).

> **What breaks if misconfigured:** MGP not bound → MHS app cannot be assigned, multi-app and digital signage scenarios fail at the "Installing required apps" step. Recovery: re-bind MGP per [01-managed-google-play.md#bind-mgp](01-managed-google-play.md#bind-mgp). Symptom appears in: Intune admin center (Managed Google Play status disconnected) and on the device during enrollment (apps fail to install).

<a id="enrollment-profile"></a>
## Enrollment profile

Dedicated profile creation follows the same Intune flow as Fully Managed (COBO) — see [Phase 36 enrollment profile section](03-fully-managed-cobo.md#enrollment-profile) for the canonical step-by-step (Devices → Device onboarding → Enrollment → Android tab → Enrollment Profiles → Corporate-owned dedicated devices). The Dedicated-specific deltas below explain what differs.

[MEDIUM: MS Learn setup dedicated, last_verified 2026-04-22]

**Delta 1: Token type selection**

Dedicated enrollment profiles offer two token type choices — unlike COBO's Default vs Staging distinction, both Dedicated token types require an expiry date. Choose based on whether per-user Entra sign-in is needed:

- **Standard ("Corporate-owned dedicated device (default)")** — for single-app kiosk, multi-app kiosk (MHS), and digital signage. No per-user Entra identity at the device enrollment layer.
- **"Corporate-owned dedicated device with Microsoft Entra ID shared mode"** — for multi-shift deployments where each worker signs in and out with their own Entra account at the app layer.

Cross-link to [Scenarios](#scenarios) routing paragraph for the decision flowchart. The token type selection is irreversible within the profile — wrong token type requires a new enrollment profile.

> **What breaks if misconfigured:** Wrong token type means the chosen scenario is structurally unavailable. Example: choosing Standard for a multi-shift sign-in workflow eliminates per-user identity capability; all users share the same device account. Recovery: revoke the token, recreate the enrollment profile with the correct token type, redistribute the new QR/enrollment artifact. Symptom appears in: device runtime (sign-in flow missing or Entra prompts absent).

**Delta 2: Static Entra device group assignment — REQUIRED**

When assigning the enrollment profile to a device group, use a **static** Entra device group. Dynamic device groups compute membership after enrollment fires — during burst provisioning (multiple devices enrolling simultaneously), membership lag causes token-check enrollment failures for devices not yet in the dynamic group.

> **What breaks if misconfigured:** Dynamic device group used → token-check enrollment failures during burst provisioning when device group membership lags behind enrollment timing. Recovery: change the enrollment profile assignment to a static Entra device group; re-issue tokens if needed. Symptom appears in: Intune admin center (devices stuck at enrollment with token-check failures); on device (enrollment flow blocked at token-validation step).

**Delta 3: Managed Home Screen (MHS) app config requirement (multi-app + digital signage scenarios only)**

For multi-app kiosk and digital signage scenarios, the Managed Home Screen app (`com.microsoft.launcher.enterprise`) MUST be assigned as **Required** to the device group. Without a Required assignment, the device boots to the standard Android launcher instead of the MHS kiosk surface. This delta does NOT apply to single-app kiosk scenarios, which use Lock Task Mode directly without MHS.

Cross-link to the multi-app row in [Scenarios](#scenarios). Forward-reference: the exit-kiosk PIN MUST be configured identically in both this MHS app config policy AND the device restrictions profile — see [Exit-kiosk PIN synchronization](#exit-kiosk-pin-synchronization) for the failure pattern and remediation.

> **What breaks if misconfigured:** MHS app not assigned (or assigned as Available rather than Required) → device boots to standard Android launcher instead of MHS; no kiosk lockdown applied. Recovery: in Intune admin center, set the MHS app assignment to Required for the Dedicated device group; force a policy sync. Symptom appears in: device home screen (standard Android launcher visible instead of MHS).

**Delta 4: Token expiry and QR rotation discipline**

Dedicated tokens require a mandatory expiry date (configurable up to 65 years); there is no "never expires" option for Dedicated tokens, unlike COBO's Default token type which does not expire. [MEDIUM: no MS Learn statement on default, last_verified 2026-04-22]

Token expiry rotation breaks any printed, laminated, or posted QR enrollment artifacts. When rotating tokens, generate a new QR and redistribute to all field locations before retiring the old token. Plan your rotation cadence to align with operational refresh windows — annual refresh batches are common for warehouse or retail kiosk fleets.

Cross-link: see [Phase 36 enrollment token section](03-fully-managed-cobo.md#enrollment-token) for general token lifecycle operations (Replace, Revoke, Export).

> **What breaks if misconfigured:** Printed/laminated QR artifacts expire silently when their underlying token expires; field provisioning succeeds at scan but fails at token-exchange. Recovery: revoke old token, generate new token with longer expiry, regenerate QR image, redistribute to field locations. Prevention: track token expiry dates centrally; rotate before expiry rather than after artifacts fail.

<a id="enrollment-token"></a>
## Enrollment token

After the enrollment profile is created, Intune generates an enrollment token. Admins distribute it through the chosen provisioning method (QR payload, NFC tag, or Zero-Touch DPC extras JSON).

**Token types and semantics:**

| Token type | Expiry | Enrollment-time grouping | Use case |
|------------|--------|--------------------------|----------|
| Standard ("Corporate-owned dedicated device (default)") | Mandatory expiry date, configurable up to 65 years; no "never expires" option | Supported (static device group only) | Standard Dedicated scenarios: single-app, multi-app MHS, digital signage |
| Corporate-owned dedicated device with Microsoft Entra ID shared mode | Mandatory expiry date, configurable up to 65 years | Supported (static device group only) | Multi-shift Entra shared device mode scenarios |

[MEDIUM: no MS Learn statement on default, last_verified 2026-04-22]

For token lifecycle operations (Replace, Revoke, Export) — these are identical to COBO mechanics — see [Phase 36 enrollment token section](03-fully-managed-cobo.md#enrollment-token).

> **What breaks if misconfigured:** Token assigned to a group that excludes the target devices → token-check fails during enrollment with an opaque error. Recovery: reassign to an inclusive static group; re-run device enrollment. Symptom appears in: Intune admin center (enrollment failures with token-check error) and device setup flow.

> **What breaks if misconfigured:** Exported token shared insecurely (email, public SharePoint, group chat) grants unauthorized enrollment capability. Recovery: revoke token immediately (already-enrolled devices unaffected); regenerate and redistribute via secure channel.

<a id="provisioning-method-choice"></a>
## Provisioning method choice

Dedicated supports all four Android Enterprise provisioning methods: QR code, NFC, `afw#setup` (DPC identifier), and Zero-Touch. The full method-availability and cross-mode support matrix lives in [02-provisioning-methods.md](../android-lifecycle/02-provisioning-methods.md); this section carries Dedicated-specific constraint callouts that the matrix does not cover. The Dedicated matrix row is the filtered-row target: see [02-provisioning-methods.md#dedicated-cosu](../android-lifecycle/02-provisioning-methods.md#dedicated-cosu).

### QR code

The most common Dedicated provisioning method. The Intune admin center generates a QR image at the enrollment profile; the factory-reset device camera decodes the payload, downloads the DPC, and begins provisioning. QR codes embed the enrollment token plus Wi-Fi credentials in plaintext — treat the QR image as a secret artifact and plan rotation cadence BEFORE printing or laminating (see [Enrollment profile § Delta 4](#enrollment-profile)).

> **What breaks if misconfigured:** Stale QR (regenerated after print/lamination but old artifact still in field) → scan succeeds but token-exchange fails. Recovery: regenerate QR from current enrollment profile and redistribute. Cross-link [Enrollment profile § Delta 4](#enrollment-profile) for QR rotation discipline.

### NFC

Available for Dedicated provisioning. NFC uses NFC Forum Type 2 Tags with an 888-byte payload limit; Wi-Fi credentials plus DPC extras can exceed the limit. Shorten SSID values and drop optional DPC extras to fit within the 888-byte ceiling.

> **What breaks if misconfigured:** NFC tag payload exceeds 888 bytes → NFC provisioning fails at the tap step with no clear error. Recovery: shorten SSID, drop optional extras, rewrite tag.

### afw#setup (DPC identifier)

On the initial Google sign-in prompt during factory-reset setup, type `afw#setup` instead of a Gmail address; this triggers DPC download and Dedicated provisioning. See [afw#setup](../_glossary-android.md#afw-setup) for historical context. System apps are disabled by default on `afw#setup`-provisioned devices — the Intune device configuration profile must explicitly re-enable required system apps via the system-app allow list.

> **What breaks if misconfigured:** Required system apps not re-enabled → users report broken device state post-provisioning (Calendar, Contacts, OEM utilities missing). Recovery: add required system-app package names to the allow list in the device configuration profile and redeploy.

### Zero-Touch

Dedicated supports Zero-Touch Enrollment (ZTE) provisioning. See [02-zero-touch-portal.md#link-zt-to-intune](02-zero-touch-portal.md#link-zt-to-intune) for ZT↔Intune linking and [02-zero-touch-portal.md#dpc-extras-json](02-zero-touch-portal.md#dpc-extras-json) for the DPC extras JSON configuration.

> Corporate-scale ZTE content (reseller-upload handoff, device claim workflow, profile assignment at scale, dual-SIM IMEI 1 registration) is delivered separately in **Phase 39** — see [Phase 35 ZT portal doc](02-zero-touch-portal.md) as the current canonical entry point for ZT setup.

> ⚠️ **Samsung admins:** Choose Knox Mobile Enrollment (KME) or Zero-Touch — never both. Configuring both on the same devices causes out-of-sync enrollment state on Samsung hardware. Full KME coverage is deferred to v1.4.1. See [02-zero-touch-portal.md#kme-zt-mutual-exclusion](02-zero-touch-portal.md#kme-zt-mutual-exclusion) for the mutual-exclusion record and [_glossary-android.md#zero-touch-enrollment](../_glossary-android.md#zero-touch-enrollment) for the Zero-Touch definition and the iOS ADE cross-platform analog.

> **What breaks if misconfigured:** ZT device connects to captive-portal Wi-Fi at first boot → Zero-Touch configuration download fails → device falls through to consumer Android OOBE; must factory-reset to retry. Recovery: ship devices with a SIM for cellular fallback, or provide an open Wi-Fi network without captive-portal interception at the provisioning site.

<a id="exit-kiosk-pin-synchronization"></a><a id="exit-kiosk-pin"></a>
## Exit-kiosk PIN synchronization

> ⚠️ **Multi-app kiosks and digital signage:** the exit-kiosk PIN MUST be configured identically in both the device restrictions profile AND the Managed Home Screen app configuration. Mismatch causes a visible error at kiosk exit attempt — the top repeated-escalation pattern for Dedicated devices. [MEDIUM: MS Q&A community, last_verified 2026-04-22]

The exit-kiosk PIN requires configuration in two separate Intune policies:

1. **Device Restrictions profile** (Devices → Configuration → Create profile → Android Enterprise → Fully managed, dedicated, and corporate-owned work profile — Device restrictions): setting **Leave kiosk mode** (Enable) + **Leave kiosk mode code** (4-6 digit numeric PIN). Inline reminder: the exit-kiosk PIN MUST be configured identically in both this device restrictions profile AND the [MHS app configuration policy](#exit-kiosk-pin-synchronization); mismatch causes the runtime error documented below.

2. **MHS App Configuration policy** (Apps → Configuration → Managed devices → Android → Managed Home Screen, app `com.microsoft.launcher.enterprise`): setting **Exit lock task mode password** (4-6 digit code). Inline reminder: the exit-kiosk PIN MUST be configured identically in both this MHS app configuration AND the [device restrictions profile](#exit-kiosk-pin-synchronization); mismatch causes the runtime error documented below.

Both must be set to the same value. If the exit-kiosk PIN is set in only one policy (or set to different values across the two), users see 'A PIN to exit kiosk mode has not been set by your IT admin' at exit attempt. [MEDIUM: MS Q&A community, last_verified 2026-04-22]

**Remediation:** Verify both policies carry the same 4-6 digit code. Redeploy both policies; the device picks up changes on next policy sync (typically within 8 hours; force a sync from the Intune admin center for faster verification).

**Scope (per D-14):** Multi-app kiosk and digital signage scenarios only. Single-app kiosk does NOT use Managed Home Screen — it uses Lock Task Mode directly — so this synchronization requirement does not apply. See [Scenarios](#scenarios).

<a id="android-15-frp-reprovisioning"></a>
## Android 15 FRP and re-provisioning

> **Applies to Android 15+**
>
> ⚠️ Dedicated devices are typically re-provisioned (factory reset + re-enroll), not re-enrolled in place — describing FRP behavior during factory-reset re-provisioning is therefore distinct from COBO's re-enrollment-in-place context. On Android 15, FRP behavior depends on which reset pathway you use. [HIGH: MS Learn corporate methods, last_verified 2026-04-22]

**Pathway 1 — Settings > Factory data reset:** No FRP triggered on Dedicated (COSU) devices. Safe for routine re-provisioning. This is materially different from COPE behavior, which has FRP on Settings reset. [HIGH: MS Learn corporate methods, last_verified 2026-04-22]

> **What breaks:** Relying on Settings reset for offline/abandoned devices is safe for FRP, but token expiry must still be valid at re-enrollment time. If the token has expired since the QR was printed, re-enrollment fails at token-exchange — see [Enrollment token § QR rotation discipline](#enrollment-token).

**Pathway 2 — Recovery/bootloader reset:** FRP applies. Enterprise FRP (EFRP) pre-configuration is required to recover; otherwise Google account credential intervention with the pre-reset device-owner account is needed (HIGH recovery cost). [HIGH: MS Learn corporate methods, last_verified 2026-04-22]

> **What breaks:** Field-replacement workflow that uses recovery reset on Dedicated devices without EFRP pre-configured = device lockout requiring Google-account credential intervention. Recovery: configure EFRP per [Phase 36 EFRP configuration](03-fully-managed-cobo.md#configure-efrp) BEFORE provisioning the Dedicated fleet, not after.

**Pathway 3 — Intune wipe:** No FRP. Cleanest re-provisioning pathway when the device is online and Intune-managed. [HIGH: MS Learn corporate methods, last_verified 2026-04-22]

> **What breaks:** Requires the device to be online and Intune-managed at the moment of wipe; offline devices need Pathway 1 or 2.

**Cross-links:**

- **Configure EFRP** — see [Phase 36 EFRP configuration](03-fully-managed-cobo.md#configure-efrp) for the canonical Intune policy setup. This guide does NOT restate those steps.
- **Android 15 FRP breakpoint narrative** — see [Android version matrix § Android 15](../android-lifecycle/03-android-version-matrix.md#android-15-breakpoint).

The "Applies to Android 15+" tag at the top of this H2 covers all 3 pathways as sub-claims of one Android 15 assertion; per-pathway version tags are not required.

<a id="what-breaks"></a>
## What-breaks summary

Inline what-breaks callouts appear at each decision point throughout this guide. Severity-descending umbrella reference (use this as a quick navigation index):

| Misconfiguration | Section | Severity |
|---|---|---|
| Exit-kiosk PIN configured in only one of the two policies | [Exit-kiosk PIN synchronization](#exit-kiosk-pin-synchronization) | CRITICAL |
| EFRP not assigned before Android 15 recovery/bootloader reset | [Android 15 FRP and re-provisioning](#android-15-frp-reprovisioning) | CRITICAL |
| KME + ZT dual-configured on Samsung | [Provisioning method choice — Zero-Touch](#provisioning-method-choice) | CRITICAL |
| Wrong token type for Entra shared device mode scenario | [Enrollment profile — Delta 1](#enrollment-profile) | HIGH |
| Dynamic device group used with Dedicated standard token | [Enrollment profile — Delta 2](#enrollment-profile) | HIGH |
| MHS app not assigned as Required (multi-app/signage) | [Enrollment profile — Delta 3](#enrollment-profile) | HIGH |
| QR artifact stale after token rotation | [Enrollment profile — Delta 4](#enrollment-profile) | HIGH |
| MGP binding lapsed | [Prerequisites](#prerequisites) | HIGH |
| Token assigned to wrong group | [Enrollment token](#enrollment-token) | HIGH |
| Required system apps not re-enabled (afw#setup) | [Provisioning method choice — afw#setup](#provisioning-method-choice) | MEDIUM |
| NFC tag payload exceeds 888 bytes | [Provisioning method choice — NFC](#provisioning-method-choice) | MEDIUM |
| ZT device connects to captive-portal Wi-Fi | [Provisioning method choice — Zero-Touch](#provisioning-method-choice) | MEDIUM |

<a id="renewal-maintenance"></a>
## Renewal / Maintenance

| Component | Renewal Period | Consequence of Lapse | Renewal Steps |
|-----------|----------------|----------------------|---------------|
| MGP binding | No expiry while the bound Entra account remains active | New app approvals (including MHS updates) and app distribution stop for enrolled devices | Re-bind via Intune admin center — see [01-managed-google-play.md#bind-mgp](01-managed-google-play.md#bind-mgp) |
| Dedicated enrollment token (Standard) | Mandatory expiry date set at creation; configurable up to 65 years | New enrollments using the token fail at token-exchange; already-enrolled devices unaffected | Generate new token; redistribute via current provisioning channel (regenerate QR / rewrite NFC / update DPC extras JSON). Plan rotation BEFORE printing/laminating QR artifacts |
| Dedicated enrollment token (Entra shared device mode) | Mandatory expiry date set at creation; configurable up to 65 years | Same as Standard; plus user sign-in workflow blocked for Entra shared device mode scenarios | Same as Standard |
| MHS app config policy (multi-app + signage) | Review quarterly or after Microsoft Intune app updates that may shift `com.microsoft.launcher.enterprise` defaults | Configuration drift — exit-kiosk PIN may un-sync if device restrictions PIN is rotated without updating MHS PIN | Audit both policies; redeploy if drift detected |
| EFRP policy assignment (Android 15 fleets) | Review every 60 days (matches this guide's review_by cadence) | EFRP drift → recovery-reset devices may lock | Audit Device Restrictions profile assignment scoped to Dedicated devices; verify allowlist still covers fleet's Google accounts. See [Phase 36 EFRP configuration](03-fully-managed-cobo.md#configure-efrp) |
| ZT reseller contract (if using Zero-Touch) | Reseller-specific, typically annual | New device IMEI/serial uploads stop appearing in ZT portal | Contact reseller; see [02-zero-touch-portal.md#step-0-reseller](02-zero-touch-portal.md#step-0-reseller) |

**Rotation cadence:** Dedicated tokens have NO "never expires" option — plan rotation to align with operational refresh windows. MHS app config — re-validate exit-kiosk PIN sync after every device-restrictions PIN change. EFRP — audit assignment every 60-day cycle. MGP binding — verify the bound Entra account each 60-day cycle.

## For L1 helpdesk agents

Per PITFALL 7 and the v1.4 Phase 40 triage tree boundary: **this section does NOT contain L1-executable steps for Dedicated devices.** Dedicated-device failures route to L2 or to the LOB Operations Owner (app-side / device-side issues L1 cannot resolve without Intune admin or business-owner escalation).

L1 agents: confirm the device is Dedicated mode using the Phase 40 Android triage tree (when shipped). If Dedicated, route to L2 or to the LOB Operations Owner (see [Audience and stakeholders](#audience-and-stakeholders)).

## See Also

- [Android Enterprise Admin Setup Overview](00-overview.md)
- [Managed Google Play Binding](01-managed-google-play.md) — MGP binding prerequisite
- [Zero-Touch Portal Configuration](02-zero-touch-portal.md) — Zero-Touch portal prerequisite for ZTE provisioning method
- [Fully Managed (COBO) Admin Setup](03-fully-managed-cobo.md) — Phase 36 canonical enrollment-profile and EFRP steps
- [BYOD Work Profile Admin Setup](04-byod-work-profile.md) — BYOD Work Profile guide
- [Android Provisioning Methods](../android-lifecycle/02-provisioning-methods.md) — full 5×4 method-availability matrix
- [Android Version Matrix](../android-lifecycle/03-android-version-matrix.md) — version breakpoints including Android 15
- [Android Enterprise Provisioning Glossary — Dedicated](../_glossary-android.md#dedicated)
- [Android Enterprise Provisioning Glossary — Managed Home Screen](../_glossary-android.md#managed-home-screen)
- [Android Enterprise Provisioning Glossary — Entra Shared Device Mode](../_glossary-android.md#entra-shared-device-mode)
- [Android Enterprise Provisioning Glossary — Play Integrity](../_glossary-android.md#play-integrity)

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-04-22 | Initial version — Dedicated (kiosk/COSU) admin guide: persona callout (D-01), 4-scenario overview (D-01 + D-13 + D-14), enrollment-profile deltas via D-03 hybrid, MHS exit-PIN synchronization H2 (D-02 / AEDED-02), Android 15 FRP and re-provisioning H2 (D-04 / AEDED-03), tri-portal provisioning methods with KME/ZT callout (D-11) and Phase 39 boundary note (D-15) | -- |

