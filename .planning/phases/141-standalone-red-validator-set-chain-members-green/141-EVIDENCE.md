# Phase 141 Plan 05: RED-01 and RED-03 Evidence

Measured at HEAD `4679a793` on a quiesced Windows machine, one validator running at a time
throughout. Every figure below was executed in this session — none is inherited from a prior
plan's assertion or from `141-CONTEXT.md`'s pre-Plan-04 ledger, per D-31's re-execute-every-number
discipline.

---

## RED-01: nine-harness evidence — direct invocation, zero glossary edits

### Quiesce assertion (pre-run)

```
Get-CimInstance Win32_Process -Filter "Name='node.exe'" |
  Where-Object { $_.CommandLine -like '*check-phase*' -or $_.CommandLine -like '*milestone-audit*' }
```
Output: **zero rows** — no validator or harness process running before the first invocation.

**Cache state: warm.** This machine had already run `check-phase-60`/`-61` bare once earlier in
this same session (as part of confirming the two chain checks below), so filesystem/require
caches for the shared `scripts/validation/` tree were warm for this run. Every wall-clock figure
in this document is warm; no cold-clone figure is claimed here (D-22 — that leg is CI's, not
this machine's).

### Harness enumeration (by directory listing, not transcription)

```
$ ls scripts/validation/v1.*-milestone-audit.mjs
v1.10-milestone-audit.mjs  v1.13-milestone-audit.mjs  v1.16-milestone-audit.mjs  v1.19-milestone-audit.mjs  v1.5-milestone-audit.mjs  v1.8-milestone-audit.mjs
v1.11-milestone-audit.mjs  v1.14-milestone-audit.mjs  v1.17-milestone-audit.mjs  v1.4-milestone-audit.mjs   v1.6-milestone-audit.mjs  v1.9-milestone-audit.mjs
v1.12-milestone-audit.mjs  v1.15-milestone-audit.mjs  v1.18-milestone-audit.mjs  v1.4.1-milestone-audit.mjs v1.7-milestone-audit.mjs
```

Of the 17 milestone-audit harnesses present in the directory, **nine are RED-01's named set**:
v1.5 through v1.13. (v1.4/v1.4.1 and v1.14–v1.19 exist but are out of RED-01's scope — RED-01's
text names only v1.5–v1.13, the range whose C5/C10 freshness legs were converted by Phase 140's
frozen-aware conversion of that specific sub-range.)

### Nine-harness table (direct invocation, serial, one at a time)

| Harness | Exit code | Result | Assertion count |
|---|---|---|---|
| `v1.5-milestone-audit.mjs` | 0 | 12 passed, 0 failed, 0 skipped | 12 |
| `v1.6-milestone-audit.mjs` | 0 | 15 passed, 0 failed, 0 skipped | 15 |
| `v1.7-milestone-audit.mjs` | 0 | 15 passed, 0 failed, 0 skipped | 15 |
| `v1.8-milestone-audit.mjs` | 0 | 15 passed, 0 failed, 0 skipped | 15 |
| `v1.9-milestone-audit.mjs` | 0 | 15 passed, 0 failed, 0 skipped | 15 |
| `v1.10-milestone-audit.mjs` | 0 | 15 passed, 0 failed, 0 skipped | 15 |
| `v1.11-milestone-audit.mjs` | 0 | 15 passed, 0 failed, 0 skipped | 15 |
| `v1.12-milestone-audit.mjs` | 0 | 15 passed, 0 failed, 0 skipped | 15 |
| `v1.13-milestone-audit.mjs` | 0 | 15 passed, 0 failed, 0 skipped | 15 |

All nine exit 0 **and** all nine report a non-zero total assertion count. This second fact matters
independently of the exit code: every one of these harnesses exits 0 on a zero failure count, so a
run that executed zero assertions (e.g. an empty corpus glob, a broken `require`) would also exit
0 and look identical to a real pass by exit code alone. The assertion-count column is what rules
that out here — 12 for v1.5 (the smaller pre-C16/C14/C15 harness shape) and 15 for v1.6–v1.13
(after those three checks were added), matching the counts each harness's own summary line
reports, not a number derived separately.

### Zero corpus edits

```
$ git diff --stat -- docs/
(no output)

$ git diff --stat -- docs/_glossary-android.md docs/_glossary-macos.md
(no output)

$ git status --porcelain -- docs/
(no output)
```

All three commands ran clean (no output) both before and after the nine-harness run and the
RED-03 sweep below. **Why this matters:** both `docs/_glossary-android.md` and
`docs/_glossary-macos.md` sit at exactly ninety days' staleness against the C5/C10 freshness
check's `>90` (strictly-greater) test. A `>` test resolves the exactly-equal case as PASS by
construction — but only if the `last_verified` value is not touched. A one-day shift in either
direction (backdating to "fix" a near-miss, or forward-dating to "refresh" a passing file) would
flip the boundary and take multiple currently-green `audit-harness-*` workflows red, because
several validators downstream key off the same date field. Zero edits is therefore not merely
"the plan followed the rule" — it is the specific fact that keeps this exact boundary condition
in its current passing state.

### The two chain checks, quoted from real runs

```
scripts/validation/check-phase-60.mjs, bare, quiesced:
[23/25] V-60-23: v1.5-milestone-audit.mjs exits 0 in fully-blocking mode (12/12 PASS post-Plan-08) PASS

scripts/validation/check-phase-61.mjs, bare, quiesced:
[33/34] V-61-33 (V-61-AUDIT): v1.5-milestone-audit.mjs exits 0 in fully-blocking mode (12/12 PASS) PASS
```

Both lines are read verbatim from the actual `stdout` of the two validators in the RED-03 sweep
below (member 60 and member 61), not paraphrased or reconstructed from the source.

### Ordering, observed

`141-CONTEXT.md` D-29 and `ROADMAP.md`'s Phase 141 Depends-on line both predicted this order in
advance: RED-01's freshness leg would clear first, as a consequence of Phase 140's frozen-aware
harness conversion (which made v1.5–v1.13 read their own corpus at their own close SHA instead of
live HEAD, resolving the 60-day-vs-90-day frozen/evolved mismatch), and RED-02's self-test rebase
(Phase 141 Plan 02) would only then be able to green the cascade — because the self-test alone
greens exactly one validator (`check-phase-48`), not six, per `REQUIREMENTS.md`'s own "Ordering,
corrected" paragraph. This session's evidence confirms that predicted order was in fact the
observed order: the nine harnesses above already pass with zero glossary edits (RED-01, cleared by
Phase 140), and `check-phase-60`/`-61`'s self-test checks (V-60-10, V-61-34) now also pass because
`regenerate-supervision-pins.mjs --self-test` was rebased in Plan 02 — after RED-01 was already
discharged, not before. The evidence artifact records this as observed fact, not as an assumption
carried forward from planning.

### Status

RED-01 flips **Pending → Complete** at this phase (Phase 141). It reaches **Validated** only at
Phase 144's single close-gate commit, alongside all 28 v1.20 requirements, per `ROADMAP.md`'s
Phase 144 SC#4 and the eight-prior-milestone invariant that a close-gate is the sole place any
requirement is marked Validated. This document does not write "Validated" anywhere against RED-01
or any other requirement.

---

## RED-03: dual-form evidence — eight ascending standalone runs, one verbose composition run

Per D-20, the evidence path is **both** forms, not either:

- **Form (a):** eight ascending quiesced bare invocations, `48 → 60 → 61 → 62 → 63 → 64 → 65 → 66`,
  captured by `141-sweep.ps1` (this plan's other artifact).
- **Form (b):** one `check-phase-66.mjs --verbose` run, whose `V-66-CHAIN-N` lines report every one
  of 48 through 65 individually **in composition** — a property eight isolated runs cannot
  establish, because each isolated run only proves that member green in isolation, not that
  member's own predecessors stayed green when re-verified from inside 66's own chain-guard loop.

### Form (a): `141-sweep.ps1` — eight ascending standalone invocations

**Cache state: warm** (declared as the script's mandatory `-CacheState` parameter, not inferred).
Serial execution: strictly one process at a time — the script's own design never launches a second
validator before the previous one's `execFileSync`-equivalent call returns.

**Process-count assertion (executable, not a prose acknowledgment):**

```
Pre-sweep validator process count: 0 (asserted zero)
...
Post-sweep validator process count: 0 (asserted zero)
```

The script queries `Get-CimInstance Win32_Process -Filter "Name='node.exe'"` and filters
`CommandLine` on the literal substring `check-phase-*.mjs` — never a bare `node.exe` count, which
is unexecutable both here (this machine runs several permanent non-validator node processes, e.g.
MCP servers) and on `ubuntu-latest` (D-23). Had either assertion found a non-zero count, the script
would have written a `FATAL` error and stopped before running anything.

**Eight-row table, ascending order, every wall clock carrying the declared `warm` cache state:**

| Member | Exit code | PASS | FAIL | SKIPPED | Wall clock (ms, warm) | Anomaly (>2× expected) |
|---|---|---|---|---|---|---|
| `check-phase-48.mjs` | 0 | 7 | 0 | 0 | 289 | no |
| `check-phase-60.mjs` | 0 | 25 | 0 | 0 | 5 755 | no |
| `check-phase-61.mjs` | 0 | 34 | 0 | 0 | 12 547 | no |
| `check-phase-62.mjs` | 0 | 34 | 0 | 0 | 24 576 | no |
| `check-phase-63.mjs` | 0 | 32 | 0 | 0 | 46 129 | no |
| `check-phase-64.mjs` | 0 | 29 | 0 | 0 | 94 794 | no |
| `check-phase-65.mjs` | 0 | 33 | 0 | 0 | 194 372 | no |
| `check-phase-66.mjs` | 0 | 28 | 0 | 0 | 386 235 | no |

**Total sweep wall clock: ~765 s (~12.7 min)**, inside the ~22 min budget. Every member exits 0
with a non-zero PASS count and a zero FAIL count — the same rationale as RED-01's assertion-count
column applies here: the exit path is a failure-count test, so a run that executed no checks at
all would also exit 0, and the PASS column is what rules that degenerate case out. Every figure is
faster than the pre-Plan-04 warm figures recorded in `141-CONTEXT.md` (e.g. member 66: 386 235 ms
here vs. 664 979 ms there) — consistent with `141-04-SUMMARY.md`'s subEnv-alignment and
chain-spawn-timeout fixes landing between that measurement and this one, not an inconsistency to
be reconciled. None crossed the anomaly threshold (2× the pre-Plan-04 figure), so none is flagged.
This is a record of measured cost, not a new pass/fail gate — no wall-clock threshold is authored
anywhere in the script or in this document (D-19).

The raw machine-readable record (`141-sweep-result.json`, written by the script) sits alongside
this document in the phase directory and is the source the table above was transcribed from.

### Form (b): `check-phase-66.mjs --verbose` — composition proof for 48 through 65

Bare invocation, quiesced (0 validator processes running immediately before start), `warm` cache
state (same session, same warm filesystem/require cache as form (a) — this run followed
immediately after the sweep with the process table re-confirmed at zero in between).

**Full transcript, all 30 assertion lines** (structural checks 1–7, `ABAUDIT-STALENESS`, the 18
`CHAIN-*` lines for 48 through 65, `AUDIT`, and `SELF`):

```
check-phase-66 -- Phase 66 deliverables

[1/28] V-66-01: v1.6-milestone-audit.mjs windowKeywords contains 6 LOCKED C11 tokens PASS -- all 6 C11 LOCKED tokens present in windowKeywords
[2/28] V-66-02: v1.6-audit-allowlist.json c13_rotting_external is populated object + quarterly_audit metadata PASS -- c13_rotting_external populated with quarterly_audit.cadence="0 8 1 1,4,7,10 *"
[3/28] V-66-03: regenerate-supervision-pins.mjs contains BASELINE_10 freshness comment PASS -- BASELINE_10 freshness comment present (mirrors BASELINE_9 pattern at lines 390/393/396)
[4/28] V-66-04: v1.6-milestone-audit.mjs synthetic regex 7 (line 854) matches production (line 725) negative-lookahead extension PASS -- synthetic regex 7 negative-lookahead extension appears 2 times (production line 725 + synthetic line 854)
[5/28] V-66-05: .github/workflows/audit-harness-v1.6-integrity.yml exists with both crons + rotting-external-quarterly job + tight v1.6 path-filter list PASS -- CI workflow present (name: Audit Harness v1.6 Integrity); both crons + rotting-external-quarterly job + v1.6 path-filter present
[6/28] V-66-06: .planning/milestones/v1.6-MILESTONE-AUDIT.md exists with YAML frontmatter + 39/39 + 5/5 + performed_by D-22-INTENT narrative PASS -- v1.6-MILESTONE-AUDIT.md present (requirements: 39/39 | phases: 5/5)
[7/28] V-66-07: .planning/milestones/v1.6-DEFERRED-CLEANUP.md exists with CI-1/CI-2/CI-3 sections + CHAIN_SKIP-CRLF section PASS -- v1.6-DEFERRED-CLEANUP.md present (title: v1.6 Deferred Cleanup — v1.7+ Backlog)
[ABAUDIT-STALENESS/28] V-66-ABAUDIT-STALENESS: every ABAUDIT comment has C15-banned next_line (no orphans) PASS -- 11 ABAUDIT exemptions verified load-bearing (all next_lines trigger >=1 C15 regex)
[CHAIN-48/28] V-66-CHAIN-48: check-phase-48.mjs exits 0 (CHAIN regression-guard) PASS -- check-phase-48 exits 0
[CHAIN-49/28] V-66-CHAIN-49: check-phase-49.mjs exits 0 (CHAIN regression-guard) PASS -- check-phase-49 exits 0
[CHAIN-50/28] V-66-CHAIN-50: check-phase-50.mjs exits 0 (CHAIN regression-guard) PASS -- check-phase-50 exits 0
[CHAIN-51/28] V-66-CHAIN-51: check-phase-51.mjs exits 0 (CHAIN regression-guard) PASS -- check-phase-51 exits 0
[CHAIN-52/28] V-66-CHAIN-52: check-phase-52.mjs exits 0 (CHAIN regression-guard) PASS -- check-phase-52 exits 0
[CHAIN-53/28] V-66-CHAIN-53: check-phase-53.mjs exits 0 (CHAIN regression-guard) PASS -- check-phase-53 exits 0
[CHAIN-54/28] V-66-CHAIN-54: check-phase-54.mjs exits 0 (CHAIN regression-guard) PASS -- check-phase-54 exits 0
[CHAIN-55/28] V-66-CHAIN-55: check-phase-55.mjs exits 0 (CHAIN regression-guard) PASS -- check-phase-55 exits 0
[CHAIN-56/28] V-66-CHAIN-56: check-phase-56.mjs exits 0 (CHAIN regression-guard) PASS -- check-phase-56 exits 0
[CHAIN-57/28] V-66-CHAIN-57: check-phase-57.mjs exits 0 (CHAIN regression-guard) PASS -- check-phase-57 exits 0
[CHAIN-58/28] V-66-CHAIN-58: check-phase-58.mjs exits 0 (CHAIN regression-guard) PASS -- check-phase-58 exits 0
[CHAIN-59/28] V-66-CHAIN-59: check-phase-59.mjs exits 0 (CHAIN regression-guard) PASS -- check-phase-59 exits 0
[CHAIN-60/28] V-66-CHAIN-60: check-phase-60.mjs exits 0 (CHAIN regression-guard) PASS -- check-phase-60 exits 0
[CHAIN-61/28] V-66-CHAIN-61: check-phase-61.mjs exits 0 (CHAIN regression-guard) PASS -- check-phase-61 exits 0
[CHAIN-62/28] V-66-CHAIN-62: check-phase-62.mjs exits 0 (CHAIN regression-guard) PASS -- check-phase-62 exits 0
[CHAIN-63/28] V-66-CHAIN-63: check-phase-63.mjs exits 0 (CHAIN regression-guard) PASS -- check-phase-63 exits 0
[CHAIN-64/28] V-66-CHAIN-64: check-phase-64.mjs exits 0 (CHAIN regression-guard) PASS -- check-phase-64 exits 0
[CHAIN-65/28] V-66-CHAIN-65: check-phase-65.mjs exits 0 (CHAIN regression-guard) PASS -- check-phase-65 exits 0
[AUDIT/28] V-66-AUDIT: v1.6-milestone-audit.mjs exits 0 ..... PASS -- v1.6 harness exits 0
[SELF/28] V-66-SELF: CHAIN_PHASES array does NOT include 66 (no self-recursive call) PASS -- CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65] -- 66 absent (correct); CHAIN_SKIP = []

Result: 28 PASS, 0 FAIL, 0 SKIPPED
exit=0
```

**Every one of the 18 `V-66-CHAIN-N` lines for N = 48…65 reports PASS.** This is the composition
proof D-20b calls for: `check-phase-66`, run bare, re-invokes each of its 18 predecessors as its
own children (unnested, since the top-level invocation itself was unnested — this is also the
mechanism behind D-32's exponential standalone-cost curve: each child that itself carries a
`CHAIN_PHASES` array re-expands its own predecessors the same way, which is why this single
invocation took several minutes longer than form (a)'s isolated member-66 run). All 18 came back
green from inside that composition, not merely in isolation.

**Post-run quiesce re-check:** `0` validator processes running immediately after the run
completed — the machine returned to the same clean state it started in.

**Zero corpus edits, re-confirmed after both forms:** `git diff --stat -- docs/` and
`git status --porcelain` both produced no output for any `docs/` path.

---

## Mandatory statement 1: the false-green trap

**Under `CHECK_PHASE_NESTED=1`, every `CHAIN-*` guard in every chain validator (including all 18
in `check-phase-66`) returns `{pass: true, skipped: true}` without re-invoking the child process at
all** — the guard clause `if (NESTED) return { pass: true, skipped: true, ... }` short-circuits
before `execFileSync` is ever called. Independently, **all three `--self-test` call sites**
(`check-phase-48.mjs:72`, `check-phase-60.mjs:188`, `check-phase-61.mjs:385`) carry the identical
short-circuit: under nesting, none of them re-runs `regenerate-supervision-pins.mjs --self-test`
against the evolved corpus at all — they report a passing skip regardless of whether the pin array
is currently stale.

The direct consequence: **`check-phase-62` through `check-phase-66` exit 0 today, unfixed, under
`CHECK_PHASE_NESTED=1`** (i.e. under any nested or apex invocation) — not because their own content
is correct, but because every one of their internal `CHAIN-*` guards for 48/60/61/etc. is skipped
rather than evaluated. **A nested or apex run is evidence for no part of SC#2 or SC#3.** Neither
this document nor `141-sweep.ps1` produces or accepts a nested/apex figure as evidence anywhere in
this plan. If a future reader — including a Phase 144 apex report showing 93/0/0 — is tempted to
read that all-green apex as proof that RED-03 or SWEEP-09's underlying content is correct, that
reading is **wrong**: the apex's nested short-circuit makes it structurally blind to exactly the
defects this phase existed to fix. Only the two forms captured above — bare form (a) and bare
form (b) — constitute evidence for RED-03.

## Mandatory statement 2: the grandfather clause

The anti-contention rule this plan enforces (never run two validators concurrently on this
machine; assert the process count executably; declare cache state) is **scoped to same-machine
runs**. It does not, and must not, extend to a blanket "parallelisation is barred" reading. The
eight RED-03 members already run today as **parallel one-per-job CI jobs** — the v1.5 workflow
fans phases 48–61 out across separate `needs: harness-run` jobs, and the v1.6 workflow does the
same for 62–66 — on isolated GitHub Actions runners, one validator per job. This is the *only* form
the milestone's stated bar ("all 17 `audit-harness-*` workflows green") can consume; a rule that
disallowed it would declare the milestone's own acceptance evidence inadmissible.

**Figures recorded before this phase are grandfathered explicitly and are not retroactively
inadmissible.** In particular, RED-06's "+0.35 s on a ~17 s apex" figure (Phase 142's chain-adoption
cost, already recorded in `STATE.md`'s Phase 142 delivery description) was measured under the
apex's own concurrency/nesting shape and remains valid evidence for its own claim — this plan's
same-machine serialization rule governs *this plan's own sweep*, not every wall-clock figure ever
recorded in this milestone.

## Mandatory statement 3: the handoff to Phase 142

`141-CONTEXT.md` D-32 measured the standalone chain's per-step cost ratio at 2.09 / 2.01 / 1.91 /
1.91 / 1.90 / 1.985 across the 60→66 range, and validated the curve at its first out-of-sample
point (`check-phase-66` projected ≈670 000 ms from the series, measured 664 979 ms — 0.75% error).
This session's own form (a) figures (5 755 → 12 547 → 24 576 → 46 129 → 94 794 → 194 372 → 386 235)
continue to show the same super-linear growth shape between consecutive members, though at
uniformly lower absolute values than the pre-Plan-04 series (consistent with Plan 04's timeout and
subEnv fixes, not a contradiction of the curve itself). **The exponential standalone curve is real
and predictive; it is handed to Phase 142 as a named input**, not re-derived or re-owned here.

**The ownership gap, stated explicitly:** Phase 142's NEST-01 requirement is scoped to the
**cold-clone apex** cost specifically (the within-apex curve under `CHECK_PHASE_NESTED=1`, which
is healthy — ~17 s, 93/0/0 at HEAD, per `STATE.md`'s durable architectural decisions). **The
non-nested standalone path measured in this document, and `check-phase-66`'s 30-minute CI job cap
covering the `--verbose` composition run, are currently owned by no requirement.** Neither RED-03
(this phase) nor NEST-01 (Phase 142) claims ownership of the standalone curve's own acceptance
bound — RED-03's obligation ends at "each member exits 0 standalone, measured," which this document
satisfies; whether that curve needs its own bound, and if so what value, is an open item for
Phase 142's discuss-phase to pick up, not a gap this plan silently closed.

---

*Phase: 141-standalone-red-validator-set-chain-members-green*
*Plan: 05*
*Evidence captured: 2026-08-08*
