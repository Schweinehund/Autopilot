---
doc_id: RE-075
status: Approved
owner: L2 Desktop Lead
doc_type: Runbook
last_verified: 2026-07-01
review_by: 2026-09-29
applies_to: both
audience: L2
platform: windows+macos+ios+android+linux
---

**Platform:** All Platforms · **Doc Type:** Runbook · **Doc ID:** RE-075 · **Status:** Approved

# 802.1X RADIUS/EAP Investigation

## Summary

L2 RADIUS/EAP investigation guide for 802.1X failures where certificates are valid but the RADIUS server rejects authentication across all five platforms. All investigation steps require L2 authorization — do not share RADIUS team checklist items or diagnosis steps with end users or L1 technicians. Covers EAP-method mismatch diagnosis (EAP type 13/25/21 cross-reference with NPS policy), server-name validation failure investigation, and RADIUS team request checklist coordination.

> **Platform gate:** This guide covers RADIUS/EAP investigation for 802.1X failures across
> all five platforms (Windows / macOS / iOS/iPadOS / Android / Linux).

> For certificate-chain investigation, see [#32: 802.1X Certificate-Chain Investigation](32-8021x-cert-investigation.md).

> For 802.1X triage routing, see the [802.1X Triage Decision Tree](../decision-trees/10-8021x-triage.md).

**Foundation references (link-not-copy):**
- EAP method co-equal overview (no method is ranked or recommended as a default):
  [EAP Method Overview](../admin-setup-8021x/01-eap-method-overview.md)
- RADIUS server-name validation field requirement:
  [Certificate Delivery Foundation — RADIUS Server-Name Validation](../admin-setup-8021x/02-cert-delivery-foundation.md#radius-server-name-validation)

Do not restate EAP method comparison or server-name validation theory in this runbook —
link to the foundation files above.

## Context

This runbook covers two 802.1X failure classes where certificates are valid (or platform
cert inspection is not available) but the RADIUS server rejects the authentication:

- **EAP method or inner-auth mismatch** — the client profile negotiates a different EAP
  type or inner method than the RADIUS/NPS network policy expects.
- **Server-name validation failure** — the client cannot verify the RADIUS server's
  certificate against the `Certificate server names` field in the Intune profile,
  causing a TLS handshake failure before authentication can complete.

Before starting: collect 802.1X logs per
[#31: 802.1X Log Collection](31-8021x-log-collection.md).

**From L1 escalation?** One of the following L1 runbooks has escalated here:
[#39: RADIUS Reject](../l1-runbooks/39-8021x-radius-reject.md),
[#40: Server Trust Failure](../l1-runbooks/40-8021x-server-trust-failure.md), or
[#41: EAP Negotiation Failure](../l1-runbooks/41-8021x-eap-negotiation-failure.md).
L1 already collected: device serial number, user UPN, platform, Intune profile status
screenshot, and per-platform diagnostic signal output. Route to the matching section below
based on the failure pattern.

---

## RADIUS Team Request Checklist

**NOTE:** Every item below is a **request for information from the RADIUS/NPS team** —
not a configuration step. This runbook does not document NPS server configuration.
(Scope boundary: REQUIREMENTS.md §Out-of-Scope — "RADIUS/NPS server-side build-out out
of scope; Intune client-side config only." Client-side server-name validation and
trusted-root validation are in scope and are covered in the diagnosis sections below.)

Request the following from the RADIUS/NPS team before continuing to per-platform diagnosis.
Gather as much of this information as possible before the first call to the RADIUS team
to minimize round-trips.

1. **NPS event log entries** (from the Windows Security event log on the NPS server)
   around the authentication-attempt timestamp — specifically:
   - Event ID **6273** (Access-Reject): note the **Reason Code** field and the
     **Authentication-Type** field verbatim
   - Event ID **6272** (Access-Accept) for the same device on a successful attempt, as a
     baseline comparison if available

2. **EAP type configured** in the NPS network policy that is expected to match this
   device or user — confirm the exact EAP type number:
   - **13** = EAP-TLS
   - **25** = PEAP
   - **21** = EAP-TTLS

3. **Inner authentication method** — for PEAP (type 25) or EAP-TTLS (type 21): confirm
   the inner method configured in the NPS network policy (MS-CHAPv2 or PAP).

4. **RADIUS server certificate details**: CN, all SANs, issuing CA name, and certificate
   expiry date.

5. **User or device account state**: confirm the account exists in Active Directory or
   Entra ID, is not locked or expired, and is a member of the correct group that the NPS
   network policy conditions reference.

6. **Recent NPS network policy changes**: confirm whether any policy conditions changed
   recently — policy ordering, group membership conditions, RADIUS client list, or
   authentication methods enabled on the policy.

7. **EAP-TLS only — KB5014754 strong certificate mapping (SID-in-SAN)**: confirm whether
   strong certificate mapping is enabled on the NPS server and, if so, whether the client
   certificate passes the mapping check (SID present in SAN extension per KB5014754).

---

## EAP-Method Mismatch Diagnosis

### EAP type codes and co-equal principle

For the full co-equal EAP-method overview — EAP-TLS, PEAP-MSCHAPv2, and EAP-TTLS as
co-equal paths with no method ranked or recommended as a default — see
[EAP Method Overview](../admin-setup-8021x/01-eap-method-overview.md).

The per-platform diagnosis below **matches the client profile to the RADIUS policy** and
identifies mismatches. It does not rank EAP methods or recommend one over another.

### Windows: EAP-Method Mismatch

Collect the `Microsoft-Windows-WLAN-AutoConfig/Operational` log (Wi-Fi) or
`Microsoft-Windows-Wired-AutoConfig/Operational` log (wired) per
[#31](31-8021x-log-collection.md) before performing this diagnosis.

**Diagnosis steps:**

1. Open the exported `.evtx` file in Event Viewer. Filter for events in the failure window.
2. In the event data (XML view), locate the `<EapType>` or `<AuthenticationType>` field.
   The numeric value is the EAP type the client attempted:
   - 13 = EAP-TLS
   - 25 = PEAP
   - 21 = EAP-TTLS
3. Cross-reference this value with the EAP type the RADIUS team confirmed (checklist
   item 2 above). If the values differ, the Intune Wi-Fi or Wired profile is configured
   for a different EAP type than the NPS network policy expects.
4. For PEAP (25) or EAP-TTLS (21): also confirm the inner authentication method in the
   Intune profile matches the inner method the RADIUS team confirmed (checklist item 3).
   Event 11006 (Explicit EAP failure) alongside a PEAP exchange often indicates an
   inner-auth mismatch (e.g., PAP vs. MS-CHAPv2).

**Client-side fix:** Update the Intune Wi-Fi or Wired profile EAP type (and inner-auth
method for PEAP/TTLS) to match the NPS network policy. Do not request the RADIUS team
to change the NPS policy unless both sides have agreed on the target EAP type.

### macOS: EAP-Method Mismatch

**NOTE — macOS signal confidence:** The macOS `com.apple.eapol` unified-log predicate is
MEDIUM confidence — sourced from community/Jamf references, not yet confirmed against
official Apple documentation. If it returns no EAPOL entries even with `--last 2h`, try
the fallback predicate `log show --predicate 'process == "eapolclient"' --info --last 2h`.

Collect the eapolclient unified log per [#31](31-8021x-log-collection.md) before
performing this diagnosis.

**Diagnosis steps:**

1. In the eapolclient log output, look for **EAP-NAK** entries or **method rejection**
   messages. EAP-NAK (Negative Acknowledgement) appears before any identity exchange if
   the client does not support or refuses the server-proposed EAP method.
2. Locate the `CTRL-EVENT-EAP-PROPOSED-METHOD` equivalent in the eapolclient output — this
   shows which method the RADIUS server offered.
3. Compare the offered method to the EAP type configured in the Intune macOS Wi-Fi or
   Wired profile. A mismatch (e.g., server offers EAP-TLS but profile is set to PEAP)
   causes an EAP-NAK and an immediate failure before credentials are exchanged.
4. For PEAP/TTLS: if the outer method matches but the exchange still fails early, confirm
   the inner-auth method in the Intune profile matches checklist item 3 from the RADIUS
   team response.

**Client-side fix:** Update the Intune macOS profile EAP type (and inner-auth method
for PEAP/TTLS) to match the RADIUS team's confirmed NPS policy configuration.

### iOS/iPadOS: EAP-Method Mismatch

No device-side EAP negotiation log is available on iOS/iPadOS. Diagnosis is
symptom-pattern based.

**Key symptom pattern:** If iOS/iPadOS devices fail on an SSID or wired network where
Windows and macOS devices succeed using the same credentials, an EAP configuration
mismatch between the Intune iOS profile and the NPS policy is the most likely cause.

**Diagnosis steps:**

1. In Intune admin center > **Devices** > **iOS/iPadOS** > [device] > **Device
   configuration**, confirm the Wi-Fi or Wired network profile shows **Succeeded**. If
   it shows Error or Pending, the profile has not deployed — this is a delivery issue,
   not an EAP mismatch.
2. Inspect the Intune Wi-Fi or Wired profile configuration:
   - Navigate to **Devices** > **Configuration** > [profile name] > **Properties** >
     **Configuration settings**
   - Confirm the EAP type (EAP-TLS / PEAP / EAP-TTLS) matches the RADIUS team's
     confirmed EAP type (checklist item 2)
   - For PEAP: confirm **Inner authentication method** is set to **MS-CHAPv2**. iOS
     requires MS-CHAPv2 for PEAP inner auth — a profile with **PAP** as the inner
     method causes an immediate EAP-NAK on iOS even when the same profile works on
     other platforms.

**Client-side fix:** Update the Intune iOS/iPadOS profile EAP type and inner-auth method
to match the NPS policy. For PEAP, set inner auth to MS-CHAPv2.

### Android: EAP-Method Mismatch

**WARNING:** `adb logcat` collection requires **developer options enabled** on the device,
**USB debugging enabled**, and **a USB cable connecting the device to a PC with `adb`
in PATH**. Confirm all three prerequisites before attempting collection. This is an
**L2-only collection step** — do not instruct L1 to run `adb` commands.

Collect `adb logcat -s "wpa_supplicant"` output per [#31](31-8021x-log-collection.md)
before performing this diagnosis.

**Diagnosis steps:**

1. In the wpa_supplicant logcat output, look for **EAP-NAK** messages. EAP-NAK lines
   appear when the supplicant rejects the server-proposed EAP method.
2. Look for method negotiation lines that include the EAP type number the server proposed
   and the type the client responded with. A mismatch confirms an EAP-method configuration
   problem on the client side.
3. Cross-reference with the Intune Android Enterprise Wi-Fi profile EAP type:
   - In Intune admin center > **Devices** > **Configuration** > [profile name] >
     **Properties** > **Configuration settings**, confirm the EAP type matches checklist
     item 2 from the RADIUS team response.
   - For EAP-TTLS: confirm the inner authentication method is PAP, MS-CHAP, or MS-CHAPv2
     (not CHAP, which is not supported for Android EAP-TTLS in Intune).

**Client-side fix:** Update the Intune Android profile EAP type and inner-auth method to
match the NPS policy.

### Linux: EAP-Method Mismatch

Collect the NetworkManager journal and wpa_supplicant journal per
[#31](31-8021x-log-collection.md) before performing this diagnosis.

**Diagnosis steps:**

1. In `journalctl -u NetworkManager` output, look for the following event strings:
   - `CTRL-EVENT-EAP-PROPOSED-METHOD` — shows the EAP method number the RADIUS server
     proposed (vendor=0 method=25 for PEAP, method=13 for EAP-TLS, method=21 for
     EAP-TTLS)
   - `CTRL-EVENT-EAP-FAILURE` — EAP exchange rejected after negotiation
2. Compare the proposed method to the EAP type configured in the NetworkManager
   connection profile:

   ```bash
   nmcli connection show <connection-name> | grep "802-1x"
   ```

   Look for `802-1x.eap` (outer EAP method) and `802-1x.phase2-auth` (inner auth for
   PEAP/TTLS). The `802-1x.eap` value must match the EAP type the RADIUS team confirmed
   (checklist item 2); the `802-1x.phase2-auth` must match the inner method (checklist
   item 3).

3. If `CTRL-EVENT-EAP-PROPOSED-METHOD` appears but is followed immediately by a rejection
   (no `CTRL-EVENT-EAP-METHOD` selection), the supplicant rejected the proposed method —
   the client profile EAP type does not match the NPS policy.

**Client-side fix:** Update the NetworkManager connection profile's `802-1x.eap` and
`802-1x.phase2-auth` parameters to match the NPS policy. On Intune-managed Linux
deployments using script-based setup (per Phase 106), update the nmcli configuration
in the deployment script.

---

## Server-Name Validation Failure Diagnosis

For the full server-name validation concept, the `Certificate server names` field
requirement, and the rogue-RADIUS risk of leaving this field unpopulated, see
[Certificate Delivery Foundation — RADIUS Server-Name Validation](../admin-setup-8021x/02-cert-delivery-foundation.md#radius-server-name-validation).

The per-platform diagnosis below confirms whether the client profile has the
`Certificate server names` field populated and matches the RADIUS server's actual
certificate CN or FQDN.

### Windows: Server-Name Validation Failure

Collect the `Microsoft-Windows-WLAN-AutoConfig/Operational` or
`Microsoft-Windows-Wired-AutoConfig/Operational` log, and enable the
`Microsoft-Windows-CAPI2/Operational` log before reproducing the failure, per
[#31](31-8021x-log-collection.md).

**Diagnosis steps:**

1. In the WLAN-AutoConfig or Wired-AutoConfig event log, look for event **8001** entries
   in the failure window. In the event details, look for text referencing:
   - "server certificate chain couldn't be validated"
   - "trust"
   - "chain"
   - "certificate not trusted"
2. In the CAPI2 log, look for certificate chain validation failure events timed to the
   802.1X attempt. These events identify whether the failure is a missing trusted root, an
   expired RADIUS server cert, or a name mismatch.
3. Check whether a user-visible trust prompt appeared on the device during the connection
   attempt. On managed Windows devices with a deployed RADIUS trusted root, no prompt
   should appear — an unexpected prompt indicates the trusted root CA is not installed or
   the server name field is empty, causing Windows to prompt the user instead of validating
   automatically.
4. Inspect the Intune Wi-Fi or Wired profile `Certificate server names` field:
   - Navigate to **Devices** > **Configuration** > [profile name] > **Properties** >
     **Configuration settings**
   - Confirm **Certificate server names** is populated with the RADIUS server's FQDN or
     CN (obtain the correct value from the RADIUS team's checklist item 4 response)
   - If the field is empty, the Windows supplicant cannot verify the RADIUS server name
     and will either fail silently or prompt the user

**Client-side fix:** Populate the `Certificate server names` field in the Intune profile
with the exact RADIUS server CN or FQDN provided by the RADIUS team.

### macOS: Server-Name Validation Failure

**NOTE — macOS signal confidence:** The macOS `com.apple.eapol` unified-log predicate is
MEDIUM confidence — sourced from community/Jamf references, not yet confirmed against
official Apple documentation. If it returns no EAPOL entries even with `--last 2h`, try
the fallback predicate `log show --predicate 'process == "eapolclient"' --info --last 2h`.

Collect the eapolclient unified log per [#31](31-8021x-log-collection.md) before
performing this diagnosis.

**Diagnosis steps:**

1. On managed macOS devices, server-name validation failure is a **silent failure** — no
   trust prompt appears. The device shows "Authentication Failed" or disconnects without
   a visible error. This is distinct from unmanaged macOS devices, which may show a
   system-level trust dialog.
2. In the eapolclient log output, look for:
   - TLS handshake failure messages
   - "identity rejected by server"
   - "server certificate chain verification failed"
   - Any TLS alert messages in the EAP exchange
3. If TLS handshake failure is present but EAP-NAK is absent, the outer EAP type
   matched but the TLS session failed — the most common cause on managed macOS is a
   missing or incorrect `Certificate server names` field.
4. Inspect the Intune macOS Wi-Fi or Wired profile `Certificate server names` field:
   - Navigate to **Devices** > **Configuration** > [profile name] > **Properties** >
     **Configuration settings**
   - Confirm **Certificate server names** is populated with the RADIUS server's FQDN or
     CN suffix (obtain from the RADIUS team's checklist item 4 response)

**Client-side fix:** Populate the `Certificate server names` field in the Intune macOS
profile with the correct RADIUS server CN or FQDN.

### iOS/iPadOS: Server-Name Validation Failure

No device-side log is available for iOS/iPadOS. Diagnosis is through Intune portal
inspection.

**Diagnosis steps:**

1. On managed iOS/iPadOS devices, server-name validation failure presents as a **silent
   "Authentication Failed"** pattern in the Intune portal — no user-facing trust prompt
   on managed devices.
2. In Intune admin center > **Devices** > **iOS/iPadOS** > [device] > **Device
   configuration**, confirm all three profile types show Succeeded:
   - Trusted Certificate profile
   - SCEP or PKCS client certificate profile
   - Wi-Fi or Wired network profile
   If all three show Succeeded but the device cannot authenticate, the failure is in the
   EAP exchange — proceed to check the profile configuration.
3. Inspect the Intune iOS/iPadOS Wi-Fi or Wired network profile `Certificate server names`
   field:
   - Navigate to **Devices** > **Configuration** > [profile name] > **Properties** >
     **Configuration settings**
   - Confirm **Certificate server names** is populated with the RADIUS server's FQDN or
     CN (obtain from the RADIUS team's checklist item 4 response)
   - An empty `Certificate server names` field on a managed iOS device causes silent
     authentication failure with no user prompt

**Client-side fix:** Populate the `Certificate server names` field in the Intune
iOS/iPadOS profile with the correct RADIUS server CN or FQDN.

### Android: Server-Name Validation Failure

**WARNING:** `adb logcat` collection requires **developer options enabled** on the device,
**USB debugging enabled**, and **a USB cable connecting the device to a PC with `adb`
in PATH**. Confirm all three prerequisites before attempting collection. This is an
**L2-only collection step** — do not instruct L1 to run `adb` commands.

**Diagnosis steps:**

1. Begin with the Intune portal. In Intune admin center > **Devices** > **Android
   Enterprise** > [device] > **Device configuration**, confirm the Trusted Certificate,
   SCEP/PKCS, and Wi-Fi profile statuses. All three must show Succeeded before proceeding
   to supplicant-level diagnosis.
2. If adb collection is available (USB prerequisites confirmed), in
   `adb logcat -s "wpa_supplicant"` output look for:
   - SSL certificate verification failure messages
   - TLS handshake failure lines
   - "certificate verification failed" or "unable to verify the first certificate"
3. Inspect the Intune Android Enterprise Wi-Fi profile `Certificate server names` field:
   - Navigate to **Devices** > **Configuration** > [profile name] > **Properties** >
     **Configuration settings**
   - Confirm **Certificate server names** is populated. For Android 11 and later, this
     field is required — profiles without a server name may fail to connect regardless of
     certificate validity
   - Confirm the value matches the RADIUS server CN or FQDN (checklist item 4)
   - For Android 14 and later: confirm the total length of all configured RADIUS server
     names is 256 characters or fewer, and that no special characters are present

**Client-side fix:** Populate the `Certificate server names` field in the Intune Android
profile with the correct RADIUS server CN or FQDN.

### Linux: Server-Name Validation Failure

Collect the NetworkManager and wpa_supplicant journals per
[#31](31-8021x-log-collection.md) before performing this diagnosis.

**Diagnosis steps:**

1. In `journalctl -u NetworkManager` output, look for TLS certificate verification error
   messages, such as:
   - "TLS certificate verification failed"
   - "OpenSSL: SSL_connect" errors
   - "SSL handshake failed"
2. Check the NetworkManager connection profile's server validation parameters:

   ```bash
   nmcli connection show <connection-name> | grep "802-1x"
   ```

   Locate the following fields:
   - `802-1x.domain-suffix-match` — should contain the RADIUS server's domain suffix or
     FQDN. If this field is empty (`--`), the supplicant skips server name verification,
     which is a misconfiguration
   - `802-1x.ca-cert` — should point to the RADIUS root CA certificate file. Confirm the
     file exists at the specified path and contains the correct CA

3. Verify the RADIUS root CA file is present and readable:

   ```bash
   ls -l $(nmcli -g 802-1x.ca-cert connection show <connection-name>)
   ```

   If the file is missing or empty, the supplicant cannot validate the RADIUS server
   certificate chain.

**Client-side fix:** Set `802-1x.domain-suffix-match` to the RADIUS server FQDN or
domain suffix confirmed in checklist item 4. Ensure `802-1x.ca-cert` points to the
correct RADIUS root CA file. On Intune-managed Linux deployments using script-based
setup (per Phase 106), update the nmcli configuration in the deployment script.

---

## Related Resources

- [802.1X Log Collection (#31)](31-8021x-log-collection.md) — prerequisite for this
  runbook; collect per-platform 802.1X log surfaces here before diagnosis
- [802.1X Certificate-Chain Investigation (#32)](32-8021x-cert-investigation.md) —
  cross-reference for failures where the client certificate chain, EKU, or SAN is
  suspect alongside the RADIUS rejection
- [802.1X Triage Decision Tree](../decision-trees/10-8021x-triage.md) — symptom-based
  routing entry point for 802.1X failures
- [EAP Method Overview](../admin-setup-8021x/01-eap-method-overview.md) — co-equal EAP
  paths and inner-method-must-match-RADIUS-policy guidance (link-not-copy)
- [Certificate Delivery Foundation](../admin-setup-8021x/02-cert-delivery-foundation.md) —
  ordering rule, EKU requirement, and RADIUS server-name validation field guidance
  (link-not-copy)
- [Network Authentication Glossary](../_glossary-network.md) — 802.1X, EAP, EAPOL,
  RADIUS, supplicant, server-name validation term definitions
- [L1 #39: RADIUS Reject](../l1-runbooks/39-8021x-radius-reject.md) — escalation source
- [L1 #40: Server Trust Failure](../l1-runbooks/40-8021x-server-trust-failure.md) —
  escalation source
- [L1 #41: EAP Negotiation Failure](../l1-runbooks/41-8021x-eap-negotiation-failure.md) —
  escalation source

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-07-04 | v1.15 EEE reformat — content not re-reviewed | — |
| 2026-07-01 | Phase 108 plan 03: initial authoring — 802.1X cross-platform L2 RADIUS/EAP investigation (#33) | -- |
