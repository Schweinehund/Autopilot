---
last_verified: 2026-04-23
review_by: 2026-06-22
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

**How to use:** Intune administrators read linearly. End users enrolling personal devices should read [docs/end-user-guides/android-work-profile-setup.md](../end-user-guides/android-work-profile-setup.md). L1 Service Desk uses the [Android L1 Runbooks](../l1-runbooks/00-index.md#android-l1-runbooks) (Phase 40, now shipped): [22: Enrollment Blocked](../l1-runbooks/22-android-enrollment-blocked.md), [23: Work Profile Not Created](../l1-runbooks/23-android-work-profile-not-created.md), [24: Device Not Enrolled](../l1-runbooks/24-android-device-not-enrolled.md), [25: Compliance Blocked](../l1-runbooks/25-android-compliance-blocked.md), [26: MGP App Not Installed](../l1-runbooks/26-android-mgp-app-not-installed.md). L2 Desktop Engineering uses the Android L2 investigation runbooks (Phase 41 — not yet shipped).

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

<a id="data-transfer-controls"></a>
## Data transfer controls

Data transfer controls govern whether information (clipboard content, contacts, calendar events) can move between the work profile partition and the personal profile partition. This is one of the most security-sensitive configuration areas in BYOD Work Profile deployments.

The Intune UI exposes these 6 logical directions through 3 combined-direction settings. Each row below names the actual Intune UI toggle that governs it. Calendar-direction is governed by the "Data sharing between work and personal profiles" setting; there is no separate calendar toggle in the BYOD work profile policy blade. [MEDIUM: MS Learn device-restrictions-android-for-work, last_verified 2026-04-22]

| Direction | Intune Setting | Admin default | Recommended for BYOD | What breaks if misconfigured |
|-----------|---------------|--------------|----------------------|------------------------------|
| <a id="clipboard-work-to-personal"></a> Clipboard: work → personal | "Copy and paste between work and personal profiles" (bidirectional toggle) | Not configured (allowed) | Block | Users can copy sensitive work-app content (emails, customer records) into personal apps (SMS, personal email, browser). Applies to Android 8.0+; AMAPI post-April-2025. |
| <a id="clipboard-personal-to-work"></a> Clipboard: personal → work | "Copy and paste between work and personal profiles" (same toggle as row above) | Not configured (allowed) | Block | Users can paste personal content (passwords, private messages) into work apps, creating exfiltration and compliance issues on shared work documents. Applies to Android 8.0+; AMAPI post-April-2025. |
| <a id="contacts-work-to-personal"></a> Contacts: work → personal | "Display work contact caller-id in personal profile" + "Data sharing between work and personal profiles" | Not configured (caller ID shown; data sharing: device default — work→personal blocked) | Block caller-id display; keep data sharing at device default (which blocks work→personal) | Work contacts appear in personal apps (caller ID, share sheets), exposing client identity to personal-app ecosystem. Applies to Android 8.0+; AMAPI post-April-2025. |
| <a id="contacts-personal-to-work"></a> Contacts: personal → work | "Search work contacts from personal profile" | Not configured (search allowed) | Admin discretion (block for sensitive deployments; allow for convenience) | Personal contacts appear in work app search results, mixing personal relationships into corporate CRM queries. Applies to Android 8.0+; AMAPI post-April-2025. |
| <a id="calendar-work-to-personal"></a> Calendar: work → personal | "Data sharing between work and personal profiles" (no separate calendar toggle) [MEDIUM: MS Learn device-restrictions-android-for-work, last_verified 2026-04-22] | Device default (work→personal blocked) | Keep device default | Work calendar events (meeting titles, attendees, confidential agenda) appear in personal calendar apps. Applies to Android 8.0+; AMAPI post-April-2025. |
| <a id="calendar-personal-to-work"></a> Calendar: personal → work | "Data sharing between work and personal profiles" (same setting as calendar work→personal row) | Device default (personal→work allowed) | Admin discretion | Personal appointments (medical, family) appear in work calendar, exposed to colleagues via free/busy. Applies to Android 8.0+; AMAPI post-April-2025. |

**Note:** The "Copy and paste between work and personal profiles" toggle is bidirectional — configuring it blocks both directions simultaneously. If your policy requires asymmetric clipboard control (block work→personal but allow personal→work), use the Android Enterprise device restrictions compliance note approach and document the limitation in your security runbook.

<a id="privacy-boundary"></a>
## Privacy boundary

Android enforces the work-profile/personal-profile boundary at the OS level. The table below is the canonical record of what Intune CAN see (work profile side) versus what Intune CANNOT see (personal side) on a personally-owned BYOD device. The separation is enforced by the Android kernel — Intune does not have a configuration option to see personal-side data even if an administrator wanted to.

For comparison with corporate-owned Fully Managed (COBO) where the entire device is managed, see [03-fully-managed-cobo.md#key-concepts](03-fully-managed-cobo.md#key-concepts).

The end-user guide [docs/end-user-guides/android-work-profile-setup.md](../end-user-guides/android-work-profile-setup.md) mirrors this table in plain language.

| Data category | Admin CAN see | Admin CANNOT see | Why (privacy mechanism) |
|---------------|---------------|------------------|------------------------|
| Managed app inventory | Work profile apps, versions, configurations | Personal apps installed on the device | Android OS restricts app-inventory MDM API to the managed profile. [HIGH: Google Android Enterprise Help, last_verified 2026-04-22] |
| Device compliance state | Full compliance evaluation (PIN set, OS version, Play Integrity verdict, root detection) | — | MDM compliance policy evaluates device and work-profile state. [HIGH: MS Learn, last_verified 2026-04-22] |
| Work profile data | Work app data, configurations, certificates, work VPN state, work Wi-Fi profiles | — | MDM policy scope covers work-profile container. [HIGH: MS Learn, last_verified 2026-04-22] |
| Personal apps | — | Personal app list (which apps are installed on the personal side) | Android OS prevents cross-profile app inventory. [HIGH: Google Android Enterprise Help, last_verified 2026-04-22] |
| Personal data (photos, documents, files) | — | Personal photos, personal documents, personal files on device storage | Personal profile partition isolation at the OS level. [HIGH: Google Android Enterprise Help, last_verified 2026-04-22] |
| Personal call / SMS / browser history | — | Personal call logs, personal SMS messages, personal browser history | Personal profile partition isolation at the OS level. [HIGH: Google Android Enterprise Help, last_verified 2026-04-22] |
| Device location | Work-profile-scoped location (only when a work app requests location) | Personal-side location (user's 24/7 whereabouts via personal apps) | MDM location commands scoped to enrolled profile only. [HIGH: MS Learn MDM capabilities, last_verified 2026-04-22] |

Android 15 introduced "private space" as a personal-side feature; Intune does not manage private space content or visibility, consistent with personal-side isolation. [HIGH: MS Learn setup-personal-work-profile Limitations, last_verified 2026-04-22]

> **What breaks if privacy boundary is misrepresented:** Admins explain BYOD to users with inaccurate visibility claims → trust collapses when users discover the mismatch at deployment or during an audit. Recovery: correct the user-facing messaging (see [docs/end-user-guides/android-work-profile-setup.md](../end-user-guides/android-work-profile-setup.md)).

<a id="wifi-cert-auth"></a>
## Wi-Fi policy (certificate authentication)

> **AMAPI reminder:** See [AMAPI Migration](#amapi-migration) — Wi-Fi profiles using username/password authentication are not reliable on post-April-2025 BYOD devices. Use certificate-based authentication. [MEDIUM: techcommunity blog 4370417, last_verified 2026-04-22]

For BYOD Work Profile, Microsoft Intune supports deploying Wi-Fi profiles to the work profile container. Post-AMAPI, only certificate-based authentication methods are reliable.

**Supported EAP types for personally-owned work profile:** EAP-TLS (recommended), EAP-TTLS, PEAP. [HIGH: MS Learn ref-wifi-settings-android-enterprise, last_verified 2026-04-22]

**Certificate types:** SCEP or PKCS client certificate (both supported). Derived credential is available for EAP-TLS only.

**Subject Alternative Name (SAN) requirement:** For user and device certificates on personally-owned work profile, the certificate's Subject Alternative Name (SAN) MUST include the user principal name (UPN). If the UPN is absent from the SAN, the Wi-Fi profile deployment fails silently — the profile is assigned but the device cannot authenticate. [HIGH: MS Learn ref-wifi-settings-android-enterprise, last_verified 2026-04-22]

**Intune admin center navigation (high-level):** Devices > Configuration > Create > Android Enterprise > Wi-Fi > Personally owned work profile. [MEDIUM: MS Learn, last_verified 2026-04-22]

**Avoid username/password:** EAP-TTLS with PAP/MS-CHAP/MS-CHAPv2 and PEAP with MS-CHAPv2 are listed as options in Intune UI but break on post-AMAPI-enrolled BYOD devices. [MEDIUM: techcommunity blog 4370417, last_verified 2026-04-22]

> **What breaks if misconfigured:** Wi-Fi policy uses username/password authentication → policy deploys successfully in Intune admin center but breaks at user sign-in on device post-AMAPI; users see opaque "authentication failed" errors. Symptom appears in: device Wi-Fi settings (Wi-Fi connects then repeatedly drops or fails to authenticate). Recovery: rebuild the Wi-Fi profile using EAP-TLS with SCEP/PKCS client certificate; SAN must include UPN.

<a id="management-app-change"></a>
## Management app

> **AMAPI reminder:** See [AMAPI Migration](#amapi-migration) — the primary management app changed from Company Portal to the Microsoft Intune app in April 2025. [MEDIUM: techcommunity blog 4370417, last_verified 2026-04-22]

Post-AMAPI, three apps are involved in BYOD Work Profile management. Understanding each app's role is important for both admin configuration and end-user guidance:

| App | Play Store ID | Role (post-AMAPI) | Visibility |
|-----|--------------|-------------------|-----------|
| Microsoft Intune | `com.microsoft.intune` | Primary management UI: device management, IT contact, log collection [MEDIUM: techcommunity blog 4370417, last_verified 2026-04-22] | Visible — installs automatically during enrollment |
| Company Portal | `com.microsoft.windowsintune.companyportal` | MAM (app protection policies) only post-AMAPI [MEDIUM: techcommunity blog 4370417, last_verified 2026-04-22] | Visible — remains installed for MAM |
| Android Device Policy | Google-managed (`com.google.android.apps.work.clouddpc`) | Enforces AMAPI policies at the OS level [HIGH: MS Learn connect-managed-google-play, last_verified 2026-04-22] | Hidden — installed but not visible in user's app list |

End users will see both Company Portal AND Microsoft Intune app installed after enrollment. The end-user guide [docs/end-user-guides/android-work-profile-setup.md](../end-user-guides/android-work-profile-setup.md) covers the user-visible experience.

> **What breaks if misconfigured:** End user instructed to install Company Portal and stop there → MAM works; device management self-service (contact IT, log collection) is not discoverable because the Intune app role has shifted post-AMAPI. Recovery: update end-user guidance to highlight both apps post-AMAPI.

<a id="renewal-maintenance"></a>
## Renewal / Maintenance

| Component | Renewal Period | Consequence of Lapse | Renewal Steps |
|-----------|----------------|----------------------|---------------|
| MGP binding | No expiry while the bound Entra account remains active | New app approvals and app distribution stop for enrolled devices | Re-bind via Intune admin center — see [01-managed-google-play.md#disconnect-consequences](01-managed-google-play.md#disconnect-consequences). [HIGH: MS Learn connect-managed-google-play, last_verified 2026-04-22] |
| Enrollment restriction policy | No expiry; review every 6 months | Stale exclusions / missing new user groups; BYOD-ineligible users can self-enroll | Review scope and update restriction rules in Devices > Enrollment > Android tab. |
| Work profile policy | No expiry; review every 6 months; re-verify after Intune UI updates | New AMAPI settings not applied; deprecated settings silently ignored | Re-open the policy in Intune admin center and save; verify post-AMAPI setting set is current. |
| Wi-Fi SCEP/PKCS certificate | Per certificate template (typically 1–2 years) | Devices lose Wi-Fi access at cert expiry | Ensure SCEP/PKCS profile auto-renews; monitor via Intune reports. [HIGH: MS Learn SCEP, last_verified 2026-04-22] |
| Compliance policy (Play Integrity) | No expiry; review on Play Integrity verdict changes from Google | Stale verdicts; compliance gaps or false denials | Review compliance policy quarterly; re-verify Play Integrity verdict options. |
| Frontmatter `review_by` | 60 days from `last_verified` | Doc may reference stale Intune UI paths or AMAPI status (web enrollment becomes default) | Re-run through MS Learn + techcommunity; update `last_verified` date. |

See also: [00-overview.md](00-overview.md), [01-managed-google-play.md](01-managed-google-play.md), [docs/end-user-guides/android-work-profile-setup.md](../end-user-guides/android-work-profile-setup.md).

## See Also

- [Android Enterprise Admin Setup Overview](00-overview.md)
- [Managed Google Play Binding](01-managed-google-play.md) — MGP binding prerequisite
- [Fully Managed (COBO) Admin Setup](03-fully-managed-cobo.md) — corporate-ownership contrast
- [Android Enterprise Enrollment Overview](../android-lifecycle/00-enrollment-overview.md)
- [Android Provisioning Methods — BYOD filtered row](../android-lifecycle/02-provisioning-methods.md#byod)
- [Android Version Matrix — BYOD](../android-lifecycle/03-android-version-matrix.md#byod)
- [Android Enterprise Provisioning Glossary — BYOD](../_glossary-android.md#byod)
- [Android Enterprise Provisioning Glossary — AMAPI](../_glossary-android.md#amapi)
- [Android Enterprise Provisioning Glossary — Play Integrity](../_glossary-android.md#play-integrity)
- [End-user guide: Android work profile setup](../end-user-guides/android-work-profile-setup.md)

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-04-23 | Resolved Android L1 runbook cross-references | -- |
| 2026-04-22 | Initial version — BYOD Work Profile admin guide: enrollment restrictions, work profile policy, 6-direction data transfer table, privacy boundary canonical table, Wi-Fi certificate authentication, management app post-AMAPI, AMAPI migration callout (April 2025). | -- |
