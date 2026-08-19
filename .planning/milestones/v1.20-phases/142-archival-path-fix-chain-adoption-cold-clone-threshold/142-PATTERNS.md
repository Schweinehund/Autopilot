# Phase 142: Archival-Path Fix, Chain Adoption & Cold-Clone Threshold - Pattern Map

**Mapped:** 2026-08-10
**Files analyzed:** 3 code files (edits only, no new files) + 5 documentation surfaces
**Analogs found:** 3 / 3 code files (each is its own best analog — this is a same-file, same-idiom repair, not a new-pattern build)

**Read-only note:** all codebase interaction for this map was Read/Bash/Grep. No source file was modified.

## File Classification

| File | Role | Data Flow | Closest Analog | Match Quality |
|------|------|-----------|-----------------|---------------|
| `scripts/validation/check-phase-30.mjs` (edit) | validator/check-runner | request-response (CLI, sync file reads → pass/fail) | itself (existing checks in the same file: `V-30-01`/`V-30-02`/`V-30-10`) + `check-phase-31.mjs`'s `resolveArchivedPhasePath` idiom | exact — repairing existing checks, not adding a new role |
| `scripts/validation/check-phase-31.mjs` (edit) | validator/check-runner | request-response (CLI) + file-I/O (archived-path resolution) | itself (`parseInventory()`'s `resolveArchivedPhasePath` call, `:33`) + `check-phase-48.mjs`/`check-phase-62.mjs`/`check-phase-63.mjs` (other `resolveArchivedPhasePath` call sites) | exact |
| `scripts/validation/check-phase-138.mjs` (edit) | validator/apex-orchestrator | batch (spawns N child validator subprocesses, aggregates pass/fail) | `check-phase-60.mjs:43` / `check-phase-62.mjs:52` (non-contiguous hand-authored `CHAIN_PHASES` literal precedent) | role-match — apex-specific mechanics have no true twin, but the "hand-authored array skipping a value" idiom is directly reusable |
| `.planning/REQUIREMENTS.md`, `ROADMAP.md`, `PROJECT.md`, `STATE.md` (marker edits) | governance/doc | transform (annotate-not-overwrite) | `REQUIREMENTS.md:16-24` (SWEEP-01..09's own `[SUCCESS-CRITERION AMENDMENT, D-NN]` bullets) | exact |
| `.planning/milestones/v1.20-CARVE.md` (amendment commit) | governance/doc | event-driven (one commit = one authorization event, must land before the code it authorizes) | `v1.20-CARVE.md:64-77` D-09 procedure itself (self-referential — the file defines its own amendment shape) | exact |
| `.planning/milestones/v1.20-GOV-02-LEDGER.md` (new rows) | governance/doc | CRUD (append-only row insert) | existing rows in the same file (Plan 01/02/03, quoted below) | exact |

## Pattern Assignments

### `scripts/validation/check-phase-30.mjs` (validator, request-response)

**Analog:** itself — three checks in the same file need the same class of fix (regex-literal-not-string-constructed-RegExp; line-anchored-comment-not-frontmatter; structural-not-vacuous-count), plus the `isMissing` classifier idiom shared with `check-phase-31.mjs`.

**Current V-30-01** (lines 52-61) — the check to rewrite, vacuous Mermaid-diamond count:
```javascript
{
  id: 1, name: "Decision tree <=5 decision-diamond nodes",
  type: "file-match-count", required: true,
  run() {
    const content = readFile("docs/decision-trees/07-ios-triage.md");
    if (content === null) return { pass: false, detail: "File does not exist: docs/decision-trees/07-ios-triage.md" };
    const matches = content.match(/^\s*IOS\d+\{/gm) || [];
    const count = matches.length;
    if (count >= 1 && count <= 5) return { pass: true, detail: count + " decision-diamond node(s) found" };
    return { pass: false, detail: "Expected 1-5 decision-diamond nodes, found " + count };
  }
}
```
Successor shape (D-04/D-05/D-09; exact regex is Claude's Discretion, this illustrates the required elements: table presence, IOS1/IOS2/IOS3 tokens, the LOCKED literal):
```javascript
{
  id: 1, name: "07-ios-triage.md Routing Verification table has >=3 rows with IOS1/IOS2/IOS3 and the LOCKED literal",
  type: "structural", required: true,
  run() {
    const content = readFile("docs/decision-trees/07-ios-triage.md");
    if (content === null) return { pass: false, detail: "File does not exist: docs/decision-trees/07-ios-triage.md" };
    // V-30-01 supersedes the pre-conversion Mermaid-diamond count: Phase 122 converted this file
    // from Mermaid to a text decision table under STD-04 (07-ios-triage.md:81 records the change).
    const hasLocked = content.includes("**LOCKED — 23 (nodes + labeled edges)**");
    const hasIOS = ["IOS1", "IOS2", "IOS3"].every(tok => content.includes(tok));
    const tableMatch = content.split(/^## Routing Verification\s*$/m)[1];
    const rowCount = tableMatch
      ? (tableMatch.split(/^## /m)[0].match(/^\|.*\|\s*$/gm) || []).length - 2
      : 0;
    const pass = hasLocked && hasIOS && rowCount >= 3;
    return { pass, detail: `LOCKED=${hasLocked} IOS-tokens=${hasIOS} table-rows=${rowCount}` };
  }
}
```

**Current V-30-02** (lines 63-78) — the `[sS]` double-quoted-string regex bug:
```javascript
{
  id: 2, name: "Single-branch integration (00-initial-triage no iOS in Mermaid)",
  type: "file-absent-match", required: true,
  run() {
    const content = readFile("docs/decision-trees/00-initial-triage.md");
    if (content === null) return { pass: false, detail: "File does not exist: docs/decision-trees/00-initial-triage.md" };
    const mermaidBlocks = [];
    const re = new RegExp("```mermaid\n([\s\S]*?)\n```", "g");
    let m;
    while ((m = re.exec(content)) !== null) mermaidBlocks.push(m[1]);
    const blockText = mermaidBlocks.join("\n");
    const hits = (blockText.match(/iOS|iPadOS|IOS\d+/gi) || []).length;
    if (hits === 0) return { pass: true, detail: "No iOS/IOS tokens inside Mermaid block" };
    return { pass: false, detail: "Found " + hits + " iOS/IOS token(s) inside Mermaid block -- violates SC #2" };
  }
}
```
Fix — one-line, regex literal instead of string-constructed `RegExp` (sidesteps the JS double-escape trap; requires the SC#1 amendment landing first per D-35):
```javascript
const re = /```mermaid\n([\s\S]*?)\n```/g;
```

**Current V-30-10** (lines 185-194) — frontmatter-shaped literal that no longer exists:
```javascript
{
  id: 10, name: "l1-template.md contains Windows | macOS | iOS | all",
  type: "file-contains", required: true,
  run() {
    const content = readFile("docs/_templates/l1-template.md");
    if (content === null) return { pass: false, detail: "File does not exist: docs/_templates/l1-template.md" };
    if (content.includes("Windows | macOS | iOS | all")) return { pass: true, detail: "Enum string present" };
    return { pass: false, detail: "\"Windows | macOS | iOS | all\" not found in l1-template.md" };
  }
}
```
Successor (line-anchored on the author-guidance comment line, D-07/D-08/D-09 — cite supersession cause in the comment):
```javascript
// V-30-10 supersedes the pre-Android enum removed at 600eabd6 (Phase 40-01, v1.4).
{
  id: 10, name: "l1-template.md author-guidance enum includes iOS",
  type: "structural", required: true,
  run() {
    const content = readFile("docs/_templates/l1-template.md");
    if (content === null) return { pass: false, detail: "File does not exist: docs/_templates/l1-template.md" };
    const ok = /^\s*specific platform\. Valid values: Windows \| macOS \| iOS \| Android \| Linux \| all\s*$/m.test(content);
    return { pass: ok, detail: ok ? "iOS present in author-guidance enum" : "author-guidance enum line not found or iOS missing" };
  }
}
```

**`isMissing` classifier, two identical arms in this file** (lines 267-292):
```javascript
const isMissing = err.code === "ENOENT" || err.status === 127
  || stderr.includes("not found") || stderr.includes("Could not resolve")
  || stderr.includes("npm error could not determine executable");
```
Add one new arm (D-13), applied to both arms in this file:
```javascript
|| stderr.includes("npm error npx canceled due to missing packages and no YES option")
```

---

### `scripts/validation/check-phase-31.mjs` (validator, request-response + file-I/O)

**Analog:** `resolveArchivedPhasePath` is already proven in-file — reuse the exact call shape, not the exact call site.

**Existing reusable call site** — `parseInventory()`, lines 32-42 (NOT reusable directly by V-31-23; it lives inside a different function and returns a different discriminator shape, but its idiom is the pattern to replicate):
```javascript
// parseInventory() at check-phase-31.mjs:32-42 — the established `_missing` idiom
// (exact text not re-quoted here; see check-phase-31.mjs:33 for the resolveArchivedPhasePath call
// and :34/:36 for the `{ _missing: true, placeholders: [] }` return shape V-68-08 requires present)
```

**Current V-31-23** (lines 111-113) — brittle line-index + non-archival-aware fixture read:
```javascript
{ id: 23, name: "V-31-23: 06-compliance-policy.md line 182 matches expected-d23.txt", type: "structural", required: true,
  run() { const c = readFile('docs/admin-setup-ios/06-compliance-policy.md'); const expected = readFile('.planning/phases/31-ios-l2-investigation/expected-d23.txt'); if (!c || !expected) return { pass: false, detail: "file or fixture missing" }; const lines = c.split('\n'); const actual = (lines[181] || '').trim(); const exp = expected.trim(); return { pass: actual === exp, detail: actual === exp ? "match" : `MISMATCH — actual[0:80]='${actual.slice(0,80)}' expected[0:80]='${exp.slice(0,80)}'` }; } }
```
Successor (own `resolveArchivedPhasePath` call site, content-anchor on presence not uniqueness/index, D-20/D-21/D-22/D-23):
```javascript
{
  id: 23, name: "V-31-23: expected-d23.txt prose present in 06-compliance-policy.md",
  type: "structural", required: true,
  run() {
    const targetRel = resolveArchivedPhasePath('31-ios-l2-investigation/expected-d23.txt', ['v1.3-phases']);
    if (targetRel === null) return { pass: false, _missing: true, detail: "expected-d23.txt not resolvable at .planning/phases/ or .planning/milestones/v1.3-phases/" };
    const expected = readFile(targetRel);
    if (!expected) return { pass: false, _missing: true, detail: "expected-d23.txt resolved but unreadable" };
    const c = readFile('docs/admin-setup-ios/06-compliance-policy.md');
    if (!c) return { pass: false, detail: "docs/admin-setup-ios/06-compliance-policy.md missing" };
    const present = c.includes(expected.trim());
    return { pass: present, detail: present ? "expected D-23 prose present in 06-compliance-policy.md" : "expected D-23 prose not found anywhere in the file" };
  }
}
```

**Current V-31-25** (lines 117-119) — frontmatter shape that never held a pipe-enum:
```javascript
{ id: 25, name: "V-31-25: L2 template platform enum includes iOS", type: "grep", required: true,
  run() { const c = readFile('docs/_templates/l2-template.md'); if (!c) return { pass: false, detail: "l2-template.md missing" }; return { pass: /^platform: Windows \| macOS \| iOS \| all$/m.test(c), detail: "enum present" }; } }
```
Successor — same regex/idiom as `check-phase-30.mjs`'s V-30-10 successor, applied to `l2-template.md` (D-07's explicit instruction: "make both successors line-anchored... so the two validators stop diverging"):
```javascript
{
  id: 25, name: "V-31-25: l2-template.md author-guidance enum includes iOS",
  type: "structural", required: true,
  run() {
    const c = readFile('docs/_templates/l2-template.md');
    if (!c) return { pass: false, detail: "l2-template.md missing" };
    const ok = /^\s*specific platform\. Valid values: Windows \| macOS \| iOS \| Android \| Linux \| all\s*$/m.test(c);
    return { pass: ok, detail: ok ? "iOS present in author-guidance enum" : "author-guidance enum line not found or iOS missing" };
  }
}
```

**Current V-31-29** (lines 129-131) — `split('\n').length` (= `wc -l` + 1) metric, stale bounds:
```javascript
{ id: 29, name: "V-31-29: Runbook line counts within ±15% of targets", type: "structural", required: false,
  run() { const bounds = { '14': [136, 207], '15': [187, 322], '16': [161, 241], '17': [170, 287] }; const runbooks = resolveL2Runbooks(); const failures = []; for (const r of runbooks) { if (!r.path) { failures.push(`${r.num}: missing`); continue; } const c = readFileSync(r.path, 'utf8').replace(/\r\n/g, '\n'); const n = c.split('\n').length; const [lo, hi] = bounds[r.num]; if (n < lo || n > hi) failures.push(`${r.num}: ${n} lines (bound ${lo}-${hi})`); } return { pass: failures.length === 0, detail: failures.length ? failures.join('; ') : "all within bounds" }; } }
```
Successor (D-24: `wc -l` metric fix + re-derived runbook-14 band — assertion stays live, no exemption; see RESEARCH.md "The V-31-29 tension" for the full derivation table):
```javascript
{
  // Bound re-derived per D-24(b): documented target ~160-180 shifted +31 (the MEASURED
  // v1.3->HEAD EEE-retrofit delta, 114973ba then 956818a0) to ~191-211, then +/-15% per
  // endpoint per 31-VALIDATION.md:69. Metric corrected to wc -l, which that spec mandates.
  id: 29, name: "V-31-29: Runbook line counts within +/-15% of targets (wc -l)", type: "structural", required: false,
  run() {
    const bounds = { '14': [162, 242], '15': [187, 322], '16': [161, 241], '17': [170, 287] };
    const runbooks = resolveL2Runbooks();
    const failures = [];
    for (const r of runbooks) {
      if (!r.path) { failures.push(`${r.num}: missing`); continue; }
      const c = readFileSync(r.path, 'utf8').replace(/\r\n/g, '\n');
      const n = c.split('\n').length - 1; // wc -l equivalent
      const [lo, hi] = bounds[r.num];
      if (n < lo || n > hi) failures.push(`${r.num}: ${n} lines (bound ${lo}-${hi})`);
    }
    return { pass: failures.length === 0, detail: failures.length ? failures.join('; ') : "all within bounds" };
  }
}
```
**Rejected fixes for V-31-29** (do not repeat, per D-24/D-35 and Pitfall 5 in RESEARCH.md): (a) widening only the coded ceiling without re-deriving the documented target — "amends the content-size contract... with nothing counter-ratcheting"; (b) a `KNOWN_EXCEPTION`/`continue` skip for runbook 14 — "a vacuous pass of exactly the V-30-02 class this phase exists to delete."

**`isMissing` classifier — V-31-30, line 134** (already diverges from `check-phase-30.mjs`'s two arms — lacks the `"Could not resolve"` clause; reconciling is optional per D-13, not required):
```javascript
const isMissing = err.code === 'ENOENT' || err.status === 127
  || stderr.includes('not found') || stderr.includes('could not determine executable');
```
Add the same new arm as `check-phase-30.mjs`:
```javascript
|| stderr.includes('npm error npx canceled due to missing packages and no YES option');
```

**`_missing`-style discriminator classifier** — the SAME predicate recurs at three call sites in this phase's scope (D-23, RED-04/05's shared vocabulary): `check-phase-30.mjs:267-292` (two arms, quoted above), `check-phase-31.mjs:134` (quoted above), and the new V-31-23 successor's own `_missing: true` returns (quoted above). All three are the identical `err.code === 'ENOENT' || err.status === 127 || stderr.includes(...)` shape — extend all three with the identical new arm, do not invent a fourth wording.

---

### `scripts/validation/check-phase-138.mjs` (apex, batch/orchestrator)

**Analog:** `check-phase-60.mjs:43` and `check-phase-62.mjs:52` — the established non-contiguous hand-authored `CHAIN_PHASES` literal precedent (both skip phase 50):
```javascript
// check-phase-60.mjs:43
const CHAIN_PHASES = [48, 49, 51, 52, 53, 54, 55, 56, 57, 58, 59];
// check-phase-62.mjs:52
const CHAIN_PHASES = [48, 49, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61];
```
`check-phase-62.mjs:476` also shows the idiom for reporting a hand-authored array's shape in a check's own detail string:
```javascript
return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] -- 62 absent (correct); CHAIN_SKIP = [' + skipList + ']' };
```

**Current apex structure** (full file read this session, key spans):
```javascript
// check-phase-138.mjs:104-106 -- arithmetic span, the three guards immediately after
const CHAIN_START = 48;
const CHAIN_END = 137; // [48..N-1] invariant for N=138: apex EXCLUDES its own phase (138).
const CHAIN_PHASES = Array.from({ length: CHAIN_END - CHAIN_START + 1 }, (_, i) => CHAIN_START + i);

const CHAIN_SKIP = new Set([]);

// :112-126 -- three module-load guards, MUST stay pure arithmetic, MUST NOT be touched:
if (new Set(CHAIN_PHASES).size !== CHAIN_PHASES.length) { throw new Error(/* dedup */); }
if (CHAIN_PHASES.length !== 90) { throw new Error(/* length */); }
if (CHAIN_PHASES[0] !== 48 || CHAIN_PHASES[CHAIN_PHASES.length - 1] !== 137) { throw new Error(/* termini */); }

// :156-158, the loop -- THIS is the only insertion point:
const NESTED = process.env.CHECK_PHASE_NESTED === '1';
for (const phaseNum of CHAIN_PHASES) {
  if (CHAIN_SKIP.has(phaseNum)) continue;
  checks.push({
    id: `CHAIN-${phaseNum}`,
    name: `V-138-CHAIN-${phaseNum}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
    run() { /* NESTED short-circuit, execFileSync, isMissing (ENOENT/127 only) */ }
  });
}
// :226-241, V-138-SELF -- checks CHAIN_PHASES.includes(138) and CHAIN_SKIP.size===0; untouched by this edit
```

**Concrete diff (D-11)** — add a hand-authored sidecar array AFTER the three guards, concatenate ONLY in the loop's iteration source, touch nothing else:
```javascript
// RED-06: pre-chain members archival-path-fixed and adopted in Phase 142. A literal, hand-authored
// sidecar array -- NOT part of the arithmetic CHAIN_PHASES span and NOT subject to its three
// module-load guards. Precedent for a hand-authored non-contiguous CHAIN_PHASES-adjacent array:
// check-phase-60.mjs (skips 50) and check-phase-62.mjs (skips 50). This satisfies HARN-18's
// "generated by arithmetic, never transcribed" because CHAIN_PHASES itself remains pure arithmetic;
// CHAIN_EXTRA is the explicitly-authorized exception, not a violation (D-11, 142-CONTEXT.md).
const CHAIN_EXTRA = [30, 31];

const NESTED = process.env.CHECK_PHASE_NESTED === '1';
for (const phaseNum of [...CHAIN_PHASES, ...CHAIN_EXTRA]) {
  if (CHAIN_SKIP.has(phaseNum)) continue;
  // ... unchanged body -- template-string interpolation (`CHAIN-${phaseNum}`) already produces
  // well-formed check ids/names for 30/31 with zero further change ...
}
```
`V-138-SELF`'s two invariants (`CHAIN_PHASES.includes(138)`, `CHAIN_SKIP.size !== 0`) reference `CHAIN_PHASES`/`CHAIN_SKIP` specifically — do not touch, do not extend to `CHAIN_EXTRA`.

**Sequencing constraint (D-12, hard order):** land this insertion only after `check-phase-30.mjs` and `check-phase-31.mjs` both independently exit 0 standalone. Splicing at HEAD today produces 93 PASS / 2 FAIL, rc=1 (do not re-verify this pre-fix state — already recorded).

**CARVE-authorization prerequisite (D-10, D-19):** `check-phase-138.mjs` is currently ABSENT from `v1.20-CARVE.md`'s Category 5 glob list (`:178-197` lists `check-phase-30.mjs` through `check-phase-70.mjs`, never `check-phase-138.mjs`). A CARVE amendment commit — touching ONLY `v1.20-CARVE.md` — must land before this edit. Amendment procedure, read verbatim (`v1.20-CARVE.md:66-77`):
```
"An amendment to the allowlist below is a commit that: 1. Touches only this file
(.planning/milestones/v1.20-CARVE.md) — no other path, in-scope or out-of-scope, may be
touched in the same commit. 2. Carries a one-line rationale... 3. Lands before the edit it
authorizes — never in the same commit, never after."
```

---

## Shared Patterns

### The `isMissing` classifier (identical predicate, 3 call sites — extend all identically)
**Source:** `check-phase-30.mjs:267-279` (linkCheck arm), `check-phase-30.mjs:280-292` (mermaid arm), `check-phase-31.mjs:134` (V-31-30)
**Apply to:** all three npx-spawn error classifiers in this phase's scope, plus every existing `err.code === 'ENOENT' || err.status === 127 || stderr.includes(...)` arm — one new clause, same wording, all sites:
```javascript
|| stderr.includes("npm error npx canceled due to missing packages and no YES option")
```

### `resolveArchivedPhasePath` call-site idiom
**Source:** `check-phase-31.mjs:33` (inside `parseInventory()`), plus sibling call sites at `check-phase-48.mjs:93`, `check-phase-62.mjs:48`, `check-phase-63.mjs:55`
**Apply to:** V-31-23's new, independent call site — `resolveArchivedPhasePath(suffix, ['v1.3-phases'])`, returning `null` on failure to resolve (discriminate with `_missing: true` in the FAIL branch, do not reuse the existing call site inside `parseInventory()`)

### The `_missing` discriminator return shape
**Source:** `check-phase-31.mjs:34,36` (`parseInventory()`'s two `{ _missing: true, placeholders: [] }` returns) — pinned by `check-phase-68.mjs`'s `V-68-08` (bare whole-file `String.includes('_missing')` check, quoted below)
**Apply to:** any new resolver-null branch in this phase (e.g. V-31-23's successor) — `{ pass: false, _missing: true, detail: "..." }`

### `CHECK_PHASE_NESTED` short-circuit — DO NOT add to check-phase-30/31
**Source:** every `CHAIN_PHASES`-generated check in `check-phase-138.mjs` carries this short-circuit inside its own `run()`; `check-phase-30.mjs`/`check-phase-31.mjs` currently contain ZERO `CHECK_PHASE_NESTED` tokens (verified) and D-14 explicitly WITHDRAWS adding one — it would manufacture standalone/nested divergence with no compensating benefit, since the apex already sets `CHECK_PHASE_NESTED=1` unconditionally on every child it spawns.

### `check-phase-68.mjs` regression guard (RED-07) — read-only, verify before/after
**Source:** `check-phase-68.mjs:96-115` (`V-68-04`, a FLOOR — checks 5 named files still contain the substring `archive-path`):
```javascript
{
  id: 4, name: 'V-68-04: CHAIN-02 archive-path helper imported in 5 call-sites (check-phase-{31,48,60,62,63}.mjs)',
  run() {
    const CALL_SITES = [
      'scripts/validation/check-phase-31.mjs',
      'scripts/validation/check-phase-48.mjs',
      'scripts/validation/check-phase-60.mjs',
      'scripts/validation/check-phase-62.mjs',
      'scripts/validation/check-phase-63.mjs',
    ];
    const missing = [];
    for (const path of CALL_SITES) {
      const c = readFile(path);
      if (c === null) { missing.push(path + ' (file missing)'); continue; }
      if (!c.includes('archive-path')) missing.push(path);
    }
    if (missing.length > 0) return { pass: false, detail: missing.length + ' call-sites lack archive-path import: ' + missing.join(', ') };
    return { pass: true, detail: '5/5 chain-validator call-sites import archive-path helper' };
  }
}
```
`check-phase-68.mjs:170-181` (`V-68-08`, bare whole-file `_missing` check):
```javascript
{
  id: 8, name: 'V-68-08: CHAIN-31 STRETCH check-phase-31.mjs _missing discriminator marker present',
  run() {
    const c = readFile('scripts/validation/check-phase-31.mjs');
    if (c === null) return { pass: false, detail: 'check-phase-31.mjs missing' };
    if (!c.includes('_missing')) {
      return { pass: false, detail: 'check-phase-31.mjs lacks _missing discriminator (CHAIN-31 regression)' };
    }
    return { pass: true, detail: 'check-phase-31.mjs carries _missing discriminator' };
  }
}
```
Baseline to reproduce before AND after every edit: `check-phase-68.mjs` = 33 PASS / 0 FAIL / 0 SKIPPED standalone (run bare, not nested).

### GOV-02 ledger row shape (append-only, one row per edit, target-scoped grep)
**Source:** `.planning/milestones/v1.20-GOV-02-LEDGER.md:19-26` — row schema and Discipline section:
```
| File | Grep command | Hit count | Regression gate run | Result | Plan |
```
Discipline (`:8-17`, verbatim): "Append-only. New rows are appended at the end, in commit order. No existing row is ever edited or reordered by a later plan." / "Row-per-edit, not row-per-path. Every frozen-surface path modified in this milestone gets at least one row." / "Absence is correct, not missing evidence."

**Apply to:** three new rows this phase — one each for `check-phase-30.mjs`, `check-phase-31.mjs`, `check-phase-138.mjs`. Concrete target-scoped + symbol-scoped grep commands (from RESEARCH.md, ready to paste into the ledger's "Grep command" column):
```bash
# check-phase-30.mjs
grep -rn "check-phase-30\.mjs" scripts/validation/ .github/workflows/
grep -rn "V-30-0[12]\|V-30-10" scripts/validation/

# check-phase-31.mjs
grep -rn "check-phase-31\.mjs" scripts/validation/ .github/workflows/
grep -rn "V-31-23\|V-31-25\|V-31-29\|V-31-30\|_missing" scripts/validation/

# check-phase-138.mjs
grep -rn "check-phase-138\.mjs" scripts/validation/ .github/workflows/
grep -rn "CHAIN_PHASES\|CHAIN_EXTRA\|CHAIN_START\|CHAIN_END" scripts/validation/
```
An existing live row's "Result" narrative-sentence shape to imitate (Plan 03 row, `v1.20-GOV-02-LEDGER.md:26`, abbreviated): *"Standalone: `node scripts/validation/check-phase-49.mjs` (22 passed/0 failed/0 skipped, unchanged tally)... `node scripts/validation/carve-gate.mjs` exits 0 (4 in-scope paths, all on-list — Category 5)."* — always name the exact command re-run and its tally, never a bare boolean.

### `[SUCCESS-CRITERION AMENDMENT, D-NN]` / `[DISCHARGED, D-NN]` in-line markers
**Source:** `.planning/REQUIREMENTS.md:16-24` (SWEEP-01 through SWEEP-09, Phase 139-141's own bullets), verbatim shape:
```markdown
- [x] **SWEEP-01**: **[SUCCESS-CRITERION AMENDMENT, D-13/D-14]** Every `actions/checkout@v4` step ...
- [x] **SWEEP-03**: **[SUCCESS-CRITERION AMENDMENT, D-30]** FOUR silent-swallow fallbacks, not three ...
- [x] **SWEEP-09**: **[NEW REQUIREMENT, D-33, scoped to Phase 141]** **[SUCCESS-CRITERION AMENDMENT, D-28]** The remaining silent-swallow ...
```
**Apply to:** the seven `~17s`/`+0.35s` surfaces (D-33) — `ROADMAP.md` Phase 142 SC#3/SC#5, `REQUIREMENTS.md:46,69`, `STATE.md:129-131,305`, `PROJECT.md:954` — annotate with `[DISCHARGED, D-15]` (figure correct, satisfied as written) or `[SUCCESS-CRITERION AMENDMENT, D-NN]` (mechanism withdrawn) as appropriate. Also apply to `ROADMAP.md` Phase 142 SC#1 (extend to name V-30-02, D-35) and SC#2 (additive D-20 amendment). **Never edit the marked figure's value itself** — annotate, do not overwrite (D-15's grandfather clause). Note the `**[TAG]**` bold-lead-in convention (per the project's own decision-bullet grammar rule) allows at most one colon inside the bold span — keep any file:line citation inside the marker outside the `**...**` wrapper.

## No Analog Found

None. This phase edits three existing files whose own current content (and each other's) is the analog for every change — a repair-in-place phase, not a new-pattern build. Documentation-track edits are template-shaped by REQUIREMENTS.md's own existing marker bullets and the GOV-02 ledger's own existing rows.

## Metadata

**Analog search scope:** `scripts/validation/*.mjs` (all `check-phase-{30,31,48,60,62,63,68,138}.mjs`), `.planning/REQUIREMENTS.md`, `.planning/milestones/v1.20-CARVE.md`, `.planning/milestones/v1.20-GOV-02-LEDGER.md`
**Files scanned:** 3 target files (full-file reads already performed by 142-RESEARCH.md this session) + 5 analog/precedent files + 2 governance documents
**Pattern extraction date:** 2026-08-10
**Note:** `142-RESEARCH.md` already contains a full verbatim-code research pass over every file this map cites (`142-RESEARCH.md` lines ~368-919); this PATTERNS.md restructures that same evidence into the planner's per-file-analog format and adds the `check-phase-60`/`62` non-contiguous-array precedent, the GOV-02 ledger row shape, and the REQUIREMENTS.md marker shape which the planner also needs but which RESEARCH.md cites only by line-range, not verbatim quote.
