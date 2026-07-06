---
phase: 117-admin-setup-guide-retrofit-all-platforms
plan: 06
subsystem: docs
tags: [eee-retrofit, c17-harness, macos, admin-setup, blockquote-transform]

# Dependency graph
requires:
  - phase: 117-admin-setup-guide-retrofit-all-platforms (plan 01)
    provides: scripts/pipeline/retrofit-guide.mjs (forked helper, whole-pre-H1-span relocation fix)
  - phase: 117-admin-setup-guide-retrofit-all-platforms (plan 05)
    provides: precedent for automated greedy sentence-boundary #12 splitting across a heavy multi-file batch
provides:
  - EEE-conformant macOS core admin-setup guides RE-117..RE-122 (01-abm-configuration through 06-config-failures)
  - Confirmed real-file proof that the whole-pre-H1-span relocation fix preserves both blockquotes on macos/01-abm-configuration (658=658 byte equality)
  - Word-preserving #12 blockquote-split methodology extended with an em-dash/comma-marker-aware sentence regex
affects: [117-07 (macos SSO 07-11 batch), 119 (frozen-surface re-baseline, full-corpus C17 gate)]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Marker-aware sentence-split regex: split on [.!?] optionally followed by **/*/` then whitespace+[A-Z(\\[, avoiding false splits on version numbers/abbreviations with no trailing space"
    - "Transform B (de-blockquote) reserved for multi-paragraph callouts with embedded bullet lists (02-enrollment-profile's 1458c local-password-prompt callout)"
    - "Marker-stripped word-set diff (sed 's/^>[[:space:]]*//' | tr -s whitespace | sort) as the per-file zero-word-loss proof, replacing raw tokenization which falsely flags added '>' tokens from extra blockquote splits"

key-files:
  created: []
  modified:
    - docs/admin-setup-macos/01-abm-configuration.md
    - docs/admin-setup-macos/02-enrollment-profile.md
    - docs/admin-setup-macos/03-configuration-profiles.md
    - docs/admin-setup-macos/04-app-deployment.md
    - docs/admin-setup-macos/05-compliance-policy.md
    - docs/admin-setup-macos/06-config-failures.md
    - docs/_registry/RE-index.md

key-decisions:
  - "Confirmed dry-run span-byte-length equality (658=658) for 01-abm-configuration before writing -- validates the 117-01 whole-pre-H1-span fix against the Pitfall-1 2-blockquote case (Platform gate + Rebrand notice) a second time in this phase"
  - "Added a one-line prose summary under 02-enrollment-profile's 29-row Setup Assistant Screens table to satisfy C17 assertion #11 (in-scope Rule 1 fix, not in the original plan text but required for the stated C17-exit-0 done criterion)"
  - "Applied Transform B (de-blockquote) to 02-enrollment-profile's 1458c group -- a multi-paragraph callout with an embedded 2-item bullet list -- per the plan's explicit designation of this group as the Transform-B target"
  - "Extended the sentence-split regex to recognize closing ** / * / ` markers before whitespace (e.g. 'resolves to.** With') -- the naive [.!?]\\s+ regex under-split several sentences ending in bold/code markers, requiring the fix before automated packing could converge under 200 chars"
  - "For automated-split leftovers still >200 chars (single unsplittable long sentences), used manual em-dash or natural-clause splits with zero added/removed words -- never inserted new punctuation (reverted one comma addition during word-diff verification)"

patterns-established:
  - "Zero-word-loss verification protocol for #12 fixes: strip leading '> ' blockquote markers from both before/after snapshots, tokenize on whitespace, sort, diff -- catches real content loss while ignoring blockquote-marker-count artifacts from adding more groups"

requirements-completed: [RETRO-02]

# Metrics
duration: ~35min
completed: 2026-07-05
---

# Phase 117 Plan 06: macOS Core Admin-Setup Guide Retrofit (RE-117..RE-122) Summary

**Retrofitted the 6 macOS core admin-setup guides to the EEE standard, fixing 58 over-limit blockquote groups (57 via word-preserving sentence-split, 1 via de-blockquote) with zero content loss, and flipped RE-117..RE-122 to Approved while C17 exits 0 across all 124 enrolled corpus files.**

## Performance

- **Duration:** ~35 min
- **Started:** 2026-07-05 (session start)
- **Completed:** 2026-07-05T23:09:55-05:00
- **Tasks:** 3
- **Files modified:** 7 (6 guide files + RE-index.md)

## Accomplishments
- Ran `retrofit-guide.mjs` on all 6 macOS core files, injecting `doc_id`/`status`/`owner`/`doc_type` frontmatter, the EEE block line, and a new Version History section; confirmed the whole-pre-H1-span relocation fix preserves both blockquotes (Platform gate + Rebrand notice) on `01-abm-configuration.md` via dry-run byte-length equality (658=658)
- Hand-authored all 6 macOS-template-led `## Summary` sections (enrollment method/feature + ABM/Intune admin roles + macOS version prerequisite), each ≥30 words and the first H2
- Fixed all 58 over-limit blockquote groups across the 6 files using word-preserving Transform A (sentence-boundary split) for 57 groups and Transform B (de-blockquote) for the 1 designated multi-paragraph/bullet-list group; verified zero word loss per file via marker-stripped word-set diff
- Fixed a C17 assertion #11 violation (29-row table with no prose summary) discovered during measurement, in scope for the plan's "C17 exits 0" done criterion
- `node scripts/validation/c17-eee-contract.mjs` now exits 0 across all 124 enrolled `docs/` files (zero violations, up from 59 violations across these 6 files at start)
- Flipped `RE-index.md` Status `Pending` → `Approved` for RE-117..RE-122; RE-116 (`macos/00-overview.md`, mermaid-deferred) remains `Pending`

## Task Commits

Each task was committed atomically:

1. **Task 1: Mechanical transform via retrofit-guide.mjs (incl. 01-abm-configuration 2-blockquote case)** - `ada8a82` (feat)
2. **Task 2: Hand-author the Summary prose (macOS-template lead, ≥30 words)** - `0ffb20a` (feat)
3. **Task 3: #12 blockquote compliance, C17 exit 0, registry Approved** - `b5ce359` (fix)

_No plan-metadata commit yet -- see final_commit step below._

## Files Created/Modified
- `docs/admin-setup-macos/01-abm-configuration.md` - RE-117; both Platform-gate and Rebrand-notice blockquotes relocated intact; 11 #12 groups split
- `docs/admin-setup-macos/02-enrollment-profile.md` - RE-118; 13 #12 groups (12 split, 1 de-blockquoted -- the 1458c local-password-prompt callout); added #11 table prose summary
- `docs/admin-setup-macos/03-configuration-profiles.md` - RE-119; 16 #12 groups split
- `docs/admin-setup-macos/04-app-deployment.md` - RE-120; 9 #12 groups split
- `docs/admin-setup-macos/05-compliance-policy.md` - RE-121; 8 #12 groups split
- `docs/admin-setup-macos/06-config-failures.md` - RE-122; 1 #12 group split
- `docs/_registry/RE-index.md` - RE-117..RE-122 Status flipped Pending → Approved; RE-116 left Pending

## Decisions Made
See `key-decisions` in frontmatter. Summary: whole-pre-H1-span byte-equality re-confirmed on the corpus's other 2-blockquote real file; #11 table-summary gap closed in-scope; Transform B reserved for the one bullet-list-bearing callout per plan; sentence-split regex extended for bold/code-marker-terminated sentences; zero-word-loss proven per file via marker-stripped diff (one accidental added comma caught and reverted during verification).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug/blocking] Added prose summary to satisfy C17 assertion #11 on 02-enrollment-profile.md**
- **Found during:** Task 3 (C17 measurement pass)
- **Issue:** The 29-row Setup Assistant Screens table had no prose summary within 5 lines after it, tripping C17 assertion #11 (a violation not enumerated in the plan's #12-only table but required for the plan's stated "C17 exits 0" done criterion)
- **Fix:** Added a one-line prose summary ("This table lists all 29 Setup Assistant screens with their minimum macOS version, the recommended visibility setting, and applicable notes.") immediately after the table
- **Files modified:** docs/admin-setup-macos/02-enrollment-profile.md
- **Verification:** C17 assertion #11 no longer fires for this file; `node scripts/validation/c17-eee-contract.mjs` exits 0
- **Committed in:** b5ce359 (Task 3 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking -- C17 gate requirement)
**Impact on plan:** Necessary to meet the plan's own "C17 exits 0" success criterion; no scope creep beyond the stated done condition.

## Issues Encountered
- The naive sentence-split regex (`[.!?]\s+` followed by an uppercase letter) under-split several sentences that end in `**`/`*`/`` ` `` before the following space (e.g. `"...resolves to.** With..."`), leaving multiple subgroups still over 200 chars after the first automated pass. Extended the regex to optionally consume a trailing `**`/`*`/`` ` `` marker before the whitespace lookahead, which resolved most remaining cases; the small number of genuinely unsplittable single-sentence groups (em-dash-joined independent clauses) were split manually at the em-dash with zero words added or removed.
- One manual split initially added a comma at a clause boundary that had none in the original ("...setting," / "so the break-glass admin..."); caught during the marker-stripped word-set diff verification step and reverted to preserve the source text exactly.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- RE-117..RE-122 are EEE-conformant, C17-green, and Approved; macos/00-overview.md (RE-116) correctly remains keyless/Pending (mermaid-deferred, D-05)
- Ready for 117-07 (macOS SSO files 07-11), which carries the corpus's heaviest single-group #12 violations (up to 1892 chars) -- the marker-aware sentence-split regex and Transform-B de-blockquote pattern established here directly apply
- No blockers

---
*Phase: 117-admin-setup-guide-retrofit-all-platforms*
*Completed: 2026-07-05*

## Self-Check: PASSED

All 7 modified files confirmed present on disk; all 3 task commit hashes (ada8a82, 0ffb20a, b5ce359) confirmed in git log.
