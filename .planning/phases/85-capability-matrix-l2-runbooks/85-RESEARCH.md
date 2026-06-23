# Phase 85: Capability Matrix + L2 Runbooks - Research

**Researched:** 2026-06-23
**Domain:** Markdown documentation mechanics — capability matrix row insertion, blob-hash atomicity, L2 runbook authoring, glossary see-also cross-linking
**Confidence:** HIGH (all findings verified directly from live files)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01:** Add Kerberos row(s) under the existing `## Authentication` H2 (option 1a) — NOT a new `## SSO Extensions` H2. `#authentication` is a live anchor already cross-linked from `macos-capability-matrix.md:38/:82` and `4-platform-capability-comparison.md:101`.

**D-02:** Per-feature rows matching the existing PSSO table grammar (`macos-capability-matrix.md:106-112`). No single consolidated Kerberos mega-cell.

**D-03:** Kerberos-only in the matrix. Graph-managed Platform Credential routed to the glossary (SC#3), NOT to matrix rows.

**D-04:** Both #28 and #29 follow the `27-macos-sso-investigation.md` template — Platform-gate header, `## Context`, Track(s) with numbered `### Step N`, Microsoft Support Escalation Packet, Related Resources, Version History.

**D-05:** L2-entry-only — NO "from L1 escalation" routing block. Verified empirically: `docs/l1-runbooks/` contains no L1 Kerberos and no L1 Graph runbook (confirmed: highest numbered file is `36-macos-secure-enclave-key.md`). The standard `## Context` opener gets a "no L1 escalation: begin at Step 1" line matching #27's pattern.

**D-06:** #29 scoped to single-user enumerate/verify/delete + delete-and-re-register + permission/role troubleshooting. Bulk-audit is a forward-note only.

**D-07:** See-also-only for the macOS glossary. Both required macOS terms already exist (verified: Kerberos SSO Extension at line 142, Platform SSO→guide-11 see-also at line 128). Phase 85 macOS-glossary work is verify-not-recreate.

**D-08:** Update the `## Single Sign-On` H2 macOS cell in `4-platform-capability-comparison.md` (`:97-103`, macOS cell at line 101) link-not-copy to reference the new Kerberos capability at `#authentication`. MANDATORY: this edit changes the file's git blob and requires bumping V-63-09 baseline in the same atomic commit.

**D-09:** Add reciprocal Kerberos + Platform-Credential see-also to the Windows `_glossary.md` `## Security` → Entra ID SSO term (`_glossary.md:158-162`). The established pattern: extend the existing `> See also:` line already present at line 162.

**Diagnostics (carried from 83-CONTEXT D-10/D-11/D-13, LOCKED):**
- Canonical pair: `app-sso platform -s` + `klist` (version-stable form, no `-v`)
- `app-sso diagnose` PROHIBITED
- `tgt_ad` = on-prem TGT; `tgt_cloud` = Entra TGT

**Graph (carried from 84-CONTEXT D-08, LOCKED):**
- Nav property: `platformCredentialMethods` (v1.0, NOT beta)
- Endpoint pattern: `GET/DELETE https://graph.microsoft.com/v1.0/users/{id}/authentication/platformCredentialMethods/{methodId}`
- Delete `[!WARNING]`: severs Entra binding, does NOT erase SE key
- Least-priv delete: `UserAuthenticationMethod.ReadWrite.All` (application) / `UserAuthenticationMethod.ReadWrite` (delegated)

### Claude's Discretion

Exact per-feature Kerberos row labels/count under `## Authentication`; Track-A/Track-B split boundaries and step ordering within #28/#29; callout wording; the exact reciprocal-see-also sentence and whether it extends an existing Windows term or adds a sibling line.

### Deferred Ideas (OUT OF SCOPE)

- Graph-managed Platform Credential matrix rows
- Standalone "Platform Credential (Graph API)" glossary term
- Bulk-audit / enumerate-users-with-0-registrations in #29
- "From L1 escalation" routing blocks in #28/#29
- Navigation-hub / common-issues / quick-ref-l2 / decision-tree Kerberos entries (Phase 87)
- Legacy chain-FAIL conversion + new harness files (Phases 86/88)

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| REF-01 | `docs/reference/macos-capability-matrix.md` gains Kerberos SSO Extension rows under pre-edit anchor-inventory convention, committed atomically with V-63-08 baseline update | Anchor inventory format verified from 63-ANCHOR-INVENTORY.md; V-63-08 mechanics confirmed at check-phase-63.mjs:202-220; current pre-edit hash confirmed as `e91f28c76441577d4e6176756ba04300ceb555e1` |
| REF-02 | `_glossary-macos.md` (+ reciprocal `_glossary.md` see-also) gain entries; `4-platform-capability-comparison.md` macOS cells updated link-not-copy | Both macOS terms verified present; comparison doc `## Single Sign-On` macOS cell at line 101 identified; Windows `_glossary.md` Entra ID SSO term at line 158 confirmed; V-63-09 current hash `58b958639294c2bdb4082aecd9967a15d35aff2a` |
| RUN-01 | `docs/l2-runbooks/28-macos-kerberos-sso-investigation.md` — ticket acquisition, realm/KDC reachability, TGT verification, log collection | #27 template anatomy extracted in full; locked diagnostic commands confirmed; no L1 source exists (verified) |
| RUN-02 | `docs/l2-runbooks/29-macos-graph-credential-investigation.md` — enumerate/verify/delete, delete-and-re-register, permission/role troubleshooting | Guide 11 endpoint shapes extracted; delete `[!WARNING]` wording confirmed; permissions matrix from guide 11 confirmed |

</phase_requirements>

---

## Summary

Phase 85 is a documentation-only phase with three concurrent workstreams: (1) pre-edit anchor inventory then capability-matrix Kerberos row insertion (atomically bonded to the V-63-08 harness baseline), (2) comparison-doc macOS SSO cell update and Windows glossary reciprocal see-also (atomically bonded to V-63-09), and (3) two new L2 runbooks (#28 Kerberos, #29 Graph) plus 00-index.md extension.

**Critical discovery:** Both V-63-08 and V-63-09 in `check-phase-63.mjs` are ALREADY FAILING at HEAD before any Phase 85 edits. The recorded baselines (`e91d7f9e...` for the matrix, `f25ff51a...` for the comparison doc) were set in Phase 63 (v1.6) and have not been updated since Phases 79 and 81 legitimately edited both files in v1.9. The current live blob hashes are `e91f28c7...` (matrix) and `58b95863...` (comparison doc). These are pre-existing legacy FAILs listed in CHAIN_PHASES but not in CHAIN_SKIP — they are the same class of failure that Phase 86 is assigned to fix chain-wide. **Implication for Phase 85:** When the matrix is edited, the BASELINE in V-63-08 must be updated to the NEW post-edit hash (not to `e91d7f9e...` — which already doesn't match). Similarly for V-63-09 when the comparison doc is edited. The plan must not confuse "restore the Phase 63 baseline" with "update the baseline to the post-edit hash."

**Primary recommendation:** Plan three plans as specified in ROADMAP.md — 85-01 (anchor inventory + matrix + V-63-08 bump), 85-02 (comparison doc + Windows glossary verify + V-63-09 bump), 85-03 (runbooks #28/#29 + 00-index.md rows). Each edit-plus-baseline-bump is one atomic commit. The macOS glossary is verify-only (both terms confirmed present).

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Capability matrix Kerberos row | Documentation (reference) | Harness (validation) | Matrix is a reference doc; harness guards its blob hash |
| Pre-edit anchor inventory artifact | Documentation (planning artifact) | — | Committed to .planning/phases/ before any content edit |
| L2 runbook #28 (Kerberos) | Documentation (l2-runbooks) | — | Free-standing operational runbook |
| L2 runbook #29 (Graph) | Documentation (l2-runbooks) | — | Free-standing operational runbook |
| 00-index.md extension | Documentation (l2-runbooks index) | — | Internal hub — NOT top-level nav (Phase 87 handles nav hubs) |
| Harness baseline bump (V-63-08, V-63-09) | Harness (check-phase-63.mjs) | — | Must be atomic with the file edit that changes the blob hash |
| macOS glossary verify | Documentation (glossary) | — | Both terms already exist; verify-not-recreate |
| Windows glossary see-also | Documentation (glossary) | — | Append one line to existing see-also block |
| Comparison doc macOS SSO cell | Documentation (reference) | Harness (V-63-09) | link-not-copy update; triggers V-63-09 baseline bump |

---

## Finding 1: Anchor Inventory Mechanics (SC#1, D-01)

### Current `## ` Headings in macos-capability-matrix.md

Verified by direct file read. The complete list of H2 anchors in the current live file:

| Line | Heading | GitHub-style anchor |
|------|---------|---------------------|
| 13 | `## Enrollment` | `#enrollment` |
| 29 | `## Configuration` | `#configuration` |
| 42 | `## App Deployment` | `#app-deployment` |
| 55 | `## Compliance` | `#compliance` |
| 67 | `## Software Updates` | `#software-updates` |
| 79 | `## Conditional Access` | `#conditional-access` |
| 88 | `## Key Gaps Summary` | `#key-gaps-summary` |
| 100 | `## Authentication` | `#authentication` |
| 114 | `## See Also` | `#see-also` |
| 122 | `## Version History` | `#version-history` |

No H3 headings exist in this file (H2-only sections throughout).

**Pre-edit SHA:** Last commit touching `macos-capability-matrix.md` is `45b4865` (feat(81-03): create E3 and E4 SSO cross-link edges).

**Pre-edit blob hash (current, before any Phase 85 edit):** `e91f28c76441577d4e6176756ba04300ceb555e1`
[VERIFIED: `git hash-object docs/reference/macos-capability-matrix.md`]

### Anchor Inventory Artifact Format

Verified from `63-ANCHOR-INVENTORY.md` (the canonical precedent at `.planning/milestones/v1.6-phases/63-multi-ou-architecture-apple-admin-setup/63-ANCHOR-INVENTORY.md`). The format is:

```markdown
# Phase 85 Pre-Edit Anchor Inventory

**Captured:** [date] (BEFORE any Phase 85 edits to existing files)
**Files inventoried:** 1 existing file receiving new rows
**Purpose:** Pre-edit anchor-stability surface (SC#1 / PITFALL-6 / DA-4 convention)
**Mirrors format:** .planning/milestones/v1.6-phases/63-.../63-ANCHOR-INVENTORY.md

---

## File 1: docs/reference/macos-capability-matrix.md

**Pre-edit git SHA (last commit touching file):** `45b4865...`
**Pre-edit blob hash:** `e91f28c76441577d4e6176756ba04300ceb555e1`
**Receiving:** Kerberos SSO Extension row(s) appended inside the `## Authentication` table (before `## See Also`)

### H2/H3 Anchor List (verbatim, pre-edit)

H2 anchors:
- [line:heading entries, verbatim]

H3 anchors: (none — H2-only file)

**Permitted edits per Plan 85-01:**
- New data row(s) APPENDED inside the Authentication H2 table
- Zero H2/H3 headings renamed
- Zero existing prose modified
- `check-phase-63.mjs` V-63-08 BASELINE updated to post-edit hash in same commit
```

**Artifact location:** `.planning/phases/85-capability-matrix-l2-runbooks/85-ANCHOR-INVENTORY.md`
[ASSUMED — the filename pattern `NN-ANCHOR-INVENTORY.md` in the phase dir is the established convention observed at Phase 62/63]

The V-63-ANCHOR-INVENTORY check in check-phase-63.mjs looks for the artifact via `resolveArchivedPhasePath('63-multi-ou-architecture-apple-admin-setup/63-ANCHOR-INVENTORY.md', ['v1.6-phases'])` — it is phase-specific. The 85-ANCHOR-INVENTORY.md does NOT need to pass V-63-ANCHOR-INVENTORY (that check is for Phase 63's artifact only). SC#1 requires only that the artifact be committed.

---

## Finding 2: Dual Blob-Hash Mechanics (SC#2, D-08, MANDATORY)

### CRITICAL: Both V-63-08 and V-63-09 Are Already Failing at HEAD

**Verified by running `node scripts/validation/check-phase-63.mjs`:**

```
[8/32] V-63-08: macos-capability-matrix.md byte-unchanged vs baseline blob e91d7f9e...
FAIL -- blob hash CHANGED: expected e91d7f9e001bb7ff4dc56a4ca98c84868fbf0716, got e91f28c76441577d4e6176756ba04300ceb555e1

[9/32] V-63-09: 4-platform-capability-comparison.md byte-unchanged vs baseline blob f25ff51a...
FAIL -- blob hash CHANGED: expected f25ff51a14b7feac46611c4c0511ed5c074ce03f, got 58b958639294c2bdb4082aecd9967a15d35aff2a

Result: 25 PASS, 7 FAIL, 0 SKIPPED
```

These are pre-existing legacy FAILs. Both files were legitimately edited in Phases 79 and 81 (v1.9) without updating the Phase 63 harness baselines. They are listed in the Phase 86 legacy-FAIL remediation scope (CHAIN-01 covers `check-phase-{58,59,60,61,62,63,64,65,66,73}.mjs`).

### What This Means for Phase 85's Baseline Bump Protocol

The CONTEXT.md phrase "bump its baseline in the same commit as the edit to its file" means:

1. Edit `macos-capability-matrix.md` (add Kerberos row)
2. Run `git hash-object docs/reference/macos-capability-matrix.md` — this gives the NEW post-edit hash
3. Update the `BASELINE` constant in `check-phase-63.mjs` V-63-08 (line 209) from `e91d7f9e001bb7ff4dc56a4ca98c84868fbf0716` to the new post-edit hash
4. Stage both files and commit atomically

**Phase 85 does NOT need to restore the Phase-63-era baseline.** The check passes when BASELINE matches the current `git hash-object` result. After Phase 85's edit+bump commit, V-63-08 will PASS for the first time since Phase 81.

### Exact Harness Location

**V-63-08** (file: `scripts/validation/check-phase-63.mjs`):
- Lines: 202-221
- BASELINE constant: line 209
- Current BASELINE value: `e91d7f9e001bb7ff4dc56a4ca98c84868fbf0716` (stale — does NOT match live file)
- Live file hash (pre-Phase-85): `e91f28c76441577d4e6176756ba04300ceb555e1`
- After Phase 85 matrix edit: compute `git hash-object docs/reference/macos-capability-matrix.md` and write that value to line 209

**V-63-09** (file: `scripts/validation/check-phase-63.mjs`):
- Lines: 223-242
- BASELINE constant: line 230
- Current BASELINE value: `f25ff51a14b7feac46611c4c0511ed5c074ce03f` (stale — does NOT match live file)
- Live file hash (pre-Phase-85): `58b958639294c2bdb4082aecd9967a15d35aff2a`
- After Phase 85 comparison-doc edit: compute `git hash-object docs/reference/4-platform-capability-comparison.md` and write that value to line 230

[VERIFIED: direct read of check-phase-63.mjs lines 202-242]

### Per-File Coupling and Commit Strategy

| Edit | File | Harness guard | When to bump | Separate commit? |
|------|------|--------------|--------------|-----------------|
| Kerberos row(s) added | `macos-capability-matrix.md` | V-63-08 (line 209) | Same commit as matrix edit | Commit A (Plan 85-01) |
| macOS SSO cell updated | `4-platform-capability-comparison.md` | V-63-09 (line 230) | Same commit as comparison edit | Commit B (Plan 85-02) |

These are TWO SEPARATE atomic commits — one per file. Do NOT bump V-63-09 in the same commit as the matrix edit, and do NOT bump V-63-08 in the same commit as the comparison edit. Each BASELINE in check-phase-63.mjs must match its specific file at the time of that file's commit.

**CRITICAL WARNING:** A missed V-63-09 bump after the comparison-doc edit introduces a new chain FAIL that Phase 86's frozen-aware conversion does NOT address. Phase 86 converts `HEAD-coupled` assertions to frozen-aware reads — it does not fix a baseline that was simply never updated. If V-63-09's BASELINE is wrong after Phase 85, it will remain wrong into Phase 88.

### Mechanism

```bash
# After editing docs/reference/macos-capability-matrix.md:
git hash-object docs/reference/macos-capability-matrix.md
# → new hash (e.g. abc123...) — this goes into check-phase-63.mjs line 209

# After editing docs/reference/4-platform-capability-comparison.md:
git hash-object docs/reference/4-platform-capability-comparison.md
# → new hash — this goes into check-phase-63.mjs line 230
```

[VERIFIED: mechanism confirmed from check-phase-63.mjs source and 63-ANCHOR-INVENTORY.md §Byte-Unchanged Baseline]

---

## Finding 3: Runbook Template Anatomy (SC#4/#5, D-04/D-05)

### Template Skeleton from `27-macos-sso-investigation.md`

Verified by direct file read. Complete skeleton:

```
--- [YAML frontmatter] ---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
applies_to: ADE
audience: L2
platform: macOS

> **Platform gate:** [platform-scoping blockquote] ...

# [Title]

## Context

[Description of failure classes covered. Then:]
**From L1 escalation?** [...routing block...] ← D-05: DO NOT REPLICATE in #28/#29

---

## Track A: [Name]

### Step 1: [Title]
[prose + code blocks]

### Step 2: [Title]
...

### Step N: [Title]

---

## Track B: [Name]

### Step 1: [Title]
...

---

## Microsoft Support Escalation Packet

[Bulleted list of required artifacts]

---

## Related Resources

[Bulleted list of links]

---

## Version History

| Date | Change | Author |
|------|--------|--------|
| YYYY-MM-DD | [description] | -- |
```

### D-05 Detail: What to Omit and What to Keep

The L1-routing block in `27-macos-sso-investigation.md` is lines 19-24:
```
**From L1 escalation?** L1 runbook 35 (SSO sign-in failure ...) or L1 runbook 36 (Secure Enclave key loss ...) has escalated ...
- L1 35 → Track A: ...
- L1 36 → Track A: ...
- Password-sync failures ... → Track B: ...
- No L1 escalation: begin at Track A Step 1 ...
```

**For #28 and #29:** Keep the standard `## Context` section opener and include ONE sentence equivalent to "No L1 escalation: begin at Step 1" (or Track A Step 1 for #28). Omit the L1 numbering references entirely. Cross-link to adjacent runbooks (#27/#35/#36) in Related Resources for shared-symptom tickets.

**L1 runbooks confirmed absent for Kerberos and Graph:**
- `docs/l1-runbooks/` enumerated: highest macOS runbook is `36-macos-secure-enclave-key.md`
- No L1 Kerberos runbook exists
- No L1 Graph runbook exists
[VERIFIED: `ls docs/l1-runbooks/` enumeration]

### #28 Track Layout (SC#4 mapping)

SC#4 requires: ticket acquisition triage, realm/KDC reachability checks, TGT verification (`app-sso platform -s` / `klist`), and log collection steps.

Recommended Track A/B split:

**Track A: Ticket Acquisition Failure (TGT not issued)**
- Step 1: Check PSSO registration state via `app-sso platform -s` — confirm `tgt_ad` or `tgt_cloud` key presence; cosmetic "Not signed in" menu-bar note
- Step 2: Realm/KDC reachability — `klist` to show cached tickets; realm DNS resolution checks
- Step 3: Log collection — AppSSO debug logging + sysdiagnose (reuse #27 Step 3 procedure, link-not-copy)

**Track B: PSSO-TGT Integration Failure (`usePlatformSSOTGT` path)**
- Step 1: Verify macOS 14.6 floor (PSSO-TGT integration requires macOS 14.6+)
- Step 2: Verify `usePlatformSSOTGT: true` in the Kerberos profile
- Step 3: Check PSSO registration state — TGT sharing requires PSSO to be REGISTERED first

This is Claude's Discretion per CONTEXT.md — exact split is for planner/executor. The above is a suggested structure, not a locked constraint.

### #29 Step Layout (SC#5 mapping)

SC#5 requires: enumerate/verify, the delete-and-re-register flow, and permission/role troubleshooting.

Single-track numbered steps (no Track A/B split needed — the operations are sequential):

- Step 1: Enumerate Platform Credentials (`GET platformCredentialMethods`) — use read-only to verify before any delete
- Step 2: Verify credential properties (`GET` with `?$expand=device`) — confirm `platform=macOS`, `keyStrength=normal`
- Step 3: Delete credential — `DELETE platformCredentialMethods/{id}` with mandatory `[!WARNING]`; dry-run gate required
- Step 4: Verify re-registration — user will see "Registration Required" prompt; confirm via `app-sso platform -s`
- Step 5: Permission/role troubleshooting — distinguish read vs delete scopes; delegated vs application; national-cloud table

---

## Finding 4: 00-index.md Integration (D-05)

### Current macOS ADE Runbooks "When to Use" Table

From direct file read of `docs/l2-runbooks/00-index.md` (lines 80-87):

```markdown
| Runbook | When to Use | Prerequisite |
|---------|-------------|--------------|
| [macOS Log Collection Guide](10-macos-log-collection.md) | Before starting any macOS L2 investigation -- collect IntuneMacODC zip and Terminal diagnostic outputs | None |
| [Profile Delivery Investigation](11-macos-profile-delivery.md) | ... | [macOS Log Collection](10-macos-log-collection.md) |
| [App Install Failure Diagnosis](12-macos-app-install.md) | ... | [macOS Log Collection](10-macos-log-collection.md) |
| [Compliance Evaluation Investigation](13-macos-compliance.md) | ... | [macOS Log Collection](10-macos-log-collection.md) |
| [Platform SSO Investigation](27-macos-sso-investigation.md) | PSSO registration not completing, "Registration Required" loop, or Password-sync sign-in failure | [macOS Log Collection](10-macos-log-collection.md) |
```

**New rows to add (exact format matching the table):**

```markdown
| [Kerberos SSO Investigation](28-macos-kerberos-sso-investigation.md) | Kerberos TGT not acquired, realm/KDC unreachable, or PSSO-TGT integration failure (`usePlatformSSOTGT`) | [macOS Log Collection](10-macos-log-collection.md) |
| [Graph Credential Investigation](29-macos-graph-credential-investigation.md) | Platform Credential not appearing in Graph, delete-and-re-register flow, or permission/scope errors on `platformCredentialMethods` | [macOS Log Collection](10-macos-log-collection.md) |
```

**L1 Escalation Mapping table:** Do NOT add rows for #28/#29. The macOS L1 Escalation Mapping table (lines 88-98) maps L1 runbooks #35/#36 → #27 only. Since no L1 Kerberos or L1 Graph runbook exists, there is no L1 source to map. Adding rows here with non-existent L1 sources would be inaccurate (D-05).

[VERIFIED: 00-index.md read confirms table format and existing L1 Escalation Mapping rows]

---

## Finding 5: Glossary Mechanics (SC#3, D-07/D-09)

### macOS Glossary — Verify-Not-Recreate

Both terms are confirmed present in `docs/_glossary-macos.md`:

**Kerberos SSO Extension term** (lines 142-146):
```markdown
### Kerberos SSO Extension

An Apple-native extension (`com.apple.AppSSOKerberos.KerberosExtension`, payload Type: Credential, Team Identifier: `apple`) ...

> See also: [Platform SSO](#platform-sso); [Enterprise SSO Plug-in](#enterprise-sso-plug-in); [Kerberos SSO Extension Guide](admin-setup-macos/10-kerberos-sso-extension.md).
```
[VERIFIED: `_glossary-macos.md` line 142]

**Platform SSO term see-also to guide 11** (line 128):
```markdown
> See also: [Enterprise SSO Plug-in](#enterprise-sso-plug-in); [Entra ID SSO](_glossary.md#entra-id-sso); [Platform SSO Setup Guide](admin-setup-macos/07-platform-sso-setup.md); [Graph API: Platform Credential Management](admin-setup-macos/11-graph-api-platform-credential.md).
```
[VERIFIED: `_glossary-macos.md` line 128]

**Alphabetical Index** (line 17): `[Kerberos SSO Extension](#kerberos-sso-extension)` is already present.
[VERIFIED: `_glossary-macos.md` line 17]

**Phase 85 macOS glossary action: VERIFY ONLY — do not add, modify, or duplicate any terms.**

### Windows Glossary — Reciprocal See-Also (D-09)

**Current state of `_glossary.md` Entra ID SSO term (lines 158-162):**
```markdown
### Entra ID SSO

Microsoft Entra ID single sign-on on Windows devices: when a user signs in to an Entra-joined or Entra-registered device, the Web Account Manager (WAM) obtains a Primary Refresh Token (PRT) that silently authenticates the user to apps and browsers without requiring repeated credential entry. The PRT is hardware-bound (via TPM when available) and carries device compliance claims evaluated by Conditional Access policies.

> See also: [Enterprise SSO Plug-in](_glossary-macos.md#enterprise-sso-plug-in) (macOS equivalent via Microsoft Enterprise SSO plug-in and Platform SSO).
```
[VERIFIED: `_glossary.md` lines 158-162]

**Phase 85 action:** Extend the existing `> See also:` line (line 162) to add the Kerberos and Platform Credential pointers. Pattern from CONTEXT.md D-09 — extend, not replace:

```markdown
> See also: [Enterprise SSO Plug-in](_glossary-macos.md#enterprise-sso-plug-in) (macOS equivalent via Microsoft Enterprise SSO plug-in and Platform SSO); [Kerberos SSO Extension](_glossary-macos.md#kerberos-sso-extension) (macOS on-premises Kerberos TGT extension, coexisting with PSSO); [Graph API: Platform Credential Management](admin-setup-macos/11-graph-api-platform-credential.md) (programmatic management of macOS Platform Credentials).
```

The exact wording is Claude's Discretion per CONTEXT.md.

---

## Finding 6: 4-Platform Comparison Cell (SC#3, D-08)

### Current `## Single Sign-On` Section (lines 97-103)

From direct file read of `docs/reference/4-platform-capability-comparison.md`:

```markdown
## Single Sign-On

| Feature | Windows | macOS | iOS | Android | Linux |
|---------|---------|-------|-----|---------|-------|
| OS-integrated SSO (Platform SSO) | N/A | Supported (macOS 14+) — [matrix](macos-capability-matrix.md#authentication) | N/A | N/A | N/A |

> Non-macOS platform SSO authentication is not covered in this documentation set; `N/A` reflects deliberate scope, not capability absence.
```

**Line 101 (the macOS cell):** `Supported (macOS 14+) — [matrix](macos-capability-matrix.md#authentication)`

**Phase 85 action (link-not-copy):** Update line 101's macOS cell to add the Kerberos capability reference. Since the row already links to `#authentication` (which is where the Kerberos row will be added), the macOS cell already points at the right anchor. The question is whether additional text or a second link is needed. Per D-08 "link-not-copy to reference the new Kerberos capability at `#authentication`" — the existing link target already covers it because the Kerberos row will live in `#authentication`. The executor may choose to add "incl. Kerberos SSO Extension" or similar prose to the cell, or the existing link is sufficient since it points to the section containing the new rows.

**The key mechanical obligation:** Any edit to this file (even a one-word addition) changes the blob hash and requires V-63-09 BASELINE to be updated in `check-phase-63.mjs` line 230 in the SAME commit.

**Pre-Phase-85 blob hash of `4-platform-capability-comparison.md`:** `58b958639294c2bdb4082aecd9967a15d35aff2a`
[VERIFIED: `git hash-object docs/reference/4-platform-capability-comparison.md`]

---

## Finding 7: Diagnostics & Graph Correctness (Locked)

### #28 Kerberos Diagnostic Commands (Locked from 83-CONTEXT D-10/D-11/D-13)

**Canonical pair (MANDATORY — use verbatim):**
```bash
app-sso platform -s
```
Interpret `tgt_ad` key for on-prem AD TGT, `tgt_cloud` key for Entra TGT. Include the cosmetic "Not signed in" menu-bar note: a working PSSO-TGT deployment may show "Not signed in" in the macOS menu bar while `app-sso platform -s` shows valid TGTs — do not misread the menu bar as a failure.

```bash
klist
```
Version-stable form only — do NOT use `klist -v` (output format varies across macOS releases; `klist` without flags is stable). Shows cached Kerberos tickets with realm, principal, and expiry.

**PROHIBITED:** `app-sso diagnose` — does not exist as a verified subcommand in any Apple or Microsoft source (confirmed from #27 Step 3 note: "The `app-sso` binary does not have a `diagnose` subcommand in any verified Apple or Microsoft source"). Do not reference it in #28.

### #29 Graph Endpoint Shapes (Locked from 84-CONTEXT D-08, verified in guide 11)

The exact endpoints from `docs/admin-setup-macos/11-graph-api-platform-credential.md`:

**List:**
```http
GET https://graph.microsoft.com/v1.0/users/{id | userPrincipalName}/authentication/platformCredentialMethods
```

**Get single:**
```http
GET https://graph.microsoft.com/v1.0/users/{id}/authentication/platformCredentialMethods/{platformCredentialAuthenticationMethodId}?$expand=device
```

**Delete:**
```http
DELETE https://graph.microsoft.com/v1.0/users/{id | userPrincipalName}/authentication/platformCredentialMethods/{platformCredentialAuthenticationMethodId}
```

**Nav property:** `platformCredentialMethods` (NOT `platformCredentialAuthenticationMethod` as a URL segment — the resource type is `platformCredentialAuthenticationMethod` but the nav property used in the URL path is `platformCredentialMethods`).
[VERIFIED: guide 11 lines 65-68, 93-96, 125]

**Delete `[!WARNING]` semantics (MANDATORY, from guide 11 lines 118-119):**
- Deleting severs the Entra ID binding for the user's device and forces PSSO re-registration
- The Secure Enclave private key on the device is NOT remotely erased — only the Entra-side record is removed
- Use with care in automation loops; test with `-WhatIf` before running against production users

**Least-privilege scopes (from guide 11 Permissions section):**
- Delegated read: `UserAuthMethod-PlatformCred.Read`
- Delegated delete (other user): `UserAuthenticationMethod.ReadWrite`
- Application delete: `UserAuthenticationMethod.ReadWrite.All`
- Minimum Entra role for delete: Authentication Administrator or Privileged Authentication Administrator (Global Reader is NOT sufficient for delete)

**#29 must reference guide 11 link-not-copy** — do not re-derive the permissions table or endpoint shapes in the runbook prose. Link to the guide 11 sections.
[VERIFIED: all from guide 11 direct read]

---

## Architecture Patterns

### Pre-Edit Anchor Inventory → Matrix Edit → Hash Bump (Atomic Commit)

```
Plan 85-01:
  Commit A: Create .planning/phases/85-.../85-ANCHOR-INVENTORY.md
             (records all ## headings + pre-edit blob hash)
  [no other files staged]

  Commit B: Edit docs/reference/macos-capability-matrix.md
               (add Kerberos row(s) under ## Authentication)
             + git hash-object docs/reference/macos-capability-matrix.md
             → Update scripts/validation/check-phase-63.mjs line 209 BASELINE
             [both files staged together → one commit]
```

```
Plan 85-02:
  Commit C: Edit docs/reference/4-platform-capability-comparison.md
               (update macOS SSO cell link-not-copy)
             + git hash-object docs/reference/4-platform-capability-comparison.md
             → Update scripts/validation/check-phase-63.mjs line 230 BASELINE
             [both files staged together → one commit]

             + Edit docs/_glossary.md Entra ID SSO see-also (line 162)
             [this file does NOT trigger any harness guard; staged in same or separate commit]
```

```
Plan 85-03:
  Commit D: Create docs/l2-runbooks/28-macos-kerberos-sso-investigation.md
  Commit E: Create docs/l2-runbooks/29-macos-graph-credential-investigation.md
  Commit F: Edit docs/l2-runbooks/00-index.md (add #28 and #29 rows to When-to-Use table)
  [No harness guards on these files]
```

### Recommended Project Structure (Phase 85 files)

```
docs/
├── reference/
│   └── macos-capability-matrix.md         # Edit: Kerberos rows added under ## Authentication
├── _glossary.md                           # Edit: Entra ID SSO see-also extended
├── l2-runbooks/
│   ├── 00-index.md                        # Edit: #28 and #29 rows added to macOS table
│   ├── 28-macos-kerberos-sso-investigation.md  # NEW FILE
│   └── 29-macos-graph-credential-investigation.md  # NEW FILE
scripts/
└── validation/
    └── check-phase-63.mjs                 # Edit: V-63-08 and V-63-09 BASELINE bumps
.planning/
└── phases/85-capability-matrix-l2-runbooks/
    └── 85-ANCHOR-INVENTORY.md             # NEW FILE (committed before matrix edit)
```

Files NOT touched in Phase 85 (verify-only):
- `docs/_glossary-macos.md` — both required terms already exist
- `docs/admin-setup-macos/10-kerberos-sso-extension.md` — link target only
- `docs/admin-setup-macos/11-graph-api-platform-credential.md` — link target only

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Post-edit blob hash | Manual calculation or approximation | `git hash-object <file>` CLI command | Only mechanism that produces the exact same hash the harness uses |
| Kerberos TGT diagnostic | Custom diagnostic procedure | `app-sso platform -s` + `klist` canonical pair (locked 83-CONTEXT D-10/D-11) | These are the verified, version-stable commands; custom procedures will diverge |
| Graph endpoint verification | Re-derive from API docs | Link to guide 11 sections (link-not-copy) | Guide 11 is the authoritative in-suite reference; duplication causes maintenance drift |
| Platform Credential permissions table | Inline permissions table in runbook | Link to `guide 11 §Permissions` (link-not-copy) | Permissions may change; single source of truth in guide 11 |

---

## Common Pitfalls

### Pitfall 1: Bumping the Wrong Baseline Value
**What goes wrong:** Executor sets V-63-08 BASELINE to `e91d7f9e...` (the Phase 63 original) instead of the new post-edit hash.
**Why it happens:** The CONTEXT.md says "baseline `e91d7f9e...`" as historical context, but the harness check requires the BASELINE to equal `git hash-object` on the current file. Setting it to the Phase 63 original would still fail (because the file content has changed since Phase 63).
**How to avoid:** After editing the matrix file and BEFORE staging, run `git hash-object docs/reference/macos-capability-matrix.md` and use THAT value as the new BASELINE in check-phase-63.mjs line 209.

### Pitfall 2: Missing the V-63-09 Bump
**What goes wrong:** The comparison doc (`4-platform-capability-comparison.md`) is edited in Plan 85-02 but V-63-09's BASELINE in check-phase-63.mjs line 230 is not updated in the same commit.
**Why it happens:** The comparison-doc edit is in a separate plan from the matrix edit; the harness coupling is easy to miss.
**How to avoid:** The CONTEXT.md explicitly calls V-63-09 "the easy-to-miss coupling." Every edit to the comparison doc must be committed together with the V-63-09 BASELINE update. A missed V-63-09 bump creates a new chain FAIL that Phase 86 does NOT cover.
**Warning signs:** Running `node scripts/validation/check-phase-63.mjs` after committing the comparison-doc edit without the BASELINE update shows V-63-09 FAIL.

### Pitfall 3: Using `app-sso diagnose` in #28
**What goes wrong:** #28 Step 3 (log collection) references `app-sso diagnose` as a diagnostic command.
**Why it happens:** It sounds plausible — `app-sso` has other subcommands.
**How to avoid:** 83-CONTEXT D-13 prohibits it. `app-sso diagnose` is unverified in any Apple or Microsoft source (confirmed in #27 Step 3). Use the sysdiagnose procedure from #27 Step 3 (link-not-copy) for log collection.

### Pitfall 4: Adding a "From L1 Escalation" Block to #28/#29
**What goes wrong:** Runbook #28 or #29 opens with an L1-routing block citing non-existent L1 runbook numbers.
**Why it happens:** #27 has one and it looks like a template element.
**How to avoid:** D-05 explicitly prohibits this. The l1-runbooks directory was enumerated: no L1 Kerberos or L1 Graph runbook exists. The `## Context` section should simply state "No L1 escalation exists for this failure class — begin at Step 1."

### Pitfall 5: Duplicating macOS Glossary Terms
**What goes wrong:** A new "Kerberos SSO Extension" or "Platform Credential (Graph API)" term is added to `_glossary-macos.md`, creating a duplicate.
**Why it happens:** SC#3 asks for a "Kerberos SSO Extension entry" — without checking, one might add a new one.
**How to avoid:** D-07 says verify-not-recreate. Both terms are confirmed present (line 142 and line 128). Do not add any new terms to `_glossary-macos.md`.

### Pitfall 6: Using `klist -v` in #28
**What goes wrong:** `klist -v` is used in a diagnostic step.
**Why it happens:** `-v` seems natural for verbose output.
**How to avoid:** 83-CONTEXT D-11 specifies "pin `klist` to a version-stable form (no `klist -v`)." The verbose output format varies across macOS releases. Use bare `klist`.

### Pitfall 7: Adding #28/#29 to the L1 Escalation Mapping Table
**What goes wrong:** New rows are added to the macOS L1 Escalation Mapping table in `00-index.md` mapping non-existent L1 runbooks to #28/#29.
**Why it happens:** Every other L2 section in 00-index.md has an L1 Escalation Mapping table.
**How to avoid:** D-05 is explicit. No L1 Kerberos or L1 Graph runbook exists. Add #28/#29 to the "When to Use" table only. Leave the "macOS L1 Escalation Mapping" table unchanged.

---

## Code Examples

### Verified Atomic Commit Pattern (Blob Hash Update)

```bash
# 1. Edit the file (add Kerberos rows to macos-capability-matrix.md)

# 2. Compute the new blob hash
git hash-object docs/reference/macos-capability-matrix.md
# → e.g. "a1b2c3d4e5f6..."

# 3. Update check-phase-63.mjs line 209 BASELINE to the new hash
# (edit the file — change e91d7f9e001bb7ff4dc56a4ca98c84868fbf0716 to new hash)

# 4. Stage both files
git add docs/reference/macos-capability-matrix.md scripts/validation/check-phase-63.mjs

# 5. Verify the harness passes BEFORE committing
node scripts/validation/check-phase-63.mjs

# 6. Commit atomically
git commit -m "feat(85-01): add Kerberos SSO Extension rows to macos-capability-matrix.md + bump V-63-08 baseline"
```

### 00-index.md Row Format (verified from existing table)

```markdown
| [Kerberos SSO Investigation](28-macos-kerberos-sso-investigation.md) | Kerberos TGT not acquired, realm/KDC unreachable, or PSSO-TGT integration failure | [macOS Log Collection](10-macos-log-collection.md) |
| [Graph Credential Investigation](29-macos-graph-credential-investigation.md) | Platform Credential not appearing in Graph, delete-and-re-register flow, or permission/scope errors | [macOS Log Collection](10-macos-log-collection.md) |
```

### Runbook #28 Frontmatter (matching #27 pattern)

```yaml
---
last_verified: 2026-06-23
review_by: 2026-09-23
applies_to: ADE
audience: L2
platform: macOS
---
```

### Runbook #28 Platform Gate (matching #27 pattern)

```markdown
> **Platform gate:** This guide covers macOS Kerberos SSO extension L2 investigation. For macOS Platform SSO investigation, see [macOS Platform SSO Investigation](27-macos-sso-investigation.md). For other macOS ADE investigation runbooks, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).
```

### macos-capability-matrix.md Authentication Table Row Grammar (existing rows for matching)

Lines 104-112 (current, verified):
```markdown
| Feature | Windows | macOS |
|---------|---------|-------|
| Auth methods | n/a — not covered in this matrix | Three methods: Secure Enclave key (Microsoft-recommended), Password sync, Smart card — see [Auth Methods Deep Dive](../admin-setup-macos/08-auth-methods-deep-dive.md) |
| Hardware gate | n/a — not covered in this matrix | Secure Enclave method requires T2 chip (Intel 2018–2020) or Apple Silicon (M1+, 2020+); Password sync and Smart card have no hardware gate |
| macOS version floor | n/a — not covered in this matrix | macOS 14.0 Sonoma ... |
| Entra ID licensing | n/a — not covered in this matrix | No Entra ID P1 or P2 required ... |
| NUAL (New User at Login) | n/a — not covered in this matrix | Supported — macOS 14+; ... |
| Passkey / FIDO2 | n/a — not covered in this matrix | Supported via Platform Credential ... |
| Hybrid Entra join | n/a — not covered in this matrix | **Not supported** ... |
```

New Kerberos rows must match this `| Feature | Windows | macOS |` column grammar with `n/a — not covered in this matrix` in the Windows cell.

Suggested Kerberos rows (exact labels are Claude's Discretion per CONTEXT.md):
```markdown
| Kerberos SSO Extension | n/a — not covered in this matrix | Supported (`com.apple.AppSSOKerberos.KerberosExtension`, Type: Credential) — deployed via Intune Custom Template (.mobileconfig); see [Kerberos SSO Extension Guide](../admin-setup-macos/10-kerberos-sso-extension.md) |
| PSSO TGT integration (`usePlatformSSOTGT`) | n/a — not covered in this matrix | Supported (macOS 14.6+); enables Kerberos extension to reuse TGTs issued by Platform SSO — see [guide 10](../admin-setup-macos/10-kerberos-sso-extension.md) |
```
[ASSUMED — exact row labels and count are Claude's Discretion; the grammar/column shape is VERIFIED]

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| V-63-08/09 BASELINE = Phase 63 values | V-63-08/09 BASELINE must reflect current file content | Phases 79/81 (v1.9) — files were legitimately edited but BASELINE not updated | Both checks have been FAILING since v1.9; Phase 85 edit+bump will fix V-63-08 and V-63-09 |
| anchor-inventory in `.planning/phases/<current>/` | Same pattern — confirmed from Phase 62/63 precedents | Established v1.6 | Commit artifact BEFORE any content edit |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | 85-ANCHOR-INVENTORY.md goes in `.planning/phases/85-capability-matrix-l2-runbooks/` | Finding 1 | If it needs to be elsewhere the SC#1 check may not find it (but V-63-ANCHOR-INVENTORY only checks Phase 63's artifact; 85's goes anywhere committed) |
| A2 | Kerberos row labels and count (2 rows suggested: extension identity row + PSSO-TGT floor row) | Code Examples | Executor chooses per Claude's Discretion — count can be 1 or more |
| A3 | The comparison doc macOS cell update should add prose to clarify Kerberos coverage | Finding 6 | May be a no-op if the existing `#authentication` link is deemed sufficient by executor |

**If this table is empty after accounting for A1-A3:** All other claims in this research were verified or cited.

---

## Open Questions

1. **Should the comparison doc macOS SSO cell add explicit "incl. Kerberos SSO Extension" prose, or is the existing `#authentication` link sufficient?**
   - What we know: D-08 says "link-not-copy to reference the new Kerberos capability at `#authentication`" — the existing cell already links to `#authentication`
   - What's unclear: Whether the cell needs updated prose or just the existing link is sufficient since the Kerberos row will be in the `#authentication` section
   - Recommendation: Add minimal prose ("incl. Kerberos SSO Extension") to make the cell self-documenting; any edit triggers V-63-09 bump which is the real obligation

2. **Exact number of Kerberos rows to add to the matrix**
   - What we know: D-02 says per-feature rows matching the PSSO table grammar; the existing PSSO table has 7 rows covering distinct dimensions
   - What's unclear: Whether 1 row (identity/deployment only) or 2 rows (identity/deployment + PSSO-TGT floor) is correct
   - Recommendation: 2 rows — one for the extension identity/deployment (KRB-01 facts) and one for the macOS 14.6 PSSO-TGT floor (KRB-02 fact), matching guide 10's two-section structure

---

## Environment Availability

Step 2.6: SKIPPED (no external tool dependencies — this is a documentation-only phase; `git hash-object` is always available in a git repository)

---

## Validation Architecture

Step 4: SKIPPED (`nyquist_validation: false` in `.planning/config.json`)

---

## Security Domain

`security_enforcement` not set in config.json — treated as enabled. However, this phase authors only documentation content (runbooks, matrix rows, glossary edits) with no code, authentication flows, or API integrations. No ASVS categories apply to pure Markdown authoring. The runbooks themselves document security-relevant procedures (Graph API delete, Kerberos TGT) but implementing the security controls is the responsibility of the guide files already authored in Phases 83/84, not of the runbooks referencing them.

---

## Sources

### Primary (HIGH confidence)
- `docs/reference/macos-capability-matrix.md` — full file read; H2 anchor list verified; row grammar confirmed
- `scripts/validation/check-phase-63.mjs` — V-63-08 (lines 202-221) and V-63-09 (lines 223-242) read verbatim; BASELINE constants confirmed; `git hash-object` mechanism confirmed
- `docs/l2-runbooks/27-macos-sso-investigation.md` — full file read; complete skeleton extracted
- `docs/reference/4-platform-capability-comparison.md` — full file read; `## Single Sign-On` section (lines 97-103) confirmed; macOS cell at line 101 quoted verbatim
- `docs/_glossary-macos.md` — full file read; Kerberos SSO Extension term at line 142 confirmed; Platform SSO see-also to guide 11 at line 128 confirmed; Alphabetical Index at line 17 confirmed
- `docs/_glossary.md` — read lines 145-183; Entra ID SSO term at lines 158-162 quoted verbatim
- `docs/admin-setup-macos/11-graph-api-platform-credential.md` — full file read; all endpoint shapes, permissions matrix, `[!WARNING]` wording confirmed
- `docs/l2-runbooks/00-index.md` — full file read; macOS ADE Runbooks table format confirmed; L1 Escalation Mapping table confirmed
- `.planning/milestones/v1.6-phases/63-multi-ou-architecture-apple-admin-setup/63-ANCHOR-INVENTORY.md` — full read; anchor inventory artifact format confirmed
- `node scripts/validation/check-phase-63.mjs` — executed; V-63-08 and V-63-09 FAIL confirmed; both pre-existing legacy FAILs documented
- `git hash-object docs/reference/macos-capability-matrix.md` → `e91f28c76441577d4e6176756ba04300ceb555e1`
- `git hash-object docs/reference/4-platform-capability-comparison.md` → `58b958639294c2bdb4082aecd9967a15d35aff2a`
- `ls docs/l1-runbooks/` — enumerated; confirmed no L1 Kerberos or L1 Graph runbook exists

### Secondary (MEDIUM confidence)
- 83-CONTEXT.md D-10/D-11/D-13 — locked diagnostic commands carried forward
- 84-CONTEXT.md D-08 — locked Graph nav property and `[!WARNING]` semantics carried forward

### Tertiary (LOW confidence — not applicable)
None.

---

## Metadata

**Confidence breakdown:**
- Anchor inventory mechanics: HIGH — live file read + precedent artifact read
- Blob-hash mechanics: HIGH — harness source read + `git hash-object` executed + check-phase-63.mjs run confirmed FAIL state
- Runbook template: HIGH — #27 read end-to-end; skeleton extracted verbatim
- Glossary state: HIGH — live file reads confirmed term presence
- L1 runbook absence: HIGH — directory enumerated
- Kerberos row count/labels: ASSUMED (Claude's Discretion per CONTEXT.md)

**Research date:** 2026-06-23
**Valid until:** 2026-09-23 (stable documentation domain — 90-day cadence matching review_by dates in the files)
