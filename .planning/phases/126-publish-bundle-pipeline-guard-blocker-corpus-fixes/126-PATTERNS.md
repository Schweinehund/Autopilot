# Phase 126: Publish-Bundle Pipeline + Guard-Blocker Corpus Fixes - Pattern Map

**Mapped:** 2026-07-10
**Files analyzed:** 17 (1 new orchestrator + 2 modified pipeline scripts + 5 HYG-02 content edits + 9 HYG-03 verify-only)
**Analogs found:** 8 / 8 (files with code changes) — all with exact or role-match analogs from the existing `scripts/pipeline/` family; the 9 HYG-03 files are a verify-only pass with no code-change analog needed (see `## No Analog Found`).

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `scripts/pipeline/build-publish-bundle.mjs` (NEW) | utility / batch orchestrator | batch, file-I/O | `scripts/pipeline/retrofit-structural.mjs` (loop+collect-all-failures+report shape) + `scripts/pipeline/guard-docx.mjs` (per-file `execFileSync` invocation idiom) | exact (composite) |
| `scripts/pipeline/build-filename-map.mjs` (MODIFIED — additive `export`) | utility | transform | itself (additive-only change; self-test at lines 208-353 must stay green) | exact |
| `scripts/pipeline/convert.ps1` (MODIFIED — `.tmp`-leak fix) | utility / CLI wrapper | file-I/O | itself (surgical patch around line 85; do not touch the PIPE-03 logic below) | exact |
| `docs/_glossary-android.md` (MODIFIED — HYG-02, line 11) | content (frontmatter edit) | transform | the other 4 HYG-02 sibling files (identical key/line) | exact |
| `docs/admin-setup-android/03-fully-managed-cobo.md` (MODIFIED — HYG-02, line 11) | content (frontmatter edit) | transform | `docs/_glossary-android.md` line 11 | exact |
| `docs/admin-setup-android/04-byod-work-profile.md` (MODIFIED — HYG-02, line 11) | content (frontmatter edit) | transform | `docs/_glossary-android.md` line 11 | exact |
| `docs/reference/android-capability-matrix.md` (MODIFIED — HYG-02, line 11) | content (frontmatter edit) | transform | `docs/_glossary-android.md` line 11 | exact |
| `docs/android-lifecycle/03-android-version-matrix.md` (MODIFIED — HYG-02, line 11) | content (frontmatter edit) | transform | `docs/_glossary-android.md` line 11 | exact |
| 9 `DEFER-121-07-A` files (HYG-03, verify-only) | content (verify-only) | read-only / verification | commit `9031056` (Phase 121, already applied the fix this phase re-verifies) | exact (no-op expected) |
| Manifest CSV + in-zip README + zip (generated *inside* `build-publish-bundle.mjs`, not separate source files) | utility / output artifacts | file-I/O, batch | `writeMapFile()` in `build-filename-map.mjs` (array→lines→`writeFileSync`) for the CSV; `scripts/pipeline/README.md` §SC1/§SC3 for the static-instructions tone | role-match |

## Pattern Assignments

### `scripts/pipeline/build-publish-bundle.mjs` (NEW — utility, batch)

This is pure orchestration glue over three existing, already-green tools (`build-filename-map.mjs`, `convert.ps1`, `guard-docx.mjs`). No new conversion or guard logic belongs here (see RESEARCH.md "Don't Hand-Roll"). Composite pattern assembled from 3 analogs below.

**Imports pattern** (zero-npm-dependency convention — matches every file in `scripts/pipeline/*.mjs`, e.g. `guard-docx.mjs` lines 19-25 and `build-filename-map.mjs` lines 41-43):
```javascript
// Node built-ins ONLY -- zero external npm packages (matches scripts/pipeline/ convention)
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';
// Reuse, don't re-derive (RESEARCH.md Pattern 1) -- requires adding `export` to these three
// in build-filename-map.mjs (purely additive, does not change its own behavior or self-test):
import { parseRegistry, readFile, slug } from './build-filename-map.mjs';
```

**Registry-driven selection pattern** — reuse, never re-derive
(`scripts/pipeline/build-filename-map.mjs` lines 95-104, self-test-proven against the real 221-row registry at lines 266-275):
```javascript
function parseRegistry(content) {
  return content
    .split(/\r?\n/)
    .filter(l => /^\|\s*RE-\d+\s*\|/.test(l))   // excludes header/separator/prose rows by construction
    .map(l => {
      const cols = l.split('|').map(s => s.trim());
      return { docId: cols[1], path: cols[2], title: cols[3], docType: cols[4], status: cols[5] };
    });
}
```
Filter `.status === 'Approved'` on the parsed objects to get exactly 221 rows — **never** `grep -c Approved` (overcounts by 2 header-prose mentions; RESEARCH.md Pitfall 2).

**Frontmatter field extraction** (needed for the manifest's `frontmatter status`/`last_verified` columns and the D-12 divergence guard — new pattern, no prior analog in this repo, but matches the file's own "lighter-weight parse than a full YAML parser" zero-dependency convention):
```javascript
function readFrontmatterField(mdContent, key) {
  const fmMatch = mdContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) return null;
  const line = fmMatch[1].split(/\r?\n/).find(l => l.startsWith(key + ':'));
  return line ? line.slice(key.length + 1).trim() : null;
}
```

**Per-doc `execFileSync` invocation idiom** — copy directly from `guard-docx.mjs`'s `tryConvert()`
(`scripts/pipeline/guard-docx.mjs` lines 149-165), generalized for both `convert.ps1` and `guard-docx.mjs` calls:
```javascript
function convertOne(inputMd, outputDocx) {
  try {
    execFileSync('pwsh', [
      '-NoProfile', '-File', 'scripts/pipeline/convert.ps1',
      '-InputMd', inputMd, '-OutputDocx', outputDocx
    ], { stdio: 'pipe', cwd: process.cwd(), timeout: 60000 });
    return { ok: true };
  } catch (err) {
    return { ok: false, detail: ((err.stdout || '') + (err.stderr || '')).toString().slice(0, 500) };
  }
}

function guardOne(docxPath) {
  try {
    execFileSync('node', ['scripts/pipeline/guard-docx.mjs', docxPath],
      { stdio: 'pipe', cwd: process.cwd(), timeout: 30000 });
    return { ok: true };
  } catch (err) {
    // guard-docx.mjs is one-path-per-call ONLY (argv.find(a => !a.startsWith('--')) grabs the
    // first non-flag token; a 2nd path is silently ignored, not an error) -- always invoke once
    // per .docx, never batch multiple paths into one call.
    return { ok: false, detail: (err.stdout || '').toString() };
  }
}
```
Never use `Invoke-Expression`/string-concatenated shell commands — always the argv-array form shown above (`execFileSync(cmd, [args])`), matching `guard-docx.mjs`'s own convention and this repo's V5/Tampering mitigation (RESEARCH.md Security Domain).

**Collect-all-failures loop + padLabel reporting** — copy the shape (not the specific fields) from
`scripts/pipeline/retrofit-structural.mjs` `main()` (lines 665-763), which already establishes "loop N
files, collect results, decide pass/fail only after the full loop" for this exact repo family. Note the
padLabel helper itself (identical in `build-filename-map.mjs` lines 52-57 and `guard-docx.mjs` lines 192-196):
```javascript
// scripts/pipeline/build-filename-map.mjs lines 52-57 / guard-docx.mjs lines 192-196 (identical shape)
const LABEL_WIDTH = 72;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

// retrofit-structural.mjs lines 709-753 (shape to copy — sequential loop, D-06/D-07 compliant):
let errors = 0, processed = 0;
for (const doc of approvedDocs) {                          // D-06: sequential, not parallel
  const result = convertOne(doc.srcPath, doc.stagingOutPath);
  if (!result.ok) {
    errors++;
    process.stdout.write(padLabel(doc.docId) + 'CONVERT-FAIL -- ' + result.detail + '\n');
    continue;                                                // D-07: keep going, collect everything
  }
  const guarded = guardOne(doc.stagingOutPath);
  if (!guarded.ok) {
    errors++;
    process.stdout.write(padLabel(doc.docId) + 'GUARD-FAIL -- ' + guarded.detail + '\n');
    continue;
  }
  processed++;
  process.stdout.write(padLabel(doc.docId) + 'OK\n');
}
process.stdout.write('\nBatch complete: ' + processed + ' OK, ' + errors + ' ERROR(S)\n');
process.exit(errors > 0 ? 1 : 0);                             // D-07: no zip on any failure
```

**Manifest CSV generation** — same "build rows → join lines → single `writeFileSync`" shape as
`writeMapFile()` in `build-filename-map.mjs` (lines 180-205), swapped from an MD pipe-table to CSV per
D-03 (columns = RE-ID, output filename, frontmatter status, last_verified — no source path, no sha256):
```javascript
// Pattern source: scripts/pipeline/build-filename-map.mjs writeMapFile() lines 180-205
function writeManifestCsv(rows, outPath) {
  const header = 'RE-ID,Output Filename,Status,Last Verified';
  const lines = rows.map(r =>
    [r.docId, r.outputFilename, r.frontmatterStatus, r.lastVerified].join(','));
  writeFileSync(outPath, [header, ...lines].join('\n') + '\n', 'utf8');
}
```

**In-zip README** — static, deterministic Markdown, no per-run timestamps (D-04). Tone/structure
source: `scripts/pipeline/README.md` §SC1 (canonical invocation framing) and §SC3 (deployment-policy
framing, lines 53-59) — write as a hardcoded template string or a co-located static `.md` file the
orchestrator copies verbatim into the staging dir; do **not** interpolate `new Date()` or any run-specific value into it.

**Zip creation** — shell out once, at the very end, after `staging → promote` (D-07 atomic promote):
```powershell
# Verified live (RESEARCH.md Pattern 5): flattens staging dir contents into the zip root,
# matching PUB-03's "flat internal layout" with zero extra path-manipulation logic.
Compress-Archive -Path "$stagingDir\*" -DestinationPath "dist\docs-library-v1.17.zip" -Force
```
Invoke via the same `execFileSync('pwsh', [...])` idiom shown above — a single call, not per-file.

**Registry-parity assertion (PUB-04)** — new pattern (RESEARCH.md Code Examples), run after the loop, before promote:
```javascript
const approvedIds = new Set(approvedRows.map(r => r.docId));
const stagedIds = new Set(stagedResults.filter(r => r.ok).map(r => r.docId));
const missing = [...approvedIds].filter(id => !stagedIds.has(id));
const orphans = [...stagedIds].filter(id => !approvedIds.has(id));
if (missing.length || orphans.length) { /* fail closed -- never promote a partial/divergent bundle */ }
```

**D-12 divergence guard** — new pattern, composes `parseRegistry()`'s `status` field (EEE lifecycle) against
`readFrontmatterField(src, 'status')` (frontmatter vocabulary) for every Approved row; fail closed if any
registry-Approved row has frontmatter `status !== 'Approved'`.

**Self-test harness convention** (optional but strongly recommended to match family convention — see
`build-filename-map.mjs` lines 207-353 and `guard-docx.mjs` lines 198-329 for the `--self-test` / `stAssert()` shape):
```javascript
// scripts/pipeline/build-filename-map.mjs lines 211-215 (identical shape in guard-docx.mjs)
function stAssert(label, pass, detail) {
  const tag = pass ? 'PASS' : 'FAIL';
  process.stdout.write(padLabel('[ST] ' + label) + tag + (detail ? ' -- ' + detail : '') + '\n');
  if (pass) stPassed++; else stFailed++;
}
```

**CLI flags convention** (`argv.includes('--flag')`, no external argv-parsing library — matches
`build-filename-map.mjs` lines 45-47, `retrofit-structural.mjs` lines 59-60, `guard-docx.mjs` lines 37-39):
```javascript
const argv = process.argv.slice(2);
const DRY_RUN = argv.includes('--dry-run');
const SELF_TEST = argv.includes('--self-test');
```

---

### `scripts/pipeline/build-filename-map.mjs` (MODIFIED — additive `export` only)

**Analog:** itself (no external analog needed — this is a minimal, additive change to an existing file).

**Delta:** add `export` to 3 top-level function declarations only. Nothing else changes.
```javascript
// BEFORE (lines 60, 67, 95 — internal-only):
function readFile(relPath) { ... }
function slug(title) { ... }
function parseRegistry(content) { ... }

// AFTER (additive `export`, no behavior change):
export function readFile(relPath) { ... }
export function slug(title) { ... }
export function parseRegistry(content) { ... }
```
**Verification obligation:** the file's own `--self-test` mode (lines 208-353, includes the live
221-row registry-parse proof at lines 266-275) must still exit 0 after this change — it is a pure
additive export, but re-run the self-test to confirm nothing else regressed.

---

### `scripts/pipeline/convert.ps1` (MODIFIED — `.tmp`-leak fix)

**Analog:** itself. Surgical patch at line 85 only; do not touch the PIPE-03 rewrite/diff-guard logic
below it (lines 88-135, already correct and untouched by this defect).

**Before** (line 85):
```powershell
$tempMd = [System.IO.Path]::GetTempFileName() -replace '\.tmp$', '.md'
Copy-Item -Path $InputMd -Destination $tempMd -Force
```

**After** (minimal fix, verified live: eliminates the orphaned 0-byte `.tmp` per call — 133→134 files
in `$env:TEMP` reproduced before the fix):
```powershell
$rawTempFile = [System.IO.Path]::GetTempFileName()   # this call creates the orphan on disk
$tempMd = $rawTempFile -replace '\.tmp$', '.md'
Remove-Item -LiteralPath $rawTempFile -Force -ErrorAction SilentlyContinue  # clean it up immediately
Copy-Item -Path $InputMd -Destination $tempMd -Force
```
The existing `Remove-Item $tempMd -Force` calls (fail-closed abort path at ~line 130, post-conversion
cleanup at line 147) are unaffected — they already correctly clean up the `.md`-suffixed temp copy and
were never the source of the leak.

---

### HYG-02: 5-file stale-key removal (`docs/_glossary-android.md` + 4 siblings)

**Analog:** all 5 files carry the byte-identical line at line 11 (confirmed live via `grep -rn
"phase_46_wave2_retrofit"`):
```
docs/_glossary-android.md:11:phase_46_wave2_retrofit: 2026-04-25
docs/admin-setup-android/03-fully-managed-cobo.md:11:phase_46_wave2_retrofit: 2026-04-25
docs/admin-setup-android/04-byod-work-profile.md:11:phase_46_wave2_retrofit: 2026-04-25
docs/reference/android-capability-matrix.md:11:phase_46_wave2_retrofit: 2026-04-25
docs/android-lifecycle/03-android-version-matrix.md:11:phase_46_wave2_retrofit: 2026-04-25
```

**Full frontmatter context** (`docs/_glossary-android.md` lines 1-12 — representative of all 5):
```yaml
---
doc_id: RE-179
status: Approved
owner: Intune Admin Lead
doc_type: Reference
last_verified: 2026-06-29
review_by: 2026-09-27
applies_to: both
audience: all
platform: all
phase_46_wave2_retrofit: 2026-04-25
---
```

**Fix:** delete line 11 (`phase_46_wave2_retrofit: 2026-04-25`) from all 5 files — reformat-only,
`last_verified` untouched (D-10). This is the same defect class already logged as `DEFER-125-06-A` for
RE-179 (`_glossary-android.md`); RESEARCH.md Pitfall 1 confirms the other 4 trip the identical
`guard-docx.mjs` `CUSTOM-PROPS FAIL [phase_46_wave2_retrofit]` (`KNOWN_CUSTOM_PROPERTY_KEYS`,
`scripts/pipeline/guard-docx.mjs` lines 32-35) — the key `phase_46_wave2_retrofit` is outside the
known 9-key EEE set, so **all 5** files must be fixed or PUB-02's fail-closed batch gate never produces a zip.

---

### HYG-03: 9-file verify-only pass (`DEFER-121-07-A` files)

**No code-change analog needed** — this is a verification pass, not a rewrite (D-08). Confirm each of
the 9 named files no longer contains a literal `YYYY-MM-DD` (already fixed in commit `9031056`, Phase 121):

```
docs/_glossary.md
docs/_glossary-linux.md
docs/ios-lifecycle/00-enrollment-overview.md
docs/android-lifecycle/00-enrollment-overview.md
docs/android-lifecycle/01-android-prerequisites.md
docs/android-lifecycle/02-provisioning-methods.md
docs/android-lifecycle/03-android-version-matrix.md
docs/linux-lifecycle/00-enrollment-overview.md
docs/linux-lifecycle/01-linux-prerequisites.md
```
Verification command pattern (matches how Phase 121/122 verified this — see
`121-VERIFICATION.md` SC4 and `122-VERIFICATION.md` item 4): `grep -rn "YYYY-MM-DD" <each of the 9 paths>`
must return zero matches. If (only if) a gap is found, backfill from that file's own `last_verified`
frontmatter value (D-08 option c) — do not touch `last_verified` itself (D-10).
⚠ Note `docs/android-lifecycle/03-android-version-matrix.md` appears in **both** the HYG-02 5-file list
and this HYG-03 9-file list — it needs both the line-11 key removal AND the (expected no-op) date verify;
treat as one file with two independent checks, not a conflict.

## Shared Patterns

### Zero-npm-dependency Node convention
**Source:** every file in `scripts/pipeline/*.mjs` (`guard-docx.mjs` line 18, `build-filename-map.mjs`
line 40, `retrofit-structural.mjs` and siblings)
**Apply to:** `build-publish-bundle.mjs` — Node built-ins only (`node:fs`, `node:path`,
`node:child_process`, `node:process`). No `package.json` `dependencies` entry exists in this repo; do not
introduce one (no npm zip lib, no argv-parsing lib, no CSV lib — hand-roll the trivial CSV join shown above).

### Fail-closed exit-code contract
**Source:** `convert.ps1` (`exit 1` on any guard/version failure), `guard-docx.mjs` (`process.exit(failed
> 0 ? 1 : 0)`, line 361), `build-filename-map.mjs` (`process.exit(stFailed > 0 ? 1 : 0)`, self-test; `process.exit(1)`
on 0-parsed-rows or unresolved collision, lines 359-366)
**Apply to:** `build-publish-bundle.mjs` at every stage boundary — non-zero exit and **no zip written** on
any conversion failure, guard failure, registry-parity mismatch, or D-12 divergence.

### `execFileSync` argv-array subprocess invocation (never string-concatenated shell commands)
**Source:** `guard-docx.mjs` `tryConvert()`, lines 149-165; `resolvePandocBin()`, lines 126-143
**Apply to:** every `pwsh`/`node` shell-out inside `build-publish-bundle.mjs` — always the `(cmd, [argv...])`
array form with `{ stdio: 'pipe', cwd: process.cwd(), timeout: <ms> }`, never `exec()` or `Invoke-Expression`.

### `padLabel` + collect-all-failures batch reporting
**Source:** `build-filename-map.mjs` lines 52-57 (padLabel); `guard-docx.mjs` lines 192-196 (identical
padLabel); `retrofit-structural.mjs` `main()` lines 665-763 (the loop-collect-report shape, `--all`
enumeration + per-item PASS/ERROR label + final summary line + exit-code-from-error-count)
**Apply to:** `build-publish-bundle.mjs`'s conversion pass, guard pass, and final summary — one
consistent per-doc-id label format across all three stages.

### Registry-driven selection, never a glob
**Source:** `build-filename-map.mjs` `parseRegistry()` lines 95-104; `RE-index.md` header note (lines
9-13) distinguishing registry `Status` (EEE lifecycle) from frontmatter `status`
**Apply to:** `build-publish-bundle.mjs`'s publish-set selection (D-11) and the D-12 divergence guard —
both must read `docs/_registry/RE-index.md`, never `docs/**/*.md`.

### CWD-relative path invocation
**Source:** `convert.ps1` (`Test-Path $ReferenceDoc` default `'scripts/pipeline/reference.docx'`,
relative); `guard-docx.mjs` `tryConvert()` `cwd: process.cwd()` (line 154)
**Apply to:** every subprocess spawn in `build-publish-bundle.mjs` — always pass `cwd: process.cwd()`
and always document that the orchestrator itself must be run from the repo root (RESEARCH.md Pitfall 6).

## No Analog Found

| File | Role | Data Flow | Reason |
|---|---|---|---|
| In-zip README.md (static upload-instructions) | config/template | file-I/O | No prior "static Markdown template embedded/copied into a build artifact" file exists in this repo; closest tonal reference is `scripts/pipeline/README.md` §SC1/§SC3, but that file itself must NOT be the one bundled (it documents internal pipeline conventions, not end-user SharePoint upload steps) — author fresh, deterministic, no timestamps (D-04) |
| CSV manifest column shape (RE-ID, filename, status, last_verified) | data/output | transform | No prior CSV writer in this repo (`writeMapFile()` in `build-filename-map.mjs` is the closest structural analog but emits Markdown, not CSV) — trivial hand-rolled join is sufficient, no library needed |
| 9 HYG-03 files | content | verification | Already fixed in commit `9031056`; this phase's touch is read-only verification, not a code/content pattern to replicate |

## Metadata

**Analog search scope:** `scripts/pipeline/*.mjs` (all 6 `retrofit-*.mjs` + `build-filename-map.mjs` +
`guard-docx.mjs`), `scripts/pipeline/convert.ps1`, `scripts/pipeline/README.md`,
`docs/_registry/RE-index.md`, `scripts/pipeline/filename-map.md`, `.gitignore`, `package.json`,
`.planning/milestones/v1.16-phases/121-.../deferred-items.md`, live `grep` of the 5 HYG-02 files.
**Files scanned:** 13 (read in full or targeted) + 5 grepped for the stale key + `.gitignore`/`package.json` spot-checks
**Pattern extraction date:** 2026-07-10

---

*Phase: 126-publish-bundle-pipeline-guard-blocker-corpus-fixes*
