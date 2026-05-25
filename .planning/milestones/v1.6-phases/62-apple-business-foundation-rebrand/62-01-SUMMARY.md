---
phase: 62
plan: 62-01
title: D-05 planning-doc count-correction + per-permission scrape preparation
subsystem: planning-docs
tags: [count-correction, scrape-prep, d05, planning]
dependency_graph:
  requires: []
  provides: [D-05-patch, 62-SCRAPE-PREP]
  affects: [REQUIREMENTS.md-AB-06, ROADMAP.md-SC4, STATE.md-D-A2, 62-04-scrape-input]
tech_stack:
  added: []
  patterns: [planning-file-patch, scrape-artifact]
key_files:
  modified:
    - .planning/REQUIREMENTS.md
    - .planning/ROADMAP.md
    - .planning/STATE.md
  created:
    - .planning/phases/62-apple-business-foundation-rebrand/62-SCRAPE-PREP.md
    - .planning/phases/62-apple-business-foundation-rebrand/62-01-SUMMARY.md
decisions:
  - "Footnote inserted inline immediately after the AB-06 bullet in REQUIREMENTS.md (indented 2 spaces to maintain list visual integrity)"
  - "Footnote inserted immediately after SC#4 item in ROADMAP.md (indented 2 spaces to match SC list style)"
  - "Footnote inserted immediately after D-A2 bullet in STATE.md (indented 2 spaces to maintain D-A* block visual integrity)"
  - "62-SCRAPE-PREP.md uses 7 seed pairs in Edit-without-View table from RESEARCH.md; executor is instructed to extend during scrape"
metrics:
  duration: ~8 minutes
  completed: 2026-05-21
---

# Phase 62 Plan 01: D-05 Count-Correction + Scrape Prep Summary

**One-liner:** Patched "5"→"4 existing platform glossaries" across 3 planning files with D-05 rationale footnote, and authored deterministic 7-subgroup scrape input artifact for Plan 62-04.

## Tasks Executed

| Task | Name | Status | Commit |
|------|------|--------|--------|
| 62-01-01 | Patch REQUIREMENTS.md AB-06 + ROADMAP.md SC#4 + STATE.md D-A2 from "5"→"4" with footnote | Complete | (batch) |
| 62-01-02 | Author `62-SCRAPE-PREP.md` — Apple permission sub-page URL list + 7-column row schema | Complete | (batch) |

## Files Modified

| File | Change | Patch Location |
|------|--------|----------------|
| `.planning/REQUIREMENTS.md` | AB-06: "5 existing platform glossaries" → "4 existing platform glossaries¹" + footnote | Line 17, inline after bullet |
| `.planning/ROADMAP.md` | Phase 62 SC#4: "5 existing platform glossaries" → "4 existing platform glossaries¹" + footnote | Phase 62 Success Criteria item 4 |
| `.planning/STATE.md` | D-A2: "reciprocal banner lines to 5 existing glossaries" → "4 existing glossaries¹" + footnote | D-A2 architectural decision bullet |
| `.planning/phases/62-apple-business-foundation-rebrand/62-SCRAPE-PREP.md` | NEW: 7-subgroup URL list + 7-column schema + 7 seed Edit-without-View pairs + executor notes | Created (88 lines) |

## Verification Commands Run + Results

### Task 62-01-01 Verification

```
grep -v '^#' .planning/REQUIREMENTS.md .planning/ROADMAP.md .planning/STATE.md | grep -c "5 existing platform glossaries"
→ 0  (PASS — no stale "5" references remain)

grep -v '^#' .planning/REQUIREMENTS.md .planning/ROADMAP.md .planning/STATE.md | grep -cE "4 existing (platform )?glossaries"
→ 3  (PASS — REQUIREMENTS.md + ROADMAP.md + STATE.md each contain "4 existing")
```

### Task 62-01-02 Verification

```
test -f .planning/phases/62-apple-business-foundation-rebrand/62-SCRAPE-PREP.md
→ FILE EXISTS  (PASS)

grep -c "7-Column Row Schema" .planning/phases/62-apple-business-foundation-rebrand/62-SCRAPE-PREP.md
→ 1  (PASS)

wc -l .planning/phases/62-apple-business-foundation-rebrand/62-SCRAPE-PREP.md
→ 88 lines (PASS — min_lines: 50 requirement met)
```

### Q5(b) Compliance Verification

```
git diff --name-only
→ .planning/REQUIREMENTS.md
   .planning/ROADMAP.md
   .planning/STATE.md
```

Zero `docs/**` files modified. Q5(b) no-corpus-sweep invariant preserved.

## Deviations from Plan

None — plan executed exactly as written.

The plan specified "add footnote at bottom of the Pillar 1 block OR inline right after the AB-06 bullet." The inline-after-bullet insertion was chosen for all 3 files to keep the rationale immediately proximate to the patched claim, consistent with how similar inline footnotes appear in planning documents. This choice preserves Pillar 1 visual integrity (the footnote is indented 2 spaces as a sub-item of the bullet, not a separate block).

## Requirements Satisfied

- **AB-06 (D-05 patch portion):** Planning files now accurately state "4 existing platform glossaries" with inline footnote referencing `_glossary-macos.md` line-9 header. Count math is correct from Phase 62 forward; `_glossary-apple-business.md` becomes the 5th glossary node counted v1.6-forward.

## 62-SCRAPE-PREP.md Artifact Summary

- **7 in-scope subgroups listed:** Basic Organization, Organization Access, API+OAuth, People, Devices, AppleCare, Apps & Books
- **URL list:** Root page `axm97dd59159` with note that sub-pages are JS-routed
- **7-column row schema documented:** subgroup / permission_name / scope / edit_vs_view / op1_whitelist_relevance / op3_dependency_notes / apple_url_anchor
- **7 seed Edit-without-View dependency pairs:** From RESEARCH.md §1; executor instructed to extend during scrape
- **Execution notes:** 5-step scrape protocol including browser-only warning, Brand-subgroup exclusion handling, "Manage MDM Servers" OP-1 superprivilege flag

## Known Stubs

None — this plan only modifies planning files and creates a planning-phase support artifact. No corpus files with rendering surface were touched.

## Threat Flags

None — zero network endpoints or trust boundaries introduced. Only planning markdown files modified.

## Self-Check: PASSED

- `.planning/REQUIREMENTS.md` modified: CONFIRMED (git diff shows change)
- `.planning/ROADMAP.md` modified: CONFIRMED (git diff shows change)
- `.planning/STATE.md` modified: CONFIRMED (git diff shows change)
- `.planning/phases/62-apple-business-foundation-rebrand/62-SCRAPE-PREP.md` created: CONFIRMED (file exists, 88 lines)
- `.planning/phases/62-apple-business-foundation-rebrand/62-01-SUMMARY.md` created: CONFIRMED (this file)
- Zero `docs/**` files modified: CONFIRMED (git diff --name-only shows only .planning/ paths)
- "5 existing platform glossaries" string count in 3 files: 0 (PASS)
- "4 existing ... glossaries" string count in 3 files: 3 (PASS)
