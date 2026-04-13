# Phase 18: Stale Cross-Reference Cleanup - Research

**Researched:** 2026-04-13
**Domain:** Markdown documentation link hygiene — anchor resolution, placeholder replacement, navigation gap closure
**Confidence:** HIGH

---

## Summary

Phase 18 is a pure editorial cleanup phase. Every change is a targeted text substitution in an existing Markdown file. There is no new content to write, no new files to create, and no external research required. The research task is: read every file named in the success criteria, locate the exact broken text, verify what the correct replacement is, and document it so the planner can produce surgical task instructions.

All five success criteria have been verified by direct file inspection. The work is mechanical: five categories of changes across eight files, with one new Shared References row to add to `index.md`. None of the changes require judgment — the correct replacement text is deterministic from the current state of the completed files.

**Primary recommendation:** Write a single plan (18-01-PLAN.md) with one task per file touched. Each task must include the exact line(s) to change and the exact replacement text. No editorial judgment is needed during execution.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| TROU-01 | Technician can look up any APv2 failure scenario by symptom — the error index APv2 Note must link directly to the failure catalog | Fix 1 below: add direct link to `error-codes/06-apv2-device-preparation.md` in `error-codes/00-index.md` APv2 Note |
| NAVG-02 | The master error code index has an APv2 section that navigates to the APv2 failure catalog | Same fix as TROU-01 — the APv2 Note is the integration point between the index and the catalog |

</phase_requirements>

---

## Verified Change Inventory

This section is the core deliverable. Every change needed for Phase 18 is documented with file path, current text, and correct replacement. Evidence comes from direct file reads (HIGH confidence).

### Fix 1 — error-codes/00-index.md: Add direct link in APv2 Note

**File:** `docs/error-codes/00-index.md`
**Line:** 65
**Current text:**
```
> **APv2 Note:** For APv2 (Device Preparation) error coverage, check the APv2 Notes section at the bottom of each category page. For framework differences, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).
```
**Required text:**
```
> **APv2 Note:** For APv2 (Device Preparation) error coverage, see the [APv2 Device Preparation Failure Catalog](06-apv2-device-preparation.md). APv2 failures are symptom-based rather than hex-code-based. For framework differences, see [APv1 vs APv2 disambiguation](../apv1-vs-apv2.md).
```
**Why:** The APv2 Note currently has no navigable link to `06-apv2-device-preparation.md`. Users following the error lookup path hit a dead end. This closes the integration gap identified in the milestone audit (TROU-01, NAVG-02).

---

### Fix 2 — admin-setup-apv2/00-04: Replace "coming in Phase 16" placeholder in version gate

Five files carry an identical stale placeholder in their version gate block. Phase 16 is complete and `admin-setup-apv1/00-overview.md` exists. The placeholder must become a real link.

**Files affected (all five carry the identical broken line):**
- `docs/admin-setup-apv2/00-overview.md` — line 9
- `docs/admin-setup-apv2/01-prerequisites-rbac.md` — line 9
- `docs/admin-setup-apv2/02-etg-device-group.md` — line 9
- `docs/admin-setup-apv2/03-device-preparation-policy.md` — line 9
- `docs/admin-setup-apv2/04-corporate-identifiers.md` — line 9

**Current text (identical in all five):**
```
> For Windows Autopilot (classic), see [APv1 Admin Setup Guides -- coming in Phase 16].
```
**Required text (identical in all five):**
```
> For Windows Autopilot (classic), see [APv1 Admin Setup Guides](../admin-setup-apv1/00-overview.md).
```
**Why:** Phase 16 is complete. The file exists at `docs/admin-setup-apv1/00-overview.md`. Relative path from `docs/admin-setup-apv2/` to `docs/admin-setup-apv1/` is `../admin-setup-apv1/`. The `[text]` without a URL is not a valid Markdown link and renders as plain text.

---

### Fix 3 — lifecycle-apv2/03-automatic-mode.md: Replace "Phase 15" planning references

**File:** `docs/lifecycle-apv2/03-automatic-mode.md`
**Two locations:**

**Location A — line 72:**
Current text:
```
The following is a high-level orientation of the admin setup process. For detailed configuration steps, see the APv2 Admin Setup Guide (Phase 15).
```
Required text:
```
The following is a high-level orientation of the admin setup process. For detailed configuration steps, see the [APv2 Admin Setup Guide](../admin-setup-apv2/00-overview.md).
```

**Location B — line 81 (the blockquote):**
Current text:
```
> For detailed configuration steps, see the APv2 Admin Setup Guide (planned for Phase 15).
```
Required text:
```
> For detailed configuration steps, see the [APv2 Admin Setup Guide](../admin-setup-apv2/00-overview.md).
```
**Why:** Phase 15 is complete. `docs/admin-setup-apv2/00-overview.md` exists. Both occurrences are forward-planning placeholders written before Phase 15 was executed. Relative path from `docs/lifecycle-apv2/` to `docs/admin-setup-apv2/` is `../admin-setup-apv2/`.

---

### Fix 4 — admin-setup-apv1/00-overview.md: Fix broken anchor

**File:** `docs/admin-setup-apv1/00-overview.md`
**Line:** 16
**Current text (excerpt):**
```
the [decision flowchart](../apv1-vs-apv2.md#decision-flowchart)
```
**Required text:**
```
the [decision flowchart](../apv1-vs-apv2.md#which-guide-do-i-use)
```
**Why:** `apv1-vs-apv2.md` has no heading that generates the anchor `#decision-flowchart`. The file has three headings: `## Feature Comparison`, `## Which Guide Do I Use?`, and `## Important Notes`. The "Which Guide Do I Use?" section is the decision logic being referenced — its auto-generated anchor is `#which-guide-do-i-use`. Confirmed by direct file read.

**Anchor generation rule (standard Markdown):** Heading text is lowercased, spaces become hyphens, punctuation is removed. `## Which Guide Do I Use?` → `#which-guide-do-i-use`.

---

### Fix 5 — index.md: Add lifecycle-apv2/00-overview.md to Shared References

**File:** `docs/index.md`
**Location:** `## Shared References` table (currently lines 73-80)
**Current Shared References table:**
```markdown
| Resource | Description |
|----------|-------------|
| [Autopilot Glossary](_glossary.md) | Terminology definitions ([OOBE](_glossary.md#oobe), [ESP](_glossary.md#esp), TPM, ZTD, APv1, APv2) |
| [Error Code Index](error-codes/00-index.md) | Master error code lookup with deployment-mode tagging |
| [Lifecycle Overview](lifecycle/00-overview.md) | End-to-end deployment sequence with flow diagrams |
| [APv1 vs APv2](apv1-vs-apv2.md) | Framework selection — which docs apply to which mode |
| [Common Issues Index](common-issues.md) | Symptom-based router to L1 and L2 runbooks |
```
**Required addition (new row after APv1 vs APv2 row):**
```markdown
| [APv2 Lifecycle Overview](lifecycle-apv2/00-overview.md) | APv2 deployment model, Enrollment Time Grouping mechanism, and automatic mode |
```
**Why:** `lifecycle-apv2/00-overview.md` is the root document for the APv2 lifecycle content (4 files: 00-03). It is currently not reachable from `index.md` Shared References — users must navigate via the Admin Setup guides or `apv1-vs-apv2.md` to find it. The milestone audit flagged this as a navigation gap. The path from `docs/index.md` to `docs/lifecycle-apv2/00-overview.md` is `lifecycle-apv2/00-overview.md` (sibling directory, no `../` needed).

---

## File Change Summary

| File | Change Type | Lines Affected | Complexity |
|------|-------------|----------------|------------|
| `docs/error-codes/00-index.md` | Text replacement (APv2 Note) | Line 65 | Trivial |
| `docs/admin-setup-apv2/00-overview.md` | Text replacement (version gate) | Line 9 | Trivial |
| `docs/admin-setup-apv2/01-prerequisites-rbac.md` | Text replacement (version gate) | Line 9 | Trivial |
| `docs/admin-setup-apv2/02-etg-device-group.md` | Text replacement (version gate) | Line 9 | Trivial |
| `docs/admin-setup-apv2/03-device-preparation-policy.md` | Text replacement (version gate) | Line 9 | Trivial |
| `docs/admin-setup-apv2/04-corporate-identifiers.md` | Text replacement (version gate) | Line 9 | Trivial |
| `docs/lifecycle-apv2/03-automatic-mode.md` | Text replacement (2 locations) | Lines 72, 81 | Trivial |
| `docs/admin-setup-apv1/00-overview.md` | Anchor fix in existing link | Line 16 | Trivial |
| `docs/index.md` | New table row in Shared References | After line 80 | Trivial |

**Total files:** 9
**Total changes:** 10 discrete text edits

---

## Architecture Patterns

This phase has no software architecture. The "pattern" is editorial:

### Markdown Anchor Generation
Standard GitHub-Flavored Markdown (GFM) anchor rules (applicable to this project):
- Heading text lowercased
- Spaces replaced with hyphens
- All punctuation removed except hyphens
- Leading hyphens removed

Example: `## Which Guide Do I Use?` → `#which-guide-do-i-use`

Verification method: read the target file's headings, apply the rule. Do not guess anchors from link text — verify by reading the target file. This is exactly how Fix 4 was determined.

### Relative Path Resolution
From `docs/admin-setup-apv2/` (any file):
- To `docs/admin-setup-apv1/00-overview.md` → `../admin-setup-apv1/00-overview.md`
- To `docs/apv1-vs-apv2.md` → `../apv1-vs-apv2.md` (already correct in these files)
- To `docs/lifecycle-apv2/00-overview.md` → `../lifecycle-apv2/00-overview.md`

From `docs/lifecycle-apv2/` (any file):
- To `docs/admin-setup-apv2/00-overview.md` → `../admin-setup-apv2/00-overview.md`

From `docs/` (index.md):
- To `docs/lifecycle-apv2/00-overview.md` → `lifecycle-apv2/00-overview.md`
- To `docs/error-codes/06-apv2-device-preparation.md` → `error-codes/06-apv2-device-preparation.md`

From `docs/error-codes/` (00-index.md):
- To `docs/error-codes/06-apv2-device-preparation.md` → `06-apv2-device-preparation.md` (same directory)

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Finding anchor names | Manually composing from memory | Read the target file, inspect headings, apply GFM rules | Phase 17 already made this mistake — `#decision-flowchart` was composed from memory, not verified |
| Finding line numbers | Trusting training data line numbers | Read the file, count from top | Line numbers in this RESEARCH.md are from direct reads — executor must re-read before editing |

---

## Common Pitfalls

### Pitfall 1: Line Number Drift
**What goes wrong:** Line numbers documented in research shift if earlier edits in the same file change the file length.
**Why it happens:** Multiple edits to the same file in a single plan execution.
**How to avoid:** When editing a file multiple times in one plan, read the file fresh before the second edit.
**Warning signs:** Only `lifecycle-apv2/03-automatic-mode.md` has two edits. Read it once, make both changes in a single Write, not sequential Edits.

### Pitfall 2: Broken Link Format (text without URL)
**What goes wrong:** `[APv1 Admin Setup Guides -- coming in Phase 16]` renders as plain text, not a broken link — a renderer won't flag it as an error but the link is missing.
**Why it happens:** The placeholder was written as `[text]` without `(url)`, which is not valid Markdown hyperlink syntax.
**How to avoid:** The replacement must be `[text](url)` — both parts required.

### Pitfall 3: Anchor Case Sensitivity
**What goes wrong:** Writing `#Which-Guide-Do-I-Use` instead of `#which-guide-do-i-use`.
**Why it happens:** GFM anchors are all-lowercase.
**How to avoid:** Always lowercase the full anchor string.

### Pitfall 4: Wrong Relative Path Depth
**What goes wrong:** Writing `admin-setup-apv1/00-overview.md` from inside `docs/admin-setup-apv2/` (missing `../`).
**Why it happens:** Forgetting that files in `admin-setup-apv2/` are one level below `docs/`.
**How to avoid:** Count directory levels. From `docs/admin-setup-apv2/` any file, moving to a sibling directory requires `../`.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Manual verification + grep |
| Config file | None |
| Quick run command | `grep -n "coming in Phase 16" docs/admin-setup-apv2/*.md` (expect 0 results) |
| Full suite command | See phase requirements test map below |

### Phase Requirements Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| TROU-01 | `error-codes/00-index.md` APv2 Note contains direct link to `06-apv2-device-preparation.md` | smoke | `grep "06-apv2-device-preparation.md" docs/error-codes/00-index.md` (expect match) | Yes |
| NAVG-02 | APv2 error index section is navigable to APv2 failure catalog | smoke | Same command as TROU-01 | Yes |

### Per-Success-Criteria Verification Commands

After each task, run the corresponding grep to confirm:

| Success Criterion | Verification Command | Expected Result |
|-------------------|---------------------|-----------------|
| SC1: error-codes APv2 Note has link | `grep "06-apv2-device-preparation.md" docs/error-codes/00-index.md` | 1 match on APv2 Note line |
| SC2: APv2 admin files link to APv1 overview | `grep "coming in Phase 16" docs/admin-setup-apv2/*.md` | 0 matches |
| SC3: lifecycle-apv2/03 links to admin-setup-apv2 | `grep "Phase 15" docs/lifecycle-apv2/03-automatic-mode.md` | 0 matches |
| SC4: admin-setup-apv1/00 anchor is correct | `grep "decision-flowchart" docs/admin-setup-apv1/00-overview.md` | 0 matches |
| SC5: index.md Shared References has APv2 lifecycle entry | `grep "lifecycle-apv2/00-overview.md" docs/index.md` | 1 match in Shared References table |

### Wave 0 Gaps

None — existing infrastructure (direct file reads + grep) covers all verification needs. No test framework installation required.

---

## Runtime State Inventory

> This is not a rename/refactor/migration phase. No runtime state is affected — all changes are in Markdown files tracked in git. Omitting all runtime state categories.

---

## Sources

### Primary (HIGH confidence)
- Direct file read: `docs/error-codes/00-index.md` — confirmed APv2 Note text at line 65, no link to `06-apv2-device-preparation.md`
- Direct file read: `docs/admin-setup-apv2/00-overview.md` — confirmed stale placeholder at line 9
- Direct file read: `docs/admin-setup-apv2/01-prerequisites-rbac.md` — confirmed stale placeholder at line 9
- Direct file read: `docs/admin-setup-apv2/02-etg-device-group.md` — confirmed stale placeholder at line 9
- Direct file read: `docs/admin-setup-apv2/03-device-preparation-policy.md` — confirmed stale placeholder at line 9
- Direct file read: `docs/admin-setup-apv2/04-corporate-identifiers.md` — confirmed stale placeholder at line 9
- Direct file read: `docs/lifecycle-apv2/03-automatic-mode.md` — confirmed "Phase 15" at lines 72 and 81
- Direct file read: `docs/admin-setup-apv1/00-overview.md` — confirmed `#decision-flowchart` anchor at line 16
- Direct file read: `docs/apv1-vs-apv2.md` — confirmed headings are `## Feature Comparison`, `## Which Guide Do I Use?`, `## Important Notes`; no `#decision-flowchart` anchor exists
- Direct file read: `docs/index.md` — confirmed Shared References table has no `lifecycle-apv2/00-overview.md` entry
- Direct file read: `.planning/v1.1-MILESTONE-AUDIT.md` — confirmed all 7 tech debt items and their assignment to Phase 18 vs Phase 19

### Secondary (MEDIUM confidence)
- None required — all findings are directly verifiable from source files.

---

## Metadata

**Confidence breakdown:**
- Change inventory (what to fix): HIGH — every item verified by direct file read
- Replacement text (what to write): HIGH — determined from verified file content + standard GFM anchor rules
- Line numbers: MEDIUM — accurate at time of read; executor must re-read files before editing

**Research date:** 2026-04-13
**Valid until:** Until any of the 9 target files are modified; re-read before executing if any doubt
