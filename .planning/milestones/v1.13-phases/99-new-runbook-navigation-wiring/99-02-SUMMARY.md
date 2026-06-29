---
phase: 99-new-runbook-navigation-wiring
plan: "02"
subsystem: docs-navigation
tags: [runbook, navigation, macos, psso, l1]
dependency_graph:
  requires: ["99-01"]
  provides: ["nav-wiring-#37"]
  affects: ["docs/l1-runbooks/00-index.md", "docs/index.md", "docs/quick-ref-l1.md", "docs/common-issues.md", "docs/decision-trees/06-macos-triage.md"]
tech_stack:
  added: []
  patterns: ["navigation-last", "additive-hub-wiring", "byte-stable-preservation"]
key_files:
  modified:
    - docs/l1-runbooks/00-index.md
    - docs/index.md
    - docs/quick-ref-l1.md
    - docs/common-issues.md
    - docs/decision-trees/06-macos-triage.md
decisions:
  - "D-04 (GA4): 5 hubs IN (00-index, docs/index line-110, quick-ref-l1, common-issues, 06-macos-triage); quick-ref-l2 OUT; navigation-last enforced"
  - "MACR9 added to resolved class on same line as MACR1-6; MACR7/MACR8 line preserved"
  - "H3 slug: macOS Local Password: User Locked Out — colon avoids double-hyphen trap"
metrics:
  duration: "~10m"
  completed: "2026-06-29"
  tasks_completed: 2
  tasks_total: 2
  files_modified: 5
---

# Phase 99 Plan 02: Navigation Hub Wiring for Runbook #37 Summary

Wired runbook #37 (`docs/l1-runbooks/37-macos-local-password-reset.md`) into all five macOS navigation hubs per D-04, navigation-last (depends on Plan 99-01 runbook commit). All edits are additive at RESEARCH-confirmed insertion points with per-file freshness re-stamps and byte-stable preservation of stale counts and inbound #36 refs.

## Tasks Completed

| Task | Description | Commit | Files |
|------|-------------|--------|-------|
| 1 | Wire list/table hubs: 00-index.md (#37 table row), docs/index.md (line-110 PSSO row extended), quick-ref-l1.md (escalation trigger + runbook bullet) | 1d1f9c8 | 3 files |
| 2 | Wire structured hubs: common-issues.md (new macOS H3 with L1 #37 + L2 #27), 06-macos-triage.md (MACR9 leaf + click target + Routing Verification row) | 7d48a59 | 2 files |

## What Was Wired

### Task 1 — List/Table Hubs

**docs/l1-runbooks/00-index.md**
- Appended #37 row to macOS ADE Runbooks table immediately after #36 row
- Row: `| 37 | [macOS Local Password Recovery](37-macos-local-password-reset.md) | User cannot log in — local password lost or unknown; ... |`
- Frontmatter re-stamped: `last_verified: 2026-06-29` / `review_by: 2026-09-29`

**docs/index.md**
- Extended line-110 macOS Platform SSO Runbooks row cell to add: `; or local password recovery for locked-out users ([runbook #37](l1-runbooks/37-macos-local-password-reset.md): FileVault recovery key / LAPS admin / Apple ID)`
- Line 108 "(6 runbooks: …)" stale count left byte-unchanged (pre-existing debt, out of scope)
- `[macOS Platform SSO Runbooks]` link text and `#macos-ade-runbooks` anchor preserved
- Frontmatter re-stamped: `last_verified: 2026-06-29` / `review_by: 2026-09-29`

**docs/quick-ref-l1.md**
- Added escalation trigger after existing triggers (line 102): `- User cannot log in — local password lost or unknown --> **Use [macOS Local Password Recovery](l1-runbooks/37-macos-local-password-reset.md) runbook** ...`
- Added runbook-list bullet after #36 bullet: `- [macOS Local Password Recovery](l1-runbooks/37-macos-local-password-reset.md) — local password lost or unknown; locked out of Mac`
- Line 101 (#36 Secure Enclave trigger) preserved byte-stable; former line 117 (#36 runbook bullet) preserved byte-stable (content unchanged, now at line 118)
- Frontmatter re-stamped: `last_verified: 2026-06-29` / `review_by: 2026-09-29`

### Task 2 — Structured Hubs

**docs/common-issues.md**
- Added new H3 `### macOS Local Password: User Locked Out` after "Platform SSO Re-Registration Failure (Post-Migration)" and before `## iOS/iPadOS Failure Scenarios`
- Symptom paragraph includes SSPR-vs-local-password clarification and cross-link to 07 Local password lifecycle
- L1 bullet: `[macOS Local Password Recovery](l1-runbooks/37-macos-local-password-reset.md)`
- L2 bullet: `[macOS Platform SSO Investigation](l2-runbooks/27-macos-sso-investigation.md)` (D-04 — same L2 #36 routes to)
- H3 slug `#macos-local-password-user-locked-out` is clean (colon stripped by GitHub, no double-hyphen)
- Frontmatter re-stamped: `last_verified: 2026-06-29` / `review_by: 2026-09-29`

**docs/decision-trees/06-macos-triage.md**
- New MAC3 arm: `MAC3 -->|"Local password<br/>locked out"| MACR9(["See: macOS Local<br/>Password Recovery Runbook"])`
- Click target: `click MACR9 "../l1-runbooks/37-macos-local-password-reset.md"`
- MACR9 added to resolved class on same line as MACR1-6: `class MACR1,MACR2,MACR3,MACR4,MACR5,MACR6,MACR9 resolved` (MACR7/MACR8 line preserved unchanged)
- New Routing Verification row: `| Local password — locked out | Setup Assistant? Yes | Symptom: local password | Runbook 37 |`
- Edge invariant: MAC1(Yes) → MAC3 → MACR9 = 2 edges ≤ 3 ✓
- Node collision check: MACR9 does not collide with MACR1-8 or MACE1-3 ✓
- Stale "All 6 macOS L1 runbooks" at line 104 preserved byte-stable (pre-existing debt, out of scope)
- Inbound #36 refs at lines 45/57/83 preserved byte-stable
- Frontmatter re-stamped: `last_verified: 2026-06-29` / `review_by: 2026-09-29`

## Verification Results

| Check | Status |
|-------|--------|
| Task 1 grep gate: 00-index, index, quick-ref all reference #37 | PASS |
| Task 2 grep gate: common-issues L1+L2 links, triage click MACR9 + Runbook 37 | PASS |
| quick-ref-l2.md untouched | CONFIRMED |
| docs/index.md line 108 stale count byte-stable | CONFIRMED |
| 06-macos-triage.md line 104 "All 6 macOS L1 runbooks" byte-stable | CONFIRMED |
| quick-ref-l1.md line 101 (#36 trigger) byte-stable | CONFIRMED |
| 06-macos-triage.md MACR8/#36 inbound refs byte-stable | CONFIRMED |
| 37-macos-local-password-reset.md exists (Plan 99-01 precondition) | CONFIRMED |

## Deviations from Plan

None — plan executed exactly as written. All five hubs wired at the RESEARCH-confirmed insertion points with additive-only edits.

## Known Stubs

None — all five hub edits link to `docs/l1-runbooks/37-macos-local-password-reset.md` which was created in Plan 99-01 and contains complete content.

## Threat Flags

No new trust boundary surfaces introduced. All edits are navigation links in existing static documentation files, pointing to an existing runbook file. No new network endpoints, auth paths, or schema changes.

## Self-Check: PASSED

- docs/l1-runbooks/00-index.md: modified ✓
- docs/index.md: modified ✓
- docs/quick-ref-l1.md: modified ✓
- docs/common-issues.md: modified ✓
- docs/decision-trees/06-macos-triage.md: modified ✓
- Commit 1d1f9c8: exists ✓
- Commit 7d48a59: exists ✓
