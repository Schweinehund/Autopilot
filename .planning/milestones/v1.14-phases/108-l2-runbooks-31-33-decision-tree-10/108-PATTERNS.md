# Phase 108: L2 Runbooks #31-33 + Decision Tree #10 — Pattern Map

**Mapped:** 2026-06-30
**Files analyzed:** 8 (3 new, 5 modified)
**Analogs found:** 8 / 8

---

## File Classification

| New / Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---------------------|------|-----------|----------------|---------------|
| `docs/l2-runbooks/31-8021x-log-collection.md` | L2 runbook — log collection | request-response (L2 collect + hand-off) | `docs/l2-runbooks/24-linux-log-collection.md` + `docs/l2-runbooks/27-macos-sso-investigation.md` | role-match (multi-surface Decision-Matrix rhythm from #24; shared-Context + "Before starting" + routing prose from #27) |
| `docs/l2-runbooks/32-8021x-cert-investigation.md` | L2 runbook — investigation | request-response (L2 interpret + escalate) | `docs/l2-runbooks/27-macos-sso-investigation.md` | role-match (shared-Context + "Before starting: collect per [#31]" + Track-style per-platform subsections) |
| `docs/l2-runbooks/33-8021x-radius-eap-investigation.md` | L2 runbook — investigation | request-response (L2 interpret + escalate) | `docs/l2-runbooks/27-macos-sso-investigation.md` | role-match (Track A / Track B dual-section shape adapted to checklist + two per-platform investigation blocks) |
| `docs/decision-trees/10-8021x-triage.md` | decision tree — link wiring | transform (forward-ref note → live links) | itself — `docs/decision-trees/10-8021x-triage.md` | exact (only the prose note at line 77 changes; Mermaid `click` directive on EAPE node and Escalation Data table are the two edit targets) |
| `docs/l1-runbooks/38-8021x-certificate-failure.md` | L1 runbook — link wiring | transform (forward-ref note → live links) | itself — line 108 | exact (replace the "(Live links wired in Phase 108.)" suffix with live Markdown links) |
| `docs/l1-runbooks/39-8021x-radius-reject.md` | L1 runbook — link wiring | transform (forward-ref note → live links) | itself — line 121 | exact |
| `docs/l1-runbooks/40-8021x-server-trust-failure.md` | L1 runbook — link wiring | transform (forward-ref note → live links) | itself — line 118 | exact |
| `docs/l1-runbooks/41-8021x-eap-negotiation-failure.md` | L1 runbook — link wiring | transform (forward-ref note → live links) | itself — line 129 | exact |

---

## Pattern Assignments

### `docs/l2-runbooks/31-8021x-log-collection.md` (new — log collection, prerequisite runbook)

**Primary analog:** `docs/l2-runbooks/24-linux-log-collection.md`
**Secondary analog:** `docs/l2-runbooks/27-macos-sso-investigation.md` (lines 1–25)
**Tertiary analog:** `docs/l2-runbooks/01-log-collection.md` (lines 1–20)

#### Frontmatter pattern

Clone the compound multi-platform token from the Phase 107 L1 runbooks (`docs/l1-runbooks/38-8021x-certificate-failure.md` lines 1–7), changing `audience: L1` to `audience: L2`:

```yaml
---
last_verified: 2026-06-30
review_by: 2026-09-28
applies_to: both
audience: L2
platform: windows+macos+ios+android+linux
---
```

#### Platform gate callout pattern

Clone the gate from `docs/l2-runbooks/24-linux-log-collection.md` lines 3–5, adapting the subject and cross-links:

```markdown
> **Platform gate:** This guide covers 802.1X L2 log collection across all five platforms
> (Windows / macOS / iOS/iPadOS / Android / Linux). For non-802.1X Intune L2 investigation,
> see [L2 Runbook Index](00-index.md).
```

#### Context section — "Before starting" + routing prose pattern

Clone from `docs/l2-runbooks/27-macos-sso-investigation.md` lines 13–25. Adapt the "Before starting" link and the escalation-source list:

```markdown
## Context

This runbook is the **prerequisite for [#32: 802.1X Certificate-Chain Investigation](32-8021x-cert-investigation.md)
and [#33: 802.1X RADIUS/EAP Investigation](33-8021x-radius-eap-investigation.md)**.
Collect the per-platform 802.1X log surfaces here before opening either investigation runbook.

Before starting: collect a general device diagnostic package per the platform log collection guide
for the device's platform — [Windows (01)](01-log-collection.md) /
[macOS (10)](10-macos-log-collection.md) / [iOS (14)](14-ios-log-collection.md) /
[Android (18)](18-android-log-collection.md) / [Linux (24)](24-linux-log-collection.md).
Then return here to collect the net-new 802.1X-specific signals below — those are not covered
in any of the five platform log collection guides.

**From L1 escalation?** One of the four 802.1X L1 runbooks (#38–#41) or the unknown-symptom
branch of the [802.1X Triage Decision Tree](../decision-trees/10-8021x-triage.md) has routed
here. L1 already collected: device serial number, user UPN, platform, and the L1-visible
diagnostic signal. Skip to the per-platform subsection for the affected device.
```

**Key constraint (D-02):** The five `link-to-NN` links above are the link-not-copy boundary. Do NOT restate mdmdiagnosticstool, IntuneMacODC, iOS sysdiagnose, or Android Company Portal log procedures — link only.

#### Tool-landscape / overview prose pattern

Clone from `docs/l2-runbooks/24-linux-log-collection.md` lines 22–28. Adapt to explain the 802.1X-specific log surface map:

```markdown
## Tool Landscape

> **Tool landscape:** Each platform's 802.1X supplicant writes to a different log surface.
> Windows uses two dedicated Event Viewer channels (WLAN-AutoConfig / Wired-AutoConfig);
> macOS uses the unified log via `eapolclient`; iOS has no device-side 802.1X command (Intune
> portal only); Android requires `adb logcat` with USB debugging (escalation-collected);
> Linux uses `journalctl -u NetworkManager` (primary) and `journalctl -u wpa_supplicant`
> (supplement). The sections below provide the exact collection procedure per platform.
> The general device diagnostic package (MDM/Intune logs) is addressed separately in the
> per-platform log collection guides listed in the Context section above — do not duplicate
> those procedures here.
```

#### Per-platform Section skeleton pattern

Clone the numbered section pattern from `docs/l2-runbooks/24-linux-log-collection.md` lines 46–136. Each platform gets its own top-level H2 section with confidence tags inline:

```markdown
## Windows — 802.1X Log Collection

### Wi-Fi: WLAN-AutoConfig channel `[HIGH, last_verified 2026-06-30]`

...wevtutil commands and Event Viewer path...

### Wired: Wired-AutoConfig channel `[HIGH, last_verified 2026-06-30]`

...

### CAPI2 channel (certificate-chain diagnosis, required for #32) `[HIGH, last_verified 2026-06-30]`

...

---

## macOS — 802.1X Log Collection

> **NOTE — macOS EAPOL predicate confidence:** The `com.apple.eapol` unified-log predicate
> is MEDIUM confidence — sourced from community/Jamf references; no official Apple
> developer documentation found as of 2026-06-30. If the command returns no output, use
> the fallback predicate `log show --predicate 'process == "eapolclient"' --info --last 2h`.

...log show commands + Wireless Diagnostics alternative...

---

## iOS/iPadOS — 802.1X Log Collection

> **NOTE:** No device-side 802.1X log command exists on iOS/iPadOS. All L2 diagnostic
> surfaces are read-only Intune portal paths listed below.

...Intune portal breadcrumbs + on-device Settings path (user-assisted)...

---

## Android — 802.1X Log Collection

> **WARNING:** `adb logcat` collection requires **developer options enabled**, **USB debugging
> enabled**, and **a USB cable to a PC with adb in PATH**. Confirm all three prerequisites
> before attempting collection.

...adb logcat commands + Intune portal path...

---

## Linux — 802.1X Log Collection

...journalctl -u NetworkManager + journalctl -u wpa_supplicant + filtered grep form...
```

#### Confidence tag inline pattern

Clone the inline `[HIGH/MEDIUM/LOW, last_verified YYYY-MM-DD]` bracketed tag from `docs/l2-runbooks/24-linux-log-collection.md` lines 52, 69, 77. Apply to every named signal in #31.

#### Related Resources section pattern

Clone from `docs/l2-runbooks/27-macos-sso-investigation.md` lines 189–197. Link #32 and #33 as downstream consumers of #31's output:

```markdown
## Related Resources

- [802.1X Certificate-Chain Investigation (#32)](32-8021x-cert-investigation.md) — consumes logs collected here; validate cert chain, EKU, SAN, expiry, SCEP profile status
- [802.1X RADIUS/EAP Investigation (#33)](33-8021x-radius-eap-investigation.md) — consumes logs collected here; EAP-method mismatch + server-name-validation diagnosis
- [802.1X Triage Decision Tree](../decision-trees/10-8021x-triage.md) — routing entry point for 802.1X failures
- [Windows Log Collection Guide (#01)](01-log-collection.md) — general Windows MDM/Autopilot diagnostic package (link-not-copy)
- [macOS Log Collection Guide (#10)](10-macos-log-collection.md) — general macOS Intune diagnostic package (link-not-copy)
- [iOS Log Collection Guide (#14)](14-ios-log-collection.md) — general iOS diagnostic package (link-not-copy)
- [Android Log Collection Guide (#18)](18-android-log-collection.md) — general Android diagnostic package (link-not-copy)
- [Linux Log Collection Guide (#24)](24-linux-log-collection.md) — general Linux Intune diagnostic package (link-not-copy)
- [Network Authentication Glossary](../_glossary-network.md) — 802.1X, EAP, EAPOL, RADIUS, supplicant
```

#### Version History table pattern

Clone from `docs/l2-runbooks/27-macos-sso-investigation.md` lines 202–207:

```markdown
## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-30 | Phase 108 plan 01: initial authoring — 802.1X cross-platform L2 log collection (#31) | -- |
```

---

### `docs/l2-runbooks/32-8021x-cert-investigation.md` (new — cert-chain investigation)

**Primary analog:** `docs/l2-runbooks/27-macos-sso-investigation.md`
**Sibling analog:** `docs/l2-runbooks/31-8021x-log-collection.md` (for "Before starting: collect per [#31]" opener)

#### Frontmatter pattern

Identical to #31 — same compound multi-platform token, same dates, `audience: L2`:

```yaml
---
last_verified: 2026-06-30
review_by: 2026-09-28
applies_to: both
audience: L2
platform: windows+macos+ios+android+linux
---
```

#### Platform gate + foundation link callout

Add a link-not-copy reference callout directly after the platform gate, pointing to the two foundation targets:

```markdown
> **Platform gate:** This guide covers 802.1X certificate-chain investigation across all five
> platforms. For RADIUS/EAP diagnosis, see [#33](33-8021x-radius-eap-investigation.md).
> For 802.1X triage routing, see the [802.1X Triage Decision Tree](../decision-trees/10-8021x-triage.md).

> **Foundation references (link-not-copy):** The cert-delivery ordering rule, EKU requirement
> (Client Authentication OID `1.3.6.1.5.5.7.3.2`), and RADIUS server-name validation are
> documented in [Certificate Delivery Foundation](../admin-setup-8021x/02-cert-delivery-foundation.md).
> Do not restate that theory here — link to it.
```

#### Context section + "Before starting" pattern

Clone from `docs/l2-runbooks/27-macos-sso-investigation.md` lines 13–18. Adapt to reference #31 as the prerequisite:

```markdown
## Context

This runbook covers certificate-chain investigation for 802.1X failures where the Intune cert
profile shows Error/Pending **or** where profiles show Succeeded but the device cannot
authenticate (possible expiry, EKU mismatch, or SAN mismatch).

Before starting: collect 802.1X logs per [#31: 802.1X Log Collection](31-8021x-log-collection.md).

**From L1 escalation?** L1 runbook #38 (Certificate Failure) has escalated here. L1 collected:
device serial, user UPN, platform, Intune cert-profile status screenshot, and the per-platform
diagnostic signal output. Route to the matching platform subsection below.
```

#### Shared investigation flow (pre-subsection prose)

This is the D-01 "shared methodology" layer before the per-platform split. Clone the concept from `docs/l2-runbooks/24-linux-log-collection.md` lines 39–44 (Method Selection). Example shape:

```markdown
## Investigation Overview

Validate in this order — all platforms share this sequence:

1. **Intune portal: SCEP profile deployment status** — confirm Trusted Certificate and SCEP/PKCS
   profiles both show Succeeded. If not, the deployment failure is the root cause; check the
   error code in the portal (link-not-copy: see [Certificate Delivery Foundation §ordering rule](../admin-setup-8021x/02-cert-delivery-foundation.md)).
2. **Device cert store: chain, EKU, SAN, expiry** — verify the certificate was actually installed
   (Intune "Succeeded" ≠ cert on device), that EKU includes Client Authentication
   (`1.3.6.1.5.5.7.3.2`), that the SAN matches the expected UPN or device name, and that the
   cert has not expired.
3. **CAPI2 log (Windows only)** — for chain validation failures during active 802.1X attempts.
```

#### Per-platform subsection headings

Same H2-level per-platform section shape as #31. Each section contains: cert store inspection commands, SCEP-profile Intune portal breadcrumb, and an EKU/SAN/expiry interpretation block:

```markdown
## Windows — Certificate Inspection

...certutil -v -silent -store MY / ROOT + CAPI2 event patterns...

---

## macOS — Certificate Inspection

> **NOTE — keychain location:** Client cert is in the **System** keychain (device-based SCEP)
> or **Login** keychain (user-based SCEP) depending on the Intune SCEP profile deployment
> channel. Verify the profile scope before inspecting the wrong keychain.

...security find-certificate + openssl x509 -text -noout + Keychain Access GUI...

---

## iOS/iPadOS — Certificate Inspection

> **NOTE:** No device-side cert-inspection command is available on iOS/iPadOS. Use the
> Intune portal paths below.

...Intune portal SCEP status path + on-device Settings > VPN & Device Management...

---

## Android — Certificate Inspection

...Intune portal path + limited on-device Settings > Security > Encryption & credentials...

---

## Linux — Certificate Inspection

> **NOTE:** Linux certificates are script-deployed (not via Intune SCEP profile — see
> [Phase 106 Linux 802.1X Admin Setup](../admin-setup-8021x/06-linux.md)). Intune SCEP
> profile status check is N/A; inspect the cert directly on device.

...openssl x509 -text -noout + openssl verify + nmcli connection show 802-1x.*...
```

#### EKU / SAN / Expiry checklist (shared — link-not-copy)

```markdown
## EKU / SAN / Expiry Checklist

All platforms share these validation checks. For the authoritative EKU and server-name
validation requirements, see
[Certificate Delivery Foundation](../admin-setup-8021x/02-cert-delivery-foundation.md).

| Check | What to Verify | Failure Indicator |
|-------|---------------|-------------------|
| EKU — Client Authentication | OID `1.3.6.1.5.5.7.3.2` present | Cert does not include Client Authentication EKU → RADIUS rejects auth |
| SAN | UPN (user-cert) or device FQDN / serial (device-cert) matches what RADIUS expects | SAN mismatch → RADIUS rejects or KB5014754 strong-mapping fails |
| Expiry | Not After > today | Expired cert → RADIUS rejects immediately |
| Issuer chain | Root CA deployed to device Trusted Root store and matches RADIUS-server trust policy | Chain failure → trust error before EAP begins |
```

---

### `docs/l2-runbooks/33-8021x-radius-eap-investigation.md` (new — RADIUS/EAP investigation)

**Primary analog:** `docs/l2-runbooks/27-macos-sso-investigation.md` (Track A / Track B dual-section structure)

#### Frontmatter pattern

Identical to #31 and #32:

```yaml
---
last_verified: 2026-06-30
review_by: 2026-09-28
applies_to: both
audience: L2
platform: windows+macos+ios+android+linux
---
```

#### Platform gate + dual foundation callout

```markdown
> **Platform gate:** This guide covers RADIUS/EAP investigation for 802.1X failures.
> For certificate-chain investigation, see [#32](32-8021x-cert-investigation.md).

> **Foundation references (link-not-copy):**
> - EAP method co-equal overview (no method is ranked): [EAP Method Overview](../admin-setup-8021x/01-eap-method-overview.md)
> - Server-name validation field requirement: [Certificate Delivery Foundation §RADIUS Server-Name Validation](../admin-setup-8021x/02-cert-delivery-foundation.md#radius-server-name-validation)
> Do not restate EAP method comparison or server-name validation theory in this runbook.
```

#### Context + "Before starting" pattern

```markdown
## Context

This runbook covers two 802.1X failure classes where certificates are valid (or platform
cert inspection is not available) but the RADIUS server rejects the authentication:

- **EAP method or inner-auth mismatch** — the client profile negotiates a different EAP
  type or inner method than the RADIUS/NPS network policy expects.
- **Server-name validation failure** — the client cannot verify the RADIUS server's
  certificate against the `Certificate server names` field in the Intune profile.

Before starting: collect 802.1X logs per [#31: 802.1X Log Collection](31-8021x-log-collection.md).

**From L1 escalation?** L1 runbook #39 (RADIUS Reject), #40 (Server Trust Failure), or
#41 (EAP Negotiation Failure) has escalated here. L1 collected: device serial, user UPN,
platform, Intune profile status screenshot, and per-platform diagnostic signal output.
```

#### RADIUS Team Request Checklist (ask-side, not NPS config)

The checklist is the D-04 "first block" before per-platform subsections. Model the callout on `docs/l2-runbooks/27-macos-sso-investigation.md` Step structure, but use a list format:

```markdown
## RADIUS Team Request Checklist

> **NOTE:** Every item below is a **request for information from the RADIUS/NPS team** —
> not a configuration step. Do not add NPS policy configuration instructions here.
> (Requirement per REQUIREMENTS.md §Out-of-Scope: "RADIUS/NPS server-side build-out out
> of scope; Intune client-side config only.")

Request the following from the RADIUS/NPS team before continuing to the per-platform diagnosis:

1. NPS event log entries (Windows Security event log on the NPS server) around the
   authentication-attempt timestamp — specifically Event ID **6273** (Access-Reject) with
   the Reason Code and the Authentication-Type field, and Event ID **6272** (Access-Accept)
   for comparison.
2. The **EAP type** configured in the NPS network policy that should match this device/user
   (EAP type number: 13 = EAP-TLS, 25 = PEAP, 21 = EAP-TTLS).
3. For PEAP or EAP-TTLS: the **inner authentication method** configured in the NPS network
   policy (MS-CHAPv2 or PAP).
4. The **RADIUS server certificate** details: CN, SANs, issuing CA, and expiry date.
5. Confirmation that the **user or device account** exists, is not locked/expired, and is
   in the correct group for the network policy.
6. Whether any **NPS network policy conditions changed** recently (ordering, group
   membership conditions, RADIUS client list).
7. For EAP-TLS only: whether **KB5014754 strong certificate mapping** (SID-in-SAN) is
   enabled on the NPS server and whether the client cert passes the mapping check.
```

#### Per-platform EAP-Method-Mismatch section pattern

Clone the Track A structure from `docs/l2-runbooks/27-macos-sso-investigation.md` lines 28–134, adapting Steps to per-platform subsections:

```markdown
## EAP-Method Mismatch Diagnosis

### EAP type codes and co-equal principle

For the co-equal EAP-method overview (EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS as co-equal paths),
see [EAP Method Overview](../admin-setup-8021x/01-eap-method-overview.md). The diagnosis
below matches the **client profile** to the **RADIUS policy** — it does not rank methods.

### Windows — EAP-Method Mismatch

Check `Microsoft-Windows-WLAN-AutoConfig/Operational` or `Microsoft-Windows-Wired-AutoConfig/Operational`
for EAP type numbers in the event data. Cross-reference with the RADIUS team's confirmed EAP
type (checklist item 2 above). Mismatch indicators: ...

### macOS — EAP-Method Mismatch

In the eapolclient unified log, look for EAP-NAK events or method rejection before the
identity exchange. Compare to the RADIUS team's confirmed EAP type. ...

### iOS/iPadOS — EAP-Method Mismatch

iOS PEAP always requires MS-CHAPv2 inner auth — if iOS fails on an SSID where Windows/macOS
succeed, inspect the Intune Wi-Fi profile's inner auth method setting. PAP inner auth on a
PEAP profile will cause an immediate EAP-NAK on iOS. Check the Intune profile via: ...

### Android — EAP-Method Mismatch

In the `adb logcat -s "wpa_supplicant"` output, look for EAP-NAK messages and method
negotiation lines. ...

### Linux — EAP-Method Mismatch

In `journalctl -u NetworkManager` / `journalctl -u wpa_supplicant`, look for:
- `CTRL-EVENT-EAP-PROPOSED-METHOD` — server's offered method
- `CTRL-EVENT-EAP-FAILURE` — EAP failed (authentication rejected)
Compare the proposed method to the Intune connection profile's `802-1x.eap` value from
`nmcli connection show <name>`. ...
```

#### Per-platform Server-Name-Validation section pattern

Clone as a second top-level investigation block (analogous to Track B in #27):

```markdown
## Server-Name Validation Failure Diagnosis

For the full server-name validation concept and the Intune profile `Certificate server names`
field requirement, see
[Certificate Delivery Foundation §RADIUS Server-Name Validation](../admin-setup-8021x/02-cert-delivery-foundation.md#radius-server-name-validation).

### Windows — Server-Name Validation Failure

In `Microsoft-Windows-WLAN-AutoConfig/Operational`: look for event 8001 / CAPI2 entries
referencing "server certificate chain couldn't be validated", "trust", or "chain" text.
Windows may show a user-visible trust prompt on unmanaged devices. Check the Intune Wi-Fi
profile `Certificate server names` field is populated with the RADIUS server's FQDN or CN.

### macOS — Server-Name Validation Failure

Silent failure — no trust prompt on managed macOS devices. In the eapolclient log: look for
TLS handshake failure or "identity rejected by server" message. Check the Intune Wi-Fi
profile's `Certificate server names` field. ...

### iOS/iPadOS — Server-Name Validation Failure

Silent "Authentication Failed" pattern in Intune portal — no trust prompt on managed devices.
Check the Intune Wi-Fi profile's `Certificate server names` field is populated. ...

### Android — Server-Name Validation Failure

In `adb logcat -s "wpa_supplicant"`: SSL certificate verification failure messages. Check the
Intune Wi-Fi profile's `Certificate server names` field. ...

### Linux — Server-Name Validation Failure

In `journalctl`: TLS certificate verification error messages. Check:
- `802-1x.domain-suffix-match` via `nmcli connection show <name>`
- `802-1x.ca-cert` — confirm the RADIUS root CA file path is set and the file is present
```

---

### `docs/decision-trees/10-8021x-triage.md` (modified — wire live L2 links)

**Analog:** itself. Read the file at the exact edit points.

#### Edit 1 — Mermaid `click` directive for EAPE node

Current state (line 40, after the existing `click EAP41` directive — no EAPE click exists yet):

```
    click EAP38 "../l1-runbooks/38-8021x-certificate-failure.md"
    click EAP39 "../l1-runbooks/39-8021x-radius-reject.md"
    click EAP40 "../l1-runbooks/40-8021x-server-trust-failure.md"
    click EAP41 "../l1-runbooks/41-8021x-eap-negotiation-failure.md"
```

Add a fifth `click` directive immediately after line 40, matching the same `click NODE "path"` syntax used for all other nodes:

```
    click EAPE "../l2-runbooks/31-8021x-log-collection.md"
```

#### Edit 2 — Escalation Data table, line 77

Current state (line 77):

```
Route to L2; L2 Log Collection (#31) is the shared prerequisite for all 802.1X L2 investigation. (Live links to L2 Log Collection #31 and L2 investigation runbooks #32 and #33 will be wired in Phase 108.)
```

Replace only the forward-ref suffix `(Live links … will be wired in Phase 108.)` with live links, keeping all preceding prose intact:

```
Route to L2; [L2 Log Collection (#31)](../l2-runbooks/31-8021x-log-collection.md) is the shared prerequisite for all 802.1X L2 investigation. Also see [#32: Certificate-Chain Investigation](../l2-runbooks/32-8021x-cert-investigation.md) and [#33: RADIUS/EAP Investigation](../l2-runbooks/33-8021x-radius-eap-investigation.md).
```

**House style preserved:** `click NODE "path"` syntax (no title argument); `classDef`, `class` lines untouched; Legend and Routing-Verification table untouched.

---

### `docs/l1-runbooks/38-8021x-certificate-failure.md` (modified — wire live links at line 108)

**Analog:** itself.

Current state (line 108):

```
See L2 Log Collection (#31) for per-platform log sources, then L2 Certificate Chain Investigation (#32) for certificate chain validation, SCEP/PKCS profile deployment diagnosis, EKU and SAN verification, and expiry analysis. (Live links wired in Phase 108.)
```

Replace the entire sentence (keep the runbook's surrounding `---` separator and `[Back to …]` link intact). Replace with:

```markdown
See [L2 Log Collection (#31)](../l2-runbooks/31-8021x-log-collection.md) for per-platform
log sources, then [L2 Certificate Chain Investigation (#32)](../l2-runbooks/32-8021x-cert-investigation.md)
for certificate chain validation, SCEP/PKCS profile deployment diagnosis, EKU and SAN
verification, and expiry analysis.
```

---

### `docs/l1-runbooks/39-8021x-radius-reject.md` (modified — wire live links at line 121)

**Analog:** itself.

Current state (line 121):

```
See L2 Log Collection (#31) for per-platform log sources, then L2 RADIUS/EAP Investigation (#33) for RADIUS policy analysis, EAP method diagnosis, NPS policy rule review, and per-platform EAP negotiation investigation. (Live links wired in Phase 108.)
```

Replace with:

```markdown
See [L2 Log Collection (#31)](../l2-runbooks/31-8021x-log-collection.md) for per-platform
log sources, then [L2 RADIUS/EAP Investigation (#33)](../l2-runbooks/33-8021x-radius-eap-investigation.md)
for RADIUS policy analysis, EAP method diagnosis, NPS policy rule review, and per-platform
EAP negotiation investigation.
```

---

### `docs/l1-runbooks/40-8021x-server-trust-failure.md` (modified — wire live links at line 118)

**Analog:** itself.

Current state (line 118):

```
See L2 Log Collection (#31) for per-platform log sources, then L2 RADIUS/EAP Investigation (#33) for server-name validation analysis and per-platform EAPOL server-trust investigation — #33 is the primary escalation destination for this runbook. Also note L2 Certificate Chain Investigation (#32) as a cross-reference: the trusted-root certificate chain is the root-cause mechanism when the RADIUS server's root CA is not deployed to the device. (Live links wired in Phase 108.)
```

Replace with:

```markdown
See [L2 Log Collection (#31)](../l2-runbooks/31-8021x-log-collection.md) for per-platform
log sources, then [L2 RADIUS/EAP Investigation (#33)](../l2-runbooks/33-8021x-radius-eap-investigation.md)
for server-name validation analysis and per-platform EAPOL server-trust investigation —
#33 is the primary escalation destination for this runbook. Also note
[L2 Certificate Chain Investigation (#32)](../l2-runbooks/32-8021x-cert-investigation.md)
as a cross-reference: the trusted-root certificate chain is the root-cause mechanism when
the RADIUS server's root CA is not deployed to the device.
```

---

### `docs/l1-runbooks/41-8021x-eap-negotiation-failure.md` (modified — wire live links at line 129)

**Analog:** itself.

Current state (line 129):

```
See L2 Log Collection (#31) for per-platform log sources, then L2 RADIUS/EAP Investigation (#33) for EAP method mismatch diagnosis, inner-auth negotiation analysis, and per-platform EAP negotiation investigation. (Live links wired in Phase 108.)
```

Replace with:

```markdown
See [L2 Log Collection (#31)](../l2-runbooks/31-8021x-log-collection.md) for per-platform
log sources, then [L2 RADIUS/EAP Investigation (#33)](../l2-runbooks/33-8021x-radius-eap-investigation.md)
for EAP method mismatch diagnosis, inner-auth negotiation analysis, and per-platform EAP
negotiation investigation.
```

---

## Shared Patterns

### Frontmatter — compound multi-platform L2 token

**Source:** `docs/l1-runbooks/38-8021x-certificate-failure.md` lines 1–7 (compound multi-platform token with `+`-joined platform field, 90-day freshness stamps).
**Apply to:** All three new L2 runbooks (#31, #32, #33).

```yaml
---
last_verified: 2026-06-30
review_by: 2026-09-28
applies_to: both
audience: L2
platform: windows+macos+ios+android+linux
---
```

**90-day rule:** `last_verified` = authoring date; `review_by` = `last_verified` + 90 days. Both fields are required.

### Callout vocabulary constraint

**Source:** `docs/l2-runbooks/27-macos-sso-investigation.md` (only NOTE used; line 51 has an out-of-vocab `Important` — do not copy that).
**Rule (hard constraint):** Only `NOTE`, `WARNING`, `DANGER`, `CRITICAL` are allowed callout labels.

```markdown
> **NOTE:** ...
> **WARNING:** ...
> **DANGER:** ...
> **CRITICAL:** ...
```

**Never use:** `> **Important:**` — corpus nit in #27 line 51; out of vocabulary for Phase 108.

### macOS EAPOL confidence callout

**Source:** `docs/l1-runbooks/38-8021x-certificate-failure.md` line 60 (the NOTE callout used in all four L1 runbooks).
**Apply to:** #31 macOS section, and #33 macOS subsections where the eapolclient log is referenced.

```markdown
> **NOTE — macOS signal confidence:** The macOS `com.apple.eapol` unified-log predicate is
> MEDIUM confidence — sourced from community/Jamf references, not yet confirmed against
> official Apple documentation. If it returns no EAPOL entries even with `--last 2h`, try
> the fallback predicate `log show --predicate 'process == "eapolclient"' --info --last 2h`.
```

### Android adb prerequisites callout

**Source:** `docs/l1-runbooks/38-8021x-certificate-failure.md` line 57 ("requires USB debugging and a tethered PC" note).
**Apply to:** #31 Android section, #33 Android subsections.
Every adb command block must be preceded by this WARNING:

```markdown
> **WARNING:** `adb logcat` collection requires developer options enabled, USB debugging
> enabled, and a USB cable to a PC with adb in PATH. Confirm all three before attempting
> collection. This is an L2-only collection step — do not instruct L1 to run adb commands.
```

### Link-not-copy marker for foundation references

**Source:** `docs/l2-runbooks/24-linux-log-collection.md` line 81 ("reference, don't duplicate"); `docs/l2-runbooks/00-index.md` line 17; `docs/admin-setup-8021x/02-cert-delivery-foundation.md` line 119.
**Apply to:** Any prose in #31, #32, #33 that touches cert-ordering rule, EKU, server-name validation, or EAP method comparison.

Pattern: one sentence + link, zero restatement of the theory itself.

```markdown
For the cert-delivery ordering rule and EKU requirement, see
[Certificate Delivery Foundation](../admin-setup-8021x/02-cert-delivery-foundation.md).
```

### Anchor slug discipline

**Source:** `docs/l1-runbooks/38-8021x-certificate-failure.md` (plain GitHub auto-slugs throughout; no `{#id}` overrides).
**Apply to:** All headings in #31, #32, #33.

Rules:
- No `{#id}` on any heading.
- Avoid consecutive hyphens in heading text — `EAP-TLS` in a heading is safe (`eap-tls` slug); `EAP--TLS` would create a double-hyphen slug (trap).
- Check generated slugs for headings like `### Windows — EAP-Method Mismatch` → slug is `windows--eap-method-mismatch` (the em-dash `—` produces `--`). To avoid the double-hyphen, rephrase: `### Windows: EAP-Method Mismatch` → slug `windows-eap-method-mismatch`. Use a colon separator in cross-platform per-platform headings rather than em-dash.

### "Before starting: collect per [#31]" opener for #32 and #33

**Source:** `docs/l2-runbooks/27-macos-sso-investigation.md` line 17 ("Before starting: collect a diagnostic package per the [macOS Log Collection Guide]…").
**Apply to:** Context section of #32 and #33.

```markdown
Before starting: collect 802.1X logs per
[#31: 802.1X Log Collection](31-8021x-log-collection.md).
```

### Version History table

**Source:** `docs/l2-runbooks/27-macos-sso-investigation.md` lines 202–207.
**Apply to:** All three new L2 runbooks.

```markdown
## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-30 | Phase 108 plan NN: initial authoring — [description] | -- |
```

### Navigation-last ordering (within-phase commit sequence)

**Source:** CONTEXT.md D-03 + RESEARCH.md link-wiring scope section.
**This is an executor ordering constraint, not a content pattern.**

Commit sequence:
1. Wave 1: `docs/l2-runbooks/31-8021x-log-collection.md` (prerequisite first)
2. Wave 2: `docs/l2-runbooks/32-8021x-cert-investigation.md` and `docs/l2-runbooks/33-8021x-radius-eap-investigation.md` (can be authored in parallel, committed together or sequentially — both must exist before Wave 3)
3. Wave 3: `docs/decision-trees/10-8021x-triage.md` + all four L1 runbook link edits (all link-wiring commits after all three #31-33 files are confirmed present)

---

## No Analog Found

All eight files have analogs. No file in Phase 108 requires falling back to RESEARCH.md patterns exclusively. However, note these qualifications:

| File | Qualification |
|------|---------------|
| `docs/l2-runbooks/31-8021x-log-collection.md` | **Weak analog** — all existing log-collection L2 runbooks are single-platform; #31 is the first cross-platform L2 log collection runbook. Hybrid shape is confirmed by D-01's three "per platform" clauses, not by strong precedent. |
| `docs/l2-runbooks/32-8021x-cert-investigation.md` | Same caveat — first cross-platform L2 investigation runbook; #27 analog is single-platform (diverges by failure class, not platform). |
| `docs/l2-runbooks/33-8021x-radius-eap-investigation.md` | Same caveat; additionally, the RADIUS team request checklist has no direct corpus precedent — draw from RESEARCH.md §"#33 RADIUS Team Request Checklist Structure" for the checklist content. |

---

## Metadata

**Analog search scope:** `docs/l2-runbooks/`, `docs/l1-runbooks/`, `docs/decision-trees/`
**Files scanned:** 8 analog files read directly; 4 L1 forward-ref lines confirmed via Grep
**Pattern extraction date:** 2026-06-30
