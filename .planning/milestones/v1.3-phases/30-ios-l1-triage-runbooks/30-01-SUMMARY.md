---
phase: 30-ios-l1-triage-runbooks
plan: "01"
subsystem: docs/validation
tags: [ios, l1-runbooks, template, validation, wave-1]
dependency_graph:
  requires: []
  provides:
    - docs/_templates/l1-template.md platform enum includes iOS
    - scripts/validation/check-phase-30.mjs single-command Phase 30 validator
  affects:
    - All Wave 2/3 iOS runbook creation (template prerequisite unblocked)
    - Continuous validation feedback during Waves 2-3 execution
tech_stack:
  added:
    - scripts/validation/check-phase-30.mjs (Node.js ESM, pure fs + execFileSync)
  patterns:
    - Static-check validation (grep assertions, file-exist checks, frontmatter parsing)
    - execFileSync with argv arrays for optional external tools (no shell interpolation)
key_files:
  created:
    - scripts/validation/check-phase-30.mjs
  modified:
    - docs/_templates/l1-template.md
decisions:
  - "D-24: Extend l1-template.md platform enum to include iOS (hard prerequisite for all Wave 2/3 runbooks)"
  - "Validation script uses only execFileSync with argv arrays for external calls; all file content read via fs.readFileSync"
  - "Check 13 external tools (markdown-link-check, mermaid-cli) SKIPPED when binaries unavailable; does not block Wave 1"
metrics:
  duration: "27 minutes"
  completed: "2026-04-17"
  tasks_completed: 2
  tasks_total: 2
  files_modified: 1
  files_created: 1
---

# Phase 30 Plan 01: Template Extension and Validation Harness Summary

L1 template platform enum extended to include iOS, and a 13-check static validation harness created that provides deterministic feedback during Wave 2/3 execution.

## What Was Built

### Task 1: L1 Template Platform Enum Extension (D-24)

Modified `docs/_templates/l1-template.md` with exactly two line changes:

- **Line 10** (inline comment): `Set platform to Windows, macOS, or all` -> `Set platform to Windows, macOS, iOS, or all`
- **Line 18** (YAML enum): `platform: Windows | macOS | all` -> `platform: Windows | macOS | iOS | all`

This is the hard prerequisite for all Wave 2/3 iOS runbook creation. Runbooks 16-21 declare `platform: iOS` in their frontmatter, which would be invalid against the template schema without this change.

No other lines were modified. No frontmatter date added (template file carries no version metadata per the inline comment header).

### Task 2: check-phase-30.mjs Validation Harness

Created `scripts/validation/check-phase-30.mjs` implementing all 13 static checks from 30-VALIDATION.md.

**Script characteristics:**

| Property | Value |
|----------|-------|
| Language | Node.js ESM (import syntax) |
| Dependencies | Node built-ins only: node:fs, node:path, node:child_process, node:process |
| Shell calls | Zero. All file reads via `fs.readFileSync`. External tools via `execFileSync` with argv arrays |
| Quick run | `node scripts/validation/check-phase-30.mjs --quick` (12 checks, <2s) |
| Full run | `node scripts/validation/check-phase-30.mjs` (all 13 checks including external tools) |

**Wave 1 output (expected):**

```
[1/13] Decision tree <=5 decision-diamond nodes ......... FAIL -- File does not exist
[2/13] Single-branch integration (00-initial-triage no iOS in Mermaid) PASS
[3/13] 6 runbooks have ## Symptom H2 .................... FAIL -- missing: 16,17,18,19,20,21
...
[10/13] l1-template.md contains "Windows | macOS | iOS | all" PASS
...
[13/13] Mermaid syntax valid + markdown links resolve    SKIPPED -- binaries unavailable

Summary: 2 passed, 10 failed, 1 skipped
```

Exit code: 1 (non-zero, as required by Nyquist -- downstream artifacts not yet built).

**npx binary availability findings:**
- `markdown-link-check`: SKIPPED (binary unavailable in current environment)
- `@mermaid-js/mermaid-cli`: SKIPPED (binary unavailable in current environment)
- Both print SKIPPED and do not contribute to failure count

## Commits

| Commit | Description |
|--------|-------------|
| b3f38e9 | feat(30-01): extend l1-template.md platform enum to include iOS |
| ffb1a0f | feat(30-01): create check-phase-30.mjs validation harness |

## Verification Results

All 5 plan verification checks passed:

1. `node -e "...readFileSync(l1-template.md)...includes('Windows | macOS | iOS | all')"` -> `true`
2. `node scripts/validation/check-phase-30.mjs --quick` -> exits 1, Check 10 PASS
3. `node scripts/validation/check-phase-30.mjs` (full) -> exits 1, Check 13 SKIPPED
4. Search script for `exec(` and `execSync(` -> zero hits (only `execFileSync` present)
5. `git status` shows only two modified files: `docs/_templates/l1-template.md` and `scripts/validation/check-phase-30.mjs`

## Deviations from Plan

None. Plan executed exactly as written.

The one implementation note: during file writing, Python string escaping required careful handling of literal newlines in JavaScript string literals (the validation script construction process). All issues were resolved and the final script passes Node.js parsing and runs correctly.

## Known Stubs

None. Both delivered artifacts are complete implementations:
- `docs/_templates/l1-template.md`: two-line edit fully implements D-24
- `scripts/validation/check-phase-30.mjs`: all 13 checks implemented and running

## Threat Flags

No new security-relevant surface introduced:
- `check-phase-30.mjs` reads files only; writes nothing; no network calls
- External calls use `execFileSync` with literal argv arrays (T-30-01-03 mitigated)
- Template edit adds only the literal string `iOS` (T-30-01-04 mitigated)

## Self-Check: PASSED

| Item | Status |
|------|--------|
| docs/_templates/l1-template.md | FOUND |
| scripts/validation/check-phase-30.mjs | FOUND |
| .planning/phases/30-ios-l1-triage-runbooks/30-01-SUMMARY.md | FOUND |
| Commit b3f38e9 | FOUND |
| Commit ffb1a0f | FOUND |
