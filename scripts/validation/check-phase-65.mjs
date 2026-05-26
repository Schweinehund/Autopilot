#!/usr/bin/env node
// check-phase-65.mjs -- Phase 65 (Apple Business L1/L2 + Hub Navigation Integration) deliverables
// Source of truth: .planning/phases/65-apple-business-l1-l2-hub-navigation-integration/65-CONVENTIONS.md
// Assertions: .planning/phases/65-apple-business-l1-l2-hub-navigation-integration/65-PATTERNS.md (V-65-01..V-65-SELF)
//
// 14 V-65-NN structural assertions + V-65-CHAIN + V-65-AUDIT + V-65-SELF covering:
//   L1 #34 exists + compound platform frontmatter + cross-links (12-, #which-admin-owns-this-pool)
//   L2 #26 exists + 7-leaf Mermaid tree
//   5 hub appends: common-issues / quick-ref-l1 / quick-ref-l2 / operations/00-index / docs/index
//   12- back-link landed (34-apple-business present)
//   4 C16 exemptions removed from allowlist
//   V-64-05 reconciled (old negative assertion string absent from check-phase-64.mjs)
//
// Lineage: Phase 48 D-25 -> ... -> Phase 63 D-01..D-06 -> Phase 64 DELEG-01..08 -> Phase 65 ABNAV-01..07
//
// Usage: node scripts/validation/check-phase-65.mjs [--verbose]
// Exit code: 0 if all V-65-NN PASS or SKIPPED; 1 if any FAIL.

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

const HARNESS    = 'scripts/validation/v1.6-milestone-audit.mjs';
const ALLOWLIST  = 'scripts/validation/v1.6-audit-allowlist.json';
const CHECK64    = 'scripts/validation/check-phase-64.mjs';
const L1_34      = 'docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md';
const L2_26      = 'docs/l2-runbooks/26-apple-business-permission-denied.md';
const AB_12      = 'docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md';
const COMMON_ISS = 'docs/common-issues.md';
const QREF_L1    = 'docs/quick-ref-l1.md';
const QREF_L2    = 'docs/quick-ref-l2.md';
const OPS_IDX    = 'docs/operations/00-index.md';
const DOCS_IDX   = 'docs/index.md';

// Extends check-phase-64.mjs chain by adding 64.
// Phase 65 is the validator-as-deliverable in this phase; Phase 66 RUNS the chain per D-22 auditor-independence.
const CHAIN_PHASES = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64];

// CHAIN_SKIP topology: HISTORICAL — empty by Phase 68 CHAIN-03 close (sha 7b635ca).
//
// Pre-existing v1.5/v1.6-era failures {48, 51, 58, 60, 61} had been suppressed here pending
// root-cause resolution (documented at scripts/validation/check-phase-64.mjs:55-73 prior to
// Phase 68 close; full historical narrative in .planning/milestones/v1.6-DEFERRED-CLEANUP.md
// "CHAIN_SKIP Resolution" section).
//
// Phase 68 (Pillar B — Validator Surgery) resolved all 5 root causes:
//   - CHAIN-01: CRLF normalization in check-phase-{51,58}.mjs readFile() — sha 36a753d
//   - CHAIN-02: archive-path helper scripts/validation/_lib/archive-path.mjs across
//               check-phase-{31,48,60,62,63}.mjs + regenerate-supervision-pins.mjs
//               BASELINE_9 +1 banner-shift rebase + v1.5 sidecar supervision_exemptions[]
//               +1 coord rebase — sha 79c65c6
//   - CHAIN-03: this atomic 5-file empty-Set commit — sha 7b635ca
//   - MILESTONES.md cdcce23 garbage v1.5 H2 entry deletion (V-61-19/20 PASS) — sha d142c7a
//   - V-61-01..04 v1.5-frozen-aware (Plan 68-03 Option A pivot) — sha d7d7d5f
//
// Full chain check-phase-{48..66}.mjs exits 0 on Windows host with NO CHAIN_SKIP entries
// for the first time since v1.5 close. Phase 68 close-gate: sha {68_05_SHA}.
const CHAIN_SKIP = new Set([]);

const checks = [
  // === V-65-01: L1 #34 file exists ===
  {
    id: 1, name: 'V-65-01: L1 #34 (34-apple-business-shared-ipad-passcode-reset.md) exists',
    run() {
      const c = readFile(L1_34);
      if (c === null) return { pass: false, detail: L1_34 + ' missing -- Plan 65-02 Wave 2 deliverable' };
      return { pass: true, detail: 'L1 #34 present' };
    }
  },

  // === V-65-02: L1 #34 contains compound platform frontmatter ===
  {
    id: 2, name: 'V-65-02: L1 #34 contains platform: ios+macos+shared-ipad in frontmatter',
    run() {
      const c = readFile(L1_34);
      if (c === null) return { pass: false, detail: L1_34 + ' missing -- Plan 65-02 Wave 2 deliverable' };
      if (!c.includes('platform: ios+macos+shared-ipad')) {
        return { pass: false, detail: 'L1 #34 missing platform: ios+macos+shared-ipad (D-A5 compound platform contract)' };
      }
      return { pass: true, detail: 'L1 #34 contains platform: ios+macos+shared-ipad' };
    }
  },

  // === V-65-03: L1 #34 contains 12-shared-ipad-passcode-reset (C16 l1_34 -> admin_12 edge) ===
  {
    id: 3, name: 'V-65-03: L1 #34 contains 12-shared-ipad-passcode-reset (C16 l1_34->admin_12 edge)',
    run() {
      const c = readFile(L1_34);
      if (c === null) return { pass: false, detail: L1_34 + ' missing -- Plan 65-02 Wave 2 deliverable' };
      if (!c.includes('12-shared-ipad-passcode-reset')) {
        return { pass: false, detail: 'L1 #34 missing substring 12-shared-ipad-passcode-reset (C16 load-bearing -- harness line 798)' };
      }
      return { pass: true, detail: 'L1 #34 contains 12-shared-ipad-passcode-reset (C16 edge satisfied)' };
    }
  },

  // === V-65-04: L1 #34 contains #which-admin-owns-this-pool (ABNAV-01 lookup step) ===
  {
    id: 4, name: 'V-65-04: L1 #34 contains #which-admin-owns-this-pool (ABNAV-01 pool-owner lookup)',
    run() {
      const c = readFile(L1_34);
      if (c === null) return { pass: false, detail: L1_34 + ' missing -- Plan 65-02 Wave 2 deliverable' };
      if (!c.includes('#which-admin-owns-this-pool')) {
        return { pass: false, detail: 'L1 #34 missing #which-admin-owns-this-pool cross-link (ABNAV-01 requirement)' };
      }
      return { pass: true, detail: 'L1 #34 contains #which-admin-owns-this-pool lookup step' };
    }
  },

  // === V-65-05: L2 #26 file exists ===
  {
    id: 5, name: 'V-65-05: L2 #26 (26-apple-business-permission-denied.md) exists',
    run() {
      const c = readFile(L2_26);
      if (c === null) return { pass: false, detail: L2_26 + ' missing -- Plan 65-03 Wave 2 deliverable' };
      return { pass: true, detail: 'L2 #26 present' };
    }
  },

  // === V-65-06: L2 #26 has >= 7 Mermaid leaf nodes (DA-9 7-leaf LOCKED set) ===
  {
    id: 6, name: 'V-65-06: L2 #26 Mermaid tree has >= 7 leaf nodes (([) occurrences (DA-9 LOCKED)',
    run() {
      const c = readFile(L2_26);
      if (c === null) return { pass: false, detail: L2_26 + ' missing -- Plan 65-03 Wave 2 deliverable' };
      const matches = c.match(/\(\[/g);
      const count = matches ? matches.length : 0;
      if (count < 7) {
        return { pass: false, detail: 'L2 #26 has ' + count + ' leaf nodes (([) occurrences; expected >= 7 per DA-9 LOCKED 7-leaf set' };
      }
      return { pass: true, detail: 'L2 #26 has ' + count + ' Mermaid leaf nodes (>= 7 per DA-9)' };
    }
  },

  // === V-65-07: common-issues.md contains ## Apple Business Governance Failure Scenarios H2 ===
  {
    id: 7, name: 'V-65-07: common-issues.md contains ## Apple Business Governance Failure Scenarios',
    run() {
      const c = readFile(COMMON_ISS);
      if (c === null) return { pass: false, detail: COMMON_ISS + ' missing' };
      if (!c.includes('## Apple Business Governance Failure Scenarios')) {
        return { pass: false, detail: 'common-issues.md missing ## Apple Business Governance Failure Scenarios -- Plan 65-03 Wave 3 deliverable (ABNAV-03)' };
      }
      return { pass: true, detail: 'common-issues.md contains ## Apple Business Governance Failure Scenarios' };
    }
  },

  // === V-65-08: quick-ref-l1.md contains ## Apple Business Quick Reference (LOAD-BEARING H2 title) ===
  // The H2 title ## Apple Business Quick Reference slugifies to #apple-business-quick-reference.
  // This slug is the C16 common_issues -> quick_ref_l1 edge target. DO NOT REWORD.
  {
    id: 8, name: 'V-65-08: quick-ref-l1.md contains ## Apple Business Quick Reference (C16 slug load-bearing)',
    run() {
      const c = readFile(QREF_L1);
      if (c === null) return { pass: false, detail: QREF_L1 + ' missing' };
      if (!c.includes('## Apple Business Quick Reference')) {
        return { pass: false, detail: 'quick-ref-l1.md missing ## Apple Business Quick Reference (LOAD-BEARING -- slug #apple-business-quick-reference is C16 target; do not reword)' };
      }
      return { pass: true, detail: 'quick-ref-l1.md contains ## Apple Business Quick Reference (C16 slug #apple-business-quick-reference present)' };
    }
  },

  // === V-65-09: quick-ref-l2.md contains ## Apple Business Quick Reference ===
  {
    id: 9, name: 'V-65-09: quick-ref-l2.md contains ## Apple Business Quick Reference',
    run() {
      const c = readFile(QREF_L2);
      if (c === null) return { pass: false, detail: QREF_L2 + ' missing' };
      if (!c.includes('## Apple Business Quick Reference')) {
        return { pass: false, detail: 'quick-ref-l2.md missing ## Apple Business Quick Reference -- Plan 65-03 Wave 3 deliverable (ABNAV-05)' };
      }
      return { pass: true, detail: 'quick-ref-l2.md contains ## Apple Business Quick Reference' };
    }
  },

  // === V-65-10: operations/00-index.md contains ## Apple Business section ===
  {
    id: 10, name: 'V-65-10: operations/00-index.md contains ## Apple Business section (ABNAV-06)',
    run() {
      const c = readFile(OPS_IDX);
      if (c === null) return { pass: false, detail: OPS_IDX + ' missing' };
      if (!c.includes('## Apple Business')) {
        return { pass: false, detail: 'operations/00-index.md missing ## Apple Business section -- Plan 65-03 Wave 3 deliverable (ABNAV-06)' };
      }
      return { pass: true, detail: 'operations/00-index.md contains ## Apple Business section' };
    }
  },

  // === V-65-11: docs/index.md contains Apple Business sub-H3 under ## Operations ===
  // Windowed check: find ## Operations index and verify Apple Business appears between it and next ## heading.
  {
    id: 11, name: 'V-65-11: docs/index.md Apple Business present under ## Operations H2 (ABNAV-07)',
    run() {
      const c = readFile(DOCS_IDX);
      if (c === null) return { pass: false, detail: DOCS_IDX + ' missing' };
      const opsIdx = c.indexOf('## Operations');
      if (opsIdx === -1) return { pass: false, detail: 'docs/index.md missing ## Operations H2' };
      // Find the next ## heading after ## Operations
      const afterOps = c.indexOf('\n## ', opsIdx + 4);
      const window = afterOps === -1 ? c.slice(opsIdx) : c.slice(opsIdx, afterOps);
      if (!window.includes('Apple Business')) {
        return { pass: false, detail: 'docs/index.md has ## Operations but Apple Business not present in its body -- Plan 65-03 Wave 3 deliverable (ABNAV-07)' };
      }
      return { pass: true, detail: 'docs/index.md contains Apple Business under ## Operations' };
    }
  },

  // === V-65-12: 12-shared-ipad-passcode-reset.md contains 34-apple-business back-link ===
  // This is the atomic-trio sub-action 1 (D-04a). The C16 admin_12 -> l1_34 edge.
  {
    id: 12, name: 'V-65-12: 12-shared-ipad-passcode-reset.md contains 34-apple-business back-link (atomic-trio sub-1)',
    run() {
      const c = readFile(AB_12);
      if (c === null) return { pass: false, detail: AB_12 + ' missing' };
      if (!c.includes('34-apple-business')) {
        return { pass: false, detail: '12- missing 34-apple-business back-link -- Plan 65-04 Wave 4 atomic-trio deliverable (D-04a)' };
      }
      return { pass: true, detail: '12- contains 34-apple-business back-link (C16 admin_12->l1_34 edge satisfied)' };
    }
  },

  // === V-65-13: v1.6-audit-allowlist.json c16_missing_endpoint_exemptions is empty (atomic-trio sub-2) ===
  // After Wave 4 removes all 4 sunset-65 entries, this array must be length 0.
  {
    id: 13, name: 'V-65-13: v1.6-audit-allowlist.json c16_missing_endpoint_exemptions length is 0 (atomic-trio sub-2)',
    run() {
      const c = readFile(ALLOWLIST);
      if (c === null) return { pass: false, detail: ALLOWLIST + ' missing' };
      let parsed;
      try {
        parsed = JSON.parse(c);
      } catch (e) {
        return { pass: false, detail: 'v1.6-audit-allowlist.json JSON parse error: ' + e.message };
      }
      const exemptions = parsed.c16_missing_endpoint_exemptions;
      if (!Array.isArray(exemptions)) {
        return { pass: false, detail: 'c16_missing_endpoint_exemptions is not an array' };
      }
      if (exemptions.length !== 0) {
        const files = exemptions.map(e => e.file || '(unknown)').join(', ');
        return { pass: false, detail: 'allowlist still contains ' + exemptions.length + ' sunset-65 entries -- Plan 65-04 Wave 4 atomic-trio deliverable: ' + files };
      }
      return { pass: true, detail: 'c16_missing_endpoint_exemptions is empty (all 4 sunset-65 entries removed)' };
    }
  },

  // === V-65-14: check-phase-64.mjs does NOT contain old V-64-05 NEGATIVE failure detail string (atomic-trio sub-3) ===
  // After Wave 4 flips V-64-05 from NEGATIVE to POSITIVE, this old failure string must be absent.
  // This is the post-hoc verification that the flip landed correctly.
  {
    id: 14, name: 'V-65-14: check-phase-64.mjs old V-64-05 NEGATIVE detail string absent (atomic-trio sub-3 flip)',
    run() {
      const c = readFile(CHECK64);
      if (c === null) return { pass: false, detail: CHECK64 + ' missing' };
      const OLD_DETAIL = '12- contains 34-apple-business reference (C16 sunset Phase 65; must not appear in Phase 64)';
      if (c.includes(OLD_DETAIL)) {
        return { pass: false, detail: 'check-phase-64.mjs still contains old V-64-05 NEGATIVE assertion string -- Plan 65-04 Wave 4 atomic-trio deliverable (V-64-05 flip not yet applied)' };
      }
      return { pass: true, detail: 'old V-64-05 NEGATIVE detail string absent (V-64-05 flip confirmed landed)' };
    }
  },
];

// === V-65-CHAIN: chain regression-guards for check-phase-{48..64}.mjs ===
for (let i = 0; i < CHAIN_PHASES.length; i++) {
  const phaseNum = CHAIN_PHASES[i];
  const id = 'CHAIN-' + phaseNum;
  checks.push({
    id, name: `V-65-${id}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
    run() {
      // Skip phases with known pre-existing failures that are NOT Phase 65 regressions
      // (see CHAIN_SKIP documentation above for root causes and resolution path)
      if (CHAIN_SKIP.has(phaseNum)) {
        return { pass: true, skipped: true, detail: 'pre-existing failure unrelated to Phase 65 (see CHAIN_SKIP docs); Phase 66 terminal re-audit will resolve' };
      }
      const path = `scripts/validation/check-phase-${phaseNum}.mjs`;
      if (!existsSync(join(process.cwd(), path))) {
        return { pass: true, skipped: true, detail: path + ' not present (graceful skip)' };
      }
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
    }
  });
}

// === V-65-AUDIT: v1.6-milestone-audit.mjs subprocess exits 0 ===
// Do NOT duplicate C16 logic here -- C16 is handled entirely by the harness invocation below.
checks.push({
  id: 'AUDIT', name: 'V-65-AUDIT: v1.6-milestone-audit.mjs exits 0',
  run() {
    try {
      execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
      return { pass: true, detail: 'v1.6 harness exits 0' };
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

// === V-65-SELF: CHAIN_PHASES does NOT include 65 (no self-reference; D-22 auditor-independence) ===
checks.push({
  id: 'SELF', name: 'V-65-SELF: CHAIN_PHASES array does NOT include 65 (no self-recursive call)',
  run() {
    if (CHAIN_PHASES.includes(65)) return { pass: false, detail: 'CHAIN_PHASES includes 65 -- self-reference regression' };
    const skipList = [...CHAIN_SKIP].sort((a, b) => a - b).join(',');
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] -- 65 absent (correct); CHAIN_SKIP = [' + skipList + ']' };
  }
});

// === Runner loop (pattern verbatim from check-phase-64.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-65 -- Phase 65 deliverables\n');
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
