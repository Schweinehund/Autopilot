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
