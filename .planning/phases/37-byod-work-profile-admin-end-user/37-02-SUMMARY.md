---
phase: 37
plan: "02"
subsystem: docs-android-byod-end-user
tags: [android, byod, work-profile, end-user, company-portal, amapi, docs]
dependency_graph:
  requires:
    - docs/admin-setup-android/04-byod-work-profile.md (Phase 37-01 — admin doc with 5 mandatory anchors)
    - docs/_glossary-android.md#byod (Phase 34 — first-use parenthetical cross-link target)
  provides:
    - docs/end-user-guides/android-work-profile-setup.md (NEW — first file in end-user tier)
    - docs/end-user-guides/ (NEW DIRECTORY — first in end-user documentation tier)
    - audience: end-user frontmatter enum (NEW — beachhead for future iOS/macOS/Windows end-user guides)
  affects:
    - Phase 40 L1 runbook 23 (Work profile not created) — may cross-link to end-user doc anchors
    - Future end-user guides (iOS/macOS/Windows) — D-07 shape, D-08 enum, D-09 guardrail are the template
tech_stack:
  added: []
  patterns:
    - D-13 8-section end-user guide structure (frontmatter + audience callout + 6 H2s)
    - D-08 audience:end-user NEW frontmatter enum (first use in docs suite)
    - D-09 SC2 admin-sidebar guardrail (zero portal-nav language; plain-English policy-side checks only)
    - D-06a Company Portal primary + web enrollment H3 sidebar pattern
    - D-06b top-5 error messages in Message/What-this-means/Tell-your-helpdesk format
    - D-04 sync contract (4 privacy topic keywords mirrored from admin doc in plain-language voice)
    - D-06c text-first policy (no screenshots, no ASCII art, bold UI element names)
    - D-06d first-use parenthetical ("personally-owned work profile in Google terminology")
key_files:
  created:
    - docs/end-user-guides/android-work-profile-setup.md
    - docs/end-user-guides/ (new directory)
  modified:
    - .planning/phases/37-byod-work-profile-admin-end-user/37-VALIDATION.md (Wave 3 Wave-0 log + Wave 3 audit log + status: wave-3-complete)
decisions:
  - "audience: end-user is the NEW frontmatter enum value — first instance in docs suite; beachhead for future tier end-user guides"
  - "D-09 SC2 guardrail: For IT helpdesk agents section uses plain-English policy-side check bullets (not portal-nav); admin doc referenced for portal-step detail"
  - "Word count 1498 — trimmed from initial 1559 by tightening Before you start intro and After enrollment paragraph and helpdesk agents intro"
  - "D-10 non-applicable: zero confidence markers in end-user doc; plain-language voice requires no source-citation markers"
metrics:
  duration_minutes: ~30
  completed_date: 2026-04-22
  tasks_completed: 3
  tasks_total: 3
  files_created: 1
  files_modified: 1
---

# Phase 37 Plan 02: BYOD Work Profile End-User Guide — Summary

## One-liner

First end-user-tier self-enrollment guide (NEW `docs/end-user-guides/` directory): plain-language Android BYOD Work Profile setup via Company Portal primary path + web enrollment sidebar, privacy plain-language summary, top-5 error messages, and D-09-compliant admin sidebar — establishing the `audience: end-user` frontmatter enum for future iOS/macOS/Windows end-user guides.

## What Was Built

`docs/end-user-guides/android-work-profile-setup.md` — a 1,498-word plain-language self-enrollment guide for personal Android device users. This is the FIRST file in the newly created `docs/end-user-guides/` directory and the first document in the project's end-user documentation tier. Structured as the D-13 8-section shape:

1. **Frontmatter** — `audience: end-user` (NEW enum value, first in docs suite), `platform: Android`, `applies_to: BYOD`, `last_verified: 2026-04-22`, `review_by: 2026-06-21`
2. **Audience-routing blockquote** — routes admins to `04-byod-work-profile.md`
3. **What is BYOD Work Profile?** — overview with D-06d first-use parenthetical + glossary cross-link
4. **Before you start** — 6-bullet plain-language prereq checklist
5. **Enroll your device** — 11-step Company Portal primary path + `### Web enrollment (alternative)` H3 sidebar with D-06a verbatim framing; post-enrollment two-app clarification (Company Portal vs Microsoft Intune)
6. **What your IT team can and cannot see** — CAN/CANNOT two-list plain-language mirror of admin D-03 privacy boundary table; all 4 D-04 sync-contract topics covered
7. **If something goes wrong** — top-5 error messages in D-06b format (Message you might see / What this means / Tell your IT helpdesk) × 5
8. **For IT helpdesk agents** — D-09 SC2-compliant admin sidebar with 5 plain-English policy-side check bullets; references admin doc for portal-step detail

## Success Criteria Verification

| Criterion | Status | Evidence |
|-----------|--------|----------|
| `docs/end-user-guides/android-work-profile-setup.md` exists | PASS | Created, 1498 words |
| NEW directory `docs/end-user-guides/` created | PASS | `test -d docs/end-user-guides` succeeds |
| `audience: end-user` NEW enum present | PASS | Line 3 of frontmatter |
| All 5 frontmatter keys complete | PASS | last_verified/review_by/audience/platform/applies_to all present |
| All 6 D-13 H2 sections present | PASS | What is BYOD / Before you start / Enroll your device / What your IT team can and cannot see / If something goes wrong / For IT helpdesk agents |
| Web enrollment H3 sidebar present | PASS | `### Web enrollment (alternative)` |
| D-06a verbatim framing present | PASS | "If your IT team has enabled web enrollment" |
| D-06d first-use parenthetical | PASS | "personally-owned work profile in Google terminology" |
| D-06b top-5 error format (5 × 3 fields) | PASS | 5 Message / 5 What this means / 5 Tell your IT helpdesk |
| Word count [800, 1500] | PASS | 1498 words |
| D-09 SC2 guardrail — zero portal-nav hits | PASS | grep returns 0 |
| D-04 sync contract — all 4 topics | PASS | work profile data (2), personal apps (2), personal data (1), location (2) |
| Zero confidence markers (D-10 N/A) | PASS | 0 markers |
| Zero SafetyNet / supervision | PASS | 0 occurrences each |
| VALIDATION.md status: wave-3-complete | PASS | Frontmatter updated |
| nyquist_compliant: true preserved | PASS | From Phase 37-01; not regressed |
| AEBYOD-02 requirement match | PASS | 12 Company Portal/what-your-IT hits + 0 D-09 violations |
| Zero modifications outside end-user doc + VALIDATION.md | PASS | DIM 8 git-diff confirms |

## Wave Gate History

| Gate | Status | Notes |
|------|--------|-------|
| Wave 0 (Task 7) — Admin-doc anchor dependency | PASS | All 5 mandatory D-06 anchors verified; tone-calibration checklist recorded; D-02 STATE.md correction confirmed |
| Wave 1 (Task 8) — Author end-user doc | PASS | 1498 words; all 8 D-13 sections; all critical gates passed on first authoring (initial 1559 trimmed to 1498 before commit) |
| Wave 1 (Task 9) — Full 10-dimension audit | PASS | All applicable dimensions PASS; DIM 1 + DIM 3 recorded as N/A with citations |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Word count trimmed from 1559 to 1498 before Task 8 commit**
- **Found during:** Pre-commit critical gate check (GATE 8)
- **Issue:** Initial draft was 1559 words, 59 words over the D-14 maximum of 1500
- **Fix:** Tightened three sections without removing any required content: (1) "Before you start" intro line ("Before enrolling, make sure you have the following:" → "Before enrolling, make sure you have:") and bullet phrasing condensed; (2) "After enrollment" paragraph tightened; (3) "For IT helpdesk agents" intro sentence shortened and one redundant phrase removed from the enrollment-flow paragraph
- **Files modified:** docs/end-user-guides/android-work-profile-setup.md
- **Commit:** a699c1f (inline within Task 8 — no separate commit needed)

## Tier-Inversion Precedent Note

This plan establishes the end-user documentation tier. Future iOS, macOS, and Windows end-user self-enrollment guides should follow:

- **D-07 shape:** audience callout + overview + before you start + enrollment steps + privacy summary + troubleshooting + admin sidebar
- **D-08 frontmatter enum:** `audience: end-user` (established here as first use)
- **D-09 admin-sidebar guardrail:** `## For IT helpdesk agents` section uses plain-English policy-side check bullets with a cross-reference to the admin doc for portal-step detail — zero Intune admin center navigation
- **D-06c text-first policy:** No screenshots, no ASCII art; bold UI element names; numbered enrollment steps
- **D-04 sync contract:** End-user doc must mirror admin doc on 4 privacy topic keywords (work profile data, personal apps, personal data, location)
- **D-10 non-applicable:** Confidence markers are admin-doc-scoped only; end-user docs use plain-language statements without source citations

## Known Stubs

None. The end-user doc is fully wired — all cross-links resolve to verified anchors, the privacy summary mirrors the admin D-03 canonical table topics, and the error messages are sourced from RF-7 (HIGH/#1 "Can't create work profile"; MEDIUM/#2-5 from MS Learn + community sources). The web enrollment sidebar correctly uses the D-06a "If your IT team has enabled web enrollment" framing to reflect its current opt-in status.

## Threat Flags

No new security-relevant surface introduced. This plan is documentation-only. T-37-06 (privacy claim accuracy) mitigated — end-user privacy summary rows verified against admin D-03 canonical table via D-04 sync contract grep. T-37-07 (D-09 SC2 admin-sidebar leak) mitigated — DIM 9 grep returns 0 hits. T-37-08 (wrong management app instruction) mitigated — enrollment steps sourced from MS Learn user-help/enroll-work-profile-android (HIGH confidence per RF-4); post-enrollment two-app clarification present. T-37-09 (tone regression) accepted — plain-language quality is manual-reviewer-only; automated DIM 2 + DIM 9 audits confirm no admin-jargon leakage. T-37-10 (new-tier precedent leakage) mitigated — DIM 6 verifies `audience: end-user` enum; D-08 documents this as the beachhead for future end-user guides.

## Self-Check: PASSED

| Check | Result |
|-------|--------|
| `docs/end-user-guides/android-work-profile-setup.md` exists | FOUND |
| `docs/end-user-guides/` directory exists | FOUND |
| Task 7 commit c84956b exists | FOUND |
| Task 8 commit a699c1f exists | FOUND |
| Task 9 commit 3859183 exists | FOUND |
| Word count 1498 in [800, 1500] | PASS |
| D-09 SC2 guardrail — 0 hits | PASS |
| D-04 sync contract — all 4 topics present | PASS |
| `audience: end-user` NEW enum present | PASS |
| VALIDATION.md status: wave-3-complete | PASS |
| nyquist_compliant: true preserved | PASS |
| Zero confidence markers | PASS |
| Zero SafetyNet / supervision | PASS |
| AEBYOD-02 confirmed | PASS |
