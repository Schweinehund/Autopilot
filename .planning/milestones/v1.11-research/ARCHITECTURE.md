# Architecture Research — v1.11 macOS PSSO End-to-End Provisioning & MDM Migration

**Domain:** Documentation suite — doc-integration architecture for new scenario guides
**Researched:** 2026-06-24
**Confidence:** HIGH — based on direct inspection of all existing files, naming conventions, numbering sequences, and v1.10 roadmap precedents

---

## Standard Architecture

### System Overview

```
docs/
├── macos-lifecycle/            # Journey/lifecycle narrative docs (audience: all roles)
│   └── 00-ade-lifecycle.md     # 7-stage end-to-end ADE narrative (existing)
│                               #   ← NEW scenario docs belong HERE (see Q1)
├── admin-setup-macos/          # Per-setting admin reference guides (audience: admin)
│   ├── 00-overview.md          # Setup sequence hub (Mermaid + numbered list)
│   └── 01..11-*.md             # Numbered admin guides — DO NOT add scenario docs here
├── l2-runbooks/                # Investigation runbooks, numbered sequentially
│   ├── 00-index.md             # Internal hub (NOT a nav-last target for new runbook)
│   └── 27..29-macos-*.md       # Last macOS runbook = #29
│                               #   ← NEW migration-failure runbook = #30
├── reference/                  # Matrices and reference tables
│   └── macos-capability-matrix.md  # V-63-08 blob-hash coupled (atomic commit required)
├── decision-trees/
│   └── 06-macos-triage.md      # macOS L1 triage tree (nav-last target)
├── index.md                    # Top-level nav hub (nav-last target)
├── common-issues.md            # Symptom router (nav-last target)
├── quick-ref-l2.md             # L2 cheat sheet (nav-last target)
└── _glossary-macos.md          # Glossary (content-phase target, not nav-last)
```

### Component Responsibilities

| Component | Responsibility | v1.11 Action |
|-----------|----------------|--------------|
| `macos-lifecycle/` | Multi-role journey narratives; cross-stage context; link-not-copy hub to admin guides | NEW: two scenario docs here |
| `admin-setup-macos/` | Per-setting admin reference; numbered sequential (01-11); Mermaid in 00-overview | MODIFIED: 00-overview.md gets "See Also" cross-links to new scenario docs |
| `l2-runbooks/` | Investigation runbooks numbered globally across all platforms | NEW: #30 migration-failure runbook |
| `l2-runbooks/00-index.md` | Internal runbook hub; gets every new runbook appended; NOT nav-last | MODIFIED: append #30 row in content phase |
| `reference/macos-capability-matrix.md` | macOS vs Windows feature parity; V-63-08 blob-hash coupled | MODIFIED: new Migration row — atomic commit with hash update |
| `reference/4-platform-capability-comparison.md` | 5-platform comparison; link-not-copy cells pointing to per-platform matrices | MODIFIED: macOS Migration cell — atomic with V-63-09 equivalent |
| `docs/index.md` | Top-level nav hub — NAV-LAST | MODIFIED: nav-last phase only |
| `docs/common-issues.md` | Symptom router — NAV-LAST | MODIFIED: nav-last phase only |
| `docs/quick-ref-l2.md` | L2 commands cheat sheet — NAV-LAST | MODIFIED: nav-last phase only |
| `decision-trees/06-macos-triage.md` | macOS L1 triage — NAV-LAST | MODIFIED: nav-last phase only |
| `_glossary-macos.md` | Glossary — content-phase (not nav-last) | MODIFIED: new terms in content phase |

---

## Q1: Where Do the New Scenario Docs Live?

### Decision: `docs/macos-lifecycle/`

**Recommended path:**
```
docs/macos-lifecycle/01-psso-provisioning-walkthrough.md
docs/macos-lifecycle/02-mdm-migration-psso.md
```

**Rationale:**

The three candidate locations each have a distinct role in the established taxonomy:

**Option (a) — New `docs/scenarios-macos/` or `docs/walkthroughs-macos/` area:** Creates a new top-level directory where no precedent exists. Every other platform (iOS, Android, Linux) uses `*-lifecycle/` for its multi-role journey docs. Introducing a new directory name breaks the cross-platform structural parallelism that is deliberate and enforced across the suite. Rejected.

**Option (b) — Within `docs/macos-lifecycle/` alongside `00-ade-lifecycle.md`:** This is the correct location. The `*-lifecycle/` directories are explicitly designed for multi-role journey narratives that stitch together the experience from enrollment through operation. `00-ade-lifecycle.md` is the closest structural analog: it is a "single-file narrative covering the complete macOS ADE pipeline," audience-tagged `all`, and each stage has Admin/L1/L2-role subsections. The new PSSO provisioning walkthrough and MDM migration walkthrough are exactly this type of document — they thread enrollment profile through delivery to PSSO-registered end user and Kandji/Iru through in-place migration respectively. The iOS analog confirms this: `ios-lifecycle/` holds `00-enrollment-overview.md` (structural overview) + `01-ade-lifecycle.md` (journey narrative), and the macOS lifecycle directory follows the same pattern.

**Option (c) — Within `docs/admin-setup-macos/` as guides 12 and 13:** The admin-setup-macos/ guides are per-setting admin reference documents, numbered sequentially, intended for Intune admins configuring specific features. Guides 01-11 all follow this pattern (ABM config, enrollment profile, configuration profiles, etc.). The scenario/walkthrough docs are explicitly multi-role journey guides that link to existing guides — they are categorically different from per-setting admin references. Placing them in admin-setup-macos/ would require updating the 00-overview.md Mermaid and numbered list, polluting a sequential admin reference with journey narrative. Rejected.

**Numbering within `macos-lifecycle/`:** The directory currently has only `00-ade-lifecycle.md`. New files:
- `01-psso-provisioning-walkthrough.md` — End-to-end PSSO provisioning walkthrough (Pillar A)
- `02-mdm-migration-psso.md` — Kandji/Iru → Intune MDM migration with PSSO (Pillar B)

Number 00 prefix on the existing file signals "overview/entry point." The new scenario docs are numbered 01 and 02, consistent with how `ios-lifecycle/` sequences `00-enrollment-overview.md` → `01-ade-lifecycle.md`.

**Frontmatter pattern (follow `00-ade-lifecycle.md` exactly):**
```yaml
---
last_verified: 2026-06-24
review_by: 2026-09-24
applies_to: ADE
audience: all
platform: macOS
---
```
Both new docs should carry `audience: all` because they are multi-role (L1 orientation, L2 technical detail, admin configuration steps all co-exist in the narrative — identical to how `00-ade-lifecycle.md` is structured).

The macOS 26 / iOS 26 version-gating should be documented within the docs with per-section `last_verified` freshness stamps, not as a frontmatter restriction, since the docs cover both OS-26-gated paths and the pre-26 fallback.

---

## Q2: New L2 Migration-Failure Runbook Number and Placement

### Decision: Runbook #30 — `docs/l2-runbooks/30-macos-mdm-migration-failure.md`

**Rationale:**

The L2 runbooks are numbered globally across all platforms, sequentially, with no gaps. The current macOS ADE runbooks are:
- #27 `27-macos-sso-investigation.md`
- #28 `28-macos-kerberos-sso-investigation.md`
- #29 `29-macos-graph-credential-investigation.md`

The last existing runbook in the directory is #29. The next macOS runbook is therefore #30. Skipping into a different number range (e.g., #35) or creating a macOS-specific sub-series would break the global sequential convention that has been maintained across all platforms.

**File path:** `docs/l2-runbooks/30-macos-mdm-migration-failure.md`

**Scope of runbook #30:** Covers the three failure categories named in PROJECT.md Pillar B: deadline lockout (ABM Assign Device Management deadline expired without in-place migration completing), profile-not-delivered (MDM profile not reaching the device after reassignment), and PSSO re-registration stuck (Secure Enclave key re-creation fails against the new Intune tenant after migration).

### 00-index.md Extension — Internal Hub, NOT Nav-Last

`l2-runbooks/00-index.md` is the internal runbook hub. It receives new runbook rows during the CONTENT PHASE — not the navigation-last phase. This is the established pattern from v1.10 Phase 85 (Plan 85-03 explicitly extended `00-index.md` with rows for #28 and #29 in the content phase, while Phase 87 handled the top-level nav hubs).

The `00-index.md` extension for #30 consists of:
1. A new row in the macOS ADE Runbooks "When to Use" table with the trigger condition ("ABM deadline lockout, profile-not-delivered post-reassignment, or PSSO re-registration stuck after migration to Intune")
2. A new macOS L1 Escalation Mapping row routing from the migration walkthrough scenario to #30

The `l2-runbooks/00-index.md` file is also listed as a nav-last target in v1.10 Phase 87's success criteria, but the precedent shows that "nav-last" applies to rows that reference the runbook from the top-level hubs (`docs/index.md`, `common-issues.md`, `quick-ref-l2.md`, `06-macos-triage.md`). The `00-index.md` internal hub entry for the runbook itself is wired in the content phase.

---

## Q3: Cross-Link Graph

### New Docs → Existing Docs (link-not-copy, mandatory)

| New File | Must Link TO | What the Link Covers |
|----------|--------------|---------------------|
| `macos-lifecycle/01-psso-provisioning-walkthrough.md` | `admin-setup-macos/00-overview.md` | Setup sequence context |
| `macos-lifecycle/01-psso-provisioning-walkthrough.md` | `admin-setup-macos/02-enrollment-profile.md` | Enrollment profile settings stage |
| `macos-lifecycle/01-psso-provisioning-walkthrough.md` | `admin-setup-macos/07-platform-sso-setup.md` | PSSO extension configuration |
| `macos-lifecycle/01-psso-provisioning-walkthrough.md` | `macos-lifecycle/00-ade-lifecycle.md` | Base lifecycle narrative (link-not-copy per-stage) |
| `macos-lifecycle/01-psso-provisioning-walkthrough.md` | `l1-runbooks/35-macos-sso-sign-in-failure.md` | Cross-link for failure at PSSO stage (no inline triage per Pillar A spec) |
| `macos-lifecycle/01-psso-provisioning-walkthrough.md` | `l1-runbooks/36-macos-secure-enclave-key.md` | Cross-link for Secure Enclave key loss |
| `macos-lifecycle/01-psso-provisioning-walkthrough.md` | `l2-runbooks/27-macos-sso-investigation.md` | L2 escalation for PSSO registration failure |
| `macos-lifecycle/01-psso-provisioning-walkthrough.md` | `admin-setup-macos/08-auth-methods-deep-dive.md` | Auth method detail (Secure Enclave key architecture) |
| `macos-lifecycle/02-mdm-migration-psso.md` | `macos-lifecycle/01-psso-provisioning-walkthrough.md` | PSSO re-registration begins where migration ends |
| `macos-lifecycle/02-mdm-migration-psso.md` | `admin-setup-macos/02-enrollment-profile.md` | New Intune enrollment profile setup post-migration |
| `macos-lifecycle/02-mdm-migration-psso.md` | `admin-setup-macos/07-platform-sso-setup.md` | PSSO re-registration in new tenant |
| `macos-lifecycle/02-mdm-migration-psso.md` | `l2-runbooks/30-macos-mdm-migration-failure.md` | Failure escalation path |
| `macos-lifecycle/02-mdm-migration-psso.md` | `l2-runbooks/27-macos-sso-investigation.md` | PSSO re-registration failure investigation |
| `macos-lifecycle/02-mdm-migration-psso.md` | `_glossary-macos.md` | MDM Migration / Assign Device Management / Deadline glossary terms |
| `l2-runbooks/30-macos-mdm-migration-failure.md` | `l2-runbooks/10-macos-log-collection.md` | Log collection prerequisite (every macOS L2 runbook references this) |
| `l2-runbooks/30-macos-mdm-migration-failure.md` | `macos-lifecycle/02-mdm-migration-psso.md` | Source scenario doc |

### Existing Docs → New Docs (reciprocal "See Also" links — CONTENT PHASE)

These edits happen in the content phase because they modify existing content files (not nav hubs). They are NOT navigation-last.

| Existing File | Change Type | What to Add |
|---------------|-------------|-------------|
| `macos-lifecycle/00-ade-lifecycle.md` | Append to See Also | Link to `01-psso-provisioning-walkthrough.md` ("End-to-End PSSO Provisioning Walkthrough — consolidated operator walkthrough from enrollment profile to registered end user") |
| `admin-setup-macos/07-platform-sso-setup.md` | Append to See Also | Link to `01-psso-provisioning-walkthrough.md` (full provisioning journey context) |
| `admin-setup-macos/02-enrollment-profile.md` | Append to See Also | Link to both scenario docs (scenario usage context) |
| `l2-runbooks/27-macos-sso-investigation.md` | Append to Related Resources or See Also | Link to `02-mdm-migration-psso.md` (migration as a source of PSSO re-registration failures) and `30-macos-mdm-migration-failure.md` |

**Clarification on content-phase vs nav-last:**
- Reciprocal "See Also" edits to EXISTING CONTENT files (lifecycle docs, admin-setup guides, existing L2 runbooks): content-phase edits, NOT nav-last.
- Edits to TOP-LEVEL HUB files (`docs/index.md`, `docs/common-issues.md`, `docs/quick-ref-l2.md`, `docs/decision-trees/06-macos-triage.md`): nav-last only, committed after all content files are confirmed committed.
- The navigation-LAST invariant applies to: "no hub link is committed until the content file it references is confirmed committed."

---

## Q4: Capability Matrix Integration

### Decision: YES — New Migration Row in `macos-capability-matrix.md`; Link-Not-Copy in `4-platform-capability-comparison.md`

**`macos-capability-matrix.md` — new `## MDM Migration` section or row under `## Enrollment`:**

MDM migration (ABM "Assign Device Management" + Deadline) is a genuine capability gap surface. The matrix currently has no coverage of in-place MDM migration from third-party MDMs to Intune. The feature is macOS/iOS 26-gated and represents a meaningful comparison point: Windows has no equivalent (tenant-to-tenant migration is a different surface; Windows cannot do in-place MDM swap without re-imaging). A new row or H2 section under `## Enrollment` covering:
- "In-place MDM migration (Assign Device Management + Deadline)" — macOS 26+ only; Not supported on Windows
- "Pre-macOS-26 migration path" — Retire/wipe-and-re-enroll (both platforms)
- "MDM migration PSSO re-registration" — macOS only (Secure Enclave key tenant-binding destroys on migration)

**V-63-08 blob-hash atomic-commit constraint:** The Phase 85 precedent is explicit — any edit to `macos-capability-matrix.md` requires the `check-phase-63.mjs` V-63-08 blob hash to be updated in the SAME ATOMIC COMMIT. This constraint carries forward to v1.11. The migration row edit must be planned as an atomic commit: matrix file change + blob-hash update together, indivisible. The pre-edit anchor inventory artifact pattern from Phase 85 (Plan 85-01) should also be followed: commit the anchor inventory artifact before touching the matrix.

**`4-platform-capability-comparison.md` — link-not-copy update:**

Per the established link-not-copy architecture (PITFALL-7), cells in the 5-platform comparison doc carry a verdict word + hyperlink to the per-platform matrix. If a new row is added to `macos-capability-matrix.md` under `## Enrollment` (or a new `## Migration` H2), a corresponding row must be added to the 5-platform comparison under the `## Enrollment` H2 with verdict cells for all 5 platforms. The `4-platform-capability-comparison.md` edit requires its own blob-hash update (V-63-09 equivalent — check what hash key the Phase 85 Plan 85-02 used for this file, likely a different check-phase validator).

The V-63-09 hash update for `4-platform-capability-comparison.md` must also be atomic with its matrix edit. These are two separate atomic commits (one per file), or they can be combined if the same validator checks both. The roadmapper should flag this as needing harness research before writing the plan: confirm which `check-phase-NN.mjs` validator covers `4-platform-capability-comparison.md` and what its blob-hash variable name is.

---

## Q5: Phase Build Order

### Recommended Phase Sequence

```
Phase 89: Provisioning Walkthrough Doc
Phase 90: Migration Walkthrough Doc + L2 Runbook #30
Phase 91: Glossary + Capability Matrix Integration
Phase 92: Navigation Hub Integration (NAV-LAST)
Phase 93: Harness Lineage Bump + Terminal Re-Audit + Milestone Close
```

**Total: 5 phases (89-93).** This is within the PROJECT.md estimated scope of 4-6 phases.

---

### Phase 89: PSSO Provisioning Walkthrough (Pillar A)

**New files:**
- `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` — NEW

**Modified files (content-phase edits):**
- `docs/macos-lifecycle/00-ade-lifecycle.md` — append See Also cross-link to new walkthrough
- `docs/admin-setup-macos/07-platform-sso-setup.md` — append See Also cross-link
- `docs/admin-setup-macos/02-enrollment-profile.md` — append See Also cross-link

**Integration points:**
- Threads enrollment profile (guide 02) → assignment → ADE delivery → Setup Assistant → Await Configuration → desktop → "Registration Required" → PSSO registration → verify
- Two delivery paths: standard post-enrollment (all supported macOS) + ADE-during-Setup-Assistant zero-click (macOS 26+ `EnableRegistrationDuringSetup`)
- Cross-links to L1 #35/#36 at PSSO registration stage; L2 #27 for escalation
- Link-not-copy to `00-ade-lifecycle.md` per-stage — does NOT duplicate ADE lifecycle prose

**Dependency:** Nothing (first content phase of v1.11). Can begin immediately.

---

### Phase 90: Migration Walkthrough Doc + L2 Runbook #30 (Pillar B)

**New files:**
- `docs/macos-lifecycle/02-mdm-migration-psso.md` — NEW
- `docs/l2-runbooks/30-macos-mdm-migration-failure.md` — NEW
- `docs/l2-runbooks/00-index.md` — MODIFIED (append #30 row — internal hub, content phase)

**Modified files (content-phase edits):**
- `docs/l2-runbooks/27-macos-sso-investigation.md` — append See Also to migration doc and #30

**Integration points with Phase 89:**
- Migration walkthrough ENDS where provisioning walkthrough BEGINS at PSSO registration: specifically, the post-migration device arriving at the "Registration Required" notification is the entry point for `01-psso-provisioning-walkthrough.md` Stage 6 (PSSO registration). The migration doc must explicitly cross-link to `01-psso-provisioning-walkthrough.md` at this junction.
- Both docs cover Secure Enclave key behavior: provisioning walkthrough covers initial key creation; migration walkthrough covers key destruction on migration (tenant-binding) and re-creation against new tenant. These are linked, not duplicated.
- Migration doc scope: ABM "Assign Device Management" path (macOS/iOS 26+) + pre-26 fallback (retire/wipe-and-re-enroll) + Kandji/Iru source-side release steps + post-migration PSSO re-registration
- L2 runbook #30 scope: deadline lockout, profile-not-delivered post-reassignment, PSSO re-registration stuck

**Dependency:** Phase 89 must be committed before Phase 90 begins (migration doc links to provisioning walkthrough doc; that file must exist).

---

### Phase 91: Glossary + Capability Matrix Integration (Pillar C — content portion)

**Modified files:**
- `docs/_glossary-macos.md` — NEW terms: MDM Migration, Assign Device Management, Deadline (lockout behavior), Kandji/Iru rebrand note
- `docs/reference/macos-capability-matrix.md` — NEW migration row(s); atomic commit with V-63-08 hash update
- `docs/reference/4-platform-capability-comparison.md` — NEW macOS migration cells; atomic commit with equivalent blob-hash update

**Pre-edit requirements (following Phase 85 precedent):**
- Commit pre-edit anchor inventory artifact for `macos-capability-matrix.md` before editing
- Confirm V-63-08 variable name and check-phase-63.mjs pattern before editing
- Confirm equivalent blob-hash variable name for `4-platform-capability-comparison.md` before editing

**Dependency:** Phase 90 must be committed (glossary terms are sourced from both new docs; matrix links point to content that must exist).

---

### Phase 92: Navigation Hub Integration (Pillar C — NAV-LAST)

**Navigation-last invariant:** All content committed (Phases 89-91 complete and confirmed) before any nav-hub edit is committed.

**Modified files (all nav-last):**
- `docs/index.md` — macOS Provisioning section: add rows for `01-psso-provisioning-walkthrough.md` and `02-mdm-migration-psso.md` under Service Desk (L1) and Desktop Engineering (L2); L2 section: add row for L2 #30
- `docs/common-issues.md` — macOS section: new MDM migration failure entry routing to #30; PSSO registration failure during migration entry cross-linking to #27 and #30
- `docs/quick-ref-l2.md` — macOS section: migration diagnostic commands (if any CLI commands are documented in #30)
- `docs/decision-trees/06-macos-triage.md` — new migration failure leaf node routing to L2 #30

**Dependency:** All Phase 89-91 commits confirmed present before any Phase 92 commit.

---

### Phase 93: Harness Lineage Bump + Terminal Re-Audit + Milestone Close (Pillar D)

**Standard Path-A pattern inherited from v1.10 Phase 88:**

- Atom 1 (indivisible commit): `v1.11-milestone-audit.mjs` + `v1.11-audit-allowlist.json` + BASELINE_15 freshness comment in `regenerate-supervision-pins.mjs`
- Pin V20 (v1.10 close-gate SHA) in `_lib/frozen-at-close.mjs` before Atom 2
- Atom 2 (indivisible commit): `check-phase-89..93.mjs` validators + `_lib/frozen-at-close.mjs` V20 entry + `audit-harness-v1.11-integrity.yml` as 9th parallel CI coexistence workflow (predecessors v1.4-v1.10 byte-unchanged)
- 3-axis terminal re-audit: Axis 1 fresh clone local + Axis 2 cross-OS Linux GHA + Axis 3 fresh zero-context sub-agent; cross-OS PASS/FAIL/SKIP EXACT MATCH
- Close-gate: `v1.11-MILESTONE-AUDIT.md` + `v1.11-DEFERRED-CLEANUP.md` + 4-doc traceability closure

**Dependency:** Phase 92 confirmed complete and green before any Phase 93 work begins.

---

## Integration Points: Provisioning Walkthrough ↔ Migration Walkthrough

This is the critical data/content flow between Pillars A and B:

```
Migration Walkthrough (02-mdm-migration-psso.md)
    Stage: Post-migration, device enrolled in Intune
    → Device arrives at "Registration Required" notification
    → PSSO re-registration triggered (Secure Enclave key re-created for new tenant)
    ↓
    CROSS-LINK → Provisioning Walkthrough (01-psso-provisioning-walkthrough.md)
                  Stage: PSSO registration (user receives "Registration Required")
                  → User completes PSSO registration
                  → Secure Enclave key stored in new tenant
                  → Verification via app-sso platform -s
```

The migration walkthrough MUST cross-link to the provisioning walkthrough at the PSSO re-registration junction. The provisioning walkthrough SHOULD note that it also applies to post-migration scenarios (a "This also applies to migrated devices" callout at the PSSO registration stage). Neither doc duplicates the other's content.

**Secure Enclave key destruction:** The migration doc owns the explanation of why the SE key is destroyed (Secure Enclave keys are tenant-bound; ABM device reassignment to a new MDM server creates a new trust chain, invalidating the old PSSO registration). The provisioning walkthrough owns the recovery procedure (the "Registration Required" notification flow). These are complementary, not duplicated.

---

## Architectural Patterns

### Pattern 1: Link-Not-Copy (established suite-wide)

**What:** New docs carry cross-stage links to existing admin guides. They do not inline the prose from guides 02, 07, or 00-ade-lifecycle.md.
**When:** Every reference to per-setting admin detail, per-stage lifecycle detail, or error handling.
**Implementation:** Narrative sentence + hyperlink to guide, e.g.: "Configure the enrollment profile as described in [Enrollment Profile](../admin-setup-macos/02-enrollment-profile.md) — ensure 'Await Configuration' is set to Yes."

### Pattern 2: Navigation-LAST Invariant

**What:** No edit to `docs/index.md`, `docs/common-issues.md`, `docs/quick-ref-l2.md`, or `docs/decision-trees/06-macos-triage.md` until all content files the edit references are confirmed committed.
**When:** Every phase where nav-hub integration happens.
**Implementation:** Phase 92 is fully blocked on Phases 89-91 complete. The success criteria for Phase 92 include verifying each referenced file path exists before committing any nav-hub edit.

### Pattern 3: Harness-Bump-LAST

**What:** Audit harness lineage bump (v1.11 harness files) is committed only after navigation-last integration is confirmed.
**When:** Always the final phase.
**Implementation:** Phase 93 blocked on Phase 92. Atom 1 and Atom 2 are two-atomic-commit pattern per v1.10 precedent.

### Pattern 4: Atomic Capability Matrix Commits

**What:** Any edit to `macos-capability-matrix.md` must be committed atomically with the updated V-63-08 blob hash in `check-phase-63.mjs`. Any edit to `4-platform-capability-comparison.md` must be committed with its equivalent blob-hash update.
**When:** Phase 91.
**Implementation:** Pre-edit anchor inventory artifact committed first. Then single atomic commit containing matrix file + hash update. No intermediate commits between the pre-edit artifact and the matrix+hash commit.

---

## Anti-Patterns

### Anti-Pattern 1: Placing Scenario Docs in admin-setup-macos/

**What people might do:** Add `12-psso-walkthrough.md` and `13-migration-walkthrough.md` to `docs/admin-setup-macos/` to keep all macOS docs in one place.
**Why it's wrong:** The admin-setup-macos/ numbering sequence is a per-setting admin reference series. Adding scenario/journey docs breaks the conceptual coherence of that series and requires updating `00-overview.md`'s Mermaid diagram and numbered list with docs that are not part of the sequential admin-setup sequence. It also mismatches audience: admin-setup guides are `audience: admin`; scenario docs are `audience: all`.
**Do this instead:** Use `docs/macos-lifecycle/` where the existing `00-ade-lifecycle.md` precedent shows exactly this pattern.

### Anti-Pattern 2: Committing Nav-Hub Links Before Content Files

**What people might do:** Add a row to `docs/index.md` for the provisioning walkthrough while authoring that walkthrough, in the same phase.
**Why it's wrong:** Violates the navigation-LAST invariant. If the content file commit fails or is rolled back, the nav hub points to a non-existent file — a broken link.
**Do this instead:** Commit all content files in Phases 89-91. Verify they are present at HEAD. Then commit nav-hub edits in Phase 92.

### Anti-Pattern 3: Editing the Capability Matrix Without the Blob-Hash Update

**What people might do:** Edit `macos-capability-matrix.md` to add migration rows, commit, then update the blob hash in a separate follow-up commit.
**Why it's wrong:** The validator `check-phase-63.mjs` V-63-08 will FAIL between those two commits. If the second commit is forgotten or delayed, the chain is RED.
**Do this instead:** Single atomic commit: matrix change + blob-hash update, indivisible.

### Anti-Pattern 4: Duplicating ADE Lifecycle Prose in the Provisioning Walkthrough

**What people might do:** Re-explain ADE stages 1-5 in the provisioning walkthrough to make it "standalone."
**Why it's wrong:** Creates content drift between `00-ade-lifecycle.md` and the walkthrough. When the lifecycle doc is updated, the duplicate in the walkthrough becomes stale. The audit harness C11 keyword checks and freshness dates will track only the canonical file.
**Do this instead:** Link-not-copy. The walkthrough references ADE stages by stage number with a link to `00-ade-lifecycle.md`. It owns only the PSSO-specific additions at each stage.

---

## Scalability Considerations

Not applicable in the traditional sense for a documentation suite. The relevant "scale" consideration is maintainability under content drift:

| Concern | Mitigation |
|---------|------------|
| macOS 26 / iOS 26 content freshness | Per-section `last_verified` stamps in both scenario docs; short `review_by` window (90 days) given high-drift OS-26 content |
| Iru/Kandji rebrand drift | Surface both names ("Kandji, now rebranded as Iru in 2026") in the migration doc and glossary; single mention per section to avoid proliferation |
| PSSO Secure Enclave behavior drift | Cross-links to guide 07 and guide 08 for authoritative details; scenario docs reference the auth-methods doc rather than duplicating key behavior |
| Blob-hash coupling in harness | Pre-edit anchor inventory artifact (Phase 85 precedent) + atomic commits per pattern |

---

## Sources

- `docs/macos-lifecycle/00-ade-lifecycle.md` — structural analog for new scenario docs (direct inspection)
- `docs/admin-setup-macos/00-overview.md` — numbering convention for admin-setup guides (direct inspection)
- `docs/l2-runbooks/00-index.md` — runbook numbering sequence; last macOS runbook = #29 (direct inspection)
- `docs/reference/macos-capability-matrix.md` — matrix H2 structure; V-63-08 coupling noted (direct inspection)
- `docs/index.md` — nav hub structure; nav-last targets confirmed (direct inspection)
- `.planning/milestones/v1.10-ROADMAP.md` — Phase 85 (matrix atomic commit + anchor inventory), Phase 87 (nav-last pattern), Phase 88 (harness-bump-last pattern) (direct inspection)
- `.planning/PROJECT.md` — v1.11 Pillar A/B/C/D scope; Key Decisions; estimated 4-6 phases (direct inspection)
- `docs/ios-lifecycle/` and `docs/android-lifecycle/` — cross-platform structural precedent for lifecycle directory usage (directory listing)

---

*Architecture research for: v1.11 macOS PSSO End-to-End Provisioning & MDM Migration documentation suite*
*Researched: 2026-06-24*
