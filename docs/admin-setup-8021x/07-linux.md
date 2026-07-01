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

---

## EAP-TLS via nmcli (Wi-Fi)

> **Note -- Illustrative commands: validate on a test device before fleet deployment**
>
> The nmcli commands below are illustrative. Parameters (SSID, file paths, identity string) are
> placeholders specific to this guide. These steps are sourced from NetworkManager documentation
> and community-verified references -- not from an official Microsoft Learn Linux 802.1X guide
> (none exists). Validate on a representative test device before fleet deployment.

### Configuration Steps

**Step 1 -- Create the EAP-TLS Wi-Fi connection:**

```bash
nmcli connection add \
  type wifi \
  con-name "Corp-WiFi-EAP-TLS" \
  ssid "YourCorporateSSID" \
  wifi-sec.key-mgmt wpa-eap \
  802-1x.eap tls \
  802-1x.identity "device-user@domain.com" \
  802-1x.ca-cert /etc/certs/ca-root.pem \
  802-1x.client-cert /etc/certs/client-cert.pem \
  802-1x.private-key /etc/certs/private-key.pem \
  802-1x.private-key-password-flags 4
```

`802-1x.private-key-password-flags` controls how the private-key passphrase is managed:

- `4` -- key is unencrypted; no passphrase required (`not-required` flag)
- `0` -- system-managed; NetworkManager stores the passphrase (also add `802-1x.private-key-password "passphrase"`)

Note: Older NetworkManager versions may require a `file://` prefix on certificate paths (e.g., `file:///etc/certs/ca-root.pem`). Ubuntu 24.04+ (NM 1.44+) accepts bare paths.

**Step 2 -- Activate the connection:**

```bash
nmcli connection up "Corp-WiFi-EAP-TLS"
```

### nmcli 802-1x.* Reference Parameter Table (EAP-TLS)

| nmcli Property | EAP-TLS Value / Placeholder |
|---|---|
| `802-1x.eap` | `tls` |
| `802-1x.identity` | `device-user@domain.com` |
| `802-1x.ca-cert` | `/etc/certs/ca-root.pem` |
| `802-1x.client-cert` | `/etc/certs/client-cert.pem` |
| `802-1x.private-key` | `/etc/certs/private-key.pem` |
| `802-1x.private-key-password` | `<passphrase>` (omit if key is unencrypted) |
| `802-1x.private-key-password-flags` | `4` (unencrypted key) or `0` (system-managed) |
| `802-11-wireless-security.key-mgmt` | `wpa-eap` (Wi-Fi only; not used for wired) |
| `802-11-wireless.ssid` | `YourCorporateSSID` (Wi-Fi only) |

Source: NetworkManager Reference Manual -- settings-802-1x (networkmanager.dev). Property values are illustrative placeholders; validate for your environment.

### Verification

After activating the connection, confirm it succeeded with the following commands:

```bash
# Show connection status and EAP-TLS authentication details
nmcli connection show "Corp-WiFi-EAP-TLS"

# Confirm IP address assignment -- successful RADIUS authentication grants network access
ip addr show

# Review NetworkManager logs for EAP negotiation events and errors
journalctl -u NetworkManager
```

---

## Wired

The same EAP-TLS workaround via nmcli applies to wired (Ethernet) 802.1X. Change `connection.type` from `wifi` to `ethernet`, specify the interface name (discoverable via `ip link show`), and keep all `802-1x.*` properties identical. Remove `wifi-sec.key-mgmt` and `802-11-wireless.ssid` -- those properties are not applicable to wired connections.

Intune provides no native wired-network profile for Linux. As with Wi-Fi, certificates must be pre-placed out-of-band before running these commands.

**Create the EAP-TLS wired connection:**

```bash
nmcli connection add \
  type ethernet \
  con-name "Corp-Wired-EAP-TLS" \
  ifname <interface-name> \
  802-1x.eap tls \
  802-1x.identity "device-user@domain.com" \
  802-1x.ca-cert /etc/certs/ca-root.pem \
  802-1x.client-cert /etc/certs/client-cert.pem \
  802-1x.private-key /etc/certs/private-key.pem \
  802-1x.private-key-password-flags 4
```

Replace `<interface-name>` with the actual interface (e.g., `eth0`, `enp3s0` -- use `ip link show` to discover). Activate with `nmcli connection up "Corp-Wired-EAP-TLS"`. Verify with the same trio: `nmcli connection show`, `ip addr show`, `journalctl -u NetworkManager`.

---

> **Note -- Linux Intune surface is actively developing**
>
> Intune's Linux management capabilities continue to evolve. As of this guide's `last_verified`
> date, Intune delivers no native Wi-Fi, wired, or certificate profiles for Linux -- the nmcli
> workaround documented here is the available approach. Verify the current feature set at the
> [Deployment guide for Linux device management](https://learn.microsoft.com/en-us/intune/fundamentals/platform-guide-linux)
> before each major fleet deployment. If Intune adds native Wi-Fi, wired, or cert-delivery
> profiles for Linux after this guide's `review_by` date, this guide requires updating.
>
> *last_verified: 2026-06-30 · review_by: 2026-09-28*

---

## See Also

- [EAP Method Overview](01-eap-method-overview.md) -- co-equal EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS comparison; when-to-choose guidance; source-confidence framing for Linux (EAP-TLS documented; PEAP/TTLS out of scope)
- [Certificate Delivery Foundation](02-cert-delivery-foundation.md) -- deployment ordering rule, EKU requirements, per-platform cert-delivery support matrix (Linux: no Intune cert profiles)
- [Network Authentication Glossary](../_glossary-network.md) -- 802.1X, EAP, RADIUS, supplicant, server-name validation, inner-outer identity, SCEP, PKCS, trusted root

---

## Change History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-30 | Initial version -- Linux 802.1X EAP-TLS admin setup via nmcli; platform gap lead WARNING (no native Intune Wi-Fi/wired/cert profiles); EAP method scope note (PEAP-MSCHAPv2 and EAP-TTLS out of scope); Ubuntu 24.04/26.04 LTS; out-of-band cert prerequisites; nmcli Wi-Fi EAP-TLS steps; two-column 802-1x.* reference parameter table; locked verification trio (nmcli connection show / ip addr show / journalctl -u NetworkManager); Wired H2 (same nmcli via type ethernet); MEDIUM-confidence freshness callout (Linux Intune surface actively developing) | -- |
