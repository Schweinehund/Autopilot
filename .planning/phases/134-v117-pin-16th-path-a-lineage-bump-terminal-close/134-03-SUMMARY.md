---
phase: 134-v117-pin-16th-path-a-lineage-bump-terminal-close
plan: 03
subsystem: infra
tags: [validator-chain, path-a-harness, ci-workflow, archive-resolver]

# Dependency graph
requires:
  - phase: 134-v117-pin-16th-path-a-lineage-bump-terminal-close
    plan: 02
    provides: v1.18-milestone-audit.mjs (16th Path-A harness) + v1.18-audit-allowlist.json + BASELINE_22
provides:
  - "5 leaf validators check-phase-129..133.mjs (needle-based, no chain, no resolver)"
  - "Apex check-phase-134.mjs: CHAIN[48..133] (86 entries), AUDIT via corrected ['v1.18-phases'] token, AUDIT-HARNESS on v1.18-milestone-audit.mjs, SELF dual-invariant"
  - "audit-harness-v1.18-integrity.yml (15th CI coexistence workflow, 5 leaf jobs + dual-apex, no harness-run ref)"
affects: [134-04, 134-05]

# Tech tracking
tech-stack:
  added: []
  patterns: ["Leaf-vs-apex validator split: only the apex reads its own VERIFICATION.md via resolveArchivedPhasePath; leaf validators (5 of 6) stay needle-based against durable docs/scripts deliverables, never .planning/phases/ ephemeral artifacts", "Archive-root token correction: new apex uses its OWN milestone root (['v1.18-phases']) rather than copying the predecessor-root off-by-one bug frozen in check-phase-119/125/128"]

key-files:
  created:
    - scripts/validation/check-phase-129.mjs
    - scripts/validation/check-phase-130.mjs
    - scripts/validation/check-phase-131.mjs
    - scripts/validation/check-phase-132.mjs
    - scripts/validation/check-phase-133.mjs
    - scripts/validation/check-phase-134.mjs
    - .github/workflows/audit-harness-v1.18-integrity.yml
  modified: []

key-decisions:
  - "check-phase-134's AUDIT check uses the OBJECTIVELY CORRECT ['v1.18-phases'] archive-root token (own milestone root) rather than copying check-phase-128's frozen ['v1.16-phases'] predecessor-root bug forward a 4th time -- token correctness IS the fail-loud-vs-silent-wrong guardrail here, not a throw-on-resolver-null (which would contradict the apex's own pre-close-gate exit-0 criterion)"
  - "Leaf validators (129-133) check only durable docs/scripts/validation deliverables, never .planning/phases/ ephemeral artifacts -- avoids archival-drift risk entirely for the 5 non-apex files, matching the 126/127 precedent shape"
  - "check-phase-133's needle set targets the 14 re-pinned v1.4..v1.16 sidecar JSONs (valid-JSON check) + the check-phase-60/61.mjs n:1000 stderr-budget bump with check-phase-48.mjs correctly held at n:200 -- TOOL-05 (re-scoped to verify-and-attest per CARVE-2) authors no durable code artifact to needle-check, so it is not asserted here"

patterns-established: []

requirements-completed: [HARN-12]

# Metrics
duration: 25min
completed: 2026-07-20
---

# Phase 134 Plan 03: 6 New Validators + 15th CI Coexistence Workflow Summary

**Authored check-phase-129..134.mjs (5 needle-based leaves + 1 chain-apex spanning [48..133], 86 entries) plus audit-harness-v1.18-integrity.yml (15th CI workflow); apex proven green standalone at 88 PASS / 0 FAIL / 1 SKIPPED (89 total checks) with the corrected `['v1.18-phases']` archive-root token, never the predecessor-root bug frozen in check-phase-119/125/128.**

## Performance

- **Duration:** ~25 min
- **Started:** 2026-07-20 (STATE.md session, following 134-02)
- **Completed:** 2026-07-20
- **Tasks:** 2 completed
- **Files modified:** 7 (7 created, 0 modified)

## Accomplishments

- Authored 5 leaf validators (`check-phase-129.mjs` through `check-phase-133.mjs`) following the check-phase-126/127 lightweight template: `CHAIN_PHASES = []`, no `resolveArchivedPhasePath` import, needle-based presence/content checks derived from each phase's own `-VERIFICATION.md` Required Artifacts, plus a SELF dual-invariant check. All five exit 0 standalone; `grep -L "resolveArchivedPhasePath"` confirms none of the five import the resolver.
- Authored the apex `check-phase-134.mjs` (check-phase-128 template): `CHAIN_PHASES` = integers 48..133 inclusive (86 entries), module-load fail-loud asserts on length (`!== 86`), termini (48/133), AND a de-duplication guard (`new Set(CHAIN_PHASES).size !== CHAIN_PHASES.length`) that length+termini alone would not catch. `CHAIN_SKIP = new Set([])`, never populated.
- **The GA-2 correct-token guardrail (this plan's central deliverable):** the apex's AUDIT check passes `['v1.18-phases']` (v1.18's OWN archival root) to `resolveArchivedPhasePath` — a deliberate correction, NOT a copy of check-phase-128's frozen-and-wrong `['v1.16-phases']` predecessor-root token (which check-phase-119/125/128 all carry, silently masked as permanent SKIP-PASS). An inline code comment at the AUDIT check block documents both (a) the token correction away from the 3-generation-copied bug, and (b) that resolver-null → SKIP-PASS is legitimate pre-close-gate behavior (134-VERIFICATION.md doesn't exist until Plan 134-05), not the silent-wrong bug class the correction guards against. No throw-on-resolver-null was added — that would contradict the apex's own "exits 0 standalone pre-close-gate" acceptance criterion.
- Ran `node scripts/validation/check-phase-134.mjs --verbose` standalone (full non-nested [48..133] recursion): **88 PASS, 0 FAIL, 1 SKIPPED** — 89 total checks (AUDIT + 86 CHAIN + AUDIT-HARNESS + SELF), derived from the actual `checks.push()` count rather than hardcoded, matching the research's predicted 89 (128's chain had 83 total for 80 CHAIN entries; 134's chain is 86, so 89 is the correctly-derived total). The single SKIP is the legitimate pre-close-gate AUDIT skip.
- Authored `audit-harness-v1.18-integrity.yml` (15th CI coexistence workflow) via verbatim copy-and-relabel of `audit-harness-v1.17-integrity.yml`: 5 leaf jobs (`check-phase-129` through `check-phase-133`), the standalone `check-phase-134` job, and `linux-chain-ubuntu-latest` (DUAL-APEX preserved per D-128-4/GA-4 — both run the full [48..133] recursion, intentionally not deduplicated, neither carries `CHECK_PHASE_NESTED=1`). `harness-run` job's checkout carries no `ref:` — CARVE-1's root cause (frozen predecessor harnesses validating live HEAD) is deliberately left untouched per D-04.
- Verified all Task 2 acceptance-criterion greps explicitly: `grep -c "v1.18-phases"` >= 1, `grep -Ec "v1.1[67]-phases"` == 0 (had to reword one explanatory comment that incidentally matched the literal pattern — see Deviations), the reviewable design-decision comment (`resolver-null|SKIP-PASS legitimate|corrected token`) is present, and `grep -q "v1.18-milestone-audit"` in the new workflow succeeds.

## Task Commits

Each task was committed atomically:

1. **Task 1: Author the 5 leaf validators check-phase-129..133** - `63bb0665` (feat)
2. **Task 2: Author apex check-phase-134 + the 15th CI workflow; prove apex green standalone** - `71f1509a` (feat)

**Plan metadata:** (this commit, pending)

## Files Created/Modified

- `scripts/validation/check-phase-129.mjs` - NEW. Leaf validator: STD-05 Admin Decision-Point Block Format + D-02 ruling + recipe-template.md TEMPLATE-SENTINEL (CLASS-01/02).
- `scripts/validation/check-phase-130.mjs` - NEW. Leaf validator: recipe presence, Step 5a/5b kiosk-vs-SharedPC fork, anti-feature callouts, HYG-04 RE-084 Wi-Fi correction (AVD-01..05, HYG-04).
- `scripts/validation/check-phase-131.mjs` - NEW. Leaf validator: recipe presence, unsupported-feature callouts, guest-session decision block, Step 6/7 layered-config worked example (IPAD-01..04).
- `scripts/validation/check-phase-132.mjs` - NEW. Leaf validator: RE-index Approved rows for RE-222/223, regenerated filename-map entries, index.md nav section, hubs-not-wired confirmation (CLASS-03/04).
- `scripts/validation/check-phase-133.mjs` - NEW. Leaf validator: 14 re-pinned v1.4..v1.16 sidecars valid JSON, stderr-budget n:1000 at check-phase-60/61 with check-phase-48 correctly held at n:200 (TOOL-04/06).
- `scripts/validation/check-phase-134.mjs` - NEW. Apex: CHAIN[48..133] (86 entries, fail-loud + de-dup asserts), AUDIT via corrected `['v1.18-phases']` token, AUDIT-HARNESS on `v1.18-milestone-audit.mjs`, SELF dual-invariant. Standalone: 88 PASS/0 FAIL/1 SKIPPED.
- `.github/workflows/audit-harness-v1.18-integrity.yml` - NEW. 15th CI coexistence workflow: parse/path-match/harness-run + linux-chain-ubuntu-latest + 5 leaf jobs + standalone apex job + rotting-external-quarterly + pin-helper-advisory (continue-on-error: true preserved).

## Apex Derived Check Count (HARN-12 acceptance criterion)

**89 total checks** (AUDIT + 86 CHAIN entries + AUDIT-HARNESS + SELF), confirmed via `--verbose` run, not hardcoded: **88 PASS, 0 FAIL, 1 SKIPPED**. Matches the research's arithmetic prediction (128's apex was 83 checks for an 80-entry chain; 134's chain grew by 6 to 86, so the total grew by 6 to 89).

## Decisions Made

- Used `['v1.18-phases']` for the apex archive-root token — the objectively correct own-milestone root, verified against the live archival pattern (`ls .planning/milestones/*-phases/` confirms each milestone's phases, including its own close phase, archive under its own `vX.Y-phases/` root). Did NOT copy check-phase-128's frozen `['v1.16-phases']` predecessor-root token.
- Kept leaf validators (129-133) needle-only against durable `docs/`/`scripts/` deliverables, deliberately avoiding any reference to `.planning/phases/` ephemeral artifacts (which get archived at the *next* milestone's close) — this sidesteps the archival-drift class of bug entirely for the 5 non-apex files, since only the apex needs (and gets) the resolver.
- `check-phase-133`'s needle set covers TOOL-04 (14-sidecar valid-JSON check) and TOOL-06 (stderr-budget n:1000/n:200 split) but does not needle-check TOOL-05, since TOOL-05 was re-scoped per CARVE-2 to "verify + attest" with no durable code artifact produced (the attestation lives in `133-ONE-N-ATTESTATION.md`, a `.planning/phases/` doc that would require the same archival-drift risk a leaf validator is designed to avoid).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Explanatory comment in check-phase-134.mjs incidentally matched the "no stale token" acceptance-criterion grep**
- **Found during:** Task 2, immediately after authoring check-phase-134.mjs, while running the plan's own verify greps before proceeding to the standalone apex run
- **Issue:** A module-header comment documenting the archive-root-token bug (correctly describing check-phase-128's wrong token as an example) literally contained the substring `v1.16-phases`, tripping `grep -Eq "v1.1[67]-phases"` — which per the plan's acceptance criteria must find ZERO matches in the new apex file
- **Fix:** Reworded the comment to describe the bug ("predecessor-milestone, one generation stale") without spelling out the literal wrong-token string, preserving the same documentation intent without the false-positive match
- **Files modified:** scripts/validation/check-phase-134.mjs
- **Verification:** Re-ran `grep -Ec "v1.1[67]-phases" scripts/validation/check-phase-134.mjs` → 0; `grep -c "v1.18-phases"` → 4 (correct token still present in the resolver call + comments)
- **Committed in:** `71f1509a` (Task 2 commit — caught and fixed before the commit, not a follow-up)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Documentation-only wording fix inside a comment; zero behavioral change to the resolver call or the token itself. No scope creep.

## Issues Encountered

None beyond the deviation above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

All 6 new validators exist and are green; the apex (`check-phase-134.mjs`) is proven green standalone with the full non-nested [48..133] recursion (88/0/1). The 15th CI workflow exists with the correct dual-apex + 5-leaf-job + no-ref shape. Plan 134-04 (3-axis terminal re-audit) can proceed: Axis 1 (Windows fresh-clone, advisory per GA-1), Axis 2 (Linux GHA via this new workflow, authoritative per D-03), Axis 3 (independent-host zero-context subagent). No blockers — the apex's AUDIT check will correctly transition from SKIP to real PASS once Plan 134-05's close-gate authors `134-VERIFICATION.md` under the (now-verified-correct) `v1.18-phases` archival root.

---
*Phase: 134-v117-pin-16th-path-a-lineage-bump-terminal-close*
*Completed: 2026-07-20*

## Self-Check: PASSED

- FOUND: scripts/validation/check-phase-129.mjs
- FOUND: scripts/validation/check-phase-130.mjs
- FOUND: scripts/validation/check-phase-131.mjs
- FOUND: scripts/validation/check-phase-132.mjs
- FOUND: scripts/validation/check-phase-133.mjs
- FOUND: scripts/validation/check-phase-134.mjs
- FOUND: .github/workflows/audit-harness-v1.18-integrity.yml
- FOUND: .planning/phases/134-v117-pin-16th-path-a-lineage-bump-terminal-close/134-03-SUMMARY.md
- FOUND: 63bb0665 (Task 1 commit)
- FOUND: 71f1509a (Task 2 commit)
- FOUND: 608d1bca (Summary commit)
