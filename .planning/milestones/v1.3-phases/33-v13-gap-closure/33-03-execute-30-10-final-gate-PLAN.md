---
phase: 33-v13-gap-closure
plan: 03
type: execute
wave: 2
depends_on: [33-01, 33-02]
files_modified:
  - .planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md
autonomous: false
requirements: [L1TS-01, L1TS-02]
must_haves:
  truths:
    - "All 13 automated checks in `30-VALIDATION.md` § Per-Task Verification Map have a final non-pending status (✅ PASS / ❌ FAIL / SKIPPED — no ⬜ pending entries)"
    - "Any FAIL status is triaged: either remediated (by re-invoking the responsible plan) or explicitly accepted with documented rationale in the VALIDATION.md Remediation Required subsection"
    - "All 5 manual verifications from `30-VALIDATION.md` § Manual-Only Verifications have recorded outcomes (PASS / NOTED ISSUE / NEEDS FOLLOW-UP) in a new `### Manual Verification Results` subsection"
    - "A minimum of 10 of the 71 retrofit rows have been spot-checked against the 30-09 enumeration for per-row fidelity (Manual Verification row 5 — D-17 fidelity audit)"
    - "The VALIDATION.md frontmatter `nyquist_compliant:` flag is flipped to `true` if and only if every required check is PASS or SKIPPED"
    - "The VALIDATION.md frontmatter `wave_0_complete:` flag is flipped to `true` (Wave 0 artifacts — validator + template extension — completed in Plan 30-01)"
    - "The VALIDATION.md frontmatter `status:` is advanced from `draft` to `phase-30-complete-pending-human-checkpoint` (or `phase-30-complete` if the human has signed off)"
    - "A human reviewer has signed off via the blocking checkpoint task that the runbook prose is L1-executable (SC #4 literal) and the per-row retrofit is accurate"
  artifacts:
    - path: ".planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md"
      provides: "Updated validation strategy with all 13 check statuses recorded, manual verifications documented, nyquist_compliant flag flipped, human checkpoint captured"
  key_links:
    - from: "All Phase 30 + Phase 33 artifacts (triage tree, 6 runbooks, 9 retrofitted admin-setup-ios files, 00-initial-triage banner, 00-index iOS section, L1 template extension, I-1 anchor fix)"
      to: "scripts/validation/check-phase-30.mjs full-suite execution"
      via: "Exit code 0 gates phase completion"
      pattern: "check-phase-30\\.mjs"
---

<objective>
Execute the pre-authored Phase 30 Plan 30-10 — the final validation gate for Phase 30. This plan runs the complete Phase 30 validation harness (full suite, not `--quick`), evaluates each of the 13 automated checks, performs the 5 manual verifications from `30-VALIDATION.md`, updates the VALIDATION.md status tracker, and halts for a human checkpoint to sign off on L1-executability (SC #4 Manual-Only assertion) and per-row retrofit accuracy.

**DELEGATION, NOT DUPLICATION.** This plan does NOT restate the 13 automated checks or 5 manual verifications inline. The executor MUST read the pre-authored `.planning/phases/30-ios-l1-triage-runbooks/30-10-final-gate-and-visual-qa-PLAN.md` and apply its `<tasks>` block (task 1: full-suite run + VALIDATION.md update; task 2: 5 manual verifications; task 3: blocking human checkpoint) verbatim. That plan contains all check definitions, plan-to-check mappings, acceptance criteria, and the resume-signal contract.

This plan is Wave 2 and depends on Plan 33-01 (I-1 anchor fix) AND Plan 33-02 (71-placeholder retrofit). Both must complete before this plan runs, because:
1. The 30-10 gate Check 5 (zero `iOS L1 runbooks (Phase 30)` in admin-setup-ios) fails if 33-02 has not run
2. The 30-10 gate Check 6 (line 243 retrofit) fails if 33-02 has not run
3. The human-verification cognitive-load benefits from seeing the complete shipped state (I-1 + retrofit both applied)

`autonomous: false` — this plan contains a blocking human-verify checkpoint (task 3) and cannot complete without user sign-off or a remediation directive.

Output: Updated `30-VALIDATION.md` with all 13 automated-check statuses filled in + new Manual Verification Results subsection + frontmatter flags flipped + human sign-off recorded in the SUMMARY.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/phases/30-ios-l1-triage-runbooks/30-10-final-gate-and-visual-qa-PLAN.md
@.planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md
@.planning/phases/30-ios-l1-triage-runbooks/30-09-admin-setup-ios-retrofit-PLAN.md
@.planning/v1.3-MILESTONE-AUDIT.md

<interfaces>
<!-- This plan intentionally does NOT duplicate the 13-check or 5-manual-verification enumerations. -->
<!-- The authoritative sources are: -->
<!--   - .planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md § Per-Task Verification Map (lines 40-61) -->
<!--   - .planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md § Manual-Only Verifications (lines 74-82) -->
<!--   - .planning/phases/30-ios-l1-triage-runbooks/30-10-final-gate-and-visual-qa-PLAN.md § Task 1 behavior block (lines 57-75 — check-to-plan mapping) -->

**13 automated-check to responsible-plan map** (from 30-10 task 1 behavior block lines 57-75 — the executor MUST fill the `Plan` column in VALIDATION.md's Per-Task Verification Map per this mapping):

| Check | Plan-that-delivered | Wave |
|-------|---------------------|------|
| 1. Decision tree ≤ 5 nodes | 30-02 | 1 |
| 2. Single-branch integration (no iOS Mermaid in 00-initial-triage) | 30-08 | 3 |
| 3. 6 runbooks have `## Symptom` | 30-03/04/05/06/07 | 2 |
| 4. Only runbook 21 has `## User Action Required` | 30-07 | 2 |
| 5. All 71 placeholders resolved | **33-02** (executes pre-authored 30-09) | **33 Wave 1** |
| 6. D-18 prose retrofit done | **33-02** (executes pre-authored 30-09) | **33 Wave 1** |
| 7. 6 runbook files with D-21 naming | 30-03/04/05/06/07 | 2 |
| 8. 07-ios-triage.md exists | 30-02 | 1 |
| 9. 00-index.md has iOS section | 30-08 (executed via Phase 32 Plan 32-00 absorption) | 3 |
| 10. Template platform enum extended | 30-01 | 1 (Wave 0) |
| 11. Frontmatter per runbook (D-25) | 30-03/04/05/06/07 | 2 |
| 12. Platform gate banner per runbook (D-26) | 30-03/04/05/06/07 | 2 |
| 13. Internal links resolve + Mermaid syntax | 30-01 (infrastructure) + all content plans (target files) | 1-3 |

**IMPORTANT — plan-responsibility annotation for 33-02:** Checks 5 and 6 are fulfilled by Phase 33 Plan 33-02 (NOT Plan 30-09 directly), because 30-09 was pre-authored but never executed by Phase 30. The `Plan` column entry for these two checks should read `33-02 (executed the pre-authored 30-09)` for traceability. This preserves the audit trail: the per-row judgment is still Phase 30's (30-09 plan), but the execution is Phase 33's.

**5 manual verifications** (from 30-VALIDATION.md § Manual-Only Verifications lines 74-82):
1. L1-executable prose quality (subjective read-through of all 6 runbooks)
2. Actor-boundary clarity SC #4 (H2 actor boundaries)
3. Escalation packet completeness D-12 (three-part packet)
4. Mermaid visual rendering (GitHub or local markdown renderer for 07-ios-triage.md)
5. **71-placeholder per-row target accuracy** (D-17 fidelity — spot-check minimum 10 rows against the 30-09 enumeration — **this is the critical check that confirms 33-02 executed 30-09 faithfully**)

**Pre-authored 30-10 plan structure:** 3 tasks (task 1 autonomous full-suite + VALIDATION.md update; task 2 autonomous 5 manual verifications recorded; task 3 blocking human-verify checkpoint). Read the plan file for the exact behavior blocks, action steps, and resume-signal contract.

**Validator invocation (Phase 30 scope):** `node scripts/validation/check-phase-30.mjs` — executes all 13 checks, exits 0 on full pass, non-zero on any failure. Full suite runtime target ~15s per 30-VALIDATION.md Test Infrastructure table.

**Validator script existence:** Verified present at plan time via `test -f scripts/validation/check-phase-30.mjs` → EXISTS. Plan 30-01 created it; no Phase 33 task needs to create the validator.
</interfaces>
</context>

<tasks>

<task type="auto" tdd="false">
  <name>Task 1: Run full-suite Phase 30 validator and update 30-VALIDATION.md status matrix</name>
  <read_first>
    - `.planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md` (current state — all 13 checks in the Per-Task Verification Map are ⬜ pending; this task flips them to ✅/❌/SKIPPED; the Plan and Wave columns are currently TBD and need to be filled per the map in the `<interfaces>` block above)
    - `.planning/phases/30-ios-l1-triage-runbooks/30-10-final-gate-and-visual-qa-PLAN.md` § task 1 `<behavior>` and `<action>` blocks (lines 57-90 — this is the delegation target; use those behavior items + action steps verbatim with the one plan-column deviation: Checks 5 and 6 now map to `33-02 (executed the pre-authored 30-09)` not `30-09`)
    - `scripts/validation/check-phase-30.mjs` (confirm it exists and runs — it was created by Plan 30-01 per 30-VALIDATION.md Wave 0 Requirements; plan-time verification: `test -f scripts/validation/check-phase-30.mjs` EXISTS)
    - All 9 dependency-plan SUMMARY files at `.planning/phases/30-ios-l1-triage-runbooks/30-0{1..7}-SUMMARY.md` and `30-08-SUMMARY.md` (each plan's summary reports its artifact-level outcomes — used to confirm the Plan column values in VALIDATION.md)
    - `.planning/phases/33-v13-gap-closure/33-01-SUMMARY.md` and `33-02-SUMMARY.md` (produced by Wave 1 — confirm the retrofit and anchor-fix commits landed before this Wave 2 task runs)
  </read_first>
  <behavior>
    - `node scripts/validation/check-phase-30.mjs` (full suite, no `--quick` flag) is executed; exit code is captured; if non-zero, the specific failing check IDs are logged
    - `30-VALIDATION.md` Per-Task Verification Map Status column updated for each of the 13 rows: PASS → ✅; FAIL → ❌ with linked remediation; SKIPPED → SKIPPED with rationale (typically `tooling unavailable`)
    - `30-VALIDATION.md` Plan column (currently `TBD`) filled per the check-to-plan map in `<interfaces>` — with the explicit annotation that Checks 5 and 6 map to `33-02 (executed the pre-authored 30-09)`
    - `30-VALIDATION.md` Wave column filled (1, 2, 3 for Phase 30 plans; 33 W1 for Phase 33 plans that filled the retrofit)
    - `30-VALIDATION.md` frontmatter `nyquist_compliant: false` flipped to `true` ONLY if every required check is PASS or SKIPPED (no FAIL); otherwise left `false` and a Remediation Required subsection added
    - `30-VALIDATION.md` frontmatter `wave_0_complete: false` flipped to `true` (Wave 0 artifacts — validator script + template extension — were delivered by Plan 30-01)
    - `30-VALIDATION.md` frontmatter `status: draft` advanced to `status: phase-30-complete-pending-human-checkpoint` if all checks pass; or `status: phase-30-partial` if any FAIL that couldn't be auto-remediated
    - The observed runtime of the full-suite validator is recorded in the VALIDATION.md Test Infrastructure table (update `Estimated runtime` row)
  </behavior>
  <action>
    1. **Run the full validator and capture output:**
       ```
       node scripts/validation/check-phase-30.mjs
       echo "exit=$?"
       ```
       Capture both stdout and exit code. Each check prints a PASS/FAIL/SKIP line per 30-VALIDATION.md Test Infrastructure table.

    2. **Update `.planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md`:**
       - For each of the 13 rows in the Per-Task Verification Map table (lines 46-59 of VALIDATION.md), fill:
         - Plan column: per the check-to-plan map in the `<interfaces>` block above (Checks 5 and 6 → `33-02 (executed pre-authored 30-09)`)
         - Wave column: `1`, `2`, `3`, or `33 W1` as appropriate
         - Status column: ✅ PASS / ❌ FAIL / SKIPPED per the actual validator output
       - If any FAIL: add a `### Remediation Required` subsection BELOW the Per-Task Verification Map table. For each failing check, document:
         - The check ID and description
         - The plan responsible for the artifact (from the Plan column)
         - Concrete remediation steps (typically: re-invoke the responsible plan via `/gsd-execute-plan`)
         - Estimated impact (blocking / non-blocking / deferred)
       - If all 13 checks pass or SKIPPED:
         - Flip frontmatter `nyquist_compliant: false` → `nyquist_compliant: true`
         - Flip frontmatter `wave_0_complete: false` → `wave_0_complete: true`
         - Advance frontmatter `status: draft` → `status: phase-30-complete-pending-human-checkpoint`
       - Update the Test Infrastructure table `Estimated runtime` row with the observed value (e.g., `~12 seconds` if that's what the validator took)

    3. **Do NOT modify the validator script** (`scripts/validation/check-phase-30.mjs`) in this task. Plan 30-01 owns the script. If a validator bug is discovered (e.g., a check has an incorrect grep pattern), document it in the Remediation Required subsection as a pointer back to plan 30-01 — do NOT hot-patch the script from this task.

    4. **Do NOT modify any content files** (runbooks, admin-setup-ios files, triage tree, anchor link). This task updates ONLY `.planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md`. If a content FAIL is detected, the remediation directive routes back to the responsible plan.

    5. Do NOT run `--quick` — this task requires the full suite (link-check + Mermaid syntax + all 13 checks). If full-suite tooling (markdown-link-check, @mermaid-js/mermaid-cli) is unavailable on the machine, mark the affected check(s) SKIPPED with a rationale row in the Remediation Required subsection; this is consistent with 30-VALIDATION.md Wave 0 fallback (`if unavailable, fall back to manual visual review per project v1.0-v1.2 precedent`).
  </action>
  <verify>
    <automated>node scripts/validation/check-phase-30.mjs && grep -c "^nyquist_compliant: true$" .planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md</automated>
  </verify>
  <acceptance_criteria>
    - `node scripts/validation/check-phase-30.mjs` exits `0` (all 13 automated checks PASS or SKIPPED — no FAIL) — OR — exits non-zero with a Remediation Required subsection documenting every FAIL
    - `30-VALIDATION.md` contains ZERO remaining ⬜ pending statuses in the Per-Task Verification Map: `grep -c "⬜ pending" .planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md` = 0
    - `30-VALIDATION.md` Plan column for Checks 5 and 6 mentions `33-02` (traceability of Phase 33's execution of the pre-authored 30-09 enumeration): `grep -cE "33-02.*30-09|30-09.*33-02" .planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md` ≥ 2
    - If all checks pass: `grep -c "^nyquist_compliant: true$" .planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md` = 1
    - If all checks pass: `grep -c "^wave_0_complete: true$" .planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md` = 1
    - If all checks pass: `grep -cE "^status: phase-30-complete" .planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md` = 1
    - The Test Infrastructure `Estimated runtime` row has been updated from the initial `~15 seconds` placeholder to an observed value
    - `git diff --stat .planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md` shows modifications (not empty — this task must change the file)
    - No content files (docs/* / runbooks / admin-setup-ios) are modified in this task (single-file scope — `git diff --name-only HEAD` after this task should show only `.planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md`)
  </acceptance_criteria>
  <done>
    Full-suite validator runs to completion within ~30 seconds. `30-VALIDATION.md` Per-Task Verification Map has no ⬜ pending statuses. Any FAIL has a documented remediation pointer. If all checks pass, nyquist_compliant / wave_0_complete / status fields are flipped.
  </done>
</task>

<task type="auto" tdd="false">
  <name>Task 2: Perform 5 manual verifications and record results in 30-VALIDATION.md</name>
  <read_first>
    - `.planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md` § Manual-Only Verifications (5 items, lines 74-82)
    - `.planning/phases/30-ios-l1-triage-runbooks/30-10-final-gate-and-visual-qa-PLAN.md` § task 2 `<behavior>` and `<action>` blocks (lines 109-141 — delegation target)
    - All 6 runbook files: `docs/l1-runbooks/{16,17,18,19,20,21}-ios-*.md` (Manual Checks 1-3: L1-executable prose, actor-boundary clarity, escalation packet completeness)
    - `docs/decision-trees/07-ios-triage.md` (Manual Check 4: Mermaid visual rendering)
    - `.planning/phases/30-ios-l1-triage-runbooks/30-09-admin-setup-ios-retrofit-PLAN.md` § `<interfaces>` block lines 73-244 (**critical for Manual Check 5** — the 71-row enumeration that the spot-check compares against)
    - A random 10-row sample of the enumeration (pick rows spanning at least 5 of the 9 files for coverage diversity; the 30-09 plan §`<action>` recommends this spot-check pattern)
  </read_first>
  <behavior>
    - Each of the 5 Manual-Only Verifications has a recorded outcome (PASS / NOTED ISSUE / NEEDS FOLLOW-UP) in a new `### Manual Verification Results` subsection appended to `30-VALIDATION.md` below the existing Manual-Only Verifications table
    - At least 10 of the 71 retrofit rows have been spot-checked against the 30-09 enumeration (Manual Check 5 fidelity verification — **this is the critical audit of 33-02 execution faithfulness**)
    - The Mermaid visual rendering has been inspected in GitHub web UI OR a local markdown renderer (Manual Check 4); if rendering tooling is unavailable, the check is marked SKIPPED with a note
    - The actor-boundary clarity check (Manual Check 2) has been performed by reading each runbook end-to-end asking "can every step be attributed to exactly one H2 actor heading?"
    - The escalation packet completeness check (Manual Check 3) confirms the D-12 three-part structure in each runbook
    - The L1-executability check (Manual Check 1) is subjective but documented (reviewer confirms readability for a new L1 hire)
  </behavior>
  <action>
    **Delegate to the 30-10 task 2 action block (lines 118-141 of `30-10-final-gate-and-visual-qa-PLAN.md`):**

    1. **L1-executability (Manual Check 1):** Read each of the 6 runbooks end-to-end. Document outcome per runbook in the Manual Verification Results subsection. Flag any step that assumes unstated context.

    2. **Actor-boundary clarity (Manual Check 2):** For each runbook, confirm every step lives under exactly one H2 actor heading (L1 Triage Steps / Admin Action Required / User Action Required / Escalation Criteria — per D-10). No step should contain instructions that cross actor boundaries.

    3. **Escalation packet completeness (Manual Check 3):** Each `## Admin Action Required` section should have three parts per D-12: (a) imperative "Ask the admin to..." list, (b) "Verify..." confirmation steps, (c) "If admin confirms none..." handoff to Escalation Criteria. Spot-check all 6 runbooks.

    4. **Mermaid visual rendering (Manual Check 4):** Render `docs/decision-trees/07-ios-triage.md` in GitHub's markdown preview OR a local viewer (e.g., VS Code preview, markdown-preview-enhanced). Confirm: diamonds render as diamonds, rounded nodes as rounded, green/red classDef colors apply, `click` directives render as links. If no rendering tool is available, mark SKIPPED with rationale `rendering tooling unavailable on runtime environment — defer to PR review` and note that the Mermaid syntax itself has been validated by automated Check 13.

    5. **71-placeholder per-row target accuracy (Manual Check 5 — D-17 fidelity):**
       - Pick 10 random rows from the Plan 30-09 enumeration, spanning at least 5 of the 9 files for coverage diversity
       - For each row, open the target admin-setup-ios file and verify the replacement link text matches the 30-09 enumeration's Target / Link text column EXACTLY
       - Example spot-check: row 1 (01-apns-certificate.md, line ~101) should now read `| New certificate created instead of renewed | Apple Push Certificates Portal | ALL enrolled iOS, iPadOS, and macOS devices lose MDM communication... | [Runbook 16: APNs Expired](../l1-runbooks/16-ios-apns-expired.md) |`
       - Flag any deviation from the enumeration (contextual-note shortening is permitted per D-17 escape hatch; target runbook change is NOT permitted)
       - If any row deviates in target runbook: route remediation back to Plan 33-02 for correction (do NOT correct here; this task is read-only for content files)

    6. **Record outcomes in `30-VALIDATION.md`:** Append a new subsection at the end of the file (after the existing Manual-Only Verifications table) titled `### Manual Verification Results` with the following format:

       ```markdown
       ### Manual Verification Results (2026-04-18)

       | # | Behavior | Outcome | Notes |
       |---|----------|---------|-------|
       | 1 | L1-executable prose | PASS / NOTED ISSUE / NEEDS FOLLOW-UP | {per-runbook brief observations, blank if PASS} |
       | 2 | Actor-boundary clarity (SC #4) | PASS / ... | ... |
       | 3 | Escalation packet completeness (D-12) | PASS / ... | ... |
       | 4 | Mermaid visual rendering | PASS / SKIPPED | {rendering tool used or rationale for skip} |
       | 5 | 71-placeholder fidelity (sample of 10 rows from files {N, N, ...}) | PASS / NOTED ISSUE | {enumerate which rows were checked; flag any deviations; confirm 33-02 executed 30-09 faithfully} |

       **Sampled rows for Manual Check 5:** {list the 10 row numbers from the 30-09 enumeration: e.g., rows 1, 12, 20, 28, 35, 46, 50, 62, 66, 71}
       ```

    **Do NOT** modify any content files during this task (read-only spot-check; remediation routes back to 33-02 if deviations are found).
  </action>
  <verify>
    <automated>grep -c "^### Manual Verification Results" .planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md</automated>
  </verify>
  <acceptance_criteria>
    - `grep -c "^### Manual Verification Results" .planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md` = 1 (subsection exists)
    - The new subsection contains a table with at least 5 rows (one per manual verification)
    - Each of the 5 rows has an Outcome cell value from the set {PASS, NOTED ISSUE, NEEDS FOLLOW-UP, SKIPPED}
    - Row 5 (71-placeholder fidelity) mentions at least 10 specific row numbers from the 30-09 enumeration
    - Row 5 outcome is PASS — OR — if NOTED ISSUE, includes a remediation pointer back to Plan 33-02 for any deviations found
    - Row 4 (Mermaid rendering) Outcome is either PASS or SKIPPED (if SKIPPED, includes rationale `rendering tooling unavailable`)
    - `git diff --stat .planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md` shows modifications (file was updated by this task)
    - No content files modified (single-file scope — VALIDATION.md only)
  </acceptance_criteria>
  <done>
    `30-VALIDATION.md` contains a Manual Verification Results subsection with all 5 manual-check outcomes recorded. Any NOTED ISSUE or NEEDS FOLLOW-UP entries have a concrete remediation pointer (which plan to re-invoke, or out-of-scope for Phase 33). Spot-check of minimum 10 retrofit rows is documented with row numbers from the 30-09 enumeration.
  </done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Task 3: Human checkpoint — sign off on Phase 30 completeness (after Phase 33 Wave 1 integration)</name>
  <read_first>
    - `.planning/phases/30-ios-l1-triage-runbooks/30-10-final-gate-and-visual-qa-PLAN.md` § task 3 `<what-built>`, `<how-to-verify>`, `<resume-signal>`, `<action>` blocks (lines 152-193 — this is the delegation target; use that checkpoint structure)
    - `.planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md` (updated by tasks 1+2 of this plan — reviewer reads the Per-Task Verification Map final status and the Manual Verification Results subsection)
    - `.planning/phases/33-v13-gap-closure/33-01-SUMMARY.md` and `33-02-SUMMARY.md` (what Wave 1 delivered — anchor fix + retrofit)
    - `.planning/v1.3-MILESTONE-AUDIT.md` (reviewer should have the original audit context in mind — I-1 + I-2 closure + L1TS-01/02 satisfaction)
  </read_first>
  <what-built>
    Phase 30 artifacts (assembled by Phase 30 + Phase 33):
    - 1 triage tree (`docs/decision-trees/07-ios-triage.md` — delivered by Plan 30-02)
    - 6 L1 runbooks (`docs/l1-runbooks/{16,17,18,19,20,21}-ios-*.md` — delivered by Plans 30-03/04/05/06/07)
    - 1 template extension (`docs/_templates/l1-template.md` platform enum — delivered by Plan 30-01)
    - 2 navigation integrations (`docs/decision-trees/00-initial-triage.md` banner + `docs/l1-runbooks/00-index.md` iOS section — delivered by Phase 32 Plan 32-00 absorption of 30-08)
    - 9 retrofitted admin-setup-ios files (71 placeholder resolutions — **delivered by Phase 33 Plan 33-02 executing the pre-authored 30-09 enumeration**)
    - 1 I-1 anchor fix in `docs/ios-lifecycle/01-ade-lifecycle.md:364` (**delivered by Phase 33 Plan 33-01 — not strictly Phase 30 but this checkpoint is the natural gate to confirm it because the anchor fix resolves a LIFE-02 L2 handoff that uses the sysdiagnose Section 3 heading delivered by Phase 31 and renamed by Phase 32**)
    - 1 validation harness (`scripts/validation/check-phase-30.mjs` — delivered by Plan 30-01)

    All 13 automated checks + 5 manual verifications documented in `30-VALIDATION.md` (updated by tasks 1+2 of this plan).
  </what-built>
  <how-to-verify>
    1. Open `.planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md` — review:
       - Per-Task Verification Map: confirm all 13 rows have ✅ or SKIPPED status (no ⬜ pending, no ❌)
       - Manual Verification Results subsection: confirm all 5 manual checks have PASS (or SKIPPED with rationale)
       - Frontmatter: confirm `nyquist_compliant: true`, `wave_0_complete: true`, `status: phase-30-complete-pending-human-checkpoint`

    2. Run `node scripts/validation/check-phase-30.mjs` — confirm exit code 0 (no failing checks)

    3. Open one L1 runbook of your choice (suggested: `docs/l1-runbooks/21-ios-compliance-blocked.md` — the most structurally complex with multi-cause H3 subsections). Scan for:
       - Frontmatter D-25 compliance (`last_verified`, `review_by`, `audience: L1`, `platform: iOS`, `applies_to` set)
       - Platform gate banner D-26 compliance (blockquote banner on first line after frontmatter)
       - D-10 sectioned actor-boundary format (`## Symptom`, `## L1 Triage Steps`, `## Admin Action Required`, etc.)
       - D-11 back-link in Symptom section (link to triage-tree entry node)
       - D-12 three-part Admin Action Required packet structure

    4. Render `docs/decision-trees/07-ios-triage.md` in GitHub preview if available — confirm Mermaid renders with green/red colors, decision diamonds, rounded resolved/escalate nodes, `click` directives as hyperlinks

    5. **Spot-check one admin-setup-ios retrofit row** (confirms Phase 33's execution of 30-09 was faithful). Recommended: Open `docs/admin-setup-ios/06-compliance-policy.md` and verify the rightmost cell of the "APNs blocked at network edge" row contains the link `[Runbook 16: APNs Expired](../l1-runbooks/16-ios-apns-expired.md)` (enumeration row 43 — R16 as fleetwide-outage symptom). Then verify any other admin-setup-ios row of your choice contains a runbook link or the `../l2-runbooks/00-index.md` L2P31 placeholder — NOT the old `iOS L1 runbooks (Phase 30)` string.

    6. **Spot-check the I-1 anchor fix:** Open `docs/ios-lifecycle/01-ade-lifecycle.md:364`. Confirm the link anchor reads `#section-3-sysdiagnose-trigger-and-file-export`, NOT `#section-3-mac-cable-sysdiagnose`. Click the link in a rendered markdown viewer if available; it should land on Section 3 of `14-ios-log-collection.md` (not the top of that file).

    7. Check `git log -1 --pretty=%B` on the retrofit commit (not HEAD — use `git log --grep="resolve iOS L1 runbook placeholders" -1 --pretty=%B`) — confirm the D-20-locked subject `docs(30): resolve iOS L1 runbook placeholders in admin-setup-ios` (note the scope `(30)` stays 30 even though Phase 33 executed it).

    8. **Decide:**
       - If all looks good → type `approved` to resume the phase and proceed to Plan 33-04 (which produces 30-VERIFICATION.md)
       - If specific remediation needed → describe the issue(s); the response will be routed back to the responsible plan (`33-01` for anchor, `33-02` for retrofit, `30-0X` for original Phase 30 content)
       - If scope adjustment needed → flag for re-planning (e.g., if a previously-uncaught gap is discovered during review)
  </how-to-verify>
  <resume-signal>
    Type `approved` to sign off Phase 30 as complete and unblock Plan 33-04.
    OR describe specific issues + name the plan that should re-run (e.g., "re-run 33-02 — row 43 of 06-compliance-policy.md is missing the R16 link").
    OR type `scope-adjustment: {description}` if the phase needs a scope change (halts 33-04 until re-planning).
  </resume-signal>
  <files>
    docs/l1-runbooks/16-ios-apns-expired.md, docs/l1-runbooks/17-ios-ade-not-starting.md, docs/l1-runbooks/18-ios-enrollment-restriction-blocking.md, docs/l1-runbooks/19-ios-license-invalid.md, docs/l1-runbooks/20-ios-device-cap-reached.md, docs/l1-runbooks/21-ios-compliance-blocked.md, docs/decision-trees/07-ios-triage.md, docs/ios-lifecycle/01-ade-lifecycle.md, docs/admin-setup-ios/06-compliance-policy.md
  </files>
  <action>
    Pause execution at this task. Surface the `<how-to-verify>` checklist to the human reviewer. Await their response via the `<resume-signal>` contract. Do NOT proceed to Plan 33-04 until the human types `approved` or a remediation directive.

    **If `approved`:** Record the approval text in `33-03-SUMMARY.md` → phase Plan 33-03 is complete → Plan 33-04 can proceed.

    **If remediation directive** (e.g., "re-run 33-02"): Route the directive to the named plan. Pause Plan 33-03 (this plan) until the re-run completes. After re-run, re-execute Plan 33-03 task 1 (full-suite validator) to confirm remediation succeeded, then re-present the checkpoint.

    **If scope-adjustment flag:** Halt Plan 33-03. Route to user-directed re-planning via `/gsd-plan-phase 33 --gaps` or manual planner intervention. Do NOT proceed to Plan 33-04 until scope is reconciled.
  </action>
  <verify>
    <automated>bash -c 'echo "Checkpoint: awaiting human sign-off. Resume-signal: approved OR remediation directive OR scope-adjustment flag."; exit 0'</automated>
  </verify>
  <acceptance_criteria>
    - The executor has surfaced the `<how-to-verify>` checklist to the human reviewer
    - Human response has been captured (approved / remediation / scope-adjustment)
    - If `approved`: the approval text is recorded verbatim in `33-03-SUMMARY.md` and the plan transitions to `complete` status
    - If remediation: the directive is recorded and the named plan is re-invoked before this checkpoint returns
    - If scope-adjustment: the flag is recorded and Plan 33-04 is blocked pending re-planning
    - No content files are modified by this checkpoint task (this is a gate, not an edit task)
  </acceptance_criteria>
  <done>
    Human sign-off captured via resume-signal. Response recorded in `33-03-SUMMARY.md`. If approved, Plan 33-04 can proceed. If remediation, the named plan re-runs and this checkpoint re-engages. If scope-adjustment, 33-04 is blocked.
  </done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Human reviewer → phase artifacts | Reviewer reads already-committed content; read-only gate; no live-code execution during the checkpoint |
| Validator script → filesystem | `check-phase-30.mjs` performs read-only grep/link-check/Mermaid-validate on repo files; no write side-effects |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-33-03-01 | Repudiation | Human-checkpoint sign-off | accept | Sign-off recorded verbatim in `33-03-SUMMARY.md` via resume-signal; no cryptographic non-repudiation required for docs-only phase |
| T-33-03-02 | Validation-harness evasion | Manual checks skipped | mitigate | Task 2 acceptance criteria mandates all 5 manual checks recorded in VALIDATION.md Manual Verification Results subsection; task fails if subsection is missing or has fewer than 5 rows |
| T-33-03-03 | Validator-tooling unavailability | markdown-link-check or mermaid-cli missing | accept | 30-VALIDATION.md Wave 0 fallback explicitly permits SKIPPED status with rationale `tooling unavailable`; consistent with project v1.0-v1.2 precedent; Mermaid syntax is still validated by automated Check 13 independent of rendering |
| T-33-03-04 | Fidelity-drift | 33-02 execution deviated from 30-09 enumeration | mitigate | Task 2 Manual Check 5 spot-checks ≥10 rows; any deviation routes remediation back to 33-02 before the human checkpoint (task 3) is re-engaged |
</threat_model>

<verification>
1. `node scripts/validation/check-phase-30.mjs` exits 0 after task 1
2. `grep -c "^nyquist_compliant: true$" .planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md` = 1 (if all checks pass)
3. `grep -c "^wave_0_complete: true$" .planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md` = 1 (if all checks pass)
4. `grep -c "^### Manual Verification Results" .planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md` = 1 (task 2 subsection exists)
5. The new subsection contains exactly 5 manual-check rows with outcomes in {PASS, NOTED ISSUE, NEEDS FOLLOW-UP, SKIPPED}
6. Row 5 (placeholder fidelity) documents ≥10 row numbers from the 30-09 enumeration
7. Human checkpoint captured — user response recorded in `33-03-SUMMARY.md` as `approved` / remediation directive / scope-adjustment flag
8. `grep -c "⬜ pending" .planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md` = 0 (no pending statuses left)
</verification>

<success_criteria>
- [x] All 13 automated Phase 30 checks have a final status (no PENDING; PASS / SKIPPED / FAIL)
- [x] Any FAIL is triaged with a concrete remediation pointer (either auto-remediated before the checkpoint, or accepted with documented rationale)
- [x] All 5 manual verifications performed and recorded in the Manual Verification Results subsection
- [x] Placeholder fidelity (Manual Check 5) spot-checks ≥10 retrofit rows against the 30-09 enumeration — confirms 33-02 execution faithfulness
- [x] `30-VALIDATION.md` frontmatter: `nyquist_compliant: true` (if all pass), `wave_0_complete: true`, `status: phase-30-complete-pending-human-checkpoint`
- [x] Human checkpoint reached; sign-off captured via resume-signal; response recorded in `33-03-SUMMARY.md`
- [x] Plan 33-04 can proceed (if `approved`) — OR — remediation/scope-adjustment path recorded
</success_criteria>

<output>
After completion, create `.planning/phases/33-v13-gap-closure/33-03-SUMMARY.md` with:
- Final status of all 13 automated Phase 30 checks (PASS counts, FAIL counts, SKIPPED counts)
- Final status of all 5 manual verifications (with specific row numbers spot-checked in Manual Check 5)
- Human sign-off verbatim text captured from the checkpoint resume-signal
- Any remediation actions that were taken (plans re-invoked during this plan's execution, artifacts patched)
- Phase 30 completion declaration (if the checkpoint passed) or blocker list (if not)
- Phase 33 Plan 33-04 readiness flag (true if 30-VERIFICATION.md creation can proceed)
- Observed full-suite validator runtime (for Test Infrastructure table currency)
</output>
</content>
</invoke>