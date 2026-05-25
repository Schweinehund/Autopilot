# Phase 62: Apple Business Foundation & Rebrand — Research

**Researched:** 2026-05-21
**Domain:** Apple Business delegated governance — documentation authoring, glossary, role/permission model, OUs concept, audit harness scaffold (C14/C15/C16), `+` separator frontmatter parsing
**Confidence:** HIGH (all structural/architectural findings inherit from v1.5 precedents with HIGH confidence; per-permission enumeration MEDIUM pending manual scrape; C-check regex designs MEDIUM until tested against live corpus)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01: AB-07 admin-directory format**
Ship `docs/cross-platform/apple-business/_admin-directory.md` template file with `<TENANT_FILL_IN>` placeholders covering 4 backend types (AD/Entra group convention `apple-business-admins-{ou-slug}`; ServiceNow/Jira CMDB; Confluence/SharePoint; "no formal directory" fallback). File-level anchor target for Phase 65 L1 #34 cross-link. NOT embedded inside `02-ous-architecture.md`.

**D-02: AB-03 catalog scope**
FULL enumeration across all 7 in-scope subgroups (Basic Organization / Organization Access / API+OAuth / People / Devices / AppleCare / Apps & Books) via 1-hour manual scrape of Apple's JS-rendered permission sub-pages. Brand-related subgroups excluded with pointer. Edit-without-View dependency table in same file.

**D-03: C16 triangle landing strategy**
C16 lands BLOCKING in Phase 62 atomic harness commit, with new sidecar category `c16_missing_endpoint_exemptions` carrying 4 per-file exemption entries each with `sunset_phase` field. Phase 65 removes all 4 exemptions in same atomic commit as the missing endpoint files are created.

**D-04: Glossary bidirectional reciprocity**
`_glossary-apple-business.md` opens with a two-column rebrand-mapping table (columns: `Legacy term | New term (effective date) | Where used in v1.6 docs`). Per-entry H3 headers use CLEAN slugs only — NO "(formerly X)" suffixes. First-mention parentheticals appear in v1.6 new docs per v1.5 Linux convention.

**D-05: AB-06 count fix**
Patch REQUIREMENTS.md + ROADMAP.md + STATE.md from "5 existing platform glossaries" → "4 existing platform glossaries" INLINE during Phase 62 execution (same commit batch). `_glossary-apple-business.md` becomes the 5th glossary node counting from v1.6 forward.

### Claude's Discretion

None — every gray area was explicitly decided via referee verdict + user approval.

### Deferred Ideas (OUT OF SCOPE)

- Apple Business Device API public surface deep-dive (v1.7+)
- OU sub-OU nesting depth definitive verification (Phase 63 portal verification)
- Audit log retention SLA exact period (Phase 64 hedge language)
- Cross-OU audit visibility 3×3 matrix (Phase 64 deliverable)
- Apple TV Conference Room Display mode delegation specifics (Phase 63 deliverable)
- CI-1/CI-2/CI-3 rotting-reference corpus sweep (v1.7+)
- CI workflow `audit-harness-v1.6-integrity.yml` (Phase 66)
- BASELINE_10 refresh (Phase 66)

</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| AB-01 | Single glossary `_glossary-apple-business.md` with rebrand timing (2026-04-14 GA), terminology mappings, and bidirectional reciprocity | D-04 decision + rebrand-mapping table structure in §Glossary Skeleton |
| AB-02 | Role/permission overview doc covering 4 top-level roles + 5 preset custom roles + "Account Holder — DO NOT delegate" callout (OP-2) | §Per-Permission Catalog Scrape Mechanics + permission catalog row schema |
| AB-03 | Canonical per-permission catalog across 7 in-scope subgroups with Edit-without-View dependency table (OP-3) | §Per-Permission Catalog Scrape Mechanics; D-02 full enumeration decision |
| AB-04 | OUs concept doc: hierarchy rules, scoping table, Locations→OUs migration | §Architecture Patterns (OU scoping table pattern) |
| AB-05 | Rebrand statement at exactly 3 canonical sites; each containing 3 required tokens for C14 PASS | §C14 Rebrand-Statement Regex Design |
| AB-06 | 4 existing platform glossaries gain one reciprocal banner line; `_glossary-macos.md` ABM entry gains one inline see-also | D-05 count-fix context + banner line text in §Architecture Patterns |
| AB-07 | L1 admin-directory lookup convention published | D-01 decision + `_admin-directory.md` skeleton in §Architecture Patterns |
| AUDIT-09 | `v1.6-milestone-audit.mjs` ships as Path-A copy from v1.5 with C1-C13 preserved | §Atomic-Harness-Commit Packaging |
| AUDIT-10 | C14 (rebrand-statement) lands blocking from Phase 62 | §C14 Rebrand-Statement Regex Design |
| AUDIT-11 | C15 (Intune-delegation anti-pattern guard) lands blocking from Phase 62 | §C15 Banned-Phrase Regex Seed |
| AUDIT-12 | C16 (L1 #34 cross-link integrity triangle) lands blocking from Phase 62 | §C16 4-Edge Triangle Algorithm |
| AUDIT-13 | `check-phase-62.mjs` validator-as-deliverable ships in same atomic harness commit | §Atomic-Harness-Commit Packaging |

</phase_requirements>

---

## Summary

Phase 62 is the critical-path foundation phase for v1.6 — it establishes vocabulary, role/permission model, OUs architecture, 3 canonical rebrand callouts, and the audit harness scaffold before any downstream content phase runs. All 11 high-severity operational and doc-authoring pitfalls catalogued in PITFALLS.md require Phase 62 to ship its guardrails before they can be prevented in later phases. Phase 62 must ship a valid harness that immediately rejects bad content (C14/C15/C16 blocking-from-start, D-A9) while simultaneously exempting Phase 65 deliverables via `c16_missing_endpoint_exemptions` sidecar entries with `sunset_phase` annotations.

The primary execution risk is the **1-hour manual scrape** of Apple's JS-rendered permission sub-pages (7 in-scope subgroups × ~7 permissions each = ~50 rows). This is irreducible: the pages require browser execution to populate their permission tables. All other Phase 62 deliverables can proceed in parallel around it. The second risk is **anchor contamination** in existing glossaries — the pre-edit anchor inventory artifact (`62-ANCHOR-INVENTORY.md`) must be captured before any file edit, not after. The third risk is the **atomic harness commit**: all 6 components (harness + sidecar + two new sidecar categories + check-phase-62.mjs + `+` separator parsing) must land together or the harness will fail on first run.

**Primary recommendation:** Sequence Phase 62 work as: (1) planning-file count-correction patch first (D-05, isolated); (2) anchor inventory capture for all files-to-be-edited; (3) glossary authoring; (4) manual permission scrape + `01-role-permission-model.md`; (5) remaining content docs; (6) atomic harness commit LAST, validated to exit 0 before committing.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Terminology canon (glossary) | Documentation layer | Audit harness (C14 enforcement) | Glossary is the single source of truth; harness verifies it exists at right paths |
| Role/permission model doc | Documentation layer | — | Apple-side surface; documentation-only authoring |
| OUs concept + admin directory | Documentation layer | Phase 63 docs (cite it) | Phase 62 establishes foundation; Phase 63 consumes as prerequisite |
| Rebrand callout statements (3 sites) | Documentation layer | Audit harness (C14 blocking) | Author writes callouts; C14 enforces token presence |
| Reciprocal banner lines (4 glossaries) | Documentation layer | Pre-edit anchor inventory (safety) | Existing-file edits require anchor-preservation contract |
| Audit harness C14/C15/C16 | Validation tooling | sidecar JSON (exemptions) | harness is JS/Node, sidecar carries exemptions; exit-0 from atomic commit |
| `+` separator frontmatter parsing | Validation tooling | — | Embedded in harness; needed for Phase 65 L1 #34 compound `platform:` value |
| `check-phase-62.mjs` | Validation tooling | — | Validator-as-deliverable; asserts Phase 62 structural facts |
| Planning-file count-correction (D-05) | Planning layer | — | Not corpus; patch REQUIREMENTS.md + ROADMAP.md + STATE.md |

---

## Standard Stack

Phase 62 is a **documentation-only milestone** — no installable software stack. "Standard stack" here means the canonical sources and tooling conventions.

### Core Sources (for content authoring)

| Source | Article ID / Path | Purpose | Why Standard |
|--------|------------------|---------|--------------|
| Apple Business User Guide | `support.apple.com/guide/business/` | All new v1.6 Apple-side citations | New canonical post-rebrand URL path |
| Apple Business roles intro | `axm97dd59159` | Role/permission model root | Canonical Apple-side role page |
| Apple Business OUs | `axmfdbe2cb0d` | OU hierarchy + scoping | Canonical OU configuration page |
| Apple Business content tokens | `axme0f8659ec` | Content token model | Per-OU semantics source |
| Apple Business SCIM | `axm526a05814` | Federation + provisioning | SCIM endpoint surface |
| Apple Business rebrand banner | `axmd79d79dea` | Glossary timing reference | Official "ABM is now Apple Business" transition page |
| Apple Newsroom (2026-03-24) | apple.com/newsroom/2026/03/ | Rebrand announcement | Canonical announcement date; GA date 2026-04-14 |
| Microsoft Learn ADE tutorial | `tutorial-automated-ios` | Intune-side verbatim labels | Confirms "Apple VPP tokens" label UNCHANGED as of 2026-04-30 |

[VERIFIED: loaded from .planning/research/STACK.md + CONTEXT.md canonical_refs section]

### Tooling (audit harness)

| Tool | Version / Source | Purpose |
|------|-----------------|---------|
| `v1.5-milestone-audit.mjs` | Path-A copy source | Template for `v1.6-milestone-audit.mjs` (preserve C1-C13 verbatim) |
| `v1.5-audit-allowlist.json` | Sidecar schema precedent | `{file, line, reason}` shape + new `sunset_phase` field for `c16_missing_endpoint_exemptions` |
| `check-phase-61.mjs` | Path-A copy source | Template for `check-phase-62.mjs` assertions |
| Node.js built-in `fs` | Runtime (Node LTS) | Harness uses `readFileSync` only — no shell invocations |

[VERIFIED: read scripts/validation/v1.5-milestone-audit.mjs lines 1-100; check-phase-61.mjs lines 1-80]

---

## Architecture Patterns

### System Architecture Diagram

```
Phase 62 Execution Flow
=======================

[Planning files patch] --> D-05 count correction (REQUIREMENTS/ROADMAP/STATE)
        |
        v
[Anchor Inventory Capture] --> 62-ANCHOR-INVENTORY.md
  (pre-edit snapshot of _glossary-macos.md + 01-abm-configuration.md + 02-abm-token.md)
        |
        v
[Content Authoring Wave]
  +--> _glossary-apple-business.md (D-04: rebrand-mapping table at top + H3 clean slugs)
  +--> 00-overview.md (rebrand callout #1 + style-guide convention)
  +--> 01-role-permission-model.md (MANUAL SCRAPE: 7-subgroup catalog + dependency table)
  +--> 02-ous-architecture.md (flat-by-default + scoping table)
  +--> _admin-directory.md (D-01: 4-backend lookup template)
  |
  v
[Existing-File Surgical Edits]
  +--> 4x reciprocal banner lines (_glossary.md, _glossary-macos.md, _glossary-android.md, _glossary-linux.md)
  +--> 1x inline see-also (_glossary-macos.md ABM entry ~line 67)
  +--> 2x intro callouts (01-abm-configuration.md intro + 02-abm-token.md intro)
        |
        v
[Atomic Harness Commit] <-- ALL 6 components land together, harness exits 0
  +--> v1.6-milestone-audit.mjs (Path-A copy + C14/C15/C16 + '+' separator)
  +--> v1.6-audit-allowlist.json (new sidecar: c13_rotting_external + c16_missing_endpoint_exemptions)
  +--> check-phase-62.mjs (validator-as-deliverable)
```

### Recommended Project Structure

```
docs/cross-platform/apple-business/        (NEW -- first v1.6 tree)
├── 00-overview.md                          rebrand callout #1 + style-guide HTML comment convention
├── 01-role-permission-model.md             full 7-subgroup permission catalog + Edit-without-View table
├── 02-ous-architecture.md                  OU hierarchy rules + scoping table
└── _admin-directory.md                     tenant-fillable lookup template (D-01)

docs/
├── _glossary-apple-business.md            NEW 6th glossary node (D-04)
├── _glossary.md                            +1 reciprocal banner line (existing, surgical)
├── _glossary-macos.md                      +1 reciprocal banner line + 1 inline see-also (existing, surgical)
├── _glossary-android.md                    +1 reciprocal banner line (existing, surgical)
├── _glossary-linux.md                      +1 reciprocal banner line (existing, surgical)
├── admin-setup-macos/01-abm-configuration.md   rebrand callout #2 (intro section, surgical)
└── admin-setup-ios/02-abm-token.md             rebrand callout #3 (intro section, surgical)

scripts/validation/
├── v1.6-milestone-audit.mjs               Path-A copy + C14/C15/C16 + '+' separator parsing (ATOMIC)
├── v1.6-audit-allowlist.json              new sidecar (ATOMIC)
└── check-phase-62.mjs                     validator-as-deliverable (ATOMIC)

.planning/phases/62-.../
└── 62-ANCHOR-INVENTORY.md                 pre-edit anchor snapshot (created before any existing-file edits)
```

---

## Research Findings: Ten Specific Questions

### 1. Per-Permission Catalog Scrape Mechanics

**Context:** Apple's 11 subgroup permission sub-pages are JS-rendered and cannot be extracted via WebFetch. The full permission matrix is gated behind the Apple Business portal at `Access Management > Roles`. STACK.md confirms MEDIUM confidence for per-permission enumeration. D-02 mandates FULL enumeration of 7 in-scope subgroups via 1-hour manual scrape.

[VERIFIED: STACK.md §2.4 "full per-permission table for each subgroup: MEDIUM confidence — Apple's intro page lists categories but sub-page tables not extractable via WebFetch"]

**Recommended Row Schema for the Scrape Artifact:**

Each scraped permission maps to one row in `01-role-permission-model.md`'s permission table:

```
| subgroup | permission_name | scope | edit_vs_view | op1_whitelist_relevance | op3_dependency_notes | apple_url_anchor |
```

- **subgroup**: one of {Basic Organization, Organization Access, API+OAuth, People, Devices, AppleCare, Apps & Books}
- **permission_name**: verbatim Apple portal label (e.g., "Manage MDM Servers", "Reset Shared iPad Passcode")
- **scope**: {OU-scoped | tenant-wide | device-level | user-level}
- **edit_vs_view**: {View-only | Edit | Edit+View (paired) | Standalone}
- **op1_whitelist_relevance**: {DENY-by-default | conditionally-grant | always-grant} — OP-1 prevention flag
- **op3_dependency_notes**: companion View permission required (blank if standalone); e.g., "Requires 'View Devices'"
- **apple_url_anchor**: anchor fragment from Apple's intro page, if linkable; else "portal-only"

**7 In-Scope Subgroups — Known Permission Seeds (MEDIUM confidence from STACK.md §2.4):**

| Subgroup | Confirmed example permissions | Approx count | OP-1/OP-3 flag |
|----------|------------------------------|--------------|----------------|
| Basic Organization | View org profile; Edit org profile; Accept Terms of Service | ~3-5 | Accept T&S → DENY-by-default |
| Organization Access | View users; Edit users; Assign roles; Delete roles; Configure federated auth; Configure SCIM; Create/Edit/Delete OUs | ~7-9 | Delete OUs, Assign roles → DENY-by-default |
| API+OAuth | Generate Apple Business API tokens; Revoke API tokens | ~2-3 | Revoke → DENY-by-default |
| People | Create MAA; Edit MAA; Delete MAA; Reset MAA passwords; **Reset Shared iPad passcode**; Configure default username format | ~6-8 | Reset Shared iPad passcode → conditionally-grant (OP-11 prevention) |
| Devices | Add devices; Assign to MDM server; Reassign; Unassign; Release; **Manage MDM Servers**; Manage device suppliers; Upload via Configurator | ~8-10 | Manage MDM Servers → **DENY-by-default** (OP-1 critical) |
| AppleCare | View AppleCare entitlements; Submit AppleCare repair requests | ~2 | N/A |
| Apps & Books | View content tokens; Download content tokens; Purchase content; Assign content (device); Assign content (user); Reclaim licenses; View purchase history | ~7-8 | Download content tokens → conditionally-grant |

[ASSUMED: permission counts (3-10 per subgroup) are training-knowledge estimates; manual scrape will produce exact counts and official names]

**Known Cross-Subgroup Edit-without-View Dependencies (OP-3):**

The "Edit-without-View blank UI" symptom (OP-3) arises when an Edit permission is granted without its required companion View permission. Known pairs requiring documentation:

| Edit permission | Required companion View | Blank-UI symptom |
|----------------|------------------------|-----------------|
| Assign devices to MDM server | View Devices (Devices subgroup) | Devices tab shows empty list |
| Release devices | View Devices | Devices tab shows empty list |
| Assign content (device-licensed) | View content tokens (Apps & Books) | Apps & Books tab shows empty |
| Reclaim licenses | View purchase history (Apps & Books) | Can't see what to reclaim |
| Edit Managed Apple Accounts | View users (Organization Access) | People tab shows empty |
| Edit OUs | View OUs (Organization Access) | OU list shows empty |
| Configure SCIM provisioning | View federated auth status (Organization Access) | Federation settings blank |

[ASSUMED: specific companion-View pairs are training-knowledge synthesis; manual scrape + portal testing recommended to confirm all pairs]

**Known Cross-Subgroup Interaction: "Manage MDM Servers" + "Manage Devices" (OP-1)**

"Manage MDM Servers" in the Devices subgroup is a superprivilege that bundles 4 actions Apple doesn't separately gate in their UI: (a) Add MDM server, (b) Edit MDM server, (c) Assign devices to MDM server, (d) Download MDM server token. Sub-org admins legitimately need (c) but should never have (a). Since Apple bundles all 4 under one permission toggle, the **DENY-by-default** contract for "Manage MDM Servers" in all non-Account-Holder reference roles is the OP-1 prevention strategy. The custom-role authoring guide MUST call this out explicitly.

[CITED: PITFALLS.md OP-1 "Apple Business uses one privilege bundle ('Manage MDM Servers') to cover four distinct actions"]

---

### 2. C14 Rebrand-Statement Regex Design

**Context:** C14 checks 3 canonical sites for 3 required tokens: "Apple Business Manager", "Apple Business", "2026-04-14". The challenge is avoiding false-positives where a doc mentions "Apple Business" in passing but doesn't contain all 3 tokens as a structured rebrand callout.

**Recommended Implementation:**

C14 should perform a **token-set membership check within the first N lines** of each of the 3 canonical files, not a pattern match on a single line.

```javascript
// C14 implementation approach (pseudocode)
const C14_FILES = [
  'docs/cross-platform/apple-business/00-overview.md',
  'docs/admin-setup-macos/01-abm-configuration.md',
  'docs/admin-setup-ios/02-abm-token.md',
];

const C14_REQUIRED_TOKENS = [
  'Apple Business Manager',
  'Apple Business',
  '2026-04-14',
];

const C14_SCAN_LINES = 50; // scan first 50 lines only

function checkC14(fileContent) {
  const lines = fileContent.split('\n').slice(0, C14_SCAN_LINES);
  const window = lines.join('\n');
  const missing = C14_REQUIRED_TOKENS.filter(t => !window.includes(t));
  return { pass: missing.length === 0, missing };
}
```

**Why token-set-membership, not proximity:**

- Proximity (within N characters of each other) is fragile — a callout paragraph naturally spreads across 2-3 sentences.
- All 3 tokens must appear SOMEWHERE in the first 50 lines. That's the "structured rebrand callout" contract.
- A false-positive (doc mentions "Apple Business" generically in its overview without the other 2 tokens) is an authoring error that C14 correctly rejects — the author MUST add the date and legacy name.

**False-positive risk analysis:**

- "Apple Business" alone in a doc title: C14 rejects (correct — the date and legacy name are missing).
- "Apple Business Manager" in a historical reference without "2026-04-14": C14 rejects (correct — the callout is incomplete).
- All 3 tokens scattered across first 50 lines but unrelated: C14 passes (acceptable — the 50-line window is intentionally scoped to the intro/callout section; if all 3 appear there, the doc has a legitimate rebrand callout).

**Note on the 50-line window:** The 3 canonical sites add their rebrand callouts at the doc intro (lines 1-30 typically). 50 lines provides buffer without scanning the full document, which would create false-positive risk.

[ASSUMED: 50-line window is a design choice; corpus verification at Phase 62 execution should confirm it works for the actual callout placement]

---

### 3. C15 Banned-Phrase Regex Seed

**Context:** C15 guards against Intune-delegation anti-patterns leaking into Apple Business documentation. The risk is docs that blur the Apple-Business-vs-Intune boundary by using Intune RBAC language inside Apple Business runbooks.

**Core threat patterns from PITFALLS.md OP-10/CI-2/CI-3:**

- Using "Intune RBAC", "Intune roles", "Intune scope tags" as synonyms for Apple Business delegation
- Claiming Apple Business roles correspond 1:1 to Intune roles
- Using "delegated admin" language that confuses Apple-side and Intune-side permission surfaces

**Recommended 8-regex C15 banned-phrase list:**

```javascript
const C15_BANNED_PHRASES = [
  // OP-10 pattern: Intune-side permission label used as Apple-side label
  /\bIntune\s+(RBAC|role|scope\s+tag|admin\s+role)\b/i,

  // CI-2 pattern: delegated admin conflating surfaces
  /\bdelegated\s+admin\b.{0,60}\bIntune\b/i,

  // CI-3 pattern: "Apple Business role" described in Intune RBAC terms
  /\b(apple\s+business|apple\s+business\s+manager)\s+(role|privilege|permission)\b.{0,60}\bIntune\s+(role|RBAC)\b/i,

  // OP-10 extension: "Intune-side delegation" — the primary banned compound
  /\bIntune[-\s]side\b.{0,40}\b(delegat|RBAC|role\s+assign)/i,

  // Scope-boundary anti-pattern: claiming Intune controls Apple Business permissions
  /\bIntune\b.{0,40}\b(controls?|manages?|owns?)\b.{0,40}\b(Apple\s+Business|ABM)\b.{0,40}\bpermission/i,

  // Cross-surface conflation: "same as Intune" for Apple Business roles
  /\b(same\s+as|equivalent\s+to|maps\s+to)\s+Intune\s+(RBAC|role)/i,

  // Managed Apple ID conflation in new docs (CI-3 variant)
  /\bManaged\s+Apple\s+ID\b(?!.{0,80}(Microsoft Intune|Intune documentation|continues to use|formerly|legacy))/i,

  // Intune admin delegation for Apple surface
  /\bIntune\s+admin\b.{0,60}\b(Apple\s+Business|ABM|Organizational\s+Unit|content\s+token)/i,
];
```

**Allowlist exemption mechanism (Phase 64 `18-cross-org-boundary-cheat-sheet.md`):**

The cheat sheet explicitly compares Apple Business vs Intune surfaces — it will legitimately contain phrases C15 would flag. Exemptions live as HTML comments in the file:

```html
<!-- ABAUDIT-01: intentional Apple-Business-vs-Intune disambiguation table; C15 false-positive allowlisted -->
```

The harness reads these HTML comments and skips C15 checks for flagged lines/blocks per the v1.4.1 AEAUDIT-04 precedent.

**Regex design principles to avoid collisions with Phase 64 exemptions:**

- Use `.{0,40}` / `.{0,60}` as bounded wildcards (not `.*`) to prevent greedy cross-sentence matches
- Use `\b` word boundaries throughout
- Use case-insensitive mode (`/i`) for robustness
- Prefer compound-phrase patterns over single-word patterns ("Intune RBAC" not just "RBAC")

[CITED: PITFALLS.md OP-10 "Glossary entry for 'VPP location token' carries Intune-vs-Apple disambiguation"; CI-2/CI-3 in SUMMARY.md]
[ASSUMED: the 8 regex patterns are design-phase seeds; live-corpus refinement at Phase 66 AUDIT-14 will validate and extend them]

---

### 4. C16 4-Edge Triangle Algorithm

**Context:** C16 enforces the cross-link integrity triangle connecting L1 #34, the admin context doc, `common-issues.md`, and `quick-ref-l1.md`. At Phase 62 execution, none of the 4 endpoint files exist yet (they are Phase 64/65 deliverables). D-03 mandates C16 lands BLOCKING with a `c16_missing_endpoint_exemptions` sidecar that exempts the 4 missing endpoints until Phase 65.

**The 4 edges to enforce (once all endpoints exist):**

```
Edge 1: L1 #34 --> 12-shared-ipad-passcode-reset.md
  (L1 runbook cross-links to the admin-context canonical doc)

Edge 2: 12-shared-ipad-passcode-reset.md --> L1 #34
  (admin doc back-links to L1 runbook; bidirectional)

Edge 3: 12-shared-ipad-passcode-reset.md --> common-issues.md#apple-business-governance-failure-scenarios
  (admin doc cross-links to the hub's Apple Business H2)

Edge 4: common-issues.md --> quick-ref-l1.md#apple-business-quick-reference
  (hub routes to quick-ref card; quick-ref card routes back to L1 #34 closes the triangle)
```

**C16 Algorithm (pseudocode):**

```javascript
function checkC16(sidecar) {
  const exemptFiles = new Set(
    (sidecar.c16_missing_endpoint_exemptions || []).map(e => e.file)
  );

  const endpoints = {
    l1_34: 'docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md',
    admin_12: 'docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md',
    common_issues: 'docs/common-issues.md',
    quick_ref_l1: 'docs/quick-ref-l1.md',
  };

  const results = [];

  for (const [key, path] of Object.entries(endpoints)) {
    if (exemptFiles.has(path) || exemptFiles.has(path + '#...')) {
      results.push({ edge: key, status: 'EXEMPTED', sunset_phase: getSunsetPhase(sidecar, path) });
      continue;
    }

    const content = readFile(path);
    if (content === null) {
      results.push({ edge: key, status: 'FAIL', reason: 'file missing — not in exemptions' });
      continue;
    }

    // Verify the outbound cross-link exists
    const outbound = getRequiredOutboundLink(key, endpoints);
    if (!content.includes(outbound.anchor) && !content.includes(outbound.file)) {
      results.push({ edge: key, status: 'FAIL',
        reason: `missing outbound link to ${outbound.file}${outbound.anchor || ''}` });
    } else {
      results.push({ edge: key, status: 'PASS' });
    }
  }

  const failures = results.filter(r => r.status === 'FAIL');
  return { pass: failures.length === 0, results, failures };
}

function getRequiredOutboundLink(fromKey, endpoints) {
  // Edge map: which file must link to which target
  const edgeMap = {
    l1_34:         { file: endpoints.admin_12, anchor: '12-shared-ipad-passcode-reset' },
    admin_12:      { file: endpoints.l1_34,    anchor: '34-apple-business' },
    common_issues: { file: endpoints.quick_ref_l1, anchor: '#apple-business-quick-reference' },
    quick_ref_l1:  { file: endpoints.l1_34,    anchor: '34-apple-business' },
  };
  return edgeMap[fromKey];
}
```

**Link-presence detection method:** String inclusion check (`content.includes(linkTarget)`) where `linkTarget` is the relative file path or anchor fragment. This matches the v1.5 harness pattern (`readFileSync` + string operations only, no subprocess). Do NOT use anchor-existence check (which would require parsing the target file's headings) — checking that the link string exists in the source file is sufficient; the pre-edit anchor inventory (62-ANCHOR-INVENTORY.md) handles anchor-stability on the other end.

**Sample failure messages:**

```
C16 FAIL: docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md
  → missing outbound link to docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md
  → NOTE: This file is not in c16_missing_endpoint_exemptions — add exemption or fix the cross-link.

C16 FAIL: docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md
  → file missing — not in c16_missing_endpoint_exemptions
  → HINT: Add {"file": "docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md",
              "reason": "...", "sunset_phase": "64-65"} to v1.6-audit-allowlist.json
```

**C16 exemption validation:** The harness should also check that exemption entries have non-null `sunset_phase` values — to enforce that no exemption lives forever without a removal contract.

[CITED: 62-CONTEXT.md D-03 + <specifics> C16 4-edge triangle endpoints; ARCHITECTURE.md D-A9]
[ASSUMED: link-presence check implementation detail; exact anchor fragment strings TBD at authoring time]

---

### 5. `+` Separator Frontmatter Parsing

**Context:** Phase 65 L1 #34 uses `platform: ios+macos+shared-ipad`. The harness must split on `+` while preserving backward compatibility with `platform: ios`, `platform: macos`, `platform: all`, and other existing single-value platforms.

**Recommended Parser Implementation:**

```javascript
// Allowed platform atoms (extensible at Phase 66 C11 calibration)
const ALLOWED_PLATFORMS = new Set([
  'ios', 'macos', 'android', 'linux', 'windows', 'all',
  'shared-ipad', 'apple-tv', 'ipados', 'tvos',
  'apple-business',  // for governance-layer docs
]);

function parsePlatformValue(rawValue) {
  if (!rawValue) return { valid: false, atoms: [], error: 'missing platform value' };

  // Split on '+' and trim whitespace from each atom
  const atoms = rawValue.split('+').map(a => a.trim()).filter(Boolean);

  if (atoms.length === 0) return { valid: false, atoms: [], error: 'empty after split' };

  const invalidAtoms = atoms.filter(a => !ALLOWED_PLATFORMS.has(a));
  if (invalidAtoms.length > 0) {
    return { valid: false, atoms, error: `unknown platform atoms: ${invalidAtoms.join(', ')}` };
  }

  return { valid: true, atoms, compound: atoms.length > 1 };
}

// Backward-compatible: parsePlatformValue('ios') -> { valid: true, atoms: ['ios'], compound: false }
// New: parsePlatformValue('ios+macos+shared-ipad') -> { valid: true, atoms: ['ios','macos','shared-ipad'], compound: true }
// Error: parsePlatformValue('ios+notaplatform') -> { valid: false, ... }
```

**Harness integration point:** The `+` separator parsing extends the existing frontmatter validation (which currently checks for `platform:` presence in Apple Business docs). After parsing, the check should verify that compound-platform docs have `applies_to: governance` (or another Apple-Business-specific frontmatter field) to distinguish them from single-platform docs.

**Compatibility table:**

| Input value | Atoms | compound | Backward-compatible? |
|-------------|-------|----------|---------------------|
| `ios` | ['ios'] | false | YES — existing iOS docs unaffected |
| `macos` | ['macos'] | false | YES — existing macOS docs unaffected |
| `all` | ['all'] | false | YES — existing cross-platform docs unaffected |
| `ios+macos` | ['ios','macos'] | true | NEW — Phase 62 harness addition |
| `ios+macos+shared-ipad` | ['ios','macos','shared-ipad'] | true | NEW — Phase 65 L1 #34 target |
| `ios+notaplatform` | — | — | FAIL — caught by allowlist check |

[CITED: 62-CONTEXT.md D-A5 "NEW compound-platform frontmatter `platform: ios+macos[+shared-ipad|+apple-tv]`"]
[ASSUMED: `ALLOWED_PLATFORMS` set composition; Phase 66 C11 calibration will extend if needed]

---

### 6. Atomic-Harness-Commit Packaging

**v1.5 Plan 60-08 precedent:** Commit `c2abdd4` landed the v1.5 harness in one atomic commit. The v1.5 allowlist JSON, new sidecar categories, and the harness itself were all in the same commit, and the harness exited 0 immediately on that commit.

[VERIFIED: STATE.md line 135 "BASELINE_9 was refreshed at Phase 60 close (commit c2abdd4)"]

**Phase 62 atomic commit file list (ALL must land together):**

```
scripts/validation/v1.6-milestone-audit.mjs        (Path-A copy + C14/C15/C16 + '+' separator)
scripts/validation/v1.6-audit-allowlist.json        (new sidecar: c13_rotting_external + c16_missing_endpoint_exemptions)
scripts/validation/check-phase-62.mjs               (validator-as-deliverable)
```

The harness MUST exit 0 at the time of the commit. This means all C14/C15/C16 must either PASS (because Phase 62 content has landed before the harness commit) or be exempted in the sidecar (C16 exemptions for the 4 missing Phase 65 endpoints).

**Commit message template:**

```
feat(validation): atomic harness commit — v1.6-milestone-audit.mjs + C14/C15/C16 + check-phase-62.mjs

Lands v1.6 audit harness scaffold per v1.5 Plan 60-08 atomic-commit precedent.

Components (all in one commit, harness exits 0):
- v1.6-milestone-audit.mjs: Path-A copy from v1.5 + C14 (rebrand-statement blocking) +
  C15 (Intune-delegation anti-pattern guard blocking) + C16 (cross-link integrity triangle
  blocking) + '+' separator parsing for compound platform: frontmatter
- v1.6-audit-allowlist.json: new sidecar co-located with harness; adds c13_rotting_external
  (quarterly audit category for ~30 legacy ABM URL refs) + c16_missing_endpoint_exemptions
  (4 Phase-65 endpoint files, each with sunset_phase: '65')
- check-phase-62.mjs: validator-as-deliverable asserting Phase 62 structural facts
  (1 glossary + 4 banner lines + 1 inline see-also + 3 callout sites + harness + sidecar +
  2 new sidecar categories + check-phase-62.mjs itself + 4 new content docs in
  cross-platform/apple-business/)

Blocking-from-start: C14/C15/C16 reject bad content from Phase 1 (D-A9 contract).
C16 passes via c16_missing_endpoint_exemptions (sunset_phase: '65') until Phase 65
creates the 4 missing endpoints and removes the exemptions in its own atomic commit.

AUDIT-09 / AUDIT-10 / AUDIT-11 / AUDIT-12 / AUDIT-13
```

**Pre-commit validation checklist:**
1. `node scripts/validation/v1.6-milestone-audit.mjs` exits 0
2. `node scripts/validation/check-phase-62.mjs` exits 0
3. C14 PASS: all 3 canonical sites contain all 3 required tokens
4. C15 PASS: no banned phrases in v1.6 corpus (or allowlisted)
5. C16 PASS: all 4 missing endpoints are in `c16_missing_endpoint_exemptions` with `sunset_phase`
6. `+` separator: `parsePlatformValue('ios+macos+shared-ipad')` returns valid (unit test inside check-phase-62.mjs)

---

### 7. Pre-Edit Anchor Inventory Artifact Format

**Context:** PITFALL-6 mandates pre-edit anchor inventory before touching `_glossary-macos.md` (for reciprocal banner + inline see-also) and `01-abm-configuration.md` + `02-abm-token.md` (for intro callouts). The inventory proves that zero existing anchors shifted post-edit.

**Recommended format for `62-ANCHOR-INVENTORY.md`:**

```markdown
# Phase 62 Pre-Edit Anchor Inventory

**Captured:** 2026-05-21 (BEFORE any Phase 62 edits to existing files)
**Files inventoried:** 3 existing files receiving surgical edits in Phase 62
**Purpose:** PITFALL-6 anchor-stability surface — compare pre/post to verify zero anchor shift

## File 1: docs/_glossary-macos.md

**SHA (pre-edit):** `<sha256 or git hash>`
**Receiving:** 1 reciprocal banner line (top) + 1 inline see-also at ABM entry (~line 67)

### Alphabetical Index Anchors (line 16)

Pre-edit index line:
```
[ABM](#abm) | [ABM Token](#abm-token) | [Account-Driven User Enrollment](#account-driven-user-enrollment) | ...
```

Full anchor list:
- `#abm` (H3 line ~62)
- `#abm-token` (H3 line ~68)
- `#account-driven-user-enrollment` (H3 line ~22)
- `#ade` (H3 line ~29)
- `#apns` (H3 line ~74)
- `#await-configuration` (H3 line ~37)
- `#jailbreak-detection` (H3 line ~80)
- `#mam-we` (H3 line ~90)
- `#setup-assistant` (H3 line ~44)
- `#supervision` (H3 line ~50)
- `#vpp` (H3 line ~97)

**Permitted edits:** Banner line inserted BEFORE line 9 (or after YAML frontmatter); inline see-also appended to ABM entry's `> See also:` block. Zero H2/H3 headings renamed.

## File 2: docs/admin-setup-macos/01-abm-configuration.md

**SHA (pre-edit):** `<sha>`
**Receiving:** Rebrand callout #2 (intro section, prepended before existing H1 or as new intro section)

### H2/H3 Anchor List (pre-edit)
[executor fills from actual file scan]

**Permitted edits:** New content prepended to intro only. Zero existing headings renamed or removed.

## File 3: docs/admin-setup-ios/02-abm-token.md

**SHA (pre-edit):** `<sha>`
**Receiving:** Rebrand callout #3 (intro section)

### H2/H3 Anchor List (pre-edit)
[executor fills from actual file scan]

**Permitted edits:** New content prepended to intro only. Zero existing headings renamed or removed.

## Post-Edit Verification Checklist

- [ ] `_glossary-macos.md` anchor index line (line 16) unchanged byte-for-byte
- [ ] All 11 `_glossary-macos.md` H3 anchors present with zero slug changes
- [ ] `01-abm-configuration.md` all pre-edit H2/H3 anchors present post-edit
- [ ] `02-abm-token.md` all pre-edit H2/H3 anchors present post-edit
- [ ] `git diff --word-diff` shows ONLY additions (no modifications to existing heading text)
```

[CITED: STATE.md "PITFALL-6 pre-edit anchor inventory mandatory before any edit to existing capability matrices or hub files"]
[ASSUMED: exact line numbers are placeholders — executor reads actual files and fills them in]

---

### 8. `_glossary-apple-business.md` Structural Skeleton

**Based on:** D-04 (rebrand-mapping table at top, clean H3 slugs), v1.5 CLEAN-08 pattern, `_glossary-macos.md` alphabetical-index pattern (line 14-16).

**Frontmatter template:**

```yaml
---
last_verified: 2026-05-21
review_by: 2026-07-20
applies_to: apple-business
audience: all
platform: ios+macos
---
```

**Full structural skeleton:**

```markdown
> **Apple Business governance:** This glossary covers Apple Business delegated permission and
> governance terminology introduced with the 2026-04-14 Apple Business launch (formerly Apple
> Business Manager). For Apple platform provisioning terminology (ADE, Supervision, VPP, APNs,
> ABM), see the [Apple Provisioning Glossary](_glossary-macos.md).
>
> See also: [Windows Autopilot Glossary](_glossary.md) · [Android Enterprise Glossary](_glossary-android.md) · [Linux Provisioning Glossary](_glossary-linux.md)

# Apple Business Governance Glossary

## Rebrand Mapping Table

The following terms were renamed as part of Apple's 2026-04-14 rebrand of Apple Business Manager → Apple Business. Both old and new terms are searchable in this glossary; each entry's H3 slug uses the NEW term only.

| Legacy term | New term | Effective date | Where used in v1.6 docs |
|-------------|----------|---------------|------------------------|
| Apple Business Manager (ABM) | Apple Business | 2026-04-14 | All v1.6 Apple-side references |
| Location | Organizational Unit (OU) | 2026-04-14 | `02-ous-architecture.md`, all delegation runbooks |
| privilege | permission | 2026-04-14 | `01-role-permission-model.md` |
| Managed Apple ID | Managed Apple Account | 2024 (predates Apple Business rebrand) | `_glossary-macos.md`, federation runbook |
| VPP location token | content token | 2026-04-14 | `01-role-permission-model.md`, VPP runbook |
| People Manager (built-in role) | People Manager (preset custom role) | 2026-04-14 | `01-role-permission-model.md` |
| Device Enrollment Manager (built-in) | Device Enrollment Manager (preset) | 2026-04-14 | `01-role-permission-model.md` |
| Content Manager (built-in) | Content Manager (preset) | 2026-04-14 | `01-role-permission-model.md` |

## Alphabetical Index

[Account Holder](#account-holder) | [Content Token](#content-token) | [Custom Role](#custom-role) | [Managed Apple Account](#managed-apple-account) | [Organizational Unit](#organizational-unit) | [Sub-Org Admin](#sub-org-admin)

---

## Roles & Permissions

### Account Holder

[entry — citation: Apple Business intro roles page axm97dd59159]
DO NOT DELEGATE callout (OP-2 prevention)

### Custom Role

[entry — citation: axm97dd59159]

### Preset Custom Role

[entry — lists 5: People Manager / Content Manager / Device Enrollment Manager / Device API Manager / Brand Manager]

---

## Organizational Units

### Organizational Unit

[entry — citation: axmfdbe2cb0d; first-mention: "Organizational Unit (OU) (formerly Location)"]
OU scoping table (devices / content tokens / MDM servers / accounts / role assignments)

---

## Content Distribution

### Content Token

[entry — citation: axme0f8659ec; first-mention: "content token (Apple VPP token in Intune)"]
Per-OU model; 1-year validity; renewal cadence

---

## Federated Identity

### Managed Apple Account

[entry — citation: axm526a05814; note Microsoft Intune continues to say "Managed Apple ID"]

### Federated Authentication

[entry — citation: axm8c1cac980; 60-day window for federation collision (OP-7)]

---

## Governance Operations

### Sub-Org Admin

[entry — defines the persona Phase 62 establishes]

### Admin Directory

[entry — cross-references _admin-directory.md for lookup convention]

### Audit Log

[entry — hedge: "Apple does not publish an official retention SLA; community reports 90-365 days; configure SIEM export for compliance retention >1 year" per OP-13]
```

**Glossary source citations per entry:**

| Entry | Primary Apple citation | Confidence |
|-------|----------------------|------------|
| Account Holder | `axm97dd59159` (intro to roles and permissions) | HIGH |
| Custom Role | `axm97dd59159` | HIGH |
| Organizational Unit | `axmfdbe2cb0d` (configure OUs) | HIGH |
| Content Token | `axme0f8659ec` (manage content tokens) | HIGH |
| Managed Apple Account | `axm526a05814` (sync user accounts) | HIGH |
| Federated Authentication | `axm8c1cac980` (federated auth with Entra) | HIGH |
| Audit Log | No Apple official SLA source; hedge required | MEDIUM |

[CITED: STACK.md §9.1 canonical Apple URLs; CONTEXT.md canonical_refs]

---

### 9. Validation Architecture

#### Test Framework

| Property | Value |
|----------|-------|
| Framework | Node.js built-in `assert` + custom check runner (v1.5 harness pattern) |
| Config file | none — harness is self-contained |
| Quick run command | `node scripts/validation/check-phase-62.mjs` |
| Full suite command | `node scripts/validation/v1.6-milestone-audit.mjs` |

#### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| AB-01 | `_glossary-apple-business.md` exists with rebrand-mapping table + alphabetical index | structural | `check-phase-62.mjs` V-62-01 | Wave 0 gap |
| AB-01 | Rebrand-mapping table has all 8 term pairs (Legacy/New/Date/Where columns) | structural | `check-phase-62.mjs` V-62-02 | Wave 0 gap |
| AB-02 | `01-role-permission-model.md` exists with Account Holder DO-NOT-DELEGATE callout | structural | `check-phase-62.mjs` V-62-03 | Wave 0 gap |
| AB-03 | Edit-without-View dependency table present in `01-role-permission-model.md` | content | `check-phase-62.mjs` V-62-04 (keyword scan for "Edit-without-View" or "Requires") | Wave 0 gap |
| AB-04 | `02-ous-architecture.md` exists with OU scoping table | structural | `check-phase-62.mjs` V-62-05 | Wave 0 gap |
| AB-05 | C14 PASS: all 3 canonical sites contain 3 required tokens within first 50 lines | automated | `v1.6-milestone-audit.mjs` C14 | Wave 0 gap (harness) |
| AB-06 | All 4 existing glossaries have reciprocal banner line | structural | `check-phase-62.mjs` V-62-06..09 (one per glossary file) | Wave 0 gap |
| AB-06 | `_glossary-macos.md` ABM entry has inline see-also | structural | `check-phase-62.mjs` V-62-10 | Wave 0 gap |
| AB-07 | `_admin-directory.md` exists with TENANT_FILL_IN placeholders + 4 backend types | structural | `check-phase-62.mjs` V-62-11 | Wave 0 gap |
| AUDIT-09 | `v1.6-milestone-audit.mjs` exists and exits 0 | smoke | `check-phase-62.mjs` V-62-CHAIN (execFileSync harness) | Wave 0 gap (harness) |
| AUDIT-10 | C14 blocking: harness exits non-zero if any of 3 tokens missing | unit | `check-phase-62.mjs` V-62-C14-UNIT (test with synthetic missing-token content) | Wave 0 gap |
| AUDIT-11 | C15 blocking: banned phrases absent from v1.6 corpus | automated | `v1.6-milestone-audit.mjs` C15 | Wave 0 gap (harness) |
| AUDIT-12 | C16 blocking: all 4 edges pass or are exempted with sunset_phase | automated | `v1.6-milestone-audit.mjs` C16 | Wave 0 gap (harness) |
| AUDIT-13 | `check-phase-62.mjs` exists and exits 0 | self-reference | `check-phase-62.mjs` V-62-SELF | Wave 0 gap |

#### Sampling Rate

- **Per task commit:** `node scripts/validation/check-phase-62.mjs --verbose`
- **Per wave merge:** `node scripts/validation/v1.6-milestone-audit.mjs --verbose`
- **Phase gate:** Full suite green before `/gsd-verify-work`

#### Wave 0 Gaps

The following must be created as part of Phase 62 (executor creates them during authoring — NOT pre-existing):

- [ ] `scripts/validation/v1.6-milestone-audit.mjs` — Path-A copy of v1.5 + C14/C15/C16 + `+` separator; covers AUDIT-09..12
- [ ] `scripts/validation/v1.6-audit-allowlist.json` — new sidecar with `c13_rotting_external` + `c16_missing_endpoint_exemptions`
- [ ] `scripts/validation/check-phase-62.mjs` — validator-as-deliverable with V-62-01..N assertions; covers AUDIT-13
- [ ] `docs/cross-platform/apple-business/_glossary-apple-business.md` — main AB-01 deliverable (WRONG PATH — see note)
- [ ] `docs/_glossary-apple-business.md` — CORRECT PATH (root-level glossary per D-A2)
- [ ] `docs/cross-platform/apple-business/00-overview.md` — rebrand callout #1 (AB-05)
- [ ] `docs/cross-platform/apple-business/01-role-permission-model.md` — AB-02 + AB-03
- [ ] `docs/cross-platform/apple-business/02-ous-architecture.md` — AB-04
- [ ] `docs/cross-platform/apple-business/_admin-directory.md` — AB-07
- [ ] `.planning/phases/62-apple-business-foundation-rebrand/62-ANCHOR-INVENTORY.md` — PITFALL-6 artifact

**Note on glossary path:** `_glossary-apple-business.md` lives at `docs/` root alongside `_glossary.md`, `_glossary-macos.md` etc., per D-A2 glossary-split architecture. NOT inside `docs/cross-platform/apple-business/`.

---

### 10. Threat Model Seed (Phase 62 Security Gate)

Phase 62 ships PUBLIC documentation (downstream corpus addition) + a validation harness (JS tooling). The threat surface is bounded but non-zero.

**Threat A: `_admin-directory.md` template — accidental PII/contact data exposure**

| Aspect | Detail |
|--------|--------|
| Threat | A tenant forks this repo and replaces `<TENANT_FILL_IN>` placeholders with real admin email addresses, phone numbers, or AD group names, then commits back to a public upstream |
| Impact | PII exposure; admin contact enumeration for spear-phishing |
| Mitigation | Template MUST include a `> **Tenant-fillable.** Do NOT commit real admin contacts upstream` header. The frontmatter's `last_verified` field will change when tenant fills in — a modified `_admin-directory.md` with non-placeholder content should fail git pre-commit advisory hooks if any are configured. Phase 62 can also add a check in `check-phase-62.mjs` that the file still contains `<TENANT_FILL_IN>` (confirming upstream copy is still a template) |
| Residual risk | LOW — template design with prominent warning is standard practice; the pre-commit advisory hook (`.pre-commit-advisory.sh` in repo) can be extended to warn on changed `_admin-directory.md` |

**Threat B: C14/C15/C16 false-negatives — harness silently passes invalid content**

| Check | False-negative scenario | Mitigation |
|-------|------------------------|------------|
| C14 | Callout added at line 51+ (beyond 50-line window) | Enforce 50-line window strictly; check-phase-62.mjs V-62-C14-UNIT tests the boundary |
| C14 | Token "Apple Business" present but "Apple Business Manager" absent (incomplete callout) | Token-set-membership check requires ALL 3 tokens; partial presence = FAIL |
| C15 | Banned phrase appears in a code block or HTML comment | Regex must scan raw file content including code fences; avoid stripping fences |
| C15 | New banned phrase pattern emerges in Phase 63+ docs | Phase 66 C11/C15 refinement re-runs against full corpus; Phase 62 seeds 8 patterns as starting set |
| C16 | Link exists as text but uses incorrect relative path | String-inclusion check on file path; path must be correct for check to pass |

**Threat C: Apple URL external dependency rot**

| Aspect | Detail |
|--------|--------|
| Threat | Apple's support.apple.com URLs (article IDs) rotate, redirect, or become 404 after Apple updates their docs structure |
| Impact | Docs cite non-functional URLs; `c13_rotting_external` sidecar category doesn't catch them until quarterly audit |
| Mitigation | All Phase 62 citations use ARTICLE IDs (e.g., `axm97dd59159`) which Apple has documented are stable across the rebrand path changes. Article ID stability is HIGH confidence (verified in STACK.md §1.3). The `c13_rotting_external` sidecar category with quarterly audit job provides ongoing monitoring. For Phase 62 specifically, cite the new `/guide/business/` paths + article IDs; the legacy `/guide/apple-business-manager/` paths are NOT cited in new docs (STACK.md §1.3 authoring rule) |
| Residual risk | MEDIUM — Apple has not committed to a URL stability guarantee beyond "same article ID resolves at both paths"; monitor via `c13_rotting_external` |

[CITED: STACK.md §1.3 "Article IDs STABLE across rebrand — same article ID resolves at both paths"; CONTEXT.md sidecar precedent for c13_rotting_external]
[ASSUMED: pre-commit advisory hook behavior; threat impact assessments]

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Per-permission enumeration | Custom scraper | 1-hour manual scrape in browser | Apple pages JS-rendered; scraper would require Puppeteer/Playwright setup; manual is more reliable for a one-time 50-row table |
| C14/C15/C16 regex | New regex engine | Node.js built-in `String.prototype.includes()` + `/regex/.test()` | v1.5 harness uses only built-in string ops; no external regex library needed |
| Frontmatter parser | YAML library | Simple string split + indexOf (v1.5 pattern) | Harness currently uses string ops for frontmatter parsing; stay consistent |
| Anchor inventory | Git diff tooling | Read + capture pre-edit, read + compare post-edit | The inventory is a snapshot artifact; no git tooling needed in executor |
| Cross-link validation | HTML link checker | String inclusion check in harness | File-reads-only contract; no HTTP or subprocess needed for internal links |

---

## Common Pitfalls

### Pitfall 1: Glossary path confusion

**What goes wrong:** `_glossary-apple-business.md` placed inside `docs/cross-platform/apple-business/` instead of at `docs/` root alongside peer glossaries.
**Why it happens:** The `cross-platform/apple-business/` tree is where all other Apple Business docs live; the glossary feels at home there.
**How to avoid:** The 4 existing peer glossaries (`_glossary.md`, `_glossary-macos.md`, `_glossary-android.md`, `_glossary-linux.md`) all live at `docs/` root. The new glossary follows the same convention. Reciprocal banner lines use relative paths from `docs/` root which break if the file is in a subdirectory.
**Warning signs:** `check-phase-62.mjs` V-62-01 fails; reciprocal banner links generate 404.

### Pitfall 2: "(formerly X)" in H3 slug generates anchor drift

**What goes wrong:** Author adds `### Organizational Unit (formerly Location)` creating slug `#organizational-unit-formerly-location`; downstream docs linking to `#organizational-unit` silently break.
**Why it happens:** D-04 Referee explicitly warns this is a CRITICAL anchor-stability breach but authoring instinct is to explain parenthetically in the heading itself.
**How to avoid:** D-04 is locked: per-entry H3 headers use CLEAN slugs ONLY. First-mention parentheticals belong in the entry BODY (`**Organizational Unit (OU) (formerly Location)**`), not in the H3 heading.
**Warning signs:** `_glossary-apple-business.md` has H3 headings with `(formerly` in them.

### Pitfall 3: Atomic harness commit split across multiple commits

**What goes wrong:** Harness lands in commit A; sidecar lands in commit B; check-phase-62.mjs lands in commit C. Between A and B, the harness references the sidecar file path but it doesn't exist yet, causing harness to degrade to empty arrays (parseAllowlist degrades gracefully but produces incorrect results).
**Why it happens:** Executor stages files incrementally rather than reviewing the full atomic-commit list upfront.
**How to avoid:** Stage all 3 files (`v1.6-milestone-audit.mjs` + `v1.6-audit-allowlist.json` + `check-phase-62.mjs`) in one `git add` before committing. Run `node scripts/validation/v1.6-milestone-audit.mjs` BEFORE committing to verify exit 0.
**Warning signs:** `git log --oneline -5` shows harness and sidecar in different commits; `v1.6-milestone-audit.mjs` calls `parseAllowlist()` but sidecar JSON doesn't exist yet.

### Pitfall 4: C14 callout placed beyond line 50 in canonical sites

**What goes wrong:** Author adds the rebrand callout at line 55-60 in `01-abm-configuration.md` (below existing frontmatter + H1 + intro paragraph). C14 scans only first 50 lines; FAIL.
**Why it happens:** The existing macOS ABM config doc has content before the point where the intro callout naturally fits.
**How to avoid:** The callout MUST appear within the first 50 lines. If the existing intro section is long, prepend the callout as the FIRST content after the YAML frontmatter end marker (`---`).
**Warning signs:** C14 FAIL on `01-abm-configuration.md` or `02-abm-token.md` despite callout being visible in the file.

### Pitfall 5: Manual scrape skips "Basic Organization" or "Organization Access" subgroups

**What goes wrong:** Scraper focuses on the "big" subgroups (Devices, Apps & Books) and skips the smaller ones. Basic Organization and Organization Access contain the Account Holder-adjacent permissions (accept T&C, configure federation, create OUs) which are the highest-OP-1/OP-2 risk permissions.
**Why it happens:** Basic Organization has only 3-5 permissions; easy to skim past.
**How to avoid:** The scrape schema requires ALL 7 in-scope subgroups. Set a timer for the scrape and allocate 7-8 minutes per subgroup (~1 hour total per D-02 budget).
**Warning signs:** `01-role-permission-model.md` permission table has no rows under "Basic Organization" or "Organization Access" subgroup headers.

### Pitfall 6: Banner lines added AFTER H1 instead of BEFORE (existing glossary format violation)

**What goes wrong:** Reciprocal banner line added after the H1 heading (`# Apple Provisioning Glossary`) instead of between the YAML frontmatter and the H1, following the existing `> **Platform coverage:**` blockquote pattern.
**Why it happens:** Author glances at the target location and adds the banner in the wrong spot.
**How to avoid:** `_glossary-macos.md` line 9-10 is the template: the `> **Platform coverage:**` blockquote IMMEDIATELY follows the closing `---` of the YAML frontmatter, BEFORE the H1. The reciprocal banner line follows the same pattern.
**Warning signs:** `git diff` shows new content after `# Apple Provisioning Glossary` H1 rather than before it.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Apple Business Manager (ABM) | Apple Business | 2026-04-14 GA | All new docs use "Apple Business"; existing docs unchanged per Q5(b) |
| Legacy Locations | Organizational Units (OUs) | 2026-04-14 | First-mention convention: "Organizational Unit (OU) (formerly Location)" |
| Fixed-role triad (5 roles) | 4 top-level roles + 5 preset custom roles + unlimited custom roles | 2026-04-14 | Multi-role assignment now supported; custom role authoring is first-class |
| `support.apple.com/guide/apple-business-manager/` | `support.apple.com/guide/business/` | 2026-04-14 | Same article IDs at both paths; new v1.6 docs cite `/guide/business/` |
| VPP location token | Content token | 2026-04-14 | Intune still says "Apple VPP tokens" — compound phrasing required |
| Managed Apple ID | Managed Apple Account | 2024 (pre-rebrand) | Microsoft Intune still uses old term; compound phrasing required |
| Privileges | Permissions | 2026-04-14 | New docs use "permissions"; existing docs unchanged |
| Single global VPP token (pre-ABM) | Per-OU content token | 2018 (ABM era; unchanged in rebrand) | Content token is still per-OU, not consolidated |

**Deprecated / outdated:**
- "Apple Business Manager" in new docs: replaced by "Apple Business" (still valid in existing docs per Q5(b))
- "Location" in new docs: replaced by "Organizational Unit (OU)"
- `privilege`: replaced by `permission` in Apple portal and new docs
- Profile-based User Enrollment: deprecated iOS 18+ (existing docs note this; no v1.6 change)

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Apple's per-permission tables have ~50 total rows across 7 subgroups (3-10 per subgroup) | §Per-Permission Catalog Scrape Mechanics | Over/under-estimate; manual scrape corrects this |
| A2 | Edit-without-View companion pairs (7 pairs listed) are accurate | §Per-Permission Catalog Scrape Mechanics | Missing pairs leave OP-3 gaps; portal testing corrects |
| A3 | 50-line window for C14 token scan is sufficient for callout placement | §C14 Regex Design | Callout might land at line 51+ if existing intro is long; adjust window if needed |
| A4 | The 8 C15 regex patterns avoid false-positives in `18-cross-org-boundary-cheat-sheet.md` | §C15 Banned-Phrase Regex Seed | False-positives force immediate Phase 66 C15 refinement; Phase 64 ships allowlist exemptions anyway |
| A5 | `ALLOWED_PLATFORMS` set covers all platforms that appear in existing corpus frontmatter | §`+` Separator Parsing | Unknown `platform:` values in existing docs would cause C-check FAIL; Phase 62 executor should run harness against full corpus to detect |
| A6 | v1.5 Plan 60-08 atomic commit included exactly harness + sidecar + check-phase-60.mjs (3 files) | §Atomic-Harness-Commit Packaging | If v1.5 commit had more/fewer files, the Phase 62 precedent adherence should be adjusted |
| A7 | `_admin-directory.md` template with `<TENANT_FILL_IN>` is the correct placeholder syntax per project conventions | §Architecture Patterns | If project uses `{{FILL}}` or `[FILL]` syntax, adjust placeholder text |
| A8 | The pre-edit anchor inventory (62-ANCHOR-INVENTORY.md) format with SHA + anchor list is sufficient for post-edit comparison | §Pre-Edit Anchor Inventory | Missing anchors from scan; executor should use `grep -n "^###\|^##" file` to enumerate all headings |

**If this table were empty:** All claims were verified or cited — no user confirmation needed.

---

## Open Questions

1. **Apple's exact "Manage MDM Servers" sub-action bundling**
   - What we know: Apple bundles Add/Edit/Assign/Download under one "Manage MDM Servers" toggle per PITFALLS.md OP-1
   - What's unclear: Whether Apple has split these into separate granular permissions post-rebrand (the new portal may have finer-grained options)
   - Recommendation: Manual scrape FIRST; if permissions are now granular, update the OP-1 DENY-by-default guidance accordingly

2. **`c13_rotting_external` sidecar category format**
   - What we know: It's a NEW category alongside `c16_missing_endpoint_exemptions` in the Phase 62 sidecar
   - What's unclear: Whether entries should be `{file, line, url, reason}` (matching broken-link allowlist shape) or a simpler `{url, reason, quarterly_review_date}` shape
   - Recommendation: Adopt the existing `c13_broken_link_allowlist` schema `{file, line, target, reason, category}` adding `category: "rotting_external"` for consistency with the v1.5 schema precedent

3. **Whether `00-overview.md` also serves as the style-guide HTML comment convention definition**
   - What we know: CONTEXT.md specifics say Phase 62 "adopts the `<!-- ABAUDIT-{##}: ... -->` convention form" and "publishes the convention definition (1 section in `00-overview.md` or a dedicated `_style-guide.md`)"
   - What's unclear: Whether the planner should put convention docs in `00-overview.md` (simpler) or a dedicated `_style-guide.md` (cleaner separation)
   - Recommendation: Put the convention section in `00-overview.md` (1 H2 section) to avoid proliferating a file for a 1-paragraph convention. Rename to `_style-guide.md` only if the overview doc grows unwieldy.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Harness execution (`v1.6-milestone-audit.mjs`, `check-phase-62.mjs`) | ASSUMED present (v1.5 harness runs in this repo) | Unknown — verify with `node --version` | — |
| Apple Business portal (browser) | Manual permission scrape (AB-03) | YES (executor must have Apple Business admin access) | Current | None — scrape is irreducible |
| Git | Pre-edit SHA capture for anchor inventory | ASSUMED present (repo is git-tracked) | — | Use file hash instead of git SHA |

[ASSUMED: Node.js available based on v1.5 harness being an existing repo artifact; Apple portal access assumed for 1-hour scrape]

**Missing dependencies with no fallback:**
- Apple Business portal admin access for the 1-hour permission scrape (AB-03). If executor does not have admin access to a live Apple Business tenant, the 7-subgroup permission catalog CANNOT be authored from MEDIUM-confidence training knowledge alone. The planner MUST flag this dependency explicitly in Plan 62-04 (role-permission-model authoring plan) and the executor must resolve it before that plan runs.

---

## Project Constraints (from CLAUDE.md)

The following project directives from `CLAUDE.md` apply to Phase 62:

| Directive | Application |
|-----------|-------------|
| "Never commit `.env` file or any credentials" | `_admin-directory.md` template must NOT contain real admin credentials; `<TENANT_FILL_IN>` placeholders only |
| "Audit log all administrative actions with user attribution" | Phase 62 glossary entry for "Audit Log" should note Apple Business audit log behavior |
| "Follow principle of least privilege for Graph API permissions" | OP-1 DENY-by-default contract for "Manage MDM Servers" is directly aligned with this principle |
| PowerShell `try-catch` with `-ErrorAction SilentlyContinue` for non-critical operations | Not directly applicable to Phase 62 (documentation phase, no PowerShell authoring) |
| "Validate all user inputs in API endpoints" | Not applicable (no API changes in Phase 62) |

---

## Sources

### Primary (HIGH confidence)

- `.planning/phases/62-apple-business-foundation-rebrand/62-CONTEXT.md` — locked decisions D-01..D-05, canonical refs, integration points, specifics [VERIFIED: read in full]
- `.planning/REQUIREMENTS.md` — AB-01..07 + AUDIT-09..13 requirement text [VERIFIED: read in full]
- `.planning/STATE.md` — D-A1..D-A10, anti-regression invariants, atomic-harness-commit pattern [VERIFIED: read in full]
- `.planning/research/SUMMARY.md` — executive summary, terminology canon, confidence assessments [VERIFIED: read in full]
- `.planning/research/STACK.md` — Apple-side canonical URLs, Intune-side verbatim labels, per-permission seeds, OU model [VERIFIED: read in full]
- `.planning/research/PITFALLS.md` — OP-1..OP-15 (read OP-1..OP-12), DA-1..DA-9, CI-1..CI-6 [VERIFIED: read OP-1..OP-12]
- `.planning/research/ARCHITECTURE.md` — D-A1..D-A10 with options/alternatives [VERIFIED: read D-A1..D-A3]
- `.planning/ROADMAP.md` — Phase 62..66 goals, success criteria, wave designations [VERIFIED: read in full]
- `scripts/validation/v1.5-milestone-audit.mjs` — Path-A copy source structure; lines 1-100 [VERIFIED: read lines 1-100]
- `scripts/validation/v1.5-audit-allowlist.json` — sidecar schema precedent (`{file, line, reason}` shape) [VERIFIED: read in full]
- `scripts/validation/check-phase-61.mjs` — validator-as-deliverable pattern [VERIFIED: read lines 1-80]
- `docs/_glossary-macos.md` — existing Apple glossary structure, anchor patterns, line 9-16 header [VERIFIED: read lines 1-80]

### Secondary (MEDIUM confidence)

- `.planning/research/FEATURES.md` — workflow landscape, privilege groups from FEATURES §1.2 [VERIFIED: read lines 1-100]
- Apple Business User Guide article IDs (axm97dd59159, axmfdbe2cb0d, axme0f8659ec, axm526a05814, axm8c1cac980) — cited in STACK.md; not directly fetched in this session (CONTEXT.md cites them as HIGH-confidence verified in prior research sessions)

### Tertiary (LOW confidence — marked as ASSUMED in Assumptions Log)

- Training-knowledge synthesis for per-permission count estimates and Edit-without-View pairs (marked ASSUMED throughout; superseded by manual scrape)
- C15 regex patterns are design seeds from training knowledge; marked ASSUMED pending live-corpus validation at Phase 66

---

## Metadata

**Confidence breakdown:**

| Area | Level | Reason |
|------|-------|--------|
| Standard stack (sources/tooling) | HIGH | All directly inherited from verified v1.5 harness + prior research; file reads confirmed |
| Architecture patterns | HIGH | Direct inheritance from D-A1..D-A10 locked decisions + v1.5 precedents |
| Per-permission catalog | MEDIUM | Apple pages JS-rendered; row schema + counts are training-knowledge estimates |
| C14/C15/C16 regex designs | MEDIUM | Implementation approach is sound; specific regex tuning requires live-corpus testing |
| `+` separator parsing | HIGH | Pure logic design; backward-compatibility provable by inspection |
| Threat model | MEDIUM | Standard software threat reasoning; Apple URL stability is empirical |

**Research date:** 2026-05-21
**Valid until:** 2026-06-20 (30-day window; Apple Business docs are relatively stable post-GA; per-permission tables may update if Apple extends the permission surface)
