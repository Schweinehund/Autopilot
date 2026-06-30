---
last_verified: 2026-06-30
review_by: 2026-09-28
applies_to: both
audience: admin
platform: macos
---

> **Prerequisites:** Complete [EAP Method Overview](01-eap-method-overview.md) and
> [Certificate Delivery Foundation](02-cert-delivery-foundation.md) before this guide.

# macOS 802.1X Admin Setup: Wi-Fi and Wired

> **Scope:** Intune client-side configuration only. RADIUS/NPS server assumed to exist. [Full scope exclusion list](02-cert-delivery-foundation.md#canonical-scope-callout).

## Common Profile Mechanics

This section covers settings that apply to both Wi-Fi and wired 802.1X profiles on macOS. For the deployment ordering rule (trusted-root profile → SCEP/PKCS client cert → 802.1X network profile), EKU requirements, and per-platform cert-delivery options, see [02-cert-delivery-foundation.md](02-cert-delivery-foundation.md).

> **WARNING -- Deployment channel: choose before creating the profile**
>
> The **Deployment channel** setting determines where authentication certificates are stored
> on the device and **cannot be changed after the profile is assigned**. To correct a wrong
> channel selection, you must delete the profile, create a new one with the correct channel,
> and reassign it to device groups.
>
> | Certificate type | Deployment channel | Keychain |
> |------------------|--------------------|----------|
> | User certificate | User channel | User keychain |
> | Device certificate | Device channel | System keychain |
>
> Storing user certificates in the system keychain (by selecting Device channel with a user
> certificate) increases security risk and causes authentication failures. When authentication
> certificates are up for renewal, recheck the deployment channel in existing profiles to
> confirm the correct channel is still selected.

macOS does not expose a User / Machine / User-or-machine authentication mode selector in Intune profiles. Windows-trained admins who expect this setting will not find it on macOS. The Deployment channel (User vs Device keychain) is macOS's analog to the credential-context decision: user certificate + User channel authenticates as the current user; device certificate + Device channel authenticates as the device. Machine-level pre-logon authentication (Group Policy dependency, pre-logon domain connectivity) is not available through Intune macOS 802.1X profiles.

### Server Validation

Always populate **Certificate server names** for every EAP method on both Wi-Fi and wired connections, and always reference a **Root certificate for server validation** profile. This is a security requirement, not merely a configuration option.

**Why this matters on macOS:** Without Certificate server names populated, macOS presents a dynamic trust dialog that users must click through on every connection attempt. Populating the field bypasses this dialog and eliminates the user-facing prompt. Additionally, on iOS and macOS, disabling server validation in a managed profile is flagged as a security violation by the OS.

For the rogue-RADIUS / credential-harvest rationale behind server validation, see the [PEAP-MSCHAPv2 security note](01-eap-method-overview.md#peap-mschapv2) and [server-name validation](../_glossary-network.md#server-name-validation) in the glossary. **No example in this guide shows server validation disabled.**

### Anonymous Outer Identity (Identity Privacy)

Populate the **Identity privacy (outer identity)** field in every macOS 802.1X profile to prevent cleartext identity leakage before the authentication tunnel is established. For the inner-outer identity concept, see [inner-outer identity](../_glossary-network.md#inner-outer-identity).

- **EAP-TLS:** The certificate Subject name is sent as the outer EAP identity before the TLS tunnel opens. Set Identity privacy to `anonymous` or `anonymous@contoso.com` to mask the certificate subject.
- **PEAP-MSCHAPv2:** The domain username is sent as the outer EAP identity before the PEAP tunnel opens. Set Identity privacy to `anonymous` or `anonymous@contoso.com` so the username is not visible in cleartext.
- **EAP-TTLS:** The username is sent as the outer EAP identity before the TTLS tunnel opens. Set Identity privacy to `anonymous` or `anonymous@contoso.com`.

The domain suffix in the anonymous identity (e.g., `anonymous@contoso.com`) helps RADIUS servers route the anonymous request to the correct realm when multiple realms share infrastructure. Use a suffix that your RADIUS policy accepts; `anonymous` with no suffix is valid if realm routing is not required.

---

## Wi-Fi

### In Intune admin center

Navigation: **Devices** > **Configuration** > **New policy** > **macOS** > **Templates** > **Wi-Fi**

Select **Wi-Fi type: Enterprise** to access EAP authentication settings. The following matrix covers the key per-EAP-method configuration fields. All three EAP methods are co-equal -- no method is ranked or recommended as a default. For when to choose each method, see [01-eap-method-overview.md](01-eap-method-overview.md).

**Wi-Fi per-EAP-method configuration matrix:**

| Setting | EAP-TLS | PEAP-MSCHAPv2 | EAP-TTLS |
|---|---|---|---|
| EAP type field value | EAP-TLS | PEAP | EAP-TTLS |
| Certificate server names | RADIUS FQDN or CN suffix (wildcard suffix supported, e.g. `*.contoso.com`) | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix |
| Root certificate for server validation | Trusted Certificate profile reference | Trusted Certificate profile reference | Trusted Certificate profile reference |
| Client authentication | Certificates: SCEP or PKCS profile (see note) | Username and Password | Username and Password |
| Inner method (Non-EAP method / inner identity) | -- (cert-only; no inner method) | -- (PEAP tunnels MSCHAPv2; inner not separately selectable) | PAP / CHAP / MS-CHAP / MS-CHAP v2 |
| Identity privacy (outer identity) | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` |

**Client certificate options for EAP-TLS (Wi-Fi -- both SCEP and PKCS supported):**
- SCEP certificate profile
- PKCS certificate profile

For SCEP and PKCS certificate profile configuration, and the deployment ordering rule, see [02-cert-delivery-foundation.md](02-cert-delivery-foundation.md). The [per-platform cert-delivery support matrix](02-cert-delivery-foundation.md#per-platform-cert-delivery-support-matrix) documents certificate delivery availability across all platforms.
