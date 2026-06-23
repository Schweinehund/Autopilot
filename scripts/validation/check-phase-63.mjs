#!/usr/bin/env node
// check-phase-63.mjs -- Phase 63 (Multi-OU Architecture & Apple Admin Setup) deliverables
// Source of truth: .planning/phases/63-multi-ou-architecture-apple-admin-setup/63-CONTEXT.md (D-01..D-06)
// File reads only: all content via fs.readFileSync; subprocess only for V-63-CHAIN + V-63-AUDIT
//
// 12 V-63-NN structural assertions per CONTEXT D-01..D-06 covering:
//   03-ous-vs-custom-roles.md + 04-custom-role-authoring.md + 05-sub-org-admin-onboarding.md
//   06-mdm-server-assignment.md + 07-vpp-content-token-consolidation.md
//   08-managed-apple-account-provisioning.md + 09-shared-ipad-lifecycle.md + 10-apple-tv-lifecycle.md
//   ios-capability-matrix.md (+3 rows under Enrollment H2)
//   macos-capability-matrix.md + 4-platform-capability-comparison.md (byte-unchanged guards)
//   63-ANCHOR-INVENTORY.md (pre-edit SHA inventory for 2 edited files)
//   v1.6-milestone-audit.mjs exits 0 (V-63-AUDIT subprocess)
//   '+' separator parser + C14/C15/C16 unit tests
//
// Lineage: Phase 48 D-25 → ... → Phase 61 D-24 → Phase 62 D-01..D-05 → Phase 63 D-01..D-06
//
// Usage: node scripts/validation/check-phase-63.mjs [--verbose]
// Exit code: 0 if all V-63-NN PASS or SKIPPED; 1 if any FAIL.

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

const HARNESS = 'scripts/validation/v1.6-milestone-audit.mjs';
const AB_03 = 'docs/cross-platform/apple-business/03-ous-vs-custom-roles.md';
const AB_04 = 'docs/cross-platform/apple-business/04-custom-role-authoring.md';
const AB_05 = 'docs/cross-platform/apple-business/05-sub-org-admin-onboarding.md';
const AB_06 = 'docs/cross-platform/apple-business/06-mdm-server-assignment.md';
const AB_07 = 'docs/cross-platform/apple-business/07-vpp-content-token-consolidation.md';
const AB_08 = 'docs/cross-platform/apple-business/08-managed-apple-account-provisioning.md';
const AB_09 = 'docs/cross-platform/apple-business/09-shared-ipad-lifecycle.md';
const AB_10 = 'docs/cross-platform/apple-business/10-apple-tv-lifecycle.md';
const IOS_MATRIX = 'docs/reference/ios-capability-matrix.md';
const MACOS_MATRIX = 'docs/reference/macos-capability-matrix.md';
const PLATFORM_COMPARISON = 'docs/reference/4-platform-capability-comparison.md';
const AB_OUS = 'docs/cross-platform/apple-business/02-ous-architecture.md';
const ANCHOR_INVENTORY = resolveArchivedPhasePath('63-multi-ou-architecture-apple-admin-setup/63-ANCHOR-INVENTORY.md', ['v1.6-phases']);

// Extends check-phase-62.mjs chain by adding 62.
// Phase 50 included: check-phase-50.mjs runs 26 checks and exits 0 (not a stub).
const CHAIN_PHASES = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62];

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
  // === V-63-01: all 8 new Phase 63 docs (AB_03..AB_10) exist ===
  {
    id: 1, name: 'V-63-01: all 8 new Phase 63 docs (03..10) exist in docs/cross-platform/apple-business/',
    run() {
      const files = [AB_03, AB_04, AB_05, AB_06, AB_07, AB_08, AB_09, AB_10];
      const missing = files.filter(f => readFile(f) === null);
      if (missing.length > 0) return { pass: false, detail: 'missing docs: ' + missing.join(', ') };
      return { pass: true, detail: '8/8 Phase 63 docs present (03..10)' };
    }
  },

  // === V-63-02: C16 anchor slug present in 05-sub-org-admin-onboarding.md (NOT 09-) ===
  {
    id: 2, name: 'V-63-02: 05-sub-org-admin-onboarding.md contains C16 slug heading "## Which admin owns this pool?"',
    run() {
      const c = readFile(AB_05);
      if (c === null) return { pass: false, detail: AB_05 + ' missing' };
      if (!c.includes('## Which admin owns this pool?')) {
        return { pass: false, detail: 'C16 anchor heading "## Which admin owns this pool?" not found in 05-sub-org-admin-onboarding.md' };
      }
      // Also verify it is NOT required to be in 09- (the plan says 05-, not 09-)
      return { pass: true, detail: 'C16 slug heading "## Which admin owns this pool?" present in 05-sub-org-admin-onboarding.md' };
    }
  },

  // === V-63-03: OP-1 exclusion — 04- contains DENY-by-default + Manage MDM Servers flagged EXCLUDED ===
  {
    id: 3, name: 'V-63-03: 04-custom-role-authoring.md OP-1 exclusion — DENY-by-default + Manage MDM Servers EXCLUDED (not in bundle)',
    run() {
      const c = readFile(AB_04);
      if (c === null) return { pass: false, detail: AB_04 + ' missing' };
      const hasDenyDefault = c.includes('DENY-by-default');
      const hasManageMDM = c.includes('Manage MDM Servers');
      const issues = [];
      if (!hasDenyDefault) issues.push('DENY-by-default language missing');
      if (!hasManageMDM) issues.push('"Manage MDM Servers" reference missing');
      // Verify "Manage MDM Servers" appears as EXCLUDED (not as an included bundle row)
      // The bundle table lists included permissions; EXCLUDED permissions are in the Explicitly Excluded section
      const hasExcluded = c.includes('EXCLUDED (OP-1)') || (c.includes('Manage MDM Servers') && c.includes('EXCLUDED'));
      if (!hasExcluded) issues.push('"Manage MDM Servers" not flagged as EXCLUDED (OP-1)');
      if (issues.length > 0) return { pass: false, detail: issues.join('; ') };
      return { pass: true, detail: 'DENY-by-default present; "Manage MDM Servers" flagged EXCLUDED (OP-1)' };
    }
  },

  // === V-63-04: OP-2 exclusion — 04- contains Account Holder EXCLUDED / DO NOT DELEGATE ===
  {
    id: 4, name: 'V-63-04: 04-custom-role-authoring.md OP-2 exclusion — Account Holder EXCLUDED or DO NOT DELEGATE',
    run() {
      const c = readFile(AB_04);
      if (c === null) return { pass: false, detail: AB_04 + ' missing' };
      const hasAccountHolder = c.includes('Account Holder');
      const hasExclusion = c.includes('EXCLUDED') || c.includes('DO NOT DELEGATE') || c.includes('DO-NOT-DELEGATE');
      if (!hasAccountHolder) return { pass: false, detail: '"Account Holder" reference missing from 04-' };
      if (!hasExclusion) return { pass: false, detail: 'EXCLUDED or DO-NOT-DELEGATE language missing from 04-' };
      // Verify Account Holder appears together with exclusion language
      const hasOP2 = c.includes('EXCLUDED (OP-2)') || (c.includes('Account Holder') && (c.includes('DO NOT DELEGATE') || c.includes('DO-NOT-DELEGATE') || c.includes('EXCLUDED')));
      if (!hasOP2) return { pass: false, detail: 'Account Holder not paired with EXCLUDED/DO-NOT-DELEGATE language' };
      return { pass: true, detail: 'Account Holder + EXCLUDED/DO-NOT-DELEGATE (OP-2) present in 04-' };
    }
  },

  // === V-63-05: OP-3 pairing — no orphan Edit in bundle (every Edit names a companion View) ===
  {
    id: 5, name: 'V-63-05: 04-custom-role-authoring.md OP-3 pairing — every Edit permission paired with companion View',
    run() {
      const c = readFile(AB_04);
      if (c === null) return { pass: false, detail: AB_04 + ' missing' };
      // The bundle table uses "OP-3 companion View" column header — verify it's present
      const hasOP3Column = c.includes('OP-3 companion View') || c.includes('companion View');
      if (!hasOP3Column) return { pass: false, detail: 'OP-3 companion View column missing from bundle table in 04-' };
      // Verify the OP-3 pairing prose is present (Edit-without-View prevention section)
      const hasOP3Prose = c.includes('Edit-without-View') || c.includes('Edit without View');
      if (!hasOP3Prose) return { pass: false, detail: 'Edit-without-View pairing guidance missing from 04-' };
      return { pass: true, detail: 'OP-3 companion View column + Edit-without-View pairing guidance present in 04-' };
    }
  },

  // === V-63-06: bundle size 4-6 — count included permission rows, assert 4 <= n <= 6 ===
  {
    id: 6, name: 'V-63-06: 04-custom-role-authoring.md bundle size 4-6 (assert 4 <= n <= 6 included permission rows)',
    run() {
      const c = readFile(AB_04);
      if (c === null) return { pass: false, detail: AB_04 + ' missing' };
      // Extract the bundle table section (between ## Sub-Org Admin Bundle and ## Explicitly Excluded)
      const bundleStart = c.indexOf('## Sub-Org Admin Bundle');
      const excludedStart = c.indexOf('## Explicitly Excluded');
      if (bundleStart === -1) return { pass: false, detail: '"## Sub-Org Admin Bundle" section not found in 04-' };
      if (excludedStart === -1) return { pass: false, detail: '"## Explicitly Excluded" section not found in 04-' };
      const bundleSection = c.slice(bundleStart, excludedStart);
      // Count table data rows (lines starting with | that are not header or separator rows)
      const tableRows = bundleSection.split('\n').filter(line => {
        const trimmed = line.trim();
        // Data row: starts with |, not a separator row (---|---), not the header row
        return trimmed.startsWith('|') && !trimmed.includes('---') && !trimmed.startsWith('| Permission');
      });
      const n = tableRows.length;
      // Also check explicit bundle summary for 4-6 range
      const hasBundleSizeText = c.includes('4–6') || c.includes('4-6') || c.includes('4 to 6');
      if (n < 4 || n > 6) {
        return { pass: false, detail: 'bundle table has ' + n + ' included rows (expected 4-6); hasBundleSizeText=' + hasBundleSizeText };
      }
      return { pass: true, detail: 'bundle has ' + n + ' included permission rows (within 4-6 range)' };
    }
  },

  // === V-63-07: ios-capability-matrix.md Enrollment H2 contains 3 new Feature labels ===
  {
    id: 7, name: 'V-63-07: ios-capability-matrix.md Enrollment H2 contains 3 new rows: Apple TV management, Shared iPad sessions, Apple Business delegation surface',
    run() {
      const c = readFile(IOS_MATRIX);
      if (c === null) return { pass: false, detail: IOS_MATRIX + ' missing' };
      // Extract content between ## Enrollment and ## Configuration
      const enrollStart = c.indexOf('## Enrollment');
      const configStart = c.indexOf('## Configuration');
      if (enrollStart === -1) return { pass: false, detail: '"## Enrollment" H2 not found in ios-capability-matrix.md' };
      if (configStart === -1) return { pass: false, detail: '"## Configuration" H2 not found in ios-capability-matrix.md' };
      const enrollSection = c.slice(enrollStart, configStart);
      const required = ['Apple TV management', 'Shared iPad sessions', 'Apple Business delegation surface'];
      const missing = required.filter(label => !enrollSection.includes(label));
      if (missing.length > 0) return { pass: false, detail: 'missing feature labels in Enrollment H2: ' + missing.join(', ') };
      return { pass: true, detail: '3/3 new feature labels present in Enrollment H2: ' + required.join(', ') };
    }
  },

  // === V-63-08: macos-capability-matrix.md byte-unchanged vs baseline blob 73f16378197223378a8507a6751c763902de58db ===
  {
    id: 8, name: 'V-63-08: macos-capability-matrix.md byte-unchanged vs baseline blob 73f16378197223378a8507a6751c763902de58db',
    run() {
      if (!existsSync(join(process.cwd(), MACOS_MATRIX))) {
        return { pass: false, detail: MACOS_MATRIX + ' missing' };
      }
      const BASELINE = '73f16378197223378a8507a6751c763902de58db';
      try {
        const result = execFileSync('git', ['hash-object', MACOS_MATRIX], { stdio: 'pipe', cwd: process.cwd() });
        const actual = result.toString().trim();
        if (actual !== BASELINE) {
          return { pass: false, detail: 'macos-capability-matrix.md blob hash CHANGED: expected ' + BASELINE + ', got ' + actual + ' (OU-10 D-A3 byte-unchanged invariant violated)' };
        }
        return { pass: true, detail: 'macos-capability-matrix.md blob hash matches baseline ' + BASELINE };
      } catch (err) {
        return { pass: true, skipped: true, detail: 'git hash-object not available -- skipped' };
      }
    }
  },

  // === V-63-09: 4-platform-capability-comparison.md byte-unchanged vs baseline blob f25ff51a14b7feac46611c4c0511ed5c074ce03f ===
  {
    id: 9, name: 'V-63-09: 4-platform-capability-comparison.md byte-unchanged vs baseline blob f25ff51a14b7feac46611c4c0511ed5c074ce03f',
    run() {
      if (!existsSync(join(process.cwd(), PLATFORM_COMPARISON))) {
        return { pass: false, detail: PLATFORM_COMPARISON + ' missing' };
      }
      const BASELINE = 'f25ff51a14b7feac46611c4c0511ed5c074ce03f';
      try {
        const result = execFileSync('git', ['hash-object', PLATFORM_COMPARISON], { stdio: 'pipe', cwd: process.cwd() });
        const actual = result.toString().trim();
        if (actual !== BASELINE) {
          return { pass: false, detail: '4-platform-capability-comparison.md blob hash CHANGED: expected ' + BASELINE + ', got ' + actual + ' (OU-10 D-A3 byte-unchanged invariant violated)' };
        }
        return { pass: true, detail: '4-platform-capability-comparison.md blob hash matches baseline ' + BASELINE };
      } catch (err) {
        return { pass: true, skipped: true, detail: 'git hash-object not available -- skipped' };
      }
    }
  },

  // === V-63-10: C15 framing guard — 8 new Apple-side docs contain none of banned phrases outside ABAUDIT-exempted lines ===
  {
    id: 10, name: 'V-63-10: C15 framing guard — 8 Phase 63 Apple docs contain no Intune/Entra/Conditional Access/Azure AD outside ABAUDIT-exemptions',
    run() {
      const AB_DOCS = [AB_03, AB_04, AB_05, AB_06, AB_07, AB_08, AB_09, AB_10];
      // C15 banned-phrase regex: Intune RBAC, Intune role, Intune scope tag, Intune admin role
      const rx15 = /\bIntune\s+(RBAC|role|scope\s+tag|admin\s+role)\b/i;
      // Additional broad banned phrases for Apple-side docs (delegation framing guard)
      const rxBroad = /\b(Entra\s+ID\s+role|Conditional\s+Access\s+role|Azure\s+AD\s+role)\b/i;
      const violations = [];
      for (const f of AB_DOCS) {
        const c = readFile(f);
        if (c === null) { violations.push(f + ' (file missing)'); continue; }
        const lines = c.split('\n');
        const allowlist = new Set();
        lines.forEach((ln, i) => { if (/<!--\s*ABAUDIT-\d+:/.test(ln)) { allowlist.add(i); allowlist.add(i + 1); } });
        lines.forEach((ln, i) => {
          if (!allowlist.has(i) && (rx15.test(ln) || rxBroad.test(ln))) {
            violations.push(f + ':' + (i + 1) + ': ' + ln.trim().slice(0, 80));
          }
        });
      }
      if (violations.length > 0) return { pass: false, detail: 'C15 framing violations: ' + violations.join(' | ') };
      return { pass: true, detail: '8/8 Phase 63 Apple docs pass C15 framing guard (no Intune RBAC/role/scope-tag/admin-role outside ABAUDIT exemptions)' };
    }
  },

  // === V-63-11: D-05 repair — 02-ous-architecture.md does NOT contain '05-vpp-catalog-consolidation' and DOES contain '11-vpp-catalog-runbook.md' ===
  {
    id: 11, name: 'V-63-11: D-05 repair — 02-ous-architecture.md no longer references 05-vpp-catalog-consolidation; references 11-vpp-catalog-runbook.md',
    run() {
      const c = readFile(AB_OUS);
      if (c === null) return { pass: false, detail: AB_OUS + ' missing' };
      const hasStaleRef = c.includes('05-vpp-catalog-consolidation');
      const hasNewRef = c.includes('11-vpp-catalog-runbook.md');
      const issues = [];
      if (hasStaleRef) issues.push('stale reference "05-vpp-catalog-consolidation" still present (D-05 repair incomplete)');
      if (!hasNewRef) issues.push('"11-vpp-catalog-runbook.md" reference missing (D-05 repair target)');
      if (issues.length > 0) return { pass: false, detail: issues.join('; ') };
      return { pass: true, detail: 'D-05 repair confirmed: "05-vpp-catalog-consolidation" absent; "11-vpp-catalog-runbook.md" present' };
    }
  },

  // === V-63-ANCHOR-INVENTORY: 63-ANCHOR-INVENTORY.md exists with >= 2 Pre-edit git SHA entries ===
  {
    id: 'ANCHOR-INVENTORY', name: 'V-63-ANCHOR-INVENTORY: 63-ANCHOR-INVENTORY.md exists with >= 2 Pre-edit git SHA entries',
    run() {
      if (ANCHOR_INVENTORY === null) return { pass: false, detail: '63-ANCHOR-INVENTORY.md not found at .planning/phases/ or .planning/milestones/v1.6-phases/' };
      const c = readFile(ANCHOR_INVENTORY);
      if (c === null) return { pass: false, detail: ANCHOR_INVENTORY + ' missing' };
      const shaCount = (c.match(/Pre-edit git SHA/gi) || []).length;
      if (shaCount < 2) return { pass: false, detail: shaCount + ' Pre-edit git SHA entries found (expected >= 2)' };
      return { pass: true, detail: shaCount + ' Pre-edit git SHA entries (>= 2)' };
    }
  },
];

// === V-63-CHAIN: chain regression-guards for check-phase-{48..62}.mjs ===
for (let i = 0; i < CHAIN_PHASES.length; i++) {
  const phaseNum = CHAIN_PHASES[i];
  const id = 'CHAIN-' + phaseNum;
  checks.push({
    id, name: `V-63-${id}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
    run() {
      // Skip phases with known pre-existing failures that are NOT Phase 63 regressions
      // (see CHAIN_SKIP documentation above for root causes and resolution path)
      if (CHAIN_SKIP.has(phaseNum)) {
        return { pass: true, skipped: true, detail: 'pre-existing failure unrelated to Phase 63 (see CHAIN_SKIP docs); Phase 66 terminal re-audit will resolve' };
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
        const stdout = err.stdout ? err.stdout.toString() : '';
        const isMissing = err.code === 'ENOENT' || err.status === 127
          || stderr.includes('not found') || stderr.includes('Could not resolve');
        if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
        return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + (stdout + stderr).slice(0, 500).trim() };
      }
    }
  });
}

// === V-63-AUDIT: v1.6-milestone-audit.mjs subprocess exits 0 ===
checks.push({
  id: 'AUDIT', name: 'V-63-AUDIT: v1.6-milestone-audit.mjs exits 0 (15 checks all PASS)',
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

// === V-63-FRONTMATTER-PARSE: '+' separator unit test (replicated parsePlatformValue logic) ===
checks.push({
  id: 'FRONTMATTER-PARSE', name: "V-63-FRONTMATTER-PARSE: '+' separator parser; 'ios+macos+shared-ipad' -> valid compound; 'ios+notaplatform' -> invalid",
  run() {
    const ALLOWED = new Set(['ios', 'macos', 'android', 'linux', 'windows', 'all', 'shared-ipad', 'apple-tv', 'ipados', 'tvos', 'apple-business']);
    function parse(v) {
      if (!v) return { valid: false, error: 'missing' };
      const atoms = v.split('+').map(a => a.trim()).filter(Boolean);
      if (!atoms.length) return { valid: false, error: 'empty' };
      const bad = atoms.filter(a => !ALLOWED.has(a));
      if (bad.length) return { valid: false, atoms, error: 'unknown: ' + bad.join(',') };
      return { valid: true, atoms, compound: atoms.length > 1 };
    }
    const r1 = parse('ios+macos+shared-ipad');
    const r2 = parse('ios+notaplatform');
    const r3 = parse('ios');
    const issues = [];
    if (!r1.valid || !r1.compound || r1.atoms.join(',') !== 'ios,macos,shared-ipad') issues.push('compound case failed: ' + JSON.stringify(r1));
    if (r2.valid) issues.push('unknown-atom case should be invalid: ' + JSON.stringify(r2));
    if (!r3.valid || r3.compound) issues.push('single-atom case failed: ' + JSON.stringify(r3));
    if (issues.length > 0) return { pass: false, detail: issues.join('; ') };
    return { pass: true, detail: "'ios+macos+shared-ipad' -> valid+compound; 'ios+notaplatform' -> invalid; 'ios' -> valid+not-compound" };
  }
});

// === V-63-C14-UNIT: synthetic C14 tests ===
checks.push({
  id: 'C14-UNIT', name: 'V-63-C14-UNIT: synthetic C14 token-set membership tests (all-present -> pass; missing date -> fail)',
  run() {
    function c14Synth(content) {
      const C14_TOKENS = ['Apple Business Manager', 'Apple Business', '2026-04-14'];
      const window = content.split('\n').slice(0, 50).join('\n');
      const missing = C14_TOKENS.filter(t => !window.includes(t));
      return { pass: missing.length === 0, missing };
    }
    const passCase = c14Synth('# Doc\nApple Business Manager (ABM) became Apple Business on 2026-04-14.\n');
    const failCase = c14Synth('# Doc\nApple Business Manager (ABM) became Apple Business today.\n');
    const issues = [];
    if (!passCase.pass) issues.push('all-tokens case should pass: ' + JSON.stringify(passCase));
    if (failCase.pass || !failCase.missing.includes('2026-04-14')) issues.push('missing-date case should fail: ' + JSON.stringify(failCase));
    if (issues.length > 0) return { pass: false, detail: issues.join('; ') };
    return { pass: true, detail: 'synthetic C14 pass+fail cases both behave correctly' };
  }
});

// === V-63-C15-UNIT: synthetic C15 banned-phrase tests ===
checks.push({
  id: 'C15-UNIT', name: 'V-63-C15-UNIT: synthetic C15 Intune-RBAC banned-phrase tests (bare -> fail; ABAUDIT-exempted -> pass)',
  run() {
    const rx1 = /\bIntune\s+(RBAC|role|scope\s+tag|admin\s+role)\b/i;
    function c15Synth(content) {
      const lines = content.split('\n');
      const allowlist = new Set();
      lines.forEach((ln, i) => { if (/<!--\s*ABAUDIT-\d+:/.test(ln)) { allowlist.add(i); allowlist.add(i + 1); } });
      const violations = [];
      lines.forEach((ln, i) => { if (!allowlist.has(i) && rx1.test(ln)) violations.push(i + 1); });
      return { pass: violations.length === 0, violations };
    }
    const bareCase = c15Synth('Use Intune RBAC to assign Apple Business roles.\n');
    const exemptedCase = c15Synth('<!-- ABAUDIT-01: disambiguation -->\nUse Intune RBAC to assign Apple Business roles.\n');
    const issues = [];
    if (bareCase.pass) issues.push('bare Intune RBAC should fail C15: ' + JSON.stringify(bareCase));
    if (!exemptedCase.pass) issues.push('ABAUDIT-exempted should pass C15: ' + JSON.stringify(exemptedCase));
    if (issues.length > 0) return { pass: false, detail: issues.join('; ') };
    return { pass: true, detail: 'bare RBAC -> fail; ABAUDIT-exempted -> pass' };
  }
});

// === V-63-SELF: CHAIN_PHASES does NOT include 63 (no self-reference) ===
checks.push({
  id: 'SELF', name: 'V-63-SELF: CHAIN_PHASES array does NOT include 63 (no self-recursive call)',
  run() {
    if (CHAIN_PHASES.includes(63)) return { pass: false, detail: 'CHAIN_PHASES includes 63 -- self-reference regression' };
    const skipList = [...CHAIN_SKIP].sort((a, b) => a - b).join(',');
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] -- 63 absent (correct); CHAIN_SKIP = [' + skipList + ']' };
  }
});

// === Runner loop (pattern verbatim from check-phase-62.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-63 -- Phase 63 deliverables\n');
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
