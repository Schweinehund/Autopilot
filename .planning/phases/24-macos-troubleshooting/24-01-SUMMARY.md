---
phase: 24-macos-troubleshooting
plan: "01"
subsystem: docs/decision-trees, docs/l1-runbooks
tags: [macos, ade, l1-runbooks, decision-tree, troubleshooting]
dependency_graph:
  requires: []
  provides:
    - docs/decision-trees/06-macos-triage.md
    - docs/l1-runbooks/10-macos-device-not-appearing.md
    - docs/l1-runbooks/11-macos-setup-assistant-failed.md
    - docs/l1-runbooks/12-macos-profile-not-applied.md
    - docs/l1-runbooks/13-macos-app-not-installed.md
    - docs/l1-runbooks/14-macos-compliance-access-blocked.md
    - docs/l1-runbooks/15-macos-company-portal-sign-in.md
  affects: []
tech_stack:
  added: []
  patterns:
    - macOS ADE frontmatter (platform: macOS, applies_to: ADE, audience: L1)
    - Portal-only L1 runbook pattern extended to macOS
    - Mermaid triage tree with 3-step routing guarantee
    - Branching runbook pattern with How-to-Use nav table and anchor links
key_files:
  created:
    - docs/decision-trees/06-macos-triage.md
    - docs/l1-runbooks/10-macos-device-not-appearing.md
    - docs/l1-runbooks/11-macos-setup-assistant-failed.md
    - docs/l1-runbooks/12-macos-profile-not-applied.md
    - docs/l1-runbooks/13-macos-app-not-installed.md
    - docs/l1-runbooks/14-macos-compliance-access-blocked.md
    - docs/l1-runbooks/15-macos-company-portal-sign-in.md
  modified: []
decisions:
  - "Mermaid triage tree uses `&gt;` HTML entity for > in node labels (Mermaid parser compatibility)"
  - "Runbook 14 splits into non-compliant vs compliant-but-blocked per Research Pitfall 3 — two distinct L1 investigation paths"
  - "Runbook 15 (Company Portal) is linear (no branching) — failure scenarios share common portal check path"
  - "Runbook 10 links to 10-macos-log-collection.md (future L2 plan 02) in escalation section per plan spec"
metrics:
  duration: 4min
  completed_date: 2026-04-15
  tasks_completed: 2
  files_created: 7
  files_modified: 0
requirements:
  - MTRO-01
  - MTRO-02
---

# Phase 24 Plan 01: macOS ADE Triage Tree and L1 Runbooks Summary

macOS ADE triage decision tree routing to 6 L1 runbooks within 3 steps from "Did Setup Assistant complete?", plus 6 portal-only L1 runbooks covering every failure category in the Phase 23 config-failures table.

## What Was Built

### Task 1: macOS ADE Triage Decision Tree

Created `docs/decision-trees/06-macos-triage.md` — a standalone Mermaid decision tree with "Did Setup Assistant complete?" as the root node. The tree routes to all 6 L1 runbooks and 1 L2 escalation terminal node. Every terminal node is within 2 edges of the root (Step 1: Setup Assistant complete?, Step 2: device visible in Intune? / symptom selection). This meets the MTRO-01 3-step routing requirement.

File includes: macOS frontmatter (`platform: macOS`, `applies_to: ADE`, `audience: L1`), platform gate blockquote, How to Use section, Legend table, Mermaid diagram with `classDef resolved` and `classDef escalateL2` styling, click links to runbooks 10–15, Routing Verification table, How to Check table (portal observation guidance for all 3 decision questions), Escalation Data table, and Version History.

Commit: `dcebe06`

### Task 2: 6 macOS L1 Runbooks

Created all 6 L1 runbooks in `docs/l1-runbooks/10-15-macos-*.md`. All files share the common pattern established in the Windows runbooks but adapted for macOS: macOS frontmatter, platform gate blockquote, Prerequisites, portal-only numbered steps, "Say to the user" callouts, Escalation Criteria with "Before escalating, collect:" checklist, Related Resources linking back to the triage tree, and Version History.

Zero Terminal commands or code blocks across all 6 files (verified: `grep -rl '```bash|```sh|```powershell'` returns 0).

**Branching runbooks (per D-10):**
- Runbook 11 (Setup Assistant): 3 branches — Authentication Failure, Await Configuration Stuck, Network/Connectivity
- Runbook 12 (Profile Not Applied): 2 branches — Profile Not Showing, Profile Showing but Not Working
- Runbook 13 (App Not Installed): 3 branches — DMG/PKG Missing, VPP Missing, App Install Failed
- Runbook 14 (Compliance/Access): 2 branches — Device Non-Compliant, Compliant but Access Blocked

**Linear runbooks:**
- Runbook 10 (Device Not Appearing): linear ABM/token check sequence (8-10 steps)
- Runbook 15 (Company Portal): linear sign-in and registration verification sequence

Commit: `af62800`

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all content is complete and actionable. No `[TBD - Phase 24]` placeholders exist in the created files. The L2 log collection link in Runbook 10 (`10-macos-log-collection.md`) references a file to be created in Plan 02 of this phase — this is an intentional forward-link per the plan design, not a stub in the created files.

## Self-Check: PASSED

All 7 content files exist on disk. Both task commits (dcebe06, af62800) confirmed in git log.
