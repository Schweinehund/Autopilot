---
phase: 128-v116-pin-15th-path-a-lineage-bump-terminal-close
plan: 04
subsystem: infra
tags: [audit-harness, ci, validator-chain, github-actions, path-a-lineage]

# Dependency graph
requires:
  - phase: 128-03
    provides: V116='3dd2512' pin + readAtV116Close export + the 8 D-128-C frozen-aware validator conversions (Atom 2a), which check-phase-128's chain recursion (CHAIN-49/58/59/62/101/109/118/121) depends on being green
provides:
  - check-phase-126.mjs / check-phase-127.mjs — lightweight non-apex validators regression-guarding Phase 126's publish-bundle pipeline and Phase 127's Stop-hook
  - check-phase-128.mjs — the v1.17 chain apex (80-entry CHAIN_PHASES 48..127, HARNESS=v1.17-milestone-audit.mjs), standalone --verbose proven green (82 PASS, 0 FAIL, 1 SKIPPED)
  - .github/workflows/audit-harness-v1.17-integrity.yml — the 14th CI coexistence workflow (authored, NOT yet pushed/fired)
affects: [128-05 (3-axis terminal re-audit consumes the Axis-2 GHA run this workflow will fire once pushed), 128-07 (close-gate references check-phase-128 + the 14th workflow in v1.17-MILESTONE-AUDIT.md)]

# Tech tracking
tech-stack:
  added: []
  patterns: [Path-A copy-then-repoint (validators + CI workflow), NESTED-aware execFileSync chain recursion, V-NNN-SELF dual-invariant guard]

key-files:
  created:
    - scripts/validation/check-phase-126.mjs
    - scripts/validation/check-phase-127.mjs
    - scripts/validation/check-phase-128.mjs
    - .github/workflows/audit-harness-v1.17-integrity.yml
  modified: []

key-decisions:
  - "SCOPE CHANGE (orchestrator-directed): this execution authored + locally committed the 4 Atom-2b files ONLY. The plan's Task 3 push/PR/GHA-run-ID-recording is explicitly deferred to the orchestrator's follow-up step — NOT executed here."
  - "check-phase-126/127 needles derived from 126-VERIFICATION.md/127-VERIFICATION.md Required Artifacts, not invented: build-publish-bundle.mjs (guardOne, checkDocIdUniqueness CR-01 fix), build-filename-map.mjs (parseRegistry), filename-map.md presence for 126; publish-bundle-gate.cjs (computeDecision) and build-publish-bundle.mjs (deriveZipName, --version=) for 127."
  - "Did NOT mark HARN-09/HARN-10 complete in REQUIREMENTS.md — mirrors the 128-01/02/03 deferral pattern (D-128-A single-commit-flip rider): full HARN-09/HARN-10 flip only at the Wave-7 close-gate (128-07), after the Axis-2 GHA run this workflow will fire is consumed."

patterns-established:
  - "Non-apex validator Path-A shape (check-phase-123/124 lineage): CHAIN_PHASES=[], CHAIN_SKIP=new Set([]), presence()-helper + inline content-needle checks, V-NNN-SELF dual-invariant guard."
  - "Apex validator Path-A shape (check-phase-125 lineage): 80-entry continuous-integer CHAIN_PHASES, dual module-load throws (length!==N, terminus!==M), NESTED-aware execFileSync chain recursion with isPeer>=67/600s timeout, AUDIT-HARNESS subprocess check with the same NESTED guard, V-NNN-SELF dual-invariant guard."

requirements-completed: []  # HARN-09/HARN-10 intentionally NOT flipped here — deferred to 128-07 close-gate per D-128-A

# Metrics
duration: 35min
completed: 2026-07-11
---

# Phase 128 Plan 04: Atom 2b — check-phase-126/127/128 + 14th CI Workflow (Authoring Half) Summary

**Authored and locally committed the v1.17 validator trio (check-phase-126/127 non-apex + check-phase-128 apex, 80-entry chain 48..127) and the 14th CI coexistence workflow (audit-harness-v1.17-integrity.yml); check-phase-128.mjs --verbose proven green standalone (82 PASS, 0 FAIL, 1 SKIPPED). Push deferred to the orchestrator by explicit scope directive.**

## Performance

- **Duration:** ~35 min
- **Started:** 2026-07-11
- **Completed:** 2026-07-11
- **Tasks:** 2.5 of 3 (Task 1 + Task 2 complete; Task 3 authoring half complete, push half deferred)
- **Files modified:** 4 (all new)

## Accomplishments

- `check-phase-126.mjs` + `check-phase-127.mjs` authored: empty `CHAIN_PHASES`/`CHAIN_SKIP`, `V-126-SELF`/`V-127-SELF` dual-invariant guards, needles derived from the two phases' VERIFICATION.md Required Artifacts (build-publish-bundle.mjs's `guardOne`/`checkDocIdUniqueness`, build-filename-map.mjs's `parseRegistry`, filename-map.md presence for 126; publish-bundle-gate.cjs's `computeDecision`, build-publish-bundle.mjs's `deriveZipName`/`--version=` for 127). Both exit 0 standalone.
- `check-phase-128.mjs` authored as the v1.17 chain apex: `CHAIN_PHASES` extended to the literal continuous 80-entry array `[48..127]`, both module-load throws updated (`!== 77` → `!== 80`, `!== 124` → `!== 127`), `HARNESS` repointed to `scripts/validation/v1.17-milestone-audit.mjs`, all `125`→`128` self-references repointed (`V-128-AUDIT`, `V-128-CHAIN-NN`, `V-128-AUDIT-HARNESS`, `V-128-SELF`, runner banner). Standalone `--verbose` run: **82 PASS, 0 FAIL, 1 SKIPPED, exit 0** — the AUDIT check SKIP-passes because `128-VERIFICATION.md` does not exist yet (expected pre-close-gate).
- `.github/workflows/audit-harness-v1.17-integrity.yml` authored as the 14th CI coexistence workflow: Path-A copy of `audit-harness-v1.16-integrity.yml` with every `v1.16-*` token repointed to `v1.17-*` (name, `paths:` trigger entries incl. MILESTONE-AUDIT/DEFERRED-CLEANUP, `parse`/`path-match`/`harness-run`/`rotting-external-quarterly` sidecar string literals), coexistence label corrected to "14th" (not mislabeled as 15th), DUAL-APEX comment repointed to `check-phase-128`/`48..127`. `linux-chain-ubuntu-latest` preserved verbatim (`core.autocrlf false`, `fetch-depth: 0`, `continue-on-error: false`, `timeout-minutes: 30`) with only the chain-apex step's target (`check-phase-125.mjs`→`check-phase-128.mjs`) and notice comment (`[48..124]`→`[48..127]`) changed. Per-phase job list swapped from `check-phase-120..125` to `check-phase-126/127/128`. Confirmed `grep "v1.16-"` returns 0 matches in the new file.
- All 4 files landed as ONE local commit (`5da45802`), containing exactly the 4 named files, no unintended deletions.

## Task Commits

Per the orchestrator's explicit scope directive, Tasks 1+2 and the authoring half of Task 3 were combined into a single indivisible Atom-2b commit (matching the plan's own "ONE commit" mandate for this atom):

1. **Task 1 + Task 2 + Task 3 (authoring half): check-phase-126/127/128.mjs + audit-harness-v1.17-integrity.yml** - `5da45802` (feat)

**No plan-metadata commit yet** — STATE.md/ROADMAP.md/this SUMMARY.md are committed separately below (docs-only, local, no push), since the plan itself is not fully complete (push + PR + GHA-run-ID-recording remain outstanding, explicitly deferred to the orchestrator).

_Note: no TDD tasks in this plan — pure validator/CI authoring._

## Files Created/Modified

- `scripts/validation/check-phase-126.mjs` - Non-apex validator regression-guarding Phase 126's publish-bundle pipeline (guardOne/checkDocIdUniqueness/parseRegistry/filename-map.md needles)
- `scripts/validation/check-phase-127.mjs` - Non-apex validator regression-guarding Phase 127's Stop-hook (computeDecision/deriveZipName/--version= needles)
- `scripts/validation/check-phase-128.mjs` - Apex validator: 80-entry chain 48..127, HARNESS=v1.17-milestone-audit.mjs, standalone --verbose exit 0 (82 PASS/0 FAIL/1 SKIPPED)
- `.github/workflows/audit-harness-v1.17-integrity.yml` - 14th CI coexistence workflow, paths repointed to v1.17, linux-chain-ubuntu-latest preserved verbatim

## Decisions Made

- Combined Task 1, Task 2, and the authoring half of Task 3 into one commit per the plan's own "Atom 2b = ONE commit" mandate — this matches the plan's intended atomicity even though the orchestrator scoped out the push half of Task 3.
- Needle selection for check-phase-126/127 was deliberately conservative: only asserted deliverables with unambiguous, stable string needles already confirmed present in the live files (`guardOne`, `checkDocIdUniqueness`, `parseRegistry`, `computeDecision`, `deriveZipName`, `--version=`) — avoided line-anchored or narrowly-worded needles that could drift with future reformatting (mirrors the RESEARCH.md "Anti-Patterns to Avoid — line-anchored assumption drift" guidance).
- Did not touch REQUIREMENTS.md, PROJECT.md, or any frozen v1.4–v1.16 predecessor surface — this plan's scope is additive-only (4 new files).

## Deviations from Plan

**1. [Orchestrator-directed scope change] Task 3's push/PR/GHA-run-ID-recording was explicitly excluded from this execution**
- **Directed by:** the orchestrator's spawn-time objective ("BUT WITH ONE SCOPE CHANGE... DO NOT PUSH")
- **Scope executed:** Task 1 (check-phase-126/127) + Task 2 (check-phase-128 apex) + the authoring half of Task 3 (audit-harness-v1.17-integrity.yml), landed as one local commit
- **Scope deferred:** `git push`, PR creation, and consuming the resulting GHA run ID (128-05/128-07 dependency) — the orchestrator will handle this after verifying apex-128 is green locally (which this execution confirmed: 82 PASS, 0 FAIL, exit 0)
- **Impact:** Plan 128-04 is NOT fully complete per its own acceptance criteria (which require the push). ROADMAP.md's `128-04-PLAN.md` checkbox is intentionally left unchecked; STATE.md documents the local-commit-done/push-pending state for the orchestrator's next step.

None of Rules 1-4 (bug/missing-critical/blocking/architectural) applied — this was a pure authoring task with no runtime surprises.

## Issues Encountered

None. All acceptance criteria for the authored scope were met on the first pass: both non-apex validators exit 0 standalone, the apex's throws were correctly updated (verified via grep: `!== 80`/`!== 127` present, `!== 77`/`!== 124` absent), `node -c` syntax-checked clean, the full standalone `--verbose` chain run completed in well under the 600s subprocess timeout with 0 failures, the workflow YAML parsed cleanly (`python -c "import yaml; yaml.safe_load(...)"`), and `grep "v1.16-"` confirmed 0 stale-token leakage in the new workflow.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- **Ready:** check-phase-128.mjs is proven green standalone on this machine (82 PASS, 0 FAIL, 1 SKIPPED, exit 0) — the authoritative pre-push local proof the orchestrator's objective asked for.
- **Blocker for 128-05:** the Axis-2 authoritative Linux-GHA run has NOT been initiated — the orchestrator must push commit `5da45802` (this Atom-2b) together with the Atom-2a commit (`066a906` from 128-03) to a branch/PR to fire `audit-harness-v1.17-integrity.yml`'s `paths:` trigger, then record the resulting run ID for 128-05/128-07 to consume.
- **Not yet done:** REQUIREMENTS.md HARN-09/HARN-10 remain unflipped by design (close-gate-only flip per D-128-A) — no action needed here, this is expected state.

---
*Phase: 128-v116-pin-15th-path-a-lineage-bump-terminal-close*
*Completed: 2026-07-11*
