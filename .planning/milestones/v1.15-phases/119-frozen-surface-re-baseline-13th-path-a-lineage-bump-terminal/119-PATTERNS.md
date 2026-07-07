# Phase 119: Frozen-Surface Re-baseline + 13th Path-A Lineage Bump + Terminal Re-audit Close - Pattern Map

**Mapped:** 2026-07-06
**Files analyzed:** 13 (7 new/modified code artifacts + 2 modified files + 4 documentation artifacts)
**Analogs found:** 13 / 13 (this is a copy-and-repoint harness phase — every artifact has a byte-read v1.14 predecessor)

**Note on domain:** This phase has no controller/component/service/model tiers in the conventional web-app sense. It is a **documentation-repository harness-and-CI domain**: Node.js validator scripts (`.mjs`), a JSON sidecar config, a GitHub Actions workflow, and milestone-close Markdown. The role/data-flow classification below substitutes this project's own tier vocabulary (validator, config, CI-workflow, doc-artifact) for the standard classification, matching how the phase's own RESEARCH.md framed it.

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|--------------------|------|-----------|-----------------|----------------|
| `scripts/validation/v1.15-milestone-audit.mjs` | validator (harness) | batch/transform (corpus-wide lint, C1-C17) | `scripts/validation/v1.14-milestone-audit.mjs` | exact (copy + repoint + 1 new check) |
| `scripts/validation/v1.15-audit-allowlist.json` | config (sidecar) | CRUD-adjacent (static exemption lookup table) | `scripts/validation/v1.14-audit-allowlist.json` | exact (copy + repoint + re-verify pins) |
| `scripts/validation/regenerate-supervision-pins.mjs` (MODIFY) | validator (utility) | batch/transform | itself (append BASELINE_19 to existing BASELINE_10..18 series) | exact (self-analog, additive-only) |
| `scripts/validation/_lib/frozen-at-close.mjs` (MODIFY) | utility (git-anchored reader) | request-response (`git show <SHA>:<path>`) | itself (append V114 pin to `MILESTONE_CLOSE_SHAS`, following V18..V113 pattern) | exact (self-analog, additive-only) |
| `scripts/validation/check-phase-113.mjs` … `check-phase-118.mjs` (6 files) | validator (leaf, per-phase regression guard) | batch/transform (presence + content-needle checks) | `scripts/validation/check-phase-101.mjs` | exact |
| `scripts/validation/check-phase-119.mjs` | validator (chain apex) | batch/transform (recursive subprocess-spawn chain, 71 entries) | `scripts/validation/check-phase-112.mjs` | exact |
| `.github/workflows/audit-harness-v1.15-integrity.yml` | CI config (GHA workflow) | event-driven (PR path-filter + cron + workflow_dispatch) | `.github/workflows/audit-harness-v1.14-integrity.yml` | exact |
| `PIPE-02-CLOSE-RUNBOOK.md` | doc-artifact (owner-run procedure) | request-response (manual procedure, not code) | `.planning/phases/113-.../PIPE-02-RUNBOOK.md` | exact (fork, real-corpus + wide-matrix riders) |
| `PIPE-02-CLOSE-FINDINGS.md` | doc-artifact (owner-recorded results) | file-I/O (transcript capture) | `.planning/phases/113-.../PIPE-02-FINDINGS.md` | exact |
| `.planning/milestones/v1.15-MILESTONE-AUDIT.md` | doc-artifact (close-gate narrative) | batch (aggregation of all evidence) | `.planning/milestones/v1.14-MILESTONE-AUDIT.md` | exact |
| `.planning/milestones/v1.15-DEFERRED-CLEANUP.md` | doc-artifact (backlog) | batch | `.planning/milestones/v1.14-DEFERRED-CLEANUP.md` | exact |
| `119-VERIFICATION.md` (consumed, not authored by Atom 2) | doc-artifact | — | `112-VERIFICATION.md` (consumed by `check-phase-112.mjs`'s `V-112-AUDIT` check) | exact (referenced via `resolveArchivedPhasePath`) |
| C17 fold mechanism (no new file — `execFileSync` spawn inside item 1) | integration (subprocess) | event-driven (spawn + exit-code check) | `check-phase-112.mjs`'s `AUDIT-HARNESS` check (spawns `v1.14-milestone-audit.mjs`) | exact (existing spawn pattern reused for a new spawn target) |

---

## Pattern Assignments

### 1. `scripts/validation/v1.15-milestone-audit.mjs` (validator, batch/transform)

**Analog:** `scripts/validation/v1.14-milestone-audit.mjs` (981 lines, full read)
**read_first:** `scripts/validation/v1.14-milestone-audit.mjs` lines 1-90 (header + helpers); the C1-C16 check bodies (unchanged, do not re-derive); `scripts/validation/c17-eee-contract.mjs` lines 1-60 (the fold source, self-executing, header explicitly names Phase 119 as consumer).

**Header/imports pattern** (lines 1-44):
```javascript
#!/usr/bin/env node
// v1.14 Milestone Audit Harness (Path A copy of v1.13; lineage v1.4 → ... → v1.14; ...)
// Source of truth: .planning/phases/112-.../112-CONTEXT.md (D-00..D-04)
// Sidecar allow-list: scripts/validation/v1.14-audit-allowlist.json (...)
// File reads only: all content loaded via fs.readFileSync; no shell invocations.   <-- becomes FALSE once C17 adds execFileSync; update this line honestly
//
// Checks:
//   C1: ... C16: 4-edge cross-link integrity triangle ...
//
// Usage: node scripts/validation/v1.14-milestone-audit.mjs [--verbose] [--self-test]
// Exit code: 0 on all-PASS; 1 on any-FAIL.

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');
const SELF_TEST = argv.includes('--self-test');
```
**v1.15 change:** add `import { execFileSync } from 'node:child_process';` to the import block and correct the now-inaccurate "File reads only ... no shell invocations" header claim (C17 spawns a subprocess) — an honest-accounting requirement, not optional polish.

**Sidecar-load pattern** (lines 76-88, repoint target for v1.15):
```javascript
function parseAllowlist() {
  const raw = readFile('scripts/validation/v1.14-audit-allowlist.json');
  if (!raw) return { safetynet_exemptions: [], supervision_exemptions: [] };
  try {
    return JSON.parse(raw);
  } catch (err) {
    return { _parseError: err.message, safetynet_exemptions: [], supervision_exemptions: [] };
  }
}
const ALLOWLIST = parseAllowlist();
```
Repoint the literal string `'scripts/validation/v1.14-audit-allowlist.json'` → `'scripts/validation/v1.15-audit-allowlist.json'`. This is the ONLY sidecar-path reference in the file (confirmed single call-site at line 79).

**New check-17 pattern (C17 fold via subprocess-spawn)** — mirrors `check-phase-112.mjs`'s `AUDIT-HARNESS` check (see Pattern 6 below) exactly, NOT a hand-rolled reimplementation:
```javascript
{
  id: 17,
  name: 'C17: EEE document contract (13 assertions, all enrolled docs/ files)',
  run() {
    try {
      execFileSync('node', ['scripts/validation/c17-eee-contract.mjs'], {
        stdio: 'pipe', timeout: 300000, cwd: process.cwd(),
      });
      return { pass: true, detail: 'c17-eee-contract.mjs exits 0 (all enrolled files pass 13 assertions)' };
    } catch (err) {
      const stderr = err.stderr ? err.stderr.toString() : '';
      const stdout = err.stdout ? err.stdout.toString() : '';
      return { pass: false, detail: 'C17 FAIL: ' + (stdout + stderr).slice(0, 500).trim() };
    }
  }
}
```
Prefer wiring this through the existing `_lib/exec-fail-detail.mjs` helper (`execFailDetail(stdout, stderr, {...})`) rather than the hand-rolled `.slice(0,500).trim()` above, for consistency with `check-phase-112.mjs`'s `CHAIN-${phaseNum}` and `AUDIT-HARNESS` checks (Open Question #2 in RESEARCH.md; use the DRY in-repo helper).

**CRLF-normalizing readFile helper** (lines 50-54, copy verbatim, no change needed):
```javascript
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');  // CRLF normalization per Phase 31 ca40eb9
}
```

**Error handling / exit pattern:** identical structure to `check-phase-101.mjs`'s runner loop (see Pattern 5) — pass/fail/skipped tri-state, `process.exit(failed > 0 ? 1 : 0)`. No changes needed to the runner loop itself.

---

### 2. `scripts/validation/v1.15-audit-allowlist.json` (config sidecar)

**Analog:** `scripts/validation/v1.14-audit-allowlist.json` (531 lines, structure confirmed via head read)
**read_first:** `scripts/validation/v1.14-audit-allowlist.json` in full (531 lines — small enough for one read); `docs/reference/android-capability-matrix.md` (RE-144, Phase-118 retrofitted — re-verify its line-pins).

**Shape** (confirmed lines 1-40):
```json
{
  "schema_version": "1.1",
  "generated": "2026-07-02T00:00:00Z",
  "phase": "112-pillar-e-12th-path-a-audit-harness-lineage-bump-milestone-cl",
  "safetynet_exemptions": [
    { "file": "docs/_glossary-android.md", "line": 187, "reason": "..." },
    { "file": "docs/android-lifecycle/03-android-version-matrix.md", "line": 102, "reason": "v1.5 inherit baseline 2026-04-26" }
  ],
  "supervision_exemptions": [ /* {file, line, reason} triples */ ],
  "cope_banned_phrases": [ /* ... */ ],
  "c7_knox_allowlist": [ /* ... */ ],
  "c9_exemptions": [ /* ... */ ],
  "c11_ops_exemptions": [ /* ... */ ],
  "c13_broken_link_allowlist": [ /* 15-entry, count-asserted by C13 */ ],
  "c13_rotting_external": { "quarterly_audit": { "next_review": "2027-01-01", ... }, "ci_1_abm_urls": [ /* ... */ ] },
  "c16_missing_endpoint_exemptions": [ /* ... */ ]
}
```
**Repoint:** `"phase": "112-pillar-e-..."` → `"phase": "119-frozen-surface-re-baseline-13th-path-a-lineage-bump-terminal"`.

**CRITICAL — do not copy verbatim without re-verification:** `docs/reference/android-capability-matrix.md` (RE-144) WAS retrofitted in Phase 118 (RETRO-03, EEE header block + Version-History row inserted). Its `{file, line}` pins inside `safetynet_exemptions`/`supervision_exemptions`/`c7_knox_allowlist` almost certainly shifted (same class of drift documented at Phase 62/68/112 for `_glossary-android.md`). Run `node scripts/validation/v1.14-milestone-audit.mjs` against current HEAD BEFORE assuming a clean copy — any FAIL pinpoints exactly which line-pins need repointing. This is the single highest-probability silent-copy-error site (RESEARCH.md Assumption A3).

---

### 3. `scripts/validation/regenerate-supervision-pins.mjs` (MODIFY — append-only)

**Analog:** itself — the BASELINE_10 through BASELINE_18 comment series (self-consistent template)
**read_first:** `scripts/validation/regenerate-supervision-pins.mjs` lines 460-474 (the exact BASELINE_18 paragraph + the `BASELINE_9` array declaration line — do NOT re-read beyond this once captured).

**Exact template to extend** (lines 467-474, confirmed via direct read):
```javascript
// BASELINE_18 refreshed 2026-07-02 (Phase 112 Plan 112-02): closes BASELINE_17 v1.13 carry-over
// per HARN-01 contract (REQUIREMENTS.md + ROADMAP.md Phase 112 SC#1); v1.14 line positions
// verified against HEAD 1a0ee15 (pre-Atom-1 HEAD -- Atom 1 constants lock).
// BASELINE_9 entries above remain unchanged -- Phase 112 does NOT alter the line-coord array;
// this comment records the audit-trail event that line-positions were re-verified at Phase 112
// close and remain valid for the v1.14 corpus. Resolution path: BASELINE_19 will refresh at
// the next milestone close per the Path-A inheritance pattern (... -> v1.13 -> BASELINE_17 -> v1.14 -> BASELINE_18).
const BASELINE_9 = [
  ['docs/_glossary-android.md', 80],   // ...
  ...
```
**v1.15 addition** (append AFTER the BASELINE_18 paragraph, BEFORE the `const BASELINE_9 = [` line):
```javascript
// BASELINE_19 refreshed <DATE> (Phase 119 Plan <NN>): closes BASELINE_18 v1.14 carry-over
// per HARN-03 contract (REQUIREMENTS.md + ROADMAP.md Phase 119 SC#1); v1.15 line positions
// verified against HEAD <PRE-ATOM-1 SHA — captured via `git rev-parse HEAD` immediately
// before authoring Atom 1, NOT the Wave-0 plan-creation commit>.
// BASELINE_9 entries above remain unchanged -- Phase 119 does NOT alter the line-coord array;
// this comment records the audit-trail event that line-positions were re-verified at Phase 119
// close and remain valid for the v1.15 corpus. Resolution path: BASELINE_20 will refresh at
// the next milestone close per the Path-A inheritance pattern (... -> v1.14 -> BASELINE_18 -> v1.15 -> BASELINE_19).
```
**Do NOT touch:** the `BASELINE_9` array itself (9 fixed line-coordinate entries) unless a live `--self-test` run shows FAIL; the 3 hardcoded `parseAllowlist('scripts/validation/v1.7-audit-allowlist.json')` self-test references (lines ~290/336/489) — these deliberately dogfood the Phase-43 v1.7-era fixture and are NOT stale (see anti-pattern note below).

**Anti-pattern to avoid:** repointing the `v1.7-audit-allowlist.json` self-test calls to `v1.15-audit-allowlist.json`, believing it a stale reference — it is intentional, stable through 6 prior BASELINE refreshes.

---

### 4. `scripts/validation/_lib/frozen-at-close.mjs` (MODIFY — append-only)

**Analog:** itself — the `V113` entry + `readAtV113Close` export (the immediately-preceding single-entry pin)
**read_first:** `scripts/validation/_lib/frozen-at-close.mjs` in full (80 lines — already read this session, do not re-read).

**Exact insertion point and template** (lines 41-48 for the map entry; lines 80 for the export):
```javascript
  V113: 'ba24f1a',  // Phase 100 Plan 100-04 close-gate — v1.13 milestone close-gate (docs(100-04);
                    // 4-doc traceability + v1.13 MILESTONE-AUDIT NEW + DEFERRED-CLEANUP finalize).
                    // Single entry (v1.13 closed in ONE commit; atom == close-gate;
                    // no separate closegate entry — V18/V19/V110/V111/V112 single-entry pattern applies).
  // V14 omitted — RETRO-01 must surface a v1.4-close-state assertion in check-phase-{48..66}.mjs
  // before adding (v1.4 close was Phase 42, predating chain validators).
  // Candidates if needed: b5cf529 or 671f72a (D-02 advisor pre-scan).
};
...
export const readAtV113Close      = (p) => readAtClose('V113',         p);
```
**v1.15 addition** (insert the map entry immediately after `V113`, before the `// V14 omitted` comment block; append the export immediately after `readAtV113Close`):
```javascript
  V114: '7d922a7',  // Phase 112 Plan 112-05 close-gate — v1.14 milestone close-gate.
                    // Single entry (v1.14 closed in ONE commit; atom == close-gate;
                    // same single-entry pattern as V18..V113).
```
```javascript
export const readAtV114Close      = (p) => readAtClose('V114',         p);
```
**Verification gate (load-bearing, not optional):** before committing, positively confirm `7d922a7` resolves to the v1.14 close-gate commit via the documented recovery command (same pattern the v1.14-MILESTONE-AUDIT.md itself uses for its own `{phase_112_close_SHA}` placeholder):
```bash
git log --all --grep="112-05" --grep="close-gate" --all-match -1 --format=%H
```
A wrong SHA here silently corrupts any future validator/remediation adopting `readAtV114Close`.

**Shared `readAtClose` core** (lines 59-67, unchanged, no modification needed):
```javascript
export function readAtClose(milestoneTag, relPath) {
  const sha = MILESTONE_CLOSE_SHAS[milestoneTag];
  if (!sha) throw new Error(`No frozen SHA for milestone ${milestoneTag}`);
  return execFileSync('git', ['show', sha + ':' + relPath], {
    encoding: 'utf8',
    timeout: 10000,
    stdio: ['ignore', 'pipe', 'pipe'],
  }).replace(/\r\n/g, '\n');
}
```

---

### 5. `scripts/validation/check-phase-113.mjs` … `check-phase-118.mjs` (6 new leaf validators)

**Analog:** `scripts/validation/check-phase-101.mjs` (153 lines, full read this session — lightweight, NO chain, needles derived inline)
**read_first per file:** the corresponding phase's `*-VERIFICATION.md` "Required Artifacts"/"Observable Truths" tables (113/114/115 already read this session per RESEARCH.md; **116/117/118 VERIFICATION.md must be read by the plan/executor before authoring those three files** — RESEARCH.md Assumption A5 flags these as not yet read in full).

**Full structural template** (copy verbatim, substitute per-phase constants):
```javascript
#!/usr/bin/env node
// check-phase-101.mjs -- Phase 101 deliverables (802.1X Foundation -- Network Glossary + EAP Methods + Cert Delivery)
//
// v1.14 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-112.mjs).
// NEEDLES DERIVED INLINE per D-01 (GA1 LOCKED): Phase 101 shipped without a needle-spec hand-off.
//
// Assertion classes:
//   V-101-PRESENCE-NET     docs/_glossary-network.md exists + non-empty (DOT1X-01)
//   ...
//   V-101-SELF             CHAIN_PHASES does NOT include 101 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-101.mjs [--verbose]
// Exit code: 0 if all PASS or SKIPPED; 1 if any FAIL.

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}

// Lightweight: NO chain (chain lives only in apex check-phase-112.mjs).
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);

const checks = [];

function presence(id, path, req) {
  checks.push({
    id,
    name: 'V-101-' + id + ': ' + path + ' exists and is non-empty' + (req ? ' (' + req + ')' : ''),
    run() {
      const c = readFile(path);
      if (c === null) return { pass: false, detail: path + ' missing' };
      if (c.trim().length === 0) return { pass: false, detail: path + ' is empty' };
      return { pass: true, detail: path + ' present (' + c.length + ' bytes)' };
    }
  });
}
presence('PRESENCE-NET', DELIVERABLE_NET, 'DOT1X-01');
// ... one presence() call per deliverable file ...

// === V-101-<NEEDLE>: content-string landed-pattern check ===
checks.push({
  id: 'BANNER',
  name: 'V-101-BANNER: 802.1X see-also banner present in ' + GLOSSARY_ANDROID,
  run() {
    const c = readFile(GLOSSARY_ANDROID);
    if (c === null) return { pass: false, detail: GLOSSARY_ANDROID + ' missing' };
    const needle = '> **802.1X / Network authentication:** For 802.1X protocol terminology';
    if (!c.includes(needle)) return { pass: false, detail: 'BANNER needle absent: ' + needle };
    return { pass: true, detail: '802.1X see-also banner present' };
  }
});

// === V-101-SELF: dual-invariant guard (CHAIN_PHASES excludes 101; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-101-SELF: CHAIN_PHASES does NOT include 101; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(101)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 101 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ')' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (101 absent); CHAIN_SKIP = []' };
  }
});

// === Runner loop (verbatim pattern from check-phase-96.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}
let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-101 -- Phase 101 deliverables (...)\n');
for (const check of checks) {
  let result;
  try { result = check.run(); } catch (e) { result = { pass: false, detail: 'Unexpected error: ' + e.message }; }
  const prefix = '[' + check.id + '/' + checks.length + '] ' + check.name;
  const showDetail = result.detail && (VERBOSE || !result.pass || result.skipped);
  if (result.skipped) { skipped++; process.stdout.write(padLabel(prefix) + 'SKIPPED' + (showDetail ? ' -- ' + result.detail : '') + '\n'); }
  else if (result.pass) { passed++; process.stdout.write(padLabel(prefix) + 'PASS' + (showDetail ? ' -- ' + result.detail : '') + '\n'); }
  else { failed++; process.stdout.write(padLabel(prefix) + 'FAIL -- ' + result.detail + '\n'); }
}
process.stdout.write('\nResult: ' + passed + ' PASS, ' + failed + ' FAIL, ' + skipped + ' SKIPPED\n');
process.exit(failed > 0 ? 1 : 0);
```
**Per-file substitutions:** phase number in every string literal (`101`→`113`..`118`), the `DELIVERABLE_*` path constants + their presence-check calls, the landed-content needle strings (sourced from each phase's own `*-VERIFICATION.md`), and the header comment's one-line phase-name summary. **`CHAIN_PHASES`/`CHAIN_SKIP` stay `[]`/`new Set([])` in every leaf file** — chain logic lives ONLY in the apex (Pattern 6).

**Special note for `check-phase-115.mjs`:** 115-VERIFICATION.md's own "Deferred Items" table explicitly assigns "C17 registered in the harness chain" to Phase 119 — `check-phase-115.mjs` should assert presence/self-test of the standalone `c17-eee-contract.mjs` script, NOT assert chain registration (that assertion belongs in Pattern 1's C17 fold, not here).

---

### 6. `scripts/validation/check-phase-119.mjs` (chain apex)

**Analog:** `scripts/validation/check-phase-112.mjs` (197 lines, full read this session)
**read_first:** `scripts/validation/check-phase-112.mjs` in full (already read, do not re-read); `scripts/validation/_lib/archive-path.mjs` (30 lines, full read this session — stable, unmodified dependency); `scripts/validation/_lib/exec-fail-detail.mjs` (referenced, not yet read — read once at plan/execution time if its exact signature is needed).

**Header + CRITICAL invariant comments** (lines 1-34, copy verbatim structure):
```javascript
#!/usr/bin/env node
// check-phase-112.mjs -- Phase 112 deliverables (v1.14 Audit Harness Lineage Bump + Terminal Re-Audit + Milestone Close)
//
// Chain-apex of v1.14 -- HARN-02. Ships the v1.14 chain-apex validator: CHAIN_PHASES=[48..111]
// (every integer 48 through 111, 64 entries), HARNESS repointed to v1.14-milestone-audit.mjs.
//
// CRITICAL -- [48..N-1] invariant: CHAIN_PHASES = [48..111] (NOT [48..112]).
// The array follows the [48..N-1] invariant (apex excludes its own phase). Authoring [48..112]
// would include phase 112 itself, tripping V-112-SELF self-reference FAIL.
//
// CRITICAL -- CHAIN_SKIP invariant: CHAIN_SKIP = new Set([]) -- NEVER add entries.
// V-112-SELF hard-asserts CHAIN_SKIP.size === 0. Adding entries to force the chain green
// was the GA3-C CRITICAL self-disqualifier.
//
// CRITICAL -- AUDIT-HARNESS NESTED guard: the AUDIT-HARNESS step carries the same NESTED guard
// as the CHAIN step. Under CHECK_PHASE_NESTED=1 the harness re-run is skipped so a nesting apex
// does NOT re-validate evolved live corpus with a frozen audit.

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';
import { resolveArchivedPhasePath } from './_lib/archive-path.mjs';
import { execFailDetail } from './_lib/exec-fail-detail.mjs';
```

**CHAIN_PHASES array pattern** (lines 52-63 — the exact [48..N-1] shape to extend):
```javascript
const HARNESS = 'scripts/validation/v1.14-milestone-audit.mjs';

// Phase 112 chain-apex extends the chain through Phase 111 (every integer 48..111).
// 64 entries: integers 48 through 111 inclusive. [48..N-1] invariant: apex EXCLUDES its own phase.
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,
                      67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,
                      86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,
                      104,105,106,107,108,109,110,111];

// CHAIN_SKIP topology: empty per Phase 68 7b635ca invariant -- NEVER add entries.
const CHAIN_SKIP = new Set([]);
```
**v1.15 change:** `HARNESS` → `'scripts/validation/v1.15-milestone-audit.mjs'`; `CHAIN_PHASES` → `[48..118]` inclusive (71 entries: append 112,113,114,115,116,117,118 to the existing array); `CHAIN_SKIP` stays `new Set([])` — a hard, non-negotiable invariant (D-119-3 rider).

**V-119-AUDIT check pattern** (lines 67-83 — repoint the archive path + phase number):
```javascript
checks.push({
  id: 'AUDIT',
  name: 'V-112-AUDIT: 112-VERIFICATION.md exists and contains Phase 112 verification heading',
  run() {
    const verifPath = resolveArchivedPhasePath(
      '112-pillar-e-12th-path-a-audit-harness-lineage-bump-milestone-cl/112-VERIFICATION.md',
      ['v1.14-phases']
    );
    const verif = verifPath ? readFile(verifPath) : null;
    if (!verif) return { pass: true, skipped: true, detail: '112-VERIFICATION.md not yet authored (PASS-via-skip until Plan 112-05 lands)' };
    if (!/Phase 112/i.test(verif)) {
      return { pass: false, detail: '112-VERIFICATION.md missing "Phase 112" section heading' };
    }
    return { pass: true, detail: '112-VERIFICATION.md exists with Phase 112 verification content' };
  }
});
```
For 119: the phase directory suffix is `119-frozen-surface-re-baseline-13th-path-a-lineage-bump-terminal/119-VERIFICATION.md`; `milestoneRoots` stays `['v1.14-phases']` per `resolveArchivedPhasePath`'s existing default-array-append convention (confirm at plan time whether `v1.15-phases` needs adding — it won't exist as an archive target until `/gsd-complete-milestone` runs, which is AFTER this phase).

**CHAIN-NN subprocess-spawn loop pattern** (lines 85-124, copy verbatim — the NESTED-aware execFileSync loop):
```javascript
const NESTED = process.env.CHECK_PHASE_NESTED === '1';
for (const phaseNum of CHAIN_PHASES) {
  if (CHAIN_SKIP.has(phaseNum)) continue;
  checks.push({
    id: `CHAIN-${phaseNum}`,
    name: `V-112-CHAIN-${phaseNum}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
    run() {
      if (NESTED) {
        return { pass: true, skipped: true, detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip recursive chain-guard expansion' };
      }
      const path = `scripts/validation/check-phase-${phaseNum}.mjs`;
      if (!existsSync(join(process.cwd(), path))) {
        return { pass: true, skipped: true, detail: path + ' not present (graceful skip)' };
      }
      const isPeer = phaseNum >= 67;
      const subTimeout = isPeer ? 600000 : 300000;
      const subEnv = { ...process.env, CHECK_PHASE_NESTED: '1' };
      try {
        execFileSync('node', [path], { stdio: 'pipe', timeout: subTimeout, cwd: process.cwd(), env: subEnv });
        return { pass: true, detail: 'check-phase-' + phaseNum + ' exits 0' + (isPeer ? ' (nested)' : '') };
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const stdout = err.stdout ? err.stdout.toString() : '';
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: execFailDetail(stdout, stderr, { n: 500, trim: true, prefix: 'check-phase-' + phaseNum + ' FAIL: ' }) };
      }
    }
  });
}
```
No structural change needed — the loop is data-driven off `CHAIN_PHASES`/`CHAIN_SKIP`, so extending the array is sufficient.

**AUDIT-HARNESS check pattern** (lines 126-149 — THIS is the exact analog for Pattern 1's C17 subprocess-spawn fold):
```javascript
checks.push({
  id: 'AUDIT-HARNESS',
  name: 'V-112-AUDIT-HARNESS: v1.14-milestone-audit.mjs exits 0 (current-milestone harness)',
  run() {
    if (!existsSync(join(process.cwd(), HARNESS))) {
      return { pass: true, skipped: true, detail: HARNESS + ' not present (graceful skip)' };
    }
    if (NESTED) {
      return { pass: true, skipped: true, detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip AUDIT-HARNESS re-run against evolved corpus' };
    }
    try {
      execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
      return { pass: true, detail: 'v1.14-milestone-audit.mjs exits 0 (current-milestone harness)' };
    } catch (err) {
      const stderr = err.stderr ? err.stderr.toString() : '';
      const stdout = err.stdout ? err.stdout.toString() : '';
      const isMissing = err.code === 'ENOENT' || err.status === 127
        || stderr.includes('not found') || stderr.includes('Could not resolve');
      if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
      return { pass: false, detail: execFailDetail(stdout, stderr, { n: 300, trim: false, prefix: 'harness FAIL: ' }) };
    }
  }
});
```

**V-119-SELF dual-invariant check pattern** (lines 151-168, copy verbatim, repoint `112`→`119` and range comment `[48..111]`→`[48..118]`):
```javascript
checks.push({
  id: 'SELF',
  name: 'V-112-SELF: CHAIN_PHASES does NOT include 112; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(112)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 112 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [48..111] (112 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});
```

**Runner loop** (lines 170-197, byte-identical to Pattern 5's runner loop — copy verbatim, only the phase number in the console.log banner changes).

---

### 7. `.github/workflows/audit-harness-v1.15-integrity.yml` (CI workflow)

**Analog:** `.github/workflows/audit-harness-v1.14-integrity.yml` (312 lines, read in full across two passes this session)
**read_first:** the file itself, lines 1-100 (header + parse/path-match/harness-run/linux-chain jobs) and lines 224-312 (check-phase-110..112 jobs + rotting-external-quarterly + pin-helper-advisory) — both ranges already captured this session, do not re-read.

**Header + trigger pattern** (lines 1-27):
```yaml
# v1.14 Audit Harness Integrity
# v1.14 integration surface. v1.4 + v1.4.1 + ... + v1.13 harnesses frozen in their respective workflow files.
# Phase 112 HARN-02: 11th coexistence workflow. path-filter v1.14-scoped + 2 crons + parse/path-match/harness-run repointed v1.14 +
#   pin-helper-advisory + rotting-external-quarterly + active check-phase-101..112 invocations.
# PRESERVES from Phase 69 dd1ff08 + 85521bb + 2d61981 (inherited verbatim via v1.13 Path-A):
#   linux-chain-ubuntu-latest fetch-depth:0 (FETCH-DEPTH-01 inheritance contract)
#   linux-chain-ubuntu-latest core.autocrlf false (LF-fidelity contract)
#   linux-chain-ubuntu-latest continue-on-error:false (D-A9 PR-blocking contract)
#   linux-chain-ubuntu-latest timeout-minutes:30
#   chain-apex CHAIN_TIMING_LINUX ::notice emission

name: Audit Harness v1.14 Integrity

on:
  pull_request:
    paths:
      - 'scripts/validation/v1.14-*'
      - 'scripts/validation/check-phase-*.mjs'
      - '.github/workflows/audit-harness-v1.14-integrity.yml'
      - '.planning/REQUIREMENTS.md'
      - '.planning/milestones/v1.14-MILESTONE-AUDIT.md'
      - '.planning/milestones/v1.14-DEFERRED-CLEANUP.md'
  schedule:
    - cron: '0 8 * * 1'         # Weekly bitrot catch
    - cron: '0 8 1 1,4,7,10 *'  # Quarterly c13_rotting_external check
  workflow_dispatch:
```
**Repoints:** `v1.14`→`v1.15` in `name:`, all four `paths:` entries (`v1.14-*`→`v1.15-*`; workflow filename; the two milestone-audit doc paths), `11th`→`12th` coexistence-workflow language, `check-phase-101..112`→`check-phase-113..119` in the descriptive comment. Cron schedule lines are UNCHANGED (D-119-2 has no cadence-change rider).

**Linux-chain job pattern (the authoritative Axis-2 job — preserve every flag verbatim)** (lines 74-92):
```yaml
  linux-chain-ubuntu-latest:
    name: Validator chain on Linux LF (Phase 69 CILINUX-01)
    runs-on: ubuntu-latest
    needs: harness-run
    timeout-minutes: 30
    continue-on-error: false
    steps:
      - name: Disable autocrlf BEFORE checkout (LF-fidelity contract)
        run: git config --global core.autocrlf false
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - name: Run chain-apex check-phase-112.mjs (recursively spawns 48..111)
        run: |
          START=$(date +%s)
          node scripts/validation/check-phase-112.mjs --verbose
          END=$(date +%s)
          echo "::notice title=CHAIN_TIMING_LINUX::Full chain wall-clock: $((END-START))s (Windows reference: deep-nest at [48..111]; subprocess timeout: 600s)"
```
**Repoint:** `check-phase-112.mjs`→`check-phase-119.mjs`, `[48..111]`→`[48..118]` in the comment + notice text. **Preserve verbatim:** `core.autocrlf false` set BEFORE checkout, `fetch-depth: 0`, `continue-on-error: false`, `timeout-minutes: 30` (D-119-2 MANDATORY rider).

**Per-phase leaf job template** (repeat pattern, lines 94-260 — one job block per `check-phase-101..112`, e.g. lines 94-106 for 101):
```yaml
  check-phase-101:
    name: check-phase-101 validator
    runs-on: ubuntu-latest
    needs: harness-run
    timeout-minutes: 15
    continue-on-error: false
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - name: Run check-phase-101.mjs
        run: node scripts/validation/check-phase-101.mjs
```
Replace the 12-job block (`check-phase-101`..`check-phase-112`) with a 7-job block (`check-phase-113`..`check-phase-119`), same template, substituting the phase number in 4 places per job (job key, `name:`, step `name:`, `run:`).

**Parse / path-match / harness-run jobs** (lines 29-72, repoint every `v1.14-audit-allowlist.json`/`v1.14-milestone-audit.mjs` string literal inside the inline `node -e`/`grep` steps — 3 job blocks, 1-2 string repoints each).

**Trailing quarterly + advisory jobs** (lines 262-312, copy verbatim — repoint only the sidecar JSON path string at line ~278, `v1.14-audit-allowlist.json`→`v1.15-audit-allowlist.json`; the `markdown-link-check@3.14.2` pin and `regenerate-supervision-pins.mjs` invocation are unchanged, self-analog files, not v1.14-specific).

**Anti-pattern (Pitfall 6 — do NOT "fix"):** the standalone `check-phase-119` job and the `linux-chain-ubuntu-latest` job both invoke the FULL apex recursion — this apparent duplication is intentional and audited; do not deduplicate or add `CHECK_PHASE_NESTED=1` to either top-level GHA invocation.

---

### 8. `PIPE-02-CLOSE-RUNBOOK.md` (owner-run procedure doc)

**Analog:** `.planning/phases/113-conversion-pipeline-lock-representative-set-grounding-valida/PIPE-02-RUNBOOK.md` (read in full this session — Section 1 Prerequisites + Section 2 Upload Procedure captured)

**Structural pattern to fork** (lines 1-70):
```markdown
# PIPE-02 Owner-Run Grounding Validation Runbook

**Procedure for:** Phase 113 live Copilot Studio grounding validation of the representative set
**Authored by:** Agent (2026-07-03) — owner-executed at the Phase 113 close checkpoint
**Decision basis:** D-01 (owner-run live legs); D-06 (single owner touchpoint); REQUIREMENTS L77
**Records into:** `PIPE-02-FINDINGS.md` (this same directory)

---

## Why This Leg Is Owner-Run
[agent has no live Copilot Studio/SharePoint access; REQUIREMENTS L77; lists completed in-scope legs]

---

## Section 1: Prerequisites
[owner-supplied table: test SharePoint URL, Copilot Studio agent name/URL]
[agent-confirmed preconditions table: fixture → doc ID → convert OK → guard exit → notes]

---

## Section 2: Upload Procedure
[step-by-step: open library, upload N files, ...]
```
**Fork changes for `PIPE-02-CLOSE-RUNBOOK.md`:**
- Header block: `Procedure for:` → Phase 119 close-gate second pass; `Authored by:` → current date; `Decision basis:` → D-119-1 (A1) + REQUIREMENTS L77; `Records into:` → `PIPE-02-CLOSE-FINDINGS.md`.
- Prerequisites table: swap the 5 synthetic `RE-T01..RE-T05` fixture rows for the representative-set selection of **real, actual shipped `RE-NNN` `Status: Approved`** docs spanning all 5 platforms + a Linux doc (NOT `docs/admin-setup-linux/00-overview.md`/RE-128 — mermaid-deferred, Pending, keyless; use an Approved Linux doc instead, e.g. `docs/admin-setup-linux/01-intune-linux-agent.md` RE-129 or `02-enrollment-profile.md` RE-130) + a Draft-label probe artifact (see Open Question #1 in RESEARCH.md — surface the real-vs-synthetic Draft-probe tension to the user/planner rather than silently resolving it) + a post-RETRO-03 wide capability-matrix probe.
- Add the mandatory query-list section (N queries) covering: grounded-answer + clickable-citation + no-hallucination across 5 platforms, the Draft-label retrieval probe, and the wide-matrix chunk-survival probe — inheriting the Phase-113 runbook's query-list shape (not shown in the captured excerpt above; read Section 3+ of `PIPE-02-RUNBOOK.md` at plan time if the query-list section needs verbatim structural copying).

---

### 9. `PIPE-02-CLOSE-FINDINGS.md` (owner-recorded results)

**Analog:** `.planning/phases/113-conversion-pipeline-lock-representative-set-grounding-valida/PIPE-02-FINDINGS.md`
**read_first:** that file in full at plan/execution time (not yet read this session — small doc, one read call sufficient) to extract its exact recording-table shape (query / response / citation-present / hallucination-free / PASS-FAIL columns) before authoring the close-gate fork's empty template for the owner to fill in.

**Key difference from Phase 113 (per D-119-1 riders):** capture the raw transcript IN-REPO this time (Phase 113 left it owner-local) — the close-gate template must include a verbatim-transcript section, not just a summary-table.

---

### 10. `.planning/milestones/v1.15-MILESTONE-AUDIT.md` (close-gate narrative)

**Analog:** `.planning/milestones/v1.14-MILESTONE-AUDIT.md` (391 lines; sections read across three passes this session — Executive Summary/Phase Closure Narrative headings at lines 127-214, Chain-Health Remediation + Auditor-Independence + Cross-OS table at lines 223-291, Deferred Items + Milestone Close at lines 360-391)

**Section skeleton to replicate** (exact heading sequence, confirmed via grep):
```
## Executive Summary
## v1.14 Phase Closure Narrative
### Phase 101 — ... (per-phase one-paragraph summaries, one per content phase)
...
### Phase 112 — 12th Path-A Harness Lineage Bump + Terminal Re-Audit + Milestone Close (HARN-01, HARN-02, HARN-03)
## The Chain-Health Remediation (Plan 112-06) — Honest Accounting
## Auditor-Independence Verification (3-axis stacking)
## Cross-OS PASS-Count EXACT MATCH (14-row set — D-04 corrected OS split)
## Requirements Traceability — 22/22 Validated
## Mechanical Checks Detail
## Audit Harness Lineage (phases 62→66→70→74→82→88→93→95→100→112, lineage v1.4→v1.14 — 12th entry)
## Cross-Phase Integration (Content → Harness Flows Clean)
## Deferred Items Summary
## Milestone Close
### Post-close hand-off to `/gsd-complete-milestone`
```

**"The Chain-Health Remediation — Honest Accounting" section pattern** (lines 223-233 — THIS is the load-bearing template for the D-119-3 pre-authorized remediation slot; copy the exact honest-narrative voice, whether or not remediation actually fires):
```markdown
## The Chain-Health Remediation (Plan 112-06) — Honest Accounting

The terminal re-audit did NOT pass on its first run, and this milestone records that truthfully
rather than presenting a clean-first-pass narrative.

**First run — RED (discarded):** Axis-2 Linux GHA run **28621185019** (headSha `8cda106`,
pre-remediation) returned apex `check-phase-112 [48..111]` = **44 PASS / 22 FAIL / 1 SKIP**. ...
**Root cause:** ...

**The remediation (Plan 112-06, `e9a06bb` + `53db9fa` + `2de780c`):** COMPLETED the D-00 doctrine.
... **NO value-masking** ...; **NO frozen surface edited** ...; **CHAIN_SKIP left empty everywhere** ...

**Re-run — GREEN:** the FRESH Axis-2 run **28625158404** (headSha `2de780c`, includes 112-06)
concluded **success**; apex ... = **66 PASS / 0 FAIL / 1 SKIP**. The stale 44/22/1 run is DISCARDED.
```
If the v1.15 GHA apex comes back green on first push (no remediation fires), this section should honestly say so — do not fabricate a remediation narrative that didn't happen (D-119-3 honest-atomicity note).

**Cross-OS PASS-Count EXACT MATCH table pattern** (lines 264-290 — the exact reusable table shape for the close-gate audit doc; copy column structure verbatim, substitute row counts once the actual re-audit runs):
```markdown
## Cross-OS PASS-Count EXACT MATCH (14-row set — D-04 corrected OS split)

| # | Validator | Type | Windows (Axis 1/3 fresh clone) | Linux (Axis 2 GHA) | Verdict |
|---|-----------|------|--------------------------------|--------------------|---------|
| 1 | `v1.14-milestone-audit.mjs --verbose` + `--self-test` | leaf | **15 PASS / 0 FAIL / 0 SKIP** ...; self-test: **9 passed, 0 failed** | **15 passed / 0 failed / 0 skipped** | **EXACT MATCH** |
...
| 13 | `check-phase-95.mjs` (continuity CHAIN [48..94]) | chain | **Windows N/A — cascades** | **exits 0 nested** | **Linux sole-authoritative** |
| 14 | `check-phase-112.mjs` (apex CHAIN [48..111], 67 checks) | chain | **Windows N/A — cascades** | **66 PASS / 0 FAIL / 1 SKIP** | **Linux sole-authoritative** |
```
For v1.15 this becomes the equivalent row set for the 6 new leaf validators (113-118) + the new apex (119) + whichever continuity chain validator is the second Linux-sole-authoritative row (likely `check-phase-100.mjs` or similar, per the "one apex + one continuity" 2-chain-row pattern — confirm the correct continuity-row candidate at plan/audit time by checking which chain validator sits immediately below the new apex in the lineage).

**Milestone Close section pattern** (lines 369-380 — the final requirement-flip list + placeholder-SHA convention):
```markdown
## Milestone Close

- **DOT1X-01..11:** Validated (Phases 101-109 content)
...
- **HARN-01:** Validated (Plan 112-02 Atom 1 `8fb74a5`)
- **HARN-02:** Validated (Plan 112-03 Atom 2 `998eeae`)
- **HARN-03:** Validated (Plan 112-05 close-gate `{phase_112_close_SHA}`)
- **22/22 v1.14 requirements:** Validated (cumulative; see Requirements Traceability table)
- **12/12 v1.14 phases:** Complete (Phases 101 / 102 / ... / 112)
- **v1.14 milestone:** **shipped 2026-07-02** — 802.1X Network Authentication Documentation + Backlog & Tooling Closure

### Post-close hand-off to `/gsd-complete-milestone`

**Next:** Archival (`/gsd-complete-milestone`) is the SEPARATE next step. ...

**Grep-recovery for `{phase_112_close_SHA}` placeholder:** `git log --all --grep="112-05" --grep="close-gate" --all-match -1 --format=%H` returns the close-gate commit SHA. Documented per single-commit protocol; literal placeholder permanently in source.
```
For v1.15: `HARN-02/03/04:Validated (16/16 v1.15 requirements)`; phase count `7/7 v1.15 phases` (113-119); the placeholder-SHA + grep-recovery-command convention is REQUIRED (the close-gate SHA cannot be known before the commit lands — same non-circularity resolution as v1.14).

---

## Shared Patterns

### Subprocess-spawn (execFileSync) — the ONE reusable spawn idiom across this entire phase
**Source:** `scripts/validation/check-phase-112.mjs` lines 106-121 (CHAIN-NN) and 137-147 (AUDIT-HARNESS)
**Apply to:** Pattern 1 (C17 fold in `v1.15-milestone-audit.mjs`), Pattern 6 (every CHAIN-NN + AUDIT-HARNESS check in `check-phase-119.mjs`)
```javascript
try {
  execFileSync('node', [path], { stdio: 'pipe', timeout: subTimeout, cwd: process.cwd(), env: subEnv });
  return { pass: true, detail: '...' };
} catch (err) {
  const stderr = err.stderr ? err.stderr.toString() : '';
  const stdout = err.stdout ? err.stdout.toString() : '';
  const isMissing = err.code === 'ENOENT' || err.status === 127
    || stderr.includes('not found') || stderr.includes('Could not resolve');
  if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
  return { pass: false, detail: execFailDetail(stdout, stderr, { n: 500, trim: true, prefix: '... FAIL: ' }) };
}
```
Always an argument array (`execFileSync('node', [path], ...)`), NEVER string-concatenated shell interpolation (`execSync`) — this is the project's one process-level security control (RESEARCH.md Security Domain section).

### CRLF-normalizing file reader — universal helper across every `.mjs` in `scripts/validation/`
**Source:** `scripts/validation/v1.14-milestone-audit.mjs` lines 50-54 (identical copy exists in `check-phase-101.mjs` lines 34-38 and `check-phase-112.mjs` lines 46-50)
**Apply to:** every new/modified `.mjs` file in this phase
```javascript
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}
```

### NESTED-guard doctrine — mandatory for any check that re-runs a milestone-audit/self-test against live corpus
**Source:** `scripts/validation/check-phase-112.mjs` line 89 (`const NESTED = process.env.CHECK_PHASE_NESTED === '1';`) + its use at lines 96-98 and 134-136
**Apply to:** `check-phase-119.mjs`'s CHAIN-NN and AUDIT-HARNESS checks (Pattern 6) — this is the exact doctrine whose incompleteness caused v1.14's first-run 44/22/1 RED (Common Pitfall 1 in RESEARCH.md). New leaf validators (113-118, Pattern 5) do NOT need this guard themselves (they have no nested re-invocation of a frozen audit) — it only matters for the apex.

### Pass/Fail/Skip runner loop — identical across all `check-phase-*.mjs` and both milestone-audit harness files
**Source:** `scripts/validation/check-phase-101.mjs` lines 126-153 (byte-identical to `check-phase-112.mjs` lines 170-197 except the phase-number banner string)
**Apply to:** all 7 new `check-phase-*.mjs` files (Patterns 5 and 6)
```javascript
const LABEL_WIDTH = 60;
function padLabel(s) { if (s.length >= LABEL_WIDTH) return s + ' '; return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' '; }
let passed = 0, failed = 0, skipped = 0;
for (const check of checks) {
  let result;
  try { result = check.run(); } catch (e) { result = { pass: false, detail: 'Unexpected error: ' + e.message }; }
  const prefix = '[' + check.id + '/' + checks.length + '] ' + check.name;
  const showDetail = result.detail && (VERBOSE || !result.pass || result.skipped);
  if (result.skipped) { skipped++; /* SKIPPED */ }
  else if (result.pass) { passed++; /* PASS */ }
  else { failed++; /* FAIL */ }
}
process.exit(failed > 0 ? 1 : 0);
```

### Back-anchor invariant — every pin references a PAST close SHA, never the current/future one
**Source:** `scripts/validation/_lib/frozen-at-close.mjs` — the entire `MILESTONE_CLOSE_SHAS` map (V15 through V113, each a completed predecessor's close-gate commit)
**Apply to:** Pattern 4 (V114 pin) and Pattern 3 (BASELINE_19 back-anchor to the Wave-0/pre-Atom-1 HEAD, never the close-gate SHA). This is the single grounding correction the adversarial review made this phase (CONTEXT.md lines 244-246) — do not reintroduce the "self-reference" framing.

### Path-A copy-and-repoint discipline — the whole-phase meta-pattern
**Source:** every artifact class above; also visible in the workflow header's own self-description ("11th coexistence workflow" → "12th")
**Apply to:** all 7 code/CI artifacts. The invariant: predecessor v1.4-v1.14 harness/sidecar/workflow files remain byte-unchanged (only Phase-1 content docs are deliberately re-pinned this milestone — HARN-02's intentional inversion). Verify via `git diff <Wave-0 anchor> HEAD` over the 32+ non-Phase-1 frozen surfaces = EMPTY at close (v1.14 audit line 229 pattern).

---

## No Analog Found

None. Every artifact this phase creates or modifies has a byte-read, structurally-identical v1.14 (or earlier) predecessor. The two genuinely novel authoring decisions (C17 subprocess-fold; PIPE-02 real-corpus + wide-matrix probe) are still built from existing in-repo spawn/procedure patterns, not invented from scratch — see Pattern 1 and Pattern 8 above.

## Metadata

**Analog search scope:** `scripts/validation/` (all `.mjs` + `.json`), `.github/workflows/` (all `audit-harness-*.yml`), `.planning/milestones/` (all `v1.*-MILESTONE-AUDIT.md`), `.planning/phases/113-*/PIPE-02-*.md`
**Files read in full or targeted-range this session:** `v1.14-milestone-audit.mjs` (header+helpers), `v1.14-audit-allowlist.json` (structure), `_lib/frozen-at-close.mjs` (full, 80 lines), `check-phase-112.mjs` (full, 197 lines), `check-phase-101.mjs` (full, 153 lines), `audit-harness-v1.14-integrity.yml` (full, 312 lines across 2 reads), `regenerate-supervision-pins.mjs` (BASELINE block), `c17-eee-contract.mjs` (header, 60 lines), `_lib/archive-path.mjs` (full, 30 lines), `v1.14-MILESTONE-AUDIT.md` (headings + 3 targeted sections), `113-.../PIPE-02-RUNBOOK.md` (Sections 1-2)
**Pattern extraction date:** 2026-07-06
