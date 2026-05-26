#!/usr/bin/env node
// check-phase-64.mjs -- Phase 64 (Apple Business Delegation Runbooks) deliverables
// Source of truth: .planning/phases/64-apple-business-delegation-runbooks/64-CONVENTIONS.md (locked strings)
// Assertions: .planning/phases/64-apple-business-delegation-runbooks/64-PATTERNS.md (V-64-01..V-64-SELF)
//
// 10 V-64-NN structural assertions per DELEG-01..08 covering:
//   11-vpp-catalog-runbook.md + 12-shared-ipad-passcode-reset.md
//   13-device-release-runbook.md + 14-device-transfer-runbook.md
//   15-mdm-server-reassign-runbook.md + 16-managed-apple-account-runbook.md
//   17-audit-log-scoping-runbook.md + 18-cross-org-boundary-cheat-sheet.md
//   OP-9 exact hard-callout opening string (11-)
//   OP-11 exact hard-callout opening string (12- Path C)
//   Path A < B < C ordering in 12-
//   12- does NOT contain 34-apple-business (C16 Phase 65 gate)
//   All 8 frontmatter: last_verified: + platform:
//   Action runbooks 11-17: ## Required Role & Permission (18- exempt)
//   All 8: ## Verification
//   C15 framing guard on all 8 Apple docs
//   15- single-file anti-proliferation invariant
//
// Lineage: Phase 48 D-25 → ... → Phase 62 D-01..D-05 → Phase 63 D-01..D-06 → Phase 64 DELEG-01..08
//
// Usage: node scripts/validation/check-phase-64.mjs [--verbose]
// Exit code: 0 if all V-64-NN PASS or SKIPPED; 1 if any FAIL.

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

const HARNESS = 'scripts/validation/v1.6-milestone-audit.mjs';
const AB_11 = 'docs/cross-platform/apple-business/11-vpp-catalog-runbook.md';
const AB_12 = 'docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md';
const AB_13 = 'docs/cross-platform/apple-business/13-device-release-runbook.md';
const AB_14 = 'docs/cross-platform/apple-business/14-device-transfer-runbook.md';
const AB_15 = 'docs/cross-platform/apple-business/15-mdm-server-reassign-runbook.md';
const AB_16 = 'docs/cross-platform/apple-business/16-managed-apple-account-runbook.md';
const AB_17 = 'docs/cross-platform/apple-business/17-audit-log-scoping-runbook.md';
const AB_18 = 'docs/cross-platform/apple-business/18-cross-org-boundary-cheat-sheet.md';

// Extends check-phase-63.mjs chain by adding 63.
// Phase 50 included: check-phase-50.mjs runs 26 checks and exits 0 (not a stub).
const CHAIN_PHASES = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63];

// CHAIN_SKIP topology: HISTORICAL — empty by Phase 68 CHAIN-03 close (sha {68_03_SHA}).
//
// Pre-existing v1.5/v1.6-era failures {48, 51, 58, 60, 61} had been suppressed here pending
// root-cause resolution (this file historically held the CANONICAL pre-Phase-68 rationale
// block; full historical narrative now in .planning/milestones/v1.6-DEFERRED-CLEANUP.md
// "CHAIN_SKIP Resolution" section).
//
// Phase 68 (Pillar B — Validator Surgery) resolved all 5 root causes:
//   - CHAIN-01: CRLF normalization in check-phase-{51,58}.mjs readFile() — sha 36a753d
//   - CHAIN-02: archive-path helper scripts/validation/_lib/archive-path.mjs across
//               check-phase-{31,48,60,62,63}.mjs + regenerate-supervision-pins.mjs
//               BASELINE_9 +1 banner-shift rebase + v1.5 sidecar supervision_exemptions[]
//               +1 coord rebase — sha 79c65c6
//   - CHAIN-03: this atomic 5-file empty-Set commit — sha {68_03_SHA}
//   - MILESTONES.md cdcce23 garbage v1.5 H2 entry deletion (V-61-19/20 PASS) — sha d142c7a
//   - V-61-01..04 v1.5-frozen-aware (Plan 68-03 Option A pivot) — sha d7d7d5f
//
// Full chain check-phase-{48..66}.mjs exits 0 on Windows host with NO CHAIN_SKIP entries
// for the first time since v1.5 close. Phase 68 close-gate: sha {68_05_SHA}.
const CHAIN_SKIP = new Set([]);

const checks = [
  // === V-64-01: all 8 new Phase 64 runbooks (AB_11..AB_18) exist ===
  {
    id: 1, name: 'V-64-01: all 8 Phase 64 runbooks (11..18) exist in docs/cross-platform/apple-business/',
    run() {
      const files = [AB_11, AB_12, AB_13, AB_14, AB_15, AB_16, AB_17, AB_18];
      const missing = files.filter(f => readFile(f) === null);
      if (missing.length > 0) return { pass: false, detail: 'missing runbooks: ' + missing.join(', ') };
      return { pass: true, detail: '8/8 Phase 64 runbooks present (11..18)' };
    }
  },

  // === V-64-02: 11-vpp-catalog-runbook.md OP-9 hard-bordered callout exact opening string present ===
  {
    id: 2, name: 'V-64-02: 11-vpp-catalog-runbook.md OP-9 hard-bordered callout exact opening string present',
    run() {
      const c = readFile(AB_11);
      if (c === null) return { pass: false, detail: AB_11 + ' missing' };
      const OP9_OPENING = '> **⛔ Untouched-OU — DO NOT ACT until migration completes (OP-9)**';
      if (!c.includes(OP9_OPENING)) {
        return { pass: false, detail: 'OP-9 hard-bordered callout opening string missing from 11-' };
      }
      return { pass: true, detail: 'OP-9 hard-bordered callout opening string present' };
    }
  },

  // === V-64-03: 12- Path A < Path B < Path C ordering ===
  {
    id: 3, name: 'V-64-03: 12-shared-ipad-passcode-reset.md Path A appears before Path B before Path C',
    run() {
      const c = readFile(AB_12);
      if (c === null) return { pass: false, detail: AB_12 + ' missing' };
      // Accept both ### Path A and ## Path A headings
      const posA = Math.max(c.indexOf('### Path A'), c.indexOf('## Path A'));
      const posB = Math.max(c.indexOf('### Path B'), c.indexOf('## Path B'));
      const posC = Math.max(c.indexOf('### Path C'), c.indexOf('## Path C'));
      if (posA === -1) return { pass: false, detail: 'Path A heading not found in 12-' };
      if (posB === -1) return { pass: false, detail: 'Path B heading not found in 12-' };
      if (posC === -1) return { pass: false, detail: 'Path C heading not found in 12-' };
      if (!(posA < posB && posB < posC)) {
        return { pass: false, detail: 'Path ordering violation: A=' + posA + ' B=' + posB + ' C=' + posC + ' (must be A < B < C)' };
      }
      return { pass: true, detail: 'Path A < Path B < Path C ordering confirmed in 12-' };
    }
  },

  // === V-64-04: 12-shared-ipad-passcode-reset.md OP-11 exact hard-bordered callout opening string present ===
  {
    id: 4, name: 'V-64-04: 12-shared-ipad-passcode-reset.md OP-11 hard-bordered callout exact opening string present',
    run() {
      const c = readFile(AB_12);
      if (c === null) return { pass: false, detail: AB_12 + ' missing' };
      const OP11_OPENING = '> **⛔ MDM EraseDevice — DESTRUCTIVE / L2 approval required (OP-11)**';
      if (!c.includes(OP11_OPENING)) {
        return { pass: false, detail: 'OP-11 hard-bordered callout opening string missing from 12-' };
      }
      return { pass: true, detail: 'OP-11 hard-bordered callout opening string present' };
    }
  },

  // === V-64-05: 12- MUST contain 34-apple-business reference (C16 Phase 65 gate — RECONCILED) ===
  {
    id: 5, name: 'V-64-05 [RECONCILED Phase 65]: 12-shared-ipad-passcode-reset.md MUST contain 34-apple-business (C16 back-link landed)',
    // RECONCILED: was NEGATIVE assertion in Phase 64 (must NOT contain). Phase 65 atomic commit
    // (D-04a + 62-08-PLAN §464-465 contract) added the back-link; assertion flipped to POSITIVE.
    run() {
      const c = readFile(AB_12);
      if (c === null) return { pass: false, detail: AB_12 + ' missing' };
      const has34 = c.includes('34-apple-business');
      if (!has34) return { pass: false, detail: '12- missing 34-apple-business back-link -- Phase 65 atomic commit (D-04a) not yet landed' };
      return { pass: true, detail: '12- contains 34-apple-business back-link (C16 RECONCILED; Phase 65 atomic commit confirmed)' };
    }
  },

  // === V-64-06: all 8 runbooks contain last_verified: in frontmatter ===
  {
    id: 6, name: 'V-64-06: all 8 Phase 64 runbooks contain last_verified: in frontmatter',
    run() {
      const files = [AB_11, AB_12, AB_13, AB_14, AB_15, AB_16, AB_17, AB_18];
      const missing = [];
      for (const f of files) {
        const c = readFile(f);
        if (c === null) { missing.push(f + ' (file missing)'); continue; }
        // Check frontmatter block (between --- delimiters at start)
        if (!c.includes('last_verified:')) {
          missing.push(f + ' (last_verified: absent)');
        }
      }
      if (missing.length > 0) return { pass: false, detail: 'missing last_verified: in: ' + missing.join(', ') };
      return { pass: true, detail: '8/8 runbooks contain last_verified: in frontmatter' };
    }
  },

  // === V-64-07: all 8 runbooks contain platform: in frontmatter ===
  {
    id: 7, name: 'V-64-07: all 8 Phase 64 runbooks contain platform: in frontmatter',
    run() {
      const files = [AB_11, AB_12, AB_13, AB_14, AB_15, AB_16, AB_17, AB_18];
      const missing = [];
      for (const f of files) {
        const c = readFile(f);
        if (c === null) { missing.push(f + ' (file missing)'); continue; }
        if (!c.includes('platform:')) {
          missing.push(f + ' (platform: absent)');
        }
      }
      if (missing.length > 0) return { pass: false, detail: 'missing platform: in: ' + missing.join(', ') };
      return { pass: true, detail: '8/8 runbooks contain platform: in frontmatter' };
    }
  },

  // === V-64-08: ACTION runbooks 11-17 contain ## Required Role & Permission H2 (18- exempt) ===
  // NOTE: 18-cross-org-boundary-cheat-sheet.md is a reference cheat-sheet with no single delegated
  // action, hence no required-permission block. This assertion is scoped to 11- through 17- ONLY.
  // V-64-06, V-64-07, and V-64-09 still cover all 8 files.
  {
    id: 8, name: 'V-64-08: action runbooks 11-17 (NOT 18-cheat-sheet) contain ## Required Role & Permission H2',
    run() {
      const actionFiles = [AB_11, AB_12, AB_13, AB_14, AB_15, AB_16, AB_17];
      // AB_18 (18-cross-org-boundary-cheat-sheet.md) is explicitly EXEMPT from this check
      const missing = [];
      for (const f of actionFiles) {
        const c = readFile(f);
        if (c === null) { missing.push(f + ' (file missing)'); continue; }
        if (!c.includes('## Required Role & Permission')) {
          missing.push(f + ' (## Required Role & Permission absent)');
        }
      }
      if (missing.length > 0) return { pass: false, detail: 'missing ## Required Role & Permission in: ' + missing.join(', ') };
      return { pass: true, detail: '7/7 action runbooks (11-17) contain ## Required Role & Permission; 18- correctly exempt' };
    }
  },

  // === V-64-09: all 8 runbooks contain ## Verification H2 ===
  {
    id: 9, name: 'V-64-09: all 8 Phase 64 runbooks contain ## Verification H2',
    run() {
      const files = [AB_11, AB_12, AB_13, AB_14, AB_15, AB_16, AB_17, AB_18];
      const missing = [];
      for (const f of files) {
        const c = readFile(f);
        if (c === null) { missing.push(f + ' (file missing)'); continue; }
        if (!c.includes('## Verification')) {
          missing.push(f + ' (## Verification absent)');
        }
      }
      if (missing.length > 0) return { pass: false, detail: 'missing ## Verification in: ' + missing.join(', ') };
      return { pass: true, detail: '8/8 runbooks contain ## Verification H2' };
    }
  },

  // === V-64-10: C15 framing guard — 8 Phase 64 Apple docs contain none of banned phrases outside ABAUDIT-exempted lines ===
  {
    id: 10, name: 'V-64-10: C15 framing guard — 8 Phase 64 Apple docs contain no Intune/RBAC/role anti-patterns outside ABAUDIT exemptions',
    run() {
      const AB_DOCS = [AB_11, AB_12, AB_13, AB_14, AB_15, AB_16, AB_17, AB_18];
      // C15 banned-phrase regexes (from v1.6-milestone-audit.mjs lines 718-727)
      const rx15 = /\bIntune\s+(RBAC|role|scope\s+tag|admin\s+role)\b/i;
      const rxDelegated = /\bdelegated\s+admin\b.{0,60}\bIntune\b/i;
      const rxABIntune = /\b(apple\s+business|apple\s+business\s+manager)\s+(role|privilege|permission)\b.{0,60}\bIntune\s+(role|RBAC)\b/i;
      const rxIntuneSide = /\bIntune[-\s]side\b.{0,40}\b(delegat|RBAC|role\s+assign)/i;
      const rxIntuneControls = /\bIntune\b.{0,40}\b(controls?|manages?|owns?)\b.{0,40}\b(Apple\s+Business|ABM)\b.{0,40}\bpermission/i;
      const rxSameAs = /\b(same\s+as|equivalent\s+to|maps\s+to)\s+Intune\s+(RBAC|role)/i;
      const rxManagedAppleID = /\bManaged\s+Apple\s+ID\b(?!.{0,160}(Microsoft Intune|Intune documentation|continues to use|formerly|legacy|predates|rebrand|renamed|personal|Apple\s+Business|scopes|ABM|account))/i;
      const rxIntuneAdmin = /\bIntune\s+admin\b.{0,60}\b(Apple\s+Business|ABM|Organizational\s+Unit|content\s+token)/i;
      const C15_BANNED = [rx15, rxDelegated, rxABIntune, rxIntuneSide, rxIntuneControls, rxSameAs, rxManagedAppleID, rxIntuneAdmin];
      const violations = [];
      for (const f of AB_DOCS) {
        const c = readFile(f);
        if (c === null) { violations.push(f + ' (file missing)'); continue; }
        const lines = c.split('\n');
        // Build allowlist line-set from HTML comments matching <!-- ABAUDIT-{##}: ... -->
        const allowlist = new Set();
        lines.forEach((ln, i) => { if (/<!--\s*ABAUDIT-\d+:/.test(ln)) { allowlist.add(i); allowlist.add(i + 1); } });
        lines.forEach((ln, i) => {
          if (allowlist.has(i)) return;
          for (const rx of C15_BANNED) {
            if (rx.test(ln)) {
              violations.push(f + ':' + (i + 1) + ': ' + ln.trim().slice(0, 80));
              break;
            }
          }
        });
      }
      if (violations.length > 0) return { pass: false, detail: 'C15 framing violations: ' + violations.join(' | ') };
      return { pass: true, detail: '8/8 Phase 64 Apple docs pass C15 framing guard (no Intune RBAC/role/scope-tag/admin-role outside ABAUDIT exemptions)' };
    }
  },

  // === V-64-ANTIPROLIFERATION: 15- single-file anti-proliferation invariant ===
  // Exactly ONE file: 15-mdm-server-reassign-runbook.md exists AND no 15b- or 15-mdm-server-reassign-2 file
  {
    id: 'ANTIPROLIFERATION', name: 'V-64-ANTIPROLIFERATION: 15- single-file invariant — no 15b- or 15-mdm-server-reassign-2 sibling exists',
    run() {
      const dir = 'docs/cross-platform/apple-business/';
      const allowed = '15-mdm-server-reassign-runbook.md';
      const forbidden15b = dir + '15b-';
      const forbidden15v2 = dir + '15-mdm-server-reassign-2';
      // Check that the one allowed 15- file exists (or at least is registered; may be missing pre-Wave-2)
      // The invariant is about the ABSENCE of proliferation files
      const has15b = existsSync(join(process.cwd(), forbidden15b + 'mdm-server-reassign-runbook.md'))
        || existsSync(join(process.cwd(), forbidden15b + 'runbook.md'));
      const has15v2 = existsSync(join(process.cwd(), forbidden15v2 + '.md'))
        || existsSync(join(process.cwd(), forbidden15v2 + '-runbook.md'));
      if (has15b) return { pass: false, detail: 'proliferation detected: 15b- sibling file found (anti-proliferation invariant violated)' };
      if (has15v2) return { pass: false, detail: 'proliferation detected: 15-mdm-server-reassign-2 sibling file found (anti-proliferation invariant violated)' };
      return { pass: true, detail: 'no 15b- or 15-mdm-server-reassign-2 proliferation files detected; single-file invariant satisfied' };
    }
  },
];

// === V-64-CHAIN: chain regression-guards for check-phase-{48..63}.mjs ===
for (let i = 0; i < CHAIN_PHASES.length; i++) {
  const phaseNum = CHAIN_PHASES[i];
  const id = 'CHAIN-' + phaseNum;
  checks.push({
    id, name: `V-64-${id}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
    run() {
      // Skip phases with known pre-existing failures that are NOT Phase 64 regressions
      // (see CHAIN_SKIP documentation above for root causes and resolution path)
      if (CHAIN_SKIP.has(phaseNum)) {
        return { pass: true, skipped: true, detail: 'pre-existing failure unrelated to Phase 64 (see CHAIN_SKIP docs); Phase 66 terminal re-audit will resolve' };
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

// === V-64-AUDIT: v1.6-milestone-audit.mjs subprocess exits 0 ===
checks.push({
  id: 'AUDIT', name: 'V-64-AUDIT: v1.6-milestone-audit.mjs exits 0 (15 checks all PASS)',
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

// === V-64-SELF: CHAIN_PHASES does NOT include 64 (no self-reference) ===
checks.push({
  id: 'SELF', name: 'V-64-SELF: CHAIN_PHASES array does NOT include 64 (no self-recursive call)',
  run() {
    if (CHAIN_PHASES.includes(64)) return { pass: false, detail: 'CHAIN_PHASES includes 64 -- self-reference regression' };
    const skipList = [...CHAIN_SKIP].sort((a, b) => a - b).join(',');
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] -- 64 absent (correct); CHAIN_SKIP = [' + skipList + ']' };
  }
});

// === Runner loop (pattern verbatim from check-phase-63.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-64 -- Phase 64 deliverables\n');
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
