# Phase 24: macOS Troubleshooting - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-14
**Phase:** 24-macos-troubleshooting
**Areas discussed:** Folder placement, L1 failure scenarios, L2 diagnostic approach, Triage tree design
**Method:** Adversarial review (Finder/Adversary/Referee pattern, 12 agents total, 3 per area)

---

## Folder Placement

| Option | Description | Selected |
|--------|-------------|----------|
| Option A: troubleshooting-macos/ | All macOS troubleshooting in one new folder | |
| Option B: Extend existing folders | macOS files numbered inside existing decision-trees/, l1-runbooks/, l2-runbooks/ | :white_check_mark: |
| Option C: Audience-split folders | New l1-runbooks-macos/ and l2-runbooks-macos/, triage tree in decision-trees/ | |

**User's choice:** Option B — extend existing folders
**Notes:** ARCHITECTURE.md Pattern 5 (Numbering Continuation) explicitly prescribes this approach. The Finder initially recommended Option C, but the Adversary discovered ARCHITECTURE.md plans macOS files inside existing folders. Referee confirmed: APv2 files (06-09) already coexist in l1-runbooks/, Phase 22 put macOS reference files in existing reference/ folder, and the platform: frontmatter field (Phase 20 D-19) handles disambiguation.

---

## L1 Failure Scenarios

| Option | Description | Selected |
|--------|-------------|----------|
| Option A: 5 scenario-specific | Device not in Intune, Setup Assistant stuck, CP not installing, config profile not applied, app not installed | |
| Option B: 3 core enrollment-only | Enrollment failure, profile/app delivery, compliance | |
| Option C: 4 symptom-grouped | "Won't enroll", "missing apps", "missing settings", "can't sign in" | |
| Modified A: 6 runbooks | Original 5 + compliance/CA runbook + Company Portal sign-in failure | :white_check_mark: |

**User's choice:** Modified Option A — 6 runbooks
**Notes:** The Referee synthesized the best elements: Option A's 1:1 mapping to Phase 23 config-failures categories, plus the Company Portal/CA gap identified as a cross-cutting finding. All options lacked explicit compliance coverage; adding runbooks #5 (compliance/CA) and #6 (Company Portal sign-in) closes this gap. Network connectivity is handled via branching within the "Setup Assistant stuck" runbook rather than a separate file.

---

## L2 Diagnostic Approach

| Option | Description | Selected |
|--------|-------------|----------|
| Option A: IntuneMacODC-first | Microsoft collection tool primary, Terminal commands secondary | :white_check_mark: |
| Option B: Terminal-first | Native macOS commands primary, IntuneMacODC as convenience | |
| Option C: Dual-path | Both approaches documented with equal weight | |

**User's choice:** Option A — IntuneMacODC-first
**Notes:** The Finder initially recommended Terminal-first, arguing IntuneMacODC-first was a "Windows pattern adapted for Mac" that triggers Pitfall P10. The Adversary disproved this: P10 prohibits Windows-specific tools (registry, PowerShell, mdmdiagnosticstool.exe), not Microsoft-provided macOS-native tools. IntuneMacODC is a bash script running on macOS. MTRO-03 explicitly names "IntuneMacODC tool and Terminal commands" — IntuneMacODC first. The Referee confirmed based on requirement word order, P10 scope, and the project's own windows-vs-macos.md diagnostic tools mapping.

---

## Triage Tree Design

| Option | Description | Selected |
|--------|-------------|----------|
| Option A: Standalone 06-macos-triage.md | New file in decision-trees/, independent from Windows tree | :white_check_mark: |
| Option B: Integrated into 00-initial-triage.md | Add platform gate to existing Windows tree | |
| Option C: Platform-first router | New 00-platform-router.md that routes to platform-specific trees | |

**User's choice:** Option A — standalone file
**Notes:** All three agents agreed. APv2 precedent (04-apv2-triage.md as separate file) is the direct template. Zero risk to existing Windows tree. index.md already has TBD placeholder expecting a direct macOS triage file link. The Adversary disproved several anti-B claims (applies_to is editable, node count was inflated, "burns a step" was misattributed) but the Referee ruled these disproofs don't make B better than A — they only show B is "not impossible."

---

## Claude's Discretion

- Exact file numbering (06 for decision-trees, 10+ for l1/l2-runbooks per ARCHITECTURE.md Pattern 5)
- L2 investigation runbook decomposition (2 vs 3 files)
- L2 log collection macOS version-specific path formatting
- Config-failures TBD link resolution strategy (file vs section anchors)
- L1 runbook internal branching structure

## Deferred Ideas

None — discussion stayed within phase scope.
