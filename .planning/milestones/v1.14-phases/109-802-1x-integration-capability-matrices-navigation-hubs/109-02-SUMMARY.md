---
phase: 109-802-1x-integration-capability-matrices-navigation-hubs
plan: "02"
subsystem: docs-navigation
tags: [802.1x, navigation, hub-wiring, prose-hubs, SC2]
dependency_graph:
  requires:
    - 109-01 (capability matrix rows — link targets live before nav entries)
    - 101-108 (all 802.1X content files committed — navigation-last invariant SC4)
  provides:
    - SC2 prose-hub portion: index.md, common-issues.md, quick-ref-l1.md, quick-ref-l2.md wired
  affects:
    - docs/index.md
    - docs/common-issues.md
    - docs/quick-ref-l1.md
    - docs/quick-ref-l2.md
tech_stack:
  added: []
  patterns:
    - fold-in over new sections (D-03)
    - link-not-copy (no content restated)
    - append-only edits to existing groupings
key_files:
  created: []
  modified:
    - docs/index.md
    - docs/common-issues.md
    - docs/quick-ref-l1.md
    - docs/quick-ref-l2.md
decisions:
  - "D-03 fold-in applied: all 802.1X entries folded into existing platform/artifact-type groupings; no dedicated 802.1X H2 created in any of the 4 prose hubs"
  - "Linux omission in common-issues.md preserved: no Linux H2 exists to fold into (RESEARCH A6); Linux 802.1X reachable through cross-platform L1/L2 runbooks via index.md and quick-ref-l1/l2"
  - "Android common-issues.md H3 explicitly scoped to Wi-Fi only (PITFALL-4): Android has no native Intune wired-network profile type"
  - "Windows Admin Setup not given a 802.1X admin guide row in index.md per-platform Admin Setup table (plan scope: macOS/iOS/Android/Linux only for admin guide fold-in)"
metrics:
  duration: "~10 minutes"
  completed: "2026-07-01"
  tasks_completed: 3
  files_modified: 4
---

# Phase 109 Plan 02: Prose Navigation Hub Wiring Summary

**One-liner:** 802.1X foundation guides, L1 #38-41, L2 #31-33, and decision tree #10 folded into all 4 prose hubs (index.md, common-issues.md, quick-ref-l1.md, quick-ref-l2.md) per D-03 artifact-type / platform routing.

## Tasks Completed

| Task | Description | Commit | Files |
|------|-------------|--------|-------|
| 1 | Fold 802.1X entries into docs/index.md existing groupings | 5a9be0b | docs/index.md |
| 2 | Add 802.1X failure H3 to common-issues.md platform sections | 20cc875 | docs/common-issues.md |
| 3 | Fold 802.1X entries into quick-ref-l1.md and quick-ref-l2.md | c88e4d9 | docs/quick-ref-l1.md, docs/quick-ref-l2.md |

## What Was Built

### Task 1: docs/index.md (18 insertions)

**Cross-Platform References** — 4 new rows:
- `[802.1X Admin Setup Overview](admin-setup-8021x/00-overview.md)` — cross-platform entry point
- `[EAP Method Overview](admin-setup-8021x/01-eap-method-overview.md)` — EAP method selection guide
- `[Certificate Delivery Foundation](admin-setup-8021x/02-cert-delivery-foundation.md)` — ordering rule + cert matrix
- `[Network Authentication Glossary](_glossary-network.md)` — 802.1X terminology

**Per-platform Admin Setup (macOS/iOS/Android/Linux)** — 4 new rows, one per platform, linking the respective `admin-setup-8021x/04-07-*.md` guide.

**Per-platform Service Desk L1 (Windows APv1 / macOS / iOS / Android / Linux)** — 5 new rows, each linking `decision-trees/10-8021x-triage.md` with a cross-platform description.

**Per-platform Desktop Engineering L2 (Windows APv1 / macOS / iOS / Android / Linux)** — 5 new rows, each leading with `[802.1X L2 Investigation](l2-runbooks/31-8021x-log-collection.md)` as the cross-platform prerequisite and linking #32 and #33.

### Task 2: docs/common-issues.md (28 insertions)

4 `### 802.1X Network Authentication Failure` H3 sections added — one at the end of each existing platform H2 (Windows Autopilot Issues, macOS ADE Failure Scenarios, iOS/iPadOS Failure Scenarios, Android Enterprise Failure Scenarios). Each H3 links L1 #38-41 + triage tree and L2 #31-33. The Android H3 explicitly scopes to Wi-Fi only (no native Intune wired profile for Android — PITFALL-4). No Linux H2 minted.

### Task 3: docs/quick-ref-l1.md + docs/quick-ref-l2.md (8 insertions)

**quick-ref-l1.md**:
- `## Decision Trees`: appended 802.1X Triage tree entry
- `## Runbooks`: appended L1 #38-41 with "cross-platform" note

**quick-ref-l2.md**:
- `## Investigation Runbooks`: appended L2 #31 (marked as prerequisite), #32, #33

## Acceptance Criteria Verification

| Criterion | Status |
|-----------|--------|
| index.md `## Cross-Platform References` links 00-overview, 01-eap-method-overview, 02-cert-delivery-foundation, _glossary-network | PASS |
| Per-platform Admin Setup (macOS/iOS/Android/Linux) each link their 802.1X admin guide | PASS |
| `decision-trees/10-8021x-triage.md` in each of 5 per-platform L1 groupings (grep -c = 5) | PASS (count=5) |
| `l2-runbooks/31/32/33` each appear 5 times in index.md (one per platform L2 table) | PASS (count=5 each) |
| 4 `### 802.1X Network Authentication Failure` H3s in common-issues.md | PASS (count=4) |
| Android H3 does not assert wired 802.1X support (PITFALL-4) | PASS |
| No `## Linux` H2 in common-issues.md | PASS |
| quick-ref-l1.md Decision Trees links triage tree; L1 #38-41 in Runbooks | PASS |
| quick-ref-l2.md Investigation Runbooks links #31 (prerequisite), #32, #33 | PASS |
| No dedicated 802.1X H2 in any of the 4 prose hubs (D-03) | PASS |
| All link targets exist on disk (SC4 navigation-last satisfied) | PASS |

## Deviations from Plan

None — plan executed exactly as written.

## Threat Flags

None — documentation-only navigation edits. No executable code, no user input, no data flow, no auth logic. Security review N/A per RESEARCH.md § Security Domain.

## Known Stubs

None — all entries link to committed content files (navigation-last invariant SC4 satisfied).

## Self-Check: PASSED

Files exist:
- `docs/index.md` — FOUND (18 lines added, verified by grep)
- `docs/common-issues.md` — FOUND (4 H3 sections added, verified by grep)
- `docs/quick-ref-l1.md` — FOUND (5 "8021x" occurrences, verified by grep)
- `docs/quick-ref-l2.md` — FOUND (3 L2 runbook links, verified by grep)

Commits exist:
- 5a9be0b — feat(109-02): fold 802.1X entries into docs/index.md existing groupings
- 20cc875 — feat(109-02): add 802.1X failure H3 to each platform section in common-issues.md
- c88e4d9 — feat(109-02): fold 802.1X entries into quick-ref-l1.md and quick-ref-l2.md
