#!/usr/bin/env node
// Phase 51 static validation harness
// Source of truth: .planning/phases/51-linux-l1-triage-runbooks-30-33/51-CONTEXT.md
// NO SHELL: all file content via fs.readFileSync; no shared module; no external tools
// Implements 25 checks (V-51-01 through V-51-25)

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

// CDI-02: Pinned H2 strings — Phase 52+ renaming requires same-commit validator update.
const TREE = "docs/decision-trees/09-linux-triage.md";
const RB30 = "docs/l1-runbooks/30-linux-enrollment-failed.md";
const RB31 = "docs/l1-runbooks/31-linux-compliance-non-compliant.md";
const RB32 = "docs/l1-runbooks/32-linux-ca-blocking-web-access.md";
const RB33 = "docs/l1-runbooks/33-linux-agent-service-failure.md";
// Append-only edit targets
const INDEX = "docs/l1-runbooks/00-index.md";
const INITIAL = "docs/decision-trees/00-initial-triage.md";

const NEW_FILES = [TREE, RB30, RB31, RB32, RB33];
const RUNBOOKS = [RB30, RB31, RB32, RB33];
const ALL_CONTENT_FILES = [TREE, ...RUNBOOKS];

const checks = [
  // === FILE EXISTENCE (V-51-01..04) ===
  {
    id: 1, name: "V-51-01: 09-linux-triage.md exists",
    run() {
      const c = readFile(TREE);
      if (c === null) return { pass: false, detail: "File missing: " + TREE };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 2, name: "V-51-02: 30-linux-enrollment-failed.md exists",
    run() {
      const c = readFile(RB30);
      if (c === null) return { pass: false, detail: "File missing: " + RB30 };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 3, name: "V-51-03: 31-linux-compliance-non-compliant.md exists",
    run() {
      const c = readFile(RB31);
      if (c === null) return { pass: false, detail: "File missing: " + RB31 };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 4, name: "V-51-04: 32 + 33 runbooks exist",
    run() {
      const c32 = readFile(RB32);
      const c33 = readFile(RB33);
      if (c32 === null) return { pass: false, detail: "File missing: " + RB32 };
      if (c33 === null) return { pass: false, detail: "File missing: " + RB33 };
      return { pass: true, detail: "RB32 " + c32.length + "b, RB33 " + c33.length + "b" };
    }
  },

  // === FRONTMATTER (V-51-05) ===
  {
    id: 5, name: "V-51-05: all 5 new content files have platform: Linux + audience: L1 + 60-day cycle",
    run() {
      const failures = [];
      for (const f of ALL_CONTENT_FILES) {
        const c = readFile(f);
        if (c === null) { failures.push(f + ": file missing"); continue; }
        const fmMatch = c.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/m);
        if (!fmMatch) { failures.push(f + ": no frontmatter"); continue; }
        const fm = fmMatch[1];
        const issues = [];
        if (!/^platform: Linux\s*$/m.test(fm)) issues.push("platform: Linux missing");
        if (!/^audience: L1\s*$/m.test(fm)) issues.push("audience: L1 missing");
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
      if (failures.length === 0) return { pass: true, detail: ALL_CONTENT_FILES.length + " files valid" };
      return { pass: false, detail: failures.join(" | ") };
    }
  },

  // === TREE STRUCTURE (V-51-06..11) ===
  {
    id: 6, name: "V-51-06: 09-linux-triage.md has Mermaid block + graph TD + LIN1 root",
    run() {
      const c = readFile(TREE);
      if (c === null) return { pass: false, detail: "File missing" };
      const mermaidBlock = c.match(/```mermaid\n([\s\S]*?)```/);
      if (!mermaidBlock) return { pass: false, detail: "No Mermaid block found" };
      const m = mermaidBlock[1];
      if (!/graph TD/.test(m)) return { pass: false, detail: "graph TD not found in Mermaid block" };
      if (!/LIN1\{/.test(m)) return { pass: false, detail: "LIN1{ root decision diamond not found" };
      return { pass: true };
    }
  },
  {
    id: 7, name: "V-51-07: 09-linux-triage.md has NO Android mode-axis tokens (PITFALL-1 regression guard)",
    run() {
      const c = readFile(TREE);
      if (c === null) return { pass: false, detail: "File missing" };
      const mermaidBlock = c.match(/```mermaid\n([\s\S]*?)```/);
      if (!mermaidBlock) return { pass: false, detail: "No Mermaid block found" };
      const m = mermaidBlock[1];
      const forbidden = [
        /\bBYOD\b/, /\bCOBO\b/, /\bCOPE\b/, /\bDedicated\b/,
        /\bZTE\b/, /\bAOSP\b/, /What type of[\s\S]*?enrollment/i
      ];
      const found = forbidden.filter(r => r.test(m)).map(r => r.source);
      if (found.length === 0) return { pass: true };
      return { pass: false, detail: "PITFALL-1 violation; mode-axis tokens: " + found.join(", ") };
    }
  },
  {
    id: 8, name: "V-51-08: 09-linux-triage.md has 4 click directives to runbooks 30-33",
    run() {
      const c = readFile(TREE);
      if (c === null) return { pass: false, detail: "File missing" };
      const required = [
        /click \w+ "\.\.\/l1-runbooks\/30-linux-enrollment-failed\.md"/,
        /click \w+ "\.\.\/l1-runbooks\/31-linux-compliance-non-compliant\.md"/,
        /click \w+ "\.\.\/l1-runbooks\/32-linux-ca-blocking-web-access\.md"/,
        /click \w+ "\.\.\/l1-runbooks\/33-linux-agent-service-failure\.md"/
      ];
      const missing = required.filter(r => !r.test(c)).map(r => r.source);
      if (missing.length === 0) return { pass: true };
      return { pass: false, detail: "Missing click directive(s): " + missing.join(", ") };
    }
  },
  {
    id: 9, name: "V-51-09: 09-linux-triage.md tree-level PITFALL-2 + web-app CA callout",
    run() {
      const c = readFile(TREE);
      if (c === null) return { pass: false, detail: "File missing" };
      const mermaid = c.match(/```mermaid\n([\s\S]*?)```/);
      if (!mermaid) return { pass: false, detail: "No Mermaid block" };
      const m = mermaid[1];
      const hasPitfall2 = /PITFALL-2/.test(m);
      const hasWebAppCA = /web-app CA/i.test(m) || /Edge for Linux/i.test(m);
      if (hasPitfall2 && hasWebAppCA) return { pass: true };
      return { pass: false, detail: "Need both PITFALL-2 token AND web-app CA / Edge for Linux token in Mermaid block" };
    }
  },
  {
    id: 10, name: "V-51-10: 09-linux-triage.md has CA deep-link to capability matrix",
    run() {
      const c = readFile(TREE);
      if (c === null) return { pass: false, detail: "File missing" };
      if (c.includes("../reference/linux-capability-matrix.md#conditional-access")) return { pass: true };
      return { pass: false, detail: "CA deep-link literal not found" };
    }
  },
  {
    id: 11, name: "V-51-11: 09-linux-triage.md has Don't know / Other -> LINE1 escalation node",
    run() {
      const c = readFile(TREE);
      if (c === null) return { pass: false, detail: "File missing" };
      const hasEdge = /-->\|"Don't know[\s\S]*?Other"\|/.test(c) || /-->\|"Other[\s\S]*?Unclear"\|/.test(c);
      const hasTerminal = /(Escalate L2|escalateL2)/.test(c);
      if (hasEdge && hasTerminal) return { pass: true };
      return { pass: false, detail: "Need Don't know / Other edge label AND escalateL2 terminal node" };
    }
  },

  // === ANCHOR-INDEXED CAUSE STRUCTURE (V-51-12..15) ===
  {
    id: 12, name: "V-51-12: Runbook 30 has 3 anchor-indexed Cause H2s",
    run() {
      const c = readFile(RB30);
      if (c === null) return { pass: false, detail: "File missing" };
      const required = [
        /^## Cause A: [^\n]*\{#cause-a-package-install\}\s*$/m,
        /^## Cause B: [^\n]*\{#cause-b-sign-in-failure\}\s*$/m,
        /^## Cause C: [^\n]*\{#cause-c-enrollment-timeout\}\s*$/m
      ];
      const missing = required.filter(r => !r.test(c)).map(r => r.source);
      if (missing.length === 0) return { pass: true };
      return { pass: false, detail: "Missing cause anchor(s): " + missing.join(", ") };
    }
  },
  {
    id: 13, name: "V-51-13: Runbook 31 has 4 anchor-indexed Cause H2s",
    run() {
      const c = readFile(RB31);
      if (c === null) return { pass: false, detail: "File missing" };
      const required = [
        /^## Cause A: [^\n]*\{#cause-a-distro-version-out-of-range\}\s*$/m,
        /^## Cause B: [^\n]*\{#cause-b-disk-not-encrypted\}\s*$/m,
        /^## Cause C: [^\n]*\{#cause-c-password-policy-not-met\}\s*$/m,
        /^## Cause D: [^\n]*\{#cause-d-custom-compliance-failure\}\s*$/m
      ];
      const missing = required.filter(r => !r.test(c)).map(r => r.source);
      if (missing.length === 0) return { pass: true };
      return { pass: false, detail: "Missing cause anchor(s): " + missing.join(", ") };
    }
  },
  {
    id: 14, name: "V-51-14: Runbook 32 has 3 anchor-indexed Cause H2s",
    run() {
      const c = readFile(RB32);
      if (c === null) return { pass: false, detail: "File missing" };
      const required = [
        /^## Cause A: [^\n]*\{#cause-a-not-enrolled\}\s*$/m,
        /^## Cause B: [^\n]*\{#cause-b-non-compliant\}\s*$/m,
        /^## Cause C: [^\n]*\{#cause-c-edge-not-signed-in\}\s*$/m
      ];
      const missing = required.filter(r => !r.test(c)).map(r => r.source);
      if (missing.length === 0) return { pass: true };
      return { pass: false, detail: "Missing cause anchor(s): " + missing.join(", ") };
    }
  },
  {
    id: 15, name: "V-51-15: Runbook 33 is single-cause (NO Cause H2s; HAS L1 Triage Steps H2)",
    run() {
      const c = readFile(RB33);
      if (c === null) return { pass: false, detail: "File missing" };
      if (/^## Cause [A-Z]:/m.test(c)) return { pass: false, detail: "Runbook 33 must NOT use anchor-indexed cause shape (D-10)" };
      if (!/^## L1 Triage Steps\s*$/m.test(c)) return { pass: false, detail: "Runbook 33 must have ## L1 Triage Steps H2 (single-cause Runbook 22 shape)" };
      return { pass: true };
    }
  },

  // === CROSS-LINK LITERALS + PITFALL-2 POSITIVE/NEGATIVE (V-51-16..19) ===
  {
    id: 16, name: "V-51-16: Runbook 30 cross-links to end-user enrollment guide #enroll-your-device",
    run() {
      const c = readFile(RB30);
      if (c === null) return { pass: false, detail: "File missing" };
      if (c.includes("../end-user-guides/linux-intune-portal-enrollment.md#enroll-your-device")) return { pass: true };
      return { pass: false, detail: "End-user enrollment cross-link literal not found" };
    }
  },
  {
    id: 17, name: "V-51-17: Runbook 32 cross-links to capability matrix #conditional-access",
    run() {
      const c = readFile(RB32);
      if (c === null) return { pass: false, detail: "File missing" };
      if (c.includes("../reference/linux-capability-matrix.md#conditional-access")) return { pass: true };
      return { pass: false, detail: "Capability matrix CA cross-link literal not found" };
    }
  },
  {
    id: 18, name: "V-51-18: Runbook 32 has web-app CA architectural callout (positive)",
    run() {
      const c = readFile(RB32);
      if (c === null) return { pass: false, detail: "File missing" };
      if (!/web-app CA/i.test(c)) return { pass: false, detail: "Runbook 32 missing 'web-app CA' phrasing" };
      if (!/Edge for Linux/i.test(c)) return { pass: false, detail: "Runbook 32 missing 'Edge for Linux' qualifier" };
      return { pass: true };
    }
  },
  {
    id: 19, name: "V-51-19: Runbook 32 does NOT contain 'Require device to be marked as compliant' (defect 4C-1; PITFALL-13 mitigation)",
    run() {
      const c = readFile(RB32);
      if (c === null) return { pass: false, detail: "File missing" };
      if (c.includes("Require device to be marked as compliant")) {
        return { pass: false, detail: "PITFALL-13 violation: literal 'Require device to be marked as compliant' present — paraphrase the architectural callout per 51-RESEARCH.md PITFALL-2 callout section" };
      }
      return { pass: true };
    }
  },

  // === READ-VS-WRITE APT/SYSTEMCTL (V-51-20) ===
  {
    id: 20, name: "V-51-20: L1 Triage Steps in all 4 runbooks contain NO sudo prefix on apt/systemctl --user/journalctl --user (read-vs-write boundary)",
    run() {
      const failures = [];
      for (const f of RUNBOOKS) {
        const c = readFile(f);
        if (c === null) { failures.push(f + ": file missing"); continue; }
        // Match BOTH `## L1 Triage Steps` (Runbook 33) AND `### L1 Triage Steps` (Runbooks 30/31/32 nested in Cause H2s).
        // Capture content up to the next H2 or H3 boundary (whichever comes first), or to end-of-file.
        const triageBlocks = [...c.matchAll(/^#{2,3}\s+L1 Triage Steps\s*$([\s\S]*?)(?=^#{2,3}\s+\S|$(?![\s\S]))/gm)];
        const issues = [];
        if (triageBlocks.length === 0) issues.push("no L1 Triage Steps heading found (H2 or H3)");
        for (const block of triageBlocks) {
          const s = block[1] || '';
          if (/\bsudo\s+apt\s+list\b/.test(s)) issues.push("sudo apt list in L1 Triage Steps");
          if (/\bsudo\s+dpkg\s+-l\b/.test(s)) issues.push("sudo dpkg -l in L1 Triage Steps");
          if (/\bsudo\s+systemctl\s+--user\b/.test(s)) issues.push("sudo systemctl --user (--user takes no sudo)");
          if (/\bsudo\s+journalctl\s+--user\b/.test(s)) issues.push("sudo journalctl --user (--user takes no sudo)");
        }
        if (issues.length > 0) failures.push(f + ": " + issues.join("; "));
      }
      if (failures.length === 0) return { pass: true, detail: RUNBOOKS.length + " runbooks pass read-only L1 check" };
      return { pass: false, detail: failures.join(" | ") };
    }
  },

  // === APPEND-ONLY ASSERTIONS (V-51-21..22) ===
  {
    id: 21, name: "V-51-21: 00-index.md has Linux L1 Runbooks H2 (positioned AFTER Android H2) + 4 runbook entries",
    run() {
      const c = readFile(INDEX);
      if (c === null) return { pass: false, detail: "File missing" };
      if (!/^## Linux L1 Runbooks\s*$/m.test(c)) return { pass: false, detail: "## Linux L1 Runbooks H2 not found" };
      // Order assertion (ISS-02): Linux H2 byte-position MUST be greater than Android H2 byte-position.
      const linuxIdx = c.indexOf("## Linux L1 Runbooks");
      const androidIdx = c.indexOf("## Android L1 Runbooks");
      if (androidIdx === -1) return { pass: false, detail: "## Android L1 Runbooks H2 not found (regression — Phase 47 deliverable should be present)" };
      if (linuxIdx === -1) return { pass: false, detail: "## Linux L1 Runbooks H2 substring not found via indexOf" };
      if (linuxIdx <= androidIdx) return { pass: false, detail: "Append-only ordering violated: Linux H2 (byte " + linuxIdx + ") must appear AFTER Android H2 (byte " + androidIdx + ")" };
      const required = [
        /\[30: Linux Enrollment Failed\]\(30-linux-enrollment-failed\.md\)/,
        /\[31: Linux Compliance Non-Compliant\]\(31-linux-compliance-non-compliant\.md\)/,
        /\[32: Linux CA Blocking Web-App Access\]\(32-linux-ca-blocking-web-access\.md\)/,
        /\[33: Linux Agent Service Failure\]\(33-linux-agent-service-failure\.md\)/
      ];
      const missing = required.filter(r => !r.test(c)).map(r => r.source);
      if (missing.length === 0) return { pass: true, detail: "Linux H2 at byte " + linuxIdx + " > Android H2 at byte " + androidIdx };
      return { pass: false, detail: "Missing index entry/entries: " + missing.join(", ") };
    }
  },
  {
    id: 22, name: "V-51-22: 00-initial-triage.md has [Linux Triage](09-linux-triage.md) link in 3+ positions (append-only)",
    run() {
      const c = readFile(INITIAL);
      if (c === null) return { pass: false, detail: "File missing" };
      const matches = c.match(/\[Linux Triage\]\(09-linux-triage\.md\)/g);
      const count = matches ? matches.length : 0;
      if (count >= 3) return { pass: true, detail: count + " occurrences" };
      return { pass: false, detail: "Need >=3 occurrences of [Linux Triage](09-linux-triage.md); found " + count };
    }
  },

  // === GLOSSARY CONSUMPTION + ACTOR-BOUNDARY + TBD SCAN (V-51-23..25) ===
  {
    id: 23, name: "V-51-23: each of 4 runbooks links to >=1 _glossary-linux.md anchor",
    run() {
      const failures = [];
      for (const f of RUNBOOKS) {
        const c = readFile(f);
        if (c === null) { failures.push(f + ": file missing"); continue; }
        if (!/\.\.\/_glossary-linux\.md#[a-z0-9-]+/.test(c)) failures.push(f + ": no _glossary-linux.md anchor link found");
      }
      if (failures.length === 0) return { pass: true, detail: RUNBOOKS.length + " runbooks consume glossary" };
      return { pass: false, detail: failures.join(" | ") };
    }
  },
  {
    id: 24, name: "V-51-24: each of 4 runbooks has >=1 '> **Say to the user:**' actor-boundary blockquote",
    run() {
      const failures = [];
      for (const f of RUNBOOKS) {
        const c = readFile(f);
        if (c === null) { failures.push(f + ": file missing"); continue; }
        if (!/> \*\*Say to the user:\*\*/.test(c)) failures.push(f + ": missing '> **Say to the user:**' blockquote");
      }
      if (failures.length === 0) return { pass: true };
      return { pass: false, detail: failures.join(" | ") };
    }
  },
  {
    id: 25, name: "V-51-25: no TBD/TODO/FIXME/XXX placeholders in any new content file",
    run() {
      const failures = [];
      for (const f of ALL_CONTENT_FILES) {
        const c = readFile(f);
        if (c === null) { failures.push(f + ": file missing"); continue; }
        if (/\b(TBD|TODO|FIXME|XXX)\b/.test(c)) failures.push(f + ": placeholder token found");
      }
      if (failures.length === 0) return { pass: true };
      return { pass: false, detail: failures.join(" | ") };
    }
  }
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
