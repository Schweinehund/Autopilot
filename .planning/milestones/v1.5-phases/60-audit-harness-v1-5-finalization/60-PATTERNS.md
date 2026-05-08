# Phase 60: Audit Harness v1.5 Finalization - Pattern Map

**Mapped:** 2026-05-06
**Files analyzed:** 11 distinct deliverables (3 modified validation scripts + 1 modified sidecar JSON + 1 modified VERIFICATION artifact + 1 modified ROADMAP + 16+ modified content docs in two clusters + 3 created phase artifacts)
**Analogs found:** 11 / 11 (all deliverables map to existing analog files in repo)

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `scripts/validation/v1.5-milestone-audit.mjs` (MODIFIED — C9/C11/C13 promotion logic + C12 H2-anchor expansion + C9 exemption mechanism wiring) | utility (validation harness) | batch (file-reads-only static analysis) | self (in-place edit) + intra-file analogs C1 (lines 192-219) and C7 (lines 392-415) | exact (intra-file) |
| `scripts/validation/v1.5-audit-allowlist.json` (MODIFIED — 3 new arrays: `c9_exemptions[]`, `c11_ops_exemptions[]`, `c13_broken_link_allowlist[]`) | config (sidecar JSON allowlist) | request-response (loaded by harness) | self (in-place edit) + existing arrays `safetynet_exemptions[]` / `c7_knox_allowlist[]` | exact (intra-file) |
| `scripts/validation/regenerate-supervision-pins.mjs` (MODIFIED — BASELINE_9 lines 393-403 refresh) | utility (sidecar pin classifier) | batch (file-reads-only static analysis with subprocess self-test) | self (in-place edit) — BASELINE_9 array literal | exact (intra-file) |
| `scripts/validation/check-phase-60.mjs` (CREATED — 25 V-60-NN assertions) | test (validator-as-deliverable) | batch (file-reads-only) | `check-phase-48.mjs` (closest by intent: validator alongside harness changes) + `check-phase-58.mjs` V-58-25 (informational-flag-removal regex) + `check-phase-30.mjs` (file-reads-only validator pattern + `walkMd()`) | exact |
| `.planning/phases/48-.../48-VERIFICATION-broken-links.md` (MODIFIED — Triage Decision column populated for 75 entries) | test (close-out artifact / categorized inventory) | batch (read by check-phase-60.mjs V-60-08) | self (in-place column population) | exact (intra-file) |
| `.planning/phases/60-.../60-CALIBRATION.md` (CREATED — pre-promotion C9 + C11 corpus scan) | test (read-only analysis artifact) | batch | `48-VERIFICATION-broken-links.md` (categorized inventory shape — frontmatter + Category sections + Summary table) | role-match (close-out shape, different lifecycle moment) |
| `.planning/phases/60-.../60-VERIFICATION.md` (CREATED — close-state record) | test (close-gate document) | batch | `59-VERIFICATION.md` + `58-VERIFICATION.md` (frontmatter + Goal Achievement table + SC sections + Behavioral Spot-Checks) | exact |
| `.planning/ROADMAP.md` (MODIFIED — SC#5 wording fix `audit-harness-integrity.yml` to `audit-harness-v1.5-integrity.yml`) | config (project roadmap) | batch (read by humans + agents) | self (single-line wording correction; Phase 48 D-09 SC#1 contradiction-handling precedent) | role-match |
| 11 docs/ Category A anchor-fix files (`l1-runbooks/{02,11,12,13,14,21,25,27,28,29}.md` + `l2-runbooks/{21,22,23}.md` + `_glossary-android.md` + `_templates/admin-template-ios.md`) | utility (markdown content; quick-nav TOC blocks) | batch (cluster-edit) | each other; cluster pattern is identical (3-5 broken anchors per file in TOC near top) | exact |
| 5 docs/ Category B path-fix files (`admin-setup-android/{09,10,11,12,13}.md` + `device-operations/03-re-provisioning.md` + `l2-runbooks/{03,04}.md` + `reference/network-infrastructure.md`) | utility (markdown content; relative-path link references) | batch (per-file edit) | each other (per-file relative-link rewrites) | role-match |

## Pattern Assignments

### `scripts/validation/v1.5-milestone-audit.mjs` (utility / validation harness — MODIFIED ATOMIC COMMIT)

**Role:** single-source-of-truth file-reads-only static analysis script; 12 numbered checks (C1-C13 minus retired C4/C8); JSON sidecar consumed via `parseAllowlist()` loader; entrypoint `node scripts/validation/v1.5-milestone-audit.mjs [--verbose]`.

**Analog A (intra-file): C1 SafetyNet proximity-window negation pattern, lines 192-219**

This is the verbatim template for D-01's C11 promotion. Mirror the structure with token swaps (regex set + window keyword set + sidecar key).

```javascript
// Source: scripts/validation/v1.5-milestone-audit.mjs:192-219 [VERIFIED via Read]
run() {
  const violations = [];
  for (const relPath of androidDocPaths()) {
    const content = readFile(relPath);
    if (!content) continue;
    const re = /SafetyNet/g;
    let m;
    while ((m = re.exec(content)) !== null) {
      const idx = m.index;
      const lineNum = content.slice(0, idx).split('\n').length;
      const pinned = ALLOWLIST.safetynet_exemptions.some(
        e => e.file === relPath && e.line === lineNum
      );
      if (pinned) continue;
      const wStart = Math.max(0, idx - 200);
      const wEnd = Math.min(content.length, idx + 200 + 'SafetyNet'.length);
      const window = content.slice(wStart, wEnd);
      if (/successor|turned off|deprecated|Play Integrity/i.test(window)) continue;
      violations.push({ file: relPath, line: lineNum });
    }
  }
  if (violations.length === 0) return { pass: true };
  return {
    pass: false,
    detail: violations.length + ' un-exempted SafetyNet reference(s): '
          + violations.slice(0, 3).map(v => v.file + ':' + v.line).join(', ')
  };
}
```

**C11 adaptation pattern (D-01 mechanism):**
- Replace single regex `/SafetyNet/g` with iteration over `ALLOWLIST.c11_ops_patterns || hardcoded4Pattern[]`, each constructed via `new RegExp(p, 'gi')` (note `g`-flag added; current C11 line 492 uses `i`-only because informational mode never iterates).
- Replace scope `androidDocPaths()` with `walkMd('docs')` per current C11 lines 494-495 (cross-platform ops scope).
- Replace `ALLOWLIST.safetynet_exemptions.some(...)` pin check with `Set` lookup: `new Set(opsAllowlist.map(e => e.file + ':' + e.line))` then `if (opsAllowKey.has(relPath + ':' + lineNum)) continue;` (mirrors C7 `allowKey` set pattern, more efficient than `.some()` loop).
- Replace window keyword regex with D-01 starting set `/successor|deprecated|historical|disambiguation|mutual-exclusion|PITFALL-9|first-occurrence|callout/i` (refine at plan time per D-05 calibration).

**Analog B (intra-file): C7 Knox `allowKey` set + bare-count loop, lines 392-415**

Verbatim template for D-18a's C9 exemption-mechanism wiring. C9 at lines 417-437 currently sources `cope_banned_phrases[]` but ignores hit locations (returns informational PASS unconditionally at line 435). C9 must adopt this shape:

```javascript
// Source: scripts/validation/v1.5-milestone-audit.mjs:392-415 [VERIFIED via Read]
run() {
  const targets = androidDocPaths();
  const suffixes = /(Mobile Enrollment|Platform for Enterprise|Suite|Manage|Configure|KPE|KME|...)/;
  const allowlist = ALLOWLIST.c7_knox_allowlist || [];
  const allowKey = new Set(allowlist.map(e => e.file + ':' + e.line));
  let bare = 0;
  for (const t of targets) {
    const c = readFile(t);
    if (!c) continue;
    const knoxRe = /\bKnox\b/g;
    let m;
    while ((m = knoxRe.exec(c)) !== null) {
      const window = c.slice(m.index, m.index + 50);
      if (!suffixes.test(window)) {
        const lineNum = c.slice(0, m.index).split('\n').length;
        if (!allowKey.has(t + ':' + lineNum)) bare++;
      }
    }
  }
  if (bare === 0) return { pass: true };
  return { pass: false, detail: bare + ' bare "Knox" occurrence(s) without SKU qualifier' };
}
```

**C9 adaptation pattern (D-18 mechanism):**
- Source banned phrases from `ALLOWLIST.cope_banned_phrases` (already wired at current line 424-426 with hardcoded fallback).
- Compile each pattern with `g`-flag (currently `i`-only at line 427 — must change to `gi` for line-iteration).
- Add `const allowlist = ALLOWLIST.c9_exemptions || []; const allowKey = new Set(allowlist.map(e => e.file + ':' + e.line));`.
- Replace `pat.test(c) ? hits++` (line 433 file-level boolean) with `while ((m = pat.exec(c)) !== null) { lineNum = ...; if (!allowKey.has(t + ':' + lineNum)) violations.push({...}); }` (line-locality, mirrors C7 lines 405-410).
- Remove the `informational: true` flag at line 420.
- Replace `return { pass: true, detail: '(informational)' }` at line 435 with the standard `if (violations.length === 0) return { pass: true }; return { pass: false, detail: ... };` two-arm response.

**Promotion flag removal pattern (D-17 + D-06 + D-19 atomic):**

Current C9 line 420, C11 line 480, C13 line 554 all carry `informational: true,`. Remove these three lines as part of the atomic harness commit. C12 already has the flag removed (Plan 58-06 commit `bc9cee6` per check-phase-58.mjs V-58-25 at lines 400-417), so Phase 60 only confirms idempotence on C12. The validator regex pattern for V-60-01..04 should mirror check-phase-58.mjs V-58-25 lines 410-415:

```javascript
// Source: scripts/validation/check-phase-58.mjs:410-415 [VERIFIED via Read]
const c12Idx = c.indexOf("name: 'C12: 4-platform comparison structural validation'");
if (c12Idx < 0) return { pass: false, detail: "C12 entry not found in harness ..." };
const inC12Region = c.slice(c12Idx, c12Idx + 800);
if (/^\s*informational:\s*true,?\s*$/m.test(inC12Region)) {
  return { pass: false, detail: "C12 still has 'informational: true' within first 800 chars after name" };
}
return { pass: true, detail: "C12 promoted to blocking" };
```

V-60-01..04 should use this same `name: '<Cn: ...>'` indexOf + 800-char window + standalone-line `informational: true` regex per check (one assertion per of C9/C11/C12/C13).

**C12 H2-anchor expansion pattern (D-13 + D-16):**

Current C12 at lines 514-549 has platform-column check (lines 522-525) and link-not-copy check (lines 529-547). Append new sub-check after line 548 verifying the 6 named H2 headings. The exact analog already exists at `check-phase-58.mjs:117-126` (V-58-05):

```javascript
// Source: scripts/validation/check-phase-58.mjs:117-126 [VERIFIED via Read]
const h2s = ["## Enrollment", "## Configuration", "## App Deployment", "## Compliance", "## Software Updates", "## Conditional Access"];
const missing = h2s.filter(h =>
  !new RegExp("^" + h.replace(/[/\\^$*+?.()|[\]{}]/g, "\\$&") + "\\s*$", "m").test(c)
);
if (missing.length) return { pass: false, detail: "Missing H2 literals: " + missing.join(", ") };
```

Insertion point in v1.5-milestone-audit.mjs: between the `if (emptyCells.length > 0) return ...` check (line 545-547) and the success return (line 548). The full C12 success message at line 548 should expand to include H2-anchor verification: `'5 platform columns + all data cells link-bearing + 6 named H2 anchors present'`.

**Sidecar loader pattern (lines 71-79) — reused unchanged:**

```javascript
// Source: scripts/validation/v1.5-milestone-audit.mjs:71-79 [VERIFIED via Read]
function parseAllowlist() {
  const raw = readFile('scripts/validation/v1.5-audit-allowlist.json');
  if (!raw) return { safetynet_exemptions: [], supervision_exemptions: [] };
  try {
    return JSON.parse(raw);
  } catch (err) {
    return { _parseError: err.message, safetynet_exemptions: [], supervision_exemptions: [] };
  }
}
```

The 3 new arrays (`c9_exemptions`, `c11_ops_exemptions`, `c13_broken_link_allowlist`) are accessed via the existing `ALLOWLIST` global with the `|| []` defensive default in each check's `run()` body (mirrors `ALLOWLIST.c7_knox_allowlist || []` at line 397). No changes to `parseAllowlist()` itself.

**Error handling pattern:** consistent throughout — `if (violations.length === 0) return { pass: true }; return { pass: false, detail: ... };` two-arm. Mirror exactly. Detail strings show first 3 violations via `.slice(0, 3).map(v => v.file + ':' + v.line).join(', ')`.

---

### `scripts/validation/v1.5-audit-allowlist.json` (config / sidecar JSON — MODIFIED)

**Role:** schema-versioned JSON sidecar; loaded once into `ALLOWLIST` global by harness `parseAllowlist()`; lazy-arrays default to `[]` in harness consumers.

**Analog (intra-file): existing array shapes**

The Phase 60 atomic commit adds 3 new top-level arrays alongside existing `safetynet_exemptions[]`, `supervision_exemptions[]`, `cope_banned_phrases[]`, `c7_knox_allowlist[]`. Phase 60 ALSO updates the `phase` top-level field per "Integration Points" in CONTEXT-RESEARCH.md (`"phase": "60-audit-harness-v1-5-finalization"`) and the `generated` ISO timestamp.

**`{file, line, reason}` contract — mirrors `c7_knox_allowlist[]` (Phase 48 D-05 precedent):**

```json
// Source: scripts/validation/v1.5-audit-allowlist.json:43-53 [VERIFIED via Read]
"c7_knox_allowlist": [
  {"file": "docs/admin-setup-android/07-knox-mobile-enrollment.md", "line": 11, "reason": "v1.5 graduation baseline -- Knox to Intune shorthand (arrow-symbol compound; not a SKU reference)"},
  {"file": "docs/admin-setup-android/07-knox-mobile-enrollment.md", "line": 143, "reason": "v1.5 graduation baseline -- 'Knox silently produces' (Knox as platform subject; unambiguous in KME context)"}
]
```

Apply this exact shape to `c9_exemptions[]` (D-18 pin set from corpus scan) and `c11_ops_exemptions[]` (D-02 reserved-empty array `[]`).

**`{file, line, target, reason, category}` contract for `c13_broken_link_allowlist[]` (D-10 — extends 3-tuple shape with `target` + `category` fields):**

```json
"c13_broken_link_allowlist": [
  {"file": "docs/admin-setup-android/02-zero-touch-portal.md", "line": 160, "target": "https://support.google.com/work/android/topic/9158960", "reason": "PITFALL-14 transient external; Google support URL non-MS domain; REQUIREMENTS Out-of-Scope spirit", "category": "transient_external"},
  {"file": "docs/_templates/admin-template.md", "line": 23, "target": "link", "reason": "intentional template stub by design (placeholder)", "category": "template_placeholder"}
]
```

15 entries seeded at Phase 60 close: 6 `transient_external` + 9 `template_placeholder`. Source the file/line/target tuples from `48-VERIFICATION-broken-links.md` Category B rows tagged `(external URL ...)` or `(template placeholder)`.

**Reason-string discipline (lineage):** existing pin reasons (lines 12-31) demonstrate the project convention — cite the Phase number where the shift originated (`Phase 59 carry-over: line N shifted +M`), the structural justification (`AEAUDIT-04 doctrine HTML comment header`, `iOS Supervision contrasted with bare Supervision`), and any PITFALL reference. Phase 60's `c9_exemptions[]` reason strings should follow this format (cite Phase 53/54/55/56 commit + PITFALL-13).

**No edits to existing array contents** beyond the BASELINE_9 line-coordinate refresh that may shift `_glossary-android.md:16` (D-07 + PITFALL-12 watch). Append-only contract per Phase 42 D-03 + Phase 48 D-23.

---

### `scripts/validation/regenerate-supervision-pins.mjs` (utility — MODIFIED, lines 393-403)

**Role:** seeded-template emitter for `supervision_exemptions[]` sidecar pins; 3-mode contract (`--report` / `--emit-stubs` / `--self-test`); BASELINE_9 hardcoded array used as historical anchor for the `--self-test` self-diff.

**Analog (intra-file): current BASELINE_9 array**

```javascript
// Source: scripts/validation/regenerate-supervision-pins.mjs:386-403 [VERIFIED via Read]
// Pre-expansion 9-pin baseline S1..S9 (hard-coded from commit e5e45db).
// The self-test subtracts this baseline from the current sidecar's supervision_exemptions[]
// to derive the NEW-pin set (Phase 43 hand-authored). Classifier output's Tier-1 set
// must reproduce this NEW-pin set exactly.
// BASELINE_9 refreshed 2026-04-26 (Phase 48 Plan 01): original S1..S9 pre-Phase-43 pin coordinates
// updated to current line positions after Phase 44-46 content additions (Private Space H3 insertion,
// frontmatter freshness adds, COPE see-also blockquote I2). See 48-CONTEXT.md D-14 + 48-RESEARCH.md.
const BASELINE_9 = [
  ['docs/_glossary-android.md', 76],   // ### Supervision heading (was line 65 at v1.4 close)
  ['docs/_glossary-android.md', 78],   // Supervision disambiguation blockquote (was line 67)
  ['docs/_glossary-android.md', 172],  // MHS cross-platform note (was line 134)
  ['docs/_glossary-android.md', 188],  // Version History row (was line 148)
  ['docs/android-lifecycle/00-enrollment-overview.md', 51],
  ['docs/android-lifecycle/00-enrollment-overview.md', 53],
  ['docs/android-lifecycle/00-enrollment-overview.md', 83],
  ['docs/admin-setup-android/03-fully-managed-cobo.md', 36],  // was line 35
  ['docs/l2-runbooks/20-android-app-install-investigation.md', 21]
];
```

**Refresh pattern (D-19 — closes AUDIT-07):**

The `--self-test` currently FAILs because of Phase 59 CLEAN-08 see-also additions that shifted 4 of these 9 coordinates (per RESEARCH BASELINE_9 refresh notes). Compare against current `supervision_exemptions[]` in sidecar (already line-shifted via commit `a01ab1d` per gitlog summary):
- `_glossary-android.md:76` to `:79` (sidecar line 12 shows `"line": 79` after +3 shift)
- `_glossary-android.md:78` to `:81` (+3 shift)
- `_glossary-android.md:172` to `:179` (+7 shift)
- `_glossary-android.md:188` to `:196` (+8 shift)
- The other 5 coordinates are stable.

**Refresh discipline (preserved comment block pattern):** the comment block above the array (lines 386-392) documents WHEN and WHY the refresh happened. Phase 60 must update this block: replace the "BASELINE_9 refreshed 2026-04-26 (Phase 48 Plan 01)" comment with a new line citing Phase 60 D-19 + the precedent commit `a01ab1d` (Phase 59 line-shift refresh, which is the template). Keep the `// was line N at vX close` parenthetical on each shifted entry to preserve traceability.

**No 4th mode added** per RESEARCH "Alternatives Considered" — Phase 43 lineage favors hand-edit over a `--regenerate-baseline` mode addition; the 3-mode contract stays clean.

**Atomicity:** D-19 + D-20 mandate this refresh lands in the SAME atomic harness commit as the v1.5-milestone-audit.mjs C9/C11/C13 promotion changes. Precedent: commit `a01ab1d` ("refresh supervision_exemptions + c7_knox_allowlist + safetynet_exemptions line numbers after Phase 59 line shifts") demonstrates the atomic-refresh pattern.

---

### `scripts/validation/check-phase-60.mjs` (test / validator — CREATED)

**Role:** file-reads-only validator-as-deliverable; 25 V-60-NN assertions (per D-21); runs from repo root via `node scripts/validation/check-phase-60.mjs [--verbose]`; activates lazy-skip slot at `audit-harness-v1.5-integrity.yml:261-275` by file presence (no yml edit per D-24).

**Analog A (closest by intent): `scripts/validation/check-phase-48.mjs`** — also a Phase-validator authored alongside harness/sidecar deliverables; assertions verify file existence + JSON parse + sidecar shape + `--self-test` subprocess exit-0.

**Imports + helpers pattern (lines 14-26):**

```javascript
// Source: scripts/validation/check-phase-48.mjs:14-26 [VERIFIED via Read]
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}
```

Phase 60 validator imports `readdirSync` + `statSync` only if it needs `walkMd()` for V-60-08 (75-row count in 48-VERIFICATION-broken-links.md is single-file, no walker needed). Likely just `readFileSync, existsSync` + `execFileSync` (for V-60-10 `--self-test` invocation).

**File existence / sidecar parse / array shape assertions (lines 28-93 — V-60-01..07 template):**

```javascript
// Source: scripts/validation/check-phase-48.mjs:48-61 [VERIFIED via Read]
{
  id: 3,
  name: 'sidecar supervision_exemptions.length > 0',
  run() {
    const raw = readFile('scripts/validation/v1.5-audit-allowlist.json');
    if (!raw) return { pass: false, detail: 'sidecar missing' };
    try {
      const j = JSON.parse(raw);
      if (!Array.isArray(j.supervision_exemptions) || j.supervision_exemptions.length === 0)
        return { pass: false, detail: 'supervision_exemptions empty (expected 18 inherited pins)' };
      return { pass: true, detail: j.supervision_exemptions.length + ' supervision pins' };
    } catch (err) { return { pass: false, detail: 'JSON parse error: ' + err.message }; }
  }
}
```

Apply this exact pattern for V-60-05 (`c9_exemptions[]` exists, length >= 0), V-60-06 (`c11_ops_exemptions[]` exists, length >= 0 reserved), V-60-07 (`c13_broken_link_allowlist[]` exists, length === 15, with category-count split: 6 `transient_external` + 9 `template_placeholder`).

**Subprocess invocation pattern (lines 62-78 — V-60-10 template):**

```javascript
// Source: scripts/validation/check-phase-48.mjs:62-78 [VERIFIED via Read]
{
  id: 4,
  name: 'regenerate-supervision-pins.mjs --self-test exits 0 (AUDIT-07)',
  run() {
    try {
      execFileSync('node', ['scripts/validation/regenerate-supervision-pins.mjs', '--self-test'],
        { stdio: 'pipe', timeout: 30000, cwd: process.cwd() });
      return { pass: true };
    } catch (err) {
      const stderr = err.stderr ? err.stderr.toString() : '';
      const isMissing = err.code === 'ENOENT' || err.status === 127
        || stderr.includes('not found') || stderr.includes('Could not resolve');
      if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
      return { pass: false, detail: '--self-test FAIL: ' + stderr.slice(0, 200) };
    }
  }
}
```

Use this verbatim for V-60-10. Note the graceful-skip on `ENOENT` (matches Phase 30 lazy-skip pattern, mirrors CI graceful-degradation). The argv array form (no shell interpolation) is the project-standard safe-subprocess invocation.

**Markdown-section presence assertion (lines 79-93 — V-60-08 template):**

```javascript
// Source: scripts/validation/check-phase-48.mjs:79-93 [VERIFIED via Read]
{
  id: 5,
  name: '48-VERIFICATION-broken-links.md exists with Category A/B/C sections',
  run() {
    const relPath = '.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md';
    const content = readFile(relPath);
    if (!content) return { pass: false, detail: relPath + ' does not exist' };
    const hasA = /^## Category A/m.test(content);
    const hasB = /^## Category B/m.test(content);
    const hasC = /^## Category C/m.test(content);
    if (hasA && hasB && hasC) return { pass: true };
    const missing = [!hasA && 'A', !hasB && 'B', !hasC && 'C'].filter(Boolean).join(', ');
    return { pass: false, detail: 'Missing sections: Category ' + missing };
  }
}
```

Adapt for V-60-08 (Triage Decision column populated for all 75 entries). Read the 48-VERIFICATION-broken-links.md file, count `^| docs/.* | \d+ | ` table rows in the Category A and Category B sections, then for each row regex-check that the trailing cell before `|$` is non-empty (i.e., does not match `\| *\|$`). Pass if 75/75 rows have non-empty Triage Decision; fail with `expected 75 populated rows, found N` otherwise.

For V-60-25 (baseline preservation): regex `Total findings:\s*75` against frontmatter (line 7) AND the Summary table row (line 146 currently has `**Total** | **75** | **0** | **75**`).

**Analog B: `scripts/validation/check-phase-58.mjs` V-58-25 — informational-flag-removal regex pattern (lines 400-417)**

This is the EXACT analog for V-60-01..04 (C9/C11/C13/C12 informational flag removed assertions). See "Promotion flag removal pattern" excerpt above. Apply the indexOf + 800-char-region + standalone-line regex pattern per check.

**Analog C: `scripts/validation/check-phase-58.mjs` V-58-05 — H2-literal regex pattern (lines 117-126)**

This is the EXACT analog for V-60-11 (4-platform-comparison.md contains all 6 named H2s). See "C12 H2-anchor expansion pattern" excerpt above. Apply verbatim with the COMPARISON_DOC path constant.

**Analog D: `scripts/validation/check-phase-58.mjs` V-58-12..23 — NEGATIVE regression-guard pattern**

Phase 58 V-58-12..23 inherit prior-phase invariants. V-60-12..23 (12 negative regression-guards per D-21) follow the same lineage chain — assert that Phase 49-59 V-NN-NN structural invariants still PASS by re-reading the artifacts they originally validated and re-running the simplest discriminating regex. Cheaper alternative per the validator-as-deliverable contract: spawn each `check-phase-{49..59}.mjs` via `execFileSync` and assert exit 0 (mirrors V-60-10 subprocess invocation pattern).

**Runner loop (lines 115-140 — verbatim across phase validators):**

```javascript
// Source: scripts/validation/check-phase-48.mjs:115-141 [VERIFIED via Read]
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-48 -- Phase 48 deliverables\n');
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

Use this verbatim for check-phase-60.mjs. Adjust the `console.log('check-phase-60 -- Phase 60 deliverables\n');` header.

**Naming convention:** assertions use `id: 1, name: 'V-60-01: ...'` — the V-NN-NN literal is in the `name` field, not the `id`. Match V-58-NN / V-59-NN convention exactly.

**Header comment block (lines 1-12 — apply verbatim with phase number swapped):**

```javascript
// check-phase-60.mjs -- Phase 60 static validation harness
// Source of truth: .planning/phases/60-audit-harness-v1-5-finalization/60-CONTEXT.md
// File reads only: all content loaded via fs.readFileSync; no shell invocations except
//   V-60-10 (regenerate-supervision-pins.mjs --self-test) and V-60-12..23 (chain validators) via execFileSync.
//
// 25 V-60-NN assertions per CONTEXT D-21 covering harness state + sidecar shape + BASELINE_9 refresh
// + 48-VERIFICATION close-out + 60-CALIBRATION.md artifact + Phase 49-59 V-NN-NN regression chain.
//
// Usage: node scripts/validation/check-phase-60.mjs [--verbose]
// Exit code: 0 if all checks PASS or SKIPPED; 1 if any check FAILs.
```

---

### `.planning/phases/48-.../48-VERIFICATION-broken-links.md` (test / inventory artifact — MODIFIED)

**Role:** Phase 48 baseline inventory; 75 broken-link findings categorized A/B/C; `Triage Decision` column intentionally left blank (per Phase 48 D-11) for Phase 60 to populate.

**Analog (intra-file): existing table structure**

```markdown
| File | Line | Link Target | Pre-existing? | Triage Decision |
|------|------|-------------|---------------|-----------------|
| docs/_glossary-android.md | 16 | `#kme` | A pre-existing v1.0-v1.4.1 | |
```

**Population pattern (D-11):**

51 Category A entries + 5 Category B file-path entries get cell value `FIXED-PHASE-60` (atomic-content-fix).
6 Category B external URL entries + 9 Category B template-placeholder entries get cell value `ALLOWLISTED-c13_broken_link_allowlist` (sidecar-pin).

Note: Phase 48 D-11 mandate is "audit-trail preserved; Phase 48 baseline marker NOT erased" — `Total findings: 75` in frontmatter (line 7) and Summary table (line 146 `| **Total** | **75** | **0** | **75** |`) MUST stay byte-identical. Only the `Triage Decision` column cells get populated. Category A/B/C section structure preserved verbatim. V-60-25 enforces this byte-identity.

---

### `.planning/phases/60-.../60-CALIBRATION.md` (test / read-only analysis artifact — CREATED)

**Role:** pre-promotion corpus scan output; produced BEFORE harness changes (D-28); two sections (a) C9 corpus scan + (b) C11 corpus scan with proximity-window evaluation result; informs `c9_exemptions[]` pin set + C11 keyword list refinement.

**Analog (closest by shape): `48-VERIFICATION-broken-links.md`**

Both artifacts are categorized inventories of harness findings, with disposition column and Summary table.

**Frontmatter pattern:**

```markdown
---
phase: 60-audit-harness-v1-5-finalization
slug: audit-harness-v1-5-finalization
generated: 2026-05-06
calibration_scope: docs/admin-setup-android/**/*.md, docs/operations/**/*.md, docs/android-lifecycle/**/*.md, full docs/**/*.md (C11)
total_c9_hits: <N>
total_c11_hits_in_window: <N>
total_c11_hits_requires_pinning: <N>
---
```

(Mirror 48-VERIFICATION-broken-links.md frontmatter at lines 1-8.)

**Section structure pattern:**

```markdown
# Phase 60: Calibration Corpus Scan -- C9 + C11 Pre-Promotion

## Section A -- C9 cope_banned_phrases corpus scan

| File | Line | Pattern Match | Disposition | Pin reason (if pinning) |
|------|------|---------------|-------------|--------------------------|
| docs/_glossary-android.md | 196 | `\bCOPE\b[^.]*\bsunset\b` | legitimate-disambiguation | Version History entry -- historical changelog |

## Section B -- C11 ops-domain anti-pattern corpus scan with proximity-window evaluation

| File | Line | Pattern Match | Window Keywords Found | Disposition |
|------|------|---------------|------------------------|-------------|
| docs/operations/patch-management/00-overview.md | 77 | `Autopatch rings` | `successor`, `disambiguation` | windowed-exempt |

## Summary

| Section | Hits | Disposition |
|---------|------|-------------|
| A: C9 corpus | N | M legitimate (pin) / K anti-pattern (zero per Phase 53-56 V-NN-NN) |
| B: C11 corpus | N | M windowed-exempt / K requires-pinning / J anti-pattern (zero) |
```

(Mirror 48-VERIFICATION-broken-links.md Category A/B/C sections + Summary table at lines 25-146.)

**Lifecycle note:** D-28 mandates "READ-ONLY analysis commit produced BEFORE harness changes" — the artifact lands in its own commit at the start of D-20 step 1, BEFORE any anchor-fix or harness-change commits.

---

### `.planning/phases/60-.../60-VERIFICATION.md` (test / close-gate document — CREATED)

**Role:** Phase 60 close-state record; goal achievement table; SC achievement narrative; behavioral spot-checks; required artifacts inventory.

**Analog A: `59-VERIFICATION.md`** (most recent close-gate; matches v1.5 lineage exactly)

**Frontmatter pattern (lines 1-13):**

```markdown
---
phase: 60-audit-harness-v1-5-finalization
verified: 2026-05-06T00:00:00Z
status: passed
score: <N>/<M> must-haves verified
overrides_applied: 0
re_verification:
  previous_status: closed
  previous_score: <Phase 60 SCs>
  gaps_closed: []
  gaps_remaining: []
  regressions: []
---
```

**Goal Achievement table pattern (lines 15-41):**

```markdown
## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | <observable truth tied to ROADMAP SC#1 -- C11 promoted blocking + sidecar seeded> | VERIFIED | <line refs + live run output> |
| 2 | <observable truth tied to SC#2 -- C12 expanded to 6 H2 anchors> | VERIFIED | ... |
| 3 | <observable truth tied to SC#3 -- C13 promoted blocking + 75-finding closed> | VERIFIED | ... |
| 4 | <observable truth tied to SC#4 -- v1.5-milestone-audit.mjs exits 0 with all blocking PASS> | VERIFIED | ... |
| 5 | <observable truth tied to SC#5 -- check-phase-60.mjs registered (with SC#5 wording-contradiction surfacing per D-23)> | VERIFIED | ... |
| 6 | <AUDIT-07 closed -- regenerate-supervision-pins.mjs --self-test exits 0> | VERIFIED | ... |
| 7 | <C9 promoted blocking + c9_exemptions[] seeded; Phase 48 D-06 promotion-target honored> | VERIFIED | ... |

**Score: <N>/<N> truths verified**
```

(Mirror 59-VERIFICATION.md lines 15-41.)

**Behavioral Spot-Checks pattern (lines 89-99 of 59-VERIFICATION.md):**

```markdown
| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| check-phase-60.mjs exits 0 with N passing | `node scripts/validation/check-phase-60.mjs --verbose` | N passed, 0 failed, 0 skipped | PASS |
| v1.5-milestone-audit.mjs exits 0 in fully-blocking mode | `node scripts/validation/v1.5-milestone-audit.mjs --verbose` | 12 passed, 0 failed, 0 skipped | PASS |
| regenerate-supervision-pins.mjs --self-test (AUDIT-07 close) | `node scripts/validation/regenerate-supervision-pins.mjs --self-test` | exit 0 -- BASELINE_9 refreshed | PASS |
| Phase 49-59 chain validators still PASS | `for n in 49..59; do node scripts/validation/check-phase-$n.mjs; done` | all exit 0 | PASS |
```

**SC#5 contradiction-surfacing pattern (per D-23):**

Mirror Phase 48 D-09 SC#1 textual contradiction handling. The 60-VERIFICATION.md must include a section flagging `ROADMAP.md:401` references the FROZEN `audit-harness-integrity.yml` instead of the live v1.5 yml; document the resolution (ROADMAP edit landed in atomic harness commit OR separate trailing commit per D-23 plan-author preference).

**Analog B: `58-VERIFICATION.md`** (confirms format consistency across recent phases)

Both 58-VERIFICATION.md and 59-VERIFICATION.md share frontmatter shape, Goal Achievement to Required Artifacts to Key Link Verification to Behavioral Spot-Checks to SC narrative section ordering. Phase 60 follows.

---

### `.planning/ROADMAP.md` (config / project roadmap — MODIFIED)

**Role:** project-level milestone roadmap; SC#5 wording correction at line 401.

**Current state (line 401):**

```markdown
  5. All per-phase `check-phase-NN.mjs` validators (48-60) registered in CI workflow `audit-harness-integrity.yml`
```

**Fix pattern (D-23):**

```markdown
  5. All per-phase `check-phase-NN.mjs` validators (48-60) registered in CI workflow `audit-harness-v1.5-integrity.yml`
```

Single-line wording edit. Phase 48 D-09 SC#1 contradiction-handling precedent applies (textual fix in close commit or separate trailing commit per phase-author preference).

**Lineage check:** ROADMAP.md:146 (Phase 48 SC narrative) already cites `audit-harness-v1.5-integrity.yml` correctly; the inconsistency is isolated to line 401 (Phase 60 SC#5).

---

### docs/ Category A anchor-fix files (utility / markdown content — MODIFIED)

**Cluster pattern: 51 broken anchors across 11 files**

**Cluster shape:** each l1/l2-runbook holds 3-5 broken anchors in a quick-nav TOC block near the top of the file (lines 25-40 typical). Example from 48-VERIFICATION-broken-links.md:

```
| docs/l1-runbooks/02-esp-stuck-or-failed.md | 29 | `#device-phase-steps` | A pre-existing v1.0-v1.4.1 | |
| docs/l1-runbooks/02-esp-stuck-or-failed.md | 30 | `#user-phase-steps` | A pre-existing v1.0-v1.4.1 | |
| docs/l1-runbooks/02-esp-stuck-or-failed.md | 31 | `#error-code-steps` | A pre-existing v1.0-v1.4.1 | |
```

3 broken anchors clustered in lines 29-31 of `02-esp-stuck-or-failed.md` — single-edit-per-file is feasible (D-08 cluster-edit pattern).

**Fix mechanism (D-08, per-finding choice):**
- (a) Rewrite anchor reference to point at an existing H2/H3 slug — preferred for genuine typos / casing mismatches.
- (b) Add explicit `<a id="..."></a>` shim at the section the original anchor intended to address — preferred when the broken anchor encodes meaningful intent that doesn't match any H2/H3 slug.

**Per-file commit pattern (D-25 progressive-landing):** one commit per file (cluster-edit). 9-12 commits total (some files have 3-5 anchors, treat as one commit per file).

**PITFALL-12 watch (D-07):** `docs/_glossary-android.md:16` is the only Category A anchor in pinned territory. Run `regenerate-supervision-pins.mjs --report` BEFORE landing this single anchor-fix commit; if the fix shifts any of the supervision/safetynet/c7_knox pin coordinates (lines 12-31 / 6-9 / 43-53 of sidecar), refresh those pins in the SAME atomic commit per Phase 48 D-14 atomicity-contract. Precedent: commit `a01ab1d` ("refresh supervision_exemptions + c7_knox_allowlist + safetynet_exemptions line numbers after Phase 59 line shifts").

---

### docs/ Category B path-fix files (utility / markdown content — MODIFIED)

**Per-file pattern: 5 broken file paths**

| File | Line | Broken Target | Triage option (D-09 plan-author choice) |
|------|------|---------------|------------------------------------------|
| `docs/admin-setup-android/{09,10,11,12,13}-aosp-*.md` | 9 | `../admin-setup/00-overview.md` | rewrite to `../admin-setup-android/00-overview.md` (the existing intra-tree overview) OR delete dead ref |
| `docs/device-operations/03-re-provisioning.md` | 105 | `../reference/conditional-access-enrollment.md` | rewrite to existing reference OR delete dead ref (deferred-stub-style) |
| `docs/l2-runbooks/03-tpm-attestation.md` | 174 | `02-device-registration.md` | rewrite to existing l2-runbooks/0X file OR delete |
| `docs/l2-runbooks/04-hybrid-join.md` | 161 | `05-policy-conflict.md` | rewrite OR delete |
| `docs/reference/network-infrastructure.md` | 153 | `../l2-runbooks/01-network-connectivity.md` | rewrite to existing l2-runbooks/0X file OR delete |

**Per-file commit pattern (D-25 progressive-landing):** 5 commits, one per file. NO pin-coord overlap (per RESEARCH PITFALL-12 surface watched, line 207); no `regenerate-supervision-pins.mjs --report` gate needed for these 5 commits.

---

## Shared Patterns

### Pattern 1: File-Reads-Only Validator Contract (Phase 42 D-25 / Phase 48 D-25 lineage)

**Source:** `scripts/validation/v1.5-milestone-audit.mjs:43-47` + `check-phase-30.mjs:15-38` + `check-phase-48.mjs:14-26`

**Apply to:** `check-phase-60.mjs` + (do NOT alter) `v1.5-milestone-audit.mjs` + (do NOT alter) `regenerate-supervision-pins.mjs`

```javascript
// CRLF normalization is mandatory per Phase 31 ca40eb9
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}

// walkMd: recursive .md walker -- copy verbatim where needed
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

**Constraints (from Phase 42 D-25 / Phase 48 D-23):**
- All file content via `fs.readFileSync`. No `fs-extra`, no `globby`, no `shelljs`, no `import`s outside `node:*`.
- No shared modules. Each validator is self-contained — copy primitives verbatim.
- `execFileSync` is permitted ONLY for subprocess invocation of other validators (V-60-10, V-60-12..23). Wrap in try/catch with `ENOENT` graceful-skip per check-phase-30.mjs:280-298 + check-phase-48.mjs:62-78 pattern. Use the argv-array form (no shell interpolation).

### Pattern 2: Sidecar `{file, line, reason}` Pin Contract (Phase 42 D-26 / Phase 48 D-05 lineage)

**Source:** `scripts/validation/v1.5-audit-allowlist.json:11-31` (`supervision_exemptions[]`) + `:43-53` (`c7_knox_allowlist[]`)

**Apply to:** new `c9_exemptions[]` (D-18) + `c11_ops_exemptions[]` reserved-empty (D-02). For `c13_broken_link_allowlist[]` (D-10) extend to 5-tuple `{file, line, target, reason, category}` with `category` in `{transient_external, template_placeholder}`.

```json
{"file": "<docs/relative/path.md>", "line": <integer>, "reason": "<Phase NN [carry-over|new line|graduation baseline]: <structural justification with PITFALL-NN cite>>"}
```

**Reason-string discipline:** cite the originating phase + the structural justification + any PITFALL reference. Lines 12-15 of sidecar demonstrate (`Phase 59 carry-over: line 76 shifted +3 (Phase 59 CLEAN-08 added see-also lines to BYOD/UE/ZTE before COBO section, net +3)`).

### Pattern 3: Atomic-Commit Cascade (Phase 43 D-07 / Phase 48 D-14 lineage)

**Source:** Phase 59 commit `a01ab1d` ("refresh supervision_exemptions + c7_knox_allowlist + safetynet_exemptions line numbers after Phase 59 line shifts") — the canonical atomic-cascade example for sidecar pin-coord refreshes synchronized with content shifts.

**Apply to:** D-20 step 4 atomic harness commit. ONE commit must bundle:
1. v1.5-milestone-audit.mjs C9 + C11 + C13 promotions (3 `informational: true,` line removals + C9 exemption-mechanism rewrite + C11 proximity-window rewrite + C13 allowlist-apply rewrite)
2. v1.5-milestone-audit.mjs C12 6-H2 anchor sub-checks (insertion at line 548)
3. v1.5-audit-allowlist.json: 3 new arrays appended (`c9_exemptions[]`, `c11_ops_exemptions[]`, `c13_broken_link_allowlist[]`) + `phase` field updated to `"60-audit-harness-v1-5-finalization"` + `generated` timestamp updated
4. regenerate-supervision-pins.mjs BASELINE_9 refresh (lines 393-403 + comment block at lines 386-392)
5. 48-VERIFICATION-broken-links.md Triage Decision column populated for all 75 entries

**No partial-state shipping** — if any of (1-5) is missing, `node scripts/validation/v1.5-milestone-audit.mjs --verbose` will exit 1 in fully-blocking mode (e.g., promote C13 without `c13_broken_link_allowlist[]` populated to FAIL on transient-external URLs).

### Pattern 4: Validator-as-Deliverable + CI Lazy-Skip (Phase 42 D-31 / Phase 48 D-18 + D-25 lineage)

**Source:** `.github/workflows/audit-harness-v1.5-integrity.yml:261-275` (Phase 60 slot already exists per D-24) + `check-phase-48.mjs:62-78` (graceful-skip pattern)

**Apply to:** check-phase-60.mjs ships per D-21; CI activates by file presence. NO yml edit required.

```yaml
# audit-harness-v1.5-integrity.yml lazy-skip slot pattern (already present at lines 261-275)
- name: Check Phase 60 deliverables
  if: ${{ hashFiles('scripts/validation/check-phase-60.mjs') != '' }}
  run: node scripts/validation/check-phase-60.mjs --verbose
  continue-on-error: false
```

(Slot existence verified per Phase 48 D-18 + D-24; not required to modify.)

### Pattern 5: PITFALL-12 Pin-Coord Watch (Phase 48 D-14 / Phase 59 commit `a01ab1d` precedent)

**Source:** Phase 59 commit `a01ab1d` operational pattern (line shifts to atomic refresh in same commit)

**Apply to:** Anchor-fix commit for `_glossary-android.md:16` (the single PITFALL-12-vulnerable Category A entry per D-07).

**Procedure:**
1. Run `node scripts/validation/regenerate-supervision-pins.mjs --report` to inventory current pin coordinates.
2. Apply the `_glossary-android.md:16` `#kme`/`#kpe` anchor-fix.
3. Re-run `--report`; diff against step 1 output.
4. If any of `safetynet_exemptions[]` / `supervision_exemptions[]` / `c7_knox_allowlist[]` line coordinates shifted, update the JSON sidecar in the SAME commit with the anchor-fix (atomic — do NOT split into two commits).
5. Verify `node scripts/validation/v1.5-milestone-audit.mjs` exits 0 post-commit.

### Pattern 6: Append-Only Contract on Shared Sidecar/yml (Phase 42 D-03 / Phase 48 D-23 lineage)

**Source:** Phase 48 D-23 sidecar shape contract — only NEW arrays added; existing array contents only modified for pin-coord refreshes (no semantic change).

**Apply to:** v1.5-audit-allowlist.json (3 new arrays appended; existing arrays untouched except potential `_glossary-android.md:16` line-coord refresh per Pattern 5). `audit-harness-v1.5-integrity.yml` byte-identical (per D-24 — no yml edit). `audit-harness-integrity.yml` byte-identical (frozen v1.4 + v1.4.1 yml per Phase 48 D-16).

### Pattern 7: Cluster-Edit per File (Phase 58 progressive-landing precedent)

**Source:** Phase 58 16 progressive-landing commits + Phase 59 multi-commit close (`adca9d8` + `59f595b` + `f440d24` + `ff42fd6` per 59-VERIFICATION.md line 37).

**Apply to:** D-25 anchor-fix commits (9-12 per-file commits) and path-fix commits (5 per-file commits). Each commit is small surface (1 file, 3-5 anchor refs OR 1 path ref). NO atomicity-contract for these — they're single-content-edits with no cross-file invariants.

**Constraint:** anchor-fix commits MUST land BEFORE the atomic harness commit (D-20 plan order steps 2-3 before step 4). Reason: harness step 4 promotes C13 to blocking, which would FAIL on un-fixed broken anchors. Order matters.

---

## No Analog Found

No files in Phase 60 scope lack analogs. Every deliverable maps to either an in-place intra-file pattern, a sibling validator pattern, or a precedent commit. RESEARCH.md confirms HIGH-confidence alignment for all patterns.

| File | Reason | Resolution |
|------|--------|------------|
| *(none)* | All 11 deliverable types have at least role-match analogs in repo | N/A |

---

## Metadata

**Analog search scope:**
- `scripts/validation/v1.5-milestone-audit.mjs` (current harness; 606 lines)
- `scripts/validation/v1.5-audit-allowlist.json` (current sidecar; 55 lines)
- `scripts/validation/regenerate-supervision-pins.mjs` (BASELINE_9 helper; 496 lines)
- `scripts/validation/check-phase-30.mjs` (file-reads-only validator pattern; 337 lines)
- `scripts/validation/check-phase-31.mjs` (validator pattern; 100+ lines)
- `scripts/validation/check-phase-48.mjs` (closest validator-alongside-harness analog; 142 lines)
- `scripts/validation/check-phase-58.mjs` (V-58-25 informational-flag-removal regex + V-58-05 H2-literal regex; 461 lines)
- `scripts/validation/check-phase-59.mjs` (lineage continuation; 460+ lines)
- `.planning/phases/48-.../48-VERIFICATION-broken-links.md` (categorized inventory analog for 60-CALIBRATION.md)
- `.planning/phases/48-.../48-VERIFICATION.md` (close-gate analog)
- `.planning/phases/58-.../58-VERIFICATION.md` (close-gate analog)
- `.planning/phases/59-.../59-VERIFICATION.md` (most recent close-gate analog)
- `.planning/ROADMAP.md` (SC#5 wording-fix target; lines 392-402)

**Files scanned:** 13 (all read; no re-reads)

**Pattern extraction date:** 2026-05-06
