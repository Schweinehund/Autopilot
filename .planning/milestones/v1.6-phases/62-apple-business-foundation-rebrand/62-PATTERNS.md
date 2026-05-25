# Phase 62: Apple Business Foundation & Rebrand - Pattern Map

**Mapped:** 2026-05-21
**Files analyzed:** 19 (8 new + 8 modified + 3 planning-doc patches)
**Analogs found:** 18 / 19 (1 NEW artifact pattern v1.6 establishes)

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| **NEW — content** | | | | |
| `docs/_glossary-apple-business.md` | glossary (platform doc) | request-response (reference lookup) | `docs/_glossary-linux.md` | exact (most recent platform glossary; v1.5 Phase 49 lineage) |
| `docs/cross-platform/apple-business/00-overview.md` | overview/index (cross-platform tree root) | request-response | `docs/operations/00-index.md` | exact (v1.5 cross-platform tree top-level index; D-A1 explicitly models on operations/) |
| `docs/cross-platform/apple-business/01-role-permission-model.md` | reference catalog (multi-table) | request-response (lookup + cross-reference) | `docs/reference/android-capability-matrix.md` (structure) + `docs/operations/co-management/00-overview.md` (numbered-list pattern) | partial mirror (no exact analog for per-permission catalog; combine 2 sources) |
| `docs/cross-platform/apple-business/02-ous-architecture.md` | concept doc (architecture overview) | request-response | `docs/operations/co-management/00-overview.md` | exact (v1.5 ops concept doc with cross-platform applicability blockquote) |
| `docs/cross-platform/apple-business/_admin-directory.md` | template/convention doc (tenant-fillable) | request-response | `docs/_templates/admin-template-macos.md` | structural-only (template-shape match; placeholder convention differs `<TENANT_FILL_IN>` vs `[bracketed]`) |
| **NEW — harness** | | | | |
| `scripts/validation/v1.6-milestone-audit.mjs` | validator (mechanical-check harness) | batch/file-walk | `scripts/validation/v1.5-milestone-audit.mjs` | exact (Path-A copy source per D-A9; preserve C1-C13 verbatim) |
| `scripts/validation/v1.6-audit-allowlist.json` | data sidecar (exemption schema) | static config | `scripts/validation/v1.5-audit-allowlist.json` | exact (`{file, line, reason}` schema + new `sunset_phase` field) |
| `scripts/validation/check-phase-62.mjs` | per-phase validator (deliverable) | batch | `scripts/validation/check-phase-61.mjs` | exact (most recent in chain; same V-NN-NN runner shape) |
| **MODIFIED — corpus (surgical)** | | | | |
| `docs/_glossary.md` (+1 banner line) | glossary edit (top-of-file banner) | request-response | `docs/_glossary.md` lines 9-11 existing reciprocal block | role-match (extend existing reciprocal line pattern) |
| `docs/_glossary-macos.md` (+1 banner +1 see-also) | glossary edit (banner + inline) | request-response | `docs/_glossary-macos.md` line 66 `> See also:` precedent | role-match (extend inline see-also block; AEAUDIT-04 precedent) |
| `docs/_glossary-android.md` (+1 banner line) | glossary edit | request-response | same as _glossary.md | role-match |
| `docs/_glossary-linux.md` (+1 banner line) | glossary edit | request-response | same as _glossary.md | role-match |
| `docs/admin-setup-macos/01-abm-configuration.md` (+intro callout) | admin guide edit (intro section) | request-response | `docs/admin-setup-macos/01-abm-configuration.md` lines 9-11 existing intro blockquote | role-match (extend Platform-gate blockquote pattern) |
| `docs/admin-setup-ios/02-abm-token.md` (+intro callout) | admin guide edit (intro section) | request-response | same — lines 9-12 existing intro blockquote | role-match |
| **MODIFIED — planning** | | | | |
| `.planning/REQUIREMENTS.md` (AB-06 count patch) | planning-doc edit | static config | n/a (counting-error correction) | role-match (use traceability-comment template from check-phase-61 V-61-03) |
| `.planning/ROADMAP.md` (Phase 62 SC#4 count patch) | planning-doc edit | static config | n/a | role-match |
| `.planning/STATE.md` (D-A2 count patch) | planning-doc edit | static config | n/a | role-match |
| **NEW — phase artifact** | | | | |
| `.planning/phases/62-.../62-ANCHOR-INVENTORY.md` | pre-edit safety artifact | one-shot snapshot | none (NEW pattern v1.6 establishes) | **new pattern** (no v1.5 archived precedent — verified via Glob `.planning/phases/*/*ANCHOR*.md`) |

---

## Pattern Assignments

### `docs/_glossary-apple-business.md` (glossary, request-response)

**Analog:** `docs/_glossary-linux.md` (most recent platform glossary added in v1.5)
**Match quality:** Exact for structural shape; D-04 adds rebrand-mapping table at top (a Phase-62-specific extension).

**Frontmatter pattern** (`_glossary-linux.md` lines 1-7):
```yaml
---
last_verified: 2026-05-05
review_by: 2026-07-04
applies_to: both
audience: all
platform: Linux
---
```
*For v1.6 use `platform: ios+macos` (compound, requires `+` separator parser in harness) and `applies_to: apple-business`.*

**Reciprocal banner block pattern** (`_glossary-linux.md` lines 9-10):
```markdown
> **Platform coverage:** This glossary covers Linux-specific terminology for Intune-managed Ubuntu LTS devices.
> For Windows Autopilot terminology, see the [Windows Autopilot Glossary](_glossary.md). For Apple-platform terminology, see the [Apple Provisioning Glossary](_glossary-macos.md). For Android Enterprise terminology, see the [Android Enterprise Provisioning Glossary](_glossary-android.md).
```
*Mirror this exactly for `_glossary-apple-business.md`'s 4-way reciprocal opener, plus add the Phase-62-specific rebrand framing per D-04.*

**Alphabetical Index pattern** (`_glossary-linux.md` line 16):
```markdown
## Alphabetical Index

[ABM (Apple Business Manager)](#abm-apple-business-manager) | [APT repository](#apt-repository) | [COBO / COPE / WPCO](#cobo--cope--wpco) | ...
```
*Single line, pipe-separated, full `[term](#slug)` syntax. v1.6 uses CLEAN slugs only (D-04) — NO "(formerly X)" suffix in the H3 anchor.*

**H2 + H3 entry pattern** (`_glossary-linux.md` lines 20-44):
```markdown
## Distro & Lifecycle

### APT repository

A package repository served via the Advanced Package Tool (APT) protocol that Ubuntu's `apt` client reads...

> **Cross-platform note:** On Windows, the analog is BitLocker (drive-level encryption surfaced as a compliance signal). On macOS, the analog is FileVault... See the [Apple Provisioning Glossary](_glossary-macos.md) for FileVault key-management.
> See also: [MAM-WE](_glossary-macos.md#mam-we) (Apple).
```
*H2 = category header (Roles & Permissions, Organizational Units, Content Distribution, Federated Identity, Governance Operations per <specifics>). H3 = term, slug auto-generated from term name. Cross-platform-note blockquote + `> See also:` line below where reciprocity applies.*

**First-mention parenthetical convention** (carried forward from v1.5 Linux):
- Linux first-mention: `Ubuntu LTS — Canonical's biennial LTS release cadence...` (line 64)
- v1.6 first-mention per D-04: `Organizational Unit (OU) (formerly Location)` in NEW v1.6 docs (NOT in H3 heading).

**Watch-outs:**
- **PITFALL-6:** `_glossary-apple-business.md` is new — no anchor inventory needed for it; but the 4 *existing* glossaries it adds banner lines to ALL require pre-edit inventory in `62-ANCHOR-INVENTORY.md`.
- **D-04 slug stability:** Per-entry H3 headers MUST use CLEAN slugs (`### Organizational Unit`), NOT `### Organizational Unit (formerly Location)` — the parenthetical suffix would generate slug `organizational-unit-formerly-location` and break downstream `#organizational-unit` cross-links (HARD-FAIL).
- **Sixth glossary node:** Counting from v1.6 forward, this is the 5th glossary (per D-05 corrected count); D-A2 split-architecture says "6th node" but that's a v1.6-forward addition to 4 existing + this one + Windows = 5 of platform glossaries.
- **`> See also:` inline reciprocity:** New v1.6 cross-references TO this glossary appear in `_glossary-macos.md` ABM entry (line 67); follow the existing `> See also: [...](file.md#anchor) (Platform).` shape EXACTLY (no "(Apple)" suffix on entries pointing to Apple-Business glossary — use "(Apple Business)").

---

### `docs/cross-platform/apple-business/00-overview.md` (overview/index, request-response)

**Analog:** `docs/operations/00-index.md`
**Match quality:** Exact — v1.5 ops tree top-level index is the explicit model per D-A1 ("modeled on v1.5 `docs/operations/`").

**Frontmatter pattern** (`operations/00-index.md` lines 1-7):
```yaml
---
last_verified: 2026-05-01
review_by: 2026-06-30
applies_to: all
audience: admin
platform: cross-platform
---
```
*For Phase 62: `last_verified: 2026-05-21`, `review_by: 2026-07-20` (60-day rule per v1.5 carry-over), `applies_to: apple-business`, `audience: admin`, `platform: ios+macos`. The `+` separator parser in v1.6 harness must validate this.*

**H1 + intro pattern** (`operations/00-index.md` lines 9-12):
```markdown
# Operations

This index covers operational depth guides for Intune-managed fleets. Guides are grouped by
operational domain.
```
*For 00-overview.md: H1 = "Apple Business Governance Overview"; intro = scope statement + cross-references to glossary + role/permission model + OUs architecture.*

**H2 + table pattern** (`operations/00-index.md` lines 14-25):
```markdown
## Co-Management

Windows ConfigMgr-to-Intune co-management guidance — workload slider model, migration sequence,
tenant attach disambiguation, and Windows Autopatch prerequisites.

| Guide | Covers |
|-------|--------|
| [Overview: Workload Model](co-management/00-overview.md) | 7 workloads, 3 slider states, Pilot Intune disambiguation |
| [Windows Tenant Attach](co-management/01-windows-tenant-attach.md) | Tenant attach vs full co-management |
```
*For Phase 62: H2 sections for "Governance Foundation" (links to glossary + role/permission + OUs + admin-directory). Later phases extend with H2 sections for "Delegation Runbooks" (Phase 64), "L1/L2 Quick Reference" (Phase 65), etc. — but Phase 62 SHIPS ONLY the initial H2 + the canonical rebrand callout #1.*

**Rebrand callout pattern** (Phase 62 introduces — no v1.5 analog):
```markdown
> **Rebrand notice (2026-04-14):** Apple Business Manager (ABM) became **Apple Business** on
> 2026-04-14. This documentation uses the new terminology throughout. Legacy term "Apple Business
> Manager" is searchable via the [Apple Business Governance Glossary](../../_glossary-apple-business.md)
> rebrand-mapping table. See also: Apple's [transition announcement](https://support.apple.com/guide/apple-business-manager/apple-business-manager-is-now-apple-business-axmd79d79dea/web).
```
*MUST contain all 3 C14 tokens ("Apple Business Manager", "Apple Business", "2026-04-14") within first 50 lines per C14 regex (62-RESEARCH.md §2).*

**Version History pattern** (`operations/00-index.md` lines 62-66):
```markdown
## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-01 | Phase 59 (CLEAN-08): added 3 new H2 sections ... | -- |
```
*Phase 62 first-version row: `2026-05-21 | Phase 62: tree founded; rebrand callout #1; style-guide HTML-comment convention published | --`.*

**Style-guide HTML comment block convention pattern** (Phase 62 deliverable, v1.4.1 AEAUDIT-04 precedent):
```html
<!-- ABAUDIT-{##}: {one-sentence intent} -->
```
*Phase 62 publishes ONLY the convention definition (1 section in 00-overview.md or dedicated `_style-guide.md`). Phase 64's `18-cross-org-boundary-cheat-sheet.md` will carry actual exemption blocks.*

**Watch-outs:**
- **C14 BLOCKING:** All 3 tokens MUST appear in first 50 lines of this file. Authoring error = harness exit 1.
- **D-A1 directory placement:** `docs/cross-platform/apple-business/` — NOT `docs/admin-setup-apple-business/` and NOT 6th platform under `docs/`. The cross-platform tree designation is load-bearing.
- **No nav-file edits:** Phase 62 does NOT modify `docs/operations/00-index.md` to add an Apple Business H2 — that's Phase 65 navigation-last work per D-A10.

---

### `docs/cross-platform/apple-business/01-role-permission-model.md` (reference catalog, request-response)

**Analog:** `docs/reference/android-capability-matrix.md` (multi-table structure) + `docs/operations/co-management/00-overview.md` (numbered-list role-pattern)
**Match quality:** Partial mirror — no exact analog for a per-permission catalog with ~50-80 rows; combine 2 sources.

**Frontmatter pattern** (use `_glossary-linux.md` shape with `applies_to: apple-business`, `audience: admin`).

**Intro callout — Account Holder DO-NOT-DELEGATE pattern** (OP-2 prevention; novel for v1.6):
```markdown
> **Critical (OP-2):** The **Account Holder** role MUST NOT be delegated to a sub-organization admin.
> The Account Holder is the tenant-level Apple Business owner with irrevocable lockout-recovery
> authority. Delegating this role to a sub-org admin creates an Account Holder lockout vulnerability
> (PITFALLS.md OP-2 / DA-2). Custom roles for sub-org admins MUST be built from preset roles +
> per-permission grants, NEVER by elevating to Account Holder.
```
*Mirror the blockquote shape from `operations/co-management/00-overview.md` "DEPRECATED" callouts; add explicit OP-2 reference.*

**Numbered-list role-pattern** (`operations/co-management/00-overview.md` lines 40-66):
```markdown
1. **Compliance Policies** — Device compliance policy enforcement (e.g., minimum OS version,
   BitLocker encryption, antivirus signature freshness). Lowest migration risk; typically the
   first workload moved to Intune.
2. **Windows Update Policies** — Windows Update for Business deferral and ring assignment
   policies. Required for Windows Autopatch enablement...
```
*Use this exact bold-term + em-dash + description shape for the 4 top-level Apple Business roles (Account Holder, IT Administrator, People Administrator, Content Administrator) and the 5 preset custom roles.*

**Per-permission catalog table pattern** (recommended row schema from 62-RESEARCH §1):
```markdown
| Subgroup | Permission | Scope | Edit / View | OP-1 flag | OP-3 companion View | Apple anchor |
|----------|------------|-------|-------------|-----------|---------------------|--------------|
| Basic Organization | View org profile | tenant | View-only | always-grant | — | axm97dd59159 |
| Devices | Manage MDM Servers | tenant | Edit+bundle | DENY-by-default | (bundled superprivilege; OP-1) | axm97dd59159 |
| People | Reset Shared iPad passcode | OU | Edit | conditionally-grant | View Devices | axm97dd59159 |
```
*7 H2 subgroup section anchors (Basic Organization / Organization Access / API+OAuth / People / Devices / AppleCare / Apps & Books) per D-02; ~50-80 rows total from the 1-hour manual scrape.*

**Edit-without-View dependency table pattern** (OP-3 prevention, novel for v1.6):
```markdown
| Edit permission | Required companion View | Blank-UI symptom |
|----------------|------------------------|-----------------|
| Assign devices to MDM server | View Devices | Devices tab shows empty list |
| Edit OUs | View OUs | OU list shows empty |
```
*See 62-RESEARCH §1 lines 230-244 for the 7-row seed; full table populated during manual scrape.*

**Watch-outs:**
- **PITFALL-7 whitelist-first:** "Manage MDM Servers" must carry `DENY-by-default` flag in the catalog table per OP-1 + STATE.md Patterns-carried-forward line 106.
- **Apple URL anchors:** Use Apple's article IDs (`axm97dd59159`, etc.) in the rightmost column — these are the canonical SOT references for downstream Phase 63 `04-custom-role-authoring.md` to cite.
- **Brand-related subgroups exclusion:** Per D-02 reject acknowledged with pointer "see Apple official docs"; log in `c13_rotting_external` sidecar.
- **D-A10 ordering:** This file establishes the SOT that Phase 63's `04-custom-role-authoring.md` cites — do not defer the catalog to Phase 63.

---

### `docs/cross-platform/apple-business/02-ous-architecture.md` (concept doc, request-response)

**Analog:** `docs/operations/co-management/00-overview.md`
**Match quality:** Exact — v1.5 ops concept doc with cross-platform applicability blockquote and numbered concept list.

**Frontmatter + platform-applicability blockquote** (`operations/co-management/00-overview.md` lines 1-20):
```markdown
---
last_verified: 2026-04-27
review_by: 2026-06-26
applies_to: all
audience: admin
platform: Windows
---

> **Platform applicability:** This guide is Windows-specific (ConfigMgr + Intune co-management).
> **macOS:** No co-management equivalent — Microsoft Intune does not federate with Jamf at the
> workload-slider level...
```
*For Phase 62: `applies_to: apple-business`, `platform: ios+macos`. Platform-applicability blockquote becomes "Apple Business OUs are the Apple-side delegation primitive; no direct Intune-side analog (see Intune scope tags for closest Microsoft-side concept disambiguation)."*

**H1 + intro pattern** (line 22):
```markdown
# Co-Management Overview: ConfigMgr Workload Model

This guide covers the Windows ConfigMgr-to-Intune co-management workload model for Intune
administrators. Seven workloads can each be migrated independently from ConfigMgr to Intune
management using per-workload slider controls. This overview explains the slider model, the seven
workloads, and how to plan a migration.
```
*For Phase 62 02-ous-architecture.md: H1 = "Organizational Units (OUs) Architecture"; intro = OU primitive + flat-by-default + Locations→OUs migration framing.*

**OU scoping table pattern** (no exact v1.5 analog — combine from co-management workload table + capability-matrix-style rows):
```markdown
## OU Scope Coverage

| Resource | OU-scoped? | Notes |
|----------|-----------|-------|
| Devices | Yes | Per-OU device pool; reassignment via MDM server transfer |
| Content tokens | Yes | Per-OU token; 1-year validity; OU-scoped allocation |
| MDM servers | Yes | One MDM server per OU; assignment cascade |
| Managed Apple Accounts | Yes | Per-OU account scope; federation per-OU |
| Role assignments | Yes | Custom roles scoped to specific OU |
| Audit logs | Partial | Cross-OU visibility deferred to Phase 64 3×3 matrix |
```
*5-6 rows minimum per D-A7 (devices, content tokens, MDM servers, accounts, role assignments are first-class).*

**Watch-outs:**
- **D-A8 cross-link contract:** This file links OUT to `_glossary-apple-business.md` freely. Existing matrices (`ios-capability-matrix.md`, `macos-capability-matrix.md`, `4-platform-capability-comparison.md`) are READ-ONLY in Phase 62 — do not modify them.
- **No nesting depth claim:** Per Deferred Ideas line 235, OU sub-OU nesting depth verification is Phase 63 portal work — describe as "flat by default; legacy ABM supported one nesting level (subject to Phase 63 portal verification)".
- **Locations→OUs migration framing:** This is in the rebrand-mapping table in the glossary; here describe the conceptual continuity, not the rebrand event itself.

---

### `docs/cross-platform/apple-business/_admin-directory.md` (tenant-fillable template, request-response)

**Analog:** `docs/_templates/admin-template-macos.md`
**Match quality:** Structural-only — template-shape match (frontmatter + sections + placeholder convention). Placeholder convention DIFFERS (`<TENANT_FILL_IN>` vs `[bracketed]`).

**Header HTML comment pattern** (`admin-template-macos.md` lines 1-17):
```html
<!-- MACOS ADMIN SETUP GUIDE TEMPLATE
     Usage: Copy this file as your starting point for any macOS admin configuration guide.
     Rules:
     - Fill in all YYYY-MM-DD dates (review_by = last_verified + 90 days)
     - Set platform to macOS (this template is macOS-specific)
     - Replace all [bracketed placeholders] with actual content
     ...
     Reviewer: macOS Platform Lead (role, not person name)
-->
```
*For `_admin-directory.md`: rewrite header HTML comment as "APPLE BUSINESS OU ADMIN DIRECTORY TEMPLATE — Usage: Tenant copies this file and replaces `<TENANT_FILL_IN>` placeholders. Default upstream copy ships with placeholders ONLY (no tenant-specific data per D-A8 read-only contract)."*

**Frontmatter** (`admin-template-macos.md` lines 18-23):
```yaml
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
audience: admin
platform: macOS
---
```
*Phase 62 ships the upstream template with actual dates (`2026-05-21` / `2026-07-20`), `audience: l1`, `platform: ios+macos`, `applies_to: apple-business`. The `<TENANT_FILL_IN>` placeholder convention applies ONLY to body content, NOT frontmatter dates.*

**Tenant-fillable section pattern** (extend from `admin-template-macos.md` lines 64-74 Verification + Configuration-Caused Failures tables, but with `<TENANT_FILL_IN>` placeholders):

See 62-CONTEXT.md `<specifics>` lines 179-211 for the full skeleton — adopt verbatim:

```markdown
## Per-OU Admin Holder Lookup

| OU | Account Holder (Managed Apple Account) | Delegation Contact | Backend |
|---|---|---|---|
| <TENANT_FILL_IN> | <TENANT_FILL_IN> | <TENANT_FILL_IN> | <TENANT_FILL_IN> |
```

**Watch-outs:**
- **Placeholder convention difference:** v1.5 templates use `[bracketed]` for authoring guidance (replaced before publish). Phase 62 `_admin-directory.md` is DIFFERENT — `<TENANT_FILL_IN>` placeholders SURVIVE publish (default upstream copy ships with them as-is). This is the L1 lookup-convention DELIVERABLE per D-01, not a v1.5-style authoring template.
- **C16 cross-link target:** This file is a stable file-level anchor target for Phase 65 L1 #34 cross-link (`05-sub-org-admin-onboarding.md#which-admin-owns-this-pool` resolves through this file's path). PITFALL-6 anchor stability is at FILE-PATH level (the path itself), not section level — do not rename the file.
- **D-A8 read-only contract:** No tenant-specific data in upstream corpus. Placeholders ONLY.

---

### `scripts/validation/v1.6-milestone-audit.mjs` (validator harness, batch/file-walk)

**Analog:** `scripts/validation/v1.5-milestone-audit.mjs`
**Match quality:** Exact — Path-A copy source per D-A9; preserve C1-C13 verbatim; layer C14/C15/C16 + `+` separator parsing.

**Shebang + header banner pattern** (`v1.5-milestone-audit.mjs` lines 1-14):
```javascript
#!/usr/bin/env node
// v1.5 Milestone Audit Harness (Path A copy of v1.4.1 + C10 blocking + C11/C12/C13 informational-first + C6/C7 promoted to blocking)
// Source of truth: .planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-CONTEXT.md (D-01..D-23)
// Sidecar allow-list: scripts/validation/v1.5-audit-allowlist.json  (inherited v1.4.1 schema + Linux/ops-domain arrays added lazily)
// Frozen-predecessor reproducibility anchor: v1.4.1-milestone-audit.mjs pinned at Phase 47 close
// File reads only: all content loaded via fs.readFileSync; no shell invocations.
```
*For v1.6: "v1.6 Milestone Audit Harness (Path A copy of v1.5 + C14/C15/C16 blocking-from-start + `+` separator parsing); Source of truth: .planning/phases/62-.../62-CONTEXT.md (D-01..D-05); Sidecar allow-list: scripts/validation/v1.6-audit-allowlist.json (new sidecar with c13_rotting_external + c16_missing_endpoint_exemptions categories); Frozen-predecessor reproducibility anchor: v1.5-milestone-audit.mjs pinned at Phase 61 close."*

**Imports pattern** (lines 32-34):
```javascript
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
```
*Keep identical.*

**Helper functions to preserve verbatim** (lines 41-86):
- `readFile(relPath)` — CRLF normalization per Phase 31 ca40eb9
- `walkMd(dir)` — recursive .md walker
- `parseAllowlist()` — JSON sidecar loader with graceful degradation
- `relNormalize(abs)` — Windows backslash → forward slash

**Scope-enumeration function pattern** (lines 89-179 — `androidDocPaths()`, `linuxDocPaths()`):
*Add a new `appleBusinessDocPaths()` function that enumerates `docs/cross-platform/apple-business/**/*.md` + the 4 modified glossaries + the 3 canonical rebrand callout sites. Mirror the `linuxDocPaths()` structure exactly (root singletons + directory walks + L1/L2 number-range matching + `_` directory-segment exclusion).*

**Check definition pattern** (lines 185-220):
```javascript
{
  id: 1,
  name: 'C1: Zero SafetyNet as compliance mechanism',
  run() {
    const violations = [];
    for (const relPath of androidDocPaths()) {
      const content = readFile(relPath);
      if (!content) continue;
      // ... regex + allowlist check ...
    }
    if (violations.length === 0) return { pass: true };
    return { pass: false, detail: violations.length + ' un-exempted ... ' };
  }
}
```
*C14/C15/C16 follow this exact `{id, name, run()}` shape with `{pass, detail}` return.*

**C12 link-not-copy pattern** (lines 547-595) — preserve verbatim for the 240-cell math regression guard on `4-platform-capability-comparison.md` (UNCHANGED in v1.6 per D-A3).

**Runner pattern** (lines 622-658):
```javascript
const LABEL_WIDTH = 56;
function padLabel(s) { ... }
let passed = 0, failed = 0, skipped = 0;
for (const check of checks) { ... }
process.stdout.write('\nSummary: ' + passed + ' passed, ' + failed + ' failed, ' + skipped + ' skipped\n');
process.exit(failed > 0 ? 1 : 0);
```
*Preserve verbatim.*

**Watch-outs:**
- **C14 50-line scan window** (62-RESEARCH §2): scan first 50 lines only for token-set membership of all 3 tokens (`Apple Business Manager`, `Apple Business`, `2026-04-14`) — proximity matching is too fragile.
- **C15 8-regex seed** (62-RESEARCH §3): use bounded wildcards `.{0,40}` / `.{0,60}` not greedy `.*`; case-insensitive `/i`; HTML-comment exemption parsing for `<!-- ABAUDIT-{##}: ... -->` blocks (v1.4.1 AEAUDIT-04 precedent).
- **C16 missing-endpoint exemption check** (62-RESEARCH §4): sidecar entries MUST have non-null `sunset_phase` — harness rejects exemptions without removal contracts.
- **`+` separator parser** (62-RESEARCH §5): `parsePlatformValue(rawValue)` returns `{valid, atoms, compound, error}`; ALLOWED_PLATFORMS set must include `apple-business`, `shared-ipad`, `apple-tv`, `ipados`, `tvos`. Backward-compatible with single-value `platform: ios`.
- **Path-A invariant:** C1-C13 byte-for-byte identical to v1.5 except where line-shift due to additions; the v1.5 LABEL_WIDTH=56 may need bumping to 60 (matches check-phase-61.mjs line 378) to accommodate longer C14/C15/C16 check names.
- **Atomic-commit contract** (v1.5 Plan 60-08 precedent): this file + sidecar + check-phase-62.mjs land in ONE commit; harness MUST exit 0 immediately on that commit.

---

### `scripts/validation/v1.6-audit-allowlist.json` (data sidecar, static config)

**Analog:** `scripts/validation/v1.5-audit-allowlist.json`
**Match quality:** Exact — `{file, line, reason}` schema preserved; new `sunset_phase` field added per D-03.

**Schema header pattern** (`v1.5-audit-allowlist.json` lines 1-4):
```json
{
  "schema_version": "1.0",
  "generated": "2026-05-06T00:00:00Z",
  "phase": "60-audit-harness-v1-5-finalization",
```
*For v1.6: `"phase": "62-apple-business-foundation-rebrand"`, `"generated": "2026-05-21T00:00:00Z"`, `"schema_version": "1.1"` (bump for `sunset_phase` field addition).*

**Per-entry `{file, line, reason}` shape** (lines 5-10):
```json
"safetynet_exemptions": [
  {"file": "docs/_glossary-android.md", "line": 185, "reason": "Phase 60 Plan 06: line 183 shifted +2 ..."}
],
```
*Carry over all v1.5 exemption arrays verbatim (Path-A copy invariant — preserves predecessor reproducibility).*

**NEW category `c16_missing_endpoint_exemptions`** (per D-03 / 62-CONTEXT.md `<specifics>` lines 170-178):
```json
"c16_missing_endpoint_exemptions": [
  {"file": "docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md", "reason": "Phase 65 deliverable per ABNAV-01; lands with all 4 edges per C16 triangle contract", "sunset_phase": "65"},
  {"file": "docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md", "reason": "Phase 64 deliverable per DELEG-02; admin-context canonical doc for L1 #34 cross-link", "sunset_phase": "64-65"},
  {"file": "docs/common-issues.md#apple-business-governance-failure-scenarios", "reason": "Phase 65 deliverable per ABNAV-03; inbound H2 section append-only", "sunset_phase": "65"},
  {"file": "docs/quick-ref-l1.md#apple-business-quick-reference", "reason": "Phase 65 deliverable per ABNAV-04; inbound H2 section append-only", "sunset_phase": "65"}
]
```

**NEW category `c13_rotting_external`** (per CONTEXT.md `<deferred>` line 238 — tracks ~30 legacy ABM URL references):
```json
"c13_rotting_external": [
  {"file": "<file>", "line": <NN>, "url": "<legacy URL>", "reason": "v1.7+ corpus sweep candidate per Q5(b)", "category": "rotting_legacy_abm"}
]
```
*Phase 62 ships this category with the seed entries logged during the manual scrape; quarterly audit category for v1.7+.*

**Watch-outs:**
- **`sunset_phase` is REQUIRED for c16 entries** — harness rejects exemptions without it (no exemption lives forever).
- **`carry-over annotation`** convention from v1.5 (line 6 "Phase 60 Plan 06: line 183 shifted +2 ...") preserves shift history. v1.6 inherits v1.5 entries verbatim; new entries do not need carry-over annotations until first shift event.
- **Trailing newline:** JSON file MUST end with newline (matches v1.5 line 80 trailing `}\n`).

---

### `scripts/validation/check-phase-62.mjs` (per-phase validator, batch)

**Analog:** `scripts/validation/check-phase-61.mjs`
**Match quality:** Exact — Path-A copy of most recent chain validator.

**Shebang + header banner pattern** (`check-phase-61.mjs` lines 1-15):
```javascript
#!/usr/bin/env node
// check-phase-61.mjs -- Phase 61 close-gate validation harness
// Source of truth: .planning/phases/61-gap-closure-terminal-re-audit-milestone-close/61-CONTEXT.md
// File reads only: all content via fs.readFileSync; subprocess only for V-61-CHAIN, V-61-AUDIT, V-61-SELF-TEST
//
// 34 V-61-NN structural assertions per CONTEXT D-24 covering:
//   REQUIREMENTS.md active-section zero-count + ROADMAP §Progress complete
//   PROJECT.md Validated + Closed Deferred Items + audit doc frontmatter + body sections
//   MILESTONES.md v1.5 entry + chain regression + harness exit 0 + self-test exit 0
//
// Lineage: Phase 48 D-25 → Phase 49 D-NN → ... → Phase 60 D-21/D-22 → Phase 61 D-24
```
*For Phase 62: "check-phase-62.mjs -- Phase 62 (Apple Business Foundation & Rebrand) deliverables; ~20-25 V-62-NN assertions covering 1 glossary + 4 banner lines + 1 inline see-also + 3 callout sites + harness exit-0 + sidecar shape + check-phase-62.mjs itself + 4 new content docs."*

**Imports + helpers** (lines 16-28):
```javascript
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}
```
*Keep identical.*

**Path constants pattern** (lines 30-36):
```javascript
const HARNESS = 'scripts/validation/v1.5-milestone-audit.mjs';
const PIN_HELPER = 'scripts/validation/regenerate-supervision-pins.mjs';
const REQUIREMENTS = '.planning/REQUIREMENTS.md';
const ROADMAP = '.planning/ROADMAP.md';
...
```
*For Phase 62: `HARNESS = 'scripts/validation/v1.6-milestone-audit.mjs';` + new constants for the 8 Phase-62 corpus paths.*

**CHAIN_PHASES pattern** (lines 38-42):
```javascript
const CHAIN_PHASES = [48, 49, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];
// Phase 50 stub excluded
```
*For Phase 62: extend to `[48, 49, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61]` (add 61 since check-phase-61.mjs now exists).*

**Check-definition pattern** (lines 44-92):
```javascript
const checks = [
  {
    id: 1, name: "V-61-01: REQUIREMENTS.md active-section has zero unchecked [ ] reqs ...",
    run() {
      const c = readFile(REQUIREMENTS);
      if (c === null) return { pass: false, detail: 'REQUIREMENTS.md missing' };
      // ... assertion logic ...
      return { pass: true, detail: 'active section: 0 unchecked [ ] reqs' };
    }
  },
  ...
];
```
*Mirror this exact `{id, name, run() => {pass, detail}}` shape. Phase 62 checks per 62-RESEARCH.md §9 Phase Requirements → Test Map table (V-62-01..V-62-11 + V-62-CHAIN + V-62-AUDIT + V-62-SELF + per-C14/C15/C16 unit-test variants).*

**Chain regression-guard loop pattern** (lines 318-341):
```javascript
for (let i = 0; i < CHAIN_PHASES.length; i++) {
  const phaseNum = CHAIN_PHASES[i];
  const id = 21 + i;
  checks.push({
    id: id,
    name: `V-61-${String(id).padStart(2, '0')}: check-phase-${phaseNum}.mjs exits 0 (CHAIN regression-guard)`,
    run() { ... execFileSync('node', [path], ...) ... }
  });
}
```
*Verbatim — extends chain to include check-phase-61.mjs.*

**Harness-exit-0 subprocess check pattern** (lines 343-358):
```javascript
checks.push({
  id: 33, name: "V-61-33 (V-61-AUDIT): v1.5-milestone-audit.mjs exits 0 in fully-blocking mode (12/12 PASS)",
  run() {
    try {
      execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 60000, cwd: process.cwd() });
      return { pass: true, detail: 'harness exits 0' };
    } catch (err) { ... isMissing ENOENT-handling ... }
  }
});
```
*For Phase 62: assert v1.6-milestone-audit.mjs exits 0 (with c16_missing_endpoint_exemptions sunset_phase '65' entries in place).*

**Runner loop pattern** (lines 377-404):
```javascript
const LABEL_WIDTH = 60;
function padLabel(s) { ... }
let passed = 0, failed = 0, skipped = 0;
console.log('check-phase-61 -- Phase 61 deliverables\n');
for (const check of checks) { ... }
process.stdout.write('\nResult: ' + passed + ' PASS, ' + failed + ' FAIL, ' + skipped + ' SKIPPED\n');
process.exit(failed > 0 ? 1 : 0);
```
*Keep identical with `check-phase-62` label.*

**Watch-outs:**
- **Self-reference**: V-62-SELF (harness exit-0 check) is for v1.6-milestone-audit.mjs; check-phase-62.mjs does NOT call itself recursively.
- **ENOENT graceful-skip pattern** (lines 334-336, 352-354): preserve for cross-platform Windows/Linux `node` path resolution.
- **`+` separator unit test** per 62-RESEARCH §5 / §9: V-62-C14-UNIT pattern includes synthetic-content tests of `parsePlatformValue('ios+macos+shared-ipad')` returning valid + `parsePlatformValue('ios+notaplatform')` returning invalid.

---

### `docs/_glossary.md` + `_glossary-macos.md` + `_glossary-android.md` + `_glossary-linux.md` (banner-line edits, request-response)

**Analog:** `docs/_glossary-linux.md` lines 9-10 existing reciprocal block
**Match quality:** Role-match — extend existing reciprocal-line pattern.

**Existing reciprocal block pattern** (`_glossary-linux.md` lines 9-10):
```markdown
> **Platform coverage:** This glossary covers Linux-specific terminology for Intune-managed Ubuntu LTS devices.
> For Windows Autopilot terminology, see the [Windows Autopilot Glossary](_glossary.md). For Apple-platform terminology, see the [Apple Provisioning Glossary](_glossary-macos.md). For Android Enterprise terminology, see the [Android Enterprise Provisioning Glossary](_glossary-android.md).
```

**Phase 62 reciprocal banner line to insert in each of 4 existing glossaries** (per 62-CONTEXT.md `<specifics>` line 158, INSERT at the END of existing reciprocal blockquote — typically after line 10/11/12 of each glossary):
```markdown
> **Apple Business governance:** For Apple Business delegated permission terminology (Organizational Units, custom roles, Managed Apple Account, content tokens), see the [Apple Business Governance Glossary](_glossary-apple-business.md).
```

**Inline see-also at `_glossary-macos.md` ABM entry** (line ~67 area; existing precedent at line 66):
```markdown
> **Windows equivalent:** No direct single equivalent. Device enrollment is managed in the [Intune admin center]...
> See also: [ABM (Apple Business Manager)](_glossary-linux.md#abm-apple-business-manager) (Linux).
```
*Phase 62 APPENDS a second `> See also:` line after the existing one:*
```markdown
> See also: [Apple Business](_glossary-apple-business.md#apple-business) (renamed 2026-04-14; ABM Token → content token rebrand mapping).
```

**Watch-outs:**
- **PITFALL-6 anchor inventory mandatory:** All 4 glossaries require pre-edit anchor snapshot in `62-ANCHOR-INVENTORY.md`. The alphabetical-index line and every H3 anchor must be byte-identical pre/post (verified by check-phase-62.mjs V-62-06..V-62-10).
- **Append-only contract:** Banner line goes at TOP of file (after frontmatter, after existing reciprocal blockquote). Inline see-also at `_glossary-macos.md` ABM entry is APPENDED to existing `> See also:` block — do not rewrite the existing one.
- **D-A8 cross-link contract:** These are the ONLY existing-glossary modifications permitted in Phase 62. No other content changes.
- **AB-06 count semantics:** 4 glossaries × 1 banner line each = 4 banner lines. Plus 1 inline see-also at `_glossary-macos.md` ABM entry (which is one of the 4 receiving a banner). Total 5 surgical edits across the 4 existing glossaries.

---

### `docs/admin-setup-macos/01-abm-configuration.md` + `docs/admin-setup-ios/02-abm-token.md` (intro callout edits, request-response)

**Analog:** Existing intro Platform-gate blockquote at lines 9-11 of `01-abm-configuration.md` and lines 9-12 of `02-abm-token.md`
**Match quality:** Role-match — extend existing Platform-gate blockquote pattern with the canonical rebrand callout (C14 token-set).

**Existing intro pattern** (`01-abm-configuration.md` lines 9-11):
```markdown
> **Platform gate:** This guide covers macOS ADE configuration via Apple Business Manager and Intune.
> For Windows Autopilot setup, see [Windows Admin Setup Guides](../admin-setup-apv1/00-overview.md).
> For macOS provisioning terminology, see the [macOS Glossary](../_glossary-macos.md).
```

**Phase 62 rebrand callout to PREPEND or INSERT after the existing Platform-gate blockquote** (must contain 3 C14 tokens within first 50 lines):
```markdown
> **Rebrand notice (2026-04-14):** Apple Business Manager (ABM) became **Apple Business** on
> 2026-04-14. This guide retains the legacy "ABM" terminology for portal-navigation continuity but
> uses the new "Apple Business" framing in cross-references. See the [Apple Business Governance Glossary](../_glossary-apple-business.md) for the full rebrand-mapping table.
```
*Insert AFTER the existing Platform-gate blockquote (which is on lines 9-11) and BEFORE the H1 title (line 13). All 3 C14 tokens — "Apple Business Manager", "Apple Business", "2026-04-14" — present.*

**Watch-outs:**
- **PITFALL-6 anchor inventory mandatory:** Both files require pre-edit H2/H3 anchor snapshot in `62-ANCHOR-INVENTORY.md`. The existing H2 ("Prerequisites", "Steps", "How iOS ADE Token Setup Differs from macOS", etc.) and all H3 anchors must be byte-identical pre/post.
- **Append-only to intro section:** Callout is INSERTED in the intro region (between Platform-gate blockquote and H1). Zero existing headings renamed. The frontmatter `last_verified` date MUST also be updated to `2026-05-21` (touching the file resets the 60-day freshness clock).
- **C14 BLOCKING:** All 3 tokens MUST appear within first 50 lines per harness regex (62-RESEARCH §2). Authoring error = harness exit 1.
- **Q5(b) no-corpus-sweep:** ONLY these 2 intro callouts + 00-overview.md = 3 canonical rebrand sites total. The existing ~30 ABM references throughout v1.0-v1.5 corpus remain UNCHANGED (tracked as `c13_rotting_external` for v1.7+).

---

### `.planning/REQUIREMENTS.md` + `ROADMAP.md` + `STATE.md` (count-correction patch, static config)

**Analog:** Traceability-comment template from `check-phase-61.mjs` V-61-03 line 78 (`— completed YYYY-MM-DD in Phase NN`)
**Match quality:** Role-match — this is the inverse operation (correcting a count, not flipping a req), but the inline-footnote convention from v1.5 carries.

**Existing traceability-comment pattern** (`check-phase-61.mjs` line 78):
```javascript
const traceable = (activeSection.match(/^- \[x\] \*\*[A-Z]+-[0-9]+\*\*[^\n]*— completed [0-9]{4}-[0-9]{2}-[0-9]{2} in Phase /gm) || []).length;
```
*Phase 62 D-05 patches use a similar inline-footnote convention:*

**Patch pattern** (per 62-CONTEXT.md `<specifics>` lines 213-217):
```markdown
- **AB-06** — 4 existing platform glossaries gain one reciprocal banner line each¹
  ¹ `_glossary-macos.md` covers macOS + iOS/iPadOS per its line-9 header — single Apple glossary, not separate macOS/iOS files. Count corrected from "5" to "4" during Phase 62 execution per D-05.
```

**3 specific patches to land in the Phase 62 commit batch:**
1. `.planning/REQUIREMENTS.md` AB-06 — replace "5 existing platform glossaries" with "4 existing platform glossaries" + inline footnote.
2. `.planning/ROADMAP.md` Phase 62 SC#4 — same replacement.
3. `.planning/STATE.md` D-A2 — same replacement.

**Watch-outs:**
- **NOT a corpus edit:** Per D-05 + Q5(b) compliance, planning-file edits are NOT corpus edits. These land INLINE during Phase 62 execution (same commit batch as the rest), NOT as a separate prereq commit.
- **D-A2 architectural-decision consistency:** STATE.md D-A2 line 82 is the SOT for the architectural decision. The count correction does NOT change the architecture (split glossary architecture per D-A2 remains); it only corrects the arithmetic.
- **Phase 62 check-phase-62.mjs assertion:** add V-62 assertions that verify REQUIREMENTS.md AB-06 text contains "4 existing platform glossaries" + ROADMAP.md Phase 62 SC#4 + STATE.md D-A2 patched accordingly.

---

### `.planning/phases/62-.../62-ANCHOR-INVENTORY.md` (NEW pattern v1.6 establishes)

**Analog:** NONE found (`Glob .planning/phases/*/*ANCHOR*.md` returned zero results).
**Match quality:** **NEW PATTERN** — Phase 62 establishes the pre-edit anchor inventory artifact convention for v1.6+.

**Closest indirect precedent:** v1.5 Phase 48 D-22 "PITFALL-6 anchor-stability surface" mandates anchor-preservation but never produced a dedicated inventory file — the verification was implicit in `git diff` review.

**Recommended structure** (per 62-RESEARCH.md §7 lines 572-635):

```markdown
# Phase 62 Pre-Edit Anchor Inventory

**Captured:** 2026-05-21 (BEFORE any Phase 62 edits to existing files)
**Files inventoried:** 3 existing files receiving surgical edits in Phase 62 (banner-line targets implicitly inventoried by file-SHA capture)
**Purpose:** PITFALL-6 anchor-stability surface — compare pre/post to verify zero anchor shift

## File 1: docs/_glossary-macos.md

**SHA (pre-edit):** `<sha256 or git hash>`
**Receiving:** 1 reciprocal banner line (top) + 1 inline see-also at ABM entry (~line 67)

### Alphabetical Index Anchors (line 16)
Pre-edit index line: [verbatim]

Full H3 anchor list:
- `#abm` (H3 line ~62)
- `#abm-token` (H3 line ~68)
- ... (11 anchors total per actual file scan)

**Permitted edits:** Banner line inserted BEFORE line 9 (or after YAML frontmatter); inline see-also appended to ABM entry's `> See also:` block. Zero H2/H3 headings renamed.

## File 2: docs/admin-setup-macos/01-abm-configuration.md
[same structure: SHA + Receiving + H2/H3 anchor list + Permitted edits]

## File 3: docs/admin-setup-ios/02-abm-token.md
[same structure]

## Post-Edit Verification Checklist

- [ ] `_glossary-macos.md` anchor index line (line 16) unchanged byte-for-byte
- [ ] All 11 `_glossary-macos.md` H3 anchors present with zero slug changes
- [ ] `01-abm-configuration.md` all pre-edit H2/H3 anchors present post-edit
- [ ] `02-abm-token.md` all pre-edit H2/H3 anchors present post-edit
- [ ] `git diff --word-diff` shows ONLY additions (no modifications to existing heading text)
```

**Watch-outs:**
- **NEW pattern — set precedent carefully:** This artifact becomes the v1.6+ template for any phase that touches existing capability matrices, glossaries, or hub files (per STATE.md Patterns-carried-forward line 105). Make it copy-pasteable.
- **Capture BEFORE editing:** The artifact MUST be created and committed BEFORE any edits to the 3 existing files. If the artifact is created AFTER edits, the SHA snapshot is meaningless.
- **`_glossary-macos.md` inline-see-also count:** 11 H3 anchors per 62-RESEARCH.md line 593-604 estimate; executor verifies by actual file scan and updates the line range.
- **D-A8 read-only-corpus invariant proof:** This artifact PROVES the 3 sanctioned canonical sites + 4 banner lines + 1 inline see-also are the ONLY corpus changes. All other v1.0-v1.5 docs untouched.

---

## Shared Patterns

### Cross-Cutting: Frontmatter Convention

**Source:** `docs/_glossary-linux.md` lines 1-7
**Apply to:** All new v1.6 doc files (`_glossary-apple-business.md`, `00-overview.md`, `01-role-permission-model.md`, `02-ous-architecture.md`, `_admin-directory.md`)

```yaml
---
last_verified: 2026-05-21
review_by: 2026-07-20
applies_to: apple-business
audience: <admin|l1|all>
platform: ios+macos
---
```

**Apply specifics:**
- `last_verified` = Phase 62 execution date (2026-05-21).
- `review_by` = `last_verified + 60 days` (2026-07-20) — 60-day rule per v1.5 carry-over.
- `applies_to` = `apple-business` (new value introduced Phase 62).
- `platform` = `ios+macos` for governance docs (compound — requires `+` separator parser in harness). L1 #34 Phase 65 will use `ios+macos+shared-ipad`.
- `audience` = `admin` for `_admin-directory.md`, `01-role-permission-model.md`, `02-ous-architecture.md`; `all` for `_glossary-apple-business.md`; `admin` for `00-overview.md`.

---

### Cross-Cutting: Cross-Platform Reciprocity Blockquote

**Source:** `docs/_glossary-linux.md` lines 9-10 and `docs/_glossary-macos.md` lines 9-10
**Apply to:** Top of `_glossary-apple-business.md` + the 4 modified existing glossaries

```markdown
> **<Platform> coverage:** This glossary covers <platform>-specific terminology for ...
> For Windows Autopilot terminology, see the [Windows Autopilot Glossary](_glossary.md). For ... see the [<Other> Glossary](_glossary-<other>.md). ...
```

The reciprocity should be N-way (every glossary mentions every other glossary). After Phase 62, all 5 glossaries mention all 4 siblings.

---

### Cross-Cutting: HTML Comment Allowlist Exemption (Style-Guide Convention)

**Source:** v1.4.1 AEAUDIT-04 pattern (cited in 62-CONTEXT.md `<specifics>` line 212)
**Apply to:** Files containing C15-flaggable Apple-Business-vs-Intune disambiguation prose (Phase 64 `18-cross-org-boundary-cheat-sheet.md` will be the first consumer; Phase 62 publishes the convention definition only).

```html
<!-- ABAUDIT-01: intentional Apple-Business-vs-Intune disambiguation table; C15 false-positive allowlisted -->
```

The harness (`v1.6-milestone-audit.mjs` C15 check) reads HTML comments in `<!-- ABAUDIT-{##}: {one-sentence intent} -->` form and skips C15 regex checks for the flagged line/block.

---

### Cross-Cutting: Atomic-Commit Contract (v1.5 Plan 60-08 Precedent)

**Source:** v1.5 Plan 60-08 commit `c2abdd4` (cited in STATE.md line 135 and 62-CONTEXT.md line 9)
**Apply to:** Phase 62 final commit batch

Required atomic-commit components (ALL land in ONE commit, harness exits 0):
1. `scripts/validation/v1.6-milestone-audit.mjs`
2. `scripts/validation/v1.6-audit-allowlist.json` (with `c13_rotting_external` + `c16_missing_endpoint_exemptions` categories populated)
3. `scripts/validation/check-phase-62.mjs`
4. (Phase 62 content already committed in earlier plan batches — but the harness commit MUST find them present at this commit)

Commit-message template per 62-RESEARCH.md §6 lines 532-556.

---

### Cross-Cutting: Append-Only Contract on Existing Files

**Source:** v1.5 Phase 57 V-57-25 NEGATIVE regression-guard precedent (STATE.md Anti-regression invariants line 118)
**Apply to:** All 8 modifications to existing files in Phase 62 (4 glossary banner lines + 1 inline see-also + 2 intro callouts + 3 planning-doc count patches)

Rules:
- ZERO existing H2/H3 headings renamed.
- ZERO existing prose modified (only additions).
- New content INSERTED at sanctioned insertion points (top of glossary; intro of admin guide; AB-06 line in REQUIREMENTS.md).
- `git diff --word-diff` shows ONLY `+` lines, no `-` lines (except for the D-05 count-correction patches which DO replace "5" → "4").

---

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| `.planning/phases/62-.../62-ANCHOR-INVENTORY.md` | pre-edit safety artifact | one-shot snapshot | No v1.5 phase archived a dedicated anchor inventory file (verified via `Glob .planning/phases/*/*ANCHOR*.md` → zero results). PITFALL-6 anchor-preservation was previously verified implicitly via `git diff` review. Phase 62 establishes the explicit artifact convention. **Planner should use the structure from 62-RESEARCH.md §7 lines 572-635 (treat as authoritative template).** |

---

## Metadata

**Analog search scope:**
- `docs/_glossary*.md` (4 files matched + 1 new)
- `docs/cross-platform/**` (not yet existing — modeled on `docs/operations/`)
- `docs/operations/00-index.md` + `docs/operations/co-management/00-overview.md`
- `docs/_templates/admin-template-{macos,ios}.md`
- `docs/admin-setup-macos/01-abm-configuration.md` (existing intro pattern)
- `docs/admin-setup-ios/02-abm-token.md` (existing intro pattern)
- `scripts/validation/v1.5-milestone-audit.mjs` (Path-A copy source)
- `scripts/validation/v1.5-audit-allowlist.json` (schema source)
- `scripts/validation/check-phase-61.mjs` (chain validator copy source)
- `.planning/phases/*/*ANCHOR*.md` (zero results — confirms NEW pattern)

**Files scanned:** 12 corpus files + 3 validation harness/sidecar/validator + 3 planning docs = 18

**Pattern extraction date:** 2026-05-21

**Critical reminders for planner:**
1. **C14 BLOCKING from Phase 1** — every plan that touches one of the 3 canonical sites must verify all 3 tokens present within first 50 lines BEFORE harness commit.
2. **PITFALL-6 anchor inventory FIRST** — the first plan in Phase 62 execution batch should produce `62-ANCHOR-INVENTORY.md` BEFORE any existing-file edits. Subsequent plans verify against it.
3. **D-A9 atomic harness commit LAST** — harness + sidecar + check-phase-62.mjs land in ONE commit AFTER all corpus + planning-doc changes are committed; harness exits 0 on that commit or rollback.
4. **D-A8 cross-link contract** — v1.6 new docs link OUT to existing docs freely; existing docs receive ZERO modifications EXCEPT the 8 sanctioned surgical edits (4 banner lines + 1 inline see-also + 2 intro callouts + 1 implicit `_glossary-macos.md` banner overlap). Anything else = D-A8 violation.
5. **D-A10 phase build order** — glossary → admin guides → L1/L2 → capability matrix → hub nav. Phase 62 ships glossary + 2 admin-context docs (`01-role-permission-model.md`, `02-ous-architecture.md`) + 1 template (`_admin-directory.md`). NO L1/L2 runbook, NO hub nav touched.
