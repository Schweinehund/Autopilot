---
status: issues_found
phase: 20-cross-platform-foundation
depth: standard
files_reviewed: 8
findings:
  critical: 1
  warning: 2
  info: 0
  total: 3
---

## Scope

Files reviewed from phase 20 (cross-platform foundation):

- `docs/_glossary.md` (modified -- banner line added)
- `docs/_glossary-macos.md` (new -- 6-term macOS glossary)
- `docs/_templates/admin-template.md` (modified -- platform field added)
- `docs/_templates/admin-template-macos.md` (new -- macOS admin template)
- `docs/_templates/l1-template.md` (modified -- platform field added)
- `docs/_templates/l2-template.md` (modified -- platform field added)
- `docs/index.md` (modified -- restructured with platform selector)
- `docs/windows-vs-macos.md` (new -- concept comparison page)

---

## Critical

### C1: Malformed Markdown links in `windows-vs-macos.md`

**File:** `docs/windows-vs-macos.md`, lines 10 and 67
**Confidence:** 95

The string `TBD - Phase 23` is used as a Markdown link URL target in two places. This is not a valid URL or file path. All Markdown renderers will produce a broken hyperlink.

The codebase pattern for not-yet-created content is unlinked plain text.

**Fix:**
- Line 10: `(see [Capability Matrix](TBD - Phase 23))` -> `(see Capability Matrix -- Phase 23)`
- Line 67: `- [Capability Matrix](TBD - Phase 23) -- ...` -> `- Capability Matrix (Phase 23) -- ...`

---

## Warning

### W1: `_glossary.md` missing `platform` field in frontmatter

**File:** `docs/_glossary.md`, lines 1-6
**Confidence:** 90

Phase 20 added the `platform` field to cross-platform content files. All three other phase-20 cross-platform files have `platform: all`. `_glossary.md` was modified in this phase to add a cross-platform banner but its frontmatter was not updated with `platform`.

**Fix:** Add `platform: all` to `docs/_glossary.md` frontmatter after `applies_to: both`.

---

### W2: `_glossary.md` uses `audience: both` instead of `audience: all`

**File:** `docs/_glossary.md`, line 5
**Confidence:** 82

All three other phase-20 cross-platform reference files use `audience: all`. `_glossary.md` retains `audience: both`. With the cross-platform banner now in scope, `audience: all` is the consistent value.

**Fix:** Change `audience: both` to `audience: all` in `docs/_glossary.md`.

---

## Verified Clean

- All anchor links from `_glossary-macos.md` to `_glossary.md` resolve to existing headings
- All anchor links from `windows-vs-macos.md` to both glossary files resolve correctly
- `admin-template-macos.md` omits `applies_to` intentionally (Windows-framework-specific field)
- `index.md` all linked files verified as present on disk
- Template platform-field additions are consistent across all three templates
