# Phase 87: Navigation Hub Integration - Research

**Researched:** 2026-06-23
**Domain:** Markdown nav-hub wiring / append-only documentation edits / Mermaid decision tree extension
**Confidence:** HIGH — all claims verified by reading live files in the working tree

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01 (index.md Admin Setup):** Enrich the existing line-132 Platform SSO row; keep link target on `admin-setup-macos/00-overview.md`; do NOT add discrete per-guide deep-link rows to guide 10/11 files.
- **D-02 (index.md L2 table):** Add two discrete rows — "macOS Kerberos SSO Investigation" and "macOS Graph Credential Investigation" — each linking to `l2-runbooks/00-index.md#macos-ade-runbooks`.
- **D-03 (00-index.md):** #28/#29 When-to-Use rows already exist at lines 87-88 (shipped P85). Add NO row to the macOS L1 Escalation Mapping table (lines 90-100): no L1 Kerberos/Graph runbook exists.
- **D-04 (quick-ref-l2.md):** Add `#### Kerberos SSO Diagnostics` block containing `klist` only (no `-v`); add a pointer sentence to the existing `app-sso platform -s` block; do NOT re-state the fenced block; `app-sso diagnose` PROHIBITED.
- **D-05 (common-issues.md):** Standalone `### Kerberos SSO Extension Failure` entry after `### Platform SSO Sign-In Failure` (:213-218); L1-line in "no L1 runbook — escalate to L2" style; L2 link to runbook #28.
- **D-06 (06-macos-triage.md placement):** Kerberos leaf as a third arm under the existing MACSSO diamond; NOT a new MAC3 branch.
- **D-07 (06-macos-triage.md leaf color):** New leaf MUST be RED `escalateL2` class; add `click` to `../l2-runbooks/28-macos-kerberos-sso-investigation.md`; add Routing Verification row; add Version-History line.

### Claude's Discretion
- Exact "When to Use" cell wording for the enriched Admin Setup row and the two new L2 rows (D-01/D-02).
- Exact `klist` note wording and Kerberos-pointer sentence phrasing (D-04).
- Exact symptom prose and L1/L2 bullet wording for the common-issues entry (D-05).
- Exact MACSSO third-arm edge label and new leaf node ID/text (D-06/D-07), subject to MACSSO-label resolution in Research Item 1 below.
- Per-plan commit granularity within append-only / navigation-last constraints.

### Deferred Ideas (OUT OF SCOPE)
- v1.10 harness lineage bump, check-phase-83..88 validators, audit-harness-v1.10-integrity.yml, 3-axis terminal re-audit, milestone close — all Phase 88.
- Any new L1 Kerberos or L1 Graph runbook — none exists; not in v1.10 scope.
- Fabricated escalation-mapping rows for #28/#29 — rejected (D-03).
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| REF-03 | Navigation hubs integrate the new content navigation-last across all 5 files: `docs/index.md`, `common-issues.md`, `quick-ref-l2.md`, `l2-runbooks/00-index.md`, and `decision-trees/06-macos-triage.md` Kerberos/Graph leaf | All 4 content link targets confirmed committed; all 5 nav file insertion points grounded with exact line numbers and row grammar below |
</phase_requirements>

---

## Summary

Phase 87 is a pure append-only nav-wiring phase. All four content targets (guides 10/11, runbooks 28/29) are confirmed committed in the working tree — the navigation-last invariant is satisfiable. The five nav files are NOT under any byte-unchanged hash guard, so no baseline bump is required alongside these edits.

The four plan-time verification items from the Referee are fully resolved below. The most complex item — how to add a Kerberos third arm to the MACSSO diamond — has a clean solution: the MACSSO question is PSSO-registration-specific ("Did a 'Registration Required' notification ever appear?"), but a Kerberos arm can be appended as a distinct edge labeled `"Kerberos TGT<br/>not acquired"` without re-labeling the diamond. Triage users arriving via MAC3 "Platform SSO sign-in issue" who instead have a Kerberos problem will reach the MACSSO diamond and can follow the new third arm. This stays within the 3-edge routing budget: MAC1 → MAC3 → MACSSO → new leaf (exactly 3 edges from root).

**Primary recommendation:** Execute 87-01 (index.md + common-issues.md) and 87-02 (quick-ref-l2.md + 00-index.md verify + 06-macos-triage.md) as two sequential append-only plan units. Every edit is a straightforward table-row insert or block-append. The MACSSO diamond extension is the only structurally sensitive edit; the exact Mermaid lines are provided in Research Item 1.

---

## 1. Navigation-Last Verification: All 4 Content Targets Committed

[VERIFIED: git ls-files]

| Content File | Phase Authored | Present in Working Tree |
|---|---|---|
| `docs/admin-setup-macos/10-kerberos-sso-extension.md` | P83 | YES |
| `docs/admin-setup-macos/11-graph-api-platform-credential.md` | P84 | YES |
| `docs/l2-runbooks/28-macos-kerberos-sso-investigation.md` | P85 | YES |
| `docs/l2-runbooks/29-macos-graph-credential-investigation.md` | P85 | YES |

**Navigation-last invariant: SATISFIED.** All four link targets exist before any nav-hub link is committed.

---

## 2. Per-File Insertion Points and Row/Entry Grammar

### 2.1 `docs/index.md`

**Current state (lines 112-132 are the macOS Desktop Engineering L2 and Admin Setup tables):**

Line 123 — the #27 row, exact grammar template for D-02 new L2 rows:
```
| [macOS Platform SSO Investigation](l2-runbooks/00-index.md#macos-ade-runbooks) | PSSO registration failure or Password-sync failure investigation (runbook #27) |
```

Line 132 — the existing Platform SSO Admin Setup row to enrich (D-01):
```
| [macOS Platform SSO Admin Setup Guides](admin-setup-macos/00-overview.md) | Platform SSO deployment (guide 07: setup), authentication method selection and deep-dive (guide 08: Secure Enclave key, Password sync, Smart card), and legacy SSO plug-in migration (guide 09) |
```

**D-01 insertion (enriched Admin Setup row, replaces line 132):**
The existing "When to Use" cell names guides 07/08/09. Add guide 10 (Kerberos SSO Extension) and guide 11 (Graph API Platform Credential) to the summary text. The link target stays `admin-setup-macos/00-overview.md`. Exact wording is Claude's Discretion per CONTEXT.md.

Example enriched row (Claude's Discretion — exact wording editable):
```
| [macOS Platform SSO Admin Setup Guides](admin-setup-macos/00-overview.md) | Platform SSO deployment (guide 07: setup), authentication method selection and deep-dive (guide 08), legacy SSO plug-in migration (guide 09), Kerberos SSO Extension deployment (guide 10), and Graph API Platform Credential management (guide 11) |
```

**D-02 insertion point:** After line 123 (after the #27 row), before line 124 (the blank line before the `### Admin Setup` H3). Two new rows, each linking to `l2-runbooks/00-index.md#macos-ade-runbooks`:
```
| [macOS Kerberos SSO Investigation](l2-runbooks/00-index.md#macos-ade-runbooks) | Kerberos TGT not acquired, realm/KDC unreachable, or PSSO-TGT integration failure (runbook #28) |
| [macOS Graph Credential Investigation](l2-runbooks/00-index.md#macos-ade-runbooks) | Platform Credential not appearing in Graph, delete-and-re-register flow, or permission errors (runbook #29) |
```

Grammar mirrors line 123 exactly: `| [Display text](link) | When to Use cell text |`

**Version History insertion (after line 323):** Add a new row immediately after the Phase 81 row at line 323:
```
| 2026-06-23 | Phase 87 (REF-03): enriched macOS Admin Setup Platform SSO row to name guides 10/11; added macOS L2 rows for Kerberos SSO Investigation (#28) and Graph Credential Investigation (#29) | -- |
```

---

### 2.2 `docs/common-issues.md`

**Current state — `### Platform SSO Sign-In Failure` entry at lines 213-218:**
```
### Platform SSO Sign-In Failure

Platform SSO "Registration Required" notification never appeared despite Intune reporting Succeeded, or Platform SSO sign-in is failing after registration.

- **L1:** [Platform SSO Sign-In Failure](l1-runbooks/35-macos-sso-sign-in-failure.md) — four root causes: old Company Portal, Error 10002 legacy conflict, mistyped registration token, dismissed notification
- **L2:** [Platform SSO Investigation](l2-runbooks/27-macos-sso-investigation.md)
```

**Grammar templates for the L1 "no L1 runbook" style (D-05):**

TPM (line 64):
```
- **L1:** [L1 Runbook Index](l1-runbooks/00-index.md#tpm-attestation-note) — no L1 runbook; escalate to L2
```

Hybrid Join (line 87):
```
- **L1:** [L1 Runbook Index](l1-runbooks/00-index.md) — escalate to L2 with domain details
```

**D-05 insertion point:** After line 218 (after the `### Platform SSO Sign-In Failure` entry's closing L2 bullet), before line 220 (the `## iOS/iPadOS Failure Scenarios` H2). The new entry must be:

```markdown
### Kerberos SSO Extension Failure

Kerberos TGT not acquired, realm or KDC unreachable, or `usePlatformSSOTGT` PSSO-TGT integration failing.

- **L1:** No L1 runbook — escalate to L2
- **L2:** [Kerberos SSO Investigation](l2-runbooks/28-macos-kerberos-sso-investigation.md)
```

(Exact symptom prose and L1/L2 bullet wording is Claude's Discretion; the L1 line must follow the "no L1 runbook — escalate to L2" style matching lines 64/87.)

**Version History insertion (after line 380):** Add a new row at the top of the version history table:
```
| 2026-06-23 | Phase 87 (REF-03): added Kerberos SSO Extension Failure entry under macOS ADE Failure Scenarios | -- |
```

---

### 2.3 `docs/quick-ref-l2.md`

**Current state — existing `#### Platform SSO Attestation Command` block (lines 180-188):**
```
#### Platform SSO Attestation Command

Verify PSSO registration state -- run on the affected Mac:

```bash
app-sso platform -s
```

Expected healthy output includes both `Device Registration: REGISTERED` and `User Registration: REGISTERED` with SSO tokens listed. See [07-platform-sso-setup.md — Verification](admin-setup-macos/07-platform-sso-setup.md) for the full expected output format.
```

**Current state — macOS Investigation Runbooks list (lines 190-196):**
```
### macOS Investigation Runbooks

- [macOS Log Collection Guide](l2-runbooks/10-macos-log-collection.md) -- prerequisite for all macOS investigations
- [Profile Delivery Investigation](l2-runbooks/11-macos-profile-delivery.md)
- [App Install Failure Diagnosis](l2-runbooks/12-macos-app-install.md)
- [Compliance Evaluation Investigation](l2-runbooks/13-macos-compliance.md)
- [Platform SSO Investigation](l2-runbooks/27-macos-sso-investigation.md) -- PSSO registration failure and Password-sync failure investigation
```

**D-04 insertion point:** After line 188 (end of the `#### Platform SSO Attestation Command` block), before line 190 (the `### macOS Investigation Runbooks` H3). Add a sibling `####` block:

```markdown
#### Kerberos SSO Diagnostics

Verify Kerberos ticket cache -- run on the affected Mac:

```bash
klist
```

Healthy output shows a TGT with a future expiry for the configured realm. An empty cache or "No credentials cache found" indicates TGT acquisition failure. For PSSO-TGT integration context (`tgt_ad` on-prem vs `tgt_cloud` Entra), see the [Platform SSO Attestation Command](#platform-sso-attestation-command) block above.
```

(Exact note wording and pointer sentence phrasing are Claude's Discretion per CONTEXT.md; the locked constraints are: plain `klist` only, no `-v`, no re-stating the `app-sso platform -s` fenced block, no `app-sso diagnose`.)

**Runbook bullet insertion:** Add a bullet for runbook #28 to the `### macOS Investigation Runbooks` list at line 196 (after the #27 bullet):
```
- [Kerberos SSO Investigation](l2-runbooks/28-macos-kerberos-sso-investigation.md) -- Kerberos TGT not acquired, realm/KDC reachability, and PSSO-TGT integration investigation
```

**Version History insertion (line 373):** Add a new row at the top of the version history table:
```
| 2026-06-23 | Phase 87 (REF-03): added Kerberos SSO Diagnostics block (klist) + Kerberos SSO Investigation runbook bullet to macOS section | -- |
```

---

### 2.4 `docs/l2-runbooks/00-index.md`

**D-03 verification (confirmed by live file read):**

Rows #28 and #29 ALREADY EXIST at lines 87-88 (shipped by Phase 85):
```
| [Kerberos SSO Investigation](28-macos-kerberos-sso-investigation.md) | Kerberos TGT not acquired, realm/KDC unreachable, or PSSO-TGT integration failure (`usePlatformSSOTGT`) | [macOS Log Collection](10-macos-log-collection.md) |
| [Graph Credential Investigation](29-macos-graph-credential-investigation.md) | Platform Credential not appearing in Graph, delete-and-re-register flow, or permission/scope errors on `platformCredentialMethods` | [macOS Log Collection](10-macos-log-collection.md) |
```

The macOS L1 Escalation Mapping table runs lines 90-100. No row is to be added (D-03 LOCKED).

**Plan 87-02 action for this file:** READ and verify that lines 87-88 are present as expected, then confirm no row is needed in the L1 Escalation Mapping table. This is a verify-only action — no edit is required.

**No Version History bump is required for 00-index.md** because no edit is made to this file in Phase 87. The Phase 85 version history entry at line 225 (not yet present — Phase 85 added the rows but the version history for 00-index shows the P80 entry at line 219) is already the current truth.

Note: If the planner determines a version history stamp acknowledging the Phase 87 verification is warranted, the existing precedent at line 219:
```
| 2026-06-21 | Phase 80 SSORUN-03/SC4: added macOS Platform SSO Investigation #27 to When-to-Use table; added L1 #35 and L1 #36 escalation mapping rows to macOS L1 Escalation Mapping table | -- |
```
...is the grammar template.

---

### 2.5 `docs/decision-trees/06-macos-triage.md`

**Current MACSSO block (lines 43-45):**
```
    MAC3 -->|"Platform SSO<br/>sign-in issue"| MACSSO{"Did a 'Registration Required'<br/>notification ever appear?"}
    MACSSO -->|"No — notification<br/>never appeared"| MACR7(["See: Platform SSO<br/>Sign-In Failure Runbook"])
    MACSSO -->|"Yes, but key error<br/>or lost after reset"| MACR8(["See: Platform SSO —<br/>Secure Enclave Key Loss Runbook"])
```

**Current classDef lines (56-60):**
```
    classDef resolved fill:#28a745,color:#fff
    classDef escalateL2 fill:#dc3545,color:#fff
    class MACR1,MACR2,MACR3,MACR4,MACR5,MACR6 resolved
    class MACR7,MACR8 resolved
    class MACE1 escalateL2
```

**Current Routing Verification table (lines 67-77):**
```
| Path | Step 1 | Step 2 | Destination |
|------|--------|--------|-------------|
| Device not appearing | Setup Assistant? No | Visible in Intune? No | Runbook 10 |
| Setup Assistant stuck | Setup Assistant? No | Visible in Intune? Yes | Runbook 11 |
| Profile not applied | Setup Assistant? Yes | Symptom: profile | Runbook 12 |
| App not installed | Setup Assistant? Yes | Symptom: app | Runbook 13 |
| Compliance / access blocked | Setup Assistant? Yes | Symptom: non-compliant | Runbook 14 |
| Company Portal sign-in | Setup Assistant? Yes | Symptom: CP sign-in | Runbook 15 |
| Other / unclear | Setup Assistant? Yes | Symptom: other | L2 escalation |
| Platform SSO — registration not appearing | Setup Assistant? Yes | Symptom: Platform SSO | Runbook 35 |
| Platform SSO — Secure Enclave key error | Setup Assistant? Yes | Symptom: Platform SSO → key error | Runbook 36 |
```

**Current Version History (lines 101-106):**
```
| Date | Change | Author |
|------|--------|--------|
| 2026-04-14 | Initial version | -- |
| 2026-06-22 | Phase 81 (SSOREF-04): added Platform SSO sub-decision leaf (MACSSO -> #35/#36) + 2 Routing Verification rows | -- |
```

---

## 3. Resolution of the 4 Plan-Time Verification Items

### 3.1 MACSSO Diamond Label vs Kerberos Arm (D-06) — RESOLVED

**The MACSSO question text (live, line 43):**
```
MACSSO{"Did a 'Registration Required'<br/>notification ever appear?"}
```

This is PSSO-registration-specific. However, D-06 locks the Kerberos leaf as a *third arm* under MACSSO without a new MAC3 branch. The triage reasoning is: MAC3 edge "Platform SSO sign-in issue" is the user-facing symptom entry point for all SSO-layer failures; L1 triage cannot distinguish Kerberos-extension failure from PSSO failure at that step. Once routed to MACSSO, a third edge can discriminate.

**The clean solution:** Add a Kerberos-specific third arm to MACSSO using an edge label that describes the distinct symptom, rather than re-labeling the diamond. The MACSSO question ("Did a 'Registration Required' notification ever appear?") does NOT need to change — a user with a Kerberos TGT problem will answer "No" OR arrive at MACSSO and recognize their symptom better matches a third arm labeled `"Kerberos TGT<br/>not acquired"`. Since D-06 explicitly locks this as a sub-branch under MACSSO without re-deriving the decision, the executor follows the decision as given.

**Exact Mermaid lines to add:**

After line 45 (after the MACR8 line), add:
```
    MACSSO -->|"Kerberos TGT<br/>not acquired"| MACE2(["Escalate to L2:<br/>Kerberos SSO Investigation"])
```

After line 54 (after the `click MACR8` line), add:
```
    click MACE2 "../l2-runbooks/28-macos-kerberos-sso-investigation.md"
```

On line 60 (the `class MACE1 escalateL2` line), extend to include MACE2:
```
    class MACE1,MACE2 escalateL2
```

(MACR7/MACR8 remain on the `resolved` class line unchanged — they route to L1 runbooks.)

**Routing budget verification:**
- MAC1 → MAC3 → MACSSO → MACE2 = 3 edges from root (MAC1)
- This is within the documented 3-edge routing budget (`:15`/`:65`)
- The path is: MAC1 "Did Setup Assistant complete?" → Yes → MAC3 "What is the primary symptom?" → "Platform SSO sign-in issue" → MACSSO → "Kerberos TGT not acquired" → MACE2 (L2 escalation)

**Routing Verification row to add** (after the Platform SSO key error row at line 77):
```
| Kerberos SSO — TGT not acquired | Setup Assistant? Yes | Symptom: Platform SSO → Kerberos TGT | L2 escalation (#28) |
```

**Summary of all Mermaid changes to 06-macos-triage.md:**
1. Line 45 (after MACR8 line): add `MACSSO -->|"Kerberos TGT<br/>not acquired"| MACE2(["Escalate to L2:<br/>Kerberos SSO Investigation"])`
2. Line 54 (after `click MACR8`): add `click MACE2 "../l2-runbooks/28-macos-kerberos-sso-investigation.md"`
3. Line 60: change `class MACE1 escalateL2` to `class MACE1,MACE2 escalateL2`
4. Line 77 (after last Routing Verification row): add Kerberos row
5. Lines 104-106 (Version History): add Phase 87 row

---

### 3.2 L2-Index Anchor Slug (D-02) — CONFIRMED

**Live heading at `docs/l2-runbooks/00-index.md` line 71:**
```
## macOS ADE Runbooks
```

**GitHub-style slug computation:**
1. Lowercase: `macos ade runbooks`
2. Remove non-word chars (except hyphens): `macos ade runbooks`
3. Replace spaces with hyphens: `macos-ade-runbooks`

**Confirmed anchor:** `#macos-ade-runbooks`

[VERIFIED: live file read + slug algorithm]

The D-02 L2 rows in `docs/index.md` MUST link to `l2-runbooks/00-index.md#macos-ade-runbooks` — this is the confirmed live anchor. The existing #27 row at line 123 already uses this exact link target, confirming the convention.

---

### 3.3 klist Form (D-04) — CONFIRMED FROM LOCKED DECISIONS

**Locked form (P83 D-11/D-13):** Plain `klist`, NO `-v`, NO macOS-version-variant flags.

**Verification:** The 83-CONTEXT.md D-11 states: "Pin the `klist` invocation to a version-stable form — no macOS-version-variant flags (avoid unguarded `klist -v`)." D-13 explicitly states "`app-sso diagnose` is PROHIBITED" (unverified, banned since v1.9 Phase 80).

**One-line interpretation guidance (P83 D-12):** `klist` shows the Kerberos ticket cache. Healthy output includes a TGT entry with an expiry timestamp in the future for the configured realm. An empty cache or "No credentials cache found" indicates TGT acquisition failure. For PSSO-TGT context, cross-reference `app-sso platform -s` — the `tgt_ad` field confirms an on-prem AD ticket path; `tgt_cloud` confirms an Entra Kerberos ticket path.

**Prohibited invocations (must not appear in any Phase 87 content):**
- `klist -v` — not version-stable
- `app-sso diagnose` — banned (P83 D-13, P80 precedent)
- `app-sso kerberos` — not used (plan-time-verify-only per P83; do not ship without live binary verification)

---

### 3.4 Frozen-Surface / Check-Phase Guard (Hash-Baseline Audit) — VERIFIED: NO GUARDS ON 5 NAV FILES

**Search scope:** All `scripts/validation/check-phase-*.mjs` files, pattern `BASELINE|hash-object|byte-unchanged|frozen`, cross-referenced against the 5 nav files.

**Findings:**

The only `git hash-object` BASELINE guards in the entire validation suite are:

| Validator | File Guarded | BASELINE Constant | Line |
|---|---|---|---|
| `check-phase-63.mjs` | `docs/reference/macos-capability-matrix.md` | `73f16378197223378a8507a6751c763902de58db` | 209 |
| `check-phase-63.mjs` | `docs/reference/4-platform-capability-comparison.md` | `2314ede7be54efbea1d4a4a787068310869a5896` | 230 |
| `check-phase-69.mjs` | CI workflow YAML files (v1.4/v1.5/v1.6) | (per-file) | 148 |
| `check-phase-70.mjs` | CI workflow YAML files (v1.4/v1.5/v1.6) | (per-file) | 400 |

**The 5 Phase 87 nav files — status:**

| Nav File | Hash Guard? | Validator | Action Required |
|---|---|---|---|
| `docs/index.md` | NONE | — | None — edit freely |
| `docs/common-issues.md` | NONE | — | None — edit freely |
| `docs/quick-ref-l2.md` | NONE | — | None — edit freely |
| `docs/l2-runbooks/00-index.md` | NONE | — | None — verify-only (no edit) |
| `docs/decision-trees/06-macos-triage.md` | NONE | — | None — edit freely |

**Conclusion:** No frozen-surface baseline bump is required for any of the 5 nav files. The P85 precedent (V-63-08/V-63-09 atomic bumps) applies only to `macos-capability-matrix.md` and `4-platform-capability-comparison.md`, which Phase 87 does not touch. [VERIFIED: grep of all check-phase-*.mjs files]

---

## 4. Append-Only / Version-History-Stamp Checklist Per File

Each touched nav file carries a Version History table. Phase 87 MUST add a dated row to each file it edits.

| File | Version History Location | Grammar Template (last row) | Phase 87 stamp required? |
|---|---|---|---|
| `docs/index.md` | Lines 319-335 | `\| 2026-06-22 \| Phase 81 (SSOREF-04): appended Platform SSO rows ... \| -- \|` | YES |
| `docs/common-issues.md` | Lines 379-387 | `\| 2026-06-22 \| Phase 81 (SSOREF-04): appended Platform SSO Sign-In Failure entry ... \| -- \|` | YES |
| `docs/quick-ref-l2.md` | Lines 370-382 | `\| 2026-06-22 \| Phase 81 (SSOREF-04): appended Platform SSO Log Paths section ... \| -- \|` | YES |
| `docs/l2-runbooks/00-index.md` | Lines 215-226 | `\| 2026-06-21 \| Phase 80 SSORUN-03/SC4: added macOS Platform SSO Investigation #27 ... \| -- \|` | NO (no edit made) |
| `docs/decision-trees/06-macos-triage.md` | Lines 102-106 | `\| 2026-06-22 \| Phase 81 (SSOREF-04): added Platform SSO sub-decision leaf ... \| -- \|` | YES |

**Version stamp convention (from Phase 81 precedent):** Insert new row AT THE TOP of the table body (after the header row), matching format `| YYYY-MM-DD | Description | -- |`. Date: 2026-06-23.

---

## 5. Phase 81 SSOREF-04 Precedent

Phase 81 (SSOREF-04) edited the same nav tables as Phase 87. These are the reference commit points and version-history stamps that document the append-only model:

| File | Phase 81 Version History Stamp | What was appended |
|---|---|---|
| `docs/index.md` line 323 | `2026-06-22 \| Phase 81 (SSOREF-04): appended Platform SSO rows to macOS Admin Setup / L1 / L2 nav tables` | Platform SSO rows to macOS Admin Setup + L2 tables |
| `docs/common-issues.md` line 380 | `2026-06-22 \| Phase 81 (SSOREF-04): appended Platform SSO Sign-In Failure entry routing to L1 #35 / L2 #27` | `### Platform SSO Sign-In Failure` entry |
| `docs/quick-ref-l2.md` line 373 | `2026-06-22 \| Phase 81 (SSOREF-04): appended Platform SSO Log Paths section + app-sso platform -s attestation command + L2 #27 investigation runbook bullet to macOS section` | Platform SSO Log Paths + `#### Platform SSO Attestation Command` + #27 runbook bullet |
| `docs/decision-trees/06-macos-triage.md` line 106 | `2026-06-22 \| Phase 81 (SSOREF-04): added Platform SSO sub-decision leaf (MACSSO -> #35/#36) + 2 Routing Verification rows` | MACSSO diamond + MACR7/MACR8 leaves + 2 Routing Verification rows |

**The Phase 81 precedent is the direct template for Phase 87.** Every structural pattern in Phase 87 (sub-H3 entry in common-issues, sibling `####` block in quick-ref-l2, additional arm in MACSSO, new rows in index.md tables) mirrors what Phase 81 did.

---

## 6. Common Pitfalls

### Pitfall 1: Adding a Row to the macOS L1 Escalation Mapping in 00-index.md
**What goes wrong:** Adding an "#28 — Kerberos SSO" or "#29 — Graph Credential" row to the L1 Escalation Mapping table (lines 90-100) to "complete" the index.
**Why it happens:** The When-to-Use table at lines 80-88 has #28/#29; the L1 Escalation Mapping table looks empty for those runbooks.
**How to avoid:** D-03 is LOCKED. No L1 Kerberos or L1 Graph runbook exists (P85 D-05). The L1 Escalation Mapping table maps L1 runbook sources to L2 destinations; without an L1 source, no row is valid. The L2-only reality is carried in common-issues.md's prose.
**Warning signs:** If the plan mentions "add row to macOS L1 Escalation Mapping," reject it.

### Pitfall 2: Re-Stating the `app-sso platform -s` Fenced Block in quick-ref-l2.md
**What goes wrong:** The new `#### Kerberos SSO Diagnostics` block copies the `app-sso platform -s` fenced block alongside `klist`.
**Why it happens:** The file already has `app-sso platform -s`; adding `klist` context without referencing PSSO feels incomplete.
**How to avoid:** D-04 is LOCKED: add `klist` only, add a pointer sentence to the existing `#### Platform SSO Attestation Command` block. Do NOT re-state the fenced block — this violates over-documentation discipline.

### Pitfall 3: Using a New MAC3 Branch Instead of MACSSO Third Arm
**What goes wrong:** Adding a separate `MAC3 -->|"Kerberos SSO<br/>issue"| MACKE1(...)` branch at the MAC3 level instead of under MACSSO.
**Why it happens:** Creating a new primary symptom branch at MAC3 seems cleaner for Kerberos.
**How to avoid:** D-06 is LOCKED: third arm under MACSSO only. The tree deliberately funnels all SSO symptoms through MAC3 → MACSSO; triage cannot distinguish Kerberos-extension from PSSO at the MAC3 symptom level.

### Pitfall 4: Coloring the New Mermaid Leaf Green
**What goes wrong:** The new MACE2 leaf is assigned `resolved` class (green) to match the visual symmetry of MACR7/MACR8.
**Why it happens:** MACR7/MACR8 are siblings under MACSSO and are green; adding a green sibling seems consistent.
**How to avoid:** D-07 is LOCKED: MACE2 MUST be `escalateL2` (red). MACR7/MACR8 are green only because they route to L1 runbooks (#35/#36). Since #28 is an L2-only runbook (no L1 Kerberos runbook exists), the leaf color MUST be red. The legend (`:24-25`) defines green = "follow the linked L1 runbook," red = "Escalate to L2."

### Pitfall 5: Linking the Admin Setup Row to a Numbered Guide File
**What goes wrong:** The D-01 enriched Admin Setup row links to `admin-setup-macos/10-kerberos-sso-extension.md` or `admin-setup-macos/11-graph-api-platform-credential.md` directly.
**Why it happens:** The iOS Admin Setup table (lines 165-167) does deep-link numbered guides; it seems natural to mirror that for the new macOS guides.
**How to avoid:** D-01 is LOCKED: the macOS Admin Setup table's own convention is to link to `admin-setup-macos/00-overview.md` for all rows. The iOS table is a different section with a different convention.

### Pitfall 6: Skipping the Version History Stamp
**What goes wrong:** An edit is committed to one of the 4 nav files without updating that file's Version History table.
**Why it happens:** The Version History table is at the bottom of each file; easy to overlook after making the functional edit.
**How to avoid:** Make the Version History stamp a required final step in each plan task. Check all 4 touched files (index.md, common-issues.md, quick-ref-l2.md, 06-macos-triage.md) have a Phase 87 row dated 2026-06-23.

### Pitfall 7: Modifying the classDef Lines Instead of Only the `class` Assignment
**What goes wrong:** Modifying the `classDef escalateL2 fill:#dc3545,color:#fff` line rather than extending the `class MACE1 escalateL2` assignment line to `class MACE1,MACE2 escalateL2`.
**Why it happens:** The edit target for adding a red leaf looks like the `classDef` lines.
**How to avoid:** The `classDef` lines define the style; the `class` lines assign nodes to styles. To add MACE2 as a red node: extend the `class MACE1 escalateL2` line only (line 60). The `classDef escalateL2` line (line 57) is unchanged.

---

## 7. Validation Architecture

**Note:** No new check-phase validators are authored in Phase 87 (those belong to Phase 88 per CONTEXT.md deferred items). The existing check-phase-81.mjs asserts 8 SSO-E cross-link edges that are unaffected by Phase 87 edits. No existing validator will FAIL due to Phase 87's append-only edits.

**Spot-check after each plan commit:**
- Confirm Version History row present in each touched file
- Confirm #28/#29 rows exist at 00-index.md lines 87-88 (D-03 verify)
- Confirm no `class MACR7,MACR8 escalateL2` regression (must stay `resolved`)
- Confirm `klist -v` does not appear anywhere in the new quick-ref-l2.md block
- Confirm `app-sso diagnose` does not appear anywhere in any Phase 87 edit

---

## 8. Environment Availability

**SKIPPED** — Phase 87 is purely append-only markdown edits. No external tools, services, runtimes, or CLIs beyond `git` (for commits) are required. No packages are installed.

---

## Sources

All findings are verified against live files in the working tree:

- `docs/index.md` — read lines 112-133, 319-335 [VERIFIED]
- `docs/common-issues.md` — read lines 60-88, 213-220, 379-387 [VERIFIED]
- `docs/quick-ref-l2.md` — read lines 178-198, 370-383 [VERIFIED]
- `docs/l2-runbooks/00-index.md` — read lines 71, 87-103, 215-226 [VERIFIED]
- `docs/decision-trees/06-macos-triage.md` — read full file [VERIFIED]
- `scripts/validation/check-phase-*.mjs` — searched all 34 validators for hash-object/BASELINE patterns [VERIFIED]
- `docs/admin-setup-macos/10-kerberos-sso-extension.md` — existence confirmed [VERIFIED]
- `docs/admin-setup-macos/11-graph-api-platform-credential.md` — existence confirmed [VERIFIED]
- `docs/l2-runbooks/28-macos-kerberos-sso-investigation.md` — existence confirmed [VERIFIED]
- `docs/l2-runbooks/29-macos-graph-credential-investigation.md` — existence confirmed [VERIFIED]
- `.planning/phases/87-navigation-hub-integration/87-CONTEXT.md` — decisions D-01..D-07 read [VERIFIED]
- `.planning/phases/85-capability-matrix-l2-runbooks/85-CONTEXT.md` — D-05 lock confirmed [VERIFIED]
- `.planning/phases/83-kerberos-sso-extension-guide/83-CONTEXT.md` — D-10/D-11/D-12/D-13 locks confirmed [VERIFIED]
- GitHub-style anchor slug algorithm applied to live heading "macOS ADE Runbooks" → `#macos-ade-runbooks` [VERIFIED]

---

## RESEARCH COMPLETE
