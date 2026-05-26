---
phase: 67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up
plan: 02
subsystem: corpus-rename + sidecar-annotation + PITFALL-6-anchor-inventory
tags:
  - corpus-edit
  - apple-business
  - atomic-commit
  - sweep-02
  - pitfall-6
  - phase-67
  - vpp-content-token-rename
dependency-graph:
  requires:
    - "Plan 67-01 commit 3fb8ca5 (sidecar c13_rotting_external.ci_1_abm_urls annotated; ci_2_vpp_location_token untouched at 6-entry baseline)"
    - ".planning/phases/67-.../67-CONTEXT.md D-03 LOCKED table (6 line rewrites + 2 callout block inserts + 2 VH rows verbatim)"
    - "67-RESEARCH.md PITFALL-6 anchor inventory mechanism + sidecar annotation patterns"
    - "67-PATTERNS.md (Phase 65 anchor inventory format + Phase 64 OP-10 callout pattern precedents)"
  provides:
    - "docs/admin-setup-ios/05-app-deployment.md (post-rename: 'content token' canonical; 6 surgical edits + callout + VH row + frontmatter bump)"
    - "docs/admin-setup-macos/04-app-deployment.md (post-rename: 'content token' canonical; 6 surgical edits + callout + VH row + frontmatter bump)"
    - "docs/_glossary-macos.md (coordinating row in ## Version History H2; frontmatter bump; PITFALL-6 H2 line position invariant at L121)"
    - "scripts/validation/v1.6-audit-allowlist.json (c13_rotting_external.ci_2_vpp_location_token 6 entries annotated resolved_2026_05_26:true; 6-entry shape preserved)"
    - ".planning/phases/67-.../67-ANCHOR-INVENTORY.md (PITFALL-6 pre-edit + post-edit anchor enumeration for _glossary-macos.md; zero-shift verified)"
  affects:
    - "Plan 67-03 close-gate (full chain re-run + 67-VERIFICATION.md SWEEP-02 section append + traceability flips)"
    - "Phase 70 HARNESS-02 (forks v1.7-audit-allowlist.json with c13_rotting_external reset; v1.6 sidecar retains annotated history for Annotate→Reset transition)"
tech-stack:
  added: []
  patterns:
    - "Atomic-within-plan commit per CONTEXT.md D-04 LOCKED Option E (per-plan boundary; clean revert per requirement)"
    - "PITFALLS.md:657 first-mention-per-H2 compound form (full 'content token (formerly VPP location token; still labeled \"Apple VPP token\" in Intune)' on first prose mention per H2; short 'content token' in table cells)"
    - "OP-10 blockquote callout pattern from Phase 64 11-vpp-catalog-runbook.md:35-39 (adapted to '> **Note:**' blockquote format per CONTEXT.md D-03 row 2a)"
    - "Unheaded tail-table append (oldest-first convention per the existing admin-setup-* file shape; D-01 forbids H2 promotion in admin-setup-* files)"
    - "Glossary H2 ## Version History newest-first convention (per 67-PATTERNS.md:146)"
    - "ANNOTATE-not-remove sidecar mode (per CONTEXT.md D-04; preserves 6-entry shape so Phase 70 HARNESS-02 has clean Annotate→Reset transition)"
    - "PITFALL-6 pre-edit + post-edit anchor inventory diff (Phase 65 format precedent; embedded inline at end of artifact per CONTEXT.md Claude's Discretion line 161)"
key-files:
  created:
    - .planning/phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/67-ANCHOR-INVENTORY.md
    - .planning/phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/67-02-SUMMARY.md
  modified:
    - docs/admin-setup-ios/05-app-deployment.md
    - docs/admin-setup-macos/04-app-deployment.md
    - docs/_glossary-macos.md
    - scripts/validation/v1.6-audit-allowlist.json
decisions:
  - "Atomic indivisible commit per CONTEXT.md D-04 LOCKED Option E: ONE git SHA (55260b3) touches exactly 5 files (2 corpus + 1 glossary + 1 sidecar + 1 anchor-inventory artifact); single git revert restores v1.6-close baseline byte-identically"
  - "D-03 rewrites applied VERBATIM per CONTEXT.md D-03 table (rows #1, #2a, #2b, #3, #4, #5, #6a, #6b); zero paraphrasing or renegotiation; compound form on first-prose-mention per H2 + short form in table cells per PITFALLS:657"
  - "Unheaded tail-table append uses OLDEST-FIRST convention (per the existing iOS file pre-edit shape: 2026-04-18 above 2026-04-16 — newer-above-older WITHIN existing pairs, but planner's instruction explicitly placed the new 2026-05-26 row AS THE LAST ROW after both existing rows); resolved per plan text line 491 'insert as the LAST row of the table' verbatim"
  - "_glossary-macos.md ## Version History H2 table uses NEWEST-FIRST convention (per 67-PATTERNS.md:146; existing rows at lines 125-128 are 2026-05-05 / 2026-04-24 / 2026-04-17 / 2026-04-13 descending); new 2026-05-26 row inserted at line 125 immediately after separator at line 124"
  - "Frontmatter last_verified bumped on all 3 edited files (iOS + macOS + glossary) — glossary bump is per Claude's Discretion for traceability symmetry since the file's H2 table is edited (per CONTEXT.md D-01 + 67-PATTERNS.md:606)"
metrics:
  duration: ~45 min wall-clock (anchor capture + 11 edits + sidecar annotation + dry-run triple + atomic commit + post-verify + Summary)
  completed_date: 2026-05-26
  edit_count: 11 (1 frontmatter iOS + 1 line iOS + 1 callout iOS + 1 table-cell iOS + 1 VH-row iOS + 1 frontmatter macOS + 2 line macOS + 1 line macOS L113 + 1 callout macOS + 1 table-cell macOS + 1 VH-row macOS = 11 actions across 2 admin-setup files + 1 frontmatter glossary + 1 coord-row glossary + 6 sidecar entries; 1 new artifact)
  files_changed: 5 (2 corpus + 1 glossary + 1 sidecar + 1 anchor-inventory)
  lines_inserted: 92
  lines_deleted: 15
---

# Phase 67 Plan 02: SWEEP-02 — VPP Location Token → Content Token Surgical Rename Summary

**One-liner:** Atomic-within-plan commit `55260b3` lands 6 D-03 line rewrites + 2 OP-10 blockquote callout inserts + 2 tail-table Version History rows + 1 _glossary-macos.md coordinating row + 3 frontmatter `last_verified` bumps + 6 sidecar `resolved_2026_05_26` annotations + 1 PITFALL-6 anchor inventory artifact — all in ONE indivisible git SHA per CONTEXT.md D-04 LOCKED Option E.

## What Was Built

Plan 67-02 closes the v1.6 CI-2 deferred surgical rename per `v1.6-DEFERRED-CLEANUP.md` calibrated enumeration (6 occurrences / 2 files at HEAD `ad5c9c9`). The 6 "VPP location token" / "VPP (Apps and Books) location token" prose + table-cell mentions across `docs/admin-setup-ios/05-app-deployment.md` and `docs/admin-setup-macos/04-app-deployment.md` are surgically renamed to the canonical "content token" per PITFALLS:657 first-mention-per-H2 convention (full compound form on first prose mention per H2, short form in table cells, one OP-10 blockquote callout above each `## Renewal / Maintenance` table for isolation-readers).

The entire SWEEP-02 surface lands as ONE atomic indivisible commit so `git revert <SWEEP-02-SHA>` cleanly restores the v1.6-close baseline for all 5 edited files byte-identically — per CONTEXT.md D-04 Option E rollback semantics ("SWEEP-01 and SWEEP-02 are logically independent — a clean revert per requirement is the desired property").

## Atomic Commit SHA + `git log --name-only -1 HEAD` Output Verbatim

```
commit 55260b3e9d2c2ef52314f285b9e672d2e6157f1c
Author: Schweinehund <xschweinehundx@gmail.com>
Date:   Tue May 26 11:16:17 2026 -0500

    docs(67-02): SWEEP-02 — VPP location token -> content token surgical rename (6 occurrences / 2 files) + sidecar resolved + 2 VH rows

.planning/phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/67-ANCHOR-INVENTORY.md
docs/_glossary-macos.md
docs/admin-setup-ios/05-app-deployment.md
docs/admin-setup-macos/04-app-deployment.md
scripts/validation/v1.6-audit-allowlist.json
```

Exactly 5 files in ONE atomic commit. Verified at success criterion #1 (atomic boundary).

## D-03 Rewrites Checklist (all 6 verbatim per CONTEXT.md D-03 table)

| # | File:PreLine | Containing H2 | Verbatim BEFORE | Verbatim AFTER | Status |
|---|---|---|---|---|---|
| 1 | `admin-setup-ios/05-app-deployment.md:71` | `## Prerequisites` > `### VPP Prerequisites` (first mention in H2) | `- VPP (Apps and Books) location token uploaded to Intune (Tenant administration > Connectors and tokens > Apple VPP tokens)` | `- Content token (formerly VPP location token; still labeled "Apple VPP token" in Intune) uploaded to Intune (Tenant administration > Connectors and tokens > Apple VPP tokens)` | ✅ landed (compound form per PITFALLS:657) |
| 2a | `admin-setup-ios/05-app-deployment.md:196` (INSERT) | above `## Renewal / Maintenance` H2 | (no callout) | `> **Note:** Apple calls this artifact a "content token" (formerly "VPP location token"); Microsoft Intune labels it "Apple VPP token" under \`Tenant administration > Connectors and tokens > Apple VPP tokens\`. Same artifact, different vendor terminology.` + blank line | ✅ landed (OP-10 blockquote callout) |
| 2b | `admin-setup-ios/05-app-deployment.md:201` → ~L203 post-callout | `## Renewal / Maintenance` table cell | `\| VPP (Apps and Books) location token \| Annual (365 days) \| …` | `\| Content token \| Annual (365 days) \| …` (rest of row byte-identical) | ✅ landed (short form in table) |
| 3 | `admin-setup-macos/04-app-deployment.md:45` | `## Prerequisites` > `### VPP/Apps and Books Prerequisites` (first mention in H2) | `- Apple Business Manager account with active VPP location token` | `- Apple Business Manager account with an active content token (formerly VPP location token; still labeled "Apple VPP token" in Intune)` | ✅ landed (compound form) |
| 4 | `admin-setup-macos/04-app-deployment.md:46` | same H2, subsequent mention | `- VPP location token uploaded to Intune (Tenant administration > Connectors and tokens > Apple VPP tokens)` | `- Content token uploaded to Intune (Tenant administration > Connectors and tokens > Apple VPP tokens)` | ✅ landed (short form, subsequent mention) |
| 5 | `admin-setup-macos/04-app-deployment.md:113` | `## VPP / Apps and Books` (first mention in different H2) | `2. Verify the VPP location token is active and synced.` | `2. Verify the content token (formerly VPP location token; still labeled "Apple VPP token" in Intune) is active and synced.` | ✅ landed (compound form fires again at new H2) |
| 6a | `admin-setup-macos/04-app-deployment.md:143` (INSERT) | above `## Renewal / Maintenance` H2 | (no callout) | Same `> **Note:** …` blockquote callout as 2a | ✅ landed (OP-10 callout, one per doc) |
| 6b | `admin-setup-macos/04-app-deployment.md:148` → ~L150 post-callout | `## Renewal / Maintenance` table cell | `\| VPP location token \| Annual (365 days) \| …` | `\| Content token \| Annual (365 days) \| …` (rest of row byte-identical) | ✅ landed (short form in table) |
| VH-iOS | `admin-setup-ios/05-app-deployment.md` tail-table (after existing 2026-04-16 row, oldest-first append per plan text line 491) | (existing unheaded `\| Date \| Change \| Author \|` table) | (no row) | `\| 2026-05-26 \| Phase 67 (SWEEP-02): renamed "VPP (Apps and Books) location token" to "content token" per Apple 2026-04-14 rebrand (L71, L201); added Apple-vs-Intune label disambiguation callout above Renewal/Maintenance table; PITFALLS.md CI-2 closure \| -- \|` | ✅ landed (oldest-first append; no H2 promoted per D-01) |
| VH-mac | `admin-setup-macos/04-app-deployment.md` tail-table (after existing 2026-04-14 Initial row, oldest-first append per plan text line 494) | (existing unheaded `\| Date \| Change \| Author \|` table) | (no row) | `\| 2026-05-26 \| Phase 67 (SWEEP-02): renamed "VPP location token" to "content token" per Apple 2026-04-14 rebrand (L45, L46, L113, L148); added Apple-vs-Intune label disambiguation callout above Renewal/Maintenance table; PITFALLS.md CI-2 closure \| -- \|` | ✅ landed (oldest-first append; no H2 promoted per D-01) |

**Substring sanity matrix (post-commit verification):**

| Check | Pattern | Expected | Actual |
|---|---|---|---|
| iOS compound (L71) | `Content token \(formerly VPP location token; still labeled "Apple VPP token" in Intune\)` | ≥1 | **1** |
| macOS compound (L45 + L113) | `content token \(formerly VPP location token; still labeled "Apple VPP token" in Intune\)` | ≥2 | **2** |
| macOS L46 short form | `^- Content token uploaded to Intune` | ≥1 | **1** |
| iOS callout | `> \*\*Note:\*\* Apple calls this artifact a "content token"` | =1 | **1** |
| macOS callout | `> \*\*Note:\*\* Apple calls this artifact a "content token"` | =1 | **1** |
| iOS VH row | `\| 2026-05-26 \| Phase 67 \(SWEEP-02\)` | =1 | **1** |
| macOS VH row | `\| 2026-05-26 \| Phase 67 \(SWEEP-02\)` | =1 | **1** |
| Glossary coord row | `\| 2026-05-26 \| Phase 67 \(SWEEP-02\): coordinating row` | =1 | **1** |
| iOS FM bump | `^last_verified: 2026-05-26` | =1 | **1** |
| macOS FM bump | `^last_verified: 2026-05-26` | =1 | **1** |
| Glossary FM bump | `^last_verified: 2026-05-26` | =1 | **1** |
| Sidecar 6 annotations | `"resolved_2026_05_26": true` | =6 | **6** |
| **PITFALL-6 H2 at line 121** | `^## Version History` at lineNumber 121 | =1 | **1** |

**Legacy-leak check (post-commit):**

| Check | Pattern (with VH-row + "formerly" excluded) | Expected | Actual |
|---|---|---|---|
| iOS leaked legacy mentions | `'VPP (Apps and Books) location token' -SimpleMatch \| Where { $_.Line -notmatch 'Phase 67' -and $_.Line -notmatch 'formerly' }` | =0 | **0** |
| macOS leaked legacy mentions | `'VPP location token' -SimpleMatch \| Where { $_.Line -notmatch 'Phase 67' -and $_.Line -notmatch 'formerly' }` | =0 | **0** |

All surviving textual references to the legacy term are in (a) the new VH rows themselves and (b) the "(formerly VPP location token; still labeled …)" parenthetical disambiguation — both intentional per CONTEXT.md D-03.

## 2 Callout Block Insertions (Verbatim Text — One Per Doc)

Both callouts use the **same blockquote text** per CONTEXT.md D-03 rows 2a + 6a (the "Apple-vs-Intune label disambiguation" OP-10 pattern adapted from Phase 64 `11-vpp-catalog-runbook.md:35-39`).

**iOS callout (inserted above `## Renewal / Maintenance` H2 at pre-edit line 197):**

```
> **Note:** Apple calls this artifact a "content token" (formerly "VPP location token"); Microsoft Intune labels it "Apple VPP token" under `Tenant administration > Connectors and tokens > Apple VPP tokens`. Same artifact, different vendor terminology.
```

Blank-line discipline preserved: ONE blank line BEFORE the `>` block (separating from the preceding `## Configuration-Caused Failures` table's last row); ONE blank line AFTER (separating from the H2 `## Renewal / Maintenance` heading).

**macOS callout (inserted above `## Renewal / Maintenance` H2 at pre-edit line 144):** identical blockquote text; same blank-line discipline.

After both INSERTs, the `## Renewal / Maintenance` H2 shifted from line 197 → ~199 on iOS, and from line 144 → ~146 on macOS. The table-cell rewrites (EDIT-E/EDIT-F) were applied to the table rows BEFORE the inserts so the line-shift was non-load-bearing for the edits (the BEFORE/AFTER text was unique enough to match unambiguously).

## 3 Frontmatter `last_verified` Bumps

| File | Before | After |
|---|---|---|
| `docs/admin-setup-ios/05-app-deployment.md:2` | `last_verified: 2026-04-18` | `last_verified: 2026-05-26` |
| `docs/admin-setup-macos/04-app-deployment.md:2` | `last_verified: 2026-04-14` | `last_verified: 2026-05-26` |
| `docs/_glossary-macos.md:2` | `last_verified: 2026-05-05` | `last_verified: 2026-05-26` (Claude's Discretion for traceability symmetry — file's H2 table is edited) |

Other frontmatter fields (`review_by`, `applies_to`, `audience`, `platform`) byte-identical pre-edit/post-edit.

## Glossary Coordinating Row

`docs/_glossary-macos.md` `## Version History` H2 at line 121 (PITFALL-6 anchor invariant preserved): new row inserted at line 125 immediately after the separator at line 124 per newest-first convention (67-PATTERNS.md:146).

```
| 2026-05-26 | Phase 67 (SWEEP-02): coordinating row for VPP location token → content token surgical rename in admin-setup-ios/05- + admin-setup-macos/04-app-deployment.md (PITFALLS.md CI-2 closure) | -- |
```

The existing 2026-05-05 Phase 59 (CLEAN-08) row shifted from line 125 → line 126; all other rows shift +1 line below. The `## Version History` H2 at line 121 remains at line 121 (verified by Wave 7 anchor diff).

## Sidecar Diff Summary

`scripts/validation/v1.6-audit-allowlist.json` `c13_rotting_external.ci_2_vpp_location_token` (6 entries — lines 87-92 pre-edit):

| Block | Pre-Plan-67-02 | Post-Plan-67-02 |
|---|---|---|
| `ci_2_vpp_location_token.length` | 6 | 6 (preserved — V-66-02 stable) |
| Entries with `resolved_2026_05_26: true` | 0 | 6 (all annotated) |
| Entry `file`/`line`/`term`/`context`/`reason`/`category` fields | (per v1.6-close baseline) | (BYTE-IDENTICAL — only the new field appended) |
| Single-line compact shape | preserved | preserved (each entry on one line) |
| `c13_rotting_external.ci_1_abm_urls` | 4 entries with `last_revalidated:2026-05-26` (Plan 67-01) | UNCHANGED (Plan 67-02 did not touch ci_1) |
| `c13_rotting_external.ci_3_managed_apple_id` | 16-file count list + total_corpus_count:45 (deferred to v1.8+) | UNCHANGED (CI-3 out of v1.7 scope per REQUIREMENTS.md:65) |
| `quarterly_audit.cadence` | `"0 8 1 1,4,7,10 *"` | `"0 8 1 1,4,7,10 *"` (byte-identical) |
| `c16_missing_endpoint_exemptions.length` | 0 | 0 (V-62-SIDECAR canary stable) |
| JSON parses cleanly | Yes | Yes (`node -e "JSON.parse(...)"` prints `JSON OK`) |
| Total diff size (`git diff --stat`) | n/a | 6 insertions + 6 deletions (single-line entry rewrites) — NO CRLF/LF drift |

Note: the sidecar `line` fields (71, 201, 45, 46, 113, 148) are PRESERVED as the v1.6-close baseline calibrated enumeration. Post-edit corpus lines have shifted by the callout inserts (line 201 → ~203 on iOS; line 148 → ~150 on macOS), but the sidecar records the historical enumeration at HEAD `ad5c9c9`, not current-state. Per CONTEXT.md D-04 ANNOTATE-not-remove, entries are NOT re-derived to current state — Phase 70 HARNESS-02 will fork `v1.7-audit-allowlist.json` with these entries reset (or dropped) for the v1.7 clean-slate; the v1.6 sidecar retains the annotated history.

## PITFALL-6 Outcome (Wave 7 Anchor Zero-Shift Diff)

Pre-edit anchor inventory captured into `_tmp-glossary-anchors-pre.txt`; post-edit inventory captured into `_tmp-glossary-anchors-post.txt`. `git diff --no-index` between the two files:

```
<empty>
```

Exit code 0, zero stdout/stderr output — files byte-identical. **The `## Version History` H2 remains at line 121 post-edit.** All 18 H1/H2/H3 anchors enumerated in `67-ANCHOR-INVENTORY.md` retained their original line positions; the intra-table row insertion at line 125 shifted only the existing 2026-05-05 row from line 125 → line 126 (allowed; below the PITFALL-6 boundary at line 121).

The full pre-edit + post-edit + diff result is embedded inline in `.planning/phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/67-ANCHOR-INVENTORY.md` under the `## Post-Edit Verification (Wave 7 — captured 2026-05-26)` H2 per Phase 65 precedent.

## Pre-Commit + Post-Commit Validator Exit Codes

All 3 validators ran BEFORE `git add` (Wave 8 dry-run triple) and AFTER the atomic commit (Wave 10 post-commit verify). Identical exit codes both passes — confirms Plan 67-02 introduced **zero validator regression**.

| Validator | Pre-Commit Dry-Run | Post-Commit Re-Run | Notes |
|-----------|-------------------:|-------------------:|-------|
| `v1.6-milestone-audit.mjs` | `0` (15 PASS / 0 FAIL / 0 SKIPPED) | `0` (15 PASS / 0 FAIL / 0 SKIPPED) | **The actual milestone-audit gate — PASS** all 15 checks (C1-C16). C11 banned patterns do NOT match `content token` / `Apple VPP token` / `VPP location token`; C14 unaffected (not a 3-canonical-site edit); C15 inert (both SWEEP-02 files outside `appleBusinessDocPaths()` scope per v1.6-milestone-audit.mjs:93-124); C16 cross-link integrity triangle PASS. |
| `check-phase-62.mjs` | `1` (28 PASS / 1 FAIL / 5 SKIPPED) | `1` (28 PASS / 1 FAIL / 5 SKIPPED) | **Pre-existing FAIL** (NOT Phase 67-02 regression — IDENTICAL to Plan 67-01 baseline per 67-01-SUMMARY.md): V-62-ANCHORS reports `.planning/phases/62-apple-business-foundation-rebrand/62-ANCHOR-INVENTORY.md missing` because file was archived to `.planning/milestones/v1.6-phases/62-*/` after v1.6 close. This is Phase 68 Pillar B CHAIN-02 archive-path-detection scope per STATE.md:142; out-of-scope for Phase 67. V-62-SIDECAR PASS (c16==0 canary stable); V-62-AUDIT PASS (harness 15/15). |
| `check-phase-66.mjs` | `1` (19 PASS / 4 FAIL / 5 SKIPPED) | `1` (19 PASS / 4 FAIL / 5 SKIPPED) | **Pre-existing FAILs cascade** from V-62-ANCHORS root: V-66-CHAIN-62/63/64/65 all FAIL because they each spawn check-phase-NN.mjs which transitively imports the archived 62-ANCHOR-INVENTORY.md path. Same Phase 68 CHAIN-02 scope. V-66-02 sidecar shape check PASS (c13_rotting_external still object + `quarterly_audit.cadence` literal preserved). V-66-AUDIT PASS. CHAIN_SKIP {48,51,58,60,61} fires correctly. |

**Critical interpretation (mirrors Plan 67-01 SUMMARY):** The harness (`v1.6-milestone-audit.mjs`) — which is the actual milestone-audit gate per CONTEXT.md D-03 line 99 — remains 15/15 PASS. The pre-existing `check-phase-62.mjs` / `check-phase-66.mjs` cascade FAILs are documented in Plan 67-01 SUMMARY observation #1 and STATE.md:142 as Phase 68 Pillar B CHAIN-02 archive-path-detection scope. Plan 67-02 did NOT introduce these FAILs — exit codes are byte-equivalent pre/post-edit and pre/post-commit, proving zero new regression.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking Issue] Tail-table Version History row ordering correction (executor self-correction during Wave 4 APPEND-VH-iOS)**

- **Found during:** Wave 4 APPEND-VH-iOS (first attempt)
- **Issue:** First attempt placed the new `| 2026-05-26 | Phase 67 (SWEEP-02) ...` row at the TOP of the unheaded tail-table (between the separator `|------|--------|--------|` and the existing `| 2026-04-18 | Resolved iOS L1 runbook cross-references | -- |` row), assuming newest-first convention by analogy with the glossary `## Version History` H2 table. However, plan text line 491 explicitly states "Position: insert as the LAST row of the table (after the existing line-227 row `| 2026-04-16 | Initial version ...`)". The unheaded tail-table convention in admin-setup-* files is OLDEST-FIRST append-only — distinct from the glossary's newest-first H2 convention.
- **Fix:** Reverted the misplaced row and re-applied as the LAST row of the iOS file's tail-table (after the existing 2026-04-16 "Initial version" row). Same oldest-first append applied to the macOS file's tail-table (after the existing 2026-04-14 "Initial version -- DMG, PKG ..." row). The glossary `## Version History` H2 table separately uses newest-first per 67-PATTERNS.md:146 — that convention was honored correctly on the first attempt (new row at line 125 directly after the separator at line 124, above the existing 2026-05-05 row).
- **Files modified:** `docs/admin-setup-ios/05-app-deployment.md` (tail-table append corrected) — the macOS file got the convention right on first attempt because the executor learned from the iOS correction.
- **Tracked as:** `[Rule 3 - Blocking Issue]` — incorrect convention application that would have produced a non-conforming tail-table ordering (oldest-row-not-last). Self-corrected before commit.
- **Commit:** N/A (working-tree-only correction; final state was correct before staging).

### Observations (not deviations, worth documenting)

**1. Pre-existing chain-cascade FAIL in check-phase-62.mjs + check-phase-66.mjs from archive-path drift (identical to Plan 67-01 baseline)**

- **Observation:** The pre-commit dry-run + post-commit re-run both reported `check-phase-62.mjs` exits 1 (V-62-ANCHORS missing archived file) and `check-phase-66.mjs` exits 1 (V-66-CHAIN-62/63/64/65 cascade from V-62-ANCHORS root). These were documented in Plan 67-01-SUMMARY.md observation #1 as pre-existing baselines unrelated to Phase 67 — STATE.md:142 + `check-phase-66.mjs:50-54` documented root causes.
- **Impact:** None on Plan 67-02 — exit codes IDENTICAL pre-edit and post-edit and post-commit. The harness (`v1.6-milestone-audit.mjs`, the actual milestone-audit gate per CONTEXT.md D-03 line 99) still exits 0 with 15/15 PASS, satisfying the plan's primary verification target.
- **Scope:** Out-of-scope for Plan 67-02 per the Scope Boundary rule. Phase 68 Pillar B CHAIN-02 is the scheduled remediation surface.
- **Action taken:** Logged in this SUMMARY + atomic commit message body; no fix attempted (would violate Scope Boundary and prematurely consume Phase 68 scope).

### Authentication Gates

None encountered. No credentials touched (all edits are local Markdown rewrites + JSON additive annotation + planning artifact creation; no external network calls — Plan 67-01 already verified the 4 ABM URLs).

## Stub Tracking

No stubs introduced. All edits are concrete content (verbatim D-03 text); the new VH rows + glossary coordinating row + callout blocks are fully populated with author "-- " placeholder per the existing convention (same pattern as all existing rows in the same tables).

## Known Stubs

None.

## Threat Flags

None — Plan 67-02 introduced no new network endpoints, no new auth paths, no schema changes at trust boundaries. The edits matched the plan's `<threat_model>` register exactly:
- T-67-02-D03 (text renegotiation drift): mitigated by verbatim D-03 application; substring sanity checks confirm all 8 edits landed verbatim
- T-67-02-PF6 (PITFALL-6 anchor drift): mitigated by Wave 1 pre-edit inventory + Wave 7 post-edit zero-shift diff; `## Version History` H2 stays at line 121
- T-67-02-JS (JSON syntax corruption): mitigated by JSON parse guard (`JSON OK` printed) + git diff size check (6 lines as expected; no CRLF/LF drift)
- T-67-02-VI (silent validator regression): mitigated by Wave 8 dry-run + Wave 10 post-commit verify both showing identical exit codes; harness inertia confirmed by construction
- T-67-02-A1 (atomic violation): mitigated by `git log --name-only -1 HEAD` confirming exactly 5 files in ONE SHA; single git revert would cleanly restore baseline
- T-67-02-AR (anti-regression): mitigated by `<files>` block enumerating 5 files explicitly; STATE.md:122-130 invariants honored (no hub-file / capability-matrix / older-workflow file touched); 3 additional VPP-token sites in `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` are out of Phase 67 scope per 67-CONTEXT.md and not touched
- T-67-02-SC (npm/pip/cargo installs): n/a — zero external packages installed

## Self-Check: PASSED

All claims in this SUMMARY were programmatically verified post-commit:

| Check | Item | Result |
|-------|------|--------|
| 1.a | `67-ANCHOR-INVENTORY.md` exists at `.planning/phases/67-.../` | FOUND |
| 1.b | `67-02-SUMMARY.md` will exist at `.planning/phases/67-.../` (this file) | (this file is being written) |
| 2.a | `docs/admin-setup-ios/05-app-deployment.md` modified | FOUND (M in `git status --short`; staged + committed) |
| 2.b | `docs/admin-setup-macos/04-app-deployment.md` modified | FOUND |
| 2.c | `docs/_glossary-macos.md` modified | FOUND |
| 2.d | `scripts/validation/v1.6-audit-allowlist.json` modified | FOUND |
| 3 | Commit `55260b3` exists in `git log --oneline --all` | FOUND |
| 4 | iOS compound form (L71): `Content token (formerly VPP location token; still labeled "Apple VPP token" in Intune)` | 1 occurrence (≥1 expected) |
| 5 | macOS compound form (L45+L113): same pattern | 2 occurrences (≥2 expected) |
| 6 | macOS L46 short form `^- Content token uploaded to Intune` | 1 occurrence (≥1 expected) |
| 7 | iOS OP-10 callout block | 1 occurrence (=1 expected) |
| 8 | macOS OP-10 callout block | 1 occurrence (=1 expected) |
| 9 | iOS VH row (Phase 67 SWEEP-02 + date 2026-05-26) | 1 occurrence (=1 expected) |
| 10 | macOS VH row (Phase 67 SWEEP-02 + date 2026-05-26) | 1 occurrence (=1 expected) |
| 11 | Glossary coordinating row | 1 occurrence (=1 expected) |
| 12 | All 3 frontmatter `last_verified: 2026-05-26` bumps | 3 occurrences (=3 expected) |
| 13 | Sidecar 6 `resolved_2026_05_26: true` annotations | 6 occurrences (=6 expected) |
| 14 | PITFALL-6 — `## Version History` H2 at line 121 in `_glossary-macos.md` | 1 occurrence at LineNumber 121 (PITFALL-6 invariant satisfied) |
| 15 | iOS leaked legacy mentions (outside VH-row + "formerly" parenthetical) | 0 occurrences (=0 expected) |
| 16 | macOS leaked legacy mentions (outside VH-row + "formerly" parenthetical) | 0 occurrences (=0 expected) |
| 17 | Sidecar JSON parses cleanly | `JSON OK` |
| 18 | Sidecar shape: `ci_2_vpp_location_token.length==6` AND `filter(resolved_2026_05_26===true).length==6` | `entries:6 annotated:6` |
| 19 | Atomic commit `git log --name-only -1 HEAD` lists exactly 5 in-scope files | 5/5 (no out-of-scope leakage) |
| 20 | Post-commit `v1.6-milestone-audit.mjs` exit code | `0` (15 PASS / 0 FAIL / 0 SKIPPED — identical to pre-commit + identical to Plan 67-01 baseline) |
| 21 | Post-commit `check-phase-62.mjs` + `check-phase-66.mjs` exit codes | `1` + `1` — IDENTICAL to pre-commit + IDENTICAL to Plan 67-01 baseline (pre-existing archive-path FAILs; Phase 68 scope) |

All 12 plan `<success_criteria>` items + 11 plan `<verify>` table rows satisfied (or matched the documented Plan 67-01 baseline for the 2 pre-existing FAILs).

## Wave 3 Handoff to Plan 67-03

Plan 67-03 (Phase 67 close-gate) is ready to execute. Inputs available:
- `scripts/validation/v1.6-audit-allowlist.json` final state: 4 ci_1 entries annotated `last_revalidated:2026-05-26` (Plan 67-01) + 6 ci_2 entries annotated `resolved_2026_05_26:true` (Plan 67-02); 6-entry + 4-entry shapes preserved; V-66-02 stable
- `.planning/phases/67-.../67-VERIFICATION.md` draft (from Plan 67-01): currently contains `## SWEEP-01: ABM URL Live-State Verification (2026-05-26)` H2 with 4 H3 sub-blocks. Plan 67-03 will append `## SWEEP-02: VPP location token → content token surgical rename (2026-05-26)` H2 + `## Section B — Commands Run + Exit Codes` table + `## Success Criteria Satisfaction (ROADMAP.md SC#1-4)` block + `## V-67-NN Final State` table.
- The harness 15/15 PASS state is the actual close-gate evidence. Plan 67-03 traceability-flips will mark SWEEP-01 + SWEEP-02 Active→Validated in REQUIREMENTS.md / PROJECT.md / ROADMAP.md / STATE.md with closing commit SHAs `3fb8ca5` (SWEEP-01) + `55260b3` (SWEEP-02).
- Pre-existing chain-cascade FAILs (V-62-ANCHORS missing archived file → V-66-CHAIN-62/63/64/65) are explicitly Phase 68 Pillar B CHAIN-02 scope per STATE.md:142 — Plan 67-03 close-gate documents them in `67-VERIFICATION.md` as "not Phase 67 regression; identical exit codes pre/post-edit confirms byte-equivalent regression footprint."

## Rollback

```
git revert 55260b3e9d2c2ef52314f285b9e672d2e6157f1c
```

Cleanly restores v1.6-close corpus baseline for the 2 SWEEP-02 files + glossary + sidecar byte-identically (per CONTEXT.md D-04 Option E line 153-154: "git revert <Plan 67-02 SHA> cleanly restores v1.6-close baseline ... per-plan boundary"). Per-plan independence preserved — `git revert <Plan 67-01 SHA>` and `git revert <Plan 67-02 SHA>` are independently safe operations.

## Anti-Regression Confirmation

Zero hub-file edits (`docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`, `docs/operations/00-index.md`, `docs/index.md` all byte-unchanged). Zero capability-matrix edits (`macos-capability-matrix.md`, `ios-capability-matrix.md`, `4-platform-capability-comparison.md` all byte-unchanged — C12 240-cell math + D-13/D-18 sibling-anchor-pin contract preserved). Zero older-workflow file edits (REQUIREMENTS.md:64 invariant honored). Zero edits to the 3 additional VPP-token sites in `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` (out-of-scope per 67-CONTEXT.md; Phase 70 v1.7-DEFERRED-CLEANUP.md picks them up). PITFALL-6 anchor at line 121 in `_glossary-macos.md` preserved (Wave 7 diff: empty).

The v1.7 Pillar A "Low-Risk Warm-Up" pattern (atomic small edits + Version History rows + chain validator re-runs identical to baseline) has been demonstrated successfully across both Plan 67-01 (SWEEP-01) and Plan 67-02 (SWEEP-02). Plan 67-03 close-gate completes Phase 67.
