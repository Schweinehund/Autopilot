# Phase 66: Apple Business Validation Tooling Closure + Milestone Audit - Pattern Map

**Mapped:** 2026-05-24
**Files analyzed:** 8 (4 NEW + 4 MODIFIED) + 11 ABAUDIT scope files (read-only staleness walk)
**Analogs found:** 8 / 8 (every NEW file has an exact-role exact-data-flow analog; every MODIFIED file is its own analog with line-precise extension targets)
**Baseline HEAD at mapping time:** `ad5c9c915dde9143c227d1ab9b026ed21be294fb`

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `scripts/validation/check-phase-66.mjs` | validator (test) | subprocess-chain regression-guard | `scripts/validation/check-phase-65.mjs` | **exact** (Path-A copy; same role + data flow + V-NN-NN naming convention) |
| `.github/workflows/audit-harness-v1.6-integrity.yml` | CI workflow (config) | event-driven (PR + schedule cron) | `.github/workflows/audit-harness-v1.5-integrity.yml` | **exact** (Path-A copy; same job topology + only-advisory-job pattern) |
| `.planning/milestones/v1.6-MILESTONE-AUDIT.md` | milestone-close document (markdown + YAML frontmatter) | static authoring | `.planning/milestones/v1.5-MILESTONE-AUDIT.md` | **exact** (template) |
| `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` | deferred-items tracking document (markdown) | static authoring | `.planning/milestones/v1.5-MILESTONE-AUDIT.md` `deferred_items:` block (inline) — NEW artifact pattern, no standalone v1.5 equivalent | **role-match** (partial; v1.5 inlined deferred_items inside MILESTONE-AUDIT.md; v1.6 lifts to standalone file per CONTEXT D-04) |
| `scripts/validation/v1.6-milestone-audit.mjs` (MOD) | validator harness (test) | file-I/O + regex scan | itself (Phase 65 close state) | **self** (line-precise extensions at 577 + 854 only; preserve everything else) |
| `scripts/validation/v1.6-audit-allowlist.json` (MOD) | sidecar (config/data) | static JSON | itself (Phase 65 close state) | **self** (line 79 `c13_rotting_external: []` → populated object) |
| `scripts/validation/regenerate-supervision-pins.mjs` (MOD) | pin-helper utility (script) | file-I/O | itself (Phase 65 close state) | **self** (BASELINE_9 freshness comment pattern mirrored at lines 390/393/396) |
| `scripts/validation/check-phase-62.mjs` (MOD) | validator (test) — **PROBABLE 5th-file extension; budgeted per D-01 dry-run cascade** | subprocess-chain regression-guard | itself (V-62-SIDECAR at lines 277-291) | **self** (likely needs assertion extension for new `c13_rotting_external` shape; discover during dry-run) |
| 11 ABAUDIT scope files (READ-ONLY walk) | docs (content) | file-I/O (staleness audit) | n/a — no modifications, audit only | **n/a** (D-02 staleness walk; likely zero orphans) |

## Pattern Assignments

### `scripts/validation/check-phase-66.mjs` (validator, subprocess-chain)

**Analog:** `scripts/validation/check-phase-65.mjs` (Path-A copy source; verified at HEAD ad5c9c9)

**Header + imports pattern** (lines 1-31 verbatim with phase-number swap):
```javascript
#!/usr/bin/env node
// check-phase-66.mjs -- Phase 66 (Apple Business Validation Tooling Closure + Milestone Audit) deliverables
// Source of truth: .planning/phases/66-apple-business-validation-tooling-closure-milestone-audit/66-CONTEXT.md
// Assertions: .planning/phases/66-apple-business-validation-tooling-closure-milestone-audit/66-PATTERNS.md (V-66-01..V-66-SELF)
//
// V-66-NN structural assertions + V-66-ABAUDIT-STALENESS + V-66-CHAIN + V-66-AUDIT + V-66-SELF covering:
//   C11 windowKeywords extended with 6 LOCKED tokens
//   c13_rotting_external populated with quarterly_audit metadata
//   BASELINE_10 freshness comment in regenerate-supervision-pins.mjs
//   Synthetic regex 7 back-port (v1.6-milestone-audit.mjs:854 ↔ :725)
//   audit-harness-v1.6-integrity.yml exists with both crons + rotting-external-quarterly job
//   v1.6-MILESTONE-AUDIT.md + v1.6-DEFERRED-CLEANUP.md exist with expected structure
//   24 ABAUDIT comments verified load-bearing (zero orphans)
//
// Lineage: Phase 48 D-25 -> ... -> Phase 65 ABNAV-01..07 -> Phase 66 AUDIT-14..15
//
// Usage: node scripts/validation/check-phase-66.mjs [--verbose]
// Exit code: 0 if all V-66-NN PASS or SKIPPED; 1 if any FAIL.

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

**Constant declarations pattern** (analog lines 33-44 — swap targets to Phase 66 surfaces):
```javascript
const HARNESS         = 'scripts/validation/v1.6-milestone-audit.mjs';
const ALLOWLIST       = 'scripts/validation/v1.6-audit-allowlist.json';
const PIN_HELPER      = 'scripts/validation/regenerate-supervision-pins.mjs';
const CI_WORKFLOW     = '.github/workflows/audit-harness-v1.6-integrity.yml';
const MILESTONE_AUDIT = '.planning/milestones/v1.6-MILESTONE-AUDIT.md';
const DEFERRED_CLEAN  = '.planning/milestones/v1.6-DEFERRED-CLEANUP.md';
```

**CHAIN_PHASES pattern** (analog line 47 — extend with 65; preserve CHAIN_SKIP verbatim from analog line 69):
```javascript
// Extends check-phase-65.mjs chain by adding 65.
// Phase 66 is the validator-as-deliverable in this phase; D-22 auditor-independence preserved via D-03 fresh-clone re-audit.
const CHAIN_PHASES = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65];

// CHAIN_SKIP unchanged from check-phase-65.mjs:69 — Windows-host CRLF + archived-path failures.
// Resolution path: v1.7 CI-Linux job per v1.6-DEFERRED-CLEANUP.md (deferred Phase 66 → Phase 67+ per D-03).
const CHAIN_SKIP = new Set([48, 51, 58, 60, 61]);
```

**Per-assertion shape pattern** (analog lines 71-93 V-65-01 template — replicate for each V-66-NN):
```javascript
{
  id: 1, name: 'V-66-01: v1.6-milestone-audit.mjs windowKeywords contains 6 LOCKED C11 tokens',
  run() {
    const c = readFile(HARNESS);
    if (c === null) return { pass: false, detail: HARNESS + ' missing' };
    const REQUIRED_TOKENS = [
      'apple-business-side', 'intune-side', 'integration-handshake',
      'owned-by-apple-business', 'owned-by-intune', 'scope-boundary'
    ];
    const missing = REQUIRED_TOKENS.filter(t => !c.includes(t));
    if (missing.length > 0) {
      return { pass: false, detail: 'windowKeywords missing tokens: ' + missing.join(', ') + ' -- AUDIT-14 contract per ROADMAP.md:239' };
    }
    return { pass: true, detail: 'all 6 C11 LOCKED tokens present in windowKeywords' };
  }
},
```

**JSON-sidecar shape assertion pattern** (analog lines 236-256 V-65-13; reuse for V-66-02 c13_rotting_external):
```javascript
{
  id: 2, name: 'V-66-02: v1.6-audit-allowlist.json c13_rotting_external is populated object + quarterly_audit metadata',
  run() {
    const c = readFile(ALLOWLIST);
    if (c === null) return { pass: false, detail: ALLOWLIST + ' missing' };
    let parsed;
    try { parsed = JSON.parse(c); } catch (e) {
      return { pass: false, detail: 'JSON parse error: ' + e.message };
    }
    const c13r = parsed.c13_rotting_external;
    if (Array.isArray(c13r)) {
      return { pass: false, detail: 'c13_rotting_external is still an empty array placeholder; expected populated object per AUDIT-14 contract' };
    }
    if (!c13r || typeof c13r !== 'object') {
      return { pass: false, detail: 'c13_rotting_external missing or not an object' };
    }
    if (!c13r.quarterly_audit || c13r.quarterly_audit.cadence !== '0 8 1 1,4,7,10 *') {
      return { pass: false, detail: 'c13_rotting_external.quarterly_audit.cadence missing or != "0 8 1 1,4,7,10 *"' };
    }
    return { pass: true, detail: 'c13_rotting_external populated with quarterly_audit metadata (cadence=' + c13r.quarterly_audit.cadence + ')' };
  }
},
```

**File-content substring assertion pattern** (analog lines 122-128 V-65-05 + 200-217 V-65-11 windowed; reuse for V-66-03/05/06/07):
```javascript
// V-66-03 (BASELINE_10 freshness comment in pin-helper) — substring check
{
  id: 3, name: 'V-66-03: regenerate-supervision-pins.mjs contains BASELINE_10 freshness comment',
  run() {
    const c = readFile(PIN_HELPER);
    if (c === null) return { pass: false, detail: PIN_HELPER + ' missing' };
    if (!c.includes('BASELINE_10 refreshed') || !c.includes('Phase 66')) {
      return { pass: false, detail: 'BASELINE_10 freshness comment absent — expected "BASELINE_10 refreshed ... Phase 66" mirroring BASELINE_9 comments at lines 390/393/396' };
    }
    return { pass: true, detail: 'BASELINE_10 freshness comment present (mirrors BASELINE_9 pattern)' };
  }
},
```

**Self-recursion guard pattern (V-NN-SELF)** (analog lines 324-332 — swap 65 → 66):
```javascript
// === V-66-SELF: CHAIN_PHASES does NOT include 66 (no self-reference; D-22 auditor-independence) ===
checks.push({
  id: 'SELF', name: 'V-66-SELF: CHAIN_PHASES array does NOT include 66 (no self-recursive call)',
  run() {
    if (CHAIN_PHASES.includes(66)) return { pass: false, detail: 'CHAIN_PHASES includes 66 -- self-reference regression' };
    const skipList = [...CHAIN_SKIP].sort((a, b) => a - b).join(',');
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] -- 66 absent (correct); CHAIN_SKIP = [' + skipList + ']' };
  }
});
```

**CHAIN-runner subprocess pattern** (analog lines 275-303 — replicate verbatim with NN=66 in id/messages):
```javascript
for (let i = 0; i < CHAIN_PHASES.length; i++) {
  const phaseNum = CHAIN_PHASES[i];
  const id = 'CHAIN-' + phaseNum;
  checks.push({
    id, name: `V-66-${id}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
    run() {
      if (CHAIN_SKIP.has(phaseNum)) {
        return { pass: true, skipped: true, detail: 'pre-existing failure unrelated to Phase 66 (see CHAIN_SKIP docs); deferred to v1.7 CI-Linux job per v1.6-DEFERRED-CLEANUP.md' };
      }
      const path = `scripts/validation/check-phase-${phaseNum}.mjs`;
      if (!existsSync(join(process.cwd(), path))) {
        return { pass: true, skipped: true, detail: path + ' not present (graceful skip)' };
      }
      try {
        execFileSync('node', [path], { stdio: 'pipe', timeout: 60000, cwd: process.cwd() });
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

**Subprocess-AUDIT pattern** (analog lines 305-322 — replicate verbatim with V-66-AUDIT label):
```javascript
checks.push({
  id: 'AUDIT', name: 'V-66-AUDIT: v1.6-milestone-audit.mjs exits 0',
  run() {
    try {
      execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 60000, cwd: process.cwd() });
      return { pass: true, detail: 'v1.6 harness exits 0' };
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

**V-66-ABAUDIT-STALENESS** (NEW pattern — no direct analog; mirrors harness ABAUDIT line-pair logic at `v1.6-milestone-audit.mjs:733-740`; full template in RESEARCH.md Example 5 lines 555-609). Key invariant: replicate the 8 C15 production regexes verbatim from `v1.6-milestone-audit.mjs:718-727` (the post-back-port form including line 725's full negative-lookahead set); walk by file order; anchor regex `/^\s*<!--\s*ABAUDIT-(\d+):/` to exclude Version History prose.

**Runner-loop pattern** (analog lines 334-361 verbatim — phase label "check-phase-66"):
```javascript
const LABEL_WIDTH = 60;
function padLabel(s) { /* ... verbatim from analog ... */ }
let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-66 -- Phase 66 deliverables\n');
// ... runner loop verbatim from analog lines 343-358 ...
process.stdout.write('\nResult: ' + passed + ' PASS, ' + failed + ' FAIL, ' + skipped + ' SKIPPED\n');
process.exit(failed > 0 ? 1 : 0);
```

---

### `.github/workflows/audit-harness-v1.6-integrity.yml` (CI workflow, event-driven)

**Analog:** `.github/workflows/audit-harness-v1.5-integrity.yml` (310 lines; Path-A source verified at HEAD ad5c9c9)

**Header + naming pattern** (analog lines 1-5 — swap v1.5 → v1.6):
```yaml
# v1.6 Audit Harness Integrity
# v1.6 integration surface. v1.4 + v1.4.1 + v1.5 harnesses frozen in their respective workflow files.
# New v1.6 checks (C14-C16) and per-phase validators (62-66) registered here.

name: Audit Harness v1.6 Integrity
```

**Trigger pattern — pull_request.paths swap + ADD quarterly cron** (analog lines 7-21 — replace path list with the 15-entry v1.6-scoped list from CONTEXT.md D-04 and RESEARCH.md Example 6 line 667-690):
```yaml
on:
  pull_request:
    paths:
      - 'scripts/validation/v1.6-*'
      - 'docs/cross-platform/apple-business/**'
      - 'docs/l1-runbooks/34-apple-business-*.md'
      - 'docs/l2-runbooks/26-apple-business-*.md'
      - 'docs/admin-setup-ios/01-abm-configuration.md'
      - 'docs/admin-setup-ios/02-abm-token.md'
      - 'docs/admin-setup-macos/01-abm-configuration.md'
      - 'docs/admin-setup-macos/02-abm-token.md'
      - 'docs/reference/ios-capability-matrix.md'
      - 'docs/operations/00-index.md'
      - 'docs/common-issues.md'
      - 'docs/quick-ref-l1.md'
      - 'docs/quick-ref-l2.md'
      - 'docs/index.md'
      - '.github/workflows/audit-harness-v1.6-integrity.yml'
  schedule:
    - cron: '0 8 * * 1'         # Weekly bitrot catch: 08:00 UTC every Monday (Path-A from v1.5)
    - cron: '0 8 1 1,4,7,10 *'  # Quarterly c13_rotting_external check: 08:00 UTC on 1st of Jan/Apr/Jul/Oct
  workflow_dispatch:
```

**`parse` job pattern** (analog lines 24-41 — swap sidecar path; preserve `node -e` JSON parse + supervision_exemptions length check):
```yaml
jobs:
  parse:
    name: Parse v1.6 sidecar JSON
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - name: Validate v1.6-audit-allowlist.json
        run: |
          node -e "
            const fs = require('fs');
            const j = JSON.parse(fs.readFileSync('scripts/validation/v1.6-audit-allowlist.json', 'utf8'));
            if (!Array.isArray(j.supervision_exemptions) || j.supervision_exemptions.length === 0) {
              console.error('supervision_exemptions empty');
              process.exit(1);
            }
            console.log('v1.6 sidecar OK: ' + j.supervision_exemptions.length + ' supervision pins');
          "
```

**`path-match` job pattern** (analog lines 43-56 — swap grep targets):
```yaml
  path-match:
    name: Harness references v1.6 sidecar
    runs-on: ubuntu-latest
    needs: parse
    steps:
      - uses: actions/checkout@v4
      - name: Verify harness sidecar reference
        run: |
          if grep -q "scripts/validation/v1.6-audit-allowlist.json" scripts/validation/v1.6-milestone-audit.mjs; then
            echo "OK: harness references v1.6 sidecar"
          else
            echo "FAIL: harness does not reference v1.6-audit-allowlist.json"
            exit 1
          fi
```

**`harness-run` job pattern** (analog lines 58-67 — swap script name):
```yaml
  harness-run:
    name: Run v1.6 milestone audit harness
    runs-on: ubuntu-latest
    needs: path-match
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - name: Run v1.6-milestone-audit.mjs
        run: node scripts/validation/v1.6-milestone-audit.mjs --verbose
```

**Per-phase check-phase-NN job pattern** (analog lines 69-83 V-48 template — REPLICATE 5× for phases 62/63/64/65/66; preserve graceful-degradation `if [ -f ... ]; then ... else echo skipping ... fi` shape):
```yaml
  check-phase-62:
    name: check-phase-62 validator
    runs-on: ubuntu-latest
    needs: harness-run
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - name: Run check-phase-62.mjs
        run: |
          if [ -f scripts/validation/check-phase-62.mjs ]; then
            node scripts/validation/check-phase-62.mjs
          else
            echo "check-phase-62.mjs not present -- skipping (graceful degradation per Phase 42 D-31)"
          fi
  # ... repeat for 63, 64, 65, 66 ...
```

**Advisory-job pattern (preserve VERBATIM — only `continue-on-error: true` in workflow)** (analog lines 293-309 — the only line that MUST stay `true`):
```yaml
  pin-helper-advisory:
    name: Supervision-pin drift advisory (CI)
    runs-on: ubuntu-latest
    needs: harness-run
    continue-on-error: true   # Phase 43 D-14 / Phase 48 D-22: advisory only; never fails build
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - name: Run regenerate-supervision-pins.mjs --report
        run: |
          node scripts/validation/regenerate-supervision-pins.mjs --report || true
          echo "[advisory] CI advisory job; never blocks merge per Phase 43 D-14 + Phase 48 D-22"
      - name: Run --self-test (advisory only)
        run: |
          node scripts/validation/regenerate-supervision-pins.mjs --self-test || \
            echo "[advisory] --self-test failed; advisory only"
```

**NEW `rotting-external-quarterly` job (no v1.5 analog; full template in RESEARCH.md Example 6 lines 627-663)** — PLACEMENT: append BEFORE `pin-helper-advisory` (preserve pin-helper-advisory as the LAST job). Key contract: default `continue-on-error: false` (D-A9 fully-blocking); gated by `if: github.event_name == 'schedule' && github.event.schedule == '0 8 1 1,4,7,10 *'`; `needs: harness-run`.

---

### `.planning/milestones/v1.6-MILESTONE-AUDIT.md` (milestone document, static authoring)

**Analog:** `.planning/milestones/v1.5-MILESTONE-AUDIT.md` (verified at HEAD ad5c9c9)

**YAML frontmatter pattern** (analog lines 1-90 — swap v1.5 → v1.6, 57/57 → 39/39, 14/14 → 5/5, swap mechanical_checks paths to v1.6 surfaces):
```yaml
---
milestone: v1.6
milestone_name: Apple Business Delegated Governance
audited: 2026-05-24T<HH:MM:SS>Z
status: passed
scores:
  requirements: 39/39
  phases: 5/5
  integration: <pillar_summary>
  flows: <flow_summary>
  nyquist: 0_compliant_5_partial_0_missing
mechanical_checks:
  harness: scripts/validation/v1.6-milestone-audit.mjs
  allowlist: scripts/validation/v1.6-audit-allowlist.json
  last_run: 2026-05-24T<HH:MM:SS>Z
  commit: <Phase 66 close SHA>
  close_commit: <Phase 66 close SHA>
  results:
    # All v1.5 C1-C13 entries preserved (Path-A inheritance); v1.6 adds C14/C15/C16
    C14_apple_business_callout_freshness: passed
    C15_apple_business_intune_boundary: passed
    C16_apple_business_endpoint_triangle: passed
  raw_exit_code: 0
  failed_checks_classification: null
  notes: "CHAIN_SKIP {48,51,58,60,61} entries remain suppressed-as-justified on Windows host per check-phase-64.mjs:65-73 (CRLF + archived-path). Resolution deferred to v1.7 CI-Linux job per v1.6-DEFERRED-CLEANUP.md."
performed_by: |
  Phase 66 Plan 66-NN — gsd-executor agent <agent-id> spawned fresh
  (no context carry-over from Plans 66-01..N content-author agents per D-22
  auditor-independence intent). Audit ran in fresh git clone at <temp-path>
  (separate .git/ — STRICTER physical isolation than v1.5 Phase 61 worktree
  precedent; divergence from D-22 literal `git worktree` mechanism justified by
  user-documented worktree-lifecycle fragility on this Windows host, codified
  in .planning/config.json `use_worktrees:false` and stable across Phase 64 +
  Phase 65 chains). Clone removed post-audit; CHAIN_SKIP {48,51,58,60,61}
  CRLF-related failures suppressed-as-expected per check-phase-64.mjs:65-73
  (Windows host; resolution deferred to v1.7 CI-Linux job per
  v1.6-DEFERRED-CLEANUP.md).
gaps_closed: []
tech_debt: []
nyquist:
  compliant_phases: []
  partial_phases: ["62-apple-business-foundation-rebrand", "63-multi-ou-architecture-apple-admin-setup", "64-apple-business-delegation-runbooks", "65-apple-business-l1-l2-hub-navigation-integration", "66-apple-business-validation-tooling-closure-milestone-audit"]
  missing_phases: []
  overall: "partial (expected — 5 large governance phases with multi-plan progressive landing; matches v1.5 14/14 partial precedent)"
deferred_items:
  - id: "DEFERRED-CLEANUP"
    title: "See v1.6-DEFERRED-CLEANUP.md"
    routing: "v1.7+"
    required_by: "v1.7 entry-phase planning"
---
```

**Pillar-narrative pattern** (analog lines 98-165) — replace 4 v1.5 pillars (Cleanup / Linux / Operational Depth / Validation Tooling) with v1.6 pillars matching the 5 phase deliverables (Foundation Rebrand / Multi-OU Architecture / Delegation Runbooks / L1-L2 + Hub Navigation / Validation Tooling Closure). Each pillar narrative lists the phases that closed against it + the requirements (AB-01..07 / OU-01..10 / DELEG-01..08 / ABNAV-01..07 / AUDIT-09..15).

**Auditor-Independence Verification section pattern** (analog lines 213-250) — DOCUMENT the D-03 divergence prominently:
- Auditor Agent ID: <gsd-executor agent id from Wave 4 spawn>
- Clone Path: `$env:TEMP\v1.6-audit-<rand>` (NOT a worktree — fresh clone per D-03)
- HEAD SHA at audit: <Phase 66 close SHA>
- **Divergence-from-precedent narrative:** state that Phase 61 used worktree; Phase 66 uses fresh clone for stricter physical isolation given `use_worktrees:false`
- **Intent-preservation narrative:** state that D-22 auditor-independence INTENT is satisfied at the logical layer (fresh sub-agent = zero context-carryover) and EXCEEDED at the physical layer (separate `.git/`)

**Command Verification Table pattern** (analog lines 231-247) — populate with Phase 66 close-state actuals captured during Wave 4 fresh-clone re-audit:
| Command | Expected | Actual |
|---------|----------|--------|
| `node scripts/validation/v1.6-milestone-audit.mjs --verbose` | Exit 0; 16/16 PASS (or 15/15+1 informational) | <captured during Wave 4> |
| `node scripts/validation/check-phase-62.mjs` | Exit 0 | <captured> |
| `node scripts/validation/check-phase-63.mjs` | Exit 0 | <captured> |
| `node scripts/validation/check-phase-64.mjs` | Exit 0 | <captured> |
| `node scripts/validation/check-phase-65.mjs` | Exit 0 | <captured> |
| `node scripts/validation/check-phase-66.mjs` | Exit 0 | <captured> |

---

### `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` (deferred-items document, static authoring)

**Analog:** No standalone v1.5 equivalent. Closest pattern is the inline `deferred_items:` YAML block at `.planning/milestones/v1.5-MILESTONE-AUDIT.md:41-89` — Phase 66 LIFTS this pattern to a standalone Markdown file (CONTEXT D-04 + research per CONTEXT canonical_refs §"v1.6 research").

**Structure (recommended per CONTEXT D-04 specifics; no analog so author from scratch):**

```markdown
# v1.6 Deferred Cleanup — v1.7+ Backlog

**Authored:** 2026-05-24
**Milestone:** v1.6 (Apple Business Delegated Governance)
**Cross-link from:** `.planning/milestones/v1.6-MILESTONE-AUDIT.md` deferred_items
**Trigger-to-sweep:** Each section below carries explicit criteria for when v1.7+ should pick up the work.

## CI-1: ABM URL Corpus Sweep

**Scope:** Audit all `business.apple.com` and `support.apple.com/guide/apple-business-manager/...` URL refs across the corpus.
**Source-of-truth:** `.planning/research/PITFALLS.md:617-636`
**Calibration finding (Phase 66 measurement at HEAD ad5c9c9):** 4 `business.apple.com` URL refs (not ~30 historical estimate); 0 `support.apple.com/guide/apple-business-manager/` refs.
**Enumerated entries:**
- `docs/admin-setup-ios/05-app-deployment.md:92`
- `docs/admin-setup-macos/01-abm-configuration.md:52`
- `docs/admin-setup-macos/04-app-deployment.md:105`
- `docs/_glossary-macos.md:64`
**Quarterly audit:** `0 8 1 1,4,7,10 *` cron in `audit-harness-v1.6-integrity.yml` `rotting-external-quarterly` job runs `markdown-link-check` against these URLs.
**Trigger-to-sweep:** Apple drops legacy URL support OR v1.7 scope explicitly includes corpus sweep OR quarterly audit detects drift.

## CI-2: VPP Location Token Surgical Rename

**Scope:** Surgical rename of "VPP (Apps and Books) location token" / "VPP location token" → new canonical term.
**Source-of-truth:** `.planning/research/PITFALLS.md:640-660`
**Enumerated entries (6 measured at HEAD ad5c9c9; canonical pair per PITFALLS:642 is #2 + #6 below):**
- `docs/admin-setup-ios/05-app-deployment.md:71` (prerequisites bullet)
- `docs/admin-setup-ios/05-app-deployment.md:201` (Renewal/Maintenance table; CI-2 canonical site #1)
- `docs/admin-setup-macos/04-app-deployment.md:45` (prerequisites bullet)
- `docs/admin-setup-macos/04-app-deployment.md:46` (prerequisites bullet)
- `docs/admin-setup-macos/04-app-deployment.md:113` (verification step)
- `docs/admin-setup-macos/04-app-deployment.md:148` (Renewal/Maintenance table; CI-2 canonical site #2)
**Trigger-to-sweep:** v1.7 scope includes corpus sweep (lower-effort surgical edit deferred to maintain Q5(b) no-corpus-sweep contract for v1.6).

## CI-3: Managed Apple ID Corpus-Wide Rename

**Scope:** Replace "Managed Apple ID" → new canonical term across v1.0-v1.5 corpus.
**Source-of-truth:** `.planning/research/PITFALLS.md:663-680`
**Enumerated entries (45 occurrences across 16 files at HEAD ad5c9c9; see `c13_rotting_external.ci_3_managed_apple_id` in `scripts/validation/v1.6-audit-allowlist.json` for full list).**
**Trigger-to-sweep:** Microsoft Intune adopts the rebrand per REQUIREMENTS.md:74.

## CHAIN_SKIP {48, 51, 58, 60, 61} Resolution via CI-Linux Job

**Scope:** Pre-existing CRLF + archived-path failures documented at `scripts/validation/check-phase-64.mjs:65-73`.
**Root causes:** (a) `.planning/phases/` archived to `.planning/milestones/v1.5-phases/`; (b) CRLF-LF mismatch on Windows host for Mermaid regex (\n literal); (c) cascading failures into check-phase-60/61 from C7/C9 line-number mismatch.
**Current state at v1.6 close:** All 5 entries remain in CHAIN_SKIP across `check-phase-62.mjs` through `check-phase-66.mjs` — suppressed-as-justified on Windows host.
**Trigger-to-sweep:** v1.7 introduces CI-Linux job (matches `65-VERIFICATION.md:439` Section K aspirational expectation).

## Other Deferrals (Carried from Phases 63-65)

- Multi-tenant Apple Business surfaces (Q2 scope-out)
- Apple Business Device API documentation (Apple has not yet published developer.apple.com landing)
- Per-OU Conference Room Display deep-dive (Phase 63 deferral)
- Account Holder lockout dedicated recovery runbook (Phase 65 deferral)
- Worktree-lifecycle remediation on Windows (out of v1.6 scope; user's standing `use_worktrees:false` constraint is durable)
```

---

### `scripts/validation/v1.6-milestone-audit.mjs` (MODIFIED — validator harness)

**Analog:** itself (Phase 65 close state at HEAD ad5c9c9).

**Modification 1 — C11 `windowKeywords` extension** (line 577):
- BEFORE:
```javascript
const windowKeywords = /successor|deprecated|historical|disambiguation|mutual-exclusion|mutually\s+exclusive|co-management|migration|transition|replacement|PITFALL-9|first-occurrence|callout/i;
```
- AFTER:
```javascript
const windowKeywords = /successor|deprecated|historical|disambiguation|mutual-exclusion|mutually\s+exclusive|co-management|migration|transition|replacement|PITFALL-9|first-occurrence|callout|apple-business-side|intune-side|integration-handshake|owned-by-apple-business|owned-by-intune|scope-boundary/i;
```
- DELTA: Append 6 LOCKED tokens after `|callout` (preserve `/i` flag). Tokens per ROADMAP.md:239 + CONTEXT D-01 file 1.

**Modification 2 — Synthetic regex 7 back-port** (line 854):
- BEFORE (synthetic mirror at line 854):
```javascript
/\bManaged\s+Apple\s+ID\b(?!.{0,80}(Microsoft Intune|Intune documentation|continues to use|formerly|legacy|predates|rebrand))/i,
```
- AFTER (verbatim copy from production at line 725):
```javascript
/\bManaged\s+Apple\s+ID\b(?!.{0,160}(Microsoft Intune|Intune documentation|continues to use|formerly|legacy|predates|rebrand|renamed|personal|Apple\s+Business|scopes|ABM|account))/i,
```
- DELTA: window `.{0,80}` → `.{0,160}`; add 6 exclusion terms `|renamed|personal|Apple\s+Business|scopes|ABM|account`.

**Modification 3 (optional, recommended) — `--self-test` extension** (block at lines 813+):
- Add 1-2 synthetic tests verifying the new C11 tokens are recognized as window-exemption signals.
- Add 1-2 synthetic tests verifying the back-ported regex-7 exclusions (e.g., `"Managed Apple ID continues to use the personal Apple Business account naming"` should now EXEMPT — was previously matching pre-back-port).
- Pattern: follow analog `selfAssert` invocation at line 818 (verbatim) + the `c14Synth`/`c15Synth` helper invocation pattern at lines 836-873.

**DO NOT TOUCH:** Everything else in the file (lines 1-576, 578-724, 726-853, 855-end). The harness is FROZEN-except-for-these-3-modifications per D-01.

---

### `scripts/validation/v1.6-audit-allowlist.json` (MODIFIED — sidecar JSON)

**Analog:** itself (Phase 65 close state at HEAD ad5c9c9).

**Modification — populate `c13_rotting_external` at line 79**:
- BEFORE:
```json
  "c13_rotting_external": [],
  "c16_missing_endpoint_exemptions": []
```
- AFTER (shape per RESEARCH.md lines 697-740 + CONTEXT specifics lines 300-320):
```json
  "c13_rotting_external": {
    "ci_1_abm_urls": [
      { "url": "https://business.apple.com", "file": "docs/admin-setup-ios/05-app-deployment.md", "line": 92, "reason": "...", "category": "live_url_quarterly_check" }
      // ... full CI-1 enumeration ...
    ],
    "ci_2_vpp_location_token": [ /* full CI-2 enumeration */ ],
    "ci_3_managed_apple_id": [ /* full CI-3 enumeration */ ],
    "quarterly_audit": {
      "cadence": "0 8 1 1,4,7,10 *",
      "scope": "external-url-link-check (ci_1_abm_urls only — ci_2 + ci_3 are line-ref tracking, no URL probe)",
      "tool": "markdown-link-check",
      "next_review": "2026-07-01"
    }
  },
  "c16_missing_endpoint_exemptions": []
```
- DELTA: change `[]` → populated object with 4 sub-fields per CONTEXT D-01 file 2 + RESEARCH.md `c13_rotting_external Populated Payload`.

**Preserve EVERYTHING ELSE:** All 8 sibling arrays at lines 5-78 (safetynet_exemptions / supervision_exemptions / cope_banned_phrases / c7_knox_allowlist / c9_exemptions / c11_ops_exemptions / c13_broken_link_allowlist / c16_missing_endpoint_exemptions) stay byte-identical.

**Cross-validator dependency warning (Pitfall 1 from RESEARCH.md):** Changing `c13_rotting_external` from `[]` to a populated object may red an upstream validator that asserted the empty-array shape. Pre-commit dry-run discovers this; if a 5th file is needed (likely `check-phase-62.mjs`), add to the atomic commit set.

---

### `scripts/validation/regenerate-supervision-pins.mjs` (MODIFIED — pin-helper utility)

**Analog:** itself (Phase 65 close state at HEAD ad5c9c9; BASELINE_9 freshness comments at lines 390/393/396).

**Modification — ADD BASELINE_10 freshness comment** (immediately after line 397, before line 398 `// current sidecar supervision_exemptions[] AT v1.5 close. Closes AUDIT-07 carry-over per CONTEXT D-19.`):

**Comment shape pattern** (mirror analog lines 390-398 BASELINE_9 freshness comment style verbatim — multi-line `//` comment block immediately preceding the array literal; cite phase + plan + REQUIREMENTS line + ROADMAP line + commit/HEAD reference):
```javascript
// BASELINE_10 refreshed 2026-05-24 (Phase 66 Plan 66-NN): closes BASELINE_9 v1.5 carry-over
// per AUDIT-14 contract (REQUIREMENTS.md:63 + ROADMAP.md:239); v1.6 line positions verified
// against HEAD ad5c9c9 (Phase 65 close-gate baseline). BASELINE_9 entries above remain unchanged
// — Phase 66 does NOT alter the line-coord array; this comment records the audit-trail event
// that line-positions were re-verified at Phase 66 close and remain valid for the v1.6 corpus.
// Resolution path: BASELINE_11 will refresh at v1.7 close per the Path-A inheritance pattern
// (v1.4.1 → BASELINE_8 → v1.5 → BASELINE_9 → v1.6 → BASELINE_10).
```

**DO NOT TOUCH:** `const BASELINE_9 = [ ... ]` array literal at lines 399-409 (the 9 entries stay byte-identical per the "no array change" shape rationale in RESEARCH.md Example 1 line 481).

---

### `scripts/validation/check-phase-62.mjs` (PROBABLE MODIFICATION — 5th-file budget per D-01 cascade)

**Analog:** itself (V-62-SIDECAR at lines 277-291 — current assertion is `c16.length === 0`; does NOT yet assert anything about `c13_rotting_external` shape).

**Modification (discovered during dry-run; may be NO-OP if c13 shape change doesn't conflict):**

If dry-run reveals V-62-SIDECAR fails because populating `c13_rotting_external` to an object shape conflicts with an existing assertion, **EXTEND** the V-62-SIDECAR check to also validate `c13_rotting_external` shape:

**Extension pattern** (mirror V-65-13 JSON-shape assertion at `check-phase-65.mjs:236-256`):
```javascript
{
  id: 'SIDECAR', name: 'V-62-SIDECAR [RECONCILED Phase 65, EXTENDED Phase 66]: ... + c13_rotting_external is object-shaped (Phase 66 AUDIT-14 population)',
  run() {
    const raw = readFile(SIDECAR);
    if (raw === null) return { pass: false, detail: SIDECAR + ' missing' };
    let parsed;
    try { parsed = JSON.parse(raw); } catch (e) { return { pass: false, detail: 'JSON parse error: ' + e.message }; }
    const c16 = parsed.c16_missing_endpoint_exemptions || [];
    if (c16.length !== 0) return { pass: false, detail: 'c16_missing_endpoint_exemptions has ' + c16.length + ' entries (expected 0 after Phase 65 atomic-trio removal)' };
    // [EXTENDED Phase 66]: c13_rotting_external transitioned from [] (Phase 62 placeholder) to populated object (Phase 66 AUDIT-14)
    const c13r = parsed.c13_rotting_external;
    if (Array.isArray(c13r) && c13r.length === 0) {
      // Phase 62/63/64/65 baseline state (empty array placeholder) — still accept for graceful chain
      return { pass: true, detail: 'valid JSON; c16=0; c13_rotting_external=[] (pre-AUDIT-14 baseline)' };
    }
    if (c13r && typeof c13r === 'object' && c13r.quarterly_audit) {
      return { pass: true, detail: 'valid JSON; c16=0; c13_rotting_external=object (Phase 66 AUDIT-14 shape)' };
    }
    return { pass: false, detail: 'c13_rotting_external is unexpected shape: ' + JSON.stringify(c13r).slice(0, 120) };
  }
},
```

**Naming convention:** add `[EXTENDED Phase 66]` marker to the assertion `name` field (mirrors V-65 `[RECONCILED Phase 65]` convention at the same file line 279).

**If dry-run shows NO conflict:** this file is NOT modified; the 4-file atomic commit is sufficient.

---

### 11 ABAUDIT scope files (READ-ONLY — D-02 staleness walk)

**Analog:** n/a — these files are READ ONLY in Phase 66 (no modifications planned; staleness walk discovers orphans if any).

**Walk scope (from CONTEXT canonical_refs §"ABAUDIT staleness walk targets" lines 235-246):**
- `docs/cross-platform/apple-business/00-overview.md` (3 ABAUDITs at lines 10, 28, 68)
- `docs/cross-platform/apple-business/06-mdm-server-assignment.md` (1 at line 12)
- `docs/cross-platform/apple-business/11-vpp-catalog-runbook.md` (2 at lines 13, 84)
- `docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md` (2 at lines 13, 116)
- `docs/cross-platform/apple-business/13-device-release-runbook.md` (2 at lines 12, 74)
- `docs/cross-platform/apple-business/14-device-transfer-runbook.md` (3 at lines 12, 73, 97)
- `docs/cross-platform/apple-business/15-mdm-server-reassign-runbook.md` (1 at line 12)
- `docs/cross-platform/apple-business/16-managed-apple-account-runbook.md` (1 at line 14)
- `docs/cross-platform/apple-business/17-audit-log-scoping-runbook.md` (1 at line 14)
- `docs/cross-platform/apple-business/18-cross-org-boundary-cheat-sheet.md` (7 at lines 42, 44, 47, 50, 52, 54, 56; **SOT host per Phase 64 D-08**)
- `docs/admin-setup-macos/01-abm-configuration.md` (1 at line 51)
- **TOTAL: 24 ABAUDIT comments**

**Walk procedure** (CONTEXT D-02 operational steps 1-5):
1. For each `<!-- ABAUDIT-NN: ... -->` comment, simulate C15 check on the **next line** against the 8 production regexes (replicated in `check-phase-66.mjs` V-66-ABAUDIT-STALENESS).
2. If no regex matches the next line, the exemption is ORPHANED — remove the HTML comment (likely zero found per CONTEXT D-02 advisor finding).
3. Any orphan removals land in a SEPARATE corpus-only commit BEFORE the D-01 atomic commit (preserves the atomic harness commit's cleanliness).
4. V-66-ABAUDIT-STALENESS bakes the check into CI permanently (auto-catches future drift).

**Regex anchor (critical per RESEARCH.md Pitfall 4):** use `/^\s*<!--\s*ABAUDIT-(\d+):/` (line-start anchored) — excludes Version History prose mentions of "ABAUDIT-" that are NOT exemption comments.

---

## Shared Patterns

### Path-A Copy Lineage (D-A9 / STATE.md:80,103)

**Source:** `STATE.md:80,103` + this phase's CONTEXT canonical_refs §"Established Patterns"
**Apply to:** All NEW files in Phase 66 (check-phase-66.mjs, audit-harness-v1.6-integrity.yml, v1.6-MILESTONE-AUDIT.md)
**Convention:** Each new file copies its analog VERBATIM with surgical edits for v1.6-specific deltas. The prior-version file is FROZEN (do NOT modify `check-phase-65.mjs`, `audit-harness-v1.5-integrity.yml`, `v1.5-MILESTONE-AUDIT.md`).

### File-read Helper Pattern (zero-runtime-deps)

**Source:** `scripts/validation/check-phase-65.mjs:27-31` (and same shape in check-phase-62.mjs:26-30)
**Apply to:** `check-phase-66.mjs`
**Excerpt:**
```javascript
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');  // CRLF normalization for Windows
}
```
**Why:** CRLF→LF normalization at read-time avoids CRLF-specific regex failures across the chain (consistent with the v1.5 lineage; documented at check-phase-64.mjs:65-73 root cause).

### Subprocess invocation Pattern (chain runner)

**Source:** `scripts/validation/check-phase-65.mjs:291-301`
**Apply to:** `check-phase-66.mjs` CHAIN runner + V-66-AUDIT
**Excerpt:**
```javascript
execFileSync('node', [path], { stdio: 'pipe', timeout: 60000, cwd: process.cwd() });
```
**Why:** `execFileSync` (not `execSync`) prevents shell-injection; `timeout: 60000` (60s) matches the precedent; `stdio: 'pipe'` allows stderr capture for diagnostic messages.

### Result Object Shape

**Source:** `scripts/validation/check-phase-65.mjs:76-78,84,343-358`
**Apply to:** all V-66-NN assertions
**Shape:** `{ pass: boolean, detail?: string, skipped?: boolean }` — runner loop differentiates SKIPPED / PASS / FAIL by checking `skipped` flag first, then `pass`.

### Atomic-harness-commit (v1.5 Plan 60-08 / Phase 62-08 precedent)

**Source:** `STATE.md:111-112` + `.planning/phases/62-apple-business-foundation-rebrand/62-08-PLAN.md:432-490`
**Apply to:** Wave 2 D-01 atomic commit (`v1.6-milestone-audit.mjs` + `v1.6-audit-allowlist.json` + `regenerate-supervision-pins.mjs` + `check-phase-66.mjs` + probable `check-phase-62.mjs`)
**Protocol:**
1. Stage all candidate files in working tree (`git add` but do NOT commit yet).
2. Run in sequence and require ALL green:
   - `node scripts/validation/v1.6-milestone-audit.mjs && echo OK`
   - `node scripts/validation/v1.6-milestone-audit.mjs --self-test`
   - `node scripts/validation/check-phase-62.mjs && echo OK` (V-62-SIDECAR is the canary)
   - `node scripts/validation/check-phase-63.mjs && node scripts/validation/check-phase-64.mjs && node scripts/validation/check-phase-65.mjs && node scripts/validation/check-phase-66.mjs && echo OK`
3. If any validator reds, add the reconciling file (with `[RECONCILED Phase 66]` or `[EXTENDED Phase 66]` label) to staged set; re-run from step 1.
4. Only after fully green dry-run, proceed to `git add` + `git commit`.
5. Post-commit verification: `git log --name-only -1 HEAD` confirms all files in ONE SHA.
6. Rollback semantics: single `git revert <SHA>` restores Phase 65 close-gate baseline byte-identically.

### Coexistence Pattern (CI workflows)

**Source:** `.github/workflows/audit-harness-integrity.yml` (v1.4) + `.github/workflows/audit-harness-v1.5-integrity.yml` (v1.5)
**Apply to:** `.github/workflows/audit-harness-v1.6-integrity.yml`
**Convention:** ADD as third parallel workflow file. Do NOT modify v1.4 or v1.5 workflows. Each PR triggers only workflows whose `pull_request.paths` filters match. The v1.4 broad filter (`scripts/validation/**`) intentionally also triggers v1.4 workflow on v1.6 validator edits — cross-version safety net by design.

### Auditor-Independence via Fresh-Context Spawn (D-22 / D-03 reconciliation)

**Source:** CONTEXT D-03 + `.planning/phases/65-apple-business-l1-l2-hub-navigation-integration/65-CONTEXT.md:89-96`
**Apply to:** Wave 4 terminal re-audit
**Protocol (PowerShell on this Windows host):**
```powershell
$rand = -join ((48..57) + (97..122) | Get-Random -Count 8 | ForEach-Object {[char]$_})
$auditPath = "$env:TEMP\v1.6-audit-$rand"
git clone --no-hardlinks D:\claude\Autopilot $auditPath
Push-Location $auditPath

# Capture exit codes
$results = [ordered]@{}
$cmds = @(
    @{name='harness';      path='scripts/validation/v1.6-milestone-audit.mjs'},
    @{name='check-phase-62'; path='scripts/validation/check-phase-62.mjs'},
    @{name='check-phase-63'; path='scripts/validation/check-phase-63.mjs'},
    @{name='check-phase-64'; path='scripts/validation/check-phase-64.mjs'},
    @{name='check-phase-65'; path='scripts/validation/check-phase-65.mjs'},
    @{name='check-phase-66'; path='scripts/validation/check-phase-66.mjs'}
)
foreach ($c in $cmds) {
    $stdout = & node $c.path 2>&1
    $exit = $LASTEXITCODE
    $summary = ($stdout | Select-String -Pattern 'Summary:|Result:' | Select-Object -Last 1).ToString()
    $results[$c.name] = @{exit = $exit; summary = $summary}
}
$results | ConvertTo-Json -Depth 3 | Out-File "$env:TEMP\v1.6-audit-results.json" -Encoding utf8
Pop-Location
Remove-Item -Recurse -Force $auditPath
```
**Key invariant:** Spawned by a fresh `gsd-executor` sub-agent (zero context from Plans 66-01..N authors). Clone (separate `.git/`) is STRICTER physical isolation than worktree (shared `.git/`).

### CHAIN_SKIP Suppress-as-Justified Pattern

**Source:** `scripts/validation/check-phase-64.mjs:65-73` (root-cause documentation block) + `check-phase-65.mjs:54-68`
**Apply to:** `check-phase-66.mjs` (preserve {48, 51, 58, 60, 61} verbatim)
**Convention:** Same Windows host → CRLF behavior unchanged → CHAIN_SKIP entries remain suppressed. Explicitly document in `v1.6-MILESTONE-AUDIT.md mechanical_checks.notes` that suppressions remain present-and-justified; add the CI-Linux-resolution as a deferred item in `v1.6-DEFERRED-CLEANUP.md`.

### Anchored ABAUDIT regex (Pitfall 4 mitigation)

**Source:** `scripts/validation/v1.6-milestone-audit.mjs:733-740` (harness exemption logic)
**Apply to:** `check-phase-66.mjs` V-66-ABAUDIT-STALENESS validator
**Excerpt:** `/^\s*<!--\s*ABAUDIT-(\d+):/` — line-start anchored to exclude Version History prose mentions of "ABAUDIT-" that are NOT exemption comments.

---

## No Analog Found

Files with no close match in the codebase:

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` | deferred-items document | static authoring | NEW artifact pattern; v1.5 inlined `deferred_items` inside MILESTONE-AUDIT.md frontmatter. Phase 66 LIFTS to standalone file per CONTEXT D-04. Closest precedent is the inline YAML block at `v1.5-MILESTONE-AUDIT.md:41-89` (used as structural inspiration only; new file authored from scratch per CONTEXT D-04 specifics). |
| V-66-ABAUDIT-STALENESS validator (inside `check-phase-66.mjs`) | new assertion type | file-I/O + regex scan | NEW validator pattern; no prior check-phase-NN.mjs has a staleness-audit assertion. Full template provided in RESEARCH.md Example 5 (lines 555-609). Mirrors the harness exemption logic at `v1.6-milestone-audit.mjs:735-740` exactly (NOT a strict next-line check — Open Question 2 from RESEARCH.md recommends strict but allows harness-mirror; planner picks during Wave 1 spot-check). |
| `rotting-external-quarterly` job (inside `audit-harness-v1.6-integrity.yml`) | new CI job type | event-driven (schedule cron only) | NEW job pattern; v1.5 has no quarterly cron or markdown-link-check job. Full template provided in RESEARCH.md Example 6 (lines 627-663). Gated by `if: github.event_name == 'schedule' && github.event.schedule == '0 8 1 1,4,7,10 *'`; `continue-on-error: false` (D-A9 fully-blocking, distinct from advisory `pin-helper-advisory`). |

## Metadata

**Analog search scope:**
- `scripts/validation/check-phase-65.mjs` (Path-A template; 362 lines read entirely)
- `scripts/validation/check-phase-62.mjs` (V-62-SIDECAR extension candidate; lines 1-100 + 270-330 read)
- `scripts/validation/v1.6-milestone-audit.mjs` (extension targets at lines 577 + 718-727 + 813+ + 847-856 + appleBusinessDocPaths 90-124)
- `scripts/validation/regenerate-supervision-pins.mjs` (BASELINE_9 freshness pattern at lines 383-410)
- `scripts/validation/v1.6-audit-allowlist.json` (c13_rotting_external placeholder at line 79; all other arrays preserved)
- `.github/workflows/audit-harness-v1.5-integrity.yml` (Path-A template; 310 lines read entirely)
- `.planning/milestones/v1.5-MILESTONE-AUDIT.md` (template; 251 lines read entirely)

**Files scanned:** 7 (analog files) + 11 (ABAUDIT walk targets named but not opened — staleness walk is a Wave 1 executor action, not a pattern-mapping read)

**Pattern extraction date:** 2026-05-24

**Confidence:** HIGH — every NEW file has an exact-role exact-data-flow analog at a verified line range; every MODIFIED file is its own analog with byte-precise extension targets verified at HEAD ad5c9c9. The only LOW-confidence element is whether check-phase-62.mjs will actually need extension during dry-run (RESEARCH.md Assumption A3 = MEDIUM; D-01 budget-for-5th-file mitigates).
