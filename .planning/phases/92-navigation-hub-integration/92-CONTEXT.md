# Phase 92: Navigation Hub Integration - Context

**Gathered:** 2026-06-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Wire the three already-committed v1.11 content files into the **four top-level navigation hubs** so every new surface is reachable from every applicable hub, and the **navigation-last invariant** is fully satisfied (no nav-hub link committed until its target content file is confirmed committed).

**Content files being surfaced (all exist + committed at HEAD — verified):**
- `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` (Phase 89; authored but **never wired into any nav hub** — this phase wires it now)
- `docs/macos-lifecycle/02-mdm-migration-psso.md` (Phase 90; B1 macOS-26 in-place + B2 pre-26 wipe migration walkthrough)
- `docs/l2-runbooks/30-macos-mdm-migration-failure.md` (Phase 90; three tracks — A deadline-lockout, B profile-not-delivered, C PSSO re-reg-stuck → C link-not-copies to L2 #27)

**Four nav hubs edited (navigation-last):**
- `docs/index.md` — `## macOS Provisioning` role tables
- `docs/common-issues.md` — `## macOS ADE Failure Scenarios`
- `docs/quick-ref-l2.md` — `## macOS ADE Quick Reference`
- `docs/decision-trees/06-macos-triage.md` — mermaid triage tree

This phase does **NOT**: author or edit content/runbook narrative (Phases 89/90 own that — frozen here); touch glossary/capability-matrix (Phase 91, done); touch any blob-pinned file (V-63-08/09 pin the matrix + 4-platform files from Phase 91, untouched here); assert same-tenant Secure-Enclave key survival (PSSO re-registration is ALWAYS required post-migration); duplicate content into hubs (link-not-copy).

</domain>

<decisions>
## Implementation Decisions

**All five gray areas resolved via `/adversarial-review`** (Finder/Adversary/Referee, three Opus agents). Finder raised 41 flaws (score 168); Adversary disproved 3 (1.1, 3.1, 4.6); Referee confirmed the rest, downgraded 3 over-severe CRITICALs (1.4, 1.7, 4.4 → MEDIUM; 1.1 → false positive), and confirmed the load-bearing sleeper **4.2**. Winners **1A-mod / 2A / 3A / 4A-mod / 5A-mod** are mutually coherent — every content winner attaches to an **existing structure** (no new top-level section anywhere), discoverability is uniform across hubs, and link-not-copy holds throughout.

### D-01 — index.md placement (Area 1, WINNER 1A modified)
- **Decision:** Add `01` and `02` as rows to **BOTH** the macOS `### Service Desk (L1)` table (lines 102–110) and the `### Desktop Engineering (L2)` table (lines 112–125). Add the L2 #30 row to the **L2 table only**.
- *Rationale:* `01`/`02` are role-neutral lifecycle **walkthroughs**, identical in kind to `00-ade-lifecycle.md`, which is already triple-duplicated across L1/L2/Admin tables. 1A is the only option literally satisfying SC1's "accessible to both L1 and L2" while preserving the per-platform tri-table symmetry. **1B rejected** (new "Scenario Walkthroughs" sub-section = sibling asymmetry; no other platform block has a role-neutral pre-table listing). **1C rejected** (L1-table-only under-satisfies SC1 and splits `02` from its companion `#30` runbook). *Adversary overturned the Finder's "1A mis-signals audience" CRITICAL — `02` is the walkthrough, not the L2 failure runbook; the `00` precedent settles it.*
- **EXECUTION RULES:**
  - Add only `01`+`02` as new rows; do **NOT** re-add `00` (already present in all tables — avoids 4× redundancy).
  - `#30` row → **L2 table only**; its "When to Use" cell must name the three tracks at a glance so a locked-device tech recognizes it.
  - Labels surface **both Kandji + Iru** (e.g., "macOS MDM Migration Walkthrough (Kandji/Iru → Intune)"). Apply anti-rename: do not restyle existing `00` rows.

### D-02 — common-issues.md entries (Area 2, WINNER 2A)
- **Decision:** Two new `###` symptom subsections appended after `### Kerberos SSO Extension Failure` (line 220):
  1. `### MDM Migration Failure (Kandji/Iru → Intune)` — symptom line MUST describe the **non-dismissible full-screen deadline lockout** so a Track-A reader self-identifies; `**L1:** No L1 runbook — escalate to L2` (verbatim Kerberos pattern, line 224); `**L2:**` → L2 #30.
  2. `### Platform SSO Re-Registration Failure (Post-Migration)` — `**L2:**` → L2 #27 **AND** L2 #30.
- *Rationale:* 2A preserves the file's strict one-symptom-per-`###` index anatomy AND gives the migration-failure symptom its own discoverable heading. **2B rejected** (combines SC2's two required entries into one heading — breaks anatomy, single anchor). **2C rejected (CRITICAL 2.7)** — folding into "Platform SSO Sign-In Failure" makes a deadline-lockout reader unable to find the migration entry, and corrupts that entry's scope.
- **EXECUTION RULES:** The macOS-section scoping + "(Kandji/Iru → Intune)" qualifier disambiguates the heading from the Windows `### Migration Issues` (line 138). Reuse the Kerberos `No L1 runbook — escalate to L2` line **verbatim**. The post-migration entry states PSSO re-registration is always required — do **NOT** assert same-tenant key survival.

### D-03 — quick-ref-l2.md commands (Area 3, WINNER 3A — hybrid link-not-copy)
- **Decision:** Add a migration-diagnostics subsection that (i) cross-refs the **already-present** commands by anchor — `app-sso platform -s` (line 185, anchor `#platform-sso-attestation-command`) and `profiles status -type enrollment` (line 150, under `### Key Terminal Commands`) — rather than restating them; (ii) adds ONLY the net-new migration commands (`ls /Library/Kandji/` = leftover source-MDM agent check; `sw_vers -productVersion` = OS-26 gate); (iii) adds an L2 #30 bullet to `### macOS Investigation Runbooks` (line 200).
- *Rationale:* 3A honors the milestone's dominant **link-not-copy** ethos, surfaces the net-new commands SC3 requires, and is sibling-consistent with the existing per-topic diagnostic blocks. **3B rejected (CRITICAL 3.4)** — restating `app-sso`/`profiles status` inline duplicates lines 150/185 (drift) and risks stripping the over-interpretation caveat. **3C rejected** — bullet-only never surfaces the net-new commands (under-satisfies SC3). *Adversary overturned the Finder's "new subsection" objection — the file already uses per-topic `####` diagnostic blocks (`#### Platform SSO Attestation Command` line 180, `#### Kerberos SSO Diagnostics` line 190).*
- **EXECUTION RULES:** Match the existing sibling **`####`** nesting level (the precedent blocks are `####` under the macOS H2); place before `### macOS Investigation Runbooks`. Do **NOT** add `profiles list` as a fresh command — `profiles show` already exists (line 152); note inline if needed. Surface the `app-sso platform -s` over-interpretation hedge by **linking** to #30/#27, not restating.

### D-04 — decision-tree leaf (Area 4, WINNER 4A modified — with MANDATORY MAC1 fix)
- **Decision:** Add ONE new MAC3 branch → a new red escalate node (`MACE3`) → `click MACE3 "../l2-runbooks/30-macos-mdm-migration-failure.md"`. Single discoverable leaf, ≤3 edges, mirroring the Kerberos `MACE2` escalate pattern (migration has no L1 runbook).
- *Rationale:* 4A stays within the "all terminals ≤3 edges" invariant, attaches to the existing MAC3 node (no new structure), and routes to #30 as a distinct discoverable leaf (satisfies SC4). **4B rejected** — its `MACMIG` sub-decision is **degenerate** (all 3 tracks land on #30, unlike MACSSO's true 3-way fan-out to #35/#36/#28) and zero edge-margin. **4C rejected (CRITICAL 4.7/4.8)** — off-MAC1 breaks the binary Setup-Assistant-first root; off-"Other/unclear" buries it under generic MACE1 (no #30 click → fails SC4).
- **MANDATORY EXECUTION RULE — resolves CONFIRMED sleeper flaw 4.2 (non-optional):** A deadline-lockout device is on a **full-screen non-dismissible migration prompt — NOT at the Finder desktop**, so MAC1 ("Did Setup Assistant complete?") is genuinely ambiguous (the device completed Setup Assistant historically but is not at a desktop now). The brief's "it's at the desktop → Yes" assumption is **factually wrong** vs L2 #30 Track A + the tree's own "How to Check". Therefore:
  1. Label the new MAC3 branch for the **migration-prompt presentation** (e.g., "MDM migration / non-dismissible migration prompt"), NOT a desktop "primary symptom".
  2. Add a MAC1 "How to Check" disambiguation note: a device showing a full-screen **Kandji/Iru → Intune migration/deadline prompt** routes as **MAC1 = Yes → migration leaf** (it is migration enforcement, not OOBE) — preventing mis-routing to MAC2 (device-not-appearing).
  3. Add `MACE3` to the `class … escalateL2` line (else it renders unstyled). Add 1 Routing Verification row (use the `→` Step-2 convention if expressing prompt-state, per existing rows 79–80) + 1 Version History row.

### D-05 — navigation-last enforcement + commit shape (Area 5, WINNER 5A modified — add anchor verification)
- **Decision:** **Single atomic commit** touching all four hub files, preceded by an explicit pre-commit verification that confirms BOTH (a) all 3 content files exist at HEAD (`git cat-file -e HEAD:<path>`) AND (b) every anchor/path each new hub link targets resolves.
- *Rationale:* one coherent commit = no partially-wired intermediate HEADs (the antithesis of a nav-integration phase). **5B rejected** — per-hub commits leave cross-hub-incoherent intermediate states. **5C rejected** — no verification defeats the phase's defining invariant and ships unverified anchors (Phase 91 anchor-slug fragility precedent). The coarse-revert/ceremony objections to 5A are all LOW and outweighed.
- **EXECUTION RULES:** Anchor verification MUST include the in-tree click `../l2-runbooks/30-macos-mdm-migration-failure.md`, the quick-ref anchor `#platform-sso-attestation-command`, and the relative paths to `01`/`02`/#30/#27. **No V-63 pin to regenerate** — none of these 4 hubs are blob-pinned (those pins belong to Phase 91's matrix/4-platform files). Run **sequentially on the main tree** per the durable `use_worktrees:false` constraint.

### Claude's Discretion
- Exact row "When to Use" cell wording, symptom-line phrasing, and Version History footer text — within the structural decisions and the both-names / lockout-presentation rules above.
- Exact `####` heading text for the migration-diagnostics block and the order of net-new commands.
- Exact MAC3 branch label wording and the mermaid node id (`MACE3` suggested) — within the prompt-presentation-labeling rule.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase requirements & success criteria (read first)
- `.planning/REQUIREMENTS.md` — **NAV-01** is the single LOCKED requirement (the 4 nav hubs integrate the two walkthroughs + L2 #30 navigation-last, after all content files confirmed committed).
- `.planning/ROADMAP.md` §"Phase 92" — Success Criteria 1–4 (index.md rows for 01/02 + L2 #30; common-issues migration + PSSO-re-reg entries; quick-ref migration commands; decision-tree migration leaf).

### Nav-hub files this phase edits (navigation-last)
- `docs/index.md` — `## macOS Provisioning` (line 98); `### Service Desk (L1)` (102–110), `### Desktop Engineering (L2)` (112–125). `00-ade-lifecycle.md` triple-listing is the placement precedent.
- `docs/common-issues.md` — `## macOS ADE Failure Scenarios` (line 157); one-symptom-per-`###` anatomy; `### Kerberos SSO Extension Failure` (220) = append point + `No L1 runbook — escalate to L2` template (224); Windows `### Migration Issues` (138) = name-collision to disambiguate against.
- `docs/quick-ref-l2.md` — `## macOS ADE Quick Reference` (132); `### Key Terminal Commands` `profiles status -type enrollment` (150); `#### Platform SSO Attestation Command` `app-sso platform -s` (180/185, anchor `#platform-sso-attestation-command`); `#### Kerberos SSO Diagnostics` (190) = `####` sibling precedent; `### macOS Investigation Runbooks` (200) = runbook-bullet insertion point.
- `docs/decision-trees/06-macos-triage.md` — mermaid tree; root MAC1 (31), MAC3 symptom fork (33), MACSSO sub-decision precedent (43), `click` directives (48–56), `class … escalateL2` (62), "How to Use"/"How to Check" prose (15/86), Routing Verification table with `→` Step-2 convention (79–80), Version History (104–110). **3-edge invariant stated at line 67.**

### Content files being surfaced (link targets — do NOT edit; verify existence + anchors)
- `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` — Phase 89 provisioning walkthrough.
- `docs/macos-lifecycle/02-mdm-migration-psso.md` — Phase 90 B1+B2 migration walkthrough.
- `docs/l2-runbooks/30-macos-mdm-migration-failure.md` — Phase 90; Track A deadline-lockout (Step 1 confirms full-screen non-dismissible presentation, lines 28–36), Track B profile-not-delivered, Track C PSSO re-reg-stuck (link-not-copies to L2 #27, line 24).
- `docs/l2-runbooks/27-macos-sso-investigation.md` — PSSO re-registration investigation target (D-02 second entry + #30 Track C).

### Prior-phase context (carried-forward constraints)
- `.planning/phases/90-mdm-migration-walkthrough-l2-runbook-30/90-CONTEXT.md` — link-not-copy ethos; "only the 4 top-level nav hubs are navigation-last (Phase 92)" (line 105); PSSO re-reg ALWAYS required; both Kandji+Iru names.
- `.planning/phases/91-glossary-capability-matrix/91-CONTEXT.md` — no-new-structural-section pattern; anchor-slug fragility precedent; V-63-08/09 pins are on the matrix/4-platform files (NOT these hubs).

### Validator note
- `scripts/validation/check-phase-63.mjs` — V-63-08/09 blob pins cover `macos-capability-matrix.md` + `4-platform-capability-comparison.md` ONLY. **None of the 4 Phase-92 nav hubs are pinned** — no pin regeneration in this phase's commit. (Per-phase validator `check-phase-92.mjs` is authored later in Phase 93, not here.)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `00-ade-lifecycle.md` triple-table placement in index.md (lines 106/116/131) — the precedent for adding role-neutral lifecycle walkthroughs (01/02) to multiple role tables.
- Kerberos `### Kerberos SSO Extension Failure` entry in common-issues.md (220–225) — exact template for the new migration `###` (incl. `No L1 runbook — escalate to L2`).
- `#### Platform SSO Attestation Command` / `#### Kerberos SSO Diagnostics` blocks in quick-ref-l2.md (180/190) — `####` sibling pattern for the new migration-diagnostics block.
- MACSSO sub-decision + `MACE2` escalate leaf + `click` directives + `class escalateL2` in 06-macos-triage.md (43–62) — pattern for the new MAC3 migration branch/escalate leaf.
- Routing Verification `→` Step-2 convention (rows 79–80) — represents sub-decision/multi-step paths in the existing 2-column table without schema change.

### Established Patterns
- **Link-not-copy** — nav hubs route to content, never duplicate it (dominant milestone ethos; governs D-02/D-03).
- **No new top-level structural section** where an existing structure works (Phase 91 carry-forward; every winner attaches to existing structure).
- **Navigation-last** — only these 4 top-level hubs are nav-last; content/index edits already shipped in 89/90/91.
- **One-symptom-per-`###`** in common-issues.md; **per-platform tri-table** symmetry in index.md; **≤3-edge** terminal invariant in the triage tree.

### Integration Points
- index.md L2 table ↔ L2 #30 runbook + 02 walkthrough (companion docs kept in the same role table).
- common-issues.md `### MDM Migration Failure` ↔ L2 #30; `### Platform SSO Re-Registration Failure (Post-Migration)` ↔ L2 #27 + #30.
- quick-ref migration-diagnostics block ↔ existing `app-sso platform -s` / `profiles status` anchors + L2 #30.
- triage tree MAC3 migration branch ↔ L2 #30 (and MAC1 "How to Check" note for locked-device routing).

</code_context>

<specifics>
## Specific Ideas

- The **deadline-lockout device is NOT at the Finder desktop** (full-screen non-dismissible prompt) — this is the phase's highest-risk routing subtlety (sleeper flaw 4.2). Both the triage tree (D-04) and common-issues (D-02) must describe the device by its **full-screen migration-prompt presentation** so the two hubs share one coherent symptom vocabulary.
- Net-new quick-ref migration commands are exactly `ls /Library/Kandji/` (leftover source-MDM agent) and `sw_vers -productVersion` (OS-26 gate); `app-sso platform -s` and `profiles status -type enrollment` are already in-file and must be cross-referenced, not copied.
- All three content files are already committed at HEAD — the nav-last invariant is satisfiable; D-05's verification is content-existence + anchor-resolution before a single atomic commit.

</specifics>

<deferred>
## Deferred Ideas

- **L1 quick-ref parity** (`quick-ref-l1.md` migration entry) was raised as a possible additional gray area but is **out of scope** — SC3 names only `quick-ref-l2.md`, and migration diagnostics are L2-grade. Note for a future phase only if L1 demand surfaces.
- **Per-phase validator `check-phase-92.mjs`** and any nav-hub pinning belong to **Phase 93** (harness lineage bump), not here.

</deferred>

---

*Phase: 92-navigation-hub-integration*
*Context gathered: 2026-06-25*
