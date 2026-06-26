# Phase 92: Navigation Hub Integration — Research

**Researched:** 2026-06-25
**Domain:** Documentation navigation wiring — Markdown table/list/mermaid edits across 4 existing hub files
**Confidence:** HIGH (all findings verified from live file reads at current HEAD)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01 — index.md placement (1A-mod):** Add `01` and `02` as rows to BOTH the macOS `### Service Desk (L1)` table AND the `### Desktop Engineering (L2)` table. Add L2 #30 row to L2 table only. Labels surface both Kandji + Iru. Do NOT re-add `00`. #30 "When to Use" cell names the three tracks at a glance.

**D-02 — common-issues.md entries (2A):** Two new `###` symptom subsections appended after `### Kerberos SSO Extension Failure` (current line 220):
1. `### MDM Migration Failure (Kandji/Iru → Intune)` — symptom line describes the non-dismissible full-screen deadline lockout; `**L1:** No L1 runbook — escalate to L2` (verbatim Kerberos template line 224); `**L2:**` → L2 #30.
2. `### Platform SSO Re-Registration Failure (Post-Migration)` — `**L2:**` → L2 #27 AND L2 #30. States PSSO re-registration always required. Does NOT assert same-tenant key survival.

**D-03 — quick-ref-l2.md commands (3A hybrid link-not-copy):** New `####` migration-diagnostics subsection (sibling to existing `#### Platform SSO Attestation Command` / `#### Kerberos SSO Diagnostics` blocks) placed BEFORE `### macOS Investigation Runbooks`. Cross-refs existing commands by anchor rather than restating. Adds ONLY net-new migration commands: `ls /Library/Kandji/` and `sw_vers -productVersion`. Adds L2 #30 bullet to `### macOS Investigation Runbooks`.

**D-04 — decision-tree leaf (4A-mod, MANDATORY MAC1 fix):** Add ONE new MAC3 branch → new red escalate node `MACE3` → `click MACE3 "../l2-runbooks/30-macos-mdm-migration-failure.md"`. Label the MAC3 branch for the migration-prompt presentation (NOT a desktop "primary symptom"). Add MAC1 "How to Check" disambiguation note for deadline-lockout routing. Add `MACE3` to `class … escalateL2` line. Add 1 Routing Verification row + 1 Version History row.

**D-05 — navigation-last + single atomic commit (5A-mod):** Single atomic commit touching all four hub files, preceded by explicit pre-commit verification of (a) all 3 content files exist at HEAD via `git cat-file -e HEAD:<path>` AND (b) every anchor/path each new hub link targets resolves. No V-63 pin regeneration. Sequential on main tree.

### Claude's Discretion

- Exact row "When to Use" cell wording, symptom-line phrasing, and Version History footer text — within the structural decisions and the both-names / lockout-presentation rules above.
- Exact `####` heading text for the migration-diagnostics block and the order of net-new commands.
- Exact MAC3 branch label wording and the mermaid node id (`MACE3` suggested) — within the prompt-presentation-labeling rule.

### Deferred Ideas (OUT OF SCOPE)

- L1 quick-ref parity (`quick-ref-l1.md` migration entry) — out of scope; SC3 names only `quick-ref-l2.md`.
- Per-phase validator `check-phase-92.mjs` and any nav-hub pinning — belong to Phase 93.

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| NAV-01 | Navigation hubs integrate the two new walkthroughs + L2 #30 navigation-last (after all content files confirmed committed) — `docs/index.md`, `docs/common-issues.md`, `docs/quick-ref-l2.md`, and the `docs/decision-trees/06-macos-triage.md` migration leaf | All 3 content files confirmed at HEAD; all 4 hub files read; exact insertion points, existing anchors, and surrounding format documented below. |

</phase_requirements>

---

## Summary

This phase wires three already-committed content files into four nav-hub files using a single atomic commit (D-05). All decisions are locked via adversarial review; this research provides the mechanical facts a planner needs to write unambiguous edit tasks: exact current line numbers, verbatim surrounding text to match, anchor IDs for links, mermaid insertion mechanics, and the D-05 pre-commit verification script.

**All 3 content files confirmed at HEAD** (`git cat-file -e` verified):
- `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` — H1: "macOS Platform SSO Provisioning Walkthrough: A1 Standard and A2 ADE-during-Setup-Assistant"
- `docs/macos-lifecycle/02-mdm-migration-psso.md` — H1: "macOS MDM Migration Walkthrough: B1 In-Place (macOS 26+) and B2 Wipe-and-Re-Enroll"
- `docs/l2-runbooks/30-macos-mdm-migration-failure.md` — H1: "macOS MDM Migration Failure Investigation"

**All 4 hub files confirmed at HEAD** (not blob-pinned; no V-63 interaction):
- `docs/index.md`, `docs/common-issues.md`, `docs/quick-ref-l2.md`, `docs/decision-trees/06-macos-triage.md`

**Primary recommendation:** One plan, one wave, single atomic commit. Pre-commit verification script runs `git cat-file -e` on all 3 content files + resolves all new link anchors before touching any hub file.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Navigation hub wiring | Documentation layer | — | Pure Markdown edit task; no code, no backend, no UI components |
| Anchor resolution verification | Pre-commit script | git cat-file | Ensures nav-last invariant before atomic commit |

---

## Hub File 1: docs/index.md

### Current Structure (VERIFIED — lines read at HEAD)

| Line | Content |
|------|---------|
| 98 | `## macOS Provisioning` |
| 100 | Intro paragraph with `00-ade-lifecycle.md` cross-link |
| 102 | `### Service Desk (L1)` |
| 103 | blank |
| 104 | `\| Resource \| When to Use \|` |
| 105 | `\|----------\|-------------\|` |
| 106 | `\| [macOS ADE Lifecycle](macos-lifecycle/00-ade-lifecycle.md) \| Understand the 7-stage macOS enrollment pipeline from ABM registration through desktop \|` |
| 107 | `\| [macOS ADE Triage Decision Tree](decision-trees/06-macos-triage.md) \| Start here -- … \|` |
| 108 | `\| [macOS L1 Runbooks](l1-runbooks/00-index.md#macos-ade-runbooks) \| … \|` |
| 109 | `\| [L1 Quick-Reference Card](quick-ref-l1.md#macos-ade-quick-reference) \| … \|` |
| 110 | `\| [macOS Platform SSO Runbooks](l1-runbooks/00-index.md#macos-ade-runbooks) \| … \|` |
| 111 | blank |
| 112 | `### Desktop Engineering (L2)` |
| 113 | blank |
| 114 | `\| Resource \| When to Use \|` |
| 115 | `\|----------\|-------------\|` |
| 116 | `\| [macOS ADE Lifecycle](macos-lifecycle/00-ade-lifecycle.md) \| End-to-end enrollment stages with behind-the-scenes technical detail \|` |
| 117–124 | remaining L2 rows (commands ref, log paths, endpoints, log collection, L2 runbooks, L2 quick-ref, PSSO investigation, Kerberos investigation, Graph credential investigation) |
| 125 | `\| [macOS Graph Credential Investigation](l2-runbooks/00-index.md#macos-ade-runbooks) \| … (runbook #29) \|` |
| 126 | blank |
| 127 | `### Admin Setup` |

**CONTEXT line-number drift check:** CONTEXT states L1 table = lines 102–110, L2 table = lines 112–125. **Verified current file: L1 table header at line 102, L2 table header at line 112, last L2 row at line 125. No drift.** Admin Setup at line 127.

### Placement Precedent: 00-ade-lifecycle.md triple-listing

`00-ade-lifecycle.md` appears in all three macOS role tables (L1 line 106, L2 line 116, Admin Setup line 131). This is the pattern for role-neutral lifecycle walkthroughs — `01` and `02` are identical in kind.

### D-01 Insertion Points (EXACT)

**L1 table — append after line 110** (after the last current L1 row, before blank line 111):
```
| [macOS PSSO Provisioning Walkthrough](macos-lifecycle/01-psso-provisioning-walkthrough.md) | Walk through a Mac from enrollment to PSSO-registered end user — both standard post-enrollment (A1) and ADE-during-Setup-Assistant macOS 26+ (A2) paths |
| [macOS MDM Migration Walkthrough (Kandji/Iru → Intune)](macos-lifecycle/02-mdm-migration-psso.md) | Walk through B1 wipe-free in-place migration (macOS 26+) or B2 wipe-and-re-enroll (macOS 25 or earlier) from Kandji/Iru to Intune |
```

**L2 table — append after line 125** (after last current L2 row, before blank line 126):
```
| [macOS PSSO Provisioning Walkthrough](macos-lifecycle/01-psso-provisioning-walkthrough.md) | Walk through a Mac from enrollment to PSSO-registered end user — both standard post-enrollment (A1) and ADE-during-Setup-Assistant macOS 26+ (A2) paths |
| [macOS MDM Migration Walkthrough (Kandji/Iru → Intune)](macos-lifecycle/02-mdm-migration-psso.md) | Walk through B1 wipe-free in-place migration (macOS 26+) or B2 wipe-and-re-enroll (macOS 25 or earlier) from Kandji/Iru to Intune |
| [macOS MDM Migration Failure Runbook](l2-runbooks/30-macos-mdm-migration-failure.md) | Investigate migration failures — Track A: deadline lockout (non-dismissible full-screen prompt, ABM admin recovery), Track B: profile-not-delivered / enrollment-failed (leftover Kandji/Iru agent), Track C: PSSO re-registration stuck |
```

**Admin Setup table — NOT modified** (D-01 decision: 01/02 added to L1+L2 only; #30 to L2 only; Admin Setup left unchanged).

**Anti-rename rule:** Do NOT restyle or modify the existing `00-ade-lifecycle.md` rows — they are the placement precedent, not a target for editing.

**Link paths from index.md root** (no `../` prefix needed — index.md sits at `docs/`):
- `macos-lifecycle/01-psso-provisioning-walkthrough.md`
- `macos-lifecycle/02-mdm-migration-psso.md`
- `l2-runbooks/30-macos-mdm-migration-failure.md`

---

## Hub File 2: docs/common-issues.md

### Current Structure (VERIFIED — lines read at HEAD)

| Line | Content |
|------|---------|
| 138 | `### Migration Issues` — Windows APv1-to-APv2 heading (name-collision target) |
| 157 | `## macOS ADE Failure Scenarios` — macOS section opens here |
| 213 | `### Platform SSO Sign-In Failure` |
| 218 | `- **L2:** [Platform SSO Investigation](l2-runbooks/27-macos-sso-investigation.md)` |
| 219 | blank |
| 220 | `### Kerberos SSO Extension Failure` |
| 221 | blank |
| 222 | `Kerberos TGT not acquired, realm or KDC unreachable, or \`usePlatformSSOTGT\` PSSO-TGT integration failing.` |
| 223 | blank |
| 224 | `- **L1:** No L1 runbook — escalate to L2` |
| 225 | `- **L2:** [Kerberos SSO Investigation](l2-runbooks/28-macos-kerberos-sso-investigation.md)` |
| 226 | blank |
| 227 | `## iOS/iPadOS Failure Scenarios` — next H2, hard boundary |

**CONTEXT line-number drift check:** CONTEXT states Kerberos heading at line 220, `No L1 runbook` line at 224, Windows `### Migration Issues` at 138. **Verified current file: all match exactly. No drift.**

### Kerberos Template (VERBATIM — must replicate this pattern exactly)

```markdown
### Kerberos SSO Extension Failure

Kerberos TGT not acquired, realm or KDC unreachable, or `usePlatformSSOTGT` PSSO-TGT integration failing.

- **L1:** No L1 runbook — escalate to L2
- **L2:** [Kerberos SSO Investigation](l2-runbooks/28-macos-kerberos-sso-investigation.md)
```

### D-02 Insertion Point (EXACT)

**Append after line 225** (after the Kerberos L2 link, before the blank line 226 and `## iOS/iPadOS Failure Scenarios` at line 227):

```markdown

### MDM Migration Failure (Kandji/Iru → Intune)

Device stuck on a non-dismissible full-screen migration prompt at or after the ABM deadline, or migration completed but Intune shows the device as not enrolled, or configuration profiles are not delivered.

- **L1:** No L1 runbook — escalate to L2
- **L2:** [macOS MDM Migration Failure](l2-runbooks/30-macos-mdm-migration-failure.md)

### Platform SSO Re-Registration Failure (Post-Migration)

Platform SSO "Registration Required" notification has not appeared after MDM migration, or registration was initiated but is not completing. PSSO re-registration is always required after MDM migration — MDM unenrollment = IdP unregistration; the Secure Enclave key is re-created on re-enrollment.

- **L2:** [macOS Platform SSO Investigation](l2-runbooks/27-macos-sso-investigation.md)
- **L2:** [macOS MDM Migration Failure](l2-runbooks/30-macos-mdm-migration-failure.md) — Track C: PSSO re-registration stuck
```

**Disambiguation rule:** The `(Kandji/Iru → Intune)` qualifier in the heading and the macOS-section scoping distinguish these entries from the Windows `### Migration Issues` at line 138. No additional disambiguation banner is needed.

**No-assert rule:** The second entry must NOT assert same-tenant key survival. The phrase "always required" is authoritative per Apple (MDM unenrollment = IdP unregistration).

**Link paths from common-issues.md root** (file sits at `docs/`):
- `l2-runbooks/30-macos-mdm-migration-failure.md`
- `l2-runbooks/27-macos-sso-investigation.md`

---

## Hub File 3: docs/quick-ref-l2.md

### Current Structure (VERIFIED — lines read at HEAD)

| Line | Content |
|------|---------|
| 132 | `## macOS ADE Quick Reference` — section H2 |
| 146 | `### Key Terminal Commands` |
| 148–159 | bash code block with `profiles status -type enrollment` (line 150) and `sudo profiles show` (line 152) |
| 173–176 | `### Platform SSO Log Paths` section header + table |
| 180 | `#### Platform SSO Attestation Command` — existing `####` sibling precedent |
| 184–186 | bash code block with `app-sso platform -s` command (line 185) |
| 188 | prose referencing `07-platform-sso-setup.md` |
| 190 | `#### Kerberos SSO Diagnostics` — second `####` sibling precedent |
| 194–196 | bash code block with `klist` (line 195) |
| 198 | prose paragraph ending with `[Platform SSO Attestation Command](#platform-sso-attestation-command)` |
| 199 | blank |
| 200 | `### macOS Investigation Runbooks` — list insertion point |
| 201 | blank |
| 202–207 | 6 bullet runbook links (log collection + profile delivery + app install + compliance + PSO investigation + Kerberos SSO) |
| 208 | blank (end of macOS section) |
| 209 | `---` separator |
| 210 | blank |
| 211 | `## iOS/iPadOS Quick Reference` — next H2, hard boundary |

**CONTEXT line-number drift check:** CONTEXT states `profiles status -type enrollment` at line 150, `#### Platform SSO Attestation Command` at line 180, `app-sso platform -s` at lines 180/185, `#### Kerberos SSO Diagnostics` at line 190, `### macOS Investigation Runbooks` at line 200. **Verified current file: all match exactly. No drift.**

### Existing `####` Sibling Pattern (replicate exactly)

```markdown
#### Platform SSO Attestation Command

Verify PSSO registration state -- run on the affected Mac:

```bash
app-sso platform -s
```

Expected healthy output …. See [anchor-ref] for …
```

```markdown
#### Kerberos SSO Diagnostics

Verify Kerberos ticket cache -- run on the affected Mac:

```bash
klist
```

Healthy output …
```

### Existing Anchor for Cross-Reference

The GitHub/markdown anchor for `#### Platform SSO Attestation Command` resolves as `#platform-sso-attestation-command` (plain-slug: lowercase, spaces → hyphens, strip special chars). This is the anchor the D-03 new block must cross-reference when linking to the existing `app-sso platform -s` command — do NOT copy the command text.

The anchor for `profiles status -type enrollment` in `### Key Terminal Commands` (line 150) has no dedicated heading; cross-reference by linking to `#key-terminal-commands`.

### D-03 Insertion Points (EXACT)

**Step 1: Insert new `####` block AFTER line 198** (after the `#### Kerberos SSO Diagnostics` prose, before the blank line 199 and `### macOS Investigation Runbooks` at line 200):

```markdown

#### MDM Migration Diagnostics

Diagnose Kandji/Iru → Intune migration failures on the affected Mac:

```bash
# Check if Kandji (Iru) agent directory is still present (Track B root cause)
ls /Library/Kandji/

# Verify macOS version meets the macOS 26+ gate for B1 in-place migration
sw_vers -productVersion
```

For enrollment status, cross-reference:
- [`profiles status -type enrollment`](#key-terminal-commands) — already in Key Terminal Commands above; checks MDM enrollment state and stale Kandji/Iru MDM certificates
- [`app-sso platform -s`](#platform-sso-attestation-command) — already in Platform SSO Attestation Command above; verifies PSSO re-registration state post-migration

See [L2 #30 macOS MDM Migration Failure](l2-runbooks/30-macos-mdm-migration-failure.md) for Track A/B/C investigation steps.
```

**Step 2: Append L2 #30 bullet AFTER line 207** (after the last current runbook bullet, before blank line 208):

```markdown
- [macOS MDM Migration Failure](l2-runbooks/30-macos-mdm-migration-failure.md) -- Track A: deadline lockout, Track B: profile-not-delivered / enrollment-failed, Track C: PSSO re-registration stuck
```

**Commands NOT to add:** `profiles list` — `profiles show` already exists at line 152. Inline mention is acceptable if needed, but do not add a new code block for it.

**Link path from quick-ref-l2.md root** (file sits at `docs/`):
- `l2-runbooks/30-macos-mdm-migration-failure.md`
- Anchor refs: `#platform-sso-attestation-command`, `#key-terminal-commands` (internal anchors, no path needed)

---

## Hub File 4: docs/decision-trees/06-macos-triage.md

### Current Mermaid Structure (VERIFIED — lines read at HEAD)

| Line | Content |
|------|---------|
| 29 | ` ```mermaid` |
| 30 | `graph TD` |
| 31 | `    MAC1{"Did Setup Assistant<br/>complete?"}` |
| 32 | `    MAC1 -->|No| MAC2{"Is the device visible<br/>in Intune admin center<br/>Devices &gt; macOS?"}` |
| 33 | `    MAC1 -->|Yes| MAC3{"What is the<br/>primary symptom?"}` |
| 34 | blank |
| 35 | `    MAC2 -->|No| MACR1(["See: Device Not Appearing<br/>in Intune Runbook"])` |
| 36 | `    MAC2 -->|Yes| MACR2(["See: Setup Assistant<br/>Stuck or Failed Runbook"])` |
| 37 | blank |
| 38–42 | MAC3 symptom edges → MACR3/MACR4/MACR5/MACR6/MACE1 |
| 43 | `    MAC3 -->|"Platform SSO<br/>sign-in issue"| MACSSO{…}` |
| 44 | `    MACSSO -->|"No — notification<br/>never appeared"| MACR7(…)` |
| 45 | `    MACSSO -->|"Yes, but key error<br/>or lost after reset"| MACR8(…)` |
| 46 | `    MACSSO -->|"Kerberos TGT<br/>not acquired"| MACE2(…)` |
| 47 | blank |
| 48–56 | `click` directives for MACR1–MACR8 + MACE2 |
| 57 | blank |
| 58 | `    classDef resolved fill:#28a745,color:#fff` |
| 59 | `    classDef escalateL2 fill:#dc3545,color:#fff` |
| 60 | `    class MACR1,MACR2,MACR3,MACR4,MACR5,MACR6 resolved` |
| 61 | `    class MACR7,MACR8 resolved` |
| 62 | `    class MACE1,MACE2 escalateL2` |
| 63 | ` ``` ` |
| 64 | blank |
| 65 | `## Routing Verification` |
| 67 | `All terminal nodes are within 3 edges of the root node (MAC1):` |
| 69–80 | Routing Verification table (10 rows currently) |
| 82 | `## How to Check` |
| 84–88 | "How to Check" table (3 rows) |
| 90 | `## Escalation Data` |
| 104 | `## Version History` |
| 106–110 | Version History table (3 data rows) |

**CONTEXT line-number drift check:** CONTEXT states root MAC1 at line 31, MAC3 at line 33, MACSSO at line 43, `click` directives at lines 48–56, `class … escalateL2` at line 62, "How to Check" at line 86 (table content), Routing Verification at lines 79–80, Version History at lines 104–110. **Verified current file: all match exactly. No drift.**

### MACE2 Escalate Pattern (replicate for MACE3)

```
    MACE2(["Escalate to L2:<br/>Kerberos SSO Investigation"])
    click MACE2 "../l2-runbooks/28-macos-kerberos-sso-investigation.md"
    class MACE1,MACE2 escalateL2
```

### D-04 Mermaid Edit Specification

**Insertion 1: Add MAC3 branch + MACE3 node after line 46** (after the last MACSSO arm, before blank line 47):

```
    MAC3 -->|"MDM migration /<br/>non-dismissible<br/>migration prompt"| MACE3(["Escalate to L2:<br/>MDM Migration Failure"])
```

**Insertion 2: Add MACE3 click directive after line 56** (after the last existing `click` on line 56, before blank line 57):

```
    click MACE3 "../l2-runbooks/30-macos-mdm-migration-failure.md"
```

**Edit 3: Add MACE3 to the `class … escalateL2` line (line 62)** — change:
```
    class MACE1,MACE2 escalateL2
```
to:
```
    class MACE1,MACE2,MACE3 escalateL2
```

**3-edge invariant verification:** The new path is MAC1 (edge 1) → MAC3 (edge 2) → MACE3 (terminal). That is 2 edges from root = within the ≤3-edge invariant. No sub-decision node is introduced for MACE3.

**Note on the MAC3 branch label for MACE3:** D-04 requires the branch label to describe the migration-prompt presentation, NOT a desktop "primary symptom". The label must NOT use "primary symptom" framing (which implies the user is at the Finder desktop). A device on a full-screen non-dismissible deadline-enforcement screen has NOT exited Setup Assistant history in the sense that it's not at the Finder desktop — see the D-04 sleeper verification section below.

### D-04 How to Check Table — MAC1 Disambiguation Note

**Current MAC1 "How to Check" row** (line 86):
```
| Did Setup Assistant complete? | Ask the user: "Are you at the macOS desktop with a Finder menu bar?" If yes, Setup Assistant completed. If the device shows the Apple logo, a spinning globe, the Remote Management screen ("Your Mac is being configured"), or any Setup Assistant welcome/sign-in screen, it did not complete. |
```

**D-04 MANDATORY addition:** The current wording creates ambiguity for a deadline-lockout device. A device displaying the full-screen non-dismissible Kandji/Iru → Intune migration prompt IS NOT at the Finder desktop and IS NOT in Setup Assistant — it is in deadline enforcement (Stage 6 of the migration walkthrough, post-Setup-Assistant historically). MAC1 = "Yes" applies because the device completed Setup Assistant historically and is now at the migration-enforcement stage, NOT at OOBE.

The "How to Check" cell for MAC1 must append a disambiguation note:

```
| Did Setup Assistant complete? | Ask the user: "Are you at the macOS desktop with a Finder menu bar?" If yes, Setup Assistant completed. If the device shows the Apple logo, a spinning globe, the Remote Management screen ("Your Mac is being configured"), or any Setup Assistant welcome/sign-in screen, it did not complete. **Exception:** A device showing a full-screen Kandji/Iru → Intune MDM migration deadline prompt is NOT in OOBE — it is in migration deadline enforcement and routes as MAC1 = Yes → MDM migration leaf (MACE3). |
```

### D-04 Routing Verification Table — Add 1 Row

Append after current row 10 (line 80, Kerberos TGT row):

```
| MDM migration — deadline prompt | Setup Assistant? Yes | Symptom: MDM migration / non-dismissible migration prompt | L2 escalation (#30) |
```

The `→` Step-2 convention from rows 79–80 (e.g., "Symptom: Platform SSO → key error") applies when the path involves a sub-decision. For the new MACE3 path there is NO sub-decision node — it is a direct MAC3 edge to terminal — so the Step-2 cell is a direct symptom label, not a `→` expression.

### D-04 Version History — Add 1 Row

Prepend as the new most-recent row at the top of the version history table (after the header row, before the current 2026-06-24 row):

```
| 2026-06-25 | Phase 92 (NAV-01): added MDM migration leaf (MACE3 → L2 #30) off MAC3; MAC1 "How to Check" disambiguation note for deadline-lockout routing; 1 Routing Verification row | -- |
```

---

## D-04 Sleeper Flaw 4.2 Verification (CONFIRMED)

**The question:** Is a deadline-lockout device at the Finder desktop (MAC1 = Yes, naturally routes to MAC3 symptom fork), or is it NOT at the Finder desktop (ambiguous MAC1 routing)?

**Evidence from L2 #30 Track A, Step 1 (lines 28–40 read at HEAD):**

> "Use this track when the device is presenting a full-screen, non-dismissible migration prompt. This occurs when the ABM migration deadline has passed and the device has not yet completed Intune enrollment. **The device is unusable for work until enrollment completes** or the migration is canceled by an ABM admin."
>
> "Gather from the user or on-site technician:
> - macOS version (system info may be partially accessible from the enrollment prompt)
> - Device serial number (required for Intune and ABM lookup)
> - Whether the user had previously tapped 'Not Now' on earlier migration prompts before the deadline"

And from Stage 6 of `02-mdm-migration-psso.md` (lines 280–282):

> "At the deadline time, the device displays a **non-dismissible full-screen migration prompt** that prevents the user from using the device for any work until MDM enrollment completes."

**Evidence from `06-macos-triage.md` "How to Check" (current line 86):**

> "Ask the user: 'Are you at the macOS desktop with a Finder menu bar?' If yes, Setup Assistant completed."

**Conclusion (VERIFIED):** A deadline-lockout device is displaying a full-screen system prompt — it is NOT at the macOS desktop with a Finder menu bar. A literal reading of the current MAC1 "How to Check" wording ("Are you at the macOS desktop with a Finder menu bar? If yes, Setup Assistant completed") would cause a first-responder to answer MAC1 = No (because there is no Finder menu bar), routing to MAC2 (device visibility in Intune) — which is WRONG. The correct routing is MAC1 = Yes (the device completed Setup Assistant historically; it is now in post-enrollment deadline enforcement). This is the confirmed sleeper flaw 4.2.

**Fix (D-04 MANDATORY):** The MAC1 "How to Check" row must add the exception clause for the migration deadline prompt so that L1 responders route the device to MAC1 = Yes → MAC3 → MACE3, not MAC1 = No → MAC2.

---

## D-05 Navigation-Last Verification Protocol

### Pre-Commit Verification Script

The executor MUST run the following verification BEFORE staging any hub file changes. All checks must pass before the atomic commit is created.

```bash
# Step 1: Confirm all 3 content files exist at HEAD
git cat-file -e HEAD:docs/macos-lifecycle/01-psso-provisioning-walkthrough.md && echo "01: OK"
git cat-file -e HEAD:docs/macos-lifecycle/02-mdm-migration-psso.md && echo "02: OK"
git cat-file -e HEAD:docs/l2-runbooks/30-macos-mdm-migration-failure.md && echo "30: OK"
git cat-file -e HEAD:docs/l2-runbooks/27-macos-sso-investigation.md && echo "27: OK"

# Step 2: Confirm 4 hub files are NOT blob-pinned (they should not be; this is a sanity check)
# V-63-08 and V-63-09 pin macos-capability-matrix.md and 4-platform-capability-comparison.md only.
# The 4 Phase-92 hub files have no blob-pin. No pin regeneration required.

# Step 3: Anchor resolution checks (manual inspection of edited files before commit)
# Verify the following link targets resolve in the working tree:
# - docs/index.md links: macos-lifecycle/01-psso-provisioning-walkthrough.md ✓ (Step 1 above)
# - docs/index.md links: macos-lifecycle/02-mdm-migration-psso.md ✓ (Step 1 above)
# - docs/index.md links: l2-runbooks/30-macos-mdm-migration-failure.md ✓ (Step 1 above)
# - docs/common-issues.md links: l2-runbooks/30-macos-mdm-migration-failure.md ✓ (same file)
# - docs/common-issues.md links: l2-runbooks/27-macos-sso-investigation.md ✓ (Step 1 above)
# - docs/quick-ref-l2.md links: l2-runbooks/30-macos-mdm-migration-failure.md ✓ (same file)
# - docs/quick-ref-l2.md internal anchors: #platform-sso-attestation-command ✓ (existing heading)
# - docs/quick-ref-l2.md internal anchors: #key-terminal-commands ✓ (existing heading)
# - docs/decision-trees/06-macos-triage.md click: ../l2-runbooks/30-macos-mdm-migration-failure.md ✓
```

### Atomic Commit Shape

After all verifications pass, stage all four edited files in a single commit:

```bash
git add docs/index.md docs/common-issues.md docs/quick-ref-l2.md docs/decision-trees/06-macos-triage.md
git commit -m "docs(phase-92): nav-hub integration — wire 01/02/30 into index/common-issues/quick-ref/triage (NAV-01)"
```

**No additional files to stage:** V-63-08/09 pins are not in scope. No validator scripts authored in this phase (Phase 93). No content files edited (navigation-last).

---

## Content Files: Link Target Anchors

These are the link targets the hub edits will point to. No editing of these files occurs in Phase 92.

### 01-psso-provisioning-walkthrough.md

- **File path:** `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md`
- **H1:** `macOS Platform SSO Provisioning Walkthrough: A1 Standard and A2 ADE-during-Setup-Assistant`
- **Hub links target the file root** (no deep-link needed for index.md / common-issues.md purposes)
- **No specific anchor required** for the index.md table row

### 02-mdm-migration-psso.md

- **File path:** `docs/macos-lifecycle/02-mdm-migration-psso.md`
- **H1:** `macOS MDM Migration Walkthrough: B1 In-Place (macOS 26+) and B2 Wipe-and-Re-Enroll`
- **Hub links target the file root** (no deep-link needed for index.md / common-issues.md purposes)

### 30-macos-mdm-migration-failure.md

- **File path:** `docs/l2-runbooks/30-macos-mdm-migration-failure.md`
- **H1:** `macOS MDM Migration Failure Investigation`
- **Track anchors** (derived from heading text, plain-GitHub slug rules — lowercase, spaces to hyphens):
  - `#track-a-deadline-lockout`
  - `#track-b-profile-not-delivered--enrollment-failed` (double-hyphen from ` / `)
  - `#track-c-psso-re-registration-stuck`
- **Hub links in index.md / common-issues.md / quick-ref-l2.md target the file root** — the "When to Use" cell text names the tracks textually; no deep anchor link required for Phase 92
- **Triage tree click directive** in 06-macos-triage.md targets the file root: `"../l2-runbooks/30-macos-mdm-migration-failure.md"`

### 27-macos-sso-investigation.md

- **File path:** `docs/l2-runbooks/27-macos-sso-investigation.md`
- **H1:** `macOS Platform SSO Investigation`
- **Hub links target the file root** (common-issues.md D-02 second entry links to file root)

---

## Common Pitfalls

### Pitfall 1: Editing content files during Phase 92
**What goes wrong:** Nav-hub phase accidentally edits 01-psso-provisioning-walkthrough.md, 02-mdm-migration-psso.md, or 30-macos-mdm-migration-failure.md.
**Why it happens:** Planner conflates "wiring" with "adding context to content."
**How to avoid:** Phase 92 is navigation-last — it edits ONLY the 4 nav-hub files. Content files are frozen for v1.11. If a content file needs updating, that is Phase 89/90 scope (already done).

### Pitfall 2: MAC1 disambiguation omitted (sleeper flaw 4.2)
**What goes wrong:** The D-04 Routing Verification and MAC1 "How to Check" amendment is treated as optional. Deadline-lockout devices get mis-routed to MAC2 by L1 responders.
**Why it happens:** The flaw is non-obvious (the device did complete Setup Assistant, historically), and fixing "How to Check" prose feels outside the "add a new mermaid leaf" scope.
**How to avoid:** D-04 execution rules make the MAC1 "How to Check" amendment MANDATORY (non-optional). It must be in the same atomic commit as the MACE3 node.

### Pitfall 3: MACE3 missing from `class … escalateL2`
**What goes wrong:** MACE3 renders as an unstyled white node instead of red.
**Why it happens:** The `class` line modification is a separate in-file edit from adding the node and click directive.
**How to avoid:** D-04 specification explicitly lists three sub-edits: (a) add MAC3 edge + MACE3 node; (b) add click MACE3 directive; (c) add MACE3 to `class … escalateL2` line. All three must be applied.

### Pitfall 4: Copying `profiles status` or `app-sso platform -s` into quick-ref-l2.md
**What goes wrong:** The new migration-diagnostics `####` block duplicates commands already present at lines 150 and 185, creating content drift risk.
**Why it happens:** The instinct is to make the new block self-contained.
**How to avoid:** D-03 (3A) requires link-not-copy for the two existing commands. The new block only adds the two net-new commands (`ls /Library/Kandji/` and `sw_vers -productVersion`) and cross-references the existing blocks by anchor.

### Pitfall 5: V-63 pin regeneration attempted
**What goes wrong:** Executor attempts to update check-phase-63.mjs blob hashes, introducing unnecessary risk.
**Why it happens:** Phase 91 had a V-63-08/09 atomic update; executor cargo-cults the pattern.
**How to avoid:** V-63-08/09 pins cover `macos-capability-matrix.md` and `4-platform-capability-comparison.md` only. None of the 4 Phase-92 hub files are blob-pinned. D-05 execution rule: "No V-63 pin to regenerate."

### Pitfall 6: Per-hub commits instead of single atomic commit
**What goes wrong:** Intermediate HEADs exist with partially-wired hubs (e.g., index.md links to #30 before triage tree has the MACE3 leaf).
**Why it happens:** Multi-file changes feel safer when committed separately.
**How to avoid:** D-05 requires a single atomic commit. All four hub files are staged and committed together.

### Pitfall 7: `## macOS ADE Failure Scenarios` scoping lost
**What goes wrong:** The two new `###` headings in common-issues.md are inserted before line 157 or after line 227 (outside the macOS section).
**Why it happens:** Line counting error.
**How to avoid:** Insertion point is line 225 (after the Kerberos L2 link) and before line 226 (blank before `## iOS/iPadOS Failure Scenarios` at line 227). Verify the `## iOS/iPadOS Failure Scenarios` boundary before inserting.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Anchor slug derivation | Custom slug logic | Plain-GitHub slug rules (lowercase, spaces→hyphens, drop non-alphanumeric except hyphens) | Already established in project per Phase 91 anchor-slug precedent |
| Pre-commit verification | Custom validation framework | `git cat-file -e HEAD:<path>` shell one-liners | Already specified in D-05; sufficient for the nav-last invariant |

---

## Package Legitimacy Audit

Not applicable — this phase installs no external packages. All edits are Markdown text.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| git | D-05 pre-commit verification | Confirmed (repo is active) | — | — |

---

## Validation Architecture

### Phase Gate (D-05)

The only validation for this phase is the D-05 pre-commit verification script (see above). There is no per-phase validator (`check-phase-92.mjs`) in this phase — that belongs to Phase 93.

**Quick check:** After the atomic commit, verify:
1. `git log --oneline -1` shows a single commit touching exactly 4 files.
2. `git diff HEAD~1 --name-only` lists only `docs/index.md`, `docs/common-issues.md`, `docs/quick-ref-l2.md`, `docs/decision-trees/06-macos-triage.md`.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| — | — | — | — |

**All claims in this research were verified from live file reads at HEAD or git object checks. No assumed claims.** Line numbers verified against actual file content. V-63 pin scope verified from check-phase-63.mjs source read.

---

## Open Questions

No unresolved questions for planning. All mechanical facts are confirmed from file reads.

---

## Sources

### Primary (HIGH confidence — verified from live file reads at HEAD)

- `docs/index.md` — read in full; line numbers verified
- `docs/common-issues.md` — read in full; line numbers verified
- `docs/quick-ref-l2.md` — read in full; line numbers verified
- `docs/decision-trees/06-macos-triage.md` — read in full; line numbers verified
- `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` — read in full; H1 and track structure confirmed
- `docs/macos-lifecycle/02-mdm-migration-psso.md` — read in full; H1 and track structure confirmed
- `docs/l2-runbooks/30-macos-mdm-migration-failure.md` — read in full; Track A Step 1 deadline-lockout wording confirmed for sleeper flaw 4.2 verification
- `docs/l2-runbooks/27-macos-sso-investigation.md` — H1 confirmed; file exists at HEAD
- `scripts/validation/check-phase-63.mjs` — lines 46–47, 202–237 read; V-63-08/09 pin scope confirmed
- `.planning/phases/92-navigation-hub-integration/92-CONTEXT.md` — read in full; all locked decisions extracted
- `.planning/REQUIREMENTS.md` — NAV-01 confirmed
- `.planning/ROADMAP.md` — Phase 92 success criteria 1–4 confirmed
- `git cat-file -e HEAD:<path>` — all 4 content files + 4 hub files confirmed present at HEAD

---

## Metadata

**Confidence breakdown:**
- Hub file insertion points: HIGH — verified from live file reads; no assumed line numbers
- Mermaid edit mechanics: HIGH — verified from live mermaid block read
- Content file existence and anchors: HIGH — verified via git cat-file and file reads
- D-05 verification commands: HIGH — standard git plumbing commands
- V-63 pin non-interaction: HIGH — verified from check-phase-63.mjs source

**Research date:** 2026-06-25
**Valid until:** This research is point-in-time at HEAD `37b05fe`. Re-verify line numbers if any intervening commit touches any of the 4 hub files before the Phase 92 plan is executed.
