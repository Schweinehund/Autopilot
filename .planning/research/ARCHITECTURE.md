# Architecture Research

**Domain:** Documentation information architecture — v1.10 Platform SSO follow-ons (Kerberos guide, Graph-API doc, NUAL key edit) integrating into an existing macOS Intune documentation suite
**Researched:** 2026-06-22
**Confidence:** HIGH (grounded in direct file inspection of all named integration points; v1.9 close state verified)

---

## Standard Architecture

### System Overview

The suite uses the same layered hub-and-spoke architecture established across v1.0–v1.9. v1.10 adds three new content surfaces and one surgical edit into this structure. The key integration question is where the Graph-API doc lives — see the Component Responsibilities section and the gray-area call below.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      NAVIGATION HUBS (append-only)                       │
│  docs/index.md  |  docs/common-issues.md  |  quick-ref-l1/l2.md         │
├─────────────────────────────────────────────────────────────────────────┤
│                   ADMIN SETUP GUIDES (numbered, macOS)                   │
│  docs/admin-setup-macos/00-overview.md  (Mermaid sequence diagram)       │
│  01-abm … 07-platform-sso-setup … 09-enterprise-sso-plugin-migration     │
│  [NEW: 10-kerberos-sso-extension.md]                                     │
├─────────────────────────────────────────────────────────────────────────┤
│                GRAPH-API DOC — PLACEMENT DECISION REQUIRED               │
│  Option A: docs/admin-setup-macos/11-graph-api-platform-credential.md   │
│  Option B: docs/operations/[new subtree]/platform-credential-graph.md   │
│  (see gray-area analysis in Architectural Patterns below)                │
├─────────────────────────────────────────────────────────────────────────┤
│               L1 / L2 RUNBOOKS (next sequential numbers)                 │
│  docs/l2-runbooks/28-macos-kerberos-sso-investigation.md   [NEW]        │
│  docs/l2-runbooks/29-macos-graph-credential-investigation.md [NEW]      │
├─────────────────────────────────────────────────────────────────────────┤
│                  REFERENCE LAYER (surgical extensions)                   │
│  docs/reference/macos-capability-matrix.md -- Kerberos row(s) added     │
│  docs/_glossary-macos.md -- Kerberos SSO Extension + Graph entries       │
├─────────────────────────────────────────────────────────────────────────┤
│               VALIDATION / HARNESS LAYER (lineage bump)                  │
│  scripts/validation/v1.10-milestone-audit.mjs  (Path-A from v1.9)        │
│  scripts/validation/v1.10-audit-allowlist.json  (sidecar)                │
│  scripts/validation/check-phase-83.mjs … check-phase-NN.mjs             │
│  .github/workflows/audit-harness-v1.10-integrity.yml                    │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Component Responsibilities

| Component | Responsibility | v1.10 Action |
|-----------|---------------|--------------|
| `docs/admin-setup-macos/` | Per-admin-guide numbered sequence for macOS ADE config | ADD `10-kerberos-sso-extension.md`; possibly ADD `11-graph-api-platform-credential.md` (see gray area) |
| `docs/operations/` | Cross-platform operational depth (domain-organized subtrees: co-management, patch-mgmt, app-lifecycle, drift-migration, apple-business) | Possible new subtree for Graph-API doc if Option B chosen |
| `docs/l2-runbooks/` | Technical investigation runbooks, globally numbered cross-platform | ADD `28-macos-kerberos-sso-investigation.md`; ADD `29-macos-graph-credential-investigation.md` |
| `docs/_glossary-macos.md` | macOS terminology, term-per-H3, reciprocal see-also pattern | ADD Kerberos SSO Extension entry; ADD Platform Credential Graph API entry (if warranted) |
| `docs/reference/macos-capability-matrix.md` | Feature parity table, pre-edit anchor inventory required | ADD Kerberos SSO Extension row; pre-edit anchor inventory artifact required before edits |
| `docs/admin-setup-macos/08-auth-methods-deep-dive.md` | NUAL + auth method deep-dive | SURGICAL EDIT: NUAL Settings Catalog table — add verified plist key literals once confirmed |
| `docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md` | Legacy SSO migration + Kerberos coexistence note | SURGICAL EDIT: replace deferred-item note at `## Kerberos SSO Extension (Coexistence)` with forward link to guide 10 |
| `scripts/validation/` | Per-phase validators, milestone harness, chain-apex | ADD v1.10 harness files; ADD check-phase-83..NN.mjs; EXTEND `_lib/frozen-at-close.mjs` (V19 SHA entry) |
| `docs/index.md`, `docs/l1-runbooks/00-index.md`, `docs/l2-runbooks/00-index.md` | Navigation hubs (append-only invariant) | EXTEND macOS sections last (navigation-last convention) |

---

## Recommended Project Structure

### New Files to Create

File names follow existing conventions exactly:

- Admin guides: zero-padded two-digit prefix; current highest is 09; next free is 10 (Kerberos) and 11 (Graph API if option A).
- L2 runbooks: globally sequential; current highest confirmed by directory listing is 27 (`27-macos-sso-investigation.md`). Next free is 28 (Kerberos L2) and 29 (Graph API L2).
- No new L1 runbooks are strictly required for v1.10 — Kerberos and Graph API are L2-tier investigations; L1 escalation can route via the existing macOS SSO triage path if needed, or a minimal L1 cross-reference can be appended to existing L1 macOS SSO runbooks (#35/#36) without creating a new L1 file.

```
docs/
├── admin-setup-macos/
│   ├── 10-kerberos-sso-extension.md         [NEW — PSSO-FUT-04]
│   │       Full Kerberos SSO extension guide: realm config, on-prem AD
│   │       dependency, ticket lifecycle, `app-sso` Kerberos diagnostics,
│   │       MDM payload structure (Kerberos payload type vs Redirect),
│   │       Extension Identifier values, coexistence with Platform SSO.
│   │       Replaces the deferred-item note in guide 09 (Kerberos
│   │       Coexistence section) with a forward link.
│   │
│   └── [11-graph-api-platform-credential.md OR operations/ subtree]
│           [NEW — PSSO-FUT-02] — see gray-area analysis below.
│
└── [08-auth-methods-deep-dive.md]            [MODIFY — PSSO-FUT-01]
        NUAL Settings Catalog table: add verified MDM plist key literals
        for "New User Authorization Mode" and "User Authorization Mode"
        once confirmed from Apple com.apple.extensiblesso schema /
        Microsoft Learn Settings Catalog reference. Gate: do not edit
        unless key literals are verified — keep deferred note if not.

docs/l2-runbooks/
├── 28-macos-kerberos-sso-investigation.md   [NEW]
│       Kerberos SSO L2 investigation: ticket-granting failures,
│       realm-configuration errors, Kerberos extension log collection
│       (`app-sso kerberos -s`, Kerberos ticket cache inspection).
│       Prerequisite: macOS Log Collection (#10).
│
└── 29-macos-graph-credential-investigation.md   [NEW]
        Graph API Platform Credential L2 investigation: enumerate /
        query / delete a user's platformCredentialAuthenticationMethod
        registrations via Graph, interpret API errors, automation
        troubleshooting. Prerequisite: macOS Log Collection (#10).

scripts/validation/
├── v1.10-milestone-audit.mjs                [NEW — Path-A from v1.9]
├── v1.10-audit-allowlist.json               [NEW — Path-A sidecar]
├── check-phase-83.mjs                       [NEW — Phase 83 validator]
├── check-phase-84.mjs                       [NEW — Phase 84 validator]
├── check-phase-85.mjs                       [NEW — Phase 85 validator]
├── check-phase-86.mjs                       [NEW — chain-apex for v1.10]
│       (exact count finalized at roadmap; estimated 4–6 phases = 83–88)
└── [possible] check-phase-84-chain-health.mjs  [if chain-health phase added]

.github/workflows/
└── audit-harness-v1.10-integrity.yml        [NEW — 7th parallel coexistence]
```

### Existing Files to Surgically Modify

```
docs/admin-setup-macos/
├── 00-overview.md
│     EXTEND: Mermaid Setup Sequence diagram — add node 10 (Kerberos SSO
│     Extension) branching from node 9; add node 11 / operations link for
│     Graph API doc. Extend numbered bullet list accordingly.
│
├── 08-auth-methods-deep-dive.md
│     SURGICAL EDIT (NUAL key literals, PSSO-FUT-01):
│     Replace the deferred-item blockquote in ## NUAL > NUAL Settings
│     Catalog settings table with the confirmed MDM plist key literals.
│     GATE: only if key literals are verified from authoritative source;
│     if unverifiable, leave deferred note in place and close PSSO-FUT-01
│     as "kept-deferred with evidence".
│
└── 09-enterprise-sso-plugin-migration.md
      SURGICAL EDIT (Kerberos forward-link):
      Replace the deferred-item note at bottom of
      ## Kerberos SSO Extension (Coexistence) with:
      "For full Kerberos SSO extension configuration, see
      [Kerberos SSO Extension Guide](10-kerberos-sso-extension.md)."
      Keep the existing coexistence explanation intact — only the
      deferred-item sentence changes.

docs/_glossary-macos.md
      ADD: "Kerberos SSO Extension" term entry (new H3 under the
      existing ## Authentication section or appended to ## E). Pattern:
      term definition + > **Windows equivalent:** blockquote +
      > See also: cross-references to guide 10.
      ADD: "Platform Credential (Graph API)" entry if dedicated enough
      to warrant a standalone term, or extend the existing Platform SSO
      term with a See Also to the Graph-API doc.

docs/reference/macos-capability-matrix.md
      PRE-EDIT ANCHOR INVENTORY REQUIRED before any edits.
      ADD: Kerberos SSO Extension row under ## Authentication or a new
      ## SSO Extensions section. Link to guide 10.
      EXISTING anchor inventory: run grep on all ## headings and existing
      anchor IDs before editing; record in a phase plan artifact
      (this is the PITFALL-6 / DA-4 convention from Phase 63 Plan 63-05).

docs/l2-runbooks/00-index.md
      EXTEND ## macOS ADE Runbooks table: add rows for #28 (Kerberos)
      and #29 (Graph API). Add escalation mapping rows for both.
      NAVIGATION-LAST: this edit happens in the same phase as or after
      nav hub integration.

docs/index.md
      EXTEND ## macOS Provisioning > Admin Setup: add row for guide 10
      (and guide 11 / Graph-API doc location). Add row to Desktop
      Engineering (L2) table for L2 #28 and #29.
      NAVIGATION-LAST: this is the final edit in v1.10 content phases.

docs/l1-runbooks/00-index.md
      EXTEND ## macOS ADE Runbooks: add L2 #28/#29 cross-reference or
      escalation note if an L1 touch-point is warranted. Low-change edit.

docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md
      (See surgical edit above — replace deferred-item note only.)

scripts/validation/_lib/frozen-at-close.mjs
      EXTEND MILESTONE_CLOSE_SHAS: add V19 entry with v1.9 close-gate SHA.
      The v1.9 close-gate SHA is the commit that delivered
      v1.9-MILESTONE-AUDIT.md + 4-doc traceability closure (equiv to
      v1.8's Commit B / v1.7's 4df3a16). Identify via:
        git log --all --grep="close-gate" --grep="v1.9" --all-match -1
      ADD export: readAtV19Close = (p) => readAtClose('V19', p)
      This must be done BEFORE authoring check-phase-83.mjs.
```

---

## Architectural Patterns

### Pattern 1: Kerberos Guide Placement — Extend the Admin Setup Numbered Sequence

**What:** `docs/admin-setup-macos/10-kerberos-sso-extension.md` continues the established zero-padded numeric sequence. The Kerberos SSO extension is a macOS admin-setup topic: it requires an MDM configuration profile, has a realm-config Intune path, and is the operational partner to the Platform SSO setup guides (07–09). It belongs in the same admin-setup-macos/ tree at the next free number.

**Why this is unambiguous:** The deferred-cleanup file (`v1.9-DEFERRED-CLEANUP.md` PSSO-FUT-04) specifies "New `docs/admin-setup-macos/10-kerberos-sso-extension.md`" explicitly. Guide 09 already names `10-kerberos-sso-extension.md` as the proposed filename in its deferred-item note. The Kerberos guide is structurally peer to guide 09 (which covers the Microsoft Enterprise SSO plug-in) and should sit at the same level.

**Confidence:** HIGH — mandated by deferred-cleanup backlog, corroborated by guide 09's existing forward reference naming the exact file.

### Pattern 2: L2 Kerberos Runbook Number — 28 is the Next Free Slot

**What:** L2 runbooks are globally numbered across all platforms. Direct inspection of `docs/l2-runbooks/` confirms the highest existing file is `27-macos-sso-investigation.md`. The next free L2 number is 28. The Kerberos L2 runbook becomes `28-macos-kerberos-sso-investigation.md`.

**Triage tree / nav hub edit locations for L2 #28:**
- `docs/l2-runbooks/00-index.md` ## macOS ADE Runbooks: add row for #28 (and escalation mapping).
- `docs/index.md` ## macOS Provisioning > Desktop Engineering (L2) table: add row for #28.
- No dedicated macOS SSO triage tree exists at this level — `docs/decision-trees/06-macos-triage.md` is the macOS ADE triage tree. Add a Kerberos SSO extension leaf node to this tree routing to L2 #28.

**For the Graph API L2 runbook:** If Option A (admin-setup-macos/11) is chosen, Graph API L2 = #29. If Option B (operations subtree) is chosen, the number assignment is the same (#29), only the primary doc location differs. The L2 runbook itself always lives in `docs/l2-runbooks/` regardless.

**Confidence:** HIGH — verified by directory listing of l2-runbooks/.

### Pattern 3: Graph-API Doc Placement — GRAY AREA — Two Options

**This is the primary architectural decision for v1.10.**

The `platformCredentialAuthenticationMethod` Graph API resource is a programmatic management surface — distinct from portal-based admin setup (guides 07–10) or end-user device workflows. The suite currently has no dedicated "programmatic API" documentation tree. Two options:

**Option A: `docs/admin-setup-macos/11-graph-api-platform-credential.md`**

Rationale for:
- The Platform Credential managed via Graph is the same object as the Secure Enclave credential managed via the Intune portal. An admin reading guide 08 (Auth Methods Deep-Dive) naturally wants programmatic management as the next guide.
- Keeps the complete macOS Platform SSO documentation surface in one numbered sequence (07–11). Discoverable from `00-overview.md` and from the macOS Admin Setup nav hub row.
- The deferred-cleanup file (PSSO-FUT-02) says "A new advanced section in `08-auth-methods-deep-dive.md` **or a dedicated Graph-API operations doc**" — a standalone guide at 11 satisfies the "dedicated" variant without modifying guide 08.
- Precedent: guide 09 (Enterprise SSO Plug-in & Migration) is also a narrowly scoped operational topic sitting alongside setup guides.

Rationale against:
- Graph API access requires different tooling (Graph Explorer, PowerShell SDK, REST client) and a different audience (DevOps / automation engineer) vs portal-based admin. Mixing programmatic and portal-based guidance in the admin-setup tree may confuse the audience.
- If future milestones add other Graph-side management guides (e.g., device lifecycle automation, conditional-access automation), a dedicated operations subtree would be the right home; starting that subtree now is cleaner than retrofitting later.

**Option B: `docs/operations/platform-credential/00-graph-api.md` (new subtree)**

Rationale for:
- The `docs/operations/` tree is the established home for cross-portal, programmatic, and lifecycle-operations content (co-management, drift-migration, app-lifecycle). Graph API management is operationally closer to "drift detection + lifecycle automation" than to "Intune portal admin setup".
- Creates a natural expansion point if future milestones add other programmatic macOS or cross-platform Graph-API management guides.
- The `docs/operations/00-index.md` already shows the append-only H2 section pattern (6th H2 = Apple Business Governance). A 7th H2 ("Platform Credential Management") follows the same pattern.

Rationale against:
- The existing operations subtrees are cross-platform (co-management covers Windows + macOS; app-lifecycle covers 4 platforms). A macOS-specific Graph API guide in operations is a narrow outlier.
- The deferred-cleanup file (PSSO-FUT-02) scoped this as "Platform Credential management" and cited it alongside Kerberos and NUAL in a macOS Platform SSO context — placement in admin-setup-macos is more consistent with that framing.
- Creates a new subtree directory (`docs/operations/platform-credential/`) for a single file, which is over-structure for v1.10 scope.

**Recommendation: Option A** (admin-setup-macos/11), with the explicit caveat that if `/adversarial-review` is invoked at roadmap time and surfaces a strong argument for Option B, the guidance here should yield. The key determining factors are: (1) Is the primary audience for this doc an automation engineer or an Intune admin? If automation engineer, Option B is stronger. (2) Does the project anticipate multiple Graph-API management docs in v1.11+? If yes, Option B seeds the right tree. At v1.10 scope alone, Option A is simpler.

**Recommendation confidence: MEDIUM** — both options are architecturally defensible. Flag for adversarial-review if the roadmap author wants coverage.

### Pattern 4: Pre-Edit Anchor Inventory for Capability Matrix Edits

**What:** Before editing `docs/reference/macos-capability-matrix.md`, a plan artifact must record all existing `## Heading` anchors in the file. This is the PITFALL-6 / DA-4 convention first operationalized in Phase 63 Plan 63-05 (commit `65f8a55`) for `ios-capability-matrix.md`.

**When to use:** Every capability matrix edit in v1.10 (adding Kerberos SSO Extension rows). The pre-edit anchor inventory is a one-time read: grep all `## ` headings and the file's existing anchor IDs, record them in the phase plan, then proceed with edits.

**Why critical:** The `docs/reference/4-platform-capability-comparison.md` uses sibling-anchor-pin links to capability matrices. Adding a new `## Authentication` H2 or a new row under an existing H2 in the macOS capability matrix may shift existing anchor targets if heading text changes. The pre-edit inventory detects this risk before it becomes a broken-link regression.

### Pattern 5: Guide 09 Surgical Edit — Replace Only the Deferred-Item Note

**What:** `docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md` at `## Kerberos SSO Extension (Coexistence)` (line ~148) contains: "A full Kerberos SSO extension configuration guide (payload walkthrough, Extension Identifier values, profile structure) is deferred to a future documentation phase -- see PSSO-FUT-04 in the v1.9 deferred-cleanup tracking."

This one sentence is the only change needed in guide 09. The rest of the section (coexistence rationale, Extension Identifier separation, parallel-operation explanation) is accurate and complete — it stays unchanged.

**Replacement text:** Replace the deferred-item sentence with a forward link: "For the full Kerberos SSO extension configuration guide (payload walkthrough, Extension Identifier values, profile structure), see [Kerberos SSO Extension Guide](10-kerberos-sso-extension.md)."

**Confidence:** HIGH — the exact text to be replaced is confirmed at guide 09 line ~148.

### Pattern 6: Harness Lineage Bump — Path-A v1.9 → v1.10 (8th Milestone)

**What:** v1.10 is the 8th milestone in the Path-A lineage: v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7 → v1.8 → v1.9 → v1.10. The harness close phase follows the two-atomic-commit pattern established in v1.7 Phase 70 and confirmed through v1.9 Phase 82:

- Atom 1 (harness scaffold): `v1.10-milestone-audit.mjs` + `v1.10-audit-allowlist.json` + BASELINE_14 comment in `regenerate-supervision-pins.mjs` — 3 files indivisible.
- Atom 2 (validators + CI): `check-phase-83..NN.mjs` (one per v1.10 phase) + `audit-harness-v1.10-integrity.yml` + `_lib/frozen-at-close.mjs` (V19 SHA entry) — indivisible set.

**Critical pre-condition:** V19 (v1.9 close-gate SHA) must be pinned in `_lib/frozen-at-close.mjs` BEFORE any check-phase-83.mjs is authored. The v1.9 close-gate SHA is in the commit that delivered `v1.9-MILESTONE-AUDIT.md` + the 4-doc traceability closure (equiv to `4df3a16` in v1.7 / Commit B in v1.8 / commit `b29dca5` per PROJECT.md v1.9 footer).

**PRE-EXISTING-CHAIN-RED-AT-HEAD-01 watch item:** The validator chain is RED at v1.9 close HEAD (10 legacy FAILs in check-phase-{58,59,60,61,62,63,64,65,66,73}). The harness-close phase must either: (a) include a chain-health sub-phase to convert the failing validators to frozen-aware reads (RETRO-class fix, ~1 phase, 2-4 plans), or (b) explicitly route the red chain forward with a documented rationale. Decision is at roadmap; if a chain-health pass is included, it becomes a distinct phase BEFORE the harness lineage bump (so the chain-apex can run clean before Atom 1 is authored). If routed forward, the 10 FAILs persist into v1.10's apex run, which is acceptable as a known-pre-existing state but degrades the "exit 0" invariant for the apex.

---

## Data Flow

### Cross-Link Topology for v1.10 Content

```
docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md
  ## Kerberos SSO Extension (Coexistence) [surgical edit]
    -- forward link --> 10-kerberos-sso-extension.md

docs/admin-setup-macos/10-kerberos-sso-extension.md  [NEW]
    -- back-link   --> 09-enterprise-sso-plugin-migration.md
    -- link        --> docs/_glossary-macos.md#kerberos-sso-extension
    -- link        --> docs/reference/macos-capability-matrix.md#[kerberos-anchor]
    -- escalation  --> docs/l2-runbooks/28-macos-kerberos-sso-investigation.md

docs/l2-runbooks/28-macos-kerberos-sso-investigation.md  [NEW]
    -- back-link   --> 10-kerberos-sso-extension.md
    -- prerequisite--> docs/l2-runbooks/10-macos-log-collection.md

docs/admin-setup-macos/[11 or operations/]  [NEW — Graph API doc]
    -- link        --> docs/_glossary-macos.md#platform-credential-graph-api (if entry added)
    -- link        --> 08-auth-methods-deep-dive.md (back-reference to Secure Enclave context)
    -- escalation  --> docs/l2-runbooks/29-macos-graph-credential-investigation.md

docs/l2-runbooks/29-macos-graph-credential-investigation.md  [NEW]
    -- back-link   --> [Graph API doc location]
    -- prerequisite--> docs/l2-runbooks/10-macos-log-collection.md

docs/admin-setup-macos/08-auth-methods-deep-dive.md
  ## NUAL [surgical edit — plist key literals if verified]
    -- no new cross-links, in-place table update only

docs/_glossary-macos.md
    ADD: Kerberos SSO Extension entry (## Authentication section)
    <- referenced from <- 10-kerberos-sso-extension.md

docs/reference/macos-capability-matrix.md
    ADD: Kerberos SSO Extension row [pre-edit anchor inventory first]
    <- linked from <- 10-kerberos-sso-extension.md
    -- sourced by --> docs/reference/4-platform-capability-comparison.md
       (if Kerberos SSO Extension row is macOS-specific, the 5-platform
        comparison doc gets a "macOS only" / "n/a" verdict in other columns)

docs/admin-setup-macos/00-overview.md
    EXTEND: Mermaid + bullet list to include guide 10 (and 11 if Option A)

docs/l2-runbooks/00-index.md
    EXTEND: ## macOS ADE Runbooks table — rows 28 + 29 + escalation mapping

docs/index.md
    EXTEND: macOS Admin Setup table (guide 10/11 row)
             Desktop Engineering (L2) table (L2 #28/#29 rows)
  [NAVIGATION-LAST — these edits happen in the final content phase]
```

### Recommended Phase / Build Order

Dependencies flow from foundation upward. Navigation-last convention holds: `docs/index.md` and hub file edits are the last content deliverable before harness close.

**Phase 83 — Foundation: Kerberos SSO Extension Guide + Guide 09 Surgical Edit**
- Deliverables: `10-kerberos-sso-extension.md` (new); guide 09 Kerberos Coexistence section (surgical edit: replace deferred-item note with forward link); `00-overview.md` (extend Mermaid + bullet list for guide 10); glossary entry for Kerberos SSO Extension in `_glossary-macos.md`.
- Rationale: The Kerberos guide is the largest new content file. Guide 09 edit closes the forward-reference. Glossary entry must exist before capability matrix cross-links are added. Overview update ensures discoverability from the admin setup entry point.
- check-phase-83.mjs asserts: `10-kerberos-sso-extension.md` exists; guide 09 no longer contains the deferred-item text; `00-overview.md` contains "10-kerberos-sso-extension"; glossary contains "Kerberos SSO Extension" entry.

**Phase 84 — Graph API Platform Credential Doc + NUAL Key Edit**
- Deliverables: Graph API doc (at location determined by Option A or B); guide 08 NUAL table surgical edit (if plist key literals are verified; else keep deferred note with updated verification date); glossary extension for Platform Credential Graph API (if warranted).
- Rationale: The Graph API doc is independent of the Kerberos guide. NUAL edit is minimal and can be bundled with the Graph API phase or kept separate if verification is still pending at execution time.
- check-phase-84.mjs asserts: Graph API doc exists at chosen path; guide 08 NUAL section updated (either new key literals present, or deferred note updated with 2026 verification attempt); `00-overview.md` updated if Option A chosen (guide 11 added).
- Research flag: If `platformCredentialAuthenticationMethod` is still in beta at execution time, route the Graph API doc to v1.11 and close PSSO-FUT-02 as "kept deferred" rather than shipping a doc about a beta API surface.

**Phase 85 — Capability Matrix + L2 Runbooks**
- Deliverables: Pre-edit anchor inventory artifact for `macos-capability-matrix.md`; Kerberos SSO Extension row added to matrix; `28-macos-kerberos-sso-investigation.md`; `29-macos-graph-credential-investigation.md`; `l2-runbooks/00-index.md` extended (rows 28 + 29 + escalation mapping).
- Rationale: Matrix edit requires anchor inventory first (Pattern 4). L2 runbooks reference admin guides (Phases 83/84). L2 index is an internal-to-runbooks hub — updated in this phase before the main nav hub.
- check-phase-85.mjs asserts: `28-` and `29-` files exist; `l2-runbooks/00-index.md` contains rows 28 and 29; `macos-capability-matrix.md` contains Kerberos SSO Extension row; anchor inventory artifact committed in this phase.

**Phase 86 — Nav Hub Integration + Harness Chain-Health Pass (if included)**
- Deliverables: `docs/index.md` macOS section extensions (admin setup + L2 rows); `common-issues.md` macOS section extension (Kerberos escalation entry); `quick-ref-l2.md` macOS section extension (Kerberos log commands).
- Optional sub-deliverable (if chain-health included): frozen-aware conversion of check-phase-{58,59,60,61,62,63,64,65,66,73}.mjs to eliminate the 10 pre-existing legacy FAILs; regenerate/restore `73-RETRO-INVENTORY.md`.
- Rationale: Nav hub edits are NAVIGATION-LAST per convention. Chain-health pass, if included, should precede the harness lineage bump phase so the apex exits clean before Atom 1 is authored.
- check-phase-86.mjs asserts: `docs/index.md` contains links to guide 10 and L2 #28/#29; `quick-ref-l2.md` updated; (if chain-health included) chain-apex exits 0 with 0 FAIL.

**Phase 87 — Harness Lineage Bump + Terminal Re-Audit + Milestone Close**
- Deliverables (Atom 1): `v1.10-milestone-audit.mjs` + `v1.10-audit-allowlist.json` + BASELINE_14 in `regenerate-supervision-pins.mjs` — 3 files indivisible.
- Deliverables (Atom 2): `check-phase-83..86.mjs` + `audit-harness-v1.10-integrity.yml` + `_lib/frozen-at-close.mjs` (V19 SHA entry) — indivisible set.
- Terminal re-audit: 3-axis stacking per v1.9 precedent (Axis 1 fresh-clone local, Axis 2 Linux GHA, Axis 3 fresh sub-agent).
- Close-gate: two-commit chicken-and-egg (Commit A SHA placeholder fill + Commit B MILESTONE-AUDIT.md NEW + DEFERRED-CLEANUP.md + 4-doc traceability closure).
- check-phase-87.mjs (chain-apex): CHAIN_PHASES=[48..86]; V-87-AUDIT-HARNESS asserts `v1.10-milestone-audit.mjs` exits 0; CHAIN_SKIP=new Set([]).

**Estimated phase count: 4–5 phases (83–86 or 83–87 depending on chain-health bundling)**

---

## Integration Points

### Cross-Link Edges with Integrity-Check Potential

These edges are candidates for per-phase validator assertions (extending the SSO-E1..E8 pattern from v1.9 check-phase validators):

| Edge ID | From | To | Direction |
|---------|------|----|-----------|
| KRB-E1 | `09-enterprise-sso-plugin-migration.md` (## Kerberos Coexistence) | `10-kerberos-sso-extension.md` | forward link (replaces deferred-item note) |
| KRB-E2 | `10-kerberos-sso-extension.md` | `09-enterprise-sso-plugin-migration.md` | back-link |
| KRB-E3 | `10-kerberos-sso-extension.md` | `_glossary-macos.md#kerberos-sso-extension` | outbound link |
| KRB-E4 | `_glossary-macos.md` (Kerberos entry) | `10-kerberos-sso-extension.md` | see-also |
| KRB-E5 | `10-kerberos-sso-extension.md` | `28-macos-kerberos-sso-investigation.md` | escalation link |
| KRB-E6 | `28-macos-kerberos-sso-investigation.md` | `10-kerberos-sso-extension.md` | back-link |
| GRA-E1 | `[Graph API doc]` | `08-auth-methods-deep-dive.md` | context link (Secure Enclave credential) |
| GRA-E2 | `[Graph API doc]` | `29-macos-graph-credential-investigation.md` | escalation link |
| GRA-E3 | `29-macos-graph-credential-investigation.md` | `[Graph API doc]` | back-link |

### Harness Lineage Bump: File Set (Path-A from v1.9)

| File | Action | Key Notes |
|------|--------|-----------|
| `scripts/validation/v1.10-milestone-audit.mjs` | NEW (Path-A from v1.9) | Inherit C1–C16 blocking checks verbatim; comment block updated to cite v1.10 lineage (8th Path-A milestone); sidecar reference → `v1.10-audit-allowlist.json`; v1.10-specific checks (KRB-E1..E6, GRA-E1..E3) added as new assertions |
| `scripts/validation/v1.10-audit-allowlist.json` | NEW (Path-A from v1.9) | `schema_version`, `generated`, `phase` fields updated; `c13_rotting_external` reset / seeded with new Microsoft Learn URLs from Guide 10 and Graph API doc |
| `scripts/validation/check-phase-83.mjs` | NEW | CHAIN_PHASES=[48..82]; HARNESS=`v1.9-milestone-audit.mjs` (predecessor-byte-unchanged); asserts Phase 83 Kerberos guide + guide 09 surgical edit + glossary |
| `scripts/validation/check-phase-84.mjs` | NEW | CHAIN_PHASES=[48..83]; asserts Phase 84 Graph API doc + NUAL table edit |
| `scripts/validation/check-phase-85.mjs` | NEW | CHAIN_PHASES=[48..84]; asserts Phase 85 capability matrix + L2 #28/#29 + l2-index |
| `scripts/validation/check-phase-86.mjs` | NEW | CHAIN_PHASES=[48..85]; asserts Phase 86 nav hub extensions (index.md, quick-ref-l2.md, common-issues.md); [optional: chain-health 0-FAIL assertion] |
| `scripts/validation/check-phase-87.mjs` | NEW (chain-apex) | CHAIN_PHASES=[48..86]; CHAIN_SKIP=new Set([]); V-87-AUDIT-HARNESS; V-87-SELF |
| `.github/workflows/audit-harness-v1.10-integrity.yml` | NEW | 7th parallel coexistence workflow; inherits: fetch-depth:0, autocrlf false, continue-on-error:false, 30-min timeout, weekly + quarterly crons |
| `scripts/validation/_lib/frozen-at-close.mjs` | EXTEND | Add `V19: '<v1.9-close-gate-SHA>'`; add `export const readAtV19Close = (p) => readAtClose('V19', p)` |

**Atomic commit pattern (per v1.9 Phase 82 precedent):**
- Atom 1: `v1.10-milestone-audit.mjs` + `v1.10-audit-allowlist.json` + BASELINE_14 in `regenerate-supervision-pins.mjs` — 3 files indivisible.
- Atom 2: `check-phase-83..87.mjs` + `audit-harness-v1.10-integrity.yml` + `_lib/frozen-at-close.mjs` V19 entry — indivisible set.

---

## Anti-Patterns

### Anti-Pattern 1: Editing the Capability Matrix Without the Pre-Edit Anchor Inventory

**What people do:** Open `macos-capability-matrix.md`, add a Kerberos SSO Extension row, commit.

**Why it's wrong:** `docs/reference/4-platform-capability-comparison.md` carries sibling-anchor-pin links to capability matrix anchors. Adding a new `## Authentication` sub-H2 or renaming an existing H2 shifts anchor targets. Without recording the pre-edit anchor state, it is impossible to verify whether the 4-platform comparison doc's links still resolve.

**Do this instead:** In the plan for Phase 85 (or whichever phase edits the capability matrix), the first task is to grep all `## ` headings in `macos-capability-matrix.md` and record them as a named artifact (e.g., `85-ANCHOR-INVENTORY.md`). Only then proceed with row additions. The check-phase-85.mjs validator should assert this artifact exists.

### Anti-Pattern 2: Editing Guide 09 Beyond the Single Deferred-Item Sentence

**What people do:** Use the "update guide 09" task as an opportunity to expand the Kerberos Coexistence section with additional content, since guide 10 is now being authored.

**Why it's wrong:** Guide 09's Kerberos section is complete and correct — the coexistence rationale, Extension Identifier separation, and parallel-operation explanation are accurate. The only content gap was the deferred forward-reference. Expanding beyond that single sentence risks duplicating content between guide 09 and guide 10, creating two canonical sources for coexistence mechanics.

**Do this instead:** Replace exactly one sentence (the deferred-item note). Leave the rest of the section byte-unchanged. Guide 10 is the canonical reference for Kerberos configuration; guide 09 is the canonical reference for coexistence with Platform SSO.

### Anti-Pattern 3: Authoring the Graph API Doc Before Confirming GA Status

**What people do:** Author `11-graph-api-platform-credential.md` (or equivalent) based on current `platformCredentialAuthenticationMethod` Graph API documentation without confirming whether it is GA or still in beta/preview.

**Why it's wrong:** The project has an established "keep deferred rather than ship a guessed or beta surface" doctrine (PROJECT.md v1.9 plan-time research flags). A doc for a beta API becomes stale on the GA date and may describe endpoints/schemas that change. Worse, an admin acting on a preview-API doc in production may encounter breaking changes.

**Do this instead:** Verify GA/stable status before the Graph API doc phase executes. If `platformCredentialAuthenticationMethod` is still preview at Phase 84 execution time, close PSSO-FUT-02 as "kept deferred, API not GA" rather than shipping the doc. The research phase should surface GA status; if inconclusive, this is a plan-time blocker for Phase 84.

### Anti-Pattern 4: Skipping Navigation-Last Order

**What people do:** Update `docs/index.md` in the same commit as the Kerberos guide (guide 10), to save a phase.

**Why it's wrong:** The navigation-last convention exists across all prior milestones (v1.2–v1.9). Nav hub files (`docs/index.md`, `common-issues.md`, `quick-ref-l1/l2.md`) link to content that must already exist before the link is committed. A nav hub linking to a file that does not yet exist passes no check but creates a broken-link window. The convention ensures that any execution failure in a content phase does not leave the nav hub with dangling links.

**Do this instead:** Nav hub edits happen in the last content phase (Phase 86 in this structure), after all new files (guides 10/11, L2 #28/#29) are confirmed committed.

### Anti-Pattern 5: Folding Chain-Health Pass Into the Harness Lineage Bump Atom

**What people do:** Include the frozen-aware conversion of legacy validators (check-phase-{58–66,73}) inside the harness lineage bump Atom 2 commit.

**Why it's wrong:** The Atom 2 invariant is "check-phase-83..87 + CI workflow + frozen-at-close.mjs V19 — indivisible." Adding 10 legacy validator rewrites to that atom breaks indivisibility and makes the commit non-reviewable as a single unit. If any one legacy validator rewrite fails, the entire atom fails.

**Do this instead:** If a chain-health pass is included in v1.10, it must be a separate phase (e.g., Phase 86a or a standalone Phase before 87) with its own phase validators. The harness Atom 2 then contains only the v1.10-new harness files.

---

## Sources

- Direct inspection: `docs/admin-setup-macos/` — 10 files (00-overview.md Mermaid structure through 09-enterprise-sso-plugin-migration.md Kerberos Coexistence section line ~148 confirmed)
- Direct inspection: `docs/l2-runbooks/` directory listing — highest file confirmed `27-macos-sso-investigation.md`; `00-index.md` macOS section confirmed
- Direct inspection: `docs/operations/00-index.md` — 5 H2 subtrees confirmed (co-management, patch-management, app-lifecycle, drift-migration, apple-business governance); structure verified
- Direct inspection: `docs/_glossary-macos.md` — existing ## Authentication section confirmed (Platform SSO + Secure Enclave entries); Kerberos SSO Extension mentioned in Enterprise SSO Plug-in entry but no standalone term
- Direct inspection: `docs/reference/macos-capability-matrix.md` — ## Authentication section confirmed added in v1.9; 8 rows confirmed; Kerberos SSO Extension absent (new in v1.10)
- Direct inspection: `docs/index.md` — macOS Provisioning section structure confirmed; L2 #27 SSO Investigation row confirmed at line 123
- Direct inspection: `scripts/validation/` directory listing — v1.9 harness files (`v1.9-milestone-audit.mjs`, `v1.9-audit-allowlist.json`, `check-phase-75..82.mjs`) confirmed; `audit-harness-v1.9-integrity.yml` confirmed (6 CI workflows total)
- `.planning/milestones/v1.9-DEFERRED-CLEANUP.md` — PSSO-FUT-01/02/04 deferred backlog items with "where it belongs when resolved" guidance; PRE-EXISTING-CHAIN-RED-AT-HEAD-01 (10 FAILs in check-phase-{58–66,73}) confirmed
- `.planning/PROJECT.md` — v1.10 milestone framing; Phase 83+ numbering; PRE-EXISTING-CHAIN-RED-AT-HEAD-01 harness-close watch item; navigation-last convention across all milestones; pre-edit anchor inventory convention (Phase 63 Plan 63-05 DA-4 reference)

---

*Architecture research for: v1.10 Platform SSO follow-ons — Kerberos guide + Graph API doc + NUAL key edit + harness lineage bump integration into existing macOS Intune documentation suite*
*Researched: 2026-06-22*
