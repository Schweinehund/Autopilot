#!/usr/bin/env node
// Phase 49 static validation harness
// Source of truth: .planning/phases/49-linux-foundation-taxonomy-glossary-version-matrix/49-CONTEXT.md
// NO SHELL: all file content via fs.readFileSync; no shared module; no external tools
// Implements 22 checks (V-49-01 through V-49-22); --skip-reciprocal flag skips V-49-20 through V-49-22

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');
const SKIP_RECIPROCAL = argv.includes('--skip-reciprocal');

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8');
}

// CDI-02: Pinned H2 strings — Phase 50+ renaming requires same-commit validator update.
const ENROLLMENT_OVERVIEW_PATH = "docs/linux-lifecycle/00-enrollment-overview.md";
const PREREQUISITES_PATH = "docs/linux-lifecycle/01-linux-prerequisites.md";
const GLOSSARY_LINUX_PATH = "docs/_glossary-linux.md";
const GLOSSARY_WIN_PATH = "docs/_glossary.md";
const GLOSSARY_MACOS_PATH = "docs/_glossary-macos.md";
const GLOSSARY_ANDROID_PATH = "docs/_glossary-android.md";

const VALID_STATUS = /^(Supported|Partial|Not supported)/;
const RECIPROCAL_LINK_LITERAL = "[Linux Provisioning Glossary](_glossary-linux.md)";

// Helper: extract Linux-native term H3s from topical categories (excludes Cross-Platform Collisions)
function extractLinuxNativeTerms(content) {
  const lines = content.split('\n');
  const terms = [];
  let inTopical = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^## Cross-Platform Collisions\s*$/.test(line)) { inTopical = false; continue; }
    if (/^## (Distro & Lifecycle|Agent & Service|Compliance & Encryption|Operations & Diagnostics)\s*$/.test(line)) { inTopical = true; continue; }
    if (/^## /.test(line)) { inTopical = false; continue; }
    if (inTopical) {
      const m = line.match(/^### (.+?)\s*$/);
      if (m) terms.push({ name: m[1].trim(), lineIndex: i });
    }
  }
  return terms;
}

// Helper: check for Cross-platform note blockquote within 5 lines after a given line index
function hasCrossPlatformNote(lines, h3LineIndex) {
  const end = Math.min(h3LineIndex + 6, lines.length);
  for (let i = h3LineIndex + 1; i < end; i++) {
    if (/^> \*\*Cross-platform note:\*\*/.test(lines[i])) return true;
  }
  return false;
}

// Helper: extract H3 term names from any glossary
function extractH3Terms(content) {
  const lines = content.split('\n');
  const terms = new Set();
  for (const line of lines) {
    const m = line.match(/^### (.+?)\s*$/);
    if (m) terms.add(m[1].trim());
  }
  return terms;
}

const checks = [
  {
    id: 1, name: "V-49-01: 00-enrollment-overview.md exists",
    run() {
      const content = readFile(ENROLLMENT_OVERVIEW_PATH);
      if (content === null) return { pass: false, detail: "File does not exist: " + ENROLLMENT_OVERVIEW_PATH };
      return { pass: true, detail: "found (" + content.length + " bytes)" };
    }
  },
  {
    id: 2, name: "V-49-02: H2 ## Supported Management Surface",
    run() {
      const content = readFile(ENROLLMENT_OVERVIEW_PATH);
      if (content === null) return { pass: false, detail: "File missing" };
      if (/^## Supported Management Surface\s*$/m.test(content)) return { pass: true };
      return { pass: false, detail: "H2 '## Supported Management Surface' not found" };
    }
  },
  {
    id: 3, name: "V-49-03: H2 ## Out of Scope for Linux via Intune (peer to whitelist)",
    run() {
      const content = readFile(ENROLLMENT_OVERVIEW_PATH);
      if (content === null) return { pass: false, detail: "File missing" };
      if (/^## Out of Scope for Linux via Intune\s*$/m.test(content)) return { pass: true };
      return { pass: false, detail: "H2 '## Out of Scope for Linux via Intune' not found" };
    }
  },
  {
    id: 4, name: "V-49-04: H2 ## For Admins Familiar with Windows / macOS / Android",
    run() {
      const content = readFile(ENROLLMENT_OVERVIEW_PATH);
      if (content === null) return { pass: false, detail: "File missing" };
      if (/^## For Admins Familiar with Windows \/ macOS \/ Android\s*$/m.test(content)) return { pass: true };
      return { pass: false, detail: "H2 cross-platform bridge subsection not found" };
    }
  },
  {
    id: 5, name: "V-49-05: H2 ## Enrollment Constraints",
    run() {
      const content = readFile(ENROLLMENT_OVERVIEW_PATH);
      if (content === null) return { pass: false, detail: "File missing" };
      if (/^## Enrollment Constraints\s*$/m.test(content)) return { pass: true };
      return { pass: false, detail: "H2 '## Enrollment Constraints' not found" };
    }
  },
  {
    id: 6, name: "V-49-06: H3 BYOD vs Corporate-Owned Caveat with Known caveat blockquote",
    run() {
      const content = readFile(ENROLLMENT_OVERVIEW_PATH);
      if (content === null) return { pass: false, detail: "File missing" };
      if (!/^### BYOD vs Corporate-Owned Caveat\s*$/m.test(content)) return { pass: false, detail: "H3 BYOD vs Corporate-Owned Caveat not found" };
      if (!/^> ⚠️ \*\*Known caveat:\*\*/m.test(content)) return { pass: false, detail: "Known caveat blockquote not found" };
      return { pass: true };
    }
  },
  {
    id: 7, name: "V-49-07: Capability table 3-status closed set (D-02)",
    run() {
      const content = readFile(ENROLLMENT_OVERVIEW_PATH);
      if (content === null) return { pass: false, detail: "File missing" };
      const lines = content.split('\n');
      let inTable = false;
      let headerSeen = false;
      const violations = [];
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (/^## Supported Management Surface\s*$/.test(line)) { inTable = true; continue; }
        if (inTable && /^## /.test(line)) break;
        if (!inTable) continue;
        if (!/^\|/.test(line)) continue;
        if (!headerSeen) { headerSeen = true; continue; }
        if (/^\|[-| ]+\|/.test(line)) continue;
        const cells = line.split('|').map(c => c.trim()).filter(Boolean);
        if (cells.length < 2) continue;
        const statusCell = cells[1];
        if (!VALID_STATUS.test(statusCell)) violations.push("\"" + statusCell + "\"");
      }
      if (violations.length === 0) return { pass: true, detail: "All status cells use canonical 3-string set" };
      return { pass: false, detail: violations.length + " cell(s) violate closed set: " + violations.join(", ") };
    }
  },
  {
    id: 8, name: "V-49-08: CA row reads 'Not supported — web-app CA only' (PITFALL-2 line 48)",
    run() {
      const content = readFile(ENROLLMENT_OVERVIEW_PATH);
      if (content === null) return { pass: false, detail: "File missing" };
      if (content.includes("Not supported \u2014 web-app CA only")) return { pass: true };
      return { pass: false, detail: "PITFALL-2 mandated CA cell phrasing not found" };
    }
  },
  {
    id: 9, name: "V-49-09: 01-linux-prerequisites.md matrix header literal match (D-07)",
    run() {
      const content = readFile(PREREQUISITES_PATH);
      if (content === null) return { pass: false, detail: "File does not exist: " + PREREQUISITES_PATH };
      if (/^\| Version \| GA Kernel \| HWE Kernel \| Support Status \| EOS Date \|\s*$/m.test(content)) return { pass: true };
      return { pass: false, detail: "Matrix header row does not match exact literal '| Version | GA Kernel | HWE Kernel | Support Status | EOS Date |'" };
    }
  },
  {
    id: 10, name: "V-49-10: Matrix has exactly 3 distro rows (Ubuntu 20.04 / 22.04 / 24.04)",
    run() {
      const content = readFile(PREREQUISITES_PATH);
      if (content === null) return { pass: false, detail: "File missing" };
      const distroRows = (content.match(/^\| Ubuntu (20\.04|22\.04|24\.04) LTS/gm) || []);
      if (distroRows.length === 3) return { pass: true, detail: "found 3 distro rows" };
      return { pass: false, detail: "Expected 3 distro rows, found " + distroRows.length };
    }
  },
  {
    id: 11, name: "V-49-11: H3 ### Ubuntu 20.04 — End-of-Support (D-08)",
    run() {
      const content = readFile(PREREQUISITES_PATH);
      if (content === null) return { pass: false, detail: "File missing" };
      if (/^### Ubuntu 20\.04 \u2014 End-of-Support\s*$/m.test(content)) return { pass: true };
      return { pass: false, detail: "H3 '### Ubuntu 20.04 \u2014 End-of-Support' not found" };
    }
  },
  {
    id: 12, name: "V-49-12: H3 ### Non-version Breakpoints (D-09; Phase 50 LIN-05 anchor target)",
    run() {
      const content = readFile(PREREQUISITES_PATH);
      if (content === null) return { pass: false, detail: "File missing" };
      if (/^### Non-version Breakpoints\s*$/m.test(content)) return { pass: true };
      return { pass: false, detail: "H3 '### Non-version Breakpoints' not found" };
    }
  },
  {
    id: 13, name: "V-49-13: _glossary-linux.md exists with 5 content category H2s (D-11)",
    run() {
      const content = readFile(GLOSSARY_LINUX_PATH);
      if (content === null) return { pass: false, detail: "File does not exist: " + GLOSSARY_LINUX_PATH };
      const required = [
        /^## Distro & Lifecycle\s*$/m,
        /^## Agent & Service\s*$/m,
        /^## Compliance & Encryption\s*$/m,
        /^## Operations & Diagnostics\s*$/m,
        /^## Cross-Platform Collisions\s*$/m
      ];
      const missing = required.filter(r => !r.test(content)).map(r => r.source);
      if (missing.length === 0) return { pass: true, detail: "all 5 content categories present" };
      return { pass: false, detail: "missing H2: " + missing.join(", ") };
    }
  },
  {
    id: 14, name: "V-49-14: H2 ## Alphabetical Index present",
    run() {
      const content = readFile(GLOSSARY_LINUX_PATH);
      if (content === null) return { pass: false, detail: "File missing" };
      if (/^## Alphabetical Index\s*$/m.test(content)) return { pass: true };
      return { pass: false, detail: "H2 '## Alphabetical Index' not found" };
    }
  },
  {
    id: 15, name: "V-49-15: At least 20 native term H3s in topical categories (D-14)",
    run() {
      const content = readFile(GLOSSARY_LINUX_PATH);
      if (content === null) return { pass: false, detail: "File missing" };
      const native = extractLinuxNativeTerms(content);
      if (native.length >= 20) return { pass: true, detail: native.length + " native terms" };
      return { pass: false, detail: "Expected at least 20 native term H3s in topical categories, found " + native.length };
    }
  },
  {
    id: 16, name: "V-49-16: H2 ## Cross-Platform Collisions (CDI-02 pinned)",
    run() {
      const content = readFile(GLOSSARY_LINUX_PATH);
      if (content === null) return { pass: false, detail: "File missing" };
      if (/^## Cross-Platform Collisions\s*$/m.test(content)) return { pass: true };
      return { pass: false, detail: "H2 '## Cross-Platform Collisions' not found (CDI-02 H2-string contract)" };
    }
  },
  {
    id: 17, name: "V-49-17: H2 ## Version History + at least 9 Linux note absent-concept callouts (D-13)",
    run() {
      const content = readFile(GLOSSARY_LINUX_PATH);
      if (content === null) return { pass: false, detail: "File missing" };
      if (!/^## Version History\s*$/m.test(content)) return { pass: false, detail: "H2 '## Version History' not found" };
      const linuxNotes = (content.match(/^> \*\*Linux note:\*\*/gm) || []).length;
      if (linuxNotes >= 9) return { pass: true, detail: "Version History present + " + linuxNotes + " Linux note callouts" };
      return { pass: false, detail: "Expected >= 9 Linux note absent-concept callouts (D-13), found " + linuxNotes };
    }
  },
  {
    id: 18, name: "V-49-18: C10 frontmatter — platform: Linux + 60-day last_verified/review_by on all 3 new docs",
    run() {
      const files = [ENROLLMENT_OVERVIEW_PATH, PREREQUISITES_PATH, GLOSSARY_LINUX_PATH];
      const failures = [];
      for (const f of files) {
        const content = readFile(f);
        if (content === null) { failures.push(f + ": file missing"); continue; }
        const fmMatch = content.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/m);
        if (!fmMatch) { failures.push(f + ": no frontmatter"); continue; }
        const fm = fmMatch[1];
        const issues = [];
        if (!/^platform: Linux\s*$/m.test(fm)) issues.push("platform: Linux missing");
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
      if (failures.length === 0) return { pass: true, detail: "all 3 Linux files have valid frontmatter" };
      return { pass: false, detail: failures.join(" | ") };
    }
  },
  {
    id: 19, name: "V-49-19: PITFALL-5 collision audit — Linux-native terms colliding with sibling glossaries carry Cross-platform note within 5 lines (D-21, D-23)",
    run() {
      const linuxContent = readFile(GLOSSARY_LINUX_PATH);
      if (linuxContent === null) return { pass: false, detail: "Linux glossary missing" };
      const winContent = readFile(GLOSSARY_WIN_PATH) || "";
      const macosContent = readFile(GLOSSARY_MACOS_PATH) || "";
      const androidContent = readFile(GLOSSARY_ANDROID_PATH) || "";
      const siblingTerms = new Set();
      for (const t of extractH3Terms(winContent)) siblingTerms.add(t.toLowerCase());
      for (const t of extractH3Terms(macosContent)) siblingTerms.add(t.toLowerCase());
      for (const t of extractH3Terms(androidContent)) siblingTerms.add(t.toLowerCase());
      const native = extractLinuxNativeTerms(linuxContent);
      const lines = linuxContent.split('\n');
      const violations = [];
      for (const t of native) {
        if (siblingTerms.has(t.name.toLowerCase())) {
          if (!hasCrossPlatformNote(lines, t.lineIndex)) {
            violations.push("'" + t.name + "' (line " + (t.lineIndex + 1) + ") \u2014 collides with sibling glossary, no Cross-platform note within 5 lines");
          }
        }
      }
      if (violations.length === 0) return { pass: true, detail: native.length + " native terms scanned, " + siblingTerms.size + " sibling H3s; no collision violations" };
      return { pass: false, detail: violations.length + " collision(s): " + violations.join(" | ") };
    }
  },
  {
    id: 20, name: "V-49-20: docs/_glossary.md contains reciprocal Linux glossary link",
    run() {
      if (SKIP_RECIPROCAL) return { pass: true, skipped: true, detail: "--skip-reciprocal flag set; check deferred to commit-2" };
      const content = readFile(GLOSSARY_WIN_PATH);
      if (content === null) return { pass: false, detail: "File does not exist: " + GLOSSARY_WIN_PATH };
      if (content.includes(RECIPROCAL_LINK_LITERAL)) return { pass: true };
      return { pass: false, detail: "Reciprocal link literal not found in " + GLOSSARY_WIN_PATH };
    }
  },
  {
    id: 21, name: "V-49-21: docs/_glossary-android.md contains reciprocal Linux glossary link",
    run() {
      if (SKIP_RECIPROCAL) return { pass: true, skipped: true, detail: "--skip-reciprocal flag set; check deferred to commit-2" };
      const content = readFile(GLOSSARY_ANDROID_PATH);
      if (content === null) return { pass: false, detail: "File does not exist: " + GLOSSARY_ANDROID_PATH };
      if (content.includes(RECIPROCAL_LINK_LITERAL)) return { pass: true };
      return { pass: false, detail: "Reciprocal link literal not found in " + GLOSSARY_ANDROID_PATH };
    }
  },
  {
    id: 22, name: "V-49-22: docs/_glossary-macos.md contains reciprocal Linux glossary link",
    run() {
      if (SKIP_RECIPROCAL) return { pass: true, skipped: true, detail: "--skip-reciprocal flag set; check deferred to commit-2" };
      const content = readFile(GLOSSARY_MACOS_PATH);
      if (content === null) return { pass: false, detail: "File does not exist: " + GLOSSARY_MACOS_PATH };
      if (content.includes(RECIPROCAL_LINK_LITERAL)) return { pass: true };
      return { pass: false, detail: "Reciprocal link literal not found in " + GLOSSARY_MACOS_PATH };
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
