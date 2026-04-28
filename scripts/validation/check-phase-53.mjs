#!/usr/bin/env node
// Phase 53 static validation harness
// Source of truth: .planning/phases/53-co-management-operational-docs/53-CONTEXT.md
// NO SHELL: all file content via fs.readFileSync; no shared module; no external tools
// Implements 26 checks (V-53-01 through V-53-26)

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

// D-13: Pinned anchor strings — same-commit validator update required on any rename.
const OV  = "docs/operations/co-management/00-overview.md";
const TA  = "docs/operations/co-management/01-windows-tenant-attach.md";
const WS  = "docs/operations/co-management/02-windows-workload-sliders.md";
const MP  = "docs/operations/co-management/03-cocmgmt-migration-paths.md";
const IDX = "docs/operations/00-index.md";
const VAL = "scripts/validation/check-phase-53.mjs";

const CO_MGMT_FILES = [OV, TA, WS, MP];                  // V-53-10 NEGATIVE scope
const CONTENT_FILES = [OV, TA, WS, MP, IDX];             // V-53-06 frontmatter + V-53-25 TBD scan

const checks = [
  // === FILE EXISTENCE (V-53-01..05) ===
  {
    id: 1, name: "V-53-01: 00-overview.md exists",
    run() {
      const c = readFile(OV);
      if (c === null) return { pass: false, detail: "File missing: " + OV };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 2, name: "V-53-02: 01-windows-tenant-attach.md exists",
    run() {
      const c = readFile(TA);
      if (c === null) return { pass: false, detail: "File missing: " + TA };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 3, name: "V-53-03: check-phase-53.mjs exists (self-referential)",
    run() {
      const c = readFile(VAL);
      if (c === null) return { pass: false, detail: "File missing: " + VAL };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 4, name: "V-53-04: 03-cocmgmt-migration-paths.md exists",
    run() {
      const c = readFile(MP);
      if (c === null) return { pass: false, detail: "File missing: " + MP };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 5, name: "V-53-05: 00-index.md exists",
    run() {
      const c = readFile(IDX);
      if (c === null) return { pass: false, detail: "File missing: " + IDX };
      return { pass: true, detail: c.length + " bytes" };
    }
  },

  // === FRONTMATTER (V-53-06) ===
  {
    id: 6, name: "V-53-06: all 5 content files have platform: Windows + audience: <non-empty> + 60-day cycle",
    run() {
      const failures = [];
      for (const f of CONTENT_FILES) {
        const c = readFile(f);
        if (c === null) { failures.push(f + ": file missing"); continue; }
        const fmMatch = c.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/m);
        if (!fmMatch) { failures.push(f + ": no frontmatter"); continue; }
        const fm = fmMatch[1];
        const issues = [];
        if (!/^platform: Windows\s*$/m.test(fm)) issues.push("platform: Windows missing");
        if (!/^audience:\s*\S+/m.test(fm)) issues.push("audience field missing/empty");
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
      if (failures.length === 0) return { pass: true, detail: CONTENT_FILES.length + " files valid" };
      return { pass: false, detail: failures.join(" | ") };
    }
  },

  // === SC#1 + COMG-01 + WORKLOAD MODEL (V-53-07..10) ===
  {
    id: 7, name: "V-53-07: 00-overview.md contains all 7 workload literal tokens",
    run() {
      const c = readFile(OV);
      if (c === null) return { pass: false, detail: "File missing: " + OV };
      const required = ["Compliance Policies", "Windows Update Policies", "Resource Access",
        "Endpoint Protection", "Device Configuration", "Office Click-to-Run Apps", "Client Apps"];
      const missing = required.filter(s => !c.includes(s));
      if (missing.length > 0) return { pass: false, detail: "Missing workload tokens: " + missing.join(", ") };
      return { pass: true, detail: "all 7 workload tokens present" };
    }
  },
  {
    id: 8, name: "V-53-08: 00-overview.md has ## Three Workload Slider States H2 + 3 state tokens",
    run() {
      const c = readFile(OV);
      if (c === null) return { pass: false, detail: "File missing: " + OV };
      if (!/^## Three Workload Slider States\s*$/m.test(c))
        return { pass: false, detail: "## Three Workload Slider States H2 missing" };
      const h2Idx = c.indexOf("## Three Workload Slider States");
      const section = c.slice(h2Idx, h2Idx + 2000);
      const states = ["Configuration Manager", "Pilot Intune", "Intune"];
      const missing = states.filter(s => !section.includes(s));
      if (missing.length > 0) return { pass: false, detail: "State tokens missing near H2: " + missing.join(", ") };
      return { pass: true, detail: "H2 + 3 state tokens confirmed" };
    }
  },
  {
    id: 9, name: "V-53-09: POSITIVE — 'collection-scoped' AND ('not a binary toggle' OR 'per-collection') near 'Pilot Intune' in 00-overview.md",
    run() {
      const c = readFile(OV);
      if (c === null) return { pass: false, detail: "File missing: " + OV };
      const lines = c.split('\n');
      const piIdx = lines.findIndex(l => l.includes("Pilot Intune"));
      if (piIdx === -1) return { pass: false, detail: "'Pilot Intune' not found" };
      const window = lines.slice(Math.max(0, piIdx - 5), piIdx + 15).join('\n');
      if (!window.includes("collection-scoped"))
        return { pass: false, detail: "'collection-scoped' not within ~10 lines of 'Pilot Intune'" };
      if (!/not a binary toggle|per-collection/.test(window))
        return { pass: false, detail: "'not a binary toggle' OR 'per-collection' not within ~10 lines of 'Pilot Intune'" };
      return { pass: true, detail: "POSITIVE assertion: collection-scoped + binary-toggle/per-collection near Pilot Intune" };
    }
  },
  {
    id: 10, name: "V-53-10: NEGATIVE — no 'partially/fully migrated' variants in 4 co-management files (PITFALL-8 regression-guard; SCOPE RESTRICTED to CO_MGMT_FILES, NOT glob)",
    run() {
      const failures = [];
      const banned = [
        /partially\s+migrated/i, /partially-migrated/i, /partially_migrated/i,
        /fully\s+migrated/i, /fully-migrated/i, /fully_migrated/i
      ];
      for (const f of CO_MGMT_FILES) {  // SCOPE RESTRICTION: only docs/operations/co-management/
        const c = readFile(f);
        if (c === null) { failures.push(f + ": file missing"); continue; }
        const found = banned.filter(r => r.test(c)).map(r => r.toString());
        if (found.length > 0) failures.push(f + ": PITFALL-8 violation: " + found.join(", "));
      }
      if (failures.length > 0) return { pass: false, detail: failures.join(" | ") };
      return { pass: true, detail: "no partially/fully-migrated phrasings in 4 co-management files" };
    }
  },

  // === COMG-03 + SC#3 (V-53-11, V-53-12) ===
  {
    id: 11, name: "V-53-11: 01-windows-tenant-attach.md contains side-by-side comparison table",
    run() {
      const c = readFile(TA);
      if (c === null) return { pass: false, detail: "File missing: " + TA };
      if (!/\| Capability \| Tenant Attach \| Full Co-Management \|/.test(c))
        return { pass: false, detail: "Comparison table header missing" };
      // Verify >=2 data rows (allowing column-separator line + 2 data rows)
      const tableMatch = c.match(/\| Capability \| Tenant Attach \| Full Co-Management \|[\s\S]*?(?=\n\n|\n#)/);
      if (!tableMatch) return { pass: false, detail: "Table region not parseable" };
      const rowCount = (tableMatch[0].match(/^\|/gm) || []).length;
      if (rowCount < 4) return { pass: false, detail: "Comparison table has <2 data rows (header + separator + 2 data = 4 lines minimum); found " + rowCount };
      return { pass: true, detail: "Comparison table with " + (rowCount - 2) + " data rows" };
    }
  },
  {
    id: 12, name: "V-53-12: 01-windows-tenant-attach.md contains SC#3 anchor literals 'no workload switching' + 'workload sliders'",
    run() {
      const c = readFile(TA);
      if (c === null) return { pass: false, detail: "File missing: " + TA };
      const required = ["no workload switching", "workload sliders"];
      const missing = required.filter(s => !c.toLowerCase().includes(s.toLowerCase()));
      if (missing.length > 0) return { pass: false, detail: "SC#3 anchors missing (case-insensitive): " + missing.join(", ") };
      return { pass: true, detail: "SC#3 anchors present" };
    }
  },

  // === COMG-02 + SC#2 + EP HIGH-RISK (V-53-13..17) ===
  {
    id: 13, name: "V-53-13: 02-windows-workload-sliders.md has workload sequence table with Validate-Before-Moving column AND >=6 data rows",
    run() {
      const c = readFile(WS);
      if (c === null) return { pass: false, detail: "File missing: " + WS };
      if (!/Validate Before Moving( Slider)?/.test(c))
        return { pass: false, detail: "'Validate Before Moving Slider' (or 'Validate Before Moving') column header missing" };
      // Look for the workload table; count rows after the column header
      const tableMatch = c.match(/\| Workload \|[^\n]*Validate Before Moving[\s\S]*?(?=\n\n|\n#|\n>)/);
      if (!tableMatch) return { pass: false, detail: "Workload table region not parseable" };
      const dataRows = (tableMatch[0].match(/^\| /gm) || []).length;
      // header + separator + >=6 data rows = 8 lines minimum
      if (dataRows < 8) return { pass: false, detail: "Workload table has <6 data rows; counted " + dataRows + " table-marker lines (need 8: header + sep + 6 data)" };
      return { pass: true, detail: "Workload table with " + (dataRows - 2) + " data rows" };
    }
  },
  {
    id: 14, name: "V-53-14: 02-windows-workload-sliders.md migration order — Compliance precedes EP precedes Device Config precedes Apps in document order",
    run() {
      const c = readFile(WS);
      if (c === null) return { pass: false, detail: "File missing: " + WS };
      // Find positions of workload row markers (table rows starting with | <Workload>)
      const compIdx = c.indexOf("| Compliance Policies");
      const epIdx = c.indexOf("| Endpoint Protection");
      const dcIdx = c.indexOf("| Device Configuration");
      const appsIdx = c.indexOf("| Client Apps");
      if (compIdx < 0) return { pass: false, detail: "'| Compliance Policies' row not found" };
      if (epIdx < 0) return { pass: false, detail: "'| Endpoint Protection' row not found" };
      if (dcIdx < 0) return { pass: false, detail: "'| Device Configuration' row not found" };
      if (appsIdx < 0) return { pass: false, detail: "'| Client Apps' row not found" };
      if (!(compIdx < epIdx)) return { pass: false, detail: "Compliance row position " + compIdx + " not before EP position " + epIdx };
      if (!(epIdx < dcIdx)) return { pass: false, detail: "EP row position " + epIdx + " not before Device Config position " + dcIdx };
      if (!(dcIdx < appsIdx)) return { pass: false, detail: "Device Config position " + dcIdx + " not before Apps position " + appsIdx };
      return { pass: true, detail: "Migration order verified: Compliance(" + compIdx + ") < EP(" + epIdx + ") < DeviceConfig(" + dcIdx + ") < Apps(" + appsIdx + ")" };
    }
  },
  {
    id: 15, name: "V-53-15: 02-windows-workload-sliders.md EP HIGH-RISK Layer 1 — HIGH-RISK token in workload table",
    run() {
      const c = readFile(WS);
      if (c === null) return { pass: false, detail: "File missing: " + WS };
      // Layer 1: HIGH-RISK token must appear in the EP table row (substring match in row context)
      const epRowMatch = c.match(/\| Endpoint Protection[^\n]*/);
      if (!epRowMatch) return { pass: false, detail: "EP workload table row not found" };
      if (!/HIGH-RISK/.test(epRowMatch[0]))
        return { pass: false, detail: "Layer 1: HIGH-RISK token missing from EP row: " + epRowMatch[0].slice(0, 100) };
      return { pass: true, detail: "Layer 1 HIGH-RISK token present in EP row" };
    }
  },
  {
    id: 16, name: "V-53-16: 02-windows-workload-sliders.md EP HIGH-RISK Layer 2 — verbatim blockquote opener + Defender mandate",
    run() {
      const c = readFile(WS);
      if (c === null) return { pass: false, detail: "File missing: " + WS };
      // Layer 2: blockquote opener with verbatim Defender mandate
      if (!c.includes("> \u26a0\ufe0f **Endpoint Protection HIGH-RISK:**"))
        return { pass: false, detail: "Layer 2 blockquote opener missing: '> \u26a0\ufe0f **Endpoint Protection HIGH-RISK:**'" };
      // VERBATIM mandate text — pinned per CONTEXT D-13; must match character-for-character
      const mandate = "do not move this slider until Intune Defender for Endpoint policy is published, targeted, and confirmed reporting healthy";
      if (!c.includes(mandate))
        return { pass: false, detail: "Layer 2 verbatim Defender mandate missing (PITFALLS line 179)" };
      return { pass: true, detail: "Layer 2 blockquote + verbatim Defender mandate confirmed" };
    }
  },
  {
    id: 17, name: "V-53-17: 02-windows-workload-sliders.md EP HIGH-RISK Layer 3 — >=2 inline [HIGH-RISK reminders",
    run() {
      const c = readFile(WS);
      if (c === null) return { pass: false, detail: "File missing: " + WS };
      const tokens = (c.match(/\[HIGH-RISK/g) || []).length;
      if (tokens < 2) return { pass: false, detail: "Need >=2 [HIGH-RISK inline reminders; found " + tokens };
      return { pass: true, detail: tokens + " Layer 3 inline reminders" };
    }
  },

  // === COMG-04 + CROSS-PLATFORM (V-53-18, V-53-19) ===
  {
    id: 18, name: "V-53-18: OV + TA + WS each have > **Platform applicability:** blockquote in first 50 body lines",
    run() {
      const failures = [];
      for (const f of [OV, TA, WS]) {
        const c = readFile(f);
        if (c === null) { failures.push(f + ": file missing"); continue; }
        // Strip frontmatter to get body
        const body = c.replace(/^---\n[\s\S]*?\n---\n/, '');
        const first50 = body.split('\n').slice(0, 50).join('\n');
        if (!first50.includes('> **Platform applicability:**'))
          failures.push(f + ": > **Platform applicability:** not in first 50 body lines");
      }
      if (failures.length > 0) return { pass: false, detail: failures.join(" | ") };
      return { pass: true, detail: "Platform applicability blockquote present in all 3 files (OV, TA, WS)" };
    }
  },
  {
    id: 19, name: "V-53-19: OV + TA + WS each contain analog tokens (Jamf + ABM MDM transfer + MAM + Device Administrator)",
    run() {
      const failures = [];
      const required = ["Jamf", "ABM MDM transfer", "MAM", "Device Administrator"];
      for (const f of [OV, TA, WS]) {
        const c = readFile(f);
        if (c === null) { failures.push(f + ": file missing"); continue; }
        const missing = required.filter(s => !c.includes(s));
        if (missing.length > 0) failures.push(f + ": missing analog tokens: " + missing.join(", "));
      }
      if (failures.length > 0) return { pass: false, detail: failures.join(" | ") };
      return { pass: true, detail: "all 4 analog tokens present in OV + TA + WS" };
    }
  },

  // === COMG-05 + AUTOPATCH (V-53-20) ===
  {
    id: 20, name: "V-53-20: 03-cocmgmt-migration-paths.md contains Autopatch prereqs literals",
    run() {
      const c = readFile(MP);
      if (c === null) return { pass: false, detail: "File missing: " + MP };
      const required = ["Device Configuration", "Office Click-to-Run", "Autopatch"];
      const missing = required.filter(s => !c.includes(s));
      if (missing.length > 0) return { pass: false, detail: "Autopatch tokens missing: " + missing.join(", ") };
      // 'prerequisite' singular OR plural acceptable
      if (!/prerequisite/i.test(c))
        return { pass: false, detail: "'prerequisite' (or 'prerequisites') token missing" };
      return { pass: true, detail: "Autopatch primary tokens present" };
    }
  },
  {
    id: 21, name: "V-53-21: NEGATIVE — 03-cocmgmt-migration-paths.md does NOT contain > **Platform applicability:** (regression-guard; CDI-Phase53-01)",
    run() {
      const c = readFile(MP);
      if (c === null) return { pass: false, detail: "File missing: " + MP };
      if (c.includes('> **Platform applicability:**'))
        return { pass: false, detail: "V-53-21 violation: > **Platform applicability:** must NOT appear in 03-cocmgmt-migration-paths.md (3A-winner D-08 places blockquote in 00/01/02 only; D-09 + CDI-Phase53-01 enforce)" };
      return { pass: true, detail: "Platform applicability blockquote correctly absent from 03 (Windows-only Autopatch prereqs scope)" };
    }
  },

  // === D-02 + 1B-1 + ROADMAP:448 OWNERSHIP (V-53-22) ===
  {
    id: 22, name: "V-53-22: 00-index.md has POSITIVE ## Co-Management H2 + NEGATIVE no scaffold/Phase 54-56 H2s (NOVEL single-H2 contract)",
    run() {
      const c = readFile(IDX);
      if (c === null) return { pass: false, detail: "File missing: " + IDX };
      // POSITIVE — literal H2
      if (!/^## Co-Management\s*$/m.test(c))
        return { pass: false, detail: "POSITIVE: ## Co-Management H2 missing from 00-index.md" };
      // NEGATIVE — no future-phase H2s or scaffold text
      const banPatterns = [
        { p: /^## Patch Management/m, name: "## Patch Management H2" },
        { p: /^## App Lifecycle/m, name: "## App Lifecycle H2" },
        { p: /^## Drift/m, name: "## Drift H2" },
        { p: /^## Tenant Migration/m, name: "## Tenant Migration H2" },
        { p: /Phase 5[4-6]/m, name: "'Phase 54-56' reference" },
        { p: /\bTBD\b/m, name: "'TBD' token" },
        { p: /Coming in Phase/m, name: "'Coming in Phase' placeholder" }
      ];
      for (const { p, name } of banPatterns) {
        if (p.test(c)) return { pass: false, detail: "NEGATIVE regression-guard violated: " + name + " found (forbidden per D-02 + ROADMAP line 448)" };
      }
      return { pass: true, detail: "POSITIVE H2 present + no scaffold/future-phase H2s (single-H2-only contract honored)" };
    }
  },

  // === FORWARD/CROSS LINKS (V-53-23, V-53-24) ===
  {
    id: 23, name: "V-53-23: 02-windows-workload-sliders.md contains forward-link to imaging-to-autopilot.md OR 04-tenant-migration.md",
    run() {
      const c = readFile(WS);
      if (c === null) return { pass: false, detail: "File missing: " + WS };
      const hasLink = c.includes("imaging-to-autopilot.md") || c.includes("device-operations/04-tenant-migration.md");
      if (!hasLink) return { pass: false, detail: "No forward-link to imaging-to-autopilot.md or 04-tenant-migration.md (REQ COMG-02)" };
      return { pass: true, detail: "Forward-link to v1.2 Windows migration content present" };
    }
  },
  {
    id: 24, name: "V-53-24: 00-overview.md contains cross-link to 03-cocmgmt-migration-paths.md (Autopatch prereqs surface)",
    run() {
      const c = readFile(OV);
      if (c === null) return { pass: false, detail: "File missing: " + OV };
      if (!c.includes("03-cocmgmt-migration-paths.md"))
        return { pass: false, detail: "No cross-link from 00-overview.md to 03-cocmgmt-migration-paths.md (D-07 + CDI-Phase53-05 surface)" };
      return { pass: true, detail: "Soft cross-link to 03 Autopatch prereqs present" };
    }
  },

  // === REGRESSION-GUARDS (V-53-25, V-53-26) ===
  {
    id: 25, name: "V-53-25: NO TBD/TODO/FIXME/XXX/PLACEHOLDER tokens in any 5 content files (outside Version History/Changelog)",
    run() {
      const failures = [];
      for (const f of CONTENT_FILES) {
        const c = readFile(f);
        if (c === null) { failures.push(f + ": file missing"); continue; }
        // Strip Version History + Changelog sections before regex (legitimate references to past placeholder text)
        const stripped = c
          .replace(/^## Version History[\s\S]*$/m, '')
          .replace(/^## Changelog[\s\S]*$/m, '');
        if (/\b(TBD|TODO|FIXME|XXX|PLACEHOLDER)\b/.test(stripped))
          failures.push(f + ": placeholder token found in structural text");
      }
      if (failures.length > 0) return { pass: false, detail: failures.join(" | ") };
      return { pass: true, detail: "no placeholder tokens in any content file" };
    }
  },
  {
    id: 26, name: "V-53-26: OV AND WS each contain 'deprecated' within 10 lines of 'Resource Access' AND 'CB 2203'/'CB 2403' reference",
    run() {
      const failures = [];
      for (const f of [OV, WS]) {
        const c = readFile(f);
        if (c === null) { failures.push(f + ": file missing"); continue; }
        if (!c.includes("Resource Access")) { failures.push(f + ": 'Resource Access' not found"); continue; }
        // Find first occurrence of "Resource Access"; check 10-line window for "deprecated"
        const lines = c.split('\n');
        let found = false;
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes("Resource Access")) {
            const window = lines.slice(Math.max(0, i - 2), Math.min(lines.length, i + 12)).join('\n');
            if (window.includes("deprecated") && (window.includes("CB 2203") || window.includes("CB 2403"))) {
              found = true;
              break;
            }
          }
        }
        if (!found) failures.push(f + ": 'deprecated' + 'CB 2203'/'CB 2403' not within 10 lines of any 'Resource Access' occurrence");
      }
      if (failures.length > 0) return { pass: false, detail: failures.join(" | ") };
      return { pass: true, detail: "Resource Access deprecation note present in OV + WS" };
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
