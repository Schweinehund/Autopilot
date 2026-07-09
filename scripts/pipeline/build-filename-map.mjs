#!/usr/bin/env node
// build-filename-map.mjs -- Phase-124 PIPE-04 generator (124-CONTEXT.md D-05..D-11)
//
// Reads docs/_registry/RE-index.md (the Title column is the sole source of truth, D-07;
// Path is consulted ONLY as the D-08 collision tie-break input) and emits a committed
// scripts/pipeline/filename-map.md build artifact: Doc ID | Path | Output Filename.
//
// Zero-dependency Node code (built-ins only), following the scripts/pipeline/retrofit-*.mjs
// family conventions (readFile CRLF-normalize, argv flags, padLabel/stAssert self-test
// harness, fail-closed stderr+exit idiom -- 124-PATTERNS.md).
//
// D-05 slug algorithm -- EXACT 5-step order, do NOT paraphrase or reorder:
//   1. lowercase
//   2. replace "/" and every whitespace run with a single "-"
//   3. delete every char not in [a-z0-9-]
//   4. collapse "-" runs, trim leading/trailing "-"
//   5. caller appends ".docx"
//
// D-06 (SOURCE INVARIANT): source .md files are NEVER renamed. This script assigns
// OUTPUT .docx filenames only.
//
// D-08 (fail-closed collision policy): on a slug clash, append the minimal number of
// trailing Path parent-directory segments (nearest-first, each sanitized) until unique.
// If still unresolvable, write FILENAME-COLLISION-UNRESOLVED to stderr and exit 1 --
// never emit a silent duplicate.
//
// D-09 (sync mechanism): this generator reads RE-index.md and writes ONLY
// scripts/pipeline/filename-map.md. It MUST NEVER write docs/_registry/RE-index.md.
//
// Does NOT build the batch driver or any .docx generation (deferred to v1.17+, D-10).
//
// Usage:
//   node scripts/pipeline/build-filename-map.mjs                 (parses + writes filename-map.md)
//   node scripts/pipeline/build-filename-map.mjs --dry-run        (parses, prints summary, no write)
//   node scripts/pipeline/build-filename-map.mjs --self-test       (runs the self-test harness)
//
// Exit 0: map generated (or self-test all-pass)
// Exit 1: 0 rows parsed, unresolved collision, or any self-test failure

// Node built-ins ONLY -- zero external npm packages (matches scripts/pipeline/ convention)
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const argv = process.argv.slice(2);
const DRY_RUN = argv.includes('--dry-run');
const SELF_TEST = argv.includes('--self-test');

const REGISTRY_REL_PATH = 'docs/_registry/RE-index.md';
const OUTPUT_REL_PATH = 'scripts/pipeline/filename-map.md';

// === Padded-label console output (matches guard-docx.mjs / retrofit-nav-hub.mjs) ===
const LABEL_WIDTH = 72;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}

// === readFile() -- CRLF-normalizing helper (matches retrofit-nav-hub.mjs lines 207-211) ===
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}

// === D-05 slug algorithm -- exact 5-step order, do NOT paraphrase ===
function slug(title) {
  let s = title.toLowerCase();                    // 1. lowercase
  s = s.replace(/[/\s]+/g, '-');                   // 2. "/" and whitespace runs -> single "-"
  s = s.replace(/[^a-z0-9-]/g, '');                // 3. delete everything else (incl. ".", ":", "—", "(", ")")
  s = s.replace(/-+/g, '-').replace(/^-|-$/g, ''); // 4. collapse/trim "-"
  return s;                                        // 5. caller appends ".docx"
}

// Sanitize a single Path directory segment for use as a D-08 disambiguation suffix.
// Same character-class discipline as slug() step 3/4, applied to one path segment.
function sanitizeSegment(seg) {
  let s = seg.toLowerCase();
  s = s.replace(/[^a-z0-9-]/g, '-');
  s = s.replace(/-+/g, '-').replace(/^-|-$/g, '');
  return s;
}

// Return this row's Path parent-directory segments, nearest-first (deepest dir closest
// to the file first). E.g. "docs/l1-runbooks/01-x.md" -> ["l1-runbooks", "docs"].
function dirSegmentsNearestFirst(path) {
  const parts = path.split('/').filter(Boolean);
  const dirs = parts.slice(0, -1); // drop the filename itself
  return dirs.slice().reverse();
}

// === Registry parser (5-column pipe-table row idiom, RESEARCH.md Pattern 3 / PATTERNS.md) ===
// Excludes header/separator/prose rows (e.g. "## Review Notes") by construction --
// only lines beginning with "| RE-<digits> |" match.
function parseRegistry(content) {
  return content
    .split(/\r?\n/)
    .filter(l => /^\|\s*RE-\d+\s*\|/.test(l))
    .map(l => {
      const cols = l.split('|').map(s => s.trim());
      // cols[0] is '' (leading pipe); cols[1..5] are Doc ID/Path/Title/Doc Type/Status
      return { docId: cols[1], path: cols[2], title: cols[3], docType: cols[4], status: cols[5] };
    });
}

// === D-08 fail-closed collision resolver ===
// Pure function -- NEVER calls process.exit itself (self-test-friendly, matches the
// retrofit-*.mjs convention of returning { ok, error } result objects; only main()
// decides how to exit).
// Returns { ok: true, rows: [...rows with outputFilename] }
//      or { ok: false, error: 'FILENAME-COLLISION-UNRESOLVED: ...' }
function buildFilenameMap(rows) {
  const bySlug = new Map();
  for (const r of rows) {
    const base = slug(r.title);
    if (!bySlug.has(base)) bySlug.set(base, []);
    bySlug.get(base).push(r);
  }

  const finalNames = new Set();
  const out = [];

  for (const [base, group] of bySlug) {
    if (group.length === 1) {
      const r = group[0];
      let name = base + '.docx';
      if (finalNames.has(name)) {
        // WR-01: this unique base slug coincides with a name already claimed by a
        // *different* collision group's disambiguation -- a naming coincidence between
        // unrelated docs, not a duplicate title. Fall back to the globally-unique Doc ID
        // (never a silent duplicate) rather than aborting the whole generator.
        name = base + '-' + r.docId.toLowerCase() + '.docx';
        if (finalNames.has(name)) {
          return {
            ok: false,
            error: 'FILENAME-COLLISION-UNRESOLVED: ' + r.docId + ' (' + r.title + ') -> ' + name +
              ' (Doc ID fallback also claimed -- duplicate Doc ID in registry?)'
          };
        }
      }
      finalNames.add(name);
      out.push({ ...r, outputFilename: name });
      continue;
    }

    // D-08: disambiguate each colliding member using the minimal number of nearest-first
    // Path parent-directory segments, each sanitized, appended to the base slug.
    for (const r of group) {
      const segs = dirSegmentsNearestFirst(r.path);
      let resolvedName = null;
      for (let n = 1; n <= segs.length && !resolvedName; n++) {
        // Restore natural (outer-to-inner) order for the appended suffix.
        const suffix = segs.slice(0, n).reverse().map(sanitizeSegment).join('-');
        const candidate = base + '-' + suffix + '.docx';
        if (!finalNames.has(candidate)) resolvedName = candidate;
      }
      if (!resolvedName) {
        // WR-01: path-segment disambiguation exhausted (e.g. a shallow path whose only
        // candidate coincides with an unrelated doc's already-claimed name). Fall back to
        // the globally-unique Doc ID before declaring the collision unresolvable.
        const fallback = base + '-' + r.docId.toLowerCase() + '.docx';
        if (finalNames.has(fallback)) {
          return {
            ok: false,
            error: 'FILENAME-COLLISION-UNRESOLVED: ' + r.docId + ' (' + r.title +
              ') -- exhausted ' + segs.length + ' path segment(s) and the Doc ID fallback on base "' +
              base + '" (duplicate Doc ID in registry?)'
          };
        }
        resolvedName = fallback;
      }
      finalNames.add(resolvedName);
      out.push({ ...r, outputFilename: resolvedName });
    }
  }
  return { ok: true, rows: out };
}

// === Committed artifact writer (D-09) -- writes ONLY filename-map.md, never RE-index.md ===
function writeMapFile(rows) {
  const sorted = rows.slice().sort((a, b) => {
    const na = parseInt(a.docId.replace('RE-', ''), 10);
    const nb = parseInt(b.docId.replace('RE-', ''), 10);
    return na - nb;
  });
  const lines = [];
  lines.push('# Descriptive Output-Filename Map -- Phase 124 (PIPE-04)');
  lines.push('');
  lines.push('> **GENERATED FILE -- DO NOT HAND-EDIT.**');
  lines.push('> Re-run `node scripts/pipeline/build-filename-map.mjs` to regenerate.');
  lines.push('> Reads `docs/_registry/RE-index.md` (the `Title` column is the D-07 source of');
  lines.push('> truth) and derives each row\'s `.docx` Output Filename via the D-05 5-step slug');
  lines.push('> algorithm. Does NOT write `docs/_registry/RE-index.md` (D-09). Source `.md`');
  lines.push('> files are NEVER renamed (D-06) -- this map assigns OUTPUT `.docx` filenames only.');
  lines.push('');
  lines.push('| Doc ID | Path | Output Filename |');
  lines.push('|--------|------|------------------|');
  for (const r of sorted) {
    lines.push('| ' + r.docId + ' | ' + r.path + ' | ' + r.outputFilename + ' |');
  }
  lines.push('');
  const abs = join(process.cwd(), OUTPUT_REL_PATH);
  writeFileSync(abs, lines.join('\n'), 'utf8');
  return abs;
}

// === Self-test mode (--self-test) ===
if (SELF_TEST) {
  let stPassed = 0, stFailed = 0;

  function stAssert(label, pass, detail) {
    const tag = pass ? 'PASS' : 'FAIL';
    process.stdout.write(padLabel('[ST] ' + label) + tag + (detail ? ' -- ' + detail : '') + '\n');
    if (pass) stPassed++; else stFailed++;
  }

  process.stdout.write('build-filename-map --self-test (Phase 124 PIPE-04 generator proof)\n\n');

  // (a) 5-column registry row parser against a synthetic snippet, prose section excluded
  {
    const sampleRegistry = [
      '# Doc ID Registry -- Phase-1',
      '',
      '| Doc ID | Path | Title | Doc Type | Status |',
      '|--------|------|-------|----------|--------|',
      '| RE-002 | docs/l1-runbooks/01-device-not-registered.md | Device Not Registered in Autopilot | Runbook | Approved |',
      '| RE-219 | docs/index.md | Device Provisioning Documentation | Reference | Approved |',
      '',
      '## Review Notes',
      '',
      'RE-212 lives under docs/lifecycle/ by directory precedence, not docs/admin-setup-*/.',
    ].join('\n');
    const rows = parseRegistry(sampleRegistry);
    const okCount = rows.length === 2;
    const okRow = okCount && rows[0].docId === 'RE-002' && rows[0].path === 'docs/l1-runbooks/01-device-not-registered.md' &&
      rows[0].title === 'Device Not Registered in Autopilot';
    stAssert(
      '(a) registry parser: 2 data rows parsed, "## Review Notes" prose contributes 0 rows',
      okCount && okRow,
      'rows.length=' + rows.length + (okRow ? '' : ', row shape mismatch')
    );
  }

  // (b) slug() 802.1X edge case -- the "." is deleted by step 3
  {
    const got = slug('802.1X Certificate Failure');
    stAssert(
      '(b) slug("802.1X Certificate Failure") === "8021x-certificate-failure"',
      got === '8021x-certificate-failure',
      'got "' + got + '"'
    );
  }

  // (b2) slug() em-dash collapse -- no leading/trailing/doubled "-"
  {
    const got = slug('macOS Platform SSO — Secure Enclave Key Loss');
    const noLeadTrail = !got.startsWith('-') && !got.endsWith('-');
    const noDouble = !/--/.test(got);
    stAssert(
      '(b2) slug() em-dash title collapses to a single "-", no leading/trailing/doubled "-"',
      noLeadTrail && noDouble,
      'got "' + got + '"'
    );
  }

  // (c) Parsing the REAL docs/_registry/RE-index.md yields exactly 221 rows
  {
    const content = readFile(REGISTRY_REL_PATH);
    const rows = content ? parseRegistry(content) : [];
    stAssert(
      '(c) parseRegistry(docs/_registry/RE-index.md) yields exactly 221 rows',
      rows.length === 221,
      'rows.length=' + rows.length
    );
  }

  // (d) A synthetic 2-row title collision triggers D-08 disambiguation and resolves uniquely
  {
    const rows = [
      { docId: 'RE-T01', path: 'docs/admin-setup-ios/00-overview.md', title: 'Overview', docType: 'Guide', status: 'Approved' },
      { docId: 'RE-T02', path: 'docs/admin-setup-macos/00-overview.md', title: 'Overview', docType: 'Guide', status: 'Approved' },
    ];
    const result = buildFilenameMap(rows);
    const ok = result.ok && result.rows.length === 2 &&
      result.rows[0].outputFilename !== result.rows[1].outputFilename &&
      result.rows[0].outputFilename === 'overview-admin-setup-ios.docx' &&
      result.rows[1].outputFilename === 'overview-admin-setup-macos.docx';
    stAssert(
      '(d) synthetic 2-row title collision -> D-08 disambiguation resolves to unique slugs',
      ok,
      result.ok ? ('got: ' + result.rows.map(r => r.outputFilename).join(', ')) : result.error
    );
  }

  // (e) A synthetic UNRESOLVABLE collision. After the WR-01 Doc-ID fallback, the only
  //     genuinely-unresolvable case is a DUPLICATE Doc ID (a registry-integrity error):
  //     identical title+path AND identical Doc ID, so even the Doc-ID fallback suffix
  //     coincides. This MUST still fail closed with FILENAME-COLLISION-UNRESOLVED --
  //     never a silent duplicate. (Function never calls process.exit -- only main() does.)
  {
    const rows = [
      { docId: 'RE-T03', path: 'overview.md', title: 'Overview', docType: 'Guide', status: 'Approved' },
      { docId: 'RE-T03', path: 'overview.md', title: 'Overview', docType: 'Guide', status: 'Approved' },
    ];
    const result = buildFilenameMap(rows);
    const ok = result.ok === false && /FILENAME-COLLISION-UNRESOLVED/.test(result.error);
    stAssert(
      '(e) duplicate Doc ID (identical title+path+docId) -> fail-closed FILENAME-COLLISION-UNRESOLVED',
      ok,
      result.ok ? 'unexpectedly resolved (BUG)' : result.error
    );
  }

  // (g) WR-01 regression guard: a unique singleton whose slug coincides with what a
  //     *different* collision group's disambiguation produces must NOT spuriously hard-fail.
  //     The Doc-ID fallback resolves it deterministically (never a silent duplicate).
  {
    const rows = [
      { docId: 'RE-S01', path: 'zzz/unrelated.md', title: 'Foo A', docType: 'Guide', status: 'Approved' }, // -> foo-a
      { docId: 'RE-G01', path: 'a/x.md', title: 'Foo', docType: 'Guide', status: 'Approved' },             // group w/ RE-G02
      { docId: 'RE-G02', path: 'b/x.md', title: 'Foo', docType: 'Guide', status: 'Approved' },
    ];
    const result = buildFilenameMap(rows);
    const names = result.ok ? result.rows.map((r) => r.outputFilename) : [];
    const unique = new Set(names).size === names.length;
    stAssert(
      '(g) WR-01 coincidence (singleton "foo-a" vs group "foo" disambiguation) -> resolves via Doc-ID fallback, no spurious hard-fail',
      result.ok === true && unique && names.length === 3,
      result.ok ? names.join(', ') : ('unexpected hard-fail: ' + result.error)
    );
  }

  // (f) 0 parsed rows also triggers the fail-closed path (main()'s guard, proven here via
  //     the same parseRegistry() function against an empty/prose-only synthetic registry)
  {
    const emptyRegistry = [
      '# Doc ID Registry -- Phase-1',
      '',
      '## Review Notes',
      '',
      'No table rows here.',
    ].join('\n');
    const rows = parseRegistry(emptyRegistry);
    stAssert(
      '(f) 0-row registry (prose only) parses to rows.length === 0 (main() fail-closed guard input)',
      rows.length === 0,
      'rows.length=' + rows.length
    );
  }

  process.stdout.write('\n' + stPassed + ' passed, ' + stFailed + ' failed\n');
  process.exit(stFailed > 0 ? 1 : 0);
}

// === Main (non-self-test) ===
const registryContent = readFile(REGISTRY_REL_PATH);
if (!registryContent) {
  process.stderr.write('ERROR: registry not found at ' + REGISTRY_REL_PATH + '\n');
  process.exit(1);
}

const parsedRows = parseRegistry(registryContent);
if (parsedRows.length === 0) {
  process.stderr.write('FILENAME-COLLISION-UNRESOLVED: 0 rows parsed from ' + REGISTRY_REL_PATH +
    ' (parser broken or registry empty) -- refusing to write an empty map\n');
  process.exit(1);
}

const mapResult = buildFilenameMap(parsedRows);
if (!mapResult.ok) {
  process.stderr.write(mapResult.error + '\n');
  process.exit(1);
}

process.stdout.write(
  'Parsed ' + parsedRows.length + ' registry rows -> ' + mapResult.rows.length +
  ' output filenames, 0 unresolved collisions.\n'
);

if (DRY_RUN) {
  process.stdout.write('[dry-run] would write ' + OUTPUT_REL_PATH + ' (no file written)\n');
  process.exit(0);
}

const writtenPath = writeMapFile(mapResult.rows);
process.stdout.write('Wrote ' + writtenPath + '\n');
process.exit(0);
