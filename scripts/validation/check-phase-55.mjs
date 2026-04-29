#!/usr/bin/env node
// Phase 55 static validation harness
// Source of truth: .planning/phases/55-app-lifecycle-automation/55-CONTEXT.md
// NO SHELL: all file content via fs.readFileSync; no shared module; no external tools
// Implements 32 checks (V-55-01 through V-55-32)
// Lineage: Phase 48 D-25 (validator-as-deliverable) → Phase 49 D-26 → Phase 50 D-25
//          → Phase 51 D-20 → Phase 52 D-11 → Phase 53 D-11 → Phase 54 D-17/D-18
//          → Phase 55 D-17/D-18

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
const OV   = "docs/operations/app-lifecycle/00-overview.md";
const WIN  = "docs/operations/app-lifecycle/01-windows-win32-msix-scale.md";
const MAC  = "docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md";
const IOS  = "docs/operations/app-lifecycle/03-ios-vpp-licensing.md";
const AND_ = "docs/operations/app-lifecycle/04-android-mgp-lifecycle.md";
const ZEBRA_PHASE45 = "docs/admin-setup-android/10-aosp-zebra.md";
const IOS_V13_APP_DEPLOY = "docs/admin-setup-ios/05-app-deployment.md";
const WIN32_REF = "docs/reference/win32-app-packaging.md";
const OPS_INDEX = "docs/operations/00-index.md";
const VAL  = "scripts/validation/check-phase-55.mjs";

const APP_FILES = [OV, WIN, MAC, IOS, AND_];

const checks = [
  // === FILE EXISTENCE (V-55-01..06) ===
  {
    id: 1, name: "V-55-01: 00-overview.md exists",
    run() {
      const c = readFile(OV);
      if (c === null) return { pass: false, detail: "File missing: " + OV };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 2, name: "V-55-02: 01-windows-win32-msix-scale.md exists",
    run() {
      const c = readFile(WIN);
      if (c === null) return { pass: false, detail: "File missing: " + WIN };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 3, name: "V-55-03: 02-macos-pkg-dmg-pipeline.md exists",
    run() {
      const c = readFile(MAC);
      if (c === null) return { pass: false, detail: "File missing: " + MAC };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 4, name: "V-55-04: 03-ios-vpp-licensing.md exists",
    run() {
      const c = readFile(IOS);
      if (c === null) return { pass: false, detail: "File missing: " + IOS };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 5, name: "V-55-05: 04-android-mgp-lifecycle.md exists",
    run() {
      const c = readFile(AND_);
      if (c === null) return { pass: false, detail: "File missing: " + AND_ };
      return { pass: true, detail: c.length + " bytes" };
    }
  },
  {
    id: 6, name: "V-55-06: check-phase-55.mjs exists (self-referential)",
    run() {
      const c = readFile(VAL);
      if (c === null) return { pass: false, detail: "File missing: " + VAL };
      return { pass: true, detail: c.length + " bytes" };
    }
  },

  // === FRONTMATTER (V-55-07) ===
  {
    id: 7, name: "V-55-07: all 5 app-lifecycle files have valid platform: + audience: + 60-day cycle",
    run() {
      const failures = [];
      const expectedPlatform = {
        [OV]:  /^platform: (cross-platform|Windows,\s*macOS,\s*iOS,\s*Android)\s*$/m,
        [WIN]: /^platform: Windows\s*$/m,
        [MAC]: /^platform: macOS\s*$/m,
        [IOS]: /^platform: iOS\s*$/m,
        [AND_]: /^platform: Android\s*$/m
      };
      for (const f of APP_FILES) {
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
      if (failures.length === 0) return { pass: true, detail: APP_FILES.length + " files valid" };
      return { pass: false, detail: failures.join(" | ") };
    }
  },

  // === 00-OVERVIEW: COMPARISON TABLE + TERMINOLOGY H2 + ANTI-SCOPE-CREEP (V-55-08..10) ===
  {
    id: 8, name: "V-55-08: 00-overview has 4-platform comparison table (Windows + macOS + iOS + Android)",
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
        new RegExp("^\\|\\s*" + p + "\\s*\\|", "m").test(c));
      if (!hasAllFourInRow && !transposed)
        return { pass: false, detail: "4-platform comparison table not found (neither row-headers nor column-headers form)" };
      return { pass: true, detail: "4-platform comparison table found" };
    }
  },
  {
    id: 9, name: "V-55-09: 00-overview has ## App-lifecycle terminology H2 + ≥3 cross-platform terminology tokens within ~30 lines",
    run() {
      const c = readFile(OV);
      if (c === null) return { pass: false, detail: "File missing: " + OV };
      const h2Match = c.match(/^## App-lifecycle terminology(\s+\{#[a-z0-9-]+\})?\s*$/m);
      if (!h2Match) return { pass: false, detail: "## App-lifecycle terminology H2 missing" };
      const h2Idx = c.indexOf(h2Match[0]);
      const window = c.slice(h2Idx, h2Idx + 3000);  // ~30 lines = ~3000 bytes
      // CD-09 framings — accept any 3+ from these cross-platform-only terminology tokens
      const candidates = [
        "lifecycle states", "assignment intents", "packaging", "distribution",
        "lifecycle", "install", "update", "supersede", "retire",
        "required", "available", "uninstall"
      ];
      const present = candidates.filter(tok => new RegExp("\\b" + tok + "\\b", "i").test(window));
      if (present.length < 3) return { pass: false, detail: "Need ≥3 cross-platform terminology tokens within ~30 lines of H2; found " + present.length + ": " + present.join(", ") };
      return { pass: true, detail: "App-lifecycle terminology H2 + " + present.length + " tokens present" };
    }
  },
  {
    id: 10, name: "V-55-10: 00-overview body prose does NOT contain anti-scope-creep tokens (REQ traceability firewall)",
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
        "Win32ContentPrepTool", "\\.intunewin", "Required assignment", "Replace vs Update",
        "Installomator", "Intuneomator", "OEMConfig", "MGP private track", "AMAPI", "reclamation"
      ];
      const violations = forbidden.filter(tok => new RegExp(tok).test(stripped));
      if (violations.length > 0) return { pass: false, detail: "Anti-scope-creep tokens found in body prose: " + violations.join(", ") };
      return { pass: true, detail: "REQ traceability firewall holds (zero forbidden tokens in body prose)" };
    }
  },

  // === 01-WINDOWS: SUPERSEDENCE + DEPENDENCY + CONTENTPREPTOOL (V-55-11..15) ===
  {
    id: 11, name: "V-55-11: 01-windows has ## Supersedence H2 + behavior matrix (Available/Required × Uninstall/Replace)",
    run() {
      const c = readFile(WIN);
      if (c === null) return { pass: false, detail: "File missing: " + WIN };
      const h2Match = c.match(/^## Supersedence(\s+\{#[a-z0-9-]+\})?\s*$/m);
      if (!h2Match) return { pass: false, detail: "## Supersedence H2 missing" };
      const h2Idx = c.indexOf(h2Match[0]);
      const window = c.slice(h2Idx, h2Idx + 3000);
      // Behavior matrix: cells covering Available + Required × Uninstall + Replace
      const required = ["Available", "Required", "Uninstall", "Replace"];
      const missing = required.filter(s => !window.includes(s));
      if (missing.length > 0) return { pass: false, detail: "Supersedence behavior matrix tokens missing: " + missing.join(", ") };
      return { pass: true, detail: "Supersedence H2 + behavior matrix tokens present" };
    }
  },
  {
    id: 12, name: "V-55-12: 01-windows has > ⚠️ Required-assignment exception callout within ~30 lines of Supersedence behavior matrix",
    run() {
      const c = readFile(WIN);
      if (c === null) return { pass: false, detail: "File missing: " + WIN };
      const h2Match = c.match(/^## Supersedence/m);
      if (!h2Match) return { pass: false, detail: "## Supersedence H2 missing" };
      const h2Idx = c.indexOf(h2Match[0]);
      const window = c.slice(h2Idx, h2Idx + 3000);  // ~30 lines = ~3000 bytes
      // Callout pattern: > ⚠️ ... Required-assignment exception (or Required assignment exception)
      const calloutMatch = window.match(/>\s*\u26a0\ufe0f[^\n]*Required[\s-]assignment exception/);
      if (!calloutMatch) return { pass: false, detail: "Required-assignment exception callout missing within ~30 lines of ## Supersedence H2" };
      return { pass: true, detail: "Required-assignment exception callout present and adjacent to behavior matrix" };
    }
  },
  {
    id: 13, name: "V-55-13: 01-windows has ## Dependency Graphs H2 + max-100 + circular + ≥10-node graph artifact",
    run() {
      const c = readFile(WIN);
      if (c === null) return { pass: false, detail: "File missing: " + WIN };
      if (!/^## Dependency Graphs(\s+\{#[a-z0-9-]+\})?\s*$/m.test(c))
        return { pass: false, detail: "## Dependency Graphs H2 missing" };
      if (!/(100 dependencies|max 100|maximum of 100)/.test(c))
        return { pass: false, detail: "100 dependencies (or max 100 / maximum of 100) literal missing" };
      if (!/\bcircular\b/i.test(c)) return { pass: false, detail: "circular literal missing" };
      // 10-node subgraph check: count node-shape patterns within Dependency Graphs H2 scope
      const h2Idx = c.search(/^## Dependency Graphs/m);
      const window = c.slice(h2Idx, h2Idx + 5000);
      // Heuristic: look for ≥10 node-shape occurrences. Accept any of:
      //   (a) Mermaid `[NodeName]` brackets,
      //   (b) Mermaid arrow notation `Node-->Node`,
      //   (c) Image link `![alt](path)` (image-rendered subgraph artifact),
      //   (d) ASCII art with dash-separated identifiers like `App-Current`, `Runtime-A`, `Runtime-A-Sub`,
      //   (e) Backtick-wrapped identifiers `App-X`.
      // Pattern (d) is the dominant form in the current content (ASCII art with named nodes).
      // Use a regex that matches PascalCase or App/Runtime-style identifiers with dashes/digits.
      const bracketNodes = (window.match(/\[[A-Za-z0-9 _-]+\]/g) || []).length;
      const backtickNodes = (window.match(/`[A-Za-z0-9._-]+`/g) || []).length;
      const imageLinks = (window.match(/!\[[^\]]*\]\([^)]+\)/g) || []).length;
      // ASCII art identifiers: capitalized word followed by dash + word/digit (e.g., App-Current, Runtime-A-Sub, App-Old-v1)
      const asciiIds = [...new Set((window.match(/\b[A-Z][A-Za-z]+(?:-[A-Za-z0-9]+)+\b/g) || []))];
      const nodePatterns = bracketNodes + backtickNodes + imageLinks + asciiIds.length;
      if (nodePatterns < 10) return { pass: false, detail: "Combined supersedence+dependency 10-node subgraph not found; only " + nodePatterns + " node-shape patterns in H2 scope (bracket=" + bracketNodes + ", backtick=" + backtickNodes + ", image=" + imageLinks + ", ascii-unique=" + asciiIds.length + ")" };
      return { pass: true, detail: "Dependency Graphs H2 + max-100 + circular + " + nodePatterns + "-node subgraph present (bracket=" + bracketNodes + ", backtick=" + backtickNodes + ", image=" + imageLinks + ", ascii-unique=" + asciiIds.length + ")" };
    }
  },
  {
    id: 14, name: "V-55-14: 01-windows has ## ContentPrepTool Packaging H2 + .intunewin + 4 detection rule types",
    run() {
      const c = readFile(WIN);
      if (c === null) return { pass: false, detail: "File missing: " + WIN };
      if (!/^## ContentPrepTool Packaging(\s+\{#[a-z0-9-]+\})?\s*$/m.test(c))
        return { pass: false, detail: "## ContentPrepTool Packaging H2 missing" };
      if (!c.includes(".intunewin")) return { pass: false, detail: ".intunewin literal missing" };
      const ruleTypes = ["MSI", "file", "registry", "PowerShell"];
      const missing = ruleTypes.filter(s => !new RegExp("\\b" + s + "\\b", "i").test(c));
      if (missing.length > 0) return { pass: false, detail: "Detection rule type literals missing: " + missing.join(", ") };
      return { pass: true, detail: "ContentPrepTool H2 + .intunewin + 4 detection rule types present" };
    }
  },
  {
    id: 15, name: "V-55-15: 01-windows has MSIX-no-supersedence disclaimer (STACK.md:234)",
    run() {
      const c = readFile(WIN);
      if (c === null) return { pass: false, detail: "File missing: " + WIN };
      if (!c.includes("MSIX")) return { pass: false, detail: "MSIX literal missing" };
      if (!/(does NOT support supersedence|do NOT support supersedence|does not support supersedence|do not support supersedence|can only be applied to Win32)/.test(c))
        return { pass: false, detail: "MSIX-no-supersedence disclaimer missing" };
      return { pass: true, detail: "MSIX-no-supersedence disclaimer present" };
    }
  },

  // === 02-MACOS: APP TYPES + COMMUNITY-PATTERN CALLOUT (V-55-16..17) ===
  {
    id: 16, name: "V-55-16: 02-macos covers all 6 macOS app-type variants (LOB PKG / unmanaged PKG / DMG / Apple Developer ID Installer / VPP / Mac App Store / ABM)",
    run() {
      const c = readFile(MAC);
      if (c === null) return { pass: false, detail: "File missing: " + MAC };
      const required = ["LOB PKG", "unmanaged PKG", "DMG", "Apple Developer ID Installer", "VPP", "Mac App Store"];
      const missing = required.filter(s => !c.includes(s));
      if (missing.length > 0) return { pass: false, detail: "macOS app-type literals missing: " + missing.join(", ") };
      // ABM (or Apple Business Manager) — accept either form
      if (!/(ABM|Apple Business Manager)/.test(c)) return { pass: false, detail: "ABM (or Apple Business Manager) literal missing" };
      return { pass: true, detail: "all 6 macOS app-type variants covered" };
    }
  },
  {
    id: 17, name: "V-55-17: 02-macos has > 📋 Community pattern — MEDIUM confidence callout + Installomator + Intuneomator + NEGATIVE bare-blockquote",
    run() {
      const c = readFile(MAC);
      if (c === null) return { pass: false, detail: "File missing: " + MAC };
      // POSITIVE: blockquote with em-dash OR hyphen-dash variant
      const blockquoteMatch = c.match(/^>\s*\u{1F4CB} Community pattern\s*[\u2014\-]\s*MEDIUM confidence/mu);
      if (!blockquoteMatch) return { pass: false, detail: "> 📋 Community pattern — MEDIUM confidence callout missing (em-dash or hyphen)" };
      // POSITIVE: Installomator + Intuneomator within ~3000-byte window of callout
      const calloutIdx = c.indexOf(blockquoteMatch[0]);
      const window = c.slice(calloutIdx, calloutIdx + 3000);
      if (!window.includes("Installomator")) return { pass: false, detail: "Installomator literal missing within ~30 lines of MEDIUM confidence callout" };
      if (!window.includes("Intuneomator")) return { pass: false, detail: "Intuneomator literal missing within ~30 lines of MEDIUM confidence callout" };
      // NEGATIVE: zero bare > 📋 blockquotes without "Community pattern" qualifier
      const bareMatches = [...c.matchAll(/^>\s*\u{1F4CB}\s+(?!Community pattern)/gmu)];
      if (bareMatches.length > 0) return { pass: false, detail: bareMatches.length + " bare '> 📋' blockquote(s) found without 'Community pattern' qualifier" };
      return { pass: true, detail: "MEDIUM confidence callout + Installomator + Intuneomator present; zero bare-blockquote violations" };
    }
  },

  // === 03-IOS: VPP TABLE + RECLAMATION + NO-MERMAID + CROSS-LINK (V-55-18..21) ===
  {
    id: 18, name: "V-55-18: 03-ios has 2-column VPP comparison table (VPP Device-Licensed | VPP User-Licensed)",
    run() {
      const c = readFile(IOS);
      if (c === null) return { pass: false, detail: "File missing: " + IOS };
      // 2-column table header pattern (either order)
      const headerMatch = /\|[^\n]*(VPP\s+)?Device-Licensed[^\n]*\|[^\n]*(VPP\s+)?User-Licensed[^\n]*\|/.test(c)
        || /\|[^\n]*(VPP\s+)?User-Licensed[^\n]*\|[^\n]*(VPP\s+)?Device-Licensed[^\n]*\|/.test(c);
      if (!headerMatch) return { pass: false, detail: "2-column VPP comparison table headers (VPP Device-Licensed | VPP User-Licensed) missing" };
      return { pass: true, detail: "2-column VPP comparison table headers present" };
    }
  },
  {
    id: 19, name: "V-55-19: 03-ios has reclamation literals (retire/wipe + device license; remove app + user license)",
    run() {
      const c = readFile(IOS);
      if (c === null) return { pass: false, detail: "File missing: " + IOS };
      const retireWipe = /(retire\/wipe|retire and wipe)/i.test(c);
      const deviceLicense = /(device license|device-license|Device-Licensed)/i.test(c);
      const removeApp = /(remove app|remove-app|removing the app)/i.test(c);
      const userLicense = /(user license|user-license|User-Licensed)/i.test(c);
      const missing = [];
      if (!retireWipe) missing.push("retire/wipe (or retire and wipe)");
      if (!deviceLicense) missing.push("device license (or device-license)");
      if (!removeApp) missing.push("remove app (or remove-app)");
      if (!userLicense) missing.push("user license (or user-license)");
      if (missing.length > 0) return { pass: false, detail: "Reclamation literals missing: " + missing.join(", ") };
      return { pass: true, detail: "all 4 reclamation literals (retire/wipe + device license; remove app + user license) present" };
    }
  },
  {
    id: 20, name: "V-55-20: 03-ios has ZERO Mermaid code blocks (Phase 54 iOS sibling pattern parity per CDI-Phase55-06)",
    run() {
      const c = readFile(IOS);
      if (c === null) return { pass: false, detail: "File missing: " + IOS };
      const mermaidCount = (c.match(/^```mermaid/gm) || []).length;
      if (mermaidCount > 0) return { pass: false, detail: mermaidCount + " Mermaid code block(s) found; Phase 55 iOS file must have zero per D-09 + CDI-Phase55-06" };
      return { pass: true, detail: "zero Mermaid code blocks (Phase 54 iOS sibling pattern parity preserved)" };
    }
  },
  {
    id: 21, name: "V-55-21: 03-ios contains cross-link to v1.3 admin-setup-ios/05-app-deployment.md",
    run() {
      const c = readFile(IOS);
      if (c === null) return { pass: false, detail: "File missing: " + IOS };
      if (!c.includes("../../admin-setup-ios/05-app-deployment.md"))
        return { pass: false, detail: "Cross-link `../../admin-setup-ios/05-app-deployment.md` missing" };
      // Verify cross-link target exists (anti-duplication contract requires the target be reachable)
      const targetContent = readFile(IOS_V13_APP_DEPLOY);
      if (targetContent === null) return { pass: false, detail: "Cross-link target file missing: " + IOS_V13_APP_DEPLOY };
      return { pass: true, detail: "cross-link to v1.3 iOS app deployment present + target reachable" };
    }
  },

  // === 04-ANDROID: MGP + ZEBRA OEMCONFIG + CROSS-LINK + OPERATE VERBS (V-55-22..25) ===
  {
    id: 22, name: "V-55-22: 04-android has ## Managed Google Play Private App Publishing H2 + private track + web app + AMAPI + 2024",
    run() {
      const c = readFile(AND_);
      if (c === null) return { pass: false, detail: "File missing: " + AND_ };
      if (!/^## Managed Google Play Private App Publishing(\s+\{#[a-z0-9-]+\})?\s*$/m.test(c))
        return { pass: false, detail: "## Managed Google Play Private App Publishing H2 missing" };
      if (!/(private track|private app track)/.test(c))
        return { pass: false, detail: "private track (or private app track) literal missing" };
      if (!/(web app|web clip)/.test(c))
        return { pass: false, detail: "web app (or web clip) literal missing" };
      if (!c.includes("AMAPI")) return { pass: false, detail: "AMAPI literal missing" };
      if (!c.includes("2024")) return { pass: false, detail: "2024 literal missing" };
      return { pass: true, detail: "MGP H2 + 4 literals (private track / web app / AMAPI / 2024) present" };
    }
  },
  {
    id: 23, name: "V-55-23: 04-android has ## Zebra OEMConfig peer H2 + APK side-load + NOT via Managed Google Play",
    run() {
      const c = readFile(AND_);
      if (c === null) return { pass: false, detail: "File missing: " + AND_ };
      if (!/^## Zebra OEMConfig/m.test(c)) return { pass: false, detail: "## Zebra OEMConfig H2 missing" };
      if (!c.includes("OEMConfig")) return { pass: false, detail: "OEMConfig literal missing" };
      if (!/(APK side-load|APK push)/i.test(c))
        return { pass: false, detail: "APK side-load (or APK push) literal missing" };
      if (!/(NOT via Managed Google Play|NOT Managed Google Play)/.test(c))
        return { pass: false, detail: "NOT via Managed Google Play (or NOT Managed Google Play) literal missing" };
      return { pass: true, detail: "Zebra OEMConfig peer H2 + 3 literals (OEMConfig / APK side-load / NOT via MGP) present" };
    }
  },
  {
    id: 24, name: "V-55-24: 04-android contains cross-link to docs/admin-setup-android/10-aosp-zebra.md (Phase 45 SSoT)",
    run() {
      const c = readFile(AND_);
      if (c === null) return { pass: false, detail: "File missing: " + AND_ };
      if (!c.includes("../../admin-setup-android/10-aosp-zebra.md"))
        return { pass: false, detail: "Cross-link `../../admin-setup-android/10-aosp-zebra.md` missing" };
      // Verify cross-link target exists (D-10 SSoT preservation)
      const targetContent = readFile(ZEBRA_PHASE45);
      if (targetContent === null) return { pass: false, detail: "Cross-link target file missing: " + ZEBRA_PHASE45 };
      return { pass: true, detail: "cross-link to Phase 45 Zebra SSoT present + target reachable" };
    }
  },
  {
    id: 25, name: "V-55-25: 04-android Zebra OEMConfig H2 contains 3-bullet operate-the-lifecycle list (update / revoke / troubleshoot)",
    run() {
      const c = readFile(AND_);
      if (c === null) return { pass: false, detail: "File missing: " + AND_ };
      const h2Match = c.match(/^## Zebra OEMConfig/m);
      if (!h2Match) return { pass: false, detail: "## Zebra OEMConfig H2 missing" };
      const h2Idx = c.indexOf(h2Match[0]);
      // Window: from this H2 to the next ## H2 (or end of file)
      const afterH2 = c.slice(h2Idx + 5);
      const nextH2 = afterH2.search(/^## /m);
      const window = nextH2 > 0 ? c.slice(h2Idx, h2Idx + 5 + nextH2) : c.slice(h2Idx);
      const verbs = ["update", "revoke", "troubleshoot"];
      const missing = verbs.filter(v => !new RegExp("\\b" + v + "\\b", "i").test(window));
      if (missing.length > 0) return { pass: false, detail: "Operate-the-lifecycle verbs missing within Zebra OEMConfig H2 scope: " + missing.join(", ") };
      return { pass: true, detail: "all 3 operate verbs (update / revoke / troubleshoot) present within Zebra OEMConfig H2 scope" };
    }
  },

  // === SHARED PATTERNS: INLINE BLOCKQUOTE + BARE-PLATFORM NEGATIVE (V-55-26..27) ===
  {
    id: 26, name: "V-55-26: all 5 app-lifecycle files have > **Platform applicability:** blockquote within first 50 lines of body (post-frontmatter)",
    run() {
      const failures = [];
      for (const f of APP_FILES) {
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
    id: 27, name: "V-55-27: corpus-wide NEGATIVE — zero bare > **Platform:** tokens (lexicon-family preservation per Phase 54 D-17 inheritance)",
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

  // === REGRESSION GUARDS + CROSS-LINKS (V-55-28..29) ===
  {
    id: 28, name: "V-55-28: ops/00-index.md does NOT contain ## App Lifecycle H2 (Phase 55 cross-references only; Phase 59 owns hub integration)",
    run() {
      const c = readFile(OPS_INDEX);
      if (c === null) return { pass: false, detail: "File missing: " + OPS_INDEX };
      if (/^## App Lifecycle\s*$/m.test(c) || /^## App-?Lifecycle/m.test(c))
        return { pass: false, detail: "## App Lifecycle H2 found in ops/00-index.md — Phase 55 must NOT amend per DPO-Phase53-01 + DPO-Phase54-02 + V-55-28" };
      return { pass: true, detail: "ops/00-index.md not amended (Phase 59 owns hub integration)" };
    }
  },
  {
    id: 29, name: "V-55-29: 01-windows contains cross-link to docs/reference/win32-app-packaging.md",
    run() {
      const c = readFile(WIN);
      if (c === null) return { pass: false, detail: "File missing: " + WIN };
      if (!c.includes("../../reference/win32-app-packaging.md"))
        return { pass: false, detail: "Cross-link `../../reference/win32-app-packaging.md` missing" };
      const targetContent = readFile(WIN32_REF);
      if (targetContent === null) return { pass: false, detail: "Cross-link target file missing: " + WIN32_REF };
      return { pass: true, detail: "cross-link to win32-app-packaging.md present + target reachable" };
    }
  },

  // === TBD SCAN + MULTI-PLATFORM FRONTMATTER + ATOMICITY CROSS-CHECK (V-55-30..32) ===
  {
    id: 30, name: "V-55-30: NEGATIVE — no TBD/TODO/FIXME/XXX/PLACEHOLDER tokens in any of 5 app-lifecycle files",
    run() {
      const failures = [];
      const banned = /\b(TBD|TODO|FIXME|XXX|PLACEHOLDER)\b/;
      for (const f of APP_FILES) {
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
  {
    id: 31, name: "V-55-31: SC#5 multi-platform frontmatter — all 5 files carry valid platform: frontmatter (parallel of V-55-07)",
    run() {
      // V-55-31 is essentially V-55-07's SC#5 mapping — kept as separate ID per CONTEXT D-17 line 115
      const failures = [];
      const validValues = {
        [OV]:  /(cross-platform|Windows,\s*macOS,\s*iOS,\s*Android)/,
        [WIN]: /Windows/,
        [MAC]: /macOS/,
        [IOS]: /iOS/,
        [AND_]: /Android/
      };
      for (const f of APP_FILES) {
        const c = readFile(f);
        if (c === null) { failures.push(f + ": file missing"); continue; }
        const fmMatch = c.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/m);
        if (!fmMatch) { failures.push(f + ": no frontmatter"); continue; }
        const fm = fmMatch[1];
        const platMatch = fm.match(/^platform:\s*(.+?)\s*$/m);
        if (!platMatch) { failures.push(f + ": platform field missing"); continue; }
        if (!validValues[f].test(platMatch[1])) failures.push(f + ": platform value '" + platMatch[1] + "' invalid for this file");
      }
      if (failures.length === 0) return { pass: true, detail: "all 5 files have valid multi-platform-aware frontmatter (SC#5 satisfied)" };
      return { pass: false, detail: failures.join(" | ") };
    }
  },
  {
    id: 32, name: "V-55-32: cross-link runtime conjunction (V-55-21 + V-55-24 + V-55-29 must all PASS together — strengthens CONTEXT D-17 line 116 plan-time marker)",
    run() {
      // Runtime atomicity-coupling cross-check (STRENGTHENS the plan-time-only marker
      // described in CONTEXT D-17 line 116). If any of V-55-21/24/29 degrade between
      // commits, V-55-32 surfaces it as a dedicated atomicity-coupling FAIL with
      // named diagnostics. Mechanically equivalent — no CONTEXT amendment required.
      const ios = readFile(IOS);
      const and_ = readFile(AND_);
      const win = readFile(WIN);
      if (!ios || !and_ || !win) return { pass: false, detail: "One or more app-lifecycle files missing" };
      const conditions = [
        { ok: ios.includes("../../admin-setup-ios/05-app-deployment.md"), name: "V-55-21 iOS cross-link" },
        { ok: and_.includes("../../admin-setup-android/10-aosp-zebra.md"), name: "V-55-24 Android cross-link" },
        { ok: win.includes("../../reference/win32-app-packaging.md"), name: "V-55-29 Windows cross-link" }
      ];
      const failed = conditions.filter(c => !c.ok).map(c => c.name);
      if (failed.length > 0) return { pass: false, detail: "Cross-link conjunction fails: " + failed.join(", ") };
      return { pass: true, detail: "all 3 cross-links present (V-55-21 + V-55-24 + V-55-29)" };
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
