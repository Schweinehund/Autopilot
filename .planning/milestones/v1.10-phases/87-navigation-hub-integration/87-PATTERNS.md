# Phase 87: Navigation Hub Integration - Pattern Map

**Mapped:** 2026-06-23
**Files analyzed:** 5 (all existing files — append-only; no new files are created)
**Analogs found:** 5 / 5 (every in-file analog is within the same file being modified)

---

## File Classification

| Modified File | Role | Data Flow | Closest In-File Analog | Match Quality |
|---|---|---|---|---|
| `docs/index.md` (Admin Setup row enrich) | nav table row — enrichment | transform (cell text expand) | Line 132 — existing Platform SSO Admin Setup row | exact (same row, same link target) |
| `docs/index.md` (two new L2 rows #28/#29) | nav table row — insert | append | Line 123 — `[macOS Platform SSO Investigation]` row (#27) | exact (same table, identical column grammar) |
| `docs/common-issues.md` (new `### Kerberos SSO Extension Failure`) | symptom entry — insert | append | Lines 213-218 — `### Platform SSO Sign-In Failure` entry; L1-line style from lines 64 / 87 | exact (same file, same H3 grammar and L1/L2 bullet pattern) |
| `docs/quick-ref-l2.md` (new `#### Kerberos SSO Diagnostics` block + runbook bullet) | cheat-sheet block — insert | append | Lines 180-188 — `#### Platform SSO Attestation Command` block; line 196 — #27 runbook bullet | exact (same file, same `####` + fenced-code + prose structure) |
| `docs/l2-runbooks/00-index.md` | verify-only | read-only confirm | Lines 87-88 — existing #28/#29 When-to-Use rows (shipped P85) | n/a — no edit |
| `docs/decision-trees/06-macos-triage.md` (MACE2 leaf + class + click + Routing row) | mermaid node — insert | append | Lines 44-45 — MACR7/MACR8 leaf lines; line 60 — `class MACE1 escalateL2`; lines 76-77 — last two Routing Verification rows | exact (same Mermaid block, same classDef and class assignment grammar) |

---

## Pattern Assignments

### A. `docs/index.md` — Admin Setup row enrichment (D-01)

**Analog (line 132 — verbatim):**
```
| [macOS Platform SSO Admin Setup Guides](admin-setup-macos/00-overview.md) | Platform SSO deployment (guide 07: setup), authentication method selection and deep-dive (guide 08: Secure Enclave key, Password sync, Smart card), and legacy SSO plug-in migration (guide 09) |
```

**Grammar:** `| [Display text](admin-setup-macos/00-overview.md) | Prose enumerating guides by number and topic |`

**Edit action:** Replace line 132 in-place (the only modification, not an insertion). Keep the link target `admin-setup-macos/00-overview.md` unchanged. Append guide 10 and guide 11 to the "When to Use" cell, following the comma-and-connector list already established by guides 07/08/09. Exact wording is Claude's Discretion.

**Example enriched row (wording editable):**
```
| [macOS Platform SSO Admin Setup Guides](admin-setup-macos/00-overview.md) | Platform SSO deployment (guide 07: setup), authentication method selection and deep-dive (guide 08: Secure Enclave key, Password sync, Smart card), legacy SSO plug-in migration (guide 09), Kerberos SSO Extension deployment (guide 10), and Graph API Platform Credential management (guide 11) |
```

**Constraints:**
- Link target MUST remain `admin-setup-macos/00-overview.md` (D-01 LOCKED — DO NOT deep-link to guide 10/11 files directly)
- DO NOT add a second or third discrete row for guides 10/11 in the Admin Setup table

---

### B. `docs/index.md` — Two new Desktop Engineering L2 rows #28/#29 (D-02)

**Analog (line 123 — verbatim):**
```
| [macOS Platform SSO Investigation](l2-runbooks/00-index.md#macos-ade-runbooks) | PSSO registration failure or Password-sync failure investigation (runbook #27) |
```

**Grammar:** `| [Display text](l2-runbooks/00-index.md#macos-ade-runbooks) | Symptom description (runbook #NN) |`

**Insertion point:** After line 123 (after the #27 row), before line 124 (blank line preceding `### Admin Setup`).

**Two rows to insert:**
```
| [macOS Kerberos SSO Investigation](l2-runbooks/00-index.md#macos-ade-runbooks) | Kerberos TGT not acquired, realm/KDC unreachable, or PSSO-TGT integration failure (runbook #28) |
| [macOS Graph Credential Investigation](l2-runbooks/00-index.md#macos-ade-runbooks) | Platform Credential not appearing in Graph, delete-and-re-register flow, or permission errors (runbook #29) |
```

**Constraints:**
- Both rows MUST link to `l2-runbooks/00-index.md#macos-ade-runbooks` — confirmed live anchor slug (D-02 LOCKED)
- DO NOT link to numbered runbook files directly (D-02 LOCKED)
- "When to Use" wording is Claude's Discretion; follow the comma-clause symptom style of the #27 row

---

### C. `docs/index.md` — Version History row

**Analog (line 323 — verbatim):**
```
| 2026-06-22 | Phase 81 (SSOREF-04): appended Platform SSO rows to macOS Admin Setup / L1 / L2 nav tables | -- |
```

**Grammar:** `| YYYY-MM-DD | Phase NN (REQ-ID): description | -- |`

**Insertion point:** After line 323 (after the Phase 81 row, i.e., insert as the new top row of the table body). Version History rows are inserted newest-first.

**Row to insert:**
```
| 2026-06-23 | Phase 87 (REF-03): enriched macOS Admin Setup Platform SSO row to name guides 10/11; added macOS L2 rows for Kerberos SSO Investigation (#28) and Graph Credential Investigation (#29) | -- |
```

---

### D. `docs/common-issues.md` — New `### Kerberos SSO Extension Failure` entry (D-05)

**Primary analog — the preceding entry (lines 213-218 — verbatim):**
```markdown
### Platform SSO Sign-In Failure

Platform SSO "Registration Required" notification never appeared despite Intune reporting Succeeded, or Platform SSO sign-in is failing after registration.

- **L1:** [Platform SSO Sign-In Failure](l1-runbooks/35-macos-sso-sign-in-failure.md) — four root causes: old Company Portal, Error 10002 legacy conflict, mistyped registration token, dismissed notification
- **L2:** [Platform SSO Investigation](l2-runbooks/27-macos-sso-investigation.md)
```

**Grammar:** `### Title` → blank line → symptom prose sentence → blank line → `- **L1:** …` bullet → `- **L2:** …` bullet

**L1-line "no L1 runbook" style analogs:**

TPM (line 64 — verbatim):
```
- **L1:** [L1 Runbook Index](l1-runbooks/00-index.md#tpm-attestation-note) — no L1 runbook; escalate to L2
```

Hybrid Join (line 87 — verbatim):
```
- **L1:** [L1 Runbook Index](l1-runbooks/00-index.md) — escalate to L2 with domain details
```

**Insertion point:** After line 218 (after the closing L2 bullet of `### Platform SSO Sign-In Failure`), before line 220 (`## iOS/iPadOS Failure Scenarios`). Insert a blank line then the new entry.

**Entry to insert (exact wording is Claude's Discretion; structure is fixed):**
```markdown
### Kerberos SSO Extension Failure

Kerberos TGT not acquired, realm or KDC unreachable, or `usePlatformSSOTGT` PSSO-TGT integration failing.

- **L1:** No L1 runbook — escalate to L2
- **L2:** [Kerberos SSO Investigation](l2-runbooks/28-macos-kerberos-sso-investigation.md)
```

**Constraints:**
- L1 bullet MUST follow the "no L1 runbook — escalate to L2" prose style (D-05 LOCKED); do NOT fabricate an L1 runbook link
- L2 link target is `l2-runbooks/28-macos-kerberos-sso-investigation.md` (D-05 LOCKED)
- Entry must be a standalone `###` section, NOT folded under the PSSO entry

**Version History row (line 380 area — analog line 380 verbatim):**
```
| 2026-06-22 | Phase 81 (SSOREF-04): appended Platform SSO Sign-In Failure entry routing to L1 #35 / L2 #27 | -- |
```

Row to insert (newest-first, after the header row):
```
| 2026-06-23 | Phase 87 (REF-03): added Kerberos SSO Extension Failure entry under macOS ADE Failure Scenarios | -- |
```

---

### E. `docs/quick-ref-l2.md` — New `#### Kerberos SSO Diagnostics` block (D-04)

**Analog — the sibling block (lines 180-188 — verbatim):**
```markdown
#### Platform SSO Attestation Command

Verify PSSO registration state -- run on the affected Mac:

```bash
app-sso platform -s
```

Expected healthy output includes both `Device Registration: REGISTERED` and `User Registration: REGISTERED` with SSO tokens listed. See [07-platform-sso-setup.md — Verification](admin-setup-macos/07-platform-sso-setup.md) for the full expected output format.
```

**Grammar:** `#### Title` → blank line → one-sentence lead → blank line → fenced bash block → blank line → interpretation prose with cross-reference link

**Insertion point:** After line 188 (after the `#### Platform SSO Attestation Command` block's closing prose), before line 190 (`### macOS Investigation Runbooks`).

**Block to insert (exact note wording is Claude's Discretion; structure is fixed):**
```markdown
#### Kerberos SSO Diagnostics

Verify Kerberos ticket cache -- run on the affected Mac:

```bash
klist
```

Healthy output shows a TGT with a future expiry for the configured realm. An empty cache or "No credentials cache found" indicates TGT acquisition failure. For PSSO-TGT integration context (`tgt_ad` on-prem vs `tgt_cloud` Entra), see the [Platform SSO Attestation Command](#platform-sso-attestation-command) block above.
```

**Constraints:**
- Command MUST be plain `klist` — NO `-v` flag, NO version-variant flags (D-04 / P83 D-13 LOCKED)
- DO NOT re-state the `app-sso platform -s` fenced block — use a pointer sentence only (D-04 LOCKED, over-documentation discipline)
- `app-sso diagnose` MUST NOT appear anywhere in this block (P83 D-11 LOCKED)
- Pointer sentence MUST reference `tgt_ad` (on-prem AD) vs `tgt_cloud` (Entra) per P83 D-12

**Runbook bullet analog (line 196 — verbatim):**
```
- [Platform SSO Investigation](l2-runbooks/27-macos-sso-investigation.md) -- PSSO registration failure and Password-sync failure investigation
```

**Grammar:** `- [Display text](link) -- brief symptom description`

**Bullet to append** (after line 196, i.e., after the #27 bullet):
```
- [Kerberos SSO Investigation](l2-runbooks/28-macos-kerberos-sso-investigation.md) -- Kerberos TGT not acquired, realm/KDC reachability, and PSSO-TGT integration investigation
```

**Version History row (line 373 area — analog verbatim):**
```
| 2026-06-22 | Phase 81 (SSOREF-04): appended Platform SSO Log Paths section + app-sso platform -s attestation command + L2 #27 investigation runbook bullet to macOS section | -- |
```

Row to insert (newest-first):
```
| 2026-06-23 | Phase 87 (REF-03): added Kerberos SSO Diagnostics block (klist) + Kerberos SSO Investigation runbook bullet to macOS section | -- |
```

---

### F. `docs/l2-runbooks/00-index.md` — VERIFY ONLY (no edit)

**Verify that lines 87-88 contain (verbatim from live file):**
```
| [Kerberos SSO Investigation](28-macos-kerberos-sso-investigation.md) | Kerberos TGT not acquired, realm/KDC unreachable, or PSSO-TGT integration failure (`usePlatformSSOTGT`) | [macOS Log Collection](10-macos-log-collection.md) |
| [Graph Credential Investigation](29-macos-graph-credential-investigation.md) | Platform Credential not appearing in Graph, delete-and-re-register flow, or permission/scope errors on `platformCredentialMethods` | [macOS Log Collection](10-macos-log-collection.md) |
```

**Verify that the macOS L1 Escalation Mapping table (lines 90-100) does NOT have rows for #28 or #29** (D-03 LOCKED — no L1 source exists; no row is to be added).

**No Version History stamp is required** — no edit is made to this file in Phase 87.

---

### G. `docs/decision-trees/06-macos-triage.md` — MACE2 Mermaid leaf + class + click + Routing row (D-06/D-07)

#### G1. New MACSSO third-arm edge + leaf node

**Analog — existing MACSSO arms (lines 44-45 — verbatim):**
```
    MACSSO -->|"No — notification<br/>never appeared"| MACR7(["See: Platform SSO<br/>Sign-In Failure Runbook"])
    MACSSO -->|"Yes, but key error<br/>or lost after reset"| MACR8(["See: Platform SSO —<br/>Secure Enclave Key Loss Runbook"])
```

**Grammar:** `    MACSSO -->|"Edge label with<br/>line break"| NODEID(["Leaf text with<br/>line break"])`

**Line to insert** (after line 45, i.e., as the third MACSSO arm):
```
    MACSSO -->|"Kerberos TGT<br/>not acquired"| MACE2(["Escalate to L2:<br/>Kerberos SSO Investigation"])
```

**Constraints:**
- Node ID is `MACE2` (follows `MACE1` naming convention for red escalation leaves)
- Leaf text prefix "Escalate to L2:" mirrors `MACE1` text (line 42): `MACE1(["Escalate to L2:<br/>Collect serial number,<br/>stage of failure, screenshots"])`
- DO NOT add a new MAC3 branch — the Kerberos arm goes under MACSSO only (D-06 LOCKED)
- Edge label is Claude's Discretion within the Kerberos-TGT symptom constraint; exact wording editable

#### G2. click directive

**Analog — existing click lines (lines 53-54 — verbatim):**
```
    click MACR7 "../l1-runbooks/35-macos-sso-sign-in-failure.md"
    click MACR8 "../l1-runbooks/36-macos-secure-enclave-key.md"
```

**Grammar:** `    click NODEID "../relative/path/to/file.md"`

**Line to insert** (after line 54, i.e., after the `click MACR8` line):
```
    click MACE2 "../l2-runbooks/28-macos-kerberos-sso-investigation.md"
```

**Constraint:** Path is relative from `docs/decision-trees/` to `docs/l2-runbooks/` — confirmed correct: `../l2-runbooks/28-macos-kerberos-sso-investigation.md`

#### G3. classDef class assignment extension

**Analog — line 60 (verbatim):**
```
    class MACE1 escalateL2
```

**Edit (replace line 60 in-place):**
```
    class MACE1,MACE2 escalateL2
```

**Constraints:**
- The `classDef escalateL2 fill:#dc3545,color:#fff` line (line 57) is UNCHANGED — do NOT modify it (D-07, Pitfall 7 LOCKED)
- The `class MACR7,MACR8 resolved` line (line 59) is UNCHANGED — MACR7/MACR8 remain green (D-07 LOCKED)
- MACE2 MUST be `escalateL2` (red), NOT `resolved` (green) — it routes to L2, not L1 (D-07 LOCKED)

#### G4. Routing Verification row

**Analog — last two Routing Verification rows (lines 76-77 — verbatim):**
```
| Platform SSO — registration not appearing | Setup Assistant? Yes | Symptom: Platform SSO | Runbook 35 |
| Platform SSO — Secure Enclave key error | Setup Assistant? Yes | Symptom: Platform SSO → key error | Runbook 36 |
```

**Grammar:** `| Path description | Setup Assistant? Yes | Symptom: detail | Destination |`

**Row to append** (after line 77):
```
| Kerberos SSO — TGT not acquired | Setup Assistant? Yes | Symptom: Platform SSO → Kerberos TGT | L2 escalation (#28) |
```

**Budget note:** MAC1 → MAC3 → MACSSO → MACE2 = 3 edges from root — within the documented 3-edge routing budget (`:15`/`:65`).

#### G5. Version History row

**Analog (line 106 — verbatim):**
```
| 2026-06-22 | Phase 81 (SSOREF-04): added Platform SSO sub-decision leaf (MACSSO -> #35/#36) + 2 Routing Verification rows | -- |
```

**Grammar:** `| YYYY-MM-DD | Phase NN (REQ-ID): description | -- |`

**Row to insert** (newest-first, after the header row at line 103):
```
| 2026-06-23 | Phase 87 (REF-03): added Kerberos SSO third arm under MACSSO (MACE2 → L2 #28) + 1 Routing Verification row | -- |
```

---

## Shared Patterns

### Version History Stamp (all 4 edited files)

**Pattern:** Every touched nav file has a `## Version History` table. New rows are inserted **newest-first** (after the header row, before the previous top entry). Format: `| YYYY-MM-DD | Phase NN (REQ-ID): description | -- |`. Author column is always `--`.

**Apply to:** `docs/index.md`, `docs/common-issues.md`, `docs/quick-ref-l2.md`, `docs/decision-trees/06-macos-triage.md`
**DO NOT apply to:** `docs/l2-runbooks/00-index.md` (verify-only, no edit in Phase 87)

**Source precedent (Phase 81 stamp in `06-macos-triage.md`, line 106):**
```
| 2026-06-22 | Phase 81 (SSOREF-04): added Platform SSO sub-decision leaf (MACSSO -> #35/#36) + 2 Routing Verification rows | -- |
```

---

### Anchor-Link Convention (index.md L2 table)

**Pattern:** macOS L2 symptom rows in `docs/index.md` link to `l2-runbooks/00-index.md#macos-ade-runbooks` — never to individual numbered runbook files.

**Source (line 123):**
```
| [macOS Platform SSO Investigation](l2-runbooks/00-index.md#macos-ade-runbooks) | PSSO registration failure or Password-sync failure investigation (runbook #27) |
```

**Apply to:** Both new L2 rows for #28 and #29 in `docs/index.md` (D-02 LOCKED)

---

### "No L1 Runbook — Escalate to L2" L1 Bullet Style

**Pattern:** When no L1 runbook exists for a symptom, the `**L1:**` bullet uses plain prose (no real link to a non-existent runbook) in the established style.

**Source (line 64):**
```
- **L1:** [L1 Runbook Index](l1-runbooks/00-index.md#tpm-attestation-note) — no L1 runbook; escalate to L2
```

**Apply to:** The `**L1:**` bullet in the new `### Kerberos SSO Extension Failure` entry (D-05 LOCKED — no L1 Kerberos runbook exists)

---

### Mermaid classDef Leaf Color Rule

**Pattern:** Leaf color is determined by the **destination level**, not visual symmetry with siblings.
- Green `resolved` = routes to an **L1 runbook**
- Red `escalateL2` = routes to an **L2 runbook** (or generic L2 escalation)

**Source (lines 56-60 — verbatim):**
```
    classDef resolved fill:#28a745,color:#fff
    classDef escalateL2 fill:#dc3545,color:#fff
    class MACR1,MACR2,MACR3,MACR4,MACR5,MACR6 resolved
    class MACR7,MACR8 resolved
    class MACE1 escalateL2
```

**Apply to:** MACE2 MUST be `escalateL2` (D-07 LOCKED). Extend line 60 to `class MACE1,MACE2 escalateL2`. Do NOT alter `classDef` lines or the `MACR7,MACR8 resolved` assignment.

---

## No Analog Found

None. All 5 files have clear in-file analogs. The only "verify-only" file (`docs/l2-runbooks/00-index.md`) requires no edit and therefore no pattern extraction.

---

## Critical Constraints Summary (DO NOT VIOLATE)

| Constraint | Source | What to Check |
|---|---|---|
| Admin Setup link target = `admin-setup-macos/00-overview.md` | D-01 LOCKED | index.md line 132 edit |
| L2 rows link target = `l2-runbooks/00-index.md#macos-ade-runbooks` | D-02 LOCKED | Both new index.md L2 rows |
| No row added to 00-index.md macOS L1 Escalation Mapping | D-03 LOCKED | 00-index.md lines 90-100 |
| `klist` only — NO `-v` flag | D-04 / P83 D-13 LOCKED | quick-ref-l2.md new block |
| `app-sso diagnose` must not appear | P83 D-11 LOCKED | quick-ref-l2.md new block |
| No re-statement of `app-sso platform -s` fenced block | D-04 LOCKED | quick-ref-l2.md new block |
| L1 bullet = "no L1 runbook — escalate to L2" prose | D-05 LOCKED | common-issues.md new entry |
| Kerberos leaf is THIRD ARM under MACSSO — not new MAC3 branch | D-06 LOCKED | 06-macos-triage.md Mermaid |
| MACE2 color = red `escalateL2` — NOT green `resolved` | D-07 LOCKED | 06-macos-triage.md class line |
| Modify only `class MACE1 escalateL2` line — not `classDef` lines | D-07 LOCKED | 06-macos-triage.md line 60 |
| Version History stamp in all 4 edited files (not 00-index.md) | Phase 81 precedent | All 4 touched files |

---

## Metadata

**Analog search scope:** In-file only — all analogs are within the same file being modified (append-only phase)
**Files scanned:** 5 live nav files (docs/index.md, docs/common-issues.md, docs/quick-ref-l2.md, docs/l2-runbooks/00-index.md, docs/decision-trees/06-macos-triage.md)
**Pattern extraction date:** 2026-06-23
