# Phase 68: CHAIN_SKIP Root-Cause Resolution (Pillar B — Validator Surgery) - Pattern Map

**Mapped:** 2026-05-26
**Files analyzed:** 17 (3 new + 11 modified validators/helpers + 1 sidecar + 1 planning doc + 1 verification artifact)
**Analogs found:** 16/17 (94% — every Phase 68 deliverable has a direct in-repo precedent at HEAD except the `_lib/` subdirectory structure itself, which is first-of-kind)

**Phase 68 is "Validator Surgery" against a v1.6-validated chain harness with one well-documented exception (the `CHAIN_SKIP` suppression).** Every code idiom is a verbatim copy from Phase 31 `ca40eb9` (CRLF normalization), Phase 64/65/66 (CHAIN_SKIP block + chain validator skeleton), Phase 66-02 `3a9a671` (atomic-harness-commit), and Phase 67 (per-plan-per-requirement commit boundary + close-gate artifact format). The only novel structural element is the `scripts/validation/_lib/` subdirectory, which is filesystem-pure ESM import — no convention precedent needed.

---

## File Classification

### New Files (CREATED)

| New File | Role | Data Flow | Closest Analog | Match Quality |
|----------|------|-----------|----------------|---------------|
| `scripts/validation/_lib/archive-path.mjs` | helper-library (pure path resolver) | filesystem-probe (existsSync) → string return | The `readFile()` helper function pattern duplicated across `check-phase-48.mjs:22-26`, `check-phase-60.mjs:21-25`, `regenerate-supervision-pins.mjs:74-78`, `check-phase-31.mjs:15-19` (Phase 31 `ca40eb9` lineage — same single-purpose, pure-fs idiom; same `import { ... } from 'node:fs'` shape; same `join(process.cwd(), rel)` absolutification) | role-match (pure-fs helper); FIRST-of-kind for `_lib/` subdirectory |
| `.planning/milestones/v1.7-DEFERRED-CLEANUP.md` | planning-doc (deferred-backlog) | static markdown | `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` (authored 2026-05-25 commit `c7a3973` per `docs(66-03)`; CI-1/CI-2/CI-3 + CHAIN_SKIP + Other Deferrals sections) | EXACT (same milestone-lineage artifact, one version forward) |
| `.planning/phases/68-.../68-VERIFICATION.md` | verification-artifact (close-gate report) | static markdown (SC checklist + tool stdout + validator exit table) | `.planning/phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/67-VERIFICATION.md` (Phase 67 close-gate; YAML frontmatter + Sweep-N sections + Section B Commands table) AND `.planning/milestones/v1.6-phases/66-.../66-VERIFICATION.md` (V-NN Final State table) | EXACT (Phase 67) + SECONDARY (Phase 66) |

### Modified Files — Validator Source (`scripts/validation/`)

| Modified File | Line(s) | Role | Data Flow | Closest Analog | Match Quality |
|---------------|---------|------|-----------|----------------|---------------|
| `check-phase-51.mjs` | 17 (`readFile()` body) | validator-source (chain) | file read → CRLF normalize | `check-phase-48.mjs:25` (canonical CRLF idiom) | EXACT (verbatim byte copy) |
| `check-phase-58.mjs` | 21 (`readFile()` body) | validator-source (chain) | same | `check-phase-48.mjs:25` | EXACT (verbatim byte copy) |
| `check-phase-48.mjs` | 83 (V-48-05 check body) | validator-source (chain) | hardcoded path → helper call | None pre-existing (Phase 68 introduces helper); semantic precedent is the existing const-declaration pattern at `check-phase-60.mjs:27-32` | role-match (introduces new pattern) |
| `check-phase-60.mjs` | 30 + 32 (`BROKEN_LINKS_INVENTORY`, `CALIBRATION_DOC` const declarations) | validator-source (chain) | const string → helper call | SELF (lines 27-32 already declare a HARNESS/SIDECAR/PIN_HELPER const cluster; the 2 archive paths slot in next to them) | EXACT SELF (const-cluster pattern preserved) |
| `check-phase-31.mjs` | 32 (silent-swallow fix via helper) | validator-source (orphan, non-chain) | silent-pass on missing file → caller-decides FAIL semantics via `_missing` marker | None pre-existing (silent-swallow is the *bug* being fixed); the corrected pattern matches the `_parseError` marker already at `check-phase-31.mjs:37` (returned-object discriminator) | role-match (extends existing `_parseError` discriminator pattern) — **STRETCH per D-02 advisor** |
| `check-phase-62.mjs` | 41 (`ANCHOR_INVENTORY` const) + 66 (`CHAIN_SKIP` Set + comment) | validator-source (chain) | same const→helper + Set literal | `check-phase-60.mjs:27-32` (const cluster) + `check-phase-64.mjs:54-73` (canonical CHAIN_SKIP block) | EXACT |
| `check-phase-63.mjs` | 48 (`ANCHOR_INVENTORY` const) + 73 (`CHAIN_SKIP` Set + comment) | validator-source (chain) | same | `check-phase-60.mjs:27-32` + `check-phase-64.mjs:54-73` | EXACT |
| `check-phase-64.mjs` | 73 (`CHAIN_SKIP` Set + comment block update) | validator-source (chain) | Set literal mutation | SELF (lines 54-73 are the canonical CHAIN_SKIP block; Phase 68 updates the *narrative* not the *structure*) | EXACT SELF |
| `check-phase-65.mjs` | 69 (`CHAIN_SKIP` Set + comment block update) | validator-source (chain) | same | `check-phase-64.mjs:54-73` | EXACT |
| `check-phase-66.mjs` | 64 (`CHAIN_SKIP` Set + comment block update — note: line 64 NOT 73; SELF differs because Phase 66 amended the resolution-narrative tail per D-03 advisor) | validator-source (chain) | same | SELF (lines 45-64 are the variant block citing "v1.7 CI-Linux job"); Phase 68 normalizes back to uniform narrative | role-match (SELF with narrative divergence to be normalized) |
| `regenerate-supervision-pins.mjs` | 408-411 (BASELINE_9 coords) + 422-423 (parseAllowlist arg + FAIL message) | helper (test mode) | array-literal coord rebase + sidecar lineage repoint | SELF (lines 386-417 = existing BASELINE_9 attribution-comment pattern with refresh entries at 2026-04-26 / 2026-05-06 ×3; Phase 68 adds a 5th refresh attribution for 2026-05-26 +1 banner shift) | EXACT SELF (canonical refresh-attribution pattern) |

### Modified Files — Sidecar Data

| Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---------------|------|-----------|----------------|---------------|
| `scripts/validation/v1.5-audit-allowlist.json` (broad rebase across `supervision_exemptions[]` + `c7_knox_allowlist[]` + `cope_banned_phrases[]` for `_glossary-android.md` entries — 9+ entries +1 line-coord shift) | sidecar-data (validator allowlist JSON) | per-entry `line` field +1 increment | `scripts/validation/v1.6-audit-allowlist.json` `supervision_exemptions[]` (already post-Phase-62-07 +1-rebased; carries the same `{file, line, reason}` shape — Phase 68 IS the v1.5 catch-up rebase to match the v1.6 post-banner truth) | EXACT (same JSON shape; same +1 shift attribution) |

### Modified Files — Planning Documents

| Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---------------|------|-----------|----------------|---------------|
| `.planning/MILESTONES.md` (DELETE lines 3-71 — cdcce23 garbage v1.5 H2 entry) | planning-doc (top-level milestone log) | byte-range deletion | None pre-existing for *deletion*; structural precedent is the correct v1.5 entry already living at lines 73-92 (the same file's authoritative entry, untouched by Phase 68) | role-match (structural reference is SELF-internal) |
| `.planning/PROJECT.md` (CHAIN-01/02/03 Active→Validated flips with closing SHAs) | planning-doc (project status) | row flip + SHA insertion | `.planning/milestones/v1.6-phases/66-.../66-VERIFICATION.md` traceability section + Phase 67 close-gate Plan 67-03 PROJECT.md flip pattern (Phase 67 D-04 commit topology inherited) | EXACT |
| `.planning/REQUIREMENTS.md` (CHAIN-01/02/03 active-list `[ ]`→`[x]` at lines 18/20/22 + Traceability table rows lines 81-83) | planning-doc (requirements ledger) | same flip pattern | Phase 67 SWEEP-01/02 REQUIREMENTS.md flips at Phase 67 Plan 67-03 close-gate | EXACT |
| `.planning/ROADMAP.md` (Phase 68 row → Complete with date) | planning-doc | row flip | Phase 67 row flip at Phase 67 Plan 67-03 | EXACT |
| `.planning/STATE.md` (Phase 68 row added/updated) | planning-doc | row append/update | Phase 67 STATE.md update at Plan 67-03 | EXACT |

---

## Pattern Assignments

### `scripts/validation/_lib/archive-path.mjs` (helper-library — NEW)

**Primary analog (signature shape + module-level structure):** `scripts/validation/check-phase-48.mjs` lines 22-26 (the `readFile()` helper pattern)

**Existing `readFile()` helper pattern** (canonical CRLF-normalizing helper — repeated across 4+ validator files):

```javascript
// scripts/validation/check-phase-48.mjs lines 14-26
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

**Phase 68 helper — verbatim from CONTEXT D-02 (single-arg signature locked):**

```javascript
// scripts/validation/_lib/archive-path.mjs (NEW FILE — first inhabitant of _lib/)
// Resolves a phase artifact path that may live at either:
//   - .planning/phases/PHASEDIR/FILENAME           (live, pre-archival)
//   - .planning/milestones/v1.5-phases/PHASEDIR/FILENAME  (archived at v1.5 close)
//
// Returns the resolved relative path (string) or null if neither exists.
// CALLER OWNS FAIL SEMANTICS — this helper does not throw and does not swallow.
//
// Lineage: introduced Phase 68 CHAIN-02 per REQUIREMENTS.md:20
//   "handles BOTH pre-archival path AND post-archival path"

import { existsSync } from 'node:fs';
import { join } from 'node:path';

export function resolveArchivedPhasePath(phaseSuffix) {
  const live = '.planning/phases/' + phaseSuffix;
  const archived = '.planning/milestones/v1.5-phases/' + phaseSuffix;
  if (existsSync(join(process.cwd(), live))) return live;
  if (existsSync(join(process.cwd(), archived))) return archived;
  return null;
}
```

**Conventions preserved from the analog:**
- `import { ... } from 'node:fs'` + `import { ... } from 'node:path'` — node-protocol prefix idiom (stable since Node 14)
- `join(process.cwd(), relPath)` absolutification (forward-slash string literal portable on Windows/Linux)
- Pure-fs read; no shell; no eval; no network — matches threat-model assumption per RESEARCH §Security Domain (V14 Configuration only)
- Single-purpose function with explicit `null` return for caller-decides FAIL semantics — explicitly cited in helper docstring

**Helper-signature variant — OPEN QUESTION at Plan 68-02 Wave 1:** Per RESEARCH §Edge Cases #7 + §Open Questions #1, `check-phase-62.mjs:41` resolves a v1.6-archived `62-ANCHOR-INVENTORY.md` (not v1.5). CONTEXT.md D-02 locked the single-arg signature; researcher recommended extending to optional second arg `milestoneRoots = ['v1.5-phases']`. Planner resolves at Wave 1 — either (a) extend to two-arg with v1.5 default, or (b) skip 62/63 from helper coverage if v1.6-archive resolution stays out of scope. **EXACT excerpt above is the CONTEXT-locked single-arg shape.**

**Import-side pattern at each call site:**

```javascript
import { resolveArchivedPhasePath } from './_lib/archive-path.mjs';
```

Each existing validator already uses forward-slash relative-path imports (none currently; this is the first); ESM resolves cross-platform.

---

### `check-phase-51.mjs:17` + `check-phase-58.mjs:21` (CHAIN-01 — CRLF centralization)

**Primary analog:** `scripts/validation/check-phase-48.mjs:22-26` (canonical CRLF idiom — same line lives in `check-phase-60.mjs:21-25`, `regenerate-supervision-pins.mjs:74-78`, `check-phase-31.mjs:15-19`, all chain validators 62/63/64/65/66)

**Canonical CRLF idiom from `check-phase-48.mjs:25`:**

```javascript
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}
```

**`regenerate-supervision-pins.mjs:73-78` — explicit Phase 31 lineage attribution:**

```javascript
// readFile: v1.4 harness lines 28-32 — file read with CRLF normalization (Pattern C)
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');  // CRLF normalization per Phase 31 ca40eb9
}
```

**`check-phase-31.mjs:15-19` — earliest precedent (Phase 31 ca40eb9 lineage source):**

```javascript
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');  // CRLF normalization per ca40eb9
}
```

**Phase 68 edit — pre-edit state of `check-phase-51.mjs:14-18`** (verified by Read 2026-05-26):

```javascript
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8');
}
```

**Plan 68-01 verbatim edit at line 17:**

```javascript
// BEFORE
  return readFileSync(abs, 'utf8');

// AFTER
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');  // CRLF normalization (CHAIN-01; mirrors check-phase-48.mjs:25)
```

**`check-phase-58.mjs:18-22` — same pre-edit shape; same Plan 68-01 edit at line 21.**

**Conventions preserved:**
- Single-quote `'utf8'` literal (both target files use single quotes — confirmed by Read)
- Inline comment with Phase 31 / check-phase-48 lineage attribution (matches `regenerate-supervision-pins.mjs:77` and `check-phase-31.mjs:18` comment style)
- No regex changes anywhere else in either file (D-01 adversarial-wedge protection — Option A would have injected ~9 semantic-bug edits to `[^\n]*` negated character classes that are NOT line-ends)

---

### `check-phase-48.mjs:83` + `check-phase-60.mjs:30,32` + `check-phase-31.mjs:32` + `check-phase-62.mjs:41` + `check-phase-63.mjs:48` (CHAIN-02 — helper call-site replacements)

**Primary analog (const-cluster declaration pattern):** `scripts/validation/check-phase-60.mjs:27-32`

**Existing const cluster at `check-phase-60.mjs:27-32`** (verbatim):

```javascript
const HARNESS = 'scripts/validation/v1.5-milestone-audit.mjs';
const SIDECAR = 'scripts/validation/v1.5-audit-allowlist.json';
const PIN_HELPER = 'scripts/validation/regenerate-supervision-pins.mjs';
const BROKEN_LINKS_INVENTORY = '.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md';
const COMPARISON_DOC = 'docs/reference/4-platform-capability-comparison.md';
const CALIBRATION_DOC = '.planning/phases/60-audit-harness-v1-5-finalization/60-CALIBRATION.md';
```

**Plan 68-02 Wave 2 edit pattern (const → helper call) for `check-phase-60.mjs:30,32`:**

```javascript
// BEFORE
const BROKEN_LINKS_INVENTORY = '.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md';
const COMPARISON_DOC = 'docs/reference/4-platform-capability-comparison.md';   // UNCHANGED — docs/* path
const CALIBRATION_DOC = '.planning/phases/60-audit-harness-v1-5-finalization/60-CALIBRATION.md';

// AFTER (add import at top; replace 2 string literals — line 31 COMPARISON_DOC untouched)
import { resolveArchivedPhasePath } from './_lib/archive-path.mjs';
// ...
const BROKEN_LINKS_INVENTORY = resolveArchivedPhasePath('48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md');
const COMPARISON_DOC = 'docs/reference/4-platform-capability-comparison.md';
const CALIBRATION_DOC = resolveArchivedPhasePath('60-audit-harness-v1-5-finalization/60-CALIBRATION.md');
```

**Consumer-side `null`-handling pattern (downstream of helper at V-60-08 line 152, V-60-24 line 257, V-60-25 line 274):** Each consumer must check `if (BROKEN_LINKS_INVENTORY === null) return { pass: false, detail: 'archived doc not found at .planning/phases/ or .planning/milestones/v1.5-phases/' };` — mirrors the existing `if (c === null) return { pass: false, detail: HARNESS + ' missing' };` pattern at `check-phase-66.mjs:72`.

**Plan 68-02 Wave 2 edit pattern (check-body call-site) for `check-phase-48.mjs:83`:**

Pre-edit state at lines 79-93 (V-48-05 check 5 body — verified by Read):

```javascript
{
  id: 5,
  name: '48-VERIFICATION-broken-links.md exists with Category A/B/C sections',
  run() {
    const relPath = '.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md';
    const content = readFile(relPath);
    if (!content) return { pass: false, detail: relPath + ' does not exist' };
    // ... sectionA/B/C asserts
  }
}
```

Post-edit (lift `relPath` from hardcoded → helper call):

```javascript
// AFTER
{
  id: 5,
  name: '48-VERIFICATION-broken-links.md exists with Category A/B/C sections',
  run() {
    const relPath = resolveArchivedPhasePath('48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md');
    if (relPath === null) return { pass: false, detail: '48-VERIFICATION-broken-links.md not found at .planning/phases/ or .planning/milestones/v1.5-phases/' };
    const content = readFile(relPath);
    if (!content) return { pass: false, detail: relPath + ' does not exist (helper-resolved path empty file)' };
    // ... sectionA/B/C asserts unchanged
  }
}
```

**Silent-swallow STRETCH fix at `check-phase-31.mjs:32` — pre-edit state (verified):**

```javascript
function parseInventory() {
  const raw = readFile('.planning/phases/31-ios-l2-investigation/placeholder-inventory.json');
  if (!raw) return { placeholders: [] };  // <-- silent-swallow data-integrity bug
  try {
    return JSON.parse(raw);
  } catch (err) {
    return { _parseError: err.message, placeholders: [] };  // <-- already-existing discriminator pattern Phase 68 extends
  }
}
```

**Phase 68 STRETCH edit — extend the existing `_parseError` discriminator pattern with a `_missing` marker:**

```javascript
function parseInventory() {
  const relPath = resolveArchivedPhasePath('31-ios-l2-investigation/placeholder-inventory.json');
  if (relPath === null) return { _missing: true, placeholders: [] };  // <-- caller-decides FAIL
  const raw = readFile(relPath);
  if (!raw) return { _missing: true, placeholders: [] };
  try {
    return JSON.parse(raw);
  } catch (err) {
    return { _parseError: err.message, placeholders: [] };
  }
}
```

**Caller-side update (V-31-21 + V-31-24):** check `if (inv._missing) return { pass: false, detail: 'placeholder-inventory.json not resolvable' };` before iterating `inv.placeholders` — mirrors the `_parseError` discriminator check pattern.

**Conventions preserved:**
- Single-quote string literals throughout
- Inline comment with CHAIN-02 lineage attribution
- Helper return `null` is a structural discriminator (not a thrown exception) — matches threat-model V14 read-only-fs idiom
- Each consumer call-site updates its FAIL-detail string to cite "v1.5-phases or .planning/phases/" so the auditor sees the dual-resolution rationale

---

### `regenerate-supervision-pins.mjs:408-411 + :422-423` (CHAIN-02 — D-03 BASELINE_9 coord rebase + sidecar repoint)

**Primary analog:** SELF — `regenerate-supervision-pins.mjs:386-406` (existing BASELINE_9 attribution-comment block with 4 prior refresh entries dated 2026-04-26 / 2026-05-06 / 2026-05-06 / 2026-05-25)

**Existing attribution-comment + array literal at lines 386-417** (verified by Read; abbreviated for excerpt brevity):

```javascript
// Pre-expansion 9-pin baseline S1..S9 (hard-coded from commit e5e45db).
// ...
// BASELINE_9 refreshed 2026-04-26 (Phase 48 Plan 01): original S1..S9 pre-Phase-43 pin coordinates
// updated to current line positions after Phase 44-46 content additions (...).
// BASELINE_9 refreshed 2026-05-06 (Phase 60 Plan 06): Phase 59 line positions
// updated to current after Phase 60 _glossary-android.md #kme/#kpe HTML-shim
// insertion at lines 127 and 134 (net +2 lines after line 126).
// BASELINE_9 refreshed 2026-05-06 (Phase 60 Plan 08): _glossary-android.md entries refreshed
// to post-Plan-06 line coords (#kme/#kpe shims caused +2 shift after line 127); aligns with
// current sidecar supervision_exemptions[] AT v1.5 close. Closes AUDIT-07 carry-over per CONTEXT D-19.
// BASELINE_10 refreshed 2026-05-25 (Phase 66 Plan 66-02): closes BASELINE_9 v1.5 carry-over
// per AUDIT-14 contract (REQUIREMENTS.md:63 + ROADMAP.md:239); v1.6 line positions verified
// against HEAD 33629fa (Phase 65 close-gate baseline + Phase 66 Plan 66-01 chain green).
// BASELINE_9 entries above remain unchanged -- Phase 66 does NOT alter the line-coord array;
// this comment records the audit-trail event that line-positions were re-verified at Phase 66
// close and remain valid for the v1.6 corpus. Resolution path: BASELINE_11 will refresh at
// v1.7 close per the Path-A inheritance pattern (...).
const BASELINE_9 = [
  ['docs/_glossary-android.md', 79],   // ### Supervision heading (was 65/76; 79 at Phase 59; stable post-Plan-06 — H3 sits before line 127)
  ['docs/_glossary-android.md', 81],   // Supervision disambiguation blockquote (was 67/78; 81 at Phase 59; stable post-Plan-06)
  ['docs/_glossary-android.md', 181],  // MHS cross-platform note (was 134/172/179; 181 post-Plan-06 +2 from #kme/#kpe shims)
  ['docs/_glossary-android.md', 198],  // Version History row (was 148/188/196; 198 post-Plan-06 +2)
  ['docs/android-lifecycle/00-enrollment-overview.md', 51],
  // ... (5 more entries — none touched by Phase 68; Phase 62-07 banner is at _glossary-android.md:13)
];
```

**Phase 68 Plan 68-02 Wave 3 — Edit A (4 line-coord increments at lines 408-411):**

```javascript
// BEFORE
const BASELINE_9 = [
  ['docs/_glossary-android.md', 79],
  ['docs/_glossary-android.md', 81],
  ['docs/_glossary-android.md', 181],
  ['docs/_glossary-android.md', 198],
  // ... (entries 5-9 unchanged)
];

// AFTER
const BASELINE_9 = [
  ['docs/_glossary-android.md', 80],   // ### Supervision heading (was 79 at Phase 59; +1 Phase 62-07 banner shift; H3 sits before line 127)
  ['docs/_glossary-android.md', 82],   // Supervision disambiguation blockquote (was 81 at Phase 59; +1 Phase 62-07 banner shift)
  ['docs/_glossary-android.md', 182],  // MHS cross-platform note (was 181 at Phase 60-06; +1 Phase 62-07 banner shift)
  ['docs/_glossary-android.md', 199],  // Version History row (was 198 at Phase 60-06; +1 Phase 62-07 banner shift)
  // ... (entries 5-9 unchanged — non-_glossary-android.md files not affected by banner)
];
```

**Phase 68 Plan 68-02 Wave 3 — Edit B (sidecar lineage repoint at lines 422-423):**

```javascript
// BEFORE
const allow = parseAllowlist('scripts/validation/v1.5-audit-allowlist.json');
if (allow._missing) {
  process.stderr.write('FAIL: sidecar missing at scripts/validation/v1.5-audit-allowlist.json\n');
  process.exit(1);
}

// AFTER
const allow = parseAllowlist('scripts/validation/v1.6-audit-allowlist.json');
if (allow._missing) {
  process.stderr.write('FAIL: sidecar missing at scripts/validation/v1.6-audit-allowlist.json\n');
  process.exit(1);
}
```

**Recommended new attribution-comment block (per D-03 advisor §"Edit 3 optional but recommended"):**

Insert after existing line 406 (between the prior 2026-05-25 BASELINE_10 attribution and the array literal), matching the existing 2026-04-26 / 2026-05-06 / 2026-05-25 pattern shape:

```javascript
// BASELINE_9 refreshed 2026-05-26 (Phase 68 Plan 68-02): _glossary-android.md entries +1 line-coord
// shift to absorb Phase 62-07 Apple Business reciprocal-governance banner at _glossary-android.md:13;
// parseAllowlist() lineage repointed v1.5 → v1.6 sidecar (closes D-03 dogfood-test FAIL; helper
// honors anti-tolerance directive at line 499 — tightens via lineage repoint, not relaxes via
// tolerance window). v1.6 sidecar already carries the +1-rebased coords per Phase 66-02 atomic
// commit 3a9a671 (BASELINE_10 freshness comment). Forward-pointer: Phase 70 HARNESS-02 repoints
// parseAllowlist() to v1.7 sidecar at that future commit via 1-line edit (line 422).
```

**Conventions preserved (SELF analog — refresh-attribution pattern matches existing 4 entries verbatim):**
- Header line shape: `// BASELINE_9 refreshed YYYY-MM-DD (Phase NN Plan NN-NN): brief context;`
- Multi-line body explaining the corpus change + cross-reference to the source-of-truth (REQUIREMENTS / ROADMAP / CONTEXT)
- Forward-pointer to next anticipated refresh (Phase 70 HARNESS-02 in this case)
- Array literal is mutated INLINE; comment block is APPENDED (preserves V-60-09's substring assertion `/BASELINE_9 refreshed 2026-05-06 \(Phase 60 Plan 08\)/` — the 2026-05-06 attribution line is not removed; the 2026-05-26 attribution is added below it)

---

### `scripts/validation/v1.5-audit-allowlist.json` (CHAIN-02 — V-60-23 broad sidecar coord rebase)

**Primary analog:** `scripts/validation/v1.6-audit-allowlist.json` `supervision_exemptions[]` (Phase 66-02 commit `3a9a671` populated; carries the post-Phase-62-07 +1-rebased coordinate set Phase 68 catches v1.5 up to)

**Existing v1.6 sidecar entry shape** (verified by Grep at `v1.6-audit-allowlist.json:12-15`):

```json
  "supervision_exemptions": [
    {"file": "docs/_glossary-android.md", "line": 80, "reason": "Phase 62 carry-over: line 79 shifted +1 (Phase 62 Plan 62-07 added Apple Business banner line at line 13); Phase 59 carry-over: line 76 shifted +3 (Phase 59 CLEAN-08 added see-also lines to BYOD/UE/ZTE before COBO section, net +3); ### Supervision H3 heading (term being defined; iOS supervision callout; intentional AEAUDIT-04 pattern)"},
    {"file": "docs/_glossary-android.md", "line": 82, "reason": "Phase 62 carry-over: line 81 shifted +1 (Phase 62 Plan 62-07 added Apple Business banner line at line 13); Phase 59 carry-over: line 78 shifted +3 (same +3 shift); Android note blockquote for Supervision H3 — explains iOS/iPadOS supervision concept in cross-platform context (Apple-attributed citation; AEAUDIT-04 scope)"},
    // ... (line 199 = formerly :198 + 1)
    {"file": "docs/_glossary-android.md", "line": 199, "reason": "Phase 62 carry-over: line 198 shifted +1 (Phase 62 Plan 62-07 added Apple Business banner line at line 13); Phase 60 Plan 06: line 196 shifted +2 (Phase 60 #kme/#kpe HTML-shim insert at lines 127 and 134); Phase 59 carry-over: line 188 shifted +8 (Phase 59 CLEAN-08 net +7 + Version History row +1); Phase 34 Foundation Version History entry — 'supervision as callout-only' historical description of initial glossary scope"},
```

**Current v1.5 sidecar state** (verified by Grep at `v1.5-audit-allowlist.json:12-15` — DRIFTED, missing the +1):

```json
    {"file": "docs/_glossary-android.md", "line": 79, "reason": "Phase 59 carry-over: line 76 shifted +3 (Phase 59 CLEAN-08 added see-also lines to BYOD/UE/ZTE before COBO section, net +3); ### Supervision H3 heading (term being defined; iOS supervision callout; intentional AEAUDIT-04 pattern)"},
    {"file": "docs/_glossary-android.md", "line": 81, "reason": "Phase 59 carry-over: line 78 shifted +3 (same +3 shift); Android note blockquote for Supervision H3 — explains iOS/iPadOS supervision concept in cross-platform context (Apple-attributed citation; AEAUDIT-04 scope)"},
    {"file": "docs/_glossary-android.md", "line": 198, "reason": "..."},
```

**Plan 68-02 Wave 4 broad-rebase pattern (per RESEARCH §V-60-23 Diagnosis empirical confirmation — 9 supervision_exemptions[] entries + N c7_knox_allowlist[] entries + N cope_banned_phrases[] entries):**

Each `_glossary-android.md` entry's `line` field gains `+1`; each `reason` field gains the cross-reference `Phase 62 carry-over: line N shifted +1 (Phase 62 Plan 62-07 added Apple Business banner line at line 13)` prefix matching the v1.6 sidecar's attribution shape verbatim:

```json
// BEFORE (entry idx 0 — _glossary-android.md "### Supervision" H3)
{"file": "docs/_glossary-android.md", "line": 79, "reason": "Phase 59 carry-over: line 76 shifted +3 (Phase 59 CLEAN-08 added see-also lines to BYOD/UE/ZTE before COBO section, net +3); ### Supervision H3 heading (term being defined; iOS supervision callout; intentional AEAUDIT-04 pattern)"},

// AFTER (mirrors v1.6 sidecar entry idx 0 verbatim)
{"file": "docs/_glossary-android.md", "line": 80, "reason": "Phase 62 carry-over: line 79 shifted +1 (Phase 62 Plan 62-07 added Apple Business banner line at line 13); Phase 59 carry-over: line 76 shifted +3 (Phase 59 CLEAN-08 added see-also lines to BYOD/UE/ZTE before COBO section, net +3); ### Supervision H3 heading (term being defined; iOS supervision callout; intentional AEAUDIT-04 pattern)"},
```

**Empirical entry-index map (per RESEARCH §Verbatim Edit Targets Plan 68-02 Wave 4):**

| Array | Index range | Pre-edit `line` | Post-edit `line` | v1.6 source-truth |
|-------|-------------|-----------------|------------------|-------------------|
| `supervision_exemptions[]` | idx 0..8 (9 entries refrencing `_glossary-android.md`) | 79, 81, 181, 198, 16, 49, 69, 82, 195 | 80, 82, 182, 199, 17, 50, 70, 83, 196 | each +1 |
| `c7_knox_allowlist[]` | planner enumerates via diff | (e.g., :121 `### Knox` heading) | :122 | each +1 (banner at :13 also shifts these) |
| `cope_banned_phrases[]` | planner enumerates (empirical C9 FAIL at `_glossary-android.md:203`) | (e.g., :202) | :203 | each +1 |
| `safetynet_exemptions[]` | planner verifies — C1 already PASSes; rebase only if entries reference `_glossary-android.md:N` where N > 13 | check before edit | same +1 only if NOT already passing | conditional |

**Conventions preserved:**
- Single-line compact JSON per entry (matches v1.6 sidecar shape verbatim — no pretty-print expansion)
- `reason` field prepends the Phase 62 attribution PRIOR TO existing reason text (compositional — each shift attribution adds context, never replaces prior context)
- Array shape and length unchanged (only the `line` integer + `reason` string mutate per entry)
- Non-`_glossary-android.md` entries (e.g., `docs/android-lifecycle/00-enrollment-overview.md`, `docs/admin-setup-android/03-fully-managed-cobo.md`) are UNTOUCHED — banner is in `_glossary-android.md:13` only

**JSON-parse safety pattern (mandatory per Phase 67 67-PATTERNS.md sidecar pattern):**

```powershell
node -e "JSON.parse(require('fs').readFileSync('scripts/validation/v1.5-audit-allowlist.json','utf8')); console.log('OK')"
```

Run immediately after each entry edit; if not `OK`, do NOT `git add` — fix the broken brace/comma. `check-phase-48.mjs` V-48-02 fails fast on parse errors at line 42-45 (verified excerpt).

---

### `check-phase-{62,63,64,65,66}.mjs` (CHAIN-03 — atomic 5-file CHAIN_SKIP removal + canonical comment block update)

**Primary analog:** `scripts/validation/check-phase-64.mjs:54-73` (THE canonical CHAIN_SKIP rationale block per CONTEXT canonical-refs §"Source-of-truth root cause docs")

**Existing canonical block from `check-phase-64.mjs:54-73`** (verbatim — verified by Read):

```javascript
// Phases with known pre-existing failures that predate Plan 64-01 and are NOT regressions
// introduced by Phase 64 changes. These are skipped (not failed) in the chain regression-guard
// to prevent cascading false negatives. Phase 64 adds NO new entries to this skip list.
//
// Pre-existing failure root causes (documented for Phase 66 terminal re-audit):
//   48: (a) .planning/phases/ archived to .planning/milestones/v1.5-phases/ after v1.5 close
//           -- check-phase-48 hardcodes old path for 48-VERIFICATION-broken-links.md
//       (b) regenerate-supervision-pins.mjs --self-test fails due to _glossary-android.md
//           +1 line-number shift from Phase 62-06/62-07 banner additions; v1.5-audit-allowlist.json
//           also needs updating (tracked as out-of-scope for this plan; see deferred-items)
//   51: check-phase-51 Mermaid regex uses literal \n but docs/decision-trees/09-linux-triage.md
//       has CRLF line endings on this Windows worktree; CRLF-LF mismatch causes false FAIL
//   58: check-phase-58 frontmatter parse uses \n but docs/reference/4-platform-capability-comparison.md
//       has CRLF on this Windows worktree; CRLF-LF mismatch causes false FAIL
//   60: cascades from 48 + 51 + 58 + v1.5 harness C7/C9 line-number mismatch
//   61: cascades from 48 + 51 + 58 + 60 + v1.5 harness C7/C9 line-number mismatch
//
// Resolution path: Phase 66 terminal re-audit will run in a fresh Linux worktree where
// CRLF issues disappear; v1.5-audit-allowlist.json line-number rebase tracked in deferred-items.
const CHAIN_SKIP = new Set([48, 51, 58, 60, 61]);
```

**Variant block at `check-phase-66.mjs:45-64`** (DIVERGES — Phase 66 D-03 amendment per `v1.6-DEFERRED-CLEANUP.md:108`):

```javascript
// ... same body ...
// Phase 66 adds NO new entries; all Phase 66 deliverables are gated by V-66-01..V-66-07 + V-66-ABAUDIT-STALENESS in this validator.
// Resolution path: deferred to v1.7 CI-Linux job per v1.6-DEFERRED-CLEANUP.md (introduced Phase 66 Plan 66-03).
const CHAIN_SKIP = new Set([48, 51, 58, 60, 61]);
```

**Plan 68-03 atomic-commit replacement — UNIFORM template for all 5 files (per RESEARCH §Atomic Commit Surface "Recommended uniform replacement for ALL 5 doc-comment blocks"):**

```javascript
// CHAIN_SKIP topology: HISTORICAL — empty by Phase 68 CHAIN-03 close (sha {PLAN_68_03_SHA}).
//
// Pre-existing v1.5/v1.6-era failures {48, 51, 58, 60, 61} had been suppressed here pending
// root-cause resolution (documented at scripts/validation/check-phase-64.mjs:55-73 prior to
// Phase 68 close; full historical narrative in .planning/milestones/v1.6-DEFERRED-CLEANUP.md
// "CHAIN_SKIP Resolution" section).
//
// Phase 68 (Pillar B — Validator Surgery) resolved all 5 root causes:
//   - CHAIN-01: CRLF normalization in check-phase-{51,58}.mjs readFile() — sha {68_01_SHA}
//   - CHAIN-02: archive-path helper scripts/validation/_lib/archive-path.mjs across
//               check-phase-{31,48,60,62,63}.mjs + regenerate-supervision-pins.mjs
//               BASELINE_9 +1 banner-shift rebase + v1.5 sidecar supervision_exemptions[]
//               +1 coord rebase — sha {68_02_SHA}
//   - CHAIN-03: this atomic 5-file empty-Set commit — sha {68_03_SHA}
//   - MILESTONES.md cdcce23 garbage v1.5 H2 entry deletion (V-61-19/20 PASS) — sha {68_04_SHA}
//
// Full chain check-phase-{48..66}.mjs exits 0 on Windows host with NO CHAIN_SKIP entries
// for the first time since v1.5 close. Phase 68 close-gate: sha {68_05_SHA}.
const CHAIN_SKIP = new Set([]);
```

**Per-file CHAIN_SKIP declaration line locations (empirically verified — RESEARCH §Target Validator Inventory):**

| File | CHAIN_SKIP line | Comment block range | Header phrasing variant |
|------|-----------------|---------------------|--------------------------|
| `check-phase-62.mjs` | 66 | 47-66 | Standard ("Phase 66 terminal re-audit") |
| `check-phase-63.mjs` | 73 | 54-73 | Standard |
| `check-phase-64.mjs` | 73 | 54-73 | **CANONICAL** |
| `check-phase-65.mjs` | 69 | 49-69 | Standard |
| `check-phase-66.mjs` | **64** (NOT 73 — resolves Claude's-discretion question per RESEARCH §Summary key finding #5) | 45-64 | **DIVERGES** ("v1.7 CI-Linux job per v1.6-DEFERRED-CLEANUP.md") |

**Conventions preserved:**
- The `const CHAIN_SKIP = new Set([])` declaration shape preserves V-NN-SELF assertion compatibility (the assertion `phaseNum not in CHAIN_PHASES` is independent of `CHAIN_SKIP` contents)
- V-66-07 substring assertion at `check-phase-66.mjs:198` for `v1.6-DEFERRED-CLEANUP.md` containing `CHAIN_SKIP` continues to PASS (Plan 68-03 does NOT touch that file; token appears at multiple positions per RESEARCH §V-66-07 compatibility check)
- The 4 SHA placeholders (`{68_01_SHA}` etc.) are filled by the Plan 68-05 close-gate author from `git log` post-commit
- 5 files in ONE git SHA (per Phase 66-02 `3a9a671` precedent — see Shared Patterns §"Atomic Multi-File Commit Topology" below)

---

### `.planning/MILESTONES.md` (Plan 68-04 — cdcce23 garbage-entry deletion)

**Analog:** SELF-internal — the correct entry already lives at `.planning/MILESTONES.md:73-92` (authored by commit `965f509` `docs(61-05): MILESTONES.md v1.5 entry append`); the garbage at lines 3-70 was inserted by `cdcce23` `chore: archive v1.5 milestone files`.

**Pre-edit state** (empirically verified per RESEARCH §MILESTONES.md cdcce23 Defect):

```
$ wc -l .planning/MILESTONES.md
208 .planning/MILESTONES.md

$ grep -n "^## v1.5" .planning/MILESTONES.md
3:## v1.5 Linux Platform, Operational Depth & Cross-Platform Cleanup (Shipped: 2026-05-08)   # <-- garbage (cdcce23)
73:## v1.5 Linux Platform, Operational Depth & Cross-Platform Cleanup (Shipped: 2026-05-07)  # <-- correct (965f509)
```

**Garbage body at lines 5-30 sample** (per RESEARCH §"Lines 3-71 content sample"):

```markdown
**Phases completed:** 14 phases, 101 plans, 70 tasks

**Key accomplishments:**

- One-liner:
- SUBSUMED BY PLAN 48-01.
- SUBSUMED BY PLAN 48-01.
- One-liner:
- One-liner:
...
- File:
- Hash:
- Total file size:
- NO COMMIT MADE.
```

This is scripted-extraction debris — archive automation extracted the placeholder labels (`One-liner:`, `Hash:`, `Pre-edit:`) instead of bullet content.

**Correct entry at lines 73-92** (preserved verbatim — Phase 68 untouched):

```markdown
## v1.5 Linux Platform, Operational Depth & Cross-Platform Cleanup (Shipped: 2026-05-07)

**Phases completed:** 14 phases (48-61), 96+ plans, ~150 tasks

**Audit status:** passed (.planning/milestones/v1.5-MILESTONE-AUDIT.md...)

**Key accomplishments:**
- [4 Pillar bullet sections]

**v1.4.1 deferred items closed:** DEFER-07 ... DEFER-08

**Known deferred items at close...**

**Methodology highlights:** Wave-based parallel execution...
```

**Plan 68-04 byte-range deletion pattern:**

| Operation | Range | Lines deleted | Post-state |
|-----------|-------|---------------|-----------|
| DELETE | lines 3 through 71 inclusive | 69 lines | `wc -l` = 138 (was 208); single `^## v1.5` H2 at new line 3 |

**Verification commands** (verbatim from RESEARCH §Verification Harness Plan 68-04):

```powershell
# Pre-edit:
(Get-Content .planning/MILESTONES.md).Count                              # Expected: 208
Select-String -Path .planning/MILESTONES.md -Pattern "^## v1.5"          # Expected: 2 matches at lines 3, 73
sed -n '69,75p' .planning/MILESTONES.md                                  # Expected: boundary inspection — confirm line 71 is the separator before line 73 H2

# Post-edit:
(Get-Content .planning/MILESTONES.md).Count                              # Expected: 138
Select-String -Path .planning/MILESTONES.md -Pattern "^## v1.5"          # Expected: 1 match at line 3
node scripts/validation/check-phase-61.mjs 2>&1 | Select-String "V-61-19|V-61-20"  # Expected: both PASS
```

**Conventions preserved:**
- No content authoring — this is a pure byte-range deletion (per CONTEXT D-04 "V-61-19/20 NOT content gaps … Fix = surgical deletion of lines 3-71. Zero content authoring.")
- Frontmatter `last_verified:` semantics preserved (the surviving correct entry's date stays `Shipped: 2026-05-07` — that is the authoritative one per `git log 965f509`; the garbage entry's `Shipped: 2026-05-08` was the cdcce23 archive-script's internal timestamp)
- Per RESEARCH §Assumptions Log #A3 + #A5: planner runs `sed -n '69,75p'` for byte-exact pre-delete boundary verification before committing

---

### `.planning/milestones/v1.7-DEFERRED-CLEANUP.md` (Plan 68-05 — NEW stub)

**Analog:** `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` (authored 2026-05-25 commit `c7a3973` per `docs(66-03)`)

**Existing v1.6 file's frontmatter + opening pattern** (verbatim from `.planning/milestones/v1.6-DEFERRED-CLEANUP.md:1-11`):

```markdown
# v1.6 Deferred Cleanup — v1.7+ Backlog

**Authored:** 2026-05-25
**Milestone:** v1.6 (Apple Business Delegated Governance & Multi-Org Operations)
**Status:** open
**Cross-link from:** `.planning/milestones/v1.6-MILESTONE-AUDIT.md` `deferred_items` (Wave 5 deliverable)
**Authoring rationale:** v1.6 introduces a standalone deferred-cleanup artifact (no v1.5 equivalent — v1.5 carried `deferred_items` inline inside `v1.5-MILESTONE-AUDIT.md`) per `ROADMAP.md:242` + `REQUIREMENTS.md:64` AUDIT-15 contract.

**Trigger-to-sweep:** Each section below carries explicit criteria for when v1.7+ should pick up the work. The quarterly `audit-harness-v1.6-integrity.yml` `rotting-external-quarterly` job (cron `0 8 1 1,4,7,10 *`) actively monitors the CI-1 surface for drift; CI-2 + CI-3 + CHAIN_SKIP-CRLF + Other Deferrals are passive backlog (no automated probing — surfaced for v1.7 entry-phase planning).

---
```

**Per-section pattern** (v1.6-DEFERRED-CLEANUP.md:13-37 = CI-1 section):

```markdown
## CI-1: ABM URL Corpus Sweep

**Scope:** [1 sentence describing the deferred item]
**Source-of-truth:** [pointer to PITFALLS.md / advisor dossier / origin commit]

**Calibration finding (Phase 66 measurement at HEAD `ad5c9c9`):** [empirical data]

**Enumerated entries** [optional table if granular]

**Quarterly audit:** [if applicable — cron schedule]

**Trigger-to-sweep:** Any of:
- [criterion 1]
- [criterion 2]
- [criterion 3]

**Estimated effort:** [time estimate]

---
```

**Phase 68 stub adaptation** (frontmatter + minimum 2 sections per CONTEXT §Deferred Ideas discovered-during-Phase-68 items):

```markdown
# v1.7 Deferred Cleanup — v1.8+ Backlog

**Authored:** 2026-05-26
**Milestone:** v1.7 (Linux & Validator Hardening + Apple Business Continued)
**Status:** open
**Cross-link from:** `.planning/phases/68-chain-skip-root-cause-resolution-pillar-b-validator-surgery/68-VERIFICATION.md` Discoveries section

**Authoring rationale:** v1.7 introduces a standalone deferred-cleanup artifact (parallels v1.6-DEFERRED-CLEANUP.md authored at Phase 66-03 commit `c7a3973`) per `ROADMAP.md:242` + `REQUIREMENTS.md:64` AUDIT-15 lineage. Initial stub created at Phase 68 close per CONTEXT D-04 §"Deferred Ideas / Discovered during Phase 68 discussion"; Phase 70 HARNESS-06 will extend with final v1.7 backlog at milestone close.

---

## ARCHIVE-01: cdcce23 archive-script garbage-insert root cause

**Scope:** Investigate why commit `cdcce23` (`chore: archive v1.5 milestone files`, 2026-05-07) inserted a duplicate v1.5 H2 entry at `.planning/MILESTONES.md` lines 3-70 — scripted-extraction debris (`One-liner:`, `Hash:`, `NO COMMIT MADE.` placeholders) rather than actual bullet content from per-plan SUMMARY files.

**Source-of-truth:** Phase 68 Plan 68-04 SUMMARY + 68-VERIFICATION.md Discoveries section; commit `cdcce23` git log.

**Symptom (Phase 68 fixed; root cause deferred):** Plan 68-04 DELETED lines 3-71 — surgical symptom fix. Root cause likely lives in `.claude/commands/gsd-complete-milestone.md` or related archive-automation skill.

**Trigger-to-sweep:** Phase 70 v1.7 milestone-archival MAY re-trigger the same defect; Plan 70 author MUST `git diff HEAD~1 HEAD -- .planning/MILESTONES.md` after archive runs to detect recurrence.

**Estimated effort:** 1-2h (skill source inspection + regression test).

---

## CHAIN-31: check-phase-31.mjs silent-swallow data-integrity bug (CLOSED)

**Scope:** Pre-existing bug where `parseInventory()` at `check-phase-31.mjs:32-33` silently returned `{ placeholders: [] }` on missing `placeholder-inventory.json` instead of failing.

**Status:** CLOSED in Phase 68 Plan 68-02 Wave 2 (STRETCH per D-02 advisor) via `_missing` marker + caller-decides FAIL semantics through `resolveArchivedPhasePath()` helper. Recorded here for audit-trail completeness — no v1.8+ pickup required.

**No trigger; no effort.**

---

## (Additional sections — Phase 70 HARNESS-06 author extends as needed)
```

**Conventions preserved (mirrors v1.6 analog):**
- Header `# vN.M Deferred Cleanup — vN.M+1+ Backlog` shape
- `**Authored:**` / `**Milestone:**` / `**Status:** open` / `**Cross-link from:**` / `**Authoring rationale:**` frontmatter block
- Per-section: H2 with prefixed ID (`## ARCHIVE-01`, `## CHAIN-31`, etc.) + Scope/Source-of-truth/Trigger-to-sweep/Estimated-effort structure
- `---` horizontal rule between sections
- Closed-in-this-phase items get a `(CLOSED)` H2 suffix and skip Trigger/Effort fields per audit-trail completeness convention

---

### `.planning/phases/68-.../68-VERIFICATION.md` (Plan 68-05 — close-gate artifact)

**Primary analog:** `.planning/phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/67-VERIFICATION.md` (Phase 67 close-gate format Plan 68-05 inherits)

**Secondary analog:** `.planning/milestones/v1.6-phases/66-apple-business-validation-tooling-closure-milestone-audit/66-VERIFICATION.md` (V-NN Final State table format)

**YAML frontmatter pattern (verbatim from Phase 67 67-VERIFICATION.md:1-21):**

```yaml
---
phase: 67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up
verified: 2026-05-26
status: passed
score: 4/4 SC satisfied (SWEEP-01 + SWEEP-02 closure)
v67_final_state: "15/15 PASS (harness) + 19 PASS / 4 FAIL / 5 SKIPPED (check-phase-66.mjs); CHAIN_SKIP = {48,51,58,60,61} identical to v1.6 close (66-VERIFICATION.md:113); 4 FAIL are pre-existing V-62-ANCHORS archive-path cascade unrelated to Phase 67 — Phase 68 CHAIN-02 scope"
overrides_applied: 0
re_verification:
  previous_status: in-progress
  previous_score: 2/3 plans complete
  gaps_closed: []
  gaps_remaining: []
  regressions: []
verifier_cross_check:
  verified: 2026-05-26
  verifier: Claude (gsd-verifier)
  status: passed
  goal_backward_evidence_count: 14 must-have truths verified against the codebase
  observations:
    - "Discovery #1 enumeration in this artifact lists 3 sites …; a 4th occurrence at line 160 … is NOT enumerated. Minor underclaim — not goal-breaking; suggest including in v1.7-DEFERRED-CLEANUP.md CI-2-CONTINUATION pickup."
---
```

**Phase 68 frontmatter adaptation:**

```yaml
---
phase: 68-chain-skip-root-cause-resolution-pillar-b-validator-surgery
verified: 2026-05-26
status: passed
score: 5/5 SC satisfied (CHAIN-01 + CHAIN-02 + CHAIN-03 + MILESTONES.md cdcce23 fix + close-gate)
v68_final_state: "Full chain check-phase-{48..66}.mjs exits 0 on Windows host with 0 SKIPPED — first time since v1.5 close. v1.5-milestone-audit.mjs 12/12 PASS; v1.6-milestone-audit.mjs 15/15 PASS (unchanged); regenerate-supervision-pins.mjs --self-test PASS."
overrides_applied: 0
re_verification:
  previous_status: in-progress
  previous_score: 4/5 plans complete
  gaps_closed: []
  gaps_remaining: []
  regressions: []
---
```

**Per-CHAIN section pattern** (Phase 67 SWEEP-01/02 section format adapted for Phase 68's CHAIN-NN deliverables):

```markdown
## CHAIN-01: CRLF Normalization in check-phase-{51,58}.mjs (2026-05-26)

### Mechanism
Centralized `.replace(/\r\n/g, '\n')` in `readFile()` body per CONTEXT D-01 Option B. Verbatim idiom copied from `check-phase-48.mjs:25` + `check-phase-60.mjs:24` + `regenerate-supervision-pins.mjs:77` (Phase 31 `ca40eb9` lineage). 2-line edit total.

### Edit Surface
| # | File:Line | BEFORE | AFTER |
|---|-----------|--------|-------|
| 1 | check-phase-51.mjs:17 | `return readFileSync(abs, 'utf8');` | `return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');  // CRLF normalization (CHAIN-01)` |
| 2 | check-phase-58.mjs:21 | same BEFORE | same AFTER |

### Verification
- `node scripts/validation/check-phase-51.mjs` exit 0 (25/25 PASS — preserved from pre-edit baseline)
- `node scripts/validation/check-phase-58.mjs` exit 0 (26/26 PASS — preserved)

### Plan 68-01 commit SHA: `{68_01_SHA}`

### SC#1 Closure
INTENT-equivalence per D-01 dossier: read-time CRLF normalization renders all `\n` regex literals equivalent to `\r?\n` semantically. Phase 67 D-04 precedent applied — narrow letter-grep of `\r?\n` would have injected ~9 semantic-bug edits to `[^\n]*` negated character classes that are NOT line-ends. Option B is the proven defense-in-depth.

---

## CHAIN-02: archive-path helper + self-test lineage repoint + v1.5 sidecar broad rebase (2026-05-26)

[similar mechanism + edit surface + verification + plan SHA + SC closure sections]

---

## CHAIN-03: ATOMIC 5-file CHAIN_SKIP removal (2026-05-26)

[atomic-commit emphasis; cite Phase 66-02 `3a9a671` precedent + 5-file table]

---

## MILESTONES.md cdcce23 Garbage-Entry Deletion (Plan 68-04, 2026-05-26)

[per RESEARCH §MILESTONES.md cdcce23 Defect section format]

---

## Section B — Commands Run + Exit Codes (Plan 68-05 Wave 1 chain re-run, 2026-05-26)

| Command | Exit Code | Summary Line |
|---------|-----------|--------------|
| `node scripts/validation/v1.6-milestone-audit.mjs` | 0 | `Summary: 15 passed, 0 failed, 0 skipped` |
| `node scripts/validation/v1.5-milestone-audit.mjs` | 0 | `Summary: 12 passed, 0 failed, 0 skipped` (NEW — was 9/3 pre-Plan-68-02) |
| `node scripts/validation/regenerate-supervision-pins.mjs --self-test` | 0 | `Self-test: PASS` (NEW — was FAIL pre-Plan-68-02) |
| `node scripts/validation/check-phase-48.mjs` | 0 | `Result: 7 PASS, 0 FAIL, 0 SKIPPED` (NEW — was 5/2/0 pre-Plan-68-02) |
| `node scripts/validation/check-phase-60.mjs` | 0 | `Result: 25 PASS, 0 FAIL, 0 SKIPPED` (NEW — was 22/3/0 pre-Plan-68-02) |
| `node scripts/validation/check-phase-61.mjs` | 0 | `Result: 34 PASS, 0 FAIL, 0 SKIPPED` (NEW — was 32/2/0 pre-Plan-68-04) |
| `node scripts/validation/check-phase-62.mjs` | 0 | `Result: 30 PASS, 0 FAIL, 0 SKIPPED` (NEW — CHAIN_SKIP empty per Plan 68-03) |
| `node scripts/validation/check-phase-{63..66}.mjs` | 0 each | (same shape; 0 SKIPPED on each — first time since v1.5 close) |

---

## Atomic-Commit SHA Record

| Component | SHA | File count | Atomicity |
|-----------|-----|------------|-----------|
| Plan 68-01 (CHAIN-01) | `{68_01_SHA}` | 2 | per-plan (not atomic-required) |
| Plan 68-02 (CHAIN-02) | `{68_02_SHA}` | 8 | per-plan |
| **Plan 68-03 (CHAIN-03)** | `{68_03_SHA}` | **5** | **ATOMIC (single SHA per Phase 66-02 `3a9a671` precedent + ROADMAP SC#4)** |
| Plan 68-04 (MILESTONES.md) | `{68_04_SHA}` | 1 | per-plan |
| Plan 68-05 (close-gate) | `{68_05_SHA}` | ~5 | per-plan |

---

## Discoveries (for v1.7-DEFERRED-CLEANUP.md)

1. **`cdcce23` archive-script garbage-insert root cause** — flagged for v1.8+ investigation (see `.planning/milestones/v1.7-DEFERRED-CLEANUP.md` § ARCHIVE-01)
2. **`check-phase-31.mjs` silent-swallow data-integrity bug** — CLOSED in this phase via Plan 68-02 Wave 2 STRETCH (see v1.7-DEFERRED-CLEANUP.md § CHAIN-31 (CLOSED))

---

## Phase 69 Readiness Signal

CHAIN_SKIP topology cleared; v1.6 + v1.5 audit harnesses both green; helper `scripts/validation/_lib/archive-path.mjs` established as first inhabitant of shared-helpers subdirectory. Phase 69 (Pillar C — CILINUX-01) inherits a clean validator baseline for ubuntu-latest runner integration.

**Phase 70 (Pillar D — HARNESS-01..06) coordination notes:**
- HARNESS-02 BASELINE_11 refresh: 1-line edit at `regenerate-supervision-pins.mjs:422` repointing v1.6→v1.7 sidecar
- HARNESS-03 Path-A copy of `check-phase-66.mjs` → `check-phase-{67..70}.mjs`: inherits `_lib/archive-path.mjs` reference by suffix-match
- `check-phase-68.mjs` self-verifier: MUST verify CHAIN-01 via INTENT (substring grep of `.replace(/\\r\\n/g, '\\n')` in check-phase-{51,58} source) NOT via literal-letter grep of `\r?\n` — per RESEARCH §Edge Cases #3
- Plan 70 author MUST audit `.planning/MILESTONES.md` post-archival to detect cdcce23 defect recurrence
```

**Conventions preserved:**
- YAML frontmatter with `phase` / `verified` / `status` / `score` / `vNN_final_state` / `overrides_applied` / `re_verification` block
- Per-deliverable H2 section with Mechanism / Edit Surface / Verification / Plan SHA / SC Closure subsections (Phase 67 SWEEP-NN format)
- "Section B — Commands Run + Exit Codes" H2 table (Phase 65 65-VERIFICATION.md:114-124 + Phase 67 67-VERIFICATION.md:185-198 precedent)
- "Atomic-Commit SHA Record" table (Phase 68-novel — uses the Plan 67-02 single-SHA citation pattern but emphasizes Plan 68-03's atomicity per Phase 66-02 `3a9a671` precedent)
- "Discoveries" + "Phase NN Readiness Signal" sections (Phase 67 close-gate precedent)

---

## Shared Patterns

### Atomic Multi-File Commit Topology (Plan 68-03 ONLY)

**Source:** v1.6 Phase 66-02 commit `3a9a671` (full message captured below) + STATE.md:111-112 (atomic-commit-precedent attribution)

**Apply to:** Plan 68-03 ONLY (per ROADMAP SC#4 + CONTEXT D-04 §"Atomic-commit topology preserved for CHAIN-03 specifically"). Plans 68-01, 68-02, 68-04, 68-05 are per-plan-per-requirement boundaries (Phase 67 D-04 score E=7 precedent inherited).

**Phase 66-02 atomic-commit message format (3 files indivisible — `git log -1 --format=%B 3a9a671`):**

```
feat(66-02): AUDIT-14 atomic harness commit — C11 +6 LOCKED tokens / c13_rotting_external populated / BASELINE_10 freshness / regex-7 synthetic back-port

Lands AUDIT-14 contract per REQUIREMENTS.md:63 + ROADMAP.md:239 in ONE indivisible commit per v1.5 Plan 60-08 / Phase 62-08 atomic-commit precedent (STATE.md:111-112).

Components (all in one commit; full chain exits 0 modulo Wave-3/5 V-66-05/06/07):
- v1.6-milestone-audit.mjs: windowKeywords +6 LOCKED C11 tokens ... at line 577 per ROADMAP:239; synthetic regex 7 back-port at line 854 ...
- v1.6-audit-allowlist.json: c13_rotting_external populated as object with ci_1_abm_urls ...
- regenerate-supervision-pins.mjs: BASELINE_10 freshness comment block inserted at ~line 398 ...

[Deviation note + Co-location confirmation + Pre-commit dry-run protocol summary + Reverts cleanly via citation]

Reverts cleanly via: git revert <SHA>

AUDIT-14
```

**Plan 68-03 atomic-commit adaptation:**

```
fix(68-03): atomically remove CHAIN_SKIP {48,51,58,60,61} from check-phase-62..66 (CHAIN-03)

Lands CHAIN-03 contract per REQUIREMENTS.md:22 + ROADMAP.md SC#4 in ONE indivisible commit per Phase 66-02 atomic-commit precedent `3a9a671` (STATE.md:111-112).

Components (all in one commit; full chain check-phase-{48..66}.mjs exits 0 with 0 SKIPPED):
- check-phase-62.mjs:66 CHAIN_SKIP = new Set([])  (was [48,51,58,60,61]) + canonical comment block rewrite
- check-phase-63.mjs:73 CHAIN_SKIP = new Set([]) + comment block rewrite
- check-phase-64.mjs:73 CHAIN_SKIP = new Set([]) + comment block rewrite (this file held the canonical pre-Phase-68 narrative; now superseded)
- check-phase-65.mjs:69 CHAIN_SKIP = new Set([]) + comment block rewrite
- check-phase-66.mjs:64 CHAIN_SKIP = new Set([]) + comment block rewrite (this file held the Phase 66 D-03 "v1.7 CI-Linux job" variant; now normalized)

Atomicity rationale: partial removal would create an inconsistent CHAIN_SKIP topology where 62 still suppresses while 66 doesn't — chain-validator indivisibility per ROADMAP SC#4 contract.

Pre-commit dry-run protocol: 19 validators check-phase-{48..66}.mjs all exit 0; v1.5-milestone-audit.mjs 12/12 PASS; v1.6-milestone-audit.mjs 15/15 PASS; regenerate-supervision-pins.mjs --self-test PASS — captured in Plan 68-05 close-gate 68-VERIFICATION.md Section B.

Reverts cleanly via: git revert <SHA>  (restores CHAIN_SKIP suppression across all 5 v1.6 validators atomically)

CHAIN-03
```

**Conventions preserved:**
- Commit subject `fix(68-03): atomically …` mirrors Phase 66-02's `feat(66-02): …` shape
- Cite Phase 66-02 `3a9a671` precedent + STATE.md:111-112 lineage
- Component bullets list each file:line with BEFORE/AFTER hint
- Atomicity rationale paragraph (this is the doctrine-citation moment)
- Pre-commit dry-run protocol summary
- "Reverts cleanly via" line for explicit rollback semantics
- Trailing requirement ID (`CHAIN-03`) for audit-trail grep

---

### Pre-Commit Dry-Run Triple (Validator Surgery)

**Source:** Phase 67 67-PATTERNS.md §"Pre-Commit Dry-Run Triple" + Phase 66-02 commit-message pre-commit-dry-run protocol clause

**Apply to:** Every Plan 68-NN before `git add`

```powershell
# Plan 68-01 specific:
node scripts/validation/check-phase-51.mjs ; if ($LASTEXITCODE -ne 0) { Write-Error "DRY-RUN STEP 1 FAILED" }
node scripts/validation/check-phase-58.mjs ; if ($LASTEXITCODE -ne 0) { Write-Error "DRY-RUN STEP 2 FAILED" }

# Plan 68-02 specific:
node scripts/validation/regenerate-supervision-pins.mjs --self-test ; if ($LASTEXITCODE -ne 0) { Write-Error "SELF-TEST FAILED" }
node scripts/validation/check-phase-48.mjs ; if ($LASTEXITCODE -ne 0) { Write-Error "V-48 FAILED" }
node scripts/validation/v1.5-milestone-audit.mjs ; if ($LASTEXITCODE -ne 0) { Write-Error "V1.5 HARNESS FAILED" }
node scripts/validation/check-phase-31.mjs ; if ($LASTEXITCODE -ne 0) { Write-Error "V-31 FAILED (STRETCH)" }

# Plan 68-03 specific (full chain — atomic-commit gate):
foreach ($p in 48..66) {
  if (Test-Path "scripts/validation/check-phase-$p.mjs") {
    node scripts/validation/check-phase-$p.mjs ; if ($LASTEXITCODE -ne 0) { Write-Error "FAIL on phase $p" }
  }
}

# Plan 68-04 specific:
node scripts/validation/check-phase-61.mjs ; if ($LASTEXITCODE -ne 0) { Write-Error "V-61-19/20 FAILED" }

# Plan 68-05 specific (close-gate — full battery):
[all of the above]
node scripts/validation/v1.6-milestone-audit.mjs ; # Expected: 15/15 PASS unchanged
```

**Expected:** Each `if ($LASTEXITCODE -ne 0)` branch returns silently; no `Write-Error` triggered. If any branch fires, do NOT `git add` — diagnose the regression first.

---

### JSON Parse Guard (Sidecar Edit Safety) — Phase 67 inheritance

**Source:** Phase 67 67-PATTERNS.md §"JSON Parse Guard"; mandatory pattern for any `*.json` sidecar edit

**Apply to:** Plan 68-02 Wave 4 (`v1.5-audit-allowlist.json` broad rebase — 9+ entries across 3-4 array keys)

```powershell
# After every entry edit (or batch of entries within one array key):
node -e "JSON.parse(require('fs').readFileSync('scripts/validation/v1.5-audit-allowlist.json','utf8')); console.log('OK')"
```

If output is not `OK`, do NOT proceed — the JSON has a syntax error from the most-recent edit (trailing-comma drift on broad-rebase is the highest risk).

```powershell
# After full Wave 4 batch — verify diff scope:
git diff scripts/validation/v1.5-audit-allowlist.json | Select-String '^[-+]' | Measure-Object
```

Expected diff line count: ~18-30 changed lines (9 supervision entries × 2 lines each [old line+old reason → new line+new reason] = 18 minimum + c7_knox + cope batches). If diff shows ENTIRE file changed, CRLF/LF line-endings drifted — revert and re-edit with LF.

---

### Frontmatter Bumps (NOT applicable in Phase 68 — recorded for completeness)

**Note per CONTEXT.md `<specifics>` line 318:** "Frontmatter `last_verified:` bumps NOT needed (no corpus edits; Plan 68-04 is a deletion of garbage, not a content edit — preserves original v1.5 entry's `last_verified` semantics)."

Phase 68 touches NO `docs/*` corpus files. The v1.5 sidecar JSON has no frontmatter. The MILESTONES.md edit is a deletion of garbage (the surviving correct entry's metadata is byte-identical). The `_lib/archive-path.mjs` is a new .mjs file (no markdown frontmatter convention).

**Phase 67's frontmatter-bump shared pattern does NOT apply here.**

---

### Per-Plan Commit Message Convention

**Source:** Phase 66/67 commit history + CONTEXT D-04 §"Recommended plan-and-commit layout" lines 149-217

**Phase 68 commit message templates** (per CONTEXT D-04):

```
fix(validation): centralize CRLF normalization in check-phase-51 + 58 (CHAIN-01)
[Plan 68-01]

fix(validation): archive-path helper + self-test lineage repoint + v1.5 sidecar coord rebase (CHAIN-02)
[Plan 68-02]

fix(validation): atomically remove CHAIN_SKIP {48,51,58,60,61} from check-phase-62..66 (CHAIN-03)
[Plan 68-03 — ATOMIC; expanded body per "Atomic Multi-File Commit Topology" section above]

fix(planning): remove duplicate v1.5 MILESTONES entry inserted by cdcce23 archive automation (Phase 68-04)
[Plan 68-04]

docs(68-05): Phase 68 close-gate — chain green + 68-VERIFICATION.md + traceability flips
[Plan 68-05]
```

**Conventions:**
- `fix(scope): subject` for validator/code edits; `docs(NN-NN): subject` for close-gate / documentation-only
- Trailing requirement ID in parentheses (`(CHAIN-01)`) for audit-trail grep
- Plan 68-03's atomic message uses the FULL expanded body per Phase 66-02 `3a9a671` template (rationale + components + atomicity + dry-run protocol + reverts-cleanly + trailing requirement ID)
- Other plans use single-line subject sufficient for `git log --oneline` clarity

**Rollback semantics (per CONTEXT.md D-04 §"Rollback semantics" lines 220-221):**
- `git revert <Plan 68-03 SHA>` cleanly restores CHAIN_SKIP suppression across all 5 v1.6 validators (full atomicity)
- `git revert <Plan 68-04 SHA>` independently re-inserts the cdcce23 garbage entry (separate concern)
- Each Plan 68-01 + 68-02 revert restores its validator surgery independently

---

### Chain Validator Re-Run + Exit-Code Capture

**Source:** Phase 67 67-PATTERNS.md §"Chain Validator Re-Run + Exit-Code Capture" + Phase 65/66 VERIFICATION.md Section B precedents

**Apply to:** Plan 68-05 Wave 1 (close-gate full-chain verification)

```powershell
# Plan 68-05 Wave 1 — full chain via check-phase-66.mjs (subprocesses 48..65 internally)
& node scripts/validation/check-phase-66.mjs --verbose 2>&1 | Tee-Object -Variable chainOutput -FilePath .planning/phases/68-chain-skip-root-cause-resolution-pillar-b-validator-surgery/_tmp-chain-output.txt

# Expected: exit 0; 0 SKIPPED in the summary; CHAIN_SKIP = [] in the verbose output
```

**Phase 68 expected end state** (first time since v1.5 close):
- `v1.6-milestone-audit.mjs` — exit 0, 15/15 PASS (regression-free)
- `v1.5-milestone-audit.mjs` — exit 0, 12/12 PASS (NEW — was 9/3 pre-Plan-68-02)
- `regenerate-supervision-pins.mjs --self-test` — exit 0 (NEW — was FAIL)
- `check-phase-{48..66}.mjs` — every validator exits 0; **0 SKIPPED** entries reported

---

## No Analog Found

### `_lib/` subdirectory structure under `scripts/validation/`

**Phase 68 introduces the first shared-helper subdirectory.** No precedent — every existing helper function lives inline in its consuming validator (the duplicated `readFile()` pattern across 4+ files is the symptom this resolves). Future v1.7+ helpers (CRLF-aware path resolution, sidecar coord rebase utilities) may colocate here per CONTEXT D-02 §"Note on `_lib/` subdirectory" + RESEARCH §Deferred Ideas "Helper indirection precedent."

**Risk assessment:**
- **Import portability:** ESM `import { ... } from './_lib/archive-path.mjs'` — forward-slash convention; Node resolves cross-platform on Windows / Linux / macOS. Existing validators already use forward-slash string-literal paths against the filesystem (`.planning/phases/...`). No portability concern.
- **Path-traversal:** Helper input is a static string from validator source — not user-supplied. Per RESEARCH §Security Domain V14 Configuration scope.
- **Auditor independence at fresh-clone re-audit:** Helper is filesystem-pure (no network, no shell, no eval). Works transparently under `git clone --no-hardlinks` per CONTEXT D-02 §"Auditor-independence at Phase 70 fresh-clone."

**Forward inheritance:** Phase 70 HARNESS-03 Path-A copy of `check-phase-66.mjs` → `check-phase-{67..70}.mjs` will inherit `_lib/` reference by suffix-match — no special handling required per RESEARCH §Edge Cases #3 + §Deferred Ideas "Helper indirection precedent."

### Broad-rebase of multiple sidecar array keys in a single commit

**Phase 68 introduces broad-rebase across `supervision_exemptions[]` + `c7_knox_allowlist[]` + `cope_banned_phrases[]` (potentially `safetynet_exemptions[]`) for `_glossary-android.md` entries in one Plan 68-02 Wave 4 atomic-within-plan commit.** Prior precedents (Phase 66-02 `3a9a671`) rebased a single sidecar key (`c13_rotting_external`). The broad-rebase scope expansion is RESEARCH §Open Question #2 + CONTEXT D-04 §"broad reading" — required by V-60-23's empirical 3-FAIL output (C2 + C7 + C9 all FAIL).

**No precedent for the broad-rebase shape; the per-entry annotation pattern (within each array) inherits Phase 66-02 `3a9a671` ANNOTATE-not-remove semantics + Phase 67 D-04 sidecar-edit topology.** Plan 68-02 Wave 4 author enumerates exact entries via `node -e "..."` cross-table diff against v1.6 sidecar before rebasing.

---

## Metadata

**Analog search scope:**
- `scripts/validation/check-phase-{31,48,51,58,60,62,63,64,65,66}.mjs` (10 chain + orphan validators, all probed for line numbers + idioms)
- `scripts/validation/regenerate-supervision-pins.mjs` (helper-mode test runner; BASELINE_9 + parseAllowlist + self-test mode)
- `scripts/validation/v1.5-audit-allowlist.json` + `scripts/validation/v1.6-audit-allowlist.json` (sidecar JSON shape + supervision_exemptions[] entry attribution comparison)
- `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` (deferred-cleanup artifact format precedent)
- `.planning/phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/67-VERIFICATION.md` (close-gate format precedent)
- `.planning/phases/67-corpus-surgical-sweeps-pillar-a-low-risk-warm-up/67-PATTERNS.md` (pattern-mapping format precedent — this document mirrors its shape)
- `.planning/MILESTONES.md` (cdcce23 garbage entry + correct entry empirical comparison)
- Git log for commits `3a9a671` (Phase 66-02 atomic-commit) + `c7a3973` (v1.6-DEFERRED-CLEANUP.md authoring) + `cdcce23` (the garbage-insert origin) + `965f509` (the correct v1.5 MILESTONES entry author)

**Files scanned:** 17 (10 validators + 1 helper + 2 sidecars + 1 deferred-cleanup precedent + 1 VERIFICATION precedent + 1 PATTERNS precedent + 1 MILESTONES + git log inspection)

**Read-only constraint honored:** Zero source files modified by this pattern-mapping step. Only `68-PATTERNS.md` written.

**Pattern extraction date:** 2026-05-26
