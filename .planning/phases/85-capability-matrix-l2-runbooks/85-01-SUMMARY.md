---
phase: 85-capability-matrix-l2-runbooks
plan: "01"
subsystem: documentation
tags: [capability-matrix, kerberos, authentication, harness-baseline, anchor-inventory]
dependency_graph:
  requires: []
  provides: [macos-capability-matrix-kerberos-rows, V-63-08-passing, pre-edit-anchor-inventory]
  affects: [scripts/validation/check-phase-63.mjs]
tech_stack:
  added: []
  patterns: [atomic-blob-hash-baseline-bump, pre-edit-anchor-inventory-convention, SC1-commit-ordering]
key_files:
  created:
    - .planning/phases/85-capability-matrix-l2-runbooks/85-ANCHOR-INVENTORY.md
  modified:
    - docs/reference/macos-capability-matrix.md
    - scripts/validation/check-phase-63.mjs
decisions:
  - "D-01 honored: Kerberos rows placed under existing ## Authentication H2, not a new ## SSO Extensions H2"
  - "D-02 honored: Two per-feature rows matching PSSO table grammar (n/a Windows cell, guide-10 macOS link)"
  - "D-03 honored: No Graph-managed Platform Credential row added (routed to glossary per SC#3)"
  - "SC#1 satisfied: anchor inventory committed in standalone commit before any matrix edit"
  - "SC#2 satisfied: V-63-08 BASELINE updated to post-edit hash 73f163... in same atomic commit as matrix edit"
metrics:
  duration: "~10 minutes"
  completed: "2026-06-23"
  tasks_completed: 3
  files_created: 1
  files_modified: 2
---

# Phase 85 Plan 01: Kerberos Matrix Rows + V-63-08 Baseline Bump Summary

**One-liner:** Kerberos SSO Extension rows added under `## Authentication` in `macos-capability-matrix.md` with V-63-08 blob-hash baseline bumped atomically, preceded by committed pre-edit anchor inventory (SC#1).

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create pre-edit anchor inventory (SC#1) | 959ce9a | `.planning/phases/85-capability-matrix-l2-runbooks/85-ANCHOR-INVENTORY.md` |
| 2 | Add Kerberos rows + V-63-08 baseline bump | 87a6092 | `docs/reference/macos-capability-matrix.md`, `scripts/validation/check-phase-63.mjs` |
| 3 | [BLOCKING] Assert V-63-08 PASS | (verify only — no commit) | — |

## What Was Built

### Task 1 — Pre-Edit Anchor Inventory (SC#1)

Created `.planning/phases/85-capability-matrix-l2-runbooks/85-ANCHOR-INVENTORY.md` recording:
- Pre-edit blob hash: `e91f28c76441577d4e6176756ba04300ceb555e1` (confirmed via `git hash-object` before any edit)
- All 10 H2 anchors verbatim (lines 13–122), including `100:## Authentication` and `114:## See Also`
- H3 anchors: none (H2-only file)
- Permitted edits: Kerberos rows appended under `## Authentication`; zero heading renames; zero prose modifications

Committed in a standalone commit (959ce9a) with no matrix file staged — SC#1 ordering invariant satisfied.

### Task 2 — Kerberos Rows + V-63-08 Baseline Bump (REF-01, SC#2)

Added two rows to the `## Authentication` table body (after `Hybrid Entra join`, before `## See Also`):

| Feature | Windows | macOS |
|---------|---------|-------|
| Kerberos SSO Extension | n/a — not covered in this matrix | Supported (`com.apple.AppSSOKerberos.KerberosExtension`, Type: Credential) — deployed via Intune Custom Template (.mobileconfig); see [Kerberos SSO Extension Guide](../admin-setup-macos/10-kerberos-sso-extension.md) |
| PSSO TGT integration (`usePlatformSSOTGT`) | n/a — not covered in this matrix | Supported (macOS 14.6+); enables Kerberos extension to reuse TGTs issued by Platform SSO — see [guide 10](../admin-setup-macos/10-kerberos-sso-extension.md) |

Added Version History row: `| 2026-06-23 | Phase 85 (REF-01): add Kerberos SSO Extension rows under ## Authentication | -- |`

Computed post-edit blob hash: `73f16378197223378a8507a6751c763902de58db`

Updated `scripts/validation/check-phase-63.mjs` line 209 (and consistency labels on lines 202/204):
- Old BASELINE: `e91d7f9e001bb7ff4dc56a4ca98c84868fbf0716` (stale since Phase 79/81)
- New BASELINE: `73f16378197223378a8507a6751c763902de58db` (post-edit git hash-object value)

Both files staged together and committed atomically (87a6092) — DI-2 satisfied.

V-63-09 BASELINE (line 230) left unchanged — Plan 85-02 responsibility.

### Task 3 — [BLOCKING] V-63-08 PASS Gate

`node scripts/validation/check-phase-63.mjs` output:
```
[8/32] V-63-08: macos-capability-matrix.md byte-unchanged vs baseline blob 73f16378197223378a8507a6751c763902de58db PASS
```

- Genuine PASS (not skipped — `git` is available)
- Detail reads "blob hash matches baseline" with the new post-edit hash
- V-63-09 still FAIL (pre-existing legacy FAIL, expected — Plan 85-02 scope)

## Decisions Made

- Two Kerberos rows selected (Claude's Discretion per CONTEXT.md): one for the extension identity/deployment (KRB-01: `com.apple.AppSSOKerberos.KerberosExtension`) and one for the PSSO-TGT floor (KRB-02: macOS 14.6+ `usePlatformSSOTGT`)
- Commit ordering: anchor inventory first (959ce9a), matrix+harness second (87a6092) — SC#1 preserved
- V-63-09 intentionally not touched in Plan 85-01; left for Plan 85-02 per per-file coupling rule

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all content is fully wired. Both Kerberos rows link to the live guide-10 file (`docs/admin-setup-macos/10-kerberos-sso-extension.md`).

## Threat Flags

None — documentation-only changes; no new network surface, auth paths, or executable code introduced.

## Self-Check: PASSED

- `.planning/phases/85-capability-matrix-l2-runbooks/85-ANCHOR-INVENTORY.md` exists: FOUND
- `docs/reference/macos-capability-matrix.md` contains `AppSSOKerberos.KerberosExtension`: FOUND
- `docs/reference/macos-capability-matrix.md` contains `usePlatformSSOTGT`: FOUND
- `scripts/validation/check-phase-63.mjs` BASELINE = `73f16378197223378a8507a6751c763902de58db`: FOUND
- Commit 959ce9a (anchor inventory): FOUND
- Commit 87a6092 (matrix + baseline): FOUND
- V-63-08 PASS confirmed: PASSED
- V-63-09 line 230 unchanged (`f25ff51a14b7feac46611c4c0511ed5c074ce03f`): FOUND
