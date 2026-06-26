---
phase: 93-harness-lineage-bump-terminal-re-audit-milestone-close
plan: "02"
subsystem: validation-harness
tags: [harness-lineage, v1.11, validators, frozen-close, CI, HARN-02, Atom-2]
dependency_graph:
  requires: [93-01 Atom 1 (v1.11-milestone-audit.mjs + sidecar + BASELINE_15)]
  provides: [check-phase-89..93.mjs, frozen-at-close V110 pin, audit-harness-v1.11-integrity.yml]
  affects: [scripts/validation/_lib/frozen-at-close.mjs, .github/workflows/]
tech_stack:
  added: []
  patterns: [Path-A copy+relabel, cross-link FORM from check-phase-81, apex range bump, frozen-close single-entry append]
key_files:
  created:
    - scripts/validation/check-phase-89.mjs
    - scripts/validation/check-phase-90.mjs
    - scripts/validation/check-phase-91.mjs
    - scripts/validation/check-phase-92.mjs
    - scripts/validation/check-phase-93.mjs
    - .github/workflows/audit-harness-v1.11-integrity.yml
  modified:
    - scripts/validation/_lib/frozen-at-close.mjs
decisions:
  - "Atom 2 = exactly 7 files in ONE commit (16698d2) — HARN-02 indivisible contract met"
  - "V110='a3617e9' rides Atom 2 (locked divergence D-02/D-04); no V110_CLOSEGATE key"
  - "check-phase-93 CHAIN_PHASES=[48..92] (45 entries); CHAIN_SKIP=new Set([]) (empty-Set invariant)"
  - "check-phase-92 hard-asserts all 8 nav-edge needles (E1..E8) from 92-VERIFICATION.md:52-63"
  - "check-phase-91 DEFER note: does NOT re-assert V-63-08/09 (check-phase-63 owns BASELINE blob-hash pins)"
  - "Windows CHAIN-66 FAIL in apex is pre-existing WINDOWS-CLONE-DEEPNEST-TIMEOUT-01; Linux GHA is sole-authoritative"
  - "Atom 2 pushed to origin/master (16698d2) — hard ordering gate for Plan 93-03 satisfied"
metrics:
  duration: "~25 minutes"
  completed: "2026-06-26"
  tasks_completed: 2
  files_created: 6
  files_modified: 1
---

# Phase 93 Plan 02: HARN-02 Atom 2 — v1.11 Validators + V110 Pin + CI Workflow Summary

**One-liner:** Five net-new v1.11 per-phase validators (check-phase-89..93, including chain-apex with CHAIN=[48..92]) + V110 frozen-close pin (a3617e9) in frozen-at-close.mjs + 8th CI coexistence workflow — all as ONE indivisible commit (16698d2), pushed to origin/master.

## Commits Made

| Commit | Message | Files |
|--------|---------|-------|
| `16698d2` | `feat(93-02): v1.11 validators + V110 pin + CI surface — HARN-02 (atomic SC#1 Atom 2)` | 7 files (check-phase-89..93.mjs, _lib/frozen-at-close.mjs, audit-harness-v1.11-integrity.yml) |

## Key Outcomes

### Task 1: Lightweight validators (check-phase-89/90/91) + Cross-link validator (check-phase-92)

**check-phase-89.mjs** (lightweight, Path-A from check-phase-87.mjs):
- `CHAIN_PHASES = []`, `CHAIN_SKIP = new Set([])`
- `DELIVERABLE = 'docs/macos-lifecycle/01-psso-provisioning-walkthrough.md'`
- V-89-PRESENCE + V-89-SELF → **2 PASS / 0 FAIL / 0 SKIPPED** (verified locally)

**check-phase-90.mjs** (lightweight, Path-A from check-phase-87.mjs):
- `CHAIN_PHASES = []`, `CHAIN_SKIP = new Set([])`
- `DELIVERABLE = 'docs/l2-runbooks/30-macos-mdm-migration-failure.md'`
- V-90-PRESENCE + V-90-SELF → **2 PASS / 0 FAIL / 0 SKIPPED** (verified locally)

**check-phase-91.mjs** (lightweight, Path-A from check-phase-87.mjs):
- `CHAIN_PHASES = []`, `CHAIN_SKIP = new Set([])`
- `DELIVERABLE = 'docs/_glossary-macos.md'`
- DEFER NOTE in header: does NOT re-assert V-63-08/09 (check-phase-63 owns BASELINE blob-hash pins — D-01 two-place-update hazard prevention)
- V-91-PRESENCE + V-91-SELF → **2 PASS / 0 FAIL / 0 SKIPPED** (verified locally)

**check-phase-92.mjs** (cross-link FORM from check-phase-81.mjs):
- `CHAIN_PHASES = []`, `CHAIN_SKIP = new Set([])`
- 8 nav-edge `{id, file, needle}` rows (E1..E8 from 93-CONVENTIONS.md §12 / 92-VERIFICATION.md:52-63)
- CRLF-normalized readFile + forward-slash substring includes() + NO allowlist (mirrors C16 empty exemptions)
- IDs: V-92-CROSSLINK-E1..E8 + V-92-SELF
- E7 needle confirmed: `#platform-sso-attestation-command` (live in docs/quick-ref-l2.md:198)
- V-92-CROSSLINK-E1..E8 + V-92-SELF → **9 PASS / 0 FAIL / 0 SKIPPED** (verified locally)

### Task 2: Chain-apex (check-phase-93) + V110 pin + 8th CI workflow + commit + push

**check-phase-93.mjs** (chain-apex, Path-A from check-phase-88.mjs):
- `HARNESS = 'scripts/validation/v1.11-milestone-audit.mjs'`
- `CHAIN_PHASES = [48,49,...,92]` (45 entries; bumped from v1.10's [48..87] = 40)
- `CHAIN_SKIP = new Set([])` (verbatim Phase 68 7b635ca empty-Set invariant)
- V-93-AUDIT: SKIP-PASS until Plan 93-04 authors 93-VERIFICATION.md (archive-list `['v1.11-phases']`)
- V-93-CHAIN-48..92: NESTED child-spawn block copied verbatim from check-phase-88.mjs
- V-93-AUDIT-HARNESS: runs v1.11-milestone-audit.mjs subprocess
- V-93-SELF: dual-invariant (`!CHAIN_PHASES.includes(93)` AND `CHAIN_SKIP.size === 0`)
- Local Windows result: **46 PASS, 1 FAIL, 1 SKIPPED** (FAIL = pre-existing CHAIN-66 Windows deep-nest timeout; SKIP = AUDIT SKIP-PASS; Linux GHA is sole-authoritative)

**_lib/frozen-at-close.mjs** (2 appends):
- Added `V110: 'a3617e9',` entry inside `MILESTONE_CLOSE_SHAS` (single entry, no V110_CLOSEGATE key)
- Added `export const readAtV110Close = (p) => readAtClose('V110', p);` export
- V110 mirrors V19 comment shape: "Phase 88 Plan 88-04 — v1.10 milestone close-gate; single entry; atom == close-gate"

**audit-harness-v1.11-integrity.yml** (8th coexistence, Path-A from v1.10):
- `name: Audit Harness v1.11 Integrity`; header: "8th coexistence workflow"
- `on.pull_request.paths`: repointed v1.10-* → v1.11-*
- `parse`: validates v1.11-audit-allowlist.json
- `path-match`: greps v1.11-audit-allowlist.json in v1.11-milestone-audit.mjs
- `harness-run`: `node scripts/validation/v1.11-milestone-audit.mjs --verbose`
- `linux-chain-ubuntu-latest`: ALL 4 contract values preserved: fetch-depth:0, core.autocrlf false, continue-on-error:false, timeout-minutes:30; runs check-phase-93.mjs + CHAIN_TIMING_LINUX ::notice
- Per-validator jobs: check-phase-89, 90, 91, 92, 93 (fetch-depth:0, timeout-minutes:15, continue-on-error:false)
- `rotting-external-quarterly`: carried; cron-only `if:` guard → SKIPs on workflow_dispatch; sidecar repointed to v1.11
- `pin-helper-advisory`: carried verbatim (continue-on-error:true advisory)

## Verification Results

| Check | Result |
|-------|--------|
| `node scripts/validation/check-phase-89.mjs` | **2 PASS, 0 FAIL, 0 SKIPPED** (exit 0) |
| `node scripts/validation/check-phase-90.mjs` | **2 PASS, 0 FAIL, 0 SKIPPED** (exit 0) |
| `node scripts/validation/check-phase-91.mjs` | **2 PASS, 0 FAIL, 0 SKIPPED** (exit 0) |
| `node scripts/validation/check-phase-92.mjs` | **9 PASS, 0 FAIL, 0 SKIPPED** (exit 0) |
| `node scripts/validation/check-phase-93.mjs` (Windows) | 46 PASS, 1 FAIL, 1 SKIP (CHAIN-66 Windows deep-nest — pre-existing; Linux GHA sole-authoritative) |
| frozen-at-close.mjs V110 entry | `V110: 'a3617e9'` present; `readAtV110Close` export present; no `V110_CLOSEGATE` key |
| workflow contains check-phase-93 | CONFIRMED |
| workflow `Audit Harness v1.11 Integrity` | CONFIRMED |
| workflow `fetch-depth: 0`, `continue-on-error: false`, `timeout-minutes: 30` | CONFIRMED |
| v1.10 predecessor byte-unchanged | `git diff HEAD~1 HEAD -- .../v1.10-integrity.yml v1.10-milestone-audit.mjs v1.10-audit-allowlist.json` = EMPTY |
| Atom 2 file count (`git show --stat HEAD`) | **exactly 7 files** |
| Atom 2 commit message | `feat(93-02): v1.11 validators + V110 pin + CI surface — HARN-02 (atomic SC#1 Atom 2)` |
| Push to origin/master | `16698d2` confirmed via `git log origin/master --oneline -1` |
| Ordering gate (Plan 93-03) | SATISFIED — Atom 2 on origin/master before 93-03 dispatch |

## Constants Captured

| Constant | Value |
|----------|-------|
| COMMIT 3 SHA (Atom 2) | `16698d2` |
| origin/master after push | `16698d2` (verified) |
| V110 (v1.10 close-gate) | `a3617e9` |
| CHAIN_PHASES range | `[48..92]` (45 entries) |
| CHAIN_SKIP | `new Set([])` (empty) |
| check-phase-89/90/91 local | 2/0/0 each |
| check-phase-92 local | 9/0/0 |
| check-phase-93 local (Windows) | 46/1/1 (CHAIN-66 pre-existing deep-nest; 1 AUDIT-SKIP) |
| check-phase-93 Linux GHA | deferred to Plan 93-03 (sole-authoritative) |

## Notes on Windows Apex Behavior

The `check-phase-93` Windows result shows CHAIN-66 FAIL (1 FAIL) — this is the documented `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` phenomenon. check-phase-66 passes standalone (28/0/0), confirming no content regression. check-phase-88 (v1.10 apex) shows the same CHAIN-66 FAIL on Windows, confirming this is pre-existing behavior. Per 93-CONVENTIONS.md §7 D-03: Linux GHA is the sole-authoritative count for the apex. Plan 93-03 Axis-2 (Linux GHA) captures the authoritative result.

## Deviations from Plan

None — plan executed exactly as written. All 7 Atom-2 files created/modified. Commit message is the locked string verbatim. Atom 2 pushed to origin/master. V110 rides Atom 2 (locked divergence D-02/D-04 honored). check-phase-91 DEFER note present. check-phase-92 has all 8 CROSSLINK + 1 SELF = 9 checks. check-phase-93 CHAIN=[48..92] (45 entries), CHAIN_SKIP empty, HARNESS→v1.11.

## Known Stubs

None. This plan is tooling-only (no docs/* content stubs).

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced beyond what the threat model documents. The CI workflow (`audit-harness-v1.11-integrity.yml`) runs in GitHub-hosted Actions; it executes in-repo `.mjs` validators against a pinned ref with no external input, no secrets, no network calls beyond checkout. Threat model T-93-02-T (v1.10 surface mutation) gate passed (git diff empty). T-93-02-E (continue-on-error masking) gate passed (linux-chain + per-validator jobs all have `continue-on-error: false`; only `pin-helper-advisory` is advisory by design).

## Self-Check: PASSED

- `scripts/validation/check-phase-89.mjs` — FOUND
- `scripts/validation/check-phase-90.mjs` — FOUND
- `scripts/validation/check-phase-91.mjs` — FOUND
- `scripts/validation/check-phase-92.mjs` — FOUND
- `scripts/validation/check-phase-93.mjs` — FOUND
- `scripts/validation/_lib/frozen-at-close.mjs` — FOUND (V110 entry + readAtV110Close present; no V110_CLOSEGATE key)
- `.github/workflows/audit-harness-v1.11-integrity.yml` — FOUND
- Commit `16698d2` — FOUND (`feat(93-02): v1.11 validators + V110 pin + CI surface — HARN-02 (atomic SC#1 Atom 2)`)
- Atom 2 file count — 7 (PASSED)
- origin/master = `16698d2` — CONFIRMED
