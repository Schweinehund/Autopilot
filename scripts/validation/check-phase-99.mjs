#!/usr/bin/env node
// check-phase-99.mjs -- Phase 99 deliverables (New Runbook #37 + Navigation Wiring)
//
// v1.13 per-phase validator. LIGHTWEIGHT base (NO chain -- chain lives ONLY in apex check-phase-100.mjs).
// Hard-assert all checks (no allowlist / no sidecar). CRLF-normalized reads.
//
// Tokens from: .planning/phases/99-new-runbook-navigation-wiring/99-NEEDLE-SPEC.md
// [VERIFIED: all tokens confirmed present 2026-06-29]
//
// COUNT ASSERTIONS:
//   N17: ](36-macos-secure-enclave-key.md) for the mandatory PSSO re-registration -- count >= 3
//        (appears once per recovery path in runbook 37: Path A, Path B, Path C)
//   N9/N10 consolidated: ](l1-runbooks/37-macos-local-password-reset.md) in quick-ref-l1.md -- count >= 2
//        (covers escalation-trigger bullet + runbook-list bullet)
//
// NOTE: check-phase-99 wraps committed content of 06-macos-triage.md -- do NOT edit that file.
// WR-02 was already fixed in Phase 99 commit 5d6ee80.
//
// Assertion classes:
//   V-99-PRESENCE-37      docs/l1-runbooks/37-macos-local-password-reset.md exists + non-empty
//   V-99-PRESENCE-36      docs/l1-runbooks/36-macos-secure-enclave-key.md exists + non-empty
//   V-99-PRESENCE-00IDX   docs/l1-runbooks/00-index.md exists + non-empty
//   V-99-PRESENCE-IDX     docs/index.md exists + non-empty
//   V-99-PRESENCE-CI      docs/common-issues.md exists + non-empty
//   V-99-PRESENCE-QR      docs/quick-ref-l1.md exists + non-empty
//   V-99-PRESENCE-06      docs/decision-trees/06-macos-triage.md exists + non-empty
//   V-99-CONTENT-N2       'audience: L1' in runbook 37
//   V-99-CONTENT-N3       'platform: macOS' in runbook 37
//   V-99-CONTENT-N4       'applies_to: ADE' in runbook 37
//   V-99-CONTENT-N16      'does NOT reset the independent local macOS password' in runbook 37
//   V-99-CONTENT-N17      count >= 3 of hand-off link in runbook 37
//   V-99-CONTENT-N5       '](37-macos-local-password-reset.md)' in 00-index.md
//   V-99-CONTENT-N6       '](l1-runbooks/37-macos-local-password-reset.md)' in docs/index.md
//   V-99-CONTENT-N7       '](l1-runbooks/37-macos-local-password-reset.md)' in common-issues.md
//   V-99-CONTENT-N8       '](l2-runbooks/27-macos-sso-investigation.md)' in common-issues.md
//   V-99-CONTENT-N9       '](l1-runbooks/37-macos-local-password-reset.md)' count >= 2 in quick-ref-l1.md
//   V-99-CONTENT-N11      'MACR9' in 06-macos-triage.md
//   V-99-CONTENT-N12      'click MACR9' in 06-macos-triage.md
//   V-99-CONTENT-N13      '../l1-runbooks/37-macos-local-password-reset.md' in 06-macos-triage.md
//   V-99-CONTENT-N14      'Runbook 37' in 06-macos-triage.md
//   V-99-CONTENT-N15      '](37-macos-local-password-reset.md)' in 36-macos-secure-enclave-key.md
//   V-99-SELF             CHAIN_PHASES does NOT include 99 AND CHAIN_SKIP is empty Set (dual-invariant)
//
// Lineage: Path-A structural shell from check-phase-94.mjs; 23-check needle spec from 99-NEEDLE-SPEC.md.
//
// Usage: node scripts/validation/check-phase-99.mjs [--verbose]
// Exit code: 0 if all PASS or SKIPPED; 1 if any FAIL.

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

// Lightweight: NO chain (chain lives only in apex check-phase-100.mjs).
const CHAIN_PHASES = [];
// CHAIN_SKIP topology: empty per Phase 68 7b635ca invariant -- no entries to suppress.
const CHAIN_SKIP = new Set([]);

// Phase 99 deliverables (7 files)
const DELIVERABLE_37    = 'docs/l1-runbooks/37-macos-local-password-reset.md';
const DELIVERABLE_36    = 'docs/l1-runbooks/36-macos-secure-enclave-key.md';
const DELIVERABLE_00IDX = 'docs/l1-runbooks/00-index.md';
const DELIVERABLE_IDX   = 'docs/index.md';
const DELIVERABLE_CI    = 'docs/common-issues.md';
const DELIVERABLE_QR    = 'docs/quick-ref-l1.md';
const DELIVERABLE_06    = 'docs/decision-trees/06-macos-triage.md';

const PRESENCE_TARGETS = [
  { id: 'PRESENCE-37',    file: DELIVERABLE_37 },
  { id: 'PRESENCE-36',    file: DELIVERABLE_36 },
  { id: 'PRESENCE-00IDX', file: DELIVERABLE_00IDX },
  { id: 'PRESENCE-IDX',   file: DELIVERABLE_IDX },
  { id: 'PRESENCE-CI',    file: DELIVERABLE_CI },
  { id: 'PRESENCE-QR',    file: DELIVERABLE_QR },
  { id: 'PRESENCE-06',    file: DELIVERABLE_06 },
];

const checks = [];

// === V-99-PRESENCE-*: 7 phase deliverables exist + non-empty ===
// Generated check IDs (for static auditability / greppability):
//   PRESENCE-37 PRESENCE-36 PRESENCE-00IDX PRESENCE-IDX PRESENCE-CI PRESENCE-QR PRESENCE-06
for (const t of PRESENCE_TARGETS) {
  checks.push({
    id: t.id,
    name: `V-99-${t.id}: ${t.file} exists and is non-empty`,
    run() {
      const c = readFile(t.file);
      if (c === null) return { pass: false, detail: t.file + ' missing' };
      if (c.trim().length === 0) return { pass: false, detail: t.file + ' is empty' };
      return { pass: true, detail: t.file + ' present (' + c.length + ' bytes)' };
    }
  });
}

// === V-99-CONTENT-N2/N3/N4: runbook 37 frontmatter needles ===
checks.push({
  id: 'CONTENT-N2',
  name: "V-99-CONTENT-N2: runbook 37 contains 'audience: L1'",
  run() {
    const c = readFile(DELIVERABLE_37);
    if (c === null) return { pass: false, detail: DELIVERABLE_37 + ' missing' };
    if (!c.includes('audience: L1')) return { pass: false, detail: "N2 needle absent: 'audience: L1'" };
    return { pass: true, detail: 'N2 needle present' };
  }
});

checks.push({
  id: 'CONTENT-N3',
  name: "V-99-CONTENT-N3: runbook 37 contains 'platform: macOS'",
  run() {
    const c = readFile(DELIVERABLE_37);
    if (c === null) return { pass: false, detail: DELIVERABLE_37 + ' missing' };
    if (!c.includes('platform: macOS')) return { pass: false, detail: "N3 needle absent: 'platform: macOS'" };
    return { pass: true, detail: 'N3 needle present' };
  }
});

checks.push({
  id: 'CONTENT-N4',
  name: "V-99-CONTENT-N4: runbook 37 contains 'applies_to: ADE'",
  run() {
    const c = readFile(DELIVERABLE_37);
    if (c === null) return { pass: false, detail: DELIVERABLE_37 + ' missing' };
    if (!c.includes('applies_to: ADE')) return { pass: false, detail: "N4 needle absent: 'applies_to: ADE'" };
    return { pass: true, detail: 'N4 needle present' };
  }
});

// === V-99-CONTENT-N16: SSPR clarification fragment ===
checks.push({
  id: 'CONTENT-N16',
  name: "V-99-CONTENT-N16: runbook 37 contains SSPR clarification 'does NOT reset the independent local macOS password'",
  run() {
    const c = readFile(DELIVERABLE_37);
    if (c === null) return { pass: false, detail: DELIVERABLE_37 + ' missing' };
    if (!c.includes('does NOT reset the independent local macOS password')) return { pass: false, detail: 'N16 needle absent: SSPR clarification fragment' };
    return { pass: true, detail: 'N16 needle present' };
  }
});

// === V-99-CONTENT-N17: hand-off link count >= 3 in runbook 37 ===
// The text appears once per recovery path: Path A, Path B, Path C -- 3 total.
checks.push({
  id: 'CONTENT-N17',
  name: "V-99-CONTENT-N17: runbook 37 contains PSSO re-registration hand-off link (count >= 3)",
  run() {
    const c = readFile(DELIVERABLE_37);
    if (c === null) return { pass: false, detail: DELIVERABLE_37 + ' missing' };
    const needle = '](36-macos-secure-enclave-key.md) for the mandatory PSSO re-registration';
    const count = (c.match(new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
    if (count < 3) return { pass: false, detail: 'N17 count FAIL: found ' + count + ' occurrence(s), expected >= 3' };
    return { pass: true, detail: 'N17 hand-off link appears ' + count + ' time(s) (>= 3)' };
  }
});

// === V-99-CONTENT-N5: 00-index.md contains runbook 37 link ===
checks.push({
  id: 'CONTENT-N5',
  name: "V-99-CONTENT-N5: 00-index.md contains '](37-macos-local-password-reset.md)'",
  run() {
    const c = readFile(DELIVERABLE_00IDX);
    if (c === null) return { pass: false, detail: DELIVERABLE_00IDX + ' missing' };
    if (!c.includes('](37-macos-local-password-reset.md)')) return { pass: false, detail: 'N5 needle absent' };
    return { pass: true, detail: 'N5 needle present' };
  }
});

// === V-99-CONTENT-N6: docs/index.md contains runbook 37 link ===
checks.push({
  id: 'CONTENT-N6',
  name: "V-99-CONTENT-N6: docs/index.md contains '](l1-runbooks/37-macos-local-password-reset.md)'",
  run() {
    const c = readFile(DELIVERABLE_IDX);
    if (c === null) return { pass: false, detail: DELIVERABLE_IDX + ' missing' };
    if (!c.includes('](l1-runbooks/37-macos-local-password-reset.md)')) return { pass: false, detail: 'N6 needle absent' };
    return { pass: true, detail: 'N6 needle present' };
  }
});

// === V-99-CONTENT-N7: common-issues.md contains runbook 37 link ===
checks.push({
  id: 'CONTENT-N7',
  name: "V-99-CONTENT-N7: common-issues.md contains '](l1-runbooks/37-macos-local-password-reset.md)'",
  run() {
    const c = readFile(DELIVERABLE_CI);
    if (c === null) return { pass: false, detail: DELIVERABLE_CI + ' missing' };
    if (!c.includes('](l1-runbooks/37-macos-local-password-reset.md)')) return { pass: false, detail: 'N7 needle absent' };
    return { pass: true, detail: 'N7 needle present' };
  }
});

// === V-99-CONTENT-N8: common-issues.md contains L2 escalation link ===
checks.push({
  id: 'CONTENT-N8',
  name: "V-99-CONTENT-N8: common-issues.md contains '](l2-runbooks/27-macos-sso-investigation.md)'",
  run() {
    const c = readFile(DELIVERABLE_CI);
    if (c === null) return { pass: false, detail: DELIVERABLE_CI + ' missing' };
    if (!c.includes('](l2-runbooks/27-macos-sso-investigation.md)')) return { pass: false, detail: 'N8 needle absent' };
    return { pass: true, detail: 'N8 needle present' };
  }
});

// === V-99-CONTENT-N9: quick-ref-l1.md contains runbook 37 link (count >= 2) ===
// Consolidates N9 (escalation-trigger bullet) + N10 (runbook-list bullet) per RESEARCH
// §"check-phase-99.mjs" and 99-NEEDLE-SPEC.md Open-Questions resolution.
checks.push({
  id: 'CONTENT-N9',
  name: "V-99-CONTENT-N9: quick-ref-l1.md contains '](l1-runbooks/37-macos-local-password-reset.md)' (count >= 2, covers escalation-trigger + runbook-list bullets)",
  run() {
    const c = readFile(DELIVERABLE_QR);
    if (c === null) return { pass: false, detail: DELIVERABLE_QR + ' missing' };
    const needle = '](l1-runbooks/37-macos-local-password-reset.md)';
    const count = (c.split(needle).length - 1);
    if (count < 2) return { pass: false, detail: 'N9/N10 count FAIL: found ' + count + ' occurrence(s), expected >= 2' };
    return { pass: true, detail: 'N9/N10 link appears ' + count + ' time(s) in quick-ref-l1.md (>= 2)' };
  }
});

// === V-99-CONTENT-N11..N14: 06-macos-triage.md needles ===
// NOTE: this validator WRAPS committed content -- do NOT edit 06-macos-triage.md here.
// WR-02 was fixed in Phase 99 commit 5d6ee80.
checks.push({
  id: 'CONTENT-N11',
  name: "V-99-CONTENT-N11: 06-macos-triage.md contains 'MACR9' (new leaf node id)",
  run() {
    const c = readFile(DELIVERABLE_06);
    if (c === null) return { pass: false, detail: DELIVERABLE_06 + ' missing' };
    if (!c.includes('MACR9')) return { pass: false, detail: "N11 needle absent: 'MACR9'" };
    return { pass: true, detail: 'N11 needle present' };
  }
});

checks.push({
  id: 'CONTENT-N12',
  name: "V-99-CONTENT-N12: 06-macos-triage.md contains 'click MACR9' (click target directive)",
  run() {
    const c = readFile(DELIVERABLE_06);
    if (c === null) return { pass: false, detail: DELIVERABLE_06 + ' missing' };
    if (!c.includes('click MACR9')) return { pass: false, detail: "N12 needle absent: 'click MACR9'" };
    return { pass: true, detail: 'N12 needle present' };
  }
});

checks.push({
  id: 'CONTENT-N13',
  name: "V-99-CONTENT-N13: 06-macos-triage.md contains '../l1-runbooks/37-macos-local-password-reset.md' (click target URL)",
  run() {
    const c = readFile(DELIVERABLE_06);
    if (c === null) return { pass: false, detail: DELIVERABLE_06 + ' missing' };
    if (!c.includes('../l1-runbooks/37-macos-local-password-reset.md')) return { pass: false, detail: 'N13 needle absent' };
    return { pass: true, detail: 'N13 needle present' };
  }
});

checks.push({
  id: 'CONTENT-N14',
  name: "V-99-CONTENT-N14: 06-macos-triage.md contains 'Runbook 37' (routing-verification table row)",
  run() {
    const c = readFile(DELIVERABLE_06);
    if (c === null) return { pass: false, detail: DELIVERABLE_06 + ' missing' };
    if (!c.includes('Runbook 37')) return { pass: false, detail: "N14 needle absent: 'Runbook 37'" };
    return { pass: true, detail: 'N14 needle present' };
  }
});

// === V-99-CONTENT-N15: runbook 36 reciprocal cross-link ===
// Same literal string as N5 ('](37-macos-local-password-reset.md)') but in a different file.
// Needle tested against DELIVERABLE_36 specifically.
checks.push({
  id: 'CONTENT-N15',
  name: "V-99-CONTENT-N15: runbook 36 contains reciprocal cross-link '](37-macos-local-password-reset.md)'",
  run() {
    const c = readFile(DELIVERABLE_36);
    if (c === null) return { pass: false, detail: DELIVERABLE_36 + ' missing' };
    if (!c.includes('](37-macos-local-password-reset.md)')) return { pass: false, detail: "N15 needle absent: '](37-macos-local-password-reset.md)' in runbook 36" };
    return { pass: true, detail: 'N15 reciprocal cross-link present in runbook 36' };
  }
});

// === V-99-SELF: dual-invariant guard (CHAIN_PHASES excludes 99; CHAIN_SKIP empty) ===
checks.push({
  id: 'SELF',
  name: 'V-99-SELF: CHAIN_PHASES does NOT include 99; CHAIN_SKIP is empty Set',
  run() {
    if (CHAIN_PHASES.includes(99)) {
      return { pass: false, detail: 'CHAIN_PHASES includes 99 -- self-reference regression' };
    }
    if (CHAIN_SKIP.size !== 0) {
      const skipList = [...CHAIN_SKIP].join(',');
      return { pass: false, detail: 'CHAIN_SKIP non-empty (' + skipList + ') -- Phase 68 7b635ca empty-Set invariant violated' };
    }
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] (99 absent); CHAIN_SKIP = [] (Phase 68 7b635ca invariant)' };
  }
});

// === Runner loop (verbatim pattern from check-phase-71.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-99 -- Phase 99 deliverables (New Runbook #37 + Navigation Wiring)\n');
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
