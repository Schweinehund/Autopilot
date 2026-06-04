#!/usr/bin/env node
// scripts/archive/test-extract-oneliner.mjs
//
// Companion unit-test fixture for scripts/archive/extract-summary-oneliners.mjs.
// Exits non-zero on recurrence of label-not-captured bug (the upstream gsd-sdk regex defect at
// phase-lifecycle-policy.ts:54-58 that vendored extractor fixes).
//
// 3 fixtures (V-71-FIX-02 grep-discoverability contract):
//   Fixture 1 — label-not-captured (proves corrected regex captures VALUE, not LABEL)
//   Fixture 2 — pre-write idempotency (frontmatter-injection no-op when one-liner present)
//   Fixture 3 — CRLF tolerance (corrected regex handles \r\n line endings)
//
// Exit code: 0 if all PASS, 1 if any FAIL.

import { extractOneLinerFromBody, preWriteFrontmatterOneLiner } from './extract-summary-oneliners.mjs';
import process from 'node:process';

const tests = [
  {
    name: 'Fixture 1 — label-not-captured (Phase 67 Plan 67-01 SUMMARY body shape)',
    kind: 'extract',
    input: `---\nphase: 67-x\n---\n\n# Phase 67 Plan 01: SWEEP Summary\n\n**One-liner:** Verified 4 ABM URLs alive\n\n## What Was Built\n`,
    expect: 'Verified 4 ABM URLs alive',
  },
  {
    name: 'Fixture 2 — pre-write idempotency (frontmatter one-liner already present)',
    kind: 'idempotency',
    input: `---\nphase: x\none-liner: "Already set"\n---\n\n# Title\n\n**One-liner:** ignored body value\n`,
    // For idempotency we compare the result to the input byte-for-byte.
  },
  {
    name: 'Fixture 3 — CRLF tolerance',
    kind: 'extract',
    input: `---\r\nphase: x\r\n---\r\n\r\n# Title\r\n\r\n**One-liner:** CRLF value here\r\n`,
    expect: 'CRLF value here',
  },
];

let passed = 0;
let failed = 0;
for (const t of tests) {
  if (t.kind === 'extract') {
    const got = extractOneLinerFromBody(t.input);
    if (got !== t.expect) {
      console.error(`FAIL: ${t.name}\n  expected: ${JSON.stringify(t.expect)}\n  got:      ${JSON.stringify(got)}`);
      failed++;
    } else {
      console.log(`PASS:  ${t.name}`);
      passed++;
    }
  } else if (t.kind === 'idempotency') {
    const got = preWriteFrontmatterOneLiner(t.input, 'should not appear');
    if (got !== t.input) {
      console.error(`FAIL: ${t.name}\n  expected: byte-identical input (no-op)\n  got:      modified content`);
      failed++;
    } else {
      console.log(`PASS:  ${t.name}`);
      passed++;
    }
  } else {
    console.error(`FAIL: ${t.name} — unknown fixture kind ${JSON.stringify(t.kind)}`);
    failed++;
  }
}

console.log(`\nResult: ${passed} PASS / ${failed} FAIL`);
process.exit(failed > 0 ? 1 : 0);
