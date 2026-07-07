# Phase 116: L1/L2 Runbook Retrofit (~75 docs) — Pattern Map

**Mapped:** 2026-07-04
**Files analyzed:** 4 artifact classes (75 runbooks + 1 helper script + 1 registry + enrollment precheck)
**Analogs found:** 4 / 4

---

## File Classification

| New/Modified Artifact | Role | Data Flow | Closest Analog | Match Quality |
|----------------------|------|-----------|----------------|---------------|
| `docs/l1-runbooks/NN-*.md` (42 files) | documentation (runbook) | transform (reformat) | `docs/_templates/l1-template.md` + `c17-fixtures/c17-fixture-passing.md` | exact |
| `docs/l2-runbooks/NN-*.md` (33 files) | documentation (runbook) | transform (reformat) | `docs/_templates/l2-template.md` + `c17-fixtures/c17-fixture-passing.md` | exact |
| `scripts/pipeline/retrofit-runbook.mjs` | utility (transform script) | batch transform, file-I/O | `scripts/pipeline/guard-docx.mjs` + `c17-eee-contract.mjs` | role-match |
| `docs/_registry/RE-index.md` (Status updates) | config / registry | CRUD (row edits) | `docs/_registry/RE-index.md` itself | self-update |

---

## Critical Structural Note: All Batch Plans Share One Analog Set

D-02 partitions the 75 files into ~6–7 plans (tier-outer, platform-inner) for reviewability.
**All plans are structurally identical** — every plan executes the same Q2 transform recipe
against a different file list. The planner MUST NOT over-differentiate across plans.
Each plan references the same four analogs below. The only plan-to-plan variation is:

- The file list (RE-IDs in scope)
- The `owner` value (`L1 Team Lead` vs. `L2 Desktop Lead`)
- The `platform:` injection flag (Windows files only: L1 01–09, L2 01–08)
- The `## Summary` banner wording (L1 read-only-scope vs. L2 escalation/change-control)
- Tailored banners for state-changing runbooks (Q7 enumeration in RESEARCH.md)

---

## Pattern Assignments

### Artifact Class 1: Retrofitted Runbook Shape

**Primary analog:** `docs/_templates/l1-template.md` (L1 files) / `docs/_templates/l2-template.md` (L2 files)
**Secondary analog (simplest passing exemplar):** `scripts/validation/c17-fixtures/c17-fixture-passing.md`

#### Frontmatter key set pattern (`l1-template.md` lines 23–32)

```yaml
---
doc_id: RE-[FILL-IN]
status: Draft
owner: [FILL-IN]
doc_type: Runbook
platform: all
last_verified: 1970-01-01 # TEMPLATE-SENTINEL
review_by: YYYY-MM-DD
applies_to: APv1 | APv2 | both
audience: L1
---
```

**Retrofit rule:** Inject `doc_id`, `status`, `owner`, `doc_type` at the top. Retain
`last_verified`, `review_by`, `applies_to`, `audience` verbatim. If `platform:` is absent
(Windows files: L1 01–09, L2 01–08), inject `platform: Windows`. Set:
- `doc_id:` from registry path join (never hand-transcribe)
- `status: Approved` (not `Draft` — live retrofitted runbooks)
- `owner: L1 Team Lead` (L1 files) or `owner: L2 Desktop Lead` (L2 files)

#### EEE block line pattern (`l1-template.md` line 34 / `l2-template.md` line 35)

```markdown
**Platform:** All Platforms · **Doc Type:** Runbook · **Doc ID:** RE-[NNN] · **Status:** Draft
```

**Retrofit rule:** Replace with actual D1 label (from D1_MAP), actual RE-NNN (from registry),
`Status: Approved`. The `·` is U+00B7 (middle-dot). Field order is fixed: Platform · Doc Type ·
Doc ID · Status. `owner` is NEVER in the block.

**Concrete retrofit example** (from RESEARCH.md Q2, target shape for RE-002):

```markdown
**Platform:** Windows · **Doc Type:** Runbook · **Doc ID:** RE-002 · **Status:** Approved
```

#### D3-A body order pattern (`l1-template.md` lines 34–44 / `l2-template.md` lines 35–44)

```markdown
**Platform:** [D1_LABEL] · **Doc Type:** Runbook · **Doc ID:** RE-[NNN] · **Status:** [Status]

# [Issue Title]

## Summary

[≥30-word prose. Lead sentence = tier banner. Remaining sentences summarize scope.]

> **Version gate:** This guide applies to Windows Autopilot (classic).
> For Autopilot Device Preparation, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).

## Prerequisites
...
```

The gate blockquote appears **after** `## Summary` prose. C17 assertion #2 requires H1 after
the block line; assertion #4 requires `## Summary` to be the first H2 with no H3 between block
line and Summary.

#### `## Summary` pattern: L1 default banner (`l1-template.md` line 40)

```markdown
## Summary

[2–3 sentences: scope, audience (L1 service desk), and safety guardrail. Minimum 30 words.
Open with the read-only scope banner: this runbook covers read-only diagnostic steps only —
no registry edits, no PowerShell execution, no destructive actions. All remediation steps
requiring elevated access or technical investigation must be escalated to L2.]
```

**Retrofit rule:** Lead sentence of every L1 Summary MUST be this tier banner verbatim (or a
tailored variant for state-changing runbooks listed in RESEARCH.md Q7). Remaining sentences
summarize the runbook's existing content — no new technical claims.

#### `## Summary` pattern: L2 default banner (`l2-template.md` line 41)

```markdown
## Summary

[2–3 sentences: scope, audience (L2 desktop engineers), and escalation context. Minimum 30 words.
State what issue this runbook investigates, which diagnostic tools and commands are used
(PowerShell, registry, event logs), and under what circumstances this runbook is entered
(typically from L1 escalation with a pre-collected error description and device info).]
```

**Retrofit rule:** Lead sentence must state that L2 investigation is entered via L1 escalation,
that change-control and MDM command guardrails apply. Tailor for state-changing L2 runbooks
(RE-045, RE-046, RE-047, RE-068, RE-069, RE-071 from RESEARCH.md Q7).

#### Version-History row pattern (from RESEARCH.md Q2 `After` example)

```markdown
## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-07-04 | v1.15 EEE reformat — content not re-reviewed | — |
| 2026-03-20 | Initial version | — |
```

**Retrofit rule:** Prepend the new row before the first existing data row. The `—` is an
em-dash. Date = actual retrofit commit date (fill at commit time, not from a fixed string).
Exception: `docs/l2-runbooks/01-log-collection.md` (RE-044) has no `## Version History`
section — the script must create it.

#### Minimal passing exemplar (`c17-fixtures/c17-fixture-passing.md` lines 1–25)

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

# A Descriptive Title for This C17 Self-Test Passing Fixture

## Summary

This is the summary section for the C17 EEE contract validator self-test passing fixture.
It must contain at least thirty words of prose content to satisfy assertion number five
of the C17 EEE document contract harness check validator as authored in Phase 115 of the
Windows Autopilot documentation project milestone plan for the knowledge base retrofit.

## Version History

| Date | Change |
|------|--------|
| 2026-07-04 | Initial version — C17 self-test passing fixture |
```

This file is the simplest valid EEE shape. Planner can reference it as the shape every
retrofitted runbook must reach. Note it has no gate blockquote — runbooks will have one
relocated after Summary.

---

### Artifact Class 2: Mechanical Retrofit Helper Script (`scripts/pipeline/retrofit-runbook.mjs`)

**Primary analog:** `scripts/pipeline/guard-docx.mjs` (node-builtins idiom, argv handling, checks array, runner loop, self-test pattern)
**Secondary analog:** `scripts/validation/c17-eee-contract.mjs` (D1_MAP, frontmatter parse regex, walkMd, readFile, relNormalize — all directly reusable)

#### Imports pattern (from `guard-docx.mjs` lines 18–26 / `c17-eee-contract.mjs` lines 16–22)

```javascript
#!/usr/bin/env node
// retrofit-runbook.mjs -- Mechanical EEE retrofit helper (Phase 116 D-03)
// Node built-ins ONLY -- zero external npm packages (matches scripts/pipeline/ convention)
import { readFileSync, writeFileSync, existsSync, readdirSync, lstatSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');
const DRY_RUN = argv.includes('--dry-run');
```

**Pattern rule:** Zero `npm install` dependencies. All node built-ins only. This is the
invariant across every script in `scripts/pipeline/` and `scripts/validation/`.

#### D1_MAP constant (copy verbatim from `c17-eee-contract.mjs` lines 26–47)

```javascript
// D1 map: copy verbatim from c17-eee-contract.mjs lines 26–47.
// NEVER diverge — any difference causes C17 #9/#10 failures.
const D1_MAP = {
  'Windows':                      'Windows',
  'windows':                      'Windows',
  'macOS':                        'macOS',
  'macos':                        'macOS',
  'iOS':                          'iOS',
  'ios':                          'iOS',
  'Android':                      'Android',
  'android':                      'Android',
  'Linux':                        'Linux',
  'linux':                        'Linux',
  'all':                          'All Platforms',
  'windows+macos+ios+android+linux': 'All Platforms',
  'cross-platform':               'Cross-Platform',
  'apple-tv':                     'Apple TV',
  'iOS,Android':                  'iOS + Android',
  'ios+macos':                    'iOS + macOS',
  'ios+ipados+macos':             'iOS / iPadOS / macOS',
  'ios+ipados+macos+tvos':        'iOS / iPadOS / macOS / tvOS',
  'ios+macos+shared-ipad':        'iOS + macOS + Shared iPad',
  'ios+shared-ipad':              'iOS + Shared iPad',
};
```

**Pattern rule:** Copy verbatim from `c17-eee-contract.mjs`. Do not modify or abbreviate. Any
divergence from this exact map causes C17 assertion #9 (block value mismatch) or #10 (unmapped
platform) failures.

#### readFile + CRLF normalization pattern (`c17-eee-contract.mjs` lines 61–65)

```javascript
// CRLF normalization is mandatory — Windows repo files contain \r\n.
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}
```

**Pattern rule:** Always normalize CRLF before any line-based parsing. Missing this causes
frontmatter regex to fail on Windows line endings.

#### walkMd dir-walker pattern (`c17-eee-contract.mjs` lines 68–86)

```javascript
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
      try { stat = lstatSync(full); } catch { continue; }
      if (stat.isSymbolicLink()) continue;
      if (stat.isDirectory()) { walk(full); }
      else if (entry.endsWith('.md')) { results.push(full); }
    }
  }
  walk(abs);
  return results;
}
```

**Pattern rule:** Use `lstatSync` (not `statSync`) to avoid following symlinks. Symlink guard
prevents infinite recursion. This is the established pattern shared across all validators.

#### relNormalize path normalizer (`c17-eee-contract.mjs` lines 88–94)

```javascript
function relNormalize(abs) {
  return abs
    .replace(process.cwd() + '\\', '')
    .replace(process.cwd() + '/', '')
    .replace(/\\/g, '/');
}
```

**Pattern rule:** Normalize backslashes to forward-slashes for cross-platform path comparison.
Required on Windows where `join()` returns backslash paths.

#### Frontmatter parse pattern (`c17-eee-contract.mjs` lines 122–133)

```javascript
// Multiline flag: ^ matches --- at ANY line boundary → HTML-comment preamble transparent.
// Never use content.startsWith('---') — all 7 templates start with <!-- comment -->
const fmMatch = content.match(/^---\n([\s\S]*?)\n---/m);
if (!fmMatch) return; // no frontmatter

const fm = fmMatch[1];

// Per-key extraction (allow inline # comments after value)
const docIdMatch    = fm.match(/^doc_id:\s*(.+?)\s*(#.*)?$/m);
const statusMatch   = fm.match(/^status:\s*(.+?)\s*(#.*)?$/m);
const platformMatch = fm.match(/^platform:\s*(.+?)\s*(#.*)?$/m);
const lvMatch       = fm.match(/^last_verified:\s*(\d{4}-\d{2}-\d{2})\s*(#.*)?$/m);
```

**Pattern rule:** Always use the multiline-aware regex `/^---\n([\s\S]*?)\n---/m`. The `m`
flag is required because templates have an HTML comment before the frontmatter. Key regexes
allow `# inline comments` after values (the TEMPLATE-SENTINEL comment uses this).

#### Registry path-to-docId table parse pattern (for retrofit helper)

The `RE-index.md` table must be parsed to build a `Map<relativePath, docId>`. Table format
(from `docs/_registry/RE-index.md` lines 15–18):

```
| Doc ID | Path | Title | Doc Type | Status |
|--------|------|-------|----------|--------|
| RE-001 | docs/l1-runbooks/00-index.md | L1 Runbooks | Runbook | Pending |
| RE-002 | docs/l1-runbooks/01-device-not-registered.md | Device Not Registered in Autopilot | Runbook | Pending |
```

Parse pattern for the helper script:

```javascript
function buildDocIdMap(registryPath) {
  const content = readFile(registryPath);
  const map = new Map();
  for (const line of content.split('\n')) {
    // Match data rows: | RE-NNN | docs/path/to/file.md | ...
    const m = line.match(/^\|\s*(RE-\d+)\s*\|\s*(docs\/[^\|]+?)\s*\|/);
    if (m) map.set(m[2].trim(), m[1].trim());
  }
  return map; // Map<'docs/l1-runbooks/01-device-not-registered.md', 'RE-002'>
}
```

**Pattern rule:** Join on the `Path` column (column 2), never on title or doc_id order.
The registry path column contains forward-slash paths matching `relNormalize()` output.

#### Checks array + runner loop pattern (`guard-docx.mjs` lines 126–314)

```javascript
const checks = [];

checks.push({
  id: 'TRANSFORM',
  name: 'V-RETRO-TRANSFORM: inject frontmatter keys + block line + gate relocation',
  run(filePath) { return runTransform(filePath); }
});

// Runner loop (from guard-docx.mjs lines 294–314)
let passed = 0, failed = 0;
for (const check of checks) {
  let result;
  try { result = check.run(targetPath); }
  catch (e) { result = { pass: false, detail: 'Unexpected error: ' + e.message }; }
  const showDetail = result.detail && (VERBOSE || !result.pass);
  if (result.pass) {
    passed++;
    process.stdout.write(padLabel(check.name) + 'PASS' + (showDetail ? ' -- ' + result.detail : '') + '\n');
  } else {
    failed++;
    process.stdout.write(padLabel(check.name) + 'FAIL -- ' + result.detail + '\n');
  }
}
process.stdout.write('\nResult: ' + passed + ' PASS, ' + failed + ' FAIL\n');
process.exit(failed > 0 ? 1 : 0);
```

**Pattern rule:** Use the same `padLabel` + PASS/FAIL output format from `guard-docx.mjs`.
Exit code 0 = all pass; exit code 1 = any failure. This is the established convention for
all scripts in `scripts/pipeline/` and `scripts/validation/`.

---

### Artifact Class 3: D-05 Blockquote-Compliance Measurement

**Primary analog:** `scripts/validation/c17-eee-contract.mjs` lines 387–405 (assertion #12 logic)

This logic is the completion measurement for D-05 fixes. Planner should specify that the
executor runs this exact logic (or the RESEARCH.md Q4 shell one-liner that replicates it)
before AND after fixing each batch to confirm zero over-limit blockquotes remain.

#### Exact #12 measurement logic (`c17-eee-contract.mjs` lines 387–405)

```javascript
// Reuse verbatim for the D-05 completion measurement script/one-liner
if (!isTemplate) {
  let i = 0;
  while (i < bodyLines.length) {
    if (!inCodeFence[i] && /^>/.test(bodyLines[i])) {
      // Collect consecutive blockquote lines
      const bqLines = [];
      while (i < bodyLines.length && !inCodeFence[i] && /^>/.test(bodyLines[i])) {
        bqLines.push(bodyLines[i].replace(/^>\s?/, '')); // strip "> " prefix
        i++;
      }
      const bqText = bqLines.join(' ');
      if (bqText.length > 200) {
        violations.push({ assertion: 12, detail: `Blockquote exceeds 200 chars (${bqText.length} chars)` });
      }
    } else {
      i++;
    }
  }
}
```

**Key invariants to preserve in any measurement script:**
1. Only lines where the **first character** is `>` are in scope — `N. > text` (list-nested) is invisible
2. Strip exactly one `> ` prefix per line: `line.replace(/^>\s?/, '')`
3. Join consecutive lines with `' '` (single space) before measuring length
4. A truly empty line (`/^$/`) separates groups — a `> ` line (space-only) does NOT
5. Lines inside code fences are excluded (the `inCodeFence` mask)

The RESEARCH.md Q4 node one-liner reproduces this logic and is suitable for a pre-batch
measurement to count over-limit blockquotes per file.

---

### Artifact Class 4: Enrollment-Completeness Precheck (Two-Part SC Pattern)

**Primary analog:** `scripts/validation/c17-eee-contract.mjs` lines 519–534 (enrollment rule)

The Phase-115 D-02 two-part SC requires the planner to author two distinct success criteria
per batch plan: (1) enrollment precheck, then (2) C17 exit 0. Both are mechanically derivable
from the patterns below.

#### C17 enrollment rule (`c17-eee-contract.mjs` lines 519–534)

```javascript
// Enrollment: walkMd('docs') → relNormalize → file enrolled iff doc_id key present AND
// relPath starts with 'docs/' (D-02 2A opt-in by EEE-key presence).
const allMdPaths = walkMd('docs');
const enrolledFiles = [];
for (const absPath of allMdPaths) {
  const relPath = relNormalize(absPath);
  const raw = readFile(relPath);
  if (!raw) continue;
  const fm2 = raw.match(/^---\n([\s\S]*?)\n---/m);
  if (!fm2) continue;
  const hasDocId = fm2[1].match(/^doc_id:\s*(.+?)\s*(#.*)?$/m);
  if (!hasDocId) continue;
  if (!relPath.startsWith('docs/')) continue; // scope guard
  enrolledFiles.push(relPath);
}
```

**Implication for plan SC authoring:** A runbook is enrolled the moment its frontmatter gains
a `doc_id:` key. Batches are independently mergeable: retrofitting 10 files enrolls exactly
those 10 with C17. No risk of a partial batch polluting subsequent batch runs.

#### Enrollment precheck command (from RESEARCH.md Q6)

```bash
# Part 1 — enrollment completeness: must return zero lines before Part 2
for f in docs/l1-runbooks/*.md docs/l2-runbooks/*.md; do
  grep -q "^doc_id:" "$f" && \
  grep -q "^status:" "$f" && \
  grep -q "^owner:" "$f" && \
  grep -q "^doc_type:" "$f" || echo "INCOMPLETE: $f"
done
```

Run for the files in the current batch (scope the glob to the batch's directory or file
range). Zero lines printed = enrollment precheck passes. Any printed line = gap.

#### C17 validation command (Part 2 of the two-part SC)

```bash
node scripts/validation/c17-eee-contract.mjs
```

Exit 0 = all enrolled files pass all 13 assertions. Exit 1 = any violation. Inspect per-file
output for the specific batch's file paths.

**Planner template for every batch plan's SC block:**

```
SC-[batch]-ENROLL: All [N] files in this batch carry doc_id, status, owner, doc_type keys
  (enrollment precheck returns zero lines for this batch's file range)
SC-[batch]-C17:    node scripts/validation/c17-eee-contract.mjs exits 0 with zero violations
  for all [N] files in this batch (inspect per-file output for the batch paths)
```

---

## Shared Patterns

### Platform Injection Guard (17 files — Windows-keyless files)

**Source:** RESEARCH.md Q3 / CONTEXT.md Authoring Notes
**Apply to:** L1 01–09 (RE-002..RE-010) and L2 01–08 (RE-044..RE-051)

These 17 files have no `platform:` frontmatter key. C17 assertion #10 is a hard failure on
absent `platform:`. The retrofit script MUST inject `platform: Windows` for these files.

Verification grep (run at plan time to confirm the complete keyless set):
```bash
grep -rL "^platform:" docs/l1-runbooks/ docs/l2-runbooks/
```

### Gate Blockquote Relocation (all 75 files)

**Source:** CONTEXT.md Authoring Notes / RESEARCH.md Q2 Step 5
**Apply to:** All 75 files

The pre-H1 gate blockquote (identified by **structural position** — first blockquote in the
document before the first H1 line) must be relocated to after the `## Summary` prose.
Match by position, never by literal string. Two gate variants exist:

- `> **Version gate:**` — 10 L1 Windows files and APv2 L1 files
- `> **Platform gate:**` — 32 L1 non-Windows files and all 33 L2 files

The retrofit script detects the first `/^>/` run before the first `/^# [^#]/` line.

### D-05 Word-Preserving Blockquote Split Rule (56 of 75 files)

**Source:** CONTEXT.md D-05 / RESEARCH.md Q4
**Apply to:** All files with ≥1 top-level blockquote exceeding 200 chars (measure with Q4 one-liner)

Two allowed transforms — both preserve every word:

**Transform A** (sentence-boundary split — preferred for gate blockquotes):
```markdown
> Multi-sentence blockquote. First sentence here.

> Second sentence in a new group. Third sentence continues.
```
The blank line between groups must be a truly empty line (zero characters on the line).

**Transform B** (de-blockquote — for non-gate callouts):
```markdown
**Note:** This was a blockquote; now it is a bold-led paragraph invisible to #12.
```

**Forbidden:** trimming, rewording, removing words or links. Escalate unsplittable
single-sentence blockquotes exceeding 200 chars to the content owner.

**List-item-nested blockquotes are invisible to #12** — lines beginning with `N. >` or `- >`
start with the list marker, not `>`, so `/^>/` never matches. Do not split these.

### D1_MAP Exact Match Requirement (all 75 files)

**Source:** `c17-eee-contract.mjs` lines 26–47 / C17 assertion #9
**Apply to:** All files — the block line Platform field must be the D1_MAP output value

The block line `**Platform:**` field must match `D1_MAP[frontmatter_platform]` exactly.
Never hand-transcribe or abbreviate. The retrofit script derives it programmatically.
Example failure mode: `ios+macos+shared-ipad` in frontmatter → block must say
`iOS + macOS + Shared iPad` (not `iOS/macOS/Shared iPad` or the raw key).

### Template-Sentinel False-Pass Guard

**Source:** RESEARCH.md Pitfall 7 / `c17-eee-contract.mjs` lines 135–137
**Apply to:** All retrofitted files

C17 skips assertions #9 and #12 for files with `last_verified: 1970-01-01`. If a retrofitted
runbook accidentally gets the sentinel date (copy-paste from a template), C17 passes silently
on #12 even with over-limit blockquotes. The retrofit script must assert that `last_verified`
from the original file is NOT `1970-01-01` before writing the output.

### Registry Status Update (Pending → Approved)

**Source:** CONTEXT.md Code Insights / `docs/_registry/RE-index.md`
**Apply to:** Each file as it passes C17

`RE-index.md` has a `Status` column tracking the retrofit lifecycle. Each plan must update
the Status column for its batch files from `Pending` to `Approved` after C17 exit 0.
This is a manual table edit — the retrofit script does not auto-update the registry.

---

## No Analog Found

None — all four artifact classes have strong analogs in the existing codebase.

---

## Batch Plan File Assignment Reference

From RESEARCH.md Q8 (7-plan option, recommended):

| Plan | RE-IDs | Tier | Platforms | D-05 Load |
|------|--------|------|-----------|-----------|
| P1 | RE-001..RE-010 | L1 | All Platforms (index), Windows | Light |
| P2 | RE-011..RE-016, RE-036..RE-038 | L1 | macOS | Medium |
| P3 | RE-017..RE-030 | L1 | iOS, Android | Medium-heavy |
| P4 | RE-031..RE-035, RE-039..RE-042 | L1 | Linux, iOS+macOS+Shared iPad, All Platforms | Heavy |
| P5 | RE-043..RE-051 | L2 | All Platforms (index), Windows | Medium |
| P6 | RE-052..RE-068 | L2 | macOS, iOS, Android, iOS+macOS+Shared iPad | Medium-heavy |
| P7 | RE-069..RE-075 | L2 | Linux, macOS, All Platforms | Medium |

**Planner discretion:** Exact plan count and file-to-plan assignment are Claude's Discretion
per CONTEXT.md. The above is the recommended 7-plan structure. A plan for the retrofit
helper script itself (D-03 deliverable) should be Plan 0 or a pre-batch plan — it is a
prerequisite for the file-batch plans.

---

## Metadata

**Analog search scope:** `docs/_templates/`, `scripts/pipeline/`, `scripts/validation/`,
`scripts/validation/c17-fixtures/`, `docs/_registry/`, `docs/_standards/`
**Files scanned:** 7 (both templates, c17-eee-contract.mjs, guard-docx.mjs,
c17-fixture-passing.md, RE-index.md, EEE-SOP-standard.md)
**Pattern extraction date:** 2026-07-04
