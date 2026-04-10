---
phase: 01-foundation
plan: 01
subsystem: documentation
tags: [glossary, terminology, disambiguation, autopilot, apv1, apv2]
dependency_graph:
  requires: []
  provides: [docs/_glossary.md, docs/apv1-vs-apv2.md]
  affects: [all Phase 2-7 documentation]
tech_stack:
  added: []
  patterns: [yaml-frontmatter, version-gate-banner, concept-group-glossary]
key_files:
  created:
    - docs/_glossary.md
    - docs/apv1-vs-apv2.md
  modified: []
decisions:
  - Pre-provisioning is the primary glossary term; White glove entry redirects with rename note
  - Phase 2 cross-links use placeholder paths with inline comments (paths will resolve in Phase 2)
  - APv2 feature table includes all 20 rows from research data (exceeds 18-row plan minimum)
metrics:
  duration: 2 minutes
  completed: 2026-03-11
---

# Phase 1 Plan 1: Autopilot Glossary and APv1/APv2 Disambiguation Summary

Autopilot terminology glossary (26 one-liner terms, 5 concept groups, alphabetical index) and APv1 vs APv2 disambiguation page (20-row feature comparison, decision guide) as the stable link targets for all subsequent documentation phases.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create glossary with alphabetical index and concept groups | 58e3726 | docs/_glossary.md |
| 2 | Create APv1 vs APv2 disambiguation page | 3e7d6de | docs/apv1-vs-apv2.md |

## Decisions Made

**1. Pre-provisioning as primary term (White glove deprecated)**
Per research pitfall #4 and Microsoft's 2021 renaming: `Pre-provisioning` is the primary glossary entry. The `White glove` entry contains only: "The deprecated name for pre-provisioning; renamed in 2021. See Pre-provisioning." This prevents teams from referencing the obsolete term in new documentation.

**2. Phase 2 cross-link placeholders**
Glossary "See also" links to lifecycle stage docs (e.g., `lifecycle/esp-phases.md`) are included as HTML comments in the file, annotated with "Phase 2 — path will resolve in Phase 2". This keeps the glossary valid Markdown now while making the intended links visible for Phase 2 authors.

**3. APv2 table expanded to 20 rows**
The research data contained 20 feature rows; the plan specified 18 minimum. All 20 rows were included so the table is complete — the extra rows are "Extensive OOBE customization" and "Blocks desktop until user config applied", both significant behavioral distinctions.

## Deviations from Plan

None — plan executed exactly as written.

## Verification Results

- docs/_glossary.md exists: PASS
- docs/apv1-vs-apv2.md exists: PASS
- Both files have all 4 frontmatter fields (last_verified, review_by, applies_to, audience): PASS
- Both files have version gate banner: PASS
- Glossary has alphabetical index (## Alphabetical Index): PASS
- Glossary has 26 terms (24+ required): PASS
- Glossary has 5 concept groups: PASS
- White glove redirects to Pre-provisioning: PASS
- APv1/APv2 entries link to disambiguation page: PASS
- Disambiguation page has feature comparison table: PASS
- Disambiguation page has decision guide: PASS
- Disambiguation page has source attribution: PASS

## Self-Check: PASSED
