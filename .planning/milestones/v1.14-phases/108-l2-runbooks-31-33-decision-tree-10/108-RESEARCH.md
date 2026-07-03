# Phase 108: L2 Runbooks #31-33 + Decision Tree #10 — Research

**Researched:** 2026-06-30
**Domain:** 802.1X cross-platform L2 investigation documentation (log collection, certificate-chain investigation, RADIUS/EAP investigation)
**Confidence:** MEDIUM-HIGH — Windows and iOS/Android portal paths HIGH (Microsoft Learn verified); macOS EAPOL predicate MEDIUM (Jamf/community, no official Apple docs found); Android adb logcat filters MEDIUM (community sources, not AOSP official docs)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01 — Structure = C (hybrid): shared investigation-flow prose + per-platform deep-dive SUBSECTIONS** (HIGH)
- Three SC "per platform" clauses in the ROADMAP force the per-platform axis
- L2 depth = deep collect + INTERPRET (contrast L1's read-only "name the signal" boundary from P107 D-05)
- Rejected pure per-platform subsections (5x-restates shared methodology) and rejected compact per-platform TABLE (table cells cannot hold multi-step commands + interpretation)

**D-02 — #31 = C (hybrid): LINK the general diagnostic-package step to #01/#10/#14/#18/#24; SELF-CONTAIN the net-new 802.1X-specific signal/filter set** (HIGH)
- 802.1X-specific sources (WLAN-AutoConfig/Wired-AutoConfig channels, wpa_supplicant filters, 802.1X adb logcat filters) are net-new — none of the five existing runbooks contain them
- General device diagnostic package IS homed in #01/#10/#14/#18/#24 and MUST be linked, not restated
- Violation of link-not-copy is a hard corpus constraint

**D-03 — Tree wiring = A: Phase 108 wires the live L2 links (#31/#32/#33) into `10-8021x-triage.md` once those files are committed** (HIGH)
- Doubly anchored: P107 D-04 ("Phase 108 only wires the tree's L2-escalation leaves once #31-33 exist") + tree's own self-note at line 77
- Navigation-last ordering within Phase 108: #31-33 commit first, then tree link, then L1 runbook links
- Phase 109's six-hub nav list does NOT include the decision tree

**D-04 — #33 framing = C (hybrid): RADIUS-team request checklist + per-platform EAP-method-mismatch + per-platform server-name-validation diagnosis subsections** (HIGH)
- SC3 is a literal three-clause enumeration: request checklist + EAP-mismatch diagnosis + server-name-validation diagnosis
- Request checklist must stay on the ask-the-NPS-team side — never drift into NPS configuration
- Client-side server-name/trusted-root validation IS in scope (per REQUIREMENTS.md:80)

### Claude's Discretion
- Exact runbook filenames (suggested: `31-8021x-log-collection.md`, `32-8021x-cert-investigation.md`, `33-8021x-radius-eap-investigation.md`)
- Prose, section ordering, callout phrasing/labels — within hybrid structure (D-01), link/self-contain split (D-02), SC3 three-part shape (D-04)
- Exact shape of shared investigation-flow prose vs per-platform subsection boundary
- Exact per-platform command sequences (subject to the "log filters verified at plan time" mandate)
- Exact node-label wording of newly-live L2 links in the decision tree (provided P107 D-07 routing map holds)

### Deferred Ideas (OUT OF SCOPE)
- All global navigation wiring — capability-matrix rows + six nav hubs (`docs/index.md`, `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, `l1-runbooks/00-index.md`, `l2-runbooks/00-index.md`) → Phase 109 (DOT1X-11)
- Foundation theory restatement — cert-ordering, EKU, SAN, server-name-validation, EAP comparison → already in `01-`/`02-`/`_glossary-network.md`; link only
- General device diagnostic-package collection restatement — homed in #01/#10/#14/#18/#24; #31 links
- RADIUS/NPS server config, NPS policy build-out, PKI/CA build-out, switch/AP port config
- Refreshing past-due link targets — #01 (`review_by: 2026-06-19`) and #24 (`review_by: 2026-06-26`)
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DOT1X-10 | L2 engineer can investigate 802.1X failures via runbooks #31-33 using the per-platform diagnostic-signal map (Windows event channels / macOS logs / Android adb logcat / Linux journalctl — **log filters verified at plan time**) | Windows channel names confirmed [VERIFIED: Microsoft Learn]; macOS predicate confirmed [MEDIUM confidence: Jamf/community]; iOS portal path confirmed [VERIFIED: Microsoft Learn]; Android filter tags confirmed [MEDIUM confidence: community]; Linux journalctl filters confirmed [MEDIUM confidence: Ubuntu docs/community] |
</phase_requirements>

---

## Summary

Phase 108 authors three cross-platform L2 investigation runbooks (#31-33) and wires live L2 links into the decision tree (and L1 runbooks) once the new files are committed. The primary research mandate — the "log filters verified at plan time" clause in DOT1X-10 — has been executed: exact per-platform diagnostic-signal strings are documented below with confidence levels and source citations.

The single most important finding for the planner is the **macOS EAPOL signal confidence clarification**: the `com.apple.eapol` unified-log predicate used throughout the L1 runbooks carries a MEDIUM confidence tag because no official Apple documentation was found in this session or prior sessions. This predicate should be presented in #31 with an explicit confidence callout and a documented fallback (`process == "eapolclient"` predicate). Research confirmed multiple community/Jamf sources using this predicate and no official Apple developer documentation for it.

The second important finding is a **link-wiring scope clarification**: while the CONTEXT.md D-03 explicitly names only the decision tree `10-8021x-triage.md` for link-wiring, all four L1 runbooks (#38-#41) also carry inline prose forward-refs reading "(Live links wired in Phase 108.)" The planner should wire these simultaneously with the decision tree — they share the same navigation-last ordering requirement and are clearly in Phase 108's intent.

**Primary recommendation:** Build Phase 108 as three waves — Wave 1: #31 (log collection); Wave 2: #32 and #33 (cert + RADIUS investigation, can be authored in parallel); Wave 3: link-wiring (decision tree + four L1 runbooks, commit-ordered after #31-33).

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| L2 log collection — Windows 802.1X | Client (Windows supplicant) | Intune portal | WLAN-AutoConfig/Wired-AutoConfig events live on the device; Intune portal shows profile deployment status only |
| L2 log collection — macOS 802.1X | Client (macOS unified log / eapolclient) | Intune portal | eapolclient runs on device; portal shows SCEP profile status |
| L2 log collection — iOS 802.1X | Intune portal | On-device Settings (read-only) | No device-side 802.1X log command exists on iOS; portal is the only diagnostic surface |
| L2 log collection — Android 802.1X | Client (adb logcat — escalation only) | Intune portal (L2 primary) | adb logcat requires tethered PC + USB debugging; Intune portal gives SCEP profile status |
| L2 log collection — Linux 802.1X | Client (journalctl / wpa_supplicant) | — | NetworkManager manages wpa_supplicant as subprocess on Ubuntu; both journalctl units are on-device |
| Certificate-chain investigation | Client (device cert store) | Intune portal (SCEP status) | Chain, EKU, SAN, expiry all inspected from device cert store; Intune portal confirms profile delivery |
| RADIUS/EAP investigation | Shared (client supplicant logs) + RADIUS team (server-side) | Intune portal | Client-side EAP negotiation in supplicant logs; RADIUS-team request documents what to ask for — no NPS config |
| Decision tree + L1 link wiring | Documentation (this phase) | — | Navigation-last within-phase: #31-33 commit first, then links |

---

## Standard Stack

This phase is a pure documentation authoring phase — no packages are installed. Skip Standard Stack and Package Legitimacy Audit.

---

## Package Legitimacy Audit

Not applicable — no packages installed in this documentation phase.

---

## Architecture Patterns

### Per-Platform Diagnostic-Signal Map (DOT1X-10 Core Deliverable)

This is the verified-at-plan-time signal map required by DOT1X-10. Each signal is tagged with confidence level and source.

#### Windows — 802.1X Log Collection

**Wireless channel:**
```
Event Viewer path: Applications and Services Logs\Microsoft\Windows\WLAN-AutoConfig\Operational
Channel name for wevtutil: Microsoft-Windows-WLAN-AutoConfig/Operational
```
[VERIFIED: Microsoft Learn — "Data collection for troubleshooting 802.1X authentication issues", 2026-02-12]

**Wired channel:**
```
Event Viewer path: Applications and Services Logs\Microsoft\Windows\Wired-AutoConfig\Operational
Channel name for wevtutil: Microsoft-Windows-Wired-AutoConfig/Operational
```
[VERIFIED: Microsoft Learn — same source as above]

> **Naming clarification for the planner:** The ROADMAP.md SC1 uses the shorthand "WLAN-AutoConfig/Dot3Svc channels." The Windows Wired AutoConfig *service* is `dot3svc`, but the *event channel* is `Microsoft-Windows-Wired-AutoConfig/Operational` — not "Dot3Svc". All runbook content must use the correct channel name `Microsoft-Windows-Wired-AutoConfig/Operational`.

**Certificate-chain diagnostic channel (for #32):**
```
Event Viewer path: Applications and Services Logs\Microsoft\Windows\CAPI2\Operational
Channel name: Microsoft-Windows-CAPI2/Operational
(Must be enabled: wevtutil.exe sl Microsoft-Windows-CAPI2/Operational /e:true)
```
[VERIFIED: Microsoft Learn — same data collection source]

**Key event IDs (stable, documented by Microsoft Learn):**
- Event 8001: 802.1X authentication attempt
- Event 8002: 802.1X authentication succeeded
- Event 8003: 802.1X authentication failed / disconnected
- Event 12013: 802.1X authentication attempt (supplement)
- Event 11006: Explicit EAP failure received
- CAPI2 events: certificate chain validation failures (for #32)
[VERIFIED: Microsoft Learn Q&A and 802.1X troubleshooting guide]

**Read-only collection command (L2 use, no state change):**
```powershell
# Export WLAN-AutoConfig log (read-only):
wevtutil epl "Microsoft-Windows-WLAN-AutoConfig/Operational" C:\MSLOG\WLAN-AutoConfig.evtx
# Export Wired-AutoConfig log:
wevtutil epl "Microsoft-Windows-Wired-AutoConfig/Operational" C:\MSLOG\Wired-AutoConfig.evtx
# Enable CAPI2 (required before collecting — state-changing; note in runbook):
wevtutil.exe sl Microsoft-Windows-CAPI2/Operational /e:true
wevtutil epl Microsoft-Windows-CAPI2/Operational C:\MSLOG\CAPI2.evtx
```
[VERIFIED: Microsoft Learn]

#### macOS — 802.1X Log Collection

**Primary predicate (unified log):**
```bash
log show --predicate 'subsystem contains "com.apple.eapol"' --info --last 30m
```
[MEDIUM confidence — Jamf technical paper + community references; NO official Apple developer documentation found]

**Alternative (more specific):**
```bash
log show --style syslog --predicate 'processImagePath contains "eapolclient" and subsystem contains "com.apple.eapol"' --last 30m
```
[MEDIUM confidence — Jamf/community]

**Fallback predicate (if primary returns empty):**
```bash
log show --predicate 'process == "eapolclient"' --info --last 2h
```
[MEDIUM confidence — community; already documented in L1 runbooks as the fallback]

**GUI alternative — Wireless Diagnostics:**
Option-click Wi-Fi menu bar icon → **Open Wireless Diagnostics...** → Window menu → **Utilities** → **Logging** tab → enable EAPOL → **Collect Logs**. Produces a bundle including `wifi.log` and EAPOL-specific captures.
[MEDIUM confidence — community sources; this is the origin of the "Console.app/wifi.log" shorthand in the ROADMAP SC1]

> **ROADMAP SC1 notation clarification:** "macOS Console.app/wifi.log" in the ROADMAP refers to two surfaces: Console.app (GUI view of the unified log, filtering for `eapolclient`) and the `wifi.log` file produced by the Wireless Diagnostics tool. Modern macOS (Sierra+) no longer writes `/var/log/eapolclient/` files — that path is pre-Sierra legacy. The authoritative L2 collection method is the `log show` predicate or Wireless Diagnostics.

> **Confidence callout required in #31:** The macOS EAPOL predicate is MEDIUM confidence (no official Apple source found in two research sessions). The runbook must carry an inline NOTE callout for this, matching the callout already present in all four L1 runbooks.

#### iOS/iPadOS — 802.1X Log Collection

**Confirmed: NO device-side log command exists for 802.1X on iOS/iPadOS.**
[VERIFIED: Multiple Microsoft Learn sources; confirmed across all four L1 runbooks authored in Phase 107]

L2 diagnostic surfaces:
1. Intune portal: **Devices** > iOS/iPadOS > [device] > **Device configuration** — inspect Trusted Certificate, SCEP/PKCS cert, and Wi-Fi/Wired network profile statuses
2. Intune portal: **Troubleshooting + Support** > **Troubleshoot** > [user] > **Configuration profiles** — confirms profile delivery timing
3. On-device (read-only, user-assisted): **Settings** > **General** > **VPN & Device Management** — confirm profiles are listed; tap profile to view certificate payloads
[VERIFIED: Microsoft Learn — SCEP troubleshooting guide, 2026-03-30; confirmed across L1 runbooks]

#### Android — 802.1X Log Collection

**Primary filter (L2 escalation-collected; requires USB debugging + tethered PC):**
```bash
adb logcat -s "wpa_supplicant"
```
[MEDIUM confidence — community sources, not AOSP official documentation]

**Verbose form:**
```bash
adb logcat wpa_supplicant:V *:S
```
[MEDIUM confidence — community]

**For newer Android (11+ where WifiStateMachine was replaced by ClientModeImpl):**
```bash
adb logcat -s "WifiNative" "ClientModeImpl" "WifiMonitor"
```
[LOW confidence — Android internals vary by OEM and OS version; treat as supplemental]

> **Android confidence and scope:** Android wpa_supplicant tag behavior varies by OEM and Android version. The `wpa_supplicant` tag is the most stable cross-vendor filter. `ClientModeImpl` replaced `WifiStateMachine` in Android 11+ (AOSP) but OEM implementations diverge. Use `wpa_supplicant` as the primary filter and note the OEM/version variability in the runbook.

**Requirements for Android adb collection:**
- Developer options enabled on device
- USB debugging enabled
- USB cable to a PC with adb installed
- This is explicitly an L2-only collection step — L1 runbooks already tell L1 to "name this signal, do not collect"

**L2 Intune portal path (primary for deployment status):**
Intune admin center > **Devices** > Android Enterprise > [device] > **Device configuration** — inspect Trusted Certificate and SCEP/PKCS cert profile statuses
[VERIFIED: Microsoft Learn — SCEP deployment troubleshooting]

#### Linux — 802.1X Log Collection

**Primary (NetworkManager manages wpa_supplicant as subprocess on Ubuntu):**
```bash
journalctl -u NetworkManager
```
[MEDIUM confidence — Ubuntu community documentation; established in L1 runbooks]

**Supplement (wpa_supplicant running as standalone unit):**
```bash
journalctl -u wpa_supplicant
```
[MEDIUM confidence — Ubuntu manpages + community]

**Interface-specific (when interface-scoped wpa_supplicant unit is used):**
```bash
journalctl -u wpa_supplicant@<interface>
# e.g.: journalctl -u wpa_supplicant@wlan0
```
[MEDIUM confidence — community/GitHub]

**Filtered view (EAP events only, useful for L2 interpretation):**
```bash
journalctl -u NetworkManager --since "30 minutes ago" | grep -i "802.1x\|eap\|supplicant"
```
[ASSUMED — grep filtering is standard shell; the NM unit name is verified]

**Key EAP event strings in wpa_supplicant journal output:**
- `CTRL-EVENT-EAP-STARTED` — EAP negotiation begins
- `CTRL-EVENT-EAP-PROPOSED-METHOD` — server proposes EAP method
- `CTRL-EVENT-EAP-METHOD` — method selected
- `CTRL-EVENT-EAP-SUCCESS` — EAP succeeded
- `CTRL-EVENT-EAP-FAILURE` — EAP failed (authentication rejected)
[MEDIUM confidence — wpa_supplicant documentation + community examples]

> **Ubuntu log routing:** On Ubuntu 22.04/24.04 LTS with NetworkManager, the wpa_supplicant subprocess runs under the NM process; `journalctl -u NetworkManager` captures both NM-level and EAP-level events in one stream. `journalctl -u wpa_supplicant` is the supplement when wpa_supplicant is running standalone (e.g., in scripts per Phase 106). Both journals should be collected.

---

### Per-Platform Certificate Inspection Commands (#32 Core Deliverable)

These commands enable L2 to validate the deployed client cert, SCEP profile state, EKU, SAN, and expiry per platform.

#### Windows Certificate Inspection

```powershell
# Inspect machine Personal cert store (device-based 802.1X cert):
certutil -v -silent -store MY

# Inspect user Personal cert store (user-based 802.1X cert):
certutil -v -silent -user -store MY

# Inspect Trusted Root CA store:
certutil -v -silent -store ROOT

# Verify a specific certificate file (chain + revocation check — requires network access):
certutil -verify -urlfetch <cert.cer>
```
[VERIFIED: Microsoft Learn data collection guide + certutil docs]

The `certutil -v` output includes:
- Certificate serial number, thumbprint, Subject CN
- Not Before / Not After (expiry)
- Extended Key Usage OIDs (look for `1.3.6.1.5.5.7.3.2` = Client Authentication)
- Subject Alternative Names (DNS or UPN for SAN)
- Issuer and chain
[VERIFIED: Microsoft Learn certutil reference]

**CAPI2 event log** for chain validation failures during active 802.1X attempts (must be enabled before the auth attempt — see Windows log collection above).

#### macOS Certificate Inspection

```bash
# List all certificates in all keychains (shows cert CN, expiry):
security find-certificate -a -Z

# Find a specific certificate by name:
security find-certificate -a -c "Common Name Fragment" -p

# Verify certificate chain (from PEM file):
security verify-cert -c /path/to/client.pem

# Inspect certificate details with openssl (EKU, SAN, expiry):
openssl x509 -in /path/to/client.pem -text -noout
```
[ASSUMED for security commands — standard macOS command-line tools; VERIFIED for openssl via Ubuntu manpages (cross-platform)]

**Keychain Access GUI alternative:** Finder > Applications > Utilities > Keychain Access → select "My Certificates" view → find certificate → double-click → inspect Details tab for EKU and SAN.

For SCEP-delivered certs on macOS: cert is in the **System** keychain (device-based) or **Login** keychain (user-based) depending on the Intune SCEP profile deployment channel (the irreversible D-01 macOS constraint from Phase 103).

#### iOS/iPadOS Certificate Inspection

No device-side command available. L2 inspection paths:

1. Intune portal: **Devices** > iOS/iPadOS > [device] > **Device configuration** → SCEP cert profile status (Succeeded/Error/Pending)
2. Intune **Troubleshooting + Support** > **Troubleshoot** > [user] > **Configuration profiles** — delivery timestamp + last sync
3. On-device (user-assisted): **Settings** > **General** > **VPN & Device Management** > [MDM profile] → view certificate payloads installed under this profile
[VERIFIED: Microsoft Learn SCEP troubleshooting guide]

#### Android Certificate Inspection

L2 portal path (primary):
Intune admin center > **Devices** > Android Enterprise > [device] > **Device configuration** → inspect Trusted Certificate and SCEP/PKCS cert profile statuses
[VERIFIED: Microsoft Learn SCEP troubleshooting guide]

On-device (limited, user-assisted):
**Settings** > **Security** > **Encryption & credentials** > **User certificates** — limited visibility; shows installed certificates but not EKU details

Via adb (escalation-collected, L2 only):
```bash
# OMADM log on device (contains SCEP enrollment events):
adb logcat -s "omadm" "SyncML"
```
[ASSUMED — community/Microsoft SCEP troubleshooting; OMADM logs contain the SCEP SyncML exchange]

#### Linux Certificate Inspection

Certificates are delivered by script (not via Intune profile — per Phase 106 D-01). The path is whatever the admin script set in the wpa_supplicant configuration.

```bash
# Inspect client certificate (find path from wpa_supplicant.conf or nmcli):
openssl x509 -in /path/to/client.pem -text -noout
# Look for: Extended Key Usage, Subject Alternative Names, Validity dates

# Verify chain:
openssl verify -CAfile /path/to/ca.pem /path/to/client.pem

# Check NetworkManager 802-1x.* connection parameters (shows cert paths):
nmcli connection show <connection-name>
# Look for: 802-1x.client-cert, 802-1x.ca-cert, 802-1x.identity, 802-1x.eap
```
[ASSUMED for nmcli cert path inspection — standard nmcli usage; openssl inspection is industry-standard]

**No Intune SCEP profile for Linux** — cert is manually deployed via script. SCEP profile status check is N/A; cert state must be verified directly on device.

---

### #33 RADIUS Team Request Checklist Structure

The checklist lives on the "ask side" only — no NPS configuration steps. Per D-04 and REQUIREMENTS.md:80.

**Information to request from the RADIUS/NPS team:**
1. NPS event log entries around the authentication attempt time (Event ID 6273 = reject, 6272 = accept; from Windows Security event log on NPS server)
2. The EAP type configured in the NPS network policy that should apply to this device/user
3. The inner authentication method (for PEAP/TTLS) configured in the NPS network policy
4. The RADIUS server certificate details: CN, SANs, issuing CA, and expiry
5. Confirmation that the user/device account exists and is not locked, expired, or in wrong group
6. Whether any NPS network policy conditions changed recently (policy ordering, group membership conditions)
7. For EAP-TLS: whether certificate mapping (SID-in-SAN, KB5014754 strong mapping) is enabled and whether the client cert passes the mapping requirement

[ASSUMED — standard RADIUS troubleshooting information; the NPS event IDs are VERIFIED from Microsoft Learn; the SID-in-SAN reference is from Phase 102 established context]

**Per-platform EAP-method-mismatch diagnosis signals (for #33 per-platform subsections):**

| Platform | Signal | What to Look For |
|----------|--------|-----------------|
| Windows (Wi-Fi/Wired) | WLAN-AutoConfig/Wired-AutoConfig events | EAP type number: 13 = EAP-TLS, 25 = PEAP, 21 = EAP-TTLS; method mismatch text |
| macOS | eapolclient log | EAP negotiation sequence; "EAP-NAK" or method rejection before identity exchange |
| iOS/iPadOS | Symptom pattern only | iOS PEAP always requires MS-CHAPv2 inner auth — if iOS fails while others succeed, check PAP vs MS-CHAPv2 inner auth |
| Android | adb logcat wpa_supplicant | EAP-NAK events; method negotiation messages |
| Linux | journalctl NM / wpa_supplicant | `CTRL-EVENT-EAP-PROPOSED-METHOD`, `CTRL-EVENT-EAP-FAILURE` |

**Per-platform server-name-validation failure signals (for #33 per-platform subsections):**

| Platform | Signal | What to Look For |
|----------|--------|-----------------|
| Windows | WLAN-AutoConfig event 8001 / CAPI2 | "server certificate chain couldn't be validated"; "trust" or "chain" text; trust prompt (user-visible) |
| macOS | eapolclient log | TLS handshake failure; "identity rejected by server"; silent "Authentication Failed" (no trust prompt on managed devices) |
| iOS/iPadOS | Silent "Authentication Failed" in portal | No trust prompt on managed devices; check Certificate server names field in Intune profile |
| Android | Intune portal / adb logcat wpa_supplicant | wpa_supplicant: SSL certificate verification failure; check Certificate server names field |
| Linux | journalctl NM / wpa_supplicant | TLS certificate verification error; check 802-1x.domain-suffix-match or 802-1x.ca-cert in nmcli |

**Foundation link targets for #33 (link-not-copy):**
- Server-name validation: `02-cert-delivery-foundation.md:98-106` ("RADIUS Server-Name Validation" section)
- EAP method mismatch: `01-eap-method-overview.md:121,129` (inner-method-must-match-RADIUS-policy)
- Co-equal EAP preserved: no method ranking in diagnosis; match the profile to the RADIUS policy, never prefer one method

---

### Runbook Internal Structure (D-01 Hybrid Pattern)

**Template source:** `docs/l2-runbooks/27-macos-sso-investigation.md` — shared Context + "Before starting" prerequisite link + "From L1 escalation?" routing prose → deep per-track subsections.

**Phase 108 variant:** Same hybrid shape but with per-platform subsections instead of per-failure-class tracks.

**#31 internal structure:**
```
frontmatter (platform: windows+macos+ios+android+linux; audience: L2; last_verified; review_by)
platform gate callout
title: 802.1X Log Collection

Context section:
  - Purpose: prerequisite for #32 and #33
  - "Before starting" → link to general diagnostic package per #01/#10/#14/#18/#24 (D-02 link)
  - From L1 escalation routing

Shared investigation flow:
  - Overview of what 802.1X logs capture vs what they don't
  - Principle: collect complete output; L2 interprets

Per-platform deep-dive subsections (one per platform):
  ### Windows (Wi-Fi)  ← exact channel name + wevtutil export command + CAPI2 note
  ### Windows (Wired)  ← exact wired channel + wevtutil
  ### macOS           ← log show predicate + confidence callout + Wireless Diagnostics alternative
  ### iOS/iPadOS      ← Intune portal path + on-device Settings confirmation (no device command)
  ### Android         ← adb logcat procedure (USB debugging prereqs) + Intune portal path
  ### Linux           ← journalctl -u NetworkManager + journalctl -u wpa_supplicant

Related resources → link #32 and #33
```

**#32 internal structure:**
```
frontmatter (platform: windows+macos+ios+android+linux; audience: L2)
platform gate callout + link-not-copy to 02-cert-delivery-foundation.md

Context + "Before starting: collect logs per [#31]"

Shared investigation flow:
  - What to validate: chain, EKU (OID 1.3.6.1.5.5.7.3.2), SAN, expiry, SCEP profile status
  - Link: cert-delivery ordering rule, EKU requirement → 02-cert-delivery-foundation.md
  - Principle: validate SCEP profile status in Intune portal first; then inspect device cert store

Per-platform subsections:
  ### Windows   ← certutil commands, CAPI2 events
  ### macOS     ← security find-certificate, Keychain Access, deployment channel note
  ### iOS/iPadOS ← Intune portal path, on-device Settings path, no device command
  ### Android   ← Intune portal path, limited on-device visibility
  ### Linux     ← openssl x509 inspection, nmcli 802-1x.* params, no Intune cert profile

SCEP Profile Deployment Status — per platform (Intune portal inspection paths)
EKU / SAN / Expiry Checklist (shared — links to 02-cert-delivery-foundation.md)
```

**#33 internal structure:**
```
frontmatter (platform: windows+macos+ios+android+linux; audience: L2)
platform gate callout + link-not-copy to 01-eap-method-overview.md + 02-cert-delivery-foundation.md

Context + "Before starting: collect logs per [#31]"

RADIUS Team Request Checklist (ask-side only; NOTE callout: not NPS configuration steps)
  - NPS event log entries (IDs 6272/6273)
  - EAP type + inner auth method in NPS network policy
  - RADIUS server cert details
  - User/device account state
  - Policy change history

Per-platform EAP-Method-Mismatch Diagnosis:
  ### Windows   ← WLAN-AutoConfig event EAP type codes
  ### macOS     ← eapolclient EAP-NAK pattern
  ### iOS/iPadOS ← symptom-pattern diagnosis (iOS PEAP requires MS-CHAPv2)
  ### Android   ← adb logcat EAP-NAK events
  ### Linux     ← CTRL-EVENT-EAP-PROPOSED-METHOD events

Per-platform Server-Name-Validation Failure Diagnosis:
  ### Windows   ← trust prompt + CAPI2 chain failure + Certificate server names field check
  ### macOS     ← silent failure + eapolclient TLS handshake failure
  ### iOS/iPadOS ← silent failure + Intune profile Certificate server names check
  ### Android   ← SSL cert verification in wpa_supplicant log
  ### Linux     ← 802-1x.domain-suffix-match / 802-1x.ca-cert check in nmcli
```

---

### Link-Wiring Scope (Decision Tree + L1 Runbooks)

**Decision tree `10-8021x-triage.md` (D-03, CONTEXT.md in scope):**
- Line 77 prose note: `"(Live links to L2 Log Collection #31 and L2 investigation runbooks #32 and #33 will be wired in Phase 108.)"` → replace with actual links to `../l2-runbooks/31-8021x-log-collection.md`, `../l2-runbooks/32-8021x-cert-investigation.md`, `../l2-runbooks/33-8021x-radius-eap-investigation.md`
- EAPE node in Mermaid: add `click EAPE "../l2-runbooks/31-8021x-log-collection.md"` directive (D-06 from Phase 107 said this was deferred to Phase 108)
- Honor existing `classDef`, `click` directive style, Legend, Routing-Verification table house style

**L1 runbooks #38-#41 (implied in scope — each says "Live links wired in Phase 108"):**
- `38-8021x-certificate-failure.md` bottom — forward-ref points to #31 + #32
- `39-8021x-radius-reject.md` bottom — forward-ref points to #31 + #33
- `40-8021x-server-trust-failure.md` bottom — forward-ref points to #31 + #33 primary + #32 cross-ref
- `41-8021x-eap-negotiation-failure.md` bottom — forward-ref points to #31 + #33
- Each should replace `(Live links wired in Phase 108.)` with live Markdown links
- Navigation-last ordering: these commits come AFTER #31-33 are committed

**L1-to-L2 routing map (P107 D-07, confirmed):**
- L1 #38 (cert failure) → L2 #32 (cert investigation); #31 = prerequisite
- L1 #39 (RADIUS reject) → L2 #33 (RADIUS/EAP investigation); #31 = prerequisite
- L1 #40 (server trust) → L2 #33 primary + #32 cross-reference; #31 = prerequisite
- L1 #41 (EAP negotiation) → L2 #33; #31 = prerequisite

---

### Compound Multi-Platform Frontmatter (D-02 precedent from Phase 107)

```yaml
---
last_verified: 2026-06-30
review_by: 2026-09-28
applies_to: both
audience: L2
platform: windows+macos+ios+android+linux
---
```

Matches the Phase 107 L1 runbook pattern exactly (`+`-joined platform token, 90-day freshness stamp, `audience: L2`).

---

### Corpus Callout Vocabulary and Anchor Conventions

Per 107-CONTEXT.md D-06 census and CONTEXT.md Claude's Discretion:
- Allowed callout labels: `NOTE`, `WARNING`, `DANGER`, `CRITICAL`
- **Forbidden:** `IMPORTANT` (pre-existing corpus nit in `27-macos-sso-investigation.md:51`; do NOT introduce it)
- Anchor slugs: plain GitHub auto-slugs; no `{#id}` overrides
- Double-hyphen trap: avoid consecutive hyphens in heading text (e.g., "EAP-TLS" in a heading → slug becomes `eap-tls` not `eap--tls`; be deliberate)
- Freshness stamps: `last_verified` + 90 days = `review_by` in frontmatter

---

### D-02 Verified: Net-New 802.1X Signals in Existing L2 Log-Collection Runbooks

Spot-check confirmed from file reads:
- `01-log-collection.md` — covers `mdmdiagnosticstool.exe`, Autopilot event logs, MDM/AAD/provisioning channels. **No 802.1X signals.**
- `10-macos-log-collection.md` — covers IntuneMacODC zip, macOS Intune agent logs. **No eapolclient / 802.1X signals.**
- `14-ios-log-collection.md` — covers MDM diagnostic report, Company Portal log upload, sysdiagnose via Mac+cable. **No 802.1X signals.**
- `18-android-log-collection.md` — covers Company Portal / Microsoft Intune app logs, adb logcat for general Intune agent; OMADM log focus. **No 802.1X-specific wpa_supplicant filters.**
- `24-linux-log-collection.md` — covers `journalctl` for `intune-agent`, `intune-portal`, `microsoft-identity-broker`. **No wpa_supplicant / NetworkManager 802.1X signals.**

D-02 net-new verdict confirmed: `#31` must self-contain all five 802.1X signal sets.

---

### Anti-Patterns to Avoid

- **Restating cert-ordering, EKU, server-name-validation theory** in runbook prose — these are homed in `02-cert-delivery-foundation.md`; link only
- **Restating EAP method comparison** in #33 — homed in `01-eap-method-overview.md`; link only
- **Restating general diagnostic-package collection** in #31 — homed in #01/#10/#14/#18/#24; link only
- **Documenting NPS configuration** in #33 — explicitly out of scope (REQUIREMENTS.md:80); checklist stays on ask-side only
- **Presenting the macOS `com.apple.eapol` predicate as high-confidence fact** — must carry MEDIUM confidence NOTE callout matching the L1 runbook pattern
- **Using `IMPORTANT` as a callout label** — out of vocabulary; use `NOTE`/`WARNING`/`DANGER`/`CRITICAL` only
- **Adding `{#id}` anchor overrides** — plain GitHub auto-slugs only
- **Editing `l2-runbooks/00-index.md`** — deferred to Phase 109 (one of the six nav hubs)
- **Wiring capability-matrix rows** — deferred to Phase 109

---

## Don't Hand-Roll

This is a documentation phase. The "don't hand-roll" principle applies to signal verification:

| Problem | Don't Build | Use Instead |
|---------|-------------|-------------|
| Windows 802.1X channel name | Guess from memory | Verified from Microsoft Learn |
| macOS EAPOL predicate | Invent a predicate | Use `subsystem contains "com.apple.eapol"` with MEDIUM confidence tag + fallback |
| RADIUS request checklist | Invent fields | Draw from NPS Event IDs 6272/6273 documentation (Microsoft Learn) |
| Cert inspection commands | Invent certutil flags | Use verified flags from Microsoft Learn data-collection guide |

---

## Common Pitfalls

### Pitfall 1: Calling the Wired Channel "Dot3Svc"
**What goes wrong:** Runbook uses "Dot3Svc" as the event channel name instead of `Microsoft-Windows-Wired-AutoConfig/Operational`
**Why it happens:** The Wired AutoConfig *service* is named `dot3svc`; the *event channel* has a different name
**How to avoid:** Always use the full channel name `Microsoft-Windows-Wired-AutoConfig/Operational` in runbook text and wevtutil commands
**Warning signs:** Any reference to "Dot3Svc/Operational" or "Dot3Svc channel" in runbook prose

### Pitfall 2: Presenting macOS EAPOL Predicate as HIGH Confidence
**What goes wrong:** Runbook omits the MEDIUM confidence callout for the macOS `com.apple.eapol` predicate
**Why it happens:** The predicate works in practice but has no official Apple documentation
**How to avoid:** Carry the same NOTE callout as L1 runbooks #38-#41; include the fallback `process == "eapolclient"` predicate
**Warning signs:** Missing confidence tag or missing fallback predicate in macOS subsection

### Pitfall 3: #33 RADIUS Checklist Drifting into NPS Configuration
**What goes wrong:** The RADIUS team request checklist includes "configure NPS policy X to allow..." steps
**Why it happens:** The boundary between "ask for X" and "configure X" is blurry when describing what to request
**How to avoid:** Every checklist item must be phrased as "request this information from the RADIUS/NPS team" — zero imperative NPS configuration steps
**Warning signs:** Any verb like "set," "configure," "create policy," "modify" in the checklist

### Pitfall 4: Android adb logcat Missing Escalation Prerequisites
**What goes wrong:** Runbook presents adb collection as if it can be triggered from the Intune portal or any engineer PC
**Why it happens:** Copying the command from L1 runbooks without noting the physical prerequisites
**How to avoid:** Every adb section must list: developer options enabled, USB debugging enabled, USB cable to PC with adb installed, adb in PATH
**Warning signs:** adb command without USB debugging prerequisite callout

### Pitfall 5: Wiring L1 Runbook Links Before #31-33 Are Committed
**What goes wrong:** Git history shows L1 runbook link edits committed before #31/32/33 files exist
**Why it happens:** L1 runbooks are smaller edits; executor rushes them
**How to avoid:** Link-wiring wave (decision tree + L1 runbooks) is a separate commit after all three #31-33 files are committed and verified present
**Warning signs:** Plan step ordering puts link-wiring task before or in same wave as #31-33 creation

### Pitfall 6: Restating the macOS Deployment Channel Warning in #32
**What goes wrong:** #32 restates the "user vs System keychain — immutable" caveat in full
**Why it happens:** Seems relevant when inspecting certs in the correct keychain
**How to avoid:** One sentence max: "Client cert location depends on deployment channel (user → Login keychain; device → System keychain)" + link to Phase 103 macOS admin setup guide

---

## Runtime State Inventory

Not applicable — this is a greenfield documentation authoring phase. No rename/refactor/migration runtime state exists.

---

## Environment Availability

Step 2.6: SKIPPED — this phase creates and edits Markdown documentation files only. No external tools, services, runtimes, or CLIs beyond the local git-managed file system are required.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | macOS `log show --predicate 'subsystem contains "com.apple.eapol"' --info --last 30m` is the current-generation predicate for EAPOL logs on macOS | Per-Platform Signal Map — macOS | Runbook predicate returns empty on some macOS versions; fallback predicate mitigates |
| A2 | Android `adb logcat -s "wpa_supplicant"` is the primary cross-vendor 802.1X filter tag | Per-Platform Signal Map — Android | Tag may differ on some OEM builds; the MEDIUM confidence tag and "OEM variation" note in the runbook mitigate |
| A3 | macOS `security find-certificate` and `security verify-cert` commands work on current macOS versions for SCEP-delivered certs | #32 cert inspection | Commands may behave differently for certs delivered via Intune MDM profile; Keychain Access GUI is a documented fallback |
| A4 | L1 runbooks #38-#41 backward-compatible link-wiring is in Phase 108 scope (implied by "(Live links wired in Phase 108.)" text in each runbook) | Link-Wiring Scope | If planner treats only the decision tree as in-scope (literal D-03 reading), L1 forward-refs stay stale post-Phase 108; note to planner: recommend including all four L1 runbook updates |
| A5 | Android OMADM log (adb logcat -s omadm SyncML) contains SCEP enrollment events relevant to #32 cert investigation | #32 Android cert inspection | OMADM log content may vary by Android version and enrollment mode; Intune portal status is the reliable primary |

---

## Open Questions

1. **macOS EAPOL predicate official confirmation**
   - What we know: community/Jamf sources consistently use `subsystem contains "com.apple.eapol"` on macOS; it works in practice
   - What's unclear: no official Apple developer documentation found in two research sessions
   - Recommendation: present with MEDIUM confidence + NOTE callout + fallback predicate, exactly as L1 runbooks do; flag for future Apple-documentation verification

2. **Android newer-OS EAP log tags (11+)**
   - What we know: `ClientModeImpl` replaced `WifiStateMachine` in Android 11+ AOSP; OEM forks diverge
   - What's unclear: the canonical tag for Samsung/Pixel/other major OEMs varies
   - Recommendation: use `wpa_supplicant` as the primary filter (cross-vendor stable); note OEM variation; do not commit to secondary tags beyond LOW confidence

3. **L1 runbook link-wiring — strict D-03 vs implied scope**
   - What we know: CONTEXT.md D-03 explicitly names only the decision tree; all four L1 runbooks say "Live links wired in Phase 108"
   - What's unclear: did the discuss-phase lock intend to include L1 runbook edits or only the decision tree?
   - Recommendation: Planner should include the four L1 runbook link edits in the Phase 108 link-wiring wave — the L1 runbooks' own text mandates it and navigation-last compliance applies equally

---

## Sources

### Primary (HIGH confidence — VERIFIED)
- [Microsoft Learn: Data collection for troubleshooting 802.1X authentication issues](https://learn.microsoft.com/en-us/troubleshoot/windows-client/networking/data-collection-for-troubleshooting-802-1x-authentication-issues) — Windows channel names `Microsoft-Windows-WLAN-AutoConfig/Operational`, `Microsoft-Windows-Wired-AutoConfig/Operational`, `Microsoft-Windows-CAPI2/Operational`; wevtutil commands; certutil commands (updated 2026-02-12)
- [Microsoft Learn: 802.1X authentication issues troubleshooting](https://learn.microsoft.com/en-us/troubleshoot/windows-client/networking/802-1x-authentication-issues-troubleshooting) — Windows Event Viewer paths, NPS event IDs 6272/6273, CAPI2 log enabling (updated 2026-02-12)
- [Microsoft Learn: Troubleshoot SCEP certificate profile deployment](https://learn.microsoft.com/en-us/troubleshoot/mem/intune/certificates/troubleshoot-scep-certificate-profile-deployment) — iOS/Android/Windows Intune portal paths for SCEP status; iOS on-device Settings path (updated 2026-03-30)
- Existing Phase 107 L1 runbooks (#38-#41): confirmed signal table contents, confirmed "(Live links wired in Phase 108.)" forward-ref text, confirmed iOS/Android no-device-command constraint — authoritative corpus files
- Existing Phase 107 L2 log-collection runbooks (#01/#10/#14/#18/#24): confirmed NO 802.1X signals in any of the five files — D-02 net-new verification

### Secondary (MEDIUM confidence — cited)
- [Jamf technical paper: Enabling 802.1X Wireless Debug Logging](https://docs.jamf.com/technical-papers/jamf-pro/8021x/10.0.0/Enabling_802.1X_Wireless_Debug_Logging.html) — macOS `log show --predicate 'subsystem contains "com.apple.eapol"'` predicate + Wireless Diagnostics approach
- [Apple Support: Connect Apple devices to 802.1X networks](https://support.apple.com/guide/deployment/connect-to-8021x-networks-depabc994b84/web) — confirmed no official Apple troubleshooting commands documented in this guide
- [Ubuntu Community: DebuggingNetworkManager](https://wiki.ubuntu.com/DebuggingNetworkManager) + [GNOME Wiki: NetworkManager Debugging](https://wiki.gnome.org/Projects/NetworkManager/Debugging) — `journalctl -u NetworkManager`, Linux EAP event strings
- [Ubuntu Manpage: wpa_supplicant](https://manpages.ubuntu.com/manpages/focal/en/man8/wpa_supplicant.8.html) — wpa_supplicant debug flags, logging options
- Cisco Meraki documentation / Rui Qiu blog — macOS EAPOL predicate usage cross-reference

### Tertiary (LOW confidence — community only)
- Android `ClientModeImpl` / `WifiNative` tag references — XDA Forums, Android issue trackers; OEM-specific; LOW confidence

---

## Metadata

**Confidence breakdown:**
- Windows log channels: HIGH — Microsoft Learn verified, stable channel names across Windows 10/11
- macOS EAPOL predicate: MEDIUM — no official Apple documentation; community/Jamf sources consistent
- iOS portal path: HIGH — Microsoft Learn verified
- Android adb logcat: MEDIUM — `wpa_supplicant` tag is widely documented; newer-Android supplemental tags are LOW
- Linux journalctl: MEDIUM — Ubuntu community documentation; NM manages wpa_supplicant on Ubuntu LTS
- Cert inspection commands (Windows): HIGH — Microsoft Learn verified
- Cert inspection commands (macOS/Linux): ASSUMED — standard tools; no conflicts found
- #33 RADIUS request checklist: ASSUMED from NPS event ID documentation (Microsoft Learn)
- Runbook structure and house style: HIGH — derived from corpus files read directly

**Research date:** 2026-06-30
**Valid until:** 2026-09-28 (90-day freshness — matches runbook review_by stamps; Android OS-version signals should be re-verified sooner if Android 15+ is in scope)
