---
phase: 126-publish-bundle-pipeline-guard-blocker-corpus-fixes
verified: 2026-07-10T23:00:00Z
status: passed
score: 10/10 must-haves verified
overrides_applied: 0
---

# Phase 126: Publish-Bundle Pipeline + Guard-Blocker Corpus Fixes Verification Report

**Phase Goal:** A deterministic batch orchestrator converts every registry Status:Approved doc (221) to .docx, guards each fail-closed, and — on a clean pass — emits a single versioned docs-library-v1.17.zip (flat, descriptively-named, with a coverage manifest and asserted registry parity). The two known guard-docx.mjs blockers are folded in so the full Approved corpus guards clean end-to-end.
**Verified:** 2026-07-10
**Status:** passed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Orchestrator converts every registry Status:Approved doc (221) via convert.ps1, registry-driven (never a glob) | ✓ VERIFIED | `build-publish-bundle.mjs` imports `parseRegistry` from `build-filename-map.mjs` and filters `.status === 'Approved'`; self-test `(a)` asserts `rows.length === 221`; real run log line `Registry parity: 221 Approved rows, 221 staged, 0 excluded, 0 missing, 0 orphan.` |
| 2 | guard-docx.mjs runs on every staged .docx; fail-closed (any failure ⇒ no zip, non-zero exit) | ✓ VERIFIED | `guardOne()` invoked once per staged docx (`build-publish-bundle.mjs:382-390`); `totalFailures > 0` blocks zip write with `process.exit(1)` before manifest/zip code (lines 392-399); SUMMARY documents a genuine isolated scratch-dir negative-path run (leaked-YAML fixture → `GUARD-FAIL`, exit 1, no zip in scratch dir, real corpus/zip untouched) |
| 3 | The full 221-doc Approved corpus guards clean end-to-end (HYG-02/03 folded in) | ✓ VERIFIED | Real full-corpus run just re-executed for this verification: exit 0, log `Batch complete: 221 docx converted+guarded+staged, 0 errors.`; `dist/docs-library-v1.17.zip` present and matches expected contents (see Artifacts) |
| 4 | Single versioned dist/docs-library-v1.17.zip, flat, descriptively-named .docx (citation title = filename per filename-map.md) | ✓ VERIFIED | Zip inspected directly via `System.IO.Compression.ZipFile`: 223 entries total, 221 `.docx` + `manifest.csv` + `README.md`, 0 entries containing `/` (flat root). Spot-check: RE-002=`device-not-registered-in-autopilot.docx`, RE-003=`esp-stuck-or-failed.docx`, RE-005=`network-connectivity-failure.docx` — all present in zip and match `filename-map.md` rows exactly |
| 5 | In-zip manifest + asserted registry parity (every Approved row once, no orphans), counts logged | ✓ VERIFIED | `manifest.csv` extracted from zip: 223 lines (header + 221 rows + trailing newline), header exactly `RE-ID,Output Filename,Status,Last Verified` (no source-path, no sha256 column, per D-03); `checkParity()` (PUB-04) asserted before zip write, self-test `(d1)` proves fail-closed on synthetic missing/orphan |
| 6 | HYG-02: stale phase_46_wave2_retrofit key gone from all 5 affected Approved docs | ✓ VERIFIED | `grep -rn "phase_46_wave2_retrofit" docs/` returns 0 matches (re-run directly, not just trusted from SUMMARY) |
| 7 | HYG-03: 9 DEFER-121-07-A files free of literal YYYY-MM-DD; 4 legit-content carve-outs untouched; no corpus-wide gate | ✓ VERIFIED | All 9 named files individually grepped: 0 matches each. All 4 carve-out files individually grepped: non-zero counts confirmed (7, 6, 1, 1 respectively) — proving no corpus-wide gate was applied |
| 8 | Locked decisions D-01..D-12 honored (gitignored zip, CSV manifest w/o sha256, no SOURCE_DATE_EPOCH, fail-closed always-full/sequential, D-12 divergence guard) | ✓ VERIFIED | `git check-ignore dist .pipeline-output` confirms both ignored; `git status --short` shows no dist/ or .pipeline-output/ entries; manifest header confirmed above; `grep SOURCE_DATE_EPOCH` returns 0 matches in orchestrator/convert.ps1; `checkDivergence()` (D-12) implemented as exact `=== 'Draft'` equality and self-test-proven `(d2)` |
| 9 | CR-01 code-review blocker (duplicate Doc ID silently drops a doc while parity reports clean) is fixed | ✓ VERIFIED | `checkDocIdUniqueness()` runs before any Map/Set-keyed join, fails closed with `process.exit(1)` on any duplicate (`build-publish-bundle.mjs:294-304`); self-test `(c2)`/`(c3)` both pass |
| 10 | All 6 REVIEW.md warnings (WR-01..WR-06) addressed | ✓ VERIFIED | Commits `fb99963` (WR-01 CSV escaping), `aa83a60` (WR-02 atomic zip via temp+rename), `159952f` (WR-03 guardOne stderr capture), `6873844` (WR-04 top-level try/catch), `96b31b1` (WR-05 backslash-normalized traversal check), `105714f` (WR-06 convert.ps1 try/finally); all verified present in current file content, not just commit messages |

**Score:** 10/10 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `scripts/pipeline/build-publish-bundle.mjs` | Batch orchestrator (PUB-01..04), zero-npm-dependency Node, ≥120 lines | ✓ VERIFIED | 633 lines; imports `parseRegistry, readFile` from `./build-filename-map.mjs`; no npm deps (node:fs/path/url/child_process/process only) |
| `scripts/pipeline/build-filename-map.mjs` | Additive export of parseRegistry, readFile, slug + isMainModule guard | ✓ VERIFIED | `export function parseRegistry` confirmed present; `isMainModule` guard confirmed wrapping both self-test and main blocks (Rule 3 fix) |
| `scripts/pipeline/filename-map.md` | Regenerated RE-ID → output filename map, 221 rows | ✓ VERIFIED | Rows for RE-002/003/005 confirmed present and match zip contents |
| `dist/docs-library-v1.17.zip` | Runtime artifact, gitignored, 221 docx + manifest.csv + README.md, flat | ✓ VERIFIED | Directly inspected: 223 entries, 221 `.docx`, 0 nested paths, both `manifest.csv` and `README.md` present; gitignored and untracked |
| `docs/_glossary-android.md` + 4 siblings | HYG-02 stale-key removal | ✓ VERIFIED | `phase_46_wave2_retrofit` absent corpus-wide |
| 9 DEFER-121-07-A files | HYG-03 verify-only, no literal YYYY-MM-DD | ✓ VERIFIED | All 9 independently grepped clean |
| `scripts/pipeline/convert.ps1` | .tmp-leak fix (126-01) + WR-06 try/finally (126-02 review fix) | ✓ VERIFIED | Line 85-87 raw-tmp cleanup; lines 96-163 wrapped in try/finally with single unconditional `Remove-Item -LiteralPath $tempMd` in `finally` |

### Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| `build-publish-bundle.mjs` | `convert.ps1` | `execFileSync('pwsh', ['-NoProfile','-File','scripts/pipeline/convert.ps1', ...])` argv-array | ✓ WIRED | `convertOne()` confirmed at line 235-248; no `Invoke-Expression`/string-concat |
| `build-publish-bundle.mjs` | `guard-docx.mjs` | `execFileSync('node', ['scripts/pipeline/guard-docx.mjs', docxPath])`, once per file | ✓ WIRED | `guardOne()` confirmed at line 250-262, one path per call |
| `build-publish-bundle.mjs` | `Compress-Archive` | single pwsh shell-out after atomic promote (temp+rename per WR-02) | ✓ WIRED | Single `Compress-Archive` call at line 454-457, wrapped with `zipTmp` + `renameSync` |
| `build-publish-bundle.mjs` | `build-filename-map.mjs` | `import { parseRegistry, readFile } from './build-filename-map.mjs'` | ✓ WIRED | Confirmed at line 33; import-safe due to isMainModule guard |

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|---------------|--------|---------------------|--------|
| `dist/docs-library-v1.17.zip` | `approvedRows` → `convertedDocs` → `stagedDocs` | `parseRegistry(readFile('docs/_registry/RE-index.md'))` filtered to `.status === 'Approved'`, converted via real pandoc/pwsh subprocess calls | Yes | ✓ FLOWING — zip re-verified by direct extraction (not trusted from SUMMARY text); 221 real docx, real manifest rows with real per-doc frontmatter values (e.g. RE-001 `2026-06-29`, RE-002 `2026-03-20`) |

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| Self-test proves all fail-closed logic branches | `node scripts/pipeline/build-publish-bundle.mjs --self-test` | `11 passed, 0 failed` | ✓ PASS |
| HYG-02 corpus-wide grep | `grep -rn "phase_46_wave2_retrofit" docs/` | 0 matches (exit 1 = no match) | ✓ PASS |
| HYG-03 9-file + 4-carveout grep | per-file `grep -c "YYYY-MM-DD"` | 9 files = 0; 4 carve-outs = 7,6,1,1 | ✓ PASS |
| Zip flat-layout + count assertion | PowerShell `ZipFile.OpenRead` inspection | docx=221 flat=0 hasManifest=True hasReadme=True total=223 | ✓ PASS |
| Manifest header/column assertion | extracted `manifest.csv` from zip | header = `RE-ID,Output Filename,Status,Last Verified`, 223 lines | ✓ PASS |
| Filename spot-check (RE-002/003/005) | zip entry name lookup vs filename-map.md rows | all 3 match | ✓ PASS |
| No SOURCE_DATE_EPOCH introduced | `grep SOURCE_DATE_EPOCH` in orchestrator + convert.ps1 | 0 matches | ✓ PASS |
| Both build outputs gitignored | `git check-ignore dist .pipeline-output` | both printed (ignored) | ✓ PASS |
| Out-of-scope harness files not authored | `find . -iname "*check-phase-126*"`, `*v1.17-milestone-audit*`, `*v1.17-audit-allowlist*` | 0 matches | ✓ PASS |

### Probe Execution

No `scripts/*/tests/probe-*.sh` convention exists in this repo (Windows/pwsh-based pipeline, not a bash-probe-based migration tooling phase). The self-test harness (`--self-test`) serves the equivalent function and was executed directly above (11/11 PASS). Step 7c: SKIPPED — no probe-based verification convention applies to this phase.

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| PUB-01 | 126-02 | Registry-driven selection converts every Approved doc | ✓ SATISFIED | Self-test (a), real run log |
| PUB-02 | 126-02 | guard-docx.mjs fail-closed on every staged docx | ✓ SATISFIED | `guardOne`/`totalFailures` gate, negative scratch-dir proof in SUMMARY |
| PUB-03 | 126-02 | Single versioned flat zip, descriptive names | ✓ SATISFIED | Direct zip inspection, filename spot-checks |
| PUB-04 | 126-02 | In-zip manifest + registry parity asserted/logged | ✓ SATISFIED | `checkParity`, manifest header/row count verified |
| HYG-02 | 126-01 | Stale key removed from all 5 affected docs | ✓ SATISFIED | Corpus-wide grep 0 matches |
| HYG-03 | 126-01 | 9 files verified clean, 4 carve-outs untouched, no corpus gate | ✓ SATISFIED | Per-file grep counts |

No orphaned requirements: `.planning/REQUIREMENTS.md` maps only PUB-01..04, HYG-02, HYG-03 to Phase 126, and all 6 appear in the two plans' `requirements:` frontmatter. `HARN-09` (the only other requirement referencing check-phase-126.mjs/harness validators) is explicitly mapped to Phase 128 in REQUIREMENTS.md, not Phase 126 — confirmed absent from this phase's scope and absent from the codebase (see Behavioral Spot-Checks).

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| — | — | none found | — | `grep -i "TODO\|FIXME\|XXX\|TBD\|HACK\|PLACEHOLDER\|placeholder\|not yet implemented\|not available\|coming soon"` across all 3 phase-modified pipeline files returned 0 matches |

No debt markers, stub returns, or hardcoded-empty patterns found in `build-publish-bundle.mjs`, `build-filename-map.mjs`, or `convert.ps1`.

### Human Verification Required

None. All must-haves are programmatically verifiable (file/zip inspection, grep, self-test execution) and were independently re-confirmed against the live codebase and a freshly re-run full-corpus orchestrator pass, not taken on SUMMARY.md's word.

### Gaps Summary

None. All 6 requirement IDs (PUB-01..04, HYG-02, HYG-03) are satisfied with direct codebase evidence. The code-review-identified critical issue (CR-01, duplicate Doc ID) and all 6 warnings (WR-01..06) from `126-REVIEW.md` were subsequently fixed in dedicated commits, and each fix was independently re-verified in this pass (not merely trusted from commit messages) — the fail-closed logic, CSV escaping, atomic zip promotion, stderr capture, top-level error handling, Windows-separator-safe traversal guard, and convert.ps1's try/finally cleanup were all read directly from current file contents. Out-of-scope Phase-128 harness/validator artifacts (check-phase-126.mjs, v1.17-milestone-audit.mjs, V116 pin) are confirmed absent, consistent with the roadmap's phase boundary.

---

_Verified: 2026-07-10_
_Verifier: Claude (gsd-verifier)_
