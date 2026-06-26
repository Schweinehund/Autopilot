---
phase: 89-psso-provisioning-walkthrough
verified: 2026-06-24T00:00:00Z
status: passed
score: 14/14 must-haves verified
overrides_applied: 0
re_verification: false
pre_existing_defects:
  - file: docs/macos-lifecycle/00-ade-lifecycle.md
    line: 250
    introduced_by: "Phase 75 commit c50a650"
    issue: "\"static device group\" should be \"static user group\" — factual error; Microsoft docs require user-group assignment for Platform SSO on user-affinity devices"
    scope: "OUT OF SCOPE for Phase 89 — guide 00 was frozen; Phase 89 only added one See Also bullet (line 396). The new walkthrough itself correctly uses \"static user groups\" throughout. Flagged for follow-up in a future patch phase."
---

# Phase 89: PSSO Provisioning Walkthrough Verification Report

**Phase Goal:** An operator can follow a single consolidated walkthrough from enrollment profile to PSSO-registered end user, covering both the standard post-enrollment path and the ADE-during-Setup-Assistant zero-click path (macOS 26+), without needing to assemble steps from guides 00/02/07.
**Verified:** 2026-06-24
**Status:** PASSED
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|---------|
| 1 | Operator can identify which path (A1 standard / A2 ADE-during-SA) applies from a selector table that is the first content after frontmatter | VERIFIED | `## Which Path Is Right for You?` table at line 15, immediately after the platform-gate blockquote and H1 (line 9/11). `### Prerequisites` appears at line 24 — selector precedes prereqs. |
| 2 | Operator can follow the standard post-enrollment (A1) journey from enrollment profile to PSSO-registered end user through a shared stage spine | VERIFIED | 8-stage shared spine (Stages 1–6 Both, Stage 7A A1, Stage 8A A1) with D-01 hybrid anatomy (4 base blocks + What the User Sees + How to Verify at the registration stage). Full journey: enrollment profile → ADE token sync → policy assigned → CP deployed → Setup Assistant → Await Configuration → desktop "Registration Required" → verify. |
| 3 | Operator sees a prominent, delimited macOS-26-gated A2 divergence callout beginning at the Company Portal stage with the three-policy same-static-group rule as the most-prominent risk | VERIFIED | `## A2 Path: ADE-during-Setup-Assistant (macOS 26+)` at line 359 is a continuous `>` multi-paragraph blockquote. The three-policy rule is the FIRST named risk inside the callout ("Most prominent risk — three-policy same-Assigned-static-user-group rule:"), before the A2 Requirements table, SmartCard exclusion, and verification gate. All six required elements present: CP 5.2604.0 LOB, three-policy rule with wipe recovery, EnableRegistrationDuringSetup, SmartCard exclusion, wipe-only recovery, A2-registers-in-SA-no-desktop-notification. |
| 4 | Operator runs `app-sso platform -s` verification gates at registration stages and a final per-path confirmation gate showing the full REGISTERED end-state | VERIFIED | Gates at Stage 7A How to Verify (line 297), Stage 8A How to Verify (line 341), and A2 Stage 8B inside the divergence callout (line 421). All three cite only `Device Registration: REGISTERED` / `User Registration: REGISTERED`. Negative grep confirms no PENDING or NOT REGISTERED strings anywhere in the file. |
| 5 | Operator is told userless devices never register (doc-level scope callout) and is routed to L1 #35/#36 + L2 #27 at the PSSO registration stage with no inline triage | VERIFIED | Userless callout is a `>` blockquote at line 22 (doc-level, not a gate). L1 #35, L1 #36, L2 #27 cross-links present at Stage 7A How to Verify (lines 309–311), Stage 8A How to Verify (lines 353–355), and A2 Stage 8B (lines 433–435). No inline triage prose in any of these blocks. |
| 6 | Reader of guide-00 can discover the new walkthrough via a See Also entry in Related Guides | VERIFIED | Line 396 of `00-ade-lifecycle.md`: `[PSSO Provisioning Walkthrough](01-psso-provisioning-walkthrough.md) -- End-to-end operator walkthrough...` — placed immediately after the Platform SSO Setup bullet, sub-grouped + description style matching guide-00 house style. |
| 7 | Reader of guide-07 can discover the new walkthrough via a flat See Also entry with description | VERIFIED | Line 147 of `07-platform-sso-setup.md`: `[PSSO Provisioning Walkthrough](../macos-lifecycle/01-psso-provisioning-walkthrough.md) -- End-to-end operator walkthrough...` — placed immediately after the macOS ADE Lifecycle Overview bullet. Flat list with description, matching guide-07 style. |
| 8 | Reader of guide-02 can discover the new walkthrough via a bare See Also link with no description | VERIFIED | Line 133 of `02-enrollment-profile.md`: `[PSSO Provisioning Walkthrough](../macos-lifecycle/01-psso-provisioning-walkthrough.md)` — bare link, no description, placed immediately after the macOS ADE Lifecycle Overview bullet. Matches guide-02's bare-link house style (critical constraint honored). |
| 9 | Every cross-link added resolves to an existing file (no broken links) | VERIFIED | `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` exists (490 lines, confirmed by `89-01-SUMMARY.md` and direct read). All three reciprocal links point to this file using correct relative paths. `docs/l1-runbooks/35-macos-sso-sign-in-failure.md`, `docs/l1-runbooks/36-macos-secure-enclave-key.md`, and `docs/l2-runbooks/27-macos-sso-investigation.md` cross-links confirmed to exist from CONTEXT.md. |
| 10 | Frontmatter carries `last_verified: 2026-06-24`, `review_by: 2026-09-24`, `applies_to: ADE`, `audience: all`, `platform: macOS` | VERIFIED | Lines 2–6 of the walkthrough match exactly. |
| 11 | Freshness stamps on macOS-26-gated A2 section | VERIFIED | Final line inside the A2 divergence blockquote (line 441): `_Section provenance — last_verified: 2026-06-24 / review_by: 2026-09-24. This section covers macOS 26-gated features..._` |
| 12 | Stage Summary Table carries a Path column with Both, A1, and A2 values | VERIFIED | Lines 67–78 show 6 rows with `Both`, 2 rows with `A1`, and 2 rows with `A2`. |
| 13 | No partial/intermediate `app-sso platform -s` output strings appear (D-03 fabrication ban) | VERIFIED | Negative grep: `Registration: PENDING` / `Registration: NOT REGISTERED` return no matches. Only `REGISTERED` end-state is cited in all three verification gates. |
| 14 | Nav-hub files were NOT modified by this phase | VERIFIED | `git log HEAD~5..HEAD -- docs/index.md docs/common-issues.md docs/quick-ref-l2.md docs/decision-trees/06-macos-triage.md` returns empty. Commit `4959b42` modified only `00-ade-lifecycle.md`, `07-platform-sso-setup.md`, and `02-enrollment-profile.md`. Commit `ab0f8b3` modified only `01-psso-provisioning-walkthrough.md`. |

**Score:** 14/14 truths verified

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` | Consolidated PSSO provisioning walkthrough, both A1 and A2 paths | VERIFIED | 491 lines. Exists, substantive, wired (linked from all three guides). |
| `docs/macos-lifecycle/00-ade-lifecycle.md` | Reciprocal See Also link to new walkthrough | VERIFIED | Line 396 — one bullet added, no other content changed in Phase 89. |
| `docs/admin-setup-macos/07-platform-sso-setup.md` | Reciprocal See Also link to new walkthrough | VERIFIED | Line 147 — one bullet added, no other content changed in Phase 89. |
| `docs/admin-setup-macos/02-enrollment-profile.md` | Reciprocal See Also link to new walkthrough | VERIFIED | Line 133 — one bare bullet added, no other content changed in Phase 89. |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `01-psso-provisioning-walkthrough.md` | `07-platform-sso-setup.md` | Prerequisites, Stage 1 Behind the Scenes, A2 callout | WIRED | Pattern `07-platform-sso-setup.md` found at lines 9, 32, 96, 103, 108, 158, 286, 394, 408, 461. |
| `01-psso-provisioning-walkthrough.md` | `35-macos-sso-sign-in-failure.md` | How to Verify blocks at Stage 7A, 8A, and A2 8B | WIRED | Found at lines 309, 353, 433, 463. |
| `01-psso-provisioning-walkthrough.md` | `27-macos-sso-investigation.md` | How to Verify blocks at Stage 7A, 8A, and A2 8B | WIRED | Found at lines 311, 355, 435, 465. |
| `00-ade-lifecycle.md` | `01-psso-provisioning-walkthrough.md` | See Also > Related Guides bullet (same-directory bare filename + description) | WIRED | Line 396 of guide 00. Placed after Platform SSO Setup bullet per PLAN spec. |
| `07-platform-sso-setup.md` | `01-psso-provisioning-walkthrough.md` | Flat See Also bullet with description, cross-directory `../macos-lifecycle/` path | WIRED | Line 147 of guide 07. Placed after macOS ADE Lifecycle Overview bullet per PLAN spec. |
| `02-enrollment-profile.md` | `01-psso-provisioning-walkthrough.md` | Flat bare See Also bullet, cross-directory `../macos-lifecycle/` path, no description | WIRED | Line 133 of guide 02. Placed after macOS ADE Lifecycle Overview bullet, bare link honoring guide-02 house style. |

---

### Requirements Coverage

| Requirement | Phase | Description | Status | Evidence |
|-------------|-------|-------------|--------|---------|
| PROV-01 | 89 | Single consolidated walkthrough for standard post-enrollment path, per-stage admin/user/verify structure | SATISFIED | 8-stage A1 spine with D-01 hybrid anatomy. Stage 7A carries What the Admin Sees, What Happens, Behind the Scenes, Watch Out For, What the User Sees, How to Verify. |
| PROV-02 | 89 | ADE-during-Setup-Assistant path (macOS 26+): CP 5.2604.0 LOB, EnableRegistrationDuringSetup, three-policy rule, SmartCard exclusion, wipe-only recovery, prominent OS-26 callout | SATISFIED | A2 divergence callout (lines 360–442) covers all six required elements. Three-policy rule is the most prominent risk (first, dedicated block). SmartCard exclusion, wipe-only recovery, A2-in-SA registration, CP 5.2604.0 LOB, EnableRegistrationDuringSetup all present. Freshness stamps present. |
| PROV-03 | 89 | Path-divergence selector at top; `app-sso platform -s` gates; user-affinity-only scope callout | SATISFIED | Selector table is first content element (line 15). Gates at Stage 7A (line 297), Stage 8A (line 341), A2 Stage 8B (line 421). Userless scope callout at line 22 (doc-level blockquote, not a gate). |
| PROV-04 | 89 | Link-not-copy to guides 00/02/07; cross-links to L1 #35/#36 + L2 #27; reciprocal See Also in guides 00/02/07 | SATISFIED | Link-not-copy confirmed — no reference tables from 07/02 reproduced inline. Escalation links at every applicable verification stage. Reciprocal See Also in all three guides, each in its own house style. |

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `00-ade-lifecycle.md` | 250 | "static **device** group" should be "static **user** group" — factual error introduced in Phase 75 commit c50a650, before Phase 89 | INFO (pre-existing, out of scope) | An operator following guide 00's Stage 4 Watch Out For might assign the PSSO Settings Catalog policy to a device group instead of a user group, causing silent Conditional Access failures. The new walkthrough (01) correctly states user groups throughout. Requires a follow-up patch. |

No debt markers (TBD/FIXME/XXX) found in any Phase 89 modified file. No placeholder patterns found. No stub implementations.

---

### Code Review Findings Status

The 89-REVIEW.md filed four findings. Status at time of this verification:

| Finding | Severity | Status | Evidence |
|---------|----------|--------|---------|
| CR-01: "static device group" in `00-ade-lifecycle.md:250` | Critical | PRE-EXISTING / OUT OF SCOPE | Introduced by Phase 75 commit c50a650. Phase 89 only added line 396 to guide 00. Confirmed via `git show c50a650`. New walkthrough correctly uses "static user group" throughout. |
| WR-01: Mermaid diagram branch point (Stage 6 vs Stage 5) | Warning | OPEN — not a PLAN must-have | The diagram branches after Stage 6 but the text says A2 PSSO registers during Stage 5. The Stage Summary Table and prose are correct. This is a diagram accuracy issue; not a PLAN acceptance criterion and does not prevent goal achievement. |
| WR-02: Guide-07 ADE-during-SA links missing anchors | Warning | RESOLVED by commit `ab0f8b3` | Both occurrences at lines 394 and 408 now carry `#advanced--optional-ade-during-setup-assistant`. |
| IN-01: Stage-referencing cross-links to guide-00 omit anchors | Info | OPEN — minor UX issue | Six intra-document links reference specific stages in guide 00 by text but lack anchors. Links resolve to valid files; no broken link. Not a PLAN must-have criterion. |

WR-01 and IN-01 are open code-review findings but do not constitute PLAN must-have failures. They are quality improvements for a future patch.

---

### Human Verification Required

None. All acceptance criteria for this documentation phase are verifiable programmatically via grep and git inspection.

---

## Gaps Summary

No gaps. All 14 must-have truths verified. All four PROV requirements satisfied. All three reciprocal See Also links present and in the correct house style. No nav-hub files touched. No partial `app-sso` output strings. No debt markers. Phase goal achieved.

---

## Pre-Existing Defect Note (Cross-Reference)

A factual error in `docs/macos-lifecycle/00-ade-lifecycle.md` at line 250 ("static **device** group" should be "static **user** group") was introduced in Phase 75 (milestone v1.9, commit c50a650) and surfaced during Phase 89 code review (CR-01). It is OUT OF SCOPE for Phase 89 verification because guide 00 was frozen for v1.11 and Phase 89 only added one See Also bullet (line 396) to that file — confirmed by `git show 4959b42`. The Phase 89 deliverable (`01-psso-provisioning-walkthrough.md`) correctly uses "static user groups" throughout. A follow-up patch (Phase 90 or a standalone fix) should correct line 250 in guide 00.

---

_Verified: 2026-06-24_
_Verifier: Claude (gsd-verifier)_
