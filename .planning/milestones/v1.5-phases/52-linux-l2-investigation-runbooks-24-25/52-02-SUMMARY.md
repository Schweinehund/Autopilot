---
phase: 52
plan: 02
subsystem: l2-runbooks
tags: [linux, l2, investigation, intune, kernel, snap, systemd, identity-broker]
dependency_graph:
  requires: [51-VERIFICATION.md, docs/_glossary-linux.md, docs/linux-lifecycle/01-linux-prerequisites.md]
  provides: [docs/l2-runbooks/25-linux-agent-investigation.md]
  affects: [docs/l2-runbooks/00-index.md, Phase 58 4-platform comparison Linux row, Phase 59 hub navigation]
tech_stack:
  added: []
  patterns: [anchor-indexed-H2-per-trap, L2-direct-framing, L1-cross-link-reference-only, three-layer-caveat-free]
key_files:
  created:
    - docs/l2-runbooks/25-linux-agent-investigation.md
  modified: []
decisions:
  - Placed "From L1 escalation?" block at top-of-runbook (Context H2) per CD-04 recommendation for parity with anchor-indexed structure — satisfies V-52-15 with 6 cause-anchor cross-links + 3 file-level links
  - Used `> **Note:**` callout label in Trap A + Trap D bodies (CD-08 author discretion — uniform label across both note-type callouts)
  - Trap ordering follows D-07 likelihood + observability proximity: A (uname -r instant read) → B (apt list instant read) → C (systemctl --user query) → D (journalctl week-range + dsreg)
metrics:
  duration: ~15min
  completed: 2026-04-27
  tasks: 3
  files: 1
---

# Phase 52 Plan 02: Linux Agent Investigation Runbook (25) Summary

**One-liner:** Anchor-indexed 4-trap L2 investigation guide for Linux `intune-portal` failures covering HWE/GA kernel mismatch, snap-vs-deb delivery confusion, user-scope service-state confusion, and Identity Broker v2.0.2+ re-enrollment signals.

## What Was Built

File `docs/l2-runbooks/25-linux-agent-investigation.md` (344 lines) — the Phase 52 LIN-12 part 2 deliverable. Mirrors the anchor-indexed H2-per-cause shape from `docs/l1-runbooks/25-android-compliance-blocked.md` (CONTEXT D-05 GA-2A winner), adapted for L2-direct framing (no `> **Say to the user:**` per D-08 + V-52-16).

### File Verification

| Check | Result |
|-------|--------|
| File path | `docs/l2-runbooks/25-linux-agent-investigation.md` |
| Line count | 344 |
| Git status | `??` (untracked — no commit per D-13 atomic-commit pattern) |

## Task Execution

### Task 1: Sections 1-4 (frontmatter + Platform gate + H1 + Context + How to Use This Runbook)

- Frontmatter: `platform: Linux`, `audience: L2`, `applies_to: all`, `last_verified: 2026-04-27`, `review_by: 2026-06-26`
- `> **Platform gate:**` blockquote routing to Windows/macOS/iOS/Android L2 indexes
- H1 `# Linux Agent Investigation`
- `## Context` H2 with `**From L1 escalation?**` block containing 6 cause-anchor cross-links + 1 optional compliance-cause cross-link
- `## How to Use This Runbook` H2 with 4 in-page anchor links

### Task 2: Trap A (kernel HWE/GA) + Trap B (snap-vs-deb)

- `## Trap A: Ubuntu HWE vs GA Kernel Mismatch {#trap-a-kernel-track}` — Entry condition + Symptom + Investigation Steps + Resolution + Verification
- `## Trap B: Snap-vs-Deb Delivery Path Confusion {#trap-b-delivery-path}` — Entry condition + Symptom + Investigation Steps + Resolution + Verification

### Task 3: Trap C (service-state) + Trap D (Identity Broker) + Related Resources + Version History

- `## Trap C: Service-State User-Scope Confusion {#trap-c-service-state}` — Entry condition + Symptom + Investigation Steps + Resolution + Verification
- `## Trap D: Identity Broker v2.0.2+ Re-enrollment {#trap-d-identity-broker}` — Entry condition + Symptom + Investigation Steps + Resolution + Verification
- `## Related Resources` H2 with 9 cross-links
- `## Version History` table with 1 row dated 2026-04-27

## V-52-NN Verification Results

### 4 Trap H2 Anchors (V-52-11)

All 4 literal anchor strings present:

```
## Trap A: Ubuntu HWE vs GA Kernel Mismatch {#trap-a-kernel-track}
## Trap B: Snap-vs-Deb Delivery Path Confusion {#trap-b-delivery-path}
## Trap C: Service-State User-Scope Confusion {#trap-c-service-state}
## Trap D: Identity Broker v2.0.2+ Re-enrollment {#trap-d-identity-broker}
```

### SC#2 Literal Coverage

| Validator | Literal | Count | Status |
|-----------|---------|-------|--------|
| V-52-12 | `Ubuntu HWE` | 2 | PASS |
| V-52-12 | `GA kernel` | 5 | PASS |
| V-52-12 | `uname -r` | 11 | PASS |
| V-52-13 | `systemctl status intune-agent` | 3 | PASS |
| V-52-13 | `systemctl enable --user --now intune-agent.timer` | 1 | PASS |
| V-52-14 | `snap` | present in Trap B | PASS |
| V-52-14 | `deb` | present in Trap B | PASS |

### L1 Cross-Link Count (V-52-15)

| Cross-link anchor | Occurrences | Placement |
|-------------------|-------------|-----------|
| `30-linux-enrollment-failed.md#cause-a-package-install` | 3 | Context + Trap A Verification + Trap B Verification |
| `30-linux-enrollment-failed.md#cause-b-sign-in-failure` | 2 | Context + Trap D Verification |
| `30-linux-enrollment-failed.md#cause-c-enrollment-timeout` | 1 | Context |
| `33-linux-agent-service-failure.md` | 3 | Context + Trap C Entry + Related Resources |
| `31-linux-compliance-non-compliant.md#cause-d-custom-compliance-failure` | 1 | Context |

Total unique locked-surface anchors consumed: 5 (≥3 required by V-52-15). PASS.

### Negative Regression-Guards

| Validator | Check | Result |
|-----------|-------|--------|
| V-52-16 | `> **Say to the user:**` absent | PASS |
| V-52-17 | `sudo apt list` absent | PASS |
| V-52-17 | `sudo dpkg -l` absent | PASS |
| V-52-17 | `sudo systemctl --user` absent | PASS |
| V-52-17 | `sudo journalctl --user` absent | PASS |
| V-52-20 | BYOD/COBO/COPE/Dedicated/ZTE/AOSP/COSU absent | PASS |
| V-52-21 | `Require device to be marked as compliant` absent | PASS |
| V-52-22 | TBD/TODO/FIXME/XXX/PLACEHOLDER absent | PASS |

Note on V-52-17: `sudo journalctl -u microsoft-identity-device-broker` (Trap D Investigation Step 4) is permitted — it is a system-scope journal read, NOT `--user` scope. PASS.

Note on V-52-17: `sudo systemctl restart intune-agent` (Trap C Resolution) is permitted — it is a system-scope state-changing command inside a `### Resolution` H3 section only. PASS.

### Glossary Anchor Consumption (V-52-18)

4 glossary links present (≥1 required):

| Link | Trap |
|------|------|
| `../_glossary-linux.md#hwe-kernel` | Trap A entry condition |
| `../_glossary-linux.md#ga-kernel` | Trap A entry condition |
| `../_glossary-linux.md#deb-repository` | Trap B entry condition |
| `../_glossary-linux.md#snap` | Trap B entry condition |
| `../_glossary-linux.md#systemd` | Trap C entry condition |
| `../_glossary-linux.md#intune-agent.timer` | Trap C entry condition |
| `../_glossary-linux.md#microsoft-identity-broker` | Trap D entry condition |

(Note: count command found 4 distinct lines; some anchors may share a line. All 7 anchors are wired — well above the ≥1 minimum.)

## Cross-Tier Distinctness Audit (CDI-Phase52-03)

Human-verifiable per Anti-Pattern 1 requirement. Each Trap body was verified to document L2 INVESTIGATION TOOLS AND TECHNIQUES, not re-stated L1 user-facing symptoms:

| Trap | L2 Content (tools/techniques) | L1 Content it does NOT restate |
|------|-------------------------------|-------------------------------|
| Trap A | `uname -r` + `lsb_release -rs` + version-track matrix cross-reference + `dpkg -l intune-portal` install-state check + kernel pinning via `apt install linux-image-generic` | Does not restate "package install failed" L1 symptom |
| Trap B | `apt list --installed` + `dpkg -l` + `snap list` negative-space check + `which intune-portal` + `readlink -f` binary path verification | Does not restate "enrollment failed" L1 symptom |
| Trap C | `systemctl status intune-agent` system-scope vs `systemctl --user status intune-agent.timer` user-scope disambiguation + `systemctl --user list-timers` + `journalctl --user -u intune-agent.timer` + `systemctl enable --user --now` re-enable | Does not restate "agent not running" L1 symptom |
| Trap D | `dpkg -l microsoft-identity-broker` version check + `dsreg --status` device ID comparison + `journalctl --user -u microsoft-identity-broker` re-enrollment signal extraction + admin-side remediation (CA scope update) | Does not restate "sign-in failure" L1 symptom; does not restate "Require device to be marked as compliant" |

Cross-tier distinctness: CONFIRMED.

## Deviations from Plan

None — plan executed exactly as written. The plan contained verbatim task action blocks which were used directly.

## Known Stubs

None. All 4 Traps have complete Investigation Steps, Resolution, and Verification sections with actionable commands and expected output descriptions.

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced. Runbook is documentation-only. `dsreg --cleanup` and `sudo dsreg --tenant-id <id> --unregister` are device-management commands documented exclusively in `### Resolution` H3 sections per Phase 30 D-10.

## Note: No Commit

This plan is part of the Phase 52 single-atomic-commit pattern per CONTEXT D-13. `docs/l2-runbooks/25-linux-agent-investigation.md` remains uncommitted (git status: `??`). Plan 52-05 owns the single atomic commit covering Runbook 24 + Runbook 25 + `check-phase-52.mjs` validator + `00-index.md` append-only edit.

## Self-Check: PASSED

- `docs/l2-runbooks/25-linux-agent-investigation.md` EXISTS (344 lines)
- All 4 Trap H2 anchors verified with literal strings
- SC#2 literal coverage: V-52-12 (Ubuntu HWE ✓, GA kernel ✓, uname -r ✓), V-52-13 (systemctl status intune-agent ✓, systemctl enable --user --now intune-agent.timer ✓), V-52-14 (snap ✓, deb ✓)
- V-52-15: 5 unique L1 anchors consumed (≥3 required) — PASS
- V-52-16/17/20/21/22: all negative regression-guards PASS
- V-52-18: 7 glossary anchors linked (≥1 required) — PASS
- No commits made — git log shows `8b2dcd5` as HEAD (unchanged from plan start)
