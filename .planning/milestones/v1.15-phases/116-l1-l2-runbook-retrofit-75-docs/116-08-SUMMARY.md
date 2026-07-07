---
phase: 116-l1-l2-runbook-retrofit-75-docs
plan: "08"
subsystem: docs/l2-runbooks
tags: [eee-retrofit, l2-runbooks, linux, ios-macos-shared-ipad, macos, all-platforms, d03-transform, d04-summary, d05-blockquote, c17-gate, registry-complete]
dependency_graph:
  requires: [116-01, 116-07]
  provides: []
  affects: [docs/l2-runbooks, docs/_registry/RE-index.md]
tech_stack:
  added: []
  patterns: [eee-standard, d03-mechanical-transform, d04-l2-banner-state-change, d05-sentence-split, transform-b-de-blockquote, mermaid-to-table]
key_files:
  created: []
  modified:
    - docs/l2-runbooks/24-linux-log-collection.md
    - docs/l2-runbooks/25-linux-agent-investigation.md
    - docs/l2-runbooks/26-apple-business-permission-denied.md
    - docs/l2-runbooks/27-macos-sso-investigation.md
    - docs/l2-runbooks/28-macos-kerberos-sso-investigation.md
    - docs/l2-runbooks/29-macos-graph-credential-investigation.md
    - docs/l2-runbooks/30-macos-mdm-migration-failure.md
    - docs/l2-runbooks/31-8021x-log-collection.md
    - docs/l2-runbooks/32-8021x-cert-investigation.md
    - docs/l2-runbooks/33-8021x-radius-eap-investigation.md
    - docs/_registry/RE-index.md
decisions:
  - "Mermaid diagram in RE-068 (7-leaf Apple Business decision tree) converted to plain Markdown table — C17 assertion #1 prohibits Mermaid fences; DA-9 LOCKED leaf count (7) preserved exactly in table rows"
  - "Transform B (de-blockquote) used for all non-gate informational notes exceeding 200c — avoids fragmenting technical content into many small groups while satisfying C17 #12"
  - "Platform gate second group for Linux files (RE-066, RE-067) required 3-way split rather than 2-way; combined 'For macOS ADE ... For iOS/iPadOS ... For Android Enterprise' string measured 224c"
  - "Secondary pre-H1 blockquote restoration for RE-074 and RE-075: known helper defect (first-blockquote-only relocation) documented in plan; detected via git diff, restored verbatim"
metrics:
  duration_minutes: 90
  completed_date: "2026-07-04"
  tasks_completed: 3
  files_created: 0
  files_modified: 11
---

# Phase 116 Plan 08: L2 Final Batch EEE Retrofit (RE-066..RE-075) + Full-Corpus C17 Gate — Summary

**One-liner:** EEE-standard mechanical transform of 10 final L2 runbooks (RE-066..RE-075) covering Linux, Apple Business, macOS SSO/Kerberos/Graph, macOS MDM migration, and 802.1X — injected EEE frontmatter, block lines, tailored L2 Summary prose (3 state-change banners), Version-History rows, 53-blockquote D-05 compliance pass, and full-corpus C17 exit 0 with 83 files, 0 violations, all 75 RE-index rows Approved.

## What Was Built

EEE-standard retrofit of the 10 final L2 runbooks completing phase 116:

- **RE-066** (`24-linux-log-collection.md`): Linux Intune client log collection — `journalctl` decision matrix
- **RE-067** (`25-linux-agent-investigation.md`): Linux agent failure investigation — 4 trap families
- **RE-068** (`26-apple-business-permission-denied.md`): Apple Business permission denied — 7-leaf decision tree
- **RE-069** (`27-macos-sso-investigation.md`): macOS Platform SSO investigation — Track A/B failure classes
- **RE-070** (`28-macos-kerberos-sso-investigation.md`): macOS Kerberos SSO Extension investigation
- **RE-071** (`29-macos-graph-credential-investigation.md`): macOS Graph Platform Credential investigation
- **RE-072** (`30-macos-mdm-migration-failure.md`): macOS MDM migration failure — Track A/B/C
- **RE-073** (`31-8021x-log-collection.md`): 802.1X log collection — all 5 platforms
- **RE-074** (`32-8021x-cert-investigation.md`): 802.1X certificate-chain investigation
- **RE-075** (`33-8021x-radius-eap-investigation.md`): 802.1X RADIUS/EAP investigation

All 10 files now fully conform to the D-03 structure (block line → H1 → Summary → gate blockquote → body), pass all 13 C17 assertions, and are marked Approved in the RE-index.md registry.

**Phase completion:** All 75 L1/L2 runbooks (RE-001..RE-075) are now Approved in RE-index.md.

## Verification Results

```
# Enrollment precheck (all 75 L1/L2 runbooks)
for f in docs/l1-runbooks/*.md docs/l2-runbooks/*.md; do grep -q "^doc_id:" "$f" && ...
→ Zero lines of output — all 75 files enrolled

# File count
ls docs/l1-runbooks/*.md docs/l2-runbooks/*.md | wc -l
→ 75

# Full-corpus C17 gate
node scripts/validation/c17-eee-contract.mjs
→ C17 assertion-violation-counts: #1=0 #2=0 ... #13=0
→ C17 summary: 83 files checked, 0 with violations, 0 total violations

# Registry status
grep -c "| Approved |" docs/_registry/RE-index.md
→ 75 (RE-001..RE-075 all Approved)

grep "| Pending |" docs/_registry/RE-index.md | grep "RE-0[0-6][0-9]\|RE-07[0-5]"
→ Zero lines (no Pending rows in RE-001..RE-075)
```

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| Task 1+3 (EEE transform + D-05) | 8e86e26 | feat(116-08): EEE retrofit + D-05 compliance for L2 runbooks RE-066..RE-075 |
| Task 2 (Summary authoring) | 16afeb3 | feat(116-08): hand-author Summary sections for L2 runbooks RE-066..RE-075 |
| Task 3 (registry + gate) | 6c1a47c | feat(116-08): flip RE-066..RE-075 to Approved; full-corpus C17 gate exit 0 |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Mermaid diagram in RE-068 triggered C17 #1 violation**
- **Found during:** Task 3 (C17 gate run)
- **Issue:** `26-apple-business-permission-denied.md` has a 7-leaf Mermaid decision tree (`graph TD`) at the body level. Once enrolled via `doc_id:` frontmatter injection, C17 assertion #1 ("No Mermaid code fences") triggered a violation.
- **Fix:** Converted `mermaid` code fence to a plain Markdown table with 7 rows (one per leaf), preserving all `click`-target links as hyperlinks. DA-9 LOCKED constraint (7 leaves) preserved exactly.
- **Files modified:** `docs/l2-runbooks/26-apple-business-permission-denied.md`
- **Commit:** 8e86e26

**2. [Rule 2 - Missing] Secondary pre-H1 blockquote restoration for RE-074 and RE-075**
- **Found during:** Task 1 (per-file diff verification, known helper defect)
- **Issue:** The retrofit helper relocates only the FIRST pre-H1 blockquote and silently drops any SECOND one. `32-8021x-cert-investigation.md` and `33-8021x-radius-eap-investigation.md` each had a "Foundation references (link-not-copy)" blockquote as the second pre-H1 blockquote, which was dropped.
- **Fix:** Manually restored both Foundation references blockquotes verbatim after the relocated Platform gate blockquote (before `## Context`), per the helper defect protocol.
- **Files modified:** `docs/l2-runbooks/32-8021x-cert-investigation.md`, `docs/l2-runbooks/33-8021x-radius-eap-investigation.md`
- **Commit:** 8e86e26

**3. [Rule 1 - Bug] Platform gate second group (files RE-066, RE-067) exceeded 200c after initial split**
- **Found during:** Task 3 (C17 gate run)
- **Issue:** Initial split of the Linux Platform gate ("For macOS ADE ... For iOS/iPadOS ... For Android Enterprise") into group 2 yielded 224c — still over the 200c limit.
- **Fix:** Applied a 3-way split: group 1 (Platform gate + Windows ref), group 2 (macOS ADE ref), group 3 (iOS + Android refs). All words preserved.
- **Files modified:** `docs/l2-runbooks/24-linux-log-collection.md`, `docs/l2-runbooks/25-linux-agent-investigation.md`
- **Commit:** 8e86e26

**4. [Rule 1 - Bug] journalctl note in RE-066 measured 218c after initial split**
- **Found during:** Task 3 (C17 gate run)
- **Issue:** The split of the `intune-agent.timer` Note group yielded a second group of 218c.
- **Fix:** Split at the semicolon boundary ("...if it returns 'Unit not found,' use the user-scope form below."). Words preserved.
- **Files modified:** `docs/l2-runbooks/24-linux-log-collection.md`
- **Commit:** 8e86e26

## Known Stubs

None — all Summary sections authored, all Version-History rows use 2026-07-04 date, all registry rows Approved.

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced. All changes are documentation content edits to Markdown files.

## Self-Check

### Files Modified (spot-check)

- docs/l2-runbooks/24-linux-log-collection.md ... FOUND
- docs/l2-runbooks/33-8021x-radius-eap-investigation.md ... FOUND
- docs/_registry/RE-index.md ... FOUND

### Commits

- 8e86e26 ... FOUND (git log confirms)
- 16afeb3 ... FOUND (git log confirms)
- 6c1a47c ... FOUND (git log confirms)

## Self-Check: PASSED
