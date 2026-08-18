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

## Plan 09, Task 1 — Pre-push readiness census

Zero code changes. HEAD at start of this plan: `7ad104bf23140fc709ea1cfb7b01906849353ae6` (139
commits landed since the discuss-phase measurement session at `1c474898`, all confined to
`.planning/`, `scripts/validation/`, `.github/workflows/` per HARN-17/18's own scope — no corpus
content touched, per the D-01 harness-only constraint).

### Ten standalone-red members, re-run fresh at HEAD (not inherited from Phase 141/142/discuss-phase evidence)

| Member | Result | Exit | Notes |
|---|---|---|---|
| check-phase-30 | 12 PASS, 0 FAIL, **1 SKIPPED** | 0 | Skip = `markdown-link-check`/`mermaid-cli` unavailable |
| check-phase-31 | 29 PASS, 0 FAIL, **1 SKIPPED** | 0 | Skip = V-31-30 `markdown-link-check` unavailable |
| check-phase-48 | 7 PASS, 0 FAIL, 0 SKIPPED | 0 | |
| check-phase-60 | 25 PASS, 0 FAIL, 0 SKIPPED | 0 | |
| check-phase-61 | 34 PASS, 0 FAIL, 0 SKIPPED | 0 | |
| check-phase-62 | 34 PASS, 0 FAIL, 0 SKIPPED | 0 | |
| check-phase-63 | 32 PASS, 0 FAIL, 0 SKIPPED | 0 | |
| check-phase-64 | 29 PASS, 0 FAIL, 0 SKIPPED | 0 | |
| check-phase-65 | 33 PASS, 0 FAIL, 0 SKIPPED | 0 | wall-clock 5m19s (Windows non-nested chain-expansion cost, pre-existing hazard class) |
| check-phase-66 | 28 PASS, 0 FAIL, 0 SKIPPED | 0 | wall-clock 10m36s (same hazard class; ran via background task after exceeding the 600s foreground cap) |

**All ten exit 0.** Exactly two SKIPs across the ten runs, both classified: `check-phase-30`'s and
`check-phase-31`'s skips are deterministic environment skips on an absent optional
`markdown-link-check` (npm package, not in `package.json`) and an absent optional `mermaid-cli`
binary — neither is a project dependency, and `check-phase-31.mjs`'s own invocation form
(`npx --yes --no-install`) means these skip on Linux CI too, not only this Windows box. A skip that
is classified this way is evidence of a deterministic environment gap, not a coverage hole.

**`regenerate-supervision-pins.mjs --self-test`** (RED-02 closure, re-confirmed): `Diff: identical`,
`Self-test: PASS`, exit 0.

### Class-1 archival drift — static census

**Population, re-measured (not carried from the discuss-phase-time figure of 51):**
`grep -rl '\.planning/phases/' scripts/validation/` → **71** files at current HEAD (up from the
144-CONTEXT.md `<specifics>` baseline of 51 — the increase is expected and accounted for: Phase 144
Plans 02–08 landed `check-phase-144.mjs`, `v1.20-milestone-audit.mjs`, and touched/added other
`scripts/validation/*.mjs` files since that measurement, several of which carry a `Source of truth:`
header comment naming their originating `.planning/phases/NNN-.../` doc). The population count
itself is not the gate — Class 1 acts only on the subset of that population whose reads are LIVE
(non-frozen) AND target a phase in the 139–144 range.

**Narrowing to the 139–144 range:** `grep -rn '\.planning/phases/(139|140|141|142|143|144)-'
scripts/validation/` → exactly 3 lines, all in 2 files:

| File:Line | Content | Classification |
|---|---|---|
| `check-phase-144.mjs:10` | `// Source of truth: .planning/phases/144-.../144-CONTEXT.md` | Comment only — not a runtime `PATH` constant, never passed to any read function |
| `check-phase-144.mjs:11` | `// and .planning/phases/144-.../144-PATTERNS.md` | Comment only, same as above |
| `v1.20-milestone-audit.mjs:3` | `// Source of truth: .planning/phases/144-.../144-CONTEXT.md (D-17)` | Comment only, same as above |

None of the three is a `readFile`/`readFileSync`/`readAtClose`/`readCorpusFileAt*` argument — each
is a header-comment provenance note (matching the pattern already established at
`check-phase-134.mjs:9-10` and `check-phase-138.mjs:9-10`, neither of which is a survivor either).
Confirmed by reading the surrounding lines directly: no `PATH =` or function-call site anywhere in
either file targets a `139`–`144` phase directory.

**Frozen-reader call sites subtracted from the general population (named per the plan's read_first,
though moot here since zero literal-path survivors exist in the 139–144 range regardless of reader
type):** `check-phase-70.mjs:398,414` (`readCorpusFileAtV17CloseGate`, targets the v1.7 close-gate
phase dir 70, not 139–144) and `check-phase-124.mjs:46,97` (`readAtV116Close`, targets the v1.16
close-gate phase dir 124, not 139–144).

**Class-1 census result: ZERO survivors reading phases 139–144**, confirmed live, matching the
`144-CONTEXT.md` D-30 baseline disposition even though the underlying reference-population count
grew from 51 to 71 between the discuss-phase measurement and this plan's execution. `D-14`'s "zero
`.planning/phases/` reads in the five new leaves" is independently confirmed: `check-phase-139.mjs`
through `check-phase-143.mjs` appear nowhere in either the 71-file population or the 3-line
139–144-range grep.

### Working-tree hygiene — RULING

| Metric | Count |
|---|---|
| `git status --porcelain --untracked-files=all` (all porcelain entries) | **105** |
| `git worktree list` | **8** (1 main + 7 linked agent worktrees) |
| `git branch --no-merged master` (unmerged local branches with a linked worktree) | **7** (`worktree-agent-a30e3c02`, `-a7060637`, `-a78a3e75`, `-a7915453`, `-aa31f5d9`, `-adf4846f`, `-af6387cf`) |
| `git status --porcelain --untracked-files=all -- scripts .github docs` (in-scope-prefix subset) | **0** |

**Ruling:** none of the 105 porcelain entries, 8 worktrees, or 7 unmerged branches sits inside the
CARVE gate's scope (`scripts/`, `.github/`, `docs/` — confirmed 0 hits when the porcelain scan is
restricted to those prefixes). This is a ruling, not a silence: Axis-1 (fresh clone) and Axis-3
(zero-context reproduction) both run against a remote state that is a push of local `master` only —
untracked working-tree files and unmerged local/linked-worktree branches are never pushed and do
not enter either axis's evaluated state. The figures are recorded here so a later reader can
confirm the ruling was made with the numbers in view, not assumed.

### Apex, run separately from any verifier or prose-guard pass (D-35)

```
node scripts/validation/check-phase-144.mjs
Result: 100 PASS, 0 FAIL, 1 SKIPPED (total checks: 101)
```
Exit 0. Unchanged from the Plan 07 idempotency baseline (`AUDIT` is the sole pre-close-gate SKIP).

## Plan 09, Task 2 — Live 17-workflow enumeration, freshness pre-flight, atom-branch audit

### Live workflow-directory listing (both extensions, at this moment — never a carried count)

`ls .github/workflows/*.yml .github/workflows/*.yaml` → **17** files (`*.yaml` = 0, a durability
guard confirming no file exists under the alternate extension):

```
audit-harness-integrity.yml
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
audit-harness-v1.20-integrity.yml
audit-harness-v1.5-integrity.yml
audit-harness-v1.6-integrity.yml
audit-harness-v1.7-integrity.yml
audit-harness-v1.8-integrity.yml
audit-harness-v1.9-integrity.yml
```

Count asserted as 17 (sixteen predecessors + the one this phase authored) — **confirmed, not a
finding.**

### Ready-to-paste dispatch command block (17 lines, deterministic `ls` order, targeting the default branch — FOR THE OWNER TO RUN, not run by the executor)

```
gh workflow run "audit-harness-integrity.yml" --ref master
gh workflow run "audit-harness-v1.10-integrity.yml" --ref master
gh workflow run "audit-harness-v1.11-integrity.yml" --ref master
gh workflow run "audit-harness-v1.12-integrity.yml" --ref master
gh workflow run "audit-harness-v1.13-integrity.yml" --ref master
gh workflow run "audit-harness-v1.14-integrity.yml" --ref master
gh workflow run "audit-harness-v1.15-integrity.yml" --ref master
gh workflow run "audit-harness-v1.16-integrity.yml" --ref master
gh workflow run "audit-harness-v1.17-integrity.yml" --ref master
gh workflow run "audit-harness-v1.18-integrity.yml" --ref master
gh workflow run "audit-harness-v1.19-integrity.yml" --ref master
gh workflow run "audit-harness-v1.20-integrity.yml" --ref master
gh workflow run "audit-harness-v1.5-integrity.yml" --ref master
gh workflow run "audit-harness-v1.6-integrity.yml" --ref master
gh workflow run "audit-harness-v1.7-integrity.yml" --ref master
gh workflow run "audit-harness-v1.8-integrity.yml" --ref master
gh workflow run "audit-harness-v1.9-integrity.yml" --ref master
```

Run each ONLY after the push lands, since `workflow_dispatch` requires the workflow file to already
exist on the default branch it targets.

### Freshness pre-flight (read-only fetch + count, executed fresh this session — the stored
`.git/FETCH_HEAD` state was days stale and was never re-measured before now)

| Quantity | Value |
|---|---|
| `origin/master` before fetch | `f89a68d7cd3fdf9bbfc9debd5d640e3462484b8c` |
| `git fetch origin` | ran clean, no new refs (remote unchanged since the last fetch) |
| `origin/master` after fetch | `f89a68d7cd3fdf9bbfc9debd5d640e3462484b8c` |
| local `master` (= HEAD) | `7ad104bf23140fc709ea1cfb7b01906849353ae6` |
| **ahead** (`git rev-list --count origin/master..master`) | **139** |
| **behind** (`git rev-list --count master..origin/master`) | **0** |

**The behind-count is fresh and is 0.** The ahead-count has grown from the discuss-phase-session
figure of 96 to **139** — expected, since Plans 02 through 08 landed in between and this plan's own
census work adds zero commits of its own until the SUMMARY/state-update commit. The local head SHA
`7ad104bf23140fc709ea1cfb7b01906849353ae6` is the prospective shared close SHA for all three audit
axes once the owner pushes — it will change again if any further commit (including this plan's own
SUMMARY commit) lands before the push, so the owner must re-read `git rev-parse master` at push time
rather than trust this recorded value verbatim.

### Atom-branch audit (report only — NOT deleted, NOT modified)

| Quantity | Value |
|---|---|
| `git rev-list --count master..phase-139-atom-5` | **0** (fully merged) |
| Local branch tip | `c2450efa0c498777aa0c03f5ed90c52b8d2da38f` |
| `origin/phase-139-atom-5` | exists, resolves to the same `c2450efa...` — local and remote tips match |
| Run-evidence coupling | `c2450efa` is the head SHA of the **16 recorded 2026-08-06 CI runs** on which SWEEP-01/SWEEP-02's completion evidence rests (per `139-06-SUMMARY.md:119,142`, which instructs KEEP + re-confirm, not delete) |

The keep/delete disposition is NOT decided here — it is presented to the owner at the Task 3
checkpoint as an explicit option, per D-23 (REVERSED from "delete at close" during Phase 144's own
discuss-phase review). The branch was neither deleted nor modified by this plan.

### `git rev-parse origin/master` — unchanged across this plan's own work

Before Task 1: `f89a68d7cd3fdf9bbfc9debd5d640e3462484b8c`. After Task 2 (immediately before this
append): `f89a68d7cd3fdf9bbfc9debd5d640e3462484b8c`. Identical — this plan pushed nothing.

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

## Plan 10, Task 1 — Axis-2 job-level evidence, all 17 runs at the shared SHA

**Owner-executed, this plan records/verifies.** The push and both dispatch rounds happened outside
this plan's execution — recorded here per the objective's own instruction to record job-level
evidence, not to re-derive the push/dispatch itself. Every figure below was independently
re-measured this task via `gh run view`/`gh api`, not transcribed from the owner's briefing without
verification.

### Shared SHA and read-back assertion

**Shared close SHA: `2858c0b5e6d3c05133fd1bcc4c5c12f97e01c55c`.** `git rev-parse HEAD` in the
working tree at task start equals this value; `git rev-parse origin/master` equals this value —
local and remote are identical (0 ahead / 0 behind), confirming the push landed and this session's
own HEAD is already the shared SHA.

**Read-back:** `gh run view <id> --json headSha` was queried for all 17 runs listed below.
**All 17 return `headSha == 2858c0b5e6d3c05133fd1bcc4c5c12f97e01c55c`** — quoted, not assumed. All
17 also carry `event: workflow_dispatch` and run-level `conclusion: success` (the run-level colour
is recorded here only as a pre-filter; per D-21 it is never the evidence itself — job-level
conclusions below are).

### The remediation round (D-22) — one round, spent, succeeded

**First dispatch, SHA `32aaae6346e4ca8d8fa917253516eb45a1f32183`:** 16 of 17 green;
`Audit Harness v1.20 Integrity` run `32092878952` returned run-level `failure`. Job-level JSON for
that run, fetched and quoted:

| Job | Conclusion |
|---|---|
| Frozen-read probe (SWEEP-01/02 evidence, D-24 dependency-free) | success |
| Parse v1.20 sidecar JSON | success |
| Harness references v1.20 sidecar | success |
| Run v1.20 milestone audit harness | success |
| check-phase-139 validator | success |
| check-phase-140 validator | success |
| **Validator chain on Linux LF (Phase 69 CILINUX-01)** | **failure** |
| check-phase-141 validator | success |
| check-phase-142 validator | success |
| **check-phase-143 validator** | **failure** |
| Supervision-pin drift advisory (CI) | success |
| **check-phase-144 validator (apex; recursively spawns 48..143)** | **failure** |
| Quarterly c13_rotting_external link-check | skipped |

Exactly 3 failed jobs, one root cause: `check-phase-143.mjs` genuinely failed
(`check-nav-hub-links.mjs`'s self-test case G — the traversal fixture leaf `/etc/passwd` resolves
absent on Windows but PRESENT on the Linux runner, so the not-found leg measured a property of the
host, not of `resolveLinkTarget`). The standalone `check-phase-143 validator` job failed directly;
the apex job (`check-phase-144`, which recursively re-runs 143 as a chain member) and the
`Validator chain on Linux LF` job (the DUAL-APEX Linux chain leg, which also re-runs the same apex)
both inherited the same root cause as chain children — not three independent defects.

**Fix commit `2858c0b5e6d3c05133fd1bcc4c5c12f97e01c55c`** (preceded by the pre-edit census commit
`1c49e33b`, GOV-02 ledger row, alone-and-first): retargeted the self-test fixture leaf from
`../../../../../../etc/passwd` to `../../../../../../gsd-absent-traversal-target-8f3a1c.md` — a
name absent on every platform, preserving the pathological traversal depth and the not-found
assertion while removing the host-dependent leg. `git show --stat` confirms a single file changed
(`scripts/validation/check-nav-hub-links.mjs`, 7 insertions / 4 deletions).

**Second dispatch, SHA `2858c0b5e6d3c05133fd1bcc4c5c12f97e01c55c` (the shared SHA): 17 of 17 green.**
This is the ONE remediation round D-22 authorizes; it succeeded, so HARN-19 proceeds. Per D-22's own
cost rule, the SHA changed with the fix, which forces Axis-1 and Axis-3 to run at this new SHA — see
Task 2 below.

### The 17-row table (deterministic `ls` order, matching the live workflow-directory listing recorded at Plan 09)

| # | Workflow | Run ID | `.headSha` | Event | Jobs total | Success | Skipped | Failed |
|---|---|---|---|---|---|---|---|---|
| 1 | `audit-harness-integrity.yml` (base) | `32094106520` | `2858c0b5...` | workflow_dispatch | 5 | 5 | 0 | 0 |
| 2 | `audit-harness-v1.10-integrity.yml` | `32094117048` | `2858c0b5...` | workflow_dispatch | 13 | 12 | 1 | 0 |
| 3 | `audit-harness-v1.11-integrity.yml` | `32094118821` | `2858c0b5...` | workflow_dispatch | 12 | 11 | 1 | 0 |
| 4 | `audit-harness-v1.12-integrity.yml` | `32094120474` | `2858c0b5...` | workflow_dispatch | 9 | 8 | 1 | 0 |
| 5 | `audit-harness-v1.13-integrity.yml` | `32094122150` | `2858c0b5...` | workflow_dispatch | 12 | 11 | 1 | 0 |
| 6 | `audit-harness-v1.14-integrity.yml` | `32094123918` | `2858c0b5...` | workflow_dispatch | 19 | 18 | 1 | 0 |
| 7 | `audit-harness-v1.15-integrity.yml` | `32094125507` | `2858c0b5...` | workflow_dispatch | 14 | 13 | 1 | 0 |
| 8 | `audit-harness-v1.16-integrity.yml` | `32094127061` | `2858c0b5...` | workflow_dispatch | 13 | 12 | 1 | 0 |
| 9 | `audit-harness-v1.17-integrity.yml` | `32094128663` | `2858c0b5...` | workflow_dispatch | 10 | 9 | 1 | 0 |
| 10 | `audit-harness-v1.18-integrity.yml` | `32094130203` | `2858c0b5...` | workflow_dispatch | 13 | 12 | 1 | 0 |
| 11 | `audit-harness-v1.19-integrity.yml` | `32094131814` | `2858c0b5...` | workflow_dispatch | 11 | 10 | 1 | 0 |
| 12 | `audit-harness-v1.20-integrity.yml` | `32094133344` | `2858c0b5...` | workflow_dispatch | 13 | 12 | 1 | 0 |
| 13 | `audit-harness-v1.5-integrity.yml` | `32094108113` | `2858c0b5...` | workflow_dispatch | 19 | 19 | 0 | 0 |
| 14 | `audit-harness-v1.6-integrity.yml` | `32094109885` | `2858c0b5...` | workflow_dispatch | 11 | 10 | 1 | 0 |
| 15 | `audit-harness-v1.7-integrity.yml` | `32094111674` | `2858c0b5...` | workflow_dispatch | 11 | 10 | 1 | 0 |
| 16 | `audit-harness-v1.8-integrity.yml` | `32094113564` | `2858c0b5...` | workflow_dispatch | 11 | 10 | 1 | 0 |
| 17 | `audit-harness-v1.9-integrity.yml` | `32094115154` | `2858c0b5...` | workflow_dispatch | 15 | 14 | 1 | 0 |
| | **Total** | | | | **211** | **196** | **15** | **0** |

`2858c0b5...` abbreviates `2858c0b5e6d3c05133fd1bcc4c5c12f97e01c55c` — identical on all 17 rows,
each independently queried via `gh run view <id> --json headSha`, never carried from a single read.
17 distinct workflow files, 17 distinct run IDs. **Zero jobs conclude `failure` anywhere in the
211-job set.**

### Skip ledger — every skip classified

**Observed: 15 skips, all named `Quarterly c13_rotting_external link-check`**, one each in 15 of the
17 runs (absent from `audit-harness-integrity.yml` base and `audit-harness-v1.5-integrity.yml`).

**Expected count, derived live** (not carried from a prior milestone's figure, per D-21b):
`grep -rn "github.event_name == 'schedule'" .github/workflows/*.yml` at this HEAD returns exactly
**15** matches — one per workflow file — spanning base+v1.5 EXCLUDED (15 of 17, matching the
observed 15-of-17 split) and confirming the two `always() && github.event_name == 'schedule' && ...`
wrapped forms (`audit-harness-v1.6-integrity.yml:173`, `audit-harness-v1.7-integrity.yml:162`) ARE
counted by this substring grep (it matches the `github.event_name == 'schedule'` fragment
regardless of the `always()` prefix, so no undercount occurs here). **Observed 15 == derived
expected 15.** This job is guarded by `if: github.event_name == 'schedule' && ...` and therefore
always skips under `workflow_dispatch` — a legitimate, classified skip, not a gap.

**Dependency-cascade skips (D-21c — a GAP, never legitimate):** **ZERO observed.** Every job whose
`needs:` includes `harness-run` succeeded in all 17 runs (confirmed directly in the job table above:
0 failures anywhere means `harness-run` never failed, so the six-job cascade risk named in
`144-CONTEXT.md` D-16 never manifested this pass). Spot-checked on the v1.20 run's own job list: all
12 non-skip jobs report `success`, including the five leaves, the apex, and the Linux-chain job that
depend transitively on `harness-run`.

**Advisory job (D-21d — NON-EVIDENCE regardless of conclusion):** `Supervision-pin drift advisory
(CI)` (`pin-helper-advisory`) appears **17 times, once per workflow** (correcting the pre-task
figure of 16 supplied in this plan's own prompt context — measured directly via
`grep -c -i "advisory"` per run's job list, not carried) — every one of the 17 workflows,
including base, carries exactly one advisory job, all `success`. Its `continue-on-error: true`
(`:200`) plus `|| true` (`:208`) plus `|| echo` (`:212-213`) fallback (confirmed present in the
authored `audit-harness-v1.20-integrity.yml`) means its conclusion is structurally always
`success` — it is recorded here in its own column, **excluded from both the pass tally (196) and
the skip tally (15)**. Reconciliation: 196 success (of which 17 are non-evidence advisory, leaving
179 evidence-bearing passes) + 15 classified event-gated skips + 0 dependency-cascade gaps + 0
failures = 211, matching the job table's total column exactly.

### Byte-unchanged assertion for the duration of this task

`git diff 2858c0b5e6d3c05133fd1bcc4c5c12f97e01c55c..HEAD -- .github scripts` → empty (this session's
own HEAD already equals the shared SHA — no further edit landed during Task 1's evidence-gathering).
The one edit that DID land between the two dispatch rounds is the remediation-round commit itself
(`2858c0b5`), explicitly recorded above with its old and new SHA, per the acceptance criterion's own
"or a remediation round is explicitly recorded" clause.

**HARN-19 Axis-2 verdict: MET.** All 17 runs green at the job level at one shared, read-back-verified
SHA; every skip classified; zero dependency-cascade gaps; the advisory job isolated as non-evidence;
the one remediation round taken, recorded in full, and it discharged the red job it targeted.

## Plan 10, Task 2 — Axis-1 fresh clone and Axis-3 same-host proxy reproduction, same SHA

### Axis-1 — fresh clone, full depth, outside the working tree

`git -c core.longpaths=true clone --no-hardlinks D:/claude/Autopilot <scratchpad>/144-10-axis1-clone`
(the `core.longpaths=true` override is a Windows MAX_PATH necessity for this repo's deep
`.planning/milestones/` paths — not a scope change; a depth-1 clone was explicitly avoided per the
plan's own instruction that a shallow clone fatals `readAtClose()`). `git rev-parse
--is-shallow-repository` → `false` (full-depth, confirmed). Checked out
`2858c0b5e6d3c05133fd1bcc4c5c12f97e01c55c` explicitly; `git rev-parse HEAD` in the clone → the same
value, quoted from the clone itself.

| Validator class | Command | Result | Exit |
|---|---|---|---|
| harness (leaf) | `v1.20-milestone-audit.mjs --verbose` | `Summary: 16 passed, 0 failed, 0 skipped` | 0 |
| harness self-test | `v1.20-milestone-audit.mjs --self-test` | `Self-test: 9 passed, 0 failed` | 0 |
| check-phase-139 (leaf) | `node scripts/validation/check-phase-139.mjs` | `5 PASS, 0 FAIL, 0 SKIPPED` | 0 |
| check-phase-140 (leaf) | `node scripts/validation/check-phase-140.mjs` | `5 PASS, 0 FAIL, 0 SKIPPED` | 0 |
| check-phase-141 (leaf) | `node scripts/validation/check-phase-141.mjs` | `6 PASS, 0 FAIL, 0 SKIPPED` | 0 |
| check-phase-142 (leaf) | `node scripts/validation/check-phase-142.mjs` | `6 PASS, 0 FAIL, 0 SKIPPED` | 0 |
| check-phase-143 (leaf) | `node scripts/validation/check-phase-143.mjs` | `9 PASS, 0 FAIL, 0 SKIPPED` | 0 |
| check-phase-144 (apex, chain) | `node scripts/validation/check-phase-144.mjs` | `100 PASS, 0 FAIL, 1 SKIPPED (total checks: 101)` | 0 (28.8s wall-clock) |

### Axis-3 — same-host proxy reproduction (disclosed limitation, matching the Plan 138-04 precedent)

**This session's toolset exposes no agent-dispatch primitive** (no subagent/Task tool is available
to this executor), so the genuinely context-independent dispatched-agent form of Axis-3 used at
v1.19's Plan 138-05 could not be repeated verbatim here. Per the exact honesty precedent set at
`v1.19-MILESTONE-AUDIT.md` Plan 138-04 ("disclosed honestly as NOT host-independent and NOT
context-independent... flagged for explicit human confirmation rather than silently counted as
satisfying the axis"), Axis-3 here is a **second, fully independent fresh clone** — a distinct `git
clone` invocation into a separate scratchpad directory, a distinct `node` process per check, sharing
no state with Axis-1's clone or this session's working tree — run and recorded without consulting
Axis-1's captured output while composing the commands (the command set is identical by design,
since the validator set is fixed by the plan; the RESULTS were read from Axis-3's own terminal
output, not copied from Axis-1's). This is the strongest reproduction available given the toolset;
it is explicitly **not** a claim of LLM-context independence, and the human checkpoint below is
asked to confirm whether this satisfies Axis-3 or whether a genuinely dispatched-agent run is
required before close.

`git -c core.longpaths=true clone --no-hardlinks D:/claude/Autopilot <scratchpad>/144-10-axis3-clone`,
checked out `2858c0b5e6d3c05133fd1bcc4c5c12f97e01c55c` explicitly; `git rev-parse HEAD` in this
second clone → the same value.

| Validator class | Result | Exit |
|---|---|---|
| harness (leaf) | `Summary: 16 passed, 0 failed, 0 skipped` | 0 |
| harness self-test | `Self-test: 9 passed, 0 failed` | 0 |
| check-phase-139 (leaf) | `5 PASS, 0 FAIL, 0 SKIPPED` | 0 |
| check-phase-140 (leaf) | `5 PASS, 0 FAIL, 0 SKIPPED` | 0 |
| check-phase-141 (leaf) | `6 PASS, 0 FAIL, 0 SKIPPED` | 0 |
| check-phase-142 (leaf) | `6 PASS, 0 FAIL, 0 SKIPPED` | 0 |
| check-phase-143 (leaf) | `9 PASS, 0 FAIL, 0 SKIPPED` | 0 |
| check-phase-144 (apex, chain) | `100 PASS, 0 FAIL, 1 SKIPPED (total checks: 101)` | 0 (44.3s wall-clock) |

Every row is byte-identical to Axis-1's corresponding row.

### Axis-2 — Linux GHA, job-level raw logs (from Task 1's `2858c0b5` v1.20 and cross-workflow runs)

Fetched via `gh api repos/Schweinehund/Autopilot/actions/jobs/<job-id>/logs` (raw log text, not the
run-level colour), from run `32094133344` (the v1.20 workflow at the shared SHA):

| Job | Result line (verbatim from raw log) |
|---|---|
| Run v1.20 milestone audit harness (`harness-run`) | `Summary: 16 passed, 0 failed, 0 skipped` |
| check-phase-139 validator | `Result: 5 PASS, 0 FAIL, 0 SKIPPED` |
| check-phase-140 validator | `Result: 5 PASS, 0 FAIL, 0 SKIPPED` |
| check-phase-141 validator | `Result: 6 PASS, 0 FAIL, 0 SKIPPED` |
| check-phase-142 validator | `Result: 6 PASS, 0 FAIL, 0 SKIPPED` |
| check-phase-143 validator | `Result: 9 PASS, 0 FAIL, 0 SKIPPED` |
| check-phase-144 validator (apex; standalone job) | `Result: 100 PASS, 0 FAIL, 1 SKIPPED (total checks: 101)` |
| Validator chain on Linux LF (Phase 69 CILINUX-01) (`linux-chain-ubuntu-latest`, the DUAL-APEX chain leg — also runs `check-phase-144.mjs`) | `Result: 100 PASS, 0 FAIL, 1 SKIPPED (total checks: 101)` |

**No `--self-test` job exists in CI for the harness** — the workflow's `harness-run` job runs only
`--verbose` (`.github/workflows/audit-harness-v1.20-integrity.yml:93`); the self-test leg is
Windows-local only (Axis-1/Axis-3). This is a legitimate, named tooling-surface difference, not a
smoothed-over mismatch — see the exact-match table below, which marks that cell accordingly rather
than omitting it.

### Cross-OS exact-match table

| # | Validator class | Type | Windows (Axis 1, fresh clone) | Windows (Axis 3, same-host proxy — see disclosed limitation above) | Linux (Axis 2, GHA raw logs) | Verdict |
|---|---|---|---|---|---|---|
| 1 | `v1.20-milestone-audit.mjs --verbose` | leaf | 16/0/0 | 16/0/0 | 16/0/0 | EXACT MATCH |
| 2 | `v1.20-milestone-audit.mjs --self-test` | leaf | 9/9 pass | 9/9 pass | **not run in CI (no `--self-test` job exists in the workflow)** | Windows-only leg — legitimate tooling-surface difference, not a mismatch; both Windows axes agree with each other |
| 3 | `check-phase-139.mjs` | leaf | 5/0/0 | 5/0/0 | 5/0/0 | EXACT MATCH |
| 4 | `check-phase-140.mjs` | leaf | 5/0/0 | 5/0/0 | 5/0/0 | EXACT MATCH |
| 5 | `check-phase-141.mjs` | leaf | 6/0/0 | 6/0/0 | 6/0/0 | EXACT MATCH |
| 6 | `check-phase-142.mjs` | leaf | 6/0/0 | 6/0/0 | 6/0/0 | EXACT MATCH |
| 7 | `check-phase-143.mjs` | leaf | 9/0/0 | 9/0/0 | 9/0/0 | EXACT MATCH |
| 8 | `check-phase-144.mjs` (apex, `CHAIN_PHASES=[48..143]` + `CHAIN_EXTRA=[30,31]`) | chain | **100/0/1 (101 total)** | **100/0/1 (101 total)** | **100/0/1 (101 total), BOTH the standalone apex job AND the `linux-chain-ubuntu-latest` DUAL-APEX job** | **EXACT MATCH — every measurement identical** |

Every row cites the SAME shared SHA `2858c0b5e6d3c05133fd1bcc4c5c12f97e01c55c` — no differing SHA
anywhere, satisfying D-20's single-shared-SHA discipline and its read-back requirement (Task 1
above quoted the read-back for all 17 Axis-2 runs; this task quoted it directly from both fresh
clones). The one non-identical cell (row 2, harness `--self-test`) carries its cause in the same
row per the plan's own instruction, rather than being smoothed into a false "all identical" claim.

**Working-tree cleanliness:** `git status --porcelain --untracked-files=no` in the main working
tree, run immediately before and after both clones/all Task 2 command sequences, returns 0 lines
both times — Axis-1 and Axis-3 both ran entirely inside separate scratchpad directories outside
`D:/claude/Autopilot`; the main tree's tracked-file state is unchanged.

**HARN-19 Axis-1/Axis-3 verdict: MET, with one disclosed and one honestly-flagged limitation** —
(a) the harness `--self-test` leg has no CI counterpart, a legitimate tooling-surface gap recorded
in the exact-match table, not a defect; (b) Axis-3 is a same-host, same-toolset independent-clone
proxy rather than a genuinely context-independent dispatched-agent run, disclosed exactly as the
`v1.19` precedent disclosed the same gap — routed to the Task 3 human checkpoint for an explicit
call on whether it satisfies HARN-19's Axis-3 bar or whether a dispatched-agent run must be
obtained before the close-gate.
