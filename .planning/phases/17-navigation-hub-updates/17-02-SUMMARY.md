---
phase: 17-navigation-hub-updates
plan: "02"
subsystem: documentation
tags: [autopilot, apv2, glossary, navigation, cross-references, runbooks]

# Dependency graph
requires:
  - phase: 17-01
    provides: index.md restructure that this plan complements
  - phase: 14-apv2-l2-runbooks
    provides: APv2 L2 runbooks 06-08 that are linked from l2-runbooks/00-index.md
  - phase: 13-apv2-l1-runbooks
    provides: APv2 L1 runbooks 06-09 and APv2 triage tree linked from indexes
  - phase: 11-apv2-lifecycle-foundation
    provides: APv2 lifecycle docs and terminology (ETG, BootstrapperAgent, Device Preparation policy)
provides:
  - Glossary extended with 6 APv2 terms and bidirectional cross-references (ETG<->ESP, ETG<->Hardware hash)
  - L1 runbook index with APv2 section linking to runbooks 06-09
  - L2 runbook index with APv2 section linking to runbooks 06-08 and APE1/APE2/APE3 escalation mapping
  - APv1 lifecycle overview linked to APv2 lifecycle overview
  - Initial triage decision tree linked to APv2 triage tree
affects: [18-any-future-nav-phase, consumers-of-glossary, l1-agents, l2-agents]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Bidirectional See also notes on APv1/APv2 equivalent terms in glossary"
    - "APv2 subsection pattern below existing APv1 content with clear framework label"
    - "Alphabetical index maintained as pipe-separated list at top of glossary"

key-files:
  created: []
  modified:
    - docs/_glossary.md
    - docs/lifecycle/00-overview.md
    - docs/l1-runbooks/00-index.md
    - docs/l2-runbooks/00-index.md
    - docs/decision-trees/00-initial-triage.md

key-decisions:
  - "ETG entry points back to both ESP and Hardware hash as it replaces both APv1 mechanisms"
  - "New APv2 terms placed in existing category sections (Enrollment, Hardware, Deployment Modes) per D-10 — no new categories created"
  - "l2-runbooks/00-index.md required full APv2 section addition (Phase 14 did not deliver this despite D-13 saying verify-only)"

patterns-established:
  - "Glossary bidirectional See also: APv2 note on APv1 term + APv1 equivalent note on APv2 term"
  - "APv2 runbook sections added below existing APv1 tables with '---' separator and version gate blockquote"

requirements-completed: [NAVG-04]

# Metrics
duration: 4min
completed: 2026-04-13
---

# Phase 17 Plan 02: Navigation & Hub Updates — Glossary and Back-Links Summary

**Glossary extended from 26 to 32 terms with 6 new APv2 definitions and bidirectional cross-references, plus APv2 sections restored in four APv1 hub files accidentally reverted by Phase 15.**

## Performance

- **Duration:** 4 min
- **Started:** 2026-04-13T00:04:29Z
- **Completed:** 2026-04-13T00:08:42Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments

- Extended `docs/_glossary.md` with 6 new APv2 terms (ETG, BootstrapperAgent, Device Preparation policy, IME, Intune Provisioning Client, corporate identifiers), updated alphabetical index from 26 to 32 entries, fixed version gate from "classic only" to dual-framework, removed stale Phase 3 footer and 7 Phase 2 HTML comments
- Added bidirectional cross-references: ESP entry now points to ETG, ETG entry points back to ESP and hardware hash, hardware hash entry points to ETG and corporate identifiers
- Restored APv2 sections in four APv1 hub files: L1 runbook index (runbooks 06-09), L2 runbook index (runbooks 06-08 with APE1/APE2/APE3 escalation mapping), initial triage decision tree (APv2 triage link), and lifecycle overview (APv2 lifecycle link)

## Task Commits

1. **Task 1: Extend glossary with APv2 terms and bidirectional cross-references** - `1a6b854` (feat)
2. **Task 2: Restore APv2 sections in L1 index, L2 index, decision tree, and lifecycle overview** - `fdd0f48` (feat)

## Files Created/Modified

- `docs/_glossary.md` — Added 6 APv2 terms, updated alphabetical index (32 terms), fixed version gate, removed stale comments and footer note, added bidirectional See also notes to ESP and hardware hash entries
- `docs/lifecycle/00-overview.md` — Added APv2 lifecycle overview link in Related Documentation, refreshed frontmatter dates
- `docs/l1-runbooks/00-index.md` — Added APv2 Runbooks section (06-09), renamed existing section to APv1 Runbooks, updated frontmatter to applies_to: both, added APv2 triage link to Related Resources
- `docs/l2-runbooks/00-index.md` — Added APv2 runbooks section (06-08) with When-to-Use table and APE1/APE2/APE3 escalation mapping, updated frontmatter to applies_to: both, added APv2 links to Related Resources
- `docs/decision-trees/00-initial-triage.md` — Updated note blockquote to link directly to APv2 triage tree (was generic apv1-vs-apv2.md), added APv2 link in Scenario Trees list, added See Also section, added APv2 entry to bottom Scenario Trees list

## Decisions Made

- ETG glossary entry bidirectionally references both ESP (policy/app delivery replacement) and hardware hash (device pre-staging replacement), because ETG actually replaces both APv1 mechanisms — not just one.
- l2-runbooks/00-index.md needed a full APv2 section addition. The CONTEXT.md D-13 noted "verify only" because Phase 14 was supposed to add it, but the RESEARCH.md correctly identified Phase 14 did not deliver it. Treated as a full update task.
- Kept `applies_to: APv1` on `decision-trees/00-initial-triage.md` frontmatter per plan instruction — the triage tree itself is APv1-specific even though it now links to the APv2 tree.

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Glossary now has complete APv2 terminology coverage with bidirectional cross-references — ready for any phase that references glossary terms
- All APv1 hub files now have APv2 back-links satisfying NAVG-04
- Plan 03 (quick-ref cards) can now proceed with full glossary context available

## Self-Check: PASSED

All files confirmed present on disk. Both task commits verified in git history.

- FOUND: docs/_glossary.md
- FOUND: docs/lifecycle/00-overview.md
- FOUND: docs/l1-runbooks/00-index.md
- FOUND: docs/l2-runbooks/00-index.md
- FOUND: docs/decision-trees/00-initial-triage.md
- FOUND: 17-02-SUMMARY.md
- FOUND commit 1a6b854: feat(17-02): extend glossary with APv2 terms and bidirectional cross-references
- FOUND commit fdd0f48: feat(17-02): restore APv2 sections in L1/L2 index, decision tree, and lifecycle overview

---
*Phase: 17-navigation-hub-updates*
*Completed: 2026-04-13*
