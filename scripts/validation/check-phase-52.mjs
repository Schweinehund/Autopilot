#!/usr/bin/env node
// Phase 52 static validation harness
// Source of truth: .planning/phases/52-linux-l2-investigation-runbooks-24-25/52-CONTEXT.md
// NO SHELL: all file content via fs.readFileSync; no shared module; no external tools
// Implements 22 checks (V-52-01 through V-52-22)

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8');
}

// D-12: Pinned anchor strings — Phase 56+ renaming requires same-commit validator update.
const RB24 = "docs/l2-runbooks/24-linux-log-collection.md";
const RB25 = "docs/l2-runbooks/25-linux-agent-investigation.md";
const VALIDATOR = "scripts/validation/check-phase-52.mjs";
const INDEX = "docs/l2-runbooks/00-index.md";

const NEW_CONTENT_FILES = [RB24, RB25];

const checks = [
  // === FILE EXISTENCE (V-52-01..04) ===
  {
    id: 1, name: "V-52-01: 24-linux-log-collection.md exists",
    run() {
      const c = readFile(RB24);
      if (c === null) return { pass: false, detail: "File missing: " + RB24 };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 2, name: "V-52-02: 25-linux-agent-investigation.md exists",
    run() {
      const c = readFile(RB25);
      if (c === null) return { pass: false, detail: "File missing: " + RB25 };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 3, name: "V-52-03: check-phase-52.mjs exists (self-referential)",
    run() {
      const c = readFile(VALIDATOR);
      if (c === null) return { pass: false, detail: "File missing: " + VALIDATOR };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 4, name: "V-52-04: 00-index.md exists (append target)",
    run() {
      const c = readFile(INDEX);
      if (c === null) return { pass: false, detail: "File missing: " + INDEX };
      return { pass: true, detail: c.length + " bytes" };
    }
  },

  // === FRONTMATTER (V-52-05) ===
  {
    id: 5, name: "V-52-05: both new content files have platform: Linux + audience: L2 + 60-day cycle",
    run() {
      const failures = [];
      for (const f of NEW_CONTENT_FILES) {
        const c = readFile(f);
        if (c === null) { failures.push(f + ": file missing"); continue; }
        const fmMatch = c.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/m);
        if (!fmMatch) { failures.push(f + ": no frontmatter"); continue; }
        const fm = fmMatch[1];
        const issues = [];
        if (!/^platform: Linux\s*$/m.test(fm)) issues.push("platform: Linux missing");
        if (!/^audience: L2\s*$/m.test(fm)) issues.push("audience: L2 missing");
        const lvMatch = fm.match(/^last_verified: (\d{4}-\d{2}-\d{2})\s*$/m);
        const rbMatch = fm.match(/^review_by: (\d{4}-\d{2}-\d{2})\s*$/m);
        if (!lvMatch) issues.push("last_verified missing/invalid");
        if (!rbMatch) issues.push("review_by missing/invalid");
        if (lvMatch && rbMatch) {
          const lv = new Date(lvMatch[1]), rb = new Date(rbMatch[1]);
          const days = (rb - lv) / (1000 * 60 * 60 * 24);
          if (days > 60) issues.push("review_by > 60 days after last_verified (was " + Math.round(days) + ")");
        }
        if (issues.length > 0) failures.push(f + ": " + issues.join("; "));
      }
      if (failures.length === 0) return { pass: true, detail: NEW_CONTENT_FILES.length + " files valid" };
      return { pass: false, detail: failures.join(" | ") };
    }
  },

  // === LAYERED CAVEAT (V-52-06..08) — D-01 GA-1A winner; CDI-Phase52-06 ===
  {
    id: 6, name: "V-52-06: RB24 Decision Matrix Layer 1 — /var/log/microsoft/intune/ row has [LOW-MEDIUM token",
    run() {
      const c = readFile(RB24);
      if (c === null) return { pass: false, detail: "File missing: " + RB24 };
      const tableSection = c.match(/## Decision Matrix([\s\S]*?)(?=\n## |$)/);
      if (!tableSection) return { pass: false, detail: "## Decision Matrix H2 not found" };
      const inTable = tableSection[1].includes("/var/log/microsoft/intune/") && tableSection[1].includes("[LOW-MEDIUM");
      if (!inTable) return { pass: false, detail: "Decision Matrix lacks /var/log/microsoft/intune/ row with [LOW-MEDIUM token" };
      return { pass: true, detail: "Layer 1 matrix-cell confidence token present" };
    }
  },
  {
    id: 7, name: "V-52-07: RB24 Layer 2 — > **Source confidence:** blockquote with LOW-MEDIUM token and /var/log/microsoft/intune/ proximity",
    run() {
      const c = readFile(RB24);
      if (c === null) return { pass: false, detail: "File missing: " + RB24 };
      if (!c.includes("> **Source confidence:**")) return { pass: false, detail: "Layer 2 blockquote `> **Source confidence:**` missing" };
      if (!c.includes("LOW-MEDIUM confidence")) return { pass: false, detail: "`LOW-MEDIUM confidence` token missing in blockquote" };
      if (!c.includes("/var/log/microsoft/intune/")) return { pass: false, detail: "/var/log/microsoft/intune/ path missing" };
      // Proximity check: find blockquote line, check nearest path reference within ±40 lines
      const lines = c.split('\n');
      const bqIdx = lines.findIndex(l => l.includes("> **Source confidence:**"));
      if (bqIdx === -1) return { pass: false, detail: "blockquote line not found" };
      // Find the nearest /var/log/microsoft/intune/ reference to the blockquote
      const pathIndices = lines.reduce((acc, l, i) => { if (l.includes("/var/log/microsoft/intune/")) acc.push(i); return acc; }, []);
      if (pathIndices.length === 0) return { pass: false, detail: "no /var/log/microsoft/intune/ path line found" };
      const minDist = Math.min(...pathIndices.map(i => Math.abs(bqIdx - i)));
      if (minDist > 40) return { pass: false, detail: "blockquote and nearest path reference >" + minDist + " lines apart (proximity check failed)" };
      return { pass: true, detail: "Layer 2 blockquote with proximity to path" };
    }
  },
  {
    id: 8, name: "V-52-08: RB24 Layer 3 — >=2 inline [LOW-MEDIUM, last_verified tokens at command-snippet level",
    run() {
      const c = readFile(RB24);
      if (c === null) return { pass: false, detail: "File missing: " + RB24 };
      const tokens = (c.match(/\[LOW-MEDIUM, last_verified/g) || []).length;
      if (tokens < 2) return { pass: false, detail: "Need >=2 [LOW-MEDIUM, last_verified tokens; found " + tokens };
      return { pass: true, detail: tokens + " Layer 3 inline tokens" };
    }
  },

  // === SC#1 + PITFALL-3 (V-52-09, V-52-10) ===
  {
    id: 9, name: "V-52-09: RB24 PITFALL-3 negative — no `snap install` / `/var/snap/intune-portal/` / `snap container`",
    run() {
      const c = readFile(RB24);
      if (c === null) return { pass: false, detail: "File missing: " + RB24 };
      const forbidden = ["snap install", "/var/snap/intune-portal/", "snap container"];
      const found = forbidden.filter(s => c.includes(s));
      if (found.length > 0) return { pass: false, detail: "PITFALL-3 violation: " + found.join(", ") };
      return { pass: true, detail: "no forbidden snap-install strings" };
    }
  },
  {
    id: 10, name: "V-52-10: RB24 SC#1 positive — journalctl + file paths covered",
    run() {
      const c = readFile(RB24);
      if (c === null) return { pass: false, detail: "File missing: " + RB24 };
      const required = ["journalctl -u intune-agent", "journalctl | grep intune-portal", "/var/log/intune-update.log", "/var/log/dpkg.log"];
      const missing = required.filter(s => !c.includes(s));
      if (missing.length > 0) return { pass: false, detail: "SC#1 coverage missing: " + missing.join(", ") };
      return { pass: true, detail: "all 4 SC#1 literals present" };
    }
  },

  // === TRAP STRUCTURE (V-52-11..14) ===
  {
    id: 11, name: "V-52-11: RB25 has 4 anchor-indexed Trap H2s",
    run() {
      const c = readFile(RB25);
      if (c === null) return { pass: false, detail: "File missing: " + RB25 };
      const required = [
        /^## Trap A: [^\n]*\{#trap-a-kernel-track\}\s*$/m,
        /^## Trap B: [^\n]*\{#trap-b-delivery-path\}\s*$/m,
        /^## Trap C: [^\n]*\{#trap-c-service-state\}\s*$/m,
        /^## Trap D: [^\n]*\{#trap-d-identity-broker\}\s*$/m
      ];
      const missing = required.filter(r => !r.test(c)).map(r => r.toString());
      if (missing.length > 0) return { pass: false, detail: "missing Trap H2 anchors: " + missing.join(" / ") };
      return { pass: true, detail: "4 Trap H2 anchors locked" };
    }
  },
  {
    id: 12, name: "V-52-12: RB25 Trap A SC#2 content — Ubuntu HWE / GA kernel / uname -r",
    run() {
      const c = readFile(RB25);
      if (c === null) return { pass: false, detail: "File missing: " + RB25 };
      const trapA = c.match(/## Trap A:[\s\S]*?(?=\n## |$)/);
      const body = trapA ? trapA[0] : "";
      const missing = [];
      if (!body.includes("Ubuntu HWE")) missing.push("Ubuntu HWE");
      if (!body.includes("GA kernel")) missing.push("GA kernel");
      if (!body.includes("uname -r")) missing.push("uname -r");
      if (missing.length > 0) return { pass: false, detail: "Trap A body missing literals: " + missing.join(", ") };
      return { pass: true, detail: "Trap A SC#2 literals present" };
    }
  },
  {
    id: 13, name: "V-52-13: RB25 Trap C SC#2 content — systemctl status intune-agent / systemctl enable --user --now intune-agent.timer",
    run() {
      const c = readFile(RB25);
      if (c === null) return { pass: false, detail: "File missing: " + RB25 };
      const trapC = c.match(/## Trap C:[\s\S]*?(?=\n## |$)/);
      const body = trapC ? trapC[0] : "";
      const missing = [];
      if (!body.includes("systemctl status intune-agent")) missing.push("systemctl status intune-agent");
      if (!body.includes("systemctl enable --user --now intune-agent.timer")) missing.push("systemctl enable --user --now intune-agent.timer");
      if (missing.length > 0) return { pass: false, detail: "Trap C body missing literals: " + missing.join(", ") };
      return { pass: true, detail: "Trap C SC#2 literals present" };
    }
  },
  {
    id: 14, name: "V-52-14: RB25 Trap B SC#2 content — snap and deb (delivery path detection)",
    run() {
      const c = readFile(RB25);
      if (c === null) return { pass: false, detail: "File missing: " + RB25 };
      const trapB = c.match(/## Trap B:[\s\S]*?(?=\n## |$)/);
      const body = trapB ? trapB[0] : "";
      const missing = [];
      if (!/\bsnap\b/i.test(body)) missing.push("snap");
      if (!/\bdeb\b/i.test(body)) missing.push("deb");
      if (missing.length > 0) return { pass: false, detail: "Trap B body missing literals: " + missing.join(", ") };
      return { pass: true, detail: "Trap B snap-vs-deb literals present" };
    }
  },

  // === CROSS-LINKS + AUDIENCE CONTRACT (V-52-15..18) ===
  {
    id: 15, name: "V-52-15: RB25 contains >=3 L1 cause-anchor cross-links from locked surface",
    run() {
      const c = readFile(RB25);
      if (c === null) return { pass: false, detail: "File missing: " + RB25 };
      const lockedSurface = [
        "30-linux-enrollment-failed.md#cause-a-package-install",
        "30-linux-enrollment-failed.md#cause-b-sign-in-failure",
        "30-linux-enrollment-failed.md#cause-c-enrollment-timeout",
        "31-linux-compliance-non-compliant.md#cause-a-distro-version-out-of-range",
        "31-linux-compliance-non-compliant.md#cause-b-disk-not-encrypted",
        "31-linux-compliance-non-compliant.md#cause-c-password-policy-not-met",
        "31-linux-compliance-non-compliant.md#cause-d-custom-compliance-failure",
        "32-linux-ca-blocking-web-access.md#cause-a-not-enrolled",
        "32-linux-ca-blocking-web-access.md#cause-b-non-compliant",
        "32-linux-ca-blocking-web-access.md#cause-c-edge-not-signed-in",
        "33-linux-agent-service-failure.md"
      ];
      const found = lockedSurface.filter(s => c.includes(s));
      if (found.length < 3) return { pass: false, detail: "found " + found.length + " of locked surface; need >=3. Found: " + found.join(", ") };
      return { pass: true, detail: found.length + " L1 cross-links present" };
    }
  },
  {
    id: 16, name: "V-52-16: NEITHER runbook contains L1-only `> **Say to the user:**` blockquote (V-51-24 INVERTED)",
    run() {
      const failures = [];
      for (const f of NEW_CONTENT_FILES) {
        const c = readFile(f);
        if (c === null) { failures.push(f + ": file missing"); continue; }
        if (/> \*\*Say to the user:\*\*/.test(c)) failures.push(f + ": L1-only narration pattern found");
      }
      if (failures.length > 0) return { pass: false, detail: failures.join(" | ") };
      return { pass: true, detail: "L2 audience contract honored (no L1 narration pattern)" };
    }
  },
  {
    id: 17, name: "V-52-17: NEITHER runbook contains sudo prefix on read-only commands (DPO-Phase52-01 / V-51-20 inheritance)",
    run() {
      const failures = [];
      for (const f of NEW_CONTENT_FILES) {
        const c = readFile(f);
        if (c === null) { failures.push(f + ": file missing"); continue; }
        // Strip ### Resolution H3 sections (resolution may legitimately use sudo on state-changing commands)
        const stripped = c.replace(/### Resolution[\s\S]*?(?=\n### |\n## |$)/g, '');
        const forbidden = [
          /\bsudo\s+apt\s+list\b/,
          /\bsudo\s+dpkg\s+-l\b/,
          /\bsudo\s+systemctl\s+--user\b/,
          /\bsudo\s+journalctl\s+--user\b/
        ];
        const found = forbidden.filter(r => r.test(stripped)).map(r => r.toString());
        if (found.length > 0) failures.push(f + ": " + found.join(", "));
      }
      if (failures.length > 0) return { pass: false, detail: failures.join(" | ") };
      return { pass: true, detail: "read-vs-write apt distinction honored" };
    }
  },
  {
    id: 18, name: "V-52-18: each runbook has >=1 link to ../_glossary-linux.md#<anchor>",
    run() {
      const failures = [];
      for (const f of NEW_CONTENT_FILES) {
        const c = readFile(f);
        if (c === null) { failures.push(f + ": file missing"); continue; }
        if (!/\.\.\/_glossary-linux\.md#[a-z0-9-]+/.test(c)) failures.push(f + ": no _glossary-linux.md anchor link");
      }
      if (failures.length > 0) return { pass: false, detail: failures.join(" | ") };
      return { pass: true, detail: "glossary anchor consumption confirmed" };
    }
  },

  // === APPEND-ONLY + REGRESSION-GUARDS (V-52-19..22) ===
  {
    id: 19, name: "V-52-19: 00-index.md has Linux L2 Runbooks H2 (positioned AFTER Android H2) + 2 entries",
    run() {
      const c = readFile(INDEX);
      if (c === null) return { pass: false, detail: "File missing: " + INDEX };
      if (!/^## Linux L2 Runbooks\s*$/m.test(c)) return { pass: false, detail: "## Linux L2 Runbooks H2 not found" };
      const linuxIdx = c.indexOf("## Linux L2 Runbooks");
      const androidIdx = c.indexOf("## Android L2 Runbooks");
      if (androidIdx === -1) return { pass: false, detail: "## Android L2 Runbooks not found (regression)" };
      if (linuxIdx <= androidIdx) return { pass: false, detail: "Append-only ordering violated: Linux H2 must appear AFTER Android H2" };
      const required = [/24-linux-log-collection\.md/, /25-linux-agent-investigation\.md/];
      const missing = required.filter(r => !r.test(c)).map(r => r.toString());
      if (missing.length > 0) return { pass: false, detail: "missing entries: " + missing.join(", ") };
      return { pass: true, detail: "Linux L2 H2 + 2 entries; correct ordering" };
    }
  },
  {
    id: 20, name: "V-52-20: NEITHER runbook structural text contains BYOD/COBO/COPE/Dedicated/ZTE/AOSP/COSU (PITFALL-1 regression)",
    run() {
      const failures = [];
      const forbidden = [/\bBYOD\b/, /\bCOBO\b/, /\bCOPE\b/, /\bDedicated\b/, /\bZTE\b/, /\bAOSP\b/, /\bCOSU\b/];
      for (const f of NEW_CONTENT_FILES) {
        const c = readFile(f);
        if (c === null) { failures.push(f + ": file missing"); continue; }
        // Strip Version History H2 section (table rows may legitimately reference past phase names)
        const stripped = c.replace(/^## Version History[\s\S]*$/m, '');
        const found = forbidden.filter(r => r.test(stripped)).map(r => r.toString());
        if (found.length > 0) failures.push(f + ": " + found.join(", "));
      }
      if (failures.length > 0) return { pass: false, detail: failures.join(" | ") };
      return { pass: true, detail: "no mode-axis tokens in structural text" };
    }
  },
  {
    id: 21, name: "V-52-21: RB25 does NOT contain `Require device to be marked as compliant` (PITFALL-2 regression — Phase 51 V-51-19 inherited)",
    run() {
      const c = readFile(RB25);
      if (c === null) return { pass: false, detail: "File missing: " + RB25 };
      if (c.includes("Require device to be marked as compliant")) {
        return { pass: false, detail: "PITFALL-2 violation: literal 'Require device to be marked as compliant' present in Trap D" };
      }
      return { pass: true, detail: "PITFALL-2 phrase absent" };
    }
  },
  {
    id: 22, name: "V-52-22: NEITHER runbook contains TBD/TODO/FIXME/XXX/PLACEHOLDER outside Version History",
    run() {
      const failures = [];
      for (const f of NEW_CONTENT_FILES) {
        const c = readFile(f);
        if (c === null) { failures.push(f + ": file missing"); continue; }
        const stripped = c.replace(/^## Version History[\s\S]*$/m, '');
        if (/\b(TBD|TODO|FIXME|XXX|PLACEHOLDER)\b/.test(stripped)) failures.push(f + ": placeholder token in structural text");
      }
      if (failures.length > 0) return { pass: false, detail: failures.join(" | ") };
      return { pass: true, detail: "no placeholder tokens" };
    }
  },
];

const LABEL_WIDTH = 64;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + " ";
  return s + " " + ".".repeat(LABEL_WIDTH - s.length) + " ";
}

let passed = 0, failed = 0, skipped = 0;

for (const check of checks) {
  let result;
  try { result = check.run(); } catch (e) { result = { pass: false, detail: "Unexpected error: " + e.message }; }
  const prefix = "[" + check.id + "/" + checks.length + "] " + check.name;
  if (result.skipped) {
    skipped++;
    process.stdout.write(padLabel(prefix) + "SKIPPED -- " + (result.detail || "") + "\n");
  } else if (result.pass) {
    passed++;
    process.stdout.write(padLabel(prefix) + "PASS" + (VERBOSE && result.detail ? " -- " + result.detail : "") + "\n");
  } else {
    failed++;
    process.stdout.write(padLabel(prefix) + "FAIL -- " + result.detail + "\n");
  }
}

process.stdout.write("\nSummary: " + passed + " passed, " + failed + " failed, " + skipped + " skipped\n");
process.exit(failed > 0 ? 1 : 0);
