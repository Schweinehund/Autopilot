---
phase: 139-governance-carve-fetch-depth-retrofit-shallow-job-repair
plan: 02
subsystem: infra
tags: [frozen-read, git-plumbing, chain-validator-tooling, gov-02]

requires: ["139-01"]
provides:
  - "lsTreeAtClose(milestoneTag, dirPrefix, { ext } = {}) + 16 lsTreeAtVxxClose convenience exports on scripts/validation/_lib/frozen-at-close.mjs"
  - "frozenCause(err) six-pattern typed classifier, attached to both readAtClose and lsTreeAtClose throws, cause prepended to the FRONT of err.message"
  - "--self-test CLI entry point (6/6 assertions incl. a real file:// shallow-clone arm), import-safe"
  - "GOV-02-LEDGER.md rows recording the grep-before-edit + D-42 21-importer blast-radius gate (pre-edit and post-edit)"
affects: [140-frozen-aware-harness-conversion]

actuals:
  tokens: 4900
  tasks: 3
  commits: 3

tech-stack:
  added: []
  patterns:
    - "Typed error-cause classifier attached as err.frozenCause + cause prepended to the FRONT of err.message (not appended) so check-phase-60.mjs:247's 500-char detail truncation never silently cuts it off"
    - "git ls-tree -r -z --name-only <sha> -- <prefix>, split on NUL, mandatory .filter(Boolean) to drop the phantom trailing empty element from git's NUL-termination (not just delimiting) of the final entry"
    - "Import-safe CLI self-test gating: fileURLToPath(import.meta.url) === resolve(process.argv[1]) && argv.includes('--self-test'), so a library file consumed by 21 importers stays a pure no-op on import"
    - "file:// URL is mandatory for a local shallow-clone negative test; a bare local path silently ignores --depth and produces a full (non-shallow) clone"

key-files:
  created: []
  modified:
    - scripts/validation/_lib/frozen-at-close.mjs
    - .planning/milestones/v1.20-GOV-02-LEDGER.md

key-decisions:
  - "check-phase-73.mjs's V-73-AUDIT-HARNESS check (an unrelated subprocess re-run of v1.7-milestone-audit.mjs) fails when the file is invoked WITHOUT CHECK_PHASE_NESTED=1 — this is a pre-existing, unrelated standalone-red condition (part of the ten-member set scoped to Phases 141-142 per PROJECT.md), not a regression from this plan's edit. Verified clean via CHECK_PHASE_NESTED=1 node scripts/validation/check-phase-73.mjs (exit 0), matching the repo's own convention for exercising these two pinned-literal checks (V-73-LIB-EXISTS, V-120-HYG01) without tripping an unrelated harness health check."
  - "D-42's post-edit apex confirmation used the TOP-LEVEL (unnested) invocation of check-phase-138.mjs, not CHECK_PHASE_NESTED=1 pre-set — pre-setting the env var before invoking the apex itself makes it treat itself as an already-nested child and skip its own 90-member chain expansion (2 PASS / 91 SKIPPED), which is not a meaningful regression signal. The apex's own internal recursion sets CHECK_PHASE_NESTED=1 for its children automatically; the correct top-level invocation is a bare `node scripts/validation/check-phase-138.mjs`, which reported 93 PASS, 0 FAIL, 0 SKIPPED — identical to the pre-Phase-139 known-good figure recorded in PROJECT.md."

requirements-completed: [SWEEP-04, GOV-02]

coverage:
  - id: D1
    description: "lsTreeAtClose(milestoneTag, dirPrefix, { ext } = {}) + 16 lsTreeAtVxxClose convenience exports, no raw-SHA form, reuses MILESTONE_CLOSE_SHAS pin gate verbatim"
    requirement: "SWEEP-04"
    verification:
      - kind: unit
        ref: "node -e verify block: 34 entries @ v1.5-close for docs/l1-runbooks, known member present, no phantom empty element, [] for valid-but-empty prefix, V14 unpinned throws"
        status: pass
      - kind: other
        ref: "16 lsTreeAtV* exports confirmed via Object.keys filter; grep -c \"'-z'\" and grep -c 'filter(Boolean)' both >=1"
        status: pass
    human_judgment: false
  - id: D2
    description: "frozenCause six-pattern union classifier, attached to both readers, cause at the FRONT of err.message"
    requirement: "SWEEP-04"
    verification:
      - kind: unit
        ref: "node -e: readAtClose on an absent path throws with e.frozenCause==='absent-path' and /^\\[absent-path\\]/.test(e.message)"
        status: pass
      - kind: other
        ref: "grep -c 'not a tree object' and grep -c 'exists on disk, but not in' both >=1 (six-pattern union, not the two-pattern one)"
        status: pass
    human_judgment: false
  - id: D3
    description: "--self-test: six D-39 assertions including the real file:// shallow-clone arm, 6/6 PASS, import-safe"
    requirement: "SWEEP-04"
    verification:
      - kind: integration
        ref: "node scripts/validation/_lib/frozen-at-close.mjs --self-test (6/6 PASS, measured wall-clock 232 entries + 1 read in ~100ms)"
        status: pass
      - kind: unit
        ref: "node -e import-only smoke test exits 0 and prints nothing from the self-test"
        status: pass
    human_judgment: false
  - id: D4
    description: "GOV-02 grep-before-edit (target-scoped, path + symbol) + 21-importer pre/post-edit blast-radius gate, zero tally/exit-code drift"
    requirement: "GOV-02"
    verification:
      - kind: other
        ref: "21-importer count confirmed via the plan's own node verify one-liner; diff of pre/post baseline captures reports zero differences"
        status: pass
      - kind: integration
        ref: "node scripts/validation/check-phase-138.mjs (top-level apex) 93 PASS/0 FAIL/0 SKIPPED unchanged; check-phase-73.mjs and check-phase-120.mjs (the two pinned-literal consumers) both exit 0 under CHECK_PHASE_NESTED=1"
        status: pass
    human_judgment: false
  - id: D5
    description: "carve-gate.mjs stays green across every commit; both edited paths (frozen-at-close.mjs, GOV-02-LEDGER.md) are on-list / out-of-scope respectively"
    verification:
      - kind: integration
        ref: "node scripts/validation/carve-gate.mjs exits 0 after every task commit (Category 4 allowlist entry for frozen-at-close.mjs; .planning/ excluded from gate scope for the ledger)"
        status: pass
    human_judgment: false

duration: 8min
completed: 2026-08-05
status: complete
---

# Phase 139 Plan 02: Atom 2 — lsTreeAtClose + frozenCause + --self-test Summary

**Extended `_lib/frozen-at-close.mjs` in place with a frozen-tree enumeration API (`lsTreeAtClose`, 16 convenience exports), a six-pattern typed error classifier attached to both readers, and a six-assertion `--self-test` including a real `file://` shallow-clone negative test — zero regression across all 21 real importers.**

## Performance

- **Duration:** 8 min (commit-to-commit; ~7 min of that spent on the file:// shallow-clone self-test's real `git clone`)
- **Started:** 2026-08-05T14:02:00Z
- **Completed:** 2026-08-05T14:09:34Z
- **Tasks:** 3
- **Files modified:** 2 (`scripts/validation/_lib/frozen-at-close.mjs`, `.planning/milestones/v1.20-GOV-02-LEDGER.md`)

## Accomplishments

- `lsTreeAtClose(milestoneTag, dirPrefix, { ext } = {})` added, reusing the `MILESTONE_CLOSE_SHAS` pin gate verbatim (no raw-SHA form), invoking `git ls-tree -r -z --name-only <sha> -- <prefix>`, splitting on NUL with a mandatory `.filter(Boolean)` to drop the phantom trailing empty element, returning repo-relative paths, throwing on any git failure and returning `[]` only for a valid-but-empty prefix. 16 `lsTreeAtVxxClose` convenience exports added mirroring the existing `readAtVxxClose` pattern.
- `frozenCause(err)` added: a six-pattern union classifier (`unreachable-sha` ← 3 patterns, `absent-path` ← 2 patterns, else `other`), coercing `stderr`/`message` to strings so a Buffer stderr cannot silently fall through. Both `readAtClose` and `lsTreeAtClose` now attach `err.frozenCause` and prepend the typed cause to the FRONT of `err.message` (not appended, since `check-phase-60.mjs:247` truncates at 500 chars) before rethrowing — an enrichment, never a swallow.
- `--self-test` CLI entry point added, import-safe (gated on direct execution + the `--self-test` flag), running six numbered assertions per D-39: exact count 34 for `docs/l1-runbooks` @ v1.5-close, known-member presence, unpinned-tag throw, valid-but-empty-prefix `[]`, a real `file:///…` shallow clone throwing `frozenCause=unreachable-sha` (with a hard guard on `.git/shallow` existing), and a measured wall-clock for a full `docs/` enumeration + one read (232 entries, ~100ms — recorded for Phase 140's SWEEP-06). Prints `6/6 PASS`.
- GOV-02 discipline followed throughout: Task 1's target-scoped grep (path literal + symbol, across `scripts/validation/`, `scripts/pipeline/`, `.github/workflows/`) confirmed the 21-vs-24 importer discrepancy and identified the two files (`check-phase-73.mjs`, `check-phase-120.mjs`) that pin literal substrings of this file's exact text. Task 3's D-42 post-edit blast-radius gate re-ran all 21 real importers under `CHECK_PHASE_NESTED=1` and diffed byte-for-byte against the Task 1 baseline — zero differences in tally or exit code.

## Task Commits

1. **Task 1: GOV-02 grep-before-edit + capture the 21-importer pre-edit baseline** - `45d4eb58` (docs)
2. **Task 2: Implement frozenCause and lsTreeAtClose in the frozen-read library** - `23e70e83` (feat)
3. **Task 3: Six-assertion --self-test + the 21-importer post-edit blast-radius gate** - `20ac67dc` (test)

**Plan metadata:** (this commit, docs: complete plan)

## Files Created/Modified

- `scripts/validation/_lib/frozen-at-close.mjs` - `frozenCause` classifier, `readAtClose`'s throw enrichment, `lsTreeAtClose` + 16 convenience exports, `--self-test` CLI entry point
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` - Two new rows: Task 1's grep-before-edit + pre-edit baseline, Task 3's post-edit blast-radius gate result

## Decisions Made

- `check-phase-73.mjs`'s `V-73-AUDIT-HARNESS` check fails on a bare (non-nested) invocation for a reason entirely unrelated to this plan's edit — it subprocess-reruns `v1.7-milestone-audit.mjs`, which is a known pre-existing standalone-red item outside this phase's scope (Phases 141-142 own that closure). Verified the two checks this plan's edit could actually break (`V-73-LIB-EXISTS`, `V-120-HYG01`) pass cleanly via `CHECK_PHASE_NESTED=1`.
- Confirmed the correct invocation shape for D-42's apex regression check: the TOP-LEVEL (unnested) `node scripts/validation/check-phase-138.mjs` call is the meaningful one (93 PASS/0 FAIL/0 SKIPPED, unchanged from the pre-Phase-139 baseline) — pre-setting `CHECK_PHASE_NESTED=1` before invoking the apex itself makes it treat itself as an already-nested child and skip its own 90-member chain expansion, which is not a useful regression signal for this task.

## Deviations from Plan

None — plan executed exactly as written. Both items above are verification-method clarifications discovered while running the plan's own acceptance criteria, not code changes outside the plan's `<files>` scope.

## Issues Encountered

None beyond the two verification-method clarifications documented above.

## User Setup Required

None.

## Next Phase Readiness

- `lsTreeAtClose` and `frozenCause` are live and self-tested; Phase 140 (`SWEEP-05..08`, ~150 call sites across 17 harnesses) can now consume both without any further shape change.
- The wall-clock figure measured for `--self-test` assertion (vi) — full `docs/` prefix enumeration @ v1.5-close plus one read, 232 entries in ~100ms — is recorded here for Phase 140's SWEEP-06 (the `check-phase-60.mjs:261` 60s-timeout outlier investigation).
- GOV-02-LEDGER.md now carries rows for both `.planning/ROADMAP.md`/`REQUIREMENTS.md` (Plan 01) and `_lib/frozen-at-close.mjs` (this plan, two rows: pre-edit and post-edit).
- Plan 03 (the four fail-loud call sites + the `file://` negative harness, per D-41 atom order) is next; it can now import `frozenCause` directly rather than re-deriving the classification logic.
- No blockers.

---
*Phase: 139-governance-carve-fetch-depth-retrofit-shallow-job-repair*
*Completed: 2026-08-05*

## Self-Check: PASSED

All modified files verified present on disk; all 3 task commit hashes (`45d4eb58`, `23e70e83`, `20ac67dc`) verified in `git log --oneline --all`.
