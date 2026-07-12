---
phase: 126-publish-bundle-pipeline-guard-blocker-corpus-fixes
reviewed: 2026-07-10T00:00:00Z
depth: standard
files_reviewed: 3
files_reviewed_list:
  - scripts/pipeline/build-publish-bundle.mjs
  - scripts/pipeline/build-filename-map.mjs
  - scripts/pipeline/convert.ps1
findings:
  critical: 1
  warning: 6
  info: 4
  total: 11
status: issues_found
---

# Phase 126: Code Review Report

**Reviewed:** 2026-07-10
**Depth:** standard
**Files Reviewed:** 3
**Status:** issues_found

## Summary

Reviewed the new batch orchestrator (`build-publish-bundle.mjs`), the additive
library-export change to `build-filename-map.mjs`, and the `.tmp`-leak fix in
`convert.ps1`.

The `isMainModule` guard in `build-filename-map.mjs` is correctly implemented —
importing the module no longer triggers its self-test or main-mode CLI side
effects (verified against the actual diff: both the `SELF_TEST` and the
non-self-test main block are now wrapped in `isMainModule && ...`). The
`convert.ps1` change is not actually a `try/finally` construct (the task brief's
framing was imprecise) — it is a single unconditional `Remove-Item` that cleans up
the orphaned 0-byte `.tmp` file `GetTempFileName()` leaves behind before the code
renames the path to `.md`. That fix is correctly scoped and does not touch the
pinned-pandoc version guard (lines 40-56) or the PIPE-03 fence-tracking/diff-guard
logic (lines 90-137) — confirmed via `git diff e002abc..HEAD`, which shows only the
3 lines around the temp-file creation changed.

The conversion/guard fail-closed gate itself is sound: every conversion or guard
failure is collected and blocks the zip write via `process.exit(1)` before any
`writeManifestCsv`/`Compress-Archive` call is reached, and a prior failed run never
touches a previously-written `dist/` zip. However, the **registry-parity join in
`build-publish-bundle.mjs` uses `Map`/`Set` keyed on Doc ID**, and there is no
upstream check that Doc IDs are unique among Approved rows. A registry row with a
duplicate Doc ID silently causes one source document's converted output to be
overwritten by another's in the staging directory, while the Set-based parity
check (which is the specific mechanism PUB-04 relies on to prove "no missing, no
orphan") cannot detect the collision because it collapses duplicate keys before
the comparison runs. This directly undermines the D-11 design goal ("a partial
bundle can't masquerade as complete") for this specific input shape, so it is
raised as a Critical finding. A handful of secondary robustness/quality gaps
(CSV escaping, zip-write atomicity, inconsistent stderr capture, missing top-level
error handling, a Windows-path-separator gap in the traversal guard, and some
dead/redundant defensive code) are raised as Warnings and Info below.

## Critical Issues

### CR-01: Duplicate Doc ID in the registry silently drops a document from the bundle while parity checks report clean

**File:** `scripts/pipeline/build-publish-bundle.mjs:264, 277-284, 319-330, 358-364`
**Issue:**
`filenameMap` (line 264, from `parseFilenameMap`) and both `approvedIds`/`stagedIds`
(lines 358-359) are built with `Map.set`/`new Set(...)`, which silently collapse
duplicate keys. If `docs/_registry/RE-index.md` ever contains two `Status:Approved`
rows with the same Doc ID but different `Path`/`Title` (a registry data-entry bug,
not currently guarded against anywhere in this file or in
`build-filename-map.mjs`'s collision resolver — that resolver only rejects a
duplicate Doc ID when title **and** path **and** doc ID are all identical; see
`buildFilenameMap()` in `build-filename-map.mjs:120-185`), the following happens
silently:

1. `filenameMap.get(docId)` (line 320 / 291) returns the **same** output filename
   for both rows (the last `filename-map.md` line for that Doc ID wins the `Map`).
2. `sourceStatusLookup(docId)` (lines 277-284) uses
   `approvedRows.find(r => r.docId === docId)`, which always resolves to the
   **first** duplicate row regardless of which row is being iterated in
   `checkDivergence` — so the D-12 divergence guard never actually inspects the
   second row's real frontmatter status.
3. In the convert loop (lines 319-330), both rows convert to the **same**
   `outPath` (`join(stagingDir, outName)`), so the second conversion silently
   overwrites the first row's `.docx` on disk. Both entries still get pushed into
   `convertedDocs` with `CONVERT-OK`.
4. `guardOne` (guard pass) runs twice against the same physical file and reports
   `GUARD-OK` twice — it can't detect that two distinct source documents were
   supposed to produce two distinct files.
5. `checkParity` (PUB-04, lines 358-364) is fed `new Set(approvedRows.map(...))`
   and `new Set(stagedDocs.map(...))` — both dedupe to a single Doc ID entry, so
   `missing.length === 0 && orphans.length === 0` and the parity check **passes**.
6. The batch exits 0, writes the zip, and prints "0 errors" — but one of the two
   source documents' content never made it into the bundle at all, and
   `manifest.csv` will show two rows for the same output filename (a visible but
   unvalidated red flag) instead of the batch refusing to build.

This is exactly the failure mode D-11 explicitly calls out as unacceptable ("a
partial bundle can't masquerade as complete"), and it is not covered by any
existing check in `build-publish-bundle.mjs` or `build-filename-map.mjs`.

**Fix:** Assert Doc ID uniqueness among `approvedRows` before doing any
Map/Set-keyed work, and fail closed on any duplicate:
```js
// Insert right after approvedRows is computed, before the 0-row guard.
const docIdCounts = new Map();
for (const r of approvedRows) {
  docIdCounts.set(r.docId, (docIdCounts.get(r.docId) || 0) + 1);
}
const duplicateDocIds = [...docIdCounts.entries()]
  .filter(([, count]) => count > 1)
  .map(([docId]) => docId);
if (duplicateDocIds.length > 0) {
  process.stderr.write(
    'FATAL: duplicate Doc ID(s) among Approved rows: ' + duplicateDocIds.join(', ') +
    ' -- refusing to build (ambiguous filename-map join, PUB-04 cannot prove parity)\n'
  );
  process.exit(1);
}
```

## Warnings

### WR-01: `writeManifestCsv` does not escape/quote fields

**File:** `scripts/pipeline/build-publish-bundle.mjs:111-115`
**Issue:** `writeManifestCsv` builds each row via `[...].join(',')` with no
quoting or escaping. `docId` and `outputFilename` are constrained by upstream
regex validation and can't contain a comma, but `status` and `lastVerified` come
straight from each doc's frontmatter (`readFrontmatterField`) with no charset
restriction. A frontmatter `status` or `last_verified` value containing a comma
would silently shift that CSV row's columns; a value beginning with `=`, `+`,
`-`, or `@` would also trigger CSV-injection/formula-execution if the manifest is
ever opened in Excel (low risk here since these are operator-reference-only per
the README, but still a correctness gap).
**Fix:**
```js
function csvField(v) {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}
// header/lines construction: r => [r.docId, r.outputFilename, r.status, r.lastVerified].map(csvField).join(',')
```

### WR-02: Zip write is not atomic — a failed `Compress-Archive` can destroy the last known-good bundle

**File:** `scripts/pipeline/build-publish-bundle.mjs:397-406`
**Issue:** The code comment claims "a failure at any earlier stage leaves any
prior zip untouched" (D-07 atomic promote), and that's true for every stage
*before* this one. But `Compress-Archive -DestinationPath "$zipDest" -Force`
writes directly to the final `dist/docs-library-v1.17.zip` path. If this specific
step fails partway (disk full, process killed, antivirus lock), the previous
valid zip that `-Force` began overwriting can be left truncated/corrupt instead
of preserved, contradicting the stated invariant for this one step.
**Fix:** Compress to a temp path in the same directory and rename into place only
on success:
```js
const zipTmp = zipDest + '.tmp';
const psCmd = 'Compress-Archive -Path "' + stagingDir + '\\*" -DestinationPath "' + zipTmp + '" -Force';
try {
  execFileSync('pwsh', ['-NoProfile', '-Command', psCmd], { stdio: 'pipe', cwd: process.cwd(), timeout: 120000 });
  renameSync(zipTmp, zipDest); // node:fs rename is atomic on the same volume
} catch (err) {
  try { rmSync(zipTmp, { force: true }); } catch (_) {}
  process.stderr.write('FATAL: Compress-Archive failed: ' + ((err.stdout || '') + (err.stderr || '')).toString() + '\n');
  process.exit(1);
}
```

### WR-03: `guardOne` drops `stderr`, unlike `convertOne`

**File:** `scripts/pipeline/build-publish-bundle.mjs:219-227`
**Issue:** `convertOne` captures `(err.stdout || '') + (err.stderr || '')`, but
`guardOne` captures only `err.stdout`. Today `guard-docx.mjs` happens to write
all of its diagnostics to stdout (verified by reading the file), so this doesn't
currently lose information, but it's an inconsistent, fragile pattern: if
`guard-docx.mjs` (or one of its `./lib/ooxml.mjs` imports) ever throws an
uncaught exception, timeout, or writes anything to stderr, `guardOne`'s
`GUARD-FAIL` detail printed to the operator would silently be empty/incomplete.
**Fix:** Mirror `convertOne`'s capture:
```js
return { ok: false, detail: ((err.stdout || '') + (err.stderr || '')).toString() };
```

### WR-04: No top-level error handling around `runBatch()`

**File:** `scripts/pipeline/build-publish-bundle.mjs:231-411, 516-518`
**Issue:** Every expected failure path uses a structured
`FATAL:`/`=== FAILURES ===` message before `process.exit(1)`, but there is no
`try/catch` around `runBatch()` itself. An unexpected exception (e.g.
`readFileSync` throwing on a permission-denied file instead of the `existsSync`
guard catching it, or a bug in a helper) will crash with a raw Node stack trace
instead of the tool's own reporting format, and will not go through the
"collect-all-failures" reporting path the rest of the file establishes. Node's
default behavior still exits non-zero, so the fail-closed *exit code* contract
holds, but the *reporting* contract (clear operator-facing failure list) breaks.
**Fix:** Wrap the `isMainModule && !SELF_TEST` call site:
```js
if (isMainModule && !SELF_TEST) {
  try {
    runBatch();
  } catch (err) {
    process.stderr.write('FATAL: unexpected error: ' + (err.stack || err.message) + '\n');
    process.exit(1);
  }
}
```

### WR-05: `validateSourcePathUnderDocs` traversal check is not separator-agnostic on Windows

**File:** `scripts/pipeline/build-publish-bundle.mjs:119-123`
**Issue:** The function's own comment states its job is to "reject any '..'
traversal segment," but it only splits on `/`: `p.split('/').includes('..')`. On
this Windows-first repo, a `Path` value that mixes separators (e.g.
`docs/foo\..\..\..\Windows\System32\...`) starts with `docs/` (passes the prefix
check) and has no standalone `..` token after splitting on `/` alone (the `..`
is embedded in a backslash-joined segment), so it passes validation — yet
`join()`/`readFileSync`/`pwsh -InputMd` all treat `\` as a valid separator on
Windows and would resolve outside `docs/`. Low exploitability given `row.path`
values come from a committed, reviewed registry file (not runtime user input),
but it's a real gap relative to the function's stated purpose and the T-126-02-02
threat model it was written to satisfy.
**Fix:**
```js
export function validateSourcePathUnderDocs(p) {
  if (typeof p !== 'string' || !p.startsWith('docs/')) return false;
  if (p.replace(/\\/g, '/').split('/').includes('..')) return false;
  return true;
}
```

### WR-06: `convert.ps1`'s ephemeral `.md` temp copy is not cleaned up on a terminating error

**File:** `scripts/pipeline/convert.ps1:85-149`
**Issue:** `$tempMd` is created at line 88 and only explicitly removed at the two
`Remove-Item $tempMd` call sites (line 132, on the PIPE-03 diff-guard failure
path, and line 149, after the pandoc invocation). There is no `try/finally`
wrapping that range. Under the default `$ErrorActionPreference = 'Continue'`
most cmdlet failures between those lines (e.g. `Copy-Item`, `Get-Content`,
`Set-Content`) won't actually terminate the script, but any genuinely terminating
error in that window (e.g. a `.NET` exception, or a future edit that adds
`-ErrorAction Stop` somewhere in between) would skip both cleanup call sites and
leak the temp `.md` copy — the same class of bug the neighboring
`269f8f7` commit just fixed for the `.tmp` file created by `GetTempFileName()`.
Given this runs 221x sequentially in a single batch, repeated failures could
accumulate files in the OS temp directory.
**Fix:** Wrap the preprocessing + conversion body in `try { ... } finally { Remove-Item $tempMd -Force -ErrorAction SilentlyContinue }` so cleanup happens unconditionally, and drop the now-redundant `Remove-Item $tempMd` calls at lines 132/149.

## Info

### IN-01: Guard-fail/parity/naming-parity filters in `runBatch()` are dead code given the current control flow

**File:** `scripts/pipeline/build-publish-bundle.mjs:354-372`
**Issue:** `guardFailedIds`/`stagedDocs` filtering (354-355), the parity check
(358-364), and the naming-parity check (368-372) are only reached when
`totalFailures === 0` (the `if (totalFailures > 0) { ...; process.exit(1); }`
block at 346-352 already returns for any guard failure). Since `guardFailures`
is therefore always empty and `convertedDocs` always has one entry per
`approvedRows` element built directly from `filenameMap.get(row.docId)`, these
three checks can never actually fail in the current code path — they're
effectively unreachable defensive code, not the safety net the surrounding
comments (PUB-04 etc.) suggest. Not incorrect, but potentially misleading to a
future maintainer who assumes these checks are load-bearing.
**Fix:** Either move the guard-fail filtering before the `totalFailures`
early-exit (so `stagedDocs` can genuinely differ from `convertedDocs`), or add a
comment noting these are intentional belt-and-braces assertions that are
currently unreachable given the all-or-nothing fail-closed gate above them.

### IN-02: Each Approved doc's source `.md` file is read from disk up to three times

**File:** `scripts/pipeline/build-publish-bundle.mjs:280, 295, 382`
**Issue:** `readFile(row.path)` is called once in `sourceStatusLookup` (cached
per docId), once more (uncached) in the integrity-check loop just to test for
`null`, and a third time in the `manifestRows` map at the end. Not a correctness
issue, but avoidable duplicate I/O across ~221 files per run.
**Fix:** Read each source file once per row, cache the content alongside
`docId`, and reuse it for the integrity check, divergence lookup, and manifest
row.

### IN-03: `resolvePandocBin()` is duplicated verbatim between `build-publish-bundle.mjs` and `guard-docx.mjs`

**File:** `scripts/pipeline/build-publish-bundle.mjs:171-186`
**Issue:** Identical logic already exists in `scripts/pipeline/guard-docx.mjs:126-143`.
This codebase already has a shared-lib convention (`./lib/ooxml.mjs`) for exactly
this kind of reuse.
**Fix:** Extract to `scripts/pipeline/lib/pandoc.mjs` (or similar) and import in
both call sites.

### IN-04: `runBatch()` is a single ~180-line function covering nine distinct concerns

**File:** `scripts/pipeline/build-publish-bundle.mjs:231-411`
**Issue:** Preflight, filename-map regeneration, registry parsing, coverage
check, integrity validation, staging-dir reset, conversion, guarding, parity,
manifest, README, and zip promotion are all inlined into one function. Each step
is individually simple (mostly straight-line early-return checks), so this isn't
a hidden-branch-complexity risk, but it makes the function harder to unit-test
as isolated steps and harder to skim.
**Fix:** Consider extracting named helper functions per stage (e.g.
`runIntegrityChecks(approvedRows, filenameMap)`, `runConversionPass(rows)`,
`runGuardPass(docs)`) that `runBatch()` calls in sequence — most of the pure
logic is already factored out (`checkParity`, `checkDivergence`, etc.); this
would extend the same pattern to the I/O-driving glue.

---

_Reviewed: 2026-07-10_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
