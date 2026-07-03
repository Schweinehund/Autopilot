# Phase 112: Pillar E — 12th Path-A Audit-Harness Lineage Bump + Milestone Close - Pattern Map

**Mapped:** 2026-07-02
**Files analyzed:** 8 (4 new files/file-groups + 4 surgical edits)
**Analogs found:** 8 / 8

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `scripts/validation/v1.14-milestone-audit.mjs` | harness | batch/file-I/O | `scripts/validation/v1.13-milestone-audit.mjs` | exact (Path-A copy + 2 threshold bumps) |
| `scripts/validation/v1.14-audit-allowlist.json` | config/sidecar | file-I/O | `scripts/validation/v1.13-audit-allowlist.json` | exact (Path-A copy + pin repoints) |
| `scripts/validation/check-phase-101..111.mjs` (11 files) | validator/leaf | request-response | `scripts/validation/check-phase-96.mjs` | exact (inline-needle non-apex template) |
| `scripts/validation/check-phase-112.mjs` | validator/apex | batch/recursive | `scripts/validation/check-phase-100.mjs` | exact (apex template with CHAIN_PHASES bump) |
| `.github/workflows/audit-harness-v1.14-integrity.yml` | CI workflow | event-driven | `.github/workflows/audit-harness-v1.13-integrity.yml` | exact (11th coexistence copy) |
| `scripts/validation/check-phase-95.mjs` (AUDIT-HARNESS guard) | validator/surgical-edit | request-response | own CHAIN step guard (lines 79-81) | role-match (same guard, different step) |
| `scripts/validation/check-phase-100.mjs` (AUDIT-HARNESS guard) | validator/surgical-edit | request-response | own CHAIN step guard (lines 91-93) | role-match (same guard, different step) |
| `scripts/validation/_lib/frozen-at-close.mjs` (V113 pin) | lib/registry | file-I/O | own V112 entry (lines 37-40 + line 75) | exact (additive ladder append) |
| `scripts/validation/regenerate-supervision-pins.mjs` (BASELINE_18) | utility/annotation | file-I/O | own BASELINE_17 block (lines 460-466) | exact (additive comment append) |

---

## Pattern Assignments

### `scripts/validation/v1.14-milestone-audit.mjs` (new harness, Path-A copy)

**Analog:** `scripts/validation/v1.13-milestone-audit.mjs`

**Role:** harness — new file, copy verbatim from analog; apply 4 targeted edits only.

**Header/lineage pattern** (analog lines 1-6 — relabel these 4 tokens):
```javascript
// v1.14 Milestone Audit Harness (Path A copy of v1.13; lineage v1.4 → ... → v1.13 → v1.14; C1-C16 inherited verbatim)
// Sidecar allow-list: scripts/validation/v1.14-audit-allowlist.json (v1.14 Path-A from v1.13 with ...)
```
Delta from analog: Change `v1.13` → `v1.14` in: (a) the top-line lineage comment, (b) the sidecar reference comment, (c) any internal reference to `v1.13-audit-allowlist.json` → `v1.14-audit-allowlist.json`, (d) the Usage comment line.

**cwd resolution pattern** (analog line 51 — copy unchanged):
```javascript
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');  // CRLF normalization per Phase 31 ca40eb9
}
```
CRITICAL: Path resolution uses `process.cwd()` (not `__dirname`). The 3-axis re-audit MUST `cd` into each clone before running the harness.

**C5 freshness threshold — MANDATORY DELTA** (analog line 406, change `> 60` to `> 90`):
```javascript
// v1.13 analog (DO NOT copy as-is):
if (diffDays > 60) {
  violations.push({ file: relPath, reason: 'review_by-last_verified=' + diffDays + 'd (>60)' });
}

// v1.14 version (what to write):
if (diffDays > 90) {
  violations.push({ file: relPath, reason: 'review_by-last_verified=' + diffDays + 'd (>90)' });
}
```
Also update the C5 block header comment from `// Phase 34 D-14 Android cadence` to reference discuss-flag #7 / v1.14 90-day cadence decision.

**C5 template-sentinel — copy unchanged** (analog line 401):
```javascript
if (lvMatch[1] === '1970-01-01') continue;  // D-24 TEMPLATE-SENTINEL -- skip
```

**C10 freshness threshold — MANDATORY DELTA** (analog line 542, same change):
```javascript
// v1.13 analog (DO NOT copy as-is):
if (diffDays > 60) {
  violations.push({ file: relPath, reason: 'review_by-last_verified=' + diffDays + 'd (>60)' });
}

// v1.14 version (what to write):
if (diffDays > 90) {
  violations.push({ file: relPath, reason: 'review_by-last_verified=' + diffDays + 'd (>90)' });
}
```

**C10 template-sentinel — copy unchanged** (analog line 537):
```javascript
if (lvMatch[1] === '1970-01-01') continue;  // TEMPLATE-SENTINEL -- skip
```

**Delta summary:** 4 tokens relabeled (header/sidecar refs) + 2 threshold bumps (C5 line 406, C10 line 542). Everything else is verbatim Path-A copy.

---

### `scripts/validation/v1.14-audit-allowlist.json` (new sidecar, Path-A copy with pin repoints)

**Analog:** `scripts/validation/v1.13-audit-allowlist.json`

**Role:** config — copy v1.13 sidecar verbatim then apply the following repoints to the NEW v1.14 file. Predecessor (v1.13) sidecar is frozen and NOT touched.

**Repoint 1 — `docs/_glossary-android.md` — ALL pins +1** (Phase 101 `eae49f7` inserted banner at line 14 above all tracked pins):

| Section | v1.13 pin | v1.14 pin |
|---------|-----------|-----------|
| `safetynet_exemptions` | 186 | 187 |
| `safetynet_exemptions` | 201 | 202 |
| `supervision_exemptions` | 17 | 18 |
| `supervision_exemptions` | 50 | 51 |
| `supervision_exemptions` | 70 | 71 |
| `supervision_exemptions` | 80 | 81 |
| `supervision_exemptions` | 82 | 83 |
| `supervision_exemptions` | 83 | 84 |
| `supervision_exemptions` | 182 | 183 |
| `supervision_exemptions` | 196 | 197 |
| `supervision_exemptions` | 199 | 200 |
| `c7_knox_allowlist` | 122 | 123 |
| `c7_knox_allowlist` | 124 | 125 |
| `c7_knox_allowlist` | 126 | 127 |
| `c7_knox_allowlist` | 198 | 199 |
| `c9_exemptions` (for `_glossary-android.md`) | 203 | 204 |

**Repoint 2 — `docs/reference/android-capability-matrix.md` — all pins +1** (Phase 109 `6306da8` added Network-Auth row before original line 54):

| Section | v1.13 pin | v1.14 pin |
|---------|-----------|-----------|
| `c9_exemptions` | 54 | 55 |
| `supervision_exemptions` | 88 | 89 |
| `supervision_exemptions` | 90 | 91 |
| `supervision_exemptions` | 91 | 92 |
| `supervision_exemptions` | 93 | 94 |
| `supervision_exemptions` | 97 | 98 |
| `supervision_exemptions` | 98 | 99 |

**No repoint needed:** `docs/index.md`, `docs/quick-ref-l1.md`, `docs/common-issues.md` carry zero line-pins in the v1.13 sidecar. `c13_broken_link_allowlist`, `ci_3_managed_apple_id`, `c11_ops_exemptions`, `c16_missing_endpoint_exemptions` entries for these two files are count-based or absent — no repoint needed.

**Verification gate after authoring:** Run `node scripts/validation/v1.14-milestone-audit.mjs --verbose` — C2, C7, C9 must PASS (confirms repoints are correct).

---

### `scripts/validation/check-phase-101.mjs` through `check-phase-111.mjs` (11 new leaf validators)

**Analog:** `scripts/validation/check-phase-96.mjs` (inline-needle non-apex template)

**Role:** validator/leaf — no CHAIN loop; presence + content needle checks only. Structural shell is Path-A from check-phase-96.mjs.

**Header pattern** (analog lines 1-36 — use this structure):
```javascript
#!/usr/bin/env node
// check-phase-NN.mjs -- Phase NN deliverables ([Phase title])
//
// v1.14 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-112.mjs).
// NEEDLES DERIVED INLINE per D-01 (GA1 LOCKED): Phase NN shipped before the needle-spec hand-off
// convention. NO retroactive NN-NEEDLE-SPEC.md was authored.
//
// Assertion classes:
//   V-NN-[ID]    [description]
//   ...
//   V-NN-SELF    CHAIN_PHASES does NOT include NN AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Usage: node scripts/validation/check-phase-NN.mjs [--verbose]
// Exit code: 0 if all PASS or SKIPPED; 1 if any FAIL.
```

**Imports pattern** (analog lines 38-43 — copy verbatim for non-apex leaf validators):
```javascript
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
```
Note: Leaf validators do NOT import `execFileSync`, `resolveArchivedPhasePath`, or `execFailDetail` (those are only needed by the apex with CHAIN/AUDIT-HARNESS steps).

**V-SELF pattern** (analog check-phase-96.mjs — replicate with NN substituted):
```javascript
const CHAIN_PHASES = [];    // leaf validator: no chain phases
const CHAIN_SKIP = new Set([]);
```
The V-NN-SELF check asserts `!CHAIN_PHASES.includes(NN)` (trivially true for empty array) and `CHAIN_SKIP.size === 0`.

**Needle pattern** (inline, per D-01 land-not-preexisting rule):
- Needle only strings that LANDED in each phase (not pre-existing before the phase)
- Use `readFile(relPath)` + `.includes(needleString)` or regex
- For presence checks: `existsSync(join(process.cwd(), relPath))`
- For content needles: `const content = readFile(relPath); if (!content || !content.includes(needle)) return { pass: false, detail: ... }`

**Phase 110 specific needles** (confirmed live, full-phrase per D-01 FIX-01 rule):
- `docs/index.md` line 110: `"9 macOS L1 runbooks — 6 ADE plus 3 Platform SSO; see row below"` (full phrase — NOT a bare integer)
- `docs/quick-ref-l1.md` line 106: `"Platform SSO — Secure Enclave Key Loss](l1-runbooks/36-macos-secure-enclave-key.md) runbook** first"`
- `docs/common-issues.md` line 254: `"mandatory PSSO re-registration after password recovery"`

**Phase 111 specific needle** (CONSUMPTION, not import-only — per D-01 false-green caution):
```javascript
// CORRECT: assert call-site exists in check-phase-100.mjs (Variant A call pattern)
const cp100 = readFile('scripts/validation/check-phase-100.mjs');
if (!cp100 || !cp100.includes('execFailDetail(stdout, stderr, { n: 500, trim: true, prefix:')) {
  return { pass: false, detail: 'execFailDetail Variant A call-site not found in check-phase-100.mjs -- TOOL-01 consumption not confirmed' };
}
// WRONG (false-green): checking for import statement only
```

**Delta from analog (check-phase-96):** Replace NN, phase title, assertion IDs, file paths, and needle strings. The structural shell (readFile helper, VERBOSE flag, checks array, runner loop) is verbatim.

---

### `scripts/validation/check-phase-112.mjs` (new apex validator)

**Analog:** `scripts/validation/check-phase-100.mjs` (v1.13 apex template)

**Role:** validator/apex — CHAIN_PHASES=[48..111], HARNESS repointed to v1.14, NESTED guard on AUDIT-HARNESS.

**Header pattern** (analog lines 1-29 — relabel with 112/v1.14 specifics):
```javascript
#!/usr/bin/env node
// check-phase-112.mjs -- Phase 112 deliverables (v1.14 Audit Harness Lineage Bump + Terminal Re-Audit + Milestone Close)
//
// Chain-apex of v1.14 -- HARN-02. Ships the v1.14 chain-apex validator: CHAIN_PHASES=[48..111]
// (every integer 48 through 111, 64 entries), HARNESS repointed to v1.14-milestone-audit.mjs. Path-A from
// check-phase-100.mjs with same structure (no corpus-rename assertions -- v1.14 has NO corpus rename).
// The apex carries AUDIT + CHAIN(48..111) + AUDIT-HARNESS + SELF only. V-112-SELF uses the richer
// dual-invariant form: asserts 112 NOT in CHAIN_PHASES AND CHAIN_SKIP.size === 0.
//
// CRITICAL -- [48..N-1] invariant: CHAIN_PHASES = [48..111] (NOT [48..112]).
// CRITICAL -- CHAIN_SKIP invariant: CHAIN_SKIP = new Set([]) -- NEVER add entries.
//
// Assertion classes:
//   V-112-AUDIT           112-VERIFICATION.md heading-presence (SKIP-PASS until Plan 112-04 lands)
//   V-112-CHAIN-{48..111} 64 subprocesses; each check-phase-{N}.mjs exits 0 (NESTED-aware)
//   V-112-AUDIT-HARNESS   scripts/validation/v1.14-milestone-audit.mjs exits 0 (current-milestone harness)
//   V-112-SELF            CHAIN_PHASES does NOT include 112 AND CHAIN_SKIP is empty Set (dual-invariant)
```

**Imports pattern** (analog lines 31-36 — copy verbatim):
```javascript
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';
import { resolveArchivedPhasePath } from './_lib/archive-path.mjs';
import { execFailDetail } from './_lib/exec-fail-detail.mjs';
```

**HARNESS constant** (analog line 47 — relabel):
```javascript
const HARNESS = 'scripts/validation/v1.14-milestone-audit.mjs';
```

**CHAIN_PHASES array** (analog lines 51-53 — expand to [48..111], 64 entries):
```javascript
// Phase 112 chain-apex extends the chain through Phase 111 (every integer 48..111).
// 64 entries: integers 48 through 111 inclusive. [48..N-1] invariant: apex EXCLUDES its own phase.
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,
                      67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,
                      86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,
                      104,105,106,107,108,109,110,111];

const CHAIN_SKIP = new Set([]);  // NEVER add entries -- V-SELF hard-asserts size === 0
```

**NESTED variable** (analog line 84 — copy verbatim):
```javascript
const NESTED = process.env.CHECK_PHASE_NESTED === '1';
```

**CHAIN step guard** (analog lines 91-93 — copy verbatim inside the CHAIN for-loop):
```javascript
if (NESTED) {
  return { pass: true, skipped: true, detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip recursive chain-guard expansion' };
}
```

**AUDIT-HARNESS step WITH NESTED guard** (analog lines 121-141 + new guard after existsSync — see RESEARCH.md code example):
```javascript
// === V-112-AUDIT-HARNESS: v1.14-milestone-audit.mjs subprocess exits 0 ===
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

**V-SELF pattern** (analog lines 143-160 — relabel 100→112):
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

**Delta from analog (check-phase-100):** Phase number 100→112; CHAIN_PHASES extended [48..99]→[48..111] (52→64 entries); HARNESS v1.13→v1.14; AUDIT-HARNESS step gains NESTED guard (3 lines inserted after existsSync skip block); all V-NN IDs relabeled; VERIFICATION.md path updated to Phase 112 archive path.

---

### `.github/workflows/audit-harness-v1.14-integrity.yml` (new CI workflow, 11th coexistence)

**Analog:** `.github/workflows/audit-harness-v1.13-integrity.yml` (read in full above)

**Role:** CI workflow — Path-A copy of v1.13 with v1.14 scope substitutions. The v1.12 and v1.13 workflows are byte-frozen and NOT edited.

**Header comment pattern** (analog lines 1-10 — relabel):
```yaml
# v1.14 Audit Harness Integrity
# v1.14 integration surface. v1.4 + ... + v1.13 harnesses frozen in their respective workflow files.
# Phase 112 HARN-02: 11th coexistence workflow. path-filter v1.14-scoped + 2 crons + parse/path-match/harness-run repointed v1.14 +
# pin-helper-advisory + rotting-external-quarterly + active check-phase-101..112 invocations.
# PRESERVES from Phase 69 dd1ff08 + 85521bb + 2d61981 (inherited verbatim via v1.13 Path-A):
#   linux-chain-ubuntu-latest fetch-depth:0 (FETCH-DEPTH-01 inheritance contract)
#   linux-chain-ubuntu-latest core.autocrlf false (LF-fidelity contract)
#   linux-chain-ubuntu-latest continue-on-error:false (D-A9 PR-blocking contract)
#   linux-chain-ubuntu-latest timeout-minutes:30
#   chain-apex CHAIN_TIMING_LINUX ::notice emission
```

**Path-filter substitutions** (analog lines 14-22 — change v1.13→v1.14, update milestone doc paths):
```yaml
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

**`parse` job substitutions:** v1.13-audit-allowlist.json → v1.14-audit-allowlist.json; "v1.13 sidecar OK" → "v1.14 sidecar OK"

**`path-match` job substitutions:** grep for `v1.14-audit-allowlist.json` in `v1.14-milestone-audit.mjs`

**`harness-run` job substitutions:** `node scripts/validation/v1.14-milestone-audit.mjs --verbose`

**`linux-chain-ubuntu-latest` job substitutions:** Run `check-phase-112.mjs` (recursively spawns [48..111])

**`check-phase-*` jobs:** Replace `check-phase-96..100` blocks with `check-phase-101..112` blocks (12 jobs, same structure per job as analog lines 94-162)

**`rotting-external-quarterly` job substitution:** `v1.13-audit-allowlist.json` → `v1.14-audit-allowlist.json`

**Frozen-workflow CI tension (Target 6 — PLANNER DECISION ALREADY RESOLVED):**
The v1.12 and v1.13 integrity workflows will trigger on the PR adding check-phase-101..112.mjs (path-filter `check-phase-*.mjs` matches all validators). Their `harness-run` job will FAIL (60d threshold vs 90d corpus). Editing those workflows is barred by D-00a. Resolution: document as accepted/known condition in v1.14-MILESTONE-AUDIT.md and v1.14-DEFERRED-CLEANUP.md. The NESTED-guard ensures correctness of the v1.14 chain; CI authority is the NEW v1.14 workflow.

**Delta from analog:** v1.13→v1.14 throughout; check-phase-96..100→check-phase-101..112; chain-apex check-phase-100→check-phase-112.

---

## Shared Patterns — Surgical Edits to Existing Files

### `scripts/validation/check-phase-95.mjs` — Add NESTED guard to AUDIT-HARNESS step

**Current AUDIT-HARNESS step** (lines 109-129, confirmed — NO NESTED guard):
```javascript
// === V-95-AUDIT-HARNESS: v1.12-milestone-audit.mjs subprocess exits 0 (current-milestone harness) ===
checks.push({
  id: 'AUDIT-HARNESS',
  name: 'V-95-AUDIT-HARNESS: v1.12-milestone-audit.mjs exits 0 (current-milestone harness)',
  run() {
    if (!existsSync(join(process.cwd(), HARNESS))) {
      return { pass: true, skipped: true, detail: HARNESS + ' not present (graceful skip)' };
    }
    // <-- INSERT NESTED GUARD HERE (after existsSync block, before try)
    try {
      execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
      return { pass: true, detail: 'v1.12-milestone-audit.mjs exits 0 (current-milestone harness)' };
    } catch (err) { ... }
  }
});
```

**Template for the guard** (copy from CHAIN step at lines 79-81 — same env var, same pattern):
```javascript
    if (NESTED) {
      return { pass: true, skipped: true, detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip AUDIT-HARNESS re-run against evolved corpus' };
    }
```

**Insert location:** After line 116 (after the `existsSync` graceful-skip `return` block, before the `try {`).

**NESTED variable already present** at line 72: `const NESTED = process.env.CHECK_PHASE_NESTED === '1';` — no new variable needed.

**Verification:** After edit, run `node scripts/validation/check-phase-95.mjs --verbose` with `CHECK_PHASE_NESTED=1` — V-95-AUDIT-HARNESS must show `SKIPPED`. Run without env var — must show PASS (standalone behavior preserved).

---

### `scripts/validation/check-phase-100.mjs` — Add NESTED guard to AUDIT-HARNESS step

**Current AUDIT-HARNESS step** (lines 121-141, confirmed — NO NESTED guard):
```javascript
// === V-100-AUDIT-HARNESS: v1.13-milestone-audit.mjs subprocess exits 0 (current-milestone harness) ===
checks.push({
  id: 'AUDIT-HARNESS',
  name: 'V-100-AUDIT-HARNESS: v1.13-milestone-audit.mjs exits 0 (current-milestone harness)',
  run() {
    if (!existsSync(join(process.cwd(), HARNESS))) {
      return { pass: true, skipped: true, detail: HARNESS + ' not present (graceful skip)' };
    }
    // <-- INSERT NESTED GUARD HERE (after existsSync block, before try)
    try {
      execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
      return { pass: true, detail: 'v1.13-milestone-audit.mjs exits 0 (current-milestone harness)' };
    } catch (err) { ... }
  }
});
```

**Template for the guard** (copy from CHAIN step at lines 91-93):
```javascript
    if (NESTED) {
      return { pass: true, skipped: true, detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip AUDIT-HARNESS re-run against evolved corpus' };
    }
```

**Insert location:** After line 128 (after the `existsSync` graceful-skip `return` block, before the `try {`).

**NESTED variable already present** at line 84: `const NESTED = process.env.CHECK_PHASE_NESTED === '1';` — no new variable needed.

**Verification:** `node scripts/validation/check-phase-100.mjs --verbose` must show V-100-AUDIT-HARNESS SKIPPED when `CHECK_PHASE_NESTED=1`.

---

### `scripts/validation/_lib/frozen-at-close.mjs` — Append V113 pin

**Current state** (lines 37-40 and 75, confirmed):
```javascript
  V112: '12f2c7b',  // Phase 95 Plan 95-04 close-gate — v1.12 milestone close-gate (docs(95-04);
                    // 4-doc traceability + v1.12 MILESTONE-AUDIT NEW + DEFERRED-CLEANUP finalize).
                    // Single entry (v1.12 closed in ONE commit; atom == close-gate;
                    // no separate closegate entry — V18/V19/V110/V111/V112 single-entry pattern applies).
  // V14 omitted ...
```
Line 75 (last convenience export):
```javascript
export const readAtV112Close      = (p) => readAtClose('V112',         p);
```

**Append after V112 in `MILESTONE_CLOSE_SHAS`:**
```javascript
  V113: 'ba24f1a',  // Phase 100 Plan 100-04 close-gate — v1.13 milestone close-gate (docs(100-04);
                    // 4-doc traceability + v1.13 MILESTONE-AUDIT NEW + DEFERRED-CLEANUP finalize).
                    // Single entry (v1.13 closed in ONE commit; atom == close-gate;
                    // no separate V113_CLOSEGATE — V18/V19/V110/V111/V112 single-entry pattern applies).
```

**Append after `readAtV112Close` line:**
```javascript
export const readAtV113Close      = (p) => readAtClose('V113',         p);
```

**Delta:** Two additive insertions — one in the `MILESTONE_CLOSE_SHAS` object (after V112 entry, before the `// V14 omitted` comment), one convenience export (after line 75). Predecessor entries are byte-unchanged.

**Stale header note (D-02):** Lines 5-9 (`EXISTING inline helpers in check-phase-{61, 67, 68, 70}.mjs REMAIN INLINE`) are now factually false post-Phase-111 TOOL-02. Do NOT fix in Phase 112 — route to DEFERRED-CLEANUP per D-02.

---

### `scripts/validation/regenerate-supervision-pins.mjs` — Append BASELINE_18 comment

**Current BASELINE_17 end** (lines 460-466, confirmed):
```javascript
// BASELINE_17 refreshed 2026-06-29 (Phase 100 Plan 100-01): closes BASELINE_16 v1.12 carry-over
// per HARN-01 contract (REQUIREMENTS.md + ROADMAP.md Phase 100 SC#1); v1.13 line positions
// verified against HEAD ea24467 (Phase 100 Wave-1 commit — Atom 1 constants lock).
// BASELINE_9 entries above remain unchanged -- Phase 100 does NOT alter the line-coord array;
// this comment records the audit-trail event that line-positions were re-verified at Phase 100
// close and remain valid for the v1.13 corpus. Resolution path: BASELINE_18 will refresh at
// the next milestone close per the Path-A inheritance pattern (... -> v1.12 -> BASELINE_16 -> v1.13 -> BASELINE_17).
const BASELINE_9 = [     // <-- line 467
```

**Append after line 466, immediately before `const BASELINE_9 = [`:**
```javascript
// BASELINE_18 refreshed 2026-07-02 (Phase 112 Plan 112-01): closes BASELINE_17 v1.13 carry-over
// per HARN-01 contract (REQUIREMENTS.md + ROADMAP.md Phase 112 SC#1); v1.14 line positions
// verified against HEAD [ATOM_1_SHA] (Phase 112 Wave-1 commit -- Atom 1 constants lock).
// BASELINE_9 entries above remain unchanged -- Phase 112 does NOT alter the line-coord array;
// this comment records the audit-trail event that line-positions were re-verified at Phase 112
// close and remain valid for the v1.14 corpus. Resolution path: BASELINE_19 will refresh at
// the next milestone close per the Path-A inheritance pattern (... -> v1.13 -> BASELINE_17 -> v1.14 -> BASELINE_18).
```

**`[ATOM_1_SHA]` is a placeholder** — executor fills in the actual git SHA of the commit that lands `v1.14-milestone-audit.mjs` (the Atom 1 commit). Obtain via `git log -1 --format=%H` after committing Atom 1.

**Delta:** 7-line additive comment inserted after line 466. `const BASELINE_9 = [` line is NOT moved — the comment inserts immediately before it.

---

## Shared Patterns

### NESTED Guard (cross-cutting — applies to check-phase-95, check-phase-100, check-phase-112)

**Source:** `scripts/validation/check-phase-100.mjs` lines 84, 91-93
**Apply to:** All CHAIN step guards (already present); AUDIT-HARNESS steps (missing in 95/100, must add; already in 112 per the new-file pattern)

```javascript
// Variable (declared once per file, before the checks array)
const NESTED = process.env.CHECK_PHASE_NESTED === '1';

// Guard (inside each step's run() body, after graceful-skip checks, before expensive work)
if (NESTED) {
  return { pass: true, skipped: true, detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip ...' };
}
```

**Environment propagation** (analog line 100 — sets the env var in subprocess):
```javascript
const subEnv = { ...process.env, CHECK_PHASE_NESTED: '1' };
// passed as: execFileSync('node', [path], { ..., env: subEnv })
```

### execFailDetail (cross-cutting — all check-phase validators with CHAIN/AUDIT-HARNESS steps)

**Source:** `scripts/validation/_lib/exec-fail-detail.mjs`
**Apply to:** check-phase-112.mjs CHAIN wrapper and AUDIT-HARNESS catch blocks
**Import:** `import { execFailDetail } from './_lib/exec-fail-detail.mjs';`

Call patterns (from analog check-phase-100.mjs, confirmed live):
```javascript
// Variant A — CHAIN subprocess (500-line, trimmed)
return { pass: false, detail: execFailDetail(stdout, stderr, { n: 500, trim: true, prefix: 'check-phase-' + phaseNum + ' FAIL: ' }) };

// Variant C — harness subprocess (300-line, untrimmed)
return { pass: false, detail: execFailDetail(stdout, stderr, { n: 300, trim: false, prefix: 'harness FAIL: ' }) };
```

### readFile helper (cross-cutting — all check-phase validators and harness)

**Source:** `scripts/validation/check-phase-100.mjs` lines 41-45
```javascript
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}
```
Copy verbatim to every new check-phase-NN.mjs and the v1.14-milestone-audit.mjs.

---

## No Analog Found

None. All 8 file targets have exact or role-match analogs in the codebase.

---

## Execution Order Constraint

The PATTERNS.md imposes one hard ordering constraint that the planner MUST reflect:

**Wave 0 (D-00 first):** Add NESTED guard to `check-phase-95.mjs` and `check-phase-100.mjs` BEFORE authoring Atoms 1–2. The apex chain (`check-phase-112`) cannot reach GREEN until these guards are in place. Verify with `node scripts/validation/check-phase-100.mjs --verbose` (V-100-AUDIT-HARNESS must SKIPPED under `CHECK_PHASE_NESTED=1`).

**Wave 1 (Atom 1):** `v1.14-milestone-audit.mjs` + `v1.14-audit-allowlist.json` + BASELINE_18 append + V113 pin append — these are the indivisible Atom 1 commit.

**Wave 2 (Atom 2):** `check-phase-101..112.mjs` + CI workflow `audit-harness-v1.14-integrity.yml` — indivisible Atom 2 commit.

**Wave 3:** 3-axis terminal re-audit + close-gate artifact set (single close-gate commit; no separate Commit A).

---

## Metadata

**Analog search scope:** `scripts/validation/`, `.github/workflows/`, `scripts/validation/_lib/`
**Files read:** 9 source files (check-phase-95, check-phase-96, check-phase-100, v1.13-milestone-audit top/C5/C10, frozen-at-close, regenerate-supervision-pins BASELINE_17, audit-harness-v1.13-integrity.yml)
**Pattern extraction date:** 2026-07-02
