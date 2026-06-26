#!/usr/bin/env node
// v1.11 Milestone Audit Harness (Path A copy of v1.10; lineage v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7 → v1.8 → v1.9 → v1.10 → v1.11; C1-C16 inherited verbatim)
// Source of truth: .planning/phases/70-v1-7-audit-harness-lineage-bump-milestone-close-pillar-d-clo/70-CONTEXT.md (D-01..D-04)
// Sidecar allow-list: scripts/validation/v1.11-audit-allowlist.json (v1.11 Path-A from v1.10 with c13_rotting_external carried for v1.11 per Phase 93 close-state)
// Frozen-predecessor reproducibility anchor: v1.6-milestone-audit.mjs pinned at Phase 66 close
// File reads only: all content loaded via fs.readFileSync; no shell invocations.
//
// C6 (PITFALL-7) + C7 (bare-Knox): BLOCKING per Phase 48 D-04/D-05 (inherited from v1.5).
// C9 (cope_banned_phrases): BLOCKING per Phase 60 D-17/D-18 (inherited from v1.5).
// C10 (Linux frontmatter): BLOCKING from Phase 48 -- new Linux docs must have platform: Linux + 60d last_verified.
// C11 (ops-domain anti-patterns): BLOCKING per Phase 60 D-01 (inherited from v1.5).
// C12 (4-platform comparison structure): BLOCKING from Phase 58 (inherited from v1.5).
// C13 (broken-link automation): BLOCKING from Phase 60 (inherited from v1.5).
// C14 (rebrand-statement token-set membership): BLOCKING from Phase 62 D-A9.
// C15 (Intune-delegation anti-pattern guard): BLOCKING from Phase 62 D-A9.
// C16 (4-edge cross-link integrity triangle): BLOCKING from Phase 62 D-A9.
//
// Checks:
//   C1: Zero SafetyNet as compliance mechanism (exemption = allow-list pin OR nearby deprecation prose)
//   C2: Zero supervision as Android mgmt term (exemption = allow-list pin by {file, line})
//   C3: AOSP stub word count within Phase 39 envelope (INFORMATIONAL ONLY -- always PASS per D-29)
//   C4: Zero Android links in deferred shared files (RETIRED 2026-04-30 by Phase 57; informational/always-PASS)
//   C5: last_verified frontmatter on all Android docs (review_by - last_verified <= 60 days per Phase 34 D-14)
//   C6: PITFALL-7 framing in all AOSP + per-OEM docs (BLOCKING in v1.5 per D-04)
//   C7: bare-Knox disambiguation (BLOCKING in v1.5 per D-05)
//   C9: COPE banned-phrase check (BLOCKING per Phase 60 D-17/D-18)
//   C10: Linux frontmatter (BLOCKING from Phase 48 per AUDIT-02)
//   C11: Ops-domain anti-pattern regex (BLOCKING per Phase 60 D-01)
//   C12: 4-platform comparison structural validation (BLOCKING from Phase 58)
//   C13: Broken-link automation (BLOCKING from Phase 60)
//   C14: Rebrand-statement token-set membership at 3 canonical Apple Business sites (BLOCKING from Phase 62 D-A9)
//   C15: Intune-delegation anti-pattern guard -- 8-regex banned-phrase list (BLOCKING from Phase 62 D-A9)
//   C16: 4-edge cross-link integrity triangle (BLOCKING from Phase 62 D-A9)
//
// Usage: node scripts/validation/v1.11-milestone-audit.mjs [--verbose] [--self-test]
// Exit code: 0 on all-PASS; 1 on any-FAIL.

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');
const SELF_TEST = argv.includes('--self-test');

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
  const raw = readFile('scripts/validation/v1.11-audit-allowlist.json');
  if (!raw) return { safetynet_exemptions: [], supervision_exemptions: [] };
  try {
    return JSON.parse(raw);
  } catch (err) {
    return { _parseError: err.message, safetynet_exemptions: [], supervision_exemptions: [] };
  }
}

const ALLOWLIST = parseAllowlist();

// appleBusinessDocPaths: enumerate the C14/C15/C16 scope -- Apple Business v1.6 docs.
// Returns a de-duplicated, sorted array of relative paths that exist on disk.
// Starts with Phase 62 deliverables -- grows lazily as Phase 63+ adds Apple Business files.
function appleBusinessDocPaths() {
  const paths = new Set();

  // Root singletons
  for (const p of [
    'docs/_glossary-apple-business.md',
  ]) {
    if (existsSync(join(process.cwd(), p))) paths.add(p);
  }

  // Directory walk: all .md under docs/cross-platform/apple-business/
  for (const abs of walkMd('docs/cross-platform/apple-business')) {
    paths.add(relNormalize(abs));
  }

  // Modified existing files: admin setup guides (C14 callout sites #2 + #3)
  for (const p of [
    'docs/admin-setup-macos/01-abm-configuration.md',
    'docs/admin-setup-ios/02-abm-token.md',
  ]) {
    if (existsSync(join(process.cwd(), p))) paths.add(p);
  }

  // D-24 scope-filter: exclude any DIRECTORY segment starting with "_"
  // Exception: _admin-directory.md is intentionally included (published deliverable per AB-07).
  // Filename segment is INTENTIONALLY skipped so that docs/_glossary-apple-business.md remains in scope.
  function hasUnderscoreDirSegment(relPath) {
    const segments = relPath.split('/');
    return segments.slice(0, -1).some(seg => /^_/.test(seg));
  }
  return Array.from(paths).filter(p => !hasUnderscoreDirSegment(p)).sort();
}

// ---------------------------------------------------------------------------
// + separator parser (RESEARCH.md §5 -- Phase 65 compound platform: frontmatter)
// ---------------------------------------------------------------------------
const ALLOWED_PLATFORMS = new Set([
  'ios', 'macos', 'android', 'linux', 'windows', 'all',
  'shared-ipad', 'apple-tv', 'ipados', 'tvos',
  'apple-business',
]);

function parsePlatformValue(rawValue) {
  if (!rawValue) return { valid: false, atoms: [], error: 'missing platform value' };
  const atoms = rawValue.split('+').map(a => a.trim()).filter(Boolean);
  if (atoms.length === 0) return { valid: false, atoms: [], error: 'empty after split' };
  const invalidAtoms = atoms.filter(a => !ALLOWED_PLATFORMS.has(a));
  if (invalidAtoms.length > 0) return { valid: false, atoms, error: 'unknown platform atoms: ' + invalidAtoms.join(', ') };
  return { valid: true, atoms, compound: atoms.length > 1 };
}

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
    // Phase 60 D-17 + D-18: PROMOTED to blocking. Sources patterns from sidecar cope_banned_phrases[]
    // and exemptions from sidecar c9_exemptions[] per {file, line, reason} contract (Phase 42 D-26).
    // Mirrors C7 Knox `allowKey`-set + per-line iteration pattern.
    run() {
      const bannedSource = (ALLOWLIST.cope_banned_phrases && ALLOWLIST.cope_banned_phrases.length)
        ? ALLOWLIST.cope_banned_phrases
        : [ '\\bCOPE\\b[^.]*\\bdeprecated\\b', '\\bCOPE\\b[^.]*\\bend of life\\b', '\\bCOPE\\b[^.]*\\bremoved\\b' ];
      const banned = bannedSource.map(p => new RegExp(p, 'gi'));
      const allowlist = ALLOWLIST.c9_exemptions || [];
      const allowKey = new Set(allowlist.map(e => e.file + ':' + e.line));
      const targets = androidDocPaths();
      const violations = [];
      for (const t of targets) {
        const c = readFile(t);
        if (!c) continue;
        for (const pat of banned) {
          pat.lastIndex = 0;
          let m;
          while ((m = pat.exec(c)) !== null) {  // RegExp.prototype.exec — not shell exec
            const lineNum = c.slice(0, m.index).split('\n').length;
            if (!allowKey.has(t + ':' + lineNum)) {
              violations.push({ file: t, line: lineNum, pattern: pat.source });
            }
          }
        }
      }
      if (violations.length === 0) return { pass: true };
      return {
        pass: false,
        detail: violations.length + ' un-exempted COPE banned-phrase hit(s): '
              + violations.slice(0, 3).map(v => v.file + ':' + v.line).join(', ')
      };
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
    // Phase 60 D-01: PROMOTED to blocking. C1-symmetric proximity-window negation against
    // disambiguation-prose keywords. ±200-char window per match. Patterns sourced from sidecar
    // JSON c11_ops_patterns[] (lazy-loaded; hardcoded 4-pattern fallback per D-03).
    // Exemptions sourced from sidecar c11_ops_exemptions[] per {file, line, reason} contract
    // (Phase 42 D-26); reserved-empty at Phase 60 close per D-02.
    // Keyword set extended per Plan 01 60-CALIBRATION.md Section B live calibration:
    // base D-01 set + mutually\s+exclusive + co-management + migration + transition + replacement.
    run() {
      const patternSource = (ALLOWLIST.c11_ops_patterns && ALLOWLIST.c11_ops_patterns.length)
        ? ALLOWLIST.c11_ops_patterns
        : [
            '\\bSystem Center\\b',
            '\\bSCCM\\b[^.]*\\bIntune\\b',
            '\\bAutopatch rings\\b',
            '\\bSafetyNet\\b[^.]*\\bcompliance\\b'
          ];
      const patterns = patternSource.map(p => new RegExp(p, 'gi'));
      const opsAllowlist = ALLOWLIST.c11_ops_exemptions || [];
      const opsAllowKey = new Set(opsAllowlist.map(e => e.file + ':' + e.line));
      // D-01 keyword regex (final form per Plan 01 60-CALIBRATION.md Section B):
      const windowKeywords = /successor|deprecated|historical|disambiguation|mutual-exclusion|mutually\s+exclusive|co-management|migration|transition|replacement|PITFALL-9|first-occurrence|callout|apple-business-side|intune-side|integration-handshake|owned-by-apple-business|owned-by-intune|scope-boundary/i;
      // Scope: all docs/**/*.md (ops-depth is cross-platform)
      const targets = [];
      for (const abs of walkMd('docs')) { targets.push(relNormalize(abs)); }
      const violations = [];
      for (const t of targets) {
        const content = readFile(t);
        if (!content) continue;
        for (const re of patterns) {
          re.lastIndex = 0;
          let m;
          while ((m = re.exec(content)) !== null) {  // RegExp.prototype.exec — not shell exec
            const idx = m.index;
            const lineNum = content.slice(0, idx).split('\n').length;
            if (opsAllowKey.has(t + ':' + lineNum)) continue;
            const wStart = Math.max(0, idx - 200);
            const wEnd = Math.min(content.length, idx + 200 + (m[0] ? m[0].length : 0));
            const window = content.slice(wStart, wEnd);
            if (windowKeywords.test(window)) continue;
            violations.push({ file: t, line: lineNum, pattern: re.source });
          }
        }
      }
      if (violations.length === 0) return { pass: true };
      return {
        pass: false,
        detail: violations.length + ' un-exempted ops-domain anti-pattern hit(s): '
              + violations.slice(0, 3).map(v => v.file + ':' + v.line + ' (' + v.pattern + ')').join(', ')
      };
    }
  },
  {
    id: 12,
    name: 'C12: 4-platform comparison structural validation',
    // AUDIT-04: PROMOTED TO BLOCKING at Phase 58 close (informational flag removed per Plan 58-06).
    // File-existence pre-gate retained at lines below — informational PASS when file absent (Phase 48-57);
    // BLOCKING when file exists (Phase 58+).
    // Link-not-copy: every non-empty data cell (cols 1-5 of canonical 6-col tables) must contain a markdown hyperlink.
    // Plan 58-06 Rule 1 deviation: col-0 (Feature-name row label) excluded from link-bearing requirement
    // per D-01 cell-shape contract — mirrors check-phase-58.mjs V-58-07 extractCanonicalDataCells() logic.
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
      // Link-not-copy check: table rows with non-empty data cells (cols 1-5) must contain [text](link).
      // Restrict to canonical 6-col tables (Feature + 5 platforms) and exclude col-0 (Feature-name row label).
      const tableLines = content.split('\n').filter(l => /^\|/.test(l) && !/^\|[-: ]+\|/.test(l));
      const emptyCells = [];
      for (const line of tableLines) {
        const cells = line.split('|').slice(1, -1);
        // Only canonical 6-col tables (Feature + 5 platforms); skip ancillary 3-col tables (Version History) etc.
        if (cells.length !== 6) continue;
        // Skip the header row itself
        if (cells[0].trim() === 'Feature') continue;
        // Check cols 1-5 only (data cells); col-0 is the row-label / Feature-name (intentionally not link-bearing)
        for (let i = 1; i < 6; i++) {
          const trimmed = cells[i].trim();
          if (trimmed && trimmed !== '—' && trimmed !== 'N/A' && !/\[.+\]\(.+\)/.test(trimmed)) {
            emptyCells.push(trimmed.slice(0, 40));
          }
        }
      }
      if (emptyCells.length > 0) {
        return { pass: false, detail: emptyCells.length + ' cell(s) missing hyperlinks (link-not-copy violation)' };
      }
      // 6 H2-anchor sub-check (D-13 + D-16 — Phase 60 expansion per AUDIT-04 SC#2)
      const h2s = ["## Enrollment", "## Configuration", "## App Deployment", "## Compliance", "## Software Updates", "## Conditional Access"];
      const missing = h2s.filter(h => !new RegExp("^" + h.replace(/[/\\^$*+?.()|[\]{}]/g, "\\$&") + "\\s*$", "m").test(content));
      if (missing.length) return { pass: false, detail: 'Missing H2 anchors: ' + missing.join(', ') };
      return { pass: true, detail: '5 platform columns + all data cells link-bearing + 6 named H2 anchors present' };
    }
  },
  {
    id: 13,
    name: 'C13: Broken-link automation (markdown-link-check)',
    // Phase 60 D-06: PROMOTED to blocking. Allowlist sidecar shape + count assertion against
    // c13_broken_link_allowlist[] (15 entries: 6 transient_external + 9 template_placeholder per D-10).
    // Scope: internal anchor links + relative paths in docs/**/*.md.
    // External MS Learn URL validation explicitly OUT OF SCOPE (REQUIREMENTS.md).
    // Full markdown-link-check tool sweep invoked at CI-level via .github/workflows/audit-harness-v1.5-integrity.yml
    // + Phase 61 fresh-clone re-audit; this harness check verifies the allowlist sidecar shape + category counts
    // match D-10 mandate.
    run() {
      const allowlist = ALLOWLIST.c13_broken_link_allowlist || [];
      if (allowlist.length !== 15) {
        return { pass: false, detail: 'c13_broken_link_allowlist[] expected 15 entries (6 transient_external + 9 template_placeholder), got ' + allowlist.length };
      }
      const transient = allowlist.filter(e => e.category === 'transient_external').length;
      const template = allowlist.filter(e => e.category === 'template_placeholder').length;
      if (transient !== 6 || template !== 9) {
        return { pass: false, detail: 'c13 category counts: ' + transient + ' transient_external (expect 6), ' + template + ' template_placeholder (expect 9)' };
      }
      return { pass: true, detail: '15-entry broken-link allowlist (6 transient_external + 9 template_placeholder) honored; full mlc sweep deferred to CI' };
    }
  },
  {
    id: 14,
    name: 'C14: Rebrand-statement token-set membership at 3 canonical sites',
    // AUDIT-10: BLOCKING from Phase 62 D-A9. Three canonical Apple Business sites must each
    // contain all 3 required tokens within the first 50 lines. Ensures rebrand callout is
    // present and complete (not just mentioning "Apple Business" generically without the date
    // and legacy name).
    run() {
      const C14_FILES = [
        'docs/cross-platform/apple-business/00-overview.md',
        'docs/admin-setup-macos/01-abm-configuration.md',
        'docs/admin-setup-ios/02-abm-token.md',
      ];
      const C14_REQUIRED_TOKENS = ['Apple Business Manager', 'Apple Business', '2026-04-14'];
      const C14_SCAN_LINES = 50;
      const violations = [];
      for (const relPath of C14_FILES) {
        const c = readFile(relPath);
        if (c === null) { violations.push({ file: relPath, missing: ['file not found'] }); continue; }
        const window = c.split('\n').slice(0, C14_SCAN_LINES).join('\n');
        const missing = C14_REQUIRED_TOKENS.filter(t => !window.includes(t));
        if (missing.length > 0) violations.push({ file: relPath, missing });
      }
      if (violations.length === 0) return { pass: true };
      return { pass: false, detail: 'C14 token-set membership failures: ' + JSON.stringify(violations) };
    }
  },
  {
    id: 15,
    name: 'C15: Intune-delegation anti-pattern guard',
    // AUDIT-11: BLOCKING from Phase 62 D-A9. 8-regex banned-phrase list guards against
    // Intune-delegation anti-patterns (OP-10/CI-2/CI-3) leaking into Apple Business docs.
    // HTML-comment allowlist exemption: lines following <!-- ABAUDIT-{##}: ... --> are skipped
    // (this line AND the next line are exempt, per AEAUDIT-04 precedent).
    // Regex 7 note: negative lookahead extended with 'predates|rebrand' to avoid false-positive
    // on the rebrand-mapping table row in _glossary-apple-business.md (legitimate cross-reference context).
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
      const violations = [];
      for (const relPath of appleBusinessDocPaths()) {
        const c = readFile(relPath);
        if (c === null) continue;
        const lines = c.split('\n');
        // Build allowlist line-set from HTML comments matching <!-- ABAUDIT-{##}: ... -->
        const allowlist = new Set();
        lines.forEach((ln, i) => {
          if (/<!--\s*ABAUDIT-\d+:/.test(ln)) {
            allowlist.add(i);
            allowlist.add(i + 1);
          }
        });
        lines.forEach((ln, i) => {
          if (allowlist.has(i)) return;
          for (const rx of C15_BANNED) {
            if (rx.test(ln)) {
              violations.push({ file: relPath, line: i + 1, regex: rx.toString(), match: ln.substring(0, 120) });
              break;
            }
          }
        });
      }
      if (violations.length === 0) return { pass: true };
      return { pass: false, detail: 'C15 banned-phrase matches: ' + violations.length + ' (first: ' + JSON.stringify(violations[0]) + ')' };
    }
  },
  {
    id: 16,
    name: 'C16: 4-edge cross-link integrity triangle (L1 #34 ↔ admin doc ↔ common-issues ↔ quick-ref-l1)',
    // AUDIT-12: BLOCKING from Phase 62 D-A9. Enforces the cross-link triangle connecting
    // L1 #34, the admin context doc, common-issues.md, and quick-ref-l1.md.
    // D-03: exemption via c16_missing_endpoint_exemptions sidecar; each exemption MUST have non-null sunset_phase.
    // At Phase 62: all 4 endpoints are Phase 64/65 deliverables, all exempted via sidecar.
    run() {
      const sidecar = parseAllowlist();
      const exemptions = sidecar.c16_missing_endpoint_exemptions || [];
      // Validate every exemption has non-null sunset_phase (no exemption-forever contract per D-03)
      const badExemptions = exemptions.filter(e => !e.sunset_phase);
      if (badExemptions.length > 0) {
        return { pass: false, detail: 'C16 exemptions missing sunset_phase: ' + JSON.stringify(badExemptions) };
      }
      const exemptFiles = new Set(exemptions.map(e => e.file));
      const endpoints = {
        l1_34: 'docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md',
        admin_12: 'docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md',
        common_issues: 'docs/common-issues.md',
        quick_ref_l1: 'docs/quick-ref-l1.md',
      };
      const edgeMap = {
        l1_34:         { file: endpoints.admin_12, anchor: '12-shared-ipad-passcode-reset' },
        admin_12:      { file: endpoints.l1_34,    anchor: '34-apple-business' },
        common_issues: { file: 'docs/quick-ref-l1.md#apple-business-quick-reference', anchor: '#apple-business-quick-reference' },
        quick_ref_l1:  { file: endpoints.l1_34,    anchor: '34-apple-business' },
      };
      const results = [];
      for (const [key, filePath] of Object.entries(endpoints)) {
        const fileExempted = exemptFiles.has(filePath);
        const anchorExempted = Array.from(exemptFiles).some(ef => ef.startsWith(filePath + '#'));
        if (fileExempted || anchorExempted) {
          const sp = exemptions.find(e => e.file === filePath || e.file.startsWith(filePath + '#'));
          results.push({ edge: key, status: 'EXEMPTED', sunset_phase: sp ? sp.sunset_phase : 'unknown' });
          continue;
        }
        const content = readFile(filePath);
        if (content === null) {
          results.push({ edge: key, status: 'FAIL', reason: 'file missing -- not in c16_missing_endpoint_exemptions' });
          continue;
        }
        const outbound = edgeMap[key];
        if (!content.includes(outbound.anchor) && !content.includes(outbound.file)) {
          results.push({ edge: key, status: 'FAIL', reason: 'missing outbound link to ' + outbound.file });
        } else {
          results.push({ edge: key, status: 'PASS' });
        }
      }
      const failures = results.filter(r => r.status === 'FAIL');
      if (failures.length === 0) return { pass: true, detail: results.map(r => r.edge + ':' + r.status + (r.sunset_phase ? '(sunset=' + r.sunset_phase + ')' : '')).join(' ') };
      return { pass: false, detail: 'C16 edge failures: ' + JSON.stringify(failures) };
    }
  }
];


// ---------------------------------------------------------------------------
// Self-test mode (--self-test): 9 synthetic behavior tests for C14/C15/C16 + '+' separator
// Mirrors regenerate-supervision-pins.mjs --self-test precedent.
// ---------------------------------------------------------------------------
if (SELF_TEST) {
  let selfPassed = 0, selfFailed = 0;
  function selfAssert(testName, condition, detail) {
    if (condition) {
      selfPassed++;
      process.stdout.write('[SELF] PASS ' + testName + '\n');
    } else {
      selfFailed++;
      process.stdout.write('[SELF] FAIL ' + testName + (detail ? ' -- ' + detail : '') + '\n');
    }
  }

  // Synthetic C14 helper
  function c14Synth(fileContent) {
    const C14_REQUIRED_TOKENS = ['Apple Business Manager', 'Apple Business', '2026-04-14'];
    const window = fileContent.split('\n').slice(0, 50).join('\n');
    const missing = C14_REQUIRED_TOKENS.filter(t => !window.includes(t));
    return { pass: missing.length === 0, missing };
  }

  // Test 1: All 3 C14 tokens present -> pass
  const t1content = '# Doc\nApple Business Manager (ABM) became Apple Business on 2026-04-14.\n';
  const t1 = c14Synth(t1content);
  selfAssert('Test 1 C14 all-tokens-present -> pass', t1.pass === true, JSON.stringify(t1));

  // Test 2: Missing "2026-04-14" -> fail
  const t2content = '# Doc\nApple Business Manager (ABM) became Apple Business today.\n';
  const t2 = c14Synth(t2content);
  selfAssert('Test 2 C14 missing-date -> fail', t2.pass === false && t2.missing.includes('2026-04-14'), JSON.stringify(t2));

  // C15 synthetic helper (builds regexes same way as C15 check)
  const C15_BANNED_SYNTH = [
    /\bIntune\s+(RBAC|role|scope\s+tag|admin\s+role)\b/i,
    /\bdelegated\s+admin\b.{0,60}\bIntune\b/i,
    /\b(apple\s+business|apple\s+business\s+manager)\s+(role|privilege|permission)\b.{0,60}\bIntune\s+(role|RBAC)\b/i,
    /\bIntune[-\s]side\b.{0,40}\b(delegat|RBAC|role\s+assign)/i,
    /\bIntune\b.{0,40}\b(controls?|manages?|owns?)\b.{0,40}\b(Apple\s+Business|ABM)\b.{0,40}\bpermission/i,
    /\b(same\s+as|equivalent\s+to|maps\s+to)\s+Intune\s+(RBAC|role)/i,
    /\bManaged\s+Apple\s+ID\b(?!.{0,160}(Microsoft Intune|Intune documentation|continues to use|formerly|legacy|predates|rebrand|renamed|personal|Apple\s+Business|scopes|ABM|account))/i,
    /\bIntune\s+admin\b.{0,60}\b(Apple\s+Business|ABM|Organizational\s+Unit|content\s+token)/i,
  ];
  function c15Synth(fileContent) {
    const lines = fileContent.split('\n');
    const allowlist = new Set();
    lines.forEach((ln, i) => {
      if (/<!--\s*ABAUDIT-\d+:/.test(ln)) { allowlist.add(i); allowlist.add(i + 1); }
    });
    const violations = [];
    lines.forEach((ln, i) => {
      if (allowlist.has(i)) return;
      for (const rx of C15_BANNED_SYNTH) {
        if (rx.test(ln)) { violations.push({ line: i + 1, rx: rx.toString() }); break; }
      }
    });
    return { pass: violations.length === 0, violations };
  }

  // Test 3: "Intune RBAC" -> C15 fail
  const t3 = c15Synth('Use Intune RBAC to assign Apple Business roles.\n');
  selfAssert('Test 3 C15 Intune-RBAC -> fail', t3.pass === false, JSON.stringify(t3.violations));

  // Test 4: "Intune RBAC" with ABAUDIT comment -> C15 pass (exempted)
  const t4 = c15Synth('<!-- ABAUDIT-01: intentional disambiguation -->\nUse Intune RBAC to assign Apple Business roles.\n');
  selfAssert('Test 4 C15 ABAUDIT-exempted Intune-RBAC -> pass', t4.pass === true, JSON.stringify(t4.violations));

  // C16 synthetic helper
  function c16Synth(exemptionsArr) {
    const badExemptions = exemptionsArr.filter(e => !e.sunset_phase);
    if (badExemptions.length > 0) {
      return { pass: false, detail: 'C16 exemptions missing sunset_phase: ' + JSON.stringify(badExemptions) };
    }
    const exemptFiles = new Set(exemptionsArr.map(e => e.file));
    const endpointsList = [
      'docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md',
      'docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md',
      'docs/common-issues.md#apple-business-governance-failure-scenarios',
      'docs/quick-ref-l1.md#apple-business-quick-reference',
    ];
    const failures = [];
    for (const ep of endpointsList) {
      const exempted = exemptFiles.has(ep) || Array.from(exemptFiles).some(ef => ep.startsWith(ef + '#'));
      if (!exempted) failures.push(ep);
    }
    return { pass: failures.length === 0, failures };
  }

  // Test 5: all 4 endpoints in exemptions with sunset_phase -> C16 pass
  const t5 = c16Synth([
    {file: 'docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md', sunset_phase: '65'},
    {file: 'docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md', sunset_phase: '64-65'},
    {file: 'docs/common-issues.md#apple-business-governance-failure-scenarios', sunset_phase: '65'},
    {file: 'docs/quick-ref-l1.md#apple-business-quick-reference', sunset_phase: '65'},
  ]);
  selfAssert('Test 5 C16 all-4-exempted -> pass', t5.pass === true, JSON.stringify(t5));

  // Test 6: exemption without sunset_phase -> C16 fail
  const t6 = c16Synth([
    {file: 'docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md'},
    {file: 'docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md', sunset_phase: '64-65'},
    {file: 'docs/common-issues.md#apple-business-governance-failure-scenarios', sunset_phase: '65'},
    {file: 'docs/quick-ref-l1.md#apple-business-quick-reference', sunset_phase: '65'},
  ]);
  selfAssert('Test 6 C16 exemption-missing-sunset -> fail', t6.pass === false, JSON.stringify(t6));

  // Test 7: parsePlatformValue compound
  const t7 = parsePlatformValue('ios+macos+shared-ipad');
  selfAssert('Test 7 parsePlatformValue compound -> valid+compound',
    t7.valid === true && t7.compound === true && t7.atoms.join(',') === 'ios,macos,shared-ipad',
    JSON.stringify(t7));

  // Test 8: parsePlatformValue unknown atom
  const t8 = parsePlatformValue('ios+notaplatform');
  selfAssert('Test 8 parsePlatformValue unknown-atom -> invalid',
    t8.valid === false && /unknown platform atoms/.test(t8.error),
    JSON.stringify(t8));

  // Test 9: parsePlatformValue single atom (backward-compat)
  const t9 = parsePlatformValue('ios');
  selfAssert('Test 9 parsePlatformValue single-atom -> valid+not-compound',
    t9.valid === true && t9.compound === false && t9.atoms[0] === 'ios',
    JSON.stringify(t9));

  process.stdout.write('\nSelf-test: ' + selfPassed + ' passed, ' + selfFailed + ' failed\n');
  process.exit(selfFailed > 0 ? 1 : 0);
}


// ---------------------------------------------------------------------------
// Runner (pattern from check-phase-30.mjs lines 303-337, adapted to always show C3 detail per D-25)
// ---------------------------------------------------------------------------

const LABEL_WIDTH = 60;
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
