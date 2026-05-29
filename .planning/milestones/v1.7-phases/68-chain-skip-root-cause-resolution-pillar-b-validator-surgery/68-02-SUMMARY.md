---
phase: 68-chain-skip-root-cause-resolution-pillar-b-validator-surgery
plan: 02
subsystem: validation
tags:
  - validation
  - archive-path-helper
  - sidecar-coord-rebase
  - self-test-lineage
  - chain-02
  - phase-68
  - pillar-b
  - validator-surgery
dependency-graph:
  requires:
    - "Phase 68 Plan 68-01 (commit 36a753d) — CHAIN-01 readFile CRLF centralization"
    - "Phase 66 Plan 66-02 (commit 3a9a671) — v1.6 sidecar BASELINE_10 +1-rebased coords"
  provides:
    - "scripts/validation/_lib/archive-path.mjs `resolveArchivedPhasePath()` helper (first _lib/ inhabitant)"
    - "5 validator call-sites now resolve archived-or-live paths via helper"
    - "regenerate-supervision-pins.mjs --self-test exits 0 (was FAIL)"
    - "v1.5-milestone-audit.mjs 12/12 PASS in fully-blocking mode (was 9/12)"
    - "check-phase-31 silent-swallow data-integrity bug CLOSED (V-31-21 + V-31-24 preserved via _missing discriminator marker)"
  affects:
    - "scripts/validation/check-phase-{31,48,60,62,63}.mjs — helper import + call-site replacements"
    - "scripts/validation/regenerate-supervision-pins.mjs — BASELINE_9 +1 banner shift + lineage repoint v1.5→v1.6"
    - "scripts/validation/v1.5-audit-allowlist.json — broad rebase across 4 array keys (17 entries +1 shifted)"
tech-stack:
  added:
    - "scripts/validation/_lib/ subdirectory (new shared-helper namespace)"
  patterns:
    - "Pure-fs caller-decides FAIL helper (returns string | null; never throws)"
    - "_missing discriminator marker extends existing _parseError discriminator at check-phase-31.mjs"
    - "Phase 62 carry-over reason-prefix pattern matches v1.6 sidecar verbatim"
key-files:
  created:
    - scripts/validation/_lib/archive-path.mjs
  modified:
    - scripts/validation/check-phase-31.mjs
    - scripts/validation/check-phase-48.mjs
    - scripts/validation/check-phase-60.mjs
    - scripts/validation/check-phase-62.mjs
    - scripts/validation/check-phase-63.mjs
    - scripts/validation/regenerate-supervision-pins.mjs
    - scripts/validation/v1.5-audit-allowlist.json
decisions:
  - "D-02 Option B helper at scripts/validation/_lib/archive-path.mjs — first inhabitant of _lib/ subdirectory; extended signature with `milestoneRoots = ['v1.5-phases']` default; backward-compatible single-arg form preferred"
  - "D-03 Option A-prime: BASELINE_9 _glossary-android.md coords {79,81,181,198}→{80,82,182,199} + parseAllowlist() repointed v1.5→v1.6 sidecar (tightens via lineage repoint, honors anti-tolerance directive at line 499)"
  - "D-04 §2.3 broad-rebase: v1.5-audit-allowlist.json supervision_exemptions[]+c7_knox_allowlist[]+safetynet_exemptions[]+c9_exemptions[] coords +1 shifted for _glossary-android.md entries (Phase 62-07 Apple Business banner attribution prefix matches v1.6 sidecar verbatim)"
  - "STRETCH per D-02 advisor + RESEARCH Open Q4: check-phase-31.mjs:32 silent-swallow data-integrity bug closed via `_missing` marker (extends existing `_parseError` discriminator pattern); V-31-21 + V-31-24 callers updated to FAIL on `_missing`; both checks continue to PASS"
metrics:
  duration_minutes: 35
  completed_date: "2026-05-26"
---

# Phase 68 Plan 68-02: Archive-path helper + self-test lineage repoint + v1.5 sidecar broad rebase (CHAIN-02) Summary

One-liner: shared `resolveArchivedPhasePath()` helper introduced in new `scripts/validation/_lib/` subdirectory replaces 5+ hardcoded archive-path call-sites across check-phase-{31,48,60,62,63}.mjs + regenerate-supervision-pins.mjs BASELINE_9 +1 banner shift + parseAllowlist() lineage repoint v1.5→v1.6 sidecar + v1.5-audit-allowlist.json broad coord-rebase across 4 array keys (17 _glossary-android.md entries +1 shifted) — single coordinated validator-surgery commit closing V-48-05 + V-60-08/10/12/23/24/25 + regenerate-supervision-pins.mjs --self-test + v1.5-milestone-audit.mjs C2/C7/C9 + check-phase-31 silent-swallow data-integrity bug.

## Commit

- **SHA:** captured by orchestrator post-commit (see git log)
- **Type:** `fix(validation)`
- **Files in commit:** 8 (1 new + 7 modified) — see staging list below

## Tasks Completed

1. **Task 68-02-01** — Single coordinated execution across 4 internal waves landing helper creation + call-site replacements + BASELINE_9/sidecar repoint + v1.5 sidecar broad rebase. ONE commit per CONTEXT D-04 `commit_strategy: single`.

## Pre-edit vs Post-edit Baselines

| Validator | Pre-edit | Post-edit | Closed |
|-----------|----------|-----------|--------|
| `regenerate-supervision-pins.mjs --self-test` | FAIL (4 false-neg + 7 false-pos + 1 un-pinned Tier-2 at :80) | PASS (Diff: identical / Un-pinned Tier-2 count: 0) | D-03 dogfood-test |
| `v1.5-milestone-audit.mjs` | 9/12 (C2+C7+C9 FAIL) | 12/12 PASS (fully-blocking) | V-60-23 cascade |
| `check-phase-48.mjs` | 5/7 PASS, 2 FAIL | 7/7 PASS | V-48-04 + V-48-05 |
| `check-phase-60.mjs` | 19/25 PASS, 6 FAIL | 25/25 PASS | V-60-08/10/12/23/24/25 |
| `check-phase-31.mjs` (V-31-21+V-31-24) | PASS (silent-swallow) | PASS (non-silent via _missing marker) | check-phase-31 silent-swallow bug CLOSED |
| `check-phase-62.mjs` | 28/34 PASS, 1 FAIL (V-62-ANCHORS), 5 SKIPPED | 29/34 PASS, 0 FAIL, 5 SKIPPED | V-62-ANCHORS via helper |
| `check-phase-63.mjs` | 25/32 PASS, 2 FAIL (V-63-ANCHOR-INVENTORY + V-63-CHAIN-62 cascade), 5 SKIPPED | 27/32 PASS, 0 FAIL, 5 SKIPPED | V-63-ANCHOR-INVENTORY + V-63-CHAIN-62 cascade |
| `v1.6-milestone-audit.mjs` | 15/15 PASS | 15/15 PASS | UNCHANGED baseline preserved |

## Helper file shape

```javascript
// scripts/validation/_lib/archive-path.mjs (NEW; 27 lines)
import { existsSync } from 'node:fs';
import { join } from 'node:path';

export function resolveArchivedPhasePath(phaseSuffix, milestoneRoots = ['v1.5-phases']) {
  const live = '.planning/phases/' + phaseSuffix;
  if (existsSync(join(process.cwd(), live))) return live;
  for (const root of milestoneRoots) {
    const archived = '.planning/milestones/' + root + '/' + phaseSuffix;
    if (existsSync(join(process.cwd(), archived))) return archived;
  }
  return null;
}
```

Pure-fs caller-decides-FAIL semantics. Returns string OR null; never throws. Backward-compatible single-arg form defaults to `['v1.5-phases']`; explicit `['v1.6-phases']` passed by check-phase-62/63 ANCHOR_INVENTORY consts; explicit `['v1.3-phases']` passed by check-phase-31 STRETCH parseInventory().

## Wave 2 — call-site replacements

| Validator | Line | Helper-arg signature |
|-----------|------|----------------------|
| check-phase-31.mjs:32 (STRETCH) | parseInventory() | `resolveArchivedPhasePath('31-ios-l2-investigation/placeholder-inventory.json', ['v1.3-phases'])` + `_missing` discriminator marker |
| check-phase-48.mjs:83 (V-48-05) | check 5 body | `resolveArchivedPhasePath('48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md')` |
| check-phase-60.mjs:30 (BROKEN_LINKS_INVENTORY) | const | same as above + V-60-08 + V-60-25 consumer null-handling guards |
| check-phase-60.mjs:32 (CALIBRATION_DOC) | const | `resolveArchivedPhasePath('60-audit-harness-v1-5-finalization/60-CALIBRATION.md')` + V-60-24 consumer null-handling guard |
| check-phase-62.mjs:41 (ANCHOR_INVENTORY) | const | `resolveArchivedPhasePath('62-apple-business-foundation-rebrand/62-ANCHOR-INVENTORY.md', ['v1.6-phases'])` + V-62-ANCHORS null-handling guard |
| check-phase-63.mjs:48 (ANCHOR_INVENTORY) | const | `resolveArchivedPhasePath('63-multi-ou-architecture-apple-admin-setup/63-ANCHOR-INVENTORY.md', ['v1.6-phases'])` + V-63-ANCHOR-INVENTORY null-handling guard |

Each validator received the import `import { resolveArchivedPhasePath } from './_lib/archive-path.mjs';` immediately after existing `node:fs` import block.

## Wave 3 — BASELINE_9 +1 banner shift + sidecar lineage repoint

| # | regenerate-supervision-pins.mjs Edit | BEFORE | AFTER |
|---|---|---|---|
| A | line 408 entry | `['docs/_glossary-android.md', 79]` | `['docs/_glossary-android.md', 80]` |
| B | line 409 entry | `['docs/_glossary-android.md', 81]` | `['docs/_glossary-android.md', 82]` |
| C | line 410 entry | `['docs/_glossary-android.md', 181]` | `['docs/_glossary-android.md', 182]` |
| D | line 411 entry | `['docs/_glossary-android.md', 198]` | `['docs/_glossary-android.md', 199]` |
| E | line 422 parseAllowlist arg | `'scripts/validation/v1.5-audit-allowlist.json'` | `'scripts/validation/v1.6-audit-allowlist.json'` |
| F | line 423 FAIL message | `v1.5-audit-allowlist.json` | `v1.6-audit-allowlist.json` |
| G | new BASELINE_9 attribution comment inserted AFTER line 406 BEFORE line 407 | (absent) | 7-line block dated 2026-05-26 / Phase 68 Plan 68-02 / +1 banner shift / v1.5→v1.6 lineage repoint / forward-pointer to Phase 70 HARNESS-02 |

V-60-09 substring assertion `/BASELINE_9 refreshed 2026-05-06 \(Phase 60 Plan 08\)/` at check-phase-60.mjs:170 continues to PASS because the existing 2026-05-06 attribution line is NOT removed; new 2026-05-26 attribution is ADDED below it.

## Wave 4 — v1.5-audit-allowlist.json broad rebase (per RESEARCH Open Q2 + advisor D-04 §2.3)

Diff-driven enumeration via `node -e` against v1.6 sidecar produced this exact rebase map:

| Array | Entries rebased | Coord shifts (v1.5 → v1.6) |
|-------|-----------------|----------------------------|
| `safetynet_exemptions[]` | 2 | 185→186, 200→201 |
| `supervision_exemptions[]` | 9 | 79→80, 81→82, 181→182, 198→199 (idx 0-3); 16→17, 49→50, 69→70, 82→83, 195→196 (idx 9-13) |
| `c7_knox_allowlist[]` | 5 | 121→122, 123→124, 123→124, 125→126, 197→198 (idx 5-9) |
| `c9_exemptions[]` | 1 | 202→203 (idx 1; this was the empirical C9 FAIL location) |
| `cope_banned_phrases[]` | 0 | regex-string array; no `_glossary-android.md` line refs to rebase |

**Total: 17 _glossary-android.md entries +1 shifted across 4 array keys.** Non-_glossary-android.md entries UNTOUCHED. Each `reason` field gains `Phase 62 carry-over: line N shifted +1 (Phase 62 Plan 62-07 added Apple Business banner line at line 13); ` prefix matching v1.6 sidecar verbatim (semicolon + space separator).

JSON parse guard `node -e "JSON.parse(require('fs').readFileSync('scripts/validation/v1.5-audit-allowlist.json','utf8'))"` returned `OK` after broad rebase landed.

## STRETCH outcome — check-phase-31.mjs silent-swallow data-integrity bug CLOSED

Per D-02 advisor §4.7 + RESEARCH Open Q4 contingency:

- **Pre-edit:** `parseInventory()` returned `{ placeholders: [] }` on missing file → V-31-21 + V-31-24 silently PASSED on empty array → data-integrity bug.
- **Post-edit:** `parseInventory()` routes through `resolveArchivedPhasePath('31-ios-l2-investigation/placeholder-inventory.json', ['v1.3-phases'])` → returns `{ _missing: true, placeholders: [] }` on resolution failure → V-31-21 + V-31-24 callers FAIL on `_missing` instead of silently passing.
- **Caller pattern:** mirrors existing `_parseError` discriminator pattern already in `parseInventory()` for JSON parse errors.
- **V-31-21 + V-31-24 status:** continue to PASS post-fix (helper resolves file at `.planning/milestones/v1.3-phases/31-ios-l2-investigation/placeholder-inventory.json`; placeholders[] populated; behavioral equivalence preserved).
- **Verification:** `node scripts/validation/check-phase-31.mjs 2>&1 | Select-String 'V-31-21|V-31-24'` → both PASS.
- **Closed permanently in this commit** — no further v1.8+ work (per D-02 advisor "bonus discovery").

## Pre-existing FAILs (out-of-scope per SCOPE BOUNDARY)

Not touched by this plan:

- `check-phase-31.mjs` V-31-23 (`06-compliance-policy.md` line 182 diff vs `expected-d23.txt`) + V-31-25 (`l2-template.md` platform enum) — pre-existing FAILs unrelated to Plan 68-02 surgery scope (`check-phase-31.mjs` exits 1 with these 2 FAILs but V-31-21 + V-31-24 PASS).
- `check-phase-61.mjs` V-61-01..04 (REQUIREMENTS.md Active-section boundary parse errors) — pre-existing FAILs unrelated to Plan 68-02 scope. V-61-19 + V-61-20 (MILESTONES.md cdcce23 garbage entry) ALSO remain FAIL — Plan 68-04 scope.

These are logged here for SUMMARY honesty; per `<scope_boundary>`, out-of-scope discoveries documented but NOT fixed in this plan.

## Cascade state post-Plan-68-02

- check-phase-60: 25/25 PASS (V-60-08/10/12/23/24/25 all closed via helper + sidecar rebase)
- check-phase-61: STILL FAILs V-61-19/V-61-20 (Plan 68-04 MILESTONES.md deletion fixes these; cdcce23 garbage entry) + 4 pre-existing REQUIREMENTS.md parse FAILs (out-of-scope)
- check-phase-62: 29/34 PASS, 0 FAIL, 5 SKIPPED (CHAIN_SKIP {48,51,58,60,61} still suppresses until Plan 68-03)
- check-phase-63: 27/32 PASS, 0 FAIL, 5 SKIPPED (CHAIN_SKIP same; V-63-CHAIN-62 now PASS because check-phase-62 exits 0)
- check-phase-64/65/66: still carry CHAIN_SKIP — Plan 68-03 ATOMIC removal target

## v1.6 sidecar UNCHANGED confirmation

`v1.6-milestone-audit.mjs` exits 0 with 15/15 PASS unchanged from pre-edit baseline. `scripts/validation/v1.6-audit-allowlist.json` NOT staged in this commit. T-68-02-AR mitigation verified.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] In-session file revert during validation run**

- **Found during:** Wave 4 verification phase
- **Issue:** A prior `git stash --include-untracked --keep-index` command (run during baseline-capture exploration) discarded all in-progress working-tree changes, reverting the helper file + all 6 source-file edits to pre-edit state mid-session.
- **Fix:** Re-applied all Wave 1-4 edits in identical order using fresh Edit/Write tool calls; re-verified all post-edit assertions PASS; final `git status --short scripts/validation/` shows exactly 7 modified + 1 untracked (`_lib/`) as expected.
- **Files modified:** ALL 8 plan-targeted files re-edited identically.
- **Tracked as deviation** for SUMMARY honesty; no behavioral change vs first-pass.

### Authentication Gates

None.

### Architectural Changes

None (Rule 4 not triggered).

## Self-Check: PASSED

- [x] scripts/validation/_lib/archive-path.mjs exists with exported `resolveArchivedPhasePath` function (signature verified via Node import)
- [x] check-phase-48.mjs exits 0 with 7/7 PASS (was 5/7)
- [x] check-phase-60.mjs exits 0 with 25/25 PASS (was 19/25)
- [x] check-phase-31.mjs V-31-21 + V-31-24 PASS preserved
- [x] check-phase-62.mjs exits 0 (V-62-ANCHORS PASS via helper)
- [x] check-phase-63.mjs exits 0 (V-63-ANCHOR-INVENTORY PASS via helper)
- [x] regenerate-supervision-pins.mjs --self-test exits 0 with "Diff: identical / Self-test: PASS"
- [x] v1.5-milestone-audit.mjs exits 0 with 12/12 PASS in fully-blocking mode
- [x] v1.6-milestone-audit.mjs exits 0 with 15/15 PASS (UNCHANGED baseline)
- [x] v1.5-audit-allowlist.json JSON parses cleanly (`node -e JSON.parse(...)` → OK)
- [x] git status shows exactly 7 modified + 1 untracked (`_lib/`) in scripts/validation/

## Wave 2 handoff (downstream)

- **Plan 68-03 (CHAIN-03 ATOMIC):** depends on Plan 68-02 + Plan 68-04 both landing first (chain must be cascade-green before CHAIN_SKIP removal). Plan 68-03 then strips `CHAIN_SKIP = new Set([48,51,58,60,61])` → `new Set([])` across check-phase-{62,63,64,65,66}.mjs in single atomic commit.
- **Plan 68-04 (MILESTONES.md):** file-disjoint from Plan 68-02; can run before or after Plan 68-02. Deletes MILESTONES.md lines 3-71 (cdcce23 garbage v1.5 entry).
- **Plan 68-05 (close-gate):** runs after 68-03 + 68-04 land; full chain re-run + 68-VERIFICATION.md + traceability flips. Plan 68-02 commit SHA captured for substitution as `{68_02_SHA}` in Plan 68-03's canonical CHAIN_SKIP comment block.
- **Phase 70 HARNESS-02 forward-pointer:** repoints `parseAllowlist()` to `v1.7-audit-allowlist.json` via 1-line edit (regenerate-supervision-pins.mjs:422). New BASELINE_9 attribution comment documents this.
- **Phase 70 HARNESS-03 forward-pointer:** Path-A copy of `check-phase-66.mjs` → `check-phase-{67..70}.mjs` will inherit `_lib/` helper reference by suffix-match. Auditor-independence preserved (filesystem-pure helper).
