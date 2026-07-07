# Phase 113: Conversion Pipeline Lock + Representative-Set Grounding Validation - Pattern Map

**Mapped:** 2026-07-03
**Files analyzed:** 9 new files
**Analogs found:** 4 / 9 (5 files are greenfield with no codebase analog — see §No Analog Found)

---

## File Classification

| New File | Role | Data Flow | Closest Analog | Match Quality |
|----------|------|-----------|----------------|---------------|
| `scripts/pipeline/lib/ooxml.mjs` | utility | transform | none (greenfield) | none |
| `scripts/pipeline/guard-docx.mjs` | utility/validator | batch + transform | `scripts/validation/check-phase-99.mjs` | role-match (same Node ESM validator shape) |
| `scripts/pipeline/convert.ps1` | utility | batch | `scripts/Install-Modules.ps1` | role-match (PowerShell utility wrapper) |
| `scripts/pipeline/reference.docx` | config (binary asset) | n/a | none | none (committed binary; no code pattern) |
| `scripts/pipeline/README.md` | config/policy doc | n/a | none | none (documentation artifact) |
| `scripts/pipeline/test-fixtures/clean-test-doc.md` | test fixture | n/a | none | none (greenfield Markdown fixture) |
| `scripts/pipeline/test-fixtures/draft-test-doc.md` | test fixture | n/a | none | none (greenfield Markdown fixture) |
| `.planning/phases/113-.../PIPE-02-RUNBOOK.md` | utility/runbook | n/a | none | none (owner-facing procedure doc) |
| `.planning/phases/113-.../PIPE-02-FINDINGS.md` | utility/findings | n/a | none | none (owner-filled results template) |

---

## Pattern Assignments

### `scripts/pipeline/guard-docx.mjs` (utility/validator, batch + transform)

**Analog:** `scripts/validation/check-phase-99.mjs` (lightweight non-chain validator)
**Secondary analog for runner loop:** `scripts/validation/check-phase-112.mjs` (same runner loop, execFileSync guard pattern)

This is the primary new code file. It MUST mirror the `check-phase-*.mjs` conventions exactly because it is the Phase-119 seed for `check-phase-113.mjs` (D-07). The guard adds one novel concern: OOXML-aware checks using built-in Node ZIP/DEFLATE (imported from `./lib/ooxml.mjs`), and a `--self-test` mode distinct from `--verbose`.

**Shebang + top-of-file comment block** (`check-phase-99.mjs` line 1, `check-phase-112.mjs` lines 1-35):
```javascript
#!/usr/bin/env node
// guard-docx.mjs -- Post-conversion .docx guard (Phase 113 PIPE-01 SC2)
//
// Performs BOTH checks on a pandoc-generated .docx file:
//   (a) YAML-leak check: no '---' in first ~500 chars of .docx body text
//       CRITICAL: must extract word/document.xml and inflate before scanning --
//       raw .docx bytes are DEFLATE-compressed; naive byte scan is always false-green.
//   (b) Heading-style check: Heading1/Heading2/Heading3 pStyle IDs present in body XML
//
// D-07: This script is the Phase-119 seed for check-phase-113.mjs (HARN-03 Atom 2).
// Keep it standalone now; the chain-fold is Phase 119's job.
//
// Usage:  node scripts/pipeline/guard-docx.mjs <path/to/output.docx>
//         node scripts/pipeline/guard-docx.mjs --self-test
// Exit 0: both checks pass (clean conversion)
// Exit 1: any check fails (YAML leak or heading-style loss)
```

**Imports pattern** (`check-phase-99.mjs` lines 49-51, `check-phase-112.mjs` lines 36-41):
```javascript
// Node built-ins ONLY — zero external npm packages (matches scripts/validation/ convention)
import { readFileSync, existsSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';
// Internal lib only (not npm)
import { extractBodyText, findHeadingStyleIds } from './lib/ooxml.mjs';
```

**argv + flag parsing** (`check-phase-99.mjs` lines 53-54):
```javascript
const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');
const SELF_TEST = argv.includes('--self-test');
```

**checks array + check object shape** (`check-phase-99.mjs` lines 86-101):
```javascript
// Each check: { id: string, name: string, run(): { pass: bool, detail: string } | { pass: true, skipped: true, detail: string } }
const checks = [];

checks.push({
  id: 'YAML-LEAK',
  name: 'V-GUARD-YAML-LEAK: no "---" YAML delimiter in first ~500 chars of .docx body text',
  run() {
    // ... returns { pass, detail } or { pass: false, detail: 'FAIL: ...' }
  }
});

checks.push({
  id: 'HEADING-STYLE',
  name: 'V-GUARD-HEADING-STYLE: Heading1/Heading2/Heading3 pStyle IDs present in .docx body',
  run() {
    // ...
  }
});
```

**Runner loop — verbatim from check-phase-99.mjs lines 306-333** (same in check-phase-112.mjs lines 171-197):
```javascript
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('guard-docx -- Post-conversion .docx guard (PIPE-01 SC2)\n');
for (const check of checks) {
  let result;
  try { result = check.run(); } catch (e) { result = { pass: false, detail: 'Unexpected error: ' + e.message }; }
  const prefix = '[' + check.id + '/' + checks.length + '] ' + check.name;
  const showDetail = result.detail && (VERBOSE || !result.pass || result.skipped);
  if (result.skipped) {
    skipped++;
    process.stdout.write(padLabel(prefix) + 'SKIPPED' + (showDetail ? ' -- ' + result.detail : '') + '\n');
  } else if (result.pass) {
    passed++;
    process.stdout.write(padLabel(prefix) + 'PASS' + (showDetail ? ' -- ' + result.detail : '') + '\n');
  } else {
    failed++;
    process.stdout.write(padLabel(prefix) + 'FAIL -- ' + result.detail + '\n');
  }
}

process.stdout.write('\nResult: ' + passed + ' PASS, ' + failed + ' FAIL, ' + skipped + ' SKIPPED\n');
process.exit(failed > 0 ? 1 : 0);
```

**Critical output rule:** Use `process.stdout.write(...)` throughout the runner loop, NOT `console.log`. The chain's EXACT-MATCH diffs stdout. (`check-phase-99.mjs` lines 325-329, `check-phase-112.mjs` lines 186-196.)

**execFileSync guard for pandoc subprocess** (pattern from `check-phase-112.mjs` lines 107-121 — used in guard's self-test to invoke pandoc):
```javascript
try {
  execFileSync('pandoc', [inputMd, '-o', outputDocx, '--reference-doc=scripts/pipeline/reference.docx'], {
    stdio: 'pipe',
    timeout: 60000,
    cwd: process.cwd(),
  });
} catch (err) {
  const stderr = err.stderr ? err.stderr.toString() : '';
  const stdout = err.stdout ? err.stdout.toString() : '';
  const isMissing = err.code === 'ENOENT' || err.status === 127
    || stderr.includes('not found') || stderr.includes('Could not resolve');
  if (isMissing) return { pass: true, skipped: true, detail: 'pandoc not on PATH -- skipped' };
  return { pass: false, detail: 'pandoc FAIL: ' + (stdout + stderr).slice(0, 500).trim() };
}
```

**SELF dual-invariant guard** (`check-phase-99.mjs` lines 290-303, `check-phase-112.mjs` lines 155-167):
The guard-docx.mjs does NOT include a CHAIN_PHASES/CHAIN_SKIP structure (it is not a chain validator). However at Phase-119 fold-in, `check-phase-113.mjs` WILL include the SELF check. Document this as a Phase-119 concern; guard-docx.mjs itself omits the SELF check.

---

### `scripts/pipeline/lib/ooxml.mjs` (utility, transform)

**Analog:** No direct analog in the codebase. This is fully greenfield Node ESM.

**Pattern source:** RESEARCH.md §Pattern 3 (lines 232-307) provides the complete implementation blueprint. It is reproduced here as the authoritative pattern for the planner.

**Imports** (zero-dependency — matches `scripts/validation/` convention):
```javascript
// scripts/pipeline/lib/ooxml.mjs
import { readFileSync } from 'node:fs';
import { inflateRawSync } from 'node:zlib';
```

**Core export shape** (three named exports; the guard uses all three):
```javascript
export function extractEntry(docxPath, entryName) { ... }   // raw ZIP entry decompression
export function extractBodyText(docxPath) { ... }           // body text from word/document.xml
export function findHeadingStyleIds(docxPath) { ... }       // pStyle IDs present in body XML
```

**CRITICAL implementation constraint:** `extractEntry` MUST use `inflateRawSync` on compression method 8 (DEFLATE). It MUST NOT call `buf.toString('utf8')` on the raw .docx buffer and search for text strings — that is always false-green (the ZIP payload is DEFLATE-compressed). The sequential local-header walk is: look for signature `PK\x03\x04` at offset, read fileNameLength + extraFieldLength to find dataStart, then `buf.subarray(dataStart, dataStart + compressedSize)` → `inflateRawSync`. See RESEARCH.md lines 248-281 for the complete implementation.

**JSDoc convention** (matches `_lib/exec-fail-detail.mjs` style, lines 24-30):
```javascript
/**
 * Extract a named entry from a .docx ZIP archive.
 * Uses ZIP local file header sequential walk — no external binary, no npm packages.
 *
 * @param {string} docxPath - absolute or repo-relative path to .docx file
 * @param {string} entryName - e.g. 'word/document.xml' or 'word/styles.xml'
 * @returns {string} decompressed UTF-8 content of the entry
 * @throws if entry not found or decompression fails
 */
```

---

### `scripts/pipeline/convert.ps1` (utility, batch)

**Analog:** `scripts/Install-Modules.ps1` (PowerShell utility script)

**Script header + CmdletBinding pattern** (`scripts/Install-Modules.ps1` lines 1-6):
```powershell
# convert.ps1
# Canonical pandoc invocation wrapper for the Phase 113 MD→.docx pipeline.
# Pandoc 3.7.0.2 is PINNED. Do not change the version without also regenerating reference.docx.

[CmdletBinding()]
param(
  [Parameter(Mandatory)][string]$InputMd,
  [Parameter(Mandatory)][string]$OutputDocx,
  [string]$ReferenceDoc = 'scripts/pipeline/reference.docx'
)
```

**Version-guard pattern** (RESEARCH.md lines 482-485):
```powershell
$expectedVer = '3.7.0.2'
$ver = (pandoc --version | Select-String '^pandoc (\S+)').Matches[0].Groups[1].Value
if ($ver -ne $expectedVer) { Write-Error "Expected pandoc $expectedVer, got $ver"; exit 1 }
```

**Write-Host color convention** (`scripts/Install-Modules.ps1` lines 8-36):
```powershell
Write-Host "Converting $InputMd → $OutputDocx ..." -ForegroundColor Cyan
pandoc $InputMd -o $OutputDocx --reference-doc=$ReferenceDoc
if ($LASTEXITCODE -ne 0) { Write-Error "pandoc failed (exit $LASTEXITCODE)"; exit 1 }
Write-Host "Done. Run guard: node scripts/pipeline/guard-docx.mjs $OutputDocx" -ForegroundColor Green
```

---

## Shared Patterns

### CRLF→LF Normalization
**Source:** `scripts/validation/check-phase-99.mjs` lines 56-59, `scripts/validation/check-phase-112.mjs` lines 46-49
**Apply to:** ALL text reads in guard-docx.mjs and ooxml.mjs (`extractBodyText`, any text comparison)
```javascript
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}
```
For the OOXML helper, apply `.replace(/\r\n/g, '\n')` to the inflated XML string before any text matching.

### process.stdout.write (not console.log)
**Source:** `scripts/validation/check-phase-99.mjs` lines 324-329, `scripts/validation/check-phase-112.mjs` lines 186-196
**Apply to:** guard-docx.mjs runner loop output
All output lines in the runner loop use `process.stdout.write(...)`. The `console.log` on line 178 of check-phase-112.mjs (and line 314 of check-phase-99.mjs) is only for the initial banner line; all check result lines are `process.stdout.write`.

### Exit Code Convention
**Source:** `scripts/validation/check-phase-99.mjs` line 333, `scripts/validation/check-phase-112.mjs` line 197
**Apply to:** guard-docx.mjs
```javascript
process.exit(failed > 0 ? 1 : 0);
```
Exit 0 = all checks pass or skipped. Exit 1 = any FAIL.

### execFileSync Error Handling (subprocess invoke)
**Source:** `scripts/validation/check-phase-112.mjs` lines 107-121
**Apply to:** guard-docx.mjs self-test mode (pandoc subprocess invocation)
```javascript
try {
  execFileSync(binary, args, { stdio: 'pipe', timeout: N, cwd: process.cwd() });
} catch (err) {
  const stderr = err.stderr ? err.stderr.toString() : '';
  const stdout = err.stdout ? err.stdout.toString() : '';
  const isMissing = err.code === 'ENOENT' || err.status === 127
    || stderr.includes('not found') || stderr.includes('Could not resolve');
  if (isMissing) return { pass: true, skipped: true, detail: 'binary not found -- skipped' };
  return { pass: false, detail: 'FAIL: ' + (stdout + stderr).slice(0, 500).trim() };
}
```

### Zero External Dependency Rule
**Source:** `scripts/validation/_lib/exec-fail-detail.mjs` (pure Node built-ins), `check-phase-99.mjs` imports (lines 49-51)
**Apply to:** `scripts/pipeline/lib/ooxml.mjs`, `scripts/pipeline/guard-docx.mjs`
Both files MUST import only from `node:*` built-in modules or internal relative paths (`./lib/ooxml.mjs`). No `npm install` is required or permitted. This is the invariant that makes the guard foldable into `scripts/validation/check-phase-113.mjs` at Phase 119 without introducing a new chain dependency on npm packages.

### check Object Shape
**Source:** `scripts/validation/check-phase-99.mjs` lines 91-101
**Apply to:** guard-docx.mjs check array
```javascript
checks.push({
  id: 'SHORT-ID',                 // used in [id/total] prefix
  name: 'V-GUARD-SHORT-ID: ...',  // full description shown in output
  run() {
    // synchronous; returns one of:
    //   { pass: true, detail: 'description of what passed' }
    //   { pass: false, detail: 'FAIL description' }
    //   { pass: true, skipped: true, detail: 'why skipped' }
  }
});
```

### PowerShell Write-Host Color Convention
**Source:** `scripts/Install-Modules.ps1` lines 7-37
**Apply to:** `scripts/pipeline/convert.ps1`
Use `-ForegroundColor Cyan` for progress, `-ForegroundColor Yellow` for warnings, `-ForegroundColor Green` for success, `Write-Error` for fatal errors followed by `exit 1`.

---

## No Analog Found

Files with no close match in the codebase — planner should use RESEARCH.md patterns and the descriptions in this file directly:

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| `scripts/pipeline/lib/ooxml.mjs` | utility | transform | No ZIP/OOXML parsing exists anywhere in repo; greenfield Node built-in pattern |
| `scripts/pipeline/reference.docx` | config binary | n/a | Committed binary artifact; generated by `pandoc --print-default-data-file`; no code pattern |
| `scripts/pipeline/README.md` | policy doc | n/a | No pipeline policy README exists; content from RESEARCH.md §Deployment Policy Documentation |
| `scripts/pipeline/test-fixtures/clean-test-doc.md` | test fixture | n/a | No .docx test fixtures exist; stub EEE header from RESEARCH.md §Stub EEE Header Block |
| `scripts/pipeline/test-fixtures/draft-test-doc.md` | test fixture | n/a | Same; uses `status: draft` frontmatter and `Status: Draft` in stub header |
| `.planning/phases/113-.../PIPE-02-RUNBOOK.md` | runbook/procedure | n/a | No owner-run grounding runbooks exist; content fully specified in RESEARCH.md §Owner-Run PIPE-02 Procedure |
| `.planning/phases/113-.../PIPE-02-FINDINGS.md` | findings template | n/a | Recording template specified verbatim in RESEARCH.md lines 521-554 |

---

## Key Pattern Notes for Planner

### guard-docx.mjs is NOT a chain validator in Phase 113
It lives in `scripts/pipeline/`, not `scripts/validation/`. It does NOT register with any harness. It has no `CHAIN_PHASES` array, no `CHAIN_SKIP`, and no SELF check. These are Phase-119 concerns when it is folded into `check-phase-113.mjs`. The planner must NOT wire it into the validation chain during Phase 113 (D-04/D-07).

### guard-docx.mjs --self-test mode is the SC2 deliverable
PIPE-01 SC2 requires the guard to "fail on raw `---` YAML in the first ~500 chars of the `.docx` body and pass on clean conversion." The `--self-test` flag satisfies this by running both a clean fixture (assert exit 0) and a deliberately-leaked fixture (assert exit 1) using pandoc subprocess. The fixture for the leaked test must put `---` as the first body paragraph of the .md, not in a YAML frontmatter block.

### ooxml.mjs is imported by guard-docx.mjs; it is also used in the reference.docx generation sanity check
D-05 says "build it once." The generation-time sanity (verify Heading1/Heading2/Heading3 exist in `word/styles.xml` of the generated reference.docx) and the guard's runtime check both import `extractEntry` and `findHeadingStyleIds` from `scripts/pipeline/lib/ooxml.mjs`. The planner should NOT duplicate the ZIP-walking logic.

### .gitattributes and .gitignore changes
Two config changes are required:
- Add `scripts/pipeline/reference.docx binary` to `.gitattributes` (committed binary marker)
- Add `.pipeline-output/` to `.gitignore` (working output directory for converted docs)

---

## Metadata

**Analog search scope:** `scripts/validation/*.mjs`, `scripts/validation/_lib/*.mjs`, `scripts/*.ps1`
**Files scanned:** 5 (check-phase-112.mjs, check-phase-99.mjs, _lib/frozen-at-close.mjs, _lib/exec-fail-detail.mjs, _lib/archive-path.mjs, Install-Modules.ps1)
**Pattern extraction date:** 2026-07-03
