# Phase 72: Chain-Wrapper Hardening (Pillar B) - Pattern Map

**Mapped:** 2026-06-06
**Files analyzed:** 12 (7 code + 5 planning)
**Analogs found:** 12 / 12

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `scripts/validation/check-phase-66.mjs` (modify line 312-317) | validator/subprocess-wrapper | event-driven error capture | `check-phase-66.mjs:332-333` (AUDIT wrapper, same file) | exact — intra-file parity fix |
| `scripts/validation/check-phase-67.mjs` (modify line 272-277) | validator/subprocess-wrapper | event-driven error capture | `check-phase-67.mjs:293-299` (AUDIT wrapper, same file) | exact — uniform peer pattern |
| `scripts/validation/check-phase-68.mjs` (modify line 277-282) | validator/subprocess-wrapper | event-driven error capture | `check-phase-68.mjs` AUDIT wrapper (same file) | exact — uniform peer pattern |
| `scripts/validation/check-phase-69.mjs` (modify line 193-198) | validator/subprocess-wrapper | event-driven error capture | `check-phase-69.mjs` AUDIT wrapper (same file) | exact — uniform peer pattern |
| `scripts/validation/check-phase-70.mjs` (modify line 592-597) | validator/subprocess-wrapper | event-driven error capture | `check-phase-70.mjs` AUDIT wrapper (same file) | exact — uniform peer pattern |
| `scripts/validation/check-phase-71.mjs` (modify line 212-217) | validator/subprocess-wrapper | event-driven error capture | `check-phase-71.mjs:234-241` (AUDIT wrapper, same file) | exact — uniform peer pattern |
| `scripts/validation/check-phase-72.mjs` (CREATE NEW) | chain-apex validator | static source-text scan + subprocess chain | `check-phase-71.mjs` (Path-A source) | exact — Path-A copy with delta |
| `.planning/phases/72-.../72-VERIFICATION.md` (CREATE NEW) | close-gate artifact | transform | `71-VERIFICATION.md` (Path-A precedent) | exact — Section-for-section mirror |
| `.planning/REQUIREMENTS.md` (modify WRAPPER-01 row) | traceability doc | transform | `REQUIREMENTS.md` ARCHIVE-01/02 rows (Phase 71 Plan 71-03 close-gate edit) | exact — Pending→Complete + SHA pattern |
| `.planning/STATE.md` (modify frontmatter + metrics) | project state | transform | Phase 71 Plan 71-03 STATE.md edits | exact — same field set |
| `.planning/ROADMAP.md` (modify Phase 72 row) | roadmap | transform | Phase 71 row + Plan 71-03 close-gate edits | exact — row Complete + SHA pattern |
| `.planning/milestones/v1.8-DEFERRED-CLEANUP.md` (append to CHAIN-DEGRADED-AT-HEAD-01) | milestone tracking | transform | ARCHIVE-UPSTREAM-01 stub append at Phase 71 close | role-match — status transition + narrative append |

---

## Pattern Assignments

### `scripts/validation/check-phase-66.mjs` — CHAIN wrapper fix at line 312-317

**Role:** Chain-regression-guard subprocess wrapper. Consumes: child process exit signals. Produces: `{ pass, detail }` for the V-66-CHAIN loop.

**Analog (in-file, same function):** `check-phase-66.mjs:327-339` — the AUDIT wrapper catch block 20 lines below the buggy CHAIN wrapper.

**BEFORE (lines 309-318 — current state):**
```javascript
      try {
        execFileSync('node', [path], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
        return { pass: true, detail: 'check-phase-' + phaseNum + ' exits 0' };
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + stderr.slice(0, 200) };
      }
```

**AFTER (uniform fix — add stdout line, update return slice):**
```javascript
      try {
        execFileSync('node', [path], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
        return { pass: true, detail: 'check-phase-' + phaseNum + ' exits 0' };
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const stdout = err.stdout ? err.stdout.toString() : '';
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + (stdout + stderr).slice(0, 500).trim() };
      }
```

**Reference (AUDIT wrapper at lines 327-339 — already correct, copy this shape):**
```javascript
    } catch (err) {
      const stderr = err.stderr ? err.stderr.toString() : '';
      const stdout = err.stdout ? err.stdout.toString() : '';
      const isMissing = err.code === 'ENOENT' || err.status === 127
        || stderr.includes('not found') || stderr.includes('Could not resolve');
      if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
      return { pass: false, detail: 'harness FAIL: ' + (stdout + stderr).slice(0, 300) };
    }
```

**Diff summary (2 lines changed in the catch block):**
- Line 313 (add after it): `const stdout = err.stdout ? err.stdout.toString() : '';`
- Line 317 (change return): `stderr.slice(0, 200)` → `(stdout + stderr).slice(0, 500).trim()`

**Risk flag:** check-phase-66.mjs uses a simple 3-option `execFileSync` call (no `isPeer`/`subEnv` variables). The AFTER pattern above is correct verbatim. No `isPeer` logic needed here.

---

### `scripts/validation/check-phase-67.mjs` — CHAIN wrapper fix at line 272-277

**Role:** Same as check-phase-66 — CHAIN regression-guard catch block. check-phase-67 introduces NESTED guard (`if (NESTED) return skip`) before the try block but the catch block itself is identical in shape.

**Analog (in-file):** `check-phase-67.mjs:293-299` — AUDIT wrapper catch block, already correct (stdout + stderr).

**BEFORE (lines 269-278 — current state):**
```javascript
      try {
        execFileSync('node', [path], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
        return { pass: true, detail: 'check-phase-' + phaseNum + ' exits 0' };
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + stderr.slice(0, 200) };
      }
```

**AFTER:** Identical 2-line delta as check-phase-66: add `const stdout = ...` line; change return to `(stdout + stderr).slice(0, 500).trim()`.

**Risk flag:** check-phase-67 uses simple 3-option execFileSync (no `isPeer` in this file's CHAIN wrapper). `NESTED` guard is BEFORE the try block — untouched by this fix.

---

### `scripts/validation/check-phase-68.mjs` — CHAIN wrapper fix at line 277-282

**Role:** CHAIN regression-guard catch block. check-phase-68 introduces `isPeer` + `subEnv` + `subTimeout` variables before the try block, with a 4-option `execFileSync` call. The catch block shape is the same.

**Analog (in-file):** check-phase-68.mjs AUDIT wrapper catch block (same structure, already correct).

**BEFORE (lines 274-283 — current state, from empirical read):**
```javascript
      try {
        execFileSync('node', [path], { stdio: 'pipe', timeout: subTimeout, cwd: process.cwd(), env: subEnv });
        return { pass: true, detail: 'check-phase-' + phaseNum + ' exits 0' + (isPeer ? ' (nested)' : '') };
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + stderr.slice(0, 200) };
      }
```

**AFTER:** Same 2-line delta as check-phase-66/67.

**Risk flag:** check-phase-68 already uses `isPeer`/`subEnv`/`subTimeout` — these are BEFORE the catch block and untouched. The CHAIN_WRAPPER_ANCHOR regex gap for this file is ~170 chars (fits comfortably in 400-char window per RESEARCH.md Section 3).

---

### `scripts/validation/check-phase-69.mjs` — CHAIN wrapper fix at line 193-198

**Role:** CHAIN regression-guard catch block. Structurally identical to check-phase-68 (same `isPeer` + `subEnv` + dual-timeout prelude).

**BEFORE (lines 190-199 — current state, from empirical read):**
```javascript
      try {
        execFileSync('node', [path], { stdio: 'pipe', timeout: subTimeout, cwd: process.cwd(), env: subEnv });
        return { pass: true, detail: 'check-phase-' + phaseNum + ' exits 0' + (isPeer ? ' (nested)' : '') };
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + stderr.slice(0, 200) };
      }
```

**AFTER:** Same 2-line delta.

---

### `scripts/validation/check-phase-70.mjs` — CHAIN wrapper fix at line 592-597

**Role:** CHAIN regression-guard catch block. Structurally identical to check-phase-68/69.

**BEFORE (lines 589-598 — current state, from empirical read):**
```javascript
      try {
        execFileSync('node', [path], { stdio: 'pipe', timeout: subTimeout, cwd: process.cwd(), env: subEnv });
        return { pass: true, detail: 'check-phase-' + phaseNum + ' exits 0' + (isPeer ? ' (nested)' : '') };
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + stderr.slice(0, 200) };
      }
```

**AFTER:** Same 2-line delta.

---

### `scripts/validation/check-phase-71.mjs` — CHAIN wrapper fix at line 212-217

**Role:** CHAIN regression-guard catch block. This file is ALSO the Path-A source for check-phase-72. Its catch block differs structurally from 68/69/70: uses a 4-option `execFileSync` call (separate lines with `env: { ...process.env, CHECK_PHASE_NESTED: '1' }`) rather than inline options.

**Analog (in-file):** `check-phase-71.mjs:234-241` — AUDIT wrapper catch block, already correct.

**BEFORE (lines 204-218 — full try/catch, current state):**
```javascript
      try {
        execFileSync('node', [path], {
          stdio: 'pipe',
          timeout: 300000,
          cwd: process.cwd(),
          env: { ...process.env, CHECK_PHASE_NESTED: '1' },
        });
        return { pass: true, detail: 'check-phase-' + phaseNum + ' exits 0' };
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + stderr.slice(0, 200) };
      }
```

**AFTER:** Same 2-line delta. The `CHECK_PHASE_NESTED: '1'` env option is on a separate line and causes the 258-char gap that requires the 400-char CHAIN_WRAPPER_ANCHOR (see RESEARCH.md Section 3 — use `{0,400}` not `{0,200}`).

**Reference (AUDIT wrapper at lines 223-243, already correct):**
```javascript
    try {
      execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
      return { pass: true, detail: 'v1.7 harness exits 0 (predecessor-byte-unchanged invariant preserved)' };
    } catch (err) {
      const stderr = err.stderr ? err.stderr.toString() : '';
      const stdout = err.stdout ? err.stdout.toString() : '';
      const isMissing = err.code === 'ENOENT' || err.status === 127
        || stderr.includes('not found') || stderr.includes('Could not resolve');
      if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
      return { pass: false, detail: 'harness FAIL: ' + (stdout + stderr).slice(0, 300) };
    }
```

**Risk flag (CRITICAL):** check-phase-71.mjs has `CHECK_PHASE_NESTED: '1'` in the env option block. This adds ~100 chars to the gap between `execFileSync('node',` and `catch`. With CHAIN_WRAPPER_ANCHOR gap `{0,200}`, this file's CHAIN wrapper is MISSED (gap measures 258 chars empirically). The 400-char gap in check-phase-72.mjs correctly catches it. The fix to the catch block itself is the same 2-line delta — do NOT touch the env option block.

---

### `scripts/validation/check-phase-72.mjs` — CREATE NEW (Path-A from check-phase-71.mjs)

**Role:** Chain-apex validator for Phase 72. Consumes: source text of check-phase-{66..72}.mjs (regex scan), subprocess exits of check-phase-{48..71}.mjs (CHAIN loop), subprocess exit of v1.7-milestone-audit.mjs (AUDIT check), presence/content of 72-VERIFICATION.md (AUDIT-VERIFY check). Produces: 35 check results + exit 0/1.

**Analog:** `check-phase-71.mjs` — full file, Path-A copy with structural delta below.

**Section-by-section Path-A delta (what changes vs what copies verbatim):**

| Lines in 71 | Section | Action for 72 |
|---|---|---|
| 1-26 | Shebang + block comment | Update description, assertion class list, lineage comment, usage line — replace `V-71-*` references |
| 27-31 | ESM imports | VERBATIM (`readFileSync`, `existsSync`, `execFileSync`, `join`, `process`) |
| 32-33 | `argv` / `VERBOSE` | VERBATIM |
| 35-39 | `readFile()` helper | VERBATIM (CRLF normalization `.replace(/\r\n/g, '\n')`) |
| 41-44 | `HARNESS` + path constants | Keep `HARNESS`; REMOVE `EXTRACTOR_PATH`, `TEST_PATH`, `MILESTONES_PATH` (Phase 72 has no file-path constants beyond HARNESS) |
| 47 | `CHAIN_PHASES` | Change to `[48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71]` (adds 71) |
| 50 | `CHAIN_SKIP` | VERBATIM `new Set([])` |
| 52-76 | `PLACEHOLDER_TOKENS` + `buildGarbageRegex()` | REMOVE entirely (no MILESTONES check in Phase 72) |
| 78-182 | Checks: V-71-FIX-01/02 + V-71-MILESTONES-01 + V-71-ARCHIVE02-01 | REPLACE with V-72 checks (see below) |
| 184-221 | V-71-CHAIN loop | Keep structure; update IDs to V-72-CHAIN; update comment text |
| 223-243 | V-71-AUDIT check | Keep structure; update ID to V-72-AUDIT; keep milestone-audit subprocess contract |
| 245-259 | V-71-SELF check | Keep structure; update to V-72-SELF (check 72 absent from CHAIN_PHASES; CHAIN_SKIP.size === 0) |
| 261-288 | Runner loop | VERBATIM; update console.log header string |

**New Phase-72-specific checks to add (replace lines 78-182):**

```javascript
const FIXED_FILES = [66, 67, 68, 69, 70, 71, 72]; // D-01 C set + self-dogfood

// RESEARCH.md Section 3: empirical gap is 258 chars for check-phase-71; use 400 not 200
const CHAIN_WRAPPER_ANCHOR = /execFileSync\('node',[\s\S]{0,400}?catch\s*\(\s*err\s*\)\s*\{([\s\S]{0,600}?)\n\s*\}/g;

// V-72-WRAPPER-01..07 parameterized over FIXED_FILES
FIXED_FILES.forEach((phaseNum) => {
  checks.push({
    id: `WRAPPER-${String(phaseNum).padStart(2, '0')}`,
    name: `V-72-WRAPPER-${phaseNum}: check-phase-${phaseNum}.mjs CHAIN wrapper captures both stderr AND stdout`,
    run() {
      const content = readFile(`scripts/validation/check-phase-${phaseNum}.mjs`);
      if (!content) return { pass: false, detail: `check-phase-${phaseNum}.mjs not found` };
      const matches = [...content.matchAll(CHAIN_WRAPPER_ANCHOR)];
      if (matches.length === 0) return { pass: false, detail: `no CHAIN wrapper catch block found in check-phase-${phaseNum}.mjs (anchor regex miss)` };
      const violators = matches.filter((m) => !(/err\.stderr/.test(m[1]) && /err\.stdout/.test(m[1])));
      if (violators.length > 0) {
        return { pass: false, detail: `${violators.length} of ${matches.length} CHAIN wrapper(s) in check-phase-${phaseNum}.mjs missing err.stdout capture` };
      }
      return { pass: true, detail: `${matches.length} CHAIN wrapper(s) in check-phase-${phaseNum}.mjs capture both streams` };
    }
  });
});

// V-72-WRAPPER-NEG: negative invariant — zero stderr-only CHAIN wrappers across FIXED_FILES
checks.push({
  id: 'WRAPPER-NEG',
  name: 'V-72-WRAPPER-NEG: zero stderr-only CHAIN wrappers remain across FIXED_FILES',
  run() {
    const stderrOnly = [];
    FIXED_FILES.forEach((phaseNum) => {
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
      return { pass: false, detail: `${stderrOnly.length} stderr-only CHAIN wrapper(s) remain: ${JSON.stringify(stderrOnly)}` };
    }
    return { pass: true, detail: `0 stderr-only CHAIN wrappers across ${FIXED_FILES.length} FIXED_FILES (whole-file class signature satisfied)` };
  }
});

// V-72-AUDIT-VERIFY: heading-presence check on 72-VERIFICATION.md (D-04b δ)
checks.push({
  id: 'AUDIT-VERIFY',
  name: 'V-72-AUDIT-VERIFY: 72-VERIFICATION.md exists and contains Per-Validator Audit Inventory heading',
  run() {
    const verif = readFile('.planning/phases/72-chain-wrapper-hardening-pillar-b/72-VERIFICATION.md');
    if (!verif) return { pass: true, skipped: true, detail: '72-VERIFICATION.md not yet authored (PASS-via-skip until Plan 72-02 lands)' };
    if (!/Per-Validator Audit Inventory/i.test(verif)) {
      return { pass: false, detail: '72-VERIFICATION.md missing "Per-Validator Audit Inventory" section heading' };
    }
    return { pass: true, detail: '72-VERIFICATION.md exists with audit inventory section' };
  }
});
```

**CHAIN wrapper for the new check-phase-72.mjs itself (self-dogfood — authored with correct pattern from inception, Section 12 of RESEARCH.md):**
```javascript
      try {
        execFileSync('node', [path], {
          stdio: 'pipe',
          timeout: subTimeout,
          cwd: process.cwd(),
          env: subEnv,
        });
        return { pass: true, detail: 'check-phase-' + phaseNum + ' exits 0' + (isPeer ? ' (nested)' : '') };
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const stdout = err.stdout ? err.stdout.toString() : '';
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + (stdout + stderr).slice(0, 500).trim() };
      }
```

**AUDIT wrapper (v1.7 harness subprocess — copy verbatim from check-phase-71.mjs:223-243, already correct):**
```javascript
checks.push({
  id: 'AUDIT',
  name: 'V-72-AUDIT: v1.7-milestone-audit.mjs exits 0 (predecessor-byte-unchanged)',
  run() {
    if (!existsSync(join(process.cwd(), HARNESS))) {
      return { pass: true, skipped: true, detail: HARNESS + ' not present (graceful skip)' };
    }
    try {
      execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
      return { pass: true, detail: 'v1.7 harness exits 0 (predecessor-byte-unchanged invariant preserved)' };
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

**V-72-SELF (copy from check-phase-71.mjs:245-258, update numbers):**
```javascript
checks.push({
  id: 'SELF',
  name: 'V-72-SELF: CHAIN_PHASES does NOT include 72; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(72)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 72 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (72 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});
```

**Total check count:** 35 (7 WRAPPER + 1 WRAPPER-NEG + 1 AUDIT-VERIFY + 24 CHAIN-{48..71} + 1 AUDIT + 1 SELF).

**Risk flags:**
- The check-phase-71.mjs CHAIN wrapper uses a simpler env propagation than check-phase-72's CHAIN wrapper will. In check-phase-71.mjs line 209 the env is hardcoded inline `env: { ...process.env, CHECK_PHASE_NESTED: '1' }`. In check-phase-72.mjs the CHAIN loop should use the `isPeer`/`subEnv`/`subTimeout` pattern from check-phase-68/69/70 (more architecturally complete — peer validators get 600000ms timeout + env propagation, non-peers get 300000ms without env). Adopt the check-phase-68/69/70 pattern for the CHAIN loop body, not the simplified check-phase-71 pattern. This is the pattern in RESEARCH.md Section 12.
- `CHAIN_WRAPPER_ANCHOR` gap MUST be `{0,400}` not `{0,200}` (see RESEARCH.md Section 3 — confirmed 258-char gap for check-phase-71; the new check-phase-72 CHAIN wrapper with `subEnv` will also exceed 200 chars).
- `AUDIT-VERIFY` (id: `'AUDIT-VERIFY'`) is the heading-presence check; `AUDIT` (id: `'AUDIT'`) is the milestone-audit subprocess. These are distinct check IDs. RESEARCH.md Section 2 documents the naming collision risk.
- FIXED_FILES MUST include 72 (self-dogfood). RESEARCH.md Pitfall 5.

---

### `.planning/phases/72-chain-wrapper-hardening-pillar-b/72-VERIFICATION.md` — CREATE NEW

**Role:** Plan 72-02 close-gate artifact. Consumed by V-72-AUDIT-VERIFY (heading-presence check). Sections A-H per Phase 71 precedent.

**Analog:** `.planning/phases/71-archive-automation-root-cause-fix-pillar-a/71-VERIFICATION.md`

**Structure to mirror (Path-A with Phase 72 deltas):**

| Section | 71-VERIFICATION.md content | 72-VERIFICATION.md delta |
|---|---|---|
| YAML frontmatter | `phase:`, `verified:`, `status:`, `v71_final_state:` + verifier cross-check block | Same fields; `v72_final_state:` captures WRAPPER-01 fix state |
| Section A | Phase 71 goal achievement | Phase 72 goal: WRAPPER-01 closed; diagnostic surface fixed; 6 catch blocks + check-phase-72 authored |
| Section B | Commands evidence + chain re-run outputs | Pre/post chain delta-diff witness (`.claude/tmp/72-chain-pre.txt` vs `.claude/tmp/72-chain-post.txt`); empirical V-61-17 + V-67-05/06 stdout text post-fix |
| Section C | SC#1-4 satisfaction | SC#3 uses D-02 Option B template (second-clause "no false positives introduced"); SC#4 = 7-file atomic SHA |
| Section D | Atomic SHA record | Plan 72-01 7-file atomic SHA byte-exact |
| Section E | Per-validator discoveries (Phase 71 had ARCHIVE-02 sweep detail) | **Per-Validator Audit Inventory** table — 17 sites with per-site disposition (FIXED / DEFERRED_PHASE_73 / DEFERRED_DOCUMENTED) — this heading is the V-72-AUDIT-VERIFY assertion target |
| Section F | Phase 71 discoveries (new STUB triggers) | Discoveries: any new wrapper class beyond 17-site inventory; ARCHIVE-style stub if surfaced |
| Section G | Phase 72 entry-state readiness signal | Phase 73 entry-state: 11 remaining stderr-only sites inventory (from RESEARCH.md Section 11 table); empirical V-61-17 + V-67-05/06 stdout signatures; check-phase-72 ready as Path-A for Phase 73 |
| Section H | Sign-off | Sign-off |

**Key V-72-AUDIT-VERIFY assertion target — required heading in Section E:**
The file MUST contain the heading `Per-Validator Audit Inventory` (case-insensitive per regex `/Per-Validator Audit Inventory/i`).

---

### `.planning/REQUIREMENTS.md` — modify WRAPPER-01 row

**Role:** Traceability doc. Consumed by V-NN-REQUIREMENTS checks in downstream validators.

**Analog:** Phase 71 Plan 71-03 close-gate edits to REQUIREMENTS.md (ARCHIVE-01 + ARCHIVE-02 Pending→Complete).

**Current state (line 21):**
```markdown
- [ ] **WRAPPER-01**: Fix `scripts/validation/check-phase-66.mjs:313` chain-apex wrapper...
```

**Target state:**
```markdown
- [x] **WRAPPER-01**: Fix `scripts/validation/check-phase-66.mjs:313` chain-apex wrapper to capture both `err.stdout` AND `err.stderr`... **CLOSED Phase 72 Plan 72-01 atomic SHA `{plan_72_01_SHA}` (6 CHAIN wrapper fixes + check-phase-72.mjs regression-witness validator in ONE SHA per SC#4 byte-exact). Close-gate SHA `{plan_72_02_SHA}`.**
```

**Pattern source:** `REQUIREMENTS.md:15-17` — ARCHIVE-01/02 completed rows show the exact `**CLOSED Phase NN Plan NN-NN atomic SHA \`XXXXXXX\`...**` append pattern.

---

### `.planning/STATE.md` — modify frontmatter + metrics

**Role:** Project state tracker. Phase 72 close-gate updates: progress counter + Performance Metrics + Pending Todos.

**Analog:** Phase 71 Plan 71-03 STATE.md edits (same field set).

**Pattern:** Phase 71 close-gate updated:
- `phase_72_complete` (or equivalent progress field) in frontmatter
- Performance Metrics: add Phase 72 row (plans completed, checks passing, etc.)
- Pending Todos: remove Phase 72 item; ensure Phase 73 item remains

**Concrete reference:** `STATE.md:77-142` documents the v1.8 phase dependency summary and Wave designation map. Phase 72 "Wave B — sequential after Wave A" completion flag goes here.

---

### `.planning/ROADMAP.md` — modify Phase 72 row

**Role:** Phase completion tracking. Consumed by V-NN-ROADMAP checks in downstream validators.

**Analog:** Phase 71 row close pattern at `ROADMAP.md:327-331`.

**Current state (lines 333-343):**
```markdown
### Phase 72: Chain-Wrapper Hardening (Pillar B)
**Goal**: ...
**Plans**: TBD
```

**Target state (after Plan 72-02):**
```markdown
### Phase 72: Chain-Wrapper Hardening (Pillar B)
**Goal**: ...
**Plans**:
- [x] 72-01-PLAN.md — WRAPPER-01 fix: 6 CHAIN wrapper stdout+stderr captures + check-phase-72.mjs regression-witness validator (atomic SC#4; closing SHA `{plan_72_01_SHA}`)
- [x] 72-02-PLAN.md — Phase 72 close-gate (chain delta-diff witness + 72-VERIFICATION.md SC#1-4 satisfaction + traceability flips; closing SHA `{plan_72_02_SHA}`)
```

**Pattern source:** `ROADMAP.md:327-331` (Phase 71 completed plan lines) — same `[x] NN-NN-PLAN.md — description (closing SHA \`XXXXXXX\`)` shape.

---

### `.planning/milestones/v1.8-DEFERRED-CLEANUP.md` — append to CHAIN-DEGRADED-AT-HEAD-01

**Role:** Milestone deferral tracking. Phase 72 Plan 72-02 Wave 4 transitions CHAIN-DEGRADED-AT-HEAD-01 from STUB → PARTIALLY-RESOLVED-EMPIRICAL-BASELINE-CAPTURED.

**Analog:** Phase 71 Plan 71-03 stub-drafting at `v1.8-DEFERRED-CLEANUP.md:99` — the "Status:" line pattern.

**Current state (`v1.8-DEFERRED-CLEANUP.md:99`):**
```markdown
**Status:** STUB drafted 2026-06-04 at Phase 71 Plan 71-03 close. Resolution mechanism (RETRO-01 + RETRO-02 in Phase 73) is pre-specified in REQUIREMENTS.md:25-27.
```

**Target state (append after the existing Status line):**
```markdown
**Status:** STUB drafted 2026-06-04 at Phase 71 Plan 71-03 close. Resolution mechanism (RETRO-01 + RETRO-02 in Phase 73) is pre-specified in REQUIREMENTS.md:25-27.

**Post-WRAPPER-01-fix update (Phase 72 Plan 72-02 close-gate):** Post-fix empirical stdout-diagnostic signature now visible at chain-apex output per close-gate witness `.claude/tmp/72-chain-post.txt`. Pre-fix FAIL detail for V-72-CHAIN-61 was empty (stderr-only wrapper masked stdout); post-fix detail carries: `check-phase-61 FAIL: check-phase-61 -- Phase 61 deliverables\n\n[1/34] V-61-01:...` (first 500 chars). V-61-17 root-cause text (`top H2 is not v1.5: ## v1.7 Deferred Backlog Closure...`) now visible in chain-apex output. Phase 73 RETRO-01 should start from `.claude/tmp/72-chain-post.txt` as the empirically-grounded class-signature inventory. **Status transition: STUB → PARTIALLY-RESOLVED-EMPIRICAL-BASELINE-CAPTURED.**
```

**Pattern source:** `v1.8-DEFERRED-CLEANUP.md:52-53` (ARCHIVE-UPSTREAM-01 Status append after Phase 71) and `v1.8-DEFERRED-CLEANUP.md:99` (current CHAIN-DEGRADED-AT-HEAD-01 Status line format).

---

## Shared Patterns

### The Uniform CHAIN ≡ AUDIT Catch-Block Shape (post-Phase-72)

**Source:** `scripts/validation/check-phase-66.mjs:327-339` (AUDIT wrapper — already correct reference)
**Apply to:** All 6 CHAIN wrapper fix sites + the new check-phase-72.mjs CHAIN wrapper

```javascript
} catch (err) {
  const stderr = err.stderr ? err.stderr.toString() : '';
  const stdout = err.stdout ? err.stdout.toString() : '';
  const isMissing = err.code === 'ENOENT' || err.status === 127
    || stderr.includes('not found') || stderr.includes('Could not resolve');
  if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
  return { pass: false, detail: '... FAIL: ' + (stdout + stderr).slice(0, 500).trim() };
}
```

Two-line mechanical delta for each of the 6 existing files:
1. After `const stderr = ...` line: add `const stdout = err.stdout ? err.stdout.toString() : '';`
2. Change return: `stderr.slice(0, 200)` → `(stdout + stderr).slice(0, 500).trim()`

Note on slice budget: CONTEXT.md D-01 specifies 300; RESEARCH.md Section 9 establishes that 300 misses V-61-17 at byte offset ~2252 and recommends 500. The planner should use **500** and note in 72-VERIFICATION.md Section B that it is a diagnostic preview (V-61-17 at offset ~2252 still not captured in 500-char window, but V-67-05/06 at ~750-900 chars ARE captured). If full diagnostic fidelity is needed for V-61-17, bump to 2048.

### readFile() CRLF Normalization Idiom

**Source:** `scripts/validation/check-phase-71.mjs:35-39` (verbatim for check-phase-72.mjs)

```javascript
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}
```

**Apply to:** check-phase-72.mjs (verbatim copy).

### Runner Loop Pattern

**Source:** `scripts/validation/check-phase-71.mjs:261-288` (verbatim for check-phase-72.mjs)

```javascript
let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-72 -- Phase 72 deliverables (Chain-Wrapper Hardening Pillar B)\n');
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

**Apply to:** check-phase-72.mjs (update header string; rest verbatim).

### Atomic Commit Pattern (Plan 72-01)

**Source:** Phase 67 Plan 67-02 `55260b3` (5-file atomic) + Phase 71 Plan 71-01 `e4887b2` (3-file atomic).

```powershell
git add scripts/validation/check-phase-66.mjs `
       scripts/validation/check-phase-67.mjs `
       scripts/validation/check-phase-68.mjs `
       scripts/validation/check-phase-69.mjs `
       scripts/validation/check-phase-70.mjs `
       scripts/validation/check-phase-71.mjs `
       scripts/validation/check-phase-72.mjs

git commit -m "fix(72-01): WRAPPER-01 chain-apex stdout+stderr capture + check-phase-72.mjs regression-witness (atomic SC#4)"
```

**Apply to:** Plan 72-01 (7 files, ONE SHA). Verify with `git show --name-only --format= HEAD | wc -l` — expect 7.

### Close-Gate Commit Pattern (Plan 72-02)

**Source:** Phase 71 Plan 71-03 close-gate commit `05668db`.

```powershell
git commit -m "docs(72-02): Phase 72 close-gate — chain delta-diff witness + 72-VERIFICATION.md + traceability flips"
```

---

## No Analog Found

All 12 files have clear analogs. No file requires fallback to RESEARCH.md patterns only.

---

## Critical Risk Flags (Cross-File)

| Risk | Affected Files | Mitigation |
|---|---|---|
| CHAIN_WRAPPER_ANCHOR gap `{0,200}` misses check-phase-71 (258-char gap) | check-phase-72.mjs V-72-WRAPPER-71 | Use `{0,400}` — empirically confirmed by RESEARCH.md Section 3 |
| Slice budget 300 misses V-61-17 at byte offset ~2252 | All 6 CHAIN wrapper fixes + check-phase-72 CHAIN wrapper | Use 500 (captures V-67-05/06 at ~750-900 chars; note V-61-17 still deeper); planner may use 2048 for full fidelity |
| V-72-AUDIT naming collision (heading-check vs harness-subprocess) | check-phase-72.mjs | Use `id: 'AUDIT-VERIFY'` for heading-presence; `id: 'AUDIT'` for milestone-audit subprocess |
| FIXED_FILES missing 72 (self-dogfood not enforced) | check-phase-72.mjs V-72-WRAPPER-NEG | FIXED_FILES = `[66, 67, 68, 69, 70, 71, 72]` — include 72 |
| Delta-diff SC#3 comparison uses wrong validator pair | Plan 72-02 Wave 1 | Compare check-phase-72.mjs output BEFORE vs AFTER wrapper fixes (same binary both times, not 71 vs 72 output) |
| check-phase-71.mjs inherits simpler env block in CHAIN loop | check-phase-72.mjs CHAIN loop authoring | Use check-phase-68/69/70 `isPeer`/`subEnv`/`subTimeout` pattern (not the hardcoded `env: { ...process.env, CHECK_PHASE_NESTED: '1' }` inline pattern from 71) |

---

## Metadata

**Analog search scope:** `scripts/validation/check-phase-{66,67,68,69,70,71}.mjs` (all 6 fix targets read); `check-phase-71.mjs` full (Path-A source); `.planning/phases/71-.../71-VERIFICATION.md` (close-gate analog); `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md`, `.planning/milestones/v1.8-DEFERRED-CLEANUP.md` (traceability analogs).
**Files scanned:** 9 source files read directly; 2 context files (72-CONTEXT.md + 72-RESEARCH.md) provided full empirical inventory.
**Pattern extraction date:** 2026-06-06
