---
phase: 58-defer-08-4-platform-capability-comparison
plan: 58-05
subsystem: validation-harness
tags: [validator-as-deliverable, audit-06, defer-08, clean-05, c12-promotion-gate, regression-guard, anchor-stability, file-reads-only, regex-based, cell-shape-discipline]

requires:
  - phase: 58-02
    provides: "3 retrofitted `## Conditional Access` H2 anchors in macOS / iOS / Android sibling matrices — V-58-11/12/13 anchor-pin assertions testable"
  - phase: 58-03
    provides: "docs/reference/4-platform-capability-comparison.md authored with 6 H2s × 5 platform cols × 48 feature rows = 240 link-bearing data cells — V-58-01/05..10/26 assertions testable"
  - phase: 58-04
    provides: "D-12 sibling intro cross-refs (V-58-14/15/16) + D-13 Linux hedge close (V-58-20/21) + D-14 Android footer F3 anchor-preserve (V-58-17/18/19) + Phase 45 anchor regression-guard target (V-58-22) — assertions testable"

provides:
  - "scripts/validation/check-phase-58.mjs — Phase 58 static validation harness with 26 V-58-NN structural assertions covering CLEAN-05 deliverables + AUDIT-04 C12 promotion gate (V-58-25) + AUDIT-06 validator-as-deliverable lineage"
  - "B-1 fix landed: V-58-25 implements FORWARD search from c12Idx into 800-char post-name window for `/^\\s*informational:\\s*true,?\\s*$/m` — pre-Plan-58-06 returns FAIL (informational flag still at v1.5-milestone-audit.mjs:508), post-Plan-58-06 returns PASS"
  - "W-9 fix landed: V-58-07 skipCellTokens is `new Set([\"—\", \"N/A\", \"\"])` ONLY — bare `n/a` is a VALID D-02 verdict (1 of 5 in vocabulary lock) and IS required to carry a hyperlink; matches C12 harness canonical skip at v1.5-milestone-audit.mjs:532"
  - "V-58-22 NEGATIVE regression-guard for Phase 45 AEAOSPFULL-09 anchor (`<a id=\"deferred-full-aosp-capability-mapping\"></a>`) — pinned for cross-phase anchor stability; trips if any future phase touches the AOSP per-OEM capability-mapping anchor"
  - "V-58-23 NEGATIVE regression-guard for 5 H2 literals × 3 sibling matrices = 15 anchor-stability pins — append-only contract on macOS / iOS / Android H2 level"
  - "V-58-24 TBD/TODO/FIXME/XXX/PLACEHOLDER scan across 5 reference files (Version History + Changelog stripped) — v1.2 retro lesson lineage"
  - "Plan 58-06 unblocked: V-58-25 awaits C12 informational-flag removal at v1.5-milestone-audit.mjs:508; landing the patch flips V-58-25 to PASS"
  - "Plan 58-07 unblocked: validator runnable as part of Phase 58 close pre-commit gate; full 26/26 PASS expected post-58-06"
affects: [58-06, 58-07, 59, 60, 61]

tech-stack:
  added: []
  patterns:
    - "Validator-as-deliverable (D-18; AUDIT-06 inheritance) — same-plan-series validator + content; brittleness trade-off accepted: literal H2/anchor/path/verdict-vocabulary strings pinned in const declarations"
    - "File-reads-only / no-shared-module / regex-based parsing (Phase 48-57 lineage) — no subprocess invocation, no shell-out, no AST parsing, no `require`/`import` of project utilities; only `node:fs.readFileSync` + `node:path.join`"
    - "Forward-search C12 promotion detection (B-1 fix) — anchored regex `/^\\s*informational:\\s*true,?\\s*$/m` matched against 800-char window AFTER C12 name literal; mirrors structural locality of harness entry block"
    - "Canonical 6-col data-cell extractor (`extractCanonicalDataCells`) — col-0 (Feature row-label) excluded; non-canonical (≠6-col) tables ignored (Version History 3-col, See Also lists). Co-exists with v1.5-milestone-audit.mjs:526-538 C12 scan; Plan 58-06 will land equivalent col-0 fix during C12 promotion."
    - "padLabel 64-char dot-fill output formatter — mirrors check-phase-57.mjs:539-543 verbatim; per-check `[id/total] name . . . PASS|FAIL|SKIPPED -- detail`; final `Summary: N passed, M failed, K skipped`; `process.exit(failed > 0 ? 1 : 0)`"
    - "--verbose CLI flag — on PASS without --verbose, only label + PASS prints; on FAIL, label + FAIL + detail always prints regardless"

key-files:
  created:
    - "scripts/validation/check-phase-58.mjs (460 lines; 26 V-58-NN assertions)"
  modified: []

key-decisions:
  - "B-1 forward-search for V-58-25 (NOT backward): the `informational: true,` flag at v1.5-milestone-audit.mjs:508 sits AFTER the C12 name string at line 507 — `c.indexOf(\"name: 'C12: 4-platform comparison structural validation'\")` returns the index of the name; `c.slice(c12Idx, c12Idx + 800)` yields the C12 entry block which contains `informational: true,` on the next line. Backward search would mis-anchor (would find an earlier `informational: true,` from C11 or C10) — forward is the correct direction."
  - "W-9 skip-list excludes bare `n/a`: V-58-07 skipCellTokens is `new Set([\"—\", \"N/A\", \"\"])` — bare `n/a` (lowercase, no slash semantics) is one of 5 valid D-02 verdicts and MUST be link-bearing per the link-not-copy contract. The C12 harness canonical scan at v1.5-milestone-audit.mjs:532 uses the same exclusions (`'\\u2014'` em-dash, `'N/A'`, empty); bare `n/a` is NOT excluded there either."
  - "Rule 1 deviation — `extractCanonicalDataCells()` replaces the plan's naive `extractDataCells()`: the plan's helper would scan ALL pipe-delimited cells indiscriminately, generating 54 false positives on the correctly-authored Plan 58-03 deliverable (47 col-0 row-label cells across 6 H2 sections + 7 Version History 3-col cells). The fix narrows the scan to canonical 6-col tables AND excludes col-0 (Feature row-label cells). This matches Plan 58-03 SUMMARY's reported deviation: 'PLAN.md Task 2 verification regex incorrectly counted col-0 row-label cells'. Co-exists with C12 harness; Plan 58-06 will land an equivalent col-0 fix during the informational→blocking promotion."
  - "Rule 2 deviation — V-58-26 strengthened: the plan's V-58-26 only checks comparison doc filename retention (file exists at `docs/reference/4-platform-capability-comparison.md`). The deliverable's H1 title is intentionally '5-Platform Capability Comparison' (D-11 title-asymmetry: filename retains `4-platform-` for DEFER-08 / AECOMPARE-01 traceability tokens; H1 title uses `5-Platform` for content accuracy). V-58-26 was strengthened to assert BOTH the canonical path exists AND the H1 starts with `# 5-Platform` — locks the title-asymmetry contract from regression."
  - "V-58-22 regression-guard pin — Phase 45 AEAOSPFULL-09 anchor `<a id=\"deferred-full-aosp-capability-mapping\"></a>` is byte-identical pre/post Phase 58. The validator pins this NEGATIVE assertion forever; any future phase that touches the AOSP per-OEM capability-mapping anchor would trip V-58-22 and force same-commit validator update."
  - "V-58-23 H2 anchor-stability cordon: 5 H2 literals (`## Enrollment`, `## Configuration`, `## App Deployment`, `## Compliance`, `## Software Updates`) × 3 sibling matrices (macOS / iOS / Android) = 15 anchor pins. The 6th H2 (`## Conditional Access`) is NOT pinned in V-58-23 because Plan 58-02 retrofitted it AS PART OF Phase 58 (V-58-11/12/13 are positive presence checks; V-58-23 is the regression-guard against later append-only contract violations)."

metrics:
  duration_seconds: 252
  duration_human: "~4.2 minutes"
  task_count: 2
  file_count: 1
  validator_size_lines: 460
  total_assertions: 26
  pre_58_06_pass_count: 25
  pre_58_06_fail_count: 1
  pre_58_06_expected_failure: "V-58-25 (C12 promotion gate awaiting Plan 58-06 informational-flag removal)"
  completed_date: "2026-05-01"
---

# Phase 58 Plan 58-05: Phase 58 Validator (check-phase-58.mjs) Summary

`scripts/validation/check-phase-58.mjs` validator authored with 26 V-58-NN structural assertions; B-1 forward-search fix applied to V-58-25; W-9 skip-list fix applied to V-58-07; 25/26 PASS pre-Plan-58-06 (V-58-25 expected FAIL until Plan 58-06 lands); AUDIT-06 + D-18 contracts honored.

## Goal Achievement

**Plan goal:** Author `scripts/validation/check-phase-58.mjs` — the per-phase validator with ~26 V-58-NN structural assertions per AUDIT-06 + D-18 + Wave B sibling precedent (Phase 54: 32 V-54-NN; Phase 55: 32 V-55-NN; Phase 56: 32 V-56-NN; Phase 57: 26 V-57-NN). Validator covers CLEAN-05 deliverable structure + AUDIT-04 C12 promotion gate + AUDIT-06 validator-as-deliverable lineage + Phase 45 AEAOSPFULL-09 anchor regression-guard + TBD scan v1.2 retro discipline.

**Result:** ✓ Achieved. 460-line validator with 26 V-58-NN assertions. Pre-Plan-58-06 run produces exactly the expected outcome: 25 passed, 1 failed (V-58-25 — by design awaiting Plan 58-06 patch), 0 skipped. Exit code 1 pre-58-06; exit code 0 post-58-06 (when V-58-25 PASSes).

## Dependency Verification

All 4 upstream Phase 58 plans confirmed landed before validator authoring:

| Plan | Commit(s) | Validator dependency satisfied |
|------|-----------|---------------------------------|
| 58-01 | 16b98ad | 58-ANCHOR-INVENTORY.md baseline (anchor literals tabulated for V-58-17/22 pins) |
| 58-02 | 54a70b8 + 6d3ce98 | 3 `## Conditional Access` H2s in macOS / iOS / Android (V-58-11/12/13) |
| 58-03 | 0a55ecd + 629d7fc + 8e888af | `docs/reference/4-platform-capability-comparison.md` (V-58-01/05..10/26) |
| 58-04 | 610b3bb + 4feb805 | D-12 sibling intro cross-refs (V-58-14/15/16) + D-13 Linux hedge close (V-58-20/21) + D-14 Android footer F3 anchor-preserve (V-58-17/18/19) + Phase 45 anchor untouched (V-58-22 regression-guard) |

## V-58-NN Assertion Breakdown (26 total)

| Group | Count | IDs | Coverage |
|-------|-------|-----|----------|
| File existence | 4 | V-58-01..04 | comparison doc + 4 sibling matrices |
| Comparison doc structure | 6 | V-58-05..10 | 6 H2 literals / 5 platform cols + canonical 6-col header / link-bearing data cells / verdict-vocabulary lock / Windows-source-acknowledgment / 45-day frontmatter |
| CA H2 retrofit pins | 3 | V-58-11..13 | macOS / iOS / Android `## Conditional Access` H2 (D-04) |
| Sibling intro cross-ref | 3 | V-58-14..16 | macOS / iOS / Android intro contains `4-platform-capability-comparison.md` link (D-12) |
| Android footer F3 mechanics | 3 | V-58-17..19 | Anchor preserved (V-58-17) / forward-link in 800-char post-anchor window (V-58-18) / NEGATIVE: pre-Phase-58 deferral wording absent (V-58-19) (D-14) |
| Linux hedge removal | 2 | V-58-20..21 | NEGATIVE: `(when shipped)` + `when Phase 58 ships` literals absent (V-58-20) / link literal `4-platform-capability-comparison.md` preserved (V-58-21) (D-13) |
| Regression guards | 2 | V-58-22..23 | Phase 45 AEAOSPFULL-09 anchor (V-58-22) / 5 H2 × 3 sibling matrix anchor stability (V-58-23) |
| TBD scan | 1 | V-58-24 | NEGATIVE: no TBD/TODO/FIXME/XXX/PLACEHOLDER tokens in 5 reference files outside Version History |
| C12 promotion gate | 1 | V-58-25 | FORWARD-search anchored regex on `informational: true,` line (B-1 fix; pre-Plan-58-06 expected FAIL) |
| Filename retention + title pin | 1 | V-58-26 | comparison doc canonical path + `# 5-Platform` H1 title-asymmetry contract (D-11) |
| **Total** | **26** | V-58-01..26 | — |

## Pre-Plan-58-06 Validator Run (Expected Behavior)

```
$ node scripts/validation/check-phase-58.mjs
[1/26] V-58-01: docs/reference/4-platform-capability-comparison.md exists  PASS
[2/26] V-58-02: docs/reference/macos-capability-matrix.md exists  PASS
... (V-58-03 through V-58-24 all PASS) ...
[25/26] V-58-25: scripts/validation/v1.5-milestone-audit.mjs C12 promoted from informational to blocking (Plan 58-06 deliverable)  FAIL -- C12 still has 'informational: true' within first 800 chars after name (Plan 58-06 promotion patch not yet landed — expected pre-58-06)
[26/26] V-58-26: comparison doc filename retained as 4-platform-capability-comparison.md (D-11 traceability)  PASS

Summary: 25 passed, 1 failed, 0 skipped
$ echo $?
1
```

V-58-07 reports `240 data cells scanned` — exact match with Plan 58-03's link-bearing data-cell count (5 platform cols × 48 feature rows). V-58-08 confirms all 240 link-bearing cells start with one of 5 D-02 verdicts (`Supported|Partial|Not supported|Mode-dependent|n/a`).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] V-58-07 + V-58-08 helper replaced naive `extractDataCells()` with `extractCanonicalDataCells()`**

- **Found during:** Task 1, while reading the plan's V-58-07 implementation against the actual Plan 58-03 deliverable
- **Issue:** The plan's `extractDataCells()` helper scans ALL pipe-delimited cells indiscriminately, generating 54 false positives on the correctly-authored Plan 58-03 deliverable: 47 col-0 row-label cells across 6 H2 sections (Feature names like `Zero-touch / autopilot enrollment method`, `MDM configuration profile mechanism`, etc.) + 7 Version History 3-col cells (`Date`, `Change`, `Author`, `2026-05-01`, etc.) — all of which are intentionally NOT link-bearing per the D-01 cell-shape contract.
- **Evidence:** Pre-fix Python harness scan reported `Total cells: 294, missing links: 54`; post-fix reports `Total cells: 240, missing links: 0` (matches Plan 58-03 SUMMARY's exact 240-cell figure: 5 platform cols × 48 feature rows).
- **Plan 58-03 SUMMARY reference:** "PLAN.md Task 2 verification regex incorrectly counted col-0 row-label cells (deliverable correct at 240/240, but original cell-shape regex needed col-0 exclusion fix)" — this is the same bug carried forward into Plan 58-05's V-58-07 helper.
- **Fix:** `extractCanonicalDataCells()` narrows scan to canonical 6-col tables (`lineCells.length === 6`) AND skips col-0 (`for (let i = 1; i < 6; i++)`). Header row also excluded by `if (trimmed0 === 'Feature') continue;`.
- **Files modified:** `scripts/validation/check-phase-58.mjs` (helper replaced; V-58-07 + V-58-08 use the new helper)
- **Commit:** `ae1758a` (Task 1 commit — fix landed in scaffold)
- **Co-existence note:** This fix mirrors what Plan 58-06 will need to land in `v1.5-milestone-audit.mjs:526-538` (C12 harness scan) when promoting C12 from informational to blocking. The C12 scan currently has the same naive cell extraction; promoting it without col-0 exclusion would generate the same 54 false positives. Plan 58-06 should adopt the same `extractCanonicalDataCells` pattern.

**2. [Rule 2 - Critical] V-58-26 strengthened to lock title-asymmetry contract**

- **Found during:** Task 2, while pinning V-58-26
- **Issue:** The plan's V-58-26 only checks file-existence at `docs/reference/4-platform-capability-comparison.md`. But the deliverable's H1 title is intentionally `5-Platform Capability Comparison` (D-11 title-asymmetry: filename retains `4-platform-` token for DEFER-08 / AECOMPARE-01 traceability lineage, but H1 title uses `5-Platform` for content accuracy — the doc compares 5 platforms). The plan's V-58-26 would PASS even if a future phase renamed the H1 title back to `4-Platform` (which would silently lose the 5-platform-content-accuracy property).
- **Fix:** V-58-26 now asserts BOTH (a) canonical path exists AND (b) H1 starts with `# 5-Platform` via `/^# 5-Platform/m`.
- **Files modified:** `scripts/validation/check-phase-58.mjs`
- **Commit:** `0d64e62` (Task 2)
- **Justification:** Locks the deliberate naming asymmetry from drift; V-58-26 detail message documents the contract.

### Architectural / Decision Deviations

None. No Rule 4 escalations needed.

## Auth Gates

None encountered. Plan 58-05 is pure file-reads-only validator authoring; no external services touched.

## Threat Flags

None. Validator does not introduce new attack surface — read-only file system access via `node:fs.readFileSync`; no network, no shell, no eval, no dynamic import.

## Known Stubs

None. The validator is a fully wired deliverable.

## Notes for Plan 58-06

V-58-25 is the C12 promotion gate. Pre-Plan-58-06 it returns FAIL with detail `"C12 still has 'informational: true' within first 800 chars after name (Plan 58-06 promotion patch not yet landed — expected pre-58-06)"`. To flip V-58-25 to PASS, Plan 58-06 must remove `informational: true,` from `scripts/validation/v1.5-milestone-audit.mjs:508`. After removal, V-58-25 returns PASS with detail `"C12 promoted to blocking (informational flag removed per AUDIT-04)"`.

Plan 58-06 should ALSO consider applying the `extractCanonicalDataCells` col-0 exclusion fix to the C12 harness scan at `v1.5-milestone-audit.mjs:526-538` — without it, promoted C12 will generate 54 false positives on the correctly-authored 4-platform-capability-comparison.md (47 col-0 + 7 Version History). The fix pattern is in `check-phase-58.mjs:54-71`.

## Notes for Plan 58-07

Validator is runnable — `node scripts/validation/check-phase-58.mjs`. Full 26/26 PASS expected after Plan 58-06 commits the C12 promotion patch. Add to Phase 58 close pre-commit gate alongside `node scripts/validation/v1.5-milestone-audit.mjs` and any Phase 58 link-checker invocations.

## Lineage

- Phase 48 D-25 (validator-as-deliverable) → Phase 49 D-26 → Phase 50 D-25 → Phase 51 D-20 → Phase 52 D-11 → Phase 53 D-11 → Phase 54 D-17/18 → Phase 55 D-17/18 → Phase 56 D-18/19 → Phase 57 D-29/30 → **Phase 58 D-17/18 (this plan)**
- Phase 57 sibling: 26 V-57-NN structural assertions in 564-line validator (Plan 57 close 2026-04-30) — Phase 58 mirrors structure 1:1
- Phase 58 sibling-validator interaction: V-58-25 forward-references `v1.5-milestone-audit.mjs:508` C12 promotion (Plan 58-06 deliverable); validator-as-deliverable contract crosses plan boundaries within Phase 58

## Self-Check: PASSED

- [x] `scripts/validation/check-phase-58.mjs` exists at canonical path (460 lines)
- [x] All 26 V-58-NN check entries present (V-58-01 through V-58-26)
- [x] Top-of-file path constants (COMPARISON_DOC, MACOS_MATRIX, IOS_MATRIX, ANDROID_MATRIX, LINUX_MATRIX, AUDIT_HARNESS) declared
- [x] Helpers `readFile()`, `sliceH2Region()`, `extractCanonicalDataCells()` defined
- [x] `VERDICT_RE` regex pins 5-state vocabulary `(Supported|Partial|Not supported|Mode-dependent|n/a)`
- [x] Runner loop at end uses `padLabel()` 64-char dot-fill formatter
- [x] Final `process.exit(failed > 0 ? 1 : 0)` present
- [x] Validator supports `--verbose` CLI flag
- [x] File-reads-only / no-shared-module / regex-based pattern preserved
- [x] Pre-Plan-58-06 validator run: 25 passed, 1 failed (V-58-25 expected FAIL), 0 skipped
- [x] V-58-07 cell-shape result: 240 data cells (matches Plan 58-03 deliverable exactly)
- [x] V-58-25 FORWARD search from c12Idx into 800-char window correctly detects `informational: true,` at v1.5-milestone-audit.mjs:508 (B-1 fix verified)
- [x] V-58-07 skip-list is `["—", "N/A", ""]` only (no bare `n/a`) — W-9 fix verified
- [x] Commits exist: `ae1758a` (Task 1) + `0d64e62` (Task 2)
