---
phase: 02-lifecycle
plan: "01"
subsystem: docs/lifecycle
tags: [lifecycle, documentation, stage-guides, hardware-hash, profile-assignment, oobe]
dependency_graph:
  requires: []
  provides:
    - docs/lifecycle/01-hardware-hash.md
    - docs/lifecycle/02-profile-assignment.md
    - docs/lifecycle/03-oobe.md
  affects:
    - docs/lifecycle/00-overview.md (future — prev/next links will resolve)
tech_stack:
  added: []
  patterns:
    - 11-section standardized stage guide structure
    - First-mention glossary linking per file
    - L2 Note blockquote callouts for technical details
    - APv2 Note blockquote callouts for framework differences
    - Standard Markdown blockquotes (no GitHub admonition syntax)
    - Forward-link annotations "(available after Phase X)"
    - Mermaid LR diverge/reconverge diagram for multi-path stages
key_files:
  created:
    - docs/lifecycle/01-hardware-hash.md
    - docs/lifecycle/02-profile-assignment.md
    - docs/lifecycle/03-oobe.md
  modified: []
decisions:
  - "All 4 hash import methods (CSV, OEM, PowerShell, Partner Center) documented in a table in Stage 1"
  - "Dynamic vs static group assignment comparison table in Stage 2 with timing column"
  - "Stage 3 covers all 3 deployment modes in one file per CONTEXT.md locked decision"
  - "TPM requirements table included in Stage 3 showing mode, requirement, and reason"
  - "Mermaid flowchart LR used for Stage 3 diverge/reconverge — matches RESEARCH.md Pattern 6"
  - "Autopilot Reset note placed in Stage 3 Context section"
  - "Hybrid join brief note placed in Stage 2 and Stage 3 (not detailed — deferred to Phase 6)"
metrics:
  duration: 4m
  completed_date: 2026-03-14
  tasks_completed: 2
  files_created: 3
---

# Phase 2 Plan 1: Stage 1-3 Lifecycle Guides Summary

Three lifecycle stage guides for hardware hash import, profile assignment, and OOBE/deployment modes — following the standardized 11-section structure and establishing the stage guide pattern for Stages 4 and 5.

## Tasks Completed

| Task | Description | Commit | Files |
|------|-------------|--------|-------|
| 1 | Create Stage 1 (Hardware Hash Import) and Stage 2 (Profile Assignment) guides | cdfbbd2 | docs/lifecycle/01-hardware-hash.md, docs/lifecycle/02-profile-assignment.md |
| 2 | Create Stage 3 (OOBE and Deployment Modes) guide | b0172be | docs/lifecycle/03-oobe.md |

## What Was Built

**`docs/lifecycle/01-hardware-hash.md`** — Stage 1 guide covering hardware hash collection and device registration. Includes: all 4 import methods in a comparison table (CSV upload, OEM direct, PowerShell/Get-WindowsAutopilotInfo, Partner Center), ZTD service behavior in L2 Note callout, clarification that the Autopilot registry key is populated at profile download (not at import time), APv2 Note explaining no hash pre-staging required, and Watch Out For items for stale records, wrong image state, and tenant mismatch.

**`docs/lifecycle/02-profile-assignment.md`** — Stage 2 guide covering Autopilot profile creation, group assignment, and profile delivery at OOBE. Includes: dynamic vs static group comparison table with timing (near-instant vs 5-15min to 24h), L2 Note linking profile lookup to `ztd.dds.microsoft.com` and `cs.dds.microsoft.com`, hybrid join ODJ Connector brief note, APv2 Note explaining Device Preparation policies replace profiles.

**`docs/lifecycle/03-oobe.md`** — Stage 3 guide covering OOBE and all three deployment mode paths. Includes: Mermaid flowchart LR diagram with diverge/reconverge pattern showing user-driven, pre-provisioning, and self-deploying paths converging at ESP; TPM requirements table (3 rows with mode, required yes/no, reason); Autopilot Reset note (re-enters at Stage 3); hybrid join DC reachability note; APv2 Note explaining no pre-provisioning or self-deploying modes in APv2.

## Content Structure Validation

All three files follow the standardized 11-section structure from CONTEXT.md:
1. Context (with Depends on / Feeds into)
2. What the Admin/User Sees
3. What Happens (numbered steps + mode-specific subsections in Stage 3)
4. Behind the Scenes (L2 Note blockquote)
5. Success Indicators
6. Failure Indicators (with forward-link annotations)
7. Typical Timeline
8. Watch Out For
9. Tool References (links to powershell-ref.md, Further Reading URLs)
10. Navigation (prev/next sequential links)
11. Version History table

No glossary terms, registry paths, or PowerShell functions are defined inline — all link to Phase 1 reference files.

## Decisions Made

- All 4 hash import methods documented in Stage 1 table per CONTEXT.md Stage-Specific Depth requirement
- Dynamic vs static group comparison table with timing column in Stage 2 per CONTEXT.md
- Stage 3 covers 3 deployment modes in one file (locked CONTEXT.md decision — not split into separate files)
- TPM requirements table in Stage 3 per RESEARCH.md requirement
- Mermaid `flowchart LR` direction in Stage 3 per CONTEXT.md Diagrams section (LR direction for stage-internal diagrams)
- Autopilot Reset re-entry note placed in Stage 3 Context section per CONTEXT.md Edge Cases
- Hybrid join brief note in Stage 2 (Watch Out For / Behind the Scenes) and Stage 3 (Watch Out For / Behind the Scenes) — full detail deferred to Phase 6 per CONTEXT.md

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check: PASSED

- FOUND: docs/lifecycle/01-hardware-hash.md
- FOUND: docs/lifecycle/02-profile-assignment.md
- FOUND: docs/lifecycle/03-oobe.md
- FOUND: commit cdfbbd2 (Task 1)
- FOUND: commit b0172be (Task 2)
