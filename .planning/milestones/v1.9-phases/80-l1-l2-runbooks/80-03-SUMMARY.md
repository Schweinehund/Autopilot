---
phase: 80-l1-l2-runbooks
plan: "03"
subsystem: docs/l1-runbooks+docs/l2-runbooks
tags: [index, macos, platform-sso, psso, ssorun-01, ssorun-02, ssorun-03, sc4]
dependency_graph:
  requires: [80-01, 80-02]
  provides: [L1 index rows #35/#36, L2 index row #27, L2 escalation-mapping L1#35→L2#27 L1#36→L2#27]
  affects: [docs/l1-runbooks/00-index.md, docs/l2-runbooks/00-index.md]
tech_stack:
  added: []
  patterns: [append-only-index-row, version-history-prepend, linked-escalation-mapping-row, navigation-last-invariant]
key_files:
  created: []
  modified:
    - docs/l1-runbooks/00-index.md
    - docs/l2-runbooks/00-index.md
decisions:
  - "Append-only edits only: #35 and #36 rows inserted after #15 row; #27 row appended after Compliance Evaluation row; escalation-mapping rows appended after Company Portal row"
  - "Linked format used for escalation-mapping L1 source cells, matching iOS/Android table precedent"
  - "Navigation-last invariant honored: no nav-hub files (docs/index.md, common-issues.md, quick-ref-l1/l2.md) or decision-tree (06-macos-triage.md) touched"
  - "Version History rows prepended at top of table in both files per append-top convention"
metrics:
  duration: "5min"
  completed: "2026-06-21"
  tasks: 2
  files: 2
---

# Phase 80 Plan 03: L1/L2 Index Registration (SC4) Summary

Append-only index wiring for Phase-80 runbooks: L1 index gains rows #35 and #36 in the macOS ADE Runbooks table; L2 index gains row #27 in the When-to-Use table plus two escalation-mapping rows wiring L1 #35 and L1 #36 to L2 #27 (SSORUN-01/02/03 SC4).

## Tasks Completed

| Task | Name | Commit | Files Modified |
|------|------|--------|----------------|
| 1 | Add #35/#36 rows to the L1 index macOS ADE Runbooks table | a6ba0ec | docs/l1-runbooks/00-index.md |
| 2 | Add #27 row + L1 #35/#36 → L2 #27 escalation mapping to the L2 index | 6613201 | docs/l2-runbooks/00-index.md |

## Verification Results

Both automated verify commands printed PASS:

```
# Task 1 verify
grep -q '35-macos-sso-sign-in-failure.md' docs/l1-runbooks/00-index.md &&
grep -q '36-macos-secure-enclave-key.md' docs/l1-runbooks/00-index.md &&
grep -q 'Phase 80 SSORUN-01/02' docs/l1-runbooks/00-index.md && echo PASS
→ PASS

# Task 2 verify
grep -q '27-macos-sso-investigation.md' docs/l2-runbooks/00-index.md &&
grep -q '35-macos-sso-sign-in-failure.md' docs/l2-runbooks/00-index.md &&
grep -q '36-macos-secure-enclave-key.md' docs/l2-runbooks/00-index.md &&
grep -q 'Phase 80 SSORUN-03/SC4' docs/l2-runbooks/00-index.md && echo PASS
→ PASS
```

All acceptance criteria satisfied:

**Task 1 (L1 index):**
- macOS ADE Runbooks table row #35 `35-macos-sso-sign-in-failure.md` present, after #15, before `## iOS L1 Runbooks`
- macOS ADE Runbooks table row #36 `36-macos-secure-enclave-key.md` present, after #15, before `## iOS L1 Runbooks`
- Version History row dated 2026-06-21 referencing Phase 80 SSORUN-01/02 prepended at top of table
- No existing row or section intro modified

**Task 2 (L2 index):**
- macOS ADE When-to-Use table row linking `27-macos-sso-investigation.md` with `10-macos-log-collection.md` as prerequisite present, after Compliance Evaluation row
- macOS L1 Escalation Mapping row mapping L1 #35 (`35-macos-sso-sign-in-failure.md`) → L2 `27-macos-sso-investigation.md` present
- macOS L1 Escalation Mapping row mapping L1 #36 (`36-macos-secure-enclave-key.md`) → L2 `27-macos-sso-investigation.md` (SE key re-registration path) present
- Version History row dated 2026-06-21 referencing Phase 80 SSORUN-03/SC4 prepended at top of table
- macOS version-gate blockquote and all existing rows unmodified

## Decisions Made

- **Linked escalation-mapping source format:** New L1→L2 mapping rows use linked format `[L1 NN: Title](../l1-runbooks/NN-file.md)` for the L1 source cell, matching the iOS and Android escalation-mapping table precedent (lines 119–124 and 152–157 of the L2 index). The existing macOS rows use bare text; the new rows adopt the more recent linked format per PATTERNS.md affordance.
- **Navigation-last invariant honored:** Only `docs/l1-runbooks/00-index.md` and `docs/l2-runbooks/00-index.md` were touched. No nav-hub file or `06-macos-triage.md` decision-tree was modified.
- **SC4 satisfied:** All four must_haves confirmed: L1 index lists #35 and #36 in macOS ADE table; L2 index lists #27 in When-to-Use table; L2 escalation-mapping table maps L1 #35 and L1 #36 to L2 #27; all edits are append-only with no existing rows modified.

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None. Both index files are fully wired. All three linked runbook files (`35-macos-sso-sign-in-failure.md`, `36-macos-secure-enclave-key.md`, `27-macos-sso-investigation.md`) were created in Phase 80 Plans 01 and 02. Index rows resolve immediately.

## Threat Flags

None — documentation-only deliverable. Append-only Markdown table-row edits to existing index files. No executable code, no new attack surface.

## Self-Check: PASSED

Files modified:
- `docs/l1-runbooks/00-index.md` — FOUND (3 insertions: 2 table rows + 1 Version History row)
- `docs/l2-runbooks/00-index.md` — FOUND (4 insertions: 1 When-to-Use row + 2 escalation-mapping rows + 1 Version History row)

Commits exist:
- `a6ba0ec` — FOUND (docs(80-03): register L1 runbooks #35 and #36 in macOS ADE Runbooks table)
- `6613201` — FOUND (docs(80-03): register L2 #27 and wire L1 #35/#36 escalation mapping in L2 index)
