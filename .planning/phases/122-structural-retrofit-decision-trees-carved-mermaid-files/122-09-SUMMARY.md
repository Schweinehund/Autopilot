---
phase: 122-structural-retrofit-decision-trees-carved-mermaid-files
plan: 09
subsystem: docs-retrofit
tags: [mermaid-conversion, per-block-classification, failure-annotation-map, subgraph-partition, decision-table, eee-standard, c17, retro-07, lifecycle, guide, blockquote-remediation]

# Dependency graph
requires:
  - phase: 122-01
    provides: retrofit-mermaid-structural.mjs fork (GUIDE_DIRS router already covers docs/lifecycle/, mermaid-absence guard, doc_id-idempotency guard, keyless-Windows allowlist covering lifecycle/00, lifecycle/03, lifecycle/04)
provides:
  - docs/lifecycle/00-overview.md converted per-block (Block 1: decision graph -> ordinal decision table, LOCKED - 12; Block 2: failure-annotation map -> Stage|Failure Mode table, LOCKED - 10), enrolled RE-192 (Guide, Windows, Approved); 1 blockquote group split
  - docs/lifecycle/03-oobe.md converted (2-diamond decision graph -> two linked decision tables, LOCKED - 20, AADUD/UDOOBE/AADSD 3-way merge into ESP4 preserved), enrolled RE-195 (Guide, Windows, Approved); 4 blockquote groups split
  - docs/lifecycle/04-esp.md converted (subgraph-partitioned Process Flow -> Device Phase/User Phase headed sub-lists + D4->U1 transition note, LOCKED - 8), enrolled RE-196 (Guide, Windows, Approved); 3 blockquote groups split
affects: [122-verification, phase-123-nav-hub-retrofit]

# Tech tracking
tech-stack:
  added: []
  patterns: [per-block-classification-lifecycle-00, failure-annotation-map-to-stage-failure-table, subgraph-partition-to-headed-sublists, two-linked-decision-tables-for-nested-diamond, blockquote-sentence-boundary-split-with-real-blank-line-separators]

key-files:
  created: []
  modified:
    - docs/lifecycle/00-overview.md
    - docs/lifecycle/03-oobe.md
    - docs/lifecycle/04-esp.md
    - docs/_registry/RE-index.md

key-decisions:
  - "lifecycle/00-overview.md Block 1 (9 nodes/3 labeled edges) and Block 2 (10 nodes/0 labeled edges) were independently re-derived against git show 71be4ab and matched the plan's stated LOCKED-12/implicit-10 counts exactly -- no corrections needed"
  - "lifecycle/03-oobe.md's 15 nodes/5 labeled edges (LOCKED-20) were independently re-derived against git show 71be4ab and matched the plan's stated count exactly -- the 2-diamond structure (Deployment Mode, ESP result) required two LINKED decision tables (a primary Path table plus a secondary ESP-Result sub-table for the Pre-Provisioning branch) rather than one flat table, since a single ordinal table cannot hold a nested decision without either dropping the second diamond's branches or duplicating rows; the 3-way merge into ESP4 (AADUD/UDOOBE/AADSD) is stated explicitly as a closing sentence naming all three converging edges"
  - "lifecycle/04-esp.md's 8 nodes/0 labeled edges (LOCKED-8) were independently re-derived against git show 71be4ab and matched the plan's stated count exactly -- confirming CONTEXT's own cited triage-undercount example (7 edges/8 nodes/2 subgraphs) holds; converted to two explicitly-headed numbered sub-lists (not a flattened single list) with an explicit prose transition note carrying the D4->U1 cross-subgraph edge, per the D-02 Amendment 2b non-negotiable rule"
  - "Discovered mid-Task-1 that a bare '>' (quote-marker-only) line does NOT break a C17 assertion #12 blockquote group -- only a truly blank (non-'>') line does, since the algorithm collects ALL consecutive lines matching /^>/ regardless of content. Corrected the Task 1 blockquote split from a bare '>' separator to a real blank line before proceeding to Tasks 2 and 3, matching the established docs/admin-setup-apv1/00-overview.md precedent (blank line, not quote-marker line, separates groups)"
  - "The two mermaid-syntax-to-prose word-multiset diffs (checked against git show 71be4ab for 00-overview.md and 03-oobe.md) show large 'extra/missing' counts by design -- mermaid node-ID tokens (S1, M, AADUD, ESP4, etc.) disappear and are replaced by full English phrases repeated across table rows; this is the intended D-02 hand-authored content transform, not a word-preservation violation (word-preservation discipline applies only to the blockquote-split transform, which was verified separately and passed clean)"

patterns-established:
  - "Per-block classification (D-02 Amendment 1) on lifecycle/00-overview.md: Block 1 (has a diamond) -> decision table; Block 2 (dashed failure-mapping edges, no diamond) -> Stage|Failure Mode table -- confirms the bright-line applies at the BLOCK level even within a single file, with each block's own LOCKED-N annotation"
  - "Nested-diamond decision graphs (2 diamonds where the second diamond only fires on one branch of the first, as in lifecycle/03-oobe.md) resolve to two LINKED tables: a primary Path table whose one row points to 'see ESP-Result table below' for the branch that re-decides, plus a secondary decision table for that inner diamond -- avoids both flattening (which would drop the inner branch structure) and duplicating unrelated branches into the sub-table"
  - "Subgraph-partitioned flows with a single cross-subgraph edge and zero diamonds (lifecycle/04-esp.md) convert to two headed numbered sub-lists plus one explicit prose transition sentence naming the exact source and target node labels of the cross-edge -- this is the third confirmed instance of the D-02 Amendment 2b shape in this phase, distinct from the failure-annotation-map shape used for lifecycle/00 Block 2"
  - "Blockquote #12 remediation requires a genuinely blank (non-'>') line between sub-groups, not a bare '>' marker line -- multi-bullet L2 Note blocks (1054c and 1317c) were split into one blockquote paragraph per bullet (or per clause, where a single bullet's sentence still exceeded 200 chars alone), each separated by a true blank line, verified against a standalone script replicating C17 assertion #12's exact join-then-measure algorithm before running the validator"

key-links:
  - from: "docs/lifecycle/00-overview.md"
    to: "docs/_registry/RE-index.md"
    via: "doc_id RE-192 (Guide) injected by fork; flipped Pending->Approved"
    pattern: "doc_id:\\s*RE-192"
  - from: "docs/lifecycle/03-oobe.md"
    to: "docs/_registry/RE-index.md"
    via: "doc_id RE-195 (Guide) injected by fork; flipped Pending->Approved"
    pattern: "doc_id:\\s*RE-195"
  - from: "docs/lifecycle/04-esp.md"
    to: "docs/_registry/RE-index.md"
    via: "doc_id RE-196 (Guide) injected by fork; flipped Pending->Approved"
    pattern: "doc_id:\\s*RE-196"

requirements-completed: []

# Metrics
duration: 65min
completed: 2026-07-08
---

# Phase 122 Plan 09: Convert + Enroll lifecycle/00-overview.md + lifecycle/03-oobe.md + lifecycle/04-esp.md (RE-192/195/196) Summary

**Converted the 3 core `docs/lifecycle/` Mermaid-bearing files carrying the phase's highest silent-loss-risk structures — lifecycle/00's 2 heterogeneous blocks (per-block classification), lifecycle/03's 2-diamond nested decision with a 3-way merge into ESP4, and lifecycle/04's subgraph-partitioned Device/User Phase split with its D4->U1 cross-edge — all independently re-derived against `git show 71be4ab` and enrolled Approved.**

## Performance

- **Duration:** ~65 min
- **Completed:** 2026-07-08
- **Tasks:** 3 completed
- **Files modified:** 4 (3 docs + registry)

## Accomplishments

- `docs/lifecycle/00-overview.md`: converted per-block (D-02 Amendment 1, non-negotiable) — Block 1 (decision graph, 1 diamond `M`) to an ordinal decision table preserving the `RESEAL→S3a` rejoin and the dual `S3a`+`S3c`→`S4` reconvergence (LOCKED — 12: 9 nodes + 3 labeled edges); Block 2 (failure-annotation map, 5 dashed edges) to a `Stage | Failure Mode` table (LOCKED — 10: 10 nodes + 0 labeled edges); reworded two stale "diagram"/"green nodes, red nodes" captions to describe the new tables; split the 1 pre-existing 208-char blockquote group; enrolled RE-192 (Guide, Windows — platform auto-injected per the keyless-Windows allowlist)
- `docs/lifecycle/03-oobe.md`: converted the 2-diamond decision graph (`Deployment Mode?`, `ESP result?`) to two linked decision tables — a primary Path table (User-Driven / Pre-Provisioning / Self-Deploying) and a secondary ESP-Result table for the Pre-Provisioning branch's inner decision — explicitly naming all three edges that converge into `Stage 4: ESP` (AADUD/UDOOBE/AADSD 3-way merge) in a closing sentence (LOCKED — 20: 15 nodes + 5 labeled edges); split all 4 pre-existing blockquote groups (Version gate 208c, Autopilot Reset note 243c, the 1054c L2 Note across 4 bullets, APv2 Note 380c) into word-preserving paragraphs; enrolled RE-195 (Guide, Windows)
- `docs/lifecycle/04-esp.md`: converted the subgraph-partitioned Process Flow diagram (0 diamonds, 2 subgraphs `Device Phase`/`User Phase`, cross-edge `D4→U1`) to two explicitly-headed numbered sub-lists plus a prose transition note naming the exact cross-edge ("Device phase complete → User logs in") — CONTEXT's own cited triage-undercount example (7 edges/8 nodes/2 subgraphs) confirmed exactly on re-derivation (LOCKED — 8: 8 nodes + 0 labeled edges); split all 3 pre-existing blockquote groups (Version gate 208c, the 1317c L2 Note across 4 bullets, APv2 Note 345c); enrolled RE-196 (Guide, Windows)
- Independently re-derived all 3 files' node/edge counts against `git show 71be4ab` bytes before writing any conversion — all 3 matched the plan/RESEARCH's stated counts exactly (LOCKED-12/10, LOCKED-20, LOCKED-8), no corrections needed this plan (unlike several prior 122-0X plans)
- Discovered and corrected a blockquote-splitting technique error mid-Task-1: a bare `>` separator line does NOT break a C17 assertion #12 blockquote group (only a genuinely blank line does, since the grouping algorithm collects all consecutive `/^>/`-matching lines regardless of content) — fixed before Tasks 2/3, matching the established `docs/admin-setup-apv1/00-overview.md` precedent
- Full corpus C17 re-verified after each write and again after all 3 tasks: 219 files checked, 0 violations (assertions #1–13 all 0); `--self-test` 11 passed / 0 failed
- Flipped RE-192/195/196 registry rows Pending → Approved
- Stale-prose grep (`mermaid|click|decision tree|diagram above|diagram below|node shape|legend|classDef`) clean in all 3 files

## Task Commits

Each task was committed atomically:

1. **Task 1: Convert + enroll lifecycle/00-overview.md (RE-192, 2 blocks — classify per block)** - `110ff26` (feat)
2. **Task 2: Convert + enroll lifecycle/03-oobe.md (RE-195, LOCKED — 20, 3-way ESP4 merge)** - `7124b26` (feat)
3. **Task 3: Convert + enroll lifecycle/04-esp.md (RE-196, LOCKED — 8, subgraph partition)** - `0c1b097` (feat)

**Plan metadata:** (this commit, docs: complete plan)

## Files Created/Modified

- `docs/lifecycle/00-overview.md` — Block 1 decision graph -> ordinal decision table (LOCKED-12); Block 2 failure-map -> Stage|Failure Mode table (LOCKED-10); 1 blockquote group split into 2; enrolled RE-192 (Guide, Windows, Approved)
- `docs/lifecycle/03-oobe.md` — 2-diamond decision graph -> two linked decision tables preserving the 3-way ESP4 merge (LOCKED-20); 4 blockquote groups split into 12 paragraphs; enrolled RE-195 (Guide, Windows, Approved)
- `docs/lifecycle/04-esp.md` — Subgraph-partitioned Process Flow -> Device Phase/User Phase headed sub-lists + D4->U1 transition note (LOCKED-8); 3 blockquote groups split into 14 paragraphs; enrolled RE-196 (Guide, Windows, Approved)
- `docs/_registry/RE-index.md` — RE-192/195/196 flipped Pending -> Approved

## Decisions Made

- lifecycle/03-oobe.md's nested 2-diamond structure resolves to two LINKED tables (primary Path table + secondary ESP-Result table) rather than one flat table or a nested-list exception — a single flat table would either drop the inner branch's Success/Failure split or force an awkward duplicated-row shape; two linked tables preserve both diamonds' full branch structure while keeping each table simple and ordinal
- lifecycle/04-esp.md's Device Phase / User Phase partition is preserved as two headed numbered sub-lists (not flattened into one list), per the D-02 Amendment 2b non-negotiable rule, with the D4->U1 cross-edge stated as an explicit prose transition sentence naming both endpoint labels verbatim
- All blockquote splits used real blank-line separators between sub-groups (not bare `>` marker lines), verified against a standalone script replicating C17 assertion #12's exact join-then-measure algorithm before running the validator on each file

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Corrected the blockquote-split separator technique for lifecycle/00-overview.md's Version-gate blockquote**
- **Found during:** Task 1, immediately after the first edit
- **Issue:** Initially split the 208-char Version-gate blockquote using a bare `>` line as the paragraph separator between the two halves. On review of the C17 assertion #12 algorithm (`scripts/validation/c17-eee-contract.mjs:392-407`), a bare `>` line still matches `/^>/` and is collected into the SAME group as its neighbors — it does not reset the running length count. This would have shipped a still-208-char single group.
- **Fix:** Replaced the bare `>` separator with a genuinely blank (non-`>`) line, matching the established `docs/admin-setup-apv1/00-overview.md` precedent (blank line breaks the group; a bare `>` does not). Re-verified via a standalone script replicating the exact join-then-measure algorithm before proceeding to Tasks 2 and 3, both of which used the corrected technique from the start.
- **Files modified:** `docs/lifecycle/00-overview.md`
- **Verification:** Node script re-derivation confirmed both resulting groups (130 and 77 chars) are correctly separate and both ≤200; C17 assertion #12 confirmed 0 violations on the file.
- **Committed in:** `110ff26` (Task 1 commit — corrected before commit, not a follow-up fix)

---

**Total deviations:** 1 auto-fixed (Rule 1 — blockquote-splitting technique correction, caught before any commit shipped the defect)
**Impact on plan:** No scope creep — same 3 files, same conversion shapes as planned; only the blockquote-separator mechanics were corrected mid-Task-1, before Tasks 2/3 applied the same (correct) technique from the start.

## Issues Encountered

None beyond the blockquote-technique correction documented above.

## User Setup Required

None - no external service configuration required.

## Verification Results

- C17 exits 0 on all 3 files individually and on the full corpus (`--all`, 219 files): assertions #1–13 all 0; `--self-test` 11 passed / 0 failed
- `grep -c '^```mermaid'` = 0 for all 3 files (both blocks removed from lifecycle/00-overview.md)
- `LOCKED — 12` (B1) and `LOCKED — 10` (B2, implicit annotation) present in lifecycle/00-overview.md; `LOCKED — 20` present in lifecycle/03-oobe.md; `LOCKED — 8` present in lifecycle/04-esp.md
- `doc_id: RE-192` / `RE-195` / `RE-196` each present exactly once; `doc_type: Guide` present in all 3; `platform: Windows` auto-injected in all 3 (confirmed via the keyless-Windows allowlist)
- lifecycle/00's `RESEAL→S3a` rejoin and dual `S3a`/`S3c`→`S4` reconvergence preserved as explicit table rows/columns; lifecycle/00's Block 2 is a `Stage | Failure Mode` table (`grep -c 'Failure Mode'` = 1)
- lifecycle/03's AADUD/UDOOBE/AADSD 3-way merge into ESP4 preserved as an explicit closing sentence naming all three converging edges, plus each edge independently visible in its own table's Destination column
- lifecycle/04's Device Phase / User Phase headed sub-lists present with an explicit D4→U1 transition note ("Device phase complete → User logs in")
- All 1 (00-overview), 4 (03-oobe), and 3 (04-esp) pre-existing over-200-char blockquote groups now split ≤200 chars — verified via a script replicating C17's exact join-then-measure grouping algorithm; word-preservation confirmed for all blockquote splits (mermaid-to-table content transforms are intentionally NOT word-preserving — see Decisions Made)
- Stale-prose grep (`mermaid|click|decision tree|diagram above|diagram below|node shape|legend|classDef`) clean in all 3 files
- All 3 registry rows (RE-192/195/196) confirmed Approved via grep
- No unintended file deletions in any of the 3 task commits (`git diff --diff-filter=D` empty for each)

## Known Stubs

None.

## Threat Flags

None — this plan touches only existing lifecycle Guide files and the registry table; no new network endpoints, auth paths, or trust-boundary surface introduced. All threat-register mitigations were actively verified: T-122-01 (dropping lifecycle/00 block 2, the ESP4 3-way merge, or the Device/User partition) — all three explicitly preserved and independently re-derived against `git show 71be4ab`; T-122-08 (word-loss in the 1054c/1317c blockquote splits) — word-preserving split confirmed via manual sentence/clause-boundary technique, verified with the C17-replicating length script; T-122-05 (stale diagram-prose) — grep clean in all 3 files.

## Next Phase Readiness

- RE-192/195/196 are C17-green, Mermaid-free, and Approved
- RETRO-07 remainder progress: 3 of 9 Mermaid-bearing lifecycle files now converted/enrolled this plan (lifecycle/00, lifecycle/03, lifecycle/04); 6 remain — `docs/lifecycle-apv2/02-deployment-flow.md`, `docs/ios-lifecycle/{01-ade-lifecycle,02-mdm-migration}.md`, `docs/macos-lifecycle/{00-ade-lifecycle,01-psso-provisioning-walkthrough,02-mdm-migration-psso}.md` — handed to subsequent Phase 122 plans (122-10 through 122-15)
- Remaining Phase 122 work: the 11 decision-trees (RETRO-05) also remain
- No blockers identified

## Self-Check: PASSED

- FOUND: `docs/lifecycle/00-overview.md`
- FOUND: `docs/lifecycle/03-oobe.md`
- FOUND: `docs/lifecycle/04-esp.md`
- FOUND: commit `110ff26` (Task 1)
- FOUND: commit `7124b26` (Task 2)
- FOUND: commit `0c1b097` (Task 3)

---
*Phase: 122-structural-retrofit-decision-trees-carved-mermaid-files*
*Completed: 2026-07-08*

## Self-Check Verification Log

- FOUND: `docs/lifecycle/00-overview.md`
- FOUND: `docs/lifecycle/03-oobe.md`
- FOUND: `docs/lifecycle/04-esp.md`
- FOUND: commit `110ff26`
- FOUND: commit `7124b26`
- FOUND: commit `0c1b097`

Result: **PASSED**
