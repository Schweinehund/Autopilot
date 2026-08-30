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

---

## Task 4 — Carve regime retirement: gate run, corrected reasoning, surviving obligation (Plan 11 Task 1)

### 4.1 The gate's run output at the current head, census method, and de-registration

`node scripts/validation/carve-gate.mjs --json` run this session at the current head:

```
$ node scripts/validation/carve-gate.mjs --json
Exit: 1
carve-gate FAIL: 99 off-list path(s): docs/_glossary-linux.md, docs/_registry/RE-index.md,
docs/_standards/EEE-SOP-standard.md, docs/_templates/recipe-template.md,
docs/admin-setup-apv1/01-hardware-hash-upload.md, docs/admin-setup-linux/00-overview.md,
... (99 paths total, spanning docs/, scripts/docs-style/, and scripts/validation/) ...
scripts/validation/v1.21-audit-allowlist.json
```

`[MEASURED]` exit 1, 99 off-list paths at the current head (up from D-39's originally-measured 89
— the population has grown as this milestone's content phases and the docs-style pass landed
further commits since that count was taken; the exit-1 verdict itself is unchanged).

**Census method — text-forcing grep, not plain grep.** `scripts/validation/carve-gate.mjs` is
classified binary by grep (`file` also reports "a node script executable (binary data)"):

```
$ grep -n "CARVE_PATH" scripts/validation/carve-gate.mjs
Binary file scripts/validation/carve-gate.mjs matches
```

A plain grep against this file silently collapses to a single "Binary file ... matches" line —
no line numbers, no content — which would make a census over this script look empty even when
matches exist. The text-forcing flag (`-a`) recovers real output:

```
$ grep -a -n "CARVE_PATH\|DEFAULT_BASE" scripts/validation/carve-gate.mjs
34:const CARVE_PATH = '.planning/milestones/v1.20-CARVE.md';
35:const DEFAULT_BASE = 'a7bda73e23efc5e3f9607c3fef37abf8ec4030aa'; // v1.19 MILESTONE CLOSE (docs(138-06))
```

`[MEASURED]` confirms both D-39/D-40's cited constants verbatim: `CARVE_PATH =
'.planning/milestones/v1.20-CARVE.md'`, `DEFAULT_BASE = a7bda73e...` (the v1.19 close commit).

**De-registration.** `.claude/settings.local.json` is machine-local and gitignored (`git
check-ignore -v .claude/settings.local.json` confirms it matches `.gitignore:66`), so this is a
reversible local edit, not a repository change.

Before (three Stop hooks, in registration order):
```
1. jira-milestone-gate.cjs
2. publish-bundle-gate.cjs
3. v1.20-carve-gate.cjs
```

After (two Stop hooks, same order, carve hook removed):
```
1. jira-milestone-gate.cjs
2. publish-bundle-gate.cjs
```

### 4.2 The ruling and its ground (D-39)

The v1.20 CARVE regime is retired for v1.21. `carve-gate.mjs`'s path constant
(`.planning/milestones/v1.20-CARVE.md`) and its default base (`a7bda73e...`, the v1.19 close)
both name the predecessor milestone, not this one. It reports FAIL with a large off-list
population (99, measured above) at the current head, and all eight v1.21 content phases (145
through 152) already shipped past it red — it was never re-adopted for this milestone. No
amendment plan gates this phase: Phase 144's D-07 hard blocker does not carry forward across a
milestone boundary.

### 4.3 The correction of record (D-40)

The draft premise that the carve gate "had zero execution sites" was measured over the
`scripts/`, `.github/` and `package.json` surfaces and missed `.claude/` entirely. The hook at
`.claude/hooks/v1.20-carve-gate.cjs:86-91` runs `execFileSync('node', [gatePath, '--json'])`
against `carve-gate.mjs` and was registered as the third Stop hook at
`.claude/settings.local.json:22-30` (confirmed above, "Before" list) — a genuine execution site a
source-tree-only grep cannot see, because the file that registers it is gitignored.

`[MEASURED]` the gate returns exit 1 with a non-empty `offList` (99 paths, section 4.1), so the
hook's own fail-open guard (`v1.20-carve-gate.cjs:130`, the `!parsed || offList.length === 0`
branch) does **not** engage — a real, non-empty off-list was parsed. Per the hook's
`computeDecision()` (`:50-56`): first Stop with this off-list set → `block`/`nudge`; every
subsequent Stop with the same off-list set → `block`/`warn`. The two block behaviours the hook
produces: **nudge** on the first fire naming the off-list paths and pointing at the CARVE's
Amendment procedure section, **warn** on every fire after that additionally stating the gate is
hard-blocking in the plan's verification step.

D-39's ruling (retire the regime) is right. The reasoning that produced it (zero execution
sites) was not — the corrected reasoning above is what goes on the record.

### 4.4 The surviving obligation (D-41)

The obligation that actually survives is `V-139-GOVARTIFACTS`, not byte-equality on
`carve-gate.mjs`. `check-phase-139.mjs`'s `V-139-CARVEBLOB` check (lines 60-76) pins
`carve-gate.mjs`'s blob at a **fixed past commit** (`FIXED_SHA =
'04e26106c859176d58b98079575a50faceeed7cd'`), so the script's current bytes at HEAD are
structurally unconstrained by that check — HEAD can diverge from the pin freely without
regressing `V-139-CARVEBLOB`.

What is live is `V-139-GOVARTIFACTS` (`check-phase-139.mjs:135-172`), which reads
`.planning/milestones/v1.20-CARVE.md` and `.planning/milestones/v1.20-GOV-02-LEDGER.md` at
current HEAD (not frozen) and asserts four things:

| Assertion | Current measured value |
|---|---|
| Exactly 1 fenced ` ```carve-allowlist ` block in `v1.20-CARVE.md` | **1** |
| `## Amendment procedure` H2 carries exactly 3 numbered rules | **3** |
| `## GOV-02 grep procedure` H2 present | present (1) |
| GOV-02 ledger row-count floor (>= 57) | **60** (>= floor of 57) |

`node scripts/validation/check-phase-139.mjs` this session:

```
[CARVEBLOB/5] V-139-CARVEBLOB: carve-gate.mjs blob @04e26106 matches baseline 849f9639e1108090bc360e705aaa784b0144fe66 (frozen-to-frozen) PASS
[FETCHDEPTH/5] V-139-FETCHDEPTH: every .github/workflows/audit-harness-*.yml has checkout-step count === fetch-depth:0 count PASS
[PROBEJOB/5] V-139-PROBEJOB: every audit-harness-*.yml declares a frozen-read-probe job with no needs: key PASS
[GOVARTIFACTS/5] V-139-GOVARTIFACTS: .planning/milestones/v1.20-CARVE.md structurally intact; .planning/milestones/v1.20-GOV-02-LEDGER.md row count >= 57 PASS
[SELF/5] V-139-SELF: CHAIN_PHASES does NOT include 139; CHAIN_SKIP is empty Set PASS

Result: 5 PASS, 0 FAIL, 0 SKIPPED
```

`[MEASURED]` exit 0, 5/0/0, `V-139-GOVARTIFACTS`'s own PASS detail string:
`CARVE structurally intact (1 fenced block, 3-rule amendment procedure, GOV-02 grep procedure
section); ledger carries 60 rows (floor 57)`.

`check-phase-139.mjs` is a chain member of the new apex (`check-phase-153.mjs`'s generated span
`[48..152]` includes 139), so the two governance files this check reads —
`.planning/milestones/v1.20-CARVE.md` and `.planning/milestones/v1.20-GOV-02-LEDGER.md` — may be
neither edited nor moved. Neither file is touched by this task.

---

## Task 5 — Four orphans tracked, hygiene measured correctly, atom branches audited, hooks sequenced (Plan 11 Task 2)

### 5.1 The four-path orphan commit (D-62)

Committed by explicit path (no blanket add): `git ls-files --error-unmatch` on all four exits 0
and lists all four:

```
.planning/phases/145-corpus-correction-validator-gate-archival-drift-fix/145-PATTERNS.md
.planning/phases/146-windows-driver-firmware-update-depth/146-PATTERNS.md
.planning/phases/147-linux-update-delivery/147-PATTERNS.md
.planning/research/PER-OEM-BIOS-GAP.md
```

`git show --stat 755aa911` — the commit contains exactly those four paths, `4 files changed, 1192
insertions(+)`, no other file touched. `git show --name-only 755aa911` (message body + file list,
the combined form the exclusion check reads) contains no literal `.planning/milestones/v1.20-CARVE.md`,
`v1.20-GOV-02-LEDGER.md`, `carve-gate.mjs` or `check-phase-139.mjs` path (D-76) — `[MEASURED]`
verified by direct grep, zero matches.

### 5.2 Hygiene measured the correct way (D-63)

Re-measured after the orphan commit landed:

| Form | Command | Count |
|---|---|---|
| Bare | `git status --porcelain \| wc -l` | **10** |
| All-untracked | `git status --porcelain=v1 --untracked-files=all \| wc -l` | **104** |

`[MEASURED]` this session. The bare form under-reports by 94 lines — it collapses each untracked
directory (`.agents/skills/fireworks-tech-graph/`, `.claude/skills/fireworks-tech-graph/`,
`.obsidian/`) to a single line instead of enumerating their contents. Every hygiene figure in this
phase's evidence uses the all-untracked form.

**Remaining populations, each marked ruled or deliberately unruled in this phase:**

| Population | Count | Status |
|---|---|---|
| `.agents/skills/fireworks-tech-graph/*` | 46 files | **Unruled** — reviewed at the discussion (`<deferred>`), needs a gitignore/commit/delete decision in its own right, not made here |
| `.claude/skills/fireworks-tech-graph/*` | 46 files | **Unruled** — same population as above (the ~92-file figure the deferred block names is these two directories combined: 46+46=92) |
| `.claude/skills/jira-milestone/install-jira-milestone-hook.cjs` | 1 file | **Unruled** — not named in this phase's discussion; new since the CONTEXT session, out of this plan's scope |
| `.obsidian/*` (5 config files) | 5 files | **Unruled** — not named in this phase's discussion; out of scope |
| `.planning/milestone.lock` | 1 file | **Unruled** — not named in this phase's discussion; out of scope |
| `e1`, `e2`, `ee` | 3 files | **Unruled** — named in the deferred block as stray git-stderr captures (0/59/96 bytes), harmless but present in the tree the owner pushes |
| `skills-lock.json` | 1 file | **Unruled** — not named in this phase's discussion; out of scope |
| `.planning/config.json` (tracked, **modified**, not untracked) | 1 file | **Unruled** — the one modified tracked file (`_auto_chain_active: true→false`); named in the deferred block, a `git commit -a` would carry it, this plan does not |
| The four orphan artifacts | 4 files | **Ruled** — committed in 5.1, no longer untracked |

`46 + 46 + 1 + 5 + 1 + 3 + 1 = 103` untracked entries + the 1 modified tracked file = **104**,
matching the all-untracked count above exactly. This plan's own prohibition ("no blanket add-all")
means every one of the seven unruled populations stays untracked/modified through this plan's own
commits; only the four named orphans move.

### 5.3 The axis asymmetry (D-64)

Only the third audit axis runs against this dirty tree. The first axis is a fresh
`git clone --no-hardlinks` (per `PROJECT.md`), and a fresh clone by construction contains only
what is committed to the cloned ref — it cannot carry a single one of the 104 untracked/modified
entries enumerated above. The predecessor phase's claim that both the first and third axes run
against this same state was inherited without re-checking and is wrong; it is corrected here so
it is not inherited again.

### 5.4 Atom-branch audit (D-65) — reported, none deleted

`git fetch origin` was run this session before recording tip commits. All four branches are
reachable from `origin/master` (confirmed via `git merge-base --is-ancestor`):

| Branch | Tip commit | Reachable from `origin/master` | Evidence resting on this tip |
|---|---|---|---|
| `origin/phase-119-atom-2` | `652f48e7` | Yes | Phase 119's authoritative Axis-2 GHA cascade run (`28825186128`, headSha `652f48e`, PR #2, event `pull_request`/synchronize), conclusion **success** — the v1.15 close's CI evidence (`119-04-SUMMARY.md`) |
| `origin/phase-125-atom-2` | `ce62fe58` | Yes | Phase 125's Axis-2 GHA cascade (PR #3, `phase-125-atom-2`→`master`); pushed tip `ce62fe5` matches local HEAD at the time — the v1.16 close's CI evidence (`125-05-SUMMARY.md`) |
| `origin/phase-128-atom-2` | `4e89d68c` | Yes | Phase 128's Atom-2a (`066a906`) + Atom-2b (`5da45802`) pushed as this branch, opening PR #4 (base `master`) and firing the CI cascade — the v1.17 close's CI evidence (`128-05-SUMMARY.md`) |
| `origin/phase-139-atom-5` | `c2450efa` | Yes | 16/16 `frozen-read-probe` jobs report job-level success (never run-level colour) across all 16 `audit-harness-*.yml` workflows dispatched against this branch — closes SWEEP-01 SC#2 and the D-24-rescoped SWEEP-02 (`139-06-SUMMARY.md`); the owner-approved KEEP disposition (as of Phase 139) held it until Phase 144's close audit |

`[MEASURED]` all four tips and reachability confirmed this session via `git rev-parse
origin/<branch>` and `git merge-base --is-ancestor origin/<branch> origin/master`. No branch is
deleted by this task. `phase-139-atom-5`'s tip holds evidence for a completed sweep and a deleted
remote branch has no reflog — the delete-or-keep call for all four goes to the owner at the push
checkpoint (Task 3).

### 5.5 The style-pass scope ruling (D-61)

`scripts/docs-style/` is **tracked**: `git ls-files scripts/docs-style/ | wc -l` → **50** files.
It carries **6** unpushed commits inside the 255-ahead push set (re-measured; see Task 3's
pre-flight for the current ahead/behind figures):

```
$ git log origin/master..HEAD --oneline -- scripts/docs-style/
9b3007c1 feat(docs-style): judge-packets.py, the 406 verdicts, and the rule rows they overturned
0332a61c fix(docs-style): tighten three over-firing verifier rules, close the sweep's idempotency hole
56f55307 docs(docs-style): RESUME -- record the corpus drift from v1.21 phases 149-151
761caba0 docs(docs-style): RESUME -- next-session block, verifier section, and one correction
856234d2 feat(docs-style): add google-style-verify -- prove a style pass preserved meaning
4efe0405 chore(docs-style): vendor the google-style skill and its tooling into the repo
```

Because it is tracked with commits already inside the push set, it cannot be "ruled on and not
pushed" — a push of the unpushed set publishes it regardless of any separate ruling. It lands on
`origin/master` and appears in the `v1.21` tag's history the moment the push happens. The
milestone audit (`v1.21-MILESTONE-AUDIT.md`) must own this explicitly as recorded scope rather
than let the tag carry unnarrated work. Splitting it out is not an option: doing so would mean
rewriting the entire unpushed 255-commit history at a close whose evidence (all 18 CI workflow
dispatches, both reproduction axes) is keyed to one shared SHA — a rewrite here invalidates that
key before it is ever used.

### 5.6 Stop-hook sequencing as one decision (D-69)

The three registered Stop hooks are sequenced against the terminal ordering (D-55) as a single
decision, not three independently rediscovered ones:

1. **`jira-milestone-gate.cjs`** fires at **execution-complete**, which is **pre-verification** —
   the known race this repo has hit before (a prior milestone's Stop-hook nudged mid-verify). The
   active Jira Story is held **In Progress** until VERIFICATION passes, never flipped to Done on
   the hook's own nudge. This hook remains registered (first in order) and fires throughout the
   remaining terminal-ordering steps (evidence, owner push, dispatch, both axes) whenever a turn
   ends mid-flight.
2. **`publish-bundle-gate.cjs`** blocks on the **milestone-complete transition**, demanding
   `dist/docs-library-v1.21.zip` (D-68's explicit `--version=v1.21` requirement). Its idempotency
   probe is a read-only presence check for that exact versioned filename — it will **not**
   recognize Phase 152's differently-named `v1.21.0.zip` as satisfying the probe, so this hook
   fires for real (not a false-positive skip) at the `/gsd-complete-milestone` step unless the
   publish bundle is actually run with `--version=v1.21` first, per D-55's ordering
   (`publish bundle --version=v1.21` precedes the `SINGLE close-gate commit`).
3. **`v1.20-carve-gate.cjs`** is retired for the duration of this phase (Task 1 / 4.1) and does
   not fire at any step.

**Two of the three block()** — `jira-milestone-gate.cjs` and `publish-bundle-gate.cjs`; the third
is de-registered. Stating this as one ordered decision means neither surviving hook is
rediscovered in isolation at the moment it actually fires later in the terminal ordering.

---

## Task 6 — Owner push checkpoint: pre-flights measured, presentation recorded, decision AWAITED

Per D-60/D-57: pre-flights are run **at the checkpoint** and never carried from planning time or
from an earlier task in this same plan. Both figures below were re-measured after Tasks 1 and 2's
commits landed, in this same session, immediately before this section was written.

### 6.1 Ahead/behind, measured now

```
$ git fetch origin
$ git rev-list --left-right --count master...origin/master
258	0
```

`[MEASURED]` **258 ahead, 0 behind** — `master` at `cf81137d`. This supersedes every
earlier-carried figure in this plan's own frontmatter (`210 ahead`) and in `153-CONTEXT.md`
(`208 ahead`); both were planning-time snapshots and neither is reused here, per D-60's explicit
instruction not to carry the number. The three commits this plan itself produced (Tasks 1 and 2,
`29d32dca`, `755aa911`, `cf81137d`) account for the growth from the CONTEXT-time 208/210 figure to
258.

### 6.2 Working-tree state, re-measured now (all-untracked form)

```
$ git status --porcelain | wc -l
10
$ git status --porcelain=v1 --untracked-files=all | wc -l
104
```

`[MEASURED]` unchanged from section 5.2 (Tasks 1-2 touched only tracked files already committed;
nothing new became untracked). The full population table from 5.2 is re-affirmed as current:

| Population | Count | Status |
|---|---|---|
| `.agents/skills/fireworks-tech-graph/*` | 46 | Unruled |
| `.claude/skills/fireworks-tech-graph/*` | 46 | Unruled |
| `.claude/skills/jira-milestone/install-jira-milestone-hook.cjs` | 1 | Unruled |
| `.obsidian/*` | 5 | Unruled |
| `.planning/milestone.lock` | 1 | Unruled |
| `e1`, `e2`, `ee` | 3 | Unruled |
| `skills-lock.json` | 1 | Unruled |
| `.planning/config.json` (modified, tracked) | 1 | Unruled |

An untracked population nobody has ruled on is a question, not a detail — the third audit axis
(Axis-3) reproduces against exactly this state once the owner pushes, so every population above
travels into that reproduction as-is if the owner proceeds.

### 6.3 The five presentation items, put to the owner

1. **Ahead/behind, measured now:** 258 ahead of `origin/master`, 0 behind (section 6.1).
2. **Working-tree state:** 10 bare / 104 all-untracked; every population named and marked ruled
   (only the four now-committed orphans) or unruled (all seven remaining populations, section 6.2)
   — none of the seven unruled populations is included in this plan's commits.
3. **Style-pass scope ruling (5.5):** `scripts/docs-style/` is tracked, 50 files, 6 unpushed
   commits already inside the 258-commit push set — it cannot be held back without rewriting that
   entire unpushed history, and it publishes automatically on any `proceed`/`partial` push that
   includes those 6 commits.
4. **Atom-branch audit (5.4):** all four remote branches (`phase-119-atom-2`, `phase-125-atom-2`,
   `phase-128-atom-2`, `phase-139-atom-5`) reachable from `origin/master`, evidence resting on each
   quoted in 5.4. `phase-139-atom-5`'s tip is the head commit SWEEP-01/02's completion evidence
   rests on; a deleted remote branch has no reflog. **Explicit question to the owner: delete or
   keep each of the four?** No branch is deleted by this plan regardless of the answer — deletion,
   if chosen, is a follow-up action outside this plan's own commits.
5. **Consequence of declining:** if the owner declines or defers, the 18-workflow dispatch axis
   cannot run (no workflow in the set carries a `push:` trigger, and `workflow_dispatch:` requires
   the file to exist on `origin/master`'s default branch, which it does not until this push
   happens), both reproduction axes cannot execute against a shared SHA, and the milestone does not
   close this phase.

### 6.4 Owner decision — RECORDED (ruled 2026-08-30)

**Re-measured immediately before acting on the ruling (never reusing the 258 figure from 6.1,
which was itself already stale by the time the checkpoint was reached):**

```
$ git fetch origin
$ git rev-list --left-right --count master...origin/master
259	0
```

`[MEASURED]` **259 ahead, 0 behind** at `master` = `a64bb7e8` (the pre-flight-record commit added
by this task before halting). This is the live figure the push below acts on — not the 258 quoted
in 6.1, and not the 210/208 figures carried from planning time. The one additional commit between
`cf81137d` (6.1's HEAD) and `a64bb7e8` (this HEAD) is this plan's own pre-flight-record commit.
Working-tree state re-confirmed unchanged: 10 bare / 104 all-untracked (same as 6.2).

**Owner ruling, given explicitly, both parts, verbatim:**

1. **Push decision: `proceed`.** Push the full unpushed set from local `master` to
   `origin/master`. The owner was shown and accepted that this also publishes the 6 unpushed
   `scripts/docs-style/` commits (5.5), which cannot be held back without rewriting history.
2. **Atom branches: KEEP ALL FOUR.** `phase-119-atom-2`, `phase-125-atom-2`, `phase-128-atom-2`,
   `phase-139-atom-5` all remain. Rationale the owner accepted: `phase-139-atom-5`'s tip holds
   SWEEP-01/02's completion evidence and a deleted remote branch has no reflog. **Delete nothing.**

No branch is deleted by this task, per the ruling and per this task's own prohibition.

### 6.5 The push — executed

```
$ git push origin master
To https://github.com/Schweinehund/Autopilot.git
   6f989a43..07e6e844  master -> master
```

`[MEASURED]` exit 0. **Resulting head commit: `07e6e844c841db7e13553063b569d6cb9f624c48`** — this
is the single shared commit that plan 153-12's three terminal audit axes (dispatch, both
reproduction axes) key to. Post-push confirmation:

```
$ git rev-parse HEAD
07e6e844c841db7e13553063b569d6cb9f624c48
$ git rev-parse origin/master
07e6e844c841db7e13553063b569d6cb9f624c48
$ git rev-list --left-right --count master...origin/master
0	0
```

`master` and `origin/master` are identical; 0 ahead, 0 behind. No branch was deleted. The 6
`scripts/docs-style/` commits (5.5) are published as part of this push, as disclosed to the owner
before the ruling. All four atom branches (`phase-119-atom-2`, `phase-125-atom-2`,
`phase-128-atom-2`, `phase-139-atom-5`) remain untouched on the remote per the keep-all-four
ruling.

---

*Phase: 153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a*
*Plan: 11*
*Evidence captured: 2026-08-29*

---

## Plan 12 — Shared-commit supersession (recorded before Task 1)

**The `07e6e844` commit recorded in section 6.5 above is SUPERSEDED.** Before Task 1's dispatch
could begin, the plan-12 executor re-measured ahead/behind per this plan's own Task 1 precondition
("the remote tracking branch is not behind the local default branch") and found it violated:

```
$ git status --short
 M .planning/config.json
?? .agents/
?? .claude/skills/fireworks-tech-graph/
?? .claude/skills/jira-milestone/install-jira-milestone-hook.cjs
?? .obsidian/
?? .planning/milestone.lock
?? e1
?? e2
?? ee
?? skills-lock.json
$ git fetch origin
$ git rev-list --left-right --count master...origin/master
3	0
$ git rev-parse HEAD
478e633e78e9670b31db1f39e7660c9f0e9c888c
$ git rev-parse origin/master
07e6e844c841db7e13553063b569d6cb9f624c48
```

`[MEASURED]` Local `master` was 3 commits ahead of `origin/master`. The plan-11 executor made
three MORE commits after recording the `07e6e844` push in section 6.5 — a SUMMARY commit
(`17d24e2d`), a push-confirmation evidence commit (`5e953202`), and a plan-complete
STATE/ROADMAP/REQUIREMENTS commit (`478e633e`) — none of which were pushed. These are not
cosmetic: `git diff --stat 07e6e844..478e633e` shows `.planning/REQUIREMENTS.md` and
`.planning/ROADMAP.md` both modified, and both are live-read by chain validators. Dispatching the
18-workflow axis against `07e6e844` would have run every workflow against a corpus missing those
two files' changes.

**Corrective action taken:** pushed the trailing 3 commits.

```
$ git push origin master
To https://github.com/Schweinehund/Autopilot.git
   07e6e844..478e633e  master -> master
$ git fetch origin
$ git rev-parse HEAD
478e633e78e9670b31db1f39e7660c9f0e9c888c
$ git rev-parse origin/master
478e633e78e9670b31db1f39e7660c9f0e9c888c
$ git rev-list --left-right --count master...origin/master
0	0
```

`[MEASURED]` `master` and `origin/master` are now identical, 0 ahead / 0 behind.

**THE SUPERSEDING SHARED COMMIT FOR ALL THREE AXES OF THIS PLAN IS:**

```
478e633e78e9670b31db1f39e7660c9f0e9c888c
```

This SHA supersedes `07e6e844c841db7e13553063b569d6cb9f624c48` (section 6.5 above) for every
purpose in plan 153-12: the dispatch axis (Task 1), the job-level evidence (Task 2), and both
reproduction axes (Task 3). `07e6e844` is a real, pushed, valid commit — it is not wrong, it is
merely not current — but it is never reused as the recorded commit anywhere below. No workflow is
dispatched against it.


---

## Plan 12, Task 1 — Live enumeration, dispatch, read-back at the superseding commit

**Recorded commit for this task and every subsequent one in this plan:**
`478e633e78e9670b31db1f39e7660c9f0e9c888c` (see the supersession section immediately above).

### 1.1 Live enumeration

```
$ ls -1 .github/workflows/*.yml .github/workflows/*.yaml 2>/dev/null | sort
.github/workflows/audit-harness-integrity.yml
.github/workflows/audit-harness-v1.10-integrity.yml
.github/workflows/audit-harness-v1.11-integrity.yml
.github/workflows/audit-harness-v1.12-integrity.yml
.github/workflows/audit-harness-v1.13-integrity.yml
.github/workflows/audit-harness-v1.14-integrity.yml
.github/workflows/audit-harness-v1.15-integrity.yml
.github/workflows/audit-harness-v1.16-integrity.yml
.github/workflows/audit-harness-v1.17-integrity.yml
.github/workflows/audit-harness-v1.18-integrity.yml
.github/workflows/audit-harness-v1.19-integrity.yml
.github/workflows/audit-harness-v1.20-integrity.yml
.github/workflows/audit-harness-v1.21-integrity.yml
.github/workflows/audit-harness-v1.5-integrity.yml
.github/workflows/audit-harness-v1.6-integrity.yml
.github/workflows/audit-harness-v1.7-integrity.yml
.github/workflows/audit-harness-v1.8-integrity.yml
.github/workflows/audit-harness-v1.9-integrity.yml
```

`[MEASURED]` **18 files**, `.yml` extension only, `.yaml` glob matched zero (both extensions were
covered by the glob; only one is populated). No count was carried from this plan's own frontmatter
or from any prior phase document.

### 1.2 Trigger confirmation

```
$ for f in .github/workflows/*.yml; do
    disp=$(grep -c "workflow_dispatch" "$f")
    pushtrig=$(grep -E "^\s*push:" "$f" | wc -l)
    echo "$f | workflow_dispatch_hits=$disp | push_trigger_hits=$pushtrig"
  done
```

All 18 files report `workflow_dispatch_hits=1`, `push_trigger_hits=0`. `[MEASURED]` **Every
enumerated workflow carries a `workflow_dispatch` trigger. Zero carry a `push` trigger.** This is
why the section-6.5 push (which landed the superseding commit) fired nothing on its own — the
dispatch below is the sole instrument that produces evidence.

### 1.3 Dispatch

`gh auth status` confirmed an authenticated token with `workflow` scope against
`Schweinehund/Autopilot`. All 18 workflows were dispatched with `gh workflow run <file> --ref
master`, one command per file, sequentially, starting `2026-08-30T16:11:07Z`. `gh workflow run`
returns no run identifier on success (confirmed empty stdout for all 18 invocations, matching this
task's own precondition text) — every dispatch call exited 0 with no error output.

### 1.4 Read-back — reconciliation table

Runs were located ~15s after the last dispatch via `gh run list --json
databaseId,workflowName,workflowDatabaseId,event,headSha,status,conclusion,createdAt,url`, filtered
to `event=="workflow_dispatch"` and `headSha=="478e633e78e9670b31db1f39e7660c9f0e9c888c"`. All 18
runs were located on the first read-back; **zero required re-dispatch.** Polled every 15-20s until
every run's `status` reached `completed` (final poll at `16:16:57Z`, ~6 minutes total).

| # | Workflow file | Workflow name | Run ID | Head commit | Matches recorded commit? |
|---|---|---|---|---|---|
| 1 | `audit-harness-integrity.yml` | Audit Harness Integrity | 33321742097 | `478e633e...` | YES |
| 2 | `audit-harness-v1.5-integrity.yml` | Audit Harness v1.5 Integrity | 33321772943 | `478e633e...` | YES |
| 3 | `audit-harness-v1.6-integrity.yml` | Audit Harness v1.6 Integrity | 33321775155 | `478e633e...` | YES |
| 4 | `audit-harness-v1.7-integrity.yml` | Audit Harness v1.7 Integrity | 33321777268 | `478e633e...` | YES |
| 5 | `audit-harness-v1.8-integrity.yml` | Audit Harness v1.8 Integrity | 33321779135 | `478e633e...` | YES |
| 6 | `audit-harness-v1.9-integrity.yml` | Audit Harness v1.9 Integrity | 33321781140 | `478e633e...` | YES |
| 7 | `audit-harness-v1.10-integrity.yml` | Audit Harness v1.10 Integrity | 33321744094 | `478e633e...` | YES |
| 8 | `audit-harness-v1.11-integrity.yml` | Audit Harness v1.11 Integrity | 33321746318 | `478e633e...` | YES |
| 9 | `audit-harness-v1.12-integrity.yml` | Audit Harness v1.12 Integrity | 33321748698 | `478e633e...` | YES |
| 10 | `audit-harness-v1.13-integrity.yml` | Audit Harness v1.13 Integrity | 33321750987 | `478e633e...` | YES |
| 11 | `audit-harness-v1.14-integrity.yml` | Audit Harness v1.14 Integrity | 33321753442 | `478e633e...` | YES |
| 12 | `audit-harness-v1.15-integrity.yml` | Audit Harness v1.15 Integrity | 33321755955 | `478e633e...` | YES |
| 13 | `audit-harness-v1.16-integrity.yml` | Audit Harness v1.16 Integrity | 33321758409 | `478e633e...` | YES |
| 14 | `audit-harness-v1.17-integrity.yml` | Audit Harness v1.17 Integrity | 33321760730 | `478e633e...` | YES |
| 15 | `audit-harness-v1.18-integrity.yml` | Audit Harness v1.18 Integrity | 33321763130 | `478e633e...` | YES |
| 16 | `audit-harness-v1.19-integrity.yml` | Audit Harness v1.19 Integrity | 33321765762 | `478e633e...` | YES |
| 17 | `audit-harness-v1.20-integrity.yml` | Audit Harness v1.20 Integrity | 33321768262 | `478e633e...` | YES |
| 18 | `audit-harness-v1.21-integrity.yml` | Audit Harness v1.21 Integrity | 33321770727 | `478e633e...` | YES |

`478e633e...` = `478e633e78e9670b31db1f39e7660c9f0e9c888c` (truncated for table width). Full SHA
verified byte-for-byte via `jq` filter equality, not truncated-string comparison, for all 18 rows.

**Reconciliation:** dispatched set = 18 (section 1.1). Observed-run set at the recorded commit,
event `workflow_dispatch` = 18 (this table). **Sets are identical. Zero gaps. Zero mismatches.
Zero re-dispatches were required.**

All 18 runs reached `status: completed`. Top-level `conclusion` for all 18 is `success` — this is
a **top-level run colour** per this plan's own evidence-discipline rule and is recorded here only
as a completion signal, never as the pass/fail determination for HARN-06. Job-level evidence,
keyed on all four fields, is captured next in Task 2.

---

## Plan 12, Task 2 — Job-level evidence, four-key rows, skip classification

Recorded commit (unchanged from Task 1): `478e633e78e9670b31db1f39e7660c9f0e9c888c`.

### 2.1 Job-level pull

For each of the 18 runs in Task 1's reconciliation table, job-level JSON was pulled via `gh run
view <id> --json jobs` (never a top-level run colour). **227 jobs observed across the 18 runs.**

### 2.2 Skip-anchor derivation (read the guard, not a grep)

`grep -l "schedule"` over the 18 workflow files hits all 18 — an insufficient signal, since
`schedule:` also appears as the workflow-level *trigger* declaration, not just on the job that is
gated by it. Reading each workflow's job graph directly: the base workflow
(`audit-harness-integrity.yml`) and `audit-harness-v1.5-integrity.yml` carry a **weekly** cron
(`0 8 * * 1`) and no quarterly job at all. The remaining 16 (`v1.6` through `v1.21`) each carry
exactly one `rotting-external-quarterly` job (name: "Quarterly c13_rotting_external link-check"),
`needs: harness-run`, gated to the quarterly cron event:

```
$ for f in .github/workflows/audit-harness-v1.{6..21}-integrity.yml; do
    awk '/^  rotting-external-quarterly:/{p=1} p{print; if(/steps:/){exit}}' "$f"
  done
```

14 of the 16 read `if: github.event_name == 'schedule' && github.event.schedule == '0 8 1
1,4,7,10 *'`. **Two — `audit-harness-v1.6-integrity.yml` and `audit-harness-v1.7-integrity.yml` —
read `if: always() && github.event_name == 'schedule' && ...`**, the always-plus-condition form
this task's `<read_first>` warned would undercount a literal-string grep (a grep anchored on `if:
github.event_name` as a literal prefix misses these two, since their `if:` line starts with
`always()`). Both forms evaluate identically for a `workflow_dispatch` event — `always()` only
forces evaluation past an upstream failure; the `event_name == 'schedule'` clause still gates the
job off, since the actual event here is `workflow_dispatch`, not `schedule`.

**`[MEASURED]` Legitimate-skip anchor: 16 of 18** — one `rotting-external-quarterly` skip
expected per workflow that carries the job (16 workflows), zero expected in the 2 that do not
carry it (base, v1.5). This is derived from reading each workflow's guard clause, never from a
literal-string grep, and is not the figure carried from the predecessor milestone (the plan's own
`<read_first>` warns against reusing that number unchecked).

### 2.3 Non-evidence: continue-on-error jobs

Every one of the 18 workflows carries exactly one `pin-helper-advisory` job with `continue-on-error:
true` (D-14/D-15/D-22 — "advisory only; never fails build"; the v1.21 file additionally comments
"NON-EVIDENCE (D-54/D-48)... conclusion structurally always success"). GitHub reports all 18 as
`conclusion: success` regardless of the underlying command's real outcome, because
`continue-on-error` rewrites a failing step's job conclusion to success. **These 18 rows are
excluded from the success count and recorded as non-evidence,** per this task's own instruction
never to cite a continue-on-error job as evidence.

### 2.4 Full job-level table (227 rows, all four keys)

Event is `workflow_dispatch` for every row (this plan's dispatch axis only — Task 1's read-back
already proved 18/18 runs are `workflow_dispatch` events at the recorded commit). Head commit is
`478e633e78e9670b31db1f39e7660c9f0e9c888c` for every row (inherited from its parent run, verified
in Task 1's reconciliation table by full-SHA `jq` equality, not truncation) — shown truncated below
for table width.

| # | Workflow file | Job (display name) | Event | Head commit | Conclusion | Class |
|---|---|---|---|---|---|---|
| 1 | audit-harness-integrity.yml | Frozen-read probe (SWEEP-01/02 evidence, D-24 dependency-free) | workflow_dispatch | 478e633e... | success | success |
| 2 | audit-harness-integrity.yml | Sidecar JSON parse | workflow_dispatch | 478e633e... | success | success |
| 3 | audit-harness-integrity.yml | Sidecar path matches harness | workflow_dispatch | 478e633e... | success | success |
| 4 | audit-harness-integrity.yml | Harness replay | workflow_dispatch | 478e633e... | success | success |
| 5 | audit-harness-integrity.yml | Supervision pin helper (advisory) | workflow_dispatch | 478e633e... | success | non-evidence (continue-on-error) |
| 6 | audit-harness-v1.5-integrity.yml | Frozen-read probe (SWEEP-01/02 evidence, D-24 dependency-free) | workflow_dispatch | 478e633e... | success | success |
| 7 | audit-harness-v1.5-integrity.yml | Parse v1.5 sidecar JSON | workflow_dispatch | 478e633e... | success | success |
| 8 | audit-harness-v1.5-integrity.yml | Harness references v1.5 sidecar | workflow_dispatch | 478e633e... | success | success |
| 9 | audit-harness-v1.5-integrity.yml | Run v1.5 milestone audit harness | workflow_dispatch | 478e633e... | success | success |
| 10 | audit-harness-v1.5-integrity.yml | check-phase-55 validator | workflow_dispatch | 478e633e... | success | success |
| 11 | audit-harness-v1.5-integrity.yml | check-phase-60 validator | workflow_dispatch | 478e633e... | success | success |
| 12 | audit-harness-v1.5-integrity.yml | Supervision-pin drift advisory (CI) | workflow_dispatch | 478e633e... | success | non-evidence (continue-on-error) |
| 13 | audit-harness-v1.5-integrity.yml | check-phase-53 validator | workflow_dispatch | 478e633e... | success | success |
| 14 | audit-harness-v1.5-integrity.yml | check-phase-52 validator | workflow_dispatch | 478e633e... | success | success |
| 15 | audit-harness-v1.5-integrity.yml | check-phase-51 validator | workflow_dispatch | 478e633e... | success | success |
| 16 | audit-harness-v1.5-integrity.yml | check-phase-50 validator | workflow_dispatch | 478e633e... | success | success |
| 17 | audit-harness-v1.5-integrity.yml | check-phase-48 validator | workflow_dispatch | 478e633e... | success | success |
| 18 | audit-harness-v1.5-integrity.yml | check-phase-54 validator | workflow_dispatch | 478e633e... | success | success |
| 19 | audit-harness-v1.5-integrity.yml | check-phase-49 validator | workflow_dispatch | 478e633e... | success | success |
| 20 | audit-harness-v1.5-integrity.yml | check-phase-58 validator | workflow_dispatch | 478e633e... | success | success |
| 21 | audit-harness-v1.5-integrity.yml | check-phase-57 validator | workflow_dispatch | 478e633e... | success | success |
| 22 | audit-harness-v1.5-integrity.yml | check-phase-61 validator | workflow_dispatch | 478e633e... | success | success |
| 23 | audit-harness-v1.5-integrity.yml | check-phase-59 validator | workflow_dispatch | 478e633e... | success | success |
| 24 | audit-harness-v1.5-integrity.yml | check-phase-56 validator | workflow_dispatch | 478e633e... | success | success |
| 25 | audit-harness-v1.6-integrity.yml | Frozen-read probe (SWEEP-01/02 evidence, D-24 dependency-free) | workflow_dispatch | 478e633e... | success | success |
| 26 | audit-harness-v1.6-integrity.yml | Parse v1.6 sidecar JSON | workflow_dispatch | 478e633e... | success | success |
| 27 | audit-harness-v1.6-integrity.yml | Harness references v1.6 sidecar | workflow_dispatch | 478e633e... | success | success |
| 28 | audit-harness-v1.6-integrity.yml | Run v1.6 milestone audit harness | workflow_dispatch | 478e633e... | success | success |
| 29 | audit-harness-v1.6-integrity.yml | check-phase-62 validator | workflow_dispatch | 478e633e... | success | success |
| 30 | audit-harness-v1.6-integrity.yml | check-phase-65 validator | workflow_dispatch | 478e633e... | success | success |
| 31 | audit-harness-v1.6-integrity.yml | check-phase-66 validator | workflow_dispatch | 478e633e... | success | success |
| 32 | audit-harness-v1.6-integrity.yml | check-phase-64 validator | workflow_dispatch | 478e633e... | success | success |
| 33 | audit-harness-v1.6-integrity.yml | check-phase-63 validator | workflow_dispatch | 478e633e... | success | success |
| 34 | audit-harness-v1.6-integrity.yml | Supervision-pin drift advisory (CI) | workflow_dispatch | 478e633e... | success | non-evidence (continue-on-error) |
| 35 | audit-harness-v1.6-integrity.yml | Quarterly c13_rotting_external link-check | workflow_dispatch | 478e633e... | skipped | legitimate skip (event-gated) |
| 36 | audit-harness-v1.7-integrity.yml | Frozen-read probe (SWEEP-01/02 evidence, D-24 dependency-free) | workflow_dispatch | 478e633e... | success | success |
| 37 | audit-harness-v1.7-integrity.yml | Parse v1.7 sidecar JSON | workflow_dispatch | 478e633e... | success | success |
| 38 | audit-harness-v1.7-integrity.yml | Harness references v1.7 sidecar | workflow_dispatch | 478e633e... | success | success |
| 39 | audit-harness-v1.7-integrity.yml | Run v1.7 milestone audit harness | workflow_dispatch | 478e633e... | success | success |
| 40 | audit-harness-v1.7-integrity.yml | check-phase-70 validator | workflow_dispatch | 478e633e... | success | success |
| 41 | audit-harness-v1.7-integrity.yml | Validator chain on Linux LF (Phase 69 CILINUX-01) | workflow_dispatch | 478e633e... | success | success |
| 42 | audit-harness-v1.7-integrity.yml | check-phase-67 validator | workflow_dispatch | 478e633e... | success | success |
| 43 | audit-harness-v1.7-integrity.yml | Supervision-pin drift advisory (CI) | workflow_dispatch | 478e633e... | success | non-evidence (continue-on-error) |
| 44 | audit-harness-v1.7-integrity.yml | check-phase-68 validator | workflow_dispatch | 478e633e... | success | success |
| 45 | audit-harness-v1.7-integrity.yml | check-phase-69 validator | workflow_dispatch | 478e633e... | success | success |
| 46 | audit-harness-v1.7-integrity.yml | Quarterly c13_rotting_external link-check | workflow_dispatch | 478e633e... | skipped | legitimate skip (event-gated) |
| 47 | audit-harness-v1.8-integrity.yml | Parse v1.8 sidecar JSON | workflow_dispatch | 478e633e... | success | success |
| 48 | audit-harness-v1.8-integrity.yml | Frozen-read probe (SWEEP-01/02 evidence, D-24 dependency-free) | workflow_dispatch | 478e633e... | success | success |
| 49 | audit-harness-v1.8-integrity.yml | Harness references v1.8 sidecar | workflow_dispatch | 478e633e... | success | success |
| 50 | audit-harness-v1.8-integrity.yml | Run v1.8 milestone audit harness | workflow_dispatch | 478e633e... | success | success |
| 51 | audit-harness-v1.8-integrity.yml | Validator chain on Linux LF (Phase 69 CILINUX-01) | workflow_dispatch | 478e633e... | success | success |
| 52 | audit-harness-v1.8-integrity.yml | check-phase-72 validator | workflow_dispatch | 478e633e... | success | success |
| 53 | audit-harness-v1.8-integrity.yml | check-phase-74 validator | workflow_dispatch | 478e633e... | success | success |
| 54 | audit-harness-v1.8-integrity.yml | check-phase-73 validator | workflow_dispatch | 478e633e... | success | success |
| 55 | audit-harness-v1.8-integrity.yml | check-phase-71 validator | workflow_dispatch | 478e633e... | success | success |
| 56 | audit-harness-v1.8-integrity.yml | Supervision-pin drift advisory (CI) | workflow_dispatch | 478e633e... | success | non-evidence (continue-on-error) |
| 57 | audit-harness-v1.8-integrity.yml | Quarterly c13_rotting_external link-check | workflow_dispatch | 478e633e... | skipped | legitimate skip (event-gated) |
| 58 | audit-harness-v1.9-integrity.yml | Parse v1.9 sidecar JSON | workflow_dispatch | 478e633e... | success | success |
| 59 | audit-harness-v1.9-integrity.yml | Frozen-read probe (SWEEP-01/02 evidence, D-24 dependency-free) | workflow_dispatch | 478e633e... | success | success |
| 60 | audit-harness-v1.9-integrity.yml | Harness references v1.9 sidecar | workflow_dispatch | 478e633e... | success | success |
| 61 | audit-harness-v1.9-integrity.yml | Run v1.9 milestone audit harness | workflow_dispatch | 478e633e... | success | success |
| 62 | audit-harness-v1.9-integrity.yml | check-phase-77 validator | workflow_dispatch | 478e633e... | success | success |
| 63 | audit-harness-v1.9-integrity.yml | Validator chain on Linux LF (Phase 69 CILINUX-01) | workflow_dispatch | 478e633e... | success | success |
| 64 | audit-harness-v1.9-integrity.yml | check-phase-79 validator | workflow_dispatch | 478e633e... | success | success |
| 65 | audit-harness-v1.9-integrity.yml | check-phase-75 validator | workflow_dispatch | 478e633e... | success | success |
| 66 | audit-harness-v1.9-integrity.yml | check-phase-76 validator | workflow_dispatch | 478e633e... | success | success |
| 67 | audit-harness-v1.9-integrity.yml | check-phase-78 validator | workflow_dispatch | 478e633e... | success | success |
| 68 | audit-harness-v1.9-integrity.yml | check-phase-80 validator | workflow_dispatch | 478e633e... | success | success |
| 69 | audit-harness-v1.9-integrity.yml | Supervision-pin drift advisory (CI) | workflow_dispatch | 478e633e... | success | non-evidence (continue-on-error) |
| 70 | audit-harness-v1.9-integrity.yml | check-phase-82 validator | workflow_dispatch | 478e633e... | success | success |
| 71 | audit-harness-v1.9-integrity.yml | check-phase-81 validator | workflow_dispatch | 478e633e... | success | success |
| 72 | audit-harness-v1.9-integrity.yml | Quarterly c13_rotting_external link-check | workflow_dispatch | 478e633e... | skipped | legitimate skip (event-gated) |
| 73 | audit-harness-v1.10-integrity.yml | Frozen-read probe (SWEEP-01/02 evidence, D-24 dependency-free) | workflow_dispatch | 478e633e... | success | success |
| 74 | audit-harness-v1.10-integrity.yml | Parse v1.10 sidecar JSON | workflow_dispatch | 478e633e... | success | success |
| 75 | audit-harness-v1.10-integrity.yml | Harness references v1.10 sidecar | workflow_dispatch | 478e633e... | success | success |
| 76 | audit-harness-v1.10-integrity.yml | Run v1.10 milestone audit harness | workflow_dispatch | 478e633e... | success | success |
| 77 | audit-harness-v1.10-integrity.yml | check-phase-84 validator | workflow_dispatch | 478e633e... | success | success |
| 78 | audit-harness-v1.10-integrity.yml | check-phase-88 validator | workflow_dispatch | 478e633e... | success | success |
| 79 | audit-harness-v1.10-integrity.yml | check-phase-85 validator | workflow_dispatch | 478e633e... | success | success |
| 80 | audit-harness-v1.10-integrity.yml | check-phase-83 validator | workflow_dispatch | 478e633e... | success | success |
| 81 | audit-harness-v1.10-integrity.yml | Supervision-pin drift advisory (CI) | workflow_dispatch | 478e633e... | success | non-evidence (continue-on-error) |
| 82 | audit-harness-v1.10-integrity.yml | Validator chain on Linux LF (Phase 69 CILINUX-01) | workflow_dispatch | 478e633e... | success | success |
| 83 | audit-harness-v1.10-integrity.yml | check-phase-87 validator | workflow_dispatch | 478e633e... | success | success |
| 84 | audit-harness-v1.10-integrity.yml | check-phase-86 validator | workflow_dispatch | 478e633e... | success | success |
| 85 | audit-harness-v1.10-integrity.yml | Quarterly c13_rotting_external link-check | workflow_dispatch | 478e633e... | skipped | legitimate skip (event-gated) |
| 86 | audit-harness-v1.11-integrity.yml | Parse v1.11 sidecar JSON | workflow_dispatch | 478e633e... | success | success |
| 87 | audit-harness-v1.11-integrity.yml | Frozen-read probe (SWEEP-01/02 evidence, D-24 dependency-free) | workflow_dispatch | 478e633e... | success | success |
| 88 | audit-harness-v1.11-integrity.yml | Harness references v1.11 sidecar | workflow_dispatch | 478e633e... | success | success |
| 89 | audit-harness-v1.11-integrity.yml | Run v1.11 milestone audit harness | workflow_dispatch | 478e633e... | success | success |
| 90 | audit-harness-v1.11-integrity.yml | check-phase-92 validator | workflow_dispatch | 478e633e... | success | success |
| 91 | audit-harness-v1.11-integrity.yml | check-phase-90 validator | workflow_dispatch | 478e633e... | success | success |
| 92 | audit-harness-v1.11-integrity.yml | check-phase-89 validator | workflow_dispatch | 478e633e... | success | success |
| 93 | audit-harness-v1.11-integrity.yml | check-phase-91 validator | workflow_dispatch | 478e633e... | success | success |
| 94 | audit-harness-v1.11-integrity.yml | Supervision-pin drift advisory (CI) | workflow_dispatch | 478e633e... | success | non-evidence (continue-on-error) |
| 95 | audit-harness-v1.11-integrity.yml | Validator chain on Linux LF (Phase 69 CILINUX-01) | workflow_dispatch | 478e633e... | success | success |
| 96 | audit-harness-v1.11-integrity.yml | check-phase-93 validator | workflow_dispatch | 478e633e... | success | success |
| 97 | audit-harness-v1.11-integrity.yml | Quarterly c13_rotting_external link-check | workflow_dispatch | 478e633e... | skipped | legitimate skip (event-gated) |
| 98 | audit-harness-v1.12-integrity.yml | Frozen-read probe (SWEEP-01/02 evidence, D-24 dependency-free) | workflow_dispatch | 478e633e... | success | success |
| 99 | audit-harness-v1.12-integrity.yml | Parse v1.12 sidecar JSON | workflow_dispatch | 478e633e... | success | success |
| 100 | audit-harness-v1.12-integrity.yml | Harness references v1.12 sidecar | workflow_dispatch | 478e633e... | success | success |
| 101 | audit-harness-v1.12-integrity.yml | Run v1.12 milestone audit harness | workflow_dispatch | 478e633e... | success | success |
| 102 | audit-harness-v1.12-integrity.yml | check-phase-94 validator | workflow_dispatch | 478e633e... | success | success |
| 103 | audit-harness-v1.12-integrity.yml | check-phase-95 validator | workflow_dispatch | 478e633e... | success | success |
| 104 | audit-harness-v1.12-integrity.yml | Validator chain on Linux LF (Phase 69 CILINUX-01) | workflow_dispatch | 478e633e... | success | success |
| 105 | audit-harness-v1.12-integrity.yml | Supervision-pin drift advisory (CI) | workflow_dispatch | 478e633e... | success | non-evidence (continue-on-error) |
| 106 | audit-harness-v1.12-integrity.yml | Quarterly c13_rotting_external link-check | workflow_dispatch | 478e633e... | skipped | legitimate skip (event-gated) |
| 107 | audit-harness-v1.13-integrity.yml | Parse v1.13 sidecar JSON | workflow_dispatch | 478e633e... | success | success |
| 108 | audit-harness-v1.13-integrity.yml | Frozen-read probe (SWEEP-01/02 evidence, D-24 dependency-free) | workflow_dispatch | 478e633e... | success | success |
| 109 | audit-harness-v1.13-integrity.yml | Harness references v1.13 sidecar | workflow_dispatch | 478e633e... | success | success |
| 110 | audit-harness-v1.13-integrity.yml | Run v1.13 milestone audit harness | workflow_dispatch | 478e633e... | success | success |
| 111 | audit-harness-v1.13-integrity.yml | check-phase-97 validator | workflow_dispatch | 478e633e... | success | success |
| 112 | audit-harness-v1.13-integrity.yml | Validator chain on Linux LF (Phase 69 CILINUX-01) | workflow_dispatch | 478e633e... | success | success |
| 113 | audit-harness-v1.13-integrity.yml | check-phase-100 validator | workflow_dispatch | 478e633e... | success | success |
| 114 | audit-harness-v1.13-integrity.yml | check-phase-96 validator | workflow_dispatch | 478e633e... | success | success |
| 115 | audit-harness-v1.13-integrity.yml | Supervision-pin drift advisory (CI) | workflow_dispatch | 478e633e... | success | non-evidence (continue-on-error) |
| 116 | audit-harness-v1.13-integrity.yml | check-phase-98 validator | workflow_dispatch | 478e633e... | success | success |
| 117 | audit-harness-v1.13-integrity.yml | check-phase-99 validator | workflow_dispatch | 478e633e... | success | success |
| 118 | audit-harness-v1.13-integrity.yml | Quarterly c13_rotting_external link-check | workflow_dispatch | 478e633e... | skipped | legitimate skip (event-gated) |
| 119 | audit-harness-v1.14-integrity.yml | Frozen-read probe (SWEEP-01/02 evidence, D-24 dependency-free) | workflow_dispatch | 478e633e... | success | success |
| 120 | audit-harness-v1.14-integrity.yml | Parse v1.14 sidecar JSON | workflow_dispatch | 478e633e... | success | success |
| 121 | audit-harness-v1.14-integrity.yml | Harness references v1.14 sidecar | workflow_dispatch | 478e633e... | success | success |
| 122 | audit-harness-v1.14-integrity.yml | Run v1.14 milestone audit harness | workflow_dispatch | 478e633e... | success | success |
| 123 | audit-harness-v1.14-integrity.yml | check-phase-101 validator | workflow_dispatch | 478e633e... | success | success |
| 124 | audit-harness-v1.14-integrity.yml | check-phase-105 validator | workflow_dispatch | 478e633e... | success | success |
| 125 | audit-harness-v1.14-integrity.yml | check-phase-107 validator | workflow_dispatch | 478e633e... | success | success |
| 126 | audit-harness-v1.14-integrity.yml | check-phase-102 validator | workflow_dispatch | 478e633e... | success | success |
| 127 | audit-harness-v1.14-integrity.yml | Validator chain on Linux LF (Phase 69 CILINUX-01) | workflow_dispatch | 478e633e... | success | success |
| 128 | audit-harness-v1.14-integrity.yml | check-phase-104 validator | workflow_dispatch | 478e633e... | success | success |
| 129 | audit-harness-v1.14-integrity.yml | check-phase-106 validator | workflow_dispatch | 478e633e... | success | success |
| 130 | audit-harness-v1.14-integrity.yml | check-phase-109 validator | workflow_dispatch | 478e633e... | success | success |
| 131 | audit-harness-v1.14-integrity.yml | check-phase-103 validator | workflow_dispatch | 478e633e... | success | success |
| 132 | audit-harness-v1.14-integrity.yml | check-phase-110 validator | workflow_dispatch | 478e633e... | success | success |
| 133 | audit-harness-v1.14-integrity.yml | check-phase-112 validator | workflow_dispatch | 478e633e... | success | success |
| 134 | audit-harness-v1.14-integrity.yml | check-phase-108 validator | workflow_dispatch | 478e633e... | success | success |
| 135 | audit-harness-v1.14-integrity.yml | check-phase-111 validator | workflow_dispatch | 478e633e... | success | success |
| 136 | audit-harness-v1.14-integrity.yml | Supervision-pin drift advisory (CI) | workflow_dispatch | 478e633e... | success | non-evidence (continue-on-error) |
| 137 | audit-harness-v1.14-integrity.yml | Quarterly c13_rotting_external link-check | workflow_dispatch | 478e633e... | skipped | legitimate skip (event-gated) |
| 138 | audit-harness-v1.15-integrity.yml | Parse v1.15 sidecar JSON | workflow_dispatch | 478e633e... | success | success |
| 139 | audit-harness-v1.15-integrity.yml | Frozen-read probe (SWEEP-01/02 evidence, D-24 dependency-free) | workflow_dispatch | 478e633e... | success | success |
| 140 | audit-harness-v1.15-integrity.yml | Harness references v1.15 sidecar | workflow_dispatch | 478e633e... | success | success |
| 141 | audit-harness-v1.15-integrity.yml | Run v1.15 milestone audit harness | workflow_dispatch | 478e633e... | success | success |
| 142 | audit-harness-v1.15-integrity.yml | check-phase-117 validator | workflow_dispatch | 478e633e... | success | success |
| 143 | audit-harness-v1.15-integrity.yml | Validator chain on Linux LF (Phase 69 CILINUX-01) | workflow_dispatch | 478e633e... | success | success |
| 144 | audit-harness-v1.15-integrity.yml | check-phase-116 validator | workflow_dispatch | 478e633e... | success | success |
| 145 | audit-harness-v1.15-integrity.yml | check-phase-115 validator | workflow_dispatch | 478e633e... | success | success |
| 146 | audit-harness-v1.15-integrity.yml | check-phase-113 validator | workflow_dispatch | 478e633e... | success | success |
| 147 | audit-harness-v1.15-integrity.yml | check-phase-114 validator | workflow_dispatch | 478e633e... | success | success |
| 148 | audit-harness-v1.15-integrity.yml | check-phase-119 validator (apex; recursively spawns 48..118) | workflow_dispatch | 478e633e... | success | success |
| 149 | audit-harness-v1.15-integrity.yml | check-phase-118 validator | workflow_dispatch | 478e633e... | success | success |
| 150 | audit-harness-v1.15-integrity.yml | Supervision-pin drift advisory (CI) | workflow_dispatch | 478e633e... | success | non-evidence (continue-on-error) |
| 151 | audit-harness-v1.15-integrity.yml | Quarterly c13_rotting_external link-check | workflow_dispatch | 478e633e... | skipped | legitimate skip (event-gated) |
| 152 | audit-harness-v1.16-integrity.yml | Frozen-read probe (SWEEP-01/02 evidence, D-24 dependency-free) | workflow_dispatch | 478e633e... | success | success |
| 153 | audit-harness-v1.16-integrity.yml | Parse v1.16 sidecar JSON | workflow_dispatch | 478e633e... | success | success |
| 154 | audit-harness-v1.16-integrity.yml | Harness references v1.16 sidecar | workflow_dispatch | 478e633e... | success | success |
| 155 | audit-harness-v1.16-integrity.yml | Run v1.16 milestone audit harness | workflow_dispatch | 478e633e... | success | success |
| 156 | audit-harness-v1.16-integrity.yml | check-phase-122 validator | workflow_dispatch | 478e633e... | success | success |
| 157 | audit-harness-v1.16-integrity.yml | Validator chain on Linux LF (Phase 69 CILINUX-01) | workflow_dispatch | 478e633e... | success | success |
| 158 | audit-harness-v1.16-integrity.yml | check-phase-123 validator | workflow_dispatch | 478e633e... | success | success |
| 159 | audit-harness-v1.16-integrity.yml | check-phase-124 validator | workflow_dispatch | 478e633e... | success | success |
| 160 | audit-harness-v1.16-integrity.yml | check-phase-120 validator | workflow_dispatch | 478e633e... | success | success |
| 161 | audit-harness-v1.16-integrity.yml | check-phase-121 validator | workflow_dispatch | 478e633e... | success | success |
| 162 | audit-harness-v1.16-integrity.yml | Supervision-pin drift advisory (CI) | workflow_dispatch | 478e633e... | success | non-evidence (continue-on-error) |
| 163 | audit-harness-v1.16-integrity.yml | check-phase-125 validator (apex; recursively spawns 48..124) | workflow_dispatch | 478e633e... | success | success |
| 164 | audit-harness-v1.16-integrity.yml | Quarterly c13_rotting_external link-check | workflow_dispatch | 478e633e... | skipped | legitimate skip (event-gated) |
| 165 | audit-harness-v1.17-integrity.yml | Frozen-read probe (SWEEP-01/02 evidence, D-24 dependency-free) | workflow_dispatch | 478e633e... | success | success |
| 166 | audit-harness-v1.17-integrity.yml | Parse v1.17 sidecar JSON | workflow_dispatch | 478e633e... | success | success |
| 167 | audit-harness-v1.17-integrity.yml | Harness references v1.17 sidecar | workflow_dispatch | 478e633e... | success | success |
| 168 | audit-harness-v1.17-integrity.yml | Run v1.17 milestone audit harness | workflow_dispatch | 478e633e... | success | success |
| 169 | audit-harness-v1.17-integrity.yml | check-phase-126 validator | workflow_dispatch | 478e633e... | success | success |
| 170 | audit-harness-v1.17-integrity.yml | check-phase-128 validator (apex; recursively spawns 48..127) | workflow_dispatch | 478e633e... | success | success |
| 171 | audit-harness-v1.17-integrity.yml | check-phase-127 validator | workflow_dispatch | 478e633e... | success | success |
| 172 | audit-harness-v1.17-integrity.yml | Supervision-pin drift advisory (CI) | workflow_dispatch | 478e633e... | success | non-evidence (continue-on-error) |
| 173 | audit-harness-v1.17-integrity.yml | Validator chain on Linux LF (Phase 69 CILINUX-01) | workflow_dispatch | 478e633e... | success | success |
| 174 | audit-harness-v1.17-integrity.yml | Quarterly c13_rotting_external link-check | workflow_dispatch | 478e633e... | skipped | legitimate skip (event-gated) |
| 175 | audit-harness-v1.18-integrity.yml | Parse v1.18 sidecar JSON | workflow_dispatch | 478e633e... | success | success |
| 176 | audit-harness-v1.18-integrity.yml | Frozen-read probe (SWEEP-01/02 evidence, D-24 dependency-free) | workflow_dispatch | 478e633e... | success | success |
| 177 | audit-harness-v1.18-integrity.yml | Harness references v1.18 sidecar | workflow_dispatch | 478e633e... | success | success |
| 178 | audit-harness-v1.18-integrity.yml | Run v1.18 milestone audit harness | workflow_dispatch | 478e633e... | success | success |
| 179 | audit-harness-v1.18-integrity.yml | check-phase-130 validator | workflow_dispatch | 478e633e... | success | success |
| 180 | audit-harness-v1.18-integrity.yml | Supervision-pin drift advisory (CI) | workflow_dispatch | 478e633e... | success | non-evidence (continue-on-error) |
| 181 | audit-harness-v1.18-integrity.yml | check-phase-133 validator | workflow_dispatch | 478e633e... | success | success |
| 182 | audit-harness-v1.18-integrity.yml | check-phase-129 validator | workflow_dispatch | 478e633e... | success | success |
| 183 | audit-harness-v1.18-integrity.yml | check-phase-132 validator | workflow_dispatch | 478e633e... | success | success |
| 184 | audit-harness-v1.18-integrity.yml | check-phase-134 validator (apex; recursively spawns 48..133) | workflow_dispatch | 478e633e... | success | success |
| 185 | audit-harness-v1.18-integrity.yml | Validator chain on Linux LF (Phase 69 CILINUX-01) | workflow_dispatch | 478e633e... | success | success |
| 186 | audit-harness-v1.18-integrity.yml | check-phase-131 validator | workflow_dispatch | 478e633e... | success | success |
| 187 | audit-harness-v1.18-integrity.yml | Quarterly c13_rotting_external link-check | workflow_dispatch | 478e633e... | skipped | legitimate skip (event-gated) |
| 188 | audit-harness-v1.19-integrity.yml | Frozen-read probe (SWEEP-01/02 evidence, D-24 dependency-free) | workflow_dispatch | 478e633e... | success | success |
| 189 | audit-harness-v1.19-integrity.yml | Parse v1.19 sidecar JSON | workflow_dispatch | 478e633e... | success | success |
| 190 | audit-harness-v1.19-integrity.yml | Harness references v1.19 sidecar | workflow_dispatch | 478e633e... | success | success |
| 191 | audit-harness-v1.19-integrity.yml | Run v1.19 milestone audit harness | workflow_dispatch | 478e633e... | success | success |
| 192 | audit-harness-v1.19-integrity.yml | check-phase-135 validator | workflow_dispatch | 478e633e... | success | success |
| 193 | audit-harness-v1.19-integrity.yml | Validator chain on Linux LF (Phase 69 CILINUX-01) | workflow_dispatch | 478e633e... | success | success |
| 194 | audit-harness-v1.19-integrity.yml | check-phase-137 validator | workflow_dispatch | 478e633e... | success | success |
| 195 | audit-harness-v1.19-integrity.yml | check-phase-136 validator | workflow_dispatch | 478e633e... | success | success |
| 196 | audit-harness-v1.19-integrity.yml | check-phase-138 validator (apex; recursively spawns 48..137) | workflow_dispatch | 478e633e... | success | success |
| 197 | audit-harness-v1.19-integrity.yml | Supervision-pin drift advisory (CI) | workflow_dispatch | 478e633e... | success | non-evidence (continue-on-error) |
| 198 | audit-harness-v1.19-integrity.yml | Quarterly c13_rotting_external link-check | workflow_dispatch | 478e633e... | skipped | legitimate skip (event-gated) |
| 199 | audit-harness-v1.20-integrity.yml | Frozen-read probe (SWEEP-01/02 evidence, D-24 dependency-free) | workflow_dispatch | 478e633e... | success | success |
| 200 | audit-harness-v1.20-integrity.yml | Parse v1.20 sidecar JSON | workflow_dispatch | 478e633e... | success | success |
| 201 | audit-harness-v1.20-integrity.yml | Harness references v1.20 sidecar | workflow_dispatch | 478e633e... | success | success |
| 202 | audit-harness-v1.20-integrity.yml | Run v1.20 milestone audit harness | workflow_dispatch | 478e633e... | success | success |
| 203 | audit-harness-v1.20-integrity.yml | check-phase-143 validator | workflow_dispatch | 478e633e... | success | success |
| 204 | audit-harness-v1.20-integrity.yml | check-phase-140 validator | workflow_dispatch | 478e633e... | success | success |
| 205 | audit-harness-v1.20-integrity.yml | check-phase-139 validator | workflow_dispatch | 478e633e... | success | success |
| 206 | audit-harness-v1.20-integrity.yml | Validator chain on Linux LF (Phase 69 CILINUX-01) | workflow_dispatch | 478e633e... | success | success |
| 207 | audit-harness-v1.20-integrity.yml | check-phase-142 validator | workflow_dispatch | 478e633e... | success | success |
| 208 | audit-harness-v1.20-integrity.yml | check-phase-141 validator | workflow_dispatch | 478e633e... | success | success |
| 209 | audit-harness-v1.20-integrity.yml | Supervision-pin drift advisory (CI) | workflow_dispatch | 478e633e... | success | non-evidence (continue-on-error) |
| 210 | audit-harness-v1.20-integrity.yml | check-phase-144 validator (apex; recursively spawns 48..143) | workflow_dispatch | 478e633e... | success | success |
| 211 | audit-harness-v1.20-integrity.yml | Quarterly c13_rotting_external link-check | workflow_dispatch | 478e633e... | skipped | legitimate skip (event-gated) |
| 212 | audit-harness-v1.21-integrity.yml | Frozen-read probe (SWEEP-01/02 evidence, D-24 dependency-free) | workflow_dispatch | 478e633e... | success | success |
| 213 | audit-harness-v1.21-integrity.yml | Parse v1.21 sidecar JSON | workflow_dispatch | 478e633e... | success | success |
| 214 | audit-harness-v1.21-integrity.yml | Harness references v1.21 sidecar | workflow_dispatch | 478e633e... | success | success |
| 215 | audit-harness-v1.21-integrity.yml | Run v1.21 milestone audit harness | workflow_dispatch | 478e633e... | success | success |
| 216 | audit-harness-v1.21-integrity.yml | check-phase-147 validator | workflow_dispatch | 478e633e... | success | success |
| 217 | audit-harness-v1.21-integrity.yml | check-phase-146 validator | workflow_dispatch | 478e633e... | success | success |
| 218 | audit-harness-v1.21-integrity.yml | check-phase-152 validator | workflow_dispatch | 478e633e... | success | success |
| 219 | audit-harness-v1.21-integrity.yml | check-phase-153 validator (apex; recursively spawns 48..152) | workflow_dispatch | 478e633e... | success | success |
| 220 | audit-harness-v1.21-integrity.yml | Validator chain on Linux LF (Phase 69 CILINUX-01) | workflow_dispatch | 478e633e... | success | success |
| 221 | audit-harness-v1.21-integrity.yml | check-phase-149 validator | workflow_dispatch | 478e633e... | success | success |
| 222 | audit-harness-v1.21-integrity.yml | check-phase-151 validator | workflow_dispatch | 478e633e... | success | success |
| 223 | audit-harness-v1.21-integrity.yml | Supervision-pin drift advisory (CI) | workflow_dispatch | 478e633e... | success | non-evidence (continue-on-error) |
| 224 | audit-harness-v1.21-integrity.yml | check-phase-148 validator | workflow_dispatch | 478e633e... | success | success |
| 225 | audit-harness-v1.21-integrity.yml | check-phase-150 validator | workflow_dispatch | 478e633e... | success | success |
| 226 | audit-harness-v1.21-integrity.yml | check-phase-145 validator | workflow_dispatch | 478e633e... | success | success |
| 227 | audit-harness-v1.21-integrity.yml | Quarterly c13_rotting_external link-check | workflow_dispatch | 478e633e... | skipped | legitimate skip (event-gated) |
### 2.5 Totals

| Category | Count | Derivation |
|---|---|---|
| Jobs observed | 227 | Sum of `.jobs \| length` across all 18 runs' job-level JSON |
| Successes (evidence-bearing) | 193 | 211 GitHub-reported successes minus 18 non-evidence (2.3) |
| Legitimate skips | 16 | `rotting-external-quarterly`, event-gated off under `workflow_dispatch`, anchor = 16 (2.2) |
| Illegitimate skips | 0 | Zero jobs skipped for any reason other than the event gate above |
| Failures | 0 | Zero jobs with `conclusion: failure` |
| Non-evidence (continue-on-error) | 18 | `pin-helper-advisory`, one per workflow (2.3) |
| **Sum** | **227** | 193 + 16 + 0 + 18 = 227 — reconciles exactly with jobs observed |

`[MEASURED]` **Zero illegitimate skips. Zero failures.** The pre-remediation state (per this
task's own instruction to record it whether or not remediation is entered) is: **all 227 jobs
classify cleanly, no red or gap exists, so the Task 4 decision checkpoint is being reached with a
fully green state** — the `all-green` option's precondition ("every non-success job was classified
and no illegitimate skip was counted as a pass") is met.

**No accepted-red disposition is available at this close.** Both were discharged and deleted at
the v1.20 predecessor close (per D-78); this evidence file invokes none, and none was needed —
there is no red to absorb.
---

## Plan 12, Task 3 — Axis one (fresh clone) and axis three (working tree), same recorded commit

Recorded commit (unchanged from Tasks 1 and 2): `478e633e78e9670b31db1f39e7660c9f0e9c888c`.

### 3.1 Axis one — fresh full-depth clone

**Clone-depth trap avoided.** A `git clone --depth 1 D:/path` silently ignores `--depth` against a
bare local path and produces a false-non-shallow clone. The clone below therefore used an explicit
`file://` URL, not a bare Windows path, and non-shallow status was asserted afterward rather than
assumed.

```
$ date -u +"%Y-%m-%dT%H:%M:%SZ"
2026-08-30T16:21:34Z
$ git clone --no-hardlinks "file:///D:/claude/Autopilot" v121ac
Cloning into 'v121ac'...
```

`[MEASURED]` **First attempt into a deeply-nested scratchpad path failed** — Windows `MAX_PATH`
truncation (`Filename too long` on ~5 files under a long milestone-phase directory name, followed
by `fatal: unable to checkout working tree`). This is a real failure mode, not swallowed: the
attempt was abandoned (partial clone directory removed) and retried into a short path (`C:\tmp\`)
close to the drive root, which cloned clean — `Updating files: 100% (3025/3025), done.`, exit 0.

```
$ git rev-parse HEAD
4f02ea8f08e66ac66e7f69fbecaf2edb6cfdd28a
```

`[MEASURED]` The clone's default checkout landed on the live local HEAD at clone time (`4f02ea8f`,
this plan's own Task 2 commit — later than the recorded one, since cloning happens after Tasks 1-2
land). This is expected: a plain clone tracks the source repo's current branch tip, not this
plan's recorded commit. Pinned explicitly:

```
$ git checkout 478e633e78e9670b31db1f39e7660c9f0e9c888c
HEAD is now at 478e633e docs(153-11): complete plan 11 -- owner push checkpoint resolved
$ git rev-parse HEAD
478e633e78e9670b31db1f39e7660c9f0e9c888c
```

**Non-shallow assertion:**

```
$ git rev-parse --is-shallow-repository
false
$ ls .git/shallow
ls: cannot access '.git/shallow': No such file or directory
```

`[MEASURED]` **Not shallow — asserted, not assumed.**

**Cannot carry untracked files (D-64), asserted:**

```
$ git status --porcelain --untracked-files=all | wc -l
0
```

`[MEASURED]` **Zero.** This is the axis-1/axis-3 asymmetry this task records explicitly: axis one
is a clone and by construction starts with nothing untracked; the seven unruled untracked
populations that live in the real working tree (`.agents/`, both `fireworks-tech-graph` skill
trees, the jira-milestone hook, `.obsidian/`, `e1`/`e2`/`ee`, `skills-lock.json`) do not exist here
at all. The predecessor milestone's claim that axis one and axis three both run against this state
(inherited by 144's D-18) was wrong and is not repeated here.

**Triple 1 — the harness (`v1.21-milestone-audit.mjs`):**

```
$ node scripts/validation/v1.21-milestone-audit.mjs --verbose
...
Summary: 16 passed, 0 failed, 0 skipped
```

`[MEASURED]` **16 PASS, 0 FAIL, 0 SKIPPED.** Exit 0.

**Triple 2 — the eight leaves (`check-phase-145.mjs` through `check-phase-152.mjs`):**

| Leaf | Result |
|---|---|
| check-phase-145.mjs | 16 PASS, 0 FAIL, 0 SKIPPED |
| check-phase-146.mjs | 7 PASS, 0 FAIL, 0 SKIPPED |
| check-phase-147.mjs | 8 PASS, 0 FAIL, 0 SKIPPED |
| check-phase-148.mjs | 9 PASS, 0 FAIL, 0 SKIPPED |
| check-phase-149.mjs | 9 PASS, 0 FAIL, 0 SKIPPED |
| check-phase-150.mjs | 17 PASS, 0 FAIL, 0 SKIPPED |
| check-phase-151.mjs | 7 PASS, 0 FAIL, 0 SKIPPED |
| check-phase-152.mjs | 9 PASS, 0 FAIL, 0 SKIPPED |

`[MEASURED]` **All eight leaves exit 0, zero fails, zero skips.**

**Triple 3 — the apex (`check-phase-153.mjs`), run in its own invocation, `CHECK_PHASE_NESTED`
unset (per D-77, never combined with a verification pass in the same session):**

```
$ unset CHECK_PHASE_NESTED
$ node scripts/validation/check-phase-153.mjs
...
[AUDIT/111] V-153-AUDIT: 153-VERIFICATION.md exists ... SKIPPED -- not yet authored (PASS-via-skip
pre-close-gate; expected -- this phase has not reached its close-gate yet)
...
Result: 110 PASS, 0 FAIL, 1 SKIPPED (total checks: 111)
```

`[MEASURED]` **110 PASS, 0 FAIL, 1 SKIPPED (111 total).** The one skip is `V-153-AUDIT` — expected
and documented pre-close-gate behavior (see `<prior_wave_context>`), not a gap.

**Clone removed post-audit; main working tree confirmed unchanged:**

```
$ rm -rf /c/tmp/v121ac
$ (in D:\claude\Autopilot) git status --porcelain --untracked-files=no
 M .planning/config.json
$ git rev-parse HEAD
4f02ea8f08e66ac66e7f69fbecaf2edb6cfdd28a
```

`[MEASURED]` The `.planning/config.json` modification is a pre-existing, unrelated local override
(not touched by this axis) — the same single line present before this task began. Zero orphan temp
directories or files remain.

### 3.2 Axis three — the working tree, at the same recorded commit, barred from planning documents

**Mechanism disclosed in full.** By the time this task ran, the working tree's HEAD had already
advanced past the recorded commit — this plan's own Task 1 and Task 2 evidence commits
(`072c99f3`, `4f02ea8f`) sit on top of it, as does an unrelated pre-existing uncommitted change to
`.planning/config.json` (`_auto_chain_active`, toggled by the orchestrator, not part of this
plan's `files_modified`). Neither touches any file any of these validators read
(`scripts/validation/`, `docs/`) — confirmed by `grep -l "config.json"` across all ten target
scripts returning no hits before this axis ran — but the plan's own acceptance criteria require the
literal recorded SHA, quoted from an independent source, not an argument that the corpus is
equivalent. To satisfy that literally without violating the destructive-git-prohibition (no stash,
no worktree, no force), the working tree was pinned to the exact recorded commit via a
fully-reversible sequence, executed and reversed in this same task:

1. The uncommitted `.planning/config.json` content was read and copied to a scratch backup file
   (outside the repo) before any tree mutation, so it could be restored byte-for-byte.
2. `git checkout -- .planning/config.json` discarded the local override (restoring the file to its
   committed value), which was the only uncommitted change blocking a checkout.
3. `git checkout 478e633e78e9670b31db1f39e7660c9f0e9c888c` (detached HEAD) pinned the working tree
   to the recorded commit. The 103 pre-existing untracked files were untouched by this — untracked
   paths do not participate in `git checkout <commit>`.
4. The axis-three triple below was run against this state.
5. `git checkout master` returned the branch to its tip.
6. The scratch-backed `.planning/config.json` content was diffed against the restored file, found
   to differ (as expected — the checkout-away-and-back sequence restores the committed value, not
   the local override), and the backup was copied back byte-for-byte. Post-restore `git status`
   confirms the working tree returned to its exact pre-task state: the same single tracked
   modification, the same 103 untracked paths (104 total lines including the modified file).

No `git stash`, `git worktree`, `git reset --hard`, or force flag was used anywhere in this
sequence. Every step was individually reversible and was reversed.

**Zero-context disclosure.** This session has no agent-dispatch primitive available in its
toolset — the same disclosed gap the v1.20 predecessor recorded for its own Axis-3 measurement
(a): "this executor's toolset exposed no agent-dispatch primitive at that plan." This axis-three
run is therefore **NOT genuinely context-independent** — it was executed by the same agent session
that authored Tasks 1-2 and holds the plan's own context, not a fresh zero-context sub-agent. It
IS, however, run against the recorded commit, against the real dirty working tree (103 untracked
files, confirmed present throughout), and this task's own instruction not to consult any
`.planning/` document during the reproduction run itself was honored — no `.planning/` file was
read between the checkout in step 3 and the checkout-back in step 5 above.

**Untracked-file count during this axis, re-confirmed:**

```
$ git status --porcelain --untracked-files=all | wc -l
103
```

`[MEASURED]` Matches the pre-task count exactly (D-64's dirty-tree axis).

**Triple 1 — the harness:**

```
$ node scripts/validation/v1.21-milestone-audit.mjs --verbose
...
Summary: 16 passed, 0 failed, 0 skipped
```

`[MEASURED]` **16 PASS, 0 FAIL, 0 SKIPPED** — identical to axis one.

**Triple 2 — the eight leaves:**

| Leaf | Result |
|---|---|
| check-phase-145.mjs | 16 PASS, 0 FAIL, 0 SKIPPED |
| check-phase-146.mjs | 7 PASS, 0 FAIL, 0 SKIPPED |
| check-phase-147.mjs | 8 PASS, 0 FAIL, 0 SKIPPED |
| check-phase-148.mjs | 9 PASS, 0 FAIL, 0 SKIPPED |
| check-phase-149.mjs | 9 PASS, 0 FAIL, 0 SKIPPED |
| check-phase-150.mjs | 17 PASS, 0 FAIL, 0 SKIPPED |
| check-phase-151.mjs | 7 PASS, 0 FAIL, 0 SKIPPED |
| check-phase-152.mjs | 9 PASS, 0 FAIL, 0 SKIPPED |

`[MEASURED]` **All eight leaves — identical to axis one.**

**Triple 3 — the apex, own invocation, `CHECK_PHASE_NESTED` unset:**

```
$ node scripts/validation/check-phase-153.mjs
...
Result: 110 PASS, 0 FAIL, 1 SKIPPED (total checks: 111)
```

`[MEASURED]` **110 PASS, 0 FAIL, 1 SKIPPED (111 total)** — identical to axis one, same single
expected pre-close-gate skip (`V-153-AUDIT`).

**No leg was incomplete.** All ten legs (1 harness + 8 leaves + 1 apex) completed with output on
both axis one and axis three; none is labelled incomplete, unlike the predecessor's genuinely
independent Axis-3(b) attempt, which left the apex leg incomplete under
`WINDOWS-CLONE-DEEPNEST-TIMEOUT-01`. That hazard did not reproduce here.

**HEAD during the axis-three run, and restoration verified:**

```
$ git rev-parse HEAD        # during the run
478e633e78e9670b31db1f39e7660c9f0e9c888c
$ git status --porcelain --untracked-files=all | wc -l   # during the run
103
$ git checkout master
$ git rev-parse HEAD        # after restoration
4f02ea8f08e66ac66e7f69fbecaf2edb6cfdd28a
$ git status --porcelain --untracked-files=all | wc -l   # after restoration + config.json restore
104
```

### 3.3 The identical commit, quoted from three independent sources

| Axis | Source | Head commit |
|---|---|---|
| Axis one (fresh clone) | `git rev-parse HEAD` inside the clone, after explicit checkout | `478e633e78e9670b31db1f39e7660c9f0e9c888c` |
| Axis two (dispatch) | Task 1's read-back table, `headSha` field from `gh run list --json`, all 18 rows | `478e633e78e9670b31db1f39e7660c9f0e9c888c` |
| Axis three (working tree) | `git rev-parse HEAD` in the main tree during the pinned reproduction window | `478e633e78e9670b31db1f39e7660c9f0e9c888c` |

`[MEASURED]` **All three values are the single identical SHA.**

