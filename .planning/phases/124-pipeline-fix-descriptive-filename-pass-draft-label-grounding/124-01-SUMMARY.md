---
phase: 124-pipeline-fix-descriptive-filename-pass-draft-label-grounding
plan: 01
subsystem: infra
tags: [pandoc, docx, ooxml, pipeline, powershell, node]

# Dependency graph
requires:
  - phase: 113-conversion-pipeline-lock-representative-set-grounding-valida
    provides: convert.ps1 canonical invocation, guard-docx.mjs YAML-LEAK/HEADING-STYLE checks, lib/ooxml.mjs extractEntry()/findHeadingStyleIds()
provides:
  - "PIPE-03: pandoc nav-footer YAML-alias defect (DEFER-119-C) fixed via ephemeral-temp-copy preprocessing in convert.ps1"
  - "extractCustomProperties() OOXML helper + permanent lenient CUSTOM-PROPS guard check in guard-docx.mjs"
  - "D-04 three-part regression proof: 12 exit-0, 9-key OQ4 non-regression + no body leak, 14 byte-identical"
affects: [124-02-pipe-04-descriptive-filename, 124-03-pipe-05-draft-label-probe]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Ephemeral-temp-copy preprocessing: mutate only a throwaway temp file, never the source, feed the temp file to the real tool invocation"
    - "Fail-closed diff guard: abort (non-zero exit) if a transform produces any delta other than the exact expected rewrite"
    - "Lenient permanent guard check registered via checks.push (extends an existing standalone guard array without restructuring)"

key-files:
  created: []
  modified:
    - scripts/pipeline/convert.ps1
    - scripts/pipeline/lib/ooxml.mjs
    - scripts/pipeline/guard-docx.mjs
    - scripts/pipeline/README.md

key-decisions:
  - "CUSTOM-PROPS check treats an absent docProps/custom.xml as a trivial PASS (zero custom properties promoted is not itself a regression signal) rather than a hard FAIL -- keeps the check lenient for any legitimately-promoted doc while still catching a rogue/unexpected property name"
  - "Baseline (pre-fix) conversions for the byte-equivalence proof were produced via direct pandoc invocation (identical flags to convert.ps1's line 74) rather than a git-stash of convert.ps1, since the fix is additive-only and the pre-fix behavior is reproducible without reverting code"

patterns-established:
  - "Ephemeral-temp-copy pipeline preprocessing (D-01): any future pipeline-side source normalization should follow this same copy-mutate-feed-cleanup shape, never touching the frozen source"

requirements-completed: [PIPE-03]

duration: 9min
completed: 2026-07-08
---

# Phase 124 Plan 01: Pipeline Fix (PIPE-03) Summary

**Fixed the pandoc nav-footer YAML-alias defect via ephemeral-temp-copy preprocessing in convert.ps1, added a permanent lenient CUSTOM-PROPS guard check to guard-docx.mjs, and proved the full D-04 three-part regression (12 exit-0, 9-key OQ4 non-regression, 14 byte-identical) with zero source-.md mutation.**

## Performance

- **Duration:** 9 min
- **Started:** 2026-07-08T18:51:17Z
- **Completed:** 2026-07-08T19:00:14Z
- **Tasks:** 3/3 completed
- **Files modified:** 4

## Accomplishments

- `convert.ps1` now preprocesses a nav-footer's opening `---` → `* * *` on an ephemeral temp copy only, guarded by fence-tracking (D-03a) and a fail-closed diff assertion (D-03b) — the pinned pandoc invocation (line 74 originally, now the `& $pandocBin $tempMd ...` line) stays flag-identical
- All 12 previously-failing admin-setup nav-footer files (`Unknown alias 'Previous'/'Next'`, exit 64) now convert exit 0
- New `extractCustomProperties()` OOXML helper + a permanent, lenient `CUSTOM-PROPS` guard check confirm the OQ4 frontmatter→Word-custom-property promotion path is unaffected
- Full D-04 regression proven and recorded (see below) — not a paper claim, an actually-executed per-file check

## Task Commits

Each task was committed atomically:

1. **Task 1: Insert the D-01/D-03 pre-pandoc preprocessing block into convert.ps1** - `b5802af` (feat)
2. **Task 2: Add extractCustomProperties() to ooxml.mjs and a permanent CUSTOM-PROPS check to guard-docx.mjs** - `538a9fd` (feat)
3. **Task 3: Run the D-04 three-part regression + document the SC1 preprocessing step in README.md** - `5b7ceda` (docs)

**Plan metadata:** (this commit)

## Files Created/Modified

- `scripts/pipeline/convert.ps1` - Adds the PIPE-03 ephemeral-temp-copy preprocessing block (fence-tracking + fail-closed diff guard) immediately before the canonical conversion block; only the `& $pandocBin` invocation's input argument changes ($InputMd → $tempMd)
- `scripts/pipeline/lib/ooxml.mjs` - Adds `extractCustomProperties(docxPath)`, following the `findHeadingStyleIds()` convention exactly (reuses in-file `extractEntry()`, no new import)
- `scripts/pipeline/guard-docx.mjs` - Adds `KNOWN_CUSTOM_PROPERTY_KEYS`, `runCustomPropsCheck()`, and registers the `CUSTOM-PROPS` check via `checks.push` (append-only; runner loop and self-test harness untouched)
- `scripts/pipeline/README.md` - SC1 section now documents the pre-pandoc source-normalization step as prose (explicitly NOT a pandoc flag); reaffirms the invocation stays flag-identical

## Decisions Made

- **CUSTOM-PROPS absence handling:** the permanent guard check treats a missing `docProps/custom.xml` as a trivial PASS (no custom properties promoted is not, by itself, a promotion regression) rather than a hard FAIL. This keeps the check lenient for any legitimately-promoted doc (per the plan's stated intent to not false-fail on a reduced-key fixture) while still catching the real regression signal — a property name that exists but falls outside the known 9-key EEE set.
- **Byte-equivalence baseline method:** rather than reverting `convert.ps1` to reproduce "pre-fix" behavior, the pre-fix baseline was generated via a direct `pandoc <input> -o <output> --reference-doc=scripts/pipeline/reference.docx` invocation — byte-for-byte identical flags to what `convert.ps1`'s canonical block runs, and valid because the fix is a strictly additive preprocessing step that these 14 files' rewrite (if any) provably does not change the resulting OOXML (this is exactly the byte-equivalence claim being tested).

## Deviations from Plan

None - plan executed exactly as written. No Rule 1-4 auto-fixes were needed; the anchor regex, fence-tracking, and fail-closed guard all worked correctly on the first implementation.

## Issues Encountered

None. The bash redirect target `/tmp_convert_log.txt` initially failed with a permission error during the Task 3 regression loop (writing to Windows drive root via Git Bash path translation) — this was a shell-scripting mechanics issue in the verification harness itself, not a defect in `convert.ps1` or the plan; corrected by redirecting logs into `.pipeline-output/regression/` instead and re-running. No code was affected.

## D-04 Three-Part Regression — Full Record

**(POSITIVE) All 12 previously-failing files convert exit 0** through `convert.ps1`:

```
OK: docs/admin-setup-8021x/00-overview.md
OK: docs/admin-setup-ios/00-overview.md
OK: docs/admin-setup-ios/01-apns-certificate.md
OK: docs/admin-setup-ios/02-abm-token.md
OK: docs/admin-setup-ios/03-ade-enrollment-profile.md
OK: docs/admin-setup-ios/04-configuration-profiles.md
OK: docs/admin-setup-ios/05-app-deployment.md
OK: docs/admin-setup-ios/06-compliance-policy.md
OK: docs/admin-setup-ios/07-device-enrollment.md
OK: docs/admin-setup-ios/08-user-enrollment.md
OK: docs/admin-setup-ios/09-mam-app-protection.md
OK: docs/admin-setup-macos/00-overview.md
```
ALL 12 EXIT 0.

**(OQ4 NON-REGRESSION) `docProps/custom.xml` still carries all 9 promoted EEE custom properties, no body leak** — confirmed on two independent converted nav files (`03-ade-enrollment-profile.docx`, `00-overview.docx` [8021x]):

```
extractCustomProperties() -> applies_to,audience,doc_id,doc_type,last_verified,owner,platform,review_by,status

guard-docx.mjs result:
[YAML-LEAK/3]      PASS
[HEADING-STYLE/3]  PASS
[CUSTOM-PROPS/3]   PASS
Result: 3 PASS, 0 FAIL, 0 SKIPPED
```

**(BYTE-EQUIVALENCE) `word/document.xml` byte-identical pre-fix vs post-fix for all 14 previously-passing nav files** — per-file diff via `extractEntry()`, not a spot-check:

```
IDENTICAL  docs/admin-setup-apv1/00-overview.md               (15880B == 15880B)
IDENTICAL  docs/admin-setup-apv1/01-hardware-hash-upload.md   (51246B == 51246B)
IDENTICAL  docs/admin-setup-apv1/02-deployment-profile.md     (32296B == 32296B)
IDENTICAL  docs/admin-setup-apv1/03-esp-policy.md             (38094B == 38094B)
IDENTICAL  docs/admin-setup-apv1/04-dynamic-groups.md         (26670B == 26670B)
IDENTICAL  docs/admin-setup-apv1/05-deployment-modes-overview.md (18614B == 18614B)
IDENTICAL  docs/admin-setup-apv1/06-user-driven.md            (25477B == 25477B)
IDENTICAL  docs/admin-setup-apv1/07-pre-provisioning.md       (28946B == 28946B)
IDENTICAL  docs/admin-setup-apv1/08-self-deploying.md         (26760B == 26760B)
IDENTICAL  docs/admin-setup-apv1/09-intune-connector-ad.md    (36704B == 36704B)
IDENTICAL  docs/admin-setup-apv2/00-overview.md                (13437B == 13437B)
IDENTICAL  docs/admin-setup-apv2/01-prerequisites-rbac.md      (47987B == 47987B)
IDENTICAL  docs/admin-setup-apv2/02-etg-device-group.md        (53074B == 53074B)
IDENTICAL  docs/admin-setup-apv2/03-device-preparation-policy.md (59347B == 59347B)
```
ALL 14 BYTE-IDENTICAL.

**(SOURCE INVARIANT) No source `.md` mutated:** `git status --short docs/` after the full 26-file regression run (12 failing + 14 passing, both directions) shows zero tracked changes under `docs/`.

**26-file corpus-wide anchor scan** (independently re-verified this session, matching RESEARCH.md's prior count exactly): 26 total hits = the 12 known-failing + 14 known-passing files, confirming the anchor's scope is closed and complete.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- PIPE-03 fully closed: pipeline surface fix is in place, regression-proven, and documented. `convert.ps1`'s `-OutputDocx` param remains untouched, ready for 124-02's PIPE-04 output-name wiring.
- `guard-docx.mjs` now carries a third permanent check (CUSTOM-PROPS) that 124-02/124-03 conversions will also exercise for free.
- No blockers for 124-02 (PIPE-04 descriptive-filename pass).

---
*Phase: 124-pipeline-fix-descriptive-filename-pass-draft-label-grounding*
*Completed: 2026-07-08*
