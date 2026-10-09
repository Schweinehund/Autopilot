---
doc_id: RE-140
status: Approved
owner: Intune Admin Lead
doc_type: Guide
last_verified: 2026-06-30
review_by: 2026-09-28
applies_to: both
audience: admin
platform: android
---

**Platform:** Android · **Doc Type:** Guide · **Doc ID:** RE-140 · **Status:** Approved

# Android Enterprise 802.1X Admin Setup: Wi-Fi

## Summary

This guide covers Android Enterprise 802.1X Wi-Fi network profile configuration through Intune across Fully Managed (COBO), Corporate-Owned Work Profile (COPE), Dedicated (COSU), and Personally Owned Work Profile (BYOD-WP) enrollment modes, including certificate access and UPN-in-SAN requirements. It requires an Intune administrator role and, for enrollment provisioning, Managed Google Play and Zero-Touch portal access where applicable. A separate section covers 802.1X Wi-Fi for Samsung devices that Knox Manage manages instead of Intune.

> **Prerequisites:** Complete [EAP Method Overview](01-eap-method-overview.md) and
> [Certificate Delivery Foundation](02-cert-delivery-foundation.md) before this guide.

> **Scope:** Intune and Knox Manage client-side configuration. RADIUS/NPS server assumed to exist. [Full scope exclusion list](02-cert-delivery-foundation.md#canonical-scope-callout).

## Common Profile Mechanics

Android Enterprise 802.1X requires three distinct Intune configuration profiles -- not a single combined configuration. Deploy them in this sequence:

1. A **Trusted Certificate** profile delivering the RADIUS server's root CA certificate (for server validation).
2. A **SCEP** or **PKCS** client certificate profile delivering the device identity certificate (for client authentication).
3. A **Wi-Fi** network profile referencing the trusted certificate and client certificate profiles.

For the deployment ordering rule (trusted-root profile → SCEP/PKCS client cert → Wi-Fi network profile), EKU requirements, and per-platform cert-delivery options, see [Certificate Delivery Foundation](02-cert-delivery-foundation.md).

Android Enterprise does not expose a User / Machine / User-or-machine authentication mode selector in Intune profiles. Windows-trained administrators who expect this setting do not find it on Android Enterprise. Android authenticates as the current context only; machine-level pre-logon authentication is not available through Intune Android Enterprise 802.1X profiles.

### Server Validation

Always populate the server name field for every EAP method, and always reference a **Root certificate for server validation** profile. This is a security requirement, not merely a configuration option.

For the rogue-RADIUS / credential-harvest rationale behind server validation, see the [PEAP-MSCHAPv2 security note](01-eap-method-overview.md#peap-mschapv2), the [Certificate Delivery Foundation](02-cert-delivery-foundation.md), and [server-name validation](../_glossary-network.md#server-name-validation) in the glossary. For Android-specific RADIUS server-name behavior (Android 11+/14+ version gates), see [RADIUS Server-Name Validation](02-cert-delivery-foundation.md#radius-server-name-validation). **No example in this guide shows server validation disabled.**

### Anonymous Outer Identity (Identity Privacy)

Populate the **Identity privacy (outer identity)** field in every Android Enterprise 802.1X profile to prevent cleartext identity leakage before the authentication tunnel is established. For the inner-outer identity concept, see [inner-outer identity](../_glossary-network.md#inner-outer-identity).

- **EAP-TLS:** The certificate Subject name is sent as the outer EAP identity before the TLS tunnel opens. Set Identity privacy to `anonymous` or `anonymous@contoso.com` to mask the certificate subject.
- **PEAP-MSCHAPv2:** The domain username is sent as the outer EAP identity before the PEAP tunnel opens. Set Identity privacy to `anonymous` or `anonymous@contoso.com` so the username is not visible in cleartext.
- **EAP-TTLS:** The username is sent as the outer EAP identity before the TTLS tunnel opens. Set Identity privacy to `anonymous` or `anonymous@contoso.com`.

The domain suffix in the anonymous identity (for example, `anonymous@contoso.com`) helps RADIUS servers route the anonymous request to the correct realm when multiple realms share infrastructure. Use a suffix that your RADIUS policy accepts; `anonymous` with no suffix is valid if realm routing is not required.

---

## Wi-Fi

### In Intune admin center

Navigation: **Devices** > **Configuration** > **New policy** > **Android Enterprise** > **Templates** > **Wi-Fi**

Select **Wi-Fi type: Enterprise** to access EAP authentication settings. The following matrix covers the key per-EAP-method configuration fields. All three EAP methods are co-equal -- no method is ranked or recommended as a default. For when to choose each method, see [01-eap-method-overview.md](01-eap-method-overview.md).

All Android Enterprise enrollment modes use the same Templates > Wi-Fi path in Intune. The following matrix documents the per-tab UI field-name delta between corporate-owned and personally-owned modes.

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

For SCEP and PKCS certificate profile configuration, and the deployment ordering rule, see [Certificate Delivery Foundation](02-cert-delivery-foundation.md). The [per-platform cert-delivery support matrix](02-cert-delivery-foundation.md#per-platform-cert-delivery-support-matrix) documents certificate delivery availability across all platforms. For a personally owned work profile (BYOD-WP), the certificate SAN must include the UPN -- see the UPN-in-SAN deployment-failure WARNING that follows before configuring the SCEP profile.

**WARNING -- Personally owned work profile (BYOD-WP): Wi-Fi profile deployment fails if UPN is absent from certificate SAN**

When using any EAP type (EAP-TLS, PEAP-MSCHAPv2, or EAP-TTLS) with certificates for authentication in a **personally owned work profile**, the User Principal Name (UPN) must be present in the Subject Alternative Name (SAN) of the certificate -- for both user and device certificates within the work-profile context. If the UPN is absent from the SAN, the Wi-Fi profile shows **"Error"** in Intune and **profile deployment fails** -- the profile is not delivered to the device; this is not a post-deployment authentication failure.

**Fix:** In the SCEP certificate profile for Android Enterprise personally owned work profile, add **User principal name (UPN)** as a SAN attribute. Once the SCEP profile includes the UPN in the SAN, the Wi-Fi profile deploys successfully.

**Certificate access for Device Owner modes (COBO, COPE, COSU):**

In the SCEP certificate profile for Android Enterprise Device Owner enrollment types, configure **Certificate access** to **Grant silently for specific apps** and include the Wi-Fi supplicant in the allowed apps list. The default setting ("Require user approval for all apps") is silently rejected on fully managed devices where no user interaction is available, causing 802.1X authentication to fail even when the certificate profile shows "Succeeded" in Intune.

Note: For Device Owner profiles, Intune certificate reporting is unavailable and Intune cannot revoke certificates delivered through this profile type.

**WARNING -- Android RADIUS server name version requirements (Radius server name field)**

The following version gates apply to the **Radius server name** field in the corporate-owned and AOSP tabs. The personally-owned (BYOD-WP) tab uses the **Certificate server names** field and does not carry these version-specific sub-requirements. Server-name validation as a security requirement applies to all modes; see [Certificate Delivery Foundation](02-cert-delivery-foundation.md).

| Android version | Behavior |
|---|---|
| Android 11+ | New Wi-Fi profiles might require the Radius server name field to be configured. Without it, devices may not connect to the Wi-Fi network. |
| Android 14+ | Total combined length of all configured RADIUS server names must be 256 characters or fewer; special characters not permitted. Profiles that worked on Android 11--13 may silently fail on Android 14 devices. **Use the DNS suffix** (for example, `contoso.com`) instead of a list of full FQDNs to stay within the 256-character limit. |

*last_verified: 2026-06-30 · review_by: 2026-09-28*

**MAC address randomization (Android 13+):**

For NAC (Network Access Control) environments where the RADIUS policy is keyed to device MAC address, set **Use device MAC** in the Wi-Fi profile. With this option, the device presents its actual Wi-Fi MAC address instead of the per-network randomized MAC. The full set of options is: **Use device default / Use randomized MAC / Use device MAC**. Without "Use device MAC", NAC environments see a different MAC address each time the device joins a new network, causing RADIUS to reject devices whose MACs are not in the allow list.

*last_verified: 2026-06-30 · review_by: 2026-09-28*

---

## Wired

**Android Enterprise has no native Intune wired-network profile type.** Unlike Windows, macOS, and iOS/iPadOS -- which each have a dedicated Intune wired (Ethernet) network profile -- there is no equivalent profile type for Android Enterprise and no documented OMA-URI workaround. Organizations that require wired 802.1X authentication for Android Enterprise devices must consult their network or infrastructure team for switch-side configuration options (such as port-based authentication or alternative access policies) outside of Intune's device management surface. Android Enterprise Wi-Fi 802.1X is fully supported through Intune; see the [Wi-Fi section](#wi-fi).

---

<a id="knox-manage-8021x-wi-fi"></a>
## Knox Manage 802.1X Wi-Fi

Use this section only for Samsung devices that Knox Manage manages. Knox Manage is Samsung's own MDM, and this corpus treats it as an alternative to Intune rather than a companion to it; see the [Knox SKU disambiguation](../admin-setup-android/07-knox-mobile-enrollment.md#sku-disambiguation). None of the Intune profiles in the preceding sections reach a device that Knox Manage manages, so you configure the trusted root, the client certificate, and the Wi-Fi network in the Knox Manage console instead.

The steps follow Samsung's documentation for the Knox Manage original console. Samsung's [new console Android Enterprise policies reference](https://docs.samsungknox.com/admin/knox-manage/new-console/manage-profiles-and-policies/android-enterprise-policies/) (last updated October 8, 2026) lists **802.1xEAP** as a **Security type** value but documents none of its EAP fields, so this section doesn't describe the new console. These steps weren't pilot-tested in this environment.

### Register the Certificates

Register the RADIUS server's root CA certificate in Knox Manage before you create the Wi-Fi policy. Samsung's [external certificates guide](https://docs.samsungknox.com/admin/knox-manage/original-console/configure/certificates/external-certificates/) (last updated January 22, 2024) documents these steps:

1. In the Knox Manage console, go to **Advanced** > **Certificate** > **External Certificate**, and then click **Add**.
2. In **Purpose**, select **Wi-Fi**.
3. In **Type**, select **Root**.
4. Upload the certificate file in CER, DER, PFX, or P12 format, and then click **Save**.

How you register the client certificate depends on the **Select certificate to use** value you plan to set in the Wi-Fi policy:

| Select certificate to use | Where the client certificate comes from |
|---|---|
| **EMM Management Certificate** | One external certificate with **Purpose** set to **Wi-Fi** and **Type** set to **User**, uploaded in PFX or P12 format at **Advanced** > **Certificate** > **External Certificate**. Samsung's reference states that all users share this one certificate, so RADIUS sees the same client identity from every device. |
| **Connector interworking** | A per-user .p12 or .pfx certificate that Knox Manage finds through an AD/LDAP directory connector registered at **Advanced** > **System Integration** > **Directory Connector** with the service type **Profile Configuration(Certification)**. |
| **Issuing external CA** | A certificate that your CA issues. Register the CA at **Advanced** > **Certificate** > **Certificate Authority (CA)** (ADCS, Generic SCEP, or NDES), and then add a template at **Advanced** > **Certificate** > **Certificate Template** with **Certificate Usage** set to **Wi-Fi**. See Samsung's [certificate authority guide](https://docs.samsungknox.com/admin/knox-manage/original-console/configure/certificates/certificate-authority-ca/) and [certificate templates guide](https://docs.samsungknox.com/admin/knox-manage/original-console/configure/certificates/certificate-templates/). |

### Configure the Wi-Fi Policy

In the Android Enterprise profile, add a Wi-Fi configuration and set the 802.1X fields. Samsung's [original console Android Enterprise policies reference](https://docs.samsungknox.com/admin/knox-manage/original-console/configure/profile/configure-profile-policies/android-enterprise-policies/) (last updated October 8, 2026) defines these fields:

| Field | Value |
|---|---|
| **Security type** | **802.1xEAP** |
| **EAP Method** | **PEAP** or **TTLS**. Samsung's reference lists no other method for this policy. |
| **2-step authentication** | **PAP**, **MSCHAP**, or **MSCHAPV2** (the inner method) |
| **Set user sign-in information** | **Manual Input**, **Connector interworking**, or **User Information** |
| **Select certificate to use** | The client certificate source from the table in [Register the Certificates](#register-the-certificates) |
| **CA certificate (Alias)** | The root certificate that you registered with **Purpose** set to **Wi-Fi** and **Type** set to **Root**. This field is required. |
| **Domain** or **Alternate Subject** | The RADIUS server's domain or alternate subject names. You must provide at least one of the two. |
| **Trust on First Use** | **Do Not Use** |

Samsung's [EAP-PEAP knowledge base article](https://docs.samsungknox.com/admin/knox-manage/kbas/kba-142-wifi-eap-peap-with-cert-in-knox-manage/) (last updated August 26, 2025) states that Samsung devices running Android 13 or later with a June 2023 or later security patch require **CA certificate** and either **Domain** or **Alternate Subject**. If either is missing, the configuration fails, and you might see error KMA_D9001.

### Compare With This Guide's Requirements

Knox Manage can't meet every requirement this guide sets for Intune. Review each difference before you deploy:

| Requirement in this guide | Knox Manage behavior, from Samsung's original console reference |
|---|---|
| [Server Validation](#server-validation) | Set **CA certificate (Alias)** and **Domain** or **Alternate Subject**. **Trust on First Use** (Android 13 or later) skips both requirements, so set it to **Do Not Use**. |
| [Anonymous Outer Identity](#anonymous-outer-identity-identity-privacy) | The reference lists no identity privacy or outer identity field, so you can't set an anonymous outer identity from this policy. |
| EAP-TLS | The **EAP Method** field offers PEAP and TTLS only. Samsung's EAP-PEAP knowledge base article names EAP-TLS among the EAP types that Knox Manage supports, but the Android Enterprise Wi-Fi policy doesn't list it. |
| Work profile coverage | The original console reference states that the Wi-Fi configuration isn't applied to the work profile area, and isn't applied at all to a device enrolled as Work Profile. The new console reference lists **Work profile** as a supported system for its Wi-Fi policy. Test on a work profile device before you rely on either statement. |
| MAC address randomization | The reference lists no MAC address randomization field. |

---

## See Also

- [EAP Method Overview](01-eap-method-overview.md) -- co-equal EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS comparison; when-to-choose guidance
- [Certificate Delivery Foundation](02-cert-delivery-foundation.md) -- deployment ordering rule, EKU requirements, SCEP/PKCS cert delivery, per-platform cert matrix (incl. Android Enterprise BYOD UPN-in-SAN requirement)
- [Configure Knox Mobile Enrollment](../admin-setup-android/07-knox-mobile-enrollment.md) -- Knox SKUs, including why Knox Manage is an alternative MDM to Intune
- [Network Authentication Glossary](../_glossary-network.md) -- 802.1X, EAP, RADIUS, supplicant, server-name validation, inner-outer identity, SCEP, PKCS, trusted root

---

## Change History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-30 | Initial version -- Android Enterprise 802.1X admin setup: Wi-Fi profiles for EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS across COBO/COPE/COSU/BYOD-WP modes; UPN-in-SAN deployment-failure WARNING (BYOD-WP); version-gated RADIUS server-name WARNING (Android 11+/14+); MAC randomization note (Android 13+); wired gap stub (no native Intune wired profile) | -- |

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-10-09 | Added the Knox Manage 802.1X Wi-Fi section (original console), sourced from Samsung Knox Manage documentation; not pilot-tested. Summary and scope updated. | — |
| 2026-07-06 | v1.15 EEE reformat — content not re-reviewed | — |