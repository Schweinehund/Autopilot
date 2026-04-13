---
status: issues_found
phase: 11
files_reviewed: 6
findings:
  critical: 1
  warning: 1
  info: 0
  total: 2
---

# Phase 11 Review — APv2 Lifecycle Foundation

Reviewed files:
- docs/lifecycle-apv2/00-overview.md
- docs/lifecycle-apv2/01-prerequisites.md
- docs/_templates/admin-template.md
- docs/lifecycle-apv2/02-deployment-flow.md
- docs/lifecycle-apv2/03-automatic-mode.md
- docs/apv1-vs-apv2.md

---

## Critical

### C1 — Broken internal link: `runbooks-l2` directory does not exist
**File:** `docs/lifecycle-apv2/00-overview.md`, line ~90
**Confidence:** 97

The `<details>` block references `../runbooks-l2/apv2-log-collection.md`. The actual directory is `docs/l2-runbooks/` (not `runbooks-l2`). Additionally, `apv2-log-collection.md` does not yet exist — it's a Phase 14 deliverable. The directory name in the link path is incorrect.

**Fix:** Update directory name to `l2-runbooks` and mark as forward reference to Phase 14.

---

## Warning

### W1 — YAML frontmatter unreachable: HTML comment precedes `---` delimiters in admin-template.md
**File:** `docs/_templates/admin-template.md`, lines 1-18
**Confidence:** 92

HTML comment block before YAML `---` causes frontmatter to not be parsed by standard processors. However, this matches the existing pattern used by `l1-template.md` and `l2-template.md` in the same directory — all templates in this project use HTML comments before frontmatter as usage instructions.

**Assessment:** Consistent with established project convention. Not a regression. No fix needed unless project convention changes.

---

## Not Flagged (reviewed and clear)

- Mermaid syntax in `02-deployment-flow.md` and `apv1-vs-apv2.md`: valid `graph TD`, correct `classDef`/`class`, no errors
- Factual consistency: app limit (25), AppID, preview dates consistent across all files
- All other cross-links resolve to existing files
- Template completeness: admin-template.md has all required sections
