# Phase 79: Reference Integration — Capability Matrix & 5-Platform Comparison - Pattern Map

**Mapped:** 2026-06-21
**Files analyzed:** 3 (2 edits + 1 create)
**Analogs found:** 3 / 3

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `docs/reference/macos-capability-matrix.md` | reference-doc (edit: append section + cell edit) | transform | Same file's own existing sections (`## Enrollment` … `## Conditional Access`) | self-analog (exact) |
| `docs/reference/4-platform-capability-comparison.md` | reference-doc (edit: append section) | transform | Same file's own existing sections (`## Enrollment` … `## Conditional Access`) | self-analog (exact) |
| `.planning/phases/79-.../79-ANCHOR-INVENTORY.md` | artifact (create: pre-edit anchor inventory) | batch | Phase 78 anchor-stability / PITFALL-6 discipline from `78-01-PLAN.md` | role-match |

---

## Pattern Assignments

### `docs/reference/macos-capability-matrix.md` — EDIT (append `## Authentication` + X1 cell edit)

**Analog:** The file's own existing sections — `## Configuration` (lines 28–40), `## Conditional Access` (lines 78–86).

---

**Front-matter pattern** (lines 1–7):
```yaml
---
last_verified: 2026-04-14
review_by: 2026-07-13
applies_to: both
audience: admin
platform: all
---
```
UPDATE to: `last_verified: 2026-06-21` / `review_by: 2026-09-21` (DS-2 90-day cadence; the new `## Authentication` section constitutes a material content change).

---

**Table header shape** (macos-capability-matrix.md lines 15–16, repeated at every section):
```markdown
| Feature | Windows | macOS |
|---------|---------|-------|
```
Every new row in `## Authentication` uses this exact 3-column shape. No nested tables, no extra columns.

---

**Terse Windows scope-marker cell pattern** (line 84 — `## Conditional Access` Per-app CA row):
```markdown
| Per-app CA (MAM) | n/a (Windows uses Intune client) | Limited (MAM-WE is iOS-primary; ...) |
```
Model for all 7 Windows cells in `## Authentication`:
```
n/a — not covered in this matrix
```
Note: the matrix uses `n/a` (lowercase) in prose cells; this is NOT the comparison doc — the matrix is NOT C12-bound (D-01a), so no hyperlink is required. The double-dash `--` and single-dash `—` conventions coexist in the matrix; use ` — ` (spaced em-dash) as in line 84.

---

**X1 target cell — find/replace** (line 38 in `## Configuration`):
```
FIND (exact line 38):
| Platform SSO | No | Yes (macOS 14+ via Settings Catalog) |

REPLACE WITH:
| Platform SSO | No | Yes (macOS 14+ via Settings Catalog) — see [Authentication](#authentication) |
```
The `## Configuration` heading at line 28 is NOT touched. Cell-text edit only.

---

**Version-History table pattern** (lines 109–111):
```markdown
| Date | Change | Author |
|------|--------|--------|
| 2026-04-14 | Initial version -- 5-domain capability matrix comparing Windows and macOS Intune management | -- |
```
Add a new row for Phase 79 (append below the initial-version row):
```markdown
| 2026-06-21 | Add `## Authentication` section (7 rows: auth methods, hardware gate, macOS version floor, Entra licensing, NUAL, passkey/FIDO2, hybrid Entra join anti-feature); update `## Configuration` Platform SSO row to link `#authentication` (X1) | -- |
```
Author column uses `--` (two hyphens), not an em-dash.

---

**Insertion point** (P1/D-02a — confirmed by live file):
- `## Key Gaps Summary` ends at line 98 (last bullet).
- `## See Also` begins at line 100.
- Insert `## Authentication` block between line 98 and line 100 (i.e., after the Key Gaps Summary block, before the `## See Also` heading).

---

**`## Authentication` section to append — full shape** (D-01, A1, B2, D-02):
```markdown
## Authentication

This section documents macOS Platform SSO (PSSO) authentication. Windows SSO configuration (Windows Hello for Business / Web Account Manager) is not covered in this matrix.

| Feature | Windows | macOS |
|---------|---------|-------|
| Auth methods | n/a — not covered in this matrix | Three methods: Secure Enclave key (Microsoft-recommended), Password sync, Smart card — see [Auth Methods Deep Dive](../admin-setup-macos/08-auth-methods-deep-dive.md) |
| Hardware gate | n/a — not covered in this matrix | Secure Enclave method requires T2 chip (Intel 2018–2020) or Apple Silicon (M1+, 2020+); Password sync and Smart card have no hardware gate |
| macOS version floor | n/a — not covered in this matrix | macOS 14.0 Sonoma (recommended floor — all three methods, non-deprecated Settings Catalog key, NUAL, Repair flow); see [guide 08](../admin-setup-macos/08-auth-methods-deep-dive.md) for macOS 13 absolute-minimum details |
| Entra ID licensing | n/a — not covered in this matrix | No Entra ID P1 or P2 required for Platform SSO itself; see [guide 08](../admin-setup-macos/08-auth-methods-deep-dive.md) for CA-integration licensing detail |
| NUAL (New User at Login) | n/a — not covered in this matrix | Supported — macOS 14+; creates on-demand accounts at login window using Shared Device Keys — see [guide 08](../admin-setup-macos/08-auth-methods-deep-dive.md) |
| Passkey / FIDO2 | n/a — not covered in this matrix | Supported via Platform Credential — Secure Enclave method only; requires Entra Authentication-methods enablement — see [guide 08](../admin-setup-macos/08-auth-methods-deep-dive.md) |
| Hybrid Entra join | n/a — not covered in this matrix | **Not supported** — macOS PSSO requires Entra ID (cloud-only) join; Microsoft has no plans to support hybrid Entra join on macOS |
```

The exact prose wording of macOS cells is at Claude's discretion per CONTEXT.md; the row labels, link targets, and factual content above are locked by A1/B2/D-01.

---

### `docs/reference/4-platform-capability-comparison.md` — EDIT (add `## Single Sign-On` section)

**Analog:** The file's own existing sections — `## Conditional Access` (lines 87–95) and `## Enrollment` (lines 19–32).

---

**Front-matter pattern** (lines 1–7):
```yaml
---
last_verified: 2026-05-01
review_by: 2026-06-15
applies_to: both
audience: admin
platform: all
---
```
UPDATE: `last_verified: 2026-06-21` / `review_by: 2026-09-21` (stale `review_by: 2026-06-15` is already past; the SSO section addition constitutes a substantive review).

---

**Table header shape** (line 21, repeated at every section):
```markdown
| Feature | Windows | macOS | iOS | Android | Linux |
|---------|---------|-------|-----|---------|-------|
```
6 columns. C12-BOUND: every data cell (cols 1–5, i.e., Windows through Linux) must satisfy the cell grammar below. The new `## Single Sign-On` table uses this exact header.

---

**Standard linked cell grammar** (lines 23–24, `## Enrollment` rows):
```markdown
| Zero-touch / autopilot enrollment method | Supported — [matrix](linux-capability-matrix.md#enrollment) | Supported — [matrix](macos-capability-matrix.md#enrollment) | Supported — [matrix](ios-capability-matrix.md#enrollment) | Mode-dependent — [matrix](android-capability-matrix.md#enrollment) | Not supported — [matrix](linux-capability-matrix.md#enrollment) |
| Hardware identity / token model | Supported — [matrix](linux-capability-matrix.md#enrollment) | Supported — [matrix](macos-capability-matrix.md#enrollment) | Supported — [matrix](ios-capability-matrix.md#enrollment) | Mode-dependent — [matrix](android-capability-matrix.md#enrollment) | n/a — [matrix](linux-capability-matrix.md#enrollment) |
```
Pattern: `Verdict word — [matrix](platform-capability-matrix.md#anchor)`. Em-dash. Always linked (C12).

---

**Lowercase linked `n/a` convention** (lines 24, 93 — model for comparison doc `n/a` cells):
```markdown
n/a — [matrix](linux-capability-matrix.md#enrollment)
```
This convention CANNOT be used for non-macOS SSO cells (no sibling `#authentication` anchor exists — X2). Non-macOS SSO cells must use bare uppercase `N/A` (C12-exempt per audit.mjs:643).

---

**X2 / X3 SSO row — exact cell values** (C12 compliance verified in RESEARCH.md Pattern 4):

| Col | Exact cell value | C12 status |
|-----|-----------------|------------|
| Feature (col 0) | `OS-integrated SSO (Platform SSO)` | excluded from C12 (col-0 row label) |
| Windows (col 1) | `N/A` | exempt (uppercase, case-sensitive) |
| macOS (col 2) | `Supported (macOS 14+) — [matrix](macos-capability-matrix.md#authentication)` | passes `/\[.+\]\(.+\)/` — SC2 VERBATIM, do NOT adapt |
| iOS (col 3) | `N/A` | exempt |
| Android (col 4) | `N/A` | exempt |
| Linux (col 5) | `N/A` | exempt |

---

**`## Single Sign-On` section to add — full shape** (C1/D-03/X2/X3):
```markdown
## Single Sign-On

| Feature | Windows | macOS | iOS | Android | Linux |
|---------|---------|-------|-----|---------|-------|
| OS-integrated SSO (Platform SSO) | N/A | Supported (macOS 14+) — [matrix](macos-capability-matrix.md#authentication) | N/A | N/A | N/A |

> Non-macOS platform SSO authentication is not covered in this documentation set; `N/A` reflects deliberate scope, not capability absence.
```

The footnote wording is at Claude's discretion per CONTEXT.md; it must not use "v1.9" (reader-facing scope phrasing).

---

**Insertion point** (confirmed by live file):
- `## Conditional Access` ends at line 95 (last data row).
- `## See Also` begins at line 97.
- Insert `## Single Sign-On` section between line 95 and line 97.

---

**Version-History table pattern** (lines 108–110):
```markdown
| Date | Change | Author |
|------|--------|--------|
| 2026-05-01 | Initial version — Phase 58: 5-platform capability comparison ... | -- |
```
Add a new row:
```markdown
| 2026-06-21 | Add `## Single Sign-On` section (7th H2) with one feature row — macOS Platform SSO cell (X3 SC2 verbatim); non-macOS N/A (X2); update front-matter dates (DS-2) | -- |
```
Author column uses `--` (two hyphens). Note the initial-version row uses ` — ` (em-dash) in the change text; use either consistently. The header separator uses `—` (em-dash) in the initial row — replicate that style.

---

### `.planning/phases/79-reference-integration-capability-matrix-5-platform-compariso/79-ANCHOR-INVENTORY.md` — CREATE

**Analog:** PITFALL-6 anchor-stability discipline and the Phase 78 plan's atomic-commit / anchor-pre-check pattern (78-01-PLAN.md lines 61, 232–234).

**Commit constraint:** This file must be committed in its OWN commit (commit 1) BEFORE the content-edit commit (commit 2). This is ROADMAP SC2's hard prerequisite.

---

**Anchor slug generation method** (D-04 / D1 — deterministic):
```bash
# Enumerate all H2 headings; slugify: lowercase, spaces→hyphens, strip non-alphanumeric-non-hyphen
grep '^## ' docs/reference/macos-capability-matrix.md
grep '^## ' docs/reference/4-platform-capability-comparison.md
```
GitHub Markdown slug rule: lowercase; spaces become `-`; strip all characters that are not alphanumeric or `-`; no leading/trailing hyphens.

**Planner note:** The executor may use the Write tool directly (content is fully known from live file inspection — see pre-edit anchor sets below) rather than shell redirection.

---

**Pre-edit anchor sets — confirmed by direct file inspection:**

`macos-capability-matrix.md` (8 H2s):

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

Post-edit addition: `#authentication` (new `## Authentication` H2 inserted before `## See Also`).
Preserved: ALL 8 pre-edit anchors — especially `#configuration` (X1 edits cell text only).

`4-platform-capability-comparison.md` (8 H2s):

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

Post-edit addition: `#single-sign-on` (new `## Single Sign-On` H2 inserted before `## See Also`).
C12 sub-check: all 6 named H2s (`## Enrollment`, `## Configuration`, `## App Deployment`, `## Compliance`, `## Software Updates`, `## Conditional Access`) remain present — adding a 7th is explicitly allowed per audit.mjs:652-654.

---

**Proposed `79-ANCHOR-INVENTORY.md` layout:**

```markdown
# Phase 79 Pre-Edit Anchor Inventory

**Generated:** 2026-06-21
**Purpose:** Committed before content edits per SC2 hard prerequisite (D1). Proves anchor-stability: post-edit anchor sets are strict supersets of these pre-edit sets.

## macos-capability-matrix.md — Pre-Edit H2 Anchors

| H2 heading (exact) | Slug | Post-edit status |
|--------------------|------|-----------------|
| `## Enrollment` | `#enrollment` | preserved |
| `## Configuration` | `#configuration` | preserved (X1 edits cell text only — heading NOT touched) |
| `## App Deployment` | `#app-deployment` | preserved |
| `## Compliance` | `#compliance` | preserved |
| `## Software Updates` | `#software-updates` | preserved |
| `## Conditional Access` | `#conditional-access` | preserved |
| `## Key Gaps Summary` | `#key-gaps-summary` | preserved |
| `## See Also` | `#see-also` | preserved |
| *(new)* `## Authentication` | `#authentication` | ADDED (before `## See Also`) |

## 4-platform-capability-comparison.md — Pre-Edit H2 Anchors

| H2 heading (exact) | Slug | Post-edit status |
|--------------------|------|-----------------|
| `## Enrollment` | `#enrollment` | preserved |
| `## Configuration` | `#configuration` | preserved |
| `## App Deployment` | `#app-deployment` | preserved |
| `## Compliance` | `#compliance` | preserved |
| `## Software Updates` | `#software-updates` | preserved |
| `## Conditional Access` | `#conditional-access` | preserved |
| `## See Also` | `#see-also` | preserved |
| `## Version History` | `#version-history` | preserved |
| *(new)* `## Single Sign-On` | `#single-sign-on` | ADDED (before `## See Also`) |

## Superset Assertion

- **matrix post-edit:** {enrollment, configuration, app-deployment, compliance, software-updates, conditional-access, key-gaps-summary, see-also} ∪ {authentication} — superset holds
- **comparison post-edit:** {enrollment, configuration, app-deployment, compliance, software-updates, conditional-access, see-also, version-history} ∪ {single-sign-on} — superset holds

No pre-edit anchor is removed or renamed. C12 6-named-H2 sub-check: all six named H2s remain in comparison doc.
```

---

## Shared Patterns

### Atomic Commit Constraint (C13 safety)
**Source:** Phase 78 plan (`78-01-PLAN.md` lines 61, 232–234) — same constraint applies here.
**Apply to:** Commit 2 (both reference doc edits).

The matrix `#authentication` anchor (created in `macos-capability-matrix.md`) is the link target for the comparison doc's X3 cell (`macos-capability-matrix.md#authentication`). Both files MUST land in the same commit. Splitting them risks C13 failure (broken link between commits).

```bash
# After commit 2, confirm both files changed together:
git diff HEAD~1 --name-only
# Must show BOTH:
# docs/reference/macos-capability-matrix.md
# docs/reference/4-platform-capability-comparison.md
```

---

### Front-Matter Date Update (DS-2 90-day cadence)
**Apply to:** Both reference doc edits.

```yaml
# Both files: update to
last_verified: 2026-06-21
review_by: 2026-09-21
```

The matrix's `review_by: 2026-07-13` has not expired yet, but the `## Authentication` addition is a material content change warranting a reset. The comparison doc's `review_by: 2026-06-15` is already past — update is mandatory.

---

### Version-History Row Append Pattern
**Apply to:** Both reference doc edits.
**Source:** `macos-capability-matrix.md` lines 109–111; `4-platform-capability-comparison.md` lines 108–110.

Both files use `| Date | Change | Author |` tables with `--` (two hyphens) in the Author column. Append a new row at the bottom of each table — do NOT edit existing rows.

---

### Anchor-Stability Rule (PITFALL-3 / PITFALL-6)
**Apply to:** Both reference doc edits.
**Source:** Phase 78 plan (`78-01-PLAN.md` line 174); RESEARCH.md anti-patterns.

Edit cell TEXT only (X1) and append new H2s only. Never rename, reorder, or remove any existing `## Heading`. Verify with:
```bash
grep -n "^## Configuration" docs/reference/macos-capability-matrix.md
# Must still show line 28
```

---

### Harness Gate (C12 + C13 green)
**Apply to:** After commit 2.
**Source:** `scripts/validation/v1.8-milestone-audit.mjs` (frozen v1.8).

```bash
node scripts/validation/v1.8-milestone-audit.mjs
# Expected: 15/15 (or all pass)
# C12: N/A exempt; X3 cell has [matrix](...) link; 6 named H2s present; 7th allowed
# C13: 15-entry allowlist shape unchanged (valid new internal link cannot trip it)
```

---

### Post-Edit Grep Assertions
**Apply to:** After commit 2.

```bash
# Confirm ## Authentication anchor in matrix
grep -n "^## Authentication" docs/reference/macos-capability-matrix.md

# Confirm ## Single Sign-On anchor in comparison
grep -n "^## Single Sign-On" docs/reference/4-platform-capability-comparison.md

# Confirm X3 SC2 verbatim string (exact)
grep "Supported (macOS 14+) — \[matrix\](macos-capability-matrix.md#authentication)" docs/reference/4-platform-capability-comparison.md

# Confirm X1 cell edit in matrix
grep "Yes (macOS 14+ via Settings Catalog) — see \[Authentication\](#authentication)" docs/reference/macos-capability-matrix.md

# Confirm #configuration heading still intact (anchor-stability)
grep -n "^## Configuration" docs/reference/macos-capability-matrix.md

# Confirm 6 required H2s present in comparison (C12 sub-check)
for h2 in "## Enrollment" "## Configuration" "## App Deployment" "## Compliance" "## Software Updates" "## Conditional Access"; do
  grep -qF "$h2" docs/reference/4-platform-capability-comparison.md && echo "PRESENT: $h2" || echo "MISSING: $h2"
done
```

---

## No Analog Found

No files in this phase are without analog. All three deliverables have concrete existing patterns:
- Matrix section: self-analog (matrix's own existing H2 sections)
- Comparison section: self-analog (comparison's own existing H2 sections)
- Anchor inventory: role-match (Phase 78 PITFALL-6 / anchor-stability discipline)

---

## Critical Anti-Patterns (for planner reference)

| Anti-pattern | Why it fails | Correct action |
|-------------|-------------|----------------|
| Using lowercase `n/a — [matrix](...)` for non-macOS SSO cells | C12 FAIL if unlinked; C13 FAIL if linked to non-existent `#authentication` anchor in sibling matrix | Use bare uppercase `N/A` (C12-exempt per audit.mjs:643 case-sensitive check) |
| Adapting X3 SC2 verbatim string (removing `(macOS 14+)`) | Violates X3 SC2-verbatim mandate | Use exact string: `Supported (macOS 14+) — [matrix](macos-capability-matrix.md#authentication)` |
| Inserting `## Authentication` after `## See Also` or `## Version History` | Structurally wrong — content H2s belong before navigational tails | Insert between `## Key Gaps Summary` (line 98) and `## See Also` (line 100) |
| Touching `## Configuration` heading while editing line 38 | Renames `#configuration` slug — breaks all inbound comparison doc links | Edit ONLY the macOS cell text on line 38 |
| Cloning guide 08's four-dimension selection table into the matrix | Link-not-copy violation + maintenance drift (A3/A4 rejected) | One prose row + link to guide 08 |
| Splitting matrix and comparison edits into separate commits | C13 risk: `#authentication` link target absent when comparison commit is checked | Commit both files in one atomic commit (commit 2) |
| Leaking "v1.9" into reader-facing cells or prose | Internal milestone vocabulary in published docs | Phrase as "not covered in this matrix" |

---

## Metadata

**Analog search scope:** `docs/reference/` (both target files read in full), `.planning/phases/78-legacy-sso-plug-in-migration-guide/78-01-PLAN.md` (Phase 78 analog pattern)
**Files scanned:** 4 (2 target reference docs + comparison doc + Phase 78 plan)
**Pattern extraction date:** 2026-06-21
