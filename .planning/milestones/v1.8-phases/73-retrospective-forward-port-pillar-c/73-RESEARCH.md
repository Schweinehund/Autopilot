# Phase 73: Retrospective Forward-Port (Pillar C) - Research

**Researched:** 2026-06-08
**Domain:** Chain-validator frozen-aware pattern forward-port; `scripts/validation/check-phase-{48..66}.mjs` HEAD-coupled assertion class-wide scan + conversion
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01 LOCKED Option C refined:** 8 CHAIN+AUDIT wrapper folds into Plan 73-01 RETRO-01 atomic SHA; 3 helper-spawn sites at `check-phase-{48, 60, 61}.mjs` route to v1.9+ as HELPER-SPAWN-STDERR-01 stub. Fold boundary per file:

| File | Line | Wrapper class | Disposition |
|------|------|---------------|-------------|
| check-phase-60.mjs | 230 | CHAIN | FIXED in Plan 73-01 |
| check-phase-61.mjs | 368 | CHAIN | FIXED in Plan 73-01 |
| check-phase-62.mjs | 316 | CHAIN | FIXED in Plan 73-01 |
| check-phase-63.mjs | 321 | CHAIN | FIXED in Plan 73-01 |
| check-phase-64.mjs | 306 | CHAIN | FIXED in Plan 73-01 |
| check-phase-65.mjs | 294 | CHAIN | FIXED in Plan 73-01 |
| check-phase-60.mjs | 248 | AUDIT | FIXED in Plan 73-01 |
| check-phase-61.mjs | 386 | AUDIT | FIXED in Plan 73-01 |
| check-phase-48.mjs | 72 | Helper-spawn | DEFERRED to v1.9+ (HELPER-SPAWN-STDERR-01) |
| check-phase-60.mjs | 188 | Helper-spawn | DEFERRED to v1.9+ |
| check-phase-61.mjs | 403 | Helper-spawn | DEFERRED to v1.9+ |

**D-02 LOCKED Option C:** Centralize ONLY new helpers in `scripts/validation/_lib/frozen-at-close.mjs`. Existing inline helpers in `check-phase-{61, 67, 68, 70}.mjs` LEFT BYTE-UNCHANGED (refactor deferred to v1.9+ as FROZEN-AWARE-ADOPTION-SWEEP-01).

**D-03 LOCKED A-md + B-3:** Inventory artifact is committed markdown at `73-RETRO-INVENTORY.md`. 3-plan split (Plan 73-01 inventory atomic; Plan 73-02 conversion atomic; Plan 73-03 close-gate).

**D-04 LOCKED Option B (MERGED with D-02 module):** `MILESTONE_CLOSE_SHAS` constants live IN `_lib/frozen-at-close.mjs`. Empirical SHAs (all verified resolvable):
- V141 = `5c976ec` (Phase 47 close 2026-04-25)
- V15 = `ba2cbc0` (Phase 61 close — matches existing inline helper)
- V16 = `9d8877c` (Phase 66 close 2026-05-25; v1.6 has NO git tag)
- V17 = `aa6de68` (Phase 70 Plan 70-02 Atom 1 — matches existing inline helpers)
- V14 = OMIT unless RETRO-01 surfaces a v1.4-close-state assertion (candidates `b5cf529`/`671f72a`; v1.4 close was Phase 42, predating chain validators at Phase 48 — expect zero)

### Claude's Discretion

- RETRO-01 inventory column headers + row schema (recommended schema documented in domain section)
- Whether V-73-CONVERT-NN grows incrementally during Plan 73-02 or monolithically in Plan 73-01 Wave 4 (recommend: Plan 73-01 ships stub-array placeholder; Plan 73-02 grows array incrementally)
- Whether to include V14 in `MILESTONE_CLOSE_SHAS` (conditional on RETRO-01 scan)
- `SCOPE-GAP-RETRO-02-OVERFLOW-01` STUB authoring trigger (recommend: >12 conversion candidates trips the guardrail)
- Whether `_lib/frozen-at-close.mjs` hosts a `readSidecarAtClose()` convenience wrapper (decide in Plan 73-02 based on actual RETRO-02 needs)

### Deferred Ideas (OUT OF SCOPE)

- 3 helper-spawn stderr-only sites (check-phase-{48, 60, 61}.mjs) → HELPER-SPAWN-STDERR-01 v1.9+ stub
- Existing inline helper refactor to `_lib` consumption → FROZEN-AWARE-ADOPTION-SWEEP-01 v1.9+ stub
- `_lib/exec-fail-detail.mjs` extraction → EXEC-FAIL-DETAIL-EXTRACTION-01 v1.9+ stub
- SCOPE-GAP-class discoveries beyond 7-12 conversion candidates → SCOPE-GAP-RETRO-02-OVERFLOW-01 v1.9+ stub (conditional)
- v1.8 audit harness lineage bump (HARNESS-07..12 + VPP-01) → Phase 74
- v1.6 git-tag creation → out of scope
- HARNESS-FORWARD-01 retrospective scope expansion beyond inventory → REQUIREMENTS.md:67 anti-ballooning
- Worktree-based execution → `use_worktrees: false` durable per config.json:7
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| RETRO-01 | Class-wide scan of `scripts/validation/check-phase-{48..66}.mjs` (19 validators) for HEAD-coupled assertions whose validator name or docstring cites a milestone-close state. Produce per-validator class-signature inventory + assessment of conversion scope. | Empirical scan methodology, grep patterns, docstring-citation fingerprints, and conversion-scope estimate (7-12 validators) documented in Standard Stack + Architecture Patterns sections |
| RETRO-02 | Per-validator conversion of identified HEAD-coupled assertions to v1.5/v1.6/v1.7-frozen-aware via SHA-pinned helpers. Mechanism: `execFileSync('git', ['show', '<frozen-SHA>:<path>'])`. Scope-discipline guardrail: SCOPE-GAP-class discoveries route to v1.9+. | Conversion recipe, helper module design, per-assertion import/use pattern, and anti-regression invariants documented throughout |
</phase_requirements>

---

## Summary

Phase 73 (Pillar C — Retrospective Forward-Port) closes `HARNESS-FORWARD-01` + `SCOPE-GAP-61` retrospective debt by scanning all 19 `check-phase-{48..66}.mjs` validators for HEAD-coupled assertions whose docstrings or names cite milestone-close state, then converting identified assertions to the frozen-aware pattern via SHA-pinned helpers introduced in `scripts/validation/_lib/frozen-at-close.mjs`. The empirical entry-state is fully grounded: Phase 72 Plan 72-01 (`d374095`) fixed 6 CHAIN wrappers in `check-phase-{66..71}.mjs` and surfaced the previously-masked stdout diagnostic for V-61-17 + V-67-05/06, leaving 8 V-72-CHAIN-{61..67, 70} FAILs as the concrete inventory baseline for Phase 73 RETRO-01. The `.claude/tmp/72-chain-post.txt` witness file is the empirical signature data source.

The key structural insight is that the 8 FAILs trace to exactly two root-cause assertions: V-61-17 (MILESTONES.md top-H2 HEAD-coupled in check-phase-61.mjs) and V-67-05/06 (OP-10 callouts + Version History rows HEAD-coupled in check-phase-67.mjs at a wrong frozen-SHA). Closing V-61-17 collapses the cascade through check-phase-{62..66}.mjs (those files FAIL only because they spawn check-phase-61.mjs as a subprocess in their CHAIN-regression-guard wrapper). The 4-5 candidate band in check-phase-{53, 54, 56, 60}.mjs adds additional RETRO-01 inventory coverage beyond the cascade floor.

The 3-plan layout (inventory atomic / conversion atomic / close-gate) mirrors Phase 71's proven D-04 LOCKED 3-plan precedent and satisfies REQUIREMENTS.md:25-27 RETRO-01/RETRO-02 structural separation. All four milestone-close SHAs (V141=`5c976ec`, V15=`ba2cbc0`, V16=`9d8877c`, V17=`aa6de68`) have been empirically verified as resolvable in the local repo.

**Primary recommendation:** Implement in strict wave order — (1) RETRO-01 inventory scan of all 19 validators + 8 wrapper fold-ins + `_lib/frozen-at-close.mjs` module + `check-phase-73.mjs` stub in ONE atomic SHA (Plan 73-01); (2) per-validator HEAD-coupled assertion conversion to frozen-aware + V-73-CONVERT-NN grow in ONE atomic SHA (Plan 73-02); (3) chain delta-diff witness + VERIFICATION.md + traceability + deferred-cleanup transitions (Plan 73-03).

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| RETRO-01 class-wide scan | Chain validator tooling | Planning artifacts (REQUIREMENTS, ROADMAP) | Scan reads source files; outputs markdown inventory artifact |
| RETRO-02 frozen-aware conversion | Chain validator tooling | `_lib/frozen-at-close.mjs` centralized readers | Converts `readFile(HEAD)` calls to `git show <SHA>:path` readers |
| Wrapper fold-in (8 sites) | Chain validator tooling | — | Mechanical `err.stdout + err.stderr` pattern propagation |
| SHA-pin registry | `_lib/frozen-at-close.mjs` | Chain validators (consumers) | Named constants module; consumers import convenience wrappers |
| Inventory artifact | `.planning/phases/73-.../73-RETRO-INVENTORY.md` | check-phase-73.mjs (asserts heading presence) | Committed markdown; Plan 73-02 uses as source-of-truth |
| Regression-witness | `.claude/tmp/73-chain-pre.txt` / `73-chain-post.txt` | 73-VERIFICATION.md (delta-diff table) | Pre/post chain output capturing 8 FAIL → PASS transition |
| Deferred-cleanup transitions | `v1.8-DEFERRED-CLEANUP.md` | REQUIREMENTS, STATE, ROADMAP traceability | 3 NEW stubs + 1 CLOSED entry authored at Plan 73-03 |

---

## Standard Stack

### Core
| Library / Tool | Version | Purpose | Why Standard |
|---------------|---------|---------|--------------|
| `node:child_process` `execFileSync` | Node.js built-in | `git show <SHA>:<path>` subprocess for frozen reads | Already-established pattern in check-phase-{61,67,68,70}.mjs; no new dependency [VERIFIED: existing codebase usage] |
| `node:fs` `readFileSync` / `existsSync` | Node.js built-in | File reads + existence checks | Established per every check-phase-NN.mjs file [VERIFIED: existing codebase usage] |
| `node:path` `join` | Node.js built-in | Cross-platform path resolution | Established per every check-phase-NN.mjs file [VERIFIED: existing codebase usage] |
| Git (CLI) | Any version with `git show` | Reads file content at historical SHA | Proven cross-OS (Windows local + Ubuntu GHA) via FETCH-DEPTH-01 fix [VERIFIED: existing codebase usage] |

### Supporting
| Library / Tool | Version | Purpose | When to Use |
|---------------|---------|---------|-------------|
| `scripts/validation/_lib/archive-path.mjs` | Phase 68 artifact | `_lib/` architectural precedent | Read before authoring `_lib/frozen-at-close.mjs` — confirms 30-LOC module pattern + ESM export shape [VERIFIED: file exists at HEAD] |
| `scripts/validation/check-phase-72.mjs` | Plan 72-01 `d374095` | Path-A template for `check-phase-73.mjs` | Read before authoring check-phase-73.mjs — provides CHAIN_PHASES, CHAIN_SKIP, V-72-WRAPPER-NEG pattern, CHAIN_WRAPPER_ANCHOR regex with empirically-correct 400-char gap [VERIFIED: file exists at HEAD] |

### No External Package Dependencies

Phase 73 introduces zero npm packages. All tools are Node.js built-ins + git CLI. No `npm install` step needed.

**Package Legitimacy Audit:** N/A — no external packages introduced.

---

## Architecture Patterns

### System Architecture Diagram

```
Entry: node check-phase-73.mjs
         |
         v
  [V-73-INVENTORY]
  73-RETRO-INVENTORY.md exists?
  Contains 19+ per-validator rows?
         |
         v
  [V-73-LIB-EXISTS]
  _lib/frozen-at-close.mjs exists?
  Exports MILESTONE_CLOSE_SHAS + readAtV{141,15,16,17}Close?
         |
         v
  [V-73-WRAPPER-NEG]                    [V-73-AUDIT-WRAPPER-NEG]
  check-phase-{60..65}.mjs:            check-phase-{60,61}.mjs:
  0 stderr-only CHAIN wrappers?        0 stderr-only AUDIT wrappers?
         |                                       |
         +-------------------+-------------------+
                             |
                             v
              [V-73-CONVERT-NN] (one per RETRO-02 conversion)
              check-phase-{61,67,...}.mjs contains
              readAtV{15,16,17}Close import?
              No bare readFile(MILESTONES/REQUIREMENTS/ROADMAP)?
                             |
                             v
              [V-73-AUDIT]  (SKIP-PASS until Plan 73-03)
              73-VERIFICATION.md exists?
                             |
                             v
              [V-73-CHAIN-{48..72}] (chain regression-guards)
              Each check-phase-NN.mjs exits 0
                             |
                             v
              [V-73-AUDIT-HARNESS]
              v1.7-milestone-audit.mjs exits 0
              (predecessor-byte-unchanged)
                             |
                             v
              [V-73-SELF]
              CHAIN_PHASES excludes 73
              CHAIN_SKIP = empty Set
```

**Data flow for frozen-aware conversion (RETRO-02):**

```
readAtV15Close('.planning/MILESTONES.md')
  -> _lib/frozen-at-close.mjs readAtClose('V15', path)
       -> MILESTONE_CLOSE_SHAS.V15 = 'ba2cbc0'
       -> execFileSync('git', ['show', 'ba2cbc0:.planning/MILESTONES.md'], {...})
       -> returns MILESTONES.md content at v1.5-close state
            -> assertion against frozen-state content (not HEAD)
```

### Recommended Project Structure

```
scripts/validation/
├── _lib/
│   ├── archive-path.mjs          # Phase 68 precedent (EXISTING — read-only)
│   └── frozen-at-close.mjs       # NEW (Plan 73-01) — MILESTONE_CLOSE_SHAS + readAtClose
├── check-phase-{48..59}.mjs      # RETRO-01 scan only; RETRO-02 may convert subset
├── check-phase-60.mjs            # Plan 73-01: 2 wrapper fixes (CHAIN + AUDIT); Plan 73-02: RETRO-02 if V-60-NN HEAD-coupled
├── check-phase-61.mjs            # Plan 73-01: 2 wrapper fixes; Plan 73-02: V-61-17..20 conversion
├── check-phase-{62..65}.mjs      # Plan 73-01: 1 CHAIN wrapper fix each; Plan 73-02: cascade may not need assertion edits
├── check-phase-66.mjs            # Plan 73-02: possible RETRO-02 target (has frozen pattern but V-66-NN may be HEAD-coupled)
└── check-phase-73.mjs            # NEW (Plan 73-01) — Phase 73 chain-apex validator

.planning/phases/73-retrospective-forward-port-pillar-c/
├── 73-CONTEXT.md                 # EXISTING
├── 73-DISCUSSION-LOG.md          # EXISTING
├── 73-RETRO-INVENTORY.md         # NEW (Plan 73-01) — 19-row per-validator class-signature table
└── 73-VERIFICATION.md            # NEW (Plan 73-03) — close-gate evidence + Section E conversion table

.planning/milestones/
└── v1.8-DEFERRED-CLEANUP.md      # Plan 73-03: CHAIN-DEGRADED-AT-HEAD-01 STUB→CLOSED + 3 NEW stubs

.claude/tmp/
├── 73-chain-pre.txt              # Plan 73-01 Wave 6 — pre-RETRO-02 chain witness
└── 73-chain-post.txt             # Plan 73-02 Wave 3 — post-RETRO-02 chain witness
```

### Pattern 1: Frozen-Aware Reader (v1.7-family hardened signature)

The `_lib/frozen-at-close.mjs` module adopts the v1.7-family hardened signature (with `stdio: ['ignore', 'pipe', 'pipe']`). This differs from the v1.5-family inline helpers in check-phase-61.mjs which lack `stdio` hardening — that signature drift is preserved per D-02 carve-out.

```javascript
// Source: scripts/validation/_lib/frozen-at-close.mjs (NEW Plan 73-01)
// Lineage: mirrors check-phase-67.mjs:35-55 + check-phase-68.mjs:35-50 + check-phase-70.mjs:40-80
import { execFileSync } from 'node:child_process';

export const MILESTONE_CLOSE_SHAS = {
  V141: '5c976ec',  // Phase 47 close 2026-04-25
  V15:  'ba2cbc0',  // Phase 61 close — canonical (matches inline helper in check-phase-61.mjs:40)
  V16:  '9d8877c',  // Phase 66 close 2026-05-25 (v1.6 has NO git tag)
  V17:  'aa6de68',  // Phase 70 Plan 70-02 Atom 1 — canonical (matches inline helpers in check-phase-67/68/70.mjs)
  // V14 omitted — RETRO-01 must surface a v1.4-close-state assertion to justify adding
};

export function readAtClose(milestoneTag, relPath) {
  const sha = MILESTONE_CLOSE_SHAS[milestoneTag];
  if (!sha) throw new Error(`No frozen SHA for milestone ${milestoneTag}`);
  return execFileSync('git', ['show', sha + ':' + relPath], {
    encoding: 'utf8',
    timeout: 10000,
    stdio: ['ignore', 'pipe', 'pipe'],
  }).replace(/\r\n/g, '\n');
}

// Convenience exports for readability at call-sites
export const readAtV141Close = (p) => readAtClose('V141', p);
export const readAtV15Close  = (p) => readAtClose('V15',  p);
export const readAtV16Close  = (p) => readAtClose('V16',  p);
export const readAtV17Close  = (p) => readAtClose('V17',  p);
```

**Error semantics:**
- If `milestoneTag` not in `MILESTONE_CLOSE_SHAS` → throws `Error('No frozen SHA for milestone ...')` — useful diagnostic
- If `git show` fails (SHA not resolvable, path not in tree at that SHA) → `execFileSync` throws with `err.stderr` carrying the git error message — callers should let it propagate (validator will FAIL with meaningful detail from the subprocess error)
- `fetch-depth: 0` on `linux-chain-ubuntu-latest` GHA job (FETCH-DEPTH-01 fix `85521bb`) ensures all SHAs are resolvable in CI — this invariant MUST be preserved in Phase 74 HARNESS-10

### Pattern 2: RETRO-02 Conversion Recipe (per-assertion)

For each identified HEAD-coupled assertion in `check-phase-NN.mjs`:

**Before (HEAD-coupled):**
```javascript
// check-phase-61.mjs line 289 — V-61-17 (HEAD-coupled)
const c = readFile(MILESTONES_DOC);
if (c === null) return { pass: false, detail: 'MILESTONES.md missing' };
const h2s = c.match(/^## .+$/gm);
if (!h2s[0].includes('v1.5')) return { pass: false, detail: 'top H2 is not v1.5: ' + h2s[0] };
return { pass: true, detail: 'top H2: ' + h2s[0] };
```

**After (frozen-aware, V15 target):**
```javascript
// check-phase-61.mjs V-61-17 converted (Plan 73-02)
// Import at top of file: import { readAtV15Close } from './_lib/frozen-at-close.mjs';
const c = readAtV15Close('.planning/MILESTONES.md');
const h2s = c.match(/^## .+$/gm);
if (!h2s || h2s.length === 0) return { pass: false, detail: 'no ## H2 entries [v1.5-frozen @ ba2cbc0]' };
if (!h2s[0].includes('v1.5')) return { pass: false, detail: 'top H2 is not v1.5: ' + h2s[0] + ' [v1.5-frozen @ ba2cbc0]' };
return { pass: true, detail: 'top H2: ' + h2s[0] + ' [v1.5-frozen @ ba2cbc0]' };
```

**Check-name suffix convention** (mandatory per D-03 B-3 + 73-CONTEXT.md):
- Append `[v1.X-frozen @ <SHA>]` to check name string
- Mirror: `check-phase-61.mjs:78` `[v1.5-frozen @ ba2cbc0]` + `check-phase-67.mjs:73` `[v1.7-frozen @ aa6de68]`
- Example: `'V-61-17: MILESTONES.md has ## v1.5 Linux Platform H2 as top entry [v1.5-frozen @ ba2cbc0]'`

### Pattern 3: check-phase-73.mjs (Path-A from check-phase-72.mjs)

Key structural elements for check-phase-73.mjs:

```javascript
// Source: Path-A from scripts/validation/check-phase-72.mjs (Plan 72-01 d374095)
// CHAIN_PHASES extends check-phase-72.mjs by adding phase 72
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72];
const CHAIN_SKIP = new Set([]); // Phase 68 7b635ca invariant — MUST remain empty

const FIXED_FILES_RETRO_02 = [60, 61, 62, 63, 64, 65]; // D-01 LOCKED: 6 CHAIN wrapper fold-in sites
const AUDIT_FIXED_FILES = [60, 61];                     // D-01 LOCKED: 2 AUDIT wrapper fold-in sites

// CHAIN_WRAPPER_ANCHOR: empirically-correct 400-char gap (check-phase-71 has 258-char gap per
// Phase 72 VERIFICATION.md Section F — use {0,400} not {0,200})
const CHAIN_WRAPPER_ANCHOR = /execFileSync\('node',[\s\S]{0,400}?catch\s*\(\s*err\s*\)\s*\{([\s\S]{0,600}?)\n\s*\}/g;

// AUDIT_WRAPPER_ANCHOR: anchored to v1.5-milestone-audit subprocess invocation
// (AUDIT wrappers use a different topology marker than CHAIN wrappers)
const AUDIT_WRAPPER_ANCHOR = /execFileSync\('node',\s*\[auditPath\][\s\S]{0,400}?catch\s*\(\s*err\s*\)\s*\{([\s\S]{0,600}?)\n\s*\}/g;
```

**V-73-INVENTORY assertion:**
```javascript
{
  id: 'INVENTORY',
  name: 'V-73-INVENTORY: 73-RETRO-INVENTORY.md exists and contains per-validator class-signature table',
  run() {
    const c = readFile('.planning/phases/73-retrospective-forward-port-pillar-c/73-RETRO-INVENTORY.md');
    if (c === null) return { pass: false, detail: '73-RETRO-INVENTORY.md missing' };
    // Heading-presence check: per-validator table heading + minimum 19 rows
    if (!c.includes('check-phase-')) return { pass: false, detail: 'no per-validator table rows found' };
    const rowCount = (c.match(/\| check-phase-/g) || []).length;
    if (rowCount < 19) return { pass: false, detail: `only ${rowCount}/19 validator rows found` };
    return { pass: true, detail: `${rowCount} validator rows present in 73-RETRO-INVENTORY.md` };
  }
}
```

**V-73-LIB-EXISTS assertion:**
```javascript
{
  id: 'LIB-EXISTS',
  name: 'V-73-LIB-EXISTS: _lib/frozen-at-close.mjs exists and exports MILESTONE_CLOSE_SHAS + readAtV{141,15,16,17}Close',
  run() {
    const c = readFile('scripts/validation/_lib/frozen-at-close.mjs');
    if (c === null) return { pass: false, detail: '_lib/frozen-at-close.mjs missing' };
    const issues = [];
    if (!c.includes('MILESTONE_CLOSE_SHAS')) issues.push('MILESTONE_CLOSE_SHAS not found');
    if (!c.includes("V141:")) issues.push("V141 key missing");
    if (!c.includes("V15:"))  issues.push("V15 key missing");
    if (!c.includes("V16:"))  issues.push("V16 key missing");
    if (!c.includes("V17:"))  issues.push("V17 key missing");
    if (!c.includes('readAtV141Close')) issues.push('readAtV141Close not exported');
    if (!c.includes('readAtV15Close'))  issues.push('readAtV15Close not exported');
    if (!c.includes('readAtV16Close'))  issues.push('readAtV16Close not exported');
    if (!c.includes('readAtV17Close'))  issues.push('readAtV17Close not exported');
    if (issues.length > 0) return { pass: false, detail: issues.join('; ') };
    return { pass: true, detail: 'MILESTONE_CLOSE_SHAS + 4 convenience exports present' };
  }
}
```

**V-73-WRAPPER-NEG assertion:**
```javascript
{
  id: 'WRAPPER-NEG',
  name: 'V-73-WRAPPER-NEG: zero stderr-only CHAIN wrappers remain across FIXED_FILES_RETRO_02',
  run() {
    const stderrOnly = [];
    FIXED_FILES_RETRO_02.forEach((phaseNum) => {
      const content = readFile(`scripts/validation/check-phase-${phaseNum}.mjs`);
      if (!content) return;
      const matches = [...content.matchAll(CHAIN_WRAPPER_ANCHOR)];
      matches.forEach((m, idx) => {
        const hasStderr = /err\.stderr/.test(m[1]);
        const hasStdout = /err\.stdout/.test(m[1]);
        if (hasStderr && !hasStdout) {
          stderrOnly.push({ file: `check-phase-${phaseNum}.mjs`, occurrence: idx + 1 });
        }
      });
    });
    if (stderrOnly.length > 0) {
      return { pass: false, detail: `${stderrOnly.length} stderr-only CHAIN wrapper(s): ` + stderrOnly.map(s => `${s.file}[${s.occurrence}]`).join(', ') };
    }
    return { pass: true, detail: `0 stderr-only CHAIN wrappers across ${FIXED_FILES_RETRO_02.length} FIXED_FILES_RETRO_02` };
  }
}
```

**V-73-AUDIT-WRAPPER-NEG assertion:**
```javascript
{
  id: 'AUDIT-WRAPPER-NEG',
  name: 'V-73-AUDIT-WRAPPER-NEG: zero stderr-only AUDIT wrappers remain across AUDIT_FIXED_FILES',
  run() {
    const stderrOnly = [];
    AUDIT_FIXED_FILES.forEach((phaseNum) => {
      const content = readFile(`scripts/validation/check-phase-${phaseNum}.mjs`);
      if (!content) return;
      // AUDIT wrapper anchor: anchored to v1.5-milestone-audit subprocess invocation
      // Check for catch blocks with err.stderr but no err.stdout
      const auditMatches = [...content.matchAll(AUDIT_WRAPPER_ANCHOR)];
      auditMatches.forEach((m, idx) => {
        const hasStderr = /err\.stderr/.test(m[1]);
        const hasStdout = /err\.stdout/.test(m[1]);
        if (hasStderr && !hasStdout) {
          stderrOnly.push({ file: `check-phase-${phaseNum}.mjs`, occurrence: idx + 1 });
        }
      });
    });
    if (stderrOnly.length > 0) {
      return { pass: false, detail: `${stderrOnly.length} stderr-only AUDIT wrapper(s): ` + stderrOnly.map(s => `${s.file}[${s.occurrence}]`).join(', ') };
    }
    return { pass: true, detail: `0 stderr-only AUDIT wrappers across ${AUDIT_FIXED_FILES.length} AUDIT_FIXED_FILES` };
  }
}
```

**V-73-CONVERT-NN signature** (grows in Plan 73-02, seeded as empty array stub in Plan 73-01):
```javascript
// Plan 73-01 ships this as a stub comment + empty array placeholder:
// V-73-CONVERT-* assertions grow in Plan 73-02 as each HEAD-coupled assertion is converted.
// Each entry asserts: (1) the file imports readAtV{15,16,17}Close from _lib/frozen-at-close.mjs,
//                    (2) the validator name contains the [v1.X-frozen @ <SHA>] suffix.

// Example entry (Plan 73-02 adds one per converted assertion):
{
  id: 'CONVERT-61-17',
  name: 'V-73-CONVERT-61-17: check-phase-61.mjs V-61-17 imports readAtV15Close and has v1.5-frozen suffix',
  run() {
    const content = readFile('scripts/validation/check-phase-61.mjs');
    if (!content) return { pass: false, detail: 'check-phase-61.mjs not found' };
    if (!content.includes('readAtV15Close') && !content.includes('frozen-at-close')) {
      return { pass: false, detail: 'V-61-17 conversion: readAtV15Close import not found' };
    }
    if (!content.includes('[v1.5-frozen @ ba2cbc0]') || !content.match(/V-61-17.*v1\.5-frozen/)) {
      return { pass: false, detail: 'V-61-17: [v1.5-frozen @ ba2cbc0] suffix missing from check name' };
    }
    return { pass: true, detail: 'V-61-17 frozen-aware conversion confirmed (readAtV15Close + suffix)' };
  }
}
```

### Pattern 4: CHAIN+AUDIT Wrapper Fix (Plan 73-01 Wave 2)

The uniform wrapper fix for the 8 DEFERRED_PHASE_73_RETRO02 sites. The CHAIN wrapper fix below is identical to the Phase 72 Plan 72-01 pattern (`d374095`), except the slice budget may be bumped from 300 to 500 characters (matching Phase 72's empirical correction in 72-VERIFICATION.md Section B):

```javascript
// BEFORE (CHAIN regression-guard catch — stderr-only, slice 200):
} catch (err) {
  const stderr = err.stderr ? err.stderr.toString() : '';
  const isMissing = err.code === 'ENOENT' || err.status === 127
    || stderr.includes('not found') || stderr.includes('Could not resolve');
  if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
  return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + stderr.slice(0, 200) };
}

// AFTER (Plan 73-01 fold-in, uniform stdout+stderr):
} catch (err) {
  const stderr = err.stderr ? err.stderr.toString() : '';
  const stdout = err.stdout ? err.stdout.toString() : '';
  const isMissing = err.code === 'ENOENT' || err.status === 127
    || stderr.includes('not found') || stderr.includes('Could not resolve');
  if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
  return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + (stdout + stderr).slice(0, 500).trim() };
}
```

AUDIT wrapper fix for check-phase-{60, 61}.mjs lines 248/386:
```javascript
// AFTER (AUDIT wrapper — same stdout+stderr pattern, different detail prefix):
} catch (err) {
  const stderr = err.stderr ? err.stderr.toString() : '';
  const stdout = err.stdout ? err.stdout.toString() : '';
  const isMissing = err.code === 'ENOENT' || ...;
  if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
  return { pass: false, detail: 'harness FAIL: ' + (stdout + stderr).slice(0, 500).trim() };
}
```

**Note on AUDIT wrapper anchor for V-73-AUDIT-WRAPPER-NEG:** The AUDIT wrapper in check-phase-{60, 61}.mjs is anchored to `execFileSync('node', [auditPath], ...)` (spawning `v1.5-milestone-audit.mjs`), NOT `execFileSync('node', [path], ...)` (spawning sibling check-phase-NN.mjs). The `AUDIT_WRAPPER_ANCHOR` regex must use the correct topology marker to distinguish AUDIT from CHAIN wrappers. Empirical verification: check-phase-60.mjs has stderr-only lines at L188 (helper-spawn, DEFERRED), L230 (CHAIN), L248 (AUDIT); check-phase-61.mjs at L368 (CHAIN), L386 (AUDIT), L403 (helper-spawn, DEFERRED).

### Pattern 5: Pre/Post-RETRO-02 Chain Delta-Diff Witness

```bash
# Plan 73-01 Wave 6 — capture pre-RETRO-02 baseline (at Plan 73-01 atomic commit SHA)
node scripts/validation/check-phase-73.mjs > .claude/tmp/73-chain-pre.txt 2>&1
# Expect: V-73-INVENTORY PASS, V-73-LIB-EXISTS PASS, V-73-WRAPPER-NEG PASS,
#         V-73-AUDIT-WRAPPER-NEG PASS; V-72-CHAIN-{61..67,70} still FAIL (documented residual)

# Plan 73-02 Wave 3 — capture post-RETRO-02 result
node scripts/validation/check-phase-73.mjs > .claude/tmp/73-chain-post.txt 2>&1
# Expect: all V-72-CHAIN-{61..67,70} FAILs FLIPPED → PASS;
#         V-73-CONVERT-NN all PASS; chain-apex 0 FAIL / 0 SKIPPED
```

Delta-diff table format for 73-VERIFICATION.md Section B:
| Metric | Pre-RETRO-02 (73-chain-pre.txt) | Post-RETRO-02 (73-chain-post.txt) |
|--------|---------------------------------|-----------------------------------|
| FAIL count | 8 (V-72-CHAIN-{61..67,70}) | 0 |
| V-72-CHAIN-61 detail | `check-phase-61 FAIL: ... V-61-17 ...` | PASS |
| V-72-CHAIN-67 detail | `check-phase-67 FAIL: ... V-67-05/06 ...` | PASS |

### Anti-Patterns to Avoid

- **Collapsing RETRO-01 inventory into RETRO-02 conversion SHA:** Violates SC#1 "inventory is a committed artifact" — inventory must precede conversion so the markdown is the source-of-truth for Plan 73-02 scope, not derivative documentation of it. [ASSUMED based on D-03 B-3 explicit ruling]
- **Routing all 11 wrapper sites to v1.9+:** Overrides Phase 72's explicit "RETRO-02 fold-in" disposition matrix (72-VERIFICATION.md Section E); creates unnecessary DEFERRED-CLEANUP stub for 8 sites that cost near-zero when the files are already being opened for RETRO-01 inventory reading.
- **Using git tag SHAs for frozen reads:** v1.6 has NO git tag; v1.5 tag SHA `53cf475` ≠ helper-authoring SHA `ba2cbc0`; v1.7 tag SHA `45d4afe` ≠ helper-authoring SHA `aa6de68`. Using tag SHAs would FAIL existing assertions (D-04 Option C empirically rejected).
- **Adding `stdio: ['ignore', 'pipe', 'pipe']` to existing v1.5-family inline helpers in check-phase-61.mjs:** These are byte-unchanged per D-02 carve-out. The NEW `_lib/frozen-at-close.mjs` uses the hardened v1.7-family signature; existing helpers preserve their original signatures.
- **Letting V-73-CONVERT-NN assertions grow WITHOUT also growing CHAIN_PHASES:** CHAIN_PHASES for check-phase-73.mjs stays fixed at `{48..72}` throughout Phase 73. V-73-CONVERT-NN is a separate assertion class that grows in Plan 73-02.
- **Wide-open slice budget on helper-spawn wrappers (the 3 DEFERRED sites):** Helper-spawn sites `--self-test` failure modes are deterministic and tightly bounded; they do NOT need 500-char budget. This is WHY they are class-type carve-out to v1.9+ — different design criteria apply.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| SHA-pinned historical file read | Custom file-cache + git log traversal | `execFileSync('git', ['show', sha + ':' + path], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })` | Already proven in check-phase-{61,67,68,70}.mjs; cross-OS with `fetch-depth: 0`; standard git plumbing |
| Frozen-SHA naming registry | Per-file inline SHA literals (12 already, growing to 20-30+) | `MILESTONE_CLOSE_SHAS` named constants in `_lib/frozen-at-close.mjs` | D-04 advisor: one-place-to-edit invariant + empirical SHA disclosure document |
| Re-runnable scan tool for RETRO-01 | `inventory-head-coupled-assertions.mjs --report` | Manual grep + manual markdown table | D-03 A-mjs scored 14 (worst-A option): tool-build overhead for a one-shot retrospective; SC#4 anti-ballooning; Phase 72 Section E markdown precedent is sufficient |
| Negative invariant with equality-check | `grep -c "err.stderr"` exit-code script | Source-text regex assertion in check-phase-73.mjs V-73-WRAPPER-NEG | Already-proven pattern (V-72-WRAPPER-NEG); declarative + self-documenting + bisect-clean per-file |
| Custom CRLF normalization per helper | Per-assertion `split('\r\n').join('\n')` | `.replace(/\r\n/g, '\n')` in `readAtClose()` centralized | Single normalization point; consistent with `readFile()` idiom established at check-phase-48.mjs:25 |

**Key insight:** The frozen-aware pattern is fully solved infrastructure (12 existing `git show` invocations across 4 files). Phase 73's job is *propagation of an established pattern*, not design of a new one.

---

## Empirical RETRO-01 Inventory Scan Methodology

### Step 1: What to grep for (docstring-citation fingerprints)

**High-confidence HEAD-coupled signals (scan these first):**
- `readFile(MILESTONES_DOC)` — MILESTONES.md is the primary drift surface (V-61-17..20 confirmed HEAD-coupled at check-phase-61.mjs:289-349)
- `readFile(REQUIREMENTS_DOC)` combined with assertion text citing "post-Plan-NN-NN" / "AUDIT-08 flip" / "active-section" without `readRequirementsAtV15Close` / `readAtV15Close`
- `readFile(ROADMAP_DOC)` combined with assertion text citing "§Progress" / "In Progress rows" / "Complete" rows without `readRoadmapAtV15Close` / `readAtV15Close`
- Validator `name:` strings containing: `"v1.5 close"` / `"v1.6 close"` / `"Plan 6N-NN"` / `"stale rows reconciled"` / `"Methodology highlights"` / `"4 deferred items LIN-DEFER"` / `"post-Plan-08"` / `"AUDIT-08"` / `"12/12 PASS post-Plan-08"`

**Medium-confidence signals (inspect manually):**
- Files referencing REQUIREMENTS.md / ROADMAP.md / MILESTONES.md / PROJECT.md / STATE.md via `readFile()` at all (check-phase-{53, 54, 56, 60} per empirical grep — confirmed by automated scan below)
- Assertion text citing a specific plan number (e.g., `"Plan 58-06 idempotence"`) where the assertion makes a content-shape claim rather than just a file-existence claim

**Empirical grep results (verified at HEAD 2026-06-08):**

| File | Frozen-aware? | readFile(planning doc)? | Milestone-keyword hits | Verdict |
|------|---------------|------------------------|------------------------|---------|
| check-phase-48.mjs | NO | NO | 0 | Scan only — likely NO HEAD-coupling in assertion docstrings |
| check-phase-49..52.mjs | NO | NO | 0 each | Scan only — no milestone-doc references |
| check-phase-53.mjs | NO | YES (REQUIREMENTS, ROADMAP) | Low | Inspect V-53-NN names manually |
| check-phase-54.mjs | NO | YES (REQUIREMENTS, ROADMAP) | Medium | Inspect V-54-NN names manually |
| check-phase-55.mjs | NO | NO | 0 | Scan only — no milestone-doc references |
| check-phase-56.mjs | NO | YES (REQUIREMENTS, ROADMAP) | Medium (v1.2 SSoT refs) | Inspect — v1.2 SSoT refs are file-existence guards, probably frozen-safe |
| check-phase-57..59.mjs | NO | NO | 0 each | Scan only |
| check-phase-58.mjs | NO | YES (v1.5-milestone-audit.mjs) | 10 | V-58-25 cites `Plan 58-06 C12 promotion` — but asserts code state, not milestone-doc state; likely NOT HEAD-coupled to milestone docs |
| check-phase-60.mjs | NO | YES (v1.5-milestone-audit.mjs) | 7 | V-60-23 cites `v1.5-milestone-audit.mjs exits 0 post-Plan-08` — invokes harness subprocess, NOT readFile(planning doc); likely NOT HEAD-coupled to planning docs |
| check-phase-61.mjs | YES (V-61-01..08) | YES (MILESTONES.md via readFile) | Many | **V-61-17..20 CONFIRMED HEAD-COUPLED** — readFile(MILESTONES_DOC) without frozen guard |
| check-phase-{62..65}.mjs | YES (inherited from check-phase-61 cascade) | YES (planning docs) | Medium | CASCADE ONLY — fail because they spawn check-phase-61 via CHAIN wrapper; their own assertions may NOT be HEAD-coupled independently |
| check-phase-66.mjs | YES | YES (planning docs) | Medium | Has frozen pattern; inspect V-66-NN names for HEAD-coupling |

**Critical empirical finding:** check-phase-60.mjs's readFile calls are ALL against `HARNESS` (v1.5-milestone-audit.mjs), `SIDECAR` (v1.5-audit-allowlist.json), `PIN_HELPER` (regenerate-supervision-pins.mjs), and archived phase-plan docs — NOT against top-level planning docs (MILESTONES, REQUIREMENTS, ROADMAP, STATE). V-60-03/V-60-23 cite plan names in their check strings but assert code-state, not milestone-doc content. check-phase-60.mjs is LIKELY `NO_HEAD_COUPLING` for RETRO-02 purposes (wrapper fix only).

### Step 2: Disposition classification

| Disposition | Meaning | RETRO-02 action |
|-------------|---------|-----------------|
| `CONVERT_PLAN_73_02` | Has HEAD-coupled assertion whose name/docstring cites milestone-close state | Convert to frozen-aware via `readAtV{15,16,17}Close` |
| `ALREADY_FROZEN_AWARE` | Already uses `readRequirementsAtV15Close` / `readRoadmapAtV15Close` / `readCorpusFileAtV17Close` etc. | BYTE-UNCHANGED |
| `NO_HEAD_COUPLING` | Has readFile calls but no milestone-close-state semantic coupling | No action |
| `SCOPE_GAP_DEFERRED_V19` | Has HEAD-coupling but out-of-scope (>12 candidates trips anti-ballooning) | Document in stub |

### Step 3: Expected conversion scope (empirical estimate)

Must-touch floor (7 validators — cascade + root causes):
- **check-phase-61.mjs**: V-61-17..20 (MILESTONES.md top-H2 + v1.5-entry content assertions — CONFIRMED HEAD-coupled)
- **check-phase-62..65.mjs**: CASCADE ONLY — if V-61-17 closes, cascade collapses; these files likely need wrapper fix only, NOT assertion conversion
- **check-phase-66.mjs**: Inspect V-66-NN; may have HEAD-coupled assertions beyond what Phase 72 surfaced
- **check-phase-67.mjs**: V-67-05/06 (SWEEP-02 OP-10 callouts + Version History rows — CONFIRMED HEAD-coupled to wrong frozen-SHA `aa6de68` for content the validator expects)

Candidate band (4-5 validators beyond cascade):
- check-phase-53.mjs, check-phase-54.mjs, check-phase-56.mjs, check-phase-58.mjs, check-phase-60.mjs
- Per D-03 advisor empirical scan: `readFile(REQUIREMENTS/ROADMAP/MILESTONES/PROJECT/STATE)` returns 4 files: check-phase-{53, 54, 56, 60}
- These must be inspected during Plan 73-01 RETRO-01 wave; likely 2-4 will have HEAD-coupled assertions needing conversion

**Total RETRO-02 estimate: 7-12 validators** (7 must-touch floor + up to 5 new discoveries). Anti-ballooning tripline = 12 candidates.

---

## V-67-05/06 Root Cause and Conversion Target

V-67-05/06 are CONFIRMED HEAD-coupled via wrong frozen-SHA, not via `readFile(HEAD)`. The root cause per `v1.8-DEFERRED-CLEANUP.md:77` + `72-VERIFICATION.md Section G`:

- check-phase-67.mjs uses `readCorpusFileAtV17Close(path)` which internally calls `git show aa6de68:<path>`
- SHA `aa6de68` = Plan 70-02 Atom 1 (the helper-authoring SHA, per Plan 70-05 substitution convention)
- BUT the corpus content that V-67-05/06 assert (OP-10 callouts in renamed files + Version History rows) was authored at Plan 70-05 Commit B SHA `4df3a16` — AFTER `aa6de68`
- Content at SHA `aa6de68` does NOT contain the OP-10 callouts or Version History rows V-67-05/06 assert
- Therefore `readCorpusFileAtV17Close` returns a file version that pre-dates the SWEEP-02 content

**Conversion recipe for V-67-05/06:**
The issue is NOT that they use readFile(HEAD) — they already use frozen-aware helpers. The issue is they're frozen to the WRONG SHA. However, the assertion semantics are checking for content that should exist at v1.7-close state in the corpus docs.

Options for Phase 73 RETRO-02:
1. Check whether a later frozen SHA in `MILESTONE_CLOSE_SHAS` (e.g., V17 = `aa6de68` adjusted, or a new close-SHA) resolves the content discrepancy
2. If the OP-10 callouts genuinely exist at v1.7-frozen state, the SHA may need to be the true v1.7 close-gate `4df3a16` rather than the helper-authoring SHA `aa6de68` — BUT this would require a different entry in `MILESTONE_CLOSE_SHAS` (e.g., `V17_CLOSEGATE`) and would potentially affect other assertions in check-phase-67.mjs that correctly use `aa6de68`
3. Alternatively, if the SWEEP-02 content was added at Plan 70-05 Commit B, V-67-05/06 may need to be converted to `readFile(HEAD)` with a NOTE that these assertions verify current-state, not frozen-state (if the doc content should exist at ALL milestones going forward)

**This is a Claude's Discretion area for the plan-phase author** — the exact conversion target for V-67-05/06 requires reading the actual corpus file content at both `aa6de68` and `4df3a16` to determine which SHA resolves the assertion correctly. The RETRO-01 inventory should flag this as a COMPLEX_CONVERSION subclass.

---

## Common Pitfalls

### Pitfall 1: CHAIN_WRAPPER_ANCHOR gap undersized for check-phase-{60..65}.mjs
**What goes wrong:** V-73-WRAPPER-NEG fails to find the CHAIN wrapper catch block if the regex gap `{0,400}` is too small for the execFileSync call in those files.
**Why it happens:** Phase 72 VERIFICATION.md Section F documented that check-phase-71.mjs has a 258-char gap (larger than the initial 200-char estimate) due to the `env: { ...process.env, CHECK_PHASE_NESTED: '1' }` extra options line. check-phase-{60..65}.mjs may have similar or different gap sizes.
**How to avoid:** Use `{0,400}` gap in CHAIN_WRAPPER_ANCHOR regex (empirically-corrected baseline from Phase 72 RESEARCH.md Section 3). Verify with a local test run before committing Plan 73-01.
**Warning signs:** `no CHAIN wrapper catch block found in check-phase-NN.mjs` in V-73-WRAPPER-NEG detail.

### Pitfall 2: AUDIT wrapper anchor matches CHAIN wrapper (aliasing)
**What goes wrong:** AUDIT_WRAPPER_ANCHOR regex matches the CHAIN wrapper instead of the AUDIT wrapper, producing false negatives on V-73-AUDIT-WRAPPER-NEG.
**Why it happens:** Both CHAIN and AUDIT wrappers use `execFileSync('node', ...)` as topology marker; they differ only in the argument shape (`[path]` for CHAIN vs `[auditPath]` for AUDIT).
**How to avoid:** Phase 72 V-72-WRAPPER-NEG Pitfall 4 (72-CONTEXT.md D-04 documentation) established that the negative invariant must avoid the aliasing wedge. For V-73-AUDIT-WRAPPER-NEG, anchor to the `[auditPath]` variable name or the `v1.5-milestone-audit` string in the AUDIT wrapper context.
**Warning signs:** V-73-AUDIT-WRAPPER-NEG PASS even when audit wrappers still have stderr-only; verify by running standalone on check-phase-60.mjs.

### Pitfall 3: RETRO-02 converts V-61-17..20 but forgets V-61-09..12 (PROJECT.md HEAD-coupling)
**What goes wrong:** V-61-09..16 read PROJECT.md and AUDIT DOC via `readFile()`. If their assertion semantics cite v1.5-close state, they are also HEAD-coupled — but they are different conversion targets.
**Why it happens:** RETRO-01 inventory scan may focus on the known-FAILing V-61-17 and miss V-61-09..12/16 which may be reading HEAD PROJECT.md for content that should be frozen-at-v1.5-close.
**How to avoid:** Read check-phase-61.mjs V-61-09..16 implementation carefully during RETRO-01. V-61-09..12 assert `## Validated` section and `## Closed Deferred Items` subsections — these are living documents that GROW after v1.5 close, so reading at HEAD is correct behavior (they assert v1.5 artifacts WERE added, which is a cumulative assertion). Classify these as `NO_HEAD_COUPLING` with rationale.
**Warning signs:** Unexpected FAIL in V-61-09..12 post-conversion if conversion inadvertently changes their read paths.

### Pitfall 4: slice budget mismatch between wrapper-fix and V-73-WRAPPER-NEG window
**What goes wrong:** V-73-WRAPPER-NEG uses a 600-char window `([\s\S]{0,600}?)` in the catch block assertion, but the actual catch blocks in check-phase-{60..65}.mjs may be larger or smaller.
**Why it happens:** check-phase-{60..65}.mjs catch blocks have empirically-confirmed contents (verified at L316-320 for check-phase-62, etc.) that fit comfortably within 600 chars. But if any file has a comment block or additional logic in its catch, the window may miss the return statement.
**How to avoid:** The `600` char window is `{0,600}` — it captures UP TO 600 chars of the catch block, which includes the multi-line match. Empirically verified catch blocks are ~5 lines = ~200-250 chars. No adjustment needed.

### Pitfall 5: predecessor-byte-unchanged check misses `v1.8-DEFERRED-CLEANUP.md`
**What goes wrong:** `git diff Phase-72-close-SHA HEAD -- <predecessor surfaces>` check passes, but v1.8-DEFERRED-CLEANUP.md has been modified by Plan 73-01/73-02 edits that shouldn't be there.
**Why it happens:** v1.8-DEFERRED-CLEANUP.md is NOT in the predecessor-byte-unchanged invariant surfaces (that invariant covers v1.4/v1.4.1/v1.5/v1.6/v1.7 frozen surfaces only per REQUIREMENTS.md:69). v1.8-DEFERRED-CLEANUP.md is a living document that Phase 73 Plan 73-03 WILL modify.
**How to avoid:** Do NOT modify v1.8-DEFERRED-CLEANUP.md in Plans 73-01 or 73-02. Only Plan 73-03 Wave 4 makes the CHAIN-DEGRADED-AT-HEAD-01 status transition + 3 NEW stubs. This preserves bisect semantics: Plan 73-01 + 73-02 atomics are code-only; Plan 73-03 is docs + traceability.

### Pitfall 6: V-67-05/06 conversion requires standalone check-phase-67.mjs inspection
**What goes wrong:** Plan 73-02 tries to convert V-67-05/06 without first understanding whether the content discrepancy is a wrong-SHA issue or a genuine content-not-in-any-frozen-snapshot issue.
**Why it happens:** The diagnostic is at byte offset ~750-900 of check-phase-67.mjs's full output (per 72-VERIFICATION.md Section G). The chain-apex 500-char window only shows V-67-01..04 PASSing; V-67-05/06 FAIL is just beyond the window.
**How to avoid:** During Plan 73-02 Wave 1, run `node scripts/validation/check-phase-67.mjs` standalone FIRST to see the full diagnostic. Then compare `git show aa6de68:docs/...` with `git show 4df3a16:docs/...` to confirm which SHA has the content V-67-05/06 expects. Document the SHA decision in RETRO-INVENTORY.md before making the conversion.

---

## HELPER-SPAWN-STDERR-01 Stub Template (Plan 73-03 close-gate)

This stub is authored in `v1.8-DEFERRED-CLEANUP.md` at Plan 73-03 Wave 4. Structure mirrors CHAIN-DEGRADED-AT-HEAD-01 sections at lines 56-101 of the existing file:

```markdown
## HELPER-SPAWN-STDERR-01: Helper-spawn stderr-only wrapper surface (3 sites, DEFERRED to v1.9+)

**Scope:** 3 stderr-only wrapper sites in `scripts/validation/check-phase-{48, 60, 61}.mjs`
that catch `regenerate-supervision-pins.mjs --self-test` subprocess failures with
`stderr.slice(0, 200)` only — parallel to CHAIN-WRAPPER-01 + CHAIN-DEGRADED-AT-HEAD-01
defect class but distinct in spawn target + failure-mode profile + slice-budget calibration.

**Source-of-truth:**
- Phase 72 `72-VERIFICATION.md` Section E — 3 DEFERRED_DOCUMENTED rows
- Phase 73 D-01 advisor dossier `.claude/tmp/phase73-D01-advisor.md` — class-type carve-out rationale

**Per-site root cause:**

| Validator | Line | Spawn target | Assertion class |
|-----------|------|--------------|-----------------|
| check-phase-48.mjs | 72 | `regenerate-supervision-pins.mjs --self-test` (AUDIT-07) | v1.4.1-era |
| check-phase-60.mjs | 188 | `regenerate-supervision-pins.mjs --self-test` (V-60-10) | v1.5-era |
| check-phase-61.mjs | 403 | `regenerate-supervision-pins.mjs --self-test` (V-61-34) | v1.5-era |

**Why deferred to v1.9+ (not Phase 73 RETRO-02):**
1. Different class signature from CHAIN-regression-guard catch blocks:
   `--self-test` invocations are deterministic; failure modes tightly bounded; slice budget may
   differ from the 500-char CHAIN+AUDIT pattern (may need only 100-200 chars)
2. `REQUIREMENTS.md:67` anti-ballooning guardrail: Phase 73 contract is RETRO-01 + RETRO-02
   (HEAD-coupled assertion conversion); helper-spawn class is differently-shaped from CHAIN/AUDIT
3. Phase 73 D-01 LOCKED Option C explicitly defers helper-spawn class to v1.9+

**Resolution mechanism (v1.9+):** Design-pass to determine appropriate fix shape — may be uniform
Phase 72 pattern OR a tighter helper-specific shape. Then 3-site mechanical edit + chain regression sweep.

**Trigger-to-sweep:** v1.9+ chain-validator cleanup phase OR opportunistic during a future routine
touch of `regenerate-supervision-pins.mjs` invocations.

**Estimated effort (v1.9+):** 30min design-pass + 30min 3-site mechanical edit + chain sweep = 1.5h.

**Status:** STUB drafted at Phase 73 Plan 73-03 close-gate. v1.9+ pickup deferred.
In-repo helper-spawn invocations continue to work correctly (`--self-test` is highly-deterministic;
latent masking surface is low-risk with no current production impact).
```

---

## Atomic-Commit Composition

### Plan 73-01 atomic SHA (~11-12 files)

Files in ONE atomic commit (scales Phase 72 Plan 72-01 7-file precedent):

| File | Status | Purpose |
|------|--------|---------|
| `scripts/validation/check-phase-60.mjs` | MODIFIED | CHAIN wrapper (L230) + AUDIT wrapper (L248) fix |
| `scripts/validation/check-phase-61.mjs` | MODIFIED | CHAIN wrapper (L368) + AUDIT wrapper (L386) fix |
| `scripts/validation/check-phase-62.mjs` | MODIFIED | CHAIN wrapper (L316) fix |
| `scripts/validation/check-phase-63.mjs` | MODIFIED | CHAIN wrapper (L321) fix |
| `scripts/validation/check-phase-64.mjs` | MODIFIED | CHAIN wrapper (L306) fix |
| `scripts/validation/check-phase-65.mjs` | MODIFIED | CHAIN wrapper (L294) fix |
| `scripts/validation/_lib/frozen-at-close.mjs` | NEW | MILESTONE_CLOSE_SHAS + readAtClose + convenience exports |
| `scripts/validation/check-phase-73.mjs` | NEW | Phase 73 chain-apex validator (V-73-INVENTORY + V-73-LIB-EXISTS + V-73-WRAPPER-NEG + V-73-AUDIT-WRAPPER-NEG + V-73-AUDIT + V-73-CHAIN + V-73-AUDIT-HARNESS + V-73-SELF) |
| `.planning/phases/73-.../73-RETRO-INVENTORY.md` | NEW | 19-row per-validator class-signature table |

**Total: 9 required files** (6 modified + 3 new). Within bisect-clean atomic range (Phase 72 set 7 as precedent; Phase 73 scales to 9 cleanly).

Commit message: `feat(73-01): RETRO-01 inventory + 8 wrapper folds + _lib/frozen-at-close + check-phase-73 stub (atomic SC#1 + SC#4)`

**Chicken-and-egg transient at Plan 73-01 SHA:** V-72-CHAIN-{61..67, 70} remain FAIL (8 documented-residual). V-73-CONVERT-* are SKIP or not-yet-present. V-73-AUDIT is SKIP-PASS (73-VERIFICATION.md not yet authored). This is the 6th entry in the accepted-residual lineage: Plan 68-05 → 69-02 → 70-05 Commit B → 71-01 Rule 4 → 72-01 → **73-01**.

### Plan 73-02 atomic SHA (~8-13 files)

Files in ONE atomic commit:

| File | Status | Content |
|------|--------|---------|
| `check-phase-61.mjs` | MODIFIED | V-61-17..20 frozen-aware conversion (import + readAtV15Close + suffix) |
| `check-phase-67.mjs` | MODIFIED | V-67-05/06 frozen-aware conversion (inspect + determine correct SHA) |
| `check-phase-{53,54,56,?}.mjs` | MODIFIED (if HEAD-coupled found) | Per-assertion conversions from RETRO-01 inventory |
| `scripts/validation/check-phase-73.mjs` | MODIFIED | V-73-CONVERT-NN array grows (one assertion per converted site) |

Commit message: `fix(73-02): RETRO-02 per-validator HEAD-coupled assertion conversion to frozen-aware (atomic SC#4)`

### Plan 73-03 close-gate SHA (~5-7 files)

| File | Status | Content |
|------|--------|---------|
| `.planning/phases/73-.../73-VERIFICATION.md` | NEW | Sections A-H including pre/post chain delta-diff witness |
| `.planning/milestones/v1.8-DEFERRED-CLEANUP.md` | MODIFIED | CHAIN-DEGRADED-AT-HEAD-01 STUB→CLOSED + 3 NEW stubs |
| `.planning/REQUIREMENTS.md` | MODIFIED | RETRO-01 + RETRO-02 Pending→Complete |
| `.planning/STATE.md` | MODIFIED | Frontmatter + performance metrics + pending todos |
| `.planning/ROADMAP.md` | MODIFIED | Phase 73 row Complete + Phase 74 entry-state note |

Commit message: `docs(73-03): Phase 73 close-gate — 73-VERIFICATION.md + traceability flips + v1.8-DEFERRED-CLEANUP transitions`

---

## Project Constraints (from CLAUDE.md)

The project's CLAUDE.md describes a Windows Autopilot Troubleshooter & Improvement Suite (PowerShell / Python FastAPI / TypeScript React). Phase 73 operates entirely within the tooling layer (`scripts/validation/`) of what is in practice a macOS Provisioning Documentation Suite validation chain — the CLAUDE.md architecture description is for the outer project context, not the v1.8 chain-validator work. The following CLAUDE.md directives apply:

- **Never commit `.env` file or credentials** — Not applicable to Phase 73 (no credentials involved)
- **All remediation actions require explicit user confirmation** — Not applicable (no remediation)
- **Audit log all administrative actions** — Honored via atomic-commit + VERIFICATION.md close-gate
- **PowerShell syntax for Windows** — Phase 73 uses Node.js MJS + git CLI; PowerShell syntax not required for the chain-validator tooling

No CLAUDE.md directives conflict with Phase 73's implementation approach.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | All check-phase-NN.mjs execution | Confirmed (used throughout project) | Any v18+ | — |
| Git CLI (`git show`) | `_lib/frozen-at-close.mjs` readAtClose | Confirmed (existing frozen-aware helpers proven working) | Any | — |
| All 4 milestone-close SHAs | `_lib/frozen-at-close.mjs` | VERIFIED resolvable (`git cat-file -e` returned OK for all 4) | — | — |
| `scripts/validation/_lib/archive-path.mjs` | Read-before-authoring reference | VERIFIED exists | Phase 68 artifact | — |
| `scripts/validation/check-phase-72.mjs` | Path-A source for check-phase-73.mjs | VERIFIED exists (Plan 72-01 `d374095`) | — | — |
| `.claude/tmp/72-chain-post.txt` | RETRO-01 empirical baseline | VERIFIED exists (Phase 72 close-gate witness) | — | — |

**fetch-depth: 0 on linux-chain-ubuntu-latest (GHA):** Inherited from Phase 69 Plan 69-02 Fix-1 commit `85521bb`. MUST be preserved in Phase 74 HARNESS-10 workflow. Phase 73 does NOT modify any workflow YAML (predecessor-byte-unchanged invariant).

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `readFile(HEAD)` for all validator assertions | `readAtV15Close()` / `readAtV17Close()` for milestone-close-state assertions | Phase 68 Plan 68-03 `d7d7d5f` (V-61-01..04) → Phase 69 Plan 69-02 `2d61981` (V-61-05..08) → Phase 70 Plan 70-01/03 (V-67..70) | Prevents assertion breakage when planning-doc state evolves post-milestone-close |
| Per-file inline SHA literals | `MILESTONE_CLOSE_SHAS` named-constants in `_lib/frozen-at-close.mjs` | Phase 73 Plan 73-01 (NEW) | Single source of truth; canonical empirical SHA disclosure |
| Scattered inline frozen-aware helpers | Centralized NEW helpers in `_lib`; existing inline helpers preserved | Phase 73 Plan 73-01 D-02 (hybrid) | DRY on new helpers; backward-compat for existing |
| stderr-only CHAIN wrapper catch blocks (slice 200) | stdout+stderr composite capture (slice 300-500) | Phase 72 Plan 72-01 `d374095` (check-phase-{66..72}.mjs) → Phase 73 Plan 73-01 (check-phase-{60..65}.mjs) | Full diagnostic visibility for chain-apex FAILs |

**Deprecated / outdated patterns:**
- `err.stderr.slice(0, 200)` in CHAIN wrapper catch: OBSOLETE — bumped to `(stdout + stderr).slice(0, 500).trim()` post-Phase-72/73 fold-in
- `stdio: ['pipe']` without explicit `['ignore', 'pipe', 'pipe']` for frozen reads: v1.5-family legacy (check-phase-61.mjs inline helpers) — preserved per D-02 carve-out but not used for new helpers
- `CHAIN_SKIP` non-empty Set: Phase 68 `7b635ca` permanently cleared it — CHAIN_SKIP must remain `new Set([])` in all validators including check-phase-73.mjs

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | check-phase-{62..65}.mjs FAILs are cascade-only (no independent HEAD-coupled assertions) | Empirical RETRO-01 scan, Architecture Patterns | If they have independent HEAD-coupled assertions, RETRO-02 needs more than wrapper fixes for those files — conversion count increases but stays within 7-12 bound |
| A2 | check-phase-{48..52, 55, 57, 59}.mjs have zero HEAD-coupled assertions (no milestone-doc readFile calls) | RETRO-01 methodology | If any have milestone-doc references not caught by the broader grep scan, they appear in RETRO-01 inventory as NO_HEAD_COUPLING with rationale |
| A3 | V-61-09..12/16 (PROJECT.md + AUDIT_DOC reads in check-phase-61) are cumulative-assertion semantics (not milestone-close-state semantics) and classify as NO_HEAD_COUPLING | Pitfall 3 | If they are milestone-close-state assertions, they need RETRO-02 conversion too — but this is plan-phase author's empirical call during RETRO-01 |
| A4 | check-phase-60.mjs has no HEAD-coupled planning-doc assertions (all readFile calls are against HARNESS, SIDECAR, PIN_HELPER, archived phase docs) | Empirical scan section | Wrapper fix only; if RETRO-01 finds planning-doc HEAD-coupling, add to conversion scope |
| A5 | AUDIT_WRAPPER_ANCHOR regex successfully distinguishes AUDIT wrappers from CHAIN wrappers in check-phase-{60,61}.mjs | Pattern 3 (V-73-AUDIT-WRAPPER-NEG) | If regex aliasing occurs, V-73-AUDIT-WRAPPER-NEG may produce false PASS — empirically verify with standalone test before Plan 73-01 commit |
| A6 | V-67-05/06 conversion target is the correct `aa6de68` with a different path or the true close-gate SHA `4df3a16` | V-67-05/06 root cause section | Plan 73-02 author must empirically inspect both SHAs via `git show aa6de68:docs/...` vs `git show 4df3a16:docs/...` before choosing conversion target |

**If this table is non-empty:** Claims A1-A6 require empirical verification during Plan 73-01 RETRO-01 scan. None are decision-blocking — they are confirmation tasks for the executor.

---

## Open Questions

1. **V-67-05/06 correct frozen SHA**
   - What we know: V-67-05/06 use `readCorpusFileAtV17Close()` (SHA `aa6de68`) but assert content authored at Plan 70-05 Commit B (`4df3a16`). FAIL detail: `expected OP-10 callouts in 2 files; got N` / `expected >= 2 files with Version History; got 1`
   - What's unclear: Which frozen SHA resolves the content discrepancy? `aa6de68` (helper-authoring SHA, the convention) or `4df3a16` (true close-gate SHA)?
   - Recommendation: During Plan 73-02 Wave 1, run `git show aa6de68:docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md | grep -c OP-10` and same for `4df3a16`. The SHA that returns the expected count is the correct conversion target. Document in RETRO-INVENTORY.md as COMPLEX_CONVERSION.

2. **Anti-ballooning tripline calibration**
   - What we know: D-03 advisor estimates 7-12 conversion candidates. Recommendation is 12 as the tripline for SCOPE-GAP-RETRO-02-OVERFLOW-01 stub.
   - What's unclear: If RETRO-01 inventory finds exactly 12 or 13 candidates, plan-phase author decides whether to convert all or defer overflow.
   - Recommendation: Set tripline at 13+ (i.e., 12 is IN scope; 13+ triggers the stub). Rationale: the 7 must-touch floor + 5 candidate band = 12; any beyond 12 is genuinely unexpected scope.

3. **v1.6 close-state assertion presence**
   - What we know: `9d8877c` is the v1.6-close SHA. No existing frozen-aware helpers consume it yet (Phase 73 is FIRST consumer per D-04 advisor).
   - What's unclear: Do any check-phase-{48..66}.mjs validators cite v1.6-close state in their docstrings? Grep for `"v1.6"` in validator name strings shows check-phase-56.mjs has `"v1.2 SSoT"` refs — but v1.6 state refs in 48..66 validators are unlikely (v1.6 closed at Phase 66; check-phase-66.mjs is the most likely candidate).
   - Recommendation: If RETRO-01 surfaces v1.6-close-state assertions, use `readAtV16Close` from `_lib/frozen-at-close.mjs`. If zero, `readAtV16Close` is still exported (D-04 LOCKED) but unused until v1.9+.

---

## Sources

### Primary (HIGH confidence)
- `73-CONTEXT.md` D-01..D-04 — All four locked decisions with adversarial-review provenance [VERIFIED: read directly]
- `scripts/validation/check-phase-{48..66,72}.mjs` — Direct source inspection for HEAD-coupled assertion locations and wrapper line numbers [VERIFIED: read directly + automated scan]
- `scripts/validation/_lib/archive-path.mjs` — Phase 68 `_lib` precedent module [VERIFIED: read directly]
- `.claude/tmp/72-chain-post.txt` — Phase 72 empirical chain output (8 FAIL inventory) [VERIFIED: read directly]
- `72-VERIFICATION.md` Section E — Per-validator audit inventory (17 sites) [VERIFIED: read directly]
- Git SHA resolution: `git cat-file -e` confirmed OK for all 4 milestone-close SHAs [VERIFIED: Bash tool]

### Secondary (MEDIUM confidence)
- D-01 advisor dossier (`phase73-D01-advisor.md`) — Wrapper fold-in boundary analysis with empirical site verification [VERIFIED: read directly]
- D-02 advisor dossier (`phase73-D02-advisor.md`) — Helper centralization analysis with 3× duplication empirical evidence [VERIFIED: read directly]
- D-03 advisor dossier (`phase73-D03-advisor.md`) — Plan layout + empirical scope discovery (19 files, 57 readFileSync calls, 4-file candidate band) [VERIFIED: read directly]
- D-04 advisor dossier (`phase73-D04-advisor.md`) — SHA-pin convention analysis with empirical SHA discovery [VERIFIED: read directly]
- `v1.8-DEFERRED-CLEANUP.md` CHAIN-DEGRADED-AT-HEAD-01 — Per-validator root cause table [VERIFIED: read directly]
- `v1.7-DEFERRED-CLEANUP.md` HARNESS-FORWARD-01 + SCOPE-GAP-61 — Retrospective scope contract [VERIFIED: read directly]

### Tertiary (LOW confidence)
- D-03 advisor scan results for check-phase-{53,54,56,60} "milestone-close keyword density" (22 hits across 4 files) — Based on advisor's grep from pre-discuss-phase; confirmed directionally by my own scan but not reproduced byte-for-byte [marked LOW, plan-phase author confirms during RETRO-01]

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Node.js built-ins + git CLI; zero npm packages; all verified in existing codebase
- Architecture: HIGH — D-01..D-04 all locked; atomic-commit patterns proven; frozen-aware helper pattern well-established
- Empirical RETRO-01 scope: MEDIUM — 7-validator must-touch floor is HIGH confidence; 4-5 candidate band is MEDIUM confidence (advisors's keyword scan; confirmed by readFile call inspection; actual HEAD-coupling determination requires per-assertion inspection during Plan 73-01)
- V-67-05/06 conversion target: LOW — root cause confirmed; correct target SHA requires `git show` comparison during Plan 73-02

**Research date:** 2026-06-08
**Valid until:** 2026-07-08 (30-day stable horizon — no external dependencies; all internal tooling)
