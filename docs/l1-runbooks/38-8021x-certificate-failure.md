---
last_verified: 2026-06-30
review_by: 2026-09-28
applies_to: both
audience: L1
platform: windows+macos+ios+android+linux
---

> **Platform gate:** This guide covers 802.1X certificate-failure triage across all five platforms (Windows / macOS / iOS/iPadOS / Android / Linux). For other 802.1X failure symptoms, return to the [802.1X Triage Decision Tree](../decision-trees/10-8021x-triage.md).

> **L1 scope note:** L1 Triage Steps in this runbook are read-only checks. State-changing actions (removing profiles, re-issuing certificates, modifying SCEP/PKCS configuration) appear ONLY in L2 runbooks — they are not L1 actions.

# 802.1X Certificate Failure

## Symptom

Intune reports the 802.1X Wi-Fi or Wired network profile as **Succeeded** for the device, but the device cannot connect to the 802.1X-protected network. One or more of the following is true:

- The **Trusted Certificate** profile shows **Error**, **Pending**, or **Not applicable** in Intune device configuration.
- The **SCEP** or **PKCS** client certificate profile shows **Error**, **Pending**, or **Not applicable**.
- Both cert profiles show **Succeeded**, but the certificate was not actually enrolled on the device (for example, due to SCEP latency, a certificate that has since expired, or a profile re-deployment delay).

If all certificate profiles show **Succeeded** and the device is being cleanly rejected by the RADIUS server with no trust prompt and no cert error visible, see [#39: 802.1X RADIUS Reject](39-8021x-radius-reject.md) instead.

## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com)
- Access to Microsoft Entra admin center (https://entra.microsoft.com) — read-only is sufficient
- Device serial number
- User's UPN (email address)
- Device platform (Windows / macOS / iOS/iPadOS / Android / Linux) — required to use the per-platform diagnostic table below

## First Checks (All Platforms)

Verify certificate profile deployment status in Intune **in this exact order** (deployment order matters; see [the deployment ordering rule](../admin-setup-8021x/02-cert-delivery-foundation.md) for the full explanation):

1. In Intune admin center, navigate to **Devices** > [platform] > select device by serial number > **Device configuration**.

2. Locate the **Trusted Certificate** profile. It must show **Succeeded**. If it shows Error, Pending, or Not applicable — this is the first failure point. Note any error code displayed.

3. Locate the **SCEP** or **PKCS** client certificate profile. It must show **Succeeded**. If the Trusted Certificate profile in step 2 is not Succeeded, the SCEP/PKCS profile cannot deploy — resolve the Trusted Certificate status first.

4. Locate the **Wi-Fi** or **Wired** network profile. Note its status. A network profile showing Error while cert profiles show Succeeded indicates a separate network profile configuration issue — note any error code.

> **NOTE:** The Trusted Certificate profile must be deployed and showing Succeeded **before** SCEP/PKCS and network profiles can succeed. If the Trusted Certificate shows any non-Succeeded status, downstream profiles are expected to fail or show Not applicable. See the [deployment-ordering constraint, EKU requirements, and per-platform cert-delivery support matrix](../admin-setup-8021x/02-cert-delivery-foundation.md) for details.

## Per-Platform Diagnostic Signal

Collect the diagnostic output for the affected platform. Do **not** attempt to interpret individual log entries — copy the complete output and provide it to L2.

| Platform | Signal / Channel | L1 Action |
|----------|-----------------|-----------|
| **Windows (Wi-Fi)** | `Microsoft-Windows-WLAN-AutoConfig/Operational` | Open **Event Viewer** > Applications and Services Logs > Microsoft > Windows > **WLAN-AutoConfig** > Operational. Locate events near the connection attempt time. Copy complete output; do not interpret. |
| **Windows (Wired)** | `Microsoft-Windows-Wired-AutoConfig/Operational` | Open **Event Viewer** > Applications and Services Logs > Microsoft > Windows > **Wired-AutoConfig** > Operational. Copy complete output; do not interpret. |
| **macOS** | eapolclient unified log (`com.apple.eapol` subsystem) | Ask the user to run the following command exactly as shown in Terminal: `log show --predicate 'subsystem contains "com.apple.eapol"' --info --last 30m`. If the output is empty, retry with `--last 2h`. Ask the user to copy the **complete output**; do not interpret individual entries. |
| **iOS/iPadOS** | Intune portal — device configuration profile status | **Intune-portal inspection only — no device command is available.** Check: (1) Trusted Certificate profile status, (2) SCEP/PKCS cert profile status, (3) Wi-Fi or Wired network profile status. On device (read-only): **Settings** > **General** > **VPN & Device Management** — confirm profiles are listed and installed. |
| **Android** | Intune portal — device configuration profile status | **L1 action: check Intune portal only.** Navigate to Intune admin center > **Devices** > [Android Enterprise] > device > **Device configuration** and inspect cert and Wi-Fi profile statuses. Note the signal `adb logcat -s "wpa_supplicant"` for escalation — do **not** attempt to run it at L1; it requires USB debugging and a tethered PC and is an escalation-collected signal for L2 use only. |
| **Linux** | NetworkManager journal (primary); wpa_supplicant journal (supplement) | Ask the user to run: `journalctl -u NetworkManager`. If the NetworkManager output is insufficient, supplement with `journalctl -u wpa_supplicant`. Copy the **complete output**; do not interpret. |

> **NOTE — macOS signal confidence:** The macOS `com.apple.eapol` unified-log predicate is MEDIUM confidence — sourced from community/Jamf references, not yet confirmed against official Apple documentation. If it returns no EAPOL entries even with `--last 2h`, try the fallback predicate `log show --predicate 'process == "eapolclient"' --info --last 2h`. See the [L2 802.1X Log Collection runbook (#31)](../l2-runbooks/31-8021x-log-collection.md) for the full macOS EAPOL collection procedure.

## Per-Platform Escalation Notes

### Windows

Events 8001 (auth attempted), 8002 (auth succeeded), and 8003 (auth failed) appear in both the `Microsoft-Windows-WLAN-AutoConfig/Operational` (Wi-Fi) and `Microsoft-Windows-Wired-AutoConfig/Operational` (wired) channels. A certificate failure typically surfaces alongside a reference to "certificate was not found," "chain verification failure," or similar. Do not interpret individual events — collect the complete log output and provide it to L2.

For wired connections, also confirm the Wired AutoConfig service (dot3svc) is running before reviewing the event log. See [Windows 802.1X Admin Setup — Wired Service Dependency](../admin-setup-8021x/03-windows.md) for the service dependency check.

### macOS

The eapolclient unified log shows the EAPOL negotiation sequence on macOS. A certificate failure typically appears as a TLS handshake failure or identity-rejection message. The `log show` command does not require elevated privileges. If the 30-minute window returns empty output, the connection attempt may fall outside the window — extend to `--last 2h`.

### iOS/iPadOS

No device-side log command is available for iOS/iPadOS. L1 is limited to Intune portal profile status inspection. If all cert profiles show Succeeded in Intune but the device cannot connect, collect a portal status screenshot and escalate to L2.

### Android

The Android 802.1X supplicant logs (`adb logcat -s "wpa_supplicant"`) are collected by L2 only — they require USB debugging, developer mode enabled, and a tethered PC. L1 names this signal for the escalation note; L1 does **not** collect it. L1 action is Intune portal profile status inspection only.

### Linux

The `journalctl -u NetworkManager` command is the primary L1 signal on Linux. NetworkManager manages the wpa_supplicant subprocess on Ubuntu, so its journal contains both NM-level and EAP events. Supplement with `journalctl -u wpa_supplicant` if the NM journal output is truncated or wpa_supplicant is running as an independent unit.

## Escalation Criteria

Escalate to L2 if:

- Any cert profile (Trusted Certificate or SCEP/PKCS) shows Error, Pending, or Not applicable and the status does not resolve within one Intune sync cycle (15–30 minutes after a manual sync from the Intune portal or the device)
- All cert profiles show Succeeded in Intune but the device still cannot authenticate to the 802.1X network
- The error code on the cert profile is numeric and not self-explanatory
- Intune shows the certificate as enrolled but device authentication still fails (possible certificate mismatch, expiry, EKU issue, or SAN mismatch)
- Any Windows, macOS, or Linux log output was collected and requires interpretation

**Before escalating, collect:**

- Device serial number and user UPN
- Device platform (Windows / macOS / iOS/iPadOS / Android / Linux)
- Screenshot of Intune Device configuration status for all three profiles: Trusted Certificate, SCEP/PKCS cert, and Wi-Fi/Wired network profile
- For Windows: complete `Microsoft-Windows-WLAN-AutoConfig/Operational` or `Microsoft-Windows-Wired-AutoConfig/Operational` event log output (do not filter by event ID)
- For macOS: complete output of `log show --predicate 'subsystem contains "com.apple.eapol"' --info --last 30m` (or `--last 2h` if the 30-minute window is empty)
- For Linux: complete output of `journalctl -u NetworkManager`
- For iOS/iPadOS: Intune portal profile status screenshot (no device log available)
- For Android: Intune portal profile status screenshot (adb logcat is L2-collected; do not include adb output at this stage)
- Which First Checks steps were completed and their results

See [L2 Log Collection (#31)](../l2-runbooks/31-8021x-log-collection.md) for per-platform
log sources, then [L2 Certificate Chain Investigation (#32)](../l2-runbooks/32-8021x-cert-investigation.md)
for certificate chain validation, SCEP/PKCS profile deployment diagnosis, EKU and SAN
verification, and expiry analysis.

---

[Back to 802.1X Triage Decision Tree](../decision-trees/10-8021x-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-30 | Phase 107 plan 01: initial authoring — 802.1X certificate failure (D-01/D-02/D-05) | -- |
