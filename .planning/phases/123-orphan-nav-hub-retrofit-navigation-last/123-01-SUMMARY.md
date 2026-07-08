---
phase: 123-orphan-nav-hub-retrofit-navigation-last
plan: 01
subsystem: infra
tags: [nodejs, markdown-tooling, eee-retrofit, registry, pipeline]

# Dependency graph
requires:
  - phase: 122-structural-retrofit-decision-trees-carved-mermaid
    provides: retrofit-mermaid-structural.mjs (Phase-122 chain-tip fork base), RE-index.md contiguous through RE-217
provides:
  - "scripts/pipeline/retrofit-nav-hub.mjs -- Phase-123 fork enrolling the 4 orphan nav-hubs (NAV_HUB_PATHS -> Reference)"
  - "docs/_registry/RE-index.md rows RE-218..221 (path-keyed, Reference/Approved) for the 4 nav-hubs"
  - "Proven (dry-run) fail-closed resolution: doc_type=Reference, d1=All Platforms, vhBranch=PREPEND-3col for all 4 hubs"
affects: [123-02, 123-03]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Fork-don't-refactor (6th consecutive application: 116->117->118->121->122->123)"
    - "Invoke-by-explicit-paths (sidesteps the --all noisy-ERROR hazard entirely; main()'s --all block left untouched)"

key-files:
  created:
    - scripts/pipeline/retrofit-nav-hub.mjs
  modified:
    - docs/_registry/RE-index.md

key-decisions:
  - "Forked from retrofit-mermaid-structural.mjs (Phase-122 chain tip), NOT Phase-121's fork -- per locked D-03, the 122 tip is a strict superset (auto-filled VH date, DOC-ID-ALREADY-PRESENT idempotency guard)"
  - "Left main()'s --all enumeration completely untouched -- invoked the fork with the 4 explicit nav-hub paths instead (Pattern 1), documented 'never invoke with --all' in the fork header"
  - "Registry rows RE-218..221 minted before any fork run, per fail-closed buildDocIdMap() join-on-Path requirement"

requirements-completed: []  # RETRO-06 spans 123-01 (tooling+registry) + 123-02/03 (actual retrofit); not marking complete here -- see Deviations

# Metrics
duration: 25min
completed: 2026-07-08
---

# Phase 123 Plan 01: Nav-Hub Fork + Registry Prep Summary

**Forked retrofit-nav-hub.mjs from the Phase-122 chain tip (NAV_HUB_PATHS Set + one resolveDocType() branch) and minted RE-218..221; dry-run proves all 4 orphan nav-hubs resolve Reference/All-Platforms/PREPEND-3col fail-closed with zero files written.**

## Performance

- **Duration:** ~25 min
- **Started:** 2026-07-08
- **Completed:** 2026-07-08
- **Tasks:** 2 completed
- **Files modified:** 2 (1 created, 1 modified)

## Accomplishments
- Minted 4 path-keyed registry rows (RE-218=common-issues.md, RE-219=index.md, RE-220=quick-ref-l1.md, RE-221=quick-ref-l2.md), all Reference/Approved, keeping RE-index.md contiguous RE-001..221
- Forked `scripts/pipeline/retrofit-nav-hub.mjs` from `retrofit-mermaid-structural.mjs` (Phase-122 chain tip) with a minimal 2-part diff: a 4-entry `NAV_HUB_PATHS` Set + one `resolveDocType()` branch
- `--self-test` passes 12/12 (11 inherited Phase-122 sub-tests re-proven verbatim + 1 new sub-test proving the `NAV_HUB_PATHS` router branch)
- `--dry-run` against the 4 explicit nav-hub paths resolves `doc_type=Reference`, `platform-injected=N`, `d1=All Platforms`, `vhBranch=PREPEND-3col` for all 4, 0 ERRORS, and wrote no doc file
- Confirmed `retrofit-mermaid-structural.mjs` (the Phase-122 base) is byte-unchanged (empty `git diff`)

## Task Commits

Each task was committed atomically:

1. **Task 1: Mint RE-218..221 nav-hub registry rows** - `a06048e` (feat)
2. **Task 2: Fork retrofit-nav-hub.mjs (NAV_HUB_PATHS + resolveDocType branch) and dry-run-prove it against the 4 hubs** - `1f93868` (feat)

**Plan metadata:** (this commit)

## Files Created/Modified
- `docs/_registry/RE-index.md` - appended RE-218..221 (path-alphabetical, Reference/Approved) immediately after RE-217
- `scripts/pipeline/retrofit-nav-hub.mjs` - new file; Phase-123 fork of `retrofit-mermaid-structural.mjs` adding `NAV_HUB_PATHS` + one `resolveDocType()` line; all other guards (MERMAID-STILL-PRESENT, TEMPLATE-SENTINEL, DOC-ID-ALREADY-PRESENT, DOC-ID-UNRESOLVED, UNKNOWN-KEYLESS-PLATFORM, VH auto-fill) inherited verbatim

## Decisions Made
- Fork base = `retrofit-mermaid-structural.mjs` (Phase-122 chain tip), per the plan's LOCKED D-03 decision — not Phase-121's fork, not an in-place extension of `retrofit-reference.mjs`
- `main()`'s `--all` enumeration was left completely untouched (not repurposed for `NAV_HUB_PATHS`) — the fork is invoked only via the 4 explicit file-path positional args, which the base already supported with zero code changes (RESEARCH Pattern 1). This is the smaller diff and sidesteps the noisy-ERROR `--all` hazard entirely; documented in the fork's header comment as "never invoke with --all"
- Registry rows RE-218..221 were minted in Task 1, strictly before the Task 2 fork run, satisfying the fail-closed `buildDocIdMap()` join-on-Path precondition

## Deviations from Plan

None - plan executed exactly as written.

One clarifying note: this plan's frontmatter lists `requirements: [RETRO-06]`, but per `123-CONTEXT.md`/`STATE.md`, RETRO-06 (the nav-hub retrofit requirement) is only fully satisfied once the 4 hubs are actually retrofitted, C17-green, and link-checked — that is plan 123-03's job. This plan (123-01) is explicitly scoped to tooling + registry prep only ("This plan writes NO doc file"), so `requirements.mark-complete` was intentionally NOT run for RETRO-06 here — it stays Pending in the traceability table until 123-03 closes it. This mirrors the same discipline already established in Phase 121 (121-05's SUMMARY: "Did NOT run requirements.mark-complete... RETRO-07 correctly remains Pending").

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- `scripts/pipeline/retrofit-nav-hub.mjs` is proven ready to run for real (non-dry-run) against the 4 nav-hub paths — the next plan (123-02 or 123-03, per the phase's wave decomposition) can invoke it to actually enroll the 4 hubs
- Registry rows RE-218..221 are in place and will resolve correctly the moment the fork writes
- No blockers or concerns for the retrofit plans that follow

---
*Phase: 123-orphan-nav-hub-retrofit-navigation-last*
*Completed: 2026-07-08*
