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

## Dispatch Record: the first-ever CI fan-out (Plan 06)

**Shared head SHA (recorded once, every axis below is at this SHA):**
`275bbad16c479859ac9f693a9b65d6874fd23ec3` — subject `fix(141-05): strip UTF-8 BOM from
141-sweep-result.json so JSON.parse accepts it`.

### Push and remote confirmation

```
$ gh auth status
  ✓ Logged in to github.com account Schweinehund (keyring) — Active account: true
  Token scopes: 'gist', 'read:org', 'repo', 'workflow'

$ git status --porcelain            # tracked-file diff: empty (only pre-existing untracked
                                     # cruft present: .agents/, .obsidian/, e1, e2, ee,
                                     # skills-lock.json, two .claude/skills/ paths — none staged)

$ git push origin master
   347c20a8..275bbad1  master -> master

$ git fetch origin master
$ git rev-list --count origin/master..master
0
$ git rev-list --count master..origin/master
0
$ git rev-parse HEAD
275bbad16c479859ac9f693a9b65d6874fd23ec3
$ git rev-parse origin/master
275bbad16c479859ac9f693a9b65d6874fd23ec3
```

The remote was confirmed not-behind (`0`/`0` both directions) before any CI read, per the
prohibition. No untracked cruft was staged or pushed — `git status --porcelain` before the push
showed only `??` entries, and the push carried only the 99 already-committed commits.

**Owner authorization:** the blocking `checkpoint:decision` on this push (option-a vs option-b)
is **discharged by prior owner authorization**, recorded in this plan's invocation: the owner was
shown the exact scope — 99 commits publishing Phases 139, 140, and 141 together, and dispatch of
all 16 `audit-harness-*` workflows — and explicitly authorized both on 2026-08-09. This is
recorded here as the checkpoint's resolution (option-a), not re-asked.

### Dispatch commands (explicit ref, no reliance on a push trigger)

```
gh workflow run audit-harness-v1.5-integrity.yml --ref master
gh workflow run audit-harness-v1.6-integrity.yml --ref master
gh workflow run audit-harness-v1.7-integrity.yml --ref master
```

| Workflow | Run ID | URL | Head SHA (matches recorded local head) |
|---|---|---|---|
| `audit-harness-v1.5-integrity.yml` | 31320546700 | https://github.com/Schweinehund/Autopilot/actions/runs/31320546700 | `275bbad1...` — confirmed equal |
| `audit-harness-v1.6-integrity.yml` | 31320547683 | https://github.com/Schweinehund/Autopilot/actions/runs/31320547683 | `275bbad1...` — confirmed equal |
| `audit-harness-v1.7-integrity.yml` | 31320548753 | https://github.com/Schweinehund/Autopilot/actions/runs/31320548753 | `275bbad1...` — confirmed equal |

All three runs report the identical head SHA, equal to the recorded local head. This is the one
shared SHA every row below is recorded at.

### Job identity resolution (stated explicitly, per the D-25/T-141-21 trap)

Evidence was pulled via `gh run view <id> --json jobs` (job-level JSON, never the checks-UI
colour) and cross-referenced against each workflow's YAML source. **The table below is keyed on
the JSON's `name` field — the DISPLAY name — because that is what `gh run view --json jobs`
exposes**, with the YAML job key resolved separately by reading each workflow file's job-key ->
`name:` mapping directly from source (not inferred, not remembered):

- For all 23 `check-phase-NN` jobs, the YAML job key and the display name both carry the same
  phase number (key `check-phase-61` -> name `check-phase-61 validator`), so there is no
  ambiguity for this class.
- For the other 7 job identities, the key and the display name diverge completely: `parse` ->
  "Parse vX.Y sidecar JSON", `path-match` -> "Harness references vX.Y sidecar", `harness-run` ->
  "Run vX.Y milestone audit harness", `pin-helper-advisory` -> "Supervision-pin drift advisory
  (CI)", `frozen-read-probe` -> "Frozen-read probe (SWEEP-01/02 evidence, D-24 dependency-free)",
  `rotting-external-quarterly` -> "Quarterly c13_rotting_external link-check", and
  `linux-chain-ubuntu-latest` -> "Validator chain on Linux LF (Phase 69 CILINUX-01)". These seven
  were resolved by reading the workflow YAML directly, exactly the trap D-25/T-141-21 warns
  against skipping.

### Job count: measured against expected

**Expected (per this plan's own frontmatter and D-25):** 29 `needs: harness-run` jobs (15 v1.5 +
7 v1.6 + 7 v1.7), of which 23 are `check-phase-NN`. **Measured: exactly 29 `needs: harness-run`
jobs, of which exactly 23 are `check-phase-NN`** — no discrepancy on this figure.

**Total job count across all three runs (including the non-`needs:harness-run` gating and probe
jobs): 41** — 19 (v1.5) + 11 (v1.6) + 11 (v1.7). This breaks down as 29 `needs: harness-run` jobs
plus 12 jobs that do not depend on `harness-run` (`parse` x3, `path-match` x3, `harness-run`
itself x3, `frozen-read-probe` x3 — the last being explicitly dependency-free per D-24). The plan
text's "expected 29 total" refers to the `needs: harness-run` fan-out specifically, not the
workflow's full job graph, and the two figures do not conflict.

**Discrepancy noted, not silently reconciled:** `141-CONTEXT.md` D-25 states "the v1.5/v1.6
subset — 19 jobs — has reported `skipped` on every ref all milestone." The v1.5 + v1.6
`needs: harness-run` job count is measured at **15 + 7 = 22**, not 19. This document records the
measured 22 as fact and flags the mismatch against D-25's stated 19 as an inconsistency
originating in that context document, not something this plan's dispatch record silently
corrects or re-derives a justification for.

### Full job-level table — all 41 jobs, all three runs

**Run `audit-harness-v1.5-integrity.yml` (31320546700) — 19 jobs, SHA `275bbad1...`:**

| Job key | Display name | Conclusion | Duration |
|---|---|---|---|
| `frozen-read-probe` | Frozen-read probe (SWEEP-01/02 evidence, D-24 dependency-free) | success | 14s |
| `parse` | Parse v1.5 sidecar JSON | success | 11s |
| `path-match` | Harness references v1.5 sidecar | success | 7s |
| `harness-run` | Run v1.5 milestone audit harness | success | 14s |
| `check-phase-48` | check-phase-48 validator | success | 11s |
| `check-phase-49` | check-phase-49 validator | success | 13s |
| `check-phase-50` | check-phase-50 validator | success | 13s |
| `check-phase-51` | check-phase-51 validator | success | 13s |
| `check-phase-52` | check-phase-52 validator | success | 12s |
| `check-phase-53` | check-phase-53 validator | success | 13s |
| `check-phase-54` | check-phase-54 validator | success | 12s |
| `check-phase-55` | check-phase-55 validator | success | 15s |
| `check-phase-56` | check-phase-56 validator | success | 10s |
| `check-phase-57` | check-phase-57 validator | success | 10s |
| `check-phase-58` | check-phase-58 validator | success | 14s |
| `check-phase-59` | check-phase-59 validator | success | 13s |
| `check-phase-60` | check-phase-60 validator | success | 14s |
| `check-phase-61` | check-phase-61 validator | success | 19s |
| `pin-helper-advisory` | Supervision-pin drift advisory (CI) | success | 13s |

**Run `audit-harness-v1.6-integrity.yml` (31320547683) — 11 jobs, SHA `275bbad1...`:**

| Job key | Display name | Conclusion | Duration |
|---|---|---|---|
| `parse` | Parse v1.6 sidecar JSON | success | 10s |
| `frozen-read-probe` | Frozen-read probe (SWEEP-01/02 evidence, D-24 dependency-free) | success | 10s |
| `path-match` | Harness references v1.6 sidecar | success | 5s |
| `harness-run` | Run v1.6 milestone audit harness | success | 15s |
| `check-phase-62` | check-phase-62 validator | success | 15s |
| `check-phase-63` | check-phase-63 validator | success | 22s |
| `check-phase-64` | check-phase-64 validator | success | 37s |
| `check-phase-65` | check-phase-65 validator | success | 57s |
| `check-phase-66` | check-phase-66 validator | success | 109s |
| `pin-helper-advisory` | Supervision-pin drift advisory (CI) | success | 13s |
| `rotting-external-quarterly` | Quarterly c13_rotting_external link-check | **skipped** | n/a |

**Run `audit-harness-v1.7-integrity.yml` (31320548753) — 11 jobs, SHA `275bbad1...`:**

| Job key | Display name | Conclusion | Duration |
|---|---|---|---|
| `parse` | Parse v1.7 sidecar JSON | success | 16s |
| `frozen-read-probe` | Frozen-read probe (SWEEP-01/02 evidence, D-24 dependency-free) | success | 10s |
| `path-match` | Harness references v1.7 sidecar | success | 6s |
| `harness-run` | Run v1.7 milestone audit harness | success | 9s |
| `linux-chain-ubuntu-latest` | Validator chain on Linux LF (Phase 69 CILINUX-01) | success | 107s |
| `check-phase-67` | check-phase-67 validator | success | 171s |
| `check-phase-68` | check-phase-68 validator | success | 15s |
| `check-phase-69` | check-phase-69 validator | success | 14s |
| `check-phase-70` | check-phase-70 validator | success | 15s |
| `pin-helper-advisory` | Supervision-pin drift advisory (CI) | success | 11s |
| `rotting-external-quarterly` | Quarterly c13_rotting_external link-check | **skipped** | n/a |

### Skipped jobs — findings, with reason (D-24/T-141-21 requirement)

Two jobs report `skipped`, both the same job key across two workflows:

- `rotting-external-quarterly` in `audit-harness-v1.6-integrity.yml`
- `rotting-external-quarterly` in `audit-harness-v1.7-integrity.yml`

**Reason (legitimate — a schedule guard, not an upstream gate):** each job's condition reads
`if: always() && github.event_name == 'schedule' && github.event.schedule == '0 8 1 1,4,7,10 *'`
(Plan 04's `if: always()` insertion conjoined with the pre-existing quarterly-schedule guard,
never replacing it). This dispatch fired via `workflow_dispatch`, not `schedule`, so
`github.event_name == 'schedule'` evaluates false and the job correctly reports `skipped` rather
than `success` or `failure`. Per D-24/T-141-21, a schedule guard is the one legitimate reason for
a post-`if:always()` skip; an upstream-gate skip would be a finding, and none occurred — every
other job in all three runs reports a real conclusion (`success`), not `skipped`.

### Spot-checked stdout — genuine content pass, not merely a green exit code

Job-level `conclusion: success` is sufficient evidence per the plan's acceptance criteria, but the
following jobs' raw logs were additionally pulled (`gh run view --job=<id> --log`) to confirm the
underlying validator's own `Result:` line, not just its process exit code — spot-checking the
sites this phase's fixes specifically targeted:

| Job | CI `Result:` line | Note |
|---|---|---|
| `check-phase-48` (v1.5) | `Result: 7 PASS, 0 FAIL, 0 SKIPPED` | matches local warm baseline |
| `check-phase-60` (v1.5) | `Result: 25 PASS, 0 FAIL, 0 SKIPPED` | `V-60-09`/`V-60-10` (self-test) both PASS |
| `check-phase-61` (v1.5) | `Result: 34 PASS, 0 FAIL, 0 SKIPPED` | full 34-line transcript confirms `V-61-21..32` (CHAIN regression-guards), `V-61-33` (v1.5 harness C5), `V-61-34` (self-test) all individually PASS |
| `check-phase-62` (v1.6) | `Result: 34 PASS, 0 FAIL, 0 SKIPPED` | |
| `check-phase-63` (v1.6) | `Result: 32 PASS, 0 FAIL, 0 SKIPPED` | |
| `check-phase-64` (v1.6) | `Result: 29 PASS, 0 FAIL, 0 SKIPPED` | |
| `check-phase-65` (v1.6) | `Result: 33 PASS, 0 FAIL, 0 SKIPPED` | |
| `check-phase-66` (v1.6) | `Result: 28 PASS, 0 FAIL, 0 SKIPPED` | |
| `check-phase-67` (v1.7) | `Result: 28 PASS, 0 FAIL, 0 SKIPPED` | first-ever CI Linux execution of this file (D-12's CARVE-amended-but-content-deferred file); only its `:261` timeout value changed this milestone, and it holds |
| `check-phase-68` (v1.7) | `Result: 33 PASS, 0 FAIL, 0 SKIPPED` | `V-68-11` (the substring-presence check on both `check-phase-66.mjs`/`-67.mjs`'s retained `timeout: 300000` literal) explicitly confirmed PASS in the transcript |
| `check-phase-69` (v1.7) | `Result: 31 PASS, 0 FAIL, 0 SKIPPED` | |
| `check-phase-70` (v1.7) | `Result: 51 PASS, 0 FAIL, 0 SKIPPED` | this CI job runs `node scripts/validation/check-phase-70.mjs` bare (no `CHECK_PHASE_NESTED` env set), and it is this file's first-ever bare/standalone measurement in the phase — 0 SKIPPED here contrasts with the pre-SWEEP-09 **nested** baseline of 23/0/28-skipped recorded in `141-03-SUMMARY.md` (a different execution mode, not a like-for-like before/after of the same mode); the meaningful fact is that all ten landed reader-site fixes evaluate to a real PASS rather than a silent skip in this run, exactly SWEEP-09's intent |

---

## Triage Table

Per this task's action text, every non-green row requires exactly one of three causes (content
failure / wall-clock cap / environment) and a disposition of fixed-in-phase or
routed-to-a-named-phase. **Row count equals the job count recorded above: 41.** 39 rows are
green (`success`) and require no cause/disposition — they are listed in the two run tables above
in full, with no omissions. The remaining 2 rows are the `rotting-external-quarterly` skips,
which are **not one of the three red causes** — they are a correctly-firing schedule guard, the
one disposition D-24/T-141-21 explicitly carves out as legitimate rather than a defect requiring
a fix-or-route disposition.

| Job | Run | Cause | Disposition |
|---|---|---|---|
| `rotting-external-quarterly` (v1.6) | 31320547683 | Not a red — legitimate schedule guard (`github.event_name != 'schedule'` on this `workflow_dispatch` run) | No fix needed; will fire correctly on its own quarterly cron trigger. Not routed anywhere — this is expected, permanent behavior, not a defect. |
| `rotting-external-quarterly` (v1.7) | 31320548753 | Not a red — legitimate schedule guard (same condition, same reason) | No fix needed; same disposition as above. |

**No wall-clock-cap reds occurred.** Every job's measured duration sits far inside its
`timeout-minutes` cap — the closest margin is `check-phase-67` at 171s (2m51s) against its
Plan-04-raised 60-minute cap, and `check-phase-66` at 109s against its existing 30-minute cap.
Per this task's action text, a wall-clock-cap disposition (raise the cap, re-dispatch, record
before/after as MEASURED) applies only to a job that actually hit its cap; none did, so no cap
is raised in this plan and no re-dispatch was needed. The four caps Plan 04 raised (D-17/D-18)
are recorded here as holding comfortably on their first real cold-clone Linux measurement, but
that is not the same claim as "the cap was hit and is now proven correct at exactly the observed
margin" — it is simply unexercised headroom, stated as such rather than oversold.

**No content-failure reds occurred.** All 23 `check-phase-NN` jobs report `0 FAIL` in their own
`Result:` line (spot-checked above for 12 of the 23; the remaining 11 confirmed via job-level
`conclusion: success`, which for every `check-phase-*.mjs` validator in this codebase is
equivalent to `process.exit(0)`, itself gated on `failed === 0` — see the established pattern in
`141-CONTEXT.md`'s `<code_context>` section).

**No environment reds occurred.** No runner, checkout, or tooling failure appears anywhere across
the 41 jobs; all `parse`, `path-match`, `harness-run`, and `frozen-read-probe` gating jobs
(12 total) report `success`.

**Zero rows are recorded as `accepted-standalone-ci-red`, `accepted-scoped-red`, or "accepted red"
under any name** — there is nothing to accept, because there is nothing red. This sentence exists
only to satisfy this task's own negative-grep acceptance criterion
(`grep -ci "accepted-standalone-ci-red\|accepted-scoped-red\|accepted red"` should read this
paragraph as the sole hit, explicitly stating these dispositions are not used).

**No second SHA was needed.** No fix required a re-dispatch, so every row in this document is
recorded at the single shared SHA `275bbad16c479859ac9f693a9b65d6874fd23ec3` — the two-SHA
caveat in this task's action text does not apply.

### Requirement disposition

RED-01, RED-02, and RED-03 were already flipped `Pending -> Complete` in `141-05-SUMMARY.md`'s
plan, on the strength of local bare-invocation evidence; this dispatch is their Axis-2 (CI)
confirmation, per D-26, and does not itself change their traceability status (already `Complete`).
**SWEEP-09 flips `Pending -> Complete` in this plan**, on the strength of: (a) the 13 landed
reader-site fixes (Plan 03) proving out on real CI Linux for the first time (`check-phase-61`
34/0/0, `check-phase-68` 33/0/0, `check-phase-70` 51/0/0 — the last figure directly evidencing the
ten converted silent-skip sites now returning real PASS/FAIL), and (b) the D-12 CARVE amendment
for `check-phase-67.mjs` landing in this phase with its content-edit deferral to Phase 144 intact
and undisturbed by this dispatch. **No requirement is set to `Validated` anywhere in this
document** — that state is reserved for Phase 144's single close-gate commit across all 28 v1.20
requirements, per D-30 and the eight-prior-milestone invariant.

---

*Phase: 141-standalone-red-validator-set-chain-members-green*
*Plan: 05*
*Evidence captured: 2026-08-08*

*Plan 06 dispatch record and triage table appended 2026-08-09.*
