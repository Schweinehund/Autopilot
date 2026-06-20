# Architecture Research

**Domain:** Documentation information architecture — Platform SSO + Secure Enclave integration into an existing macOS Intune documentation suite
**Researched:** 2026-06-20
**Confidence:** HIGH (grounded in direct file inspection of all named integration points)

---

## Standard Architecture

### System Overview

The existing documentation suite uses a layered hub-and-spoke architecture. Content is organized by function tier (admin setup / lifecycle / runbooks / reference / nav hubs) and connected by bidirectional cross-links. Every layer that touches macOS must be updated when a new macOS feature ships.

```
┌─────────────────────────────────────────────────────────────────────┐
│                      NAVIGATION HUBS (append-only)                  │
│  docs/index.md  |  docs/common-issues.md  |  quick-ref-l1/l2.md    │
├─────────────────────────────────────────────────────────────────────┤
│                   ADMIN SETUP GUIDES (numbered)                      │
│  docs/admin-setup-macos/00-overview.md  (Mermaid sequence diagram)  │
│  01-abm  02-enrollment  03-config-profiles  04-app  05-compliance   │
│  06-config-failures   [NEW 07-platform-sso-setup.md]               │
│                        [NEW 08-auth-methods-deep-dive.md]           │
│                        [NEW 09-enterprise-sso-plugin-migration.md]  │
├─────────────────────────────────────────────────────────────────────┤
│                  LIFECYCLE NARRATIVE (extend in-place)              │
│  docs/macos-lifecycle/00-ade-lifecycle.md  (7-stage)               │
│             Stage 4: Setup Assistant  -- SSO extension profile      │
│             Stage 6: Company Portal   -- Entra device registration  │
│             Stage 7: Ongoing MDM      -- SSO key operation          │
├─────────────────────────────────────────────────────────────────────┤
│               L1 / L2 RUNBOOKS (next sequential numbers)            │
│  docs/l1-runbooks/35-macos-sso-sign-in-failure.md   [NEW]          │
│  docs/l1-runbooks/36-macos-secure-enclave-key.md    [NEW]          │
│  docs/l2-runbooks/27-macos-sso-investigation.md     [NEW]          │
├─────────────────────────────────────────────────────────────────────┤
│                  REFERENCE LAYER (surgical extensions)              │
│  docs/reference/macos-capability-matrix.md  -- auth rows added      │
│  docs/reference/4-platform-capability-comparison.md  -- macOS cells │
├─────────────────────────────────────────────────────────────────────┤
│                    GLOSSARY LAYER (reciprocal)                       │
│  docs/_glossary-macos.md  -- 3 new entries + see-also              │
│  docs/_glossary.md        -- reciprocal see-also only              │
├─────────────────────────────────────────────────────────────────────┤
│               VALIDATION / HARNESS LAYER (lineage bump)             │
│  scripts/validation/v1.9-milestone-audit.mjs   (Path-A from v1.8)  │
│  scripts/validation/v1.9-audit-allowlist.json  (sidecar)           │
│  scripts/validation/check-phase-75.mjs ... check-phase-NN.mjs      │
│  .github/workflows/audit-harness-v1.9-integrity.yml                │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Recommended Project Structure

### New Files to Create

All proposed names follow existing conventions exactly: admin guides use zero-padded two-digit prefixes continuing from 07, L1 runbooks use next sequential numbers after 34 (`34-apple-business-shared-ipad-passcode-reset.md`), L2 runbooks use next sequential number after 26 (`26-apple-business-permission-denied.md`).

```
docs/
├── admin-setup-macos/
│   ├── 07-platform-sso-setup.md
│   │       Full admin setup guide: Intune Settings Catalog paths,
│   │       Entra ID prerequisites, device registration, SSO extension
│   │       configuration profile. Replaces the 12-line stub at
│   │       03-configuration-profiles.md lines 157-168.
│   │
│   ├── 08-auth-methods-deep-dive.md
│   │       All three auth methods: Secure Enclave key (hardware-backed,
│   │       T2/Apple Silicon gate), Password sync, Smart card.
│   │       Secure Enclave architecture, attestation, FileVault context.
│   │       Method comparison matrix.
│   │
│   └── 09-enterprise-sso-plugin-migration.md
│           Legacy Microsoft Enterprise SSO plug-in (Kerberos / redirect
│           SSO) coverage. When-to-use-which comparison vs Platform SSO.
│           Migration path for mixed fleets.
│
├── l1-runbooks/
│   ├── 35-macos-sso-sign-in-failure.md
│   │       Sign-in failure after Platform SSO enrollment. L1-executable
│   │       portal steps. Explicit escalation triggers to L2 #27.
│   │
│   └── 36-macos-secure-enclave-key.md
│           Secure Enclave key verification + Company Portal interaction
│           failures. L1-executable steps. Escalation to L2 #27.
│
└── l2-runbooks/
    └── 27-macos-sso-investigation.md
            Full investigation guide: log collection paths for SSO,
            key attestation verification, Entra device registration
            investigation. Prerequisite: macOS Log Collection (#10).

scripts/validation/
├── v1.9-milestone-audit.mjs              Path-A copy from v1.8
├── v1.9-audit-allowlist.json             Path-A sidecar from v1.8
├── check-phase-75.mjs                    Phase 75 deliverable validator
├── check-phase-76.mjs                    Phase 76 deliverable validator
├── ...                                   one per v1.9 phase (75..NN)
└── check-phase-NN.mjs                    chain-apex (CHAIN_PHASES=[48..NN-1])

.github/workflows/
└── audit-harness-v1.9-integrity.yml      sixth parallel coexistence CI workflow
```

### Existing Files to Surgically Extend

These files require targeted edits, not rewrites. The append-only and sibling-anchor-pin conventions constrain what changes.

```
docs/admin-setup-macos/
├── 00-overview.md
│     EXTEND: add guides 07/08/09 to Mermaid Setup Sequence diagram
│     and to the numbered bullet list. Update "6-guide" language to
│     "9-guide" (or "6 core guides + 3 Platform SSO guides").
│
└── 03-configuration-profiles.md
      EXTEND: ## Extensible SSO section (lines 157-168).
      Current 12-line stub ends with "See official Microsoft documentation."
      Replace that sentence with an intra-suite link to 07-platform-sso-setup.md.
      Keep the 2-paragraph orientation summary; do not expand inline.

docs/macos-lifecycle/
└── 00-ade-lifecycle.md
      EXTEND Stage 4 "Watch Out For": add SSO extension profile timing pitfall
        (profile must arrive before user attempts first sign-in).
      EXTEND Stage 6 "What Happens": add Entra device registration via
        Platform SSO (device key bound to Entra at Company Portal sign-in).
      EXTEND Stage 7 "Watch Out For": add SSO key expiry / re-attestation note.
      EXTEND Stage Summary Table: add SSO pitfall column entries for stages 4/6/7.

docs/reference/
├── macos-capability-matrix.md
│     EXTEND ## Configuration: update "Platform SSO" row (currently one-cell)
│       to add anchor-friendly H2 note for link-not-copy surface.
│     ADD ## Authentication section with rows:
│       - Auth method: Secure Enclave key | Password sync | Smart card
│       - Hardware gate: T2 chip / Apple Silicon required for Secure Enclave
│       - macOS version gate: 14 (Sonoma) minimum for Platform SSO
│       - Entra ID P1/P2 license requirement
│
└── 4-platform-capability-comparison.md
      EXTEND ## Configuration: update macOS "Platform SSO" cell from current
        single-word verdict to "Supported (macOS 14+)" linking to
        macos-capability-matrix.md#authentication (sibling-anchor pin).
      All other platform columns: "Not supported" or "n/a".

docs/
├── _glossary-macos.md
│     ADD ## Authentication H2 section (new section, appended after existing
│     ## App Protection (MAM) section) with three entries:
│       - Platform SSO
│       - Secure Enclave
│       - Enterprise SSO Plug-in (Microsoft)
│     Each entry follows the established pattern:
│       term definition + > **Windows equivalent:** blockquote
│       + > See also: links to related terms + cross-platform glossaries.
│
├── _glossary.md
│     EXTEND: reciprocal see-also only (no new primary definitions).
│     Pattern: inside existing Entra ID or SSO-adjacent term blockquotes,
│     append "> See also: [Platform SSO](_glossary-macos.md#platform-sso) (macOS)."
│
├── index.md
│     EXTEND ## macOS Provisioning > Admin Setup table: add rows for 07/08/09.
│     EXTEND ## macOS Provisioning > Service Desk (L1) table: add rows for #35/#36.
│     EXTEND ## macOS Provisioning > Desktop Engineering (L2) table: add row for #27.
│
├── common-issues.md
│     EXTEND ## macOS ADE Failure Scenarios: add SSO sign-in failure entry
│       routing to L1 #35 and L2 #27. Append-only -- do not reorder existing entries.
│
├── quick-ref-l1.md
│     EXTEND ## macOS ADE Quick Reference: add SSO-specific escalation trigger
│       (Secure Enclave key error at sign-in → L1 #36; sign-in loop → L1 #35).
│
└── quick-ref-l2.md
      EXTEND ## macOS ADE Quick Reference: add SSO log paths (system.log
        SSO subsystem, ssoextension logs) and key attestation command.

docs/l1-runbooks/
└── 00-index.md
      EXTEND ## macOS ADE Runbooks table: add rows 35 and 36.

docs/l2-runbooks/
└── 00-index.md
      EXTEND ## macOS ADE Runbooks table: add row 27.
      EXTEND macOS L1 Escalation Mapping table: map L1 #35/#36 → L2 #27.

scripts/validation/_lib/frozen-at-close.mjs
      EXTEND MILESTONE_CLOSE_SHAS: add V18 entry with v1.8 close-gate SHA.
      ADD export: readAtV18Close convenience function.
      (Identify v1.8 close-gate SHA from the commit that delivered
       v1.8-MILESTONE-AUDIT.md + 4-doc traceability closure -- equivalent
       role to v1.7's 4df3a16 per the two-commit chicken-and-egg pattern.)
```

---

## Architectural Patterns

### Pattern 1: Admin Guide Numbering (Zero-Padded Sequential)

**What:** Each admin guide in `docs/admin-setup-macos/` uses a two-digit zero-padded numeric prefix (01-06). The overview is always 00. New guides append at the next available number.

**When to use:** All new admin-setup-macos content. Current highest is 06 (`06-config-failures.md`). Platform SSO setup guide = 07, auth-methods deep-dive = 08, legacy plug-in + migration = 09.

**Why 3 files, not 1:** The existing pattern separates admin setup how-to from reference deep-dives from failure references. `03-configuration-profiles.md` covers Wi-Fi/VPN/FileVault mechanics. `05-compliance-policy.md` is compliance-only. `06-config-failures.md` is a reverse-lookup table. Platform SSO warrants the same separation: the setup guide (07) covers the Intune click-path; the auth deep-dive (08) covers architecture and method comparison (different primary audience: architect or senior admin); the migration doc (09) covers the legacy-to-modern transition path (audience: admin managing a mixed fleet). Forcing all three into 07 would violate the single-responsibility pattern established across 01-06 and create a file that serves no single audience well.

**Example (00-overview.md Mermaid extension):**
```
graph LR
  A[1. ABM] --> B[2. Enrollment Profile]
  B --> C[3. Config Profiles]
  B --> D[4. App Deployment]
  B --> E[5. Compliance]
  C --> F[6. Config Failures]
  C --> G[7. Platform SSO Setup]
  G --> H[8. Auth Methods Deep-Dive]
  G --> I[9. Enterprise SSO Plugin Migration]
  D --> F
  E --> F
```

### Pattern 2: L1/L2 Runbook Sequential Numbering (Global, Cross-Platform)

**What:** Runbooks are globally sequentially numbered across all platforms. Last L1 runbook: #34 (`34-apple-business-shared-ipad-passcode-reset.md`). Last L2 runbook: #26 (`26-apple-business-permission-denied.md`). New runbooks take the next available number in each tier.

**Proposed assignment:**
- L1 #35: `35-macos-sso-sign-in-failure.md`
- L1 #36: `36-macos-secure-enclave-key.md`
- L2 #27: `27-macos-sso-investigation.md`

**Trade-offs:** Global numbering creates a collision risk only if phases execute in parallel. Because v1.9 uses sequential-on-main-tree execution (confirmed by `.planning/PROJECT.md` `use_worktrees:false` constraint), there is no collision risk within v1.9.

### Pattern 3: Glossary Reciprocal See-Also Convention

**What:** Every glossary term with a cross-platform equivalent carries a `> See also:` line inside the term's blockquote. `_glossary-macos.md` and `_glossary.md` cross-reference each other. The pattern is established at `_glossary-macos.md` lines 26-28 (Account-Driven User Enrollment), lines 33-35 (ADE), lines 44-47 (Await Configuration).

**When to use:** All three new glossary entries.
- Platform SSO: cross-references Entra ID SSO / Hybrid Join concepts in `_glossary.md` (if entries exist); note Windows equivalent is "None direct — closest is Entra ID-joined device SSO via Windows Hello for Business"
- Secure Enclave: cross-references TPM in `_glossary.md` (closest Windows analog for hardware-backed key storage)
- Enterprise SSO Plug-in: macOS-specific; no direct Windows equivalent; reciprocal see-also not needed in `_glossary.md`

### Pattern 4: Link-Not-Copy for Capability Matrix Integration

**What:** `docs/reference/4-platform-capability-comparison.md` carries verdict words linked to the sibling per-platform matrix via anchor, never duplicating prose. Confirmed by `4-platform-capability-comparison.md` lines 23-31: every cell is `Verdict -- [matrix](macos-capability-matrix.md#anchor)`.

**When to use:** When adding Platform SSO auth-method rows to `macos-capability-matrix.md`, also add corresponding cells in the 5-platform comparison using the same link-not-copy pattern pointing to `macos-capability-matrix.md#authentication`. The existing "Platform SSO" row in `macos-capability-matrix.md ## Configuration` (confirmed present) must be updated to carry the anchor so the comparison doc can reference it.

### Pattern 5: Frozen-Aware SHA-Pinned Helpers for v1.9 Chain Validators

**What:** `scripts/validation/_lib/frozen-at-close.mjs` exports `MILESTONE_CLOSE_SHAS` and `readAtClose()`. Per-phase validators that need to assert against milestone-close state use `readAtClose('V17', path)` or the convenience export `readAtV17Close`. Introduced v1.7 to fix SCOPE-GAP-61. The file currently has: V141, V15, V16, V17, V17_CLOSEGATE.

**When to use:** v1.9 chain validators asserting "v1.8 content is byte-unchanged" must use `readAtV18Close` via the same helper. The next entry to add is `V18: '<v1.8-close-gate-SHA>'` plus `export const readAtV18Close = (p) => readAtClose('V18', p)`.

**Implementation note for roadmap:** The v1.8 close-gate SHA is the commit that delivered `v1.8-MILESTONE-AUDIT.md` + 4-doc traceability closure. This is equivalent to `4df3a16` for v1.7 (labeled `V17_CLOSEGATE`). The roadmap harness lineage bump phase must include a concrete task: identify and pin `V18` before authoring `check-phase-75.mjs`.

---

## Data Flow

### Cross-Link Topology for Platform SSO Content

```
docs/admin-setup-macos/03-configuration-profiles.md (## Extensible SSO)
    -- outbound link --> 07-platform-sso-setup.md

docs/admin-setup-macos/07-platform-sso-setup.md
    -- see-also --> 08-auth-methods-deep-dive.md
    -- see-also --> 09-enterprise-sso-plugin-migration.md
    -- link      --> docs/_glossary-macos.md#platform-sso
    -- link      --> docs/reference/macos-capability-matrix.md#authentication
    -- link      --> docs/macos-lifecycle/00-ade-lifecycle.md#stage-4

docs/macos-lifecycle/00-ade-lifecycle.md (Stage 4 / Stage 6 / Stage 7)
    -- outbound link --> 07-platform-sso-setup.md

docs/_glossary-macos.md (## Authentication section)
    -- reciprocal see-also --> docs/_glossary.md (Entra / TPM terms)
    <- referenced from <- 07, 08, 09 guides

docs/reference/macos-capability-matrix.md (## Authentication)
    <- facts from <- 07 + 08
    -- sourced by --> docs/reference/4-platform-capability-comparison.md
       (link-not-copy: "Supported -- [matrix](macos-capability-matrix.md#authentication)")

docs/l1-runbooks/35-macos-sso-sign-in-failure.md
docs/l1-runbooks/36-macos-secure-enclave-key.md
    -- escalation --> docs/l2-runbooks/27-macos-sso-investigation.md
    <- escalation routing <- docs/decision-trees/06-macos-triage.md (extend)

docs/l2-runbooks/27-macos-sso-investigation.md
    -- back-link --> L1 #35 / L1 #36 (source runbooks)
    -- prerequisite --> docs/l2-runbooks/10-macos-log-collection.md

docs/l1-runbooks/00-index.md  (## macOS ADE Runbooks rows 35, 36)
docs/l2-runbooks/00-index.md  (## macOS ADE Runbooks row 27 + escalation mapping)
docs/index.md                 (## macOS Provisioning all three tables)
docs/common-issues.md         (## macOS ADE Failure Scenarios)
docs/quick-ref-l1.md          (## macOS ADE Quick Reference)
docs/quick-ref-l2.md          (## macOS ADE Quick Reference)
    <- all receive append-only additions pointing to 07/08/09 and 35/36/27
```

### Recommended Phase / Build Sequence

Dependencies flow strictly from foundation upward. Each phase produces complete, committable deliverables that later phases reference.

**Phase 75 — Foundation: Glossary + Lifecycle Extensions**
- Deliverables: `_glossary-macos.md` (## Authentication with Platform SSO, Secure Enclave, Enterprise SSO Plug-in entries); `_glossary.md` (reciprocal see-also); `00-ade-lifecycle.md` Stage 4/6/7 extensions
- Rationale: Glossary terms must exist before admin guides link to them. Lifecycle extensions are self-contained surgical edits that do not depend on runbooks.
- check-phase-75.mjs asserts: new glossary H2 present, three terms defined, lifecycle doc modified (word-count increase or heading presence).

**Phase 76 — Admin Setup Core: Platform SSO Setup Guide**
- Deliverables: `07-platform-sso-setup.md` (full admin setup); `00-overview.md` extended (Mermaid + bullet list); `03-configuration-profiles.md` ## Extensible SSO stub replaced with link
- Rationale: The setup guide (07) is the primary admin deliverable. It depends on glossary terms (Phase 75) and is referenced by Phase 77 deep-dive.
- check-phase-76.mjs asserts: 07 exists, 00-overview.md contains "07-platform-sso-setup", 03-configuration-profiles.md contains link to 07.

**Phase 77 — Admin Setup Depth: Auth Methods + Legacy Migration**
- Deliverables: `08-auth-methods-deep-dive.md`; `09-enterprise-sso-plugin-migration.md`
- Rationale: These docs reference 07 (Phase 76). Auth deep-dive is referenced by capability matrix (Phase 78).
- check-phase-77.mjs asserts: 08 and 09 exist; each references 07 in See Also.

**Phase 78 — Reference Integration: Capability Matrix + 5-Platform Comparison**
- Deliverables: `macos-capability-matrix.md` ## Authentication section added; `4-platform-capability-comparison.md` macOS cells updated (link-not-copy); `macos-capability-matrix.md ## Configuration` Platform SSO row updated with anchor
- Rationale: Capability matrix synthesizes facts from admin guides (Phases 76/77). 5-platform comparison depends on matrix.
- check-phase-78.mjs asserts: `## Authentication` heading present in macos-capability-matrix.md; comparison doc macOS Platform SSO cell contains link to macos-capability-matrix.md#authentication.

**Phase 79 — L1/L2 Runbooks**
- Deliverables: L1 `35-macos-sso-sign-in-failure.md`; L1 `36-macos-secure-enclave-key.md`; L2 `27-macos-sso-investigation.md`; `l1-runbooks/00-index.md` extended; `l2-runbooks/00-index.md` extended
- Rationale: Runbooks reference the admin guides (Phases 76/77) and glossary (Phase 75). They are referenced by nav hubs (Phase 80). L2 #27 must reference L1 #35 and #36 as source escalation paths.
- check-phase-79.mjs asserts: files 35, 36, 27 exist; l1-index contains rows 35 and 36; l2-index contains row 27 and updated escalation mapping.

**Phase 80 — Nav Hub Integration**
- Deliverables: `docs/index.md` macOS section extensions; `common-issues.md` macOS section extension; `quick-ref-l1.md` macOS section extension; `quick-ref-l2.md` macOS section extension; `decision-trees/06-macos-triage.md` SSO leaf nodes added
- Rationale: Nav hubs are append-only; they can only link to what already exists (Phases 75-79). Decision tree extension routes to L1 #35 and #36.
- check-phase-80.mjs asserts: index.md contains link to 07-platform-sso-setup; quick-ref-l1.md contains link to #35; common-issues.md updated.

**Phase 81 — Harness Lineage Bump (Atom 1 + Atom 2)**
- Deliverables (Atom 1 commit): `v1.9-milestone-audit.mjs` + `v1.9-audit-allowlist.json` + BASELINE comment in `regenerate-supervision-pins.mjs` -- three files indivisible
- Deliverables (Atom 2 commit): `check-phase-75..80.mjs` + `audit-harness-v1.9-integrity.yml` + `_lib/frozen-at-close.mjs` (V18 SHA entry) -- indivisible per v1.8 Phase 74 Atom 2 precedent
- Rationale: Harness is authored last so it can validate all content phases. `frozen-at-close.mjs` V18 entry required before chain validators can assert predecessor-byte-unchanged invariant.
- check-phase-81.mjs (chain-apex): CHAIN_PHASES=[48..80]; V-81-AUDIT-HARNESS asserts `v1.9-milestone-audit.mjs` exits 0; V-81-SELF asserts CHAIN_SKIP is empty Set.

**Terminal re-audit (Phase 82 close-gate):**
- 3-axis stacking per v1.8 precedent: Axis 1 fresh-clone local, Axis 2 cross-OS Linux GHA, Axis 3 fresh sub-agent
- `v1.9-MILESTONE-AUDIT.md` + `v1.9-DEFERRED-CLEANUP.md` + 4-doc traceability closure (PROJECT.md + REQUIREMENTS.md + ROADMAP.md + STATE.md)
- Two-commit chicken-and-egg: Commit A (SHA placeholder fill) + Commit B (MILESTONE-AUDIT.md NEW + 4-doc finalize)

---

## Integration Points

### Cross-Link Surfaces with Integrity Check Potential

C16 (introduced Phase 62) asserts a 4-edge cross-link integrity triangle for Apple Business content. For v1.9, the Platform SSO content creates an analogous surface. The per-phase validators should assert the following edges exist:

| Edge ID | From | To | Direction |
|---------|------|----|-----------|
| SSO-E1 | `07-platform-sso-setup.md` | `_glossary-macos.md#platform-sso` | outbound link |
| SSO-E2 | `_glossary-macos.md` | `07-platform-sso-setup.md` | reciprocal see-also |
| SSO-E3 | `07-platform-sso-setup.md` | `macos-capability-matrix.md#authentication` | outbound link |
| SSO-E4 | `macos-capability-matrix.md` | `07-platform-sso-setup.md` | See Also |
| SSO-E5 | `35-macos-sso-sign-in-failure.md` | `27-macos-sso-investigation.md` | escalation link |
| SSO-E6 | `27-macos-sso-investigation.md` | `35-macos-sso-sign-in-failure.md` | back-link |
| SSO-E7 | `03-configuration-profiles.md` (## Extensible SSO) | `07-platform-sso-setup.md` | outbound link |
| SSO-E8 | `00-ade-lifecycle.md` (Stage 4) | `07-platform-sso-setup.md` | outbound link |

Whether the roadmap encodes these as a named C17 harness check (parallel to C16) is a Phase 81 decision. At minimum, the per-phase validators for Phases 76-79 should assert the specific edges relevant to each phase's deliverables.

### Harness Lineage Bump: File Set (Path-A from v1.8)

Following the v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7 → v1.8 Path-A convention (six milestones, confirmed by `scripts/validation/` directory listing and `v1.8-milestone-audit.mjs` comment block), v1.9 requires these files named exactly as follows:

| File | Action | Key Notes |
|------|--------|-----------|
| `scripts/validation/v1.9-milestone-audit.mjs` | NEW (Path-A copy of v1.8) | Inherits C1-C16 blocking checks verbatim; comment block updated to cite v1.9 lineage; sidecar reference updated to `v1.9-audit-allowlist.json`; C17 (if added) new here |
| `scripts/validation/v1.9-audit-allowlist.json` | NEW (Path-A copy of v1.8) | `schema_version`, `generated`, `phase` fields updated; `c13_rotting_external` reset for v1.9 (if Platform SSO admin guides include external Microsoft Learn links, seed c13 with those URLs) |
| `scripts/validation/check-phase-75.mjs` | NEW | CHAIN_PHASES=[48..74]; HARNESS=`v1.8-milestone-audit.mjs` (predecessor-byte-unchanged); asserts Phase 75 glossary + lifecycle deliverables |
| `scripts/validation/check-phase-76.mjs` | NEW | CHAIN_PHASES=[48..75]; asserts Phase 76 admin guide 07 deliverables |
| `scripts/validation/check-phase-77.mjs` | NEW | CHAIN_PHASES=[48..76]; asserts Phase 77 guides 08 + 09 deliverables |
| `scripts/validation/check-phase-78.mjs` | NEW | CHAIN_PHASES=[48..77]; asserts capability matrix ## Authentication + comparison doc cells |
| `scripts/validation/check-phase-79.mjs` | NEW | CHAIN_PHASES=[48..78]; asserts L1 #35, #36, L2 #27, runbook index rows |
| `scripts/validation/check-phase-80.mjs` | NEW | CHAIN_PHASES=[48..79]; asserts nav hub extensions (index.md, common-issues.md, quick-ref-l1/l2.md) |
| `scripts/validation/check-phase-81.mjs` | NEW (chain-apex) | CHAIN_PHASES=[48..80]; CHAIN_SKIP=new Set([]); V-81-AUDIT-HARNESS asserts `v1.9-milestone-audit.mjs` exits 0; V-81-SELF asserts CHAIN_PHASES excludes 81 |
| `.github/workflows/audit-harness-v1.9-integrity.yml` | NEW | Sixth parallel coexistence workflow; path-filter scoped to `v1.9-*` and v1.9 milestone artifacts; inherits: `fetch-depth: 0`, `core.autocrlf false`, `continue-on-error: false`, `timeout-minutes: 30`, `CHAIN_TIMING_LINUX` notice, weekly Monday cron + quarterly cron |
| `scripts/validation/_lib/frozen-at-close.mjs` | EXTEND | Add `V18: '<v1.8-close-gate-SHA>'` to `MILESTONE_CLOSE_SHAS`; add `export const readAtV18Close = (p) => readAtClose('V18', p)` |

**Atomic commit pattern (per v1.8 Phase 74 precedent):**
- Atom 1 commit: `v1.9-milestone-audit.mjs` + `v1.9-audit-allowlist.json` + BASELINE_13 comment in `regenerate-supervision-pins.mjs` -- 3 files indivisible
- Atom 2 commit: `check-phase-75..81.mjs` + `audit-harness-v1.9-integrity.yml` + `_lib/frozen-at-close.mjs` (V18 SHA) -- indivisible set, delivered in Phase 81

---

## Scaling Considerations

This is a documentation architecture project. Scaling here means "how does this hold if additional SSO-adjacent features ship in v2.0+":

| Scenario | Architecture Impact |
|----------|---------------------|
| One more macOS auth feature | Append as `10-new-auth-feature.md`; L1 #37, L2 #28; identical pattern; no structural change needed |
| Auth runbooks exceed 2-3 L1 entries | Consider a `docs/decision-trees/10-macos-auth-triage.md` following the pattern of `06-macos-triage.md` but scoped to authentication failures |
| Windows gains Platform SSO equivalent | Add Windows SSO row to `macos-capability-matrix.md` and `4-platform-capability-comparison.md`; add primary definition to `_glossary.md`; add `> See also:` to `_glossary-macos.md` Platform SSO entry |
| v1.9 harness chain grows beyond ~35 validators | Existing `CHAIN_SKIP` infrastructure handles suppression; no structural change; execution time increases linearly (current chain is 26 validators at ~102s Windows / ~56s Linux per v1.8 data) |

---

## Anti-Patterns

### Anti-Pattern 1: Expanding the 03-configuration-profiles.md Stub Inline

**What people do:** Turn the 12-line ## Extensible SSO stub at `03-configuration-profiles.md` lines 157-168 into a full Platform SSO guide inline.

**Why it's wrong:** The existing file is 200 lines covering 9 profile types. Platform SSO setup requires Entra ID prerequisites, device registration steps, the SSO extension payload configuration, and auth-method selection -- content peer in depth to the entire existing guide. An inline expansion exceeds the single-responsibility scope of 03-configuration-profiles.md and makes it impossible for the nav hub to link at appropriate granularity.

**Do this instead:** Replace the "See official Microsoft documentation" sentence in the stub with "See [Platform SSO Setup](07-platform-sso-setup.md)" and keep the 2-paragraph orientation intact. The stub's job is orientation + pointer, not setup reference.

### Anti-Pattern 2: Combining 07 + 08 + 09 into One Mega-Guide

**What people do:** Put all Platform SSO content (setup, auth deep-dive, legacy migration) into a single `07-platform-sso-complete.md`.

**Why it's wrong:** The audience for admin setup (Intune admin clicking through Intune paths) differs from the audience for auth method comparison (architect choosing between Secure Enclave/Password sync/Smart card) and differs from the audience for legacy migration (admin managing a mixed fleet with existing Enterprise SSO plug-in). A single file serves none of them well. The `docs/index.md` macOS Admin Setup table links specific guides to specific "when to use" use cases -- a combined file cannot be linked at that granularity.

**Do this instead:** Three files (07/08/09) under ~400 lines each, each with a single-sentence "When to use this guide" opener.

### Anti-Pattern 3: Skipping the 00-overview.md Mermaid Update

**What people do:** Create 07/08/09 but omit updating `00-overview.md`.

**Why it's wrong:** `00-overview.md` is the documented starting point for macOS admin setup. The Mermaid diagram currently ends at node F (`[6. Config Failures]`). Admins starting at 00-overview.md will not discover 07/08/09 if it is not in the diagram and bullet list.

**Do this instead:** Treat 00-overview.md as a required deliverable in the same phase as guide 07. check-phase-76.mjs must assert that 00-overview.md contains the string "07-platform-sso-setup".

### Anti-Pattern 4: Rewriting Nav Hub Files Instead of Appending

**What people do:** Rewrite `docs/index.md`, `common-issues.md`, `quick-ref-l1.md`, or `quick-ref-l2.md` macOS sections to "clean them up" while adding Platform SSO entries.

**Why it's wrong:** These files have an established append-only H2 section convention confirmed across five prior milestones (v1.2 through v1.6). Rewrites risk breaking existing cross-links and create diff noise obscuring actual content additions.

**Do this instead:** Add new table rows only. Never change existing rows in these files as part of a feature-addition phase.

### Anti-Pattern 5: Authoring v1.9-milestone-audit.mjs Before Pinning the V18 SHA

**What people do:** Copy v1.8-milestone-audit.mjs to v1.9 and start authoring check-phase-75.mjs before identifying the v1.8 close-gate commit SHA.

**Why it's wrong:** check-phase-75.mjs (and all subsequent v1.9 chain validators) inherit the predecessor-byte-unchanged invariant. Any assertion that reads a frozen file via `readAtV18Close()` will throw at the `readAtClose()` call site if `V18` is absent from `MILESTONE_CLOSE_SHAS`. The first cross-OS Linux GHA run will fail even if local tests pass (if the SHA is guessed incorrectly, it fails on the Linux runner).

**Do this instead:** In the harness lineage bump phase (Phase 81), make the first task be: "identify v1.8 close-gate SHA from git log, verify it contains v1.8-MILESTONE-AUDIT.md + 4-doc traceability closure, add to frozen-at-close.mjs as V18." Then author the harness files.

---

## Sources

- Direct inspection: `docs/admin-setup-macos/` (all 7 files including 00-overview.md Mermaid structure and 03-configuration-profiles.md lines 157-168 stub)
- Direct inspection: `docs/_glossary-macos.md` (term structure, ## sections, blockquote pattern, version history)
- Direct inspection: `docs/reference/macos-capability-matrix.md` (6 H2 domains, Platform SSO row in ## Configuration confirmed)
- Direct inspection: `docs/reference/4-platform-capability-comparison.md` (link-not-copy cell architecture with sibling-anchor pins confirmed)
- Direct inspection: `docs/index.md` (macOS Provisioning section structure, Admin Setup / L1 / L2 table patterns)
- Direct inspection: `docs/l1-runbooks/00-index.md` (last runbook #34), `docs/l2-runbooks/00-index.md` (last runbook #26, macOS L1 Escalation Mapping pattern)
- Direct inspection: `docs/macos-lifecycle/00-ade-lifecycle.md` (7-stage pipeline, Stage 4 Setup Assistant, Stage 6 Company Portal, Stage 7 Ongoing MDM)
- Direct inspection: `scripts/validation/` directory listing (v1.4 through v1.8 lineage confirmed), `v1.8-milestone-audit.mjs` (C1-C16 blocking check set, sidecar reference), `v1.8-audit-allowlist.json` (schema_version 1.1, sidecar shape), `check-phase-74.mjs` (CHAIN_PHASES=[48..73], chain-apex structure, CHAIN_SKIP invariant), `check-phase-71.mjs` (CHAIN_PHASES pattern), `_lib/frozen-at-close.mjs` (MILESTONE_CLOSE_SHAS with V141/V15/V16/V17/V17_CLOSEGATE entries)
- Direct inspection: `.github/workflows/audit-harness-v1.8-integrity.yml` (5-job structure: parse + path-match + harness-run + linux-chain-ubuntu-latest + check-phase-71..74 individual jobs; fetch-depth:0 inheritance; autocrlf false; continue-on-error:false; weekly + quarterly crons)
- `.planning/PROJECT.md` (v1.9 milestone goal, Phase 75+ numbering, sequential-on-main-tree constraint, per-platform documentation pattern, v1.8 Path-A lineage precedent documentation)

---

*Architecture research for: Platform SSO + Secure Enclave integration into existing macOS Intune documentation suite*
*Researched: 2026-06-20*
