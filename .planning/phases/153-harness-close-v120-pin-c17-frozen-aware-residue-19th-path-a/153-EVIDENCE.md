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

<!-- gsd:write-continue -->
