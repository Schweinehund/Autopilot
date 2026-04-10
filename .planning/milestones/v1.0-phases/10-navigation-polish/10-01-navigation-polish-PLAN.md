---
phase: 10-navigation-polish
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - docs/l1-runbooks/01-device-not-registered.md
  - docs/l1-runbooks/03-profile-not-assigned.md
  - docs/l1-runbooks/05-oobe-failure.md
  - docs/l2-runbooks/01-log-collection.md
  - docs/common-issues.md
  - docs/l1-runbooks/02-esp-stuck-or-failed.md
  - docs/l1-runbooks/04-network-connectivity.md
  - docs/l2-runbooks/02-esp-deep-dive.md
  - docs/l2-runbooks/03-tpm-attestation.md
  - docs/l2-runbooks/04-hybrid-join.md
  - docs/l2-runbooks/05-policy-conflicts.md
autonomous: true
requirements:
  - L1RB-01
  - L1RB-03
  - L1RB-05
  - L2RB-01
  - NAV-02
  - NAV-04
gap_closure: true

must_haves:
  truths:
    - "L1 agent reading device-not-registered escalation sees specific L2 runbook targets, not just the L2 index"
    - "L1 agent reading profile-not-assigned escalation is routed to ESP deep-dive or policy conflicts based on symptom"
    - "L1 agent reading OOBE-failure escalation sees log-collection as mandatory first step"
    - "L2 engineer reading log-collection guide sees a cross-reference to the error-code index"
    - "Staff searching common-issues.md for 'hardware hash' finds a standalone entry"
    - "Staff inside any L1 runbook can reach quick-ref-l1.md without returning to index.md"
    - "Staff inside any L2 runbook can reach quick-ref-l2.md without returning to index.md"
  artifacts:
    - path: "docs/l1-runbooks/01-device-not-registered.md"
      provides: "Specific L2 escalation targets"
      contains: "01-log-collection.md"
    - path: "docs/l1-runbooks/03-profile-not-assigned.md"
      provides: "Symptom-based L2 routing"
      contains: "02-esp-deep-dive.md"
    - path: "docs/l1-runbooks/05-oobe-failure.md"
      provides: "Log-collection mandatory first step"
      contains: "01-log-collection.md"
    - path: "docs/l2-runbooks/01-log-collection.md"
      provides: "Error-code cross-reference"
      contains: "error-codes/00-index.md"
    - path: "docs/common-issues.md"
      provides: "Standalone hardware hash entry"
      contains: "Hardware Hash"
  key_links:
    - from: "docs/l1-runbooks/01-device-not-registered.md"
      to: "docs/l2-runbooks/01-log-collection.md"
      via: "escalation section link"
      pattern: "01-log-collection\\.md"
    - from: "docs/l1-runbooks/03-profile-not-assigned.md"
      to: "docs/l2-runbooks/02-esp-deep-dive.md"
      via: "symptom-based escalation link"
      pattern: "02-esp-deep-dive\\.md"
    - from: "docs/l2-runbooks/01-log-collection.md"
      to: "docs/error-codes/00-index.md"
      via: "error-code cross-reference"
      pattern: "error-codes/00-index\\.md"
---

<objective>
Close all 6 tech-debt items from the v1.0 re-audit: make L1 escalation links specific, add quick-ref footer links to all runbooks, add hardware hash standalone entry to common-issues.md, and add error-code cross-reference to log-collection guide.

Purpose: Remove navigation friction during active incidents so L1 and L2 staff reach the right content without extra hops through index pages.
Output: 11 modified documentation files with specific escalation targets, quick-ref footers, and cross-references.
</objective>

<execution_context>
@~/.claude/get-shit-done/workflows/execute-plan.md
@~/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/v1.0-MILESTONE-AUDIT.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: L1RB-01 — Make device-not-registered escalation specific</name>
  <read_first>docs/l1-runbooks/01-device-not-registered.md</read_first>
  <files>docs/l1-runbooks/01-device-not-registered.md</files>
  <action>
In `docs/l1-runbooks/01-device-not-registered.md`, find the escalation section's final reference line (line 58):

OLD:
```
See [L2 Runbooks](../l2-runbooks/00-index.md) for hardware hash re-import procedures.
```

NEW:
```
**L2 escalation path:** Start with the [Log Collection Guide](../l2-runbooks/01-log-collection.md) to gather a diagnostic package, then proceed to the [Hybrid Join Investigation](../l2-runbooks/04-hybrid-join.md) if the device is hybrid Azure AD joined. For all other cases, see the [L2 Runbook Index](../l2-runbooks/00-index.md) to select the appropriate investigation runbook.
```

This replaces the generic index link with specific L2 targets per the audit suggestion (L1RB-01). The generic index link is preserved as a fallback for cases that are not hybrid join.
  </action>
  <verify>
    <automated>grep -c "01-log-collection.md" docs/l1-runbooks/01-device-not-registered.md | grep -q "1" && grep -c "04-hybrid-join.md" docs/l1-runbooks/01-device-not-registered.md | grep -q "1" && echo PASS || echo FAIL</automated>
  </verify>
  <acceptance_criteria>
    - grep "01-log-collection.md" returns 1 match in the escalation section
    - grep "04-hybrid-join.md" returns 1 match in the escalation section
    - The old generic-only line "See [L2 Runbooks](../l2-runbooks/00-index.md) for hardware hash re-import procedures" is gone
  </acceptance_criteria>
  <done>device-not-registered.md escalation section links to specific L2 runbooks (log-collection + hybrid-join) instead of only the generic index</done>
</task>

<task type="auto">
  <name>Task 2: L1RB-03 — Make profile-not-assigned escalation symptom-based</name>
  <read_first>docs/l1-runbooks/03-profile-not-assigned.md</read_first>
  <files>docs/l1-runbooks/03-profile-not-assigned.md</files>
  <action>
In `docs/l1-runbooks/03-profile-not-assigned.md`, find the escalation section's final reference line (line 76):

OLD:
```
See [L2 Runbooks](../l2-runbooks/00-index.md) for assignment filter and Graph API investigation.
```

NEW:
```
**L2 escalation path — route by symptom:**
- If ESP hangs or times out after profile is assigned: [ESP Deep-Dive](../l2-runbooks/02-esp-deep-dive.md)
- If policies show as pending or conflicting in the portal: [Policy Conflict Analysis](../l2-runbooks/05-policy-conflicts.md)
- For all other profile assignment issues: [L2 Runbook Index](../l2-runbooks/00-index.md)
```

This replaces the generic index link with symptom-based routing per the audit suggestion (L1RB-03). The generic index link is preserved as a fallback.
  </action>
  <verify>
    <automated>grep -c "02-esp-deep-dive.md" docs/l1-runbooks/03-profile-not-assigned.md | grep -q "1" && grep -c "05-policy-conflicts.md" docs/l1-runbooks/03-profile-not-assigned.md | grep -q "1" && echo PASS || echo FAIL</automated>
  </verify>
  <acceptance_criteria>
    - grep "02-esp-deep-dive.md" returns 1 match
    - grep "05-policy-conflicts.md" returns 1 match
    - The old generic-only line is replaced with symptom-based routing
  </acceptance_criteria>
  <done>profile-not-assigned.md escalation section routes to ESP deep-dive or policy conflicts based on symptom, with generic index as fallback</done>
</task>

<task type="auto">
  <name>Task 3: L1RB-05 — Add log-collection as mandatory first step in OOBE escalation</name>
  <read_first>docs/l1-runbooks/05-oobe-failure.md</read_first>
  <files>docs/l1-runbooks/05-oobe-failure.md</files>
  <action>
In `docs/l1-runbooks/05-oobe-failure.md`, find the L2 forward-link line (line 69):

OLD:
```
> **L2 forward-link:** See [L2 Runbooks](../l2-runbooks/00-index.md) for OOBE log analysis and provisioning investigation.
```

NEW:
```
> **L2 forward-link:** L2 must run the [Log Collection Guide](../l2-runbooks/01-log-collection.md) first to gather a diagnostic package, then investigate via the [L2 Runbook Index](../l2-runbooks/00-index.md) based on collected evidence.
```

This makes log-collection an explicit mandatory first step per the audit suggestion (L1RB-05). The generic index remains as the second step for investigation routing.
  </action>
  <verify>
    <automated>grep -c "01-log-collection.md" docs/l1-runbooks/05-oobe-failure.md | grep -q "1" && grep "01-log-collection" docs/l1-runbooks/05-oobe-failure.md | grep -q "first" && echo PASS || echo FAIL</automated>
  </verify>
  <acceptance_criteria>
    - grep "01-log-collection.md" returns 1 match
    - The word "first" appears in the same line as "01-log-collection" to indicate it is a mandatory first step
    - The old generic-only L2 forward-link is replaced
  </acceptance_criteria>
  <done>OOBE-failure.md escalation section mentions log-collection as mandatory first step before L2 investigation</done>
</task>

<task type="auto">
  <name>Task 4: L2RB-01 — Add error-code cross-reference to log-collection guide</name>
  <read_first>docs/l2-runbooks/01-log-collection.md, docs/error-codes/00-index.md</read_first>
  <files>docs/l2-runbooks/01-log-collection.md</files>
  <action>
In `docs/l2-runbooks/01-log-collection.md`, find the "## Tool References" section (line 120). Insert a new bullet at the end of the bullet list (after the existing 3 bullets, before the end of file):

INSERT after line 124 (the last bullet `- [Network Endpoints]...`):
```
- [Error Code Index](../error-codes/00-index.md) — cross-reference collected error codes from event logs and ESP screens against the master lookup table for root cause and L1/L2 actions
```

This adds a reverse path from log-collection to the error-code tables per the audit finding (L2RB-01). It is placed in the Tool References section where related resources are already listed.
  </action>
  <verify>
    <automated>grep -c "error-codes/00-index.md" docs/l2-runbooks/01-log-collection.md | grep -q "1" && echo PASS || echo FAIL</automated>
  </verify>
  <acceptance_criteria>
    - grep "error-codes/00-index.md" returns exactly 1 match in the Tool References section
    - The link text includes "Error Code Index"
  </acceptance_criteria>
  <done>log-collection.md contains at least one link to an error-codes/ file in the Tool References section</done>
</task>

<task type="auto">
  <name>Task 5: NAV-04 — Add standalone Hardware Hash entry to common-issues.md</name>
  <read_first>docs/common-issues.md</read_first>
  <files>docs/common-issues.md</files>
  <action>
In `docs/common-issues.md`, insert a new section immediately AFTER the "## Device Registration Issues" section (after line 21, before the "## Enrollment Status Page (ESP) Failures" heading on line 23).

INSERT between "Device Registration Issues" and "Enrollment Status Page (ESP) Failures":
```

## Hardware Hash Issues

[Hardware hash](_glossary.md#hardware-hash) not available, import failed, or hash mismatch preventing device registration.

- **L1:** [Device Not Registered](l1-runbooks/01-device-not-registered.md) — step 7 covers checking hardware hash import history
- **L2:** [L2 Runbook Index](l2-runbooks/00-index.md) — for hash re-collection using [Get-AutopilotHardwareHash](reference/powershell-ref.md#get-autopilothardwarehash)

```

This creates a standalone keyword-searchable entry for "Hardware Hash" per the audit finding (NAV-04). The entry follows the existing section format (description line + L1/L2 routing bullets).
  </action>
  <verify>
    <automated>grep -c "## Hardware Hash Issues" docs/common-issues.md | grep -q "1" && grep -c "hardware-hash" docs/common-issues.md | grep -q "1" && echo PASS || echo FAIL</automated>
  </verify>
  <acceptance_criteria>
    - grep "## Hardware Hash Issues" returns exactly 1 match
    - The section contains links to the device-not-registered L1 runbook and L2 runbook index
    - The section appears as a standalone H2 entry separate from "Device Registration Issues"
  </acceptance_criteria>
  <done>common-issues.md has a standalone "Hardware Hash Issues" section entry searchable by keyword</done>
</task>

<task type="auto">
  <name>Task 6: NAV-02 — Add quick-ref footer links to all L1 and L2 runbooks</name>
  <read_first>docs/l1-runbooks/01-device-not-registered.md, docs/l1-runbooks/02-esp-stuck-or-failed.md, docs/l1-runbooks/03-profile-not-assigned.md, docs/l1-runbooks/04-network-connectivity.md, docs/l1-runbooks/05-oobe-failure.md, docs/l2-runbooks/02-esp-deep-dive.md, docs/l2-runbooks/03-tpm-attestation.md, docs/l2-runbooks/04-hybrid-join.md, docs/l2-runbooks/05-policy-conflicts.md</read_first>
  <files>docs/l1-runbooks/01-device-not-registered.md, docs/l1-runbooks/02-esp-stuck-or-failed.md, docs/l1-runbooks/03-profile-not-assigned.md, docs/l1-runbooks/04-network-connectivity.md, docs/l1-runbooks/05-oobe-failure.md, docs/l2-runbooks/02-esp-deep-dive.md, docs/l2-runbooks/03-tpm-attestation.md, docs/l2-runbooks/04-hybrid-join.md, docs/l2-runbooks/05-policy-conflicts.md</files>
  <action>
Add a quick-reference footer link to all 5 L1 runbooks and all 4 L2 investigation runbooks (not log-collection — it IS a reference, not a consumer of one).

**For each L1 runbook** (`01-device-not-registered.md`, `02-esp-stuck-or-failed.md`, `03-profile-not-assigned.md`, `04-network-connectivity.md`, `05-oobe-failure.md`):

Insert the following line immediately BEFORE the "## Version History" heading in each file:

```
**Quick Reference:** [L1 Quick-Reference Card](../quick-ref-l1.md)

---

```

If there is already a `---` separator immediately before "## Version History", place the quick-ref line before that separator (so the result is: quick-ref line, blank line, `---`, blank line, `## Version History`).

**For each L2 runbook** (`02-esp-deep-dive.md`, `03-tpm-attestation.md`, `04-hybrid-join.md`, `05-policy-conflicts.md`):

Insert the following line immediately BEFORE the "## Version History" heading in each file:

```
**Quick Reference:** [L2 Quick-Reference Card](../quick-ref-l2.md)

---

```

Same placement rule: before the final `---` separator that precedes Version History.

**Important:** Read each file's tail (last 15 lines) to find the exact insertion point. Each file has a slightly different structure before "## Version History". Preserve existing nav links (like "Back to Initial Triage") — insert the quick-ref line as an additional footer element, not a replacement.
  </action>
  <verify>
    <automated>L1_COUNT=$(grep -rl "quick-ref-l1.md" docs/l1-runbooks/01-device-not-registered.md docs/l1-runbooks/02-esp-stuck-or-failed.md docs/l1-runbooks/03-profile-not-assigned.md docs/l1-runbooks/04-network-connectivity.md docs/l1-runbooks/05-oobe-failure.md 2>/dev/null | wc -l) && L2_COUNT=$(grep -rl "quick-ref-l2.md" docs/l2-runbooks/02-esp-deep-dive.md docs/l2-runbooks/03-tpm-attestation.md docs/l2-runbooks/04-hybrid-join.md docs/l2-runbooks/05-policy-conflicts.md 2>/dev/null | wc -l) && echo "L1: $L1_COUNT/5, L2: $L2_COUNT/4" && [ "$L1_COUNT" -ge 3 ] && [ "$L2_COUNT" -ge 3 ] && echo PASS || echo FAIL</automated>
  </verify>
  <acceptance_criteria>
    - At least 3 of 5 L1 runbooks contain a link to "quick-ref-l1.md"
    - At least 3 of 4 L2 investigation runbooks contain a link to "quick-ref-l2.md"
    - Target: all 5 L1 and all 4 L2 runbooks have the footer (9 total)
    - Footer appears before "## Version History" in each file
    - Existing nav links (Back to Initial Triage, etc.) are preserved
  </acceptance_criteria>
  <done>At least 3/5 L1 runbooks link to quick-ref-l1.md and at least 3/4 L2 runbooks link to quick-ref-l2.md via footer links</done>
</task>

</tasks>

<verification>
Run after all 6 tasks complete to confirm all success criteria are met:

```bash
# SC1: device-not-registered has specific L2 links
grep "01-log-collection.md" docs/l1-runbooks/01-device-not-registered.md

# SC2: profile-not-assigned routes by symptom
grep "02-esp-deep-dive.md" docs/l1-runbooks/03-profile-not-assigned.md
grep "05-policy-conflicts.md" docs/l1-runbooks/03-profile-not-assigned.md

# SC3: oobe-failure mentions log-collection as first step
grep "01-log-collection.md" docs/l1-runbooks/05-oobe-failure.md

# SC4: log-collection has error-code cross-ref
grep "error-codes/" docs/l2-runbooks/01-log-collection.md

# SC5: common-issues has standalone Hardware Hash section
grep "## Hardware Hash" docs/common-issues.md

# SC6: quick-ref footer counts
grep -rl "quick-ref-l1.md" docs/l1-runbooks/ | wc -l  # expect >= 3
grep -rl "quick-ref-l2.md" docs/l2-runbooks/ | wc -l  # expect >= 3
```
</verification>

<success_criteria>
1. `l1-runbooks/01-device-not-registered.md` escalation links to `01-log-collection.md` and `04-hybrid-join.md`
2. `l1-runbooks/03-profile-not-assigned.md` escalation routes to `02-esp-deep-dive.md` or `05-policy-conflicts.md` by symptom
3. `l1-runbooks/05-oobe-failure.md` escalation mentions `01-log-collection.md` as mandatory first step
4. `l2-runbooks/01-log-collection.md` contains at least one link to `error-codes/00-index.md`
5. `common-issues.md` has a standalone "Hardware Hash" H2 section
6. At least 3/5 L1 runbooks link to `quick-ref-l1.md`; at least 3/4 L2 runbooks link to `quick-ref-l2.md`
</success_criteria>

<output>
After completion, create `.planning/phases/10-navigation-polish/10-01-SUMMARY.md`
</output>
