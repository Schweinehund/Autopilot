---
phase: 75-glossary-lifecycle-foundation-stub-correction
plan: 02
subsystem: docs
tags: [platform-sso, macos, extensible-sso, configuration-profiles, stub-correction]

# Dependency graph
requires:
  - phase: 75-01
    provides: Glossary vocabulary (Platform SSO, Secure Enclave, Enterprise SSO Plug-in) that the corrected stub section can reference
provides:
  - "Corrected ## Extensible SSO section in docs/admin-setup-macos/03-configuration-profiles.md with DS-5 factual errors fixed and deferred inline-code pointer to guide 07"
affects:
  - phase76
  - phase82

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Deferred-link inline-code pattern (D-06): filename in backtick code span instead of markdown link when target file does not exist yet, to keep C13 BLOCKING gate green"

key-files:
  created: []
  modified:
    - docs/admin-setup-macos/03-configuration-profiles.md

key-decisions:
  - "D-06 enforced: closing pointer to 07-platform-sso-setup.md written as inline code span, NOT a markdown link, to preserve the C13 15-entry allowlist integrity until Phase 76 creates the target file"
  - "DS-5 macOS-version correction applied to BOTH instances (intro sentence AND Platform SSO bullet) — neither left stale"
  - "Platform SSO bullet rewritten to describe three mutually-exclusive auth methods without the blanket password-binding claim; two bullets (SSO app extension + Platform SSO) kept distinct, not merged"
  - "#### In Intune admin center heading count preserved at 9 (anchor stability, PITFALL-4)"

patterns-established:
  - "Deferred-link pattern: use inline code span for not-yet-existent guide targets to avoid C13 gate failures; convert to live link atomically in the commit that creates the target file (Phase 76)"

requirements-completed: [PSSO-04]

# Metrics
duration: 8min
completed: 2026-06-20
---

# Phase 75 Plan 02: Extensible SSO Stub Correction Summary

**Three DS-5 factual errors corrected in the `## Extensible SSO` section of `03-configuration-profiles.md`: macOS version floor fixed (14+ -> 13+/14 recommended), Platform SSO auth methods disambiguated (three mutually-exclusive methods, no blanket password-binding claim), and external Microsoft fallback replaced with deferred inline-code pointer to `07-platform-sso-setup.md`.**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-06-20T00:00:00Z
- **Completed:** 2026-06-20
- **Tasks:** 1 of 1
- **Files modified:** 1

## Accomplishments

- Fixed DS-5 error #2 (macOS version floor) in BOTH the intro sentence (~line 163) AND the Platform SSO bullet (~line 166) — no stale instance left
- Fixed DS-5 error #1 (blanket "binds login password" claim): Platform SSO bullet now correctly describes all three mutually exclusive auth methods (Secure Enclave key/Platform Credential recommended, Password sync, Smart Card) with accurate version requirements
- Fixed DS-5 error #3 (three-method conflation): methods are no longer presented as a single passwordless behavior
- Replaced external "See official Microsoft documentation" fallback sentence with D-06 inline-code pointer: `Continue with Platform SSO setup in `07-platform-sso-setup.md` (added in the next documentation phase).`
- SSO app extension bullet preserved intact (no version clause to fix); two distinct bullets maintained (not merged)
- `#### In Intune admin center` heading count verified at 9 before and after edit (anchor stability preserved)
- All six automated verify assertions pass (full combined grep command returns PASS)

## Task Commits

1. **Task 1: Fix three DS-5 errors in ## Extensible SSO and replace external fallback with deferred inline-code pointer** - `af4f567` (fix)

**Plan metadata:** (to be committed with this SUMMARY)

## Files Created/Modified

- `docs/admin-setup-macos/03-configuration-profiles.md` — Lines ~163/166/168 in `## Extensible SSO` section body only: intro sentence version clause corrected, Platform SSO bullet rewritten with three auth methods, external fallback replaced with inline-code pointer to guide 07

## Decisions Made

D-06 (locked): deferred-link mechanism enforced. The closing pointer to `07-platform-sso-setup.md` is a plain-text sentence with the filename wrapped in backticks — NOT a markdown link. This keeps the C13 BLOCKING gate green because:
- The audit harness (`scripts/validation/v1.8-milestone-audit.mjs` lines 670-676) validates markdown link targets against a hard-coded 15-entry allowlist (`allowlist.length !== 15` assertion)
- Guide 07 does not exist until Phase 76
- A live markdown link would add a 16th entry (broken internal link with no valid allowlist category) and fail the BLOCKING gate
- Code spans are not validated by C13

## Deviations from Plan

None — plan executed exactly as written. All three DS-5 fixes applied as specified in the exact diff mandate (75-PATTERNS.md lines 330-372). All must_have truths and acceptance criteria satisfied.

## Issues Encountered

None.

## User Setup Required

None — documentation-only edit, no external service configuration required.

## Next Phase Readiness

Phase 76 (Platform SSO Admin Setup Guide — `07-platform-sso-setup.md`) can proceed. Phase 76 MUST:

---

> **CRITICAL CARRY-FORWARD TO PHASE 76 (D-06 MANDATORY TASK)**
>
> `docs/admin-setup-macos/03-configuration-profiles.md` §Extensible SSO currently closes with:
>
> ```
> Continue with Platform SSO setup in `07-platform-sso-setup.md` (added in the next documentation phase).
> ```
>
> This inline-code span MUST be converted to a live markdown link `[Platform SSO setup](07-platform-sso-setup.md)` **in the same commit that creates `07-platform-sso-setup.md`**. The link and its target must land atomically so the C13 BLOCKING link-audit gate never sees a broken link between commits. This is recorded in the `carry_forward` frontmatter of 75-02-PLAN.md.

---

- Phase 75-03 (ADE lifecycle SSO timing notes) can proceed independently — it targets a different file (`00-ade-lifecycle.md`)

## Known Stubs

None — the inline-code pointer to `07-platform-sso-setup.md` is intentional and tracked in Phase 76 carry-forward per D-06. It is not a stub in the rendering sense; no UI or data flow is affected.

## Self-Check

- [x] `docs/admin-setup-macos/03-configuration-profiles.md` modified and committed at `af4f567`
- [x] No `(macOS 14+)` string remains in the file
- [x] No `See official Microsoft documentation` string remains
- [x] `` `07-platform-sso-setup.md` `` inline code span present
- [x] No markdown link syntax targeting guide 07 (`\]\([^)]*07-platform-sso-setup\.md` matches nothing)
- [x] `#### In Intune admin center` heading count = 9 (unchanged)
- [x] `Secure Enclave key` mentioned in Platform SSO bullet
- [x] Full combined verify command returns PASS

## Self-Check: PASSED

---
*Phase: 75-glossary-lifecycle-foundation-stub-correction*
*Completed: 2026-06-20*
