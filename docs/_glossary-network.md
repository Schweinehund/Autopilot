---
last_verified: 2026-06-29
review_by: 2026-09-27
applies_to: both
audience: all
platform: all
---

> **Domain coverage:** This glossary covers platform-neutral 802.1X network authentication terminology (IEEE 802.1X port-based access control, EAP methods, RADIUS, certificate delivery).
> For platform-specific provisioning terminology, see: [Windows Autopilot Glossary](_glossary.md) · [Apple Provisioning Glossary](_glossary-macos.md) · [Android Enterprise Glossary](_glossary-android.md) · [Linux Provisioning Glossary](_glossary-linux.md)

# Network Authentication Glossary

## Alphabetical Index

[802.1X](#8021x) | [authentication server](#authentication-server) | [authenticator](#authenticator) | [EAP](#eap) | [EAPOL](#eapol) | [EKU (Client Authentication)](#eku-client-authentication) | [inner-outer identity](#inner-outer-identity) | [PKCS](#pkcs) | [RADIUS](#radius) | [SCEP](#scep) | [server-name validation](#server-name-validation) | [supplicant](#supplicant) | [trusted root](#trusted-root)

---

## 802.1X Protocol Actors

### 802.1X

IEEE 802.1X — standard for port-based network access control (NAC). Governs the authentication exchange between a supplicant (device), an authenticator (switch port or wireless access point), and an authentication server (RADIUS) that determines whether a device is allowed onto a network segment. The "port" may be a physical Ethernet port or a logical 802.11 wireless association. 802.1X is the container; EAP is the authentication framework carried inside it.

> See also: [EAP](#eap) · [EAPOL](#eapol) · [RADIUS](#radius) · [supplicant](#supplicant) · [authenticator](#authenticator) · [authentication server](#authentication-server)

### supplicant

The 802.1X client — the device requesting network access. The supplicant initiates the EAPOL exchange and responds to the authenticator's EAP challenges. Each platform implements the supplicant role in its native networking stack; the protocol behavior is identical across platforms.

> See also: [802.1X](#8021x) · [EAPOL](#eapol) · [authenticator](#authenticator)

### authenticator

The network device (Ethernet switch port or wireless access point) that enforces 802.1X. The authenticator acts as a relay between the supplicant and the authentication server: it passes EAPOL frames from the supplicant to the RADIUS server and opens or closes the port based on the authentication outcome. Authenticator configuration (port auth mode, VLAN assignment, MAB fallback) is the network infrastructure team's responsibility and is out of scope for these Intune guides.

> See also: [802.1X](#8021x) · [EAPOL](#eapol) · [authentication server](#authentication-server)

### authentication server

The server that evaluates the supplicant's identity and issues an Access-Accept or Access-Reject. Typically a RADIUS server. In Microsoft environments, this is Windows Server Network Policy Server (NPS); in mixed environments it may be a third-party RADIUS product (Cisco ISE, Aruba ClearPass, etc.). Authentication server configuration is out of scope for these guides.

> See also: [RADIUS](#radius) · [802.1X](#8021x) · [supplicant](#supplicant)

### EAPOL

EAP over LAN — the IEEE 802.1X Layer-2 encapsulation that carries EAP frames directly over Ethernet or Wi-Fi without requiring IP connectivity. The exchange between supplicant and authenticator (switch/AP) uses EAPOL frames. The authenticator then relays the EAP payload to the RADIUS server using RADIUS packets over IP. EAPOL is why 802.1X authentication can happen before the device has an IP address.

> See also: [EAP](#eap) · [802.1X](#8021x) · [authenticator](#authenticator)

---

## Authentication Methods

### EAP

Extensible Authentication Protocol — authentication framework carried over 802.1X (as EAPOL frames on the wire). EAP does not define an authentication algorithm; it defines a negotiation mechanism that allows different authentication methods (EAP-TLS, PEAP, EAP-TTLS, etc.) to be used. The supplicant and authentication server negotiate which EAP method to use before the actual credential exchange occurs.

> See also: [EAPOL](#eapol) · [802.1X](#8021x) · [inner-outer identity](#inner-outer-identity)

### RADIUS

Remote Authentication Dial-In User Service (RFC 2865) — the network protocol and server role that receives authentication requests forwarded by the authenticator (switch/AP) and makes the Access-Accept or Access-Reject decision. In Intune-managed environments, RADIUS is assumed to already exist (Windows NPS or a third-party RADIUS server); these guides cover only the Intune client-side configuration, not RADIUS server setup.

> See also: [authentication server](#authentication-server) · [802.1X](#8021x) · [server-name validation](#server-name-validation)

### inner-outer identity

In tunneled EAP methods (PEAP, EAP-TTLS), the "outer identity" is sent before the TLS tunnel is established and is visible in cleartext on the network segment. The "inner identity" is the real user credential, sent inside the encrypted TLS tunnel. Configure the outer identity to an anonymous value (e.g., "anonymous" or "anonymous@domain.com") to prevent credential-related PII from being observable before the tunnel is established. Known in Intune profile UI as "Identity privacy" or "Outer identity." Also applies to EAP-TLS where the outer identity is taken from the certificate subject. Conventionally abbreviated as "inner/outer identity" in protocol literature.

> See also: [EAP](#eap) · [RADIUS](#radius)
