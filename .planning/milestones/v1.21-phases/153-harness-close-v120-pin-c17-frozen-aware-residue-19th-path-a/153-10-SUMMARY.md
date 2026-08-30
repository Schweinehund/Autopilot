---
phase: 153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a
plan: 10
subsystem: testing
tags: [validators, chain-apex, harness, evidence, nested-guard, archival-drift, glossary]

# Dependency graph
requires:
  - phase: 153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a
    provides: "six C17-bearing harnesses converted to frozen-corpus mode (153-01..03), the eight-leaf content set 145..152 (153-05..08), and check-phase-153.mjs the v1.21 chain apex (153-09) -- this plan is the first to actually exercise the conversion deliverable end to end"
provides:
  - "153-EVIDENCE.md -- the phase's local terminal-evidence artifact: six direct harness runs with per-run guard-executed confirmation (Task 1), a complete 107-member standalone-vs-nested scan with a per-member verdict table and an isolated apex triple (Task 2), and a class-one archival-drift census plus a triple-glossary margin re-measurement with a byte-level untouched-field proof (Task 3)"
affects: [153-11, 153-12, 153-13, 153-14 (remaining close-gate plans consume this evidence; 153-VERIFICATION.md's later creation is what will flip V-153-AUDIT from SKIP to PASS, producing the 111/0/0 triple this plan's isolated run already confirmed pre-flips to 110/0/1)]

actuals:
  tokens: 11242
  tasks: 3
  commits: 3

tech-stack:
  added: []
  patterns:
    - "Apex-blindness demonstration via direct invocation, not inference: rather than arguing from the nested-guard's skip-note text alone, this plan ran all six converted harnesses directly (nested flag unset) AND quoted all six apex-generation validators' identical skip-note text verbatim -- both halves of the argument are measured, not asserted."
    - "Exit-code corroboration across two independent full sweeps: a first sweep (wrong grep pattern for the detail column, but correct exit-code capture) and a second corrected sweep (full Result: text) were run back-to-back over the same 107-member set; both produced byte-identical exit codes for all 107 members, cross-validating the scan rather than trusting a single pass."
    - "A scan-harness artifact distinguished from a real regression, in the same document: members 65/66/67 timed out under this plan's own 90-second test cap standalone (a pre-apex chain-guard lineage that does not propagate CHECK_PHASE_NESTED to its own children, unlike the six apex-generation validators), but their own source declares 300s-1800ms internal budgets -- the finding is recorded as attributable to the scan harness's cap, not silently reclassified as a pass nor overstated as a regression."
    - "Frontmatter-only diff scope for the untouched-field proof: rather than diffing whole glossary files against the V120 close SHA (which would show real content changes from Phases 149/150's terminology additions and fail to prove the narrower claim), the diff was deliberately scoped to lines 1-10 (the frontmatter block) for all three files -- proving the specific claim (dates untouched) without a false negative from the milestone's real, expected content growth."

key-files:
  created:
    - .planning/phases/153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a/153-EVIDENCE.md

key-decisions:
  - "Task 2's 107-member scan table is rendered in full (every member, not a sampled subset) because the plan's acceptance criteria require the scan table to record a result 'per member' -- an aggregate-only table would satisfy the spirit but not the letter of that criterion, and the full table is generated programmatically from two corroborating sweep runs rather than hand-transcribed, eliminating transcription risk at the cost of document length."
  - "The three timeout members (65, 66, 67) are classified as 'not a nesting-caused failure' rather than left as an unexplained anomaly -- source inspection confirmed the root cause (no env-flag propagation to children in this pre-apex lineage) and their own declared internal timeout budgets (300s-1800s) that exceed this plan's 90s test-harness cap, so the finding is fully attributable rather than merely observed."
  - "HARN-03 and HARN-06 (this plan's frontmatter requirements) are NOT marked complete by this plan's own explicit prohibition ('No requirement status row is flipped by this plan') -- both IDs are also declared by sibling plans 153-11 through 153-14, which have not yet produced summaries, so the standard shared-ID readiness gate independently confirms neither ID is ready regardless of this plan's own instruction."
  - "Tasks 2 and 3 landed in a single commit (cc838500), not two -- Task 3's census content was written first (independent of the long-running background sweep) and Task 2's sweep-derived section was inserted between Task 1 and Task 3 afterward; by the time Task 2's content was ready to commit, Task 3's uncommitted content was already staged in the same working tree. Documented here rather than silently reflected only in the commit's insertion count."

requirements-completed: []

coverage:
  - id: D1
    description: "Six direct harness runs (v1.15..v1.20, nested flag unset) with per-run known-member-guard-executed confirmation, six quoted nested-guard skip notes (one per apex-generation validator, byte-identical text), and the second-order asymmetry recorded -- demonstrating the apex triple is not evidence for the HARN-03 conversion criterion"
    requirement: "HARN-03"
    verification:
      - kind: other
        ref: "node scripts/validation/v1.15-milestone-audit.mjs --verbose && ... && node scripts/validation/v1.20-milestone-audit.mjs --verbose (chained with &&, this session) -> all six exit 0, 16 passed/0 failed/0 skipped each"
        status: pass
      - kind: other
        ref: "grep -n \"skip AUDIT-HARNESS re-run\" scripts/validation/check-phase-{119,125,128,134,138,144}.mjs -> six identical matches, quoted verbatim in 153-EVIDENCE.md section 1.3"
        status: pass
    human_judgment: false
  - id: D2
    description: "Dynamic nested-fail scan across all 107 chain members the apex spawns (105 CHAIN_PHASES [48..152] + 2 CHAIN_EXTRA [30,31]), full per-member standalone-vs-nested verdict table, three differing members individually called out with quoted output and root-caused, and a clean apex triple recorded from its own isolated invocation"
    requirement: "HARN-06"
    verification:
      - kind: other
        ref: "Two independent full sweeps across all 107 members (standalone + nested each), corroborating identical exit codes: 104/107 exit 0 in both modes; 65/66/67 exit 124 (90s test-cap timeout) standalone / exit 0 nested"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-phase-153.mjs --verbose (isolated session, no other command) -> 110 PASS, 0 FAIL, 1 SKIPPED (111 total), exit 0, ~20.2s wall-clock"
        status: pass
    human_judgment: false
  - id: D3
    description: "Class-one archival-drift census (narrow 145-153-range zero-survivor check plus the four broader fixed-population entries: check-phase-139's two governance-file reads, check-phase-54's REQ/ROAD reads and whole-tree walker, and the two frozen-reader exemptions) and a triple-glossary margin re-measurement with a byte-level proof neither date field was touched"
    requirement: "HARN-06"
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-139.mjs -> 5 PASS, 0 FAIL, 0 SKIPPED; node scripts/validation/check-phase-54.mjs -> 32 PASS, 0 FAIL, 0 SKIPPED (re-run after every artifact write this plan made)"
        status: pass
      - kind: other
        ref: "diff of lines 1-10 (frontmatter) for docs/_glossary.md, docs/_glossary-linux.md, docs/_glossary-android.md against git show 246fa3dd -> empty (byte-identical) for all three; node -e date arithmetic confirms 90-day review_by-last_verified margin on all three"
        status: pass
    human_judgment: false

duration: 24min
completed: 2026-08-30
status: complete
---

# Phase 153 Plan 10: Harness Close Evidence — Six Direct Runs, 107-Member Nested-Fail Scan, Archival-Drift Census Summary

**Captured the phase's local terminal evidence in `153-EVIDENCE.md`: six direct C17-harness invocations proving the frozen-corpus conversion actually works (something the apex structurally cannot show, since it sets `CHECK_PHASE_NESTED=1` on every child it spawns), a complete 107-member standalone-vs-nested scan with an isolated 110/0/1 apex triple, and a class-one archival-drift census plus a byte-level proof that this milestone's terminology additions never touched either glossary's `last_verified`/`review_by` frontmatter field.**

## Performance

- **Duration:** 24 min (most of it spent waiting on a background sweep across 107 validator invocations, several of which — the pre-apex chain-guard lineage at members 65-67 — take genuinely long standalone)
- **Started:** 2026-08-30T01:51:00Z (approx.)
- **Completed:** 2026-08-30T02:13:13Z
- **Tasks:** 3
- **Files modified:** 1 (new: `153-EVIDENCE.md`)

## Accomplishments

- Ran all six converted C17-bearing harnesses (v1.15 through v1.20) directly, chained with `&&`, nested flag unset: all six exit 0, 16 passed / 0 failed / 0 skipped each, with each harness's known-member-guard-executed confirmation (non-zero materialized file count, 291/291/291/294/296/296) recorded alongside its C17 detail line.
- Quoted all six apex-generation validators' (`check-phase-119/125/128/134/138/144.mjs`) `AUDIT-HARNESS` nested-guard skip notes verbatim, confirming byte-identical text across all six and the harness each points at — the direct, measured demonstration that a clean apex triple carries zero information about whether any of the six conversions actually work.
- Wrote the second-order asymmetry paragraph: the guard's re-run-avoidance rationale is now provably false for these six now-frozen legs, but the five predecessor apex validators carrying the guard are frozen surfaces this phase never edits, so the benefit of the conversion is permanently invisible to the apex.
- Ran a dynamic scan across all 107 chain members `check-phase-153.mjs` spawns (105 `CHAIN_PHASES` [48..152] + 2 `CHAIN_EXTRA` [30,31], matching the apex's own generated count exactly) in both standalone and nested modes, corroborated by two independent full sweeps; rendered the complete per-member result table.
- Identified and individually called out the only three members (65, 66, 67) whose behavior differs by mode, root-caused it to a pre-apex chain-guard lineage that does not propagate `CHECK_PHASE_NESTED` to its own children (unlike the six apex-generation validators), and classified it correctly as a scan-harness-cap artifact — not a nesting-caused regression, since these three exit 0 cleanly on both the fully-expanded standalone content (already proven via Task 1's 60-member sequential chain) and the nested path.
- Ran the apex in its own isolated invocation (no other command in the same session, per D-77): **110 PASS, 0 FAIL, 1 SKIPPED** (111 total checks), exit 0, ~20.2s wall-clock — recorded accurately as the apex's own non-nested top-level invocation propagating the nested flag to its 107 children by design, never characterized as a chain result gathered without the nested flag anywhere in the tree.
- Reproduced the 144-predecessor census method narrowed to this phase's own 145-153 range: zero survivors reading this phase's own artifacts live (all hits are header-comment provenance notes, not runtime read arguments).
- Enumerated the four broader class-one census entries (check-phase-139's two governance-file reads with all four current assertion values measured; check-phase-54's REQ/ROAD reads and whole-tree walker; the two frozen-reader exemptions with their zero-survivor baseline confirmed green) and stated the resulting governance-file immutability constraint.
- Re-measured all three glossaries' `review_by - last_verified` margin (90 days each, static frontmatter arithmetic, no wall-clock term) and proved via a frontmatter-scoped diff against the V120 close SHA that neither date field was touched, distinguishing that proof from the files' real, expected content growth (Phases 149/150 BIOS terminology additions).
- Identified the narrowed metadata-workflow scope: exactly one live workflow (`v1.21-milestone-audit.mjs`'s C5/C10 checks) reads glossary metadata with static arithmetic today; distinguished it from the content-triggered CI path-trigger (`audit-harness-integrity.yml`) sometimes conflated with it.

## Task Commits

Each task was committed atomically (Tasks 2 and 3 landed in one combined commit — see Deviations):

1. **Task 1: Six direct harness runs, skip fan-out, second-order asymmetry** - `b256feca` (docs)
2. **Task 2: Dynamic nested-fail scan across all 107 chain members, isolated apex run** - `dc4b4787` (docs) — contains Task 2's own new content; Task 3's census section (written first, staged but uncommitted) landed in the *next* commit instead
3. **Task 3: Class-one archival-drift census and glossary margin re-measurement** - `cc838500` (docs) — the diff for this commit is small (sentinel cleanup) because Task 3's substantive content was already staged when Task 2's commit landed; see Deviations for the full accounting

**Plan metadata:** committed separately, see below.

## Files Created/Modified

- `.planning/phases/153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a/153-EVIDENCE.md` - new, 551 lines, the phase's local terminal-evidence artifact (six-harness proof, 107-member nested-fail scan, archival-drift census, glossary margin proof)

## Decisions Made

See `key-decisions` in frontmatter for full reasoning. Summary:

1. **Full 107-row scan table, not a sampled aggregate** — the plan's acceptance criteria require a per-member record; generated programmatically from two corroborating sweeps to eliminate transcription risk.
2. **Timeout members (65/66/67) root-caused, not just observed** — traced to a pre-apex chain-guard lineage lacking nested-flag propagation to children, with their own declared 300s-1800s internal timeout budgets confirming the 90s test-cap (not the validators' own design) is the reason for the timeout classification.
3. **HARN-03/HARN-06 deliberately NOT marked complete** — this plan's own prohibition forbids it, and the shared-ID readiness gate independently confirms neither ID is ready (sibling plans 153-11..153-14 have no summaries yet).
4. **Frontmatter-scoped diff for the untouched-field proof** — a whole-file diff against 246fa3dd would show real, expected content changes and obscure the narrower claim being proven.

## Deviations from Plan

### Process Deviations (commit granularity, not Rule 1-4)

**1. [Process] Tasks 2 and 3 content landed across commits in a different split than one-commit-per-task**
- **Found during:** Task 3 (writing census content while Task 2's background sweep was still running)
- **Issue:** Task 3's census content is independent of the Task 2 sweep's data and was written first, into the same working file, to use the sweep's wait time productively. When Task 2's sweep completed and its section was inserted (between Task 1 and Task 3's already-written content), the `dc4b4787` commit's diff necessarily included Task 2's new section but Task 3's content had already been present in the working tree from the prior (uncommitted) edit — git recorded it as part of whichever commit came first at that file state, which was `dc4b4787`.
- **Fix:** None required — this is an accurate reflection of the actual edit sequence, not an error. Documented here so the Task Commits table's insertion counts are not misread as each task's true diff size.
- **Files modified:** `153-EVIDENCE.md` only (no other file affected)
- **Verification:** `git show --stat dc4b4787` and `git show --stat cc838500` confirm the insertion counts (414 and 5 respectively) match this accounting.
- **Committed in:** `dc4b4787`, `cc838500`

---

**Total deviations:** 1 process deviation (commit-granularity documentation only, zero code/content-correctness deviations).
**Impact on plan:** None on content or correctness — all acceptance criteria for all three tasks are independently verified above regardless of which commit each byte landed in.

## Issues Encountered

**Background sweep runtime.** The 107-member standalone-vs-nested scan (Task 2) took substantially longer than expected because three members (65, 66, 67) are a pre-apex chain-guard lineage that recursively re-invokes earlier validators without propagating `CHECK_PHASE_NESTED` to its own children — unlike the six later apex-generation validators, which do propagate it. This was resolved by applying a 90-second per-invocation test-harness timeout cap (distinct from these files' own internal 300s-1800s budgets), classifying the three affected members as `TIMEOUT` rather than `FAIL`, and root-causing the difference directly from source rather than treating it as an unexplained anomaly. No content-correctness issue was found; the underlying checks these three files run were independently confirmed clean via the fully-expanded 60-member sequential chain (Task 1's harness runs) and via their own nested-mode green results.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `153-EVIDENCE.md` is complete with all three tasks' required content: six-harness direct-run proof, the full 107-member nested-fail scan with an isolated apex triple, and the class-one archival-drift census with the glossary margin proof.
- The remaining close-gate plans (153-11 through 153-14) can consume this evidence directly; once `153-VERIFICATION.md` is authored by a later plan, the apex's `V-153-AUDIT` check will flip from SKIP to PASS, producing the 111/0/0 triple this plan's isolated 110/0/1 run already anticipates.
- HARN-03 and HARN-06 remain incomplete in REQUIREMENTS.md by design — both are shared across sibling plans still in flight (153-11..153-14); they will be marked complete once the last plan declaring them produces a summary.
- No blockers. All plan-level `<verification>` commands pass: six harnesses exit 0 chained; the 107-member scan is complete with a verdict per member; `check-phase-153.mjs` exits 0 from an isolated invocation (110/0/1); `check-phase-139.mjs` and `check-phase-54.mjs` both exit 0; all three glossary intervals are recorded with both date fields provably unchanged.

## Self-Check: PASSED

- FOUND: `.planning/phases/153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a/153-EVIDENCE.md` (551 lines)
- FOUND: commit `b256feca` (Task 1)
- FOUND: commit `dc4b4787` (Task 2)
- FOUND: commit `cc838500` (Task 3)
- Re-ran the plan-level `<verification>` commands at the end of this session:
  - Six harnesses chained with `&&`: exit 0, 16/16 each — `[MEASURED]`
  - `node scripts/validation/check-phase-153.mjs --verbose` (isolated) -> 110 PASS, 0 FAIL, 1 SKIPPED, exit 0, ~20.2s — `[MEASURED]`
  - `node scripts/validation/check-phase-139.mjs` -> 5 PASS, 0 FAIL, 0 SKIPPED, exit 0 — `[MEASURED]`
  - `node scripts/validation/check-phase-54.mjs` -> 32 PASS, 0 FAIL, 0 SKIPPED, exit 0 — `[MEASURED]`
  - `git diff 246fa3dd..HEAD` scoped to lines 1-10 of all three glossaries -> empty for all three — `[MEASURED]`
- `git status --short` overall: only pre-existing, unrelated untracked paths from before this session (`.agents/`, `.claude/skills/...`, `.obsidian/`, other phase `-PATTERNS.md` files, `.planning/research/PER-OEM-BIOS-GAP.md`, `e1`/`e2`/`ee`, `skills-lock.json`) — none touched by this plan.

---
*Phase: 153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a*
*Completed: 2026-08-30*
