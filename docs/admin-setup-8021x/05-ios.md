---
last_verified: 2026-06-30
review_by: 2026-09-28
applies_to: both
audience: admin
platform: ios
---

> **Prerequisites:** Complete [EAP Method Overview](01-eap-method-overview.md) and
> [Certificate Delivery Foundation](02-cert-delivery-foundation.md) before this guide.

# iOS/iPadOS 802.1X Admin Setup: Wi-Fi and Wired

> **Scope:** Intune client-side configuration only. RADIUS/NPS server assumed to exist. [Full scope exclusion list](02-cert-delivery-foundation.md#canonical-scope-callout).

## Common Profile Mechanics

iOS/iPadOS 802.1X requires three distinct Intune configuration profiles -- not a single combined configuration. Deploy them in this sequence:

1. A **Trusted Certificate** profile delivering the RADIUS server's root CA certificate (for server validation).
2. A **SCEP** or **PKCS** client certificate profile delivering the device identity certificate (for client authentication -- Wi-Fi only; wired requires SCEP only, see Wired section).
3. A **Wi-Fi** or **Wired network** profile referencing the trusted certificate and client certificate profiles above.

There is no combined `.mobileconfig` workflow in this guide -- each profile is a separate Intune policy. Manual profile delivery outside Intune is out of scope; this guide covers Intune-managed-fleet configuration only. For the deployment ordering rule (trusted-root profile → SCEP/PKCS client cert → 802.1X network profile), EKU requirements, and per-platform cert-delivery options, see [Certificate Delivery Foundation](02-cert-delivery-foundation.md).

iOS/iPadOS does not expose a User / Machine / User-or-machine authentication mode selector in Intune profiles. Windows-trained admins who expect this setting will not find it on iOS or macOS. iOS authenticates as the current user context only; machine-level pre-logon authentication is not available through Intune iOS 802.1X profiles.

### Server Validation

Always populate **Certificate server names** for every EAP method on both Wi-Fi and wired connections, and always reference a **Root certificate for server validation** profile. This is a security requirement, not merely a configuration option.

**Why this matters on iOS/iPadOS:** Without Certificate server names populated, iOS presents a dynamic trust dialog that users must approve on every connection attempt. Populating the field bypasses this dialog and eliminates the user-facing prompt. Additionally, on iOS and macOS, disabling server validation in a managed profile is flagged as a security violation by the OS.

For the rogue-RADIUS / credential-harvest rationale behind server validation, see the [PEAP-MSCHAPv2 security note](01-eap-method-overview.md#peap-mschapv2), the [Certificate Delivery Foundation](02-cert-delivery-foundation.md), and [server-name validation](../_glossary-network.md#server-name-validation) in the glossary. **No example in this guide shows server validation disabled.**

### Anonymous Outer Identity (Identity Privacy)

Populate the **Identity privacy (outer identity)** field in every iOS/iPadOS 802.1X profile to prevent cleartext identity leakage before the authentication tunnel is established. For the inner-outer identity concept, see [inner-outer identity](../_glossary-network.md#inner-outer-identity).

- **EAP-TLS:** The certificate Subject name is sent as the outer EAP identity before the TLS tunnel opens. Set Identity privacy to `anonymous` or `anonymous@contoso.com` to mask the certificate subject.
- **PEAP-MSCHAPv2:** The domain username is sent as the outer EAP identity before the PEAP tunnel opens. Set Identity privacy to `anonymous` or `anonymous@contoso.com` so the username is not visible in cleartext.
- **EAP-TTLS:** The username is sent as the outer EAP identity before the TTLS tunnel opens. Set Identity privacy to `anonymous` or `anonymous@contoso.com`.

The domain suffix in the anonymous identity (e.g., `anonymous@contoso.com`) helps RADIUS servers route the anonymous request to the correct realm when multiple realms share infrastructure. Use a suffix that your RADIUS policy accepts; `anonymous` with no suffix is valid if realm routing is not required.

---

## Wi-Fi

### In Intune admin center

Navigation: **Devices** > **Configuration** > **New policy** > **iOS/iPadOS** > **Templates** > **Wi-Fi**

Select **Wi-Fi type: Enterprise** to access EAP authentication settings. The following matrix covers the key per-EAP-method configuration fields. All three EAP methods are co-equal -- no method is ranked or recommended as a default. For when to choose each method, see [01-eap-method-overview.md](01-eap-method-overview.md).

**MAC address randomization (iOS 14.0+ / iPadOS 14.0+):**

For NAC (Network Access Control) environments where the RADIUS policy is keyed to device MAC address, set **Disable MAC address randomization: Yes** in the Wi-Fi profile. With this option enabled, the device presents its actual Wi-Fi MAC address instead of the per-network randomized MAC that iOS 14+ uses by default. Without this setting, NAC environments will see a different MAC each time the device joins a new network, causing RADIUS to reject devices whose randomized MACs are not in the allow list.

Wired connections are unaffected -- the USB-Ethernet adapter presents its physical MAC address automatically; there is no equivalent randomization setting in the iOS wired profile.

*last_verified: 2026-06-30 · review_by: 2026-09-28*

**Wi-Fi per-EAP-method configuration matrix:**

| Setting | EAP-TLS | PEAP-MSCHAPv2 | EAP-TTLS |
|---|---|---|---|
| EAP type field value | EAP-TLS | PEAP | EAP-TTLS |
| Certificate server names | RADIUS FQDN or CN suffix (wildcard suffix supported, e.g. `*.contoso.com`) | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix |
| Root certificate for server validation | Trusted Certificate profile reference | Trusted Certificate profile reference | Trusted Certificate profile reference |
| Client authentication | Certificates: SCEP, PKCS, or Derived credential (see note) | Username and Password (implicit MS-CHAPv2; no inner-method selector) | Username and Password, or Certificates (SCEP / PKCS / Derived credential) |
| Inner method (Non-EAP method / inner identity) | -- (cert-only; no inner method) | -- (no inner-method selector; MS-CHAPv2 implicit -- see WARNING below) | PAP / CHAP / MS-CHAP / MS-CHAP v2 |
| Identity privacy (outer identity) | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` |

> **WARNING -- PEAP inner authentication on iOS/iPadOS: MS-CHAPv2 only (PAP not supported)**
>
> iOS/iPadOS PEAP inner authentication is always MS-CHAPv2. The Intune Wi-Fi profile UI for
> iOS/iPadOS PEAP does not present an inner-method selector -- **there is no PAP option to
> select.** If PAP is injected via a custom profile or imported configuration, the result is an
> immediate **"Authentication Failed"** error; iOS sends an EAP-NAK to the RADIUS server.
>
> **This can mask a mixed-fleet issue:** macOS and Windows devices on the same SSID
> configured with PEAP+PAP may authenticate successfully while iOS devices fail. The
> surface symptom -- "Authentication Failed" on iOS only, same SSID -- is a strong
> indicator of a PEAP inner-auth mismatch.
>
> Always configure PEAP inner auth as MS-CHAPv2 on any SSID where iOS/iPadOS devices
> must authenticate.

**Client certificate options for EAP-TLS (Wi-Fi -- SCEP, PKCS, and Derived credential supported):**
- SCEP certificate profile
- PKCS certificate profile
- Derived credential (iOS/iPadOS; for platforms using PIV/CAC-based credentials)

For SCEP and PKCS certificate profile configuration, and the deployment ordering rule, see [02-cert-delivery-foundation.md](02-cert-delivery-foundation.md). The [per-platform cert-delivery support matrix](02-cert-delivery-foundation.md#per-platform-cert-delivery-support-matrix) documents certificate delivery availability across all platforms.

---

## Wired

The iOS/iPadOS wired 802.1X profile targets M-series iPads equipped with a USB-Ethernet adapter. The typical deployment scenario is multi-iPad shared-use environments -- classrooms, labs, and shared workstation pools -- where wired Ethernet provides more reliable connectivity than Wi-Fi. Confirm that target devices are M-series iPads before deploying this profile type, as wired 802.1X is not available on all iPad models.

### In Intune admin center

Navigation: **Devices** > **Configuration** > **New policy** > **iOS/iPadOS** > **Templates** > **Wired network**

> **NOTE -- Wired client certificates: SCEP only (PKCS not supported)**
>
> The iOS/iPadOS wired network profile supports only **SCEP certificate profiles** for client
> authentication across all three EAP types (EAP-TLS, EAP-TTLS, and PEAP). PKCS certificate
> profiles are not supported for the wired profile type. Wi-Fi profiles support both SCEP
> and PKCS.
>
> If your organization uses PKCS-only certificate delivery, configure your SCEP
> infrastructure before deploying wired 802.1X on iOS/iPadOS. See
> [02-cert-delivery-foundation.md](02-cert-delivery-foundation.md#per-platform-cert-delivery-support-matrix)
> for the per-platform cert-delivery support matrix.

Network Interface is automatically set to **Any Ethernet** -- the iOS/iPadOS wired profile targets any available USB-Ethernet interface; no selection is required (unlike macOS, which provides a Network Interface selector).

**Wired per-EAP-method configuration matrix:**

All three EAP methods are co-equal configuration paths -- no method is ranked or recommended as a default.

| Setting | EAP-TLS | PEAP-MSCHAPv2 | EAP-TTLS |
|---|---|---|---|
| EAP type field value | EAP-TLS | PEAP | EAP-TTLS |
| Server Trust -- Certificate server names | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix |
| Root certificate for server validation | Trusted Certificate profile reference | Trusted Certificate profile reference | Trusted Certificate profile reference |
| Client Authentication method | Certificates: SCEP only (PKCS not supported) | Certificates: SCEP only (PKCS not supported); no Username/Password option in wired UI (via Templates path) | Certificates: SCEP only (PKCS not supported); no inner-auth-method selector in wired UI (via Templates path) |
| Inner method (Non-EAP method / inner identity) | -- (cert-only; no inner method) | -- (cert-only in wired UI; for PEAP + username/password, use a Wi-Fi profile -- see Wi-Fi PEAP WARNING above) | -- (cert-only in wired UI via Templates path; inner auth via username/password not exposed in wired Intune UI -- verify in Intune console if username/password EAP-TTLS on wired is required) |
| Identity privacy (outer identity) | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` |

For PEAP inner authentication context -- the wired Intune UI (Templates path) exposes only Certificates (SCEP) as the client authentication method for wired PEAP; there is no MS-CHAPv2 or username/password path in the wired zone. For the iOS PEAP inner-auth constraint and symptom, see the [PEAP "What breaks" WARNING in the Wi-Fi section](#wi-fi).

For SCEP certificate profile configuration and the deployment ordering rule, see [02-cert-delivery-foundation.md](02-cert-delivery-foundation.md). PKCS is not available for iOS/iPadOS wired profiles -- see the [per-platform cert-delivery support matrix](02-cert-delivery-foundation.md#per-platform-cert-delivery-support-matrix).

---

## See Also

- [EAP Method Overview](01-eap-method-overview.md) -- co-equal EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS comparison; when-to-choose guidance
- [Certificate Delivery Foundation](02-cert-delivery-foundation.md) -- deployment ordering rule, EKU requirements, SCEP/PKCS cert delivery, per-platform cert matrix (incl. iOS wired PKCS not supported)
- [Network Authentication Glossary](../_glossary-network.md) -- 802.1X, EAP, RADIUS, supplicant, server-name validation, inner-outer identity, SCEP, PKCS, trusted root

---

## Change History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-30 | Initial version -- iOS/iPadOS 802.1X admin setup: Wi-Fi + wired profiles for EAP-TLS / PEAP / EAP-TTLS; MAC-address randomization note (iOS 14+); M-series iPad wired use case; wired SCEP-only callout; PEAP "What breaks" callout | -- |
