#!/usr/bin/env node
'use strict';
/*
 * publish-bundle-gate.cjs -- GSD Stop hook: automated milestone-completion publish-bundle
 * trigger (127-CONTEXT.md D-01..D-05).
 *
 * Sibling to .claude/hooks/jira-milestone-gate.cjs -- clones its skeleton verbatim: stdin
 * parse, stop_hook_active early-allow, allow()/block(reason) helpers, the STATE.md
 * frontmatter grab() parser, and the outer fail-open wrapper. Drops the Jira-specific
 * mapping.json / ROADMAP phase-count logic (not needed here).
 *
 * On the milestone-complete transition, when the versioned dist/docs-library-vX.Y.zip is
 * ABSENT (D-04, read-only idempotency check), it nudges the agent via block(reason) to run
 * `node scripts/pipeline/build-publish-bundle.mjs --version=<milestone>` in the foreground
 * (D-02 -- the hook never runs the batch itself; the foreground has no timeout ceiling).
 * It probes pandoc/pwsh presence first (self-contained, no cross-module import of the ESM
 * pipeline) and degrades to a warn-and-allow block(reason) that explicitly states the close
 * is NOT blocked when a prerequisite is missing (D-03).
 *
 * Fail-open everywhere: any parse/IO error or missing file -> allow (exit 0). Read-only on
 * STATE.md -- never writes it. The only two output paths are allow() [exit 0, silent] and
 * block(reason) [exit 0, with a JSON decision field] -- no other termination path is used.
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('node:child_process');

function readStdin(){ try { return fs.readFileSync(0,'utf8'); } catch { return ''; } }
function allow(){ process.exit(0); }
function block(reason){ process.stdout.write(JSON.stringify({decision:'block',reason})); process.exit(0); }

// ANCHORED ($-terminated) version validation. Same anchoring + shape as 127-01's
// deriveZipName() (`^v\d+\.\d+(\.\d+)?$`); the ONLY intentional difference is the optional
// `v` prefix (`v?`) here, because STATE's `milestone:` field is not guaranteed to carry the
// leading `v` -- it is normalized to a `v`-prefixed string (see normalizedVersion below)
// BEFORE it ever reaches zipName, so both forms converge on the same validated output.
// The trailing $ is load-bearing security (T-127-02): an UNANCHORED `^v?\d+\.\d+` prefix
// form would admit a traversal-shaped value like `v1.17/../../secrets`, which would then
// flow unsanitized into normalizedVersion -> zipName -> the dist/<zipName> existsSync,
// turning a read-only check into an arbitrary-file-existence oracle outside dist/.
const VERSION_RE = /^v?\d+\.\d+(\.\d+)?$/;

// Identical regex/logic to jira-milestone-gate.cjs:72 (RESEARCH.md Don't-Hand-Roll) --
// reusing the exact same completeSignal computation avoids the two Stop hooks disagreeing
// about milestone-completeness on the same turn.
const COMPLETE_SIGNAL_RE = /milestone[_\s-]*complete|awaiting next milestone|shipped|archived/;

// Tight: two probes worst-case = 8s, well under the 15s hook ceiling (RESEARCH.md Pattern 3).
const PROBE_TIMEOUT_MS = 4000;

function probePandoc() {
  try {
    execFileSync('pandoc', ['--version'], { stdio: 'pipe', timeout: PROBE_TIMEOUT_MS });
    return true;
  } catch (e) {
    if (e.code === 'ENOENT' || e.status === 127) {
      const localAppData = process.env.LOCALAPPDATA;
      if (localAppData) {
        const fallback = path.join(localAppData, 'Pandoc', 'pandoc.exe');
        return fs.existsSync(fallback);
      }
      return false;
    }
    // Probe timed out / was killed (hung binary): treat as UNAVAILABLE, not present. A hung
    // pandoc would only hang the nudged pipeline too, so degrade to the warn-and-allow path
    // (conservative, matching probePwsh's catch-all-returns-false posture).
    if (e.killed === true || e.signal === 'SIGTERM' || e.code === 'ETIMEDOUT') return false;
    return true; // non-ENOENT, non-timeout error (e.g. wrong-version banner) still means the
                 // binary exists; the pipeline's convert.ps1 version-pin guard is authoritative
  }
}

function probePwsh() {
  try {
    execFileSync('pwsh', ['-NoProfile', '-Command', 'exit 0'], { stdio: 'pipe', timeout: PROBE_TIMEOUT_MS });
    return true;
  } catch {
    return false;
  }
}

// computeDecision -- PURE, module-scope, exported. Touches NO I/O. This is the contract
// the --self-test harness exercises (SC#3).
function computeDecision({ stopHookActive, version, status, percent, zipExists, pandocOk, pwshOk }) {
  if (stopHookActive) return { action: 'allow' };
  // ANCHORED validation duplicated here (in addition to main()'s STATE-parse gate) so the
  // pure decision function is safe to call standalone from the self-test with synthetic,
  // possibly-malformed fixtures.
  if (!version || !VERSION_RE.test(version)) return { action: 'allow' };
  const lowerStatus = (status || '').toLowerCase();
  const completeSignal = COMPLETE_SIGNAL_RE.test(lowerStatus) && percent === 100;
  if (!completeSignal) return { action: 'allow' };
  if (zipExists) return { action: 'allow' }; // D-04: read-only idempotency guard
  if (pandocOk && pwshOk) return { action: 'block', kind: 'nudge' };
  const missing = [!pandocOk && 'pandoc', !pwshOk && 'pwsh'].filter(Boolean);
  return { action: 'block', kind: 'warn', missing };
}

function main(){
  let input={}; try { input=JSON.parse(readStdin()||'{}'); } catch { input={}; }
  if (input.stop_hook_active===true) allow();
  const projectDir = input.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd();
  const statePath = path.join(projectDir,'.planning','STATE.md');
  if (!fs.existsSync(statePath)) allow();
  let stateText;
  try { stateText=fs.readFileSync(statePath,'utf8'); } catch { allow(); }
  const fmMatch = stateText.match(/^---\s*([\s\S]*?)\s*---/);
  const fm = fmMatch ? fmMatch[1] : stateText;
  const grab=(re,src=fm)=>{ const m=src.match(re); return m?m[1].trim().replace(/^["']|["']$/g,''):null; };
  const version = grab(/^milestone:\s*(.+)$/m);
  const status = (grab(/^status:\s*(.+)$/m)||'').toLowerCase();
  const percent = parseInt(grab(/percent:\s*(\d+)/)||'0',10);
  if (!version || !VERSION_RE.test(version)) allow(); // ANCHORED -- see VERSION_RE comment above

  const normalizedVersion = version.startsWith('v') ? version : 'v' + version;
  const zipName = `docs-library-${normalizedVersion}.zip`;
  const zipPath = path.join(projectDir, 'dist', zipName);
  let zipExists = false;
  try { zipExists = fs.existsSync(zipPath); } catch { zipExists = false; }

  // Only probe prerequisites when a nudge/warn is actually in play -- keeps the probes off
  // the hot path for the common allow() case (zip already built, or milestone not complete).
  const completeSignalPreCheck = COMPLETE_SIGNAL_RE.test(status) && percent === 100;
  let pandocOk = false, pwshOk = false;
  if (completeSignalPreCheck && !zipExists) {
    pandocOk = probePandoc();
    pwshOk = probePwsh();
  }

  const decision = computeDecision({
    stopHookActive: false,
    version, status, percent,
    zipExists, pandocOk, pwshOk,
  });

  if (decision.action === 'allow') allow();

  if (decision.kind === 'nudge') {
    block(
      `Milestone ${version} is complete and ${zipName} has not been built yet.\n` +
      `Run this now in the foreground: node scripts/pipeline/build-publish-bundle.mjs --version=${normalizedVersion}\n` +
      `(This is NOT a block on the close -- you may also skip this and run it later.)`
    );
  }

  if (decision.kind === 'warn') {
    const missing = (decision.missing || []).join(', ');
    block(
      `Milestone ${version} is complete but the publish-bundle prerequisite(s) [${missing}] are not available in this environment.\n` +
      `The milestone close is NOT blocked. Once ${missing} is installed, run manually:\n` +
      `  node scripts/pipeline/build-publish-bundle.mjs --version=${normalizedVersion}`
    );
  }

  allow();
}

module.exports = { computeDecision };

// === Self-test (--self-test): pure, synthetic-fixture-driven proof of the full decision
// matrix, including the mandatory absent-prerequisite warn-and-allow path (SC#3). Gated
// behind require.main === module (the CJS equivalent of the .mjs isMainModule check) so a
// self-test run never reads real stdin/STATE and never spawns a real Stop-hook flow, and
// performs no fs/subprocess I/O at all -- computeDecision() is pure. ===
function runSelfTest() {
  let stPassed = 0, stFailed = 0;
  const LABEL_WIDTH = 72;
  function padLabel(s) {
    if (s.length >= LABEL_WIDTH) return s + ' ';
    return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
  }
  function stAssert(label, pass, detail) {
    const tag = pass ? 'PASS' : 'FAIL';
    process.stdout.write(padLabel('[ST] ' + label) + tag + (detail ? ' -- ' + detail : '') + '\n');
    if (pass) stPassed++; else stFailed++;
  }
  function stTry(label, fn) {
    try { fn(); } catch (err) { stAssert(label, false, err.message); }
  }

  process.stdout.write('publish-bundle-gate --self-test (127-02 computeDecision proof, SC#3)\n\n');

  const BASE = { stopHookActive:false, version:'v1.17', status:'shipped', percent:100, zipExists:false, pandocOk:true, pwshOk:true };
  const allResults = [];
  function run(fixture) {
    const r = computeDecision(fixture);
    allResults.push(r);
    return r;
  }

  stTry('(a) nudge fires: complete + zip absent + prereqs present', () => {
    const r = run(BASE);
    stAssert('(a) nudge fires: complete + zip absent + prereqs present', r.action==='block' && r.kind==='nudge', JSON.stringify(r));
  });

  stTry('(b1) warn-and-allow: pandoc absent', () => {
    const r = run({ ...BASE, pandocOk:false });
    stAssert('(b1) warn-and-allow: pandoc absent', r.action==='block' && r.kind==='warn' && r.missing.includes('pandoc'), JSON.stringify(r));
  });

  stTry('(b2) warn-and-allow: pwsh absent', () => {
    const r = run({ ...BASE, pwshOk:false });
    stAssert('(b2) warn-and-allow: pwsh absent', r.action==='block' && r.kind==='warn' && r.missing.includes('pwsh'), JSON.stringify(r));
  });

  stTry('(c) allow: zip already exists (D-04 idempotency)', () => {
    const r = run({ ...BASE, zipExists:true });
    stAssert('(c) allow: zip already exists (D-04 idempotency)', r.action==='allow', JSON.stringify(r));
  });

  stTry('(d) allow: stop_hook_active', () => {
    const r = run({ ...BASE, stopHookActive:true });
    stAssert('(d) allow: stop_hook_active', r.action==='allow', JSON.stringify(r));
  });

  stTry('(e1) allow: completeSignal false (status not complete-shaped)', () => {
    const r = run({ ...BASE, status:'planning' });
    stAssert('(e1) allow: completeSignal false (status not complete-shaped)', r.action==='allow', JSON.stringify(r));
  });

  stTry('(e2) allow: completeSignal false (percent < 100)', () => {
    const r = run({ ...BASE, percent:99 });
    stAssert('(e2) allow: completeSignal false (percent < 100)', r.action==='allow', JSON.stringify(r));
  });

  stTry('(f1) allow: version missing', () => {
    const r = run({ ...BASE, version:null });
    stAssert('(f1) allow: version missing', r.action==='allow', JSON.stringify(r));
  });

  stTry('(f2) allow: version malformed', () => {
    const r = run({ ...BASE, version:'not-a-version' });
    stAssert('(f2) allow: version malformed', r.action==='allow', JSON.stringify(r));
  });

  stTry('(g) allow: traversal-shaped version rejected by anchored validation', () => {
    const r = run({ ...BASE, version:'v1.17/../../secrets' });
    stAssert('(g) allow: traversal-shaped version rejected by anchored validation', r.action==='allow', JSON.stringify(r));
  });

  stTry('(h) invariant: no result has a continue key; action is always allow or block', () => {
    const ok = allResults.every(r => !('continue' in r) && (r.action==='allow' || r.action==='block'));
    stAssert('(h) invariant: no result has a continue key; action is always allow or block', ok, `results=${allResults.length}`);
  });

  process.stdout.write('\n' + stPassed + ' passed, ' + stFailed + ' failed\n');
  process.exit(stFailed > 0 ? 1 : 0);
}

if (require.main === module) {
  if (process.argv.slice(2).includes('--self-test')) {
    runSelfTest();
  } else {
    try { main(); } catch { process.exit(0); }
  }
}
