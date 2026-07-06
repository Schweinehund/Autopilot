---
phase: 117-admin-setup-guide-retrofit-all-platforms
plan: 05
subsystem: docs
tags: [eee-standard, c17-harness, markdown-retrofit, ios, ipados, node-builtins]

# Dependency graph
requires:
  - phase: 117-01
    provides: retrofit-guide.mjs forked helper with whole-pre-H1-span relocation fix
  - phase: 117-04
    provides: Android AOSP-OEM retrofit precedent confirming the whole-pre-H1-span fix
provides:
  - All 9 iOS/iPadOS admin-setup guides (RE-107..RE-115) EEE-conformant and C17-green
  - Confirmed real-world validation of the 117-01 whole-pre-H1-span relocation fix
    against the corpus's canonical 2-blockquote case (ios/02-abm-token.md's Platform
    gate + Rebrand notice)
affects: [117-06, 117-07, 117-08, 118, 119]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Whole-pre-H1-span relocation (117-01 fix) validated on the canonical 2-blockquote real-file case"
    - "Transform A (sentence/clause-boundary split with truly blank line) applied to all 86 over-limit blockquote groups"
    - "Automated packing helper (greedy sentence-boundary split + pack-to-200) used for the bulk of file 04's 30 groups, with manual clause-level splits for stragglers over 200 after auto-pack"

key-files:
  created: []
  modified:
    - docs/admin-setup-ios/01-apns-certificate.md
    - docs/admin-setup-ios/02-abm-token.md
    - docs/admin-setup-ios/03-ade-enrollment-profile.md
    - docs/admin-setup-ios/04-configuration-profiles.md
    - docs/admin-setup-ios/05-app-deployment.md
    - docs/admin-setup-ios/06-compliance-policy.md
    - docs/admin-setup-ios/07-device-enrollment.md
    - docs/admin-setup-ios/08-user-enrollment.md
    - docs/admin-setup-ios/09-mam-app-protection.md
    - docs/_registry/RE-index.md

key-decisions:
  - "Confirmed dry-run span-byte-length equality (orig=804, reloc=804) for 02-abm-token before writing -- proves both the Platform-gate blockquote and the Rebrand-notice blockquote survived relocation after ## Summary, byte-for-byte"
  - "Used an automated greedy sentence-boundary packing script for the bulk of the 86 #12 splits (safe because it only inserts blank lines between existing sentence boundaries, never alters wording), then manually clause-split the ~15 stragglers the automation could not pack under 200 chars alone"
  - "Word-set diff (pre-Task-2 baseline vs. post-#12-fix) run for all 9 files -- every file shows zero real-word deltas; the only observed diff is the count of '>' blockquote-marker tokens, which increases (or in one case decreases, file 07, where the auto-packer merged four originally-separate blockquote lines into three fitting groups) as an expected side effect of Transform A"

requirements-completed: [RETRO-02]

# Metrics
duration: 60min
completed: 2026-07-06
---

# Phase 117 Plan 05: iOS/iPadOS Admin Guide Retrofit (RE-107..RE-115) Summary

**Retrofitted all 9 iOS/iPadOS admin-setup guides to EEE, confirmed the 117-01 whole-pre-H1-span relocation fix against the corpus's canonical 2-blockquote case (02-abm-token's Platform gate + Rebrand notice), and cleared all 86 over-limit #12 blockquote groups -- the largest single #12 batch in Phase 117 -- via word-preserving Transform A splits.**

## Performance

- **Duration:** ~60 min
- **Tasks:** 3 completed
- **Files modified:** 10 (9 guide files + RE-index.md)

## Accomplishments

- All 9 iOS guides (RE-107..RE-115) carry the EEE header block (`**Platform:** iOS · **Doc Type:** Guide · **Doc ID:** RE-NNN · **Status:** Approved`), a hand-authored ≥30-word iOS-template-led Summary as the first H2 (enrollment method/feature + ABM/Intune admin roles + supervised-device prerequisite per admin-template-ios.md:42), and a `## Version History` reformat row dated 2026-07-06
- Confirmed via dry-run span-byte-length equality (804 = 804 bytes) that `ios/02-abm-token.md`'s two pre-H1 blockquotes (Platform gate, 4 lines + Rebrand notice, 4 lines) both survived relocation after `## Summary` intact -- the Rebrand notice callout is still present (`grep -c "Rebrand notice"` == 1) after both Task 1's mechanical relocation and Task 3's #12 splitting
- All 86 over-limit blockquote groups resolved (01=5, 02=4, 03=11, 04=30, 05=11, 06=10, 07=1, 08=9, 09=5 -- matching RESEARCH.md's per-file table exactly), including the corpus's heaviest single file by group count (`04-configuration-profiles.md`, 30 groups spanning a long run of per-restriction 🔒 supervised-only callouts)
- Word-set diffs against the Task-2 commit baseline for all 9 files confirm zero real-word content changes -- only the count of `>` blockquote-marker tokens differs, which is the expected structural side effect of splitting/repacking paragraphs into more (or, in one case, fewer but differently-grouped) blockquote lines
- `node scripts/validation/c17-eee-contract.mjs` exits 0 with 0 violations across the full 118-file enrolled corpus
- `docs/_registry/RE-index.md` RE-107..RE-115 flipped Pending → Approved; RE-106 (mermaid-deferred `ios/00-overview.md`) correctly remains Pending and untouched

## Task Commits

Each task was committed atomically:

1. **Task 1: Mechanical transform of RE-107..RE-115 via the helper (incl. 02-abm-token 2-blockquote case)** - `845846a` (feat)
2. **Task 2: Hand-author the ## Summary prose (iOS-template lead, ≥30 words)** - `5d62035` (docs)
3. **Task 3: #12 blockquote compliance, C17 exit 0, registry Approved** - `4903d17` (fix)

_Note: metadata commit for this SUMMARY + STATE/ROADMAP updates follows this list._

## Files Created/Modified

- `docs/admin-setup-ios/01-apns-certificate.md` - RE-107, EEE-retrofitted, Summary authored, #12 clean (5 groups resolved)
- `docs/admin-setup-ios/02-abm-token.md` - RE-108, EEE-retrofitted, Summary authored, #12 clean (4 groups resolved), both pre-H1 blockquotes (Platform gate + Rebrand notice) confirmed intact
- `docs/admin-setup-ios/03-ade-enrollment-profile.md` - RE-109, EEE-retrofitted, Summary authored, #12 clean (11 groups resolved)
- `docs/admin-setup-ios/04-configuration-profiles.md` - RE-110, EEE-retrofitted, Summary authored, #12 clean (30 groups resolved -- heaviest file in the corpus)
- `docs/admin-setup-ios/05-app-deployment.md` - RE-111, EEE-retrofitted, Summary authored, #12 clean (11 groups resolved)
- `docs/admin-setup-ios/06-compliance-policy.md` - RE-112, EEE-retrofitted, Summary authored, #12 clean (10 groups resolved)
- `docs/admin-setup-ios/07-device-enrollment.md` - RE-113, EEE-retrofitted, Summary authored, #12 clean (1 group resolved)
- `docs/admin-setup-ios/08-user-enrollment.md` - RE-114, EEE-retrofitted, Summary authored, #12 clean (9 groups resolved)
- `docs/admin-setup-ios/09-mam-app-protection.md` - RE-115, EEE-retrofitted, Summary authored, #12 clean (5 groups resolved)
- `docs/_registry/RE-index.md` - RE-107..RE-115 Status: Pending -> Approved (RE-106 stays Pending)

## Decisions Made

- Verified dry-run span-byte-length equality for all 9 files before writing (all showed orig==reloc, including 02-abm-token's 804=804 nine-line 2-blockquote span), confirming the 117-01 whole-pre-H1-span fix generalizes correctly to the corpus's canonical multi-blockquote shape -- this is the confirmed real-world case the fix was originally designed against (per 117-PATTERNS.md Pattern 1).
- For the bulk #12 remediation (86 groups across 9 files, dominated by file 04's 30 small per-restriction callouts), used an automated greedy sentence-boundary packing script rather than fully manual per-group editing. The automation only ever inserts blank lines between existing sentence/clause boundaries -- it never rewords, reorders, or drops content -- making it safe under the reformat-only envelope. ~15 groups the automation could not pack under 200 chars on the first pass were then manually clause-split (at em-dash, colon, or comma boundaries) and re-verified.
- Ran a full word-set diff (Task-2 commit baseline vs. post-#12-fix) for all 9 files to independently verify the "no words added/removed" #12 constraint. All 9 files show zero real-word deltas; the only diff category is `>` blockquote-marker token counts, which is expected and correct (Transform A splits/repacks paragraph structure, not content).

## Deviations from Plan

None — plan executed exactly as written. The automated sentence-packing approach for #12 remediation is a within-scope implementation choice (Transform A, per 117-PATTERNS.md), not a deviation from the plan's required transform vocabulary.

## Issues Encountered

None. The one file (`07-device-enrollment.md`) whose blockquote-marker (`>`) count decreased rather than increased after the #12 fix is expected and correct: the automated packer merged four originally-separate one-sentence-per-line blockquote lines into three groups that fit under 200 chars together, rather than needing further splitting. Word-set diff confirms no content was lost in this merge.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- RE-107..RE-115 (iOS/iPadOS admin-setup guides) are EEE-conformant, C17-green, and Approved in the registry.
- The whole-pre-H1-span relocation fix (117-01) has now been validated against its originally-targeted real-world case (ios/02-abm-token's 2-blockquote span) in addition to the pre-H1-HTML-comment case validated in 117-04. No remaining unvalidated shapes for this fix in the iOS batch.
- No blockers for the remaining Phase 117 plans (macOS, Linux, 802.1X batches) or Phase 118/119.

---
*Phase: 117-admin-setup-guide-retrofit-all-platforms*
*Completed: 2026-07-06*

## Self-Check: PASSED

All 3 task commits (845846a, 5d62035, 4903d17) verified present in git log. All 10 modified files
(9 guide files + RE-index.md) and this SUMMARY.md verified present on disk. C17 exits 0 with 0
violations across all 118 enrolled corpus files.
