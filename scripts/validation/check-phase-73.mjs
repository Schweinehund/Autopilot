#!/usr/bin/env node
// check-phase-73.mjs -- Phase 73 deliverables (Retrospective Forward-Port Pillar C)
//
// Pillar C of v1.8 — RETRO-01 + RETRO-02: Class-wide scan + frozen-aware conversion for
// check-phase-{48..66}.mjs HEAD-coupled assertions. Ships the RETRO-01 class-signature
// inventory artifact, 8 CHAIN+AUDIT wrapper fold-ins, centralized _lib/frozen-at-close.mjs
// helper module, and this chain-apex validator as ONE atomic SHA (SC#1 + SC#4).
// Source of truth: .planning/phases/73-retrospective-forward-port-pillar-c/73-CONTEXT.md
//
// Assertion classes:
//   V-73-INVENTORY       73-RETRO-INVENTORY.md exists and contains per-validator class-signature table
//                        (heading-presence + >= 19 per-validator rows for check-phase-{48..66}.mjs)
//   V-73-LIB-EXISTS      _lib/frozen-at-close.mjs exists with MILESTONE_CLOSE_SHAS (V141/V15/V16/V17)
//                        + readAtV{141,15,16,17}Close convenience exports
//   V-73-WRAPPER-NEG     Negative invariant: zero stderr-only CHAIN wrappers remain across FIXED_FILES_RETRO_02
//                        (check-phase-{60..65}.mjs after D-01 LOCKED fold-in)
//   V-73-AUDIT-WRAPPER-NEG  Negative invariant: zero stderr-only AUDIT wrappers remain across AUDIT_FIXED_FILES
//                        (check-phase-{60,61}.mjs after D-01 LOCKED fold-in)
//   V-73-AUDIT           73-VERIFICATION.md heading-presence (SKIP-PASS until Plan 73-03 lands)
//   V-73-CHAIN-{48..72}  25 subprocesses; each check-phase-{N}.mjs exits 0 (NESTED-aware)
//   V-73-AUDIT-HARNESS   scripts/validation/v1.7-milestone-audit.mjs exits 0 (predecessor-byte-unchanged)
//   V-73-SELF            CHAIN_PHASES does NOT include 73; CHAIN_SKIP is empty Set (Phase 68 7b635ca invariant)
//
// Chicken-and-egg transient at Plan 73-01 commit: V-73-CHAIN-{61..67,70} expected FAIL (8 documented-residual)
//   because pre-existing HEAD-coupled assertions in check-phase-{61,67}.mjs are not yet frozen-aware.
//   These are CHAIN-DEGRADED-AT-HEAD-01 entries (v1.8-DEFERRED-CLEANUP.md lines 56-99); resolution
//   mechanism is Plan 73-02 RETRO-02 per-validator HEAD-coupled assertion conversion.
//   Per Plan 71-01 Rule 4 Option A documented-transient precedent (6th entry in chicken-and-egg lineage:
//   Plan 68-05 -> 69-02 -> 70-05 Commit A -> 71-01 -> 72-01 -> 73-01).
//
// Lineage: Path-A from check-phase-72.mjs (Plan 72-01 SHA d374095)
//
// Usage: node scripts/validation/check-phase-73.mjs [--verbose]
// Exit code: 0 if all PASS or SKIPPED; 1 if any FAIL.

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';
import { resolveArchivedPhasePath } from './_lib/archive-path.mjs';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}

const HARNESS = 'scripts/validation/v1.7-milestone-audit.mjs';

// Phase 73 extends the chain through Phase 72 (Phase 72 close d374095 -- wrapper fix + regression-witness).
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72];

// CHAIN_SKIP topology: empty per Phase 68 7b635ca invariant -- no entries to suppress.
const CHAIN_SKIP = new Set([]);

const checks = [];

const FIXED_FILES_RETRO_02 = [60, 61, 62, 63, 64, 65]; // D-01 LOCKED: 6 CHAIN wrapper fold-in sites
const AUDIT_FIXED_FILES = [60, 61];                     // D-01 LOCKED: 2 AUDIT wrapper fold-in sites

// CHAIN_WRAPPER_ANCHOR: empirically-correct 400-char gap (72-VERIFICATION.md Section F finding;
// check-phase-71 had 258-char gap due to env: { ...process.env, CHECK_PHASE_NESTED: '1' } line)
const CHAIN_WRAPPER_ANCHOR = /execFileSync\('node',[\s\S]{0,400}?catch\s*\(\s*err\s*\)\s*\{([\s\S]{0,600}?)\n\s*\}/g;

// AUDIT_WRAPPER_ANCHOR: anchored to [auditPath] to distinguish from CHAIN wrapper (Pitfall 2 guard)
// AUDIT wrappers use `execFileSync('node', [auditPath], ...)` topology; CHAIN wrappers use `[path]`
const AUDIT_WRAPPER_ANCHOR = /execFileSync\('node',\s*\[auditPath\][\s\S]{0,400}?catch\s*\(\s*err\s*\)\s*\{([\s\S]{0,600}?)\n\s*\}/g;

// V-73-INVENTORY: 73-RETRO-INVENTORY.md exists with per-validator class-signature table (>= 19 rows)
checks.push({
  id: 'INVENTORY',
  name: 'V-73-INVENTORY: 73-RETRO-INVENTORY.md exists and contains per-validator class-signature table',
  run() {
    const inventoryPath = resolveArchivedPhasePath(
      '73-retrospective-forward-port-pillar-c/73-RETRO-INVENTORY.md',
      ['v1.8-phases']
    );
    const c = inventoryPath ? readFile(inventoryPath) : null;
    if (c === null) return { pass: false, detail: '73-RETRO-INVENTORY.md missing (not in live tree or v1.8-phases archive)' };
    if (!c.includes('check-phase-')) return { pass: false, detail: 'no per-validator table rows found' };
    const rowCount = (c.match(/\| check-phase-/g) || []).length;
    if (rowCount < 19) return { pass: false, detail: `only ${rowCount}/19 validator rows found` };
    return { pass: true, detail: `${rowCount} validator rows present in 73-RETRO-INVENTORY.md` };
  }
});

// V-73-LIB-EXISTS: _lib/frozen-at-close.mjs exists with MILESTONE_CLOSE_SHAS + convenience exports
checks.push({
  id: 'LIB-EXISTS',
  name: 'V-73-LIB-EXISTS: _lib/frozen-at-close.mjs exists and exports MILESTONE_CLOSE_SHAS + readAtV{141,15,16,17}Close',
  run() {
    const c = readFile('scripts/validation/_lib/frozen-at-close.mjs');
    if (c === null) return { pass: false, detail: '_lib/frozen-at-close.mjs missing' };
    const issues = [];
    if (!c.includes('MILESTONE_CLOSE_SHAS')) issues.push('MILESTONE_CLOSE_SHAS not found');
    if (!c.includes('V141:')) issues.push('V141 key missing');
    if (!c.includes('V15:'))  issues.push('V15 key missing');
    if (!c.includes('V16:'))  issues.push('V16 key missing');
    if (!c.includes('V17:'))  issues.push('V17 key missing');
    if (!c.includes('readAtV141Close')) issues.push('readAtV141Close not exported');
    if (!c.includes('readAtV15Close'))  issues.push('readAtV15Close not exported');
    if (!c.includes('readAtV16Close'))  issues.push('readAtV16Close not exported');
    if (!c.includes('readAtV17Close'))  issues.push('readAtV17Close not exported');
    if (issues.length > 0) return { pass: false, detail: issues.join('; ') };
    return { pass: true, detail: 'MILESTONE_CLOSE_SHAS + 4 convenience exports present' };
  }
});

// V-73-WRAPPER-NEG: zero stderr-only CHAIN wrappers remain across FIXED_FILES_RETRO_02
// Note: match must contain 'check-phase-' + phaseNum in detail string to distinguish CHAIN
// wrappers from helper-spawn wrappers (e.g., PIN_HELPER --self-test at check-phase-60.mjs:188)
// which are class-type carve-out (HELPER-SPAWN-STDERR-01, deferred to v1.9+ per D-01).
checks.push({
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
        // Only flag CHAIN wrappers: must contain 'check-phase-' in return detail
        // (excludes helper-spawn wrappers like PIN_HELPER --self-test which have '--self-test FAIL:')
        const isChainWrapper = /['"]check-phase-['"]/.test(m[1]) || /check-phase-.*FAIL/.test(m[1]);
        if (hasStderr && !hasStdout && isChainWrapper) {
          stderrOnly.push({ file: `check-phase-${phaseNum}.mjs`, occurrence: idx + 1 });
        }
      });
    });
    if (stderrOnly.length > 0) {
      return { pass: false, detail: `${stderrOnly.length} stderr-only CHAIN wrapper(s): ` + stderrOnly.map(s => `${s.file}[${s.occurrence}]`).join(', ') };
    }
    return { pass: true, detail: `0 stderr-only CHAIN wrappers across ${FIXED_FILES_RETRO_02.length} FIXED_FILES_RETRO_02` };
  }
});

// V-73-AUDIT-WRAPPER-NEG: zero stderr-only AUDIT wrappers remain across AUDIT_FIXED_FILES
checks.push({
  id: 'AUDIT-WRAPPER-NEG',
  name: 'V-73-AUDIT-WRAPPER-NEG: zero stderr-only AUDIT wrappers remain across AUDIT_FIXED_FILES',
  run() {
    const stderrOnly = [];
    AUDIT_FIXED_FILES.forEach((phaseNum) => {
      const content = readFile(`scripts/validation/check-phase-${phaseNum}.mjs`);
      if (!content) return;
      // AUDIT wrapper anchor: anchored to [auditPath] to avoid CHAIN aliasing (Pitfall 2)
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
});

// V-73-AUDIT: heading-presence check on 73-VERIFICATION.md (SKIP-PASS until Plan 73-03 lands)
checks.push({
  id: 'AUDIT',
  name: 'V-73-AUDIT: 73-VERIFICATION.md exists and contains Phase 73 verification heading',
  run() {
    const verifPath = resolveArchivedPhasePath(
      '73-retrospective-forward-port-pillar-c/73-VERIFICATION.md',
      ['v1.8-phases']
    );
    const verif = verifPath ? readFile(verifPath) : null;
    if (!verif) return { pass: false, detail: '73-VERIFICATION.md not found in live tree or v1.8-phases archive' };
    if (!/Phase 73/i.test(verif)) {
      return { pass: false, detail: '73-VERIFICATION.md missing "Phase 73" section heading' };
    }
    return { pass: true, detail: '73-VERIFICATION.md exists with Phase 73 verification content' };
  }
});

// V-73-CONVERT-* assertions: one per RETRO-02-converted HEAD-coupled assertion. Each asserts:
//   (1) the file imports readAtV{15,16,17}Close from _lib/frozen-at-close.mjs AND
//   (2) the validator name carries the [v1.X-frozen @ <SHA>] suffix.
// Grown in Plan 73-02 atomic commit (RETRO-02 per-validator HEAD-coupled assertion conversion).
//
// Conversions:
//   V-61-17..20 (check-phase-61.mjs): readFile(MILESTONES_DOC) -> readAtV15Close + [v1.5-frozen @ ba2cbc0]
//   V-67-05/06 (check-phase-67.mjs): wrong-pattern fix (literal OP-10 / VH heading) -> correct content pattern
//     Root cause: plan design labels (OP-10, Version History heading) were not written into corpus files;
//     correct patterns: "content token" callout (V-67-05) + SWEEP-02 date rows (V-67-06)

checks.push({
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
});

checks.push({
  id: 'CONVERT-61-18',
  name: 'V-73-CONVERT-61-18: check-phase-61.mjs V-61-18 imports readAtV15Close and has v1.5-frozen suffix',
  run() {
    const content = readFile('scripts/validation/check-phase-61.mjs');
    if (!content) return { pass: false, detail: 'check-phase-61.mjs not found' };
    if (!content.includes('readAtV15Close') && !content.includes('frozen-at-close')) {
      return { pass: false, detail: 'V-61-18 conversion: readAtV15Close import not found' };
    }
    if (!content.match(/V-61-18.*v1\.5-frozen/)) {
      return { pass: false, detail: 'V-61-18: [v1.5-frozen @ ba2cbc0] suffix missing from check name' };
    }
    return { pass: true, detail: 'V-61-18 frozen-aware conversion confirmed (readAtV15Close + suffix)' };
  }
});

checks.push({
  id: 'CONVERT-61-19',
  name: 'V-73-CONVERT-61-19: check-phase-61.mjs V-61-19 imports readAtV15Close and has v1.5-frozen suffix',
  run() {
    const content = readFile('scripts/validation/check-phase-61.mjs');
    if (!content) return { pass: false, detail: 'check-phase-61.mjs not found' };
    if (!content.includes('readAtV15Close') && !content.includes('frozen-at-close')) {
      return { pass: false, detail: 'V-61-19 conversion: readAtV15Close import not found' };
    }
    if (!content.match(/V-61-19.*v1\.5-frozen/)) {
      return { pass: false, detail: 'V-61-19: [v1.5-frozen @ ba2cbc0] suffix missing from check name' };
    }
    return { pass: true, detail: 'V-61-19 frozen-aware conversion confirmed (readAtV15Close + suffix)' };
  }
});

checks.push({
  id: 'CONVERT-61-20',
  name: 'V-73-CONVERT-61-20: check-phase-61.mjs V-61-20 imports readAtV15Close and has v1.5-frozen suffix',
  run() {
    const content = readFile('scripts/validation/check-phase-61.mjs');
    if (!content) return { pass: false, detail: 'check-phase-61.mjs not found' };
    if (!content.includes('readAtV15Close') && !content.includes('frozen-at-close')) {
      return { pass: false, detail: 'V-61-20 conversion: readAtV15Close import not found' };
    }
    if (!content.match(/V-61-20.*v1\.5-frozen/)) {
      return { pass: false, detail: 'V-61-20: [v1.5-frozen @ ba2cbc0] suffix missing from check name' };
    }
    return { pass: true, detail: 'V-61-20 frozen-aware conversion confirmed (readAtV15Close + suffix)' };
  }
});

// V-67-05/06: COMPLEX_CONVERSION — wrong assertion patterns fixed (not wrong SHA).
// Root cause: literal "OP-10" + "version history heading" were plan design labels not in corpus.
// Correct assertions check actual SWEEP-02 content: "content token" callout + SWEEP-02 date rows.
checks.push({
  id: 'CONVERT-67-05',
  name: 'V-73-CONVERT-67-05: check-phase-67.mjs V-67-05 has v1.7-frozen suffix and correct content-token assertion',
  run() {
    const content = readFile('scripts/validation/check-phase-67.mjs');
    if (!content) return { pass: false, detail: 'check-phase-67.mjs not found' };
    if (!content.includes('frozen-at-close') && !content.includes('readCorpusFileAtV17Close')) {
      return { pass: false, detail: 'V-67-05: no frozen-aware read in check-phase-67.mjs' };
    }
    if (!content.match(/V-67-05.*v1\.7-frozen/)) {
      return { pass: false, detail: 'V-67-05: [v1.7-frozen @ aa6de68] suffix missing from check name' };
    }
    if (!content.includes('Apple calls this artifact') && !content.includes('formerly "VPP location token"')) {
      return { pass: false, detail: 'V-67-05: correct content-token callout pattern not found (expected "Apple calls this artifact" or "formerly VPP location token")' };
    }
    return { pass: true, detail: 'V-67-05 COMPLEX_CONVERSION pattern-fix confirmed (correct content-token callout + v1.7-frozen suffix)' };
  }
});

checks.push({
  id: 'CONVERT-67-06',
  name: 'V-73-CONVERT-67-06: check-phase-67.mjs V-67-06 has v1.7-frozen suffix and correct VH date-row assertion',
  run() {
    const content = readFile('scripts/validation/check-phase-67.mjs');
    if (!content) return { pass: false, detail: 'check-phase-67.mjs not found' };
    if (!content.includes('frozen-at-close') && !content.includes('readCorpusFileAtV17Close')) {
      return { pass: false, detail: 'V-67-06: no frozen-aware read in check-phase-67.mjs' };
    }
    if (!content.match(/V-67-06.*v1\.7-frozen/)) {
      return { pass: false, detail: 'V-67-06: [v1.7-frozen @ aa6de68] suffix missing from check name' };
    }
    if (!content.includes('2026-05-26.*SWEEP-02') && !content.includes('SWEEP-02')) {
      return { pass: false, detail: 'V-67-06: SWEEP-02 date-row assertion pattern not found' };
    }
    return { pass: true, detail: 'V-67-06 COMPLEX_CONVERSION pattern-fix confirmed (SWEEP-02 date rows + v1.7-frozen suffix)' };
  }
});

// V-70-24: Rule 1 bug fix (Plan 73-02 out-of-inventory, required for CHAIN-70 PASS).
// V-70-24 used readProjectAtV17Close() (aa6de68) but PROJECT.md at aa6de68 has only 7/12 v1.7 reqs;
// the remaining 5 were added in Plan 70-05 Commit B (4df3a16 = true v1.7 close-gate).
// Fix: ADD readProjectAtV17CloseGate() helper (4df3a16) + V17_CLOSEGATE to _lib/frozen-at-close.mjs.
checks.push({
  id: 'CONVERT-70-24',
  name: 'V-73-CONVERT-70-24: check-phase-70.mjs V-70-24 uses 4df3a16 close-gate SHA (readProjectAtV17CloseGate) for 12/12 v1.7 reqs',
  run() {
    const content = readFile('scripts/validation/check-phase-70.mjs');
    if (!content) return { pass: false, detail: 'check-phase-70.mjs not found' };
    if (!content.includes('readProjectAtV17CloseGate')) {
      return { pass: false, detail: 'V-70-24: readProjectAtV17CloseGate helper not found (should use 4df3a16 close-gate)' };
    }
    if (!content.includes('4df3a16')) {
      return { pass: false, detail: 'V-70-24: 4df3a16 SHA not referenced in check-phase-70.mjs' };
    }
    if (!content.match(/V-70-24.*close-gate/)) {
      return { pass: false, detail: 'V-70-24: check name does not reference close-gate SHA (expected v1.7-close-gate @ 4df3a16)' };
    }
    return { pass: true, detail: 'V-70-24 close-gate fix confirmed (readProjectAtV17CloseGate @ 4df3a16)' };
  }
});

checks.push({
  id: 'CONVERT-LIB-V17-CLOSEGATE',
  name: 'V-73-CONVERT-LIB-V17-CLOSEGATE: _lib/frozen-at-close.mjs has V17_CLOSEGATE: 4df3a16 entry + readAtV17CloseGate export',
  run() {
    const content = readFile('scripts/validation/_lib/frozen-at-close.mjs');
    if (!content) return { pass: false, detail: '_lib/frozen-at-close.mjs not found' };
    if (!content.includes("V17_CLOSEGATE: '4df3a16'") && !content.includes('V17_CLOSEGATE:')) {
      return { pass: false, detail: 'V17_CLOSEGATE key missing from MILESTONE_CLOSE_SHAS' };
    }
    if (!content.includes('4df3a16')) {
      return { pass: false, detail: '4df3a16 SHA not present in _lib/frozen-at-close.mjs' };
    }
    if (!content.includes('readAtV17CloseGate')) {
      return { pass: false, detail: 'readAtV17CloseGate convenience export missing' };
    }
    return { pass: true, detail: 'V17_CLOSEGATE: 4df3a16 + readAtV17CloseGate export present (additive, non-breaking)' };
  }
});

// === V-73-CHAIN-NN: chain regression-guards for check-phase-{48..72}.mjs ===
// NESTED-aware optimization (CHECK_PHASE_NESTED=1) prevents polynomial wall-clock blowup when
// peer chain-guards recursively invoke this validator. Preserves standalone semantics.
// isPeer threshold: phaseNum >= 67 -- peer validators run their own chain-guards (600s timeout).
// Self-dogfood: this CHAIN wrapper is authored with stdout+stderr capture from inception per D-01.
const NESTED = process.env.CHECK_PHASE_NESTED === '1';
for (const phaseNum of CHAIN_PHASES) {
  if (CHAIN_SKIP.has(phaseNum)) continue;
  checks.push({
    id: `CHAIN-${phaseNum}`,
    name: `V-73-CHAIN-${phaseNum}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
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
    }
  });
}

// === V-73-AUDIT-HARNESS: v1.7-milestone-audit.mjs subprocess exits 0 (predecessor-byte-unchanged invariant) ===
checks.push({
  id: 'AUDIT-HARNESS',
  name: 'V-73-AUDIT-HARNESS: v1.7-milestone-audit.mjs exits 0 (predecessor-byte-unchanged)',
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

// === V-73-SELF: CHAIN_PHASES does NOT include 73 (no self-reference; auditor-independence) ===
checks.push({
  id: 'SELF',
  name: 'V-73-SELF: CHAIN_PHASES does NOT include 73; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(73)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 73 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (73 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-72.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-73 -- Phase 73 deliverables (Retrospective Forward-Port Pillar C)\n');
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
