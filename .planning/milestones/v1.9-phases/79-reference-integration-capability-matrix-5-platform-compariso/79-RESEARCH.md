# Phase 79: Reference Integration — Capability Matrix & 5-Platform Comparison — Research

**Researched:** 2026-06-21
**Domain:** Pure documentation — surgical edits to two reference markdown files + a committed anchor-inventory artifact
**Confidence:** HIGH across all domains (all claims grounded in direct corpus inspection of live files; no training assumptions required for the mechanical facts)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**A1 (table shape):** One row per SC1 dimension in the existing `Feature | Windows | macOS` shape. Seven rows:
1. Auth methods — Secure Enclave key (Microsoft-recommended) · Password sync · Smart card
2. Hardware gate — Secure Enclave method requires T2 chip or Apple Silicon
3. macOS version floor — "macOS 14.0 (recommended floor)"
4. Entra ID licensing — no P1/P2 required for PSSO itself (CA-integration P1 nuance lives in guide 08, link-not-copy)
5. NUAL — macOS 14+
6. Passkey / FIDO2 — Secure Enclave method only
7. Hybrid Entra join — Not supported (explicit anti-feature)

**B2+P1 (Windows column + placement):** Windows cells = terse scope-boundary markers (mirroring matrix line 84 `n/a (Windows uses Intune client)`). Insert `## Authentication` before `## See Also` (after `## Key Gaps Summary`). Avoid leaking "v1.9" into cells.

**C1 (comparison cell):** Add a NEW `## Single Sign-On` H2 section (7th section) with one feature row "OS-integrated SSO (Platform SSO)". Adds anchor `#single-sign-on`; touches none of the six named H2s required by C12.

**D1 (anchor inventory):** `grep '^## ' → slug` over both reference files → `79-ANCHOR-INVENTORY.md`; committed in its OWN commit before any content edit; post-edit superset assertion (only additions: `#authentication` in matrix, `#single-sign-on` in comparison; `#configuration` preserved).

### Cross-Cutting Decisions (binding — MANDATORY)

**X1:** Edit the existing `## Configuration` "Platform SSO" row cell (matrix line 38) to: `Yes (macOS 14+ via Settings Catalog) — see [Authentication](#authentication)`. Cell-text edit only — the `## Configuration` heading and slug are NOT touched.

**X2:** Non-macOS comparison cells = bare uppercase `N/A` (C12-exempt by v1.8-milestone-audit.mjs:643 case-sensitive `'N/A'` check). No sibling matrix has a `#authentication` anchor; lowercase linked `n/a` is impossible without fabricating out-of-scope anchors.

**X3:** macOS comparison cell = exact SC2 verbatim string: `Supported (macOS 14+) — [matrix](macos-capability-matrix.md#authentication)`. Do NOT adapt. The row/section MUST be ADDED (no existing SSO stub to overwrite — confirmed absent in the comparison doc).

### Claude's Discretion

- Exact prose wording of matrix Authentication cells and SSO-section intro/footnote.
- Internal heading text for the new `## Single Sign-On` section feature-row label.
- Whether matrix Authentication rows carry `last_verified`/`review_by` inline notes (DS-2 cadence applies to rapidly-changing facts like macOS version gates).

### Deferred Ideas (OUT OF SCOPE)

- L1/L2 runbooks — Phase 80
- Nav-hub integration (index / common-issues / quick-ref / decision-tree) — Phase 81
- v1.9 harness lineage bump + any `check-phase-79.mjs` validator — Phase 82
- Non-macOS (Windows/iOS/Android/Linux) authentication content — explicitly out of v1.9 scope (REQUIREMENTS line 89)
- CA-integration-requires-Entra-P1 nuance — lives in guide 08, linked not restated
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SSOREF-02 | `macos-capability-matrix.md` gains a `## Authentication` section (auth-method rows, hardware/macOS-version gates, Entra licensing, hybrid-join = NOT SUPPORTED) and `4-platform-capability-comparison.md` macOS Platform SSO cell is updated (link-not-copy; pre-edit anchor inventory to prevent C12/C13 anchor drift) | Facts confirmed HIGH confidence from guides 08/09 (Phases 77/78 Complete); mechanical constraints confirmed from live corpus inspection of both reference files and audit script |
</phase_requirements>

---

## Summary

Phase 79 is a pure documentation phase with three deliverables: (1) append `## Authentication` to `docs/reference/macos-capability-matrix.md` with 7 rows, (2) add `## Single Sign-On` to `docs/reference/4-platform-capability-comparison.md` with one row, and (3) create and commit `79-ANCHOR-INVENTORY.md` before any content edit. The implementation decisions are fully locked. This research confirms the exact factual content the matrix cells must carry, the precise mechanical insertion points, the C12/C13 harness constraints, and the anchor-inventory generation method.

**Primary recommendation:** All locked decisions are implementable as stated. No decision needs revision. The only execution risk is commit ordering: anchor-inventory commit MUST precede the content commit — a single combined commit would still satisfy C13 (internal links land with their targets) but violates the ROADMAP hard prerequisite. The content edits can land in ONE atomic commit (matrix edits + comparison edits together, since the `#authentication` anchor created in macos-capability-matrix.md is the link target for the X3 cell in the comparison doc — both must be present in the same commit set to satisfy C13).

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| SC1 fact set (auth methods, hardware gates, version floors, licensing, NUAL, passkey, hybrid-join) | Canonical source: guides 08/09 | Matrix (summary + link) | Link-not-copy: matrix cells summarize and link; guides are authoritative |
| Anchor stability across edits | macos-capability-matrix.md (matrix file) | 4-platform-capability-comparison.md (consumer) | The comparison doc's cells point TO the matrix; the matrix must not rename existing H2s |
| C12 compliance (link-not-copy cell rule) | 4-platform-capability-comparison.md only | NOT the matrix (D-01a) | C12 binds only the comparison doc's canonical 6-col tables |
| C13 compliance (allowlist shape) | scripts/validation/v1.8-milestone-audit.mjs | Frozen allowlist JSON | C13 checks shape/counts only; valid internal links cannot trip it |
| Anchor inventory | 79-ANCHOR-INVENTORY.md (artifact) | git commit ordering | Must be committed BEFORE content edits as a hard prerequisite |

---

## Standard Stack

No packages are installed in this phase. The "stack" is the existing documentation toolchain.

| Tool | Version | Purpose |
|------|---------|---------|
| `node scripts/validation/v1.8-milestone-audit.mjs` | v1.8 frozen | Post-edit harness gate (C12 + C13 + all other checks) |
| Bash `grep '^## '` | system | Anchor inventory generation (H2 slug enumeration) |
| Git | system | Commit ordering (inventory commit → content commit) |

---

## Package Legitimacy Audit

No external packages are installed in this phase. Section not applicable.

---

## Architecture Patterns

### System Architecture Diagram

```
79-ANCHOR-INVENTORY.md (committed first — hard prerequisite)
        |
        | [commit 1: anchor-inventory only]
        v
macos-capability-matrix.md              4-platform-capability-comparison.md
  Line 38: X1 cell edit                   NEW ## Single Sign-On section
  NEW ## Authentication section            One row: OS-integrated SSO (Platform SSO)
  (7 rows, before ## See Also)             macOS cell: X3 verbatim
        |                                  Win/iOS/Android/Linux: N/A (X2)
        |<------- #authentication -------->|
        |
        | [commit 2: both files atomic — #authentication target present
        |            when comparison's X3 cell is checked by C13]
        v
node scripts/validation/v1.8-milestone-audit.mjs
  C12: passes (N/A exempt; 6 named H2s present; 7th allowed; X3 cell has [matrix](...) link)
  C13: passes (15-entry allowlist shape unchanged)
  All other checks: unaffected
```

### Recommended Project Structure

No new directories. Three files involved:

```
.planning/phases/79-reference-integration-capability-matrix-5-platform-compariso/
└── 79-ANCHOR-INVENTORY.md          [CREATE — commit 1]
docs/reference/
├── macos-capability-matrix.md      [EDIT — commit 2]
└── 4-platform-capability-comparison.md  [EDIT — commit 2]
```

### Pattern 1: Anchor Inventory Generation (D-04 / D1 mechanism)

**What:** Enumerate all `## H2` headings in each reference file, slugify each (lowercase, spaces to hyphens, strip punctuation), record as the pre-edit anchor set.

**Slug rules (GitHub Markdown / standard):** Lowercase; spaces become `-`; strip all characters that are not alphanumeric or `-`; leading/trailing hyphens removed.

**Existing anchors — macos-capability-matrix.md (confirmed by grep '^## '):**

| H2 heading (exact) | Slug |
|--------------------|------|
| `## Enrollment` | `#enrollment` |
| `## Configuration` | `#configuration` |
| `## App Deployment` | `#app-deployment` |
| `## Compliance` | `#compliance` |
| `## Software Updates` | `#software-updates` |
| `## Conditional Access` | `#conditional-access` |
| `## Key Gaps Summary` | `#key-gaps-summary` |
| `## See Also` | `#see-also` |

**Post-edit additions:** `#authentication` (inserted before `## See Also` per D-02a/P1).
**Preserved:** ALL 8 existing anchors unchanged — especially `#configuration` (X1 edits only the cell text, not the heading).

**Existing anchors — 4-platform-capability-comparison.md (confirmed by grep '^## '):**

| H2 heading (exact) | Slug |
|--------------------|------|
| `## Enrollment` | `#enrollment` |
| `## Configuration` | `#configuration` |
| `## App Deployment` | `#app-deployment` |
| `## Compliance` | `#compliance` |
| `## Software Updates` | `#software-updates` |
| `## Conditional Access` | `#conditional-access` |
| `## See Also` | `#see-also` |
| `## Version History` | `#version-history` |

**Post-edit additions:** `#single-sign-on` (new `## Single Sign-On` H2 before `## See Also`).
**C12 6-named-H2 check:** All six (`## Enrollment`, `## Configuration`, `## App Deployment`, `## Compliance`, `## Software Updates`, `## Conditional Access`) remain present — adding a 7th is explicitly allowed per C12 harness (audit.mjs:652-654 checks only that the six named H2s are NOT missing).

**Post-edit superset assertion (proof of anchor-stability):**
- matrix: pre = {enrollment, configuration, app-deployment, compliance, software-updates, conditional-access, key-gaps-summary, see-also}; post adds authentication → superset holds
- comparison: pre = {enrollment, configuration, app-deployment, compliance, software-updates, conditional-access, see-also, version-history}; post adds single-sign-on → superset holds

**Sibling matrix anchors — no `#authentication` exists anywhere (confirmed by grep '^## Authentication' across all sibling docs — zero matches):**
- ios-capability-matrix.md H2s: Enrollment, Configuration, App Deployment, Compliance, Software Updates, Conditional Access, Key Gaps Summary, See Also, Version History
- android-capability-matrix.md H2s: Enrollment, Configuration, App Deployment, Compliance, Software Updates, Conditional Access, Cross-Platform Equivalences, Key Gaps Summary, See Also, Version History
- linux-capability-matrix.md H2s: Enrollment, Configuration, App Deployment, Compliance, Software Updates, Conditional Access, Cross-Platform Equivalences, Key Gaps Summary, See Also, Version History
- No `windows-capability-matrix.md` exists (confirmed by CONTEXT.md and ARCHITECTURE.md)

**This grounds X2:** lowercase linked `n/a` in the comparison doc for non-macOS SSO cells is impossible (no sibling `#authentication` anchor to link to). Bare uppercase `N/A` is the only C12-safe option.

### Pattern 2: Matrix Section Shape (A1 — row-per-dimension)

**Existing matrix pattern (macos-capability-matrix.md):** Each section is a 2-column `Feature | Windows | macOS` table with prose cells. No nested tables. No column additions. Source: verified in live file (Enrollment, Configuration, App Deployment, Compliance, Software Updates, Conditional Access all follow this shape).

**The matrix is NOT C12-bound** (D-01a, confirmed by CONTEXT.md): prose cells without links are legal. Matrix cells may be prose summaries + links to guides 08/09.

**Existing scope-marker precedent for Windows cells:** `n/a (Windows uses Intune client)` at matrix line 84 (Conditional Access `## Per-app CA (MAM)` row). This is the model for terse Windows scope-markers in the Authentication section (D-02).

**X1 edit target — exact current cell text at line 38:**
```
| Platform SSO | No | Yes (macOS 14+ via Settings Catalog) |
```
Post-edit cell: `Yes (macOS 14+ via Settings Catalog) — see [Authentication](#authentication)`

The `## Configuration` heading at line 28 is NOT touched. The `#configuration` anchor is preserved.

### Pattern 3: Comparison Doc Cell Grammar (D-03 / X2 / X3)

**Verdict vocabulary (5-state lock, comparison doc intro ~line 15):** `Supported` / `Partial` / `Not supported` / `Mode-dependent` / `n/a`. Em-dash `—` separates verdict word from hyperlink. `Mode-dependent` is Android-primary.

**Existing linked `n/a` convention (comparison doc lines 24, 93):** lowercase `n/a` cells always carry `— [matrix](<platform>-capability-matrix.md#<anchor>)`. Example from line 24: `n/a — [matrix](linux-capability-matrix.md#enrollment)`. Example from line 93: `n/a — [matrix](linux-capability-matrix.md#conditional-access)`.

**X2 conflict:** The lowercase-linked-`n/a` convention CANNOT be honored for non-macOS SSO cells because no sibling `#authentication` anchor exists. Bare uppercase `N/A` is the exemption path (audit.mjs:643 checks `trimmed !== 'N/A'` — case-sensitive, no link required). A one-line footnote in the SSO section notes non-macOS auth is not covered this milestone, so `N/A` reads as deliberate scope, not omission.

**X3 verbatim string (SC2):** `Supported (macOS 14+) — [matrix](macos-capability-matrix.md#authentication)`. This passes C12 because it contains a valid `[text](link)` pattern (audit.mjs:643 regex `/\[.+\]\(.+\)/`). SC2-verbatim compliance outranks verdict-grammar editorial preference — do NOT adapt.

**New section position:** Before `## See Also` (currently at comparison doc line 97). The new `## Single Sign-On` section inserts between `## Conditional Access` (line 87) and `## See Also` (line 97).

### Pattern 4: C12 Cell-Level Rule (audit.mjs:632-655)

The check restricts to canonical 6-col tables only (`if (cells.length !== 6) continue`). The new `## Single Sign-On` table IS a 6-col table. For every data cell (cols 1–5, i.e., Windows, macOS, iOS, Android, Linux):
- `—` (em-dash): exempt
- `N/A` (uppercase, case-sensitive): exempt
- Any other non-empty value: MUST match `/\[.+\]\(.+\)/`

**New SSO row cells:**
| Col | Value | C12 status |
|-----|-------|------------|
| Feature (col 0) | `OS-integrated SSO (Platform SSO)` | excluded (col-0 row label) |
| Windows (col 1) | `N/A` | exempt (uppercase, case-sensitive) |
| macOS (col 2) | `Supported (macOS 14+) — [matrix](macos-capability-matrix.md#authentication)` | passes `/\[.+\]\(.+\)/` |
| iOS (col 3) | `N/A` | exempt |
| Android (col 4) | `N/A` | exempt |
| Linux (col 5) | `N/A` | exempt |

All cells C12-compliant.

**6 named H2 sub-check (audit.mjs:652-654):** After Phase 79 the comparison doc will have 9 H2s (6 original domain H2s + `## Single Sign-On` + `## See Also` + `## Version History`). The audit checks ONLY that the 6 named H2s are present (`content.includes(h)` check on the exact strings `"## Enrollment"`, `"## Configuration"`, `"## App Deployment"`, `"## Compliance"`, `"## Software Updates"`, `"## Conditional Access"`). All six remain present. PASS.

### Pattern 5: C13 Allowlist Shape (audit.mjs:660-679)

C13 checks ONLY that `c13_broken_link_allowlist[]` in the frozen v1.8 allowlist JSON has exactly 15 entries (6 `transient_external` + 9 `template_placeholder`). It does NOT walk or verify the comparison doc's links. A valid new internal link (`macos-capability-matrix.md#authentication`) CANNOT trip C13 because:
1. C13 does not scan doc links
2. The `#authentication` anchor target exists after the Area-A matrix edit lands in the same commit as the comparison edit
3. The 15-entry allowlist shape is not changed by Phase 79

**Commit ordering for C13 safety:** The matrix `#authentication` anchor and the comparison `[matrix](macos-capability-matrix.md#authentication)` cell must land in the SAME commit (or the matrix commit must precede the comparison commit). A single atomic content commit satisfies this.

### Anti-Patterns to Avoid

- **Splitting content into two commits (matrix then comparison separately):** If commits are split and C13 is run between them, the `macos-capability-matrix.md#authentication` link in the comparison doc will point to a non-existent anchor. Always land both files in the same commit.
- **Cloning guide 08's four-dimension selection table:** The matrix Authentication rows link to guide 08 — they do NOT copy the table. A3/A4 were rejected for exactly this reason (maintenance drift + link-not-copy violation).
- **Using lowercase `n/a` without a link for non-macOS comparison cells:** This would FAIL C12 (only `—` and uppercase `N/A` are exempt from the hyperlink requirement).
- **Inventing unresearched Windows-SSO facts in the Authentication Windows cells:** Windows SSO is out of v1.9 scope (REQUIREMENTS:89). Windows cells = terse scope-boundary markers.
- **Renaming or reordering any existing `## heading` in either reference file:** Any heading rename changes its slug and breaks every inbound link in the comparison doc. Append-only for headings; cell-text-only for X1.
- **Leaking "v1.9" into reader-facing cells or prose:** Phrase as "not covered in this matrix" not "out of v1.9 scope."

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Auth method facts | Writing fresh auth facts from scratch | Summarize + link guides 08/09 (already Complete, Phases 77-78) | Link-not-copy architecture; guides are canonical; matrix cells duplicate = maintenance drift |
| Anchor slug computation | Custom slug algorithm | Standard GitHub Markdown slug: lowercase, spaces→hyphens, strip non-alphanumeric-non-hyphen | GitHub renders H2 anchors by this rule; mismatched slugs = broken internal links |
| Four-dimension auth method selection table | Inserting the guide-08 selection table into the matrix | One-line macOS cell text + link to `08-auth-methods-deep-dive.md` | A3/A4 rejected (CONTEXT.md) for cloning this table — strict link-not-copy |
| CA-integration-needs-Entra-P1 nuance | Restating this in the Entra-licensing matrix row | Matrix row: "no P1/P2 required for PSSO itself" + link to guide 08 | Nuance lives canonically in guide 08; restating = maintenance drift |

---

## SC1 Fact Set — Confirmed Values and Confidence

All facts below are sourced from guides 08/09 (Phases 77-78, both verified Complete) and SUMMARY.md/PITFALLS.md (HIGH confidence, verified against Microsoft Learn 2026-05-18..2026-06-15 and Apple Platform Security June 2026).

### Row 1: Auth Methods

**macOS cell (summary prose):** Three methods: Secure Enclave key (Microsoft-recommended), Password sync, Smart card. [VERIFIED: SUMMARY.md + guides 08/09]

**Windows cell:** `n/a -- not covered in this matrix` (scope-boundary marker per D-02)

**Confidence:** HIGH

### Row 2: Hardware Gate

**macOS cell:** Secure Enclave method requires T2 chip (Intel 2018-2020 Macs) or Apple Silicon (M1/M2/M3/M4+, 2020+); Password sync and Smart card have no hardware gate. [VERIFIED: SUMMARY.md citing Apple support.apple.com/en-us/103265]

**Windows cell:** `n/a -- not covered in this matrix`

**Confidence:** HIGH

### Row 3: macOS Version Floor

**macOS cell:** macOS 14.0 Sonoma (recommended floor — all three auth methods, non-deprecated Settings Catalog key, NUAL, Repair flow); macOS 13.0 Ventura (absolute minimum — Secure Enclave key + Password sync only, via deprecated `Authentication Method` field). [VERIFIED: SUMMARY.md + PITFALLS.md VR-4]

**Cell phrasing per D-01 lock:** "macOS 14.0 (recommended floor)" — this reconciles with the existing `## Configuration` "Platform SSO" row text "macOS 14+" (the X1 edit target). The matrix row documents the recommended floor, not the absolute minimum, to match the existing phrasing context. The absolute-minimum (macOS 13.0) nuance lives in guide 08. [VERIFIED: CONTEXT.md D-01 row 3]

**Windows cell:** `n/a -- not covered in this matrix`

**Confidence:** HIGH

### Row 4: Entra ID Licensing

**macOS cell:** No Entra ID P1 or P2 required for Platform SSO itself. (Conditional Access integration, a recommended complement, requires Entra ID P1+ — see [guide 08](../admin-setup-macos/08-auth-methods-deep-dive.md) for CA-integration licensing detail.) [VERIFIED: SUMMARY.md "No Entra ID P1/P2 required for PSSO itself. Conditional Access integration (recommended complement) requires Entra ID P1+."]

**The CA-needs-P1 nuance:** Lives canonically in guide 08. The matrix row states the PSSO-itself fact + links to guide 08 for nuance. Do NOT restate the CA-P1 detail in the matrix cell. [VERIFIED: CONTEXT.md D-01 row 4 "CA-integration P1 nuance lives in guide 08, link-not-copy — do NOT restate"]

**Windows cell:** `n/a -- not covered in this matrix`

**Confidence:** HIGH

### Row 5: NUAL (New User at Login Window)

**macOS cell:** On-demand account creation at login window (NUAL) — macOS 14+. Uses Shared Device Keys; `com.apple.PlatformSSO.AccountShortName` mapping. [VERIFIED: SUMMARY.md + REQUIREMENTS PSSO-11 (D3=B — document behavior, omit LOW-confidence `NewUserAuthorizationMode` key)]

**DS-2 cadence note:** The `NewUserAuthorizationMode` exact key value is LOW confidence (deferred per D3=B / PSSO-FUT-01); the macOS 14+ version gate and general NUAL behavior are HIGH confidence. The matrix cell documents the HIGH-confidence facts only.

**Windows cell:** `n/a -- not covered in this matrix`

**Confidence:** HIGH for the macOS 14+ gate and behavior; LOW for `NewUserAuthorizationMode` (omit per D3=B)

### Row 6: Passkey / FIDO2

**macOS cell:** Passkey/FIDO2 (WebAuthn) via the Platform Credential — Secure Enclave method only. Requires Entra Authentication-methods enablement; AAGUID `7FD635B3-2EF9-4542-8D9D-164F2C771EFC` (conditional — only when FIDO2 key restrictions apply). See [guide 08](../admin-setup-macos/08-auth-methods-deep-dive.md) for enablement steps. [VERIFIED: SUMMARY.md + REQUIREMENTS PSSO-10 (D2=A)]

**Windows cell:** `n/a -- not covered in this matrix`

**Confidence:** HIGH

### Row 7: Hybrid Entra Join

**macOS cell:** Not supported — macOS PSSO requires Entra ID (cloud-only) join. Microsoft has no plans to support hybrid Entra join on macOS. (REQUIREMENTS:83 anti-feature discipline — explicit own row, never silently omitted.) [VERIFIED: SUMMARY.md "NOT supported. macOS PSSO requires Entra ID join (cloud-only). Microsoft has no plans to support hybrid join on macOS. Document as an explicit anti-feature." + REQUIREMENTS line 83 out-of-scope table]

**Windows cell:** `n/a -- not covered in this matrix`

**Confidence:** HIGH

### DS-2 Cadence Recommendation

Per CONTEXT.md Claude's Discretion: apply `last_verified`/`review_by` to rapidly-changing facts. Recommended inline annotation for rows 3 (version floor), 5 (NUAL), and 6 (Passkey AAGUID) since these evolved rapidly in 2024-2026. Not required for rows 4 (licensing), 7 (hybrid-join = anti-feature, stable). The matrix front matter already carries `last_verified`/`review_by` fields — confirm they are updated to 2026-06-21 / 2026-09-21 as part of the content edit (90-day cadence per DS-2).

---

## Common Pitfalls

### Pitfall 1: Committing Content Before Anchor Inventory

**What goes wrong:** The content commit (matrix `## Authentication` + comparison `## Single Sign-On`) is committed without a prior anchor-inventory commit. The ROADMAP states pre-edit anchor inventory is a "hard prerequisite."
**Why it happens:** It's easy to combine everything into one commit for efficiency.
**How to avoid:** Three-step commit sequence: (1) generate `79-ANCHOR-INVENTORY.md` and commit it alone, (2) make both content edits, (3) commit both content files atomically.
**Warning signs:** If `git log --oneline` shows the content commit appearing before or alongside the inventory file creation, this pitfall has occurred.

### Pitfall 2: Lowercase `n/a` in Comparison Non-macOS SSO Cells

**What goes wrong:** Using `n/a — [matrix](...)` for Windows/iOS/Android/Linux SSO cells (following the existing comparison doc convention) when no `#authentication` anchor exists in those sibling matrices → C12 FAIL (lowercase unlinked `n/a` violates the hyperlink rule) or C13 FAIL (broken link to non-existent anchor).
**Why it happens:** The existing comparison doc convention always uses lowercase linked `n/a`, so authors may follow it mechanically.
**How to avoid:** Non-macOS cells = bare uppercase `N/A` (C12-exempt). Verified by audit.mjs:643 case-sensitive check. Add the one-line footnote so `N/A` reads as deliberate scope.

### Pitfall 3: Modifying the `## Configuration` Heading (Breaking `#configuration` Anchor)

**What goes wrong:** While editing the Platform SSO cell in the `## Configuration` section (X1), accidentally renaming the heading text e.g. to `## Configuration (Platform SSO)` → the `#configuration` slug changes → all inbound links from the comparison doc to `macos-capability-matrix.md#configuration` break → C13 / markdown-link-check failures.
**Why it happens:** Visual proximity — the heading is immediately above the row being edited.
**How to avoid:** Edit ONLY the cell text in line 38. The `## Configuration` heading on line 28 must not be touched. Verify with grep: `grep -n "^## Configuration" docs/reference/macos-capability-matrix.md` should still show exactly line 28.

### Pitfall 4: Cloning Guide 08's Four-Dimension Selection Table

**What goes wrong:** To make the matrix Authentication section more informative, copying guide 08's four-dimension selection table (Passwordless / Phishing-resistant / Hardware / macOS-version columns × three methods) into the matrix → link-not-copy violation + maintenance drift (A3/A4 rejection rationale).
**Why it happens:** The guide 08 table is informative; the planner may think it adds value.
**How to avoid:** Matrix Auth method row = prose summary + link to guide 08. No tables within tables.

### Pitfall 5: Adapting the SC2 Verbatim String

**What goes wrong:** "Fixing" the macOS comparison cell to conform to verdict-grammar (`Supported — [matrix](macos-capability-matrix.md#authentication)` without the parenthetical) to match other comparison cells → violates X3 SC2-verbatim mandate.
**Why it happens:** The `(macOS 14+)` parenthetical deviates from the comparison doc's standard verdict-grammar and may look like an error to an author cleaning up.
**How to avoid:** Use the exact locked string: `Supported (macOS 14+) — [matrix](macos-capability-matrix.md#authentication)`. This passes C12 (the regex `/\[.+\]\(.+\)/` matches). Do not normalize.

### Pitfall 6: Searching for an Existing SSO Stub in the Comparison Doc

**What goes wrong:** ROADMAP SC2 says "macOS Platform SSO cell is updated from its current stub" — author searches for a stub to overwrite, finds none, and is confused or assumes the task is wrong.
**Why it happens:** ROADMAP SC2 uses the word "updated" which implies a pre-existing stub.
**How to avoid:** The comparison doc has NO existing SSO/Authentication row or section (verified by reading the full file — confirmed only 6 domain H2s + See Also + Version History). The entire `## Single Sign-On` section must be ADDED, not overwritten. CONTEXT.md X3 explicitly states: "The planner/executor must NOT hunt for a stub" — confirmed as a MISNOMER.

### Pitfall 7: Inserting `## Authentication` After `## See Also`

**What goes wrong:** Appending `## Authentication` below `## See Also` and `## Version History` (the navigational tail) — structurally wrong (every sibling matrix terminates at Version History; content H2s belong before See Also).
**Why it happens:** "Append below existing sections" is ambiguous without knowing that See Also / Version History are navigational tails, not content sections.
**How to avoid:** Insert `## Authentication` between `## Key Gaps Summary` (line 88) and `## See Also` (line 100). Confirmed by D-02a/P1. The insertion point is after the `## Key Gaps Summary` block and before the `## See Also` heading.

---

## Code Examples

### Verification Commands (per-task, authoritative)

**After commit 1 (anchor inventory):**
```bash
# Confirm inventory file committed and contains the expected pre-edit anchors
test -f .planning/phases/79-reference-integration-capability-matrix-5-platform-compariso/79-ANCHOR-INVENTORY.md && echo "INVENTORY_EXISTS"
grep "configuration" .planning/phases/79-reference-integration-capability-matrix-5-platform-compariso/79-ANCHOR-INVENTORY.md && echo "ANCHOR_CONFIG_PRESENT"
```

**After commit 2 (content edits):**
```bash
# C12 + C13 harness gate (primary gate — must pass 15/15)
node scripts/validation/v1.8-milestone-audit.mjs

# Confirm ## Authentication anchor in matrix
grep -n "^## Authentication" docs/reference/macos-capability-matrix.md && echo "AUTH_ANCHOR_PRESENT"

# Confirm ## Single Sign-On anchor in comparison
grep -n "^## Single Sign-On" docs/reference/4-platform-capability-comparison.md && echo "SSO_ANCHOR_PRESENT"

# Confirm X3 verbatim SC2 string
grep "Supported (macOS 14+) — \[matrix\](macos-capability-matrix.md#authentication)" docs/reference/4-platform-capability-comparison.md && echo "X3_VERBATIM_PRESENT"

# Confirm X1 cell edit (exact text)
grep "Yes (macOS 14+ via Settings Catalog) — see \[Authentication\](#authentication)" docs/reference/macos-capability-matrix.md && echo "X1_EDIT_PRESENT"

# Confirm #configuration slug still present (anchor-stability)
grep -n "^## Configuration" docs/reference/macos-capability-matrix.md && echo "CONFIG_ANCHOR_STABLE"

# Superset check: confirm no pre-edit anchor removed from matrix
for anchor in enrollment configuration app-deployment compliance software-updates conditional-access key-gaps-summary see-also; do
  grep -qi "^## " docs/reference/macos-capability-matrix.md | grep -q "$anchor" || echo "MISSING: $anchor"
done

# Confirm non-macOS SSO cells are bare N/A (not lowercase n/a)
grep "OS-integrated SSO" docs/reference/4-platform-capability-comparison.md

# Confirm 6 required H2s still present in comparison doc (C12 sub-check)
for h2 in "## Enrollment" "## Configuration" "## App Deployment" "## Compliance" "## Software Updates" "## Conditional Access"; do
  grep -qF "$h2" docs/reference/4-platform-capability-comparison.md && echo "PRESENT: $h2" || echo "MISSING: $h2"
done
```

**Atomic commit check:**
```bash
# Confirm both content files changed in the same commit (not split)
git diff HEAD~1 --name-only
# Expected: docs/reference/macos-capability-matrix.md AND docs/reference/4-platform-capability-comparison.md in same commit
```

### Anchor Inventory Generation (deterministic method)

```bash
# Generate pre-edit anchor inventory for 79-ANCHOR-INVENTORY.md
echo "## macos-capability-matrix.md pre-edit H2 anchors" > .planning/phases/79-reference-integration-capability-matrix-5-platform-compariso/79-ANCHOR-INVENTORY.md
echo "" >> .planning/phases/79-reference-integration-capability-matrix-5-platform-compariso/79-ANCHOR-INVENTORY.md
grep '^## ' docs/reference/macos-capability-matrix.md >> .planning/phases/79-reference-integration-capability-matrix-5-platform-compariso/79-ANCHOR-INVENTORY.md
echo "" >> .planning/phases/79-reference-integration-capability-matrix-5-platform-compariso/79-ANCHOR-INVENTORY.md
echo "## 4-platform-capability-comparison.md pre-edit H2 anchors" >> .planning/phases/79-reference-integration-capability-matrix-5-platform-compariso/79-ANCHOR-INVENTORY.md
echo "" >> .planning/phases/79-reference-integration-capability-matrix-5-platform-compariso/79-ANCHOR-INVENTORY.md
grep '^## ' docs/reference/4-platform-capability-comparison.md >> .planning/phases/79-reference-integration-capability-matrix-5-platform-compariso/79-ANCHOR-INVENTORY.md
```

Note: The planner may choose to use the Write tool instead of bash redirection to create `79-ANCHOR-INVENTORY.md`. Both produce the same content. The content itself is the pre-edit H2 list — already known from direct file inspection (documented above in the Architecture Patterns section).

### X1 Edit — Exact Find/Replace

```
FIND (macos-capability-matrix.md line 38):
| Platform SSO | No | Yes (macOS 14+ via Settings Catalog) |

REPLACE WITH:
| Platform SSO | No | Yes (macOS 14+ via Settings Catalog) — see [Authentication](#authentication) |
```

### X3 Cell — Exact String (SC2 verbatim)

```
Supported (macOS 14+) — [matrix](macos-capability-matrix.md#authentication)
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| No PSSO auth-method content in reference docs | `## Authentication` section in matrix + `## Single Sign-On` in comparison | Phase 79 (this phase) | Admins can reach auth-method facts from reference navigation, not just from admin guide direct links |
| `## Configuration` "Platform SSO" row had no anchor to auth details | X1 cell edit adds `#authentication` back-reference | Phase 79 (this phase) | Eliminates stale duplicate PSSO statement that previously had no link to the new section |
| 4-platform comparison had no SSO dimension | New `## Single Sign-On` section (7th H2) | Phase 79 (this phase) | Comparison doc surfaces PSSO cross-platform scope explicitly |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `## Key Gaps Summary` appears before `## See Also` in macos-capability-matrix.md (confirmed: line 88 vs line 100) | Architecture Patterns — insertion point | If ordering differs, insertion point could be wrong — but direct file inspection confirms it |
| A2 | GitHub Markdown slug algorithm: lowercase + spaces-to-hyphens + strip non-alphanumeric-non-hyphen | Anchor inventory generation | If slugification differs from GitHub's algorithm, anchor links would break — but all existing comparison-doc links use this convention |

Both are verified by direct corpus inspection. The Assumptions Log is effectively empty for load-bearing decisions.

**If this table is effectively empty:** All claims in this research were verified by direct file inspection or cited from the locked CONTEXT.md decisions — no user confirmation needed.

---

## Open Questions

1. **Matrix Authentication section front-matter `last_verified` field**
   - What we know: The matrix file has a front-matter `last_verified: 2026-04-14` and `review_by: 2026-07-13` at lines 1-7.
   - What's unclear: Whether the planner should update these fields as part of the Phase 79 edit.
   - Recommendation: YES — update `last_verified: 2026-06-21` and `review_by: 2026-09-21` (90-day cadence per DS-2) since the new Authentication section changes the content materially. This is at Claude's Discretion per CONTEXT.md.

2. **Comparison doc `review_by` field**
   - What we know: `review_by: 2026-06-15` at comparison doc lines 1-7 — this date is ALREADY PAST as of 2026-06-21.
   - What's unclear: Whether the executor should update this while adding the SSO section.
   - Recommendation: YES — update `last_verified: 2026-06-21` / `review_by: 2026-09-21` to clear the stale `review_by` date, since the Phase 79 edit constitutes a substantive review/update of the file.

---

## Environment Availability

Phase 79 is purely documentation — no external services or runtimes required beyond Node.js (for the audit script).

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| `node` | `v1.8-milestone-audit.mjs` post-edit gate | Expected ✓ | system | — |
| `scripts/validation/v1.8-milestone-audit.mjs` | C12 + C13 post-edit verification | ✓ (exists, frozen) | v1.8 | — |

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Bash assertions + `node scripts/validation/v1.8-milestone-audit.mjs` |
| Config file | none (frozen v1.8 harness) |
| Quick run command | `node scripts/validation/v1.8-milestone-audit.mjs` |
| Full suite command | `node scripts/validation/v1.8-milestone-audit.mjs` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SSOREF-02 (SC1) | `## Authentication` present in matrix with 7 rows | smoke | `grep -n "^## Authentication" docs/reference/macos-capability-matrix.md` | ❌ Wave 0 (section created in this phase) |
| SSOREF-02 (SC2) | SC2 verbatim string in comparison doc | smoke | `grep "Supported (macOS 14+) — \[matrix\](macos-capability-matrix.md#authentication)" docs/reference/4-platform-capability-comparison.md` | ❌ Wave 0 (section created in this phase) |
| SSOREF-02 (X1) | X1 cell edit present in matrix | smoke | `grep "Yes (macOS 14+ via Settings Catalog) — see \[Authentication\]" docs/reference/macos-capability-matrix.md` | ❌ Wave 0 |
| SSOREF-02 (X2) | Non-macOS SSO cells are bare N/A | smoke | `grep "OS-integrated SSO" docs/reference/4-platform-capability-comparison.md` → visual inspect or parse | ❌ Wave 0 |
| SSOREF-02 (C12) | C12 harness green | blocking | `node scripts/validation/v1.8-milestone-audit.mjs` | ✅ (frozen harness) |
| SSOREF-02 (C13) | C13 harness green | blocking | `node scripts/validation/v1.8-milestone-audit.mjs` | ✅ (frozen harness) |
| SSOREF-02 (anchor-inventory) | 79-ANCHOR-INVENTORY.md committed before content | process check | `git log --oneline -- .planning/phases/79-reference-integration-capability-matrix-5-platform-compariso/79-ANCHOR-INVENTORY.md` | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `node scripts/validation/v1.8-milestone-audit.mjs` (both commits: inventory commit and content commit)
- **Per wave merge:** `node scripts/validation/v1.8-milestone-audit.mjs` + all grep assertions above
- **Phase gate:** Full harness green before `/gsd-verify-work`

### Wave 0 Gaps

- [ ] `79-ANCHOR-INVENTORY.md` — covers SSOREF-02 anchor-inventory prerequisite (Wave 0 = commit 1 of this phase)
- [ ] `## Authentication` section in `macos-capability-matrix.md` — covers SSOREF-02 SC1
- [ ] `## Single Sign-On` section in `4-platform-capability-comparison.md` — covers SSOREF-02 SC2/X2/X3

*(All three are deliverables of this phase — Wave 0 creates them.)*

---

## Security Domain

This is a pure documentation phase with no executable code, no runtime inputs, no auth surface, and no network/data flow. The only "boundary" is the published-guidance boundary — a broken internal link or stale cell text crossing from the reference doc into an admin's mental model.

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | — |
| V3 Session Management | no | — |
| V4 Access Control | no | — |
| V5 Input Validation | no | — |
| V6 Cryptography | no | — |

### Documentation-Specific Threat Register

| Threat | Category | Mitigation |
|--------|----------|------------|
| Stale PSSO cell with no link to auth detail | Information disclosure (admin acts on old data) | X1 edit adds `#authentication` link to the existing `## Configuration` row so it does not ship as a stale duplicate |
| Broken `#authentication` anchor in comparison doc cell | Broken link / C13 failure | Atomic commit: matrix `## Authentication` H2 and comparison `[matrix](macos-capability-matrix.md#authentication)` cell land together |
| C12 failure from unlinked comparison cell | Harness block | X2 uses uppercase `N/A` (exempt); X3 uses SC2 verbatim with valid `[text](link)` |

---

## Sources

### Primary (HIGH confidence)

- `docs/reference/macos-capability-matrix.md` — direct corpus inspection (lines 1-112 fully read); exact X1 edit target at line 38; insertion point confirmed (line 88 `## Key Gaps Summary`, line 100 `## See Also`)
- `docs/reference/4-platform-capability-comparison.md` — direct corpus inspection (lines 1-111 fully read); confirmed NO existing SSO/Authentication section; verdict grammar at lines 11-15; `n/a` convention at lines 24, 93; 6 named H2s confirmed
- `scripts/validation/v1.8-milestone-audit.mjs` lines 609-680 — C12 exact rule (cells.length check, `/\[.+\]\(.+\)/` regex, `—`/`N/A` exemptions, 6-H2 sub-check); C13 exact rule (15-entry allowlist shape only)
- `docs/reference/ios-capability-matrix.md`, `android-capability-matrix.md`, `linux-capability-matrix.md` — direct H2 inspection; confirmed NONE has `## Authentication` heading
- `.planning/phases/79-reference-integration-capability-matrix-5-platform-compariso/79-CONTEXT.md` — all locked decisions (A1/B2+P1/C1/D1/X1/X2/X3)
- `.planning/research/SUMMARY.md` — auth method facts, version floors, Entra licensing, NUAL, passkey, hybrid-join anti-feature (all HIGH confidence)
- `.planning/REQUIREMENTS.md` — SSOREF-02 (line 51); hybrid-join anti-feature (line 83); non-macOS auth out of scope (line 89)

### Secondary (MEDIUM confidence)

- `.planning/research/PITFALLS.md` — DS-2 90-day cadence (DS-2), anchor-drift risk (DS-3), version recency traps (VR-4), NUAL LOW-confidence key (D3=B)
- `.planning/phases/78-legacy-sso-plug-in-migration-guide/78-01-PLAN.md` — analogous docs-phase plan structure (atomic-commit pattern, threat_model for docs phase, verification command shape)

### Internal (HIGH confidence for doc-authoring patterns)

- `.planning/ROADMAP.md` §"Phase 79" lines 484-494 — SC1 row list, SC2 verbatim string, pre-edit anchor inventory hard prerequisite
- `.planning/research/ARCHITECTURE.md` lines 248-331 — link-not-copy pattern, X1 edit rationale (ARCH:252/329), capability-matrix integration design

---

## Metadata

**Confidence breakdown:**

| Area | Level | Reason |
|------|-------|--------|
| SC1 fact set (auth methods, hardware gates, version floors, licensing, NUAL, passkey, hybrid-join) | HIGH | All facts sourced from SUMMARY.md (HIGH confidence), verified against Microsoft Learn 2026-05-18..2026-06-15 and Apple Platform Security June 2026. Guides 08/09 are complete and canonical. |
| Mechanical constraints (C12/C13 rules, insertion points, anchor sets) | HIGH | Direct source-code reading of audit.mjs:609-680; direct line-number reading of both reference files |
| Anchor inventory (pre-edit H2 sets for both files) | HIGH | Direct grep inspection of both files in this session; every H2 enumerated and slugified |
| Sibling-matrix `#authentication` absence (grounds X2) | HIGH | Direct grep '^## Authentication' across all four sibling docs — zero matches confirmed |
| X3 SC2 verbatim string | HIGH | Locked in CONTEXT.md X3; confirmed passes C12 regex; confirmed no existing stub to overwrite |

**Research date:** 2026-06-21
**Valid until:** 2026-09-21 (90-day DS-2 cadence; before then: macOS version gates, Company Portal version floors, Entra licensing could change with point releases)
