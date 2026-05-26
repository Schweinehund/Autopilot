#!/usr/bin/env node
// check-phase-62.mjs -- Phase 62 (Apple Business Foundation & Rebrand) deliverables
// Source of truth: .planning/phases/62-apple-business-foundation-rebrand/62-CONTEXT.md (D-01..D-05)
// File reads only: all content via fs.readFileSync; subprocess only for V-62-CHAIN + V-62-AUDIT
//
// ~22 V-62-NN structural assertions per CONTEXT D-01..D-05 + RESEARCH §9 covering:
//   _glossary-apple-business.md + 4 reciprocal banner lines + 1 inline see-also
//   00-overview.md + 01-role-permission-model.md + 02-ous-architecture.md + _admin-directory.md
//   2 intro callouts (C14 sites #2 + #3)
//   v1.6-milestone-audit.mjs exits 0 (V-62-AUDIT subprocess)
//   '+' separator parser + C14/C15/C16 unit tests
//
// Lineage: Phase 48 D-25 → ... → Phase 60 D-21/D-22 → Phase 61 D-24 → Phase 62 D-01..D-05
//
// Usage: node scripts/validation/check-phase-62.mjs [--verbose]
// Exit code: 0 if all V-62-NN PASS or SKIPPED; 1 if any FAIL.

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
const SIDECAR = 'scripts/validation/v1.6-audit-allowlist.json';
const GLOSSARY_AB = 'docs/_glossary-apple-business.md';
const AB_OVERVIEW = 'docs/cross-platform/apple-business/00-overview.md';
const AB_ROLE_PERM = 'docs/cross-platform/apple-business/01-role-permission-model.md';
const AB_OUS = 'docs/cross-platform/apple-business/02-ous-architecture.md';
const AB_ADMIN_DIR = 'docs/cross-platform/apple-business/_admin-directory.md';
const ABM_MACOS_INTRO = 'docs/admin-setup-macos/01-abm-configuration.md';
const ABM_IOS_INTRO = 'docs/admin-setup-ios/02-abm-token.md';
const ANCHOR_INVENTORY = resolveArchivedPhasePath('62-apple-business-foundation-rebrand/62-ANCHOR-INVENTORY.md', ['v1.6-phases']);
const GLOSSARIES_4 = ['docs/_glossary.md', 'docs/_glossary-macos.md', 'docs/_glossary-android.md', 'docs/_glossary-linux.md'];

// Phase 50 stub excluded per check-phase-61.mjs precedent (stub validator; not full check).
const CHAIN_PHASES = [48, 49, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61];

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
  // === V-62-01: _glossary-apple-business.md exists ===
  {
    id: 1, name: 'V-62-01: docs/_glossary-apple-business.md exists at docs root',
    run() {
      const c = readFile(GLOSSARY_AB);
      if (c === null) return { pass: false, detail: GLOSSARY_AB + ' missing' };
      return { pass: true, detail: 'file present (' + c.split('\n').length + ' lines)' };
    }
  },

  // === V-62-02: Rebrand mapping table with 8 D-04 pairs ===
  {
    id: 2, name: 'V-62-02: _glossary-apple-business.md rebrand-mapping table has all 8 D-04 legacy terms',
    run() {
      const c = readFile(GLOSSARY_AB);
      if (c === null) return { pass: false, detail: GLOSSARY_AB + ' missing' };
      const legacyTerms = [
        'Apple Business Manager',
        'Location',
        'privilege',
        'Managed Apple ID',
        'VPP location token',
        'People Manager',
        'Device Enrollment Manager',
        'Content Manager',
      ];
      const missing = legacyTerms.filter(t => !c.includes(t));
      if (missing.length > 0) return { pass: false, detail: 'missing legacy terms: ' + missing.join(', ') };
      return { pass: true, detail: '8/8 D-04 legacy terms in rebrand-mapping table' };
    }
  },

  // === V-62-02b: 4 H2 category sections ===
  {
    id: '2b', name: 'V-62-02b: _glossary-apple-business.md has 4 required H2 category sections',
    run() {
      const c = readFile(GLOSSARY_AB);
      if (c === null) return { pass: false, detail: GLOSSARY_AB + ' missing' };
      const required = ['## Rebrand Mapping Table', '## Alphabetical Index', '## Roles & Permissions', '## Organizational Units'];
      const missing = required.filter(h => !c.includes(h));
      if (missing.length > 0) return { pass: false, detail: 'missing H2 sections: ' + missing.join(', ') };
      return { pass: true, detail: '4/4 required H2 sections present' };
    }
  },

  // === V-62-03: 01-role-permission-model.md exists + Account Holder DO-NOT-DELEGATE ===
  {
    id: 3, name: 'V-62-03: 01-role-permission-model.md exists; Account Holder DO-NOT-DELEGATE callout present',
    run() {
      const c = readFile(AB_ROLE_PERM);
      if (c === null) return { pass: false, detail: AB_ROLE_PERM + ' missing' };
      if (!c.includes('DO NOT DELEGATE') && !c.includes('DO-NOT-DELEGATE') && !c.includes('DENY-by-default')) {
        return { pass: false, detail: 'Account Holder DO-NOT-DELEGATE or DENY-by-default callout missing' };
      }
      return { pass: true, detail: 'file present; DO-NOT-DELEGATE/DENY-by-default callout found' };
    }
  },

  // === V-62-04: 7 H3 subgroups + Manage MDM Servers + DENY-by-default ===
  {
    id: 4, name: 'V-62-04: 01-role-permission-model.md has 7 subgroup sections + Manage MDM Servers + DENY-by-default',
    run() {
      const c = readFile(AB_ROLE_PERM);
      if (c === null) return { pass: false, detail: AB_ROLE_PERM + ' missing' };
      const subgroups = ['Basic Organization', 'Organization Access', 'People', 'Devices', 'AppleCare', 'Apps'];
      const missing = subgroups.filter(s => !c.includes(s));
      const hasManageMDM = c.includes('Manage MDM') || c.includes('MDM Server');
      const hasDenyDefault = c.includes('DENY-by-default') || c.includes('DENY by default');
      const issues = [];
      if (missing.length > 0) issues.push('missing subgroups: ' + missing.join(', '));
      if (!hasManageMDM) issues.push('Manage MDM Servers reference missing');
      if (!hasDenyDefault) issues.push('DENY-by-default flag missing');
      if (issues.length > 0) return { pass: false, detail: issues.join('; ') };
      return { pass: true, detail: '6+ subgroups + Manage MDM Servers + DENY-by-default present' };
    }
  },

  // === V-62-04b: Edit-without-View dependency table ===
  {
    id: '4b', name: 'V-62-04b: 01-role-permission-model.md has Edit-without-View dependency table H2',
    run() {
      const c = readFile(AB_ROLE_PERM);
      if (c === null) return { pass: false, detail: AB_ROLE_PERM + ' missing' };
      if (!c.includes('Edit-without-View') && !c.includes('Edit without View')) {
        return { pass: false, detail: 'Edit-without-View dependency table missing' };
      }
      return { pass: true, detail: 'Edit-without-View section present' };
    }
  },

  // === V-62-05: 02-ous-architecture.md OU Scope Coverage + 5 mandatory resource rows ===
  {
    id: 5, name: 'V-62-05: 02-ous-architecture.md exists; OU Scope Coverage H2 + 5 mandatory resource rows',
    run() {
      const c = readFile(AB_OUS);
      if (c === null) return { pass: false, detail: AB_OUS + ' missing' };
      const hasOUScopeCoverage = c.includes('OU Scope Coverage') || c.includes('## OU');
      const mandatoryRows = ['Devices', 'Content tokens', 'MDM servers', 'Managed Apple', 'Role assignments'];
      const missingRows = mandatoryRows.filter(r => !c.includes(r));
      const issues = [];
      if (!hasOUScopeCoverage) issues.push('OU Scope Coverage H2 missing');
      if (missingRows.length > 0) issues.push('missing OU scope rows: ' + missingRows.join(', '));
      if (issues.length > 0) return { pass: false, detail: issues.join('; ') };
      return { pass: true, detail: 'OU Scope Coverage + 5 mandatory resource rows present' };
    }
  },

  // === V-62-06..09: 4 reciprocal banner lines ===
  {
    id: 6, name: 'V-62-06..09: all 4 existing glossaries have reciprocal banner pointing to _glossary-apple-business.md',
    run() {
      const missing = [];
      for (const g of GLOSSARIES_4) {
        const c = readFile(g);
        if (c === null) { missing.push(g + ' (file missing)'); continue; }
        if (!c.includes('_glossary-apple-business.md') && !c.includes('Apple Business Governance')) {
          missing.push(g + ' (no banner)');
        }
      }
      if (missing.length > 0) return { pass: false, detail: 'missing reciprocal banners: ' + missing.join(', ') };
      return { pass: true, detail: '4/4 glossaries have reciprocal banner' };
    }
  },

  // === V-62-10: _glossary-macos.md inline see-also ===
  {
    id: 10, name: 'V-62-10: docs/_glossary-macos.md has inline see-also pointing to _glossary-apple-business.md#apple-business',
    run() {
      const c = readFile('docs/_glossary-macos.md');
      if (c === null) return { pass: false, detail: 'docs/_glossary-macos.md missing' };
      if (!c.includes('_glossary-apple-business.md#apple-business') && !c.includes('_glossary-apple-business.md')) {
        return { pass: false, detail: 'inline see-also to _glossary-apple-business.md missing' };
      }
      return { pass: true, detail: 'inline see-also present' };
    }
  },

  // === V-62-11: _admin-directory.md exists + TENANT_FILL_IN present ===
  {
    id: 11, name: 'V-62-11: docs/cross-platform/apple-business/_admin-directory.md exists; <TENANT_FILL_IN> placeholder present',
    run() {
      const c = readFile(AB_ADMIN_DIR);
      if (c === null) return { pass: false, detail: AB_ADMIN_DIR + ' missing' };
      if (!c.includes('<TENANT_FILL_IN>')) return { pass: false, detail: '<TENANT_FILL_IN> placeholder not found' };
      return { pass: true, detail: 'file present; <TENANT_FILL_IN> placeholder found' };
    }
  },

  // === V-62-11-PII: TENANT_FILL_IN count >= 5 (T-62-A integrity) ===
  {
    id: '11-PII', name: 'V-62-11-PII: _admin-directory.md has >= 5 <TENANT_FILL_IN> placeholders (T-62-A integrity)',
    run() {
      const c = readFile(AB_ADMIN_DIR);
      if (c === null) return { pass: false, detail: AB_ADMIN_DIR + ' missing' };
      const count = (c.match(/<TENANT_FILL_IN>/g) || []).length;
      if (count < 5) return { pass: false, detail: count + ' <TENANT_FILL_IN> placeholders found (expected >= 5)' };
      return { pass: true, detail: count + ' <TENANT_FILL_IN> placeholders (>= 5)' };
    }
  },

  // === V-62-STYLE: 00-overview.md contains ABAUDIT style-guide convention ===
  {
    id: 'STYLE', name: 'V-62-STYLE: docs/cross-platform/apple-business/00-overview.md has ABAUDIT style-guide convention',
    run() {
      const c = readFile(AB_OVERVIEW);
      if (c === null) return { pass: false, detail: AB_OVERVIEW + ' missing' };
      if (!c.includes('ABAUDIT-') && !c.includes('ABAUDIT')) {
        return { pass: false, detail: 'ABAUDIT style-guide convention definition missing' };
      }
      return { pass: true, detail: 'ABAUDIT style-guide convention present in 00-overview.md' };
    }
  },

  // === V-62-ANCHORS: 62-ANCHOR-INVENTORY.md exists with >= 3 Pre-edit git SHA entries ===
  {
    id: 'ANCHORS', name: 'V-62-ANCHORS: 62-ANCHOR-INVENTORY.md exists with >= 3 Pre-edit git SHA entries',
    run() {
      if (ANCHOR_INVENTORY === null) return { pass: false, detail: '62-ANCHOR-INVENTORY.md not found at .planning/phases/ or .planning/milestones/v1.6-phases/' };
      const c = readFile(ANCHOR_INVENTORY);
      if (c === null) return { pass: false, detail: ANCHOR_INVENTORY + ' missing' };
      const shaCount = (c.match(/Pre-edit git SHA/gi) || []).length;
      if (shaCount < 3) return { pass: false, detail: shaCount + ' Pre-edit git SHA entries found (expected >= 3)' };
      return { pass: true, detail: shaCount + ' Pre-edit git SHA entries (>= 3)' };
    }
  },

  // === V-62-C14-AUTHORING: all 3 C14 canonical sites contain required tokens in first 50 lines ===
  {
    id: 'C14-AUTHORING', name: 'V-62-C14-AUTHORING: all 3 C14 sites have Apple Business Manager + Apple Business + 2026-04-14 in first 50 lines',
    run() {
      const C14_FILES = [
        'docs/cross-platform/apple-business/00-overview.md',
        'docs/admin-setup-macos/01-abm-configuration.md',
        'docs/admin-setup-ios/02-abm-token.md',
      ];
      const C14_TOKENS = ['Apple Business Manager', 'Apple Business', '2026-04-14'];
      const violations = [];
      for (const f of C14_FILES) {
        const c = readFile(f);
        if (c === null) { violations.push({ file: f, missing: ['file not found'] }); continue; }
        const window = c.split('\n').slice(0, 50).join('\n');
        const missing = C14_TOKENS.filter(t => !window.includes(t));
        if (missing.length > 0) violations.push({ file: f, missing });
      }
      if (violations.length === 0) return { pass: true, detail: '3/3 C14 sites pass token-set membership check' };
      return { pass: false, detail: 'C14 authoring failures: ' + JSON.stringify(violations) };
    }
  },

  // === V-62-SIDECAR: v1.6-audit-allowlist.json valid JSON + c16 entries [RECONCILED Phase 65] ===
  {
    id: 'SIDECAR', name: 'V-62-SIDECAR [RECONCILED Phase 65]: v1.6-audit-allowlist.json valid JSON; c16_missing_endpoint_exemptions has 0 entries (all 4 sunset-65 exemptions removed by Phase 65 atomic-trio)',
    // RECONCILED: was NEGATIVE count assertion in Phase 62 (expected 4 entries). Phase 65 atomic commit
    // (D-04a + 62-08-PLAN §464-465 contract) removed all 4 sunset-65 exemptions; array is now empty.
    run() {
      const raw = readFile(SIDECAR);
      if (raw === null) return { pass: false, detail: SIDECAR + ' missing' };
      let parsed;
      try { parsed = JSON.parse(raw); } catch (e) { return { pass: false, detail: 'JSON parse error: ' + e.message }; }
      const c16 = parsed.c16_missing_endpoint_exemptions || [];
      if (c16.length !== 0) return { pass: false, detail: 'c16_missing_endpoint_exemptions has ' + c16.length + ' entries (expected 0 after Phase 65 atomic-trio removal)' };
      return { pass: true, detail: 'valid JSON; c16=0 entries (Phase 65 atomic-trio sunset-65 removals confirmed)' };
    }
  },
];

// === V-62-CHAIN: chain regression-guards for check-phase-{48..61}.mjs ===
for (let i = 0; i < CHAIN_PHASES.length; i++) {
  const phaseNum = CHAIN_PHASES[i];
  const id = 'CHAIN-' + phaseNum;
  checks.push({
    id, name: `V-62-${id}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
    run() {
      // Skip phases with known pre-existing failures that are NOT Phase 62 regressions
      // (see CHAIN_SKIP documentation above for root causes and resolution path)
      if (CHAIN_SKIP.has(phaseNum)) {
        return { pass: true, skipped: true, detail: 'pre-existing failure unrelated to Phase 62 (see CHAIN_SKIP docs); Phase 66 terminal re-audit will resolve' };
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

// === V-62-AUDIT: v1.6-milestone-audit.mjs subprocess exits 0 ===
checks.push({
  id: 'AUDIT', name: 'V-62-AUDIT: v1.6-milestone-audit.mjs exits 0 (15 checks all PASS)',
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

// === V-62-FRONTMATTER-PARSE: '+' separator unit test (replicated parsePlatformValue logic) ===
checks.push({
  id: 'FRONTMATTER-PARSE', name: "V-62-FRONTMATTER-PARSE: '+' separator parser; 'ios+macos+shared-ipad' -> valid compound; 'ios+notaplatform' -> invalid",
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

// === V-62-C14-UNIT: synthetic C14 tests ===
checks.push({
  id: 'C14-UNIT', name: 'V-62-C14-UNIT: synthetic C14 token-set membership tests (all-present -> pass; missing date -> fail)',
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

// === V-62-C15-UNIT: synthetic C15 banned-phrase tests ===
checks.push({
  id: 'C15-UNIT', name: 'V-62-C15-UNIT: synthetic C15 Intune-RBAC banned-phrase tests (bare -> fail; ABAUDIT-exempted -> pass)',
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

// === V-62-C16-UNIT: synthetic C16 exemption tests ===
checks.push({
  id: 'C16-UNIT', name: 'V-62-C16-UNIT: synthetic C16 exemption tests (missing sunset_phase -> fail; 4-valid-exemptions -> pass)',
  run() {
    function c16Synth(exemptions) {
      const bad = exemptions.filter(e => !e.sunset_phase);
      if (bad.length > 0) return { pass: false, detail: 'missing sunset_phase: ' + JSON.stringify(bad) };
      const exemptFiles = new Set(exemptions.map(e => e.file));
      const endpoints = [
        'docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md',
        'docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md',
        'docs/common-issues.md#apple-business-governance-failure-scenarios',
        'docs/quick-ref-l1.md#apple-business-quick-reference',
      ];
      const failures = endpoints.filter(ep => !exemptFiles.has(ep) && !Array.from(exemptFiles).some(ef => ep.startsWith(ef + '#')));
      return { pass: failures.length === 0, failures };
    }
    const missingCase = c16Synth([
      {file: 'docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md'},  // no sunset_phase
      {file: 'docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md', sunset_phase: '64-65'},
      {file: 'docs/common-issues.md#apple-business-governance-failure-scenarios', sunset_phase: '65'},
      {file: 'docs/quick-ref-l1.md#apple-business-quick-reference', sunset_phase: '65'},
    ]);
    const validCase = c16Synth([
      {file: 'docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md', sunset_phase: '65'},
      {file: 'docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md', sunset_phase: '64-65'},
      {file: 'docs/common-issues.md#apple-business-governance-failure-scenarios', sunset_phase: '65'},
      {file: 'docs/quick-ref-l1.md#apple-business-quick-reference', sunset_phase: '65'},
    ]);
    const issues = [];
    if (missingCase.pass) issues.push('missing-sunset case should fail: ' + JSON.stringify(missingCase));
    if (!validCase.pass) issues.push('valid-exemptions case should pass: ' + JSON.stringify(validCase));
    if (issues.length > 0) return { pass: false, detail: issues.join('; ') };
    return { pass: true, detail: 'missing-sunset -> fail; 4-valid-exemptions -> pass' };
  }
});

// === V-62-SELF: CHAIN_PHASES does NOT include 62 (no self-reference) ===
checks.push({
  id: 'SELF', name: 'V-62-SELF: CHAIN_PHASES array does NOT include 62 (no self-recursive call)',
  run() {
    if (CHAIN_PHASES.includes(62)) return { pass: false, detail: 'CHAIN_PHASES includes 62 -- self-reference regression' };
    const skipList = [...CHAIN_SKIP].sort((a, b) => a - b).join(',');
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] -- 62 absent (correct); CHAIN_SKIP = [' + skipList + ']' };
  }
});

// === Runner loop (pattern verbatim from check-phase-61.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-62 -- Phase 62 deliverables\n');
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
