---
phase: 144-v119-pin-18th-path-a-lineage-bump-terminal-close
plan: 08
subsystem: infra
tags: [github-actions, ci-workflow, path-a-lineage, harness-integrity]

# Dependency graph
requires:
  - phase: 144-v119-pin-18th-path-a-lineage-bump-terminal-close
    provides: "check-phase-139..144.mjs (Plans 04/05/07), v1.20-milestone-audit.mjs + v1.20-audit-allowlist.json (Plan 06)"
provides:
  - ".github/workflows/audit-harness-v1.20-integrity.yml — the 17th coexistence workflow"
  - "Both predecessor workflows (v1.7, v1.8) carry the corrected wall-clock estimate"
  - "A GOV-02 census row and a job-key-to-display-name table for Plan 10's evidence pass"
affects: [144-09, 144-10]

# Actuals (#2632)
actuals:
  tokens: 16573
  tasks: 3
  commits: 3

tech-stack:
  added: []
  patterns: ["Path-A copy with full literal re-derivation (D-16)", "dual-apex-per-milestone (never forward-duplicate the predecessor apex)"]

key-files:
  created:
    - .github/workflows/audit-harness-v1.20-integrity.yml
  modified:
    - .github/workflows/audit-harness-v1.7-integrity.yml
    - .github/workflows/audit-harness-v1.8-integrity.yml
    - .planning/milestones/v1.20-GOV-02-LEDGER.md
    - .planning/phases/144-v119-pin-18th-path-a-lineage-bump-terminal-close/144-EVIDENCE.md

key-decisions:
  - "Followed 144-PATTERNS.md's verbatim 'Full paths: filter to author' block (five entries) over PLAN.md's 'exactly six entries' acceptance criterion — the two documents disagree, and the concrete YAML block is the more detailed, directly-read design artifact; documented as a deviation with the arithmetic (four fixed entries + one milestones glob replacing v1.19's two milestone-specific entries = five, not six)."
  - "Removed the literal substrings 'v1.19' and 'check-phase-138' from the new workflow's header comments entirely (not just the functional code) to satisfy the zero-count-grep prohibitions, rephrasing as 'the immediately-prior milestone' / 'the predecessor milestone's apex validator'."

requirements-completed: [HARN-18]

coverage:
  - id: D1
    description: "The 17th coexistence workflow exists with every v1.19 literal re-derived: sidecar path (twice), path-match grep target, harness invocation, chain span notice, and the paths filter."
    requirement: "HARN-18"
    verification:
      - kind: other
        ref: "grep -c 'check-phase-138' / 'v1.19' both 0; grep -c 'check-phase-144' = 8; grep -c 'uses: actions/checkout' = grep -c 'fetch-depth: 0' = 13; path-match grep against v1.20-milestone-audit.mjs exits 0"
        status: pass
    human_judgment: false
  - id: D2
    description: "Both stale runtime-estimate sites (v1.7 line 96, v1.8 line 95) corrected to the already-measured 664,979 ms figure, in the same commit as the new workflow's authoring."
    requirement: "HARN-18"
    verification:
      - kind: other
        ref: "git diff --numstat both files = 1 added/1 deleted; git show --name-only HEAD | wc -l = 3"
        status: pass
    human_judgment: false
  - id: D3
    description: "GOV-02 census row landed before either predecessor workflow byte-changed; downstream validators pinning either edited path (check-phase-69, check-phase-70, check-phase-66) still exit 0 post-edit."
    requirement: "HARN-18"
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-69.mjs (31/0/0), check-phase-70.mjs (51/0/0), check-phase-66.mjs (28/0/0), all exit 0 pre- and post-edit"
        status: pass
    human_judgment: false

duration: 45min
completed: 2026-08-13
status: complete
---

# Phase 144 Plan 08: 17th CI Workflow + Stale-Figure Correction Summary

**Authored `audit-harness-v1.20-integrity.yml` (Path-A copy of v1.19 with every hardcoded literal re-derived: sidecar path, path-match grep, harness invocation, chain span, five-entry paths filter) and corrected the stale `~102s` wall-clock figure to the measured 664,979 ms in both the v1.7 and v1.8 predecessor workflows, same commit.**

## Performance

- **Duration:** 45 min
- **Started:** 2026-08-13T05:20:00Z (approx)
- **Completed:** 2026-08-13T06:10:05Z
- **Tasks:** 3
- **Files modified:** 5 (1 created, 4 modified)

## Accomplishments
- New 17th coexistence workflow with 13 jobs: `parse`, `path-match`, `harness-run`, `linux-chain-ubuntu-latest`, five leaf validators (`check-phase-139..143`), a standalone `check-phase-144` apex job, `rotting-external-quarterly`, `pin-helper-advisory`, and `frozen-read-probe` — every checkout born full-depth (13 checkout steps, 13 `fetch-depth: 0` settings).
- Both stale `~102s` wall-clock sites corrected in the same commit as the new workflow's authoring, using the already-measured 664,979 ms figure (no fresh measurement taken).
- GOV-02 census row landed before either predecessor workflow was touched, naming every validator that pins the two edited paths.
- Structural proof recorded: every job's script path exists and exits 0 locally; the path-match grep runs verbatim and exits 0; the job-key-to-display-name table is recorded for Plan 10.

## Task Commits

Each task was committed atomically:

1. **Task 1: GOV-02 census row for the two predecessor workflows** - `8b97ade3` (docs)
2. **Task 2: Author the 17th workflow and correct both stale-figure sites, one commit** - `0cd05743` (feat)
3. **Task 3: Structural proof and predecessor-workflow regression sweep** - `ceae920f` (docs)

_No plan-metadata commit yet — STATE.md/ROADMAP.md update follows this SUMMARY._

## Files Created/Modified
- `.github/workflows/audit-harness-v1.20-integrity.yml` - the 17th coexistence workflow (new)
- `.github/workflows/audit-harness-v1.7-integrity.yml` - line 96 stale-figure correction
- `.github/workflows/audit-harness-v1.8-integrity.yml` - line 95 stale-figure correction
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` - census row for both edited workflow paths
- `.planning/phases/144-v119-pin-18th-path-a-lineage-bump-terminal-close/144-EVIDENCE.md` - structural proof, job-key/display-name table, regression sweep, deviation note

## Decisions Made
- Followed `144-PATTERNS.md`'s verbatim `paths:` YAML block (five entries) over PLAN.md's "exactly six entries" acceptance criterion, since the two internal planning artifacts disagree and the PATTERNS block is the more detailed, directly-authored design deliverable. See Deviations below.
- Scrubbed the literal strings `v1.19` and `check-phase-138` from the new workflow's header prose entirely (not just from functional YAML), since the plan's acceptance criteria and the T-144-32 threat mitigation both require a zero-count grep across the whole file, comments included.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] `paths:` filter authored with five entries, not six, per 144-PATTERNS.md's verbatim design block**
- **Found during:** Task 2 (authoring the workflow)
- **Issue:** PLAN.md's must-haves and acceptance criteria state the `paths:` filter must contain "exactly six entries." `144-PATTERNS.md:254-268` — the phase's own literal-substitution table, produced from a direct read of the v1.19 workflow — gives the exact YAML to author, and that block contains five entries (script glob, check-phase glob, own path, `REQUIREMENTS.md`, one milestones glob). The arithmetic is unambiguous: v1.19's six entries are four fixed plus two milestone-specific files; v1.20 collapses those two into one glob per the explicit instruction ("ONE glob covering the four v1.20 governance documents"), yielding five, not six.
- **Fix:** Authored the `paths:` filter with PATTERNS.md's exact five-entry block. Documented the arithmetic and the source-of-truth conflict in `144-EVIDENCE.md`'s "Deviation: `paths:` filter entry count" section.
- **Files modified:** `.github/workflows/audit-harness-v1.20-integrity.yml`
- **Verification:** `.planning/milestones/v1.20-*` matches all four existing/future v1.20 governance documents by prefix — no trigger-surface narrowing despite the lower literal count.
- **Committed in:** `0cd05743` (Task 2 commit)

**2. [Rule 3 - Blocking] Removed `v1.19` and `check-phase-138` literals from header comments, not just functional YAML**
- **Found during:** Task 2 (post-authoring acceptance-criteria check)
- **Issue:** The first draft's descriptive header comments referenced the predecessor milestone and its apex by name (`v1.19`, `check-phase-138.mjs`) for readability. This tripped the `grep -c 'v1.19'`/`grep -c 'check-phase-138'` = 0 acceptance criteria (and the T-144-32 threat mitigation, which asserts a zero-count grep for the predecessor version string proves nothing was carried over).
- **Fix:** Rephrased the three affected comment lines to refer to "the immediately-prior milestone" and "the predecessor milestone's apex validator" instead of the literal strings.
- **Files modified:** `.github/workflows/audit-harness-v1.20-integrity.yml`
- **Verification:** `grep -c 'v1.19'` and `grep -c 'check-phase-138'` both resolve to `0` post-fix.
- **Committed in:** `0cd05743` (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (1 acceptance-criteria/design-doc conflict resolved in favor of the more detailed artifact, 1 blocking literal-scrub fix)
**Impact on plan:** Neither changes scope; both are documented in `144-EVIDENCE.md` for Plan 10's evidence pass to read correctly.

## Issues Encountered
`node scripts/validation/check-phase-66.mjs` (Task 2's `<verify>`, the v1.7 chain apex, non-nested standalone) is slow on this Windows dev box — a known, pre-existing hazard class (memory: the non-nested standalone path is exponential, unrelated to this plan's edits). It completed in this session (28 PASS, 0 FAIL, 0 SKIPPED, exit 0) after several minutes; no code change was needed.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
The 17th workflow is authored, structurally sound, and internally consistent with the harness, sidecar, apex, and leaves this phase built (Plans 04-07). It is not yet pushed or dispatched — that is Plan 09's owner-gated work. Plan 10's evidence pass can consume the job-key-to-display-name table recorded in `144-EVIDENCE.md`.

---
*Phase: 144-v119-pin-18th-path-a-lineage-bump-terminal-close*
*Completed: 2026-08-13*
