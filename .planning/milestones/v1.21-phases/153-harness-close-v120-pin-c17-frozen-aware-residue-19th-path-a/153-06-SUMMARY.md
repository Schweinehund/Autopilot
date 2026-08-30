---
phase: 153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a
plan: 06
subsystem: testing
tags: [validators, content-leaf, corpus-correction, driver-firmware, linux, needle-doctrine]

# Dependency graph
requires:
  - phase: 153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a
    provides: "the content-leaf template (check-phase-126.mjs) and the D-22..D-27/D-38 needle doctrine (153-05, 153-CONTEXT.md)"
provides:
  - "check-phase-145.mjs -- asserts Phase 145's corpus-correction, validator-gate and archival-drift deliverables"
  - "check-phase-146.mjs -- asserts Phase 146's driver/firmware guide plus the 01-windows-wufb-rings.md stub-and-move retention set"
  - "check-phase-147.mjs -- asserts Phase 147's Linux update-delivery guide plus the overview's five-platform column"
affects: [153-07 (148/149/150 leaves), 153-09 (check-phase-153.mjs apex chains all eight leaves)]

actuals:
  tokens: 9787
  tasks: 3
  commits: 3

tech-stack:
  added: []
  patterns:
    - "Content-leaf needle-target rule (D-22): leaves for content phases assert docs/ deliverables, not scripts/-only paths -- the predecessor tooling-milestone clause does not carry"
    - "Archival-drift needle scoped to markdown LINK syntax, not bare prose mention -- discovered the naive full-text grep from 145-VERIFICATION.md now returns 2 hits (governance changelog citations in docs/_standards/EEE-SOP-standard.md, added by Phase 151, not links), while the link-specific regex correctly holds at 0"
    - "Corpus-floor guard on every walkMd-based corpus-wide scan (>= 250 files) so an empty/missing docs/ tree fails loud instead of vacuously passing a 0-hit negative"
    - "flat() whitespace-collapse helper for prose needles that wrap across a markdown soft line break, used only in check-phase-147.mjs where two of the sourced quotes wrap"
    - "Intra-file misattribution scoping: slice the hazard bullet region by heading boundaries and assert the needle's absence there specifically, rather than a corpus-wide negative, when the token is legitimately documented elsewhere in the same file"

key-files:
  created:
    - scripts/validation/check-phase-145.mjs
    - scripts/validation/check-phase-146.mjs
    - scripts/validation/check-phase-147.mjs

key-decisions:
  - "Scoped V-145-ARCHIVALDRIFT to markdown link syntax (`/\\]\\([^)]*\\.planning\\/(research|phases)\\//`) rather than transcribing 145-VERIFICATION.md's literal `grep -rn \"\\.planning/research/\\|\\.planning/phases/\" docs/` command. Measured the naive command against the CURRENT corpus (not the 2026-08-19 snapshot 145 was verified against) and got 2 hits, both non-link prose citations in docs/_standards/EEE-SOP-standard.md's changelog, added by Phase 151 (151-CONTEXT.md provenance citations), after 145 closed. D-25's own wording backs this: the ratified invariant is 'a documentation LINK into them is broken by construction' -- a link, not any prose mention. A verbatim-transcribed needle would have been red on day one, failing the plan's own durability test before the ink was dry. Confirmed link-specific pattern is 0 hits and confirmed 0 markdown-link references to .planning anywhere in docs/ (broader than just the two research/phases prefixes)."
  - "Added a corpus-floor guard (>= 250 markdown files under docs/, measured 293) to both walkMd-based scans (ARCHIVALDRIFT, DISTROSWEEP) so a missing or emptied docs/ tree fails loud rather than vacuously passing a 0-hit negative -- the doctrine's null-sentinel-means-fail rule applied to a directory-level read, not just a single-file read."
  - "FRESHNESS asserts <= 60 days (a ceiling), not an exact 60-day equality, even though all five measured documents currently show exactly 60 -- a future re-verification that legitimately shortens the interval must not redden the leaf."
  - "PRESENCE_DOCS for 145 covers all ten documents named across the five 145-0N-SUMMARY.md files' modified/created lists (five patch-management docs, the coupled iOS enrollment doc, the co-management site-4 doc, both glossaries, the Linux prerequisites matrix) rather than only the five headline patch-management docs -- the plan's own guidance ('presence and non-emptiness of each document the phase corrected') reads as the full set, and every literal was independently confirmed present before being baked in."
  - "check-phase-147's misattribution guard is scoped to a slice of the file (the root-context hazard bullet region, bounded by its own heading and the next bold lead-in) rather than a corpus-wide negative, per the plan's own instruction that the interval is legitimately documented on its own surface -- a corpus-wide ban on 'five minutes' would be wrong because the SAME guide correctly documents it in its discovery-script section a few paragraphs later."
  - "V-146-SINGULARFORM asserts the shipped singular form ('WUfB deployment ring') is present and the plural form is absent in 06, rather than re-deriving or asserting anything about the C11 regex itself -- the leaf locks the phase's OUTPUT (the singular-form convention), not the validator mechanism that motivated it, per the plan's own instruction to 'assert the shipped form rather than re-deriving the preference.'"

requirements-completed: [HARN-04]

coverage:
  - id: D1
    description: "check-phase-145.mjs asserts Phase 145's corpus-correction deliverables: 10 documents present/non-empty, the corpus-wide archival-drift link negative, the 60-day freshness ceiling on 5 re-stamped docs, the Ubuntu distribution-version sweep, the check-phase-59.mjs frozen-read conversion, and the CI-3 glossary inlining"
    requirement: "HARN-04"
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-145.mjs --verbose -> 16 PASS, 0 FAIL, 0 SKIPPED"
        status: pass
      - kind: other
        ref: "ARCHIVALDRIFT failability probe: scratch file with a .planning/phases/ markdown link under docs/_scratch-153-06/probe.md -> FAIL (1 offender); file deleted -> re-run PASS"
        status: pass
    human_judgment: false
  - id: D2
    description: "check-phase-146.mjs asserts Phase 146's driver/firmware guide plus the stub-and-move retention set (H2, anchor, disambiguation, dual-scan material) on the promoted-from document"
    requirement: "HARN-04"
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-146.mjs --verbose -> 7 PASS, 0 FAIL, 0 SKIPPED"
        status: pass
      - kind: other
        ref: "RETENTION failability probe: in-memory scratch copy of 01-windows-wufb-rings.md with the anchor tag stripped -> the same needle logic reports FAIL (missing: retained anchor); real file untouched, re-run against disk PASS"
        status: pass
    human_judgment: false
  - id: D3
    description: "check-phase-147.mjs asserts Phase 147's Linux update-delivery guide (absence statement, root-context hazard, four enabled origins, reboot detection, Canonical-side entitlement framing) plus the overview's five-platform column, with an intra-file misattribution guard on the five-minute discovery-script cap"
    requirement: "HARN-04"
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-147.mjs --verbose -> 8 PASS, 0 FAIL, 0 SKIPPED"
        status: pass
      - kind: other
        ref: "all three leaves run in one sequence: node check-phase-145.mjs && check-phase-146.mjs && check-phase-147.mjs -> combined exit 0 (16/7/8 all green)"
        status: pass
    human_judgment: false

duration: ~45min
completed: 2026-08-29
status: complete
---

# Phase 153 Plan 06: Harness Close — check-phase-145/146/147.mjs Content Leaves Summary

**Authored the first three of eight content leaves (`check-phase-145.mjs`, `146.mjs`, `147.mjs`), each a lightweight standalone validator asserting its own phase's shipped `docs/` deliverables — corpus correction + archival-drift fix, driver/firmware depth, and Linux update delivery — with zero planning-directory reads at runtime and both headline needles proved failable.**

## Performance

- **Duration:** ~45 min
- **Completed:** 2026-08-29
- **Tasks:** 3
- **Files modified:** 3 (all new)

## Accomplishments

- `check-phase-145.mjs`: 16 checks (10 presence + archival-drift negative + freshness ceiling + distro sweep + frozen-read conversion + glossary inlining + self-invariant), 16 PASS / 0 FAIL / 0 SKIPPED standalone.
- `check-phase-146.mjs`: 7 checks (presence + the stub-and-move retention set + deferral/deadline triad + three named absences + ConfigMgr co-existence procedure + singular-form assertion + self-invariant), 7 PASS / 0 FAIL / 0 SKIPPED standalone.
- `check-phase-147.mjs`: 8 checks (presence + absence statement + root-context hazard + four-origins/reboot detection + Canonical entitlement framing + overview column + misattribution guard + self-invariant), 8 PASS / 0 FAIL / 0 SKIPPED standalone.
- All three run green in one sequence: `node check-phase-145.mjs && check-phase-146.mjs && check-phase-147.mjs` → combined exit 0.
- Discovered and corrected a real durability defect in the archival-drift needle before baking it in (see Decisions).
- Both required failability probes recorded red-then-green (see below).
- `git diff --stat` for this plan's three commits lists exactly 3 new files, 0 files modified — no `docs/` content was created, edited or deleted.

## Needle Inventory — every baked literal with its measuring grep and authoring-time count

### `check-phase-145.mjs`

| Needle | Measuring command | Authoring-time result |
|---|---|---|
| 10x PRESENCE | `test -s <path>` per file, all 10 corrected/touched docs from 145-01..05-SUMMARY.md modified lists | all 10 present, non-empty (sizes 7.6KB–31.7KB) |
| ARCHIVALDRIFT (link-scoped) | `grep -rn "\]([^)]*\.planning/\(research\|phases\)/" docs/` (regex form) | **0 hits** across 293 `docs/` files |
| ARCHIVALDRIFT (naive text, NOT baked — see Decisions) | `grep -rn "\.planning/research/\|\.planning/phases/" docs/` | 2 hits, both non-link prose citations in `docs/_standards/EEE-SOP-standard.md:578,649` (Phase 151 governance-changelog provenance, added after 145 closed) |
| FRESHNESS (5 docs) | `grep -n "last_verified:\|review_by:"` on 00-overview/01-windows/02-macos/03-ios/04-android, date-arithmetic | all 5: `review_by - last_verified` = exactly 60 days (ceiling asserted as `<= 60`, not `== 60`) |
| DISTROSWEEP presence | `grep -c "24.04\|26.04" docs/linux-lifecycle/01-linux-prerequisites.md` | both present |
| DISTROSWEEP absence | `grep -rn "22.04" docs/ scripts/generate-diagrams.py` | **0 hits** (26-file FIX-09 sweep confirmed still holding) |
| FROZENREAD | `grep -n "readAtV15Close(OPS_INDEX_MD)" scripts/validation/check-phase-59.mjs` | 1 hit, `:449` |
| GLOSSARYINLINE | `grep -n "CI-3\|Managed Apple Account" docs/_glossary-apple-business.md` + `grep -c "\.planning" <same file>` | CI-3/Managed Apple Account present; 0 `.planning` occurrences in that file |
| SELF | source inspection | `CHAIN_PHASES = []`, `CHAIN_SKIP = new Set([])` |

### `check-phase-146.mjs`

| Needle | Measuring command | Authoring-time result |
|---|---|---|
| PRESENCE | `test -s docs/operations/patch-management/06-windows-driver-firmware-updates.md` | present, 51,409 bytes |
| RETENTION (5 sub-needles) | `grep -n '<a id="driver-firmware-policy">\|## Driver and Firmware Update Policy\|This is NOT a ring\|Dual-scan source conflict pitfall\|dual-scan' docs/operations/patch-management/01-windows-wufb-rings.md` | all 5 present (lines 170/171/178/184/186 region) |
| DEFERRALDEADLINE (3 sub-needles) | `grep -n "## Deferral and Deadline Behavior\|does not apply to drivers that are approved\|Quality Update deadline and grace period settings apply to drivers" docs/.../06-*.md` | all 3 present |
| ABSENCES (3 sub-needles) | `grep -n "There is no driver rollback\.\|do not apply during Windows Autopilot\|Switching between Automatic and Manual mode is destructive\." docs/.../06-*.md` | all 3 present (lines ~666/679/700) |
| COEXIST (2 sub-needles + ordering) | `grep -n "## Configuration Manager Co-management and Co-existence\|undefined and unpredictable device state" docs/.../06-*.md` | both present, warning after H2 as required |
| SINGULARFORM | `grep -c "WUfB deployment ring\b" docs/.../06-*.md` (15) vs `grep -c "WUfB deployment rings\b"` (0) | singular present (15x), plural absent |
| SELF | source inspection | `CHAIN_PHASES = []`, `CHAIN_SKIP = new Set([])` |

### `check-phase-147.mjs`

| Needle | Measuring command | Authoring-time result |
|---|---|---|
| PRESENCE | `test -s docs/operations/patch-management/05-linux-update-delivery.md` | present, 34,927 bytes |
| ABSENCE (2 sub-needles) | flattened-whitespace search for `"There is no native Intune Linux update policy"` and `"the policy surface does not exist"` | both present (wraps across a line break, confirmed via `flat()` helper) |
| ROOTHAZARD (5 sub-needles) | flattened search for `"Root-context execution hazard."`, `"Every 15 minutes"`, `"no documented run-time cap on that surface"`, `"96 runs"`, `"1,440 minutes"` | all 5 present |
| ORIGINS (3 sub-needles) | flattened search for `"Four origins are enabled by default, not one."`, `"## Reboot Handling"`, the `/run/reboot-required` marker quote | all 3 present |
| ENTITLEMENT | flattened search for `"Both are Canonical-side subscription entitlements that sit entirely outside Intune"` | present |
| OVERVIEWCOLUMN | regex `\|\s*Concept\s*\|.*\|\s*Linux\s*\|` on the header row + `^platform:\s*cross-platform\s*$` in frontmatter | 6-column header present; frontmatter unchanged |
| MISATTRIBUTION | region-slice between `**Root-context execution hazard.**` and `**Set an explicit, justified execution frequency` for `"five minutes"` (expect absent) + whole-file check (expect present elsewhere) | absent in hazard region; present at line 351 (discovery-script section) |
| SELF | source inspection | `CHAIN_PHASES = []`, `CHAIN_SKIP = new Set([])` |

## Failability Probes — recorded red-then-green

### 1. `check-phase-145.mjs` ARCHIVALDRIFT (required by acceptance criteria)

```
$ mkdir -p docs/_scratch-153-06 && printf -- '---\n---\n\n# Scratch\n\n[bad link](../../.planning/phases/999-fake/999-CONTEXT.md)\n' > docs/_scratch-153-06/probe.md
$ node scripts/validation/check-phase-145.mjs
[ARCHIVALDRIFT/16] V-145-ARCHIVALDRIFT: ... FAIL -- 1 file(s) carry a broken-by-archival planning link: D:\claude\Autopilot\docs\_scratch-153-06\probe.md
...
Result: 15 PASS, 1 FAIL, 0 SKIPPED
```

```
$ rm -rf docs/_scratch-153-06
$ node scripts/validation/check-phase-145.mjs
...
Result: 16 PASS, 0 FAIL, 0 SKIPPED
```

The scratch file was created and deleted under `docs/_scratch-153-06/`, never committed — `git status --short docs/` was empty before and after the probe.

### 2. `check-phase-146.mjs` RETENTION (required by acceptance criteria, performed via a scratch copy, no doc edit)

```
$ node -e "
const fs = require('fs');
let c = fs.readFileSync('docs/operations/patch-management/01-windows-wufb-rings.md', 'utf8');
c = c.replace('<a id=\"driver-firmware-policy\"></a>', '');
fs.writeFileSync('docs/operations/patch-management/01-windows-wufb-rings.PROBE.md', c);
"
$ node -e "
const { readFileSync } = require('fs');
const c = readFileSync('docs/operations/patch-management/01-windows-wufb-rings.PROBE.md','utf8');
const required = [['<a id=\"driver-firmware-policy\"></a>','retained anchor'], ...];
const missing = required.filter(([n]) => !c.includes(n));
console.log(missing.length ? 'FAIL -- missing: ' + missing.map(m=>m[1]).join(', ') : 'PASS');
"
FAIL -- missing: retained anchor
$ rm docs/operations/patch-management/01-windows-wufb-rings.PROBE.md
$ node scripts/validation/check-phase-146.mjs   # re-run against the real, untouched file
...
Result: 7 PASS, 0 FAIL, 0 SKIPPED
```

The real `01-windows-wufb-rings.md` was never edited; `git status --short docs/` was empty throughout.

## Task Commits

Each task was committed atomically:

1. **Task 1: `check-phase-145.mjs`** - `eaae69e3` (feat)
2. **Task 2: `check-phase-146.mjs`** - `96eeeaf5` (feat)
3. **Task 3: `check-phase-147.mjs`** - `2f963b72` (feat)

**Plan metadata:** committed separately, see below.

## Files Created/Modified

- `scripts/validation/check-phase-145.mjs` - new, 286 lines, 16 checks, Phase 145 content leaf
- `scripts/validation/check-phase-146.mjs` - new, 224 lines, 7 checks, Phase 146 content leaf
- `scripts/validation/check-phase-147.mjs` - new, 249 lines, 8 checks, Phase 147 content leaf

## Decisions Made

See `key-decisions` in frontmatter for full reasoning. Summary:

1. **Scoped the archival-drift negative to markdown link syntax, not literal transcription of 145-VERIFICATION.md's grep.** Measuring the exact command 145's own verifier used against the CURRENT corpus (not its 2026-08-19 snapshot) surfaced 2 hits added by Phase 151's governance changelog — legitimate provenance citations in backticks, never rendered as clickable links. A verbatim-transcribed needle would have failed on day one of this very plan. D-25's actual wording ("a documentation link into them is broken by construction") supports the link-specific scope; the corrected needle measures 0 both narrowly (the two `.planning/research/`+`.planning/phases/` prefixes) and broadly (any `.planning` link anywhere in `docs/`).
2. **Added a corpus-floor guard** (>= 250 files, measured 293) on both directory-walking scans so a vacated `docs/` tree cannot silently pass a corpus-wide negative — applying the doctrine's null-sentinel-means-fail rule at the directory level, not only the single-file level.
3. **FRESHNESS asserts a ceiling (`<= 60`), never an equality**, even though today's measured values are all exactly 60 — a future legitimate re-verification that shortens the interval must not redden this leaf.
4. **check-phase-147's misattribution guard is intra-file (region-scoped), not corpus-wide** — the plan explicitly warns a corpus-wide ban would be wrong here, since the same guide legitimately documents "five minutes" in its discovery-script section a few paragraphs after the hazard region the guard protects.
5. **V-146-SINGULARFORM asserts the shipped output form**, not the C11 regex that motivated it, per the plan's explicit instruction.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug avoided pre-commit] Archival-drift needle would have been red at authoring time if transcribed literally**
- **Found during:** Task 1, while deriving and measuring the ARCHIVALDRIFT needle per the plan's own "confirm against the corpus before baking" instruction
- **Issue:** 145-VERIFICATION.md's literal command (`grep -rn "\.planning/research/\|\.planning/phases/" docs/` → 0) no longer returns 0 against the current corpus — Phase 151 added 2 legitimate provenance citations to `docs/_standards/EEE-SOP-standard.md`'s changelog after 145 closed. A leaf baked with the naive command would FAIL on its very first run, before the next milestone even begins — failing the plan's own durability test immediately rather than eventually.
- **Fix:** Scoped the needle to markdown link syntax (`/\]\([^)]*\.planning\/(research|phases)\//`) instead of any-substring matching. This matches D-25's actual ratified invariant ("a documentation link ... is broken by construction") more precisely than the naive grep did, and measures 0 both today and durably (prose citations of a path in backticks do not 404 post-archival; a clickable link does).
- **Files modified:** none beyond the planned `check-phase-145.mjs` (this is a needle-design decision made before any code was written, not a post-hoc patch).
- **Verification:** `node scripts/validation/check-phase-145.mjs` → 16 PASS, 0 FAIL, 0 SKIPPED; failability probe (above) confirms the needle still catches a real broken link.
- **Committed in:** `eaae69e3` (Task 1)

---

**Total deviations:** 1 auto-fixed (Rule 1 — a needle-durability defect caught during derivation, before it ever reached a committed file).
**Impact on plan:** No scope creep. The corrected needle is narrower in mechanism (link syntax vs. any substring) but equally or more precise in intent, and was required to satisfy the plan's own "run the equivalent grep against the corpus and record the actual count" instruction plus the durability doctrine in `<needle_doctrine>`.

## Issues Encountered

None beyond the deviation documented above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Three of eight content leaves are on disk: `check-phase-145.mjs`, `146.mjs`, `147.mjs`. Plan 153-07 authors the next three (148/149/150), plan 153-08 the final two (151/152), and plan 153-09 authors the apex `check-phase-153.mjs` that chains all eight plus `check-phase-30/31.mjs` (`CHAIN_EXTRA`) into `[48..152]`.
- All three leaves in this plan are independent of one another and of the eventual apex — each exits 0 standalone, none reads a planning path at runtime, none spawns a subprocess, and their registration order is not significant (HARN-04 ordering edge, confirmed by running them in three different orders during authoring with identical per-leaf results).
- No blockers for 153-07/153-08/153-09. The `.github/workflows/audit-harness-v1.21-integrity.yml` job entries for `check-phase-145`, `146` and `147` (authored ahead of these validators in 153-05) now have real targets to run.

## Self-Check: PASSED

- FOUND: `scripts/validation/check-phase-145.mjs` (286 lines)
- FOUND: `scripts/validation/check-phase-146.mjs` (224 lines)
- FOUND: `scripts/validation/check-phase-147.mjs` (249 lines)
- FOUND: commit `eaae69e3` (Task 1)
- FOUND: commit `96eeeaf5` (Task 2)
- FOUND: commit `2f963b72` (Task 3)
- Re-ran all plan-level `<verification>` commands: `node scripts/validation/check-phase-145.mjs && node scripts/validation/check-phase-146.mjs && node scripts/validation/check-phase-147.mjs` → combined exit 0 (16/0/0, 7/0/0, 8/0/0).
- `git diff --stat` across this plan's three commits → exactly 3 files changed, 0 modified, 759 insertions, 0 deletions.
- `grep -c "child_process" scripts/validation/check-phase-14{5,6,7}.mjs` → 0 for all three files.

---
*Phase: 153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a*
*Completed: 2026-08-29*
