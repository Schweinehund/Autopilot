// scripts/validation/_lib/exec-fail-detail.mjs
//
// Centralizes the (stdout + stderr).slice(0, N)[.trim()] failure-detail pattern
// across CHAIN/AUDIT/helper-spawn wrapper sites (TOOL-01: EXEC-FAIL-DETAIL-EXTRACTION-01).
//
// Lineage: Phase 111 Plan 111-01 — Pillar D chain-validator tooling refactors.
// Cites D-02 (per-call-site N/trim/prefix, byte-preserving) and D-04 (separate raw stream args).
//
// Per D-04: takes separate raw stdout/stderr args (not an error object) so it works for both:
//   - Non-throwing spawn-result sites (result.stdout / result.stderr)
//   - catch-block TOOL-03 sites (err.stdout / err.stderr, now capturing both streams)
//
// Per D-02: every call site passes n, trim, and prefix EXPLICITLY.
// Defaults are a documented safety net, not a shortcut.
//
// Usage:
//   import { execFailDetail } from './_lib/exec-fail-detail.mjs';
//   return { pass: false, detail: execFailDetail(stdout, stderr, { n: 500, trim: true, prefix: 'check-phase-N FAIL: ' }) };

/**
 * Build a failure-detail string from subprocess stdout + stderr.
 *
 * @param {string} stdout  - raw stdout string (use `err.stdout ? err.stdout.toString() : ''`)
 * @param {string} stderr  - raw stderr string (use `err.stderr ? err.stderr.toString() : ''`)
 * @param {object} opts
 * @param {number} opts.n  - slice length (REQUIRED — no default; per D-02 explicit-only)
 * @param {boolean} [opts.trim=false] - whether to trim whitespace after slicing
 * @param {string} [opts.prefix=''] - prefix string prepended to the slice
 * @returns {string}
 */
export function execFailDetail(stdout, stderr, { n, trim = false, prefix = '' }) {
  const combined = stdout + stderr;
  const sliced = combined.slice(0, n);
  return prefix + (trim ? sliced.trim() : sliced);
}

export function selfTest() {
  const assert = (actual, expected, label) => {
    if (actual !== expected) throw new Error(
      `selfTest FAIL [${label}]: expected ${JSON.stringify(expected)} got ${JSON.stringify(actual)}`
    );
  };
  // Variant A: n=500, trim=true
  assert(execFailDetail('abc', 'def', { n: 500, trim: true, prefix: 'X FAIL: ' }), 'X FAIL: abcdef', 'A-basic');
  assert(execFailDetail('  ab', '  cd  ', { n: 500, trim: true, prefix: 'P: ' }), 'P: ab  cd', 'A-trim');
  // Variant C: n=300, trim=false
  assert(execFailDetail('abc', 'def', { n: 300, trim: false, prefix: 'harness FAIL: ' }), 'harness FAIL: abcdef', 'C-basic');
  assert(execFailDetail('  ab', '  cd  ', { n: 300, trim: false, prefix: 'H: ' }), 'H:   ab  cd  ', 'C-no-trim');
  // Slice at n
  assert(execFailDetail('12345', '67890', { n: 7, trim: false, prefix: '' }), '1234567', 'slice-n');
  return 'execFailDetail selfTest: all assertions passed';
}

if (process.argv.includes('--self-test')) { console.log(selfTest()); }
