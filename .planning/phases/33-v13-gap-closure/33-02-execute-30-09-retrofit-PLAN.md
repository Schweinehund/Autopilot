---
phase: 33-v13-gap-closure
plan: 02
type: execute
wave: 1
depends_on: []
files_modified:
  - docs/admin-setup-ios/01-apns-certificate.md
  - docs/admin-setup-ios/02-abm-token.md
  - docs/admin-setup-ios/03-ade-enrollment-profile.md
  - docs/admin-setup-ios/04-configuration-profiles.md
  - docs/admin-setup-ios/05-app-deployment.md
  - docs/admin-setup-ios/06-compliance-policy.md
  - docs/admin-setup-ios/07-device-enrollment.md
  - docs/admin-setup-ios/08-user-enrollment.md
  - docs/admin-setup-ios/09-mam-app-protection.md
autonomous: true
requirements: [L1TS-02]
must_haves:
  truths:
    - "Zero occurrences of the literal placeholder `iOS L1 runbooks (Phase 30)` remain anywhere in `docs/admin-setup-ios/` after this plan lands"
    - "Each of the 70 Configuration-Caused Failures table rows across 9 files has its rightmost cell replaced by the exact per-row target link specified in the pre-authored 30-09 plan's 71-row enumeration (not bulk sed — per-row judgment was locked at 30-09 plan time per D-17)"
    - "Line 243 of `docs/admin-setup-ios/07-device-enrollment.md` is rewritten to the D-18 prose exactly: `Full triage trees for each symptom live in the [iOS Triage Decision Tree](../decision-trees/07-ios-triage.md) and are executed via the [iOS L1 Runbooks 16-21](../l1-runbooks/00-index.md#ios-l1-runbooks).`"
    - "All 9 retrofitted files receive a `last_verified: 2026-04-18` frontmatter bump and a `review_by: 2026-07-17` bump (D-19 — using today's date 2026-04-18 rather than the 30-09-locked 2026-04-17 because the plan was authored on 17 but Phase 33 executes on 18; this is the only deviation from the 30-09 enumeration)"
    - "Each of the 9 files receives a new top-of-table Version History row `| 2026-04-18 | Resolved iOS L1 runbook cross-references | -- |` (date matches the bumped last_verified)"
    - "All 9 file modifications ship in ONE atomic git commit with the D-20-locked message `docs(30): resolve iOS L1 runbook placeholders in admin-setup-ios` (the commit scope stays `30` because this fulfills the Phase 30 forward-contract — Phase 33 is the execution vehicle, not a new phase identity for the retrofit)"
  artifacts:
    - path: "docs/admin-setup-ios/01-apns-certificate.md"
      provides: "APNs certificate guide with 5 placeholders → R16 per 30-09 enumeration"
    - path: "docs/admin-setup-ios/02-abm-token.md"
      provides: "ABM token guide with 5 placeholders → R17 per 30-09 enumeration"
    - path: "docs/admin-setup-ios/03-ade-enrollment-profile.md"
      provides: "ADE enrollment profile guide with 6 placeholders → R17 per 30-09 enumeration"
    - path: "docs/admin-setup-ios/04-configuration-profiles.md"
      provides: "Configuration profiles guide with 9 placeholders (1×R21 + 8×L2P31) per 30-09 enumeration"
    - path: "docs/admin-setup-ios/05-app-deployment.md"
      provides: "App deployment guide with 10 placeholders → L2P31 per 30-09 enumeration"
    - path: "docs/admin-setup-ios/06-compliance-policy.md"
      provides: "Compliance policy guide with 10 placeholders (8×R21 + 1×R16 + 1×R17) per 30-09 enumeration"
    - path: "docs/admin-setup-ios/07-device-enrollment.md"
      provides: "Device enrollment guide with 11 table placeholders + 1 prose line 243 retrofit per 30-09 enumeration"
    - path: "docs/admin-setup-ios/08-user-enrollment.md"
      provides: "User enrollment guide with 7 placeholders (1×R18 + 1×R19 + 5×L2P31) per 30-09 enumeration"
    - path: "docs/admin-setup-ios/09-mam-app-protection.md"
      provides: "MAM-WE guide with 7 placeholders (1×R19 + 6×L2P31) per 30-09 enumeration"
  key_links:
    - from: "All 9 admin-setup-ios files' Configuration-Caused Failures tables"
      to: "iOS L1 runbooks 16-21 OR L2 index (Phase 31 placeholder) per the 30-09 per-row judgment"
      via: "Markdown links substituted for 'iOS L1 runbooks (Phase 30)' placeholder strings"
      pattern: "../l1-runbooks/(1[6-9]|2[0-1])-ios-.*\\.md|../l2-runbooks/00-index\\.md"
---

<objective>
Execute the pre-authored Phase 30 Plan 30-09 — the 71-placeholder retrofit across 9 `docs/admin-setup-ios/*.md` files — as the second half of integration gap I-2 closure. The per-row judgment (which placeholder maps to which runbook) was locked at plan time in `.planning/phases/30-ios-l1-triage-runbooks/30-09-admin-setup-ios-retrofit-PLAN.md` per D-17; this Phase 33 plan is a pure execution vehicle that delegates to that enumeration without re-deriving it.

**DELEGATION, NOT DUPLICATION.** This plan does NOT restate the 71-row mapping inline. The executor MUST read the 30-09 plan's `<interfaces>` block (lines 73-244 of `30-09-admin-setup-ios-retrofit-PLAN.md`) and apply it verbatim. That plan contains all per-row targets, rationale, contextual notes, and the atomic-commit contract.

**The one deviation from 30-09 as authored:** date values. The 30-09 plan locked `last_verified: 2026-04-17` (D-19). Phase 33 executes on 2026-04-18 (today per STATE.md last_activity + CLAUDE.md userCurrentDate). Use **2026-04-18** for `last_verified` and **2026-07-17** for `review_by` (last_verified + 90d). The Version History row uses `2026-04-18` to match. All other 30-09 content — enumeration, link text, prose rewrite wording, D-20-locked commit message, contextual notes — is preserved verbatim.

This plan is Wave 1 and has no dependencies on Plan 33-01 (I-1 anchor fix) — 33-01 modifies `docs/ios-lifecycle/01-ade-lifecycle.md`, 33-02 modifies `docs/admin-setup-ios/*.md`, disjoint file sets.

Output: 9 modified `docs/admin-setup-ios/*.md` files (71 placeholder resolutions + 9 frontmatter bumps + 9 Version History entries) + 1 atomic git commit with the D-20-locked message.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/phases/30-ios-l1-triage-runbooks/30-CONTEXT.md
@.planning/phases/30-ios-l1-triage-runbooks/30-09-admin-setup-ios-retrofit-PLAN.md
@.planning/v1.3-MILESTONE-AUDIT.md

<interfaces>
<!-- This plan intentionally does NOT duplicate the 71-row enumeration. -->
<!-- The authoritative source is the 30-09 plan's <interfaces> block. -->
<!-- The executor MUST read `.planning/phases/30-ios-l1-triage-runbooks/30-09-admin-setup-ios-retrofit-PLAN.md` and apply its enumeration verbatim, subject only to the date-value deviation documented in <objective> above. -->

**30-09 plan location:** `.planning/phases/30-ios-l1-triage-runbooks/30-09-admin-setup-ios-retrofit-PLAN.md`

**Key sections to read in that plan:**
- Lines 73-244 — the 71-row enumeration table (per-file sub-sections with exact line numbers, failure-mode descriptions, target runbook, and full Link Text with contextual notes where applicable)
- Lines 240-248 — the summary arithmetic (R16=7, R17=13, R18=2, R19=4, R20=1, R21=10, L2P31=32, Prose=1, Annotation=1, total=71)
- Lines 241-248 — the Version History row template and frontmatter bump template (USE 2026-04-18 instead of 2026-04-17 per this plan's <objective> deviation)
- Lines 274-319 — the file-by-file action steps (use as execution runbook)
- Lines 300-303 — the D-20-locked commit message contract

**Date deviation from 30-09 (and rationale):** The 30-09 plan was authored 2026-04-17 and locked that date for `last_verified` per D-19. Phase 33 executes 2026-04-18. Use 2026-04-18 for `last_verified`, 2026-07-17 for `review_by`, and the Version History row date. This is a trivial currency correction, not a decision override.

**Current live placeholder counts (verified at plan time via `grep -c "iOS L1 runbooks (Phase 30)" docs/admin-setup-ios/*.md`):**
- 01-apns-certificate.md: 5
- 02-abm-token.md: 5
- 03-ade-enrollment-profile.md: 6
- 04-configuration-profiles.md: 9
- 05-app-deployment.md: 10
- 06-compliance-policy.md: 10
- 07-device-enrollment.md: 12
- 08-user-enrollment.md: 7
- 09-mam-app-protection.md: 7
- **Total: 71** (matches audit I-2 distribution + 30-09 enumeration arithmetic exactly)
</interfaces>
</context>

<tasks>

<task type="auto" tdd="false">
  <name>Task 1: Execute the 30-09 retrofit — 71 placeholders resolved across 9 files in one atomic commit</name>
  <read_first>
    - `.planning/phases/30-ios-l1-triage-runbooks/30-09-admin-setup-ios-retrofit-PLAN.md` (**THE AUTHORITATIVE SOURCE** — read the full file; the `<interfaces>` block lines 73-244 contain the exact per-row mapping; the `<tasks>` block lines 252-335 contain file-by-file action steps; the `<success_criteria>` block lines 363-374 contain the final distribution arithmetic)
    - `.planning/phases/30-ios-l1-triage-runbooks/30-CONTEXT.md` § D-16 (forward-contract), D-17 (per-row judgment — no bulk sed), D-18 (prose retrofit at line 243), D-19 (metadata bumps), D-20 (atomic commit message LOCKED)
    - `.planning/v1.3-MILESTONE-AUDIT.md` § "I-2 — 71 unlinked Phase 30 placeholder strings" (audit-source distribution table matches 30-09 enumeration exactly)
    - All 9 files being modified: `docs/admin-setup-ios/0{1..9}-*.md` — read each file in full before editing so the executor sees current state, existing frontmatter structure, existing Version History table format, and the exact rows that currently contain the placeholder string (per-row judgment requires seeing the full row context, not just the placeholder cell)
    - All 6 L1 runbook files: `docs/l1-runbooks/{16,17,18,19,20,21}-ios-*.md` — spot-confirm they exist with the exact filenames the 30-09 enumeration's Link Text references (prerequisite for the links to resolve)
    - `docs/l2-runbooks/00-index.md` — confirm this file exists (L2P31 placeholder link target per 30-09 D-31 convention)
  </read_first>
  <behavior>
    - After task completes: `grep -rn "iOS L1 runbooks (Phase 30)" docs/admin-setup-ios/` returns ZERO matches (matches the 30-09 Check 5 PASS condition)
    - Line 243 of `docs/admin-setup-ios/07-device-enrollment.md` does NOT contain `Phase 30` or `will live` (30-09 Check 6 PASS — the D-18 prose retrofit)
    - Line 243 of `docs/admin-setup-ios/07-device-enrollment.md` DOES contain the exact strings `iOS Triage Decision Tree`, `../decision-trees/07-ios-triage.md`, `iOS L1 Runbooks 16-21`, and `../l1-runbooks/00-index.md#ios-l1-runbooks`
    - Each of the 9 files has a frontmatter line `last_verified: 2026-04-18` and `review_by: 2026-07-17` (date currency deviation from 30-09 per this plan's <objective>)
    - Each of the 9 files has a new top-of-data Version History row: `| 2026-04-18 | Resolved iOS L1 runbook cross-references | -- |`
    - The row count per file matches the 30-09 enumeration arithmetic: file 1 → 5 R16 links; file 2 → 5 R17 links; file 3 → 6 R17 links; file 4 → 1 R21 + 8 L2P31 links; file 5 → 10 L2P31 links; file 6 → 8 R21 + 1 R16 + 1 R17 links; file 7 → 1 prose + 11 table rows (1 expected-behavior annotation on row 256 + 10 runbook links — mixed R16/R17/R18/R19/R20/R21/L2P31 per enumeration); file 8 → 1 R18 + 1 R19 + 5 L2P31 links; file 9 → 1 R19 + 6 L2P31 links
    - All 9 file modifications ship in exactly ONE git commit (verifiable via `git show --stat HEAD` showing exactly 9 files in `docs/admin-setup-ios/`)
    - The commit message is exactly `docs(30): resolve iOS L1 runbook placeholders in admin-setup-ios` (D-20 locked — NOT `docs(33)`; the `30` scope is preserved because this commit fulfills the Phase 30 forward-contract; Phase 33 is the execution vehicle, not a renaming of the deliverable)
  </behavior>
  <action>
    **Execution approach (delegates to the pre-authored 30-09 plan — do NOT re-derive the mapping):**

    1. **Load the authoritative enumeration.** Open `.planning/phases/30-ios-l1-triage-runbooks/30-09-admin-setup-ios-retrofit-PLAN.md`. Read the `<interfaces>` block (lines 73-244) in full. This contains the 71-row per-row judgment table that was locked at plan time per D-17.

    2. **Apply the enumeration file-by-file per the 30-09 `<tasks>` block steps (lines 274-319).** For each of the 9 files, open the file, locate each Configuration-Caused Failures row by its failure-mode description text (the left-column cell content is the authoritative match — line numbers in the 30-09 enumeration were captured at plan time and may have drifted since; the failure-mode-description text is stable), and replace the rightmost cell value (currently `iOS L1 runbooks (Phase 30)`) with the exact Link Text from the 30-09 enumeration's Target column (including contextual notes where the enumeration specifies them, e.g., `— Cause B (policy mismatch)`).

    3. **Handle the three special cases from 30-09 by file:**
       - **File 7 (07-device-enrollment.md):** Line 243 is PROSE, not a table row. Rewrite the entire line per 30-09 enumeration row 46 to: `Full triage trees for each symptom live in the [iOS Triage Decision Tree](../decision-trees/07-ios-triage.md) and are executed via the [iOS L1 Runbooks 16-21](../l1-runbooks/00-index.md#ios-l1-runbooks).` (D-18 locked wording — use verbatim).
       - **File 7 row 256:** The expected-behavior annotation (unique row: the placeholder is replaced with the annotation text from 30-09 enumeration row 54 — NOT a bare runbook link). Use the exact annotation: `Not a failure — see the Capabilities section linked at left. If user persistently cannot accept, see [Runbook 21](../l1-runbooks/21-ios-compliance-blocked.md) Cause B as fallback investigation.`
       - **Commit message:** Must be `docs(30): resolve iOS L1 runbook placeholders in admin-setup-ios` (scope stays `30`, not `33`). D-20 is a LOCKED contract the planner authored at 30-09 plan time; Phase 33 preserves it because the commit fulfills the Phase 30 forward-contract from Phase 28 D-22 / Phase 29 D-13.

    4. **Apply the frontmatter + Version History bump on each of the 9 files** per 30-09 lines 241-248, with the date deviation:
       - Frontmatter: `last_verified: 2026-04-18`; `review_by: 2026-07-17`
       - Version History new top-of-data row: `| 2026-04-18 | Resolved iOS L1 runbook cross-references | -- |` (inserted above the existing rows, maintaining chronological-descending order)

    5. **Pre-commit local checks (before staging):**
       - Run `grep -rn "iOS L1 runbooks (Phase 30)" docs/admin-setup-ios/` — MUST return zero lines
       - Run `sed -n '243p' docs/admin-setup-ios/07-device-enrollment.md` — MUST NOT contain `Phase 30` or `will live`, MUST contain `iOS Triage Decision Tree` and `iOS L1 Runbooks 16-21`
       - Run arithmetic-check greps: `grep -c "l1-runbooks/16-ios-apns-expired.md" docs/admin-setup-ios/*.md | awk -F: '{s+=$2} END {print s}'` should be ≥ 7 (enumeration-predicted R16 count)
       - Similar sanity greps for R17 (≥13), R21 (≥10), L2P31 (`l2-runbooks/00-index.md` ≥ 32)

    6. **Atomic commit with the D-20-locked message:**
       ```
       git add docs/admin-setup-ios/01-apns-certificate.md docs/admin-setup-ios/02-abm-token.md docs/admin-setup-ios/03-ade-enrollment-profile.md docs/admin-setup-ios/04-configuration-profiles.md docs/admin-setup-ios/05-app-deployment.md docs/admin-setup-ios/06-compliance-policy.md docs/admin-setup-ios/07-device-enrollment.md docs/admin-setup-ios/08-user-enrollment.md docs/admin-setup-ios/09-mam-app-protection.md
       git commit -m "docs(30): resolve iOS L1 runbook placeholders in admin-setup-ios"
       ```
       (Use the gsd-tools commit helper, or a HEREDOC'd `git commit -m "..."` per the planner-global git-safety protocol. Include the Co-Authored-By trailer per project convention.)

    7. **Post-commit verification:**
       - `git show --stat HEAD | grep "^ docs/admin-setup-ios/" | wc -l` should print `9` (exactly 9 files in docs/admin-setup-ios/)
       - `git log -1 --pretty=%s` should print exactly `docs(30): resolve iOS L1 runbook placeholders in admin-setup-ios`

    **Do NOT:**
    - Use bulk sed / regex replace to substitute all 71 placeholders with the same text — this violates 30-09 D-17 per-row judgment (each row has its own target + contextual note)
    - Re-derive the per-row judgment — the 30-09 plan's `<interfaces>` block is the locked source; Phase 33 is an execution vehicle only
    - Change the D-20-locked commit message scope from `30` to `33` (`docs(30):` is non-negotiable — the retrofit fulfills the Phase 30 forward-contract)
    - Change link text of the 6 runbook links (e.g., `[Runbook 16: APNs Expired]`) — these are locked in the 30-09 enumeration's Link Text column
    - Change the D-18 prose wording on line 243 — it is locked verbatim
    - Skip any of the 9 Version History entries or frontmatter bumps
    - Include the I-1 anchor fix (that's Plan 33-01's scope — separate commit, different file set)
    - Fold these edits into per-file commits; the atomic-commit contract is explicit in D-20

    **Per-row-judgment escape hatch (D-17 — carried over from 30-09):** If during execution the executor encounters a row where the 30-09 enumeration's target link doesn't render well in the table (e.g., the contextual note overflows and breaks markdown table rendering), the executor MAY shorten the contextual note while preserving the target link, but MAY NOT change the target runbook number. Any such deviation MUST be recorded in the Task SUMMARY.
  </action>
  <verify>
    <automated>bash -c 'COUNT=$(grep -r "iOS L1 runbooks (Phase 30)" docs/admin-setup-ios/ | wc -l); echo "remaining=$COUNT"; test "$COUNT" = "0"'</automated>
  </verify>
  <acceptance_criteria>
    - `grep -r "iOS L1 runbooks (Phase 30)" docs/admin-setup-ios/` returns NO lines (zero matches)
    - `grep -c "iOS L1 runbooks (Phase 30)" docs/admin-setup-ios/*.md` reports `:0` for all 9 files
    - `sed -n '243p' docs/admin-setup-ios/07-device-enrollment.md` contains both `iOS Triage Decision Tree` AND `../decision-trees/07-ios-triage.md` AND `iOS L1 Runbooks 16-21` AND `../l1-runbooks/00-index.md#ios-l1-runbooks` AND does NOT contain `Phase 30` or `will live`
    - `grep -l "l1-runbooks/16-ios-apns-expired.md" docs/admin-setup-ios/*.md | wc -l` is at least `3` (R16 appears in files 1, 6, 7 per enumeration)
    - `grep -l "l1-runbooks/17-ios-ade-not-starting.md" docs/admin-setup-ios/*.md | wc -l` is at least `4` (R17 appears in files 2, 3, 6, 7)
    - `grep -l "l1-runbooks/21-ios-compliance-blocked.md" docs/admin-setup-ios/*.md | wc -l` is at least `4` (R21 appears in files 4, 6, 7, and the annotation on file 7 row 256)
    - `grep -c "l2-runbooks/00-index.md" docs/admin-setup-ios/*.md | awk -F: '{s+=$2} END {print s}'` outputs at least `32` (L2P31 count per 30-09 arithmetic)
    - Each of the 9 files contains the frontmatter line `last_verified: 2026-04-18`: `grep -l "^last_verified: 2026-04-18$" docs/admin-setup-ios/0{1..9}-*.md | wc -l` = 9
    - Each of the 9 files contains the frontmatter line `review_by: 2026-07-17`: `grep -l "^review_by: 2026-07-17$" docs/admin-setup-ios/0{1..9}-*.md | wc -l` = 9
    - Each of the 9 files contains the Version History row: `grep -l "^| 2026-04-18 | Resolved iOS L1 runbook cross-references" docs/admin-setup-ios/0{1..9}-*.md | wc -l` = 9
    - `git log -1 --pretty=%s` outputs exactly `docs(30): resolve iOS L1 runbook placeholders in admin-setup-ios` (D-20 locked commit subject, scope stays `30`)
    - `git show --stat HEAD` shows exactly 9 files modified, all in `docs/admin-setup-ios/`, zero files outside that directory
    - `node scripts/validation/check-phase-30.mjs --quick` exits 0 (if the validator script accepts this scope; this check also doubles as a cross-reference confirmation and is re-run in Plan 33-03's final gate)
  </acceptance_criteria>
  <done>
    All 71 placeholder occurrences of `iOS L1 runbooks (Phase 30)` resolved per the 30-09 enumeration. Line 243 of 07-device-enrollment.md rewritten per D-18. All 9 files have last_verified = 2026-04-18, review_by = 2026-07-17, and the new Version History row. Atomic commit with the D-20-locked message `docs(30): resolve iOS L1 runbook placeholders in admin-setup-ios` created. Validator Checks 5 and 6 both PASS.
  </done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Public documentation | Retrofit edits add links to existing files; no runtime exposure; no auth/data/PII concerns |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-33-02-01 | Integrity | Per-row mapping accuracy (D-17 judgment) | mitigate | Executor reads the 30-09 plan's locked enumeration verbatim; no re-derivation; 10+ row spot-check happens in Plan 33-03's manual verification (30-09 task 2) |
| T-33-02-02 | Integrity | Commit-message scope drift (accidentally committing as `docs(33):`) | mitigate | Acceptance criteria explicitly enforce the exact commit subject `docs(30): resolve iOS L1 runbook placeholders in admin-setup-ios`; verified via `git log -1 --pretty=%s` |
| T-33-02-03 | Link-rot | L2P31 target (`docs/l2-runbooks/00-index.md` — valid file but iOS content delivered by Phase 31) | accept | `(Phase 31)` parenthetical signals the iOS-specific content is provided by Phase 31; the target file exists and resolves; pattern matches the Phase 28 D-22 forward-contract precedent; already validated in Phase 31 verification |
| T-33-02-04 | Integrity | Line numbers in 30-09 enumeration may have drifted since 2026-04-17 | mitigate | 30-09 `<action>` block explicitly specifies failure-mode-description text as authoritative match anchor (not line number); plan-time placeholder count (5/5/6/9/10/10/12/7/7 = 71) was re-verified at Phase 33 plan time and matches 30-09's arithmetic exactly — no drift detected |
</threat_model>

<verification>
1. `grep -r "iOS L1 runbooks (Phase 30)" docs/admin-setup-ios/` — MUST return zero lines (I-2 closed)
2. `sed -n '243p' docs/admin-setup-ios/07-device-enrollment.md` — MUST contain `iOS Triage Decision Tree` and `iOS L1 Runbooks 16-21`; MUST NOT contain `Phase 30` or `will live`
3. Per-file placeholder count `grep -c "iOS L1 runbooks (Phase 30)" docs/admin-setup-ios/*.md` — each file MUST report `:0`
4. Distribution sanity: at least 7 occurrences of R16 file-link, at least 13 of R17, at least 10 of R21, at least 32 of L2P31 across `docs/admin-setup-ios/*.md`
5. Each of the 9 files has `last_verified: 2026-04-18` and `review_by: 2026-07-17` in frontmatter and the new `| 2026-04-18 | Resolved iOS L1 runbook cross-references | -- |` Version History row
6. `git log -1 --pretty=%s` — MUST print exactly `docs(30): resolve iOS L1 runbook placeholders in admin-setup-ios`
7. `git show --stat HEAD` — MUST show exactly 9 files modified, all in `docs/admin-setup-ios/`
8. `node scripts/validation/check-phase-30.mjs --quick` exits 0 (Checks 5 and 6 both PASS)
</verification>

<success_criteria>
- [x] All 71 placeholder occurrences of `iOS L1 runbooks (Phase 30)` resolved per the 30-09 enumeration (I-2 audit gap closed)
- [x] Line 243 of `07-device-enrollment.md` rewritten per D-18 verbatim
- [x] All 9 files have `last_verified: 2026-04-18`, `review_by: 2026-07-17`, and the 2026-04-18 Version History row
- [x] Atomic commit with the D-20-locked message (scope stays `docs(30):`)
- [x] Validator Check 5 (zero placeholder strings in `docs/admin-setup-ios/`) PASS
- [x] Validator Check 6 (line 243 clean) PASS
- [x] Distribution matches 30-09 arithmetic: R16≥7, R17≥13, R18≥2, R19≥4, R20≥1, R21≥10, L2P31≥32
- [x] The 9 admin-setup-ios files' Configuration-Caused Failures tables now link to the correct L1 runbooks → I-2 admin-self-diagnosed flow restored for 9 affected requirements (ACORP-01/02/03, ACFG-01/02/03, ABYOD-01/02/03)
</success_criteria>

<output>
After completion, create `.planning/phases/33-v13-gap-closure/33-02-SUMMARY.md` with:
- Before/after placeholder count (71 → 0, verified via `grep -rn "iOS L1 runbooks (Phase 30)" docs/admin-setup-ios/`)
- Per-file row counts confirmed matching 30-09 enumeration arithmetic (5/5/6/9/10/10/12/7/7 = 71 — for file 7 the 12 comprises 11 table rows + 1 prose)
- Target-link distribution in the final state (R16 count, R17, R18, R19, R20, R21, L2P31, prose, annotation)
- Atomic commit hash and verification that commit subject is exactly `docs(30): resolve iOS L1 runbook placeholders in admin-setup-ios`
- Any rows where execute-time judgment diverged from the 30-09 enumeration (expected: zero; flag any that did with the reason)
- Confirmation that `docs/l2-runbooks/00-index.md` still exists (L2P31 target) and all 6 `docs/l1-runbooks/1[6-9]-ios-*.md` + `2[0-1]-ios-*.md` files still exist (R16-R21 targets)
</output>
</content>
</invoke>