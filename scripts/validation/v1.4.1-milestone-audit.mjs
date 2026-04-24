#!/usr/bin/env node
// v1.4.1 Milestone Audit Harness (copy of v1.4 + C6/C7/C9 informational-first per Phase 42 D-29 + _*-prefix scope-filter + TEMPLATE-SENTINEL parse)
// Source of truth: .planning/phases/43-v1-4-cleanup-audit-harness-fix/43-CONTEXT.md (D-01..D-08, D-24, D-26)
// Sidecar allow-list: scripts/validation/v1.4.1-audit-allowlist.json  (Knox / per-OEM AOSP / COPE exemptions)
// Frozen-predecessor reproducibility anchor: v1.4-milestone-audit.mjs pinned at commit 3c3a140
// File reads only: all content loaded via fs.readFileSync; no shell invocations.
//
// Five mechanical checks per D-25/D-27/D-28/D-29/D-30/D-31:
//   C1: Zero SafetyNet as compliance mechanism (exemption = allow-list pin OR nearby deprecation prose)
//   C2: Zero supervision as Android mgmt term (exemption = allow-list pin by {file, line})
//   C3: AOSP stub word count within Phase 39 envelope (INFORMATIONAL ONLY — always PASS per D-29)
//   C4: Zero Android links in deferred shared files (docs/common-issues.md, docs/quick-ref-l1.md, docs/quick-ref-l2.md)
//   C5: last_verified frontmatter on all Android docs (review_by - last_verified <= 60 days per Phase 34 D-14)
//
// Usage: node scripts/validation/v1.4-milestone-audit.mjs [--verbose]
// Exit code: 0 on all-PASS; 1 on any-FAIL.

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');  // CRLF normalization per Phase 31 ca40eb9
}

// walkMd: recursive .md file walker (verbatim from scripts/validation/check-phase-30.mjs lines 21-38)
function walkMd(dir) {
  const abs = join(process.cwd(), dir);
  if (!existsSync(abs)) return [];
  const results = [];
  function walk(current) {
    let entries;
    try { entries = readdirSync(current); } catch { return; }
    for (const entry of entries) {
      const full = join(current, entry);
      let stat;
      try { stat = statSync(full); } catch { continue; }
      if (stat.isDirectory()) { walk(full); }
      else if (entry.endsWith('.md')) { results.push(full); }
    }
  }
  walk(abs);
  return results;
}

// parseAllowlist: load and parse the committed JSON sidecar (D-26 contract).
// Follows check-phase-31.mjs parseInventory() degradation pattern — degrade to empty arrays on parse failure.
function parseAllowlist() {
  const raw = readFile('scripts/validation/v1.4.1-audit-allowlist.json');
  if (!raw) return { safetynet_exemptions: [], supervision_exemptions: [] };
  try {
    return JSON.parse(raw);
  } catch (err) {
    return { _parseError: err.message, safetynet_exemptions: [], supervision_exemptions: [] };
  }
}

const ALLOWLIST = parseAllowlist();

// Normalize path separators to forward slashes so Windows backslash paths match allow-list entries.
function relNormalize(abs) {
  return abs.replace(process.cwd() + '\\', '').replace(process.cwd() + '/', '').replace(/\\/g, '/');
}

// androidDocPaths: enumerate the C1/C2/C5 scope per D-31.
// Returns a de-duplicated, sorted array of relative paths that exist on disk.
function androidDocPaths() {
  const paths = new Set();

  // Root singletons (activate only when they exist)
  for (const p of [
    'docs/_glossary-android.md',
    'docs/_templates/admin-template-android.md',
    'docs/reference/android-capability-matrix.md',
    'docs/decision-trees/08-android-triage.md'
  ]) {
    if (existsSync(join(process.cwd(), p))) paths.add(p);
  }

  // Directory walks (all .md under these two lifecycle and admin trees are Android-scoped by construction)
  for (const d of ['docs/android-lifecycle', 'docs/admin-setup-android']) {
    for (const abs of walkMd(d)) {
      paths.add(relNormalize(abs));
    }
  }

  // L1 runbooks 22-27 android-*
  for (const abs of walkMd('docs/l1-runbooks')) {
    const rel = relNormalize(abs);
    if (/\/(2[2-7])-android-/.test(rel)) paths.add(rel);
  }

  // L2 runbooks 18-21 android-*
  for (const abs of walkMd('docs/l2-runbooks')) {
    const rel = relNormalize(abs);
    if (/\/(1[89]|2[01])-android-/.test(rel)) paths.add(rel);
  }

  // End-user guides: any android-*.md
  for (const abs of walkMd('docs/end-user-guides')) {
    const rel = relNormalize(abs);
    if (/\/android-/.test(rel)) paths.add(rel);
  }

  // D-24 scope-filter: exclude any DIRECTORY segment starting with "_" (e.g., _templates/, _drafts/, _archive/, _partials/).
  // Defensive: covers iOS/macOS/Windows templates without explicit per-template sentinel adoption (v1.5 backlog).
  // Filename segment is INTENTIONALLY skipped so that docs/_glossary-android.md (a shipped doc with "_" prefix filename) remains in scope.
  function hasUnderscoreDirSegment(relPath) {
    const segments = relPath.split('/');
    return segments.slice(0, -1).some(seg => /^_/.test(seg));
  }
  return Array.from(paths).filter(p => !hasUnderscoreDirSegment(p)).sort();
}

// ---------------------------------------------------------------------------
// Checks
// ---------------------------------------------------------------------------

const checks = [
  {
    id: 1,
    name: 'C1: Zero SafetyNet as compliance mechanism',
    // D-27: scope = Android doc paths. Regex = /SafetyNet/g. Pass if every match either
    //   (a) has {file, line} pinned in allowlist.safetynet_exemptions[], OR
    //   (b) has /successor|turned off|deprecated|Play Integrity/i within +/-200 chars.
    run() {
      const violations = [];
      for (const relPath of androidDocPaths()) {
        const content = readFile(relPath);
        if (!content) continue;
        const re = /SafetyNet/g;
        let m;
        while ((m = re.exec(content)) !== null) {
          const idx = m.index;
          const lineNum = content.slice(0, idx).split('\n').length;
          const pinned = ALLOWLIST.safetynet_exemptions.some(
            e => e.file === relPath && e.line === lineNum
          );
          if (pinned) continue;
          const wStart = Math.max(0, idx - 200);
          const wEnd = Math.min(content.length, idx + 200 + 'SafetyNet'.length);
          const window = content.slice(wStart, wEnd);
          if (/successor|turned off|deprecated|Play Integrity/i.test(window)) continue;
          violations.push({ file: relPath, line: lineNum });
        }
      }
      if (violations.length === 0) return { pass: true };
      return {
        pass: false,
        detail: violations.length + ' un-exempted SafetyNet reference(s): '
              + violations.slice(0, 3).map(v => v.file + ':' + v.line).join(', ')
      };
    }
  },
  {
    id: 2,
    name: 'C2: Zero supervision as Android mgmt term',
    // D-28: scope = Android doc paths. Regex = /\bsupervis(ion|ed|ory)\b/gi.
    // Pass if every match's {file, line} appears in allowlist.supervision_exemptions[].
    run() {
      const violations = [];
      for (const relPath of androidDocPaths()) {
        const content = readFile(relPath);
        if (!content) continue;
        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
          const lineNum = i + 1;
          const reMatches = lines[i].matchAll(/\bsupervis(ion|ed|ory)\b/gi);
          for (const m of reMatches) {
            const pinned = ALLOWLIST.supervision_exemptions.some(
              e => e.file === relPath && e.line === lineNum
            );
            if (!pinned) violations.push({ file: relPath, line: lineNum, text: m[0] });
          }
        }
      }
      if (violations.length === 0) return { pass: true };
      return {
        pass: false,
        detail: violations.length + ' un-exempted supervision reference(s): '
              + violations.slice(0, 3).map(v => v.file + ':' + v.line + ' ("' + v.text + '")').join(', ')
      };
    }
  },
  {
    id: 3,
    name: 'C3: AOSP stub word count within Phase 39 envelope',
    informational: true,  // D-06 extension — tag for runner detail-guard
    // D-29: INFORMATIONAL ONLY. Always PASS in Phase 42 — Phase 42 does not re-gate Phase 39 self-certification.
    // Computes body word count excluding frontmatter, ## See Also, and ## Changelog tails.
    run() {
      const content = readFile('docs/admin-setup-android/06-aosp-stub.md');
      if (!content) {
        return { pass: true, detail: '(informational — Phase 39 self-certification; AOSP stub missing)' };
      }
      let body = content.replace(/^---[\s\S]*?\n---\n/, '');
      body = body.replace(/^## See Also[\s\S]*$/m, '');
      body = body.replace(/^## Changelog[\s\S]*$/m, '');
      const wc = body.split(/\s+/).filter(Boolean).length;
      return {
        pass: true,
        detail: '(informational — Phase 39 self-certification; body ' + wc + ' words vs envelope 600-900)'
      };
    }
  },
  {
    id: 4,
    name: 'C4: Zero Android links in deferred shared files',
    // D-30: targets = docs/common-issues.md, docs/quick-ref-l1.md, docs/quick-ref-l2.md.
    // Regex scoped to markdown link target syntax ](...) only — does not match bare text mentions.
    run() {
      const violations = [];
      const targets = [
        'docs/common-issues.md',
        'docs/quick-ref-l1.md',
        'docs/quick-ref-l2.md'
      ];
      // /gi needs lastIndex reset between lines so the .test() scan is stateless per line.
      const re = /\]\([^)]*(android|aosp|byod-work-profile|zero-touch|managed-google-play|play-integrity|managed-home-screen|amapi)[^)]*\)/gi;
      for (const t of targets) {
        const content = readFile(t);
        if (!content) continue;
        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
          if (re.test(lines[i])) violations.push({ file: t, line: i + 1 });
          re.lastIndex = 0;
        }
      }
      if (violations.length === 0) return { pass: true };
      return {
        pass: false,
        detail: violations.length + ' Android link(s) in deferred file(s): '
              + violations.slice(0, 5).map(v => v.file + ':' + v.line).join(', ')
      };
    }
  },
  {
    id: 5,
    name: 'C5: last_verified frontmatter on all Android docs',
    // D-31: every Android doc must have frontmatter with last_verified + review_by ISO dates,
    // and review_by - last_verified must be <= 60 days (Phase 34 D-14 Android cadence).
    run() {
      const violations = [];
      for (const relPath of androidDocPaths()) {
        const content = readFile(relPath);
        if (!content) {
          violations.push({ file: relPath, reason: 'unreadable' });
          continue;
        }
        const fmMatch = content.match(/^---\n([\s\S]*?)\n---/m);
        if (!fmMatch) {
          violations.push({ file: relPath, reason: 'no frontmatter' });
          continue;
        }
        const fm = fmMatch[1];
        const lvMatch = fm.match(/^last_verified:\s*(\d{4}-\d{2}-\d{2})\s*(#.*)?$/m);
        const rbMatch = fm.match(/^review_by:\s*(\d{4}-\d{2}-\d{2})\s*(#.*)?$/m);
        if (!lvMatch) { violations.push({ file: relPath, reason: 'last_verified missing or malformed' }); continue; }
        if (lvMatch[1] === '1970-01-01') continue;  // D-24 TEMPLATE-SENTINEL — skip
        if (!rbMatch) { violations.push({ file: relPath, reason: 'review_by missing or malformed' }); continue; }
        const lv = new Date(lvMatch[1]);
        const rb = new Date(rbMatch[1]);
        const diffDays = Math.round((rb - lv) / 86400000);
        if (diffDays > 60) {
          violations.push({ file: relPath, reason: 'review_by-last_verified=' + diffDays + 'd (>60)' });
        }
      }
      if (violations.length === 0) return { pass: true };
      return {
        pass: false,
        detail: violations.length + ' freshness violation(s): '
              + violations.slice(0, 3).map(v => v.file + ' (' + v.reason + ')').join('; ')
      };
    }
  },
  {
    id: 6,
    name: 'C6: PITFALL-7 preservation in AOSP + per-OEM docs',
    informational: true,
    // D-06 + Phase 42 D-29: INFORMATIONAL-FIRST. Always PASS. Emits findings count.
    // Target regex (per Phase 42 D-22 precedent): /not supported under AOSP/i — every per-OEM "supported" assertion
    // should pair with this AOSP-baseline caveat. Scope: docs/admin-setup-android/ + per-OEM AOSP files when they land.
    run() {
      const targets = [
        'docs/admin-setup-android/06-aosp-stub.md',
        // Phase 45 will add per-OEM files here (09-aosp-realwear.md, 10-aosp-zebra.md, etc.)
      ];
      let found = 0, total = 0;
      for (const t of targets) {
        const c = readFile(t);
        if (!c) continue;
        total++;
        if (/not supported under AOSP/i.test(c)) found++;
      }
      return { pass: true, detail: '(informational - ' + found + '/' + total + ' AOSP-scoped files preserve PITFALL-7 framing)' };
    }
  },
  {
    id: 7,
    name: 'C7: bare-"Knox" disambiguation check',
    informational: true,
    // D-06 + Phase 42 D-29: INFORMATIONAL-FIRST. Emits bare-Knox occurrences (no SKU qualifier within 50 chars).
    run() {
      const targets = androidDocPaths();
      const suffixes = /(Mobile Enrollment|Platform for Enterprise|Suite|Manage|Configure)/;
      let bare = 0;
      for (const t of targets) {
        const c = readFile(t);
        if (!c) continue;
        const re = /\bKnox\b/g;
        let m;
        while ((m = re.exec(c)) !== null) {
          const window = c.slice(m.index, m.index + 50);
          if (!suffixes.test(window)) bare++;
        }
      }
      return { pass: true, detail: '(informational - ' + bare + ' bare "Knox" occurrence(s); promoted to blocking in v1.5)' };
    }
  },
  {
    id: 9,
    name: 'C9: COPE banned-phrase check',
    informational: true,
    // D-06 + Phase 42 D-29: INFORMATIONAL-FIRST. Banned phrases source from sidecar JSON cope_banned_phrases[].
    run() {
      const bannedSource = (ALLOWLIST.cope_banned_phrases && ALLOWLIST.cope_banned_phrases.length)
        ? ALLOWLIST.cope_banned_phrases
        : [ '\\bCOPE\\b[^.]*\\bdeprecated\\b', '\\bCOPE\\b[^.]*\\bend of life\\b', '\\bCOPE\\b[^.]*\\bremoved\\b' ];
      const banned = bannedSource.map(p => new RegExp(p, 'i'));
      const targets = androidDocPaths();
      let hits = 0;
      for (const t of targets) {
        const c = readFile(t);
        if (!c) continue;
        for (const pat of banned) { if (pat.test(c)) hits++; }
      }
      return { pass: true, detail: '(informational - ' + hits + ' COPE banned-phrase occurrence(s))' };
    }
  }
];

// ---------------------------------------------------------------------------
// Runner (pattern from check-phase-30.mjs lines 303-337, adapted to always show C3 detail per D-25)
// ---------------------------------------------------------------------------

const LABEL_WIDTH = 56;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

let passed = 0, failed = 0, skipped = 0;

for (const check of checks) {
  let result;
  try {
    result = check.run();
  } catch (e) {
    result = { pass: false, detail: 'Unexpected error: ' + e.message };
  }
  const prefix = '[' + check.id + '/' + checks.length + '] ' + check.name;
  if (result.skipped) {
    skipped++;
    process.stdout.write(padLabel(prefix) + 'SKIPPED -- ' + (result.detail || '') + '\n');
  } else if (result.pass) {
    passed++;
    // C3 always emits its informational detail on PASS per D-25 locked stdout contract.
    // Other checks show detail only when --verbose is set or when detail is truly informative.
    const showDetail = result.detail && (check.informational === true || VERBOSE);
    process.stdout.write(padLabel(prefix) + 'PASS' + (showDetail ? ' ' + result.detail : '') + '\n');
  } else {
    failed++;
    process.stdout.write(padLabel(prefix) + 'FAIL -- ' + (result.detail || '') + '\n');
  }
}

process.stdout.write('\nSummary: ' + passed + ' passed, ' + failed + ' failed, ' + skipped + ' skipped\n');
process.exit(failed > 0 ? 1 : 0);
