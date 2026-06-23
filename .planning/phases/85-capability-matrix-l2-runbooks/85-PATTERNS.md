# Phase 85: Capability Matrix + L2 Runbooks - Pattern Map

**Mapped:** 2026-06-23
**Files analyzed:** 9 new/modified files (2 new runbooks, 1 new planning artifact, 4 edits, 1 verify-only, 1 harness edit)
**Analogs found:** 8 / 9 (one file is verify-only with no write action needed)

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `.planning/phases/85-.../85-ANCHOR-INVENTORY.md` | planning artifact | transform | `.planning/milestones/v1.6-phases/63-.../63-ANCHOR-INVENTORY.md` | exact |
| `docs/reference/macos-capability-matrix.md` (edit) | reference doc | CRUD (append rows) | existing `## Authentication` table rows (`:104-112`) | exact (self-analog) |
| `scripts/validation/check-phase-63.mjs` (edit) | harness | transform | existing V-63-08 / V-63-09 BASELINE assignments (`:209`, `:230`) | exact (self-analog) |
| `docs/l2-runbooks/28-macos-kerberos-sso-investigation.md` | runbook | request-response | `docs/l2-runbooks/27-macos-sso-investigation.md` | exact |
| `docs/l2-runbooks/29-macos-graph-credential-investigation.md` | runbook | request-response | `docs/l2-runbooks/27-macos-sso-investigation.md` | role-match |
| `docs/l2-runbooks/00-index.md` (edit) | index | CRUD (append rows) | existing macOS ADE Runbooks table rows (`:80-86`) | exact (self-analog) |
| `docs/reference/4-platform-capability-comparison.md` (edit) | reference doc | transform | existing `## Single Sign-On` macOS cell (`:101`) | exact (self-analog) |
| `docs/_glossary.md` (edit) | glossary | transform | existing `> See also:` line at `:162` | exact (self-analog) |
| `docs/_glossary-macos.md` | glossary | — | (verify-only — no write; both terms confirmed present) | n/a |

---

## Pattern Assignments

### `.planning/phases/85-capability-matrix-l2-runbooks/85-ANCHOR-INVENTORY.md` (planning artifact, new file)

**Analog:** `.planning/milestones/v1.6-phases/63-multi-ou-architecture-apple-admin-setup/63-ANCHOR-INVENTORY.md`

**Header block pattern** (analog lines 1-7):
```markdown
# Phase 63 Pre-Edit Anchor Inventory

**Captured:** 2026-05-21 (BEFORE any Phase 63 edits to existing files)
**Files inventoried:** 2 existing files receiving surgical edits in Phase 63
**Purpose:** PITFALL-6 / DA-4 anchor-stability surface — compare pre/post to verify zero anchor shift
**Mirrors format:** `.planning/phases/62-apple-business-foundation-rebrand/62-ANCHOR-INVENTORY.md`
```

Mirror this exactly, substituting Phase 85 values:
```markdown
# Phase 85 Pre-Edit Anchor Inventory

**Captured:** 2026-06-23 (BEFORE any Phase 85 edits to existing files)
**Files inventoried:** 1 existing file receiving new rows
**Purpose:** Pre-edit anchor-stability surface (SC#1 / PITFALL-6 / DA-4 convention)
**Mirrors format:** .planning/milestones/v1.6-phases/63-multi-ou-architecture-apple-admin-setup/63-ANCHOR-INVENTORY.md
```

**Per-file section pattern** (analog lines 10-35):
```markdown
## File 1: docs/reference/ios-capability-matrix.md

**Pre-edit git SHA (last commit touching file):** `610b3bb9...`
**Receiving:** Exactly 3 new data rows appended under Enrollment H2 (before `## Configuration`) — Phase 63 OU-09.

### H2/H3 Anchor List (verbatim, pre-edit)

H2 anchors:
- `13:## Enrollment`
- `30:## Configuration`
[...]

H3 anchors: (none — this file uses H2-only section headings)

**Permitted edits per Plan 63-05 Task 2:**
- 3 data rows APPENDED inside the Enrollment H2 table (before `## Configuration` at line 30)
- Zero H2/H3 headings renamed
- Zero existing prose modified
- Byte-frozen sibling matrices [...] NOT touched
```

For Phase 85, substitute with the verified `macos-capability-matrix.md` data:

```markdown
## File 1: docs/reference/macos-capability-matrix.md

**Pre-edit git SHA (last commit touching file):** `45b4865`
**Pre-edit blob hash:** `e91f28c76441577d4e6176756ba04300ceb555e1`
**Receiving:** Kerberos SSO Extension row(s) appended inside the `## Authentication` table (before `## See Also`)

### H2/H3 Anchor List (verbatim, pre-edit)

H2 anchors:
- `13:## Enrollment`
- `29:## Configuration`
- `42:## App Deployment`
- `55:## Compliance`
- `67:## Software Updates`
- `79:## Conditional Access`
- `88:## Key Gaps Summary`
- `100:## Authentication`
- `114:## See Also`
- `122:## Version History`

H3 anchors: (none — H2-only file)

**Permitted edits per Plan 85-01:**
- New data row(s) APPENDED inside the Authentication H2 table
- Zero H2/H3 headings renamed
- Zero existing prose modified
- `check-phase-63.mjs` V-63-08 BASELINE updated to post-edit hash in same commit
```

**Byte-unchanged guard table pattern** (analog lines 65-74):
```markdown
## Byte-Unchanged Baseline: Guard Files (OU-10 / D-A3)

| File | Baseline git blob hash | Status |
|------|----------------------|--------|
| `docs/reference/macos-capability-matrix.md` | `e91d7f9e001bb7ff4dc56a4ca98c84868fbf0716` | BYTE-UNCHANGED REQUIRED (OU-10 / D-A3) |
| `docs/reference/4-platform-capability-comparison.md` | `f25ff51a14b7feac46611c4c0511ed5c074ce03f` | BYTE-UNCHANGED REQUIRED (OU-10 / D-A3) |

**Recompute command:** `git hash-object <file>` — must match exactly post-phase.
```

Phase 85 does NOT carry a byte-unchanged table (Phase 85 is the phase that changes these files). The 85-ANCHOR-INVENTORY.md records only what exists before the edit and the permitted operations. The post-edit checklist section should follow the analog's pattern at lines 78-88.

---

### `docs/reference/macos-capability-matrix.md` — `## Authentication` table (edit, append rows)

**Analog:** Self — existing rows at lines 104-112

**Table grammar** (lines 104-112, verbatim — the column contract Kerberos rows MUST match):
```markdown
| Feature | Windows | macOS |
|---------|---------|-------|
| Auth methods | n/a — not covered in this matrix | Three methods: Secure Enclave key (Microsoft-recommended), Password sync, Smart card — see [Auth Methods Deep Dive](../admin-setup-macos/08-auth-methods-deep-dive.md) |
| Hardware gate | n/a — not covered in this matrix | Secure Enclave method requires T2 chip (Intel 2018–2020) or Apple Silicon (M1+, 2020+); Password sync and Smart card have no hardware gate |
| macOS version floor | n/a — not covered in this matrix | macOS 14.0 Sonoma (recommended floor — all three methods, non-deprecated Settings Catalog key, NUAL); see [guide 08](../admin-setup-macos/08-auth-methods-deep-dive.md) for macOS 13 absolute-minimum details |
| Entra ID licensing | n/a — not covered in this matrix | No Entra ID P1 or P2 required for Platform SSO itself (Conditional Access integration is licensed independently of PSSO) |
| NUAL (New User at Login) | n/a — not covered in this matrix | Supported — macOS 14+; creates on-demand accounts at login window using Shared Device Keys — see [guide 08](../admin-setup-macos/08-auth-methods-deep-dive.md) |
| Passkey / FIDO2 | n/a — not covered in this matrix | Supported via Platform Credential — Secure Enclave method only; requires Entra Authentication-methods enablement — see [guide 08](../admin-setup-macos/08-auth-methods-deep-dive.md) |
| Hybrid Entra join | n/a — not covered in this matrix | **Not supported** — macOS PSSO requires Entra ID (cloud-only) join; hybrid Entra-joined devices are not supported by PSSO — see [Enterprise SSO Plug-in & Migration Guide](../admin-setup-macos/09-enterprise-sso-plugin-migration.md) |
```

**Rules the new Kerberos rows must obey:**
- Windows cell value is always: `n/a — not covered in this matrix` (never empty, never different)
- Feature column: short noun phrase (no parenthetical in the label itself, unless it's a code symbol like `usePlatformSSOTGT`)
- macOS cell: capability statement, then `— see [guide N](../admin-setup-macos/NN-...)` link at the end; guide 10 is the link target for Kerberos rows
- Bold is used only for strong negative assertions (`**Not supported**`) — positive capabilities use plain text
- Rows are appended to the end of the existing table body, before the `## See Also` H2 at line 114
- Version-floor rows use the pattern `macOS N.N [version name]` followed by a semicolon and the what/why

**Suggested new rows** (labels and count are Claude's Discretion per CONTEXT.md — these are the verified-grammar templates):
```markdown
| Kerberos SSO Extension | n/a — not covered in this matrix | Supported (`com.apple.AppSSOKerberos.KerberosExtension`, Type: Credential) — deployed via Intune Custom Template (.mobileconfig); see [Kerberos SSO Extension Guide](../admin-setup-macos/10-kerberos-sso-extension.md) |
| PSSO TGT integration (`usePlatformSSOTGT`) | n/a — not covered in this matrix | Supported (macOS 14.6+); enables Kerberos extension to reuse TGTs issued by Platform SSO — see [guide 10](../admin-setup-macos/10-kerberos-sso-extension.md) |
```

**Version History row pattern** (lines 124-128 of the matrix — add a new row here atomically with the rows above):
```markdown
| Date | Change | Author |
|------|--------|--------|
| 2026-04-14 | Initial version -- 5-domain capability matrix comparing Windows and macOS Intune management | -- |
| 2026-06-22 | Phase 81 (SSOREF-04): added E4 See Also cross-link to 07-platform-sso-setup.md | -- |
| 2026-06-21 | Add `## Authentication` section ... | -- |
```
New row format: `| 2026-06-23 | Phase 85 (REF-01): add Kerberos SSO Extension rows under ## Authentication | -- |`

---

### `scripts/validation/check-phase-63.mjs` — V-63-08 and V-63-09 BASELINE constants (edit)

**Analog:** Self — existing BASELINE assignments at lines 209 and 230

**V-63-08 BASELINE pattern** (lines 202-221, key lines):
```javascript
// === V-63-08: macos-capability-matrix.md byte-unchanged vs baseline blob e91d7f9e001bb7ff4dc56a4ca98c84868fbf0716 ===
{
  id: 8, name: 'V-63-08: macos-capability-matrix.md byte-unchanged vs baseline blob e91d7f9e001bb7ff4dc56a4ca98c84868fbf0716',
  run() {
    if (!existsSync(join(process.cwd(), MACOS_MATRIX))) {
      return { pass: false, detail: MACOS_MATRIX + ' missing' };
    }
    const BASELINE = 'e91d7f9e001bb7ff4dc56a4ca98c84868fbf0716';   // ← LINE 209: update to post-edit hash
    try {
      const result = execFileSync('git', ['hash-object', MACOS_MATRIX], { stdio: 'pipe', cwd: process.cwd() });
      const actual = result.toString().trim();
      if (actual !== BASELINE) {
        return { pass: false, detail: 'macos-capability-matrix.md blob hash CHANGED: expected ' + BASELINE + ', got ' + actual + ' (OU-10 D-A3 byte-unchanged invariant violated)' };
      }
      return { pass: true, detail: 'macos-capability-matrix.md blob hash matches baseline ' + BASELINE };
    } catch (err) {
      return { pass: true, skipped: true, detail: 'git hash-object not available -- skipped' };
    }
  }
},
```

**What to change:** Line 209 only — the string value of `const BASELINE`. The comment on line 202/204 (which also contains the old hash) is NOT mechanically checked by the harness; update it too for consistency but it is not what makes the test pass.

**V-63-09 BASELINE pattern** (lines 223-242 — identical structure):
```javascript
// === V-63-09: 4-platform-capability-comparison.md byte-unchanged vs baseline blob f25ff51a14b7feac46611c4c0511ed5c074ce03f ===
{
  id: 9, name: 'V-63-09: 4-platform-capability-comparison.md byte-unchanged vs baseline blob f25ff51a14b7feac46611c4c0511ed5c074ce03f',
  run() {
    ...
    const BASELINE = 'f25ff51a14b7feac46611c4c0511ed5c074ce03f';   // ← LINE 230: update to post-edit hash
    ...
  }
},
```

**What to change:** Line 230 only — the string value of `const BASELINE`.

**Coupling rule:** V-63-08 BASELINE is updated in the SAME commit as the `macos-capability-matrix.md` edit (Plan 85-01 Commit B). V-63-09 BASELINE is updated in the SAME commit as the `4-platform-capability-comparison.md` edit (Plan 85-02 Commit C). These are separate commits — do NOT update both BASELINEs in the same commit. After each edit+bump commit, verify with `node scripts/validation/check-phase-63.mjs` before moving on.

---

### `docs/l2-runbooks/28-macos-kerberos-sso-investigation.md` (new file, runbook)

**Analog:** `docs/l2-runbooks/27-macos-sso-investigation.md` (full file read above)

**Frontmatter pattern** (analog lines 1-7 — copy exactly, update dates):
```yaml
---
last_verified: 2026-06-23
review_by: 2026-09-23
applies_to: ADE
audience: L2
platform: macOS
---
```

**Platform gate blockquote pattern** (analog line 9 — adapt for #28):
```markdown
> **Platform gate:** This guide covers macOS Platform SSO L2 investigation via Intune and Entra. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For other macOS ADE investigation runbooks, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).
```

Adapt for #28:
```markdown
> **Platform gate:** This guide covers macOS Kerberos SSO Extension L2 investigation. For macOS Platform SSO investigation, see [macOS Platform SSO Investigation](27-macos-sso-investigation.md). For other macOS ADE investigation runbooks, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).
```

**Context section pattern** (analog lines 13-24):
```markdown
## Context

This runbook covers macOS Platform SSO (PSSO) failure investigation across two failure classes: [...]

Before starting: collect a diagnostic package per the [macOS Log Collection Guide](10-macos-log-collection.md). [...]

**From L1 escalation?** L1 runbook 35 [...] ← DO NOT REPLICATE THIS BLOCK in #28
```

For #28, keep `## Context` with a brief failure-class description, log-collection prerequisite, and the no-L1-escalation sentinel (D-05):
```markdown
## Context

This runbook covers macOS Kerberos SSO Extension failure investigation: Kerberos TGT not acquired, realm/KDC reachability failures, and PSSO-TGT integration failures (`usePlatformSSOTGT`).

Before starting: collect a diagnostic package per the [macOS Log Collection Guide](10-macos-log-collection.md). For Kerberos investigations, enable AppSSO debug logging before reproducing the issue.

No L1 escalation exists for this failure class — begin at Track A Step 1. For shared-symptom tickets involving Platform SSO, see [macOS Platform SSO Investigation](27-macos-sso-investigation.md).
```

**Track A / Track B heading and Step pattern** (analog lines 28-133):
```markdown
## Track A: Registration Failure Investigation

### Step 1: Confirm registration state via `app-sso platform -s`

Run the following command on the affected macOS device:

```bash
app-sso platform -s
```

[prose explaining output]

> **Important:** Do not interpret [single-field caveat] ...

### Step 2: [Title]
[...]

---

## Track B: Password-Sync Failure Investigation

[Track entry paragraph — when to use this track]

### Step 1: [Title]
[...]
```

Key diagnostics to embed verbatim in #28 (locked from 83-CONTEXT D-10/D-11):
```bash
app-sso platform -s
```
Interpret: `tgt_ad` key = on-prem AD TGT present; `tgt_cloud` key = Entra TGT present.

```bash
klist
```
Version-stable form only — NO `klist -v`.

PROHIBITED command — never mention in any step:
```
app-sso diagnose   ← PROHIBITED (analog #27 line 106 note confirms this)
```

**Microsoft Support Escalation Packet pattern** (analog lines 175-185):
```markdown
## Microsoft Support Escalation Packet

When Track A or Track B investigation does not resolve the issue, engage Microsoft Support. Assemble the following before opening a case:

- **`app-sso platform -s` full JSON output** — captured on the affected device at the time of failure; include the complete output, not excerpts
- **sysdiagnose archive** — captured with AppSSO debug logging enabled before reproducing the issue (Track A Step 3 procedure); required for Microsoft Support to analyze PSSO subsystem events
- **Company Portal log incident ID** — [...]
- **Intune device configuration status screenshot** — [...]
- **macOS version** and **Company Portal version** — [...]
```

**Related Resources pattern** (analog lines 188-196):
```markdown
## Related Resources

- [macOS Log Collection Guide (runbook 10)](10-macos-log-collection.md) — prerequisite for this runbook
- [L1 Runbook 35: macOS Platform SSO Sign-In Failure](../l1-runbooks/35-macos-sso-sign-in-failure.md) — escalation source [...]
- [macOS Platform SSO Setup Guide](../admin-setup-macos/07-platform-sso-setup.md) — [...]
```

For #28, include cross-links to #27/#35/#36 for shared-symptom tickets, plus guide 10.

**Version History pattern** (analog lines 200-204):
```markdown
## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-21 | Initial version — macOS Platform SSO L2 investigation (SSORUN-03): [...] | -- |
```

---

### `docs/l2-runbooks/29-macos-graph-credential-investigation.md` (new file, runbook)

**Analog:** `docs/l2-runbooks/27-macos-sso-investigation.md` (same template; #29 uses single track / numbered steps instead of Track A/B)

**Frontmatter, Platform gate, Context** — identical pattern to #28 above, adapted for Graph content.

**Single-track numbered steps structure** (no Track A/B split for #29 per SC#5):
```markdown
# macOS Graph Platform Credential Investigation

## Context

[Failure-class description: Platform Credential not appearing in Graph, delete-and-re-register flow, permission/scope errors]

No L1 escalation exists for this failure class — begin at Step 1.

---

### Step 1: Enumerate Platform Credentials

### Step 2: Verify credential properties

### Step 3: Delete credential

### Step 4: Verify re-registration

### Step 5: Permission/role troubleshooting

---

## Microsoft Support Escalation Packet

[same bulleted format as #27/#28]

---

## Related Resources

[same bulleted format]

---

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-23 | Initial version — [...] | -- |
```

**Graph endpoint shapes to embed verbatim** (locked from 84-CONTEXT D-08, verified in guide 11):
```http
GET https://graph.microsoft.com/v1.0/users/{id | userPrincipalName}/authentication/platformCredentialMethods
GET https://graph.microsoft.com/v1.0/users/{id}/authentication/platformCredentialMethods/{platformCredentialAuthenticationMethodId}?$expand=device
DELETE https://graph.microsoft.com/v1.0/users/{id | userPrincipalName}/authentication/platformCredentialMethods/{platformCredentialAuthenticationMethodId}
```

**Mandatory DELETE warning block pattern** (from guide 11 — verbatim semantics):
```markdown
> [!WARNING]
> Deleting a Platform Credential severs the Entra ID binding for the user's device and forces PSSO re-registration. The Secure Enclave private key on the device is NOT remotely erased — only the Entra-side record is removed.
```

**Link-not-copy rule for #29:** Do NOT reproduce the permissions table from guide 11 in the runbook. Link to `docs/admin-setup-macos/11-graph-api-platform-credential.md` §Permissions instead. Same for endpoint-shape details beyond the URL pattern itself.

---

### `docs/l2-runbooks/00-index.md` — macOS ADE Runbooks table (edit, append rows)

**Analog:** Self — existing table rows at lines 80-86

**Table row grammar** (lines 80-86, verbatim):
```markdown
| Runbook | When to Use | Prerequisite |
|---------|-------------|--------------|
| [macOS Log Collection Guide](10-macos-log-collection.md) | Before starting any macOS L2 investigation -- collect IntuneMacODC zip and Terminal diagnostic outputs | None |
| [Profile Delivery Investigation](11-macos-profile-delivery.md) | Configuration profile not delivered, showing error/conflict, or not taking effect on device | [macOS Log Collection](10-macos-log-collection.md) |
| [App Install Failure Diagnosis](12-macos-app-install.md) | DMG, PKG, or VPP app not installing, showing failed status, or continuous reinstall loop | [macOS Log Collection](10-macos-log-collection.md) |
| [Compliance Evaluation Investigation](13-macos-compliance.md) | Device non-compliant, compliance not evaluating, or Conditional Access blocking despite compliance | [macOS Log Collection](10-macos-log-collection.md) |
| [Platform SSO Investigation](27-macos-sso-investigation.md) | PSSO registration not completing, "Registration Required" loop, or Password-sync sign-in failure | [macOS Log Collection](10-macos-log-collection.md) |
```

**New rows to append** (matching the verified format exactly, after the `[Platform SSO Investigation]` row):
```markdown
| [Kerberos SSO Investigation](28-macos-kerberos-sso-investigation.md) | Kerberos TGT not acquired, realm/KDC unreachable, or PSSO-TGT integration failure (`usePlatformSSOTGT`) | [macOS Log Collection](10-macos-log-collection.md) |
| [Graph Credential Investigation](29-macos-graph-credential-investigation.md) | Platform Credential not appearing in Graph, delete-and-re-register flow, or permission/scope errors on `platformCredentialMethods` | [macOS Log Collection](10-macos-log-collection.md) |
```

**CRITICAL — Do NOT touch:** The `### macOS L1 Escalation Mapping` table at lines 88-98. D-05 prohibits adding rows for #28/#29 there. No L1 Kerberos or L1 Graph runbook exists.

---

### `docs/reference/4-platform-capability-comparison.md` — `## Single Sign-On` macOS cell (edit)

**Analog:** Self — existing macOS cell at line 101

**Current state of `## Single Sign-On` section** (lines 97-103, verbatim):
```markdown
## Single Sign-On

| Feature | Windows | macOS | iOS | Android | Linux |
|---------|---------|-------|-----|---------|-------|
| OS-integrated SSO (Platform SSO) | N/A | Supported (macOS 14+) — [matrix](macos-capability-matrix.md#authentication) | N/A | N/A | N/A |

> Non-macOS platform SSO authentication is not covered in this documentation set; `N/A` reflects deliberate scope, not capability absence.
```

**Edit target:** Line 101, macOS cell only. Link-not-copy pattern (D-08): add minimal prose referencing the Kerberos capability now covered under `#authentication`. The existing `[matrix](macos-capability-matrix.md#authentication)` link already points to the section that will contain the Kerberos rows — updating the cell prose makes it self-documenting. Example update:

```markdown
| OS-integrated SSO (Platform SSO) | N/A | Supported (macOS 14+, incl. Kerberos SSO Extension macOS 10.15+) — [matrix](macos-capability-matrix.md#authentication) | N/A | N/A | N/A |
```

Exact wording is Claude's Discretion per CONTEXT.md. The critical mechanical obligation: ANY edit to this file (even whitespace) changes the blob hash and requires the V-63-09 BASELINE at `check-phase-63.mjs:230` to be updated in the same commit.

---

### `docs/_glossary.md` — Entra ID SSO term see-also (edit)

**Analog:** Self — existing `> See also:` line at line 162

**Current state** (lines 158-162, verbatim):
```markdown
### Entra ID SSO

Microsoft Entra ID single sign-on on Windows devices: when a user signs in to an Entra-joined or Entra-registered device, the Web Account Manager (WAM) obtains a Primary Refresh Token (PRT) that silently authenticates the user to apps and browsers without requiring repeated credential entry. The PRT is hardware-bound (via TPM when available) and carries device compliance claims evaluated by Conditional Access policies.

> See also: [Enterprise SSO Plug-in](_glossary-macos.md#enterprise-sso-plug-in) (macOS equivalent via Microsoft Enterprise SSO plug-in and Platform SSO).
```

**Extension pattern** (D-09): Extend line 162 by appending additional semicolon-separated entries to the existing `> See also:` line. The macOS glossary uses the same semicolon-separated `> See also:` convention (confirmed at `_glossary-macos.md:128` and `:146`):

```markdown
> See also: [Enterprise SSO Plug-in](_glossary-macos.md#enterprise-sso-plug-in) (macOS equivalent via Microsoft Enterprise SSO plug-in and Platform SSO); [Kerberos SSO Extension](_glossary-macos.md#kerberos-sso-extension) (macOS on-premises Kerberos TGT extension, coexisting with PSSO); [Graph API: Platform Credential Management](admin-setup-macos/11-graph-api-platform-credential.md) (programmatic management of macOS Platform Credentials).
```

Exact wording of the new entries is Claude's Discretion. This file has NO harness guard — it can be committed in the same commit as the comparison-doc edit (Plan 85-02) or separately.

---

### `docs/_glossary-macos.md` (verify-only, no write action)

Both required terms are confirmed present (RESEARCH.md Finding 5):
- Kerberos SSO Extension term: lines 142-146
- Platform SSO → guide 11 see-also: line 128
- Alphabetical Index entry for Kerberos SSO Extension: line 17

**No edits to this file in Phase 85.** D-07 mandates verify-not-recreate. Do not add, modify, or duplicate any terms.

---

## Shared Patterns

### Runbook Frontmatter (applies to #28 and #29)
**Source:** `docs/l2-runbooks/27-macos-sso-investigation.md` lines 1-7
```yaml
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
applies_to: ADE
audience: L2
platform: macOS
---
```
Both new runbooks use identical frontmatter keys. `review_by` is 90 days after `last_verified`.

### Platform Gate Blockquote (applies to #28 and #29)
**Source:** `docs/l2-runbooks/27-macos-sso-investigation.md` line 9
```markdown
> **Platform gate:** This guide covers [scope]. For [adjacent runbook], see [link]. For other macOS ADE investigation runbooks, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).
```

### Step Prose Structure (applies to #28 and #29)
**Source:** `docs/l2-runbooks/27-macos-sso-investigation.md` lines 30-51
Each step: title in `### Step N: [verb phrase]`, brief action description, code block(s) with fenced bash/http, "Interpreting the output" or "Key observations" subsection, and a `> **Important:**` callout for high-stakes caveats.

### Semicolon-Separated See-Also Blockquote (applies to `_glossary.md` edit and any glossary cross-linking)
**Source:** `docs/_glossary-macos.md` line 128 (Platform SSO term) and line 146 (Kerberos SSO Extension term)
```markdown
> See also: [Term A](link-a); [Term B](link-b) (parenthetical qualifier); [Term C](link-c).
```
Pattern: blockquote, "See also:", entries separated by semicolons, each entry may carry a short parenthetical clarifier in parentheses, ends with a period.

### Atomic Blob-Hash Baseline Bump (applies to all edits that trigger V-63-08 or V-63-09)
**Source:** `scripts/validation/check-phase-63.mjs` lines 202-242

Procedure for each guarded file:
1. Edit the documentation file
2. `git hash-object <file>` — captures post-edit hash
3. Update the matching `const BASELINE = '...'` in check-phase-63.mjs (line 209 for V-63-08, line 230 for V-63-09)
4. Stage BOTH files together (`git add <doc-file> scripts/validation/check-phase-63.mjs`)
5. `node scripts/validation/check-phase-63.mjs` — verify the relevant check now passes before committing
6. Commit atomically

### Version History Table (applies to all modified docs that carry version history)
**Source:** `docs/reference/macos-capability-matrix.md` lines 123-128
```markdown
| Date | Change | Author |
|------|--------|--------|
| YYYY-MM-DD | [description] | -- |
```
Author cell is always `--`. Date is ISO 8601. Description format: `Phase NN (REQID): [what changed]`.

---

## No Analog Found

No files in Phase 85 are without analogs. All patterns are grounded in existing codebase files.

---

## Critical Anti-Patterns (executor must avoid)

| Anti-Pattern | Source of Lock | What to Do Instead |
|---|---|---|
| `app-sso diagnose` in any step of #28 | 83-CONTEXT D-13; confirmed in #27 line 106 | Use `app-sso platform -s` + sysdiagnose procedure (link to #27 Step 3) |
| `klist -v` in #28 | 83-CONTEXT D-11 | Use bare `klist` only |
| "From L1 escalation" routing block in #28 or #29 | D-05; no L1 Kerberos/Graph runbook exists | Single sentence: "No L1 escalation exists — begin at Step 1" |
| Adding #28/#29 to the L1 Escalation Mapping table in 00-index.md | D-05 | Append to the "When to Use" table only |
| New term added to `_glossary-macos.md` | D-07; both terms already exist | Verify existing lines 142 and 128; do not touch the file |
| Setting V-63-08 BASELINE to `e91d7f9e...` (Phase 63 original) | RESEARCH.md Finding 2 Pitfall 1 | Use the post-edit `git hash-object` result |
| Setting V-63-09 BASELINE to `f25ff51a...` (Phase 63 original) | RESEARCH.md Finding 2 Pitfall 2 | Use the post-edit `git hash-object` result |
| Bumping V-63-09 in the matrix commit, or V-63-08 in the comparison-doc commit | CONTEXT.md Specifics; RESEARCH.md Finding 2 | Each BASELINE bump is in the same commit as its own file's edit only |
| `platformCredentialAuthenticationMethod` as a URL path segment in #29 | 84-CONTEXT D-08 | Use `platformCredentialMethods` as the nav property in the URL |
| Inline permissions table in #29 | 84-CONTEXT D-08; RESEARCH.md "Don't Hand-Roll" | Link-not-copy to guide 11 §Permissions |
| Adding a new `## SSO Extensions` H2 to the capability matrix | D-01 | Append Kerberos rows inside the existing `## Authentication` H2 |

---

## Metadata

**Analog search scope:** `docs/l2-runbooks/`, `docs/reference/`, `docs/_glossary*.md`, `scripts/validation/`, `.planning/milestones/`
**Files scanned:** 9 source files (all directly read; no guessing)
**Pattern extraction date:** 2026-06-23
