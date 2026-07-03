---
phase: 109-802-1x-integration-capability-matrices-navigation-hubs
plan: "01"
subsystem: docs/reference
tags: [802.1x, capability-matrix, navigation, documentation]
dependency_graph:
  requires: [101, 102, 103, 104, 105, 106, 107, 108]
  provides: [DOT1X-11-SC1]
  affects: [docs/reference/4-platform-capability-comparison.md, docs/reference/macos-capability-matrix.md, docs/reference/ios-capability-matrix.md, docs/reference/linux-capability-matrix.md, docs/reference/android-capability-matrix.md]
tech_stack:
  added: []
  patterns: [link-not-copy, 5-state-verdict-lock, append-only, navigation-last]
key_files:
  created: []
  modified:
    - docs/reference/4-platform-capability-comparison.md
    - docs/reference/macos-capability-matrix.md
    - docs/reference/ios-capability-matrix.md
    - docs/reference/linux-capability-matrix.md
    - docs/reference/android-capability-matrix.md
decisions:
  - "macOS verdict = Supported (not Partial): both Wi-Fi + Wired native Intune profile types exist; SCEP-only-wired is cert-delivery nuance captured in linked guide, consistent with cert-delivery row precedent"
  - "Comparison Windows column links to linux-capability-matrix.md#configuration per Windows-as-column architecture (PITFALL-1 guard honored)"
  - "Android all-mode verdict = Partial: Wi-Fi supported in every mode, wired gap exists in every mode; BYOD NOT Supported (UPN-in-SAN deployment-failure risk, PITFALL-3 guard honored)"
  - "macOS row placed in ## Configuration (after DDM row), not ## Authentication (PSSO section, PITFALL-2 guard honored)"
metrics:
  duration: "3m"
  completed: "2026-07-01"
  tasks_completed: 3
  files_modified: 5
---

# Phase 109 Plan 01: 802.1X Capability Matrix Rows Summary

**One-liner:** Added one consolidated Network Authentication (802.1X) row to all 5 platform capability matrices with 5-state verdict lock cells and per-platform guide links (SC1 satisfied).

## What Was Built

Added one `Network Authentication (802.1X)` row to the `## Configuration` section of each of the 5 platform capability matrices, satisfying DOT1X-11 SC1. All edits were append-only navigation wiring — no 802.1X theory was restated (link-not-copy). Every cell contains a verdict word + one hyperlink to the source per-platform guide (per-platform matrices) or per-platform capability matrix (comparison doc).

### Per-file changes

| File | Row inserted after | Verdict(s) | Link target(s) |
|------|--------------------|------------|----------------|
| `4-platform-capability-comparison.md` | Certificate deployment row | Supported / Supported / Partial / Mode-dependent / Partial | per-platform matrix `#configuration` anchors |
| `macos-capability-matrix.md` | DDM row | Supported / Supported | `03-windows.md`, `04-macos.md` |
| `ios-capability-matrix.md` | Security baselines row | Supported / Supported / Partial | `03-windows.md`, `04-macos.md`, `05-ios.md` |
| `linux-capability-matrix.md` | Hardware/firmware row | Supported / Partial | `03-windows.md`, `07-linux.md` |
| `android-capability-matrix.md` | DDM row | 6× Partial | `06-android.md` (all 6 mode columns) |

## Decisions Made

1. **macOS = Supported**: Both Wi-Fi and Wired native Intune profile types exist; SCEP-only wired is a cert-delivery nuance in the linked guide, consistent with the existing cert-delivery row precedent at `4-platform-capability-comparison.md:44`.
2. **iOS = Partial**: Wired 802.1X is hardware-limited (M-series iPad only) — a meaningful capability constraint distinct from macOS.
3. **Android comparison = Mode-dependent**: Per-mode verdicts diverge (BYOD has UPN-in-SAN deployment-failure risk; AOSP distinct no-GMS platform); per-mode = all Partial in android matrix (Wi-Fi supported, wired gap in every mode).
4. **PITFALL-1 honored**: Comparison Windows cell links to `linux-capability-matrix.md#configuration`, not to `03-windows.md`.
5. **PITFALL-2 honored**: macOS row placed in `## Configuration` (after DDM row), not in `## Authentication` (PSSO section).
6. **PITFALL-3 honored**: Android BYOD cell = Partial, not Supported.

## Commits

| Hash | Task | Files |
|------|------|-------|
| a697976 | Task 1: 802.1X row to 4-platform comparison | `4-platform-capability-comparison.md` |
| 9fefc84 | Task 2: 802.1X rows to macOS/iOS/Linux matrices | `macos-capability-matrix.md`, `ios-capability-matrix.md`, `linux-capability-matrix.md` |
| 6306da8 | Task 3: 802.1X row to Android mode-columned matrix | `android-capability-matrix.md` |

## Verification Results

- All 5 matrices: exactly 1 `Network Authentication (802.1X)` row each (grep -c = 1)
- Comparison Windows cell: `linux-capability-matrix.md#configuration` (no admin-setup-8021x/03-windows.md)
- All admin guide link targets confirmed on disk: `03-windows.md`, `04-macos.md`, `05-ios.md`, `06-android.md`, `07-linux.md`
- `git diff --name-only HEAD~3 HEAD` lists exactly the 5 reference matrix files
- macOS row confirmed in `## Configuration`, not `## Authentication` (awk section-tracking check)

## Deviations from Plan

None — plan executed exactly as written. All three pitfall guards verified clean.

## Known Stubs

None — all cells carry live links to committed guide files; no placeholder text.

## Threat Flags

None — documentation-only navigation edits; no executable code, no user input, no data flow.

## Self-Check: PASSED

- [x] `docs/reference/4-platform-capability-comparison.md` — modified (contains 802.1X row)
- [x] `docs/reference/macos-capability-matrix.md` — modified
- [x] `docs/reference/ios-capability-matrix.md` — modified
- [x] `docs/reference/linux-capability-matrix.md` — modified
- [x] `docs/reference/android-capability-matrix.md` — modified
- [x] Commit a697976 — confirmed in git log
- [x] Commit 9fefc84 — confirmed in git log
- [x] Commit 6306da8 — confirmed in git log
