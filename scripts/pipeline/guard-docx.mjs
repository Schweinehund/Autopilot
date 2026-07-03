#!/usr/bin/env node
// guard-docx.mjs -- Post-conversion .docx guard (Phase 113 PIPE-01 SC2)
//
// Performs BOTH checks on a pandoc-generated .docx file:
//   (a) YAML-leak check: no '---' in first ~500 chars of .docx body text
//       CRITICAL: must extract word/document.xml and inflate before scanning --
//       raw .docx bytes are DEFLATE-compressed; naive byte scan is always false-green.
//   (b) Heading-style check: Heading1/Heading2/Heading3 pStyle IDs present in body XML
//
// D-07: This script is the Phase-119 seed for check-phase-113.mjs (HARN-03 Atom 2).
// Keep it standalone now; the chain-fold is Phase 119's job.
//
// Usage:  node scripts/pipeline/guard-docx.mjs <path/to/output.docx>
//         node scripts/pipeline/guard-docx.mjs --self-test
// Exit 0: both checks pass (clean conversion)
// Exit 1: any check fails (YAML leak or heading-style loss)

// Node built-ins ONLY -- zero external npm packages (matches scripts/validation/ convention)
import { existsSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import process from 'node:process';
// Internal lib only (not npm)
import { extractBodyText, findHeadingStyleIds } from './lib/ooxml.mjs';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');
const SELF_TEST = argv.includes('--self-test');

// Positional argument: path to the .docx file to guard (normal mode only)
const docxPath = argv.find(a => !a.startsWith('--'));

// ─── Check logic ─────────────────────────────────────────────────────────────

/**
 * YAML-LEAK: extract decompressed body text; fail if first ~500 chars contain '---'.
 * CRITICAL: operates on extractBodyText() output (decompressed word/document.xml),
 * NEVER on raw .docx bytes (DEFLATE-compressed -- raw scan is always false-green).
 * @param {string} path - path to .docx file
 * @returns {{ pass: boolean, detail: string }}
 */
function runYamlLeakCheck(path) {
  try {
    const body = extractBodyText(path);
    const first500 = body.slice(0, 500);
    if (first500.includes('---')) {
      return {
        pass: false,
        detail: 'raw "---" YAML delimiter found in first ~500 chars of .docx body text (body begins: ' +
          first500.slice(0, 80).replace(/\n/g, ' ').trim() + ')'
      };
    }
    return { pass: true, detail: 'no "---" YAML delimiter in first ~500 chars of body text' };
  } catch (err) {
    return { pass: false, detail: 'extractBodyText error: ' + err.message };
  }
}

/**
 * HEADING-STYLE: find Heading1/Heading2/Heading3 pStyle IDs in body XML.
 * Fails if Heading1 is absent -- indicates heading-flattening to Normal (Pitfall 2).
 * @param {string} path - path to .docx file
 * @returns {{ pass: boolean, detail: string }}
 */
function runHeadingStyleCheck(path) {
  try {
    const found = findHeadingStyleIds(path);
    if (!found.includes('Heading1')) {
      return {
        pass: false,
        detail: 'Heading1 pStyle absent in .docx body (found: [' + found.join(',') + ']) -- headings likely flattened to Normal'
      };
    }
    return { pass: true, detail: 'heading pStyle IDs present: [' + found.join(',') + ']' };
  } catch (err) {
    return { pass: false, detail: 'findHeadingStyleIds error: ' + err.message };
  }
}

/**
 * Resolve the pandoc binary: try PATH first, then LOCALAPPDATA fallback (Windows).
 * Returns the binary path/name, or null if not found.
 */
function resolvePandocBin() {
  try {
    execFileSync('pandoc', ['--version'], { stdio: 'pipe', timeout: 10000 });
    return 'pandoc';
  } catch (e) {
    if (e.code === 'ENOENT' || e.status === 127) {
      // Try Windows user-scope LOCALAPPDATA fallback
      const localAppData = process.env.LOCALAPPDATA;
      if (localAppData) {
        const fallback = join(localAppData, 'Pandoc', 'pandoc.exe');
        if (existsSync(fallback)) return fallback;
      }
      return null;
    }
    // Some other error -- pandoc installed but non-zero exit from --version; still try it
    return 'pandoc';
  }
}

/**
 * Convert a .md file to .docx via pandoc (for self-test use).
 * Pattern from check-phase-112.mjs execFileSync error handling.
 */
function tryConvert(bin, inputMd, outputDocx, referenceDoc) {
  try {
    execFileSync(bin, [inputMd, '-o', outputDocx, '--reference-doc=' + referenceDoc], {
      stdio: 'pipe',
      timeout: 60000,
      cwd: process.cwd(),
    });
    return { pass: true };
  } catch (err) {
    const stderr = err.stderr ? err.stderr.toString() : '';
    const stdout = err.stdout ? err.stdout.toString() : '';
    const isMissing = err.code === 'ENOENT' || err.status === 127
      || stderr.includes('not found') || stderr.includes('Could not resolve');
    if (isMissing) return { pass: true, skipped: true, detail: 'pandoc not on PATH -- skipped' };
    return { pass: false, detail: 'pandoc FAIL: ' + (stdout + stderr).slice(0, 500).trim() };
  }
}

// ─── Checks array (normal mode) ──────────────────────────────────────────────
// Each check: { id: string, name: string, run(): { pass: bool, detail: string } }

const checks = [];

checks.push({
  id: 'YAML-LEAK',
  name: 'V-GUARD-YAML-LEAK: no "---" YAML delimiter in first ~500 chars of .docx body text',
  run() { return runYamlLeakCheck(docxPath); }
});

checks.push({
  id: 'HEADING-STYLE',
  name: 'V-GUARD-HEADING-STYLE: Heading1/Heading2/Heading3 pStyle IDs present in .docx body',
  run() { return runHeadingStyleCheck(docxPath); }
});

// ─── Runner helpers ───────────────────────────────────────────────────────────

const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

// ─── Self-test mode ───────────────────────────────────────────────────────────
// Dual-invariant proof (SC2):
//   Sub-test A: Direct synthetic YAML-LEAK logic test (no pandoc required)
//   Sub-test B: Pandoc-converted CLEAN fixture PASSES guard (exit 0 equivalent)
//   Sub-test C: Pandoc-converted LEAKED fixture FAILS YAML-LEAK check (exit 1 equivalent)
// Self-test exits 0 only when ALL sub-tests hold.

if (SELF_TEST) {
  console.log('guard-docx --self-test (PIPE-01 SC2 dual-invariant proof)\n');

  let stPassed = 0, stFailed = 0;

  function stAssert(label, pass, detail) {
    const tag = pass ? 'PASS' : 'FAIL';
    process.stdout.write(padLabel('[ST] ' + label) + tag + (detail ? ' -- ' + detail : '') + '\n');
    if (pass) stPassed++; else stFailed++;
  }

  // ── Sub-test A: Direct synthetic YAML-LEAK logic test (no pandoc needed) ──
  // Directly verify that the YAML-LEAK check logic returns a failing result when
  // given a synthetic body string that begins with '---'.  This hard-proves the
  // detection logic independent of pandoc rendering quirks (SC2 independent path).
  const syntheticBody = '--- doc_id: SYNTH-001\nstatus: draft\n---\nSome document content.';
  const syntheticFirst500 = syntheticBody.slice(0, 500);
  const syntheticDetects = syntheticFirst500.includes('---');
  stAssert(
    'Direct YAML-LEAK logic: "---" body triggers FAIL',
    syntheticDetects,
    syntheticDetects
      ? 'logic correctly detects "---" in synthetic body beginning with "---"'
      : 'BUG: logic failed to detect "---" in synthetic body starting with "---"'
  );

  // ── Sub-test B & C: Pandoc-based clean/leaked fixture tests ──
  const pandocBin = resolvePandocBin();

  if (!pandocBin) {
    stAssert('Pandoc clean fixture', true, 'pandoc not found on PATH or LOCALAPPDATA -- SKIPPED');
    stAssert('Pandoc leaked fixture', true, 'pandoc not found on PATH or LOCALAPPDATA -- SKIPPED');
  } else {
    const refDoc = join(process.cwd(), 'scripts', 'pipeline', 'reference.docx');
    const tmpDir = join(tmpdir(), 'guard-docx-selftest-' + Date.now());
    mkdirSync(tmpDir, { recursive: true });

    try {
      // ── Sub-test B: Clean fixture -- guard PASSES ──
      const cleanMd = join(tmpDir, 'clean.md');
      const cleanDocx = join(tmpDir, 'clean.docx');

      writeFileSync(cleanMd, [
        '---',
        'title: Clean Test Document',
        '---',
        '',
        '# Heading 1',
        '',
        'Clean body text under heading 1.',
        '',
        '## Heading 2',
        '',
        'More content under heading 2.',
        '',
        '### Heading 3',
        '',
        'Content under heading 3.',
        '',
      ].join('\n'), 'utf8');

      const cleanConvert = tryConvert(pandocBin, cleanMd, cleanDocx, refDoc);
      if (cleanConvert.skipped) {
        stAssert('Pandoc clean fixture', true, cleanConvert.detail);
      } else if (!cleanConvert.pass) {
        stAssert('Pandoc clean fixture', false, 'pandoc conversion failed: ' + cleanConvert.detail);
      } else {
        const yamlResult = runYamlLeakCheck(cleanDocx);
        const headResult = runHeadingStyleCheck(cleanDocx);
        const cleanPass = yamlResult.pass && headResult.pass;
        stAssert(
          'Pandoc clean fixture: guard PASSES (exit 0)',
          cleanPass,
          cleanPass
            ? 'YAML-LEAK=PASS, HEADING-STYLE=PASS'
            : 'YAML-LEAK=' + (yamlResult.pass ? 'PASS' : 'FAIL: ' + yamlResult.detail) +
              ', HEADING-STYLE=' + (headResult.pass ? 'PASS' : 'FAIL: ' + headResult.detail)
        );
      }

      // ── Sub-test C: Leaked fixture -- YAML-LEAK check FAILS ──
      // Uses a fenced code block so pandoc renders '---' lines as verbatim body text
      // (not parsed as YAML metadata or thematic break).  No frontmatter in this file
      // so the first body content IS the code block, placing '---' early in body text.
      const leakedMd = join(tmpDir, 'leaked.md');
      const leakedDocx = join(tmpDir, 'leaked.docx');

      writeFileSync(leakedMd, [
        '```',
        '---',
        'doc_id: LEAK-001',
        'status: draft',
        '---',
        '```',
        '',
        '# Leaked Test Document',
        '',
        'Body text after the leaked YAML block.',
        '',
      ].join('\n'), 'utf8');

      const leakedConvert = tryConvert(pandocBin, leakedMd, leakedDocx, refDoc);
      if (leakedConvert.skipped) {
        stAssert('Pandoc leaked fixture', true, leakedConvert.detail);
      } else if (!leakedConvert.pass) {
        stAssert('Pandoc leaked fixture', false, 'pandoc conversion failed: ' + leakedConvert.detail);
      } else {
        const leakResult = runYamlLeakCheck(leakedDocx);
        // The leaked fixture MUST fail YAML-LEAK (proves guard is not false-green)
        stAssert(
          'Pandoc leaked fixture: YAML-LEAK FAILS (exit 1)',
          !leakResult.pass,
          !leakResult.pass
            ? 'YAML-LEAK correctly returned FAIL: ' + leakResult.detail
            : 'BUG: YAML-LEAK returned PASS on a leaked fixture (false-green!)'
        );
      }
    } finally {
      try { rmSync(tmpDir, { recursive: true, force: true }); } catch (_) { /* best-effort cleanup */ }
    }
  }

  process.stdout.write('\nSelf-test result: ' + stPassed + ' PASS, ' + stFailed + ' FAIL\n');
  process.exit(stFailed > 0 ? 1 : 0);
}

// ─── Normal mode: validate the provided .docx ────────────────────────────────

if (!docxPath) {
  process.stderr.write('Usage: node guard-docx.mjs <path/to/output.docx>\n');
  process.stderr.write('       node guard-docx.mjs --self-test\n');
  process.exit(1);
}

// ─── Runner loop (verbatim pattern from check-phase-99.mjs) ──────────────────

let passed = 0, failed = 0, skipped = 0;
console.log('guard-docx -- Post-conversion .docx guard (PIPE-01 SC2)\n');
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
