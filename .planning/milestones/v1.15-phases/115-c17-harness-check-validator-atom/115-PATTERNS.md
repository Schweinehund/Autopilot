# Phase 115: C17 Harness Check (Validator Atom) - Pattern Map

**Mapped:** 2026-07-04
**Files analyzed:** 3 (1 script + 2 fixture files)
**Analogs found:** 3 / 3

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `scripts/validation/c17-eee-contract.mjs` | utility/validator | file-I/O + transform | `scripts/pipeline/guard-docx.mjs` (standalone shape + `--self-test`) AND `scripts/validation/v1.14-milestone-audit.mjs` (frontmatter idiom + runner) | exact (composite) |
| `scripts/validation/c17-fixtures/c17-fixture-passing.md` | test fixture | — | `scripts/pipeline/guard-docx.mjs` clean fixture pattern (lines 197-217) | role-match |
| `scripts/validation/c17-fixtures/c17-fixture-failing.md` | test fixture | — | `scripts/pipeline/guard-docx.mjs` leaked fixture pattern (lines 245-256) | role-match |

---

## Pattern Assignments

### `scripts/validation/c17-eee-contract.mjs` (utility/validator, file-I/O + transform)

**Primary analog (standalone shape):** `scripts/pipeline/guard-docx.mjs`
**Secondary analog (frontmatter parsing + runner):** `scripts/validation/v1.14-milestone-audit.mjs`

---

#### Imports pattern

**Source:** `scripts/validation/v1.14-milestone-audit.mjs` lines 38–40 AND `scripts/pipeline/guard-docx.mjs` lines 19–23

```javascript
// v1.14-milestone-audit.mjs:38-40 — the canonical node-builtins-only import block
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
```

Note: `guard-docx.mjs` also imports `execFileSync` and `tmpdir` for pandoc, which C17 does NOT need — C17 is read-only, no child process. Copy v1.14's import block verbatim. Do NOT import anything from `./lib/` or `_lib/` (milestone-audit convention).

---

#### Shebang + file header + argv parsing

**Source:** `scripts/pipeline/guard-docx.mjs` lines 1–32

```javascript
#!/usr/bin/env node
// c17-eee-contract.mjs -- EEE document contract validator (Phase 115 HARN-01 SC1)
//
// Asserts the 13-assertion EEE contract on all enrolled Markdown files under docs/.
// A file is enrolled iff its YAML frontmatter contains a doc_id key.
//
// D-07 analog: This script is the Phase-119 seed for v1.15-milestone-audit.mjs C17.
// Keep it standalone now; the audit-fold is Phase 119's job.
//
// Usage:  node scripts/validation/c17-eee-contract.mjs [--self-test] [--verbose]
// Exit 0: all enrolled files pass all 13 assertions (or no enrolled files found)
// Exit 1: any assertion violation

// Node built-ins ONLY -- zero external npm packages (matches scripts/validation/ convention)
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');
const SELF_TEST = argv.includes('--self-test');
```

---

#### readFile helper + CRLF normalization

**Source:** `scripts/validation/v1.14-milestone-audit.mjs` lines 50–54

```javascript
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');  // CRLF normalization per Phase 31 ca40eb9
}
```

CRLF normalization is mandatory — Windows files contain `\r\n`. Copy verbatim.

---

#### walkMd helper (recursive .md file walker)

**Source:** `scripts/validation/v1.14-milestone-audit.mjs` lines 56–74

```javascript
// walkMd: recursive .md file walker (verbatim from scripts/validation/check-phase-30.mjs lines 21-38)
function walkMd(dir) {
  const abs = join(process.cwd(), dir);
  if (!existsSync(abs)) return [];
  const results = [];
  function walk(current) {
    let entries;
    try { entries = readdirSync(current); } catch { return; }
    for (const entry of entries) {
      const full = join(current, entry);
      let stat;
      try { stat = statSync(full); } catch { continue; }
      if (stat.isDirectory()) { walk(full); }
      else if (entry.endsWith('.md')) { results.push(full); }
    }
  }
  walk(abs);
  return results;
}
```

---

#### relNormalize helper (Windows backslash → forward-slash)

**Source:** `scripts/validation/v1.14-milestone-audit.mjs` lines 144–147

```javascript
// Normalize path separators to forward slashes so Windows backslash paths match allow-list entries.
function relNormalize(abs) {
  return abs.replace(process.cwd() + '\\', '').replace(process.cwd() + '/', '').replace(/\\/g, '/');
}
```

Used after `walkMd` to convert absolute paths to CWD-relative forward-slash paths for display and enrollment check (`relPath.startsWith('docs/')`).

---

#### Frontmatter extraction + TEMPLATE-SENTINEL detection

**Source:** `scripts/validation/v1.14-milestone-audit.mjs` lines 393–402 (C5) and 529–539 (C10)

```javascript
// Matches --- frontmatter even when file starts with <!-- HTML comment --> (multiline mode)
const fmMatch = content.match(/^---\n([\s\S]*?)\n---/m);
if (!fmMatch) { /* no frontmatter -- file not enrolled */ }
const fm = fmMatch[1];

// Per-key extraction (allow inline comments after value)
const docIdMatch    = fm.match(/^doc_id:\s*(.+?)\s*(#.*)?$/m);
const statusMatch   = fm.match(/^status:\s*(.+?)\s*(#.*)?$/m);
const ownerMatch    = fm.match(/^owner:\s*(.+?)\s*(#.*)?$/m);
const docTypeMatch  = fm.match(/^doc_type:\s*(.+?)\s*(#.*)?$/m);
const platformMatch = fm.match(/^platform:\s*(.+?)\s*(#.*)?$/m);
const lvMatch       = fm.match(/^last_verified:\s*(\d{4}-\d{2}-\d{2})\s*(#.*)?$/m);

// TEMPLATE-SENTINEL: 1970-01-01 → authoring scaffold; skip assertion #9 value-equality checks
// Pattern: v1.14:402 — `if (lvMatch[1] === '1970-01-01') continue;`
const isTemplate = lvMatch && lvMatch[1] === '1970-01-01';
```

**Enrollment check (D-02 2A):** a file is enrolled only when `docIdMatch` is truthy AND its relative path starts with `docs/`. If `!docIdMatch`, skip the file entirely (not enrolled).

---

#### Body extraction (after frontmatter close)

**Source:** Derived from v1.14 `fmMatch` usage pattern; arithmetic described in 115-RESEARCH.md Pattern 2

```javascript
// Body starts at the character immediately after the closing '\n---'
// fmMatch[0] = '---\n(fm content)\n---'  (closing --- is INSIDE fmMatch[0])
const bodyStart = fmMatch.index + fmMatch[0].length + 1;
const body = content.slice(bodyStart);
const bodyLines = body.split('\n');
```

The `+ 1` skips the newline that follows `\n---`. Without it, `bodyLines[0]` is empty-string (the `\n` itself) and block-line detection finds `---` as the first non-blank line (Pitfall 2 in RESEARCH.md).

---

#### Block line parsing (strip bold, split on ·, parse fields)

**Source:** Derived from EEE-SOP-standard.md block format spec (115-RESEARCH.md Pattern 3)

```javascript
// First non-blank line of body = the EEE header block line
const blockLineIdx = bodyLines.findIndex(l => l.trim() !== '');
const blockLine = bodyLines[blockLineIdx]?.trim() ?? '';

// Assertion #6: block is NOT a table row
const nextNonBlank = bodyLines.slice(blockLineIdx + 1).find(l => l.trim() !== '');
const isTableBlock = blockLine.startsWith('|') ||
  (nextNonBlank && /^\|[-:]/.test(nextNonBlank));

// Strip ** bold markers FIRST (Pitfall 3 — must precede · split)
const normalized = blockLine.replace(/\*\*/g, '');
// Split on · (U+00B7 MIDDLE DOT) — never confuse with GFM table pipe |
const blockFields = normalized.split('·').map(f => f.trim());
// Each field: "Label: Value" — split on first colon only
const parseField = (field) => {
  const colonIdx = field.indexOf(':');
  return colonIdx === -1
    ? { key: field.trim(), value: '' }
    : { key: field.slice(0, colonIdx).trim(), value: field.slice(colonIdx + 1).trim() };
};
const parsedFields = blockFields.map(parseField);
// Assertion #7: Platform first, Doc Type second
const firstKey  = parsedFields[0]?.key?.toLowerCase();
const secondKey = parsedFields[1]?.key?.toLowerCase();
// Pass: firstKey === 'platform' && secondKey === 'doc type'
```

---

#### D1 platform normalization map (embed as constant)

**Source:** `docs/_standards/EEE-SOP-standard.md` §D1 Platform Normalization Map (Phase 114 output); verified in 115-RESEARCH.md

```javascript
// D1 map: 20 entries verbatim from docs/_standards/EEE-SOP-standard.md
// Hard-failure on unmapped value (D-04, no fallback — assertion #10)
const D1_MAP = {
  'Windows': 'Windows',
  'windows': 'Windows',
  'macOS': 'macOS',
  'macos': 'macOS',
  'iOS': 'iOS',
  'ios': 'iOS',
  'Android': 'Android',
  'android': 'Android',
  'Linux': 'Linux',
  'linux': 'Linux',
  'all': 'All Platforms',
  'windows+macos+ios+android+linux': 'All Platforms',
  'cross-platform': 'Cross-Platform',
  'apple-tv': 'Apple TV',
  'iOS,Android': 'iOS + Android',
  'ios+macos': 'iOS + macOS',
  'ios+ipados+macos': 'iOS / iPadOS / macOS',
  'ios+ipados+macos+tvos': 'iOS / iPadOS / macOS / tvOS',
  'ios+macos+shared-ipad': 'iOS + macOS + Shared iPad',
  'ios+shared-ipad': 'iOS + Shared iPad',
};
```

Assertion #10: `if (!(platformRaw in D1_MAP)) { violations.push(...) }`. This fires even on templates (`platform: all` IS in the map → passes; an unknown value fails).

---

#### Runner loop (aggregate + exit once — Decision 3C)

**Source:** `scripts/validation/v1.14-milestone-audit.mjs` lines 955–981; `scripts/pipeline/guard-docx.mjs` lines 294–314

```javascript
// v1.14:955-981 — aggregate all-PASS/FAIL; exit once at end
let passed = 0, failed = 0, skipped = 0;

for (const check of checks) {
  let result;
  try {
    result = check.run();
  } catch (e) {
    result = { pass: false, detail: 'Unexpected error: ' + e.message };
  }
  const prefix = '[' + check.id + '/' + checks.length + '] ' + check.name;
  if (result.skipped) {
    skipped++;
    process.stdout.write(padLabel(prefix) + 'SKIPPED -- ' + (result.detail || '') + '\n');
  } else if (result.pass) {
    passed++;
    const showDetail = result.detail && VERBOSE;
    process.stdout.write(padLabel(prefix) + 'PASS' + (showDetail ? ' ' + result.detail : '') + '\n');
  } else {
    failed++;
    process.stdout.write(padLabel(prefix) + 'FAIL -- ' + (result.detail || '') + '\n');
  }
}

process.stdout.write('\nSummary: ' + passed + ' passed, ' + failed + ' failed, ' + skipped + ' skipped\n');
process.exit(failed > 0 ? 1 : 0);
```

C17's runner differs from the milestone-audit shape in that it iterates **enrolled files** (not a fixed checks array). The per-file per-assertion violations are aggregated into `allViolations[]`, then printed per-file at the end. See RESEARCH.md Pattern 5 for the C17-specific loop. The `padLabel` helper (v1.14:949-953) should be copied verbatim.

---

#### padLabel helper

**Source:** `scripts/validation/v1.14-milestone-audit.mjs` lines 949–953 (identical in `guard-docx.mjs` lines 145–149)

```javascript
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}
```

---

#### Self-test mode pattern

**Source:** `scripts/pipeline/guard-docx.mjs` lines 158–282; `scripts/validation/v1.14-milestone-audit.mjs` lines 818–941

The `guard-docx` shape is the closer match for C17's self-test (fixture-file based, not synthetic inline). Key structure:

```javascript
// guard-docx.mjs:158-281 — adapted for C17
if (SELF_TEST) {
  let stPassed = 0, stFailed = 0;

  function stAssert(label, pass, detail) {
    const tag = pass ? 'PASS' : 'FAIL';
    process.stdout.write(padLabel('[ST] ' + label) + tag +
      (detail ? ' -- ' + detail : '') + '\n');
    if (pass) stPassed++; else stFailed++;
  }

  // Sub-test A: passing fixture produces 0 violations
  const passingContent = readFile('scripts/validation/c17-fixtures/c17-fixture-passing.md');
  const passingViolations = passingContent
    ? checkFile('c17-fixture-passing.md', passingContent)
    : null;
  stAssert(
    'Fixture-passing: 0 violations (exit 0 equivalent)',
    passingViolations !== null && passingViolations.length === 0,
    passingViolations === null
      ? 'fixture file missing'
      : 'got ' + passingViolations.length + ' violations'
  );

  // Sub-test B: failing fixture produces ≥1 violation
  const failingContent = readFile('scripts/validation/c17-fixtures/c17-fixture-failing.md');
  const failingViolations = failingContent
    ? checkFile('c17-fixture-failing.md', failingContent)
    : null;
  stAssert(
    'Fixture-failing: ≥1 violation (exit 1 equivalent)',
    failingViolations !== null && failingViolations.length > 0,
    failingViolations === null
      ? 'fixture file missing'
      : 'got ' + failingViolations.length + ' violations'
  );

  // Sub-test C: D1 map hard-failure — unmapped platform
  const syntheticBadPlatform = '---\ndoc_id: TST-001\nstatus: Draft\nowner: tester\ndoc_type: Runbook\nplatform: UnknownOS\nlast_verified: 2026-01-01\n---\n\n# Title\n\n## Summary\nSome prose content for the summary.\n';
  const badPlatformViolations = checkFile('synthetic-bad-platform.md', syntheticBadPlatform);
  stAssert(
    'D1 map: unknown platform → assertion #10 fires',
    badPlatformViolations.some(v => v.assertion === 10),
    'got violations: ' + JSON.stringify(badPlatformViolations)
  );

  process.stdout.write('\nSelf-test: ' + stPassed + ' passed, ' + stFailed + ' failed\n');
  process.exit(stFailed > 0 ? 1 : 0);
}
```

v1.14's self-test (lines 818–941) uses inline synthetic strings for its checks. C17 uses fixture files (closer to guard-docx) AND may add synthetic sub-tests for specific edge cases (D1 map, TEMPLATE-SENTINEL) in Sub-test C.

**Exit pattern** (v1.14:940-941, guard-docx:281):
```javascript
process.exit(stFailed > 0 ? 1 : 0);  // self-test
// ...
process.exit(failed > 0 ? 1 : 0);    // normal mode
```

---

### `scripts/validation/c17-fixtures/c17-fixture-passing.md` (test fixture)

**Analog:** `scripts/pipeline/guard-docx.mjs` clean fixture content (lines 200–217)

This is a Markdown file that must pass ALL 13 C17 assertions. It carries real EEE frontmatter keys (enrolls C17) but is outside `docs/` (not enrolled in normal-mode scan — only used by `--self-test`).

Required structure (derived from enrolled baseline at Phase 115, see RESEARCH.md §Enrolled Files):

```markdown
---
doc_id: C17-TEST-PASS-001
status: Draft
owner: test-author
doc_type: Runbook
platform: Windows
last_verified: 2026-07-04
---

**Platform:** Windows · **Doc Type:** Runbook · **Doc ID:** C17-TEST-PASS-001 · **Status:** Draft

# A Descriptive Title for This Test Fixture

## Summary

This is the summary section. It must contain at least thirty words of prose content to satisfy
assertion number five of the C17 EEE document contract harness check validator as authored in
Phase 115 of the project milestone plan.
```

Key properties:
- `last_verified: 2026-07-04` (not `1970-01-01` → not TEMPLATE-SENTINEL → assertion #9 evaluates)
- Block fields match frontmatter after D1 map (`platform: Windows` → `Windows`)
- `## Summary` is the first H2 with ≥30 words of prose
- H1 is descriptive (not bare `RE-NNN`)
- No Mermaid fences
- No blockquotes >200 chars
- No tables >25 rows

---

### `scripts/validation/c17-fixtures/c17-fixture-failing.md` (test fixture)

**Analog:** `scripts/pipeline/guard-docx.mjs` leaked fixture content (lines 245–256)

This file must be enrolled (has `doc_id`) and must trigger ≥1 known C17 assertion violation. Keep it simple: one deliberate violation that is documented by a comment.

Minimal approach — violate assertion #13 (`status` not in valid set) and assertion #5 (`## Summary` < 30 words):

```markdown
---
doc_id: C17-TEST-FAIL-001
status: InvalidStatus
owner: test-author
doc_type: Runbook
platform: Windows
last_verified: 2026-07-04
---

**Platform:** Windows · **Doc Type:** Runbook · **Doc ID:** C17-TEST-FAIL-001 · **Status:** InvalidStatus

# Test Fixture Intentionally Failing

## Summary

Too short.
```

Key deliberate violations:
- `status: InvalidStatus` → fails assertion #13 (`status ∉ {Draft, Approved, Superseded}`)
- `## Summary` has fewer than 30 words → fails assertion #5

The block value `InvalidStatus` matches the frontmatter status (so assertion #9 passes), making the violations clean and predictable.

---

## Shared Patterns

### Node built-ins only (no npm, no `_lib/`)

**Source:** `scripts/validation/v1.14-milestone-audit.mjs` lines 38–40
**Apply to:** `c17-eee-contract.mjs`

```javascript
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
```

This is the invariant for standalone validators and milestone-audits alike. Breaking it would prevent the Phase-119 fold of C17 into `v1.15-milestone-audit.mjs`. Never add `import ... from './_lib/...'` to C17.

---

### CRLF normalization

**Source:** `scripts/validation/v1.14-milestone-audit.mjs` line 53
**Apply to:** Every `readFileSync` call in `c17-eee-contract.mjs`

```javascript
return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
```

Windows repo. Every file read must normalize line endings before regex operations.

---

### TEMPLATE-SENTINEL skip

**Source:** `scripts/validation/v1.14-milestone-audit.mjs` lines 402, 539
**Apply to:** Assertion #9 (block↔frontmatter value-equality) in `c17-eee-contract.mjs`

```javascript
if (lvMatch[1] === '1970-01-01') continue;  // D-24 TEMPLATE-SENTINEL -- skip
```

In C17, this means: when `isTemplate === true`, do not evaluate assertion #9 equality checks. All 7 templates in `docs/_templates/` carry `last_verified: 1970-01-01 # TEMPLATE-SENTINEL`.

---

### Aggregate-and-exit-once (3C pattern)

**Source:** `scripts/validation/v1.14-milestone-audit.mjs` lines 955–981
**Apply to:** Main execution path of `c17-eee-contract.mjs`

Never `return` early from `checkFile()` on first violation. Collect ALL violations for the file, push them into `allViolations[]`, continue to next file. Exit code is computed once at the end.

---

### Frontmatter regex (multiline, HTML-comment-transparent)

**Source:** `scripts/validation/v1.14-milestone-audit.mjs` line 393
**Apply to:** `parseFrontmatter()` in `c17-eee-contract.mjs`

```javascript
const fmMatch = content.match(/^---\n([\s\S]*?)\n---/m);
```

The `m` flag makes `^` match at any line boundary. This transparently skips an HTML-comment preamble before `---`. Never use `content.startsWith('---')` — all 7 templates start with `<!--`.

---

### Standalone-now / chain-fold-later comment

**Source:** `scripts/pipeline/guard-docx.mjs` lines 10–11
**Apply to:** Header comment of `c17-eee-contract.mjs`

```javascript
// D-07: This script is the Phase-119 seed for check-phase-113.mjs (HARN-03 Atom 2).
// Keep it standalone now; the chain-fold is Phase 119's job.
```

C17's equivalent: "This script is the Phase-119 seed for v1.15-milestone-audit.mjs C17 (Atom 1). Keep it standalone now; the audit-fold is Phase 119's job."

---

## No Analog Found

All three Phase-115 deliverables have close analogs in the codebase. No files require falling back to RESEARCH.md-only patterns.

| File | Status |
|------|--------|
| `scripts/validation/c17-eee-contract.mjs` | Composite analog: guard-docx (standalone shape) + v1.14 (frontmatter/runner) |
| `scripts/validation/c17-fixtures/c17-fixture-passing.md` | Role-match: guard-docx clean fixture pattern |
| `scripts/validation/c17-fixtures/c17-fixture-failing.md` | Role-match: guard-docx leaked fixture pattern |

---

## Metadata

**Analog search scope:** `scripts/validation/`, `scripts/pipeline/`
**Files scanned:** `scripts/pipeline/guard-docx.mjs` (314 lines, full read); `scripts/validation/v1.14-milestone-audit.mjs` (981 lines, targeted reads at lines 1–80, 140–154, 385–434, 515–555, 818–941, 948–981)
**Pattern extraction date:** 2026-07-04
