---
phase: 145-corpus-correction-validator-gate-archival-drift-fix
plan: 05
subsystem: docs
tags: [markdown-corpus, validator-harness, svg-generation, archival-drift, linux]

requires:
  - phase: 145-01
    provides: renamed [v1.5-frozen @ ba2cbc0] assertion and frozen-read conversion baseline
provides:
  - "0 .planning/ path references anywhere under docs/ (broad and narrow forms both return 0)"
  - "0 occurrences of the superseded Ubuntu 22.04 LTS token anywhere under docs/ or scripts/generate-diagrams.py"
  - "regenerated docs/diagrams/decision-tree-09-linux-triage.svg, proven idempotent against the other 13 diagrams"
  - "145-EVIDENCE.md — the SVG regeneration idempotency proof, the only close evidence for that success-criterion half"
affects: [146, 147, 152, 153]

actuals:
  tokens: 22919
  tasks: 2
  commits: 2

tech-stack:
  added: []
  patterns:
    - "same-commit validator update: when a corpus correction breaks an old live check-phase-NN.mjs pin, update the pin in the same commit rather than reverting the content fix (precedent already documented at check-phase-49.mjs's CDI-02 comment)"

key-files:
  created:
    - .planning/phases/145-corpus-correction-validator-gate-archival-drift-fix/145-EVIDENCE.md
  modified:
    - docs/_glossary-apple-business.md
    - docs/_glossary-linux.md
    - docs/l2-runbooks/25-linux-agent-investigation.md
    - docs/cross-platform/apple-business/10-apple-tv-lifecycle.md
    - docs/linux-lifecycle/01-linux-prerequisites.md
    - docs/decision-trees/09-linux-triage.md
    - docs/diagrams/decision-tree-09-linux-triage.svg
    - scripts/generate-diagrams.py
    - scripts/validation/check-phase-49.mjs
    - 22 further docs/ markdown files carrying the superseded Ubuntu version (see Files Created/Modified)

key-decisions:
  - "CI-3 (Managed Apple ID -> Managed Apple Account label-lag) had zero corpus occurrences left after stripping .planning/ paths; inlined its substance (sourced from the archived v1.6 PITFALLS.md at commit 78be4743) into _glossary-apple-business.md's Terminology Usage Notes instead of leaving it undefined"
  - "Sub-OU's Phase-62-deferred pointer targeted a phase directory that no longer exists; rewrote to state the deferred/unconfirmed fact without the dead path"
  - "check-phase-49.mjs's V-49-10 hard-pinned a literal Ubuntu 20.04/22.04/24.04 3-row regex; updated the pin to 20.04/24.04/26.04 in the same commit as the content sweep, since the file's own CDI-02 comment documents same-commit validator updates as the sanctioned pattern"
  - "Where 26.04's actual kernel version is unknowable in advance, used the corpus's existing [verify-on-current-Ubuntu] freshness marker rather than fabricating a number"
  - "Did not invent a 26.04 Ubuntu codename (real-world codename not yet public); left the codename column blank in the prerequisites matrix rather than guess"
  - "RHEL 9/10 support and the RHEL-8-vs-9/10 intra-Microsoft conflict were stated only in docs/decision-trees/09-linux-triage.md (paired with the SVG subtitle), not swept across all 26 files -- REQUIREMENTS.md FIX-09 text and the plan's own <verify> blocks only test that one site"

patterns-established:
  - "0-occurrence textual bans (like D-44's 22.04 close criterion) can conflict with old live check-phase-NN.mjs literal-content pins; check for such pins with a full apex run before treating a sweep as done"

requirements-completed: [FIX-09, FIX-11]

coverage:
  - id: D1
    description: "FIX-11: all 11 .planning/ path references across 4 docs/ files removed; every stripped identifier (PITFALL-2/4, OP-1/2/3/7, CI-2/3) retains >=1 defining occurrence in docs/"
    requirement: "FIX-11"
    verification:
      - kind: other
        ref: "grep -rn \"\\.planning/\" docs/ --include='*.md' | wc -l"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-nav-hub-links.mjs"
        status: pass
      - kind: other
        ref: "node scripts/validation/c17-eee-contract.mjs"
        status: pass
    human_judgment: false
  - id: D2
    description: "FIX-09: Ubuntu 22.04 swept to 24.04/26.04 LTS across 26 markdown files plus the generator; Linux triage SVG regenerated (not hand-edited) and proven idempotent against the other 13 diagrams; RHEL 9/10 + the RHEL-8-vs-9/10 conflict stated in the paired markdown page"
    requirement: "FIX-09"
    verification:
      - kind: other
        ref: "grep -rn \"22\\.04\" docs/ scripts/generate-diagrams.py | wc -l"
        status: pass
      - kind: other
        ref: "diff -rq against pre-run diagrams copy (145-EVIDENCE.md)"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-phase-144.mjs (apex chain)"
        status: pass
    human_judgment: false

duration: 25min
completed: 2026-08-19
status: complete
---

# Phase 145 Plan 05: FIX-11 Archival-Drift Fix + FIX-09 Ubuntu/SVG Sweep Summary

**Removed all 11 `.planning/` path references from docs/ (with substance inlined for 3 orphan-risk identifiers) and swept the superseded Ubuntu 22.04 LTS claim to 24.04/26.04 LTS across 26 files plus a regenerated (not hand-edited) Linux triage diagram, closing both with the apex chain at 101 PASS / 0 FAIL / 0 SKIPPED.**

## Performance

- **Duration:** ~25 min
- **Started:** 2026-08-19T17:25:00Z (approx, first grep measurement)
- **Completed:** 2026-08-19T17:51:31Z
- **Tasks:** 2
- **Files modified:** 32 (4 in Task 1, 28 in Task 2 including 1 new evidence file)

## Accomplishments
- FIX-11: `grep -rn "\.planning/" docs/ --include='*.md'` now returns 0 (both the broad and REQUIREMENTS' narrow form) — the trap that reddened `check-nav-hub-links` → `check-phase-143` → the apex when v1.19's research was archived cannot recur when v1.21's own research is archived at close.
- FIX-09: `grep -rn "22\.04" docs/ scripts/generate-diagrams.py` now returns 0 across the measured 26-file / 77-line set; `docs/diagrams/decision-tree-09-linux-triage.svg` was produced by `scripts/generate-diagrams.py` (one edited subtitle line, generator run unmodified), not text-edited.
- Idempotency proof recorded in `145-EVIDENCE.md`: `diff -rq` against a pre-run copy names exactly one differing file (the Linux triage diagram); the other 13 SVGs are byte-identical by md5sum before and after.
- Caught and fixed a real regression: `check-phase-49.mjs`'s `V-49-10` hard-pinned a literal 3-row Ubuntu-version regex that the sweep broke; updated the pin in the same commit per the file's own documented same-commit-update convention, restoring the apex to 101/0/0.

## Task Commits

1. **Task 1: FIX-11 — remove every planning-path reference from docs/** - `9fd7cf1c` (fix)
2. **Task 2: FIX-09 — Ubuntu version sweep + SVG regeneration** - `9efb66c8` (fix)

**Plan metadata:** (this commit, docs)

## Files Created/Modified

**Task 1 (FIX-11):**
- `docs/_glossary-apple-business.md` - 7 sites: OP-1/2/3/7 path-stripped (identifiers retain other defining occurrences), Sub-OU dangling-phase pointer rewritten, CI-2/CI-3 label-lag substance inlined
- `docs/_glossary-linux.md` - PITFALL-2 link unwrapped (its own next clause already carries the substance)
- `docs/l2-runbooks/25-linux-agent-investigation.md` - PITFALL-4 identifier dropped (was its only corpus occurrence); substance already present in the same sentence
- `docs/cross-platform/apple-business/10-apple-tv-lifecycle.md` - 2 sites pointing at `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` (a file outside the published bundle) rewritten to a generic deferred-tracking-list reference

**Task 2 (FIX-09):**
- `docs/linux-lifecycle/01-linux-prerequisites.md` - the canonical Supported Ubuntu Versions matrix rewritten to 24.04/26.04 supported + 20.04 dropped; upgrade-path guidance rephrased to avoid naming the now-unmentionable intermediate release
- `docs/decision-trees/09-linux-triage.md` - version list matched to the SVG subtitle; RHEL 9/10 support and the RHEL-8-vs-9/10 intra-Microsoft conflict added as a new blockquote (split across two `>` blocks to stay under C17's 200-char cap)
- `docs/diagrams/decision-tree-09-linux-triage.svg` - regenerated via `scripts/generate-diagrams.py`
- `scripts/generate-diagrams.py` - line 1544 subtitle updated to "Ubuntu 24.04 / 26.04 LTS · RHEL 9 / 10"
- `scripts/validation/check-phase-49.mjs` - V-49-10's pinned regex updated 20.04/22.04/24.04 → 20.04/24.04/26.04 (deviation, see below)
- `docs/_glossary-linux.md`, `docs/admin-setup-linux/{00..05}*.md`, `docs/decision-trees/00-initial-triage.md`, `docs/end-user-guides/linux-intune-portal-enrollment.md`, `docs/index.md`, `docs/l1-runbooks/{00-index,30,31,32,33}*.md`, `docs/l2-runbooks/{00-index,24,25,31}*.md`, `docs/linux-lifecycle/00-enrollment-overview.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`, `docs/reference/4-platform-capability-comparison.md`, `docs/reference/linux-capability-matrix.md` - version-string sweep only
- `.planning/phases/145-corpus-correction-validator-gate-archival-drift-fix/145-EVIDENCE.md` - new: the SVG regeneration idempotency proof

## Per-Identifier Surviving-Occurrence Counts (Task 1, D-30 executor rule)

| Identifier | Occurrences after edit | Site treatment |
|---|---|---|
| PITFALL-2 | 9 files | link unwrapped, label kept (D-31) |
| PITFALL-4 | 0 (dropped) | its only occurrence; substance was already in the same sentence |
| CI-2 | 4 files | path stripped, label kept — other defining occurrences already existed |
| CI-3 | 1 file (`_glossary-apple-business.md`) | substance inlined at the Terminology Usage Notes site — this is now its sole defining occurrence, sourced from archived v1.6 PITFALLS.md (git commit `78be4743`) |
| OP-1 | 14 files | path stripped, label kept |
| OP-2 | 19 files | path stripped, label kept |
| OP-3 | 19 files | path stripped, label kept |
| OP-7 | 2 files | path stripped, label kept |
| Sub-OU / Phase-62 pointer | n/a (not an ID) | dangling directory reference rewritten to state the deferred fact without the dead path |

## Measured File/Line Counts (Task 2)

- Before: 26 markdown files, 77 line matches for `\b22\.04\b` (matches D-44's corrected count, not SC#5's original 25)
- After: 0 files, 0 line matches for `22\.04` across `docs/` and `scripts/generate-diagrams.py`
- SVG diff: `diff -rq` against pre-run copy → exactly 1 differing file (`decision-tree-09-linux-triage.svg`); other 13 byte-identical by md5sum
- Full proof: [145-EVIDENCE.md](./145-EVIDENCE.md)

## Decisions Made
- CI-3 had zero surviving corpus occurrences after the `.planning/` strip (both its mentions were the two sites being edited); inlined its substance (sourced from the archived pre-rebrand `PITFALLS.md` at git commit `78be4743`, since the working-tree `.planning/research/PITFALLS.md` is v1.21's own research and no longer carries the v1.6-era CI-2/CI-3 definitions) into the Terminology Usage Notes site rather than leaving it undefined.
- Left the Ubuntu 26.04 codename and exact kernel-version cells as `[verify-on-current-Ubuntu]` (the corpus's existing freshness-marker convention) rather than fabricate values not yet public.
- Stated the RHEL 9/10 support fact and the RHEL-8-vs-9/10 conflict only in `docs/decision-trees/09-linux-triage.md` (paired with the SVG subtitle per D-49), not swept across all 26 files — this matches both REQUIREMENTS.md's FIX-09 text ("wherever a supported-version list appears") interpreted narrowly at the one site the plan's own `<verify>` blocks test, and D-48's scope note that the RHEL conflict rides with the diagram's markdown page specifically.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] check-phase-49.mjs's V-49-10 hard-pinned the superseded Ubuntu version list**
- **Found during:** Task 2 (Ubuntu sweep), during the mandatory apex chain gate
- **Issue:** `check-phase-49.mjs` (a live, non-frozen, always-invoked apex chain member) asserts the Supported Ubuntu Versions matrix in `01-linux-prerequisites.md` has exactly 3 rows matching the literal regex `Ubuntu (20\.04|22\.04|24\.04) LTS`. The FIX-09 sweep's own closing criterion (`grep -rn "22\.04" docs/ ... | wc -l` → 0) is unconditional and directly conflicts with this pin — satisfying one broke the other. `node scripts/validation/check-phase-144.mjs` dropped to 100 PASS / 1 FAIL after the content sweep.
- **Fix:** Updated `V-49-10`'s regex and name to `20\.04|24\.04|26\.04`, matching the corrected matrix. This follows the file's own documented convention at the `ENROLLMENT_OVERVIEW_PATH` comment ("CDI-02: Pinned H2 strings — Phase 50+ renaming requires same-commit validator update") — old phase validators are expected to be updated in the same commit as the content change they gate, not treated as immutable/frozen (this file has no `[vX.Y-frozen @ ...]` designation and reads live via plain `readFileSync`).
- **Files modified:** `scripts/validation/check-phase-49.mjs`
- **Verification:** `node scripts/validation/check-phase-49.mjs` → 22/22 passed; `node scripts/validation/check-phase-144.mjs` → 101 PASS / 0 FAIL / 0 SKIPPED
- **Committed in:** `9efb66c8` (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Necessary to reconcile the plan's absolute textual-erasure closing criterion with an old live validator's literal-content pin; no scope creep beyond the one regex line.

## Issues Encountered
- The C17 blockquote-length cap (#12, ≤200 chars) tripped when the RHEL conflict sentence was first added as a single blockquote paragraph in `09-linux-triage.md` (534 chars). Resolved by splitting into three separate `>` blocks divided by genuine blank lines (the corpus's own established pattern for long blockquote content), each under the cap. Re-verified `c17-eee-contract.mjs` at 234/0 after the split.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- FIX-11 and FIX-09 are both closed; ROADMAP Success Criteria 3 and 5 are satisfied and over-satisfied (broad + narrow planning-path greps both 0; superseded version gone from markdown and generator; diagram regenerated not hand-edited; RHEL conflict stated where the sourced version list lives).
- The apex chain (`check-phase-144.mjs`) is green at 101/0/0 after both of this plan's commits — archiving v1.21's own research at close can no longer re-redden the nav-hub checker, `check-phase-143`, or the apex via the FIX-11 vector.
- No blockers for Phase 146 (driver/firmware depth) or Phase 147 (Linux update-delivery guide, which will read the now-corrected `01-linux-prerequisites.md` matrix).

## Self-Check: PASSED
- FOUND: .planning/phases/145-corpus-correction-validator-gate-archival-drift-fix/145-EVIDENCE.md
- FOUND: commit 9fd7cf1c
- FOUND: commit 9efb66c8

---
*Phase: 145-corpus-correction-validator-gate-archival-drift-fix*
*Completed: 2026-08-19*
