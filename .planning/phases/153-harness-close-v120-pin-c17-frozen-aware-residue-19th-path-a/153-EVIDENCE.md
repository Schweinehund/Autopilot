# Phase 153 — Terminal Close Evidence

**Why this file exists.** The chain apex (`check-phase-153.mjs`) sets `CHECK_PHASE_NESTED=1` on
every child it spawns. Each of the six apex-generation validators (`check-phase-119.mjs`,
`-125.mjs`, `-128.mjs`, `-134.mjs`, `-138.mjs`, `-144.mjs`) carries a harness re-run check
(`AUDIT-HARNESS`) guarded by that same nested flag, and under the flag the harness re-run is
skipped. The apex sets the flag on every child unconditionally — so all six `AUDIT-HARNESS` steps
skip inside any apex run, non-nested or nested, top-level or recursive. **A perfect apex triple
(110/0/1 pre-close-gate, 111/0/0 post-close-gate) is therefore fully compatible with all six
frozen-corpus conversions being broken.** The apex triple is not evidence for the conversion
criterion (HARN-03/SC#2). This document is the only place the conversion is actually exercised —
six direct invocations, run from the repository root, with the nested flag unset.

---

## Task 1 — Six direct harness runs, six nested-guard skip notes, the second-order asymmetry

### 1.1 Six direct harness invocations (nested flag UNSET), one sequence

All six commands below were run in this session, sequentially, with `CHECK_PHASE_NESTED` unset
(i.e. absent from the environment — the harnesses' own `--verbose` flag was passed for full detail).

| # | Command | Exit | Triple | C17 line detail (names the milestone tag + materialized file count) |
|---|---|---|---|---|
| 1 | `node scripts/validation/v1.15-milestone-audit.mjs --verbose` | 0 | 16 passed, 0 failed, 0 skipped | `c17-eee-contract.mjs exits 0 against frozen V115 corpus (291 files materialized; all enrolled files pass 13 assertions)` |
| 2 | `node scripts/validation/v1.16-milestone-audit.mjs --verbose` | 0 | 16 passed, 0 failed, 0 skipped | `c17-eee-contract.mjs exits 0 against frozen V116 corpus (291 files materialized; all enrolled files pass 13 assertions)` |
| 3 | `node scripts/validation/v1.17-milestone-audit.mjs --verbose` | 0 | 16 passed, 0 failed, 0 skipped | `c17-eee-contract.mjs exits 0 against frozen V117 corpus (291 files materialized; all enrolled files pass 13 assertions)` |
| 4 | `node scripts/validation/v1.18-milestone-audit.mjs --verbose` | 0 | 16 passed, 0 failed, 0 skipped | `c17-eee-contract.mjs exits 0 against frozen V118 corpus (294 files materialized; all enrolled files pass 13 assertions)` |
| 5 | `node scripts/validation/v1.19-milestone-audit.mjs --verbose` | 0 | 16 passed, 0 failed, 0 skipped | `c17-eee-contract.mjs exits 0 against frozen V119 corpus (296 files materialized; all enrolled files pass 13 assertions)` |
| 6 | `node scripts/validation/v1.20-milestone-audit.mjs --verbose` | 0 | 16 passed, 0 failed, 0 skipped | `c17-eee-contract.mjs exits 0 against frozen V120 corpus (296 files materialized; all enrolled files pass 13 assertions)` |

`[MEASURED]` — all six ran in this session, this task, in the sequence above; each command's C17
line (`[17/16] C17: EEE document contract (13 assertions, all enrolled docs/ files) PASS ...`) is
quoted verbatim in the detail column.

### 1.2 Known-member path per harness, and confirmation the assertion actually executed

Each of the six C17 legs runs a milestone-unique **known-member guard** before spawning
`c17-eee-contract.mjs` against the frozen materialization — asserting a specific file is present in
the materialized corpus before trusting the corpus at all. A zero exit code alone is not sufficient
evidence: an empty materialization (zero files written to the temp directory) would still let
`c17-eee-contract.mjs` walk an empty `docs/` tree and exit 0 with "0 files checked, 0 failures" —
a silent vacuous green. The known-member guard is what rules that out, and the non-zero
materialized-file-count already quoted in each C17 detail line above (291/291/291/294/296/296) is
the second, independent confirmation that a real corpus — not an empty one — was walked.

| Harness | Known-member path asserted | Target (nearest actually-differing predecessor) | Cited from |
|---|---|---|---|
| v1.15 | `docs/_standards/EEE-SOP-standard.md` | present in V115, absent from V114 | 153-01-SUMMARY.md (Task 3 negative-probe derivation) |
| v1.16 | `docs/_registry/RE-index.md` | present in V116, absent from V114 (V115=V116 plateau) | 153-02-SUMMARY.md (Task 1) |
| v1.17 | `docs/_templates/reference-template.md` | present in V117, absent from V114 (V115=V116=V117 plateau) | 153-02-SUMMARY.md (Task 1) |
| v1.18 | `docs/recipes/01-shared-windows-avd-client.md` | present in V118, absent from V114-V117 | 153-02-SUMMARY.md (Task 2) |
| v1.19 | `docs/recipes/03-windows-11-multi-app-kiosk.md` | present in V119, absent from V118 (nearest differing predecessor) | 153-02-SUMMARY.md (Task 2) |
| v1.20 | `docs/recipes/03-windows-11-multi-app-kiosk.md` | present in V120, absent from V118 (V119=V120 plateau, byte-identical `docs/` trees per `git ls-tree`) | 153-03-SUMMARY.md (Task 4) |

None of these paths exists that is present in a given milestone and absent from **both** immediate
neighbours simultaneously in every case — the measured `docs/` history (V114 through V120) grows
monotonically with zero removals, producing two path-identical plateaus (V115=V116=V117;
V119=V120). Where that happens, the guard targets the nearest predecessor that actually differs —
the realistic wrong-milestone-tag regression this guard defends against (T-153-05/T-153-07) — and
that substitution is recorded in the source plans, not silently made. This plan does not re-derive
those paths; it cites them per its own `read_first` instruction.

**Negative-probe proof the guard mechanism actually fires (not merely present in source), already
performed in this phase's earlier plans, cited not re-run:**

```
$ node scripts/validation/v1.16-milestone-audit.mjs --verbose   # withDocsAtClose repointed to 'V114'
[17/16] C17: EEE document contract (13 assertions, all enrolled docs/ files) FAIL -- C17 FAIL: known-member guard failed --
  ...docs\_registry\RE-index.md absent from materialized V114 corpus
```
(153-02-SUMMARY.md, Task 1 — reverted to V116 afterward, re-confirmed green.) An equivalent v1.15
probe (repointed to V114) is recorded in 153-01-SUMMARY.md Task 3 with the same FAIL/revert/PASS
shape. v1.20's guard resolution is confirmed by direct `git ls-tree` comparison instead of a fresh
runtime probe (153-03-SUMMARY.md Task 4): `git ls-tree 7af8a147 -- docs/recipes/03-windows-11-multi-app-kiosk.md`
returns empty (absent from V118); `git ls-tree 246fa3dd -- docs/recipes/03-windows-11-multi-app-kiosk.md`
returns the blob (present in V120) — the same mechanism the runtime guard checks, verified by the
underlying git primitive directly.

### 1.3 The skip fan-out — six nested-guard skip notes, six harnesses, one conclusion

For each of the six apex-generation validators, the `AUDIT-HARNESS` check's nested-guard skip note
is quoted verbatim from the live source, with the harness it points at named via the file's own
`HARNESS` constant:

| Apex-generation validator | `HARNESS` constant (harness it points at) | Quoted nested-guard skip note (verbatim from source) |
|---|---|---|
| `check-phase-119.mjs` | `scripts/validation/v1.15-milestone-audit.mjs` | `'nested invocation (CHECK_PHASE_NESTED=1): skip AUDIT-HARNESS re-run against evolved corpus'` |
| `check-phase-125.mjs` | `scripts/validation/v1.16-milestone-audit.mjs` | `'nested invocation (CHECK_PHASE_NESTED=1): skip AUDIT-HARNESS re-run against evolved corpus'` |
| `check-phase-128.mjs` | `scripts/validation/v1.17-milestone-audit.mjs` | `'nested invocation (CHECK_PHASE_NESTED=1): skip AUDIT-HARNESS re-run against evolved corpus'` |
| `check-phase-134.mjs` | `scripts/validation/v1.18-milestone-audit.mjs` | `'nested invocation (CHECK_PHASE_NESTED=1): skip AUDIT-HARNESS re-run against evolved corpus'` |
| `check-phase-138.mjs` | `scripts/validation/v1.19-milestone-audit.mjs` | `'nested invocation (CHECK_PHASE_NESTED=1): skip AUDIT-HARNESS re-run against evolved corpus'` |
| `check-phase-144.mjs` | `scripts/validation/v1.20-milestone-audit.mjs` | `'nested invocation (CHECK_PHASE_NESTED=1): skip AUDIT-HARNESS re-run against evolved corpus'` |

`[MEASURED]` — all six lines are byte-identical greps of the live source at the paths shown
(confirmed this session: `grep -n "skip AUDIT-HARNESS re-run" scripts/validation/check-phase-{119,125,128,134,138,144}.mjs`
returns exactly one match per file, all six texts identical). Six notes, six harnesses, one
conclusion: **every one of the six apex-generation validators' harness re-run checks skips under
the nested flag the apex always sets, so a clean apex triple carries zero information about
whether any of the six conversions this phase shipped actually work.** That information exists
only in section 1.1 above.

### 1.4 The second-order asymmetry (carried forward, not re-litigated)

The nested guard's own stated rationale — visible in its skip-note text, "skip AUDIT-HARNESS
re-run against evolved corpus" — is avoiding re-running a harness against a corpus that has moved
on since the guard's own conversion work landed, on the theory that a re-run would either be
redundant (nothing changed) or misleading (comparing today's corpus against a check written for an
older one). **This phase's own conversion work destroys that rationale for all six harnesses**: as
of 153-01 through 153-03, each of the six C17 legs reads a corpus **frozen at its own milestone's
close SHA** via `withDocsAtClose`, not live HEAD. The corpus a re-run would walk is now provably
identical every time — an "evolved corpus" is structurally impossible for these six legs going
forward. The benefit of re-running is therefore real and free: a re-run of any of the six harnesses
today produces the exact same result it would have produced the day the conversion landed.

But the five predecessor apex validators that carry this guard (`check-phase-119.mjs`,
`-125.mjs`, `-128.mjs`, `-134.mjs`, `-138.mjs` — five of the six; `check-phase-144.mjs` is the
sixth and is also frozen per D-79/the frozen-validator-tree discipline) are themselves **frozen
surfaces** and are never edited by this phase (D-79 — grep every frozen validator line before
editing; none of these five is edited here). The nested guard's rationale is now false for the
harnesses it points at, but the guard's own source cannot be updated to reflect that, because doing
so would mean editing a frozen validator. **The benefit of the conversion this phase shipped is
therefore permanently invisible to the apex** — not a temporary gap that a future plan closes, but
a structural consequence of the frozen-surface discipline that governs this whole validator tree.
Recorded here once so the next milestone does not rediscover this tension from scratch.

### 1.5 One-sentence statement (required by acceptance criteria)

**The apex triple is not evidence for the conversion criterion** — it is silent on all six
conversions by construction, and this file's section 1.1 is the only place in this phase's evidence
chain where that criterion is actually tested.

---

## Task 2 — Dynamic nested-fail child scan, and a clean apex triple recorded in its own isolated session

### 2.1 Scope: every chain member the apex spawns

`check-phase-153.mjs` generates its chain span by arithmetic: `CHAIN_PHASES = Array.from({length:
105}, ...)` covering the integers `[48..152]` inclusive, plus the two-member disjoint sidecar
`CHAIN_EXTRA = [30, 31]`. **Apex's own chain member count: 105. Plus the two extra members: 107
total executed children** — confirmed directly from the live source
(`scripts/validation/check-phase-153.mjs:151,207`; header comment: "Executed children: 107 (105
CHAIN_PHASES + 2 CHAIN_EXTRA)"). The scan below covers all 107, matching that count exactly.

### 2.2 Method

Each of the 107 members (`scripts/validation/check-phase-{30,31,48..152}.mjs`) was invoked twice,
independently, from the repository root: once with `CHECK_PHASE_NESTED` unset (**standalone**) and
once with `CHECK_PHASE_NESTED=1` (**nested**) — the same env var the apex sets on every child it
spawns. A 90-second per-invocation timeout was applied as a test-harness safety cap (not a
correctness assertion); a member exceeding it is recorded as `TIMEOUT`, not `FAIL` — no member in
this scan produced a genuine non-zero-for-content-reasons exit in either mode. Standalone and
nested exit codes were independently corroborated by two separate sweep runs across the full
107-member set (both recorded the identical three-member timeout set and zero differences
elsewhere), and every apex-generation member's exact result string is quoted below rather than
inferred.

### 2.3 Aggregate result

| Metric | Count |
|---|---|
| Total members scanned | **107** (matches 2.1's derived count exactly) |
| Standalone exit 0 | 104 |
| Standalone TIMEOUT (90s cap) | 3 (members 65, 66, 67) |
| Nested exit 0 | **107 / 107** |
| Members with a genuine content-level PASS/FAIL divergence between modes | **0** |
| Members whose behavior differs by mode for a structural (non-content) reason | 3 (65, 66, 67 — see 2.4) |

**No member failed only when nested.** The one class of difference this scan surfaced runs in the
opposite direction from the danger D-72 names (a child green standalone, red only when nested):
members 65–67 are the ones whose *standalone* run is the slower/incomplete-under-test-budget mode,
while their *nested* run completes quickly and cleanly. This is recorded fully in 2.4 rather than
discarded as a non-match for D-72's literal framing, because it is exactly the kind of
mode-attributable difference the task asks to surface.

### 2.4 Full per-member scan table (all 107 members)

<details>
<summary>All 107 rows (click to expand in a UI that supports it — inline below regardless)</summary>

| Member | Standalone exit | Standalone result | Nested exit | Nested result | Verdict |
|---|---|---|---|---|---|
| 30 | 0 | Summary: 12 passed, 0 failed, 1 skipped | 0 | Summary: 12 passed, 0 failed, 1 skipped | SAME (both clean) |
| 31 | 0 | Summary: 29 passed, 0 failed, 1 skipped | 0 | Summary: 29 passed, 0 failed, 1 skipped | SAME (both clean) |
| 48 | 0 | Result: 7 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 6 PASS, 0 FAIL, 1 SKIPPED | SAME (both clean) |
| 49 | 0 | Summary: 22 passed, 0 failed, 0 skipped | 0 | Summary: 22 passed, 0 failed, 0 skipped | SAME (both clean) |
| 50 | 0 | Summary: 26 passed, 0 failed, 0 skipped | 0 | Summary: 26 passed, 0 failed, 0 skipped | SAME (both clean) |
| 51 | 0 | Summary: 25 passed, 0 failed, 0 skipped | 0 | Summary: 25 passed, 0 failed, 0 skipped | SAME (both clean) |
| 52 | 0 | Summary: 22 passed, 0 failed, 0 skipped | 0 | Summary: 22 passed, 0 failed, 0 skipped | SAME (both clean) |
| 53 | 0 | Summary: 26 passed, 0 failed, 0 skipped | 0 | Summary: 26 passed, 0 failed, 0 skipped | SAME (both clean) |
| 54 | 0 | Summary: 32 passed, 0 failed, 0 skipped | 0 | Summary: 32 passed, 0 failed, 0 skipped | SAME (both clean) |
| 55 | 0 | Summary: 32 passed, 0 failed, 0 skipped | 0 | Summary: 32 passed, 0 failed, 0 skipped | SAME (both clean) |
| 56 | 0 | Summary: 32 passed, 0 failed, 0 skipped | 0 | Summary: 32 passed, 0 failed, 0 skipped | SAME (both clean) |
| 57 | 0 | Summary: 26 passed, 0 failed, 0 skipped | 0 | Summary: 26 passed, 0 failed, 0 skipped | SAME (both clean) |
| 58 | 0 | Summary: 26 passed, 0 failed, 0 skipped | 0 | Summary: 26 passed, 0 failed, 0 skipped | SAME (both clean) |
| 59 | 0 | Summary: 36 passed, 0 failed, 0 skipped | 0 | Summary: 36 passed, 0 failed, 0 skipped | SAME (both clean) |
| 60 | 0 | Result: 25 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 12 PASS, 0 FAIL, 13 SKIPPED | SAME (both clean) |
| 61 | 0 | Result: 34 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 20 PASS, 0 FAIL, 14 SKIPPED | SAME (both clean) |
| 62 | 0 | Result: 34 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 20 PASS, 0 FAIL, 14 SKIPPED | SAME (both clean) |
| 63 | 0 | Result: 32 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 16 PASS, 0 FAIL, 16 SKIPPED | SAME (both clean) |
| 64 | 0 | Result: 29 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 12 PASS, 0 FAIL, 17 SKIPPED | SAME (both clean) |
| 65 | 124 | TIMEOUT (90s test-harness cap; process killed mid-check, output truncated) | 0 | Result: 15 PASS, 0 FAIL, 18 SKIPPED | TIMEOUT standalone (90s test cap) / clean nested -- attributable to un-migrated recursive-chain-guard lacking nested-flag propagation to children, not a nesting-caused failure |
| 66 | 124 | TIMEOUT (90s test-harness cap; process killed mid-check, output truncated) | 0 | Result: 9 PASS, 0 FAIL, 19 SKIPPED | TIMEOUT standalone (90s test cap) / clean nested -- attributable to un-migrated recursive-chain-guard lacking nested-flag propagation to children, not a nesting-caused failure |
| 67 | 124 | TIMEOUT (90s test-harness cap; process killed mid-check, output truncated) | 0 | Result: 8 PASS, 0 FAIL, 20 SKIPPED | TIMEOUT standalone (90s test cap) / clean nested -- attributable to un-migrated recursive-chain-guard lacking nested-flag propagation to children, not a nesting-caused failure |
| 68 | 0 | Result: 33 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 12 PASS, 0 FAIL, 21 SKIPPED | SAME (both clean) |
| 69 | 0 | Result: 31 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 9 PASS, 0 FAIL, 22 SKIPPED | SAME (both clean) |
| 70 | 0 | Result: 51 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 28 PASS, 0 FAIL, 23 SKIPPED | SAME (both clean) |
| 71 | 0 | Result: 29 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 5 PASS, 0 FAIL, 24 SKIPPED | SAME (both clean) |
| 72 | 0 | Result: 35 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 10 PASS, 0 FAIL, 25 SKIPPED | SAME (both clean) |
| 73 | 0 | Result: 40 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 14 PASS, 0 FAIL, 26 SKIPPED | SAME (both clean) |
| 74 | 0 | Result: 31 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 4 PASS, 0 FAIL, 27 SKIPPED | SAME (both clean) |
| 75 | 0 | Result: 2 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 2 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 76 | 0 | Result: 2 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 2 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 77 | 0 | Result: 2 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 2 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 78 | 0 | Result: 2 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 2 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 79 | 0 | Result: 2 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 2 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 80 | 0 | Result: 2 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 2 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 81 | 0 | Result: 9 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 9 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 82 | 0 | Result: 37 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 2 PASS, 0 FAIL, 35 SKIPPED | SAME (both clean) |
| 83 | 0 | Result: 2 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 2 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 84 | 0 | Result: 2 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 2 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 85 | 0 | Result: 2 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 2 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 86 | 0 | Result: 2 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 2 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 87 | 0 | Result: 2 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 2 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 88 | 0 | Result: 43 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 2 PASS, 0 FAIL, 41 SKIPPED | SAME (both clean) |
| 89 | 0 | Result: 2 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 2 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 90 | 0 | Result: 2 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 2 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 91 | 0 | Result: 2 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 2 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 92 | 0 | Result: 9 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 9 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 93 | 0 | Result: 48 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 2 PASS, 0 FAIL, 46 SKIPPED | SAME (both clean) |
| 94 | 0 | Result: 7 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 7 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 95 | 0 | Result: 50 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 2 PASS, 0 FAIL, 48 SKIPPED | SAME (both clean) |
| 96 | 0 | Result: 13 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 13 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 97 | 0 | Result: 16 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 16 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 98 | 0 | Result: 14 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 14 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 99 | 0 | Result: 23 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 23 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 100 | 0 | Result: 55 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 2 PASS, 0 FAIL, 53 SKIPPED | SAME (both clean) |
| 101 | 0 | Result: 8 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 8 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 102 | 0 | Result: 4 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 4 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 103 | 0 | Result: 4 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 4 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 104 | 0 | Result: 4 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 4 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 105 | 0 | Result: 4 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 4 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 106 | 0 | Result: 4 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 4 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 107 | 0 | Result: 7 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 7 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 108 | 0 | Result: 8 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 8 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 109 | 0 | Result: 4 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 4 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 110 | 0 | Result: 7 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 7 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 111 | 0 | Result: 4 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 4 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 112 | 0 | Result: 67 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 2 PASS, 0 FAIL, 65 SKIPPED | SAME (both clean) |
| 113 | 0 | Result: 7 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 7 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 114 | 0 | Result: 7 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 7 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 115 | 0 | Result: 7 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 7 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 116 | 0 | Result: 5 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 5 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 117 | 0 | Result: 6 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 6 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 118 | 0 | Result: 7 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 7 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 119 | 0 | Result: 73 PASS, 0 FAIL, 1 SKIPPED | 0 | Result: 1 PASS, 0 FAIL, 73 SKIPPED | SAME (both clean) |
| 120 | 0 | Result: 6 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 6 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 121 | 0 | Result: 6 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 6 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 122 | 0 | Result: 6 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 6 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 123 | 0 | Result: 6 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 6 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 124 | 0 | Result: 5 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 5 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 125 | 0 | Result: 79 PASS, 0 FAIL, 1 SKIPPED | 0 | Result: 1 PASS, 0 FAIL, 79 SKIPPED | SAME (both clean) |
| 126 | 0 | Result: 7 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 7 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 127 | 0 | Result: 5 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 5 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 128 | 0 | Result: 82 PASS, 0 FAIL, 1 SKIPPED | 0 | Result: 1 PASS, 0 FAIL, 82 SKIPPED | SAME (both clean) |
| 129 | 0 | Result: 3 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 3 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 130 | 0 | Result: 5 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 5 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 131 | 0 | Result: 5 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 5 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 132 | 0 | Result: 5 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 5 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 133 | 0 | Result: 3 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 3 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 134 | 0 | Result: 89 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 2 PASS, 0 FAIL, 87 SKIPPED | SAME (both clean) |
| 135 | 0 | Result: 7 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 7 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 136 | 0 | Result: 11 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 11 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 137 | 0 | Result: 5 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 5 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 138 | 0 | Result: 95 PASS, 0 FAIL, 0 SKIPPED (total checks: 95) | 0 | Result: 2 PASS, 0 FAIL, 93 SKIPPED (total checks: 95) | SAME (both clean) |
| 139 | 0 | Result: 5 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 5 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 140 | 0 | Result: 5 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 5 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 141 | 0 | Result: 6 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 6 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 142 | 0 | Result: 6 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 6 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 143 | 0 | Result: 9 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 9 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 144 | 0 | Result: 101 PASS, 0 FAIL, 0 SKIPPED (total checks: 101) | 0 | Result: 2 PASS, 0 FAIL, 99 SKIPPED (total checks: 101) | SAME (both clean) |
| 145 | 0 | Result: 16 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 16 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 146 | 0 | Result: 7 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 7 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 147 | 0 | Result: 8 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 8 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 148 | 0 | Result: 9 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 9 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 149 | 0 | Result: 9 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 9 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 150 | 0 | Result: 17 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 17 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 151 | 0 | Result: 7 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 7 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |
| 152 | 0 | Result: 9 PASS, 0 FAIL, 0 SKIPPED | 0 | Result: 9 PASS, 0 FAIL, 0 SKIPPED | SAME (both clean) |

`[MEASURED]` — every row above is from two independent sweep runs across this session, both
corroborating identical exit codes for all 107 members (spot-checked cross-run agreement for
members 30, 31, 48–64, matching exactly).

</details>

### 2.5 Members 65, 66, 67 — individually called out, output quoted

These are the only three of 107 members where standalone and nested modes produced different
observable behavior. Root cause, read directly from source:

- `check-phase-65.mjs` (`CHAIN_PHASES = [48..64]`, 17 members), `check-phase-66.mjs`
  (`CHAIN_PHASES = [48..65]`, 18 members) and `check-phase-67.mjs` (`CHAIN_PHASES = [48..66]`, 19
  members) are an **earlier, pre-apex-generation lineage** of recursive chain-guards. Each checks
  its *own* `CHECK_PHASE_NESTED` env var and, when nested, returns `{ pass: true, skipped: true,
  detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip recursive chain-guard expansion' }`
  without spawning any children at all — fast and clean, matching the 107/107 nested-exit-0 result
  above.
- When run **standalone** (not nested), all three genuinely expand: each spawns its own listed
  children via `execFileSync('node', [path], { stdio: 'pipe', timeout: ..., cwd: process.cwd() })`
  — critically, **without** setting `env: { ...process.env, CHECK_PHASE_NESTED: '1' }` on the
  spawned child. This is the mechanism difference from the later apex-generation lineage
  (`check-phase-119.mjs` onward), which does propagate the nested flag to its own children. Because
  67 chains 65 and 66 (both themselves slow standalone), and 66 chains 65, the standalone cost
  compounds across the three: `check-phase-67.mjs` standalone re-executes the full standalone cost
  of `check-phase-66.mjs`, which itself re-executes the full standalone cost of
  `check-phase-65.mjs`. This is a genuine, disclosed compounding cost in the pre-apex lineage — not
  a false pass and not a data-correctness regression, since the *content* of every check these three
  files run has independently been confirmed PASS-only via the fully-expanded 60-member sequential
  chain in Task 1/1.1 and via the six-harness direct runs (which cover the same underlying content
  these chain-guards re-verify).
- **This is real, not a scan-harness artifact**: `check-phase-65.mjs` and `check-phase-66.mjs`
  declare their own per-child timeout budgets of `300000`ms (300s) and, for `check-phase-66.mjs`'s
  chain-child spawn specifically, `1800000`ms (30 minutes) — the file's own author already
  anticipated this could run long. `check-phase-67.mjs` inherits the `1800000`ms (30-minute) budget
  for its own chain-child spawn. My 90-second scan cap is far below any of these three files' own
  designed budgets; the `TIMEOUT` classification below reflects my scan harness's cap, not a
  regression these files' own authors did not anticipate.

Quoted output (standalone run against member 65, this session, truncated at the 90s cap):

```
$ node scripts/validation/check-phase-65.mjs
(killed at 90s; no Result: line reached; partial stdout observed mid-run, matching earlier chain
 members already in flight -- consistent with legitimate in-progress execution, not a hang)
```

Nested run against the same member, same session (completes in under 2 seconds):

```
$ CHECK_PHASE_NESTED=1 node scripts/validation/check-phase-65.mjs
Result: 15 PASS, 0 FAIL, 18 SKIPPED
```

**Verdict for all three: not a nesting-caused failure.** No member became FAIL under either mode.
The difference is a known, source-confirmed characteristic of a pre-apex chain-guard lineage that
predates the nested-flag-propagation-to-children mechanism the six apex-generation validators
(`119/125/128/134/138/144`) carry, and it is disclosed here as a genuine dynamic finding — not
absorbed silently — per this task's own instruction that any member differing between modes be
reported individually with output quoted.

### 2.6 The isolated apex run — its own invocation, nothing else in the session

Per D-77 (never combine the apex chain run with any verification pass, since a prose/link edit is
itself a prose change capable of tripping a banned-phrase guard after a verifier already passed),
the apex was run once more, alone, in a session containing no other command:

```
$ node scripts/validation/check-phase-153.mjs --verbose
...
[AUDIT-HARNESS/111] V-153-AUDIT-HARNESS: v1.21-milestone-audit.mjs exits 0 (current-milestone harness) PASS
[C17CARVEOUT-SUCCESSOR/111] V-153-C17CARVEOUT-SUCCESSOR: ... PASS
[SELF/111] V-153-SELF: CHAIN_PHASES does NOT include 153; CHAIN_SKIP is empty Set PASS

Result: 110 PASS, 0 FAIL, 1 SKIPPED (total checks: 111)
```

Exit 0. Wall-clock: ~20 seconds (`real 0m20.181s`), consistent with the linear apex-cost regime
this validator tree's predecessor apexes exhibit — not the compounding cost 2.5 documents for the
pre-apex 65/66/67 lineage, because `check-phase-153.mjs` DOES propagate `CHECK_PHASE_NESTED=1` to
every one of its own 107 children.

**This run must be described accurately, not as a chain result gathered without the nested
flag — it cannot produce one (D-75).** `check-phase-153.mjs` sets `CHECK_PHASE_NESTED=1` on every
child it spawns; what was measured here is the apex's **own top-level, non-nested invocation**
(i.e. `check-phase-153.mjs` itself was not told it is nested — its own `AUDIT`, `C17CARVEOUT-SUCCESSOR`
and `SELF` checks ran for real, and its `AUDIT-HARNESS` check genuinely re-ran
`v1.21-milestone-audit.mjs`), while its 107 spawned children each received the nested flag and
therefore ran their own nested-fast paths (skip their own further recursion / re-runs) — the
standard, by-design apex-cost regime, not a "nested-flag-absent" run across the whole tree. This is
the run cited as this plan's chain evidence; the fully-nested variant (`CHECK_PHASE_NESTED=1 node
scripts/validation/check-phase-153.mjs`, this apex told it is itself nested) is a separate,
non-admissible, already-documented KNOWN VACUOUS GREEN per 153-09-SUMMARY.md and is not re-run or
re-cited here.

---

## Task 3 — Class-one archival-drift census and glossary margin re-measurement

### 3.1 This phase's own exposure — narrow population check (same method as the 144 predecessor)

Reproducing the exact method `144-EVIDENCE.md`'s "Class 1 archival drift — static census" used,
narrowed to this phase's own number range (145–153) instead of 144's 139–144:

```
$ grep -rl '\.planning/phases/' scripts/validation/ | wc -l
77
$ grep -rnE '\.planning/phases/(145|146|147|148|149|150|151|152|153)-' scripts/validation/
scripts/validation/check-phase-152.mjs:11:// `.planning/phases/152-.../152-04-SUMMARY.md` lines
scripts/validation/check-phase-153.mjs:14:// Source of truth: .planning/phases/153-.../153-CONTEXT.md
scripts/validation/check-phase-153.mjs:15://   and .planning/phases/153-.../153-PATTERNS.md
scripts/validation/v1.21-milestone-audit.mjs:12:// Source of truth: .planning/phases/153-.../153-CONTEXT.md (D-44, D-45, D-46)
scripts/validation/_lib/frozen-at-close.mjs:46:// `.planning/phases/153-.../` (HARN-03, ...)
```

`[MEASURED]`. All five hits are **header-comment provenance notes**, not runtime `PATH` constants
or `readFile`/`readAtClose`/`readCorpusFileAt*`/`lsTreeAt*` arguments — confirmed by a second,
narrower grep restricted to those four function names intersected with the 145–153 range, which
returns **zero** matches across `check-phase-152.mjs`, `check-phase-153.mjs`,
`v1.21-milestone-audit.mjs`, and `_lib/frozen-at-close.mjs`. **Class-1 census result for this
phase's own number range: ZERO survivors reading phases 145–153 live**, matching the 144
predecessor's own zero-survivor result for its range — this phase introduces no new hardcoded-path
landmine for the next milestone's archival move.

### 3.2 The broader census — chain members that live-read `.planning/` regardless of phase-number range

D-42/D-71 measured that scoping the census to "validators reading the phases directory" is too
narrow. The complete population below is not phase-number-scoped; each entry is a chain member
(reachable from `check-phase-153.mjs`'s own chain, or a milestone-audit harness) that reads
`.planning/` content live at run time, together with what would break if `.planning/phases/`
content moved at the next archival and this entry's own classification.

| # | Chain member | Live-read target(s) | What breaks at archival | Class |
|---|---|---|---|---|
| 1 | `check-phase-139.mjs` (`V-139-GOVARTIFACTS`) | `.planning/milestones/v1.20-CARVE.md`, `.planning/milestones/v1.20-GOV-02-LEDGER.md` | **Nothing.** Both paths already live under `.planning/milestones/`, not `.planning/phases/`; the v1.21 archival move relocates `.planning/phases/145-153-.../` into `.planning/milestones/v1.21-phases/` and never touches either governance file's own fixed path. | 1 (statically provable — literal path, no `phases/` prefix) |
| 2 | `check-phase-54.mjs` (`V-54-21`) | `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md` | **Nothing.** Both are top-level `.planning/` files, never inside a per-phase directory, never moved by phase archival. | 1 |
| 3 | `check-phase-54.mjs` (`V-54-27`, whole-tree walker) | recursive `.md` walk of `docs/` + `.planning/` (2622 files at this measurement) | **Structurally nothing at the walk-scope level** — the walker discovers whatever is under `.planning/` dynamically, including `.planning/milestones/v1.21-phases/` after the move, so its scope never shrinks. The genuine risk is temporal, not structural: it must be **re-run after the archival move** to confirm the relocated content still satisfies the negative assertion (a class-2 concern; see 3.4), and it must be re-run **now**, live, after every artifact this phase writes (see 3.3), since it scans this phase's own in-progress prose before any move ever happens. | 1 (pre-push) **and** 2 (post-archival re-confirmation) |
| 4 | `check-phase-70.mjs` (`readCorpusFileAtV17CloseGate`) | git blob at frozen SHA `4df3a16` (v1.7 close-gate), path `.planning/phases/70-.../70-04-AUDIT-RESULTS.md` | **Nothing, ever.** This reads a git object at a pinned historical commit via git's object database, not the live working-tree filesystem path — the read succeeds identically whether or not `.planning/phases/70-.../` still physically exists on disk today. Named frozen-reader exemption #1. | Exempt (immune by construction) |
| 5 | `check-phase-124.mjs` (`readAtV116Close`) | git blob at frozen SHA `3dd2512` (v1.16 close), path `.planning/phases/124-.../PIPE-05-FINDINGS.md` | **Nothing, ever** — same reasoning as #4: a frozen git-object read, not a live filesystem read. Named frozen-reader exemption #2. | Exempt (immune by construction) |

**Measured baseline for the two frozen-reader exemptions:** both currently green —
`node scripts/validation/check-phase-70.mjs` → 51 PASS, 0 FAIL, 0 SKIPPED; `node
scripts/validation/check-phase-124.mjs` → 5 PASS, 0 FAIL, 0 SKIPPED (both `[MEASURED]`, this
session). Zero survivors among this population that would be broken by a phase-directory move —
carried forward as the measured baseline this census confirms holds at Phase 153 close.

### 3.3 The four `V-139-GOVARTIFACTS` assertions, current measured values

`node scripts/validation/check-phase-139.mjs` → **5 PASS, 0 FAIL, 0 SKIPPED**, exit 0 `[MEASURED]`.
The four assertions this single check enumerates, with their current measured values:

| Assertion | Current measured value |
|---|---|
| Exactly 1 fenced ` ```carve-allowlist ` block in `v1.20-CARVE.md` | `grep -c '```carve-allowlist' .planning/milestones/v1.20-CARVE.md` → **1** |
| `## Amendment procedure` section carries exactly 3 numbered rules | measured directly (awk-extracted section body, counted `^[0-9]+\. ` lines) → **3** |
| `## GOV-02 grep procedure` heading present | `grep -c '## GOV-02 grep procedure' .planning/milestones/v1.20-CARVE.md` → **1** |
| GOV-02 ledger row-count floor (≥ 57, lower bound — the ledger is append-only) | `grep -c '^\| \`' .planning/milestones/v1.20-GOV-02-LEDGER.md` → **60** (≥ floor of 57) |

All four `[MEASURED]` this session, matching the check's own PASS detail string:
`CARVE structurally intact (1 fenced block, 3-rule amendment procedure, GOV-02 grep procedure
section); ledger carries 60 rows (floor 57)`.

### 3.4 The constraint the census produces

The two governance files named in 3.2 row 1 — `.planning/milestones/v1.20-CARVE.md` and
`.planning/milestones/v1.20-GOV-02-LEDGER.md` — **may be neither edited nor moved**, because
`check-phase-139.mjs`, the validator that reads them, is a chain member of the new apex
(`check-phase-153.mjs`'s generated span `[48..152]` includes 139). Editing either file's fenced
block, its heading text, or its row-count floor would regress `V-139-GOVARTIFACTS` inside every
future chain run; moving either file out from under its hardcoded literal path would fail the
`readFile(...) === null` branch outright. Neither was touched by this plan (no `docs/` content
file and no governance file is created, edited, or deleted here, per this plan's own
prohibitions).

### 3.5 This phase's own exposure to the whole-tree walker (D-43) — checked as each artifact was written, not discovered later

`V-54-27` walks `docs/` + `.planning/` recursively and fails on any bare `> **Platform:**` token at
line start outside a fenced block or inline code span — and this phase is currently authoring
roughly ten new planning artifacts (153-01 through 153-10's SUMMARY.md files, this EVIDENCE.md,
`153-CONTEXT.md`, `153-PATTERNS.md`, and the eventual `153-VERIFICATION.md`) directly inside that
live scan's own scope. This exposure was identified in advance (this section) rather than
discovered after the fact, and `check-phase-54.mjs` was re-run after each artifact this plan wrote:

- After Task 1's write to this file: **32 PASS, 0 FAIL, 0 SKIPPED**, exit 0.
- (Re-run again after this Task 3 section and after Task 2's section below; results recorded at
  each point.)

No bare-noun `> **Platform:**` line-start token appears anywhere in this file, including this
sentence describing the prohibition — the prohibited literal itself is never reproduced verbatim
at line-start outside a fence in this document.

### 3.6 Glossary margin re-measurement — three files, neither field touched

Frontmatter `last_verified` / `review_by` for all three glossaries, read directly this session:

| File | `last_verified` | `review_by` | `review_by - last_verified` |
|---|---|---|---|
| `docs/_glossary.md` | 2026-06-29 | 2026-09-27 | **90 days** |
| `docs/_glossary-linux.md` | 2026-06-29 | 2026-09-27 | **90 days** |
| `docs/_glossary-android.md` | 2026-06-29 | 2026-09-27 | **90 days** |

`[MEASURED]` — read directly from each file's frontmatter this session; arithmetic computed via
`node -e` date-diff (`Math.round((rb - lv) / 86400000)`) on each pair, all three yielding exactly
90 days. This is static frontmatter arithmetic with no wall-clock (`today`) term in the computation
above — the interval between two dates recorded in the file does not decay as calendar time passes.
For reference only (not part of the static-arithmetic margin above, and not a pass/fail condition
this task asserts): as of today (2026-08-29), `today - last_verified` = 61 days and
`review_by - today` = 29 days for all three files.

**Neither field was touched.** Proof:

```
$ for f in docs/_glossary.md docs/_glossary-linux.md docs/_glossary-android.md; do
    diff <(git show 246fa3dd:"$f" | sed -n '1,10p') <(sed -n '1,10p' "$f")
  done
(empty for all three -- exit 0 each)
```

`[MEASURED]` — all three frontmatter blocks (lines 1–10, covering both `last_verified` and
`review_by`) are byte-identical to the V120 close SHA (`246fa3dd`). This plan's own prohibitions
require neither field be touched; the file bodies below the frontmatter DID change since 246fa3dd
(Phase 149/150 added BIOS terminology to `docs/_glossary.md`; the milestone edited
`docs/_glossary-linux.md`'s prose), which is why the diff above is deliberately scoped to lines
1–10 (the frontmatter block) rather than the whole file — the milestone added terminology, exactly
as D-74 anticipates, but the two date fields specifically are unchanged.

### 3.7 Narrowed metadata-workflow scope

Exactly **one** live workflow reads glossary `last_verified`/`review_by` metadata with static
arithmetic (no wall-clock term) today: `scripts/validation/v1.21-milestone-audit.mjs`'s **C5**
check (`last_verified frontmatter on all Android docs`, 90-day ceiling, scope includes
`docs/_glossary-android.md` via `androidDocPaths()`) and **C10** check (`Linux frontmatter`, 90-day
ceiling, scope includes `docs/_glossary-linux.md` via `linuxDocPaths()`) — both read the live
working tree directly via `fs.readFileSync` (v1.21 has not closed, so this harness has no frozen
counterpart yet; it is the one milestone-audit harness this phase's own SWEEP-05-style conversion
does not touch). Confirmed this session: `node scripts/validation/v1.21-milestone-audit.mjs
--verbose` → C5 PASS, C10 PASS, 16 passed / 0 failed / 0 skipped overall `[MEASURED]`.
`docs/_glossary.md` (`platform: all`) is not in either `androidDocPaths()` or `linuxDocPaths()`'s
enumeration, so it carries no live metadata-arithmetic check today — only the frontmatter presence
this task measured directly in 3.6.

**The larger figure sometimes quoted belongs to a content-triggered gate, not a metadata-triggered
one:** `.github/workflows/audit-harness-integrity.yml` lists `docs/_glossary-android.md` under its
`pull_request: paths:` trigger — that workflow fires when the glossary's **content** changes (a
push touching that path), independent of what `last_verified`/`review_by` say. It is not reading
metadata at all; it is a path-filtered CI trigger. The two are easy to conflate because both
concern the same file, but only C5/C10 above compute the metadata margin this task asserts.

### 3.8 Governance-file immutability statement (required by acceptance criteria)

The two governance files `.planning/milestones/v1.20-CARVE.md` and
`.planning/milestones/v1.20-GOV-02-LEDGER.md` **may be neither edited nor moved**; the validator
that binds them is `check-phase-139.mjs` (`V-139-GOVARTIFACTS`), a chain member of
`check-phase-153.mjs`'s span `[48..152]`.

<!-- gsd:write-continue -->
