#!/usr/bin/env node
// scripts/archive/extract-summary-oneliners.mjs
//
// Vendored extractOneLinerFromBody — fixes upstream regex defect at
//   C:\Users\joanderson\AppData\Roaming\npm\node_modules\get-shit-done-cc\sdk\src\query\phase-lifecycle-policy.ts:54-58
//
// Upstream defect: a regex that opens-bold, captures non-asterisk run, closes-bold (rather
//   than anchoring on the literal label between the bold markers) captures the bolded LABEL
//   (e.g., "One-liner:") instead of the VALUE that follows it. The caller at
//   C:\Users\joanderson\AppData\Roaming\npm\node_modules\get-shit-done-cc\sdk\src\query\phase-lifecycle.ts:1693
//   prefers frontmatter `one-liner:` over body-extraction:
//     const oneLiner = (fm['one-liner'] as string | undefined) || extractOneLinerFromBody(content);
//   ALL 97 archived SUMMARY.md files in this repo use inline **One-liner:** body pattern;
//   ZERO have frontmatter one-liner. The --pre-write-frontmatter mode injects the frontmatter
//   key so the caller's frontmatter-wins branch fires (routing around the still-broken upstream
//   fallback).
//
// Vendored fix: /^#[^\n]*\r?\n+\*\*One-liner:\*\*\s+([^\r\n]+)/m captures the VALUE.
//
// Upstream PR follow-up tracked as ARCHIVE-UPSTREAM-01 in v1.8-DEFERRED-CLEANUP.md
// (Phase 71 Plan 71-03 drafts the stub; Phase 74 HARNESS-12 finalizes the artifact).
// When upstream releases corrected version + Autopilot pins to it, this vendored script
// can be deprecated in v1.9+.
//
// CLI surface (4 flags; mutually exclusive modes; exit-code-2 on usage error):
//   --milestone <v>            Identify milestone's SUMMARY.md files to scan (e.g. v1.8)
//                              Regex-validated against /^v\d+\.\d+(\.\d+)?$/ (Security Domain V5)
//   --pre-write-frontmatter    Write one-liner: <value> into frontmatter (idempotent)
//   --dry-run                  Combine with --pre-write-frontmatter to print without writing
//   --self-test                Run 3 internal fixtures; exit 0 on PASS, 1 on FAIL
//
// Exit-code contract:
//   0 = success / all-PASS
//   1 = errors > 0 OR any --self-test fixture FAIL
//   2 = usage error (missing/invalid CLI args)

import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const argv = process.argv.slice(2);

// === Vendored extractor (the actual fix) ===
export function extractOneLinerFromBody(content) {
  if (!content) return null;
  // Normalize CRLF -> LF up-front so the regex's `\n+` cleanly traverses blank lines
  // between the heading and the `**One-liner:**` label on Windows-authored SUMMARY files.
  // The corrected regex literal below is preserved exactly per LOCKED contract item #5.
  const normalized = content.replace(/\r\n/g, '\n');
  const body = normalized.replace(/^---\n[\s\S]*?\n---\n*/, '');
  // CORRECTED REGEX: anchor on literal "**One-liner:**" label, capture text up to EOL.
  // Original buggy version captured the LABEL by greedy-matching the non-asterisk run
  // between the bold markers; this version anchors on the literal label text.
  const match = body.match(/^#[^\n]*\r?\n+\*\*One-liner:\*\*\s+([^\r\n]+)/m);
  return match ? match[1].trim() : null;
}

// === Frontmatter helpers ===
export function extractFrontmatter(content) {
  if (!content) return { hasFrontmatter: false, fm: {}, raw: '' };
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) return { hasFrontmatter: false, fm: {}, raw: '' };
  const raw = fmMatch[1];
  const fm = {};
  // Lightweight YAML scalar parse — mirrors gsd-sdk extractFrontmatter scalar-only handling
  // (top-level key: value pairs; nested mappings ignored). See RESEARCH §Pitfall 2.
  for (const line of raw.split(/\r?\n/)) {
    const kv = line.match(/^([a-zA-Z_-]+):\s*(.*)$/);
    if (kv) {
      let v = kv[2].trim();
      // Strip surrounding quotes if present
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      fm[kv[1]] = v;
    }
  }
  return { hasFrontmatter: true, fm, raw };
}

export function hasFrontmatterOneLiner(content) {
  const { hasFrontmatter, fm } = extractFrontmatter(content);
  return hasFrontmatter && typeof fm['one-liner'] === 'string' && fm['one-liner'].length > 0;
}

export function preWriteFrontmatterOneLiner(content, oneLiner) {
  // Idempotency contract: if one-liner: already present, return content UNCHANGED.
  if (hasFrontmatterOneLiner(content)) return content;
  if (!oneLiner) return content;
  const escaped = String(oneLiner).replace(/"/g, '\\"');
  const fmMatch = content.match(/^(---\r?\n)([\s\S]*?)(\r?\n---)/);
  if (!fmMatch) {
    // No frontmatter — prepend one. Detect EOL convention from existing content.
    const eol = content.includes('\r\n') ? '\r\n' : '\n';
    return `---${eol}one-liner: "${escaped}"${eol}---${eol}${eol}${content}`;
  }
  // Frontmatter exists but no one-liner key — inject as LAST field.
  const fmHead = fmMatch[1];
  const fmBody = fmMatch[2];
  const fmTail = fmMatch[3];
  const eol = fmHead.includes('\r\n') ? '\r\n' : '\n';
  // Trim trailing newlines from fmBody to avoid blank lines between last field and the new one.
  const trimmed = fmBody.replace(/[\r\n]+$/, '');
  const newFm = `${fmHead}${trimmed}${eol}one-liner: "${escaped}"${fmTail}`;
  return content.slice(0, fmMatch.index) + newFm + content.slice(fmMatch.index + fmMatch[0].length);
}

// === SUMMARY enumeration ===
// Mirror gsd-sdk phase-lifecycle.ts:1677-1685 walk:
//   .planning/phases/<phase-dir>/{NN-,}SUMMARY.md  (live milestone)
//   .planning/milestones/<milestone>-phases/<phase-dir>/{NN-,}SUMMARY.md  (archived)
function listSummaryFilesForMilestone(milestone) {
  const cwd = process.cwd();
  const liveRoot = join(cwd, '.planning', 'phases');
  const archivedRoot = join(cwd, '.planning', 'milestones', `${milestone}-phases`);
  const roots = [liveRoot, archivedRoot].filter(r => existsSync(r));
  const out = [];
  for (const root of roots) {
    let entries;
    try {
      entries = readdirSync(root);
    } catch {
      continue;
    }
    for (const dir of entries) {
      const phaseDir = join(root, dir);
      let st;
      try { st = statSync(phaseDir); } catch { continue; }
      if (!st.isDirectory()) continue;
      let files;
      try { files = readdirSync(phaseDir); } catch { continue; }
      for (const f of files) {
        if (f.endsWith('-SUMMARY.md') || f === 'SUMMARY.md') {
          out.push(join(phaseDir, f));
        }
      }
    }
  }
  return out;
}

// === --self-test mode (3 fixtures) ===
function selfTest() {
  let failed = 0;

  // Fixture 1: label-not-captured (the actual bug)
  const f1Input = `---\nphase: 67-x\n---\n\n# Phase 67 Plan 01: SWEEP Summary\n\n**One-liner:** Verified 4 ABM URLs alive via cron-pinned markdown-link-check\n\n## What Was Built\n`;
  const f1Got = extractOneLinerFromBody(f1Input);
  const f1Expect = 'Verified 4 ABM URLs alive via cron-pinned markdown-link-check';
  if (f1Got !== f1Expect) {
    console.error(`Fixture 1 FAIL (label-not-captured): expected ${JSON.stringify(f1Expect)}, got ${JSON.stringify(f1Got)}`);
    failed++;
  }

  // Fixture 2: pre-write idempotency
  const f2Before = `---\nphase: x\none-liner: "Already set"\n---\n\n# Title\n\n**One-liner:** ignored body value\n`;
  const f2After = preWriteFrontmatterOneLiner(f2Before, 'should not appear');
  if (f2After !== f2Before) {
    console.error(`Fixture 2 FAIL (idempotency): pre-write modified content despite existing frontmatter one-liner`);
    failed++;
  }

  // Fixture 3: placeholder-allowlist scan against synthetic clean content (no debris)
  const PLACEHOLDER_TOKENS = [
    'One-liner:', 'SUBSUMED BY PLAN', 'Hash:', 'Pre-edit:', 'Total file size:',
    'File:', 'Insertion position:', 'Single deliverable:', 'Plan goal:', 'Found during:',
    'Edit \\d+ --',
  ];
  const escaped = PLACEHOLDER_TOKENS.map(t =>
    t === 'Edit \\d+ --' ? t : t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  ).join('|');
  const re = new RegExp('^- (?:' + escaped + ')', 'gm');
  const f3Clean = `## v1.8 (Shipped)\n\n**Key accomplishments:**\n- Verified ABM URLs alive\n- Cross-platform navigation\n- The one-liner field in frontmatter is parsed first\n`;
  const f3CleanHits = (f3Clean.match(re) || []).length;
  if (f3CleanHits !== 0) {
    console.error(`Fixture 3 FAIL (allowlist scan, clean): expected 0 placeholder bullets in clean synthetic, got ${f3CleanHits}`);
    failed++;
  }
  // Also assert positive detection on synthetic dirty content with exactly 1 bullet match
  const f3Dirty = `## v1.X dirty H2\n\n**Key accomplishments:**\n- One-liner: placeholder bullet\n- legitimate prose mention of One-liner: should not match (not bullet-anchored)\n`;
  const f3DirtyHits = (f3Dirty.match(re) || []).length;
  if (f3DirtyHits !== 1) {
    console.error(`Fixture 3 FAIL (allowlist scan, dirty): expected exactly 1 placeholder bullet, got ${f3DirtyHits}`);
    failed++;
  }

  console.log(failed === 0 ? '3 fixtures PASS' : `${failed} fixture(s) FAILED`);
  process.exit(failed === 0 ? 0 : 1);
}

// === Main CLI ===
function main() {
  if (argv.includes('--self-test')) return selfTest();

  const mIdx = argv.indexOf('--milestone');
  if (mIdx === -1 || mIdx === argv.length - 1) {
    console.error('Usage: extract-summary-oneliners.mjs --milestone <v> [--pre-write-frontmatter] [--dry-run] | --self-test');
    process.exit(2);
  }
  const milestone = argv[mIdx + 1];
  // Security Domain V5: input validation against path-traversal in listSummaryFilesForMilestone()
  if (!/^v\d+\.\d+(\.\d+)?$/.test(milestone)) {
    console.error(`Invalid --milestone format: ${JSON.stringify(milestone)} (expected vN.N or vN.N.N)`);
    process.exit(2);
  }
  const preWrite = argv.includes('--pre-write-frontmatter');
  const dryRun = argv.includes('--dry-run');

  const files = listSummaryFilesForMilestone(milestone);
  let scanned = 0, alreadyOK = 0, updated = 0, skippedNoValue = 0, errors = 0;
  for (const f of files) {
    scanned++;
    try {
      const content = readFileSync(f, 'utf8');
      if (hasFrontmatterOneLiner(content)) { alreadyOK++; continue; }
      const value = extractOneLinerFromBody(content);
      if (!value) { skippedNoValue++; continue; }
      if (!preWrite) {
        // Scan-only mode: just count what would be updated
        continue;
      }
      const newContent = preWriteFrontmatterOneLiner(content, value);
      if (newContent === content) { alreadyOK++; continue; }
      if (!dryRun) writeFileSync(f, newContent, 'utf8');
      updated++;
    } catch (err) {
      errors++;
      console.error(`ERROR ${f}: ${err.message}`);
    }
  }
  const dryFlag = dryRun ? ' [DRY-RUN]' : '';
  console.log(`milestone=${milestone} scanned=${scanned} alreadyOK=${alreadyOK} updated=${updated} skipped-no-value=${skippedNoValue} errors=${errors}${dryFlag}`);
  process.exit(errors > 0 ? 1 : 0);
}

// Only run main() when invoked directly via CLI (not when imported by test fixture).
// Mirrors Node's import.meta.url === file:// check; comparison handles Windows path quirks.
import { fileURLToPath } from 'node:url';
import { resolve as pathResolve } from 'node:path';
const __filename = fileURLToPath(import.meta.url);
const invokedAs = process.argv[1] ? pathResolve(process.argv[1]) : '';
if (__filename === invokedAs) {
  main();
}
