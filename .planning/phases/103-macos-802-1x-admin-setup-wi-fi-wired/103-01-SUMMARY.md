---
phase: 103
plan: "01"
subsystem: docs/admin-setup-8021x
tags: [802.1x, macos, wi-fi, wired, eap-tls, peap, eap-ttls, intune, deployment-channel]
dependency_graph:
  requires: [101-01, 101-02, 101-03, 102-01]
  provides: [docs/admin-setup-8021x/04-macos.md]
  affects: [DOT1X-05]
tech_stack:
  added: []
  patterns: [A3-Hybrid-clone, link-not-copy, co-equal-EAP, blockquote-callout-WARNING-NOTE]
key_files:
  created:
    - docs/admin-setup-8021x/04-macos.md
  modified: []
decisions:
  - "Deployment-channel WARNING callout is the first content in Common Profile Mechanics (before any config steps) -- D-01/D-02/D-03"
  - "Callout severity is WARNING (not DANGER); macOS channel mistake is serious-but-recoverable (delete/recreate/reassign) -- D-03"
  - "No authentication-mode selector note added as plain prose (User/Machine/User-or-machine absent on macOS) -- D-04"
  - "Server validation homed once in Common Mechanics with security-violation framing and dynamic-trust-dialog symptom; wired delta is one line -- D-05/D-11/D-12"
  - "Wired SCEP-only NOTE callout placed prominently before the per-EAP matrix -- D-06"
  - "Wired section gets full peer treatment equal to Wi-Fi (complete per-EAP matrix) -- D-07"
  - "B-04 profile-type confusion prevented structurally via distinct sections + one-line inline sentence only (no blockquote callout) -- D-08/D-09"
  - "Inner method row in both matrices populated per macOS option set (EAP-TTLS = PAP/CHAP/MS-CHAP/MS-CHAP v2; PEAP = implicit MSCHAPv2; EAP-TLS = n/a) -- D-10"
metrics:
  duration: "7 minutes"
  completed: "2026-06-30T15:46:00Z"
  tasks_completed: 2
  files_created: 1
  files_modified: 0
---

# Phase 103 Plan 01: macOS 802.1X Admin Setup Guide (Wi-Fi + Wired) Summary

**One-liner:** macOS 802.1X admin-setup guide with immutable deployment-channel WARNING, wired SCEP-only callout, and co-equal EAP-TLS/PEAP-MSCHAPv2/EAP-TTLS matrices for both connection types.

## What Was Built

Created `docs/admin-setup-8021x/04-macos.md` -- the macOS per-platform 802.1X admin-setup guide satisfying DOT1X-05. The file follows the locked A3 Hybrid structure cloned from the Phase-102 Windows template, with macOS-specific adaptations per locked decisions D-01..D-12:

**Common Profile Mechanics:**
- Deployment-channel WARNING callout as the first content (decision table: user cert → User channel/User keychain; device cert → Device channel/System keychain; immutability + delete/recreate/reassign remediation)
- Plain-prose "No authentication-mode selector on macOS" note for Windows-trained admins
- Server Validation subsection homed once for both connections (security requirement framing, dynamic-trust-dialog symptom, A-05 security-violation fact, links to 01-/glossary, no disabled-validation example)
- Anonymous Outer Identity subsection with "Identity privacy (outer identity)" field label covering all three EAP methods

**Wi-Fi section:** macOS nav path (`Templates > Wi-Fi`), co-equal 3-EAP matrix with Inner method row (D-10), client cert note (SCEP or PKCS supported for Wi-Fi).

**Wired section:** D-09 one-line separateness sentence (plain prose), macOS wired nav path (`Templates > Wired network`), SCEP-only NOTE callout (D-06), Network Interface selector table (7 options, First active Ethernet default), one-line dynamic-trust wired delta, full peer-depth per-EAP matrix with `Server Trust -- Certificate server names` row label and SCEP-only client auth cell.

**Closeout:** See Also (01-/02-/glossary; 02- description excludes PFX-Import), Change History dated 2026-06-30.

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| Task 1 | 552eaf5 | feat(103-01): scaffold + Common Profile Mechanics + Wi-Fi section |
| Task 2 | 6a67293 | feat(103-01): add Wired subsection + SCEP-only callout + Network Interface selector + closeout |

## Deviations from Plan

None -- plan executed exactly as written. All locked decisions D-01..D-12 honored. Plan-time verification flags V1/V2 (PEAP inner method on macOS Wi-Fi and Wired) addressed per RESEARCH.md guidance: PEAP inner method is implicit MSCHAPv2 per spec; Microsoft Learn docs show no inner method sub-option for macOS PEAP; matrix cells correctly state "-- (PEAP tunnels MSCHAPv2; inner not separately selectable)". V4 (Wi-Fi nav path) confirmed via RESEARCH.md HIGH-confidence source (Microsoft Learn ref-wifi-settings-apple, verified 2026-06-30).

## Success Criteria Verification

- SC1: macOS Wi-Fi 802.1X profile, three co-equal EAP methods, immutable deployment-channel decision before profile creation -- PRESENT
- SC2: macOS wired profile with Network Interface selector + SCEP-only / PKCS-not-supported callout -- PRESENT
- SC3: server-name field populated to suppress dynamic trust dialog + outer-identity/identity-privacy per EAP method -- PRESENT
- T-103-01 (content integrity): server validation never shown disabled; "No example in this guide shows server validation disabled" statement present -- PRESENT
- T-103-02 (deployment-channel WARNING): WARNING callout + decision table as first Common Mechanics content -- PRESENT
- T-103-03 (identity disclosure): Identity privacy (outer identity) for all three EAP methods on both connections -- PRESENT
- T-103-04 (PKCS on wired): SCEP-only NOTE callout before the wired config matrix -- PRESENT

## Known Stubs

None -- all content is fully wired. The guide links to 01-/02-/glossary for shared concepts (link-not-copy) rather than stubs; these are intentional cross-references, not placeholders.

## Self-Check: PASSED

- `docs/admin-setup-8021x/04-macos.md` exists: VERIFIED
- Commit 552eaf5 exists: VERIFIED
- Commit 6a67293 exists: VERIFIED
- File line count: 153 (above 90-line minimum): VERIFIED
- No Windows-only tokens (dot3svc, DANGER, KB5014754, TEAP, PFX Import): VERIFIED
- No DANGER callout: VERIFIED
- WARNING callout present with decision table: VERIFIED
- SCEP-only NOTE callout present with per-platform-cert-delivery-support-matrix link: VERIFIED
- Server-name validation links to peap-mschapv2 anchor and #server-name-validation anchor: VERIFIED
