---
last_verified: 2026-06-30
review_by: 2026-09-28
applies_to: both
audience: admin
platform: windows
---

> **Prerequisites:** Complete [EAP Method Overview](01-eap-method-overview.md) and
> [Certificate Delivery Foundation](02-cert-delivery-foundation.md) before this guide.

# Windows 802.1X Admin Setup: Wi-Fi and Wired

> **Scope:** Intune client-side configuration only. RADIUS/NPS server assumed to exist. [Full scope exclusion list](02-cert-delivery-foundation.md#canonical-scope-callout).

## Common Profile Mechanics

This section covers settings that apply to both Wi-Fi and wired 802.1X profiles on Windows. For the deployment ordering rule (trusted-root profile → SCEP/PKCS client cert → 802.1X network profile), EKU requirements, and per-platform cert-delivery options, see [02-cert-delivery-foundation.md](02-cert-delivery-foundation.md).

### Authentication Mode

Windows exposes an **authentication mode** setting that is not prominently surfaced in the Intune UI -- admin teams frequently miss it and leave it at the default "User" setting, causing pre-logon domain connectivity failures on Hybrid Entra Joined devices (pitfall B-03). Choose the mode based on device join type and connectivity requirements:

| Mode | Device credentials used | User credentials used | When to use |
|---|---|---|---|
| User | No | Yes | Cloud-native Entra Joined devices; user authentication at logon is sufficient for network access |
| Machine (Computer) | Yes | No | Pre-logon domain connectivity required (Group Policy processing, AD logon scripts); device cert required |
| User or machine | Yes (fallback) | Yes (primary) | Hybrid Entra Joined devices; machine auth runs at boot before logon, user auth runs after logon |
| Guest | No | No | Unauthenticated open port access; not used for 802.1X enterprise authentication |

**Machine and User-or-machine modes require a device (machine) SCEP or PKCS certificate profile** assigned to the same device groups as the 802.1X network profile. Without the device certificate, machine authentication has no credential to present and the port remains unauthenticated before user logon.

### Server Validation (PerformServerValidation)

Always enable server validation for all EAP methods on Windows. Always populate **Certificate server names** with the RADIUS server's FQDN or CN suffix. Always reference a Trusted Certificate profile for RADIUS server root CA validation. For the security rationale and rogue-RADIUS risks, see the [PEAP-MSCHAPv2 security note](01-eap-method-overview.md#peap-mschapv2) and [server-name validation](../_glossary-network.md#server-name-validation) in the glossary.

The default Windows EAP XML skeleton ships with server validation disabled -- this default must be explicitly overridden when using XML-import workflows. Leaving Certificate server names blank while server validation is nominally enabled is a misconfiguration that creates a rogue-RADIUS attack surface: a rogue server can complete the outer TLS handshake before the device detects a certificate mismatch, exposing the MSCHAPv2 credential exchange to offline cracking (pitfalls A-05 and C-02). **No example in this guide shows server validation disabled.**

The wired profile exposes two additional server-validation hardening settings not present in the Wi-Fi profile:

- **Disable user prompts for server validation:** Set to **Yes** -- suppresses interactive certificate-trust dialogs that users could click through without understanding the risk.
- **Require cryptographic binding:** Available for PEAP only; adds cryptographic binding between the outer TLS tunnel and the inner MSCHAPv2 exchange to defend against certain MITM attacks.

### Anonymous Outer Identity (Identity Privacy)

Populate the **Identity privacy** field in every Windows 802.1X profile to prevent cleartext identity leakage before the authentication tunnel is established (pitfall C-01). For the inner-outer identity concept, see [inner-outer identity](../_glossary-network.md#inner-outer-identity).

- **EAP-TLS:** The certificate Subject name is sent as the outer EAP identity before the TLS tunnel opens. Set Identity privacy to `anonymous` or `anonymous@contoso.com` to mask the certificate subject.
- **PEAP-MSCHAPv2:** The domain username is sent as the outer EAP identity before the PEAP tunnel opens. Set Identity privacy to `anonymous` or `anonymous@contoso.com` so the username is not visible in cleartext.
- **EAP-TTLS:** The username is sent as the outer EAP identity before the TTLS tunnel opens. Set Identity privacy to `anonymous` or `anonymous@contoso.com`.

The domain suffix in the anonymous identity (e.g., `anonymous@contoso.com`) helps RADIUS servers route the anonymous request to the correct realm when multiple realms share infrastructure. Use a suffix that your RADIUS policy accepts; `anonymous` with no suffix is valid if realm routing is not required.

### Settings Catalog

The Settings Catalog (`Devices > Configuration > New policy > Settings catalog`) also exposes these Wi-Fi settings and may offer more granular options.

---

## Wi-Fi

#### In Intune admin center

Navigation: **Devices** > **Configuration** > **New policy** > **Windows 10 and later** > **Templates** > **Wi-Fi**

Select **Enterprise** as the Wi-Fi type to access EAP authentication settings. The following matrix covers the key per-EAP-method configuration fields. All three EAP methods are co-equal -- no method is ranked or recommended as a default. For when to choose each method, see [01-eap-method-overview.md](01-eap-method-overview.md).

**Wi-Fi per-EAP-method configuration matrix:**

| Setting | EAP-TLS | PEAP-MSCHAPv2 | EAP-TTLS |
|---|---|---|---|
| EAP type field value | EAP - TLS | Protected EAP (PEAP) | EAP-TTLS |
| Certificate server names | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix |
| Root cert for server validation | Trusted Certificate profile reference | Trusted Certificate profile reference | Trusted Certificate profile reference |
| Perform server validation | Enforced via trusted root reference | Yes -- always | Yes -- always |
| Client authentication method | SCEP cert / PKCS cert / Derived credential | Username and Password | Username and Password |
| Inner method | -- (cert-only; no inner method) | MSCHAPv2 (always; not PAP) | PAP / MS-CHAP / MS-CHAPv2 (must match RADIUS policy) |
| Identity privacy (outer identity) | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` |
| Authentication mode | See [Common Profile Mechanics](#authentication-mode) | See [Common Profile Mechanics](#authentication-mode) | See [Common Profile Mechanics](#authentication-mode) |

**Client certificate options for EAP-TLS (Wi-Fi):**
- SCEP certificate profile
- PKCS certificate profile
- Derived credential

For SCEP and PKCS certificate profile configuration, and the deployment ordering rule, see [02-cert-delivery-foundation.md](02-cert-delivery-foundation.md). The [per-platform cert-delivery support matrix](02-cert-delivery-foundation.md#per-platform-cert-delivery-support-matrix) is the canonical reference for certificate delivery availability across all platforms.

**Additional Wi-Fi settings (not per-EAP-method):**

- **Single Sign-On (SSO):** Enable "Perform before user signs in" for pre-logon network access -- typically combined with Machine or User-or-machine authentication mode.
- **PMK caching / pre-authentication:** Optional; reduces re-authentication overhead when roaming between APs on the same SSID.
- **FIPS compliance mode:** Available for regulated environments requiring FIPS 140-2 validated cryptography.
- **XML import:** For settings not exposed in the Intune UI, export a Wi-Fi profile XML from a configured Windows device and import it into the Intune profile.
