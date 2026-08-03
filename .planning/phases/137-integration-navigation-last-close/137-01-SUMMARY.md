---
phase: 137-integration-navigation-last-close
plan: 01
subsystem: docs-pipeline
tags: [pandoc, guard-docx, filename-map, publish-bundle, registry, drift-canary]

# Dependency graph
requires:
  - phase: 135-recipe-3-windows-11-multi-app-kiosk
    provides: "RE-224 recipe body, complete and C17-clean, slug/H1 locked for inheritance"
  - phase: 136-recipe-4-android-dedicated-mhs-multi-app
    provides: "RE-225 recipe body, complete and C17-clean, slug/H1 locked for inheritance"
provides:
  - "Both recipes flipped Draft -> Approved at both metadata sites (frontmatter + byline)"
  - "RE-224/RE-225 registry rows in docs/_registry/RE-index.md, inside the table"
  - "Regenerated scripts/pipeline/filename-map.md carrying both new .docx stems"
  - "Both registry-row-count drift canaries bumped and green (build-filename-map.mjs 223->225, build-publish-bundle.mjs 221->225)"
  - "REQUIREMENTS.md CLASS-05, ROADMAP.md Phase-137 SC2, STATE.md pipeline claim corrected to name both canaries"
affects: [137-02-docs-index-nav, 138-harness-close]

# Actuals (#2632)
actuals:
  tokens: 3241
  tasks: 4
  commits: 3

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Three-commit flip-first topology (flip -> register+regen+canaries -> nav, per D-14)"
    - "Both independent row-count drift canaries bumped together in the same commit as the regen (D-15/D-23 binding atom)"

key-files:
  created: []
  modified:
    - docs/recipes/03-windows-11-multi-app-kiosk.md
    - docs/recipes/04-android-dedicated-mhs-multi-app.md
    - docs/_registry/RE-index.md
    - scripts/pipeline/filename-map.md
    - scripts/pipeline/build-filename-map.mjs
    - scripts/pipeline/build-publish-bundle.mjs
    - .planning/REQUIREMENTS.md
    - .planning/ROADMAP.md
    - .planning/STATE.md

key-decisions:
  - "Pre-flight (D-24) ran BEFORE the flip and passed clean on both recipes on the first attempt, including RE-225's column-0 JSON fence — no remediation round needed"
  - "Commit B bundled the registry rows, the regeneration, and BOTH canary bumps as a single atom (D-15) — not split, per the FILENAME-MAP-SELFTEST-DRIFT lesson this exact plan exists to close"
  - "build-publish-bundle.mjs's canary was already RED at HEAD (14 passed, 1 failed, rows.length=223 vs expected 221) — this was known, named, pre-existing drift this plan was chartered to close, not a regression"

patterns-established:
  - "Both drift canaries named explicitly in any future commit/prose touching the registry row count — never assume a single self-test covers the invariant"

requirements-completed: [CLASS-05]

coverage:
  - id: D1
    description: "Both recipes pass the pandoc + guard-docx.mjs pre-flight before the flip (D-24 gate)"
    requirement: CLASS-05
    verification:
      - kind: other
        ref: "pwsh -NoProfile -File scripts/pipeline/convert.ps1 + node scripts/pipeline/guard-docx.mjs, both recipes, run and captured verbatim below"
        status: pass
    human_judgment: false
  - id: D2
    description: "Both recipes flip Draft -> Approved at frontmatter status: and the Status byline, doc_type unchanged, body prose frozen (2/2 numstat per file)"
    requirement: CLASS-05
    verification:
      - kind: other
        ref: "git diff --numstat c3733928dc0957713f3873483e13b42be10a7406~1 c3733928dc0957713f3873483e13b42be10a7406 -- docs/recipes/03-windows-11-multi-app-kiosk.md docs/recipes/04-android-dedicated-mhs-multi-app.md"
        status: pass
      - kind: other
        ref: "node scripts/validation/c17-eee-contract.mjs (234 files checked, 0 with violations)"
        status: pass
    human_judgment: false
  - id: D3
    description: "RE-224/RE-225 registry rows appended inside the table (225 total rows), filename-map.md regenerated carrying both new .docx stems, both drift canaries bumped and green in the same commit"
    requirement: CLASS-05
    verification:
      - kind: other
        ref: "node scripts/pipeline/build-filename-map.mjs --self-test (8 passed, 0 failed)"
        status: pass
      - kind: other
        ref: "node scripts/pipeline/build-publish-bundle.mjs --self-test (15 passed, 0 failed, was 14 passed/1 failed)"
        status: pass
    human_judgment: false
  - id: D4
    description: "REQUIREMENTS.md CLASS-05, ROADMAP.md Phase-137 SC2, and STATE.md:307 corrected to name both canaries; no predecessor validator regressed"
    requirement: CLASS-05
    verification:
      - kind: other
        ref: "for n in 54 57 59 87 92 99 110 114 123 124 125 126 127 129 130 131 132; do node scripts/validation/check-phase-$n.mjs; done (all exit 0)"
        status: pass
    human_judgment: false

duration: 4min
completed: 2026-08-03
status: complete
---

# Phase 137 Plan 01: Recipe Flip, Registry, Filename-Map Regen, Both Drift Canaries Summary

**Both recipes proven pandoc-convertible then flipped Draft to Approved, registered at 225 rows, filename-map regenerated, and both independent row-count drift canaries (build-filename-map.mjs and the previously-forgotten build-publish-bundle.mjs) bumped green in one atomic commit.**

## Performance

- **Duration:** 4 min
- **Started:** 2026-08-03T22:19:03Z
- **Completed:** 2026-08-03T22:23:09Z
- **Tasks:** 4
- **Files modified:** 9

## Accomplishments
- Pandoc + guard-docx.mjs pre-flight passed clean on BOTH recipes, including RE-225's previously-untested column-0 JSON fence, before the flip landed (D-24 gate)
- Both recipes flipped Draft -> Approved at both metadata sites; body prose frozen (2/2 numstat per file); C17 green
- RE-224/RE-225 registered inside `docs/_registry/RE-index.md`'s table (225 rows total); `filename-map.md` regenerated, carrying both new `.docx` stems, never hand-edited
- BOTH row-count drift canaries bumped together in one commit: `build-filename-map.mjs` 223 -> 225 and the previously-missed `build-publish-bundle.mjs` 221 -> 225 (RED since the v1.18 close, now green)
- Three planning-doc claims corrected: CLASS-05, ROADMAP SC2 now name both canaries; STATE.md's stale "zero pipeline code changes expected" claim replaced

## Task Commits

Each task was committed atomically:

1. **Task 1: D-24 pandoc + guard-docx pre-flight on both recipes** - no commit (modifies no tracked files; output in gitignored `.pipeline-output/`, cleaned up after verification)
2. **Task 2: Commit A — two-site Draft to Approved flip on both recipes** - `c3733928dc0957713f3873483e13b42be10a7406` (docs), author timestamp 2026-08-03T17:20:08-05:00
3. **Task 3: Commit B — registry rows + filename-map regeneration + both canary bumps** - `f0b7aa90f35905b59303ed0867cc009f464537b9` (docs), author timestamp 2026-08-03T17:21:25-05:00
4. **Task 4: Correct planning-doc claims + regression gate** - `dca20cd425bbfea9d28b77168559961cc56a5534` (docs), author timestamp 2026-08-03T17:22:44-05:00

_Note: this is a `type="execute"` plan; all tasks are `type="auto"`, no TDD RED/GREEN split._

## Files Created/Modified
- `docs/recipes/03-windows-11-multi-app-kiosk.md` - status flip Draft -> Approved at `:3` and `:13` only
- `docs/recipes/04-android-dedicated-mhs-multi-app.md` - status flip Draft -> Approved at `:3` and `:13` only
- `docs/_registry/RE-index.md` - RE-224/RE-225 rows appended inside the table, before `## Review Notes`
- `scripts/pipeline/filename-map.md` - regenerated (never hand-edited), 225 rows, both new `.docx` stems
- `scripts/pipeline/build-filename-map.mjs` - row-count canary 223 -> 225 (comment, label, assertion)
- `scripts/pipeline/build-publish-bundle.mjs` - row-count canary 221 -> 225 (header comment, label, assertion), plus a provenance comment recording both historical bumps
- `.planning/REQUIREMENTS.md` - CLASS-05 amended to name both canaries
- `.planning/ROADMAP.md` - Phase-137 SC2 amended to name both canaries (single-line hunk)
- `.planning/STATE.md` - `:307` corrected, stale "zero pipeline code changes expected" claim removed

## Verbatim Evidence (D-24 pre-flight, per plan `<output>` requirement)

### RE-224 (docs/recipes/03-windows-11-multi-app-kiosk.md)

`pwsh -NoProfile -File scripts/pipeline/convert.ps1 -InputMd docs/recipes/03-windows-11-multi-app-kiosk.md -OutputDocx .pipeline-output/03-windows-11-multi-app-kiosk.docx`:
```
pandoc 3.7.0.2 (pinned 3.7.0.2) -- version guard PASS
PIPE-03 preprocessing: 0 nav-footer rewrite(s), guard PASS
Converting docs/recipes/03-windows-11-multi-app-kiosk.md -> .pipeline-output/03-windows-11-multi-app-kiosk.docx ...
Conversion complete.
Run guard: node scripts/pipeline/guard-docx.mjs .pipeline-output/03-windows-11-multi-app-kiosk.docx
```

`node scripts/pipeline/guard-docx.mjs .pipeline-output/03-windows-11-multi-app-kiosk.docx`:
```
guard-docx -- Post-conversion .docx guard (PIPE-01 SC2)

[YAML-LEAK/3] V-GUARD-YAML-LEAK: no "---" YAML delimiter in first ~500 chars of .docx body text PASS
[HEADING-STYLE/3] V-GUARD-HEADING-STYLE: Heading1/Heading2/Heading3 pStyle IDs present in .docx body PASS
[CUSTOM-PROPS/3] V-GUARD-CUSTOM-PROPS: docProps/custom.xml property names within the known EEE key set (D-04 OQ4) PASS

Result: 3 PASS, 0 FAIL, 0 SKIPPED
```

### RE-225 (docs/recipes/04-android-dedicated-mhs-multi-app.md) — the file with zero prior pandoc/guard-docx artifacts, ships a column-0 JSON fence

`pwsh -NoProfile -File scripts/pipeline/convert.ps1 -InputMd docs/recipes/04-android-dedicated-mhs-multi-app.md -OutputDocx .pipeline-output/04-android-dedicated-mhs-multi-app.docx`:
```
pandoc 3.7.0.2 (pinned 3.7.0.2) -- version guard PASS
PIPE-03 preprocessing: 0 nav-footer rewrite(s), guard PASS
Converting docs/recipes/04-android-dedicated-mhs-multi-app.md -> .pipeline-output/04-android-dedicated-mhs-multi-app.docx ...
Conversion complete.
Run guard: node scripts/pipeline/guard-docx.mjs .pipeline-output/04-android-dedicated-mhs-multi-app.docx
```

`node scripts/pipeline/guard-docx.mjs .pipeline-output/04-android-dedicated-mhs-multi-app.docx`:
```
guard-docx -- Post-conversion .docx guard (PIPE-01 SC2)

[YAML-LEAK/3] V-GUARD-YAML-LEAK: no "---" YAML delimiter in first ~500 chars of .docx body text PASS
[HEADING-STYLE/3] V-GUARD-HEADING-STYLE: Heading1/Heading2/Heading3 pStyle IDs present in .docx body PASS
[CUSTOM-PROPS/3] V-GUARD-CUSTOM-PROPS: docProps/custom.xml property names within the known EEE key set (D-04 OQ4) PASS

Result: 3 PASS, 0 FAIL, 0 SKIPPED
```

Both `.docx` test artifacts were deleted from `.pipeline-output/` (gitignored) after verification; `git status --porcelain .pipeline-output` showed no new tracked/untracked residue.

## Self-Test Before/After (both harnesses, so the RED-to-green delta is legible as intentional per plan `<output>` requirement)

**`build-filename-map.mjs --self-test`:**
- BEFORE this plan (pre-Commit B, 223 registry rows): `8 passed, 0 failed`
- AFTER Commit B (225 registry rows):
```
build-filename-map --self-test (Phase 124 PIPE-04 generator proof)

[ST] (a) registry parser: 2 data rows parsed, "## Review Notes" prose contributes 0 rows PASS -- rows.length=2
[ST] (b) slug("802.1X Certificate Failure") === "8021x-certificate-failure" PASS -- got "8021x-certificate-failure"
[ST] (b2) slug() em-dash title collapses to a single "-", no leading/trailing/doubled "-" PASS -- got "macos-platform-sso-secure-enclave-key-loss"
[ST] (c) parseRegistry(docs/_registry/RE-index.md) yields exactly 225 rows PASS -- rows.length=225
[ST] (d) synthetic 2-row title collision -> D-08 disambiguation resolves to unique slugs PASS -- got: overview-admin-setup-ios.docx, overview-admin-setup-macos.docx
[ST] (e) duplicate Doc ID (identical title+path+docId) -> fail-closed FILENAME-COLLISION-UNRESOLVED PASS -- FILENAME-COLLISION-UNRESOLVED: RE-T03 (Overview) -- exhausted 0 path segment(s) and the Doc ID fallback on base "overview" (duplicate Doc ID in registry?)
[ST] (g) WR-01 coincidence (singleton "foo-a" vs group "foo" disambiguation) -> resolves via Doc-ID fallback, no spurious hard-fail PASS -- foo-a.docx, foo-re-g01.docx, foo-b.docx
[ST] (f) 0-row registry (prose only) parses to rows.length === 0 (main() fail-closed guard input) PASS -- rows.length=0

8 passed, 0 failed
```

**`build-publish-bundle.mjs --self-test`:**
- BEFORE this plan (HEAD baseline, known pre-existing RED per D-23/must_honor #6): `14 passed, 1 failed` — `"(a) Approved selection yields exactly 221 rows FAIL -- rows.length=223"`
- AFTER Commit B:
```
build-publish-bundle --self-test (Phase 126 PUB-01..04 orchestrator proof)

[ST] (a) Approved selection yields exactly 225 rows ..................... PASS -- rows.length=225
[ST] (b) CSV manifest join shape correct ................................ PASS -- got: "RE-ID,Output Filename,Status,Last Verified\nRE-001,foo.docx,Approved,2026-01-01\n"
[ST] (b2) WR-01 CSV manifest escapes comma/quote fields ................. PASS -- got: "RE-ID,Output Filename,Status,Last Verified\nRE-002,bar.docx,\"Approved, pending review\",2026-01-01\n"
[ST] (c) filename-map join fails closed on synthetic missing RE-ID ...... PASS -- missing=RE-902
[ST] (c2) CR-01 Doc ID uniqueness fails closed on synthetic duplicate ... PASS -- duplicateDocIds=RE-901
[ST] (c3) CR-01 Doc ID uniqueness passes clean on all-unique rows ....... PASS -- duplicateDocIds=
[ST] (d1) parity logic fails closed on synthetic missing+orphan ......... PASS -- missing=RE-C orphans=RE-D
[ST] (d2) D-12 divergence guard fails closed on synthetic frontmatter status:Draft PASS -- divergent=RE-Z
[ST] (e1) validateSourcePathUnderDocs rejects traversal / non-docs paths PASS
[ST] (e1b) WR-05 validateSourcePathUnderDocs rejects backslash-mixed traversal PASS
[ST] (e2) validateOutputFilename enforces the D-05 slug charset ......... PASS
[ST] (f1) deriveZipName derives the 2-part default version .............. PASS
[ST] (f2) deriveZipName derives a 3-part version verbatim ............... PASS
[ST] (f3) deriveZipName throws on malformed version ..................... PASS
[ST] (f4) deriveZipName throws on traversal-shaped version (T-127-05) ... PASS

15 passed, 0 failed
```

## Commit SHAs with Author Timestamps (Commit A / Commit B labeled per D-16 model; Task 4's commit is a third, non-binding commit)

- **Commit A** (flip): `c3733928dc0957713f3873483e13b42be10a7406` — author timestamp `2026-08-03T17:20:08-05:00`
- **Commit B** (register + regen + both canaries, the SC2 binding atom): `f0b7aa90f35905b59303ed0867cc009f464537b9` — author timestamp `2026-08-03T17:21:25-05:00`
- **Task 4 commit** (planning-doc corrections, non-binding): `dca20cd425bbfea9d28b77168559961cc56a5534` — author timestamp `2026-08-03T17:22:44-05:00`

Commit order confirmed: `git log` shows Commit A strictly precedes Commit B, satisfying flip-first (D-14).

## D-24 Fallback Branch

Not taken. `pwsh` (7.6.3) and `pandoc` (3.7.0.2) were both present on PATH; both recipes passed the pre-flight clean on the first attempt. No `v1.19-DEFERRED-CLEANUP.md` candidate entry was needed for this gate.

## Decisions Made
- Task ordering strictly followed D-15's Pitfall-3 sequence inside Commit B: registry rows appended first, then the regeneration run, then both canaries bumped, then all four files committed together as one atom.
- The `build-publish-bundle.mjs` canary bump carries an inline provenance comment recording that the 221->223 bump was missed at the v1.18 close (per `6acc429b`, which only touched `build-filename-map.mjs`) and that this plan takes it straight to 225, per D-23's mandate that the next milestone can grep this history.
- No `## Review Notes` entry was added for RE-224/RE-225 in `RE-index.md` — per 137-PATTERNS.md's citation of `135-CONTEXT.md:76` (D2.2), the template-divergence disposition belongs in phase SUMMARY/VERIFICATION plus a deferred-cleanup entry, not registry meta-commentary.

## Deviations from Plan

None - plan executed exactly as written. All `must_honor` constraints were respected: recipe body prose stayed frozen (2/2 numstat per file, confirmed), `filename-map.md` was only ever regenerated via the generator, `check-phase-132.mjs` was not opened, no commit message or this SUMMARY uses the phrase "zero pipeline code changes," `git diff --quiet` was never used as a gate for the pipeline scripts, and the pre-existing `build-publish-bundle.mjs --self-test` RED state was treated as expected, chartered drift — not a regression to investigate.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness

Plan 137-02 (`depends_on: ["137-01"]`) is unblocked: both recipes are Approved, registered, in the regenerated publish set, and both drift canaries are green. Plan 137-02 owns `docs/index.md` (table rows + line-38 quick-nav bullet, Commit C) and was not touched here. No blockers or concerns for 137-02.

---
*Phase: 137-integration-navigation-last-close*
*Completed: 2026-08-03*

## Self-Check: PASSED

All created/modified files confirmed present on disk; all three task commit hashes (`c3733928`, `f0b7aa90`, `dca20cd4`) confirmed present in `git log`.
