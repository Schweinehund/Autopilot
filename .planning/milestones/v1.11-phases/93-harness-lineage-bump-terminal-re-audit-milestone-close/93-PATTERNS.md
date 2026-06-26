# Phase 93: Harness Lineage Bump + Terminal Re-Audit + Milestone Close - Pattern Map

**Mapped:** 2026-06-25
**Files analyzed:** 11 (8 created + 3 modified)
**Analogs found:** 11 / 11 (100% — this is a Path-A lineage-bump; every file has a near-identical predecessor)

> **Path-A note:** This phase authors NOTHING from scratch. Every new file is a verbatim copy of its
> v1.10 (Phase 88) predecessor with v1.10→v1.11 relabels. D-01..D-04 are LOCKED in `93-CONTEXT.md` —
> this map does NOT re-decide anything; it consolidates RESEARCH.md's already-extracted excerpts into a
> per-file copy-from map, cross-checked first-hand against the live tree. Excerpts below were re-read
> directly from the analog files this session (citations are first-hand, not relayed).

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog (Path-A source) | Match Quality |
|-------------------|------|-----------|--------------------------------|---------------|
| `scripts/validation/v1.11-milestone-audit.mjs` | validator (harness) | batch / file-I/O | `scripts/validation/v1.10-milestone-audit.mjs` | exact (verbatim copy + 4 relabel sites) |
| `scripts/validation/v1.11-audit-allowlist.json` | config (sidecar) | transform | `scripts/validation/v1.10-audit-allowlist.json` | exact (verbatim copy + 2 field bumps) |
| `scripts/validation/check-phase-89.mjs` | validator (per-phase) | file-I/O / presence | `scripts/validation/check-phase-87.mjs` | exact (lightweight shape) |
| `scripts/validation/check-phase-90.mjs` | validator (per-phase) | file-I/O / presence | `scripts/validation/check-phase-87.mjs` | exact (lightweight shape) |
| `scripts/validation/check-phase-91.mjs` | validator (per-phase) | file-I/O / presence | `scripts/validation/check-phase-87.mjs` | exact (lightweight shape) |
| `scripts/validation/check-phase-92.mjs` | validator (per-phase) | file-I/O / cross-link assert | `scripts/validation/check-phase-81.mjs` (FORM) + `check-phase-87.mjs` (SELF) | exact (FORM-match) |
| `scripts/validation/check-phase-93.mjs` | validator (chain-apex) | event-driven / subprocess fan-out | `scripts/validation/check-phase-88.mjs` | exact (range bump [48..87]→[48..92]) |
| `scripts/validation/_lib/frozen-at-close.mjs` (EDIT) | utility (lib) | transform | itself — V19 entry shape at `:28-30` + `:62` | exact (1 entry + 1 export append) |
| `scripts/validation/regenerate-supervision-pins.mjs` (EDIT) | utility | transform | itself — BASELINE_14 block at `:439-445` | exact (comment-only append) |
| `.github/workflows/audit-harness-v1.11-integrity.yml` | config (CI) | event-driven | `.github/workflows/audit-harness-v1.10-integrity.yml` | exact (8th coexistence copy) |
| `.planning/milestones/v1.11-MILESTONE-AUDIT.md` + `v1.11-DEFERRED-CLEANUP.md` (close-gate docs) | artifact (docs) | transform | `.planning/milestones/v1.10-MILESTONE-AUDIT.md` + `v1.10-DEFERRED-CLEANUP.md` | exact (section-skeleton copy) |

---

## Pattern Assignments

### `scripts/validation/v1.11-milestone-audit.mjs` (validator/harness, batch) — Atom 1

**Analog:** `scripts/validation/v1.10-milestone-audit.mjs` (979 lines). **Copy verbatim, C1–C16 inherited, self-test preserved (9/9, do NOT add tests). NO new C-category (D-01).**

**Header pattern to relabel** (`v1.10-milestone-audit.mjs:1-6`, re-read this session):
```js
#!/usr/bin/env node
// v1.10 Milestone Audit Harness (Path A copy of v1.9; lineage v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7 → v1.8 → v1.9 → v1.10; C1-C16 inherited verbatim)
// Source of truth: .planning/phases/70-.../70-CONTEXT.md (D-01..D-04)
// Sidecar allow-list: scripts/validation/v1.10-audit-allowlist.json (v1.10 Path-A from v1.9 with c13_rotting_external carried for v1.10 per Phase 88 close-state)
```

**Sidecar repoint pattern** (`v1.10-milestone-audit.mjs:78-79` — this is the exact line the CI `path-match` job greps for):
```js
function parseAllowlist() {
  const raw = readFile('scripts/validation/v1.10-audit-allowlist.json');
```

**Exact transformation — 4 relabel sites ONLY (the "4-line Path-A relabel"):**
| Line | Change |
|------|--------|
| `:2` | `v1.10` → `v1.11`; extend chain `... → v1.9 → v1.10` → `... → v1.10 → v1.11`; "Path A copy of v1.9" → "Path A copy of v1.10" |
| `:4` | sidecar name → `v1.11-audit-allowlist.json`; "Path-A from v1.9 ... per Phase 88 close-state" → "Path-A from v1.10 ... per Phase 93 close-state" |
| `:35` | Usage line → `node scripts/validation/v1.11-milestone-audit.mjs` |
| `:79` | `readFile('scripts/validation/v1.11-audit-allowlist.json')` (CI path-match greps this) |

**DO NOT touch:** C1 (`:249`), C16 (`:757`, BLOCKING), self-test block (`:813-940`, count must stay 9/9), the C13 category-count assertion at `:676` (expects 6 transient_external / 9 template_placeholder). Default run must stay **15 PASS / 0 FAIL / 0 SKIP**.

---

### `scripts/validation/v1.11-audit-allowlist.json` (config/sidecar, transform) — Atom 1

**Analog:** `scripts/validation/v1.10-audit-allowlist.json` (531 lines). **Copy verbatim; reset c13 for v1.11; carry `quarterly_audit` cadence.**

**Exact transformation:**
| Field (line) | Change |
|--------------|--------|
| `generated` (`:3`) | `"2026-06-24T00:00:00Z"` → authoring day (2026-06-25) |
| `phase` (`:4`) | `"88-harness-..."` → `"93-harness-lineage-bump-terminal-re-audit-milestone-close"` |
| `c13_rotting_external` (`:321-529`) | carry forward verbatim (D-01 keeps C1-C16 verbatim; safe default is verbatim carry) |
| `quarterly_audit` (`:523-528`) | carry verbatim: `cadence: "0 8 1 1,4,7,10 *"`, `tool: "markdown-link-check"`, `next_review: "2027-01-01"` |

**DO NOT change (breaks C-checks):** `c13_broken_link_allowlist` count (exactly 6 `transient_external` + 9 `template_placeholder`); `c16_missing_endpoint_exemptions: []` (`:530`).

---

### `scripts/validation/check-phase-89.mjs` / `90.mjs` / `91.mjs` (validator/per-phase, presence) — Atom 2

**Analog:** `scripts/validation/check-phase-87.mjs` (98 lines — canonical LIGHTWEIGHT shape). **Each = exactly 2 checks (PRESENCE + SELF) → 2 PASS / 0 FAIL / 0 SKIP.** D-01: 89/90/91 are lightweight; NO chain (chain lives only in apex 93).

**Core lightweight pattern** (`check-phase-87.mjs:32-68`, re-read this session):
```js
// Lightweight: NO chain (chain lives only in apex check-phase-88.mjs).
const CHAIN_PHASES = [];
// CHAIN_SKIP topology: empty per Phase 68 7b635ca invariant -- no entries to suppress.
const CHAIN_SKIP = new Set([]);

// Phase 87 headline deliverable (navigation hub index).
const DELIVERABLE = 'docs/index.md';

const checks = [];

// === V-87-PRESENCE: phase headline deliverable exists + non-empty ===
checks.push({
  id: 'PRESENCE',
  name: 'V-87-PRESENCE: ' + DELIVERABLE + ' exists and is non-empty',
  run() {
    const c = readFile(DELIVERABLE);
    if (c === null) return { pass: false, detail: DELIVERABLE + ' missing' };
    if (c.trim().length === 0) return { pass: false, detail: DELIVERABLE + ' is empty' };
    return { pass: true, detail: DELIVERABLE + ' present (' + c.length + ' bytes)' };
  }
});

// === V-87-SELF: dual-invariant guard (CHAIN_PHASES excludes 87; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-87-SELF: CHAIN_PHASES does NOT include 87; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(87)) { return { pass: false, detail: 'CHAIN_PHASES includes 87 -- self-reference regression' }; }
    if (CHAIN_SKIP.size !== 0) { /* ... Phase 68 7b635ca empty-Set invariant ... */ }
    return { pass: true, detail: 'CHAIN_PHASES = [...] (87 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});
```

**Exact transformation per file** — swap `87`→target phase number throughout (id strings, SELF guard `.includes(NN)`, header), and set `DELIVERABLE`:
| New file | `DELIVERABLE` (PRESENCE target) |
|----------|--------------------------------|
| `check-phase-89.mjs` | `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` |
| `check-phase-90.mjs` | `docs/l2-runbooks/30-macos-mdm-migration-failure.md` |
| `check-phase-91.mjs` | `docs/_glossary-macos.md` |

**Header relabel:** the v1.10 lightweight validators cite *"LIGHTWEIGHT per Phase 88 D-01"* (`check-phase-87.mjs:5`) → for v1.11 cite **"Phase 93 D-01"** (which re-applies Phase 82 D-01).

**check-phase-91 explicit DEFER:** does NOT re-assert V-63-08/09 — `check-phase-63` owns the BASELINE blob-hash pins (lines ~202-242, updated by Phase 91 commit `7039630`, replayed every apex run). D-01 defers to avoid a two-place-update hazard.

---

### `scripts/validation/check-phase-92.mjs` (validator/per-phase, cross-link assert) — Atom 2

**Analog (FORM):** `scripts/validation/check-phase-81.mjs` (`{id, file, needle}` cross-link array). **Analog (SELF):** `check-phase-87.mjs` SELF guard. **= 9 checks (8 CROSSLINK + 1 SELF) → 9 PASS / 0 FAIL / 0 SKIP.**

**Cross-link FORM to copy** (`check-phase-81.mjs:41-73`, re-read this session):
```js
// === The 8 SSO-E cross-link edges (D-01) ===
// Each (id, file, needle) triple: assert the forward-slash needle is present in the source file.
// CRLF-normalized read (readFile already does .replace(/\r\n/g,'\n')) makes forward-slash needles
// Windows-safe. Hard-assert -- NO allowlist (mirrors C16 empty c16_missing_endpoint_exemptions: []).
const SSO_EDGES = [
  { id: 'E1', file: 'docs/...', needle: '../_glossary-macos.md#platform-sso' },
  // ... E2..E8
];

for (const e of SSO_EDGES) {
  checks.push({
    id: `CROSSLINK-${e.id}`,
    name: `V-81-CROSSLINK-${e.id}: ${e.file} contains SSO edge needle ${e.needle}`,
    run() {
      const c = readFile(e.file);              // readFile CRLF-normalizes (.replace(/\r\n/g,'\n'))
      if (c === null) return { pass: false, detail: e.file + ' missing' };
      if (!c.includes(e.needle)) return { pass: false, detail: `${e.id} needle absent: ${e.needle}` };
      return { pass: true, detail: `${e.id} edge present (${e.needle})` };
    }
  });
}
```

**Exact transformation:** rename array `SSO_EDGES` → nav-edge set; IDs `V-81-CROSSLINK-*` → `V-92-CROSSLINK-E1..E8`; SELF guard `.includes(81)` → `.includes(92)`; populate the 8 `{id, file, needle}` rows below. Keep `includes()` substring (forward-slash, CRLF-normalized) — NO allowlist/sidecar.

**The 8 V-92-CROSSLINK needles** (RESEARCH.md §4, grepped live from the 4 committed nav-hub files; harness is currently BLIND to all of them — `grep` of `scripts/validation/` returns NONE). Plan-phase confirms final 8 against `92-VERIFICATION.md:52-63`:
| ID | file | needle (forward-slash substring) |
|----|------|----------------------------------|
| E1 | `docs/index.md` | `macos-lifecycle/01-psso-provisioning-walkthrough.md` |
| E2 | `docs/index.md` | `macos-lifecycle/02-mdm-migration-psso.md` |
| E3 | `docs/index.md` | `l2-runbooks/30-macos-mdm-migration-failure.md` |
| E4 | `docs/common-issues.md` | `l2-runbooks/30-macos-mdm-migration-failure.md` |
| E5 | `docs/common-issues.md` | `l2-runbooks/27-macos-sso-investigation.md` |
| E6 | `docs/quick-ref-l2.md` | `l2-runbooks/30-macos-mdm-migration-failure.md` |
| E7 | `docs/quick-ref-l2.md` | `#platform-sso-attestation-command` (anchor cross-ref; may substitute `#key-terminal-commands`) |
| E8 | `docs/decision-trees/06-macos-triage.md` | `../l2-runbooks/30-macos-mdm-migration-failure.md` |

---

### `scripts/validation/check-phase-93.mjs` (validator/chain-apex, subprocess fan-out) — Atom 2

**Analog:** `scripts/validation/check-phase-88.mjs` (174 lines — the chain-apex). **Copy verbatim; bump chain range [48..87]→[48..92] (45 entries); repoint HARNESS to v1.11.**

**Apex constants to copy + bump** (`check-phase-88.mjs:38-44`, re-read this session):
```js
const HARNESS = 'scripts/validation/v1.10-milestone-audit.mjs';   // → 'scripts/validation/v1.11-milestone-audit.mjs'

// Phase 88 chain-apex extends the chain through Phase 87 (every integer 48..87).
const CHAIN_PHASES = [48,49,...,87];   // 40 entries → extend to [48..92] (45 entries)

// CHAIN_SKIP topology: empty per Phase 68 7b635ca invariant -- no entries to suppress (D-03 / SC#2).
const CHAIN_SKIP = new Set([]);        // carry VERBATIM (empty Set)
```

**NESTED child-spawn block to copy VERBATIM** (`check-phase-88.mjs:71-106` — the D-03 load-bearing block: apex returns one `CHAIN-NN exits 0` line per child, never a cross-OS-diffable triplet → the 5 net-new validators each need STANDALONE cross-OS rows):
```js
const NESTED = process.env.CHECK_PHASE_NESTED === '1';
for (const phaseNum of CHAIN_PHASES) {
  if (CHAIN_SKIP.has(phaseNum)) continue;
  checks.push({
    id: `CHAIN-${phaseNum}`,
    name: `V-88-CHAIN-${phaseNum}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
    run() {
      if (NESTED) { return { pass: true, skipped: true, detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip recursive chain-guard expansion' }; }   // :78-80
      const path = `scripts/validation/check-phase-${phaseNum}.mjs`;
      if (!existsSync(join(process.cwd(), path))) { return { pass: true, skipped: true, detail: path + ' not present (graceful skip)' }; }
      const isPeer = phaseNum >= 67;                                  // :85 — peers get 600s timeout
      const subTimeout = isPeer ? 600000 : 300000;
      const subEnv = { ...process.env, CHECK_PHASE_NESTED: '1' };     // :87
      try {
        execFileSync('node', [path], { stdio: 'pipe', timeout: subTimeout, cwd: process.cwd(), env: subEnv });  // :89
        return { pass: true, detail: 'check-phase-' + phaseNum + ' exits 0' + (isPeer ? ' (nested)' : '') };
      } catch (err) { /* missing-node graceful skip + FAIL with stdout+stderr slice */ }
    }
  });
}
```

**V-NN-AUDIT (VERIFICATION presence) to copy + repoint** (`check-phase-88.mjs:48-58`):
```js
const verifPath = resolveArchivedPhasePath(
  '88-harness-lineage-bump-terminal-re-audit-milestone-close/88-VERIFICATION.md',
  ['v1.10-phases']
);
// SKIP-PASS until close-gate authors the VERIFICATION.md
```
→ for 93: target `93-...-/93-VERIFICATION.md`, archive-list `['v1.11-phases']`, regex `/Phase 93/i`.

**V-NN-SELF dual-invariant to copy + bump** (`check-phase-88.mjs:130-144`):
```js
if (CHAIN_PHASES.includes(88)) { return { pass: false, detail: 'CHAIN_PHASES includes 88 -- self-reference regression' }; }   // → .includes(93)
if (CHAIN_SKIP.size !== 0) { /* Phase 68 7b635ca empty-Set invariant violated */ }
```

**Runner loop** (`:146-173`): copy verbatim (`LABEL_WIDTH=60`, `Result: N PASS, N FAIL, N SKIPPED`, `process.exit(failed>0?1:0)`).

**Exact transformation summary:** all `88`→`93` in id/name/header/SELF strings; `CHAIN_PHASES` → 45-entry [48..92]; HARNESS → v1.11; `CHAIN_SKIP = new Set([])` verbatim.

---

### `scripts/validation/_lib/frozen-at-close.mjs` (EDIT — utility/lib) — Atom 2 (DIVERGENCE: rides Atom 2, not Atom 1)

**Analog:** itself — the V19 entry shape at `:28-30` and the `readAtV19Close` export at `:62` (both re-read this session; confirmed last entry = V19, no V110). **Add ONE V110 entry + ONE export. NO second V110_CLOSEGATE** (v1.10 closed in a single commit → atom == close-gate).

**Entry shape to mirror** (`frozen-at-close.mjs:28-30`):
```js
  V19:  'b29dca5',  // Phase 82 Plan 82-04 — v1.9 milestone close-gate (docs(82-04); 4-doc traceability
                    // + v1.9 MILESTONE-AUDIT NEW + DEFERRED-CLEANUP). Single entry (v1.9 closed in ONE
                    // commit; atom == close-gate; no separate V19_CLOSEGATE).
```

**Append AFTER `:30` (inside `MILESTONE_CLOSE_SHAS`):**
```js
  V110: 'a3617e9',  // Phase 88 Plan 88-04 — v1.10 milestone close-gate (docs(88-04); 4-doc traceability
                    // + v1.10 MILESTONE-AUDIT NEW + DEFERRED-CLEANUP). Single entry (v1.10 closed in ONE
                    // commit; atom == close-gate; no separate V110_CLOSEGATE).
```

**Export shape to mirror** (`frozen-at-close.mjs:62`):
```js
export const readAtV19Close       = (p) => readAtClose('V19',          p);
```

**Append AFTER `:62`:**
```js
export const readAtV110Close      = (p) => readAtClose('V110',         p);
```

**Ordering-safe:** `a3617e9` is a known-PAST SHA and `check-phase-93` reads only PRIOR-milestone closes → NO Commit A (D-04 grep proof: `grep -rn "V110\|readAtV110\|readAtV111" scripts/validation/` = EMPTY).

---

### `scripts/validation/regenerate-supervision-pins.mjs` (EDIT — utility) — Atom 1

**Analog:** itself — the BASELINE_14 comment block at `:439-445` (re-read this session). **Comment-only append. DO NOT alter the `BASELINE_9` line-coord array at `:446`.**

**BASELINE_14 block to mirror** (`regenerate-supervision-pins.mjs:439-445`):
```js
// BASELINE_14 refreshed 2026-06-24 (Phase 88 Plan 88-01): closes BASELINE_13 v1.9 carry-over
// per HARN-01 contract (REQUIREMENTS.md + ROADMAP.md Phase 88 SC#1); v1.10 line positions
// verified against HEAD 2329791 (Phase 88 Wave-1 commit — 88-CONVENTIONS.md constants lock).
// BASELINE_9 entries above remain unchanged -- Phase 88 does NOT alter the line-coord array;
// this comment records the audit-trail event that line-positions were re-verified at Phase 88
// close and remain valid for the v1.10 corpus. Resolution path: BASELINE_15 will refresh at
// the next milestone close per the Path-A inheritance pattern (... -> v1.9 -> BASELINE_13 -> v1.10 -> BASELINE_14).
```

**Append AFTER `:445` (BASELINE_15 block):**
```js
// BASELINE_15 refreshed 2026-06-25 (Phase 93 Plan 93-01): closes BASELINE_14 v1.10 carry-over
// per HARN-01 contract (REQUIREMENTS.md + ROADMAP.md Phase 93 SC#1); v1.11 line positions
// verified against HEAD <93-01-CONVENTIONS-commit-SHA> (Phase 93 Wave-1 commit — 93-CONVENTIONS.md constants lock).
// BASELINE_9 entries above remain unchanged -- Phase 93 does NOT alter the line-coord array;
// this comment records the audit-trail event ... remain valid for the v1.11 corpus. Resolution path:
// BASELINE_16 will refresh at the next milestone close per the Path-A inheritance pattern (... -> v1.10 -> BASELINE_14 -> v1.11 -> BASELINE_15).
```

**Anchor SHA = known-PAST** (the Plan 93-01 Wave-1 `93-CONVENTIONS.md` commit; capture via `git rev-parse --short HEAD` at Atom-1 task time). Do NOT anchor to the future Phase-93 close SHA.

---

### `.github/workflows/audit-harness-v1.11-integrity.yml` (config/CI) — Atom 2

**Analog:** `.github/workflows/audit-harness-v1.10-integrity.yml` (229 lines). **8th coexistence file** (7 exist now). Predecessors v1.4-v1.10 stay BYTE-UNCHANGED. **Mirror v1.10: ship only the v1.11 validator jobs (89-93); linux-chain job runs apex check-phase-93.**

**Exact transformation (all `v1.10`→`v1.11`):**
| Job / line | Change |
|------------|--------|
| Header `:1-11` | "7th coexistence workflow" → "8th"; preserve contract list (FETCH-DEPTH-01, LF-fidelity, D-A9 PR-blocking, timeout-30, CHAIN_TIMING_LINUX) |
| `name:` `:12` | `Audit Harness v1.10 Integrity` → `Audit Harness v1.11 Integrity` |
| `on.pull_request.paths` `:16-22` | repoint all `v1.10-*` → `v1.11-*` (harness, allowlist, MILESTONE-AUDIT, DEFERRED-CLEANUP) |
| crons `:23-25` | carry verbatim (weekly `0 8 * * 1` + quarterly `0 8 1 1,4,7,10 *`) |
| `parse` job `:29-46` | validate `v1.11-audit-allowlist.json` |
| `path-match` job `:48-61` | grep `v1.11-audit-allowlist.json` in `v1.11-milestone-audit.mjs` |
| `harness-run` job `:63-72` | `node scripts/validation/v1.11-milestone-audit.mjs --verbose` |
| `linux-chain-ubuntu-latest` `:74-92` | KEEP all 4 contract values: `fetch-depth: 0`, `core.autocrlf false`, `continue-on-error: false`, `timeout-minutes: 30`; run apex `check-phase-93.mjs` + CHAIN_TIMING_LINUX `::notice` |
| per-validator jobs `:94-176` | replace 83-88 jobs with **check-phase-89, 90, 91, 92, 93** (`fetch-depth:0`, `timeout-minutes:15`, `continue-on-error:false`) |
| `rotting-external-quarterly` `:178-210` | carry; cron-only `if:` guard → SKIPs on workflow_dispatch (D-03 negative control); repoint sidecar to v1.11 |
| `pin-helper-advisory` `:212-229` | carry verbatim (`continue-on-error: true` advisory) |

**Ordering gate (D-03 HARD):** this file's check-phase-89..93 jobs MUST be on `origin/master` before Plan 93-03 Axis-2 dispatch (jobs FAIL, not skip, if absent from the dispatched ref).

---

### `.planning/milestones/v1.11-MILESTONE-AUDIT.md` + `v1.11-DEFERRED-CLEANUP.md` (artifact/docs) — Close-gate (Plan 93-04)

**Analogs:** `.planning/milestones/v1.10-MILESTONE-AUDIT.md` + `v1.10-DEFERRED-CLEANUP.md` (section skeletons).

**MILESTONE-AUDIT section skeleton** (RESEARCH.md §9; live v1.10 headings): frontmatter (`milestone: v1.11`, `scores: {requirements: 15/15, phases: 5/5}`, harness/allowlist/atom_1_sha/atom_2_sha/audit_results_sha/`close_commit: "{phase_93_close_SHA}"`/gha_workflow_run/`cross_os_exact_match: true`) + body: Executive Summary · Phase Closure Narrative (`### Phase 89..93`) · Auditor-Independence Verification (3-axis) · Cross-OS PASS-Count EXACT MATCH · Requirements Traceability 3/3 HARN · Cumulative Traceability 15/15 · Mechanical Checks Detail · **Audit Harness Lineage (phases 62→66→70→74→82→88→93, v1.4→v1.11 — 9th entry)** · Cross-Phase Integration · Deferred Items Summary · Milestone Close.

**Cross-link (do NOT delete) the stray pre-close** `.planning/v1.11-MILESTONE-AUDIT.md` (12/15, `gaps_found`) as evidence input — its deletion is deferred to `/gsd-complete-milestone` (mirrors v1.10's archive commit `3888555` which deleted the v1.10 stray, numstat `0 138`).

**DEFERRED-CLEANUP routing** (D-04 sub-2):
- **Part A NEW v1.11:** Intune profile-based-enrollment config gap (Phase 90); Iru console device-deletion steps (Phase 90); supervision-status-post-migration (Phase 90); Phase 89 CR-01/WR-01/IN-01 residue.
- **CARRY verbatim:** all v1.10 items (MTPSSO/KRBFUT futures, Part B v1.8 carry-forwards) + `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` (update depth → [48..92]).
- **DROP:** resolved v1.11 reqs (PROV/MIG/RUN/REF/NAV — satisfied 89-92).
- **No** pre-existing `docs/v1.11-DEFERRED-CLEANUP.md` (unlike v1.9) → no docs/ cross-link section.

---

## Shared Patterns

### CRLF-normalized file read (all validators)
**Source:** identical in `check-phase-88.mjs:32-36`, `check-phase-87.mjs:26-30`, `check-phase-81.mjs:30-34`.
**Apply to:** ALL 5 new check-phase validators (copy verbatim).
```js
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}
```

### Dual-invariant V-NN-SELF guard (auditor-independence)
**Source:** `check-phase-88.mjs:130-144` (apex) / `check-phase-87.mjs:54-68` (lightweight) — identical structure.
**Apply to:** ALL 5 new validators. Asserts `CHAIN_PHASES` does NOT include the validator's own phase AND `CHAIN_SKIP.size === 0` (Phase 68 `7b635ca` empty-Set invariant). For 89/90/91/92 `CHAIN_PHASES=[]`; for apex 93 `CHAIN_PHASES=[48..92]` (93 absent).

### Runner loop (PASS/FAIL/SKIPPED tally + exit code)
**Source:** `check-phase-88.mjs:146-173` (`LABEL_WIDTH=60`, `padLabel`, `Result: N PASS, N FAIL, N SKIPPED`, `process.exit(failed>0?1:0)`).
**Apply to:** ALL 5 new validators (copy verbatim).

### Predecessor-byte-unchanged anti-regression (close-gate HARD gate)
**Source:** `88-CONVENTIONS.md:262-306` (20 surfaces for v1.10 → **23 for v1.11**).
**Apply to:** close-gate verification. `git diff <pre-93-anchor> HEAD -- <23 frozen surfaces>` MUST return EMPTY. The 23 = 7 workflow YAMLs (v1.4 base + v1.5..v1.10) + 8 milestone-audit MJS (v1.4..v1.10) + 8 sidecar JSON (v1.4..v1.10). **Chain validators `check-phase-{48..92}.mjs` are NOT in the invariant.** Pre-93 anchor = current HEAD `9ef5efb` (re-capture at Plan 93-01 task time).

### 3-axis re-audit recipe (HARN-03)
**Source:** `88-03-AUDIT-RESULTS.md` (the executed v1.10 recipe).
**Apply to:** Plan 93-03. Axis-1 local fresh clone `$env:TEMP\v1.11-audit-<rand8>` (`$rand` `[0-9a-z]` 8-char); assert clone HEAD == source HEAD; run **6 fast non-apex** (check-phase-88 continuity + 89/90/91/92 + harness `--verbose` + `--self-test`); do NOT run apex 93 from Windows clone; `Remove-Item -Recurse -Force` + assert zero orphans. Axis-2: `gh workflow run audit-harness-v1.11-integrity.yml --ref master` (pre-flight: Atom 2 on origin/master + `gh auth status` + workflow `state: active`). Axis-3: SAME sub-agent (one dispatch, two dimensions). **Apex 93 count is Linux-GHA sole-authoritative** (deep-nest timeout `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` fired at [48..87]; [48..92] is depth-monotone-worse).

### Expected cross-OS counts (the EXACT-MATCH diff targets)
| Validator | Count (PASS/FAIL/SKIP) |
|-----------|------------------------|
| `v1.11-milestone-audit` | 15/0/0 |
| `check-phase-88` (continuity) | 42/0/1 |
| `check-phase-89` / `90` / `91` | 2/0/0 each |
| `check-phase-92` | 9/0/0 (8 CROSSLINK + 1 SELF) |
| `check-phase-93` (apex) | Linux-GHA sole-authoritative ~48/0/1 (capture at audit time) |

---

## No Analog Found

None. Every file in this phase has an exact or FORM-match Path-A predecessor in the live tree. This is the defining property of a Path-A lineage-bump phase.

| File | Analog status |
|------|---------------|
| (all 11 files) | exact / FORM-match analog found — see Pattern Assignments |

---

## Metadata

**Analog search scope:** `scripts/validation/`, `scripts/validation/_lib/`, `.github/workflows/`, `.planning/milestones/v1.10-*`
**Files scanned (re-read first-hand this session):** `check-phase-88.mjs`, `check-phase-87.mjs`, `check-phase-81.mjs`, `_lib/frozen-at-close.mjs`, `regenerate-supervision-pins.mjs:432-446`, `v1.10-milestone-audit.mjs:1-6,78-79`; directory listings of `scripts/validation/` + `.github/workflows/`
**Cross-checked against:** `93-RESEARCH.md` (all excerpt citations confirmed accurate to the live tree)
**Pattern extraction date:** 2026-06-25
