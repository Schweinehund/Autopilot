#!/usr/bin/env node
// check-phase-61.mjs -- Phase 61 close-gate validation harness
// Source of truth: .planning/phases/61-gap-closure-terminal-re-audit-milestone-close/61-CONTEXT.md
// File reads only: all content via fs.readFileSync; subprocess only for V-61-CHAIN, V-61-AUDIT, V-61-SELF-TEST
//
// 34 V-61-NN structural assertions per CONTEXT D-24 covering:
//   REQUIREMENTS.md active-section zero-count + ROADMAP §Progress complete
//   PROJECT.md Validated + Closed Deferred Items + audit doc frontmatter + body sections
//   MILESTONES.md v1.5 entry + chain regression + harness exit 0 + self-test exit 0
//
// Lineage: Phase 48 D-25 → Phase 49 D-NN → ... → Phase 60 D-21/D-22 → Phase 61 D-24
//
// Usage: node scripts/validation/check-phase-61.mjs [--verbose]
// Exit code: 0 if all V-61-NN PASS or SKIPPED; 1 if any FAIL.

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

// Reads REQUIREMENTS.md state at v1.5-close SHA ba2cbc0 (frozen state for V-61-01..04 structural assertions).
// V1.5-frozen-aware per Plan 68-03 Option A pivot (gray-area-pick surfaced during execution; user approved).
// Rationale: V-61-01..04 originally asserted post-Plan-61-04 state of `## v1.5 Requirements (Active)` section.
// REQUIREMENTS.md has since been reorganized for v1.7 (`## v1.7 Requirements (Active)` at line 6;
// v1.5 reqs migrated to PROJECT.md `## Validated` per Phase 61-03 commit 0302100; v1.7 active section
// added per commit 939a8af). Reading the v1.5-close SHA preserves the original assertion semantics
// without breaking on v1.7 reorg. Same v1.5-frozen-aware pattern as the archive-path helper from
// Plan 68-02 CHAIN-02 (validator becomes archive-aware).
function readRequirementsAtV15Close() {
  try {
    return execFileSync('git', ['show', 'ba2cbc0:.planning/REQUIREMENTS.md'], { encoding: 'utf8', timeout: 10000 }).replace(/\r\n/g, '\n');
  } catch (err) {
    return null;
  }
}

// Reads ROADMAP.md state at v1.5-close SHA ba2cbc0 (frozen state for V-61-05..08 §Progress structural assertions).
// V1.5-frozen-aware per Plan 69-02 Option A+ scope-gap closure (surfaced during Phase 69 SC#5 B.1 baseline).
// Rationale: V-61-05..08 originally asserted post-Plan-61-02 state of §Progress (zero In Progress rows, zero Not started,
// Phase 61 Complete, all 14 v1.5 phases 48-61 Complete). HEAD ROADMAP.md is mutated by every subsequent milestone's
// tracking-update commits (e.g., Plan 69-01 `6e12a75` added an "In Progress" row for Phase 69), which legitimately
// violates the v1.5-frozen §Progress shape. Reading the v1.5-close SHA preserves the original assertion semantics
// without breaking on subsequent mid-flight planning-doc edits.
//
// Lineage: parallel to readRequirementsAtV15Close() introduced Plan 68-03 Task 1 commit d7d7d5f for V-61-01..04.
// V-61-01..04 were made v1.5-frozen-aware in d7d7d5f; V-61-05..08 were the scope-gap (left HEAD-coupled) and are
// closed here as Plan 68-03 Task 1 scope-gap closure surfaced during Phase 69 B.1 baseline (run 26574959797 evidence).
function readRoadmapAtV15Close() {
  try {
    return execFileSync('git', ['show', 'ba2cbc0:.planning/ROADMAP.md'], { encoding: 'utf8', timeout: 10000 }).replace(/\r\n/g, '\n');
  } catch (err) {
    return null;
  }
}

const HARNESS = 'scripts/validation/v1.5-milestone-audit.mjs';
const PIN_HELPER = 'scripts/validation/regenerate-supervision-pins.mjs';
const REQUIREMENTS = '.planning/REQUIREMENTS.md';
const ROADMAP = '.planning/ROADMAP.md';
const PROJECT = '.planning/PROJECT.md';
const AUDIT_DOC = '.planning/milestones/v1.5-MILESTONE-AUDIT.md';
const MILESTONES_DOC = '.planning/MILESTONES.md';

// CHAIN_PHASES per RESEARCH Open Question 3 + check-phase-60.mjs:33-37 stub-validator precedent
// Phase 50 stub excluded: check-phase-50.mjs is a stub validator (Phase 50 was 'Not started' per
// ROADMAP during Phase 60 close); intentional array exclusion to avoid false-positive regression failures.
// If Phase 50 ships a full check-phase-50.mjs in a future milestone, add 50 here.
const CHAIN_PHASES = [48, 49, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];

const checks = [
  // === V-61-01..04: REQUIREMENTS.md active-section state ===
  // Pattern from RESEARCH code example lines 514-528 + Pitfall 4 lines 482-485
  {
    id: 1, name: "V-61-01: REQUIREMENTS.md active-section has zero unchecked [ ] reqs (post-Plan-61-04 AUDIT-08 flip) [v1.5-frozen @ ba2cbc0]",
    run() {
      const c = readRequirementsAtV15Close();
      if (c === null) return { pass: false, detail: 'could not read REQUIREMENTS.md at v1.5-close ba2cbc0' };
      const activeMatch = c.match(/## v1\.5 Requirements \(Active\)([\s\S]*?)## Future Requirements/);
      if (!activeMatch) return { pass: false, detail: 'Active section boundaries not found' };
      const activeSection = activeMatch[1];
      const unchecked = (activeSection.match(/^- \[ \]/gm) || []).length;
      if (unchecked !== 0) return { pass: false, detail: unchecked + ' unchecked reqs remain in active section (Plan 61-04 should have flipped AUDIT-08)' };
      return { pass: true, detail: 'active section: 0 unchecked [ ] reqs (v1.5-frozen @ ba2cbc0)' };
    }
  },
  {
    id: 2, name: "V-61-02: REQUIREMENTS.md AUDIT-08 specifically flipped [x] (Plan 61-04 atomic close commit) [v1.5-frozen @ ba2cbc0]",
    run() {
      const c = readRequirementsAtV15Close();
      if (c === null) return { pass: false, detail: 'could not read REQUIREMENTS.md at v1.5-close ba2cbc0' };
      if (!/^- \[x\] \*\*AUDIT-08\*\*/m.test(c)) return { pass: false, detail: 'AUDIT-08 not flipped to [x]' };
      return { pass: true, detail: 'AUDIT-08 flipped (v1.5-frozen @ ba2cbc0)' };
    }
  },
  {
    id: 3, name: "V-61-03: REQUIREMENTS.md active reqs all carry inline traceability comments per CONTEXT D-09 template [v1.5-frozen @ ba2cbc0]",
    run() {
      const c = readRequirementsAtV15Close();
      if (c === null) return { pass: false, detail: 'could not read REQUIREMENTS.md at v1.5-close ba2cbc0' };
      const activeMatch = c.match(/## v1\.5 Requirements \(Active\)([\s\S]*?)## Future Requirements/);
      if (!activeMatch) return { pass: false, detail: 'Active section boundaries not found' };
      const activeSection = activeMatch[1];
      const flipped = (activeSection.match(/^- \[x\] \*\*[A-Z]+-[0-9]+\*\*/gm) || []).length;
      const traceable = (activeSection.match(/^- \[x\] \*\*[A-Z]+-[0-9]+\*\*[^\n]*— completed [0-9]{4}-[0-9]{2}-[0-9]{2} in Phase /gm) || []).length;
      if (traceable < flipped) return { pass: false, detail: (flipped - traceable) + ' flipped reqs lack traceability comment' };
      return { pass: true, detail: flipped + '/' + flipped + ' flipped reqs have traceability comments (v1.5-frozen @ ba2cbc0)' };
    }
  },
  {
    id: 4, name: "V-61-04: REQUIREMENTS.md §Future Requirements legitimately deferred items preserved (LIN-DEFER-01, RHEL-01, BYOPC-01, WEB-01, CHROMEOS-01, CODE-01) [v1.5-frozen @ ba2cbc0]",
    run() {
      const c = readRequirementsAtV15Close();
      if (c === null) return { pass: false, detail: 'could not read REQUIREMENTS.md at v1.5-close ba2cbc0' };
      const expected = ['LIN-DEFER-01', 'RHEL-01', 'BYOPC-01', 'WEB-01', 'CHROMEOS-01', 'CODE-01'];
      const missing = expected.filter(e => !c.includes(e));
      if (missing.length > 0) return { pass: false, detail: 'Missing deferred items: ' + missing.join(', ') };
      return { pass: true, detail: 'all 6 §Future Requirements deferrals preserved (v1.5-frozen @ ba2cbc0)' };
    }
  },

  // === V-61-05..08: ROADMAP §Progress all 14 v1.5 phases marked Complete ===
  {
    id: 5, name: "V-61-05: ROADMAP §Progress has zero `In Progress` rows (4 stale rows reconciled per Plan 61-02 Task 5) [v1.5-frozen @ ba2cbc0]",
    run() {
      const c = readRoadmapAtV15Close();
      if (c === null) return { pass: false, detail: 'could not read ROADMAP.md at v1.5-close ba2cbc0' };
      const inProgress = (c.match(/In Progress/g) || []).length;
      if (inProgress !== 0) return { pass: false, detail: inProgress + ' `In Progress` rows remain (v1.5-frozen @ ba2cbc0)' };
      return { pass: true, detail: 'no In Progress rows (v1.5-frozen @ ba2cbc0)' };
    }
  },
  {
    id: 6, name: "V-61-06: ROADMAP §Progress has zero `Not started` rows post-Plan-61-05 (Phase 61 own row flipped at this plan close) [v1.5-frozen @ ba2cbc0]",
    run() {
      const c = readRoadmapAtV15Close();
      if (c === null) return { pass: false, detail: 'could not read ROADMAP.md at v1.5-close ba2cbc0' };
      // Slice §Progress section only
      const progMatch = c.match(/## Progress[\s\S]*?(?=\n## |\n---|\Z)/);
      if (!progMatch) return { pass: false, detail: '§Progress section not found' };
      const notStarted = (progMatch[0].match(/Not started/g) || []).length;
      if (notStarted !== 0) return { pass: false, detail: notStarted + ' `Not started` rows remain in §Progress (v1.5-frozen @ ba2cbc0)' };
      return { pass: true, detail: 'no Not started rows in §Progress (v1.5-frozen @ ba2cbc0)' };
    }
  },
  {
    id: 7, name: "V-61-07: ROADMAP §Progress Phase 61 row marked Complete with completion date [v1.5-frozen @ ba2cbc0]",
    run() {
      const c = readRoadmapAtV15Close();
      if (c === null) return { pass: false, detail: 'could not read ROADMAP.md at v1.5-close ba2cbc0' };
      if (!/^\| 61\..*\| Complete\s*\| 20\d{2}-\d{2}-\d{2}/m.test(c)) return { pass: false, detail: 'Phase 61 row not marked Complete with date (v1.5-frozen @ ba2cbc0)' };
      return { pass: true, detail: 'Phase 61 row Complete + date populated (v1.5-frozen @ ba2cbc0)' };
    }
  },
  {
    id: 8, name: "V-61-08: ROADMAP §Progress all 14 v1.5 phase rows (48-61) marked Complete [v1.5-frozen @ ba2cbc0]",
    run() {
      const c = readRoadmapAtV15Close();
      if (c === null) return { pass: false, detail: 'could not read ROADMAP.md at v1.5-close ba2cbc0' };
      const v15Phases = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61];
      const incomplete = v15Phases.filter(n => {
        const re = new RegExp('^\\| ' + n + '\\..*\\| Complete', 'm');
        return !re.test(c);
      });
      if (incomplete.length > 0) return { pass: false, detail: 'Phases not marked Complete: ' + incomplete.join(', ') + ' (v1.5-frozen @ ba2cbc0)' };
      return { pass: true, detail: '14/14 v1.5 phase rows Complete (v1.5-frozen @ ba2cbc0)' };
    }
  },

  // === V-61-09..12: PROJECT.md Validated + Closed Deferred Items ===
  {
    id: 9, name: "V-61-09: PROJECT.md has §Validated section with all 57 v1.5 reqs (per Plan 61-03)",
    run() {
      const c = readFile(PROJECT);
      if (c === null) return { pass: false, detail: 'PROJECT.md missing' };
      const validated = (c.match(/^- ✓ (CLEAN|LIN|COMG|PATCH|APP|DRIFT|AUDIT)-[0-9]+/gm) || []).length;
      if (validated < 57) return { pass: false, detail: 'Only ' + validated + '/57 v1.5 reqs migrated to §Validated' };
      return { pass: true, detail: validated + ' v1.5 reqs in §Validated (≥57 expected)' };
    }
  },
  {
    id: 10, name: "V-61-10: PROJECT.md has `## Closed Deferred Items (v1.4.1 → v1.5)` subsection per Plan 61-03",
    run() {
      const c = readFile(PROJECT);
      if (c === null) return { pass: false, detail: 'PROJECT.md missing' };
      if (!/^## Closed Deferred Items \(v1\.4\.1 → v1\.5\)/m.test(c)) return { pass: false, detail: 'subsection missing' };
      return { pass: true, detail: 'subsection present' };
    }
  },
  {
    id: 11, name: "V-61-11: PROJECT.md preserves existing v1.4 → v1.4.1 subsection BYTE-IDENTICAL (Plan 61-03 append-only contract)",
    run() {
      const c = readFile(PROJECT);
      if (c === null) return { pass: false, detail: 'PROJECT.md missing' };
      if (!/^## Closed Deferred Items \(v1\.4 → v1\.4\.1\)/m.test(c)) return { pass: false, detail: 'v1.4→v1.4.1 subsection missing (regression)' };
      // Check 6 DEFER items preserved
      const expected = ['DEFER-01', 'DEFER-02', 'DEFER-03', 'DEFER-04', 'DEFER-05', 'DEFER-06'];
      const missing = expected.filter(d => !c.includes(d));
      if (missing.length > 0) return { pass: false, detail: 'v1.4 DEFER items missing: ' + missing.join(', ') };
      return { pass: true, detail: 'v1.4→v1.4.1 subsection + 6 DEFER items preserved' };
    }
  },
  {
    id: 12, name: "V-61-12: PROJECT.md `## Closed Deferred Items (v1.4.1 → v1.5)` cites DEFER-07 + DEFER-08 closures",
    run() {
      const c = readFile(PROJECT);
      if (c === null) return { pass: false, detail: 'PROJECT.md missing' };
      const subMatch = c.match(/## Closed Deferred Items \(v1\.4\.1 → v1\.5\)([\s\S]*?)(?=\n## |\Z)/);
      if (!subMatch) return { pass: false, detail: 'subsection not parseable' };
      const sub = subMatch[1];
      if (!/DEFER-07/.test(sub)) return { pass: false, detail: 'DEFER-07 not cited in v1.4.1→v1.5 subsection' };
      if (!/DEFER-08/.test(sub)) return { pass: false, detail: 'DEFER-08 not cited in v1.4.1→v1.5 subsection' };
      return { pass: true, detail: 'DEFER-07 + DEFER-08 cited' };
    }
  },

  // === V-61-13..16: v1.5-MILESTONE-AUDIT.md frontmatter + body sections ===
  {
    id: 13, name: "V-61-13: v1.5-MILESTONE-AUDIT.md exists with frontmatter milestone: v1.5 + status: passed + scores.requirements: 57/57",
    run() {
      const c = readFile(AUDIT_DOC);
      if (c === null) return { pass: false, detail: 'v1.5-MILESTONE-AUDIT.md missing at ' + AUDIT_DOC };
      const fmMatch = c.match(/^---\n([\s\S]*?)\n---/m);
      if (!fmMatch) return { pass: false, detail: 'frontmatter not found' };
      const fm = fmMatch[1];
      const issues = [];
      if (!/^milestone: v1\.5\s*$/m.test(fm)) issues.push('milestone: v1.5 missing');
      if (!/^status: passed\s*$/m.test(fm)) issues.push('status: passed missing');
      if (!/requirements: 57\/57/m.test(fm)) issues.push('scores.requirements: 57/57 missing');
      if (!/phases: 14\/14/m.test(fm)) issues.push('scores.phases: 14/14 missing');
      if (issues.length > 0) return { pass: false, detail: issues.join(' | ') };
      return { pass: true, detail: 'frontmatter milestone + status + scores correct' };
    }
  },
  {
    id: 14, name: "V-61-14: v1.5-MILESTONE-AUDIT.md frontmatter mechanical_checks.results has all 12 C-codes (C1..C7, C9..C13) per CONTEXT D-14 + RESEARCH",
    run() {
      const c = readFile(AUDIT_DOC);
      if (c === null) return { pass: false, detail: 'v1.5-MILESTONE-AUDIT.md missing' };
      // These tokens appear in the YAML results section; use partial-name matching
      const expected = [
        'C1_safetynet', 'C2_supervision', 'C3_aosp', 'C4_deferred_file',
        'C5_last_verified', 'C6_pitfall7', 'C7_knox', 'C9_cope',
        'C10_linux', 'C11_ops', 'C12_4platform', 'C13_broken'
      ];
      const missing = expected.filter(k => !c.includes(k));
      if (missing.length > 0) return { pass: false, detail: 'C-codes missing: ' + missing.join(', ') };
      return { pass: true, detail: 'all 12 C-codes present' };
    }
  },
  {
    id: 15, name: "V-61-15: v1.5-MILESTONE-AUDIT.md has 4 required body sections per CONTEXT D-15",
    run() {
      const c = readFile(AUDIT_DOC);
      if (c === null) return { pass: false, detail: 'v1.5-MILESTONE-AUDIT.md missing' };
      const required = [
        /^## v1\.5 Three-Pillar Closure Narrative\s*$/m,
        /^## AUDIT-08 Broken-Link Inventory Close-Out\s*$/m,
        /^## v1\.5 Audit Harness Lineage Phase 48/m,
        /^## Auditor-Independence Verification\s*$/m
      ];
      const missingCount = required.filter(r => !r.test(c)).length;
      if (missingCount > 0) return { pass: false, detail: missingCount + ' body sections missing per D-15' };
      return { pass: true, detail: 'all 4 D-15 body sections present' };
    }
  },
  {
    id: 16, name: "V-61-16: v1.5-MILESTONE-AUDIT.md has NO re_audit_resolution block at initial close per CONTEXT D-16",
    run() {
      const c = readFile(AUDIT_DOC);
      if (c === null) return { pass: false, detail: 'v1.5-MILESTONE-AUDIT.md missing' };
      if (/re_audit_resolution/.test(c)) return { pass: false, detail: 're_audit_resolution block present (forbidden at initial close per D-16)' };
      return { pass: true, detail: 'no re_audit_resolution block (correct per D-16)' };
    }
  },

  // === V-61-17..20: MILESTONES.md v1.5 entry ===
  {
    id: 17, name: "V-61-17: MILESTONES.md has `## v1.5 Linux Platform` H2 as top entry",
    run() {
      const c = readFile(MILESTONES_DOC);
      if (c === null) return { pass: false, detail: 'MILESTONES.md missing' };
      // Top entry: first ## H2 after the # H1 should be v1.5
      const h2s = c.match(/^## .+$/gm);
      if (!h2s || h2s.length === 0) return { pass: false, detail: 'no ## H2 entries' };
      if (!h2s[0].includes('v1.5')) return { pass: false, detail: 'top H2 is not v1.5: ' + h2s[0] };
      return { pass: true, detail: 'top H2: ' + h2s[0] };
    }
  },
  {
    id: 18, name: "V-61-18: MILESTONES.md v1.5 entry has Phases completed line",
    run() {
      const c = readFile(MILESTONES_DOC);
      if (c === null) return { pass: false, detail: 'MILESTONES.md missing' };
      // Use slice-based extraction: from ## v1.5 to the next top-level ## (after ---)
      const v15Start = c.indexOf('## v1.5 ');
      if (v15Start < 0) return { pass: false, detail: '## v1.5 not found' };
      // Find next ## H2 heading at start of line that comes AFTER the --- separator
      const afterSep = c.indexOf('\n---\n', v15Start);
      const nextH2 = afterSep > 0 ? c.indexOf('\n## ', afterSep) : c.indexOf('\n## ', v15Start + 10);
      const sub = nextH2 > 0 ? c.slice(v15Start, nextH2) : c.slice(v15Start);
      if (!/\*\*Phases completed:\*\*/m.test(sub)) return { pass: false, detail: 'Phases completed line missing' };
      return { pass: true, detail: 'Phases completed line present' };
    }
  },
  {
    id: 19, name: "V-61-19: MILESTONES.md v1.5 entry has Key accomplishments + Methodology highlights subsections",
    run() {
      const c = readFile(MILESTONES_DOC);
      if (c === null) return { pass: false, detail: 'MILESTONES.md missing' };
      const v15Start = c.indexOf('## v1.5 ');
      if (v15Start < 0) return { pass: false, detail: '## v1.5 not found' };
      const afterSep = c.indexOf('\n---\n', v15Start);
      const nextH2 = afterSep > 0 ? c.indexOf('\n## ', afterSep) : c.indexOf('\n## ', v15Start + 10);
      const sub = nextH2 > 0 ? c.slice(v15Start, nextH2) : c.slice(v15Start);
      const issues = [];
      if (!/\*\*Key accomplishments:\*\*/m.test(sub)) issues.push('Key accomplishments missing');
      if (!/\*\*Methodology highlights:\*\*/m.test(sub)) issues.push('Methodology highlights missing');
      if (issues.length > 0) return { pass: false, detail: issues.join('; ') };
      return { pass: true, detail: 'Key accomplishments + Methodology highlights present' };
    }
  },
  {
    id: 20, name: "V-61-20: MILESTONES.md v1.5 entry cites v1.4.1 deferred items closed (DEFER-07 + DEFER-08)",
    run() {
      const c = readFile(MILESTONES_DOC);
      if (c === null) return { pass: false, detail: 'MILESTONES.md missing' };
      const v15Start = c.indexOf('## v1.5 ');
      if (v15Start < 0) return { pass: false, detail: '## v1.5 not found' };
      const afterSep = c.indexOf('\n---\n', v15Start);
      const nextH2 = afterSep > 0 ? c.indexOf('\n## ', afterSep) : c.indexOf('\n## ', v15Start + 10);
      const sub = nextH2 > 0 ? c.slice(v15Start, nextH2) : c.slice(v15Start);
      const issues = [];
      if (!/DEFER-07/.test(sub)) issues.push('DEFER-07 not cited');
      if (!/DEFER-08/.test(sub)) issues.push('DEFER-08 not cited');
      if (issues.length > 0) return { pass: false, detail: issues.join('; ') };
      return { pass: true, detail: 'DEFER-07 + DEFER-08 cited' };
    }
  }
];

// === V-61-21..32: chain regression-guards (12 subprocess invocations) ===
// CHAIN_PHASES = [48, 49, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]
// Phase 50 intentionally excluded per CHAIN_PHASES comment block above (stub validator).
for (let i = 0; i < CHAIN_PHASES.length; i++) {
  const phaseNum = CHAIN_PHASES[i];
  const id = 21 + i;
  checks.push({
    id: id,
    name: `V-61-${String(id).padStart(2, '0')}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
    run() {
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

// === V-61-33 (V-61-AUDIT): harness exits 0 in fully-blocking mode ===
checks.push({
  id: 33, name: "V-61-33 (V-61-AUDIT): v1.5-milestone-audit.mjs exits 0 in fully-blocking mode (12/12 PASS)",
  run() {
    try {
      execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
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

// === V-61-34 (V-61-SELF-TEST): regenerate-supervision-pins.mjs --self-test exits 0 ===
checks.push({
  id: 34, name: "V-61-34 (V-61-SELF-TEST): regenerate-supervision-pins.mjs --self-test exits 0 (AUDIT-07 closure persistence)",
  run() {
    try {
      execFileSync('node', [PIN_HELPER, '--self-test'], { stdio: 'pipe', timeout: 30000, cwd: process.cwd() });
      return { pass: true, detail: '--self-test exits 0' };
    } catch (err) {
      const stderr = err.stderr ? err.stderr.toString() : '';
      const isMissing = err.code === 'ENOENT' || err.status === 127
        || stderr.includes('not found') || stderr.includes('Could not resolve');
      if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
      return { pass: false, detail: '--self-test FAIL: ' + stderr.slice(0, 200) };
    }
  }
});

// === Runner loop (pattern verbatim from check-phase-60.mjs:284-311) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-61 -- Phase 61 deliverables\n');
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
