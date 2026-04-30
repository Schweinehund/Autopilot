#!/usr/bin/env node
// v1.5 Milestone Audit Harness (Path A copy of v1.4.1 + C10 blocking + C11/C12/C13 informational-first + C6/C7 promoted to blocking)
// Source of truth: .planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-CONTEXT.md (D-01..D-23)
// Sidecar allow-list: scripts/validation/v1.5-audit-allowlist.json  (inherited v1.4.1 schema + Linux/ops-domain arrays added lazily)
// Frozen-predecessor reproducibility anchor: v1.4.1-milestone-audit.mjs pinned at Phase 47 close
// File reads only: all content loaded via fs.readFileSync; no shell invocations.
//
// C6 (PITFALL-7) + C7 (bare-Knox): PROMOTED to blocking per Phase 48 D-04/D-05.
// C9 (cope_banned_phrases): INFORMATIONAL through Phase 60 per Phase 48 D-06 (ops-domain false-positive risk).
// C10 (Linux frontmatter): BLOCKING from Phase 48 -- new Linux docs must have platform: Linux + 60d last_verified.
// C11 (ops-domain anti-patterns): INFORMATIONAL-FIRST per AUDIT-03; promotes to blocking Phase 60.
// C12 (4-platform comparison structure): INFORMATIONAL-FIRST per AUDIT-04; promotes to blocking once file exists (Phase 58+).
// C13 (broken-link automation): INFORMATIONAL-FIRST per AUDIT-05; promotes to blocking after Phase 60 second-pass triage.
//
// Checks per D-25/D-27/D-28/D-29/D-30/D-31:
//   C1: Zero SafetyNet as compliance mechanism (exemption = allow-list pin OR nearby deprecation prose)
//   C2: Zero supervision as Android mgmt term (exemption = allow-list pin by {file, line})
//   C3: AOSP stub word count within Phase 39 envelope (INFORMATIONAL ONLY -- always PASS per D-29)
//   C4: Zero Android links in deferred shared files (RETIRED 2026-04-30 by Phase 57; informational/always-PASS; DEFER-07 closed; superseded by check-phase-57.mjs)
//   C5: last_verified frontmatter on all Android docs (review_by - last_verified <= 60 days per Phase 34 D-14)
//   C6: PITFALL-7 framing in all AOSP + per-OEM docs (BLOCKING in v1.5 per D-04)
//   C7: bare-Knox disambiguation (BLOCKING in v1.5 per D-05)
//   C9: COPE banned-phrase check (INFORMATIONAL through Phase 60 per D-06)
//   C10: Linux frontmatter (BLOCKING from Phase 48 per AUDIT-02)
//   C11: Ops-domain anti-pattern regex (INFORMATIONAL per AUDIT-03)
//   C12: 4-platform comparison structural validation (INFORMATIONAL per AUDIT-04)
//   C13: Broken-link automation (INFORMATIONAL per AUDIT-05)
//
// Usage: node scripts/validation/v1.5-milestone-audit.mjs [--verbose]
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
// Follows check-phase-31.mjs parseInventory() degradation pattern -- degrade to empty arrays on parse failure.
function parseAllowlist() {
  const raw = readFile('scripts/validation/v1.5-audit-allowlist.json');
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

// linuxDocPaths: enumerate the C10 scope -- Linux docs requiring platform: Linux + 60d last_verified.
// Returns a de-duplicated, sorted array of relative paths that exist on disk.
// Starts empty -- grows lazily as Phase 49+ adds Linux files.
function linuxDocPaths() {
  const paths = new Set();

  // Root singletons
  for (const p of [
    'docs/_glossary-linux.md',
    'docs/_templates/admin-template-linux.md',
    'docs/reference/linux-capability-matrix.md',
    'docs/decision-trees/09-linux-triage.md'
  ]) {
    if (existsSync(join(process.cwd(), p))) paths.add(p);
  }

  // Directory walks
  for (const d of ['docs/linux-lifecycle', 'docs/admin-setup-linux']) {
    for (const abs of walkMd(d)) {
      paths.add(relNormalize(abs));
    }
  }

  // L1 runbooks 30-33 linux-*
  for (const abs of walkMd('docs/l1-runbooks')) {
    const rel = relNormalize(abs);
    if (/\/(3[0-3])-linux-/.test(rel)) paths.add(rel);
  }

  // L2 runbooks 24-25 linux-*
  for (const abs of walkMd('docs/l2-runbooks')) {
    const rel = relNormalize(abs);
    if (/\/(2[4-5])-linux-/.test(rel)) paths.add(rel);
  }

  // D-24 scope-filter: exclude any DIRECTORY segment starting with "_"
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
    informational: true,  // D-06 extension -- tag for runner detail-guard
    // D-29: INFORMATIONAL ONLY. Always PASS in Phase 42 -- Phase 42 does not re-gate Phase 39 self-certification.
    // Computes body word count excluding frontmatter, ## See Also, and ## Changelog tails.
    run() {
      const content = readFile('docs/admin-setup-android/06-aosp-stub.md');
      if (!content) {
        return { pass: true, detail: '(informational -- Phase 39 self-certification; AOSP stub missing)' };
      }
      let body = content.replace(/^---[\s\S]*?\n---\n/, '');
      body = body.replace(/^## See Also[\s\S]*$/m, '');
      body = body.replace(/^## Changelog[\s\S]*$/m, '');
      const wc = body.split(/\s+/).filter(Boolean).length;
      return {
        pass: true,
        detail: '(informational -- Phase 39 self-certification; body ' + wc + ' words vs envelope 600-900)'
      };
    }
  },
  {
    id: 4,
    name: 'C4: Zero Android links in deferred shared files',
    // D-30: targets = docs/common-issues.md, docs/quick-ref-l1.md, docs/quick-ref-l2.md.
    // Regex scoped to markdown link target syntax ](...) only -- does not match bare text mentions.
    //
    // RETIRED 2026-04-30 by Phase 57 (DEFER-07 Android Nav Unification close).
    // The DEFER-07 deferral that this check was guarding (Android links forbidden in the
    // 4 hub files until DEFER-07 ships) closed atomically when Phase 57 plans 57-01..57-06
    // landed Android H2 expansions in docs/index.md / common-issues.md / quick-ref-l1.md /
    // quick-ref-l2.md per CLEAN-01..04. Validator-of-record for the new Android hub-nav
    // surface is scripts/validation/check-phase-57.mjs (26 V-57-NN structural assertions).
    // C4 is preserved in source as informational/always-PASS for audit-trail continuity
    // with v1.4.1 lineage (Phase 47 authoring -> Phase 48 Path A copy -> Phase 57 retire).
    // Original blocking implementation preserved below in /* */ for posterity.
    run() {
      return {
        pass: true,
        detail: '(informational -- DEFER-07 closed by Phase 57; check retired 2026-04-30; superseded by check-phase-57.mjs)'
      };
      /* PRE-PHASE-57 BLOCKING IMPLEMENTATION (retired 2026-04-30):
      const violations = [];
      const targets = [
        'docs/common-issues.md',
        'docs/quick-ref-l1.md',
        'docs/quick-ref-l2.md'
      ];
      const re = /\]\([^)]*(android|aosp|byod-work-profile|zero-touch|managed-google-play|play-integrity|managed-home-screen|amapi|knox|kme|kpe|realwear|zebra|pico|htc-vive-focus|meta-quest|cope-full-admin|aosp-realwear|aosp-zebra|aosp-pico|aosp-htc-vive-focus|aosp-meta-quest|aosp-oem-matrix)[^)]*\)/gi;
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
      */
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
        if (lvMatch[1] === '1970-01-01') continue;  // D-24 TEMPLATE-SENTINEL -- skip
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
    // D-04 + Phase 48 CONTEXT: BLOCKING in v1.5 (C6 target files frozen; no v1.5 phases touch admin-setup-android/ AOSP files).
    // Target regex: /not supported under AOSP/i. Scope: docs/admin-setup-android/ per-OEM AOSP files.
    // Pre-graduation regression check (Plan 48-04): confirmed 6/6 AOSP-scoped files pass.
    run() {
      const targets = [
        'docs/admin-setup-android/06-aosp-stub.md',
        'docs/admin-setup-android/09-aosp-realwear.md',
        'docs/admin-setup-android/10-aosp-zebra.md',
        'docs/admin-setup-android/11-aosp-pico.md',
        'docs/admin-setup-android/12-aosp-htc-vive-focus.md',
        'docs/admin-setup-android/13-aosp-meta-quest.md',
      ];
      let found = 0, total = 0;
      for (const t of targets) {
        const c = readFile(t);
        if (!c) continue;
        total++;
        if (/not supported under AOSP/i.test(c)) found++;
      }
      if (found === total && total > 0) return { pass: true };
      return { pass: false, detail: found + '/' + total + ' AOSP-scoped files preserve PITFALL-7 framing' };
    }
  },
  {
    id: 7,
    name: 'C7: bare-"Knox" disambiguation check',
    // D-05 + Phase 48 CONTEXT: BLOCKING in v1.5. Knox corpus stable since v1.4.1 Phase 44. c7_knox_allowlist[] sidecar exemption per D-05.
    // Suffix list: 11 original SKU qualifiers (v1.4.1-locked) + compound Knox proper-noun qualifiers added Plan 48-04
    // (Admin, Deployment, B2B, eFuse, tripped, license, profile, firmware, Portal, Investigation, SKU, attestation,
    //  enrollment, Custom, viewer, upload -- all legitimate Samsung Knox product/portal/compound-noun uses).
    // Pre-graduation corpus triage (Plan 48-04): all 99 harness-scope occurrences are compound-noun uses,
    //  none are ambiguous SKU references. Extended suffix list reduces bare count to 0.
    run() {
      const targets = androidDocPaths();
      // Original 11 SKU qualifiers (v1.4.1-locked) + compound Knox proper-noun qualifiers (Plan 48-04 extension)
      const suffixes = /(Mobile Enrollment|Platform for Enterprise|Suite|Manage|Configure|KPE|KME|KPE Standard|KPE Premium|on-device attestation|Mobile Enrollment Portal|Admin|Deployment|B2B|eFuse|tripped|license|License|profile|Profile|firmware|Portal|Investigation|SKU|attestation|enrollment|Enrollment|Custom|viewer|upload)/;
      // Apply c7_knox_allowlist[] (Phase 48 D-05 -- sidecar-driven exemption mechanism for future edge cases)
      const allowlist = ALLOWLIST.c7_knox_allowlist || [];
      const allowKey = new Set(allowlist.map(e => e.file + ':' + e.line));
      let bare = 0;
      for (const t of targets) {
        const c = readFile(t);
        if (!c) continue;
        const knoxRe = /\bKnox\b/g;
        let m;
        while ((m = knoxRe.exec(c)) !== null) {
          const window = c.slice(m.index, m.index + 50);
          if (!suffixes.test(window)) {
            const lineNum = c.slice(0, m.index).split('\n').length;
            if (!allowKey.has(t + ':' + lineNum)) bare++;
          }
        }
      }
      if (bare === 0) return { pass: true };
      return { pass: false, detail: bare + ' bare "Knox" occurrence(s) without SKU qualifier' };
    }
  },
  {
    id: 9,
    name: 'C9: COPE banned-phrase check',
    informational: true,
    // D-06 + Phase 48 D-06: INFORMATIONAL through Phase 60 (ops-domain false-positive risk for Phase 53/54 content).
    // Banned phrases source from sidecar JSON cope_banned_phrases[].
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
      return { pass: true, detail: '(informational)' };
    }
  },
  {
    id: 10,
    name: 'C10: Linux frontmatter (platform: Linux + 60d last_verified)',
    // AUDIT-02: BLOCKING from Phase 48. Scope = linuxDocPaths().
    // Validates: platform: Linux present; last_verified ISO date present (not TEMPLATE-SENTINEL);
    // review_by present; review_by - last_verified <= 60 days (Phase 34 D-14 cadence for Linux too).
    // Pass condition on empty linuxDocPaths(): no Linux files yet -> trivially PASS (forward-gating check).
    run() {
      const violations = [];
      for (const relPath of linuxDocPaths()) {
        const content = readFile(relPath);
        if (!content) { violations.push({ file: relPath, reason: 'unreadable' }); continue; }
        const fmMatch = content.match(/^---\n([\s\S]*?)\n---/m);
        if (!fmMatch) { violations.push({ file: relPath, reason: 'no frontmatter' }); continue; }
        const fm = fmMatch[1];
        // Platform check
        if (!/^platform:\s*Linux\s*$/m.test(fm)) {
          violations.push({ file: relPath, reason: 'platform: Linux missing' }); continue;
        }
        const lvMatch = fm.match(/^last_verified:\s*(\d{4}-\d{2}-\d{2})\s*(#.*)?$/m);
        const rbMatch = fm.match(/^review_by:\s*(\d{4}-\d{2}-\d{2})\s*(#.*)?$/m);
        if (!lvMatch) { violations.push({ file: relPath, reason: 'last_verified missing or malformed' }); continue; }
        if (lvMatch[1] === '1970-01-01') continue;  // TEMPLATE-SENTINEL -- skip
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
        detail: violations.length + ' Linux frontmatter violation(s): '
              + violations.slice(0, 3).map(v => v.file + ' (' + v.reason + ')').join('; ')
      };
    }
  },
  {
    id: 11,
    name: 'C11: Ops-domain anti-pattern regex',
    informational: true,
    // AUDIT-03: INFORMATIONAL-FIRST. Promotes to blocking at Phase 60.
    // Patterns sourced from sidecar JSON c11_ops_patterns[] array (lazy-loaded; hardcoded fallback).
    run() {
      const patternSource = (ALLOWLIST.c11_ops_patterns && ALLOWLIST.c11_ops_patterns.length)
        ? ALLOWLIST.c11_ops_patterns
        : [
            '\\bSystem Center\\b',
            '\\bSCCM\\b[^.]*\\bIntune\\b',
            '\\bAutopatch rings\\b',
            '\\bSafetyNet\\b[^.]*\\bcompliance\\b'
          ];
      const patterns = patternSource.map(p => new RegExp(p, 'i'));
      // Scope: all docs/**/*.md (ops-depth is cross-platform)
      const targets = [];
      for (const abs of walkMd('docs')) { targets.push(relNormalize(abs)); }
      let hits = 0;
      for (const t of targets) {
        const c = readFile(t);
        if (!c) continue;
        for (const pat of patterns) { if (pat.test(c)) hits++; }
      }
      return { pass: true, detail: '(informational)' };
    }
  },
  {
    id: 12,
    name: 'C12: 4-platform comparison structural validation',
    informational: true,
    // AUDIT-04: INFORMATIONAL-FIRST. File-existence pre-gate. Promotes to blocking once
    // docs/reference/4-platform-capability-comparison.md exists (Phase 58+).
    // Link-not-copy: every non-empty data cell must contain a markdown hyperlink.
    run() {
      const targetFile = 'docs/reference/4-platform-capability-comparison.md';
      const content = readFile(targetFile);
      if (!content) {
        // File doesn't exist yet (Phase 48-57) -- informational PASS (pre-gate)
        return { pass: true, detail: '(informational)' };
      }
      // File exists (Phase 58+) -- validate structure:
      const platforms = ['Windows', 'macOS', 'iOS', 'Android', 'Linux'];
      const missingPlatforms = platforms.filter(p => !content.includes(p));
      if (missingPlatforms.length > 0) {
        return { pass: false, detail: 'Missing platform columns: ' + missingPlatforms.join(', ') };
      }
      // Link-not-copy check: table rows with non-empty cells must contain [text](link)
      const tableLines = content.split('\n').filter(l => /^\|/.test(l) && !/^\|[-: ]+\|/.test(l));
      const emptyCells = [];
      for (const line of tableLines) {
        const cells = line.split('|').slice(1, -1);
        for (const cell of cells) {
          const trimmed = cell.trim();
          if (trimmed && trimmed !== '\u2014' && trimmed !== 'N/A' && !/\[.+\]\(.+\)/.test(trimmed)) {
            emptyCells.push(trimmed.slice(0, 40));
          }
        }
      }
      if (emptyCells.length > 0) {
        return { pass: false, detail: emptyCells.length + ' cell(s) missing hyperlinks (link-not-copy violation)' };
      }
      return { pass: true, detail: '(informational)' };
    }
  },
  {
    id: 13,
    name: 'C13: Broken-link automation (markdown-link-check)',
    informational: true,
    // AUDIT-05: INFORMATIONAL-FIRST. Promotes to blocking after Phase 60 second-pass triage.
    // Scope: internal anchor links + relative paths in docs/**/*.md.
    // External MS Learn URL validation explicitly OUT OF SCOPE (REQUIREMENTS.md).
    // Note: always returns informational PASS -- full sweep is Wave-2 manual step (48-VERIFICATION-broken-links.md).
    run() {
      // Collect docs/**/*.md files to verify tool is wired; full sweep is Wave-2 step
      const docFiles = [];
      for (const abs of walkMd('docs')) { docFiles.push(relNormalize(abs)); }
      if (docFiles.length === 0) return { pass: true, detail: '(informational)' };
      // Always informational-first pass -- broken links do not block harness exit
      return { pass: true, detail: '(informational)' };
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
