---
phase: 108-l2-runbooks-31-33-decision-tree-10
plan: "01"
subsystem: docs/l2-runbooks
tags: [802.1x, l2-runbook, log-collection, cross-platform, windows, macos, ios, android, linux]
dependency_graph:
  requires:
    - docs/l1-runbooks/38-8021x-certificate-failure.md
    - docs/l1-runbooks/39-8021x-radius-reject.md
    - docs/l1-runbooks/40-8021x-server-trust-failure.md
    - docs/l1-runbooks/41-8021x-eap-negotiation-failure.md
    - docs/l2-runbooks/01-log-collection.md
    - docs/l2-runbooks/10-macos-log-collection.md
    - docs/l2-runbooks/14-ios-log-collection.md
    - docs/l2-runbooks/18-android-log-collection.md
    - docs/l2-runbooks/24-linux-log-collection.md
    - docs/decision-trees/10-8021x-triage.md
    - docs/admin-setup-8021x/02-cert-delivery-foundation.md
    - docs/_glossary-network.md
  provides:
    - docs/l2-runbooks/31-8021x-log-collection.md
  affects:
    - docs/l2-runbooks/32-8021x-cert-investigation.md (downstream — consumes #31 logs)
    - docs/l2-runbooks/33-8021x-radius-eap-investigation.md (downstream — consumes #31 logs)
tech_stack:
  added: []
  patterns:
    - cross-platform compound frontmatter (platform: windows+macos+ios+android+linux, audience: L2)
    - D-01 hybrid structure (shared Context/Tool-Landscape prose + per-platform H2 sections)
    - D-02 link-not-copy (links to 5 general packages; self-contains 802.1X-specific signals)
    - MEDIUM-confidence NOTE callout for macOS com.apple.eapol predicate
    - Android USB-debugging WARNING callout
    - per-signal [HIGH|MEDIUM, last_verified YYYY-MM-DD] inline confidence tags
    - colon-separator H2 headings (avoids em-dash double-hyphen anchor slug trap)
key_files:
  created:
    - docs/l2-runbooks/31-8021x-log-collection.md
  modified: []
decisions:
  - "Wired-AutoConfig channel referenced as Microsoft-Windows-Wired-AutoConfig/Operational throughout; dot3svc service name mentioned only as prose context (no Dot3Svc/Operational string per RESEARCH Pitfall 1)"
  - "macOS EAPOL predicate presented with MEDIUM-confidence NOTE callout + eapolclient fallback per RESEARCH open question 2; no high-confidence claim made"
  - "Android section opens with USB-debugging WARNING and labels adb logcat as L2-only escalation step; ClientModeImpl/WifiNative tagged LOW confidence and labeled supplemental only"
  - "CAPI2 enable step labeled as state-changing with WARNING callout; instructs engineer to disable after export"
  - "iOS/iPadOS section opens with NOTE that no device-side command exists; all surfaces are Intune portal + user-assisted Settings inspection"
metrics:
  duration: "~20 minutes"
  completed_date: "2026-07-01"
  tasks_completed: 1
  files_created: 1
  files_modified: 0
---

# Phase 108 Plan 01: 802.1X L2 Log Collection (#31) Summary

## One-liner

Cross-platform 802.1X L2 log-collection runbook (#31) with per-platform H2 sections for Windows Event Viewer channels, macOS eapolclient unified log, iOS/iPadOS Intune portal paths, Android adb logcat (escalation-collected), and Linux journalctl — using verified signal strings, inline confidence tags, and link-not-copy D-02 references to the five existing platform log guides.

## What Was Built

Created `docs/l2-runbooks/31-8021x-log-collection.md` — the corpus's first cross-platform L2 log-collection runbook and the shared prerequisite for #32 and #33 (SC1, DOT1X-10).

### Structure (D-01 hybrid)

Shared Context + Tool Landscape prose followed by five per-platform H2 sections:

1. **Windows: 802.1X Log Collection** — three subsections for `Microsoft-Windows-WLAN-AutoConfig/Operational` (Wi-Fi, HIGH), `Microsoft-Windows-Wired-AutoConfig/Operational` (Wired, HIGH), and `Microsoft-Windows-CAPI2/Operational` (cert-chain diagnosis, HIGH, state-changing enable with WARNING). Event ID table: 8001/8002/8003/11006 with interpretation sentences.

2. **macOS: 802.1X Log Collection** — primary `log show --predicate 'subsystem contains "com.apple.eapol"'` predicate + alternative combined form + fallback `process == "eapolclient"` predicate + Wireless Diagnostics GUI path. MEDIUM-confidence NOTE callout per RESEARCH Pitfall 2. Note that Sierra+ does not write `/var/log/eapolclient/`.

3. **iOS/iPadOS: 802.1X Log Collection** — NOTE callout that no device-side command exists. Intune portal paths: Device configuration (Trusted Certificate → SCEP/PKCS → Wi-Fi/Wired profile status), Troubleshoot view for delivery timeline, on-device Settings > VPN & Device Management (user-assisted).

4. **Android: 802.1X Log Collection** — WARNING callout for developer options + USB debugging + USB cable prerequisites. Primary filter `adb logcat -s "wpa_supplicant"` [MEDIUM] with OEM/version variability NOTE. ClientModeImpl/WifiNative labeled LOW confidence supplemental only. Intune portal path for SCEP profile status.

5. **Linux: 802.1X Log Collection** — `journalctl -u NetworkManager` [MEDIUM] as primary; `journalctl -u wpa_supplicant` [MEDIUM] as supplement; interface-scoped form `journalctl -u wpa_supplicant@<interface>`; filtered grep form; EAP event string table (CTRL-EVENT-EAP-STARTED / PROPOSED-METHOD / METHOD / SUCCESS / FAILURE) with interpretation column.

### D-02 link-not-copy

Context section links all five platform log collection guides (#01/#10/#14/#18/#24) and explicitly states 802.1X signals below are not covered in those five guides. No `mdmdiagnosticstool`, `IntuneMacODC`, iOS sysdiagnose, or Android Company Portal log procedures are restated.

### SC1 prerequisite declaration

Context section declares #31 as prerequisite for #32 and #33 with explicit links.

## Deviations from Plan

None — plan executed exactly as written. All acceptance criteria met; automated verification gate passed after correcting a one-line prose reference that contained the forbidden `Dot3Svc/Operational` string (changed to prose-only dot3svc service-name reference without the channel-name form).

## Known Stubs

None. All per-platform sections contain real, verified log collection commands and interpretation guidance. No placeholder text or hardcoded empty values.

## Threat Flags

None. This plan authors a single Markdown documentation file. No executable code, no new attack surface. The one state-changing step (CAPI2 log enable) is explicitly labeled with a WARNING callout so operators are aware.

## Commits

| Hash | Message |
|------|---------|
| 62a0131 | feat(108-01): author #31 cross-platform 802.1X L2 log-collection runbook |

## Self-Check: PASSED

- `docs/l2-runbooks/31-8021x-log-collection.md` exists and contains all required signal strings
- Commit `62a0131` present in git log
- All automated grep checks pass (platform token, audience, all channel names, adb filter, macOS predicate, journalctl units, five general log-collection links, #32/#33 links, no Dot3Svc/Operational, no IMPORTANT callout, no {# anchors)
