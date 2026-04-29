#!/usr/bin/env node
// Phase 56 static validation harness
// Source of truth: .planning/phases/56-drift-detection-tenant-migration/56-CONTEXT.md
// NO SHELL: all file content via fs.readFileSync; no shared module; no external tools
// Implements 32 checks (V-56-01 through V-56-32)
// Lineage: Phase 48 D-25 (validator-as-deliverable) → Phase 49 D-26 → Phase 50 D-25
//          → Phase 51 D-20 → Phase 52 D-11 → Phase 53 D-11 → Phase 54 D-17/D-18
//          → Phase 55 D-17/D-18 → Phase 56 D-18/D-19

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8');
}

// D-21: Pinned anchor strings — same-commit validator update required on any rename.
const OV   = "docs/operations/drift-migration/00-overview.md";
const WIN  = "docs/operations/drift-migration/01-windows-drift-detection.md";
const MAC  = "docs/operations/drift-migration/02-macos-drift-detection.md";
const IOS_AND_ = "docs/operations/drift-migration/03-ios-android-drift-detection.md";
const RUNBOOK = "docs/operations/drift-migration/04-tenant-migration-runbook.md";
const V12_DRIFT_DETECTION = "docs/reference/drift-detection.md";
const V12_TENANT_MIG = "docs/device-operations/04-tenant-migration.md";
const OPS_INDEX = "docs/operations/00-index.md";
const VAL  = "scripts/validation/check-phase-56.mjs";

const DRIFT_FILES = [OV, WIN, MAC, IOS_AND_, RUNBOOK];

const checks = [
  // === FILE EXISTENCE (V-56-01..06) ===
  {
    id: 1, name: "V-56-01: 00-overview.md exists",
    run() {
      const c = readFile(OV);
      if (c === null) return { pass: false, detail: "File missing: " + OV };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 2, name: "V-56-02: 01-windows-drift-detection.md exists",
    run() {
      const c = readFile(WIN);
      if (c === null) return { pass: false, detail: "File missing: " + WIN };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 3, name: "V-56-03: 02-macos-drift-detection.md exists",
    run() {
      const c = readFile(MAC);
      if (c === null) return { pass: false, detail: "File missing: " + MAC };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 4, name: "V-56-04: 03-ios-android-drift-detection.md exists",
    run() {
      const c = readFile(IOS_AND_);
      if (c === null) return { pass: false, detail: "File missing: " + IOS_AND_ };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 5, name: "V-56-05: 04-tenant-migration-runbook.md exists",
    run() {
      const c = readFile(RUNBOOK);
      if (c === null) return { pass: false, detail: "File missing: " + RUNBOOK };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 6, name: "V-56-06: check-phase-56.mjs exists (self-referential)",
    run() {
      const c = readFile(VAL);
      if (c === null) return { pass: false, detail: "File missing: " + VAL };
      return { pass: true, detail: c.length + " bytes" };
    }
  },

  // === FRONTMATTER (V-56-07..08) ===
  {
    id: 7, name: "V-56-07: all 5 drift-migration files have valid platform: + audience: + 60-day cycle",
    run() {
      const failures = [];
      const expectedPlatform = {
        [OV]:      /^platform:\s*cross-platform\s*$/m,
        [WIN]:     /^platform:\s*Windows\s*$/m,
        [MAC]:     /^platform:\s*macOS\s*$/m,
        [IOS_AND_]: /^platform:\s*iOS,?\s*Android\s*$/m,
        [RUNBOOK]: /^platform:\s*cross-platform\s*$/m
      };
      for (const f of DRIFT_FILES) {
        const c = readFile(f);
        if (c === null) { failures.push(f + ": file missing"); continue; }
        const fmMatch = c.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/m);
        if (!fmMatch) { failures.push(f + ": no frontmatter"); continue; }
        const fm = fmMatch[1];
        const issues = [];
        if (!expectedPlatform[f].test(fm)) issues.push("platform mismatch");
        if (!/^audience:\s*\S+/m.test(fm)) issues.push("audience field missing/empty");
        const lvMatch = fm.match(/^last_verified:\s*(\d{4}-\d{2}-\d{2})\s*$/m);
        const rbMatch = fm.match(/^review_by:\s*(\d{4}-\d{2}-\d{2})\s*$/m);
        if (!lvMatch) issues.push("last_verified missing/invalid");
        if (!rbMatch) issues.push("review_by missing/invalid");
        if (lvMatch && rbMatch) {
          const lv = new Date(lvMatch[1]), rb = new Date(rbMatch[1]);
          const days = (rb - lv) / (1000 * 60 * 60 * 24);
          if (days > 60) issues.push("review_by > 60 days after last_verified (was " + Math.round(days) + ")");
        }
        if (issues.length > 0) failures.push(f + ": " + issues.join("; "));
      }
      if (failures.length === 0) return { pass: true, detail: DRIFT_FILES.length + " files valid" };
      return { pass: false, detail: failures.join(" | ") };
    }
  },
  {
    id: 8, name: "V-56-08: 04-tenant-migration-runbook frontmatter has confidence: MEDIUM (new field; this file only)",
    run() {
      const c = readFile(RUNBOOK);
      if (c === null) return { pass: false, detail: "File missing: " + RUNBOOK };
      const fmMatch = c.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/m);
      if (!fmMatch) return { pass: false, detail: "no frontmatter" };
      const fm = fmMatch[1];
      if (!/^confidence:\s*MEDIUM\s*$/m.test(fm)) {
        return { pass: false, detail: "confidence: MEDIUM frontmatter field missing on RUNBOOK" };
      }
      // Verify other 4 files do NOT carry this field (firewall — confidence exclusive to RUNBOOK)
      const others = [OV, WIN, MAC, IOS_AND_];
      const violations = [];
      for (const f of others) {
        const oc = readFile(f);
        if (oc === null) continue;
        const ofm = oc.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/m);
        if (ofm && /^confidence:/m.test(ofm[1])) violations.push(f + ": has confidence: field (should be RUNBOOK-only)");
      }
      if (violations.length > 0) return { pass: false, detail: violations.join(" | ") };
      return { pass: true, detail: "confidence: MEDIUM present on RUNBOOK; absent on other 4 files" };
    }
  },

  // === 00-OVERVIEW: COMPARISON TABLE + TERMINOLOGY H2 + ANTI-SCOPE-CREEP (V-56-09..11) ===
  {
    id: 9, name: "V-56-09: 00-overview has 4-platform comparison table (Windows + macOS + iOS + Android)",
    run() {
      const c = readFile(OV);
      if (c === null) return { pass: false, detail: "File missing: " + OV };
      // Either a single header row containing all 4 platforms (any order; iOS or iOS/iPadOS), OR transposed
      const hasAllFourInRow =
        /\|[^\n]*\bWindows\b[^\n]*\bmacOS\b[^\n]*\biOS\b[^\n]*\bAndroid\b[^\n]*\|/.test(c) ||
        /\|[^\n]*\bWindows\b[^\n]*\bmacOS\b[^\n]*\biOS\/iPadOS\b[^\n]*\bAndroid\b[^\n]*\|/.test(c) ||
        /\|[^\n]*\bAndroid\b[^\n]*\biOS\b[^\n]*\bmacOS\b[^\n]*\bWindows\b[^\n]*\|/.test(c);
      // Transposed: 4 separate rows each starting with one platform name
      const transposed = ["Windows", "macOS", "iOS", "Android"].every(p =>
        new RegExp("^\\|\\s*\\*?\\*?" + p + "\\*?\\*?\\s*\\|", "m").test(c));
      if (!hasAllFourInRow && !transposed)
        return { pass: false, detail: "4-platform comparison table not found (neither row-headers nor column-headers form)" };
      return { pass: true, detail: "4-platform comparison table found" };
    }
  },
  {
    id: 10, name: "V-56-10: 00-overview has ## Drift terminology H2 + ≥3 cross-platform terminology tokens within ~30 lines",
    run() {
      const c = readFile(OV);
      if (c === null) return { pass: false, detail: "File missing: " + OV };
      const h2Match = c.match(/^## Drift terminology(\s+\{#[a-z0-9-]+\})?\s*$/m);
      if (!h2Match) return { pass: false, detail: "## Drift terminology H2 missing" };
      const h2Idx = c.indexOf(h2Match[0]);
      const window = c.slice(h2Idx, h2Idx + 3000);  // ~30 lines = ~3000 bytes
      // Accept any 3+ from these cross-platform-only terminology tokens
      const candidates = [
        "compliance", "policy conflict", "attestation", "revocation",
        "verdict", "regression", "downgrade", "jailbreak", "drift", "signal"
      ];
      const present = candidates.filter(tok => new RegExp("\\b" + tok + "\\b", "i").test(window));
      if (present.length < 3) return { pass: false, detail: "Need ≥3 cross-platform terminology tokens within ~30 lines of H2; found " + present.length + ": " + present.join(", ") };
      return { pass: true, detail: "Drift terminology H2 + " + present.length + " tokens present" };
    }
  },
  {
    id: 11, name: "V-56-11: 00-overview body prose does NOT contain anti-scope-creep tokens (REQ traceability firewall)",
    run() {
      const c = readFile(OV);
      if (c === null) return { pass: false, detail: "File missing: " + OV };
      // Strip frontmatter, table rows (lines starting with `|`), code blocks, markdown links
      const stripped = c
        .replace(/^---\n[\s\S]*?\n---\n/, '')
        .replace(/^\|.*$/gm, '')               // strip table rows
        .replace(/```[\s\S]*?```/g, '')        // strip code blocks
        .replace(/`[^`\n]*`/g, '')             // strip inline code
        .replace(/\[[^\]]*\]\([^)]*\)/g, '');  // strip markdown links
      const forbidden = [
        "supersedence", "Win32ContentPrepTool", "BitLocker re-key", "ABM token",
        "MGP re-binding", "exit 1", "exit 0", "Log Analytics", "Quest On Demand Migration"
      ];
      const violations = forbidden.filter(tok => new RegExp(tok).test(stripped));
      if (violations.length > 0) return { pass: false, detail: "Anti-scope-creep tokens found in body prose: " + violations.join(", ") };
      return { pass: true, detail: "REQ traceability firewall holds (zero forbidden tokens in body prose)" };
    }
  },

  // === 01-WINDOWS: PORTAL PATH + STATUS REPORTS + CANONICAL H2 (V-56-12..14) ===
  {
    id: 12, name: "V-56-12: 01-windows-drift-detection has Intune Remediations portal path literal verbatim",
    run() {
      const c = readFile(WIN);
      if (c === null) return { pass: false, detail: "File missing: " + WIN };
      const literal = "Devices > Manage devices > Scripts and remediations > Remediation scripts";
      if (!c.includes(literal)) return { pass: false, detail: "portal path literal missing: " + literal };
      return { pass: true, detail: "portal path literal present" };
    }
  },
  {
    id: 13, name: "V-56-13: 01-windows-drift-detection has all 3 status report literals (No issues detected / Issues fixed / Error)",
    run() {
      const c = readFile(WIN);
      if (c === null) return { pass: false, detail: "File missing: " + WIN };
      const missing = [];
      if (!c.includes("No issues detected")) missing.push("No issues detected");
      if (!c.includes("Issues fixed")) missing.push("Issues fixed");
      if (!/\bError\b/.test(c)) missing.push("Error");
      if (missing.length > 0) return { pass: false, detail: "status report literals missing: " + missing.join(", ") };
      return { pass: true, detail: "all 3 status report literals present" };
    }
  },
  {
    id: 14, name: "V-56-14: 01-windows-drift-detection has ## Canonical script-authoring pattern H2 + exit 1 + exit 0 + Log Analytics",
    run() {
      const c = readFile(WIN);
      if (c === null) return { pass: false, detail: "File missing: " + WIN };
      const h2Match = c.match(/^## Canonical script-authoring pattern(\s+\{#[a-z0-9-]+\})?\s*$/m);
      if (!h2Match) return { pass: false, detail: "## Canonical script-authoring pattern H2 missing" };
      const required = ["exit 1", "exit 0", "Log Analytics"];
      const missing = required.filter(s => !c.includes(s));
      if (missing.length > 0) return { pass: false, detail: "tokens missing: " + missing.join(", ") };
      return { pass: true, detail: "Canonical script-authoring pattern H2 + exit codes + Log Analytics all present" };
    }
  },

  // === 00-OVERVIEW: CROSS-PLATFORM SIGNAL COVERAGE (V-56-15) ===
  {
    id: 15, name: "V-56-15: 00-overview body contains all 6 cross-platform signal tokens",
    run() {
      const c = readFile(OV);
      if (c === null) return { pass: false, detail: "File missing: " + OV };
      const signals = [
        "policy conflict", "app install regression", "profile revocation",
        "jailbreak detection", "OS downgrade", "Play Integrity verdict"
      ];
      const missing = signals.filter(s => !c.includes(s));
      if (missing.length > 0) return { pass: false, detail: "DRIFT-03 signal tokens missing: " + missing.join(", ") };
      return { pass: true, detail: "all 6 cross-platform signal tokens present" };
    }
  },

  // === 04-RUNBOOK: DRIFT-04 BITLOCKER + DEREG/RE-REG + ESCROW (V-56-16..17) ===
  {
    id: 16, name: "V-56-16: 04-tenant-migration-runbook has BitLocker 3-option literals (source-tenant escrow + decrypt + re-encrypt + Quest/third-party)",
    run() {
      const c = readFile(RUNBOOK);
      if (c === null) return { pass: false, detail: "File missing: " + RUNBOOK };
      const required = ["source-tenant escrow", "decrypt", "re-encrypt"];
      const missing = required.filter(s => !c.includes(s));
      if (missing.length > 0) return { pass: false, detail: "BitLocker 3-option literals missing: " + missing.join(", ") };
      if (!c.includes("Quest On Demand Migration") && !c.includes("third-party tool"))
        return { pass: false, detail: "neither 'Quest On Demand Migration' nor 'third-party tool' present (option c)" };
      return { pass: true, detail: "BitLocker 3-option literals present" };
    }
  },
  {
    id: 17, name: "V-56-17: 04-tenant-migration-runbook has deregistration + re-registration + escrow validation/verification",
    run() {
      const c = readFile(RUNBOOK);
      if (c === null) return { pass: false, detail: "File missing: " + RUNBOOK };
      if (!c.includes("deregistration")) return { pass: false, detail: "'deregistration' missing" };
      if (!c.includes("re-registration")) return { pass: false, detail: "'re-registration' missing" };
      if (!c.includes("escrow validation") && !c.includes("escrow verification"))
        return { pass: false, detail: "neither 'escrow validation' nor 'escrow verification' present" };
      return { pass: true, detail: "DRIFT-04 dereg + escrow validation tokens present" };
    }
  },

  // === 04-RUNBOOK: DRIFT-05 ABM + WIPE/RE-ENROLL (V-56-18..19) ===
  {
    id: 18, name: "V-56-18: 04-tenant-migration-runbook has ABM token + release + re-assign + Await-Configuration",
    run() {
      const c = readFile(RUNBOOK);
      if (c === null) return { pass: false, detail: "File missing: " + RUNBOOK };
      const required = ["ABM token", "release", "re-assign", "Await-Configuration"];
      const missing = required.filter(s => !c.includes(s));
      if (missing.length > 0) return { pass: false, detail: "DRIFT-05 tokens missing: " + missing.join(", ") };
      return { pass: true, detail: "DRIFT-05 ABM tokens present" };
    }
  },
  {
    id: 19, name: "V-56-19: 04-tenant-migration-runbook macOS/iOS H2 scope has wipe + re-enrollment",
    run() {
      const c = readFile(RUNBOOK);
      if (c === null) return { pass: false, detail: "File missing: " + RUNBOOK };
      // Accept either combined `## macOS / iOS tenant migration` OR split forms per CONTEXT D-04
      let h2Idx = -1;
      const combined = c.match(/^## macOS\s*\/\s*iOS tenant migration/m);
      const macOnly = c.match(/^## macOS tenant migration/m);
      if (combined) h2Idx = c.indexOf(combined[0]);
      else if (macOnly) h2Idx = c.indexOf(macOnly[0]);
      if (h2Idx < 0) return { pass: false, detail: "macOS/iOS tenant migration H2 missing (neither combined nor split form found)" };
      // Window from this H2 to the next ## H2 of a different platform or Cross-platform section
      const after = c.slice(h2Idx + 5);
      const nextH2 = after.search(/^## (Android tenant migration|Cross-platform encryption drift)/m);
      const window = nextH2 > 0 ? c.slice(h2Idx, h2Idx + 5 + nextH2) : c.slice(h2Idx);
      if (!window.includes("wipe")) return { pass: false, detail: "'wipe' missing in macOS/iOS H2 scope" };
      if (!window.includes("re-enrollment")) return { pass: false, detail: "'re-enrollment' missing in macOS/iOS H2 scope" };
      return { pass: true, detail: "wipe + re-enrollment present in macOS/iOS H2 scope" };
    }
  },

  // === 04-RUNBOOK: DRIFT-06 MGP RE-BINDING + PER-OWNERSHIP-MODE (V-56-20..21) ===
  {
    id: 20, name: "V-56-20: 04-tenant-migration-runbook has disconnect + bind new + re-approve + re-provision (MGP re-binding sequence)",
    run() {
      const c = readFile(RUNBOOK);
      if (c === null) return { pass: false, detail: "File missing: " + RUNBOOK };
      const required = ["disconnect", "bind new", "re-approve", "re-provision"];
      const missing = required.filter(s => !c.includes(s));
      if (missing.length > 0) return { pass: false, detail: "DRIFT-06 MGP tokens missing: " + missing.join(", ") };
      return { pass: true, detail: "DRIFT-06 MGP re-binding sequence tokens present" };
    }
  },
  {
    id: 21, name: "V-56-21: 04-tenant-migration-runbook Android H2 scope has factory reset + work profile re-creation + ZT portal re-upload",
    run() {
      const c = readFile(RUNBOOK);
      if (c === null) return { pass: false, detail: "File missing: " + RUNBOOK };
      const h2Match = c.match(/^## Android tenant migration/m);
      if (!h2Match) return { pass: false, detail: "## Android tenant migration H2 missing" };
      const h2Idx = c.indexOf(h2Match[0]);
      const after = c.slice(h2Idx + 5);
      const nextH2 = after.search(/^## /m);
      const window = nextH2 > 0 ? c.slice(h2Idx, h2Idx + 5 + nextH2) : c.slice(h2Idx);
      if (!window.includes("factory reset")) return { pass: false, detail: "'factory reset' missing in Android H2 scope" };
      if (!window.includes("work profile re-creation")) return { pass: false, detail: "'work profile re-creation' missing in Android H2 scope" };
      if (!window.includes("ZT portal re-upload")) return { pass: false, detail: "'ZT portal re-upload' missing in Android H2 scope" };
      return { pass: true, detail: "factory reset + work profile re-creation + ZT portal re-upload all present in Android H2 scope" };
    }
  },

  // === 04-RUNBOOK: DRIFT-07 FOLD H2 + 4-PLATFORM ENCRYPTION (V-56-22..23) ===
  {
    id: 22, name: "V-56-22: 04-tenant-migration-runbook has ## Cross-platform encryption drift H2 (LOCKED literal pin)",
    run() {
      const c = readFile(RUNBOOK);
      if (c === null) return { pass: false, detail: "File missing: " + RUNBOOK };
      if (!/^## Cross-platform encryption drift(\s+\{#[a-z0-9-]+\})?\s*$/m.test(c))
        return { pass: false, detail: "## Cross-platform encryption drift H2 missing (LOCKED literal pin per V-56-22)" };
      return { pass: true, detail: "## Cross-platform encryption drift H2 present" };
    }
  },
  {
    id: 23, name: "V-56-23: 04-tenant-migration-runbook DRIFT-07 H2 scope has BitLocker + FileVault + (iOS device-level OR iOS encryption) + dm-crypt",
    run() {
      const c = readFile(RUNBOOK);
      if (c === null) return { pass: false, detail: "File missing: " + RUNBOOK };
      const h2Match = c.match(/^## Cross-platform encryption drift/m);
      if (!h2Match) return { pass: false, detail: "## Cross-platform encryption drift H2 missing" };
      const h2Idx = c.indexOf(h2Match[0]);
      const after = c.slice(h2Idx + 5);
      const nextH2 = after.search(/^## /m);
      const window = nextH2 > 0 ? c.slice(h2Idx, h2Idx + 5 + nextH2) : c.slice(h2Idx);
      if (!window.includes("BitLocker")) return { pass: false, detail: "'BitLocker' missing in DRIFT-07 H2 scope" };
      if (!window.includes("FileVault")) return { pass: false, detail: "'FileVault' missing in DRIFT-07 H2 scope" };
      if (!window.includes("iOS device-level") && !window.includes("iOS encryption"))
        return { pass: false, detail: "neither 'iOS device-level' nor 'iOS encryption' present in DRIFT-07 H2 scope" };
      if (!window.includes("dm-crypt")) return { pass: false, detail: "'dm-crypt' missing in DRIFT-07 H2 scope" };
      return { pass: true, detail: "DRIFT-07 4-platform encryption coverage tokens present in H2 scope" };
    }
  },

  // === 04-RUNBOOK: MEDIUM-CONFIDENCE INLINE BLOCKQUOTE (V-56-24) ===
  {
    id: 24, name: "V-56-24: 04-tenant-migration-runbook has > ⚠️ MEDIUM confidence blockquote within first 50 body lines",
    run() {
      const c = readFile(RUNBOOK);
      if (c === null) return { pass: false, detail: "File missing: " + RUNBOOK };
      const body = c.replace(/^---\n[\s\S]*?\n---\n/, '');
      const first50 = body.split('\n').slice(0, 50).join('\n');
      if (!/^>\s*\u26a0\ufe0f?\s*\*\*MEDIUM confidence/m.test(first50))
        return { pass: false, detail: "> ⚠️ **MEDIUM confidence blockquote missing in first 50 body lines (warning shape required; per V-56-24 + D-11)" };
      return { pass: true, detail: "MEDIUM-confidence inline blockquote present" };
    }
  },

  // === CROSS-LINKS TO V1.2 DOCS (V-56-25..26) ===
  {
    id: 25, name: "V-56-25: 01-windows-drift-detection contains cross-link to ../../reference/drift-detection.md (v1.2 SSoT)",
    run() {
      const c = readFile(WIN);
      if (c === null) return { pass: false, detail: "File missing: " + WIN };
      if (!c.includes("../../reference/drift-detection.md"))
        return { pass: false, detail: "Cross-link `../../reference/drift-detection.md` missing" };
      const targetContent = readFile(V12_DRIFT_DETECTION);
      if (targetContent === null) return { pass: false, detail: "Cross-link target file missing: " + V12_DRIFT_DETECTION };
      return { pass: true, detail: "cross-link to v1.2 drift-detection.md present + target reachable" };
    }
  },
  {
    id: 26, name: "V-56-26: 04-tenant-migration-runbook contains cross-link to ../../device-operations/04-tenant-migration.md (v1.2 SSoT)",
    run() {
      const c = readFile(RUNBOOK);
      if (c === null) return { pass: false, detail: "File missing: " + RUNBOOK };
      if (!c.includes("../../device-operations/04-tenant-migration.md"))
        return { pass: false, detail: "Cross-link `../../device-operations/04-tenant-migration.md` missing" };
      const targetContent = readFile(V12_TENANT_MIG);
      if (targetContent === null) return { pass: false, detail: "Cross-link target file missing: " + V12_TENANT_MIG };
      return { pass: true, detail: "cross-link to v1.2 tenant-migration.md present + target reachable" };
    }
  },

  // === SHARED PATTERNS: INLINE BLOCKQUOTE + BARE-PLATFORM NEGATIVE (V-56-27..28) ===
  {
    id: 27, name: "V-56-27: all 5 drift-migration files have > **Platform applicability:** blockquote within first 50 lines of body (post-frontmatter)",
    run() {
      const failures = [];
      for (const f of DRIFT_FILES) {
        const c = readFile(f);
        if (c === null) { failures.push(f + ": file missing"); continue; }
        // Strip frontmatter
        const body = c.replace(/^---\n[\s\S]*?\n---\n/, '');
        const first50 = body.split('\n').slice(0, 50).join('\n');
        if (!/^>\s*\*\*Platform applicability:\*\*/m.test(first50))
          failures.push(f + ": > **Platform applicability:** blockquote missing in first 50 body lines");
      }
      if (failures.length === 0) return { pass: true, detail: "all 5 files have inline blockquote at TOP" };
      return { pass: false, detail: failures.join(" | ") };
    }
  },
  {
    id: 28, name: "V-56-28: corpus-wide NEGATIVE — zero bare > **Platform:** tokens (lexicon-family preservation per Phase 54 D-17 inheritance)",
    run() {
      // Per Phase 54 D-17 inheritance: check entire docs/ + .planning/ tree.
      // Recursive readdirSync walk per Phase 48 D-25 file-reads-only pattern.
      function walkMd(dir, acc) {
        let entries;
        try { entries = readdirSync(dir, { withFileTypes: true }); }
        catch (e) { return acc; }
        for (const ent of entries) {
          const full = join(dir, ent.name);
          if (ent.isDirectory()) {
            if (ent.name === 'node_modules' || ent.name.startsWith('.git')) continue;
            walkMd(full, acc);
          } else if (ent.isFile() && ent.name.endsWith('.md')) {
            acc.push(full);
          }
        }
        return acc;
      }
      const roots = ['docs', '.planning'];
      const failures = [];
      let scanned = 0;
      for (const root of roots) {
        const absRoot = join(process.cwd(), root);
        const files = walkMd(absRoot, []);
        for (const abs of files) {
          scanned++;
          let c;
          try { c = readFileSync(abs, 'utf8'); } catch (e) { continue; }
          // Strip fenced code blocks (where the FORBIDDEN form is documented as an example)
          const stripped = c.replace(/```[\s\S]*?```/g, '');
          // Strip inline code
          const stripped2 = stripped.replace(/`[^`\n]*`/g, '');
          // Look only for line-start blockquote bare-noun token (no qualifier word)
          const matches = stripped2.match(/^> \*\*Platform:\*\*/gm);
          if (matches && matches.length > 0) {
            const rel = abs.slice(process.cwd().length + 1).replace(/\\/g, '/');
            failures.push(rel + ": " + matches.length + " bare '> **Platform:**' token(s) found (forbidden)");
          }
        }
      }
      if (failures.length === 0) return { pass: true, detail: "no bare '> **Platform:**' tokens across " + scanned + " .md files in docs/ + .planning/" };
      return { pass: false, detail: failures.join(" | ") };
    }
  },

  // === REGRESSION GUARDS (V-56-29..31) ===
  {
    id: 29, name: "V-56-29: ops/00-index.md does NOT contain ## Drift Detection or ## Tenant Migration H2 (Phase 56 cross-references only; Phase 59 owns hub integration)",
    run() {
      const c = readFile(OPS_INDEX);
      if (c === null) return { pass: false, detail: "File missing: " + OPS_INDEX };
      if (/^## Drift Detection\s*$/m.test(c) || /^## Tenant Migration\s*$/m.test(c))
        return { pass: false, detail: "## Drift Detection or ## Tenant Migration H2 found in ops/00-index.md — Phase 56 must NOT amend per DPO-Phase53-01 + DPO-Phase54-02 + DPO-Phase55-01 + V-56-29" };
      return { pass: true, detail: "ops/00-index.md not amended (Phase 59 owns hub integration)" };
    }
  },
  {
    id: 30, name: "V-56-30: NEGATIVE — no sibling 05-cross-platform-encryption-drift.md file (DRIFT-07 fold-discipline regression-guard)",
    run() {
      const sibling = "docs/operations/drift-migration/05-cross-platform-encryption-drift.md";
      if (existsSync(join(process.cwd(), sibling))) {
        return { pass: false, detail: "sibling file exists: " + sibling + " (DRIFT-07 MUST be folded into 04-tenant-migration-runbook.md per CONTEXT D-04 + ROADMAP SC#5)" };
      }
      return { pass: true, detail: "no sibling 05-encryption file (DRIFT-07 properly folded into runbook)" };
    }
  },
  {
    id: 31, name: "V-56-31: POSITIVE — v1.2 cross-link target docs exist at file-system level (anti-deletion regression-guard)",
    run() {
      const failures = [];
      if (!existsSync(join(process.cwd(), V12_DRIFT_DETECTION))) failures.push(V12_DRIFT_DETECTION + " missing");
      if (!existsSync(join(process.cwd(), V12_TENANT_MIG))) failures.push(V12_TENANT_MIG + " missing");
      if (failures.length > 0) return { pass: false, detail: "v1.2 docs deleted: " + failures.join("; ") };
      return { pass: true, detail: "v1.2 cross-link target docs both exist" };
    }
  },

  // === TBD SCAN (V-56-32) ===
  {
    id: 32, name: "V-56-32: NEGATIVE — no TBD/TODO/FIXME/XXX/PLACEHOLDER tokens in any of 5 drift-migration files",
    run() {
      const failures = [];
      const banned = /\b(TBD|TODO|FIXME|XXX|PLACEHOLDER)\b/;
      for (const f of DRIFT_FILES) {
        const c = readFile(f);
        if (c === null) { failures.push(f + ": file missing"); continue; }
        // Strip Version History + Changelog sections (legitimate references to past placeholder text)
        // and code blocks (where these tokens may legitimately appear)
        const stripped = c
          .replace(/```[\s\S]*?```/g, '')
          .replace(/^## Version History[\s\S]*$/m, '')
          .replace(/^## Changelog[\s\S]*$/m, '');
        const m = stripped.match(banned);
        if (m) failures.push(f + ": found '" + m[1] + "'");
      }
      if (failures.length === 0) return { pass: true, detail: "no TBD/TODO/FIXME/XXX/PLACEHOLDER tokens in 5 files" };
      return { pass: false, detail: failures.join(" | ") };
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
