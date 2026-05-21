# Phase 63: Multi-OU Architecture & Apple Admin Setup - Pattern Map

**Mapped:** 2026-05-21
**Files analyzed:** 11 (8 new docs, 2 modified files, 1 new validator)
**Analogs found:** 11 / 11

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `docs/cross-platform/apple-business/03-ous-vs-custom-roles.md` | doc (conceptual, decision-matrix) | request-response | `docs/cross-platform/apple-business/02-ous-architecture.md` | exact |
| `docs/cross-platform/apple-business/04-custom-role-authoring.md` | doc (reference, permission-catalog) | request-response | `docs/cross-platform/apple-business/01-role-permission-model.md` | exact |
| `docs/cross-platform/apple-business/05-sub-org-admin-onboarding.md` | doc (procedure, onboarding) | request-response | `docs/cross-platform/apple-business/_admin-directory.md` | role-match |
| `docs/cross-platform/apple-business/06-mdm-server-assignment.md` | doc (admin-setup, procedure) | request-response | `docs/cross-platform/apple-business/02-ous-architecture.md` | role-match |
| `docs/cross-platform/apple-business/07-vpp-content-token-consolidation.md` | doc (admin-setup, reference) | request-response | `docs/cross-platform/apple-business/02-ous-architecture.md` | role-match |
| `docs/cross-platform/apple-business/08-managed-apple-account-provisioning.md` | doc (admin-setup, decision-tree) | request-response | `docs/cross-platform/apple-business/01-role-permission-model.md` | role-match |
| `docs/cross-platform/apple-business/09-shared-ipad-lifecycle.md` | doc (lifecycle, procedure) | request-response | `docs/cross-platform/apple-business/02-ous-architecture.md` | role-match |
| `docs/cross-platform/apple-business/10-apple-tv-lifecycle.md` | doc (lifecycle, procedure) | request-response | `docs/cross-platform/apple-business/02-ous-architecture.md` | role-match |
| `docs/reference/ios-capability-matrix.md` (edit: +3 rows) | doc (reference, matrix) | request-response | `docs/reference/ios-capability-matrix.md` | exact (self) |
| `docs/cross-platform/apple-business/02-ous-architecture.md` (edit: D-05 stale-ref fix) | doc (architecture, reference) | request-response | `docs/cross-platform/apple-business/02-ous-architecture.md` | exact (self) |
| `scripts/validation/check-phase-63.mjs` | validator (Node ESM) | batch | `scripts/validation/check-phase-62.mjs` | exact |

---

## Pattern Assignments

### `docs/cross-platform/apple-business/03-ous-vs-custom-roles.md`
**Role:** doc (conceptual, decision-matrix)
**Analog:** `docs/cross-platform/apple-business/02-ous-architecture.md`

**Frontmatter pattern** (lines 1-7):
```yaml
---
last_verified: 2026-05-21
review_by: 2026-07-20
applies_to: apple-business
audience: admin
platform: ios+macos
---
```

**Platform-applicability callout pattern** (lines 9-13):
```markdown
> **Platform applicability:** Apple Business Organizational Units (OUs) are the Apple-side
> delegation primitive for iOS, iPadOS, and macOS Apple-managed devices. There is no direct
> Intune-side analog (Intune scope tags are the closest Microsoft-side concept; see the
> [Apple Business Governance Glossary](../../_glossary-apple-business.md) for terminology canon
```

**Criteria-comparison table pattern** — this is the D-03 decision: rows = decision criteria, columns = 3 topologies. Source anchor `02-ous-architecture.md:54-59` establishes the precedent of prose + callout:
```markdown
4. **Most-permissive wins across overlapping OU assignments.** When an admin holds custom
   role assignments in multiple OUs that have overlapping device scopes (for example, during
   a device transfer in progress), the most permissive applicable permission set applies.
   This behavior is relevant for Phase 63 OU-01 delegation topology decisions — see
   [03-ous-vs-custom-roles.md](03-ous-vs-custom-roles.md) (Phase 63 deliverable) for the
   full decision matrix.
```
Copy this "adjacent callout" model: place the `> **Note:**` blockquote for "most-permissive wins across overlapping assignments" immediately after the matrix table, mirroring `02-ous-architecture.md:54-59`.

**Table pattern for OU scope coverage** (lines 114-122) — adapt column structure for decision matrix:
```markdown
| Resource | OU-scoped? | Notes |
|----------|-----------|-------|
| Devices | Yes | Per-OU device pool; ... |
```
For `03-`, reshape as:
```markdown
| Decision criterion | OUs-only | Custom-roles-only | Combined |
|-------------------|----------|-------------------|----------|
```

**Cross-references section pattern** (lines 123-141) — use the same cross-reference block style.

**Version History pattern** (lines 143-147):
```markdown
## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-21 | Phase 63: ... | -- |
```

---

### `docs/cross-platform/apple-business/04-custom-role-authoring.md`
**Role:** doc (reference, permission-catalog)
**Analog:** `docs/cross-platform/apple-business/01-role-permission-model.md`

**Frontmatter pattern** (lines 1-7): identical to analog — same YAML block.

**Training-data / verification notice pattern** (lines 15-21 of `01-role-permission-model.md`):
```markdown
> **Training-data notice:** The per-permission catalog in this document (Section 3 onward) is
> authored from AI training knowledge of Apple Business Manager permissions as of the pre-2026-04-14
> rebrand, cross-referenced against RESEARCH.md §1 seed data and 62-SCRAPE-PREP.md. All permission
> rows are marked `[CITED: training; needs live verification]` pending a live browser scrape of
> `https://support.apple.com/guide/apple-business-manager/intro-to-roles-and-privileges-axm97dd59159/web`.
> Re-verification target: within 60 days of 2026-05-21 (by 2026-07-20). This notice is removed
> once the live scrape is completed and rows are verified verbatim against the Apple portal.
```
Adapt for `04-`: note applies to the permission bundle composition pending portal verification.

**OP-2 DO-NOT-DELEGATE callout pattern** (lines 39-58 of `01-role-permission-model.md`):
```markdown
> **Critical (OP-2 / DA-2): Account Holder — DO NOT DELEGATE**
>
> The **Account Holder** role MUST NOT be delegated to any sub-organization admin ...
```
`04-` must reference this callout explicitly and add the OP-1 DENY-by-default callout for Manage MDM Servers.

**Permission table schema** (lines 139-148 of `01-role-permission-model.md`):
```markdown
| Permission | Scope | Edit / View | OP-1 flag | OP-3 companion View | Apple anchor |
|------------|-------|-------------|-----------|---------------------|--------------|
```
Use this exact six-column schema for the OU-02 bundle table in `04-`. Mark excluded permissions with `❌ EXCLUDED (OP-1)` / `❌ EXCLUDED (OP-2)`.

**OP-1 superprivilege callout pattern** (lines 150-167 of `01-role-permission-model.md`):
```markdown
> **OP-1 Superprivilege Explainer — "Manage MDM Servers":**
>
> "Manage MDM Servers" in the Devices subgroup is a superprivilege that bundles four actions
> Apple does not separately gate in their UI: ...
> Sub-org admins legitimately need (c) but should never have (a). Since Apple bundles all four
> under one permission toggle, the **DENY-by-default** contract applies: ...
```
Copy this callout verbatim after the bundle table in `04-`.

**Edit-without-View dependency table** (lines 343-370 of `01-role-permission-model.md`):
```markdown
| Edit permission | Required companion View | Subgroup (Edit) | Subgroup (View) | Blank-UI symptom |
|----------------|------------------------|-----------------|-----------------|------------------|
```
`04-` references this table (cite as cross-link to `01-role-permission-model.md#edit-without-view-dependency-table-op-3-prevention`) rather than duplicating it — per Phase 62 D-04 anti-redundancy precedent.

**SOT citation pattern** (lines 31-35 of `01-role-permission-model.md`):
```markdown
**Downstream consumer:** Phase 63 `04-custom-role-authoring.md` cites this document as the source
of truth for building the minimum-viable sub-org admin permission bundle template.
```
Mirror this in `04-`: open with "This document cites `01-role-permission-model.md` as the source of truth for the 7-subgroup permission catalog."

---

### `docs/cross-platform/apple-business/05-sub-org-admin-onboarding.md`
**Role:** doc (procedure, onboarding)
**Analog:** `docs/cross-platform/apple-business/_admin-directory.md`

**Frontmatter pattern** (lines 9-15 of `_admin-directory.md`):
```yaml
---
last_verified: 2026-05-21
review_by: 2026-07-20
applies_to: apple-business
audience: admin
platform: ios+macos
---
```

**C16 anchor slug requirement** — `05-` MUST contain this exact heading to produce slug `#which-admin-owns-this-pool`:
```markdown
## Which admin owns this pool?
```
GitHub slug algorithm: lowercase, spaces→hyphens, `?` dropped. `## Which admin owns this pool?` → `which-admin-owns-this-pool`. This is the Wave B anchor gate for Phase 64 and C16 target for Phase 65 L1 #34.

**DO-NOT-DELEGATE callout pattern** (lines 46-49 of `_admin-directory.md`):
```markdown
> **Account Holder DO-NOT-DELEGATE note:** The Account Holder role MUST NOT be delegated to a
> sub-organization admin. See [Role/Permission Model](01-role-permission-model.md#top-level-roles-4)
> for the OP-2 / DA-2 callout. L1 escalation contacts listed in this directory are Delegation
> Contacts (sub-org admins), NOT Account Holders.
```
Copy this callout into `05-` onboarding section.

**OP-8 paired-offboarding pattern** — `05-` must include an offboarding section. Model after `_admin-directory.md`'s Tenant Population Instructions §1 (deactivation path): document manual / SCIM / OIDC+JIT offboarding steps in parallel with the onboarding paths. Flag OP-8 auto-revoke behavior as pending portal verification where uncertain.

**Cross-references section pattern** (lines 76-80 of `_admin-directory.md`):
```markdown
## Cross-References

- Account Holder DO-NOT-DELEGATE invariant: see [Role/Permission Model](01-role-permission-model.md#top-level-roles-4) — OP-2 / DA-2 callout
- OU scoping context: see [OUs Architecture](02-ous-architecture.md)
- L1 runbook integration (Phase 65): `docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md` will cross-link to this file's `#per-ou-admin-holder-lookup` anchor — the file-level path is the C16 stable target (Phase 65 deliverable per ABNAV-01)
```
Adapt for `05-`: add cross-link to `_admin-directory.md` (C16 target) + `04-custom-role-authoring.md`.

---

### `docs/cross-platform/apple-business/06-mdm-server-assignment.md`
**Role:** doc (admin-setup, procedure)
**Analog:** `docs/cross-platform/apple-business/02-ous-architecture.md`

**Frontmatter pattern**: identical to `02-ous-architecture.md` YAML block.

**Platform-applicability callout pattern** (lines 9-15 of `02-ous-architecture.md`): adapt to scope `06-` as Apple-Business-side MDM server assignment (not Intune MDM push certificate management).

**OU Scope Coverage table pattern** (lines 114-122 of `02-ous-architecture.md`) — adapt for MDM server assignment:
```markdown
| Resource | OU-scoped? | Notes |
|----------|-----------|-------|
| MDM servers | Yes | One MDM server per OU; assignment cascade through device transfers |
```
Expand into a procedure table with columns: Step / Action / Who / Notes.

**OP-1 DENY-by-default reference**: `06-` must carry a callout that sub-org (OU-02) admins do NOT manage MDM servers — cite `01-role-permission-model.md:276` (`Manage MDM Servers | tenant-wide | Edit+bundle | DENY-by-default (OP-1)`). Copy the callout style from `01-role-permission-model.md` lines 281-288.

**Cross-reference to Phase 64**: `06-` points forward to `15-mdm-server-reassign-runbook.md` (Phase 64, DELEG-05) for the operational runbook. Use the forward-reference pattern from `02-ous-architecture.md:116`:
```markdown
| Devices | Yes | Per-OU device pool; reassignment via MDM server transfer (see `15-mdm-server-reassign-runbook.md` Phase 64) |
```

---

### `docs/cross-platform/apple-business/07-vpp-content-token-consolidation.md`
**Role:** doc (admin-setup, reference)
**Analog:** `docs/cross-platform/apple-business/02-ous-architecture.md`

**Frontmatter pattern**: identical to `02-ous-architecture.md` YAML block.

**"Does not duplicate" deferral pattern** (lines 99-105 of `02-ous-architecture.md`):
```markdown
> The "untouched-OU trap" applies when a tenant consolidates device pools across OUs and
> needs to migrate content tokens from a source OU to a destination OU. Content tokens are
> OU-scoped and are NOT automatically transferred when devices move between OUs. The
> Phase 63 VPP catalog consolidation runbook (`05-vpp-catalog-consolidation`, forthcoming)
> carries the OP-9 untouched-OU hard-bordered callout covering cross-OU content-token
> migration scenarios. This concept doc does not duplicate that callout — refer to Phase 63
> for the operational procedure.
```
`07-` is the Phase 63 admin-setup side. Mirror the "does not duplicate" pattern: the OP-9 **hard-bordered callout** is owned by Phase 64's `11-vpp-catalog-runbook.md` — `07-` covers per-OU consolidation concepts and points to Phase 64 for the operational runbook.

**Apps & Books permission table** (lines 310-325 of `01-role-permission-model.md`) — `07-` will reference the `View content tokens` / `Download content tokens` / `Manage content token location` permissions. Use the content-token scope note verbatim:
```markdown
> **Content token scope:** Each content token is OU-scoped. An admin with "Download content
> tokens" in OU-A cannot download the token for OU-B. The "Manage content token location" permission
> controls which OU a token is associated with — this is tenant-wide and DENY-by-default because
> inadvertently moving a token between OUs breaks existing app license assignments for the source OU.
```

**D-05 coordination note**: `07-` is one of the two forward-reference targets in the D-05 stale-ref fix for `02-ous-architecture.md:102`. This doc should include a clearly-anchored section (e.g., `## Content Token Consolidation Concepts`) so the D-05 reconciled reference in `02-ous-architecture.md:102` can point here by file-level anchor.

---

### `docs/cross-platform/apple-business/08-managed-apple-account-provisioning.md`
**Role:** doc (admin-setup, decision-tree)
**Analog:** `docs/cross-platform/apple-business/01-role-permission-model.md` (permission structure) + `docs/cross-platform/apple-business/_admin-directory.md` (provisioning-path decision structure)

**Frontmatter pattern**: identical to other Phase 62/63 docs.

**C15 framing guard** — `08-` is the highest-risk C15 surface (SCIM/OIDC+JIT prose). Apply the `<!-- ABAUDIT-NN: ... -->` exemption pattern from `00-overview.md:10-11` ONLY if the text genuinely needs to mention a Microsoft identity concept. Prefer Apple-only framing ("federated identity source," "SCIM provisioning endpoint") over any product name. The exemption comment pattern:
```markdown
<!-- ABAUDIT-02: next line explicitly declares Intune-side surfaces OUT OF SCOPE; C15 regex 4 false-positive exemption ... -->
```

**Decision-tree structure** — model after `_admin-directory.md`'s Lookup Pattern (numbered list of paths with When / Tradeoff sub-items):
```markdown
1. **Manual (ABM web portal entry)**
   - **When:** ...
   - **Tradeoff:** ...

2. **SCIM (directory-synced provisioning)**
   - **When:** ...
   - **Tradeoff:** ...

3. **OIDC + JIT (federated sign-in with just-in-time account creation)**
   - **When:** ...
   - **Tradeoff:** ...
```

**Forward reference to Phase 64**: `08-` cross-links to `16-managed-apple-account-runbook.md` (Phase 64, DELEG-06) for the operational account-management runbook. Use the same forward-reference stub pattern as `06-`/`07-`.

---

### `docs/cross-platform/apple-business/09-shared-ipad-lifecycle.md`
**Role:** doc (lifecycle, procedure)
**Analog:** `docs/cross-platform/apple-business/02-ous-architecture.md`

**Frontmatter pattern**: identical to `02-ous-architecture.md` — add `platform: shared-ipad` or `platform: ios+macos` (the `+` separator parser in `check-phase-62.mjs:347` lists `shared-ipad` as an allowed atom):
```yaml
platform: ios+shared-ipad
```

**C16 MANDATORY anchor heading** — must appear verbatim:
```markdown
## Which admin owns this pool?
```
This exact heading produces the `#which-admin-owns-this-pool` slug. Place this section in the lifecycle doc as the admin-ownership clarification section (per D-03: sub-org admin owns the Shared iPad pool within their OU). The `check-phase-63.mjs` harness will assert presence of this exact string.

**OP-12 Find My disable callout** — HIGH severity, NOT hedged. Model as a `> **Critical (OP-12):**` callout in the same style as the OP-2 DO-NOT-DELEGATE callout from `01-role-permission-model.md:39-58`. This is a mandatory pre-deployment step — document as a blocking gate before enrollment.

**Lifecycle stages structure** — model after `02-ous-architecture.md`'s Locations to OUs Migration Framing section (prose intro + numbered sub-steps for each stage):
```markdown
## Shared iPad Lifecycle Stages

1. **Enrollment** ...
2. **Session Configuration** ...
3. **User Provisioning** ...
4. **Sign-in / Sign-out** ...
5. **Wipe / Re-provision** ...
```

**Wave B anchor dependency note** — add a note that this doc's `#which-admin-owns-this-pool` anchor is a Phase 64 Wave B dependency. Model after `02-ous-architecture.md:112` forward-reference pattern.

---

### `docs/cross-platform/apple-business/10-apple-tv-lifecycle.md`
**Role:** doc (lifecycle, procedure)
**Analog:** `docs/cross-platform/apple-business/02-ous-architecture.md`

**Frontmatter pattern**:
```yaml
platform: apple-tv
```
The `+` separator parser allows `apple-tv` as a platform atom (check-phase-62.mjs line 346).

**D-04 depth calibration** — core depth with explicit hedges. Model after the `02-ous-architecture.md` deferred-verification pattern (lines 46-52):
```markdown
3. **Deferred verification — max nesting depth.** Definitive confirmation of the maximum
   supported OU nesting depth requires portal verification. This verification is deferred to
   Phase 63 ... For v1.6 authoring purposes, treat the OU hierarchy as
   **flat-by-default with optional one-level sub-OUs (depth ≤ 2)**.
```
Adapt: deliver full depth on documented surface (Configurator-only retail path, OU assignment, content-token app deployment, Conference Room Display heuristic). Use `> **Note:** Apple does not publish ...` pattern for any thin areas. Defer per-OU CRD partitioning deep-dive to v1.7+ with a tracking note.

**OP-15 Conference Room Display heuristic** — document as a "shared physical space" heuristic note using the `> **Note:**` style (not a hard-bordered callout, since it's LOW severity and explicitly de-prioritized). Example model from `02-ous-architecture.md:63`:
```markdown
> **Note:** Apple does not publish a maximum OU count per tenant. Plans that assume a specific
> OU count ceiling should be treated as unverified until Apple publishes guidance or Phase 63
> portal verification provides empirical bounds.
```

---

### `docs/reference/ios-capability-matrix.md` (edit: +3 rows under Enrollment H2)
**Role:** doc (reference, matrix) — edit to existing file
**Analog:** `docs/reference/ios-capability-matrix.md` (self — read current row format)

**MANDATORY pre-edit anchor inventory** — before touching this file, the executor must record the current anchor inventory (PITFALL-6 / DA-4). The Phase 63 anchor inventory artifact mirrors `62-ANCHOR-INVENTORY.md` (referenced in `check-phase-62.mjs:41`).

**Existing table row format** — copy from Enrollment H2 (lines 15-29 of `ios-capability-matrix.md`):
```markdown
| Feature | Windows | macOS | iOS |
|---------|---------|-------|-----|
| Zero-touch enrollment method | Autopilot (hardware hash to Intune) | ADE via ABM (serial number to ABM) | ADE via ABM (serial number to ABM) |
```

**3 new rows to append** under the Enrollment H2 table (CONTEXT.md §OU-09: "3 incremental rows... under the existing Enrollment H2"):
- Row 1: Apple Business delegation surface (OU-scoped admin)
- Row 2: Shared iPad support
- Row 3: Managed Apple Account sign-in (enrollment-time account binding)

Row content must stay in the 3-column `Windows / macOS / iOS` format. Cells use the `🔒 supervised ADE only` / `N/A` / `Yes` / `No` value conventions already established in the matrix.

**Byte-unchanged constraint on sibling matrices** — `docs/reference/macos-capability-matrix.md` and `docs/reference/4-platform-capability-comparison.md` MUST NOT be modified. `check-phase-63.mjs` will assert byte-unchanged via checksum comparison.

---

### `docs/cross-platform/apple-business/02-ous-architecture.md` (edit: D-05 stale-ref fix at line 102)
**Role:** doc (architecture, reference) — atomic targeted edit to frozen Phase 62 file
**Analog:** `docs/cross-platform/apple-business/02-ous-architecture.md` (self)

**MANDATORY pre-edit anchor inventory** — PITFALL-6 requires inventorying all existing anchors before touching this frozen Phase 62 file.

**Current stale reference** (line 102 of `02-ous-architecture.md`):
```markdown
The Phase 63 VPP catalog consolidation runbook (`05-vpp-catalog-consolidation`, forthcoming)
carries the OP-9 untouched-OU hard-bordered callout ...
```

**Correct replacement** — reconcile to real Phase 63/64 targets:
- Phase 63 admin-setup doc: `07-vpp-content-token-consolidation.md` (OU-05, D-01)
- Phase 64 operational runbook: `11-vpp-catalog-runbook.md` (DELEG-01)

The replacement prose follows the "does not duplicate" pattern already present in lines 104-105:
```markdown
This concept doc does not duplicate that callout — refer to Phase 63
for the operational procedure.
```
Update to reference both targets. Keep the sentence "This concept doc does not duplicate that callout" intact — it is a stable anchor for the OP-9 deferral contract.

**Atomic edit rule** — this is the ONLY change to `02-ous-architecture.md` in Phase 63. Do not touch any other lines.

---

### `scripts/validation/check-phase-63.mjs`
**Role:** validator (Node ESM)
**Analog:** `scripts/validation/check-phase-62.mjs` (exact template)

**File header pattern** (lines 1-16 of `check-phase-62.mjs`) — adapt directly:
```javascript
#!/usr/bin/env node
// check-phase-63.mjs -- Phase 63 (Multi-OU Architecture & Apple Admin Setup) deliverables
// Source of truth: .planning/phases/63-multi-ou-architecture-apple-admin-setup/63-CONTEXT.md (D-01..D-06)
// File reads only: all content via fs.readFileSync; subprocess only for V-63-CHAIN + V-63-AUDIT
//
// Usage: node scripts/validation/check-phase-63.mjs [--verbose]
// Exit code: 0 if all V-63-NN PASS or SKIPPED; 1 if any FAIL.
```

**Imports pattern** (lines 18-22 of `check-phase-62.mjs`) — copy verbatim:
```javascript
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';
```

**readFile helper + VERBOSE flag** (lines 24-30) — copy verbatim.

**Path constants block** (lines 32-46 of `check-phase-62.mjs`) — adapt for Phase 63 paths:
```javascript
const AB_03 = 'docs/cross-platform/apple-business/03-ous-vs-custom-roles.md';
const AB_04 = 'docs/cross-platform/apple-business/04-custom-role-authoring.md';
const AB_05 = 'docs/cross-platform/apple-business/05-sub-org-admin-onboarding.md';
const AB_06 = 'docs/cross-platform/apple-business/06-mdm-server-assignment.md';
const AB_07 = 'docs/cross-platform/apple-business/07-vpp-content-token-consolidation.md';
const AB_08 = 'docs/cross-platform/apple-business/08-managed-apple-account-provisioning.md';
const AB_09 = 'docs/cross-platform/apple-business/09-shared-ipad-lifecycle.md';
const AB_10 = 'docs/cross-platform/apple-business/10-apple-tv-lifecycle.md';
const IOS_MATRIX = 'docs/reference/ios-capability-matrix.md';
const MACOS_MATRIX = 'docs/reference/macos-capability-matrix.md';
const PLATFORM_COMPARISON = 'docs/reference/4-platform-capability-comparison.md';
```

**CHAIN_PHASES pattern** (lines 45-66 of `check-phase-62.mjs`) — extend by adding 62 to the chain. Inherit CHAIN_SKIP set as appropriate (copy same pre-existing skip list and document Phase 63 adds none new):
```javascript
const CHAIN_PHASES = [48, 49, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62];
const CHAIN_SKIP = new Set([48, 51, 58, 60, 61]); // pre-existing failures unchanged
```

**Assertion object pattern** (lines 68-98 of `check-phase-62.mjs`) — each assertion follows the `{ id, name, run() { ... return { pass, detail } } }` shape. Required assertions for Phase 63:

```javascript
// V-63-01: all 8 new Phase 63 docs exist
// V-63-02: C16 anchor slug present in 09-shared-ipad-lifecycle.md
//   c.includes('## Which admin owns this pool?')
// V-63-03: OP-1 exclusion language in 04-custom-role-authoring.md
//   c.includes('DENY-by-default') && (c.includes('Manage MDM') || c.includes('MDM Servers'))
//   && NOT (bundle table includes 'Manage MDM Servers' as included row)
// V-63-04: OP-2 exclusion language in 04-custom-role-authoring.md
//   c.includes('Account Holder') && c.includes('EXCLUDED') or c.includes('DO NOT DELEGATE')
// V-63-05: OP-3 pairing in bundle (no orphan Manage)
// V-63-06: bundle size 4-6 (count included rows, assert 4 <= n <= 6)
// V-63-07: iOS matrix row count == 3 added rows under Enrollment H2
// V-63-08: byte-unchanged -- macos-capability-matrix.md (checksum or line-count baseline)
// V-63-09: byte-unchanged -- 4-platform-capability-comparison.md (checksum or line-count baseline)
// V-63-10: C15 framing guard on Phase 63 Apple docs (Intune/Entra/Conditional Access/Azure AD absent)
// V-63-11: D-05 stale-ref fixed -- 02-ous-architecture.md does NOT contain '05-vpp-catalog-consolidation'
// V-63-ANCHOR-INVENTORY: 63-ANCHOR-INVENTORY.md exists with Pre-edit git SHA entries for the 2 edited files
```

**FRONTMATTER-PARSE unit test** (lines 342-365 of `check-phase-62.mjs`) — copy verbatim. The `+` separator parser and `ALLOWED` set are stable (check that `shared-ipad` and `apple-tv` are in the set — they are, line 346).

**C15-UNIT synthetic test** (lines 388-408) — copy verbatim.

**Runner loop pattern** (lines 457-484 of `check-phase-62.mjs`) — copy verbatim, changing the console.log header to `check-phase-63`:
```javascript
console.log('check-phase-63 -- Phase 63 deliverables\n');
```

**V-63-SELF assertion** — analogous to V-62-SELF, assert CHAIN_PHASES does NOT include 63.

**V-63-AUDIT assertion** — same subprocess pattern, calls `v1.6-milestone-audit.mjs` and expects exit 0.

---

## Shared Patterns

### Frontmatter Block
**Source:** `docs/cross-platform/apple-business/02-ous-architecture.md` (lines 1-7)
**Apply to:** All 8 new Phase 63 doc files
```yaml
---
last_verified: 2026-05-21
review_by: 2026-07-20
applies_to: apple-business
audience: admin
platform: ios+macos
---
```
- For `09-shared-ipad-lifecycle.md`: use `platform: ios+shared-ipad`
- For `10-apple-tv-lifecycle.md`: use `platform: apple-tv`
- The 60-day `review_by` rule: `last_verified + 60 days` (2026-05-21 → 2026-07-20)

### Platform-Applicability Callout
**Source:** `docs/cross-platform/apple-business/02-ous-architecture.md` (lines 9-15)
**Apply to:** All 8 new Phase 63 doc files
```markdown
> **Platform applicability:** [scope sentence]. [Intune-side disambiguation if needed — wrap with ABAUDIT comment if C15 risk].
> [Glossary cross-link to _glossary-apple-business.md]
```

### C15 HTML-Comment Exemption
**Source:** `docs/cross-platform/apple-business/00-overview.md` (lines 10-11, 28-29)
**Apply to:** Any Phase 63 doc that must mention Intune for disambiguation (highest risk: `08-managed-apple-account-provisioning.md`)
```markdown
<!-- ABAUDIT-NN: [one-sentence rationale]; C15 regex 4 false-positive exemption (disambiguation clause) -->
```
Numbering: continue from ABAUDIT-03 (last used in `00-overview.md`). Phase 63 docs should start at ABAUDIT-04 and increment sequentially.

### Training-Data / Verification Notice
**Source:** `docs/cross-platform/apple-business/01-role-permission-model.md` (lines 15-21)
**Apply to:** `04-custom-role-authoring.md`, and any doc whose content depends on unverified Apple portal labels (e.g., `06-`, `07-`, `08-`)
```markdown
> **Training-data notice:** [Content description] is authored from AI training knowledge ...
> marked `[CITED: training; needs live verification]` pending live portal verification.
> Re-verification target: within 60 days of 2026-05-21 (by 2026-07-20).
```

### Forward-Reference Pattern for Phase 64 Runbooks
**Source:** `docs/cross-platform/apple-business/02-ous-architecture.md` (lines 102-105, 116)
**Apply to:** `06-`, `07-`, `08-` (all cross-link to Phase 64 runbooks)
```markdown
The [Phase 64] [runbook name] (`[filename]`, forthcoming) carries the [operational procedure].
This [concept/admin-setup] doc does not duplicate that [procedure/callout] — refer to Phase 64
for the operational runbook.
```

### Version History Table
**Source:** All Phase 62 docs (last section)
**Apply to:** All 8 new Phase 63 docs
```markdown
## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-21 | Phase 63: [description] | -- |
```

### Cross-References Section
**Source:** `docs/cross-platform/apple-business/02-ous-architecture.md` (lines 123-141)
**Apply to:** All 8 new Phase 63 docs
Use unordered list of `- [Link text](path)` items grouped by cross-reference type (same-phase peers, upstream Phase 62 SOT, downstream Phase 64 runbooks, glossary).

### Harness Assertion Shape
**Source:** `scripts/validation/check-phase-62.mjs` (lines 68-98)
**Apply to:** `check-phase-63.mjs` — all assertion objects
```javascript
{
  id: N, name: 'V-63-NN: [description]',
  run() {
    const c = readFile(PATH);
    if (c === null) return { pass: false, detail: PATH + ' missing' };
    if (!c.includes('REQUIRED_STRING')) return { pass: false, detail: 'REQUIRED_STRING missing' };
    return { pass: true, detail: '[confirmation message]' };
  }
},
```

---

## No Analog Found

All Phase 63 files have close analogs. No files require RESEARCH.md patterns as primary source.

| File | Note |
|------|------|
| (none) | All 11 files map to Phase 62 analogs |

---

## Metadata

**Analog search scope:** `docs/cross-platform/apple-business/`, `docs/reference/`, `scripts/validation/`
**Files read:** 6 analog files fully read
**Pattern extraction date:** 2026-05-21
