# Stack Research: 802.1X Network Authentication — Intune Technical Building Blocks

**Domain:** 802.1X enterprise network authentication (wired + Wi-Fi) via Microsoft Intune across 5 platforms
**Researched:** 2026-06-29
**Confidence:** HIGH (all primary findings verified against Microsoft Learn official documentation, dates confirmed)
**Sources verified against:** learn.microsoft.com — last-modified dates 2025-05-15 to 2026-06-29

---

## Scope Guardrail (from milestone brief)

This research covers **client-side Intune configuration only**. RADIUS/NPS server build-out is explicitly out of scope. Server-name validation and trusted-root trust settings on the client ARE in scope.

---

## Building Block 1: Wi-Fi Profile Types Per Platform

| Platform | Profile Path in Intune | Profile Mechanism | Notes |
|---|---|---|---|
| **Windows** | Devices > Configuration > New policy > Windows 10 and later > Templates > **Wi-Fi** | Templates > Wi-Fi (also in Settings Catalog) | XML import available for unsupported settings; uses Wi-Fi CSP |
| **macOS** | Devices > Configuration > New policy > macOS > Templates > **Wi-Fi** | Templates > Wi-Fi (enterprise section) | Requires deployment channel selection (User vs Device) — immutable after assignment |
| **iOS/iPadOS** | Devices > Configuration > New policy > iOS/iPadOS > Templates > **Wi-Fi** | Same template reference page as macOS (zone pivot) | MAC randomization control available (iOS 14+) |
| **Android Enterprise** | Devices > Configuration > New policy > Android Enterprise > Templates > **Wi-Fi** | Templates > Wi-Fi; separate from basic/AOSP | All AE modes (COBO, COPE, COSU, BYOD work profile, AOSP) use same profile path |
| **Linux** | **NOT SUPPORTED** | No Wi-Fi profile type in Intune for Linux | Shell scripts (Bash via Intune) can configure NetworkManager/nmcli, but this is not an MDM-delivered structured profile; no certificate delivery possible via Intune |

**Settings Catalog note:** For Windows, the Settings Catalog (`Devices > Configuration > New policy > Settings catalog`) also exposes Wi-Fi settings and may expose more granular options than the Templates path. For macOS and iOS/iPadOS, Settings Catalog exists but the dedicated Wi-Fi template is the standard documented approach for 802.1X enterprise profiles. Android Enterprise and Linux are not relevant here (AE uses Templates; Linux has no equivalent).

---

## Building Block 2: Wired Network (Ethernet 802.1X) Profile Types Per Platform

| Platform | Profile Path in Intune | Profile Mechanism | Notes |
|---|---|---|---|
| **Windows** | Devices > Configuration > New policy > Windows 10 and later > Templates > **Wired network** | Templates > Wired network; uses WiredNetwork CSP | Supports TEAP (unique to Windows wired); 802.1x enforcement toggle |
| **macOS** | Devices > Configuration > New policy > macOS > Templates > **Wired network** | Templates > Wired network | Network interface selector (First active Ethernet, etc.); deployment channel required |
| **iOS/iPadOS** | Devices > Configuration > New policy > iOS/iPadOS > Templates > **Wired network** | Templates > Wired network (same ref page as macOS, iOS/iPadOS pivot) | GA as of current docs (listed in overview as supported); targets M-series iPads with Ethernet |
| **Android Enterprise** | **NOT SUPPORTED** | No wired network profile type in Intune for Android | No Intune path; no workaround via OMA-URI documented |
| **Linux** | **NOT SUPPORTED** | No wired network profile type in Intune for Linux | Same gap as Wi-Fi: shell scripts only; no structured 802.1X profile |

**iOS/iPadOS wired GA status:** The Microsoft Learn wired network settings reference page (last updated 2026-06-04) includes iOS/iPadOS as a fully documented zone pivot. The Intune device configuration overview page (last updated 2026-06-04) lists the Wired networks feature as supporting "iOS/iPadOS, macOS, Windows." This is GA. (A prior "in development" entry has cleared the in-development page, confirming release.)

---

## Building Block 3: EAP Method Support Matrix — Wi-Fi

| EAP Method | Windows Wi-Fi | macOS Wi-Fi | iOS/iPadOS Wi-Fi | Android Enterprise Wi-Fi | Linux Wi-Fi |
|---|---|---|---|---|---|
| **EAP-TLS** | Yes | Yes | Yes | Yes | Not via Intune |
| **PEAP (MSCHAPv2 inner)** | Yes — "Protected EAP (PEAP)" | Yes — "PEAP" | Yes — "PEAP" | Yes — "PEAP" | Not via Intune |
| **EAP-TTLS** | Yes | Yes | Yes | Yes | Not via Intune |
| EAP-FAST | No | Yes | Yes | No | Not via Intune |
| EAP-SIM | Yes | No | Yes | No | Not via Intune |
| LEAP | No | Yes | Yes | No | Not via Intune |

---

## Building Block 4: EAP Method Support Matrix — Wired (Ethernet)

| EAP Method | Windows Wired | macOS Wired | iOS/iPadOS Wired | Android Wired | Linux Wired |
|---|---|---|---|---|---|
| **EAP-TLS** | Yes | Yes | Yes | Not supported | Not via Intune |
| **PEAP (MSCHAPv2 inner)** | Yes — "Protected EAP (PEAP)" | Yes — "PEAP" | Yes — "PEAP" | Not supported | Not via Intune |
| **EAP-TTLS** | Yes | Yes | Yes | Not supported | Not via Intune |
| EAP-FAST | No | Yes | No | Not supported | Not via Intune |
| TEAP | Yes (unique to Windows wired) | No | No | Not supported | Not via Intune |
| EAP-SIM | Yes | No | No | Not supported | Not via Intune |
| LEAP | No | Yes | No | Not supported | Not via Intune |

---

## Building Block 5: Certificate Delivery — Platform Support Matrix

| Certificate Profile Type | Windows | macOS | iOS/iPadOS | Android Enterprise (all modes) | Android AOSP | Linux |
|---|---|---|---|---|---|---|
| **Trusted Certificate (Root CA)** | Yes | Yes | Yes | Yes | Yes | **No** |
| **SCEP** | Yes | Yes | Yes | Yes | Yes | **No** |
| **PKCS** | Yes | Yes | Yes | Yes | Yes | **No** |
| **PKCS Imported (PFX Import)** | Yes | Yes | Yes | Yes (not AOSP) | No | **No** |

Source: Microsoft Learn — "Types of certificate that are supported by Microsoft Intune" (last updated 2026-06-22, verified 2026-06-29). Linux does not appear in the platform support table.

---

## Building Block 6: Client Certificate Options Within 802.1X Profiles

Critical distinction: the certificate profile types available at the Intune level (Building Block 5) do not all map to every 802.1X profile type. The profile-level constraints are:

### Windows Wi-Fi (EAP-TLS client auth)
- SCEP certificate
- PKCS certificate
- Derived credential

### Windows Wired (EAP-TLS client auth)
- SCEP certificate
- PKCS certificate
- **PFX Import certificate (PKCS Imported)** — unique explicit option in wired profile UI
- Derived credential

### macOS Wi-Fi (EAP-TLS client auth)
- SCEP certificate
- PKCS certificate
- Deployment channel determines keychain: user channel = user keychain; device channel = system keychain

### macOS Wired (EAP-TLS client auth)
- **SCEP certificate ONLY**
- PKCS certificate: explicitly **NOT supported** in macOS wired network profiles
- Source: Microsoft Learn — "Add wired network settings for macOS devices" (updated 2026-06-04): "Public Key Cryptography Standards (PKCS) certificates aren't supported."

### iOS/iPadOS Wi-Fi (EAP-TLS client auth)
- SCEP certificate
- PKCS certificate
- Derived credential

### iOS/iPadOS Wired (EAP-TLS client auth)
- **SCEP certificate ONLY**
- PKCS certificates: explicitly **NOT supported** in iOS/iPadOS wired network profiles
- Source: Same wired settings reference page as macOS, iOS/iPadOS pivot

### Android Enterprise Wi-Fi (EAP-TLS client auth)
- SCEP certificate
- PKCS certificate
- Derived credential (corporate-owned modes)
- **BYOD work profile requirement:** UPN must be present in Subject Alternative Name (SAN) for both user and device certificates; profile deployment fails if SAN lacks UPN

### Linux
- No Intune certificate profile types supported
- No client certificate delivery path via Intune

---

## Building Block 7: Server Certificate Trust — Settings Per Platform

Each 802.1X EAP method requires the client to trust the RADIUS server's certificate. Intune exposes these through two settings:

**Setting A — Certificate server names (RADIUS server name validation):**
The common name (CN) or DNS suffix in the RADIUS server certificate. When configured, the device validates the server name and bypasses the interactive trust dialog.

**Setting B — Root certificate for server validation:**
A reference to a Trusted Certificate profile (root CA or intermediate CA) already deployed to the device. This profile must be assigned to the same device/user groups as the Wi-Fi or Wired network profile.

| Platform | Server Name Field | Trusted Root Profile Reference | Additional Notes |
|---|---|---|---|
| **Windows Wi-Fi** | "Certificate server names" (one or more CNs) | "Root certificates for server validation" (one or more trusted cert profiles) | Bypasses dynamic trust dialog |
| **Windows Wired** | "Certificate server names" | "Root certificate for server validation" | PEAP adds "Perform server validation" Yes/No + "Disable user prompts for server validation" + "Require cryptographic binding" |
| **macOS Wi-Fi** | "Certificate server names" (supports wildcard suffix, e.g., `*.contoso.com`) | "Root certificate for server validation" | |
| **macOS Wired** | "Certificate server names" (under Server Trust section) | "Root certificate for server validation" | |
| **iOS/iPadOS Wi-Fi** | "Certificate server names" (supports wildcard suffix) | "Root certificate for server validation" | |
| **iOS/iPadOS Wired** | "Certificate server names" | "Root certificate for server validation" | |
| **Android Enterprise Wi-Fi** | "Radius server name" — single field (DNS suffix or FQDN) | "Root certificate for server validation" | **Android 11+ may require this field** or device may not connect; Android 14+: total all RADIUS server names ≤ 256 chars, no special characters |
| **Linux** | Not configurable via Intune | Not configurable via Intune | Out-of-band configuration only |

---

## Building Block 8: Inner Authentication (PEAP-MSCHAPv2 and EAP-TTLS)

For username/password-based EAP methods (PEAP with Username/Password inner, and EAP-TTLS), the inner authentication method options differ by platform.

### EAP-TTLS Inner Authentication Options

| Platform | PAP | CHAP | MS-CHAP | MS-CHAPv2 |
|---|---|---|---|---|
| Windows Wi-Fi | Yes | Yes | Yes | Yes |
| Windows Wired | Yes | Yes | Yes | Yes |
| macOS Wi-Fi | Yes | Yes | Yes | Yes |
| macOS Wired | Yes | Yes | Yes | Yes |
| iOS/iPadOS Wi-Fi | Yes | Yes | Yes | Yes |
| iOS/iPadOS Wired | (inner auth method not explicitly documented in wired zone; Username/Password option exists) | | | |
| Android Enterprise Wi-Fi | Yes | **No** | Yes | Yes |
| Android AOSP Wi-Fi | (basic EAP-TTLS with cert or PAP implied) | | | |

**Android note:** Android Enterprise Wi-Fi EAP-TTLS inner options are: "Unencrypted password (PAP)", "Microsoft CHAP (MS-CHAP)", "Microsoft CHAP Version 2 (MS-CHAP v2)". Plain CHAP is not listed for Android.

### PEAP Inner Authentication Options

| Platform | Username/Password (MS-CHAPv2 tunnel) | SCEP/PKCS cert as inner | MS-CHAPv2 explicit inner |
|---|---|---|---|
| Windows Wi-Fi | Yes | Yes (SCEP or PKCS in inner) | (implied via Username/Password) |
| Windows Wired | Yes | Yes | PEAP = "Username and Password" or cert |
| macOS Wi-Fi | Yes | Yes (SCEP or PKCS cert as inner auth) | |
| macOS Wired | Yes | Yes (SCEP cert only) | |
| iOS/iPadOS Wi-Fi | Yes | Yes | |
| iOS/iPadOS Wired | Yes | Yes (SCEP only) | |
| Android Enterprise Wi-Fi | Yes — "Username and Password" with inner: "None" or "Microsoft CHAP Version 2 (MS-CHAP v2)" | Yes (SCEP or PKCS cert) | MS-CHAPv2 |
| Android AOSP Wi-Fi | Yes | Yes (SCEP or PKCS cert) | MS-CHAPv2 |

### Identity Privacy (Outer Identity)

All platforms with tunneled EAP methods (TTLS and PEAP) support an "Identity privacy (outer identity)" field — text sent as the EAP identity before the secure tunnel is established (e.g., `anonymous` or `anonymous@contoso.com`). This prevents the real UPN from appearing in RADIUS logs during the outer exchange.

---

## Building Block 9: Platform-Specific Profile Mechanics and Gotchas

### Windows

**Wi-Fi profile:**
- Profile path: Templates > Wi-Fi (enterprise section)
- Authentication mode: User / Machine / User or machine / Guest — configures which credentials authenticate (user account vs device credential)
- Single sign-on (SSO): Enable before or after user signs in (pre-logon machine auth)
- PMK caching + pre-authentication available
- FIPS compliance option available
- XML import: "For any settings not available in Intune, you can export Wi-Fi settings from another Windows device" — the exported XML can be imported as a custom profile

**Wired network profile:**
- Profile path: Templates > Wired network (WiredNetwork CSP)
- 802.1x enforcement: When set to "Enforce", Wired AutoConfig requires 802.1X for all ports. Warning: if policy settings don't match network, internet access is blocked and device cannot receive updated policy — requires manual policy removal
- Authentication mode: User / Machine / User or machine / Guest
- TEAP (Tunnel EAP): Primary + Secondary authentication method — the only EAP type supporting simultaneous user + machine credential chain; unique to Windows wired
- Block period: Configurable delay before retry after failed auth
- EAPOL timing: Authentication period, retry delay, start period, max EAPOL-start, max auth failures all configurable

### macOS

**Wi-Fi profile:**
- Deployment channel: Must select User channel (user certificates → user keychain) or Device channel (device certificates → system keychain) before deployment. Cannot change after the profile is assigned — must create a new profile. Cert type (user vs device) MUST align with channel. Storing user certs in system keychain increases security risk.
- Note in docs: "We recommend rechecking the deployment channel setting in existing profiles when the linked authentication certificates are up for renewal."

**Wired network profile:**
- Network interface options: First active Ethernet (default), Second active Ethernet, Third active Ethernet, First Ethernet, Second Ethernet, Third Ethernet, Any Ethernet. "Active" variants prefer interfaces that are working; if no active interface, falls to next in service-order priority.
- PKCS certificates NOT supported for any EAP type in wired — SCEP only for client auth
- Deployment channel: Same User/Device channel requirement as Wi-Fi

### iOS/iPadOS

**Wi-Fi profile:**
- MAC address randomization: By default, iOS 14+ randomizes MAC per network. For NAC (Network Access Control) implementations, admin MUST set "Disable MAC address randomization = Yes" or set MAC randomization to "Yes" in the profile (forces actual MAC). Without this, 802.1X + NAC setups that rely on MAC address will fail intermittently as the MAC changes per connection.
- Security type: WPA - Enterprise or WPA/WPA2 - Enterprise selectable

**Wired network profile:**
- Network interface: Automatically set to "Any Ethernet" — no interface selection
- Target devices: M-series iPads with USB Ethernet adapter. iPadOS wired 802.1X is specifically relevant for multi-iPad shared-use scenarios where Ethernet is available.
- PKCS certificates NOT supported — SCEP only for client auth
- EAP types available: EAP-TLS, EAP-TTLS, PEAP (no EAP-FAST or LEAP in wired zone)

### Android Enterprise

**Wi-Fi profile:**
- Enrollment modes covered: COPE, COBO, COSU (corporate-owned tab) and BYOD personally-owned work profile (separate tab) and AOSP (third tab)
- RADIUS server name field (Android 11+): "New Wi-Fi profiles might require this setting be configured. Otherwise, the devices might not connect to your Wi-Fi network." Treat as required for Android 11+.
- Android 14+ character constraint: Total content length of all RADIUS server names ≤ 256 characters; no special characters. Use DNS suffix instead of FQDN list when possible.
- BYOD work profile cert SAN requirement: "When using any EAP type (EAP-TLS, PEAP, or EAP-TTLS) and certificates for authentication, it's required to include the user principal name (UPN) in the Subject Alternative Name (SAN) for user and device certificates. If the UPN isn't present in the SAN, the Wi-Fi profile deployment fails." This is a BYOD-specific constraint not noted for corporate-owned modes.
- Trusted root cert replacement: "If you plan to change the Trusted Root Certificate of a Wi-Fi profile, before you change the certificate, make sure the device connects to another internet connection." Simultaneous multiple trusted root certs in a single Wi-Fi profile are not yet supported (documented as future update with no ETA).
- MAC randomization (Android 13+): Use device default / Use randomized MAC / Use device MAC. Admin-enforced. Important for NAC.

**No wired network profile:** Android Enterprise has no Intune wired network profile type. There is no documented OMA-URI workaround equivalent.

### Linux

**Complete platform gap for 802.1X:**
- No Wi-Fi profile type for Linux in Intune
- No Wired network profile type for Linux in Intune
- No certificate profile types (Trusted, SCEP, PKCS) for Linux in Intune
- The device configuration overview page does not list Linux under Wi-Fi, Wired networks, or Certificates
- Linux devices managed by Intune only receive: compliance policies, shell scripts, Bash scripts, and endpoint security policies (MDE)

**Documentation approach for Linux:** The 802.1X admin-setup guide for Linux must explain that Intune does not deliver 802.1X or certificate profiles to Linux. Network configuration is out-of-band, using the OS-level tools (NetworkManager, nmcli, wpa_supplicant). This is a fundamental platform gap, not a configuration limitation. The doc should acknowledge the gap and note what IS possible (nmcli config examples for reference) while being explicit this is outside Intune's profile surface.

---

## Building Block 10: Trusted Certificate Profile Deployment Pattern

For every 802.1X configuration requiring server certificate validation (all EAP methods on all platforms), the trusted root certificate profile must be deployed to the **same device or user groups** as the 802.1X profile that references it. This is a universal dependency:

```
Deploy together to same groups:
  [Trusted Certificate Profile — RADIUS Root CA]
  +
  [SCEP or PKCS Certificate Profile — client cert for EAP-TLS]  (EAP-TLS only)
  +
  [Wi-Fi or Wired Network Profile]
```

The Wi-Fi/Wired profile references the Trusted Certificate profile by name in the "Root certificate for server validation" field. If the Trusted Certificate profile has not yet reached the device when the network profile applies, server validation fails.

For PKCS/SCEP client certs used in EAP-TLS:
- The certificate profile must also be deployed to the same groups
- The Wi-Fi/Wired profile references the certificate profile in the "Certificates" or "Authentication method" field

---

## Building Block 11: What NOT to Configure

Per milestone scope guardrail — these are explicitly out of scope for the v1.14 documentation:

| Out of Scope Item | Why Excluded |
|---|---|
| NPS/RADIUS server build-out | Scope guardrail: assumes server already exists |
| NPS policies and connection request policies | Server-side; not Intune client config |
| NDES server setup for SCEP | Infrastructure-side; already covered at high level in existing cert docs |
| Certificate Connector for Microsoft Intune setup | Already exists as prerequisite context; not 802.1X-specific |
| Conditional Access policies based on network compliance | CA is a different Intune surface; not 802.1X profile config |
| Android Device Administrator (DA) Wi-Fi | DA is deprecated and no longer available for GMS devices |
| Windows 8.1 SCEP profiles | End of support October 2022 |
| TEAP deep-dive beyond awareness note | Niche; not one of the three co-equal EAP paths in scope |

---

## Building Block 12: Strong Mapping Requirement (Active Concern)

As of February 11, 2025, Windows Domain Controllers enforce strong certificate mapping (KB5014754). This affects **Hybrid Entra Joined** devices using SCEP or PKCS certificates for 802.1X EAP-TLS authentication against NPS servers that perform Kerberos auth. The security identifier (SID) must be included in the certificate's SAN.

**Impact on v1.14 docs:** The admin-setup guide for Windows 802.1X EAP-TLS should note the strong mapping requirement in the SCEP/PKCS profile configuration section. Intune has released the ability to include the SID in SCEP and PKCS profiles. This is not a blocker but a configuration note for Hybrid Entra Joined environments. Cloud-only Entra Joined devices are not affected.

Source: Microsoft Learn in-development/notices — "Plan for Change: Implement strong mapping for SCEP and PKCS certificates."

---

## Per-Platform Phase Grouping Recommendation

Based on complexity and profile-surface similarity:

**Recommended groupings:**

1. **Foundation phase** (cross-platform concepts): 802.1X concepts, EAP method comparison, supplicant model, cert-delivery prerequisites (SCEP/PKCS/trusted-root), RADIUS server-name validation concept. Does not require platform-specific research.

2. **Windows** (moderately complex): Two profile types (Wi-Fi + Wired), both GA, both with SCEP/PKCS support. Wired has TEAP and 802.1x enforcement. Authentication mode (User/Machine) is important. Full EAP-TLS + PEAP + TTLS.

3. **macOS** (moderately complex): Two profile types (Wi-Fi + Wired), deployment channel is the critical gotcha. PKCS gap on wired. Network interface selector. Full EAP-TLS + PEAP + TTLS.

4. **iOS/iPadOS** (moderate): Two profile types. Wired is newer (M-series iPad use case). PKCS gap on wired. MAC randomization for NAC. SCEP-only for wired.

5. **Android Enterprise** (moderate): Wi-Fi only. RADIUS server name behavior changes across Android 11/13/14 require per-version callouts. BYOD cert SAN requirement. No wired.

6. **Linux** (simple but unusual): Document the gap explicitly. No Intune profile. Out-of-band via NetworkManager/nmcli. Practical shell script examples (not Intune profiles). Certificate out-of-band.

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|---|---|---|---|
| Windows 802.1X Wi-Fi delivery | Templates > Wi-Fi | Settings Catalog Wi-Fi | Both are valid; Templates is more documented for 802.1X; Settings Catalog may have more options — note both in docs, use Templates as primary |
| macOS Wi-Fi delivery | Templates > Wi-Fi (enterprise) | Custom .mobileconfig via Custom profile | Custom profile requires Apple Configurator XML authoring; Templates provides guided UI; use custom only for settings not in Templates |
| Android EAP-TLS cert | SCEP or PKCS (both supported) | PKCS Imported (not AOSP) | PKCS Imported is for pre-existing cert scenarios (e.g., S/MIME); SCEP/PKCS are standard for device-unique certs |
| Linux 802.1X | Shell script (nmcli) | OMA-URI custom profile | Linux has no custom OMA-URI profile type in Intune; shell scripts are the only delivery mechanism |
| iOS wired 802.1X cert | SCEP | PKCS | PKCS is not supported for wired on iOS/iPadOS |
| macOS wired 802.1X cert | SCEP | PKCS | PKCS is not supported for wired on macOS |

---

## Sources

| Source | URL | Verified | Confidence |
|---|---|---|---|
| Windows Wi-Fi settings reference | https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-wifi-settings-windows | 2026-06-29; doc updated 2025-05-15 | HIGH |
| Apple Wi-Fi settings reference (iOS + macOS) | https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-wifi-settings-apple | 2026-06-29; doc updated 2026-06-23 | HIGH |
| Apple wired network settings reference (iOS + macOS) | https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-wired-network-settings-macos | 2026-06-29; doc updated 2026-06-04 | HIGH |
| Windows wired network settings reference | https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-wired-network-settings-windows | 2026-06-29; doc updated 2026-06-04 | HIGH |
| Android Enterprise Wi-Fi settings reference | https://learn.microsoft.com/en-us/intune/device-configuration/templates/ref-wifi-settings-android-enterprise | 2026-06-29; doc updated 2025-06-17 | HIGH |
| Intune device profile types overview | https://learn.microsoft.com/en-us/intune/device-configuration/overview | 2026-06-29; doc updated 2026-06-03 | HIGH |
| Certificate platform support matrix | https://learn.microsoft.com/en-us/intune/fundamentals/certificates/overview | 2026-06-29; doc updated 2026-06-22 | HIGH |
| In development features | https://learn.microsoft.com/en-us/intune/whats-new/in-development | 2026-06-29; doc updated 2026-06-29 | HIGH |
| Context7 Intune docs | /websites/learn_microsoft_en-us_intune — multiple queries | 2026-06-29 | HIGH |

---

*Stack research for: v1.14 802.1X Network Authentication Documentation (Pillar A)*
*Researched: 2026-06-29*
*Researcher: Claude (claude-sonnet-4-6)*
