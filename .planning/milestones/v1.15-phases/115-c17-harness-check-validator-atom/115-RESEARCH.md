# Phase 115: C17 Harness Check (Validator Atom) - Research

**Researched:** 2026-07-04
**Domain:** Node.js Markdown validator (node built-ins only) — EEE contract enforcement
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **1A — Strictness:** C17 ships BLOCKING (exit ≠ 0 on any violation) from Phase 115. NOT
  informational-then-graduate.
- **2A — File scope:** A file is subject to C17 iff its frontmatter carries the new EEE keys
  (e.g. `doc_id`), restricted to the `docs/` tree. Un-retrofitted docs are simply not-yet-enrolled.
  Templates enroll automatically (they carry all four keys).
- **3C — Diagnostics:** Aggregate ALL failures (per-file → per-assertion), exit once at the end.
  Emit machine-readable counts-by-assertion-# summary. Capture and surface child stderr if shelling
  out (CHAIN-WRAPPER-01 lesson).
- **4A — Integration:** Standalone `scripts/validation/c17-*.mjs`, node built-ins only, no
  `CHAIN_PHASES`. Phase 119 (NOT this phase) folds C17 into `v1.15-milestone-audit.mjs`.
- **D-05 — SC3 rep-set:** ROADMAP SC3's "Phase-113 representative set" is unsatisfiable as written
  (outside `docs/`, no EEE keys, wrong separator). Redefine as: templates (already conformant) +
  a dedicated C17 `--self-test` fixture set at `scripts/validation/c17-fixtures/` (≥1 passing,
  ≥1 intentionally-failing). Do NOT retrofit `scripts/pipeline/test-fixtures/`.
- **Assertion #7 source:** Block field-set/order = `Platform · Doc Type · Doc ID · Status`;
  operative check is "Platform + Doc Type are the first two fields." `owner` is NEVER in the block.
- **D1 map source:** `docs/_standards/EEE-SOP-standard.md` (20 entries, authored Phase 114).
  C17 must assert against THIS spec.

### Claude's Discretion (resolve at plan time)

- Exact filename of the standalone C17 script (`c17-eee-contract.mjs` or similar) and its CLI
  flag surface (e.g. `--self-test`, path args, `--json`); keep node-builtins-only.
- Exact Markdown-parsing approach for the 13 assertions — must handle HTML-comment preamble,
  placeholder tokens (`RE-[FILL-IN]`, `platform: all`), `TEMPLATE-SENTINEL` date, cosmetic
  `**bold**` block labels.
- The concrete `## Summary` word-count implementation (ROADMAP SC2 names ≥30 words — adopt that).
- Layout/wording of the machine-readable diagnostics summary.

### Deferred Ideas (OUT OF SCOPE)

- Phase 119: audit fold (`v1.15-milestone-audit.mjs` C1–C17), `check-phase-113..119.mjs`,
  BASELINE_19, V114 pin, 12th CI workflow, frozen-surface re-baseline.
- Post-v1.15: the 2A keyless-new-doc blind spot beyond the reshape-only window.
- v1.16: 45 orphan docs + structural classes under EEE + C17 (carried from Phase 114 D-04).
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| HARN-01 | A new blocking C17 harness check is authored as one indivisible validator atom, asserting the EEE contract from Markdown source — the 13-assertion machine-checkable lint surface | All 13 assertions have verified implementation patterns from existing validators; the block/frontmatter parsing idiom is grounded in `v1.14-milestone-audit.mjs` C5/C10; the D1 map is committed in `docs/_standards/EEE-SOP-standard.md` |
</phase_requirements>

---

## Summary

Phase 115 authors a single standalone Node.js script (`scripts/validation/c17-eee-contract.mjs`)
that enforces the 13-assertion EEE document contract on all enrolled Markdown files under `docs/`.
A file is enrolled if its YAML frontmatter contains a `doc_id` key; this opt-in mechanism means
C17 exits 0 immediately at Phase 115 delivery (only templates and `EEE-SOP-standard.md` are
enrolled), then progressively fails as 116–118 retrofit files whose frontmatter keys are added
without full EEE conformance.

The script is greenfield — no `c17-*.mjs` exists in `scripts/validation/` — and is modeled
closely on the guard-docx.mjs standalone pattern (node-builtins-only, `--self-test` mode with
clean/failing fixtures, aggregate runner, explicit exit code). The 13 assertions are all
implementable with regex-based parsing of raw Markdown text; no external YAML or Markdown parsing
library is needed or permitted. The D1 platform-normalization map (20 entries) is embedded in
the script as a literal constant derived from `docs/_standards/EEE-SOP-standard.md`.

The delivered artifact is one atomic commit: the C17 script + its two fixture files +
verification that the script exits 0 on all currently-enrolled files (7 templates +
EEE-SOP-standard.md).

**Primary recommendation:** Model `c17-eee-contract.mjs` on guard-docx.mjs for the standalone
shape and on v1.14-milestone-audit.mjs C5/C10 for the frontmatter parsing idiom; iterate
enrolled files, collect per-file per-assertion failures, emit structured summary, exit once.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Frontmatter key extraction | Validator script | — | Regex on raw `.md` file; no YAML lib (D-04 node-builtins-only) |
| D1 platform normalization | Validator script | EEE-SOP-standard.md (spec) | Map is embedded constant; spec is the source of truth |
| Block line detection/parsing | Validator script | — | First non-blank body line; strip `**` bold labels; split on `·` |
| File enrollment detection | Validator script | — | `doc_id` key in frontmatter + path under `docs/` |
| Aggregate failure collection | Validator script | — | 3C requirement; per-file → per-assertion array |
| Machine-readable summary | Validator script stdout | — | 3C; layout is Claude's Discretion |
| Self-test fixture proof | `scripts/validation/c17-fixtures/*.md` | `--self-test` mode | D-05; version-controlled; outside `docs/` scope |
| Spec authority | `docs/_standards/EEE-SOP-standard.md` | — | D1 map + assertion list; C17 encodes but does not modify |

---

## Standard Stack

### Core (node built-ins only — zero npm packages)

| Module | Version | Purpose | Why Standard |
|--------|---------|---------|--------------|
| `node:fs` | v24 (LTS built-in) | `readFileSync`, `existsSync`, `readdirSync`, `statSync` | All file reads in existing validators use these; no npm deps allowed (D-04) |
| `node:path` | v24 (LTS built-in) | `join`, `resolve`, `relative` | Path normalization; Windows backslash → forward-slash per v1.14 pattern |
| `node:process` | v24 (LTS built-in) | `process.argv`, `process.cwd()`, `process.stdout.write()`, `process.exit()` | Standard exit-code and output pattern |

**No npm packages. No `_lib/` imports.** [VERIFIED: codebase grep] Every milestone-audit
(`v1.12`, `v1.14`) imports only `node:fs`, `node:path`, `node:process` (lines 38–40). Importing
`_lib/` would break the self-containment invariant required by Phase 119's fold target.

### Runtime Environment

| Property | Value | Source |
|----------|-------|--------|
| Node.js version | v24.17.0 | [VERIFIED: `node --version` on target machine] |
| Script invocation | `node scripts/validation/c17-eee-contract.mjs [--self-test] [--verbose]` | Matches guard-docx and milestone-audit invocation |
| Exit codes | 0 = all PASS; 1 = any FAIL | [VERIFIED: codebase pattern] |

**Installation:** No installation step. Script is a new file; no `npm install` needed.

---

## Package Legitimacy Audit

This phase installs NO external packages. The script uses node built-ins only (D-04). No audit
required.

---

## Architecture Patterns

### System Architecture Diagram

```
docs/ tree
  └─ enrolled files (doc_id in frontmatter)
       │
       ▼
  c17-eee-contract.mjs
       │
       ├─ readFile() (node:fs readFileSync + CRLF normalize)
       ├─ parseFrontmatter()  → {doc_id, status, owner, doc_type, platform, last_verified}
       ├─ parseBody()         → body text after frontmatter close
       ├─ parseBlockLine()    → first non-blank body line, stripped of ** bold markers
       ├─ D1_MAP lookup       → raw platform value → clean label
       │
       ├─ checkFile(path, content) → [{assertionId, detail}, ...]
       │     ├─ #1  Mermaid fence check
       │     ├─ #2  H1 present, exactly once
       │     ├─ #3  H1 ≠ bare RE-\d+
       │     ├─ #4  ## Summary is first H2; no intervening H2/H3
       │     ├─ #5  ## Summary body ≥ 30 words
       │     ├─ #6  Block is single inline paragraph (not a table)
       │     ├─ #7  Platform + Doc Type are first two block fields
       │     ├─ #8  Required frontmatter keys present (all 5)
       │     ├─ #9  Block field values match frontmatter (skip on TEMPLATE-SENTINEL)
       │     ├─ #10 platform resolves in D1 map (hard failure, no fallback)
       │     ├─ #11 Tables >25 rows have prose summary within 5 lines
       │     ├─ #12 Gate blockquote (if present) ≤ 200 chars
       │     └─ #13 status ∈ {Draft, Approved, Superseded}
       │
       ├─ Aggregate: allViolations → {file, assertionId, detail}[]
       │
       ├─ Output per-file violation blocks to stdout
       ├─ Output machine-readable counts-by-assertion summary to stdout
       └─ exit(violations.length > 0 ? 1 : 0)

--self-test mode:
  scripts/validation/c17-fixtures/c17-fixture-passing.md  → expect 0 violations
  scripts/validation/c17-fixtures/c17-fixture-failing.md  → expect specific violations
```

### Recommended Project Structure (Phase 115 deliverables)

```
scripts/
└── validation/
    ├── c17-eee-contract.mjs          # NEW — standalone EEE contract validator
    └── c17-fixtures/                 # NEW — version-controlled self-test fixtures
        ├── c17-fixture-passing.md    # conformant exemplar (all 13 assertions pass)
        └── c17-fixture-failing.md    # intentionally non-conformant (≥1 known violation)
```

### Pattern 1: Frontmatter Extraction (established in v1.14 C5/C10)

**What:** Parse YAML frontmatter from a Markdown file that may have an HTML-comment preamble
before the opening `---`.

**When to use:** Every file read in C17. The multiline regex anchors at any line boundary, so
the HTML-comment preamble in templates is transparent.

**Example:**
```javascript
// Source: scripts/validation/v1.14-milestone-audit.mjs:393,529 (C5/C10 implementations)
// CRLF normalization is mandatory — Windows files may have \r\n (v1.14:53)
const content = readFileSync(absPath, 'utf8').replace(/\r\n/g, '\n');

// Frontmatter match — works even when file starts with <!-- HTML comment -->
// because ^---$ in multiline mode matches --- at the start of ANY line
const fmMatch = content.match(/^---\n([\s\S]*?)\n---/m);
if (!fmMatch) { /* file has no frontmatter — skip (not enrolled) */ }
const fm = fmMatch[1];

// Extract individual keys (allow inline comments after the value)
const docIdMatch   = fm.match(/^doc_id:\s*(.+?)\s*(#.*)?$/m);
const statusMatch  = fm.match(/^status:\s*(.+?)\s*(#.*)?$/m);
const ownerMatch   = fm.match(/^owner:\s*(.+?)\s*(#.*)?$/m);
const docTypeMatch = fm.match(/^doc_type:\s*(.+?)\s*(#.*)?$/m);
const platformMatch = fm.match(/^platform:\s*(.+?)\s*(#.*)?$/m);
const lvMatch      = fm.match(/^last_verified:\s*(\d{4}-\d{2}-\d{2})\s*(#.*)?$/m);

// TEMPLATE-SENTINEL: 1970-01-01 → authoring scaffold; skip value-equality assertions (#9)
const isTemplate = lvMatch && lvMatch[1] === '1970-01-01';
```
[VERIFIED: codebase — v1.14-milestone-audit.mjs lines 393-402 (C5), 529-539 (C10)]

### Pattern 2: Body Extraction After Frontmatter

**What:** Extract the body text (everything after the closing `---` of the frontmatter block).

**When to use:** All structural assertions (#1–#7, #11, #12) operate on the body.

**Example:**
```javascript
// fmMatch.index = position of opening '---' in the content string
// fmMatch[0] = the full matched string: '---\n(fm content)\n---'
// Body starts at: fmMatch.index + fmMatch[0].length + 1  (skip the '\n' after closing ---)
const bodyStart = fmMatch.index + fmMatch[0].length + 1;
const body = content.slice(bodyStart);
const bodyLines = body.split('\n');
```
[VERIFIED: codebase — derived from v1.14 fmMatch usage pattern; line-index arithmetic matches
guard-docx.mjs body-scanning pattern]

### Pattern 3: Block Line Parsing

**What:** Find the EEE block line (first non-blank line of body), normalize bold labels, split
on `·` (U+00B7) to extract fields.

**When to use:** Assertions #6 (not a table), #7 (field order), #9 (field↔frontmatter match).

**Example:**
```javascript
// Source: derived from EEE-SOP-standard.md block format spec (D-05)
// Block line is the FIRST non-blank line of the body
const blockLineIdx = bodyLines.findIndex(l => l.trim() !== '');
const blockLine = bodyLines[blockLineIdx]?.trim() ?? '';

// Assertion #6: block is NOT a table row
const nextNonBlank = bodyLines.slice(blockLineIdx + 1).find(l => l.trim() !== '');
const isTableBlock = blockLine.startsWith('|') ||
  (nextNonBlank && /^\|[-:]/.test(nextNonBlank));

// Parse fields: strip ** bold markers, split on · (U+00B7)
const normalized = blockLine.replace(/\*\*/g, '');
const blockFields = normalized.split('·').map(f => f.trim());
// Field structure per D-05: Platform · Doc Type · Doc ID · Status
// Each field: "Label: Value"
const parseField = (field) => {
  const colonIdx = field.indexOf(':');
  return colonIdx === -1
    ? { key: field.trim(), value: '' }
    : { key: field.slice(0, colonIdx).trim(), value: field.slice(colonIdx + 1).trim() };
};
const parsedFields = blockFields.map(parseField);
// Assertion #7: first field key is 'Platform', second is 'Doc Type'
const firstKey  = parsedFields[0]?.key?.toLowerCase();
const secondKey = parsedFields[1]?.key?.toLowerCase();
```
[CITED: docs/_standards/EEE-SOP-standard.md §"Format specification (D-05)"]

### Pattern 4: walkMd + relNormalize (established pattern)

**What:** Recursively collect `.md` files under a directory; normalize Windows backslash paths
to forward-slash.

**When to use:** Discovering enrolled files under `docs/`.

**Example:**
```javascript
// Source: scripts/validation/v1.14-milestone-audit.mjs:56-74 (walkMd) and 146 (relNormalize)
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

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

function relNormalize(abs) {
  // Normalize CWD prefix and backslashes to forward-slash
  return abs
    .replace(process.cwd() + '\\', '')
    .replace(process.cwd() + '/', '')
    .replace(/\\/g, '/');
}
```
[VERIFIED: codebase — v1.14-milestone-audit.mjs:56-74, 146-147]

### Pattern 5: Runner Loop (established aggregate-and-exit pattern)

**What:** C17's runner loop differs from the single-check-entry pattern in the milestone audits.
C17 iterates enrolled files, runs all 13 assertions per file, collects violations, emits a
structured report, and exits once.

**When to use:** Main execution path (non-self-test mode).

**Example:**
```javascript
// Source: pattern adapted from v1.14-milestone-audit.mjs:955-981 (runner loop)
// and guard-docx.mjs:294-314 (per-check runner)
const allViolations = []; // { file: string, assertion: number, detail: string }

for (const relPath of enrolledFiles) {
  const content = readFile(relPath);
  if (!content) {
    allViolations.push({ file: relPath, assertion: 0, detail: 'unreadable' });
    continue;
  }
  const fileViolations = checkFile(relPath, content);
  for (const v of fileViolations) allViolations.push({ file: relPath, ...v });
}

// Per-file output
const fileSet = [...new Set(allViolations.map(v => v.file))].sort();
for (const file of fileSet) {
  const fv = allViolations.filter(v => v.file === file);
  process.stdout.write(`\n  ${file}:\n`);
  for (const v of fv) {
    process.stdout.write(`    [#${v.assertion}] ${v.detail}\n`);
  }
}

// Machine-readable counts-by-assertion (3C — Claude's Discretion on exact format)
const counts = {};
for (let i = 1; i <= 13; i++) counts[i] = 0;
for (const v of allViolations) if (v.assertion >= 1) counts[v.assertion]++;
process.stdout.write('\nC17 assertion-violation-counts: ' +
  Object.entries(counts).map(([k,v]) => `#${k}=${v}`).join(' ') + '\n');
process.stdout.write(`C17 summary: ${enrolledFiles.length} files checked, ` +
  `${fileSet.length} with violations, ${allViolations.length} total\n`);

process.exit(allViolations.length > 0 ? 1 : 0);
```
[VERIFIED: codebase — runner pattern from v1.14-milestone-audit.mjs, guard-docx.mjs]

### Pattern 6: Self-Test Mode (guard-docx --self-test analog)

**What:** `--self-test` runs C17's parsing logic against committed fixture files and asserts
expected outcomes (fixture-passing → 0 violations; fixture-failing → ≥1 expected violations).

**When to use:** `node scripts/validation/c17-eee-contract.mjs --self-test`

**Example:**
```javascript
// Source: guard-docx.mjs:158-282 (--self-test pattern)
if (SELF_TEST) {
  let stPassed = 0, stFailed = 0;
  function stAssert(label, pass, detail) {
    const tag = pass ? 'PASS' : 'FAIL';
    process.stdout.write(`[ST] ${tag} ${label}${detail ? ' -- ' + detail : ''}\n`);
    if (pass) stPassed++; else stFailed++;
  }

  // Sub-test A: passing fixture produces 0 violations
  const passingContent = readFile('scripts/validation/c17-fixtures/c17-fixture-passing.md');
  const passingViolations = passingContent ? checkFile('fixture-passing.md', passingContent) : null;
  stAssert(
    'Fixture-passing: 0 violations (exit 0 equivalent)',
    passingViolations !== null && passingViolations.length === 0,
    passingViolations === null ? 'fixture file missing' : `got ${passingViolations.length} violations`
  );

  // Sub-test B: failing fixture produces ≥1 violation
  const failingContent = readFile('scripts/validation/c17-fixtures/c17-fixture-failing.md');
  const failingViolations = failingContent ? checkFile('fixture-failing.md', failingContent) : null;
  stAssert(
    'Fixture-failing: ≥1 violation (exit 1 equivalent)',
    failingViolations !== null && failingViolations.length > 0,
    failingViolations === null ? 'fixture file missing' : `got ${failingViolations.length} violations`
  );

  // Sub-test C: specific assertion exercises (synthetic inline)
  // ... (verify D1 map, TEMPLATE-SENTINEL, word-count logic, etc.)

  process.stdout.write(`\nSelf-test: ${stPassed} passed, ${stFailed} failed\n`);
  process.exit(stFailed > 0 ? 1 : 0);
}
```
[VERIFIED: codebase — guard-docx.mjs:158-282 (direct analog)]

### Anti-Patterns to Avoid

- **Importing npm packages:** Breaks the node-builtins-only invariant (D-04). The Phase 119
  milestone-audit fold requires zero `npm install` for the merged file.
- **Importing `_lib/*.mjs`:** `_lib/frozen-at-close.mjs`, `_lib/archive-path.mjs`,
  `_lib/exec-fail-detail.mjs` are for check-phase validators, not for standalone standalone
  scripts. The milestone-audits (`v1.12`, `v1.14`) do NOT import `_lib/`. C17 must not either.
- **Using `yaml` package for frontmatter parsing:** Unnecessary — a single regex
  `/^---\n([\s\S]*?)\n---/m` is sufficient and is the established pattern in C5/C10.
- **Fail-fast on first violation per file:** 3C requires aggregate. Never `return` from
  `checkFile()` early after the first failed assertion.
- **Registering C17 in `CHAIN_PHASES` in any existing check-phase:** C17 is standalone; it is
  NOT wired into any existing chain. Phase 119 authors `check-phase-113..119.mjs` separately.
- **Using `|` as the block separator in parsing:** Templates use `·` (U+00B7 middle-dot).
  Do not confuse with GFM table pipe `|`. Existing `parsePlatformValue()` in v1.14 uses `+`
  as the compound separator — that is a different field (and C17 has its own D1 map).
- **Asserting `## Summary` word-count on the heading line itself:** Count only the prose content
  lines between `## Summary` and the next `##` heading.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| YAML frontmatter parsing | A recursive YAML parser | `/^---\n([\s\S]*?)\n---/m` + per-key regexes | The established idiom in C5/C10 handles all real corpus frontmatter; YAML edge cases (multi-line values, anchors) don't appear in this doc set |
| Platform normalization | A fuzzy matcher / fallback | Exact D1 map lookup with hard-failure | D-09 / META-03: unmapped = HARD FAILURE; any fallback is spec-violating |
| Word count | An NLP tokenizer | `text.split(/\s+/).filter(Boolean).length` | Simple whitespace split is sufficient and matches the C3 AOSP word-count pattern in v1.14 |
| Block field parsing | A markdown-aware AST | Strip `**`, split on `·`, split field on `:` | Block format is a single defined line; AST introduces npm deps |
| File discovery | Shell `find` / glob package | `walkMd()` + `existsSync` | Established pattern, node-builtins-only, handles Windows path separators |

**Key insight:** This phase's implementation domain (Markdown source validation) is solved by
simple line-by-line regex operations. The complexity is in the 13 distinct assertion rules, not
in parsing infrastructure — resist the urge to add YAML or Markdown libraries.

---

## Implementation Reference: The 13 Assertions

Full specification grounded against `docs/_standards/EEE-SOP-standard.md` and `115-CONTEXT.md`.
[VERIFIED: codebase — EEE-SOP-standard.md §C17 Assertion List; 115-CONTEXT.md §Decisions]

| # | Assertion | Key Implementation Note |
|---|-----------|------------------------|
| 1 | No Mermaid fences | `/^```mermaid/m.test(content)` — test on full file content (before body extraction) |
| 2 | H1 present exactly once; first non-block heading | `bodyLines.filter(l => /^# [^#]/.test(l)).length === 1`; H1 must come after block line |
| 3 | H1 ≠ bare `RE-\d+` | Extract H1 text after `# `; test `/^RE-\d+$/` |
| 4 | `## Summary` is first H2; no intervening H2/H3 between block and Summary | First `## ` in body must be `## Summary`; no `##` or `###` in `bodyLines.slice(blockLineIdx+1, summaryIdx)` |
| 5 | `## Summary` ≥ 30 words of prose | Lines from `## Summary`+1 to next `## `, joined and word-split; exclude heading lines and code-fence content |
| 6 | Block is single inline paragraph (not table) | Block line must not start with `\|`; next non-blank line must not match `/^\|[-:]/` |
| 7 | Platform + Doc Type are first two block fields | `parsedFields[0].key.toLowerCase() === 'platform'` AND `parsedFields[1].key.toLowerCase() === 'doc type'` |
| 8 | Required keys present: `doc_id`, `status`, `owner`, `doc_type`, `last_verified` | Per-key regex on `fm`; each must have a non-empty value |
| 9 | Block field values match frontmatter (Platform via D1 map) | Skip for TEMPLATE-SENTINEL files (`last_verified === '1970-01-01'`); also skip doc_id check if frontmatter doc_id contains `[` (placeholder); for non-templates: D1_MAP[platform] === blockFields[0].value; doc_type === blockFields[1].value; doc_id === blockFields[2].value; status === blockFields[3].value |
| 10 | `platform` resolves in D1 map — HARD FAILURE on unmapped value | `!(platform in D1_MAP)` → fail (applies even to templates; templates use `platform: all` which IS in the map) |
| 11 | Tables >25 rows have prose summary within 5 lines | Scan body for table blocks (consecutive `\|` lines); count non-separator rows; if >25, scan lines [tableEnd..tableEnd+5] for a non-blank, non-heading, non-table line |
| 12 | Gate blockquote ≤ 200 chars total | Collect consecutive `> ` lines into blockquote blocks; count character length of each block's text (stripped of `> `); fail if any block >200 chars |
| 13 | `status` ∈ `{Draft, Approved, Superseded}` | `new Set(['Draft','Approved','Superseded']).has(statusFmValue)` |

### Critical parsing details

**TEMPLATE-SENTINEL logic (assertion #9):**
The files `docs/_templates/*.md` carry `last_verified: 1970-01-01 # TEMPLATE-SENTINEL`. C17 must
skip the frontmatter-to-block-field equality check (#9) for these files. The doc_id value
`RE-[FILL-IN]` (contains `[`) and the block's `RE-[NNN]` placeholder do NOT need to match.
Detection: `lvMatch && lvMatch[1] === '1970-01-01'` (same pattern as C5/C10 `continue` at v1.14:402,539).
[VERIFIED: codebase — v1.14-milestone-audit.mjs:402, 539; docs/_templates/l1-template.md:28;
EEE-SOP-standard.md §Template behavior note]

**HTML-comment preamble (templates):**
All 7 templates start with `<!-- ... -->` BEFORE the opening `---` frontmatter delimiter.
The `/^---\n([\s\S]*?)\n---/m` regex correctly skips this preamble because `^` in multiline
mode matches the `---` at the start of the line following `-->`. The HTML comment appears BEFORE
the frontmatter, not between frontmatter close and body, so body parsing is unaffected.
[VERIFIED: codebase — docs/_templates/l1-template.md, admin-template.md, etc.]

**D1 map (20 entries — embed verbatim in the script):**
[VERIFIED: docs/_standards/EEE-SOP-standard.md §D1 Platform Normalization Map]
```javascript
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

**EEE-SOP-standard.md enrollment note:**
`docs/_standards/EEE-SOP-standard.md` carries `doc_id: STD-001` and `platform: all`
(`last_verified: 2026-07-04`, not a TEMPLATE-SENTINEL). It IS enrolled and C17 must pass it.
Its block line: `**Platform:** All Platforms · **Doc Type:** Reference · **Doc ID:** STD-001 · **Status:** Approved`
All fields match the frontmatter after D1 normalization. `platform: all` → `All Platforms`.
[VERIFIED: codebase — docs/_standards/EEE-SOP-standard.md:1-11]

**Assertion #2 — "unique" H1:**
ROADMAP SC2 says "H1 is present, descriptive, and unique." "Unique" means exactly one `# ` heading
in the document body. Detect: `bodyLines.filter(l => /^# [^#]/.test(l))`.
[CITED: .planning/ROADMAP.md:117]

**Assertion #11 — table row counting:**
A table block is a sequence of consecutive lines starting with `|`. The separator row (matching
`/^\|[-: |]+\|$/`) does NOT count toward the row total. Count only data rows.
After the table block, scan up to 5 lines for a prose line (non-blank, not starting with `|`,
`#`, `>`, or a code-fence marker) — this is the required summary.

**Assertion #12 — blockquote character count:**
Collect consecutive `> ` lines into blocks. Strip the `> ` prefix from each line, join with
` ` and count characters. The limit is 200 chars per blockquote block.
If a file has zero blockquotes, this assertion trivially passes ("if present").

---

## Enrolled Files at Phase 115 Delivery (SC3 green-now baseline)

[VERIFIED: codebase — `grep -rl "^doc_id:" docs/ --include="*.md"` run on 2026-07-04]

| File | doc_id | last_verified | Notes |
|------|--------|---------------|-------|
| `docs/_standards/EEE-SOP-standard.md` | STD-001 | 2026-07-04 | Non-template; full value-equality assertion applies |
| `docs/_templates/admin-template.md` | RE-[FILL-IN] | 1970-01-01 | TEMPLATE-SENTINEL; skip #9 equality |
| `docs/_templates/admin-template-android.md` | RE-[FILL-IN] | 1970-01-01 | TEMPLATE-SENTINEL |
| `docs/_templates/admin-template-ios.md` | RE-[FILL-IN] | 1970-01-01 | TEMPLATE-SENTINEL |
| `docs/_templates/admin-template-macos.md` | RE-[FILL-IN] | 1970-01-01 | TEMPLATE-SENTINEL |
| `docs/_templates/l1-template.md` | RE-[FILL-IN] | 1970-01-01 | TEMPLATE-SENTINEL |
| `docs/_templates/l2-template.md` | RE-[FILL-IN] | 1970-01-01 | TEMPLATE-SENTINEL |
| `docs/_templates/reference-template.md` | RE-[FILL-IN] | 1970-01-01 | TEMPLATE-SENTINEL |

**Total enrolled at Phase 115 open: 8 files.** All 7 templates use `platform: all` (maps to
`All Platforms`). None carry Mermaid fences. All have `## Summary` as first H2.

**Plan-time action required:** Before writing C17, manually verify that all 8 enrolled files
will pass each of the 13 assertions as designed, then confirm C17 exits 0 on them. This is the
SC3 green-now check.

---

## Common Pitfalls

### Pitfall 1: HTML-Comment Preamble Breaks Frontmatter Detection
**What goes wrong:** A naive "file must start with `---`" check fails all 7 templates.
**Why it happens:** Templates start with `<!-- L1 RUNBOOK TEMPLATE\n...\n-->\n---`.
**How to avoid:** Use the multiline regex `/^---\n([\s\S]*?)\n---/m` which matches `---` at
the start of any line. Never assert `content.startsWith('---')`.
**Warning signs:** All templates fail assertion #8 (no frontmatter found).
[VERIFIED: codebase — docs/_templates/l1-template.md:1-32]

### Pitfall 2: Wrong Body Start Index After Frontmatter
**What goes wrong:** Body extraction includes the closing `---` line, causing assertion #6 to
see `---` as the block line.
**Why it happens:** Off-by-one when computing body start from `fmMatch[0].length`.
**How to avoid:** The closing `---` is included in `fmMatch[0]` as `\n---`. Body starts at
`fmMatch.index + fmMatch[0].length + 1`. Verify with the l1-template.md: body should start
with a blank line, then the block line.
**Warning signs:** Block-line detection fails on all files; assertion #6 sees `---`.

### Pitfall 3: `**bold**` Labels Prevent `·` Split
**What goes wrong:** The block line `**Platform:** All Platforms · **Doc Type:** ...` splits
incorrectly if `**` is not stripped first — the `:` inside `**Platform:**` is parsed as the
field delimiter instead of the `·` separator.
**How to avoid:** `blockLine.replace(/\*\*/g, '')` BEFORE splitting on `·`. Then each field
is `Label: Value`.
**Warning signs:** Assertion #7 fails on all templates (Platform field not detected first).
[VERIFIED: codebase — docs/_templates/l1-template.md:34 block line]

### Pitfall 4: TEMPLATE-SENTINEL Files Fail Assertion #9 for doc_id
**What goes wrong:** C17 compares frontmatter `doc_id: RE-[FILL-IN]` against block `RE-[NNN]`
and flags a mismatch for all 7 templates.
**Why it happens:** Templates have placeholder doc_id values, not real RE-NNN IDs.
**How to avoid:** Skip assertion #9 value-equality check when `isTemplate === true`
(last_verified === '1970-01-01'). Alternatively, detect placeholder by checking whether
frontmatter doc_id contains `[`.
**Warning signs:** All 7 templates fail assertion #9 for doc_id field mismatch.
[VERIFIED: codebase — EEE-SOP-standard.md §Template behavior note; l1-template.md:23,34]

### Pitfall 5: Assertion #4 Fires on Valid Templates Due to Gate Blockquote
**What goes wrong:** The l1-template.md has a gate blockquote AFTER `## Summary` and before
`## Prerequisites`. If assertion #4 is implemented as "no content between H1 and `## Summary`,"
it should not fire — but if the blockquote scan extends to the whole body, it may.
**Why it happens:** Misreading assertion #4 as "no content between H1 and `## Summary`."
The correct read is: "no H2 or H3 between the header block and `## Summary`." A blank line and
the H1 title between the block and `## Summary` are permitted.
**How to avoid:** Assertion #4 checks ONLY for H2/H3 headings (lines starting with `##` or
`###`) between the block line index and the `## Summary` index. Non-heading content is allowed.
[VERIFIED: codebase — docs/_templates/l1-template.md structure; 115-CONTEXT.md §D-05]

### Pitfall 6: Blockquote Character Count Counts `> ` Prefix
**What goes wrong:** Including the `> ` prefix characters in the 200-char limit makes the
check silently tighter than the spec.
**Why it happens:** The spec says "≤200 characters" of the blockquote content, not the raw
Markdown lines.
**How to avoid:** Strip the `> ` prefix from each line before counting: 
`lines.map(l => l.replace(/^>\s?/, '')).join(' ').length`.

### Pitfall 7: Self-Test Fixtures Accidentally Inside `docs/`
**What goes wrong:** If fixtures are placed under `docs/`, they enroll in C17's scope and C17
attempts to validate them as real documents. The failing fixture would then cause C17 to exit 1
in normal mode.
**How to avoid:** Place fixtures under `scripts/validation/c17-fixtures/` (outside `docs/`).
The scope guard `path.startsWith('docs/')` or the `walkMd('docs')` call naturally excludes them.
[CITED: 115-CONTEXT.md §D-05 — "Do NOT retrofit scripts/pipeline/test-fixtures/*"]

### Pitfall 8: Assertion #11 Counts Table Separator Rows
**What goes wrong:** A table with 1 header + 1 separator + 24 data rows (26 total Markdown lines)
is incorrectly counted as 26 rows and triggers the prose-summary check.
**How to avoid:** Exclude separator rows matching `/^\|[-: |]+\|$/` from the row count. Only
count actual data rows (header + data, not separator).

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Informational validators that graduate (C9/C11/C13 pattern) | Blocking from Phase 115 (D-01/1A) | Phase 115 via adversarial review 2026-07-04 | C17 is a live gate for all 116–118 content; no graduation step needed |
| SUMMARY.md §C17 assertion #7 wording ("Platform and Doc Type appear before Owner…") | 114-CONTEXT.md D-05 assertion #7 ("Platform + Doc Type are first two fields; `owner` NEVER in block") | Phase 114 D-01 locked on 2026-07-04 | The SUMMARY.md wording is superseded; planner MUST use 114-CONTEXT D-05 for #7 |
| Phase-113 representative-set as SC3 target | Templates + C17 `--self-test` fixture set as SC3 target | D-05 grounding correction 2026-07-04 | Pipeline fixtures are non-conformant (outside `docs/`, wrong separator, no EEE keys) |
| `review_by` - `last_verified` ≤ 60 days (C10 original) | ≤ 90 days (v1.14 D-01a) | Phase 112 discuss-flag #7 | C17 does NOT assert freshness cadence — C10 handles that; C17 only asserts `last_verified` key presence (assertion #8) |

**Deprecated/outdated:**
- SUMMARY.md assertion #7 wording: superseded by 114-CONTEXT D-05 block field set. **Planner: use 114-CONTEXT D-05, NOT SUMMARY.md wording for assertion #7.**
- `windows+macos+ios+android+linux` as a D1 entry: IS in the 20-entry map as an "All Platforms"
  synonym. Not deprecated — it is a real corpus value.

---

## Assumptions Log

> No claims in this research were tagged `[ASSUMED]`. All critical facts were verified against
> the repo (codebase grep, direct file reads) or cited from official in-repo documentation
> (`docs/_standards/EEE-SOP-standard.md`, `115-CONTEXT.md`, `v1.14-milestone-audit.mjs`).

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| — | — | — | — |

**This table is empty:** All claims in this research were verified or cited.

---

## Open Questions

1. **Assertion #9 skip condition — template detection via sentinel vs. placeholder pattern**
   - What we know: `last_verified: 1970-01-01` (TEMPLATE-SENTINEL) is the canonical marker for
     templates (EEE-SOP-standard.md §TEMPLATE-SENTINEL; C5/C10 skip `1970-01-01` files).
   - What's discretionary: whether to ALSO skip #9 when `doc_id` contains `[` (double guard),
     or rely solely on the sentinel.
   - Recommendation: Use sentinel (`last_verified === '1970-01-01'`) as the sole skip signal;
     it is the established idiom and applies to all 7 templates. Checking `[` in `doc_id` adds
     complexity with no additional safety.

2. **Assertion #5 word count — whether to exclude HTML comments from `## Summary` body**
   - What we know: No templates have HTML comments after the frontmatter. The `## Summary`
     section in all 8 enrolled files at Phase 115 consists of plain prose or a placeholder
     bracketed string.
   - What's unclear: Whether future retrofitted docs might embed HTML comments in `## Summary`.
   - Recommendation: Simple whitespace-split word count is sufficient; the spec does not exclude
     comments. If an HTML comment appears in the Summary, its words count toward the 30-word
     minimum. This is fine — the standard doesn't prohibit comments there.

3. **How 116–118 invoke C17 as a merge gate**
   - What we know: CONTEXT.md D-04 says "Content phases 116–118 invoke it directly as a live
     gate." C17 is a standalone script exiting 0/1.
   - What's unclear: Whether C17 is run against the whole `docs/` tree or against specific
     directories per-phase. Likely the whole `docs/` tree (since scope is managed by enrollment,
     not by invocation path).
   - Recommendation: Design C17 to accept optional directory args (default: `docs/`) for
     convenience; but the default behavior (whole `docs/` tree with enrollment filter) is the
     correct gate. Phases 116–118 can add a step: `node scripts/validation/c17-eee-contract.mjs`
     after each batch of files is retrofitted.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Script execution | ✓ | v24.17.0 | — |
| `node:fs` | File reads | ✓ | Built-in | — |
| `node:path` | Path ops | ✓ | Built-in | — |
| `node:process` | Exit codes, argv | ✓ | Built-in | — |
| `docs/_standards/EEE-SOP-standard.md` | D1 map (embedded) | ✓ | Authored Phase 114 | — |
| `docs/_templates/*.md` (7 files) | SC3 green-now proof | ✓ | Authored Phase 114 | — |

**Missing dependencies with no fallback:** None.

---

## Security Domain

This phase authors a local file-read-only validator script. It reads `.md` files under `docs/`
and writes to stdout. No network access, no authentication, no user-supplied file paths in
production use. No ASVS categories apply.

The one security-relevant consideration: the script uses `readFileSync` without sanitizing
paths — but since it only reads files discovered by `walkMd('docs/')`, path traversal is not
a concern. Do not add `--path` CLI flag that takes arbitrary user paths without validation.

---

## Sources

### Primary (HIGH confidence — verified in-repo)
- `scripts/validation/v1.14-milestone-audit.mjs` — frontmatter parsing idiom (C5 lines 393-417,
  C10 lines 518-554), walkMd/relNormalize helpers (lines 56-74, 146-147), runner loop
  (lines 955-981), self-test pattern (lines 818-939), node-builtins-only imports (lines 38-40)
- `scripts/validation/v1.12-milestone-audit.mjs` — identical patterns confirmed; same imports
- `scripts/pipeline/guard-docx.mjs` — standalone script shape, `--self-test` dual-invariant
  proof (lines 158-282), runner loop (lines 294-314); the direct structural analog for C17
- `docs/_standards/EEE-SOP-standard.md` — D1 map (20 entries), assertion list (§C17 Assertion
  List), block format spec (D-05), TEMPLATE-SENTINEL definition, status vocabulary
- `docs/_templates/l1-template.md`, `reference-template.md` — confirmed HTML-comment preamble
  structure, TEMPLATE-SENTINEL usage, block format, `platform: all`
- `.planning/phases/115-c17-harness-check-validator-atom/115-CONTEXT.md` — all locked decisions
- `.planning/phases/114-eee-standard-templates-doc-id-registry-metadata-rules/114-CONTEXT.md` —
  D-01 (owner frontmatter-only), D-05 (block field-set/order), D-09 (D1 no-fallback rule)

### Secondary (MEDIUM confidence)
- `.planning/research/SUMMARY.md` §"C17 Lint Surface" (lines 190-208) — the 13 assertions; note
  assertion #7 wording superseded by 114-CONTEXT D-05
- `.planning/ROADMAP.md` §Phase 115 lines 109-121 — SC1–SC4 deliverable spec
- `.planning/REQUIREMENTS.md` HARN-01 (line 45) — blocking indivisible atom requirement

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — node v24.17.0 verified on machine; imports confirmed in v1.12/v1.14
- 13 assertion implementations: HIGH — all derived from verified spec (`EEE-SOP-standard.md`)
  and verified codebase patterns (C5/C10/guard-docx)
- Enrolled file set at Phase 115: HIGH — confirmed by `grep -rl "^doc_id:" docs/`
- D1 map entries: HIGH — verbatim from `docs/_standards/EEE-SOP-standard.md` (Phase 114 output)
- Self-test fixture approach: HIGH — direct analog to guard-docx `--self-test` pattern

**Research date:** 2026-07-04
**Valid until:** 2026-08-04 (30 days — stable spec; the only invalidation would be changes to
templates or EEE-SOP-standard.md that alter assertion behavior, which are not in scope)
