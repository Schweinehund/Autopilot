---
phase: 115-c17-harness-check-validator-atom
plan: "01"
subsystem: validation-harness
tags: [c17, eee-contract, validator-atom, node-builtins, harn-01]
dependency_graph:
  requires: [114-03, 114-04]
  provides: [c17-gate, harn-01]
  affects: [phase-116-gate, phase-117-gate, phase-118-gate]
tech_stack:
  added: []
  patterns: [standalone-node-validator, guard-docx-self-test-analog, aggregate-runner, template-sentinel-skip, code-fence-aware-heading-scan]
key_files:
  created:
    - scripts/validation/c17-eee-contract.mjs
    - scripts/validation/c17-fixtures/c17-fixture-passing.md
    - scripts/validation/c17-fixtures/c17-fixture-failing.md
  modified: []
decisions:
  - TEMPLATE-SENTINEL skips assertions #9 and #12 (scaffold blockquote exemption)
  - Code-fence tracking for H1/H2 detection prevents false matches in example blocks
metrics:
  duration: 6 minutes
  completed: "2026-07-04T14:57:00Z"
  tasks: 2
  files: 3
---

# Phase 115 Plan 01: C17 EEE Contract Validator Atom Summary

Standalone blocking EEE-contract validator (all 13 assertions, node:fs/path/process only) with self-test fixture set; exits 0 on 8 enrolled docs/ files and on --self-test.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Author C17 self-test fixtures (passing + failing) | d1c1461 | scripts/validation/c17-fixtures/c17-fixture-passing.md, c17-fixture-failing.md |
| 2 | Author c17-eee-contract.mjs — 13-assertion blocking atom | 390ea86 | scripts/validation/c17-eee-contract.mjs |

## What Was Built

`scripts/validation/c17-eee-contract.mjs` — 577-line standalone Node.js script enforcing all 13 EEE contract assertions against enrolled Markdown under `docs/`. Enrollment: file has `doc_id` frontmatter key AND relPath starts with `docs/` (2A opt-in). Blocking (exit 1) on any violation; aggregates all violations per-file per-assertion (D-03 3C); emits machine-readable `C17 assertion-violation-counts` summary line to stdout.

Self-test set: two fixtures under `scripts/validation/c17-fixtures/` (outside `docs/` — Pitfall 7 avoidance):
- `c17-fixture-passing.md`: all 13 assertions pass; non-sentinel `last_verified: 2026-07-04` exercises assertion #9 value-equality.
- `c17-fixture-failing.md`: assertions #5 (2-word Summary) and #13 (status: InvalidStatus) fail; assertion #9 passes (block matches frontmatter on both fields, including InvalidStatus).

## Verification Results

```
node scripts/validation/c17-eee-contract.mjs
C17 assertion-violation-counts: #1=0 #2=0 #3=0 #4=0 #5=0 #6=0 #7=0 #8=0 #9=0 #10=0 #11=0 #12=0 #13=0
C17 summary: 8 files checked, 0 with violations, 0 total violations
→ exit 0

node scripts/validation/c17-eee-contract.mjs --self-test
[ST] Fixture-passing: 0 violations (exit 0 equivalent) PASS -- got 0 violations
[ST] Fixture-failing: ≥1 violation (exit 1 equivalent) PASS -- got 2 violation(s): #5,#13
[ST] D1 map: unmapped platform "UnknownOS" → assertion #10 fires PASS -- violations: [#10]
[ST] TEMPLATE-SENTINEL: assertion #9 skipped for 1970-01-01 files PASS -- assertion #9 correctly skipped
Self-test: 4 passed, 0 failed
→ exit 0
```

Node-builtins-only confirmed: imports are `node:fs`, `node:path`, `node:process` only. No npm packages. No `_lib/` import.

Phase-119 boundary intact: no `v1.15-milestone-audit.mjs`, `check-phase-*.mjs`, `_lib/*`, or CI workflows were created or modified.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Added code-fence tracking for H1/H2 heading detection**
- **Found during:** Task 2 verification (first run of normal mode)
- **Issue:** `docs/_standards/EEE-SOP-standard.md` has a `# Device Not Registered in Autopilot` inside a ` ```markdown ` code-fence example block (lines 112-121 of the standard). `docs/_templates/l2-template.md` has `# [Example command]` inside a ` ```powershell ` fence. Both caused assertion #2 to fire: "Expected exactly 1 H1, found 2".
- **Fix:** Added `inCodeFence[]` map computed at start of `checkFile`. Heading-scan iterations (assertions #2, #3, #4, #5) apply `!inCodeFence[i]` guard, excluding lines inside ``` or ~~~ fences from H1/H2 pattern matching.
- **Files modified:** `scripts/validation/c17-eee-contract.mjs`
- **Commit:** 390ea86 (included in Task 2 commit)

**2. [Rule 2 - Missing Critical Functionality] TEMPLATE-SENTINEL skip applied to assertion #12 as well as #9**
- **Found during:** Task 2 planning/implementation (pre-verified before running)
- **Issue:** Template files carry intentionally verbose authoring-instruction blockquotes that exceed the 200-char limit: `reference-template.md` single-line blockquote (~224 chars), `admin-template.md` 3-line blockquote (~236 chars joined), `admin-template-ios.md` 4-line blockquote (~437 chars joined). These are scaffold/instruction content, not corpus blockquotes.
- **Fix:** Added `if (!isTemplate)` guard to assertion #12, consistent with the established TEMPLATE-SENTINEL purpose (skip assertions on scaffold placeholder content). The same guard already applied to assertion #9.
- **Files modified:** `scripts/validation/c17-eee-contract.mjs`
- **Commit:** 390ea86 (included in Task 2 commit)
- **Rationale:** The TEMPLATE-SENTINEL sentinel date `1970-01-01` is the canonical marker for authoring scaffolds per EEE-SOP-standard.md §TEMPLATE-SENTINEL. Applying it to assertion #12 is the correct extension — it prevents false failures on instruction text that will be replaced with ≤200-char real content when templates are instantiated.

## Known Stubs

None. All features are fully wired. The D1_MAP constant is the real 20-entry map from `docs/_standards/EEE-SOP-standard.md`.

## Threat Flags

No new network endpoints, auth paths, file-access patterns, or schema changes introduced beyond what the plan's threat model covers (T-115-01 to T-115-SC).

## Self-Check: PASSED

Files created:
- `scripts/validation/c17-eee-contract.mjs` ✓ (577 lines, contains checkFile)
- `scripts/validation/c17-fixtures/c17-fixture-passing.md` ✓
- `scripts/validation/c17-fixtures/c17-fixture-failing.md` ✓

Commits:
- d1c1461 ✓ (feat: add C17 self-test fixture set)
- 390ea86 ✓ (feat: add c17-eee-contract.mjs — 13-assertion EEE contract validator atom)
