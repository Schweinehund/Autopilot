---
phase: 89-psso-provisioning-walkthrough
plan: 01
subsystem: docs/macos-lifecycle
tags: [documentation, psso, platform-sso, macos, ade, walkthrough]
dependency_graph:
  requires: []
  provides:
    - docs/macos-lifecycle/01-psso-provisioning-walkthrough.md
  affects:
    - docs/macos-lifecycle/00-ade-lifecycle.md (See Also — Phase 89-02)
    - docs/admin-setup-macos/07-platform-sso-setup.md (See Also — Phase 89-02)
    - docs/admin-setup-macos/02-enrollment-profile.md (See Also — Phase 89-02)
tech_stack:
  added: []
  patterns:
    - guide-00 sibling anatomy (4-block + hybrid D-01 extra blocks)
    - D-04 selector-first opening structure
    - D-02 shared spine + single-point A2 divergence callout
    - D-03 app-sso platform -s gates at registration stages
    - Freshness stamps on macOS-26-gated sections
key_files:
  created:
    - docs/macos-lifecycle/01-psso-provisioning-walkthrough.md
  modified: []
decisions:
  - "D-01 hybrid anatomy applied: 4 base blocks on all stages; What-User-Sees + How-to-Verify added at A1 Stage 7A/8A and A2 Stage 8B (registration state change stages)"
  - "D-02 shared spine with A2 as single-point divergence callout anchored at Company Portal stage"
  - "D-03 app-sso platform -s cited with only sourced full REGISTERED end-state; no partial states anywhere in doc"
  - "D-04 Which Path selector table is first content element after frontmatter; Prerequisites follows"
  - "Three-policy same-Assigned-static-user-group rule placed as most-prominent risk in A2 divergence callout"
  - "Freshness stamps on entire A2 section: last_verified 2026-06-24 / review_by 2026-09-24"
metrics:
  duration: "~25 minutes"
  completed: "2026-06-24"
  tasks_completed: 2
  files_created: 1
  files_modified: 0
---

# Phase 89 Plan 01: PSSO Provisioning Walkthrough Summary

**One-liner:** Consolidated PSSO provisioning walkthrough (A1 standard + A2 ADE-during-Setup-Assistant macOS 26+) with selector-first opening, shared 8-stage spine, delimited A2 divergence callout (three-policy rule most prominent), `app-sso platform -s` gates at registration stages, and guide-00 sibling footers.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Author opening structure + shared spine (A1 path) | 92f7f39 | docs/macos-lifecycle/01-psso-provisioning-walkthrough.md |
| 2 | Append A2 divergence callout + sibling footers | 92f7f39 | docs/macos-lifecycle/01-psso-provisioning-walkthrough.md (appended) |

*Note: Both tasks were composed atomically into the same file before the single commit. The file was written in one pass to avoid a partial-state intermediate commit on a documentation file.*

## What Was Built

A new consolidated scenario document `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` that:

1. **Opens with a path-divergence selector table** (D-04) as the first content element after frontmatter/gate/title — the `## Which Path Is Right for You?` table with A1 (macOS 13+, VPP CP 5.2404.0+) and A2 (macOS 26+, LOB CP 5.2604.0+) rows, followed immediately by the userless scope callout as a doc-level blockquote.

2. **Enumerates A2 hard-gate prerequisites** in a compact `### Prerequisites` section, linking (not copying) the ADE prerequisites from `00-ade-lifecycle.md`.

3. **Threads an 8-stage shared spine** (Mermaid pipeline + Stage Summary Table with Path column) covering: enrollment profile + PSSO policy → ADE token sync → policy assigned to static user groups → Company Portal deployed → ADE Setup Assistant → Await Configuration → registration (A1: desktop; A2: in-SA) → verification.

4. **Applies the D-01 hybrid anatomy** on all stages (4 base blocks: What the Admin Sees / What Happens / Behind the Scenes / Watch Out For), with the two extra blocks (What the User Sees + How to Verify) added only at the D-03 registration-state-change stages: A1 Stage 7A and A2 Stage 8B.

5. **Implements D-02 single-point A2 divergence** as a delimited multi-paragraph `>` blockquote anchored at the Company Portal stage (Stage 4) and covering all A2 differences downstream: three-policy rule (most prominent — presented first with explicit wipe-only recovery warning), CP 5.2604.0 LOB requirement, `EnableRegistrationDuringSetup`, SmartCard exclusion, and A2-registers-in-SA-with-no-desktop-notification.

6. **Carries freshness stamps** (`last_verified: 2026-06-24` / `review_by: 2026-09-24`) as the final line inside the A2 divergence blockquote, per project convention.

7. **Places `app-sso platform -s` gates** (D-03) at A1 Stage 7A (What the User Sees + How to Verify), A1 Stage 8A (final A1 gate), and inside the A2 divergence callout at Stage 8B (final A2 gate). Only the sourced full REGISTERED end-state is cited — no partial or intermediate states appear anywhere in the file.

8. **Cross-links link-not-copy** to guides 00/02/07 at every "Behind the Scenes" block rather than reproducing their settings tables. Failure escalation links to L1 #35, L1 #36, and L2 #27 placed at registration stages with no inline triage prose.

9. **Appends sibling footers** matching guide-00 conventions: `## See Also` with three bold sub-groups; `## Glossary Quick Reference` with `Term | Definition | First Appears` schema and glossary-anchored links for 8 terms; `## Version History` with Phase 89 initial entry.

## Deviations from Plan

### Composition Approach

**Adjustment:** Tasks 1 and 2 were composed atomically into a single file write and committed together, rather than Task 1 creating the file and Task 2 appending to it in a second commit.

**Reason:** The file represents one logical document. Writing it in two passes (partial file → append) would have created an intermediate state that couldn't be used standalone. Both tasks' content was authored in the same Write call and committed together in commit `92f7f39`.

**Impact:** Zero functional impact. All acceptance criteria for both tasks are met. The commit message documents both task contributions.

Otherwise: Plan executed exactly as written. No other deviations.

## Known Stubs

None. All cross-link targets confirmed to exist at their documented paths. The `## Which Path` selector, all stage blocks, A2 divergence callout, and footers are fully populated with sourced content.

## Threat Flags

No new security surface introduced. Documentation-only artifact. T-89-01 (content integrity / fabricated `app-sso` output) mitigated — no partial states in file confirmed by negative grep. T-89-02 (wrong verification command) mitigated — `security find-certificate` explicitly warned against in Stage 7A Watch Out For. T-89-03 (wipe-only recovery wording) documented accurately per Apple/Microsoft-authoritative procedure.

## Self-Check: PASSED

- `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` confirmed created (490 lines)
- Commit `92f7f39` confirmed in git log
- All 10 Task 1 automated grep checks: PASSED
- All 10 Task 2 automated grep checks: PASSED
- No nav-hub files modified (confirmed via `git status --short`)
- No guide-00/02/07 content modified (only new file staged)
