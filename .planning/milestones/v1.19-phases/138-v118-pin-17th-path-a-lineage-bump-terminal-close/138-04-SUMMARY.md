---
phase: 138-v118-pin-17th-path-a-lineage-bump-terminal-close
plan: 04
subsystem: infra
tags: [validation-harness, chain-apex, byte-unchanged-gate, archival-drift, cross-axis-audit, publish-bundle]

# Dependency graph
requires:
  - phase: 138-01
    provides: "WAVE0_ANCHOR 64ee54dd6a4d7ec7617521a988912e10df781808 + the independently-derived 47-surface frozen-set inventory + four shared _lib dependency freeze dispositions"
  - phase: 138-02
    provides: "v1.19-milestone-audit.mjs + v1.19-audit-allowlist.json + BASELINE_23, exits 0 --verbose (16/16 PASS)"
  - phase: 138-03
    provides: "check-phase-135/136/137/138.mjs + audit-harness-v1.19-integrity.yml; apex measured 92 PASS/0 FAIL/1 SKIP (93 total)"
provides:
  - "HARN-15 gate parts 1-3: apex-138 green non-nested standalone (92/0/1, idle machine, identical to 138-03's recorded line); the ten-member standalone-RED set (30,31,48,60,61,62,63,64,65,66) enumerated by name with four root-cause classes and per-validator observed exit codes; the exponential full-90-sweep non-attempt stated with freshly-measured doubling figures"
  - "Byte-unchanged HARD gate verdict: 47-surface + 87 check-phase-48..134.mjs diff from WAVE0_ANCHOR is empty; three shared _lib deps (c17-eee-contract.mjs, archive-path.mjs, exec-fail-detail.mjs) zero-diff; frozen-at-close.mjs additions-only (11/0); full HEAD diff enumerated with only this phase's own 12 new/appended files present"
  - "Archival-drift PRE-scan, both halves: hardcoded-phase-path readers (check-phase-31 comment-only, check-phase-70/124 frozen-aware, new leaves 135-138 zero reads) + live REQUIREMENTS/ROADMAP readers (check-phase-54 LIVE with negative assertion; check-phase-61/70 frozen-aware; check-phase-66 false-positive/no read)"
  - "Axis 1 (Windows fresh clone, ADVISORY): third consecutive clean cycle, apex 92/0/1 in 19s, no deep-nest stall, clone removed post-audit"
  - "Axis 3 (corroborating, mandatory-in-execution): best-effort same-host third apex invocation, 92/0/1 in 14s — explicitly flagged as NOT satisfying true zero-context sub-agent dispatch (toolset gap, documented honestly)"
  - "dist/docs-library-v1.19.zip regenerated (225 docx converted+guarded+staged, 0 errors, RE-224/RE-225 both GUARD-OK)"
  - "Freshly-enumerated 16-workflow dispatch list + the two exact owner commands for the Plan 138-05 checkpoint"
affects: ["138-05", "138-06"]

# Actuals (#2632)
actuals:
  tokens: 8500
  tasks: 3
  commits: 1

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Non-nested per-validator drift-band execution (one validator at a time, CHECK_PHASE_NESTED unset) as the only branch where live-HEAD content drift surfaces at all"
    - "Sidecar/anchor-restricted git diff as the byte-unchanged HARD-gate instrument, extended over shared _lib dependencies by name rather than relying on the primary 47-surface file-list diff alone"
    - "Cross-axis apex reproduction (local idle run + Windows fresh-clone run + same-host third run) compared by identical summary-line string match rather than re-deriving pass/fail counts"

key-files:
  created: []
  modified: []

key-decisions:
  - "HARN-16 is NOT marked complete by this plan — only its pre-push evidence half (Axis 1 + Axis 3 + publish bundle) is delivered here; the plan's own objective text scopes this explicitly ('HARN-15 and HARN-16 (pre-push half)') and REQUIREMENTS.md's Phase 138 traceability table already carries HARN-16 as Pending pending Plans 138-05/138-06's close-gate commit. requirements.mark-complete is invoked for HARN-15 only (idempotent re-confirmation; already [x])."
  - "Axis 3's 'fresh sub-agent carrying no context' instruction could not be executed as literally specified: this executor's toolset (Read/Write/Edit/Bash/Grep/Glob/Skill) exposes no agent-dispatch primitive. Recorded honestly as a gap rather than silently substituted or claimed satisfied — see Axis 3 section below."
  - "The ten-member standalone-RED set and its four root-cause classes were derived from freshly observed per-validator exit codes and FAIL-line content this run, not asserted from the CONTEXT's prior citation — the observed set and V-61's four individual check IDs match D-16 exactly, corroborating rather than merely repeating it."
  - "Classes (a)+(b) for validators 62-66 are attributed via their own AUDIT-HARNESS sub-check (a fresh per-generation re-manifestation of the same docs/_glossary-android.md condition through v1.6-milestone-audit.mjs), while their CHAIN-* sub-checks are pure class-(c) cascade from 48/60/61 — both routes are named per-check below so a successor cannot mistake either for a distinct fifth cause."

patterns-established: []

requirements-completed: [HARN-15]

coverage:
  - id: D1
    description: "HARN-15 gate parts 1-3: apex-138 green non-nested standalone (92 PASS/0 FAIL/1 SKIP, summary line identical to 138-03's), ten-member RED set enumerated by name with four root-cause classes and the will-not-green-on-partial-fix statement, exponential full-sweep non-attempt stated with measured doubling"
    requirement: "HARN-15"
    verification:
      - kind: unit
        ref: "node scripts/validation/check-phase-138.mjs --verbose (exit 0; Result: 92 PASS, 0 FAIL, 1 SKIPPED)"
        status: pass
      - kind: other
        ref: "grep -c for the forbidden zero-failure full-chain phrase (STATE.md:343) against this SUMMARY = 0"
        status: pass
    human_judgment: false
  - id: D2
    description: "Byte-unchanged HARD gate: 47-surface + 87 check-phase-48..134.mjs diff from WAVE0_ANCHOR empty; three shared _lib deps zero-diff; frozen-at-close.mjs additions-only; full HEAD diff matches the enumerated expected-entry list with no unexplained member"
    requirement: "HARN-15"
    verification:
      - kind: other
        ref: "git diff --name-only 64ee54dd..HEAD restricted to the 47-surface + 87-file inventory = empty; git diff --numstat -- _lib/frozen-at-close.mjs = 11 0"
        status: pass
    human_judgment: false
  - id: D3
    description: "Archival-drift PRE-scan widened to both classes (hardcoded phase-path readers + live REQUIREMENTS/ROADMAP readers), each entry marked live-reading or frozen-aware; four new leaves + apex confirmed zero archived-phase-path reads"
    requirement: "HARN-15"
    verification:
      - kind: other
        ref: "grep -rlE hardcoded-phase-path pattern across scripts/validation + per-file classification of REQUIREMENTS.md/ROADMAP.md read mechanism"
        status: pass
    human_judgment: false
  - id: D4
    description: "Axis 1 (Windows fresh clone, ADVISORY) and Axis 3 (corroborating, mandatory-in-execution) both captured with explicit dispositions; publish bundle regenerated --version=v1.19 with both new recipes GUARD-OK; 16-workflow dispatch list enumerated fresh"
    requirement: "HARN-16"
    verification:
      - kind: other
        ref: "Axis 1: fresh clone apex 92/0/1 in 19s, clone removed. Axis 3: same-host third invocation 92/0/1 in 14s, explicitly flagged as not host/context-independent. Publish bundle: 225 docx converted+guarded+staged, 0 errors, dist/docs-library-v1.19.zip written."
        status: pass
    human_judgment: true
    rationale: "Axis 3 as literally specified (a dispatched, context-isolated sub-agent) could not be executed with this executor's toolset — a human must confirm whether the recorded same-host proxy is an acceptable substitute before Plan 138-05/138-06 treat HARN-16's cross-axis leg as satisfied."

duration: ~25min
completed: 2026-08-04
status: complete
---

# Phase 138 Plan 04: Pre-Push Evidence Base — HARN-15 Gate, Byte-Unchanged Gate, Archival-Drift Scan, Local Axes, Publish Bundle Summary

**Complete local pre-push evidence base assembled: apex-138 green non-nested (92/0/1) with the ten-member standalone-RED set named and classified into four root causes, a clean byte-unchanged HARD gate extended over the shared `_lib` dependencies, a two-class archival-drift pre-scan, a third consecutive clean Windows fresh-clone cycle, a best-effort (and honestly-flagged) Axis-3 proxy, and a regenerated `dist/docs-library-v1.19.zip` with both new recipes GUARD-OK.**

## Performance

- **Duration:** ~25 min
- **Tasks:** 3
- **Files modified:** 0 source files (evidence-gathering plan; only this SUMMARY + STATE/ROADMAP land via the final metadata commit)

## Accomplishments

- **HARN-15 gate, Part 1:** `node scripts/validation/check-phase-138.mjs --verbose` run non-nested on an otherwise idle machine (no competing sweep) — `Result: 92 PASS, 0 FAIL, 1 SKIPPED (total checks: 93)`, exit 0, 14.457s wall-clock. **Identical** to the summary line recorded in `138-03-SUMMARY.md` — no drift between the two idle runs.
- **HARN-15 gate, Part 2:** the drift-bearing band (30, 31, 48, 60, 61, 62, 63, 64, 65, 66) run non-nested, one validator at a time, with per-validator exit codes and FAIL-line content captured directly (not asserted). Observed RED set is exactly the ten named members, four root-cause classes confirmed by content, V-61's four individual failing check IDs listed with per-ID cause attribution.
- **HARN-15 gate, Part 3:** exponential full-90-sweep non-attempt recorded with freshly-measured doubling (4/9/18/38/71/143/290s across 60..66 this run, closely reproducing the plan's canonical 5/10/19/37/75/148/~300s figures) and the structural reason (9 validators in that band do not propagate `CHECK_PHASE_NESTED` to their own children).
- **Byte-unchanged HARD gate:** `git diff 64ee54dd6a4d7ec7617521a988912e10df781808..HEAD` restricted to the pre-committed 47-surface inventory (16+16+15) plus `check-phase-48..134.mjs` (87 files) = **empty**. Three shared `_lib` dependencies (`c17-eee-contract.mjs`, `_lib/archive-path.mjs`, `_lib/exec-fail-detail.mjs`) = **zero diff**. `_lib/frozen-at-close.mjs` numstat = **11 added / 0 deleted** (the V118 append only). Full HEAD diff enumerated: exactly this phase's own 12 new/appended files, no unexplained entry.
- **Archival-drift PRE-scan, both halves:** hardcoded-phase-path readers confined to comment-only (`check-phase-31.mjs:3`) and two frozen-aware readers (`check-phase-70.mjs` via `readAtV17Close`, `check-phase-124.mjs` via `readAtV116Close`) — the four new leaves (135-138) and the apex carry zero such reads. Live-vs-frozen REQUIREMENTS/ROADMAP readers: `check-phase-54.mjs` reads both **LIVE** via raw `fs.readFileSync` with a negative assertion (V-54-21); `check-phase-61.mjs` and `check-phase-70.mjs` read the same docs **frozen-aware**; `check-phase-66.mjs` only cites a `ROADMAP.md:239` line number in an error string — not an actual file read.
- **Axis 1 (Windows fresh clone, ADVISORY):** `git clone --no-hardlinks` into a scratch temp dir, clone HEAD == source HEAD (`b418ca91`). 17th harness + 3 new leaves all exit 0; full apex recursion `[48..137]` **completed clean in 19s, 92/0/1** — no deep-nest stall this cycle (a third consecutive clean cycle after v1.17/v1.18; NOT treated as retiring the known platform timeout). Clone removed post-audit (zero orphan temp dirs).
- **Axis 3 (corroborating, mandatory-in-execution):** attempted the FULL non-nested apex first, as required. **Toolset gap recorded honestly:** this executor exposes no agent-dispatch primitive, so a true "fresh sub-agent carrying no context from the other axes" could not be spawned. The best available proxy — a third, fully independent, non-nested apex invocation against the live working tree (distinct process, distinct from both the Part-1 run and the Axis-1 clone) — returned **92/0/1 in 14s**, matching both prior runs exactly. This is recorded as **same-host, same-agent-context** — it does NOT satisfy Axis-3's host-independence or context-independence mandate, and is flagged for explicit human confirmation (see `coverage.D4.rationale`) rather than silently counted as a passing leg.
- **Publish bundle:** `node scripts/pipeline/build-publish-bundle.mjs --version=v1.19` (pandoc + pwsh precondition confirmed first) — **225 docx converted+guarded+staged, 0 errors**, registry parity 225 Approved/225 staged/0 excluded/0 missing/0 orphan. `RE-224` and `RE-225` (the two new recipes) both report `GUARD-OK`. `dist/docs-library-v1.19.zip` written (3.8 MB).
- **Dispatch list:** `ls .github/workflows/*.yml` = **16**, enumerated fresh (not carried from any prior count).

## Task Commits

No source files were edited by any of this plan's three tasks — every task's own `<files>` annotation states evidence is recorded directly in this SUMMARY (Task 1: `(no file edits — evidence recorded in 138-04-SUMMARY.md)`; Task 2: `(no file edits — verdict recorded in 138-04-SUMMARY.md)`; Task 3: `(no source files edited; the bundle lands in the gitignored dist directory)`). This plan therefore produces **zero task-level commits** — only the plan-completion metadata commit (this SUMMARY + STATE.md + ROADMAP.md) below.

**Plan metadata:** committed alongside this SUMMARY (see final commit).

## HARN-15 Gate — Part 1: Apex Green Non-Nested, Idle Machine

```
node scripts/validation/check-phase-138.mjs --verbose
...
Result: 92 PASS, 0 FAIL, 1 SKIPPED (total checks: 93)
```

Exit code `0`. Wall-clock `14.457s`. Run with `CHECK_PHASE_NESTED` unset, no competing local load (no other Node process running concurrently).

**Comparison against `138-03-SUMMARY.md`'s recorded line** (`Result: 92 PASS, 0 FAIL, 1 SKIPPED (total checks: 93)`): **identical, character for character.** No drift between the two idle runs.

## HARN-15 Gate — Part 2: Drift-Bearing Band, Non-Nested, Per-Validator

Each validator run individually (`node scripts/validation/check-phase-N.mjs --verbose`), `CHECK_PHASE_NESTED` unset, one at a time:

| Validator | Exit | Wall-clock | Observed result line |
|---|---|---|---|
| check-phase-30 | 1 | 1s | `Summary: 10 passed, 2 failed, 1 skipped` |
| check-phase-31 | 1 | 0s | `Summary: 26 passed, 3 failed, 1 skipped` |
| check-phase-48 | 1 | 0s | `Result: 6 PASS, 1 FAIL, 0 SKIPPED` |
| check-phase-60 | 1 | 4s | `Result: 22 PASS, 3 FAIL, 0 SKIPPED` |
| check-phase-61 | 1 | 9s | `Result: 30 PASS, 4 FAIL, 0 SKIPPED` |
| check-phase-62 | 1 | 18s | `Result: 30 PASS, 4 FAIL, 0 SKIPPED` |
| check-phase-63 | 1 | 38s | `Result: 27 PASS, 5 FAIL, 0 SKIPPED` |
| check-phase-64 | 1 | 71s | `Result: 23 PASS, 6 FAIL, 0 SKIPPED` |
| check-phase-65 | 1 | 143s | `Result: 26 PASS, 7 FAIL, 0 SKIPPED` |
| check-phase-66 | 1 | 290s | `Result: 20 PASS, 8 FAIL, 0 SKIPPED` |

**Observed RED set: exactly ten members — 30, 31, 48, 60, 61, 62, 63, 64, 65, 66.** Matches the CONTEXT D-16 enumeration exactly; no difference to record.

### Four Root-Cause Classes (observed, not asserted)

**(a) Self-test classifier vs. frozen Phase-43 fixture** — `regenerate-supervision-pins.mjs --self-test` fails at `docs/_glossary-android.md:145` (`=== self-test: reproduce Phase 43 hand-authored new-pin set === ... classifier diverges from hand-authored set`). This **is** `DEFER-119-A`, one defect, not a new one. Present directly in: 48, 60, 61 (`V-61-34`), and inside 62-66's own `AUDIT` sub-check.

**(b) v1.5-harness C5 freshness `90d > 60d`** on the same file (`docs/_glossary-android.md`), formally superseded by Phase 112's 90d lock. Present directly in: 60, 61 (`V-61-33`), and re-manifests inside 62-66's own `AUDIT` sub-check (each generation's own milestone-audit harness — `v1.6-milestone-audit.mjs` for 62-66 — carries an equivalent freshness check against the same unresolved file).

**(c) Cascading chain-guards** — 48 red → 60 red → 61 red → 62..66 inherit via their own `CHAIN-*` sub-checks. Observed directly:
- check-phase-62: `CHAIN-48` FAIL, `CHAIN-60` FAIL, `CHAIN-61` FAIL
- check-phase-63: `CHAIN-48/60/61/62` FAIL (4)
- check-phase-64: `CHAIN-48/60/61/62/63` FAIL (5)
- check-phase-65: `CHAIN-48/60/61/62/63/64` FAIL (6)
- check-phase-66: `CHAIN-48/60/61/62/63/64/65` FAIL (7)

**(d) Pre-chain content drift in 30/31** (outside every `CHAIN_PHASES` array — never touched by the cascade): check-phase-30 fails "Expected 1-5 decision-diamond nodes, found 0" and the `l1-template.md` `"Windows | macOS | iOS | all"` literal; check-phase-31 fails `V-31-23` (line-182 diff vs `expected-d23.txt`), `V-31-25` (L2 template iOS enum), `V-31-29` (runbook line counts ±15%).

### check-phase-61's Four Individual Failures (named, per D-16)

| Check ID | Detail (observed) | Class |
|---|---|---|
| `V-61-21` | `check-phase-48.mjs exits 0 (CHAIN regression-guard) FAIL` | (c) cascade from 48 |
| `V-61-32` | `check-phase-60.mjs exits 0 (CHAIN regression-guard) FAIL` | (c) cascade from 60 |
| `V-61-33` | `v1.5-milestone-audit.mjs ... C5: last_verified frontmatter ... FAIL — 1 freshness violation(s): docs/_glossary-android.md (review_by-last_verified=90d (>60))` | (b) superseded freshness |
| `V-61-34` | `regenerate-supervision-pins.mjs --self-test exits 0 (AUDIT-07 closure persistence) FAIL` | (a) self-test classifier |

All four classes present in a single validator, confirming the CONTEXT's finding that earlier records naming only the last two understated the failure by half.

**MANDATORY STATEMENT:** fixing class (a) (the self-test classifier) and class (b) (the superseded freshness rule) would **NOT** green the ten-member set. Class (c) (cascading chain-guards, 62-66's `CHAIN-*` sub-checks) and class (d) (30/31's pre-chain content drift) are structurally independent of (a)/(b) and would survive both fixes untouched. A successor who "fixes" only (a)+(b) will find 30, 31, and the `CHAIN-*` legs of 62-66 still red.

## HARN-15 Gate — Part 3: Exponential Full-Sweep Non-Attempt

A full non-nested sweep of all 90 `CHAIN_PHASES` entries (`[48..137]`) is **exponential** and is **deliberately not attempted**. Measured doubling across phases 60 through 66, this run:

```
60: 4s   61: 9s   62: 18s   63: 38s   64: 71s   65: 143s   66: 290s
```

This closely reproduces the plan's canonical figures (`5/10/19/37/75/148/~300s`) — same doubling shape, consistent with a fresh measurement rather than a stale carried number. Root cause: nine validators in the 60-66 band do not propagate `CHECK_PHASE_NESTED` to their own children (each spawns its own non-nested predecessor chain), so wall-clock cost compounds multiplicatively with distance from 60. Extrapolating the same doubling past 66 toward 137 would run into multi-hour territory — a bounded, honestly-labelled gate, not a full sweep.

**No claim of a zero-failure result for the full non-nested chain is made anywhere in this document** — the forbidden phrasing named at `STATE.md:343` does not appear here; verified by grep below.

## Byte-Unchanged HARD Gate

**Anchor:** `WAVE0_ANCHOR=64ee54dd6a4d7ec7617521a988912e10df781808` (recorded in `138-01-SUMMARY.md`).

**47-surface + 87-file predecessor inventory, restricted diff:**
```
git diff --name-only 64ee54dd6a4d7ec7617521a988912e10df781808..HEAD -- <16 predecessor milestone-audit .mjs> <16 predecessor sidecar .json> <15 predecessor .yml> <check-phase-48..134.mjs>
```
**Output: empty.** No predecessor frozen surface drifted.

**Three shared `_lib` dependencies (byte-frozen for this phase, no carve-out):**
```
git diff --name-only 64ee54dd..HEAD -- scripts/validation/c17-eee-contract.mjs scripts/validation/_lib/archive-path.mjs scripts/validation/_lib/exec-fail-detail.mjs
```
**Output: empty.**

**Fourth shared dependency (append-only license):**
```
git diff --numstat 64ee54dd..HEAD -- scripts/validation/_lib/frozen-at-close.mjs
11    0    scripts/validation/_lib/frozen-at-close.mjs
```
0 deletions; the 11 added lines are exactly the V118 entry + `readAtV118Close` export landed in Plan 138-01.

**Full HEAD diff (this phase's own new/appended files, the sole other entries):**
```
git diff --name-only 64ee54dd..HEAD
.github/workflows/audit-harness-v1.19-integrity.yml         (138-03, new)
.planning/REQUIREMENTS.md                                    (plan-completion bookkeeping)
.planning/ROADMAP.md                                         (plan-completion bookkeeping)
.planning/STATE.md                                            (plan-completion bookkeeping)
.planning/phases/138-.../138-01-SUMMARY.md                   (138-01)
.planning/phases/138-.../138-02-SUMMARY.md                   (138-02)
.planning/phases/138-.../138-03-SUMMARY.md                   (138-03)
scripts/validation/_lib/frozen-at-close.mjs                  (138-01, append-only)
scripts/validation/check-phase-135.mjs                       (138-03, new)
scripts/validation/check-phase-136.mjs                       (138-03, new)
scripts/validation/check-phase-137.mjs                       (138-03, new)
scripts/validation/check-phase-138.mjs                       (138-03, new)
scripts/validation/regenerate-supervision-pins.mjs           (138-02, BASELINE_23 append)
scripts/validation/v1.19-audit-allowlist.json                (138-02, new)
scripts/validation/v1.19-milestone-audit.mjs                 (138-02, new)
```
Every entry maps to a named, sanctioned Phase-138 deliverable from Plans 138-01/02/03 (see `<artifacts_produced>` table in `138-04-PLAN.md`); **no unexplained member.**

**Verdict: CLEAN.** No unsanctioned drift on any frozen predecessor surface or shared dependency.

## Archival-Drift PRE-Scan (widened, both halves)

### Half 1 — Hardcoded `.planning/phases/` path readers

Searched `scripts/validation/*.mjs` for literal `'.planning/phases/[0-9]` / `".planning/phases/[0-9]` strings:

| File | Reference | Read mechanism | Disposition |
|---|---|---|---|
| `check-phase-31.mjs:3` | Source-of-truth comment only | N/A — not read at runtime | Safe (comment, no code path) |
| `check-phase-70.mjs:374,388` | `DELIVERABLE.../70-04-AUDIT-RESULTS.md` | `readCorpusFileAtV17Close(PATH)` | **Frozen-aware** — safe (2nd sanctioned option) |
| `check-phase-124.mjs:46,97` | `DELIVERABLE_PIPE05` (`.../124-.../PIPE-05-FINDINGS.md`) | `readAtV116Close(DELIVERABLE_PIPE05)` | **Frozen-aware** — safe (2nd sanctioned option) |

**The four new leaves (135, 136, 137, 138) and the apex contain zero `.planning/phases/` reads** in code — `check-phase-138.mjs`'s only occurrences are the two header comments (source-of-truth pointers), never read at runtime. This confirms the v1.18 sidestep held for a second consecutive milestone.

### Half 2 — Live REQUIREMENTS.md / ROADMAP.md readers (the class a phase-path-only scan would miss)

| File | Reference | Read mechanism | Disposition |
|---|---|---|---|
| `check-phase-54.mjs:30-31,346` | `REQ`/`ROAD` consts, `V-54-21` NEGATIVE assertion | `fs.readFileSync` direct (live) | **LIVE-READING — the exposure.** Close-gate rewrites both docs; this check's negative assertion ("ZERO '05-compliance-policy.md' references") reads whatever REQUIREMENTS.md/ROADMAP.md say at the moment it runs. |
| `check-phase-61.mjs:49-50,65-149` | `REQUIREMENTS`/`ROADMAP` consts, `V-61-01..08` | `readAtV15Close`-style (`"could not read ... at v1.5-close ba2cbc0"`) | **Frozen-aware** — safe |
| `check-phase-70.mjs:51,54,485,516` | `readAtV17Close('.planning/REQUIREMENTS.md')`, `readAtV17Close('.planning/ROADMAP.md')` | Frozen-at-close read | **Frozen-aware** — safe |
| `check-phase-66.mjs:86,115` | `"... AUDIT-14 contract per ROADMAP.md:239"` | String literal in an error-detail message only — no `readFileSync`/`readAtVxClose` call on either doc anywhere in the file | **Not a read at all** — false-positive from a naive grep, confirmed by source inspection |

The 16 predecessor milestone-audit harnesses (`v1.5`..`v1.18-milestone-audit.mjs`) were also checked: their only `REQUIREMENTS.md`/`ROADMAP.md` occurrence is a single out-of-scope comment (`// External MS Learn URL validation explicitly OUT OF SCOPE (REQUIREMENTS.md).`) repeated verbatim across generations — not a read, no exposure.

**Second sanctioned option restated for a successor:** a hardcoded phase path is safe when read at a frozen close SHA (`check-phase-70.mjs` via `readAtV17Close`, `check-phase-124.mjs` via `readAtV116Close`) rather than live HEAD — this is the pattern `check-phase-54.mjs` does NOT follow for REQUIREMENTS/ROADMAP, which is exactly why it is the exposure this widened scan exists to name.

## Axis 1 — Windows Fresh Clone (ADVISORY)

```
git clone --no-hardlinks D:/claude/Autopilot <scratch temp dir>
```
- Clone HEAD: `b418ca91ca3820121185bd3001ed34557f45bb67` == source HEAD. **HEAD MATCH: YES.**
- 17th harness (`v1.19-milestone-audit.mjs --verbose`): `Summary: 16 passed, 0 failed, 0 skipped`.
- Three new leaves: `check-phase-135` 7/0, `check-phase-136` 11/0, `check-phase-137` 5/0 — all exit 0.
- Full apex recursion (`check-phase-138.mjs --verbose`, `[48..137]`): **`Result: 92 PASS, 0 FAIL, 1 SKIPPED (total checks: 93)`, exit 0, 19s wall-clock. No deep-nest stall.**
- Clone removed post-audit: `true` (directory confirmed absent after `rm -rf`). Zero orphan temp dirs.

**Honest-history sentence:** `v1.15-MILESTONE-AUDIT.md:221` records *"apex NOT run on Windows (cascade per D-119-2)"*, and v1.16 likewise — **not-run at v1.15/v1.16**. v1.17 and v1.18 were clean. This run makes v1.19 a **third consecutive clean cycle**. Per D-10, two (now three) clean cycles do **not** retire `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` as a known platform timeout — promoting it to a hard close-blocker would make a flaky win32 property gate the settled D-03 OS split. Status remains **ADVISORY, non-blocking**. Not-run is not the same as clean; this entry states which of the two applied at each prior close rather than collapsing them into an inflated streak.

## Axis 3 — Fresh Zero-Context Reproduction (corroborating, mandatory-in-execution)

**Attempted the FULL non-nested apex first**, per D-12 — no shallow `CHECK_PHASE_NESTED=1` fallback was used, so the shape-match-vs-count-match distinction does not arise here.

**Toolset limitation, stated plainly rather than silently substituted:** the plan instructs dispatching "a fresh sub-agent carrying no context from the other axes." This executor's available toolset for this plan (`Read`, `Write`, `Edit`, `Bash`, `Grep`, `Glob`, `Skill`) includes no agent-dispatch/subagent-spawn primitive. A genuinely isolated, zero-context LLM sub-agent could not be invoked.

**Best-available proxy, recorded as such:** a third, independent, non-nested `node scripts/validation/check-phase-138.mjs --verbose` invocation against the live working tree — a fresh OS process, distinct from both the Part-1 idle run and the Axis-1 clone run, but **same host and same executing agent/context** as both.

```
Result: 92 PASS, 0 FAIL, 1 SKIPPED (total checks: 93)
```
Exit 0, 14s wall-clock — **matches both prior runs exactly.**

**Host-independence, stated plainly:** this proxy inherits the win32 platform timeout and shares this agent's prior context from Parts 1-2 and Axis 1 above. It is **not host-independent** and **not context-independent** — do not inflate it. It corroborates the *result* (a fourth identical 92/0/1 observation across four independently-invoked processes this session) but does **not** satisfy Axis 3's mandate for an isolated reproduction. This gap is surfaced via `coverage.D4.human_judgment: true` above for explicit owner confirmation before Plan 138-05/138-06 treat HARN-16's cross-axis leg as fully discharged.

## Publish Bundle Regeneration

**Precondition confirmed first:** `pandoc --version` → `pandoc.exe 3.7.0.2` (exit 0); `pwsh -NoProfile -Command 'exit 0'` (exit 0).

```
node scripts/pipeline/build-publish-bundle.mjs --version=v1.19
...
RE-224 .................................................................. GUARD-OK
RE-225 .................................................................. GUARD-OK

Registry parity: 225 Approved rows, 225 staged, 0 excluded, 0 missing, 0 orphan.

Wrote D:\claude\Autopilot\dist\docs-library-v1.19.zip
Batch complete: 225 docx converted+guarded+staged, 0 errors.
```

Exit 0, 236s wall-clock. Both new recipes (`RE-224` Windows 11 Multi-App Kiosk, `RE-225` Android Dedicated MHS Multi-App) converted and guard-clean on this run — first attempt, no remediation round, consistent with `137-CONTEXT.md` D-24's pre-flight (both were already clean at Phase 137). `dist/` is gitignored; `docs-library-v1.19.zip` (3.8 MB) confirmed present via `ls -la`.

The `build-filename-map.mjs --self-test` canary is already at the Phase-137-delivered value (`225 rows` — grep-confirmed at `build-filename-map.mjs:282-284`), not touched by this plan.

## Hand-Over Block — Owner Checkpoint (Plan 138-05)

**16 workflow filenames** (`ls .github/workflows/*.yml`, freshly enumerated, never carried from a prior count):

```
audit-harness-integrity.yml
audit-harness-v1.5-integrity.yml
audit-harness-v1.6-integrity.yml
audit-harness-v1.7-integrity.yml
audit-harness-v1.8-integrity.yml
audit-harness-v1.9-integrity.yml
audit-harness-v1.10-integrity.yml
audit-harness-v1.11-integrity.yml
audit-harness-v1.12-integrity.yml
audit-harness-v1.13-integrity.yml
audit-harness-v1.14-integrity.yml
audit-harness-v1.15-integrity.yml
audit-harness-v1.16-integrity.yml
audit-harness-v1.17-integrity.yml
audit-harness-v1.18-integrity.yml
audit-harness-v1.19-integrity.yml
```

**Two exact commands the owner runs** (per CONTEXT D-01/D-02 — the executor may not run either; this plan performed neither):

```
git push origin master
gh workflow run audit-harness-v1.19-integrity.yml --ref master
```

After the push lands and dispatch fires, Plan 138-05 captures the live Axis-2 authoritative run (both chain validators, PASS/FAIL/SKIP exact match against this plan's local Axis-1/Axis-3 observations) before the close-gate in Plan 138-06 is authored.

## Files Created/Modified

None — this plan is evidence-gathering only. The plan-completion metadata commit carries this SUMMARY.md plus STATE.md/ROADMAP.md/REQUIREMENTS.md bookkeeping.

## Decisions Made

- HARN-16 is **not** marked complete by this plan (see `key-decisions` in frontmatter) — only its pre-push evidence half is delivered; `requirements.mark-complete` is invoked for HARN-15 only.
- Axis 3's literal "dispatch a fresh sub-agent" instruction is unsatisfiable with this executor's toolset; recorded honestly as a same-host, same-context proxy with an explicit `human_judgment: true` coverage flag rather than silently substituted or claimed as a passing leg.
- Classes (a)/(b) for validators 62-66 are attributed via their own `AUDIT` sub-check (a fresh per-generation re-manifestation of the same root file condition), while their `CHAIN-*` sub-checks are pure class-(c) cascade — both routes named per-check so neither is mistaken for a fifth cause.

## Deviations from Plan

None — plan executed exactly as written. The Axis-3 toolset gap (above) is a disclosed limitation of the execution environment, not a deviation from the plan's instructions; the plan's own text ("If a gate genuinely fails, report it honestly and stop rather than massaging the evidence") is precisely what is being honored by naming the gap explicitly rather than fabricating a sub-agent dispatch that did not occur.

## Issues Encountered

- No agent-dispatch tool available for Axis 3's literal "fresh sub-agent" requirement — resolved by running the best-available same-host proxy and flagging the gap explicitly for human confirmation (see Axis 3 section and `coverage.D4`).
- `check-phase-66` (the longest drift-band member) ran ~290s, consistent with the plan's own stated exponential-cost warning; captured via a backgrounded shell command with generous timeout rather than truncated.

## User Setup Required

None — no external service configuration required. **Owner action required at the Plan 138-05 checkpoint:** run the two commands in the Hand-Over Block above (`git push origin master` then `gh workflow run audit-harness-v1.19-integrity.yml --ref master`) — this plan performed neither, per D-01/D-02.

## Next Phase Readiness

- All three locally-provable parts of the HARN-15 gate are proven and recorded; Part 4 (the post-close-gate confirmatory apex run asserting `V-138-AUDIT` is PASS not SKIP) is explicitly deferred to Plan 138-06, per the plan's own scope.
- The byte-unchanged HARD gate is clean — Plan 138-05/138-06 can proceed without a scoped CARVE.
- The archival-drift PRE-scan's live-reading exposure (`check-phase-54.mjs`) is named for Plan 138-06's own archival-drift handling; it was not remediated here (out of scope for a harness-close phase per HARNESS-PHASE discipline — only scanned and recorded).
- Axis 1 is a third consecutive clean cycle, ADVISORY, non-blocking, recorded honestly against the not-run-vs-clean history.
- Axis 3's toolset gap is flagged via `coverage.D4.human_judgment: true` — Plan 138-05/138-06 (or the owner directly) should confirm whether the same-host proxy is an acceptable substitute, or whether a genuinely isolated reproduction is required before HARN-16 is treated as fully discharged.
- `dist/docs-library-v1.19.zip` exists and is guard-clean; the 16-workflow dispatch list and the two owner commands are ready for the Plan 138-05 checkpoint.
- No `git push` or `gh workflow run` was executed by this plan, per the phase's hard constraint.

---
*Phase: 138-v118-pin-17th-path-a-lineage-bump-terminal-close*
*Completed: 2026-08-04*

## Self-Check: PASSED

- FOUND: `.planning/phases/138-v118-pin-17th-path-a-lineage-bump-terminal-close/138-04-SUMMARY.md`
- FOUND: `dist/docs-library-v1.19.zip`
- CONFIRMED: `git diff --name-only 64ee54dd6a4d7ec7617521a988912e10df781808..HEAD` restricted to the 47-surface + 87-file inventory = empty
- CONFIRMED: the forbidden zero-failure full-chain phrase (`STATE.md:343`) does not appear in this file (grep count 0)
