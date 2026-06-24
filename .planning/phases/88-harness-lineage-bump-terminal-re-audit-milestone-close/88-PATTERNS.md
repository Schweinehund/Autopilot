# Phase 88: Harness Lineage Bump + Terminal Re-Audit + Milestone Close — Pattern Map

**Mapped:** 2026-06-24
**Files analyzed:** 13 (9 new, 4 modified)
**Analogs found:** 13 / 13

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `scripts/validation/v1.10-milestone-audit.mjs` | utility/validator | file-I/O | `scripts/validation/v1.9-milestone-audit.mjs` | exact (Path-A 4-line copy) |
| `scripts/validation/v1.10-audit-allowlist.json` | config | — | `scripts/validation/v1.9-audit-allowlist.json` | exact (Path-A metadata-only delta) |
| `scripts/validation/_lib/frozen-at-close.mjs` | utility/library | — | same file (surgical modify: add V19 entry + readAtV19Close) | self-analog |
| `scripts/validation/regenerate-supervision-pins.mjs` | utility | — | same file (surgical modify: append BASELINE_14 comment) | self-analog |
| `scripts/validation/check-phase-83.mjs` | validator | file-I/O | `scripts/validation/check-phase-75.mjs` | exact (SELF+PRESENCE structural shape) |
| `scripts/validation/check-phase-84.mjs` | validator | file-I/O | `scripts/validation/check-phase-75.mjs` | exact |
| `scripts/validation/check-phase-85.mjs` | validator | file-I/O | `scripts/validation/check-phase-75.mjs` | exact |
| `scripts/validation/check-phase-86.mjs` | validator | file-I/O | `scripts/validation/check-phase-75.mjs` | exact |
| `scripts/validation/check-phase-87.mjs` | validator | file-I/O | `scripts/validation/check-phase-75.mjs` | exact |
| `scripts/validation/check-phase-88.mjs` | validator/chain-apex | event-driven (subprocess chain) | `scripts/validation/check-phase-82.mjs` | exact (Path-A apex copy) |
| `.github/workflows/audit-harness-v1.10-integrity.yml` | config/CI | request-response | `.github/workflows/audit-harness-v1.9-integrity.yml` | exact (Path-A repoint) |
| `.planning/milestones/v1.10-MILESTONE-AUDIT.md` | docs | — | `.planning/milestones/v1.9-MILESTONE-AUDIT.md` | exact (Path-A content-adapt) |
| `.planning/milestones/v1.10-DEFERRED-CLEANUP.md` | docs | — | `.planning/milestones/v1.9-DEFERRED-CLEANUP.md` | exact (Path-A content-adapt) |

---

## Pattern Assignments

### `scripts/validation/v1.10-milestone-audit.mjs` (new, Path-A copy)

**Analog:** `scripts/validation/v1.9-milestone-audit.mjs`
**Action:** Copy verbatim; change EXACTLY 4 lines (lines 2, 4, 35, 79). Nothing else.

**Lines to change** (from RESEARCH.md verified edit table):

| Line | v1.9 text → v1.10 text |
|---|---|
| 2 | `v1.9 … Path A copy of v1.8; lineage … → v1.8 → v1.9; C1-C16 inherited verbatim` → `v1.10 … Path A copy of v1.9; lineage … → v1.8 → v1.9 → v1.10; C1-C16 inherited verbatim` |
| 4 | `v1.9-audit-allowlist.json (v1.9 Path-A from v1.8 … per Phase 82 …)` → `v1.10-audit-allowlist.json (v1.10 Path-A from v1.9 … per Phase 88 …)` |
| 35 | `// Usage: node scripts/validation/v1.9-milestone-audit.mjs …` → `v1.10-milestone-audit.mjs` |
| 79 | `const raw = readFile('scripts/validation/v1.9-audit-allowlist.json');` → `v1.10-audit-allowlist.json` (FUNCTIONAL — load-bearing sidecar repoint) |

**File header pattern** (analog lines 1–6):
```javascript
#!/usr/bin/env node
// v1.9 Milestone Audit Harness (Path A copy of v1.8; lineage v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7 → v1.8 → v1.9; C1-C16 inherited verbatim)
// Source of truth: .planning/phases/70-.../70-CONTEXT.md (D-01..D-04)
// Sidecar allow-list: scripts/validation/v1.9-audit-allowlist.json (v1.9 Path-A from v1.8 ...)
// Frozen-predecessor reproducibility anchor: v1.6-milestone-audit.mjs pinned at Phase 66 close
// File reads only: all content loaded via fs.readFileSync; no shell invocations.
```

**HARD CONSTRAINTS:**
- DO NOT touch line 5 (`Frozen-predecessor … v1.6 … Phase 66`) — never bumped in any prior hop
- DO NOT touch line 90 (`Apple Business v1.6 docs`) — same
- DO NOT add a C17 or 16th check — array stays at exactly 15 entries (C1–C16, C8 absent)
- DO NOT change line count from 979
- Verify with `git diff --no-index v1.9-milestone-audit.mjs v1.10-milestone-audit.mjs` — exactly 4 hunks

**Parse/allowlist helper pattern** (analog lines 76–88):
```javascript
function parseAllowlist() {
  const raw = readFile('scripts/validation/v1.9-audit-allowlist.json');   // ← line 79 to change
  if (!raw) return { safetynet_exemptions: [], supervision_exemptions: [] };
  try {
    return JSON.parse(raw);
  } catch (err) {
    return { _parseError: err.message, safetynet_exemptions: [], supervision_exemptions: [] };
  }
}
const ALLOWLIST = parseAllowlist();
```

---

### `scripts/validation/v1.10-audit-allowlist.json` (new, Path-A copy)

**Analog:** `scripts/validation/v1.9-audit-allowlist.json`
**Action:** Copy verbatim; change ONLY the metadata fields. Never wipe content.

**Top-level metadata to change** (analog lines 1–5):
```json
{
  "schema_version": "1.1",
  "generated": "2026-06-22T00:00:00Z",
  "phase": "82-harness-lineage-bump-terminal-re-audit-milestone-close",
  ...
}
```
Change to:
```json
{
  "schema_version": "1.1",
  "generated": "2026-06-2XT00:00:00Z",
  "phase": "88-harness-lineage-bump-terminal-re-audit-milestone-close",
  ...
}
```
Optionally update `quarterly_audit.next_review`.

**HARD CONSTRAINTS (invariants that must survive the copy):**
- `c13_broken_link_allowlist` array length MUST remain exactly 15 (C13 hard-asserts this count)
- `c16_missing_endpoint_exemptions` MUST remain `[]`
- `safetynet_exemptions` = 4 entries (carry forward unchanged unless new files trigger C1)
- `supervision_exemptions` = 20 entries (carry forward unchanged unless new files trigger C2)
- `c13_rotting_external` block (`ci_1`, `ci_2_vpp_location_token`, `ci_3`, `quarterly_audit`) — carry verbatim, do NOT wipe

**Pre-commit gate:** Run `node scripts/validation/v1.10-milestone-audit.mjs --verbose` immediately after the Path-A copy (before the Atom 1 commit). Must return 15 PASS / 0 FAIL. If any check fails, add allowlist entries for the new macOS files before committing.

---

### `scripts/validation/_lib/frozen-at-close.mjs` (surgical modify)

**Analog:** Same file — current content is the insertion-point pattern.
**Action:** Add V19 entry to `MILESTONE_CLOSE_SHAS` + add `readAtV19Close` convenience export.

**Existing V18 entry to pattern-match** (lines 25–27 of current file):
```javascript
  V18:  '2bd79d8',  // Phase 74 Plan 74-05 — v1.8 milestone close-gate (docs(74-05); 4-doc traceability
                    // + v1.8 MILESTONE-AUDIT NEW + DEFERRED-CLEANUP finalize). Single entry per D-04
                    // (v1.8 closed in ONE commit so atom == close-gate; no separate V18_CLOSEGATE).
```

**V19 entry to insert immediately after the V18 entry** (line 28 insertion point):
```javascript
  V19:  'b29dca5',  // Phase 82 Plan 82-04 — v1.9 milestone close-gate (docs(82-04); 4-doc traceability
                    // + v1.9 MILESTONE-AUDIT NEW + DEFERRED-CLEANUP). Single entry (v1.9 closed in ONE
                    // commit; atom == close-gate; no separate V19_CLOSEGATE).
```

**Existing readAtV18Close convenience export to pattern-match** (line 58 of current file):
```javascript
export const readAtV18Close       = (p) => readAtClose('V18',          p);
```

**readAtV19Close export to append after readAtV18Close**:
```javascript
export const readAtV19Close       = (p) => readAtClose('V19',          p);
```

**HARD CONSTRAINT:** SINGLE entry only — no `V19_CLOSEGATE` key. V18 precedent confirms: v1.9 closed in ONE commit, so atom == close-gate. The V17/V17_CLOSEGATE split was a retro fix (RETRO-02); V19 does NOT have this problem.

**Verification command after edit:**
```
node -e "import('./scripts/validation/_lib/frozen-at-close.mjs').then(m=>{if(typeof m.readAtV19Close!=='function'||m.MILESTONE_CLOSE_SHAS.V19!=='b29dca5')process.exit(1);console.log('OK')})"
```

---

### `scripts/validation/regenerate-supervision-pins.mjs` (surgical modify)

**Analog:** Same file — BASELINE_13 region (lines 432–438) is the insertion-point pattern.
**Action:** Append a BASELINE_14 comment block immediately after the BASELINE_13 block (before line 439 where `const BASELINE_9` begins). Comment-only addition — do NOT touch the array.

**Existing BASELINE_13 block to pattern-match** (lines 432–438):
```javascript
// BASELINE_13 refreshed 2026-06-22 (Phase 82 Plan 82-01): closes BASELINE_12 v1.8 carry-over
// per SSOHARN-01 contract (REQUIREMENTS.md:57 + ROADMAP.md Phase 82 SC#1); v1.9 line positions
// verified against HEAD 3007960 (Phase 81 close baseline + Phase 82 chain green).
// BASELINE_9 entries above remain unchanged -- Phase 82 does NOT alter the line-coord array;
// this comment records the audit-trail event that line-positions were re-verified at Phase 82
// close and remain valid for the v1.9 corpus. Resolution path: BASELINE_14 will refresh at the
// next milestone close per the Path-A inheritance pattern (... -> v1.8 -> BASELINE_12 -> v1.9 -> BASELINE_13).
```

**BASELINE_14 block to insert at line 439 (pushing `const BASELINE_9` down)**:
```javascript
// BASELINE_14 refreshed 2026-06-XX (Phase 88 Plan 88-01): closes BASELINE_13 v1.9 carry-over
// per HARN-01 contract (REQUIREMENTS.md + ROADMAP.md Phase 88 SC#1); v1.10 line positions
// verified against HEAD {ACTUAL_HEAD_SHA_AT_ATOM1_TIME} ({description of HEAD at task time}).
// BASELINE_9 entries above remain unchanged -- Phase 88 does NOT alter the line-coord array;
// this comment records the audit-trail event that line-positions were re-verified at Phase 88
// close and remain valid for the v1.10 corpus. Resolution path: BASELINE_15 will refresh at
// the next milestone close per the Path-A inheritance pattern (... -> v1.9 -> BASELINE_13 -> v1.10 -> BASELINE_14).
```

**HARD CONSTRAINTS:**
- `{ACTUAL_HEAD_SHA_AT_ATOM1_TIME}` MUST be the REAL short SHA at task execution time (not a placeholder in the committed file). RESEARCH.md states current HEAD is `26d3c60` but it may advance; use `git rev-parse --short HEAD` immediately before the Atom 1 commit.
- DO NOT touch the `const BASELINE_9` array starting at line 439.

---

### `scripts/validation/check-phase-83.mjs` through `check-phase-87.mjs` (new, structural/SELF+PRESENCE)

**Analog:** `scripts/validation/check-phase-75.mjs` (the "AUDIT-HARNESS + SELF only" minimal structural shape)
**Action:** For each phase NN in 83..87, copy check-phase-75.mjs and substitute the phase number and deliverable path.

**Complete structural template** (check-phase-75.mjs, all 97 lines):
```javascript
#!/usr/bin/env node
// check-phase-75.mjs -- Phase 75 deliverables (lightweight net-new validator)
//
// v1.9 per-phase validator. Phase 75 shipped its content/corpus already covered by the
// v1.9 milestone-audit C-checks; this validator is LIGHTWEIGHT per Phase 82 D-01 / DIVERGENCE-6
// (Open Question 2): a richer dual-invariant SELF guard + one phase-presence assertion. NO chain
// (the chain lives ONLY in the apex check-phase-82.mjs). Deterministic PASS counts are load-bearing
// for the Plan 82-03 cross-OS EXACT MATCH diff.
//
// Assertion classes:
//   V-75-SELF       CHAIN_PHASES does NOT include 75 AND CHAIN_SKIP is empty Set (dual-invariant)
//   V-75-PRESENCE   phase headline deliverable exists + non-empty
//
// Lineage: Path-A structural shell from check-phase-71.mjs (lightweight; no chain).
//
// Usage: node scripts/validation/check-phase-75.mjs [--verbose]
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

// Lightweight: NO chain (chain lives only in apex check-phase-82.mjs).
const CHAIN_PHASES = [];
// CHAIN_SKIP topology: empty per Phase 68 7b635ca invariant -- no entries to suppress.
const CHAIN_SKIP = new Set([]);

// Phase 75 headline deliverable (macOS glossary).
const DELIVERABLE = 'docs/_glossary-macos.md';

const checks = [];

// === V-75-PRESENCE: phase headline deliverable exists + non-empty ===
checks.push({
  id: 'PRESENCE',
  name: 'V-75-PRESENCE: ' + DELIVERABLE + ' exists and is non-empty',
  run() {
    const c = readFile(DELIVERABLE);
    if (c === null) return { pass: false, detail: DELIVERABLE + ' missing' };
    if (c.trim().length === 0) return { pass: false, detail: DELIVERABLE + ' is empty' };
    return { pass: true, detail: DELIVERABLE + ' present (' + c.length + ' bytes)' };
  }
});

// === V-75-SELF: dual-invariant guard (CHAIN_PHASES excludes 75; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-75-SELF: CHAIN_PHASES does NOT include 75; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(75)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 75 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (75 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-71.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-75 -- Phase 75 deliverables (lightweight net-new validator)\n');
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

**Per-phase substitution table** (all occurrences of `75` + deliverable + banner text must change):

| Phase | Replace every `75` with | Replace `DELIVERABLE` const | Replace banner description |
|---|---|---|---|
| 83 | `83` | `'docs/admin-setup-macos/10-kerberos-sso-extension.md'` | `Phase 83 deliverables (Kerberos SSO Extension guide)` |
| 84 | `84` | `'docs/admin-setup-macos/11-graph-api-platform-credential.md'` | `Phase 84 deliverables (Graph API Platform Credential guide)` |
| 85 | `85` | `'docs/l2-runbooks/28-macos-kerberos-sso-investigation.md'` | `Phase 85 deliverables (L2 Kerberos SSO Investigation runbook)` |
| 86 | `86` | confirm via 86-SUMMARY.md at task time (RESEARCH.md A3: likely `scripts/validation/check-phase-58.mjs` or `73-RETRO-INVENTORY.md`) | `Phase 86 deliverables (chain-health pass)` |
| 87 | `87` | `'docs/index.md'` (confirm via 87-SUMMARY.md — RESEARCH.md A3) | `Phase 87 deliverables (navigation hub)` |

**TRANSPOSED-DIGIT GUARD (mandatory post-authoring check for each file):**
Each `check-phase-NN.mjs` SELF check must embed the CORRECT phase number. Verify immediately after writing:
```
node -e "const c=require('fs').readFileSync('scripts/validation/check-phase-83.mjs','utf8'); console.log(c.match(/includes\((\d+)\)/)?.[1])"
```
Must print `83` (not `75` or any other number). Repeat for 84..87.

**D-01 HARD CONSTRAINT:** These validators are STRUCTURAL ONLY. They MUST NOT use `readAtV19Close()` or any `git show` invocation to assert v1.10 content. PRESENCE checks confirm file exists and is non-empty — nothing more.

---

### `scripts/validation/check-phase-88.mjs` (new, chain-apex)

**Analog:** `scripts/validation/check-phase-82.mjs` (the entire 174-line file)
**Action:** Path-A copy; apply the edits listed below. The runner loop (lines 147–173) copies verbatim.

**Required substitutions from check-phase-82.mjs:**

| Location | v1.9 (check-phase-82.mjs) value | v1.10 (check-phase-88.mjs) value |
|---|---|---|
| Line 1 comment | `check-phase-82.mjs -- Phase 82 … v1.9 Audit Harness Lineage Bump…` | `check-phase-88.mjs -- Phase 88 … v1.10 Audit Harness Lineage Bump…` |
| Line 4 | `v1.9 chain-apex … SSOHARN-02` | `v1.10 chain-apex … HARN-02` |
| Line 5 | `check-phase-74.mjs … v1.8 corpus-rename-proof assertions DROPPED` | `check-phase-82.mjs … v1.9 corpus-rename-proof assertions DROPPED` |
| `const HARNESS` (line 38) | `'scripts/validation/v1.9-milestone-audit.mjs'` | `'scripts/validation/v1.10-milestone-audit.mjs'` |
| `CHAIN_PHASES` (line 41) | `[48,49,…,81]` (34 entries) | `[48,49,50,…,87]` (40 entries) — ADD 82,83,84,85,86,87 |
| `CHAIN_SKIP` (line 44) | `new Set([])` | `new Set([])` — UNCHANGED |
| V-82-AUDIT check (line 51) | `82-VERIFICATION.md` / `Phase 82` / `'v1.9-phases'` | `88-VERIFICATION.md` / `Phase 88` / no archive dir (live tree) |
| V-82-AUDIT-HARNESS (line 111) | `v1.9-milestone-audit.mjs exits 0 (current-milestone harness)` | `v1.10-milestone-audit.mjs exits 0 (current-milestone harness)` |
| V-82-SELF check (lines 131–143) | `CHAIN_PHASES.includes(82)` / `82 absent` | `CHAIN_PHASES.includes(88)` / `88 absent` |
| Runner banner (line 154) | `check-phase-82 -- Phase 82 deliverables (v1.9 Audit Harness Lineage Bump…)` | `check-phase-88 -- Phase 88 deliverables (v1.10 Audit Harness Lineage Bump…)` |

**CHAIN_PHASES verbatim value for v1.10 (check-phase-88.mjs line 41):**
```javascript
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87];
```
40 entries. Verify count: `node -e "const a=[48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87];console.log(a.length)"` → 40.

**AUDIT check V-88-AUDIT (SKIP-PASS until Plan 88-04 lands):**
```javascript
checks.push({
  id: 'AUDIT',
  name: 'V-88-AUDIT: 88-VERIFICATION.md exists and contains Phase 88 verification heading',
  run() {
    const verifPath = resolveArchivedPhasePath(
      '88-harness-lineage-bump-terminal-re-audit-milestone-close/88-VERIFICATION.md',
      ['v1.10-phases']
    );
    const verif = verifPath ? readFile(verifPath) : null;
    if (!verif) return { pass: false, detail: '88-VERIFICATION.md not found in live tree or v1.10-phases archive' };
    if (!/Phase 88/i.test(verif)) {
      return { pass: false, detail: '88-VERIFICATION.md missing "Phase 88" section heading' };
    }
    return { pass: true, detail: '88-VERIFICATION.md exists with Phase 88 verification content' };
  }
});
```

**NESTED short-circuit carries verbatim** (line 71 of check-phase-82.mjs):
```javascript
const NESTED = process.env.CHECK_PHASE_NESTED === '1';
```

**isPeer threshold carries verbatim** (line 85): phases >= 67 use 600s timeout; phases < 67 use 300s. Phases 83–88 are all >= 67 so all use 600s.

**DO NOT add VPP-01a/b analogs** — no corpus rename in v1.10 (same as v1.9 DIVERGENCE-2 drop).

**Expected result after Atom 2:** 43 PASS / 0 FAIL / 0 SKIPPED (40 CHAIN + AUDIT + AUDIT-HARNESS + SELF).

---

### `.github/workflows/audit-harness-v1.10-integrity.yml` (new, Path-A copy)

**Analog:** `.github/workflows/audit-harness-v1.9-integrity.yml` (all 257 lines)
**Action:** Path-A copy; repoint all v1.9 references to v1.10. The structural skeleton copies verbatim.

**File header comment to update** (analog lines 1–10):
```yaml
# v1.9 Audit Harness Integrity
# v1.9 integration surface. v1.4 + v1.4.1 + v1.5 + v1.6 + v1.7 + v1.8 harnesses frozen in their respective workflow files.
# Phase 82 SSOHARN-03: 6th coexistence workflow. path-filter v1.9-scoped + 2 crons + parse/path-match/harness-run repointed v1.9 +
# pin-helper-advisory + rotting-external-quarterly + active chain-75..82 invocations.
```
Change to (7th coexistence workflow; Phase 88 HARN-02):
```yaml
# v1.10 Audit Harness Integrity
# v1.10 integration surface. v1.4 + v1.4.1 + v1.5 + v1.6 + v1.7 + v1.8 + v1.9 harnesses frozen in their respective workflow files.
# Phase 88 HARN-02: 7th coexistence workflow. path-filter v1.10-scoped + 2 crons + parse/path-match/harness-run repointed v1.10 +
# pin-helper-advisory + rotting-external-quarterly + active chain-83..88 invocations.
```

**name field** (analog line 12):
```yaml
name: Audit Harness v1.9 Integrity
```
→ `name: Audit Harness v1.10 Integrity`

**on.pull_request.paths** (analog lines 17–22): repoint all `v1.9-*` globs to `v1.10-*`:
```yaml
on:
  pull_request:
    paths:
      - 'scripts/validation/v1.10-*'
      - 'scripts/validation/check-phase-*.mjs'
      - '.github/workflows/audit-harness-v1.10-integrity.yml'
      - '.planning/REQUIREMENTS.md'
      - '.planning/milestones/v1.10-MILESTONE-AUDIT.md'
      - '.planning/milestones/v1.10-DEFERRED-CLEANUP.md'
```

**Both cron lines carry verbatim** (analog lines 24–25 — do NOT change):
```yaml
  schedule:
    - cron: '0 8 * * 1'         # Weekly bitrot catch
    - cron: '0 8 1 1,4,7,10 *'  # Quarterly c13_rotting_external check
```

**parse job** (analog lines 36–46): change `v1.9-audit-allowlist.json` → `v1.10-audit-allowlist.json`

**path-match job** (analog lines 54–61): change both `v1.9-audit-allowlist.json` and `v1.9-milestone-audit.mjs` refs → v1.10

**harness-run job** (analog lines 71–72): change `v1.9-milestone-audit.mjs` → `v1.10-milestone-audit.mjs`

**linux-chain-ubuntu-latest job — carry VERBATIM** (analog lines 74–92, FETCH-DEPTH-01 + LF-fidelity + D-A9 contracts):
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
      - name: Run chain-apex check-phase-88.mjs (recursively spawns 48..87)
        run: |
          START=$(date +%s)
          node scripts/validation/check-phase-88.mjs --verbose
          END=$(date +%s)
          echo "::notice title=CHAIN_TIMING_LINUX::Full chain wall-clock: $((END-START))s (Windows reference: ~430s; subprocess timeout: 600s)"
```
(Only change: `check-phase-82.mjs` → `check-phase-88.mjs` and `48..81` → `48..87` in the comment.)

**Per-validator jobs** (analog lines 94–204): REPLACE the 8 jobs for check-phase-75..82 with 6 jobs for check-phase-83..88. Each job uses the same template (analog lines 94–106):
```yaml
  check-phase-83:
    name: check-phase-83 validator
    runs-on: ubuntu-latest
    needs: harness-run
    timeout-minutes: 15
    continue-on-error: false
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - name: Run check-phase-83.mjs
        run: node scripts/validation/check-phase-83.mjs
```
Repeat for 84, 85, 86, 87, 88 (6 total jobs).

**rotting-external-quarterly job** (analog lines 206–239): carry structurally verbatim; repoint only `v1.9-audit-allowlist.json` → `v1.10-audit-allowlist.json`

**pin-helper-advisory job** (analog lines 241–257): carry verbatim — no version-string in this job.

**HARD CONSTRAINT:** The 6 predecessor workflows (`audit-harness-integrity.yml`, `v1.5`, `v1.6`, `v1.7`, `v1.8`, `v1.9`) MUST NOT be touched. Verify with `git diff HEAD -- .github/workflows/audit-harness-integrity.yml .github/workflows/audit-harness-v1.5-integrity.yml ...` → empty output.

---

### `.planning/milestones/v1.10-MILESTONE-AUDIT.md` (new, Path-A content-adapt)

**Analog:** `.planning/milestones/v1.9-MILESTONE-AUDIT.md`
**Action:** Adapt the v1.9 structure for v1.10 content.

**Frontmatter pattern to adapt** (analog lines 1–49):
```yaml
---
milestone: v1.9
milestone_name: macOS Platform SSO & Secure Enclave Authentication Documentation
audited: 2026-06-22T00:00:00Z
status: passed
scores:
  requirements: 27/27
  phases: 8/8
  integration: clean
  flows: clean
mechanical_checks:
  harness: scripts/validation/v1.9-milestone-audit.mjs
  allowlist: scripts/validation/v1.9-audit-allowlist.json
  last_run: 2026-06-22T00:00:00Z
  atom_1_sha: e760176
  atom_2_sha: e825fdb
  audit_results_sha: 9dc04ef
  close_commit: "{phase_82_close_SHA}"
  source_head_audited: 757b6335640a0b7264431e2e2f16df1936683b63
  gha_workflow_run: "27966769510"
  cross_os_exact_match: true
  ...
```
Change to v1.10 values:
- `milestone: v1.10`
- `milestone_name: macOS Kerberos SSO Extension + Graph API Platform Credential Documentation` (use actual milestone name from ROADMAP.md at task time)
- `audited:` timestamp from 88-03 re-audit date
- `scores: requirements: 17/17, phases: 6/6` (6 content phases 83–87 + harness close 88 = 7 total, but 6 content phases per v1.9 shape where harness is the close-gate)
- `harness: scripts/validation/v1.10-milestone-audit.mjs`
- `allowlist: scripts/validation/v1.10-audit-allowlist.json`
- `atom_1_sha:` Phase 88 Atom 1 commit SHA (from `git log --oneline -1` after 88-01)
- `atom_2_sha:` Phase 88 Atom 2 commit SHA
- `audit_results_sha:` Plan 88-03 audit-results commit SHA
- `close_commit: "{phase_88_close_SHA}"` — literal placeholder (recoverable via `git log --all --grep="88-04" --grep="close-gate" --all-match -1 --format=%H`)
- `gha_workflow_run:` run ID from Axis 2 GHA dispatch
- `cross_os_exact_match: true` (only after 3-axis re-audit confirms)

**Section structure to carry** (from v1.9-MILESTONE-AUDIT.md): All sections carry with v1.10 content:
- `## v1.10 Phase Closure Narrative` (Phases 83–87 content + Phase 88 harness)
- `## Auditor-Independence Verification (3-axis stacking)` (D-03/D-04 methodology)
- `## Cross-OS PASS-Count EXACT MATCH` (import 8-row table from 88-03-AUDIT-RESULTS.md)
- `## Requirements Traceability — 3/3 HARN Closed`
- `## Cumulative v1.10 Requirements Traceability — 17/17 Total`
- `## Audit Harness Lineage` (phases 62→66→70→74→82→88, lineage v1.4→v1.10, 8th entry in chain)
- `## Milestone Close` with `/gsd-complete-milestone` hand-off

---

### `.planning/milestones/v1.10-DEFERRED-CLEANUP.md` (new, Path-A content-adapt)

**Analog:** `.planning/milestones/v1.9-DEFERRED-CLEANUP.md`
**Action:** Path-A from v1.9-DEFERRED-CLEANUP.md; apply the delta described below.

**Header pattern to adapt** (analog lines 1–9):
```markdown
# v1.9 Deferred Cleanup — v1.10+ Backlog

**Authored:** 2026-06-22 (Phase 82 Plan 82-04 close-gate — canonical `.planning/milestones/` artifact)
**Milestone:** v1.9 (macOS Platform SSO & Secure Enclave Authentication Documentation)
**Status:** FINALIZED at Phase 82 Plan 82-04 close-gate `{phase_82_close_SHA}` (2026-06-22).

**Authoring rationale:** v1.9 inherits the standalone deferred-cleanup artifact convention from v1.8 close
(Path-A from `.planning/milestones/v1.8-DEFERRED-CLEANUP.md`). Per the "**do NOT mask via deletion**" doctrine...
```
Change to:
```markdown
# v1.10 Deferred Cleanup — v1.11+ Backlog

**Authored:** 2026-06-XX (Phase 88 Plan 88-04 close-gate — canonical `.planning/milestones/` artifact)
**Milestone:** v1.10 (macOS Kerberos SSO Extension + Graph API Platform Credential Documentation)
**Status:** FINALIZED at Phase 88 Plan 88-04 close-gate `{phase_88_close_SHA}` (2026-06-XX).

**Authoring rationale:** v1.10 inherits the standalone deferred-cleanup artifact convention from v1.9 close
(Path-A from `.planning/milestones/v1.9-DEFERRED-CLEANUP.md`). Per the "**do NOT mask via deletion**" doctrine...
```

**Sections to ADD (D-06 scope — new v1.10 deferrals):**
- `## MTPSSO-01`: Cross-tenant Platform Credential registration models
- `## MTPSSO-02`: Multi-tenant Conditional Access / compliance scoping for PSSO
- `## MTPSSO-03`: Multi-tenant PSSO L2 troubleshooting
- `## KRBFUT-01`: On-prem-AD-only Kerberos realm deep-dive
- `## KRBFUT-02`: Azure Files Cloud-Kerberos full coverage (GA promotion)

**Sections to CARRY FORWARD (do NOT delete — "do NOT mask via deletion" doctrine):**
- `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` — still open; chain is now [48..87] (+6 deeper). Update the chain depth reference.
- All Part B carried v1.8 items: `ARCHIVE-UPSTREAM-01`, `v1.1 line 164 token-class`, `HELPER-SPAWN-STDERR-01`, `FROZEN-AWARE-ADOPTION-SWEEP-01`, `EXEC-FAIL-DETAIL-EXTRACTION-01`

**Sections to DROP (D-07 — explicitly prohibited):**
- `PRE-EXISTING-CHAIN-RED-AT-HEAD-01` — CLOSED by Phase 86. Chain [48..82] is 37 PASS / 0 FAIL / 0 SKIPPED on both Windows and Linux GHA. Must NOT appear in v1.10-DEFERRED-CLEANUP.md.
- `PSSO-FUT-01..04` — became v1.10 REQUIREMENTS (KRB/GRAPH/NUAL/RUN) and were executed. They are RESOLVED, not deferred.

**Cross-link check (RESEARCH.md A4):** Before authoring, verify `ls docs/v1.10*` — if no `docs/v1.10-DEFERRED-CLEANUP.md` pre-exists, omit the `## Cross-References` section (unlike v1.9 which cross-linked to a pre-existing docs/ artifact from Phase 77).

---

## Shared Patterns

### CRLF Normalization (all Node ESM validators)
**Source:** `scripts/validation/check-phase-75.mjs` lines 26–30 (and every other validator)
**Apply to:** All `check-phase-83..88.mjs`
```javascript
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}
```

### Runner Loop (all Node ESM validators)
**Source:** `scripts/validation/check-phase-75.mjs` lines 70–97 (and `check-phase-82.mjs` lines 147–173 for apex)
**Apply to:** All `check-phase-83..88.mjs` — copy this block verbatim; change only the banner string
```javascript
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-NN -- Phase NN deliverables (description)\n');
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

### SELF Dual-Invariant Pattern (all lightweight validators)
**Source:** `scripts/validation/check-phase-75.mjs` lines 54–68 (CHAIN_PHASES=[], CHAIN_SKIP=new Set([]))
**Apply to:** All `check-phase-83..87.mjs` — substitute NN throughout
```javascript
const CHAIN_PHASES = [];
const CHAIN_SKIP = new Set([]);

checks.push({
  id: 'SELF',
  name: 'V-NN-SELF: CHAIN_PHASES does NOT include NN; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(NN)) {
      return { pass: false, detail: 'CHAIN_PHASES includes NN -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (NN absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});
```

### Atomic Commit Convention
**Source:** `.planning/milestones/v1.9-phases/82-harness-lineage-bump-terminal-re-audit-milestone-close/82-01-PLAN.md` (HARN-01 atom shape) and `82-02-PLAN.md` (HARN-02 atom shape)
**Apply to:** All plan commits in this phase

| Atom | Expected commit message |
|---|---|
| Atom 1 (88-01) | `feat(88-01): v1.10 harness-core Path-A — HARN-01 + V19 pin (atomic SC#1 Atom 1)` |
| Atom 2 (88-02) | `feat(88-02): v1.10 validators + CI surface — HARN-02/03 (atomic SC#1 Atom 2)` |
| Audit results (88-03) | `docs(88-03): v1.10 3-axis terminal re-audit results — HARN-03 Axis 1+2+3 EXACT MATCH` |
| Close-gate (88-04) | `docs(88-04): Phase 88 close-gate — v1.10 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability + v1.10 MILESTONE CLOSE` |

### Predecessor Byte-Unchanged Gate (20 surfaces)
**Apply to:** Pre-close-gate verification (between Atom 2 commit and close-gate commit)
**Source:** RESEARCH.md "Predecessor Byte-Unchanged HARD Gate" section
```bash
git diff <pre-88-anchor-SHA> HEAD -- \
  '.github/workflows/audit-harness-integrity.yml' \
  '.github/workflows/audit-harness-v1.5-integrity.yml' \
  ...  # (all 6 workflow YAMLs + 7 milestone-audit MJS + 7 sidecar JSON = 20 surfaces)
```
EMPTY output == invariant holds. Non-empty == STOP immediately.

---

## No Analog Found

All 13 files have direct analogs. None require RESEARCH.md patterns as substitutes.

---

## Metadata

**Analog search scope:** `scripts/validation/`, `.github/workflows/`, `.planning/milestones/`
**Files scanned:** 10 analog files read directly
**Phase boundary:** Phase 88 ends at close-gate commit (D-05); archival via `/gsd-complete-milestone` is separate and out of scope for these plans.
**Pattern extraction date:** 2026-06-24
