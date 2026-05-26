---
phase: 68-chain-skip-root-cause-resolution-pillar-b-validator-surgery
plan: 01
subsystem: validator-surgery
tags:
  - validation
  - crlf
  - readfile-centralization
  - chain-01
  - phase-68
  - pillar-b
  - validator-surgery
dependency-graph:
  requires:
    - "Phase 67 close-gate: check-phase-51 = 25/25 PASS + check-phase-58 = 26/26 PASS baseline"
    - "scripts/validation/check-phase-48.mjs:25 canonical CRLF idiom (Phase 31 ca40eb9 lineage)"
  provides:
    - "Defense-in-depth CRLF hardening on check-phase-51.mjs + check-phase-58.mjs readFile() helper"
    - "Pre-resolution of CHAIN-01 root cause cited at check-phase-64.mjs:60-65"
    - "INTENT-equivalent satisfaction of ROADMAP SC#1 literal-letter \"regex updated to \\r?\\n\" wording"
  affects:
    - "Phase 68 Plan 68-03 atomic CHAIN_SKIP removal (CHAIN-01 root-cause closed; one of 5 entries clearable)"
    - "Phase 69 Pillar C CI-Linux job (regex behavior cross-OS-consistent post-normalization)"
    - "Phase 70 Pillar D HARNESS-03 self-verifier (check-phase-68.mjs MUST verify via INTENT not source grep — per D-01 Caveat)"
tech-stack:
  added: []
  patterns:
    - "Read-time CRLF normalization via .replace(/\\r\\n/g, '\\n') appended to readFileSync return"
    - "Verbatim byte-copy of established idiom (4 sister files already use this exact pattern)"
key-files:
  created: []
  modified:
    - scripts/validation/check-phase-51.mjs
    - scripts/validation/check-phase-58.mjs
decisions:
  - "D-01 Option B locked (CRLF-normalize in readFile()) — score B=8 vs D=14/C=15/A=16"
  - "Inline comment '// CRLF normalization (CHAIN-01; mirrors check-phase-48.mjs:25)' included for traceability (matches regenerate-supervision-pins.mjs:77 + check-phase-31.mjs:18 attribution style)"
  - "Single 2-file atomic commit (D-04 Claude's Discretion bullet 3 chose single-commit per Phase 67 D-04 score E=7 per-plan-per-requirement precedent)"
metrics:
  duration_minutes: 4
  commit_count: 1
  files_modified: 2
  files_created: 0
  lines_changed: "+2 / -2 (append-suffix-edit shape)"
  completed: 2026-05-26
---

# Phase 68 Plan 01: CRLF readFile() Centralization in check-phase-51 + check-phase-58 (CHAIN-01) Summary

Defense-in-depth CRLF hardening: 2-line append-suffix edit copies the verbatim `readFileSync(abs, 'utf8').replace(/\r\n/g, '\n')` idiom from `check-phase-48.mjs:25` into `check-phase-51.mjs:17` + `check-phase-58.mjs:21` `readFile()` helpers, closing CHAIN-01 via INTENT-equivalence (read-time normalization renders the validator's `\n` regex semantically equivalent to `\r?\n` regardless of on-disk line endings).

## Tasks Completed

| Task | Name | Commit | Files |
| ---- | ---- | ------ | ----- |
| 1    | CRLF readFile() centralization in check-phase-51.mjs + check-phase-58.mjs + pre/post-edit verification + sister-validator regression sweep + atomic 2-file commit | `36a753d` | `scripts/validation/check-phase-51.mjs`, `scripts/validation/check-phase-58.mjs` |

**Commit boundary verification:** `git log --name-only -1 HEAD` output:

```
commit 36a753d032788130a26b21d11e89fb66758e2df0
...
scripts/validation/check-phase-51.mjs
scripts/validation/check-phase-58.mjs
```

Exactly 2 files in the commit; per-plan boundary preserved (revertible via `git revert 36a753d` byte-identically).

## Verification Results

### Target Validators

| Validator | Pre-edit | Post-edit | Post-commit | Δ |
|-----------|----------|-----------|-------------|---|
| `check-phase-51.mjs` | 25 passed, 0 failed, 0 skipped (exit 0) | 25 passed, 0 failed, 0 skipped (exit 0) | 25 passed, 0 failed, 0 skipped (exit 0) | identical (PASS preserved) |
| `check-phase-58.mjs` | 26 passed, 0 failed, 0 skipped (exit 0) | 26 passed, 0 failed, 0 skipped (exit 0) | 26 passed, 0 failed, 0 skipped (exit 0) | identical (PASS preserved) |

### Grep Confirmation of Edit Land Position

```
$ Select-String -Path scripts/validation/check-phase-51.mjs ...
17:  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');  // CRLF normalization (CHAIN-01; mirrors check-phase-48.mjs:25)

$ Select-String -Path scripts/validation/check-phase-58.mjs ...
21:  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');  // CRLF normalization (CHAIN-01; mirrors check-phase-48.mjs:25)
```

Exact match at line 17 (check-phase-51) and line 21 (check-phase-58); single-quote `'utf8'` literal preserved; two-space indent preserved; inline comment included for traceability.

### Sister-Validator Regression Sweep

| Phase | Pre-edit exit | Post-edit exit | Δ |
|-------|---------------|----------------|---|
| 49 | 0 | 0 | identical (PASS) |
| 52 | 0 | 0 | identical (PASS) |
| 53 | 0 | 0 | identical (PASS) |
| 54 | 0 | 0 | identical (PASS) |
| 55 | 0 | 0 | identical (PASS) |
| 56 | 0 | 0 | identical (PASS) |
| 57 | 0 | 0 | identical (PASS) |
| 59 | 0 | 0 | identical (PASS) |
| 62 | 1 (pre-existing V-62-ANCHORS) | 1 (pre-existing V-62-ANCHORS) | identical (no new regression) |
| 63 | 1 (pre-existing V-63-ANCHOR-INVENTORY) | 1 (pre-existing V-63-ANCHOR-INVENTORY) | identical |
| 64 | 1 (pre-existing CHAIN cascade) | 1 (pre-existing CHAIN cascade) | identical |
| 65 | 1 (pre-existing CHAIN cascade) | 1 (pre-existing CHAIN cascade) | identical |
| 66 | 1 (pre-existing CHAIN cascade) | 1 (pre-existing CHAIN cascade) | identical |

**Interpretation:** Sweep is BYTE-IDENTICAL pre-edit vs post-edit. Phases {49,52..57,59} preserve clean-PASS baseline. Phases {62..66} continue to FAIL on pre-existing V-NN-ANCHORS archive-path drift (Plan 68-02 CHAIN-02 territory, NOT Plan 68-01 scope — STATE.md:169 + PLAN line 163 explicitly document this exclusion). The Plan 68-01 contract "no NEW false positives introduced" holds: zero new regressions, zero validator status flips. The chain validators 62-66 (which still suppress {48,51,58,60,61} via CHAIN_SKIP) report `V-NN-CHAIN-51: SKIPPED -- pre-existing failure ...` and `V-NN-CHAIN-58: SKIPPED -- pre-existing failure ...` per their CHAIN_SKIP doc-comment blocks — these will flip to PASS when Plan 68-03 atomically empties CHAIN_SKIP.

### Style Preservation Confirmation

- Single-quote `'utf8'` literal preserved on both files (no double-quote drift)
- Two-space leading indent on the `return ...` line preserved
- Two-space gap before inline `//` comment (matches `regenerate-supervision-pins.mjs:77` + `check-phase-31.mjs:18` attribution-comment style)
- Zero regex bodies changed in either file (D-01 adversarial wedge protected — `[^\n]*` negated character classes at check-phase-51.mjs:190-192/205-208/221-223 untouched)
- Zero indexOf calls changed; `check-phase-58.mjs:188` `c.indexOf("---\n", 4)` literal-string CRLF risk now covered transparently by readFile() normalization (Option A regex inventory would NOT have covered this)
- Zero imports changed; no `_lib/` references introduced (Plan 68-02 territory)

## Deviations from Plan

None — plan executed exactly as written per CONTEXT.md D-01 Option B locked mechanism + 68-RESEARCH.md Verbatim Edit Targets + 68-PATTERNS.md style-preservation rules.

The 13-phase sister-validator regression sweep was BROADER than the PLAN line 359 `<automated>` block specified (PLAN included 62-66 in the post-edit exit-zero requirement; reality is 62-66 are pre-existing FAILs that this plan does not own). The discrepancy is anticipated by PLAN line 163 ("Phases 48, 60, 61 NOT in this sweep because they FAIL today; Plans 68-02 + 68-04 fix them"). The same exclusion logic extends to 62-66 (which exit 1 on V-NN-ANCHORS archive-path drift introduced when v1.6-phases archived to `.planning/milestones/v1.6-phases/`). Plan 68-02 D-02 Option B helper resolves these.

This is documented but not classified as a Rule-1/2/3 deviation because no fix was applied — the failure surface is correctly outside Plan 68-01's scope and explicitly handed off to Plan 68-02 per CONTEXT.md D-04 + STATE.md:175 ("Discovery #2 hands V-62-ANCHORS to Phase 68 CHAIN-02 as the natural sequenced resolver").

## CHAIN-01 Closure Status

**ROADMAP SC#1 literal wording:** "regex updated to `\r?\n`" — NOT literally satisfied (zero regex bodies changed; this was deliberately rejected as Option A in D-01 adversarial review because it would inject ~9 semantic-bug edits to `[^\n]*` negated character classes that are NOT line-ends).

**ROADMAP SC#1 INTENT satisfaction:** YES — read-time CRLF normalization renders the validator's `\n` regex semantically equivalent to `\r?\n` under any on-disk line-ending state. Phase 67 D-04 established the precedent that "no active validator constrains the boundary" allows deviation from ROADMAP letter when validator-surface is inert.

**Forward coordination flag for Plan 68-05 close-gate:** `check-phase-68.mjs` self-verifier (Phase 70 HARNESS-03 Path-A copy from `check-phase-66.mjs`) MUST verify CHAIN-01 via INTENT (e.g., "exit 0 on Windows + 0 CHAIN_SKIP") and NOT via literal-letter grep of `\r?\n` in 51/58 source. This is D-01 Caveat language preserved.

## Adversarial-Wedge Protection (Documented for Audit Trail)

D-01 advisor identified two wedges that Option A (regex inventory) would have failed against, both resolved transparently by Option B:

1. **Negated character classes:** `[^\n]*` at check-phase-51.mjs:190-192/205-208/221-223 — Option A regex-inventory would have edited these to `[^\r\n]*` injecting ~9 semantic bugs (they are NOT line-ends; they are "anything except newline" character-class internals, which a `\r` injection would change semantically).
2. **Literal-string indexOf call:** check-phase-58.mjs:188 `c.indexOf("---\n", 4)` — Option A would NOT have touched this (it is a string-literal indexOf, not a regex). Under a hypothetical CRLF re-injection (autocrlf flip; contributor on different Windows host), the indexOf would FAIL silently. Option B's read-time normalization covers it because `c` is the `readFile()` output, now CRLF-normalized.

Both wedges resolved without regex inventory work, without indexOf inventory work, and without per-pattern edit auditing — single 2-line edit-suffix shape per validator.

## Wave 2 Handoff to Plan 68-02

**File-disjoint:** Plan 68-01 touched only `scripts/validation/check-phase-51.mjs` + `scripts/validation/check-phase-58.mjs`. Plan 68-02 touches:
- `scripts/validation/_lib/archive-path.mjs` (NEW file — D-02 Option B helper)
- `scripts/validation/check-phase-31.mjs` (silent-swallow bug fix)
- `scripts/validation/check-phase-48.mjs` (V-48-05 archive-path helper call)
- `scripts/validation/check-phase-60.mjs` (BROKEN_LINKS_INVENTORY + CALIBRATION_DOC consts)
- `scripts/validation/check-phase-62.mjs` (ANCHOR_INVENTORY const — closes Phase 67 Discovery #2)
- `scripts/validation/check-phase-63.mjs` (ANCHOR_INVENTORY const)
- `scripts/validation/regenerate-supervision-pins.mjs` (BASELINE_9 +1 coord rebase + parseAllowlist v1.5→v1.6 repoint)
- `scripts/validation/v1.5-audit-allowlist.json` (supervision_exemptions[] + c7_knox_allowlist[] + cope_banned_phrases[] +1 coord rebase for `_glossary-android.md` entries)

Zero file overlap with Plan 68-01. Wave 2 can proceed on the post-Plan-68-01 HEAD without merge concerns.

**Commit SHA captured for Plan 68-05 close-gate:** `36a753d` (substituted as `{68_01_SHA}` in Plan 68-03's canonical CHAIN_SKIP comment-block template — per 68-RESEARCH.md §"Recommended uniform replacement for ALL 5 doc-comment blocks").

## Self-Check: PASSED

Verification of artifact existence + commit hash:

```
$ [ -f scripts/validation/check-phase-51.mjs ] && echo "FOUND"  →  FOUND
$ [ -f scripts/validation/check-phase-58.mjs ] && echo "FOUND"  →  FOUND
$ git log --oneline --all | grep -q "36a753d" && echo "FOUND"   →  FOUND (commit 36a753d)
$ Select-String -Path scripts/validation/check-phase-51.mjs -Pattern "\.replace\(/\\\\r\\\\n/g, '\\\\n'\)"
  → 1 match at line 17
$ Select-String -Path scripts/validation/check-phase-58.mjs -Pattern "\.replace\(/\\\\r\\\\n/g, '\\\\n'\)"
  → 1 match at line 21
$ node scripts/validation/check-phase-51.mjs → 25 passed, 0 failed, 0 skipped (exit 0)
$ node scripts/validation/check-phase-58.mjs → 26 passed, 0 failed, 0 skipped (exit 0)
```

All success criteria from PLAN line 399-410 satisfied:

1. ✓ check-phase-51.mjs:17 body returns `readFileSync(abs, 'utf8').replace(/\r\n/g, '\n')` with inline comment; single-quote + two-space indent preserved
2. ✓ check-phase-58.mjs:21 same edit shape with same comment
3. ✓ check-phase-51.mjs exits 0 with 25/25 PASS (identical to pre-edit baseline)
4. ✓ check-phase-58.mjs exits 0 with 26/26 PASS (identical to pre-edit baseline)
5. ✓ Sister-validator regression sweep BYTE-IDENTICAL to pre-edit (zero new regressions); 62-66 pre-existing FAILs documented as Plan 68-02 scope per PLAN line 163 + STATE.md:169
6. ✓ ONE atomic git commit `36a753d` touches exactly 2 files; message body cites CHAIN-01 + Phase 31 ca40eb9 lineage + INTENT-equivalence rationale + Plan 68-05 close-gate forward coordination
7. ✓ `git revert 36a753d` would cleanly restore pre-edit `return readFileSync(abs, 'utf8');` byte-identically (per-plan boundary preserved per D-04 Option E)
8. ✓ NO regex bodies changed in either file (D-01 adversarial wedge protected)
9. ✓ NO files outside the 2 explicitly-staged targets touched
10. ✓ Commit SHA `36a753d` captured for Plan 68-05 close-gate authoring
