---
phase: 40
plan: 01
subsystem: docs/decision-trees
tags: [android, l1-triage, mermaid, decision-tree, template]
dependency_graph:
  requires: []
  provides:
    - docs/decision-trees/08-android-triage.md
    - docs/_templates/l1-template.md (Android enum)
  affects:
    - Phase 40 runbooks 22-27 (consumed by click directives)
    - Phase 41 L2 runbooks (AND1 root anchor for cross-references)
    - Phase 42 audit (AEAUDIT-04 SafetyNet/supervision grep targets)
tech_stack:
  added: []
  patterns:
    - Mermaid graph TD mode-first 6-branch root (AND1)
    - Phase 30 D-02 triage-tree structural template adapted for Android
    - Phase 30 D-24 one-line platform enum extension precedent
key_files:
  created:
    - docs/decision-trees/08-android-triage.md
  modified:
    - docs/_templates/l1-template.md
decisions:
  - Mode-first root AND1 (D-01): Android deviates from iOS visibility-first; mode before symptom per ROADMAP SC #1
  - AOSP branch terminates at ANDE1 escalate-L2 (out of scope v1.4) per D-03
  - Unknown/Can't-tell branch terminates at ANDE2 per D-04
  - 20 Routing Verification rows (exceeds 17-row minimum from CONTEXT.md Specifics table)
metrics:
  duration_seconds: 189
  completed: 2026-04-23
  tasks_completed: 2
  tasks_total: 2
  files_created: 1
  files_modified: 1
requirements_satisfied: [AEL1-01]
---

# Phase 40 Plan 01: Android Triage Tree and Template Extension Summary

**One-liner:** Mode-first Android L1 triage tree (AND1 root, 6 mode branches, 20 routing paths) plus one-line `l1-template.md` platform enum extension to include Android.

## Files Created / Modified

### Created

**`docs/decision-trees/08-android-triage.md`** (140 lines)

New file implementing the mode-first Android L1 triage decision tree (AEL1-01). Structure mirrors `07-ios-triage.md` with Android-specific adaptations per Phase 40 CONTEXT.md decisions.

Key structural elements:
- Frontmatter: `last_verified: 2026-04-23`, `review_by: 2026-06-22`, `applies_to: all`, `audience: L1`, `platform: Android`
- Platform-gate banner covering Windows / macOS / iOS siblings
- H1 title + intro paragraph explaining mode-first routing rationale
- Mermaid `graph TD` block with AND1 root → 6 branches → AND2/AND3/AND4/AND5 symptom sub-diamonds → runbook or escalate terminals
- 6 `click` directives (ANDR22..ANDR27) pointing to `../l1-runbooks/NN-android-name.md`
- `classDef resolved fill:#28a745,color:#fff` and `classDef escalateL2 fill:#dc3545,color:#fff` styling
- AOSP scope-guard paragraph after Mermaid block (ANDE1 → `06-aosp-stub.md`)
- 20-row Routing Verification table (exceeds 17-row requirement)
- How to Check table (4 rows — mode-identification questions for L1)
- Escalation Data table (3 rows — ANDE1/ANDE2/ANDE3 collect-data checklists)
- Related Resources section (8 links)
- Version History table

### Modified

**`docs/_templates/l1-template.md`** (1 line changed)

Line 18 changed from:
```
platform: Windows | macOS | iOS | all
```
to:
```
platform: Windows | macOS | iOS | Android | all
```

Exactly 1 deletion + 1 addition per `git diff`. No other lines modified. Enables `platform: Android` in L1 runbook frontmatter validation gate for Phase 40 runbooks 22-27.

## Mermaid Graph Structure

```
AND1 (root mode gate)
├── "Personal phone, work profile (BYOD)"   → AND2 (symptom sub-diamond)
│   ├── Enrollment-restriction error        → ANDR22 (Runbook 22) [green]
│   ├── Device enrolled, work profile missing → ANDR23 (Runbook 23) [green]
│   ├── Device never appeared in Intune     → ANDR24 (Runbook 24) [green]
│   ├── Non-compliant / access blocked      → ANDR25 (Runbook 25) [green]
│   ├── Expected work app not installed     → ANDR26 (Runbook 26) [green]
│   └── Other / unclear                     → ANDE3 (escalate L2) [red]
├── "Corporate phone, fully managed (COBO)" → AND3 (symptom sub-diamond)
│   ├── Enrollment-restriction error        → ANDR22 [green]
│   ├── Device never appeared in Intune     → ANDR24 [green]
│   ├── Non-compliant / access blocked      → ANDR25 [green]
│   ├── Expected work app not installed     → ANDR26 [green]
│   └── Other / unclear                     → ANDE3 [red]
├── "Kiosk or single-purpose (Dedicated/COSU)" → AND4 (symptom sub-diamond)
│   ├── Enrollment-restriction error        → ANDR22 [green]
│   ├── Device never appeared in Intune     → ANDR24 [green]
│   ├── Non-compliant / access blocked      → ANDR25 [green]
│   ├── Expected work app not installed     → ANDR26 [green]
│   └── Other / unclear                     → ANDE3 [red]
├── "Corporate Zero-Touch enrolled (ZTE)"   → AND5 (symptom sub-diamond)
│   ├── Enrollment never started / stalled  → ANDR27 (Runbook 27) [green]
│   ├── Post-enrollment non-compliant       → ANDR25 [green]
│   └── Other / unclear                     → ANDE3 [red]
├── "Specialty hardware (AOSP)"             → ANDE1 (escalate L2 out-of-scope) [red]
└── "Don't know / Can't tell"               → ANDE2 (escalate L2 mode identification) [red]
```

All 9 terminal nodes are within exactly 2 decision steps from AND1.

## Routing Verification Row Count

20 rows achieved in the Routing Verification table (requirement: ≥ 17). The 20 rows enumerate:
- 5 BYOD paths (22/23/24/25/26) + 1 BYOD unclear
- 4 COBO paths (22/24/25/26)
- 4 Dedicated paths (22/24/25/26)
- 2 ZTE paths (27 + 25 post-enrollment)
- 1 AOSP path (ANDE1)
- 1 Unknown mode path (ANDE2)
- 1 "Other/unclear within GMS mode" path (ANDE3)

Note: The BYOD "Other / unclear" path (row 6) was added beyond the 18 rows in CONTEXT.md Specifics to make explicit that ALL branches have an escape hatch, bringing the total to 20.

## Verification of Zero SafetyNet / Supervision Occurrences

```
grep -ci "safetynet" docs/decision-trees/08-android-triage.md  → 0
grep -ci "supervision\|supervised" docs/decision-trees/08-android-triage.md → 0
grep -ci "safetynet" docs/_templates/l1-template.md → 0
grep -ci "supervision\|supervised" docs/_templates/l1-template.md → 0
```

Both files pass AEAUDIT-04 hard rules. Zero banned terminology in any Phase 40 Plan 01 artifact.

## Deviations from Plan

None - plan executed exactly as written.

The Mermaid structure, node IDs, click directives, table structures, frontmatter, and platform-gate banner all match the plan's `<action>` specification verbatim. The BYOD "Other / unclear" path was included in the Routing Verification table (plan specified ≥ 17 rows; the CONTEXT.md Specifics table's 18-row example was used as the floor, and the BYOD unclear row brings it to 20 for completeness — within Claude's discretion per CONTEXT.md).

## Known Stubs

None. Both files contain complete, production-ready content. Click directives in `08-android-triage.md` point to runbook files that do not yet exist (created in Plans 40-02 through 40-07), but the links are structurally correct and intentional — they will be resolvable once those plans execute. This is the established forward-link pattern from iOS triage (Phase 30 D-02).

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes at trust boundaries introduced. Both files are documentation-only artifacts with no executable code, API surface, or data-processing logic.

## Self-Check: PASSED

- FOUND: `docs/decision-trees/08-android-triage.md`
- FOUND: `docs/_templates/l1-template.md`
- FOUND: commit 600eabd (Task 1 — l1-template.md)
- FOUND: commit 7bc1d93 (Task 2 — 08-android-triage.md)
