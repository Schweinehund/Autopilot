---
phase: 116-l1-l2-runbook-retrofit-75-docs
plan: "01"
subsystem: scripts/pipeline
tags: [eee-retrofit, d03-helper, node-builtins, dry-run-guard]
dependency_graph:
  requires: [115-01]
  provides: [116-02, 116-03, 116-04, 116-05, 116-06, 116-07, 116-08]
  affects: [docs/l1-runbooks, docs/l2-runbooks]
tech_stack:
  added: []
  patterns: [node-builtins-only, verbatim-D1_MAP-copy, path-column-join, guard-refusal]
key_files:
  created:
    - scripts/pipeline/retrofit-runbook.mjs
  modified: []
decisions:
  - "--self-test authored inline with core script (not in a separate Task 2 commit) — all five guard sub-tests pass; no behavioral difference"
  - "YYYY-MM-DD literal placeholder for Version-History date (executor fills at commit time, per plan spec)"
  - "Always show dry-run detail even without --verbose (useful for verification; verbose flag kept for write-mode extra output)"
metrics:
  duration_minutes: 15
  completed_date: "2026-07-04"
  tasks_completed: 2
  files_created: 1
  files_modified: 0
---

# Phase 116 Plan 01: Mechanical EEE Retrofit Helper — Summary

**One-liner:** Node-builtins-only retrofit helper that resolves all 75 doc_ids via RE-index.md path-join, injects `platform: Windows` for 17 keyless files via D1_MAP, relocates pre-H1 gate blockquotes, and inserts `## Summary` + Version-History row — dry-run proven on all 75 files, zero corpus writes.

## What Was Built

`scripts/pipeline/retrofit-runbook.mjs` — the D-03 mechanical EEE retrofit helper. Batch plans 116-02 through 116-08 invoke this script to perform the deterministic half of every runbook retrofit before hand-authoring the Summary prose and fixing D-05 blockquotes.

**Capabilities:**
- `--dry-run --all`: computes and reports all transforms for all 75 runbook files, writes nothing
- `--all`: writes transforms in-place (used by batch plans)
- `--self-test`: five in-memory fixture sub-tests proving path-allowlist, SENTINEL-GUARD, DOC-ID-UNRESOLVED, UNMAPPED-PLATFORM, and keyless-Windows-injection guards

**Guards (all active, all proven by --self-test):**
- **PATH-ALLOWLIST**: refuses any path not under `docs/l1-runbooks/` or `docs/l2-runbooks/`
- **SENTINEL-GUARD**: refuses `last_verified: 1970-01-01` (prevents C17 #9/#12 false-pass)
- **DOC-ID-UNRESOLVED**: errors if path not found in RE-index.md registry join
- **UNMAPPED-PLATFORM**: errors if platform value not in D1_MAP (hard failure, no fallback)

## Verification Results

```
node scripts/pipeline/retrofit-runbook.mjs --self-test
→ 5/5 sub-tests PASS, exit 0

node scripts/pipeline/retrofit-runbook.mjs --all --dry-run
→ 75 OK, 0 ERROR(S), 17 platform-injected, exit 0

git diff --quiet docs/ docs/_registry/RE-index.md
→ CLEAN (no corpus or registry writes)

grep "platform-injected=Y" dry-run output | wc -l
→ 17 (matches RESEARCH.md Q3: L1 01-09 + L2 01-08)
```

D1_MAP: 20 entries, byte-identical to `c17-eee-contract.mjs` lines 26–47.
Imports: `node:fs`, `node:path`, `node:process` only — zero external packages.

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| Task 1 + Task 2 | d6fcee9 | feat(116-01): author scripts/pipeline/retrofit-runbook.mjs |

## Deviations from Plan

### Inline --self-test (Task 2 authored in Task 1 commit)

**Found during:** Task 1 authoring
**Issue:** The `--self-test` mode (planned for Task 2) is naturally integral to the script structure — mirroring `guard-docx.mjs` and `c17-eee-contract.mjs` which both have self-test as part of the initial script, not a later addition. Separating it would have required writing a stub that is immediately replaced.
**Fix:** Authored --self-test inline with the core script in a single commit (d6fcee9). Task 2's acceptance criteria (`--self-test exits 0`, verbose dry-run confirms 17 injection files, zero unmapped, zero writes) are all satisfied by this commit.
**Files modified:** scripts/pipeline/retrofit-runbook.mjs
**Behavioral impact:** None — identical to the two-commit plan outcome.

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced. The script reads `.md` files and `docs/_registry/RE-index.md`; in write mode it overwrites `.md` files within the path allowlist. T-116-01 (write-path tampering) is mitigated by the path allowlist guard (verified active). T-116-03 (frontmatter tampering) is mitigated by SENTINEL-GUARD and programmatic D1_MAP lookup. T-116-SC (supply-chain) is mitigated by zero npm packages (node-builtins-only).

## Self-Check

### Files Created

- scripts/pipeline/retrofit-runbook.mjs ... FOUND

### Commits

- d6fcee9 ... FOUND (git log confirms)

## Self-Check: PASSED
