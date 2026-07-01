---
last_verified: 2026-06-30
review_by: 2026-09-28
applies_to: both
audience: L1
platform: windows+macos+ios+android+linux
---

> **Platform gate:** This guide covers 802.1X RADIUS-reject triage across all five platforms (Windows / macOS / iOS/iPadOS / Android / Linux). For other 802.1X failure symptoms, return to the [802.1X Triage Decision Tree](../decision-trees/10-8021x-triage.md).

> **L1 scope note:** L1 Triage Steps in this runbook are read-only checks. State-changing actions (modifying RADIUS policy, re-configuring the Intune Wi-Fi/Wired profile, reprovisioning certificates) appear ONLY in L2 runbooks — they are not L1 actions.

# 802.1X RADIUS Reject

## Symptom

All 802.1X certificate profiles (**Trusted Certificate** and **SCEP/PKCS** client cert) show **Succeeded** in Intune for the affected device. The device attempts to connect to the 802.1X-protected network and authentication fails with **none** of the following indicators:

- No trust prompt appears on the device
- No certificate error is visible in Intune
- No cert profile shows Error or Pending

The failure is a clean **Access-Reject** from the RADIUS server — the connection attempt reaches the server and the server rejects it. The RADIUS server is reachable; this is not a network-connectivity or firewall issue.

Differential:

- If a Trusted Certificate or SCEP/PKCS cert profile shows Error or Pending → see [#38: 802.1X Certificate Failure](38-8021x-certificate-failure.md)
- If the device shows a trust prompt or "untrusted certificate" indicator → see [#40: 802.1X Server Trust Failure](40-8021x-server-trust-failure.md)
- If there is evidence of an EAP method or inner-auth mismatch (e.g., iOS fails on an SSID where other platforms succeed) → see [#41: 802.1X EAP Negotiation Failure](41-8021x-eap-negotiation-failure.md)

## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com)
- Access to Microsoft Entra admin center (https://entra.microsoft.com) — read-only is sufficient
- Device serial number
- User's UPN (email address)
- Device platform (Windows / macOS / iOS/iPadOS / Android / Linux) — required to use the per-platform diagnostic table below

## First Checks (All Platforms)

Perform these checks **before** collecting platform-specific logs. They rule out related runbooks and identify the most common L1-visible RADIUS-reject causes.

1. In Intune admin center, navigate to **Devices** > [platform] > select device by serial number > **Device configuration**. Confirm **all** of the following show **Succeeded**:
   - Trusted Certificate profile
   - SCEP or PKCS client certificate profile
   - Wi-Fi or Wired network profile

   If any cert profile is not Succeeded, this is a certificate deployment failure — route to [#38: 802.1X Certificate Failure](38-8021x-certificate-failure.md) instead.

2. Open the Wi-Fi or Wired network profile in Intune (**Devices** > **Configuration** > [profile]) and confirm the **RADIUS server name** field (Certificate server names) is populated. An empty server-name field with server validation nominally enabled is a misconfiguration that can appear as a silent failure — if the field is empty or missing, route to [#40: 802.1X Server Trust Failure](40-8021x-server-trust-failure.md) for the server-trust investigation.

3. Note the **EAP type** configured in the Wi-Fi or Wired profile (EAP-TLS, PEAP-MSCHAPv2, or EAP-TTLS). Record this for the escalation note.

4. Ask the user: does the failure affect this device only, or all devices on the same SSID/wired port? A single-device failure suggests a user- or device-specific RADIUS policy mismatch. An all-devices failure suggests a policy change on the RADIUS server.

> **NOTE:** RADIUS-reject failures (this runbook) are distinct from certificate delivery failures (#38) and server trust failures (#40). This runbook applies when Intune shows all profiles as Succeeded and the device is actively being rejected by the RADIUS server — not when cert deployment is incomplete.

## Per-Platform Diagnostic Signal

Collect the diagnostic output for the affected platform. Do **not** attempt to interpret individual log entries — copy the complete output and provide it to L2.

| Platform | Signal / Channel | L1 Action |
|----------|-----------------|-----------|
| **Windows (Wi-Fi)** | `Microsoft-Windows-WLAN-AutoConfig/Operational` | Open **Event Viewer** > Applications and Services Logs > Microsoft > Windows > **WLAN-AutoConfig** > Operational. Locate events near the connection attempt time. Copy complete output; do not interpret. A RADIUS reject (without cert error) typically appears as event 8003 without a preceding certificate-chain error event. |
| **Windows (Wired)** | `Microsoft-Windows-Wired-AutoConfig/Operational` | Open **Event Viewer** > Applications and Services Logs > Microsoft > Windows > **Wired-AutoConfig** > Operational. Copy complete output; do not interpret. |
| **macOS** | eapolclient unified log (`com.apple.eapol` subsystem) | Ask the user to run the following command exactly as shown in Terminal: `log show --predicate 'subsystem contains "com.apple.eapol"' --info --last 30m`. If the output is empty, retry with `--last 2h`. Ask the user to copy the **complete output**; do not interpret individual entries. A RADIUS reject appears as an EAPOL rejection after the TLS tunnel is established. |
| **iOS/iPadOS** | Intune portal — device configuration profile status | **Intune-portal inspection only — no device command is available.** Confirm all cert profiles show Succeeded (step 1 above). Note the Wi-Fi or Wired network profile status and any visible error detail in the Intune portal. On device (read-only): **Settings** > **General** > **VPN & Device Management** — confirm profiles are listed and installed. |
| **Android** | Intune portal — device configuration profile status | **L1 action: check Intune portal only.** Navigate to Intune admin center > **Devices** > [Android Enterprise] > device > **Device configuration** and confirm all profile statuses. Note the signal `adb logcat -s "wpa_supplicant"` for escalation — do **not** attempt to run it at L1; it requires USB debugging and a tethered PC and is an escalation-collected signal for L2 use only. |
| **Linux** | NetworkManager journal (primary); wpa_supplicant journal (supplement) | Ask the user to run: `journalctl -u NetworkManager`. If the NetworkManager output is insufficient, supplement with `journalctl -u wpa_supplicant`. Copy the **complete output**; do not interpret. |

## Per-Platform Escalation Notes

### Windows

A RADIUS reject (Access-Reject) in the `Microsoft-Windows-WLAN-AutoConfig/Operational` channel typically appears as event 8003 (authentication failed / disconnected) **without** a preceding event referencing a certificate chain or certificate-not-found error. This pattern distinguishes a RADIUS reject from a certificate failure (#38). Do not interpret individual events — collect the complete log output and provide it to L2.

For wired connections, also note whether the Wired AutoConfig service (dot3svc) is confirmed running. See [Windows 802.1X Admin Setup — Wired Service Dependency](../admin-setup-8021x/03-windows.md) (read-only link; do not reproduce the service check inline).

### macOS

On macOS, a RADIUS reject appears in the eapolclient unified log as an EAPOL rejection **after** the TLS tunnel is established — meaning the TLS handshake succeeded (certificates were accepted by both sides) but the RADIUS server rejected the authentication at the EAP-Request/EAP-Response layer. This is distinct from a TLS handshake failure seen in certificate failures (#38). Collect the complete `log show` output; do not interpret.

### iOS/iPadOS

No device-side log command is available for iOS/iPadOS. L1 is limited to Intune portal profile status inspection. If all cert profiles show Succeeded and the device is failing silently (no trust prompt, no cert error in portal), collect a portal status screenshot and escalate to L2.

### Android

The Android 802.1X supplicant logs (`adb logcat -s "wpa_supplicant"`) are collected by L2 only — they require USB debugging, developer mode enabled, and a tethered PC. L1 names this signal for the escalation note; L1 does **not** collect it. L1 action is Intune portal profile status inspection only.

### Linux

The `journalctl -u NetworkManager` command is the primary L1 signal on Linux. A RADIUS reject surfaces as a wpa_supplicant EAP failure message within the NM journal. Supplement with `journalctl -u wpa_supplicant` if the NM journal output is truncated. Do not interpret — collect the complete output and provide it to L2.

## Escalation Criteria

Escalate to L2 if:

- All cert profiles show Succeeded in Intune but the device is being rejected by the RADIUS server (Access-Reject)
- The EAP method or inner-auth configuration is confirmed but authentication still fails
- The failure is isolated to one device (possible user- or device-specific RADIUS policy mismatch)
- The failure affects multiple devices simultaneously (possible RADIUS policy change or NPS rule conflict)
- Any Windows, macOS, or Linux log output was collected and requires interpretation

**Before escalating, collect:**

- Device serial number and user UPN
- Device platform (Windows / macOS / iOS/iPadOS / Android / Linux)
- EAP type configured in the Intune Wi-Fi/Wired profile
- Whether the failure affects one device or multiple devices
- Screenshot of Intune Device configuration status for all three profiles: Trusted Certificate, SCEP/PKCS cert, and Wi-Fi/Wired network profile
- For Windows: complete `Microsoft-Windows-WLAN-AutoConfig/Operational` or `Microsoft-Windows-Wired-AutoConfig/Operational` event log output (do not filter by event ID)
- For macOS: complete output of `log show --predicate 'subsystem contains "com.apple.eapol"' --info --last 30m` (or `--last 2h` if the 30-minute window is empty)
- For Linux: complete output of `journalctl -u NetworkManager`
- For iOS/iPadOS: Intune portal profile status screenshot (no device log available)
- For Android: Intune portal profile status screenshot (adb logcat is L2-collected; do not include adb output at this stage)
- Results of the First Checks steps above, including confirmed RADIUS server-name field status and EAP method

See L2 Log Collection (#31) for per-platform log sources, then L2 RADIUS/EAP Investigation (#33) for RADIUS policy analysis, EAP method diagnosis, NPS policy rule review, and per-platform EAP negotiation investigation. (Live links wired in Phase 108.)

---

[Back to 802.1X Triage Decision Tree](../decision-trees/10-8021x-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-30 | Phase 107 plan 01: initial authoring — 802.1X RADIUS reject (D-01/D-02/D-05) | -- |
