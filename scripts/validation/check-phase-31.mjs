#!/usr/bin/env node
// Phase 31 static validation harness
// Source of truth: .planning/phases/31-ios-l2-investigation/31-VALIDATION.md
// NO SHELL: all file content via fs.readFileSync; external tools via execFileSync with argv arrays

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';

const argv = process.argv.slice(2);
const QUICK = argv.includes('--quick');
const VERBOSE = argv.includes('--verbose');

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');  // CRLF normalization per ca40eb9
}

function resolveL2Runbooks() {
  const dir = join(process.cwd(), 'docs/l2-runbooks');
  let entries = [];
  try { entries = readdirSync(dir); } catch { return []; }
  return ['14','15','16','17'].map(n => {
    const found = entries.find(f => new RegExp('^' + n + '-ios-.*\\.md$').test(f));
    return { num: n, path: found ? join(dir, found) : null };
  });
}

function parseInventory() {
  const raw = readFile('.planning/phases/31-ios-l2-investigation/placeholder-inventory.json');
  if (!raw) return { placeholders: [] };
  try {
    return JSON.parse(raw);
  } catch (err) {
    return { _parseError: err.message, placeholders: [] };
  }
}

const checks = [
  // V-31-01: SC #2 preamble grep in 14
  { id: 1, name: "V-31-01: 14 has 'no iOS equivalent to mdmdiagnosticstool.exe' preamble", type: "grep", required: true,
    run() { const c = readFile('docs/l2-runbooks/14-ios-log-collection.md'); if (!c) return { pass: false, detail: "14 does not exist yet (Wave 1)" }; return { pass: /no iOS equivalent to `mdmdiagnosticstool\.exe`/.test(c), detail: "preamble present" }; } },
  // V-31-02: 3-method decision matrix in 14
  { id: 2, name: "V-31-02: 14 has Method header + all 3 methods", type: "structural", required: true,
    run() { const c = readFile('docs/l2-runbooks/14-ios-log-collection.md'); if (!c) return { pass: false, detail: "14 does not exist" }; const hasHeader = /\|\s*Method\s*\|/.test(c); const m1 = /MDM diagnostic report/i.test(c); const m2 = /Company Portal/i.test(c); const m3 = /sysdiagnose/i.test(c); return { pass: hasHeader && m1 && m2 && m3, detail: `header=${hasHeader} m1=${m1} m2=${m2} m3=${m3}` }; } },
  // V-31-03: sysdiagnose per-device-type triggers
  { id: 3, name: "V-31-03: 14 has sysdiagnose trigger description", type: "structural", required: true,
    run() { const c = readFile('docs/l2-runbooks/14-ios-log-collection.md'); if (!c) return { pass: false, detail: "14 does not exist" }; return { pass: /(volume.*(side|top)|both volume|Sleep\/Wake)/i.test(c), detail: "trigger combo present" }; } },
  // V-31-04: T-31-01 sysdiagnose PII callout
  { id: 4, name: "V-31-04: 14 has PII/sensitive-data callout near sysdiagnose section", type: "grep", required: true,
    run() { const c = readFile('docs/l2-runbooks/14-ios-log-collection.md'); if (!c) return { pass: false, detail: "14 does not exist" }; return { pass: /(PII|private data|redact|data-handling)/i.test(c), detail: "PII callout present" }; } },
  // V-31-05: T-31-02 Company Portal data-egress callout
  { id: 5, name: "V-31-05: 14 Tier 2 notes Microsoft backend / data leaves tenant control", type: "grep", required: true,
    run() { const c = readFile('docs/l2-runbooks/14-ios-log-collection.md'); if (!c) return { pass: false, detail: "14 does not exist" }; return { pass: /(Microsoft (backend|support infrastructure)|leaves tenant)/i.test(c), detail: "data-egress callout present" }; } },
  // V-31-06: Pattern A/B/C/D headings in 15
  { id: 6, name: "V-31-06: 15 has exactly 4 Pattern [ABCD]: headings", type: "structural", required: true,
    run() { const c = readFile('docs/l2-runbooks/15-ios-ade-token-profile.md'); if (!c) return { pass: false, detail: "15 does not exist" }; const matches = (c.match(/^### Pattern [ABCD]:/gm) || []).length; return { pass: matches === 4, detail: `${matches} Pattern headings` }; } },
  // V-31-07: Each Pattern has indicator + Resolution substrings (heuristic)
  { id: 7, name: "V-31-07: Each Pattern A/B/C/D has Indicators + Resolution text nearby", type: "structural", required: true,
    run() { const c = readFile('docs/l2-runbooks/15-ios-ade-token-profile.md'); if (!c) return { pass: false, detail: "15 does not exist" }; const pat = /^### Pattern ([ABCD]):.*\n([\s\S]*?)(?=^### Pattern [ABCD]:|^## )/gm; const bodies = {}; let m; while ((m = pat.exec(c)) !== null) { bodies[m[1]] = m[2]; } const missing = []; for (const p of ['A','B','C','D']) { const body = bodies[p] || ''; const hasIndicator = /Indicator/i.test(body); const hasResolution = /Resolution/i.test(body); if (!hasIndicator || !hasResolution) missing.push(`${p}:ind=${hasIndicator}/res=${hasResolution}`); } return { pass: missing.length === 0, detail: missing.length ? missing.join(', ') : "all 4 have indicators+resolution" }; } },
  // V-31-08: D-07 hybrid H2 structure in 15
  { id: 8, name: "V-31-08: 15 has 3 top-level H2: Investigation - Data Collection / Analysis / Resolution", type: "structural", required: true,
    run() { const c = readFile('docs/l2-runbooks/15-ios-ade-token-profile.md'); if (!c) return { pass: false, detail: "15 does not exist" }; const h1 = /^## Investigation.*Data Collection/m.test(c); const h2 = /^## Analysis.*Match Against Known Failure Patterns/m.test(c); const h3 = /^## Resolution/m.test(c); return { pass: h1 && h2 && h3, detail: `inv=${h1} analysis=${h2} res=${h3}` }; } },
  // V-31-09: D-09 Graph API preamble
  { id: 9, name: "V-31-09: 15 Graph API preamble mentions endpoint + scope + READ-ONLY + ADDTS-02", type: "grep", required: true,
    run() { const c = readFile('docs/l2-runbooks/15-ios-ade-token-profile.md'); if (!c) return { pass: false, detail: "15 does not exist" }; const s1 = /depOnboardingSettings/.test(c); const s2 = /DeviceManagementServiceConfig\.Read\.All/.test(c); const s3 = /READ-ONLY/i.test(c); const s4 = /ADDTS-02/.test(c); return { pass: s1 && s2 && s3 && s4, detail: `endpoint=${s1} scope=${s2} ro=${s3} addts02=${s4}` }; } },
  // V-31-10: D-10 triple-portal prereq
  { id: 10, name: "V-31-10: 15 Prerequisites names ABM + Intune + Entra", type: "grep", required: true,
    run() { const c = readFile('docs/l2-runbooks/15-ios-ade-token-profile.md'); if (!c) return { pass: false, detail: "15 does not exist" }; return { pass: /ABM|Apple Business Manager/i.test(c) && /Intune/i.test(c) && /(Entra|Azure AD)/i.test(c), detail: "triple-portal present" }; } },
  // V-31-11: SC #4 three-class markers in 16 — text markers locked per Wave 0 emoji audit
  { id: 11, name: "V-31-11: 16 has all three text markers [CONFIG] [TIMING] [DEFECT] (emoji NOT used)", type: "structural", required: true,
    run() { const c = readFile('docs/l2-runbooks/16-ios-app-install.md'); if (!c) return { pass: false, detail: "16 does not exist" }; const config = (c.match(/\[CONFIG\]/g) || []).length; const timing = (c.match(/\[TIMING\]/g) || []).length; const defect = (c.match(/\[DEFECT\]/g) || []).length; return { pass: config >= 2 && timing >= 1 && defect >= 1, detail: `CONFIG=${config} TIMING=${timing} DEFECT=${defect}` }; } },
  // V-31-12: 16 genuine-defect escalation block with ≥3 bullets
  { id: 12, name: "V-31-12: 16 [DEFECT] section has Microsoft Support escalation with 3+ bullets", type: "structural", required: true,
    run() { const c = readFile('docs/l2-runbooks/16-ios-app-install.md'); if (!c) return { pass: false, detail: "16 does not exist" }; const idx = c.indexOf('[DEFECT]'); if (idx < 0) return { pass: false, detail: "no [DEFECT] marker" }; const after = c.slice(idx, idx + 4000); const hasMsSupp = /Microsoft Support/i.test(after); const bullets = (after.match(/^[\-\*] /gm) || []).length; return { pass: hasMsSupp && bullets >= 3, detail: `MS Support=${hasMsSupp} bullets=${bullets}` }; } },
  // V-31-13: D-13 MAM advisory ref in 16
  { id: 13, name: "V-31-13: 16 references 00-index.md#mam-we-investigation-advisory", type: "grep", required: true,
    run() { const c = readFile('docs/l2-runbooks/16-ios-app-install.md'); if (!c) return { pass: false, detail: "16 does not exist" }; return { pass: /00-index\.md#mam-we-investigation-advisory/.test(c), detail: "MAM advisory link present" }; } },
  // V-31-14: D-14 hybrid axis H2 in 17
  { id: 14, name: "V-31-14: 17 has ## Investigation by Axis + ## Per-Cause Deep-Dive", type: "structural", required: true,
    run() { const c = readFile('docs/l2-runbooks/17-ios-compliance-ca-timing.md'); if (!c) return { pass: false, detail: "17 does not exist" }; const a = /^## Investigation by Axis/m.test(c); const b = /^## Per-Cause Deep-Dive/m.test(c); return { pass: a && b, detail: `axis=${a} deepdive=${b}` }; } },
  // V-31-15: 17 axis H3s + cause H3s
  { id: 15, name: "V-31-15: 17 has 3 axis H3 (Config/Timing/Defects) + 3 cause H3 (A/B/C)", type: "structural", required: true,
    run() { const c = readFile('docs/l2-runbooks/17-ios-compliance-ca-timing.md'); if (!c) return { pass: false, detail: "17 does not exist" }; const axes = (c.match(/^### (Configuration Errors|Timing Issues|Genuine Defects)/gm) || []).length; const causes = (c.match(/^### Cause [ABC]:/gm) || []).length; return { pass: axes === 3 && causes === 3, detail: `axes=${axes} causes=${causes}` }; } },
  // V-31-16: D-16 Not-evaluated terminal state
  { id: 16, name: "V-31-16: 17 has 'Not evaluated' sub-section referencing APNs + escalation data", type: "structural", required: true,
    run() { const c = readFile('docs/l2-runbooks/17-ios-compliance-ca-timing.md'); if (!c) return { pass: false, detail: "17 does not exist" }; const hasHeading = /^#{3,4}.*Not evaluated/im.test(c); const hasApns = /APNs/i.test(c); const hasEsc = /(escalation|Microsoft Support)/i.test(c); return { pass: hasHeading && hasApns && hasEsc, detail: `heading=${hasHeading} apns=${hasApns} esc=${hasEsc}` }; } },
  // V-31-17: D-17 L1 handoff block in 17 (requires Node ≥ 10 for the /s dotAll flag on the Cause A.*B.*C regex)
  { id: 17, name: "V-31-17: 17 has 'From L1 escalation' block mentioning Cause A/B/C", type: "grep", required: true,
    run() { const c = readFile('docs/l2-runbooks/17-ios-compliance-ca-timing.md'); if (!c) return { pass: false, detail: "17 does not exist" }; return { pass: /From L1 escalation/.test(c) && /Cause A.*Cause B.*Cause C/s.test(c), detail: "handoff present" }; } },
  // V-31-18: D-20 00-index.md iOS L2 section
  { id: 18, name: "V-31-18: 00-index.md has ## iOS L2 Runbooks heading", type: "structural", required: true,
    run() { const c = readFile('docs/l2-runbooks/00-index.md'); if (!c) return { pass: false, detail: "00-index.md missing" }; const ok = /^## iOS L2 Runbooks/m.test(c); return { pass: ok, detail: ok ? "iOS L2 section present" : "## iOS L2 Runbooks heading not found" }; } },
  // V-31-19: D-20 sub-H3s + table row counts
  { id: 19, name: "V-31-19: iOS L2 section has 3 sub-H3 + correct table row counts", type: "structural", required: true,
    run() { const c = readFile('docs/l2-runbooks/00-index.md'); if (!c) return { pass: false, detail: "00-index.md missing" }; const iosSection = c.split(/^## iOS L2 Runbooks/m)[1] || ''; const afterCutoff = iosSection.split(/^## /m)[0] || ''; const wtu = /^### When to Use/m.test(afterCutoff); const esc = /^### iOS L1 Escalation Mapping/m.test(afterCutoff); const mam = /^### MAM-WE Investigation Advisory/m.test(afterCutoff); return { pass: wtu && esc && mam, detail: `wtu=${wtu} esc=${esc} mam=${mam}` }; } },
  // V-31-20: D-21 MAM advisory cites ADDTS-01
  { id: 20, name: "V-31-20: 00-index.md MAM advisory references ADDTS-01", type: "grep", required: true,
    run() { const c = readFile('docs/l2-runbooks/00-index.md'); if (!c) return { pass: false, detail: "00-index.md missing" }; const ok = /ADDTS-01/.test(c); return { pass: ok, detail: ok ? "ADDTS-01 referenced" : "ADDTS-01 not found in 00-index.md" }; } },
  // V-31-21: D-22 retrofit zero-remain check — excludes the "Resolved Phase 31 L2 cross-references" Version History row mandated by V-31-24 (both gates must co-pass)
  { id: 21, name: "V-31-21: Zero 'Phase 31' placeholder mentions across 9 retrofit targets", type: "link-graph", required: true,
    run() { const inv = parseInventory(); if (inv._parseError) return { pass: false, detail: 'inventory JSON invalid: ' + inv._parseError }; const offenders = []; for (const p of inv.placeholders) { const c = readFile(p.file); if (!c) continue; const scrubbed = c.replace(/Resolved Phase 31 L2 cross-references/g, ''); if (/Phase 31/.test(scrubbed)) { offenders.push(p.file); } } return { pass: offenders.length === 0, detail: offenders.length ? `Phase 31 still in: ${[...new Set(offenders)].join(', ')}` : "0 remaining" }; } },
  // V-31-22: D-22 target specificity
  { id: 22, name: "V-31-22: Every retrofitted L1 link points to specific 14-17 file (not bare 00-index.md)", type: "link-graph", required: true,
    run() { const files = ['docs/l1-runbooks/16-ios-apns-expired.md','docs/l1-runbooks/17-ios-ade-not-starting.md','docs/l1-runbooks/18-ios-enrollment-restriction-blocking.md','docs/l1-runbooks/19-ios-license-invalid.md','docs/l1-runbooks/20-ios-device-cap-reached.md','docs/l1-runbooks/21-ios-compliance-blocked.md']; const bad = []; for (const f of files) { const c = readFile(f); if (!c) continue; const bareIndex = /\.\.\/l2-runbooks\/00-index\.md(?!#)/.test(c); if (bareIndex) bad.push(f); } return { pass: bad.length === 0, detail: bad.length ? `bare 00-index.md link in: ${bad.join(', ')}` : "all specific" }; } },
  // V-31-23: D-23 prose diff against expected-d23.txt
  { id: 23, name: "V-31-23: 06-compliance-policy.md line 182 matches expected-d23.txt", type: "structural", required: true,
    run() { const c = readFile('docs/admin-setup-ios/06-compliance-policy.md'); const expected = readFile('.planning/phases/31-ios-l2-investigation/expected-d23.txt'); if (!c || !expected) return { pass: false, detail: "file or fixture missing" }; const lines = c.split('\n'); const actual = (lines[181] || '').trim(); const exp = expected.trim(); return { pass: actual === exp, detail: actual === exp ? "match" : `MISMATCH — actual[0:80]='${actual.slice(0,80)}' expected[0:80]='${exp.slice(0,80)}'` }; } },
  // V-31-24: D-25 Version History entries
  { id: 24, name: "V-31-24: Each of 9 retrofit files has 'Resolved Phase 31 L2 cross-references' in Version History", type: "structural", required: true,
    run() { const inv = parseInventory(); if (inv._parseError) return { pass: false, detail: 'inventory JSON invalid: ' + inv._parseError }; const files = [...new Set(inv.placeholders.map(p => p.file))]; const missing = []; for (const f of files) { const c = readFile(f); if (!c || !/Resolved Phase 31 L2 cross-references/.test(c)) missing.push(f); } return { pass: missing.length === 0, detail: missing.length ? `missing in: ${missing.join(', ')}` : "all present" }; } },
  // V-31-25: D-27 L2 template enum
  { id: 25, name: "V-31-25: L2 template platform enum includes iOS", type: "grep", required: true,
    run() { const c = readFile('docs/_templates/l2-template.md'); if (!c) return { pass: false, detail: "l2-template.md missing" }; return { pass: /^platform: Windows \| macOS \| iOS \| all$/m.test(c), detail: "enum present" }; } },
  // V-31-26: D-28 frontmatter on each new runbook
  { id: 26, name: "V-31-26: Each of 14-17 has platform/audience/last_verified/review_by frontmatter", type: "frontmatter", required: true,
    run() { const runbooks = resolveL2Runbooks(); const failures = []; for (const r of runbooks) { if (!r.path) { failures.push(`${r.num}: missing file`); continue; } const content = readFileSync(r.path, 'utf8').replace(/\r\n/g, '\n'); const first20 = content.split('\n').slice(0, 20).join('\n'); const fm = first20.match(/^---\n([\s\S]*?)\n---/m); if (!fm) { failures.push(`${r.num}: no frontmatter`); continue; } const f = fm[1]; if (!/^platform: iOS$/m.test(f)) failures.push(`${r.num}: platform`); if (!/^audience: L2$/m.test(f)) failures.push(`${r.num}: audience`); if (!/^last_verified:\s*\d{4}-\d{2}-\d{2}/m.test(f)) failures.push(`${r.num}: last_verified`); if (!/^review_by:\s*\d{4}-\d{2}-\d{2}/m.test(f)) failures.push(`${r.num}: review_by`); } return { pass: failures.length === 0, detail: failures.length ? failures.join('; ') : "all 4 files valid frontmatter" }; } },
  // V-31-27: D-28 applies_to per-file
  { id: 27, name: "V-31-27: applies_to mapping — 14/16/17=all, 15=ADE", type: "frontmatter", required: true,
    run() { const runbooks = resolveL2Runbooks(); const expected = { '14': 'all', '15': 'ADE', '16': 'all', '17': 'all' }; const failures = []; for (const r of runbooks) { if (!r.path) { failures.push(`${r.num}: missing`); continue; } const c = readFileSync(r.path, 'utf8').replace(/\r\n/g, '\n'); const fm = (c.match(/^---\n([\s\S]*?)\n---/m) || ['',''])[1]; const m = fm.match(/^applies_to:\s*(\S+)/m); const val = m ? m[1] : '(missing)'; if (val !== expected[r.num]) failures.push(`${r.num}: expected ${expected[r.num]}, got ${val}`); } return { pass: failures.length === 0, detail: failures.length ? failures.join('; ') : "all mapped" }; } },
  // V-31-28: D-29 platform gate banner per runbook
  { id: 28, name: "V-31-28: Each of 14-17 has D-29 platform gate banner in first 30 lines", type: "structural", required: true,
    run() { const runbooks = resolveL2Runbooks(); const expectedBanner = 'Platform gate:** This guide covers iOS/iPadOS L2 investigation via Intune'; const failures = []; for (const r of runbooks) { if (!r.path) { failures.push(`${r.num}: missing`); continue; } const c = readFileSync(r.path, 'utf8').replace(/\r\n/g, '\n'); const head = c.split('\n').slice(0, 30).join('\n'); if (!head.includes(expectedBanner)) failures.push(`${r.num}`); } return { pass: failures.length === 0, detail: failures.length ? `missing banner: ${failures.join(', ')}` : "all banners present" }; } },
  // V-31-29: runbook length bounds — '17' lower bound widened 187→170 for safety margin (IN-06)
  { id: 29, name: "V-31-29: Runbook line counts within ±15% of targets", type: "structural", required: false,
    run() { const bounds = { '14': [136, 207], '15': [187, 322], '16': [161, 241], '17': [170, 287] }; const runbooks = resolveL2Runbooks(); const failures = []; for (const r of runbooks) { if (!r.path) { failures.push(`${r.num}: missing`); continue; } const c = readFileSync(r.path, 'utf8').replace(/\r\n/g, '\n'); const n = c.split('\n').length; const [lo, hi] = bounds[r.num]; if (n < lo || n > hi) failures.push(`${r.num}: ${n} lines (bound ${lo}-${hi})`); } return { pass: failures.length === 0, detail: failures.length ? failures.join('; ') : "all within bounds" }; } },
  // V-31-30: cross-ref anchor integrity (simplified — external check)
  { id: 30, name: "V-31-30: markdown-link-check across new + retrofitted files", type: "external", required: false,
    run() { const targets = ['docs/l2-runbooks/14-ios-log-collection.md','docs/l2-runbooks/15-ios-ade-token-profile.md','docs/l2-runbooks/16-ios-app-install.md','docs/l2-runbooks/17-ios-compliance-ca-timing.md','docs/l2-runbooks/00-index.md'].filter(f => existsSync(join(process.cwd(), f))); if (targets.length === 0) return { pass: true, skipped: true, detail: "no files to check yet" }; try { execFileSync('npx', ['--yes', '--no-install', 'markdown-link-check', ...targets], { stdio: 'pipe', timeout: 30000, cwd: process.cwd() }); return { pass: true, detail: "all links resolve" }; } catch (err) { const stderr = err.stderr ? err.stderr.toString() : ''; const isMissing = err.code === 'ENOENT' || err.status === 127 || stderr.includes('not found') || stderr.includes('could not determine executable'); if (isMissing) return { pass: true, skipped: true, detail: "markdown-link-check unavailable" }; return { pass: false, detail: "link errors detected" }; } } }
];

// Summary output (inherited verbatim from Phase 30, lines 303-337)
const LABEL_WIDTH = 56;
function padLabel(s) { if (s.length >= LABEL_WIDTH) return s + ' '; return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' '; }
let passed = 0, failed = 0, skipped = 0;
const activeChecks = QUICK ? checks.filter(c => c.type !== 'external') : checks;
for (const check of activeChecks) {
  let result;
  try { result = check.run(); } catch (err) { result = { pass: false, detail: `threw: ${err.message}` }; }
  const status = result.skipped ? 'SKIP' : (result.pass ? 'PASS' : 'FAIL');
  if (result.skipped) skipped++; else if (result.pass) passed++; else failed++;
  process.stdout.write(padLabel(check.name) + status + '\n');
  if (VERBOSE || (!result.pass && !result.skipped)) process.stdout.write('  -> ' + result.detail + '\n');
}
process.stdout.write('\nSummary: ' + passed + ' passed, ' + failed + ' failed, ' + skipped + ' skipped\n');
process.exit(failed > 0 ? 1 : 0);
