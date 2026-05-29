---
phase: 69
plan: 02
subsystem: ci-linux-hardening / cross-os-verification / validator-surgery
tags: [ci-linux, gha, cross-os, sc5-validation, v1.5-frozen-aware, scope-gap-closure, close-gate]
requires:
  - phase-69-plan-01: ".github/workflows/audit-harness-v1.7-integrity.yml NEW (commit dd1ff08)"
  - phase-68-plan-03-task-1: "v1.5-frozen-aware pattern source (commit d7d7d5f; readRequirementsAtV15Close helper precedent)"
  - phase-68-plan-03-task-2: "CHAIN_SKIP = new Set([]) on chain-66 (commit 7b635ca; cross-OS verification target)"
  - phase-68-plan-05: "chicken-and-egg placeholder precedent for {69_02_SHA}"
provides:
  - cilinux-01-validated: "CILINUX-01 Active → Validated; cross-OS verification axis live"
  - cross-os-resilience-evidence: "B.1 + B.2 + B.4 trio (chain-apex 28/0/0 EXACT MATCH at Windows vs Linux)"
  - phase-70-entry-state: "3 independence axes available at terminal re-audit (fresh-clone + fresh sub-agent + cross-OS)"
  - v1.7-deferred-cleanup-extended: "TIMEOUT-01 CLOSED + FETCH-DEPTH-01 CLOSED + SCOPE-GAP-61 CLOSED + D-04-OVERSPEC-01 ACKNOWLEDGED + CHAIN-WRAPPER-01 DEFERRED"
affects:
  - .github/workflows/audit-harness-v1.7-integrity.yml: "fetch-depth:0 added on linux-chain-ubuntu-latest (Fix-1 85521bb)"
  - scripts/validation/check-phase-61.mjs: "readRoadmapAtV15Close() helper added; V-61-05..08 v1.5-frozen-aware (Fix-2 2d61981)"
  - .planning/phases/69-ci-linux-hardening-pillar-c-cross-os-verification/69-VERIFICATION.md: "NEW (this close-gate)"
  - .planning/REQUIREMENTS.md: "CILINUX-01 [x] flipped + Traceability row Pending→Complete"
  - .planning/STATE.md: "frontmatter completed_phases 2→3 + completed_plans 8→10 + percent 22→75 + Performance Metrics + Pending Todos + Session Continuity + Decisions H3"
  - .planning/ROADMAP.md: "Phase 69 entry [x] + Progress table row 1/2 In Progress → 2/2 Complete 2026-05-28 + plan checkboxes + closing footer"
  - .planning/PROJECT.md: "Validated section gains CILINUX-01 row + Current Milestone status updated + closing footer"
  - .planning/milestones/v1.7-DEFERRED-CLEANUP.md: "TIMEOUT-01 closing line + 4 NEW entries (FETCH-DEPTH-01 + SCOPE-GAP-61 + D-04-OVERSPEC-01 + CHAIN-WRAPPER-01)"
tech-stack:
  added: []
  patterns:
    - "fetch-depth:0 on actions/checkout@v4 for v1.5-frozen-aware validators (FETCH-DEPTH-01 cross-OS pattern)"
    - "Parallel v1.5-frozen-aware helpers (readRequirementsAtV15Close + readRoadmapAtV15Close) — same SHA-pinned execFileSync('git', ['show', ...]) idiom across both REQUIREMENTS.md and ROADMAP.md surfaces"
    - "SC#5 cross-OS reproducibility via B.1+B.2+B.4 trio (workflow_dispatch baseline + representative-PR + Windows-vs-Linux chain-apex diff)"
    - "Reframe-aware SC interpretation: when a defensive validator is CRLF-tolerant, the positive case IS chain-stays-green under CRLF injection (D-04-OVERSPEC-01 lesson)"
    - "Chicken-and-egg {69_02_SHA} placeholder pattern carried forward from Phase 68 Plan 68-05"
key-files:
  created:
    - .planning/phases/69-ci-linux-hardening-pillar-c-cross-os-verification/69-VERIFICATION.md
    - .planning/phases/69-ci-linux-hardening-pillar-c-cross-os-verification/69-02-SUMMARY.md
  modified:
    - .github/workflows/audit-harness-v1.7-integrity.yml  # Fix-1 85521bb (fetch-depth:0)
    - scripts/validation/check-phase-61.mjs  # Fix-2 2d61981 (readRoadmapAtV15Close + V-61-05..08 v1.5-frozen-aware)
    - .planning/REQUIREMENTS.md
    - .planning/STATE.md
    - .planning/ROADMAP.md
    - .planning/PROJECT.md
    - .planning/milestones/v1.7-DEFERRED-CLEANUP.md
decisions:
  - "SC#5 satisfied via B.1+B.2+B.4 trio (reframe-aware per D-04-OVERSPEC-01); B.3 SKIPPED per reframe redundancy"
  - "Plan 69-01 stays single-feat commit; Plan 69-02 lands as 3 commits (Fix-1 + Fix-2 + close-gate) plus 1 scratch evidence file (NOT committed)"
  - "Zero-master-tree-churn invariant preserved (PR #1 closed-without-merge + branch deleted local+remote)"
  - "{69_02_SHA} placeholder per chicken-and-egg precedent (Phase 68 Plan 68-05 Option (a))"
  - "v1.7-DEFERRED-CLEANUP.md extended with 4 NEW entries + TIMEOUT-01 closure (rather than waiting for Phase 70 HARNESS-06) — captures Phase-69-execution-time discoveries forensically at the time of discovery"
metrics:
  duration_minutes: ~270  # Plan 69-02 wall-clock estimate: ~4.5 hours across multiple checkpoint pivots
  completed: 2026-05-28
  tasks_executed: 10  # 5 evidence-gathering tasks (B.1 iter 1/2/3 + B.2 + B.4) + 5 close-gate tasks (Tasks 6-10)
  fix_commits: 2  # Fix-1 85521bb + Fix-2 2d61981
  discoveries: 3  # FETCH-DEPTH-01 + SCOPE-GAP-61 + D-04-OVERSPEC-01 (PRIMARY/SECONDARY/TERTIARY)
  meta_bugs_flagged: 1  # CHAIN-WRAPPER-01 (DEFERRED to v1.8+)
  gha_runs_archived: 4  # 26513528485 (B.1 iter 1 FAIL) + 26574959797 (B.1 iter 2 FAIL) + 26576405590 (B.1 iter 3 CLEAN) + 26577894505 (B.2 GREEN)
  prs_lifecycle: 1  # PR #1 opened + CRLF-injected + B.2 run + closed-without-merge + branch deleted local+remote
---

# Phase 69 Plan 02: CI-Linux Hardening — SC#5 Cross-OS Verification + Close-Gate Summary

Closes Phase 69 (Pillar C — CI-Linux Hardening) by satisfying SC#5 cross-OS reproducibility via a reframe-aware B.1+B.2+B.4 trio, surfacing 3 architectural discoveries (FETCH-DEPTH-01 + SCOPE-GAP-61 + D-04-OVERSPEC-01) via cross-OS workflow_dispatch + representative-PR validation, landing 2 in-Phase fix-pivot commits (`85521bb` fetch-depth:0 + `2d61981` V-61-05..08 v1.5-frozen-aware as Plan 68-03 Task 1 scope-gap closure), and flipping CILINUX-01 Active → Validated across PROJECT.md + REQUIREMENTS.md + ROADMAP.md + STATE.md + v1.7-DEFERRED-CLEANUP.md (TIMEOUT-01 closure + 4 NEW entries: FETCH-DEPTH-01 + SCOPE-GAP-61 + D-04-OVERSPEC-01 + CHAIN-WRAPPER-01 deferred).

## Commit Chain (4 commits across Plan 69-01 + Plan 69-02)

| Commit | Role | Files | Plan |
|--------|------|-------|------|
| `dd1ff08` | Plan 69-01 feat (CILINUX-01 workflow YAML NEW) | `.github/workflows/audit-harness-v1.7-integrity.yml` | 69-01 |
| `85521bb` | Plan 69-02 Fix-1 (FETCH-DEPTH-01 fix) | `.github/workflows/audit-harness-v1.7-integrity.yml` | 69-02 |
| `2d61981` | Plan 69-02 Fix-2 (SCOPE-GAP-61 fix) | `scripts/validation/check-phase-61.mjs` | 69-02 |
| `{69_02_SHA}` | Plan 69-02 close-gate | 69-VERIFICATION.md NEW + 69-02-SUMMARY.md NEW + REQUIREMENTS.md + STATE.md + ROADMAP.md + PROJECT.md + v1.7-DEFERRED-CLEANUP.md (7 files) | 69-02 |

## Wave Breakdown

### Wave 1 — Plan 69-01 (workflow YAML NEW; 2026-05-27)

Single-feat commit `dd1ff08` lands `.github/workflows/audit-harness-v1.7-integrity.yml` as Path-A copy from `audit-harness-v1.6-integrity.yml` with:
- v1.7-scoped path-filter (replaces v1.6 entries; preserves the 15-entry shape)
- 2 crons preserved (weekly bitrot + quarterly rotting-external-quarterly at `0 8 1 1,4,7,10 *`)
- NEW `linux-chain-ubuntu-latest` job that runs `node scripts/validation/check-phase-66.mjs` chain-apex on Linux LF line endings (PR-blocking per D-A9 inheritance; default `continue-on-error: false`)
- Coexists with v1.4 + v1.5 + v1.6 workflows (zero modifications to predecessors)

Plan 69-01 also produced a side-effect tracking-update commit `6e12a75` (NOT part of the 69-01 deliverable but landed within Plan 69-01's window) that added a `| 69. CI-Linux Hardening (Pillar C) | v1.7 | 1/2 | In Progress|  |` row to ROADMAP.md line 447. This row is what triggered SCOPE-GAP-61 in Wave 2.

### Wave 2 — Plan 69-02 (SC#5 cross-OS validation + close-gate; 2026-05-28)

**3 user-action checkpoints navigated:**

1. **Checkpoint 1 (after B.1 iter 1 FAIL):** Rule 4 architectural decision — Option A (fetch-depth:0) approved → Fix-1 `85521bb`
2. **Checkpoint 2 (after B.1 iter 2 FAIL post-fetch-depth-fix):** Rule 4 architectural decision — Option A (V-61-05..08 v1.5-frozen-aware via parallel `readRoadmapAtV15Close()` helper) approved → Fix-2 `2d61981`
3. **Checkpoint 3 (after B.2 GREEN surprise):** Reframe accepted (D-04-OVERSPEC-01: B.2-GREEN is positive cross-OS resilience proof, not negative regression-detection); B.3 SKIPPED per reframe redundancy; SC#5 satisfied via B.1+B.2+B.4 trio

**Evidence captured (consolidated in `_tmp-sc5-b1-evidence.md`):**

| Sub-step | Run / Method | Conclusion |
|----------|--------------|------------|
| B.1 iter 1 | `gh run` `26513528485` (workflow_dispatch on `6e12a75`) | FAIL `23 PASS, 5 FAIL, 0 SKIPPED` (FETCH-DEPTH-01 surfaced) |
| B.1 iter 2 | `gh run` `26574959797` (workflow_dispatch on `85521bb`) | FAIL `23 PASS, 5 FAIL, 0 SKIPPED` (SCOPE-GAP-61 surfaced) |
| B.1 iter 3 (PRIMARY) | `gh run` `26576405590` (workflow_dispatch on `2d61981`) | SUCCESS `28 PASS, 0 FAIL, 0 SKIPPED` (~56s) |
| B.2 (representative-PR) | `gh run` `26577894505` (pull_request on PR #1; ade7c97) | SUCCESS `28 PASS, 0 FAIL, 0 SKIPPED` (~69s; reframe per D-04-OVERSPEC-01) |
| B.3 | SKIPPED | Per reframe (redundant) |
| B.4 (Windows-local) | PowerShell sequential validator sweep | chain-apex 28 PASS, 0 FAIL, 0 SKIPPED — EXACT MATCH to Linux |

PR #1 lifecycle: opened with synthetic CRLF-injected `docs/decision-trees/09-linux-triage.md` → B.2 GHA run completed → CLOSED-without-merge with explanatory comment (run URL preserved as permanent evidence) → branch `phase-69/sc5-crlf-evidence` deleted local + remote → master tree byte-unchanged.

## Key Files Modified

### `.github/workflows/audit-harness-v1.7-integrity.yml` (created in Plan 69-01 `dd1ff08`; modified in Fix-1 `85521bb`)

Added `with: { fetch-depth: 0 }` to the `actions/checkout@v4` step in the `linux-chain-ubuntu-latest` job. Single-line YAML edit. Other jobs (parse / path-match / harness-run) retained default shallow clone (don't need historical SHAs).

### `scripts/validation/check-phase-61.mjs` (modified in Fix-2 `2d61981`)

Added `readRoadmapAtV15Close()` helper parallel to existing `readRequirementsAtV15Close()` (from Plan 68-03 Task 1 `d7d7d5f`):

```javascript
function readRoadmapAtV15Close() {
  try {
    return execFileSync('git', ['show', 'ba2cbc0:.planning/ROADMAP.md'], { encoding: 'utf8', timeout: 10000 }).replace(/\r\n/g, '\n');
  } catch (e) { return null; }
}
```

V-61-05..08 rewired to use the helper; check names suffixed `[v1.5-frozen @ ba2cbc0]` to match V-61-01..04 naming convention. Same risk class (LOW), same proven mechanism.

### `.planning/phases/69-ci-linux-hardening-pillar-c-cross-os-verification/69-VERIFICATION.md` (NEW; this close-gate)

Sections A-G mirroring 68-VERIFICATION.md shape. Frontmatter cites all 4 Phase 69 commits (`dd1ff08` + `85521bb` + `2d61981` + `{69_02_SHA}` placeholder). Section E documents 3 discoveries + 1 latent meta-bug.

### Traceability files (REQUIREMENTS.md + STATE.md + ROADMAP.md + PROJECT.md)

- **REQUIREMENTS.md:** CILINUX-01 `[ ]` → `[x]` (line 26) with closing-narrative inline citation; Traceability row `| CILINUX-01 | Phase 69 | Pending |` → `Complete` (line 84)
- **STATE.md:** Frontmatter `completed_phases 2→3` + `completed_plans 8→10` + `percent 22→75` + `stopped_at` + `last_updated 2026-05-28T15:30:00.000Z` + `last_activity`; Performance Metrics gains Phase 69 bullet; Pending Todos removes Phase 69 entry; Session Continuity points to Phase 70; Decisions H3 "Phase 69 — Plan 02 (close-gate; 2026-05-28)" added at top of Decisions section
- **ROADMAP.md:** Phase 69 entry `[ ]` → `[x]` with closing narrative; Plans 1/2 → 2/2 plans complete with both 69-01 + 69-02 checkboxes; Progress table row 69 `1/2 In Progress` → `2/2 Complete 2026-05-28`; closing footer updated
- **PROJECT.md:** Validated section gains CILINUX-01 row below CHAIN-03 with full closing-narrative + commit chain; Current Milestone status updated; closing footer updated

### `.planning/milestones/v1.7-DEFERRED-CLEANUP.md`

- TIMEOUT-01: appended closing line citing Linux runtime ~56s (well within 1500s escalation threshold); TIMEOUT-01 CLOSED 2026-05-28
- **FETCH-DEPTH-01** (NEW): Full narrative + run URLs + fix commit `85521bb` + Phase 70 HARNESS-04 inheritance contract; Status CLOSED 2026-05-28
- **SCOPE-GAP-61** (NEW): Full narrative + Plan 68-03 Task 1 attribution + run URLs + fix commit `2d61981` + v1.8+ retrospective audit recommendation for V-NN-NN HEAD-coupled assertion class; Status CLOSED 2026-05-28 for V-61-05..08 surface, retrospective audit DEFERRED
- **D-04-OVERSPEC-01** (NEW): Reframe rationale + future SC#5 design guidance; Status ACKNOWLEDGED 2026-05-28 (no fix needed; reality was right)
- **CHAIN-WRAPPER-01** (NEW): `check-phase-66.mjs:313` stderr-only wrapper bug; recommendation to capture both stderr AND stdout; Status DEFERRED to v1.8+

Cross-References + closing footer updated with Phase 69 entries.

## Deviations from Plan

### In-Phase Fix-Pivot Commits (2)

**1. [Rule 4 — Architectural change; user-approved at Checkpoint 1] Fix-1 `85521bb` — fetch-depth:0**
- **Found during:** Task 2 (B.1 iter 1 workflow_dispatch baseline)
- **Issue:** Shallow-clone (`actions/checkout@v4` default `fetch-depth: 1`) cannot resolve historical SHA `ba2cbc0` referenced by `readRequirementsAtV15Close()` introduced in Plan 68-03 Task 1 commit `d7d7d5f`. Chain-apex `Result: 23 PASS, 5 FAIL, 0 SKIPPED` with `fatal: invalid object name 'ba2cbc0'` as proximate cause.
- **Fix:** Added `with: { fetch-depth: 0 }` to the `actions/checkout@v4` step in the `linux-chain-ubuntu-latest` job; other jobs unaffected.
- **Files modified:** `.github/workflows/audit-harness-v1.7-integrity.yml`
- **Commit:** `85521bb`

**2. [Rule 4 — Architectural change; user-approved at Checkpoint 2] Fix-2 `2d61981` — V-61-05..08 v1.5-frozen-aware**
- **Found during:** Task 2 re-run (B.1 iter 2 workflow_dispatch baseline post-fetch-depth-fix)
- **Issue:** V-61-05..08 in `check-phase-61.mjs` were left HEAD-coupled by Plan 68-03 Task 1's v1.5-frozen-aware pivot (which only covered V-61-01..04). The moment Plan 69-01's tracking-update commit `6e12a75` introduced an `In Progress` row to ROADMAP.md line 447, V-61-05 began failing on both Windows local AND Linux GHA simultaneously. Attribution: Plan 68-03 Task 1 scope-gap closure, NOT Phase 69 deliverable surface.
- **Fix:** Added `readRoadmapAtV15Close()` helper parallel to existing `readRequirementsAtV15Close()`; rewired V-61-05..08 to use it; suffixed check names `[v1.5-frozen @ ba2cbc0]`.
- **Files modified:** `scripts/validation/check-phase-61.mjs`
- **Commit:** `2d61981`

### Reframe (No Fix Needed)

**3. [Rule 4-adjacent / D-04-OVERSPEC-01] B.2 design reframed at Checkpoint 3**
- **Found during:** Task 3 (B.2 synthetic CRLF PR execution)
- **Issue:** Original SC#5 D-04 design assumed B.2 would exit 1 (CRLF caught by check-phase-51). Reality: Phase 68 CHAIN-01 fix made check-phase-51 CRLF-tolerant (defensive `.replace(/\r\n/g, '\n')` at readFile(); INTENT-equivalence). B.2 ran GREEN.
- **Reframe:** B.2-GREEN is the CORRECT outcome and positive cross-OS resilience proof (defense-in-depth verified on Linux). B.3 SKIPPED per reframe redundancy. SC#5 satisfied via B.1+B.2+B.4 trio.
- **Files modified:** None (no code change needed)

## Self-Check: PASSED

**Files created (verified to exist):**
- ✓ `.planning/phases/69-ci-linux-hardening-pillar-c-cross-os-verification/69-VERIFICATION.md`
- ✓ `.planning/phases/69-ci-linux-hardening-pillar-c-cross-os-verification/69-02-SUMMARY.md`

**Commits verified (cited in this SUMMARY; cross-checkable via `git log --grep="69-0[12]"`):**
- ✓ `dd1ff08` Plan 69-01 feat
- ✓ `85521bb` Fix-1 (fetch-depth:0)
- ✓ `2d61981` Fix-2 (V-61-05..08 v1.5-frozen-aware)
- ⏳ `{69_02_SHA}` close-gate (this commit; recoverable post-commit via `git log --grep="69-02"` per chicken-and-egg precedent)

**Traceability flips verified inline:**
- ✓ REQUIREMENTS.md CILINUX-01 `[x]` + Traceability row `Complete`
- ✓ STATE.md frontmatter `completed_phases 3` + `completed_plans 10` + `percent 75`
- ✓ ROADMAP.md Phase 69 `[x]` + Progress row `2/2 Complete 2026-05-28`
- ✓ PROJECT.md Validated section gains CILINUX-01 row
- ✓ v1.7-DEFERRED-CLEANUP.md TIMEOUT-01 closing line + 4 NEW entries

**Evidence consolidated in `_tmp-sc5-b1-evidence.md` (scratch file; NOT committed — orchestrator-appended during execution for forensic record):**
- ✓ B.1 iter 1 FAIL (run `26513528485`)
- ✓ B.1 iter 3 CLEAN (run `26576405590`)
- ✓ B.2 + Discovery #3 (run `26577894505`)
- ✓ B.4 Windows-local diff (PowerShell capture)

**No open caveats.** All 5 SC satisfied; all 3 discoveries documented; 1 latent meta-bug deferred to v1.8+; Phase 70 entry-state ready.

## Evidence References

- **GHA runs (4 archived):** `26513528485` (B.1 iter 1 FAIL) + `26574959797` (B.1 iter 2 FAIL) + `26576405590` (B.1 iter 3 CLEAN; PRIMARY evidence) + `26577894505` (B.2 GREEN; D-04-OVERSPEC-01 reframe evidence)
- **PR lifecycle:** PR #1 opened + CRLF-injected + B.2 ran GREEN + CLOSED-without-merge 2026-05-28 + branch `phase-69/sc5-crlf-evidence` deleted local+remote
- **Local PowerShell capture:** B.4 Windows-local per-validator + chain-apex run (see `_tmp-sc5-b1-evidence.md` §B.4)
- **Forensic consolidation:** `.planning/phases/69-ci-linux-hardening-pillar-c-cross-os-verification/_tmp-sc5-b1-evidence.md` (scratch file; 4 sections; NOT committed per executor scope discipline)

---

*Plan 69-02 close-gate authored 2026-05-28. CILINUX-01 closed (Active → Validated). 3 cross-OS architectural discoveries documented. 1 latent meta-bug deferred to v1.8+. Phase 70 entry-state ready: chain cascade-green on BOTH Windows AND Linux (28/0/0 EXACT MATCH); 3 independence axes available at terminal re-audit (fresh-clone + fresh sub-agent + cross-OS).*
