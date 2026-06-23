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

---

## Configuration: On-Premises Active Directory Profile

This section delivers the Intune-admin-facing MDM payload for the Apple Kerberos SSO extension using the Intune Custom Template (.mobileconfig) upload path -- NOT the Settings Catalog picker flow used by Platform SSO guide 07.

### Payload Key-Value Reference

| Key | Value | Required | Notes |
|-----|-------|----------|-------|
| `ExtensionIdentifier` | `com.apple.AppSSOKerberos.KerberosExtension` | Yes | Apple-owned extension. NEVER use the PSSO identifier `com.microsoft.CompanyPortalMac.ssoextension` here (K-1). |
| `TeamIdentifier` | `apple` | Yes | Literal string `apple` -- the word "apple", NOT a numeric Team ID such as the Microsoft Company Portal Team ID. Using a numeric App Store Team ID here is the most common copy-error from guide 07 (Pitfall 1). |
| `Type` | `Credential` | Yes | NOT `Redirect`. Using `Redirect` (the Platform SSO value) causes silent Kerberos TGT acquisition failure (K-5). |
| `PayloadType` | `com.apple.extensiblesso` | Yes | Same payload type as Platform SSO, but the `ExtensionIdentifier` and `Type` values are different -- the extension identity is what routes the payload. |
| `Realm` | `CONTOSO.COM` | Yes | ALL CAPS required -- must match the on-prem AD Kerberos realm canonical name. `contoso.com` (lowercase) will fail to match the realm (Pitfall 6). |
| `Hosts` | `["contoso.com", ".contoso.com"]` | Yes | Both entries required: bare domain AND dot-prefixed wildcard. Omitting `.contoso.com` breaks Kerberos SSO for subdomains (Pitfall 7). |
| `ExtensionData` > `usePlatformSSOTGT` | `<true/>` | Recommended | Enables PSSO TGT sharing so the Kerberos extension reuses TGTs issued by Platform SSO. Requires macOS 14.6+. Has no effect if PSSO is not registered (Pitfall 5). |
| `ExtensionData` > `performKerberosOnly` | `<true/>` | Recommended (PSSO deployments) | Disables password sync and expiration checks when Entra ID owns the password lifecycle (Platform SSO deployment). |
| `ExtensionData` > `syncLocalPassword` | `<false/>` | Recommended (PSSO deployments) | Keep false in PSSO-combined deployments to avoid conflicting password sync. |
| `ExtensionData` > `allowPasswordChange` | `<true/>` | Optional | Permits user-initiated password change via the macOS menu-bar extra. |
| `ExtensionData` > `allowPlatformSSOAuthFallback` | `<true/>` | Optional | Permits fallback to independent Kerberos TGT acquisition if PSSO TGT is unavailable. |
| `ExtensionData` > `pwReqComplexity` | `<true/>` | Optional | Enforces AD password complexity requirements in menu-bar password change flow. |

### Extension Identifier Comparison -- Use This to Avoid K-1

The two SSO extension identifiers are superficially similar (both live in `com.apple.extensiblesso` payloads). Using the wrong one produces a silently broken configuration.

| Extension | Identifier | Type | Owner | Purpose |
|-----------|-----------|------|-------|---------|
| **Apple Kerberos SSO extension** -- USE THIS for Kerberos | `com.apple.AppSSOKerberos.KerberosExtension` | `Credential` | Apple (built-in to macOS) | On-prem AD Kerberos TGT acquisition |
| **Microsoft PSSO extension** -- do NOT use in Kerberos profile | `com.microsoft.CompanyPortalMac.ssoextension` | `Redirect` | Microsoft (Company Portal) | Entra ID device registration + SSO |

> **K-1 -- Wrong Extension Identifier:** Never copy the Microsoft PSSO identifier (`com.microsoft.CompanyPortalMac.ssoextension`) into the Kerberos extension profile. Every Kerberos `ExtensionIdentifier` plist value MUST use `com.apple.AppSSOKerberos.KerberosExtension`. These are distinct extensions from different vendors.

> **K-5 -- Wrong Payload Type:** The Kerberos SSO extension uses `Type = Credential`, NOT `Redirect`. Using `Redirect` (the Platform SSO value) is the most common configuration copy-error when building a Kerberos profile from a Platform SSO template. Every plist example in this guide shows `<key>Type</key><string>Credential</string>` -- verify this value before uploading the profile to Intune.

### On-Premises AD Kerberos Profile (.mobileconfig)

The following is the verified on-prem .mobileconfig plist, sourced verbatim from Microsoft Learn (updated 2026-06-15). Replace the placeholder `PayloadUUID` and `PayloadIdentifier` values with your own generated UUIDs before uploading to Intune.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PayloadContent</key>
    <array>
        <dict>
            <key>ExtensionData</key>
            <dict>
                <key>allowPasswordChange</key>
                <true/>
                <key>allowPlatformSSOAuthFallback</key>
                <true/>
                <key>performKerberosOnly</key>
                <true/>
                <key>pwReqComplexity</key>
                <true/>
                <key>syncLocalPassword</key>
                <false/>
                <key>usePlatformSSOTGT</key>
                <true/>
            </dict>
            <key>ExtensionIdentifier</key>
            <string>com.apple.AppSSOKerberos.KerberosExtension</string>
            <key>Hosts</key>
            <array>
                <string>.contoso.com</string>
                <string>contoso.com</string>
            </array>
            <key>Realm</key>
            <string>CONTOSO.COM</string>
            <key>PayloadDisplayName</key>
            <string>Single Sign-On Extensions Payload for On-Premises</string>
            <key>PayloadIdentifier</key>
            <string>com.apple.extensiblesso.1aaaaaa1-2bb2-3cc3-4dd4-5eeeeeeeeee5</string>
            <key>PayloadType</key>
            <string>com.apple.extensiblesso</string>
            <key>PayloadUUID</key>
            <string>1aaaaaa1-2bb2-3cc3-4dd4-5eeeeeeeeee5</string>
            <key>TeamIdentifier</key>
            <string>apple</string>
            <key>Type</key>
            <string>Credential</string>
        </dict>
    </array>
    <key>PayloadDisplayName</key>
    <string>Kerberos SSO Extension for macOS for On-Premises</string>
    <key>PayloadEnabled</key>
    <true/>
    <key>PayloadScope</key>
    <string>System</string>
    <key>PayloadType</key>
    <string>Configuration</string>
    <key>PayloadRemovalDisallowed</key>
    <true/>
    <key>PayloadVersion</key>
    <integer>1</integer>
</dict>
</plist>
```

**Source:** [Microsoft Learn -- Enable Kerberos SSO in Platform SSO](https://learn.microsoft.com/en-us/entra/identity/devices/device-join-macos-platform-single-sign-on-kerberos-configuration) (updated 2026-06-15)

**Critical values to verify before upload:**
- `<key>ExtensionIdentifier</key><string>com.apple.AppSSOKerberos.KerberosExtension</string>` -- must be the Apple identifier, not the Microsoft one (K-1)
- `<key>Type</key><string>Credential</string>` -- must be `Credential`, not `Redirect` (K-5)
- `<key>TeamIdentifier</key><string>apple</string>` -- literal string `apple`, never a numeric App Store Team ID (Pitfall 1)
- `<key>Realm</key><string>CONTOSO.COM</string>` -- replace `CONTOSO.COM` with your actual AD realm in ALL CAPS (Pitfall 6)
- `<key>PayloadUUID</key>` and `<key>PayloadIdentifier</key>` -- replace the placeholder UUIDs with your own generated values

### Intune Custom Template Upload Steps

Upload the .mobileconfig via the Intune Custom Template profile path (NOT Settings Catalog -- that is the Platform SSO path from guide 07):

1. Navigate to **Devices** > **Configuration** > **Create** > **New policy**
2. **Platform:** macOS
3. **Profile type:** Templates > Custom
4. **Basics:** Enter a descriptive name (e.g., `macOS -- Kerberos SSO Extension -- On-Premises`)
5. **Custom configuration profile name:** Enter an internal identifier name
6. **Deployment channel:** Device channel (recommended)
7. **Configuration profile file:** Upload your edited `.mobileconfig` file
8. **Assignments:** Assign to **user groups** -- NOT device groups (same assignment rule as Platform SSO; assigning to device groups causes the extension to load before user context is available)

---

## Prerequisites

- **Platform SSO:** Already deployed and devices registered before pushing this profile. See [Platform SSO Setup](07-platform-sso-setup.md) for the Settings Catalog configuration. **Pitfall 5 -- deployment order:** Deploying this Kerberos profile with `usePlatformSSOTGT: true` before PSSO is registered has no effect -- the extension has no Platform SSO TGT to reuse. Complete guide 07 and verify PSSO registration on pilot devices before assigning this profile.

- **macOS version:** macOS 14.6 Sonoma or later is required for PSSO TGT integration (`usePlatformSSOTGT: true`, as covered in this guide). macOS 10.15 or later supports standalone Kerberos extension deployment without PSSO, but standalone operation is outside v1.10 scope (D-02) -- see [Kerberos SSO Extension](../_glossary-macos.md#kerberos-sso-extension) for a brief standalone note.

- **Company Portal:** Version 5.2408.0 or later is required for PSSO TGT sharing with the Kerberos extension. Version 2508 or later is required for the `custom_tgt_setting` fine-grained TGT mapping control (covered in the PSSO + Kerberos TGT Integration section, authored in 83-02).

- **On-premises Active Directory / KDC:**

  > **On-Premises AD / KDC Prerequisites (not covered in this guide):**
  >
  > This guide covers the Intune-admin-facing MDM payload only. Configuring the on-premises Active Directory Kerberos realm, KDC reachability, and DNS SRV records is an AD-admin responsibility outside this guide's scope. See [Apple Kerberos SSO Extension deployment reference](https://developer.apple.com/documentation/devicemanagement/extensiblesinglesignonkerberos) (Apple Developer Docs) and [Enable Kerberos SSO in Platform SSO](https://learn.microsoft.com/en-us/entra/identity/devices/device-join-macos-platform-single-sign-on-kerberos-configuration) (Microsoft Learn) for AD-side configuration steps.
