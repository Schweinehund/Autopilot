---
phase: 30-ios-l1-triage-runbooks
plan: 10
type: execute
wave: 4
depends_on: [30-01, 30-02, 30-03, 30-04, 30-05, 30-06, 30-07, 30-08, 30-09]
files_modified:
  - .planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md
autonomous: false
requirements: [L1TS-01, L1TS-02]
must_haves:
  truths:
    - "All 13 validator checks in 30-VALIDATION.md have a real PASS/SKIPPED status (no PENDING) after this plan"
    - "Any remaining FAIL in the 13-check matrix is explicitly triaged — either fixed (by re-invoking an earlier plan) or accepted with documented rationale"
    - "Manual verifications (5 items in 30-VALIDATION.md § Manual-Only Verifications) have been performed and their results recorded — including the spot-check on 10+ of the 71 retrofit rows per D-17 fidelity review"
    - "nyquist_compliant flag in 30-VALIDATION.md frontmatter is flipped to true once all required checks are PASS/SKIPPED"
    - "A human reviewer has signed off that runbook prose is L1-executable (SC #4 Manual-Only assertion) — checkpoint for human review"
  artifacts:
    - path: ".planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md"
      provides: "Updated validation strategy with all 13 check statuses recorded and manual-verification results documented"
  key_links:
    - from: "All Phase 30 artifacts"
      to: "scripts/validation/check-phase-30.mjs full-suite run"
      via: "Exit code 0 on full suite; validator as gate"
      pattern: "check-phase-30.mjs"
---

<objective>
Final Phase 30 validation + manual review gate. This plan runs the complete validation harness (full suite, not --quick), evaluates each of the 13 automated checks for PASS/FAIL/SKIPPED, performs the 5 manual verifications from 30-VALIDATION.md § Manual-Only Verifications, updates 30-VALIDATION.md with all results, and halts for a human checkpoint to sign off on L1-executability (SC #4 Manual-Only assertion).

This is Wave 4 — depends on ALL prior plans (30-01 through 30-09) completing. No new markdown content is created in Waves 1-3 territory; this plan only updates the VALIDATION.md status tracker and performs the human checkpoint.

Output: Updated VALIDATION.md (all statuses filled in); human sign-off captured.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md
@.planning/phases/30-ios-l1-triage-runbooks/30-CONTEXT.md
</context>

<tasks>

<task type="auto" tdd="false">
  <name>Task 1: Run full-suite validation and update 30-VALIDATION.md status matrix</name>
  <read_first>
    - .planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md (current state — all 13 checks are ⬜ pending; needs update to ✅/❌/⚠️/SKIPPED per actual execution output)
    - scripts/validation/check-phase-30.mjs (confirm full-suite capabilities from Plan 30-01)
    - All 9 dependency plan SUMMARY files at `.planning/phases/30-ios-l1-triage-runbooks/30-0{1..9}-SUMMARY.md` (each plan's summary reports its artifact-level outcomes)
  </read_first>
  <behavior>
    - `node scripts/validation/check-phase-30.mjs` (full suite, no --quick flag) is executed
    - Exit code is captured; if non-zero, the specific failing check IDs are listed in the output
    - 30-VALIDATION.md's Per-Task Verification Map table's Status column is updated for each of the 13 rows: PASS → ✅ green, FAIL → ❌ red, SKIPPED → N/A with `(tooling unavailable)` note
    - 30-VALIDATION.md's Plan column (currently "TBD") is filled in per the plan that delivered each artifact:
      - Check 1 (≤5 nodes) → 30-02
      - Check 2 (single-branch integration) → 30-08
      - Check 3 (6 Symptom H2) → 30-03/04/05/06/07
      - Check 4 (1 User Action Required H2) → 30-07
      - Check 5 (71 placeholders resolved) → 30-09
      - Check 6 (line 243 retrofit) → 30-09
      - Check 7 (6 runbook files exist) → 30-03/04/05/06/07
      - Check 8 (07-ios-triage.md exists) → 30-02
      - Check 9 (iOS section in 00-index.md) → 30-08
      - Check 10 (template enum) → 30-01
      - Check 11 (frontmatter per runbook) → 30-03/04/05/06/07
      - Check 12 (Platform gate banner per runbook) → 30-03/04/05/06/07
      - Check 13 (link-check + mermaid-cli) → 30-01 (infrastructure) + all content plans (target files)
    - 30-VALIDATION.md's Wave column is filled: Waves 1 / 2 / 3 per plan's Wave
    - 30-VALIDATION.md frontmatter `nyquist_compliant: false` → `nyquist_compliant: true` ONLY IF all required checks are PASS or SKIPPED (no FAIL)
  </behavior>
  <action>
    1. Run the full validator: `node scripts/validation/check-phase-30.mjs`. Capture output and exit code.
    2. Update `.planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md`:
       - Fill in the Plan and Wave columns in the Per-Task Verification Map per the mapping above
       - Fill in the Status column per the actual check outcome
       - If any FAIL: document which plan's artifact is responsible and add a "Remediation Required" subsection below the table with concrete steps (typically re-invoke the responsible plan via execute-plan)
    3. If all 13 checks are PASS or SKIPPED:
       - Update frontmatter `nyquist_compliant: false` → `nyquist_compliant: true`
       - Update `wave_0_complete: false` → `wave_0_complete: true` (the Wave 0 artifacts are the validator + template extension, which both completed in Plan 30-01)
       - Update `status: draft` → `status: phase-30-complete-pending-human-checkpoint`
    4. Record the actual runtime of the full-suite validator in the VALIDATION.md's Test Infrastructure table (update "Estimated runtime" with the observed value)

    Do NOT modify the validator script itself in this task; Plan 30-01 owns scripts/validation/check-phase-30.mjs. If a validator bug is discovered, file a concrete remediation note pointing back at plan 30-01 rather than editing the script here.
  </action>
  <verify>
    <automated>node scripts/validation/check-phase-30.mjs; echo "exit=$?"</automated>
  </verify>
  <done>
    - Full-suite validator runs to completion within 30 seconds
    - 30-VALIDATION.md Per-Task Verification Map has no ⬜ pending statuses — every row has a final ✅/❌/⚠️/SKIPPED
    - If any FAIL: remediation plan identified and documented
    - If all PASS/SKIPPED: `nyquist_compliant: true` is set in frontmatter
  </done>
</task>

<task type="auto" tdd="false">
  <name>Task 2: Perform 5 manual verifications and record results in 30-VALIDATION.md</name>
  <read_first>
    - .planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md § Manual-Only Verifications (5 items listed)
    - All 6 runbook files (`docs/l1-runbooks/{16,17,18,19,20,21}-ios-*.md`) and the triage tree (`docs/decision-trees/07-ios-triage.md`)
    - A random 10-row sample of the 71-row enumeration in Plan 30-09 — spot-check the executed replacements against the enumeration
  </read_first>
  <behavior>
    - Each of the 5 Manual-Only Verifications has a recorded outcome (PASS / NOTED ISSUE / NEEDS FOLLOW-UP)
    - At least 10 of the 71 retrofit rows have been spot-checked against the Plan 30-09 enumeration (per VALIDATION.md manual row 5)
    - Mermaid visual rendering has been inspected in GitHub web UI or a local markdown renderer (VALIDATION.md manual row 4)
    - Actor-boundary clarity check: a reviewer has read each runbook end-to-end asking "can every step be attributed to exactly one H2 actor heading?" (VALIDATION.md manual row 2)
    - Escalation packet completeness check per D-12 three-part structure (VALIDATION.md manual row 3)
    - Overall L1-executability check (VALIDATION.md manual row 1 — subjective readability)
  </behavior>
  <action>
    For each of the 5 Manual-Only Verifications in 30-VALIDATION.md:

    1. **L1-executability (SC #4 prose quality — row 1):** Read each of the 6 runbooks end-to-end asking "Could a new L1 hire follow this without asking questions?" Flag any step that assumes unstated context. Expected outcome: PASS (plan-time interfaces blocks were rigorous); flag any discovered issues for remediation by re-invoking the relevant plan.

    2. **Actor-boundary clarity (SC #4 sectioning — row 2):** For each runbook, confirm every step lives under exactly one H2 actor heading (or H3 sub-actor heading within a Cause for runbook 21). No step should contain instructions that cross actor boundaries (e.g., an L1 Triage Step that says "...and then have the admin do X"). Expected: PASS (D-12 packet structure enforces this).

    3. **Escalation packet completeness (D-12 row 3):** Each Admin Action Required section should have (a) "Ask the admin to..." imperative list, (b) "Verify..." confirmation steps, (c) "If admin confirms none..." handoff. Spot-check all 6 runbooks.

    4. **Mermaid visual rendering (row 4):** Render `docs/decision-trees/07-ios-triage.md` in GitHub's markdown preview OR a local viewer. Confirm: diamonds display as diamonds, rounded nodes display as rounded, green/red classDef colors apply, click directives render as links. If rendering tooling unavailable, mark as SKIPPED-reviewer-inspection-pending and defer to PR review.

    5. **71-placeholder per-row target accuracy (D-17 fidelity — row 5):** Pick 10 random rows from the Plan 30-09 enumeration. For each, open the target file and verify the replacement link text matches the enumeration exactly. Example: row 1 (01-apns-certificate.md line 101) should now read `| New certificate created instead of renewed | Apple Push Certificates Portal | ALL enrolled iOS, iPadOS, and macOS devices lose MDM communication... | [Runbook 16: APNs Expired](../l1-runbooks/16-ios-apns-expired.md) |`. Flag any deviations; re-invoke Plan 30-09 for remediation if found.

    Record outcomes in 30-VALIDATION.md § Manual-Only Verifications by updating the existing table with a new Status column OR appending a results section below. Format:
    ```markdown
    ### Manual Verification Results (2026-04-17)

    | Behavior | Outcome | Notes |
    |----------|---------|-------|
    | L1-executable prose | PASS | [notes] |
    | Actor-boundary clarity (SC #4) | PASS | [notes] |
    | Escalation packet completeness (D-12) | PASS | [notes] |
    | Mermaid visual rendering | PASS / SKIPPED | [notes] |
    | 71-placeholder fidelity (sample of 10) | PASS | [notes] |
    ```
  </action>
  <verify>
    <automated>node -e "const s=require('fs').readFileSync('.planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md','utf8'); const hasResults = /### Manual Verification Results/.test(s); process.exit(hasResults ? 0 : 1)"</automated>
  </verify>
  <done>
    - 30-VALIDATION.md contains a "Manual Verification Results" section with all 5 manual-check outcomes recorded
    - Any NOTED ISSUE or NEEDS FOLLOW-UP entries have a concrete remediation pointer (which plan to re-invoke, or out-of-scope for Phase 30)
  </done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Task 3: Human checkpoint — sign off on Phase 30 completeness</name>
  <what-built>
    Phase 30 artifacts summary (auto-generated by prior tasks):
    - 1 triage tree (07-ios-triage.md)
    - 6 L1 runbooks (16-21)
    - 1 template extension (l1-template.md platform enum)
    - 2 navigation integrations (00-initial-triage.md banner + 00-index.md iOS section)
    - 9 retrofitted admin-setup-ios files (71 placeholder resolutions)
    - 1 validation harness (check-phase-30.mjs)

    All 13 automated checks + 5 manual verifications documented in 30-VALIDATION.md.
  </what-built>
  <how-to-verify>
    1. Open `.planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md` — review the Per-Task Verification Map (all ⬜ → ✅/SKIPPED) and the Manual Verification Results section.
    2. Run `node scripts/validation/check-phase-30.mjs` — confirm exit code 0.
    3. Spot-open one runbook of your choice — scan for:
       - Frontmatter D-25 compliance
       - Platform gate banner D-26 compliance
       - D-10 sectioned actor-boundary format
       - D-11 back-link in Symptom section
       - D-12 three-part Admin Action Required packet
    4. Render `docs/decision-trees/07-ios-triage.md` in GitHub preview (if available) — confirm Mermaid renders with green/red colors, 3 decision diamonds, 9 terminals, click directives.
    5. Check `git log -1 --pretty=%B` on the latest retrofit commit — confirm D-20 message `docs(30): resolve iOS L1 runbook placeholders in admin-setup-ios`.
    6. Decide:
       - If all looks good → type "approved" to resume / close the phase
       - If specific remediation needed → describe the issues; this will be routed back to the responsible plan
       - If the phase needs a scope adjustment → flag for re-planning
  </how-to-verify>
  <resume-signal>Type "approved" OR describe specific issues + which plan should re-run</resume-signal>
  <files>docs/l1-runbooks/16-ios-apns-expired.md, docs/l1-runbooks/17-ios-ade-not-starting.md, docs/l1-runbooks/18-ios-enrollment-restriction-blocking.md, docs/l1-runbooks/19-ios-license-invalid.md, docs/l1-runbooks/20-ios-device-cap-reached.md, docs/l1-runbooks/21-ios-compliance-blocked.md, docs/decision-trees/07-ios-triage.md</files>
  <action>
    Pause execution here. Surface the how-to-verify checklist to the human reviewer. Await their response on the resume-signal. Do NOT proceed until the human types "approved" or provides a remediation directive.

    If "approved": proceed to the SUMMARY output step (no further edits).
    If remediation directive: route to the named plan (e.g., "re-run 30-07" meaning re-invoke Plan 30-07 execution to fix the flagged runbook-21 issue) and pause this plan until the re-run completes.
    If scope-adjustment flag: halt Phase 30 and route to user-directed re-planning — this is out of scope for this gate.
  </action>
  <verify>
    <automated>echo "Checkpoint: awaiting human sign-off (resume-signal: 'approved' or remediation directive)"; exit 0</automated>
  </verify>
  <done>Human response captured via resume-signal. Response text recorded in 30-10-SUMMARY.md. If "approved", phase is complete and ready for cross-AI review (if configured) or ROADMAP.md Phase 30 checkmark.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Human reviewer → phase artifacts | Reviewer reads already-committed content; no live-code execution; read-only gate |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-30-10-01 | Repudiation | Human-checkpoint sign-off | accept | Sign-off recorded in SUMMARY + via resume-signal; no cryptographic non-repudiation required for docs-only phase |
| T-30-10-02 | Validation-harness evasion | Manual checks skipped | mitigate | 30-VALIDATION.md Manual Verification Results table mandates all 5 manual checks recorded; task 2 fails if section absent |
</threat_model>

<verification>
1. `node scripts/validation/check-phase-30.mjs` — exit code 0
2. `grep -c "nyquist_compliant: true" .planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md` = 1 (if all checks pass)
3. `grep -c "### Manual Verification Results" .planning/phases/30-ios-l1-triage-runbooks/30-VALIDATION.md` = 1
4. Human checkpoint: user response captured ("approved" or issue list)
</verification>

<success_criteria>
- [x] All 13 automated checks have a final status (no PENDING)
- [x] Any FAIL is triaged with a concrete remediation pointer
- [x] All 5 manual verifications performed and recorded
- [x] 30-VALIDATION.md `nyquist_compliant: true` (if all pass)
- [x] 30-VALIDATION.md `wave_0_complete: true`
- [x] Human checkpoint reached with sign-off
</success_criteria>

<output>
After completion, create `.planning/phases/30-ios-l1-triage-runbooks/30-10-SUMMARY.md` with:
- Final status of all 13 automated checks (PASS counts, FAIL counts, SKIPPED counts)
- Final status of all 5 manual verifications
- Human sign-off confirmation
- Any remediation actions that were taken (plans re-invoked, artifacts patched)
- Phase-complete declaration if gate passes
</output>
