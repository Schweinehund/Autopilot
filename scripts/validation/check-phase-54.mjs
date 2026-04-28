#!/usr/bin/env node
// Phase 54 static validation harness
// Source of truth: .planning/phases/54-patch-update-management/54-CONTEXT.md
// NO SHELL: all file content via fs.readFileSync; no shared module; no external tools
// Implements 32 checks (V-54-01 through V-54-32)
// Lineage: Phase 48 D-25 (validator-as-deliverable) → Phase 49 D-26 → Phase 50 D-25
//          → Phase 51 D-20 → Phase 52 D-11 → Phase 53 D-11 → Phase 54 D-17/D-18

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

// D-20: Pinned anchor strings — same-commit validator update required on any rename.
const OV   = "docs/operations/patch-management/00-overview.md";
const WIN  = "docs/operations/patch-management/01-windows-wufb-rings.md";
const MAC  = "docs/operations/patch-management/02-macos-update-enforcement.md";
const IOS  = "docs/operations/patch-management/03-ios-update-lifecycle.md";
const AND_ = "docs/operations/patch-management/04-android-patch-delivery.md";
const RETROFIT_IOS = "docs/admin-setup-ios/07-device-enrollment.md";
const FORWARDLINK_IOS = "docs/admin-setup-ios/04-configuration-profiles.md";
const REQ  = ".planning/REQUIREMENTS.md";
const ROAD = ".planning/ROADMAP.md";
const OPS_INDEX = "docs/operations/00-index.md";
const VAL  = "scripts/validation/check-phase-54.mjs";

const PATCH_FILES = [OV, WIN, MAC, IOS, AND_];

const checks = [
  // === FILE EXISTENCE (V-54-01..06) ===
  {
    id: 1, name: "V-54-01: 00-overview.md exists",
    run() {
      const c = readFile(OV);
      if (c === null) return { pass: false, detail: "File missing: " + OV };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 2, name: "V-54-02: 01-windows-wufb-rings.md exists",
    run() {
      const c = readFile(WIN);
      if (c === null) return { pass: false, detail: "File missing: " + WIN };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 3, name: "V-54-03: 02-macos-update-enforcement.md exists",
    run() {
      const c = readFile(MAC);
      if (c === null) return { pass: false, detail: "File missing: " + MAC };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 4, name: "V-54-04: 03-ios-update-lifecycle.md exists",
    run() {
      const c = readFile(IOS);
      if (c === null) return { pass: false, detail: "File missing: " + IOS };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 5, name: "V-54-05: 04-android-patch-delivery.md exists",
    run() {
      const c = readFile(AND_);
      if (c === null) return { pass: false, detail: "File missing: " + AND_ };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 6, name: "V-54-06: check-phase-54.mjs exists (self-referential)",
    run() {
      const c = readFile(VAL);
      if (c === null) return { pass: false, detail: "File missing: " + VAL };
      return { pass: true, detail: c.length + " bytes" };
    }
  },

  // === FRONTMATTER (V-54-07) ===
  {
    id: 7, name: "V-54-07: all 5 patch-management files have valid platform: + audience: + 60-day cycle",
    run() {
      const failures = [];
      const expectedPlatform = {
        [OV]:  /^platform: (cross-platform|Windows,\s*macOS,\s*iOS,\s*Android)\s*$/m,
        [WIN]: /^platform: Windows\s*$/m,
        [MAC]: /^platform: macOS\s*$/m,
        [IOS]: /^platform: iOS\s*$/m,
        [AND_]: /^platform: Android\s*$/m
      };
      for (const f of PATCH_FILES) {
        const c = readFile(f);
        if (c === null) { failures.push(f + ": file missing"); continue; }
        const fmMatch = c.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/m);
        if (!fmMatch) { failures.push(f + ": no frontmatter"); continue; }
        const fm = fmMatch[1];
        const issues = [];
        if (!expectedPlatform[f].test(fm)) issues.push("platform mismatch");
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
      if (failures.length === 0) return { pass: true, detail: PATCH_FILES.length + " files valid" };
      return { pass: false, detail: failures.join(" | ") };
    }
  },

  // === SC#1 + COMPARISON TABLE + RING TERMINOLOGY + DEFERRAL (V-54-08..10) ===
  {
    id: 8, name: "V-54-08: 00-overview.md has 4-platform comparison table (Windows + macOS + iOS + Android)",
    run() {
      const c = readFile(OV);
      if (c === null) return { pass: false, detail: "File missing: " + OV };
      // Either a single header row containing all 4 platforms (any order), OR transposed
      const hasAllFourInRow =
        /\|[^\n]*\bWindows\b[^\n]*\bmacOS\b[^\n]*\biOS\b[^\n]*\bAndroid\b[^\n]*\|/.test(c) ||
        /\|[^\n]*\bWindows\b[^\n]*\bmacOS\b[^\n]*\biOS\/iPadOS\b[^\n]*\bAndroid\b[^\n]*\|/.test(c) ||
        /\|[^\n]*\bAndroid\b[^\n]*\biOS\b[^\n]*\bmacOS\b[^\n]*\bWindows\b[^\n]*\|/.test(c);
      // Transposed: 4 separate rows each starting with one platform name
      const transposed = ["Windows", "macOS", "iOS", "Android"].every(p =>
        new RegExp("^\\|\\s*" + p + "\\s*\\|", "m").test(c));
      if (!hasAllFourInRow && !transposed)
        return { pass: false, detail: "4-platform comparison table not found (neither row-headers nor column-headers form)" };
      return { pass: true, detail: "4-platform comparison table found" };
    }
  },
  {
    id: 9, name: "V-54-09: 00-overview.md has Ring Terminology H2 + WUfB deployment ring + Autopatch ring within ~10 lines",
    run() {
      const c = readFile(OV);
      if (c === null) return { pass: false, detail: "File missing: " + OV };
      // Allow optional anchor suffix {#...}
      const h2Match = c.match(/^## Ring Terminology(\s+\{#[a-z0-9-]+\})?\s*$/m);
      if (!h2Match) return { pass: false, detail: "## Ring Terminology H2 missing" };
      const h2Idx = c.indexOf(h2Match[0]);
      // Window: next ~1500 bytes (approximates 10-15 lines)
      const window = c.slice(h2Idx, h2Idx + 1500);
      if (!window.includes("WUfB deployment ring")) return { pass: false, detail: "WUfB deployment ring missing within ~1500 bytes of Ring Terminology H2" };
      if (!window.includes("Autopatch ring")) return { pass: false, detail: "Autopatch ring missing within ~1500 bytes of Ring Terminology H2" };
      return { pass: true, detail: "Ring Terminology H2 + both qualifiers present" };
    }
  },
  {
    id: 10, name: "V-54-10: 00-overview.md has deferral + enforcement distinguishing prose",
    run() {
      const c = readFile(OV);
      if (c === null) return { pass: false, detail: "File missing: " + OV };
      if (!/\bdeferral\b/i.test(c)) return { pass: false, detail: "deferral token missing" };
      if (!/\benforcement\b/i.test(c)) return { pass: false, detail: "enforcement token missing" };
      return { pass: true, detail: "deferral + enforcement both present" };
    }
  },

  // === PITFALL-9 RING QUALIFIER + HOTPATCH + DRIVER/FIRMWARE (V-54-11..13) ===
  {
    id: 11, name: "V-54-11: 01-windows-wufb-rings.md — every 'ring' qualified (POSITIVE) + zero bare-ring (NEGATIVE)",
    run() {
      const c = readFile(WIN);
      if (c === null) return { pass: false, detail: "File missing: " + WIN };
      // Strip frontmatter, fenced code blocks, anchor IDs, anchor links, and H2/H3 lines (where 'ring' may appear in a section heading like "## WUfB Deployment Rings")
      const stripped = c
        .replace(/^---\n[\s\S]*?\n---\n/, '')           // frontmatter
        .replace(/```[\s\S]*?```/g, '')                  // fenced code
        .replace(/`[^`\n]*`/g, '')                       // inline code
        .replace(/\{#[a-z0-9-]+\}/g, '')                  // {#anchor-id}
        .replace(/\(#[a-z0-9-]+\)/g, '')                  // (#anchor-link)
        .replace(/^#+ .*$/gm, '');                        // headings
      // Find all 'ring' word-boundary tokens (singular or plural)
      const ringMatches = [...stripped.matchAll(/\bring(s)?\b/gi)];
      const bare = [];
      for (const m of ringMatches) {
        const before = stripped.slice(Math.max(0, m.index - 40), m.index);
        const matchedWord = m[0]; // "ring", "Ring", "rings", "Rings"
        const afterEnd = m.index + matchedWord.length;
        const after = stripped.slice(afterEnd, Math.min(stripped.length, afterEnd + 80));
        // Acceptable qualifiers within preceding ~40-char window:
        // - "WUfB deployment ring" / "Autopatch ring" / "Update ring"
        // - "Pilot/Broad/Test/First/Fast WUfB deployment ring" (compound qualifiers fold to base qualifier within window)
        // - "deployment ring" (close-form abbreviation following a prior "WUfB" mention)
        if (/(WUfB deployment|Autopatch|Update|deployment)\s*$/i.test(before.trim())) continue;
        // Compound: "WUfB deployment" or "Autopatch" anywhere in preceding ~40 chars then ring
        if (/(WUfB deployment|Autopatch)\b[^\n]{0,30}$/i.test(before)) continue;
        // Proper-noun H2 reference: "Ring Terminology" (cross-link references to 00-overview's H2 by title)
        // After "Ring", next word is "Terminology"
        if (/^\s+[Tt]erminology\b/.test(after)) continue;
        // Meta-disambiguation: "NOT a ring" or "not a ring" — followed by "neither a WUfB deployment ring nor an Autopatch ring"
        // Pattern: "NOT a [ring]" with the meta-context being the very next clause containing both qualifiers
        if (/(NOT|not)\s+a\s*$/i.test(before.trim()) && /(WUfB deployment|Autopatch)/i.test(after)) continue;
        bare.push("'..." + before.slice(-30).replace(/\n/g, ' ') + "[" + matchedWord + "]...'");
      }
      if (bare.length > 0) return { pass: false, detail: bare.length + " bare 'ring' tokens found: " + bare.slice(0, 3).join(" / ") };
      return { pass: true, detail: ringMatches.length + " 'ring' tokens, all qualified" };
    }
  },
  {
    id: 12, name: "V-54-12: 01-windows-wufb-rings.md — Hotpatch H2 + 4 PATCH-02 tokens (default, May 2026, VBS, opt-out OR April 2026)",
    run() {
      const c = readFile(WIN);
      if (c === null) return { pass: false, detail: "File missing: " + WIN };
      // Allow optional anchor suffix
      if (!/^## Hotpatch(\s+\{#[a-z0-9-]+\})?\s*$/m.test(c)) return { pass: false, detail: "## Hotpatch H2 missing" };
      const required = ["May 2026", "VBS"];
      const missing = required.filter(s => !c.includes(s));
      if (missing.length > 0) return { pass: false, detail: "Hotpatch tokens missing: " + missing.join(", ") };
      if (!/\bdefault\b/i.test(c)) return { pass: false, detail: "default token missing" };
      if (!c.includes("opt-out") && !c.includes("April 2026")) return { pass: false, detail: "opt-out OR April 2026 missing" };
      return { pass: true, detail: "Hotpatch H2 + all PATCH-02 tokens present" };
    }
  },
  {
    id: 13, name: "V-54-13: 01-windows-wufb-rings.md — driver/firmware H2 + dual-scan token",
    run() {
      const c = readFile(WIN);
      if (c === null) return { pass: false, detail: "File missing: " + WIN };
      // H2 may say "Driver and Firmware" or "Driver/Firmware"
      const h2 = /^## .*[Dd]river[^\n]*[Ff]irmware[^\n]*$/m.test(c) ||
                 /^## .*[Ff]irmware[^\n]*[Dd]river[^\n]*$/m.test(c);
      if (!h2) return { pass: false, detail: "driver/firmware H2 missing" };
      if (!c.includes("dual-scan")) return { pass: false, detail: "dual-scan token missing" };
      return { pass: true, detail: "driver/firmware H2 + dual-scan present" };
    }
  },

  // === macOS HARD-DEADLINE THREE-LAYER (V-54-14..16) + DDM-ONLY (V-54-17) ===
  {
    id: 14, name: "V-54-14: macOS Layer 1 — [HARD-DEADLINE] in legacy-command table row + ## Deadlines & Cutover Dates H2",
    run() {
      const c = readFile(MAC);
      if (c === null) return { pass: false, detail: "File missing: " + MAC };
      if (!/^## Deadlines & Cutover Dates(\s+\{#[a-z0-9-]+\})?\s*$/m.test(c))
        return { pass: false, detail: "## Deadlines & Cutover Dates H2 missing" };
      // Find ALL rows containing forceDelayedSoftwareUpdates; need at least one with **[HARD-DEADLINE]**
      const rowMatches = [...c.matchAll(/\|[^\n]*forceDelayedSoftwareUpdates[^\n]*/g)];
      if (rowMatches.length === 0)
        return { pass: false, detail: "No forceDelayedSoftwareUpdates table row found" };
      const hardDeadlineRow = rowMatches.find(m => /\*\*\[HARD-DEADLINE\]\*\*/.test(m[0]));
      if (!hardDeadlineRow)
        return { pass: false, detail: "Layer 1: **[HARD-DEADLINE]** missing from any forceDelayedSoftwareUpdates row (scanned " + rowMatches.length + " rows)" };
      return { pass: true, detail: "Layer 1 [HARD-DEADLINE] present in legacy-command table row (out of " + rowMatches.length + " rows)" };
    }
  },
  {
    id: 15, name: "V-54-15: macOS Layer 2 — verbatim '> ⚠️ **Hard deadline (Apple OS 26):**' blockquote + 5 tokens",
    run() {
      const c = readFile(MAC);
      if (c === null) return { pass: false, detail: "File missing: " + MAC };
      if (!c.includes("> \u26a0\ufe0f **Hard deadline (Apple OS 26):**"))
        return { pass: false, detail: "Layer 2 blockquote opener missing (literal '> \u26a0\ufe0f **Hard deadline (Apple OS 26):**')" };
      const required = ["forceDelayedSoftwareUpdates", "com.apple.SoftwareUpdate", "ScheduleOSUpdate", "DDM", "Apple OS 26"];
      const missing = required.filter(s => !c.includes(s));
      if (missing.length) return { pass: false, detail: "Layer 2 token coverage incomplete: " + missing.join(", ") };
      return { pass: true, detail: "Layer 2 verbatim opener + all 5 tokens present" };
    }
  },
  {
    id: 16, name: "V-54-16: macOS Layer 3 — \u22652 inline [HARD-DEADLINE reminders (total \u22655: Layer 1 row + Layer 2 callout + \u22652 Layer 3)",
    run() {
      const c = readFile(MAC);
      if (c === null) return { pass: false, detail: "File missing: " + MAC };
      const tokens = (c.match(/\[HARD-DEADLINE/g) || []).length;
      if (tokens < 5) return { pass: false, detail: "Need \u22655 [HARD-DEADLINE tokens (Layer 1 + Layer 2 + \u22652 Layer 3); found " + tokens + " total" };
      return { pass: true, detail: tokens + " total [HARD-DEADLINE tokens (Layers 1+2+3)" };
    }
  },
  {
    id: 17, name: "V-54-17: macOS DDM-only literal coverage",
    run() {
      const c = readFile(MAC);
      if (c === null) return { pass: false, detail: "File missing: " + MAC };
      const required = ["Software Update Enforce Latest", "Intune Settings Catalog", "DDM", "forward-compatible"];
      const missing = required.filter(s => !c.includes(s));
      if (missing.length) return { pass: false, detail: "DDM-only literal missing: " + missing.join(", ") };
      return { pass: true, detail: "all 4 DDM-only literals present" };
    }
  },

  // === iOS DDM UNSUPERVISED RETRACTION (V-54-18) ===
  {
    id: 18, name: "V-54-18: iOS DDM unsupervised retraction literal coverage (unsupervised + iOS 17 + Aug 2025 + \u22652 DDM keys)",
    run() {
      const c = readFile(IOS);
      if (c === null) return { pass: false, detail: "File missing: " + IOS };
      if (!c.includes("unsupervised")) return { pass: false, detail: "unsupervised token missing" };
      if (!c.includes("iOS 17")) return { pass: false, detail: "iOS 17 token missing" };
      if (!c.includes("August 2025") && !c.includes("Aug 2025")) return { pass: false, detail: "August 2025 OR Aug 2025 missing" };
      const ddmKeys = ["TargetOSVersion", "TargetBuildVersion", "TargetLocalDateTime", "OfferPrograms"];
      const present = ddmKeys.filter(k => c.includes(k));
      if (present.length < 2) return { pass: false, detail: "Need \u22652 of 4 DDM keys; found " + present.length + ": " + present.join(", ") };
      return { pass: true, detail: "all required tokens + " + present.length + " DDM keys" };
    }
  },

  // === PATCH-06 RETROFIT NEGATIVE+POSITIVE PAIR (V-54-19) ===
  {
    id: 19, name: "V-54-19: PATCH-06 retrofit at 07-device-enrollment.md:35 — NEGATIVE pre-edit + POSITIVE DDM-on-unsupervised + cross-link",
    run() {
      const c = readFile(RETROFIT_IOS);
      if (c === null) return { pass: false, detail: "File missing: " + RETROFIT_IOS };
      // NEGATIVE half: pre-edit cell text MUST be absent
      if (c.includes("Supervised-only in iOS 17+ enforcement policies"))
        return { pass: false, detail: "V-54-19 NEGATIVE violation: pre-edit cell text 'Supervised-only in iOS 17+ enforcement policies' still present" };
      // POSITIVE half 1: DDM + unsupervised + iOS 17 (any order, single line/cell scope)
      const ddmRowRe = /(DDM[^\n]*unsupervised[^\n]*iOS\s*17|unsupervised[^\n]*DDM[^\n]*iOS\s*17|DDM[^\n]*iOS\s*17[^\n]*unsupervised|iOS\s*17[^\n]*unsupervised[^\n]*DDM)/i;
      if (!ddmRowRe.test(c))
        return { pass: false, detail: "V-54-19 POSITIVE: DDM-on-unsupervised-iOS-17 pattern missing" };
      // POSITIVE half 2: cross-link literal to 03-ios-update-lifecycle.md
      if (!c.includes("03-ios-update-lifecycle.md"))
        return { pass: false, detail: "V-54-19 POSITIVE: cross-link to 03-ios-update-lifecycle.md missing" };
      return { pass: true, detail: "retrofit cell NEGATIVE+POSITIVE pair both pass" };
    }
  },

  // === PITFALL-13 FORWARD-LINK (V-54-20) ===
  {
    id: 20, name: "V-54-20: PITFALL-13 forward-link at 04-configuration-profiles.md — preservation + forward-link literal",
    run() {
      const c = readFile(FORWARDLINK_IOS);
      if (c === null) return { pass: false, detail: "File missing: " + FORWARDLINK_IOS };
      if (!c.includes("supervised and unsupervised devices (iOS 17.0+)"))
        return { pass: false, detail: "V-54-20: byte-identical preservation broken — 'supervised and unsupervised devices (iOS 17.0+)' missing" };
      if (!c.includes("03-ios-update-lifecycle.md"))
        return { pass: false, detail: "V-54-20: forward-link to 03-ios-update-lifecycle.md missing" };
      return { pass: true, detail: "preservation + forward-link both present" };
    }
  },

  // === REQ/ROADMAP ERRATA LITERAL-PURGE (V-54-21) ===
  {
    id: 21, name: "V-54-21: NEGATIVE — REQUIREMENTS.md + ROADMAP.md contain ZERO '05-compliance-policy.md' references",
    run() {
      const failures = [];
      for (const f of [REQ, ROAD]) {
        const c = readFile(f);
        if (c === null) { failures.push(f + ": file missing"); continue; }
        const matches = (c.match(/05-compliance-policy\.md/g) || []).length;
        if (matches > 0) failures.push(f + ": " + matches + " '05-compliance-policy.md' literal(s) still present");
      }
      if (failures.length === 0) return { pass: true, detail: "off-by-one literal fully purged from REQ + ROADMAP" };
      return { pass: false, detail: failures.join(" | ") };
    }
  },

  // === ANDROID HARD-DEADLINE THREE-LAYER (V-54-22..24) + ZEBRA/SAMSUNG (V-54-25) ===
  {
    id: 22, name: "V-54-22: Android Layer 1 — [HARD-DEADLINE] in MEETS_STRONG_INTEGRITY table row + ## Deadlines & Cutover Dates H2",
    run() {
      const c = readFile(AND_);
      if (c === null) return { pass: false, detail: "File missing: " + AND_ };
      if (!/^## Deadlines & Cutover Dates(\s+\{#[a-z0-9-]+\})?\s*$/m.test(c))
        return { pass: false, detail: "## Deadlines & Cutover Dates H2 missing" };
      // Find ALL rows containing MEETS_STRONG_INTEGRITY; need at least one with **[HARD-DEADLINE]**
      const rowMatches = [...c.matchAll(/\|[^\n]*MEETS_STRONG_INTEGRITY[^\n]*/g)];
      if (rowMatches.length === 0)
        return { pass: false, detail: "No MEETS_STRONG_INTEGRITY table row found" };
      const hardDeadlineRow = rowMatches.find(m => /\*\*\[HARD-DEADLINE\]\*\*/.test(m[0]));
      if (!hardDeadlineRow)
        return { pass: false, detail: "Layer 1: **[HARD-DEADLINE]** missing from any MEETS_STRONG_INTEGRITY row (scanned " + rowMatches.length + " rows)" };
      return { pass: true, detail: "Layer 1 [HARD-DEADLINE] present in integrity-attestation table row (out of " + rowMatches.length + " MEETS_STRONG_INTEGRITY rows)" };
    }
  },
  {
    id: 23, name: "V-54-23: Android Layer 2 — verbatim '> ⚠️ **Hard deadline (Oct 31 2026):**' blockquote + cascade dates + Android 13+ + 12 months",
    run() {
      const c = readFile(AND_);
      if (c === null) return { pass: false, detail: "File missing: " + AND_ };
      if (!c.includes("> \u26a0\ufe0f **Hard deadline (Oct 31 2026):**"))
        return { pass: false, detail: "Layer 2 blockquote opener missing (literal '> \u26a0\ufe0f **Hard deadline (Oct 31 2026):**')" };
      if (!c.includes("May 2025")) return { pass: false, detail: "May 2025 token missing" };
      if (!c.includes("September 30 2025") && !c.includes("Sept 30 2025") && !c.includes("September 2025"))
        return { pass: false, detail: "Sept 30 2025 token missing (need 'September 30 2025' / 'Sept 30 2025')" };
      if (!c.includes("October 31 2026") && !c.includes("Oct 31 2026"))
        return { pass: false, detail: "Oct 31 2026 token missing" };
      if (!c.includes("Android 13+")) return { pass: false, detail: "Android 13+ token missing" };
      if (!c.includes("12 months") && !c.includes("12-month")) return { pass: false, detail: "12 months token missing" };
      return { pass: true, detail: "Layer 2 verbatim opener + all required tokens present" };
    }
  },
  {
    id: 24, name: "V-54-24: Android Layer 3 — \u22652 inline [HARD-DEADLINE reminders (total \u22654)",
    run() {
      const c = readFile(AND_);
      if (c === null) return { pass: false, detail: "File missing: " + AND_ };
      const tokens = (c.match(/\[HARD-DEADLINE/g) || []).length;
      if (tokens < 4) return { pass: false, detail: "Need \u22654 total [HARD-DEADLINE tokens (Layers 1+2+\u22652 Layer 3); found " + tokens };
      return { pass: true, detail: tokens + " total [HARD-DEADLINE tokens" };
    }
  },
  {
    id: 25, name: "V-54-25: Android Zebra LifeGuard + Samsung KSP coverage + analog OEM framing",
    run() {
      const c = readFile(AND_);
      if (c === null) return { pass: false, detail: "File missing: " + AND_ };
      if (!c.includes("Zebra LifeGuard")) return { pass: false, detail: "Zebra LifeGuard token missing" };
      if (!c.includes("January 2026") && !c.includes("Jan 2026")) return { pass: false, detail: "January 2026 OR Jan 2026 missing" };
      if (!c.includes("Samsung KSP") && !c.includes("Knox Service Plugin")) return { pass: false, detail: "Samsung KSP OR Knox Service Plugin missing" };
      if (!/\banalog\b/i.test(c)) return { pass: false, detail: "analog OEM framing missing (token 'analog' not found)" };
      return { pass: true, detail: "Zebra LifeGuard + Samsung KSP + analog framing present" };
    }
  },

  // === CROSS-PLATFORM BLOCKQUOTE + REGRESSION-GUARDS (V-54-26..30) ===
  {
    id: 26, name: "V-54-26: cross-platform '> **Platform applicability:**' blockquote within first 50 lines of body for all 5 patch-management files",
    run() {
      const failures = [];
      for (const f of PATCH_FILES) {
        const c = readFile(f);
        if (c === null) { failures.push(f + ": file missing"); continue; }
        const body = c.replace(/^---\n[\s\S]*?\n---\n/, '');
        const first50 = body.split('\n').slice(0, 50).join('\n');
        if (!first50.includes("> **Platform applicability:**"))
          failures.push(f + ": '> **Platform applicability:**' blockquote not in first 50 lines of body");
      }
      if (failures.length === 0) return { pass: true, detail: "all 5 files have blockquote at TOP" };
      return { pass: false, detail: failures.join(" | ") };
    }
  },
  {
    id: 27, name: "V-54-27: NEGATIVE — no bare '> **Platform:**' token across docs/ + .planning/ corpus (recursive .md walk per CONTEXT D-17:121)",
    run() {
      // CONTEXT D-17 line 121 mandates corpus-wide scope (entire docs/ + .planning/ tree),
      // not just the 5 PATCH_FILES. Lexicon-family-preservation regression-guard.
      // Implementation: recursive readdirSync walk per Phase 48 D-25 file-reads-only pattern.
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
  {
    id: 28, name: "V-54-28: NEGATIVE — docs/operations/00-index.md does NOT contain ## Patch Management H2 (Phase 53 owns; Phase 59 will add)",
    run() {
      const c = readFile(OPS_INDEX);
      if (c === null) return { pass: false, detail: "File missing: " + OPS_INDEX };
      if (/^## Patch Management(\s+\{#[a-z0-9-]+\})?\s*$/m.test(c))
        return { pass: false, detail: "V-54-28 violation: ## Patch Management H2 found in operations/00-index.md (Phase 54 cross-references only; Phase 59 owns this addition per ROADMAP line 463)" };
      return { pass: true, detail: "ops/00-index.md correctly NOT amended by Phase 54" };
    }
  },
  {
    id: 29, name: "V-54-29: NEGATIVE — 00-overview body prose does NOT contain Hotpatch/VBS/MEETS_STRONG_INTEGRITY substantively (REQ traceability firewall)",
    run() {
      const c = readFile(OV);
      if (c === null) return { pass: false, detail: "File missing: " + OV };
      // Strip frontmatter, table rows, cross-link text, and fenced code blocks
      const stripped = c
        .replace(/^---\n[\s\S]*?\n---\n/, '')
        .replace(/^\|.*\|.*$/gm, '')          // table rows
        .replace(/```[\s\S]*?```/g, '')        // fenced code
        .replace(/\[.*?\]\(.*?\)/g, '')        // cross-links [text](url)
        .replace(/`[^`\n]*`/g, '');             // inline code
      // The body prose should not substantively discuss PATCH-NN-territory tokens
      // (Hotpatch/VBS/MEETS_STRONG_INTEGRITY belong in their per-platform files).
      const banned = ["Hotpatch", "VBS", "MEETS_STRONG_INTEGRITY"];
      const found = banned.filter(s => stripped.includes(s));
      if (found.length > 0) return { pass: false, detail: "Anti-scope-creep violation: " + found.join(", ") + " present in 00-overview body prose (PATCH-NN territory)" };
      return { pass: true, detail: "no PATCH-NN substantive tokens in 00-overview body prose" };
    }
  },
  {
    id: 30, name: "V-54-30: NEGATIVE — no TBD/TODO/FIXME/XXX/PLACEHOLDER tokens in 5 patch-management files (outside Version History)",
    run() {
      const failures = [];
      const banned = /\b(TBD|TODO|FIXME|XXX|PLACEHOLDER)\b/;
      for (const f of PATCH_FILES) {
        const c = readFile(f);
        if (c === null) { failures.push(f + ": file missing"); continue; }
        // Strip Version History + Changelog sections (legitimate references to past placeholder text)
        const stripped = c
          .replace(/^## Version History[\s\S]*$/m, '')
          .replace(/^## Changelog[\s\S]*$/m, '');
        const m = stripped.match(banned);
        if (m) failures.push(f + ": found '" + m[1] + "'");
      }
      if (failures.length === 0) return { pass: true, detail: "no TBD/TODO/etc tokens in 5 files" };
      return { pass: false, detail: failures.join(" | ") };
    }
  },

  // === SC#5 MULTI-PLATFORM FRONTMATTER (V-54-31) + ATOMICITY COUPLING (V-54-32) ===
  {
    id: 31, name: "V-54-31: SC#5 — all 5 patch-management ops files carry valid platform: frontmatter (per ROADMAP line 269)",
    run() {
      const failures = [];
      const validValues = {
        [OV]:  /(cross-platform|Windows,\s*macOS,\s*iOS,\s*Android)/,
        [WIN]: /Windows/,
        [MAC]: /macOS/,
        [IOS]: /iOS/,
        [AND_]: /Android/
      };
      for (const f of PATCH_FILES) {
        const c = readFile(f);
        if (c === null) { failures.push(f + ": file missing"); continue; }
        const fmMatch = c.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/m);
        if (!fmMatch) { failures.push(f + ": no frontmatter"); continue; }
        const fm = fmMatch[1];
        const platMatch = fm.match(/^platform:\s*(.+?)\s*$/m);
        if (!platMatch) { failures.push(f + ": platform field missing"); continue; }
        if (!validValues[f].test(platMatch[1])) failures.push(f + ": platform value '" + platMatch[1] + "' invalid for this file");
      }
      if (failures.length === 0) return { pass: true, detail: "all 5 files have valid multi-platform-aware frontmatter" };
      return { pass: false, detail: failures.join(" | ") };
    }
  },
  {
    id: 32, name: "V-54-32: atomicity coupling — V-54-19 + V-54-20 + V-54-21 must all PASS together (single-commit landing)",
    run() {
      // Runtime atomicity-coupling cross-check (STRENGTHENS the plan-time-only marker
      // described in CONTEXT D-17 line 126). If any of V-54-19/20/21 degrade between
      // commits, V-54-32 surfaces it as a dedicated atomicity-coupling FAIL with
      // named diagnostics. Mechanically equivalent — no CONTEXT amendment required.
      const cRetro = readFile(RETROFIT_IOS);
      const cFwd = readFile(FORWARDLINK_IOS);
      const cIos = readFile(IOS);
      const cReq = readFile(REQ);
      const cRoad = readFile(ROAD);
      if (!cRetro || !cFwd || !cIos || !cReq || !cRoad)
        return { pass: false, detail: "atomicity-coupling files missing — single-commit landing required" };
      const v19_neg = !cRetro.includes("Supervised-only in iOS 17+ enforcement policies");
      const v19_pos = cRetro.includes("03-ios-update-lifecycle.md");
      const v20_pres = cFwd.includes("supervised and unsupervised devices (iOS 17.0+)");
      const v20_pos = cFwd.includes("03-ios-update-lifecycle.md");
      const ios_present = cIos.length > 0;
      const v21_neg = !cReq.includes("05-compliance-policy.md") && !cRoad.includes("05-compliance-policy.md");
      if (v19_neg && v19_pos && v20_pres && v20_pos && ios_present && v21_neg)
        return { pass: true, detail: "atomic commit coupling verified (V-54-19/20/21 all consistent)" };
      const issues = [];
      if (!v19_neg) issues.push("retrofit pre-edit text still present");
      if (!v19_pos) issues.push("retrofit forward-link missing");
      if (!v20_pres) issues.push("PITFALL-13 byte-identical preservation broken");
      if (!v20_pos) issues.push("PITFALL-13 forward-link missing");
      if (!ios_present) issues.push("03-ios-update-lifecycle.md missing");
      if (!v21_neg) issues.push("REQ/ROADMAP off-by-one literal still present");
      return { pass: false, detail: "atomicity coupling broken: " + issues.join(", ") };
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
