---
doc_id: RE-042
status: Approved
owner: L1 Team Lead
doc_type: Runbook
last_verified: 2026-06-30
review_by: 2026-09-28
applies_to: both
audience: L1
platform: windows+macos+ios+android+linux
---

**Platform:** All Platforms · **Doc Type:** Runbook · **Doc ID:** RE-042 · **Status:** Approved

# 802.1X EAP Negotiation Failure

## Summary

This runbook covers read-only L1 diagnostic steps only — no registry edits, no PowerShell execution, and no destructive actions; any remediation requiring elevated access is escalated to L2. It covers L1 triage of 802.1X EAP negotiation failures where the supplicant and RADIUS server cannot agree on an EAP method or inner-auth configuration, across all five platforms, including the iOS/iPadOS PEAP inner-auth mismatch pattern.

> **Platform gate:** This guide covers 802.1X EAP-negotiation-failure triage across all five platforms (Windows / macOS / iOS/iPadOS / Android / Linux). For other 802.1X failure symptoms, return to the [802.1X Triage Decision Tree](../decision-trees/10-8021x-triage.md).

> **L1 scope note:** L1 Triage Steps in this runbook are read-only checks. State-changing actions (modifying the EAP type or inner-auth method in an Intune profile, requesting RADIUS policy changes from the networking team) appear ONLY in L2 runbooks — they are not L1 actions.

## Symptom

The 802.1X connection attempt fails after a **longer delay** than a certificate rejection would produce. The EAP negotiation starts but the supplicant and the RADIUS server cannot agree on a method or inner-auth configuration. The following conditions are all true:

- All certificate profiles (**Trusted Certificate** and **SCEP/PKCS** client cert) show **Succeeded** in Intune.
- No trust prompt appears on the device.
- No certificate error is visible in Intune.
- The symptom is **consistent across all users on the same device type or platform** — it is not a single-user or single-device anomaly.

A key indicator of EAP negotiation failure is when **one platform fails while others succeed on the same SSID or wired port**. The most common cause of this platform-specific pattern:

- **iOS/iPadOS with PEAP where the RADIUS server requires PAP inner auth:** iOS PEAP always uses MS-CHAPv2 as the inner-auth method — PAP is not supported and causes an immediate EAP-NAK from the iOS supplicant. This appears as "Authentication Failed on iOS only" while Windows, macOS, Android, and Linux devices on the same SSID succeed.
- **EAP-TTLS inner-auth mismatch:** The inner-auth method configured in the Intune profile (e.g., MS-CHAPv2) does not match what the RADIUS policy expects (e.g., PAP or CHAP), causing negotiation failure across platforms.

For EAP method context, the co-equal path comparison (EAP-TLS / PEAP-MSCHAPv2 / EAP-TTLS), and supported inner-auth combinations, see [EAP Method Overview](../admin-setup-8021x/01-eap-method-overview.md).

Differential:

- If a cert profile shows Error or Pending → see [#38: 802.1X Certificate Failure](38-8021x-certificate-failure.md)
- If the user sees a trust prompt or "untrusted certificate" indicator → see [#40: 802.1X Server Trust Failure](40-8021x-server-trust-failure.md)
- If cert profiles show Succeeded and there is no trust prompt and no platform-specific symptom pattern → see [#39: 802.1X RADIUS Reject](39-8021x-radius-reject.md)

## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com)
- Access to Microsoft Entra admin center (https://entra.microsoft.com) — read-only is sufficient
- Device serial number
- User's UPN (email address)
- Device platform (Windows / macOS / iOS/iPadOS / Android / Linux) — required to use the per-platform diagnostic table below

## First Checks (All Platforms)

Perform these checks before collecting platform-specific diagnostic output. They confirm EAP negotiation failure as the failure class and rule out certificate deployment issues.

1. In Intune admin center, navigate to **Devices** > [platform] > select device by serial number > **Device configuration**. Confirm **all** of the following show **Succeeded**:
   - Trusted Certificate profile
   - SCEP or PKCS client certificate profile
   - Wi-Fi or Wired network profile

   If any cert profile is not Succeeded, this is a certificate deployment failure — route to [#38: 802.1X Certificate Failure](38-8021x-certificate-failure.md) instead.

2. Open the Wi-Fi or Wired network profile in Intune (**Devices** > **Configuration** > [profile] > **Properties**). Note the **EAP type** configured (EAP-TLS, PEAP, or EAP-TTLS) and, if applicable, the **inner authentication method** (MS-CHAPv2, PAP, etc.). For EAP method definitions, supported configurations, and the co-equal path comparison, see [EAP Method Overview](../admin-setup-8021x/01-eap-method-overview.md).

3. Ask the following questions to identify the failure scope:
   - "Which EAP method is configured in the Intune profile?"
   - "Did 802.1X work on this device or platform before, or has it never worked?"
   - "Does the failure affect one device type only (for example, iOS only) or all platforms on the same SSID or wired port?"

   If the answer is **iOS/iPadOS only fails while other platforms succeed**: this is a strong indicator of a PEAP inner-auth mismatch. iOS PEAP always requires MS-CHAPv2 inner auth — PAP causes an immediate EAP-NAK. Record this platform-scope pattern in the escalation note.

> **NOTE:** EAP negotiation failures (this runbook) are distinct from RADIUS-reject failures (#39). An EAP negotiation failure surfaces **before** the RADIUS server evaluates the user's credentials — the supplicant and server cannot agree on a method, so no credential exchange occurs. The longer connection-attempt delay and the platform-specific symptom pattern are the primary L1-visible discriminators.

## Per-Platform Diagnostic Signal

Collect the diagnostic output for the affected platform. Do **not** attempt to interpret individual log entries — copy the complete output and provide it to L2.

| Platform | Signal / Channel | L1 Action |
|----------|-----------------|-----------|
| **Windows (Wi-Fi)** | `Microsoft-Windows-WLAN-AutoConfig/Operational` | Open **Event Viewer** > Applications and Services Logs > Microsoft > Windows > **WLAN-AutoConfig** > Operational. Locate events near the connection attempt time. Copy complete output; do not interpret. An EAP negotiation failure may appear as an event referencing the EAP method type or a method-mismatch text. |
| **Windows (Wired)** | `Microsoft-Windows-Wired-AutoConfig/Operational` | Open **Event Viewer** > Applications and Services Logs > Microsoft > Windows > **Wired-AutoConfig** > Operational. Copy complete output; do not interpret. |
| **macOS** | eapolclient unified log (`com.apple.eapol` subsystem) | Ask the user to run the following command exactly as shown in Terminal: `log show --predicate 'subsystem contains "com.apple.eapol"' --info --last 30m`. If the output is empty, retry with `--last 2h`. Ask the user to copy the **complete output**; do not interpret individual entries. |
| **iOS/iPadOS** | Intune portal — device configuration profile status | **Intune-portal inspection only — no device command is available on iOS/iPadOS.** The symptom pattern itself (iOS/iPadOS fails while other platforms succeed on the same SSID or wired port) is the primary diagnostic signal. Confirm all cert profiles show Succeeded in the portal. Note the SSID and EAP type configured in the network profile. |
| **Android** | Intune portal — device configuration profile status | **L1 action: check Intune portal only.** Navigate to Intune admin center > **Devices** > [Android Enterprise] > device > **Device configuration** and confirm all profile statuses. Note the signal `adb logcat -s "wpa_supplicant"` for escalation — do **not** attempt to run it at L1; it requires USB debugging and a tethered PC and is an escalation-collected signal for L2 use only. |
| **Linux** | NetworkManager journal (primary); wpa_supplicant journal (supplement) | Ask the user to run: `journalctl -u NetworkManager`. If the NetworkManager output is insufficient, supplement with `journalctl -u wpa_supplicant`. Copy the **complete output**; do not interpret. |

> **NOTE — macOS signal confidence:** The macOS `com.apple.eapol` unified-log predicate is MEDIUM confidence — sourced from community/Jamf references, not yet confirmed against official Apple documentation. If it returns no EAPOL entries even with `--last 2h`, try the fallback predicate `log show --predicate 'process == "eapolclient"' --info --last 2h`. See the [L2 802.1X Log Collection runbook (#31)](../l2-runbooks/31-8021x-log-collection.md) for the full macOS EAPOL collection procedure.

## Per-Platform Escalation Notes

### Windows

Events in the `Microsoft-Windows-WLAN-AutoConfig/Operational` channel for EAP negotiation failures may reference the EAP method type (for example, EAP type 25 = PEAP, type 21 = EAP-TTLS, type 13 = EAP-TLS) or include method-mismatch text alongside the failure event. Do not interpret individual events — collect the complete log output and provide it to L2.

For wired connections, also confirm the Wired AutoConfig service (dot3svc) is running before reviewing the event log. See [Windows 802.1X Admin Setup — Wired Service Dependency](../admin-setup-8021x/03-windows.md) for the service dependency check.

### macOS

The eapolclient unified log shows the EAP negotiation sequence on macOS. An EAP negotiation failure typically surfaces earlier in the EAPOL exchange than a RADIUS reject — before the identity exchange is complete. Collect the complete `log show` output; do not interpret. If the 30-minute window returns empty output, extend to `--last 2h`.

### iOS/iPadOS

No device-side log command is available for iOS/iPadOS. The primary L1 signal for iOS/iPadOS is the **symptom pattern**: if iOS/iPadOS devices fail on an SSID or wired port where Windows, macOS, Android, and Linux devices succeed, this is a strong indicator of a PEAP inner-auth mismatch. iOS PEAP inner auth is always MS-CHAPv2 — PAP is not supported and causes an immediate EAP-NAK. Record this platform-scope pattern in the escalation note. L1 action is Intune portal profile status inspection only.

### Android

The Android 802.1X supplicant logs (`adb logcat -s "wpa_supplicant"`) are collected by L2 only — they require USB debugging, developer mode enabled, and a tethered PC. L1 names this signal for the escalation note; L1 does **not** collect it. The wpa_supplicant log records EAP-NAK events and method negotiation details useful for L2 diagnosis. L1 action is Intune portal profile status inspection only.

### Linux

The `journalctl -u NetworkManager` command is the primary L1 signal on Linux. EAP negotiation failures surface in the NM journal as EAP method negotiation events from the wpa_supplicant subprocess. Supplement with `journalctl -u wpa_supplicant` if the NM journal output is truncated or wpa_supplicant is running as an independent unit. Do not interpret — collect the complete output and provide it to L2.

## Escalation Criteria

Escalate to L2 if:

- All cert profiles show Succeeded in Intune but the device cannot authenticate and there is evidence of a platform-specific or EAP-method-specific failure pattern
- The failure affects iOS/iPadOS only while other platforms succeed on the same SSID or wired port (PEAP inner-auth mismatch suspected)
- The EAP type or inner-auth method is confirmed in the Intune profile but authentication still fails
- Any Windows, macOS, or Linux log output was collected and requires interpretation

**Before escalating, collect:**

- Device serial number and user UPN
- Device platform(s) affected and whether the failure is platform-specific (for example, iOS only) or cross-platform
- EAP type and inner-auth method configured in the Intune Wi-Fi/Wired profile
- Whether the failure is new or has never worked on this platform
- Screenshot of Intune Device configuration status for all three profiles: Trusted Certificate, SCEP/PKCS cert, and Wi-Fi/Wired network profile
- For Windows: complete `Microsoft-Windows-WLAN-AutoConfig/Operational` or `Microsoft-Windows-Wired-AutoConfig/Operational` event log output (do not filter by event ID)
- For macOS: complete output of `log show --predicate 'subsystem contains "com.apple.eapol"' --info --last 30m` (or `--last 2h` if the 30-minute window is empty)
- For Linux: complete output of `journalctl -u NetworkManager`
- For iOS/iPadOS: Intune portal profile status screenshot and a description of which platforms succeed vs. fail (no device log available)
- For Android: Intune portal profile status screenshot (adb logcat is L2-collected; do not include adb output at this stage)
- Results of the First Checks steps above, including confirmed EAP type and platform-scope symptom pattern

See [L2 Log Collection (#31)](../l2-runbooks/31-8021x-log-collection.md) for per-platform
log sources, then [L2 RADIUS/EAP Investigation (#33)](../l2-runbooks/33-8021x-radius-eap-investigation.md)
for EAP method mismatch diagnosis, inner-auth negotiation analysis, and per-platform EAP
negotiation investigation.

---

[Back to 802.1X Triage Decision Tree](../decision-trees/10-8021x-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| YYYY-MM-DD | v1.15 EEE reformat — content not re-reviewed | — |
| 2026-06-30 | Phase 107 plan 02: initial authoring — 802.1X EAP negotiation failure (D-01/D-02/D-05) | -- |
