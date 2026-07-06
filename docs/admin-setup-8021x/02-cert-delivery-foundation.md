---
doc_id: RE-136
status: Approved
owner: Intune Admin Lead
doc_type: Guide
last_verified: 2026-06-29
review_by: 2026-09-27
applies_to: both
audience: admin
platform: all
---

**Platform:** All Platforms · **Doc Type:** Guide · **Doc ID:** RE-136 · **Status:** Approved

# 802.1X Certificate Delivery Foundation

## Summary

This guide establishes the shared certificate-delivery foundation for 802.1X network authentication configuration across every platform covered in this guide set. It defines the mandatory profile deployment ordering (Trusted Root, then SCEP or PKCS client certificate, then the 802.1X network profile), the required Client Authentication EKU, RADIUS server-name validation, and the per-platform certificate-delivery support matrix. Intune administrators configuring any platform's 802.1X profiles must read this foundation guide first.

> **Prerequisites:** Read [EAP Method Overview](01-eap-method-overview.md) first.
> For certificate term definitions, see [Network Authentication Glossary](../_glossary-network.md#scep).

## Canonical Scope Callout

> **Scope — Intune client-side configuration only.** These guides cover configuring managed
> devices via Intune. The following are OUT OF SCOPE for this guide set:

> - RADIUS/NPS server configuration (connection-request policies, network policies, server certificates)
> - PKI/CA infrastructure build-out (ADCS installation, NDES configuration, CA hierarchy design)

> - Intune Certificate Connector installation and maintenance
> - Network switch or wireless access point port configuration (port authentication mode, VLAN assignment, dynamic ACLs)

> - MAC Authentication Bypass (MAB) -- a server-side / switch-side concern
> - Conditional Access network-based policies

> - Non-co-equal EAP types: EAP-SIM, EAP-FAST, LEAP -- not verifiable against Microsoft documentation; TEAP -- Windows-wired-only awareness note, not a co-equal guide path

> **Assumed:** A RADIUS/NPS server already exists and is reachable from managed devices before
> any Intune 802.1X profile configuration begins.

The following one-line banner template is for per-platform guides (Phases 102--106) to place at the top of each guide, linking back to the canonical exclusion list above:

```markdown
> **Scope:** Intune client-side configuration only. RADIUS/NPS server assumed to exist. [Full scope exclusion list](02-cert-delivery-foundation.md#canonical-scope-callout).
```

## The Deployment Ordering Rule

> **CRITICAL — Deployment ordering:** Always assign profiles in this sequence and confirm
> each reaches "Succeeded" across target devices before assigning the next:

> 1. **Trusted Root Certificate profile** (RADIUS server CA) → wait for "Succeeded"
> 2. **SCEP or PKCS client certificate profile** → wait for "Succeeded" + cert enrolled

> 3. **802.1X Wi-Fi or Wired network profile**

> Violating this order produces silent Intune "Succeeded" status while devices fail to
> authenticate. Intune does not enforce dependency ordering between profiles.

## Trusted Root Certificate Profile

A [Trusted Certificate](../_glossary-network.md#trusted-root) profile in Intune delivers the root CA certificate that signed the RADIUS server's certificate. The supplicant uses this to validate the RADIUS server's identity during TLS negotiation.

- **Purpose:** Install the RADIUS server CA root certificate on managed devices
- **Required on:** Windows, macOS, iOS/iPadOS, Android Enterprise
- **Not available on:** Linux (no Intune cert profiles for Linux -- see the per-platform cert matrix below)
- **Create as:** Configuration profile → Templates > Trusted certificate
- **Assignment:** Must cover the same device/user groups as the SCEP/PKCS and 802.1X network profiles
- **Ordering:** Must reach "Succeeded" on target devices before the SCEP/PKCS client cert profile is assigned

## SCEP Certificate Profile

A [SCEP](../_glossary-network.md#scep) certificate profile delivers per-device client identity certificates automatically from a CA via the Network Device Enrollment Service (NDES) or Intune Cloud PKI.

- **Purpose:** Deliver per-device client certificates for 802.1X EAP-TLS authentication
- **Required EKU:** Client Authentication (OID 1.3.6.1.5.5.7.3.2) -- must be set explicitly in the profile's Extended Key Usage section
- **Subject SAN:** For Android Enterprise personally-owned work profile, the SAN must include the user UPN -- profile deployment fails if UPN is absent from the SAN
- **Renewal threshold:** Set to 20% (device renews the certificate when 80% of its lifetime has elapsed)
- **Supported platforms:** Windows, macOS, iOS/iPadOS, Android Enterprise
- **Not available on:** Linux (no Intune cert profiles for Linux)

## PKCS Certificate Profile

A [PKCS](../_glossary-network.md#pkcs) certificate profile delivers CA-issued certificates in PKCS #12 (PFX) format via the Intune Certificate Connector.

- **Purpose:** Deliver CA-issued client certificates for 802.1X authentication without NDES
- **Supported for 802.1X client certs:**
  - Windows: Wi-Fi and Wired profiles
  - macOS: Wi-Fi profiles only
  - iOS/iPadOS: Wi-Fi profiles only
  - Android Enterprise: Wi-Fi profiles (non-AOSP)
- **NOT supported:** macOS wired profiles, iOS/iPadOS wired profiles, Linux -- use SCEP for wired client certs on macOS and iOS/iPadOS

## PFX Import (PKCS Imported) Certificate Profile

The PFX Import (also labeled PKCS Imported certificates) profile type is unique to Windows wired network configuration in Intune.

- **Unique to:** Windows wired network profile UI -- the only platform that exposes this profile type in the wired profile cert picker
- **Use case:** Importing pre-generated PFX bundles for specific device identity scenarios where SCEP enrollment is not available
- **Note:** SCEP is the preferred delivery method for standard 802.1X deployments; PFX Import is a supplemental option for Windows wired configurations

## EKU Requirement: Client Authentication

Every client certificate used for 802.1X authentication must carry the [EKU (Client Authentication)](../_glossary-network.md#eku-client-authentication) extension.

- **OID:** 1.3.6.1.5.5.7.3.2 (Client Authentication)
- **Where to set:** In the Intune SCEP profile, under the Extended Key Usage section -- add "Client Authentication" explicitly; do not rely on CA defaults
- **Effect of missing EKU:** The RADIUS server rejects the certificate and returns Access-Reject; the device sees "Authentication Failed" with no further indication of the root cause
- **Verification:** After certificate enrollment, inspect the cert in the device's certificate store and confirm the EKU field includes OID 1.3.6.1.5.5.7.3.2

## RADIUS Server-Name Validation

Always configure [server-name validation](../_glossary-network.md#server-name-validation) in every 802.1X profile. Leaving this field unpopulated with server validation technically enabled is a misconfiguration that creates a rogue-RADIUS attack surface.

- **Always populate** the "Certificate server names" field with the RADIUS server's FQDN or CN suffix
- **Always enable** "Perform server validation" (or equivalent per-platform setting)
- **Always reference** a Trusted Certificate profile for RADIUS server validation
- **Android 11+ requirement:** The RADIUS server name field is required -- not optional -- for new Wi-Fi profiles; profiles without it may fail to connect on Android 11 and later devices
- **Android 14+ constraint:** The total combined length of all configured RADIUS server names must be 256 characters or fewer; no special characters are permitted in the server name field

## Cloud PKI (Alternative)

Microsoft Intune Suite includes Cloud PKI as a managed, cloud-hosted CA alternative to on-premises ADCS/NDES.

- **What it is:** A managed CA-in-the-cloud service that issues SCEP-based client certificates without requiring an on-premises NDES server
- **Relevance:** Cloud PKI can fulfill the SCEP certificate delivery role described in the SCEP Certificate Profile section above -- the Intune 802.1X profile configuration is identical whether certificates come from Cloud PKI or on-premises NDES
- **Scope:** Full Cloud PKI setup and configuration is out of scope for this guide set -- see Microsoft Learn for Cloud PKI deployment guidance
- **Note:** Cloud PKI does not change the deployment ordering rule or the EKU requirement; all other guidance in this file applies regardless of the CA backend

## Per-Platform Cert-Delivery Support Matrix

This matrix is the single canonical home for cert-delivery support across platforms (decision B3). Per-platform guides (Phases 102--106) link back here rather than reproducing this table.

| Platform | Wired Profile | SCEP (client cert) | PKCS (client cert) | PFX Import / PKCS Imported | Trusted Root |
|---|---|---|---|---|---|
| **Windows** | YES -- WiredNetwork CSP | Yes | Yes (wired + Wi-Fi) | **Yes -- wired only, unique to Windows wired profile UI** | Yes |
| **macOS** | YES -- Templates > Wired network | Yes | Wi-Fi only -- **NOT supported for wired profiles** | Wi-Fi only | Yes |
| **iOS/iPadOS** | YES -- GA on M-series iPad (USB Ethernet) | Yes | Wi-Fi only -- **NOT supported for wired profiles** | Wi-Fi only | Yes |
| **Android Enterprise** | **NO native wired profile type** -- gap stub only | Yes (Wi-Fi) | Yes (Wi-Fi, non-AOSP) | Wi-Fi only, non-AOSP | Yes |
| **Linux** | **NO native Intune profile** -- script-based only | **NO -- no Intune cert profiles for Linux** | NO | NO | **NO -- not supported via Intune** |

> **Column note:** "PFX Import / PKCS Imported" covers two distinct things.

> **PFX Import** in the *wired* profile cert picker is unique to Windows (the "wired only" cell).

> The cross-platform **PKCS Imported (PFX) Wi-Fi** profile is what the "Wi-Fi only" cells refer to on macOS, iOS/iPadOS, and Android Enterprise.

**Key asymmetries:**

- macOS/iOS wired = SCEP-only; PKCS is **NOT supported** for wired profiles on macOS or iOS/iPadOS
- Windows wired adds PFX Import (PKCS Imported) -- unique to the Windows wired profile UI
- Linux = no Intune cert delivery of any kind; certificate delivery must be managed via script or out-of-band tooling

> **Boundary:** This matrix shows which cert delivery methods Intune supports per platform at
> the foundation level.

> Per-platform guides (Phases 102--106) document the exact Intune UI
> fields, settings, and profile configuration steps for each platform.

> Do not duplicate that
> per-platform UI detail here -- link to the appropriate guide instead.

---

## Change History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-29 | Initial version -- cert-delivery foundation: ordering rule, scope callout, EKU, server-name validation, per-platform cert matrix | -- |

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-07-06 | v1.15 EEE reformat — content not re-reviewed | — |