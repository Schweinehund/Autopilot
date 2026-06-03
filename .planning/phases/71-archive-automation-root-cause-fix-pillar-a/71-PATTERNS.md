# Phase 71: Archive-Automation Root-Cause Fix (Pillar A) - Pattern Map

**Mapped:** 2026-06-03
**Files analyzed:** 5 (3 NEW + 1 MODIFIED + 1 NEW close-gate)
**Analogs found:** 5/5 (exact match for every file)

## File Classification

| File | New/Modified | Role | Data Flow | Closest Analog | Match Quality |
|------|--------------|------|-----------|----------------|---------------|
| `scripts/archive/extract-summary-oneliners.mjs` | NEW | utility (CLI + library extractor) | file-I/O + transform (idempotent frontmatter pre-write) | `scripts/validation/regenerate-supervision-pins.mjs` (3-mode CLI) + `scripts/validation/_lib/archive-path.mjs` (ESM shape) | exact (3-mode CLI; same Node stdlib subset) |
| `scripts/archive/test-extract-oneliner.mjs` | NEW | test (Node-stdlib assertion loop) | request-response (in-process tests) | `scripts/validation/check-phase-67.mjs` (assertion-loop + exit-code contract) | role-match (test runner mirrors check-phase runner-loop) |
| `scripts/validation/check-phase-71.mjs` | NEW | validator (chain-apex regression-guard) | request-response (subprocess chain + file scan) | `scripts/validation/check-phase-67.mjs` (verbatim Path-A source per CONTEXT line 17 + RESEARCH §"Architectural Responsibility Map") | exact (Path-A copy + V-71-FIX-01/02 + V-71-MILESTONES-01 + V-71-ARCHIVE02-01 added) |
| `.planning/MILESTONES.md` (REPLACEMENT — v1.1 H2 line 164 area + v1.2 H2 lines 145-148) | MODIFIED | planning-doc (markdown H2 bullets) | content-restoration via Edit-tool surgical edit | v1.6 H2 entry at MILESTONES.md:25-32 + v1.7 H2 entry at MILESTONES.md:3-21 (canonical retroactive-authoring style from v1.7 close 2026-05-29) | exact (same H2 bullet style; same retroactive-authoring "Note:" row) |
| `71-VERIFICATION.md` | NEW | close-gate report | report-emission | `.planning/milestones/v1.7-phases/68-.../68-VERIFICATION.md` (chain-validator close-gate shape) + `.../67-.../67-VERIFICATION.md` (Pillar A shape) | exact (Pillar A + chain-validator deliverable) |

---

## Pattern Assignments

### `scripts/archive/extract-summary-oneliners.mjs` (utility, file-I/O + transform)

**Analog:** `scripts/validation/regenerate-supervision-pins.mjs` (3-mode CLI precedent) — see also `scripts/validation/_lib/archive-path.mjs` (ESM shape; first inhabitant of `_lib/` subtree which `scripts/archive/` mirrors as the second `_lib/`-class subtree per RESEARCH §"State of the Art").

**No shebang (ESM convention; `.mjs` extension is the entry-point signal). Node-stdlib imports only.** See `regenerate-supervision-pins.mjs:1-23` for the shebang + ESM imports template (Phase 71 extractor uses the same shebang for direct-invoke usability):

```javascript
#!/usr/bin/env node
// regenerate-supervision-pins.mjs — seeded-template emitter for supervision_exemptions[] sidecar pins
// Source of truth: .planning/phases/43-v1-4-cleanup-audit-harness-fix/43-CONTEXT.md (D-09..D-15)
// Contract: NEVER auto-pins. Tier-1 occurrences emit JSON stubs for human reason-filling.
//           Tier-2 occurrences emit to scripts/validation/suspected-regressions.txt -- require explicit human promotion.
// Modes: --report (advisory diff), --emit-stubs (JSON fragments), --self-test (dogfood Phase 43's hand-authored set)
// File reads only: all content loaded via fs.readFileSync; zero shell, zero network, zero dynamic code evaluation.

import { readFileSync, existsSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
```

**Multi-mode argv parsing pattern** (`regenerate-supervision-pins.mjs:29-67` — verbatim shape for Phase 71's `--milestone <v>` + `--pre-write-frontmatter` + `--dry-run` + `--self-test`):

```javascript
const argv = process.argv.slice(2);
const MODE_REPORT = argv.includes('--report');
const MODE_STUBS = argv.includes('--emit-stubs');
const MODE_SELFTEST = argv.includes('--self-test');
const MODE_HELP = argv.includes('--help') || argv.includes('-h');

function printUsage(stream) {
  stream.write(
    'Usage: node scripts/validation/regenerate-supervision-pins.mjs <mode>\n' +
    '\n' +
    'Modes (exactly one required):\n' +
    '  --report       Advisory diff ... (no writes)\n' +
    '  --emit-stubs   Emit JSON stubs ... to stdout\n' +
    '  --self-test    Dogfood mode: assert classifier reproduces Phase 43 hand-authored Tier-1 pin set\n' +
    '  --help         Show this message\n'
  );
}

if (MODE_HELP) { printUsage(process.stdout); process.exit(0); }

const selectedModes = [MODE_REPORT, MODE_STUBS, MODE_SELFTEST].filter(Boolean).length;
if (selectedModes === 0) {
  process.stderr.write('Error: no mode selected. Exactly one of ... required.\n');
  printUsage(process.stderr); process.exit(2);
}
if (selectedModes > 1) {
  process.stderr.write('Error: multiple modes selected. Pick exactly one of ...\n');
  printUsage(process.stderr); process.exit(2);
}
```

**Phase 71 application:** The four CLI flags (`--milestone <v>` / `--pre-write-frontmatter` / `--dry-run` / `--self-test`) are NOT mutually exclusive (unlike supervision-pins' 3-mode contract). `--self-test` is the one short-circuit mode that bypasses all milestone walking. RESEARCH Pattern 1 Example body (lines 271-427) shows the exact translation — keep argv-parsing simple (`argv.includes(...)` + `argv.indexOf(...)`).

**ESM `_lib/`-style export shape** (`_lib/archive-path.mjs:16-30`) — the vendored `extractOneLinerFromBody` + `preWriteFrontmatterOneLiner` + `extractFrontmatter` MUST be exported so the companion test fixture (`test-extract-oneliner.mjs`) can `import { ... } from './extract-summary-oneliners.mjs'`:

```javascript
// scripts/validation/_lib/archive-path.mjs
import { existsSync } from 'node:fs';
import { join } from 'node:path';

export function resolveArchivedPhasePath(phaseSuffix, milestoneRoots = ['v1.5-phases']) {
  if (typeof phaseSuffix !== 'string' || phaseSuffix.trim() === '') return null;
  const live = '.planning/phases/' + phaseSuffix;
  if (existsSync(join(process.cwd(), live))) return live;
  for (const root of milestoneRoots) {
    const archived = '.planning/milestones/' + root + '/' + phaseSuffix;
    if (existsSync(join(process.cwd(), archived))) return archived;
  }
  return null;
}
```

**CRLF-tolerant file walk** (`regenerate-supervision-pins.mjs:74-78` — copy verbatim per Phase 42 D-25 no-shared-module contract):

```javascript
// readFile: v1.4 harness lines 28-32 — file read with CRLF normalization (Pattern C)
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');  // CRLF normalization per Phase 31 ca40eb9
}
```

**NOTE for Phase 71 extractor:** The corrected regex `/^#[^\n]*\r?\n+\*\*One-liner:\*\*\s+([^\r\n]+)/m` is CRLF-tolerant inline via `\r?\n`. The extractor MAY skip the read-time `.replace(/\r\n/g, '\n')` normalization because the regex handles both line endings AND the `preWriteFrontmatterOneLiner` helper needs to preserve the document's original EOL convention (per RESEARCH Pattern 1 + Pitfall 2). Use plain `readFileSync(abs, 'utf8')` WITHOUT normalization in the extractor; use the normalized variant only in the validator (which is HEAD-scan-only).

**Error-handling and exit-code conventions** (`regenerate-supervision-pins.mjs:339-381` + line 425-427 for the main scan loop):

```javascript
function main() {
  // ... scan + transform
  let scanned = 0, alreadyOK = 0, updated = 0, skipped = 0, errors = 0;
  for (const f of files) {
    scanned++;
    try {
      // ... per-file logic
    } catch (err) {
      errors++;
      console.error(`ERROR ${f}: ${err.message}`);
    }
  }
  console.log(`milestone=${milestone} scanned=${scanned} alreadyOK=${alreadyOK} updated=${updated} skipped-no-value=${skipped} errors=${errors}${dryRun ? ' [DRY-RUN]' : ''}`);
  process.exit(errors > 0 ? 1 : 0);
}
```

**Input-validation pattern** (RESEARCH §"Security Domain" + `_lib/archive-path.mjs:22` empty-string guard precedent) — Plan 71-01 Wave 1 author MUST include the `--milestone` regex guard:

```javascript
if (!/^v\d+\.\d+(\.\d+)?$/.test(milestone)) {
  console.error(`Invalid --milestone format: ${milestone} (expected vMAJOR.MINOR[.PATCH])`);
  process.exit(2);
}
```

---

### `scripts/archive/test-extract-oneliner.mjs` (test, request-response)

**Analog:** `scripts/validation/check-phase-67.mjs` (assertion-loop + per-check object + exit-code contract). The Phase 71 fixture is a co-located unit test (per RESEARCH §"Recommended Plan-File Structure"), distinct from but stylistically aligned with the chain validators.

**Imports** (mirrors `check-phase-67.mjs:15-18` minus the chain primitives since this test has no subprocess chain):

```javascript
// scripts/archive/test-extract-oneliner.mjs (Plan 71-01 Wave 2)
import { extractOneLinerFromBody, preWriteFrontmatterOneLiner, hasFrontmatterOneLiner } from './extract-summary-oneliners.mjs';
import process from 'node:process';
```

**Assertion-loop pattern** (RESEARCH Code Example 3 lines 672-705 — derived from `check-phase-67.mjs:322-341` runner-loop):

```javascript
const tests = [
  {
    name: 'Fixture 1 -- label-not-captured (Phase 67 Plan 67-01 SUMMARY body shape)',
    input: `---\nphase: 67-x\n---\n\n# Phase 67 Plan 01: SWEEP-01 Summary\n\n**One-liner:** Verified 4 ABM URLs alive via cron-pinned markdown-link-check\n\n## What Was Built\n`,
    expect: 'Verified 4 ABM URLs alive via cron-pinned markdown-link-check'
  },
  {
    name: 'Fixture 2 -- pre-write idempotency (frontmatter already has one-liner:)',
    input: `---\nphase: x\none-liner: "Already set"\n---\n\n# Title\n\n**One-liner:** ignored body value\n`,
    // For Fixture 2 the test calls preWriteFrontmatterOneLiner and expects byte-equal output
    idempotency: true,
  },
  {
    name: 'Fixture 3 -- CRLF tolerance',
    input: `---\r\nphase: x\r\n---\r\n\r\n# Title\r\n\r\n**One-liner:** CRLF value here\r\n`,
    expect: 'CRLF value here'
  },
];

let failed = 0;
for (const t of tests) {
  if (t.idempotency) {
    const after = preWriteFrontmatterOneLiner(t.input, 'should not appear');
    if (after !== t.input) {
      console.error(`FAIL: ${t.name}\n  pre-write was NOT idempotent (frontmatter already present)`);
      failed++;
    } else {
      console.log(`PASS:  ${t.name}`);
    }
  } else {
    const got = extractOneLinerFromBody(t.input);
    if (got !== t.expect) {
      console.error(`FAIL: ${t.name}\n  expected: ${JSON.stringify(t.expect)}\n  got:      ${JSON.stringify(got)}`);
      failed++;
    } else {
      console.log(`PASS:  ${t.name}`);
    }
  }
}
console.log(`\nResult: ${tests.length - failed} PASS / ${failed} FAIL`);
process.exit(failed > 0 ? 1 : 0);
```

**Per-check runner-loop output style** (`check-phase-67.mjs:322-341`):

```javascript
// check-phase-67.mjs:322-341 — the canonical runner-loop output shape
let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-67 -- Phase 67 deliverables (SWEEP-01/02 corpus surgical sweeps)\n');
for (const check of checks) {
  let result;
  try { result = check.run(); } catch (e) { result = { pass: false, detail: 'Unexpected error: ' + e.message }; }
  const prefix = '[' + check.id + '/' + checks.length + '] ' + check.name;
  // ... status print
}
process.stdout.write('\nResult: ' + passed + ' PASS, ' + failed + ' FAIL, ' + skipped + ' SKIPPED\n');
process.exit(failed > 0 ? 1 : 0);
```

**Phase 71 fixture takeaway:** Phase 71 test is leaner than chain validators (no subprocess, no chain). Use the simple `for (const t of tests) {...}` loop above. Match exit-code contract: `exit 0` on all pass; `exit 1` on any FAIL.

**3-fixture coverage contract** (per CONTEXT line 19 V-71-FIX-02):
1. **Label-not-captured** — input contains `**One-liner:** value`; extractor must return `value` (NOT the label `"One-liner:"` which the upstream buggy regex returns).
2. **Pre-write idempotency** — input already has frontmatter `one-liner:`; `preWriteFrontmatterOneLiner` must return input UNCHANGED.
3. **Placeholder-allowlist scan** — synthetic clean MILESTONES.md content (`## v1.8 (Shipped) ... key accomplishments ... clean bullets`) must yield zero matches against the 11-token `PLACEHOLDER_TOKENS` list (the 10 original tokens + `Edit \\d+ --` NEW DISCOVERY).

---

### `scripts/validation/check-phase-71.mjs` (validator, request-response)

**Analog:** `scripts/validation/check-phase-67.mjs` (Path-A template — verbatim copy + V-71-FIX-01/02 + V-71-MILESTONES-01 + V-71-ARCHIVE02-01 additions; remove SWEEP-01/02 frozen-aware checks; CHAIN_PHASES bump to {48..70}). See also `check-phase-66.mjs:43-66` for the chain-apex topology comment-block invariant.

**Imports pattern** (`check-phase-67.mjs:15-18` — verbatim):

```javascript
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';
```

**`readFile()` CRLF-normalization helper** (`check-phase-67.mjs:23-27` — verbatim; Phase 31 `ca40eb9` lineage):

```javascript
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}
```

**CHAIN_PHASES + CHAIN_SKIP topology** (`check-phase-66.mjs:43-66` + `check-phase-67.mjs:61-68` — Phase 71 inherits empty CHAIN_SKIP invariant from Phase 68 `7b635ca`):

```javascript
// Extends check-phase-70.mjs chain by adding 70.
// Phase 71 is the validator-as-deliverable in this phase;
// v1.8+ RUNS the chain per D-22 auditor-independence.
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70];

// CHAIN_SKIP topology: empty by Phase 68 CHAIN-03 close (sha 7b635ca) -- invariant inherited verbatim
// from check-phase-{67..70}.mjs (no entries to suppress; full chain expected green post-Phase-68).
const CHAIN_SKIP = new Set([]);
```

**V-NN-CHAIN-NN execFileSync subprocess wrapper** (`check-phase-67.mjs:253-281` — verbatim; nested-mode optimization preserved):

```javascript
const NESTED = process.env.CHECK_PHASE_NESTED === '1';
for (let i = 0; i < CHAIN_PHASES.length; i++) {
  const phaseNum = CHAIN_PHASES[i];
  const id = 'CHAIN-' + phaseNum;
  checks.push({
    id, name: `V-71-${id}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
    run() {
      if (CHAIN_SKIP.has(phaseNum)) {
        return { pass: true, skipped: true, detail: 'pre-existing failure unrelated to Phase 71 (see CHAIN_SKIP docs)' };
      }
      if (NESTED) {
        return { pass: true, skipped: true, detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip recursive chain-guard expansion' };
      }
      const path = `scripts/validation/check-phase-${phaseNum}.mjs`;
      if (!existsSync(join(process.cwd(), path))) {
        return { pass: true, skipped: true, detail: path + ' not present (graceful skip)' };
      }
      try {
        execFileSync('node', [path], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
        return { pass: true, detail: 'check-phase-' + phaseNum + ' exits 0' };
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + stderr.slice(0, 200) };
      }
    }
  });
}
```

**V-NN-AUDIT harness wrapper** (`check-phase-67.mjs:283-302` — verbatim; only `HARNESS` const target changes):

```javascript
const HARNESS = 'scripts/validation/v1.7-milestone-audit.mjs';
// ^ Phase 71 RETAINS v1.7-milestone-audit.mjs (predecessor-byte-unchanged invariant);
//   Phase 74 HARNESS-09 ships NEW v1.8-milestone-audit.mjs — Phase 71 does NOT touch it.

checks.push({
  id: 'AUDIT', name: 'V-71-AUDIT: v1.7-milestone-audit.mjs exits 0',
  run() {
    if (!existsSync(join(process.cwd(), HARNESS))) {
      return { pass: true, skipped: true, detail: HARNESS + ' not present (graceful skip)' };
    }
    try {
      execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
      return { pass: true, detail: 'v1.7 harness exits 0' };
    } catch (err) {
      const stderr = err.stderr ? err.stderr.toString() : '';
      const stdout = err.stdout ? err.stdout.toString() : '';
      const isMissing = err.code === 'ENOENT' || err.status === 127
        || stderr.includes('not found') || stderr.includes('Could not resolve');
      if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
      return { pass: false, detail: 'harness FAIL: ' + (stdout + stderr).slice(0, 300) };
    }
  }
});
```

**V-NN-SELF guard** (`check-phase-67.mjs:304-312` — verbatim; ID swap 67->71):

```javascript
checks.push({
  id: 'SELF', name: 'V-71-SELF: CHAIN_PHASES array does NOT include 71 (no self-recursive call)',
  run() {
    if (CHAIN_PHASES.includes(71)) return { pass: false, detail: 'CHAIN_PHASES includes 71 -- self-reference regression' };
    const skipList = [...CHAIN_SKIP].sort((a, b) => a - b).join(',');
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] -- 71 absent (correct); CHAIN_SKIP = [' + skipList + ']' };
  }
});
```

**NEW assertions specific to Phase 71** — V-71-FIX-01 + V-71-FIX-02 + V-71-MILESTONES-01 + V-71-ARCHIVE02-01 (per CONTEXT lines 18-22 + RESEARCH Code Examples 4-6):

```javascript
// === V-71-FIX-01: vendored extractor exists + carries corrected regex ===
const EXTRACTOR_PATH = 'scripts/archive/extract-summary-oneliners.mjs';
const TEST_FIXTURE_PATH = 'scripts/archive/test-extract-oneliner.mjs';

checks.push({
  id: 'FIX-01',
  name: 'V-71-FIX-01: scripts/archive/extract-summary-oneliners.mjs exists + carries corrected regex',
  run() {
    const c = readFile(EXTRACTOR_PATH);
    if (c === null) return { pass: false, detail: EXTRACTOR_PATH + ' missing' };
    // Anchor on the literal corrected regex fragment (the LABEL anchor).
    const ok = c.includes('**One-liner:**\\s+([^\\r\\n]+)') || c.includes('\\*\\*One-liner:\\*\\*');
    if (!ok) return { pass: false, detail: 'corrected regex **One-liner:** anchor not present in vendored extractor' };
    return { pass: true, detail: 'vendored extractor carries corrected regex anchor' };
  }
});

// === V-71-FIX-02: test fixture exists + 3 cases discoverable ===
checks.push({
  id: 'FIX-02',
  name: 'V-71-FIX-02: scripts/archive/test-extract-oneliner.mjs exists + 3 fixture cases discoverable',
  run() {
    const c = readFile(TEST_FIXTURE_PATH);
    if (c === null) return { pass: false, detail: TEST_FIXTURE_PATH + ' missing' };
    // 3 fixtures named "Fixture 1" / "Fixture 2" / "Fixture 3" per RESEARCH Pattern 1 selfTest convention.
    const f1 = /Fixture 1/.test(c);
    const f2 = /Fixture 2/.test(c);
    const f3 = /Fixture 3/.test(c);
    const missing = [];
    if (!f1) missing.push('Fixture 1');
    if (!f2) missing.push('Fixture 2');
    if (!f3) missing.push('Fixture 3');
    if (missing.length > 0) return { pass: false, detail: 'test fixture missing labels: ' + missing.join(', ') };
    return { pass: true, detail: '3 fixture cases discoverable in companion test file' };
  }
});

// === V-71-MILESTONES-01: anchored-bullet placeholder-label scan of MILESTONES.md HEAD ===
const PLACEHOLDER_TOKENS = [
  'One-liner:', 'SUBSUMED BY PLAN', 'Hash:', 'Pre-edit:', 'Total file size:',
  'File:', 'Insertion position:', 'Single deliverable:', 'Plan goal:', 'Found during:',
  'Edit \\d+ --',  // NEW class discovered by D-03 advisor at v1.1 line 164
];

function buildGarbageRegex() {
  const escaped = PLACEHOLDER_TOKENS.map(t =>
    t === 'Edit \\d+ --' ? t : t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  ).join('|');
  return new RegExp('^- (?:' + escaped + ')', 'gm');
}

checks.push({
  id: 'MILESTONES-01',
  name: 'V-71-MILESTONES-01: .planning/MILESTONES.md HEAD -- zero placeholder-label garbage bullets',
  run() {
    const c = readFile('.planning/MILESTONES.md');
    if (c === null) return { pass: false, detail: '.planning/MILESTONES.md missing' };
    const re = buildGarbageRegex();
    const matches = c.match(re) || [];
    if (matches.length > 0) {
      // Diagnostic-rich on FAIL: first 5 hits with line numbers (WRAPPER-01 diagnostic-richness lesson)
      const lines = c.split('\n');
      const hits = [];
      const singleRe = new RegExp('^- (?:' + PLACEHOLDER_TOKENS.map(t =>
        t === 'Edit \\d+ --' ? t : t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      ).join('|') + ')');
      for (let i = 0; i < lines.length && hits.length < 5; i++) {
        if (singleRe.test(lines[i])) hits.push((i + 1) + ':' + lines[i].slice(0, 80));
      }
      return { pass: false, detail: matches.length + ' placeholder bullets; first hits: ' + hits.join(' | ') };
    }
    return { pass: true, detail: 'MILESTONES.md clean: 0 placeholder bullets across ' + c.length + ' bytes' };
  }
});

// === V-71-ARCHIVE02-01: v1.1 H2 + v1.2 H2 specific residue sites cleared post-sweep ===
checks.push({
  id: 'ARCHIVE02-01',
  name: 'V-71-ARCHIVE02-01: v1.1 line 164 + v1.2 lines 145-148 known-residue sites cleared post-sweep',
  run() {
    const c = readFile('.planning/MILESTONES.md');
    if (c === null) return { pass: false, detail: '.planning/MILESTONES.md missing' };
    const lines = c.split('\n');
    // Locate H2s by heading (line numbers shift with re-author; scan dynamically).
    let v11h2 = -1, v12h2 = -1, v10h2 = -1;
    for (let i = 0; i < lines.length; i++) {
      if (/^## v1\.1 /.test(lines[i])) v11h2 = i + 1;
      if (/^## v1\.2 /.test(lines[i])) v12h2 = i + 1;
      if (/^## v1\.0 /.test(lines[i])) v10h2 = i + 1;
    }
    if (v11h2 < 0 || v12h2 < 0) return { pass: false, detail: 'v1.1 or v1.2 H2 missing from MILESTONES.md' };
    // Scope: v1.2 H2 down to v1.1 H2 ; v1.1 H2 down to v1.0 H2 (or EOF).
    const v12body = lines.slice(v12h2 - 1, v11h2 - 1).join('\n');
    const v11body = lines.slice(v11h2 - 1, v10h2 > 0 ? v10h2 - 1 : lines.length).join('\n');
    const re = buildGarbageRegex();
    const v12hits = v12body.match(re) || [];
    const v11hits = v11body.match(re) || [];
    if (v12hits.length > 0 || v11hits.length > 0) {
      return { pass: false, detail: 'v1.2 H2 has ' + v12hits.length + ' debris bullets; v1.1 H2 has ' + v11hits.length + ' debris bullets' };
    }
    return { pass: true, detail: 'v1.1 + v1.2 H2 entries clear of placeholder-label residue' };
  }
});
```

**Runner loop pattern** (`check-phase-67.mjs:314-341` — verbatim; only the header `console.log('check-phase-67 ...')` message swaps to `check-phase-71 -- Phase 71 deliverables (Archive-Automation Root-Cause Fix + Historical Residue Sweep)`).

**Exit-code convention** (`check-phase-67.mjs:341`): `process.exit(failed > 0 ? 1 : 0);` — 0 = PASS, 1 = any FAIL, SKIPPED does not affect exit code (graceful-skip semantic).

**CRITICAL — chicken-and-egg transient at Plan 71-01 commit:** The Plan 71-01 atomic commit lands `check-phase-71.mjs` BEFORE Plan 71-02 sweeps MILESTONES.md residue. V-71-MILESTONES-01 and V-71-ARCHIVE02-01 will FAIL at Plan 71-01 commit time. This is the documented transient-RED state per Plan 70-05 Commit A precedent (`14683de`). The exit-code-1 FAIL at Plan 71-01 commit is by design; Plan 71-02 commit closes the gap. See RESEARCH §"Chicken-and-Egg Resolution" lines 1029-1054 for the operational mechanics.

---

### `.planning/MILESTONES.md` (planning-doc, content-restoration via Edit-tool surgical edit)

**Analog:** v1.6 H2 entry at `.planning/MILESTONES.md:25-32` + v1.7 H2 entry at `.planning/MILESTONES.md:3-21` (both retroactively-authored at v1.7 close 2026-05-29 from canonical `v1.6-MILESTONE-AUDIT.md` / `v1.7-MILESTONE-AUDIT.md` source-of-truth). The v1.6 entry is especially apt for the v1.1+v1.2 re-authoring because it includes the canonical retroactive-authoring `**Note:**` row that Plan 71-02 inherits verbatim.

**Bullet style + line-length norms + retroactive-authoring "Note:" row** — extracted from `.planning/MILESTONES.md:25-32` (v1.6 H2, the closest formal precedent for re-authoring from MILESTONE-AUDIT source):

```markdown
## v1.6 Apple Business Delegated Governance & Multi-Org Operations (Shipped: 2026-05-25)

**Phases completed:** 5 phases (62-66), 30 plans
**Audit status:** `passed` (.planning/milestones/v1.6-MILESTONE-AUDIT.md; terminal re-audit at Phase 66-04 from fresh `git clone --no-hardlinks` into `$env:TEMP\v1.6-audit-<rand>` via fresh `gsd-executor` sub-agent; 23 PASS / 0 FAIL / 5 SKIPPED in check-phase-66.mjs; 15/15 harness PASS in fully-blocking mode; 39/39 requirements closed)

**Note:** v1.6 entry retroactively authored during v1.7 milestone close (2026-05-29) after `/gsd-complete-milestone v1.7` invocation surfaced the ARCHIVE-01 cdcce23-class defect -- the archive-script extraction logic emits scripted-extraction labels rather than per-plan SUMMARY content. Full v1.6 narrative archived at `.planning/milestones/v1.6-ROADMAP.md` and `.planning/milestones/v1.6-MILESTONE-AUDIT.md`. Root-cause investigation routed to v1.7-DEFERRED-CLEANUP.md ARCHIVE-01 entry (v1.8+ scope).

**Key accomplishments (summary; see v1.6-MILESTONE-AUDIT.md for full detail):** Apple Business rebrand documentation + delegated permission surface (Organizational Units / custom roles / granular permissions); 5-pillar delivery -- Foundation & Rebrand (Phase 62: glossary + role/privilege model + OUs concept + 3 canonical rebrand callouts + audit harness scaffold with C14/C15/C16 blocking-from-start), Multi-OU Architecture & Admin Setup (Phase 63: OUs-vs-custom-roles decision matrix + sub-org admin onboarding + MDM server assignment + Managed Apple Account provisioning + Shared iPad/Apple TV lifecycle + 3 iOS capability matrix rows), Delegation Runbooks (Phase 64: VPP catalog + shared iPad passcode reset (C16 anchor doc) + device release + device transfer + MDM server reassign + audit log scoping + cross-org-boundary cheat sheet), L1/L2 + Hub Navigation Integration (Phase 65: L1 #34 shared iPad passcode reset + L2 #26 permission-denied 7-leaf decision tree + 5 hub-file append-only edits; C16 4-edge cross-link integrity triangle live with 0 exemptions), Validation Tooling Closure & Milestone Audit (Phase 66: C11 keyword extension + C15 banned-phrase refinement + BASELINE_10 refresh + per-phase validators check-phase-62..66.mjs + CI workflow `audit-harness-v1.6-integrity.yml` + terminal re-audit from FRESH `git clone --no-hardlinks` per D-03 LOCKED). Methodology highlight: 4-agent parallel adversarial-review (Finder/Adversary/Referee) for Phase 66 gray areas. 39/39 requirements closed. v1.6-DEFERRED-CLEANUP.md authored routing CI-1/CI-2/CI-3/CHAIN_SKIP-CRLF + 5 other deferrals to v1.7+.
```

**Phase 71 application — KEY pattern observations:**

1. **The v1.6 H2 uses a paragraph-summary `**Key accomplishments (summary; see ...):**` row** (one long paragraph with `--` separator clauses), NOT a multi-bullet list. v1.7 H2 (lines 3-21) DOES use a multi-bullet list with `- **Pillar A ...**` / `- **Pillar B ...**` shape. Plan 71-02 author has Discretion (CONTEXT line 194) on whether v1.1 + v1.2 re-author into bullet-list form (v1.7 style) or paragraph-summary form (v1.6 style). RESEARCH Examples 8-9 use bullet-list form — recommended as the dominant Phase 71 pattern.
2. **The `**Audit status:** ...` row is canonical** — every retroactively-authored H2 carries it, citing the audit-doc path + the audit summary verdict + key metrics (phase count, PASS counts, requirement coverage). Plan 71-02 v1.1 H2 should include `**Audit status:** \`tech_debt\` (.planning/milestones/v1.1-MILESTONE-AUDIT.md; ...)`; v1.2 H2 should include `**Audit status:** \`gaps_found\` (.planning/milestones/v1.2-MILESTONE-AUDIT.md; ...)`.
3. **The `**Note:** ... retroactively authored ... ARCHIVE-01 ...` row is the canonical retroactive-authoring witness** — Plan 71-02 inherits this verbatim with date `2026-06-03` (today) and reference to ARCHIVE-02 (NOT ARCHIVE-01 — Phase 71 is the ARCHIVE-02 sweep itself; ARCHIVE-01 is the upstream defect cited in the v1.6 H2 as the original trigger).

**Edit-tool surgical-edit mechanism** — RESEARCH Pattern 3 lines 465-476 (Plan 68-04 T-68-04-LE precedent). Plan 71-02 Wave 2 + Wave 3 MUST:

1. `Read` MILESTONES.md first (confirms existing line-ending convention via the Read tool's output).
2. Use `Edit` tool with VERBATIM `old_string = <multi-line block including trailing newline char>` -> `new_string = <verbatim replacement bullets from audit doc>`. SMALL `old_string` ranges (per RESEARCH Pitfall 3 lines 562-573) — e.g., only the 4 debris lines + 2 surrounding lines for uniqueness, NOT the whole H2 block.
3. Post-edit: `git diff HEAD -- .planning/MILESTONES.md` shows ONLY the intended hunks (no full-file rewrite). v1.0/v1.3/v1.4/v1.4.1/v1.5/v1.6/v1.7 H2 ranges remain byte-unchanged.

**Anti-patterns to avoid** (RESEARCH Pitfalls 3-4-5-6 lines 562-614):
- DO NOT use PowerShell `Set-Content` or `Out-File` (CRLF/LF drift per Plan 68-04 T-68-04-LE).
- DO NOT use large `old_string` ranges covering the whole H2 block (markdown editors hide trailing whitespace; Edit-tool fails on whitespace mismatch).
- DO NOT touch v1.0/v1.3/v1.4/v1.4.1/v1.5/v1.6/v1.7 H2 ranges (predecessor-byte-unchanged invariant).

---

### `71-VERIFICATION.md` (close-gate report)

**Analog:** `.planning/milestones/v1.7-phases/68-chain-skip-root-cause-resolution-pillar-b-validator-surgery/68-VERIFICATION.md` (most-similar shape — chain validator + multi-plan + atomic SHA record) + `.../67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/67-VERIFICATION.md` (most-similar Pillar A shape — SC#1-4 satisfaction layout).

**YAML frontmatter** (`67-VERIFICATION.md:1-21` — verbatim shape; Phase 71 adjusts phase + dates + score):

```yaml
---
phase: 71-archive-automation-root-cause-fix-pillar-a
verified: 2026-06-03
status: passed
score: 4/4 SC satisfied (ARCHIVE-01 + ARCHIVE-02 closure)
v71_final_state: "<TBD: ALL chain green or transient-RED status TBD per Plan 71-01 Wave 4 actual output>"
overrides_applied: 0
re_verification:
  previous_status: in-progress
  previous_score: 2/3 plans complete
  gaps_closed: []
  gaps_remaining: []
  regressions: []
verifier_cross_check:
  verified: 2026-06-03
  verifier: Claude (gsd-verifier)
  status: passed
  goal_backward_evidence_count: <count>
  observations:
    - "<observation 1>"
---
```

**Section A — Phase Goal Achievement narrative** (`68-VERIFICATION.md:50-72` shape) — 3-plan cascade narrative table:

```markdown
## Section A -- Phase 71 Goal Achievement

Phase 71 (Pillar A -- Archive-Automation Root-Cause Fix) closes the ARCHIVE-01 + ARCHIVE-02 defects ...

**3-plan cascade resolved 2 requirements (ARCHIVE-01 + ARCHIVE-02):**

| Plan | Requirement | Commit | Files | Atomic? |
|------|-------------|--------|-------|---------|
| 71-01 | ARCHIVE-01 (vendored extractor + fixture + validator) | `<SHA>` | scripts/archive/extract-summary-oneliners.mjs (NEW) + scripts/archive/test-extract-oneliner.mjs (NEW) + scripts/validation/check-phase-71.mjs (NEW) | **ATOMIC** (3 files in ONE SHA per Phase 67 Plan 67-02 `55260b3` precedent) |
| 71-02 | ARCHIVE-02 (re-author v1.1 + v1.2 H2 from MILESTONE-AUDIT source) | `<SHA>` | .planning/MILESTONES.md (1 file) | per-plan (Phase 68 Plan 68-04 `d142c7a` precedent) |
| 71-03 | close-gate (this commit) | `<SHA>` | 71-VERIFICATION.md + PROJECT.md + REQUIREMENTS.md + STATE.md + ROADMAP.md + v1.8-DEFERRED-CLEANUP.md (ARCHIVE-UPSTREAM-01 stub) | per-plan |
```

**Section B — Commands Run + Exit Codes table** (`67-VERIFICATION.md:185-197` shape — captured live at Plan 71-03 Wave 1):

```markdown
## Section B -- Commands Run + Exit Codes (Plan 71-03 Wave 1 full chain re-run, 2026-06-03)

| Command | Exit Code | Summary Line |
|---------|-----------|--------------|
| `node scripts/archive/extract-summary-oneliners.mjs --self-test` | **0** | `3 fixtures PASS` |
| `node scripts/archive/test-extract-oneliner.mjs` | **0** | `Result: 3 PASS / 0 FAIL` |
| `node scripts/validation/check-phase-48.mjs` | **0** | `Result: 7 PASS, 0 FAIL, 0 SKIPPED` |
| ... (49 .. 70) ... | **0** | unchanged |
| `node scripts/validation/check-phase-71.mjs` | **0** | `<NN> PASS, 0 FAIL, 0 SKIPPED` |
| `node scripts/validation/v1.7-milestone-audit.mjs` | **0** | `Summary: 15 passed, 0 failed, 0 skipped` (predecessor-byte-unchanged) |
```

**Section C — SC#1-4 Satisfaction** (`67-VERIFICATION.md:209-254` + `68-VERIFICATION.md:155-219` shape) — per-SC evidence + closing commit:

```markdown
## Section C -- SC#1-4 Satisfaction (ROADMAP.md Phase 71 SC#1-4)

### SC#1: Root-cause fix lands -- corrected regex in vendored extractor -- ✓ CLOSED

**Evidence:**
- `scripts/archive/extract-summary-oneliners.mjs` (NEW) carries corrected regex `/^#[^\n]*\r?\n+\*\*One-liner:\*\*\s+([^\r\n]+)/m` at the `extractOneLinerFromBody` export
- Verified empirically against Phase 67 Plan 67-01 SUMMARY body shape -- capture group 1 returns the VALUE
- Companion `--self-test` exits 0 with 3 fixtures PASS

**Closing commit:** Plan 71-01 atomic SHA `<SHA>`

### SC#2: Regression-test fixture exits non-zero on recurrence -- ✓ CLOSED
[...]

### SC#3: Historical residue sweep -- zero placeholder tokens remain -- ✓ CLOSED
[...]

### SC#4: Closing commit SHA records atomic fix+fixture (byte-exact) -- ✓ CLOSED

**Evidence:**
- Plan 71-01 atomic SHA `<SHA>` -- `git show --name-only <SHA>` returns exactly 3 files:
  scripts/archive/extract-summary-oneliners.mjs + scripts/archive/test-extract-oneliner.mjs + scripts/validation/check-phase-71.mjs
- Indivisible per ROADMAP SC#4 + Phase 67 Plan 67-02 `55260b3` 5-file atomic-within-plan precedent

**Closing commit:** Plan 71-01 atomic SHA `<SHA>` (byte-exact witness)
```

**Section D — Atomic-Commit SHA Record table** (`68-VERIFICATION.md:223-238` shape — verbatim layout):

```markdown
## Section D -- Atomic-Commit SHA Record

For v1.8-MILESTONE-AUDIT.md Phase 74 HARNESS-12 traceability sweep, the canonical Phase 71 closing SHAs are:

| Plan | Commit SHA | Files | Atomic? | Note |
|------|-----------|-------|---------|------|
| 71-01 | `<SHA>` | scripts/archive/extract-summary-oneliners.mjs (NEW) + scripts/archive/test-extract-oneliner.mjs (NEW) + scripts/validation/check-phase-71.mjs (NEW) (3 files) | **ATOMIC** | ARCHIVE-01 root-cause fix + regression fixture in ONE SHA per Phase 67 Plan 67-02 `55260b3` precedent. Transient: V-71-MILESTONES-01 + V-71-ARCHIVE02-01 expected FAIL at this SHA until Plan 71-02 lands (per Plan 70-05 Commit A `14683de` documented-transient-RED precedent). |
| 71-02 | `<SHA>` | .planning/MILESTONES.md (1 file) | per-plan | ARCHIVE-02 v1.1 + v1.2 H2 re-authoring from MILESTONE-AUDIT source (Phase 68 Plan 68-04 `d142c7a` MILESTONES.md-separation precedent) |
| 71-03 | `<SHA>` | 71-VERIFICATION.md (NEW) + PROJECT.md + REQUIREMENTS.md + STATE.md + ROADMAP.md + v1.8-DEFERRED-CLEANUP.md (NEW) (6 files) | per-plan | close-gate (verification artifact + ARCHIVE-UPSTREAM-01 stub + traceability flips) |
```

**Section E — Discoveries** (`67-VERIFICATION.md:272-298` + `68-VERIFICATION.md:244-282` shape):

```markdown
## Section E -- Discoveries

Phase 71 execution surfaced these items NOT anticipated by ROADMAP Phase 71 SC#1-4 nor by 71-CONTEXT.md D-01..D-04. Documented for v1.8-DEFERRED-CLEANUP.md routing + Phase 72/73/74 forward coordination.

### Discovery #1: v1.1 line 164 `Edit N --` token-class NEW (D-03 advisor pre-sweep grep)
[...]

### Discovery #2: ARCHIVE-UPSTREAM-01 upstream PR follow-up (deferred per D-01 LOCKED Option B)
[...]
```

**Section F — Phase 72 entry-state readiness signal** (`67-VERIFICATION.md:302-311` + `68-VERIFICATION.md:300-313` shape):

```markdown
## Section F -- Phase 72 / Pillar B Readiness Signal

Phase 71 close-gate satisfies all prerequisites for Phase 72 Pillar B (CHAIN-WRAPPER-01 chain-apex stderr-only wrapper fix) entry:
- **MILESTONES.md is clean** -- v1.1 + v1.2 H2 entries re-authored from canonical audit-doc source; V-71-MILESTONES-01 PASSES on HEAD
- **CHAIN_SKIP = []** confirmed; chain green at Plan 71-03 Wave 1
- **Vendored extractor in place** -- Phase 74 HARNESS-12 plan-phase can invoke `node scripts/archive/extract-summary-oneliners.mjs --milestone v1.8 --pre-write-frontmatter` as Wave-1 pre-step before /gsd:complete-milestone v1.8
- **ARCHIVE-UPSTREAM-01 stub drafted** in v1.8-DEFERRED-CLEANUP.md (Phase 74 HARNESS-12 finalizes the artifact)
```

**Section G — Sign-Off** (`67-VERIFICATION.md:314-325` checkbox shape):

```markdown
## Section G -- Sign-Off

- ✓ ARCHIVE-01 closed (vendored extractor at scripts/archive/extract-summary-oneliners.mjs with corrected regex; companion --self-test + test-extract-oneliner.mjs 3 fixtures PASS; check-phase-71.mjs V-71-FIX-01/02 PASS)
- ✓ ARCHIVE-02 closed (v1.1 + v1.2 H2 entries re-authored from .planning/milestones/v1.1-MILESTONE-AUDIT.md + v1.2-MILESTONE-AUDIT.md canonical source-of-truth; V-71-MILESTONES-01 + V-71-ARCHIVE02-01 PASS post-Plan-71-02)
- ✓ SC#1-4 all satisfied
- ✓ 2/2 Phase 71 requirements closed (ARCHIVE-01 + ARCHIVE-02)
- ✓ 3/3 Plans complete (71-01 atomic + 71-02 re-author + 71-03 close-gate)
- ✓ Phase 71 closed 2026-06-03
```

---

## Shared Patterns

### Shared Pattern 1: CRLF-normalization `readFile()` helper

**Source:** `check-phase-48.mjs:25` + `check-phase-67.mjs:23-27` + `regenerate-supervision-pins.mjs:74-78` (Phase 31 `ca40eb9` lineage)

**Apply to:** `scripts/validation/check-phase-71.mjs` (verbatim).
**Skip in:** `scripts/archive/extract-summary-oneliners.mjs` (extractor needs to preserve original EOL convention for idempotent pre-write; regex `\r?\n` handles CRLF inline).

```javascript
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}
```

### Shared Pattern 2: ESM `.mjs` + Node-stdlib imports only

**Source:** All 23 in-repo `check-phase-NN.mjs` files + `_lib/archive-path.mjs` + `regenerate-supervision-pins.mjs` (25+ `.mjs` files; 0 `.cjs`)

**Apply to:** All 3 new `.mjs` files in Phase 71 (extractor + test + validator). NO `package.json` modifications; NO `npm install`. The vendored extractor uses ONLY: `node:fs` (`readFileSync`, `writeFileSync`, `readdirSync`, `existsSync`, `statSync`), `node:path` (`join`), `node:process`, `node:child_process` (`execFileSync` — validator only).

### Shared Pattern 3: Exit-code-is-the-contract

**Source:** `check-phase-67.mjs:341` + `regenerate-supervision-pins.mjs:381, 517` exit-code convention

**Apply to:** All 3 new `.mjs` files.
- **0** = PASS / success (all fixtures PASS; extractor completed without errors; validator all checks PASS)
- **1** = FAIL (any fixture FAIL; extractor errors > 0; validator any FAIL)
- **2** = Usage error (invalid CLI flag / invalid `--milestone` format)

### Shared Pattern 4: Empty CHAIN_SKIP invariant + CHAIN_PHASES excludes self

**Source:** `check-phase-66.mjs:43-66` + `check-phase-67.mjs:61-68` (Phase 68 `7b635ca` invariant)

**Apply to:** `scripts/validation/check-phase-71.mjs`:
- `CHAIN_PHASES = [48..70]` (does NOT include 71 — V-71-SELF guard enforces).
- `CHAIN_SKIP = new Set([])` (V-71-SELF asserts the empty-Set invariant in its detail string).

### Shared Pattern 5: Predecessor-byte-unchanged invariant

**Source:** RESEARCH §Code Example 10 lines 970-998 + CONTEXT line 42 + Phase 70 Plan 70-04 HARNESS-05 mechanism

**Apply to:** Plan 71-02 Wave 4 + Plan 71-03 Wave 2 (Phase 71 does NOT touch v1.4 / v1.5 / v1.6 / v1.7 workflow YAMLs / harness MJS / sidecar JSONs). Verification via:

```powershell
$predSurfaces = @(
  '.github/workflows/audit-harness-v1.4-integrity.yml',
  '.github/workflows/audit-harness-v1.4.1-integrity.yml',
  '.github/workflows/audit-harness-v1.5-integrity.yml',
  '.github/workflows/audit-harness-v1.6-integrity.yml',
  '.github/workflows/audit-harness-v1.7-integrity.yml',
  'scripts/validation/v1.4-milestone-audit.mjs',
  'scripts/validation/v1.4.1-milestone-audit.mjs',
  'scripts/validation/v1.5-milestone-audit.mjs',
  'scripts/validation/v1.6-milestone-audit.mjs',
  'scripts/validation/v1.7-milestone-audit.mjs',
  'scripts/validation/v1.7-audit-allowlist.json'
)
foreach ($surface in $predSurfaces) {
  $diff = & git diff "<Plan-71-01-SHA>~1" HEAD -- $surface 2>$null
  if ($diff) { Write-Error "Predecessor surface modified: $surface" }
}
```

### Shared Pattern 6: Documented transient-RED chain state (chicken-and-egg)

**Source:** Phase 70 Plan 70-05 Commit A `14683de` — committed validators with `{phase_70_close_SHA}` placeholder unresolved; chain RED in gap until Commit B `4df3a16`.

**Apply to:** Plan 71-01 commit (V-71-MILESTONES-01 + V-71-ARCHIVE02-01 FAIL by design until Plan 71-02 lands). Plan 71-01 commit message body MUST include:

```
Transient: V-71-MILESTONES-01 + V-71-ARCHIVE02-01 expected FAIL until Plan 71-02 lands (per Plan 70-05 Commit A 14683de documented-transient-RED chain state precedent).
```

Plan 71-01 SUMMARY MUST capture the Wave 4 pre-commit dry-run output verbatim (showing 2 FAILs with diagnostic detail naming Plan 71-02 as resolver). Plan 71-03 VERIFICATION.md SC#3 records the transient as resolved at Plan 71-02 SHA.

---

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| (none) | — | — | All 5 files have concrete in-repo analogs. The vendored extractor is the closest-to-novel surface, but `regenerate-supervision-pins.mjs` 3-mode CLI shape + `_lib/archive-path.mjs` ESM helper shape collectively provide a complete pattern coverage. |

---

## Metadata

**Analog search scope:** `scripts/validation/*.mjs` (25+ files), `scripts/validation/_lib/` (1 file), `.planning/milestones/v1.7-phases/{67,68,69,70}-*/` (verification artifacts), `.planning/MILESTONES.md` (v1.6 + v1.7 retroactively-authored H2 entries), `.planning/milestones/v1.{1,2}-MILESTONE-AUDIT.md` (re-authoring source-of-truth)
**Files scanned:** ~30 (full read on `check-phase-67.mjs` + `regenerate-supervision-pins.mjs` + `_lib/archive-path.mjs` + `68-VERIFICATION.md` + first 170 lines of `67-VERIFICATION.md` + first 100 lines of `check-phase-66.mjs` + first 180 lines of `MILESTONES.md`; targeted Grep across phase 71 RESEARCH for Pattern citations)
**Pattern extraction date:** 2026-06-03

---

*Phase 71 pattern map authored 2026-06-03 from in-repo precedent SHAs verified at HEAD. All 5 deliverables map to concrete analog files with concrete code excerpts; the planner can copy patterns directly into per-plan action sections.*
