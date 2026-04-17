---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: user-enrollment
audience: admin
platform: iOS
---

> **Platform gate:** This guide covers iOS/iPadOS account-driven User Enrollment (privacy-preserving BYOD).
> For corporate ADE setup, see [iOS/iPadOS Admin Setup Overview](00-overview.md).
> For iOS/iPadOS enrollment terminology, see the [Apple Provisioning Glossary](../_glossary-macos.md).
> Portal navigation may vary by Intune admin center version. See [Overview](00-overview.md#portal-navigation-note) for details.

# iOS/iPadOS Account-Driven User Enrollment

Account-driven User Enrollment is Apple's privacy-preserving iOS/iPadOS enrollment path for personally-owned devices. IT manages work apps and data within a managed APFS volume on the device; personal apps, personal data, and device-level attributes remain outside Intune's management scope. This guide covers admin prerequisites, enrollment configuration, and the explicit privacy limitations that differentiate User Enrollment from other enrollment paths. Both admins configuring the tenant and end users enrolling their devices benefit from reading the Privacy Boundaries summary below; per-capability privacy callouts appear at each capability's discussion point throughout the guide.

## Key Concepts Before You Begin

### Managed Apple ID vs Personal Apple ID

Account-driven User Enrollment uses a **Managed Apple ID** (sometimes branded "Managed Apple Account" in Apple's 2024+ documentation; Microsoft Intune documentation continues to use "Managed Apple ID") that is created and governed by the organization, not the end user. The Managed Apple ID is distinct from the user's personal Apple ID in four ways:

- **Created by** — Managed Apple IDs are created in Apple Business Manager (ABM) or federated from Microsoft Entra ID; personal Apple IDs are created by the end user at appleid.apple.com.
- **Scope** — The Managed Apple ID signs into the managed APFS volume on the device and receives enrollment work context; the personal Apple ID remains signed into the primary device context for personal apps and iCloud.
- **Data separation** — The two Apple IDs are isolated on the device; work data stays in the managed volume and does not sync to the personal iCloud.
- **Revocation** — Administrators can revoke a Managed Apple ID from ABM or Entra to terminate the user's access to the managed volume; the personal Apple ID is unaffected.

Confusing the two identities is the most common configuration error in account-driven User Enrollment. Users signing in with their personal Apple ID during enrollment will be rejected — Managed Apple ID is required.

### Privacy Boundaries on User Enrollment

Account-driven User Enrollment preserves end-user privacy by scoping Intune management to the managed APFS volume only. The following privacy boundaries apply to every device enrolled via account-driven User Enrollment, and each boundary is repeated as an inline callout at the relevant capability section below so deep-link readers (for example, from L1 runbooks that link directly to a specific section) are not dependent on reading this summary.

- **Hardware identifiers are not collected.** Intune does not collect UDID, serial number, or IMEI from User Enrollment devices.
- **No device-level wipe is available.** The only wipe scope on User Enrollment is selective wipe of the managed APFS volume. The personal side of the device is untouched by any Intune action.
- **Personal apps and data are not inventoried.** Intune sees only managed apps inside the managed volume. Personal apps installed by the end user — and data within them — are outside Intune's visibility.
- **No location tracking.** MDM location commands are not available on User Enrollment.
- **No full-device passcode enforcement.** Passcode compliance policies apply only to the managed content; Intune cannot enforce a passcode on the primary device context.
- **Per-app VPN only.** System-wide VPN is not available; only per-app VPN scoped to managed apps.
- **Managed APFS volume separation.** The device maintains a cryptographically separate APFS volume for work content; personal content is isolated and unreachable by Intune.

For the conceptual definition of User Enrollment and how Apple implements the managed APFS volume boundary, see [iOS/iPadOS Enrollment Path Overview § User Enrollment](../ios-lifecycle/00-enrollment-overview.md#user-enrollment).

## Prerequisites

Admin prerequisites for account-driven User Enrollment:

- **Managed Apple ID** for each enrolling user — Created in Apple Business Manager (ABM) or federated from Microsoft Entra ID. (Apple rebranded as "Managed Apple Account" in 2024; Microsoft Intune documentation continues to use "Managed Apple ID".) See [iOS/iPadOS Enrollment Path Overview § User Enrollment](../ios-lifecycle/00-enrollment-overview.md#user-enrollment) for conceptual context.
- **Service Discovery setup** — The organization hosts a `.well-known/com.apple.remotemanagement` JSON resource on a web server corresponding to the email domain of the Managed Apple ID. Verify current hosting requirements against Microsoft Learn `apple-account-driven-user-enrollment` at time of writing. Note: on iOS 18.2+ devices linked to ABM, Apple provides an alternate discovery path — service-discovery file hosting is no longer mandatory on these devices.
- **Microsoft Entra work account** — Each enrolling user has a Microsoft Entra work account with Intune license assigned; JIT (Just-In-Time) registration flows the work account through during enrollment.
- **Microsoft Authenticator** — Assigned as a required app to enrolling user groups; handles the work-account authentication during enrollment.
- **iOS/iPadOS 15.0 or later** — Account-driven User Enrollment is not available on iOS 14 or earlier. (Verify current version baseline against Microsoft Learn at time of writing.)
- **APNs certificate configured and active** — Same APNs certificate serves ADE, Device Enrollment, and User Enrollment. See [APNs Certificate Guide](01-apns-certificate.md).
- **Intune Administrator role** — Or a custom RBAC role with enrollment management permissions.
- **Tenant enrollment restrictions reviewed** — See [iOS/iPadOS Admin Setup Overview § Intune Enrollment Restrictions](00-overview.md#intune-enrollment-restrictions). Account-driven User Enrollment is subject to the tenant-level enrollment-type-blocking policy.

> **Research-flag note for admins deploying to devices running iOS 15.5 or iOS 15.7–16.3:** Microsoft Learn documents MFA limitations on User Enrollment on these iOS versions (iOS 15.5 cannot enroll with any MFA on the same device; iOS 15.7–16.3 cannot enroll with MFA via text, phone-call is required). These limitations are documented as current guidance despite iOS 18 shipping. Verify current status against Microsoft Learn `ios-user-enrollment-supported-actions` before assuming these apply to your fleet.
