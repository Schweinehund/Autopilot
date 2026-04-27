---
phase: 52
plan: "04"
subsystem: docs/l2-runbooks
tags: [linux, l2-runbooks, index, append-only, escalation-mapping]
dependency_graph:
  requires: [52-01, 52-02]
  provides: [linux-l2-index-section]
  affects: [docs/l2-runbooks/00-index.md]
tech_stack:
  added: []
  patterns: [append-only-index-edit, phase-42-d03-contract, bilateral-discoverability]
key_files:
  created: []
  modified:
    - docs/l2-runbooks/00-index.md
decisions:
  - "Inserted Linux L2 H2 AFTER Android MAM-WE Advisory (line 163) and BEFORE ## Related Resources (line 165) — mirrors Phase 51 L1 index append pattern"
  - "Used PATTERNS.md paste-ready content verbatim for When to Use table and L1 Escalation Mapping table (3 rows: L1 30, 31, 33)"
  - "Version History row prepended at top of existing table (reverse-chronological per Android L2 analog precedent)"
metrics:
  duration: "~3 minutes"
  completed: "2026-04-27"
  tasks_completed: 1
  tasks_total: 1
  files_modified: 1
  lines_added: 23
---

# Phase 52 Plan 04: Linux L2 Index Append Summary

**One-liner:** Append-only `## Linux L2 Runbooks` H2 + When-to-Use table + Linux L1 Escalation Mapping inserted into `docs/l2-runbooks/00-index.md` before `## Related Resources`; V-52-19 PASSES.

## Task Executed

**Task 1: Append `## Linux L2 Runbooks` H2 + intro + tables (append-only edit)**

- Read `docs/l2-runbooks/00-index.md` fully — confirmed `## Android L2 Runbooks` at line 132, `### Android MAM-WE Investigation Advisory` block ends at line 163, `## Related Resources` at line 165
- Inserted Linux L2 section between lines 163 and 165 (blank line preserved as separator)
- Inserted Version History row at top of existing table (reverse-chronological)
- Ran verification: all V-52-19 conditions pass; diff shows 23 insertions, 0 deletions

## File Modified

**`docs/l2-runbooks/00-index.md`**

- Lines added: 23 (Linux L2 H2 block: 19 lines + Version History row: 1 line + blank lines)
- Insertion position: after line 163 (`### Android MAM-WE Investigation Advisory` block), before `## Related Resources`
- New H2 line number: 165 (Android L2 H2 at 132 → Linux L2 H2 at 165: ordering PASS)

## V-52-19 Conditions Satisfied

| Condition | Result |
|-----------|--------|
| Literal `## Linux L2 Runbooks` H2 present | PASS (grep -c returns 1) |
| `24-linux-log-collection.md` entry present | PASS (grep -c returns 5 — in When to Use table + Escalation Mapping) |
| `25-linux-agent-investigation.md` entry present | PASS (grep -c returns 3) |
| byte-position: Linux H2 line (165) > Android H2 line (132) | PASS (awk confirms) |
| Validator `node scripts/validation/check-phase-52.mjs` V-52-19 line | PASS |

## Append-Only Contract (Phase 42 D-03)

- `git diff --stat`: 1 file changed, 23 insertions(+), 0 deletions
- No `-` diff lines (outside of `---` diff metadata)
- All pre-existing H2s intact and at original line numbers:
  - `## When to Use` (line 19), `## L1 Escalation Mapping` (line 29), `## APv2 (Autopilot Device Preparation) Runbooks` (line 44), `## macOS ADE Runbooks` (line 71), `## iOS L2 Runbooks` (line 99), `## Android L2 Runbooks` (line 132), `## Related Resources` (line 187), `## Version History` (line 200)

## Linux Section Content

**H2:** `## Linux L2 Runbooks`

**Version gate blockquote:** Ubuntu 22.04 LTS and 24.04 LTS, deb package from `packages.microsoft.com`, no GA snap distribution. Cross-links to Android/iOS/macOS/Windows sections above.

**Intro paragraph:** [Linux Log Collection Guide](24-linux-log-collection.md) named as prerequisite for all Linux L2 investigation runbooks.

**`### When to Use` table (2 rows):**
- Row 1: [Linux Log Collection Guide](24-linux-log-collection.md) — prerequisite, collect journalctl + dpkg + file-based log snapshots
- Row 2: [Linux Agent Investigation](25-linux-agent-investigation.md) — intune-agent.timer failures, HWE kernel mismatch, snap/deb confusion, Identity Broker re-enrollment

**`### Linux L1 Escalation Mapping` table (3 rows, DPO-01 contract):**
- L1 30: Linux Enrollment Failed → Log Collection Section 3 + Agent Investigation Trap A/B/D
- L1 31: Linux Compliance Non-Compliant → Log Collection Section 2 (file-based paths)
- L1 33: Linux Agent Service Failure → Agent Investigation Trap C (direct L2 target)

Cross-links present: `../l1-runbooks/30-linux-enrollment-failed.md`, `../l1-runbooks/31-linux-compliance-non-compliant.md`, `../l1-runbooks/33-linux-agent-service-failure.md`

## No Placeholder Tokens

`grep -E "\b(TBD|TODO|FIXME|XXX|PLACEHOLDER)\b"` returns 0 matches.

## Deviations from Plan

None. Plan executed exactly as written. PATTERNS.md paste-ready content used verbatim; insertion position matched planning-time line references exactly.

## Commit Status

**NO COMMIT MADE.** `git log --oneline -3` confirms HEAD at `8b2dcd5` (unchanged). Atomic commit owned by Plan 52-05 per CONTEXT D-13 + DPO-Phase52-06.

`git status --short` shows `M docs/l2-runbooks/00-index.md` — modified, unstaged.

## Self-Check

- [x] `docs/l2-runbooks/00-index.md` exists and is modified (`M` in git status)
- [x] File contains `## Linux L2 Runbooks` (grep -c returns 1)
- [x] File contains `[Linux Log Collection Guide](24-linux-log-collection.md)` (grep -c returns 5)
- [x] File contains `[Linux Agent Investigation](25-linux-agent-investigation.md)` (grep -c returns 3)
- [x] Linux H2 line 165 > Android H2 line 132 (PASS)
- [x] Linux H2 precedes `## Related Resources` (line 187) (PASS)
- [x] 3 L1 cross-links present: runbooks 30, 31, 33
- [x] No placeholder tokens
- [x] Append-only: 23 insertions, 0 deletions
- [x] V-52-19 PASS confirmed via `node scripts/validation/check-phase-52.mjs`
- [x] HEAD still at 8b2dcd5 — NO COMMIT MADE

**Self-Check: PASSED**
