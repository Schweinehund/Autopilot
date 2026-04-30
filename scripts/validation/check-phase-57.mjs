#!/usr/bin/env node
// Phase 57 static validation harness
// Source of truth: .planning/phases/57-defer-07-android-nav-unification/57-CONTEXT.md
// NO SHELL: all file content via fs.readFileSync; no shared module; no external tools
// Implements 26 checks (V-57-01 through V-57-26)
// Lineage: Phase 48 D-25 (validator-as-deliverable) → Phase 49 D-26 → Phase 50 D-25
//          → Phase 51 D-20 → Phase 52 D-11 → Phase 53 D-11 → Phase 54 D-17/D-18
//          → Phase 55 D-17/D-18 → Phase 56 D-18/D-19 → Phase 57 D-29/D-30

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

// D-33: Pinned anchor strings — same-commit validator update required on any rename.
const INDEX_MD = "docs/index.md";
const COMMON_MD = "docs/common-issues.md";
const QR_L1 = "docs/quick-ref-l1.md";
const QR_L2 = "docs/quick-ref-l2.md";
const L1_INDEX = "docs/l1-runbooks/00-index.md";
const VAL = "scripts/validation/check-phase-57.mjs";
const PHASE54_SSOT = "docs/operations/patch-management/04-android-patch-delivery.md";
const HUB_FILES = [INDEX_MD, COMMON_MD, QR_L1, QR_L2];

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

const checks = [
  // === FILE EXISTENCE (V-57-01..04) ===
  {
    id: 1, name: "V-57-01: docs/index.md exists",
    run() {
      const c = readFile(INDEX_MD);
      if (c === null) return { pass: false, detail: "File missing: " + INDEX_MD };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 2, name: "V-57-02: docs/common-issues.md exists",
    run() {
      const c = readFile(COMMON_MD);
      if (c === null) return { pass: false, detail: "File missing: " + COMMON_MD };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 3, name: "V-57-03: docs/quick-ref-l1.md exists",
    run() {
      const c = readFile(QR_L1);
      if (c === null) return { pass: false, detail: "File missing: " + QR_L1 };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 4, name: "V-57-04: docs/quick-ref-l2.md AND docs/l1-runbooks/00-index.md exist",
    run() {
      const failures = [];
      for (const f of [QR_L2, L1_INDEX]) {
        if (readFile(f) === null) failures.push("File missing: " + f);
      }
      if (failures.length) return { pass: false, detail: failures.join(" | ") };
      return { pass: true, detail: "both files present" };
    }
  },

  // === V-57-05: docs/index.md Android H2 expansion (3 sub-H3s) ===
  {
    id: 5, name: "V-57-05: docs/index.md Android H2 contains 3 sub-H3s",
    run() {
      const c = readFile(INDEX_MD);
      if (c === null) return { pass: false, detail: "File missing: " + INDEX_MD };
      const region = sliceH2Region(c, "## Android Enterprise Provisioning");
      if (!region) return { pass: false, detail: "## Android Enterprise Provisioning H2 missing" };
      const subH3s = ["### Service Desk (L1)", "### Desktop Engineering (L2)", "### Admin Setup"];
      const missing = subH3s.filter(h => !region.includes(h));
      if (missing.length) return { pass: false, detail: "Missing sub-H3s: " + missing.join(", ") };
      return { pass: true, detail: "all 3 sub-H3s present in Android H2 region" };
    }
  },

  // === V-57-06: docs/index.md Android sub-table row counts (L1=4, L2=4, Admin=3) ===
  {
    id: 6, name: "V-57-06: docs/index.md Android sub-table row counts (L1=4, L2=4, Admin=3)",
    run() {
      const c = readFile(INDEX_MD);
      if (c === null) return { pass: false, detail: "File missing: " + INDEX_MD };
      const region = sliceH2Region(c, "## Android Enterprise Provisioning");
      if (!region) return { pass: false, detail: "## Android Enterprise Provisioning H2 missing" };
      // For each sub-H3, slice to next ### or end of region; count `| [` table-row prefix lines
      const subSections = [
        ["### Service Desk (L1)", 4],
        ["### Desktop Engineering (L2)", 4],
        ["### Admin Setup", 3]
      ];
      const failures = [];
      for (const [h3, expected] of subSections) {
        const idx = region.indexOf(h3);
        if (idx < 0) { failures.push(h3 + ": missing"); continue; }
        const after = region.slice(idx + h3.length);
        const nextH3 = after.search(/^### /m);
        const window = nextH3 > 0 ? after.slice(0, nextH3) : after;
        // Count rows starting with `| [` (excluding header row `| Resource | When to Use |` and separator `|----...`)
        const rows = (window.match(/^\| \[/gm) || []).length;
        if (rows !== expected) failures.push(h3 + ": expected " + expected + " rows, got " + rows);
      }
      if (failures.length) return { pass: false, detail: failures.join(" | ") };
      return { pass: true, detail: "L1=4, L2=4, Admin=3 row counts correct" };
    }
  },

  // === V-57-07: docs/index.md Cross-Platform References Android entries ===
  {
    id: 7, name: "V-57-07: docs/index.md Cross-Platform References has Android entries",
    run() {
      const c = readFile(INDEX_MD);
      if (c === null) return { pass: false, detail: "File missing: " + INDEX_MD };
      const region = sliceH2Region(c, "## Cross-Platform References");
      if (!region) return { pass: false, detail: "## Cross-Platform References H2 missing" };
      const tokens = [
        "Android Provisioning Lifecycle",
        "Android Capability Matrix",
        "android-lifecycle/00-enrollment-overview.md",
        "reference/android-capability-matrix.md"
      ];
      const missing = tokens.filter(t => !region.includes(t));
      if (missing.length) return { pass: false, detail: "Missing tokens: " + missing.join(", ") };
      return { pass: true, detail: "all 4 Android Cross-Platform References tokens present" };
    }
  },

  // === V-57-08: common-issues.md Android H2 anchor pin ===
  {
    id: 8, name: "V-57-08: common-issues.md has '## Android Enterprise Failure Scenarios' H2",
    run() {
      const c = readFile(COMMON_MD);
      if (c === null) return { pass: false, detail: "File missing: " + COMMON_MD };
      if (!/^## Android Enterprise Failure Scenarios\s*$/m.test(c)) {
        return { pass: false, detail: "## Android Enterprise Failure Scenarios H2 missing" };
      }
      return { pass: true, detail: "Android H2 present" };
    }
  },

  // === V-57-09: common-issues.md 8 H3 anchor pins (LOCKED per D-07) ===
  {
    id: 9, name: "V-57-09: common-issues.md has all 8 LOCKED Android H3 literals (D-07)",
    run() {
      const c = readFile(COMMON_MD);
      if (c === null) return { pass: false, detail: "File missing: " + COMMON_MD };
      const region = sliceH2Region(c, "## Android Enterprise Failure Scenarios");
      if (!region) return { pass: false, detail: "Android H2 region missing" };
      const h3s = [
        "### Android: Enrollment Blocked",
        "### Android: Work Profile Not Created",
        "### Android: Device Not Enrolled",
        "### Android: Compliance Blocked",
        "### Android: MGP App Not Installed",
        "### Android: ZTE Enrollment Failed",
        "### Android: Knox Enrollment Failed",
        "### Android: AOSP Enrollment Failed"
      ];
      const missing = h3s.filter(h => !region.includes(h));
      if (missing.length) return { pass: false, detail: "Missing H3 literals: " + missing.join(", ") };
      return { pass: true, detail: "all 8 LOCKED H3 literals present in Android H2 region" };
    }
  },

  // === V-57-10: common-issues.md section-top decision-tree banner (D-08) ===
  {
    id: 10, name: "V-57-10: common-issues.md Android H2 section-top has decision-tree banner",
    run() {
      const c = readFile(COMMON_MD);
      if (c === null) return { pass: false, detail: "File missing: " + COMMON_MD };
      const region = sliceH2Region(c, "## Android Enterprise Failure Scenarios");
      if (!region) return { pass: false, detail: "Android H2 region missing" };
      // Banner must appear before first H3
      const firstH3Idx = region.search(/^### /m);
      const preH3 = firstH3Idx > 0 ? region.slice(0, firstH3Idx) : region;
      if (!preH3.includes("decision-trees/08-android-triage.md")) {
        return { pass: false, detail: "Section-top banner with decision-trees/08-android-triage.md link missing" };
      }
      return { pass: true, detail: "section-top decision-tree banner present" };
    }
  },

  // === V-57-11: common-issues.md reciprocal disambiguation callouts (D-09) ===
  {
    id: 11, name: "V-57-11: common-issues.md reciprocal disambiguation on Device Not Enrolled + ZTE Enrollment Failed",
    run() {
      const c = readFile(COMMON_MD);
      if (c === null) return { pass: false, detail: "File missing: " + COMMON_MD };
      const region = sliceH2Region(c, "## Android Enterprise Failure Scenarios");
      if (!region) return { pass: false, detail: "Android H2 region missing" };
      const failures = [];
      // Device Not Enrolled H3 region (slice to next H3 or end of Android H2 region)
      const deviceNotEnrolledIdx = region.indexOf("### Android: Device Not Enrolled");
      if (deviceNotEnrolledIdx < 0) failures.push("Device Not Enrolled H3 missing");
      else {
        const after = region.slice(deviceNotEnrolledIdx);
        const nextH3 = after.slice(50).search(/^### /m);
        const win = nextH3 > 0 ? after.slice(0, 50 + nextH3) : after;
        if (!win.includes("reciprocal disambiguation")) failures.push("Device Not Enrolled missing 'reciprocal disambiguation'");
        if (!win.includes("22-android-enrollment-blocked.md")) failures.push("Device Not Enrolled missing 22 link");
        if (!win.includes("24-android-device-not-enrolled.md")) failures.push("Device Not Enrolled missing 24 link");
        if (!win.includes("27-android-zte-enrollment-failed.md")) failures.push("Device Not Enrolled missing 27 link");
      }
      // ZTE Enrollment Failed H3 region
      const zteIdx = region.indexOf("### Android: ZTE Enrollment Failed");
      if (zteIdx < 0) failures.push("ZTE Enrollment Failed H3 missing");
      else {
        const after = region.slice(zteIdx);
        const nextH3 = after.slice(50).search(/^### /m);
        const win = nextH3 > 0 ? after.slice(0, 50 + nextH3) : after;
        if (!win.includes("reciprocal disambiguation")) failures.push("ZTE Enrollment Failed missing 'reciprocal disambiguation'");
        if (!win.includes("28-android-knox-enrollment-failed.md")) failures.push("ZTE Enrollment Failed missing 28 (Knox) link");
      }
      if (failures.length) return { pass: false, detail: failures.join(" | ") };
      return { pass: true, detail: "both reciprocal disambiguation callouts present" };
    }
  },

  // === V-57-12: common-issues.md cross-platform iOS reciprocal banner (D-10) ===
  {
    id: 12, name: "V-57-12: common-issues.md Android: Compliance Blocked has cross-platform iOS banner",
    run() {
      const c = readFile(COMMON_MD);
      if (c === null) return { pass: false, detail: "File missing: " + COMMON_MD };
      const region = sliceH2Region(c, "## Android Enterprise Failure Scenarios");
      if (!region) return { pass: false, detail: "Android H2 region missing" };
      const idx = region.indexOf("### Android: Compliance Blocked");
      if (idx < 0) return { pass: false, detail: "Android: Compliance Blocked H3 missing" };
      const after = region.slice(idx);
      const nextH3 = after.slice(50).search(/^### /m);
      const win = nextH3 > 0 ? after.slice(0, 50 + nextH3) : after;
      if (!win.includes("#ios-compliance--access-blocked")) {
        return { pass: false, detail: "iOS reciprocal banner #ios-compliance--access-blocked missing in Android: Compliance Blocked H3" };
      }
      return { pass: true, detail: "cross-platform iOS reciprocal banner present" };
    }
  },

  // === V-57-13: common-issues.md Choose Your Platform TOC update (D-11) ===
  {
    id: 13, name: "V-57-13: common-issues.md Choose Your Platform TOC has Android entry",
    run() {
      const c = readFile(COMMON_MD);
      if (c === null) return { pass: false, detail: "File missing: " + COMMON_MD };
      if (!c.includes("[Android Enterprise Failure Scenarios](#android-enterprise-failure-scenarios)")) {
        return { pass: false, detail: "Choose Your Platform TOC Android bullet missing" };
      }
      return { pass: true, detail: "Choose Your Platform TOC includes Android Enterprise Failure Scenarios" };
    }
  },

  // === V-57-14: quick-ref-l1.md Android H2 + 4 sub-H3 anchor pins ===
  {
    id: 14, name: "V-57-14: quick-ref-l1.md Android H2 + 4 sub-H3 anchor pins",
    run() {
      const c = readFile(QR_L1);
      if (c === null) return { pass: false, detail: "File missing: " + QR_L1 };
      const region = sliceH2Region(c, "## Android Enterprise Quick Reference");
      if (!region) return { pass: false, detail: "## Android Enterprise Quick Reference H2 missing" };
      const subH3s = ["### Top Checks", "### Android Escalation Triggers", "### Android Decision Tree", "### Android Runbooks"];
      const missing = subH3s.filter(h => !region.includes(h));
      if (missing.length) return { pass: false, detail: "Missing sub-H3s: " + missing.join(", ") };
      return { pass: true, detail: "all 4 sub-H3s present in Android H2 region" };
    }
  },

  // === V-57-15: quick-ref-l1.md Mode tag literal coverage (D-14) ===
  {
    id: 15, name: "V-57-15: quick-ref-l1.md Android H2 contains all 5 LOCKED Mode tag literals",
    run() {
      const c = readFile(QR_L1);
      if (c === null) return { pass: false, detail: "File missing: " + QR_L1 };
      const region = sliceH2Region(c, "## Android Enterprise Quick Reference");
      if (!region) return { pass: false, detail: "Android H2 region missing" };
      const modes = ["[BYOD]", "[ZTE]", "[AOSP]", "[Knox]", "[All GMS]"];
      const missing = modes.filter(m => !region.includes(m));
      if (missing.length) return { pass: false, detail: "Missing Mode tags: " + missing.join(", ") };
      return { pass: true, detail: "all 5 LOCKED Mode tag literals present" };
    }
  },

  // === V-57-16: quick-ref-l1.md 8-row Runbooks list ===
  {
    id: 16, name: "V-57-16: quick-ref-l1.md Android Runbooks H3 has 8 L1 runbook links (22-29)",
    run() {
      const c = readFile(QR_L1);
      if (c === null) return { pass: false, detail: "File missing: " + QR_L1 };
      const region = sliceH2Region(c, "## Android Enterprise Quick Reference");
      if (!region) return { pass: false, detail: "Android H2 region missing" };
      const idx = region.indexOf("### Android Runbooks");
      if (idx < 0) return { pass: false, detail: "Android Runbooks H3 missing" };
      const win = region.slice(idx);
      const runbooks = [
        "22-android-enrollment-blocked.md",
        "23-android-work-profile-not-created.md",
        "24-android-device-not-enrolled.md",
        "25-android-compliance-blocked.md",
        "26-android-mgp-app-not-installed.md",
        "27-android-zte-enrollment-failed.md",
        "28-android-knox-enrollment-failed.md",
        "29-android-aosp-enrollment-failed.md"
      ];
      const missing = runbooks.filter(r => !win.includes(r));
      if (missing.length) return { pass: false, detail: "Missing runbook links: " + missing.join(", ") };
      return { pass: true, detail: "all 8 L1 runbook links (22-29) present" };
    }
  },

  // === V-57-17: quick-ref-l1.md Decision Tree single link ===
  {
    id: 17, name: "V-57-17: quick-ref-l1.md Android Decision Tree H3 has decision-trees/08 link",
    run() {
      const c = readFile(QR_L1);
      if (c === null) return { pass: false, detail: "File missing: " + QR_L1 };
      const region = sliceH2Region(c, "## Android Enterprise Quick Reference");
      if (!region) return { pass: false, detail: "Android H2 region missing" };
      const idx = region.indexOf("### Android Decision Tree");
      if (idx < 0) return { pass: false, detail: "Android Decision Tree H3 missing" };
      const after = region.slice(idx);
      const nextH3 = after.slice(50).search(/^### /m);
      const win = nextH3 > 0 ? after.slice(0, 50 + nextH3) : after;
      if (!win.includes("decision-trees/08-android-triage.md")) {
        return { pass: false, detail: "decision-trees/08-android-triage.md link missing in Android Decision Tree H3" };
      }
      return { pass: true, detail: "Android Decision Tree H3 contains triage tree link" };
    }
  },

  // === V-57-18: quick-ref-l2.md Android H2 + 4 sub-H3 anchor pins ===
  {
    id: 18, name: "V-57-18: quick-ref-l2.md Android H2 + 4 sub-H3 anchor pins",
    run() {
      const c = readFile(QR_L2);
      if (c === null) return { pass: false, detail: "File missing: " + QR_L2 };
      const region = sliceH2Region(c, "## Android Enterprise Quick Reference");
      if (!region) return { pass: false, detail: "## Android Enterprise Quick Reference H2 missing" };
      const subH3s = [
        "### Android Diagnostic Data Collection (3 methods)",
        "### Key Intune Portal Paths (Android L2)",
        "### Play Integrity Verdict Reference",
        "### Android Investigation Runbooks"
      ];
      const missing = subH3s.filter(h => !region.includes(h));
      if (missing.length) return { pass: false, detail: "Missing sub-H3s: " + missing.join(", ") };
      return { pass: true, detail: "all 4 sub-H3s present in Android H2 region" };
    }
  },

  // === V-57-19: quick-ref-l2.md 3-method literal coverage ===
  {
    id: 19, name: "V-57-19: quick-ref-l2.md 3-method H3 contains all 3 LOCKED method names",
    run() {
      const c = readFile(QR_L2);
      if (c === null) return { pass: false, detail: "File missing: " + QR_L2 };
      const region = sliceH2Region(c, "## Android Enterprise Quick Reference");
      if (!region) return { pass: false, detail: "Android H2 region missing" };
      const idx = region.indexOf("### Android Diagnostic Data Collection (3 methods)");
      if (idx < 0) return { pass: false, detail: "3-method H3 missing" };
      const after = region.slice(idx);
      const nextH3 = after.slice(60).search(/^### /m);
      const win = nextH3 > 0 ? after.slice(0, 60 + nextH3) : after;
      const methods = ["Company Portal Logs", "Microsoft Intune App Logs", "adb logcat"];
      const missing = methods.filter(m => !win.includes(m));
      if (missing.length) return { pass: false, detail: "Missing method names: " + missing.join(", ") };
      return { pass: true, detail: "all 3 LOCKED method names present" };
    }
  },

  // === V-57-20: quick-ref-l2.md Play Integrity 3 verdict tokens (D-23) ===
  {
    id: 20, name: "V-57-20: quick-ref-l2.md Play Integrity Verdict Reference H3 has 3 verdict literals",
    run() {
      const c = readFile(QR_L2);
      if (c === null) return { pass: false, detail: "File missing: " + QR_L2 };
      const region = sliceH2Region(c, "## Android Enterprise Quick Reference");
      if (!region) return { pass: false, detail: "Android H2 region missing" };
      const idx = region.indexOf("### Play Integrity Verdict Reference");
      if (idx < 0) return { pass: false, detail: "Play Integrity Verdict Reference H3 missing" };
      const after = region.slice(idx);
      const nextH3 = after.slice(50).search(/^### /m);
      const win = nextH3 > 0 ? after.slice(0, 50 + nextH3) : after;
      const verdicts = ["MEETS_BASIC_INTEGRITY", "MEETS_DEVICE_INTEGRITY", "MEETS_STRONG_INTEGRITY"];
      const missing = verdicts.filter(v => !win.includes(v));
      if (missing.length) return { pass: false, detail: "Missing verdicts: " + missing.join(", ") };
      return { pass: true, detail: "all 3 Play Integrity verdict literals present" };
    }
  },

  // === V-57-21: quick-ref-l2.md PITFALL-7 firewall NEGATIVE (D-23 fictional + D-25 deadline regression-guard, pointer-only mandate) ===
  {
    id: 21, name: "V-57-21: NEGATIVE — quick-ref-l2.md Play Integrity H3 region has NO MEETS_VIRTUAL_INTEGRITY OR deadline literals (full H3 body scan; pointer-only per D-25)",
    run() {
      const c = readFile(QR_L2);
      if (c === null) return { pass: false, detail: "File missing: " + QR_L2 };
      const region = sliceH2Region(c, "## Android Enterprise Quick Reference");
      if (!region) return { pass: false, detail: "Android H2 region missing" };
      const idx = region.indexOf("### Play Integrity Verdict Reference");
      if (idx < 0) return { pass: false, detail: "Play Integrity Verdict Reference H3 missing" };
      const after = region.slice(idx);
      const nextH3 = after.slice(50).search(/^### /m);
      const win = nextH3 > 0 ? after.slice(0, 50 + nextH3) : after;
      // Per CONTEXT D-25 pointer-only mandate: scan FULL H3 region (NOT narrowed to table cells).
      // The trailing `> ⚠️` blockquote must point to SSoT by link only — NEVER enumerate deadline dates inline.
      const violations = [];
      if (win.includes("MEETS_VIRTUAL_INTEGRITY")) violations.push("MEETS_VIRTUAL_INTEGRITY (fictional verdict; not in Phase 54 SSoT)");
      if (/Oct 31 2026|October 31 2026/.test(win)) violations.push("Oct 31 2026 deadline literal in Play Integrity H3 body (PITFALL-7; D-25 pointer-only mandate)");
      if (/September 30 2025|Sept 30 2025/.test(win)) violations.push("September 30 2025 deadline literal in Play Integrity H3 body (PITFALL-7; D-25 pointer-only mandate)");
      if (/\bMay 2025\b/.test(win)) violations.push("May 2025 deadline literal in Play Integrity H3 body (PITFALL-7; D-25 pointer-only mandate)");
      if (violations.length) return { pass: false, detail: "PITFALL-7 violations: " + violations.join(" | ") };
      return { pass: true, detail: "PITFALL-7 firewall holds: no fictional verdict; no deadline literals anywhere in Play Integrity H3 region" };
    }
  },

  // === V-57-22: quick-ref-l2.md Phase 54 SSoT cross-link literal (D-23) ===
  {
    id: 22, name: "V-57-22: quick-ref-l2.md Play Integrity H3 has Phase 54 SSoT cross-link",
    run() {
      const c = readFile(QR_L2);
      if (c === null) return { pass: false, detail: "File missing: " + QR_L2 };
      const region = sliceH2Region(c, "## Android Enterprise Quick Reference");
      if (!region) return { pass: false, detail: "Android H2 region missing" };
      const idx = region.indexOf("### Play Integrity Verdict Reference");
      if (idx < 0) return { pass: false, detail: "Play Integrity Verdict Reference H3 missing" };
      const after = region.slice(idx);
      const nextH3 = after.slice(50).search(/^### /m);
      const win = nextH3 > 0 ? after.slice(0, 50 + nextH3) : after;
      if (!win.includes("04-android-patch-delivery.md#play-integrity-attestation")) {
        return { pass: false, detail: "Phase 54 SSoT cross-link 04-android-patch-delivery.md#play-integrity-attestation missing" };
      }
      return { pass: true, detail: "Phase 54 SSoT cross-link present" };
    }
  },

  // === V-57-23: quick-ref-l2.md 6-runbook list with disambiguation literals (D-26) ===
  {
    id: 23, name: "V-57-23: quick-ref-l2.md Android Investigation Runbooks H3 has 6 L2 runbook links + >=4 ' -- ' disambiguation tokens",
    run() {
      const c = readFile(QR_L2);
      if (c === null) return { pass: false, detail: "File missing: " + QR_L2 };
      const region = sliceH2Region(c, "## Android Enterprise Quick Reference");
      if (!region) return { pass: false, detail: "Android H2 region missing" };
      const idx = region.indexOf("### Android Investigation Runbooks");
      if (idx < 0) return { pass: false, detail: "Android Investigation Runbooks H3 missing" };
      const win = region.slice(idx);
      const runbooks = [
        "18-android-log-collection.md",
        "19-android-enrollment-investigation.md",
        "20-android-app-install-investigation.md",
        "21-android-compliance-investigation.md",
        "22-android-knox-investigation.md",
        "23-android-aosp-investigation.md"
      ];
      const missing = runbooks.filter(r => !win.includes(r));
      const disambigCount = (win.match(/ -- /g) || []).length;
      if (missing.length) return { pass: false, detail: "Missing runbook links: " + missing.join(", ") };
      if (disambigCount < 4) return { pass: false, detail: " -- disambiguation token count " + disambigCount + " < 4" };
      return { pass: true, detail: "all 6 L2 runbook links present + " + disambigCount + " disambiguation tokens" };
    }
  },

  // === V-57-24: L1 index Knox row presence (D-21) ===
  {
    id: 24, name: "V-57-24: docs/l1-runbooks/00-index.md Android L1 Runbooks H2 contains Knox row",
    run() {
      const c = readFile(L1_INDEX);
      if (c === null) return { pass: false, detail: "File missing: " + L1_INDEX };
      const region = sliceH2Region(c, "## Android L1 Runbooks");
      if (!region) return { pass: false, detail: "## Android L1 Runbooks H2 missing" };
      if (!region.includes("28-android-knox-enrollment-failed.md")) {
        return { pass: false, detail: "Knox row link 28-android-knox-enrollment-failed.md missing in Android L1 Runbooks table" };
      }
      return { pass: true, detail: "Knox row 28 present in Android L1 Runbooks table" };
    }
  },

  // === V-57-25: iOS H2 anchor stability NEGATIVE regression-guard (D-33) ===
  {
    id: 25, name: "V-57-25: NEGATIVE — iOS H2 literals UNCHANGED in 4 hub files (anchor stability)",
    run() {
      const expected = [
        [INDEX_MD, /^## iOS\/iPadOS Provisioning\s*$/m, "## iOS/iPadOS Provisioning"],
        [COMMON_MD, /^## iOS\/iPadOS Failure Scenarios\s*$/m, "## iOS/iPadOS Failure Scenarios"],
        [QR_L1, /^## iOS\/iPadOS Quick Reference\s*$/m, "## iOS/iPadOS Quick Reference"],
        [QR_L2, /^## iOS\/iPadOS Quick Reference\s*$/m, "## iOS/iPadOS Quick Reference"]
      ];
      const failures = [];
      for (const [f, re, lit] of expected) {
        const c = readFile(f);
        if (c === null) { failures.push(f + ": file missing"); continue; }
        if (!re.test(c)) failures.push(f + ": iOS H2 literal '" + lit + "' regression — anchor changed");
      }
      if (failures.length) return { pass: false, detail: failures.join(" | ") };
      return { pass: true, detail: "all 4 iOS H2 literals UNCHANGED" };
    }
  },

  // === V-57-26: TBD/TODO/FIXME/XXX/PLACEHOLDER scan in 4 hub files ===
  {
    id: 26, name: "V-57-26: NEGATIVE — no TBD/TODO/FIXME/XXX/PLACEHOLDER tokens in 4 hub files",
    run() {
      const failures = [];
      const banned = /\b(TBD|TODO|FIXME|XXX|PLACEHOLDER)\b/;
      for (const f of HUB_FILES) {
        const c = readFile(f);
        if (c === null) { failures.push(f + ": file missing"); continue; }
        // Strip Version History + Changelog sections + code blocks
        const stripped = c
          .replace(/```[\s\S]*?```/g, '')
          .replace(/^## Version History[\s\S]*$/m, '')
          .replace(/^## Changelog[\s\S]*$/m, '');
        const m = stripped.match(banned);
        if (m) failures.push(f + ": found '" + m[1] + "'");
      }
      if (failures.length) return { pass: false, detail: failures.join(" | ") };
      return { pass: true, detail: "no TBD/TODO/FIXME/XXX/PLACEHOLDER tokens in 4 hub files" };
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
