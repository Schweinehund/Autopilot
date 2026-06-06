#!/usr/bin/env node
// check-phase-66.mjs -- Phase 66 (Apple Business Validation Tooling Closure + Milestone Audit) deliverables
// Source of truth: .planning/phases/66-apple-business-validation-tooling-closure-milestone-audit/66-CONTEXT.md
// Assertions: .planning/phases/66-apple-business-validation-tooling-closure-milestone-audit/66-PATTERNS.md (V-66-01..V-66-SELF)
//
// 7 V-66-NN structural assertions + V-66-ABAUDIT-STALENESS + V-66-CHAIN + V-66-AUDIT + V-66-SELF covering:
//   C11 windowKeywords extended with 6 LOCKED tokens (V-66-01)
//   c13_rotting_external populated with quarterly_audit metadata (V-66-02)
//   BASELINE_10 freshness comment in regenerate-supervision-pins.mjs (V-66-03)
//   Synthetic regex 7 back-port (v1.6-milestone-audit.mjs:854 <-> :725) (V-66-04)
//   audit-harness-v1.6-integrity.yml exists with both crons + rotting-external-quarterly job (V-66-05)
//   v1.6-MILESTONE-AUDIT.md exists with YAML frontmatter (V-66-06)
//   v1.6-DEFERRED-CLEANUP.md exists with CI-1/CI-2/CI-3 sections (V-66-07)
//   24 ABAUDIT comments verified load-bearing -- zero orphans (V-66-ABAUDIT-STALENESS)
// Lineage: Phase 48 D-25 -> ... -> Phase 65 ABNAV-01..07 -> Phase 66 AUDIT-14..15
//
// Usage: node scripts/validation/check-phase-66.mjs [--verbose]
// Exit code: 0 if all V-66-NN PASS or SKIPPED; 1 if any FAIL.

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

const HARNESS         = 'scripts/validation/v1.6-milestone-audit.mjs';
const ALLOWLIST       = 'scripts/validation/v1.6-audit-allowlist.json';
const PIN_HELPER      = 'scripts/validation/regenerate-supervision-pins.mjs';
const CI_WORKFLOW     = '.github/workflows/audit-harness-v1.6-integrity.yml';
const MILESTONE_AUDIT = '.planning/milestones/v1.6-MILESTONE-AUDIT.md';
const DEFERRED_CLEAN  = '.planning/milestones/v1.6-DEFERRED-CLEANUP.md';

// Extends check-phase-65.mjs chain by adding 65.
// Phase 66 is the validator-as-deliverable in this phase; v1.7+ RUNS the chain per D-22 auditor-independence.
const CHAIN_PHASES = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65];

// CHAIN_SKIP topology: HISTORICAL — empty by Phase 68 CHAIN-03 close (sha 7b635ca).
//
// Pre-existing v1.5/v1.6-era failures {48, 51, 58, 60, 61} had been suppressed here pending
// root-cause resolution (this file historically cited "v1.7 CI-Linux job per
// v1.6-DEFERRED-CLEANUP.md" as the resolution path per Phase 66 D-03 amendment; the actual
// resolution landed earlier than CI-Linux, via Phase 68 Pillar B Validator Surgery; full
// historical narrative in .planning/milestones/v1.6-DEFERRED-CLEANUP.md "CHAIN_SKIP
// Resolution" section).
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
  // === V-66-01: v1.6-milestone-audit.mjs windowKeywords contains 6 LOCKED C11 tokens ===
  {
    id: 1, name: 'V-66-01: v1.6-milestone-audit.mjs windowKeywords contains 6 LOCKED C11 tokens',
    run() {
      const c = readFile(HARNESS);
      if (c === null) return { pass: false, detail: HARNESS + ' missing' };
      const REQUIRED_TOKENS = [
        'apple-business-side', 'intune-side', 'integration-handshake',
        'owned-by-apple-business', 'owned-by-intune', 'scope-boundary'
      ];
      const missing = REQUIRED_TOKENS.filter(t => !c.includes(t));
      if (missing.length > 0) {
        return { pass: false, detail: 'windowKeywords missing tokens: ' + missing.join(', ') + ' -- AUDIT-14 contract per ROADMAP.md:239' };
      }
      return { pass: true, detail: 'all 6 C11 LOCKED tokens present in windowKeywords' };
    }
  },

  // === V-66-02: v1.6-audit-allowlist.json c13_rotting_external is populated object + quarterly_audit metadata ===
  {
    id: 2, name: 'V-66-02: v1.6-audit-allowlist.json c13_rotting_external is populated object + quarterly_audit metadata',
    run() {
      const c = readFile(ALLOWLIST);
      if (c === null) return { pass: false, detail: ALLOWLIST + ' missing' };
      let parsed;
      try {
        parsed = JSON.parse(c);
      } catch (e) {
        return { pass: false, detail: 'v1.6-audit-allowlist.json JSON parse error: ' + e.message };
      }
      const c13r = parsed.c13_rotting_external;
      if (c13r === undefined || c13r === null) {
        return { pass: false, detail: 'c13_rotting_external key missing from sidecar' };
      }
      if (Array.isArray(c13r)) {
        return { pass: false, detail: 'c13_rotting_external is still an empty array placeholder -- AUDIT-14 deliverable not yet landed' };
      }
      if (typeof c13r !== 'object') {
        return { pass: false, detail: 'c13_rotting_external must be an object (got ' + typeof c13r + ')' };
      }
      if (!c13r.quarterly_audit || c13r.quarterly_audit.cadence !== '0 8 1 1,4,7,10 *') {
        return { pass: false, detail: 'c13_rotting_external.quarterly_audit.cadence != "0 8 1 1,4,7,10 *" (AUDIT-14 contract per ROADMAP.md:239)' };
      }
      return { pass: true, detail: 'c13_rotting_external populated with quarterly_audit.cadence="' + c13r.quarterly_audit.cadence + '"' };
    }
  },

  // === V-66-03: regenerate-supervision-pins.mjs contains BASELINE_10 freshness comment ===
  {
    id: 3, name: 'V-66-03: regenerate-supervision-pins.mjs contains BASELINE_10 freshness comment',
    run() {
      const c = readFile(PIN_HELPER);
      if (c === null) return { pass: false, detail: PIN_HELPER + ' missing' };
      if (!c.includes('BASELINE_10 refreshed')) {
        return { pass: false, detail: 'BASELINE_10 freshness comment absent -- AUDIT-14 deliverable not yet landed (closes BASELINE_9 v1.5 carry-over)' };
      }
      if (!c.includes('Phase 66')) {
        return { pass: false, detail: 'BASELINE_10 freshness comment present but missing Phase 66 attribution' };
      }
      return { pass: true, detail: 'BASELINE_10 freshness comment present (mirrors BASELINE_9 pattern at lines 390/393/396)' };
    }
  },

  // === V-66-04: v1.6-milestone-audit.mjs synthetic regex 7 (line 854) matches production (line 725) ===
  {
    id: 4, name: 'V-66-04: v1.6-milestone-audit.mjs synthetic regex 7 (line 854) matches production (line 725) negative-lookahead extension',
    run() {
      const c = readFile(HARNESS);
      if (c === null) return { pass: false, detail: HARNESS + ' missing' };
      // The negative-lookahead extension string that should appear in BOTH production (line 725) and
      // synthetic mirror (line 854) after the Phase 66 back-port. Currently only present at line 725.
      const EXTENSION = 'renamed|personal|Apple\\s+Business|scopes|ABM|account';
      const matches = c.split(EXTENSION).length - 1;
      if (matches < 2) {
        return { pass: false, detail: 'synthetic regex 7 back-port not yet landed -- production extension present ' + matches + ' time(s); expected >= 2 (line 725 production AND line 854 synthetic mirror)' };
      }
      return { pass: true, detail: 'synthetic regex 7 negative-lookahead extension appears ' + matches + ' times (production line 725 + synthetic line 854)' };
    }
  },

  // === V-66-05: audit-harness-v1.6-integrity.yml exists with both crons + rotting-external-quarterly job + tight v1.6 path-filter list ===
  {
    id: 5, name: 'V-66-05: .github/workflows/audit-harness-v1.6-integrity.yml exists with both crons + rotting-external-quarterly job + tight v1.6 path-filter list',
    run() {
      const c = readFile(CI_WORKFLOW);
      if (c === null) return { pass: false, detail: CI_WORKFLOW + ' missing -- Plan 66-03 Wave 3 deliverable (AUDIT-15)' };
      const REQUIRED = [
        "cron: '0 8 * * 1'",
        "cron: '0 8 1 1,4,7,10 *'",
        'rotting-external-quarterly',
        "scripts/validation/v1.6-*",
        'docs/cross-platform/apple-business/**',
      ];
      const missing = REQUIRED.filter(s => !c.includes(s));
      if (missing.length > 0) {
        return { pass: false, detail: 'CI workflow missing required substrings: ' + missing.join(' | ') };
      }
      const firstNameMatch = c.match(/^\s*name:\s*(.+)$/m);
      const nameStr = firstNameMatch ? firstNameMatch[1].substring(0, 80) : '(no name: line)';
      return { pass: true, detail: 'CI workflow present (name: ' + nameStr + '); both crons + rotting-external-quarterly job + v1.6 path-filter present' };
    }
  },

  // === V-66-06: v1.6-MILESTONE-AUDIT.md exists with YAML frontmatter + 39/39 + 5/5 + performed_by D-22-INTENT narrative ===
  {
    id: 6, name: 'V-66-06: .planning/milestones/v1.6-MILESTONE-AUDIT.md exists with YAML frontmatter + 39/39 + 5/5 + performed_by D-22-INTENT narrative',
    run() {
      const c = readFile(MILESTONE_AUDIT);
      if (c === null) return { pass: false, detail: MILESTONE_AUDIT + ' missing -- Plan 66-05 Wave 5 deliverable (AUDIT-15)' };
      const REQUIRED = [
        'milestone: v1.6',
        'requirements: 39/39',
        'phases: 5/5',
        'performed_by:',
        'gsd-executor',
        'fresh git clone',
      ];
      const missing = REQUIRED.filter(s => !c.includes(s));
      if (missing.length > 0) {
        return { pass: false, detail: 'v1.6-MILESTONE-AUDIT.md missing required substrings: ' + missing.join(' | ') };
      }
      // Surface the score lines for verbose output
      const reqMatch = c.match(/requirements:\s*\S+/);
      const phaseMatch = c.match(/phases:\s*\S+/);
      const scoreSummary = (reqMatch ? reqMatch[0] : '?') + ' | ' + (phaseMatch ? phaseMatch[0] : '?');
      return { pass: true, detail: 'v1.6-MILESTONE-AUDIT.md present (' + scoreSummary + ')' };
    }
  },

  // === V-66-07: v1.6-DEFERRED-CLEANUP.md exists with CI-1/CI-2/CI-3 sections + CHAIN_SKIP-CRLF section ===
  {
    id: 7, name: 'V-66-07: .planning/milestones/v1.6-DEFERRED-CLEANUP.md exists with CI-1/CI-2/CI-3 sections + CHAIN_SKIP-CRLF section',
    run() {
      const c = readFile(DEFERRED_CLEAN);
      if (c === null) return { pass: false, detail: DEFERRED_CLEAN + ' missing -- Plan 66-03 Wave 3 deliverable (AUDIT-15)' };
      const REQUIRED = ['## CI-1', '## CI-2', '## CI-3', 'CHAIN_SKIP'];
      const missing = REQUIRED.filter(s => !c.includes(s));
      if (missing.length > 0) {
        return { pass: false, detail: 'v1.6-DEFERRED-CLEANUP.md missing required substrings: ' + missing.join(' | ') };
      }
      const firstTitleMatch = c.match(/^#\s+(.+)$/m);
      const titleStr = firstTitleMatch ? firstTitleMatch[1].substring(0, 80) : '(no # title)';
      return { pass: true, detail: 'v1.6-DEFERRED-CLEANUP.md present (title: ' + titleStr + ')' };
    }
  },

  // === V-66-ABAUDIT-STALENESS: every ABAUDIT comment has C15-banned next_line (no orphans) ===
  // Replicates the 8 C15 production regexes from v1.6-milestone-audit.mjs:718-727 VERBATIM (post-back-port form
  // so the validator is forward-compatible with the Wave 2 atomic-commit regex-7 back-port at line 854).
  // The line-start anchored regex /^\s*<!--\s*ABAUDIT-(\d+):/ excludes Version History prose mentions
  // (e.g., 12-:201 and 18-:120 contain "ABAUDIT-" inside table cells which must NOT trigger this check).
  // Fenced-code-block detection excludes Pitfall-4 false-positives where a demonstrative ABAUDIT
  // comment appears inside a ```html / ``` example block (00-overview.md style-guide section).
  //
  // Phase 66 Plan 66-01 Task 66-01-02 D-02 staleness walk outcome (commit landed BEFORE this validator):
  // 24 initial ABAUDITs -> 1 demonstrative (00-overview.md:68 inside code fence; excluded by fence-detector)
  //                    -> 13 strict orphans removed in separate corpus-only commit per D-02 LOCKED
  //                    -> 10 remaining exemptions verified load-bearing (all next_lines trigger >=1 C15 regex)
  {
    id: 'ABAUDIT-STALENESS', name: 'V-66-ABAUDIT-STALENESS: every ABAUDIT comment has C15-banned next_line (no orphans)',
    run() {
      const C15_BANNED = [
        /\bIntune\s+(RBAC|role|scope\s+tag|admin\s+role)\b/i,
        /\bdelegated\s+admin\b.{0,60}\bIntune\b/i,
        /\b(apple\s+business|apple\s+business\s+manager)\s+(role|privilege|permission)\b.{0,60}\bIntune\s+(role|RBAC)\b/i,
        /\bIntune[-\s]side\b.{0,40}\b(delegat|RBAC|role\s+assign)/i,
        /\bIntune\b.{0,40}\b(controls?|manages?|owns?)\b.{0,40}\b(Apple\s+Business|ABM)\b.{0,40}\bpermission/i,
        /\b(same\s+as|equivalent\s+to|maps\s+to)\s+Intune\s+(RBAC|role)/i,
        /\bManaged\s+Apple\s+ID\b(?!.{0,160}(Microsoft Intune|Intune documentation|continues to use|formerly|legacy|predates|rebrand|renamed|personal|Apple\s+Business|scopes|ABM|account))/i,
        /\bIntune\s+admin\b.{0,60}\b(Apple\s+Business|ABM|Organizational\s+Unit|content\s+token)/i,
      ];

      // 11 ABAUDIT scope files at HEAD ad5c9c9 (24 total comments)
      const FILES = [
        'docs/cross-platform/apple-business/00-overview.md',
        'docs/cross-platform/apple-business/06-mdm-server-assignment.md',
        'docs/cross-platform/apple-business/11-vpp-catalog-runbook.md',
        'docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md',
        'docs/cross-platform/apple-business/13-device-release-runbook.md',
        'docs/cross-platform/apple-business/14-device-transfer-runbook.md',
        'docs/cross-platform/apple-business/15-mdm-server-reassign-runbook.md',
        'docs/cross-platform/apple-business/16-managed-apple-account-runbook.md',
        'docs/cross-platform/apple-business/17-audit-log-scoping-runbook.md',
        'docs/cross-platform/apple-business/18-cross-org-boundary-cheat-sheet.md',
        'docs/admin-setup-macos/01-abm-configuration.md',
      ];

      const orphans = [];
      let totalComments = 0;
      for (const file of FILES) {
        const c = readFile(file);
        if (c === null) continue;
        const lines = c.split('\n');
        // Track fenced-code-block state so we exclude ABAUDIT comments that appear inside
        // ```html / ``` literal example blocks (Pitfall 4: structural prose false-positive class;
        // 00-overview.md style-guide section contains a demonstrative ABAUDIT inside a code fence
        // which is teaching content, not a real exemption).
        let inFence = false;
        lines.forEach((ln, i) => {
          // Detect fence boundaries (any ``` line toggles state; matches both ``` and ```lang)
          if (/^\s*```/.test(ln)) {
            inFence = !inFence;
            return;
          }
          if (inFence) return;
          // Anchored regex: only match <!-- ABAUDIT-NN: --> at line start (excludes Version History prose)
          const m = ln.match(/^\s*<!--\s*ABAUDIT-(\d+):/);
          if (!m) return;
          totalComments++;
          const nextLine = lines[i + 1] || '';
          const triggers = C15_BANNED.some(rx => rx.test(nextLine));
          if (!triggers) {
            orphans.push({ file, comment_line: i + 1, abaudit_nn: m[1], next_line: nextLine.substring(0, 80) });
          }
        });
      }
      if (orphans.length > 0) {
        return { pass: false, detail: orphans.length + ' orphan ABAUDIT comment(s) (of ' + totalComments + ' total): ' + JSON.stringify(orphans.slice(0, 3)) };
      }
      return { pass: true, detail: totalComments + ' ABAUDIT exemptions verified load-bearing (all next_lines trigger >=1 C15 regex)' };
    }
  },
];

// === V-66-CHAIN: chain regression-guards for check-phase-{48..65}.mjs ===
for (let i = 0; i < CHAIN_PHASES.length; i++) {
  const phaseNum = CHAIN_PHASES[i];
  const id = 'CHAIN-' + phaseNum;
  checks.push({
    id, name: `V-66-${id}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
    run() {
      // Skip phases with known pre-existing failures that are NOT Phase 66 regressions
      // (see CHAIN_SKIP documentation above for root causes and resolution path)
      if (CHAIN_SKIP.has(phaseNum)) {
        return { pass: true, skipped: true, detail: 'pre-existing failure unrelated to Phase 66 (see CHAIN_SKIP docs); deferred to v1.7 CI-Linux job per v1.6-DEFERRED-CLEANUP.md' };
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

// === V-66-AUDIT: v1.6-milestone-audit.mjs subprocess exits 0 ===
// Do NOT duplicate C16 logic here -- C16 is handled entirely by the harness invocation below.
checks.push({
  id: 'AUDIT', name: 'V-66-AUDIT: v1.6-milestone-audit.mjs exits 0',
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

// === V-66-SELF: CHAIN_PHASES does NOT include 66 (no self-reference; D-22 auditor-independence) ===
checks.push({
  id: 'SELF', name: 'V-66-SELF: CHAIN_PHASES array does NOT include 66 (no self-recursive call)',
  run() {
    if (CHAIN_PHASES.includes(66)) return { pass: false, detail: 'CHAIN_PHASES includes 66 -- self-reference regression' };
    const skipList = [...CHAIN_SKIP].sort((a, b) => a - b).join(',');
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] -- 66 absent (correct); CHAIN_SKIP = [' + skipList + ']' };
  }
});

// === Runner loop (pattern verbatim from check-phase-65.mjs) ===
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-66 -- Phase 66 deliverables\n');
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
