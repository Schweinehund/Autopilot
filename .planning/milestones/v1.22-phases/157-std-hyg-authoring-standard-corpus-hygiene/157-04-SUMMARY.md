---
phase: 157-std-hyg-authoring-standard-corpus-hygiene
plan: 04
subsystem: docs-tooling-validation
tags: [std-02, google-style, prose-gate, sweep3, check-py, self-test, requirements-supersession]

requires:
  - phase: 157-std-hyg-authoring-standard-corpus-hygiene
    plan: 03
    provides: "HYG-02 corpus-wide closure (all three leak needles already at 0 before this
      plan's gate folds them in as a standing regression guard)"
provides:
  - "scripts/validation/check-prose-style.py: standalone STD-02 mechanical gate, gating
    exactly anthropomorphism + person-first (with sweep3-imported protection filter and two
    named exemptions), recording vague-link/empty-alt as structurally incapable of firing"
  - "A --self-test mode (7 cases) that runs on every invocation and would have caught the
    phase's own dead-regex draft on its first run"
  - "The three HYG-02 leak needles folded into the gate as a standing regression guard"
  - "REQUIREMENTS.md's falsified 2026-08-24 measured preamble annotated-and-superseded with a
    corrected, corpus-named figure, apex chain and check-phase-54.mjs measured unmoved"
affects: [159]

actuals:
  tokens: 6600
  tasks: 3
  commits: 2

tech-stack:
  added: []
  patterns:
    - "Dependency import by file location (importlib.util.spec_from_file_location), never by
      package name, so the gate always finds the real check.py/sweep3.py regardless of cwd"
    - "Two-tier root resolution: dependency locations resolved relative to the gate script's
      own __file__ (works even from an empty/foreign repo); corpus enumeration and file
      reads resolved relative to `git rev-parse --show-toplevel` (reflects the invoking cwd)"
    - "mask_code()'s same-length whitespace substitution preserves character offsets, so a
      regex match found against the masked line can be checked for PROTECT-span containment
      against the raw line at the identical offset -- no need to reimplement masking to get
      position-accurate protection filtering"
    - "--self-test as a mandatory anti-vacuity gate that runs every invocation, not a one-time
      perturb-and-restore, with paired positive/negative controls (fires on synthetic
      violation; protection filter suppresses quoted / does not suppress unquoted)"

key-files:
  created:
    - scripts/validation/check-prose-style.py
  modified:
    - .planning/REQUIREMENTS.md

key-decisions:
  - "Task 1 checkpoint (owner-resolved before this executor ran): freeze the D-15/D-18
    narrowing wording as drafted, in the gate's own header comment, following
    check-nav-hub-links.mjs's header-doctrine precedent rather than a separate planning
    document or amended wording."
  - "Python, not a .mjs matching the scripts/validation/ directory's dominant convention,
    because D-03 forbids reimplementing sweep3.py's PROTECT/skip-set logic -- only Python
    lets the gate import the real symbols by file location."
  - "Dependency resolution is split into two roots: check.py/sweep3.py are located via the
    gate script's own __file__ (always finds the real files); the corpus and check.py
    subprocess cwd are located via `git rev-parse --show-toplevel` (reflects the caller's
    repo). This lets the empty-repo self-test scenario correctly report an empty
    enumeration instead of a spurious 'dependency not found' error."
  - "person-first's raw count (86) is read from check.py's own subprocess stdout (positional
    parse); the filtered/unprotected count is computed independently by re-running the same
    imported regex against check.py's own mask_code() output and sweep3's real PROTECT
    filter chain -- not by trying to recover per-hit column offsets from check.py's text
    output, which the tool does not print."
  - "REQUIREMENTS.md:62 is annotated, not rewritten in place -- the original 9,363 figure and
    2026-08-24 date remain verbatim, per D-07's supersession ruling."

requirements-completed: [STD-02]

coverage:
  - id: D1
    description: "scripts/validation/check-prose-style.py exists, is standalone (no chain,
      no CI workflow), gates exactly anthropomorphism + person-first with sweep3-imported
      protection filtering and two named exemptions, and records vague-link/empty-alt,
      em-dash, Android-admin and headings as permanent/dead exclusions in its own header"
    requirement: STD-02
    verification:
      - kind: automated_ui
        ref: "python scripts/validation/check-prose-style.py --self-test"
        status: pass
      - kind: automated_ui
        ref: "python scripts/validation/check-prose-style.py"
        status: pass
      - kind: integration
        ref: "python -c \"import ast...\" gate-structure assertion (ls-files/sweep3/PROTECT/check.py/--self-test/no shell=True/no os.system)"
        status: pass
      - kind: integration
        ref: "empty-repo enumeration test (mktemp -d; git init; run gate) exits non-zero with a stated reason"
        status: pass
      - kind: integration
        ref: "two consecutive normal runs diff -q byte-identical"
        status: pass
      - kind: integration
        ref: ".github/ unchanged; check-phase-153.mjs does not reference check-prose-style"
        status: pass
    human_judgment: false
  - id: D2
    description: "REQUIREMENTS.md's falsified 2026-08-24 measured preamble (9,363 candidates,
      'No rule class is at zero') is annotated and superseded with a corrected, corpus-named
      figure (10,402), without disturbing any live validator that reads the file"
    requirement: STD-03
    verification:
      - kind: integration
        ref: "grep for 10,402 + 9,363 + git ls-files/294 in REQUIREMENTS.md"
        status: pass
      - kind: integration
        ref: "grep for vague-link/empty-alt + anthropomorphism naming the zero classes"
        status: pass
      - kind: integration
        ref: "node scripts/validation/check-phase-153.mjs (apex chain, 111 PASS / 0 FAIL, matches 157-BASELINE.json)"
        status: pass
      - kind: integration
        ref: "node scripts/validation/check-phase-54.mjs (32 PASS / 0 FAIL)"
        status: pass
      - kind: integration
        ref: "git diff on STD-01..STD-04 rows is empty (byte-unchanged)"
        status: pass
    human_judgment: false

duration: 45min
completed: 2026-09-06
status: complete
---

# Phase 157 Plan 04: STD-02 Mechanical Gate + REQUIREMENTS.md Supersession Summary

**A standalone `check-prose-style.py` gate over exactly anthropomorphism + person-first, backed by a `--self-test` that proves both rules can fire and the sweep3-imported protection filter both suppresses and doesn't-suppress correctly, plus a corrected, corpus-named REQUIREMENTS.md preamble measured unmoved against the apex chain.**

## Performance

- **Duration:** 45 min
- **Completed:** 2026-09-06T01:44:41Z
- **Tasks:** 3 (1 checkpoint, already resolved by the owner before this executor ran; 2 auto)
- **Files created:** 1
- **Files modified:** 1

## Checkpoint Resolution (Task 1)

**Type:** `checkpoint:decision`, `gate="blocking"`
**Resolved by:** the owner, before this executor was spawned (per the orchestrator's
`checkpoint_already_resolved` briefing) — **not** re-presented or re-litigated here.
**Decision:** Confirm the D-15/D-18 narrowing wording before it is frozen into the gate's
permanent exclusion record.
**Selection:** `freeze-as-drafted` — "Freeze as drafted, in the gate's own header comment."
The owner took the default option (matching `check-nav-hub-links.mjs`'s header-doctrine
precedent) and supplied no amended wording.
**Outcome:** The D-15 and D-18 narrowing records, using the plan's Task 1 `<context>` wording
verbatim (149 distinct identifiers / 360 occurrences / 104 files for D-15; the four-bucket
666-occurrence / 607-line census for D-18), are written into
`scripts/validation/check-prose-style.py`'s own header comment block, beside the code that
implements the narrowed leak-class needles.

## Accomplishments

- **STD-02 mechanical gate authored and proven able to fire.** `scripts/validation/check-prose-style.py`
  gates exactly the two rules that can report zero on unprotected prose — `anthropomorphism`
  and `person-first` — and records `vague-link`/`empty-alt` as structurally incapable of
  firing (dead behind `check.py`'s `mask_code()`), not merely "reporting zero." Its
  `--self-test` mode (7 labelled cases, all passing) runs on every invocation, proving each
  gated rule fires on a synthetic violation and that the protection filter both suppresses a
  quoted match and does not suppress an unquoted one — the exact anti-vacuity proof this
  phase's own draft lacked when it shipped two dead regexes as "gated at zero."
- **The person-first protection filter reuses `sweep3.py`'s real `PROTECT`/`HEADING`/
  `FENCE`/`KEEP_LINE`/`quoted_lines`, imported by file location, never reimplemented.** Applied
  in sweep3's own filter order against the real corpus, this reduces person-first from 86 raw
  hits to 2 mechanical survivors, which are then subtracted by two named, path-plus-line-content
  exemptions (never by line number) down to exactly 0 — matching D-03's measurement exactly.
- **The three HYG-02 leak needles are folded into the gate** as a standing regression guard
  (literal `.planning/`, FIX-11's two-prefix criterion, and the widened class needle excluding
  `docs/_standards/`/`docs/_registry/`), all measuring 0 against the current corpus.
- **REQUIREMENTS.md's falsified measured preamble is annotated and superseded**, not deleted:
  the original 9,363/2026-08-24 text stands, with an adjacent `[SUPERSEDED 2026-09-05]`
  annotation giving the corrected 10,402 figure, naming the corpus it was measured over (this
  repository's tracked `docs/` tree, 294 files via `git ls-files`), the four class-level
  deltas, and stating that "No rule class is at zero" was necessarily false when written, not
  merely stale.
- **Every live reader of REQUIREMENTS.md measured unmoved:** the apex chain
  (`check-phase-153.mjs`) reports 111 PASS / 0 FAIL / 0 SKIPPED, matching `157-BASELINE.json`'s
  recorded apex exactly; `check-phase-54.mjs` (the most exposed reader, including its recursive
  `.planning/`-tree walk) reports 32 PASS / 0 FAIL.

## Task Commits

1. **Task 2: Author the standalone prose-style gate with its self-test and its exclusion
   record** — `1e80bfc5` (feat)
2. **Task 3: Annotate and supersede the falsified measured preamble in REQUIREMENTS.md** —
   `da11b7bf` (docs)

_Task 1 was a `checkpoint:decision` resolved by the owner before this executor ran; it carries
no code commit of its own — its resolution (freeze-as-drafted) shaped Task 2's header comment._

**Plan metadata:** recorded in this SUMMARY's own commit (below).

## Files Created/Modified

- `scripts/validation/check-prose-style.py` — new standalone STD-02 gate (474 lines). Gates
  `anthropomorphism` + `person-first`; records `vague-link`/`empty-alt`, the em-dash rule, the
  Android-`admin` class, and headings as permanent/dead exclusions in its own header; folds in
  the three HYG-02 leak needles; carries a mandatory `--self-test`.
- `.planning/REQUIREMENTS.md` — 2-line supersession annotation added immediately after the
  original 2026-08-24 measured preamble at line 62; STD-01..STD-04 rows untouched.

## Full Gate Output (verbatim, recorded per this plan's `<output>` instruction)

### `--self-test` (exit 0)

```
[ST] anthropomorphism fires on a synthetic violation ......................... PASS
[ST] person-first fires on a first-person-plural synthetic violation ......... PASS
[ST] protection filter SUPPRESSES a person-first match inside a quoted span .. PASS
[ST] protection filter does NOT suppress a person-first match on unquoted prosePASS
[ST] leak needle 'literal' (.planning/) fires on synthetic line .............. PASS
[ST] leak needle 'fix11' (two-prefix) fires on synthetic line ................ PASS
[ST] leak needle 'class' (PITFALLS[.md]) fires on synthetic line ............. PASS

Self-test: 7 passed, 0 failed
```

### Normal mode, against the live corpus (exit 0, ~63s wall time)

```
file-count floor: 294 per-file headers == 294 enumerated files ............... PASS
anthropomorphism == 0 (0 found) .............................................. PASS
person-first unprotected == 0 (86 raw, 2 named exemptions, 0 unprotected) .... PASS
leak needle 'literal' (.planning/) == 0 (0 found) ............................ PASS
leak needle 'fix11' (two-prefix) == 0 (0 found) .............................. PASS
leak needle 'class' (planning-artifact names) == 0 (0 found) ................. PASS

check-prose-style summary: all assertions PASS -- 0 findings across the gated slice
```

### Apex chain re-measurement after the REQUIREMENTS.md edit (`check-phase-153.mjs`)

```
Result: 111 PASS, 0 FAIL, 0 SKIPPED (total checks: 111)
```
Matches `157-BASELINE.json`'s recorded `apex: {pass: 111, fail: 0, skipped: 0}` exactly.

### `check-phase-54.mjs` (the requirements-file reader most exposed to this edit)

```
Summary: 32 passed, 0 failed, 0 skipped
```

## Decisions Made

- **Task 1 checkpoint:** freeze-as-drafted (owner-resolved before execution; see "Checkpoint
  Resolution" above).
- **Python over `.mjs`:** required by D-03's prohibition on reimplementing `sweep3.py`'s
  protection logic — only Python lets the gate import the real `PROTECT`/`HEADING`/`FENCE`/
  `KEEP_LINE`/`quoted_lines` symbols by file location.
- **Two-root dependency resolution:** `check.py`/`sweep3.py` are located relative to the gate
  script's own `__file__` (always correct, independent of cwd); the corpus and the `check.py`
  subprocess's cwd are located via `git rev-parse --show-toplevel` (reflects wherever the gate
  is invoked from). This split is what makes the empty-repo self-test scenario report a true
  empty-enumeration failure rather than a misleading "dependency not found" error.
- **person-first counting split in two:** the raw count (86) comes from parsing `check.py`'s
  own subprocess stdout positionally (never substring-matching a rule name); the
  filtered/unprotected count is computed independently, re-running the same imported
  `person-first` regex against `check.py`'s own `mask_code()` output (which preserves character
  offsets via same-length whitespace substitution) and checking those offsets against
  `sweep3.PROTECT` spans computed on the raw line — because `check.py`'s printed hit lines carry
  no column offset to recover.
- **REQUIREMENTS.md:62 annotated, not rewritten:** per D-07, the original 9,363/2026-08-24 text
  is retained verbatim; the correction is an adjacent superseding paragraph.

## Deviations from Plan

None — plan executed exactly as written. Both source-of-truth corrections named in Task 2's
`<read_first>` (the `person-first` `RULES`-vs-`word-list.md` correction, and the true
`check.py` line numbers for the anthropomorphism tuple / guidance-embedding code / print call)
were independently re-verified against the actual file contents during this session before any
code was written, and matched the plan's corrected figures exactly (lines 27-29, 38, 125-134,
152).

**Total deviations:** 0.
**Impact on plan:** None — no scope creep, no auto-fixes required.

## Issues Encountered

- The Bash tool environment's `/tmp` (Git Bash / MSYS) is not visible to the Windows-native
  `python` interpreter used to run the gate; validation scratch files were written to the
  session's scratchpad directory instead. This affected only ad hoc verification commands
  during authoring, not the shipped gate (which never writes outside its own `tempfile.mkdtemp()`
  in `--self-test` mode, and never writes to the corpus in normal mode).

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- STD-02 is discharged: a standalone, self-proving mechanical gate exists over exactly the
  slice that can report zero, with its permanent exclusion record (em-dash, Android-`admin`,
  headings, vague-link/empty-alt) stated inline with true mechanisms and unprotected counts.
- STD-03's non-gate rule is now written down in the gate's own header, per this plan's design
  (the standard-section and `check.py` docstring / `RESUME.md` copies are plan 07's job, not
  this plan's).
- Phase 159 has a concrete, currently-green artifact to promote into a `check-phase-157.mjs`
  leaf and its enforcing CI job (which will need `actions/setup-python`, per D-10) — this plan
  performs none of that wiring itself, by design (D-09, D-32).
- REQUIREMENTS.md's preamble no longer asserts a false claim, and every live reader of the file
  (apex chain + `check-phase-54.mjs`) is confirmed unmoved.
- No blockers for the remaining phase 157 plans (05, 06, 07).

---
*Phase: 157-std-hyg-authoring-standard-corpus-hygiene*
*Completed: 2026-09-06*
