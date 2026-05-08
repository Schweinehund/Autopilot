---
phase: 48
plan: "04"
subsystem: scripts/validation
tags: [audit-harness, c6-graduation, c7-graduation, blocking, knox-disambiguation, aosp-preservation]
dependency_graph:
  requires: [48-01]
  provides: [C6-blocking, C7-blocking]
  affects: [scripts/validation/v1.5-milestone-audit.mjs, scripts/validation/v1.5-audit-allowlist.json]
tech_stack:
  added: []
  patterns: [allowlist-mechanism, two-branch-return, suffix-extension]
key_files:
  modified:
    - scripts/validation/v1.5-milestone-audit.mjs
    - scripts/validation/v1.5-audit-allowlist.json
decisions:
  - "Extend C7 suffix list with compound Knox proper-noun qualifiers (Admin, Deployment, B2B, eFuse, tripped, license, profile, firmware, Portal, Investigation, SKU, attestation, enrollment, Custom, viewer, upload) to reduce false positives from 99 to 10"
  - "Add c7_knox_allowlist[] mechanism to C7 check (reads ALLOWLIST.c7_knox_allowlist || []) for the 10 remaining legitimate-bare occurrences that cannot be caught by suffix pattern"
  - "Populate c7_knox_allowlist[] in sidecar with 10 pinned entries (glossary heading/definition, Knox arrow-symbol compound, prose platform references in KME context)"
  - "C9 informational: true retained per D-06 (ops-domain false-positive risk through Phase 60)"
metrics:
  duration: "~25 minutes"
  completed: "2026-04-26T17:23:28Z"
  tasks_completed: 2
  files_modified: 2
---

# Phase 48 Plan 04: C6 + C7 Graduation to Blocking Summary

One-liner: Graduated C6 (PITFALL-7 AOSP preservation) and C7 (bare-Knox disambiguation) from informational-first to blocking in v1.5-milestone-audit.mjs, adding c7_knox_allowlist[] sidecar mechanism with 10 pinned legitimate-bare occurrences, while preserving C9 informational per D-06.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Graduate C6 to BLOCKING | b641d03 | scripts/validation/v1.5-milestone-audit.mjs |
| 2 | Graduate C7 to BLOCKING + c7_knox_allowlist mechanism | a5cdd3f | scripts/validation/v1.5-milestone-audit.mjs, scripts/validation/v1.5-audit-allowlist.json |

## Pre-graduation Safety Gates

### C6 Regression Check (Pitfall 1 mitigation)

Before flipping C6 to blocking, ran informational-mode check to confirm corpus state:

```
[6/12] C6: PITFALL-7 preservation in AOSP + per-OEM docs PASS (informational - 6/6 AOSP-scoped files preserve PITFALL-7 framing)
```

Result: **6/6 AOSP-scoped files pass** — safe to graduate. No false positives.

### C7 Corpus Inspection (Pitfall 2 mitigation)

Before flipping C7 to blocking, inspected all 99 bare "Knox" occurrences reported by the informational harness. Analysis revealed three categories:

1. **Compound proper-noun uses (89/99):** "Knox Admin Portal", "Knox Deployment App", "Knox B2B", "Knox eFuse", "Knox tripped", "Knox profile", "Knox license", "Knox Investigation" etc. — not in the original 11-form suffix list but unambiguous in context. **Resolution:** Extended suffix list with 17 additional compound-noun qualifiers.

2. **Legitimate-bare uses not catchable by suffix (10/99):** Glossary heading/definition, Knox→Intune arrow-symbol compound, prose platform references in KME DPC context ("Knox silently produces", "Knox does not recognize", "Knox JSON shown above"), "Samsung Knox docs" documentation reference, changelog "Knox entry" reference. **Resolution:** Added c7_knox_allowlist[] with 10 pinned {file, line, reason} entries.

3. **Ambiguous SKU references needing documentation fix:** None found. All 99 are legitimate uses.

## C6 Changes

- Removed `informational: true` flag
- Updated comment: `// D-04 + Phase 48 CONTEXT: BLOCKING in v1.5 (C6 target files frozen; no v1.5 phases touch admin-setup-android/ AOSP files).`
- Updated `run()` return logic to two-branch pattern:
  - `if (found === total && total > 0) return { pass: true };`
  - `return { pass: false, detail: found + '/' + total + ' AOSP-scoped files preserve PITFALL-7 framing' };`

## C7 Changes

- Removed `informational: true` flag
- Updated comment: `// D-05 + Phase 48 CONTEXT: BLOCKING in v1.5. Knox corpus stable since v1.4.1 Phase 44. c7_knox_allowlist[] sidecar exemption per D-05.`
- Extended suffix regex with 17 compound-noun qualifiers (Admin, Deployment, B2B, eFuse, tripped, license, License, profile, Profile, firmware, Portal, Investigation, SKU, attestation, enrollment, Enrollment, Custom, viewer, upload) — reduces bare count from 99 to 10
- Added allowlist mechanism: reads `ALLOWLIST.c7_knox_allowlist || []`, constructs `allowKey` Set of `file:line` strings, filters allowed occurrences from bare count
- Updated `run()` return logic to two-branch blocking pattern:
  - `if (bare === 0) return { pass: true };`
  - `return { pass: false, detail: bare + ' bare "Knox" occurrence(s) without SKU qualifier' };`
- Added `c7_knox_allowlist[]` to `v1.5-audit-allowlist.json` with 10 entries (all `{file, line, reason}` shaped)

## C9 Unchanged (D-06)

C9 `informational: true` flag preserved. Confirmed via `grep -A2 "id: 9,"` showing `informational: true,` on the next line. C9 stays informational through Phase 60 per D-06 (ops-domain false-positive risk for Phase 53/54 content with "deprecated"/"removed"/"EOL" tokens).

## Final Harness Output (Verbose)

```
[6/12] C6: PITFALL-7 preservation in AOSP + per-OEM docs PASS
[7/12] C7: bare-"Knox" disambiguation check ............. PASS
[9/12] C9: COPE banned-phrase check ..................... PASS (informational)
[11/12] C11: Ops-domain anti-pattern regex .............. PASS (informational)
[12/12] C12: 4-platform comparison structural validation PASS (informational)
[13/12] C13: Broken-link automation (markdown-link-check) PASS (informational)

Summary: 12 passed, 0 failed, 0 skipped
```

Exit code: 0. C6 and C7 have no `(informational)` marker — confirmed blocking semantics. C9 retains `(informational)` marker.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] C7 suffix list insufficient — 99 false positives**
- **Found during:** Task 2 Step 2 (corpus triage)
- **Issue:** The original 11-form suffix list covered Samsung Knox SKU names but not the broader compound proper-noun ecosystem ("Knox Admin Portal", "Knox Deployment App", "Knox B2B", etc.) that appears throughout Phase 44 KME documentation. All 99 occurrences were legitimate.
- **Fix:** Extended suffix regex with 17 additional compound-noun qualifiers (covers 89/99 occurrences) + added c7_knox_allowlist[] mechanism for remaining 10 legitimate-bare occurrences
- **Files modified:** scripts/validation/v1.5-milestone-audit.mjs, scripts/validation/v1.5-audit-allowlist.json
- **Commit:** a5cdd3f

## Known Stubs

None — this plan modifies only validation tooling, not documentation content.

## Threat Flags

None — docs-engineering tooling only; no new network endpoints, auth paths, or schema changes at trust boundaries.

## Self-Check: PASSED

- `scripts/validation/v1.5-milestone-audit.mjs` — exists and modified
- `scripts/validation/v1.5-audit-allowlist.json` — exists and modified
- Commit b641d03 — verified via `git log`
- Commit a5cdd3f — verified via `git log`
- `node scripts/validation/v1.5-milestone-audit.mjs` exits 0 — confirmed
- C6 PASS without `(informational)` marker — confirmed
- C7 PASS without `(informational)` marker — confirmed
- C9 PASS with `(informational)` marker — confirmed
