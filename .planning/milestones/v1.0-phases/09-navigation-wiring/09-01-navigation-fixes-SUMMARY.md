---
phase: 09-navigation-wiring
plan: "01"
subsystem: docs/navigation
tags: [navigation, link-fixes, gap-closure, docs-only]
dependency_graph:
  requires: []
  provides: [L2RB-03, L2RB-04, NAV-02, NAV-01]
  affects: [docs/l2-runbooks/03-tpm-attestation.md, docs/l2-runbooks/04-hybrid-join.md, docs/common-issues.md, docs/index.md]
tech_stack:
  added: []
  patterns: [markdown-nav-footer, common-issues-section-pattern, shared-references-table-row]
key_files:
  modified:
    - docs/l2-runbooks/03-tpm-attestation.md
    - docs/l2-runbooks/04-hybrid-join.md
    - docs/common-issues.md
    - docs/index.md
decisions:
  - "architecture.md added to Shared References section of index.md per D-04 (Shared References is the designated discoverable-from-navigation section)"
  - "OOBE Failures section placed between ESP Failures and Profile Assignment Issues following natural failure-timeline order"
metrics:
  duration: "~5 minutes"
  completed: "2026-04-09"
  tasks_completed: 4
  files_modified: 4
---

# Phase 09 Plan 01: Navigation Fixes Summary

Closed 4 navigation/wiring gaps identified by the v1.0 milestone audit. All fixes are docs-only link corrections — two broken L2 runbook nav footers, one missing common-issues.md section, and one orphaned architecture.md file.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Fix Prev nav footer in 03-tpm-attestation.md | 044d179 | docs/l2-runbooks/03-tpm-attestation.md |
| 2 | Fix Next nav footer typo in 04-hybrid-join.md | 3ff0c15 | docs/l2-runbooks/04-hybrid-join.md |
| 3 | Add OOBE failure entry to common-issues.md | 0c3cdf5 | docs/common-issues.md |
| 4 | Add architecture.md link to index.md Shared References | 1601c56 | docs/index.md |

## Exact Line Changes

### Task 1 — docs/l2-runbooks/03-tpm-attestation.md (line 174)

**Before:**
```
Prev: [02-device-registration.md](02-device-registration.md) | Next: [04-hybrid-join.md](04-hybrid-join.md)
```

**After:**
```
Prev: [02-esp-deep-dive.md](02-esp-deep-dive.md) | Next: [04-hybrid-join.md](04-hybrid-join.md)
```

Rationale: 02-device-registration.md does not exist in l2-runbooks/. The correct predecessor (per phase 6 numbering) is 02-esp-deep-dive.md.

### Task 2 — docs/l2-runbooks/04-hybrid-join.md (line 161)

**Before:**
```
Prev: [03-tpm-attestation.md](03-tpm-attestation.md) | Next: [05-policy-conflict.md](05-policy-conflict.md)
```

**After:**
```
Prev: [03-tpm-attestation.md](03-tpm-attestation.md) | Next: [05-policy-conflicts.md](05-policy-conflicts.md)
```

Rationale: The actual file is 05-policy-conflict**s**.md (plural). Both link text and href corrected.

### Task 3 — docs/common-issues.md (inserted after line 27)

**Inserted block (between ESP Failures and Profile Assignment Issues):**
```markdown
## OOBE Failures

Device stuck on [OOBE](_glossary.md#oobe) screen, blank screen during setup, or setup loops back to the beginning.

- **L1:** [OOBE Failure](l1-runbooks/05-oobe-failure.md)
- **L2:** [L2 Runbook Index](l2-runbooks/00-index.md) — select runbook based on escalation checklist
```

Rationale: l1-runbooks/05-oobe-failure.md existed but was unreachable from common-issues.md.

### Task 4 — docs/index.md (appended to Shared References table)

**Appended row:**
```markdown
| [System Architecture](architecture.md) | Three-tier design overview (PowerShell modules, FastAPI backend, React frontend) |
```

Rationale: architecture.md was orphaned from all Phase 7 navigation entry points. Shared References is the designated discoverable-from-navigation section (D-04).

## Grep Verification Results

All 8 assertions confirmed passing:

| Assertion | Command | Expected | Actual |
|-----------|---------|----------|--------|
| Task 1 — esp-deep-dive link present | `grep -c "02-esp-deep-dive.md" docs/l2-runbooks/03-tpm-attestation.md` | >= 1 | 1 |
| Task 1 — device-registration link removed | `grep -c "02-device-registration" docs/l2-runbooks/03-tpm-attestation.md` | 0 | 0 |
| Task 2 — policy-conflicts.md (plural) present | `grep -c "05-policy-conflicts.md" docs/l2-runbooks/04-hybrid-join.md` | >= 1 | 1 |
| Task 2 — policy-conflict.md (singular) removed | `grep -cE "05-policy-conflict\.md" docs/l2-runbooks/04-hybrid-join.md` | 0 | 0 |
| Task 3 — OOBE runbook link present | `grep -c "l1-runbooks/05-oobe-failure.md" docs/common-issues.md` | >= 1 | 1 |
| Task 3 — OOBE Failures section heading | `grep -c "## OOBE Failures" docs/common-issues.md` | 1 | 1 |
| Task 4 — architecture.md link present | `grep -c "architecture.md" docs/index.md` | >= 1 | 1 |
| Task 4 — System Architecture label present | `grep -c "System Architecture" docs/index.md` | >= 1 | 1 |

## Audit Gap Closure

| Gap ID | Description | Status |
|--------|-------------|--------|
| L2RB-03 | l2-runbooks/03-tpm-attestation.md:174 — broken Prev nav link (02-device-registration.md does not exist) | CLOSED |
| L2RB-04 | l2-runbooks/04-hybrid-join.md:161 — Next nav link typo (05-policy-conflict.md singular) | CLOSED |
| NAV-02 | common-issues.md missing OOBE failure entry — 05-oobe-failure.md unreachable from this nav path | CLOSED |
| NAV-01 | architecture.md orphaned from all Phase 7 navigation entry points | CLOSED |

## Deviations from Plan

None - plan executed exactly as written. All 4 tasks were single-line or single-block insertions with no structural changes to surrounding content.

## Known Stubs

None. All links resolve to files that were pre-verified to exist on disk.

## Self-Check: PASSED

All target files confirmed modified:
- docs/l2-runbooks/03-tpm-attestation.md — present, Prev footer updated
- docs/l2-runbooks/04-hybrid-join.md — present, Next footer updated
- docs/common-issues.md — present, OOBE Failures section inserted
- docs/index.md — present, System Architecture row appended

All commits confirmed:
- 044d179 — Task 1
- 3ff0c15 — Task 2
- 0c3cdf5 — Task 3
- 1601c56 — Task 4
