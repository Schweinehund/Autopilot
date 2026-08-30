---
phase: 153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a
plan: 05
subsystem: infra
tags: [ci-workflow, path-a-lineage, github-actions, fetch-depth, dual-apex]

# Dependency graph
requires:
  - phase: 153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a
    provides: v1.21-milestone-audit.mjs + v1.21-audit-allowlist.json, the 19th Path-A lineage harness and sidecar this workflow's parse/path-match/harness-run jobs reference (153-04)
provides:
  - .github/workflows/audit-harness-v1.21-integrity.yml -- the 18th coexistence CI workflow, 16 jobs, born with full fetch depth on every checkout, referencing check-phase-145..153.mjs (not yet on disk -- authored ahead of the leaf/apex validators per this phase's own wave ordering)
affects: [153-09 (check-phase-153.mjs apex), 153-10/153-12 (evidence capture, dispatches this workflow)]

actuals:
  tokens: 3446
  tasks: 3
  commits: 3

tech-stack:
  added: []
  patterns:
    - "18th-generation CI workflow is a mechanical per-job diff of the 17th (v1.20's), authored against an explicit literal-disposition table rather than prose instruction -- every literal is either repointed or deliberately carried, never silently copied"
    - "Both cron literals are load-bearing byte-identical constants (D-51): the quarterly job's schedule guard is a string equality against its own trigger's cron literal, so the two are asserted identical by extraction, never by eye"
    - "Fetch-depth parity (V-139-FETCHDEPTH) is an equality, not a presence test -- proved failable in-place by temporarily stripping one options block, confirming FAIL, then restoring"

key-files:
  created:
    - .github/workflows/audit-harness-v1.21-integrity.yml

key-decisions:
  - "The plan's own must-have truths claim 'ALL SIX path-filter entries' while the predecessor workflow (and this one) has exactly FIVE entries under `pull_request.paths` (lines 36-40 in v1.20, mirrored 1:1 in v1.21). Verified by direct count and by CONTEXT.md D-50's own citation of the same line range (':36-40'). Treated the actual 5-entry array as ground truth over the prose count in must_haves/D-50 -- all 5 entries are authored correctly (3 v1.20-literal entries repointed to v1.21, 2 generic entries -- 'check-phase-*.mjs' glob and '.planning/REQUIREMENTS.md' -- left unchanged since they carry no milestone-version literal). This is a plan-text miscount, not a defect in the produced file; the acceptance criteria that actually gate this task (self-reference grep >=1, old-sidecar grep ==0, YAML-parses) all pass regardless of the '6' vs '5' prose discrepancy."
  - "Split the single-file plan into three atomic per-task commits by staging incremental versions of the workflow (3 jobs after Task 1, 13 after Task 2, 16 after Task 3), each independently valid YAML and independently passing that task's own <verify>/<acceptance_criteria> before being committed -- rather than one commit for the whole file. This costs three extra Read/Write round-trips but keeps the per-task atomic-commit contract intact even though all three tasks share one target file, and gives each commit a git-bisectable, independently-verified state."
  - "The recomputed HARNESS-DEPENDENCY CASCADE fan-out count is TWELVE jobs (linux-chain-ubuntu-latest, the 8 check-phase-145..152 leaves, check-phase-153, rotting-external-quarterly, pin-helper-advisory), derived directly from this file's own `needs: harness-run` job list rather than carried from the predecessor's stated count. The predecessor header's own count (\"six silent SKIPS\") does not match its own listed job names (7 named jobs) and additionally omits its two harness-run-dependent tail jobs (rotting-external-quarterly, pin-helper-advisory) from the sentence -- a pre-existing drift in v1.20's header prose, not reproduced here."

requirements-completed: [HARN-05]

coverage:
  - id: D1
    description: "The 18th CI workflow (.github/workflows/audit-harness-v1.21-integrity.yml) is authored as a mechanical per-job diff of the 17th, born with full fetch depth on every checkout, carrying its own check-phase-153 apex and eight standalone check-phase-145..152 leaf jobs, with no check-phase-144 (predecessor apex) job present"
    requirement: "HARN-05"
    verification:
      - kind: other
        ref: "python -c \"import yaml; d=yaml.safe_load(open('.github/workflows/audit-harness-v1.21-integrity.yml')); print(len(d['jobs']))\" -> 16; node/js-yaml parse agrees"
        status: pass
      - kind: other
        ref: "checkout-step count (16) === fetch-depth:0 count (16), comment lines stripped -- proved failable by a temporary probe (16/15 -> FAIL, restored -> 16/16 -> PASS)"
        status: pass
      - kind: other
        ref: "grep -c check-phase-144 .github/workflows/audit-harness-v1.21-integrity.yml -> 0; 8 distinct check-phase-14[5-9]/15[0-2] job keys confirmed"
        status: pass
    human_judgment: false
  - id: D2
    description: "All three sidecar references (parse, path-match grep, rotting-external-quarterly's inline node script) name v1.21-audit-allowlist.json; zero operational v1.20 literals survive anywhere in the file"
    requirement: "HARN-05"
    verification:
      - kind: other
        ref: "grep -c v1.20-audit-allowlist.json .github/workflows/audit-harness-v1.21-integrity.yml -> 0; local path-match grep against the real v1.21-milestone-audit.mjs exits 0"
        status: pass
      - kind: other
        ref: "full-file audit: grep -n v1.20 -> 0 hits; grep -n v1.19 -> 2 hits, both in header lineage-chain listings (deliberate historical references, not operational)"
        status: pass
    human_judgment: false
  - id: D3
    description: "Both binding predecessor-validator assertions (V-139-FETCHDEPTH, V-139-PROBEJOB) pass against the new file, and both crons plus the quarterly schedule guard are byte-identical"
    requirement: "HARN-05"
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-139.mjs --verbose -> 5 PASS, 0 FAIL, 0 SKIPPED across 18 workflow files"
        status: pass
      - kind: other
        ref: "node one-liner extracting trigger cron '0 8 1 1,4,7,10 *' and github.event.schedule guard literal -> byte-identical: true"
        status: pass
    human_judgment: false

duration: ~30min
completed: 2026-08-29
status: complete
---

# Phase 153 Plan 05: Harness Close — 18th CI Workflow, Mechanical Per-Job Diff Summary

**Authored `.github/workflows/audit-harness-v1.21-integrity.yml` as a 16-job mechanical per-job diff of the v1.20 workflow — full fetch depth everywhere, its own check-phase-153 apex plus eight standalone content leaves, both crons byte-identical, and all three sidecar references repointed including the one inside the always-skipping quarterly job.**

## Performance

- **Duration:** ~30 min
- **Completed:** 2026-08-29
- **Tasks:** 3
- **Files modified:** 1 (new)

## Accomplishments

**Literal inventory, completed row by row (D-50):**

| Region | Predecessor line | Disposition | Outcome |
|---|---|---|---|
| Header comment block | 3-28 | Restate for v1.21 | Dual-apex contract, recomputed 12-job fan-out, advisory non-evidence note all restated |
| Workflow display name | 31 | Repoint | `Audit Harness v1.21 Integrity` |
| Path filter entries | 36-40 | Repoint all | 5 entries authored; 3 v1.20-literal entries repointed, 2 generic entries (`check-phase-*.mjs`, `REQUIREMENTS.md`) unchanged — see Decisions re: plan's "six" claim |
| Weekly cron | 42 | Carry verbatim | `'0 8 * * 1'` — byte-identical |
| Quarterly cron | 43 | Carry verbatim | `'0 8 1 1,4,7,10 *'` — byte-identical, guard matches |
| Parse job display name | 48 | Repoint | `Parse v1.21 sidecar JSON` |
| Sidecar reference 1 (parse) | 59 | Repoint | `v1.21-audit-allowlist.json` |
| Path-match job display name | 68 | Repoint | `Harness references v1.21 sidecar` |
| Sidecar reference 2 (path-match grep) | 76 | Repoint | Grep exits 0 against the real v1.21 harness |
| Harness-run job display name | 84 | Repoint | `Run v1.21 milestone audit harness` |
| Harness-run step/run command | 92-93 | Repoint | `node scripts/validation/v1.21-milestone-audit.mjs --verbose` |
| Chain job display name | 96 | Repoint | `Validator chain on Linux LF (Phase 69 CILINUX-01)` (generic, unchanged text; run/notice repointed below) |
| Chain step name + run command | 108-111 | Repoint both + notice | `check-phase-153.mjs`, span `48..152`, notice line updated |
| Leaf jobs | 115-183 | Replace 5→8 | `check-phase-145`..`check-phase-152`, one job each |
| Standalone apex job | 184-196 | Replace | `check-phase-153` apex, no predecessor apex job |
| Sidecar reference 3 (quarterly inline script) | 216 | Repoint | `v1.21-audit-allowlist.json` inside the always-skipping job |
| Quarterly schedule guard | 202 | Carry verbatim | Byte-identical to the trigger's quarterly cron, proved by extraction |
| Advisory pin-helper job | 232-249 | Carry, label NON-EVIDENCE | `continue-on-error: true` + `|| true` + `|| echo` intact, comment added |
| Probe job | 250-279 | Carry, no `needs:` | Confirmed dependency-free |

**Derived counts:**
- Job count: **16**, derived from the file's own `jobs:` mapping (python/js-yaml agree).
- Fan-out count (recomputed, not carried): **12** jobs depend on `harness-run` directly — `linux-chain-ubuntu-latest`, the 8 `check-phase-145..152` leaves, `check-phase-153`, `rotting-external-quarterly`, `pin-helper-advisory`. Stated in the header.

**Cron byte-comparison:** both trigger crons diffed against the predecessor's (with version tokens normalized) — empty diff, byte-identical. The quarterly job's `github.event.schedule` guard string extracted and compared against the trigger's quarterly cron literal — identical.

**Fetch-depth failability probe:** with the file at its full 16-job state, one `with: { fetch-depth: 0 }` options block was temporarily removed from the `parse` job's checkout step. `node scripts/validation/check-phase-139.mjs --verbose` then reported:
```
[FETCHDEPTH/5] ... FAIL -- FETCHDEPTH per-file mismatch: audit-harness-v1.21-integrity.yml (checkouts=16, depths=15)
Result: 4 PASS, 1 FAIL, 0 SKIPPED
```
Restored, the same command reported:
```
[FETCHDEPTH/5] ... PASS -- 18 workflow(s), all with checkout-step count === fetch-depth:0 count
Result: 5 PASS, 0 FAIL, 0 SKIPPED
```
This proves the equality is a real gate, not a vacuous presence check.

**Binding-assertion results:** `node scripts/validation/check-phase-139.mjs --verbose` on the final file — `V-139-FETCHDEPTH` PASS (18 workflow files, all equal), `V-139-PROBEJOB` PASS (18 workflow files, each with a dependency-free `frozen-read-probe`), `V-139-SELF` PASS. Full result: `5 PASS, 0 FAIL, 0 SKIPPED`.

**Full-file audit of surviving predecessor-milestone literals:**
- `v1.20`: **0 hits** — every operational reference repointed.
- `v1.19`: **2 hits**, both in the header's lineage-chain listings (`... v1.18 + v1.19 + the immediately-prior milestone's harnesses ...` and the PRESERVES line's `v1.13/.../v1.19/the immediately-prior milestone's Path-A`) — deliberate historical provenance statements, not operational paths. This mirrors the predecessor's own convention of listing milestones explicitly through the second-to-last one, then referring to "the immediately-prior milestone" for the last.
- `v1.18` and earlier: appear only inside the same two lineage-chain listing lines (expected, historical).

`ls .github/workflows/audit-harness-*.yml | wc -l` confirms **18** workflow files exist — this is genuinely the 18th.

## Task Commits

Each task was committed atomically. Because all three tasks target the same single new file, each commit stages an independently-valid, independently-verified intermediate version of the workflow (3 jobs → 13 jobs → 16 jobs) rather than one combined commit:

1. **Task 1: Header, triggers and the three pre-chain jobs** - `c4b7be3c` (feat) — 95 lines, 3 jobs (`parse`, `path-match`, `harness-run`), checkout/fetch-depth parity 3/3
2. **Task 2: Chain job, eight standalone leaf jobs and the apex job** - `d6fe110b` (feat) — 241 lines, 13 jobs, checkout/fetch-depth parity 13/13, 8 distinct leaf job keys
3. **Task 3: Tail jobs, third sidecar reference, binding-assertion proof** - `fd3767b1` (feat) — 324 lines, 16 jobs (final), checkout/fetch-depth parity 16/16, `check-phase-139.mjs` 5/0/0

**Plan metadata:** committed separately, see below.

## Files Created/Modified

- `.github/workflows/audit-harness-v1.21-integrity.yml` - new, 16-job 18th coexistence CI workflow; 13,784 bytes; parses as YAML on both python (PyYAML) and Node (js-yaml)

## Decisions Made

- **Followed the actual 5-entry `paths:` array over the plan's/D-50's "ALL SIX path-filter entries" prose count** — the predecessor file (and CONTEXT.md's own cited line range `:36-40`) has exactly 5 entries. All acceptance criteria that gate this (self-reference presence, old-sidecar absence, YAML validity) pass regardless. See Decisions in frontmatter for full reasoning.
- **Split the single-file plan into three atomic per-task commits** by staging incremental valid-YAML versions of the file, each independently passing its own task's verify/acceptance criteria before commit, to keep the per-task atomic-commit contract intact despite all three tasks sharing one target file.
- **Recomputed the fan-out count as 12, not carried from the predecessor's stated "six"** — the predecessor header's own count doesn't match its own listed job names and omits two tail jobs; this file's header states a count that is verifiably derived from its own job list.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Corrected assumption] "ALL SIX path-filter entries" in must_haves/D-50 does not match the actual 5-entry array**
- **Found during:** Task 1 (authoring the trigger block against the literal inventory)
- **Issue:** must_haves truths and CONTEXT.md D-50 both assert "ALL SIX `paths:` entries", but the predecessor workflow's `pull_request.paths` array (and D-50's own cited line range `:36-40`) contains exactly 5 entries. Verified by direct line count (`sed -n '35,40p' ... | grep -c '^\s*-'` → 5) and by re-reading the predecessor file in full.
- **Fix:** Authored the 5 entries that actually exist, repointing the 3 that carry a milestone-version literal (`scripts/validation/v1.21-*`, the workflow's own self-reference, `.planning/milestones/v1.21-*`) and leaving the 2 generic entries (`scripts/validation/check-phase-*.mjs`, `.planning/REQUIREMENTS.md`) unchanged since they contain no version literal to repoint. This satisfies the plan's own acceptance criteria (self-reference grep ≥1, old-sidecar-path grep for these two jobs == 0) exactly as written; those criteria do not assert a "6" count anywhere.
- **Files modified:** none beyond the planned target file.
- **Verification:** `grep -c "audit-harness-v1.21-integrity.yml" .github/workflows/audit-harness-v1.21-integrity.yml` → 1 (self-reference present); YAML parses; `pull_request.paths` list confirmed via `yaml.safe_load`.
- **Committed in:** `c4b7be3c` (Task 1)

---

**Total deviations:** 1 auto-fixed (Rule 1 — a prose miscount in the plan/CONTEXT text corrected against the measured predecessor file; the protective intent — every version-literal path entry repointed, self-reference present — is fully satisfied).
**Impact on plan:** No scope creep. Documentation/count correction only; the produced file is structurally and mechanically identical to what D-50's literal-inventory table (with its correct `:36-40` line range) specifies.

## Issues Encountered

None beyond the deviation documented above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- The 18th CI workflow exists, is well-formed YAML, and references `scripts/validation/v1.21-milestone-audit.mjs` / `v1.21-audit-allowlist.json` (both already on disk from 153-04) plus `scripts/validation/check-phase-145..153.mjs` (not yet on disk — those land in waves 5-6, plans 153-06 through 153-09, per this phase's own dependency ordering). This is expected: the workflow is authored ahead of the leaf/apex validators it will eventually run in CI.
- `check-phase-139.mjs`'s two binding assertions (`V-139-FETCHDEPTH`, `V-139-PROBEJOB`) both pass against this file today, and will continue to as long as later plans in this phase don't touch it.
- No blockers. All plan-level `<verification>` commands pass: `check-phase-139.mjs` exits 0 (5/0/0 across 18 workflows); file parses as YAML with 16 jobs; checkout-step count equals fetch-depth:0 count (16/16); zero predecessor-sidecar/predecessor-apex references remain; both cron literals byte-identical.

## Self-Check: PASSED

`.github/workflows/audit-harness-v1.21-integrity.yml` confirmed present on disk (13,784 bytes, 16 jobs). All 3 task commits (`c4b7be3c`, `d6fe110b`, `fd3767b1`) confirmed in `git log`. All plan-level `<verification>` commands re-run and PASS: `node scripts/validation/check-phase-139.mjs` exits 0 (5 PASS, 0 FAIL, 0 SKIPPED); YAML parses (16 jobs, both PyYAML and js-yaml); checkout/fetch-depth equality holds (16/16); `ls .github/workflows/audit-harness-*.yml | wc -l` → 18.

---
*Phase: 153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a*
*Completed: 2026-08-29*
