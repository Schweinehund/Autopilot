---
last_verified: 2026-06-29
review_by: 2026-09-27
applies_to: both
audience: admin
platform: all
---

> **Prerequisites:** Read [EAP Method Overview](01-eap-method-overview.md) first.
> For certificate term definitions, see [Network Authentication Glossary](../_glossary-network.md#scep).

# 802.1X Certificate Delivery Foundation

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
>
> **Assumed:** A RADIUS/NPS server already exists and is reachable from managed devices before
> any Intune 802.1X profile configuration begins.

The following one-line banner template is for per-platform guides (Phases 102--106) to place at the top of each guide, linking back to the canonical exclusion list above:

```markdown
> **Scope:** Intune client-side configuration only. RADIUS/NPS server assumed to exist. [Full scope exclusion list](02-cert-delivery-foundation.md#canonical-scope-callout).
```

## The Deployment Ordering Rule

> **CRITICAL — Deployment ordering:** Always assign profiles in this sequence and confirm
> each reaches "Succeeded" across target devices before assigning the next:
>
> 1. **Trusted Root Certificate profile** (RADIUS server CA) → wait for "Succeeded"
> 2. **SCEP or PKCS client certificate profile** → wait for "Succeeded" + cert enrolled
> 3. **802.1X Wi-Fi or Wired network profile**
>
> Violating this order produces silent Intune "Succeeded" status while devices fail to
> authenticate. Intune does not enforce dependency ordering between profiles.
