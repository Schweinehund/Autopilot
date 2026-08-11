#!/usr/bin/env node
// c17-eee-contract.mjs -- EEE document contract validator (Phase 115 HARN-01 SC1)
//
// Asserts the 13-assertion EEE contract on all enrolled Markdown files under docs/.
// A file is enrolled iff its YAML frontmatter contains a doc_id key AND its path
// starts with docs/. Un-enrolled files are silently skipped (not a violation).
//
// D-04 analog: This script is the Phase-119 seed for v1.15-milestone-audit.mjs C17 (Atom 1).
// Keep it standalone now; the audit-fold is Phase 119's job.
//
// Usage:  node scripts/validation/c17-eee-contract.mjs [--self-test] [--verbose]
// Exit 0: all enrolled files pass all 13 assertions (or no enrolled files found)
// Exit 1: any assertion violation

// Node built-ins ONLY -- zero external npm packages (matches scripts/validation/ convention)
import { readFileSync, existsSync, readdirSync, lstatSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');
const SELF_TEST = argv.includes('--self-test');

// D1 map: 20 entries verbatim from docs/_standards/EEE-SOP-standard.md §D1 (Phase 114 output)
// Hard-failure on unmapped value (D-09 / META-03 — no fallback; assertion #10)
const D1_MAP = {
  'Windows':                      'Windows',
  'windows':                      'Windows',
  'macOS':                        'macOS',
  'macos':                        'macOS',
  'iOS':                          'iOS',
  'ios':                          'iOS',
  'Android':                      'Android',
  'android':                      'Android',
  'Linux':                        'Linux',
  'linux':                        'Linux',
  'all':                          'All Platforms',
  'windows+macos+ios+android+linux': 'All Platforms',
  'cross-platform':               'Cross-Platform',
  'apple-tv':                     'Apple TV',
  'iOS,Android':                  'iOS + Android',
  'ios+macos':                    'iOS + macOS',
  'ios+ipados+macos':             'iOS / iPadOS / macOS',
  'ios+ipados+macos+tvos':        'iOS / iPadOS / macOS / tvOS',
  'ios+macos+shared-ipad':        'iOS + macOS + Shared iPad',
  'ios+shared-ipad':              'iOS + Shared iPad',
};

const VALID_STATUSES = new Set(['Draft', 'Approved', 'Superseded']);

// ── Helpers (verbatim from scripts/validation/v1.14-milestone-audit.mjs) ────────────────────

const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

// readFile: returns content with CRLF normalized, or null if missing.
// CRLF normalization is mandatory — Windows repo files contain \r\n.
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}

// walkMd: recursive .md file walker (verbatim from v1.14-milestone-audit.mjs lines 56-74)
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
      try { stat = lstatSync(full); } catch { continue; }
      if (stat.isSymbolicLink()) continue; // do not follow; avoids infinite recursion on symlink cycles
      if (stat.isDirectory()) { walk(full); }
      else if (entry.endsWith('.md')) { results.push(full); }
    }
  }
  walk(abs);
  return results;
}

// relNormalize: strip CWD prefix and normalize backslashes to forward-slashes.
function relNormalize(abs) {
  return abs
    .replace(process.cwd() + '\\', '')
    .replace(process.cwd() + '/', '')
    .replace(/\\/g, '/');
}

// ── checkFile: all 13 assertions (indivisible atom — SC1/HARN-01) ────────────────────────────
//
// Returns [{assertion: number, detail: string}, ...]. Never returns early on the first
// violation (D-03 3C aggregate). Caller must iterate all violations.
//
// Assertions:
//  #1  No Mermaid fences
//  #2  Exactly one H1; appears after block line
//  #3  H1 text ≠ bare RE-\d+
//  #4  ## Summary is first H2; no H2/H3 between block line and Summary
//  #5  ## Summary prose ≥ 30 words
//  #6  Block is single inline paragraph (not a table)
//  #7  Platform + Doc Type are first two block fields (114-CONTEXT D-05)
//  #8  Required frontmatter keys present with non-empty values
//  #9  Block field values match frontmatter (SKIPPED for TEMPLATE-SENTINEL)
//  #10 platform resolves in D1_MAP — HARD FAILURE on unmapped (no fallback)
//  #11 Tables >25 rows have prose summary within 5 lines
//  #12 Gate blockquote (if present) ≤ 200 chars (SKIPPED for TEMPLATE-SENTINEL)
//  #13 status ∈ {Draft, Approved, Superseded}

function checkFile(relPath, content) {
  const violations = [];

  // ── Frontmatter extraction ────────────────────────────────────────────────────────────────
  // Multiline flag: ^ matches --- at ANY line boundary → HTML-comment preamble transparent.
  // Never use content.startsWith('---') — all 7 templates start with <!-- comment --> (Pitfall 1).
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/m);
  if (!fmMatch) return violations; // no frontmatter — not enrolled; nothing to assert

  const fm = fmMatch[1];

  // Per-key extraction (allow inline # comments after value)
  const docIdMatch    = fm.match(/^doc_id:\s*(.+?)\s*(#.*)?$/m);
  const statusMatch   = fm.match(/^status:\s*(.+?)\s*(#.*)?$/m);
  const ownerMatch    = fm.match(/^owner:\s*(.+?)\s*(#.*)?$/m);
  const docTypeMatch  = fm.match(/^doc_type:\s*(.+?)\s*(#.*)?$/m);
  const platformMatch = fm.match(/^platform:\s*(.+?)\s*(#.*)?$/m);
  const lvMatch       = fm.match(/^last_verified:\s*(\d{4}-\d{2}-\d{2})\s*(#.*)?$/m);

  // TEMPLATE-SENTINEL: 1970-01-01 → authoring scaffold; skips #9 and #12
  // Pattern: v1.14-milestone-audit.mjs:402,539 — same established sentinel skip idiom
  const isTemplate = !!(lvMatch && lvMatch[1] === '1970-01-01');

  // ── Body extraction (after closing ---) ────────────────────────────────────────────────────
  // +1 skips the \n following the closing --- (Pitfall 2: without it, bodyLines[0] is empty
  // and block-line detection may return --- as the "block").
  const bodyStart = fmMatch.index + fmMatch[0].length + 1;
  const body = content.slice(bodyStart);
  const bodyLines = body.split('\n');

  // ── Code-fence membership map ──────────────────────────────────────────────────────────────
  // Lines inside a code fence (``` or ~~~) must be excluded from heading checks (#2,#3,#4,#5)
  // so that H1/H2 examples inside code blocks (e.g. EEE-SOP-standard.md example section,
  // l2-template.md powershell fences) do not trigger false violations.
  // LINK-05 (Phase 143, D-16/D-21): ` {0,3}` leading allowance is the CommonMark
  // indented-fence rule, copied verbatim from check-nav-hub-links.mjs:85-112
  // (buildFenceMask, the reference instance).
  const inCodeFence = (() => {
    const mask = new Array(bodyLines.length).fill(false);
    let fenced = false;
    let fenceChar = '';
    let fenceLen = 0;
    for (let i = 0; i < bodyLines.length; i++) {
      const t = bodyLines[i];
      if (!fenced) {
        const m = t.match(/^ {0,3}(`{3,}|~{3,})/);
        if (m) {
          fenced = true;
          fenceChar = m[1][0];
          fenceLen = m[1].length;
          // Opening fence line is a structural marker — not "inside"
        }
      } else {
        const m = t.match(/^ {0,3}(`{3,}|~{3,})/);
        if (m && m[1][0] === fenceChar && m[1].length >= fenceLen) {
          fenced = false;
          // Closing fence line is a structural marker — not "inside"
        } else {
          mask[i] = true;
        }
      }
    }
    return mask;
  })();

  // ── Block line detection ────────────────────────────────────────────────────────────────────
  // First non-blank line of body = the EEE header block line.
  const blockLineIdx = bodyLines.findIndex(l => l.trim() !== '');
  const blockLine    = blockLineIdx !== -1 ? bodyLines[blockLineIdx].trim() : '';

  // Next non-blank after the block (used by assertion #6)
  const nextNonBlankAfterBlock = blockLineIdx !== -1
    ? bodyLines.slice(blockLineIdx + 1).find(l => l.trim() !== '') ?? ''
    : '';

  // ── Block field parsing ─────────────────────────────────────────────────────────────────────
  // Strip ** bold markers FIRST (Pitfall 3: must precede · split or : inside **Label:** is
  // misread as the field separator). Then split on · U+00B7 middle-dot.
  const normalizedBlock = blockLine.replace(/\*\*/g, '');
  const rawBlockFields = normalizedBlock.split('·').map(f => f.trim());
  const parseField = (field) => {
    const colonIdx = field.indexOf(':');
    return colonIdx === -1
      ? { key: field.trim(), value: '' }
      : { key: field.slice(0, colonIdx).trim(), value: field.slice(colonIdx + 1).trim() };
  };
  const parsedFields = rawBlockFields.map(parseField);

  // ── Assertion #1: No Mermaid fences ────────────────────────────────────────────────────────
  // Use bodyLines + inCodeFence mask (not raw content) so a ```mermaid *example* shown inside
  // a ```markdown or ```text fence does not trigger a false positive.  The opening fence line
  // itself is NOT marked inCodeFence (by design), so a real ```mermaid fence that opens
  // outside any enclosing fence is still correctly detected.
  // [v1.16 Phase-120 addition, comment-only]: policy + rationale for why this stays a hard-fail
  // (text-equivalent conversion, not a carve-out) documented in
  // docs/_standards/EEE-SOP-standard.md § "Mermaid-in-Enrolled-Classes Policy" (STD-04).
  const hasMermaid = bodyLines.some((l, i) => !inCodeFence[i] && /^```mermaid/.test(l));
  if (hasMermaid) {
    violations.push({ assertion: 1, detail: 'Mermaid code fence found (```mermaid)' });
  }

  // ── Assertion #2: Exactly one H1; H1 appears after block line ──────────────────────────────
  // Exclude H1 patterns inside code fences (e.g. EEE-SOP example, l2 powershell block)
  const h1Lines = bodyLines.filter((l, i) => /^# [^#]/.test(l) && !inCodeFence[i]);
  if (h1Lines.length !== 1) {
    violations.push({ assertion: 2, detail: `Expected exactly 1 H1, found ${h1Lines.length}` });
  } else {
    const h1Idx = bodyLines.findIndex((l, i) => /^# [^#]/.test(l) && !inCodeFence[i]);
    if (h1Idx <= blockLineIdx) {
      violations.push({ assertion: 2, detail: `H1 at body-line ${h1Idx} does not appear after block line (${blockLineIdx})` });
    }
  }

  // ── Assertion #3: H1 text ≠ bare RE-\d+ ────────────────────────────────────────────────────
  if (h1Lines.length === 1) {
    const h1Text = h1Lines[0].replace(/^# /, '').trim();
    if (/^RE-\d+$/.test(h1Text)) {
      violations.push({ assertion: 3, detail: `H1 text is a bare doc-ID pattern: "${h1Text}"` });
    }
  }

  // ── Assertions #4 + #5: Summary location and word count ────────────────────────────────────
  // Exclude fenced lines from H2 detection (code blocks may contain ## headings in examples)
  const summaryIdx = bodyLines.findIndex((l, i) => /^## Summary\b/.test(l) && !inCodeFence[i]);
  if (summaryIdx === -1) {
    violations.push({ assertion: 4, detail: '## Summary heading not found in body' });
    violations.push({ assertion: 5, detail: '## Summary not found (cannot count words)' });
  } else {
    // #4a: ## Summary must be the first H2 in body (excluding fenced lines)
    const firstH2Idx = bodyLines.findIndex((l, i) => /^## /.test(l) && !inCodeFence[i]);
    if (firstH2Idx !== summaryIdx) {
      const firstH2 = bodyLines[firstH2Idx]?.trim() ?? '';
      violations.push({ assertion: 4, detail: `## Summary is not the first H2; found "${firstH2}" before it` });
    }

    // #4b: No H3 headings between block line and ## Summary (H2s caught by #4a)
    const effectiveBlockEnd = blockLineIdx !== -1 ? blockLineIdx + 1 : 0;
    for (let i = effectiveBlockEnd; i < summaryIdx; i++) {
      if (!inCodeFence[i] && /^### /.test(bodyLines[i])) {
        violations.push({ assertion: 4, detail: `H3 heading between block and ## Summary: "${bodyLines[i].trim()}"` });
        break; // one H3 violation per file is enough for this assertion
      }
    }

    // #5: ## Summary prose >= 30 words (count lines from Summary+1 to next ## outside fences)
    // Skip lines inside code fences so code tokens do not inflate the prose word count.
    const sumBodyLines = [];
    for (let i = summaryIdx + 1; i < bodyLines.length; i++) {
      if (!inCodeFence[i] && /^## /.test(bodyLines[i])) break;
      if (!inCodeFence[i]) sumBodyLines.push(bodyLines[i]); // skip fenced lines
    }
    const wordCount = sumBodyLines.join(' ').split(/\s+/).filter(Boolean).length;
    if (wordCount < 30) {
      violations.push({ assertion: 5, detail: `## Summary has ${wordCount} word${wordCount !== 1 ? 's' : ''}, need ≥30` });
    }
  }

  // ── Assertion #6: Block is single inline paragraph (not table) ─────────────────────────────
  if (blockLine.startsWith('|') || /^\|[-: |]/.test(nextNonBlankAfterBlock)) {
    violations.push({ assertion: 6, detail: 'Header block appears to be a table row, not an inline paragraph' });
  }

  // ── Assertion #7: Platform + Doc Type are first two block fields (114-CONTEXT D-05) ─────────
  // owner is NEVER in the block. Operative check: first key = "platform", second = "doc type".
  {
    const firstKey  = parsedFields[0]?.key?.toLowerCase() ?? '';
    const secondKey = parsedFields[1]?.key?.toLowerCase() ?? '';
    if (firstKey !== 'platform' || secondKey !== 'doc type') {
      violations.push({ assertion: 7, detail: `Block fields must start with Platform · Doc Type; got "${parsedFields[0]?.key ?? ''}" · "${parsedFields[1]?.key ?? ''}"` });
    }
  }

  // ── Assertion #8: Required frontmatter keys present with non-empty values ───────────────────
  {
    const missing = [];
    if (!docIdMatch   || !docIdMatch[1])   missing.push('doc_id');
    if (!statusMatch  || !statusMatch[1])  missing.push('status');
    if (!ownerMatch   || !ownerMatch[1])   missing.push('owner');
    if (!docTypeMatch || !docTypeMatch[1]) missing.push('doc_type');
    if (!lvMatch      || !lvMatch[1])      missing.push('last_verified');
    if (missing.length > 0) {
      violations.push({ assertion: 8, detail: `Missing or empty required frontmatter keys: ${missing.join(', ')}` });
    }
  }

  // ── Assertion #9: Block field values match frontmatter (SKIP for TEMPLATE-SENTINEL) ─────────
  // TEMPLATE-SENTINEL files (last_verified: 1970-01-01) carry placeholder doc_id: RE-[FILL-IN]
  // which must NOT be compared to the block's RE-[NNN]. Skip entirely (Pitfall 4).
  if (!isTemplate) {
    const platformRaw = platformMatch?.[1];
    const platformLabel = platformRaw !== undefined ? D1_MAP[platformRaw] : undefined;
    const docType = docTypeMatch?.[1];
    const docId   = docIdMatch?.[1];
    const status  = statusMatch?.[1];

    // Block field 0: Platform (via D1 normalization)
    if (platformLabel !== undefined && parsedFields.length >= 1) {
      if (parsedFields[0].value !== platformLabel) {
        violations.push({ assertion: 9, detail: `Block Platform "${parsedFields[0].value}" ≠ D1 label "${platformLabel}" (platform: ${platformRaw})` });
      }
    }
    // Block field 1: Doc Type
    if (docType !== undefined && parsedFields.length >= 2) {
      if (parsedFields[1].value !== docType) {
        violations.push({ assertion: 9, detail: `Block Doc Type "${parsedFields[1].value}" ≠ frontmatter doc_type "${docType}"` });
      }
    }
    // Block field 2: Doc ID
    if (docId !== undefined && parsedFields.length >= 3) {
      if (parsedFields[2].value !== docId) {
        violations.push({ assertion: 9, detail: `Block Doc ID "${parsedFields[2].value}" ≠ frontmatter doc_id "${docId}"` });
      }
    }
    // Block field 3: Status (owner is never a block field — not checked here)
    if (status !== undefined && parsedFields.length >= 4) {
      if (parsedFields[3].value !== status) {
        violations.push({ assertion: 9, detail: `Block Status "${parsedFields[3].value}" ≠ frontmatter status "${status}"` });
      }
    }
  }

  // ── Assertion #10: platform resolves in D1_MAP — HARD FAILURE on unmapped (D-09, no fallback) ─
  {
    const platformRaw = platformMatch?.[1];
    if (platformRaw === undefined) {
      violations.push({ assertion: 10, detail: 'platform key is absent from frontmatter — required for D1 resolution' });
    } else if (!platformRaw || !(platformRaw in D1_MAP)) {
      violations.push({ assertion: 10, detail: `platform: "${platformRaw}" is not in the D1 map — unmapped value is a hard failure` });
    }
  }

  // ── Assertion #11: Tables >25 rows have prose summary within 5 lines ───────────────────────
  // Exclude separator rows /^\|[-: |]+\|$/ from count (Pitfall 8). Scan 5 lines after table
  // for a non-blank prose line (not |, #, >, code-fence).
  {
    const isSeparator = (line) => /^\|[-: |]+\|$/.test(line);
    let i = 0;
    while (i < bodyLines.length) {
      const trimmed = bodyLines[i].trim();
      if (!inCodeFence[i] && trimmed.startsWith('|')) {
        const tableStart = i;
        let dataRows = 0;
        while (i < bodyLines.length && !inCodeFence[i] && bodyLines[i].trim().startsWith('|')) {
          if (!isSeparator(bodyLines[i].trim())) {
            dataRows++;
          }
          i++;
        }
        if (dataRows > 25) {
          // Scan up to 5 lines after table end for a prose summary line
          let hasProse = false;
          const scanEnd = Math.min(i + 5, bodyLines.length);
          for (let j = i; j < scanEnd; j++) {
            const sl = bodyLines[j].trim();
            if (sl &&
                !sl.startsWith('|') &&
                !sl.startsWith('#') &&
                !sl.startsWith('>') &&
                !sl.startsWith('```')) {
              hasProse = true;
              break;
            }
          }
          if (!hasProse) {
            violations.push({ assertion: 11, detail: `Table with ${dataRows} data rows at body line ${tableStart + 1} has no prose summary within 5 lines` });
          }
        }
      } else {
        i++;
      }
    }
  }

  // ── Assertion #12: Gate blockquote (if present) ≤ 200 chars — SKIP for TEMPLATE-SENTINEL ───
  // TEMPLATE-SENTINEL skip: template blockquotes are intentionally verbose authoring
  // instructions (e.g., reference-template.md ~224-char example, admin templates ~230-450 chars)
  // and are scaffold content, not corpus blockquotes. Sentinel skip is consistent with #9 skip.
  if (!isTemplate) {
    let i = 0;
    while (i < bodyLines.length) {
      if (!inCodeFence[i] && /^>/.test(bodyLines[i])) {
        // Collect consecutive blockquote lines
        const bqLines = [];
        while (i < bodyLines.length && !inCodeFence[i] && /^>/.test(bodyLines[i])) {
          bqLines.push(bodyLines[i].replace(/^>\s?/, '')); // strip > prefix (Pitfall 6)
          i++;
        }
        const bqText = bqLines.join(' ');
        if (bqText.length > 200) {
          violations.push({ assertion: 12, detail: `Blockquote exceeds 200 chars (${bqText.length} chars)` });
        }
      } else {
        i++;
      }
    }
  }

  // ── Assertion #13: status ∈ {Draft, Approved, Superseded} ──────────────────────────────────
  {
    const status = statusMatch?.[1];
    if (status && !VALID_STATUSES.has(status)) {
      violations.push({ assertion: 13, detail: `status: "${status}" not in {Draft, Approved, Superseded}` });
    }
  }

  return violations;
}

// ── Self-test mode (guard-docx.mjs --self-test analog) ───────────────────────────────────────
if (SELF_TEST) {
  let stPassed = 0, stFailed = 0;

  function stAssert(label, pass, detail) {
    const tag = pass ? 'PASS' : 'FAIL';
    process.stdout.write(padLabel('[ST] ' + label) + tag +
      (detail ? ' -- ' + detail : '') + '\n');
    if (pass) stPassed++; else stFailed++;
  }

  // Sub-test A: passing fixture → 0 violations
  const passingContent = readFile('scripts/validation/c17-fixtures/c17-fixture-passing.md');
  if (!passingContent) {
    stAssert('Fixture-passing: 0 violations (exit 0 equivalent)', false, 'fixture file not found');
  } else {
    const pv = checkFile('c17-fixture-passing.md', passingContent);
    stAssert(
      'Fixture-passing: 0 violations (exit 0 equivalent)',
      pv.length === 0,
      pv.length === 0 ? 'got 0 violations' : 'got ' + pv.length + ' violation(s): ' + pv.map(v => '#' + v.assertion + ' ' + v.detail).join('; ')
    );
  }

  // Sub-test B: failing fixture → ≥1 violation
  const failingContent = readFile('scripts/validation/c17-fixtures/c17-fixture-failing.md');
  if (!failingContent) {
    stAssert('Fixture-failing: ≥1 violation (exit 1 equivalent)', false, 'fixture file not found');
  } else {
    const fv = checkFile('c17-fixture-failing.md', failingContent);
    stAssert(
      'Fixture-failing: ≥1 violation (exit 1 equivalent)',
      fv.length > 0,
      fv.length > 0 ? 'got ' + fv.length + ' violation(s): ' + fv.map(v => '#' + v.assertion).join(',') : 'got 0 violations (fixture should fail)'
    );
  }

  // Sub-test C: D1 map hard-failure — unmapped platform → assertion #10 must fire
  const syntheticBadPlatform = [
    '---',
    'doc_id: TST-001',
    'status: Draft',
    'owner: tester',
    'doc_type: Runbook',
    'platform: UnknownOS',
    'last_verified: 2026-01-01',
    '---',
    '',
    '**Platform:** Unknown · **Doc Type:** Runbook · **Doc ID:** TST-001 · **Status:** Draft',
    '',
    '# Synthetic Test Title for D1 Map Check',
    '',
    '## Summary',
    '',
    'This synthetic document exercises assertion ten of the C17 EEE contract validator.',
    'The platform value UnknownOS is not in the D1 normalization map so assertion ten',
    'must fire a hard failure indicating an unmapped platform value was encountered.',
  ].join('\n');
  const bpv = checkFile('synthetic-bad-platform.md', syntheticBadPlatform);
  stAssert(
    'D1 map: unmapped platform "UnknownOS" → assertion #10 fires',
    bpv.some(v => v.assertion === 10),
    'violations: [' + bpv.map(v => '#' + v.assertion).join(',') + ']'
  );

  // Sub-test D: TEMPLATE-SENTINEL skip — sentinel file skips assertion #9 equality
  const syntheticTemplate = [
    '---',
    'doc_id: RE-[FILL-IN]',
    'status: Draft',
    'owner: [FILL-IN]',
    'doc_type: Runbook',
    'platform: all',
    'last_verified: 1970-01-01 # TEMPLATE-SENTINEL',
    'review_by: YYYY-MM-DD',
    '---',
    '',
    '**Platform:** All Platforms · **Doc Type:** Runbook · **Doc ID:** RE-[NNN] · **Status:** Draft',
    '',
    '# [Issue Title]',
    '',
    '## Summary',
    '',
    'This is a synthetic template sentinel doc for the self-test. It must have at least',
    'thirty words in the summary section to pass assertion number five of the C17 EEE',
    'contract harness check. The placeholder doc_id RE-[FILL-IN] does not match the block',
    'RE-[NNN] but assertion nine is skipped because last_verified is the TEMPLATE-SENTINEL.',
  ].join('\n');
  const tv = checkFile('synthetic-template.md', syntheticTemplate);
  const hasA9 = tv.some(v => v.assertion === 9);
  stAssert(
    'TEMPLATE-SENTINEL: assertion #9 skipped for 1970-01-01 files',
    !hasA9,
    hasA9 ? 'assertion #9 fired unexpectedly' : 'assertion #9 correctly skipped'
  );

  process.stdout.write('\nSelf-test: ' + stPassed + ' passed, ' + stFailed + ' failed\n');
  process.exit(stFailed > 0 ? 1 : 0);
}

// ── Main runner (normal mode) ─────────────────────────────────────────────────────────────────
// Enrollment: walkMd('docs') → relNormalize → file enrolled iff doc_id key present AND
// relPath starts with 'docs/' (D-02 2A opt-in by EEE-key presence).

const allMdPaths = walkMd('docs');
const enrolledFiles = [];
for (const absPath of allMdPaths) {
  const relPath = relNormalize(absPath);
  const raw = readFile(relPath);
  if (!raw) continue;
  const fm2 = raw.match(/^---\n([\s\S]*?)\n---/m);
  if (!fm2) continue;
  const hasDocId = fm2[1].match(/^doc_id:\s*(.+?)\s*(#.*)?$/m);
  if (!hasDocId) continue;
  if (!relPath.startsWith('docs/')) continue; // scope guard (redundant but explicit)
  enrolledFiles.push(relPath);
}

if (enrolledFiles.length === 0) {
  process.stdout.write('C17: no enrolled files found under docs/ (no doc_id frontmatter key)\n');
  process.stdout.write('C17 assertion-violation-counts: #1=0 #2=0 #3=0 #4=0 #5=0 #6=0 #7=0 #8=0 #9=0 #10=0 #11=0 #12=0 #13=0\n');
  process.stdout.write('C17 summary: 0 files checked, 0 with violations, 0 total violations\n');
  process.exit(0);
}

const allViolations = []; // { file: string, assertion: number, detail: string }

for (const relPath of enrolledFiles) {
  const content = readFile(relPath);
  if (!content) {
    allViolations.push({ file: relPath, assertion: 0, detail: 'file unreadable' });
    continue;
  }
  const fileViolations = checkFile(relPath, content);
  for (const v of fileViolations) {
    allViolations.push({ file: relPath, ...v });
  }
}

// ── Per-file violation output ─────────────────────────────────────────────────────────────────
const filesWithViolations = [...new Set(allViolations.map(v => v.file))].sort();
if (VERBOSE || filesWithViolations.length > 0) {
  for (const file of filesWithViolations) {
    const fv = allViolations.filter(v => v.file === file);
    process.stdout.write('\n  ' + file + ':\n');
    for (const v of fv) {
      process.stdout.write('    [#' + v.assertion + '] ' + v.detail + '\n');
    }
  }
  if (filesWithViolations.length > 0) process.stdout.write('\n');
}

// ── Machine-readable counts-by-assertion (D-03 3C) ───────────────────────────────────────────
const counts = {};
for (let i = 1; i <= 13; i++) counts[i] = 0;
for (const v of allViolations) {
  if (v.assertion >= 1 && v.assertion <= 13) counts[v.assertion]++;
}
process.stdout.write(
  'C17 assertion-violation-counts: ' +
  Object.entries(counts).map(([k, v]) => '#' + k + '=' + v).join(' ') + '\n'
);
process.stdout.write(
  'C17 summary: ' + enrolledFiles.length + ' file' + (enrolledFiles.length !== 1 ? 's' : '') + ' checked, ' +
  filesWithViolations.length + ' with violations, ' +
  allViolations.length + ' total violation' + (allViolations.length !== 1 ? 's' : '') + '\n'
);

process.exit(allViolations.length > 0 ? 1 : 0);
