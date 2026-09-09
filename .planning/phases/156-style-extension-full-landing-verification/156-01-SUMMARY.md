---
phase: 156-style-extension-full-landing-verification
plan: 01
subsystem: docs-tooling
tags: [python, git-diff, judge-packets, pins2, sweep3, gate-baseline, verification]

# Dependency graph
requires:
  - phase: 154-style-landing-merge-the-verified-google-style-pass
    provides: the merged 280-file Google-style pass, _CONTENT-PINS.txt (562 pins), sweep3.py, judge-packets.py, verify2.py
  - phase: 155-rcp-walk-up-avd-kiosk-recipe-formalization
    provides: RE-237 finalized prose (28 [PILOT] markers), the 155-GATE-BASELINE.json shape precedent
provides:
  - judge-packets.py scoped to its walk root with a returncode-checked BASE guard and an empty-bin-safe --chunk-file writer
  - pins2.py argv-ified (validator dir + corpus root), with a deterministic (insertion-ordered) literal dedup fix
  - 156-TARGETS.txt: the 13 batch-10 document paths every later plan's corpus-edit gate greps against
  - 156-LIVE-PINS-before.txt: a live-corpus (docs/) pin baseline, 685 pins, alongside the untouched 562-pin _CONTENT-PINS.txt
  - 156-GATE-BASELINE.json pin_coverage block: 117 live validator literals present in the 13 / 39 pinned / 78 unpinned, per-validator attribution
  - 156-GATE-BASELINE.json guards block: the Sure Admin perturb-and-restore proof, the corrected grep -rc detector, the re-measured [PILOT] count (28), and the full D-09/D-10/D-11/D-12/D-36 landmine register
affects: [156-02, 156-03, 156-04, 156-05, 156-06]

actuals:
  tokens: 12083
  tasks: 3
  commits: 3

tech-stack:
  added: []
  patterns:
    - "Perturb-and-restore non-vacuity proof (D-06): before trusting a guard/detector, deliberately break it and confirm it now fails, then confirm the shipped form still passes"
    - "Resolve the repository root explicitly inside a walk-root-scoped git tool rather than joining paths against the walk root directly"
    - "Insertion-ordered dict in place of a bare set() when a script's output must be byte-reproducible across process invocations (str hash randomization breaks set iteration order across runs)"

key-files:
  created:
    - .planning/phases/156-style-extension-full-landing-verification/156-TARGETS.txt
    - .planning/phases/156-style-extension-full-landing-verification/156-LIVE-PINS-before.txt
    - .planning/phases/156-style-extension-full-landing-verification/156-GATE-BASELINE.json
  modified:
    - scripts/docs-style/judge-packets.py
    - scripts/docs-style/pins2.py

key-decisions:
  - "_CONTENT-PINS.txt stays byte-unchanged at 562 pins (D-08); the live-corpus pin list is a separate sibling file, not a replacement"
  - "Per-validator unpinned-literal attribution measured 117/39/78 exactly matching CONTEXT.md's D-08 prediction in total, but the per-validator breakdown differs (measured: check-phase-67/-147 plus four milestone-audit.mjs files instead of the predicted check-phase-135/-136/-50/-146/check-nav-hub-links) -- both recorded per the plan's own instruction to record what is measured, not the prediction"
  - "pins2.py's lits collection changed from set() to an insertion-ordered dict (Rule 1 auto-fix) -- a bare set() made two runs over the identical corpus emit equal-length pin ties in a different order each process, which would have made 156-LIVE-PINS-before.txt's own committed-vs-fresh-run diff check nondeterministic"

patterns-established:
  - "A committed measurement baseline that must be reproducible-by-fresh-run needs its generator's tie-breaking to be free of hash-randomization-dependent ordering, not just its primary sort key"

requirements-completed: [STYLE-02, VERIFY-02, VERIFY-04]

coverage:
  - id: D1
    description: "judge-packets.py scopes to its walk root, checks the git returncode, and never writes an empty --chunk-file packet"
    requirement: VERIFY-04
    verification:
      - kind: unit
        ref: "python -c AST/structure check (rev-parse/--show-toplevel, returncode, judge-packets: token present)"
        status: pass
      - kind: integration
        ref: "python scripts/docs-style/judge-packets.py 8de413aae65387a6b381fd34f70f65128592f65d docs vs . -- docs=385, full=386, non-docs leak=0, 386-1=385"
        status: pass
      - kind: integration
        ref: "invalid BASE (deadbeef...) exits 1 with 'judge-packets: git diff failed for BASE' on stderr"
        status: pass
      - kind: integration
        ref: "--chunk-file with HEAD base (0-file worklist) writes 0 chunk files and prints the judge-packets: summary line"
        status: pass
    human_judgment: false
  - id: D2
    description: "pins2.py takes validator dir and corpus root from argv with both prior hardcoded defaults preserved, and produces a reproducible live-corpus pin baseline"
    requirement: VERIFY-04
    verification:
      - kind: integration
        ref: "python scripts/docs-style/pins2.py (no args) still resolves the two original D:/ hardcoded paths -- exit 0, 603 pinned against the scratch corpus"
        status: pass
      - kind: integration
        ref: "python scripts/docs-style/pins2.py scripts/validation docs run twice, diff -q clean (685 pins both times)"
        status: pass
      - kind: unit
        ref: "git diff --exit-code -- scripts/docs-style/_CONTENT-PINS.txt (562 pins, byte-unchanged)"
        status: pass
    human_judgment: false
  - id: D3
    description: "Real pin coverage over the 13 batch-10 documents measured and recorded with closing arithmetic"
    requirement: STYLE-02
    verification:
      - kind: unit
        ref: "python -c pin_coverage arithmetic check: 117 == 39 + 78"
        status: pass
    human_judgment: false
  - id: D4
    description: "Sure Admin guard proven to fire via perturb-and-restore; vacuous grep -c detector demonstrated and replaced with grep -rc"
    requirement: STYLE-02
    verification:
      - kind: integration
        ref: "sweep3.py dry run: shipped TSV row = 0 edits, (?<!Sure )-stripped row = 20 edits on scratch copy of docs/operations/firmware-bios/03-hp-bios-configuration.md"
        status: pass
      - kind: unit
        ref: "grep -rc 'Sure Administrator' docs/ --include='*.md' | awk -F: sums to 0"
        status: pass
    human_judgment: false
  - id: D5
    description: "Landmine register (D-09 armed literals, D-10 negative assertions, D-11 V-135 content assertions, D-12 frontmatter vector, D-36 negative walkers) recorded in 156-GATE-BASELINE.json guards block, each with a runnable re-check"
    requirement: VERIFY-02
    verification:
      - kind: unit
        ref: "python -c guards-block key presence + corrected-detector + vacuous-demonstration assertions"
        status: pass
      - kind: integration
        ref: "node scripts/validation/check-phase-153.mjs (bare) -- 111 PASS, 0 FAIL, 0 SKIPPED"
        status: pass
    human_judgment: false

duration: 40min
completed: 2026-09-05
status: complete
---

# Phase 156 Plan 01: Tooling Fix + Guard Register Summary

**Fixed two tools capable of reporting a confident wrong zero (judge-packets.py's walk-root scoping, pins2.py's stale-corpus argv), then proved the Sure Admin guard fires and recorded the full batch-10 landmine register — all before any corpus edit exists to measure.**

## Performance

- **Duration:** ~40 min
- **Started:** 2026-09-05T02:13:22Z (first task commit)
- **Completed:** 2026-09-05T02:36:45Z (last task commit)
- **Tasks:** 3
- **Files modified:** 5 (2 modified tools, 3 new phase-dir artifacts)

## Accomplishments

- `judge-packets.py` now resolves the repository root, filters `git diff --name-only` output to the requested walk root (not just the `.md` suffix), raises a named `SystemExit` on a bad BASE, and never writes an empty `--chunk-file` packet. Proven non-vacuous: walk root `.` reports 386 hunks, walk root `docs` reports 385 (386 minus the 1 non-`docs/` entry that used to leak through), and an invalid BASE now exits 1 instead of silently reporting zero.
- `pins2.py` takes its validator directory and corpus root from `argv[1]`/`argv[2]` with both original `D:/` hardcoded paths preserved as defaults. A latent non-determinism bug (its `lits` dedup used a bare `set()`, whose iteration order is randomized per Python process) was fixed by switching to an insertion-ordered dict, making the committed `156-LIVE-PINS-before.txt` genuinely reproducible from a fresh run — verified twice.
- `156-LIVE-PINS-before.txt` (685 pins from the live `docs/` corpus) committed beside the untouched, byte-identical 562-pin `_CONTENT-PINS.txt`, per D-08's discretionary choice.
- Real pin coverage over the 13 batch-10 documents measured: 117 live validator literals present, 39 already pinned, 78 unpinned — arithmetic closes exactly, and the total matches CONTEXT.md's D-08 prediction, though the per-validator attribution differs (recorded both).
- The Sure Admin guard's `(?<!Sure )` lookbehind proven to fire by perturb-and-restore (dry run only, scratch directory outside the repo): shipped TSV row = 0 edits, perturbed row = 20 edits on the HP BIOS document — matching D-06's predicted 20 exactly.
- The vacuous `grep -c "Sure Administrator" docs/` detector demonstrated (`Is a directory`, exit 2, prints 0) and replaced with the standing `grep -rc ... | awk -F: '{s+=$2}'` form (measured 0 corpus-wide).
- RE-237's `[PILOT]` count re-measured fresh at HEAD (28), not inherited from Phase 155's SUMMARY, with an explicit `mechanically_enforced: false` note naming the SKILL.md protected-signal paragraph as the only site that documents it.
- Full landmine register recorded in `156-GATE-BASELINE.json`'s `guards` block: D-09's two armed literals (unpinned sentences required by `check-phase-151.mjs`/`check-phase-150.mjs`), D-10's four negative assertions no pin differ can ever see (with the bare `check-phase-153.mjs` apex, 111 PASS/0 FAIL, recorded as the per-commit remedy), D-11's six surviving `V-135-*` content assertions, D-12's frontmatter vector over the 13 (13 `audience: admin`, 6 `owner: Intune Admin Lead`, 0 leading HTML comments), and D-36's three negative platform-token walkers plus the amendment-sensitive `V-54-21`.

## Task Commits

Each task was committed atomically:

1. **Task 1: Scope judge-packets.py to its walk root, check the git returncode, and guard the empty bin** - `655654f2` (fix)
2. **Task 2: argv-ify pins2.py, build the live-corpus pin baseline, and measure the real pin coverage over the 13** - `35af37ea` (feat)
3. **Task 3: Prove the Sure Admin guard fires, and record the landmine register the batch will be checked against** - `d3c7b4f3` (docs)

**Plan metadata:** committed after this SUMMARY (see final commit below).

## Files Created/Modified

- `scripts/docs-style/judge-packets.py` - walk-root scoping, returncode-checked BASE guard, empty-bin-safe `--chunk-file`, UTF-8 stdout reconfigure
- `scripts/docs-style/pins2.py` - argv-ified validator dir / corpus root (defaults preserved), deterministic `lits` dedup
- `.planning/phases/156-style-extension-full-landing-verification/156-TARGETS.txt` - the 13 batch-10 document paths
- `.planning/phases/156-style-extension-full-landing-verification/156-LIVE-PINS-before.txt` - live-corpus pin baseline (685 pins)
- `.planning/phases/156-style-extension-full-landing-verification/156-GATE-BASELINE.json` - `pin_coverage` + `guards` blocks

## Decisions Made

- `_CONTENT-PINS.txt` stays byte-unchanged at 562 pins; the live-corpus pin list is added beside it as a separate differ input, not a replacement (D-08).
- Per-validator unpinned-literal attribution used the alphabetically-first owning file when a literal matched more than one `*.mjs` file (one such case: `03-windows-11-multi-app-kiosk.md`, owned by both `v1.19-` and `v1.20-milestone-audit.mjs`).
- Fixed `pins2.py`'s `lits` collection from `set()` to an insertion-ordered dict (Rule 1 auto-fix) so the committed live-pin baseline is byte-reproducible from a fresh run — a property the plan's own acceptance criteria required but the as-shipped tool could not guarantee.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] judge-packets.py could not write JSON to stdout on this Windows/cp1252 console**
- **Found during:** Task 1, while running the plan's own mandated verify commands
- **Issue:** `print(json.dumps(...))` raised `UnicodeEncodeError` on a `\u2192` character whenever stdout was piped or redirected without an explicit UTF-8 reconfigure, on this Windows Python 3.13 / cp1252-console setup. This blocked every one of Task 1's required verify invocations (the docs-scoping count, the nonzero-hunk check), not just a cosmetic print.
- **Fix:** Added `sys.stdout.reconfigure(encoding="utf-8", errors="replace")` near the top of the module, mirroring the same line `pins2.py` already carried for the identical reason.
- **Files modified:** `scripts/docs-style/judge-packets.py`
- **Verification:** All four of Task 1's `<verify>` block commands, run verbatim, now pass (structure check, invalid-BASE guard, docs-leak=0, docs-count=385>0).
- **Committed in:** `655654f2` (Task 1 commit)

**2. [Rule 1 - Bug] pins2.py's pin ordering was non-deterministic across process runs**
- **Found during:** Task 2, while confirming `156-LIVE-PINS-before.txt` is byte-identical to a fresh regeneration (an explicit acceptance criterion)
- **Issue:** `lits = set()` de-duplicated validator literals, but iterating a `set()` of `str` objects is order-randomized per Python process (str hash randomization, on by default). `sorted(..., key=len, reverse=True)` is stable, so ties (equal-length literals) came out in a different order on every fresh run — two consecutive `pins2.py scripts/validation docs` invocations produced files with the same 685 lines in different order, which is exactly what the plan's `diff -q` acceptance criterion would have failed nondeterministically.
- **Fix:** Changed `lits` from `set()` to an insertion-ordered `dict` (`lits[s] = None` instead of `lits.add(s)`). File-processing order (`sorted(V.glob("*.mjs"))`) and in-file literal-scan order are already deterministic, so this makes the full pipeline reproducible without touching `literals()`, `MIN`, or the `sorted(...)` call itself, honoring the plan's explicit "change nothing else" instruction.
- **Files modified:** `scripts/docs-style/pins2.py`
- **Verification:** Two fresh `python scripts/docs-style/pins2.py scripts/validation docs` runs, `diff -q` clean; the default (no-args) arm re-tested separately and still resolves the original hardcoded paths unchanged.
- **Committed in:** `35af37ea` (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (1 blocking, 1 bug)
**Impact on plan:** Both were required for the plan's own mandated verification commands to produce trustworthy, repeatable results — exactly the class of defect this phase exists to catch. No scope creep: both fixes stayed inside the single file each task was already editing.

## Issues Encountered

None beyond the two auto-fixed deviations above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `156-TARGETS.txt`, the fixed `judge-packets.py`, and the argv-ified `pins2.py` are all in place for plans 156-02 through 156-05, which perform the actual batch-10 corpus edits and judge dispatch.
- The `156-GATE-BASELINE.json` `guards` block is the landmine register those plans' commits must be checked against; its `negative_assertions.remedy` (bare `check-phase-153.mjs`) is the named per-commit gate.
- No blockers. `docs/` remains completely untouched by this plan (`git diff --exit-code -- docs/` clean), and the pre-batch apex reads 111 PASS / 0 FAIL — a clean baseline for the next plan's after-measurement.

---
*Phase: 156-style-extension-full-landing-verification*
*Completed: 2026-09-05*

## Self-Check: PASSED

All created/modified files confirmed present on disk; all four commits (`655654f2`, `35af37ea`, `d3c7b4f3`, `d8389119`) confirmed in `git log --oneline --all`.
