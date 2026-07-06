---
doc_id: RE-138
status: Approved
owner: Intune Admin Lead
doc_type: Guide
last_verified: 2026-06-30
review_by: 2026-09-28
applies_to: both
audience: admin
platform: macos
---

**Platform:** macOS · **Doc Type:** Guide · **Doc ID:** RE-138 · **Status:** Approved

# macOS 802.1X Admin Setup: Wi-Fi and Wired

## Summary

[FILL-IN: >=30 words, per-platform-template (macOS) Summary lead]

> **Prerequisites:** Complete [EAP Method Overview](01-eap-method-overview.md) and
> [Certificate Delivery Foundation](02-cert-delivery-foundation.md) before this guide.

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

For the rogue-RADIUS / credential-harvest rationale behind server validation, see the [PEAP-MSCHAPv2 security note](01-eap-method-overview.md#peap-mschapv2), the [Certificate Delivery Foundation](02-cert-delivery-foundation.md), and [server-name validation](../_glossary-network.md#server-name-validation) in the glossary. **No example in this guide shows server validation disabled.**

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

---

## Wired

macOS Wi-Fi and wired 802.1X use separate Intune profile types and are configured independently.

### In Intune admin center

Navigation: **Devices** > **Configuration** > **New policy** > **macOS** > **Templates** > **Wired network**

> **NOTE -- Wired client certificates: SCEP only (PKCS not supported)**
>
> The macOS wired network profile supports only **SCEP certificate profiles** for client
> authentication (EAP-TLS and EAP-TTLS / PEAP certificate inner auth). PKCS certificate
> profiles are not supported for the wired profile type. Wi-Fi profiles support both SCEP
> and PKCS.
>
> If your organization uses PKCS-only certificate delivery, configure your SCEP
> infrastructure before deploying wired 802.1X on macOS. See
> [02-cert-delivery-foundation.md](02-cert-delivery-foundation.md#per-platform-cert-delivery-support-matrix)
> for the per-platform cert-delivery support matrix.

**Network Interface selector:**

The **Network Interface** field determines which Ethernet interface is configured for 802.1X. Select the option that matches the target device hardware.

| Option | Behavior |
|--------|----------|
| **First active Ethernet** (default) | Uses the first working Ethernet interface. If no active interface is found, falls to the next in service-order priority. macOS system default. |
| Second active Ethernet | Uses the second working Ethernet interface; falls to next in service-order priority if none active. |
| Third active Ethernet | Uses the third working Ethernet interface; falls to next in service-order priority if none active. |
| First Ethernet | Non-active variant -- not restricted to currently working interfaces. |
| Second Ethernet | Non-active variant. |
| Third Ethernet | Non-active variant. |
| Any Ethernet | Applies to any available Ethernet interface on the device. |

Options with "active" in the name use interfaces that are actively working on the device. If no active interfaces exist, the next interface in service-order priority is configured.

Populating **Certificate server names** also bypasses the dynamic trust window shown on user devices when they connect to the wired network -- the wired-specific expression of the behavior described in [Common Profile Mechanics](#common-profile-mechanics).

**Wired per-EAP-method configuration matrix:**

All three EAP methods are co-equal configuration paths -- no method is ranked or recommended as a default.

| Setting | EAP-TLS | PEAP-MSCHAPv2 | EAP-TTLS |
|---|---|---|---|
| EAP type field value | EAP-TLS | PEAP | EAP-TTLS |
| Server Trust -- Certificate server names | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix |
| Root certificate for server validation | Trusted Certificate profile reference | Trusted Certificate profile reference | Trusted Certificate profile reference |
| Client Authentication method | Certificates (SCEP only; PKCS not supported) | Username and Password | Username and Password |
| Inner method (Non-EAP method / inner identity) | -- (cert-only; no inner method) | -- (PEAP tunnels MSCHAPv2; inner not separately selectable) | PAP / CHAP / MS-CHAP / MS-CHAP v2 |
| Identity privacy (outer identity) | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` |

For SCEP certificate profile configuration and the deployment ordering rule, see [02-cert-delivery-foundation.md](02-cert-delivery-foundation.md). PKCS is not available for macOS wired profiles -- see the [per-platform cert-delivery support matrix](02-cert-delivery-foundation.md#per-platform-cert-delivery-support-matrix).

---

## See Also

- [EAP Method Overview](01-eap-method-overview.md) -- co-equal EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS comparison; when-to-choose guidance
- [Certificate Delivery Foundation](02-cert-delivery-foundation.md) -- deployment ordering rule, EKU requirements, SCEP/PKCS cert delivery, per-platform cert matrix
- [Network Authentication Glossary](../_glossary-network.md) -- 802.1X, EAP, RADIUS, supplicant, server-name validation, inner-outer identity, SCEP, PKCS, trusted root

---

## Change History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-30 | Initial version -- macOS 802.1X admin setup: Wi-Fi + wired profiles for EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS; immutable deployment-channel WARNING; wired SCEP-only callout; dynamic trust dialog suppression | -- |

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-07-06 | v1.15 EEE reformat — content not re-reviewed | — |