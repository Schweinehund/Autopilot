---
phase: 158-final-corpus-verification-publish-bundle
plan: 07
subsystem: docs-publish-pipeline
tags: [publish-bundle, docx, guard-docx, manifest, drift-canary, annotate-and-supersede, VERIFY-05, VERIFY-06, harness-flip]

# Dependency graph
requires:
  - phase: 158-final-corpus-verification-publish-bundle
    provides: plan 158-06's 46-row binding claimed-fix audit (46/46 PASS) and the completed structural-gate baseline (after half at b889501f, 9 drift rows, unattributed_rows 0, discharge.sc3/sc4 filled)
provides:
  - "dist/docs-library-v1.22.zip: the rebuilt publish archive, 239 entries (237 documents + manifest.csv + README.md), both drift canaries agreeing with the registry's 237 rows"
  - "158-BUNDLE-RUN.txt: the verbatim 488-line captured output of the single dedicated build invocation"
  - "158-BUNDLE-MANIFEST.csv: a citation copy of the archive's own manifest (header + 237 rows)"
  - "158-GATE-BASELINE.json: archive size/hash recorded under recorded (outside drift[]), final_apex_recorded_in pointing at this SUMMARY"
  - "Six annotate-and-supersede amendment blocks landed across REQUIREMENTS.md and ROADMAP.md, plus one new STATE.md phase bullet"
  - "VERIFY-05 and VERIFY-06 flipped by the harness at this plan's boundary"
affects: [159]

# Actuals (#2632)
actuals:
  tokens: 21000
  tasks: 3
  commits: 3

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "git checkout -- <file> restores committed EOL bytes when a build tool writes LF against core.autocrlf=true, resolving a git-status false-positive after content identity is proven by both git diff --exit-code and hash-object equality"
    - "annotate-and-supersede blocks that share a requirement bullet line with an existing amendment are split onto their own soft-wrapped continuation line (2-space indent, no blank line) so a mechanical per-line grep can count them as distinct new blocks without breaking the GFM list item"
    - "python str.index() on a non-unique substring (a D-NN amendment marker that already exists elsewhere in the same file) silently targets the wrong occurrence -- always anchor a scripted string-replace on file-unique surrounding text, never on a marker string alone"

key-files:
  created:
    - .planning/phases/158-final-corpus-verification-publish-bundle/158-BUNDLE-RUN.txt
    - .planning/phases/158-final-corpus-verification-publish-bundle/158-BUNDLE-MANIFEST.csv
  modified:
    - scripts/pipeline/filename-map.md
    - .planning/phases/158-final-corpus-verification-publish-bundle/158-GATE-BASELINE.json
    - .planning/REQUIREMENTS.md
    - .planning/ROADMAP.md
    - .planning/STATE.md

key-decisions:
  - "filename-map.md's post-build git-status 'modified' flag was a false positive from an EOL mismatch (build wrote LF, core.autocrlf=true expects CRLF), not a content change -- proven by git diff --exit-code (clean) and git hash-object identity (88e86f3bd75e... both before and after); resolved with git checkout -- on that one file, a Rule 3 auto-fix."
  - "The untracked-entry count after this plan's own commits measures 10, not the plan text's literal expectation of 9 -- consistent with plan 158-06's own established precedent that .planning/milestone.lock is a new foreign untracked entry not present when the '9' figure was first written. Recorded as measured, not forced to match stale plan text."
  - "HARN-06's history-position figures were re-measured live rather than copied from 158-CONTEXT.md's D-28: the branch is 171 commits ahead of local master, not the CONTEXT's recorded 152 -- more commits landed between context-gathering and this plan's execution. origin/master...master (0/11) and the ancestry facts (master ancestor of 9a114815, e129081e ancestor of both) are unchanged and reconfirmed."
  - "DFCI is not new v1.21 vocabulary: docs/_glossary.md:183 already carries a complete entry from Phase 149 (8e5070d9), predating this milestone. HYG-06's requirement text is corrected from six named terms to five genuinely-absent ones by annotate-and-supersede, matching Phase 157's own D-42 finding."

requirements-completed: [VERIFY-05, VERIFY-06]

coverage:
  - id: D1
    description: "dist/docs-library-v1.22.zip rebuilt in a single dedicated 10-minute-capped invocation with output captured verbatim to 158-BUNDLE-RUN.txt (488 lines, builder parity line present, 0 orphan); filename-map.md proven byte-equal to its committed state by both working-tree diff and object identity, and no commit in this phase touched scripts/pipeline/."
    requirement: "VERIFY-05"
    verification:
      - kind: other
        ref: "node scripts/pipeline/build-publish-bundle.mjs --version=v1.22 (captured to 158-BUNDLE-RUN.txt, commit 86c5f074)"
        status: pass
      - kind: other
        ref: "git diff --exit-code -- scripts/pipeline/filename-map.md; git hash-object identity 88e86f3bd75e...; git diff --quiet HEAD -- scripts/pipeline/"
        status: pass
    human_judgment: false
  - id: D2
    description: "All twelve inline archive assertions from D-23 evaluated and passing: 239 entries (237 docs + manifest + readme, 0 dirs); readme byte-equal across v1.22/v1.21 archives (1513 bytes); manifest header + 237 rows with identifier set equal to the registry's 237 Approved rows via the guarded parseRegistry import; blank-status rows are exactly the 9 accepted-not-fixed set; both self-tests green (15/15, 8/8) and both canaries report 237; output-directory post-minus-pre is a subset of {docs-library-v1.22.zip}; no three-part-name archive, no temporary file; staging holds exactly 237 .docx by extension; tracked tree clean; corpus identity holds between the after half and the post-bundle tree; archive size/hash recorded outside drift[] and labelled non-reproducible."
    requirement: "VERIFY-05"
    verification:
      - kind: other
        ref: "unzip -Z1 dist/docs-library-v1.22.zip | wc -l == 239; python entry-classification script (237 docs, 0 dirs, 0 extra)"
        status: pass
      - kind: other
        ref: "python filecmp readme extraction from v1.22 and v1.21 archives (1513 bytes both, byte-identical)"
        status: pass
      - kind: other
        ref: "python csv manifest parse (header RE-ID,Output Filename,Status,Last Verified; 237 rows); node -e inline parseRegistry import identifier-set comparison (237==237, 0 differences)"
        status: pass
      - kind: other
        ref: "node scripts/pipeline/build-publish-bundle.mjs --self-test (15 passed, 0 failed); node scripts/pipeline/build-filename-map.mjs --self-test (8 passed, 0 failed)"
        status: pass
      - kind: other
        ref: "python git-diff corpus-identity check against 158-GATE-BASELINE.json's after.sha (b889501f) over docs/ and scripts/pipeline/"
        status: pass
    human_judgment: false
  - id: D3
    description: "Six annotate-and-supersede amendment blocks landed in the established shape (four in REQUIREMENTS.md: pin count, widened confirmation criterion, corrected glossary count, history record; two in ROADMAP.md: SC#2, SC#4), plus a Phase-159 history-mechanism note on its own line and one new STATE.md phase bullet. No checkbox edited by hand; neither planning document names the off-by-one filename literal or carries a bare Platform blockquote token; check-phase-54/55/56 green (32/32/32) before and after the amendments."
    requirement: "VERIFY-06"
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-54.mjs / check-phase-55.mjs / check-phase-56.mjs (32/32/32, before and after the amendment commit)"
        status: pass
      - kind: other
        ref: "python literal-absence and blockquote-token checks across the three planning documents; git diff HEAD~1 HEAD checkbox-line diff (clean); git diff STATE.md scrub-bullet removal check (0)"
        status: pass
      - kind: other
        ref: "grep -c 'SUCCESS-CRITERION AMENDMENT, D-' across both files, summed == 18 (>= 16 required, 7 new matching lines beside the 11 already present)"
        status: pass
    human_judgment: false
  - id: D4
    description: "The final apex (check-phase-153 111/0/0, check-phase-54/55/56 32/32/32, C17 237/0, check-nav-hub-links 0/0, check-prose-style.py all-PASS) is green after the last planning-document edit, distinct from the after half measured before the bundle in plan 158-06."
    requirement: "VERIFY-06"
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-153.mjs (111 PASS, 0 FAIL, 0 SKIPPED)"
        status: pass
      - kind: other
        ref: "node scripts/validation/c17-eee-contract.mjs (237 files checked, 0 violations); node scripts/validation/check-nav-hub-links.mjs (0/0)"
        status: pass
      - kind: other
        ref: "python scripts/validation/check-prose-style.py --self-test (7 passed, 0 failed) and full run (all assertions PASS, 0 findings)"
        status: pass
    human_judgment: false
  - id: D5
    description: "Both requirement identifiers (VERIFY-05, VERIFY-06) are declared only in this plan's frontmatter; the harness flips both the REQUIREMENTS.md checkbox/traceability row and the ROADMAP.md checkbox at this plan's boundary via requirements.mark-complete and roadmap.update-plan-progress, never by hand."
    requirement: "VERIFY-06"
    verification:
      - kind: other
        ref: "grep -rn 'requirements: \\[VERIFY-05, VERIFY-06\\]' across 158-*-PLAN.md (only 158-07-PLAN.md); post-plan-boundary confirmation of the flipped checkboxes"
        status: pass
    human_judgment: false

# Metrics
duration: 27min
completed: 2026-09-08
status: complete
---

# Phase 158 Plan 7: Publish Bundle Rebuild, Twelve-Assertion Discharge & Six-Block Amendment Sweep Summary

**Rebuilt `dist/docs-library-v1.22.zip` from the fully proven corpus in a single 488-line-logged invocation, verified all twelve inline archive assertions against the archive itself, then landed six annotate-and-supersede amendment blocks (pin count, widened confirmation criterion, corrected glossary count, history record, and two roadmap success-criterion notes) before the harness flipped VERIFY-05 and VERIFY-06 at this plan's own boundary.**

## Performance

- **Duration:** 27 min
- **Started:** 2026-09-08T08:09:05Z
- **Completed:** 2026-09-08T08:36:00Z
- **Tasks:** 3
- **Files modified:** 6 (`158-BUNDLE-RUN.txt`, `158-BUNDLE-MANIFEST.csv`, `scripts/pipeline/filename-map.md` (regenerated, byte-equal, restored EOL), `158-GATE-BASELINE.json`, `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md`, `.planning/STATE.md`)

## Accomplishments

- Rebuilt `dist/docs-library-v1.22.zip` (4,105,804 bytes; SHA-256 `65a102345151865339dc45076ad8b4b3879c508bd5d3ec64122949f16be7b4ce`, recorded outside `drift[]` and labelled non-reproducible) in one dedicated `node scripts/pipeline/build-publish-bundle.mjs --version=v1.22` invocation, output captured verbatim to `158-BUNDLE-RUN.txt` (488 lines; registry parity `237 Approved rows, 237 staged, 0 excluded, 0 missing, 0 orphan`).
- Evaluated all twelve inline archive assertions from D-23 against the built archive itself (not the run log) -- every one passing, results quoted verbatim below.
- Landed six annotate-and-supersede amendment blocks correcting four requirement criteria and two roadmap success criteria that this milestone's own measurements superseded, plus one new STATE.md phase bullet.
- Confirmed the final apex (`check-phase-153` 111/0/0, `check-phase-54/55/56` 32/32/32, C17 237/0, nav-hub 0/0, `check-prose-style.py` all-PASS) green after the last planning-document edit.
- No requirement checkbox, traceability row, or roadmap checkbox was edited by hand anywhere in this plan; both VERIFY-05 and VERIFY-06 are declared only in this plan's frontmatter, so the harness flip fires at this plan's boundary (confirmed below).

## Task Commits

Each task was committed atomically:

1. **Task 1: Build the publish archive in a single dedicated invocation with its output captured** - `86c5f074` (feat)
2. **Task 2: Evaluate the twelve archive assertions inline and record the evidence** - `b0d512e5` (docs)
3. **Task 3: Land the six amendment blocks, re-run the apex, and let the harness flip both requirements** - `eec65c6f` (docs)

_Note: this plan is `type="execute"`, not TDD -- no RED/GREEN/REFACTOR cycle applies._

## Files Created/Modified

- `.planning/phases/158-final-corpus-verification-publish-bundle/158-BUNDLE-RUN.txt` - verbatim 488-line captured build output
- `.planning/phases/158-final-corpus-verification-publish-bundle/158-BUNDLE-MANIFEST.csv` - citation copy of the archive's own manifest (header + 237 rows)
- `scripts/pipeline/filename-map.md` - regenerated by the build; proven byte-equal to its committed state (both diff and object identity)
- `.planning/phases/158-final-corpus-verification-publish-bundle/158-GATE-BASELINE.json` - `recorded.zip_size_bytes`/`zip_sha256` filled; `final_apex_recorded_in` points at this SUMMARY
- `.planning/REQUIREMENTS.md` - four annotate-and-supersede blocks (STYLE-06, VERIFY-06, HYG-06, HARN-06)
- `.planning/ROADMAP.md` - two annotate-and-supersede blocks (Phase 158 SC#2, SC#4) plus a Phase 159 history-mechanism note
- `.planning/STATE.md` - one new `[Phase 158]` bullet

## Twelve Archive Assertions (D-23), Quoted Verbatim

1. **Entry count.** `unzip -Z1 dist/docs-library-v1.22.zip | wc -l` = **239**. Classification: 237 entries matching `^[a-z0-9-]+\.docx$`, plus `manifest.csv` and `README.md`, 0 directory entries. Entry list recorded to the run's scratch listing during execution.
2. **Readme equality.** Extracted `README.md` from `dist/docs-library-v1.22.zip` and `dist/docs-library-v1.21.zip` independently and compared with `filecmp.cmp(..., shallow=False)`: **"readme byte-equal across the two archives"** (1513 bytes both). The builder module was never imported.
3. **Filename map.** `git diff --exit-code -- scripts/pipeline/filename-map.md` exit 0. `git rev-parse HEAD:scripts/pipeline/filename-map.md` and `git hash-object scripts/pipeline/filename-map.md` both `88e86f3bd75e...` -- **"filename map blob identity holds"**.
4. **Pipeline directory.** `git diff --quiet HEAD -- scripts/pipeline/` exit 0 -- no commit in this phase touched it.
5. **Manifest.** Header `RE-ID,Output Filename,Status,Last Verified`, 237 rows. Identifier-set comparison via an inline `node -e` importing only `parseRegistry` from `build-filename-map.mjs` (guarded entry point, safe to import): approved count 237, manifest count 237, `onlyInRegistry []`, `onlyInManifest []` -- **"SET-COMPARISON: manifest identifier set equals the registry approved set"**. Citation copy written to `158-BUNDLE-MANIFEST.csv`.
6. **Blank status rows.** `{RE-228, RE-229, RE-230, RE-231, RE-232, RE-233, RE-234, RE-235, RE-236}` -- exactly the nine accepted-not-fixed identifiers recorded at `docs/_registry/RE-index.md:266`. Not a defect; not re-litigated here.
7. **Canaries and self-tests.** `node scripts/pipeline/build-publish-bundle.mjs --self-test` -> **"15 passed, 0 failed"**. `node scripts/pipeline/build-filename-map.mjs --self-test` -> **"8 passed, 0 failed"**. Both canaries report 237 rows.
8. **Output-directory inventory.** Pre-build: `{docs-library-v1.18.zip, docs-library-v1.19.zip, docs-library-v1.20.zip, docs-library-v1.21.0.zip, docs-library-v1.21.zip}`. Post-build adds `docs-library-v1.22.zip`. `post \ pre = {docs-library-v1.22.zip}`, a subset of that one name (not asserted as "exactly one new file").
9. **Name collisions.** `dist/docs-library-v1.22.0.zip` absent (`ls` exit 2); `dist/*.tmp` absent (`ls` exit 2) -- **"no three-part-name archive and no temporary archive file"**.
10. **Staging.** `.pipeline-output/publish-staging/*.docx` count = **237**. Unfiltered listing = 239 (the manifest and readme also staged by a completed run) -- matches the expected shape, not the assertion itself.
11. **Tree state.** `git status --porcelain --untracked-files=no` empty -- tracked tree clean, unscoped. Untracked count after this plan's own task commits = **10** (see Deviations: measured, not the plan text's literal "9", matching plan 158-06's own established precedent).
12. **Converter pin.** From Task 1's pre-run check: `pandoc --version` line 1 = `pandoc.exe 3.7.0.2`, matching `convert.ps1:43`'s pinned `$expectedVer = '3.7.0.2'`. `pwsh --version` = `PowerShell 7.6.5`.

**Record, do not assert:** archive size **4,105,804 bytes**, SHA-256 **`65a102345151865339dc45076ad8b4b3879c508bd5d3ec64122949f16be7b4ce`**, written into `158-GATE-BASELINE.json`'s `recorded` block (outside `drift[]`), labelled non-reproducible (`Compress-Archive` stamps per-entry DOS times, pandoc embeds a build timestamp).

**Corpus identity on the post-bundle tree:** `git diff --exit-code b889501f7e43dfc22f9a85f10f645032a1a6bf44 HEAD -- docs/ scripts/pipeline/` exit 0 -- **"corpus identity holds on the post-bundle tree against b889501f7e43"**. Zero `docs/` or `scripts/pipeline/` bytes moved across the entire plan (confirmed via `git diff --stat 699b24a7 HEAD -- docs/`, empty).

**Sibling archives:** `docs-library-v1.18.zip` through `docs-library-v1.21.zip` retain their original mtimes -- untouched. Creating `docs-library-v1.22.zip` disarms `publish-bundle-gate.cjs`'s `zipExists` guard for Phase 159's close (recorded per D-25, not acted on -- this milestone's own harness requirements contain no further rebuild).

**Readme scope-sentence disposition:** the README's "entire Approved documentation corpus" sentence is not false. RE-237's own Asset Provenance section (`docs/recipes/06-walk-up-avd-kiosk-autologon.md:219-221`) already states the committed asset tree lives under `assets/recipes/06-walk-up-avd-kiosk/`, reachable only from the repository itself, and that "the published `.docx` bundle is built from `docs/_registry/RE-index.md` registry rows and never walks a filesystem directory" -- the shipped remedy and the owner ruling that keeps asset files outside the corpus walk.

## Six Amendment Blocks (D-66), Quoted by Location

**REQUIREMENTS.md:**
- **STYLE-06** (`_CONTENT-PINS.txt` pin count): `[MEASURED, plan 158-03]` commit `83660691` pinned the new `## Prose Style Authoring Standard` heading, moving the count 562 -> **563**. `[MEASURED, plan 158-07]` `wc -l scripts/docs-style/_CONTENT-PINS.txt` confirms 563 at this plan's HEAD. `_EMDASH-PINS.txt`'s clause (8 pins) stands unchanged.
- **VERIFY-06** (confirmation criterion, four parts): widened from the `-S`-pickaxe label-splitting class to every claim made across the milestone (D-02, citing the line-wrapped HP Sure Administrator falsification and the 46-row binding audit); retroactive for the 31 already-`[x]` requirements (D-06, `[MEASURED, plan 158-07]` count = 31); the SC#4 "reproduce" reading is a re-run plus attribution (D-17); carve-out for the two do-not-edit-ruled sites at `:110`/`:128` (D-05).
- **HYG-06** (glossary-entry count): corrected from six to five -- DFCI already existed at `docs/_glossary.md:183` since Phase 149 (`8e5070d9`), not authored this milestone (D-42).
- **HARN-06** (history record): `origin/master...master` = **0 / 11**; current branch **171** commits ahead of local `master` (re-measured live, superseding CONTEXT's stale 152); `git branch -r --contains 9a114815` empty; `077b29b7`'s body quoted verbatim; `AR-155-01` cited, carried forward as `AR-158-01`; squash-merge cost measured (103 strict / 104 inclusive commits, ~60% of cited SHAs across the 155-157 artifacts); mechanism deferred to Phase 159 (D-28).

**ROADMAP.md:**
- **Phase 158 SC#2**: same D-02/D-06 widening and retroactivity as VERIFY-06 above.
- **Phase 158 SC#4**: same D-17 reproduce-plus-attribute reading as VERIFY-06 above.
- **Phase 159 block**: a `[Phase 158 note, D-28]` on its own line recording the history-removal decision is Phase 159's to make; the `:246`-region `Depends on` line is untouched.

**STATE.md:** one new `[Phase 158]` bullet recording this plan's decisions (bundle results, EOL fix, the four requirement corrections, the measured-10 untracked count). The existing Phase-155 scrub bullet is not rewritten (`git diff HEAD~1 HEAD -- .planning/STATE.md | grep '^-' | grep -c 'Phase 155'` = 0); no phase checkbox touched.

**Two literal prohibitions, confirmed clean:** the off-by-one compliance-policy filename literal is absent from both `REQUIREMENTS.md` and `ROADMAP.md` (summed occurrence count = 0); no bare `> **Platform:**` blockquote token in any of the three planning documents.

**Amendment count:** `grep -c 'SUCCESS-CRITERION AMENDMENT, D-'` summed across both files = **18** (>= 16 required: 11 already present + 7 new matching lines from the six blocks, one of which -- VERIFY-06/SC#2's shared D-02+D-06 citation -- spans two soft-wrapped lines within the same requirement bullet).

## Final Apex (distinct from plan 158-06's `after` half, which was measured before the bundle)

- `check-phase-153.mjs` (apex): **111 PASS, 0 FAIL, 0 SKIPPED**
- `check-phase-54.mjs`: **32 passed, 0 failed** (before and after the amendment commit)
- `check-phase-55.mjs`: **32 passed, 0 failed**
- `check-phase-56.mjs`: **32 passed, 0 failed**
- `c17-eee-contract.mjs`: **237 files checked, 0 with violations, 0 total violations**
- `check-nav-hub-links.mjs`: **0 hub-presence failure(s), 0 corpus-link failure(s), 0 total**
- `check-prose-style.py`: self-test **7 passed, 0 failed**; full run **all assertions PASS -- 0 findings across the gated slice**

`158-GATE-BASELINE.json.phase_baseline.final_apex_recorded_in` now points at this SUMMARY.

## Requirement Flip Confirmation

`VERIFY-05` and `VERIFY-06` are declared only in `158-07-PLAN.md`'s frontmatter `requirements:` field -- no other plan in this phase names either identifier. No requirement checkbox, traceability row, or roadmap checkbox was hand-edited in any task commit of this plan (confirmed via `git diff HEAD~1 HEAD` checkbox-line scans on the amendment commit, and via the tasks' own commit diffs). The flip fires via `gsd_run query requirements.mark-complete` and `roadmap.update-plan-progress` at this plan's own boundary, after the amendment commits above -- confirmed in the state-update step following this SUMMARY's commit, per this workflow's `update_requirements` step.

## Decisions Made

See `key-decisions` in frontmatter. In brief: the filename-map EOL false-positive was resolved with a targeted `git checkout --` after proving content identity twice; the untracked-entry count is recorded as the measured 10 (not forced to the plan text's stale 9); HARN-06's ahead-count was re-measured live (171, not CONTEXT's 152) because more commits landed since context-gathering; HYG-06's glossary count is corrected to five per Phase 157's own D-42 finding, re-confirmed here.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] filename-map.md's build-time EOL mismatch produced a false-positive "modified" git status**
- **Found during:** Task 1, post-build verification
- **Issue:** The build regenerated `scripts/pipeline/filename-map.md` with bare LF line endings (Node's default `writeFileSync`), while `core.autocrlf=true` expects CRLF in the working tree. `git status --porcelain -- scripts/pipeline/` reported the file modified even though `git diff --exit-code` and `git hash-object` both showed zero content difference from the committed blob.
- **Fix:** Ran `git checkout -- scripts/pipeline/filename-map.md` to restore the checked-out EOL, after first confirming byte-identical content via `git diff --exit-code` (exit 0) and blob-hash equality (`88e86f3bd75e...`) both before and after the checkout. No content was altered -- only the EOL representation was normalized back to the committed form.
- **Files modified:** `scripts/pipeline/filename-map.md`
- **Verification:** `git status --porcelain -- scripts/pipeline/` empty after the checkout; `git diff --exit-code` and `git hash-object` re-confirmed identical.
- **Committed in:** `86c5f074` (the file was not staged dirty at commit time -- the checkout ran before the commit)

**2. [Rule 1 - Bug] Two amendment-authoring script bugs surfaced during the annotate-and-supersede sweep**
- **Found during:** Task 3, amendment authoring
- **Issue:** (a) A first attempt to compute the "at least five new amendment blocks" grep-line count came up short (15, needed >=16) because two new amendment blocks were appended to the *same physical line* as a pre-existing amendment on the same requirement bullet, so the line-based `grep -c` check under-counted them as zero new lines. (b) A follow-up Python script meant to split the HARN-06 and HYG-06 amendments onto their own lines used `str.index()` on a non-unique marker string (`SUCCESS-CRITERION AMENDMENT, D-28`, which also already existed in the pre-existing VERIFY-01 amendment), accidentally splitting VERIFY-01's *existing* amendment text instead of the intended HARN-06 one.
- **Fix:** (a) Split each new amendment block onto its own soft-wrapped continuation line (2-space indent, no blank line, staying in the same GFM list item) where it shared a line with a pre-existing amendment, bringing the new-line count to 7 (total 18, >= 16). (b) Rejoined VERIFY-01's accidentally-split line back to its original single-line form (confirmed byte-identical to the committed state via `git diff`), then re-ran the split using a file-unique anchor string specific to the HARN-06 context.
- **Files modified:** `.planning/REQUIREMENTS.md`
- **Verification:** `git diff HEAD~1 HEAD -- .planning/REQUIREMENTS.md .planning/ROADMAP.md | grep -E '^[+-].*- \[[ x]\]'` empty (no checkbox line touched); amendment-count check >= 16 (measured 18); `check-phase-54/55/56` re-confirmed 32/32/32 after the fix.
- **Committed in:** `eec65c6f` (via two `git commit --amend` cycles on the same task-3 commit, before this plan's metadata commit -- no separate commit was created for the fix, preserving the single amendment-commit boundary the plan's own verify commands assume)

**3. [Rule 1 - Bug] A ROADMAP.md amendment's prose triggered a false-positive "checkbox hand-edited" check**
- **Found during:** Task 3, verification of the amendment commit
- **Issue:** The SC#2 amendment's D-06 sub-clause quoted the literal REQUIREMENTS.md checkbox syntax in prose (`` already `- [x]` at this phase's start ``), which matched the mechanical `grep -E '^[+-].*- \[[ x]\]'` checkbox-hand-edit detector even though no actual checkbox was edited -- the substring was inside a backtick-quoted description of a grep pattern, not a real list-item checkbox.
- **Fix:** Rephrased the clause to "already marked complete at this phase's start" and "counting REQUIREMENTS.md's checked bullets", removing the literal `- [x]` substring from the prose while preserving the identical measured figure (31) and meaning.
- **Files modified:** `.planning/ROADMAP.md`
- **Verification:** `git diff HEAD~1 HEAD -- .planning/REQUIREMENTS.md .planning/ROADMAP.md | grep -E '^[+-].*- \[[ x]\]'` returns empty.
- **Committed in:** `eec65c6f` (same amend cycle as deviation 2)

---

**Total deviations:** 3 auto-fixed (1 Rule 3 blocking EOL fix, 2 Rule 1 authoring-script/false-positive bugs). **Impact:** All three were caught and corrected before the plan's own verify commands were declared passing; no incorrect content, no lost text, and no checkbox was ever actually edited. No scope creep.

## Known Stubs

None.

## Issues Encountered

- **The untracked-entry count after this plan's own commits measures 10, not the plan text's literal "9" (used in the task's own acceptance-criteria phrasing).** This matches plan 158-06's own established precedent: `.planning/milestone.lock` is a new foreign untracked entry that did not exist when the "9" figure was first written into this phase's plans. Recorded as measured (consistent with 158-06's "recorded as measured, not forced to the artifact's own prior expectation" pattern), not treated as a defect. The tracked tree itself is unscoped-clean throughout (`git status --porcelain --untracked-files=no` empty at every checkpoint).
- **HARN-06's "ahead of master" figure moved from CONTEXT.md's recorded 152 to a live-measured 171** between context-gathering and this plan's execution -- expected given ongoing commits within the same phase; the amendment records the live figure with its own measurement command rather than the stale CONTEXT figure, per this project's standing "re-measure at plan time" convention.

## User Setup Required

None - no external service configuration required.

## Hand-off to Phase 159

**Pinnable needle set for `check-phase-158.mjs`** (per D-35, Phase 159 authors it):
- `scripts/docs-style/audit-claimed-fixes.mjs` present + `--self-test` exit 0.
- `_DISPOSITIONS-158.tsv` present with >= 1 data row.
- `docs/index.md` contains `and Linux update delivery using apt and unattended-upgrades`.
- `docs/operations/00-index.md` contains `using apt and unattended-upgrades` and `5-platform comparison hub for update enforcement`.
- `docs/operations/patch-management/00-overview.md` contains `[Linux Update Delivery](05-linux-update-delivery.md)`.
- Corpus-wide `4-platform comparison hub for update enforcement` == 0.
- `updated 2025-06-17` == 11 in `docs/`, paired with `2026-06-19` == 0 outside `review_by:` lines.
- `15 deployment rings` == 5, `300 Autopatch groups` == 4, `300 groups` == 0.
- Occurrence-aware full-heading needles: `## Prose Style Authoring Standard` x1; `### D-01:` through `### D-04:` x3 each and `### D-05:` x2 in `EEE-SOP-standard.md`.
- The five glossary H3s by full text with counts (`_glossary.md:326,332,338,344`; `_glossary-linux.md:141`).

**Explicitly NOT pinnable:** anything under `.planning/`; line numbers; pin counts; `INTRODUCED`; `LINE COUNT DIFFERS`; zip presence; manifest rows; runner or sweep totals.

**Final content revision:** `b889501f7e43dfc22f9a85f10f645032a1a6bf44` -- zero `docs/` or `scripts/pipeline/` bytes moved across the entirety of this plan (`git diff --stat 699b24a7 HEAD -- docs/` empty).

**Apex triple:** `check-phase-153.mjs` 111/0/0; `check-phase-54/55/56.mjs` 32/32/32; C17 237/0; `check-nav-hub-links.mjs` 0/0.

**Structural contract and link-checker results:** C17 -- 237 files checked, 0 violations. `check-nav-hub-links.mjs` -- 0 hub-presence failures, 0 corpus-link failures.

**Prose gate's exit:** `check-prose-style.py` self-test 7/7, full run all-PASS, exit 0 (registered in no chain or CI workflow -- Phase 158 re-runs it by hand each time; its docstring exclusion record is date-stamped, not re-derivable, per D-45).

**The four attributed planning-tree findings:** plan 158-06's `verify-meaning.py` re-run at BASE `d0b611e8` found 4 `.planning/`-scoped findings attributed in `_DISPOSITIONS-158.tsv`'s header (never padded as data rows); 0 undispositioned `docs/` findings.

**The six outside-set files:** the em-dash sweep in plan 158-03 touched 6 files outside Phase 157's enumerated 59-file surface (`docs/_registry/RE-index.md`, `09-aosp-realwear`, `11-aosp-pico`, `end-user-guides/android-work-profile-setup`, `l1-runbooks/01-device-not-registered`, `recipes/02-shared-ipad-full-provisioning`) -- each carries its own `drift[]` row in `158-GATE-BASELINE.json`.

**The history blocker with its figures and the ancestry fact:** `9a114815` (the commit carrying the scrubbed CMG hostname) is unreachable from any remote ref (`git branch -r --contains 9a114815` empty); `master` is an ancestor of `9a114815`, and `e129081e` (the v1.21 close-gate SHA HARN-01 needs) is an ancestor of both `master` and `9a114815` -- this is the fact that makes a squash-merge-to-master clean. A rewrite at `9a114815` instead would change 103 strict / 104 inclusive commits and invalidate ~60% of the commit SHAs cited across the 155-157 phase artifacts. `AR-155-01` is the pre-existing accepted-risk entry; this phase carries it forward as `AR-158-01` (authored in `158-SECURITY.md` when the security workflow runs -- see below).

**The parked assertion from the previous phase:** 157 D-32's assertion (c) is parked for `check-phase-157.mjs`, which does not exist as a validator leaf.

**Absence of validator leaves for this milestone's content phases:** zero leaves exist for Phases 154-158 (only `check-phase-150` through `check-phase-153` exist as apex members); Phase 159 authors every v1.22 content-phase leaf per 155 D-52.

**The judge's structural blindness:** the fresh-agent judge pass in plan 158-04 covers only the 2 modified pre-existing lines it was dispatched against; it is structurally blind to Phase 157's added prose and to this phase's own remediation text (stated explicitly in `158-JUDGE-FINDINGS.md`). No v1.22 requirement claims broader judge coverage.

**The two project Stop hooks in an ignored settings file:** `.claude/settings.local.json` is gitignored (`.gitignore:66`) and carries two of this project's four Stop hooks; neither reproduces in any fresh clone.

## Two Owner Actions Recorded (performed by nobody in this plan)

1. **Skill-copy reconciliation.** `~/.claude/skills/google-style/` (user-level) lacks Phase 157's 8-line STD-03 docstring and 4-line STD-04 anti-pattern, and carries a stray `check.py.bak`; `~/.claude/skills/google-style-verify/` does not exist at the user level at all. The owner may run `cp -r .claude/skills/google-style-verify ~/.claude/skills/` (zero repository diff) to reconcile. Not performed here.
2. **History-archive backup.** A `git bundle create <path on a different drive, outside this repository> --all` plus `git bundle verify` is an owner action for backing up local history before any future rewrite decision at Phase 159. It packs `9a114815` (the scrubbed-value commit) as an opaque carrier that no grep and no C17 structural gate can see -- carried as its own risk entry, not this plan's to perform. Never committed to this repository; never exempted from the ignore rules. Not performed here.

## Security Workflow Instruction

**The security workflow (`/gsd-secure-phase`) runs after this phase completes**, with its auditor spawned deliberately rather than short-circuited (per D-32 -- 157's three deliberate auditors are what found the invented glossary claim there). If it finds anything, the remediation replays the full tail from the corpus edit forward: sweep gate -> judge-blindness note -> binding audit at the new SHA -> SC#4 after-half -> bundle rebuild -> blob equality + identical untracked set -> amendments -> apex + check-phase-54/55/56. `AR-158-01` (the accepted-risk register row for the scrubbed value remaining in unpushed history) is authored in `158-SECURITY.md` at that time, citing `AR-155-01` and this plan's HARN-06 amendment.

## Next Phase Readiness

- Both of Phase 158's requirements (VERIFY-05, VERIFY-06) are discharged: the publish bundle is proven fail-closed with a correct manifest and readme and both drift canaries agreeing with the registry row count; every milestone claim this phase's measurements superseded is amended beside the original text.
- The final apex is green (111/0/0, 32/32/32, C17 237/0, nav-hub 0/0, check-prose-style.py all-PASS) after the last planning-document edit -- Phase 159 inherits a clean starting state with no open structural-gate failures.
- No blockers for Phase 159's HARN work. `.planning/WINDOWS.md` entry #16 (the link-adjacency em-dash residual at `docs/recipes/02-shared-ipad-full-provisioning.md:286`) remains open, carried forward unchanged by this plan.
- Phase 159 (HARN) can proceed once `/gsd-secure-phase` has run per the Security Workflow Instruction above.

---
*Phase: 158-final-corpus-verification-publish-bundle*
*Completed: 2026-09-08*

## Self-Check: PASSED

- All created/modified files confirmed present on disk: `158-BUNDLE-RUN.txt` (488 lines, non-empty), `158-BUNDLE-MANIFEST.csv` (header + 237 rows), `scripts/pipeline/filename-map.md` (unchanged), `158-GATE-BASELINE.json` (recorded.zip_size_bytes/zip_sha256 filled, final_apex_recorded_in set), `.planning/REQUIREMENTS.md`/`ROADMAP.md`/`STATE.md` (six amendment blocks + one new bullet present).
- All three task commits (`86c5f074`, `b0d512e5`, `eec65c6f`) confirmed present via `git log --oneline`.
- All task-level `<acceptance_criteria>` and `<verify>` commands re-confirmed passing above with their exact output: bundle-run log length and parity line; archive presence; filename-map diff/hash identity; pipeline-directory untouched; all twelve inline assertions with quoted results; archive size/hash recorded outside drift rows; corpus identity on the post-bundle tree; six amendment blocks with measured, plan-labelled figures and no placeholder; no checkbox hand-edited; scrub bullet not rewritten; off-by-one literal and bare Platform token both absent; final apex (111/0/0, 32/32/32, C17 237/0, nav-hub 0/0) green.
- Plan-level `<verification>` re-confirmed: the build ran once alone under the cap with output captured and committed; all twelve assertions evaluated inline with verbatim results; filename map unchanged by both methods with the pipeline directory untouched by any commit in this phase; corpus identity holds; archive size/hash recorded outside drift rows and labelled non-reproducible; six amendment blocks landed with measured plan-labelled figures and no placeholder, STATE.md gained a bullet and lost none; neither governing document names the forbidden literal or carries the forbidden blockquote token; no checkbox hand-edited; the apex chain, C17, nav-hub link checker and the three planning-tree validators are green after the last planning-document edit with the apex triple recorded as the final apex; both requirement identifiers are declared only in this plan's frontmatter.
