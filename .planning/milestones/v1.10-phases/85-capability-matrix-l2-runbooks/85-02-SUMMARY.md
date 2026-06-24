---
phase: 85-capability-matrix-l2-runbooks
plan: "02"
subsystem: documentation
tags: [glossary, cross-links, capability-comparison, harness, validation]
dependency_graph:
  requires: [85-01]
  provides: [REF-02]
  affects: [docs/_glossary.md, docs/reference/4-platform-capability-comparison.md, scripts/validation/check-phase-63.mjs]
tech_stack:
  added: []
  patterns: [atomic-blob-hash-baseline-bump, semicolon-separated-see-also, link-not-copy]
key_files:
  created: []
  modified:
    - docs/_glossary.md
    - docs/reference/4-platform-capability-comparison.md
    - scripts/validation/check-phase-63.mjs
decisions:
  - D-07 verify-not-recreate confirmed: both macOS glossary terms already present (Kerberos SSO Extension line 142, Platform-SSO→guide-11 see-also line 128)
  - D-08 link-not-copy: comparison macOS SSO cell updated with Kerberos reference, existing #authentication link preserved
  - D-09 reciprocal see-also: Windows _glossary.md Entra ID SSO see-also extended (existing Enterprise SSO Plug-in entry preserved)
  - V-63-09 baseline bumped atomically with comparison doc edit (separate from 85-01 V-63-08 bump)
metrics:
  duration: 10m
  completed: "2026-06-23"
---

# Phase 85 Plan 02: Cross-Links + Comparison-Doc + V-63-09 Atomic Bump Summary

**One-liner:** Reciprocal Windows glossary Kerberos+Platform-Credential see-also and comparison macOS SSO cell link-not-copy update with atomic V-63-09 harness baseline bump.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Verify macOS glossary + add Windows _glossary.md reciprocal see-also | ff5587b | docs/_glossary.md |
| 2 | Update 4-platform-comparison macOS SSO cell + atomic V-63-09 BASELINE bump | 7572033 | docs/reference/4-platform-capability-comparison.md, scripts/validation/check-phase-63.mjs |
| 3 | [BLOCKING] Assert V-63-09 PASS + V-63-08 regression check | (verification only — no file changes) | — |

## macOS Glossary Verification (D-07 verify-not-recreate)

**All three required confirmations — do NOT recreate, do NOT duplicate:**

1. `_glossary-macos.md` line 17: `[Kerberos SSO Extension](#kerberos-sso-extension)` present in Alphabetical Index. CONFIRMED.
2. `_glossary-macos.md` line 128: Platform SSO term `> See also:` already carries `[Graph API: Platform Credential Management](admin-setup-macos/11-graph-api-platform-credential.md)`. CONFIRMED.
3. `_glossary-macos.md` line 142: `### Kerberos SSO Extension` term present with its own `> See also:` line at 146. CONFIRMED.

`git diff --quiet docs/_glossary-macos.md` is clean — the file was NOT modified.

## Changes Made

### Task 1: Windows _glossary.md Entra ID SSO see-also extended (D-09)

The existing `> See also:` line at `docs/_glossary.md` line 162 was extended from a single entry to three semicolon-separated entries. The original `[Enterprise SSO Plug-in]` entry is preserved verbatim; two new entries appended:

- `[Kerberos SSO Extension](_glossary-macos.md#kerberos-sso-extension)` (macOS on-premises Kerberos TGT extension, coexisting with PSSO)
- `[Graph API: Platform Credential Management](admin-setup-macos/11-graph-api-platform-credential.md)` (programmatic management of macOS Platform Credentials)

The line remains a single blockquote (one `> See also:` line, not two), ending with a period. Matches the semicolon-separated pattern from PATTERNS.md §Semicolon-Separated See-Also Blockquote.

### Task 2: 4-platform-capability-comparison.md macOS SSO cell (D-08)

The `## Single Sign-On` table macOS cell (line 101) was updated from:
```
Supported (macOS 14+) — [matrix](macos-capability-matrix.md#authentication)
```
to:
```
Supported (macOS 14+, incl. Kerberos SSO Extension) — [matrix](macos-capability-matrix.md#authentication)
```

Link-not-copy honored: the existing `macos-capability-matrix.md#authentication` link is retained (which already resolves to the section containing the Kerberos rows added by 85-01). No matrix prose duplicated.

### Task 2: V-63-09 BASELINE bump (mandatory atomic coupling)

After editing `4-platform-capability-comparison.md`, the new blob hash was computed:
- New hash: `2314ede7be54efbea1d4a4a787068310869a5896`

`scripts/validation/check-phase-63.mjs` line 230 BASELINE updated from `f25ff51a14b7feac46611c4c0511ed5c074ce03f` to `2314ede7be54efbea1d4a4a787068310869a5896`. The V-63-09 comment (line 223) and `name:` string (line 225) were also updated for consistency. This edit was committed in the SAME commit as the comparison doc edit (7572033), separate from the 85-01 V-63-08 bump.

**V-63-08 BASELINE (line 209) was NOT touched** — it remains `73f16378197223378a8507a6751c763902de58db` as set by 85-01.

### Task 3: Blocking harness gate

`node scripts/validation/check-phase-63.mjs` confirmed:
- `[8/32] V-63-08: macos-capability-matrix.md byte-unchanged vs baseline blob 73f16378197223378a8507a6751c763902de58db PASS`
- `[9/32] V-63-09: 4-platform-capability-comparison.md byte-unchanged vs baseline blob 2314ede7be54efbea1d4a4a787068310869a5896 PASS`

Both genuine PASS (not skipped, not FAIL). The easy-to-miss V-63-09 coupling is resolved.

## Deviations from Plan

None — plan executed exactly as written.

The RESEARCH.md noted that the pre-Phase-85 hash of `4-platform-capability-comparison.md` was `58b958639294c2bdb4082aecd9967a15d35aff2a` (not the Phase 63 original `f25ff51a...`). This was the actual current hash when Plan 85-02 began (85-01 did not modify the comparison doc). The V-63-09 harness was already in FAIL state against the stale `f25ff51a...` baseline when this plan started — this plan corrects it as intended.

## Known Stubs

None.

## Threat Flags

None — documentation-only plan. No executable application code, no network surface, no user input. The only executable change was a 40-char hex string constant in a validation script.

## Self-Check: PASSED

- `docs/_glossary.md` modified: CONFIRMED (commit ff5587b)
- `docs/reference/4-platform-capability-comparison.md` modified: CONFIRMED (commit 7572033)
- `scripts/validation/check-phase-63.mjs` modified: CONFIRMED (commit 7572033)
- `docs/_glossary-macos.md` unchanged: CONFIRMED (git diff --quiet clean)
- V-63-08 PASS: CONFIRMED
- V-63-09 PASS: CONFIRMED
- Commits verified in git log: ff5587b, 7572033
