---
phase: 48
plan: "06"
subsystem: ci-validation
tags: [ci, workflow, pre-commit, audit-harness, v1.5, advisory]
dependency_graph:
  requires: [48-01, 48-02, 48-03, 48-04, 48-05]
  provides: [audit-harness-v1.5-integrity.yml, pre-commit-advisory-hook]
  affects: [scripts/validation, .github/workflows]
tech_stack:
  added: []
  patterns: [lazy-skip-placeholder-jobs, advisory-exit-0, frozen-yml-lineage]
key_files:
  created:
    - .github/workflows/audit-harness-v1.5-integrity.yml
    - scripts/validation/pre-commit-advisory.sh
  modified:
    - scripts/validation/README-supervision-pins.md
decisions:
  - "v1.5 CI yml structurally clones v1.4.1 with 17 total jobs: parse + path-match + harness-run + check-phase-48 + 12 lazy-skip placeholders (49-60) + pin-helper-advisory"
  - "pre-commit hook: advisory-only, always exits 0 (Phase 48 D-21 contract)"
  - "Frozen audit-harness-integrity.yml untouched (D-16 lineage discipline)"
metrics:
  duration: "12 minutes"
  completed: "2026-04-26"
  tasks_completed: 2
  tasks_total: 2
  files_created: 2
  files_modified: 1
---

# Phase 48 Plan 06: CI Workflow + Pre-Commit Advisory Hook Summary

v1.5 CI workflow (17-job parallel yml) and advisory pre-commit hook for supervision pin drift detection per AUDIT-06 + D-16..D-22.

## Deliverables

### 1. `.github/workflows/audit-harness-v1.5-integrity.yml` (NEW FILE)

- **17 jobs total** (acceptance criteria: 13 check-phase- jobs + 4 infrastructure jobs)
- Structural clone of frozen `audit-harness-integrity.yml` scoped to v1.5 artifacts
- Comment header cites `v1.4 + v1.4.1 harnesses frozen in audit-harness-integrity.yml` (D-19)
- Trigger paths: `scripts/validation/v1.5-*` + 8 Linux + ops-depth doc globs (additive to v1.4.1 Android scope)
- `check-phase-48` job: registered immediately (D-18), links to `check-phase-48.mjs`
- `check-phase-49` through `check-phase-60`: 12 placeholder jobs using lazy-skip `if [ -f ... ]` pattern (D-18)
- `pin-helper-advisory` job: `continue-on-error: true` (Phase 43 D-14 + Phase 48 D-22)
- YAML syntax: validated via `npx js-yaml` (output: parsed correctly, 294 lines)

### 2. `scripts/validation/pre-commit-advisory.sh` (NEW FILE, EXECUTABLE)

- Advisory-only hook: all code paths terminate with `exit 0`
- Detects staged files via `git diff --cached --name-only` against `PINNED_FILE_PATTERN`
- 5-glob pinned-file scope: Android (3 paths) + Linux (2 paths) per interfaces block
- Runs `regenerate-supervision-pins.mjs --report` guarded by `command -v node` (graceful degradation)
- Smoke test: `bash scripts/validation/pre-commit-advisory.sh` exits 0 with empty staged set
- Executable bit: `chmod +x` + `git update-index --chmod=+x` for POSIX-portable executable bit on Windows
- `.git/hooks/pre-commit` NOT created (per-clone operator action per plan)

### 3. `scripts/validation/README-supervision-pins.md` (MODIFIED, APPEND-ONLY)

- New section appended: "Pre-commit advisory hook installation (Phase 48 D-21)"
- Includes: `cp` install command, `chmod +x` instruction, pinned-file glob reference, CI parallel note

## Job Count

| Category | Jobs |
|----------|------|
| parse | 1 |
| path-match | 1 |
| harness-run | 1 |
| check-phase-48 (immediate) | 1 |
| check-phase-49..60 (placeholders) | 12 |
| pin-helper-advisory | 1 |
| **Total** | **17** |

## Pre-commit Smoke Test

```
$ bash scripts/validation/pre-commit-advisory.sh
exit code: 0
```

No staged pinned files in current state — hook exits 0 immediately (correct behavior).

## Frozen Lineage Verification

```
$ git diff HEAD~2 .github/workflows/audit-harness-integrity.yml
(empty)
```

`audit-harness-integrity.yml` (v1.4 + v1.4.1 replay infrastructure) is byte-identical to pre-plan state. D-16 frozen lineage discipline preserved.

## Commits

| Commit | Description |
|--------|-------------|
| `1c052e7` | feat(48-06): add audit-harness-v1.5-integrity.yml CI workflow |
| `45578a2` | feat(48-06): add pre-commit-advisory.sh + README install instructions |

## Requirements Satisfied

| Requirement | Decision | Status |
|-------------|----------|--------|
| AUDIT-06 | CI registration + per-phase validator `check-phase-48` | SATISFIED |
| D-16 | New yml; frozen v1.4+v1.4.1 yml untouched | SATISFIED |
| D-17 | v1.5 yml structurally clones v1.4.1 (parse → path-match → harness-run → pin-helper-advisory) | SATISFIED |
| D-18 | check-phase-48 registered immediately; 49..60 lazy-skip placeholders | SATISFIED |
| D-19 | Comment header cites v1.4+v1.4.1 frozen in audit-harness-integrity.yml | SATISFIED |
| D-21 | Pre-commit advisory hook: exits 0 always | SATISFIED |
| D-22 | CI advisory (pin-helper-advisory with continue-on-error:true) present in parallel | SATISFIED |

## Deviations from Plan

None — plan executed exactly as written. Task 1 and Task 2 match plan acceptance criteria on first attempt.

## Self-Check: PASSED

- `.github/workflows/audit-harness-v1.5-integrity.yml` exists: CONFIRMED
- `scripts/validation/pre-commit-advisory.sh` exists: CONFIRMED
- `scripts/validation/README-supervision-pins.md` updated: CONFIRMED
- commit `1c052e7` exists: CONFIRMED
- commit `45578a2` exists: CONFIRMED
- `audit-harness-integrity.yml` unchanged: CONFIRMED (git diff empty)
