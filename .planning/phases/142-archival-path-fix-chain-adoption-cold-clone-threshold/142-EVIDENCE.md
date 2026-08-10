# Phase 142 Plan 06: Cold-Clone Threshold Evidence (NEST-01)

Measured at HEAD `1c2c5bbc65b2c98ba25dc8f379bf23b418810daf` on a quiesced Windows machine, one
validator process running at a time throughout (no concurrent Node validator/harness process, per
this plan's precondition and the anti-contamination rule). Every figure below was executed in this
session — none is inherited from a prior plan's assertion, per D-36's declared-tree-identity
discipline (the fifth consecutive recurrence this milestone warns against repeating).

---

## Declarations block (mandatory before any figure below is read)

| Variable | Value |
|---|---|
| Node version | v24.17.0 |
| Operating system | Windows 10 Pro, 64-bit (build 10.0.19045) |
| Runner | Local Windows dev machine. **No Windows CI runner exists in this repository** — all 198/198 workflow jobs run `runs-on: ubuntu-latest` (D-28/D-32); this measurement has no CI counterpart to compare against directly, only the CI-cold-clone-that-already-gates named below |
| Defender real-time protection | **Enabled** (`Get-MpComputerStatus \| Select-Object RealTimeProtectionEnabled` → `True`) for every run recorded in this document |
| Machine-load / quiescence attestation | Validator-process count asserted **0** immediately before and after each timed batch (warm-median batch, cold-clone batch, per-child sweep), via `Get-CimInstance Win32_Process -Filter "Name='node.exe'" \| Where-Object { $_.CommandLine -like '*check-phase*' -or $_.CommandLine -like '*milestone-audit*' }`. This is a validator-scoped filter, not a bare `node.exe` count — this machine runs several permanent non-validator Node processes throughout the session (MCP servers for Playwright / Model Context Protocol tooling), which the filter deliberately excludes, matching the precedent established in `141-EVIDENCE.md`'s process-count assertion |
| Clone depth | **FULL** — `git clone --no-hardlinks`, no `--depth` flag. Full depth is the only admissible subject: a depth-1 clone fatals `readAtClose()`/`resolveArchivedPhasePath` (SWEEP-01), so it is not a measurable subject at all |
| Cache state | Declared per row in the figures tables below (cold = first invocation in a given tree; warm = subsequent invocation in the same tree, same session) |
| Tree identity | Declared per row in the figures tables below (main worktree vs. scratch `--no-hardlinks` clone, outside the repository) |
| Verbose (`--verbose` flag) | Declared per row in the figures tables below |

---

## Clone identity attestation (before any cold-clone figure is admissible)

```
Source tree (D:/claude/Autopilot):
  git rev-parse HEAD              -> 1c2c5bbc65b2c98ba25dc8f379bf23b418810daf
  git rev-list --count HEAD       -> 3118

git clone --no-hardlinks D:/claude/Autopilot <scratch-temp-dir>
  clone wall-clock: 42771 ms (not part of the apex measurement -- the clone-creation cost itself,
  recorded for completeness, not folded into any apex figure)

Clone tree (<scratch-temp-dir>):
  .git/shallow                    -> ABSENT (confirms full depth, no shallow marker)
  git rev-parse HEAD              -> 1c2c5bbc65b2c98ba25dc8f379bf23b418810daf  (EQUAL to source)
  git rev-list --count HEAD       -> 3118                                     (EQUAL to source)
  node --version (inside clone)   -> v24.17.0                                 (EQUAL to source)
```

Clone HEAD equals source HEAD; clone commit count equals source commit count; no shallow marker
present. The clone is a genuine full-depth copy, the only admissible subject per D-27.

Scratch clone location: a session-scoped scratch directory outside `D:/claude/Autopilot` (never
inside the repository tree). Removed at the end of measurement — see "Cleanup confirmation" below.

---

## Figures — Row class 1: warm median (main worktree)

Quiescence re-confirmed (validator-process count = 0) immediately before run 1 and immediately
after run 3. All three runs executed serially, one process at a time, no other run overlapping.

| Run | Tree identity | Cache state | Verbose | Wall clock (ms) | Result |
|---|---|---|---|---|---|
| 1 | main worktree | warm | no | 17044 | 95 PASS, 0 FAIL, 0 SKIPPED (total checks: 95) |
| 2 | main worktree | warm | no | 16915 | 95 PASS, 0 FAIL, 0 SKIPPED (total checks: 95) |
| 3 | main worktree | warm | no | 17722 | 95 PASS, 0 FAIL, 0 SKIPPED (total checks: 95) |

**n = 3 (odd).** Sorted: 16915 / 17044 / 17722. **Median = 17044 ms** — the middle sorted value of
an odd-n sample, a single observed value with no averaging or tie-break required. All three runs
report the adopted **95-check tally** (up from the pre-adoption 93), confirming the apex is
measuring the chain as adopted in Plan 05 (`CHAIN_EXTRA = [30, 31]`), not a stale pre-adoption
build.

This median is **not an amendment** of the ratified `~17 s` figure from D-15/RED-06 — it is
consistent with it (17044 ms ≈ 17.0 s), reproducing the same figure a fifth time on a 95-check apex
instead of the pre-adoption 93-check one. The `~17 s` / `+0.35 s` figures are unchanged anywhere in
this document, per the plan's explicit prohibition.

---

## Figures — Row class 2: cold-clone (scratch `--no-hardlinks` clone, full depth)

Quiescence re-confirmed (validator-process count = 0) immediately before the first clone run.

| Run | Tree identity | Cache state | Verbose | Wall clock (ms) | Result |
|---|---|---|---|---|---|
| 1 | scratch clone (full depth) | cold (1st invocation in this clone) | **yes** | 23092 | 95 PASS, 0 FAIL, 0 SKIPPED (total checks: 95) |
| 2 | scratch clone (full depth) | warm-in-clone | no | 22720 | 95 PASS, 0 FAIL, 0 SKIPPED (total checks: 95) |
| 3 | scratch clone (full depth) | warm-in-clone | no | 22983 | 95 PASS, 0 FAIL, 0 SKIPPED (total checks: 95) |
| 4 | scratch clone (full depth) | warm-in-clone | no | 22647 | 95 PASS, 0 FAIL, 0 SKIPPED (total checks: 95) |

All four runs report the adopted 95-check tally — a clone reporting 93 would be stale and would
void the measurement; none did.

**The n = 3 (odd) sample used for the ratio's numerator is runs 2/3/4** (non-verbose), to hold the
`--verbose` variable constant against the warm denominator's own non-verbose runs. Sorted:
22647 / 22720 / 22983. **Median = 22720 ms.**

Run 1 (`--verbose`, the genuinely first/cache-cold invocation in this clone) is recorded as a
confirmatory data point, not folded into the median: 23092 ms, within **1.6%** of the non-verbose
median. This closely tracks D-26's own finding in this milestone (the *second* clone run in that
session was slower than the first) — cache-coldness inside the clone is not the dominant cost term;
new-tree scanning (filesystem walk, Defender real-time scan of a freshly-materialized working tree)
is, and it does not meaningfully decay across a handful of same-clone invocations.

---

## Ratio and threshold verdict (D-28)

```
ratio = cold_clone_median_ms / warm_median_ms
      = 22720 / 17044
      = 1.3330
```

- **Numerator:** 22720 ms — cold-clone median, n=3 (odd), non-verbose, tree identity = scratch
  `--no-hardlinks` full-depth clone outside the repository.
- **Denominator:** 17044 ms — warm median, n=3 (odd), non-verbose, tree identity = main worktree,
  same session, quiescence attested (validator-process count = 0 before and after).
- **Tie-break rule:** n is odd for both samples, so each median is a single observed value; no
  averaging or interpolation tie-break is needed.
- **Threshold:** ratio ≥ 8× is FAIL. No absolute-millisecond ceiling is set (explicitly dropped —
  it would bind a Windows measurement to a Linux job cap on a runner class that does not exist; all
  198/198 workflow jobs run `ubuntu-latest`, and the caps are 15 job-timeouts of ×66, one of ×31,
  one of ×1 — not one object).

### Verdict: **PASS** — 1.333× is well under the 8× threshold.

This is consistent with — not a re-derivation contradicting — the prior recorded data point: a
`git clone --no-hardlinks` measured 11 787 ms with the apex inside it at 24 523/25 686 ms against a
same-session warm median of 16 438–18 695 ms (ratio ≈1.4–1.6×), per D-26. This session's own fresh,
independently-declared measurement (1.333×) lands in the same low range on a different, larger
(95-check, post-adoption) apex.

**The manufactured contradiction is not repeated here.** The previously-recorded cold Axis-1 figure
(19 s, `--verbose`) was never inconsistent with cache-coldness — that session's own warm apex ran at
14 s (`138-04-SUMMARY.md:113,287-289`), giving 19/14 = 1.36×, exactly consistent with a cold clone.
This document does not restate the withdrawn "cannot be cache-cold" claim.

---

## Row class 3: cold first-run-of-session (a separate row — never re-collapsed with row class 2)

**Not re-measured in this plan.** Already recorded, per D-16, and not re-derived:

> First-invocation-of-session apex figures, main worktree: **33 278 / 50 419 / 63 176 ms**, across
> three independent agents' sessions. High variance; the figure is legitimately reported as a
> **range**, never as a single value.

This session's own run 1 (17 044 ms, main worktree, above) is **not** an instance of this row class
— it is reported in the warm-median row class instead. Reason, stated plainly rather than silently
conflated: this machine's OS/filesystem caches for this repository were not in a genuinely
first-invocation-of-session state when this plan's own run 1 was captured (the same interactive
session had already exercised `git`/`node` tooling against this repository earlier in the session,
before the first `check-phase-138.mjs` invocation recorded in this document). Recording this fact
honestly is the point of declaring tree identity and cache state per D-36 — it is not evidence
against the D-16 range, which remains the authoritative cold-first-run figure and is not amended,
widened, or narrowed here.

---

## Per-child marginal-cost table (D-29 mechanism-X tier (i) — 92 members)

**Preamble — a child's NESTED cost is not its standalone cost.** Every figure below was captured by
spawning each of the 92 adopted chain members (`CHAIN_PHASES` [48..137] + `CHAIN_EXTRA` [30, 31])
exactly as `check-phase-138.mjs` spawns them: `node scripts/validation/check-phase-<N>.mjs` with
`CHECK_PHASE_NESTED=1` set in the child's environment, one process at a time, serially, on the
quiesced main worktree (warm cache, Defender enabled, Node v24.17.0). Under nesting, each child's
own `CHAIN-*` regression-guards short-circuit (`{pass:true, skipped:true}`) before invoking any
grandchild process — so the deep members' large **standalone** figures (e.g. member 66's
386 235 ms, recorded below) never appear in this table. This table measures each child's own direct
work only, which is why the total (15 597 ms across 92 members) is close to one apex run's own
measured wall-clock (~17 s) rather than to the exponential standalone-chain sum.

Quiescence re-confirmed (validator-process count = 0) immediately before the sweep began.

| Member | Nested wall-clock (ms) | Exit code | × mean | Over 3× mean |
|---|---|---|---|---|
| check-phase-48 | 108 | 0 | 0.64x | no |
| check-phase-49 | 348 | 0 | 2.05x | no |
| check-phase-50 | 215 | 0 | 1.27x | no |
| check-phase-51 | 408 | 0 | 2.41x | no |
| check-phase-52 | 170 | 0 | 1.00x | no |
| check-phase-53 | 140 | 0 | 0.83x | no |
| check-phase-54 | 979 | 0 | 5.77x | YES |
| check-phase-55 | 931 | 0 | 5.49x | YES |
| check-phase-56 | 888 | 0 | 5.24x | YES |
| check-phase-57 | 174 | 0 | 1.03x | no |
| check-phase-58 | 393 | 0 | 2.32x | no |
| check-phase-59 | 427 | 0 | 2.52x | no |
| check-phase-60 | 97 | 0 | 0.57x | no |
| check-phase-61 | 599 | 0 | 3.53x | YES |
| check-phase-62 | 157 | 0 | 0.93x | no |
| check-phase-63 | 203 | 0 | 1.20x | no |
| check-phase-64 | 145 | 0 | 0.86x | no |
| check-phase-65 | 148 | 0 | 0.87x | no |
| check-phase-66 | 117 | 0 | 0.69x | no |
| check-phase-67 | 744 | 0 | 4.39x | YES |
| check-phase-68 | 194 | 0 | 1.14x | no |
| check-phase-69 | 212 | 0 | 1.25x | no |
| check-phase-70 | 621 | 0 | 3.66x | YES |
| check-phase-71 | 106 | 0 | 0.63x | no |
| check-phase-72 | 103 | 0 | 0.61x | no |
| check-phase-73 | 104 | 0 | 0.61x | no |
| check-phase-74 | 102 | 0 | 0.60x | no |
| check-phase-75 | 87 | 0 | 0.51x | no |
| check-phase-76 | 89 | 0 | 0.52x | no |
| check-phase-77 | 78 | 0 | 0.46x | no |
| check-phase-78 | 92 | 0 | 0.54x | no |
| check-phase-79 | 85 | 0 | 0.50x | no |
| check-phase-80 | 94 | 0 | 0.55x | no |
| check-phase-81 | 98 | 0 | 0.58x | no |
| check-phase-82 | 90 | 0 | 0.53x | no |
| check-phase-83 | 89 | 0 | 0.52x | no |
| check-phase-84 | 88 | 0 | 0.52x | no |
| check-phase-85 | 85 | 0 | 0.50x | no |
| check-phase-86 | 89 | 0 | 0.52x | no |
| check-phase-87 | 90 | 0 | 0.53x | no |
| check-phase-88 | 107 | 0 | 0.63x | no |
| check-phase-89 | 88 | 0 | 0.52x | no |
| check-phase-90 | 87 | 0 | 0.51x | no |
| check-phase-91 | 89 | 0 | 0.52x | no |
| check-phase-92 | 157 | 0 | 0.93x | no |
| check-phase-93 | 126 | 0 | 0.74x | no |
| check-phase-94 | 108 | 0 | 0.64x | no |
| check-phase-95 | 95 | 0 | 0.56x | no |
| check-phase-96 | 107 | 0 | 0.63x | no |
| check-phase-97 | 106 | 0 | 0.63x | no |
| check-phase-98 | 103 | 0 | 0.61x | no |
| check-phase-99 | 193 | 0 | 1.14x | no |
| check-phase-100 | 91 | 0 | 0.54x | no |
| check-phase-101 | 136 | 0 | 0.80x | no |
| check-phase-102 | 92 | 0 | 0.54x | no |
| check-phase-103 | 87 | 0 | 0.51x | no |
| check-phase-104 | 94 | 0 | 0.55x | no |
| check-phase-105 | 90 | 0 | 0.53x | no |
| check-phase-106 | 93 | 0 | 0.55x | no |
| check-phase-107 | 95 | 0 | 0.56x | no |
| check-phase-108 | 103 | 0 | 0.61x | no |
| check-phase-109 | 131 | 0 | 0.77x | no |
| check-phase-110 | 97 | 0 | 0.57x | no |
| check-phase-111 | 88 | 0 | 0.52x | no |
| check-phase-112 | 98 | 0 | 0.58x | no |
| check-phase-113 | 101 | 0 | 0.60x | no |
| check-phase-114 | 98 | 0 | 0.58x | no |
| check-phase-115 | 102 | 0 | 0.60x | no |
| check-phase-116 | 94 | 0 | 0.55x | no |
| check-phase-117 | 99 | 0 | 0.58x | no |
| check-phase-118 | 245 | 0 | 1.45x | no |
| check-phase-119 | 99 | 0 | 0.58x | no |
| check-phase-120 | 91 | 0 | 0.54x | no |
| check-phase-121 | 139 | 0 | 0.82x | no |
| check-phase-122 | 104 | 0 | 0.61x | no |
| check-phase-123 | 83 | 0 | 0.49x | no |
| check-phase-124 | 132 | 0 | 0.78x | no |
| check-phase-125 | 95 | 0 | 0.56x | no |
| check-phase-126 | 96 | 0 | 0.57x | no |
| check-phase-127 | 97 | 0 | 0.57x | no |
| check-phase-128 | 86 | 0 | 0.51x | no |
| check-phase-129 | 94 | 0 | 0.55x | no |
| check-phase-130 | 89 | 0 | 0.52x | no |
| check-phase-131 | 98 | 0 | 0.58x | no |
| check-phase-132 | 87 | 0 | 0.51x | no |
| check-phase-133 | 105 | 0 | 0.62x | no |
| check-phase-134 | 99 | 0 | 0.58x | no |
| check-phase-135 | 102 | 0 | 0.60x | no |
| check-phase-136 | 115 | 0 | 0.68x | no |
| check-phase-137 | 97 | 0 | 0.57x | no |
| check-phase-30 | 152 | 0 | 0.90x | no |
| check-phase-31 | 150 | 0 | 0.88x | no |

**Total: 15 597 ms across 92 members. Mean share: 169.53 ms. Multiple used: 3×mean = 508.60 ms.**

**Named over-share children (≥ 3× mean nested cost, the stated multiple):** `check-phase-54`
(979 ms, 5.77×), `check-phase-55` (931 ms, 5.49×), `check-phase-56` (888 ms, 5.24×), `check-phase-61`
(599 ms, 3.53×), `check-phase-67` (744 ms, 4.39×), `check-phase-70` (621 ms, 3.66×). All six exit 0
(no content failure) — the excess is nested-invocation wall-clock only (their own guard-loop
iteration and subprocess-spawn overhead prior to short-circuiting, not a re-executed chain).

**Disposition: `ADVISORY-RECORDED`.** No code change is made in this plan on the strength of this
table — publishing it, and naming the six over-share children, is the entirety of mechanism X's
tier (i) obligation.

### Cross-referenced standalone figures (not re-derived — D-31)

- **`check-phase-64` — NOT re-measured here.** Already recorded at **91 710 ms = 30.6% of the
  300 000 ms per-subprocess cap** (`142-CONTEXT.md` D-31, citing `141-EVIDENCE.md:288`'s
  re-confirmed series). Not a crossing candidate. Its row in the table above (145 ms) is its
  **nested** short-circuited cost, a different quantity from its standalone cost — re-stated per
  this table's own preamble, not a contradiction of D-31's prohibition on re-measuring the
  standalone figure.
- **`check-phase-66` — the real crossing member, recorded for free.** Already measured at
  **386 235 ms standalone** (`141-EVIDENCE.md` form (a) table, row 8), already **over** the
  300 000 ms per-subprocess cap as a **non-peer** child (phase number 66 < the 67 peer threshold,
  so its parent's `subTimeout` is 300 000 ms, not the 600 000 ms peer budget) of `check-phase-67`.
  Owned by no requirement in this milestone; routed as a deferral per `142-CONTEXT.md`'s
  `<deferred>` section ("the unowned non-nested standalone-chain cost").

---

## Mechanism X — two-tier disposition (D-29)

**Tier (i) — in-phase and executable.** The per-child marginal-cost table above, its six named
over-share children, and the `ADVISORY-RECORDED` disposition. This is the complete, executed
response this phase produces.

**Tier (ii) — structural, named with its owner.** The frozen-aware full-depth checkout
(`actions/checkout@v4` with `fetch-depth: 0` on the `harness-run` job of every
`audit-harness-*-integrity.yml` workflow) is already a landed deliverable of
**CARVE-1/SWEEP-01 (Phases 139–141)**. It is cited here as the structural mitigation for the cold
cost this measurement quantifies — it is **explicitly NOT double-booked into Phase 142**; this
plan claims no credit for authoring it and makes no change to any workflow file
(`git status --porcelain .github/` is empty throughout this plan).

**Explicitly withdrawn as mechanism X: raising the per-subprocess timeout.** `check-phase-138.mjs`
(lines 68–73) documents these budgets as:

> "Timeout budgets (D-14): copied forward unchanged from check-phase-134.mjs -- 600s per-peer
> (phaseNum >= 67) / 300s per-subprocess, and the AUDIT-HARNESS 300s timeout. These are the sole
> coupling point with WINDOWS-CLONE-DEEPNEST-TIMEOUT-01..."

A timeout raise moves **zero wall-clock cost** and cannot satisfy a *cost*-ratio threshold by
construction — the three inherited remediation options in `v1.19-DEFERRED-CLEANUP.md` were
authored for `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` as a *stall* item; NEST-01 reframed it as *cost*,
and a timeout raise does not address cost. **Never `CHAIN_SKIP`** — `check-phase-138.mjs`'s
`V-138-SELF` hard-asserts `CHAIN_SKIP.size === 0` and this plan makes no edit to that invariant.

---

## Disposition statement — Advisory, and this does not breach the milestone bar (D-30)

`REQUIREMENTS.md:6` / `ROADMAP.md:212` name **exactly two** dispositions the v1.20 milestone bar
requires deleted: `ACCEPTED-STANDALONE-CI-RED` and `ACCEPTED-SCOPED-RED`.
**`WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` (this item's disposition) is not one of them.** Its authority
is `D-10` (`138-04-PLAN.md:155`), an explicit prior ruling — not the `T-138-23` threat-register row,
which this document does not cite as the governing source.

**No Windows CI runner exists in this repository.** All 198/198 workflow jobs run
`runs-on: ubuntu-latest`; there is no Windows runner class for a future planner to wire a Windows
gate into, and this document records that fact plainly so nobody attempts it on the strength of
this measurement.

---

## The CI cold clone that already gates (D-32)

Every CI job in this repository checks out at `fetch-depth: 0` on `actions/checkout@v4`, onto a
fresh GitHub Actions runner for every run — a genuine cold clone, on the enforcing runner class
(`ubuntu-latest`) this project makes authoritative, **already operative today**, independent of
this plan's local Windows measurement (which has no CI counterpart runner to compare against).
Phase 141 Plan 06's dispatch record (`141-EVIDENCE.md`, "Dispatch Record: the first-ever CI
fan-out") already produced **41 green jobs** across three workflow runs at a single shared SHA,
with per-job wall-clocks retrievable from `gh run view --json jobs` (`startedAt`/`completedAt`) —
the precedent this document points to rather than re-derives.

---

## Threshold and response rule (a future reader can apply this without re-reading this plan)

1. Compute `ratio = cold_clone_median_ms / warm_median_ms`, where both medians are drawn from an
   odd-n (≥3) same-tree, same-session, quiescence-attested sample, with tree identity, cache state,
   and `--verbose` state declared for every run.
2. If `ratio < 8`, the apex's cold-clone cost is within bound — no action required.
3. If `ratio ≥ 8`, mechanism X tier (i) applies: re-run the per-child marginal-cost sweep, name any
   new over-share children (≥ some stated multiple of the mean), and record the disposition as
   `ADVISORY-RECORDED`. Tier (ii) — the frozen-aware full-depth `harness-run` checkout — is already
   landed structurally and is not itself a lever this rule can pull further; it is cited, not
   re-invoked.
4. **Never** raise the per-subprocess timeout as a response — it moves zero wall-clock cost and
   cannot satisfy a cost threshold by construction (see mechanism-X section above).
5. **Never** add an entry to `CHAIN_SKIP` — `V-138-SELF` hard-asserts it stays empty; this is a
   correctness invariant, not a lever.
6. This measurement's own verdict (§"Ratio and threshold verdict"): **1.333× — PASS.**

---

## Cleanup confirmation

```
$ rm -rf <scratch-temp-dir>/142-06-cold-clone
$ [ -d <scratch-temp-dir>/142-06-cold-clone ] && echo "STILL EXISTS" || echo "REMOVED"
REMOVED
```

The scratch clone is removed. Zero orphan temp directories remain from this measurement — the
per-child sweep's helper script, log, and JSON output live only in the session scratchpad outside
both the repository and the (now-removed) measured clone; none were committed and none are tracked
by this repository's git index.

---

## NEST-01 edge-probe resolution (backstop truths)

**The NEST-01 edge-probe row is `unclassified` in the deterministic probe.** It resolves here to
the ratio-versus-threshold comparison above (§"Ratio and threshold verdict"): **1.333× vs. an 8×
fail threshold, PASS** — the only falsifiable criterion the requirement text admits. A future
close-gate audit should read that comparison, not a bare pass/fail label, as NEST-01's evidence.

**Three of the eight applicable spec-less edge-probe rows carry no requirement anchor in the probe
output and could not be resolved anywhere in this phase.** They remain unresolved and are surfaced
here rather than dismissed: they are not NEST-01's obligation to close, and no other phase in this
milestone's scope claims them either. A future milestone's requirements-gathering step should
treat their continued absence of an anchor as an open item, not as silently discharged.

---

*Phase: 142-archival-path-fix-chain-adoption-cold-clone-threshold*
*Plan: 06*
*Evidence captured: 2026-08-10*
