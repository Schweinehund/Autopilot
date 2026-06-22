---
phase: 75-glossary-lifecycle-foundation-stub-correction
plan: "03"
subsystem: docs/macos-lifecycle
tags: [lifecycle, platform-sso, secure-enclave, append-only, ssoref-03]
dependency_graph:
  requires: []
  provides: [SSOREF-03-partial]
  affects: [docs/macos-lifecycle/00-ade-lifecycle.md]
tech_stack:
  added: []
  patterns: [append-only-bullet, watch-out-for-format, four-subsections-invariant]
key_files:
  created: []
  modified:
    - docs/macos-lifecycle/00-ade-lifecycle.md
decisions:
  - "D-07 honored: bullets appended inside existing ### Watch Out For subsections; no new ### heading; no --- separator displaced"
  - "Stage 6 wording explicitly includes 'skipped in userless enrollment' per locked decision D-07"
  - "Stage 4 bullet scoped to ADE enrollment-time registration (advanced path only); notes standard PSSO uses Stage 7 notification"
  - "app-sso platform -s referenced for Stage 6 verification; security find-certificate false-negative caveat included per RESEARCH"
  - "No date bump to 00-ade-lifecycle.md front matter (file is a structural/timing note, not a materially new fact-bearing doc section per RESEARCH discretion)"
metrics:
  duration: "6 minutes"
  completed: "2026-06-20"
  tasks_completed: 1
  tasks_total: 1
  files_modified: 1
---

# Phase 75 Plan 03: ADE Lifecycle SSO-Timing Notes (SSOREF-03) Summary

Append-only Platform SSO timing bullets added to `### Watch Out For` at Stages 4, 6, and 7 of `docs/macos-lifecycle/00-ade-lifecycle.md`, satisfying the partial delivery of SSOREF-03 (Stage 4/6/7 lifecycle timing notes; the `00-overview.md` Mermaid + bullet-list portion deferred to Phase 76).

## What Was Built

Three new bullets — one per stage — appended to the END of the existing `### Watch Out For` bullet list at Stages 4, 6, and 7. No new `### ` heading was introduced, no `---` stage-separator was displaced, and the file's line-23 "four subsections per stage" invariant is preserved.

**Stage 4 bullet (line 250):** Flags that when Platform SSO is configured for ADE enrollment-time registration (advanced path, macOS 26+, `EnableRegistrationDuringSetup`), the SSO extension Settings Catalog profile must be assigned and delivered before the Entra credential screen appears in Setup Assistant; if Company Portal is not yet installed, the user sees "Unable to sign in" and can tap "Try Again". Notes that standard post-enrollment Platform SSO registration is triggered later by a "Registration required" notification at the desktop (Stage 7) — no Stage 4 timing constraint for that path.

**Stage 6 bullet (line 329):** States that when Company Portal sign-in occurs (skipped in userless enrollment), Platform SSO device registration completes here: the WPJ key is written to the Secure Enclave and the device registers with Entra ID for Conditional Access compliance. Notes that userless devices never complete this registration and cannot participate in user-based CA policies. References `app-sso platform -s` for verification and explicitly warns that `security find-certificate` returns false negatives for Secure Enclave-stored keys (changed default from August 2025).

**Stage 7 bullet (line 374):** Explains that the macOS Platform SSO PRT renews automatically every 4 hours, but any password reset that bypasses the interactive macOS password-change UI (MDM-forced or FileVault recovery key reset) destroys the Secure Enclave-stored PSSO key unrecoverably; the user receives a new "Registration required" notification and must re-register. Advises warning users and helpdesk staff that MDM password reset actions require a follow-up PSSO re-registration.

## Tasks

| # | Name | Commit | Files |
|---|------|--------|-------|
| 1 | Append SSO-timing bullets to Stage 4, 6, and 7 Watch Out For | c50a650 | docs/macos-lifecycle/00-ade-lifecycle.md |

## Verification Results

All automated assertions from the plan passed:

```
grep -qF 'skipped in userless enrollment'  -> PASS (Stage 6 bullet, line 329)
grep -qF 'app-sso platform -s'             -> PASS (Stage 6 bullet, line 329)
grep -qF 'Registration required'           -> PASS (Stage 4 bullet line 250 + Stage 7 bullet line 374)
### Watch Out For count == 7               -> PASS (unchanged)
### total H3 count == 29                   -> PASS (unchanged; no new heading introduced)
```

No fenced code blocks introduced by the new bullets (only inline backticks used). Each new bullet is in `- **Bold label.** Explanation.` format and sits before the stage-ending `---` separator.

## Acceptance Criteria Status

- [x] Stage 4 Watch Out For bullet references `EnableRegistrationDuringSetup` and Setup Assistant timing before first sign-in
- [x] Stage 6 Watch Out For bullet contains literal phrase `skipped in userless enrollment` and references Secure Enclave / WPJ registration and `app-sso platform -s`
- [x] Stage 7 Watch Out For bullet references 4-hour PRT renewal and Secure Enclave key destruction on password reset plus "Registration required" re-registration
- [x] `### Watch Out For` heading count = 7 (unchanged)
- [x] Total `### ` heading count = 29 (unchanged; four-subsections-per-stage invariant preserved)
- [x] No fenced code block introduced by the three new bullets
- [x] Each new bullet in `- **Bold label.** Explanation.` format before stage-ending `---` separator

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None. The three bullets are complete, factually grounded entries. The `00-overview.md` Mermaid/bullet-list portion of SSOREF-03 is a planned carry-forward to Phase 76 (documented in plan frontmatter), not a stub in this file.

## Carry-Forward to Phase 76

Per plan frontmatter `carry_forward`:
- Add `00-overview.md` Mermaid lifecycle nodes AND bullet-list entries for guides 07/08/09 (Platform SSO setup/troubleshooting/reference) to close the remaining half of SSOREF-03. Phase 75 delivers only the `00-ade-lifecycle.md` Stage 4/6/7 Watch Out For notes; the `00-overview.md` portion is logically impossible until guides 07/08/09 exist (Phases 76-78) and is owned by ROADMAP Phase 76 SC5.

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced. This plan appended bullets to a static lifecycle-narrative markdown document only. T-75-06 (structural invariant tampering) is mitigated — verified by count assertions.

## Self-Check: PASSED

- [x] `docs/macos-lifecycle/00-ade-lifecycle.md` exists and contains all three new bullets
- [x] Commit c50a650 exists in git log
- [x] All automated verify assertions pass (PASS output confirmed above)
