---
phase: 121-structural-retrofit-glossaries-lifecycle-end-user-guides
verified: 2026-07-07T22:00:00Z
status: passed
score: 4/4 must-haves verified (roadmap Success Criteria); RETRO-07 correctly PARTIAL (spanning, not a gap)
overrides_applied: 0
---

# Phase 121: Structural Retrofit — Glossaries, Lifecycle & End-User Guides — Verification Report

**Phase Goal:** Glossaries (6), end-user guides (RE-175/176), and the 13 Mermaid-free lifecycle docs are retrofitted to EEE and green under C17. The 9 Mermaid-bearing lifecycle docs are deferred to Phase 122 — RETRO-07 spans Phase 121 + Phase 122.
**Verified:** 2026-07-07T22:00:00Z
**Status:** passed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths (ROADMAP Success Criteria)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| SC1 | All 6 `docs/_glossary*.md` carry EEE header block + Summary-first + normalized Platform label + `doc_type: Reference`; anchor slugs preserved; C17 exits 0 | ✓ VERIFIED | All 6 files carry `doc_id`, `status: Approved`, `doc_type: Reference`, `## Summary` (first H2), block line `**Platform:** ... · **Doc Type:** Reference`. `### Kandji-Iru` heading intact (bare, no `{#id}`) in `_glossary-macos.md`; `#apv1`/`#esp`/`#oobe` term headings intact in `_glossary.md`. Live `node scripts/validation/c17-eee-contract.mjs` run returns `195 files checked, 0 with violations, 0 total violations`, exit 0, all 13 assertion counters at 0. |
| SC2 | All 13 Mermaid-free lifecycle docs carry EEE block + Summary-first + Platform label + `doc_type: Guide` + `status: Approved`; C17 exits 0. The 9 Mermaid-bearing docs enrolled at `Status: Pending` in RE-index.md, UNENROLLED in frontmatter (no `doc_id`). RETRO-07 does NOT close. | ✓ VERIFIED | All 13 Mermaid-free lifecycle files (android-lifecycle ×4, ios-lifecycle/00, linux-lifecycle ×2, lifecycle/{01,02,05}, lifecycle-apv2/{00,01,03}) confirmed with `doc_id`, `status: Approved`, `doc_type: Guide`, `## Summary`. Live grep of all 9 Mermaid-bearing files (`docs/lifecycle/00-overview.md`, `03-oobe.md`, `04-esp.md`, `lifecycle-apv2/02-deployment-flow.md`, `ios-lifecycle/{01,02}`, `macos-lifecycle/{00,01,02}`) confirms **zero** have a `doc_id:` key and **all** still contain ```mermaid fences. Registry rows RE-190/191/192/195/196/200/204/205/206 = Guide/Pending. RETRO-07 in REQUIREMENTS.md is `[ ]` Pending (correct — spanning, per verification instructions this is NOT a gap). |
| SC3 | RE-175/176 (end-user guides) carry EEE block + Summary-first + `doc_type: Guide` + actual frontmatter injection; C17 exits 0 | ✓ VERIFIED | `docs/end-user-guides/android-work-profile-setup.md` and `linux-intune-portal-enrollment.md` both carry `doc_id: RE-175`/`RE-176`, `status: Approved`, `doc_type: Guide`, `owner`, `## Summary`, block line `**Doc Type:** Guide`. Registry rows RE-175/176 = Guide/Approved (flipped from Pending in 121-01). |
| SC4 | Every retrofitted file (21 total) carries the "v1.16 EEE reformat — content not re-reviewed" VH row with a filled date (2026-07-07) and `Last Reviewed`/`last_verified` preserved verbatim; no `YYYY-MM-DD` placeholders remain | ✓ VERIFIED | All 21 retrofitted files grepped live: each contains exactly one "v1.16 EEE reformat" VH row. `grep -rn "YYYY-MM-DD"` across the 9 files flagged in `deferred-items.md` (DEFER-121-07-A) returns **zero matches** — confirmed fixed by commit `9031056` (`fix(121): fill YYYY-MM-DD VH-row placeholder in 9 retrofitted files`), dated after the 121-07-SUMMARY.md was written. `last_verified` spot-checked on `docs/_glossary-macos.md` via `git log -p`: value `2026-06-29` is byte-identical before and after the retrofit commit (`b9a56a2`) — preserved verbatim, not reset. |

**Score:** 4/4 roadmap Success Criteria verified. RETRO-07 is intentionally PARTIAL (spans Phase 121+122) per phase goal — not counted as a failure per verification instructions.

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `scripts/pipeline/retrofit-structural.mjs` | 2-doc_type PATH router, v1.16 VH literal, 9-file Mermaid hard-exclusion, self-test green | ✓ VERIFIED | File exists (33KB). Live `--self-test` run: **8 passed, 0 failed**, exit 0 — covers buildDocIdMap, glossary→Reference routing, lifecycle→Guide routing, end-user-guide→Guide routing, Mermaid-deferred hard-exclusion (9 paths confirmed), keyless-platform injection, v1.16 VH literal (both NEW_ROW_2COL/3COL), whole-pre-H1-span byte-equality. `grep -c "v1.16 EEE reformat"` = 6 (both constants + comments). `MERMAID_DEFERRED_PATHS` Set defined at line 130. |
| `docs/_registry/RE-index.md` | 28 contiguous rows RE-179..206 + RE-175/176 flipped Approved | ✓ VERIFIED | Live grep of rows RE-175..206 confirms exact contents: RE-175/176 = Guide/Approved; RE-179..184 = 6 glossaries Reference/Approved; RE-185..206 = 22 lifecycle rows Guide, with exactly 13 Approved (RE-185..189,193,194,197,198,199,201,202,203) and 9 Pending (RE-190,191,192,195,196,200,204,205,206) — matches the Mermaid split exactly. |
| 6 `docs/_glossary*.md` files | Reference doc_type, EEE-retrofitted | ✓ VERIFIED | All 6 confirmed with doc_id/status/doc_type/Summary/VH row (see SC1 table above). |
| 13 Mermaid-free lifecycle files | Guide doc_type, Approved | ✓ VERIFIED | All 13 confirmed (see SC2). |
| 2 end-user guides (RE-175/176) | Guide doc_type, actual retrofit | ✓ VERIFIED | Confirmed (see SC3). |
| 9 Mermaid-bearing lifecycle files | Unenrolled (no doc_id), Pending in registry, untouched content | ✓ VERIFIED | Confirmed unenrolled + Pending; each still contains ```mermaid (Phase 122 scope, not touched). |

### Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| `retrofit-structural.mjs buildDocIdMap()` | `docs/_registry/RE-index.md` RE-NNN rows | join on Path column, fail-closed | ✓ WIRED | Self-test (a) confirms `buildDocIdMap` resolves `docs/_glossary-android.md` → `RE-179` from the live registry. `--self-test` sub-test (h) proves the whole-pre-H1-span relocation mechanism end-to-end. |
| `docs/_glossary-android.md` Alphabetical Index | term `### anchors` | plain-GitHub slug | ✓ WIRED | `### Kandji-Iru` and base glossary `### OOBE`/`### ESP`/`### APv1` headings confirmed bare (no `{#id}` override) — anchors resolve. |
| `docs/end-user-guides/*.md` frontmatter | RE-175/RE-176 registry rows | buildDocIdMap join-on-Path | ✓ WIRED | Both files carry `doc_id: RE-175`/`RE-176` matching the registry rows flipped to Approved in 121-01. |
| 9 Mermaid-bearing files | RE-190/191/192/195/196/200/204/205/206 (Pending) | unenrolled frontmatter + Pending status → Phase 122 flip | ✓ WIRED | Confirmed: no `doc_id` key in any of the 9 files; registry rows remain Pending, ready for Phase 122 to flip without minting new IDs. |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| RETRO-04 | 121-01, 121-02, 121-03, 121-04, 121-07 | All glossary docs retrofitted to EEE, C17 green, term-surface preserved | ✓ SATISFIED | `.planning/REQUIREMENTS.md` line 20/88: marked `[x]` Complete, Phase 121. Live codebase confirms all 6 glossaries EEE-retrofitted, C17 green, anchor slugs preserved. |
| RETRO-07 | 121-01, 121-05, 121-06, 121-07 | Lifecycle docs retrofitted to EEE (22 total); spans Phase 121+122 | ✓ CORRECTLY PARTIAL (not a gap) | `.planning/REQUIREMENTS.md` line 23/91: `[ ]` Pending, "Phase 121 + 122" — this is the expected/correct state per the phase goal explicitly declaring RETRO-07 as spanning. 13/22 files done this phase, 9/22 correctly deferred and unenrolled for Phase 122. |
| RETRO-09 | 121-01, 121-06, 121-07 | End-user Guides (RE-175/176) retrofitted to EEE | ✓ SATISFIED | `.planning/REQUIREMENTS.md` line 25/93: marked `[x]` Complete, Phase 121. Both files confirmed retrofitted live. |

No orphaned requirements found — RETRO-04, RETRO-07, RETRO-09 are the only IDs mapped to Phase 121 in REQUIREMENTS.md and all appear in plan frontmatter.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| — | — | — | — | None found. Grep sweep for TBD/FIXME/XXX/TODO/HACK/PLACEHOLDER/"coming soon"/"not yet implemented" across all 21 retrofitted files + the pipeline fork + RE-index.md returned only false positives (hex event-ID ranges like `1xxx`/`0x8018xxxx`, and the fork's own `[FILL-IN]` scaffold-comment references, which are design intent for the pipeline's own placeholder mechanism, not leaked into shipped docs — confirmed 0 files contain a literal `[FILL-IN` string). |

Note: the `deferred-items.md` DEFER-121-07-A finding (unfilled `YYYY-MM-DD` VH date placeholder in 9 files) was **resolved in-phase** by commit `9031056` after the 121-07-SUMMARY.md was authored — live grep confirms zero `YYYY-MM-DD` placeholders remain anywhere in the 21 retrofitted files. The deferred-items.md file itself is now stale documentation of an already-fixed issue; this does not block phase closure and is noted for hygiene only.

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| C17 EEE contract validator passes on full corpus | `node scripts/validation/c17-eee-contract.mjs` | `195 files checked, 0 with violations, 0 total violations`, all 13 assertion counters = 0 | ✓ PASS |
| Pipeline fork self-test passes | `node scripts/pipeline/retrofit-structural.mjs --self-test` | `Self-test: 8 passed, 0 failed` | ✓ PASS |
| Registry split matches spec (19 Approved / 9 Pending among RE-179..206) | live grep of RE-index.md rows | 19 Approved (6 glossary + 13 lifecycle) + 9 Pending (Mermaid-bearing lifecycle) | ✓ PASS |
| 9 Mermaid files remain unenrolled | live grep for `^doc_id:` across the 9 paths | 0/9 have doc_id; 9/9 still contain ```mermaid | ✓ PASS |
| REQUIREMENTS.md traceability reflects correct status | live grep of RETRO-04/07/09 | RETRO-04 Complete, RETRO-07 Pending (spanning, expected), RETRO-09 Complete | ✓ PASS |

### Probe Execution

Not applicable — this phase is a documentation-retrofit phase with no `scripts/*/tests/probe-*.sh` convention; the C17 validator and pipeline self-test (above) serve the equivalent role and were both executed live by the verifier, not sourced from SUMMARY claims.

### Human Verification Required

None. This phase is fully machine-verifiable: EEE frontmatter structure, Summary-first/word-count, Platform-label normalization, blockquote length, Mermaid-fence detection, and registry state are all enforced/checked by the deterministic C17 validator and grep, all of which were re-run live by the verifier (not sourced from SUMMARY.md text).

### Gaps Summary

No gaps found. All 4 ROADMAP Success Criteria verified true against the live repository (not SUMMARY claims): C17 exits 0 with exactly 195 files / 0 violations; the pipeline fork self-tests 8/8; the registry carries the exact 19-Approved/9-Pending split with RE-175/176 flipped Approved; all 21 retrofitted files carry the v1.16 VH row with real dates and verbatim-preserved `last_verified`; anchor slugs (including the `### Kandji-Iru` double-hyphen hazard) are intact; the 9 Mermaid-bearing lifecycle files are correctly and verifiably left unenrolled for Phase 122. RETRO-07's Pending/PARTIAL state in REQUIREMENTS.md is the expected, correct state for a requirement that spans two phases — not a gap, per the explicit phase goal and per this verification's instructions.

The one cosmetic issue found during investigation (DEFER-121-07-A, unfilled VH-date placeholders) was already resolved in-phase (commit `9031056`) before this verification ran; no outstanding action needed.

---

_Verified: 2026-07-07T22:00:00Z_
_Verifier: Claude (gsd-verifier)_
