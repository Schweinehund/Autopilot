#!/usr/bin/env node
// scripts/validation/frozen-read-negative-test.mjs
//
// SWEEP-03 (v1.20 Phase 139 Plan 03, D-31): a real file:// depth-1 shallow-clone negative
// harness proving the fail-loud frozen-read behaviour landed in this plan's Task 1.
//
// STANDALONE CLI SCRIPT -- NOT a chain validator. It is never added to any apex chain-member
// array (D-07-adjacent reasoning: it performs a real `git clone`, so it belongs on the CLI,
// invoked on demand, not replayed inside a per-run apex where its clone cost would be paid
// on every invocation of every downstream validator).
//
// Usage: node scripts/validation/frozen-read-negative-test.mjs
// Exit code: 0 if all assertions PASS; 1 if any FAIL.
//
// Why file:// is MANDATORY (D-31, RESEARCH.md Pitfall 2): `git clone --depth 1 <local-path>`
// WITHOUT the file:// scheme silently ignores --depth, prints a warning, and produces a FULL
// (non-shallow) clone -- no `.git/shallow` is created and every frozen read SUCCEEDS. As
// originally specified without file://, this harness would itself be a silent green: the
// exact failure class this milestone exists to delete. The `.git/shallow` hard guard below
// asserts the clone is genuinely shallow before trusting anything else in this file.

import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, existsSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import process from 'node:process';
import {
  readAtV15Close,
  lsTreeAtV15Close,
  frozenCause,
} from './_lib/frozen-at-close.mjs';

const REPO_49 = 'scripts/validation/check-phase-49.mjs';
const REPO_51 = 'scripts/validation/check-phase-51.mjs';
const CORPUS_FILE = 'docs/_glossary-linux.md';
const ABSENT_EVERYWHERE = 'docs/this-path-truly-does-not-exist-139-03-negative-test.md';
const NEW_FILE = 'NEW-FILE-139-03-negative-test.md';
const EMPTY_FILE = 'EMPTY-FILE-139-03-negative-test.md';

// Mirrors readAtClose's error-enrichment logic (reuses the shared frozenCause classifier)
// but accepts a literal SHA/ref instead of a MILESTONE_CLOSE_SHAS tag -- needed because cases
// 2 and 3 below exercise the classifier against a REACHABLE ref (the clone's own HEAD, or a
// commit created inside the clone), which by construction is never a pinned milestone tag.
function readAtRawRef(ref, relPath) {
  try {
    return execFileSync('git', ['show', ref + ':' + relPath], {
      encoding: 'utf8',
      timeout: 10000,
      stdio: ['ignore', 'pipe', 'pipe'],
    }).replace(/\r\n/g, '\n');
  } catch (err) {
    const cause = frozenCause(err);
    err.frozenCause = cause;
    err.message = `[${cause}] ${err.message}`;
    throw err;
  }
}

function runAssertion(n, label, fn) {
  try {
    const detail = fn();
    process.stdout.write(`[${n}] ${label}${detail ? ' -- ' + detail : ''} PASS\n`);
    return true;
  } catch (err) {
    process.stdout.write(`[${n}] ${label} FAIL -- ${err.message}\n`);
    return false;
  }
}

function main() {
  const originalCwd = process.cwd();
  const cloneDir = mkdtempSync(join(tmpdir(), 'frozen-read-negative-test-'));
  const repoUrl = 'file://' + originalCwd.replace(/\\/g, '/');
  let passCount = 0;
  const total = 7;

  try {
    execFileSync('git', ['clone', '--depth', '1', repoUrl, cloneDir], {
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: 60000,
    });

    // HARD GUARD (D-31): a non-shallow clone makes every assertion below meaningless.
    if (!existsSync(join(cloneDir, '.git/shallow'))) {
      throw new Error('.git/shallow absent after clone -- shallow-clone HARD GUARD failed (not a real shallow clone; see file:// requirement above)');
    }

    // === Validator-level proof (D-31, the real point of SWEEP-03) ===
    // Run BEFORE any local commits are made inside the clone, so the clone's HEAD still
    // matches the pristine post-checkout state a shallow CI job would see.
    passCount += runAssertion(1, `${REPO_49} exits non-zero inside the shallow clone with 'unreachable-sha' in its output`, () => {
      try {
        execFileSync('node', [join(originalCwd, REPO_49)], {
          cwd: cloneDir,
          encoding: 'utf8',
          stdio: ['ignore', 'pipe', 'pipe'],
          timeout: 30000,
        });
        throw new Error('expected non-zero exit inside the shallow clone, got success (pre-Task-1 this would have been the silent-green failure mode)');
      } catch (err) {
        if (err.status === undefined) throw err; // a real spawn/setup error, not the expected non-zero exit
        const combined = (err.stdout || '') + (err.stderr || '');
        if (!combined.includes('unreachable-sha')) {
          throw new Error(`exit code ${err.status} but 'unreachable-sha' not found in output (before this plan: reported the document as absent, not unreachable-sha)`);
        }
        return `exit ${err.status}, 'unreachable-sha' present in output`;
      }
    }) ? 1 : 0;

    passCount += runAssertion(2, `${REPO_51} exits non-zero inside the shallow clone with 'unreachable-sha' in its output`, () => {
      try {
        execFileSync('node', [join(originalCwd, REPO_51)], {
          cwd: cloneDir,
          encoding: 'utf8',
          stdio: ['ignore', 'pipe', 'pipe'],
          timeout: 30000,
        });
        throw new Error('expected non-zero exit inside the shallow clone, got success');
      } catch (err) {
        if (err.status === undefined) throw err;
        const combined = (err.stdout || '') + (err.stderr || '');
        if (!combined.includes('unreachable-sha')) {
          throw new Error(`exit code ${err.status} but 'unreachable-sha' not found in output (before this plan: reported "File missing" 6 times, V-51-06..11)`);
        }
        return `exit ${err.status}, 'unreachable-sha' present in output`;
      }
    }) ? 1 : 0;

    // All library-level assertions below run with the clone as cwd (D-31).
    process.chdir(cloneDir);

    // === D-31 Case 1: unreachable SHA ===
    passCount += runAssertion(3, `D-31 Case 1 (unreachable SHA): readAtV15Close('${CORPUS_FILE}') throws frozenCause=unreachable-sha`, () => {
      try {
        readAtV15Close(CORPUS_FILE);
        throw new Error('expected a throw, got success');
      } catch (err) {
        if (err.frozenCause !== 'unreachable-sha') throw new Error(`expected unreachable-sha, got ${err.frozenCause ?? 'undefined'} (${err.message})`);
        if (!err.message.startsWith('[unreachable-sha]')) throw new Error(`cause not at FRONT of message: ${err.message}`);
        return `frozenCause=${err.frozenCause}`;
      }
    }) ? 1 : 0;

    // === D-31 Case 2: absent from both disk and SHA ===
    const headSha = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
    passCount += runAssertion(4, `D-31 Case 2 (absent from disk+SHA): readAtRawRef(HEAD, '${ABSENT_EVERYWHERE}') throws frozenCause=absent-path`, () => {
      try {
        readAtRawRef(headSha, ABSENT_EVERYWHERE);
        throw new Error('expected a throw, got success');
      } catch (err) {
        if (err.frozenCause !== 'absent-path') throw new Error(`expected absent-path, got ${err.frozenCause ?? 'undefined'} (${err.message})`);
        if (!err.message.startsWith('[absent-path]')) throw new Error(`cause not at FRONT of message: ${err.message}`);
        if (!err.message.includes('does not exist in')) throw new Error(`expected the "does not exist in" sub-pattern, got: ${err.message}`);
        return `frozenCause=${err.frozenCause} ("does not exist in" sub-pattern)`;
      }
    }) ? 1 : 0;

    // === lsTreeAtClose unreachable-sha case ===
    passCount += runAssertion(5, "lsTreeAtV15Close('docs/l1-runbooks') throws frozenCause=unreachable-sha (never returns [])", () => {
      try {
        const result = lsTreeAtV15Close('docs/l1-runbooks');
        throw new Error(`expected a throw, got success with ${result.length} entries (green while auditing nothing -- D-36 prohibition)`);
      } catch (err) {
        if (err.frozenCause !== 'unreachable-sha') throw new Error(`expected unreachable-sha, got ${err.frozenCause ?? 'undefined'} (${err.message})`);
        return `frozenCause=${err.frozenCause}, threw (did not return [])`;
      }
    }) ? 1 : 0;

    // === D-31 Case 3 (present on disk, absent at frozen SHA) + empty-file boundary ===
    // Both need a second, local-only commit inside the clone: the clone's own HEAD (captured
    // above as headSha) is still reachable and now becomes the "older" SHA relative to a new
    // commit that adds two throwaway files.
    execFileSync('git', ['config', 'user.email', 'frozen-read-negative-test@example.invalid']);
    execFileSync('git', ['config', 'user.name', 'frozen-read-negative-test']);
    writeFileSync(join(cloneDir, NEW_FILE), 'case 3 fixture -- added after headSha\n');
    writeFileSync(join(cloneDir, EMPTY_FILE), '');
    execFileSync('git', ['add', NEW_FILE, EMPTY_FILE]);
    execFileSync('git', ['commit', '-m', 'frozen-read-negative-test: case 3 + empty-file fixtures']);
    const newSha = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();

    passCount += runAssertion(6, `D-31 Case 3 (present on disk, absent at frozen SHA): readAtRawRef(headSha, '${NEW_FILE}') throws frozenCause=absent-path ("exists on disk, but not in")`, () => {
      try {
        readAtRawRef(headSha, NEW_FILE);
        throw new Error('expected a throw, got success');
      } catch (err) {
        if (err.frozenCause !== 'absent-path') throw new Error(`expected absent-path, got ${err.frozenCause ?? 'undefined'} (${err.message})`);
        if (!err.message.includes('exists on disk, but not in')) throw new Error(`expected the "exists on disk, but not in" sub-pattern (a two-pattern classifier would mis-route this to 'other'), got: ${err.message}`);
        return `frozenCause=${err.frozenCause} ("exists on disk, but not in" sub-pattern)`;
      }
    }) ? 1 : 0;

    passCount += runAssertion(7, `Non-throwing boundary: readAtRawRef(newSha, '${EMPTY_FILE}') returns "" without throwing`, () => {
      const content = readAtRawRef(newSha, EMPTY_FILE);
      if (content !== '') throw new Error(`expected empty string, got ${JSON.stringify(content)}`);
      return 'returned "" (valid-but-empty file never conflated with a failed read)';
    }) ? 1 : 0;

    process.chdir(originalCwd);
  } finally {
    try { process.chdir(originalCwd); } catch { /* already there or cwd gone; best-effort */ }
    rmSync(cloneDir, { recursive: true, force: true });
  }

  process.stdout.write(`\n${passCount}/${total} PASS\n`);
  process.exit(passCount === total ? 0 : 1);
}

main();
