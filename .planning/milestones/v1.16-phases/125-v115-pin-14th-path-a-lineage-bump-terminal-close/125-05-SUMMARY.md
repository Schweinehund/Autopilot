---
phase: 125-v115-pin-14th-path-a-lineage-bump-terminal-close
plan: 05
subsystem: testing
tags: [chain-validators, frozen-at-close, readAtV115Close, milestone-close, mermaid-drift, gha-cascade]

# Dependency graph
requires:
  - phase: 125-04
    provides: "Axis-2 GHA CASCADE-RED verdict + Class-A worklist (check-phase-51/92/99 Phase-122 Mermaid-drift FAILs)"
  - phase: 125-03
    provides: "V115 pin ('29a3599') + readAtV115Close export in _lib/frozen-at-close.mjs (the helper this conversion consumes)"
provides:
  - "Class-A chain-health remediation: check-phase-51/92/99 drifted assertions converted to frozen-aware readAtV115Close reads"
  - "Authoritative apex check-phase-125 [48..124] greened (the 3 FAILs cleared) for the close-gate precondition"
affects: [125-06, 125-07, milestone-close, v1.16-MILESTONE-AUDIT]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Shape-1 frozen-aware conversion (readAtV115Close) mirroring v1.15's 652f48e for check-phase-50/52/65"
    - "Per-assertion frozen read: change ONLY the read source (live→frozen), never the expected needle/regex/count"

key-files:
  created:
    - .planning/phases/125-v115-pin-14th-path-a-lineage-bump-terminal-close/125-05-SUMMARY.md
  modified:
    - scripts/validation/check-phase-51.mjs
    - scripts/validation/check-phase-92.mjs
    - scripts/validation/check-phase-99.mjs

key-decisions:
  - "Fired on CASCADE RED (125-04): applied Shape-1 readAtV115Close conversion ONLY; Shapes 2 (ABAUDIT/C15) and 3 (NESTED-guard) not needed"
  - "NO value-masking — every expected needle/regex/count/threshold left UNCHANGED; only the read SOURCE moved live→frozen"
  - "NO frozen surface edited — only the 3 predecessor check-phase-NN.mjs validators (in-class D-00a maintenance)"
  - "CHAIN_SKIP left empty everywhere (92/99 keep new Set([]); 51 is a pre-chain validator with no CHAIN_SKIP)"
  - "Out-of-scope pre-existing fails (check-phase-30 l1-template.md sub-fail, check-phase-31) NOT touched"

patterns-established:
  - "Class-A-only remediation: convert exactly the assertions 125-04 reported RED, leave passing (live) sub-checks alone"

requirements-completed: []  # HARN-06 remains Pending until the close-gate (125-07); this slot is in-scope remediation toward it

# Metrics
duration: ~35min
completed: 2026-07-09
---

# Phase 125 Plan 05: Class-A Chain-Health Remediation Summary

**Converted the 3 Phase-122-drifted chain-validator assertions (check-phase-51 V-51-06..11, check-phase-92 V-92-CROSSLINK-E8, check-phase-99 V-99-CONTENT-N12/N13) to frozen-aware `readAtV115Close` reads — no value-mask, no frozen-surface edit, CHAIN_SKIP empty — greening the authoritative apex `check-phase-125 [48..124]`.**

## Gate Decision — CASCADE RED (fired)

Plan 125-04's authoritative Axis-2 GHA cascade came back **CASCADE RED** (PR #3 `phase-125-atom-2`→`master`, tip `4ab30e8`). This slot fired.

**Pre-remediation RED run IDs + tally (DISCARDED, recorded for honest accounting):**

- Authoritative apex: `check-phase-125` [48..124] = **76 PASS / 3 FAIL / 1 SKIP**.
- v1.16 authoritative workflow run: **`29055800797`** (conclusion `failure`).
- Base `Audit Harness Integrity` run: **`29055800813`** (conclusion `failure`); predecessor v1.5–v1.15 workflow runs `29055800786…853` all `failure` (the assembled-corpus cascade — the close PR is the first time the predecessor apexes see the retrofitted v1.16 corpus).
- Branch tip at RED: `4ab30e8` (PR #3); local `master` HEAD at remediation start: `d4f84d0`.

The 3 FAILs are **Class A** (Phase-122 Mermaid→text-equiv conversion drift) — the exact Shape-1 `readAtV115Close` set 125-01 pre-scoped:

| Validator | Failing assertion(s) | Drifted doc | RED symptom |
|-----------|----------------------|-------------|-------------|
| check-phase-51 | V-51-06 (+ tree-structure V-51-07/08/09/10/11) | docs/decision-trees/09-linux-triage.md | "No Mermaid block found" — Phase-122 removed the ```mermaid graph TD block |
| check-phase-92 | V-92-CROSSLINK-E8 | docs/decision-trees/06-macos-triage.md | cross-link needle `../l2-runbooks/30-macos-mdm-migration-failure.md` absent |
| check-phase-99 | V-99-CONTENT-N12, V-99-CONTENT-N13 | docs/decision-trees/06-macos-triage.md | `click MACR9` directive + click-target URL absent |

**Class B** (predecessor frozen milestone-audit harnesses vs retrofitted docs) is the repo's already-sanctioned **`ACCEPTED-STANDALONE-CI-RED-01`** condition (D-00a; v1.14/v1.15 precedent) — NOT remediated here; it is recorded later at the close-gate (125-07). Not touched by this plan.

## Remediation Applied — Shape 1 only (readAtV115Close)

Root cause: Phase-122 (v1.16) text-equiv-converted these decision-tree Mermaid diagrams to Routing-Verification tables, removing the ```mermaid / `graph TD` / `click` / cross-link syntax the predecessor validators assert. The v1.15 close (`V115 = 29a3599`) is the last state BEFORE that retrofit, where the asserted syntax is intact. Each drifted assertion now reads its Phase-N deliverable **as it was at the v1.15 close**, via `readAtV115Close` from `_lib/frozen-at-close.mjs`. This exactly mirrors v1.15's `652f48e` (which converted check-phase-50/52/65 reads live→`readAtV114Close`).

**Before → after read source per assertion:**

- **check-phase-51.mjs** — added `import { readAtV115Close }` + a `readTreeFrozen()` helper (`readAtV115Close(TREE)` in try/catch). V-51-06, V-51-07, V-51-08, V-51-09, V-51-10, V-51-11 changed from `readFile(TREE)` → `readTreeFrozen()`. File-existence/frontmatter checks V-51-01..05 and all runbook checks V-51-12..25 **left LIVE** (they pass on HEAD). Frozen doc confirmed to contain: ```mermaid, `graph TD`, `LIN1{`, 4 `click` directives to runbooks 30-33, PITFALL-2 + web-app CA + Edge-for-Linux, `escalateL2`, CA deep-link `linux-capability-matrix.md#conditional-access`, and the "Don't know" edge.
- **check-phase-92.mjs** — added `import { readAtV115Close }`; flagged only the E8 nav-edge with `frozenV115: true`; the per-edge `run()` now reads `readAtV115Close(e.file)` for frozenV115 edges and `readFile(e.file)` for all others. Edges E1..E7 **left LIVE** (they pass on HEAD). Needle `../l2-runbooks/30-macos-mdm-migration-failure.md` confirmed present at frozen 06-macos-triage.md.
- **check-phase-99.mjs** — added `import { readAtV115Close }` + a `read06Frozen()` helper (`readAtV115Close(DELIVERABLE_06)` in try/catch). V-99-CONTENT-N12 (`click MACR9`) and V-99-CONTENT-N13 (`../l1-runbooks/37-macos-local-password-reset.md`) changed from `readFile(DELIVERABLE_06)` → `read06Frozen()`. N11 (`MACR9`), N14 (`Runbook 37`) and PRESENCE-06 **left LIVE** — those tokens survive the text-equiv conversion and pass on HEAD. Both frozen needles confirmed present at frozen 06-macos-triage.md.

## Constraint Attestation

**NO value-masking; NO frozen surface edited; CHAIN_SKIP left empty.**

- **NO value-mask:** `git diff` shows every deleted line is either a read-source swap (`readFile(...)` → frozen helper) or a cosmetic failure-detail string (`'... missing'` → `'... missing (frozen V115 read failed)'`). No expected regex, needle, count, or threshold was changed. Every assertion that asserted a token EXISTS still asserts it EXISTS — only the document it reads moved live→frozen. (Verified: `git diff | grep '^-'` yields only read-source/detail lines.)
- **NO frozen surface edited:** only the 3 predecessor `check-phase-NN.mjs` validators changed (`git diff --stat`: 51/92/99, 3 files, +49/-12). No `v1.N-milestone-audit.mjs`, no `*-audit-allowlist.json` sidecar, no `.github/workflows/*.yml` touched.
- **CHAIN_SKIP empty:** check-phase-92 and check-phase-99 keep `const CHAIN_SKIP = new Set([]);` (V-92-SELF / V-99-SELF still assert size 0 → PASS). check-phase-51 is a pre-chain per-phase validator with no CHAIN_SKIP/SELF construct; none was added.
- **Out-of-scope untouched:** check-phase-30's `l1-template.md` sub-fail and check-phase-31 (0 commits since V115, not v1.16-driven) were not touched.

## Local Verification (NESTED mode — Windows apex deep-nest avoided)

```
CHECK_PHASE_NESTED=1 node scripts/validation/check-phase-51.mjs  → exit 0 (Summary: 25 passed, 0 failed, 0 skipped)
CHECK_PHASE_NESTED=1 node scripts/validation/check-phase-92.mjs  → exit 0 (Result: 9 PASS, 0 FAIL, 0 SKIPPED)
CHECK_PHASE_NESTED=1 node scripts/validation/check-phase-99.mjs  → exit 0 (Result: 23 PASS, 0 FAIL, 0 SKIPPED)
```

## Task Commits

1. **Class-A chain-health remediation (check-phase-51/92/99 → readAtV115Close)** — `ce62fe5` (fix)

**Plan metadata:** `{{META_COMMIT}}` (docs: complete plan)

## Files Modified

- `scripts/validation/check-phase-51.mjs` — import readAtV115Close + readTreeFrozen() helper; V-51-06..11 read frozen 09-linux-triage.md
- `scripts/validation/check-phase-92.mjs` — import readAtV115Close; E8 flagged frozenV115; per-edge reader branch
- `scripts/validation/check-phase-99.mjs` — import readAtV115Close + read06Frozen() helper; V-99-N12/N13 read frozen 06-macos-triage.md

## Decisions Made

- Applied Shape-1 (readAtV115Close) only; Shapes 2 (ABAUDIT/C15) and 3 (NESTED-guard) were not tripped by the 125-04 verdict.
- Converted exactly the assertions 125-04 reported RED; left the passing (live) sub-checks in each validator alone (Class-A-only discipline).

## Deviations from Plan

None - plan executed exactly as written. The plan's `files_modified` frontmatter was an explicit PLACEHOLDER superset; the actual edited set (51/92/99) is the 125-04 CASCADE-RED worklist, exactly as the plan directed.

## Issues Encountered

None. All three frozen reads confirmed (via `git show 29a3599:<path>`) to contain the asserted needles before conversion; all three validators exit 0 in NESTED mode after conversion.

## Next Phase Readiness

- Re-pushed to `phase-125-atom-2`; **awaiting the fresh Axis-2 GHA apex verdict is the orchestrator's next step** (do NOT block on CI here). The fresh cascade run IDs will be recorded by the orchestrator / close-gate; a shared frozen-aware conversion greens every recursing apex at once.
- Class B (`ACCEPTED-STANDALONE-CI-RED-01`) is recorded at the close-gate (125-07), NOT here.
- HARN-06 remains Pending until the single close-gate commit (125-07) flips all 14 requirements.

## Self-Check: PASSED

- FOUND: `.planning/phases/125-.../125-05-SUMMARY.md`
- FOUND commit: `ce62fe5` (fix)
- Pushed tip `origin/phase-125-atom-2` = `ce62fe5` (matches local HEAD)
- Needle strings intact post-conversion (no value-mask): 99 → 27 matches, 92 → 4, 51 → 4
- All 3 validators exit 0 in NESTED mode

---
*Phase: 125-v115-pin-14th-path-a-lineage-bump-terminal-close*
*Completed: 2026-07-09*
