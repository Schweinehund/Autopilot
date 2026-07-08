---
phase: 124-pipeline-fix-descriptive-filename-pass-draft-label-grounding
plan: 03
subsystem: pipeline
tags: [copilot-studio, sharepoint, docx, eee-sop, pandoc, grounding-probe]

# Dependency graph
requires:
  - phase: 124-01
    provides: convert.ps1 pre-pandoc nav-footer preprocessing + CUSTOM-PROPS guard (PIPE-03)
  - phase: 124-02
    provides: build-filename-map.mjs + committed filename-map.md (PIPE-04)
provides:
  - Shipped EEE single-line header block (·-separated, Platform-first) reformat of draft-test-doc.md, proven through convert.ps1 + guard-docx.mjs
  - Reusable PIPE-05-RUNBOOK.md (parameterized owner procedure, two fixed queries, binary rubric, stale-index gotcha)
  - Filled PIPE-05-FINDINGS.md recording an owner-confirmed PASS on the shipped format
  - REQUIREMENTS.md:35 D-17 inversion correction; ROADMAP SC4 D-18 outcome-neutral reword
affects: [125-v115-pin-lineage-bump-terminal-close]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Owner-run blocking checkpoint sequenced last (D-13), agent prepares all local legs then halts for the irreducible live-tenant leg"
    - "Stale-index re-run discipline: verify the specific format under test is actually what got indexed before recording a probe outcome"

key-files:
  created:
    - .planning/phases/124-pipeline-fix-descriptive-filename-pass-draft-label-grounding/PIPE-05-RUNBOOK.md
    - .planning/phases/124-pipeline-fix-descriptive-filename-pass-draft-label-grounding/PIPE-05-FINDINGS.md
  modified:
    - scripts/pipeline/test-fixtures/draft-test-doc.md
    - scripts/pipeline/test-fixtures/README.md
    - .planning/REQUIREMENTS.md
    - .planning/ROADMAP.md
    - .planning/STATE.md

key-decisions:
  - "D-14: single reformatted fixture (no A/B twin) — draft-test-doc.md mutated on both the frontmatter status: leg and the visible **Status:** body-text block leg"
  - "D-17: corrected the REQUIREMENTS.md:35 inversion — the v1.15 Phase-113 probe DID exercise the surfacing visible-body-text leg; PIPE-05 is a cosmetic format re-confirmation, not a new-leg discovery"
  - "D-18: ROADMAP SC4 reworded outcome-neutral with a FAIL-escalation clause — PASS or tenant-unavailable-deferred both close SC4 cleanly; a surfacing FAIL would NOT auto-close"
  - "D-19: PIPE-05-FINDINGS.md flagged explicitly as necessary-but-not-sufficient input to Phase 125's HARN-07 (whole-corpus grounding confirmation)"
  - "Two-stage probe: a stale v1.15-indexed copy answered the first run; owner re-uploaded + re-ran against the verified shipped-format build for the recorded PASS"

patterns-established:
  - "Same-filename re-upload can leave a SaaS knowledge connector serving a stale indexed blob — verify tell-tale content (phase/plan reference, header shape) before trusting a probe response, not just filename presence"

requirements-completed: [PIPE-05]

# Metrics
duration: ~35min (across continuation)
completed: 2026-07-08
---

# Phase 124 Plan 03: Draft-Label Grounding Probe (PIPE-05) Summary

**Owner-run live Copilot Studio probe confirms the shipped ·-separated Platform-first EEE header block still surfaces the literal "Draft" label and remains queryable, after a stale-index false start was caught and re-run.**

## Performance

- **Duration:** ~35 min (Tasks 1-2 in the initial executor pass; checkpoint held for owner probe; this continuation closes Task 3 + tracking)
- **Completed:** 2026-07-08T23:48:57Z
- **Tasks:** 3 (2 auto + 1 owner-run checkpoint), plus this closing continuation
- **Files modified:** 5 (2 in this continuation's commits: FINDINGS + RUNBOOK; STATE/ROADMAP/REQUIREMENTS in the tracking commit)

## Accomplishments

- `draft-test-doc.md` reformatted to the shipped EEE block (`**Platform:** macOS · **Doc Type:** Runbook · **Doc ID:** RE-T05 · **Status:** Draft`, before the H1) with full 9-key frontmatter incl. `status: draft`; local convert + guard legs proved exit 0 (commit `a479550`)
- `PIPE-05-RUNBOOK.md` + blank `PIPE-05-FINDINGS.md` authored per D-15, plus the D-17 REQUIREMENTS.md:35 correction and D-18 ROADMAP SC4 reword (commit `faa85fa`)
- Owner ran the live Copilot Studio probe: two fixed queries (render + queryable) both surfaced the literal "Draft" label, sourced from the visible `**Status:**` body-text block — mechanism (OQ4: frontmatter promotes to an invisible custom property) confirms the surfaced label came from the body text, not frontmatter
- Caught and documented a real stale-index gotcha mid-probe: the first run answered from a previously-indexed v1.15-shape copy of the fixture; the owner re-uploaded the verified shipped-format `.pipeline-output/draft-test-doc.docx` build and re-ran, confirming PASS on the actual format under test
- `PIPE-05-FINDINGS.md` filled with OUTCOME = PASS, both SC4 legs checked, the two-stage run note, and evidence snippets (commit `96fa456`)
- `PIPE-05-RUNBOOK.md` extended with a "⚠ Re-index gotcha" section (tell-tales + delete-or-rename prevention) so future re-runs of this probe don't repeat the false start (commit `96fa456`)

## Task Commits

Each task was committed atomically:

1. **Task 1: Reformat draft-test-doc.md to shipped EEE format + local convert/guard proof** - `a479550` (feat)
2. **Task 2: Author PIPE-05-RUNBOOK.md + blank PIPE-05-FINDINGS.md + D-17/D-18 corrections** - `faa85fa` (docs)
3. **Task 3 (owner-run checkpoint):** live Copilot Studio probe — no agent commit (owner executed live, out-of-band); outcome recorded by this continuation
4. **Closing: record PIPE-05 FINDINGS + RUNBOOK gotcha** - `96fa456` (docs)

**Plan metadata:** (this commit, following this SUMMARY) - `docs: complete PIPE-05 plan`

## Files Created/Modified

- `.planning/phases/124-pipeline-fix-descriptive-filename-pass-draft-label-grounding/PIPE-05-FINDINGS.md` - filled with OUTCOME=PASS, both SC4 legs, two-stage evidence
- `.planning/phases/124-pipeline-fix-descriptive-filename-pass-draft-label-grounding/PIPE-05-RUNBOOK.md` - added the stale-index re-run gotcha section
- `scripts/pipeline/test-fixtures/draft-test-doc.md` - shipped EEE block reformat (prior task, this plan)
- `.planning/REQUIREMENTS.md` - PIPE-05 status flipped to reflect execution-complete (line 35 wording already corrected in Task 2; traceability row remains "Pending → owner-confirmed complete" pending Phase 125's Validated flip)
- `.planning/ROADMAP.md` - Phase 124 plan-progress table updated (3/3), SC4 marked satisfied
- `.planning/STATE.md` - Current Position advanced (Phase 124 complete, ready for Phase 125)

## Decisions Made

- Owner-run probe outcome recorded as PASS per D-16/D-18 completion condition 1 (both queries PASS)
- The two-stage run (stale-index false start, then a confirmed re-run against the verified shipped-format build) is recorded honestly in FINDINGS rather than only recording the cleaner second run in isolation — the stale-index behavior itself is a real operational gotcha worth capturing for future re-runs of this probe (added to RUNBOOK)
- Per the Phase-125 firewall: PIPE-05 marked execution-complete/done ONLY. No requirement flipped to "Validated" — that milestone-close flip across PROJECT/ROADMAP/STATE/REQUIREMENTS is exclusively Phase 125's close-gate commit.

## Deviations from Plan

None - plan executed exactly as written. The stale-index discovery during the owner's live probe was anticipated by the plan's design (owner-run, two-stage upload procedure) and handled per the existing RUNBOOK completion-condition framework; documenting the gotcha in the RUNBOOK is in-scope closing-task work (task 2 of the closing tasks), not a deviation from the plan.

## Issues Encountered

- The first live-probe run answered from a stale v1.15-indexed copy of the fixture (same filename, prior build) rather than the freshly-uploaded shipped-format build. Resolved by the owner deleting/re-uploading the verified shipped-format `.pipeline-output/draft-test-doc.docx` and re-running the same two queries, which confirmed PASS on the actual format under test. Documented as a "⚠ Re-index gotcha" in `PIPE-05-RUNBOOK.md` for future re-runs.

## User Setup Required

None - no external service configuration required (the owner's live Copilot Studio / SharePoint tenant access was already in place; this was the probe execution itself, not new setup).

## Next Phase Readiness

- Phase 124 (PIPE-03, PIPE-04, PIPE-05) is now fully execution-complete: all three plans committed, SC1-SC4 satisfied.
- PIPE-05-FINDINGS.md is committed and available as a necessary-but-not-sufficient input to Phase 125's HARN-07 whole-corpus grounding-validation confirmation (D-19) — Phase 125 must reference it, not treat it as discharging HARN-07 on its own.
- No blockers. Phase 125 (V115 Pin + 14th Path-A Lineage Bump + Terminal Close) is ready to begin; per the Phase-125 firewall, this plan did NOT author any close-gate, V115 pin, check-phase-124.mjs, or re-audit work, and did NOT flip PIPE-03/04/05 to "Validated" — those remain Phase 125's exclusive job.

---
*Phase: 124-pipeline-fix-descriptive-filename-pass-draft-label-grounding*
*Completed: 2026-07-08*
