#!/usr/bin/env node
// Phase 59 static validation harness
// Source of truth: .planning/phases/59-hub-navigation-integration-linux-operations-sections/59-CONTEXT.md
// NO SHELL: all file content via fs.readFileSync; no shared module; no external tools
// Implements 36 checks (V-59-01 through V-59-36)
// Lineage: Phase 48 D-25 (validator-as-deliverable) -> Phase 49 D-26 -> Phase 50 D-25
//          -> Phase 51 D-20 -> Phase 52 D-11 -> Phase 53 D-11 -> Phase 54 D-17/D-18
//          -> Phase 55 D-17/D-18 -> Phase 56 D-18/D-19 -> Phase 57 D-29/D-30
//          -> Phase 58 D-17/D-18 -> Phase 59 D-26/D-27

import { readFileSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import process from 'node:process';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8');
}

// D-30: Pinned file paths -- same-plan-series validator update required on any rename.
const INDEX_MD        = 'docs/index.md';
const OPS_INDEX_MD    = 'docs/operations/00-index.md';
const QUICK_REF_L1_MD = 'docs/quick-ref-l1.md';
const QUICK_REF_L2_MD = 'docs/quick-ref-l2.md';
const GLOSSARY_WIN    = 'docs/_glossary.md';
const GLOSSARY_MACOS  = 'docs/_glossary-macos.md';
const GLOSSARY_AND    = 'docs/_glossary-android.md';
const GLOSSARY_LIN    = 'docs/_glossary-linux.md';

const ALL_GLOSSARIES = [GLOSSARY_WIN, GLOSSARY_MACOS, GLOSSARY_AND, GLOSSARY_LIN];
const ALL_HUB_FILES  = [INDEX_MD, OPS_INDEX_MD, QUICK_REF_L1_MD, QUICK_REF_L2_MD,
                        GLOSSARY_WIN, GLOSSARY_MACOS, GLOSSARY_AND, GLOSSARY_LIN];

// ============================================================
// HELPER FUNCTIONS (Phase 48-58 lineage idioms)
// ============================================================

// Escape special regex chars in a literal string
function escapeRegex(s) {
  return s.replace(/[/\\^$*+?.()|[\]{}]/g, '\\$&');
}

// Slice from H2 literal to next H2 (or EOF). Returns full region string, or null if H2 not found.
// CRLF-safe: the regex uses \s*$ which via multiline matches either \n or \r\n line endings.
function sliceH2Region(content, h2Literal) {
  const re = new RegExp('^' + escapeRegex(h2Literal) + '\\s*$', 'm');
  const m = content.match(re);
  if (!m) return null;
  const idx = content.indexOf(m[0]);
  const after = content.slice(idx + m[0].length);
  const nextH2 = after.search(/^## /m);
  return nextH2 > 0 ? content.slice(idx, idx + m[0].length + nextH2) : content.slice(idx);
}

// Slice from H3 literal to next H3 or H2 boundary (or EOF). Returns body after the H3 heading.
// Used for per-term glossary region extraction (Pattern 8 in RESEARCH).
function sliceH3Region(content, h3Literal) {
  const re = new RegExp('^' + escapeRegex(h3Literal) + '\\s*$', 'm');
  const m = content.match(re);
  if (!m) return null;
  const idx = content.indexOf(m[0]);
  const after = content.slice(idx + m[0].length);
  // End at next ### (H3) or ## (H2) or EOF
  const nextBoundary = after.search(/^#{2,3} /m);
  return nextBoundary > 0 ? after.slice(0, nextBoundary) : after;
}

// Slice H3 within an existing H2 region
function sliceH3InRegion(region, h3Literal) {
  const re = new RegExp('^' + escapeRegex(h3Literal) + '\\s*$', 'm');
  const m = region.match(re);
  if (!m) return null;
  const idx = region.indexOf(m[0]);
  const after = region.slice(idx + m[0].length);
  const nextH3 = after.search(/^### /m);
  return nextH3 > 0 ? after.slice(0, nextH3) : after;
}

// Count table data rows starting with | [ (link-bearing, excludes header and separator rows)
function countDataRows(window) {
  return (window.match(/^\| \[/gm) || []).length;
}

// Strip code blocks + Version History / Changelog to EOF for TBD-scan
function stripCodeAndHistory(content) {
  return content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^## Version History[\s\S]*$/m, '')
    .replace(/^## Changelog[\s\S]*$/m, '');
}

// GFM kebab-case slug (Phase 59 RESEARCH Pattern 6 + corrected per COBO/COPE/WPCO edge case):
// 1. Lowercase
// 2. Remove all chars that are not word chars (\w = [a-zA-Z0-9_]), spaces, or hyphens
//    (strips &, +, (, ), /, etc.)
// 3. Replace each space character 1:1 with a hyphen (NOT \s+ -- preserves double hyphens from
//    removed flanked-by-space chars, e.g. " / " -> "  " -> "--"; this matches GitHub cmark-gfm behavior)
// 4. Trim leading/trailing hyphens
// NOTE: do NOT collapse consecutive hyphens -- GFM preserves them (e.g. "COBO / COPE / WPCO" -> "cobo--cope--wpco")
function gfmSlug(heading) {
  return heading
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')   // remove non-word, non-space, non-hyphen chars
    .replace(/ /g, '-')         // each space -> hyphen (1:1, not \s+)
    .replace(/^-|-$/g, '');     // trim leading/trailing hyphens only
}

// Extract all H3 GFM slugs from a file's content (returns a Set)
function extractH3Slugs(content) {
  const slugs = new Set();
  const lines = content.split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^### (.+)$/);
    if (m) {
      slugs.add(gfmSlug(m[1].trim()));
    }
  }
  return slugs;
}

// ============================================================
// RECIPROCITY PAIRS  (D-30 locked from 59-05-COLLISION-MATRIX.md)
// Each pair: { srcFile, srcAnchor, tgtFile, tgtAnchor, srcH3, label }
// srcH3: literal H3 heading text in srcFile (used to scope the see-also search)
// ============================================================

// H3 heading literals (verbatim from 59-05-COLLISION-MATRIX.md Anchor Map)
const H3 = {
  // macOS
  supervision_macos:  '### Supervision',
  ade_macos:          '### ADE',
  abm_macos:          '### ABM',
  vpp_macos:          '### VPP',
  mam_we_macos:       '### MAM-WE',
  setup_asst_macos:   '### Setup Assistant',
  await_cfg_macos:    '### Await Configuration',
  acct_drv_macos:     '### Account-Driven User Enrollment',
  // Android
  supervision_and:    '### Supervision',
  zte_and:            '### Zero-Touch Enrollment',
  cobo_and:           '### COBO',
  cope_and:           '### COPE',
  wpco_and:           '### WPCO',
  dpc_and:            '### DPC',
  work_profile_and:   '### Work Profile',
  byod_and:           '### BYOD',
  user_enroll_and:    '### User Enrollment',
  corp_ids_and:       '### Corporate Identifiers',
  mgp_and:            '### Managed Google Play',
  // Linux
  supervision_lin:    '### Supervision',
  zte_lin:            '### Zero-Touch Enrollment (ZTE)',
  cobo_cope_wpco_lin: '### COBO / COPE / WPCO',
  dpc_lin:            '### DPC (Device Policy Controller)',
  work_profile_lin:   '### Work Profile',
  abm_lin:            '### ABM (Apple Business Manager)',
  vpp_lin:            '### VPP (Volume Purchase Program)',
  mgp_lin:            '### Managed Google Play (MGP)',
  hw_hash_lin:        '### Hardware Hash',
  web_app_ca_lin:     '### Web-app CA',
  // Windows
  hw_hash_win:        '### Hardware hash',
  corp_ids_win:       '### Corporate identifiers',
  oobe_win:           '### OOBE',
  esp_win:            '### ESP',
};

// All 40 bidirectional reciprocity pairs from 59-05-COLLISION-MATRIX.md
const RECIPROCITY_PAIRS = [
  // Supervision (6 pairs)
  { srcFile: GLOSSARY_MACOS, srcH3: H3.supervision_macos, tgtFile: GLOSSARY_AND,   tgtAnchor: '#supervision',                     label: 'Supervision macos->android' },
  { srcFile: GLOSSARY_MACOS, srcH3: H3.supervision_macos, tgtFile: GLOSSARY_LIN,   tgtAnchor: '#supervision',                     label: 'Supervision macos->linux' },
  { srcFile: GLOSSARY_AND,   srcH3: H3.supervision_and,   tgtFile: GLOSSARY_MACOS, tgtAnchor: '#supervision',                     label: 'Supervision android->macos' },
  { srcFile: GLOSSARY_AND,   srcH3: H3.supervision_and,   tgtFile: GLOSSARY_LIN,   tgtAnchor: '#supervision',                     label: 'Supervision android->linux' },
  { srcFile: GLOSSARY_LIN,   srcH3: H3.supervision_lin,   tgtFile: GLOSSARY_MACOS, tgtAnchor: '#supervision',                     label: 'Supervision linux->macos' },
  { srcFile: GLOSSARY_LIN,   srcH3: H3.supervision_lin,   tgtFile: GLOSSARY_AND,   tgtAnchor: '#supervision',                     label: 'Supervision linux->android' },
  // ZTE (2 pairs)
  { srcFile: GLOSSARY_AND,   srcH3: H3.zte_and,           tgtFile: GLOSSARY_LIN,   tgtAnchor: '#zero-touch-enrollment-zte',        label: 'ZTE android->linux' },
  { srcFile: GLOSSARY_LIN,   srcH3: H3.zte_lin,           tgtFile: GLOSSARY_AND,   tgtAnchor: '#zero-touch-enrollment',            label: 'ZTE linux->android' },
  // COBO (2 pairs)
  { srcFile: GLOSSARY_AND,   srcH3: H3.cobo_and,          tgtFile: GLOSSARY_LIN,   tgtAnchor: '#cobo--cope--wpco',                 label: 'COBO android->linux' },
  { srcFile: GLOSSARY_LIN,   srcH3: H3.cobo_cope_wpco_lin, tgtFile: GLOSSARY_AND,  tgtAnchor: '#cobo',                             label: 'COBO linux->android' },
  // COPE (2 pairs)
  { srcFile: GLOSSARY_AND,   srcH3: H3.cope_and,          tgtFile: GLOSSARY_LIN,   tgtAnchor: '#cobo--cope--wpco',                 label: 'COPE android->linux' },
  { srcFile: GLOSSARY_LIN,   srcH3: H3.cobo_cope_wpco_lin, tgtFile: GLOSSARY_AND,  tgtAnchor: '#cope',                             label: 'COPE linux->android' },
  // WPCO (2 pairs)
  { srcFile: GLOSSARY_AND,   srcH3: H3.wpco_and,          tgtFile: GLOSSARY_LIN,   tgtAnchor: '#cobo--cope--wpco',                 label: 'WPCO android->linux' },
  { srcFile: GLOSSARY_LIN,   srcH3: H3.cobo_cope_wpco_lin, tgtFile: GLOSSARY_AND,  tgtAnchor: '#wpco',                             label: 'WPCO linux->android' },
  // DPC (2 pairs)
  { srcFile: GLOSSARY_AND,   srcH3: H3.dpc_and,           tgtFile: GLOSSARY_LIN,   tgtAnchor: '#dpc-device-policy-controller',     label: 'DPC android->linux' },
  { srcFile: GLOSSARY_LIN,   srcH3: H3.dpc_lin,           tgtFile: GLOSSARY_AND,   tgtAnchor: '#dpc',                              label: 'DPC linux->android' },
  // Work Profile (2 pairs)
  { srcFile: GLOSSARY_AND,   srcH3: H3.work_profile_and,  tgtFile: GLOSSARY_LIN,   tgtAnchor: '#work-profile',                     label: 'Work Profile android->linux' },
  { srcFile: GLOSSARY_LIN,   srcH3: H3.work_profile_lin,  tgtFile: GLOSSARY_AND,   tgtAnchor: '#work-profile',                     label: 'Work Profile linux->android' },
  // ABM (2 pairs)
  { srcFile: GLOSSARY_MACOS, srcH3: H3.abm_macos,         tgtFile: GLOSSARY_LIN,   tgtAnchor: '#abm-apple-business-manager',       label: 'ABM macos->linux' },
  { srcFile: GLOSSARY_LIN,   srcH3: H3.abm_lin,           tgtFile: GLOSSARY_MACOS, tgtAnchor: '#abm',                              label: 'ABM linux->macos' },
  // VPP (2 pairs)
  { srcFile: GLOSSARY_MACOS, srcH3: H3.vpp_macos,         tgtFile: GLOSSARY_LIN,   tgtAnchor: '#vpp-volume-purchase-program',      label: 'VPP macos->linux' },
  { srcFile: GLOSSARY_LIN,   srcH3: H3.vpp_lin,           tgtFile: GLOSSARY_MACOS, tgtAnchor: '#vpp',                              label: 'VPP linux->macos' },
  // Managed Google Play (2 pairs)
  { srcFile: GLOSSARY_AND,   srcH3: H3.mgp_and,           tgtFile: GLOSSARY_LIN,   tgtAnchor: '#managed-google-play-mgp',          label: 'MGP android->linux' },
  { srcFile: GLOSSARY_LIN,   srcH3: H3.mgp_lin,           tgtFile: GLOSSARY_AND,   tgtAnchor: '#managed-google-play',              label: 'MGP linux->android' },
  // Hardware Hash (2 pairs)
  { srcFile: GLOSSARY_WIN,   srcH3: H3.hw_hash_win,       tgtFile: GLOSSARY_LIN,   tgtAnchor: '#hardware-hash',                    label: 'Hardware Hash win->linux' },
  { srcFile: GLOSSARY_LIN,   srcH3: H3.hw_hash_lin,       tgtFile: GLOSSARY_WIN,   tgtAnchor: '#hardware-hash',                    label: 'Hardware Hash linux->win' },
  // Corporate Identifiers (2 pairs)
  { srcFile: GLOSSARY_WIN,   srcH3: H3.corp_ids_win,      tgtFile: GLOSSARY_AND,   tgtAnchor: '#corporate-identifiers',            label: 'Corporate Identifiers win->android' },
  { srcFile: GLOSSARY_AND,   srcH3: H3.corp_ids_and,      tgtFile: GLOSSARY_WIN,   tgtAnchor: '#corporate-identifiers',            label: 'Corporate Identifiers android->win' },
  // Web-app CA / MAM-WE (2 pairs)
  { srcFile: GLOSSARY_LIN,   srcH3: H3.web_app_ca_lin,    tgtFile: GLOSSARY_MACOS, tgtAnchor: '#mam-we',                           label: 'Web-app CA / MAM-WE linux->macos' },
  { srcFile: GLOSSARY_MACOS, srcH3: H3.mam_we_macos,      tgtFile: GLOSSARY_LIN,   tgtAnchor: '#web-app-ca',                       label: 'Web-app CA / MAM-WE macos->linux' },
  // OOBE / Setup Assistant (2 pairs)
  { srcFile: GLOSSARY_WIN,   srcH3: H3.oobe_win,          tgtFile: GLOSSARY_MACOS, tgtAnchor: '#setup-assistant',                  label: 'OOBE/Setup Assistant win->macos' },
  { srcFile: GLOSSARY_MACOS, srcH3: H3.setup_asst_macos,  tgtFile: GLOSSARY_WIN,   tgtAnchor: '#oobe',                             label: 'OOBE/Setup Assistant macos->win' },
  // ESP / Await Configuration (2 pairs)
  { srcFile: GLOSSARY_WIN,   srcH3: H3.esp_win,           tgtFile: GLOSSARY_MACOS, tgtAnchor: '#await-configuration',              label: 'ESP/Await Configuration win->macos' },
  { srcFile: GLOSSARY_MACOS, srcH3: H3.await_cfg_macos,   tgtFile: GLOSSARY_WIN,   tgtAnchor: '#esp',                              label: 'ESP/Await Configuration macos->win' },
  // BYOD (Android) <-> Account-Driven User Enrollment (macOS) (2 pairs)
  { srcFile: GLOSSARY_AND,   srcH3: H3.byod_and,          tgtFile: GLOSSARY_MACOS, tgtAnchor: '#account-driven-user-enrollment',   label: 'BYOD android->macos' },
  { srcFile: GLOSSARY_MACOS, srcH3: H3.acct_drv_macos,    tgtFile: GLOSSARY_AND,   tgtAnchor: '#byod',                             label: 'Account-Driven UE macos->android(byod)' },
  // User Enrollment (Android) <-> Account-Driven User Enrollment (macOS) (2 pairs)
  { srcFile: GLOSSARY_AND,   srcH3: H3.user_enroll_and,   tgtFile: GLOSSARY_MACOS, tgtAnchor: '#account-driven-user-enrollment',   label: 'User Enrollment android->macos' },
  { srcFile: GLOSSARY_MACOS, srcH3: H3.acct_drv_macos,    tgtFile: GLOSSARY_AND,   tgtAnchor: '#user-enrollment',                  label: 'Account-Driven UE macos->android(ue)' },
  // ADE <-> ZTE (2 pairs)
  { srcFile: GLOSSARY_MACOS, srcH3: H3.ade_macos,         tgtFile: GLOSSARY_AND,   tgtAnchor: '#zero-touch-enrollment',            label: 'ADE/ZTE macos->android' },
  { srcFile: GLOSSARY_AND,   srcH3: H3.zte_and,           tgtFile: GLOSSARY_MACOS, tgtAnchor: '#ade',                              label: 'ADE/ZTE android->macos' },
];

// ============================================================
// CHECKS ARRAY
// ============================================================

const checks = [

  // ============================================================
  // V-59-01..06: FILE EXISTENCE
  // ============================================================

  {
    id: 1, name: 'V-59-01: docs/index.md exists',
    run() {
      const c = readFile(INDEX_MD);
      if (c === null) return { pass: false, detail: 'File missing: ' + INDEX_MD };
      return { pass: true, detail: c.length + ' bytes' };
    }
  },
  {
    id: 2, name: 'V-59-02: docs/operations/00-index.md exists',
    run() {
      const c = readFile(OPS_INDEX_MD);
      if (c === null) return { pass: false, detail: 'File missing: ' + OPS_INDEX_MD };
      return { pass: true, detail: c.length + ' bytes' };
    }
  },
  {
    id: 3, name: 'V-59-03: docs/quick-ref-l1.md exists',
    run() {
      const c = readFile(QUICK_REF_L1_MD);
      if (c === null) return { pass: false, detail: 'File missing: ' + QUICK_REF_L1_MD };
      return { pass: true, detail: c.length + ' bytes' };
    }
  },
  {
    id: 4, name: 'V-59-04: docs/quick-ref-l2.md exists',
    run() {
      const c = readFile(QUICK_REF_L2_MD);
      if (c === null) return { pass: false, detail: 'File missing: ' + QUICK_REF_L2_MD };
      return { pass: true, detail: c.length + ' bytes' };
    }
  },
  {
    id: 5, name: 'V-59-05: docs/_glossary.md + _glossary-macos.md + _glossary-android.md exist',
    run() {
      const missing = [];
      for (const f of [GLOSSARY_WIN, GLOSSARY_MACOS, GLOSSARY_AND]) {
        if (readFile(f) === null) missing.push('File missing: ' + f);
      }
      if (missing.length) return { pass: false, detail: missing.join(' | ') };
      return { pass: true, detail: 'all 3 Windows/macOS/Android glossary files present' };
    }
  },
  {
    id: 6, name: 'V-59-06: docs/_glossary-linux.md exists',
    run() {
      const c = readFile(GLOSSARY_LIN);
      if (c === null) return { pass: false, detail: 'File missing: ' + GLOSSARY_LIN };
      return { pass: true, detail: c.length + ' bytes' };
    }
  },

  // ============================================================
  // V-59-07..09: docs/index.md LINUX H2 (GA-1)
  // ============================================================

  {
    id: 7, name: 'V-59-07: docs/index.md Linux H2 -- 3 sub-H3 + row counts L1=4 / L2=4 / Admin=3',
    run() {
      const c = readFile(INDEX_MD);
      if (c === null) return { pass: false, detail: 'File missing: ' + INDEX_MD };
      const region = sliceH2Region(c, '## Linux Provisioning');
      if (!region) return { pass: false, detail: '"## Linux Provisioning" H2 not found in docs/index.md' };

      // Check all 3 sub-H3 headings present
      const h3s = ['### Service Desk (L1)', '### Desktop Engineering (L2)', '### Admin Setup'];
      const missingH3 = h3s.filter(h => !region.includes(h));
      if (missingH3.length) return { pass: false, detail: 'Missing sub-H3(s): ' + missingH3.join(', ') };

      // Row counts per sub-H3
      const l1Win = sliceH3InRegion(region, '### Service Desk (L1)');
      const l2Win = sliceH3InRegion(region, '### Desktop Engineering (L2)');
      const adminWin = sliceH3InRegion(region, '### Admin Setup');

      const l1Rows = l1Win ? countDataRows(l1Win) : 0;
      const l2Rows = l2Win ? countDataRows(l2Win) : 0;
      const adminRows = adminWin ? countDataRows(adminWin) : 0;

      const errors = [];
      if (l1Rows !== 4) errors.push('L1 row count = ' + l1Rows + ', expected 4');
      if (l2Rows !== 4) errors.push('L2 row count = ' + l2Rows + ', expected 4');
      if (adminRows !== 3) errors.push('Admin row count = ' + adminRows + ', expected 3');
      if (errors.length) return { pass: false, detail: errors.join(' | ') };

      return { pass: true, detail: '## Linux Provisioning H2 found; 3 sub-H3s present; L1=4 L2=4 Admin=3' };
    }
  },
  {
    id: 8, name: 'V-59-08: docs/index.md Cross-Platform References contains Linux Provisioning Lifecycle AND Linux Capability Matrix entries',
    run() {
      const c = readFile(INDEX_MD);
      if (c === null) return { pass: false, detail: 'File missing: ' + INDEX_MD };
      const region = sliceH2Region(c, '## Cross-Platform References');
      if (!region) return { pass: false, detail: '"## Cross-Platform References" H2 not found' };
      const errors = [];
      if (!region.includes('Linux Provisioning Lifecycle')) errors.push('missing "Linux Provisioning Lifecycle" entry');
      if (!region.includes('Linux Capability Matrix')) errors.push('missing "Linux Capability Matrix" entry');
      if (errors.length) return { pass: false, detail: errors.join(' | ') };
      return { pass: true, detail: 'both Linux entries present in Cross-Platform References' };
    }
  },
  {
    id: 9, name: 'V-59-09: NEGATIVE -- docs/index.md does NOT surface linux-intune-portal-enrollment.md or end-user-guides/linux',
    run() {
      const c = readFile(INDEX_MD);
      if (c === null) return { pass: false, detail: 'File missing: ' + INDEX_MD };
      if (c.includes('linux-intune-portal-enrollment.md')) {
        return { pass: false, detail: '"linux-intune-portal-enrollment.md" found in docs/index.md -- D-06 end-user guide not-surfaced rule violated' };
      }
      if (c.includes('end-user-guides/linux')) {
        return { pass: false, detail: '"end-user-guides/linux" found in docs/index.md -- D-06 end-user guide not-surfaced rule violated' };
      }
      return { pass: true, detail: 'no end-user-guides/linux or linux-intune-portal-enrollment.md references in hub' };
    }
  },

  // ============================================================
  // V-59-10..19: Operations H2 + ops/00-index.md (GA-2)
  // ============================================================

  {
    id: 10, name: 'V-59-10: docs/index.md Operations H2 present + ordering (Linux -> Operations -> Cross-Platform References)',
    run() {
      const c = readFile(INDEX_MD);
      if (c === null) return { pass: false, detail: 'File missing: ' + INDEX_MD };
      if (!/^## Operations\s*$/m.test(c)) return { pass: false, detail: '"## Operations" H2 not found in docs/index.md' };

      // Ordering: index of Linux H2 < index of Operations H2 < index of Cross-Platform References H2
      const linuxIdx = c.search(/^## Linux Provisioning\s*$/m);
      const opsIdx   = c.search(/^## Operations\s*$/m);
      const xrefIdx  = c.search(/^## Cross-Platform References\s*$/m);

      if (linuxIdx < 0) return { pass: false, detail: '"## Linux Provisioning" H2 not found (V-59-07 dependency)' };
      if (xrefIdx  < 0) return { pass: false, detail: '"## Cross-Platform References" H2 not found' };

      const errors = [];
      if (!(linuxIdx < opsIdx))   errors.push('Linux H2 (pos ' + linuxIdx + ') is not before Operations H2 (pos ' + opsIdx + ')');
      if (!(opsIdx   < xrefIdx))  errors.push('Operations H2 (pos ' + opsIdx + ') is not before Cross-Platform References H2 (pos ' + xrefIdx + ')');
      if (errors.length) return { pass: false, detail: errors.join(' | ') };

      return { pass: true, detail: 'H2 ordering correct: Linux < Operations < Cross-Platform References' };
    }
  },
  {
    id: 11, name: 'V-59-11: docs/index.md Operations H2 contains 4 sub-H3 anchors (Co-Management / Patch & Update Management / App Lifecycle Automation / Compliance Drift Detection + Tenant Migration)',
    run() {
      const c = readFile(INDEX_MD);
      if (c === null) return { pass: false, detail: 'File missing: ' + INDEX_MD };
      const region = sliceH2Region(c, '## Operations');
      if (!region) return { pass: false, detail: '"## Operations" H2 not found' };

      // NOTE: + in H3 name must be escaped in regex; using includes() for literal string match
      const h3s = [
        '### Co-Management',
        '### Patch & Update Management',
        '### App Lifecycle Automation',
        '### Compliance Drift Detection + Tenant Migration',
      ];
      const missing = h3s.filter(h => !region.includes(h));
      if (missing.length) return { pass: false, detail: 'Missing Operations sub-H3(s): ' + missing.join(', ') };
      return { pass: true, detail: 'all 4 Operations sub-H3 anchors present' };
    }
  },
  {
    id: 12, name: 'V-59-12: NEGATIVE -- docs/index.md does NOT contain "Operational Depth" as H2 or H3 token',
    run() {
      const c = readFile(INDEX_MD);
      if (c === null) return { pass: false, detail: 'File missing: ' + INDEX_MD };
      if (/^##.+Operational Depth/m.test(c)) {
        return { pass: false, detail: '"Operational Depth" found as H2/H3 token -- D-08 naming rule violated (must be "## Operations" not "Operational Depth")' };
      }
      return { pass: true, detail: 'no "Operational Depth" H2/H3 token in docs/index.md' };
    }
  },
  {
    id: 13, name: 'V-59-13: docs/operations/00-index.md contains all 4 H2 sections',
    run() {
      const c = readFile(OPS_INDEX_MD);
      if (c === null) return { pass: false, detail: 'File missing: ' + OPS_INDEX_MD };
      // NOTE: + in H2 name escaped below for test clarity, but using includes() avoids escape issues
      const h2s = [
        '## Co-Management',
        '## Patch & Update Management',
        '## App Lifecycle Automation',
        '## Compliance Drift Detection + Tenant Migration',
      ];
      const missing = h2s.filter(h => !c.includes(h));
      if (missing.length) return { pass: false, detail: 'Missing H2 sections in ops/00-index.md: ' + missing.join(', ') };
      return { pass: true, detail: 'all 4 H2 sections present in ops/00-index.md' };
    }
  },
  {
    id: 14, name: 'V-59-14: docs/operations/00-index.md row counts -- Patch=5 / App=5 / Drift=5',
    run() {
      const c = readFile(OPS_INDEX_MD);
      if (c === null) return { pass: false, detail: 'File missing: ' + OPS_INDEX_MD };

      const patchRegion = sliceH2Region(c, '## Patch & Update Management');
      const appRegion   = sliceH2Region(c, '## App Lifecycle Automation');
      const driftRegion = sliceH2Region(c, '## Compliance Drift Detection + Tenant Migration');

      const patchRows = patchRegion ? countDataRows(patchRegion) : 0;
      const appRows   = appRegion   ? countDataRows(appRegion)   : 0;
      const driftRows = driftRegion ? countDataRows(driftRegion) : 0;

      const errors = [];
      if (!patchRegion) errors.push('"## Patch & Update Management" H2 not found');
      else if (patchRows !== 5) errors.push('Patch row count = ' + patchRows + ', expected 5');

      if (!appRegion) errors.push('"## App Lifecycle Automation" H2 not found');
      else if (appRows !== 5) errors.push('App row count = ' + appRows + ', expected 5');

      if (!driftRegion) errors.push('"## Compliance Drift Detection + Tenant Migration" H2 not found');
      else if (driftRows !== 5) errors.push('Drift row count = ' + driftRows + ', expected 5');

      if (errors.length) return { pass: false, detail: errors.join(' | ') };
      return { pass: true, detail: 'Patch=5 App=5 Drift=5 rows in ops/00-index.md' };
    }
  },
  {
    id: 15, name: 'V-59-15: Operations Co-Management sub-table -- every data row contains a markdown link (PITFALL-7)',
    run() {
      const c = readFile(INDEX_MD);
      if (c === null) return { pass: false, detail: 'File missing: ' + INDEX_MD };
      const opsRegion = sliceH2Region(c, '## Operations');
      if (!opsRegion) return { pass: false, detail: '"## Operations" H2 not found' };
      const h3Win = sliceH3InRegion(opsRegion, '### Co-Management');
      if (!h3Win) return { pass: false, detail: '"### Co-Management" H3 not found in Operations region' };
      const failures = [];
      for (const line of h3Win.split(/\r?\n/)) {
        if (/^\| \[/.test(line)) continue; // link-bearing first cell
        if (/^\|[^|]+\|/.test(line) && !/^\|[-: ]+\|/.test(line) && !/^\| Resource/.test(line)) {
          // data row not starting with a link
          if (!/\[.+\]\(.+\)/.test(line)) failures.push(line.trim().slice(0, 80));
        }
      }
      if (failures.length) return { pass: false, detail: 'Co-Management rows missing links: ' + failures.join(' | ') };
      return { pass: true, detail: 'all Co-Management sub-table data rows contain markdown links' };
    }
  },
  {
    id: 16, name: 'V-59-16: Operations Patch & Update Management sub-table -- every data row contains a markdown link (PITFALL-7)',
    run() {
      const c = readFile(INDEX_MD);
      if (c === null) return { pass: false, detail: 'File missing: ' + INDEX_MD };
      const opsRegion = sliceH2Region(c, '## Operations');
      if (!opsRegion) return { pass: false, detail: '"## Operations" H2 not found' };
      const h3Win = sliceH3InRegion(opsRegion, '### Patch & Update Management');
      if (!h3Win) return { pass: false, detail: '"### Patch & Update Management" H3 not found in Operations region' };
      const failures = [];
      for (const line of h3Win.split(/\r?\n/)) {
        if (/^\|[-: ]+\|/.test(line)) continue; // separator
        if (/^\| Resource/.test(line) || /^\| Description/.test(line)) continue; // header
        if (/^\|/.test(line) && !/\[.+\]\(.+\)/.test(line)) {
          failures.push(line.trim().slice(0, 80));
        }
      }
      if (failures.length) return { pass: false, detail: 'Patch & Update Management rows missing links: ' + failures.join(' | ') };
      return { pass: true, detail: 'all Patch & Update Management sub-table data rows contain markdown links' };
    }
  },
  {
    id: 17, name: 'V-59-17: Operations App Lifecycle Automation sub-table -- every data row contains a markdown link (PITFALL-7)',
    run() {
      const c = readFile(INDEX_MD);
      if (c === null) return { pass: false, detail: 'File missing: ' + INDEX_MD };
      const opsRegion = sliceH2Region(c, '## Operations');
      if (!opsRegion) return { pass: false, detail: '"## Operations" H2 not found' };
      const h3Win = sliceH3InRegion(opsRegion, '### App Lifecycle Automation');
      if (!h3Win) return { pass: false, detail: '"### App Lifecycle Automation" H3 not found in Operations region' };
      const failures = [];
      for (const line of h3Win.split(/\r?\n/)) {
        if (/^\|[-: ]+\|/.test(line)) continue;
        if (/^\| Resource/.test(line)) continue;
        if (/^\|/.test(line) && !/\[.+\]\(.+\)/.test(line)) {
          failures.push(line.trim().slice(0, 80));
        }
      }
      if (failures.length) return { pass: false, detail: 'App Lifecycle Automation rows missing links: ' + failures.join(' | ') };
      return { pass: true, detail: 'all App Lifecycle Automation sub-table data rows contain markdown links' };
    }
  },
  {
    id: 18, name: 'V-59-18: Operations Compliance Drift Detection + Tenant Migration sub-table -- every data row contains a markdown link (PITFALL-7)',
    run() {
      const c = readFile(INDEX_MD);
      if (c === null) return { pass: false, detail: 'File missing: ' + INDEX_MD };
      const opsRegion = sliceH2Region(c, '## Operations');
      if (!opsRegion) return { pass: false, detail: '"## Operations" H2 not found' };
      const h3Win = sliceH3InRegion(opsRegion, '### Compliance Drift Detection + Tenant Migration');
      if (!h3Win) return { pass: false, detail: '"### Compliance Drift Detection + Tenant Migration" H3 not found in Operations region' };
      const failures = [];
      for (const line of h3Win.split(/\r?\n/)) {
        if (/^\|[-: ]+\|/.test(line)) continue;
        if (/^\| Resource/.test(line)) continue;
        if (/^\|/.test(line) && !/\[.+\]\(.+\)/.test(line)) {
          failures.push(line.trim().slice(0, 80));
        }
      }
      if (failures.length) return { pass: false, detail: 'Compliance Drift Detection sub-table rows missing links: ' + failures.join(' | ') };
      return { pass: true, detail: 'all Compliance Drift Detection + Tenant Migration sub-table data rows contain markdown links' };
    }
  },
  {
    id: 19, name: 'V-59-19: NEGATIVE -- Operations H2 body does NOT contain "No co-management equivalent" blockquote token',
    run() {
      const c = readFile(INDEX_MD);
      if (c === null) return { pass: false, detail: 'File missing: ' + INDEX_MD };
      const opsRegion = sliceH2Region(c, '## Operations');
      if (!opsRegion) return { pass: false, detail: '"## Operations" H2 not found' };
      if (opsRegion.includes('No co-management equivalent')) {
        return { pass: false, detail: '"No co-management equivalent" literal found inside Operations H2 -- PITFALL-7 blockquote verbatim-paste detected' };
      }
      return { pass: true, detail: 'no blockquote verbatim-paste tokens in Operations H2 body' };
    }
  },

  // ============================================================
  // V-59-20..24: GLOSSARY SEE-ALSO RECIPROCITY (GA-3 / CLEAN-08)
  // ============================================================

  {
    id: 20, name: 'V-59-20: A1 reciprocity -- every source H3 region has a "> See also:" line',
    run() {
      const contents = {};
      for (const f of ALL_GLOSSARIES) {
        contents[f] = readFile(f);
      }
      const failures = [];
      for (const pair of RECIPROCITY_PAIRS) {
        const src = contents[pair.srcFile];
        if (src === null) { failures.push(pair.label + ': src file missing'); continue; }
        const region = sliceH3Region(src, pair.srcH3);
        if (!region) { failures.push(pair.label + ': H3 "' + pair.srcH3 + '" not found in ' + pair.srcFile); continue; }
        if (!/ See also:/i.test(region)) {
          failures.push(pair.label + ': no "> See also:" line in H3 region of ' + basename(pair.srcFile) + ' "' + pair.srcH3 + '"');
        }
      }
      if (failures.length) return { pass: false, detail: failures.slice(0, 5).join(' | ') + (failures.length > 5 ? ' (+ ' + (failures.length - 5) + ' more)' : '') };
      return { pass: true, detail: 'all ' + RECIPROCITY_PAIRS.length + ' source H3 regions contain "> See also:" line (A1 PASS)' };
    }
  },
  {
    id: 21, name: 'V-59-21: A2 anchor-correctness -- target anchor slug exists as H3 in target glossary file',
    run() {
      // Build slug sets for each glossary
      const slugSets = {};
      for (const f of ALL_GLOSSARIES) {
        const c = readFile(f);
        slugSets[f] = c ? extractH3Slugs(c) : new Set();
      }
      const failures = [];
      for (const pair of RECIPROCITY_PAIRS) {
        const tgtSlugs = slugSets[pair.tgtFile];
        if (!tgtSlugs) { failures.push(pair.label + ': target file missing'); continue; }
        const anchor = pair.tgtAnchor.replace(/^#/, ''); // strip leading #
        if (!tgtSlugs.has(anchor)) {
          failures.push(pair.label + ': anchor "' + pair.tgtAnchor + '" not found as H3 slug in ' + basename(pair.tgtFile));
        }
      }
      if (failures.length) return { pass: false, detail: failures.slice(0, 5).join(' | ') + (failures.length > 5 ? ' (+ ' + (failures.length - 5) + ' more)' : '') };
      return { pass: true, detail: 'all ' + RECIPROCITY_PAIRS.length + ' target anchors resolve as H3 slugs in their target files (A2 PASS)' };
    }
  },
  {
    id: 22, name: 'V-59-22: bidirectional pairs -- source H3 region see-also line references target file basename + anchor',
    run() {
      const contents = {};
      for (const f of ALL_GLOSSARIES) {
        contents[f] = readFile(f);
      }
      const failures = [];
      for (const pair of RECIPROCITY_PAIRS) {
        const src = contents[pair.srcFile];
        if (src === null) { failures.push(pair.label + ': src file missing'); continue; }
        const region = sliceH3Region(src, pair.srcH3);
        if (!region) { failures.push(pair.label + ': H3 not found'); continue; }
        const tgtBase = basename(pair.tgtFile);
        const anchor  = pair.tgtAnchor; // e.g. "#supervision"
        // Check region contains "tgtBase#anchor" or "tgtBase" + anchor in some proximity
        // The see-also line format is: > See also: [Term](other-glossary.md#anchor) ...
        const linkPattern = tgtBase + anchor;
        if (!region.includes(linkPattern)) {
          failures.push(pair.label + ': region of "' + pair.srcH3 + '" in ' + basename(pair.srcFile) + ' does not contain "' + linkPattern + '"');
        }
      }
      if (failures.length) return { pass: false, detail: failures.slice(0, 5).join(' | ') + (failures.length > 5 ? ' (+ ' + (failures.length - 5) + ' more)' : '') };
      return { pass: true, detail: 'all ' + RECIPROCITY_PAIRS.length + ' bidirectional pairs verified -- each source H3 region references the correct target anchor (A2 bidirectional PASS)' };
    }
  },
  {
    id: 23, name: 'V-59-23: transitivity sanity -- RECIPROCITY_PAIRS.length >= 6',
    run() {
      if (RECIPROCITY_PAIRS.length < 6) {
        return { pass: false, detail: 'RECIPROCITY_PAIRS.length = ' + RECIPROCITY_PAIRS.length + ', expected >= 6 (encryption triple alone produces 6 pairs)' };
      }
      return { pass: true, detail: 'RECIPROCITY_PAIRS.length = ' + RECIPROCITY_PAIRS.length + ' >= 6 (transitivity sanity PASS)' };
    }
  },
  {
    id: 24, name: 'V-59-24: A3 blockquote integrity -- every "> See also:" line is preceded by another ">" line within its H3 region',
    run() {
      const failures = [];
      for (const f of ALL_GLOSSARIES) {
        const c = readFile(f);
        if (c === null) continue;
        const lines = c.split(/\r?\n/);
        for (let i = 0; i < lines.length; i++) {
          if (/^> See also:/i.test(lines[i])) {
            // Must be preceded by another > line
            if (i === 0 || !/^>/.test(lines[i - 1])) {
              failures.push(basename(f) + ' line ' + (i + 1) + ': "> See also:" not preceded by ">" line');
            }
          }
        }
      }
      if (failures.length) return { pass: false, detail: failures.slice(0, 5).join(' | ') + (failures.length > 5 ? ' (+ ' + (failures.length - 5) + ' more)' : '') };
      return { pass: true, detail: 'all "> See also:" lines are preceded by ">" lines in all 4 glossaries (A3 blockquote integrity PASS)' };
    }
  },

  // ============================================================
  // V-59-25..27: quick-ref-l1.md LINUX H2 (GA-4 L1)
  // ============================================================

  {
    id: 25, name: 'V-59-25: quick-ref-l1.md has "## Linux Quick Reference" H2 + 4 sub-H3 anchors',
    run() {
      const c = readFile(QUICK_REF_L1_MD);
      if (c === null) return { pass: false, detail: 'File missing: ' + QUICK_REF_L1_MD };
      const region = sliceH2Region(c, '## Linux Quick Reference');
      if (!region) return { pass: false, detail: '"## Linux Quick Reference" H2 not found in quick-ref-l1.md' };

      const h3s = [
        '### Top Checks',
        '### Linux Escalation Triggers',
        '### Linux Decision Tree',
        '### Linux Runbooks',
      ];
      const missing = h3s.filter(h => !region.includes(h));
      if (missing.length) return { pass: false, detail: 'Missing L1 Linux sub-H3(s): ' + missing.join(', ') };

      // Top Checks must have exactly 4 numbered items (lines matching /^[1-9]\. /)
      const topChecksRegion = sliceH3InRegion(region, '### Top Checks');
      const itemCount = topChecksRegion ? (topChecksRegion.match(/^[1-9]\.\s/gm) || []).length : 0;
      if (itemCount !== 4) return { pass: false, detail: 'Top Checks has ' + itemCount + ' numbered items, expected 4' };

      // Verify Linux H2 is appended AFTER Android H2
      const androidIdx = c.search(/^## Android Enterprise Quick Reference\s*$/m);
      const linuxIdx   = c.search(/^## Linux Quick Reference\s*$/m);
      if (androidIdx >= 0 && !(androidIdx < linuxIdx)) {
        return { pass: false, detail: 'Android H2 (pos ' + androidIdx + ') is not before Linux H2 (pos ' + linuxIdx + ') -- ordering violation' };
      }

      return { pass: true, detail: '"## Linux Quick Reference" H2 found with 4 sub-H3s; Top Checks has 4 items; positioned after Android H2' };
    }
  },
  {
    id: 26, name: 'V-59-26: NEGATIVE -- quick-ref-l1.md Linux H2 body does NOT contain Mode tag literals [BYOD]/[ZTE]/[AOSP]/[Knox]/[All GMS]/[22.04]/[24.04]',
    run() {
      const c = readFile(QUICK_REF_L1_MD);
      if (c === null) return { pass: false, detail: 'File missing: ' + QUICK_REF_L1_MD };
      const region = sliceH2Region(c, '## Linux Quick Reference');
      if (!region) return { pass: false, detail: '"## Linux Quick Reference" H2 not found' };
      const modeTagPattern = /\[(BYOD|ZTE|AOSP|Knox|All GMS|22\.04|24\.04|Mode)\]/;
      const m = region.match(modeTagPattern);
      if (m) return { pass: false, detail: 'Mode tag "' + m[0] + '" found in Linux H2 body -- D-25 mode-tag-free contract violated' };
      return { pass: true, detail: 'no Mode tag literals in Linux H2 body of quick-ref-l1.md (D-25 PASS)' };
    }
  },
  {
    id: 27, name: 'V-59-27: quick-ref-l1.md Linux Decision Tree H3 contains exactly 1 link to decision-trees/09-linux-triage.md',
    run() {
      const c = readFile(QUICK_REF_L1_MD);
      if (c === null) return { pass: false, detail: 'File missing: ' + QUICK_REF_L1_MD };
      const h2Region = sliceH2Region(c, '## Linux Quick Reference');
      if (!h2Region) return { pass: false, detail: '"## Linux Quick Reference" H2 not found' };
      const h3Region = sliceH3InRegion(h2Region, '### Linux Decision Tree');
      if (!h3Region) return { pass: false, detail: '"### Linux Decision Tree" H3 not found in Linux H2 region' };
      const matches = h3Region.match(/decision-trees\/09-linux-triage\.md/g) || [];
      if (matches.length !== 1) {
        return { pass: false, detail: 'Linux Decision Tree H3 has ' + matches.length + ' links to 09-linux-triage.md, expected exactly 1' };
      }
      return { pass: true, detail: 'exactly 1 link to decision-trees/09-linux-triage.md in Linux Decision Tree H3' };
    }
  },

  // ============================================================
  // V-59-28..31: quick-ref-l2.md LINUX H2 (GA-4 L2)
  // ============================================================

  {
    id: 28, name: 'V-59-28: quick-ref-l2.md has "## Linux Quick Reference" H2 + 4 sub-H3 anchors',
    run() {
      const c = readFile(QUICK_REF_L2_MD);
      if (c === null) return { pass: false, detail: 'File missing: ' + QUICK_REF_L2_MD };
      const region = sliceH2Region(c, '## Linux Quick Reference');
      if (!region) return { pass: false, detail: '"## Linux Quick Reference" H2 not found in quick-ref-l2.md' };

      const h3s = [
        '### Linux Diagnostic Data Collection (3 methods)',
        '### Key Intune Portal Paths (Linux L2)',
        '### Linux Compliance Category Reference',
        '### Linux Investigation Runbooks',
      ];
      const missing = h3s.filter(h => !region.includes(h));
      if (missing.length) return { pass: false, detail: 'Missing L2 Linux sub-H3(s): ' + missing.join(', ') };
      return { pass: true, detail: '"## Linux Quick Reference" H2 found with all 4 sub-H3 anchors in quick-ref-l2.md' };
    }
  },
  {
    id: 29, name: 'V-59-29: quick-ref-l2.md 3-method H3 body contains journalctl AND File-based AND Package-state literals',
    run() {
      const c = readFile(QUICK_REF_L2_MD);
      if (c === null) return { pass: false, detail: 'File missing: ' + QUICK_REF_L2_MD };
      const h2Region = sliceH2Region(c, '## Linux Quick Reference');
      if (!h2Region) return { pass: false, detail: '"## Linux Quick Reference" H2 not found' };
      const h3Region = sliceH3InRegion(h2Region, '### Linux Diagnostic Data Collection (3 methods)');
      if (!h3Region) return { pass: false, detail: '"### Linux Diagnostic Data Collection (3 methods)" H3 not found' };
      const errors = [];
      if (!h3Region.includes('journalctl'))    errors.push('"journalctl" literal missing');
      if (!h3Region.includes('File-based'))    errors.push('"File-based" literal missing');
      if (!h3Region.includes('Package-state')) errors.push('"Package-state" literal missing');
      if (errors.length) return { pass: false, detail: errors.join(' | ') };
      return { pass: true, detail: 'all 3 method literals present in Linux Diagnostic Data Collection H3' };
    }
  },
  {
    id: 30, name: 'V-59-30: quick-ref-l2.md Linux Compliance Category Reference H3 has 4 category literals + 4 cross-links to admin-setup-linux/03-compliance-policy.md',
    run() {
      const c = readFile(QUICK_REF_L2_MD);
      if (c === null) return { pass: false, detail: 'File missing: ' + QUICK_REF_L2_MD };
      const h2Region = sliceH2Region(c, '## Linux Quick Reference');
      if (!h2Region) return { pass: false, detail: '"## Linux Quick Reference" H2 not found' };
      const h3Region = sliceH3InRegion(h2Region, '### Linux Compliance Category Reference');
      if (!h3Region) return { pass: false, detail: '"### Linux Compliance Category Reference" H3 not found' };

      const categories = ['Allowed Distributions', 'Custom Compliance', 'Device Encryption', 'Password Policy'];
      const missingCats = categories.filter(cat => !h3Region.includes(cat));
      if (missingCats.length) return { pass: false, detail: 'Missing category literals: ' + missingCats.join(', ') };

      // Check 4 cross-links to admin-setup-linux/03-compliance-policy.md
      const crossLinks = (h3Region.match(/admin-setup-linux\/03-compliance-policy\.md/g) || []).length;
      if (crossLinks < 4) {
        return { pass: false, detail: 'Only ' + crossLinks + ' cross-links to admin-setup-linux/03-compliance-policy.md found, expected 4' };
      }

      return { pass: true, detail: 'all 4 category literals + 4 cross-links to 03-compliance-policy.md present' };
    }
  },
  {
    id: 31, name: 'V-59-31: NEGATIVE -- quick-ref-l2.md Linux Compliance Category Reference H3 does NOT contain Bash script syntax or compliance-evaluation-cadence',
    run() {
      const c = readFile(QUICK_REF_L2_MD);
      if (c === null) return { pass: false, detail: 'File missing: ' + QUICK_REF_L2_MD };
      const h2Region = sliceH2Region(c, '## Linux Quick Reference');
      if (!h2Region) return { pass: false, detail: '"## Linux Quick Reference" H2 not found' };
      const h3Region = sliceH3InRegion(h2Region, '### Linux Compliance Category Reference');
      if (!h3Region) return { pass: false, detail: '"### Linux Compliance Category Reference" H3 not found' };

      const violations = [];
      if (/\bif\b.*\bthen\b|\bfi\b|exit 0|exit 1|#!\/bin\/bash/.test(h3Region)) violations.push('Bash script syntax found (if/then/fi/exit/shebang)');
      if (/compliance-evaluation-cadence/.test(h3Region)) violations.push('"compliance-evaluation-cadence" literal found');

      if (violations.length) return { pass: false, detail: violations.join(' | ') + ' -- D-24 PITFALL-7 firewall violated' };
      return { pass: true, detail: 'no Bash syntax or compliance-evaluation-cadence in Linux Compliance Category Reference H3 (PITFALL-7 PASS)' };
    }
  },

  // ============================================================
  // V-59-32: iOS/macOS/Windows/Android H2 ANCHOR STABILITY (regression-guard)
  // ============================================================

  {
    id: 32, name: 'V-59-32: NEGATIVE regression-guard -- existing H2 literals preserved across 4 hub files (iOS/macOS/Windows/Android + quick-ref siblings)',
    run() {
      // D-30: verbatim anchor strings from 59-ANCHOR-INVENTORY.md pre-edit baseline
      const stableAnchors = [
        // docs/index.md
        [INDEX_MD, '## Windows Autopilot'],
        [INDEX_MD, '## macOS Provisioning'],
        [INDEX_MD, '## iOS/iPadOS Provisioning'],
        [INDEX_MD, '## Android Enterprise Provisioning'],
        [INDEX_MD, '## Choose Your Platform'],
        [INDEX_MD, '## Cross-Platform References'],
        // quick-ref-l1.md siblings
        [QUICK_REF_L1_MD, '## Top 5 Checks'],
        [QUICK_REF_L1_MD, '## APv2 Quick Reference'],
        [QUICK_REF_L1_MD, '## macOS ADE Quick Reference'],
        [QUICK_REF_L1_MD, '## iOS/iPadOS Quick Reference'],
        [QUICK_REF_L1_MD, '## Android Enterprise Quick Reference'],
        // quick-ref-l2.md siblings
        [QUICK_REF_L2_MD, '## Log Collection'],
        [QUICK_REF_L2_MD, '## APv2 Quick Reference'],
        [QUICK_REF_L2_MD, '## macOS ADE Quick Reference'],
        [QUICK_REF_L2_MD, '## iOS/iPadOS Quick Reference'],
        [QUICK_REF_L2_MD, '## Android Enterprise Quick Reference'],
      ];
      const failures = [];
      const fileCache = {};
      for (const [filePath, h2Literal] of stableAnchors) {
        if (!fileCache[filePath]) fileCache[filePath] = readFile(filePath);
        const c = fileCache[filePath];
        if (c === null) { failures.push(filePath + ': file missing'); continue; }
        const re = new RegExp('^' + escapeRegex(h2Literal) + '\\s*$', 'm');
        if (!re.test(c)) {
          failures.push(basename(filePath) + ': "' + h2Literal + '" missing (anchor regression)');
        }
      }
      if (failures.length) return { pass: false, detail: failures.slice(0, 8).join(' | ') + (failures.length > 8 ? ' (+ ' + (failures.length - 8) + ' more)' : '') };
      return { pass: true, detail: 'all ' + stableAnchors.length + ' pre-Phase-59 H2 anchors preserved across 4 hub files (regression-guard PASS)' };
    }
  },

  // ============================================================
  // V-59-33..36: TBD/TODO/FIXME/PLACEHOLDER scan (all 8 hub-and-glossary files)
  // Note: plan groups these as 4 assertions (V-59-33..36) mapped one-per-file-group
  // Implementation: single loop with 4 separate checks (33=hub files, 34=win+macos, 35=android+linux, 36=ops-index)
  // ============================================================

  {
    id: 33, name: 'V-59-33: NEGATIVE -- no TBD/TODO/FIXME/XXX/PLACEHOLDER tokens in docs/index.md or docs/quick-ref-l1.md (outside Version History)',
    run() {
      const re = /\b(TBD|TODO|FIXME|XXX|PLACEHOLDER)\b/;
      const failures = [];
      for (const f of [INDEX_MD, QUICK_REF_L1_MD]) {
        const c = readFile(f);
        if (c === null) continue;
        const stripped = stripCodeAndHistory(c);
        if (re.test(stripped)) {
          const m = stripped.match(re);
          failures.push(f + ': "' + m[1] + '" found');
        }
      }
      if (failures.length) return { pass: false, detail: failures.join(' | ') };
      return { pass: true, detail: 'no TBD/TODO tokens in docs/index.md or quick-ref-l1.md (outside Version History)' };
    }
  },
  {
    id: 34, name: 'V-59-34: NEGATIVE -- no TBD/TODO/FIXME/XXX/PLACEHOLDER tokens in docs/quick-ref-l2.md or docs/operations/00-index.md (outside Version History)',
    run() {
      const re = /\b(TBD|TODO|FIXME|XXX|PLACEHOLDER)\b/;
      const failures = [];
      for (const f of [QUICK_REF_L2_MD, OPS_INDEX_MD]) {
        const c = readFile(f);
        if (c === null) continue;
        const stripped = stripCodeAndHistory(c);
        if (re.test(stripped)) {
          const m = stripped.match(re);
          failures.push(f + ': "' + m[1] + '" found');
        }
      }
      if (failures.length) return { pass: false, detail: failures.join(' | ') };
      return { pass: true, detail: 'no TBD/TODO tokens in quick-ref-l2.md or ops/00-index.md (outside Version History)' };
    }
  },
  {
    id: 35, name: 'V-59-35: NEGATIVE -- no TBD/TODO/FIXME/XXX/PLACEHOLDER tokens in docs/_glossary.md or docs/_glossary-macos.md (outside Version History)',
    run() {
      const re = /\b(TBD|TODO|FIXME|XXX|PLACEHOLDER)\b/;
      const failures = [];
      for (const f of [GLOSSARY_WIN, GLOSSARY_MACOS]) {
        const c = readFile(f);
        if (c === null) continue;
        const stripped = stripCodeAndHistory(c);
        if (re.test(stripped)) {
          const m = stripped.match(re);
          failures.push(f + ': "' + m[1] + '" found');
        }
      }
      if (failures.length) return { pass: false, detail: failures.join(' | ') };
      return { pass: true, detail: 'no TBD/TODO tokens in _glossary.md or _glossary-macos.md (outside Version History)' };
    }
  },
  {
    id: 36, name: 'V-59-36: NEGATIVE -- no TBD/TODO/FIXME/XXX/PLACEHOLDER tokens in docs/_glossary-android.md or docs/_glossary-linux.md (outside Version History)',
    run() {
      const re = /\b(TBD|TODO|FIXME|XXX|PLACEHOLDER)\b/;
      const failures = [];
      for (const f of [GLOSSARY_AND, GLOSSARY_LIN]) {
        const c = readFile(f);
        if (c === null) continue;
        const stripped = stripCodeAndHistory(c);
        if (re.test(stripped)) {
          const m = stripped.match(re);
          failures.push(f + ': "' + m[1] + '" found');
        }
      }
      if (failures.length) return { pass: false, detail: failures.join(' | ') };
      return { pass: true, detail: 'no TBD/TODO tokens in _glossary-android.md or _glossary-linux.md (outside Version History)' };
    }
  },
];

// ============================================================
// RUNNER LOOP (mirrors check-phase-58.mjs runner pattern)
// ============================================================

const LABEL_WIDTH = 80;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;

for (const check of checks) {
  let result;
  try { result = check.run(); } catch (e) { result = { pass: false, detail: 'Unexpected error: ' + e.message }; }
  const prefix = '[' + check.id + '/' + checks.length + '] ' + check.name;
  if (result.skipped) {
    skipped++;
    process.stdout.write(padLabel(prefix) + 'SKIPPED -- ' + (result.detail || '') + '\n');
  } else if (result.pass) {
    passed++;
    process.stdout.write(padLabel(prefix) + 'PASS' + (VERBOSE && result.detail ? ' -- ' + result.detail : '') + '\n');
  } else {
    failed++;
    process.stdout.write(padLabel(prefix) + 'FAIL -- ' + result.detail + '\n');
  }
}

process.stdout.write('\nSummary: ' + passed + ' passed, ' + failed + ' failed, ' + skipped + ' skipped\n');
process.exit(failed > 0 ? 1 : 0);
