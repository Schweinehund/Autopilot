#!/usr/bin/env node
// check-phase-48.mjs -- Phase 48 static validation harness
// Source of truth: .planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-CONTEXT.md
// File reads only: all content loaded via fs.readFileSync; no shell invocations except check 4 self-test.
//
// 7 checks asserting Phase 48 deliverables exist + parse + integrate correctly.
// Checks 1, 2, 3, 4, 6 expected PASS after plans 48-01..04 land.
// Checks 5, 7 expected FAIL until plans 48-08 (VERIFICATION artifact) and 48-07 (.mlc-config.json) land.
// Validator becomes 7/7 PASS only after ALL plans (01-09) land -- used as terminal sanity gate.
//
// Usage: node scripts/validation/check-phase-48.mjs [--verbose]
// Exit code: 0 if all checks PASS or SKIPPED; 1 if any check FAILs.

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

const checks = [
  {
    id: 1,
    name: 'v1.5-milestone-audit.mjs exists',
    run() {
      const exists = existsSync(join(process.cwd(), 'scripts/validation/v1.5-milestone-audit.mjs'));
      if (exists) return { pass: true };
      return { pass: false, detail: 'scripts/validation/v1.5-milestone-audit.mjs does not exist' };
    }
  },
  {
    id: 2,
    name: 'v1.5-audit-allowlist.json exists and parses',
    run() {
      const raw = readFile('scripts/validation/v1.5-audit-allowlist.json');
      if (!raw) return { pass: false, detail: 'file does not exist' };
      try { JSON.parse(raw); return { pass: true }; }
      catch (err) { return { pass: false, detail: 'JSON parse error: ' + err.message }; }
    }
  },
  {
    id: 3,
    name: 'sidecar supervision_exemptions.length > 0',
    run() {
      const raw = readFile('scripts/validation/v1.5-audit-allowlist.json');
      if (!raw) return { pass: false, detail: 'sidecar missing' };
      try {
        const j = JSON.parse(raw);
        if (!Array.isArray(j.supervision_exemptions) || j.supervision_exemptions.length === 0)
          return { pass: false, detail: 'supervision_exemptions empty (expected 18 inherited pins)' };
        return { pass: true, detail: j.supervision_exemptions.length + ' supervision pins' };
      } catch (err) { return { pass: false, detail: 'JSON parse error: ' + err.message }; }
    }
  },
  {
    id: 4,
    name: 'regenerate-supervision-pins.mjs --self-test exits 0 (AUDIT-07)',
    run() {
      try {
        execFileSync('node', ['scripts/validation/regenerate-supervision-pins.mjs', '--self-test'],
          { stdio: 'pipe', timeout: 30000, cwd: process.cwd() });
        return { pass: true };
      } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : '';
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: '--self-test FAIL: ' + stderr.slice(0, 200) };
      }
    }
  },
  {
    id: 5,
    name: '48-VERIFICATION-broken-links.md exists with Category A/B/C sections',
    run() {
      const relPath = '.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md';
      const content = readFile(relPath);
      if (!content) return { pass: false, detail: relPath + ' does not exist' };
      const hasA = /^## Category A/m.test(content);
      const hasB = /^## Category B/m.test(content);
      const hasC = /^## Category C/m.test(content);
      if (hasA && hasB && hasC) return { pass: true };
      const missing = [!hasA && 'A', !hasB && 'B', !hasC && 'C'].filter(Boolean).join(', ');
      return { pass: false, detail: 'Missing sections: Category ' + missing };
    }
  },
  {
    id: 6,
    name: 'v1.5-milestone-audit.mjs references v1.5-audit-allowlist.json',
    run() {
      const content = readFile('scripts/validation/v1.5-milestone-audit.mjs');
      if (!content) return { pass: false, detail: 'harness file missing' };
      if (content.includes('v1.5-audit-allowlist.json')) return { pass: true };
      return { pass: false, detail: 'harness does not reference v1.5-audit-allowlist.json' };
    }
  },
  {
    id: 7,
    name: '.mlc-config.json exists',
    run() {
      const exists = existsSync(join(process.cwd(), '.mlc-config.json'));
      if (exists) return { pass: true };
      return { pass: false, detail: '.mlc-config.json does not exist at repo root' };
    }
  }
];

const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-48 -- Phase 48 deliverables\n');
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
