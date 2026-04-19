---
phase: 30-ios-l1-triage-runbooks
plan: 02
type: execute
wave: 1
depends_on: []
files_modified:
  - docs/decision-trees/07-ios-triage.md
autonomous: true
requirements: [L1TS-01]
must_haves:
  truths:
    - "An L1 agent can open 07-ios-triage.md and reach a named iOS L1 runbook (16-21) OR an explicit L2 escalation terminal within ≤ 5 decision nodes from the root (SC #1)"
    - "The triage tree has a single root question about device visibility in Intune (D-01 Axis 1), branching into (a) a not-visible question routing to the 5 tenant-config runbooks and (b) a visible question routing to runbook 21 or L2 (D-01 Axis 2)"
    - "Every terminal resolved/escalate node carries a click directive to the correct runbook file or an L2 placeholder — no orphan terminals"
    - "Node ID prefix is `IOS` throughout (IOS1, IOS2, IOS3, IOSR1-IOSR6, IOSE1-IOSE3) so Mermaid IDs do not collide with Windows TRD*/TRE* and macOS MAC* prefixes (D-02)"
  artifacts:
    - path: "docs/decision-trees/07-ios-triage.md"
      provides: "iOS triage decision tree with Mermaid graph, Routing Verification, How to Check, Escalation Data, Related Resources"
      min_lines: 90
      max_lines: 140
      contains: "IOS1"
      contains_all:
        - "```mermaid"
        - "## Decision Tree"
        - "## Routing Verification"
        - "## How to Check"
        - "## Escalation Data"
        - "## Related Resources"
        - "## Version History"
  key_links:
    - from: "docs/decision-trees/07-ios-triage.md IOSR1 click directive"
      to: "docs/l1-runbooks/16-ios-apns-expired.md (Wave 2 Plan 30-03)"
      via: "Mermaid click directive"
      pattern: "click IOSR1 \"\\.\\./l1-runbooks/16-ios-apns-expired\\.md\""
    - from: "docs/decision-trees/07-ios-triage.md IOSR6 click directive"
      to: "docs/l1-runbooks/21-ios-compliance-blocked.md (Wave 2 Plan 30-07)"
      via: "Mermaid click directive"
      pattern: "click IOSR6 \"\\.\\./l1-runbooks/21-ios-compliance-blocked\\.md\""
    - from: "Each iOS runbook (16-21) Symptom section"
      to: "docs/decision-trees/07-ios-triage.md Mermaid anchor"
      via: "back-link in Symptom section per D-11"
      pattern: "07-ios-triage\\.md"
---

<objective>
Create `docs/decision-trees/07-ios-triage.md` — the iOS triage decision tree. Structurally mirrors `docs/decision-trees/06-macos-triage.md` exactly per D-02 (the macOS file is the PRIMARY template). Implements the D-01 hybrid 2-axis root: Axis 1 visibility gate (Intune > Devices > iOS/iPadOS — yes/no); Axis 2 symptom fork (different question per branch). Uses `IOS` node-ID prefix (D-02) and satisfies SC #1 (≤ 5 decision nodes from root to any terminal).

Purpose: Establish the single routing surface that every iOS L1 runbook's Symptom section links back to (D-11 back-link requirement). Triage tree creation precedes runbook finalization because runbooks 16-21 back-link to Mermaid anchors in this file.

This plan is Wave 1 (parallel with Plan 30-01) because the tree has no dependencies on any runbook file — the Mermaid `click` directives reference runbook files by path-only, and Mermaid does not validate target existence at render time. Runbooks, in turn, link back by section anchor, and the tree's anchors are declared here.
Output: One new decision-tree file with Mermaid, tables, and cross-references.
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
@.planning/phases/30-ios-l1-triage-runbooks/30-RESEARCH.md
@.planning/phases/30-ios-l1-triage-runbooks/30-PATTERNS.md

<interfaces>
<!-- Exact structural template: docs/decision-trees/06-macos-triage.md (mirror) -->

Frontmatter template (copy shape from 06-macos-triage.md lines 1-7):
```yaml
---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: all
audience: L1
platform: iOS
---
```

Platform gate banner (adapt from 06-macos-triage.md line 9 wording — iOS version inserts reciprocal macOS cross-link):
```markdown
> **Platform gate:** This guide covers iOS/iPadOS troubleshooting via Intune. For Windows Autopilot, see [Initial Triage Decision Tree](00-initial-triage.md). For macOS ADE, see [macOS ADE Triage](06-macos-triage.md).
```

H1 + intro (mirror 06-macos-triage.md lines 11-17):
- Title: `# iOS/iPadOS Triage`
- Intro paragraph: describe the tree's scope (iOS/iPadOS Intune-managed device failures), route to L1 runbook or L2 within 5 decision steps from the root
- "How to Use This Tree" H2 + paragraph mirroring macOS rationale — include Specifics line 256 cite: no network-reachability gate at root (Setup Assistant/Company Portal completion implies network; redundant with path-specific runbook steps — D-03)

Section sequence (copy exactly from 06-macos-triage.md):
1. `# iOS/iPadOS Triage` (H1)
2. `## How to Use This Tree`
3. `## Legend` (3-row table — Diamond / Green rounded / Red rounded)
4. `## Decision Tree` (Mermaid block — full graph below)
5. `## Routing Verification` (table — proves node budget compliance)
6. `## How to Check` (table — per-question check instructions)
7. `## Escalation Data` (table — what to collect on L2-escalate nodes)
8. `## Related Resources`
9. `## Version History`

Mermaid graph (verbatim text to place inside the ```mermaid fence — derived from 30-RESEARCH.md Section 5):
```
graph TD
    IOS1{"Is the device visible<br/>in Intune admin center<br/>Devices &gt; iOS/iPadOS?"}

    IOS1 -->|No| IOS2{"What did the user<br/>see or attempt?"}
    IOS1 -->|Yes| IOS3{"What is the<br/>primary symptom?"}

    IOS2 -->|"Fleetwide outage<br/>(all Apple devices<br/>affected)"| IOSR1(["See: APNs Expired Runbook"])
    IOS2 -->|"ADE Setup Assistant<br/>stuck or no MDM profile"| IOSR2(["See: ADE Not Starting Runbook"])
    IOS2 -->|"'Invalid Profile' or<br/>'Can't be managed'"| IOSR3(["See: Enrollment Restriction<br/>Blocking Runbook"])
    IOS2 -->|"'User Name Not Recognized'<br/>or 'License not assigned'"| IOSR4(["See: License Invalid Runbook"])
    IOS2 -->|"'Device limit reached'<br/>or 'Too many devices'"| IOSR5(["See: Device Cap Reached Runbook"])
    IOS2 -->|"Other / unclear"| IOSE1(["Escalate L2:<br/>Collect serial, UPN,<br/>error screenshot"])

    IOS3 -->|"Non-compliant or<br/>access blocked"| IOSR6(["See: Compliance Blocked Runbook"])
    IOS3 -->|"Profile / config /<br/>app not working"| IOSE2(["Escalate L2:<br/>Not in L1 scope (Phase 31)"])
    IOS3 -->|"Other / unclear"| IOSE3(["Escalate L2:<br/>Collect serial, UPN,<br/>symptom description"])

    click IOSR1 "../l1-runbooks/16-ios-apns-expired.md"
    click IOSR2 "../l1-runbooks/17-ios-ade-not-starting.md"
    click IOSR3 "../l1-runbooks/18-ios-enrollment-restriction-blocking.md"
    click IOSR4 "../l1-runbooks/19-ios-license-invalid.md"
    click IOSR5 "../l1-runbooks/20-ios-device-cap-reached.md"
    click IOSR6 "../l1-runbooks/21-ios-compliance-blocked.md"

    classDef resolved fill:#28a745,color:#fff
    classDef escalateL2 fill:#dc3545,color:#fff
    class IOSR1,IOSR2,IOSR3,IOSR4,IOSR5,IOSR6 resolved
    class IOSE1,IOSE2,IOSE3 escalateL2
```

Legend table (mirror 06-macos-triage.md lines 21-25 verbatim):
| Symbol | Meaning |
|--------|---------|
| Diamond `{...}` | Decision -- answer the question |
| Green rounded `([...])` | Resolved -- follow the linked L1 runbook |
| Red rounded `([...])` | Escalate to L2 -- collect data listed in Escalation Data table and hand off |

Routing Verification table columns: `Path | Step 1 | Step 2 | Destination` — enumerate all 9 terminals (6 resolved + 3 escalate). Opening sentence: "All terminal nodes are within 2 decision steps of the root node (IOS1), well under the SC #1 5-node budget:"

How to Check table: 3 rows (IOS1, IOS2, IOS3 questions). Use RESEARCH.md Section 3 P-01..P-10 navigation paths verbatim. For IOS1: cite `Devices > All devices` + filter iOS/iPadOS, OR `Devices > iOS/iPadOS`; serial check at `Settings > General > About > Serial Number`. For IOS2: list the literal error strings L1 should match to branches (`User Name Not Recognized`, `Device limit reached`, `Invalid Profile`, `Couldn't be downloaded`, `Company Portal Temporarily Unavailable` → route to runbook 20 per Microsoft Learn dual-meaning note). For IOS3: distinguish compliance-blocked from profile/app/config-not-working (the latter routes to L2 Phase 31 placeholder).

Escalation Data table: 2 rows as specified in RESEARCH.md Section 5 "Escalation Data" block:
| When You Escalate | Collect This |
|-------------------|-------------|
| Other / unclear route (IOSE1 / IOSE3) | Device serial number (Settings > General > About), iOS version, User UPN, screenshot of current device screen, description of expected vs actual behavior, approximate time when issue first appeared, any steps already attempted |
| Profile/config/app route (IOSE2 — Phase 31 L2 scope) | All of above + the specific profile/app name expected, Intune device-status screenshot showing profile/app delivery state, last check-in time |

Related Resources block (mirror 06-macos-triage.md lines 85-91, adapted):
```markdown
- [iOS L1 Runbooks Index](../l1-runbooks/00-index.md) -- All 6 iOS L1 runbooks (16-21)
- [iOS L2 Runbooks (Phase 31)](../l2-runbooks/00-index.md) -- L2 investigation (Phase 31 placeholder; resolved when Phase 31 ships)
- [iOS/iPadOS Admin Setup Overview](../admin-setup-ios/00-overview.md) -- Admin config reference
- [iOS/iPadOS Enrollment Overview](../ios-lifecycle/00-enrollment-overview.md) -- Enrollment path concepts
- [Initial Triage Decision Tree](00-initial-triage.md) -- Windows Autopilot (classic) triage
- [macOS ADE Triage](06-macos-triage.md) -- Sibling Apple platform triage
- [Apple Provisioning Glossary](../_glossary-macos.md) -- Shared Apple terminology (iOS glossary additions in Phase 32 NAV-01)
```

Version History: single row, `| 2026-04-17 | Initial version | -- |`
</interfaces>
</context>

<tasks>

<task type="auto" tdd="false">
  <name>Task 1: Create 07-ios-triage.md with full structure (Mermaid + all tables + Related Resources + Version History)</name>
  <read_first>
    - docs/decision-trees/06-macos-triage.md (full file — PRIMARY structural template; D-02 says "mirror exactly"; executor copies the section skeleton, then replaces MAC nodes with IOS nodes, macOS text with iOS text, and macOS runbook filenames with iOS runbook filenames)
    - docs/decision-trees/00-initial-triage.md (for back-link target — Related Resources entry)
    - .planning/phases/30-ios-l1-triage-runbooks/30-RESEARCH.md § 5 "Mermaid Structure Recommendation for 07-ios-triage.md" (lines ~536-615 — full Mermaid text + Routing Verification + How to Check + Escalation Data specified verbatim)
    - .planning/phases/30-ios-l1-triage-runbooks/30-PATTERNS.md § "docs/decision-trees/07-ios-triage.md (decision tree, branching router)" (lines 39-205 — section-by-section mapping from macOS analog)
    - .planning/phases/30-ios-l1-triage-runbooks/30-CONTEXT.md § D-01, D-02, D-03 (triage tree root structure decisions)
  </read_first>
  <behavior>
    - File created at `docs/decision-trees/07-ios-triage.md`
    - Frontmatter: `last_verified: 2026-04-17`, `review_by: 2026-07-16`, `applies_to: all`, `audience: L1`, `platform: iOS` (all 5 fields present)
    - Platform gate banner is the first non-frontmatter body line (appears immediately after closing `---`), matching: `> **Platform gate:** This guide covers iOS/iPadOS troubleshooting via Intune. For Windows Autopilot, see [Initial Triage Decision Tree](00-initial-triage.md). For macOS ADE, see [macOS ADE Triage](06-macos-triage.md).`
    - Exactly 3 decision-diamond nodes (IOS1, IOS2, IOS3) — matches Check 1 (≤ 5)
    - Exactly 6 click directives (IOSR1 → 16, IOSR2 → 17, IOSR3 → 18, IOSR4 → 19, IOSR5 → 20, IOSR6 → 21) with relative paths `../l1-runbooks/NN-ios-*.md`
    - All 9 terminal nodes (IOSR1-IOSR6 + IOSE1-IOSE3) are classed via classDef (resolved or escalateL2)
    - Mermaid `classDef` lines use the exact colors from macOS precedent: `fill:#28a745,color:#fff` (resolved), `fill:#dc3545,color:#fff` (escalateL2)
    - Routing Verification table lists all 9 terminals with Step 1 / Step 2 / Destination columns
    - How to Check table has 3 rows (one per decision diamond)
    - Escalation Data table has 2 rows (Other/unclear + Profile/config/app)
    - Related Resources block contains 7 bulleted links (see interfaces)
    - Version History has 1 row with date 2026-04-17
    - "No network reachability gate at root" note appears in How to Use This Tree section (D-03)
    - File ends with a `## Version History` table — no trailing back-link to a parent tree (07-ios-triage.md IS a top-level scenario tree, mirroring 06-macos-triage.md structure which has no back-link footer)
  </behavior>
  <action>
    Create `docs/decision-trees/07-ios-triage.md` by structurally cloning `docs/decision-trees/06-macos-triage.md` and substituting iOS content.

    **Step 1 — Frontmatter (lines 1-7):** Copy the 7-line frontmatter block from 06-macos-triage.md. Change these values:
    - `last_verified: 2026-04-14` → `last_verified: 2026-04-17`
    - `review_by: 2026-07-13` → `review_by: 2026-07-16`
    - `applies_to: ADE` → `applies_to: all`
    - `platform: macOS` → `platform: iOS`
    Keep `audience: L1` as-is.

    **Step 2 — Platform gate banner (line 9):** The macOS banner reads `> **Platform gate:** This guide covers macOS ADE troubleshooting via Intune. For Windows Autopilot, see [Initial Triage Decision Tree](00-initial-triage.md).`

    Replace with iOS wording (verbatim — this is the D-02-implied banner extension including the reciprocal macOS link that macOS itself does not yet include):
    ```
    > **Platform gate:** This guide covers iOS/iPadOS troubleshooting via Intune. For Windows Autopilot, see [Initial Triage Decision Tree](00-initial-triage.md). For macOS ADE, see [macOS ADE Triage](06-macos-triage.md).
    ```

    **Step 3 — H1 + Intro + How to Use This Tree section (lines 11-17 in macOS):**
    - H1: `# iOS/iPadOS Triage`
    - Intro: `Start here when a user reports an issue with an iOS or iPadOS device enrolled (or expected to enroll) in Intune. Follow each decision point using observations from the device screen and Intune admin center. The tree routes to an L1 runbook or L2 escalation within 2 decision steps from the root (well under the [SC #1](../../.planning/ROADMAP.md) 5-node budget).`
    - H2 "How to Use This Tree" paragraph: include the D-03 no-network-gate-at-root rationale. Adapt from macOS line 17 wording. Example:
      `No network reachability gate is included at the root because Setup Assistant completion implies basic Apple connectivity for ADE, and Company Portal launching implies network for BYOD/User Enrollment paths. If the device cannot reach any network at all, use the [APNs Expired runbook](../l1-runbooks/16-ios-apns-expired.md) or escalate to Infrastructure directly.`
    - Remove or omit the ROADMAP.md reference link if it would render as a broken link — prefer plain text `(SC #1 5-node budget)`.

    **Step 4 — Legend table:** Copy 06-macos-triage.md lines 19-25 verbatim (no iOS-specific changes).

    **Step 5 — Decision Tree Mermaid block:** Use the full Mermaid text from the `<interfaces>` block above (copied verbatim from 30-RESEARCH.md Section 5). Wrap in ```mermaid ... ``` fence.

    **Step 6 — Routing Verification table:** Use 30-RESEARCH.md Section 5 "Routing Verification" block verbatim. Opening sentence: `All terminal nodes are within 2 decision steps of the root node (IOS1), well under the SC #1 5-node budget:`

    **Step 7 — How to Check table:** Use 30-RESEARCH.md Section 5 "How to Check" block verbatim. Key instructions:
    - IOS1 row: cite both P-04 paths (primary `Devices > All devices` filter iOS/iPadOS, and `Devices > iOS/iPadOS`). Serial via `Settings > General > About > Serial Number`.
    - IOS2 row: list literal error strings L1 should match — verbatim, quoted: `"User Name Not Recognized"`, `"Device limit reached"` / `"Too many devices"`, `"Invalid Profile"` / `"The configuration for your iPhone/iPad couldn't be downloaded"`, `"Company Portal Temporarily Unavailable"` (note Microsoft Learn dual-meaning — route to runbook 20 first per RESEARCH.md § 4 Runbook 20). If the user cannot recall the error: route to Other/unclear (IOSE1).
    - IOS3 row: distinguish compliance-blocked (runbook 21) from profile/app/config-not-working (Phase 31 L2 scope — IOSE2).

    **Step 8 — Escalation Data table:** 2 rows exactly as in RESEARCH.md Section 5:
    - Row 1: `Other / unclear route (IOSE1 / IOSE3)` — collect serial, iOS version, UPN, screenshot, description of expected vs actual, time of first occurrence, steps attempted
    - Row 2: `Profile/config/app route (IOSE2 — Phase 31 L2 scope)` — all of above + specific profile/app name, Intune device-status screenshot showing delivery state, last check-in time

    **Step 9 — Related Resources:** 7 bulleted links as specified in `<interfaces>` above. NOTE: the iOS L2 runbooks link uses a `(Phase 31)` placeholder suffix per D-31 deferred establishment — this IS a new placeholder category intentionally established in Phase 30 (CONTEXT.md Deferred section).

    **Step 10 — Version History:** Single-row table:
    ```
    | Date | Change | Author |
    |------|--------|--------|
    | 2026-04-17 | Initial version | -- |
    ```

    **CRITICAL - Do not add:**
    - A `[Back to ...]` footer link (macOS 06-triage has none — 07-ios-triage is a top-level scenario tree, not a child of another tree)
    - Any iOS-specific glossary cross-link (glossary additions are deferred to Phase 32 NAV-01; using `[Apple Provisioning Glossary](../_glossary-macos.md)` with a parenthetical note is acceptable and matches macOS precedent)
    - Any direct citation of Microsoft Learn URLs in the body (citations live in RESEARCH.md and flow into runbooks via error strings; triage tree stays portal-path-only)
    - Any `Phase 30` self-reference in the file body (this would create a verb-tense artifact in the shipped doc)

    **File length target:** 90-140 lines total including frontmatter. The macOS reference is 97 lines; iOS adds only the reciprocal macOS banner line and perhaps 1-2 extra Related Resources entries, so expected ~100 lines.
  </action>
  <verify>
    <automated>node scripts/validation/check-phase-30.mjs --quick</automated>
  </verify>
  <done>
    - `docs/decision-trees/07-ios-triage.md` exists
    - Check 1 (decision tree ≤ 5 IOS diamond nodes) passes: exactly 3 IOS* diamond nodes (IOS1, IOS2, IOS3)
    - Check 8 (file exists) passes
    - File contains 1 Mermaid block with 6 click directives pointing at `../l1-runbooks/{16,17,18,19,20,21}-ios-*.md`
    - Frontmatter has: `last_verified: 2026-04-17`, `review_by: 2026-07-16`, `applies_to: all`, `audience: L1`, `platform: iOS`
    - Routing Verification, How to Check, Escalation Data, Related Resources, Version History all present as H2 sections
    - File length 90-140 lines
    - `node scripts/validation/check-phase-30.mjs --quick` shows Check 1 and Check 8 flipping from FAIL to PASS after this task lands; other checks still FAIL pending Waves 2-3
  </done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Public documentation | Triage tree content will be committed and visible to reviewers; no runtime execution |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-30-02-01 | Information Disclosure | 07-ios-triage.md example content | mitigate | Use placeholder-style references only; no real tenant IDs, no real device serials, no real UPNs in How-to-Check or Escalation Data rows |
| T-30-02-02 | Integrity | Mermaid click directives | mitigate | Click paths are relative `../l1-runbooks/NN-ios-*.md` verified against D-21 filename convention; any typo breaks runbook navigation but is grep-verifiable via Check 1 and post-wave-2 link-check |
</threat_model>

<verification>
1. `node scripts/validation/check-phase-30.mjs --quick` — Check 1 must report PASS with count = 3, Check 8 must report PASS (file exists)
2. Open the file in an editor; confirm Mermaid block renders mentally (every `-->` has a source and target node, every `click` directive has a matching node ID, every classDef line is well-formed)
3. Grep file for `macOS` — should appear only in 2 places: the Related Resources link to macOS triage, and the platform gate banner's reciprocal cross-link. Should NOT appear in any How-to-Check row, Mermaid block, Routing Verification table, or Escalation Data — those are iOS-native content
4. Grep file for `MAC1|MAC2|MAC3` — should return zero matches (no leftover macOS node IDs from the cloning process)
5. Grep file for `\bAPv1|\bAPv2|\bTRD` — should return zero matches (no leftover Windows node IDs)
</verification>

<success_criteria>
- [x] File `docs/decision-trees/07-ios-triage.md` exists
- [x] Frontmatter fields: last_verified, review_by, applies_to: all, audience: L1, platform: iOS (5 fields)
- [x] Platform gate banner present on line 9 (first body line)
- [x] Exactly 3 decision-diamond nodes (IOS1, IOS2, IOS3) — satisfies SC #1 (5-node budget)
- [x] Exactly 6 click directives linking IOSR1-IOSR6 to runbook files 16-21
- [x] Routing Verification table enumerates all 9 terminals (6 resolved + 3 escalate)
- [x] How to Check table has 3 rows matching IOS1/IOS2/IOS3 questions
- [x] Escalation Data table has 2 rows (Other/unclear + Profile/config/app)
- [x] Related Resources has 7 bulleted links including iOS L2 Phase 31 placeholder
- [x] Version History has 1 row with date 2026-04-17
- [x] No macOS/MAC*/APv1/APv2/TRD* leakage from the cloning process
- [x] Validator Check 1 and Check 8 flip from FAIL to PASS
</success_criteria>

<output>
After completion, create `.planning/phases/30-ios-l1-triage-runbooks/30-02-SUMMARY.md` with:
- Total file length (line count)
- Which sections were cloned verbatim from macOS and which were rewritten
- Any deviations from the Mermaid text in 30-RESEARCH.md Section 5 (none expected; flag if any)
- Confirmation the 6 runbook click targets use D-21 filenames exactly
</output>
