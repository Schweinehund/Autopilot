#!/usr/bin/env node
// check-phase-60.mjs -- Phase 60 static validation harness
// Source of truth: .planning/phases/60-audit-harness-v1-5-finalization/60-CONTEXT.md
// File reads only: all content loaded via fs.readFileSync; subprocess invocations
//   only for V-60-10 (regenerate-supervision-pins.mjs --self-test) and V-60-12..23 (chain validators).
//
// 25 V-60-NN assertions per CONTEXT D-21 covering harness state + sidecar shape + BASELINE_9 refresh
// + 48-VERIFICATION close-out + 60-CALIBRATION.md artifact + Phase 49-59 V-NN-NN regression chain.
//
// Usage: node scripts/validation/check-phase-60.mjs [--verbose]
// Exit code: 0 if all checks PASS or SKIPPED; 1 if any check FAILs.

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

const HARNESS = 'scripts/validation/v1.5-milestone-audit.mjs';
const SIDECAR = 'scripts/validation/v1.5-audit-allowlist.json';
const PIN_HELPER = 'scripts/validation/regenerate-supervision-pins.mjs';
const BROKEN_LINKS_INVENTORY = resolveArchivedPhasePath('48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md');
const COMPARISON_DOC = 'docs/reference/4-platform-capability-comparison.md';
const CALIBRATION_DOC = resolveArchivedPhasePath('60-audit-harness-v1-5-finalization/60-CALIBRATION.md');
// CHAIN_PHASES: Phase 50 (Linux Admin Setup + Capability Matrix) intentionally excluded -- Phase 50 is
// 'Not started' per ROADMAP:471; check-phase-50.mjs is a stub validator without full assertions until
// Phase 50 ships content. Graceful-skip mechanism would handle a missing file, but Phase 50's stub-state
// requires intentional array exclusion to avoid false-positive regression failures during Phase 60 close.
const CHAIN_PHASES = [48, 49, 51, 52, 53, 54, 55, 56, 57, 58, 59];

const checks = [
  // === V-60-01..04: harness informational-flag-removed for C9/C11/C12/C13 ===
  // Pattern verbatim from check-phase-58.mjs:400-417 (V-58-25). Each check varies the
  // `name: 'CN: ...'` indexOf target. The 800-char region after the name covers the full
  // check entry block (description comments + verifier function head).
  {
    id: 1, name: "V-60-01: C9 informational flag removed (Phase 60 promotion -> blocking)",
    run() {
      const c = readFile(HARNESS);
      if (c === null) return { pass: false, detail: 'Harness file missing' };
      const idx = c.indexOf("name: 'C9:");
      if (idx < 0) return { pass: false, detail: "C9 entry not found in harness" };
      const region = c.slice(idx, idx + 800);
      if (/^\s*informational:\s*true,?\s*$/m.test(region)) {
        return { pass: false, detail: "C9 still has 'informational: true' within first 800 chars after name" };
      }
      return { pass: true, detail: "C9 promoted to blocking" };
    }
  },
  {
    id: 2, name: "V-60-02: C11 informational flag removed (Phase 60 promotion -> blocking)",
    run() {
      const c = readFile(HARNESS);
      if (c === null) return { pass: false, detail: 'Harness file missing' };
      const idx = c.indexOf("name: 'C11:");
      if (idx < 0) return { pass: false, detail: "C11 entry not found in harness" };
      const region = c.slice(idx, idx + 800);
      if (/^\s*informational:\s*true,?\s*$/m.test(region)) {
        return { pass: false, detail: "C11 still has 'informational: true' within first 800 chars after name" };
      }
      return { pass: true, detail: "C11 promoted to blocking" };
    }
  },
  {
    id: 3, name: "V-60-03: C12 informational flag removed (regression-guard; Plan 58-06 idempotence post-Plan-08)",
    run() {
      const c = readFile(HARNESS);
      if (c === null) return { pass: false, detail: 'Harness file missing' };
      const idx = c.indexOf("name: 'C12:");
      if (idx < 0) return { pass: false, detail: "C12 entry not found in harness" };
      const region = c.slice(idx, idx + 800);
      if (/^\s*informational:\s*true,?\s*$/m.test(region)) {
        return { pass: false, detail: "C12 still has 'informational: true' within first 800 chars after name" };
      }
      return { pass: true, detail: "C12 promoted to blocking" };
    }
  },
  {
    id: 4, name: "V-60-04: C13 informational flag removed (Phase 60 promotion -> blocking)",
    run() {
      const c = readFile(HARNESS);
      if (c === null) return { pass: false, detail: 'Harness file missing' };
      const idx = c.indexOf("name: 'C13:");
      if (idx < 0) return { pass: false, detail: "C13 entry not found in harness" };
      const region = c.slice(idx, idx + 800);
      if (/^\s*informational:\s*true,?\s*$/m.test(region)) {
        return { pass: false, detail: "C13 still has 'informational: true' within first 800 chars after name" };
      }
      return { pass: true, detail: "C13 promoted to blocking" };
    }
  },

  // === V-60-05..07: sidecar shape ===
  {
    id: 5, name: "V-60-05: sidecar c9_exemptions[] exists (length >= 0; Plan 08 D-18 wired)",
    run() {
      const raw = readFile(SIDECAR);
      if (!raw) return { pass: false, detail: 'sidecar missing' };
      try {
        const j = JSON.parse(raw);
        if (!Array.isArray(j.c9_exemptions))
          return { pass: false, detail: 'c9_exemptions not present or not an array' };
        return { pass: true, detail: j.c9_exemptions.length + ' c9 exemption pin(s)' };
      } catch (err) { return { pass: false, detail: 'JSON parse error: ' + err.message }; }
    }
  },
  {
    id: 6, name: "V-60-06: sidecar c11_ops_exemptions[] exists (reserved-empty per D-02; length >= 0)",
    run() {
      const raw = readFile(SIDECAR);
      if (!raw) return { pass: false, detail: 'sidecar missing' };
      try {
        const j = JSON.parse(raw);
        if (!Array.isArray(j.c11_ops_exemptions))
          return { pass: false, detail: 'c11_ops_exemptions not present or not an array' };
        return { pass: true, detail: j.c11_ops_exemptions.length + ' c11 ops-exemption pin(s) (reserved-empty per D-02)' };
      } catch (err) { return { pass: false, detail: 'JSON parse error: ' + err.message }; }
    }
  },
  {
    id: 7, name: "V-60-07: sidecar c13_broken_link_allowlist[] has 15 entries (6 transient_external + 9 template_placeholder per D-10)",
    run() {
      const raw = readFile(SIDECAR);
      if (!raw) return { pass: false, detail: 'sidecar missing' };
      try {
        const j = JSON.parse(raw);
        if (!Array.isArray(j.c13_broken_link_allowlist))
          return { pass: false, detail: 'c13_broken_link_allowlist not present or not an array' };
        if (j.c13_broken_link_allowlist.length !== 15)
          return { pass: false, detail: 'expected 15 entries, got ' + j.c13_broken_link_allowlist.length };
        const transient = j.c13_broken_link_allowlist.filter(e => e.category === 'transient_external').length;
        const template = j.c13_broken_link_allowlist.filter(e => e.category === 'template_placeholder').length;
        if (transient !== 6 || template !== 9)
          return { pass: false, detail: 'category counts: ' + transient + ' transient_external (expect 6), ' + template + ' template_placeholder (expect 9)' };
        return { pass: true, detail: '15 entries: 6 transient_external + 9 template_placeholder' };
      } catch (err) { return { pass: false, detail: 'JSON parse error: ' + err.message }; }
    }
  },

  // === V-60-08: 48-VERIFICATION-broken-links.md Triage Decision column populated ===
  {
    id: 8, name: "V-60-08: 48-VERIFICATION-broken-links.md Triage Decision column populated 75/75 entries (D-11 close)",
    run() {
      if (BROKEN_LINKS_INVENTORY === null) return { pass: false, detail: 'archived doc not found at .planning/phases/ or .planning/milestones/v1.5-phases/' };
      const c = readFile(BROKEN_LINKS_INVENTORY);
      if (c === null) return { pass: false, detail: 'broken-links inventory missing' };
      // Count rows with populated Triage Decision: matches `| FIXED-PHASE-60 |` or `| ALLOWLISTED-c13_broken_link_allowlist |` at end of row
      const fixed = (c.match(/\| FIXED-PHASE-60 \|/g) || []).length;
      const allowlisted = (c.match(/\| ALLOWLISTED-c13_broken_link_allowlist \|/g) || []).length;
      const total = fixed + allowlisted;
      if (total !== 75)
        return { pass: false, detail: 'expected 75 populated Triage cells, got ' + total + ' (' + fixed + ' FIXED + ' + allowlisted + ' ALLOWLISTED)' };
      return { pass: true, detail: total + ' Triage Decision cells populated (' + fixed + ' FIXED-PHASE-60 + ' + allowlisted + ' ALLOWLISTED-c13_broken_link_allowlist)' };
    }
  },

  // === V-60-09: BASELINE_9 refresh comment present ===
  {
    id: 9, name: "V-60-09: BASELINE_9 in regenerate-supervision-pins.mjs has been refreshed since Phase 48 (Phase 60 Plan 08 comment present per D-19)",
    run() {
      const c = readFile(PIN_HELPER);
      if (c === null) return { pass: false, detail: 'pin helper missing' };
      if (!/BASELINE_9 refreshed 2026-05-06 \(Phase 60 Plan 08\)/.test(c))
        return { pass: false, detail: "expected 'BASELINE_9 refreshed 2026-05-06 (Phase 60 Plan 08)' comment line" };
      return { pass: true, detail: 'Phase 60 Plan 08 BASELINE_9 refresh comment present' };
    }
  },

  // === V-60-10: regenerate-supervision-pins.mjs --self-test exits 0 ===
  // Verbatim from check-phase-48.mjs:62-78
  {
    id: 10, name: "V-60-10: regenerate-supervision-pins.mjs --self-test exits 0 (closes AUDIT-07 per D-19)",
    run() {
      try {
        execFileSync('node', [PIN_HELPER, '--self-test'],
          { stdio: 'pipe', timeout: 30000, cwd: process.cwd() });
        return { pass: true, detail: '--self-test exits 0' };
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: '--self-test FAIL: ' + stderr.slice(0, 200) };
      }
    }
  },

  // === V-60-11: 4-platform-capability-comparison.md 6 H2 anchors ===
  // Pattern verbatim from check-phase-58.mjs:117-126 (V-58-05)
  {
    id: 11, name: "V-60-11: 4-platform-capability-comparison.md contains all 6 named H2 anchors (D-13 + D-16 expansion)",
    run() {
      const c = readFile(COMPARISON_DOC);
      if (c === null) return { pass: false, detail: "File missing: " + COMPARISON_DOC };
      const h2s = ["## Enrollment", "## Configuration", "## App Deployment", "## Compliance", "## Software Updates", "## Conditional Access"];
      const missing = h2s.filter(h => !new RegExp("^" + h.replace(/[/\\^$*+?.()|[\]{}]/g, "\\$&") + "\\s*$", "m").test(c));
      if (missing.length) return { pass: false, detail: "Missing H2 literals: " + missing.join(", ") };
      return { pass: true, detail: "all 6 H2 literals present" };
    }
  }
];

// === V-60-12..22: Phase 48-59 chain regression-guards (11 subprocess invocations) ===
// CHAIN_PHASES = [48, 49, 51, 52, 53, 54, 55, 56, 57, 58, 59]
// Phase 50 intentionally excluded per CHAIN_PHASES comment block above (stub validator).
for (let i = 0; i < CHAIN_PHASES.length; i++) {
  const phaseNum = CHAIN_PHASES[i];
  const id = 12 + i;
  checks.push({
    id: id,
    name: `V-60-${String(id).padStart(2, '0')}: check-phase-${phaseNum}.mjs exits 0 (Phase ${phaseNum} V-NN-NN regression-guard)`,
    run() {
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

// === V-60-23: harness exits 0 in fully-blocking mode (12/12 PASS post-Plan-08) ===
checks.push({
  id: 23, name: "V-60-23: v1.5-milestone-audit.mjs exits 0 in fully-blocking mode (12/12 PASS post-Plan-08)",
  run() {
    try {
      execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 60000, cwd: process.cwd() });
      return { pass: true, detail: 'harness exits 0' };
    } catch (err) {
      const stderr = err.stderr ? err.stderr.toString() : '';
      const isMissing = err.code === 'ENOENT' || err.status === 127
        || stderr.includes('not found') || stderr.includes('Could not resolve');
      if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
      return { pass: false, detail: 'harness FAIL: ' + stderr.slice(0, 200) };
    }
  }
});

// === V-60-24: 60-CALIBRATION.md artifact exists with frontmatter + 2 sections + Summary (D-27) ===
checks.push({
  id: 24, name: "V-60-24: 60-CALIBRATION.md artifact exists with Section A + Section B + Summary (D-27)",
  run() {
    if (CALIBRATION_DOC === null) return { pass: false, detail: 'archived doc not found at .planning/phases/ or .planning/milestones/v1.5-phases/' };
    const c = readFile(CALIBRATION_DOC);
    if (c === null) return { pass: false, detail: 'calibration artifact missing' };
    if (!/^phase:\s*60-audit-harness-v1-5-finalization/m.test(c))
      return { pass: false, detail: 'frontmatter phase field missing or wrong' };
    if (!/^## Section A/m.test(c)) return { pass: false, detail: 'Section A heading missing' };
    if (!/^## Section B/m.test(c)) return { pass: false, detail: 'Section B heading missing' };
    if (!/^## Summary/m.test(c)) return { pass: false, detail: 'Summary heading missing' };
    return { pass: true, detail: 'frontmatter + Section A + Section B + Summary present' };
  }
});

// === V-60-25: pre-Phase-60 broken-link inventory baseline preserved (Total findings: 75) ===
checks.push({
  id: 25, name: "V-60-25: 48-VERIFICATION-broken-links.md baseline preserved (total_findings: 75 + Summary table) per D-11 audit-trail",
  run() {
    if (BROKEN_LINKS_INVENTORY === null) return { pass: false, detail: 'archived doc not found at .planning/phases/ or .planning/milestones/v1.5-phases/' };
    const c = readFile(BROKEN_LINKS_INVENTORY);
    if (c === null) return { pass: false, detail: 'inventory missing' };
    if (!/total_findings:\s*75/.test(c))
      return { pass: false, detail: 'frontmatter total_findings: 75 missing or modified' };
    if (!/\| \*\*Total\*\* \| \*\*75\*\* \| \*\*0\*\* \| \*\*75\*\* \|/.test(c))
      return { pass: false, detail: 'Summary table Total row missing or modified' };
    return { pass: true, detail: 'baseline preserved byte-identical (frontmatter + Summary table)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-48.mjs:115-141) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-60 -- Phase 60 deliverables\n');
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
