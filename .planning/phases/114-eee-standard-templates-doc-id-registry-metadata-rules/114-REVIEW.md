---
phase: 114-eee-standard-templates-doc-id-registry-metadata-rules
reviewed: 2026-07-04T00:00:00Z
depth: standard
files_reviewed: 9
files_reviewed_list:
  - docs/_standards/EEE-SOP-standard.md
  - docs/_registry/RE-index.md
  - docs/_templates/admin-template.md
  - docs/_templates/admin-template-android.md
  - docs/_templates/admin-template-ios.md
  - docs/_templates/admin-template-macos.md
  - docs/_templates/l1-template.md
  - docs/_templates/l2-template.md
  - docs/_templates/reference-template.md
findings:
  critical: 0
  warning: 2
  info: 5
  total: 7
status: issues_found
---

# Phase 114: Code Review Report

**Reviewed:** 2026-07-04T00:00:00Z
**Depth:** standard
**Files Reviewed:** 9
**Status:** issues_found

## Summary

Reviewed the EEE SOP standard, the Phase-1 Doc ID registry, and seven authoring templates for
conformance and integrity — the artifact-class equivalent of correctness bugs. The deliverable
is strong on the load-bearing invariants:

- **Registry integrity is clean.** All 178 IDs are unique, contiguous RE-001..RE-178 with zero
  gaps, every one of the 178 `Path` values resolves to a file on disk, no rows reference the
  D-04 out-of-scope directories (`docs/operations/`, `docs/device-operations/`,
  `docs/cross-platform/`), and no test-fixture IDs (`RE-T0x`, `draft-test-doc`) leak in. Doc
  Type assignments match the D-02 taxonomy (runbooks→Runbook, admin-setup→Guide, end-user→Guide,
  reference/error-codes/comparison→Reference). Class counts match the standard's scope estimates
  (75 runbooks, 66 admin-setup, 37 reference).
- **Every template's D-05 header block is conformant.** Field set/order (`Platform · Doc Type ·
  Doc ID · Status`), the separator (verified byte-level as U+00B7 middle-dot in all nine block
  lines), no `owner`, and no `Last Reviewed` — all correct. Every template's `platform:` value
  resolves in the D1 map (no residual pipe-list placeholders), so none will fail C17 assertion
  #10 in Phase 115.
- **The D1 map is complete and consistent** (20 entries, no duplicate raw keys, clean labels,
  no-fallback rule stated). The standard states the OQ2 Draft-label rule, D2 verbatim
  `last_verified` semantics + Version-History row, the four-value Doc Type taxonomy, and a
  13-assertion C17 needle-spec without contradicting the templates it governs.

**No Critical findings.** Nothing here would fail C17 across the corpus in Phase 115, corrupt
the registry, or render a template non-conformant to the D-05 block spec. The findings below are
consistency/maintainability gaps seeded by the templates and one broken example link.

## Warnings

### WR-01: All seven templates violate the standard's mandated frontmatter key order

**File:** `docs/_templates/admin-template.md:24-32` (and the same defect in all six sibling
templates: `admin-template-android.md:34-41`, `admin-template-ios.md:26-33`,
`admin-template-macos.md:26-33`, `l1-template.md:23-31`, `l2-template.md:24-32`,
`reference-template.md:23-29`)

**Issue:** The standard's *Required Frontmatter Schema* section
(`docs/_standards/EEE-SOP-standard.md:45-48`) states normatively: "Every in-scope corpus
document and template **must** carry these seven YAML frontmatter keys, **in the order listed**"
— i.e. `doc_id, status, owner, doc_type, platform, last_verified, review_by`. The standard's own
file (STD-001) follows that order exactly (lines 2-8). None of the seven templates do: they all
lead with `last_verified, review_by, [applies_to], [audience]` and place `doc_id` fifth. Because
the templates are the canonical authoring scaffolds, every ~178 retrofit doc copied from them
will inherit the wrong order. This is not caught by any gate — C17 assertion #8 checks key
*presence* only, not order — so it will silently pollute the corpus. (Sibling gap: the schema is
also silent on the `applies_to`/`audience` keys the templates carry — see IN-04.)

**Fix:** Reorder each template's frontmatter to match the schema, e.g. for `admin-template.md`:
```yaml
---
doc_id: RE-[FILL-IN]
status: Draft
owner: [FILL-IN]
doc_type: Guide
platform: all
last_verified: 1970-01-01 # TEMPLATE-SENTINEL
review_by: YYYY-MM-DD
applies_to: APv1 | APv2 | both
audience: admin
---
```
Alternatively, if the leading-`last_verified` order is intentional, relax the standard's "in the
order listed" from MUST to a non-normative recommendation so the standard and its templates agree.

### WR-02: Broken concrete cross-reference in the Android template example

**File:** `docs/_templates/admin-template-android.md:128`

**Issue:** The Configuration-Caused Failures table contains a *filled-in* (not bracketed
placeholder) example row linking to
`[MGP App Not Installed Runbook](../l1-runbooks/26-mgp-app-not-installed.md)`. That path does not
exist. The registry (RE-027) and the filesystem confirm the actual file is
`docs/l1-runbooks/26-android-mgp-app-not-installed.md` (the `android-` segment is missing from
the link). Because this is presented as a concrete example rather than a `[bracketed]`
placeholder, an author copying the template inherits a dead link.

**Fix:**
```markdown
| [Cross-portal example: MGP app approval missing] | Managed Google Play | App fails to install on target device; symptom visible in Intune admin center app-assignment status column | [MGP App Not Installed Runbook](../l1-runbooks/26-android-mgp-app-not-installed.md) |
```

## Info

### IN-01: Admin template uses a non-existent directory name in a runbook link

**File:** `docs/_templates/admin-template.md:62`

**Issue:** The "What breaks if misconfigured" example links to
`../runbooks-l1/relevant-runbook.md`. The directory `docs/runbooks-l1/` does not exist; the real
directory is `docs/l1-runbooks/` (confirmed on disk and used correctly by the iOS/macOS/Android
templates, e.g. `admin-template-android.md:66,87`). It is a placeholder link, but the reversed
directory name models the wrong convention for authors.

**Fix:** Change to `../l1-runbooks/relevant-runbook.md`.

### IN-02: Android template review-cadence diverges from all other templates without a stated basis

**File:** `docs/_templates/admin-template-android.md:4`

**Issue:** The Android template instructs `review_by = last_verified + 60 days, NOT 90`, whereas
the other six templates and the standard's freshness gate all use +90 days
(`EEE-SOP-standard.md:58` — `review_by` ≤ 90 days after `last_verified`). 60 days is within the
≤90 bound so it does not conflict with the standard, but nothing in the standard establishes a
tighter Android cadence, making this an unsourced inconsistency likely to confuse authors.

**Fix:** Either align the Android template to +90 days, or add the Android-specific 60-day
cadence rationale to the standard so the divergence is authoritative rather than incidental.

### IN-03: Registry `Status` column value `Pending` is outside the standard's Status vocabulary

**File:** `docs/_registry/RE-index.md:9-188`

**Issue:** The `Status` column is `Pending` for all 178 rows. The standard defines a Status
vocabulary of exactly `{Draft, Approved, Superseded}` (`EEE-SOP-standard.md:177-201`); `Pending`
is not a member. Semantically `Pending` is defensible — it tracks *registry/retrofit* state ("ID
assigned, not yet retrofitted"), which is distinct from a document's own approval status — but
the shared column name `Status` collides with the governed vocabulary and could mislead a reader
or a future tool that validates the column against the standard.

**Fix:** Rename the column to `Retrofit Status` (or `Registry State`), or add a one-line note in
the registry header defining `Pending` as a registry-tracking state distinct from document
`status`.

### IN-04: Standard schema omits the `applies_to` and `audience` keys the templates carry

**File:** `docs/_standards/EEE-SOP-standard.md:45-58`

**Issue:** The schema enumerates exactly seven keys and is silent on `applies_to` (in
admin/l1/l2 templates) and `audience` (in all admin/l1/l2 templates). C17 assertion #8 checks
only the required keys' presence, so extra keys pass the gate — but the standard, as the
"harness validation source of truth," should acknowledge the additional keys the corpus and
templates actually use so their format expectations are documented.

**Fix:** Add an "Optional/legacy frontmatter keys" note to the schema section documenting
`applies_to` and `audience` (values and whether they are retained on retrofit).

### IN-05: Registry meta-doc carries neither frontmatter nor a visible header block, unlike the standard meta-doc

**File:** `docs/_registry/RE-index.md:1-9`

**Issue:** `EEE-SOP-standard.md` is a meta-doc and carries full YAML frontmatter + a D-05 block
(STD-001), but `RE-index.md` — also a meta-doc governed by the same standard
(`EEE-SOP-standard.md:41-43`) — has no frontmatter and no header block. The standard is
ambiguous on whether `docs/_registry/` meta-docs require them. Since the registry is explicitly
excluded from the indexed library and C17 scope is corpus-only, omitting the block is defensible,
but the inconsistent treatment of the two meta-docs is worth resolving explicitly.

**Fix:** Either state in the standard that `docs/_registry/` artifacts are exempt from the
frontmatter/block requirement, or add a minimal `STD-002` frontmatter block to `RE-index.md` for
consistency with `EEE-SOP-standard.md`.

---

_Reviewed: 2026-07-04T00:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
