---
phase: 33-v13-gap-closure
plan: 04
type: execute
wave: 3
depends_on: [33-01, 33-02, 33-03]
files_modified:
  - .planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md
  - .planning/REQUIREMENTS.md
autonomous: true
requirements: [L1TS-01, L1TS-02]
must_haves:
  truths:
    - "`.planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` exists with frontmatter `phase: 30-ios-l1-triage-runbooks`, `status: passed`, `score: 4/4 must-haves verified`, and a 3-source matrix row for each of the 4 Phase 30 success criteria and the 2 Phase 30 requirements (L1TS-01, L1TS-02)"
    - "The 3-source matrix in 30-VERIFICATION.md shows L1TS-01 SATISFIED with evidence (triage tree + 6 L1 runbooks + validator Check 1/2/8 PASS) and L1TS-02 SATISFIED with evidence (6 runbook files + validator Check 3/4/7/11/12 PASS + 71-placeholder retrofit complete + manual fidelity spot-check PASS)"
    - "The Artifact Manifest in 30-VERIFICATION.md lists all 8 artifacts Phase 30 delivered: 1 triage tree, 6 L1 runbooks, 1 template extension, 2 navigation integrations, 9 retrofitted admin-setup-ios files, 1 validation harness, the 30-VALIDATION.md audit, and (Phase 33 integration) the I-1 anchor fix that restores LIFE-02's L2 handoff"
    - "`.planning/REQUIREMENTS.md` L1TS-01 and L1TS-02 checkboxes are flipped from `[ ]` to `[x]`; the Traceability Table status column for both requirements updates from `Pending` to `Complete`"
    - "The remaining 13 `[ ]` Pending entries for v1.3 requirements that were caveated by I-1 or I-2 (LIFE-02 by I-1; ACORP-01/02/03, ACFG-01/02/03, ABYOD-01/02/03 by I-2; plus LIFE-01 that was SATISFIED at the phase level but traceability hadn't flipped) are flipped to `[x]` Complete since both integration caveats are now closed"
    - "After all `[x]` updates: `grep -c '^- \\[x\\] \\*\\*' .planning/REQUIREMENTS.md` in the v1.3 Requirements section equals 15 (all 15 non-NAV v1.3 requirements complete; NAV-01/02/03 were already `[x]`) — and `grep -c '^- \\[ \\] \\*\\*' in the v1.3 Requirements section` equals 0"
    - "The milestone re-audit confirmation via `/gsd-audit-milestone v1.3` or its gsd-tools equivalent returns `status: passed` (status flips from `gaps_found` to `passed`, `scores.requirements` flips from `16/18` to `18/18`, MAJOR integration findings flip from 2 to 0)"
    - "The Phase 30 ROADMAP.md checkbox flips from `[ ]` to `[x]` for Phase 30 overall; Plans 30-09 and 30-10 flip from `[ ]` to `[x]` (they were never executed under Phase 30's own wave — Phase 33 executes them on Phase 30's behalf, and the completion credit accrues to Phase 30)"
  artifacts:
    - path: ".planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md"
      provides: "Phase 30 verification document with 3-source matrix for L1TS-01/02, artifact manifest, behavioral spot-checks, and PASSED verdict"
    - path: ".planning/REQUIREMENTS.md"
      provides: "L1TS-01 and L1TS-02 checkboxes flipped to [x]; caveated-by-I-1/I-2 requirements (LIFE-01/02, ACORP-01/02/03, ACFG-01/02/03, ABYOD-01/02/03) also flipped; Traceability Table status column updated"
    - path: ".planning/ROADMAP.md"
      provides: "Phase 30 checkbox, Plans 30-09 and 30-10 checkboxes, and Phase 33 progress table row all updated to reflect completion"
  key_links:
    - from: ".planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md"
      to: ".planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md"
      via: "Inline markdown reference to the 13-automated-check + 5-manual-check evidence table"
      pattern: "30-VALIDATION\\.md"
    - from: ".planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md"
      to: ".planning/phases/33-v13-gap-closure/33-0{1..3}-SUMMARY.md"
      via: "Cross-phase execution history references explaining that Plans 30-09 and 30-10 were executed under Phase 33 wave 1+2"
      pattern: "33-0[123]-SUMMARY\\.md"
---

<objective>
Produce the Phase 30 verification document that audit gap-closure requires, update REQUIREMENTS.md and ROADMAP.md tracking, and run the milestone re-audit to confirm v1.3 flips from `gaps_found` to `passed`.

**Four deliverables in this plan:**

1. Create `.planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` with the 3-source matrix evidence that L1TS-01 and L1TS-02 are SATISFIED, following the structural template of other v1.3 VERIFICATION.md files (Phase 31 and Phase 32 are the freshest references). The file belongs in the Phase 30 directory, NOT the Phase 33 directory — because it verifies Phase 30's deliverables. Phase 33 is the EXECUTION VEHICLE that completed the pre-authored Phase 30 plans (30-09, 30-10) — the verification credit accrues to Phase 30.

2. Update `.planning/REQUIREMENTS.md`: flip L1TS-01 and L1TS-02 from `[ ]` to `[x]`, update Traceability Table status for both from `Pending` to `Complete`. Additionally, now that I-1 (anchor drift) and I-2 (71 placeholders) are both closed, flip the 13 other caveated requirements (LIFE-01/02, ACORP-01/02/03, ACFG-01/02/03, ABYOD-01/02/03) from `[ ]` to `[x]` — the audit noted these were `SATISFIED (w/ caveat)` pending the two integration fixes.

3. Update `.planning/ROADMAP.md`: flip Phase 30 overall checkbox to `[x]`; flip Plans 30-09 and 30-10 checkboxes to `[x]`; update the progress table row for Phase 30 from `In Progress` to `Complete` with completion date `2026-04-18`; update Phase 33 progress row from `Pending` to `Complete` (or `In Progress` if the checkpoint task 3 of Plan 33-03 has not yet been approved).

4. Run the milestone re-audit: invoke `/gsd-audit-milestone v1.3` (or the gsd-tools programmatic equivalent — `node "$HOME/.claude/get-shit-done/bin/gsd-tools.cjs" audit milestone v1.3` if such a command exists; otherwise document the manual re-audit process). Confirm the output shows `status: passed`, `scores.requirements: 18/18`, `scores.integration: 6/6 flows clean`, and zero MAJOR findings. Record the re-audit output in `33-04-SUMMARY.md`.

This plan is Wave 3 and depends on Plans 33-01 (anchor fix), 33-02 (retrofit), and 33-03 (final gate + human sign-off). Plan 33-03's checkpoint MUST be `approved` before this plan runs — a scope-adjustment or remediation directive from 33-03 blocks this plan.

`autonomous: true` — no human checkpoints in this plan (the human sign-off is in 33-03).
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/REQUIREMENTS.md
@.planning/ROADMAP.md
@.planning/v1.3-MILESTONE-AUDIT.md
@.planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md
@.planning/phases/32-navigation-integration-references/32-VERIFICATION.md
@.planning/phases/31-ios-l2-investigation/31-VERIFICATION.md

<interfaces>
<!-- 30-VERIFICATION.md template structure (derived from 31-VERIFICATION.md and 32-VERIFICATION.md patterns) -->

**Required frontmatter keys** (match the v1.3 VERIFICATION.md convention):
```yaml
---
phase: 30-ios-l1-triage-runbooks
verified: 2026-04-18T{TIME}Z
status: passed
score: 4/4 must-haves verified
overrides_applied: 0
re_verification:
  previous_status: pending   # Phase 30 never produced a prior verification
  previous_score: N/A
  gaps_closed:
    - "Phase 30 Plan 30-09 (71-placeholder retrofit) — executed by Phase 33 Plan 33-02"
    - "Phase 30 Plan 30-10 (final validation gate + human checkpoint) — executed by Phase 33 Plan 33-03"
    - "30-VERIFICATION.md produced — required by v1.3-MILESTONE-AUDIT.md to mark L1TS-01 and L1TS-02 as SATISFIED"
  gaps_remaining: []
  regressions: []
human_verification:
  - test: "{copy any deferred manual items from 30-VALIDATION.md Manual Verification Results that did not PASS}"
    expected: "{copy from VALIDATION.md}"
    why_human: "{copy from VALIDATION.md}"
# If all 5 manual checks PASSED in Plan 33-03 task 2, the human_verification: list is EMPTY
---
```

**Required sections** (in order, following the Phase 31/32 VERIFICATION.md template):
1. `# Phase 30: iOS L1 Triage & Runbooks — Verification Report`
2. Header paragraph: Phase Goal (quote from ROADMAP.md Phase 30), Verified date, Status
3. `## Goal Achievement`
   - `### Observable Truths (Roadmap Success Criteria)` — a 4-row table with the 4 SC items from ROADMAP.md Phase 30, each marked VERIFIED with evidence (triage tree node count ≤5 per SC #1; single-branch banner-only integration per SC #2; 6 symptom H2 runbooks per SC #3; actor-boundary clarity per SC #4 with cross-references to the manual sign-off in 30-VALIDATION.md)
   - `### Required Artifacts` — a table listing all 8 artifacts (triage tree, 6 runbooks, template extension, navigation integrations, 9 retrofitted files, validator, VALIDATION.md, I-1 anchor fix) each marked VERIFIED with file path + evidence
   - `### Key Link Verification` — a table listing the critical cross-file links: triage tree → 6 runbooks via click directives; runbooks → L2 via 31-VERIFICATION.md confirmed retrofit; admin-setup-ios → runbooks via 71-placeholder resolution (links to `33-02-SUMMARY.md`); 01-ade-lifecycle.md:364 → 14-ios-log-collection.md#section-3-sysdiagnose-trigger-and-file-export via 33-01 fix
4. `## Requirements Coverage`
   - A 3-source matrix table: for L1TS-01 and L1TS-02, show (a) VERIFICATION.md status (this document — both SATISFIED), (b) SUMMARY frontmatter listed (the 30-0X-SUMMARY.md files have `requirements: [...]` frontmatter — L1TS-01 claimed by 30-02; L1TS-02 claimed by 30-03/04/05/06/07 + 33-02), (c) REQUIREMENTS.md status (updated by task 2 of this plan to `[x]` Complete)
5. `## Behavioral Spot-Checks`
   - Grep-verifiable command table pulled from 30-VALIDATION.md § Per-Task Verification Map — 13 automated checks PASS/SKIPPED status + one cross-check that the 2 audit-blockers are closed: `grep -rn "iOS L1 runbooks (Phase 30)" docs/admin-setup-ios/` returns zero; `grep -rn "#section-3-mac-cable-sysdiagnose" docs/` returns zero
6. `## Anti-Patterns Found`
   - Typically "None" for a gap-closure verification (the audit's findings were exactly the ones closed); if 33-03 manual checks surfaced a NOTED ISSUE, document it here as non-blocking
7. `## Phase 33 Execution Note (Cross-Phase Traceability)`
   - Explicit section explaining that Plans 30-09 and 30-10 were pre-authored by Phase 30 planning but executed by Phase 33 plans 33-02 and 33-03 respectively. Cite `33-02-SUMMARY.md` for retrofit evidence and `33-03-SUMMARY.md` for final-gate evidence. This preserves the audit trail that the per-row judgment, atomic commit contract (D-20), and validation checks belong to Phase 30's plan-time decisions; only the execution was deferred.
8. `## Human Verification Required`
   - Copy any unresolved manual items from 30-VALIDATION.md Manual Verification Results; if all PASS, state "None — all 5 manual verifications PASSED in Plan 33-03 task 2"
9. `## Autonomous Sign-Off`
   - A bullet list mirroring Phase 32 VERIFICATION.md's sign-off style: each of the 4 SCs VERIFIED, each of the 2 requirements SATISFIED, audit I-1 and I-2 closed, validator exit 0, etc.

**REQUIREMENTS.md edit targets** (lines in current file):
- Line 35: `- [ ] **L1TS-01**: ...` → `- [x] **L1TS-01**: ...`
- Line 36: `- [ ] **L1TS-02**: ...` → `- [x] **L1TS-02**: ...`
- Lines 12-13 (LIFE-01/02): caveated by I-1 — now flip to `[x]` after I-1 closed
- Lines 17-19 (ACORP-01/02/03): caveated by I-2 — flip to `[x]`
- Lines 23-25 (ACFG-01/02/03): caveated by I-2 — flip to `[x]`
- Lines 29-31 (ABYOD-01/02/03): caveated by I-2 — flip to `[x]`
- Line 40 (L2TS-01), line 41 (L2TS-02): already SATISFIED by Phase 31 per audit table — flip to `[x]`
- Lines 45-47 (NAV-01/02/03): already `[x]` per prior milestone audit update — leave unchanged
- Traceability Table lines 89-106: flip the `Status` column for L1TS-01 and L1TS-02 from `Pending` to `Complete`; flip the 11 `SATISFIED (w/ caveat)` / `Pending` entries in the `Phase 33 (gap closure)` + `Phase 26/27/28/29/31` rows to `Complete`
- Update the footer timestamp on line 115 from `Last updated: 2026-04-18` to `Last updated: 2026-04-18 — L1TS-01/02 SATISFIED via Phase 33 gap closure; 13 caveated requirements flipped to Complete after I-1/I-2 closure; v1.3 milestone 18/18`

**ROADMAP.md edit targets** (grep for current placeholder rows):
- Line 68 (`- [ ] **Phase 30: iOS L1 Triage & Runbooks**`) → `- [x] **Phase 30: iOS L1 Triage & Runbooks** - iOS triage decision tree and 6 L1 runbooks for top failure scenarios (completed 2026-04-18 via Phase 33 gap closure)`
- Line 155 (`- [ ] 30-08-PLAN.md — Navigation integration:`) → `- [x] 30-08-PLAN.md — ...` (30-08 actually executed via Phase 32 Plan 32-00 absorption per the audit; validate)
- Line 156 (`- [ ] 30-09-PLAN.md — 9-file admin-setup-ios retrofit`) → `- [x] 30-09-PLAN.md — ... (executed under Phase 33 Plan 33-02 on 2026-04-18)`
- Line 157 (`- [ ] 30-10-PLAN.md — Final validation gate`) → `- [x] 30-10-PLAN.md — ... (executed under Phase 33 Plan 33-03 on 2026-04-18)`
- Line 71 (`- [ ] **Phase 33: v1.3 Gap Closure**`) → `- [x] **Phase 33: v1.3 Gap Closure** - ... (completed 2026-04-18)` — ONLY if all 4 Phase 33 plans have shipped; if Plan 33-04 (this plan) is still in-flight, leave as In Progress
- Progress table row for Phase 30 (line 250): `| 30. iOS L1 Triage & Runbooks | v1.3 | 7/10 | In Progress|  |` → `| 30. iOS L1 Triage & Runbooks | v1.3 | 10/10 | Complete | 2026-04-18 |`
- Progress table row for Phase 33 (line 253): `| 33. v1.3 Gap Closure | v1.3 | 0/4 | Pending |  |` → `| 33. v1.3 Gap Closure | v1.3 | 4/4 | Complete | 2026-04-18 |`

**Milestone re-audit invocation:**
The gsd-tools audit command is `node "$HOME/.claude/get-shit-done/bin/gsd-tools.cjs" audit milestone v1.3` if implemented, else the equivalent `/gsd-audit-milestone v1.3` slash command. Either route produces a JSON report with frontmatter fields matching `.planning/v1.3-MILESTONE-AUDIT.md`. Expected output:
- `status: passed` (was `gaps_found`)
- `scores.requirements: 18/18` (was `16/18`)
- `scores.integration: 6_flows_clean` (was `4/6_flows_clean`)
- `scores.flows: 6/6` (was `5/6`)
- `gaps.requirements: []` (was L1TS-01, L1TS-02)
- `gaps.integration: []` (was I-1, I-2)

If the re-audit returns anything other than `passed`, document the residual gap(s) in `33-04-SUMMARY.md` as a Phase 34 backlog item; do NOT mark Phase 33 complete.
</interfaces>
</context>

<tasks>

<task type="auto" tdd="false">
  <name>Task 1: Create 30-VERIFICATION.md with 3-source matrix for L1TS-01 + L1TS-02</name>
  <read_first>
    - `.planning/phases/31-ios-l2-investigation/31-VERIFICATION.md` (freshest v1.3 verification template — use this structure for 30-VERIFICATION.md; focus on §Goal Achievement → Observable Truths + Required Artifacts + Key Link Verification + Requirements Coverage sections and frontmatter schema)
    - `.planning/phases/32-navigation-integration-references/32-VERIFICATION.md` (second-freshest template — note the re-verification frontmatter pattern, but for Phase 30 this will be the FIRST verification so `re_verification.previous_status: pending` instead of quoting a prior verification)
    - `.planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md` (AFTER Plan 33-03 task 1 updated it — all 13 checks should have final status + Manual Verification Results subsection added by 33-03 task 2; the Behavioral Spot-Checks table in 30-VERIFICATION.md pulls from here)
    - `.planning/ROADMAP.md` § Phase 30 (lines 137-157) — Phase 30 Success Criteria are the "Observable Truths" rows in 30-VERIFICATION.md
    - `.planning/REQUIREMENTS.md` lines 33-36 (L1TS-01, L1TS-02 definitions) and lines 100-101 (Traceability Table rows)
    - `.planning/v1.3-MILESTONE-AUDIT.md` gaps.requirements section (for the "gaps_closed" list in frontmatter: documents that Plans 30-09 and 30-10 were pre-authored but not executed — Phase 33 closes this)
    - `.planning/phases/33-v13-gap-closure/33-01-SUMMARY.md`, `33-02-SUMMARY.md`, `33-03-SUMMARY.md` (Wave 1 + Wave 2 execution evidence that this verification cites — they exist after those plans run; if this plan runs before those summaries exist, pause until 33-03 is `approved`)
    - All 6 L1 runbook files: `docs/l1-runbooks/{16,17,18,19,20,21}-ios-*.md` (Artifact Manifest table rows)
    - `docs/decision-trees/07-ios-triage.md` (Artifact Manifest + SC #1/#2 evidence)
    - `docs/_templates/l1-template.md` (D-24 platform enum extension — Artifact Manifest row)
  </read_first>
  <behavior>
    - A new file exists at `.planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md`
    - The frontmatter contains: `phase: 30-ios-l1-triage-runbooks`, `verified: 2026-04-18T{TIME}Z`, `status: passed`, `score: 4/4 must-haves verified`, `overrides_applied: 0`, a `re_verification` block documenting the gaps_closed by Phase 33
    - The body contains (in order): header paragraph, Goal Achievement (with Observable Truths + Required Artifacts + Key Link Verification subsections), Requirements Coverage (with 3-source matrix for L1TS-01 and L1TS-02), Behavioral Spot-Checks (pulled from 30-VALIDATION.md + Phase 33 audit-closure greps), Anti-Patterns Found, Phase 33 Execution Note, Human Verification Required, Autonomous Sign-Off
    - The 3-source matrix in Requirements Coverage clearly shows L1TS-01 and L1TS-02 SATISFIED across all three sources (VERIFICATION status = passed; SUMMARY frontmatter = listed via 30-02 for L1TS-01 and 30-03/04/05/06/07 + 33-02 for L1TS-02; REQUIREMENTS.md = to be updated by task 2 of this plan to `[x]`)
    - The Behavioral Spot-Checks table includes at minimum these audit-closure rows: (a) `grep -rn "iOS L1 runbooks (Phase 30)" docs/admin-setup-ios/` = 0 matches (I-2 closed by 33-02); (b) `grep -rn "#section-3-mac-cable-sysdiagnose" docs/` = 0 matches (I-1 closed by 33-01); (c) `node scripts/validation/check-phase-30.mjs; echo $?` = 0 (all 13 checks PASS per 33-03 task 1)
    - The Anti-Patterns Found section either states "No blocking anti-patterns found" OR documents any NOTED ISSUE from 33-03 task 2 Manual Verification Results with a non-blocking disposition
    - The Phase 33 Execution Note section explicitly cites `33-02-SUMMARY.md` and `33-03-SUMMARY.md` and explains the cross-phase execution arrangement (Phase 30 authored the plans 30-09 and 30-10; Phase 33 executed them; Phase 30 retains the verification credit)
  </behavior>
  <action>
    1. **Use the Write tool** (not heredoc) to create `.planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` with the complete structure specified in the `<interfaces>` block's template.

    2. **Frontmatter construction:**
       - Open `31-VERIFICATION.md` and copy the frontmatter schema. Adapt:
         - `phase: 30-ios-l1-triage-runbooks`
         - `verified:` = current UTC timestamp
         - `status: passed` (assuming all 13 automated checks PASS from 33-03 task 1 and all 5 manual checks PASS from 33-03 task 2; if any SKIPPED/NOTED ISSUE, use `passed_with_notes` and document in Anti-Patterns Found)
         - `score: 4/4 must-haves verified`
         - `overrides_applied: 0`
         - `re_verification.previous_status: pending` (Phase 30 never produced a prior verification — this is the FIRST verification for Phase 30)
         - `re_verification.gaps_closed`: list the 3 items from the `<interfaces>` block
         - `re_verification.gaps_remaining: []`
         - `re_verification.regressions: []`
         - `human_verification:` — if all 5 manual checks in 33-03 task 2 PASSED, leave this list empty; otherwise copy any NOTED ISSUE / NEEDS FOLLOW-UP rows from 30-VALIDATION.md Manual Verification Results

    3. **Body construction:**
       - Header paragraph: Quote Phase 30's goal verbatim from ROADMAP.md line 138 (`An L1 service desk agent has a structured decision tree and six scenario runbooks to resolve the most common iOS enrollment, compliance, and app deployment failures without escalating to L2`). State verified date, status, and "First verification — Phase 30's initial verification deferred until Phase 33 gap closure per v1.3-MILESTONE-AUDIT.md."

       - `## Goal Achievement` → `### Observable Truths (Roadmap Success Criteria)` table: 4 rows, one per ROADMAP SC for Phase 30 (lines 141-145). Each row: # / Truth / Status VERIFIED / Evidence. Evidence cites specific files, line numbers, validator check IDs, and 30-VALIDATION.md references.
         - SC #1 (≤5-node triage tree): Evidence = `grep -cE "^\s*IOS[0-9]+\{" docs/decision-trees/07-ios-triage.md` ≤ 5 + validator Check 1 PASS
         - SC #2 (single-branch banner-only integration): Evidence = no Mermaid iOS logic in `00-initial-triage.md` + validator Check 2 PASS
         - SC #3 (6 scenario runbooks with symptom/L1 steps/escalation): Evidence = 6 files `docs/l1-runbooks/{16,17,18,19,20,21}-ios-*.md` + validator Checks 3, 7, 11, 12 PASS
         - SC #4 (L1/admin/user actor boundaries unambiguous): Evidence = D-10 sectioned format + validator Check 4 PASS + 33-03 task 2 Manual Verification Row 2 PASS (actor-boundary clarity)

       - `### Required Artifacts` table: 8 rows — one per artifact category. Status VERIFIED. Evidence = file existence + line count + key grep confirming structural presence.

       - `### Key Link Verification` table: 6+ rows listing critical links (triage tree click directives → 6 runbooks; runbook back-links to triage tree; admin-setup-ios 71 retrofit links; 00-initial-triage banner → triage tree; 00-index.md iOS section → 6 runbooks; 01-ade-lifecycle.md:364 → 14-ios-log-collection.md Section 3). Status: all WIRED. Evidence: file:line references + grep confirmations.

       - `## Requirements Coverage` → 3-source matrix table (2 rows, one per requirement): Requirement / Phase / VERIFICATION Status / SUMMARY Frontmatter / REQUIREMENTS.md / Final Status / Notes. For L1TS-01: VERIFICATION=passed (this file), SUMMARY=listed (30-02), REQUIREMENTS.md=`[x]` (post-task 2 of this plan), Final=SATISFIED. For L1TS-02: VERIFICATION=passed, SUMMARY=listed (30-03/04/05/06/07 + 33-02 for retrofit execution), REQUIREMENTS.md=`[x]`, Final=SATISFIED.

       - `## Behavioral Spot-Checks` table — pull from 30-VALIDATION.md § Per-Task Verification Map after 33-03 task 1 updated it. Include at minimum:
         - All 13 automated checks with command + result + status (copy from VALIDATION.md)
         - Audit-closure row: `grep -rn "iOS L1 runbooks (Phase 30)" docs/admin-setup-ios/` → 0 → PASS (I-2 closed)
         - Audit-closure row: `grep -rn "#section-3-mac-cable-sysdiagnose" docs/` → 0 → PASS (I-1 closed)
         - Full-suite validator row: `node scripts/validation/check-phase-30.mjs; echo $?` → 0 → PASS

       - `## Anti-Patterns Found` — if 33-03 task 2 found any NOTED ISSUE, document here with file:line and non-blocking disposition. If zero, state "No blocking anti-patterns found in Phase 30 touched files or Phase 33 gap-closure edits."

       - `## Phase 33 Execution Note (Cross-Phase Traceability)` — explicit paragraph:
         > Phase 30 planning produced 10 plans (30-00 through 30-10). Plans 30-01 through 30-07 shipped in Phase 30's own execution wave (2026-04-17). Plan 30-08 was absorbed into Phase 32 Plan 32-00 (navigation integration). Plans 30-09 (71-placeholder retrofit) and 30-10 (final validation gate + human checkpoint) were pre-authored but never executed under Phase 30's own wave — they were deferred due to phase-boundary constraints.
         > Phase 33 (v1.3 gap closure) executed these two plans faithfully:
         > - Plan 30-09 executed by **Phase 33 Plan 33-02** on 2026-04-18 — see `.planning/phases/33-v13-gap-closure/33-02-SUMMARY.md` for evidence (71 placeholders resolved; D-20 atomic commit `docs(30): resolve iOS L1 runbook placeholders in admin-setup-ios`)
         > - Plan 30-10 executed by **Phase 33 Plan 33-03** on 2026-04-18 — see `.planning/phases/33-v13-gap-closure/33-03-SUMMARY.md` for evidence (13 automated checks PASS; 5 manual verifications recorded; human checkpoint approved)
         > Phase 33 is the execution vehicle; Phase 30 retains the verification credit because the per-row judgment, commit-message contract, and validation strategy are all Phase 30 plan-time decisions. This document (`30-VERIFICATION.md`) verifies Phase 30's deliverables via the completed execution under Phase 33.

       - `## Human Verification Required` — if 33-03 task 2 recorded all PASS, state "None — all 5 manual verifications PASSED in Plan 33-03 task 2 on 2026-04-18. Verifier sign-off recorded in 33-03-SUMMARY.md." If any deferred manual items, list them with expected / why_human columns.

       - `## Autonomous Sign-Off` — bullet list: SC #1/#2/#3/#4 VERIFIED, L1TS-01/02 SATISFIED, I-1/I-2 CLOSED, validator exit 0, D-10 through D-20 compliance confirmed, Phase 33 execution trail documented.

    4. **Save the file and verify:**
       - `test -f .planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` exits 0
       - `grep -c "^---$" .planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` = 2 (frontmatter delimiters)
       - `grep -c "^## " .planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` ≥ 6 (Goal Achievement + Requirements Coverage + Behavioral Spot-Checks + Anti-Patterns + Phase 33 Execution Note + Human Verification + Autonomous Sign-Off; actually ≥7 typically)
       - `grep -c "L1TS-01" .planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` ≥ 2 (at least the 3-source matrix row + autonomous sign-off bullet)
       - `grep -c "L1TS-02" .planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` ≥ 2
       - `grep -c "33-02-SUMMARY.md" .planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` ≥ 1 (Phase 33 Execution Note)
       - `grep -c "33-03-SUMMARY.md" .planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` ≥ 1

    **Do NOT:**
    - Place the verification file in `.planning/phases/33-v13-gap-closure/` — it belongs in the Phase 30 directory
    - Copy the verbatim body of 30-VALIDATION.md into this file — reference it by relative path + grep-confirm key facts
    - Assume all manual checks PASSED without reading 33-03-SUMMARY.md — use the actual outcomes
    - Flip REQUIREMENTS.md or ROADMAP.md in this task — tasks 2 and 3 do that
  </action>
  <verify>
    <automated>test -f .planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md && grep -c "status: passed" .planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md</automated>
  </verify>
  <acceptance_criteria>
    - `test -f .planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` exits 0 (file exists)
    - `grep -c "^phase: 30-ios-l1-triage-runbooks$" .planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` = 1
    - `grep -c "^status: passed$" .planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` = 1 (OR `^status: passed_with_notes$` if any manual check had NOTED ISSUE)
    - `grep -c "^score: 4/4 must-haves verified" .planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` = 1
    - `grep -cE "^## (Goal Achievement|Requirements Coverage|Behavioral Spot-Checks|Phase 33 Execution Note|Autonomous Sign-Off)" .planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` ≥ 5 (all major sections present)
    - `grep -cE "L1TS-0[12]" .planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` ≥ 4 (both requirements appear in the 3-source matrix + sign-off)
    - `grep -c "33-02-SUMMARY.md" .planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` ≥ 1 (Phase 33 Execution Note cites retrofit evidence)
    - `grep -c "33-03-SUMMARY.md" .planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` ≥ 1 (Phase 33 Execution Note cites final-gate evidence)
    - `grep -c "I-1" .planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` ≥ 1 (audit closure note)
    - `grep -c "I-2" .planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` ≥ 1 (audit closure note)
    - File size ≥ 5KB (typical VERIFICATION.md is 5-15KB; under 5KB suggests structural gaps — Phase 31 is 14KB, Phase 32 is 15KB)
    - No content files modified (this task writes only to `.planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md`)
  </acceptance_criteria>
  <done>
    `30-VERIFICATION.md` file exists in the Phase 30 directory with the v1.3-standard structure, 3-source matrix evidence that L1TS-01 and L1TS-02 are SATISFIED, a Phase 33 Execution Note documenting the cross-phase execution arrangement, and an Autonomous Sign-Off section.
  </done>
</task>

<task type="auto" tdd="false">
  <name>Task 2: Flip REQUIREMENTS.md checkboxes and update Traceability Table</name>
  <read_first>
    - `.planning/REQUIREMENTS.md` in full (current state — 15 v1.3 requirements all `[ ]` except NAV-01/02/03 which are `[x]`; the Traceability Table lines 89-106 has current status values)
    - `.planning/v1.3-MILESTONE-AUDIT.md` § Requirements Coverage (3-Source Cross-Reference) table lines 120-141 — the audit's per-requirement status verdicts drive which checkboxes flip
    - `.planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` (created by task 1 of this plan — authoritative source that L1TS-01 and L1TS-02 are now SATISFIED)
    - All existing phase VERIFICATION.md files (`26-VERIFICATION.md` through `32-VERIFICATION.md` — confirm their status fields are `passed` or `human_needed` with autonomous PASS; the audit's "SATISFIED (w/ caveat)" verdicts were caused by I-1/I-2 which are now both closed, so the caveats lift and the status flips to `[x]`)
  </read_first>
  <behavior>
    - `.planning/REQUIREMENTS.md` line 35 (L1TS-01) flips from `- [ ] **L1TS-01**:` to `- [x] **L1TS-01**:`
    - `.planning/REQUIREMENTS.md` line 36 (L1TS-02) flips from `- [ ] **L1TS-02**:` to `- [x] **L1TS-02**:`
    - Lines 12, 13 (LIFE-01, LIFE-02) flip from `[ ]` to `[x]` (LIFE-02 was caveated by I-1 — now closed by 33-01; LIFE-01 was SATISFIED at phase level per audit)
    - Lines 17, 18, 19 (ACORP-01/02/03) flip to `[x]` (caveated by I-2 — closed by 33-02)
    - Lines 23, 24, 25 (ACFG-01/02/03) flip to `[x]` (caveated by I-2 — closed by 33-02)
    - Lines 29, 30, 31 (ABYOD-01/02/03) flip to `[x]` (caveated by I-2 — closed by 33-02)
    - Lines 40, 41 (L2TS-01, L2TS-02) flip to `[x]` (already SATISFIED by Phase 31 per audit table — previously uncounted in REQUIREMENTS.md traceability)
    - Lines 45-47 (NAV-01/02/03) left as `[x]` (already checked from Phase 32)
    - Traceability Table (lines 89-106): every `Pending` status for the flipped requirements becomes `Complete`; L1TS-01 and L1TS-02 rows update to `Phase 33 (gap closure) — Complete`
    - Footer timestamp (line 115) updates to document Phase 33 closure
    - Counter arithmetic: post-task `grep -c "^- \\[x\\] \\*\\*" .planning/REQUIREMENTS.md` in the v1.3 Requirements section = 18; `grep -c "^- \\[ \\] \\*\\*"` in that section = 0 (all 18 v1.3 requirements complete)
  </behavior>
  <action>
    1. **Load REQUIREMENTS.md fully** (read lines 1-116). Locate each of the 15 `[ ]` checkboxes to flip (LIFE-01, LIFE-02, ACORP-01/02/03, ACFG-01/02/03, ABYOD-01/02/03, L1TS-01, L1TS-02, L2TS-01, L2TS-02).

    2. **Flip each checkbox from `- [ ]` to `- [x]`** preserving the rest of the line byte-for-byte. The only character that changes is the space inside the brackets becomes `x`.

    3. **Update the Traceability Table** (lines 87-106 in the current file — row range for v1.3 requirements):
       - For rows with `Pending` status where the requirement has been flipped to `[x]`, change status to `Complete`
       - For L1TS-01 and L1TS-02 rows, the `Phase` column should already read `Phase 33 (gap closure)` per the 2026-04-18 footer note; if not, update it
       - Add a footnote or cell annotation linking L1TS-01/02 completion to `.planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md`

    4. **Update the coverage arithmetic** in the `**Coverage:**` block (lines 108-111):
       - Currently reads: `v1.3 requirements: 18 total`, `Mapped to phases: 18`, `Unmapped: 0`
       - Add: `Complete: 18` below the existing entries to make the completion count explicit

    5. **Update the footer timestamp** (line 115) from:
       `*Last updated: 2026-04-18 — L1TS-01/L1TS-02 reassigned to Phase 33 (gap closure) per v1.3-MILESTONE-AUDIT.md. Other Pending entries remain at original phase; 15 flip to Complete after Phase 33 closes integration caveats I-1/I-2.*`
       to:
       `*Last updated: 2026-04-18 — Phase 33 gap closure complete. L1TS-01/L1TS-02 SATISFIED via Phase 30 verification (30-VERIFICATION.md). Integration caveats I-1 (01-ade-lifecycle.md:364 anchor drift) and I-2 (71 admin-setup-ios placeholders) closed by Phase 33 Plans 33-01 and 33-02 respectively. v1.3 milestone: 18/18 requirements complete.*`

    6. **Verify the edits:**
       - Count `[x]` entries in v1.3 Requirements section (lines 10-47): should be 18
       - Count `[ ]` entries in v1.3 Requirements section (lines 10-47): should be 0
       - All Traceability Table rows for v1.3 requirements (lines 89-106) show `Complete` (or the same Future/Out-of-Scope status they had before)
       - No edits outside REQUIREMENTS.md

    **Do NOT:**
    - Flip Future Requirements (lines 50-65) — those remain deferred
    - Flip Out of Scope table entries (lines 68-82)
    - Modify the header or core requirement descriptions — only the checkbox state changes
    - Stage the file in this task (commit is task 4)
  </action>
  <verify>
    <automated>bash -c 'REQ_FILE=".planning/REQUIREMENTS.md"; CHECKED=$(awk "/^### L1TS/,/^### Future/" "$REQ_FILE" | grep -c "^- \[x\]"); echo "v1.3 checked=$CHECKED"; UNCHECKED=$(sed -n "10,47p" "$REQ_FILE" | grep -c "^- \[ \]"); echo "v1.3 unchecked=$UNCHECKED"; test "$UNCHECKED" = "0"'</automated>
  </verify>
  <acceptance_criteria>
    - `sed -n '10,47p' .planning/REQUIREMENTS.md | grep -c "^- \[ \]"` outputs `0` (no remaining unchecked v1.3 requirement checkboxes)
    - `sed -n '10,47p' .planning/REQUIREMENTS.md | grep -c "^- \[x\]"` outputs at least `15` (LIFE-01/02, ACORP-01/02/03, ACFG-01/02/03, ABYOD-01/02/03, L1TS-01/02, L2TS-01/02, NAV-01/02/03 — 18 total; some of these may not be at the start of a line with `- [x] **`, so the exact count depends on line structure; minimum is 15 non-NAV)
    - `grep -c "^- \[x\] \*\*L1TS-01\*\*" .planning/REQUIREMENTS.md` = 1
    - `grep -c "^- \[x\] \*\*L1TS-02\*\*" .planning/REQUIREMENTS.md` = 1
    - `grep -c "^- \[x\] \*\*LIFE-01\*\*" .planning/REQUIREMENTS.md` = 1
    - `grep -c "^- \[x\] \*\*LIFE-02\*\*" .planning/REQUIREMENTS.md` = 1
    - Traceability Table (lines 89-106): `grep -c "| Pending |" .planning/REQUIREMENTS.md` in the v1.3 section should be 0
    - Footer timestamp (last line of file) mentions `Phase 33 gap closure complete` and `18/18`
    - `git diff --stat .planning/REQUIREMENTS.md` shows modifications (not empty — this task must change the file)
    - No files modified outside `.planning/REQUIREMENTS.md`
  </acceptance_criteria>
  <done>
    All 15 previously-`[ ]` v1.3 requirements flipped to `[x]`. Traceability Table status column updated for all flipped requirements. Footer timestamp documents Phase 33 completion. Coverage arithmetic updated.
  </done>
</task>

<task type="auto" tdd="false">
  <name>Task 3: Update ROADMAP.md Phase 30 and Phase 33 completion tracking</name>
  <read_first>
    - `.planning/ROADMAP.md` in full (current state — Phase 30 shows `7/10 In Progress`, Phase 33 shows `0/4 Pending`, Plans 30-09/30-10 show `[ ]` unchecked)
    - `.planning/phases/33-v13-gap-closure/33-01-SUMMARY.md`, `33-02-SUMMARY.md`, `33-03-SUMMARY.md` (confirm they exist — each represents one completed plan)
    - `.planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` (created by task 1 of this plan — confirms Phase 30 is verified complete)
  </read_first>
  <behavior>
    - Line 68 (`- [ ] **Phase 30: iOS L1 Triage & Runbooks**`) flipped to `- [x] **Phase 30: iOS L1 Triage & Runbooks**` with completion note `(completed 2026-04-18 via Phase 33 gap closure)`
    - Line 71 (`- [ ] **Phase 33: v1.3 Gap Closure**`) flipped to `- [x] **Phase 33: v1.3 Gap Closure**` with completion note `(completed 2026-04-18)` — ONLY if Plan 33-04 (this plan's task 4) also completes; if this task runs mid-execution, leave as In Progress and let a later run update it
    - Line 155 (`- [ ] 30-08-PLAN.md`) flipped to `- [x] 30-08-PLAN.md` — but 30-08 was actually absorbed into Phase 32 Plan 32-00 per 30-VALIDATION.md Plan column mapping; update the description to note the absorption: `- [x] 30-08-PLAN.md — Navigation integration: 00-initial-triage.md banner + 00-index.md iOS section (executed via Phase 32 Plan 32-00 absorption)`
    - Line 156 (`- [ ] 30-09-PLAN.md`) flipped to `- [x] 30-09-PLAN.md` with annotation `(executed under Phase 33 Plan 33-02 on 2026-04-18)`
    - Line 157 (`- [ ] 30-10-PLAN.md`) flipped to `- [x] 30-10-PLAN.md` with annotation `(executed under Phase 33 Plan 33-03 on 2026-04-18)`
    - Phase 30 progress table row (line 250): `| 30. iOS L1 Triage & Runbooks | v1.3 | 7/10 | In Progress|  |` → `| 30. iOS L1 Triage & Runbooks | v1.3 | 10/10 | Complete | 2026-04-18 |`
    - Phase 33 progress table row (line 253): `| 33. v1.3 Gap Closure | v1.3 | 0/4 | Pending |  |` → `| 33. v1.3 Gap Closure | v1.3 | 4/4 | Complete | 2026-04-18 |` (same caveat as line 71 — if this task runs before Plan 33-04 commits, use `3/4 In Progress` instead)
    - v1.3 milestone bullet (line 8): `[ ] **v1.3 ... (in progress)**` → `✅ **v1.3 iOS/iPadOS Provisioning Documentation** — Phases 26-33 (shipped 2026-04-18)` — BUT this depends on whether the user wants to declare v1.3 shipped at this exact moment; safer posture: leave as `(in progress)` and note that the gsd-release-milestone command is the natural ship-declaration point; document in SUMMARY
    - Phase 33 section body (lines 200-215): update `**Plans:** 0/4 tasks planned` to `**Plans:** 4/4 plans complete`; flip each of the 4 task checkboxes at lines 212-215 to `[x]`
  </behavior>
  <action>
    1. **Read ROADMAP.md** lines 60-75 (v1.3 phase checklist) and lines 200-215 (Phase 33 section) and lines 245-255 (progress table Phase 30-33 rows).

    2. **Flip the phase-level checkboxes:**
       - Line 68: Phase 30 `[ ]` → `[x]` + append `(completed 2026-04-18 via Phase 33 gap closure)` after the description
       - Line 71: Phase 33 `[ ]` → `[x]` + append `(completed 2026-04-18)` — conditional on all 4 Phase 33 plans having shipped; check `.planning/phases/33-v13-gap-closure/33-0{1..4}-SUMMARY.md` file existence before flipping

    3. **Flip the plan-level checkboxes within Phase 30 plans list** (lines ~155-157):
       - Line 155: 30-08 `[ ]` → `[x]` + annotation `(absorbed into Phase 32 Plan 32-00)`
       - Line 156: 30-09 `[ ]` → `[x]` + annotation `(executed under Phase 33 Plan 33-02 on 2026-04-18)`
       - Line 157: 30-10 `[ ]` → `[x]` + annotation `(executed under Phase 33 Plan 33-03 on 2026-04-18)`

    4. **Update the progress table** (lines 250-253):
       - Phase 30 row: cells 3 (Plans Complete) `7/10` → `10/10`; cell 4 (Status) `In Progress` → `Complete`; cell 5 (Completed) blank → `2026-04-18`
       - Phase 33 row: cells 3 `0/4` → `4/4`; cell 4 `Pending` → `Complete`; cell 5 blank → `2026-04-18`

    5. **Update the Phase 33 section body** (lines 200-215):
       - Line with `**Plans:** 0/4 tasks planned` → `**Plans:** 4/4 plans complete`
       - Replace the Tasks list (lines 211-215) with a Plans list mirroring other completed phases:
         ```
         Plans:
         - [x] 33-01-PLAN.md — I-1 anchor fix in 01-ade-lifecycle.md:364
         - [x] 33-02-PLAN.md — Execute pre-authored 30-09 (71-placeholder retrofit across 9 admin-setup-ios files)
         - [x] 33-03-PLAN.md — Execute pre-authored 30-10 (final validation gate + 5 manual verifications + human checkpoint)
         - [x] 33-04-PLAN.md — Produce 30-VERIFICATION.md + update REQUIREMENTS.md/ROADMAP.md + milestone re-audit
         ```

    6. **Do NOT update the milestone header** (line 8) — v1.3 ship declaration is the natural outcome of a successful milestone re-audit (task 4 of this plan); if the re-audit returns `status: passed`, task 4's SUMMARY recommends the user invoke `/gsd-release-milestone v1.3` to flip the header `✅`. This is a user-driven act, not a plan auto-action, per the project's shipping discipline.

    7. **Save the file and verify:**
       - `grep -c "Phase 30.*\*\*Phase 30" .planning/ROADMAP.md` or simpler: `grep -c "\[x\] \*\*Phase 30" .planning/ROADMAP.md` ≥ 1
       - `grep -c "\[x\] \*\*Phase 33" .planning/ROADMAP.md` ≥ 1 (if Plan 33-04 is committed; otherwise this is 0)
       - Phase 30 progress row contains `10/10` and `Complete` and `2026-04-18`
       - Phase 33 progress row contains `4/4` (or `3/4`) and `Complete` (or `In Progress`) and `2026-04-18`

    **Do NOT:**
    - Flip the v1.3 milestone header `✅` — that's a separate user-driven ship action
    - Commit the file in this task (task 4 bundles commits)
    - Modify phase content outside the v1.3 section
  </action>
  <verify>
    <automated>bash -c 'grep -c "\[x\] \*\*Phase 30" .planning/ROADMAP.md'</automated>
  </verify>
  <acceptance_criteria>
    - `grep -c "\[x\] \*\*Phase 30" .planning/ROADMAP.md` ≥ 1 (Phase 30 checkbox flipped)
    - `grep -c "^- \[x\] 30-09-PLAN.md" .planning/ROADMAP.md` = 1 (30-09 plan-level checkbox flipped)
    - `grep -c "^- \[x\] 30-10-PLAN.md" .planning/ROADMAP.md` = 1 (30-10 flipped)
    - `grep -c "^| 30\. iOS L1 Triage & Runbooks | v1.3 | 10/10 | Complete" .planning/ROADMAP.md` = 1 (progress table row)
    - `grep -c "executed under Phase 33" .planning/ROADMAP.md` ≥ 2 (traceability annotations on 30-09 and 30-10 plan entries)
    - `grep -c "2026-04-18" .planning/ROADMAP.md` ≥ 2 (completion dates on the Phase 30 + Phase 33 rows)
    - `git diff --stat .planning/ROADMAP.md` shows modifications
    - No files modified outside `.planning/ROADMAP.md`
  </acceptance_criteria>
  <done>
    ROADMAP.md shows Phase 30 and Phase 33 as complete with completion dates; plans 30-09 and 30-10 flipped with cross-phase execution annotations; progress table updated.
  </done>
</task>

<task type="auto" tdd="false">
  <name>Task 4: Run milestone re-audit, commit all changes, and confirm v1.3 passes</name>
  <read_first>
    - `.planning/v1.3-MILESTONE-AUDIT.md` § frontmatter (current state: `status: gaps_found`, `scores.requirements: 16/18`, `scores.integration: 4/6_flows_clean`, `gaps.requirements: [L1TS-01, L1TS-02]`, `gaps.integration: [I-1, I-2]`)
    - `.planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` (produced by task 1)
    - `.planning/REQUIREMENTS.md` (updated by task 2)
    - `.planning/ROADMAP.md` (updated by task 3)
    - `.planning/phases/33-v13-gap-closure/33-0{1..3}-SUMMARY.md` (Wave 1 + 2 execution evidence — already committed by those plans)
  </read_first>
  <behavior>
    - The milestone re-audit is invoked via `/gsd-audit-milestone v1.3` (slash command) OR the programmatic equivalent (`node "$HOME/.claude/get-shit-done/bin/gsd-tools.cjs" audit milestone v1.3` if available — check `node "$HOME/.claude/get-shit-done/bin/gsd-tools.cjs" --help` for the correct sub-command signature)
    - The re-audit output is captured and recorded in `33-04-SUMMARY.md`
    - If the re-audit returns `status: passed` with `scores.requirements: 18/18` and zero MAJOR integration findings: tasks 1, 2, 3 artifacts are committed in a single commit `docs(33): close v1.3 milestone — produce 30-VERIFICATION.md, flip 15 requirement checkboxes, update ROADMAP`
    - If the re-audit returns anything other than `status: passed`: document the residual gap(s) in `33-04-SUMMARY.md`; mark Plan 33-04 as PARTIALLY COMPLETE with a blocker list; do NOT mark Phase 33 or v1.3 as complete; the commit still lands (the artifacts are correct) but the SUMMARY identifies what needs a Phase 34 follow-up
    - If the audit tool is unavailable (slash command not runnable in agent context, programmatic equivalent not implemented), perform a manual re-audit by reading the gaps array in `.planning/v1.3-MILESTONE-AUDIT.md` and grep-verifying each gap closure:
       - Gap I-1 closure: `grep -rn "#section-3-mac-cable-sysdiagnose" docs/` = 0 → PASS
       - Gap I-2 closure: `grep -rn "iOS L1 runbooks (Phase 30)" docs/admin-setup-ios/` = 0 → PASS
       - Gap L1TS-01 closure: `test -f .planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` = 0 AND `grep -c "L1TS-01.*SATISFIED" .planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` ≥ 1 → PASS
       - Gap L1TS-02 closure: `grep -c "L1TS-02.*SATISFIED" .planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` ≥ 1 → PASS
       - Record the manual re-audit output with the same shape as the audit tool would produce
  </behavior>
  <action>
    1. **Invoke the milestone re-audit:**
       - First attempt: check if gsd-tools has a programmatic audit command: `node "$HOME/.claude/get-shit-done/bin/gsd-tools.cjs" audit milestone v1.3` (or `gsd-tools milestone-audit v1.3` or similar — check help)
       - If gsd-tools does not expose milestone audit: the executor invokes `/gsd-audit-milestone v1.3` via the slash-command orchestrator (this may produce a new version of `.planning/v1.3-MILESTONE-AUDIT.md` or a sibling file `.planning/v1.3-MILESTONE-AUDIT-2.md` — the orchestrator handles the naming)
       - If neither is available (executor in restricted environment): perform the manual re-audit per the `<behavior>` block's fallback — verify each of the 4 audit gaps by grep/test and record the pass/fail in SUMMARY

    2. **Capture the re-audit output:**
       - If the audit tool produced a new AUDIT file: diff against the original `.planning/v1.3-MILESTONE-AUDIT.md` frontmatter and record the delta in SUMMARY (status: gaps_found → passed; scores.requirements: 16/18 → 18/18; scores.integration: 4/6 → 6/6; etc.)
       - If the audit was manual: record each grep / test command + result in SUMMARY with explicit PASS / FAIL per gap

    3. **Commit the accumulated Phase 33 Plan 33-04 artifacts** (tasks 1, 2, 3 outputs):
       - `.planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` (new file — task 1)
       - `.planning/REQUIREMENTS.md` (checkbox flips — task 2)
       - `.planning/ROADMAP.md` (progress updates — task 3)
       - Commit message: `docs(33): close v1.3 milestone — produce 30-VERIFICATION.md, flip 15 requirement checkboxes, update ROADMAP`
       - Use the gsd-tools commit helper: `node "$HOME/.claude/get-shit-done/bin/gsd-tools.cjs" commit "docs(33): close v1.3 milestone — produce 30-VERIFICATION.md, flip 15 requirement checkboxes, update ROADMAP" --files .planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md .planning/REQUIREMENTS.md .planning/ROADMAP.md`
       - Include the Co-Authored-By trailer per project convention

    4. **Post-commit verification:**
       - `git log -1 --pretty=%s` outputs exactly `docs(33): close v1.3 milestone — produce 30-VERIFICATION.md, flip 15 requirement checkboxes, update ROADMAP`
       - `git show --stat HEAD` shows exactly 3 files modified (the 3 listed above)
       - Re-run any audit command to confirm `status: passed` persists post-commit

    5. **Record the v1.3 closure state in `33-04-SUMMARY.md`:**
       - Re-audit method used (tool / slash command / manual)
       - Re-audit verdict (status / requirements score / integration score)
       - All 4 gap closures confirmed (I-1, I-2, L1TS-01, L1TS-02)
       - Commit hash of the task 4 commit
       - Whether v1.3 is ready for `/gsd-release-milestone v1.3` (user-driven final ship action — not auto-executed by this plan)
       - Next-step recommendation: "User may invoke `/gsd-release-milestone v1.3` to flip the ROADMAP.md milestone header to `✅ shipped 2026-04-18` and run retrospective automation"

    **Do NOT:**
    - Run `/gsd-release-milestone v1.3` — that's a user-driven ship action, not a plan auto-action (per project shipping discipline: the planner recommends, the user decides)
    - Commit any content files (`docs/*`) in this task — those were committed by 33-01 and 33-02
    - Create a new AUDIT file or overwrite `.planning/v1.3-MILESTONE-AUDIT.md` unless the audit tool generates one naturally; the original audit file is historical evidence of the gap-found state and should be preserved
    - Mark this plan complete if the re-audit returns anything other than `passed` — the residual gap(s) become blockers

    **Escape hatch for re-audit residual gaps:** If the re-audit surfaces an unexpected gap (e.g., a previously-unknown broken flow), document it as a Phase 34 backlog item in `33-04-SUMMARY.md` and flag for user decision. Do NOT silently mark Phase 33 complete under a `passed_with_notes` status — the goal is `passed` and deviations require user acknowledgement.
  </action>
  <verify>
    <automated>bash -c 'AUDIT_STATUS=$(grep "^status:" .planning/v1.3-MILESTONE-AUDIT.md | head -1 | awk "{print \$2}"); echo "audit_status=$AUDIT_STATUS"; GAP1=$(grep -r "#section-3-mac-cable-sysdiagnose" docs/ | wc -l); echo "i1_remaining=$GAP1"; GAP2=$(grep -r "iOS L1 runbooks (Phase 30)" docs/admin-setup-ios/ | wc -l); echo "i2_remaining=$GAP2"; VER=$(test -f .planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md && echo "exists" || echo "missing"); echo "verification=$VER"; test "$GAP1" = "0" -a "$GAP2" = "0" -a "$VER" = "exists"'</automated>
  </verify>
  <acceptance_criteria>
    - `.planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` exists and `grep -c "status: passed" .planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` ≥ 1
    - `grep -r "#section-3-mac-cable-sysdiagnose" docs/` returns NOTHING (I-1 closure confirmed globally)
    - `grep -r "iOS L1 runbooks (Phase 30)" docs/admin-setup-ios/` returns NOTHING (I-2 closure confirmed)
    - `.planning/REQUIREMENTS.md` has exactly 0 `- [ ]` entries in the v1.3 Requirements section (lines 10-47): `sed -n '10,47p' .planning/REQUIREMENTS.md | grep -c "^- \[ \]"` = 0
    - `.planning/ROADMAP.md` shows Phase 30 as `[x]` completed on 2026-04-18
    - The milestone re-audit returns `status: passed` (via tool or manual verification per the `<action>` block's step 2)
    - `git log -1 --pretty=%s` outputs exactly `docs(33): close v1.3 milestone — produce 30-VERIFICATION.md, flip 15 requirement checkboxes, update ROADMAP`
    - `git show --stat HEAD | grep -c "\.planning/"` shows exactly 3 files (the VERIFICATION, REQUIREMENTS, and ROADMAP updates)
    - `33-04-SUMMARY.md` records the re-audit verdict, commit hash, and the next-step recommendation for `/gsd-release-milestone v1.3`
  </acceptance_criteria>
  <done>
    Milestone re-audit confirms v1.3 `status: passed` with 18/18 requirements complete and zero MAJOR integration findings. All three tracking files (30-VERIFICATION.md, REQUIREMENTS.md, ROADMAP.md) are committed in one atomic commit. SUMMARY recommends the user's next action to invoke `/gsd-release-milestone v1.3` for the final ship declaration.
  </done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Audit verdict → downstream consumers | `v1.3-MILESTONE-AUDIT.md` status drives whether the user proceeds to `/gsd-release-milestone`; a false-positive `passed` verdict would ship a partially-complete milestone |
| VERIFICATION.md accuracy → traceability | `30-VERIFICATION.md` 3-source matrix is the audit evidence for L1TS-01/02 SATISFIED status; errors in the matrix propagate to downstream milestone audits |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-33-04-01 | Integrity | Re-audit tool unavailable → manual verification drift | mitigate | The manual fallback in Task 4 enumerates the 4 specific gaps with exact grep/test commands; each produces a binary PASS/FAIL; if any returns FAIL the plan does not mark complete |
| T-33-04-02 | Integrity | VERIFICATION.md 3-source matrix inaccurate claim of SATISFIED | mitigate | Task 1 acceptance criteria enforce that 30-VALIDATION.md must be READ and cited for every SC/requirement row; Task 1 also grep-enforces presence of `33-02-SUMMARY.md` and `33-03-SUMMARY.md` citations (Phase 33 Execution Note) so the traceability is auditable |
| T-33-04-03 | Integrity | REQUIREMENTS.md over-flipping (flipping a requirement that is not yet SATISFIED) | mitigate | Task 2 action explicitly lists which 15 requirements flip based on the v1.3-MILESTONE-AUDIT.md § Requirements Coverage table; each flip is justified by either a passed VERIFICATION.md OR audit-confirmed SATISFIED-with-caveat verdict where the caveat is now closed |
| T-33-04-04 | Availability | Orchestrator refuses to run `/gsd-audit-milestone` from within a plan execution context | accept | Task 4 explicitly provides a manual fallback using grep/test commands — acceptance criteria are satisfied by either the tool or the manual route |
</threat_model>

<verification>
1. `.planning/phases/30-ios-l1-triage-runbooks/30-VERIFICATION.md` exists with `status: passed` (task 1)
2. `sed -n '10,47p' .planning/REQUIREMENTS.md | grep -c "^- \[ \]"` = 0 (task 2 — all v1.3 checkboxes flipped)
3. `grep -c "\[x\] \*\*Phase 30" .planning/ROADMAP.md` ≥ 1 (task 3 — Phase 30 flipped)
4. `grep -r "iOS L1 runbooks (Phase 30)" docs/admin-setup-ios/` returns NOTHING (I-2 closure confirmed)
5. `grep -r "#section-3-mac-cable-sysdiagnose" docs/` returns NOTHING (I-1 closure confirmed)
6. Milestone re-audit returns `status: passed` with 18/18 requirements (task 4 — tool or manual)
7. `git log -1 --pretty=%s` is exactly `docs(33): close v1.3 milestone — produce 30-VERIFICATION.md, flip 15 requirement checkboxes, update ROADMAP`
8. `git show --stat HEAD` shows exactly 3 files modified (VERIFICATION, REQUIREMENTS, ROADMAP)
</verification>

<success_criteria>
- [x] `30-VERIFICATION.md` exists in the Phase 30 directory with `status: passed` and 3-source matrix evidence for L1TS-01 and L1TS-02
- [x] All 15 previously-`[ ]` v1.3 requirement checkboxes in REQUIREMENTS.md flipped to `[x]` (L1TS-01/02 direct verification; 13 others via I-1/I-2 closure)
- [x] REQUIREMENTS.md Traceability Table status column updated — no `Pending` rows remain for v1.3
- [x] ROADMAP.md Phase 30 flipped to `[x]` complete 2026-04-18; Plans 30-09 and 30-10 flipped with cross-phase execution annotations
- [x] ROADMAP.md Phase 33 flipped to `[x]` complete 2026-04-18 (if task 4 commits; else `3/4 In Progress`)
- [x] Milestone re-audit confirms `status: passed` with 18/18 requirements and zero MAJOR findings
- [x] Atomic commit `docs(33): close v1.3 milestone — produce 30-VERIFICATION.md, flip 15 requirement checkboxes, update ROADMAP`
- [x] `33-04-SUMMARY.md` records the re-audit verdict, commit hash, and recommends user invoke `/gsd-release-milestone v1.3` for final ship declaration
</success_criteria>

<output>
After completion, create `.planning/phases/33-v13-gap-closure/33-04-SUMMARY.md` with:
- Confirmation that `30-VERIFICATION.md` exists with the 3-source matrix + Phase 33 Execution Note sections
- Count of checkboxes flipped in REQUIREMENTS.md (expected: 15; exact counts for L1TS-01/02 + 13 caveated requirements)
- ROADMAP.md edits summary (Phase 30 checkbox + 30-09/30-10 plan checkboxes + Phase 30 progress row + Phase 33 section body + Phase 33 progress row)
- Milestone re-audit method (tool / slash command / manual) and verdict
- Re-audit delta: status `gaps_found` → `passed`; requirements `16/18` → `18/18`; integration `4/6` → `6/6`; gaps `[L1TS-01, L1TS-02, I-1, I-2]` → `[]`
- Commit hash of the Plan 33-04 atomic commit
- v1.3 milestone readiness: "READY — user may invoke `/gsd-release-milestone v1.3`" OR "BLOCKED — re-audit surfaced residual gap(s): {list}"
- Next-step recommendation for the user
</output>
</content>
</invoke>