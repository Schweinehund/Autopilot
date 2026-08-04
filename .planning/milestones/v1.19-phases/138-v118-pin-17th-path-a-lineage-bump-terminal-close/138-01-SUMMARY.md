---
phase: 138-v118-pin-17th-path-a-lineage-bump-terminal-close
plan: 01
subsystem: infra
tags: [validation-harness, frozen-at-close, back-anchor-pin, milestone-close, git-forensics]

# Dependency graph
requires:
  - phase: 134-v117-pin-16th-path-a-lineage-bump-terminal-close
    provides: "V117 entry + readAtV117Close export in _lib/frozen-at-close.mjs (the shape mirrored here); the v1.18 close-gate SHA 7af8a147 itself, discharged onto origin/master by the owner's PIPE-02 push"
provides:
  - "MILESTONE_CLOSE_SHAS.V118 = '7af8a147' pinning the v1.18 corpus (back-anchor invariant)"
  - "readAtV118Close export for frozen reads at the v1.18 close-gate SHA"
  - "WAVE0_ANCHOR SHA (64ee54dd6a4d7ec7617521a988912e10df781808), the diff base for Plan 138-04's byte-unchanged HARD gate"
  - "The independently derived 47-surface frozen-set inventory + the four shared _lib dependency freeze dispositions, both consumed verbatim by Plan 138-04"
affects: ["138-02", "138-03", "138-04", "138-06"]

# Actuals (#2632)
actuals:
  tokens: 556
  tasks: 2
  commits: 1

# Tech tracking
tech-stack:
  added: []
  patterns: ["back-anchor pin append (MILESTONE_CLOSE_SHAS + readAtV<N>Close convenience export)", "subject-line pair discriminator for close-gate SHA recovery"]

key-files:
  created: []
  modified:
    - scripts/validation/_lib/frozen-at-close.mjs

key-decisions:
  - "V118 recovered via the subject-line pair discriminator (git log --all --format=\"%H|%s\" | awk matching both /v1\\.18/ and /MILESTONE CLOSE/ in $2), count=1, per STATE.md:32 — the naive dual-token --grep --all-match -1 form was explicitly NOT used (it returns 2 candidates, also matching the v1.17 close-gate b56bba5e)"
  - "47-surface frozen-set inventory derived by listing at Wave 0, not carried from the predecessor's 44 — the predecessor enumeration (v1.18-MILESTONE-AUDIT.md:294) is silent on scripts/pipeline/ and on the four shared _lib dependencies, confirmed by direct read this task"
  - "scripts/pipeline/ exclusion recorded as a v1.19 ruling (not an inherited fact) per D-18 — its only prior citation lives inside commit 6acc429b's own message"

patterns-established:
  - "Wave-0 anchor capture as literally the first action of the phase, before any file touch, held for the whole-phase HARD gate in the terminal close plan"

requirements-completed: [HARN-14]

coverage:
  - id: D1
    description: "V118 back-anchor pin (MILESTONE_CLOSE_SHAS.V118 = '7af8a147') + readAtV118Close export land as an append-only edit to _lib/frozen-at-close.mjs"
    requirement: "HARN-14"
    verification:
      - kind: unit
        ref: "node -e \"import('./scripts/validation/_lib/frozen-at-close.mjs').then(m=>process.exit(m.MILESTONE_CLOSE_SHAS.V118==='7af8a147' && m.MILESTONE_CLOSE_SHAS.V117==='b56bba5' && typeof m.readAtV118Close==='function' && m.readAtV118Close('README.md').length>0 ?0:1))\""
        status: pass
      - kind: other
        ref: "readAtV118Close('this/path/does/not/exist/at/close.md') — asserts loud throw, never empty-string success"
        status: pass
      - kind: other
        ref: "git diff --numstat scripts/validation/_lib/frozen-at-close.mjs (deletions = 0, append-only)"
        status: pass
    human_judgment: false
  - id: D2
    description: "WAVE0_ANCHOR captured before any Phase-138 edit + the independently derived 47-surface frozen-set inventory (16 milestone-audit harnesses + 16 sidecar allowlists + 15 integrity workflows + check-phase-48..134.mjs range) recorded for Plan 138-04's HARD gate"
    requirement: "HARN-14"
    verification:
      - kind: other
        ref: "test \"$(ls scripts/validation/v1.*-milestone-audit.mjs | wc -l)\" = \"16\" && test \"$(ls scripts/validation/v1.*-audit-allowlist.json | wc -l)\" = \"16\" && test \"$(ls .github/workflows/*.yml | wc -l)\" = \"15\""
        status: pass
    human_judgment: false

duration: 3min
completed: 2026-08-04
status: complete
---

# Phase 138 Plan 01: V118 Pin + Wave-0 Frozen-Set Inventory Summary

**Appended the V118 back-anchor pin (SHA 7af8a147, subject-line-recovered, remote-reachable) plus readAtV118Close to `_lib/frozen-at-close.mjs`, and recorded the Wave-0 anchor SHA and the independently derived 47-surface frozen-set inventory that Plan 138-04's byte-unchanged HARD gate will diff against.**

## Performance

- **Duration:** 3 min
- **Started:** 2026-08-04T05:02:15Z
- **Completed:** 2026-08-04T05:04:51Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments
- V118 back-anchor pin landed as a pure append (11 lines added, 0 deleted) to `MILESTONE_CLOSE_SHAS` + `readAtV118Close` export, proven end to end (real bytes read for `README.md` at `7af8a147`, loud throw on an absent path)
- WAVE0_ANCHOR captured via `git rev-parse HEAD` as the literal first action, before any Phase-138 edit landed: `64ee54dd6a4d7ec7617521a988912e10df781808`
- 47-surface frozen-set inventory independently derived by listing (not carried from the predecessor's 44) and recorded, with the four shared `_lib` dependencies named and their freeze status stated

## Task Commits

Each task was committed atomically:

1. **Task 1: End-to-end V118 back-anchor — one frozen read proven from SHA to bytes** - `d46b8704` (feat)
2. **Task 2: Derive and record the 47-surface frozen-set inventory + the four byte-frozen `_lib` dependencies** - no file edit; recorded in this SUMMARY per the task's own spec (`(no file edits — inventory recorded in 138-01-SUMMARY.md)`)

**Plan metadata:** committed alongside this SUMMARY (see final commit below)

## WAVE0_ANCHOR

```
WAVE0_ANCHOR=64ee54dd6a4d7ec7617521a988912e10df781808
```

Captured via `git rev-parse HEAD` before any Phase-138 file was touched. Plan 138-04's byte-unchanged HARD gate runs:

```bash
git diff 64ee54dd6a4d7ec7617521a988912e10df781808..HEAD
```

Sanity-checked this task: at the point of capture the diff against current HEAD lists exactly one file — `scripts/validation/_lib/frozen-at-close.mjs` (this task's own sanctioned append).

## V118 SHA Recovery

**Confirmed SHA:** `7af8a14766d346a348f7adf05d260676dbe4c1b2` (short form `7af8a147`)

**Remote reachability** — `git branch -r --contains 7af8a14766d346a348f7adf05d260676dbe4c1b2` lists `origin/master` (and `origin/HEAD -> origin/master`). Confirmed reachable.

**Recovery method — subject-line pair discriminator (mandated by STATE.md:32, D-31/Pitfall 1), NOT the naive dual-token grep:**

```bash
git log --all --format="%H|%s" | awk -F'|' '$2 ~ /v1\.18/ && $2 ~ /MILESTONE CLOSE/'
```

Output (count = 1):
```
7af8a14766d346a348f7adf05d260676dbe4c1b2|docs(134-05): v1.18 MILESTONE CLOSE — single close-gate commit, 20/20 requirements Validated
```

The bare `git log --all --grep="v1.18" --grep="MILESTONE CLOSE" --all-match -1` form was **deliberately not used** as proof — it is documented (STATE.md:30, CONTEXT `<specifics>`) to return 2 candidates (it also matches the v1.17 close-gate `b56bba5e`), and `-1` would silently resolve to whichever sorts first, not necessarily the correct one.

## End-to-End Proof

- **Successful read:** `readAtV118Close('README.md')` returned non-empty content read from `git show 7af8a147:README.md` (verified via the combined node assertion below; exit 0).
- **Combined assertion** (task's own `<verify>` command):
  ```bash
  node -e "import('./scripts/validation/_lib/frozen-at-close.mjs').then(m=>process.exit(m.MILESTONE_CLOSE_SHAS.V118==='7af8a147' && m.MILESTONE_CLOSE_SHAS.V117==='b56bba5' && typeof m.readAtV118Close==='function' && m.readAtV118Close('README.md').length>0 ?0:1))"
  ```
  Exit code: `0`. This single assertion covers the `[EDGE HARN-14/adjacency]` requirement — `V118` and `V117` are both present as distinct keys and neither overwrote the other (`readAtV117Close`/`readAtV118Close` resolve to `b56bba5` / `7af8a147` respectively).
- **Absent-path failure mode (`[EDGE HARN-14/empty]`):** calling `readAtV118Close('this/path/does/not/exist/at/close.md')` **threw** — `Command failed: git show 7af8a147:this/path/does/not/exist/at/close.md` (a `child_process.execFileSync` non-zero-exit throw). It did NOT return an empty string as a false-success. Observed verbatim:
  ```
  THREW AS EXPECTED: Command failed: git show 7af8a147:this/path/does/not/exist/at/close.md
  ```

## Diff Scope (append-only proof, `[EDGE HARN-14/ordering]`)

```
git diff --numstat scripts/validation/_lib/frozen-at-close.mjs
11      0       scripts/validation/_lib/frozen-at-close.mjs
```

0 deletions — V117 and every entry V18..V117 plus the existing `readAtClose()` and every prior convenience export are byte-unchanged. The V118 entry was inserted immediately after V117 (mirroring its comment block: annotates the Phase 134 Plan 134-05 close-gate, records the full SHA, records that recovery used the subject-line pair discriminator rather than the dual-token grep, and closes with the back-anchor invariant sentence — V119 pin deferred to the v1.20 close). `export const readAtV118Close = (p) => readAtClose('V118', p);` was appended immediately after the existing `readAtV117Close` export line, matching column alignment.

`git diff --name-only` against the pre-task tree shows `scripts/validation/_lib/frozen-at-close.mjs` as the only file this task modified (a pre-existing, pre-task working-tree change to `.planning/STATE.md` from the orchestrator's phase-kickoff bookkeeping was already present before this plan began and is untouched by Task 1/2 — it is committed separately by the plan-completion metadata commit, not part of this feat commit).

## 47-Surface Frozen-Set Inventory (independently derived at Wave 0)

Derived by listing against the working tree exactly as it stood at `WAVE0_ANCHOR` (before any Phase-138 file existed) — never carried from the predecessor's 44.

| Group | Count | Derivation |
|---|---|---|
| Milestone-audit harnesses (`scripts/validation/v1.*-milestone-audit.mjs`) | **16** | `ls scripts/validation/v1.*-milestone-audit.mjs \| wc -l` — v1.4, v1.4.1, v1.5..v1.18 |
| Sidecar allowlists (`scripts/validation/v1.*-audit-allowlist.json`) | **16** | `ls scripts/validation/v1.*-audit-allowlist.json \| wc -l` — v1.4, v1.4.1, v1.5..v1.18 |
| Integrity workflows (`.github/workflows/*.yml`) | **15** | `ls .github/workflows/*.yml \| wc -l` — base `audit-harness-integrity.yml` + v1.5..v1.18 (note: no v1.4/v1.4.1 workflow exists) |
| **Total** | **47** | **16 + 16 + 15 = 47** |

**The predecessor's 44 (`v1.18-MILESTONE-AUDIT.md:294`: 15 milestone-audit `.mjs` + 15 sidecar JSON + 14 integrity workflows) was NOT carried forward.** v1.19 adds one new generation to each of the three groups (v1.18 harness/sidecar/workflow now exist and are frozen), so 15→16, 15→16, 14→15, netting 44→47.

**Predecessor chain-validator range:** `check-phase-48.mjs` through `check-phase-134.mjs` — enumerated by existence check (`for n in $(seq 48 134); do [ -f "scripts/validation/check-phase-$n.mjs" ] ...; done`): **87 files present, 0 missing.**

**Combined Wave-0 byte-unchanged HARD-gate target for Plan 138-04:** the 47 surfaces above + the 87 `check-phase-48..134.mjs` validators + the four shared `_lib` dependencies below, diffed via:

```bash
git diff 64ee54dd6a4d7ec7617521a988912e10df781808..HEAD
```

## Four Shared `_lib` Dependencies (the 47-surface diff does NOT protect these)

The 47-surface diff alone misses a shared-mutable-dependency hole: a one-line edit to any of these silently changes multiple "byte-unchanged" frozen harnesses' behavior while the file-list diff still reports clean.

| Dependency | Importer count | Freeze status this phase | Sanctioned change |
|---|---|---|---|
| `scripts/validation/c17-eee-contract.mjs` | 8 (incl. v1.15–v1.18 milestone-audit harnesses) | **BYTE-FROZEN, no carve-out** | None |
| `scripts/validation/_lib/archive-path.mjs` | 23 | **BYTE-FROZEN, no carve-out** | None |
| `scripts/validation/_lib/exec-fail-detail.mjs` | 31 | **BYTE-FROZEN, no carve-out** | None |
| `scripts/validation/_lib/frozen-at-close.mjs` | 25 | **APPEND-ONLY** | Task 1's V118 entry + `readAtV118Close` export — the sole sanctioned Phase-138 change, already landed this plan |

## `scripts/pipeline/` Exclusion — recorded as a v1.19 ruling, not an inherited fact

`scripts/pipeline/` stays OUT of the byte-unchanged gate. This is recorded here as a fresh **v1.19 ruling** per D-18, not carried as an established fact: the only prior citation of this exclusion lives inside commit `6acc429b`'s own message, and the predecessor audit's 44-surface enumeration (`v1.18-MILESTONE-AUDIT.md:294`) is silent on `scripts/pipeline/` entirely — it neither includes nor excludes it explicitly.

## Files Created/Modified
- `scripts/validation/_lib/frozen-at-close.mjs` - append-only: `MILESTONE_CLOSE_SHAS.V118` entry + `readAtV118Close` export

## Decisions Made
- V118 recovered exclusively via the subject-line pair discriminator (count=1), never the dual-token `--grep --all-match` form (documented 2-candidate false positive)
- 47-surface inventory derived fresh by listing, explicitly not copying the predecessor's 44 — confirmed by direct read of `v1.18-MILESTONE-AUDIT.md:294` that it is silent on `scripts/pipeline/` and the four shared `_lib` dependencies
- `scripts/pipeline/` exclusion restated as a v1.19-scoped ruling rather than an inherited fact

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None. Both preconditions (remote reachability, subject-line SHA confirmation) were satisfied on first check; the PIPE-02 push had already discharged per STATE.md's recorded discharge note before this plan began.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `readAtV118Close` is available for any Phase 138 plan needing frozen reads of the v1.18 corpus
- WAVE0_ANCHOR (`64ee54dd6a4d7ec7617521a988912e10df781808`) and the complete 47-surface + four-`_lib` inventory are recorded here for Plan 138-04's byte-unchanged HARD gate to consume directly, without re-deriving
- Plan 138-02 (17th Path-A lineage bump: `v1.19-milestone-audit.mjs` + sidecar + BASELINE_23 + `check-phase-135..138.mjs`) may proceed; nothing in this plan blocks it
- No blockers or concerns carried forward

---
*Phase: 138-v118-pin-17th-path-a-lineage-bump-terminal-close*
*Completed: 2026-08-04*

## Self-Check: PASSED

- FOUND: `.planning/phases/138-v118-pin-17th-path-a-lineage-bump-terminal-close/138-01-SUMMARY.md`
- FOUND: `scripts/validation/_lib/frozen-at-close.mjs`
- FOUND: commit `d46b8704`
