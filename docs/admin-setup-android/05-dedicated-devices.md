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

This guide walks an Intune administrator and their Line-of-Business Operations Owner counterpart through configuring Android Enterprise Dedicated devices for kiosk and single-purpose deployments: defining the right scenario from among the four Dedicated use cases, creating and operating the enrollment profile, distributing and rotating tokens, selecting the right provisioning method, synchronizing the MHS exit-kiosk PIN across both required policies, and understanding Android 15 FRP behavior when re-provisioning kiosk hardware.

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
- **[Play Integrity](../_glossary-android.md#play-integrity)** — the current Google platform integrity attestation API (replaced SafetyNet in 2024; this guide uses Play Integrity only).
- **[DPC (Device Policy Controller)](../_glossary-android.md#dpc)** — the agent app (Microsoft Intune app) downloaded and executed during provisioning to apply MDM policy to the device.
- **[afw#setup](../_glossary-android.md#afw-setup)** — the DPC identifier typed at the Google sign-in prompt during factory-reset setup to trigger DPC download and Dedicated provisioning.
- **Lock Task Mode** — the Android OS-level mechanism that pins one app to the foreground and prevents user navigation away; Dedicated single-app kiosks use this directly without MHS.

> **Cross-platform note:** Dedicated (COSU) is the closest Android analog to Apple's Shared iPad or Windows Kiosk Mode, but the architectural parallels are imprecise. iOS Shared iPad uses per-user managed Apple IDs stored on-device; Windows Shared PC uses per-user Windows accounts. Android Dedicated uses no per-user identity at the device enrollment layer (except for the Entra shared device mode sub-scenario, which adds per-user Entra sign-in at the app layer, not at device enrollment). See [_glossary-android.md#dedicated](../_glossary-android.md#dedicated) for the authoritative definition and cross-platform framing.

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

**Note (compare with COBO):** Dedicated mode does NOT require the Conditional Access Microsoft-Intune-cloud-app exclusion that COBO's Chrome-tab Entra sign-in requires. Standard Dedicated tokens have no per-user Entra join at the device level. Entra shared device mode requires Entra at the per-user app sign-in layer, not at device enrollment.

> **What breaks if misconfigured:** MGP not bound → MHS app cannot be assigned, multi-app and digital signage scenarios fail at the "Installing required apps" step. Recovery: re-bind MGP per [01-managed-google-play.md#bind-mgp](01-managed-google-play.md#bind-mgp). Symptom appears in: Intune admin center (Managed Google Play status disconnected) and on the device during enrollment (apps fail to install).

<a id="enrollment-profile"></a>
## Enrollment profile

Dedicated profile creation follows the same Intune flow as Fully Managed (COBO) — see [Phase 36 enrollment profile section](03-fully-managed-cobo.md#enrollment-profile) for the canonical step-by-step (Devices → Device onboarding → Enrollment → Android tab → Enrollment Profiles → Corporate-owned dedicated devices). The Dedicated-specific deltas below explain what differs.

[MEDIUM: MS Learn setup-dedicated, last_verified 2026-04-22; Intune unified admin center may rename breadcrumbs]

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

Dedicated tokens require a mandatory expiry date (configurable up to 65 years); there is no "never expires" option for Dedicated tokens, unlike COBO's Default token type which does not expire. [MEDIUM: no MS Learn statement on default; behavior inferred from UI field description, last_verified 2026-04-22]

Token expiry rotation breaks any printed, laminated, or posted QR enrollment artifacts. When rotating tokens, generate a new QR and redistribute to all field locations before retiring the old token. Plan your rotation cadence to align with operational refresh windows — annual refresh batches are common for warehouse or retail kiosk fleets.

Cross-link: see [Phase 36 enrollment token section](03-fully-managed-cobo.md#enrollment-token) for general token lifecycle operations (Replace, Revoke, Export).

> **What breaks if misconfigured:** Printed/laminated QR artifacts expire silently when their underlying token expires; field provisioning succeeds at scan but fails at token-exchange. Recovery: revoke old token, generate new token with longer expiry, regenerate QR image, redistribute to field locations. Prevention: track token expiry dates centrally; rotate before expiry rather than after artifacts fail.

