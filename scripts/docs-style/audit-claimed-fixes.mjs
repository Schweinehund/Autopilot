#!/usr/bin/env node
// scripts/docs-style/audit-claimed-fixes.mjs
//
// TERMINAL TOOL (D-07): this script is a milestone-lifetime, count-equality audit instrument
// over docs/ and the planning tree, built for Phase 158 (VERIFY-06). It is NEVER registered
// as an apex chain member (see scripts/validation/check-phase-153.mjs and its NESTED
// children), and nothing under scripts/docs-style/ is read by any validator or workflow.
// Phase 159 either retires this file or freezes it as a historical record -- it is not a
// standing gate and must never be wired into check-phase-*.mjs, package.json scripts, or
// any CI workflow.
//
// Modes:
//   --self-test                    build a throwaway git repo under the OS temp dir and
//                                   prove the four D-48 cases; touches no repository file.
//   --rows <path> --log <path>     audit mode: load a JSON row file (see Row Schema below),
//                                   execute every row's assertions against this repository's
//                                   git history, and write a captured report to <log>.
//   --drift <path> --log <path>    drift-attribution mode: read a *-GATE-BASELINE.json, and
//                                   for each drift[] row whose attributed_to is a list of
//                                   SHAs, confirm via `git show --name-only <sha>` that the
//                                   commit touches the row's file. Emits unattributed_rows.
//                                   Written now (D-47), exercised by plan 158-06 (D-21).
//
// Row schema (JSDoc type, validated at load -- reject loudly on any missing key or unknown op):
//   @typedef {Object} FixAuditRow
//   @property {string} id
//   @property {{kind: string, ref: string}} source   - a ruling's identity (table + subject),
//                                                       never a line number (line numbers move).
//   @property {string} claim       - <=200 chars; redacted for a secret row.
//   @property {'corpus-consistency'|'external-fact'|'replace'|'deletion'|'secret'} kind
//   @property {string} fix_sha
//   @property {string} path
//   @property {string} [evidence_path]
//   @property {?string} needle     - literal string, NEVER a regular expression; null for a
//                                     secret row (the literal never lives in this file or on
//                                     disk -- see assertSecretRow below).
//   @property {{op: string, value?: number}[]} assert
//   @property {string} [verified_by]
//   @property {string} [note]
//
// Ops: present_at_parent, absent_at_parent, present_at_head, absent_at_head,
// count_at_head_eq, count_decreased_vs_parent, count_increased, introduced_then_removed.
// "parent" always means the row's own fix_sha^ (the commit immediately before that row's
// fix landed); "head" always means the audit's resolved range.to -- the token HEAD itself
// is never resolved by this tool (D-01).
//
// Node built-in modules only -- no npm dependency is installed or imported.

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';

const OPS = new Set([
  'present_at_parent',
  'absent_at_parent',
  'present_at_head',
  'absent_at_head',
  'count_at_head_eq',
  'count_decreased_vs_parent',
  'count_increased',
  'introduced_then_removed',
]);

const KINDS = new Set(['corpus-consistency', 'external-fact', 'replace', 'deletion', 'secret']);

// ─── Git primitives -- argv-only, no shell string, `--` terminator always (D-20/D-53) ──────

/** @returns {boolean} */
export function gitLsTreeNonEmpty(rev, path, cwd = process.cwd()) {
  const out = execFileSync('git', ['ls-tree', '-r', '--name-only', rev, '--', path], {
    cwd,
    encoding: 'utf8',
  });
  return out.trim().length > 0;
}

/**
 * Directory-scoped occurrence count: `git grep -o -F`, counting non-empty output lines.
 * rc 0 -> matches; rc 1 -> zero matches (guard already ran above); rc >= 2 -> real git error.
 * Never `-c`: it sums matching LINES, so a line carrying the needle twice counts once.
 */
export function countOccurrences(rev, path, needle, cwd = process.cwd()) {
  if (!gitLsTreeNonEmpty(rev, path, cwd)) {
    throw new Error(`bad pathspec at ${rev}: ${path}`);
  }
  try {
    const out = execFileSync('git', ['grep', '-o', '-F', '-e', needle, rev, '--', path], {
      cwd,
      encoding: 'utf8',
    });
    return out.split('\n').filter(Boolean).length;
  } catch (err) {
    if (err.status === 1) return 0;
    throw err;
  }
}

/**
 * File/wrapped/secret-row occurrence count: read the blob at `rev`, join it into one string,
 * collapse every run of whitespace (including CRLF) to a single space, then count in-process.
 * This is the only form that sees a needle the source wrapped across two lines.
 */
export function countInBlob(rev, path, needle, cwd = process.cwd()) {
  if (!gitLsTreeNonEmpty(rev, path, cwd)) {
    throw new Error(`bad pathspec at ${rev}: ${path}`);
  }
  const spec = path.endsWith('/') ? path.slice(0, -1) : path;
  const raw = execFileSync('git', ['show', `${rev}:${spec}`], { cwd, encoding: 'utf8' });
  const joined = raw.replace(/\s+/g, ' ');
  if (!needle) return 0;
  return joined.split(needle).length - 1;
}

/** Directory vs. file dispatch, decided by whether `git ls-tree` returns the path itself alone. */
function isDirectoryPath(rev, path, cwd) {
  const spec = path.endsWith('/') ? path.slice(0, -1) : path;
  const listing = execFileSync('git', ['ls-tree', '-r', '--name-only', rev, '--', path], {
    cwd,
    encoding: 'utf8',
  }).trim();
  if (!listing) throw new Error(`bad pathspec at ${rev}: ${path}`);
  const files = listing.split('\n').filter(Boolean);
  return !(files.length === 1 && files[0] === spec);
}

function countAt(rev, path, needle, cwd) {
  return isDirectoryPath(rev, path, cwd)
    ? countOccurrences(rev, path, needle, cwd)
    : countInBlob(rev, path, needle, cwd);
}

/** Walks the range for a path, locating an introduced-then-removed transition (no pickaxe). */
function introducedThenRemoved(row, range, cwd) {
  const revsOut = execFileSync(
    'git',
    ['rev-list', '--reverse', `${range.from}..${range.to}`, '--', row.path],
    { cwd, encoding: 'utf8' }
  );
  const revs = revsOut.split('\n').filter(Boolean);
  let prevCount = countAt(range.from, row.path, row.needle, cwd);
  let introducedAt = null;
  let removedAt = null;
  for (const rev of revs) {
    const c = countAt(rev, row.path, row.needle, cwd);
    if (introducedAt === null && prevCount === 0 && c > 0) introducedAt = rev;
    if (introducedAt !== null && removedAt === null && prevCount > 0 && c === 0) removedAt = rev;
    prevCount = c;
  }
  const headCount = countAt(range.to, row.path, row.needle, cwd);
  const ok = introducedAt !== null && removedAt !== null && headCount === 0;
  return { ok, introducedAt, removedAt, introducedCount: introducedAt ? 1 : 0, removedAtHead: headCount };
}

/**
 * Secret-row evidence: never counts occurrences of the literal (the literal is never read
 * from the row file or from disk by this function). Instead it requires the fix commit to
 * remove EXACTLY one content line at the row's path -- two or more, or none, is a loud
 * failure (a thrown Error) rather than a tiebreak (T-158-01, D-31, D-47).
 */
function assertSecretRow(row, cwd) {
  if (!gitLsTreeNonEmpty(row.fix_sha, row.path, cwd)) {
    throw new Error(`bad pathspec at ${row.fix_sha}: ${row.path}`);
  }
  const parent = `${row.fix_sha}^`;
  const diffOut = execFileSync('git', ['diff', '--no-color', '-U0', parent, row.fix_sha, '--', row.path], {
    cwd,
    encoding: 'utf8',
  });
  const removed = diffOut.split('\n').filter((l) => l.startsWith('-') && !l.startsWith('---')).length;
  if (removed !== 1) {
    throw new Error(
      `secret row ${row.id}: expected exactly one removed content line at ${row.fix_sha} for ${row.path}, found ${removed}`
    );
  }
  return { id: row.id, verdict: 'PASS', reason: null, counts: { removed_lines_at_fix: removed } };
}

// ─── Row-level assertion ────────────────────────────────────────────────────────────────

/**
 * Executes every op in row.assert against this repository's git history and returns
 * { id, verdict: 'PASS'|'FAIL', reason, counts, error? }.
 * Vacuity: a row is FAILed with reason 'vacuous' if every count it produced is zero.
 * Direction: a row is FAILed with reason 'direction' if a measured value contradicts the
 * assertion's stated direction. Any thrown error (bad pathspec, unknown op, secret-row
 * evidence violation) is caught here and surfaced as FAIL with reason 'error' -- never
 * silently reported as a passing zero.
 */
export function assertRow(row, range, cwd = process.cwd()) {
  try {
    if (row.kind === 'secret') {
      return assertSecretRow(row, cwd);
    }
    const counts = {};
    const countsUsed = [];
    let failReason = null;

    for (const a of row.assert) {
      switch (a.op) {
        case 'present_at_parent': {
          const c = countAt(`${row.fix_sha}^`, row.path, row.needle, cwd);
          counts.present_at_parent = c;
          countsUsed.push(c);
          if (!(c > 0)) failReason = failReason || 'direction';
          break;
        }
        case 'absent_at_parent': {
          const c = countAt(`${row.fix_sha}^`, row.path, row.needle, cwd);
          counts.absent_at_parent = c;
          countsUsed.push(c);
          if (c !== 0) failReason = failReason || 'direction';
          break;
        }
        case 'present_at_head': {
          const c = countAt(range.to, row.path, row.needle, cwd);
          counts.present_at_head = c;
          countsUsed.push(c);
          if (!(c > 0)) failReason = failReason || 'direction';
          break;
        }
        case 'absent_at_head': {
          const c = countAt(range.to, row.path, row.needle, cwd);
          counts.absent_at_head = c;
          countsUsed.push(c);
          if (c !== 0) failReason = failReason || 'direction';
          break;
        }
        case 'count_at_head_eq': {
          const c = countAt(range.to, row.path, row.needle, cwd);
          counts.count_at_head_eq = c;
          countsUsed.push(c);
          if (c !== a.value) failReason = failReason || 'direction';
          break;
        }
        case 'count_decreased_vs_parent': {
          const p = countAt(`${row.fix_sha}^`, row.path, row.needle, cwd);
          const h = countAt(range.to, row.path, row.needle, cwd);
          counts.count_decreased_vs_parent = { parent: p, head: h };
          countsUsed.push(p, h);
          if (!(p > h)) failReason = failReason || 'direction';
          break;
        }
        case 'count_increased': {
          const p = countAt(`${row.fix_sha}^`, row.path, row.needle, cwd);
          const h = countAt(range.to, row.path, row.needle, cwd);
          counts.count_increased = { parent: p, head: h };
          countsUsed.push(p, h);
          const target = typeof a.value === 'number' ? h === a.value : h > p;
          if (!target) failReason = failReason || 'direction';
          break;
        }
        case 'introduced_then_removed': {
          const ev = introducedThenRemoved(row, range, cwd);
          counts.introduced_then_removed = ev;
          countsUsed.push(ev.introducedCount, ev.removedAtHead);
          if (!ev.ok) failReason = failReason || 'direction';
          break;
        }
        default:
          throw new Error(`unknown op: ${a.op}`);
      }
    }

    if (countsUsed.length > 0 && countsUsed.every((c) => c === 0)) {
      return { id: row.id, verdict: 'FAIL', reason: 'vacuous', counts };
    }
    if (failReason) {
      return { id: row.id, verdict: 'FAIL', reason: failReason, counts };
    }
    return { id: row.id, verdict: 'PASS', reason: null, counts };
  } catch (err) {
    return { id: row.id, verdict: 'FAIL', reason: 'error', counts: {}, error: err.message };
  }
}

// ─── Row-set hash (D-49) -- ties the run log to the committed rows ─────────────────────────

/** SHA-256 over the sorted row ids plus each row's assert op list. */
export function rowSetHash(rows) {
  const parts = [...rows]
    .sort((a, b) => String(a.id).localeCompare(String(b.id)))
    .map((r) => `${r.id}:${r.assert.map((a) => a.op).join(',')}`);
  return createHash('sha256').update(parts.join('|'), 'utf8').digest('hex');
}

// ─── Load-time validation -- reject loudly on any missing key or unknown op ────────────────

function validateRow(row) {
  if (!row || typeof row !== 'object') throw new Error('row is not an object');
  const required = ['id', 'source', 'claim', 'kind', 'fix_sha', 'path', 'needle', 'assert'];
  const missing = required.filter((k) => !(k in row));
  if (missing.length) throw new Error(`row ${row.id || '?'}: missing required key(s): ${missing.join(', ')}`);
  if (typeof row.source !== 'object' || !row.source.kind || !row.source.ref) {
    throw new Error(`row ${row.id}: source must be {kind, ref}`);
  }
  if (typeof row.claim !== 'string' || row.claim.length === 0 || row.claim.length > 200) {
    throw new Error(`row ${row.id}: claim must be a non-empty string <= 200 chars`);
  }
  if (!KINDS.has(row.kind)) throw new Error(`row ${row.id}: unknown kind ${row.kind}`);
  if (row.kind === 'secret') {
    if (row.needle !== null) throw new Error(`row ${row.id}: secret row must carry needle: null`);
  } else if (typeof row.needle !== 'string' || row.needle.length === 0) {
    throw new Error(`row ${row.id}: needle must be a non-empty literal string`);
  }
  if (!Array.isArray(row.assert) || row.assert.length === 0) {
    throw new Error(`row ${row.id}: assert must be a non-empty array`);
  }
  for (const a of row.assert) {
    if (!a || !OPS.has(a.op)) throw new Error(`row ${row.id}: unknown op ${a && a.op}`);
    if (a.op === 'count_at_head_eq' && typeof a.value !== 'number') {
      throw new Error(`row ${row.id}: count_at_head_eq requires a numeric value`);
    }
  }
}

function validateAuditFile(data) {
  if (!data || typeof data !== 'object') throw new Error('audit file is not a JSON object');
  if (!data.range || typeof data.range.from !== 'string' || typeof data.range.to !== 'string') {
    throw new Error('range.from/range.to must be resolved SHA strings');
  }
  if (data.range.from === 'HEAD' || data.range.to === 'HEAD') {
    throw new Error('range must never carry the literal token HEAD');
  }
  if (typeof data.authored_at_sha !== 'string' || !data.authored_at_sha) {
    throw new Error('authored_at_sha is required');
  }
  if (!Array.isArray(data.rows) || data.rows.length === 0) {
    throw new Error('rows must be a non-empty array');
  }
  for (const row of data.rows) validateRow(row);
}

// ─── Drift-attribution mode (D-21) -- written here, exercised by plan 158-06 ──────────────

/** @returns {boolean} whether `sha` touches `path`, per `git show --name-only <sha>`. */
export function driftEvidence(sha, path, cwd = process.cwd()) {
  const out = execFileSync('git', ['show', '--name-only', '--format=', sha], { cwd, encoding: 'utf8' });
  return out.split('\n').filter(Boolean).includes(path);
}

function runDrift(driftPath, logPath) {
  const data = JSON.parse(readFileSync(driftPath, 'utf8'));
  const pb = data.phase_baseline || data;
  const driftRows = Array.isArray(pb.drift) ? pb.drift : [];
  const unattributedRows = [];
  const lines = [];
  for (const row of driftRows) {
    const label = row.metric || row.component || row.id || 'row';
    if (!Array.isArray(row.attributed_to)) {
      lines.push(`SKIP ${label} (attributed_to is not a SHA list)`);
      continue;
    }
    const targetPath = row.file || row.path || row.component;
    const touchedBy = row.attributed_to.filter((sha) => {
      try {
        return driftEvidence(sha, targetPath);
      } catch (e) {
        return false;
      }
    });
    if (touchedBy.length === 0) {
      unattributedRows.push(label);
      lines.push(`UNATTRIBUTED ${label}`);
    } else {
      lines.push(`ATTRIBUTED ${label} by ${touchedBy.join(',')}`);
    }
  }
  writeFileSync(logPath, lines.join('\n') + '\n');
  console.log(JSON.stringify({ unattributed_rows: unattributedRows }));
  process.exit(0);
}

// ─── Audit mode ─────────────────────────────────────────────────────────────────────────

function runAudit(rowsPath, logPath) {
  const data = JSON.parse(readFileSync(rowsPath, 'utf8'));
  validateAuditFile(data);
  const range = data.range;
  const hash = rowSetHash(data.rows);
  data.row_set_hash = hash;
  writeFileSync(rowsPath, JSON.stringify(data, null, 2) + '\n');

  const lines = [hash];
  let allPass = true;
  let passCount = 0;
  for (const row of data.rows) {
    const res = assertRow(row, range);
    if (res.verdict === 'PASS') passCount++;
    else allPass = false;
    const suffix = res.reason ? ` (${res.reason}${res.error ? ': ' + res.error : ''})` : '';
    lines.push(`${res.verdict} ${row.id}${suffix} counts=${JSON.stringify(res.counts)}`);
  }
  lines.push(`SUMMARY ${passCount}/${data.rows.length} rows ok, hash=${hash}`);
  writeFileSync(logPath, lines.join('\n') + '\n');
  process.exit(allPass ? 0 : 1);
}

// ─── Self-test (D-48) ───────────────────────────────────────────────────────────────────

function selfTest() {
  console.log('audit-claimed-fixes --self-test\n');
  let stPassed = 0;
  let stFailed = 0;
  function stAssert(label, pass, detail) {
    const tag = pass ? 'PASS' : 'FAIL';
    process.stdout.write(`[ST] ${label} ${tag}${detail ? ' -- ' + detail : ''}\n`);
    if (pass) stPassed++;
    else stFailed++;
  }

  const tmpDir = join(tmpdir(), 'audit-claimed-fixes-selftest-' + Date.now());
  mkdirSync(tmpDir, { recursive: true });
  try {
    execFileSync('git', ['init', '-q', tmpDir]);
    execFileSync('git', ['-C', tmpDir, 'config', 'user.email', 'test@test']);
    execFileSync('git', ['-C', tmpDir, 'config', 'user.name', 'test']);
    execFileSync('git', ['-C', tmpDir, 'config', 'init.defaultBranch', 'master']);
    // Disable autocrlf inside the fixture repo so the CRLF fixture below is stored byte-exact
    // (this host's global core.autocrlf=true would otherwise LF-normalize it on add).
    execFileSync('git', ['-C', tmpDir, 'config', 'core.autocrlf', 'false']);

    // Case (a) fixture -- CRLF blob, needle wrapped across a line (mirrors the real HP Sure
    // Admin defect this instrument was built to catch): joined+collapsed the needle appears
    // once at the parent and zero times at the fix.
    const aParent = 'Header line one.\r\nTARGET\r\nWRAPPED needle continues here.\r\nFooter line.\r\n';
    const aFix = 'Header line one.\r\nFooter line.\r\n';
    writeFileSync(join(tmpDir, 'a.md'), aParent);
    // Case (b) fixture -- LF blob, needle never present at parent or head.
    writeFileSync(join(tmpDir, 'b.md'), 'line one\nno needle here\nline three\n');
    // Case (d) fixture -- LF blob, secret line present once at parent, removed at the fix.
    const secretParent = 'preamble\nSECRET_LABEL_XYZ line\nfooter\n';
    const secretFix = 'preamble\nfooter\n';
    writeFileSync(join(tmpDir, 'secret.md'), secretParent);

    execFileSync('git', ['-C', tmpDir, 'add', '-A']);
    execFileSync('git', ['-C', tmpDir, 'commit', '-q', '-m', 'parent']);
    const parentSha = execFileSync('git', ['-C', tmpDir, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();

    writeFileSync(join(tmpDir, 'a.md'), aFix);
    writeFileSync(join(tmpDir, 'secret.md'), secretFix);
    execFileSync('git', ['-C', tmpDir, 'add', '-A']);
    execFileSync('git', ['-C', tmpDir, 'commit', '-q', '-m', 'fix']);
    const fixSha = execFileSync('git', ['-C', tmpDir, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();

    const range = { from: parentSha, to: fixSha };

    // (a) needle present once at parent (CRLF, line-wrapped), absent at head -> PASS
    const rowA = {
      id: 'st-a',
      source: { kind: 'test', ref: 'self-test row a' },
      claim: 'CRLF wrapped needle removed',
      kind: 'replace',
      fix_sha: fixSha,
      path: 'a.md',
      needle: 'TARGET WRAPPED',
      assert: [{ op: 'count_decreased_vs_parent' }, { op: 'absent_at_head' }],
    };
    const resA = assertRow(rowA, range, tmpDir);
    stAssert(
      '(a) CRLF wrapped needle: parent 1 -> head 0, count_decreased_vs_parent + absent_at_head',
      resA.verdict === 'PASS',
      JSON.stringify(resA.counts)
    );

    // (b) every count zero -> FAIL vacuous
    const rowB = {
      id: 'st-b',
      source: { kind: 'test', ref: 'self-test row b' },
      claim: 'never present',
      kind: 'replace',
      fix_sha: fixSha,
      path: 'b.md',
      needle: 'NEVER_PRESENT_NEEDLE',
      assert: [{ op: 'count_decreased_vs_parent' }],
    };
    const resB = assertRow(rowB, range, tmpDir);
    stAssert(
      '(b) every count zero -> FAIL vacuous, not silently PASS',
      resB.verdict === 'FAIL' && resB.reason === 'vacuous',
      resB.reason
    );

    // (c) path absent at revision -> FAIL via the ls-tree guard, not silently zero
    const rowC = {
      id: 'st-c',
      source: { kind: 'test', ref: 'self-test row c' },
      claim: 'path missing',
      kind: 'replace',
      fix_sha: fixSha,
      path: 'does-not-exist.md',
      needle: 'ANYTHING',
      assert: [{ op: 'absent_at_head' }],
    };
    const resC = assertRow(rowC, range, tmpDir);
    stAssert(
      '(c) bad pathspec -> FAIL via ls-tree guard (reason != vacuous)',
      resC.verdict === 'FAIL' && resC.reason !== 'vacuous',
      resC.reason
    );

    // (d) secret row: exactly one removed line at the fix (literal never read by assertRow);
    // separately prove the absence-check itself is not vacuous via an in-memory positive control.
    const rowD = {
      id: 'st-d',
      source: { kind: 'test', ref: 'self-test row d' },
      claim: '[REDACTED]',
      kind: 'secret',
      fix_sha: fixSha,
      path: 'secret.md',
      needle: null,
      assert: [{ op: 'present_at_parent' }],
    };
    const resD = assertRow(rowD, range, tmpDir);
    const secretLiteral = 'SECRET_LABEL_XYZ'; // held only in this local scope; never written to a row file
    const headBlob = execFileSync('git', ['-C', tmpDir, 'show', `${fixSha}:secret.md`], { encoding: 'utf8' });
    const literalAbsentCheck = (text) => !text.includes(secretLiteral);
    const halfOnePass = literalAbsentCheck(headBlob); // expect true: absent from captured output
    const halfTwoResult = literalAbsentCheck(headBlob + secretLiteral); // expect false: injected copy fires
    const dOk = resD.verdict === 'PASS' && halfOnePass === true && halfTwoResult === false;
    stAssert(
      '(d) secret row: exactly-one-removed-line evidence PASSes; literal absent from captured output; the same check FAILs on an in-memory injected copy',
      dOk,
      JSON.stringify({ evidence: resD.verdict, halfOnePass, halfTwoResult })
    );
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }

  console.log(`\n${stPassed} passed, ${stFailed} failed`);
  process.exit(stFailed === 0 ? 0 : 1);
}

// ─── CLI dispatch ───────────────────────────────────────────────────────────────────────

function getFlag(argv, name) {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : null;
}

const argv = process.argv.slice(2);
if (argv.includes('--self-test')) {
  selfTest();
} else {
  const rowsPath = getFlag(argv, '--rows');
  const driftPath = getFlag(argv, '--drift');
  const logPath = getFlag(argv, '--log');
  if (rowsPath && logPath) {
    runAudit(rowsPath, logPath);
  } else if (driftPath && logPath) {
    runDrift(driftPath, logPath);
  } else {
    console.error(
      'Usage: audit-claimed-fixes.mjs --rows <path> --log <path> | --drift <path> --log <path> | --self-test'
    );
    process.exit(1);
  }
}
