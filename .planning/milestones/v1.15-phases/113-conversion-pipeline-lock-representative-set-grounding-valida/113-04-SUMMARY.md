---
phase: 113-conversion-pipeline-lock-representative-set-grounding-valida
plan: "04"
subsystem: documentation
tags: [copilot-studio, sharepoint, grounding-validation, pandoc, eee-architecture, pipe-02]

requires:
  - phase: 113-conversion-pipeline-lock-representative-set-grounding-valida
    provides: "Guard-passed representative .docx set from Plans 01-03 (pipeline locked, 5 docs converted, all guard-passing)"

provides:
  - "PIPE-02-RUNBOOK.md — owner-facing step-by-step grounding-validation procedure (prereqs, upload, Q1-Q6 sequence, completion condition)"
  - "PIPE-02-FINDINGS.md — empirical findings from live Copilot Studio validation: OQ1-OQ4 all resolved, both SC4 confirmations checked"
  - "Four Phase-114 gating decisions resolved empirically: citation-title source, Status:Draft gate-vs-label, chunk-boundary behavior, custom-property promotion"

affects:
  - "Phase 114 (EEE Standard + Metadata Rules) — all four OQ findings are direct authoring inputs"
  - "Phase 118 (Table remediation) — OQ3 finding contextualizes necessity"
  - "v1.16 planning — OQ1 filename-citation finding flags a descriptive-rename scope"

tech-stack:
  added: []
  patterns:
    - "Owner-run validation checkpoint: agent authors runbook + template; owner executes live legs the agent cannot access (D-01 / REQUIREMENTS L77)"
    - "Empirical OQ resolution pattern: live Copilot Studio queries map one-to-one to recorded open questions; findings committed before phase closes"

key-files:
  created:
    - .planning/phases/113-conversion-pipeline-lock-representative-set-grounding-valida/PIPE-02-RUNBOOK.md
    - .planning/phases/113-conversion-pipeline-lock-representative-set-grounding-valida/PIPE-02-FINDINGS.md
  modified: []

key-decisions:
  - "OQ1 resolved: citation titles are FILENAME-driven (raw .docx filename including extension, not H1 / SharePoint Title column / Word title property). v1.16 descriptive-filename normalization pass flagged and deferred."
  - "OQ2 resolved: Status:Draft is a LABEL only — Draft docs ARE indexed and retrieved. Phase 114 EEE standard must state: Draft exclusion = library scoping or content-approval (never the body-text label). Content-approval stays a deferred deployment-hardening lever."
  - "OQ3 resolved: No P-02 chunk fragmentation observed on the mode-first android-capability-matrix. Phase 118 table mitigation (<=25-row cap + prose summary, C17-lintable) stands as prudent belt-and-suspenders — not proven mandatory."
  - "OQ4 resolved: Pandoc 3.7.0.2 promotes non-standard YAML frontmatter keys to invisible Word custom properties (confirmed via docProps/custom.xml). The four Phase-114 EEE keys (doc_id/status/owner/doc_type) are not yet in corpus frontmatter, but the mechanism is proven. This VALIDATES the EEE architecture: the visible body-text header block is retrieval-necessary; frontmatter is harness-only and never reaches the Copilot index."
  - "SC4a confirmed: document-level citations resolve as clickable SharePoint links (whole .docx, no section anchors)."
  - "SC4b confirmed: single-line EEE header block is indexed as retrievable body text — Q2 had Copilot recite 'Doc ID: RE-T01 · Platform: Windows · Doc Type: Runbook · Status: Approved' directly. This is the load-bearing EEE thesis, proven."

patterns-established:
  - "EEE body-text header block is the retrieval-necessary metadata carrier — frontmatter lands in invisible custom properties and is never indexed"
  - "Draft exclusion policy: library scoping (or optional content-approval), never reliance on a body-text label"
  - "Citation labels equal raw .docx filenames; descriptive corpus filenames improve user-facing citation quality"

requirements-completed: [PIPE-02]

duration: multi-day (owner checkpoint gated)
completed: "2026-07-03"
---

# Phase 113 Plan 04: PIPE-02 Grounding Validation Summary

**Owner-run Copilot Studio live query session resolves all four EEE-gating open questions (OQ1-OQ4) and confirms both SC4 theses — citation-title source is filename-driven, Status:Draft is a label-not-gate, no chunk fragmentation observed, and pandoc custom-property promotion validates the EEE body-text architecture.**

## Performance

- **Duration:** Multi-day (Task 1-2 agent-run, Task 3 owner-run checkpoint)
- **Started:** 2026-07-03
- **Completed:** 2026-07-03
- **Tasks:** 3 of 3
- **Files modified:** 2

## Accomplishments

- Authored `PIPE-02-RUNBOOK.md` — complete owner-facing procedure with prerequisites, upload steps, exact Q1-Q6 query sequence, and phase-completion condition (Task 1).
- Authored `PIPE-02-FINDINGS.md` as an owner-fillable template (Task 2), which the owner then filled live with empirical Copilot Studio results (Task 3 checkpoint).
- Empirically resolved all four Phase-114 gating open questions: OQ1 (citation title = filename-driven), OQ2 (Draft = label only, not an index gate), OQ3 (no P-02 chunk fragmentation observed on mode-first matrix), OQ4 (pandoc 3.7.0.2 promotes non-standard frontmatter keys to invisible custom properties — EEE architecture validated).
- Confirmed both SC4 theses: document-level citations are clickable SharePoint links; the EEE single-line header block is indexed as body text and recited by Copilot (the load-bearing EEE thesis, proven).
- Retrieval quality was HIGH across all six queries and all five doc classes with no hallucinations.

## Task Commits

1. **Task 1: Author PIPE-02-RUNBOOK.md** — `9ed1f7d` (docs)
2. **Task 2: Author PIPE-02-FINDINGS.md template** — `0abbc03` (docs)
3. **Task 3: Owner checkpoint — record PIPE-02 empirical findings** — `b8b7b6d` (docs)

## Files Created/Modified

- `.planning/phases/113-conversion-pipeline-lock-representative-set-grounding-valida/PIPE-02-RUNBOOK.md` — Owner-facing validation procedure: prerequisites, SharePoint upload steps, Q1-Q6 query sequence, completion condition
- `.planning/phases/113-conversion-pipeline-lock-representative-set-grounding-valida/PIPE-02-FINDINGS.md` — Empirical findings (owner-filled): OQ1-OQ4 all resolved, SC4 confirmations checked, Phase 114 handoff summary table

## Decisions Made

**OQ1 — Citation title source (filename-driven):** Every citation rendered as the raw `.docx` filename (including the `.docx` extension), ruling out SharePoint Title column, Word title property, and H1 as the source. An empty `<dc:title/>` in `docProps/core.xml` cross-confirms: when no Word title property is set, Copilot falls back to the filename. A v1.16 descriptive-filename normalization pass is flagged and deferred.

**OQ2 — Status:Draft = label only:** `draft-test-doc.docx` was retrieved and cited on Q5; the `Status: Draft` body-text value did not prevent indexing or retrieval. Phase 114 EEE standard must state plainly: Draft exclusion is the operator's responsibility via library scoping (or the deferred SharePoint content-approval hardening lever) — never via the body-text label.

**OQ3 — No P-02 fragmentation observed:** The android-capability-matrix returned with mode → capability associations intact on both Q4 (broad) and Q6 (narrow BYOD probe). P-02 chunk-split is not a live problem for the current corpus's mode-first matrices at the tested chunk configuration. Phase 118 table mitigation (≤25-row cap + prose summary within 5 lines) remains prudent belt-and-suspenders.

**OQ4 — Pandoc promotes non-standard YAML keys to invisible custom properties (confirmed):** `applies_to`, `audience`, `last_verified`, `review_by` all appeared in `docProps/custom.xml` of the converted `.docx`. The four Phase-114 target keys (`doc_id/status/owner/doc_type`) are not yet in fixture frontmatter, but the promotion mechanism is proven. When Phase 114 adds them, they will be invisible to Copilot's semantic index — which validates the entire EEE architecture: the visible body-text header block is the retrieval-necessary, load-bearing element; frontmatter is harness-only and never reaches the index.

## Deviations from Plan

None — plan executed exactly as written. The owner-run checkpoint gate functioned as designed: agent authored the runbook and template; owner executed the live legs and recorded findings; the checkpoint unblocked after findings were committed.

## Issues Encountered

None. Retrieval quality was HIGH across all Q1-Q6 queries; all five doc classes (Windows runbook, macOS runbook, Android capability matrix, compound-platform runbook, synthetic Draft) returned grounded results with clickable citations and no hallucinations.

## User Setup Required

Owner-run leg (Task 3): uploaded 5 guard-passed `.docx` fixtures to test SharePoint document library, waited for Copilot Studio connector sync, ran Q1-Q6 query sequence, inspected `docProps/custom.xml` for OQ4. Results recorded in PIPE-02-FINDINGS.md and committed.

## Next Phase Readiness

Phase 114 (EEE Standard, Templates, Doc ID Registry + Metadata Rules) is unblocked. The four empirical findings are the direct authoring inputs:

- **Phase 114 EEE standard must state:** Draft status is a label, not an index gate — exclude Draft/superseded docs by library scoping (or content-approval), never the body-text label.
- **Phase 114 EEE standard must keep** the single-line visible body-text header block as the retrieval-necessary, load-bearing element. Frontmatter (harness source-of-truth) never reaches the Copilot index.
- **Phase 114 frontmatter additions** (`doc_id/status/owner/doc_type`) will promote to invisible custom properties via pandoc — the EEE architecture accommodates this by design.
- **No Phase 114 blockers.** OQ1 (filename citations) is a v1.16 quality improvement, not a standards blocker. OQ3 (no fragmentation) means Phase 118 table mitigation is optional hardening.

Phase 113 close condition met: all four OQs answered, both SC4 confirmations checked, PIPE-02-FINDINGS.md committed. The MD→.docx pipeline is defined, locked, and empirically grounding-validated on the representative set.

---

## Self-Check: PASSED

- [x] PIPE-02-RUNBOOK.md exists and committed (`9ed1f7d`)
- [x] PIPE-02-FINDINGS.md exists, owner-filled, and committed (`b8b7b6d`)
- [x] All four open questions (OQ1-OQ4) answered with empirical evidence
- [x] Both SC4 confirmations checked (clickable citations + body-text header indexing)
- [x] Phase 114 handoff summary table in FINDINGS.md complete
- [x] 3/3 tasks complete across 3 commits

*Phase: 113-conversion-pipeline-lock-representative-set-grounding-valida*
*Completed: 2026-07-03*
