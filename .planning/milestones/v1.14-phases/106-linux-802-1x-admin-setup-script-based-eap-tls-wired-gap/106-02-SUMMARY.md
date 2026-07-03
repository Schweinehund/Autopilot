---
phase: 106-linux-802-1x-admin-setup-script-based-eap-tls-wired-gap
plan: "02"
subsystem: documentation/navigation
tags: [802.1x, linux, navigation, overview, DOT1X-08]
dependency_graph:
  requires: ["106-01"]
  provides: ["docs/admin-setup-8021x/00-overview.md item-7 live link to 07-linux.md"]
  affects: []
tech_stack:
  added: []
  patterns: ["navigation-last local-only edit", "item-N placeholder replacement", "Change-History append-only row"]
key_files:
  modified:
    - docs/admin-setup-8021x/00-overview.md
decisions:
  - "Item-7 description names all SC1+SC3 content: no native Intune Wi-Fi/wired/cert profiles; EAP-TLS via nmcli NetworkManager 802-1x.*; out-of-band cert prerequisites; Ubuntu 24.04/26.04 LTS; PEAP/TTLS out of scope -- matching sibling style (bold linked title, double-dash, no trailing period)"
  - "Wired-availability note at line 38 and Mermaid 3-7 node left byte-unchanged per acceptance criteria"
  - "Navigation-last invariant honored: no capability-matrix rows, no global nav-hub files (index.md, quick-refs, l1/l2 indexes) touched -- those are Phase 109"
metrics:
  duration: "4m"
  completed: "2026-06-30"
  tasks_completed: 1
  files_modified: 1
---

# Phase 106 Plan 02: Fill 00-overview.md Item 7 (Linux Link) Summary

Local `docs/admin-setup-8021x/00-overview.md` item-7 placeholder replaced with a live descriptive link to `07-linux.md`, completing the per-platform numbered list (items 3-7) and satisfying the DOT1X-08 local-navigation requirement.

## What Was Built

**Single surgical edit to `docs/admin-setup-8021x/00-overview.md`:**

1. **Item-7 placeholder replaced** (line 36): `7. Platform guide (Phase 106) -- entry added when guide is authored.` replaced with the live descriptive one-liner:

   ```
   7. **[Linux 802.1X Admin Setup (EAP-TLS via nmcli)](07-linux.md)** -- No native Intune Wi-Fi, wired, or cert-delivery profiles for Linux; guide documents EAP-TLS via nmcli (NetworkManager `802-1x.*`) as an OS-level workaround, with out-of-band certificate prerequisites. Ubuntu 24.04 LTS and 26.04 LTS. PEAP-MSCHAPv2 and EAP-TTLS out of scope (not in verifiable Microsoft/vendor sources for Intune-managed Linux fleets).
   ```

2. **Change-History row appended** (after the Phase-105 Android row):
   ```
   | 2026-06-30 | Added item 7 -- Linux platform-guide entry linking 07-linux.md; placeholder removed | -- |
   ```

## Verification Results

All 8 automated checks from `<verify>` passed:

| Check | Result |
|-------|--------|
| `](07-linux.md)` link present | PASS |
| Old placeholder `7. Platform guide (Phase 106)...` gone | PASS |
| `](06-android.md)` item 6 intact | PASS |
| `](05-ios.md)` item 5 intact | PASS |
| `](04-macos.md)` item 4 intact | PASS |
| `](03-windows.md)` item 3 intact | PASS |
| `Added item 7 -- Linux` Change-History row present | PASS |
| Wired-availability note `script-based EAP-TLS only via nmcli; see the Linux guide for details` unchanged | PASS |

## Acceptance Criteria Status

| Criteria | Met |
|----------|-----|
| Item 7 is a bold link `](07-linux.md)` with description, no trailing period, sibling style | Yes |
| Names: no-native-Intune-profile gap, EAP-TLS via nmcli (802-1x.*), out-of-band certs, Ubuntu 24.04/26.04 LTS, PEAP/TTLS out of scope | Yes |
| Old placeholder line gone | Yes |
| Items 3-6 all intact | Yes |
| Wired-availability note (line 38) unchanged | Yes |
| Mermaid `3-7. Platform Guides` node unchanged | Yes (not in scope of edit; sibling items 1-2 + Mermaid untouched) |
| Change-History row dated 2026-06-30 with `--` Author | Yes |
| No other file modified | Yes -- only `00-overview.md` changed |

## Commits

| Hash | Message | Files |
|------|---------|-------|
| `f26b648` | `docs(106-02): fill item 7 (Linux) in 00-overview.md with live 07-linux.md link` | `docs/admin-setup-8021x/00-overview.md` |

## Deviations from Plan

None -- plan executed exactly as written. The RESEARCH Section 5 replacement text was used verbatim. The wired-availability note and Mermaid node were left untouched. No files other than `00-overview.md` were modified.

## Harness Allowlist Registration (Required)

`docs/admin-setup-8021x/00-overview.md` is a **pre-existing file** edited by this plan. This follows the same pattern as:
- Phase 105 item-6 edit (06-android.md link)
- Phase 104 item-5 edit (05-ios.md link)
- Phase 103 item-4 edit (04-macos.md link)
- Phase 102 item-3 edit (03-windows.md link)

This file and its new line ranges **must be added to the v1.14 audit allowlist** (`v1.14-audit-allowlist.json`) at Phase 112 execution time (HARN-01/HARN-02), consistent with the T-106-02-01 threat mitigation.

## Known Stubs

None -- the item-7 entry is a live link to `07-linux.md` (authored in Plan 106-01). No placeholder text remains in the overview's numbered list.

## Threat Flags

None -- this is a documentation-only navigation edit with no executable surface. Threat T-106-02-01 (harness allowlist drift) is mitigated by the harness-allowlist registration note above. T-106-02-02 (accidental wired-note modification) confirmed mitigated -- grep CHECK8 passed.

## Self-Check

### Files Created/Modified

- [x] `docs/admin-setup-8021x/00-overview.md` -- EXISTS (modified in place)

### Commits

- [x] `f26b648` -- FOUND in git log

## Self-Check: PASSED
