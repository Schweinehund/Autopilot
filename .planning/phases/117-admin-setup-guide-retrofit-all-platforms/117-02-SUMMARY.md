---
phase: 117-admin-setup-guide-retrofit-all-platforms
plan: 02
subsystem: documentation
tags: [eee-sop-retrofit, doc-tooling, windows-admin-setup, markdown]

# Dependency graph
requires:
  - phase: 117-admin-setup-guide-retrofit-all-platforms (plan 01)
    provides: scripts/pipeline/retrofit-guide.mjs (forked mechanical helper) + the whole-pre-H1-span relocation fix + D1_MAP + doc_id registry join
  - phase: 116-l1-l2-runbook-retrofit-75-docs
    provides: the D1_MAP / Version-History-insertion / registry-flip precedent this batch follows
provides:
  - 13 EEE-conformant Windows admin-setup guides (RE-078..RE-086, RE-088..RE-091) -- APv1 files 02-10 and APv2 files 01-04
  - Word-preserving Transform A pattern applied at scale (39 over-limit blockquote groups fixed via truly-empty-line splits, zero content lost)
  - docs/_registry/RE-index.md Status flip for the 13 rows (Pending -> Approved)
affects: [117-03, 117-04, 117-05, 117-06, 117-07, 117-08, 117-09, 119]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Transform A applied to repeated 3-line 'Version gate' boilerplate: split after the bold-labeled lead sentence, leaving the two cross-reference sentences as a second group -- reused identically across all 13 files since the boilerplate is byte-identical per apv1/apv2 direction"
    - "Transform A applied to admonition boxes ([!IMPORTANT]/[!WARNING]/[!CAUTION]): bare '>' separator lines inside the original callout do NOT split a group (per C17 #12 semantics), so a truly-empty line was inserted at each paragraph boundary, deliberately fragmenting a single rendered callout box into multiple sequential blockquotes -- accepted as reformat-only since no words were lost"
    - "Word-set diff (tr + sort) between HEAD~1 and working tree as the post-hoc reformat-only proof, run per file after the #12 fix batch"

key-files:
  created: []
  modified:
    - docs/admin-setup-apv1/02-deployment-profile.md
    - docs/admin-setup-apv1/03-esp-policy.md
    - docs/admin-setup-apv1/04-dynamic-groups.md
    - docs/admin-setup-apv1/05-deployment-modes-overview.md
    - docs/admin-setup-apv1/06-user-driven.md
    - docs/admin-setup-apv1/07-pre-provisioning.md
    - docs/admin-setup-apv1/08-self-deploying.md
    - docs/admin-setup-apv1/09-intune-connector-ad.md
    - docs/admin-setup-apv1/10-config-failures.md
    - docs/admin-setup-apv2/01-prerequisites-rbac.md
    - docs/admin-setup-apv2/02-etg-device-group.md
    - docs/admin-setup-apv2/03-device-preparation-policy.md
    - docs/admin-setup-apv2/04-corporate-identifiers.md
    - docs/_registry/RE-index.md

key-decisions:
  - "Version-History date filled with the actual commit date (2026-07-05), matching the executor's own recorded commit timestamps rather than a placeholder"
  - "All 13 Summaries follow the admin-template.md:41 Windows lead exactly (framework + platform + admin role) plus one sentence of existing scope -- no new technical claims, reformat-only envelope honored"
  - "For the two admonition-box callouts ([!IMPORTANT] Sync Delay Expectations in 04-dynamic-groups.md; [!IMPORTANT] No User Affinity in 08-self-deploying.md; [!CAUTION] Connector Version Gate in 09-intune-connector-ad.md), Transform A was chosen over Transform B (de-blockquote) because none of the three boxes contain embedded code fences -- de-blockquoting is reserved for code-bearing WARNING/DANGER boxes per PATTERNS.md"

requirements-completed: [RETRO-02]

# Metrics
duration: 13min
completed: 2026-07-05
---

# Phase 117 Plan 02: Windows admin-setup guides (apv1 02-10, apv2 01-04) Summary

**Retrofitted all 13 enrolled Windows admin-setup guides (RE-078..RE-086, RE-088..RE-091) to the EEE standard -- keyless platform injection, hand-authored Summaries, 39 word-preserving blockquote splits -- C17 now exits 0 across the entire 96-file enrolled corpus.**

## Performance

- **Duration:** ~13 min
- **Tasks:** 3 completed
- **Files modified:** 14 (13 guide files + RE-index.md registry)

## Accomplishments
- Ran `scripts/pipeline/retrofit-guide.mjs` (--dry-run then write) against all 13 batch files: injected `doc_id`/`status: Approved`/`owner: Intune Admin Lead`/`doc_type: Guide` plus `platform: Windows` (all 13 were keyless), emitted the EEE block line, relocated the whole pre-H1 "Version gate" span after a new Summary placeholder, and created a `## Version History` section (date filled 2026-07-05) in every file
- Hand-authored all 13 `## Summary` sections (each ≥30 words) following the Windows admin-template lead: Autopilot framework (APv1 for apv1/* files, APv2 for apv2/* files), platform, and the specific admin/Entra role required -- plus one reformat-only sentence of existing scope per file
- Fixed all 39 over-limit (>200 char) top-level blockquote groups via Transform A (word-preserving sentence/clause-boundary splits using truly-empty blank lines): the repeated 237-char "Version gate" boilerplate (13 occurrences, one per file) plus 26 file-specific "What breaks if misconfigured" / `[!IMPORTANT]` / `[!WARNING]` / `[!CAUTION]` callouts
- Confirmed zero content change via word-set diff (`tr | sort`) against the pre-fix commit for all 9 files that received manual splits -- the only diffs were newly-inserted `>` blockquote-group markers, never a content word
- `node scripts/validation/c17-eee-contract.mjs` now exits 0 with 0 violations across all 96 enrolled `docs/` files (up from 39 violations, all on this batch, before Task 3)
- Flipped `docs/_registry/RE-index.md` Status Pending -> Approved for RE-078..RE-086 and RE-088..RE-091; confirmed RE-076/077/087 (the 3 mermaid-deferred Windows rows) remain Pending and untouched

## Task Commits

Each task was committed atomically:

1. **Task 1: Mechanical transform of the 13 Windows files via the helper** - `b509196` (feat)
2. **Task 2: Hand-author the Summary prose (Windows generic-template lead, >=30 words)** - `362cdd1` (docs)
3. **Task 3: #12 blockquote compliance, C17 exit 0, registry Approved** - `7c471d1` (fix)

## Files Created/Modified
- `docs/admin-setup-apv1/02-deployment-profile.md` (RE-078) - EEE-conformant; Summary + word-preserving blockquote splits
- `docs/admin-setup-apv1/03-esp-policy.md` (RE-079) - EEE-conformant; Summary + word-preserving blockquote splits (incl. 2 WARNING boxes)
- `docs/admin-setup-apv1/04-dynamic-groups.md` (RE-080) - EEE-conformant; Summary + word-preserving blockquote splits (incl. IMPORTANT box)
- `docs/admin-setup-apv1/05-deployment-modes-overview.md` (RE-081) - EEE-conformant; Summary + Version-gate split (only violation)
- `docs/admin-setup-apv1/06-user-driven.md` (RE-082) - EEE-conformant; Summary + word-preserving blockquote splits
- `docs/admin-setup-apv1/07-pre-provisioning.md` (RE-083) - EEE-conformant; Summary + word-preserving blockquote splits
- `docs/admin-setup-apv1/08-self-deploying.md` (RE-084) - EEE-conformant; Summary + word-preserving blockquote splits (incl. IMPORTANT box)
- `docs/admin-setup-apv1/09-intune-connector-ad.md` (RE-085) - EEE-conformant; Summary + word-preserving blockquote splits (incl. CAUTION box)
- `docs/admin-setup-apv1/10-config-failures.md` (RE-086) - EEE-conformant; Summary + Version-gate split (only violation)
- `docs/admin-setup-apv2/01-prerequisites-rbac.md` (RE-088) - EEE-conformant; Summary + Version-gate split (only violation)
- `docs/admin-setup-apv2/02-etg-device-group.md` (RE-089) - EEE-conformant; Summary + Version-gate split (only violation)
- `docs/admin-setup-apv2/03-device-preparation-policy.md` (RE-090) - EEE-conformant; Summary + word-preserving blockquote split
- `docs/admin-setup-apv2/04-corporate-identifiers.md` (RE-091) - EEE-conformant; Summary + word-preserving blockquote splits
- `docs/_registry/RE-index.md` - Status flipped Pending -> Approved for the 13 batch rows; the 3 mermaid-deferred rows (RE-076/077/087) left Pending

## Decisions Made
- Version-History date filled with the actual commit date (2026-07-05) rather than a placeholder, matching the executor's own commit timestamps
- Transform A (blank-line split) chosen over Transform B (de-blockquote) for all three admonition boxes ([!IMPORTANT] x2, [!CAUTION] x1) encountered in this batch, since none contain embedded code fences -- Transform B is reserved for code-bearing WARNING/DANGER boxes per 117-PATTERNS.md
- The common 237-char "Version gate" boilerplate (byte-identical across all 13 files per apv1/apv2 direction) was fixed with one script pass rather than per-file hand-editing, since the split point (after the bold-labeled lead sentence) is identical in every occurrence

## Deviations from Plan

None - plan executed exactly as written. All three tasks' acceptance criteria were verified directly:
- Enrollment precheck (`doc_id`/`status`/`owner: Intune Admin Lead`/`doc_type: Guide`/`platform: Windows`) returns zero missing-key lines across all 13 files
- Every block line begins `**Platform:** Windows` with exactly Platform / Doc Type / Doc ID / Status in order
- `grep -c "v1.15 EEE reformat — content not re-reviewed"` == 1 for each of the 13 files
- No file contains `last_verified: 1970-01-01`; the 3 mermaid-deferred files (apv1/00, apv1/01, apv2/00) remain keyless
- Each of the 13 Summaries is ≥30 words, is the first H2, names the correct framework (APv1/APv2) + Windows + admin role, and contains no L1/L2 diagnostic safety-banner text
- `node scripts/validation/c17-eee-contract.mjs` exits 0 with 0 total violations across all 96 enrolled files
- Word-set diff confirms zero words added/removed by the #12 fix (only new `>` markers)
- `docs/_registry/RE-index.md` shows RE-078..RE-086 + RE-088..RE-091 = Approved; RE-076/077/087 = Pending

## Issues Encountered
The Edit tool rejected several in-place edits with "File has been modified since read" errors because the mechanical helper script (and later the batch sed/node fixups) modified files on disk after they were last read via the Read tool in this session. Resolved by performing all subsequent multi-file text substitutions through small one-off Node scripts (`readFileSync`/`writeFileSync` with exact-string replacement and a NOT-FOUND guard), which read the current on-disk state at execution time rather than relying on a stale in-context Read. Not a deviation from plan scope -- purely a tooling workaround for the plan's own file-modification steps.

## User Setup Required

None - no external service configuration required. All changes are Markdown documentation edits and a pure Node.js built-ins helper invocation.

## Next Phase Readiness

All 13 enrolled Windows admin-setup guides are EEE-conformant, C17-green, and marked Approved in the registry. `scripts/pipeline/retrofit-guide.mjs` remains validated and ready for the remaining 117-03 through 117-09 batch plans (android, ios, macos, linux, 8021x). The Transform A word-preserving blockquote-split pattern demonstrated here (common-boilerplate script pass + per-file manual splits for unique callouts) is directly reusable for the remaining ~44 enrolled files, none of which are expected to introduce new pitfalls beyond the admonition-box handling already exercised in this batch.

---
*Phase: 117-admin-setup-guide-retrofit-all-platforms*
*Completed: 2026-07-05*
