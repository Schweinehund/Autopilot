# Phase 95: Harness Lineage Bump + Terminal Re-Audit + Milestone Close — Pattern Map

**Mapped:** 2026-06-26
**Files analyzed:** 7 new/modified files (Atoms 1+2 + close-gate)
**Analogs found:** 7 / 7

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `scripts/validation/v1.12-milestone-audit.mjs` | validator (leaf, frozen harness) | batch | `scripts/validation/v1.11-milestone-audit.mjs` | exact (Path-A, 4-line edit) |
| `scripts/validation/v1.12-audit-allowlist.json` | config/sidecar | batch | `scripts/validation/v1.11-audit-allowlist.json` | exact (Path-A, 3-field reset) |
| `scripts/validation/check-phase-95.mjs` | validator (chain-apex) | event-driven (subprocess chain) | `scripts/validation/check-phase-93.mjs` | exact (Path-A, CHAIN_PHASES + phase labels) |
| `scripts/validation/check-phase-94.mjs` | validator (leaf, PRESENCE+SELF+CONTENT) | batch | `scripts/validation/check-phase-84.mjs` (base shape) + `scripts/validation/check-phase-92.mjs` (content-needle FORM) | role-match composite |
| `scripts/validation/_lib/frozen-at-close.mjs` | utility (frozen-SHA reader) | request-response | self (modify existing; V110 entry is the direct prior entry) | exact (additive edit) |
| `scripts/validation/regenerate-supervision-pins.mjs` | utility (pin refresher) | batch | self (modify existing; BASELINE_15 comment is the direct prior) | exact (comment-only insert) |
| `.github/workflows/audit-harness-v1.12-integrity.yml` | CI config | event-driven (GitHub Actions) | `.github/workflows/audit-harness-v1.11-integrity.yml` | exact (Path-A, version label + job substitutions) |

---

## Pattern Assignments

### `scripts/validation/v1.12-milestone-audit.mjs` (validator, batch)

**Analog:** `scripts/validation/v1.11-milestone-audit.mjs`
**Atom:** 1 (COMMIT 2)
**Strategy:** Verbatim Path-A copy with exactly 4 line edits. Line count stays 979. No C17 added.

**Header block** (analog lines 1–4 — the only 4 lines that change):
```javascript
// v1.12 Milestone Audit Harness (Path A copy of v1.11; lineage v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7 → v1.8 → v1.9 → v1.10 → v1.11 → v1.12; C1-C16 inherited verbatim)
// Source of truth: .planning/phases/70-v1-7-audit-harness-lineage-bump-milestone-close-pillar-d-clo/70-CONTEXT.md (D-01..D-04)
// Sidecar allow-list: scripts/validation/v1.12-audit-allowlist.json (v1.12 Path-A from v1.11 with c13_rotting_external carried for v1.12 per Phase 95 close-state)
// Frozen-predecessor reproducibility anchor: v1.6-milestone-audit.mjs pinned at Phase 66 close
```

**Sidecar repoint** (analog line 79 — functional, load-bearing):
```javascript
const raw = readFile('scripts/validation/v1.12-audit-allowlist.json');
```

**Usage comment** (analog line 35):
```javascript
// Usage: node scripts/validation/v1.12-milestone-audit.mjs [--verbose] [--self-test]
```

**Precise diff (v1.11 → v1.12) — all 4 changes:**

| Analog line | v1.11 text | v1.12 replacement |
|-------------|------------|-------------------|
| 2 | `v1.11 Milestone Audit Harness (Path A copy of v1.10; lineage … → v1.10 → v1.11; C1-C16 inherited verbatim)` | `v1.12 Milestone Audit Harness (Path A copy of v1.11; lineage … → v1.11 → v1.12; C1-C16 inherited verbatim)` |
| 4 | `v1.11-audit-allowlist.json (v1.11 Path-A from v1.10 … per Phase 93 close-state)` | `v1.12-audit-allowlist.json (v1.12 Path-A from v1.11 … per Phase 95 close-state)` |
| 35 | `node scripts/validation/v1.11-milestone-audit.mjs [--verbose] [--self-test]` | `node scripts/validation/v1.12-milestone-audit.mjs [--verbose] [--self-test]` |
| 79 | `readFile('scripts/validation/v1.11-audit-allowlist.json')` | `readFile('scripts/validation/v1.12-audit-allowlist.json')` |

**Lines that MUST NOT change:**
- Line 5: frozen-predecessor anchor (`v1.6-milestone-audit.mjs pinned at Phase 66 close`) — byte-unchanged
- Line 90: Apple Business doc paths — byte-unchanged
- The `checks` array — stays exactly 15 entries (C1–C16 is 15 checks; no new C17)

---

### `scripts/validation/v1.12-audit-allowlist.json` (config/sidecar, batch)

**Analog:** `scripts/validation/v1.11-audit-allowlist.json`
**Atom:** 1 (COMMIT 2)
**Strategy:** Verbatim Path-A copy with exactly 3 header field changes + c13 reset for v1.12.

**Header fields to update** (analog lines 2–4):
```json
{
  "schema_version": "1.1",
  "generated": "2026-06-26T00:00:00Z",
  "phase": "95-harness-lineage-bump-terminal-re-audit-milestone-close",
```

**Fields carried verbatim (DO NOT CHANGE):**
- All `safetynet_exemptions` array entries (4 entries) — byte-unchanged
- All `supervision_exemptions` array entries (15 entries) — byte-unchanged. **C13 hard-asserts exact count of 15.**
- All `cope_banned_phrases` entries
- All `c7_knox_allowlist` entries
- All `c9_exemptions` entries
- `c13_broken_link_allowlist` — 15 entries (6 `transient_external` + 9 `template_placeholder`) — byte-unchanged
- `c13_rotting_external` block (`ci_1_abm_urls`, `ci_2_vpp_location_token`, `ci_3_managed_apple_id`) — carried verbatim for v1.12
- `quarterly_audit.cadence`, `quarterly_audit.scope`, `quarterly_audit.tool` — byte-unchanged
- `quarterly_audit.next_review`: `"2027-01-01"` — carry unchanged
- `c16_missing_endpoint_exemptions`: `[]` — carry empty

**Precise diff (v1.11 → v1.12) — exactly 3 field changes:**

| Field | v1.11 value | v1.12 value |
|-------|-------------|-------------|
| `"generated"` | `"2026-06-25T00:00:00Z"` | `"2026-06-26T00:00:00Z"` |
| `"phase"` | `"93-harness-lineage-bump-terminal-re-audit-milestone-close"` | `"95-harness-lineage-bump-terminal-re-audit-milestone-close"` |
| (implicit) sidecar filename itself | `v1.11-audit-allowlist.json` | `v1.12-audit-allowlist.json` |

---

### `scripts/validation/check-phase-95.mjs` (validator, chain-apex, subprocess-chain)

**Analog:** `scripts/validation/check-phase-93.mjs` (verbatim Path-A)
**Atom:** 2 (COMMIT 3)
**Strategy:** Path-A copy substituting phase number 93→95 throughout, updating CHAIN_PHASES and HARNESS reference, updating V-NN labels. CHAIN_PHASES must be `[48..94]` (47 entries) per D-01.

**File header** (analog lines 1–21 with substitutions):
```javascript
#!/usr/bin/env node
// check-phase-95.mjs -- Phase 95 deliverables (v1.12 Audit Harness Lineage Bump + Terminal Re-Audit + Milestone Close)
//
// Chain-apex of v1.12 -- HARN-02. Ships the v1.12 chain-apex validator: CHAIN_PHASES=[48..94]
// (every integer 48 through 94), HARNESS repointed to v1.12-milestone-audit.mjs. Path-A from
// check-phase-93.mjs with the same corpus-rename-proof assertions DROPPED (v1.12 has NO
// corpus rename, so those have no v1.12 analog). The apex carries AUDIT + CHAIN(48..94) +
// AUDIT-HARNESS + SELF only. V-95-SELF uses the richer dual-invariant form (check-phase-71 shape):
// asserts 95 not in CHAIN_PHASES AND CHAIN_SKIP.size === 0.
// Source of truth: .planning/phases/95-harness-lineage-bump-terminal-re-audit-milestone-close/95-02-PLAN.md
//
// Assertion classes:
//   V-95-AUDIT           95-VERIFICATION.md heading-presence (SKIP-PASS until Plan 95-04 lands)
//   V-95-CHAIN-{48..94}  47 subprocesses; each check-phase-{N}.mjs exits 0 (NESTED-aware)
//   V-95-AUDIT-HARNESS   scripts/validation/v1.12-milestone-audit.mjs exits 0 (current-milestone harness)
//   V-95-SELF            CHAIN_PHASES does NOT include 95 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Lineage: Path-A from check-phase-93.mjs (Plan 93-02); corpus-rename-proof assertions dropped (no v1.12 rename).
//
// Usage: node scripts/validation/check-phase-95.mjs [--verbose]
// Exit code: 0 if all PASS or SKIPPED; 1 if any FAIL.
```

**HARNESS constant** (analog line 38):
```javascript
const HARNESS = 'scripts/validation/v1.12-milestone-audit.mjs';
```

**CHAIN_PHASES** (analog line 41 — extended from [48..92] to [48..94], D-01 correction):
```javascript
// Phase 95 chain-apex extends the chain through Phase 94 (every integer 48..94).
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94];
```

**CHAIN_SKIP** (analog line 44 — carry verbatim):
```javascript
// CHAIN_SKIP topology: empty per Phase 68 7b635ca invariant -- no entries to suppress (D-03 / SC#2).
const CHAIN_SKIP = new Set([]);
```

**NESTED guard** (analog line 71 — carry verbatim):
```javascript
const NESTED = process.env.CHECK_PHASE_NESTED === '1';
```

**V-95-AUDIT check** (analog lines 48–64, substituting 93→95 and archive path):
```javascript
checks.push({
  id: 'AUDIT',
  name: 'V-95-AUDIT: 95-VERIFICATION.md exists and contains Phase 95 verification heading',
  run() {
    const verifPath = resolveArchivedPhasePath(
      '95-harness-lineage-bump-terminal-re-audit-milestone-close/95-VERIFICATION.md',
      ['v1.12-phases']
    );
    const verif = verifPath ? readFile(verifPath) : null;
    if (!verif) return { pass: true, skipped: true, detail: '95-VERIFICATION.md not yet authored (PASS-via-skip until Plan 95-04 lands)' };
    if (!/Phase 95/i.test(verif)) {
      return { pass: false, detail: '95-VERIFICATION.md missing "Phase 95" section heading' };
    }
    return { pass: true, detail: '95-VERIFICATION.md exists with Phase 95 verification content' };
  }
});
```

**V-95-CHAIN loop** (analog lines 72–106, substituting 93→95 in labels):
```javascript
for (const phaseNum of CHAIN_PHASES) {
  if (CHAIN_SKIP.has(phaseNum)) continue;
  checks.push({
    id: `CHAIN-${phaseNum}`,
    name: `V-95-CHAIN-${phaseNum}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
    run() {
      if (NESTED) {
        return { pass: true, skipped: true, detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip recursive chain-guard expansion' };
      }
      // ... (rest verbatim from analog lines 81-105, no substitutions needed)
    }
  });
}
```

**V-95-AUDIT-HARNESS check** (analog lines 108–128, substituting v1.11→v1.12 and 93→95):
```javascript
checks.push({
  id: 'AUDIT-HARNESS',
  name: 'V-95-AUDIT-HARNESS: v1.12-milestone-audit.mjs exits 0 (current-milestone harness)',
  run() {
    if (!existsSync(join(process.cwd(), HARNESS))) {
      return { pass: true, skipped: true, detail: HARNESS + ' not present (graceful skip)' };
    }
    try {
      execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
      return { pass: true, detail: 'v1.12-milestone-audit.mjs exits 0 (current-milestone harness)' };
    } catch (err) {
      // ... (error handling verbatim from analog)
    }
  }
});
```

**V-95-SELF dual-invariant guard** (analog lines 130–144, substituting 93→95):
```javascript
checks.push({
  id: 'SELF',
  name: 'V-95-SELF: CHAIN_PHASES does NOT include 95; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(95)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 95 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (95 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});
```

**Runner loop + console label** (analog lines 146–173, substituting 93→95):
```javascript
console.log('check-phase-95 -- Phase 95 deliverables (v1.12 Audit Harness Lineage Bump + Terminal Re-Audit + Milestone Close)\n');
```

**Precise diff summary (check-phase-93 → check-phase-95):**

| Location | v1.11/93 text | v1.12/95 replacement |
|----------|---------------|----------------------|
| Line 2 (filename comment) | `check-phase-93.mjs` | `check-phase-95.mjs` |
| Line 4 (CHAIN range) | `CHAIN_PHASES=[48..92]` | `CHAIN_PHASES=[48..94]` |
| Line 8–9 (SELF description) | `asserts 93 not in CHAIN_PHASES` | `asserts 95 not in CHAIN_PHASES` |
| Line 10 (source of truth) | `93-02-PLAN.md` | `95-02-PLAN.md` |
| Lines 13–16 (assertion classes) | `V-93-*`, `45 subprocesses`, `v1.11-*` | `V-95-*`, `47 subprocesses`, `v1.12-*` |
| Line 38 (HARNESS) | `v1.11-milestone-audit.mjs` | `v1.12-milestone-audit.mjs` |
| Line 41 (CHAIN_PHASES) | `[48,…,92]` (45 entries) | `[48,…,94]` (47 entries) |
| All `V-93-*` labels | `V-93-AUDIT`, `V-93-CHAIN-NN`, etc. | `V-93-AUDIT`, `V-95-CHAIN-NN`, etc. — **NOTE: V-93-AUDIT-HARNESS in the loop becomes V-95-AUDIT-HARNESS** |
| Line 53–56 (resolveArchivedPhasePath) | `93-harness…/93-VERIFICATION.md`, `['v1.11-phases']` | `95-harness…/95-VERIFICATION.md`, `['v1.12-phases']` |
| Line 154 (console.log label) | `check-phase-93 -- Phase 93 deliverables (v1.11 …)` | `check-phase-95 -- Phase 95 deliverables (v1.12 …)` |

---

### `scripts/validation/check-phase-94.mjs` (validator, leaf, PRESENCE+SELF+CONTENT)

**Base shape analog:** `scripts/validation/check-phase-84.mjs` (PRESENCE + SELF structure)
**Content-needle FORM analog:** `scripts/validation/check-phase-92.mjs` (the `{id,file,needle}` array + loop)
**Atom:** 2 (COMMIT 3)
**Strategy:** Start from check-phase-84.mjs base shape; splice in the check-phase-92.mjs `{id,file,needle}` FORM for the 5 V-94-CONTENT checks; substitute phase 84→94 throughout. NO chain (leaf validator).

**File header** (from check-phase-84.mjs lines 1–22 adapted):
```javascript
#!/usr/bin/env node
// check-phase-94.mjs -- Phase 94 deliverables (Post-Migration Verification Content Closure — MIGV-01/02/03)
//
// v1.12 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-95.mjs)
// PLUS the V-94-CONTENT-* 5-needle hard-asserts (Phase 95 D-02). Phase 94 only PATCHED
// docs/macos-lifecycle/02-mdm-migration-psso.md (pre-existing v1.11 file); bare PRESENCE is trivially
// green on old bytes. The 5 content needles are the durable recurring CI net for MIGV-01/02/03.
// Hard-assert all 5 (no allowlist / no sidecar -- mirrors C16's empty c16_missing_endpoint_exemptions: []).
//
// Assertion classes:
//   V-94-PRESENCE           docs/macos-lifecycle/02-mdm-migration-psso.md exists + non-empty
//   V-94-CONTENT-URLS-IRU   support.iru.io present in target file
//   V-94-CONTENT-URLS-KANDJI support.kandji.io present in target file
//   V-94-CONTENT-DOCS-IRU   docs.iru.com present in target file
//   V-94-CONTENT-MIGV03     Supervision status (MEDIUM confidence) present in target file
//   V-94-CONTENT-MIGV01     learn.microsoft.com present in target file
//   V-94-SELF               CHAIN_PHASES does NOT include 94 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Lineage: Path-A structural shell from check-phase-84.mjs + {id,file,needle} FORM from check-phase-92.mjs.
//
// Usage: node scripts/validation/check-phase-94.mjs [--verbose]
// Exit code: 0 if all PASS or SKIPPED; 1 if any FAIL.
```

**Imports + setup** (from check-phase-84.mjs lines 19–35, verbatim):
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

// Lightweight: NO chain (chain lives only in apex check-phase-95.mjs).
const CHAIN_PHASES = [];
// CHAIN_SKIP topology: empty per Phase 68 7b635ca invariant -- no entries to suppress.
const CHAIN_SKIP = new Set([]);
```

**DELIVERABLE constant** (new for 94):
```javascript
// Phase 94 headline deliverable (Post-Migration Verification — patched guide).
const DELIVERABLE = 'docs/macos-lifecycle/02-mdm-migration-psso.md';
```

**Content-needle array** (FORM from check-phase-92.mjs lines 46–55, adapted):
```javascript
// === The 5 MIGV content-needle assertions (D-02; verbatim from 95-RESEARCH.md + 94-VERIFICATION.md grep-counts) ===
// Each (id, file, needle) triple: assert forward-slash needle is present in the source file.
// CRLF-normalized read (readFile already does .replace(/\r\n/g,'\n')) makes substring needles Windows-safe.
// Hard-assert -- NO allowlist (mirrors C16 empty c16_missing_endpoint_exemptions: []).
const CONTENT_NEEDLES = [
  { id: 'URLS-IRU',    file: DELIVERABLE, needle: 'support.iru.io' },
  { id: 'URLS-KANDJI', file: DELIVERABLE, needle: 'support.kandji.io' },
  { id: 'DOCS-IRU',    file: DELIVERABLE, needle: 'docs.iru.com' },
  { id: 'MIGV03',      file: DELIVERABLE, needle: 'Supervision status (MEDIUM confidence)' },
  { id: 'MIGV01',      file: DELIVERABLE, needle: 'learn.microsoft.com' },
];
```

**V-94-PRESENCE check** (from check-phase-84.mjs lines 42–52, substituting 84→94):
```javascript
const checks = [];

// === V-94-PRESENCE: phase headline deliverable exists + non-empty ===
checks.push({
  id: 'PRESENCE',
  name: 'V-94-PRESENCE: ' + DELIVERABLE + ' exists and is non-empty',
  run() {
    const c = readFile(DELIVERABLE);
    if (c === null) return { pass: false, detail: DELIVERABLE + ' missing' };
    if (c.trim().length === 0) return { pass: false, detail: DELIVERABLE + ' is empty' };
    return { pass: true, detail: DELIVERABLE + ' present (' + c.length + ' bytes)' };
  }
});
```

**V-94-CONTENT loop** (FORM from check-phase-92.mjs lines 63–74, adapted):
```javascript
// === V-94-CONTENT-*: 5 MIGV needle assertions (D-02; no allowlist) ===
// Generated check IDs (for static auditability / greppability of all 5 needle IDs):
//   CONTENT-URLS-IRU CONTENT-URLS-KANDJI CONTENT-DOCS-IRU CONTENT-MIGV03 CONTENT-MIGV01
for (const e of CONTENT_NEEDLES) {
  checks.push({
    id: `CONTENT-${e.id}`,
    name: `V-94-CONTENT-${e.id}: ${e.file} contains needle "${e.needle}"`,
    run() {
      const c = readFile(e.file);              // readFile CRLF-normalizes (.replace(/\r\n/g,'\n'))
      if (c === null) return { pass: false, detail: e.file + ' missing' };
      if (!c.includes(e.needle)) return { pass: false, detail: `${e.id} needle absent: ${e.needle}` };
      return { pass: true, detail: `${e.id} needle present (${e.needle})` };
    }
  });
}
```

**V-94-SELF check** (from check-phase-84.mjs lines 54–68, substituting 84→94):
```javascript
// === V-94-SELF: dual-invariant guard (CHAIN_PHASES excludes 94; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-94-SELF: CHAIN_PHASES does NOT include 94; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(94)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 94 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (94 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});
```

**Runner loop + console label** (from check-phase-84.mjs lines 70–97, substituting 84→94):
```javascript
// === Runner loop (verbatim pattern from check-phase-71.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) { /* verbatim */ }

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-94 -- Phase 94 deliverables (Post-Migration Verification Content Closure — MIGV-01/02/03)\n');
// for loop + process.exit verbatim from check-phase-84.mjs lines 79-97
```

**Expected result:** 7 PASS / 0 FAIL / 0 SKIP on both platforms (V-94-PRESENCE + 5 × V-94-CONTENT-* + V-94-SELF).

**Verified needle strings (from 95-RESEARCH.md Verification Target 4 — all confirmed present):**

| id | needle | grep-c in target file |
|----|--------|-----------------------|
| `URLS-IRU` | `support.iru.io` | 5 |
| `URLS-KANDJI` | `support.kandji.io` | 6 |
| `DOCS-IRU` | `docs.iru.com` | 6 |
| `MIGV03` | `Supervision status (MEDIUM confidence)` | 1 |
| `MIGV01` | `learn.microsoft.com` | 1 |

**CRITICAL: needle casing is case-sensitive.** Use `Supervision status (MEDIUM confidence)` with capital S — verified verbatim.

---

### `scripts/validation/_lib/frozen-at-close.mjs` (utility, additive edit)

**Analog:** self — V110 entry (lines 31–33) and readAtV110Close export (line 66) are the direct prior-entry pattern
**Atom:** 2 (COMMIT 3)
**Strategy:** Two additive inserts only. No other lines change.

**Existing V110 entry** (lines 31–33, the direct prior entry to copy):
```javascript
  V110: 'a3617e9',  // Phase 88 Plan 88-04 — v1.10 milestone close-gate (docs(88-04); 4-doc traceability
                    // + v1.10 MILESTONE-AUDIT NEW + DEFERRED-CLEANUP). Single entry (v1.10 closed in ONE
                    // commit; atom == close-gate; no separate V110_CLOSEGATE).
```

**V111 entry to INSERT immediately after line 33** (mirror V110 shape exactly):
```javascript
  V111: '919b23b',  // Phase 93 Plan 93-04 — v1.11 milestone close-gate (docs(93-04); 4-doc traceability
                    // + v1.11 MILESTONE-AUDIT NEW + DEFERRED-CLEANUP). Single entry (v1.11 closed in ONE
                    // commit; atom == close-gate; no separate V111_CLOSEGATE).
```

**Existing readAtV110Close export** (line 66, the direct prior export to copy):
```javascript
export const readAtV110Close      = (p) => readAtClose('V110',         p);
```

**readAtV111Close export to INSERT immediately after line 66** (mirror spacing exactly):
```javascript
export const readAtV111Close      = (p) => readAtClose('V111',         p);
```

**V111 SHA confirmed:** `919b23b` — verified via `git log --grep="close-gate" --grep="v1.11" --all-match -1` returning `919b23b docs(93-04): Phase 93 close-gate — v1.11 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability + v1.11 MILESTONE CLOSE`.

**Anti-pattern:** Do NOT add a second `V111_CLOSEGATE` entry — v1.11 closed in a single commit (atom == close-gate). The two post-close commits (`f7a7e6b` SUMMARY, `c0be124` state+roadmap) are chores, NOT part of the atom.

---

### `scripts/validation/regenerate-supervision-pins.mjs` (utility, comment-only insert)

**Analog:** self — BASELINE_15 block (lines 446–452) is the direct prior freshness comment
**Atom:** 1 (COMMIT 2)
**Strategy:** Insert a 7-line comment block immediately after line 452 (before `const BASELINE_9 = [`). The BASELINE_9 array is NOT touched.

**Existing BASELINE_15 block** (lines 446–452, the direct prior to mirror):
```javascript
// BASELINE_15 refreshed 2026-06-25 (Phase 93 Plan 93-01): closes BASELINE_14 v1.10 carry-over
// per HARN-01 contract (REQUIREMENTS.md + ROADMAP.md Phase 93 SC#1); v1.11 line positions
// verified against HEAD 34653cb (Phase 93 Wave-1 commit — 93-CONVENTIONS.md constants lock).
// BASELINE_9 entries above remain unchanged -- Phase 93 does NOT alter the line-coord array;
// this comment records the audit-trail event that line-positions were re-verified at Phase 93
// close and remain valid for the v1.11 corpus. Resolution path: BASELINE_16 will refresh at
// the next milestone close per the Path-A inheritance pattern (... -> v1.10 -> BASELINE_14 -> v1.11 -> BASELINE_15).
```

**BASELINE_16 comment to INSERT after line 452** (mirror BASELINE_15 exactly, substituting Phase 95 / v1.12 / HEAD anchor):
```javascript
// BASELINE_16 refreshed 2026-06-26 (Phase 95 Plan 95-01): closes BASELINE_15 v1.11 carry-over
// per HARN-01 contract (REQUIREMENTS.md + ROADMAP.md Phase 95 SC#1); v1.12 line positions
// verified against HEAD {Wave-1-commit-SHA} (Phase 95 Wave-1 commit — 95-CONVENTIONS.md constants lock).
// BASELINE_9 entries above remain unchanged -- Phase 95 does NOT alter the line-coord array;
// this comment records the audit-trail event that line-positions were re-verified at Phase 95
// close and remain valid for the v1.12 corpus. Resolution path: BASELINE_17 will refresh at
// the next milestone close per the Path-A inheritance pattern (... -> v1.11 -> BASELINE_15 -> v1.12 -> BASELINE_16).
```

**Anchor SHA rule:** `{Wave-1-commit-SHA}` = `git rev-parse --short HEAD` captured immediately AFTER COMMIT 1 (the 95-CONVENTIONS.md commit). This is a known-PAST SHA at Atom-1 commit time. Do NOT use the future Phase-95 close SHA. Do NOT leave a placeholder in the committed file — replace it with the actual SHA before committing.

**Insertion point:** After line 452, before `const BASELINE_9 = [` (line 453 in current file).

---

### `.github/workflows/audit-harness-v1.12-integrity.yml` (CI config, event-driven)

**Analog:** `.github/workflows/audit-harness-v1.11-integrity.yml` (verbatim Path-A)
**Atom:** 2 (COMMIT 3)
**Strategy:** Path-A copy substituting version labels v1.11→v1.12 and per-phase job blocks 89..93→94..95 in the standalone validator section. All preserved contracts must be carried verbatim.

**File header comment** (analog lines 1–10 adapted):
```yaml
# v1.12 Audit Harness Integrity
# v1.12 integration surface. v1.4 + v1.4.1 + v1.5 + v1.6 + v1.7 + v1.8 + v1.9 + v1.10 + v1.11 harnesses frozen in their respective workflow files.
# Phase 95 HARN-02: 9th coexistence workflow. path-filter v1.12-scoped + 2 crons + parse/path-match/harness-run repointed v1.12 +
# pin-helper-advisory + rotting-external-quarterly + active check-phase-94 + check-phase-95 invocations.
# PRESERVES from Phase 69 dd1ff08 + 85521bb + 2d61981 (inherited verbatim via v1.11 Path-A):
#   linux-chain-ubuntu-latest fetch-depth:0 (FETCH-DEPTH-01 inheritance contract)
#   linux-chain-ubuntu-latest core.autocrlf false (LF-fidelity contract)
#   linux-chain-ubuntu-latest continue-on-error:false (D-A9 PR-blocking contract)
#   linux-chain-ubuntu-latest timeout-minutes:30
#   chain-apex CHAIN_TIMING_LINUX ::notice emission
```

**Workflow name** (analog line 12):
```yaml
name: Audit Harness v1.12 Integrity
```

**path-filter triggers** (analog lines 14–26 adapted):
```yaml
on:
  pull_request:
    paths:
      - 'scripts/validation/v1.12-*'
      - 'scripts/validation/check-phase-*.mjs'
      - '.github/workflows/audit-harness-v1.12-integrity.yml'
      - '.planning/REQUIREMENTS.md'
      - '.planning/milestones/v1.12-MILESTONE-AUDIT.md'
      - '.planning/milestones/v1.12-DEFERRED-CLEANUP.md'
  schedule:
    - cron: '0 8 * * 1'         # Weekly bitrot catch (Path-A from v1.6)
    - cron: '0 8 1 1,4,7,10 *'  # Quarterly c13_rotting_external check (Phase 70 HARNESS-04)
  workflow_dispatch:
```

**parse job** (analog lines 29–46 adapted):
```yaml
jobs:
  parse:
    name: Parse v1.12 sidecar JSON
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - name: Validate v1.12-audit-allowlist.json
        run: |
          node -e "
            const fs = require('fs');
            const j = JSON.parse(fs.readFileSync('scripts/validation/v1.12-audit-allowlist.json', 'utf8'));
            if (!Array.isArray(j.supervision_exemptions) || j.supervision_exemptions.length === 0) {
              console.error('supervision_exemptions empty');
              process.exit(1);
            }
            console.log('v1.12 sidecar OK: ' + j.supervision_exemptions.length + ' supervision pins');
          "
```

**path-match job** (analog lines 48–61 adapted):
```yaml
  path-match:
    name: Harness references v1.12 sidecar
    runs-on: ubuntu-latest
    needs: parse
    steps:
      - uses: actions/checkout@v4
      - name: Verify harness sidecar reference
        run: |
          if grep -q "scripts/validation/v1.12-audit-allowlist.json" scripts/validation/v1.12-milestone-audit.mjs; then
            echo "OK: harness references v1.12 sidecar"
          else
            echo "FAIL: harness does not reference v1.12-audit-allowlist.json"
            exit 1
          fi
```

**harness-run job** (analog lines 63–72 adapted):
```yaml
  harness-run:
    name: Run v1.12 milestone audit harness
    runs-on: ubuntu-latest
    needs: path-match
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - name: Run v1.12-milestone-audit.mjs
        run: node scripts/validation/v1.12-milestone-audit.mjs --verbose
```

**linux-chain-ubuntu-latest job** (analog lines 74–92 adapted — PRESERVED CONTRACTS VERBATIM):
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
      - name: Run chain-apex check-phase-95.mjs (recursively spawns 48..94)
        run: |
          START=$(date +%s)
          node scripts/validation/check-phase-95.mjs --verbose
          END=$(date +%s)
          echo "::notice title=CHAIN_TIMING_LINUX::Full chain wall-clock: $((END-START))s (Windows reference: ~430s; subprocess timeout: 600s)"
```

**Per-phase standalone validator jobs** (analog lines 94–162 — REPLACE 89..93 block with 94..95):
```yaml
  check-phase-94:
    name: check-phase-94 validator
    runs-on: ubuntu-latest
    needs: harness-run
    timeout-minutes: 15
    continue-on-error: false
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - name: Run check-phase-94.mjs
        run: node scripts/validation/check-phase-94.mjs

  check-phase-95:
    name: check-phase-95 validator
    runs-on: ubuntu-latest
    needs: harness-run
    timeout-minutes: 15
    continue-on-error: false
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - name: Run check-phase-95.mjs
        run: node scripts/validation/check-phase-95.mjs
```

**rotting-external-quarterly job** (analog lines 164–196 — carry VERBATIM, only sidecar filename changes):
```yaml
  rotting-external-quarterly:
    # ... (verbatim from analog)
    # Only change: v1.11-audit-allowlist.json → v1.12-audit-allowlist.json in the node -e script
```

**pin-helper-advisory job** (analog lines 198–214 — carry VERBATIM, no changes):
```yaml
  pin-helper-advisory:
    name: Supervision-pin drift advisory (CI)
    runs-on: ubuntu-latest
    needs: harness-run
    continue-on-error: true   # Phase 43 D-14 / Phase 48 D-22: advisory only; never fails build
    # ... (all steps verbatim)
```

**Precise diff summary (v1.11 → v1.12 YAML):**

| Location | v1.11 text | v1.12 replacement |
|----------|------------|-------------------|
| Line 1 comment | `# v1.11 Audit Harness Integrity` | `# v1.12 Audit Harness Integrity` |
| Line 3 (Phase, ordinal) | `Phase 93 HARN-02: 8th coexistence` | `Phase 95 HARN-02: 9th coexistence` |
| Line 3 (jobs description) | `active chain-89..93 invocations` | `active check-phase-94 + check-phase-95 invocations` |
| Line 12 (name) | `Audit Harness v1.11 Integrity` | `Audit Harness v1.12 Integrity` |
| Lines 17–21 (path filter) | `v1.11-*`, `audit-harness-v1.11-*`, `v1.11-MILESTONE-AUDIT.md`, `v1.11-DEFERRED-CLEANUP.md` | `v1.12-*` equivalents |
| Line 36–45 (parse job) | `v1.11-audit-allowlist.json` × 2 | `v1.12-audit-allowlist.json` × 2 |
| Line 56 (path-match) | `v1.11-audit-allowlist.json`, `v1.11-milestone-audit.mjs` | `v1.12-*` equivalents |
| Line 72 (harness-run) | `v1.11-milestone-audit.mjs --verbose` | `v1.12-milestone-audit.mjs --verbose` |
| Line 87 (chain step name) | `check-phase-93.mjs (recursively spawns 48..92)` | `check-phase-95.mjs (recursively spawns 48..94)` |
| Line 90 (chain run) | `node scripts/validation/check-phase-93.mjs --verbose` | `node scripts/validation/check-phase-95.mjs --verbose` |
| Lines 94–162 (per-phase jobs block) | 5 jobs: check-phase-89..93 | 2 jobs: check-phase-94..95 |
| Line 181 (rotting quarterly) | `v1.11-audit-allowlist.json` | `v1.12-audit-allowlist.json` |

---

## Shared Patterns

### CRLF normalization (all validators)
**Source:** `scripts/validation/check-phase-84.mjs` lines 26–30 (and every validator in the lineage)
**Apply to:** check-phase-94.mjs, check-phase-95.mjs
```javascript
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}
```

### Dual-invariant SELF guard (all per-phase validators)
**Source:** `scripts/validation/check-phase-84.mjs` lines 54–68 (the Phase 71 check-phase-71 form)
**Apply to:** check-phase-94.mjs (`CHAIN_PHASES = []`, asserts 94 absent), check-phase-95.mjs (`CHAIN_PHASES = [48..94]`, asserts 95 absent)
```javascript
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

### CHAIN_SKIP empty-Set invariant (all validators)
**Source:** `scripts/validation/check-phase-93.mjs` line 44; `scripts/validation/check-phase-84.mjs` line 35
**Apply to:** Both new validators
```javascript
const CHAIN_SKIP = new Set([]);
```

### CHECK_PHASE_NESTED=1 guard (chain validators only)
**Source:** `scripts/validation/check-phase-93.mjs` line 71
**Apply to:** check-phase-95.mjs only (not check-phase-94.mjs, which is a leaf)
```javascript
const NESTED = process.env.CHECK_PHASE_NESTED === '1';
// In each chain check:
if (NESTED) {
  return { pass: true, skipped: true, detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip recursive chain-guard expansion' };
}
```

### Runner loop pattern (all validators)
**Source:** `scripts/validation/check-phase-84.mjs` lines 70–97 (labeled "verbatim pattern from check-phase-71.mjs")
**Apply to:** Both new validators, verbatim copy
```javascript
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
for (const check of checks) {
  let result;
  try { result = check.run(); } catch (e) { result = { pass: false, detail: 'Unexpected error: ' + e.message }; }
  const prefix = '[' + check.id + '/' + checks.length + '] ' + check.name;
  const showDetail = result.detail && (VERBOSE || !result.pass || result.skipped);
  if (result.skipped) { skipped++; /* ... */ }
  else if (result.pass) { passed++; /* ... */ }
  else { failed++; /* ... */ }
}
process.stdout.write('\nResult: ' + passed + ' PASS, ' + failed + ' FAIL, ' + skipped + ' SKIPPED\n');
process.exit(failed > 0 ? 1 : 0);
```

### CI workflow preserved contracts (v1.12 YAML)
**Source:** `.github/workflows/audit-harness-v1.11-integrity.yml` lines 5–10 + 78–92
**Apply to:** `audit-harness-v1.12-integrity.yml` — ALL FOUR must be carried byte-unchanged:
- `fetch-depth: 0` (FETCH-DEPTH-01 inheritance contract)
- `git config --global core.autocrlf false` before checkout (LF-fidelity contract)
- `continue-on-error: false` on `linux-chain-ubuntu-latest` (D-A9 PR-blocking contract)
- `timeout-minutes: 30` on `linux-chain-ubuntu-latest`
- `::notice title=CHAIN_TIMING_LINUX::` emission pattern

---

## No Analog Found

None. All 7 files have direct Path-A or additive-edit analogs in the codebase.

---

## Critical Anti-Regressions

### Predecessor byte-unchanged invariant
**26 frozen surfaces** (8 workflow YAMLs + 9 milestone-audit MJS + 9 sidecar JSONs, v1.4–v1.11) MUST be byte-unchanged at every Phase 95 commit.
**Gate command** (run before COMMIT 5 / close-gate):
```bash
git diff ddf1355 HEAD -- \
  '.github/workflows/audit-harness-integrity.yml' \
  '.github/workflows/audit-harness-v1.5-integrity.yml' \
  # ... (full list in 95-RESEARCH.md Verification Target 6)
```
Expected output: **EMPTY**. Non-empty = STOP immediately.

### Atom 2 push-ordering gate
**check-phase-94.mjs + check-phase-95.mjs + audit-harness-v1.12-integrity.yml** MUST be committed AND pushed to `origin/master` BEFORE Plan 95-03 Axis-2 GHA dispatch. The v1.12 CI workflow's check-phase-94/95 jobs FAIL (not skip) if these files are absent from the dispatched ref.

### Do NOT run chain validators on Windows (Axis-1)
Only run LEAF validators on Windows fresh clone: `v1.12-milestone-audit.mjs` + `check-phase-94.mjs`. Both `check-phase-93.mjs` and `check-phase-95.mjs` cascade to O(n²) subprocess explosion on cold Windows. Chain counts come exclusively from Linux GHA Axis-2.

---

## Metadata

**Analog search scope:** `scripts/validation/`, `.github/workflows/`, `scripts/validation/_lib/`
**Files read:** 8 source files (frozen-at-close.mjs, regenerate-supervision-pins.mjs lines 440-460, check-phase-93.mjs, check-phase-84.mjs, check-phase-92.mjs, audit-harness-v1.11-integrity.yml, v1.11-milestone-audit.mjs lines 1-90, v1.11-audit-allowlist.json)
**Pattern extraction date:** 2026-06-26
