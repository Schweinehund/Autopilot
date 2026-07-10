---
phase: 122-structural-retrofit-decision-trees-carved-mermaid-files
plan: 08
subsystem: docs-retrofit
tags: [mermaid-conversion, numbered-stage-list, sequence-to-step-list, eee-standard, c17, retro-08, admin-setup, reference, blockquote-remediation]

# Dependency graph
requires:
  - phase: 122-01
    provides: retrofit-mermaid-structural.mjs fork (ADMIN_SETUP_CARVEOUT_PATHS router -> Guide, ca-enrollment-timing.md single-path -> Reference, mermaid-absence guard, doc_id-idempotency guard, keyless-Windows allowlist covering apv1/00 + apv2/00)
provides:
  - docs/admin-setup-apv1/00-overview.md converted to an 8-item numbered stage list (LOCKED — 8), enrolled RE-076 (Guide, Windows, Approved); 3 blockquote groups remediated
  - docs/admin-setup-apv2/00-overview.md converted to a 4-item numbered stage list (LOCKED — 4), enrolled RE-087 (Guide, Windows, Approved); 1 blockquote group remediated
  - docs/admin-setup-linux/00-overview.md converted to a 5-item numbered stage list preserving the B->C/D/E fan-out (LOCKED — 5), enrolled RE-128 (Guide, Linux, Approved); 2 blockquote groups remediated — SC2 half met
  - docs/reference/ca-enrollment-timing.md converted to a 7-message ordered step list (LOCKED — 7), enrolled RE-147 (Reference, Windows, Approved); 4 blockquote groups remediated — SC2 fully met
  - RETRO-08 CLOSED — all 10 carved-mermaid files (9 admin-setup + RE-147) now converted, enrolled, C17-green, Approved
affects: [122-verification, phase-123-nav-hub-retrofit]

# Tech tracking
tech-stack:
  added: []
  patterns: [numbered-stage-list-no-diamond, fan-out-preserved-as-parallel-step-annotation, sequenceDiagram-to-ordered-step-list, LOCKED-N nodes-plus-labeled-edges re-derivation, LOCKED-N messages-only re-derivation for sequence diagrams, word-preserving sentence/clause-boundary blockquote split (Transform A)]

key-files:
  created: []
  modified:
    - docs/admin-setup-apv1/00-overview.md
    - docs/admin-setup-apv2/00-overview.md
    - docs/admin-setup-linux/00-overview.md
    - docs/reference/ca-enrollment-timing.md
    - docs/_registry/RE-index.md

key-decisions:
  - "apv1/00's and apv2/00's diamond-free linear Mermaid graphs each convert to a compact numbered stage list matching the diagram node labels, kept as its own short list immediately preceding the pre-existing detailed per-guide numbered list — same 'short list precedes detailed list, no merge/renumber' pattern established in 122-07 for admin-setup-8021x/00"
  - "admin-setup-linux/00's B->C/D/E fan-out (one parent, three children, not a reconvergence) is preserved by annotating steps 3-5 as '(parallel with N, N)' rather than collapsing them into a single combined step or silently dropping the parallelism"
  - "ca-enrollment-timing.md's sequenceDiagram converts to a labeled 'Message sequence' ordered list (Actor -> Actor: message), with the diagram's self-message (CA->>CA: Evaluate) counted as message 5, and the trailing Note ('Cannot become compliant without enrollment') folded inline as parenthetical closing text on message 7 rather than counted as an 8th message or dropped"
  - "Independently re-derived ca-enrollment-timing.md's LOCKED-N as 7 messages against git show 71be4ab (exact fence: Device->>Entra, Entra->>Device, Device->>Intune, Intune->>CA, CA->>CA, CA-->>Intune, Intune-->>Device = 7 arrows), correcting the plan/RESEARCH's precomputed 8-message estimate — same off-by-one class as 122-02/122-06/122-07's prior corrections"
  - "All 4 plan-stated node/edge counts for apv1/00 (8), apv2/00 (4), and admin-setup-linux/00 (5) were independently re-derived against git show 71be4ab bytes and confirmed correct — no corrections needed for these 3 files, unlike ca-enrollment-timing.md"

patterns-established:
  - "Fan-out (one parent, multiple children, no reconvergence) is preserved via an inline parallel-step annotation on each child step, distinct from the reconvergence-preservation pattern (which requires a labeled-edge table row) used elsewhere in this phase — fan-out with zero diamonds still qualifies for the numbered-stage-list shape per the D-02 bright-line, since 'any diamond -> table' does not apply when there is no diamond"
  - "ca-enrollment-timing.md is the corpus's final Reference-doc_type sequenceDiagram conversion this phase — the fork's single-path router rule (this file -> Reference, not the class-default Guide) was verified via --dry-run before writing, confirming T-122-07 mitigation held"

key-links:
  - from: "docs/reference/ca-enrollment-timing.md"
    to: "docs/_registry/RE-index.md"
    via: "doc_id RE-147 (Reference) injected by fork"
    pattern: "doc_id:\\s*RE-147"

requirements-completed: [RETRO-08]

# Metrics
duration: 40min
completed: 2026-07-08
---

# Phase 122 Plan 08: Convert + Enroll apv1/00 + apv2/00 + admin-setup-linux/00 + ca-enrollment-timing (RE-076/087/128/147) Summary

**Converted the 4 remaining LIGHT-tier carved-mermaid files — two linear stage-list conversions (apv1/00, apv2/00), one fan-out-preserving stage list (admin-setup-linux/00, RE-128), and one sequenceDiagram-to-step-list conversion routed to doc_type Reference (ca-enrollment-timing.md, RE-147) — closing RETRO-08 with all 10 carved-mermaid files now converted, enrolled, and Approved.**

## Performance

- **Duration:** ~40 min
- **Completed:** 2026-07-08
- **Tasks:** 3 completed
- **Files modified:** 5 (4 docs + registry)

## Accomplishments

- `docs/admin-setup-apv1/00-overview.md`: converted the diamond-free 8-node linear graph to an 8-item numbered stage list (D-02 bright-line: no diamond -> list), kept as a compact list preceding the pre-existing detailed 10-item guide list; removed the mermaid fence; split 2 pre-existing over-200-char blockquote groups into 5 word-preserving paragraphs; enrolled RE-076 (Guide, Windows — platform auto-injected per the 122-01 keyless-Windows allowlist)
- `docs/admin-setup-apv2/00-overview.md`: converted the diamond-free 4-node linear graph to a 4-item numbered stage list; removed the mermaid fence; split 1 pre-existing over-200-char blockquote group into 2 word-preserving paragraphs; enrolled RE-087 (Guide, Windows)
- `docs/admin-setup-linux/00-overview.md`: converted the fan-out flowchart (B -> C/D/E, one parent to three children, not a reconvergence) to a 5-item numbered stage list annotating the three parallel children explicitly; removed the mermaid fence; split 2 pre-existing over-200-char blockquote groups into 7 word-preserving paragraphs (one 3-way clause split at a colon boundary to bring a 224-char single sentence under 200); enrolled RE-128 (Guide, Linux) — SC2 half met
- `docs/reference/ca-enrollment-timing.md`: converted the 4-actor sequenceDiagram to a 7-step "Message sequence" ordered list (Actor -> Actor: message), preserving direction and labels, with the self-message (CA->>CA) as step 5 and the trailing Note folded inline as parenthetical text on step 7; removed the mermaid fence; split 4 pre-existing over-200-char blockquote groups into 10 word-preserving paragraphs; enrolled RE-147 (Reference, Windows — confirmed via `--dry-run` that the fork's single-path router emits Reference, not the class-default Guide)
- Independently re-derived all 4 files' node/edge/message counts against `git show 71be4ab` bytes using direct fence extraction, before writing any conversion — 3 of 4 matched the plan exactly (apv1/00=8, apv2/00=4, linux/00=5); ca-enrollment-timing.md's message count was corrected from the plan's stated 8 to the actual 7
- Full corpus C17 re-verified after each write: up to 216 files checked, 0 violations (assertions #1-13 all 0); final `--all` run and `--self-test` both confirmed 0 violations / 4-passed-0-failed
- Flipped RE-076/087/128/147 registry rows Pending -> Approved
- **RETRO-08 CLOSED**: grep-confirmed all 10 carved-mermaid files (9 admin-setup carve-outs + RE-147) are mermaid-free — the class is complete

## Task Commits

Each task was committed atomically:

1. **Task 1: Convert + enroll apv1/00 + apv2/00 overviews (RE-076/087, LOCKED — 8/4)** - `ec1a658` (feat)
2. **Task 2: Convert + enroll admin-setup-linux/00-overview.md (RE-128, LOCKED — 5, fan-out preserved)** - `8494651` (feat)
3. **Task 3: Convert + enroll ca-enrollment-timing.md (RE-147, LOCKED — 7, sequenceDiagram -> step list, Reference)** - `26d1029` (feat)

**Plan metadata:** (this commit, docs: complete plan)

## Files Created/Modified

- `docs/admin-setup-apv1/00-overview.md` — Linear 8-node Mermaid graph converted to a numbered stage list, LOCKED-8 annotation, 2 blockquote groups split into 5, enrolled RE-076 (Guide, Windows, Approved)
- `docs/admin-setup-apv2/00-overview.md` — Linear 4-node Mermaid graph converted to a numbered stage list, LOCKED-4 annotation, 1 blockquote group split into 2, enrolled RE-087 (Guide, Windows, Approved)
- `docs/admin-setup-linux/00-overview.md` — Fan-out flowchart converted to a numbered stage list with parallel-step annotations, LOCKED-5 annotation, 2 blockquote groups split into 7, enrolled RE-128 (Guide, Linux, Approved)
- `docs/reference/ca-enrollment-timing.md` — sequenceDiagram converted to a 7-message ordered step list, LOCKED-7 annotation (corrected from plan's stated 8), 4 blockquote groups split into 10, enrolled RE-147 (Reference, Windows, Approved)
- `docs/_registry/RE-index.md` — RE-076/087/128/147 flipped Pending -> Approved

## Decisions Made

- apv1/00's and apv2/00's compact stage lists are kept as their own short numbered lists immediately above the pre-existing detailed per-guide lists, not merged into them, avoiding renumbering or duplicating the fuller lists' link/detail content — identical pattern to 122-07's admin-setup-8021x/00 precedent
- admin-setup-linux/00's B->C/D/E fan-out is represented as three "(parallel with N, N)" annotations on steps 3-5 rather than collapsing the three parallel children into one combined step or picking an arbitrary sequential order — this is a distinct preservation pattern from reconvergence (which needs a labeled-edge table row) since fan-out with zero diamonds still satisfies the D-02 "no diamond -> list" bright-line
- ca-enrollment-timing.md's self-message (CA->>CA: Evaluate: Is device compliant?) is counted as its own numbered step (5) rather than folded into an adjacent step, since D-02's message-counting convention counts message arrows regardless of whether source and target actor are the same; the trailing Note (a non-message annotation) is folded as parenthetical closing text on the final step (7) rather than treated as a discrete 8th step, consistent with the Note-handling precedent set in 122-07

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Corrected ca-enrollment-timing.md's LOCKED-N from the plan's stated 8 messages to the independently re-derived 7**
- **Found during:** Task 3 (pre-conversion re-derivation against `git show 71be4ab`)
- **Issue:** The plan's must_haves/acceptance_criteria and 122-RESEARCH.md's Class 2 table both stated "8 messages" for this file's sequenceDiagram. A direct grep-based count of the pre-conversion fence (`git show 71be4ab:docs/reference/ca-enrollment-timing.md`, lines 25-39) found exactly 7 message arrows (`->>`/`-->>`: Join request, Joined, MDM enrollment request, Check Conditional Access policies, Evaluate self-message, BLOCKED, Enrollment failed) plus 1 `Note over Device` annotation (not a message) and 4 `participant` declarations (not messages). No combination of these categories sums to 8.
- **Fix:** Annotated the file as `LOCKED — 7 (messages)`, listed all 7 messages as ordered numbered steps preserving actor->actor direction and message label, and folded the Note's content as inline parenthetical text on the final step (the point in the sequence it describes) rather than treating it as an 8th step or dropping it.
- **Files modified:** `docs/reference/ca-enrollment-timing.md`
- **Verification:** Re-ran the direct fence line-count against the `git show 71be4ab` baseline before writing (matches the current working-tree file byte-for-byte pre-conversion, confirmed via `diff -w`); grep-confirmed exactly 7 `->>`/`-->>` occurrences in the original fence.
- **Committed in:** `26d1029` (Task 3 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 — LOCKED-N precomputed-count correction, same class as 122-02/122-06/122-07's prior corrections)
**Impact on plan:** Required for D-01 correctness (the LOCKED-N annotation must reflect the actual, independently re-derived element count). No scope creep — same file, same conversion shape (ordered step list), only the annotated number and step count changed to match ground truth.

## Issues Encountered

None beyond the LOCKED-N correction documented above.

## User Setup Required

None - no external service configuration required.

## Verification Results

- C17 exits 0 on all 4 files individually and on the full corpus (`--all`, 216 files): assertions #1-13 all 0; `--self-test` 4 passed / 0 failed
- `grep -c '^```mermaid'` = 0 for all 4 files
- `LOCKED — 8` present in apv1/00; `LOCKED — 4` present in apv2/00; `LOCKED — 5` present in admin-setup-linux/00; `LOCKED — 7` present in ca-enrollment-timing.md (corrected from the plan's stated 8, see Deviations)
- `doc_id: RE-076` / `RE-087` / `RE-128` / `RE-147` each present exactly once; `doc_type: Guide` present in apv1/00, apv2/00, admin-setup-linux/00; `doc_type: Reference` present exactly once in ca-enrollment-timing.md
- admin-setup-linux/00's B->C/D/E fan-out preserved as three parallel-step annotations; all 7 ca-enrollment-timing.md sequence messages present as ordered steps with actor->actor direction preserved
- All 2 apv1/00, 1 apv2/00, 2 admin-setup-linux/00, and 4 ca-enrollment-timing.md pre-existing over-200-char blockquote groups now split <=200 chars (verified via a script replicating C17's exact join-then-measure grouping algorithm) — 24 resulting paragraphs total, all <=200 chars, zero real-word loss confirmed via word-multiset diff against `git show HEAD` per file (splits performed at existing sentence/clause boundaries only, no text altered; one 224-char single sentence in admin-setup-linux/00 required a colon-boundary clause split since no sentence boundary existed within 200 chars)
- Stale-prose grep (`mermaid|click|decision tree|diagram above|diagram below|node shape|legend|classDef`) clean in all 4 files
- All 4 registry rows (RE-076/087/128/147) confirmed Approved via grep
- No unintended file deletions in any of the 3 task commits (`git diff --diff-filter=D` empty for each)
- **RETRO-08 closure confirmed:** `grep -rl '^```mermaid'` across all 10 carved-mermaid files (RE-076/077/087/092/106/116/128/134/135/147) returns no matches

## Known Stubs

None.

## Threat Flags

None — this plan touches only existing admin-setup/reference carve-out files and the registry table; no new network endpoints, auth paths, or trust-boundary surface introduced. All threat-register mitigations were actively verified: T-122-01 (dropped fan-out child or sequence message) — admin-setup-linux/00's 3 fan-out children and all 7 ca-enrollment-timing.md messages confirmed present; T-122-07 (ca-enrollment-timing.md mis-typed as Guide) — `--dry-run` output confirmed `doc_type=Reference` before writing, and post-write grep confirms `doc_type: Reference` exactly once, not Guide; T-122-05 (stale diagram-prose) — grep clean in all 4 files.

## Next Phase Readiness

- RE-076/087/128/147 are C17-green, Mermaid-free, and Approved
- **RETRO-08 is CLOSED**: all 10 carved-mermaid files (9 admin-setup + RE-147) are now converted, enrolled, and Approved — no remaining work in this requirement
- Remaining Phase 122 work: the 11 decision-trees (RETRO-05) and the 9 Mermaid-bearing lifecycle files (RETRO-07 remainder) — handed to subsequent Phase 122 plans (122-09 through 122-15)
- No blockers identified

## Self-Check: PASSED

- FOUND: `docs/admin-setup-apv1/00-overview.md`
- FOUND: `docs/admin-setup-apv2/00-overview.md`
- FOUND: `docs/admin-setup-linux/00-overview.md`
- FOUND: `docs/reference/ca-enrollment-timing.md`
- FOUND: commit `ec1a658` (Task 1)
- FOUND: commit `8494651` (Task 2)
- FOUND: commit `26d1029` (Task 3)

---
*Phase: 122-structural-retrofit-decision-trees-carved-mermaid-files*
*Completed: 2026-07-08*
