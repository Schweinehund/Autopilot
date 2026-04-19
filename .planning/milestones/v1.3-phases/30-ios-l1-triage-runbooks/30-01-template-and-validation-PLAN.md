---
phase: 30-ios-l1-triage-runbooks
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - docs/_templates/l1-template.md
  - scripts/validation/check-phase-30.mjs
autonomous: true
requirements: [L1TS-02]
must_haves:
  truths:
    - "The L1 template permits `platform: iOS` as a valid enum value (D-24 — hard prerequisite for all subsequent iOS runbook creation)"
    - "A single validation script runs all 13 static checks defined in 30-VALIDATION.md with one command and exits non-zero on any failure"
    - "The validation script fails in its initial state because downstream Wave 2/3 artifacts do not yet exist (Nyquist: tests exist before the implementation they verify)"
  artifacts:
    - path: "docs/_templates/l1-template.md"
      provides: "L1 template with iOS added to platform enum"
      contains: "Windows | macOS | iOS | all"
    - path: "scripts/validation/check-phase-30.mjs"
      provides: "Single-command validator for all 13 Phase 30 static checks"
      exports: ["node scripts/validation/check-phase-30.mjs CLI entry point"]
  key_links:
    - from: "docs/l1-runbooks/16-ios-apns-expired.md (future)"
      to: "docs/_templates/l1-template.md `platform:` enum"
      via: "YAML frontmatter `platform: iOS` declaration"
      pattern: "platform:\\s*iOS"
    - from: "CI / reviewer"
      to: "All Phase 30 artifacts"
      via: "check-phase-30.mjs static-check runner"
      pattern: "check-phase-30"
---

<objective>
Extend the shared L1 template to permit `platform: iOS` and scaffold the Phase 30 validation harness. These two tasks are Wave 1 because (a) every runbook created in Wave 2 declares `platform: iOS` in frontmatter and would violate the template schema without the enum extension, and (b) the validation harness must exist at Wave 0/1 per Nyquist so feedback is available during Waves 2-3 execution.

Purpose: Unblock all iOS runbook creation (template prerequisite) and provide a deterministic, file-read-based feedback loop for executors completing Waves 2-3.
Output: One modified template file and one new validation script.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/phases/30-ios-l1-triage-runbooks/30-CONTEXT.md
@.planning/phases/30-ios-l1-triage-runbooks/30-PATTERNS.md
@.planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md

<interfaces>
<!-- Current L1 template schema (the enum line this plan extends). -->

From docs/_templates/l1-template.md line 10 (inline comment):
```
     - Set platform to Windows, macOS, or all
```

From docs/_templates/l1-template.md line 18 (YAML enum):
```
platform: Windows | macOS | all
```

D-24 change: extend to `Windows | macOS | iOS | all` (mirror the inline-comment change).

<!-- Static-check surface the validation script must cover (per 30-VALIDATION.md Per-Task Verification Map — 13 checks). -->

Check 1  — Decision tree ≤ 5 decision-diamond nodes (regex `^\s*IOS[0-9]+\{` match count ≤ 5 in docs/decision-trees/07-ios-triage.md)
Check 2  — Single-branch integration: No iOS/IOS token inside the mermaid block of docs/decision-trees/00-initial-triage.md
Check 3  — 6 runbooks have `## Symptom` H2
Check 4  — Exactly 1 runbook file has `## User Action Required` H2 (runbook 21 only; runbooks 16-20 MUST NOT have it)
Check 5  — Zero remaining "iOS L1 runbooks (Phase 30)" strings in docs/admin-setup-ios/
Check 6  — Line 243 of docs/admin-setup-ios/07-device-enrollment.md contains neither "Phase 30" nor "will live"
Check 7  — 6 runbook files exist at docs/l1-runbooks/{16,17,18,19,20,21}-ios-*.md
Check 8  — docs/decision-trees/07-ios-triage.md exists
Check 9  — docs/l1-runbooks/00-index.md contains `^## iOS L1 Runbooks`
Check 10 — docs/_templates/l1-template.md contains the literal string `Windows | macOS | iOS | all`
Check 11 — Each runbook frontmatter contains: last_verified, review_by, audience: L1, platform: iOS
Check 12 — Line that starts with `> **Platform gate:**` present in each runbook (exactly 1 occurrence per runbook, appearing within the first 12 lines after the frontmatter closes)
Check 13 — (Optional/best-effort) markdown-link-check and mermaid-cli runs if binaries resolve; otherwise SKIPPED
</interfaces>
</context>

<tasks>

<task type="auto" tdd="false">
  <name>Task 1: Extend l1-template.md platform enum to include iOS</name>
  <read_first>
    - docs/_templates/l1-template.md (full file — current platform enum on line 18, inline guidance on line 10)
    - .planning/phases/30-ios-l1-triage-runbooks/30-PATTERNS.md § "docs/_templates/l1-template.md (MODIFY — extend `platform:` enum)" (exact before/after strings specified)
    - .planning/phases/30-ios-l1-triage-runbooks/30-CONTEXT.md § D-24
  </read_first>
  <behavior>
    - After edit: `docs/_templates/l1-template.md` contains the literal string `Windows | macOS | iOS | all` exactly once
    - After edit: the inline comment at line 10 reads `     - Set platform to Windows, macOS, iOS, or all`
    - Before edit: both strings are absent (the current file says `Windows | macOS | all` and `Windows, macOS, or all`)
  </behavior>
  <action>
    Implement D-24 exactly as specified in PATTERNS.md. Two-line edit, deterministic.

    1. Line 10 — replace (verbatim before):
       `     - Set platform to Windows, macOS, or all`
       With (verbatim after):
       `     - Set platform to Windows, macOS, iOS, or all`

    2. Line 18 — replace (verbatim before):
       `platform: Windows | macOS | all`
       With (verbatim after):
       `platform: Windows | macOS | iOS | all`

    Do NOT change any other line. Do NOT add a Version History (the template file intentionally carries no version metadata per the inline comment header). Do NOT add or modify any frontmatter date field.

    This implements locked decision D-24 (CONTEXT.md line 109). No alternatives, no interpretation.
  </action>
  <verify>
    <automated>node -e "const s=require('fs').readFileSync('docs/_templates/l1-template.md','utf8'); process.exit((s.includes('Windows | macOS | iOS | all') && s.includes('Windows, macOS, iOS, or all')) ? 0 : 1)"</automated>
  </verify>
  <done>Node assertion exits 0 — both required strings are present in the file. `git diff docs/_templates/l1-template.md` shows exactly two changed lines (line 10 and line 18). No other lines modified.</done>
</task>

<task type="auto" tdd="false">
  <name>Task 2: Create check-phase-30.mjs validation harness (pure Node, no shell)</name>
  <read_first>
    - .planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md (full file — Per-Task Verification Map has all 13 check definitions)
    - .planning/phases/30-ios-l1-triage-runbooks/30-RESEARCH.md § 6 "Validation Architecture" (full-suite sampling rate + tooling-availability rules)
    - Run `ls scripts/ 2>&1 | head -10` before creating the file to confirm whether `scripts/validation/` subdirectory needs creating
    - Project CLAUDE.md security note: "Validate all user inputs in API endpoints" — applied here by reading files via fs (no shell interpolation of untrusted paths)
  </read_first>
  <behavior>
    - In Wave 1 state (only template edited; no runbooks, no triage tree, no retrofit): running `node scripts/validation/check-phase-30.mjs` exits non-zero and prints which checks failed
    - Check 10 (template enum) passes after Task 1 of this plan
    - All other non-external checks (1-9, 11, 12) fail because their target files do not yet exist — expected per Nyquist (tests exist before implementation)
    - Running `node scripts/validation/check-phase-30.mjs --quick` runs only the fast file-content checks (skips link-check and mermaid-cli external spawns), exits non-zero on failure, completes in < 2 seconds
    - Full-suite run completes in < 15 seconds
    - Script uses `execFileSync` (or pure Node fs) with argument arrays — NEVER `execSync` with shell-interpolated strings, NEVER `exec` with user-controlled input
  </behavior>
  <action>
    Create `scripts/validation/check-phase-30.mjs`. Single-file ESM Node script.

    **SECURITY REQUIREMENT (from project CLAUDE.md pattern):** Do NOT use `child_process.exec()` or `execSync()` with composed string commands. Every check that needs file content reads via `fs.readFileSync(path, 'utf8')` and matches with JavaScript regex / string methods. The only shell-adjacent calls are for the two OPTIONAL external tools (markdown-link-check, mermaid-cli) and those MUST use `child_process.execFileSync(binary, [args...], {...})` with argv arrays, not shell strings.

    **Script structure:**

    1. Collect an array of check definitions. Each check: `{ id, name, type: 'file-match'|'file-absent-match'|'file-exists'|'line-content'|'frontmatter'|'external', spec: {...}, required: true|false }`.

    2. Implement the 13 checks using pure Node fs + regex (no shell):

       - **Check 1** (`file-match-count`): read `docs/decision-trees/07-ios-triage.md`; count lines matching `/^\s*IOS\d+\{/gm`; pass if count ≤ 5 AND ≥ 1. Fail if file missing.
       - **Check 2** (`file-absent-match`): read `docs/decision-trees/00-initial-triage.md`; extract mermaid block(s) via regex `/```mermaid\n([\s\S]*?)\n```/g`; within the extracted block text, count matches for `/iOS|iPadOS|IOS\d+/gi`; pass if count = 0.
       - **Check 3** (`multi-file-contains`): for each of the 6 runbook glob targets — iterate `['16','17','18','19','20','21']`, find matching file via `fs.readdirSync('docs/l1-runbooks').find(f => new RegExp('^' + n + '-ios-.*\\.md$').test(f))`; read each file; check for a line matching `/^## Symptom\s*$/m`; pass if all 6 present.
       - **Check 4** (`multi-file-count-contains`): same file resolution as Check 3; count files where `/^## User Action Required\s*$/m` matches; pass if count = 1 (runbook 21 only).
       - **Check 5** (`recursive-string-absent`): recursively walk `docs/admin-setup-ios/`; for each `.md` file, read contents; assert the exact substring `iOS L1 runbooks (Phase 30)` is absent; pass if all files pass.
       - **Check 6** (`line-content`): read `docs/admin-setup-ios/07-device-enrollment.md`; split by `\n`; take index 242 (line 243, 1-indexed); assert it does NOT contain `"Phase 30"` AND does NOT contain `"will live"`; pass if both assertions hold.
       - **Check 7** (`file-exists`): for each of `['16-ios-apns-expired.md','17-ios-ade-not-starting.md','18-ios-enrollment-restriction-blocking.md','19-ios-license-invalid.md','20-ios-device-cap-reached.md','21-ios-compliance-blocked.md']`, assert `fs.existsSync('docs/l1-runbooks/' + name)`; pass if all 6 exist.
       - **Check 8** (`file-exists`): `fs.existsSync('docs/decision-trees/07-ios-triage.md')` = true.
       - **Check 9** (`file-match-count`): read `docs/l1-runbooks/00-index.md`; count matches for `/^## iOS L1 Runbooks\s*$/m`; pass if count = 1.
       - **Check 10** (`file-contains`): read `docs/_templates/l1-template.md`; assert it contains the exact substring `Windows | macOS | iOS | all`; pass if present.
       - **Check 11** (`frontmatter`): for each of the 6 runbook files resolved in Check 3, read first 20 lines; extract frontmatter between the two `---` fences; assert keys present: `last_verified` (value matches `/^\d{4}-\d{2}-\d{2}$/`), `review_by` (same pattern), `audience: L1`, `platform: iOS`. Pass if all 6 pass all 4 assertions.
       - **Check 12** (`file-line-occurrence`): for each of the 6 runbook files, read contents; find line index where `/^> \*\*Platform gate:\*\*/.test(line)` is true; pass if exactly 1 match per file AND that match's line index (1-based) is ≤ 12. Fail on zero-matches, multi-matches, or position > 12.
       - **Check 13** (type=external, required=false):
         a. Attempt `execFileSync('npx', ['--yes', '--no-install', 'markdown-link-check', 'docs/decision-trees/07-ios-triage.md', ...runbookPaths], { stdio: 'pipe', timeout: 30000 })`. Wrap in try/catch. If ENOENT / exit code 127 / package-not-found stderr, mark SKIPPED. Otherwise PASS/FAIL per exit code.
         b. Similarly `execFileSync('npx', ['--yes', '--no-install', '@mermaid-js/mermaid-cli', '-i', 'docs/decision-trees/07-ios-triage.md', '--quiet'], { stdio: 'pipe', timeout: 30000 })`. Same SKIPPED-on-binary-absence logic.
         c. These two are the ONLY shell-adjacent calls. Argv is an array of literals — no shell interpolation, no string concatenation with external input.

    3. CLI flags (parse `process.argv.slice(2)` manually):
       - `--quick`: skip checks of type `external` (Check 13)
       - (no flag) = full suite = all 13 checks
       - `--verbose`: print each check's detail in addition to pass/fail summary line

    4. Output format (one line per check):
       ```
       [1/13] Decision tree ≤ 5 decision nodes ................. PASS
       [2/13] Single-branch integration (00-initial-triage) .... PASS
       [3/13] 6 runbooks have ## Symptom ....................... FAIL — missing: 16,17,18,19,20,21 (files not found)
       ...
       [13/13] Mermaid syntax valid ............................ SKIPPED (mermaid-cli binary unavailable)

       Summary: 1 passed, 10 failed, 2 skipped
       ```

    5. Exit codes:
       - 0 if zero required checks failed (SKIPPED does not count as failure)
       - 1 if any required check failed
       - External checks (Check 13a/b) failing because their binaries returned non-zero (not SKIPPED) MUST fail the overall run unless `--quick` was passed

    6. File header (first lines):
       ```js
       #!/usr/bin/env node
       // Phase 30 static validation harness
       // Source of truth: .planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md
       // NO SHELL: all file content via fs.readFileSync; external tools via execFileSync with argv arrays
       ```

    7. Keep the script self-contained: import only Node built-ins (`node:fs`, `node:path`, `node:child_process`, `node:process`). No external npm packages at import time.

    **Do NOT** attempt to make checks 1-9/11/12 pass in Wave 1 — their target artifacts don't yet exist. The Nyquist contract is satisfied by the checks EXISTING and running; they turn green as Waves 2-3 land.

    Ensure the `scripts/validation/` directory exists (create it if not, using `fs.mkdirSync('scripts/validation', { recursive: true })` or create manually before writing the file).
  </action>
  <verify>
    <automated>node scripts/validation/check-phase-30.mjs --quick; echo "exit=$?"</automated>
  </verify>
  <done>Script file exists at `scripts/validation/check-phase-30.mjs`. Running `--quick` prints a 12-line summary (all checks except Check 13) with Check 10 as PASS and most others as FAIL, then exits non-zero (1). Running the full suite without `--quick` prints all 13 lines and still exits non-zero. Script contains no `exec(` or `execSync(` calls — only `execFileSync` with argv arrays and `fs.readFileSync`.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Developer → repository | Validator is executable Node code; runs locally on developer machines; reads files only; no writes |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-30-01-01 | Tampering | Validation script | accept | Script is read-only (reads files via fs, spawns two optional external validators via execFileSync with argv arrays); writes nothing; source version-controlled and reviewed via PR |
| T-30-01-02 | Information Disclosure | Validator output | accept | Output contains only file paths and match counts, no tenant data or credentials |
| T-30-01-03 | Injection | execFileSync calls for npx | mitigate | Arguments passed as argv array (not composed strings); only two hardcoded argv lists (markdown-link-check, mermaid-cli); no user input flows into these calls |
| T-30-01-04 | Content leakage | Template edit | mitigate | Template is already public; enum change adds only the literal string `iOS`, no PII |
</threat_model>

<verification>
Before closing this plan:

1. Run `node -e "const s=require('fs').readFileSync('docs/_templates/l1-template.md','utf8'); console.log(s.includes('Windows | macOS | iOS | all'))"` — must print `true`
2. Run `node scripts/validation/check-phase-30.mjs --quick` — must exit non-zero (Wave 2/3 deliverables absent); must report Check 10 as PASS
3. Run `node scripts/validation/check-phase-30.mjs` (full suite) — must exit non-zero; Check 13a/b print SKIPPED if npx tooling unavailable or PASS/FAIL if available
4. Search the script for `exec(` and `execSync(` — must return zero hits (only `execFileSync` permitted)
5. `git status` shows only two modified files: `docs/_templates/l1-template.md` and `scripts/validation/check-phase-30.mjs`
</verification>

<success_criteria>
- [x] docs/_templates/l1-template.md line 18 reads `platform: Windows | macOS | iOS | all`
- [x] docs/_templates/l1-template.md line 10 reads `     - Set platform to Windows, macOS, iOS, or all`
- [x] scripts/validation/check-phase-30.mjs exists, is a runnable Node ESM script, implements all 13 checks per 30-VALIDATION.md
- [x] Script uses pure Node fs for file-content checks; only `execFileSync` with argv arrays for the two optional external spawns
- [x] Running the script in its initial Wave 1 state exits non-zero with ≥ 10 check failures (expected — downstream artifacts not yet built)
- [x] Check 10 (template enum) transitions from FAIL (before Task 1) to PASS (after Task 1)
- [x] Script SKIPS external checks (13a/b) if npx binaries unavailable and still exits 0 on zero required-check failures
- [x] This plan unlocks Waves 2 and 3 to create `platform: iOS` runbooks and to run continuous validation
</success_criteria>

<output>
After completion, create `.planning/phases/30-ios-l1-triage-runbooks/30-01-SUMMARY.md` with:
- Which lines of l1-template.md changed (exactly 2: line 10 inline comment, line 18 YAML enum)
- Path to validation script and exit-code behavior in Wave 1 state
- Any deviation from the 13-check spec (none expected — this is deterministic)
- npx binary availability findings (markdown-link-check? mermaid-cli? SKIPPED or available?)
</output>
