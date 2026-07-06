---
phase: 117-admin-setup-guide-retrofit-all-platforms
plan: 07
subsystem: docs
tags: [eee-retrofit, c17, macos, platform-sso, kerberos, graph-api, blockquote-transform]

# Dependency graph
requires:
  - phase: 117-01
    provides: scripts/pipeline/retrofit-guide.mjs (whole-pre-H1-span-fixed helper) + docs/_registry/RE-index.md doc_id assignments
  - phase: 117-06
    provides: prior macOS-batch precedent for Transform A/B #12 split conventions
provides:
  - EEE-conformant macOS Platform SSO guide (RE-123, 07-platform-sso-setup.md) with corpus-worst 1892c blockquote resolved
  - EEE-conformant macOS auth-methods deep-dive guide (RE-124, 08-auth-methods-deep-dive.md)
  - EEE-conformant macOS legacy-SSO migration guide (RE-125, 09-enterprise-sso-plugin-migration.md)
  - EEE-conformant macOS Kerberos SSO extension guide (RE-126, 10-kerberos-sso-extension.md)
  - EEE-conformant Graph API Platform Credential guide (RE-127, 11-graph-api-platform-credential.md)
  - RE-123..RE-127 flipped Pending -> Approved in docs/_registry/RE-index.md
affects: [117-08, 117-09, 117-10, 119-frozen-surface-rebaseline]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Transform A (sentence/clause-boundary split with a truly empty separator line) for single-paragraph prose callouts"
    - "Transform B (de-blockquote to a bold-led paragraph) for multi-paragraph WARNING/DANGER boxes with bullets or an embedded code fence -- converts embedded blockquoted fences into real top-level fences masked by inCodeFence"
    - "Italic-span splits reattach opening/closing underscore markers per new paragraph (word-preserving, punctuation-only diff)"
    - "GitHub [!WARNING] alert marker kept paired with only its first split sentence; continuation sentences render as plain blockquotes (no word loss, alert styling narrows to the lead sentence)"

key-files:
  created: []
  modified:
    - docs/admin-setup-macos/07-platform-sso-setup.md
    - docs/admin-setup-macos/08-auth-methods-deep-dive.md
    - docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md
    - docs/admin-setup-macos/10-kerberos-sso-extension.md
    - docs/admin-setup-macos/11-graph-api-platform-credential.md
    - docs/_registry/RE-index.md

key-decisions:
  - "Transform B applied to 07's corpus-worst 1892c 'Before You Deploy' 3-bullet WARNING box and its 1124c 'Deploy to the device' box; both de-blockquoted to bold-led paragraphs since they are multi-paragraph/bulleted structured callouts, not single-sentence prose"
  - "Transform B applied to 08's FileVault Cold-Boot (892c), SE-Key-Destruction (851c), No-Password-Fallback (816c), Entra-CBA-prerequisite (1043c), and Myth-vs-Fact intro (280c) boxes -- all title+multi-paragraph/bullet structures"
  - "Transform B applied to 09's 1306c 'Before You Migrate' box (contains an embedded ``` app-sso platform -s ``` fence -- de-blockquoting turns it into a real top-level fence masked by inCodeFence) and its 1392c rollback WARNING box (3 bullets)"
  - "Transform B applied to 10's 870c LIMITED-PREVIEW box (2 paragraphs) and 11's 462c 'No Create or Update' box (title+paragraph)"
  - "Transform A used for all remaining single-paragraph callouts (gates, K-1/K-5 identifier warnings, provenance stamps, version gates) -- iteratively re-measured and re-split until every group was <=200 chars, confirmed via a scratch measurement script mirroring C17 assertion #12 logic exactly"
  - "11's [!WARNING] GitHub alert marker kept attached only to the first split sentence; subsequent sentences continue as plain (unmarked) blockquote lines rather than repeating the marker -- preserves every word, narrows the colored-alert visual scope (no established corpus precedent existed for splitting a marked alert, since docs/reference/win32-app-packaging.md's [!WARNING] boxes are not yet C17-enrolled)"
  - "Version-History date filled with the actual commit date (2026-07-06) rather than a placeholder"

patterns-established:
  - "Word-set multiset diff (git show HEAD:<file> vs current, sorted word arrays) as the per-file post-#12-fix proof: the only tolerated diffs are '>' blockquote-marker count changes (from Transform A splits / Transform B removals) and italic-underscore reattachment tokens at split provenance sentences -- any other diff is a real content-loss bug requiring revert"

requirements-completed: [RETRO-02]

# Metrics
duration: 16min
completed: 2026-07-06
---

# Phase 117 Plan 07: macOS Platform SSO Guide Retrofit (RE-123..RE-127) Summary

**Retrofitted the 5 heaviest-#12-violation macOS SSO admin-setup guides to full EEE conformance, resolving all 42 over-limit blockquote groups (including the corpus-worst 1892-char group) via word-preserving Transform A/B splits, with C17 exiting 0 across the entire 129-file enrolled corpus.**

## Performance

- **Duration:** 16 min
- **Started:** 2026-07-05T23:18:43-05:00
- **Completed:** 2026-07-05T23:34:43-05:00
- **Tasks:** 3
- **Files modified:** 6 (5 guides + RE-index.md)

## Accomplishments
- Mechanically retrofitted RE-123..RE-127 via `scripts/pipeline/retrofit-guide.mjs` (dry-run confirmed span-byte-length equality before every write)
- Hand-authored 5 macOS-template-led `## Summary` sections (all >=30 words, all first H2), each naming the SSO feature covered, required ABM/Intune admin roles, and macOS version prerequisite
- Resolved all 42 over-limit `#12` blockquote groups across the 5 files (07=11 incl. the corpus-worst 1892c group, 08=10, 09=5, 10=12, 11=4), matching RESEARCH.md's per-file counts exactly
- `node scripts/validation/c17-eee-contract.mjs` exits 0 with zero violations across all 129 enrolled corpus files
- Flipped RE-123..RE-127 `Pending` -> `Approved` in `docs/_registry/RE-index.md`

## Task Commits

Each task was committed atomically:

1. **Task 1: Mechanical transform of RE-123..RE-127 via the helper** - `5b85efb` (feat)
2. **Task 2: Hand-author the ## Summary prose (macOS-template lead, >=30 words)** - `3bcbd61` (feat)
3. **Task 3: #12 blockquote compliance (Transform B heavy), C17 exit 0, registry Approved** - `b846bb3` (fix)

_Note: no TDD tasks in this plan (documentation retrofit, not code)._

## Files Created/Modified
- `docs/admin-setup-macos/07-platform-sso-setup.md` - RE-123; EEE block + Summary + corpus-worst 1892c blockquote group resolved (2 Transform-B multi-bullet boxes + remaining single-paragraph callouts split via Transform A)
- `docs/admin-setup-macos/08-auth-methods-deep-dive.md` - RE-124; EEE block + Summary + 10 blockquote groups resolved (5 Transform-B boxes incl. FileVault/SE-key-destruction/Entra-CBA + 5 Transform-A single-paragraph splits)
- `docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md` - RE-125; EEE block + Summary + 5 blockquote groups resolved (2 Transform-B boxes, one containing an embedded `app-sso platform -s` code fence now unmasked as a real top-level fence)
- `docs/admin-setup-macos/10-kerberos-sso-extension.md` - RE-126; EEE block + Summary + 12 blockquote groups resolved (1 Transform-B box + 11 Transform-A splits)
- `docs/admin-setup-macos/11-graph-api-platform-credential.md` - RE-127; EEE block + Summary + 4 blockquote groups resolved (1 Transform-B box, 1 split preserving the `[!WARNING]` GitHub alert marker on its lead sentence)
- `docs/_registry/RE-index.md` - RE-123..RE-127 Status flipped Pending -> Approved

## Decisions Made
- Transform B (de-blockquote to bold-led paragraph) reserved for multi-paragraph/bulleted structured callouts and any callout with an embedded code fence; Transform A (sentence/clause-boundary split with a truly empty separator line) used for all remaining single-paragraph prose
- Where a single sentence still exceeded 200 chars after an initial split, iteratively re-split at the next available clause/em-dash boundary rather than trimming or rewording, confirmed via re-measurement each time
- The `[!WARNING]` GitHub alert marker in guide 11 is kept paired only with its first split sentence (no corpus precedent existed for splitting a marked alert under C17, since the only other `[!WARNING]` boxes in the corpus — `docs/reference/win32-app-packaging.md` — are not yet C17-enrolled)
- Version-History date filled with the actual commit date (2026-07-06)

## Deviations from Plan

None - plan executed exactly as written. All three tasks' acceptance criteria were met without requiring architectural changes, missing-functionality additions, or blocking-issue fixes beyond the planned #12 iterative re-splitting (which the plan itself anticipated: "escalate any unsplittable atomic >200c sentence" — none were encountered; every group was splittable via Transform A or B while preserving all words).

## Issues Encountered
- Several initial Transform-A splits still exceeded 200 chars after the first pass (the joined multi-line blockquote text is longer than it appears from a single source line); resolved by re-running the measurement script after each edit and further splitting at the next clause/em-dash boundary until every group measured <=200 chars. No words were lost — confirmed via word-set multiset diff against the pre-edit git blob for every file (only diffs were the expected `>` blockquote-marker count changes and italic-underscore reattachment at split provenance sentences).

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- All 5 macOS SSO guides (RE-123..RE-127) are EEE-conformant, C17-green, and Approved; no blockers for 117-08/09/10
- The word-set-diff verification technique (multiset comparison against `git show HEAD:<file>`) is reusable for remaining 117-08/09/10 batches and any future #12 remediation work
- Phase 119's frozen-surface re-baseline can proceed once all remaining 117 batches close; no open concerns from this plan

## Self-Check

- FOUND: docs/admin-setup-macos/07-platform-sso-setup.md
- FOUND: docs/admin-setup-macos/08-auth-methods-deep-dive.md
- FOUND: docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md
- FOUND: docs/admin-setup-macos/10-kerberos-sso-extension.md
- FOUND: docs/admin-setup-macos/11-graph-api-platform-credential.md
- FOUND: docs/_registry/RE-index.md
- FOUND: 5b85efb
- FOUND: 3bcbd61
- FOUND: b846bb3

## Self-Check: PASSED

---
*Phase: 117-admin-setup-guide-retrofit-all-platforms*
*Completed: 2026-07-06*
