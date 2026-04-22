---
last_verified: 2026-04-22
review_by: 2026-06-21
audience: admin
platform: Android
applies_to: BYOD
---

> **Platform gate:** This guide covers Android Enterprise BYOD (personally-owned) Work Profile enrollment through Microsoft Intune, including enrollment restrictions, work profile policy, data transfer controls, privacy boundary table, Wi-Fi certificate-based authentication, the management app change (Company Portal → Microsoft Intune app), and the AMAPI migration callout (April 2025).
> For corporate-owned Fully Managed (COBO) enrollment, see [03-fully-managed-cobo.md](03-fully-managed-cobo.md#key-concepts).
> For iOS/iPadOS admin setup, see [iOS Admin Guides](../admin-setup-ios/00-overview.md).
> For macOS admin setup, see [macOS Admin Guides](../admin-setup-macos/00-overview.md).
> For Android provisioning terminology, see the [Android Enterprise Provisioning Glossary](../_glossary-android.md).

# BYOD Work Profile — Admin Setup

> ⚠️ This guide covers post-AMAPI-migration BYOD Work Profile (April 2025). See [## AMAPI Migration](#amapi-migration) for the three behavioral changes (custom OMA-URI removal, Wi-Fi certificate authentication requirement, management app change from Company Portal to Microsoft Intune app). Pre-April-2025 guidance does not apply.

**How to use:** Intune administrators read linearly. End users enrolling personal devices should read [docs/end-user-guides/android-work-profile-setup.md](../end-user-guides/android-work-profile-setup.md). L1 Service Desk and L2 Desktop Engineering use the Phase 40 and Phase 41 runbooks.

<a id="key-concepts"></a>
## Key Concepts

### Work profile is a personal partition

On BYOD Work Profile (also known as 'personally-owned work profile' in Google terminology), the managed work profile is a separate partition on a personal device. Work apps, work data, work certificates, and work policies live inside this partition; personal apps, personal data, personal contacts, and personal browser history live outside it. The Android OS enforces the boundary between the two partitions at the kernel level. See [BYOD](../_glossary-android.md#byod) and [Work Profile](../_glossary-android.md#work-profile) for authoritative definitions.

> **Cross-platform note:** BYOD Work Profile is the closest Android analog to iOS Account-Driven User Enrollment, but the mapping is partial — iOS User Enrollment uses a managed APFS volume and Managed Apple ID; Android uses a work-profile partition and the user's existing Google account. See [BYOD](../_glossary-android.md#byod) for the full framing.

### Tier inversion: the user enrolls the device

BYOD enrollment is user-initiated from the personal device (tier inversion). The admin configures policy in Intune; the user installs Company Portal (primary path) or visits a web enrollment URL (post-AMAPI opt-in path, Q1 2026) to trigger work-profile creation. There is no admin-side enrollment token to distribute or rotate for BYOD (contrast with COBO — see [03-fully-managed-cobo.md#key-concepts](03-fully-managed-cobo.md#key-concepts)).

### Terminology

- **BYOD Work Profile** — personally-owned device with a work-profile partition. Shorthand: "BYOD" or "work profile" in this guide after first use.
- **AMAPI** — Android Management API, Google's modern policy surface that Intune migrated BYOD onto in April 2025. See [AMAPI](../_glossary-android.md#amapi).
- **Company Portal** (`com.microsoft.windowsintune.companyportal`) — the primary enrollment app today; post-AMAPI role is MAM-only.
- **Microsoft Intune app** (`com.microsoft.intune`) — post-AMAPI primary management app on enrolled BYOD devices.
- **Android Device Policy** — Google-provided hidden DPC enforcing AMAPI policies; not user-interactive.

<a id="amapi-migration"></a>
## AMAPI Migration (April 2025)

In April 2025, Microsoft migrated BYOD Work Profile management from the legacy Device Policy Controller (DPC) surface to the Android Management API (AMAPI). This migration introduced four behavioral changes that every Intune administrator managing BYOD must understand. See [AMAPI](../_glossary-android.md#amapi) for the technical definition.

**1. Custom OMA-URI profile removal**

Prior to April 2025, BYOD Work Profile policy could be configured via custom OMA-URI profiles in Intune. Microsoft removed this path for BYOD Work Profile in April 2025; custom OMA-URI profiles no longer apply to personally-owned work profile devices. Use the standard Android Enterprise (work profile) device configuration profiles in Intune admin center instead. Continuing to rely on custom OMA-URI profiles post-migration results in policies that are silently not enforced on enrolled devices. [HIGH: MS Learn custom-profiles-ending, last_verified 2026-04-22]

**2. Wi-Fi certificate-based authentication required**

Post-AMAPI migration, Wi-Fi profiles using username/password authentication (EAP-TTLS with PAP/MS-CHAP/MS-CHAPv2, or PEAP with MS-CHAPv2) are not reliable on BYOD work profile devices. Devices using username/password Wi-Fi authentication will lose access to corporate Wi-Fi until they sign in again. [MEDIUM: techcommunity blog 4370417, last_verified 2026-04-22] Use certificate-based authentication: EAP-TLS with a SCEP or PKCS client certificate is the recommended configuration. See [Wi-Fi policy (certificate authentication)](#wifi-cert-auth) below for configuration steps. [HIGH: MS Learn ref-wifi-settings-android-enterprise, last_verified 2026-04-22]

**3. Management app change (Company Portal → Microsoft Intune app)**

Prior to April 2025, Company Portal (`com.microsoft.windowsintune.companyportal`) was the primary BYOD management app. Post-AMAPI, the Microsoft Intune app (`com.microsoft.intune`) is the primary management surface — users manage their enrollment, contact IT, and collect logs in the Intune app. Company Portal remains installed for Intune app protection (MAM) purposes. Android Device Policy installs in a hidden state and enforces AMAPI policies at the OS level; users do not interact with it directly. [MEDIUM: techcommunity blog 4370417, last_verified 2026-04-22] See [Management app](#management-app-change) below. [HIGH: MS Learn connect-managed-google-play, last_verified 2026-04-22]

**4. Web enrollment path (Q1 2026 opt-in)**

AMAPI introduces a web-based enrollment path: users can initiate BYOD work profile enrollment via a URL (`https://enterprise.google.com/android/enroll?et=<enrollmentToken>`) rather than installing Company Portal first. As of Q1 2026, web enrollment is available as an administrator opt-in; mandatory migration is planned but not yet dated. The techcommunity announcement describes three entry points: direct URL, productivity app via Conditional Access redirect, or Company Portal. [MEDIUM: techcommunity blog 4370417, last_verified 2026-04-22]

Web enrollment requires Android 10+; the legacy Company Portal path remains available for Android 8–9. [MEDIUM: techcommunity blog 4370417, last_verified 2026-04-22] See [03-android-version-matrix.md#byod](../android-lifecycle/03-android-version-matrix.md#byod) for the full minimum-OS record. [HIGH: MS Learn, last_verified 2026-04-22]

> **What breaks if misconfigured:** Admin continues to rely on custom OMA-URI profiles for BYOD policy → policies silently do not apply on post-April-2025 devices; admins observe "policy configured but not enforced" divergence in device state. Recovery: re-author policy using the standard Android Enterprise (work profile) device configuration profile surface.

<a id="prerequisites"></a>
## Prerequisites

**Hard prerequisites:**

- [ ] **Microsoft Intune Plan 1+** with the Intune Administrator role (or a role with the "Enrollment restrictions" and "Android configuration" permissions). [HIGH: MS Learn, last_verified 2026-04-22]
- [ ] **Managed Google Play (MGP) binding complete** — Entra account preferred since August 2024. See [01-managed-google-play.md#bind-mgp](01-managed-google-play.md#bind-mgp), [01-managed-google-play.md#account-types](01-managed-google-play.md#account-types), and [01-managed-google-play.md#disconnect-consequences](01-managed-google-play.md#disconnect-consequences) for binding mechanics, account-type tradeoffs, and disconnect consequences. [HIGH: MS Learn connect-managed-google-play, last_verified 2026-04-22]
- [ ] **Android Enterprise (work profile) device configuration profile** surface available in Intune admin center (post-AMAPI replacement for custom OMA-URI). [HIGH: MS Learn, last_verified 2026-04-22]
- [ ] **User has a personal device signed into a personal Google account** (BYOD is user-initiated; the admin does not distribute or reset devices).
- [ ] **User's Entra account is licensed for Intune** and assigned the BYOD enrollment profile (work profile policy and compliance policy) via the Intune admin center.

> **What breaks if misconfigured:** MGP binding not complete → Microsoft Intune app and Company Portal cannot be distributed via Managed Google Play; BYOD enrollment stalls at "Installing required apps". Symptom appears in: end-user device during enrollment (apps fail to install from Play Store); Intune admin center (Managed Google Play status shows disconnected). Recovery: re-bind MGP per [01-managed-google-play.md#bind-mgp](01-managed-google-play.md#bind-mgp).

BYOD has no enrollment token — enrollment is user-initiated, not token-distributed. Contrast with COBO; see [03-fully-managed-cobo.md](03-fully-managed-cobo.md).

See [03-android-version-matrix.md#byod](../android-lifecycle/03-android-version-matrix.md#byod) for the BYOD minimum Android version; Android 8+ is the practical Intune minimum, and Android 10+ is required for the AMAPI web enrollment path. [MEDIUM: techcommunity blog 4370417, last_verified 2026-04-22]

<a id="enrollment-restrictions"></a>
## Enrollment restrictions

Enrollment restrictions control which device types and ownership categories can enroll into Intune. For BYOD Work Profile, the relevant restriction is the **Device platform restriction** for Android Enterprise.

**Intune admin center navigation:** **Devices > Enrollment > Android tab > Device platform restriction** [HIGH: MS Learn setup-personal-work-profile, last_verified 2026-04-22]

**Creating a restriction for BYOD:**

1. In the Intune admin center, go to **Devices > Enrollment > Android tab > Device platform restriction**.
2. Create a new restriction (or edit the default restriction for your BYOD user group).
3. Set **Android Enterprise (work profile) — Personally owned**: **Allow**.
4. Set **Android Enterprise (fully managed) — Personally owned**: **Block** (prevents users in the BYOD group from accidentally enrolling as Fully Managed).
5. Assign the restriction to the Entra group of BYOD-eligible users.

**Recommended BYOD policy:** Allow `Android Enterprise (work profile)` + Allow `Personally owned`. Block `Android Enterprise (fully managed)` for BYOD user groups so users cannot accidentally enroll the wrong mode.

> **What breaks if misconfigured:** Personal Android not blocked when the organization requires work-profile-only enrollment → users inadvertently enroll as BYOD via their personal Gmail account with no policy applied. Symptom appears in: Intune admin center Devices list (device registered but no policy assigned). Recovery: edit the enrollment restriction to block Personally owned for non-BYOD-eligible users, then advise affected users to re-enroll via Company Portal.

<a id="work-profile-policy"></a>
## Work profile policy

The work profile policy (Android Enterprise device restrictions) governs what the managed work profile container can and cannot do on a personally-owned device.

**Intune admin center navigation:** **Devices > Configuration > Create > Android Enterprise > Device restrictions > Personally owned work profile** [HIGH: MS Learn device-restrictions-android-for-work, last_verified 2026-04-22]

**What the policy controls (high-level):**

- Work profile password requirements (complexity, length, maximum sign-in failures)
- Data sharing between profiles (see [Data transfer controls](#data-transfer-controls) below for the 6-direction breakdown)
- Work profile wipe conditions (wipe work profile on device lock or lost device)
- Play Store app visibility within the work profile
- Chrome and browser policy within the work profile
- Screen capture in the work profile

**Key settings:**

- **Work profile password complexity and length** — set minimum complexity and length for the work-profile PIN/password separate from the device unlock.
- **Block screen capture in work profile** — prevents screenshots of work app content.
- **Copy/paste between profiles** — see [Data transfer controls](#data-transfer-controls) for per-direction configuration.
- **Require Play Integrity verdict** — options: Basic + Device integrity or Strong integrity. [HIGH: MS Learn, last_verified 2026-04-22] The Intune compliance policy surface uses Play Integrity only; the older attestation API (deprecated January 2025) no longer appears in current Intune policy blades.

**Assignment:** Assign the policy to the Entra group of BYOD-enrolled users. The policy must be scoped to the same group as the enrollment restriction.

> **What breaks if misconfigured:** Work profile policy assigned to a group that excludes the BYOD-enrolled user population → enrollment succeeds but no policy applies; compliance evaluation reports "policy not assigned". Symptom appears in: Intune admin center (Devices > [device] > Configuration). Recovery: re-scope the policy assignment to the Entra group receiving the enrollment restriction.
