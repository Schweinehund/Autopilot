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

// ANCHORED ($-terminated) version validation -- mirrors 127-01's deriveZipName() exactly.
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
    return true; // non-ENOENT error (e.g. wrong-version banner) still means the binary exists;
                 // the pipeline's own convert.ps1 version-pin guard is authoritative for that check
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
function computeDecision({ stopHookActive, version, status, percent, completedPhases, zipExists, pandocOk, pwshOk }) {
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
  const completedPhases = parseInt(grab(/completed_phases:\s*(\d+)/)||'0',10);
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
    version, status, percent, completedPhases,
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

try { main(); } catch { process.exit(0); }
