---
last_verified: 2026-06-30
review_by: 2026-09-28
applies_to: both
audience: admin
platform: android
---

> **Prerequisites:** Complete [EAP Method Overview](01-eap-method-overview.md) and
> [Certificate Delivery Foundation](02-cert-delivery-foundation.md) before this guide.

# Android Enterprise 802.1X Admin Setup: Wi-Fi

> **Scope:** Intune client-side configuration only. RADIUS/NPS server assumed to exist. [Full scope exclusion list](02-cert-delivery-foundation.md#canonical-scope-callout).

## Common Profile Mechanics

Android Enterprise 802.1X requires three distinct Intune configuration profiles -- not a single combined configuration. Deploy them in this sequence:

1. A **Trusted Certificate** profile delivering the RADIUS server's root CA certificate (for server validation).
2. A **SCEP** or **PKCS** client certificate profile delivering the device identity certificate (for client authentication).
3. A **Wi-Fi** network profile referencing the trusted certificate and client certificate profiles above.

For the deployment ordering rule (trusted-root profile → SCEP/PKCS client cert → Wi-Fi network profile), EKU requirements, and per-platform cert-delivery options, see [Certificate Delivery Foundation](02-cert-delivery-foundation.md).

Android Enterprise does not expose a User / Machine / User-or-machine authentication mode selector in Intune profiles. Windows-trained admins who expect this setting will not find it on Android Enterprise. Android authenticates as the current context only; machine-level pre-logon authentication is not available through Intune Android Enterprise 802.1X profiles.

### Server Validation

Always populate the server name field for every EAP method, and always reference a **Root certificate for server validation** profile. This is a security requirement, not merely a configuration option.

For the rogue-RADIUS / credential-harvest rationale behind server validation, see the [PEAP-MSCHAPv2 security note](01-eap-method-overview.md#peap-mschapv2), the [Certificate Delivery Foundation](02-cert-delivery-foundation.md), and [server-name validation](../_glossary-network.md#server-name-validation) in the glossary. For Android-specific RADIUS server-name behavior (Android 11+/14+ version gates), see [RADIUS Server-Name Validation](02-cert-delivery-foundation.md#radius-server-name-validation). **No example in this guide shows server validation disabled.**

### Anonymous Outer Identity (Identity Privacy)

Populate the **Identity privacy (outer identity)** field in every Android Enterprise 802.1X profile to prevent cleartext identity leakage before the authentication tunnel is established. For the inner-outer identity concept, see [inner-outer identity](../_glossary-network.md#inner-outer-identity).

- **EAP-TLS:** The certificate Subject name is sent as the outer EAP identity before the TLS tunnel opens. Set Identity privacy to `anonymous` or `anonymous@contoso.com` to mask the certificate subject.
- **PEAP-MSCHAPv2:** The domain username is sent as the outer EAP identity before the PEAP tunnel opens. Set Identity privacy to `anonymous` or `anonymous@contoso.com` so the username is not visible in cleartext.
- **EAP-TTLS:** The username is sent as the outer EAP identity before the TTLS tunnel opens. Set Identity privacy to `anonymous` or `anonymous@contoso.com`.

The domain suffix in the anonymous identity (e.g., `anonymous@contoso.com`) helps RADIUS servers route the anonymous request to the correct realm when multiple realms share infrastructure. Use a suffix that your RADIUS policy accepts; `anonymous` with no suffix is valid if realm routing is not required.

---

## Wi-Fi

### In Intune admin center

Navigation: **Devices** > **Configuration** > **New policy** > **Android Enterprise** > **Templates** > **Wi-Fi**

Select **Wi-Fi type: Enterprise** to access EAP authentication settings. The following matrix covers the key per-EAP-method configuration fields. All three EAP methods are co-equal -- no method is ranked or recommended as a default. For when to choose each method, see [01-eap-method-overview.md](01-eap-method-overview.md).

All Android Enterprise enrollment modes use the same Templates > Wi-Fi path in Intune. The matrix below documents the per-tab UI field-name delta between corporate-owned and personally-owned modes.

| Enrollment mode | Tab in Intune | Server name field | Key delta |
|---|---|---|---|
| Fully managed (COBO) | Corporate-owned | **Radius server name** | Android 11+/14+ version gates apply; cert-access approval needed |
| Corporate-owned Work Profile (COPE) | Corporate-owned | **Radius server name** | Android 11+/14+ version gates apply; cert-access approval needed |
| Dedicated (COSU) | Corporate-owned | **Radius server name** | Android 11+/14+ version gates apply; cert-access approval needed |
| Personally owned Work Profile (BYOD-WP) | Personally owned | **Certificate server names** | UPN-in-SAN required; profile deployment fails if absent (see [WARNING below](#wi-fi)) |

AOSP (Android Open Source Project) devices share the same Intune Wi-Fi profile path but are a distinct no-GMS platform out of scope for this guide; cert-delivery options differ (no PKCS Imported).

**Wi-Fi per-EAP-method configuration matrix:**

| Setting | EAP-TLS | PEAP-MSCHAPv2 | EAP-TTLS |
|---|---|---|---|
| EAP type field value | EAP-TLS | PEAP | EAP-TTLS |
| Server name field (corporate-owned/AOSP) | **Radius server name** (DNS suffix or FQDN; Android 11+/14+ gates apply) | **Radius server name** | **Radius server name** |
| Server name field (BYOD personally-owned) | **Certificate server names** (FQDN or CN suffix; wildcard suffix supported) | **Certificate server names** | **Certificate server names** |
| Root certificate for server validation | Trusted Certificate profile reference | Trusted Certificate profile reference | Trusted Certificate profile reference |
| Client authentication | Certificates: SCEP, PKCS, or Derived credential | Username and Password | Username and Password, or Certificates (SCEP / PKCS) |
| Inner method (Non-EAP / inner identity) | -- (cert-only; no inner method) | None, or Microsoft CHAP Version 2 (MS-CHAP v2) | Unencrypted password (PAP) / Microsoft CHAP (MS-CHAP) / Microsoft CHAP Version 2 (MS-CHAP v2) |
| Identity privacy (outer identity) | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` |

For SCEP and PKCS certificate profile configuration, and the deployment ordering rule, see [Certificate Delivery Foundation](02-cert-delivery-foundation.md). The [per-platform cert-delivery support matrix](02-cert-delivery-foundation.md#per-platform-cert-delivery-support-matrix) documents certificate delivery availability across all platforms.
