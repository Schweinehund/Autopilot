---
phase: 52
plan: "01"
subsystem: docs/l2-runbooks
tags: [linux, l2-runbook, log-collection, journalctl, decision-matrix, freshness-caveat]
dependency_graph:
  requires:
    - phase-51-linux-l1-runbooks (L1 cause anchors — DPO-01 locked surfaces)
    - phase-49-linux-foundation (_glossary-linux.md anchor surface — DPO-04)
  provides:
    - docs/l2-runbooks/24-linux-log-collection.md (log-collection prerequisite for Runbook 25; SC#1 verbatim coverage)
  affects:
    - docs/l2-runbooks/25-linux-agent-investigation.md (Runbook 25 Context H2 prerequisite cross-reference)
    - docs/l2-runbooks/00-index.md (anchor surface for Phase 52 index append in 52-04)
tech_stack:
  added: []
  patterns:
    - Decision-Matrix-with-method-sections (mirrors 18-android-log-collection.md per CONTEXT D-03)
    - 3-layer LOW-MEDIUM freshness-caveat (Layer 1 matrix-cell + Layer 2 blockquote + Layer 3 per-line tokens; CONTEXT D-01 + CDI-Phase52-06)
    - L2-direct framing (no > **Say to the user:** per CONTEXT D-08 + V-52-16)
    - Read-vs-write apt distinction (DPO-Phase52-01 — no sudo on read-only commands)
key_files:
  created:
    - docs/l2-runbooks/24-linux-log-collection.md
  modified: []
decisions:
  - "3-layer LOW-MEDIUM caveat applied to /var/log/microsoft/intune/ paths: Layer 1 in Decision Matrix Confidence column (line 35), Layer 2 as > **Source confidence:** blockquote (line 100), Layer 3 as 4x per-line [LOW-MEDIUM, last_verified 2026-04-27] inline tokens (lines 35, 124, 129, 131)"
  - "Prose references to 'snap installation' rephrased to avoid snap install substring triggering V-52-09 negative regex (Rule 1 auto-fix during authoring)"
  - "NO COMMIT — atomic commit owned by 52-05 per CONTEXT D-13"
metrics:
  duration_minutes: ~15
  completed: 2026-04-27
  tasks_completed: 2
  tasks_total: 2
  files_created: 1
  files_modified: 0
---

# Phase 52 Plan 01: Linux Log Collection Runbook (24) Summary

**One-liner:** Runbook 24 authored as Decision-Matrix-with-method-sections guide — 3 method sections (journalctl HIGH / file-based paths mixed / package-state HIGH), 3-layer LOW-MEDIUM caveat on `/var/log/microsoft/intune/`, all SC#1 literals verbatim; file is uncommitted pending 52-05 atomic commit.

## What Was Built

`docs/l2-runbooks/24-linux-log-collection.md` — 209 lines. Linux L2 log collection guide satisfying LIN-12 part 1 and ROADMAP SC#1. Mirrors `18-android-log-collection.md` Decision-Matrix-with-method-sections shape per CONTEXT D-03.

## Section Structure (11 logical sections)

| H2 Section | Line | Content |
|-----------|------|---------|
| Frontmatter | 1–7 | `platform: Linux`, `audience: L2`, `applies_to: all`, `last_verified: 2026-04-27`, `review_by: 2026-06-26` |
| Platform gate blockquote | 9 | `> **Platform gate:**` — routes to Windows/macOS/iOS/Android index anchors |
| `# Linux Log Collection Guide` (H1) | 11 | — |
| `## Context` | 13 | Cross-references Runbook 25 + 4 Phase 51 L1 escalation runbooks; "From L1 escalation?" routing block |
| `## Tool Landscape` | 26 | `> **Tool landscape:**` blockquote; single-primary-surface framing; Linux vs Android/macOS/Windows contrast |
| `## Decision Matrix` | 30 | 3-row table with `Confidence (Layer 1)` column; Layer 1 `[LOW-MEDIUM, last_verified 2026-04-27]` token on `/var/log/microsoft/intune/` row |
| `## Method Selection` | 38 | Linear data-scope narrative (no enrollment-mode axis); 3 ordered steps |
| `## Section 1: journalctl` | 46 | 4 subsections (1.1 agent events, 1.2 intune-portal GUI, 1.3 Identity Broker dual-scope, 1.4 useful flags); SC#1 literals `journalctl -u intune-agent` + `journalctl \| grep intune-portal` |
| `## Section 2: File-based paths` | 96 | Layer 2 `> **Source confidence:**` blockquote (line 100); 3 subsections (2.1 dpkg.log HIGH, 2.2 intune-update.log MEDIUM, 2.3 microsoft/intune/ LOW-MEDIUM with Layer 3 tokens) |
| `## Section 3: Package-state queries` | 137 | 3 subsections (3.1 deb confirmation, 3.2 snap negative-space detection, 3.3 Identity Broker version state) |
| `## Common Artifacts Cross-Reference` | 179 | 8-row table mapping artifacts to Runbook 25 Traps + Phase 51 L1 cause anchors |
| `## Related Resources` | 194 | 8 cross-links (glossary, Runbook 25, L1 runbooks 30/31/33, decision tree, capability matrix) |
| `## Version History` | 205 | 1 row: 2026-04-27 initial version |

## Layer 1/2/3 Caveat Surface Placement

| Layer | Location | Line(s) | Literal token |
|-------|----------|---------|--------------|
| Layer 1 (Decision Matrix cell) | `## Decision Matrix` table row for `/var/log/microsoft/intune/` | 35 | `[LOW-MEDIUM, last_verified 2026-04-27]` |
| Layer 2 (`> **Source confidence:**` blockquote) | `## Section 2: File-based paths` opening (within 10 lines of `## Section 2:` heading at line 96) | 100 | `> **Source confidence:** /var/log/microsoft/intune/ paths are LOW-MEDIUM confidence` |
| Layer 3 — token 1 | `## Decision Matrix` table cell | 35 | `[LOW-MEDIUM, last_verified 2026-04-27]` (inline within table prose) |
| Layer 3 — token 2 | `### 2.3` heading | 124 | `[LOW-MEDIUM, last_verified 2026-04-27]` |
| Layer 3 — token 3 | Code block comment (presence check) | 129 | `[LOW-MEDIUM, last_verified 2026-04-27]` |
| Layer 3 — token 4 | Code block comment (file list) | 131 | `[LOW-MEDIUM, last_verified 2026-04-27]` |

Total `[LOW-MEDIUM, last_verified` occurrences: **4** (≥2 required by V-52-08).

## V-52-NN Coverage Achieved

| Check | Result | Evidence |
|-------|--------|----------|
| V-52-01 File existence (RB24) | PASS | `docs/l2-runbooks/24-linux-log-collection.md` exists |
| V-52-05 Frontmatter (C10) | PASS | All 5 fields present: `platform: Linux`, `audience: L2`, `applies_to: all`, `last_verified: 2026-04-27`, `review_by: 2026-06-26` |
| V-52-06 Layer 1 matrix-cell `[LOW-MEDIUM` | PASS | Line 35: Decision Matrix row for `/var/log/microsoft/intune/` contains `[LOW-MEDIUM, last_verified 2026-04-27]` |
| V-52-07 Layer 2 `> **Source confidence:**` blockquote | PASS | Line 100: blockquote + `LOW-MEDIUM confidence` + `/var/log/microsoft/intune/` all within 10-line window (lines 96–105) |
| V-52-08 Layer 3 ≥2 per-line tokens | PASS | 4 occurrences of `[LOW-MEDIUM, last_verified` at command-snippet level (lines 35, 124, 129, 131) |
| V-52-09 PITFALL-3 negative (no `snap install` / `/var/snap/intune-portal/` / `snap container`) | PASS | None present; prose rephrased from "snap installation" to "snap package on the device" / "snap is erroneously present" |
| V-52-10 SC#1 positive coverage | PASS | `journalctl -u intune-agent` (4×), `journalctl \| grep intune-portal` (1×), `/var/log/intune-update.log` (9×), `/var/log/dpkg.log` (9×) |
| V-52-16 L2 audience-contract negative (`> **Say to the user:**` absent) | PASS | 0 occurrences |
| V-52-17 Read-vs-write apt distinction | PASS | No `sudo apt list`, `sudo dpkg -l`, `sudo systemctl --user`, `sudo journalctl --user` |
| V-52-18 Glossary anchor consumption (≥1 link) | PASS | 4 links: `#journalctl`, `#systemd`, `#microsoft-identity-broker`, `#dpkg`, `#apt`, `#intune-portal` (6 distinct anchors across 4 link statements) |
| V-52-20 Mode-axis token regression-guard | PASS | No BYOD, COBO, COPE, Dedicated, ZTE, AOSP, COSU |
| V-52-22 TBD/TODO scan | PASS | No TBD, TODO, FIXME, XXX, PLACEHOLDER |

## Glossary Anchor Links Used

| Anchor | Line | Context |
|--------|------|---------|
| `../_glossary-linux.md#journalctl` | 50 | Section 1 opening — links journalctl tool description |
| `../_glossary-linux.md#systemd` | 50 | Section 1 opening — links systemd service-management framework |
| `../_glossary-linux.md#microsoft-identity-broker` | 79 | Section 1.3 — links dual-scope Identity Broker disambiguation |
| `../_glossary-linux.md#dpkg` | 102 | Section 2 opening — links dpkg package toolchain |
| `../_glossary-linux.md#apt` | 102 | Section 2 opening — links apt package toolchain |
| `../_glossary-linux.md#intune-portal` | 141 | Section 3 opening — links intune-portal deb package context |

Total: 6 distinct glossary anchors consumed (V-52-18 satisfied with ≥1 required).

## Phase 51 L1 Cause Anchors Cross-Linked (Common Artifacts + Section prose)

| L1 Anchor | Used in | Purpose |
|-----------|---------|---------|
| `../l1-runbooks/30-linux-enrollment-failed.md#cause-a-package-install` | Section 2.1 + Common Artifacts | dpkg.log reading for failed package configure stages |
| `../l1-runbooks/31-linux-compliance-non-compliant.md#cause-d-custom-compliance-failure` | Section 2.2 + Common Artifacts | intune-update.log reading for custom-compliance exit codes |
| `../l1-runbooks/30-linux-enrollment-failed.md#cause-c-enrollment-timeout` | Common Artifacts | journalctl service-state return-route |
| `../l1-runbooks/30-linux-enrollment-failed.md#cause-b-sign-in-failure` | Common Artifacts | Identity Broker journal return-route |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Rephrased prose to avoid `snap install` substring in V-52-09 negative regex**

- **Found during:** Task 2 post-write verification
- **Issue:** Prose contained "snap installations" (line 44) and "snap installation" (lines 139, 156) — each contains the forbidden substring `snap install` that V-52-09 negative regex would catch. The validator grep uses literal substring matching, not word-boundary matching.
- **Fix:** Replaced "erroneous snap installations" with "erroneous snap package on the device"; replaced "detect any erroneous snap installation" with "detect any erroneous snap package on the device"; replaced "DETECT an erroneous snap installation" with "DETECT whether snap is erroneously present".
- **Files modified:** `docs/l2-runbooks/24-linux-log-collection.md`
- **Commit:** none — NO COMMIT per atomic-commit override (52-05 owns)

## Note: NO COMMIT

Per CONTEXT D-13 + DPO-Phase52-06 + `<atomic_commit_override>` directive: this plan produces uncommitted file content only. Plan 52-05 runs the pre-commit gate and owns the single atomic commit covering all 4 Phase 52 deliverables.

`git status` at plan completion: `?? docs/l2-runbooks/24-linux-log-collection.md` (untracked, no staged changes).

## Self-Check

- [x] `docs/l2-runbooks/24-linux-log-collection.md` exists on disk: CONFIRMED (209 lines)
- [x] All 5 frontmatter fields present at correct values: CONFIRMED
- [x] `journalctl -u intune-agent` present: CONFIRMED (4 occurrences)
- [x] `journalctl | grep intune-portal` present: CONFIRMED (1 occurrence)
- [x] `/var/log/intune-update.log` present: CONFIRMED (9 occurrences)
- [x] `/var/log/dpkg.log` present: CONFIRMED (9 occurrences)
- [x] `[LOW-MEDIUM, last_verified 2026-04-27]` in Decision Matrix `/var/log/microsoft/intune/` row: CONFIRMED (line 35)
- [x] `> **Source confidence:**` blockquote: CONFIRMED (line 100)
- [x] Layer 3 ≥2 per-line `[LOW-MEDIUM, last_verified` tokens: CONFIRMED (4 tokens)
- [x] V-52-09 PASS (no forbidden snap strings): CONFIRMED
- [x] V-52-16 PASS (no `> **Say to the user:**`): CONFIRMED
- [x] V-52-17 PASS (no forbidden sudo patterns): CONFIRMED
- [x] V-52-20 PASS (no mode-axis tokens): CONFIRMED
- [x] V-52-22 PASS (no TBD/TODO/FIXME): CONFIRMED
- [x] ≥1 glossary anchor link: CONFIRMED (6 distinct anchors)
- [x] `25-linux-agent-investigation.md` cross-reference present: CONFIRMED (10 occurrences)
- [x] NO COMMITS made: CONFIRMED (git log shows last commit is 8b2dcd5 from planning phase)

## Self-Check: PASSED
