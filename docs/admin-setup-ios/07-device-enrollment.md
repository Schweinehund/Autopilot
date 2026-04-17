---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: device-enrollment
audience: admin
platform: iOS
---

> **Platform gate:** This guide covers iOS/iPadOS Device Enrollment via Intune (no ABM required).
> For corporate ADE setup, see [iOS/iPadOS Admin Setup Overview](00-overview.md).
> For iOS/iPadOS enrollment terminology, see the [Apple Provisioning Glossary](../_glossary-macos.md).
> Portal navigation may vary by Intune admin center version. See [Overview](00-overview.md#portal-navigation-note) for details.

# iOS/iPadOS Device Enrollment

Device Enrollment is Intune's non-ABM enrollment path for iOS/iPadOS devices. Users initiate enrollment themselves — either by downloading the Intune Company Portal app or by visiting a web-based enrollment URL — and the resulting enrolled device runs in unsupervised mode with the full Intune MDM management capability set minus supervised-only features. Device Enrollment covers both personal-owned BYOD devices and corporate-owned devices that did not come through Apple Business Manager.

## Capabilities Available Without Supervision

Use this table to answer "can I do X on a Device-Enrollment-enrolled iOS/iPadOS device?" in under 30 seconds. This guide's enrolled devices are unsupervised; capabilities marked **Yes** are available, **No** requires corporate ADE (see [ADE Enrollment Profile](03-ade-enrollment-profile.md)).

| Capability | Available on Device Enrollment (unsupervised)? | Notes |
|-----------|:---:|------|
| MDM configuration profiles (Wi-Fi, VPN, email, certificates, general device restrictions) | Yes | Settings not flagged supervised-only apply on Device-Enrollment-enrolled devices. See [Configuration Profiles](04-configuration-profiles.md). |
| Compliance evaluation (OS version, passcode, jailbreak, account protection) | Yes | All compliance policies evaluate on unsupervised enrollment. See [Compliance Policies](06-compliance-policy.md). |
| Conditional Access enforcement via Intune compliance state | Yes | CA treats Device Enrollment devices identically to ADE devices once a compliance record exists. |
| VPP user-licensed app deployment | Yes | User accepts the VPP invitation by signing in with a personal Apple Account; app installs after acceptance. |
| VPP device-licensed app deployment | Yes | No Apple Account prompt; the user sees a one-time install confirmation rather than a fully silent install. |
| LOB (.ipa) app deployment | Yes | Enterprise-signed apps deploy on supervised and unsupervised devices; the user sees a one-time install confirmation. |
| Store apps (without VPP) | Yes | Requires the user's personal Apple Account; paid apps require prior user-side purchase. |
| Remote device lock and passcode clear (MDM commands) | Yes | Standard unsupervised MDM commands. |
| Remote device wipe (full device, MDM RemoteWipe) | Yes (Corporate devices) / Retire only (Personal devices) | Personal-owned devices receive retire/selective-wipe scope; Corporate-owned devices can receive full-device wipe. See [Personal vs Corporate Ownership](#personal-vs-corporate-ownership). |
| Personal vs Corporate ownership flag | Yes | Default is Personal for Device Enrollment; reclassify via device identifier upload or Microsoft Graph. See [Personal vs Corporate Ownership](#personal-vs-corporate-ownership). |
| Silent app installation (no user consent) | **No** | ADE-only capability — see [ADE Enrollment Profile](03-ade-enrollment-profile.md). |
| OS update enforcement (forced install deadlines via DDM or device restrictions) | **No** | Supervised-only in iOS 17+ enforcement policies. |
| Supervised-only restrictions (block App Store, disable iCloud Backup, disable Find My, home-screen layout enforcement, etc.) | **No** | Category-level supervised-only settings do not apply. See [ADE Enrollment Profile](03-ade-enrollment-profile.md) for the supervised-only capability set. |
| Activation Lock bypass | **No** | Requires supervised mode. |
| Lost Mode | **No** | Supervised-only MDM command. |
| Single App Mode / kiosk configurations | **No** | Supervised-only; kiosk deployments require ADE with supervised enrollment. |
| Await final configuration (hold device at Setup Assistant until policies apply) | **No** | ADE-profile-specific; not applicable to user-initiated Device Enrollment flows. |

For the complete supervised/unsupervised capability comparison across all enrollment paths, see [iOS/iPadOS Enrollment Path Overview § Supervision](../ios-lifecycle/00-enrollment-overview.md#supervision).

## Key Concepts Before You Begin

### Company Portal vs Web-Based Enrollment

iOS/iPadOS Device Enrollment has two user-initiated flows. Both produce the same unsupervised managed-device end-state and the same capability set. They differ in how the user starts enrollment and what the user experience looks like.

- **Company Portal enrollment** — User installs the Intune Company Portal app from the App Store, signs in with their work account, and follows the in-app prompts. Suitable for tenants that want a branded enrollment experience and plan to use Company Portal for ongoing app discovery.
- **Web-based enrollment** — User visits a tenant-specific enrollment URL in Safari, signs in, and downloads the management profile. Suitable for tenants that do not require the Company Portal app or prefer a lighter-weight end-user experience.

Choose one flow per enrollment campaign or let end users choose — both are supported simultaneously.

### Tenant-Level Enrollment Restrictions Apply

Intune enrollment restrictions (platform filtering, ownership flag, per-user device limits, and enrollment-type blocking) apply tenant-wide across Device Enrollment and all other enrollment paths. See [iOS/iPadOS Admin Setup Overview § Intune Enrollment Restrictions](00-overview.md#intune-enrollment-restrictions) for restriction configuration. Restrictions are NOT duplicated in this guide.
