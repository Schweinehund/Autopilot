---
doc_id: RE-074
status: Approved
owner: L2 Desktop Lead
doc_type: Runbook
last_verified: 2026-07-01
review_by: 2026-09-29
applies_to: both
audience: L2
platform: windows+macos+ios+android+linux
---

**Platform:** All Platforms · **Doc Type:** Runbook · **Doc ID:** RE-074 · **Status:** Approved

# 802.1X Certificate-Chain Investigation

## Summary

L2 certificate-chain investigation guide for 802.1X failures across all five platforms (Windows, macOS, iOS/iPadOS, Android, Linux). All investigation steps require L2 authorization — do not share commands or certificate inspection procedures with end users or L1 technicians. Covers SCEP delivery channel verification, certificate chain validation (EKU, expiry, chain trust), revocation check failures, and RADIUS server-name validation. Used after 802.1X log collection per Runbook 31.

> **Platform gate:** This guide covers 802.1X certificate-chain investigation across all five
> platforms (Windows / macOS / iOS/iPadOS / Android / Linux).

> For RADIUS/EAP diagnosis, see [#33: 802.1X RADIUS/EAP Investigation](33-8021x-radius-eap-investigation.md).

> For 802.1X triage routing, see the [802.1X Triage Decision Tree](../decision-trees/10-8021x-triage.md).

**Foundation references (link-not-copy):** The cert-delivery ordering rule, EKU requirement
(Client Authentication OID `1.3.6.1.5.5.7.3.2`), and RADIUS server-name validation are
documented in [Certificate Delivery Foundation](../admin-setup-8021x/02-cert-delivery-foundation.md).
Do not restate that theory here — link to it.

## Context

This runbook covers certificate-chain investigation for 802.1X failures under two entry conditions:

- The Intune cert profile shows **Error** or **Pending** (SCEP/PKCS delivery failure — possible
  cert-delivery ordering issue or SCEP enrollment error)
- Profile delivery shows **Succeeded** in the portal but the device cannot authenticate (possible
  cert expiry, EKU mismatch, or SAN mismatch — "Succeeded" in Intune reflects the last Intune
  check-in result and does not guarantee the cert is currently present and valid on the device)

Before starting: collect 802.1X logs per [#31: 802.1X Log Collection](31-8021x-log-collection.md).

**From L1 escalation?** L1 runbook [#38: Certificate Failure](../l1-runbooks/38-8021x-certificate-failure.md)
has escalated here. L1 collected: device serial number, user UPN, platform, Intune cert-profile
status screenshot, and the per-platform diagnostic signal output from the L1 signal table.
Route to the matching platform subsection below.

## Investigation Overview

Validate in this order — all platforms share this sequence before diving into the per-platform
cert-store inspection:

1. **Intune portal: SCEP/PKCS profile deployment status** — confirm both the Trusted Certificate
   profile and the SCEP or PKCS client-cert profile show **Succeeded**. If either shows Error or
   Pending, the delivery failure is the root cause. For the authoritative cert-delivery ordering
   rule (trusted root first, then client cert, then network profile), see
   [Certificate Delivery Foundation](../admin-setup-8021x/02-cert-delivery-foundation.md).
2. **Device cert store: chain, EKU, SAN, expiry** — even when the portal shows Succeeded, verify
   the certificate is actually installed on the device, that EKU includes Client Authentication
   (`1.3.6.1.5.5.7.3.2`), that the SAN matches the expected UPN (user cert) or device name
   (device cert), and that the cert has not expired.
3. **CAPI2 log (Windows only)** — for chain-validation failures during active 802.1X attempts,
   the `Microsoft-Windows-CAPI2/Operational` log (enabled before repro per
   [#31](31-8021x-log-collection.md)) records certificate chain building events and trust anchor
   errors timed to the authentication attempt.

---

## Windows: Certificate Inspection

### Machine Personal cert store

The 802.1X device-based (machine) authentication certificate is stored in the machine Personal
store (`MY`). Inspect it with:

```powershell
# Inspect the machine Personal cert store — all certificates, verbose output
certutil -v -silent -store MY
```

**What to look for in the `-v` output:**

| Field | What to Check |
|-------|--------------|
| `Subject` | CN matches the device hostname or UPN expected by the RADIUS policy |
| `NotBefore` / `NotAfter` | Cert is within its validity period; `NotAfter` is in the future |
| `Enhanced Key Usage` | Contains OID `1.3.6.1.5.5.7.3.2` (Client Authentication). If absent, RADIUS will reject the cert regardless of chain validity |
| `Subject Alternative Names` | UPN (user-cert) or device FQDN / serial number (device-cert) is present and matches what the RADIUS policy expects |
| `Issuer` | The issuing CA matches the CA whose root cert is deployed to the device Trusted Root store |

### User Personal cert store

For user-based 802.1X authentication (EAP-TLS with a per-user certificate):

```powershell
# Inspect the current user's Personal cert store — verbose output
certutil -v -silent -user -store MY
```

Interpret the same fields as the machine store above.

### Trusted Root CA cert store

Confirm the RADIUS server's root CA is deployed to the device:

```powershell
# Inspect the Trusted Root CA store
certutil -v -silent -store ROOT
```

Look for the root CA that issued the RADIUS server's certificate. If that root CA is absent
from this store, the device cannot validate the RADIUS server's certificate and the 802.1X
handshake fails before EAP begins — a server-name validation failure. Route to
[#33](33-8021x-radius-eap-investigation.md) for server-name validation diagnosis.

### Chain and revocation verification (specific cert file)

When you have exported a specific certificate to a `.cer` file for deeper analysis:

```powershell
# Verify the certificate chain and perform revocation check (requires network access to CRL/OCSP)
certutil -verify -urlfetch <cert.cer>
```

This command follows the issuer chain and performs CRL / OCSP revocation checks. A revocation
failure here alongside a CAPI2 chain-building error confirms a revoked or unreachable-CRL
certificate as the root cause.

### CAPI2 log for chain-validation failures

If the `Microsoft-Windows-CAPI2/Operational` log was enabled and exported per [#31](31-8021x-log-collection.md)
before reproducing the failure, open the `.evtx` file in Event Viewer and filter for events
timestamped during the 802.1X attempt window. Look for certificate chain-building errors,
revocation check failures, and trust anchor errors. These events link the WLAN-AutoConfig or
Wired-AutoConfig failure event (8003) to a specific certificate chain problem.

---

## macOS: Certificate Inspection

**NOTE — keychain location:** Client cert location depends on the Intune SCEP profile
deployment channel (device-based SCEP → System keychain; user-based SCEP → Login keychain).
Verify the profile scope before inspecting the wrong keychain — see
[macOS 802.1X Admin Setup](../admin-setup-8021x/04-macos.md) for deployment channel details.

### List all certificates (all keychains)

```bash
# List all certificates across all keychains — shows CN, expiry, thumbprint, and keychain
security find-certificate -a -Z
```

The `-Z` flag includes the SHA-256 thumbprint. Scan the output for a certificate with a CN
or Subject matching the expected device or user identity. Note which keychain it appears in
(System or login) — this confirms whether the deployment channel matches the Intune profile
configuration.

### Find a specific certificate by name

```bash
# Find a certificate by Common Name fragment — output in PEM format
security find-certificate -a -c "Common Name Fragment" -p
```

Replace `Common Name Fragment` with part of the expected CN. The `-p` flag outputs the cert
in PEM format, which can be piped directly to `openssl x509` for detailed inspection.

### Inspect certificate details (EKU, SAN, expiry)

```bash
# Inspect full certificate details from a PEM file — EKU, SAN, Subject, Validity
openssl x509 -in /path/to/client.pem -text -noout
```

In the `openssl x509 -text` output, check:

- `Extended Key Usage` — must include `TLS Web Client Authentication` (OID `1.3.6.1.5.5.7.3.2`).
  If Client Authentication is absent, RADIUS will reject the cert.
- `Subject Alternative Name` — the UPN or device identifier must be present and match the
  identity expected by the RADIUS policy.
- `Validity` → `Not After` — confirm the cert has not expired.

### Verify the certificate chain

```bash
# Verify the client cert chain against the CA certificate
security verify-cert -c /path/to/client.pem
```

A successful chain verification returns `certificate verification successful`. If the root CA
cert is not in the System keychain, chain verification fails — confirm the Trusted Certificate
profile in Intune also shows Succeeded for macOS.

### Keychain Access GUI alternative

**Finder** > **Applications** > **Utilities** > **Keychain Access** → select the System or
login keychain → locate the 802.1X client certificate → double-click → open the **Details**
tab to inspect the EKU and SAN fields without the command line.

---

## iOS/iPadOS: Certificate Inspection

> **NOTE:** No device-side certificate-inspection command is available on iOS/iPadOS. All
> L2 certificate inspection surfaces are read-only Intune portal views and user-assisted
> on-device Settings paths.

### Intune portal: SCEP profile status

Navigate to **Intune admin center** > **Devices** > **iOS/iPadOS** > select device by serial
number > **Device configuration**.

Inspect these profiles in deployment order:

1. **Trusted Certificate** profile — must show **Succeeded**
2. **SCEP** or **PKCS** client certificate profile — must show **Succeeded** after the Trusted
   Certificate profile succeeds. Note any error codes displayed.

For any profile showing Error, expand the profile entry to view the error code. Cross-reference
with the cert-delivery ordering rule in
[Certificate Delivery Foundation](../admin-setup-8021x/02-cert-delivery-foundation.md).

### Intune portal: delivery timestamp

Navigate to **Troubleshooting + Support** > **Troubleshoot** > select the affected user >
**Configuration profiles**.

Review the last-sync timestamp for each 802.1X-related profile. If a profile shows Succeeded
but the last sync occurred days before the failure started, the cert may have expired between
check-in cycles without triggering re-enrollment.

### On-device read-only inspection (user-assisted)

Ask the user to navigate to **Settings** > **General** > **VPN & Device Management** > tap
the MDM profile → confirm that certificate payloads are listed as installed. Tap a certificate
payload to view its CN and expiry date directly on-device.

---

## Android: Certificate Inspection

### Intune portal: SCEP profile status (primary)

Navigate to **Intune admin center** > **Devices** > **Android Enterprise** > select device by
serial number > **Device configuration**.

Inspect these profiles in deployment order:

1. **Trusted Certificate** profile — must show **Succeeded**
2. **SCEP** or **PKCS** client certificate profile — must show **Succeeded**

Error codes from the portal are the primary diagnostic signal for Android — device-side
certificate visibility is limited (see below).

### On-device read-only inspection (limited, user-assisted)

Ask the user to navigate to **Settings** > **Security** > **Encryption & credentials** >
**User certificates**. This view shows installed certificates but does not expose EKU or SAN
details — use it only to confirm that a certificate exists; use the Intune portal and adb for
detailed inspection.

### adb OMADM log (escalation-collected)

**WARNING:** `adb logcat` collection requires **developer options enabled** on the device,
**USB debugging enabled**, and **a USB cable connecting the device to a PC with `adb` in
PATH**. Confirm all three prerequisites before attempting collection. This is an
**L2-only collection step** — do not instruct L1 to run `adb` commands.

The OMADM log on Android contains the SCEP SyncML exchange — the certificate enrollment
request and response. Collect it to determine whether enrollment was attempted, whether the
SCEP server returned an error, or whether enrollment succeeded but the cert subsequently
expired or was removed:

```bash
# OMADM log — contains SCEP enrollment events and SyncML certificate delivery records
adb logcat -s "omadm" "SyncML"
```

Look for SCEP enrollment request events and any error responses in the output. A successful
enrollment record followed by ongoing authentication failures indicates the cert was delivered
but is now expired, has the wrong EKU, or has a SAN mismatch.

---

## Linux: Certificate Inspection

**NOTE:** On Linux, 802.1X certificates are script-deployed — not delivered via an Intune
SCEP certificate profile. See [Linux 802.1X Admin Setup](../admin-setup-8021x/07-linux.md)
for the certificate deployment approach used in this environment. Intune SCEP profile status
check is N/A for Linux — inspect the certificate directly on the device.

### Locate the certificate paths from NetworkManager

First, find the paths to the client cert and CA cert as configured in NetworkManager:

```bash
# Show all 802-1x.* parameters for the 802.1X connection — includes cert file paths
nmcli connection show <connection-name>
```

Look for these fields in the output:

| Parameter | What to Check |
|-----------|--------------|
| `802-1x.client-cert` | Path to the client certificate file used for authentication |
| `802-1x.ca-cert` | Path to the CA / root certificate file for RADIUS server validation |
| `802-1x.identity` | The identity sent during EAP negotiation (UPN or device identifier) |
| `802-1x.eap` | The EAP method configured (`tls`, `peap`, `ttls`) |

### Inspect the client certificate

Using the path from `802-1x.client-cert`:

```bash
# Full certificate details from the client PEM file — EKU, SAN, Subject, Validity
openssl x509 -in /path/to/client.pem -text -noout
```

Check the same fields as macOS above: EKU must include `1.3.6.1.5.5.7.3.2` (Client Authentication),
SAN must match the identity expected by the RADIUS policy (matching the `802-1x.identity`
value), and the cert must not be expired.

### Verify the certificate chain

Using the paths from `802-1x.client-cert` and `802-1x.ca-cert`:

```bash
# Verify the client cert chain against the CA certificate file
openssl verify -CAfile /path/to/ca.pem /path/to/client.pem
```

A valid chain returns `client.pem: OK`. Any error indicates a chain validation failure — either
the wrong CA file is specified in the nmcli connection, or the CA cert file is missing or
corrupt. If the CA file is absent, the Linux supplicant cannot validate the RADIUS server's
certificate either.

---

## SCEP Profile Deployment Status

For platforms with Intune-managed cert delivery (Windows, macOS, iOS/iPadOS, Android), always
check SCEP profile deployment status in the Intune portal before collecting from the device
cert store. The portal may reveal the root cause without device-side access.

| Platform | Intune Portal Path |
|----------|--------------------|
| Windows | Devices > Windows > [device] > Device configuration |
| macOS | Devices > macOS > [device] > Device configuration |
| iOS/iPadOS | Devices > iOS/iPadOS > [device] > Device configuration |
| Android | Devices > Android Enterprise > [device] > Device configuration |
| Linux | N/A — cert is script-deployed; no Intune SCEP profile exists |

In each portal view, inspect the following profiles in this deployment order (see
[Certificate Delivery Foundation](../admin-setup-8021x/02-cert-delivery-foundation.md) for the
ordering rule):

1. **Trusted Certificate** profile — root CA delivery; must show Succeeded before the client
   cert profile can succeed
2. **SCEP** or **PKCS** client certificate profile — must show Succeeded
3. **Wi-Fi** or **Wired network** profile — 802.1X network access profile; last in the chain

A profile showing Error or Pending blocks every profile that follows it in this order.

## EKU / SAN / Expiry Checklist

All platforms share these validation checks. For the authoritative EKU requirement (Client
Authentication OID `1.3.6.1.5.5.7.3.2`) and server-name validation requirements, see
[Certificate Delivery Foundation](../admin-setup-8021x/02-cert-delivery-foundation.md).

| Check | What to Verify | Failure Indicator |
|-------|---------------|-------------------|
| EKU — Client Authentication | OID `1.3.6.1.5.5.7.3.2` present in Extended Key Usage | Cert does not include Client Authentication EKU → RADIUS rejects authentication immediately |
| SAN | UPN (user-cert) or device FQDN / serial (device-cert) present and matching RADIUS policy expectation | SAN mismatch → RADIUS rejects or KB5014754 strong-mapping (SID-in-SAN) fails on NPS |
| Expiry | `Not After` date is in the future | Expired cert → RADIUS rejects authentication immediately |
| Issuer chain | Client cert presents a complete issuer chain on the device, and its issuing CA is trusted by the **RADIUS/NPS server** (client-cert validation happens server-side). Separately, the device Trusted Root store must hold the **RADIUS server's** root CA for server validation — see [#33](33-8021x-radius-eap-investigation.md). | Incomplete client-cert chain, or NPS distrusts the client cert's issuing CA → RADIUS rejects; device missing the RADIUS server's root CA → server-trust failure before EAP begins, route to [#33](33-8021x-radius-eap-investigation.md) |

---

## Related Resources

- [802.1X Log Collection (#31)](31-8021x-log-collection.md) — per-platform 802.1X log
  collection; complete before starting this runbook (includes CAPI2 channel enable procedure
  for Windows chain-validation diagnosis)
- [802.1X RADIUS/EAP Investigation (#33)](33-8021x-radius-eap-investigation.md) — RADIUS/EAP
  investigation for authentication failures where certificate inspection is clean
- [Certificate Delivery Foundation](../admin-setup-8021x/02-cert-delivery-foundation.md) —
  cert-delivery ordering rule, EKU requirement, RADIUS server-name validation (link-not-copy)
- [802.1X Triage Decision Tree](../decision-trees/10-8021x-triage.md) — routing entry point
  for 802.1X failures; L1 runbook #38 escalates here
- [macOS 802.1X Admin Setup](../admin-setup-8021x/04-macos.md) — deployment channel
  (User vs Device keychain, irreversible at profile assignment) and other macOS profile details
- [Linux 802.1X Admin Setup](../admin-setup-8021x/07-linux.md) — script-based certificate
  deployment approach for Linux (no Intune SCEP profile)
- [Network Authentication Glossary](../_glossary-network.md) — 802.1X, EAP, EAPOL, RADIUS,
  SCEP, server-name validation term definitions

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-07-04 | v1.15 EEE reformat — content not re-reviewed | — |
| 2026-07-01 | Phase 108 plan 02: initial authoring — 802.1X cross-platform L2 certificate-chain investigation (#32) | -- |
