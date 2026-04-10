---
phase: 09-navigation-wiring
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - docs/l2-runbooks/03-tpm-attestation.md
  - docs/l2-runbooks/04-hybrid-join.md
  - docs/common-issues.md
  - docs/index.md
autonomous: true
requirements: [L2RB-03, L2RB-04, NAV-02, NAV-01]
gap_closure: true
must_haves:
  truths:
    - "Prev footer link in l2-runbooks/03-tpm-attestation.md resolves to an existing file (02-esp-deep-dive.md)"
    - "Next footer link in l2-runbooks/04-hybrid-join.md resolves to the correctly-named 05-policy-conflicts.md"
    - "common-issues.md contains an OOBE failure entry routing to l1-runbooks/05-oobe-failure.md"
    - "docs/architecture.md is discoverable from docs/index.md Shared References section"
  artifacts:
    - path: "docs/l2-runbooks/03-tpm-attestation.md"
      provides: "L2 TPM runbook with corrected Prev nav footer"
      contains: "02-esp-deep-dive.md"
    - path: "docs/l2-runbooks/04-hybrid-join.md"
      provides: "L2 hybrid-join runbook with corrected Next nav footer"
      contains: "05-policy-conflicts.md"
    - path: "docs/common-issues.md"
      provides: "Common issues index with OOBE routing entry"
      contains: "l1-runbooks/05-oobe-failure.md"
    - path: "docs/index.md"
      provides: "Master index with architecture.md link in Shared References"
      contains: "architecture.md"
  key_links:
    - from: "docs/l2-runbooks/03-tpm-attestation.md"
      to: "docs/l2-runbooks/02-esp-deep-dive.md"
      via: "Prev footer link at bottom of file"
      pattern: "Prev:.*02-esp-deep-dive\\.md"
    - from: "docs/l2-runbooks/04-hybrid-join.md"
      to: "docs/l2-runbooks/05-policy-conflicts.md"
      via: "Next footer link at bottom of file"
      pattern: "Next:.*05-policy-conflicts\\.md"
    - from: "docs/common-issues.md"
      to: "docs/l1-runbooks/05-oobe-failure.md"
      via: "OOBE failure section routing bullet"
      pattern: "l1-runbooks/05-oobe-failure\\.md"
    - from: "docs/index.md"
      to: "docs/architecture.md"
      via: "Shared References table row"
      pattern: "architecture\\.md"
---

<objective>
Close 4 navigation/wiring gaps identified by the v1.0 milestone audit. This is a docs-only gap-closure phase: two broken L2 runbook nav footers (one missing file reference, one typo), one missing common-issues.md entry (OOBE failure unreachable), and one orphaned architecture.md file (not linked from any Phase 7 entry point).

Purpose: Restore navigation integrity so every intended link target resolves and every Phase 5/6/7 artifact is reachable from its expected entry points.
Output: Four modified markdown files with corrected/added links; all acceptance criteria grep-verifiable.
</objective>

<execution_context>
@~/.claude/get-shit-done/workflows/execute-plan.md
@~/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@.planning/ROADMAP.md
@.planning/v1.0-MILESTONE-AUDIT.md

<!-- Source of truth for what needs fixing: integration gaps section in the audit frontmatter -->
<!-- All 4 target files (02-esp-deep-dive.md, 05-policy-conflicts.md, 05-oobe-failure.md, architecture.md) have been verified to exist on disk. -->

<existing_nav_markup>
<!-- Current state of the broken/missing links, read verbatim from files -->

docs/l2-runbooks/03-tpm-attestation.md (line 174):
```
Prev: [02-device-registration.md](02-device-registration.md) | Next: [04-hybrid-join.md](04-hybrid-join.md)
```

docs/l2-runbooks/04-hybrid-join.md (line 161):
```
Prev: [03-tpm-attestation.md](03-tpm-attestation.md) | Next: [05-policy-conflict.md](05-policy-conflict.md)
```

docs/common-issues.md — existing section pattern (example from ESP Failures section, lines 23-27):
```
## Enrollment Status Page (ESP) Failures

[ESP](_glossary.md#esp) stuck, timed out, or displaying "Something went wrong" error.

- **L1:** [ESP Stuck or Failed](l1-runbooks/02-esp-stuck-or-failed.md)
- **L2:** [ESP Deep-Dive](l2-runbooks/02-esp-deep-dive.md)
```

docs/common-issues.md currently has NO OOBE failure section. The L1 OOBE runbook at docs/l1-runbooks/05-oobe-failure.md exists but is unreachable from this index.

docs/index.md — current Shared References table (lines 38-45):
```
## Shared References

| Resource | Description |
|----------|-------------|
| [Autopilot Glossary](_glossary.md) | Terminology definitions ([OOBE](_glossary.md#oobe), [ESP](_glossary.md#esp), TPM, ZTD, APv1, APv2) |
| [Error Code Index](error-codes/00-index.md) | Master error code lookup with deployment-mode tagging |
| [Lifecycle Overview](lifecycle/00-overview.md) | End-to-end deployment sequence with flow diagrams |
| [APv1 vs APv2](apv1-vs-apv2.md) | Framework selection — which docs apply to which mode |
| [Common Issues Index](common-issues.md) | Symptom-based router to L1 and L2 runbooks |
```

docs/index.md does NOT currently link to architecture.md from anywhere.
</existing_nav_markup>

<threat_model>
N/A — documentation-only link corrections. No code, no user input, no network, no data storage, no attack surface.
</threat_model>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Fix Prev nav footer in l2-runbooks/03-tpm-attestation.md</name>
  <files>docs/l2-runbooks/03-tpm-attestation.md</files>
  <read_first>
    - docs/l2-runbooks/03-tpm-attestation.md (target line 174 — verify current nav markup before editing)
    - docs/l2-runbooks/02-esp-deep-dive.md (confirm this file exists as the replacement target)
  </read_first>
  <action>
    Addresses requirement L2RB-03 (audit gap: l2-runbooks/03-tpm-attestation.md:174 — broken Prev nav link).

    In docs/l2-runbooks/03-tpm-attestation.md, replace the nav footer line exactly:

    OLD (line 174):
    `Prev: [02-device-registration.md](02-device-registration.md) | Next: [04-hybrid-join.md](04-hybrid-join.md)`

    NEW:
    `Prev: [02-esp-deep-dive.md](02-esp-deep-dive.md) | Next: [04-hybrid-join.md](04-hybrid-join.md)`

    Rationale: 02-device-registration.md does not exist in l2-runbooks/. The correct predecessor file (per phase 6 numbering) is 02-esp-deep-dive.md. The Next link is correct and MUST NOT change. Do not modify any other line.
  </action>
  <verify>
    <automated>grep -c "02-esp-deep-dive.md" docs/l2-runbooks/03-tpm-attestation.md (expect >= 1) AND grep -c "02-device-registration" docs/l2-runbooks/03-tpm-attestation.md (expect == 0)</automated>
  </verify>
  <acceptance_criteria>
    - `grep -c "02-esp-deep-dive.md" docs/l2-runbooks/03-tpm-attestation.md` returns a count >= 1
    - `grep -c "02-device-registration" docs/l2-runbooks/03-tpm-attestation.md` returns 0 (broken reference removed)
    - `grep -c "04-hybrid-join.md" docs/l2-runbooks/03-tpm-attestation.md` still returns >= 1 (Next link preserved)
    - File still ends with `## Version History` section (structure preserved)
  </acceptance_criteria>
  <done>Prev footer link in 03-tpm-attestation.md points to 02-esp-deep-dive.md; no references to the non-existent 02-device-registration.md remain.</done>
</task>

<task type="auto">
  <name>Task 2: Fix Next nav footer typo in l2-runbooks/04-hybrid-join.md</name>
  <files>docs/l2-runbooks/04-hybrid-join.md</files>
  <read_first>
    - docs/l2-runbooks/04-hybrid-join.md (target line 161 — verify current nav markup before editing)
    - docs/l2-runbooks/05-policy-conflicts.md (confirm the correctly-named plural file exists as the target)
  </read_first>
  <action>
    Addresses requirement L2RB-04 (audit gap: l2-runbooks/04-hybrid-join.md:161 — Next nav link typo).

    In docs/l2-runbooks/04-hybrid-join.md, replace the nav footer line exactly:

    OLD (line 161):
    `Prev: [03-tpm-attestation.md](03-tpm-attestation.md) | Next: [05-policy-conflict.md](05-policy-conflict.md)`

    NEW:
    `Prev: [03-tpm-attestation.md](03-tpm-attestation.md) | Next: [05-policy-conflicts.md](05-policy-conflicts.md)`

    Rationale: The actual file is 05-policy-conflict**s**.md (plural). Both the link text AND the href contain the singular typo and must be corrected. The Prev link is correct and MUST NOT change. Do not modify any other line.
  </action>
  <verify>
    <automated>grep -c "05-policy-conflicts.md" docs/l2-runbooks/04-hybrid-join.md (expect >= 1) AND grep -cE "05-policy-conflict\.md" docs/l2-runbooks/04-hybrid-join.md (expect == 0)</automated>
  </verify>
  <acceptance_criteria>
    - `grep -c "05-policy-conflicts.md" docs/l2-runbooks/04-hybrid-join.md` returns >= 1
    - `grep -cE "05-policy-conflict\.md" docs/l2-runbooks/04-hybrid-join.md` returns 0 (the singular-typo link is gone — use anchored regex so the plural does not match)
    - `grep -c "03-tpm-attestation.md" docs/l2-runbooks/04-hybrid-join.md` still returns >= 1 (Prev link preserved)
    - File still ends with `## Version History` section (structure preserved)
  </acceptance_criteria>
  <done>Next footer link in 04-hybrid-join.md points to 05-policy-conflicts.md; no references to the typo 05-policy-conflict.md (singular) remain.</done>
</task>

<task type="auto">
  <name>Task 3: Add OOBE failure entry to common-issues.md</name>
  <files>docs/common-issues.md</files>
  <read_first>
    - docs/common-issues.md (read existing section pattern — each section is `## Title` + one-line description + `- **L1:** [link]` + `- **L2:** [link]`)
    - docs/l1-runbooks/05-oobe-failure.md (confirm the L1 OOBE runbook exists as target)
  </read_first>
  <action>
    Addresses requirement NAV-02 (audit gap: common-issues.md missing OOBE failure entry — 05-oobe-failure.md unreachable from this nav path).

    In docs/common-issues.md, insert a new section titled "OOBE Failures" immediately AFTER the "## Enrollment Status Page (ESP) Failures" section (which ends at line 27 with the `- **L2:** [ESP Deep-Dive](l2-runbooks/02-esp-deep-dive.md)` line) and BEFORE the "## Profile Assignment Issues" section.

    Insert exactly this markdown block (preceded and followed by a blank line to match existing spacing):

    ```
    ## OOBE Failures

    Device stuck on [OOBE](_glossary.md#oobe) screen, blank screen during setup, or setup loops back to the beginning.

    - **L1:** [OOBE Failure](l1-runbooks/05-oobe-failure.md)
    - **L2:** [L2 Runbook Index](l2-runbooks/00-index.md) — select runbook based on escalation checklist
    ```

    Rationale: The L1 runbook for OOBE failure exists but is unreachable from common-issues.md. Placement between ESP and Profile Assignment follows the natural failure-timeline order (OOBE comes before profile application). The L2 fallback to the index matches the pattern used by other "no dedicated L2 runbook" sections (Device Registration, Profile Assignment, Hybrid Join). Format matches existing sections exactly. Do not modify any other content in the file.
  </action>
  <verify>
    <automated>grep -c "l1-runbooks/05-oobe-failure.md" docs/common-issues.md (expect >= 1) AND grep -c "## OOBE Failures" docs/common-issues.md (expect == 1)</automated>
  </verify>
  <acceptance_criteria>
    - `grep -c "l1-runbooks/05-oobe-failure.md" docs/common-issues.md` returns >= 1
    - `grep -c "## OOBE Failures" docs/common-issues.md` returns exactly 1
    - `grep -c "## Enrollment Status Page" docs/common-issues.md` still returns 1 (existing section preserved)
    - `grep -c "## Profile Assignment Issues" docs/common-issues.md` still returns 1 (existing section preserved)
    - New section appears between ESP Failures and Profile Assignment Issues (verify line order with `grep -n "^## " docs/common-issues.md`)
    - File's Version History table is unmodified
  </acceptance_criteria>
  <done>common-issues.md has a new "OOBE Failures" section linking to l1-runbooks/05-oobe-failure.md, positioned between ESP Failures and Profile Assignment Issues, matching the format of adjacent sections.</done>
</task>

<task type="auto">
  <name>Task 4: Add architecture.md link to index.md Shared References</name>
  <files>docs/index.md</files>
  <read_first>
    - docs/index.md (read current Shared References table at lines 38-45 — verify table structure and existing rows before editing)
    - docs/architecture.md (confirm file exists as link target)
  </read_first>
  <action>
    Addresses requirement NAV-01 (audit gap: architecture.md orphaned from all Phase 7 navigation entry points).

    In docs/index.md, add a new row to the "## Shared References" table. The existing table (lines 40-45) has header `| Resource | Description |` and currently ends with the `[Common Issues Index](common-issues.md)` row.

    Append this new row as the LAST row of the Shared References table (directly after the Common Issues Index row, before the blank line that precedes `## Version History`):

    ```
    | [System Architecture](architecture.md) | Three-tier design overview (PowerShell modules, FastAPI backend, React frontend) |
    ```

    Rationale: Shared References is the designated "discoverable from navigation" section per Phase 7 design decision D-04. architecture.md describes the three-tier system (PowerShell + Python + TypeScript) and is audience-neutral, making Shared References the correct placement. Do not modify any other rows or sections.
  </action>
  <verify>
    <automated>grep -c "architecture.md" docs/index.md (expect >= 1) AND grep -c "System Architecture" docs/index.md (expect >= 1)</automated>
  </verify>
  <acceptance_criteria>
    - `grep -c "architecture.md" docs/index.md` returns >= 1
    - `grep -c "System Architecture" docs/index.md` returns >= 1
    - `grep -c "## Shared References" docs/index.md` returns exactly 1 (section preserved)
    - `grep -c "Common Issues Index" docs/index.md` still returns 1 (existing row preserved)
    - `grep -c "Autopilot Glossary" docs/index.md` still returns 1 (existing row preserved)
    - The new row appears AFTER the Common Issues Index row when `grep -n "| \[" docs/index.md` is inspected
    - File's Version History table is unmodified
  </acceptance_criteria>
  <done>docs/index.md Shared References table has a new row linking to architecture.md as "System Architecture"; architecture.md is now reachable from at least one Phase 7 navigation entry point.</done>
</task>

</tasks>

<verification>
All four fixes verifiable via grep in a single pass:

```bash
# Task 1 — TPM runbook Prev link fixed
grep -c "02-esp-deep-dive.md" docs/l2-runbooks/03-tpm-attestation.md        # expect >= 1
grep -c "02-device-registration" docs/l2-runbooks/03-tpm-attestation.md     # expect 0

# Task 2 — Hybrid join Next link typo fixed
grep -c "05-policy-conflicts.md" docs/l2-runbooks/04-hybrid-join.md         # expect >= 1
grep -cE "05-policy-conflict\.md" docs/l2-runbooks/04-hybrid-join.md        # expect 0

# Task 3 — OOBE entry added
grep -c "l1-runbooks/05-oobe-failure.md" docs/common-issues.md              # expect >= 1
grep -c "## OOBE Failures" docs/common-issues.md                            # expect 1

# Task 4 — architecture.md linked from index
grep -c "architecture.md" docs/index.md                                     # expect >= 1
grep -c "System Architecture" docs/index.md                                 # expect >= 1
```

All 4 target files (02-esp-deep-dive.md, 05-policy-conflicts.md, 05-oobe-failure.md, architecture.md) were pre-verified to exist during planning.
</verification>

<success_criteria>
1. docs/l2-runbooks/03-tpm-attestation.md Prev nav link points to 02-esp-deep-dive.md and no reference to 02-device-registration.md remains (L2RB-03 closed).
2. docs/l2-runbooks/04-hybrid-join.md Next nav link points to 05-policy-conflicts.md (plural) and no reference to 05-policy-conflict.md (singular) remains (L2RB-04 closed).
3. docs/common-issues.md has an "## OOBE Failures" section routing to l1-runbooks/05-oobe-failure.md, positioned between ESP Failures and Profile Assignment Issues (NAV-02 closed).
4. docs/index.md Shared References table has a new row linking to architecture.md (NAV-01 closed).
5. No other content in any of the four files is modified (Version History tables and all unrelated sections preserved).
</success_criteria>

<output>
After completion, create `.planning/phases/09-navigation-wiring/09-01-navigation-fixes-SUMMARY.md` documenting:
- Exact line changes in each of the 4 files (before/after snippets)
- Confirmation of all 8 grep assertions in the verification block
- Confirmation that the 4 audit integration gaps (L2RB-03, L2RB-04, NAV-02, NAV-01) are now closed
</output>
