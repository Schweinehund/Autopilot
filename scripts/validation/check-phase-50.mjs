#!/usr/bin/env node
// Phase 50 static validation harness
// Source of truth: .planning/phases/50-linux-admin-setup-capability-matrix/50-CONTEXT.md
// NO SHELL: all file content via fs.readFileSync; no shared module; no external tools
// Implements ~26 checks (V-50-01 through V-50-26)

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

// CDI-02: Pinned H2 strings — Phase 51+ renaming requires same-commit validator update.
// Admin-setup-linux files (audience: admin)
const ADMIN_OVERVIEW = "docs/admin-setup-linux/00-overview.md";
const ADMIN_AGENT = "docs/admin-setup-linux/01-intune-linux-agent.md";
const ADMIN_ENROLLMENT = "docs/admin-setup-linux/02-enrollment-profile.md";
const ADMIN_COMPLIANCE = "docs/admin-setup-linux/03-compliance-policy.md";
const ADMIN_APP = "docs/admin-setup-linux/04-app-delivery.md";
const ADMIN_CA = "docs/admin-setup-linux/05-conditional-access.md";
// End-user file (audience: end-user)
const ENDUSER_FILE = "docs/end-user-guides/linux-intune-portal-enrollment.md";
// Reference matrix
const MATRIX = "docs/reference/linux-capability-matrix.md";

const ADMIN_FILES = [ADMIN_OVERVIEW, ADMIN_AGENT, ADMIN_ENROLLMENT, ADMIN_COMPLIANCE, ADMIN_APP, ADMIN_CA, MATRIX];
const ALL_CONTENT_FILES = [...ADMIN_FILES, ENDUSER_FILE];

// Phase 49 anchor literals (Phase 50 back-link targets)
const PHASE49_BRIDGE_BACKLINK = "docs/linux-lifecycle/00-enrollment-overview.md#for-admins-familiar-with-windows--macos--android";
const PHASE49_BREAKPOINTS_BACKLINK = "docs/linux-lifecycle/01-linux-prerequisites.md#non-version-breakpoints";

const VALID_STATUS = /^(Supported|Partial|Not supported)/;

const checks = [
  // === FILE EXISTENCE (V-50-01 through V-50-08) ===
  {
    id: 1, name: "V-50-01: 00-overview.md exists",
    run() {
      const c = readFile(ADMIN_OVERVIEW);
      if (c === null) return { pass: false, detail: "File missing: " + ADMIN_OVERVIEW };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 2, name: "V-50-02: 01-intune-linux-agent.md exists",
    run() {
      const c = readFile(ADMIN_AGENT);
      if (c === null) return { pass: false, detail: "File missing: " + ADMIN_AGENT };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 3, name: "V-50-03: 02-enrollment-profile.md exists",
    run() {
      const c = readFile(ADMIN_ENROLLMENT);
      if (c === null) return { pass: false, detail: "File missing: " + ADMIN_ENROLLMENT };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 4, name: "V-50-04: 03-compliance-policy.md exists",
    run() {
      const c = readFile(ADMIN_COMPLIANCE);
      if (c === null) return { pass: false, detail: "File missing: " + ADMIN_COMPLIANCE };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 5, name: "V-50-05: 04-app-delivery.md exists",
    run() {
      const c = readFile(ADMIN_APP);
      if (c === null) return { pass: false, detail: "File missing: " + ADMIN_APP };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 6, name: "V-50-06: 05-conditional-access.md exists",
    run() {
      const c = readFile(ADMIN_CA);
      if (c === null) return { pass: false, detail: "File missing: " + ADMIN_CA };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 7, name: "V-50-07: linux-intune-portal-enrollment.md exists",
    run() {
      const c = readFile(ENDUSER_FILE);
      if (c === null) return { pass: false, detail: "File missing: " + ENDUSER_FILE };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 8, name: "V-50-08: linux-capability-matrix.md exists",
    run() {
      const c = readFile(MATRIX);
      if (c === null) return { pass: false, detail: "File missing: " + MATRIX };
      return { pass: true, detail: c.length + " bytes" };
    }
  },

  // === H2 PINNED STRINGS — admin enrollment file (V-50-09; D-08 pinned) ===
  {
    id: 9, name: "V-50-09: 02-enrollment-profile.md has 5 PINNED H2s (D-08)",
    run() {
      const c = readFile(ADMIN_ENROLLMENT);
      if (c === null) return { pass: false, detail: "File missing" };
      const required = [
        /^## Prerequisites\s*$/m,
        /^## Steps\s*$/m,
        /^## Verification\s*$/m,
        /^## Configuration-Caused Failures\s*$/m,
        /^## See Also\s*$/m
      ];
      const missing = required.filter(r => !r.test(c)).map(r => r.source);
      if (missing.length === 0) return { pass: true };
      return { pass: false, detail: "missing H2(s): " + missing.join(", ") };
    }
  },

  // === NEGATIVE ASSERTIONS — admin enrollment file (V-50-10; D-08 / D-24 regression guard) ===
  {
    id: 10, name: "V-50-10: 02-enrollment-profile.md has NO forbidden H2s (regression guard)",
    run() {
      const c = readFile(ADMIN_ENROLLMENT);
      if (c === null) return { pass: false, detail: "File missing" };
      const forbidden = [
        /^## End-User Enrollment Steps\s*$/m,
        /^## Appendix:/m,
        /^## Validate End-User Flow\s*$/m
      ];
      const found = forbidden.filter(r => r.test(c)).map(r => r.source);
      if (found.length === 0) return { pass: true };
      return { pass: false, detail: "FORBIDDEN H2 present (drift toward rejected 2A/2B/2C): " + found.join(", ") };
    }
  },

  // === H2 PINNED STRINGS — end-user file (V-50-11; D-09) ===
  {
    id: 11, name: "V-50-11: end-user file has 5 PINNED H2s (D-09)",
    run() {
      const c = readFile(ENDUSER_FILE);
      if (c === null) return { pass: false, detail: "File missing" };
      const required = [
        /^## What is Linux Intune Enrollment\?\s*$/m,
        /^## Before you start\s*$/m,
        /^## Enroll your device\s*$/m,
        /^## Verify enrollment\s*$/m,
        /^## Get help\s*$/m
      ];
      const missing = required.filter(r => !r.test(c)).map(r => r.source);
      if (missing.length === 0) return { pass: true };
      return { pass: false, detail: "missing H2(s): " + missing.join(", ") };
    }
  },

  // === CROSS-LINK LITERALS — D-10 BOTH DIRECTIONS (V-50-12, V-50-13) ===
  {
    id: 12, name: "V-50-12: 02-enrollment-profile.md \u2192 end-user file cross-link (D-10 forward)",
    run() {
      const c = readFile(ADMIN_ENROLLMENT);
      if (c === null) return { pass: false, detail: "File missing" };
      if (c.includes("../end-user-guides/linux-intune-portal-enrollment.md")) return { pass: true };
      return { pass: false, detail: "D-10 forward cross-link literal not found" };
    }
  },
  {
    id: 13, name: "V-50-13: end-user file \u2192 02-enrollment-profile.md cross-link (D-10 reverse)",
    run() {
      const c = readFile(ENDUSER_FILE);
      if (c === null) return { pass: false, detail: "File missing" };
      if (c.includes("../admin-setup-linux/02-enrollment-profile.md")) return { pass: true };
      return { pass: false, detail: "D-10 reverse cross-link literal not found" };
    }
  },

  // === MATRIX 10 H2s + CA CELL + 3-STATUS + EQUIVALENCES (V-50-14 through V-50-17) ===
  {
    id: 14, name: "V-50-14: linux-capability-matrix.md has 10 PINNED H2s (D-06)",
    run() {
      const c = readFile(MATRIX);
      if (c === null) return { pass: false, detail: "File missing" };
      const required = [
        /^## Enrollment\s*$/m,
        /^## Configuration\s*$/m,
        /^## App Deployment\s*$/m,
        /^## Compliance\s*$/m,
        /^## Software Updates\s*$/m,
        /^## Conditional Access\s*$/m,
        /^## Cross-Platform Equivalences\s*$/m,
        /^## Key Gaps Summary\s*$/m,
        /^## See Also\s*$/m,
        /^## Version History\s*$/m
      ];
      const missing = required.filter(r => !r.test(c)).map(r => r.source);
      if (missing.length === 0) return { pass: true, detail: "all 10 H2s present" };
      return { pass: false, detail: "missing H2(s): " + missing.join(", ") };
    }
  },
  {
    id: 15, name: "V-50-15: matrix CA row literal 'Not supported \u2014 web-app CA only' (PITFALL-2; V-49-08 inheritance)",
    run() {
      const c = readFile(MATRIX);
      if (c === null) return { pass: false, detail: "File missing" };
      if (c.includes("Not supported \u2014 web-app CA only")) return { pass: true };
      return { pass: false, detail: "PITFALL-2 mandated CA cell phrasing not found (em-dash byte sequence required)" };
    }
  },
  {
    id: 16, name: "V-50-16: matrix Linux column 3-status closed set (D-04; column-aware extending V-49-07)",
    run() {
      const c = readFile(MATRIX);
      if (c === null) return { pass: false, detail: "File missing" };
      const lines = c.split('\n');
      let inDomain = false;
      let headerSeen = false;
      const violations = [];
      for (const line of lines) {
        if (/^## (Enrollment|Configuration|App Deployment|Compliance|Software Updates|Conditional Access)\s*$/.test(line)) {
          inDomain = true; headerSeen = false; continue;
        }
        if (inDomain && /^## /.test(line)) { inDomain = false; headerSeen = false; continue; }
        if (!inDomain) continue;
        if (!/^\|/.test(line)) continue;
        if (!headerSeen) {
          // expect | Feature | Windows | Linux |
          if (/^\|\s*Feature\s*\|\s*Windows\s*\|\s*Linux\s*\|/.test(line)) { headerSeen = true; }
          continue;
        }
        if (/^\|[-| ]+\|/.test(line)) continue; // separator row
        const cells = line.split('|').map(s => s.trim()).filter(Boolean);
        if (cells.length < 3) continue;
        const linuxCell = cells[2]; // index 2 in 3-col table | Feature | Windows | Linux |
        if (!VALID_STATUS.test(linuxCell)) violations.push("\"" + linuxCell + "\"");
      }
      if (violations.length === 0) return { pass: true, detail: "all Linux column cells canonical" };
      return { pass: false, detail: violations.length + " cell(s) violate closed set: " + violations.join(", ") };
    }
  },
  {
    id: 17, name: "V-50-17: Cross-Platform Equivalences H2 has \u22653 paired rows (corrected SC#4 floor; D-12)",
    run() {
      const c = readFile(MATRIX);
      if (c === null) return { pass: false, detail: "File missing" };
      // Heuristic: verify presence of D-13/D-14/D-15 lead phrases
      const pair1 = c.includes("intune-portal") && c.includes("microsoft-identity-broker") && c.includes("IntuneMDMDaemon LaunchAgent");
      const pair2 = c.includes("intune-agent.timer") && /APNs/i.test(c);
      const pair3 = /web-app CA/i.test(c) && /MAM-WE/i.test(c);
      const found = [pair1, pair2, pair3].filter(Boolean).length;
      if (found >= 3) return { pass: true, detail: "3 D-13/D-14/D-15 paired rows found" };
      return { pass: false, detail: "Only " + found + " of 3 required paired-row attribution phrases found" };
    }
  },

  // === PITFALL CALLOUT LITERALS (V-50-18 through V-50-22) ===
  {
    id: 18, name: "V-50-18: 01-intune-linux-agent.md has LIN-05 'Known admin pitfall' blockquote (DPO-01)",
    run() {
      const c = readFile(ADMIN_AGENT);
      if (c === null) return { pass: false, detail: "File missing" };
      if (/^> ⚠️ \*\*Known admin pitfall/m.test(c)) return { pass: true };
      return { pass: false, detail: "LIN-05 blockquote regex not found" };
    }
  },
  {
    id: 19, name: "V-50-19: 01-intune-linux-agent.md contains DPO-01 anchor back-link",
    run() {
      const c = readFile(ADMIN_AGENT);
      if (c === null) return { pass: false, detail: "File missing" };
      if (c.includes(PHASE49_BREAKPOINTS_BACKLINK)) return { pass: true };
      return { pass: false, detail: "DPO-01 anchor back-link literal not found: " + PHASE49_BREAKPOINTS_BACKLINK };
    }
  },
  {
    id: 20, name: "V-50-20: 04-app-delivery.md PITFALL-1 scope callout literal",
    run() {
      const c = readFile(ADMIN_APP);
      if (c === null) return { pass: false, detail: "File missing" };
      if (c.includes("script-based only") || c.includes("no Win32")) return { pass: true };
      return { pass: false, detail: "PITFALL-1 literal 'script-based only' / 'no Win32' not found" };
    }
  },
  {
    id: 21, name: "V-50-21: 03-compliance-policy.md PITFALL-2 architectural callout",
    run() {
      const c = readFile(ADMIN_COMPLIANCE);
      if (c === null) return { pass: false, detail: "File missing" };
      if (!c.includes("Require device to be marked as compliant")) {
        return { pass: false, detail: "PITFALL-2: literal 'Require device to be marked as compliant' not found" };
      }
      if (!/not available|not supported/i.test(c)) {
        return { pass: false, detail: "PITFALL-2: qualifier 'not available' / 'not supported' not found" };
      }
      return { pass: true };
    }
  },
  {
    id: 22, name: "V-50-22: 01-intune-linux-agent.md PITFALL-3 deb-vs-Snap callout",
    run() {
      const c = readFile(ADMIN_AGENT);
      if (c === null) return { pass: false, detail: "File missing" };
      if (!/Snap/i.test(c)) return { pass: false, detail: "PITFALL-3: 'Snap' not mentioned" };
      if (!/deprecated|preview/i.test(c)) return { pass: false, detail: "PITFALL-3: 'deprecated' / 'preview' applied to Snap not found" };
      return { pass: true };
    }
  },

  // === ANTI-DUPLICATION + NEGATIVE ASSERTIONS (V-50-23, V-50-24) ===
  {
    id: 23, name: "V-50-23: 00-overview.md DPO-03 back-link present + bridge H2 NOT duplicated",
    run() {
      const c = readFile(ADMIN_OVERVIEW);
      if (c === null) return { pass: false, detail: "File missing" };
      if (!c.includes(PHASE49_BRIDGE_BACKLINK)) {
        return { pass: false, detail: "DPO-03 back-link literal not found: " + PHASE49_BRIDGE_BACKLINK };
      }
      if (/^## For Admins Familiar with Windows \/ macOS \/ Android\s*$/m.test(c)) {
        return { pass: false, detail: "DPO-03 violation: bridge H2 IS duplicated in 00-overview.md (must back-link only)" };
      }
      return { pass: true };
    }
  },
  {
    id: 24, name: "V-50-24: 05-conditional-access.md has NO Device-Level CA H2 (PITFALL-2 inheritance)",
    run() {
      const c = readFile(ADMIN_CA);
      if (c === null) return { pass: false, detail: "File missing" };
      if (/^## Device-Level Conditional Access\s*$/m.test(c)) {
        return { pass: false, detail: "Found forbidden H2 '## Device-Level Conditional Access' \u2014 PITFALL-2 violation" };
      }
      return { pass: true };
    }
  },

  // === FRONTMATTER C10 (V-50-25, V-50-26) ===
  {
    id: 25, name: "V-50-25: all 7 admin files have platform: Linux + audience: admin + 60-day cycle",
    run() {
      const failures = [];
      for (const f of ADMIN_FILES) {
        const c = readFile(f);
        if (c === null) { failures.push(f + ": file missing"); continue; }
        const fmMatch = c.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/m);
        if (!fmMatch) { failures.push(f + ": no frontmatter"); continue; }
        const fm = fmMatch[1];
        const issues = [];
        if (!/^platform: Linux\s*$/m.test(fm)) issues.push("platform: Linux missing");
        if (!/^audience: admin\s*$/m.test(fm)) issues.push("audience: admin missing");
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
      if (failures.length === 0) return { pass: true, detail: ADMIN_FILES.length + " admin files valid" };
      return { pass: false, detail: failures.join(" | ") };
    }
  },
  {
    id: 26, name: "V-50-26: end-user file has platform: Linux + audience: end-user + 60-day cycle",
    run() {
      const c = readFile(ENDUSER_FILE);
      if (c === null) return { pass: false, detail: "File missing" };
      const fmMatch = c.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/m);
      if (!fmMatch) return { pass: false, detail: "no frontmatter" };
      const fm = fmMatch[1];
      const issues = [];
      if (!/^platform: Linux\s*$/m.test(fm)) issues.push("platform: Linux missing");
      if (!/^audience: end-user\s*$/m.test(fm)) issues.push("audience: end-user missing");
      const lvMatch = fm.match(/^last_verified: (\d{4}-\d{2}-\d{2})\s*$/m);
      const rbMatch = fm.match(/^review_by: (\d{4}-\d{2}-\d{2})\s*$/m);
      if (!lvMatch) issues.push("last_verified missing/invalid");
      if (!rbMatch) issues.push("review_by missing/invalid");
      if (lvMatch && rbMatch) {
        const lv = new Date(lvMatch[1]), rb = new Date(rbMatch[1]);
        const days = (rb - lv) / (1000 * 60 * 60 * 24);
        if (days > 60) issues.push("review_by > 60 days after last_verified (was " + Math.round(days) + ")");
      }
      if (issues.length === 0) return { pass: true };
      return { pass: false, detail: issues.join("; ") };
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
