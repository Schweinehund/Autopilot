---
last_verified: 2026-06-30
review_by: 2026-09-28
applies_to: both
audience: admin
platform: linux
---

> **Prerequisites:** Complete [EAP Method Overview](01-eap-method-overview.md) and
> [Certificate Delivery Foundation](02-cert-delivery-foundation.md) before this guide.

# Linux 802.1X Admin Setup: EAP-TLS via nmcli

> **Scope:** Intune client-side configuration only. RADIUS/NPS server assumed to exist. [Full scope exclusion list](02-cert-delivery-foundation.md#canonical-scope-callout).

---

> **WARNING -- Linux: Intune provides no native 802.1X profiles for Linux; this guide documents an OS-level nmcli workaround**
>
> Microsoft Intune provides **no native Wi-Fi profile**, **no native wired-network profile**, and
> **no certificate-delivery profiles** (Trusted Certificate, SCEP, or PKCS) for Linux. The approach
> documented in this guide is an **OS-level shell-script + nmcli (NetworkManager `802-1x.*`)
> workaround** -- not an Intune profile. Certificate delivery is handled out-of-band before the
> nmcli commands are run; see the [Certificate Prerequisites](#certificate-prerequisites-out-of-band)
> note below.

---

## EAP Method Scope Note

All three EAP methods remain co-equal for 802.1X network authentication -- see [EAP Method Overview](01-eap-method-overview.md) for when-to-choose guidance. This guide documents EAP-TLS only because it is the sole method with verifiable nmcli/vendor documentation for Intune-managed Linux fleets -- a source-confidence / documentation-scope boundary, not a method preference.

- **PEAP-MSCHAPv2:** Technically possible via nmcli but not documented in verifiable Microsoft/vendor sources for Intune-managed Linux fleets; out of scope for this guide.
- **EAP-TTLS:** Similarly undocumented for this configuration context in verifiable Microsoft/vendor sources for Intune-managed Linux fleets; out of scope for this guide.

---

## Applies To

This guide applies to **Ubuntu 24.04 LTS** and **26.04 LTS** managed by Microsoft Intune. The nmcli/NetworkManager `802-1x.*` connection properties documented here are distro-agnostic; per-version Intune agent capability differences (for example, broker version or compliance-enforcement features) may affect agent behavior between Ubuntu 24.04 and 26.04. Always test on a representative device before fleet rollout.

---

## Certificate Prerequisites (Out-of-Band)

> **Note -- Intune delivers no certificate profiles to Linux devices**
>
> Before running any of the nmcli commands in this guide, the following certificate files must be
> present on the device. They must be placed there by a **separate out-of-band process** -- for
> example, an Intune Bash script, an MDT/SCCM task sequence, or a manual copy procedure. Intune
> provides no Trusted Certificate, SCEP, or PKCS profile type for Linux.
>
> - `/etc/certs/ca-root.pem` -- RADIUS server root CA certificate (for server validation)
> - `/etc/certs/client-cert.pem` -- Device or user client certificate (for client authentication)
> - `/etc/certs/private-key.pem` -- Private key for the client certificate
>
> Adjust file paths to match your deployment. Private-key material must **never** be embedded in
> documentation or configuration files. For certificate delivery ordering rules and EKU requirements,
> see [Certificate Delivery Foundation](02-cert-delivery-foundation.md).
