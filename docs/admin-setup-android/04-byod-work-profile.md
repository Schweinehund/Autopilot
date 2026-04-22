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
