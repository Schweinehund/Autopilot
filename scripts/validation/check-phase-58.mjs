#!/usr/bin/env node
// Phase 58 static validation harness
// Source of truth: .planning/phases/58-defer-08-4-platform-capability-comparison/58-CONTEXT.md
// NO SHELL: all file content via fs.readFileSync; no shared module; no external tools
// Implements 26 checks (V-58-01 through V-58-26)
// Lineage: Phase 48 D-25 (validator-as-deliverable) → Phase 49 D-26 → Phase 50 D-25
//          → Phase 51 D-20 → Phase 52 D-11 → Phase 53 D-11 → Phase 54 D-17/D-18
//          → Phase 55 D-17/D-18 → Phase 56 D-18/D-19 → Phase 57 D-29/D-30
//          → Phase 58 D-17/D-18

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

// D-17 + D-18: Pinned anchor strings — same-plan-series validator update required on any rename.
const COMPARISON_DOC = "docs/reference/4-platform-capability-comparison.md";
const MACOS_MATRIX = "docs/reference/macos-capability-matrix.md";
const IOS_MATRIX = "docs/reference/ios-capability-matrix.md";
const ANDROID_MATRIX = "docs/reference/android-capability-matrix.md";
const LINUX_MATRIX = "docs/reference/linux-capability-matrix.md";
const AUDIT_HARNESS = "scripts/validation/v1.5-milestone-audit.mjs";
const SIBLING_MATRICES = [MACOS_MATRIX, IOS_MATRIX, ANDROID_MATRIX];
const ALL_MATRICES = [LINUX_MATRIX, MACOS_MATRIX, IOS_MATRIX, ANDROID_MATRIX];
const REF_FILES = [COMPARISON_DOC, ...ALL_MATRICES];

// 5-state verdict vocabulary lock per D-02
const VERDICT_RE = /^(Supported|Partial|Not supported|Mode-dependent|n\/a)\b/;

// Helper: slice from H2 literal to next H2 (or EOF). Returns the H2 region body, or null if H2 not found.
function sliceH2Region(content, h2Literal) {
  const re = new RegExp("^" + h2Literal.replace(/[/\\^$*+?.()|[\]{}]/g, "\\$&") + "\\s*$", "m");
  const m = content.match(re);
  if (!m) return null;
  const idx = content.indexOf(m[0]);
  const after = content.slice(idx + m[0].length);
  const nextH2 = after.search(/^## /m);
  return nextH2 > 0 ? content.slice(idx, idx + m[0].length + nextH2) : content.slice(idx);
}

// Helper: extract data cells from canonical 6-column comparison-doc tables (Feature | Windows | macOS | iOS | Android | Linux).
// Excludes:
//   - header row (Feature/Windows/macOS/iOS/Android/Linux tokens)
//   - separator rows (|----|----|...)
//   - col-0 (row-label / Feature-name cells) — these are intentionally NOT link-bearing per D-01 cell-shape contract
//   - tables with cell counts != 6 (e.g., Version History 3-col table; See Also lists)
// This co-exists with the C12 harness scan (v1.5-milestone-audit.mjs:526-538) which is the same logic;
// Plan 58-06 will land an equivalent col-0 exclusion fix in the C12 promotion patch.
function extractCanonicalDataCells(content) {
  const lines = content.split('\n');
  const cells = [];
  for (const line of lines) {
    if (!/^\|/.test(line)) continue;
    if (/^\|[-: ]+\|/.test(line)) continue;
    const lineCells = line.split('|').slice(1, -1);
    // Only canonical 6-col tables (Feature + 5 platforms)
    if (lineCells.length !== 6) continue;
    // Skip the header row itself
    const trimmed0 = lineCells[0].trim();
    if (trimmed0 === 'Feature') continue;
    // Push cols 1-5 only (data cells); col-0 is the row-label / Feature-name (intentionally not link-bearing)
    for (let i = 1; i < 6; i++) {
      cells.push(lineCells[i].trim());
    }
  }
  return cells;
}

const checks = [
  // === FILE EXISTENCE (V-58-01..04) ===
  {
    id: 1, name: "V-58-01: docs/reference/4-platform-capability-comparison.md exists",
    run() {
      const c = readFile(COMPARISON_DOC);
      if (c === null) return { pass: false, detail: "File missing: " + COMPARISON_DOC };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 2, name: "V-58-02: docs/reference/macos-capability-matrix.md exists",
    run() {
      const c = readFile(MACOS_MATRIX);
      if (c === null) return { pass: false, detail: "File missing: " + MACOS_MATRIX };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 3, name: "V-58-03: docs/reference/ios-capability-matrix.md exists",
    run() {
      const c = readFile(IOS_MATRIX);
      if (c === null) return { pass: false, detail: "File missing: " + IOS_MATRIX };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 4, name: "V-58-04: docs/reference/android-capability-matrix.md AND docs/reference/linux-capability-matrix.md exist",
    run() {
      const failures = [];
      for (const f of [ANDROID_MATRIX, LINUX_MATRIX]) {
        if (readFile(f) === null) failures.push("File missing: " + f);
      }
      if (failures.length) return { pass: false, detail: failures.join(" | ") };
      return { pass: true, detail: "both files present" };
    }
  },

  // === COMPARISON DOC STRUCTURE (V-58-05..10) ===
  {
    id: 5, name: "V-58-05: comparison doc contains all 6 H2 literals (Enrollment/Configuration/App Deployment/Compliance/Software Updates/Conditional Access)",
    run() {
      const c = readFile(COMPARISON_DOC);
      if (c === null) return { pass: false, detail: "File missing: " + COMPARISON_DOC };
      const h2s = ["## Enrollment", "## Configuration", "## App Deployment", "## Compliance", "## Software Updates", "## Conditional Access"];
      const missing = h2s.filter(h => !new RegExp("^" + h.replace(/[/\\^$*+?.()|[\]{}]/g, "\\$&") + "\\s*$", "m").test(c));
      if (missing.length) return { pass: false, detail: "Missing H2 literals: " + missing.join(", ") };
      return { pass: true, detail: "all 6 H2 literals present" };
    }
  },
  {
    id: 6, name: "V-58-06: comparison doc contains all 5 platform column tokens (Windows, macOS, iOS, Android, Linux) + canonical 6-col header",
    run() {
      const c = readFile(COMPARISON_DOC);
      if (c === null) return { pass: false, detail: "File missing: " + COMPARISON_DOC };
      const tokens = ["Windows", "macOS", "iOS", "Android", "Linux"];
      const missing = tokens.filter(t => !c.includes(t));
      if (missing.length) return { pass: false, detail: "Missing platform tokens: " + missing.join(", ") };
      // Also confirm 6-column header `| Feature | Windows | macOS | iOS | Android | Linux |` appears
      if (!c.includes("| Feature | Windows | macOS | iOS | Android | Linux |")) {
        return { pass: false, detail: "6-column table header not present in canonical form" };
      }
      return { pass: true, detail: "5 platform columns + canonical 6-col header present" };
    }
  },
  {
    id: 7, name: "V-58-07: comparison doc every non-empty data cell (cols 1-5 of canonical 6-col tables) contains markdown hyperlink (PITFALL-7 link-not-copy)",
    run() {
      const c = readFile(COMPARISON_DOC);
      if (c === null) return { pass: false, detail: "File missing: " + COMPARISON_DOC };
      const cells = extractCanonicalDataCells(c);
      // Skip-list canonical match per C12 harness (v1.5-milestone-audit.mjs:532) — em-dash, "N/A", empty.
      // Bare "n/a" is a VALID D-02 verdict and MUST require a hyperlink — DO NOT include in skip-list (W-9 fix).
      const skipCellTokens = new Set(["—", "N/A", ""]);
      const failures = [];
      for (const cell of cells) {
        if (skipCellTokens.has(cell)) continue;
        if (!/\[.+\]\(.+\)/.test(cell)) {
          failures.push(cell.slice(0, 60));
          if (failures.length >= 5) break;
        }
      }
      if (failures.length) return { pass: false, detail: failures.length + "+ cell(s) missing hyperlinks: " + failures.join(" | ") };
      return { pass: true, detail: cells.length + " data cells scanned, all non-empty cells link-bearing" };
    }
  },
  {
    id: 8, name: "V-58-08: comparison doc verdict-vocabulary lock (D-02) — every link-bearing data cell starts with one of 5 verdicts",
    run() {
      const c = readFile(COMPARISON_DOC);
      if (c === null) return { pass: false, detail: "File missing: " + COMPARISON_DOC };
      const cells = extractCanonicalDataCells(c);
      const failures = [];
      for (const cell of cells) {
        if (!cell || cell === "—" || cell === "N/A") continue;
        // Cells with markdown link must start with verdict
        if (/\[.+\]\(.+\)/.test(cell) && !VERDICT_RE.test(cell)) {
          failures.push(cell.slice(0, 60));
          if (failures.length >= 5) break;
        }
      }
      if (failures.length) return { pass: false, detail: failures.length + "+ link-bearing cell(s) start with non-verdict: " + failures.join(" | ") };
      return { pass: true, detail: "all link-bearing data cells start with one of 5 verdicts (Supported|Partial|Not supported|Mode-dependent|n/a)" };
    }
  },
  {
    id: 9, name: "V-58-09: comparison doc intro contains Windows-source-acknowledgment literal (D-10)",
    run() {
      const c = readFile(COMPARISON_DOC);
      if (c === null) return { pass: false, detail: "File missing: " + COMPARISON_DOC };
      // First 30 lines after frontmatter close
      const fmEnd = c.indexOf("---\n", 4);
      if (fmEnd < 0) return { pass: false, detail: "frontmatter close not found" };
      const intro = c.slice(fmEnd, fmEnd + 3000); // ~30 lines
      if (!intro.includes("linux-capability-matrix.md")) return { pass: false, detail: "intro missing linux-capability-matrix.md reference" };
      if (!intro.includes("deferred to v1.6+")) return { pass: false, detail: "intro missing 'deferred to v1.6+' acknowledgment" };
      return { pass: true, detail: "Windows-source-acknowledgment present in intro" };
    }
  },
  {
    id: 10, name: "V-58-10: comparison doc frontmatter has last_verified + review_by (45-day cycle per D-19) + audience: admin + platform: all",
    run() {
      const c = readFile(COMPARISON_DOC);
      if (c === null) return { pass: false, detail: "File missing: " + COMPARISON_DOC };
      const fm = c.match(/^---\n([\s\S]*?)\n---/);
      if (!fm) return { pass: false, detail: "frontmatter block not parseable" };
      const fmBody = fm[1];
      const lvMatch = fmBody.match(/last_verified:\s*(\d{4}-\d{2}-\d{2})/);
      const rbMatch = fmBody.match(/review_by:\s*(\d{4}-\d{2}-\d{2})/);
      if (!lvMatch) return { pass: false, detail: "last_verified field missing or malformed" };
      if (!rbMatch) return { pass: false, detail: "review_by field missing or malformed" };
      const lv = new Date(lvMatch[1]);
      const rb = new Date(rbMatch[1]);
      const days = Math.round((rb - lv) / (1000 * 60 * 60 * 24));
      if (days !== 45) return { pass: false, detail: "review_by cycle is " + days + " days, expected 45 (D-19)" };
      if (!/audience:\s*admin/.test(fmBody)) return { pass: false, detail: "audience: admin missing from frontmatter" };
      if (!/platform:\s*all/.test(fmBody)) return { pass: false, detail: "platform: all missing from frontmatter" };
      return { pass: true, detail: "frontmatter complete (last_verified, review_by 45-day, audience:admin, platform:all)" };
    }
  },

  // === SIBLING MATRIX CA H2 RETROFIT (V-58-11..13) ===
  {
    id: 11, name: "V-58-11: macos-capability-matrix.md contains '## Conditional Access' H2 (D-04 retrofit)",
    run() {
      const c = readFile(MACOS_MATRIX);
      if (c === null) return { pass: false, detail: "File missing: " + MACOS_MATRIX };
      if (!/^## Conditional Access\s*$/m.test(c)) return { pass: false, detail: "## Conditional Access H2 missing — D-04 retrofit incomplete" };
      return { pass: true, detail: "## Conditional Access H2 present" };
    }
  },
  {
    id: 12, name: "V-58-12: ios-capability-matrix.md contains '## Conditional Access' H2 (D-04 retrofit)",
    run() {
      const c = readFile(IOS_MATRIX);
      if (c === null) return { pass: false, detail: "File missing: " + IOS_MATRIX };
      if (!/^## Conditional Access\s*$/m.test(c)) return { pass: false, detail: "## Conditional Access H2 missing — D-04 retrofit incomplete" };
      return { pass: true, detail: "## Conditional Access H2 present" };
    }
  },
  {
    id: 13, name: "V-58-13: android-capability-matrix.md contains '## Conditional Access' H2 (D-04 retrofit)",
    run() {
      const c = readFile(ANDROID_MATRIX);
      if (c === null) return { pass: false, detail: "File missing: " + ANDROID_MATRIX };
      if (!/^## Conditional Access\s*$/m.test(c)) return { pass: false, detail: "## Conditional Access H2 missing — D-04 retrofit incomplete" };
      return { pass: true, detail: "## Conditional Access H2 present" };
    }
  },
  // === V-58-14..26 appended in Task 2 ===
