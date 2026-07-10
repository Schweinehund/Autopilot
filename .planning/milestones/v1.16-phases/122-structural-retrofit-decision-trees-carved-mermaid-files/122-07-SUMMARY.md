---
phase: 122-structural-retrofit-decision-trees-carved-mermaid-files
plan: 07
subsystem: docs-retrofit
tags: [mermaid-conversion, decision-tables, numbered-stage-list, sequence-to-step-list, eee-standard, c17, retro-08, admin-setup, blockquote-remediation]

# Dependency graph
requires:
  - phase: 122-01
    provides: retrofit-mermaid-structural.mjs fork (ADMIN_SETUP_CARVEOUT_PATHS router -> Guide, mermaid-absence guard, doc_id-idempotency guard, keyless-Windows allowlist covering apv1/01)
provides:
  - docs/admin-setup-apv1/01-hardware-hash-upload.md converted to a Step 1/Step 2/Destination decision table (LOCKED — 10), enrolled RE-077 (Guide, Windows, Approved); 8 blockquote groups remediated
  - docs/admin-setup-8021x/00-overview.md converted to a 3-item numbered stage list (LOCKED — 3), enrolled RE-134 (Guide, All Platforms, Approved); 2 blockquote groups remediated
  - docs/admin-setup-8021x/01-eap-method-overview.md converted to an 8-step ordered sequence list (LOCKED — 8), enrolled RE-135 (Guide, All Platforms, Approved); 2 blockquote groups remediated
affects: [122-verification, phase-123-nav-hub-retrofit]

# Tech tracking
tech-stack:
  added: []
  patterns: [decision-table-for-chained-diamonds, numbered-stage-list-no-diamond, sequenceDiagram-to-ordered-step-list, LOCKED-N nodes-plus-labeled-edges re-derivation, LOCKED-N messages-only re-derivation for sequence diagrams, word-preserving sentence/clause-boundary blockquote split (Transform A)]

key-files:
  created: []
  modified:
    - docs/admin-setup-apv1/01-hardware-hash-upload.md
    - docs/admin-setup-8021x/00-overview.md
    - docs/admin-setup-8021x/01-eap-method-overview.md
    - docs/_registry/RE-index.md

key-decisions:
  - "apv1/01's chained OEM->BATCH decision (2 diamonds, not parallel like a CHOOSE-diamond) is represented as a single ordinal-column decision table (Path | Step 1 | Step 2 | Destination) with one row per terminal outcome (OEM Path, CSV Bulk Import, PowerShell Script), matching the 10-8021x-triage.md exemplar shape rather than two separate tables"
  - "8021x/00's diamond-free 3-node linear graph converts to a compact 3-item numbered stage list per the D-02 bright-line, kept deliberately separate from (and preceding) the pre-existing 7-item numbered guide-sequence list rather than merged into it, to avoid renumbering or duplicating the fuller list's content"
  - "8021x/01's sequenceDiagram converts to an 8-step ordered list (Actor -> Actor: message), with the diagram's one non-message Note (\"[EAP method exchange -- TLS/PEAP/TTLS]\") folded as an inline annotation on step 6 rather than counted as a 9th step or dropped, since it describes content occurring at that point in the exchange rather than a discrete message"
  - "Independently re-derived 01-eap-method-overview.md's LOCKED-N as 8 messages against git show 71be4ab (exact fence: 8 '->>'/'-->>' arrows + 1 Note), correcting the plan/RESEARCH's precomputed 10-message estimate -- same off-by-one class as 122-02/122-06 corrections"

patterns-established:
  - "Sequence-diagram LOCKED-N convention counts messages only (not participant declarations or Note annotations) -- Note content is preserved as inline prose on the adjacent step rather than inflating the message count or being dropped"
  - "A short numbered stage-list summary (mapping 1:1 to Mermaid nodes) can coexist with a separate, more detailed pre-existing numbered list covering a superset of the same content, as two independently-numbered lists separated by a blank line, without renumbering or merging"

key-links:
  - from: "docs/admin-setup-apv1/01-hardware-hash-upload.md"
    to: "docs/_registry/RE-index.md"
    via: "doc_id RE-077 (Guide) injected by fork"
    pattern: "doc_id:\\s*RE-077"

requirements-completed: []

# Metrics
duration: 45min
completed: 2026-07-08
---

# Phase 122 Plan 07: Convert + Enroll apv1/01-hardware-hash-upload + admin-setup-8021x Pair (RE-077/134/135) Summary

**Converted the 3 admin-setup carve-outs with the heaviest blockquote burden and the corpus's only sequenceDiagram carve-out — apv1/01's OEM/BATCH flowchart to a chained decision table, 8021x/00's linear graph to a numbered stage list, and 8021x/01's sequenceDiagram to an 8-step ordered list — correcting an independently-verified LOCKED-N message-count error along the way.**

## Performance

- **Duration:** ~45 min
- **Completed:** 2026-07-08
- **Tasks:** 3 completed
- **Files modified:** 4 (3 admin-setup docs + registry)

## Accomplishments

- `docs/admin-setup-apv1/01-hardware-hash-upload.md`: converted the chained `OEM{...}` -> `BATCH{...}` flowchart to a Step 1 / Step 2 / Destination decision table preserving both decision points and all 3 terminal outcomes (OEM Path, CSV Bulk Import, PowerShell Script); reworded "decision tree" to "decision table" (stale-prose avoidance); removed the mermaid fence; split all 8 pre-existing over-200-char blockquote groups into 15 word-preserving paragraphs using sentence/clause-boundary Transform A; enrolled RE-077 (Guide, Windows — platform auto-injected per the 122-01 keyless-Windows allowlist)
- `docs/admin-setup-8021x/00-overview.md`: converted the diamond-free 3-node linear graph to a 3-item numbered stage list (D-02 bright-line: no diamond -> list); removed the mermaid fence; split 2 pre-existing over-200-char blockquote groups into 4 word-preserving paragraphs; enrolled RE-134 (Guide, All Platforms)
- `docs/admin-setup-8021x/01-eap-method-overview.md`: converted the 3-actor sequenceDiagram to an 8-step ordered list (Actor -> Actor: message), preserving actor->actor direction and message labels, with the diagram's one Note annotation folded inline on step 6; removed the mermaid fence; split 2 pre-existing over-200-char blockquote groups into 6 word-preserving paragraphs; enrolled RE-135 (Guide, All Platforms)
- Independently re-derived all 3 files' node/edge/message counts against `git show 71be4ab` bytes using a grep-based extraction script (not manual estimation), before writing any conversion
- Full corpus C17 re-verified after each write: up to 212 files checked, 0 violations (assertions #1-13 all 0)
- Flipped RE-077/134/135 registry rows Pending -> Approved

## Task Commits

Each task was committed atomically:

1. **Task 1: Convert + enroll apv1/01-hardware-hash-upload.md (RE-077, LOCKED — 10, 8 blockquote groups)** - `79d70ec` (feat)
2. **Task 2: Convert + enroll admin-setup-8021x/00-overview.md (RE-134, LOCKED — 3)** - `0a5c8a2` (feat)
3. **Task 3: Convert + enroll admin-setup-8021x/01-eap-method-overview.md (RE-135, LOCKED — 8, sequenceDiagram -> step list)** - `955da68` (feat)

**Plan metadata:** (this commit, docs: complete plan)

## Files Created/Modified

- `docs/admin-setup-apv1/01-hardware-hash-upload.md` — Chained OEM/BATCH Mermaid flowchart converted to a 3-row decision table, LOCKED-10 annotation, 8 blockquote groups split into 15, enrolled RE-077 (Guide, Windows, Approved)
- `docs/admin-setup-8021x/00-overview.md` — Diamond-free linear graph converted to a 3-item numbered stage list, LOCKED-3 annotation, 2 blockquote groups split into 4, enrolled RE-134 (Guide, All Platforms, Approved)
- `docs/admin-setup-8021x/01-eap-method-overview.md` — sequenceDiagram converted to an 8-step ordered list, LOCKED-8 annotation, 2 blockquote groups split into 6, enrolled RE-135 (Guide, All Platforms, Approved)
- `docs/_registry/RE-index.md` — RE-077/134/135 flipped Pending -> Approved

## Decisions Made

- apv1/01's two chained (not parallel) decision points are represented as ONE ordinal-column table with a Step 1/Step 2 pair of columns, rather than two separate single-diamond tables, since BATCH is only reached via the OEM="No" branch — this preserves the chain structure exactly as the flowchart encodes it
- 8021x/00's compact 3-item stage list is kept as its own short numbered list immediately above the pre-existing detailed 7-item guide list, not merged into it, avoiding renumbering the existing list or duplicating its per-guide detail
- 8021x/01's sequenceDiagram Note (a non-message annotation describing where the EAP method exchange occurs) is folded as inline prose on step 6 rather than counted as a discrete numbered step, since D-02's "messages" convention for sequence diagrams counts message arrows, not annotations — this keeps LOCKED-N faithful to the literal message count while still preserving the Note's informational content

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Corrected admin-setup-8021x/01-eap-method-overview.md's LOCKED-N from the plan's stated 10 messages to the independently re-derived 8**
- **Found during:** Task 3 (pre-conversion re-derivation against `git show 71be4ab`)
- **Issue:** The plan's must_haves/acceptance_criteria and 122-RESEARCH.md's Class 2 table both stated "10 messages" for this file's sequenceDiagram. A direct line-by-line count of the pre-conversion fence (`git show 71be4ab:docs/admin-setup-8021x/01-eap-method-overview.md`, lines 25-38) found exactly 8 message arrows (`->>`/`-->>`: EAPOL-Start, EAP-Request/Identity, EAP-Response/Identity, RADIUS Access-Request, RADIUS Access-Challenge, EAP-Request method negotiation, RADIUS Access-Accept, EAP-Success) plus 1 `Note over S,R` annotation (not a message) and 3 `participant` declarations (not messages). No combination of these categories sums to 10.
- **Fix:** Annotated the file as `LOCKED — 8 (messages)`, listed all 8 messages as ordered numbered steps preserving actor->actor direction and message label, and folded the Note's content as an inline annotation on step 6 (the point in the sequence it describes) rather than treating it as a 9th step or dropping it.
- **Files modified:** `docs/admin-setup-8021x/01-eap-method-overview.md`
- **Verification:** Re-ran the direct fence line-count against the `git show 71be4ab` baseline before writing (matches the current working-tree file byte-for-byte pre-conversion, confirmed via diff); grep-confirmed exactly 8 `->>`/`-->>` occurrences in the original fence.
- **Committed in:** `955da68` (Task 3 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 — LOCKED-N precomputed-count correction, same class as 122-02/122-06's prior corrections)
**Impact on plan:** Required for D-01 correctness (the LOCKED-N annotation must reflect the actual, independently re-derived element count). No scope creep — same file, same conversion shape (ordered step list), only the annotated number and step count changed to match ground truth.

## Issues Encountered

None beyond the LOCKED-N correction documented above.

## User Setup Required

None - no external service configuration required.

## Verification Results

- C17 exits 0 on all 3 files individually and on the full corpus (`--all` equivalent via direct validator run, up to 212 files): assertions #1-13 all 0
- `grep -c '^```mermaid'` = 0 for all 3 files
- `LOCKED — 10` present in apv1/01; `LOCKED — 3` present in 8021x/00; `LOCKED — 8` present in 8021x/01 (corrected from the plan's stated 10, see Deviations)
- `doc_id: RE-077` / `RE-134` / `RE-135` each present exactly once; `doc_type: Guide` present exactly once in each file
- Both apv1/01 decision points (OEM, BATCH) represented as decision-table columns/rows; all 3 terminal outcomes present
- All 8 8021x/01 sequence messages present as ordered steps, actor->actor direction preserved
- All 8 apv1/01, 2 8021x/00, and 2 8021x/01 pre-existing over-200-char blockquote groups now split ≤200 chars (verified via a script replicating C17's exact join-then-measure grouping algorithm) — 25 resulting paragraphs total, all ≤200 chars, zero real-word loss (splits performed at existing sentence/clause boundaries only, no text altered)
- Stale-prose grep (`mermaid|click|decision tree|diagram above|diagram below|node shape|legend|classDef`) clean in all 3 files
- All 3 registry rows (RE-077/134/135) confirmed Approved via grep
- No unintended file deletions in any of the 3 task commits (`git diff --diff-filter=D` empty for each)

## Known Stubs

None.

## Threat Flags

None — this plan touches only existing admin-setup carve-out files and the registry table; no new network endpoints, auth paths, or trust-boundary surface introduced. Both threat-register mitigations were actively verified: T-122-01 (dropped decision/message) — both apv1/01 decision points and all 8 8021x/01 messages confirmed present; T-122-08 (word-loss during apv1/01's 8 blockquote splits) — all splits performed at pre-existing sentence/clause boundaries with no text alteration, confirmed by direct comparison of split-group text against the original joined blockquote text; T-122-05 (stale diagram-prose) — grep clean in all 3 files.

## Next Phase Readiness

- RE-077/134/135 are C17-green, Mermaid-free, and Approved — 6 of the 9 admin-setup carve-outs now done (android/ios/macos from 122-06 + apv1/01, 8021x/00, 8021x/01 from this plan)
- Remaining RETRO-08 work: apv1/00-overview.md, apv2/00-overview.md, admin-setup-linux/00-overview.md, docs/reference/ca-enrollment-timing.md (RE-147, sequenceDiagram -> step list) — handed to subsequent Phase 122 plans
- No blockers identified

## Self-Check: PASSED

- FOUND: `docs/admin-setup-apv1/01-hardware-hash-upload.md`
- FOUND: `docs/admin-setup-8021x/00-overview.md`
- FOUND: `docs/admin-setup-8021x/01-eap-method-overview.md`
- FOUND: commit `79d70ec` (Task 1)
- FOUND: commit `0a5c8a2` (Task 2)
- FOUND: commit `955da68` (Task 3)

---
*Phase: 122-structural-retrofit-decision-trees-carved-mermaid-files*
*Completed: 2026-07-08*

## Self-Check: PASSED (re-verified)

- FOUND: `docs/admin-setup-apv1/01-hardware-hash-upload.md`
- FOUND: `docs/admin-setup-8021x/00-overview.md`
- FOUND: `docs/admin-setup-8021x/01-eap-method-overview.md`
- FOUND: `.planning/phases/122-structural-retrofit-decision-trees-carved-mermaid-files/122-07-SUMMARY.md`
- FOUND: commit `79d70ec`
- FOUND: commit `0a5c8a2`
- FOUND: commit `955da68`
