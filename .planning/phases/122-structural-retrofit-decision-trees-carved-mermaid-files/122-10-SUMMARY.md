---
phase: 122-structural-retrofit-decision-trees-carved-mermaid-files
plan: 10
subsystem: docs-retrofit
tags: [mermaid-conversion, per-block-classification, failure-annotation-map, decision-table, eee-standard, c17, retro-07, lifecycle, guide, blockquote-remediation, d01-independent-rederivation]

# Dependency graph
requires:
  - phase: 122-01
    provides: retrofit-mermaid-structural.mjs fork (GUIDE_DIRS router covers docs/lifecycle-apv2/ and docs/ios-lifecycle/, mermaid-absence guard, doc_id-idempotency guard, keyless-Windows allowlist covering lifecycle-apv2/02)
provides:
  - docs/lifecycle-apv2/02-deployment-flow.md converted per-block (Block 1: linear 11-node chain -> numbered stage list, LOCKED - 11; Block 2: failure-annotation map, 5 dashed F_* edges -> Stage|Failure Mode table, LOCKED - 13), enrolled RE-200 (Guide, Windows, Approved); 2 blockquote groups split
  - docs/ios-lifecycle/01-ade-lifecycle.md converted (corrected classification: file actually carries 1 diamond, not 0 as RESEARCH/PLAN stated -> decision table, LOCKED - 10), enrolled RE-190 (Guide, iOS, Approved); 2 blockquote groups split
  - docs/ios-lifecycle/02-mdm-migration.md converted (linear 7-node chain, 0 diamonds, confirmed matching RESEARCH -> numbered stage list, LOCKED - 7), enrolled RE-191 (Guide, iOS, Approved); 10 blockquote groups split (incl. corpus-worst 656c block)
affects: [122-verification, phase-123-nav-hub-retrofit]

# Tech tracking
tech-stack:
  added: []
  patterns: [per-block-classification-apv2-02, failure-annotation-map-to-stage-failure-table, diamond-detected-mid-linear-chain-to-path-table, blockquote-sentence-boundary-split-with-real-blank-line-separators, word-multiset-diff-proof]

key-files:
  created: []
  modified:
    - docs/lifecycle-apv2/02-deployment-flow.md
    - docs/ios-lifecycle/01-ade-lifecycle.md
    - docs/ios-lifecycle/02-mdm-migration.md
    - docs/_registry/RE-index.md

key-decisions:
  - "lifecycle-apv2/02-deployment-flow.md's Block 1 (11 nodes/0 labeled edges) and Block 2 (13 nodes/0 labeled edges, 5 dashed F_* edges) were independently re-derived against git show 71be4ab and matched RESEARCH's stated counts exactly -- no corrections needed; per-block classification confirmed the CONTEXT-cited 'triage missed the second block' hazard does NOT recur here since both blocks were captured correctly upstream"
  - "ios-lifecycle/01-ade-lifecycle.md: independent re-derivation against git show 71be4ab found the file actually contains a diamond (S6{User Affinity?} with 2 labeled branches -- 'With User Affinity' -> S7, 'Userless' -> S8 -- reconverging at S8), directly contradicting RESEARCH's Class 3 table row ('0 diamonds') and the PLAN's Task 2 instruction ('NO diagram of diamond -> numbered stage list ... LOCKED-7'). Per the D-02 bright-line (any diamond -> table, no exceptions) AND CONTEXT.md's own explicit LOCK note naming this exact file ('do NOT reopen a nested list only for a single small fork exception on branch-light files (macos-lifecycle/00, ios-lifecycle/01)'), converted to a Path decision table instead of a numbered list. Corrected node/edge count: 8 nodes + 2 labeled edges = LOCKED-10 (not the plan's stated LOCKED-7)"
  - "ios-lifecycle/02-mdm-migration.md's 7 nodes/0 labeled edges (LOCKED-7) were independently re-derived against git show 71be4ab and matched RESEARCH/PLAN's stated count exactly -- confirms this file's diagram truly is diamond-free, in contrast to its sibling 01-ade-lifecycle.md"
  - "ios-lifecycle/02-mdm-migration.md's 656-char 'Pre-iOS/iPadOS-26 wipe-and-re-enroll' blockquote (the corpus's worst single block) was joined as ONE C17 group despite containing bare '>' separator lines between its 4 visual paragraphs -- confirms the established lesson (122-09, 121-03) that only a genuinely blank (non-'>') line breaks a C17 assertion #12 group. Split into 6 blockquote groups (2 of the 4 original paragraphs also individually exceeded 200 chars and needed internal sentence-level splitting) using real blank-line separators; word-multiset diff against git show 71be4ab confirmed zero real-word loss across all 10 blockquote groups in the file"
  - "Registry rows RE-190 and RE-200 were flipped Pending -> Approved in the Task 3 commit rather than their own task commits (Tasks 1/2), consolidating all three registry mirror updates into one edit alongside RE-191's flip -- a process/sequencing choice, not a content change; each file's own frontmatter already carried status: Approved from the fork run at the time of its own commit"

patterns-established:
  - "D-01 independent re-derivation caught a genuine planning-input error on ios-lifecycle/01-ade-lifecycle.md (RESEARCH's Class 3 table row undercounted the file's diamond from 1 to 0) -- the fourth such correction in Phase 122 (after 122-02's 08-android, 122-06's admin-setup-android/ios, 122-07's 8021x/01), and the first one CONTEXT.md itself had already anticipated by name in its D-02 LOCK note, providing independent confirmation that the LOCK note's caution was justified by live file content, not just theoretical risk"
  - "A diamond appearing mid-chain (not at the file's structural center) still triggers the D-02 bright-line -- ios-lifecycle/01's single decision point sits after 5 trunk stages and before 2 final stages, yet the presence of ANY {...} node mandates table treatment over a numbered list, confirming the bright-line is purely structural (diamond present/absent), not proportional to how much of the diagram the branch occupies"
  - "Bare '>' separator lines inside a single admonition/callout block do NOT break a C17 assertion #12 blockquote group (third confirmed instance this phase, after 122-09) -- always verify with a standalone grouping script before considering a multi-paragraph blockquote 'already split'"

key-links:
  - from: "docs/lifecycle-apv2/02-deployment-flow.md"
    to: "docs/_registry/RE-index.md"
    via: "doc_id RE-200 (Guide) injected by fork; flipped Pending->Approved"
    pattern: "doc_id:\\s*RE-200"
  - from: "docs/ios-lifecycle/01-ade-lifecycle.md"
    to: "docs/_registry/RE-index.md"
    via: "doc_id RE-190 (Guide) injected by fork; flipped Pending->Approved"
    pattern: "doc_id:\\s*RE-190"
  - from: "docs/ios-lifecycle/02-mdm-migration.md"
    to: "docs/_registry/RE-index.md"
    via: "doc_id RE-191 (Guide) injected by fork; flipped Pending->Approved"
    pattern: "doc_id:\\s*RE-191"

requirements-completed: []

# Metrics
duration: 70min
completed: 2026-07-08
---

# Phase 122 Plan 10: Convert + Enroll lifecycle-apv2/02-deployment-flow.md + ios-lifecycle/{01,02}.md (RE-200/190/191) Summary

**Converted the 3 remaining `lifecycle-apv2`/`ios-lifecycle` Mermaid-bearing files — apv2/02's per-block failure-annotation map (5 dashed edges, CONTEXT's own cited "triage missed the second block" example, confirmed intact here), and a genuine D-01 catch on ios-lifecycle/01 where independent re-derivation found a diamond RESEARCH's table had missed entirely, correcting its classification from numbered-list to decision-table per the D-02 bright-line CONTEXT.md itself had pre-flagged by filename.**

## Performance

- **Duration:** ~70 min
- **Completed:** 2026-07-08
- **Tasks:** 3 completed
- **Files modified:** 4 (3 docs + registry)

## Accomplishments

- `docs/lifecycle-apv2/02-deployment-flow.md`: converted per-block (D-02 Amendment 1) — Block 1 (linear 11-node happy-path chain, 0 diamonds) to a numbered stage list (LOCKED — 11: 11 nodes + 0 labeled edges); Block 2 (failure-annotation map, 5 dashed `F_REG/F_IME/F_APP1/F_SCRIPT/F_APP2` edges) to a `Stage | Failure Mode` table preserving all 5 rows (LOCKED — 13: 13 nodes + 0 labeled edges) — confirms CONTEXT's exact citation of this block as the one a naive triage missed; removed click-navigation directives and `classDef` stage/failure styling as stale prose; split both pre-existing >200c blockquote groups (Version gate 243c, ETG note 212c) at sentence boundaries; enrolled RE-200 (Guide, Windows — platform auto-injected per the keyless-Windows allowlist)
- `docs/ios-lifecycle/01-ade-lifecycle.md`: independent re-derivation against `git show 71be4ab` found a diamond (`S6{User Affinity?}`, 2 labeled branches reconverging at Stage 7) that RESEARCH's Class 3 table and the PLAN's Task 2 instruction both missed (stated "0 diamonds / LOCKED-7 numbered-list"). Per the D-02 bright-line and CONTEXT.md's own LOCK note explicitly naming this file as one that must NOT get a nested-list exception, converted to a Path decision table (LOCKED — 10: 8 nodes + 2 labeled edges) preserving both branches and their Stage-7 reconvergence; reworded one stale "pipeline diagram" reference; split both pre-existing >200c blockquote groups (Version gate 394c, portal-navigation Note 268c); enrolled RE-190 (Guide, iOS — pre-existing platform key)
- `docs/ios-lifecycle/02-mdm-migration.md`: converted the linear 7-node chain (0 diamonds, confirmed matching RESEARCH exactly) to a numbered stage list (LOCKED — 7: 7 nodes + 0 labeled edges); split all 10 pre-existing >200c blockquote groups, including the corpus-worst 656-char "Pre-iOS/iPadOS-26 wipe-and-re-enroll" callout (4 visual paragraphs joined by bare `>` separator lines that do NOT break a C17 group — confirmed via a standalone grouping script — split into 6 groups with genuine blank-line separators, 2 of the 4 original paragraphs individually exceeding 200 chars and needing further sentence-level splitting); word-multiset diff against `git show 71be4ab` confirmed zero real-word loss across all 10 groups; enrolled RE-191 (Guide, iOS — pre-existing platform key)
- Independently re-derived all 3 files' node/edge counts against `git show 71be4ab` bytes before writing any conversion — 2 of 3 (apv2/02, ios/02) matched the plan/RESEARCH's stated counts exactly; ios/01 required a correction (documented above and in Deviations)
- Full corpus C17 re-verified after each write and again after all 3 tasks: 222 files checked, 0 violations (assertions #1–13 all 0); `--self-test` 4/4 passed
- Flipped RE-190/191/200 registry rows Pending → Approved
- Stale-prose grep (`mermaid|click|decision tree|diagram above|diagram below|node shape|legend|classDef`) clean in all 3 files (3 "Click" matches in ios/02's operator UI steps are genuine instructions, not diagram-interaction residue — confirmed false positives)

## Task Commits

Each task was committed atomically:

1. **Task 1: Convert + enroll lifecycle-apv2/02-deployment-flow.md (RE-200, 2 blocks — classify per block)** - `22d2c06` (feat)
2. **Task 2: Convert + enroll ios-lifecycle/01-ade-lifecycle.md (RE-190, corrected classification to decision table)** - `dedf3f9` (feat)
3. **Task 3: Convert + enroll ios-lifecycle/02-mdm-migration.md (RE-191, LOCKED — 7, 10 blockquote groups); flip RE-190/191/200 registry rows** - `913c58e` (feat)

**Plan metadata:** (this commit, docs: complete plan)

## Files Created/Modified

- `docs/lifecycle-apv2/02-deployment-flow.md` — Block 1 linear chain -> numbered stage list (LOCKED-11); Block 2 failure-map -> Stage|Failure Mode table (LOCKED-13); 2 blockquote groups split into 4; enrolled RE-200 (Guide, Windows, Approved)
- `docs/ios-lifecycle/01-ade-lifecycle.md` — Diamond-bearing pipeline -> Path decision table (LOCKED-10, corrected from plan's stated LOCKED-7 numbered-list); 2 blockquote groups split into 5; enrolled RE-190 (Guide, iOS, Approved)
- `docs/ios-lifecycle/02-mdm-migration.md` — Linear 7-node chain -> numbered stage list (LOCKED-7); 10 blockquote groups split into 26 (incl. the 656c block split 6 ways); enrolled RE-191 (Guide, iOS, Approved)
- `docs/_registry/RE-index.md` — RE-190/191/200 flipped Pending -> Approved

## Decisions Made

- ios-lifecycle/01-ade-lifecycle.md's diamond was converted to a Path decision table rather than a numbered list with an embedded branch note, per the D-02 bright-line's non-negotiable rule and CONTEXT.md's explicit LOCK note naming this file — no exception was made despite the file's otherwise-simple, mostly-linear structure
- lifecycle-apv2/02-deployment-flow.md's Block 2 failure-annotation map preserved all 5 dashed edges as explicit table rows, matching the shipped Pattern 2 exemplar verbatim (RESEARCH.md/PATTERNS.md) rather than re-deriving a new shape
- All 12 blockquote splits across the 3 files used real blank-line separators between sub-groups (never bare `>` marker lines), each verified against a standalone script replicating C17 assertion #12's exact join-then-measure algorithm before running the validator

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Corrected ios-lifecycle/01-ade-lifecycle.md's classification from numbered-list to decision table**
- **Found during:** Task 2, immediately after reading `git show 71be4ab:docs/ios-lifecycle/01-ade-lifecycle.md`
- **Issue:** The PLAN's Task 2 (sourced from RESEARCH.md's Class 3 table row) stated this file has "linear chain graph TD, 7 nodes / 6 plain edges / 0 diamonds" and instructed conversion to a numbered stage list annotated `LOCKED — 7`. Independent re-derivation against the pre-122 Mermaid bytes found the diagram actually contains `S6{User Affinity?}` — a genuine decision diamond with 2 labeled branches (`With User Affinity` -> S7, `Userless` -> S8) that reconverge at S8 (Stage 7). This is 8 nodes (not 7) and 2 labeled + 6 plain edges (not 0 labeled + 6 plain). Per the D-02 bright-line ("any diamond -> table, no exceptions") and CONTEXT.md's own explicit LOCK note — which names `ios-lifecycle/01` verbatim as a file where a nested-list exception must NOT be reopened — converting this file to a numbered list as originally planned would have violated the phase's core locked decision and silently dropped the branch/reconvergence structure.
- **Fix:** Converted the diagram to a Path decision table (`Path | User Affinity? (root decision) | Step 6 outcome | Destination`) preserving both branches and the explicit Stage-7 reconvergence, annotated `LOCKED — 10 (8 nodes + 2 labeled edges)` per the corrected count.
- **Files modified:** `docs/ios-lifecycle/01-ade-lifecycle.md`
- **Verification:** C17 exits 0; `grep -c 'LOCKED — 10'` = 1; both branches and the reconvergence into "Stage 7: Home Screen and Ongoing MDM" independently visible in the table's Destination column for both rows.
- **Committed in:** `dedf3f9` (Task 2 commit — corrected before commit, not a follow-up fix)

---

**Total deviations:** 1 auto-fixed (Rule 1 — classification correction caught by D-01 independent re-derivation before any commit shipped the defect)
**Impact on plan:** No scope creep — same 3 files enrolled at the same IDs; only ios-lifecycle/01's conversion shape and LOCKED-N annotation changed from the plan's (incorrect) numbered-list/LOCKED-7 instruction to the D-02-compliant decision-table/LOCKED-10 shape. This is the fourth D-01-caught planning-input correction in Phase 122 (after 122-02, 122-06, 122-07) and the first one CONTEXT.md itself had already anticipated by naming the file in its LOCK note.

## Issues Encountered

None beyond the classification correction documented above.

## User Setup Required

None - no external service configuration required.

## Verification Results

- C17 exits 0 on all 3 files individually and on the full corpus (`--all`, 222 files): assertions #1–13 all 0; `--self-test` 4/4 passed
- `grep -c '^```mermaid'` = 0 for all 3 files
- `LOCKED — 11` (B1) and `LOCKED — 13` (B2) present in lifecycle-apv2/02-deployment-flow.md; `grep -c 'Failure Mode'` = 1
- `LOCKED — 10` present in ios-lifecycle/01-ade-lifecycle.md (corrected from the plan's stated LOCKED — 7)
- `LOCKED — 7` present in ios-lifecycle/02-mdm-migration.md
- `doc_id: RE-200` / `RE-190` / `RE-191` each present exactly once; `doc_type: Guide` present in all 3; `platform: Windows` auto-injected in apv2/02, `platform: iOS` pre-existing in both ios-lifecycle files
- lifecycle-apv2/02's all 5 F_* dashed failure edges preserved as explicit `Stage | Failure Mode` table rows
- ios-lifecycle/01's `With User Affinity` / `Userless` branches and Stage-7 reconvergence preserved as explicit table rows
- All 2 (apv2/02), 2 (ios/01), and 10 (ios/02) pre-existing over-200-char blockquote groups now split ≤200 chars — verified via a script replicating C17's exact join-then-measure grouping algorithm; word-multiset diff (git show 71be4ab vs. working tree, `>`-prefix stripped) confirmed zero real-word loss across all 10 ios/02 blockquote splits (mermaid-to-table/list content transforms are intentionally NOT word-preserving — same established exception as 122-09)
- Stale-prose grep (`mermaid|click|decision tree|diagram above|diagram below|node shape|legend|classDef`) clean in all 3 files (ios/02's 3 "Click" matches are genuine operator UI steps, confirmed false positives)
- All 3 registry rows (RE-190/191/200) confirmed Approved via grep
- No unintended file deletions in any of the 3 task commits (`git diff --diff-filter=D` empty for each)

## Known Stubs

None.

## Threat Flags

None — this plan touches only existing lifecycle/lifecycle-apv2/ios-lifecycle Guide files and the registry table; no new network endpoints, auth paths, or trust-boundary surface introduced. All threat-register mitigations were actively verified: T-122-01 (dropping lifecycle-apv2/02 block 2 or one of its 5 F_* dashed edges) — all 5 explicitly preserved and independently re-derived against `git show 71be4ab`; T-122-08 (word-loss across ios/02's 10 blockquote splits) — word-multiset diff proof confirmed zero real-word loss; T-122-05 (stale diagram-prose) — grep clean in all 3 files.

## Next Phase Readiness

- RE-190/191/200 are C17-green, Mermaid-free, and Approved
- RETRO-07 remainder progress: 6 of 9 Mermaid-bearing lifecycle files now converted/enrolled (lifecycle/00, lifecycle/03, lifecycle/04 from 122-09; lifecycle-apv2/02, ios-lifecycle/01, ios-lifecycle/02 from this plan); 3 remain — `docs/macos-lifecycle/{00-ade-lifecycle,01-psso-provisioning-walkthrough,02-mdm-migration-psso}.md` — handed to subsequent Phase 122 plans (122-11 through 122-15)
- Remaining Phase 122 work: the 11 decision-trees (RETRO-05) also remain
- No blockers identified

## Self-Check: PASSED

- FOUND: `docs/lifecycle-apv2/02-deployment-flow.md`
- FOUND: `docs/ios-lifecycle/01-ade-lifecycle.md`
- FOUND: `docs/ios-lifecycle/02-mdm-migration.md`
- FOUND: commit `22d2c06` (Task 1)
- FOUND: commit `dedf3f9` (Task 2)
- FOUND: commit `913c58e` (Task 3)

---
*Phase: 122-structural-retrofit-decision-trees-carved-mermaid-files*
*Completed: 2026-07-08*

## Self-Check Verification Log

- FOUND: `docs/lifecycle-apv2/02-deployment-flow.md`
- FOUND: `docs/ios-lifecycle/01-ade-lifecycle.md`
- FOUND: `docs/ios-lifecycle/02-mdm-migration.md`
- FOUND: commit `22d2c06`
- FOUND: commit `dedf3f9`
- FOUND: commit `913c58e`

Result: **PASSED**
