#!/usr/bin/env node
'use strict';
/*
 * v1.20-carve-gate.cjs -- GSD Stop hook: GOV-02 edit-discipline enforcement for the v1.20
 * CARVE (139-CONTEXT.md D-08).
 *
 * Clones .claude/hooks/publish-bundle-gate.cjs's skeleton verbatim: stdin parse,
 * stop_hook_active early-allow, allow()/block(reason) helpers, the pure computeDecision()
 * seam, and the outer fail-open wrapper.
 *
 * Spawns `node scripts/validation/carve-gate.mjs --json` read-only. On exit 0 -> allow(). On
 * non-zero -> D-08's nudge-then-warn: the first fire for a given off-list PATH SET emits a
 * NUDGE naming the off-list paths and pointing at the CARVE's Amendment procedure section; the
 * second and subsequent fires for the SAME off-list set emit a WARN additionally stating the
 * gate is hard-blocking in the plan's verification step. No third exit path beyond allow() and
 * block(reason).
 *
 * The hook is strictly read-only with respect to the repository: it never edits a tracked
 * file, never stages, never runs `git add`/`git commit`. Its ONLY write is a small
 * gitignored scratch counter under .claude/tmp/ (already ignored -- see .gitignore) so a
 * repeat fire for an UNCHANGED off-list set can be told apart from a fresh one.
 *
 * NOTE: .claude/settings.local.json is gitignored, so this hook's registration is
 * machine-local and does not travel with `git clone` -- this is the accepted repo convention
 * (both existing Stop hooks, jira-milestone-gate.cjs and publish-bundle-gate.cjs, are
 * registered the same way), not a defect to fix here.
 *
 * Fail-open everywhere: any parse/IO error, missing gate script, or spawn failure -> allow().
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('node:child_process');

function readStdin() { try { return fs.readFileSync(0, 'utf8'); } catch { return ''; } }
function allow() { process.exit(0); }
function block(reason) { process.stdout.write(JSON.stringify({ decision: 'block', reason })); process.exit(0); }

// ANCHORED version/tag validation -- reused verbatim from publish-bundle-gate.cjs's
// path-traversal mitigation (T-127-02). This hook's only path-relevant constant
// (MILESTONE_TAG below) is validated against it before it is ever concatenated into a path,
// even though today it is a hardcoded literal -- the guard is what makes it SAFE to derive a
// path from a milestone-tag-shaped string at all, now or if this hook is cloned for v1.21+.
const VERSION_RE = /^v?\d+\.\d+(\.\d+)?$/;
const MILESTONE_TAG = 'v1.20';
if (!VERSION_RE.test(MILESTONE_TAG)) {
  // Never true today; if it ever were, fail open rather than build a traversal-shaped path.
  allow();
}

const PROBE_TIMEOUT_MS = 8000; // one gate spawn worst-case; well under the 15s hook ceiling

// computeDecision -- PURE, module-scope, exported. Touches NO I/O. This is the contract the
// --self-test harness exercises.
function computeDecision({ stopHookActive, gateExitCode, priorFireCount }) {
  if (stopHookActive) return { action: 'allow' };
  if (gateExitCode === 0) return { action: 'allow' };
  if (priorFireCount === 0) return { action: 'block', kind: 'nudge' };
  return { action: 'block', kind: 'warn' };
}

function keyForOffList(offList) {
  return crypto.createHash('sha1').update((offList || []).slice().sort().join('\n')).digest('hex');
}

function scratchPath(projectDir) {
  return path.join(projectDir, '.claude', 'tmp', 'v1.20-carve-gate-state.json');
}

function readScratch(projectDir) {
  try { return JSON.parse(fs.readFileSync(scratchPath(projectDir), 'utf8')); } catch { return {}; }
}

function writeScratch(projectDir, obj) {
  try {
    fs.mkdirSync(path.dirname(scratchPath(projectDir)), { recursive: true });
    fs.writeFileSync(scratchPath(projectDir), JSON.stringify(obj));
  } catch {
    // fail-open: a scratch-write failure must never block the hook itself
  }
}

function runGate(projectDir) {
  const gatePath = path.join(projectDir, 'scripts', 'validation', 'carve-gate.mjs');
  if (!fs.existsSync(gatePath)) return { exitCode: 0, offList: [], parsed: true }; // not landed yet -- allow

  let stdout = '';
  try {
    stdout = execFileSync('node', [gatePath, '--json'], {
      cwd: projectDir, stdio: 'pipe', timeout: PROBE_TIMEOUT_MS, encoding: 'utf8',
    });
    return { exitCode: 0, offList: [], parsed: true };
  } catch (err) {
    const out = err.stdout ? err.stdout.toString() : stdout;
    // `parsed` tracks whether we actually recovered a real offList from the gate's own JSON,
    // as distinct from defaulting to [] because the output was unreadable (D-31). A caller must
    // never treat an unparsed [] the same as a confirmed-empty [] -- see the D-31 guard in main().
    let offList = [];
    let parsed = false;
    try {
      const j = JSON.parse(out);
      offList = Array.isArray(j.offList) ? j.offList : [];
      parsed = true;
    } catch { offList = []; parsed = false; }
    const exitCode = typeof err.status === 'number' ? err.status : 1;
    return { exitCode, offList, parsed };
  }
}

function main() {
  let input = {}; try { input = JSON.parse(readStdin() || '{}'); } catch { input = {}; }
  if (input.stop_hook_active === true) allow();
  const projectDir = input.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd();

  const { exitCode, offList, parsed } = runGate(projectDir);

  if (exitCode === 0) {
    const d = computeDecision({ stopHookActive: false, gateExitCode: 0, priorFireCount: 0 });
    if (d.action === 'allow') allow();
  }

  // D-31 hardening: a non-zero gate exit is only real off-list evidence if we actually parsed a
  // non-empty offList out of its JSON. An unparseable result, an unexpected shape, or a genuine
  // empty list on a non-zero exit all mean we cannot confidently name any off-list path -- in
  // every one of those cases this must fail open with a diagnostic, never fall through to a
  // populated nudge/warn message built from data we don't actually have (the reported defect
  // this hardens against: "0 off-list path(s) ... HARD-BLOCKING" on a tree the gate itself
  // passed). This does not change enforcement semantics -- the hook stays advisory (D-10) and
  // carve-gate.mjs's own exit code remains the real gate.
  if (!parsed || offList.length === 0) {
    process.stderr.write(
      'v1.20-carve-gate: gate exited non-zero (code=' + exitCode + ') but ' +
      (parsed ? 'reported zero off-list paths' : 'its output could not be parsed as JSON') +
      ' -- failing open, no off-list path can be confidently named (D-31).\n'
    );
    allow();
  }

  const scratch = readScratch(projectDir);
  const key = keyForOffList(offList);
  const priorFireCount = scratch[key] || 0;

  const decision = computeDecision({ stopHookActive: false, gateExitCode: exitCode, priorFireCount });

  if (decision.action === 'allow') allow();

  scratch[key] = priorFireCount + 1;
  writeScratch(projectDir, scratch);

  if (decision.kind === 'nudge') {
    block(
      'CARVE gate (v1.20-carve-gate): ' + offList.length + ' off-list path(s) -- ' + offList.join(', ') + '.\n' +
      'Resolution: land a D-09 amendment commit to .planning/milestones/v1.20-CARVE.md (that ' +
      'file only, before the edit it authorizes) -- see the CARVE\'s "Amendment procedure" section.'
    );
  }

  if (decision.kind === 'warn') {
    block(
      'CARVE gate (v1.20-carve-gate): STILL ' + offList.length + ' off-list path(s) -- ' + offList.join(', ') + '.\n' +
      'This is HARD-BLOCKING in the plan verification step (`node scripts/validation/carve-gate.mjs`). ' +
      'Land a D-09 amendment commit before continuing.'
    );
  }

  allow();
}

module.exports = { computeDecision };

// === Self-test (--self-test): pure, synthetic-fixture-driven proof of computeDecision()'s
// decision matrix. Gated behind require.main === module so a self-test run never reads real
// stdin and never spawns the real gate. ===
function runSelfTest() {
  let passed = 0, failed = 0;
  function assert(label, ok, detail) {
    process.stdout.write((ok ? 'PASS' : 'FAIL') + ' -- ' + label + (detail ? ' (' + detail + ')' : '') + '\n');
    if (ok) passed++; else failed++;
  }

  assert('allow on gate-exit-0',
    computeDecision({ stopHookActive: false, gateExitCode: 0, priorFireCount: 0 }).action === 'allow');

  const first = computeDecision({ stopHookActive: false, gateExitCode: 1, priorFireCount: 0 });
  assert('nudge on first non-zero fire', first.action === 'block' && first.kind === 'nudge', JSON.stringify(first));

  const repeat = computeDecision({ stopHookActive: false, gateExitCode: 1, priorFireCount: 1 });
  assert('warn on repeat non-zero fire (unchanged off-list set)', repeat.action === 'block' && repeat.kind === 'warn', JSON.stringify(repeat));

  const stopped = computeDecision({ stopHookActive: true, gateExitCode: 1, priorFireCount: 5 });
  assert('allow when stop_hook_active (early-allow guard)', stopped.action === 'allow', JSON.stringify(stopped));

  assert('keyForOffList is stable regardless of input order',
    keyForOffList(['b.mjs', 'a.mjs']) === keyForOffList(['a.mjs', 'b.mjs']));

  assert('keyForOffList differs for different off-list sets',
    keyForOffList(['a.mjs']) !== keyForOffList(['b.mjs']));

  process.stdout.write('\n' + passed + '/' + (passed + failed) + ' PASS\n');
  process.exit(failed > 0 ? 1 : 0);
}

if (require.main === module) {
  if (process.argv.slice(2).includes('--self-test')) {
    runSelfTest();
  } else {
    try { main(); } catch { process.exit(0); }
  }
}
