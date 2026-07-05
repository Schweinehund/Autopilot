---
doc_id: RE-073
status: Approved
owner: L2 Desktop Lead
doc_type: Runbook
last_verified: 2026-07-01
review_by: 2026-09-29
applies_to: both
audience: L2
platform: windows+macos+ios+android+linux
---

**Platform:** All Platforms · **Doc Type:** Runbook · **Doc ID:** RE-073 · **Status:** Approved

# 802.1X Log Collection

## Summary

[FILL-IN: >=30 words, opens with the tier scope/safety banner]

> **Platform gate:** This guide covers 802.1X L2 log collection across all five platforms
> (Windows / macOS / iOS/iPadOS / Android / Linux).

> For non-802.1X Intune L2 investigation, see [L2 Runbook Index](00-index.md).

## Context

This runbook is the **prerequisite for [#32: 802.1X Certificate-Chain Investigation](32-8021x-cert-investigation.md)
and [#33: 802.1X RADIUS/EAP Investigation](33-8021x-radius-eap-investigation.md)**.
Collect the per-platform 802.1X log surfaces documented here before opening either investigation
runbook.

**Before starting:** collect a general device diagnostic package per the platform log collection
guide for the device's platform —
[Windows (#01)](01-log-collection.md) /
[macOS (#10)](10-macos-log-collection.md) /
[iOS/iPadOS (#14)](14-ios-log-collection.md) /
[Android (#18)](18-android-log-collection.md) /
[Linux (#24)](24-linux-log-collection.md).
Then return here to collect the net-new 802.1X-specific signals below — those signals are
**not covered in any of the five platform log collection guides**.

**From L1 escalation?** One of the four 802.1X L1 runbooks
([#38: Certificate Failure](../l1-runbooks/38-8021x-certificate-failure.md),
[#39: RADIUS Reject](../l1-runbooks/39-8021x-radius-reject.md),
[#40: Server Trust Failure](../l1-runbooks/40-8021x-server-trust-failure.md),
[#41: EAP Negotiation Failure](../l1-runbooks/41-8021x-eap-negotiation-failure.md))
or the escalation branch of the
[802.1X Triage Decision Tree](../decision-trees/10-8021x-triage.md) has routed here.
L1 already collected: device serial number, user UPN, platform, and the L1-visible diagnostic
signal. Skip directly to the per-platform subsection for the affected device platform.

## Tool Landscape

**NOTE:** Each platform's 802.1X supplicant writes to a different log surface.
Windows uses two dedicated Event Viewer channels (`WLAN-AutoConfig/Operational` for Wi-Fi,
`Wired-AutoConfig/Operational` for wired) plus the `CAPI2/Operational` channel for
certificate-chain diagnosis; macOS uses the unified log filtered by the `eapolclient`
process or `com.apple.eapol` subsystem; iOS/iPadOS has no device-side 802.1X log
command — the Intune portal is the only diagnostic surface; Android requires
`adb logcat -s "wpa_supplicant"` with developer options and USB debugging enabled
(escalation-collected L2 step); Linux uses `journalctl -u NetworkManager` as the primary
surface and `journalctl -u wpa_supplicant` as the supplement.
The general device diagnostic package (MDM/Intune logs) is addressed separately in
the per-platform log collection guides listed in the Context section above —
do not duplicate those procedures here.

---

## Windows: 802.1X Log Collection

### Wi-Fi: WLAN-AutoConfig channel `[HIGH, last_verified 2026-07-01]`

The `Microsoft-Windows-WLAN-AutoConfig/Operational` channel records Wi-Fi 802.1X
authentication attempts, successes, and failures. It is the primary L2 surface for any
Wi-Fi 802.1X failure on Windows.

**Event Viewer path:**
`Applications and Services Logs\Microsoft\Windows\WLAN-AutoConfig\Operational`

**Export command (read-only):**

```powershell
# Export Wi-Fi 802.1X event log — read-only, no state change
wevtutil epl "Microsoft-Windows-WLAN-AutoConfig/Operational" C:\MSLOG\WLAN-AutoConfig.evtx
```

**Key event IDs to locate:**

| Event ID | Meaning | Interpretation |
|----------|---------|----------------|
| 8001 | 802.1X authentication attempt | Marks the start of each connection attempt; cross-reference the user identity and timestamp with the reported failure window |
| 8002 | 802.1X authentication succeeded | Network access granted; if 8001 appears without a subsequent 8002, the attempt did not complete — look for a 8003 or timeout |
| 8003 | 802.1X authentication failed or disconnected | Primary failure event; includes reason codes in the event data; repeated 8003s without 8002 indicate a systematic rejection — escalate to #32 (cert) or #33 (RADIUS/EAP) depending on reason code |
| 11006 | Explicit EAP failure received | RADIUS server explicitly rejected the EAP exchange after negotiation began; cross-reference with NPS event log (RADIUS team request — see #33) |

### Wired: Wired-AutoConfig channel `[HIGH, last_verified 2026-07-01]`

The `Microsoft-Windows-Wired-AutoConfig/Operational` channel records wired 802.1X
authentication events. The Wired AutoConfig *service* is named `dot3svc`, but the
*event channel* name is `Microsoft-Windows-Wired-AutoConfig/Operational` — use this
exact channel name in all `wevtutil` commands and event log references.

**NOTE:** Before collecting this log, confirm the Wired AutoConfig service (`dot3svc`) is
running on the device. See the wired service dependency check in
[Windows 802.1X Admin Setup](../admin-setup-8021x/03-windows.md). If `dot3svc` is not
running, the channel will be empty.

**Event Viewer path:**
`Applications and Services Logs\Microsoft\Windows\Wired-AutoConfig\Operational`

**Export command (read-only):**

```powershell
# Export wired 802.1X event log — read-only, no state change
wevtutil epl "Microsoft-Windows-Wired-AutoConfig/Operational" C:\MSLOG\Wired-AutoConfig.evtx
```

Interpret key event IDs identically to the Wi-Fi channel (8001, 8002, 8003, 11006 above).
A wired-specific failure alongside a healthy Wi-Fi authentication on the same device
narrows the root cause to the wired profile, the `dot3svc` service state, or a wired-specific
RADIUS policy (see #33).

### CAPI2 channel (certificate-chain diagnosis, required for #32) `[HIGH, last_verified 2026-07-01]`

The `Microsoft-Windows-CAPI2/Operational` channel records Windows certificate chain
validation events. It is essential for diagnosing chain failures, revocation check failures,
and EKU mismatches during active 802.1X authentication attempts.

> **WARNING:** Enabling the CAPI2 log is **state-changing** — the channel is disabled by default.

> Enable it immediately before reproducing the 802.1X failure, then disable it after export to avoid excessive log volume.

> This step is required for [#32: Certificate-Chain Investigation](32-8021x-cert-investigation.md).

**Enable, export, and disable:**

```powershell
# Step 1: Enable CAPI2 logging (state-changing — run immediately before repro)
wevtutil.exe sl Microsoft-Windows-CAPI2/Operational /e:true

# Step 2: Reproduce the 802.1X authentication failure (have the user attempt to connect)

# Step 3: Export the CAPI2 log (read-only export)
wevtutil epl Microsoft-Windows-CAPI2/Operational C:\MSLOG\CAPI2.evtx

# Step 4: Disable CAPI2 logging (restore default state)
wevtutil.exe sl Microsoft-Windows-CAPI2/Operational /e:false
```

**Interpretation:** Look for events referencing certificate chain validation failures,
revocation check failures, or trust anchor errors timed to the 802.1X attempt window.
These events feed directly into [#32: Certificate-Chain Investigation](32-8021x-cert-investigation.md).

---

## macOS: 802.1X Log Collection

**NOTE — macOS signal confidence:** The macOS `com.apple.eapol` unified-log predicate is
MEDIUM confidence — sourced from community/Jamf references, not yet confirmed against
official Apple documentation. If it returns no EAPOL entries even with `--last 2h`, try
the fallback predicate `log show --predicate 'process == "eapolclient"' --info --last 2h`.

### Primary predicate: com.apple.eapol subsystem `[MEDIUM, last_verified 2026-07-01]`

Run in Terminal on the affected Mac immediately after or during the 802.1X failure:

```bash
# Primary EAPOL log predicate — collects eapolclient subsystem events from the last 30 minutes
log show --predicate 'subsystem contains "com.apple.eapol"' --info --last 30m
```

**Interpretation:** Look for TLS handshake events, EAP method negotiation lines, identity
exchange messages, and error lines such as "Authentication Failed", "TLS handshake failed",
or "EAP-NAK" — these patterns indicate certificate trust failures or EAP-method mismatches
and direct the investigation to #32 or #33 respectively.

If the above returns no output, extend the time window:

```bash
# Extended window with combined predicate — captures eapolclient process events
log show --style syslog --predicate 'processImagePath contains "eapolclient" and subsystem contains "com.apple.eapol"' --last 2h
```

### Fallback predicate: eapolclient process filter `[MEDIUM, last_verified 2026-07-01]`

Use this fallback if the primary `com.apple.eapol` predicate returns empty output:

```bash
# Fallback — filters by process name; more permissive scope
log show --predicate 'process == "eapolclient"' --info --last 2h
```

**Interpretation:** The fallback returns the same eapolclient events with a broader process
scope. If this also returns empty, the authentication failure may have occurred outside the
lookback window — re-run with a longer `--last` value or collect Wireless Diagnostics output
during a live reproduction.

> **NOTE:** Modern macOS (Sierra and later) no longer writes eapolclient events to
> `/var/log/eapolclient/` — that path is a pre-Sierra legacy location.

> The unified log (`log show`) is the authoritative collection method on current macOS versions.

### GUI alternative: Wireless Diagnostics `[MEDIUM, last_verified 2026-07-01]`

When command-line output is empty or the issue is intermittent, Wireless Diagnostics captures
a richer EAPOL-specific bundle:

1. **Option-click** the Wi-Fi menu bar icon
2. Select **Open Wireless Diagnostics...**
3. From the **Window** menu, choose **Utilities**
4. Go to the **Logging** tab
5. Enable **EAPOL** logging
6. Click **Collect Logs** (or reproduce the failure while logging is active)

The resulting bundle includes `wifi.log` and EAPOL-specific captures. Provide the complete
bundle to the investigating engineer — do not cherry-pick individual log lines.

**Interpretation:** EAPOL frames visible in `wifi.log` show the raw EAP negotiation sequence,
including which method was proposed, whether a TLS handshake began, and where the exchange
terminated. Failed handshakes feed into #32 (cert chain); EAP-NAK or method-mismatch events
feed into #33 (RADIUS/EAP).

---

## iOS/iPadOS: 802.1X Log Collection

**NOTE:** No device-side 802.1X log command is available on iOS/iPadOS. All L2 diagnostic
surfaces for iOS/iPadOS 802.1X are read-only Intune portal paths and on-device Settings
inspection (user-assisted). Provide the portal paths below to the investigating engineer;
do not attempt to capture device-side logs.

### Intune portal: device configuration profile status `[HIGH, last_verified 2026-07-01]`

Navigate to **Intune admin center** > **Devices** > **iOS/iPadOS** > select device by serial
number > **Device configuration**.

Inspect the following profiles in this order (deployment order matters — see
[Certificate Delivery Foundation](../admin-setup-8021x/02-cert-delivery-foundation.md)):

1. **Trusted Certificate** profile — must show **Succeeded**. An Error, Pending, or Not
   applicable status here is the first failure point; downstream profiles cannot deploy
   until this succeeds.
2. **SCEP** or **PKCS** client certificate profile — must show **Succeeded** after the
   Trusted Certificate profile succeeds. Note any error codes.
3. **Wi-Fi** or **Wired network** profile — note its status and any error codes. A network
   profile showing Error while cert profiles show Succeeded indicates a network profile
   configuration issue separate from cert delivery.

**Interpretation:** If Trusted Certificate shows Error, root cause is cert delivery — route
to [#32](32-8021x-cert-investigation.md). If all three show Succeeded but the device cannot
authenticate, the failure is in the RADIUS exchange — route to [#33](33-8021x-radius-eap-investigation.md).

### Intune portal: configuration profile delivery timeline `[HIGH, last_verified 2026-07-01]`

Navigate to **Troubleshooting + Support** > **Troubleshoot** > select the affected user >
**Configuration profiles**.

Review the delivery timestamp and last sync time for each 802.1X-related profile. A profile
that deployed but whose last sync is older than the failure may indicate a stale or revoked
certificate (route to #32).

### On-device read-only inspection (user-assisted) `[HIGH, last_verified 2026-07-01]`

Ask the user to navigate to **Settings** > **General** > **VPN & Device Management** and
confirm that the MDM profile and its certificate payloads are listed and show as installed.

**Interpretation:** If profiles are listed and installed on-device but portal shows Error,
there may be a sync delay. If profiles are absent from the device despite portal showing
Succeeded, the device may require a check-in cycle; note the last sync time from the
portal's Troubleshoot view.

---

## Android: 802.1X Log Collection

**WARNING:** `adb logcat` collection requires **developer options enabled** on the device,
**USB debugging enabled**, and **a USB cable connecting the device to a PC with `adb` in
PATH**. Confirm all three prerequisites before attempting collection. This is an
**L2-only collection step** — do not instruct L1 to run `adb` commands.

### Intune portal: device configuration profile status (primary) `[HIGH, last_verified 2026-07-01]`

Begin with the Intune portal before attempting adb collection. Navigate to
**Intune admin center** > **Devices** > **Android Enterprise** > select device by serial
number > **Device configuration**.

Inspect the following profiles (deployment order matters — see
[Certificate Delivery Foundation](../admin-setup-8021x/02-cert-delivery-foundation.md)):

1. **Trusted Certificate** profile status
2. **SCEP** or **PKCS** client certificate profile status
3. **Wi-Fi** network profile status and any error codes

**Interpretation:** Same triage logic as iOS/iPadOS above — cert profile errors route to #32;
all-Succeeded-but-failing-to-authenticate routes to #33.

### adb logcat: wpa_supplicant filter (escalation-collected) `[MEDIUM, last_verified 2026-07-01]`

Once all three USB prerequisites are confirmed, run on the tethered PC:

```bash
# Primary 802.1X filter — wpa_supplicant tag is the most stable cross-vendor filter
adb logcat -s "wpa_supplicant"
```

**Interpretation:** Look for EAP event lines — EAP method negotiation, identity exchange, TLS
handshake messages, `EAP-NAK` (method mismatch), and `CTRL-EVENT-DISCONNECTED` following
an incomplete EAP exchange. EAP-NAK events feed into #33 (EAP-method mismatch diagnosis);
TLS/cert errors feed into #32.

**NOTE — OEM and Android version variability:** The `wpa_supplicant` tag behavior varies
by OEM firmware and Android version. It is the most stable cross-vendor filter; however,
some OEM builds log 802.1X events under vendor-specific tags. If `adb logcat -s "wpa_supplicant"`
returns no output during a reproduced failure, ask the assigned engineer to broaden the
logcat capture before trying alternative tag names. The supplemental `ClientModeImpl` and
`WifiNative` tags (Android 11+) are LOW confidence and OEM-specific — treat any output
from those tags as supplemental context only.

**Verbose form (if primary output is sparse):**

```bash
# Verbose wpa_supplicant output
adb logcat wpa_supplicant:V *:S
```

---

## Linux: 802.1X Log Collection

### NetworkManager journal (primary) `[MEDIUM, last_verified 2026-07-01]`

On Ubuntu 22.04 / 24.04 LTS with NetworkManager, the wpa_supplicant subprocess runs under
the NetworkManager process. The NetworkManager journal captures both NM-level connection events
and EAP-level authentication events in a single stream.

```bash
# Primary: NetworkManager journal — all 802.1X events on Ubuntu LTS
journalctl -u NetworkManager
```

**Interpretation:** In the NetworkManager journal, look for EAP event lines containing
`CTRL-EVENT-EAP-*` strings, TLS handshake failure messages, and disconnection events tagged
to the 802.1X interface. Authentication attempt events appear at the start of each connection;
failure events indicate where the EAP exchange broke down.

**Filtered view (EAP events only — useful for large journals):**

```bash
# Filter NetworkManager journal for EAP and 802.1X events since the last 30 minutes
journalctl -u NetworkManager --since "30 minutes ago" | grep -i "802.1x\|eap\|supplicant"
```

### wpa_supplicant journal (supplement) `[MEDIUM, last_verified 2026-07-01]`

On deployments where wpa_supplicant runs as a standalone systemd unit (for example, environments
using the Phase 106 script-based setup rather than NetworkManager-managed supplicant):

```bash
# Supplement: standalone wpa_supplicant unit
journalctl -u wpa_supplicant
```

**Interface-scoped form** (when a per-interface wpa_supplicant unit is in use):

```bash
# Interface-scoped: replace <interface> with the actual interface name (e.g., wlan0 or eth0)
journalctl -u wpa_supplicant@<interface>
```

**Interpretation:** Both journals should be collected together. If NM captures the full EAP
sequence, the wpa_supplicant journal confirms whether the supplicant received and processed
the RADIUS response.

### Key EAP event strings `[MEDIUM, last_verified 2026-07-01]`

These strings appear in wpa_supplicant journal output (via either NM or standalone unit):

| Event string | Meaning | Interpretation |
|---|---|---|
| `CTRL-EVENT-EAP-STARTED` | EAP negotiation began | Confirms the supplicant reached the RADIUS server and started an EAP exchange |
| `CTRL-EVENT-EAP-PROPOSED-METHOD` | RADIUS proposed an EAP method | Compare the proposed method number to the Intune profile's EAP type — a mismatch here routes to #33 EAP-method diagnosis |
| `CTRL-EVENT-EAP-METHOD` | EAP method selected | Confirms which method was agreed upon; feeds into both #32 (if EAP-TLS) and #33 (inner-auth) |
| `CTRL-EVENT-EAP-SUCCESS` | EAP authentication succeeded | Authentication completed successfully at the EAP layer |
| `CTRL-EVENT-EAP-FAILURE` | EAP authentication rejected | RADIUS server rejected the EAP exchange; if paired with TLS errors, route to #32; if method mismatch or credential rejection, route to #33 |

---

## Related Resources

- [802.1X Certificate-Chain Investigation (#32)](32-8021x-cert-investigation.md) — consumes
  logs collected here; validate cert chain, EKU, SAN, expiry, SCEP profile deployment status
- [802.1X RADIUS/EAP Investigation (#33)](33-8021x-radius-eap-investigation.md) — consumes
  logs collected here; EAP-method mismatch and server-name-validation diagnosis
- [802.1X Triage Decision Tree](../decision-trees/10-8021x-triage.md) — routing entry point
  for 802.1X failures; escalation paths lead to this runbook as the shared prerequisite
- [Windows Log Collection Guide (#01)](01-log-collection.md) — general Windows MDM/Autopilot
  diagnostic package (link-not-copy; does not contain 802.1X signals)
- [macOS Log Collection Guide (#10)](10-macos-log-collection.md) — general macOS Intune
  diagnostic package (link-not-copy; does not contain 802.1X signals)
- [iOS/iPadOS Log Collection Guide (#14)](14-ios-log-collection.md) — general iOS diagnostic
  package (link-not-copy; does not contain 802.1X signals)
- [Android Log Collection Guide (#18)](18-android-log-collection.md) — general Android
  diagnostic package (link-not-copy; does not contain 802.1X signals)
- [Linux Log Collection Guide (#24)](24-linux-log-collection.md) — general Linux Intune
  diagnostic package (link-not-copy; does not contain 802.1X signals)
- [Network Authentication Glossary](../_glossary-network.md) — 802.1X, EAP, EAPOL, RADIUS,
  supplicant, server-name validation term definitions

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-07-04 | v1.15 EEE reformat — content not re-reviewed | — |
| 2026-07-01 | Phase 108 plan 01: initial authoring — 802.1X cross-platform L2 log collection (#31) | -- |
