---
phase: 133-chain-validator-tooling-debt-closure
plan: 01
subsystem: infra
tags: [validation-tooling, chain-validator, audit-allowlist, ci, coordinate-reconciliation]

# Dependency graph
requires:
  - phase: 128-close-cluster
    provides: "v1.17-audit-allowlist.json ground truth (35-pin HYG-02 -1 shift, verified correct)"
provides:
  - "133-REPIN-COORDINATES.md: authoritative old->new {file,line} coordinate tables for all 6 TOOL-04 reconciliation targets (v1.4, v1.4.1, Group-S=v1.5..v1.13, v1.14, v1.15, v1.16)"
  - "C17 #12 blockquote-fragmentation and Phase-119 cobo.md-split identity-preserving expansion list (13 expansion entries across 5 sidecar groups)"
  - "2 flagged residuals for Plan 02: v1.4/v1.4.1 orphaned MHS pin (R-1), v1.14/Group-S missing Phase-119 NEW capability-matrix pin (R-2)"
affects: [133-02-tool-04-repin-commit]

# Tech tracking
tech-stack:
  added: []
  patterns: ["ground-truth-derived coordinate reconciliation via reason-text semantic matching (not arithmetic)"]

key-files:
  created:
    - .planning/phases/133-chain-validator-tooling-debt-closure/133-REPIN-COORDINATES.md
  modified: []

key-decisions:
  - "R-1 recommendation: leave v1.4/v1.4.1's orphaned MHS pin unmoved (inert either way; dropping it is a scope change beyond coordinate re-pin) — Plan 02 to confirm"
  - "Phase-119 cobo.md single-to-two-line split treated with the same identity-preserving-expansion principle as C17 #12, despite different root cause, per D-01's general intent"

requirements-completed: [TOOL-04]

# Metrics
duration: 15min
completed: 2026-07-19
---

# Phase 133 Plan 01: TOOL-04 Re-Pin Coordinate Reconciliation Summary

**Ground-truth-derived old->new coordinate tables for all 6 TOOL-04 reconciliation targets (v1.4, v1.4.1, Group-S, v1.14, v1.15, v1.16), covering 35+ line moves plus 13 identity-preserving fragmentation expansions, produced entirely via reason-text semantic matching against `v1.17-audit-allowlist.json` — zero sidecar or `.mjs` files touched.**

## Performance

- **Duration:** 15 min
- **Started:** 2026-07-19T14:16:29Z
- **Completed:** 2026-07-19T14:26:34Z
- **Tasks:** 2 completed
- **Files modified:** 1 (new planning artifact)

## Accomplishments

- Freshness guard (`git log a96f3b76..HEAD` over the 8 pinned Android/Linux files) confirmed zero commits — `v1.17-audit-allowlist.json` remains valid ground truth for coordinate derivation.
- Confirmed Group-S (`v1.5`..`v1.13`) byte-identity programmatically across all 4 pin categories, collapsing the reconciliation problem from 13 sidecars to 6 distinct targets.
- Derived complete old->new `{file,line}` tables for all 6 targets by semantic reason-text matching (not blind `-1` arithmetic), reusing v1.16's already-verified 35-pin table for Case 1 and computing v1.15/v1.14/Group-S/v1.4/v1.4.1 fresh via v1.17's `"was line X"` reason-field annotations and live-file `supervis`/Knox/COPE content grep cross-checks.
- Identified and tabulated 13 C17 #12 / Phase-119-split identity-preserving fragmentation expansions (1 pre-split pin -> N current fragment lines) across `v1.4`, `v1.4.1`, Group-S, `v1.14`, `v1.15`.
- Surfaced 2 residuals not resolvable by mechanical coordinate matching (R-1: `v1.4`/`v1.4.1`'s "MHS" supervision pin has no current-content target — the exempted text was removed between the v1.4.1 freeze and the v1.5 graduation baseline; R-2: `v1.14`/Group-S's `capability-matrix.md` lacks v1.17's Phase-119-added 7th pin, a content-timeline gap, not a re-pin gap) and recorded explicit recommendations for Plan 02.
- Computed expected post-fix pin counts per sidecar (target: `v1.15`/`v1.16` reach exactly 26/10/4/4 matching v1.17; `v1.14`/Group-S reach 25/10/4/4 due to the R-2 gap; `v1.4`/`v1.4.1` reach 22/0/0/4 or 21/0/0/4 depending on the R-1 disposition).

## Task Commits

Each task was committed together as a single atomic artifact (both tasks produced sections of the same coordinate document, per the plan's file scope):

1. **Task 1 + Task 2: Freshness guard, Group-S identity, and all 6 coordinate tables** - `da22ee51` (docs)

## Files Created/Modified

- `.planning/phases/133-chain-validator-tooling-debt-closure/133-REPIN-COORDINATES.md` - Full coordinate reconciliation artifact: freshness guard result, Group-S byte-identity confirmation, 6 target tables (v1.16/v1.15/v1.14/Group-S/v1.4/v1.4.1), fragmentation-expansion list, 2 flagged residuals, per-sidecar post-fix pin-count summary

## Decisions Made

- Treated the Phase-119 `admin-setup-android/03-fully-managed-cobo.md` single-line-to-two-line split with the same identity-preserving-expansion principle as the C17 #12 glossary fragmentation, even though its root cause (Phase-118 RETRO-03 EEE-retrofit table remediation) differs from C17 #12's 200-char blockquote cap — the underlying mechanic (one exemption intent, now expressed across N physical lines) and the D-01 rationale for handling it are identical, so it is documented in the same Section 9 table rather than invented as a separate category.
- For the R-1 orphaned MHS pin (`v1.4`/`v1.4.1`), recommended leaving it unmoved rather than dropping it — a stale non-matching pin is inert and cannot cause a false C2 pass/fail, while dropping it would be a pin-count change outside "coordinate-only re-pin" scope. This is a recommendation for Plan 02, not a decision made here (recon-only plan, no sidecar edited).

## Deviations from Plan

None - plan executed exactly as written. Both tasks' `must_haves`/`acceptance_criteria` were met: freshness guard passed and logged, Group-S byte-identity confirmed, all 6 tables complete with `line`-only transitions (no `reason` text altered or invented), fragmentation expansions recorded as identity-preserving per the locked D-01 interpretation, and `git status` confirms zero sidecar/`.mjs` files were touched.

The plan's research (133-RESEARCH.md) flagged the exact coordinate values for `v1.4`/`v1.4.1`/Group-S/`v1.14`/`v1.15` as an open item requiring dedicated recon (Open Question 1) — this plan resolved that open item in full, going one step further than the research's worked v1.16 example by also discovering 2 residual findings (R-1, R-2) the research's time-boxed pass did not surface. These are documented as findings, not treated as deviations requiring a checkpoint, since this is a recon-only plan that produces documentation, not code/sidecar changes.

## Issues Encountered

None. The semantic-matching method (cross-referencing v1.16's and v1.17's own `reason`-field `"was line X"` shift-history annotations, combined with live-file `grep -i supervis` content verification) resolved every pin unambiguously except the 2 residuals, which were resolvable by direct content inspection (confirming the MHS section's current text contains zero supervision-related matches) rather than left as open questions.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `133-REPIN-COORDINATES.md` is complete and ready for Plan 02's mechanical, reviewable, atomic D-00a-exception re-pin commit — Plan 02 should apply the tables in Sections 3-8 verbatim, apply the Section 9 fragmentation expansions as additional sibling pins, and make an explicit call on the Section 10 R-1/R-2 residuals (recommendation given, not enforced).
- No blockers. Zero frozen surfaces were touched by this plan; the freshness guard result remains valid as long as no commit lands on the 8 named Android/Linux files before Plan 02 executes (re-verify with the same `git log` check immediately before the re-pin commit, per RESEARCH's "Valid until" caveat).

---
*Phase: 133-chain-validator-tooling-debt-closure*
*Completed: 2026-07-19*

## Self-Check: PASSED

- FOUND: `.planning/phases/133-chain-validator-tooling-debt-closure/133-REPIN-COORDINATES.md`
- FOUND: `.planning/phases/133-chain-validator-tooling-debt-closure/133-01-SUMMARY.md`
- FOUND commit: `da22ee51`
- FOUND commit: `91e7519d`
