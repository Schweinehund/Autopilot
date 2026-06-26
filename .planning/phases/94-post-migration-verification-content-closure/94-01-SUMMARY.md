---
phase: 94-post-migration-verification-content-closure
plan: 01
subsystem: docs/macos-lifecycle
tags: [documentation, mdm-migration, psso, macos, migv-01, migv-02, migv-03, freshness-stamp]
dependency_graph:
  requires: []
  provides: [MIGV-01-verified, MIGV-02-verified, MIGV-03-refined]
  affects: [docs/macos-lifecycle/02-mdm-migration-psso.md]
tech_stack:
  added: []
  patterns: [section-provenance-block, both-brand-searchability, honest-hedge, MEDIUM-confidence-callout]
key_files:
  created: []
  modified:
    - docs/macos-lifecycle/02-mdm-migration-psso.md
decisions:
  - D-01: MIGV-01 upgraded in-place at Stage 7 + Stage 3 'Behind the Scenes' with Microsoft Learn + TechCommunity blog citations (no sidebar added)
  - D-02: Both support.kandji.io + support.iru.io + docs.iru.com surfaced; flat 'URL unchanged' demoted to verify-which-resolves posture; docs.iru.com UI path confirmed; secret-retrieval pre-flight preserved
  - D-03: MIGV-03 step-4 callout refined in-place at MEDIUM confidence with Apple dep1d89f0bff citation; single profiles status command kept; no profiles list added; no flat assertion
  - D-04: Hybrid stamps applied — Stage 7 provenance block bumped (last_verified 2026-06-26 / review_by 2026-09-24) for in-coverage MIGV-01 + MIGV-03; discrete Stage 2 inline freshness signal added for out-of-coverage MIGV-02
metrics:
  duration: "~25 minutes"
  completed: "2026-06-26"
  tasks_completed: 2
  tasks_total: 2
  files_modified: 1
---

# Phase 94 Plan 01: Post-Migration Verification Content Closure Summary

**One-liner:** Surgical upgrade of three post-migration verification passages in `02-mdm-migration-psso.md` — MIGV-01 promoted to full-confidence Microsoft Learn + TechCommunity citations, MIGV-02 both-URLs surfaced with docs.iru.com delete path confirmed, MIGV-03 MEDIUM supervision callout cited against Apple dep1d89f0bff — with D-04 hybrid freshness stamps.

## Tasks Completed

| Task | Description | Commit | Files Modified |
|------|-------------|--------|----------------|
| 1 | MIGV-01 citation upgrade (Stage 7 + Stage 3 Behind the Scenes) + MIGV-03 supervision callout refinement + D-04 Stage 7 provenance-block stamp bump | d989f02 | docs/macos-lifecycle/02-mdm-migration-psso.md |
| 2 | MIGV-02 Iru/Kandji URL + delete-path verification edits (Stage 2 steps 3/4/5, glossary) + D-04 Stage 2 inline freshness signal | acdbdeb | docs/macos-lifecycle/02-mdm-migration-psso.md |

## What Was Built

### MIGV-01 (D-01): Intune Config Requirement — Full Confidence Upgrade

**Stage 7 "Behind the Scenes" (primary):** Upgraded from an unstamped, uncited assertion to a full-confidence, Microsoft-Learn-cited statement. Added citations to:
- Microsoft Learn: [Set up ADE for macOS](https://learn.microsoft.com/en-us/intune/device-enrollment/apple/setup-automated-macos) (updated 2026-06-22)
- Microsoft Learn: [Manage macOS ADE devices and tokens](https://learn.microsoft.com/en-us/intune/device-enrollment/apple/manage-devices-tokens-macos) (updated 2026-06-22)
- Microsoft TechCommunity blog (Iris Yuning Ye, 2025-08-04): "standard ADE guidance ... enrollment profile assigned by serial number"

**Stage 3 "Behind the Scenes" (lighter form):** Added supporting citation cross-reference pointing to Stage 7 for full citations. Kept prose minimal.

**Authoring-day re-verification:** The RESEARCH.md Gate 1 findings (gathered 2026-06-26) serve as the authoring-day verification of record. Microsoft Learn confirms no separate "profile-based enrollment configuration mode" exists in Intune — the ADE enrollment policy is the single construct. L2 #30 not edited (MIGV-01 answer does not change triage).

### MIGV-02 (D-02): Iru/Kandji URL Verification — Both-URLs + Confirmed Delete Path

**Stage 2 step 3:** Replaced flat "support portal URL unchanged at support.kandji.io" with both-URLs-acknowledged language: `support.kandji.io` (Iru-branded KB, HTTP 200 verified 2026-06-26, displays "Kandji is now Iru"), `support.iru.io` (HTTP 200 resolved but login-gated SPA, no public content), `docs.iru.com` (new authoritative public docs domain, HTTP 200 verified 2026-06-26).

**Stage 2 step 4 note:** Updated to 2026-06-26 verification findings — acknowledged Iru branding at support.kandji.io, docs.iru.com as authoritative, support.iru.io login-gated.

**Stage 2 step 5:** Upgraded from hedge-only conceptual steps to confirmed UI path from docs.iru.com: Devices > Device > Device Action Menu > Delete Device Record > type "DELETE" in text field > confirm. Added permanently-destroyed-secrets note (Device lock PIN code, Recovery password, FileVault Recovery Key, Activation Lock Bypass Code). Added vendor documentation gap note (docs.iru.com/support.kandji.io do not include secret-retrieval pre-flight — guide 02 fills this gap). Added D-04 discrete inline freshness signal recording 2026-06-26 verification attempt. Preserved secret-retrieval pre-flight ordering (steps 3/4 before step 5).

**Glossary Kandji/Iru row:** Replaced "support portal remains at support.kandji.io" with both-URLs + docs.iru.com language consistent with step 3.

**B2 Stage 3:** Consistency-check only — no standalone URL assertion found; cross-references Stage 2 for all detail. No substantive edit (per RESEARCH.md Assumption A3).

**Pitfall 3 respected:** No support.iru.io console navigation path asserted as login-verified. All support.iru.io references accompanied by login-gated/SPA hedging.

### MIGV-03 (D-03): Supervision Status — MEDIUM Callout Refined with Apple Citation

**Stage 7 step 4:** Refined in-place at MEDIUM confidence. Added explicit Apple supervision rule citation: `support.apple.com/en-gw/guide/deployment/dep1d89f0bff/web` — "Mac computers are also supervised if they: Have macOS 11 or later and enroll ... profile-based Device Enrollment." Tightened wording: "supervision should be re-granted through the B1 in-place migration" (not "preserved"). Kept the inference-gap acknowledgment — Apple's source confirms supervision rules (profile-based enrollment = supervised on macOS 11+), not that supervision survives the momentary unenrollment transition. Kept MEDIUM confidence label throughout. Kept single `profiles status -type enrollment | grep Supervised` pilot command in note, unchanged.

**What was NOT done (locked constraints):**
- No flat "supervision is preserved" assertion
- No `profiles list` before/after baseline added
- No claim about PSSO Secure Enclave key survival (Stage 9 language at line 392 untouched)
- MEDIUM not upgraded to HIGH

### D-04 (Hybrid Freshness Stamps)

**Stage 7 section-provenance block (in-coverage):** Bumped `last_verified: 2026-06-24` → `last_verified: 2026-06-26`; `review_by: 2026-09-24` preserved (existing +90d convention). Extended prose to document in-scope MIGV-01 + MIGV-03 edits and add extended re-verify instructions.

**Stage 2 inline freshness signal (out-of-coverage):** Added discrete date-of-attempt note in step 5 recording 2026-06-26 verification attempt, what was confirmed publicly accessible (docs.iru.com, support.kandji.io), and what remained login-gated (support.iru.io). Lighter form per D-04 planner's call.

## Verification Results

All phase-level checks passed:

| Check | Expected | Result |
|-------|----------|--------|
| `learn.microsoft.com` in file | >= 1 | 1 |
| `review_by: 2026-09-24` in file | >= 1 | 2 (frontmatter + provenance block) |
| `support.iru.io` in file | >= 1 | 5 |
| `docs.iru.com` in file | >= 1 | 6 |
| `support.kandji.io` in file | >= 1 | 6 |
| "portal URL unchanged at support.kandji.io" | 0 | 0 |
| "support portal remains at support.kandji.io" | 0 | 0 |
| "Kandji" in file | >= 1 | 48 |
| "Iru" in file | >= 1 | 48 |
| MEDIUM confidence count | >= 1 (unchanged or higher) | 5 |
| `dep1d89f0bff` in file | >= 1 | 3 |
| "supervision is preserved" as flat fact | 0 | 0 |
| `profiles list` in file | 0 | 0 |
| BEFORE performing Delete Device Record | >= 1 | 1 |
| DELETE type-to-confirm step | present | present (step 5 line 159) |
| Stage 9 PSSO Secure Enclave language | unchanged | unchanged (line 392) |
| L2 #30 modified | no | not modified |
| Files modified (scope) | 1 (02-mdm-migration-psso.md only) | 1 |

## Deviations from Plan

None — plan executed exactly as written. The RESEARCH.md Gate 1/2/3 findings gathered on 2026-06-26 served as the authoring-day re-verification of record (per phase-specific guidance). All D-01..D-04 decisions faithfully encoded. No scope creep.

## Decisions Made

- D-01: MIGV-01 in-place upgrade at Stage 7 (primary) + Stage 3 (lighter form); no readiness-checklist sidebar; L2 #30 not edited
- D-02: Both-URLs acknowledged (support.kandji.io + support.iru.io + docs.iru.com); docs.iru.com UI path confirmed with type-"DELETE" confirmation step; pre-flight ordering preserved; no fabricated support.iru.io console path
- D-03: MIGV-03 refined at MEDIUM confidence with Apple dep1d89f0bff citation; single profiles status command unchanged; no profiles list; no PSSO key survival claim
- D-04: Hybrid stamps — Stage 7 provenance block bumped (in-coverage MIGV-01 + MIGV-03); Stage 2 discrete inline note (out-of-coverage MIGV-02)

## Known Stubs

None — all three verification passages are now either source-verified at full confidence (MIGV-01) or honestly confidence-labeled with citations (MIGV-02 at MEDIUM-HIGH with docs.iru.com confirmed, MIGV-03 at MEDIUM with Apple dep1d89f0bff cited). No placeholder text or unwired data sources.

## Threat Flags

None — documentation-only phase. No new attack surface introduced. The Stage 2 secret-destruction surface maintained honest-hedge posture per D-02 operator-safety requirement.

## Self-Check: PASSED

- `docs/macos-lifecycle/02-mdm-migration-psso.md`: FOUND (modified in place)
- Commit `d989f02`: FOUND (Task 1)
- Commit `acdbdeb`: FOUND (Task 2)
- No other files modified
- All verification criteria met (see table above)
