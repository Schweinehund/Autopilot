---
phase: 27
fixed_at: 2026-04-18T00:00:00Z
review_path: .planning/phases/27-ios-admin-setup-corporate-ade-path/27-REVIEW.md
iteration: 1
findings_in_scope: 2
fixed: 1
skipped: 1
status: partial
---

# Phase 27: Code Review Fix Report

**Fixed at:** 2026-04-18
**Source review:** `.planning/phases/27-ios-admin-setup-corporate-ade-path/27-REVIEW.md`
**Iteration:** 1

**Summary:**
- Findings in scope: 2 (W1, I1)
- Fixed: 1 (W1)
- Skipped/accepted: 1 (I1 — accepted as intentional display-name delta)

---

## Fixed Issues

### W1: ADE token limit inconsistency — 02-abm-token.md states 2,000; macOS sibling states 3,000

**Files modified:** `docs/admin-setup-ios/02-abm-token.md`
**Commit:** `72aabc2`
**Applied fix:** Updated Token Limits table line 82 from `2,000` to `3,000` to match the macOS sibling guide (`docs/admin-setup-macos/01-abm-configuration.md` line 108).

**Rationale for direction chosen:** The iOS guide (`02-abm-token.md`) was authored in Phase 27 and explicitly cross-references the macOS ABM guide as its authority for shared portal steps. The macOS guide is the established source and states 3,000. The iOS figure of 2,000 was therefore the error. Both files now read 3,000 for the same platform-agnostic Intune limit.

---

## Skipped / Accepted Issues

### I1: Glossary link display name mismatch (carried forward from Phase 26 I1)

**Files:** `docs/_templates/admin-template-ios.md`, `docs/admin-setup-ios/00-overview.md`, `docs/admin-setup-ios/01-apns-certificate.md`, `docs/admin-setup-ios/02-abm-token.md`, `docs/admin-setup-ios/03-ade-enrollment-profile.md`
**Reason:** Accepted as intentional display-name delta — not a broken link, no fix applied.

**Analysis:**

The glossary file (`docs/_glossary-macos.md`) has H1 `# macOS Provisioning Glossary`. All iOS guides link to it as "Apple Provisioning Glossary." The two resolution paths are:

1. **Rename glossary H1** to "Apple Provisioning Glossary" — but this would conflict with the macOS-specific guides (`docs/admin-setup-macos/`, `docs/macos-lifecycle/`, `docs/index.md`, `docs/_glossary.md`) which correctly and intentionally display it as "macOS Provisioning Glossary." Changing the H1 would require updating ~10 other files and would make the macOS-facing links less accurate.

2. **Change iOS link text** to "macOS Provisioning Glossary" — but this is misleading to iOS administrators who are reading iOS-specific guides. The display text "Apple Provisioning Glossary" is more accurate for cross-platform audiences.

**Decision:** The display-name delta is intentional and correct. iOS guides use "Apple Provisioning Glossary" as a user-appropriate display name reflecting cross-platform coverage (`applies_to: both`, `platform: all` in the glossary's frontmatter). macOS guides use the literal H1 "macOS Provisioning Glossary." Both are valid display choices for their respective audiences. Accepted as tech debt; no code change warranted.

**27-REVIEW.md frontmatter updated:** `status: issues_found` → `status: accepted`

---

_Fixed: 2026-04-18_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
