---
phase: 74-v1-8-audit-harness-lineage-bump-milestone-close-pillar-d
plan: "01"
subsystem: docs-corpus + phase-conventions
tags: [vpp-01, corpus-rename, conventions, wave-1-scaffold, pillar-d]
dependency_graph:
  requires: []
  provides:
    - "VPP-01 4-site rename closed: 0 'VPP location token' in docs/operations/app-lifecycle/"
    - "74-CONVENTIONS.md: locked constants for 74-02..74-05 (resolved key, VPP sites, chain constants, allowlist invariants)"
  affects:
    - "docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md"
    - ".planning/phases/74-.../74-CONVENTIONS.md"
tech_stack:
  added: []
  patterns:
    - "Anchored-substring edit (not line-number pin) for corpus rename"
    - "Path-A conventions document from 70-CONVENTIONS.md"
key_files:
  created:
    - ".planning/phases/74-v1-8-audit-harness-lineage-bump-milestone-close-pillar-d/74-CONVENTIONS.md"
  modified:
    - "docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md"
decisions:
  - "VPP-01 resolved-key form: resolved_2026_06_08 (underscore, matching v1.7 sidecar convention resolved_2026_05_26)"
  - "4 sites renamed (not 3): REQUIREMENTS.md/ROADMAP SC#2 stale headline overridden by v1.7-DEFERRED-CLEANUP.md:213 source-of-truth + user approval 2026-06-08"
  - "No Version History H2 fabricated: 02-macos-pkg-dmg-pipeline.md and its file family have none; provenance = last_verified bump only"
metrics:
  duration: "~20 minutes"
  completed: "2026-06-08"
  tasks_completed: 2
  tasks_total: 2
  files_created: 1
  files_modified: 1
---

# Phase 74 Plan 01: VPP-01 4-site rename + 74-CONVENTIONS.md scaffold Summary

One-liner: VPP-01 4-site "VPP location token" → "content token" atomic rename (02-macos-pkg-dmg-pipeline.md) + 74-CONVENTIONS.md locking resolved-key, VPP sites, chain constants, and allowlist invariants for downstream plans.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | VPP-01 4-site rename + frontmatter bump (atomic) | `be48583` | `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` |
| 2 | Author 74-CONVENTIONS.md | `cd2c57d` | `.planning/phases/74-.../74-CONVENTIONS.md` |

## What Was Built

**Task 1 — VPP-01 corpus rename:**

Replaced all 4 "VPP location token" occurrences in `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` with "content token" using anchored-substring edits (full surrounding phrase, not line-number pins):

- L115 `## VPP` H2 first mention: "the VPP location token" → "the content token"
- L149 `## Mac App Store` H2 first mention: "ABM / VPP location token" → "ABM / content token"
- L155 `## Mac App Store` H2 subsequent: "ABM / VPP location token" → "ABM / content token"
- L160 `## Mac App Store` H2 subsequent: "A single VPP location token" → "A single content token"

Frontmatter bumped: `last_verified: 2026-04-28` → `last_verified: 2026-06-08`.

3 bare forms at lines ~142 ("VPP token"), ~150 ("Apple VPP tokens"), ~161 ("VPP tokens") left UNCHANGED — different term, out of scope per D-02 + user pick.

No `## Version History` H2 fabricated — the file family has none.

**Task 2 — 74-CONVENTIONS.md:**

Created Wave-1 conventions document at
`.planning/phases/74-v1-8-audit-harness-lineage-bump-milestone-close-pillar-d/74-CONVENTIONS.md`
(Path-A from `70-CONVENTIONS.md`). Locks 9 constant categories:

1. PHASE_74_RESOLVED_PREFIX: `resolved_2026_06_08` (underscore, v1.7 convention)
2. VPP-01 site registry: 4 sites + 3 out-of-scope forms + deviation note
3. 6-validator cross-OS-applicable set for HARNESS-11 Axis 2
4. BASELINE_12 anchor: Plan 74-02 Atom 1 known-past SHA
5. CHAIN constants: CHAIN_PHASES=[48..73] (26), CHAIN_SKIP=new Set([])
6. Coexistence count: v1.8 workflow = 5th file
7. Allowlist invariants: 4 new CI-2 VPP sidecar entry shapes
8. Close-gate: single commit, {phase_74_close_SHA} placeholder, ae9e3f4 baseline
9. Predecessor byte-unchanged gate command

## Deviations from Plan

### Approved Scope Change

**[Approved in planning — D-02] VPP-01 site count: 4 sites renamed (not 3 per REQUIREMENTS.md/ROADMAP headline)**

- **Found during:** Planning phase (adversarial-review per D-02); baked into plan as first-class requirement
- **Issue:** REQUIREMENTS.md:45 + ROADMAP SC#2 headline say "3 sites (lines 115, 149, 155)". The spawning source-of-truth `v1.7-DEFERRED-CLEANUP.md:213` records L160 as "the 4th occurrence; total 4 beyond calibrated scope". Renaming only 3 leaves L160 a live rotting-reference re-discovered by the next audit.
- **Resolution:** User approved 4-site rename 2026-06-08 per 74-CONTEXT.md D-02. All 4 renamed. Deviation documented in commit `be48583` body.
- **Files modified:** `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md`
- **Commit:** `be48583`

No other deviations — plan executed exactly as written for all other aspects.

## Verification Gates

All acceptance criteria passed:

| Gate | Result |
|------|--------|
| `grep -rc "VPP location token" docs/operations/app-lifecycle/` → all 0 | PASS |
| `grep -c "content token" 02-macos-pkg-dmg-pipeline.md` → 4 | PASS |
| 3 bare forms (lines 142/150/161) UNCHANGED | PASS |
| `last_verified: 2026-06-08` present | PASS |
| `git show --stat be48583` lists ONLY `02-macos-pkg-dmg-pipeline.md` | PASS |
| Predecessor byte-unchanged gate `git diff ae9e3f4 HEAD frozen surfaces` → EMPTY | PASS |
| `74-CONVENTIONS.md` exists with all locked constants | PASS |
| `git show --stat cd2c57d` lists ONLY `74-CONVENTIONS.md` | PASS |

## Known Stubs

None — no stub patterns in the modified or created files.

## Threat Flags

None — docs-only changes. No network endpoints, auth paths, file access patterns, or schema changes introduced.

## Self-Check: PASSED

- `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` — FOUND (modified)
- `.planning/phases/74-.../74-CONVENTIONS.md` — FOUND (created)
- Commit `be48583` — FOUND (`git log --oneline`)
- Commit `cd2c57d` — FOUND (`git log --oneline`)
