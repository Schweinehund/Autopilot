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

---

## Wi-Fi

### In Intune admin center

Navigation: **Devices** > **Configuration** > **New policy** > **Windows 10 and later** > **Templates** > **Wi-Fi**

Select **Enterprise** as the Wi-Fi type to access EAP authentication settings. The following matrix covers the key per-EAP-method configuration fields. All three EAP methods are co-equal -- no method is ranked or recommended as a default. For when to choose each method, see [01-eap-method-overview.md](01-eap-method-overview.md).

The Settings Catalog (`Devices > Configuration > New policy > Settings catalog`) also exposes these Wi-Fi settings and may offer more granular options.

**Wi-Fi per-EAP-method configuration matrix:**

| Setting | EAP-TLS | PEAP-MSCHAPv2 | EAP-TTLS |
|---|---|---|---|
| EAP type field value | EAP - TLS | Protected EAP (PEAP) | EAP-TTLS |
| Certificate server names | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix |
| Root cert for server validation | Trusted Certificate profile reference | Trusted Certificate profile reference | Trusted Certificate profile reference |
| Perform server validation | Enforced via trusted root reference | Yes -- always | Yes -- always |
| Client authentication method | SCEP cert / PKCS cert / Derived credential | Username and Password | Username and Password |
| Inner method | -- (cert-only; no inner method) | MSCHAPv2 (always; not PAP) | PAP / CHAP / MS-CHAP / MS-CHAPv2 (must match RADIUS policy) |
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

---

## Wired

### In Intune admin center

Navigation: **Devices** > **Configuration** > **New policy** > **Windows 10 and later** > **Templates** > **Wired network**

The wired profile uses the WiredNetwork CSP. Before configuring the 802.1X settings, address the two high-consequence wired-only prerequisites below.

### dot3svc Service Dependency

> **WARNING -- dot3svc (Wired AutoConfig) service dependency:**
>
> The Wired AutoConfig service (`dot3svc`) must be running for Windows 802.1X wired authentication to engage. On Windows 10 and 11, `dot3svc` ships with startup type **Manual** -- it does not start automatically. Intune reports the wired network profile as **"Succeeded"** regardless of whether the service is running, creating a silent failure: the profile is applied but the supplicant never activates, and the wired port stays unauthenticated.
>
> **Detect:** Run `sc query dot3svc` and look for `STATE: STOPPED`; run `sc qc dot3svc` and look for `START_TYPE: 3 DEMAND_START` (Manual) -- note that `START_TYPE` is reported by `sc qc`, not `sc query`. Alternatively, use PowerShell: `Get-Service -Name dot3svc` -- check that `StartType` is `Automatic` and `Status` is `Running`.
>
> **Remediate:** Set the service to automatic startup and start it:
>
> ```powershell
> Set-Service -Name dot3svc -StartupType Automatic
> Start-Service -Name dot3svc
> ```
>
> **Detection pattern for Intune Remediations:** Exit non-zero (issue detected) when `(Get-Service dot3svc).StartType -ne 'Automatic'` OR `(Get-Service dot3svc).Status -ne 'Running'`. Remediation action: run `Set-Service -Name dot3svc -StartupType Automatic` then `Start-Service dot3svc`.
>
> **Deploy via Intune Remediations:** **Devices** > **Remediations** > **+ Create** -- Platform: Windows 10 and later. Supply a detection script (exits 1 when the condition is detected) and a remediation script. Assign to the same device groups receiving the wired 802.1X profile. Run on a schedule (e.g., every hour) to catch service resets after Windows updates.

### 802.1X Enforcement Staging

> **DANGER -- 802.1X Enforcement Staging**
>
> Do not set 802.1X enforcement to **Enforce** until you have confirmed all of the following:
>
> 1. The RADIUS server is reachable from managed devices (test with `Test-NetConnection` or a pilot device in **Do not enforce** mode).
> 2. All target devices have received valid client certificates (check Intune device status for the SCEP/PKCS profile -- confirm "Succeeded" with cert enrolled).
> 3. A break-glass procedure exists and has been tested.
>
> Setting enforcement to **Enforce** before the cert pipeline is validated blocks **ALL wired-connected devices simultaneously**. Removing the enforcement policy to recover requires delivering a new Intune policy over the network -- which is unavailable because enforcement has already locked all wired ports (chicken-and-egg). This can take down an entire office or floor with no remote remediation path.
>
> **Staged rollout:** Deploy with **Do not enforce** first. Confirm authentication succeeds on a pilot set of devices across each switch and VLAN segment. Switch to **Enforce** only after validation across the full target population.
>
> **Break-glass procedure:** Prepare at least one of the following before enabling enforcement: (a) a non-802.1X switch port accessible to on-site staff; (b) a USB-to-Ethernet adapter that connects to a network segment not subject to 802.1X enforcement; (c) local administrator access to remove or modify the Intune device configuration manually.
>
> **Enforcement field values:** The wired profile 802.1X enforcement field offers three values -- **Not configured** (enforcement state unspecified; profile delivers settings without setting enforcement), **Do not enforce** (settings delivered; switch port not required to authenticate), and **Enforce** (switch port requires 802.1X; blocked access if RADIUS unreachable or device lacks a valid cert).

### Wired per-EAP-method configuration matrix

All three EAP methods are co-equal configuration paths -- no method is ranked or recommended as a default. The wired matrix adds three settings not present in the Wi-Fi matrix: **Disable user prompts for server validation**, **Require cryptographic binding** (PEAP only), and **PFX Import** as a client cert option for EAP-TLS.

| Setting | EAP-TLS | PEAP-MSCHAPv2 | EAP-TTLS |
|---|---|---|---|
| EAP type field value | EAP - TLS | Protected EAP (PEAP) | EAP-TTLS |
| Certificate server names | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix | RADIUS FQDN or CN suffix |
| Root cert for server validation | Trusted Certificate profile reference | Trusted Certificate profile reference | Trusted Certificate profile reference |
| Perform server validation | Enforced via trusted root reference | Yes -- always | Yes -- always |
| Disable user prompts for server validation | Yes | Yes | Yes |
| Require cryptographic binding | -- | Available (PEAP hardening) | -- |
| Client authentication method | SCEP cert / PKCS cert / PFX Import (PKCS Imported) / Derived credential | Username and Password | Username and Password |
| Inner method | -- (cert-only; no inner method) | MSCHAPv2 | PAP / CHAP / MS-CHAP / MS-CHAPv2 (must match RADIUS policy) |
| Identity privacy (outer identity) | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` | `anonymous` or `anonymous@domain` |
| Authentication mode | See [Common Profile Mechanics](#authentication-mode) | See [Common Profile Mechanics](#authentication-mode) | See [Common Profile Mechanics](#authentication-mode) |

**Client certificate options for EAP-TLS (Wired -- differs from Wi-Fi):**
- SCEP certificate profile
- PKCS certificate profile
- **PFX Import (PKCS Imported)** -- unique to the Windows wired profile UI; imports pre-generated PFX bundles for device identity scenarios where SCEP enrollment is not available
- Derived credential

PFX Import is not available in the Windows Wi-Fi profile UI. See the [per-platform cert-delivery support matrix](02-cert-delivery-foundation.md#per-platform-cert-delivery-support-matrix) for the canonical breakdown of cert-delivery options across platforms.

### TEAP (Tunneled EAP -- Awareness Note)

TEAP (Tunneled EAP, RFC 7170) appears in the Windows wired-network profile UI as a fourth EAP type alongside EAP-TLS, PEAP, and EAP-TTLS. It is unique to Windows wired 802.1X -- no other platform surfaces TEAP via Intune. TEAP chains machine and user credentials in a single authentication exchange using Primary EAP and Secondary EAP method selections, eliminating the need for separate machine-then-user re-authentication sequences. TEAP is not a co-equal configuration path in this guide set; for organizations evaluating TEAP, consult your RADIUS/NPS team to confirm NPS TEAP support before deployment.

---

## Hybrid Entra Joined -- Strong Certificate Mapping

> **NOTE -- Hybrid Entra Joined: Strong Certificate Mapping Required**
>
> As of **2025-02-11**, Windows Domain Controllers entered enforcement mode for KB5014754 strong certificate mapping. Hybrid Entra Joined devices using EAP-TLS for 802.1X (Wi-Fi or wired) authenticate through NPS/RADIUS servers that perform Kerberos lookups against Active Directory. DC enforcement now requires the device or user **SID (Security Identifier)** to be present in the certificate's Subject Alternative Name (SAN). Without the SID in the SAN, DC-enforced authentication fails even if the certificate is otherwise valid.
>
> **Action required:** In Intune SCEP and PKCS certificate profiles for Hybrid Entra Joined devices, configure the Subject Alternative Name to include the device or user SID. Intune supports SID-in-SAN inclusion in both SCEP and PKCS profiles -- look for the SID variable in the SAN configuration under the certificate profile settings.
>
> **Cloud-only Entra Joined devices are unaffected** -- this requirement applies only when Domain Controllers are involved in the authentication chain. Devices joined exclusively to Entra ID (not Hybrid) authenticate without going through AD DC Kerberos validation.
>
> *last_verified: 2026-06-30 · review_by: 2026-12-27*

---

## See Also

- [EAP Method Overview](01-eap-method-overview.md) -- co-equal EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS comparison; when-to-choose guidance
- [Certificate Delivery Foundation](02-cert-delivery-foundation.md) -- deployment ordering rule, EKU requirements, SCEP/PKCS/PFX-Import, per-platform cert matrix
- [Network Authentication Glossary](../_glossary-network.md) -- 802.1X, EAP, RADIUS, supplicant, server-name validation, inner-outer identity, SCEP, PKCS, trusted root

---

## Change History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-30 | Initial version -- Windows 802.1X admin setup: Wi-Fi + wired profiles for EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS; dot3svc Remediation pattern; enforcement-staging DANGER callout; KB5014754 strong-mapping callout | -- |
