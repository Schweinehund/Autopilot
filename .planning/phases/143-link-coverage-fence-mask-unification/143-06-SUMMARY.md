---
phase: 143-link-coverage-fence-mask-unification
plan: 06
subsystem: docs-validation
tags: [link-checker, corpus-wide-scan, gov-02-ledger, no-baseline-discharge, github-slug]

requires:
  - phase: 143-link-coverage-fence-mask-unification
    provides: github-anchor-model, docs/_templates/ exclusion, inline-code-span masking, LINK-03 file-target repair, Class-B/C/D per-pair remedies, dry-run-to-zero corpus state (Plans 02, 03, 04, 05, 09)
provides:
  - "check-nav-hub-links.mjs's checkInboundLinks widened to a corpus-wide scan (both :259 hub-source skip and :269 hub-target filter deleted, D-12) — scans all 274 docs/ files (excluding docs/_templates/) as both source and target"
  - "checkOutboundLinks retired to a hub-existence-only assertion ('hub file not found' hard-fail preserved verbatim, D-13); HUB_PATHS kept live as the hub-existence roster, not dead code"
  - "Corpus-wide checker exits 0 by default (no --verbose widening needed) with byte-identical 'check-nav-hub-links summary: ' prefix, reworded hub-presence/corpus-link buckets"
  - "LINK-04 discharged by five independent positive checks in 143-EVIDENCE.md (no sidecar artifact, no in-source baseline structure, no committed red interval, full exit-code enumeration, closed dry-run ladder)"
  - "GOV-02 ledger row appended (pre-edit census only, row 73) and D-13 ruling recorded in 143-EVIDENCE.md before any code edit"
affects: [144-PLAN.md]

actuals:
  tokens: 8400
  tasks: 3
  commits: 3

tech-stack:
  added: []
  patterns: [pre-edit-census-only ledger row (D-33 discipline, row modeled on Plan 09's row 65), positive-absence discharge over zero-count-alone (LINK-04)]

key-files:
  created: []
  modified:
    - scripts/validation/check-nav-hub-links.mjs
    - .planning/milestones/v1.20-GOV-02-LEDGER.md
    - .planning/phases/143-link-coverage-fence-mask-unification/143-EVIDENCE.md

decisions:
  - "GOV-02 row appended in Task 1 as a pre-edit-census-only row (no code diff yet), modeled on Plan 09's row 65 precedent — the plan's own instruction to append 'BEFORE touching the file' while also wanting a 'concrete diff figure' is resolved by recording git diff --numstat = 0 0 at row-append time, itself a concrete (zero) figure confirming no edit has landed yet, per the append-only ledger discipline that forbids a later plan/task from editing an already-landed row."
  - "checkOutboundLinks's per-link loop retired entirely rather than kept as a second (redundant) scan — with :259 gone, checkInboundLinks already covers the 4 hubs' 484 outbound links as a source, so keeping both would double-report every hub-link failure (D-13's explicit consequence)."
  - "Summary line buckets reworded to 'hub-presence failure(s)' / 'corpus-link failure(s)' (from 'outbound'/'inbound') — the byte-identical 'check-nav-hub-links summary: ' prefix is preserved verbatim for Phase 144's needle-spec."

metrics:
  duration: ~20min
  completed: 2026-08-11
status: complete

requirements-completed: [LINK-02, LINK-04]
---

# Phase 143 Plan 06: Corpus-Wide Link Checker Flip Summary

Widened `check-nav-hub-links.mjs`'s default scan from the 4 nav-hubs to the full 274-file/6250-link
`docs/` corpus by deleting both hub-only filter conditions, preserved the hub-existence assertion
with a consciously split role, and discharged LINK-04's no-baseline claim with five positive checks.

## Performance

- **Duration:** ~20 min
- **Tasks:** 3
- **Files modified:** `scripts/validation/check-nav-hub-links.mjs`, `v1.20-GOV-02-LEDGER.md`,
  `143-EVIDENCE.md`
- **Commits:** 3

## Accomplishments

- Recorded the D-13 ruling in `143-EVIDENCE.md` before any code edit: `checkInboundLinks` becomes
  the sole corpus-wide scan; `checkOutboundLinks` retains only its `hub file not found` hard-fail
  as the single existence assertion for the four ratified nav-hubs; `HUB_PATHS` stays live as that
  roster, not dead code.
- Appended the GOV-02 ledger row for the flip (row 73, pre-edit census only, modeled on the
  Plan-09 row-65 precedent for a census-with-no-edit row): target-scoped path-literal grep (5 hits,
  all comment/path-string, 0 in `.github/workflows/`), symbol-scoped grep for
  `checkInboundLinks`/`checkOutboundLinks`/`HUB_PATHS`/`hubSet`/the summary-line literal (all
  confined to the file itself; `retrofit-nav-hub.mjs`'s distinct `NAV_HUB_PATHS` confirmed a
  non-collision), and a direct read confirming `check-phase-123.mjs:40,82-84`'s `presence()` pins
  only the path-string constant, never content.
- Deleted both `:259` (`if (hubSet.has(relPath)) continue;`) and `:269`
  (`if (!hubSet.has(resolvedRel)) continue;`) from `checkInboundLinks`, removing the now-unused
  `hubSet` local entirely — the function now scans all 274 `docs/` files (excluding
  `docs/_templates/`) as both source and target.
- Retired `checkOutboundLinks`'s per-link loop (the double-reporting risk D-13 names once `:259` is
  gone), keeping its `content === null` hard-fail exactly as written.
- Reworded the runtime report: section headers, the clean-run line, and the summary-line buckets
  now read "hub-presence failure(s)" / "corpus-link failure(s)" instead of "outbound"/"inbound" —
  the literal `check-nav-hub-links summary: ` prefix stayed byte-identical (Phase 144's
  needle-spec anchor).
- Rewrote the header comment, the `HUB_PATHS` comment, and both scan functions' doc comments to
  describe a corpus-wide tool instead of a 4-hub-only tool; added a permanent-not-census-dependent
  justification for the deliberate absence of `{#id}` recognition (GitHub semantics, not corpus
  count).
- `node scripts/validation/check-nav-hub-links.mjs` exits 0 on the first run after the flip — no
  iteration needed, confirming the corpus really was already clean per the orchestrator's
  independent pre-dispatch probe: `0 hub-presence failure(s), 0 corpus-link failure(s), 0 total`.
- `--self-test` unaffected: `Self-test: 10 passed, 0 failed`, exit 0.
- Discharged LINK-04 in `143-EVIDENCE.md` with five independent positive checks rather than a bare
  zero count: (1) no new sidecar artifact under `scripts/validation/`; (2) every
  baseline/allowlist/expected/skip-shaped grep hit classified as either header-comment prose
  asserting no baseline exists or a self-test fixture variable (`expectedDup`), never a
  corpus-violation-gating structure; (3) no commit in the phase's git log ever lands a corpus-wide
  red state — Task 1 makes no code edit and Task 2's flip commit is also the corpus's first-ever
  0/0/0 default-scope run; (4) exactly two `process.exit` call sites in the whole file, both fully
  enumerated, no third exit code; (5) the dry-run ladder closed at its final row: 175 → 173 → 143 →
  78 → 49 → 13 → 0 (dry-run) → **0 (committed)**.
- Measured and recorded the committed corpus scan's runtime as a range across n=3 runs (~738-754
  ms) with tree/cache/node/OS declaration, for Phase 144's job-timeout sizing.
- Regression gates green throughout: `check-phase-123.mjs` (`6 PASS, 0 FAIL, 0 SKIPPED`, exit 0 —
  the path-string `presence()` pin survives the in-place edit), c17
  (`234 files checked, 0 with violations, 0 total violations`), carve-gate
  (`98 in-scope path(s), all on-list`, exit 0).

## Task Commits

1. **Task 1: GOV-02 pre-edit census + D-13 ruling** - `50913c0b` (docs)
2. **Task 2: Delete `:259`/`:269`, retire outbound loop, reword report** - `db576147` (feat)
3. **Task 3: LINK-04 no-baseline discharge + closed dry-run ladder** - `47fa447b` (docs)

**Plan metadata:** captured in this SUMMARY commit (below)

## Files Created/Modified

- `scripts/validation/check-nav-hub-links.mjs` — `checkInboundLinks` widened to corpus-wide scope
  (both filters deleted); `checkOutboundLinks` retired to hub-existence-only; header/comment/report
  strings reworded; summary-line prefix byte-identical
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` — 1 row appended (row 73, pre-edit census, no code
  diff at append time)
- `.planning/phases/143-link-coverage-fence-mask-unification/143-EVIDENCE.md` — Plan 06 D-13 ruling
  + pre-edit census section; `## LINK-04 no-baseline discharge` section with all five checks and
  the closed dry-run ladder

## Decisions Made

See frontmatter `decisions` for the full list. Summary: the GOV-02 row was appended in Task 1 as a
census-only row (no code diff yet) per the Plan-09 row-65 precedent, resolving the plan's own
"append before touching the file" instruction against its "concrete diff figure" request by
recording `git diff --numstat = 0 0` as that figure; `checkOutboundLinks`'s per-link loop was
retired entirely rather than kept redundant; the summary-line buckets were reworded to
hub-presence/corpus-link while keeping the prefix byte-identical.

## Deviations from Plan

### Auto-fixed Issues

None — no Rule 1/2/3 auto-fixes were required. The corpus really was already clean (orchestrator's
independent pre-dispatch probe measured `files=274 links=6250 brokenFile=0 brokenAnchor=0 TOTAL=0`
before this plan ran), so the checker exited 0 on the very first post-flip run with no iteration.

**Total deviations:** 0.
**Impact on plan:** None. Executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- LINK-02 and LINK-04 are both discharged. The corpus-wide checker (`check-nav-hub-links.mjs`) is
  now the checker's own default scope — no `--verbose` widening, no temporary working-tree patch,
  no dry-run needed to see the corpus-wide result. `node scripts/validation/check-nav-hub-links.mjs`
  exits 0 with `0 hub-presence failure(s), 0 corpus-link failure(s), 0 total`.
- Phase 144 can now wire this checker's spawn into `check-phase-143.mjs` under a job timeout — the
  measured ~738-754ms runtime range (n=3) is recorded in `143-EVIDENCE.md`'s LINK-04 discharge
  section for that sizing.
- The literal `check-nav-hub-links summary: ` prefix is byte-identical to its pre-flip form —
  Phase 144's needle-spec can pin it directly.
- No `check-phase-143.mjs` was authored and no `CHAIN_PHASES` self-registration was added — both
  confirmed absent (`grep -c 'CHAIN_PHASES' scripts/validation/check-nav-hub-links.mjs` → 0,
  `test ! -f scripts/validation/check-phase-143.mjs`) — D-23's Phase-144 hand-off is intact.
- No blockers. c17 (234/0/0), carve-gate (98/98/0), `check-phase-123.mjs` (6/0/0), the corpus-wide
  checker (0/0/0, exit 0), and `--self-test` (10/0) all green at this commit.

---
*Phase: 143-link-coverage-fence-mask-unification*
*Completed: 2026-08-11*
