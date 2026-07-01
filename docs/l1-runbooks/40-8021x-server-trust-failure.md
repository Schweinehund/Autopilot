---
last_verified: 2026-06-30
review_by: 2026-09-28
applies_to: both
audience: L1
platform: windows+macos+ios+android+linux
---

> **Platform gate:** This guide covers 802.1X server-trust and RADIUS-certificate-validation-failure triage across all five platforms (Windows / macOS / iOS/iPadOS / Android / Linux). For other 802.1X failure symptoms, return to the [802.1X Triage Decision Tree](../decision-trees/10-8021x-triage.md).

> **L1 scope note:** L1 Triage Steps in this runbook are read-only checks. State-changing actions (deploying a Trusted Certificate profile, modifying the Certificate server names field in a Wi-Fi/Wired profile, reprovisioning the profile to device groups) appear ONLY in L2 runbooks — they are not L1 actions.

# 802.1X Server Trust Failure

## Symptom

The 802.1X connection fails because the device supplicant cannot trust the RADIUS server's certificate. The failure presents differently across platforms:

- **Windows:** The user sees an intermittent dialog prompting them to trust the server certificate ("Trust this certificate?" or "Continue Connecting?"). Clicking through the prompt may allow one connection but the prompt reappears on reconnect because the trust is not persistently managed via policy.
- **macOS / iOS/iPadOS:** The connection fails immediately with "Authentication Failed" and **no trust prompt** appears. Managed profiles suppress the dynamic trust dialog on Apple platforms — when a Trusted Certificate profile is missing or misconfigured, the failure is silent from the user's perspective.
- **Android / Linux:** Authentication fails silently with no user-visible prompt.

Common underlying causes:

- The **Trusted Certificate profile** for the RADIUS server's root CA is not assigned to the device group, has not yet deployed, or shows a non-Succeeded status in Intune.
- The **Certificate server names** field in the Wi-Fi or Wired network profile is empty. With server validation nominally enabled but no server name configured, the supplicant cannot complete server-name validation — this is a misconfiguration that produces this symptom on all platforms. See [RADIUS Server-Name Validation](../admin-setup-8021x/02-cert-delivery-foundation.md#radius-server-name-validation) for the full explanation and configuration requirement.

Differential:

- If a Trusted Certificate or SCEP/PKCS cert profile shows Error or Pending → see [#38: 802.1X Certificate Failure](38-8021x-certificate-failure.md)
- If all cert profiles show Succeeded and there is no trust prompt → see [#39: 802.1X RADIUS Reject](39-8021x-radius-reject.md)
- If there is evidence of an EAP method or inner-auth mismatch → see [#41: 802.1X EAP Negotiation Failure](41-8021x-eap-negotiation-failure.md)

## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com)
- Access to Microsoft Entra admin center (https://entra.microsoft.com) — read-only is sufficient
- Device serial number
- User's UPN (email address)
- Device platform (Windows / macOS / iOS/iPadOS / Android / Linux) — required to use the per-platform diagnostic table below

## First Checks (All Platforms)

Perform these checks before collecting platform-specific diagnostic output. They address the two most common L1-visible server-trust misconfiguration causes.

1. In Intune admin center, navigate to **Devices** > [platform] > select device by serial number > **Device configuration**. Locate the **Trusted Certificate** profile for the RADIUS server's root CA (not the client authentication cert profile). Confirm it shows **Succeeded** for this device.

   - If the Trusted Certificate profile shows **Error**, **Pending**, **Not applicable**, or is absent from the device's profile list → this is the primary cause. Route to [#38: 802.1X Certificate Failure](38-8021x-certificate-failure.md) for certificate deployment triage.
   - If the Trusted Certificate profile shows **Succeeded** → proceed to step 2.

2. Open the Wi-Fi or Wired network profile in Intune (**Devices** > **Configuration** > [profile] > **Properties**). Locate the **Certificate server names** field (also called "RADIUS server name" in some profile types). Confirm this field is **populated** with the RADIUS server's FQDN or CN suffix.

   An empty Certificate server names field combined with server validation nominally enabled is a misconfiguration that produces server-trust failures on all platforms. See [RADIUS Server-Name Validation](../admin-setup-8021x/02-cert-delivery-foundation.md#radius-server-name-validation) for the full requirement and configuration detail.

> **NOTE:** On macOS and iOS/iPadOS, managed configuration profiles suppress the interactive trust dialog that Windows shows. A missing or misconfigured Trusted Certificate profile causes a silent "Authentication Failed" on Apple platforms — there is no user prompt to provide a signal. The absence of a trust dialog does **not** mean the Trusted Certificate profile is correctly deployed.

## Per-Platform Diagnostic Signal

Collect the diagnostic output for the affected platform. Do **not** attempt to interpret individual log entries — copy the complete output and provide it to L2.

| Platform | Signal / Channel | L1 Action |
|----------|-----------------|-----------|
| **Windows (Wi-Fi)** | `Microsoft-Windows-WLAN-AutoConfig/Operational` | Open **Event Viewer** > Applications and Services Logs > Microsoft > Windows > **WLAN-AutoConfig** > Operational. Locate events near the connection attempt time. Copy complete output; do not interpret. Server-trust failures typically appear as event 8001 with "The server certificate chain couldn't be validated" or event 8003 "Authentication failed." |
| **Windows (Wired)** | `Microsoft-Windows-Wired-AutoConfig/Operational` | Open **Event Viewer** > Applications and Services Logs > Microsoft > Windows > **Wired-AutoConfig** > Operational. Copy complete output; do not interpret. |
| **macOS** | eapolclient unified log (`com.apple.eapol` subsystem) | Ask the user to run the following command exactly as shown in Terminal: `log show --predicate 'subsystem contains "com.apple.eapol"' --info --last 30m`. If the output is empty, retry with `--last 2h`. Ask the user to copy the **complete output**; do not interpret individual entries. A server-trust failure may appear as a TLS handshake failure or identity-rejected-by-server message. |
| **iOS/iPadOS** | Intune portal — Trusted Certificate profile status | **Intune-portal inspection only — no device command is available.** Check: (1) Trusted Certificate profile status, (2) SCEP/PKCS cert profile status, (3) Wi-Fi or Wired network profile status. On device (read-only): **Settings** > **General** > **VPN & Device Management** — confirm the Trusted Certificate profile is listed and installed. |
| **Android** | Intune portal — Trusted Certificate profile status | **L1 action: check Intune portal only.** Navigate to Intune admin center > **Devices** > [Android Enterprise] > device > **Device configuration** and inspect the Trusted Certificate profile and Wi-Fi profile statuses. Note the signal `adb logcat -s "wpa_supplicant"` for escalation — do **not** attempt to run it at L1; it requires USB debugging and a tethered PC and is an escalation-collected signal for L2 use only. |
| **Linux** | NetworkManager journal (primary); wpa_supplicant journal (supplement) | Ask the user to run: `journalctl -u NetworkManager`. If the NetworkManager output is insufficient, supplement with `journalctl -u wpa_supplicant`. Copy the **complete output**; do not interpret. A server-trust failure appears as a TLS handshake failure in the NM journal. |

> **NOTE — macOS signal confidence:** The macOS `com.apple.eapol` unified-log predicate is MEDIUM confidence — sourced from community/Jamf references, not yet confirmed against official Apple documentation. If it returns no EAPOL entries even with `--last 2h`, try the fallback predicate `log show --predicate 'process == "eapolclient"' --info --last 2h`. This signal is flagged for independent re-verification when the L2 log-collection runbook (#31) is authored.

## Per-Platform Escalation Notes

### Windows

Server-trust failures in the `Microsoft-Windows-WLAN-AutoConfig/Operational` channel typically appear as event 8001 containing text such as "The server certificate chain couldn't be validated" or as event 8003 (authentication failed). The trust dialog ("Trust this certificate?") is a Windows-specific behavior — the user clicking through dismisses the dialog for that session but does not persistently resolve the misconfiguration. Do not interpret individual events — collect the complete log output and provide it to L2.

For wired connections, also confirm the Wired AutoConfig service (dot3svc) is running before reviewing the event log. See [Windows 802.1X Admin Setup — Wired Service Dependency](../admin-setup-8021x/03-windows.md) for the service dependency check.

### macOS

On macOS, the interactive trust dialog is suppressed by managed Wi-Fi and Wired profiles. A missing Trusted Certificate profile causes a silent "Authentication Failed" with no user prompt. The eapolclient unified log may show a TLS handshake failure or an "identity rejected by server" message. The `log show` command does not require elevated privileges. If the 30-minute window returns empty output, extend to `--last 2h`.

### iOS/iPadOS

No device-side log command is available for iOS/iPadOS. The trust dialog is suppressed by Intune-managed profiles. L1 is limited to Intune portal profile status inspection. If the Trusted Certificate profile shows Succeeded but the device still cannot connect, collect a portal status screenshot and escalate to L2.

### Android

The Android 802.1X supplicant logs (`adb logcat -s "wpa_supplicant"`) are collected by L2 only — they require USB debugging, developer mode enabled, and a tethered PC. L1 names this signal for the escalation note; L1 does **not** collect it. L1 action is Intune portal profile status inspection only.

### Linux

The `journalctl -u NetworkManager` command is the primary L1 signal on Linux. A server-trust failure surfaces as a TLS handshake failure or certificate-chain validation error in the NM journal. Supplement with `journalctl -u wpa_supplicant` if the NM journal output is truncated or wpa_supplicant is running as an independent unit. Do not interpret — collect the complete output and provide it to L2.

## Escalation Criteria

Escalate to L2 if:

- The Trusted Certificate profile for the RADIUS root CA shows Succeeded in Intune but the device still shows a trust prompt (Windows) or silent "Authentication Failed" (macOS/iOS/iPadOS)
- The Certificate server names field in the Wi-Fi/Wired profile is confirmed populated but the device still cannot connect
- The Trusted Certificate profile was recently deployed and may not yet have applied to all devices in scope
- Any Windows, macOS, or Linux log output was collected and requires interpretation

**Before escalating, collect:**

- Device serial number and user UPN
- Device platform (Windows / macOS / iOS/iPadOS / Android / Linux)
- Screenshot of Intune Device configuration status for: Trusted Certificate profile, SCEP/PKCS cert profile, and Wi-Fi/Wired network profile
- Screenshot showing the Certificate server names field in the Intune Wi-Fi or Wired network profile (populated or empty)
- For Windows: complete `Microsoft-Windows-WLAN-AutoConfig/Operational` or `Microsoft-Windows-Wired-AutoConfig/Operational` event log output (do not filter by event ID)
- For macOS: complete output of `log show --predicate 'subsystem contains "com.apple.eapol"' --info --last 30m` (or `--last 2h` if the 30-minute window is empty)
- For Linux: complete output of `journalctl -u NetworkManager`
- For iOS/iPadOS: Intune portal profile status screenshot (no device log available)
- For Android: Intune portal profile status screenshot (adb logcat is L2-collected; do not include adb output at this stage)
- Results of the First Checks steps above (Trusted Certificate profile status and Certificate server names field content)

See [L2 Log Collection (#31)](../l2-runbooks/31-8021x-log-collection.md) for per-platform
log sources, then [L2 RADIUS/EAP Investigation (#33)](../l2-runbooks/33-8021x-radius-eap-investigation.md)
for server-name validation analysis and per-platform EAPOL server-trust investigation —
#33 is the primary escalation destination for this runbook. Also note
[L2 Certificate Chain Investigation (#32)](../l2-runbooks/32-8021x-cert-investigation.md)
as a cross-reference: the trusted-root certificate chain is the root-cause mechanism when
the RADIUS server's root CA is not deployed to the device.

---

[Back to 802.1X Triage Decision Tree](../decision-trees/10-8021x-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-30 | Phase 107 plan 02: initial authoring — 802.1X server trust failure (D-01/D-02/D-05/D-07) | -- |
