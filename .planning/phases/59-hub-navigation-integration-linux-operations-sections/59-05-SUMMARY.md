---
phase: 59
plan: 59-05
subsystem: docs/glossary
tags: [glossary, cross-platform, see-also, CLEAN-08, reciprocity]
dependency_graph:
  requires: [59-01]
  provides: [GLOSSARY_RECIPROCITY, V-59-20, V-59-21, V-59-22, V-59-23, V-59-24]
  affects: [59-08, 59-09]
tech_stack:
  added: []
  patterns: [blockquote-append, GFM-anchor-slug, bidirectional-reciprocity]
key_files:
  created:
    - .planning/phases/59-hub-navigation-integration-linux-operations-sections/59-05-COLLISION-MATRIX.md
  modified:
    - docs/_glossary.md
    - docs/_glossary-macos.md
    - docs/_glossary-android.md
    - docs/_glossary-linux.md
decisions:
  - "Collision-term matrix scoped to 14 terms with actual H3 entries in 2+ glossaries (not planned prose references)"
  - "dm-crypt/LUKS encryption triple excluded from see-also pairs — BitLocker and FileVault absent as H3 entries in Windows and macOS glossaries"
  - "Pre-existing standalone COPE and WPCO see-also lines moved inside adjacent blockquotes (Rule 1 A3 integrity fix)"
  - "Android Supervision uses > **Android note:** blockquote shape — see-also appended inside it (not > **Cross-platform note:**)"
  - "Linux ZTE callout references both Android ZTE and macOS ADE (ADE is the macOS equivalent of ZTE)"
metrics:
  duration: 12 minutes
  completed: 2026-05-05
  tasks_completed: 6
  files_modified: 4
  files_created: 1
---

# Phase 59 Plan 05: Glossary CLEAN-08 See-Also Normalization Summary

**One-liner:** Bidirectional per-term `> See also:` reciprocity across all 4 platform glossaries (Windows/Apple/Android/Linux) for 14 collision-term matrix entries, shipping D-14..D-20 mandates and GLOSSARY_RECIPROCITY phase-level truth.

## What Was Built

Plan 59-05 implements CLEAN-08 glossary see-also reciprocity:

1. **Collision-term matrix artifact** — locked 14-term matrix with GFM anchor map and 40 bidirectional reciprocity pairs; basis for V-59-20..23 validator assertions in Plan 59-08
2. **macOS glossary** — 8 see-also lines appended inside existing `> **Windows equivalent:**` blockquotes; labels preserved verbatim per D-15
3. **Android glossary** — 11 see-also lines appended inside existing `> **Cross-platform note:**` and `> **Android note:**` blockquotes
4. **Linux glossary** — 10 see-also lines appended inside existing `> **Cross-platform note:**` and `> **Linux note:**` callout blockquotes
5. **Windows glossary** — 4 NEW `> **Cross-platform note:**` blockquotes added for matrix-term H3s (OOBE, ESP, Hardware hash, Corporate identifiers)
6. **Frontmatter refresh** — all 4 glossaries updated to `last_verified: 2026-05-05`, `review_by: 2026-07-04`; Phase 59 Version History rows added

## Collision-Term Matrix Summary

**Total matrix terms:** 14 (10 with ≥2 H3 occurrences across glossaries; 4 single-glossary terms with functional see-also pairs based on existing blockquote prose references)

**Terms with ≥2 glossary H3 entries (generating reciprocal see-also lines):**

| Term | Glossaries |
|------|-----------|
| Supervision | Apple + Android + Linux (3-way) |
| Zero-Touch Enrollment | Android + Linux |
| ADE ↔ ZTE | Apple ↔ Android |
| COBO / COPE / WPCO | Android (3 H3s) + Linux (1 combined callout) |
| DPC | Android + Linux |
| Work Profile | Android + Linux |
| ABM | Apple + Linux |
| VPP | Apple + Linux |
| Managed Google Play | Android + Linux |
| Hardware Hash | Windows + Linux |
| Corporate Identifiers | Windows + Android |
| Web-app CA / MAM-WE | Linux + Apple (compliance-lite pair per D-16) |
| OOBE / Setup Assistant | Windows + Apple |
| ESP / Await Configuration | Windows + Apple |

**Total bidirectional pairs:** 40 (20 relationships × 2 directional pairs each)

## Per-Glossary See-Also Line Counts Post-Edit

| Glossary | `> See also:` lines | `> **Cross-platform note:**` count | `> **Windows equivalent:**` count |
|----------|--------------------|------------------------------------|-----------------------------------|
| `docs/_glossary.md` | 4 | 4 (NEW) | 0 |
| `docs/_glossary-macos.md` | 8 | 0 | 11 (PRESERVED verbatim) |
| `docs/_glossary-android.md` | 11 | 23 (PRESERVED verbatim) | 0 |
| `docs/_glossary-linux.md` | 10 | 9 (PRESERVED verbatim) | 0 |
| **Total** | **33** | | |

## Preserved Blockquote Counts (D-15 Anti-Rename)

- `docs/_glossary-macos.md` `> **Windows equivalent:**` blockquotes: **11** (unchanged — all see-also lines appended inside, labels NOT renamed)
- `docs/_glossary-android.md` `> **Cross-platform note:**` blockquotes: **23** (unchanged)
- `docs/_glossary-linux.md` `> **Cross-platform note:**` blockquotes: **9** (unchanged)

## Phase 49 LIN-02 Banner-Link Preservation (D-20)

Confirmed byte-identical at required positions:
- `docs/_glossary.md` line 11: contains `_glossary-macos.md` ✓
- `docs/_glossary-macos.md` line 10: contains `_glossary.md` ✓
- `docs/_glossary-android.md` line 12: contains `_glossary.md` ✓
- `docs/_glossary-linux.md` line 10: contains `_glossary.md` ✓

Phase 59 delta is per-term see-also only — banner links untouched.

## V-59-20..V-59-24 Reciprocity Assertions Status

- **V-59-20 (A1 reciprocity):** All matrix terms have `> See also:` lines in every listing glossary ✓
- **V-59-21 (A2 anchor correctness):** All see-also link targets verified against actual H3 headings and GFM slug computation ✓
- **V-59-22 (bidirectional pair check):** 40 pairs covering all Cartesian products of listing glossaries per matrix ✓
- **V-59-23 (transitivity):** 3-way Supervision pair (Apple ↔ Android ↔ Linux) fully covered ✓
- **V-59-24 (A3 blockquote integrity):** All 33 see-also lines preceded by `>` lines (zero violations) ✓

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Pre-existing standalone see-also lines in COPE and WPCO Android entries outside blockquotes**
- **Found during:** Task 3 (Android glossary edits)
- **Issue:** `### COPE` and `### WPCO` had existing `> See also:` lines separated from their `> **Cross-platform note:**` blockquotes by blank lines, violating A3 blockquote integrity (would cause V-59-24 to fail)
- **Fix:** Moved the standalone `> See also:` lines inside the adjacent `> **Cross-platform note:**` blockquotes (removed blank line separator); also added the new Linux cross-platform see-also reference to each
- **Files modified:** `docs/_glossary-android.md`
- **Commits:** 70248e2

**2. [Rule 2 - Missing] dm-crypt/LUKS encryption triple excluded from see-also pairs**
- **Found during:** Task 1 (collision matrix authoring)
- **Issue:** Plan seed list assumed BitLocker (Windows) and FileVault (macOS) would be H3 entries enabling a 3-way encryption triple. Direct inspection of `_glossary.md` and `_glossary-macos.md` confirmed neither has `### BitLocker` nor `### FileVault` as H3s — the Windows glossary covers Autopilot-specific terms only, not Windows-generic MDM settings.
- **Fix:** Excluded encryption triple from reciprocity pairs; dm-crypt already has prose references to BitLocker and FileVault in its blockquote — no see-also lines possible without target H3 anchors
- **Impact:** No see-also lines for dm-crypt or LUKS (Linux-only terms with prose cross-refs to non-H3 concepts)

**3. [Rule 2 - Addition] ADE ↔ ZTE reciprocity pair added**
- **Found during:** Task 1 (collision matrix authoring)
- **Issue:** Plan seed list listed "ADE" as macOS-only and "ZTE" as Android-only, but both have H3 entries and the existing Android `### Zero-Touch Enrollment` blockquote already mentions ADE — a clear reciprocal see-also opportunity
- **Fix:** Added ADE ↔ ZTE as an explicit reciprocity pair in the matrix; appended see-also to both `### ADE` (macOS → Android `#zero-touch-enrollment`) and `### Zero-Touch Enrollment` (Android → macOS `#ade` + Linux ZTE callout)

## Note for Plan 59-08 Validator

The locked collision matrix at `.planning/phases/59-hub-navigation-integration-linux-operations-sections/59-05-COLLISION-MATRIX.md` is the auditable input to V-59-20..23. The **Reciprocity Pairs** table lists all 40 bidirectional pairs as `(source_file, source_anchor, target_file, target_anchor)` tuples. The validator may machine-parse this table for assertion generation.

Key validator implementation notes:
- Android `### Supervision` uses `> **Android note:**` shape (not `> **Cross-platform note:**`) — validator A1 check must look for `> See also:` in this H3 region regardless of blockquote label
- Linux callout entries (`> **Linux note:**`) also carry see-also lines — same treatment
- COPE and WPCO entries now have the pre-existing internal link + new cross-platform see-also on the same `> See also:` line (semicolon-separated); validator must handle multi-target see-also lines

## Self-Check: PASSED

All 6 files exist (5 modified + 1 SUMMARY). All 6 task commits verified:
- 9b64ad8: feat(59-05) collision matrix artifact
- 18cee15: feat(59-05) macOS see-also (Task 2)
- 70248e2: feat(59-05) Android see-also (Task 3)
- 6a473c5: feat(59-05) Linux see-also (Task 4)
- 0150528: feat(59-05) Windows cross-platform blockquotes (Task 5)
- 27bafaf: chore(59-05) frontmatter + Version History (Task 6)
