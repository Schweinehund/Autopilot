---
phase: 90-mdm-migration-walkthrough-l2-runbook-30
plan: "02"
subsystem: docs/l2-runbooks
tags: [l2-runbook, macos, mdm-migration, psso, kandji, iru, intune, abm]
dependency_graph:
  requires: []
  provides:
    - docs/l2-runbooks/30-macos-mdm-migration-failure.md
  affects:
    - docs/l2-runbooks/27-macos-sso-investigation.md (Track C routes here)
    - docs/l2-runbooks/10-macos-log-collection.md (cross-linked as prerequisite)
    - docs/macos-lifecycle/02-mdm-migration-psso.md (cross-linked for source-side steps)
tech_stack:
  added: []
  patterns:
    - L2 runbook three-track parallel investigation (mirror of #27)
    - In-preamble routing prose (no router table, D-03)
    - MEDIUM-confidence Note callouts for ABM admin recovery and Iru console labels
    - Link-not-copy Track C → L2 #27 (no inline duplication)
    - Three-column Version History with Author (l2-runbooks convention)
key_files:
  created:
    - docs/l2-runbooks/30-macos-mdm-migration-failure.md
  modified: []
decisions:
  - "D-03 applied: Track C link-not-copies to L2 #27 (27-macos-sso-investigation.md) — no inline registration-investigation steps"
  - "ABM admin recovery in MEDIUM-confidence Note callout; mid-lockout click-path explicitly prohibited from being asserted as verified fact (Important callout)"
  - "PSSO key survival (same-tenant) prohibited from all tracks per D-03 and PSSO-SURVIVAL locked decision"
  - "L2 #10 (10-macos-log-collection.md) cross-linked first in both Context preamble and Related Resources"
metrics:
  duration: "~5m"
  completed: "2026-06-24T23:47:00Z"
  tasks_completed: 2
  files_created: 1
  files_modified: 0
---

# Phase 90 Plan 02: L2 Runbook #30 macOS MDM Migration Failure Investigation Summary

**One-liner:** Three-track L2 investigation runbook for macOS MDM migration failures — deadline lockout (Track A with ABM admin conceptual recovery), profile-not-delivered/enrollment-failed with leftover Kandji/Iru agent diagnostic (Track B), and PSSO re-registration stuck routed link-not-copy to L2 #27 (Track C).

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Scaffold 30 + Context preamble + Track A + Track B | d773ed7 | docs/l2-runbooks/30-macos-mdm-migration-failure.md (created, 170 lines) |
| 2 | Track C + Escalation Packet + Related Resources + Version History | b1bcb02 | docs/l2-runbooks/30-macos-mdm-migration-failure.md (appended, 246 lines total) |

## What Was Built

`docs/l2-runbooks/30-macos-mdm-migration-failure.md` — a true sibling of `27-macos-sso-investigation.md` (246 lines), structured as:

- **Frontmatter:** `audience: L2`, `last_verified: 2026-06-24`, `review_by: 2026-09-24`, `applies_to: ADE`, `platform: macOS`
- **Platform gate callout** before H1 (macOS ADE migration failure scope, links to `00-index.md#macos-ade-runbooks`)
- **H1:** `# macOS MDM Migration Failure Investigation` (no runbook number)
- **Context preamble** with in-preamble routing prose (no router table, D-03): three failure classes described, L2 #10 log-collection prerequisite cross-linked first, `From L1 escalation?` routing bullets for all four entry scenarios
- **Track A: Deadline Lockout** (Steps 1–4): presenting state confirmation, Intune enrollment policy verification, network reachability check, recovery options A (fix enrollment config, self-completion) and B (ABM admin modification/cancellation); ABM admin recovery in MEDIUM-confidence Note callout; Important callout prohibiting assertion of mid-lockout exact click-path as fact
- **Track B: Profile-Not-Delivered / Enrollment-Failed** (Steps 1–4): leftover Kandji/Iru agent diagnostic (`ls /Library/Kandji/`, `profiles status -type enrollment` in bash fence), cross-link to `02-mdm-migration-psso.md` for source-side steps (D-04 link-not-copy), enrollment policy assignment check, ABM/Intune sync lag check, mixed-fleet macOS <26 device check with version gate callout
- **Track C: PSSO Re-Registration Stuck** (Steps 1–3): Important callouts affirming PSSO re-registration is always required and prohibiting same-tenant key-survival claim; prerequisite verification (user affinity, enrollment complete, policy delivered); `app-sso platform -s` usage with interpretation in prose (not a fabricated output block); link-not-copy routing to L2 #27 Track A
- **Microsoft Support Escalation Packet:** `app-sso platform -s` full output, IntuneMacODC package, Intune enrollment status screenshot, ABM migration status screenshot, macOS + Company Portal version, Company Portal log incident ID, Entra sign-in log screenshot
- **Related Resources:** L2 #10 first as prerequisite (em-dash separator per l2-runbooks convention), L2 #27, `02-mdm-migration-psso.md`, `07-platform-sso-setup.md`, `00-index.md#macos-ade-runbooks`
- **Version History:** Three columns `| Date | Change | Author |` with single initial row (Author `| -- |`)

## Deviations from Plan

None — plan executed exactly as written.

All MEDIUM-confidence facts (ABM admin recovery, leftover-agent root cause, Iru console labels) are wrapped in `> **Note:**` callouts per the MEDIUM-confidence callout convention. The `> **Important:**` callout prohibiting mid-lockout click-path assertion is present in Track A. No same-tenant key-survival claim appears anywhere in the file.

## Verification Results

All automated verification checks passed:

- `## Context` present with in-preamble routing (no `| symptom | ... | track |` router table)
- `## Track A: Deadline Lockout` and `## Track B:` and `## Track C:` all present
- `10-macos-log-collection.md` cross-linked in Context preamble and Related Resources (listed first)
- `27-macos-sso-investigation.md` linked from Track C and Related Resources (no inline duplication of #27 steps)
- `02-mdm-migration-psso.md` cross-linked from Track B (no re-documentation of source-side steps)
- `| Date | Change | Author |` three-column Version History present
- 246 total lines (well above 150-line minimum)
- `audience: L2`, `last_verified: 2026-06-24`, `review_by: 2026-09-24` all present

## Known Stubs

None. All three tracks are fully authored with investigation steps and routing. No placeholder or TODO text present.

## Threat Flags

None. This plan authors a single static markdown runbook with no executable code, no user input surface, no auth paths, and no network endpoints introduced. T-90-03 (documentation accuracy) was mitigated as specified: MEDIUM-confidence facts (ABM mid-lockout recovery, leftover-agent root cause) are in Note callouts; same-tenant PSSO key survival is explicitly prohibited; freshness stamps (`review_by: 2026-09-24`) applied.

## Self-Check: PASSED

- `docs/l2-runbooks/30-macos-mdm-migration-failure.md` exists (246 lines)
- Commit d773ed7 exists (Task 1 — scaffold, Track A, Track B)
- Commit b1bcb02 exists (Task 2 — Track C, Escalation Packet, Related Resources, Version History)
- All 18 content integrity checks passed
