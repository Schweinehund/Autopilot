---
phase: 139-governance-carve-fetch-depth-retrofit-shallow-job-repair
plan: 01
subsystem: infra
tags: [ci-governance, git-plumbing, stop-hook, allowlist, gsd-planning-docs]

requires: []
provides:
  - "v1.20-CARVE.md: single narrative+allowlist authorization artifact for every frozen-surface edit in Phases 139-144"
  - "carve-gate.mjs: diff-based byte-unchanged gate (git diff --name-status + git status --untracked-files=all, glob partition, D-09 amendment check)"
  - "v1.20-carve-gate.cjs Stop-hook: read-only nudge-then-warn enforcement, registered in .claude/settings.local.json"
  - "v1.20-GOV-02-LEDGER.md: append-only row-per-edit evidence ledger, first row recorded"
  - "ROADMAP.md/REQUIREMENTS.md amended to the ratified D-13/D-14/D-24/D-30/D-33 scope, requirement count 27 -> 28"
affects: [140-frozen-aware-harness-conversion, 141-standalone-red-validator-set, 142-archival-path-fix, 143-link-coverage, 144-terminal-close]

actuals:
  tokens: 33000
  tasks: 3
  commits: 3

tech-stack:
  added: []
  patterns:
    - "Glob-to-RegExp translation without a dependency: escape metachars, then map ** -> .*, * -> [^/]*, anchored both ends"
    - "D-09 genesis-commit exemption: a commit/working-tree state that CREATES a file (status 'A' / untracked '??') is not an amendment to it -- only a commit that touches an ALREADY-EXISTING authorization file together with an in-scope path is a D-09 violation"
    - "Stop-hook nudge-then-warn keyed by sha1(sorted off-list set) in a gitignored .claude/tmp/ scratch counter, so a repeat fire for an unchanged violation set escalates from nudge to warn"

key-files:
  created:
    - .planning/milestones/v1.20-CARVE.md
    - scripts/validation/carve-gate.mjs
    - .claude/hooks/v1.20-carve-gate.cjs
    - .planning/milestones/v1.20-GOV-02-LEDGER.md
  modified:
    - .planning/ROADMAP.md
    - .planning/REQUIREMENTS.md
    - .claude/settings.local.json (gitignored -- registration only, not committed)
    - .gitignore

key-decisions:
  - "D-09's amendment-procedure check needed a genesis-commit exemption not spelled out in the plan text: the plan's own Task 1 instructs landing the CARVE + gate + ledger in ONE commit, which would trip a literal 'CARVE touched together with an in-scope path' rule. Implemented via git show --name-status (not --name-only) so the gate can tell a file's first-ever 'A' (added) status apart from a later modification -- only the latter, on an ALREADY-EXISTING CARVE, is a D-09 violation. Verified: the bootstrap commit passes; a synthetic later commit touching an existing CARVE + carve-gate.mjs together would fail (not tested live to avoid polluting history, but the status-based logic is symmetric with the working-tree check, which was exercised)."
  - "Pre-existing untracked graphify-skill cache output (docs/graphify-out/, ~380 generated JSON files, unrelated to this phase) was blocking carve-gate.mjs's own verification, since it sits under the docs/ in-scope prefix. Fixed via one .gitignore line (graphify-out/) -- Rule 3 blocking-issue fix, not a frozen-surface edit, so it required no CARVE authorization."
  - "The literal grep command in Task 2's acceptance criteria for the anchored VERSION_RE (`grep -cE \"\\^v\\?\\\\\\\\d\\+\"`) returns 0 even against its own model file (publish-bundle-gate.cjs) -- confirmed via direct testing, so it appears to be an over-escaped acceptance-criteria artifact, not a real requirement gap. Verified the underlying intent instead: grep -cF '^v?\\d+' matches both files, confirming the anchored regex is genuinely present and reused."

requirements-completed: [GOV-01, GOV-02]

coverage:
  - id: D1
    description: "v1.20-CARVE.md: single named artifact, narrative + fenced carve-allowlist block (32 patterns, 8 categories), spans Phases 139-144, records Phase 133 D-04 remains in force"
    requirement: "GOV-01"
    verification:
      - kind: unit
        ref: "node scripts/validation/carve-gate.mjs --self-test (empty-allowlist / missing-block assertions prove the CARVE's block is parseable and non-empty)"
        status: pass
      - kind: other
        ref: "grep -c carve-allowlist / pattern-count node -e check / audit-harness-* glob presence / ref: text presence -- all acceptance-criteria greps run and passed"
        status: pass
    human_judgment: false
  - id: D2
    description: "carve-gate.mjs: diff-based gate, exits 0 on the tree as committed, exits non-zero and names an off-list probe file, clears when removed"
    requirement: "GOV-01"
    verification:
      - kind: integration
        ref: "node scripts/validation/carve-gate.mjs (exit 0 post-commit) + live probe-file create/delete cycle (exit 1 naming the path, then exit 0)"
        status: pass
    human_judgment: false
  - id: D3
    description: "v1.20-carve-gate.cjs Stop-hook: allows on clean gate, nudges on first off-list fire, warns on repeat fire, fails open on malformed input; registered in .claude/settings.local.json"
    requirement: "GOV-01"
    verification:
      - kind: unit
        ref: "node .claude/hooks/v1.20-carve-gate.cjs --self-test (6/6 PASS)"
        status: pass
      - kind: integration
        ref: "echo '{}' | node hook (exit 0) and stop_hook_active early-allow (exit 0, no decision emitted) -- both run live"
        status: pass
    human_judgment: false
  - id: D4
    description: "v1.20-GOV-02-LEDGER.md: append-only schema, first row recorded for the ROADMAP/REQUIREMENTS grep-before-edit"
    requirement: "GOV-02"
    verification:
      - kind: other
        ref: "grep -c '| File | Grep command |' .planning/milestones/v1.20-GOV-02-LEDGER.md; row content names both files + check-phase-54.mjs"
        status: pass
    human_judgment: false
  - id: D5
    description: "ROADMAP.md/REQUIREMENTS.md amended to the D-13/D-14/D-24/D-30/D-33 ratified scope; check-phase-54.mjs (sole live reader) stays green; requirement count 27 -> 28"
    verification:
      - kind: integration
        ref: "node scripts/validation/check-phase-54.mjs (32/32 PASS)"
        status: pass
    human_judgment: false

duration: 16min
completed: 2026-08-05
status: complete
---

# Phase 139 Plan 01: Governance CARVE + carve-gate.mjs + Stop-hook + GOV-02 ledger + scope amendments Summary

**Diff-based byte-unchanged gate over a category-authored allowlist in `.planning/milestones/v1.20-CARVE.md`, enforced by a read-only nudge-then-warn Stop-hook, that governs every frozen-surface edit across Phases 139-144.**

## Performance

- **Duration:** 16 min
- **Started:** 2026-08-05T13:42:00Z
- **Completed:** 2026-08-05T13:58:00Z
- **Tasks:** 3
- **Files modified:** 8 (4 created, 4 modified; `.claude/settings.local.json` is gitignored and not committed)

## Accomplishments
- `v1.20-CARVE.md` authorizes every frozen-surface edit in Phases 139-144 by CATEGORY (32 glob patterns across 8 categories), records that Phase 133's D-04 (no close-SHA `ref:`) remains in force, and documents the amendment procedure, gate-failure disposition, and GOV-02 target-scoped grep procedure.
- `carve-gate.mjs` implements the diff-based gate exactly per D-06 (`--name-status` not `--name-only`, no `..HEAD`, plus untracked-file coverage), partitions changed in-scope paths on-list/off-list deterministically, and enforces D-09's amendment procedure with a genesis-commit exemption that lets the bootstrap commit land without self-violating.
- `.claude/hooks/v1.20-carve-gate.cjs` clones the `publish-bundle-gate.cjs` skeleton, spawns the gate read-only, and nudges-then-warns keyed by a hash of the off-list set; registered as the third Stop hook.
- ROADMAP.md and REQUIREMENTS.md amended to the four ratified scope corrections (D-13/D-14, D-24, D-30, D-33), with `check-phase-54.mjs` — the sole live reader of both files — re-verified green (32/32) after the edit.

## Task Commits

1. **Task 1: End-to-end governance slice — CARVE authorizes, gate enforces, ledger records** - `8d4235bf` (feat)
2. **Task 2: Stop-hook enforcement — nudge then warn, read-only, fail-open** - `d6b253d1` (feat)
3. **Task 3: Record the four scope amendments in ROADMAP.md and REQUIREMENTS.md** - `75a36846` (docs)

**Plan metadata:** (this commit, docs: complete plan)

## Files Created/Modified
- `.planning/milestones/v1.20-CARVE.md` - Narrative + fenced `carve-allowlist` block (32 patterns, 8 categories), authorization of record Phases 139-144
- `scripts/validation/carve-gate.mjs` - Diff-based gate; `--base`/`--json`/`--self-test` flags; not a chain validator (D-07)
- `.claude/hooks/v1.20-carve-gate.cjs` - Stop-hook, nudge-then-warn, fail-open, registered in gitignored `.claude/settings.local.json`
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` - Append-only evidence ledger, schema + first row
- `.planning/ROADMAP.md` - Phase 139 SC#2/#3/#4 re-worded, hard-constraint span 139-144, Phase 141 SWEEP-09 added, Phase 144 SC#4 count 27->28
- `.planning/REQUIREMENTS.md` - SWEEP-01/02/03 re-worded, new SWEEP-09 bullet, Traceability row, Coverage 27->28
- `.gitignore` - Added `graphify-out/` (unrelated pre-existing untracked debris blocking gate verification)

## Decisions Made
- D-09 amendment check needed a genesis-commit exemption (via `git show --name-status`'s `A` status / working-tree `??`) not explicit in the plan text, because Task 1's own instruction to land CARVE+gate+ledger in one commit would otherwise self-trip the literal "CARVE touched with an in-scope path" rule. This is the correct reading of D-09 ("the allowlist must never be AMENDED in the same commit as the edit it authorizes") — genesis is not amendment.
- Fixed pre-existing untracked `docs/graphify-out/` cache pollution (unrelated skill output, ~380 files) via one `.gitignore` line — a Rule 3 blocking-issue fix required to make `carve-gate.mjs`'s own verification pass; not a frozen-surface edit, no CARVE authorization needed.
- Verified the Task 2 acceptance-criteria's literal `VERSION_RE` grep command is itself over-escaped (returns 0 even against its own model file `publish-bundle-gate.cjs`); confirmed the underlying intent (anchored regex reuse) via an equivalent working grep instead of chasing the broken literal.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Ignored pre-existing untracked `graphify-out/` cache pollution**
- **Found during:** Task 1 (first `carve-gate.mjs` verification run)
- **Issue:** ~380 untracked JSON cache files under `docs/graphify-out/cache/semantic/` (unrelated graphify-skill session output, present before this task started) sit inside the gate's in-scope `docs/` prefix, making `carve-gate.mjs` report a D-09 violation and off-list hits unrelated to this plan's actual changes.
- **Fix:** Added `graphify-out/` to `.gitignore` (matches both `graphify-out/` at repo root and `docs/graphify-out/`).
- **Files modified:** `.gitignore`
- **Verification:** `node scripts/validation/carve-gate.mjs` exits 0 post-fix.
- **Committed in:** `8d4235bf` (Task 1 commit)

**2. [Rule 1 - Bug] Removed the `CHAIN_PHASES` literal from carve-gate.mjs's own header comment**
- **Found during:** Task 1 (acceptance-criteria grep check)
- **Issue:** The header comment documenting D-07 ("must never be added to any CHAIN_PHASES array") contained the literal string `CHAIN_PHASES`, which the plan's own acceptance criterion asserts must be absent from the file (`grep -c 'CHAIN_PHASES' == 0`) to make the "gate is never a chain member" claim mechanically checkable.
- **Fix:** Reworded the comment to describe the apex's chain-membership array without using the literal constant name.
- **Files modified:** `scripts/validation/carve-gate.mjs`
- **Verification:** `grep -c 'CHAIN_PHASES' scripts/validation/carve-gate.mjs` returns 0.
- **Committed in:** `8d4235bf` (Task 1 commit)

---

**Total deviations:** 2 auto-fixed (1 blocking pre-existing pollution, 1 self-referential-literal bug)
**Impact on plan:** Both fixes were required for the plan's own stated verification/acceptance criteria to pass; neither touches frozen surfaces or changes the governance design. No scope creep.

## Issues Encountered
None beyond the two auto-fixed items above.

## User Setup Required
None - no external service configuration required. Note: `.claude/settings.local.json`'s hook registration is machine-local (gitignored) per the existing repo convention for both prior Stop hooks — it does not travel with `git clone` and was not committed, matching Task 2's explicit instruction.

## Next Phase Readiness
- The CARVE + gate + hook + ledger are live; every subsequent Phase 139-144 plan that touches a frozen-surface path (`scripts/`, `.github/`, `docs/`, `.gitattributes`, `package.json`) must run `node scripts/validation/carve-gate.mjs` in its verification step and land any needed allowlist amendment as a separate, prior commit per D-09.
- Plan 02 (`_lib/frozen-at-close.mjs`: `lsTreeAtClose`, `frozenCause`, `--self-test`) is next per D-41 atom order (Wave 2, blocked on this plan's completion) and touches `scripts/validation/_lib/frozen-at-close.mjs`, which is already on-list (Category 4).
- No blockers.

---
*Phase: 139-governance-carve-fetch-depth-retrofit-shallow-job-repair*
*Completed: 2026-08-05*

## Self-Check: PASSED

All 5 created files verified present on disk; all 3 task commit hashes (`8d4235bf`, `d6b253d1`, `75a36846`) verified in `git log --oneline --all`.
