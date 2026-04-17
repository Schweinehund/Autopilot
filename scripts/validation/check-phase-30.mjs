#!/usr/bin/env node
// Phase 30 static validation harness
// Source of truth: .planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md
// NO SHELL: all file content via fs.readFileSync; external tools via execFileSync with argv arrays

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';

const argv = process.argv.slice(2);
const QUICK = argv.includes('--quick');
const VERBOSE = argv.includes('--verbose');

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8');
}

function walkMd(dir) {
  const abs = join(process.cwd(), dir);
  if (!existsSync(abs)) return [];
  const results = [];
  function walk(current) {
    let entries;
    try { entries = readdirSync(current); } catch { return; }
    for (const entry of entries) {
      const full = join(current, entry);
      let stat;
      try { stat = statSync(full); } catch { continue; }
      if (stat.isDirectory()) { walk(full); }
      else if (entry.endsWith('.md')) { results.push(full); }
    }
  }
  walk(abs);
  return results;
}

function resolveRunbooks() {
  const dir = join(process.cwd(), 'docs/l1-runbooks');
  let entries = [];
  try { entries = readdirSync(dir); } catch { return []; }
  return ['16','17','18','19','20','21'].map(n => {
    const found = entries.find(f => new RegExp('^' + n + '-ios-.*\.md$').test(f));
    return { num: n, path: found ? join(dir, found) : null };
  });
}

const checks = [
  {
    id: 1, name: "Decision tree <=5 decision-diamond nodes",
    type: "file-match-count", required: true,
    run() {
      const content = readFile("docs/decision-trees/07-ios-triage.md");
      if (content === null) return { pass: false, detail: "File does not exist: docs/decision-trees/07-ios-triage.md" };
      const matches = content.match(/^\s*IOS\d+\{/gm) || [];
      const count = matches.length;
      if (count >= 1 && count <= 5) return { pass: true, detail: count + " decision-diamond node(s) found" };
      return { pass: false, detail: "Expected 1-5 decision-diamond nodes, found " + count };
    }
  },
  {
    id: 2, name: "Single-branch integration (00-initial-triage no iOS in Mermaid)",
    type: "file-absent-match", required: true,
    run() {
      const content = readFile("docs/decision-trees/00-initial-triage.md");
      if (content === null) return { pass: false, detail: "File does not exist: docs/decision-trees/00-initial-triage.md" };
      const mermaidBlocks = [];
      const re = new RegExp("```mermaid\n([\s\S]*?)\n```", "g");
      let m;
      while ((m = re.exec(content)) !== null) mermaidBlocks.push(m[1]);
      const blockText = mermaidBlocks.join("\n");
      const hits = (blockText.match(/iOS|iPadOS|IOS\d+/gi) || []).length;
      if (hits === 0) return { pass: true, detail: "No iOS/IOS tokens inside Mermaid block" };
      return { pass: false, detail: "Found " + hits + " iOS/IOS token(s) inside Mermaid block -- violates SC #2" };
    }
  },
  {
    id: 3, name: "6 runbooks have ## Symptom H2",
    type: "multi-file-contains", required: true,
    run() {
      const runbooks = resolveRunbooks();
      const missing = runbooks.filter(r => {
        if (!r.path) return true;
        const content = readFileSync(r.path, "utf8");
        return !/^## Symptom\s*$/m.test(content);
      });
      if (missing.length === 0) return { pass: true, detail: "All 6 runbooks have ## Symptom" };
      const nums = missing.map(r => r.path ? r.num : r.num + " (file not found)").join(", ");
      return { pass: false, detail: "missing: " + nums };
    }
  },
  {
    id: 4, name: "Exactly 1 runbook has ## User Action Required (runbook 21 only)",
    type: "multi-file-count-contains", required: true,
    run() {
      const runbooks = resolveRunbooks();
      const withSection = runbooks.filter(r => {
        if (!r.path) return false;
        const content = readFileSync(r.path, "utf8");
        return /^## User Action Required\s*$/m.test(content);
      });
      const count = withSection.length;
      if (count === 1) return { pass: true, detail: "Exactly 1 runbook has ## User Action Required (runbook " + withSection[0].num + ")" };
      if (count === 0) {
        const allMissing = runbooks.every(r => !r.path);
        if (allMissing) return { pass: false, detail: "No runbook files found yet (0 of 6 exist)" };
        return { pass: false, detail: "0 runbooks have ## User Action Required (expected: runbook 21 only)" };
      }
      const nums = withSection.map(r => r.num).join(", ");
      return { pass: false, detail: count + " runbooks have ## User Action Required: [" + nums + "] -- expected only runbook 21" };
    }
  },
  {
    id: 5, name: "Zero placeholder strings in docs/admin-setup-ios/",
    type: "recursive-string-absent", required: true,
    run() {
      const files = walkMd("docs/admin-setup-ios");
      if (files.length === 0) return { pass: false, detail: "docs/admin-setup-ios/ does not exist or has no .md files" };
      const hits = [];
      for (const f of files) {
        const content = readFileSync(f, "utf8");
        if (content.includes("iOS L1 runbooks (Phase 30)")) hits.push(f.replace(process.cwd(), "."));
      }
      if (hits.length === 0) return { pass: true, detail: "No placeholder strings remaining" };
      return { pass: false, detail: "Placeholder still present in: " + hits.join(", ") };
    }
  },
  {
    id: 6, name: "Line 243 of 07-device-enrollment.md has no Phase 30 or will live",
    type: "line-content", required: true,
    run() {
      const content = readFile("docs/admin-setup-ios/07-device-enrollment.md");
      if (content === null) return { pass: false, detail: "File does not exist: docs/admin-setup-ios/07-device-enrollment.md" };
      const lines = content.split("\n");
      if (lines.length < 243) return { pass: false, detail: "File has only " + lines.length + " lines (need at least 243)" };
      const line243 = lines[242];
      const hasPhase30 = line243.includes("Phase 30");
      const hasWillLive = line243.includes("will live");
      if (!hasPhase30 && !hasWillLive) return { pass: true, detail: "Line 243: \"" + line243.trim() + "\"" };
      const found = [hasPhase30 && "\"Phase 30\"", hasWillLive && "\"will live\""].filter(Boolean).join(" and ");
      return { pass: false, detail: "Line 243 still contains " + found + ": \"" + line243.trim() + "\"" };
    }
  },
  {
    id: 7, name: "6 runbook files exist at docs/l1-runbooks/{16-21}-ios-*.md",
    type: "file-exists", required: true,
    run() {
      const names = [
        "16-ios-apns-expired.md","17-ios-ade-not-starting.md",
        "18-ios-enrollment-restriction-blocking.md","19-ios-license-invalid.md",
        "20-ios-device-cap-reached.md","21-ios-compliance-blocked.md"
      ];
      const missing = names.filter(n => !existsSync(join(process.cwd(), "docs/l1-runbooks", n)));
      if (missing.length === 0) return { pass: true, detail: "All 6 runbook files exist" };
      return { pass: false, detail: "Missing: " + missing.join(", ") };
    }
  },
  {
    id: 8, name: "docs/decision-trees/07-ios-triage.md exists",
    type: "file-exists", required: true,
    run() {
      const exists = existsSync(join(process.cwd(), "docs/decision-trees/07-ios-triage.md"));
      if (exists) return { pass: true, detail: "File exists" };
      return { pass: false, detail: "docs/decision-trees/07-ios-triage.md does not exist" };
    }
  },
  {
    id: 9, name: "docs/l1-runbooks/00-index.md contains ## iOS L1 Runbooks",
    type: "file-match-count", required: true,
    run() {
      const content = readFile("docs/l1-runbooks/00-index.md");
      if (content === null) return { pass: false, detail: "File does not exist: docs/l1-runbooks/00-index.md" };
      const matches = content.match(/^## iOS L1 Runbooks\s*$/m) || [];
      const count = matches.length;
      if (count === 1) return { pass: true, detail: "## iOS L1 Runbooks section found" };
      if (count === 0) return { pass: false, detail: "## iOS L1 Runbooks section not found in 00-index.md" };
      return { pass: false, detail: "Expected exactly 1 occurrence, found " + count };
    }
  },
  {
    id: 10, name: "l1-template.md contains Windows | macOS | iOS | all",
    type: "file-contains", required: true,
    run() {
      const content = readFile("docs/_templates/l1-template.md");
      if (content === null) return { pass: false, detail: "File does not exist: docs/_templates/l1-template.md" };
      if (content.includes("Windows | macOS | iOS | all")) return { pass: true, detail: "Enum string present" };
      return { pass: false, detail: "\"Windows | macOS | iOS | all\" not found in l1-template.md" };
    }
  },
  {
    id: 11, name: "Each runbook frontmatter: last_verified, review_by, audience: L1, platform: iOS",
    type: "frontmatter", required: true,
    run() {
      const runbooks = resolveRunbooks();
      const failures = [];
      for (const r of runbooks) {
        if (!r.path) { failures.push(r.num + ": file not found"); continue; }
        const content = readFileSync(r.path, "utf8");
        const first20 = content.split("\n").slice(0, 20).join("\n");
        const fmMatch = first20.match(/^---\n([\s\S]*?)\n---/m);
        if (!fmMatch) { failures.push(r.num + ": no frontmatter found"); continue; }
        const fm = fmMatch[1];
        const issues = [];
        if (!/^last_verified:\s*\d{4}-\d{2}-\d{2}\s*$/m.test(fm)) issues.push("last_verified missing or invalid");
        if (!/^review_by:\s*\d{4}-\d{2}-\d{2}\s*$/m.test(fm)) issues.push("review_by missing or invalid");
        if (!/^audience:\s*L1\s*$/m.test(fm)) issues.push("audience: L1 missing");
        if (!/^platform:\s*iOS\s*$/m.test(fm)) issues.push("platform: iOS missing");
        if (issues.length > 0) failures.push("runbook " + r.num + ": " + issues.join("; "));
      }
      if (failures.length === 0) return { pass: true, detail: "All 6 runbooks have valid frontmatter" };
      return { pass: false, detail: failures.join(" | ") };
    }
  },
  {
    id: 12, name: "Each runbook has exactly 1 Platform gate line within first 12 body lines",
    type: "file-line-occurrence", required: true,
    run() {
      const runbooks = resolveRunbooks();
      const failures = [];
      for (const r of runbooks) {
        if (!r.path) { failures.push(r.num + ": file not found"); continue; }
        const content = readFileSync(r.path, "utf8");
        const lines = content.split("\n");
        let fmEnd = -1, fenceCount = 0;
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].trim() === "---") { fenceCount++; if (fenceCount === 2) { fmEnd = i; break; } }
        }
        if (fmEnd === -1) { failures.push(r.num + ": no frontmatter end fence"); continue; }
        const bodyStart = fmEnd + 1;
        const windowLines = lines.slice(bodyStart, Math.min(bodyStart + 12, lines.length));
        const allMatches = lines.filter(l => /^> \*\*Platform gate:\*\*/.test(l));
        if (allMatches.length !== 1) {
          failures.push("runbook " + r.num + ": " + allMatches.length + " Platform gate lines (expected exactly 1)");
          continue;
        }
        const inWindow = windowLines.some(l => /^> \*\*Platform gate:\*\*/.test(l));
        if (!inWindow) {
          const actualIdx = lines.findIndex(l => /^> \*\*Platform gate:\*\*/.test(l));
          failures.push("runbook " + r.num + ": Platform gate at body line " + (actualIdx - bodyStart + 1) + " (expected within first 12)");
        }
      }
      if (failures.length === 0) return { pass: true, detail: "All 6 runbooks pass Platform gate check" };
      return { pass: false, detail: failures.join(" | ") };
    }
  },
  {
    id: 13, name: "Mermaid syntax valid + markdown links resolve (external tools)",
    type: "external", required: true,
    run() {
      const runbookPaths = [
        "docs/l1-runbooks/16-ios-apns-expired.md",
        "docs/l1-runbooks/17-ios-ade-not-starting.md",
        "docs/l1-runbooks/18-ios-enrollment-restriction-blocking.md",
        "docs/l1-runbooks/19-ios-license-invalid.md",
        "docs/l1-runbooks/20-ios-device-cap-reached.md",
        "docs/l1-runbooks/21-ios-compliance-blocked.md"
      ].filter(p => existsSync(join(process.cwd(), p)));
      const triagePath = "docs/decision-trees/07-ios-triage.md";
      const triageExists = existsSync(join(process.cwd(), triagePath));
      const linkTargets = [...(triageExists ? [triagePath] : []), ...runbookPaths];
      const results = { linkCheck: null, mermaid: null };
      if (linkTargets.length > 0) {
        try {
          execFileSync("npx", ["--yes", "--no-install", "markdown-link-check", ...linkTargets],
            { stdio: "pipe", timeout: 30000, cwd: process.cwd() });
          results.linkCheck = "PASS";
        } catch (err) {
          const stderr = err.stderr ? err.stderr.toString() : "";
          const isMissing = err.code === "ENOENT" || err.status === 127
            || stderr.includes("not found") || stderr.includes("Could not resolve")
            || stderr.includes("npm error could not determine executable");
          results.linkCheck = isMissing ? "SKIPPED" : "FAIL";
        }
      } else { results.linkCheck = "SKIPPED"; }
      if (triageExists) {
        try {
          execFileSync("npx", ["--yes", "--no-install", "@mermaid-js/mermaid-cli", "-i", triagePath, "--quiet"],
            { stdio: "pipe", timeout: 30000, cwd: process.cwd() });
          results.mermaid = "PASS";
        } catch (err) {
          const stderr = err.stderr ? err.stderr.toString() : "";
          const isMissing = err.code === "ENOENT" || err.status === 127
            || stderr.includes("not found") || stderr.includes("Could not resolve")
            || stderr.includes("npm error could not determine executable");
          results.mermaid = isMissing ? "SKIPPED" : "FAIL";
        }
      } else { results.mermaid = "SKIPPED"; }
      const lbl = "markdown-link-check: " + results.linkCheck + "; mermaid-cli: " + results.mermaid;
      const anyFail = results.linkCheck === "FAIL" || results.mermaid === "FAIL";
      const bothSkipped = results.linkCheck === "SKIPPED" && results.mermaid === "SKIPPED";
      if (anyFail) return { pass: false, skipped: false, detail: lbl };
      if (bothSkipped) return { pass: true, skipped: true, detail: lbl + " (binaries unavailable)" };
      return { pass: true, skipped: results.linkCheck === "SKIPPED" || results.mermaid === "SKIPPED", detail: lbl };
    }
  }
];

const LABEL_WIDTH = 56;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + " ";
  return s + " " + ".".repeat(LABEL_WIDTH - s.length) + " ";
}

let passed = 0, failed = 0, skipped = 0;
const activeChecks = QUICK ? checks.filter(c => c.type !== "external") : checks;

for (const check of activeChecks) {
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

if (QUICK) {
  const extCheck = checks.find(c => c.type === "external");
  if (extCheck) {
    process.stdout.write(padLabel("[" + extCheck.id + "/" + checks.length + "] " + extCheck.name) + "SKIPPED (--quick flag)\n");
    skipped++;
  }
}

process.stdout.write("\nSummary: " + passed + " passed, " + failed + " failed, " + skipped + " skipped\n");
process.exit(failed > 0 ? 1 : 0);
