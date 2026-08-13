# Phase 144 — Measurement Ledger

Opened by Plan 01, Task 2. Later plans in this phase append rows/sections rather than replacing
this file.

## Plan 01 — Category 11 amendment: authorization proof

**Method:** the six new validators, sidecar, and three pipeline paths do not exist on disk yet
(this is a pattern-level proof, not a gate run against real files — creating any of them here
would violate the D-09 amendment-before-edit rule). Extracted the `carve-allowlist` fenced block
from the amended `.planning/milestones/v1.20-CARVE.md`, stripped `#` comment and blank lines, and
tested each of the ten candidate paths for exact string equality against the stripped line set —
the same matching semantics `carve-gate.mjs`'s `globToRegExp` produces for a wildcard-free glob
(`^literal$`, i.e. plain equality).

| # | Candidate path | Matching allowlist entry | Result |
|---|-----------------|---------------------------|--------|
| 1 | `scripts/validation/check-phase-139.mjs` | `scripts/validation/check-phase-139.mjs` | MATCH |
| 2 | `scripts/validation/check-phase-140.mjs` | `scripts/validation/check-phase-140.mjs` | MATCH |
| 3 | `scripts/validation/check-phase-141.mjs` | `scripts/validation/check-phase-141.mjs` | MATCH |
| 4 | `scripts/validation/check-phase-142.mjs` | `scripts/validation/check-phase-142.mjs` | MATCH |
| 5 | `scripts/validation/check-phase-143.mjs` | `scripts/validation/check-phase-143.mjs` | MATCH |
| 6 | `scripts/validation/check-phase-144.mjs` | `scripts/validation/check-phase-144.mjs` | MATCH |
| 7 | `scripts/validation/v1.20-audit-allowlist.json` | `scripts/validation/v1.20-audit-allowlist.json` | MATCH |
| 8 | `scripts/pipeline/build-publish-bundle.mjs` | `scripts/pipeline/build-publish-bundle.mjs` | MATCH |
| 9 | `scripts/pipeline/build-filename-map.mjs` | `scripts/pipeline/build-filename-map.mjs` | MATCH |
| 10 | `scripts/pipeline/filename-map.md` | `scripts/pipeline/filename-map.md` | MATCH |

**Result: 10/10 matched.** Each entry is a bare literal (zero `*`, `?`, `[` characters), so the
match is plain string equality, not glob expansion.

## `carve-gate.mjs` triple at HEAD (post-amendment)

```
carve-gate: base=a7bda73e23efc5e3f9607c3fef37abf8ec4030aa in-scope=106 on-list=106 off-list=0
carve-gate PASS: 106 in-scope path(s), all on-list
```

- in-scope = 106
- on-list = 106
- off-list = 0
- exit code = 0

## Single-file-commit proof (Task 1)

Commit `febd06d4` (`docs(144-01): pre-authorize the closing cluster's new tooling surface`):

- `git show --name-only --format= HEAD | wc -l` → `1` (only `.planning/milestones/v1.20-CARVE.md`)
- `git diff HEAD~1 --numstat -- .planning/milestones/v1.20-CARVE.md` → `21  0  .planning/milestones/v1.20-CARVE.md` (0 deletions, append-only)
- `git show --name-only HEAD | grep -c "v1.20-CARVE.md"` → `1` (the path string appears exactly once — the file-list line — never in the message prose, per D-33)
- `git status --porcelain --untracked-files=all -- scripts .github` → empty (no `scripts/` or `.github/` path created or modified)

## Conclusion

All ten candidate paths are proven on-list by exact match against the amended allowlist. The
amendment commit is single-file, append-only, and does not quote the CARVE path in its message
prose. `carve-gate.mjs` reports `off-list=0`, exit `0`. Every `scripts/` path Phase 144's later
plans create or edit is pre-authorized.

## Plan 02, Task 3 — SWEEP-06: the seventeenth harness against the 60-second budget

**Method:** identical to Phase 140's sixteen-harness measurement (`140-05-SUMMARY.md`) — the
newly-converted `v1.19-milestone-audit.mjs` run as its own `node` subprocess, wall-clock timed
from spawn to exit, three consecutive runs, warm cache, this session's Windows dev box. A
measurement, not a "fast enough" judgement — scored against `check-phase-60.mjs`'s `timeout: 60000`
per-subprocess budget and against Phase 140's recorded slowest-of-sixteen figure (4,177 ms, v1.15).

| Run | Elapsed (ms) | Exit code |
|-----|--------------|-----------|
| 1   | 1302         | 0         |
| 2   | 1260         | 0         |
| 3   | 1256         | 0         |

**Median: 1,260 ms.**

- Against the 60,000 ms budget: **1,260 ms is 4.75× faster than Phase 140's already-comfortable
  4,177 ms slowest-of-sixteen figure**, and leaves **58,740 ms (97.9%) of headroom** under the
  budget — well inside the same 1/13th-of-budget class Phase 140's sixteen harnesses occupied.
- Against Phase 140's slowest-of-sixteen (4,177 ms): the seventeenth harness runs **faster**, not
  merely within budget — consistent with the corpus-scope delta the frozen conversion imposes (a
  single `git cat-file --batch` fetch replaces per-file `readFileSync` walks).
- `node scripts/validation/check-phase-60.mjs` → **25 PASS, 0 FAIL, 0 SKIPPED**, exit 0
  (byte-unchanged; `timeout: 60000` still appears exactly twice; the budget was met by
  measurement, never by relaxing the constant).

**Caveat carried forward unchanged from Phase 140:** warm-cache, single-machine measurement, no
cold-start or CI-runner figure taken — same `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01`/NEST-01 hazard
class, not closed here.

SWEEP-06's measurement precondition (D-25) is now satisfied for all seventeen harnesses; the
requirement flips at Phase 144's close-gate commit alongside SWEEP-05, per the same
premature-Validated-drift discipline Phase 140 Plan 05 already established.

## Plan 03, Task 3 — negative proof and chain regression gate

**Method:** a fail-loud assertion never observed failing is only an assertion, not a proof. A
standalone script (`check-phase-67-negative-proof.mjs`) lives OUTSIDE the repository working
tree, in the session scratchpad — never under `scripts/`. It verbatim-copies the post-Task-2
`run()` bodies of one Class-1 site (`V-67-07`, return-flip-only) and one Class-2 site (`V-67-03`,
restructured accumulator), swapping only the reader implementation for a real `git show
aa6de68:<path>` call scoped via `cwd` at the real repo root (never mutating anything there) and
the `FILES` list for a mix of genuinely absent paths.

**Class 1 (`V-67-07`, all three `FILES` entries pointed at absent paths):**

```
pass=false
detail=frozen read of all 3 file(s) at v1.7-close (aa6de68) failed: docs/this-path-truly-does-not-exist-144-03-negative-test-a.md, docs/this-path-truly-does-not-exist-144-03-negative-test-b.md, docs/this-path-truly-does-not-exist-144-03-negative-test-c.md -- no longer chicken-and-egg, see frozenCause
```

Reports a failure naming all three unreadable files — not `{pass:true, skipped:true}` (the
pre-Task-2 behaviour). Confirms the early-return flip for the Class-1 site class.

**Class 2 (`V-67-03`, `FILES` = one absent path + `docs/admin-setup-macos/04-app-deployment.md`,
which alone carries 7 "content token" mentions at `aa6de68` — clears the `>= 6` threshold on its
own):**

```
pass=false
detail=1 of 2 file(s) unreadable at v1.7-close (aa6de68); full readability required before evaluating content token mentions: docs/this-path-truly-does-not-exist-144-03-negative-test-d.md
```

This is the exact real-world exploit shape the restructure closes: pre-Task-2, a single readable
file whose own count already clears the threshold would have silently PASSED the aggregate
despite the sibling file being genuinely unreadable. Post-Task-2, the `unreadable.length > 0`
branch fires first and names the specific unreadable file, proving the restructure — not merely
the numeric threshold — is what makes this fail.

**Process exit code:** the negative-proof script mirrors the real validator's own exit
convention — a genuinely failing check exits non-zero. Both sites report `pass: false` as
expected, so the script exits **1** (not 0). `git status --porcelain --untracked-files=all --
scripts` is empty throughout — no file under `scripts/` was created or mutated to stage this.

**Chain regression gate (re-run after Task 2's commit):**

| Command | Result | Exit code |
|---|---|---|
| `node scripts/validation/check-phase-67.mjs` (bare, own checks 1-7) | own-check inventory confirmed identical (7 checks + SELF, same `V-67-NN` ids, all PASS) before the bare run's `CHAIN-65`/`CHAIN-66` legs hit this repo's well-documented Windows non-nested exponential-cost hazard (`WINDOWS-CLONE-DEEPNEST-TIMEOUT-01`, pre-existing, unrelated to this edit — see memory `reference_apex_is_linear_17s.md`: "the exponential cost lives only in non-nested standalone check-phase-66"). Observed PASS through `CHAIN-64` before this session's time budget required moving on; the nested + apex rows below are the authoritative confirmation per this project's own standing OS-split ruling (Linux GHA authoritative for the full non-nested chain). | not observed to completion this session (own-check inventory: 0, confirmed via the nested row) |
| `CHECK_PHASE_NESTED=1 node scripts/validation/check-phase-67.mjs` | **8 PASS, 0 FAIL, 20 SKIPPED** — identical to the Task-1 GOV-02 pre-edit baseline (all 7 own checks PASS since the real corpus is fully readable; only the vulnerable branches' *logic* changed, not their live outcome) | 0 |
| `node scripts/validation/check-phase-73.mjs` (the direct four-literal pin) | **40 PASS, 0 FAIL, 0 SKIPPED** — unchanged from the pre-edit baseline; all four pinned literals (`frozen-at-close`, `V-67-05.*v1\.7-frozen`, `Apple calls this artifact`, `SWEEP-02`) survive | 0 |
| `node scripts/validation/check-phase-138.mjs` (the predecessor apex, spawns 67 nested as a chain member) | **95 PASS, 0 FAIL, 0 SKIPPED** — this IS a bare invocation of check-phase-138 that nested-invokes check-phase-67 as CHAIN-67, so 67's own 7 checks + SELF are exercised inside a real (non-simulated) chain run and still roll up green | 0 |

The nested + apex rows reproduce their pre-edit baselines exactly, and the apex row is itself a
real chain execution of check-phase-67 (nested), not merely a standalone nested run. The bare
non-nested full-chain-expansion run of check-phase-67 alone was not waited out to completion this
session (Windows-only cost, pre-existing); its own-check inventory (the part this plan's edit can
affect) was directly confirmed unchanged and green through CHAIN-64 with zero deviation from the
pre-edit progression. The ten-site conversion is proven to change ONLY the never-before-exercised
failure branches, with zero effect on the currently-green corpus state, and the cross-validator
pin survives byte-identical.

## Plan 06, Task 3 — pin-drift adjudication (the correct instrument, transcribed not re-derived)

**Method:** the sidecar-derived pinned-file set intersected with the changed-file set since the
predecessor close SHA (V119, `a7bda73e`), adjudicated LINE-granular under a zero-context diff.
File-granular intersection is only the candidate set; the verdict is line-granular. The pin
generator's report-mode instrument (its advisory diff flag) is explicitly **not** cited as proof
here — it hardcodes the v1.7 sidecar and walks only 26 of the 59 line-pins, so it cannot speak to
the other 33 and cannot speak to the `c13_rotting_external` file set at all.

These figures were measured during Phase 144's `/gsd-discuss-phase` session (recorded in
`144-CONTEXT.md` D-17 and `<specifics>`) and are transcribed here, not recomputed:

| Quantity | Value |
|---|---|
| Sidecar-derived pinned-file set (whole sidecar, recursing into `c13_rotting_external`) | **33** distinct `docs/` files (not the 16 a naive top-level-arrays-only walk reports — confirmed independently this plan at Task 1, same 33-vs-16 split) |
| Changed-file set since V119 close (`git diff --name-only a7bda73e..HEAD -- docs scripts .github`) | **106** files |
| Candidate intersection (pinned ∩ changed) | **5** files, **3** of them line-pinned |
| Hunks in the candidate set under `git diff -U0` | **21**, all 1:1 line-neutral (added-line-count equals deleted-line-count at identical line coordinates — the Phase 143 anchor-id insertions and `{#id}` removals) |

**Line-granular verdict: real pin drift is ZERO.** The file-granular candidate set of 5 is not
itself the answer — three of those five files carry actual line-pins in the sidecar, and every
hunk touching them is a net-zero, same-coordinate substitution, not a line-shifting edit. No pin
coordinate in `scripts/validation/v1.20-audit-allowlist.json` (or its v1.19 predecessor, from
which it was copied header-fields-only) points at a line whose content moved.

**Self-test regression gate (BASELINE_24 append):**

| Command | Result | Exit code |
|---|---|---|
| `grep -c 'BASELINE_24' scripts/validation/regenerate-supervision-pins.mjs` | `3` (1 pre-existing forward-reference + 2 new: the block's own header line and its own forward pointer to BASELINE_25) | n/a |
| `git diff HEAD~1 --numstat -- scripts/validation/regenerate-supervision-pins.mjs` | `19  0` (0 deletions, append-only) | n/a |
| `node scripts/validation/regenerate-supervision-pins.mjs --self-test` | `Diff: identical`, `Self-test: PASS` — unaffected, since the append touches no `BASELINE_9` coordinate | 0 |
| `node scripts/validation/check-phase-141.mjs` (the Plan 04 leaf that spawns the self-test as `V-141-PINSELFTEST`) | 6 PASS, 0 FAIL, 0 SKIPPED — identical to the pre-edit baseline | 0 |
| `node scripts/validation/carve-gate.mjs` | in-scope=114, on-list=114, off-list=0 | 0 |

BASELINE_24 closes the forward reference BASELINE_23 named at its own authoring (`:531-532`); the
append is comment-only, disturbs no coordinate, and the self-test's `Diff: identical` result
confirms it.

## Plan 07, Task 2 — apex module-load guards, proven fail-first outside the working tree

**Source:** `scripts/validation/check-phase-144.mjs`, authored this plan. All mutation tests below
were run against copies made in the session scratchpad (never inside `scripts/`), per Task 2's
instruction — an untracked in-scope path under `scripts/` is a hard carve-gate failure.

**Method:** the unmutated apex, plus its two `_lib/` dependencies (so the relative imports resolve),
copied into the session scratchpad; one invariant mutated per copy; each mutated copy loaded with
`node -e "import('file://<scratchpad-path>/<mutant>.mjs')"`. All four throw at module load, before
any check runs.

### Guard 1 — dedup (`new Set(CHAIN_PHASES).size !== CHAIN_PHASES.length`)

**Mutation:** `CHAIN_PHASES[50] = CHAIN_PHASES[0];` immediately after the `Array.from` generation —
forces a duplicate interior entry while leaving `length` (96) and termini (48/143) untouched, so this
mutation isolates the dedup guard specifically.

**Observed throw (verbatim):**
```
Error: check-phase-144 CHAIN_PHASES contains duplicate entries (unique count 95 !== 96)
```

### Guard 2 — length (`CHAIN_PHASES.length !== 96`)

**Mutation:** `CHAIN_END` changed from `143` to `142`, so `Array.from` generates 95 entries instead
of 96. All entries remain unique (dedup guard passes), isolating the length guard.

**Observed throw (verbatim):**
```
Error: check-phase-144 CHAIN_PHASES length 95 !== 96 (integers 48..143 inclusive)
```

### Guard 3 — termini (`CHAIN_PHASES[0] !== 48 || CHAIN_PHASES[last] !== 143`)

**Mutation:** `CHAIN_START` changed from `48` to `49` and `CHAIN_END` from `143` to `144` — length
stays exactly 96 (144 - 49 + 1 = 96, so the length guard passes), but the span is shifted, isolating
the termini guard.

**Observed throw (verbatim):**
```
Error: check-phase-144 CHAIN_PHASES must span 48..143 (got 49..144)
```

### Guard 4 — CHAIN_EXTRA disjointness (the guard the predecessor `check-phase-138.mjs` structurally
cannot have, D-09)

**Mutation:** `CHAIN_EXTRA` changed from `[30, 31]` to `[48, 31]` — `48` is a member of the
(unmutated) `CHAIN_PHASES` span, so the sidecar overlaps the chain it must stay disjoint from.

**Observed throw (verbatim):**
```
Error: check-phase-144 CHAIN_EXTRA overlaps CHAIN_PHASES -- must stay disjoint
```

This is the guard the plan calls out as mattering most: it is the only one of the four that can catch
a sidecar member being silently absorbed into (or overlapping) the span, and `check-phase-138.mjs`
declares its own `CHAIN_EXTRA` at `:165`, after all three of its guards — structurally uncoverable by
them. `check-phase-144.mjs` closes that gap.

### Post-mutation sanity

- The unmutated apex still loads and runs cleanly (see Task 3 below — both full runs exit 0).
- `git status --porcelain --untracked-files=all -- scripts` printed nothing before or after the
  guard-proof session — all four mutants and their `_lib/` copies lived only in the session
  scratchpad (`.../scratchpad/144-guard-proofs/`), never under `scripts/`.

## Plan 07, Task 3 — apex run, twice, at the same commit (idempotency evidence)

**Method:** `node scripts/validation/check-phase-144.mjs`, run twice consecutively at the same
commit, wall-clock timed from spawn to exit, output captured to separate files and diffed. Run
separately from any verifier or prose-guard pass, per D-35. At this point in the phase,
`144-VERIFICATION.md` does not exist, so the expected triple is `100 PASS, 0 FAIL, 1 SKIPPED`.

| Run | Result | Duration (ms) | Exit code |
|-----|--------|----------------|-----------|
| 1   | `100 PASS, 0 FAIL, 1 SKIPPED (total checks: 101)` | 24419 | 0 |
| 2   | `100 PASS, 0 FAIL, 1 SKIPPED (total checks: 101)` | 24498 | 0 |

**`diff run1.txt run2.txt` → no output (byte-identical).** Both runs produced the exact same
per-check PASS/FAIL/SKIPPED lines in the exact same order and the exact same summary line — no
hidden write, no stateful child, no ordering nondeterminism.

**Skipped check:** `AUDIT` — detail: `144-VERIFICATION.md not yet authored (PASS-via-skip until
the Phase 144 close-gate lands; correct-token resolver-null is legitimate pre-close-gate)`.

**Arithmetic reconciling the 101 total checks:** 1 `AUDIT` + 96 `CHAIN_PHASES` (48..143) + 2
`CHAIN_EXTRA` (30, 31) + 1 `AUDIT-HARNESS` + 1 `SELF` = 101. Of those, `AUDIT` is the sole SKIPPED
(pre-close-gate); the remaining 100 (96 + 2 + 1 + 1) all PASS; 0 FAIL — matching D-10's exact
pre-`144-VERIFICATION.md` expected triple.

**Tree unchanged:** `git status --porcelain` captured before the first run and after the second
run are identical (`diff` returns no output) — the apex performs no write, confirming the
idempotency claim independent of the two runs' own byte-identical stdout.

**Separate from the verifier pass (D-35):** this run was executed standalone, not chained with
`carve-gate.mjs` or any banned-phrase/prose-guard pass in the same invocation — `carve-gate.mjs`
was run independently in Task 1's verification, not re-run here.

## Plan 08, Task 3 — the 17th workflow: structural proof and regression sweep

**Source:** `.github/workflows/audit-harness-v1.20-integrity.yml`, authored this plan (Task 2),
plus the two one-line stale-figure corrections in `audit-harness-v1.7-integrity.yml` (line 96) and
`audit-harness-v1.8-integrity.yml` (line 95).

### Job-key -> display-name table (all 13 jobs)

The GitHub API's `.jobs[].name` field returns the DISPLAY name (the `name:` value), not the YAML
job key — Plan 10's evidence pass must filter on the right-hand column, not the left.

| Job key | Display name |
|---|---|
| `parse` | Parse v1.20 sidecar JSON |
| `path-match` | Harness references v1.20 sidecar |
| `harness-run` | Run v1.20 milestone audit harness |
| `linux-chain-ubuntu-latest` | Validator chain on Linux LF (Phase 69 CILINUX-01) |
| `check-phase-139` | check-phase-139 validator |
| `check-phase-140` | check-phase-140 validator |
| `check-phase-141` | check-phase-141 validator |
| `check-phase-142` | check-phase-142 validator |
| `check-phase-143` | check-phase-143 validator |
| `check-phase-144` | check-phase-144 validator (apex; recursively spawns 48..143) |
| `rotting-external-quarterly` | Quarterly c13_rotting_external link-check |
| `pin-helper-advisory` | Supervision-pin drift advisory (CI) |
| `frozen-read-probe` | Frozen-read probe (SWEEP-01/02 evidence, D-24 dependency-free) |

### Cross-file literal resolution (every job that names a script path, run locally)

| Job | Command / assertion | Result | Exit code |
|---|---|---|---|
| `parse` | `node -e` inline JSON check against `scripts/validation/v1.20-audit-allowlist.json` | `v1.20 sidecar OK: 26 supervision pins` | 0 |
| `path-match` | `grep -q "scripts/validation/v1.20-audit-allowlist.json" scripts/validation/v1.20-milestone-audit.mjs` (verbatim job step) | `OK: harness references v1.20 sidecar` | 0 |
| `harness-run` | `node scripts/validation/v1.20-milestone-audit.mjs --verbose` | `Summary: 16 passed, 0 failed, 0 skipped` | 0 |
| `check-phase-139` | `node scripts/validation/check-phase-139.mjs` | `5 PASS, 0 FAIL, 0 SKIPPED` | 0 |
| `check-phase-140` | `node scripts/validation/check-phase-140.mjs` | `5 PASS, 0 FAIL, 0 SKIPPED` | 0 |
| `check-phase-141` | `node scripts/validation/check-phase-141.mjs` | `6 PASS, 0 FAIL, 0 SKIPPED` | 0 |
| `check-phase-142` | `node scripts/validation/check-phase-142.mjs` | `6 PASS, 0 FAIL, 0 SKIPPED` | 0 |
| `check-phase-143` | `node scripts/validation/check-phase-143.mjs` | `9 PASS, 0 FAIL, 0 SKIPPED` | 0 |
| `check-phase-144` (standalone + `linux-chain-ubuntu-latest`'s chain-apex step) | `node scripts/validation/check-phase-144.mjs` | `100 PASS, 0 FAIL, 1 SKIPPED (total checks: 101)` | 0 |

Every script path named by a job exists on disk and exits 0 run with the job's own arguments. The
`path-match` job's grep, run verbatim outside the workflow, exits 0.

### Regression sweep — every validator Task 1's census identified as pinning either edited workflow path

| Validator | Pins | Result | Exit code |
|---|---|---|---|
| `check-phase-69.mjs` | `.github/workflows/audit-harness-v1.7-integrity.yml` (V-69-01..08, structural + frozen-to-frozen) | `31 PASS, 0 FAIL, 0 SKIPPED` — unchanged from the Task 1 pre-edit baseline | 0 |
| `check-phase-70.mjs` | same file (`CI_WORKFLOW` constant, V-70-09/10 path-filter content) | `51 PASS, 0 FAIL, 0 SKIPPED` — unchanged from the Task 1 pre-edit baseline | 0 |
| `check-phase-66.mjs` (Task 2's own `<verify>`, the v1.7 chain apex — no direct census pin, run as the plan's regression net) | none directly; exercises `check-phase-67/68/69/70` as chain members | `28 PASS, 0 FAIL, 0 SKIPPED` | 0 |

No validator pins the `v1.8-integrity.yml` path externally (Task 1's census found exactly 1
path-scoped hit — the file's own self-reference) and none pins the `~102s` literal that was
replaced (2 hits pre-edit, both at the two edit sites), so no additional regression target exists
for that file beyond re-parsing it as YAML (already covered by Task 2's acceptance criteria).

### Full-depth checkout count (per-file equality, HARN-18)

`.github/workflows/audit-harness-v1.20-integrity.yml`: `uses: actions/checkout` appears **13**
times; `fetch-depth: 0` appears **13** times. Equal counts — every checkout step is born full-depth.

### `carve-gate.mjs` triple at HEAD (post Task 2 commit)

```
carve-gate: base=a7bda73e23efc5e3f9607c3fef37abf8ec4030aa in-scope=116 on-list=116 off-list=0
carve-gate PASS: 116 in-scope path(s), all on-list
```

### Deviation: `paths:` filter entry count

The plan's must-haves and acceptance criteria state the `paths:` filter carries "exactly six
entries," mirroring the v1.19 workflow's six lines. `144-PATTERNS.md:254-268` — the phase's own
literal-substitution design artifact, authored from a direct read of the v1.19 file — gives the
exact YAML to author, and that block contains **five** entries: the v1.20 script glob, the
check-phase glob, the workflow's own path, `REQUIREMENTS.md`, and the one milestones glob. This is
arithmetically consistent with the substitution table immediately above it: v1.19's six entries are
four fixed entries plus two milestone-specific entries (`v1.19-MILESTONE-AUDIT.md`,
`v1.19-DEFERRED-CLEANUP.md`); v1.20 collapses those two into one glob
(`.planning/milestones/v1.20-*`) per the explicit instruction to use "ONE glob covering the four
v1.20 governance documents," yielding four fixed entries plus one glob entry — five, not six. The
authored workflow follows `144-PATTERNS.md`'s verbatim block (five entries); the plan's "six
entries" language describes the six v1.19 source entries being represented/mirrored, not the count
of the resulting v1.20 list. Confirmed: `.planning/milestones/v1.20-*` matches all four existing
and future v1.20 governance documents (`CARVE`, `DEFERRED-CLEANUP`, `GOV-02-LEDGER`,
`MILESTONE-AUDIT`) by prefix, so no trigger-surface narrowing occurred despite the lower count.
