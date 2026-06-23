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

---

## Configuration: PSSO + Kerberos TGT Integration

> **macOS version gate:** The features in this section require macOS 14.6 (Sonoma) or later and Company Portal 5.2408.0 or later. On earlier macOS versions, `usePlatformSSOTGT` is silently ignored and the extension acquires its own Kerberos TGT independently.

When Platform SSO is deployed alongside the Kerberos SSO extension, the two extensions can share a TGT rather than independently acquiring separate tickets. The `usePlatformSSOTGT: true` key (in `ExtensionData` of the Kerberos .mobileconfig) tells the Kerberos extension to consume TGTs issued by Platform SSO instead of performing its own Kerberos authentication. This eliminates the secondary user-interaction prompt that would otherwise occur when the Kerberos extension needs to acquire its own ticket.

**Prerequisite ordering (Pitfall 5):** PSSO must already be registered on the device before this integration takes effect. Deploying the Kerberos profile with `usePlatformSSOTGT: true` before PSSO registration completes has no effect -- the extension has no Platform SSO TGT to reuse. Complete guide 07 and verify PSSO device registration on pilot devices before assigning this Kerberos profile.

> **Note -- standalone Kerberos without PSSO:** The Apple Kerberos SSO extension also supports standalone deployment (macOS 10.15+) without any Platform SSO dependency. Standalone operation is outside v1.10 scope (D-02) -- this guide focuses on the PSSO-coexistence pattern only. See [Kerberos SSO Extension](../_glossary-macos.md#kerberos-sso-extension) for a brief standalone note.

### Key Settings for PSSO-Combined Deployments

The following `ExtensionData` keys are relevant to PSSO-integrated deployments. They are already included in the `.mobileconfig` example above; this section explains their purpose when PSSO is present.

| Key | Recommended Value | Rationale |
|-----|------------------|-----------|
| `usePlatformSSOTGT` | `<true/>` | Enables PSSO TGT sharing. Requires macOS 14.6+. Has no effect if PSSO is not registered. |
| `performKerberosOnly` | `<true/>` | Disables password sync and expiry checks when Entra ID (via Platform SSO) owns the password lifecycle. Without this, the Kerberos extension may prompt users to update passwords through the AD path even though PSSO manages credentials. |
| `syncLocalPassword` | `<false/>` | Keep false in PSSO-combined deployments. Setting this true causes the Kerberos extension to sync the local macOS account password from AD -- this conflicts with PSSO's credential management. |
| `allowPlatformSSOAuthFallback` | `<true/>` (optional) | Permits the extension to fall back to independent Kerberos TGT acquisition if the PSSO TGT is unavailable. Useful for network edge cases. |

### custom_tgt_setting -- Fine-Grained TGT Mapping Control

> **Company Portal 2508+ required:** The `custom_tgt_setting` key is only available with Company Portal version 2508 or later. On earlier versions, it is silently ignored and both TGT paths are active (equivalent to value `0`).

`custom_tgt_setting` controls which Kerberos TGT paths Platform SSO activates. This is useful in deployments that want to limit TGT sharing to on-prem AD only, or to cloud Kerberos only.

| Value | Behavior |
|-------|----------|
| `0` | Both on-prem AD TGT (`tgt_ad`) and cloud Kerberos TGT (`tgt_cloud`) are mapped (default) |
| `1` | On-prem AD TGT only (`tgt_ad`) -- cloud TGT mapping disabled |
| `2` | Cloud Kerberos TGT only (`tgt_cloud`) -- on-prem TGT mapping disabled |
| `3` | No TGT mapping -- disables both paths |

> **Placement warning [ASSUMED -- confirm before deploying]:** The `custom_tgt_setting` key belongs in the **PSSO Settings Catalog policy's `ExtensionData` dictionary** (the `com.microsoft.CompanyPortalMac.ssoextension` profile), NOT in the Kerberos `.mobileconfig` profile. Microsoft Learn describes this key as being set "in the extension data dictionary in SSO extension configuration," which refers to the PSSO Settings Catalog policy. Placing it in the Kerberos `.mobileconfig` `ExtensionData` has no effect. This placement is tagged `[ASSUMED]` because the Microsoft Learn documentation does not show a complete plist example for this key -- confirm against the current Microsoft Learn Kerberos-PSSO article and a live Intune instance before deploying. [Source: learn.microsoft.com/en-us/entra/identity/devices/device-join-macos-platform-single-sign-on-kerberos-configuration, 2026-06-15]

### Cosmetic "Not signed in" Menu-Bar Note

> **Important -- do not misread this as a failure:** A correctly configured and fully functioning PSSO + Kerberos TGT deployment may display **"Not signed in"** in the macOS Kerberos menu-bar extra (the key icon in the menu bar from the Kerberos extension). This is a cosmetic display artifact of the `usePlatformSSOTGT` integration -- the Kerberos extension is consuming a TGT from Platform SSO rather than managing its own credentials, so the menu-bar extra has no user account to display. The "Not signed in" label reflects the extension's state from the perspective of the menu-bar UI only. If `app-sso platform -s` shows `tgt_ad` in the output (see Verification section), Kerberos SSO is functioning correctly. "Not signed in" in the menu bar does NOT indicate a failure condition in PSSO-integrated deployments.

---

## Configuration: Cloud Kerberos Profile (Limited Preview)

> **LIMITED PREVIEW -- NOT GA:** Azure Files Cloud Kerberos authentication via Platform SSO TGT is in **limited preview** as of 2026-06-15. This is NOT the primary configuration path covered by this guide (the on-prem `usePlatformSSOTGT` pattern above is primary and GA). The Cloud Kerberos path requires separate onboarding via `azurefiles@microsoft.com`. Do not deploy this profile to production without completing the Azure Files preview onboarding.
>
> **[ASSUMED -- re-verify status before deploying]:** The Azure Files Cloud Kerberos feature was in limited preview at research time (2026-06-15). Verify the current GA/preview status against the Microsoft Learn Kerberos-PSSO article before publishing this section to your admin audience. If the feature has gone GA, remove the preview callout and update the onboarding instructions accordingly. [RESEARCH assumption A3]

Cloud Kerberos enables macOS devices to authenticate to Azure Files (SMB shares) using a cloud-issued Kerberos TGT from Entra ID, without requiring an on-premises AD Kerberos infrastructure for those specific resources. It uses a separate Kerberos SSO extension profile targeting the `KERBEROS.MICROSOFTONLINE.COM` realm.

### Cloud Kerberos Profile Keys

| Key | Value | Notes |
|-----|-------|-------|
| `ExtensionIdentifier` | `com.apple.AppSSOKerberos.KerberosExtension` | Same Apple-native extension as the on-prem profile |
| `Type` | `Credential` | Same as on-prem -- do NOT use `Redirect` |
| `TeamIdentifier` | `apple` | Same as on-prem |
| `Realm` | `KERBEROS.MICROSOFTONLINE.COM` | Entra Cloud Kerberos realm -- ALL CAPS required |
| `Hosts` | `["windows.net", ".windows.net"]` | Azure Files target; includes dot-prefixed wildcard |
| `ExtensionData` > `preferredKDCs` | `kkdcp://login.microsoftonline.com/{tenantId}/kerberos` | Replace `{tenantId}` with your Entra tenant ID |
| `ExtensionData` > `usePlatformSSOTGT` | `<true/>` | Required -- cloud TGT sharing via PSSO |
| `ExtensionData` > `performKerberosOnly` | `<true/>` | Required for cloud profile |

> **Onboarding:** To join the Azure Files Cloud Kerberos limited preview, contact **azurefiles@microsoft.com**. The preview onboarding includes tenant-specific configuration guidance for the `preferredKDCs` endpoint and any additional policy requirements at the time of your enrollment.

The Cloud Kerberos profile is deployed as a **separate** Intune Custom Template profile in addition to (not replacing) the on-prem AD profile. Devices that need both on-prem Kerberos resources and Azure Files access receive both profiles simultaneously -- they use different `Realm` values and `Hosts` arrays, so they do not conflict.

---

## Verification

Use the following two commands as the canonical diagnostic pair for Kerberos SSO extension health in PSSO-integrated deployments. These are read-only commands safe to run on any enrolled device.

> **Diagnostics scope:** Only the two read-only commands below are documented in this guide. Do not use `kinit` as an admin diagnostic step -- it is a write-operation that acquires a new ticket and is not appropriate for verifying extension health. Use only `app-sso platform -s` and `klist` as described below.

### Step 1 -- app-sso platform -s (Platform SSO TGT State)

Run `app-sso platform -s` in Terminal on the enrolled macOS device to view Platform SSO state, including the TGT ticket paths:

```console
app-sso platform -s
```

**Output interpretation (D-12):**

| Output field | What it signals |
|---|---|
| `ticketKeyPath: tgt_ad` present in output | On-prem Active Directory TGT is functioning -- the Kerberos extension is sharing the PSSO-issued on-prem TGT |
| `ticketKeyPath: tgt_cloud` present in output | Cloud Kerberos TGT is available -- Azure Files / Entra Cloud Kerberos TGT is active (requires Cloud Kerberos profile from the section above) |
| Neither `tgt_ad` nor `tgt_cloud` present | `usePlatformSSOTGT` may not be set in the Kerberos profile, PSSO registration is incomplete, or the device has not yet received the Kerberos profile |

**"Not signed in" disambiguation:** If `app-sso platform -s` shows `tgt_ad` in its output but the macOS menu-bar Kerberos icon displays **"Not signed in"**, this is the expected cosmetic behavior described in the PSSO + Kerberos TGT Integration section above. The "Not signed in" label is a display artifact of TGT sharing -- Kerberos SSO is functioning correctly. Trust `app-sso platform -s` over the menu-bar display.

### Step 2 -- klist (Kerberos Ticket Cache)

Run `klist` (bare form -- do not use `klist -v`, which has version-variant behavior across macOS releases) to inspect the Kerberos credential cache:

```console
klist
```

**What to look for:**

```
Credentials cache: API:...
        Principal: user@CONTOSO.COM

  Issued                Expires               Service principal
  [timestamp]           [timestamp]           krbtgt/CONTOSO.COM@CONTOSO.COM
  [timestamp]           [timestamp]           krbtgt/KERBEROS.MICROSOFTONLINE.COM@KERBEROS.MICROSOFTONLINE.COM
```

| Service principal in output | What it signals |
|---|---|
| `krbtgt/CONTOSO.COM@CONTOSO.COM` | On-prem Active Directory TGT is present and valid |
| `krbtgt/KERBEROS.MICROSOFTONLINE.COM@KERBEROS.MICROSOFTONLINE.COM` | Cloud Kerberos TGT is present (Azure Files profile deployed) |
| No entries / "No credentials cache found" | PSSO registration not complete, profiles not yet received, or TGTs have expired |

**Ticket expiry:** The `Expires` column shows when each ticket will expire. The Kerberos extension proactively renews TGTs on network state change; default TGT lifetime is set by the KDC (typically 10 hours for on-prem AD). Expiry times reflect normal Kerberos TTL behavior -- a ticket near expiry that has not yet expired is functioning correctly and will be renewed automatically.

### Realm and KDC Reachability

If `klist` shows no tickets and `app-sso platform -s` shows neither `tgt_ad` nor `tgt_cloud`, check the following at the Intune-admin level:

- **Profile assignment:** Confirm the Kerberos `.mobileconfig` profile is assigned to the correct user group in Intune (Devices > Configuration) and shows as installed on the device.
- **PSSO registration:** Confirm Platform SSO is registered on the device (see guide 07 Verification steps). PSSO must be registered before `usePlatformSSOTGT` takes effect.
- **Company Portal version:** Confirm Company Portal 5.2408.0 or later is installed on the device (Settings > Company Portal > About).
- **Network path to KDC:** AD Kerberos realm reachability (DNS SRV records, port 88, KDC connectivity) is an AD-admin responsibility. If profile assignment and PSSO registration are confirmed but tickets still do not appear, escalate KDC reachability to your AD team. See the [Apple Kerberos SSO Extension deployment reference](https://developer.apple.com/documentation/devicemanagement/extensiblesinglesignonkerberos) for AD-side diagnostic guidance.

---

## Configuration-Caused Failures

The following table covers the three most common Kerberos extension misconfigurations and their symptoms. Refer to the runbook placeholder for remediation steps once the L2 runbook is published (Phase 85).

| Misconfiguration | Portal | Symptom | Runbook |
|-----------------|--------|---------|---------|
| `Type: Redirect` used instead of `Type: Credential` in the Kerberos `.mobileconfig` | Intune profile shows as installed | No Kerberos TGT acquired; `klist` shows no `krbtgt/CONTOSO.COM` entry; `app-sso platform -s` shows no `tgt_ad`; users prompted for Kerberos credentials repeatedly | -- (Phase 85) |
| Wrong `ExtensionIdentifier` -- Microsoft PSSO value (`com.microsoft.CompanyPortalMac.ssoextension`) used in the Kerberos profile | Intune profile shows as installed | Kerberos extension silently fails to load; the Apple Kerberos SSO extension is never activated; symptom identical to Type mismatch above | -- (Phase 85) |
| `usePlatformSSOTGT: true` set but PSSO not registered | Intune profile shows as installed | No `tgt_ad` in `app-sso platform -s` output; PSSO registration status in Company Portal shows incomplete or pending | -- (Phase 85) |

---

## See Also

- [Platform SSO Setup](07-platform-sso-setup.md) -- Settings Catalog policy creation, prerequisites, and verification for Platform SSO (prerequisite for this guide)
- [Auth Methods Deep-Dive](08-auth-methods-deep-dive.md) -- Authentication method selection for Platform SSO (Secure Enclave key, Password sync, Smart Card)
- [Enterprise SSO Plug-in & Migration Guide](09-enterprise-sso-plugin-migration.md) -- Disambiguation of Platform SSO vs Enterprise SSO plug-in vs Kerberos SSO extension, Error 10002 avoidance, migration sequence
- [Kerberos SSO Extension](../_glossary-macos.md#kerberos-sso-extension)
- [Platform SSO](../_glossary-macos.md#platform-sso)
- [Enterprise SSO Plug-in](../_glossary-macos.md#enterprise-sso-plug-in)
- [Apple Kerberos SSO Extension deployment reference](https://developer.apple.com/documentation/devicemanagement/extensiblesinglesignonkerberos) -- Apple Developer Docs (authoritative ExtensibleSingleSignOnKerberos MDM payload reference)
- [Enable Kerberos SSO in Platform SSO](https://learn.microsoft.com/en-us/entra/identity/devices/device-join-macos-platform-single-sign-on-kerberos-configuration) -- Microsoft Learn (authoritative on-prem .mobileconfig payload source; Company Portal prerequisites; `custom_tgt_setting` reference)

---

| Date | Change | Author |
|------|--------|--------|
| 2026-06-22 | Phase 83 (KRB-01..04): initial Kerberos SSO Extension guide | -- |
