---
last_verified: 2026-06-22
review_by: 2026-09-22
applies_to: ADE
audience: admin
platform: macOS
---

> **Platform gate:** This guide covers macOS Kerberos SSO extension configuration via Intune Custom Template (.mobileconfig) for PSSO-integrated deployments.
> For Platform SSO setup (prerequisite), see [Platform SSO Setup](07-platform-sso-setup.md).
> For macOS provisioning terminology, see the [macOS Glossary](../_glossary-macos.md).

# macOS Kerberos SSO Extension

This guide walks an Intune administrator through deploying the Apple Kerberos SSO extension (`com.apple.AppSSOKerberos.KerberosExtension`) via Intune Custom Template (.mobileconfig) for on-premises Active Directory Kerberos authentication, integrated with Platform SSO TGT sharing.

---

## What This Guide Is NOT

> **Terminology Trap -- Three SSO features share the same `com.apple.extensiblesso` payload type but serve distinct purposes:**
>
> Configuring the wrong extension identifier or payload type produces a silently broken profile. Read the table below before proceeding.

| Term | What It Is | Configuration Surface |
|------|-----------|----------------------|
| **Apple Kerberos SSO extension** | Apple-native extension -- NOT a Microsoft extension. Identifier: `com.apple.AppSSOKerberos.KerberosExtension`, Type: `Credential`. Handles on-premises Active Directory Kerberos TGT acquisition only. Does NOT handle Entra ID authentication. Not shipped by Microsoft. | Intune **Custom Template** (.mobileconfig upload); separate profile from PSSO |
| **Platform SSO (PSSO)** | Microsoft sub-feature (Company Portal). Identifier: `com.microsoft.CompanyPortalMac.ssoextension`, Type: `Redirect`. Provides Entra ID device registration, login binding, and hardware-bound PRT. Does NOT handle on-prem Kerberos TGT acquisition directly. | Intune **Settings Catalog** only (`com.apple.extensiblesso` payload) |
| **Microsoft Enterprise SSO plug-in** | Microsoft umbrella product delivered via Company Portal -- contains Platform SSO (modern) and the legacy SSO app extension. Type: `Redirect`. Handles Entra ID SSO across apps and browsers. The Kerberos extension is a separate, coexisting Apple-native extension -- not part of this product. | Delivered automatically via Company Portal; see [Enterprise SSO Plug-in & Migration Guide](09-enterprise-sso-plugin-migration.md) |

**Key distinctions for this guide:**
- The Kerberos SSO extension (`com.apple.AppSSOKerberos.KerberosExtension`) does **NOT** handle Entra ID authentication -- that is the PSSO extension's role.
- The Kerberos SSO extension is **NOT** shipped or owned by Microsoft -- it is an Apple-native, Apple-built extension.
- Using the PSSO identifier (`com.microsoft.CompanyPortalMac.ssoextension`) in the Kerberos profile is the most common configuration error -- see [K-1 callout](#k-1-wrong-extension-identifier) below.
- Using `Type: Redirect` (the PSSO value) instead of `Type: Credential` in the Kerberos profile causes silent TGT acquisition failure -- see [K-5 callout](#k-5-wrong-payload-type) below.
